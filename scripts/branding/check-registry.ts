// Validates rollout/branding-registry.json against the tree and against pagepushed-counter.md.
// Exits 1 on any problem. Run: npx tsx scripts/branding/check-registry.ts
import fs from 'fs';
import path from 'path';
import { ROOT, COUNTER_PATH, applyCounter, diskRoutes, loadRegistry, readPageSource, validate } from './lib';

const reg = loadRegistry();
const errors = validate(
  reg,
  diskRoutes(),
  e => readPageSource(e),
  p => fs.existsSync(path.join(ROOT, p)),
);

// The counter must be exactly what the registry generates.
const counter = fs.readFileSync(COUNTER_PATH, 'utf8');
try {
  if (applyCounter(counter, reg) !== counter) errors.push('pagepushed-counter.md is out of date: run npx tsx scripts/branding/generate-counter.ts');
} catch (e) {
  errors.push((e as Error).message);
}

const sel = reg.entries.filter(e => e.status === 'IN_PROGRESS' || e.status === 'VERIFIED').length;
console.log(`registry: ${reg.entries.length} entries, ${reg.batches.length} batches, ${sel} selected pages`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  errors.forEach(m => console.error(' - ' + m));
  process.exit(1);
}
console.log('registry check passed');
