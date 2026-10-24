import { ArrowCircle } from "@/components/buttons/arrow-circle";
import { CONTACT } from "@/lib/summit";
import { DISPLAY, GUTTER, SECTION_Y, TAG } from "@/lib/styles";

export function Rsvp() {
  return (
    <section
      id="rsvp"
      className={`relative scroll-mt-[76px] overflow-hidden bg-navy text-center text-white ${GUTTER} ${SECTION_Y}`}
    >
      <div data-reveal="" className="relative mx-auto flex max-w-[980px] flex-col items-center gap-[22px]">
        <span className={`${TAG} -rotate-3 bg-sky`}>RSVP &amp; Secretariat</span>
        <h2 className={`${DISPLAY} text-[clamp(56px,8vw,128px)] leading-[.92]`}>
          Save your <span className="text-sky">seat</span>
        </h2>
        <p className="m-0 text-lg leading-[1.6] text-pale">Contact the Summit Secretariat to RSVP.</p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-3.5">
          <a
            href={CONTACT.phone.href}
            className="inline-flex h-16 items-center gap-3.5 rounded-full bg-sky pr-2.5 pl-[30px] text-[clamp(18px,2vw,22px)] font-extrabold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-navy"
          >
            {CONTACT.phone.display}
            <ArrowCircle className="size-[46px] bg-navy text-lg text-white" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex h-16 max-w-full items-center rounded-full border-2 border-white px-5 text-[clamp(16px,1.6vw,20px)] font-extrabold text-white transition-colors hover:bg-white hover:text-navy sm:px-[30px]"
          >
            <span className="truncate">{CONTACT.email}</span>
          </a>
        </div>
        <div className="mt-5 flex flex-col gap-0.5">
          <span className="text-lg font-extrabold">Engr. Idowu Adeshina</span>
          <span className="text-[15px] text-pale">MD/CEO</span>
        </div>
      </div>
    </section>
  );
}
