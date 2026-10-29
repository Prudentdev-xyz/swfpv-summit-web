import Image from "next/image";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { DISPLAY, GUTTER, SECTION_Y, TAG } from "@/lib/styles";

export function Venue() {
  return (
    <section
      id="venue"
      className={`grid scroll-mt-[76px] items-center gap-[clamp(40px,6vw,88px)] tab:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] ${GUTTER} ${SECTION_Y}`}
    >
      <div data-reveal="" className="relative">
        <div className="relative aspect-[5/4] -rotate-2 overflow-hidden rounded-3xl border-[6px] border-navy bg-ice">
          <Image
            src="/venue-iita.jpg"
            alt="Main hall of the IITA Conference Center, Ibadan, set with desks, microphones and a projector screen"
            fill
            sizes="(min-width: 960px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -right-2.5 -bottom-5 rotate-[5deg] rounded-lg bg-sky px-4 py-2.5 text-[15px] font-extrabold text-white shadow-[4px_4px_0_#2B266A] dark:shadow-[4px_4px_0_#FFFFFF]">
          Ibadan, Nigeria
        </div>
      </div>
      <div data-reveal="" className="flex flex-col gap-5">
        <span className={`${TAG} -rotate-2 self-start bg-navy`}>Venue &amp; package</span>
        <h2 className={`${DISPLAY} text-[clamp(34px,3.4vw,54px)] leading-none text-heading`}>
          International Institute of Tropical Agriculture (IITA) Conference Center
        </h2>
        <p className="m-0 text-base leading-[1.7] text-muted">
          A hybrid summit: in-person sessions at IITA, with international partners presenting
          through live Zoom broadcasts.
        </p>
        <div className="flex flex-col justify-center gap-1.5 rounded-2xl bg-sky px-[22px] py-5 text-white">
          <span className="text-[13px] font-extrabold tracking-[.06em] uppercase">VIP package · Included</span>
          <span className="text-xl leading-[1.25] font-extrabold">2 nights full-board accommodation</span>
        </div>
        <SecondaryButton
          href="https://www.google.com/maps/search/?api=1&query=IITA+Conference+Center+Ibadan"
          target="_blank"
          rel="noopener noreferrer"
          size="md"
          className="self-start"
        >
          View on map ↗
        </SecondaryButton>
      </div>
    </section>
  );
}
