import { SpeakerCard } from "@/components/speaker-card";
import { PEOPLE } from "@/lib/summit";
import { DISPLAY, GUTTER, SECTION_PB } from "@/lib/styles";

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
      {/* Four across on desktop, two on tablets; a short last row stays centred. */}
      <div className={`mx-auto flex max-w-[1400px] flex-wrap justify-center gap-5 ${GUTTER} ${SECTION_PB}`}>
        {PEOPLE.map((p) => (
          <SpeakerCard
            key={p.name}
            person={p}
            className="w-full max-w-[380px] sm:w-[calc((100%-20px)/2)] sm:max-w-none tab:w-[calc((100%-60px)/4)]"
          />
        ))}
      </div>
    </section>
  );
}
