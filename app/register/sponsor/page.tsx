import type { Metadata } from "next";
import Link from "next/link";
import { SponsorForm } from "@/components/sponsor-form";
import { DISPLAY, GUTTER, SECTION_Y } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Sponsor registration | Southwest Regional Stakeholder Summit",
  description: "Register your organisation as a sponsor of the Southwest Regional Stakeholder Summit, 3 and 4 December 2026.",
};

export default function SponsorRegistrationPage() {
  return (
    <section className={`${GUTTER} ${SECTION_Y}`}>
      <div className="mx-auto flex max-w-[760px] flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Link href="/register" className="self-start text-[15px] font-semibold text-ocean hover:text-heading">
            ← All registration options
          </Link>
          <h1 className={`${DISPLAY} text-[clamp(44px,6vw,80px)] leading-[.95] text-heading`}>
            Sponsor <span className="text-ocean">registration</span>
          </h1>
          <p className="m-0 text-lg leading-[1.6] text-muted">
            Tell us about your organisation and how you&apos;d like to support the summit. The organisers review
            every application, and you&apos;ll get an email confirming we&apos;ve received yours.
          </p>
        </div>
        <SponsorForm />
      </div>
    </section>
  );
}
