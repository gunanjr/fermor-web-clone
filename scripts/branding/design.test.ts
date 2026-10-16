// Run: npx tsx --test scripts/branding/design.test.ts
// Guards the current design on every individual calculator and blog page, so a page that arrives
// from another branch in the old design (CalculatorNav, <Footer minimal />, a hand-pasted nav, the
// old mark, the CA box) fails here instead of shipping. See "New and revamped pages" in CLAUDE.md.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..', '..');
const read = (f: string) => fs.readFileSync(path.join(ROOT, f), 'utf8');

function walk(d: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
    const rel = `${d}/${e.name}`;
    if (e.isDirectory()) walk(rel, out);
    else if (/\.(tsx|ts)$/.test(e.name)) out.push(rel);
  }
  return out;
}

/** Page folders: app/calculators/<slug> and app/blogs/<slug>. The listings (files directly in those
    folders), dynamic segments and the /calculators/all redirect alias have no page of their own. */
function pageFolders(): string[] {
  const out: string[] = [];
  for (const fam of ['app/calculators', 'app/blogs']) {
    for (const e of fs.readdirSync(path.join(ROOT, fam), { withFileTypes: true })) {
      if (!e.isDirectory() || e.name.startsWith('[') || e.name === 'all') continue;
      if (fs.existsSync(path.join(ROOT, fam, e.name, 'page.tsx'))) out.push(`${fam}/${e.name}`);
    }
  }
  return out;
}

const folders = pageFolders();
const filesOf = (dir: string) => walk(dir).map(f => ({ f, src: read(f) }));

test('every calculator and blog page renders PageNav and SiteFooter', () => {
  const bad: string[] = [];
  for (const dir of folders) {
    const all = filesOf(dir);
    if (!all.some(x => /<PageNav\b/.test(x.src))) bad.push(`${dir}: no <PageNav />`);
    if (!all.some(x => /<SiteFooter\b/.test(x.src))) bad.push(`${dir}: no <SiteFooter />`);
  }
  assert.deepEqual(bad, []);
});

test('no individual page uses a legacy nav, footer, hand-pasted nav bar or the old mark', () => {
  const legacy: [RegExp, string][] = [
    [/\bCalculatorNav\b/, 'CalculatorNav (use PageNav)'],
    [/<Footer\b/, '<Footer> from app/_home (use SiteFooter)'],
    [/\bSubFooter\b/, 'SubFooter (use SiteFooter)'],
    [/fermor-mark-clean\.png/, 'fermor-mark-clean.png (use /fermor-mark-2026.svg, schema logo fermor-schema-logo.png)'],
    [/fermor-logo-2026\.png/, 'fermor-logo-2026.png (use /fermor-mark-2026.svg)'],
    [/aria-label="Site navigation"/, 'a hand-pasted <nav aria-label="Site navigation"> (use PageNav)'],
  ];
  const bad: string[] = [];
  for (const dir of folders) {
    for (const { f, src } of filesOf(dir)) for (const [re, why] of legacy) if (re.test(src)) bad.push(`${f}: ${why}`);
  }
  assert.deepEqual(bad, []);
});

test('the CA call-to-action box is not on any page', () => {
  const bad = [...walk('app'), ...walk('src')]
    .filter(f => !f.startsWith('app/ops/') && !f.startsWith('app/ca/'))
    .filter(f => /Are you a CA or financial advisor/.test(read(f)));
  assert.deepEqual(bad, []);
});

