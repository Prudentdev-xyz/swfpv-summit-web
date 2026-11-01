"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DelegateCard } from "@/components/delegate-card";
import { DelegateMap } from "@/components/delegate-map";
import { DELEGATES, SECTORS, STATES, slug, type Delegate, type DelegateState, type DirectoryFilters } from "@/lib/delegates";
import { DISPLAY } from "@/lib/styles";

function toQuery({ q, state, sector, grouped }: DirectoryFilters) {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q.trim());
  if (state) params.set("state", slug(state));
  if (sector) params.set("sector", slug(sector));
  if (grouped) params.set("view", "state");
  const s = params.toString();
  return s ? `?${s}` : window.location.pathname;
}

function tally<K extends string>(list: Delegate[], key: (d: Delegate) => K) {
  const counts: Partial<Record<K, number>> = {};
  for (const d of list) counts[key(d)] = (counts[key(d)] ?? 0) + 1;
  return counts;
}

const stateLabel = (s: DelegateState) => (s === "Federal" || s === "International" ? s : `${s} State`);

type PillProps = { active: boolean; count?: number; onClick: () => void; children: ReactNode };

function Pill({ active, count, onClick, children }: PillProps) {
  const empty = count === 0 && !active;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      disabled={empty}
      className={`inline-flex h-10 items-center gap-1.5 rounded-full border-2 px-4 text-sm font-extrabold whitespace-nowrap transition-colors duration-200 ${
        active
          ? "border-heading bg-heading text-surface"
          : "cursor-pointer border-line text-heading hover:border-heading disabled:cursor-default disabled:opacity-40 disabled:hover:border-line"
      }`}
    >
      {children}
      {count !== undefined && <span className={active ? "text-sky" : "text-subtle"}>{count}</span>}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
      <legend className="mb-3 p-0 text-[13px] font-extrabold tracking-[.08em] text-ocean uppercase">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function CardGrid({ delegates }: { delegates: Delegate[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 min-[1360px]:grid-cols-3">
      {delegates.map((d) => (
        <DelegateCard key={d.id} delegate={d} />
      ))}
    </div>
  );
}

export function DelegateDirectory({ initial }: { initial: DirectoryFilters }) {
  const [filters, setFilters] = useState(initial);
  const { q, state, sector, grouped } = filters;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Written on each change rather than in an effect, so the unfiltered fallback that renders
  // before the URL's filters arrive never overwrites a shared link. replaceState keeps typing
  // out of the history stack.
  const update = (next: Partial<DirectoryFilters>) => {
    const merged = { ...filters, ...next };
    setFilters(merged);
    window.history.replaceState(null, "", toQuery(merged));
  };

  // Cards rise in when a filter or the view changes (not on every keystroke).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    resultsRef.current?.querySelectorAll("[data-card]").forEach((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 420, delay: Math.min(i, 12) * 35, easing: "ease-out", fill: "backwards" },
      ),
    );
  }, [state, sector, grouped]);

  const needle = q.trim().toLowerCase();
  const matching = needle
    ? DELEGATES.filter((d) =>
        [d.name, d.title, d.organisation, d.country ?? ""].some((field) => field.toLowerCase().includes(needle)),
      )
    : DELEGATES;

  // Each filter's counts respect the search and the other filter, so they show what a click would give.
  const stateCounts = tally(sector ? matching.filter((d) => d.sector === sector) : matching, (d) => d.state);
  const sectorCounts = tally(state ? matching.filter((d) => d.state === state) : matching, (d) => d.sector);
  const results = matching.filter((d) => (!state || d.state === state) && (!sector || d.sector === sector));

  const activeFilters = Number(Boolean(state)) + Number(Boolean(sector));
  const anyFilter = activeFilters > 0 || needle !== "";
  const clearAll = () => update({ q: "", state: null, sector: null });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-0 flex-1 basis-[280px]">
          <span className="sr-only">Search delegates</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-subtle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search name or organisation"
            className="h-[58px] w-full rounded-full border-2 border-line bg-surface pr-5 pl-13 text-base text-heading outline-none transition-colors placeholder:text-subtle focus:border-ocean"
          />
        </label>
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          aria-controls="delegate-filters"
          className="inline-flex h-[58px] cursor-pointer items-center gap-2 rounded-full border-2 border-heading px-6 text-[15px] font-extrabold text-heading transition-colors hover:bg-heading hover:text-surface tab:hidden"
        >
          Filters
          {activeFilters > 0 && (
            <span className="flex size-6 items-center justify-center rounded-full bg-sky text-xs text-white">{activeFilters}</span>
          )}
        </button>
        <div role="group" aria-label="Layout" className="flex rounded-full border-2 border-line p-1">
          {[
            { label: "Grid", value: false },
            { label: "By state", value: true },
          ].map((v) => (
            <button
              key={v.label}
              type="button"
              aria-pressed={grouped === v.value}
              onClick={() => update({ grouped: v.value })}
              className={`h-[44px] cursor-pointer rounded-full px-5 text-sm font-extrabold transition-colors ${
                grouped === v.value ? "bg-heading text-surface" : "text-heading hover:text-ocean"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-[clamp(28px,4vw,56px)] tab:grid-cols-[minmax(0,330px)_minmax(0,1fr)]">
        <aside
          id="delegate-filters"
          className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-8 rounded-3xl border-[1.5px] border-line p-6 tab:sticky tab:top-6 tab:flex tab:rounded-none tab:border-0 tab:p-0`}
        >
          <div className="hidden tab:block">
            <DelegateMap selected={state} counts={stateCounts} onSelect={(s) => update({ state: s })} />
          </div>
          <FilterGroup label="State">
            <Pill active={!state} onClick={() => update({ state: null })}>
              All states
            </Pill>
            {STATES.map((s) => (
              <Pill key={s} active={state === s} count={stateCounts[s] ?? 0} onClick={() => update({ state: state === s ? null : s })}>
                {s}
              </Pill>
            ))}
          </FilterGroup>
          <FilterGroup label="Sector">
            <Pill active={!sector} onClick={() => update({ sector: null })}>
              All sectors
            </Pill>
            {SECTORS.map((s) => (
              <Pill key={s} active={sector === s} count={sectorCounts[s] ?? 0} onClick={() => update({ sector: sector === s ? null : s })}>
                {s}
              </Pill>
            ))}
          </FilterGroup>
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="h-[52px] cursor-pointer rounded-full bg-navy text-base font-extrabold text-white hover:bg-ocean tab:hidden"
          >
            Show {results.length} delegate{results.length === 1 ? "" : "s"}
          </button>
        </aside>

        <div ref={resultsRef} className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="m-0 text-[15px] text-muted">
              Showing <strong className="text-heading">{results.length}</strong> of {DELEGATES.length} delegates
              {state && <> in <strong className="text-heading">{stateLabel(state)}</strong></>}
              {sector && <> · <strong className="text-heading">{sector}</strong></>}
            </p>
            {anyFilter && (
              <button
                type="button"
                onClick={clearAll}
                className="cursor-pointer text-[15px] font-extrabold text-ocean underline-offset-4 hover:text-heading hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-line px-6 py-16 text-center">
              <span className={`${DISPLAY} text-[clamp(32px,4vw,48px)] leading-none text-heading`}>
                No <span className="text-sky">matches</span>
              </span>
              <p className="m-0 max-w-[420px] text-base leading-[1.6] text-muted">
                No delegates match {needle ? <>“{q.trim()}”</> : "these filters"}
                {activeFilters > 0 && needle ? " with the selected filters" : ""}. Try a different name or widen the filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="h-12 cursor-pointer rounded-full border-2 border-heading px-6 text-[15px] font-extrabold text-heading transition-colors hover:bg-heading hover:text-surface"
              >
                Clear filters
              </button>
            </div>
          ) : grouped ? (
            STATES.filter((s) => results.some((d) => d.state === s)).map((s) => {
              const inState = results.filter((d) => d.state === s);
              return (
                <section key={s} aria-label={stateLabel(s)} className="flex flex-col gap-5 border-t-2 border-rule pt-6 first:border-t-0 first:pt-0">
                  <h2 className={`${DISPLAY} flex items-baseline gap-3 text-[clamp(32px,3.4vw,48px)] leading-none text-heading`}>
                    {stateLabel(s)}
                    <span className="font-sans text-base font-extrabold text-sky normal-case">
                      {inState.length} delegate{inState.length === 1 ? "" : "s"}
                    </span>
                  </h2>
                  <CardGrid delegates={inState} />
                </section>
              );
            })
          ) : (
            <CardGrid delegates={results} />
          )}
        </div>
      </div>
    </div>
  );
}
