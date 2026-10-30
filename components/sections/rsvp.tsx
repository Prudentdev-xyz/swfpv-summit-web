import Link from "next/link";
import { ArrowCircle } from "@/components/buttons/arrow-circle";
import { DISPLAY, GUTTER, SECTION_Y } from "@/lib/styles";

export function Rsvp() {
  return (
    <section
      id="rsvp"
      className={`relative scroll-mt-[76px] overflow-hidden bg-navy text-center text-white ${GUTTER} ${SECTION_Y}`}
    >
      <div data-reveal="" className="relative mx-auto flex max-w-[980px] flex-col items-center gap-[22px]">
        <h2 className={`${DISPLAY} text-[clamp(56px,8vw,128px)] leading-[.92]`}>
          Save your <span className="text-sky">seat</span>
        </h2>
        <p className="m-0 text-lg leading-[1.6] text-pale">Register now to secure your spot at the summit.</p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/register"
            className="inline-flex h-16 items-center gap-3.5 rounded-full bg-sky pr-2.5 pl-[30px] text-[clamp(18px,2vw,22px)] font-extrabold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-navy"
          >
            Register Now
            <ArrowCircle className="size-[46px] bg-navy text-lg text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
