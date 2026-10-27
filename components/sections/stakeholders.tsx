import Image from "next/image";
import { STAKEHOLDER_LOGOS } from "@/lib/summit";
import { GUTTER, SECTION_PB } from "@/lib/styles";

export function Stakeholders() {
  return (
    <section className={`${GUTTER} ${SECTION_PB}`}>
      <div data-reveal="" className="flex flex-col items-center gap-7 border-t-2 border-rule pt-14">
        <span className="text-[13px] font-extrabold tracking-[.1em] text-ocean uppercase">
          Partners &amp; Sponsors
        </span>
        <div className="flex max-w-[1000px] flex-wrap items-center justify-center gap-5">
          {STAKEHOLDER_LOGOS.map((l) => (
            <div
              key={l.src}
              className="flex h-[110px] w-[140px] items-center justify-center rounded-2xl sm:w-[180px]"
            >
              <Image
                src={l.src}
                alt={l.alt}
                width={l.width}
                height={l.height}
                sizes="180px"
                className={`h-auto w-auto max-w-full object-contain dark:hidden ${l.maxH}`}
              />
              <Image
                src={l.dark.src}
                alt={l.alt}
                width={l.dark.width}
                height={l.dark.height}
                sizes="180px"
                className={`hidden h-auto w-auto max-w-full object-contain dark:block ${l.maxH}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
