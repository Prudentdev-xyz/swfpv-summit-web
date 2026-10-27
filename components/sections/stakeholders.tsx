import Image from "next/image";
import { PARTNER_LOGOS, SPONSOR_LOGOS, type StakeholderLogo } from "@/lib/summit";
import { GUTTER, SECTION_PB } from "@/lib/styles";

function LogoGroup({ label, logos }: { label: string; logos: StakeholderLogo[] }) {
  return (
    <div className="flex flex-col items-center gap-7">
      <span className="text-[13px] font-extrabold tracking-[.1em] text-ocean uppercase">{label}</span>
      <div className="flex max-w-[1000px] flex-wrap items-center justify-center gap-5">
        {logos.map((l) => (
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
  );
}

export function Stakeholders() {
  return (
    <section className={`${GUTTER} ${SECTION_PB}`}>
      <div data-reveal="" className="flex flex-col items-center gap-14 border-t-2 border-rule pt-14">
        <LogoGroup label="Partners" logos={PARTNER_LOGOS} />
        <LogoGroup label="Sponsors" logos={SPONSOR_LOGOS} />
      </div>
    </section>
  );
}
