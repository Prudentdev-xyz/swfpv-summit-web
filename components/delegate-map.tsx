"use client";

import type { KeyboardEvent } from "react";
import { STATE_LABELS } from "@/components/sw-map";
import { STATE_PATHS } from "@/components/sw-map-paths";
import { MAP_STATES, type DelegateState } from "@/lib/delegates";

type DelegateMapProps = {
  selected: DelegateState | null;
  counts: Partial<Record<DelegateState, number>>;
  onSelect: (state: DelegateState | null) => void;
};

/** The five-state map as a filter: click a state to show its delegates, click again to clear. */
export function DelegateMap({ selected, counts, onSelect }: DelegateMapProps) {
  const toggle = (state: DelegateState) => onSelect(selected === state ? null : state);
  const onKey = (e: KeyboardEvent, state: DelegateState) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggle(state);
  };

  return (
    <div className="rounded-3xl bg-navy px-5 pt-5 pb-4">
      <svg viewBox="0 0 560 600" className="block h-auto w-full" aria-label="Filter delegates by state" role="group">
        {MAP_STATES.map((state, i) => {
          const active = selected === state;
          const count = counts[state] ?? 0;
          return (
            <path
              key={state}
              d={STATE_PATHS[i]}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`${state} State, ${count} delegate${count === 1 ? "" : "s"}`}
              onClick={() => toggle(state)}
              onKeyDown={(e) => onKey(e, state)}
              strokeWidth="1.8"
              strokeLinejoin="round"
              className={`cursor-pointer stroke-sky outline-none transition-[fill] duration-200 focus-visible:stroke-white focus-visible:[stroke-width:4] ${
                active ? "fill-sky" : "fill-indigo hover:fill-[#4a44b0]"
              }`}
            />
          );
        })}
        <g className="pointer-events-none font-display" letterSpacing="1">
          {STATE_LABELS.map((label, i) => {
            const state = MAP_STATES[i];
            // Labels stay white: Ondo's sits over the lagoon cut-out, where the navy panel shows through.
            return (
              <text key={label.name} x={label.x} y={label.y} fontSize="26" fill="#FFFFFF">
                {label.name}
                <tspan x={label.x} dy="30" fontSize="20" fill={selected === state ? "#FFFFFF" : "#29BFF5"}>
                  {counts[state] ?? 0}
                </tspan>
              </text>
            );
          })}
        </g>
      </svg>
      <p className="m-0 mt-1 text-center text-[13px] font-bold text-pale">
        {(MAP_STATES as readonly string[]).includes(selected ?? "")
          ? `Showing ${selected} State · tap again to clear`
          : "Tap a state to filter"}
      </p>
    </div>
  );
}
