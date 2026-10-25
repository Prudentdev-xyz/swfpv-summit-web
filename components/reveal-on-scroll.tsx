"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(.22,.61,.36,1)";

// Counts a [data-count] number up from zero with an ease-out curve.
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / 1400);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// data-reveal="right" slides in from the right instead of fading up.
const FROM = { up: "translateY(40px)", right: "translateX(120px)" };
const STAGGER = 120;

// "backwards" holds the first frame through the delay, then hands control back
// to CSS when done so hover transforms still work.
function show(el: HTMLElement, delay: number) {
  el.style.opacity = "";
  const from = el.dataset.reveal === "right" ? FROM.right : FROM.up;
  el.animate(
    [
      { opacity: 0, transform: from },
      { opacity: 1, transform: "none" },
    ],
    { duration: 800, delay, easing: EASE, fill: "backwards" },
  );
  el.classList.add("is-drawn");
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
}

// Fades up every [data-reveal] element as it scrolls into view, drawing any
// map outlines and counting up any figures inside it. Slide-in cards that
// appear together play one after another. Renders nothing.
export function RevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach((el) => el.classList.add("is-drawn"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        let slides = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          show(el, el.dataset.reveal === "right" ? STAGGER * slides++ : 0);
        }
      },
      { threshold: 0.15 },
    );

    let slides = 0;
    targets.forEach((el) => {
      // Cards in a scrolling carousel are already moving, so they skip the reveal.
      const carousel = el.closest<HTMLElement>("[data-carousel]");
      if (carousel && carousel.scrollWidth > carousel.clientWidth) return;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        show(el, 100 + (el.dataset.reveal === "right" ? STAGGER * slides++ : 0));
      } else {
        el.style.opacity = "0";
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
