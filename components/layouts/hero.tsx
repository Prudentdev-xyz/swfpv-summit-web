import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { Countdown } from "@/components/countdown";
import { TAG, delay, tilt } from "@/lib/styles";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-navy px-[clamp(20px,4vw,56px)] pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Floating solar loop under a navy overlay. Reduced motion gets the still poster. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/floating-solar.jpg)" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/floating-solar.jpg"
          className="size-full object-cover motion-reduce:hidden"
        >
          <source src="/hero/floating-solar.webm" type="video/webm" />
          <source src="/hero/floating-solar.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(43_38_106/0.55)_0%,rgb(43_38_106/0.45)_45%,rgb(43_38_106/0.8)_85%,#2b266a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_45%,rgb(28_26_74/0.55)_0%,rgb(28_26_74/0)_100%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center">
        <div
          className={`${TAG} anim-pop bg-white/10 py-2 whitespace-nowrap ring-1 ring-white/40 backdrop-blur-sm`}
          style={tilt(-3, 600)}
        >
          Official Invitation
        </div>
        <h1 className="m-0 flex flex-col items-center font-display text-[clamp(56px,9.4vw,156px)] leading-[.92] font-normal tracking-[-.005em] text-white uppercase">
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
          className="anim-pop absolute -top-2 right-[4%] z-[2] hidden rounded-lg bg-sky px-4 py-2.5 text-base font-extrabold whitespace-nowrap text-white shadow-[4px_4px_0_#FFFFFF] tab:flex"
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

        <p className="m-0 max-w-[640px] text-[clamp(18px,1.6vw,22px)] leading-[1.35] font-bold text-balance text-sky">
          150MWp Floating Solar PV Power Plant Infrastructure Pipeline
        </p>
        <p className="m-0 max-w-[620px] text-[17px] leading-[1.6] text-balance text-pale">
          <strong className="text-white">Theme:</strong> Floating Solar Architecture: Global
          Blueprints for Southwest Nigeria’s Clean Energy Future
        </p>
        <Countdown />
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton href="#rsvp" className="ring-2 ring-white">
            RSVP now
          </PrimaryButton>
          <SecondaryButton href="#programme">View Programme</SecondaryButton>
        </div>
        <p className="m-0 text-[15px] font-bold text-white tab:hidden">
          3–5 Dec 2026 · IITA, Ibadan · Hybrid
        </p>
      </div>
    </header>
  );
}
