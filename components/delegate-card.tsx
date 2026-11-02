import Image from "next/image";
import { stateLabel, type Delegate, type DelegateType } from "@/lib/delegates";
import { DISPLAY } from "@/lib/styles";

// Gold marks the most senior delegates, sky the international partners.
const BADGE: Record<DelegateType, string> = {
  Commissioner: "bg-gold text-navy",
  Partner: "bg-sky text-white",
  Regulator: "bg-navy text-white dark:bg-pale dark:text-navy",
  Stakeholder: "bg-ice text-heading",
};

const HONORIFIC = /^\(?(hon|engr|dr|prof|professor|mr|mrs|ms|chief|alhaji|arc|prince)\.?\)?$/i;

/** "Engr. Folake Adeyemi" -> "FA". */
function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => !HONORIFIC.test(w));
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

const CHIP = "rounded-full border-[1.5px] border-line px-3 py-1 text-[13px] font-bold";

export function DelegateCard({ delegate: d }: { delegate: Delegate }) {
  return (
    <article
      data-card=""
      className="flex flex-col gap-5 rounded-2xl border-[1.5px] border-line bg-surface p-[22px] transition-[border-color,translate,box-shadow] duration-200 hover:-translate-y-1 hover:border-ocean hover:shadow-[0_14px_30px_rgba(28,26,74,.12)]"
    >
      <div className="flex items-start justify-between gap-3">
        {d.photo ? (
          <Image src={d.photo} alt={`${d.name} headshot`} width={64} height={64} className="size-16 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-navy font-display text-[26px] tracking-wide text-sky dark:bg-indigo"
          >
            {initials(d.name)}
          </span>
        )}
        <span
          className={`mt-1 rotate-2 rounded-[5px] px-2.5 py-1 text-[10px] font-extrabold tracking-[.08em] whitespace-nowrap uppercase ${BADGE[d.type]}`}
        >
          {d.type}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className={`${DISPLAY} text-[clamp(22px,1.9vw,27px)] leading-[1.02] text-heading`}>{d.name}</h3>
        {d.title && <p className="m-0 text-[14px] leading-[1.45] text-muted">{d.title}</p>}
        <p className="m-0 text-[14px] leading-[1.4] font-bold text-heading">{d.organisation}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-4">
        {d.state === "International" ? (
          <span className={`${CHIP} text-ocean`}>International · {d.country}</span>
        ) : (
          <span className={`${CHIP} text-heading`}>{stateLabel(d.state)}</span>
        )}
        <span className={`${CHIP} text-subtle`}>{d.sector}</span>
      </div>
    </article>
  );
}
