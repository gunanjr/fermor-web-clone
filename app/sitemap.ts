import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { buildSchemeSlug, buildAmcSlug } from '../src/utils/mutualFundSlug';
import lastModManifest from '../src/data/sitemap-lastmod.json';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';

// This whole route must be purely static, generated once per deploy at build time, and never
// re-executed as ISR in a live serverless function.
//
// Confirmed in production (Aug 2026): 420 URLs shared an identical, wrong lastmod with no real
// commit at that timestamp, while a clean local build of the same commit produced correct dates.
// The difference was execution context: a live ISR regeneration runs inside the deployed
// serverless function, a different environment than the build machine.
//
// Root cause: Next.js infers a route's caching behavior from every fetch() inside it, and
// getMutualFundSchemeUrls()/getAmcUrls() below used `next: { revalidate: 86400 }`, which silently
// forced the ENTIRE route (all ~2,951 URLs, not just the mutual fund ones) onto a 1-day ISR
// schedule. `export const revalidate = false` at the route level was tried first and does NOT
// override this - verified directly by rebuilding in a real git clone --depth=10 (matching
// Vercel's actual behavior): the build output's Revalidate/Expire columns for /sitemap.xml still
// showed "1d 1y" even with that export present. A fetch's own revalidate setting appears to win
// over a route-level override when the fetch's window is the more restrictive of the two. The fix
// that actually worked, confirmed by rebuilding and seeing those columns disappear entirely: use
// `{ cache: 'force-cache' }` on those two fetches instead (see below) so nothing in this route
// requests periodic revalidation at all. If sitemap.ts is ever touched again, verify this by
// rebuilding and checking that /sitemap.xml's row in the build output has no Revalidate/Expire
// values, not by reasoning about what an export "should" do.

// lastModified dates are read from a checked-in manifest (src/data/sitemap-lastmod.json),
// NEVER computed by calling git at build time. This replaced an earlier approach that ran
// `git log -1 -- <path>` directly in sitemap.ts, which went through two failed fixes before the
// real root cause was found: Vercel always builds with `git clone --depth=10` (documented, not
// a guess), and `git log -1 -- <path>` is not just "sometimes empty" under a shallow clone, it can
// return an outright WRONG commit. Confirmed directly on a live production build: for
// app/calculators/vpf-calculator/page.tsx (real last edit 16 Jul), a --depth=10 clone made git
// report commit cc63881 instead, an unrelated single-parent commit from 29 Jul that only touched
// 5 files in app/news/ and CALCULATOR_STANDARDS.md, nowhere near this file. Git's diff-vs-parent
// logic breaks down once it reaches the shallow boundary, and there is no way to make this
// reliable from inside a Vercel build. The manifest is regenerated with FULL git history (never
// shallow) by a GitHub Actions step (see .github/workflows/ci.yml) that commits it back to main
// before any deploy fires, via `scripts/generate-lastmod-manifest.ts` - see that script for the
// generation logic and CLAUDE.md for the full incident history.
const EARLIEST_PLAUSIBLE_LASTMOD = new Date('2025-01-01T00:00:00Z');

// A handful of misses (a page added since the manifest was last regenerated, before CI catches
// up) is normal and expected. Hundreds is the same class of incident that shipped 427 impossible
// 2018 dates and then 420 wrong-but-plausible dates to production - the build must fail loudly
// rather than silently degrade a third time.
const manifestMisses: string[] = [];
const MISS_FAIL_THRESHOLD = 10;

function fileLastMod(...segments: string[]): Date {
  const relPath = segments.join('/');
  const entry = (lastModManifest as Record<string, string>)[relPath];
  if (entry) {
    const date = new Date(entry);
    if (date >= EARLIEST_PLAUSIBLE_LASTMOD) return date;
    console.warn(`[sitemap] manifest has an implausible date for ${relPath}: ${entry}`);
  } else {
    console.warn(`[sitemap] no manifest entry for ${relPath} - page added since last manifest regeneration?`);
  }
  manifestMisses.push(relPath);
  try {
    const statDate = fs.statSync(path.join(process.cwd(), ...segments)).mtime;
    if (statDate >= EARLIEST_PLAUSIBLE_LASTMOD) return statDate;
  } catch {
    // fall through
  }
  return new Date();
}


