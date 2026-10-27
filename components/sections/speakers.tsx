import { SpeakerCard } from "@/components/speaker-card";
import { PEOPLE } from "@/lib/summit";
import { DISPLAY, GUTTER } from "@/lib/styles";

export function Speakers() {
  return (
    <section id="speakers" className="scroll-mt-[76px]">
      <div data-reveal="" className={`mb-10 flex flex-wrap items-end justify-between gap-6 ${GUTTER}`}>
        <h2 className={`${DISPLAY} text-[clamp(48px,6vw,96px)] leading-[.95] text-heading`}>
          Host &amp;
          <br />
          <span className="text-sky">Speakers</span>
        </h2>
        <p className="m-0 max-w-[360px] text-base leading-[1.6] text-muted">
          Voices shaping the blueprint for floating solar in Southwest Nigeria.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {PEOPLE.map((p) => (
          <SpeakerCard key={p.name} person={p} />
        ))}
      </div>
    </section>
  );
}
