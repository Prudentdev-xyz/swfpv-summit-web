import { SouthwestMap } from "@/components/sw-map";
import { DAMS } from "@/lib/summit";
import { DISPLAY, GUTTER, SECTION_Y, TAG } from "@/lib/styles";

export function About() {
  return (
    <section
      id="about"
      className={`grid scroll-mt-[76px] items-center gap-[clamp(40px,6vw,96px)] tab:grid-cols-2 ${GUTTER} ${SECTION_Y}`}
    >
      <div data-reveal="" className="flex flex-col gap-[22px]">
        <span className={`${TAG} -rotate-2 self-start bg-sky`}>About the summit</span>
        <h2 className={`${DISPLAY} text-[clamp(40px,4.4vw,68px)] leading-none text-balance text-navy`}>
          Clean power from water the region already holds
        </h2>
        <p className="m-0 text-[17px] leading-[1.7] text-pretty text-muted">
          Floating solar places photovoltaic arrays on the surface of existing reservoirs. It
          generates clean electricity without taking farmland or forest, and the panels shade
          the water beneath them, reducing evaporation and protecting supply.
        </p>
        <p className="m-0 text-[17px] leading-[1.7] text-pretty text-muted">
          This summit brings state commissioners, federal regulators, investors and
          international engineering partners together to align on a 150MWp pipeline across
          five dams in Oyo, Ogun, Osun, Ondo and Ekiti, and to sign a Joint Communiqué on the
          regional blueprint.
        </p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {DAMS.map((d) => (
            <span
              key={d.name}
              className="group inline-flex h-[38px] items-center gap-1.5 rounded-full border-2 border-navy px-4 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              {d.name}
              <span className="font-medium text-ocean group-hover:text-sky">{d.state}</span>
            </span>
          ))}
        </div>
      </div>
      <SouthwestMap />
    </section>
  );
}
