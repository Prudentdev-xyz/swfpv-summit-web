"use client";

import { Field, PhoneField, RegistrationForm, inputClass } from "@/components/registration-form";

const INTERESTS = [
  "Headline sponsorship",
  "Session or panel sponsorship",
  "Exhibition stand",
  "Technical or knowledge partnership",
  "Media partnership",
  "In-kind support",
  "Not sure yet, let's talk",
];

export function SponsorForm() {
  return (
    <RegistrationForm
      category="sponsor"
      nextSteps="Your application is now pending review, and the organisers will be in touch about the next steps."
      toPayload={(text, optional) => ({
        organisation_name: text("organisation_name"),
        contact_name: text("contact_name"),
        job_title: text("job_title"),
        location: text("location"),
        sponsorship_interest: text("sponsorship_interest"),
        website: optional("website"),
        message: optional("message"),
      })}
    >
      {(errors) => (
        <>
          <div className="grid gap-6 min-[640px]:grid-cols-2">
            <Field name="organisation_name" label="Organisation name" errors={errors}>
              {(p) => (
                <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={160} autoComplete="organization" />
              )}
            </Field>
            <Field name="website" label="Website" optional errors={errors} hint="e.g. yourcompany.com">
              {(p) => <input {...p} className={inputClass(errors, p.name)} inputMode="url" autoComplete="url" maxLength={300} />}
            </Field>
            <Field name="contact_name" label="Contact person" errors={errors}>
              {(p) => <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={120} autoComplete="name" />}
            </Field>
            <Field name="job_title" label="Job title / position" errors={errors}>
              {(p) => (
                <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={160} autoComplete="organization-title" />
              )}
            </Field>
            <Field name="email" label="Email address" errors={errors}>
              {(p) => <input {...p} className={inputClass(errors, p.name)} type="email" required autoComplete="email" />}
            </Field>
            <PhoneField errors={errors} />
          </div>

          <Field name="location" label="Company address" errors={errors} hint="Street, city and state">
            {(p) => <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={160} autoComplete="street-address" />}
          </Field>

          <Field name="sponsorship_interest" label="Sponsorship interest" errors={errors}>
            {(p) => (
              <select {...p} className={`${inputClass(errors, p.name)} cursor-pointer`} required defaultValue="">
                <option value="" disabled>
                  Select the kind of support
                </option>
                {INTERESTS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}
          </Field>

          <Field name="message" label="Message" optional errors={errors} hint="Anything you'd like the organisers to know, such as what you'd like to showcase.">
            {(p) => <textarea {...p} className={inputClass(errors, p.name, "min-h-[140px] py-3")} rows={5} maxLength={2000} />}
          </Field>
        </>
      )}
    </RegistrationForm>
  );
}
