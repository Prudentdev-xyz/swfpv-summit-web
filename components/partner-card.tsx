import Image from "next/image";
import { SessionStatus } from "@/components/session-status";
import type { Partner } from "@/lib/summit";
import { DISPLAY } from "@/lib/styles";

export function PartnerCard({ partner }: { partner: Partner }) {
  const { logo, speaker } = partner;
  return (
    <article
      data-reveal="right"
      className="flex w-full flex-col gap-4 rounded-[20px] bg-surface p-[18px] text-heading transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-1"
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl"
        style={{ background: speaker ? "var(--ice)" : (logo?.bg ?? "var(--ice)") }}
      >
        {speaker ? (
          <Image
            src={speaker.photo}
            alt={`${speaker.name} headshot`}
            fill
            sizes="(min-width: 640px) 25vw, 85vw"
            className="object-cover object-[center_25%]"
          />
        ) : logo ? (
          <Image
            src={logo.src}
            alt={partner.name}
            width={logo.width}
            height={logo.height}
            sizes="240px"
            className="block h-auto max-h-[120px] w-auto object-contain"
            style={{ maxWidth: logo.maxW }}
          />
        ) : (
          <span className="px-4 text-center font-display text-[30px] leading-none text-ocean uppercase">
            {partner.name.replace(/ \(.*\)$/, "")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1.5 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-ocean">{partner.country}</span>
          <SessionStatus start={partner.start} end={partner.end} />
        </div>
        {speaker ? (
          <div className="flex flex-col gap-1.5">
            <h3 className={`${DISPLAY} text-[28px] leading-none`}>{speaker.name}</h3>
            <span className="text-sm font-bold text-heading">{partner.name}</span>
          </div>
        ) : (
          <h3 className={`${DISPLAY} text-[28px] leading-none`}>{partner.name}</h3>
        )}
        <p className="m-0 flex-1 text-[15px] leading-[1.55] text-pretty text-muted">{partner.talk}</p>
        <span className="text-[13px] font-extrabold text-heading">{partner.when}</span>
      </div>
    </article>
  );
}
