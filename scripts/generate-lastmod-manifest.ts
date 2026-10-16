// Generates public/../src/data/sitemap-lastmod.json: a map of relative file path -> ISO commit
// date, computed via `git log -1 --format=%aI -- <path>` against a FULL git history.
//
// Why this exists: Vercel always builds with `git clone --depth=10` (documented Vercel behavior,
// confirmed directly), which makes `git log -1 -- <path>` fundamentally unreliable at Vercel build
// time - not just occasionally empty, but capable of returning a WRONG commit's date entirely.
// Confirmed directly: in a real --depth=10 clone, `git log -1 -- app/calculators/vpf-calculator/page.tsx`
// returned commit cc63881 (an unrelated PAN-card-news-page commit, correct file untouched) instead
// of the file's real last commit, because git's diff-vs-parent logic breaks down once it reaches
// the shallow boundary. This happened on a live production build, not a hypothetical.
//
// The fix: never run git at Vercel build time. Run this script only where a full clone is
// guaranteed (GitHub Actions with fetch-depth: 0 - see .github/workflows/ci.yml), commit the
// output, and have app/sitemap.ts read the checked-in JSON instead of shelling out to git.
//
// Run manually: npx tsx scripts/generate-lastmod-manifest.ts
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const ROOT = path.join(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'src/data/sitemap-lastmod.json');

function gitLastMod(relPath: string): string | null {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', relPath], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
    return out || null;
  } catch {
    return null;
  }
}

function listSubdirs(dir: string, filter?: (name: string) => boolean): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory() && (!filter || filter(d.name)))
      .map(d => d.name);
  } catch {
    return [];
  }
}

function main() {
  const isShallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: ROOT })
    .toString().trim() === 'true';
  if (isShallow) {
    console.error(
      'generate-lastmod-manifest: refusing to run against a shallow git clone. This script only ' +
      'produces correct output with full git history (fetch-depth: 0 in CI). Running it against a ' +
      'shallow clone would bake the exact bug this script exists to prevent into the manifest.'
    );
    process.exit(1);
  }

  const relPaths: string[] = [];

  const NON_CALC_DIRS = new Set(['all']);
  for (const slug of listSubdirs(path.join(ROOT, 'app/calculators'), n => !NON_CALC_DIRS.has(n))) {
    relPaths.push(`app/calculators/${slug}/page.tsx`);
  }
  for (const slug of listSubdirs(path.join(ROOT, 'app/blogs'))) {
    relPaths.push(`app/blogs/${slug}/page.tsx`);
  }
  for (const slug of listSubdirs(path.join(ROOT, 'app/tax'), n => !n.startsWith('_'))) {
    relPaths.push(`app/tax/${slug}/page.tsx`);
  }
  for (const slug of listSubdirs(path.join(ROOT, 'app/gdp'), n => !n.startsWith('_'))) {
    relPaths.push(`app/gdp/${slug}/page.tsx`);
  }

  const staticPages = [
    'app/page.tsx',
    'app/calculators/page.tsx',
    'app/credit-cards/page.tsx',
    'app/blogs/page.tsx',
    'app/tax/page.tsx',
    'app/gdp/page.tsx',
    'app/mutual-funds/page.tsx',
    'app/mutual-funds/guide/page.tsx',
    'app/mutual-funds/amc/page.tsx',
    'app/gold/page.tsx',
    'app/regulatory-updates/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'app/privacy/page.tsx',
    'app/terms/page.tsx',
  ];
  relPaths.push(...staticPages);

  const manifest: Record<string, string> = {};
  let missing = 0;
  for (const relPath of relPaths) {
    const date = gitLastMod(relPath);
    if (date) {
      manifest[relPath] = date;
    } else {
      missing++;
      console.warn(`generate-lastmod-manifest: no git history for ${relPath} (new/uncommitted file?)`);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`generate-lastmod-manifest: wrote ${Object.keys(manifest).length} entries (${missing} missing) to ${OUTPUT_PATH}`);
}

main();
