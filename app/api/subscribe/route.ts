import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/subscribe
 *
 * Newsletter signup for the CtaPopout component. Adds the contact to
 * Mike's Resend audience for product + research updates.
 *
 * **Required env vars** (set in Vercel project + .env.local):
 * - `RESEND_API_KEY` — from resend.com/api-keys; full-access key
 * - `RESEND_AUDIENCE_ID` — UUID of the audience (create one at
 *   resend.com/audiences if none exists)
 *
 * If env vars are missing (e.g. local dev without Resend setup), the route
 * falls back to logging the signup — UX still works, but contacts only
 * land in Vercel function logs.
 *
 * Duplicates are treated as success (idempotent UX — same response whether
 * the contact is new or returning).
 *
 * Contract:
 * - In:  `{ email: string, source?: string }`
 * - Out: `{ ok: true }` or `{ ok: false, error: string }` (4xx/5xx status)
 *
 * The popout component depends on the contract above. If it changes, update
 * `components/cta-popout.tsx` `onSubscribe` to match.
 */
export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = (await request.json()) as { email?: unknown; source?: unknown };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed JSON." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = typeof body.source === "string" ? body.source : "(unknown)";

  // Minimal validation — popout client enforces <input type="email" required>
  if (!email || !email.includes("@") || email.length > 320) {
    return NextResponse.json(
      { ok: false, error: "Email looks malformed." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    // Dev / unconfigured fallback: log and accept. Real subscription happens
    // once env vars are set in the deployment.
    console.log(
      `[subscribe:fallback] ${new Date().toISOString()} email=${email} source=${source} (RESEND env vars missing)`,
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      // Resend error names worth treating as success: contact already exists
      // in this audience. Other errors are real failures.
      const errName = (error as { name?: string }).name ?? "";
      const errMsg = (error as { message?: string }).message ?? "";
      const isDuplicate =
        errName === "validation_error" &&
        /already exists|already subscribed/i.test(errMsg);
      if (isDuplicate) {
        console.log(
          `[subscribe:duplicate] ${new Date().toISOString()} email=${email} source=${source}`,
        );
        return NextResponse.json({ ok: true });
      }
      console.error(
        `[subscribe:resend-error] ${new Date().toISOString()} email=${email} source=${source} name=${errName} msg=${errMsg}`,
      );
      return NextResponse.json(
        { ok: false, error: "Subscription service rejected the request." },
        { status: 502 },
      );
    }

    console.log(
      `[subscribe:created] ${new Date().toISOString()} email=${email} source=${source} contactId=${data?.id ?? "?"}`,
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe:exception]", e);
    return NextResponse.json(
      { ok: false, error: "Internal error." },
      { status: 500 },
    );
  }
}