test('SiteFooter links go mint with a mint underline on hover', () => {
  const css = read('src/components/common/SiteFooter.tsx');
  assert.match(css, /\.sf-link:hover[^{]*\{[^}]*color: \$\{MINT\}[^}]*text-decoration-color: \$\{MINT\}/);
  assert.match(css, /\.sf-plink:hover \{ color: \$\{MINT\}/);
  assert.match(css, /const MINT = PAGE_THEME\.markGreen/);
});

test('the shared footer keeps Calculators in a single column', () => {
  // SiteFooter flows a column past 10 rows into a second one; the discovery set must stay at or under that.
  const src = read('src/components/common/footerLinks.ts');
  const start = src.indexOf('export const DISCOVERY_COLUMNS');
  const block = src.slice(start, src.indexOf('];', start));
  const calc = block.split('\n').find(l => l.includes("h: 'Calculators'")) ?? '';
  assert.ok((calc.match(/\{ l: /g) ?? []).length <= 10);
});

// ---- Retired sections (14 Oct 2026): Kids and the CA Portal ----------------------------------

/** Source that ships to users. The retired CA Portal source folders are still on disk until they
    are deleted; middleware.ts answers 410 for them, so they are excluded here. */
const shipped = () => [...walk('app'), ...walk('src'), 'middleware.ts']
  .filter(f => !/^app\/(ops|ca|intake|plan|r)\//.test(f));

test('nothing links to, or describes, the retired CA Portal', () => {
  // The privacy policy keeps one factual sentence about data held from accounts on the retired portal.
  const bad = shipped().filter(f => f !== 'middleware.ts' && f !== 'app/privacy/page.tsx' && /ca\.fermor\.in|CA [Pp]ortal|CA White Label|>\s*For CAs\s*</.test(read(f)));
  assert.deepEqual(bad, []);
  const privacyLine = read('app/privacy/page.tsx').split('\n').find(l => /CA Portal/.test(l)) ?? '';
  assert.match(privacyLine, /retired/, 'the privacy policy may only mention the CA Portal as retired');
  assert.ok(!/ca\.fermor\.in/.test(read('app/privacy/page.tsx')));
});

test('the navbar has no For Kids entry', () => {
  const bad = shipped().filter(f => />\s*For Kids\s*</.test(read(f)));
  assert.deepEqual(bad, []);
});

test('the retired CA Portal paths answer 410 Gone in middleware', () => {
  const mw = read('middleware.ts');
  assert.match(mw, /RETIRED_PREFIXES = \['\/ca', '\/plan', '\/intake', '\/r'\]/);
  assert.match(mw, /status: 410/);
  assert.match(mw, /host\.startsWith\('ca\.'\)/);
});

// ---- One FAQ design ---------------------------------------------------------------------------

test('every calculator and mutual fund FAQ renders through the shared FAQBox', () => {
  const bad: string[] = [];
  const files = [...walk('app/calculators'), ...walk('app/mutual-funds')]
    .filter(f => f.endsWith('.tsx') && !/^app\/(calculators|mutual-funds)\/[^/]+\.tsx$/.test(f));
  for (const f of files) {
    const src = read(f);
    const rendersFaq = /Frequently Asked/.test(src) && !/\bPageTitle\b/.test(src);
    if (!rendersFaq) continue;
    // a page.tsx that only carries the FAQPage JSON-LD text has no visible FAQ
    if (/page\.tsx$/.test(f) && !/<h2[^>]*>\s*Frequently Asked/.test(src)) continue;
    if (!/FAQBox|<FAQAccordion\b/.test(src) && !/CalcUi/.test(src)) bad.push(f);
  }
  assert.deepEqual(bad, []);
});

test('no calculator or mutual fund page keeps its own FAQ accordion', () => {
  const bad = [...walk('app/calculators'), ...walk('app/mutual-funds')]
    .filter(f => /^app\/(calculators|mutual-funds)\/[^/]+\//.test(f))
    .filter(f => /(?:faq-btn-|faq-panel-|faq-answer-|mf2-faq|mfg-faq)/.test(read(f)));
  assert.deepEqual(bad, []);
});

test('FAQBox keeps the article FAQ look and emits no structured data', () => {
  const src = read('src/components/common/FAQBox.tsx');
  for (const token of ["'#E5E5E5'", "'#111111'", "'#555555'", "'#888888'", 'borderRadius: 10', 'fontSize: 14.5']) assert.ok(src.includes(token), token);
  assert.ok(!/application\/ld\+json|dangerouslySetInnerHTML/.test(src));
});

// ---- About, Contact, Privacy and Terms are on the individual-page design ----------------------

test('About, Contact, Privacy and Terms use InfoPage (PageNav and SiteFooter), not SubNav or the dark Footer', () => {
  const shell = read('src/components/common/InfoPage.tsx');
  assert.match(shell, /<PageNav\s*\/>/);
  assert.match(shell, /<SiteFooter\b/);
  for (const p of ['about', 'contact', 'privacy', 'terms']) {
    const src = read(`app/${p}/page.tsx`);
    assert.match(src, /<InfoPage\b/, p);
    assert.ok(!/SubNav|from '\.\.\/_home\/Footer'|<Footer\b/.test(src), `${p} still carries a legacy nav or footer`);
  }
});

// ---- Light-grey buttons and panels ------------------------------------------------------------

test('promo-bar and form buttons are light grey, not solid black', () => {
  const bad: string[] = [];
  for (const f of [...walk('app/calculators'), ...walk('app/blogs'), ...walk('app/mutual-funds'), ...walk('app/tax'), ...walk('app/gdp'), ...walk('src/components/calculators'), 'src/components/common/SaveResultsCard.tsx']) {
    if (/^app\/(calculators|blogs)\/[^/]+\.tsx$/.test(f)) continue;
    const src = read(f);
    // a button-like element (link or button) with a solid dark fill and light text
    const re = /<(?:Link|a|button)\b[^>]*style=\{\{[^}]*background:\s*(?:C\.dark|C\.dg|MF\.ink|'#101214')\s*,[^}]*color:\s*(?:C\.white|'#fff'|C\.lime)/g;
    if (re.test(src)) bad.push(f);
  }
  assert.deepEqual(bad, []);
});

test('the .fx-btn class that carries the button hover and focus states exists', () => {
  const css = read('app/globals.css');
  assert.match(css, /\.fx-btn:hover:not\(:disabled\)/);
  assert.match(css, /\.fx-btn:focus-visible/);
});
