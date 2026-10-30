/**
 * Client for the public registration endpoints of the SWFPV Summit API.
 * Called straight from the browser: the API rate-limits per visitor IP, so
 * proxying through our server would make every visitor share one limit.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Category = "member" | "sponsor";

/** Fields both forms send. */
export type CommonFields = {
  email: string;
  phone: string;
  how_did_you_hear?: string;
  consent: boolean;
  /** Anti-spam trap: always the raw value of the hidden input, never set from code. */
  honeypot: string;
};

export type MemberFields = {
  full_name: string;
  job_title: string;
  location: string;
  organisation?: string;
};

export type SponsorFields = {
  organisation_name: string;
  contact_name: string;
  job_title: string;
  location: string;
  sponsorship_interest: string;
  website?: string;
  message?: string;
};

/** Category-specific fields for each endpoint. */
export type Payloads = { member: MemberFields; sponsor: SponsorFields };

export type RegistrationResult =
  | { ok: true; reference: string }
  | { ok: false; fieldErrors: Record<string, string>; formError?: string };

type ErrorDetail = { field: string | null; message: string };

const fail = (formError: string, fieldErrors: Record<string, string> = {}): RegistrationResult => ({
  ok: false,
  fieldErrors,
  formError,
});

export async function submitRegistration<C extends Category>(
  category: C,
  values: CommonFields & Payloads[C],
): Promise<RegistrationResult> {
  if (!API_URL) return fail("Registration is not configured yet. Please try again later.");

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/v1/public/registrations/${category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    return fail("We couldn't reach the registration server. Check your connection and try again.");
  }

  const body = await res.json().catch(() => null);

  if (res.status === 201) return { ok: true, reference: body.data.reference };

  if (res.status === 422) {
    const fieldErrors: Record<string, string> = {};
    for (const d of (body?.error?.details ?? []) as ErrorDetail[]) {
      // Pydantic prefixes custom messages with "Value error, ".
      if (d.field) fieldErrors[d.field] ??= d.message.replace(/^Value error, /, "");
    }
    return fail("Please correct the highlighted fields.", fieldErrors);
  }

  if (res.status === 409) {
    return fail(`This email address has already been registered as a ${category}.`, {
      email: `Already registered as a ${category}.`,
    });
  }

  if (res.status === 429) {
    const wait = Number(res.headers.get("Retry-After"));
    return fail(
      wait > 0
        ? `Too many attempts. Please wait ${wait} seconds and try again.`
        : "Too many attempts. Please wait a moment and try again.",
    );
  }

  return fail("Something went wrong on our side. Please try again.");
}
