import type { ComponentProps } from "react";

const SIZES = {
  // md sits on page sections and follows the theme; lg sits on the dark hero.
  md: "h-[50px] border-heading px-6 text-[15px] text-heading hover:bg-heading hover:text-surface",
  lg: "h-[58px] border-navy bg-white px-7 text-base text-navy hover:border-sky hover:bg-sky hover:text-white",
};

type SecondaryButtonProps = ComponentProps<"a"> & { size?: keyof typeof SIZES };

/** Outlined navy pill link for secondary actions. */
export function SecondaryButton({ size = "lg", className = "", ...props }: SecondaryButtonProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center rounded-full border-2 font-extrabold whitespace-nowrap transition-colors ${SIZES[size]} ${className}`}
    />
  );
}
