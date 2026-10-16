// Shared logic for the phased calculator and blog branding rollout.
//
// The registry (rollout/branding-registry.json) is the single source of truth for which
// calculator and blog pages are migrated. check-registry.ts validates it against the tree,
// generate-counter.ts writes the rollout sections of pagepushed-counter.md from it.
//
// Run: npx tsx scripts/branding/check-registry.ts
//      npx tsx scripts/branding/generate-counter.ts [--check]
import fs from 'fs';
import path from 'path';

export const ROOT = path.join(__dirname, '..', '..');
export const REGISTRY_PATH = path.join(ROOT, 'rollout', 'branding-registry.json');
export const COUNTER_PATH = path.join(ROOT, 'pagepushed-counter.md');

export type Status = 'PENDING' | 'IN_PROGRESS' | 'VERIFIED' | 'BLOCKED' | 'RETIRED';
export type Family = 'calculator' | 'blog' | 'calculator-listing' | 'blog-listing';

export interface Entry {
  id: string;
  route: string;
  family: Family;
  group: string;
  source: string;
  footerBaseline: 'pasted' | 'subfooter' | 'shared-footer' | 'none';
  status: Status;
  batch: string | null;
  commit: string | null;
  /** Remote ref the commit was pushed to, only after the push was confirmed; null otherwise. */
  pushed?: string | null;
  evidence: string | null;
  note?: string;
}

export interface Batch {
  id: string;
  date: string;
  /** A one-off batch that moves every remaining page at once. The ten-and-ten size rule and the
   *  lowest-numbered-first rule do not apply to it; every other rule does. */
  bulk?: boolean;
  note?: string;
  calculators: string[];
  blogs: string[];
}

export interface Registry {
  version: number;
  description: string;
  batchRules: { calculators: number; blogs: number };
  statuses: Status[];
  exemptRoutes: { route: string; source: string; reason: string }[];
  batches: Batch[];
  entries: Entry[];
}

export function loadRegistry(file: string = REGISTRY_PATH): Registry {
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Registry;
}

/** Routes of every `app/<dir>/<slug>/page.tsx` plus the folder's own page for the listing. */
export function diskRoutes(root: string = ROOT): { calculators: string[]; blogs: string[] } {
  const scan = (dir: string): string[] => {
    const base = path.join(root, 'app', dir);
    if (!fs.existsSync(base)) return [];
    return fs
      .readdirSync(base, { withFileTypes: true })
      .filter(d => d.isDirectory() && fs.existsSync(path.join(base, d.name, 'page.tsx')))
      .map(d => `/${dir}/${d.name}`)
      .sort();
  };
  return { calculators: scan('calculators'), blogs: scan('blogs') };
}

export function readPageSource(entry: Entry, root: string = ROOT): string {
  const dir = path.join(root, path.dirname(entry.source));
  if (!fs.existsSync(dir)) return '';
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(f => f.isFile() && /\.(ts|tsx)$/.test(f.name))
    .map(f => fs.readFileSync(path.join(dir, f.name), 'utf8'))
    .join('\n');
}

/** Markers that only a migrated page carries. Matching "unified" as a bare word is not enough
 *  (it appears in prose), so each pattern is tied to the component or asset it opts into. */
// A migrated page uses either the earlier opt-in pair (<Footer unified>, <CalculatorNav unified>) or
// the current one (<SiteFooter>, <PageNav>), which individual pages now use.
export const FOOTER_MARKER = /<Footer\b[^>]*\bunified\b|<SiteFooter\b/;
export const NAV_MARKER = /<CalculatorNav\b[^>]*\bunified\b|<PageNav\b/;
export const LOGO_MARKER = /fermor-logo-2026|fermor-mark-2026/;

export function brandingMarkers(src: string): { footer: boolean; nav: boolean; logo: boolean; any: boolean } {
  const footer = FOOTER_MARKER.test(src);
  const nav = NAV_MARKER.test(src);
  const logo = LOGO_MARKER.test(src);
  return { footer, nav, logo, any: footer || nav || logo };
}

const isSelectable = (e: Entry) => e.family === 'calculator' || e.family === 'blog';
const num = (id: string) => parseInt(id.replace(/\D/g, ''), 10);

