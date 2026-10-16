// Regenerates every Fermor mark asset that sits directly on a page or a browser tab from ONE source:
// the two path shapes in public/fermor-mark-2026.svg (the mint mark used on dark surfaces).
//
//   app/icon.png        512x512, transparent, picked up by Next's file convention
//   app/apple-icon.png  180x180, transparent
//   app/favicon.ico     16/32/48px PNG frames, transparent
//
// The favicon is the homepage mint (PAGE_THEME.markGreen, #75FB90), the same fill as the logo in
// the homepage navbar. Nothing here draws a background: every output has an
// alpha channel and the corners are fully transparent (checked at the end).
//
// Run: npx tsx scripts/generate-brand-assets.ts
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PAGE_THEME } from '../src/theme/pageTheme';

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'public', 'fermor-mark-2026.svg'), 'utf8');
const PATHS = [...SRC.matchAll(/<path d="([^"]+)"\/>/g)].map(m => m[1]);
if (PATHS.length !== 2) throw new Error('expected two path shapes in fermor-mark-2026.svg');
const VIEWBOX = '-1.04 -0.79 2.08 1.58';
const [, , VW, VH] = VIEWBOX.split(' ').map(Number);

const svg = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" fill="${fill}" role="img" aria-label="Fermor">\n` +
  PATHS.map(d => `  <path d="${d}"/>`).join('\n') + '\n</svg>\n';

/** The mark centred on a transparent square, `pad` being the margin as a fraction of the side. */
async function square(size: number, fill: string, pad: number): Promise<Buffer> {
  const inner = Math.round(size * (1 - pad * 2));
  const h = Math.round(inner * (VH / VW));
  const mark = await sharp(Buffer.from(svg(fill)), { density: 600 }).resize(inner, h).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: mark, left: Math.round((size - inner) / 2), top: Math.round((size - h) / 2) }])
    .png()
    .toBuffer();
}

/** ICO with PNG-encoded frames (supported by every current browser). */
function ico(frames: { size: number; png: Buffer }[]): Buffer {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(frames.length, 4);
  let offset = 6 + 16 * frames.length;
  const dir = frames.map(f => {
    const e = Buffer.alloc(16);
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 0); e.writeUInt8(f.size >= 256 ? 0 : f.size, 1);
    e.writeUInt8(0, 2); e.writeUInt8(0, 3); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(f.png.length, 8); e.writeUInt32LE(offset, 12);
    offset += f.png.length;
    return e;
  });
  return Buffer.concat([head, ...dir, ...frames.map(f => f.png)]);
}

async function cornerAlpha(buf: Buffer): Promise<number> {
  const { data } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return data[3];
}

(async () => {
  const green = PAGE_THEME.markGreen;

  const icon = await square(512, green, 0.04);
  const apple = await square(180, green, 0.06);
  fs.writeFileSync(path.join(ROOT, 'app', 'icon.png'), icon);
  fs.writeFileSync(path.join(ROOT, 'app', 'apple-icon.png'), apple);
  const frames = await Promise.all([16, 32, 48].map(async size => ({ size, png: await square(size, green, size === 16 ? 0.03 : 0.04) })));
  fs.writeFileSync(path.join(ROOT, 'app', 'favicon.ico'), ico(frames));

  for (const [name, b] of [['icon.png', icon], ['apple-icon.png', apple], ...frames.map(f => [`favicon ${f.size}px`, f.png] as const)] as const) {
    const a = await cornerAlpha(b);
    console.log(name.padEnd(16), 'corner alpha', a, a === 0 ? 'ok' : 'NOT TRANSPARENT');
    if (a !== 0) process.exit(1);
  }
  console.log('icons written with fill', green);
})();
