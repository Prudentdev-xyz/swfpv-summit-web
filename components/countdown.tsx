"use client";

import { useSyncExternalStore } from "react";
import { SUMMIT_START } from "@/lib/summit";

const UNITS = [
  { label: "Days", secs: 86400, mod: Infinity },
  { label: "Hours", secs: 3600, mod: 24 },
  { label: "Minutes", secs: 60, mod: 60 },
  { label: "Seconds", secs: 1, mod: 60 },
];

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const secondsLeft = () => Math.max(0, Math.floor((SUMMIT_START.getTime() - Date.now()) / 1000));
// The server has no clock to match the visitor's, so it renders dashes until hydration.
const serverSnapshot = () => null;

/** One wide panel of live days/hours/minutes/seconds counting down to the summit opening. */
export function Countdown() {
  const left = useSyncExternalStore(subscribe, secondsLeft, serverSnapshot);

  return (
    <div
      role="timer"
      aria-label="Time until the summit opens"
      className="mx-auto grid max-w-[980px] grid-cols-4 rounded-3xl border border-line bg-surface py-5 shadow-[0_18px_40px_rgba(28,26,74,.18)] sm:py-7"
    >
      {UNITS.map((u, i) => (
        <div
          key={u.label}
          className={`flex flex-col items-center gap-1.5 sm:gap-2 ${i > 0 ? "border-l border-line" : ""}`}
        >
          <span className="font-display text-[clamp(34px,6vw,64px)] leading-none text-heading">
            {left === null ? "--" : String(Math.floor(left / u.secs) % u.mod).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-extrabold tracking-[.08em] text-ocean uppercase sm:text-[13px]">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
