import type { Metadata } from "next";
import Link from "next/link";
import { ArrowCircle } from "@/components/buttons/arrow-circle";
import { DISPLAY, GUTTER, SECTION_Y } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Register | Southwest Regional Stakeholder Summit",
  description: "Register for the Southwest Regional Stakeholder Summit as a delegate or a sponsor.",
};

const CARD = "flex flex-col gap-4 rounded-2xl border-[1.5px] p-[clamp(24px,3vw,36px)] text-left";

export default function RegisterPage() {
  return (
    <section className={`${GUTTER} ${SECTION_Y}`}>
      <div className="mx-auto flex max-w-[980px] flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-[13px] font-extrabold tracking-[.08em] text-ocean uppercase">
            3 & 4 December 2026 · IITA, Ibadan
          </span>
          <h1 className={`${DISPLAY} text-[clamp(44px,6vw,88px)] leading-[.95] text-heading`}>
            How would you like to <span className="text-ocean">join</span>?
          </h1>
          <p className="m-0 max-w-[620px] text-lg leading-[1.6] text-muted">
            Choose the registration that fits you. Every application is reviewed by the organisers, and
            you&apos;ll get an email once a decision is made.
          </p>
        </div>

        <div className="grid gap-5 min-[720px]:grid-cols-2">
          <Link
            href="/register/member"
            className={`${CARD} group border-line bg-frost transition-colors hover:border-ocean hover:bg-ice`}
          >
            <span className="text-[13px] font-extrabold tracking-[.08em] text-ocean uppercase">Delegate</span>
            <span className="text-[clamp(24px,2.4vw,30px)] font-extrabold text-heading">Register as a public member</span>
            <span className="text-base leading-[1.6] text-muted">
              For government officials, community leaders, researchers, investors and anyone attending the
              summit in person or online.
            </span>
            <span className="mt-auto flex items-center gap-3 pt-2 text-base font-extrabold text-heading group-hover:text-ocean">
              Start registration
              <ArrowCircle className="size-10 bg-navy text-white transition-colors group-hover:bg-ocean" />
            </span>
          </Link>

          <Link
            href="/register/sponsor"
            className={`${CARD} group border-line bg-frost transition-colors hover:border-ocean hover:bg-ice`}
          >
            <span className="text-[13px] font-extrabold tracking-[.08em] text-ocean uppercase">Partner</span>
            <span className="text-[clamp(24px,2.4vw,30px)] font-extrabold text-heading">Register as a sponsor</span>
            <span className="text-base leading-[1.6] text-muted">
              For organisations that want to sponsor the summit, exhibit, or showcase their work to
              stakeholders.
            </span>
            <span className="mt-auto flex items-center gap-3 pt-2 text-base font-extrabold text-heading group-hover:text-ocean">
              Start registration
              <ArrowCircle className="size-10 bg-navy text-white transition-colors group-hover:bg-ocean" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
