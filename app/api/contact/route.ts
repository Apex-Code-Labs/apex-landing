import { NextRequest, NextResponse } from 'next/server'

// Thin proxy: the browser posts here, and this Worker forwards to the ERP with
// a server-side service token (never exposed to the client). Validation,
// honeypot and rate-limiting all live in the ERP (POST /api/public/prospects).

export async function POST(request: NextRequest) {
  // Read env inside the request context: on Cloudflare Workers a module-scope
  // read can resolve before the bindings are attached, yielding undefined on
  // cold start.
  const ERP_API_URL = process.env.ERP_API_URL
  const ERP_SERVICE_TOKEN = process.env.ERP_SERVICE_TOKEN

  if (!ERP_API_URL || !ERP_SERVICE_TOKEN) {
    console.error('Contact intake not configured: ERP_API_URL / ERP_SERVICE_TOKEN missing')
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, company, email, phone, country, service, message, honeypot } = body

  // The ERP rate-limits per client IP, but every submission reaches it from
  // this Worker's egress IP. Forward the real visitor IP so the ERP limiter
  // buckets per visitor instead of collapsing into one global bucket. On
  // Cloudflare Workers the visitor IP is in cf-connecting-ip; fall back to the
  // first x-forwarded-for entry.
  const clientIp =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    ''

  try {
    const res = await fetch(`${ERP_API_URL}/api/public/prospects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Service-Token': ERP_SERVICE_TOKEN,
        ...(clientIp ? { 'X-Client-IP': clientIp } : {}),
      },
      // honeypot maps to the ERP's `website` trap field.
      body: JSON.stringify({ name, company, email, phone, country, service, message, website: honeypot ?? '' }),
      // Bound the upstream call so a hung ERP does not hang this Worker.
      signal: AbortSignal.timeout(8000),
    })

    if (res.ok) {
      return NextResponse.json({ success: true }, { status: 201 })
    }

    if (res.status === 422) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }
    if (res.status === 429) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    console.error('ERP prospect intake failed:', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 502 })
  } catch (error) {
    // AbortSignal.timeout fires a TimeoutError (DOMException) when the 8s
    // budget is exhausted.
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      console.error('ERP prospect intake timed out')
      return NextResponse.json({ error: 'Upstream timed out. Please try again.' }, { status: 504 })
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
