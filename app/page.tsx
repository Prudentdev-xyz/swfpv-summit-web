import type { CSSProperties } from "react";
import Image from "next/image";
import { Programme } from "@/components/programme";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteNav } from "@/components/site-nav";
import { SouthwestMap } from "@/components/sw-map";
import { DAMS, PARTNERS, PEOPLE, STATS, STRIP, TICKER } from "@/lib/summit";

const GUTTER = "px-[clamp(24px,5vw,88px)]";
const SECTION_Y = "py-[72px] sm:py-24 tab:py-[120px]";
const DISPLAY = "m-0 font-display font-normal uppercase";
const TAG = "rounded-md px-3 py-1.5 text-[13px] font-extrabold tracking-[.08em] text-white uppercase";

const PHONE = { display: "09127975829", href: "tel:+2349127975829" };
const EMAIL = "info@dolfhydrometric.com";

/** Set to a file in /public (e.g. "/venue-iita.jpg") to replace the venue panel with a photo. */
const VENUE_PHOTO: string | null = null;

const STAKEHOLDER_LOGOS = [
  { src: "/logo-borbda.jpg", alt: "Benin-Owena River Basin Development Authority", width: 1024, height: 1024, bg: "bg-white border-2 border-line", maxH: "max-h-[82px]" },
  { src: "/logo-nrg.png", alt: "NRG Island", width: 2362, height: 2368, bg: "bg-[#18213F]", maxH: "max-h-[90px]" },
  { src: "/logo-seaflex.webp", alt: "Seaflex", width: 772, height: 262, bg: "bg-white border-2 border-line", maxH: "max-h-[70px]" },
];

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });
const tilt = (deg: number, ms: number) => ({ "--r": `${deg}deg`, animationDelay: `${ms}ms` }) as CSSProperties;

