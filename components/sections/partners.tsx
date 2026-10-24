import { PartnerCard } from "@/components/partner-card";
import { PARTNERS } from "@/lib/summit";
import { DISPLAY, GUTTER, SECTION_Y } from "@/lib/styles";

export function Partners() {
  return (
    <section className={`bg-navy text-white ${GUTTER} ${SECTION_Y}`}>
      <div data-reveal="" className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className={`${DISPLAY} text-[clamp(44px,5vw,80px)] leading-[.95]`}>
          Global engineering,
          <br />
          <span className="text-sky">broadcast live</span>
        </h2>
        <p className="m-0 max-w-[380px] text-base leading-[1.6] text-pale">
          Four partners from Europe and North America present to the summit floor via live
          Zoom broadcast.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
        {PARTNERS.map((p) => (
          <PartnerCard key={p.name} partner={p} />
        ))}
      </div>
    </section>
  );
}
