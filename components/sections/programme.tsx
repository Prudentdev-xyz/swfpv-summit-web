"use client";

import { useEffect, useRef, useState } from "react";
import { SessionCard } from "@/components/session-card";
import { PROGRAMME } from "@/lib/summit";

export function Programme() {
  const [day, setDay] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const current = PROGRAMME[day];

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    listRef.current?.querySelectorAll("[data-tl]").forEach((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 450, delay: i * 40, easing: "ease-out", fill: "backwards" },
      ),
    );
  }, [day]);

  return (
    <section
      id="programme"
      className="scroll-mt-[76px] bg-ice px-[clamp(24px,5vw,88px)] py-[72px] sm:py-24 tab:py-[120px]"
    >
      <div data-reveal="" className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 font-display text-[clamp(48px,6vw,96px)] leading-[.95] font-normal text-navy uppercase">
          Three days
          <br />
          <span className="text-sky">at IITA</span>
        </h2>
        <div role="tablist" aria-label="Summit days" className="flex flex-wrap gap-2.5">
          {PROGRAMME.map((p, i) => {
            const active = i === day;
            return (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDay(i)}
                className={`h-12 cursor-pointer rounded-full border-2 border-navy px-4 text-[15px] font-extrabold whitespace-nowrap transition-colors duration-250 sm:h-14 sm:px-6 ${
                  active ? "bg-navy text-white" : "bg-white text-navy hover:bg-mist"
                }`}
              >
                {p.label} · {p.date}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid items-start gap-[clamp(24px,5vw,72px)] tab:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex flex-col gap-[18px] overflow-hidden rounded-3xl bg-navy p-8 text-white tab:sticky tab:top-[100px]">
          <span className="font-display text-[72px] leading-[.85] text-sky tab:text-[120px]">
            {String(day + 1).padStart(2, "0")}
          </span>
          <p className="m-0 text-[22px] leading-[1.3] font-extrabold text-balance">
            {current.focus}
          </p>
          <p className="m-0 text-sm text-pale">All times are West Africa Time (WAT).</p>
          <div className="mt-1.5 flex flex-col gap-2.5 text-sm font-semibold">
            <span className="flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-sky" />
              Live broadcast
            </span>
            <span className="flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-white" />
              Keynote, paper, panel, ceremony
            </span>
            <span className="flex items-center gap-2.5">
              <span className="size-3 rounded-full border-2 border-slate" />
              Break &amp; arrival
            </span>
          </div>
        </div>

        <div ref={listRef} role="tabpanel" className="flex flex-col gap-2.5">
          {current.items.map((it) => (
            <SessionCard key={`${day}-${it.time}`} session={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
