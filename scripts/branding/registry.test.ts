// Run: npx tsx --test scripts/branding/registry.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import {
  COUNTER_PATH, ROOT, Entry, Registry, applyCounter, brandingMarkers, diskRoutes, loadRegistry, readPageSource, validate,
} from './lib';

function entry(id: string, family: Entry['family'], over: Partial<Entry> = {}): Entry {
  const dir = family.startsWith('calculator') ? 'calculators' : 'blogs';
  const slug = id.toLowerCase();
  return {
    id, route: `/${dir}/${slug}`, family, group: 'G', source: `app/${dir}/${slug}/page.tsx`,
    footerBaseline: 'pasted', status: 'PENDING', batch: null, commit: null, evidence: null, ...over,
  };
}

function makeRegistry(n = 12): Registry {
  const entries: Entry[] = [];
  for (let i = 1; i <= n; i++) entries.push(entry(`C${i}`, 'calculator'));
  for (let i = 1; i <= n; i++) entries.push(entry(`B${i}`, 'blog'));
  entries.push(entry('CL1', 'calculator-listing', { route: '/calculators', source: 'app/calculators/page.tsx' }));
  return {
    version: 1, description: '', batchRules: { calculators: 10, blogs: 10 },
    statuses: ['PENDING', 'IN_PROGRESS', 'VERIFIED', 'BLOCKED', 'RETIRED'],
    exemptRoutes: [{ route: '/calculators/all', source: 'app/calculators/all/page.tsx', reason: 'alias' }],
    batches: [], entries,
  };
}

const diskFor = (r: Registry) => ({
  calculators: r.entries.filter(e => e.family === 'calculator').map(e => e.route).concat('/calculators/all'),
  blogs: r.entries.filter(e => e.family === 'blog').map(e => e.route),
});

function run(r: Registry, src: Record<string, string> = {}, disk = diskFor(r)) {
  return validate(r, disk, e => src[e.id] ?? '', () => true);
}

function withBatch(r: Registry, status: Entry['status'] = 'IN_PROGRESS'): Registry {
  const pick = (f: string) => Array.from({ length: 10 }, (_, i) => `${f}${i + 1}`);
  r.batches = [{ id: 'D1', date: '2026-10-11', calculators: pick('C'), blogs: pick('B') }];
  for (const e of r.entries) if (/^[CB]([1-9]|10)$/.test(e.id)) { e.status = status; e.batch = 'D1'; }
  return r;
}

const FOOTER = '<Footer minimal unified columns={x} />';
const NAV = '<CalculatorNav unified />';

test('the real registry validates against the real tree', () => {
  const reg = loadRegistry();
  const errors = validate(reg, diskRoutes(), e => readPageSource(e), p => fs.existsSync(path.join(ROOT, p)));
  assert.deepEqual(errors, []);
});

test('the real counter equals what the registry generates (no drift)', () => {
  const counter = fs.readFileSync(COUNTER_PATH, 'utf8');
  assert.equal(applyCounter(counter, loadRegistry()), counter);
});

test('changing a status changes the generated counter', () => {
  const counter = fs.readFileSync(COUNTER_PATH, 'utf8');
  const reg = loadRegistry();
  reg.entries[0].status = 'BLOCKED';
  assert.notEqual(applyCounter(counter, reg), counter);
});

test('real registry covers every route on disk exactly once', () => {
  const reg = loadRegistry();
  const disk = diskRoutes();
  const exempt = new Set(reg.exemptRoutes.map(r => r.route));
  const registered = new Set(reg.entries.map(e => e.route));
  for (const r of [...disk.calculators, ...disk.blogs]) assert.ok(registered.has(r) || exempt.has(r), r);
  // Counts come from the tree, not a constant: a new page must be registered, but adding one must not need a test edit.
  assert.equal(reg.entries.filter(e => e.family === 'calculator').length, disk.calculators.filter(r => !exempt.has(r)).length);
  assert.equal(reg.entries.filter(e => e.family === 'blog').length, disk.blogs.filter(r => !exempt.has(r)).length);
});

test('a clean synthetic registry passes', () => {
  assert.deepEqual(run(makeRegistry()), []);
});

test('duplicate ids and routes are rejected', () => {
  const r = makeRegistry();
  r.entries.push({ ...r.entries[0] });
  const errors = run(r);
  assert.ok(errors.some(m => m.includes('duplicate id C1')));
  assert.ok(errors.some(m => m.includes('duplicate route')));
});

test('a route on disk with no id fails', () => {
  const r = makeRegistry();
  const disk = diskFor(r);
  disk.calculators.push('/calculators/brand-new-calculator');
  assert.ok(run(r, {}, disk).some(m => m.includes('no registry id: /calculators/brand-new-calculator')));
});

test('the redirect alias is exempt but any other unregistered route is not', () => {
  const r = makeRegistry();
  assert.deepEqual(run(r), []);
});

test('a registry route that no longer exists on disk fails unless RETIRED', () => {
  const r = makeRegistry();
  const disk = diskFor(r);
  disk.calculators = disk.calculators.filter(x => x !== '/calculators/c3');
  assert.ok(run(r, {}, disk).some(m => m.includes('C3') && m.includes('not found on disk')));
  r.entries.find(e => e.id === 'C3')!.status = 'RETIRED';
  assert.deepEqual(run(r, {}, disk), []);
});

test('a valid batch of 10 + 10 passes', () => {
  assert.deepEqual(run(withBatch(makeRegistry()), Object.fromEntries(
    makeRegistry().entries.filter(e => /^[CB]([1-9]|10)$/.test(e.id)).map(e => [e.id, FOOTER + NAV]),
  )), []);
});

