import type { Metadata } from "next";
import { Suspense } from "react";
import { DelegateDirectory } from "@/components/delegate-directory";
import { DELEGATES, parseFilters } from "@/lib/delegates";
import { DISPLAY, GUTTER, SECTION_PB, TAG } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Delegates | Southwest Regional Stakeholder Summit",
  description:
    "Commissioners, regulators, utilities, river basin authorities, investors, universities and international partners attending the Southwest Regional Stakeholder Summit, 3 and 4 December 2026.",
};

const countries = new Set(DELEGATES.map((d) => d.country ?? "Nigeria")).size;

const HIGHLIGHTS = [
  { n: DELEGATES.length, label: "Delegates confirmed" },
  { n: DELEGATES.filter((d) => d.type === "Commissioner").length, label: "State commissioners" },
  { n: countries, label: countries === 1 ? "Country" : "Countries" },
];

// Filters come from the URL at request time; the static shell renders the unfiltered list meanwhile.
async function FilteredDirectory({ searchParams }: { searchParams: PageProps<"/delegates">["searchParams"] }) {
  return <DelegateDirectory initial={parseFilters(await searchParams)} />;
}

export default function DelegatesPage({ searchParams }: PageProps<"/delegates">) {
  return (
    <>
      <section className={`pt-[clamp(48px,7vw,96px)] pb-10 ${GUTTER}`}>
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div className="flex max-w-[620px] flex-col gap-5">
            <span className={`${TAG} -rotate-2 self-start bg-sky`}>Who&apos;s coming</span>
            <h1 className={`${DISPLAY} text-[clamp(52px,7vw,112px)] leading-[.92] text-heading`}>
              Meet the
              <br />
              <span className="text-sky">delegates</span>
            </h1>
            <p className="m-0 text-lg leading-[1.6] text-muted">
              Commissioners, regulators, utilities, river basin authorities, investors, universities and international
              partners shaping
              the 150MWp floating solar pipeline for Southwest Nigeria.
            </p>
          </div>
          <dl className="m-0 grid grid-cols-3 border-y-2 border-rule">
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.label} className={`flex flex-col gap-1.5 px-[clamp(14px,2vw,28px)] py-5 ${i < 2 ? "border-r-2 border-rule" : ""}`}>
                <dd className="m-0 font-display text-[clamp(44px,4.4vw,72px)] leading-[.95] text-heading">{h.n}</dd>
                <dt className="order-last text-[13px] leading-[1.35] font-semibold text-muted">{h.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${GUTTER} ${SECTION_PB}`}>
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
          <Suspense fallback={<DelegateDirectory initial={parseFilters({})} />}>
            <FilteredDirectory searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
