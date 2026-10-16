import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body as { email?: string; source?: string };

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const entry = {
      email: email.trim().toLowerCase(),
      source: source ?? 'unknown',
      timestamp: new Date().toISOString(),
    };

    // Forward to webhook (Zapier / Make / any HTTP endpoint)
    // Set WAITLIST_WEBHOOK_URL in Vercel environment variables to capture emails
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    }

    console.log('[waitlist]', entry);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