function Arrow({ size }: { size: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center rounded-full ${size}`}>
      ↗
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav />
      <RevealOnScroll />

      {/* Hero */}
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
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#rsvp"
              className="inline-flex h-[58px] items-center gap-3 rounded-full bg-navy pr-2 pl-7 text-base font-extrabold whitespace-nowrap text-white transition-colors hover:bg-ocean hover:text-white"
            >
              RSVP now
              <Arrow size="size-[42px] bg-sky text-lg" />
            </a>
            <a
              href="#programme"
              className="inline-flex h-[58px] items-center rounded-full border-2 border-navy bg-white px-7 text-base font-extrabold whitespace-nowrap text-navy transition-colors hover:border-sky hover:bg-sky hover:text-white"
            >
              View Programme
            </a>
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

      {/* Organisers strip */}
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 bg-navy px-[clamp(24px,5vw,88px)] py-[26px] text-center text-white">
        <span className="text-[13px] font-bold tracking-[.08em] text-sky uppercase">Organised by</span>
        <span className="text-base font-bold">D-OLF Hydrometric Nigeria Limited</span>
        <span aria-hidden className="hidden size-2 rotate-45 bg-sky sm:block" />
        <span className="text-base font-bold">D-OLF Southwest Clean Energy Infrastructure Limited</span>
      </div>

      {/* About */}
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

      {/* Figures */}
      <section className={`pt-0 ${GUTTER} pb-[72px] sm:pb-24 tab:pb-[120px]`}>
        <div className="grid grid-cols-2 border-y-2 border-navy tab:grid-cols-4">
          {STATS.map((st, i) => (
            <div
              key={st.label}
              data-reveal=""
              className={`flex flex-col gap-2.5 border-navy px-4 py-6 sm:px-7 sm:py-9 ${
                i % 2 === 0 ? "border-r-2" : i < STATS.length - 1 ? "tab:border-r-2" : ""
              } ${i < 2 ? "border-b-2 tab:border-b-0" : ""}`}
            >
              <span className="font-display text-[clamp(64px,6.4vw,104px)] leading-[.95] text-navy">
                <span data-count={st.n}>{st.n}</span>
                {st.unit && <span className="ml-1.5 text-[.4em] text-sky">{st.unit}</span>}
              </span>
              <span className="text-[15px] leading-[1.45] font-semibold text-muted">{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Host & speakers */}
      <section id="speakers" className="scroll-mt-[76px]">
        <div data-reveal="" className={`mb-10 flex flex-wrap items-end justify-between gap-6 ${GUTTER}`}>
          <h2 className={`${DISPLAY} text-[clamp(48px,6vw,96px)] leading-[.95] text-navy`}>
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
            <article
              key={p.name}
              data-reveal=""
              className="relative aspect-[3/4] overflow-hidden text-white transition-[filter] hover:brightness-[1.06]"
              style={{ background: p.bg }}
            >
              <Image
                src={p.photo}
                alt={`${p.name} headshot`}
                fill
                sizes="(min-width: 1100px) 25vw, (min-width: 560px) 50vw, 100vw"
                className="object-cover object-[center_20%]"
              />
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-[22px] py-6"
                style={{ background: p.bg }}
              >
                {p.host && (
                  <span className="-rotate-2 self-start rounded-[5px] bg-white px-2.5 py-1 text-[10px] font-extrabold tracking-[.08em] whitespace-nowrap text-navy uppercase">
                    Host &amp; Moderator
                  </span>
                )}
                <h3 className={`${DISPLAY} text-[clamp(24px,2.1vw,32px)] leading-none`}>{p.name}</h3>
                <span className="text-[13px] leading-[1.4] font-medium" style={{ color: p.sub }}>
                  {p.role}
                </span>
                <span className="mt-1 text-xs font-extrabold tracking-[.06em]">{p.when}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* International partners */}
      <section className={`bg-navy text-white ${GUTTER} ${SECTION_Y}`}>
        <div data-reveal="" className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className={`${DISPLAY} text-[clamp(44px,5vw,80px)] leading-[.95]`}>
            Global engineering,
            <br />
            <span className="text-sky">broadcast live</span>
          </h2>
          <p className="m-0 max-w-[380px] text-base leading-[1.6] text-pale">
            Four partners from Europe and North America present to the summit floor via live
            Zoom broadcast.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
          {PARTNERS.map((p) => (
            <article
              key={p.name}
              data-reveal=""
              className="flex flex-col gap-4 rounded-[20px] bg-white p-[18px] text-navy transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-1"
            >
              <div
                className="relative flex h-[140px] items-center justify-center overflow-hidden rounded-xl"
                style={{ background: p.logo?.bg ?? "#E6F7FE" }}
              >
                {p.logo ? (
                  <Image
                    src={p.logo.src}
                    alt={p.name}
                    width={p.logo.width}
                    height={p.logo.height}
                    sizes="240px"
                    className="block h-auto max-h-[120px] w-auto object-contain"
                    style={{ maxWidth: p.logo.maxW }}
                  />
                ) : (
                  <span className="px-4 text-center font-display text-[30px] leading-none text-ocean uppercase">
                    {p.name.replace(/ \(.*\)$/, "")}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 px-1.5 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-ocean">{p.country}</span>
                  <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-sky px-2.5 text-xs font-extrabold whitespace-nowrap text-white">
                    <span className="anim-blink size-[7px] rounded-full bg-white" />
                    Live via Zoom
                  </span>
                </div>
                <h3 className={`${DISPLAY} text-[28px] leading-none`}>{p.name}</h3>
                <p className="m-0 flex-1 text-[15px] leading-[1.55] text-pretty text-muted">{p.talk}</p>
                <span className="text-[13px] font-extrabold text-navy">{p.when}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Programme />

      {/* Venue */}
      <section
        id="venue"
        className={`grid scroll-mt-[76px] items-center gap-[clamp(40px,6vw,88px)] tab:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] ${GUTTER} ${SECTION_Y}`}
      >
        <div data-reveal="" className="relative">
          <div className="relative aspect-[5/4] -rotate-2 overflow-hidden rounded-3xl border-[6px] border-navy bg-ice">
            {VENUE_PHOTO ? (
              <Image
                src={VENUE_PHOTO}
                alt="IITA Conference Center, Ibadan"
                fill
                sizes="(min-width: 960px) 55vw, 100vw"
                className="scale-[1.2] object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-start justify-end gap-3 bg-navy p-[clamp(24px,4vw,48px)] text-white">
                <span className="font-display text-[clamp(72px,10vw,160px)] leading-[.85] text-sky">IITA</span>
                <span className="font-display text-[clamp(22px,2.4vw,36px)] leading-none uppercase">
                  Conference Center
                </span>
                <span className="text-[15px] font-semibold text-pale">
                  In person, with partners live via Zoom
                </span>
              </div>
            )}
          </div>
          <div className="absolute -right-2.5 -bottom-5 rotate-[5deg] rounded-lg bg-sky px-4 py-2.5 text-[15px] font-extrabold text-white shadow-[4px_4px_0_#2B266A]">
            Ibadan, Nigeria
          </div>
        </div>
        <div data-reveal="" className="flex flex-col gap-5">
          <span className={`${TAG} -rotate-2 self-start bg-navy`}>Venue &amp; package</span>
          <h2 className={`${DISPLAY} text-[clamp(34px,3.4vw,54px)] leading-none text-navy`}>
            International Institute of Tropical Agriculture (IITA) Conference Center
          </h2>
          <p className="m-0 text-base leading-[1.7] text-muted">
            A hybrid summit: in-person sessions at IITA, with international partners presenting
            through live Zoom broadcasts.
          </p>
          <div className="grid grid-cols-[130px_minmax(0,1fr)] overflow-hidden rounded-2xl bg-sky text-white">
            <div className="relative min-h-[140px] bg-mist">
              <Image src="/room.jpg" alt="VIP accommodation room" fill sizes="130px" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-1.5 px-[22px] py-5">
              <span className="text-[13px] font-extrabold tracking-[.06em] uppercase">VIP package · Included</span>
              <span className="text-xl leading-[1.25] font-extrabold">2 nights full-board accommodation</span>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=IITA+Conference+Center+Ibadan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[50px] items-center self-start rounded-full border-2 border-navy px-6 text-[15px] font-extrabold whitespace-nowrap text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View on map ↗
          </a>
        </div>
      </section>

      {/* Partners & stakeholders */}
      <section className={`${GUTTER} pb-[72px] sm:pb-24 tab:pb-[120px]`}>
        <div data-reveal="" className="flex flex-col items-center gap-7 border-t-2 border-navy pt-14">
          <span className="text-[13px] font-extrabold tracking-[.1em] text-ocean uppercase">
            Partners &amp; stakeholders
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {STAKEHOLDER_LOGOS.map((l) => (
              <div
                key={l.src}
                className={`flex h-[110px] w-[140px] items-center justify-center rounded-2xl p-3.5 sm:w-[180px] ${l.bg}`}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.width}
                  height={l.height}
                  sizes="180px"
                  className={`h-auto w-auto max-w-full object-contain ${l.maxH}`}
                />
              </div>
            ))}
            {["Heliorec", "GPS"].map((name) => (
              <div
                key={name}
                className="flex h-[110px] w-[140px] items-center justify-center rounded-2xl border-2 border-line bg-ice font-display text-[28px] text-ocean uppercase sm:w-[180px]"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section
        id="rsvp"
        className={`relative scroll-mt-[76px] overflow-hidden bg-navy text-center text-white ${GUTTER} ${SECTION_Y}`}
      >
        <div data-reveal="" className="relative mx-auto flex max-w-[980px] flex-col items-center gap-[22px]">
          <span className={`${TAG} -rotate-3 bg-sky`}>RSVP &amp; Secretariat</span>
          <h2 className={`${DISPLAY} text-[clamp(56px,8vw,128px)] leading-[.92]`}>
            Save your <span className="text-sky">seat</span>
          </h2>
          <p className="m-0 text-lg leading-[1.6] text-pale">Contact the Summit Secretariat to RSVP.</p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-3.5">
            <a
              href={PHONE.href}
              className="inline-flex h-16 items-center gap-3.5 rounded-full bg-sky pr-2.5 pl-[30px] text-[clamp(18px,2vw,22px)] font-extrabold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-navy"
            >
              {PHONE.display}
              <Arrow size="size-[46px] bg-navy text-lg text-white" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-16 max-w-full items-center rounded-full border-2 border-white px-5 text-[clamp(16px,1.6vw,20px)] font-extrabold text-white transition-colors hover:bg-white hover:text-navy sm:px-[30px]"
            >
              <span className="truncate">{EMAIL}</span>
            </a>
          </div>
          <div className="mt-5 flex flex-col gap-0.5">
            <span className="text-lg font-extrabold">Engr. Idowu Adeshina</span>
            <span className="text-[15px] text-pale">MD/CEO</span>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden bg-sky py-[18px] text-navy" aria-hidden>
        <div className="anim-marquee flex w-max font-display text-[clamp(30px,4vw,44px)] leading-none whitespace-nowrap uppercase will-change-transform">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-9 pr-9">
              {t}
              <span className="size-3.5 rotate-45 bg-white" />
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`bg-white pt-14 pb-9 ${GUTTER}`}>
        <div className="grid items-start gap-10 min-[760px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <Image src="/dolf-logo.png" alt="D-OLF" width={476} height={196} className="h-12 w-auto self-start" />
            <span className="max-w-[320px] text-[15px] leading-normal text-muted">
              Southwest Regional Stakeholder Summit · 3–5 December 2026
            </span>
          </div>
          <div className="flex flex-col gap-2 text-[15px] text-navy">
            <span className="mb-1.5 text-[13px] font-extrabold tracking-[.06em] text-ocean uppercase">Organisers</span>
            <span>D-OLF Hydrometric Nigeria Limited</span>
            <span>D-OLF Southwest Clean Energy Infrastructure Limited</span>
          </div>
          <div className="flex flex-col gap-2 text-[15px]">
            <span className="mb-1.5 text-[13px] font-extrabold tracking-[.06em] text-ocean uppercase">Contact</span>
            <a href={PHONE.href}>{PHONE.display}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="https://dolfhydrometric.com" target="_blank" rel="noopener noreferrer">
              dolfhydrometric.com
            </a>
          </div>
        </div>
        <div className="mt-11 border-t border-line pt-5 text-[13px] text-subtle">
          © 2026 D-OLF Hydrometric Nigeria Limited
        </div>
      </footer>
    </div>
  );
}
