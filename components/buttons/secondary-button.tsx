import type { ComponentProps } from "react";

const SIZES = {
  md: "h-[50px] px-6 text-[15px] hover:bg-navy hover:text-white",
  lg: "h-[58px] bg-white px-7 text-base hover:border-sky hover:bg-sky hover:text-white",
};

type SecondaryButtonProps = ComponentProps<"a"> & { size?: keyof typeof SIZES };

/** Outlined navy pill link for secondary actions. */
export function SecondaryButton({ size = "lg", className = "", ...props }: SecondaryButtonProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center rounded-full border-2 border-navy font-extrabold whitespace-nowrap text-navy transition-colors ${SIZES[size]} ${className}`}
    />
  );
}
