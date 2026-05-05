# Local environment variables

This site reads **no secrets at build time** for normal pages. The only runtime configuration in application code is the newsletter subscribe route (`/api/subscribe`).

## File

**`.env.local`** at the **repository root** (next to `package.json`). Gitignored — your real keys go here only. Next.js loads it for `next dev` / `next build` / `next start`.

Do not commit this file or paste its contents into tracked files.

## Variables

| Name | Required for local dev? | Used by |
| --- | --- | --- |
| `RESEND_API_KEY` | No | `app/api/subscribe/route.ts` |
| `RESEND_AUDIENCE_ID` | No | `app/api/subscribe/route.ts` |

### `RESEND_API_KEY`

Resend API key with permission to manage contacts. Create at [resend.com/api-keys](https://resend.com/api-keys).

### `RESEND_AUDIENCE_ID`

UUID of the Resend **Audience** the popout should add contacts to. Create or inspect audiences at [resend.com/audiences](https://resend.com/audiences).

### Shape of `.env.local` (fake values — use your own)

```bash
RESEND_API_KEY=re_xxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## If you omit them

The subscribe API **still returns success** to the client: the CTA popout UX works. Without both variables set, the route logs a `[subscribe:fallback]` line (server console locally, Vercel function logs in production) and does **not** call Resend.

## Production (Vercel)

Set the same two variables on the Vercel project (e.g. `vercel env add RESEND_API_KEY production` and `vercel env add RESEND_AUDIENCE_ID production`). See `README.md` under **Environment** for the short version.

## Scripts and other tooling

Portfolio and research scripts in this repo do not currently read `process.env` for local workflows; only the subscribe route uses the table above. If that changes, extend this document in the same table format.
