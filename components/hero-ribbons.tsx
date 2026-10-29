import type { CSSProperties } from "react";

/*
 * Five glowing ribbons sweeping up to the right. Each ribbon is its own layer on a
 * slow 34–50s loop (drift, tilt, swell), so the compositor moves pre-drawn shapes
 * instead of repainting the SVG. Colours come from the --rb-* tokens in globals.css,
 * which flip with the theme.
 */
const RIBBONS = [
  {
    d: "M-300 170 C200 130 520 40 760 -150 L940 -150 C680 70 300 240 -300 290 Z",
    edge: "M-300 170 C200 130 520 40 760 -150",
    fill: "rb-c",
    motion: { dur: 37, delay: -12, dx: "3%", dy: "2%", rot: "-3deg", sw: 1.18 },
  },
  {
    d: "M-300 380 C300 320 800 150 1180 -150 L1520 -150 C1120 160 620 400 -300 540 Z",
    edge: "M-300 380 C300 320 800 150 1180 -150",
    fill: "rb-a",
    motion: { dur: 42, delay: -6, dx: "2.5%", dy: "-3%", rot: "-2.5deg", sw: 1.14 },
  },
  {
    d: "M-300 630 C400 580 1000 450 1650 -60 L1900 170 C1300 540 600 730 -300 820 Z",
    edge: "M-300 630 C400 580 1000 450 1650 -60",
    fill: "rb-b",
    motion: { dur: 50, delay: -20, dx: "-2%", dy: "2.5%", rot: "2deg", sw: 1.1 },
  },
  {
    d: "M-300 920 C500 840 1100 710 1900 520 L1900 770 C1200 870 600 960 -300 1060 Z",
    edge: "M-300 920 C500 840 1100 710 1900 520",
    fill: "rb-a",
    motion: { dur: 46, delay: -30, dx: "-3%", dy: "-2.5%", rot: "1.5deg", sw: 1.12 },
  },
  {
    d: "M-300 1150 C600 1090 1200 1000 1900 920 L1900 1250 L-300 1250 Z",
    edge: "M-300 1150 C600 1090 1200 1000 1900 920",
    fill: "rb-b",
    motion: { dur: 34, delay: -3, dx: "2%", dy: "3%", rot: "-1.5deg", sw: 1.08 },
  },
];

export function HeroRibbons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-(--rb-base)">
      {/* Shared gradients, referenced by every ribbon layer below. */}
      <svg className="absolute size-0">
        <defs>
          <linearGradient id="rb-a" gradientUnits="userSpaceOnUse" x1="0" x2="1600" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: "var(--rb-1)" }} />
            <stop offset=".55" style={{ stopColor: "var(--rb-2)" }} />
            <stop offset="1" style={{ stopColor: "var(--rb-3)" }} />
          </linearGradient>
          <linearGradient id="rb-b" gradientUnits="userSpaceOnUse" x1="0" x2="1600" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: "var(--rb-1)" }} />
            <stop offset=".45" style={{ stopColor: "var(--rb-2)" }} />
            <stop offset=".8" style={{ stopColor: "var(--rb-4)" }} />
            <stop offset="1" style={{ stopColor: "var(--rb-3)" }} />
          </linearGradient>
          <linearGradient id="rb-c" gradientUnits="userSpaceOnUse" x1="0" x2="1600" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: "var(--rb-2)" }} />
            <stop offset="1" style={{ stopColor: "var(--rb-3)" }} />
          </linearGradient>
        </defs>
      </svg>

      {RIBBONS.map(({ d, edge, fill, motion }, i) => (
        <div
          key={i}
          className="anim-ribbon absolute -inset-[12%]"
          style={
            {
              "--dur": `${motion.dur}s`,
              "--delay": `${motion.delay}s`,
              "--dx": motion.dx,
              "--dy": motion.dy,
              "--rot": motion.rot,
              "--sw": motion.sw,
            } as CSSProperties
          }
        >
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            className="size-full overflow-visible [filter:var(--rb-blur)]"
          >
            <path d={d} fill={`url(#${fill})`} style={{ opacity: "var(--rb-alpha)" }} />
            <path d={edge} fill="none" strokeWidth="10" style={{ stroke: "var(--rb-edge)", opacity: 0.25 }} />
            <path d={edge} fill="none" strokeWidth="1.6" style={{ stroke: "var(--rb-edge)", opacity: 0.85 }} />
          </svg>
        </div>
      ))}

      {/* Darkens the gaps between ribbons in dark mode; a no-op wash in light mode. */}
      <div className="absolute inset-0 bg-(image:--rb-vignette)" />
    </div>
  );
}