/** Pure validation. `readSource` is injected so tests can run against an in-memory tree. */
export function validate(
  reg: Registry,
  disk: { calculators: string[]; blogs: string[] },
  readSource: (e: Entry) => string,
  sourceExists: (p: string) => boolean,
): string[] {
  const errors: string[] = [];
  const err = (m: string) => errors.push(m);
  const ids = new Set<string>();
  const routes = new Set<string>();
  const idFormat: Record<Family, RegExp> = {
    calculator: /^C\d+$/,
    blog: /^B\d+$/,
    'calculator-listing': /^CL\d+$/,
    'blog-listing': /^BL\d+$/,
  };

  for (const e of reg.entries) {
    if (ids.has(e.id)) err(`duplicate id ${e.id}`);
    ids.add(e.id);
    if (routes.has(e.route)) err(`duplicate route ${e.route}`);
    routes.add(e.route);
    if (!idFormat[e.family]?.test(e.id)) err(`${e.id}: id does not match family ${e.family}`);
    if (!reg.statuses.includes(e.status)) err(`${e.id}: unknown status ${e.status}`);
    const prefix = e.family.startsWith('calculator') ? '/calculators' : '/blogs';
    if (e.route !== prefix && !e.route.startsWith(prefix + '/')) err(`${e.id}: route ${e.route} is outside ${prefix}`);
    if (e.commit !== null && !/^[0-9a-f]{7,40}$/.test(e.commit)) err(`${e.id}: commit must be null or a 7-40 char hex sha`);
    if (e.pushed && !e.commit) err(`${e.id}: pushed requires a commit`);
    if (e.status === 'VERIFIED' && !(e.evidence && e.evidence.trim())) err(`${e.id}: VERIFIED requires non-empty evidence`);
    if (e.status !== 'RETIRED' && !sourceExists(e.source)) err(`${e.id}: source ${e.source} does not exist`);
  }

  // Retired ids stay in the file forever so they are never recycled.
  const exempt = new Set(reg.exemptRoutes.map(r => r.route));
  for (const r of [...disk.calculators, ...disk.blogs]) {
    if (!routes.has(r) && !exempt.has(r)) err(`route on disk has no registry id: ${r}`);
  }
  for (const e of reg.entries) {
    if (!isSelectable(e) || e.status === 'RETIRED') continue;
    if (!disk.calculators.includes(e.route) && !disk.blogs.includes(e.route)) err(`${e.id}: registry route not found on disk: ${e.route}`);
  }

  // Batches: exactly N calculators and N blogs, no repeats, ids contiguous in registry order.
  const byId = new Map(reg.entries.map(e => [e.id, e] as const));
  const used = new Set<string>();
  reg.batches.forEach((b, i) => {
    if (b.id !== `D${i + 1}`) err(`batch ${b.id}: expected id D${i + 1}`);
    if (!b.bulk && b.calculators.length !== reg.batchRules.calculators) err(`batch ${b.id}: needs exactly ${reg.batchRules.calculators} calculators, has ${b.calculators.length}`);
    if (!b.bulk && b.blogs.length !== reg.batchRules.blogs) err(`batch ${b.id}: needs exactly ${reg.batchRules.blogs} blogs, has ${b.blogs.length}`);
    const check = (list: string[], fam: Family) => {
      for (const id of list) {
        const e = byId.get(id);
        if (!e) { err(`batch ${b.id}: unknown id ${id}`); continue; }
        if (e.family !== fam) err(`batch ${b.id}: ${id} is a ${e.family}, expected ${fam}`);
        if (used.has(id)) err(`batch ${b.id}: ${id} was already selected in an earlier batch or twice`);
        used.add(id);
        if (e.batch !== b.id) err(`${id}: entry.batch is ${e.batch} but it is listed in ${b.id}`);
        if (e.status === 'PENDING') err(`${id}: selected in ${b.id} but still PENDING`);
      }
      if (b.bulk) return;
      // contiguity: the lowest-numbered pages that were still available when the batch was cut
      const earlier = new Set(reg.batches.slice(0, i).flatMap(x => [...x.calculators, ...x.blogs]));
      const available = reg.entries
        .filter(e => e.family === fam && !earlier.has(e.id) && e.status !== 'RETIRED' && !(e.status === 'BLOCKED' && e.batch === null))
        .sort((a, b2) => num(a.id) - num(b2.id))
        .slice(0, list.length)
        .map(e => e.id);
      if (JSON.stringify([...list].sort((a, b2) => num(a) - num(b2))) !== JSON.stringify(available)) {
        err(`batch ${b.id}: ${fam} selection is not the lowest-numbered available pages (expected ${available.join(', ')})`);
      }
    };
    check(b.calculators, 'calculator');
    check(b.blogs, 'blog');
  });
  for (const e of reg.entries) {
    if (e.batch !== null && !used.has(e.id)) err(`${e.id}: has batch ${e.batch} but is not listed in any batch`);
    if (e.status === 'PENDING' && e.batch !== null) err(`${e.id}: PENDING pages must not have a batch`);
    if ((e.status === 'IN_PROGRESS' || e.status === 'VERIFIED') && e.batch === null) err(`${e.id}: ${e.status} requires a batch`);
    if (e.family.endsWith('listing') && e.batch !== null) err(`${e.id}: listings are tracked separately and cannot be in a daily batch`);
  }

  // Source scan: branding markers may exist only on pages that were selected.
  for (const e of reg.entries) {
    if (e.status === 'RETIRED') continue;
    const m = brandingMarkers(readSource(e));
    const selected = e.status === 'IN_PROGRESS' || e.status === 'VERIFIED';
    if (!selected && m.any) err(`${e.id} (${e.status}) ${e.route} carries branding markers (footer=${m.footer} nav=${m.nav} logo=${m.logo}) but was not selected`);
    if (e.status === 'VERIFIED' && !m.footer) err(`${e.id} is VERIFIED but its source has no <SiteFooter> or <Footer ... unified> marker`);
    if (e.status === 'VERIFIED' && e.family === 'calculator' && !m.nav) err(`${e.id} is VERIFIED but its source has no <PageNav> or <CalculatorNav ... unified> marker`);
  }
  return errors;
}

