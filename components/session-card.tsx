import { type Session } from "@/lib/summit";

function sessionStyle(type: Session["type"]) {
  if (type === "Break" || type === "Arrival") {
    return {
      card: "bg-frost border-mist",
      time: "text-subtle",
      badge: "bg-line text-muted",
      title: "text-base",
    };
  }
  if (type === "Live Broadcast") {
    return {
      card: "bg-surface border-sky",
      time: "text-ocean",
      badge: "bg-sky text-white",
      title: "text-[19px]",
    };
  }
  return {
    card: "bg-surface border-rule",
    time: "text-heading",
    badge: "bg-navy text-white",
    title: "text-[19px]",
  };
}

/** One row of the programme timeline, styled by session type. */
export function SessionCard({ session }: { session: Session }) {
  const s = sessionStyle(session.type);
  return (
    <div
      data-tl=""
      className={`grid grid-cols-1 gap-2 rounded-2xl border-2 px-[18px] py-4 transition-transform duration-250 hover:translate-x-1.5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-5 sm:px-6 sm:py-5 ${s.card}`}
    >
      <div className={`text-sm leading-normal font-extrabold whitespace-nowrap ${s.time}`}>
        {session.time}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span
            className={`inline-flex h-[26px] items-center rounded-full px-2.5 text-xs font-extrabold ${s.badge}`}
          >
            {session.quietLabel ?? session.type}
          </span>
          {session.host && (
            <span className="inline-flex h-[26px] items-center rounded-full bg-mist px-2.5 text-xs font-extrabold text-heading">
              Host
            </span>
          )}
        </div>
        <h4 className={`m-0 leading-[1.35] font-extrabold text-pretty text-heading ${s.title}`}>
          {session.title}
        </h4>
        {session.speaker && (
          <span className="text-sm leading-normal font-bold text-ocean">
            {session.speaker}
          </span>
        )}
        {session.partners?.map((pp) => (
          <div
            key={pp.name}
            className="flex flex-col gap-[3px] rounded-[10px] bg-ice px-3.5 py-3"
          >
            <span className="text-sm font-extrabold text-heading">{pp.name}</span>
            <span className="text-sm leading-normal text-muted">{pp.talk}</span>
          </div>
        ))}
        {session.lines?.map((ln, i) => (
          <p key={i} className="m-0 text-sm leading-[1.6] text-pretty text-muted">
            {ln.label && <strong className="text-heading">{ln.label}</strong>}
            {ln.text}
          </p>
        ))}
      </div>
    </div>
  );
}
