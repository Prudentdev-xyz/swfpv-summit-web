import Image from "next/image";
import type { Person } from "@/lib/summit";
import { DISPLAY } from "@/lib/styles";

export function SpeakerCard({ person, className = "" }: { person: Person; className?: string }) {
  return (
    <article
      data-reveal=""
      className={`relative aspect-[2/3] overflow-hidden rounded-2xl text-white shadow-[0_14px_30px_rgba(28,26,74,.14)] transition-[filter] hover:brightness-[1.06] ${className}`}
      style={{ background: person.bg }}
    >
      {person.photo ? (
        <Image
          src={person.photo}
          alt={`${person.name} headshot`}
          fill
          sizes="(min-width: 960px) 25vw, (min-width: 640px) 50vw, 380px"
          className="object-cover object-[center_20%]"
        />
      ) : (
        // Head-and-shoulders silhouette standing in for a headshot that hasn't arrived yet.
        <svg aria-hidden viewBox="0 0 120 120" className="absolute inset-x-0 top-[8%] mx-auto w-[62%] text-white/25">
          <circle cx="60" cy="42" r="24" fill="currentColor" />
          <path d="M14 120c0-28 20.6-46 46-46s46 18 46 46Z" fill="currentColor" />
        </svg>
      )}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-[22px] py-6"
        style={{ background: person.bg }}
      >
        {person.badge && (
          <span className="-rotate-2 self-start rounded-[5px] bg-white px-2.5 py-1 text-[10px] font-extrabold tracking-[.08em] whitespace-nowrap text-navy uppercase">
            {person.badge}
          </span>
        )}
        <h3 className={`${DISPLAY} text-[clamp(24px,2.1vw,32px)] leading-none`}>{person.name}</h3>
        {person.role && (
          <span className="text-[13px] leading-[1.4] font-medium" style={{ color: person.sub }}>
            {person.role}
          </span>
        )}
      </div>
    </article>
  );
}
