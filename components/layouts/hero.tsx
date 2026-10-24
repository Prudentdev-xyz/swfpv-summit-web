import type { CSSProperties } from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { Countdown } from "@/components/countdown";
import { STRIP } from "@/lib/summit";
import { TAG, delay, tilt } from "@/lib/styles";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-ice px-[clamp(20px,4vw,56px)] pt-10 sm:pt-16">
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center">
        <div
          className={`${TAG} anim-pop bg-navy py-2 whitespace-nowrap`}
          style={tilt(-3, 600)}
        >
          Official VIP Invitation
        </div>
        <h1 className="m-0 flex flex-col items-center font-display text-[clamp(56px,9.4vw,156px)] leading-[.92] font-normal tracking-[-.005em] text-navy uppercase">
          <span className="anim-line block" style={delay(100)}>
            Southwest Regional
          </span>
          <span className="anim-line block text-sky" style={delay(240)}>
            Stakeholder
          </span>
          <span className="anim-line block" style={delay(380)}>
            Summit
          </span>
        </h1>
        <div
          className="anim-pop absolute -top-2 right-[4%] z-[2] hidden rounded-lg bg-sky px-4 py-2.5 text-base font-extrabold whitespace-nowrap text-white shadow-[4px_4px_0_#2B266A] tab:flex"
          style={tilt(6, 760)}
        >
          3–5 DEC 2026
        </div>
        <div
          className="anim-pop absolute -top-2 left-[4%] z-[2] hidden rounded-lg border-2 border-navy bg-white px-4 py-2.5 text-[15px] font-extrabold whitespace-nowrap text-navy shadow-[4px_4px_0_#29BFF5] tab:flex"
          style={tilt(-7, 920)}
        >
          IITA, IBADAN · HYBRID
        </div>

        <p className="m-0 max-w-[640px] text-[clamp(18px,1.6vw,22px)] leading-[1.35] font-bold text-ocean">
          150MWp Floating Solar PV Power Plant Infrastructure Pipeline
        </p>
        <p className="m-0 max-w-[620px] text-[17px] leading-[1.6] text-muted">
          <strong className="text-navy">Theme:</strong> Floating Solar Architecture: Global
          Blueprints for Southwest Nigeria’s Clean Energy Future
        </p>
        <Countdown />
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton href="#rsvp">RSVP now</PrimaryButton>
          <SecondaryButton href="#programme">View Programme</SecondaryButton>
        </div>
        <p className="m-0 text-[15px] font-bold text-navy tab:hidden">
          3–5 Dec 2026 · IITA, Ibadan · Hybrid
        </p>
      </div>

      <div className="-mx-5 mt-10 grid grid-cols-3 items-end gap-2.5 sm:mt-16 sm:grid-cols-5 sm:gap-[18px]">
        {STRIP.map((s, i) => (
          <div
            key={s.label + i}
            className={`anim-tilt relative h-[calc(var(--h)*0.6)] overflow-hidden rounded-t-2xl border-4 border-b-0 border-white sm:h-[calc(var(--h)*0.8)] tab:h-[var(--h)] ${
              i === 0 || i === STRIP.length - 1 ? "hidden sm:block" : ""
            }`}
            style={{ ...tilt(s.rotate, 700 + i * 110), "--h": `${s.height}px`, background: s.bg } as CSSProperties}
          >
            {s.src ? (
              <Image src={s.src} alt={s.label} fill preload={i === 2} sizes="(min-width: 640px) 20vw, 33vw" className="object-cover" />
            ) : (
              <div role="img" aria-label={s.label} className="flex h-full items-center justify-center font-display text-[clamp(28px,3.4vw,52px)] text-white">
                {s.fallback}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