// Two-tier priority model. Fermor treats every calculator, every programmatic tax page, and every
// blog article as a living product that gets revisited and improved indefinitely. None of these
// are "static" content, so priority reflects business importance (core product vs supporting page),
// not today's traffic. See CLAUDE.md for the full reasoning.
const PRIORITY = {
  home: 1.0,
  coreProduct: 0.9,   // calculators listing, individual calculators, credit cards
  programmatic: 0.85, // tax pages, blog articles
  gold: 0.9,          // live commodity data product, growing into a full page cluster
  legal: 0.3,
} as const;

// The ~2,483 canonical (Direct Plan, Growth option) mutual fund scheme pages are the only variant
// actually eligible for indexing (see isCanonicalVariant() and the robots.index gate on the scheme
// page itself) - the other ~11,700 non-canonical variants get a real page but must never appear
// here. Fetched from the backend rather than scanned from disk since these pages are DB-driven,
// not files under app/mutual-funds/[schemeSlug]/ the way tax/blogs/gdp pages are. A fetch failure
// (backend down, or the recurring Supabase connectivity issue documented elsewhere in this repo)
// must not break the rest of the sitemap - falls back to an empty array rather than throwing.
async function getMutualFundSchemeUrls(base: string): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/canonical`, { cache: 'force-cache' });
    if (!res.ok) return [];
    const { schemes } = (await res.json()) as { schemes: { schemeCode: string; schemeName: string; updatedAt: string }[] };
    return schemes.map((s) => ({
      url: `${base}/mutual-funds/${buildSchemeSlug(s.schemeCode, s.schemeName)}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'daily' as const,
      priority: PRIORITY.gold,
    }));
  } catch {
    return [];
  }
}

