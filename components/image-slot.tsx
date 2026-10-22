import Image from "next/image";

type ImageSlotProps = {
  /** Caption shown while no photo is set. */
  placeholder: string;
  src?: string;
  alt?: string;
  shape?: "rect" | "circle";
  sizes?: string;
};

// Fills its parent. Shows a dashed placeholder until a real photo is passed in.
export function ImageSlot({
  placeholder,
  src,
  alt = placeholder,
  shape = "rect",
  sizes = "50vw",
}: ImageSlotProps) {
  const radius = shape === "circle" ? "rounded-full" : "";

  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${radius}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={placeholder}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-1.5 overflow-hidden bg-[rgba(127,127,127,.08)] p-3 text-center text-[13px] leading-[1.3] ${radius}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-45"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="max-w-[90%] font-medium tracking-[.01em] opacity-75">
        {placeholder}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-current opacity-35 ${radius}`}
      />
    </div>
  );
}
