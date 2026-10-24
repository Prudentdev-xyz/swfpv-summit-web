import type { CSSProperties } from "react";

/** Shared class strings so every section lines up the same way. */
export const GUTTER = "px-[clamp(24px,5vw,88px)]";
export const SECTION_Y = "py-[72px] sm:py-24 tab:py-[120px]";
export const SECTION_PB = "pb-[72px] sm:pb-24 tab:pb-[120px]";
export const DISPLAY = "m-0 font-display font-normal uppercase";
export const TAG = "rounded-md px-3 py-1.5 text-[13px] font-extrabold tracking-[.08em] text-white uppercase";

export const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Rotation plus entrance delay for the anim-pop and anim-tilt classes. */
export const tilt = (deg: number, ms: number) =>
  ({ "--r": `${deg}deg`, animationDelay: `${ms}ms` }) as CSSProperties;