// The ~50 AMC hub pages (one per fund house, e.g. /mutual-funds/amc/nippon-india-mutual-fund) -
// same fetch-from-backend, fail-soft-to-empty-array pattern as the scheme URLs above, since this
// list is also DB-driven rather than a scannable folder.
async function getAmcUrls(base: string): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/amcs`, { cache: 'force-cache' });
    if (!res.ok) return [];
    const { amcs } = (await res.json()) as { amcs: { amcName: string; fundCount: number }[] };
    return amcs.map((a) => ({
      url: `${base}/mutual-funds/amc/${buildAmcSlug(a.amcName)}`,
      changeFrequency: 'weekly' as const,
      priority: PRIORITY.gold,
    }));
  } catch {
    return [];
  }
}

// Belt-and-suspenders, not the actual fix: the real fix is next.config.ts's
// outputFileTracingIncludes, which stops these directories from going missing from the deployed
// function in the first place. This wrapper exists so that if a similar gap ever appears again
// (e.g. a new auto-discovered folder that isn't added to that config), the sitemap degrades to
// missing that one section's URLs instead of hard-failing the entire route with a 500 for every
// crawler that requests it.
function safeReadSlugs(dir: string, filter?: (name: string) => boolean): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory() && (!filter || filter(d.name)))
      .map(d => d.name);
  } catch (error) {
    console.error(`sitemap: failed to read ${dir}`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://fermor.in';

  // Auto-discover all calculator pages: add a folder under app/calculators/ and it appears here automatically
  // Directories listed here are NOT calculators (redirects, shared components, etc.)
  const NON_CALC_DIRS = new Set(['all']);

  const calculatorsDir = path.join(process.cwd(), 'app/calculators');
  const calculatorSlugs = safeReadSlugs(calculatorsDir, name => !NON_CALC_DIRS.has(name));

  const calculatorUrls: MetadataRoute.Sitemap = calculatorSlugs.map(slug => ({
    url: `${base}/calculators/${slug}`,
    lastModified: fileLastMod('app', 'calculators', slug, 'page.tsx'),
    changeFrequency: 'weekly',
    priority: PRIORITY.coreProduct,
  }));

  // Auto-discover all blog articles: add a folder under app/blogs/ and it appears here automatically
  const blogsDir = path.join(process.cwd(), 'app/blogs');
  const blogSlugs = safeReadSlugs(blogsDir);

  const blogArticleUrls: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${base}/blogs/${slug}`,
    lastModified: fileLastMod('app', 'blogs', slug, 'page.tsx'),
    changeFrequency: 'daily' as const,
    priority: PRIORITY.programmatic,
  }));

  // Auto-discover all tax pages: add a folder under app/tax/ and it appears here automatically
  const taxDir = path.join(process.cwd(), 'app/tax');
  const taxSlugs = safeReadSlugs(taxDir, name => !name.startsWith('_'));

  const taxUrls: MetadataRoute.Sitemap = taxSlugs.map(slug => ({
    url: `${base}/tax/${slug}`,
    lastModified: fileLastMod('app', 'tax', slug, 'page.tsx'),
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.programmatic,
  }));

  // Auto-discover all per-country GDP pages: add a folder under app/gdp/ and it appears here automatically
  const gdpDir = path.join(process.cwd(), 'app/gdp');
  const gdpSlugs = safeReadSlugs(gdpDir, name => !name.startsWith('_'));

  const gdpUrls: MetadataRoute.Sitemap = gdpSlugs.map(slug => ({
    url: `${base}/gdp/${slug}`,
    lastModified: fileLastMod('app', 'gdp', slug, 'page.tsx'),
    changeFrequency: 'yearly' as const,
    priority: PRIORITY.programmatic,
  }));

  const mutualFundSchemeUrls = await getMutualFundSchemeUrls(base);
  const amcUrls = await getAmcUrls(base);

  const entries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: fileLastMod('app', 'page.tsx'),
      changeFrequency: 'daily',
      priority: PRIORITY.home,
    },
    {
      url: `${base}/calculators`,
      lastModified: fileLastMod('app', 'calculators', 'page.tsx'),
      changeFrequency: 'weekly',
      priority: PRIORITY.coreProduct,
    },
    ...calculatorUrls,
    {
      url: `${base}/credit-cards`,
      lastModified: fileLastMod('app', 'credit-cards', 'page.tsx'),
      changeFrequency: 'weekly',
      priority: PRIORITY.coreProduct,
    },
    {
      url: `${base}/blogs`,
      lastModified: fileLastMod('app', 'blogs', 'page.tsx'),
      changeFrequency: 'daily',
      priority: PRIORITY.programmatic,
    },
    ...blogArticleUrls,
    {
      url: `${base}/tax`,
      lastModified: fileLastMod('app', 'tax', 'page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: PRIORITY.programmatic,
    },
    ...taxUrls,
    {
      url: `${base}/gdp`,
      lastModified: fileLastMod('app', 'gdp', 'page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: PRIORITY.programmatic,
    },
    ...gdpUrls,
    {
      url: `${base}/mutual-funds`,
      lastModified: fileLastMod('app', 'mutual-funds', 'page.tsx'),
      changeFrequency: 'daily',
      priority: PRIORITY.gold,
    },
    {
      url: `${base}/mutual-funds/guide`,
      lastModified: fileLastMod('app', 'mutual-funds', 'guide', 'page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: PRIORITY.gold,
    },
    {
      url: `${base}/mutual-funds/amc`,
      lastModified: fileLastMod('app', 'mutual-funds', 'amc', 'page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: PRIORITY.gold,
    },
    ...amcUrls,
    ...mutualFundSchemeUrls,
    {
      url: `${base}/regulatory-updates`,
      lastModified: fileLastMod('app', 'regulatory-updates', 'page.tsx'),
      changeFrequency: 'daily',
      priority: PRIORITY.programmatic,
    },
    {
      url: `${base}/about`,
      lastModified: fileLastMod('app', 'about', 'page.tsx'),
      changeFrequency: 'yearly',
      priority: PRIORITY.legal,
    },
    {
      url: `${base}/contact`,
      lastModified: fileLastMod('app', 'contact', 'page.tsx'),
      changeFrequency: 'yearly',
      priority: PRIORITY.legal,
    },
    {
      url: `${base}/privacy`,
      lastModified: fileLastMod('app', 'privacy', 'page.tsx'),
      changeFrequency: 'yearly',
      priority: PRIORITY.legal,
    },
    {
      url: `${base}/terms`,
      lastModified: fileLastMod('app', 'terms', 'page.tsx'),
      changeFrequency: 'yearly',
      priority: PRIORITY.legal,
    },
  ];

  // Fail the build outright rather than silently ship the same class of bug that put 427
  // impossible 2018 dates, and later 420 wrong-but-plausible dates, into production: a handful of
  // misses (a brand-new page not yet in the manifest) is normal, but a spike this large means the
  // manifest is stale or missing and must not go live unnoticed.
  if (manifestMisses.length > MISS_FAIL_THRESHOLD) {
    throw new Error(
      `sitemap.ts: ${manifestMisses.length} of ${entries.length} URLs had no manifest entry ` +
      `(threshold: ${MISS_FAIL_THRESHOLD}). Run scripts/generate-lastmod-manifest.ts and commit ` +
      `the result. Affected paths (first 20): ${manifestMisses.slice(0, 20).join(', ')}`
    );
  }

  return entries;
}
