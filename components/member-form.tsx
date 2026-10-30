"use client";

import { Field, PhoneField, RegistrationForm, inputClass } from "@/components/registration-form";

export function MemberForm() {
  return (
    <RegistrationForm
      category="member"
      nextSteps="Your application is now pending review, and we'll email you again once the organisers have made a decision."
      toPayload={(text, optional) => ({
        full_name: text("full_name"),
        job_title: text("job_title"),
        location: text("location"),
        organisation: optional("organisation"),
      })}
    >
      {(errors) => (
        <div className="grid gap-6 min-[640px]:grid-cols-2">
          <Field name="full_name" label="Full name" errors={errors}>
            {(p) => <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={120} autoComplete="name" />}
          </Field>
          <Field name="email" label="Email address" errors={errors}>
            {(p) => <input {...p} className={inputClass(errors, p.name)} type="email" required autoComplete="email" />}
          </Field>
          <PhoneField errors={errors} />
          <Field name="job_title" label="Job title / position" errors={errors}>
            {(p) => (
              <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={160} autoComplete="organization-title" />
            )}
          </Field>
          <Field name="organisation" label="Organisation" optional errors={errors}>
            {(p) => <input {...p} className={inputClass(errors, p.name)} maxLength={160} autoComplete="organization" />}
          </Field>
          <Field name="location" label="Travelling from" errors={errors} hint="City and state, e.g. Ibadan, Oyo State">
            {(p) => <input {...p} className={inputClass(errors, p.name)} required minLength={2} maxLength={160} />}
          </Field>
        </div>
      )}
    </RegistrationForm>
  );
}
