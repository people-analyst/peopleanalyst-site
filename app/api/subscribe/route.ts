import { NextResponse } from "next/server";

/**
 * POST /api/subscribe
 *
 * Receives newsletter signups from the CtaPopout component. The MVP
 * implementation logs to Vercel function logs — Mike extracts manually
 * until volume warrants a real integration.
 *
 * To wire to a managed newsletter service (Buttondown / ConvertKit /
 * Resend Audiences / Vercel KV / Supabase): replace the body of the
 * try block below with the API call. The contract — `{ email, source }`
 * in, `{ ok: true }` or `{ ok: false, error }` out — should not change
 * unless the popout is updated to match.
 *
 * Email validation is intentionally minimal here; the popout enforces
 * `<input type="email" required>` on the client. Treat any received
 * payload as a casual signal, not a sworn email.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      source?: unknown;
    };
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const source = typeof body.source === "string" ? body.source : "(unknown)";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Email looks malformed." },
        { status: 400 },
      );
    }

    // MVP: log only. Logs are visible in `vercel logs` or the Vercel dashboard.
    // TODO(mike): wire to preferred newsletter service when volume warrants —
    // see `app/api/subscribe/route.ts` jsdoc for integration guidance.
    console.log(
      `[subscribe] ${new Date().toISOString()} email=${email} source=${source}`,
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe] error", e);
    return NextResponse.json(
      { ok: false, error: "Internal error." },
      { status: 500 },
    );
  }
}
