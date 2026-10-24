import { STATS } from "@/lib/summit";
import { GUTTER, SECTION_PB } from "@/lib/styles";

export function Stats() {
  return (
    <section className={`pt-0 ${GUTTER} ${SECTION_PB}`}>
      <div className="grid grid-cols-2 border-y-2 border-navy tab:grid-cols-4">
        {STATS.map((st, i) => (
          <div
            key={st.label}
            data-reveal=""
            className={`flex flex-col gap-2.5 border-navy px-4 py-6 sm:px-7 sm:py-9 ${
              i % 2 === 0 ? "border-r-2" : i < STATS.length - 1 ? "tab:border-r-2" : ""
            } ${i < 2 ? "border-b-2 tab:border-b-0" : ""}`}
          >
            <span className="font-display text-[clamp(64px,6.4vw,104px)] leading-[.95] text-navy">
              <span data-count={st.n}>{st.n}</span>
              {st.unit && <span className="ml-1.5 text-[.4em] text-sky">{st.unit}</span>}
            </span>
            <span className="text-[15px] leading-[1.45] font-semibold text-muted">{st.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
