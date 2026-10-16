import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * The CA Portal (ca.fermor.in, /ca/*, the shared /plan/[token] reports, /intake/[token] forms and
 * the /r/[reportId]/[slug] affiliate redirects) was retired on 14 Oct 2026. There is no equivalent
 * page to send visitors to, so these paths answer 410 Gone rather than redirecting to the
 * homepage: search engines drop a 410 faster than a 404 and a blanket redirect would be a soft 404.
 */
const RETIRED_PREFIXES = ['/ca', '/plan', '/intake', '/r'];

const isRetiredPath = (pathname: string) =>
  RETIRED_PREFIXES.some(p => pathname === p || pathname.startsWith(`${p}/`));

function gone() {
  return new NextResponse(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page removed - Fermor</title>' +
      '<meta name="robots" content="noindex"></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 20px">' +
      '<h1 style="font-size:24px">This page has been removed</h1>' +
      '<p>The page you are looking for is no longer available. <a href="https://fermor.in">Go to fermor.in</a></p></body></html>',
    { status: 410, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } },
  );
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Retired CA Portal: the subdomain and every path that belonged to it.
  if (host.startsWith('ca.') || isRetiredPath(pathname)) {
    return gone();
  }

  // Ops dashboard (internal, team-only): ops.fermor.in/* → rewrite to /ops/*
  if (host.startsWith('ops.')) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/ops/login', request.url));
    }
    if (!pathname.startsWith('/ops') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
      const rewritten = request.nextUrl.clone();
      rewritten.pathname = `/ops${pathname}`;
      return NextResponse.rewrite(rewritten);
    }
    return NextResponse.next();
  }

  // Canonical: redirect www.fermor.in → fermor.in (301 permanent)
  if (host.startsWith('www.') && !host.startsWith('www.localhost')) {
    const canonical = request.nextUrl.clone();
    canonical.host = host.slice(4);
    return NextResponse.redirect(canonical, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
