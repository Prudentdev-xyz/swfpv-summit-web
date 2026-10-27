import type { ComponentProps } from "react";
import { ArrowCircle } from "./arrow-circle";

const SIZES = {
  sm: { button: "h-11 gap-2.5 pr-1.5 pl-5 text-[15px] font-bold", arrow: "size-8" },
  lg: { button: "h-[58px] gap-3 pr-2 pl-7 text-base font-extrabold", arrow: "size-[42px] text-lg" },
};

type PrimaryButtonProps = ComponentProps<"a"> & { size?: keyof typeof SIZES };

/** Navy pill link with a sky arrow badge, used for the main Register calls. */
export function PrimaryButton({ size = "lg", className = "", children, ...props }: PrimaryButtonProps) {
  const s = SIZES[size];
  return (
    <a
      {...props}
      className={`inline-flex items-center rounded-full bg-navy whitespace-nowrap text-white transition-colors hover:bg-ocean hover:text-white ${s.button} ${className}`}
    >
      {children}
      <ArrowCircle className={`bg-sky ${s.arrow}`} />
    </a>
  );
}
