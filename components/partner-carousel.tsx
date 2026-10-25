"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const INTERVAL = 3500;
// How long autoplay waits after the visitor touches or swipes the row.
const HOLD = 8000;

// Index of the card whose left edge sits closest to the row's scroll position.
function nearest(track: HTMLElement) {
  const items = [...track.children] as HTMLElement[];
  if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) return items.length - 1;
  const origin = items[0].offsetLeft;
  let best = 0;
  items.forEach((item, i) => {
    const d = Math.abs(item.offsetLeft - origin - track.scrollLeft);
    if (d < Math.abs(items[best].offsetLeft - origin - track.scrollLeft)) best = i;
  });
  return best;
}

/**
 * On phones, one horizontal row that auto-advances one card at a time, right
 * to left. From the sm breakpoint up, the cards sit in a regular grid.
 */
export function PartnerCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const items = [...el.children] as HTMLElement[];
    el.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const onScroll = () => setActive(nearest(el));
    el.addEventListener("scroll", onScroll, { passive: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => el.removeEventListener("scroll", onScroll);
    }

    let visible = false;
    let resumeAt = 0;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);

    const hold = () => (resumeAt = Date.now() + HOLD);
    el.addEventListener("pointerdown", hold);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });

    const id = setInterval(() => {
      const scrollable = el.scrollWidth > el.clientWidth;
      if (!scrollable || !visible || document.hidden || Date.now() < resumeAt) return;
      const items = [...el.children] as HTMLElement[];
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      const next = atEnd ? 0 : nearest(el) + 1;
      el.scrollTo({ left: items[next].offsetLeft - items[0].offsetLeft, behavior: "smooth" });
    }, INTERVAL);

    return () => {
      clearInterval(id);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
    };
  }, []);

  return (
    <div>
      <div
        ref={track}
        data-carousel=""
        className="-mx-[clamp(24px,5vw,88px)] flex snap-x snap-mandatory scroll-px-[clamp(24px,5vw,88px)] gap-4 overflow-x-auto px-[clamp(24px,5vw,88px)] pt-2 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:gap-[18px] sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="flex w-[85%] shrink-0 snap-start sm:w-auto">{child}</div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show partner ${i + 1}`}
            aria-current={i === active}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-sky" : "w-2 bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
