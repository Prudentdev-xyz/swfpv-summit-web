import { TICKER } from "@/lib/summit";

export function Ticker() {
  return (
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
  );
}
