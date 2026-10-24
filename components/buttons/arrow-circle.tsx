/** The round "↗" badge that sits at the end of the pill buttons. */
export function ArrowCircle({ className }: { className: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center rounded-full ${className}`}>
      ↗
    </span>
  );
}
