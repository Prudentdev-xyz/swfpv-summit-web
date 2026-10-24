import Image from "next/image";
import type { Person } from "@/lib/summit";
import { DISPLAY } from "@/lib/styles";

export function SpeakerCard({ person }: { person: Person }) {
  return (
    <article
      data-reveal=""
      className="relative aspect-[3/4] overflow-hidden text-white transition-[filter] hover:brightness-[1.06]"
      style={{ background: person.bg }}
    >
      <Image
        src={person.photo}
        alt={`${person.name} headshot`}
        fill
        sizes="(min-width: 1100px) 25vw, (min-width: 560px) 50vw, 100vw"
        className="object-cover object-[center_20%]"
      />
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-[22px] py-6"
        style={{ background: person.bg }}
      >
        {person.host && (
          <span className="-rotate-2 self-start rounded-[5px] bg-white px-2.5 py-1 text-[10px] font-extrabold tracking-[.08em] whitespace-nowrap text-navy uppercase">
            Host &amp; Moderator
          </span>
        )}
        <h3 className={`${DISPLAY} text-[clamp(24px,2.1vw,32px)] leading-none`}>{person.name}</h3>
        <span className="text-[13px] leading-[1.4] font-medium" style={{ color: person.sub }}>
          {person.role}
        </span>
        <span className="mt-1 text-xs font-extrabold tracking-[.06em]">{person.when}</span>
      </div>
    </article>
  );
}
