// AMFI scheme names are already unique per scheme code (e.g. "... - DIRECT - Growth" vs
// "... - REGULAR - IDCW" are distinct schemes with distinct codes), but slugifying the name alone
// is not guaranteed collision-free across 30,000+ codes. Appending the scheme code as the final
// slug segment makes every URL unique by construction and makes parsing trivial: the code is
// always the last hyphen-delimited segment, so no slug -> code lookup table is needed.
export function slugifySchemeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildSchemeSlug(schemeCode: string, schemeName: string): string {
  return `${slugifySchemeName(schemeName)}-${schemeCode}`;
}

// AMC names are already unique on their own (unlike scheme names), so the AMC slug is just the
// slugified name, no numeric suffix needed. Mirrors slugify() in fermor-backend's
// src/shared/utils/slug.ts exactly - the backend matches an incoming slug back to a real AMC name
// by slugifying its own AMC list the same way, so both sides must agree on this algorithm.
export function buildAmcSlug(amcName: string): string {
  return slugifySchemeName(amcName);
}

// Pulls the trailing numeric scheme code off a slug like "hdfc-mid-cap-opportunities-fund-growth-118989".
export function parseSchemeCodeFromSlug(slug: string): string | null {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}

// AMFI issues a separate scheme code for every combination of plan (Direct/Regular) and option
// (Growth/IDCW/Dividend), so the same underlying fund can appear as 4+ near-identical scheme
// records. Indexing every variant is a duplicate-content pattern even when each page's NAV/return
// numbers are individually real, since the surrounding content is otherwise ~95% identical.
// "Direct Plan, Growth option" is the variant retail investors and every competitor MF page
// treat as canonical (lowest cost, no payout drag) - only that variant is eligible for indexing.
// Non-canonical variants (Regular, IDCW/Dividend) still get a real, functional page - they're
// just excluded from search indexing, the same way this codebase already treats programmatic
// pages it can't back with real data.
export function isCanonicalVariant(schemeName: string): boolean {
  const lower = schemeName.toLowerCase();
  const isDirect = /\bdirect\b/.test(lower);
  const isGrowth = /\bgrowth\b/.test(lower);
  const isPayout = /\bidcw\b|\bdividend\b|\bpayout\b|\breinvestment\b|\bbonus\b/.test(lower);
  return isDirect && isGrowth && !isPayout;
}
