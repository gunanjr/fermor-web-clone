// Writes the calculator and blog sections of pagepushed-counter.md from the registry.
// Run: npx tsx scripts/branding/generate-counter.ts          (rewrite)
//      npx tsx scripts/branding/generate-counter.ts --check  (exit 1 if the file would change)
import fs from 'fs';
import { COUNTER_PATH, applyCounter, loadRegistry } from './lib';

const current = fs.readFileSync(COUNTER_PATH, 'utf8');
const next = applyCounter(current, loadRegistry());
if (process.argv.includes('--check')) {
  if (next !== current) {
    console.error('pagepushed-counter.md differs from the registry output');
    process.exit(1);
  }
  console.log('pagepushed-counter.md matches the registry');
} else if (next === current) {
  console.log('pagepushed-counter.md already up to date');
} else {
  fs.writeFileSync(COUNTER_PATH, next, 'utf8');
  console.log('pagepushed-counter.md updated');
}
