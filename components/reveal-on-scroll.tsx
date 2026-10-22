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

function show(el: HTMLElement, delay: number) {
  el.style.opacity = "";
  el.animate(
    [
      { opacity: 0, transform: "translateY(40px)" },
      { opacity: 1, transform: "none" },
    ],
    { duration: 800, delay, easing: EASE, fill: "both" },
  );
  el.classList.add("is-drawn");
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
}

// Fades up every [data-reveal] element as it scrolls into view, drawing any
// map outlines and counting up any figures inside it. Renders nothing.
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
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          show(entry.target as HTMLElement, 0);
        }
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        show(el, 100);
      } else {
        el.style.opacity = "0";
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
