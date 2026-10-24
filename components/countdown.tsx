"use client";

import { useSyncExternalStore } from "react";
import { SUMMIT_START } from "@/lib/summit";

const UNITS = [
  { label: "Days", secs: 86400, mod: Infinity },
  { label: "Hrs", secs: 3600, mod: 24 },
  { label: "Mins", secs: 60, mod: 60 },
  { label: "Secs", secs: 1, mod: 60 },
];

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const secondsLeft = () => Math.max(0, Math.floor((SUMMIT_START.getTime() - Date.now()) / 1000));
// The server has no clock to match the visitor's, so it renders dashes until hydration.
const serverSnapshot = () => null;

/** Live days/hours/minutes/seconds tiles counting down to the summit opening. */
export function Countdown() {
  const left = useSyncExternalStore(subscribe, secondsLeft, serverSnapshot);

  return (
    <div role="timer" aria-label="Time until the summit opens" className="flex gap-2 sm:gap-2.5">
      {UNITS.map((u) => (
        <div
          key={u.label}
          className="flex w-[66px] flex-col items-center rounded-lg border border-navy bg-white pt-2.5 pb-2 sm:w-[73px]"
        >
          <span className="font-display text-[32px] leading-none text-navy sm:text-[36px]">
            {left === null ? "--" : String(Math.floor(left / u.secs) % u.mod).padStart(2, "0")}
          </span>
          <span className="mt-1.5 text-[10px] font-extrabold tracking-[.08em] text-ocean uppercase">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
