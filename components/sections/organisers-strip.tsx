import { GUTTER } from "@/lib/styles";

/**
 * Extra top padding leaves room for the countdown panel that overlaps this strip;
 * -mt-px tucks it under the hero so no sub-pixel seam shows between them.
 */
export function OrganisersStrip() {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-7 gap-y-3 -mt-px bg-navy ${GUTTER} pt-[74px] pb-[26px] text-center text-white sm:pt-[98px]`}>
      <span className="text-[13px] font-bold tracking-[.08em] text-sky uppercase">Organised by</span>
      <span className="text-base font-bold">D-OLF Hydrometric Nigeria Limited</span>
      <span aria-hidden className="hidden size-2 rotate-45 bg-sky sm:block" />
      <span className="text-base font-bold">D-OLF Southwest Clean Energy Infrastructure Limited</span>
    </div>
  );
}
