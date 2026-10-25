import Image from "next/image";
import { CONTACT } from "@/lib/summit";
import { GUTTER } from "@/lib/styles";

export function Footer() {
  return (
    <footer className={`bg-white pt-14 pb-9 ${GUTTER}`}>
      <div className="grid items-start gap-10 min-[760px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <Image src="/dolf-hydrometric-logo.png" alt="D-OLF Hydrometric Nigeria Limited" width={256} height={152} className="h-16 w-auto self-start" />
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
          <a href={CONTACT.phone.href}>{CONTACT.phone.display}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.website} target="_blank" rel="noopener noreferrer">
            dolfhydrometric.com
          </a>
        </div>
      </div>
      <div className="mt-11 border-t border-line pt-5 text-[13px] text-subtle">
        © 2026 D-OLF Hydrometric Nigeria Limited
      </div>
    </footer>
  );
}
