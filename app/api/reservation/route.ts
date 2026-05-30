import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Simple in-memory store per Lambda instance.
// Allows max 3 submissions per IP within a 60-second window.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT  = 3;
const RATE_WINDOW = 60_000; // ms

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ─── Email HTML template ──────────────────────────────────────────────────────
function buildEmailHtml(data: {
  name: string;
  email: string;
  mobile: string;
  bike: string;
  variant: string;
  location: string;
  timeframe: string;
  notes: string;
  submittedAt: string;
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;width:160px;vertical-align:top;">${label}</td>
          <td style="padding:10px 16px;font-size:14px;color:#111827;vertical-align:top;">${value}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Reservation — ${data.bike}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#09090b;border-radius:12px 12px 0 0;padding:32px 32px 28px;text-align:center;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#6b7280;font-weight:600;">
                Voltis Emoto
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                New Reservation Request
              </h1>
              <p style="margin:10px 0 0;font-size:13px;color:#4b5563;">
                A customer has submitted a Reserve &amp; Pay on Pickup request.
              </p>
            </td>
          </tr>

          <!-- Bike badge -->
          <tr>
            <td style="background:#18181b;padding:0 32px;">
              <div style="border-top:1px solid #27272a;border-bottom:1px solid #27272a;padding:16px 0;">
                <p style="margin:0 0 3px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#6b7280;font-weight:600;">
                  Reserved Bike
                </p>
                <p style="margin:0;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:-0.01em;">
                  ${data.bike}${data.variant ? ` <span style="font-weight:400;color:#9ca3af;">· ${data.variant}</span>` : ""}
                </p>
              </div>
            </td>
          </tr>

          <!-- Customer details table -->
          <tr>
            <td style="background:#ffffff;padding:8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row("Full Name",       data.name)}
                ${row("Email",           `<a href="mailto:${data.email}" style="color:#7c3aed;text-decoration:none;">${data.email}</a>`)}
                ${row("Mobile",          `<a href="tel:${data.mobile}" style="color:#7c3aed;text-decoration:none;">${data.mobile}</a>`)}
                ${row("Pickup Location", data.location)}
                ${row("Timeframe",       data.timeframe)}
                ${data.notes ? row("Notes", data.notes.replace(/\n/g, "<br />")) : ""}
                ${row("Submitted",       data.submittedAt)}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#ffffff;padding:20px 32px 28px;text-align:center;">
              <a href="mailto:${data.email}?subject=Re%3A%20Your%20${encodeURIComponent(data.bike)}%20Reservation%20at%20Voltis%20Emoto"
                 style="display:inline-block;background:#7c3aed;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:12px 28px;border-radius:9999px;">
                Reply to Customer
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#09090b;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#4b5563;letter-spacing:0.05em;">
                Voltis Emoto · Australian Owned &amp; Operated
              </p>
              <p style="margin:6px 0 0;font-size:10px;color:#374151;">
                This notification was sent automatically from voltisemoto.com.au
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── POST /api/reservation ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // ── Rate limit ──────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  console.log(`[Reservation] Request from IP: ${ip}`);

  if (isRateLimited(ip)) {
    console.warn(`[Reservation] Rate limited IP: ${ip}`);
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    console.error("[Reservation] Failed to parse request body");
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, mobile, bike, variant, location, timeframe, notes } = body;

  // ── Validate required fields ────────────────────────────────────────────────
  const missing: string[] = [];
  if (!name?.trim())      missing.push("name");
  if (!email?.trim())     missing.push("email");
  if (!mobile?.trim())    missing.push("mobile");
  if (!bike?.trim())      missing.push("bike");
  if (!timeframe?.trim()) missing.push("timeframe");

  if (missing.length) {
    console.warn(`[Reservation] Validation failed — missing: ${missing.join(", ")}`);
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  // ── Basic email format check ────────────────────────────────────────────────
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn(`[Reservation] Invalid email address: ${email}`);
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  // ── Resolve env vars ────────────────────────────────────────────────────────
  const apiKey     = process.env.RESEND_API_KEY;
  const storeEmail = process.env.STORE_EMAIL ?? "voltisemoto@gmail.com";
  // Use onboarding@resend.dev by default — works without domain verification.
  // Switch to a custom address (e.g. reservations@voltisemoto.com.au) once
  // your domain is verified in the Resend dashboard.
  const fromEmail  = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

  console.log(`[Reservation] Config — to: ${storeEmail}, from: ${fromEmail}, hasApiKey: ${!!apiKey}`);

  if (!apiKey) {
    console.error("[Reservation] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured. Please contact us directly." },
      { status: 503 }
    );
  }

  // ── Build email payload ─────────────────────────────────────────────────────
  const submittedAt = new Date().toLocaleString("en-AU", {
    timeZone:  "Australia/Sydney",
    dateStyle: "full",
    timeStyle: "short",
  });

  const timeframeLabel: Record<string, string> = {
    "within-1-week": "Within 1 week",
    "1-2-weeks":     "1–2 weeks",
    "2-4-weeks":     "2–4 weeks",
    "flexible":      "Flexible — no rush",
  };

  const emailData = {
    name:      name.trim(),
    email:     email.trim().toLowerCase(),
    mobile:    mobile.trim(),
    bike:      bike.trim(),
    variant:   (variant ?? "").trim(),
    location:  (location ?? "").trim(),
    timeframe: timeframeLabel[timeframe] ?? timeframe,
    notes:     (notes ?? "").trim(),
    submittedAt,
  };

  const subject = `New Reservation — ${emailData.bike}${emailData.variant ? ` (${emailData.variant})` : ""} · ${emailData.name}`;

  console.log(`[Reservation] Sending email — subject: "${subject}", to: ${storeEmail}, from: ${fromEmail}`);

  // ── Send via Resend ─────────────────────────────────────────────────────────
  // IMPORTANT: resend.emails.send() does NOT throw on API errors — it returns
  // { data, error }. Always check the error field explicitly.
  const resend = new Resend(apiKey);

  let sendResult: Awaited<ReturnType<typeof resend.emails.send>>;
  try {
    sendResult = await resend.emails.send({
      from:    `Voltis Emoto <${fromEmail}>`,
      to:      [storeEmail],
      replyTo: emailData.email,
      subject,
      html:    buildEmailHtml(emailData),
    });
  } catch (networkErr) {
    // Only thrown on actual network/connection failures
    const msg = networkErr instanceof Error ? networkErr.message : String(networkErr);
    console.error(`[Reservation] Network error calling Resend: ${msg}`);
    return NextResponse.json(
      { error: `Email failed to send (network error): ${msg}` },
      { status: 502 }
    );
  }

  // ── Check Resend's returned error field ─────────────────────────────────────
  if (sendResult.error) {
    const resendError = sendResult.error;
    console.error(
      `[Reservation] Resend API error — name: ${resendError.name}, message: ${resendError.message}`
    );
    return NextResponse.json(
      { error: `Email failed: ${resendError.message}` },
      { status: 502 }
    );
  }

  console.log(`[Reservation] Email sent successfully — id: ${sendResult.data?.id}`);
  return NextResponse.json({ success: true, emailId: sendResult.data?.id }, { status: 200 });
}
