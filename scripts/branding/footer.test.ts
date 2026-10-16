// Run: npx tsx --test scripts/branding/footer.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import {
  DISCOVERY_COLUMNS, FOOTER_DESCRIPTION, MUTUAL_FUND_COLUMNS, TAX_COLUMNS, SHARED_FOOTER_COLUMNS, pipeColumns, withSharedColumns,
} from '../../src/components/common/footerLinks';
import { SOCIAL_LINKS } from '../../src/components/common/socialLinks';
import { FOOTER_TABS } from '../../src/components/common/footerTabs';

const ROOT = path.join(__dirname, '..', '..');
const read = (f: string) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const SHARED = ['Mutual Funds', 'Explore', 'Company'];

test('six social links, all external, none a placeholder', () => {
  assert.deepEqual(SOCIAL_LINKS.map(s => s.id).sort(), ['facebook', 'instagram', 'linkedin', 'reddit', 'x', 'youtube']);
  for (const s of SOCIAL_LINKS) {
    assert.match(s.href, /^https:\/\//);
    assert.ok(s.label && s.d.length > 40, s.id);
  }
});

test('social profile URLs are defined only in the central config (the homepage Footer and the layout Organization sameAs are separate)', () => {
  const hits: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
      const rel = `${d}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (/\.(tsx|ts)$/.test(e.name) && rel !== 'src/components/common/socialLinks.ts' && rel !== 'app/_home/Footer.tsx' && rel !== 'app/layout.tsx' && !rel.startsWith('app/ops')) {
        if (/https:\/\/www\.(instagram|facebook|reddit|youtube)\.com\/|twitter\.com\/fermor_in/.test(read(rel))) hits.push(rel);
      }
    }
  };
  ['app', 'src/components'].forEach(walk);
  assert.deepEqual(hits, []);
});

test('every family keeps the shared Mutual Funds, Explore and Company categories', () => {
  const families: Record<string, ReturnType<typeof withSharedColumns>> = {
    default: withSharedColumns(),
    discovery: withSharedColumns(DISCOVERY_COLUMNS),
    tax: withSharedColumns(TAX_COLUMNS),
    mutualFunds: withSharedColumns(MUTUAL_FUND_COLUMNS),
    calculator: withSharedColumns(pipeColumns([
      { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP'] },
      { hd: 'Topics', links: ['/#|Placeholder', '/calculators/fd-calculator|Fixed Deposits'] },
      { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy'] },
    ])),
  };
  for (const [name, cols] of Object.entries(families)) {
    const heads = cols.map(c => c.h);
    for (const h of SHARED) assert.ok(heads.includes(h), `${name} is missing ${h}`);
    for (const ref of SHARED_FOOTER_COLUMNS) {
      const col = cols.find(c => c.h === ref.h)!;
      for (const it of ref.items) assert.ok(col.items.some(x => x.href === it.href), `${name}/${ref.h} lost ${it.href}`);
    }
    assert.equal(new Set(heads).size, heads.length, `${name} has a duplicate heading`);
    for (const c of cols) assert.ok(!c.items.some(i => i.href === '#' || i.href === '/#'), `${name}/${c.h}`);
    const sitemapCols = cols.filter(c => c.items.some(i => i.href === '/sitemap.xml'));
    assert.deepEqual(sitemapCols.map(c => c.h), ['Explore'], `${name} must have Sitemap in Explore only`);
    const explore = cols.find(c => c.h === 'Explore')!;
    assert.equal(explore.items[explore.items.length - 1].href, '/sitemap.xml', `${name}: Sitemap is the last Explore item`);
    assert.equal(explore.items.filter(i => i.href === '/sitemap.xml').length, 1, `${name}: exactly one Sitemap link`);
    assert.ok(!cols.some(c => c.items.some(i => /ca\.fermor\.in/.test(i.href))), `${name} links to the retired CA Portal`);
  }
  assert.deepEqual(families.mutualFunds, MUTUAL_FUND_COLUMNS.map(c => ({ h: c.h, items: c.items })));
  assert.ok(families.calculator.some(c => c.h === 'Topics' && c.items.length === 1), 'placeholder dropped, family column kept');
});

test('internal footer and tab links point at real routes', () => {
  const exists = (href: string) => {
    const parts = href.split('/').filter(Boolean);
    if (parts.length === 0) return true;
    if (parts[0] === 'mutual-funds' && parts[1] === 'amc' && parts[2]) return true;
    return fs.existsSync(path.join(ROOT, 'app', ...parts, 'page.tsx'));
  };
  const hrefs = [
    ...withSharedColumns(DISCOVERY_COLUMNS).flatMap(c => c.items.map(i => i.href)),
    ...withSharedColumns(TAX_COLUMNS).flatMap(c => c.items.map(i => i.href)),
    ...FOOTER_TABS.flatMap(t => [...t.items, t.all].map(i => i.href)),
  ].filter(h => h.startsWith('/') && !h.endsWith('.xml'));
  assert.deepEqual([...new Set(hrefs)].filter(h => !exists(h)), []);
});

test('SiteFooter takes its description and social links from the central config, and shows one copyright', () => {
  const src = read('src/components/common/SiteFooter.tsx');
  assert.match(src, /\{FOOTER_DESCRIPTION\}/);
  assert.match(src, /SOCIAL_LINKS\.map/);
  assert.equal((src.match(/All rights reserved/g) ?? []).length, 1);
  assert.ok(src.indexOf('sf-co') < src.indexOf('All rights reserved'), 'copyright follows the description');
  assert.ok(FOOTER_DESCRIPTION.length > 20);
});
