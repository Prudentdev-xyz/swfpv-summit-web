import Image from "next/image";
import { STAKEHOLDER_LOGOS, STAKEHOLDER_NAMES } from "@/lib/summit";
import { GUTTER, SECTION_PB } from "@/lib/styles";

export function Stakeholders() {
  return (
    <section className={`${GUTTER} ${SECTION_PB}`}>
      <div data-reveal="" className="flex flex-col items-center gap-7 border-t-2 border-navy pt-14">
        <span className="text-[13px] font-extrabold tracking-[.1em] text-ocean uppercase">
          Partners &amp; stakeholders
        </span>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {STAKEHOLDER_LOGOS.map((l) => (
            <div
              key={l.src}
              className="flex h-[110px] w-[140px] items-center justify-center sm:w-[180px]"
            >
              <Image
                src={l.src}
                alt={l.alt}
                width={l.width}
                height={l.height}
                sizes="180px"
                className={`h-auto w-auto max-w-full object-contain ${l.maxH}`}
              />
            </div>
          ))}
          {STAKEHOLDER_NAMES.map((name) => (
            <div
              key={name}
              className="flex h-[110px] w-[140px] items-center justify-center font-display text-[28px] text-ocean uppercase sm:w-[180px]"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