// ---------------------------------------------------------------- counter generation

const EM = String.fromCharCode(0x2014); // kept out of the source: CI bans the literal character in .ts files
export const MARKERS = {
  calculators: ['<!-- BEGIN GENERATED: rollout-calculators (scripts/branding/generate-counter.ts) -->', '<!-- END GENERATED: rollout-calculators -->'],
  blogs: ['<!-- BEGIN GENERATED: rollout-blogs (scripts/branding/generate-counter.ts) -->', '<!-- END GENERATED: rollout-blogs -->'],
} as const;

const FOOTER_LABEL: Record<Entry['footerBaseline'], string> = {
  pasted: 'own pasted footer',
  subfooter: 'legacy SubFooter',
  'shared-footer': 'default shared Footer',
  none: 'no footer',
};

function statusText(e: Entry): string {
  if (e.status === 'PENDING') return `PENDING ${EM} unchanged from main`;
  return e.status;
}

function line(e: Entry): string {
  const bits = [`${e.id}`, `\`${e.route}\``, `\`${e.source}\``, `footer before: ${FOOTER_LABEL[e.footerBaseline]}`, statusText(e)];
  if (e.batch) bits.push(`batch ${e.batch}`);
  if (e.commit) bits.push(`commit ${e.commit}`);
  if (e.pushed) bits.push(`pushed to ${e.pushed}`);
  if (e.note) bits.push(e.note);
  return '- ' + bits.join(' | ');
}

function summary(entries: Entry[], label: string): string {
  const counts: Record<string, number> = {};
  for (const e of entries) counts[e.status] = (counts[e.status] ?? 0) + 1;
  const order: Status[] = ['VERIFIED', 'IN_PROGRESS', 'BLOCKED', 'PENDING', 'RETIRED'];
  const parts = order.filter(s => counts[s]).map(s => `${counts[s]} ${s}`);
  const pushed = entries.filter(e => e.pushed).length;
  const next = entries.filter(e => e.status === 'PENDING').slice(0, 10).map(e => e.id);
  return `Status of the ${entries.length} ${label}: ${parts.join(', ')}; ${pushed} pushed to a remote branch (none merged or deployed). Next 10 pending: ${next.length ? next.join(', ') : 'none'}.`;
}

export function renderSection(reg: Registry, kind: 'calculators' | 'blogs'): string {
  const fam: Family = kind === 'calculators' ? 'calculator' : 'blog';
  const listing = reg.entries.find(e => e.family === `${fam}-listing`);
  const pages = reg.entries.filter(e => e.family === fam);
  const out: string[] = [MARKERS[kind][0], ''];
  if (kind === 'calculators') {
    out.push(`### Calculators (${pages.length + 1}: ${pages.length} calculators plus the listing)`, '');
    out.push('Source: `app/calculators/<slug>/page.tsx`, registry `src/data/calculators.ts`, rollout registry `rollout/branding-registry.json`. A page is migrated only when its status is IN_PROGRESS or VERIFIED; every PENDING page keeps its present nav, footer, palette and schema exactly as on `main`.', '');
  } else {
    out.push(`### Blogs and articles (${pages.length + 1}: ${pages.length} article pages plus the listing)`, '');
    out.push('Source: `app/blogs/<slug>/page.tsx`, categories from `app/blogs/blogCategories.ts`, rollout registry `rollout/branding-registry.json`. A page is migrated only when its status is IN_PROGRESS or VERIFIED; every PENDING page keeps its present nav, footer, palette and schema exactly as on `main`.', '');
  }
  out.push(summary(pages, kind === 'calculators' ? 'calculators' : 'article pages'));
  out.push('Statuses: PENDING (not selected), IN_PROGRESS (selected, being migrated), VERIFIED (selected and checked against a local production build, evidence recorded in the registry; it does not mean committed, pushed, merged or deployed), BLOCKED, RETIRED. A commit hash appears only after the change has been committed, and "pushed to" only after the push was confirmed against the remote; none of this means merged or deployed. Listings are tracked on their own and are never part of a daily batch.', '');
  if (listing) out.push(line(listing), '');
  let group = '';
  for (const e of pages) {
    if (e.group !== group) {
      group = e.group;
      const n = pages.filter(p => p.group === group).length;
      out.push('', `#### ${group} (${n})`, '');
    }
    out.push(line(e));
  }
  out.push('', MARKERS[kind][1]);
  return out.join('\n');
}

export function applyCounter(counter: string, reg: Registry): string {
  let result = counter;
  for (const kind of ['calculators', 'blogs'] as const) {
    const [begin, end] = MARKERS[kind];
    const a = result.indexOf(begin);
    const b = result.indexOf(end);
    if (a < 0 || b < 0 || b < a) throw new Error(`counter is missing the ${kind} generated markers`);
    result = result.slice(0, a) + renderSection(reg, kind) + result.slice(b + end.length);
  }
  return result;
}