test('a batch with 9 calculators fails', () => {
  const r = withBatch(makeRegistry());
  r.batches[0].calculators.pop();
  r.entries.find(e => e.id === 'C10')!.batch = null;
  assert.ok(run(r).some(m => m.includes('needs exactly 10 calculators')));
});

test('re-selecting a page from an earlier batch fails', () => {
  const r = withBatch(makeRegistry(25));
  r.batches.push({ id: 'D2', date: '2026-10-12', calculators: ['C1', ...Array.from({ length: 9 }, (_, i) => `C${11 + i}`)], blogs: Array.from({ length: 10 }, (_, i) => `B${11 + i}`) });
  assert.ok(run(r).some(m => m.includes('C1') && m.includes('already selected')));
});

test('skipping ahead (non-contiguous selection) fails', () => {
  const r = makeRegistry(25);
  const calc = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11'];
  const blog = Array.from({ length: 10 }, (_, i) => `B${i + 1}`);
  r.batches = [{ id: 'D1', date: 'x', calculators: calc, blogs: blog }];
  for (const e of r.entries) if (calc.includes(e.id) || blog.includes(e.id)) { e.status = 'IN_PROGRESS'; e.batch = 'D1'; }
  assert.ok(run(r).some(m => m.includes('lowest-numbered available')));
});

test('a listing cannot be put in a daily batch', () => {
  const r = withBatch(makeRegistry());
  r.batches[0].calculators[9] = 'CL1';
  assert.ok(run(r).some(m => m.includes('CL1')));
});

test('a PENDING page that carries branding markers fails', () => {
  const r = makeRegistry();
  for (const marker of [FOOTER, NAV, "src=\"/fermor-logo-2026.png\""]) {
    assert.ok(run(r, { C5: marker }).some(m => m.startsWith('C5 (PENDING)')), marker);
  }
});

test('the bare word "unified" in prose is not a marker', () => {
  assert.equal(brandingMarkers('A unified view of your finances').any, false);
});

test('VERIFIED needs evidence and the footer and nav markers', () => {
  const r = withBatch(makeRegistry(), 'VERIFIED');
  const src = Object.fromEntries(r.entries.filter(e => e.batch).map(e => [e.id, FOOTER + NAV]));
  assert.ok(run(r, src).some(m => m.includes('VERIFIED requires non-empty evidence')));
  for (const e of r.entries) if (e.batch) e.evidence = 'ok';
  assert.deepEqual(run(r, src), []);
  src.C2 = NAV;
  assert.ok(run(r, src).some(m => m.includes('C2 is VERIFIED but its source has no <SiteFooter')));
  src.C2 = FOOTER;
  assert.ok(run(r, src).some(m => m.includes('C2 is VERIFIED but its source has no <PageNav')));
});

test('SiteFooter and PageNav count as the footer and nav markers', () => {
  assert.equal(brandingMarkers('<SiteFooter columns={x} />').footer, true);
  assert.equal(brandingMarkers('<PageNav />').nav, true);
  assert.equal(brandingMarkers('<Footer minimal />').footer, false);
});

test('a bulk batch skips the ten-and-ten size and contiguity rules but nothing else', () => {
  const r = makeRegistry(14);
  const calcs = r.entries.filter(e => e.family === 'calculator').map(e => e.id);
  const blogs = r.entries.filter(e => e.family === 'blog').map(e => e.id);
  r.batches = [{ id: 'D1', date: '2026-10-13', bulk: true, calculators: calcs, blogs }];
  for (const e of r.entries) if (calcs.includes(e.id) || blogs.includes(e.id)) { e.status = 'IN_PROGRESS'; e.batch = 'D1'; }
  const src = Object.fromEntries(r.entries.filter(e => e.batch).map(e => [e.id, FOOTER + NAV]));
  assert.deepEqual(run(r, src), []);
  // the same selection without the flag is rejected for its size
  r.batches[0].bulk = false;
  assert.ok(run(r, src).some(m => m.includes('needs exactly 10 calculators')));
  // a bulk batch still may not select a page twice or a PENDING page
  r.batches[0].bulk = true;
  r.entries.find(e => e.id === 'C3')!.status = 'PENDING';
  assert.ok(run(r, src).some(m => m.includes('selected in D1 but still PENDING')));
});

test('a PENDING page cannot carry a batch and a selected page needs one', () => {
  const r = makeRegistry();
  r.entries[0].batch = 'D1';
  assert.ok(run(r).some(m => m.includes('not listed in any batch')));
  const r2 = makeRegistry();
  r2.entries[0].status = 'IN_PROGRESS';
  assert.ok(run(r2).some(m => m.includes('requires a batch')));
});

test('ids must match their family and routes must match their folder', () => {
  const r = makeRegistry();
  r.entries[0].family = 'blog';
  const errors = run(r);
  assert.ok(errors.some(m => m.includes('does not match family')));
  assert.ok(errors.some(m => m.includes('outside /blogs')));
});

test('pushed requires a commit and is shown in the counter line', () => {
  const r = makeRegistry();
  r.entries[0].pushed = 'origin/x';
  assert.ok(run(r).some(m => m.includes('pushed requires a commit')));
  r.entries[0].commit = 'abc1234';
  assert.deepEqual(run(r), []);
  const counter = fs.readFileSync(COUNTER_PATH, 'utf8');
  const reg = loadRegistry();
  assert.equal(reg.entries.filter(e => e.pushed).every(e => e.commit), true);
  assert.ok(applyCounter(counter, reg).includes('pushed to'));
});

test('commit field must be a hex sha or null', () => {
  const r = makeRegistry();
  r.entries[0].commit = 'not-a-sha';
  assert.ok(run(r).some(m => m.includes('commit must be')));
});
