// Run: npx tsx --test scripts/branding/palette.test.ts
// Guards the individual-page palette (src/theme/pageTheme.ts): the old greens must not come back into
// calculator, blog, mutual fund, tax or GDP files, and the excluded pages must keep theirs.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { LEGACY_FORBIDDEN, LEGACY_RGBA_TO_PAGE } from '../../src/theme/pageTheme';
import { CHART_PALETTE, CHART_PAIR, seriesColor } from '../../src/theme/chartPalette';

const ROOT = path.join(__dirname, '..', '..');
const EXCLUDED = new Set([
  'app/blogs/page.tsx', 'app/blogs/ResourcesPageClient.tsx', 'app/blogs/articles.ts', 'app/blogs/blogCategories.ts',
  'app/blogs/listingCheck.ts', 'app/calculators/page.tsx', 'app/calculators/CalculatorsClient.tsx',
]);
function walk(d: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
    const rel = `${d}/${e.name}`;
    if (e.isDirectory()) walk(rel, out);
    else if (/\.(tsx|ts|css)$/.test(e.name)) out.push(rel);
  }
  return out;
}
// Files sitting directly in app/calculators and app/blogs belong to the /calculators and /blogs listings
// (CalculatorCard, CategorySection, ResourcesPageClient, ...), which are not on this palette.
const LISTING_LEVEL = /^app\/(calculators|blogs)\/[^/]+\.(tsx|ts|css)$/;
const scoped = ['app/calculators', 'app/blogs', 'app/mutual-funds', 'app/tax', 'app/gdp']
  .flatMap(d => walk(d))
  .concat(['src/components/calculators/CalcUi.tsx', 'src/components/common/SaveResultsCard.tsx', 'src/components/common/CurrencySelector.tsx'])
  .filter(f => !EXCLUDED.has(f) && !LISTING_LEVEL.test(f));
const read = (f: string) => fs.readFileSync(path.join(ROOT, f), 'utf8');

test('no legacy green value is left in an individual-page file', () => {
  const hexRe = new RegExp(LEGACY_FORBIDDEN.join('|'), 'i');
  const bad = scoped.filter(f => hexRe.test(read(f)));
  assert.deepEqual(bad, []);
});

test('no legacy rgba channel is left in an individual-page file', () => {
  const bad = scoped.filter(f => LEGACY_RGBA_TO_PAGE.some(([re]) => { re.lastIndex = 0; return re.test(read(f)); }));
  assert.deepEqual(bad, []);
});

test('individual pages no longer reference the old mark or the opaque dark tile', () => {
  const bad = scoped.filter(f => /fermor-mark-clean\.png|fermor-logo-2026\.png/.test(read(f)));
  assert.deepEqual(bad, []);
});

test('the excluded pages keep their own palette', () => {
  assert.match(read('app/calculators/CalculatorsClient.tsx'), /#[0-9a-f]{6}/i);
  assert.match(read('app/calculators/CalculatorCard.tsx'), /#75FB90/i);
  assert.match(read('app/_home/Footer.tsx'), /#75FB90/);
  assert.match(read('app/globals.css'), /--lime: #C8F135/);
});

test('selection: the green rule is scoped away from pages with the in-page nav, and only that rule exists', () => {
  const css = read('app/globals.css');
  const rules = css.match(/[^{}\n]*::selection[^{]*\{[^}]*\}/g) ?? [];
  assert.equal(rules.length, 1);
  assert.match(rules[0], /:root:not\(:has\(\.fnav-spacer\)\)/);
  assert.ok(!/::-moz-selection/.test(css));
});

test('the For CAs call to action is not in any navbar component', () => {
  for (const f of ['app/_home/FloatingNav.tsx', 'src/components/common/PageNav.tsx']) {
    assert.ok(!/>\s*For CAs\s*</.test(read(f)), f);
  }
});

test('the chart palette is the Fermor app chartPalette, verbatim', () => {
  // fermor-app-main/src/theme/tokens.ts, chartPalette
  assert.deepEqual([...CHART_PALETTE], ['#58E0A5', '#3FA882', '#A6DDC4', '#2B9A6E', '#0C4A33', '#7FCFAA', '#1F7A55', '#C4EBD8', '#38C78C', '#0A3A28']);
  assert.ok(CHART_PALETTE.includes(CHART_PAIR.primary) && CHART_PALETTE.includes(CHART_PAIR.secondary));
  assert.equal(new Set(Array.from({ length: CHART_PALETTE.length }, (_, i) => seriesColor(i))).size, CHART_PALETTE.length);
});

test('calculator donut rings and bars draw from the chart palette, not the page colours', () => {
  const tags = (src: string, name: string) => src.match(new RegExp(`<${name}\\b[\\s\\S]*?/>`, 'g')) ?? [];
  const bad = scoped.filter(f => f.startsWith('app/calculators/') || f.endsWith('CalcUi.tsx')).filter(f => {
    const src = read(f);
    const ring = tags(src, 'circle').some(t => /fill="none"/.test(t) && /stroke=\{C\.(dark|lime2)\}/.test(t) && /strokeDasharray|strokeWidth=\{sw\}/.test(t));
    const bar = tags(src, 'rect').some(t => /barW/.test(t) && !/scale\(/.test(t) && /fill=\{[^}]*C\.(dark|lime2)/.test(t));
    return ring || bar;
  });
  assert.deepEqual(bad, []);
});

