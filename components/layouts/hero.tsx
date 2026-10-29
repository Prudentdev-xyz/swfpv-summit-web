import Image from "next/image";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { HeroRibbons } from "@/components/hero-ribbons";
import { delay } from "@/lib/styles";

/*
 * The two overlapping frames on the right. Set src to a file in /public to fill a frame;
 * until then it shows an empty placeholder in the same spot.
 */
const PHOTOS: { src: string | null; alt: string; className: string }[] = [
  { src: "/hero/audience.jpg", alt: "Delegates seated in a conference hall, listening to a session", className: "top-0 left-0 w-[68%] aspect-square" },
  { src: "/hero/floating-solar-array.jpg", alt: "Floating solar panel arrays on a reservoir with a service boat", className: "top-[34%] -right-[4%] w-[52%] aspect-[4/5] tab:-right-[10%]" },
];

/* Soft dot grid tucked into the hero corners. */
const DOTS =
  "pointer-events-none absolute bg-[radial-gradient(var(--heading)_1.2px,transparent_1.6px)] bg-size-[14px_14px] opacity-25";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden px-[clamp(20px,4vw,56px)] pt-12 pb-32 sm:pt-16 sm:pb-40">
      <HeroRibbons />
      <div aria-hidden className={`${DOTS} top-8 left-[3%] h-24 w-44`} />
      <div aria-hidden className={`${DOTS} top-[22%] right-[1.5%] hidden h-40 w-16 tab:block`} />

      {/* Huge ghost wordmark behind the copy. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] left-[2%] font-display text-[clamp(90px,17vw,280px)] leading-none whitespace-nowrap text-white/40 uppercase select-none dark:text-white/[.05]"
      >
        Summit 2026
      </span>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 tab:grid-cols-[1.1fr_1fr] tab:gap-10">
        <div className="flex flex-col items-start gap-6">
          <h1 className="m-0 flex flex-col font-display text-[clamp(52px,6.6vw,104px)] leading-[.95] font-normal tracking-[-.005em] text-heading uppercase">
            <span className="anim-line block" style={delay(100)}>
              Southwest Regional
            </span>
            <span className="anim-line block text-ocean" style={delay(240)}>
              Stakeholder Summit
            </span>
          </h1>
          <p className="m-0 max-w-[560px] text-[clamp(18px,1.6vw,22px)] leading-[1.35] font-bold text-balance text-ocean">
            150MWp Floating Solar PV Power Plant Infrastructure Pipeline
          </p>
          <p className="m-0 max-w-[540px] text-[17px] leading-[1.6] text-balance text-muted">
            <strong className="text-heading">Theme:</strong> Floating Solar Architecture: Global
            Blueprints for Southwest Nigeria’s Clean Energy Future
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="#rsvp" className="ring-2 ring-white">
              Register now
            </PrimaryButton>
            <SecondaryButton href="#programme">View Programme</SecondaryButton>
          </div>
          <p className="m-0 text-[15px] font-bold text-heading">3 & 4 Dec 2026 · IITA, Ibadan · Hybrid</p>
        </div>

        <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[520px] tab:mx-0 tab:ml-auto">
          {PHOTOS.map((p, i) => (
            <figure
              key={i}
              className={`anim-pop absolute m-0 overflow-hidden rounded-2xl bg-white/45 shadow-[0_24px_50px_rgba(28,26,74,.22)] ring-1 ring-white/70 backdrop-blur-md dark:bg-white/[.06] dark:ring-white/15 ${p.className}`}
              style={delay(500 + i * 160)}
            >
              {p.src ? (
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 960px) 30vw, 70vw" className="object-cover" />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 text-heading/45">
                  <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <rect x="3" y="4" width="18" height="16" rx="2.5" />
                    <circle cx="9" cy="10" r="1.8" />
                    <path d="m4 18 5-5 4 4 3-3 4 4" />
                  </svg>
                  <span className="text-[12px] font-extrabold tracking-[.08em] uppercase">Photo {i + 1}</span>
                </div>
              )}
            </figure>
          ))}
        </div>
      </div>
    </header>
  );
}
