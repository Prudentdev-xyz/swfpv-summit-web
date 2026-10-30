"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowCircle } from "@/components/buttons/arrow-circle";
import { submitRegistration, type Category, type Payloads } from "@/lib/registration";

const HEARD_FROM = [
  "Official invitation",
  "Email",
  "LinkedIn",
  "X (Twitter)",
  "Facebook or Instagram",
  "WhatsApp",
  "A colleague or friend",
  "News or media",
  "Other",
];

const INPUT =
  "w-full rounded-xl border-[1.5px] bg-surface px-4 text-base text-heading outline-none transition-colors placeholder:text-subtle focus:border-ocean aria-[invalid=true]:border-red-500";

export type FieldErrors = Record<string, string>;

/** Input classes; the border turns red through aria-invalid when the API flags the field. */
export const inputClass = (errors: FieldErrors, name: string, extra = "h-[52px]") =>
  `${INPUT} ${extra} ${errors[name] ? "" : "border-line"}`;

type FieldProps = {
  name: string;
  label: string;
  errors: FieldErrors;
  optional?: boolean;
  hint?: string;
  children: (props: { id: string; name: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
};

/** Label, control and either the API's error or a hint underneath. */
export function Field({ name, label, errors, optional, hint, children }: FieldProps) {
  const id = `reg-${name}`;
  const error = errors[name];
  const note = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-bold text-heading">
        {label}
        {optional && <span className="font-medium text-subtle"> (optional)</span>}
      </label>
      {children({ id, name, "aria-invalid": Boolean(error), "aria-describedby": note })}
      {error ? (
        <span id={note} className="text-sm font-semibold text-red-600 dark:text-red-400">
          {error}
        </span>
      ) : (
        hint && (
          <span id={note} className="text-sm text-subtle">
            {hint}
          </span>
        )
      )}
    </div>
  );
}

export function PhoneField({ errors, label = "Phone number" }: { errors: FieldErrors; label?: string }) {
  return (
    <Field name="phone" label={label} errors={errors} hint="For example 0803 123 4567 or +234 803 123 4567">
      {(p) => (
        <input
          {...p}
          className={inputClass(errors, p.name)}
          type="tel"
          required
          autoComplete="tel"
          pattern="\+?[\d\s\(\)\-]{7,24}"
          title="7 to 15 digits, optionally starting with +"
        />
      )}
    </Field>
  );
}

type Text = (key: string) => string;

type RegistrationFormProps<C extends Category> = {
  category: C;
  /** Reads this form's own fields; email, phone, consent and the rest are added here. */
  toPayload: (text: Text, optional: (key: string) => string | undefined) => Payloads[C];
  /** Line on the success screen about what happens next. */
  nextSteps: string;
  children: (errors: FieldErrors) => ReactNode;
};

export function RegistrationForm<C extends Category>({ category, toPayload, nextSteps, children }: RegistrationFormProps<C>) {
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [reference, setReference] = useState<string>();

  // The API sleeps when idle and can take a while to wake; tell people it's still working.
  useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, [pending]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const data = new FormData(e.currentTarget);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const optional = (key: string) => text(key) || undefined;

    setPending(true);
    setFormError(undefined);
    setFieldErrors({});
    const result = await submitRegistration(category, {
      ...toPayload(text, optional),
      email: text("email"),
      phone: text("phone"),
      how_did_you_hear: optional("how_did_you_hear"),
      consent: data.get("consent") === "on",
      honeypot: String(data.get("honeypot") ?? ""),
    });
    setPending(false);
    setSlow(false);

    if (result.ok) {
      setReference(result.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFieldErrors(result.fieldErrors);
      setFormError(result.formError);
    }
  }

  if (reference) {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-2xl border-[1.5px] border-line bg-frost p-[clamp(24px,4vw,44px)]">
        <span className="text-[13px] font-extrabold tracking-[.08em] text-ocean uppercase">Application received</span>
        <h2 className="m-0 text-[clamp(26px,3vw,36px)] leading-tight font-extrabold text-heading">
          Thank you. Your registration is in.
        </h2>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-subtle">Your reference</span>
          <span className="font-mono text-[clamp(24px,3vw,32px)] font-bold tracking-wider text-heading">{reference}</span>
        </div>
        <p className="m-0 max-w-[560px] text-base leading-[1.6] text-muted">
          We&apos;ve sent a confirmation email. {nextSteps} Keep your reference for any enquiries.
        </p>
        <Link
          href="/"
          className="inline-flex h-[52px] items-center gap-3 rounded-full bg-navy pr-2 pl-6 text-base font-extrabold text-white hover:bg-ocean hover:text-white"
        >
          Back to the summit
          <ArrowCircle className="size-9 bg-sky text-white" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {children(fieldErrors)}

      <Field name="how_did_you_hear" label="How did you hear about the summit?" optional errors={fieldErrors}>
        {(p) => (
          <select {...p} className={`${inputClass(fieldErrors, p.name)} cursor-pointer`} defaultValue="">
            <option value="">Select an option</option>
            {HEARD_FROM.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        )}
      </Field>

      {/* Anti-spam trap: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this empty <input name="honeypot" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.55] text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(fieldErrors.consent)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy dark:accent-sky"
          />
          I agree to the organisers processing my details to manage my registration and contact me about the summit.
        </label>
        {fieldErrors.consent && (
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">{fieldErrors.consent}</span>
        )}
      </div>

      {formError && (
        <p role="alert" className="m-0 rounded-xl border-[1.5px] border-red-500/40 bg-red-500/10 px-4 py-3 text-[15px] font-semibold text-red-700 dark:text-red-300">
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-[58px] cursor-pointer items-center gap-3 rounded-full bg-navy pr-2 pl-7 text-base font-extrabold text-white transition-colors hover:bg-ocean disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Submitting…" : "Submit registration"}
          <ArrowCircle className="size-[42px] bg-sky text-lg text-white" />
        </button>
        {slow && <span className="text-sm text-subtle">Still working, this can take up to a minute…</span>}
      </div>
    </form>
  );
}
