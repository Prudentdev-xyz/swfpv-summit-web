"use client";

import { useSyncExternalStore } from "react";

type Status = "upcoming" | "live" | "ended";

const BADGES: Record<Status, { label: string; className: string; dot: string }> = {
  upcoming: { label: "Upcoming · Zoom", className: "bg-ice text-ocean", dot: "bg-ocean" },
  live: { label: "Live now", className: "bg-sky text-white", dot: "anim-blink bg-white" },
  ended: { label: "Ended", className: "bg-line text-subtle", dot: "bg-slate" },
};

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 15000);
  return () => clearInterval(id);
};
// The server has no clock to match the visitor's, so it renders a neutral badge until hydration.
const serverSnapshot = () => null;

/** Live, Ended or Upcoming badge for a session, based on the visitor's clock. */
export function SessionStatus({ start, end }: { start: string; end: string }) {
  const status = useSyncExternalStore(
    subscribe,
    (): Status => {
      const now = Date.now();
      if (now < Date.parse(start)) return "upcoming";
      return now < Date.parse(end) ? "live" : "ended";
    },
    serverSnapshot,
  );
  const badge = status ? BADGES[status] : { label: "Via Zoom", className: "bg-ice text-ocean", dot: "bg-ocean" };

  return (
    <span
      className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-extrabold whitespace-nowrap transition-colors duration-500 ${badge.className}`}
    >
      <span className={`size-[7px] rounded-full ${badge.dot}`} />
      {badge.label}
    </span>
  );
}
