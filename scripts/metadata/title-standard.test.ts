// Guards the sitewide title standard "Page Name - Fermor" (CLAUDE.md, "A2. Titles and social metadata").
// Run: npx tsx --test scripts/metadata/title-standard.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const ROOT = path.join(__dirname, '..', '..');
const BRAND_SUFFIXES = [' - Fermor', ' | Fermor'];
const LONG_DASH = /[–—]/;

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.next') continue;
    // The internal Kanso workspace is not Fermor-branded.
    if (e.name === 'ops' && path.basename(dir) === 'app') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const keyOf = (p: ts.PropertyAssignment) => (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : null);

interface Hit { file: string; where: 'page' | 'social' | 'absolute'; text: string }

/** Every string that is a metadata title, with where it sits. */
function metadataTitles(file: string): Hit[] {
  const src = fs.readFileSync(file, 'utf8');
  if (!/title/.test(src)) return [];
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const hits: Hit[] = [];
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const textOf = (n: ts.Node): string | null => {
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
    if (ts.isTemplateExpression(n)) return n.head.text + n.templateSpans.map(s => '${}' + s.literal.text).join('');
    return null;
  };
  const visit = (node: ts.Node) => {
    if (ts.isPropertyAssignment(node) && keyOf(node) === 'title' && ts.isObjectLiteralExpression(node.parent)) {
      const holder = node.parent.parent;
      const holderKey = ts.isPropertyAssignment(holder) ? keyOf(holder) : null;
      const isMetadataObject =
        holderKey === 'openGraph' || holderKey === 'twitter' ||
        (ts.isVariableDeclaration(holder) && holder.name.getText(sf) === 'metadata') ||
        ts.isReturnStatement(holder) || ts.isArrowFunction(holder);
      if (isMetadataObject) {
        const where: Hit['where'] = holderKey === 'openGraph' || holderKey === 'twitter' ? 'social' : 'page';
        const v = node.initializer;
        if (ts.isObjectLiteralExpression(v)) {
          for (const inner of v.properties) {
            if (ts.isPropertyAssignment(inner) && keyOf(inner) === 'absolute') {
              const t = textOf(inner.initializer);
              if (t !== null) hits.push({ file: rel, where: 'absolute', text: t });
            }
          }
        } else {
          const t = textOf(v);
          if (t !== null) hits.push({ file: rel, where, text: t });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return hits;
}

const hits = [...walk(path.join(ROOT, 'app')), ...walk(path.join(ROOT, 'src'))].flatMap(metadataTitles);

test('root layout template is "%s - Fermor" and its default uses a hyphen', () => {
  const layout = fs.readFileSync(path.join(ROOT, 'app', 'layout.tsx'), 'utf8');
  assert.match(layout, /template:\s*`%s - \$\{siteName\}`/);
  assert.match(layout, /defaultTitle = 'Fermor - /);
});

test('the title scan sees a realistic number of titles', () => {
  assert.ok(hits.length > 300, `only ${hits.length} metadata titles found, the scanner is probably broken`);
});

test('no page-level title carries the brand (the template adds it once)', () => {
  const bad = hits.filter(h => h.where === 'page' && BRAND_SUFFIXES.some(s => h.text.endsWith(s)));
  assert.deepEqual(bad.map(h => `${h.file}: ${h.text}`), []);
});

test('no title or social title uses a pipe-brand suffix', () => {
  const bad = hits.filter(h => h.text.includes('| Fermor'));
  assert.deepEqual(bad.map(h => `${h.file}: ${h.text}`), []);
});

test('no title or social title contains an em dash or en dash', () => {
  const bad = hits.filter(h => LONG_DASH.test(h.text));
  assert.deepEqual(bad.map(h => `${h.file}: ${h.text}`), []);
});

test('absolute titles are brand-led or already end in " - Fermor", never doubled', () => {
  for (const h of hits.filter(h => h.where === 'absolute')) {
    assert.ok(!/ - Fermor - Fermor$/.test(h.text), `${h.file}: ${h.text}`);
    assert.ok(h.text.startsWith('Fermor') || h.text.endsWith(' - Fermor'), `${h.file}: absolute title "${h.text}" is neither brand-led nor suffixed`);
  }
});

test('social titles that repeat a page title use the hyphen brand format', () => {
  const social = hits.filter(h => h.where === 'social' && /Fermor$/.test(h.text));
  for (const h of social) assert.ok(h.text.endsWith(' - Fermor') || h.text.startsWith('Fermor'), `${h.file}: ${h.text}`);
});
