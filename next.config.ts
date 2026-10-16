import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Year-specific slug moved to an evergreen slug so the URL survives every future AY
      // without needing a new page (and a new redirect) each year. Sourced from the original
      // /news/... path directly (not /blogs/...) since that old path never existed publicly
      // under /blogs -- going straight there avoids a needless two-hop redirect chain through
      // the general /news/:path* rule below.
      { source: '/news/itr-filing-last-date-fy-2025-26', destination: '/blogs/itr-filing-last-date', permanent: true },
      // Thin, superseded ITR page (6 min read, no FAQ/HowTo schema) merged into the
      // comprehensive itr-filing-last-date guide to stop the two pages splitting the
      // same keyword's ranking signal against each other.
      { source: '/news/ay-2026-27-itr-due-dates', destination: '/blogs/itr-filing-last-date', permanent: true },
      // Retired city×salary tax combo pages (duplicate-content cluster removed). Sends
      // straight to the surviving city hub page, which has the same salary breakdown
      // inline as real content, not a 404 dead end. Salary constrained to digits so this
      // doesn't accidentally match the base /tax/income-tax-on-N-lakh-salary pages (no
      // "-in-city" suffix, so they never match this pattern at all).
      { source: '/tax/income-tax-on-:salary(\\d+)-lakh-salary-in-:city', destination: '/tax/:city', permanent: true },
      // Gold price content removed (unreliable pipeline, stale figures -- see CLAUDE.md
      // "Gold Price Pipeline"). Sends real existing search traffic to the still-live Gold
      // Loan Calculator, the closest surviving real feature, instead of a 404.
      { source: '/gold', destination: '/calculators/gold-loan-calculator', permanent: true },
      { source: '/gold/:path*', destination: '/calculators/gold-loan-calculator', permanent: true },
      { source: '/news/gold-rate-today-india', destination: '/calculators/gold-loan-calculator', permanent: true },
      // /news + /resources migration (all 31 news articles moved into 3 categories on the new
      // /blogs page; /resources's placeholder content removed entirely). The two specific
      // ITR/gold rules above are more specific and matched first, so real article slugs land on
      // their real /blogs/<slug> page directly rather than chaining through this wildcard twice.
      { source: '/news', destination: '/blogs', permanent: true },
      { source: '/news/:path*', destination: '/blogs/:path*', permanent: true },
      { source: '/resources', destination: '/blogs', permanent: true },
      { source: '/resources/:path*', destination: '/blogs', permanent: true },
      // Old category pages (GSC 404s)
      { source: '/categories/:path*', destination: '/', permanent: true },
      // Old blog (GSC 404)
      { source: '/blog/:path*', destination: '/', permanent: true },
      // Old static/info pages (GSC 404s)
      { source: '/how-it-works', destination: '/', permanent: true },
      { source: '/shipping', destination: '/', permanent: true },
      { source: '/refunds', destination: '/', permanent: true },
      // Old auth & register pages (GSC 404s)
      { source: '/auth/:path*', destination: '/', permanent: true },
      { source: '/register', destination: '/', permanent: true },
      { source: '/register/:path*', destination: '/', permanent: true },
      // Old marketplace pages
      { source: '/dashboard', destination: '/', permanent: true },
      { source: '/post', destination: '/', permanent: true },
      { source: '/work/:path*', destination: '/', permanent: true },
      { source: '/worker-profile', destination: '/', permanent: true },
      { source: '/worker/:path*', destination: '/', permanent: true },
      { source: '/earnings', destination: '/', permanent: true },
      { source: '/map', destination: '/', permanent: true },
      { source: '/shifts', destination: '/', permanent: true },
      { source: '/shifts/:path*', destination: '/', permanent: true },
      { source: '/check-in/:path*', destination: '/', permanent: true },
      { source: '/admin', destination: '/', permanent: true },
      { source: '/admin/:path*', destination: '/', permanent: true },
    ];
  },
  // app/sitemap.ts calls fs.readdirSync() on app/calculators, app/blogs, app/tax and app/gdp at
  // runtime to auto-discover pages. Vercel's serverless function bundler only includes files it
  // can trace through actual imports - a dynamic fs.readdirSync on a computed path isn't
  // traceable, so those source directories were silently missing from the deployed function
  // (ENOENT: scandir '/var/task/app/calculators'). This was invisible in every manual/browser
  // check because Vercel bypasses its cache specifically for crawler user-agents (to avoid ever
  // serving them stale content), so only real crawler traffic (Googlebot, Bingbot, etc.) ever hit
  // this code path fresh - confirmed via Vercel's own function logs showing "Cache: BYPASS,
  // Reason: Crawler" on every failed request. Forcing these directories into every function's
  // trace fixes it for real, rather than just catching the crash and silently shipping an
  // incomplete sitemap to crawlers instead (see the try/catch fallback in sitemap.ts, which is a
  // safety net for an unexpected future gap, not the actual fix for this one).
  outputFileTracingIncludes: {
    '/**': ['./app/calculators/**/*', './app/blogs/**/*', './app/tax/**/*', './app/gdp/**/*'],
  },
  // ignoreBuildErrors was removed deliberately: with it set, Vercel's own `next build` never
  // enforced TypeScript correctness at all, regardless of any GitHub Actions gating, which meant
  // a type-broken commit could still produce a deployable build. Verified safe to remove: the
  // codebase has zero `tsc --noEmit` errors as of this change. CLAUDE.md rule 3 ("never push to
  // main without npm run build passing with zero TypeScript errors") is now actually enforced by
  // the build itself, not just relied on as a written policy.
  //
  // eslint.ignoreDuringBuilds is intentionally left as-is: this project has no ESLint config set
  // up yet (`next lint` prompts for interactive setup rather than running), so removing this
  // would break every build for an unrelated reason. Set up a real ESLint config first, then
  // remove this suppression the same way.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;




