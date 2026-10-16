'use client';

/**
 * Fermor hero phone, as a real WebGL object.
 *
 * The hardware is the same Apple iPhone 15 Pro Max glTF used by the reference Three.js
 * implementation (public/models/scene.glb, Draco-compressed, screen mesh `xXDHkMplTIDAXLN`),
 * with the same material tinting rule, the same lightformer environment and the same spot
 * lights. What changed is the display: instead of a demo wallpaper, the screen material's map
 * is a live snapshot of the real Fermor dashboard React tree, captured through an SVG
 * foreignObject into a CanvasTexture, so the 3D screen is pixel-for-pixel the DOM screen.
 *
 * Scroll drives a GSAP ScrollTrigger timeline that writes straight into the pivot's
 * rotation/position. No React state is touched per frame.
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ------------------------------------------------------------------ config */

/**
 * The Apple branding on the back shell is in scene.glb twice, and only one of the two is its
 * own node. Measured off the model, not guessed:
 *
 *   IykfmVvLplTsTEW / PaletteMaterial004 - the flat decal. The whole node is logo.
 *   TakBsdEjEytCAMK / PaletteMaterial003 - the same logo again as raised relief, sharing one
 *     mesh with the plate that sits behind the camera bump. Deleting that node takes the plate
 *     with it, so only its logo triangles come out. This is the copy that survived an earlier
 *     node-level removal: it is relief rather than a dark decal, so it is invisible under the
 *     flat lighting of the upright poses and only reads once the fall lights the back at a
 *     glancing angle, which is why it looked fixed from the front-facing frames.
 *
 * Both are found by position rather than by name, so a re-export that renames the nodes still
 * gets caught. LOGO_BOX is the decal's own footprint on the back half; a triangle whose centroid
 * lands inside it is logo.
 */
const LOGO_BOX = { x: 1.2, yMin: -1.4, yMax: 1.8 };

/**
 * The band above the footprint that has to be empty before a mesh is cut. On the relief mesh the
 * logo tops out at y = 1.233 and the camera plate starts at y = 3.725, so it splits cleanly. A
 * panel that merely crosses the footprint on its way past - the back glass runs the whole length
 * of the phone - has triangles here, fails the test and is left untouched.
 */
const LOGO_GAP = { yMin: 1.8, yMax: 3.5 };

/**
 * Takes the Apple branding out of one mesh. Returns true when the mesh is logo end to end and
 * the caller should drop the whole node; false when it either held no logo or has had its logo
 * triangles cut out in place, leaving the rest of the mesh exactly as it was.
 */
function stripLogo(mesh: THREE.Mesh): boolean {
  const geo = mesh.geometry as THREE.BufferGeometry | undefined;
  const pos = geo?.attributes?.position;
  if (!geo || !pos) return false;
  if (!geo.boundingBox) geo.computeBoundingBox();
  // Front half is the screen, the speaker and the front camera. Nothing there is ever branding.
  const bb = geo.boundingBox;
  if (!bb || (bb.max.z + bb.min.z) / 2 <= 0) return false;

  const index = geo.index;
  const triCount = (index ? index.count : pos.count) / 3;
  const vertexOf = (t: number, k: number) => (index ? index.getX(t * 3 + k) : t * 3 + k);

  const keep: number[] = [];
  let logoTris = 0;
  let gapOccupied = false;
  for (let t = 0; t < triCount; t++) {
    let cx = 0, cy = 0, cz = 0;
    for (let k = 0; k < 3; k++) {
      const i = vertexOf(t, k);
      cx += pos.getX(i); cy += pos.getY(i); cz += pos.getZ(i);
    }
    cx /= 3; cy /= 3; cz /= 3;
    if (cz > 0 && Math.abs(cx) <= LOGO_BOX.x && cy >= LOGO_BOX.yMin && cy <= LOGO_BOX.yMax) {
      logoTris++;
      continue;
    }
    if (cy > LOGO_GAP.yMin && cy < LOGO_GAP.yMax) gapOccupied = true;
    for (let k = 0; k < 3; k++) keep.push(vertexOf(t, k));
  }

  if (logoTris === 0) return false;
  if (logoTris === triCount) return true;
  // Some logo, some not. Only cut when the two are provably separate bodies; otherwise this is
  // a panel passing through the footprint and cutting it would punch a hole in the shell.
  if (gapOccupied) return false;
  geo.setIndex(keep);
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return false;
}

/** Screen mesh in scene.glb. Same node the reference IPhone.jsx swaps the map on. */
const SCREEN_MESH = 'xXDHkMplTIDAXLN';

/** Materials the reference implementation leaves untinted (glass, lens, steel). */
const UNTINTED = new Set([
  'zFdeDaGNRwzccye',
  'ujsvqBWRMnqdwPx',
  'hUlRcbieVuIiOXG',
  'jlzuBkUzuJqgiAK',
  'xNrofRCqOXXHVZt',
]);

/** Black Titanium, from the reference project's own model list. */
const BODY_COLOR = '#454749';

const CAM_Z = 3.0;
const CAM_FOV = 50;

/**
 * The reveal, in three phases against normalised scroll progress.
 *
 *   0.00 - 0.20   hold. The phone is already on screen at rest, leaning slightly back, with
 *                 roughly its top third showing under the globe. Nothing moves; this is the
 *                 composition the page loads on and it survives a little scroll.
 *   0.20 - 0.52   the rise. Vertical translation plus the one thing that straightens: the
 *                 backward lean eases out to dead upright as the phone comes up, so it
 *                 arrives square to the viewer. No turn of any kind here. The copy lifts and
 *                 fades away over the same span, and the globe fades out with it, so the
 *                 handover from globe to phone is one continuous move rather than a swap.
 *   0.52 - 0.94   the fall. One flip and one only: a single complete revolution about x while
 *                 the roll swings through at the same time, so the screen sweeps away, past
 *                 edge-on, through the back and round to the front again on a diagonal rather
 *                 than spinning flat in one plane. It comes forward in real camera depth and
 *                 lands lying over, screen up and toward the camera, at the size it turned at.
 *   0.94 - 1.00   hold on the landed pose, so it is actually seen rather than reached at the
 *                 instant the pin releases.
 */
const P1_END = 0.2;
const P2_END = 0.52;
const P3_END = 0.94;

/* The tagline under the landed phone. Starts a touch before P3_END, inside the rock-back settle
   of phase 3, so it reads as arriving with the phone rather than as a separate beat after it
   stops; finishes just past P3_END, into the hold, so the last of its rise is what the reader
   actually sees settle. */
const TAGLINE_START = P3_END - 0.08;
const TAGLINE_D = 0.14;

/**
 * Upright and square to the camera: what the phone straightens into at the top of the rise,
 * and what the flip then starts from. Dead zeros, not near-zeros, because a revolution that
 * begins from anything but square reads as lopsided.
 */
const REST = { rx: 0, ry: 0, rz: 0 };

/**
 * The resting lean. Negative x tips the top of the phone away from the camera, so it sits
 * back on its heels the way a phone left standing against something does. Small on purpose:
 * enough to read as a lean, not enough to read as the fall having already started.
 */
const TILT = -0.17;

/**
 * The entry lean the scroll-linked reveal starts from: about 40 degrees back, held through the
 * phase and the first part of the rise, so the phone reads as tipped away from the viewer for
 * as long as it is coming into view, then eases out to dead upright before the fall begins.
 * The still (reduced-motion) composition keeps the shallower TILT above; only the animated
 * reveal starts this far back.
 */
const ENTER_DEG = 40.25; // 35 degrees, opened up by a further 15%
const ENTER_TILT = -(ENTER_DEG * Math.PI) / 180;

/**
 * Fraction of the rise the entry lean is held for before it starts easing out. The phone is
 * roughly half revealed by then, which is where the lean is supposed to read deepest.
 */
const TILT_HOLD = 0.2;

/**
 * Where the phone sits before any scroll. py is set so roughly the top third of it clears the
 * hero's bottom clip; pz is zero so the rise that follows carries no depth change. The positions are in the phone canvas's own world units, sized by the canvas box in
 * the JSX below, which deliberately overhangs the hero on every side so there is somewhere
 * off-frame for the rest of the phone to wait.
 */
const START = { rx: ENTER_TILT, ry: REST.ry, rz: REST.rz, py: -0.748, pz: 0 };

/** End of the rise: straightened up, square on, whole and clear of the hero's edges. */
const RISE = { py: 0.21, pz: 0 };

/**
 * The landed pose, measured off the reference image rather than eyeballed.
 *
 * The reference gives two things directly: the on-screen direction of the phone's own long
 * and short axes, and their lengths. The long axis runs up to the left at 24.6 degrees and is
 * barely foreshortened; the short axis runs up to the right at 33.5 degrees and is
 * foreshortened to about 0.70. Solving the orthonormal frame that projects to exactly that
 * (screen normal forced toward the camera, so the display faces the viewer rather than the
 * floor) gives one rotation matrix, and decomposing it in three's XYZ Euler order gives these
 * three angles. They are not round numbers because the pose in the reference is not a round
 * pose.
 *
 * pz is real camera depth, not a scale fake, so the phone genuinely foreshortens along its
 * length and the near corner reads nearer than the far one. k is 1: the phone lands at the
 * same size it turned over at, and applySize only ever clamps it further down if the viewport
 * cannot hold the landed silhouette.
 */
const END = { rx: -1.044, ry: 0.154, rz: 1.003, py: 0.379, pz: 0.34, k: 1 };

/**
 * The landed orientation, wound back exactly one turn on x and nothing else. Tweening REST to
 * this rather than to END is what makes the fall a complete revolution instead of the short
 * way round, and because a full turn is an exact offset it cannot land anywhere but on END,
 * however END is retuned.
 *
 * y deliberately takes no turn of its own. Winding both axes ran two revolutions at once,
 * which is what read as a second flip. The diagonal comes from the roll on z and the yaw
 * moving through the same phase as the revolution, not from a second full turn.
 */
const TURN = Math.PI * 2;
const FALL = { rx: END.rx - TURN, ry: END.ry, rz: END.rz };

/** Carried a little past the landing, so the last of the fall can rock it back. */
const OVER = { rx: FALL.rx - 0.1, ry: FALL.ry - 0.05, rz: FALL.rz + 0.07 };

/**
 * The landed phone's own long and short axes, in world space. Derived from END rather than
 * written down, so the fit solver in applySize below stays honest if END is ever retuned.
 */
const END_AXES = (() => {
  const m = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(END.rx, END.ry, END.rz));
  return {
    long: new THREE.Vector3(0, 1, 0).applyMatrix4(m),
    wide: new THREE.Vector3(1, 0, 0).applyMatrix4(m),
  };
})();

/**
 * A reduced-motion visitor gets the phase 1 composition and nothing else. This section has
 * never animated for them (buildAnimation returns before the timeline exists), so they keep
 * the upright phone under the globe as a still composition and the tumble is never applied to
 * them, not even as a frozen 3D pose.
 */
const START_FLAT = { rx: TILT, ry: START.ry, rz: START.rz, py: START.py, pz: START.pz };

/* ------------------------------------------------- React screen -> texture */

/**
 * next/font serves its woff2 files same-origin, but an SVG rendered as an image loads no
 * external resources at all, so the faces have to travel inside the document as data URLs or
 * the screen falls back to system sans. Resolved once per page load, and never fatal.
 */
let fontCssPromise: Promise<string> | null = null;

function getFontCss(): Promise<string> {
  if (fontCssPromise) return fontCssPromise;
  fontCssPromise = (async () => {
    const wanted = /inter|poppins/i;
    const out: string[] = [];
    let used = 0;

    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue; // cross-origin sheet, nothing to read
      }
      for (const rule of Array.from(rules)) {
        if (used >= 10) break;
        if (typeof CSSFontFaceRule === 'undefined' || !(rule instanceof CSSFontFaceRule)) continue;
        const family = rule.style.getPropertyValue('font-family');
        if (!wanted.test(family)) continue;
        const src = rule.style.getPropertyValue('src');
        const raw = src.match(/url\(["']?([^"')]+)["']?\)/)?.[1];
        if (!raw) continue;
        // next/font writes these as paths relative to the stylesheet (../media/x.woff2), not
        // to the page. Resolving against the page turns them into /media/x.woff2, which 404s
        // and silently drops the face, so the screen quietly falls back to system sans.
        let url: string;
        try {
          url = new URL(raw, sheet.href || document.baseURI).href;
        } catch {
          continue;
        }
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const blob = await res.blob();
          const dataUrl = await new Promise<string>((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => res(String(fr.result));
            fr.onerror = rej;
            fr.readAsDataURL(blob);
          });
          out.push(
            `@font-face{font-family:${family};font-style:${
              rule.style.getPropertyValue('font-style') || 'normal'
            };font-weight:${
              rule.style.getPropertyValue('font-weight') || '400'
            };font-display:block;src:url(${dataUrl}) format('woff2');}`
          );
          used++;
        } catch {
          /* one missing face is not worth failing the whole screen over */
        }
      }
    }
    return out.join('');
  })().catch(() => '');
  return fontCssPromise;
}

/** Copies next/font's CSS variables onto the snapshot root, so var() still resolves there. */
function applyFontVars(target: HTMLElement) {
  const roots = [document.documentElement, document.body];
  for (const name of ['--font-inter', '--font-poppins', '--font-dm-sans']) {
    for (const r of roots) {
      const v = getComputedStyle(r).getPropertyValue(name).trim();
      if (v) {
        target.style.setProperty(name, v);
        break;
      }
    }
  }
}

/**
 * Serialises a live DOM subtree into an image and hands back a CanvasTexture.
 *
 * The whole snapshot root is assembled as real DOM and handed to XMLSerializer, never
 * string-concatenated: font variable values arrive quoted ("Inter", "Inter Fallback"), which
 * silently breaks a hand-written style attribute and makes the SVG unparseable. Serialising
 * (rather than reading outerHTML) also keeps nested inline <svg> icons in their namespace.
 */
async function domToTexture(el: HTMLElement, px: number): Promise<THREE.CanvasTexture> {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const scale = px / w;

  const [fontCss] = await Promise.all([getFontCss(), (document as Document).fonts?.ready]);

  const root = document.createElement('div');
  applyFontVars(root);
  root.style.width = `${w}px`;
  root.style.height = `${h}px`;
  root.style.transform = `scale(${scale})`;
  root.style.transformOrigin = '0 0';

  const styleEl = document.createElement('style');
  styleEl.textContent = fontCss;
  root.appendChild(styleEl);

  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.position = 'relative';
  clone.style.left = '0';
  clone.style.top = '0';
  root.appendChild(clone);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(w * scale)}" height="${Math.round(
      h * scale
    )}">` +
    `<foreignObject x="0" y="0" width="100%" height="100%">` +
    new XMLSerializer().serializeToString(root) +
    `</foreignObject></svg>`;

  // A data URL, not a blob URL: Chrome treats an SVG image served from a blob as
  // origin-unclean, and drawing it taints the canvas so WebGL refuses the upload.
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

  const img = new Image();
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error('screen snapshot failed'));
    img.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  // The screen mesh's UVs run bottom-up, so this one keeps three's default flip.
  tex.flipY = true;
  tex.needsUpdate = true;
  return tex;
}

/* --------------------------------------------------------------- component */

type Props = {
  /** CSS width of the phone slot, matching what the DOM phone used. */
  width: number;
  /** The Fermor screen, rendered offscreen and captured as the display texture. */
  screen: React.ReactNode;
  /** Shorter scroll distance where there is less room. */
  compact?: boolean;
  /** Rendered in the phone's place if WebGL cannot init, or its context is lost and does not
   *  recover. The existing DOM phone shell (see `Phone` in HomepageClient) is what callers pass
   *  here, so a device that cannot run the 3D scene still gets the real dashboard screen in a
   *  phone frame instead of an empty slot. */
  fallback?: React.ReactNode;
};

export default function FermorPhone3D({ width, screen, compact = false, fallback }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const screenSrcRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);

  /* True once WebGL is confirmed unusable for this mount: renderer creation threw, or the
     context kept dropping instead of recovering. `fallback` (the DOM phone) takes over so the
     hero never shows an empty slot where the phone should be. */
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    const screenSrc = screenSrcRef.current;
    const tagline = taglineRef.current;
    if (!host || !stage || !screenSrc) return;

    let cancelled = false;
    let idleHandle: number | null = null;
    let teardown: (() => void) | null = null;
    /* Lives outside mount() so it survives a remount: see the matching comment in HeroGlobe.tsx
       for why resuming the render loop alone does not bring a restored context back, and why a
       full teardown-then-remount is what actually re-uploads the model instead of rendering
       nothing forever after. */
    let lossCount = 0;

    /* Mobile only. This mount is the heaviest thing on the homepage: a Draco-compressed glTF
       load, a PMREM environment bake and a DOM-to-texture snapshot, all before the first frame.
       Deferring the whole thing by one idle tick lets the rest of the hero (nav, headline,
       waitlist field, the DOM phone fallback below) paint first, so the page is usable
       immediately instead of waiting on the model. Desktop and tablet are unaffected: they
       mount exactly as before, synchronously on first effect run. */
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 760;

    const mount = () => {
      if (cancelled) return;

      // The hero. It is the pin target for the scroll timeline and, because it clips its own
      // overflow, it is also the frame the landed phone has to fit inside.
      const section = host.closest('section') as HTMLElement | null;

      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%';
      stage.appendChild(canvas);

      const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let disposed = false;
      let raf = 0;
      const visible = { current: true };

      /* ------------------------------------------------------------ renderer */
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch {
        setFailed(true);
        if (canvas.parentNode === stage) stage.removeChild(canvas);
        return; // no WebGL: the DOM fallback phone takes over
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAM_FOV, 1, 0.1, 100);
    // Fixed: the reveal is the phone moving through the frame, not the frame moving.
    camera.position.set(0, 0, CAM_Z);

    /* ------------------------------------------- lights (from Lights.jsx) */
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const spot = (
      pos: [number, number, number],
      intensity: number,
      decay: number,
      color = 0xffffff
    ) => {
      const l = new THREE.SpotLight(color, intensity, 0, 0.15, 1, decay);
      l.position.set(...pos);
      return l;
    };
    scene.add(spot([-2, 10, 5], Math.PI * 0.2, 0, 0xf8f9fa));
    scene.add(spot([0, -25, 10], Math.PI * 0.2, 0, 0xf8f9fa));
    scene.add(spot([0, 15, 5], Math.PI * 3, 0.1));

    /* -------------------------------- environment (the three lightformers) */
    const envScene = new THREE.Scene();
    const rectGeo = new THREE.PlaneGeometry(1, 1);
    const rectMats: THREE.Material[] = [];
    const lightformer = (
      color: string,
      intensity: number,
      pos: [number, number, number],
      rotY = 0
    ) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      rectMats.push(mat);
      const m = new THREE.Mesh(rectGeo, mat);
      m.position.set(...pos);
      m.rotation.y = rotY;
      m.scale.setScalar(10);
      envScene.add(m);
    };
    lightformer('#495057', 10, [-1, 0, -10]);
    lightformer('#ffffff', 10, [-10, 2, 1], Math.PI / 2);
    lightformer('#ffffff', 10, [10, 0, 1], Math.PI / 2);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(envScene, 0, 0.1, 100);
    scene.environment = envRT.texture;
    pmrem.dispose();

    /* ------------------------------------------------------------- sizing */
    const pivot = new THREE.Group();
    scene.add(pivot);

    let modelHeight = 1; // world units at scale 1, filled in after load
    let baseScale = 1; // the fit-to-slot scale; the timeline only ever scales relative to it
    // The fall is the only phase that changes size: phases 1 and 2 hold the phone at exactly
    // the slot's own scale, so the rise reads as a straight translation. grow.t runs 0 to 1
    // across the fall and the scale is derived from it, which lets endK be recomputed on
    // resize without the timeline holding a stale target.
    // Height, depth and scale are driven through two proxies rather than tweened on the pivot
    // directly, for two reasons.
    //
    // The first is that the landed pose has to be refittable: applySize recomputes endK and
    // endPy on every resize, and a tween that held them as its own end values would keep
    // whatever it recorded when it was built.
    //
    // The second matters more, because getting it wrong is silent. ScrollTrigger's refresh
    // sweeps the timeline to its end and back to record values, so every tween renders in
    // timeline order even on a page nobody has scrolled. With two tweens writing
    // pivot.position.y, the last one in that sweep won and the phone sat at the top of the
    // rise on first paint, on a fresh load, until the first scroll event corrected it. Derived
    // from proxies there is nothing to win: the pose is a pure function of the two progresses,
    // so (0, 0) is the phase 1 pose no matter what order anything renders in.
    const rise = { t: 0 };
    const approach = { t: 0 };
    let endK = END.k;
    let endPy = END.py;
    // The phone sits a little higher at rest than the reference pose, so more of it shows under
    // the copy and the gap between the two stays tight. It still reads as tucked below the fold.
    // Compact viewports lift it further, the hero band being a bigger share of a smaller screen.
    const startPy = compact ? -0.4 : -0.6;
    const applyPose = () => {
      pivot.position.y =
        startPy + (RISE.py - startPy) * rise.t + (endPy - RISE.py) * approach.t;
      pivot.position.z =
        START.pz + (RISE.pz - START.pz) * rise.t + (END.pz - RISE.pz) * approach.t;
      pivot.scale.setScalar(baseScale * (1 + (endK - 1) * approach.t));
    };

    /**
     * Fits the landed pose to the window.
     *
     * END is written for the reference composition, which fills nearly the whole frame. A
     * narrower or shorter window cannot hold that, and how far it has to come down is not
     * something a breakpoint can guess: the phone lands lying diagonally under real
     * perspective, so its silhouette is neither its own width nor its own height, and the
     * middle of that silhouette is not where the middle of the phone projects. So project the
     * four corners for real, shrink until the silhouette fits the hero band, and shift the
     * height until it sits centred in it. A dozen passes converge well inside a pixel.
     */
    const fitEnd = (canvasRect: DOMRect, focal: number, slotH: number) => {
      const band = section
        ? Math.min(section.offsetHeight, window.innerHeight)
        : window.innerHeight;
      // Where the hero's bottom edge falls relative to the canvas centre, which is the origin
      // every projected y below is measured from.
      const hostRect = host.getBoundingClientRect();
      const originToBottom = hostRect.bottom - (canvasRect.top + canvasRect.height / 2);
      const halfW = ((width * CAM_Z) / focal) * 0.5;
      const halfH = ((slotH * CAM_Z) / focal) * 0.5;
      const { long, wide } = END_AXES;
      const MARGIN = 18;

      // Silhouette of the landed phone in pixels, y measured up from the hero's bottom edge.
      const project = (k: number, py: number) => {
        let x0 = Infinity;
        let x1 = -Infinity;
        let y0 = Infinity;
        let y1 = -Infinity;
        for (const sw of [-1, 1]) {
          for (const sh of [-1, 1]) {
            const cx = sw * halfW * k * wide.x + sh * halfH * k * long.x;
            const cy = sw * halfW * k * wide.y + sh * halfH * k * long.y + py;
            const cz = sw * halfW * k * wide.z + sh * halfH * k * long.z + END.pz;
            const s = focal / (CAM_Z - cz);
            x0 = Math.min(x0, cx * s);
            x1 = Math.max(x1, cx * s);
            y0 = Math.min(y0, originToBottom + cy * s);
            y1 = Math.max(y1, originToBottom + cy * s);
          }
        }
        return { w: x1 - x0, h: y1 - y0, mid: (y0 + y1) / 2 };
      };

      const midScale = focal / (CAM_Z - END.pz);
      let k = END.k;
      let py = END.py;
      for (let i = 0; i < 12; i++) {
        const box = project(k, py);
        k = Math.min(
          END.k,
          k * Math.min((window.innerWidth * 0.93) / box.w, (band - MARGIN * 2) / box.h)
        );
        py += (band / 2 - project(k, py).mid) / midScale;
      }
      endK = k;
      endPy = py;
    };

    const applySize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();

      // Match the DOM phone's on-screen height exactly at the upright pose of phases 1 and 2.
      const visibleH = 2 * CAM_Z * Math.tan((CAM_FOV * Math.PI) / 360);
      const pxPerUnit = rect.height / visibleH;
      const slotH = (width * 620) / 300;
      const targetUnits = slotH / pxPerUnit;
      baseScale = targetUnits / modelHeight;

      fitEnd(rect, rect.height / (2 * Math.tan((CAM_FOV * Math.PI) / 360)), slotH);
      applyPose();
    };

    /* -------------------------------------------------------------- model */
    const disposables: { geo: THREE.BufferGeometry[]; mat: THREE.Material[]; tex: THREE.Texture[] } =
      { geo: [], mat: [], tex: [] };

    const draco = new DRACOLoader();
    draco.setDecoderPath('/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    let tl: gsap.core.Timeline | null = null;
    let globeLayer: Element | null = null;
    let copyLayer: Element | null = null;

    const buildAnimation = () => {
      if (reduceMotion) return;
      const trigger = section;
      if (!trigger) return;

      gsap.registerPlugin(ScrollTrigger);
      tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          // Normally the hero pins with its top at the viewport top. On a short window (or a
          // tablet, where the hero stacks and grows tall) that would freeze the hero with its
          // lower half cut off for the whole animation, so pin from the bottom edge instead
          // and the whole hero stays on screen throughout. The +2 tolerance keeps a hero sized
          // to exactly 100vh (the new default) on the top-top branch despite sub-pixel rounding.
          start: () => (trigger.offsetHeight > window.innerHeight + 2 ? 'bottom bottom' : 'top top'),
          // The distance the reveal is spread over. A flick of the wheel covers a smaller
          // fraction of it, which is what keeps the phone's motion measured without the
          // animation having to lag behind the input to achieve it.
          end: () =>
            '+=' + Math.round(window.innerHeight * (compact ? 1.9 : 2.5)),
          // 0.28, not the 1.2 this used to carry. `scrub` is not an animation duration, it is
          // input latency: the timeline eases toward wherever the scroll has got to, taking
          // roughly this many seconds to catch up. At 1.2 the reveal ran over a second behind
          // the reader's hand, and because the hero is PINNED for this whole stretch, that lag
          // was the only feedback a scroll produced - the page itself does not move while
          // pinned. Scroll, see nothing happen for a beat, then watch it catch up: that is
          // exactly the "stuck", "buffering", "delayed" feeling reported at the top of the
          // page, and it was worst on the very first scroll of a fresh load. At 0.28 the phone
          // still eases rather than snapping frame-for-frame to a jittery wheel, but it reads
          // as responding to the scroll instead of trailing it.
          scrub: 0.28,
          pin: trigger,
          pinSpacing: true,
          invalidateOnRefresh: true,
          // anticipatePin, fastScrollEnd and preventOverlaps all came off with the heavy scrub:
          // every one of them existed to paper over a consequence of it. anticipatePin pins
          // slightly before the trigger is reached, which is a small position jump on entry;
          // fastScrollEnd slams the timeline to its end state when a fast scroll outruns the
          // scrub, which is a visible skip; preventOverlaps does the same in reverse. With the
          // timeline actually keeping up there is nothing left for them to rescue, and all
          // three are themselves sources of the sudden movement this section was reported to
          // have. Plain scrubbing against the real scroll position, and nothing else.
        },
      });

      /* ---- phase 1: hold. Nothing is tweened before P1_END, so the pose the page loads
         on survives the first fifth of the pin exactly as it is. */

      /* ---- phase 2: the rise. Height, and the one rotation that is not a turn: the resting
         backward lean eases out to square over exactly the same span, so the phone finishes
         the rise upright and the fall has a flat pose to start from. power2.inOut, not
         power2.out: it has to stay low through the first part of the rise so it does not climb
         into the copy before the copy has finished fading.

         fromTo with immediateRender off, rather than to: a plain to() would record whatever
         rotation.x happened to hold the first time ScrollTrigger swept the timeline, and the
         refresh sweep runs before any scroll. Stating the lean explicitly means the phase
         cannot pick up a stale start. */
      const RISE_D = P2_END - P1_END;
      tl.to(rise, { t: 1, duration: RISE_D, ease: 'power2.inOut', onUpdate: applyPose }, P1_END);
      tl.fromTo(
        pivot.rotation,
        { x: START.rx },
        {
          x: REST.rx,
          duration: RISE_D * (1 - TILT_HOLD),
          ease: 'power2.inOut',
          immediateRender: false,
        },
        P1_END + RISE_D * TILT_HOLD
      );

      /* ---- phase 3: the fall. One revolution, started explicitly from square so the phase
         cannot inherit a stale pose from the straightening above it. The turn overshoots
         slightly past the landing and the last part of the phase rocks it back, which is what
         stops it reading as a rotation that simply ran out of scroll. Rotation and depth share
         the phase; scale does not move at all. */
      const FALL_D = P3_END - P2_END;
      const SETTLE = 0.16;
      tl.fromTo(
        pivot.rotation,
        { x: REST.rx, y: REST.ry, z: REST.rz },
        {
          x: OVER.rx,
          y: OVER.ry,
          z: OVER.rz,
          duration: FALL_D * (1 - SETTLE),
          ease: 'power2.inOut',
          immediateRender: false,
        },
        P2_END
      );
      tl.to(
        pivot.rotation,
        { x: FALL.rx, y: FALL.ry, z: FALL.rz, duration: FALL_D * SETTLE, ease: 'power2.out' },
        P2_END + FALL_D * (1 - SETTLE)
      );
      // The approach is held back to the second half of the fall on purpose: by the time the
      // phone is coming forward it is already flattening out, which is what reads as it
      // dropping toward the camera. It carries depth and height only. Scale is fixed at the
      // slot's own for the whole timeline (END.k is 1), so the phone is never enlarged on the
      // way down or once it has landed.
      const APPROACH = 0.45;
      tl.to(
        approach,
        {
          t: 1,
          duration: FALL_D * (1 - APPROACH),
          ease: 'power2.inOut',
          onUpdate: applyPose,
        },
        P2_END + FALL_D * APPROACH
      );

      // The globe shrinks from the big arc that fills the hero down to a small, complete sphere
      // at the centre of the frame, then fades so the phone has the frame to itself. The mask
      // (--globe-cut) and clip (--globe-clip) open past 100% over the first part of the move, so
      // what shrinks is the whole round planet rather than a smaller crop of the arc. All of it
      // rides the same scrubbed timeline as the rise, so globe and phone stay in lockstep and
      // scrolling back reassembles the arc for free. The layer's own renderer is untouched;
      // this only transforms and re-masks the box the canvas sits in.
      globeLayer = trigger.querySelector('[data-hero-globe-layer]');
      if (globeLayer) {
        const globeEl = globeLayer as HTMLElement;
        const gRect = globeEl.getBoundingClientRect();
        const gW = gRect.width || window.innerWidth;
        const shrink = Math.max(0.22, Math.min(0.55, (window.innerHeight * 0.58) / (gW * 0.9)));
        // Scale about the centre of the fold, not the oversized layer's own centre, so the
        // sphere converges on the middle of the frame. Measured live rather than trusting the
        // CSS value, since GSAP manages the transform from here on.
        const originY = window.innerHeight * 0.46 - (gRect.top - trigger.getBoundingClientRect().top);
        gsap.set(globeEl, { transformOrigin: `50% ${Math.round(originY)}px` });

        // The mask (--globe-cut) and clip (--globe-clip) are driven through a plain proxy and
        // written in onUpdate, not tweened directly. ScrollTrigger's refresh sweeps the timeline
        // end-to-end before any scroll to record values; a CSS-variable tween does not survive
        // that sweep cleanly (it reads back a stale start and sticks), whereas a proxy is a pure
        // function of one number and reads the same at progress 0 no matter the sweep order.
        const cutRest = parseFloat(getComputedStyle(globeEl).getPropertyValue('--globe-cut')) || 54;
        const clipRest = parseFloat(getComputedStyle(globeEl).getPropertyValue('--globe-clip')) || 48;
        const reveal = { t: 0 };
        const applyReveal = () => {
          globeEl.style.setProperty('--globe-cut', `${cutRest + (175 - cutRest) * reveal.t}%`);
          globeEl.style.setProperty('--globe-clip', `${clipRest * (1 - reveal.t)}%`);
        };
        applyReveal();

        tl.to(globeEl, { scale: shrink, duration: RISE_D + 0.12, ease: 'power2.inOut' }, P1_END - 0.04);
        tl.to(reveal, { t: 1, duration: RISE_D * 0.62, ease: 'power1.out', onUpdate: applyReveal }, P1_END - 0.04);
        tl.to(globeEl, { opacity: 0, duration: RISE_D * 0.42, ease: 'power2.in' }, P1_END + RISE_D * 0.7);
      }

      // The copy rises and hands the frame over. It has to go all the way and it has to be
      // gone before the phone gets there, so both its lift and its fade live inside phase 2:
      // by the time the upright phone is whole, the band it occupies is empty.
      copyLayer = trigger.querySelector('[data-hero-copy]');
      if (copyLayer) {
        // Lifts and shrinks toward the globe as it fades, so the copy reads as receding into
        // the same handover the globe is making rather than just sliding off the top.
        tl.to(copyLayer, { y: -220, scale: 0.82, duration: RISE_D + 0.04, ease: 'power1.inOut' }, P1_END - 0.04);
        tl.to(copyLayer, { opacity: 0, duration: RISE_D * 0.42, ease: 'power2.in' }, P1_END);
        // Once it is invisible it has to stop taking clicks and focus as well: the copy now
        // carries a real email field, and an invisible focusable input is a keyboard trap. A
        // set() on a scrubbed timeline reverts on the way back, so scrolling up hands it back.
        tl.set(copyLayer, { pointerEvents: 'none' }, P1_END + RISE_D * 0.45);
      }

      // The tagline. Not a fade: it starts pushed down and rises into its resting spot on the
      // same eased curve as everything else here, so it reads as one more thing settling into
      // place with the phone rather than as a caption dropped in afterward.
      if (tagline) {
        gsap.set(tagline, { xPercent: -50, y: 22, opacity: 0 });
        tl.to(tagline, { y: 0, opacity: 1, duration: TAGLINE_D, ease: 'power2.out' }, TAGLINE_START);
      }

      // Explicit tail, so the timeline's own length is 1 and the hold on the landed pose is
      // real scroll rather than the pin releasing the instant it arrives.
      tl.to({}, { duration: 1 - P3_END });
    };

    (async () => {
      let screenTex: THREE.CanvasTexture | null = null;
      try {
        screenTex = await domToTexture(screenSrc, 900);
      } catch (err) {
        /* the phone still renders, just with the model's own screen material */
        console.warn('[FermorPhone3D] screen texture failed', err);
      }
      if (disposed) {
        screenTex?.dispose();
        return;
      }
      if (screenTex) {
        screenTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        disposables.tex.push(screenTex);
      }

      const gltf = await loader.loadAsync('/models/scene.glb').catch(() => null);
      if (!gltf || disposed) return;

      const model = gltf.scene;
      /* Meshes that make up the Apple decal on the back shell, collected during the pass and
         detached afterwards. Detaching, not `visible = false`: an invisible mesh is still in the
         graph, so anything that later walks the model can turn it back on, and it still has to
         be reasoned about on every frame of the flip. Removed from the parent it cannot appear
         in any state of the rotation, and the model file itself is untouched. Mutating the graph
         from inside `traverse` would skip siblings, so the removal happens after the walk. */
      const logoParts: THREE.Object3D[] = [];
      model.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (o.name === SCREEN_MESH && screenTex) {
          // Same swap the reference makes: a fresh standard material carrying the map. The
          // emissive pass is the one addition, because a real display emits its own light and
          // the Fermor UI is a light interface that goes grey under scene lighting alone.
          const screenMat = new THREE.MeshStandardMaterial({
            roughness: 1,
            map: screenTex,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: screenTex,
            emissiveIntensity: 0.72,
          });
          disposables.mat.push(screenMat);
          mesh.material = screenMat;
          return;
        }
        // Apple branding: whole node if the mesh is nothing but logo, otherwise just its logo
        // triangles. See LOGO_BOX above for why this is done by position and not by name.
        if (stripLogo(mesh)) {
          logoParts.push(o);
          return;
        }
        if (mat && !UNTINTED.has(mat.name)) mat.color = new THREE.Color(BODY_COLOR);
        if (mat) mat.needsUpdate = true;
      });

      /* Detached from the graph, and its geometry emptied on the way out. Detaching alone is
         enough for this model as it loads today; blanking the draw range is what makes it hold
         if anything ever puts it back. A clone shares the source geometry, so a duplicated or
         animation-state copy of the decal draws nothing either, and re-adding this very node
         renders nothing. It costs one call and touches no other mesh: the geometry belongs to
         the decal alone, and PaletteMaterial004 is used by no other node in scene.glb. */
      for (const part of logoParts) {
        part.removeFromParent();
        (part as THREE.Mesh).geometry?.setDrawRange(0, 0);
      }


      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      modelHeight = size.y || 1;
      model.position.sub(box.getCenter(new THREE.Vector3())); // rotate about the phone's centre
      // The glTF faces the camera with its back. Turn the model, not the pivot, so the
      // scroll timeline still reads (0,0,0) as "upright, screen to the user".
      model.rotation.y = Math.PI;
      pivot.add(model);

      // Park it in the phase 1 pose before the first render, so the phone is already upright
      // and already peeking out from under the globe on the very first frame.
      const start = reduceMotion ? START_FLAT : START;
      pivot.rotation.set(start.rx, start.ry, start.rz);
      pivot.position.set(0, reduceMotion ? start.py : startPy, start.pz);
      rise.t = 0;
      approach.t = 0;

      applySize();
      buildAnimation();
      ScrollTrigger.refresh();
      // Webfonts and late images change the hero height after this first refresh, which moves
      // the pin start/end. Re-measure once they have settled rather than leaving the pin bound
      // to a stale layout. Fonts and the window's own `load` event (every image, not just the
      // ones this component happens to know about) are two independent settle signals, so both
      // are covered rather than only the one this file's own assets need.
      if (document.fonts && document.fonts.status !== 'loaded') {
        document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); }).catch(() => {});
      }
      if (document.readyState !== 'complete') {
        const onLoad = () => { if (!disposed) ScrollTrigger.refresh(); };
        window.addEventListener('load', onLoad, { once: true });
      }
    })();

    /* ------------------------------------------------------- observers */
    applySize();
    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, {
      threshold: 0,
    });
    io.observe(host);

    const onVis = () => { visible.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVis);

    /* ------------------------------------------------------------- loop */
    let contextLost = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (contextLost || !visible.current) return;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    /* ------------------------------------------------------- context loss
       A lost context pauses the loop instead of throwing or freezing the last frame. Restoring
       is not just a matter of resuming it, though: every GPU-side buffer, texture and program
       the model and its environment map held is gone, and three.js has no way to know that on
       its own, so a bare resume renders nothing forever after. Tearing this mount down and
       building a fresh one -- reloading the glTF, rebaking the environment, retaking the screen
       snapshot, rebuilding the GSAP timeline -- is what actually gets the phone back; there is
       no cheaper recovery available once the GPU state itself is gone. If it keeps dropping
       rather than recovering, the third loss gives up on WebGL for good and hands the slot to
       the DOM fallback phone rather than rebuilding in a loop. */
    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(raf);
    };
    const onContextRestored = () => {
      lossCount++;
      if (lossCount > 2) {
        setFailed(true);
        teardown?.();
        teardown = null;
        return;
      }
      teardown?.();
      teardown = null;
      mount();
    };
    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    /* --------------------------------------------------------- teardown */
    teardown = () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
      // The globe layer is not ours; hand it back exactly as we found it, or a breakpoint
      // change would leave it stuck at whatever scale and opacity the scroll had reached.
      if (globeLayer) {
        gsap.set(globeLayer, { clearProps: 'transform,opacity,transformOrigin' });
        (globeLayer as HTMLElement).style.removeProperty('--globe-cut');
        (globeLayer as HTMLElement).style.removeProperty('--globe-clip');
      }
      if (copyLayer) gsap.set(copyLayer, { clearProps: 'transform,opacity,pointerEvents' });
      draco.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const m = mesh.material;
        (Array.isArray(m) ? m : [m]).forEach((x) => {
          const s = x as THREE.MeshStandardMaterial;
          s?.map?.dispose();
          s?.dispose?.();
        });
      });
      disposables.tex.forEach((t) => t.dispose());
      disposables.mat.forEach((m) => m.dispose());
      rectGeo.dispose();
      rectMats.forEach((m) => m.dispose());
      envRT.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode === stage) stage.removeChild(canvas);
    };
    };

    if (isMobile) {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback;
      if (ric) {
        idleHandle = ric(mount, { timeout: 1200 });
      } else {
        idleHandle = window.setTimeout(mount, 150) as unknown as number;
      }
    } else {
      mount();
    }

    return () => {
      cancelled = true;
      if (idleHandle !== null) {
        const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
        if (cic) cic(idleHandle);
        else clearTimeout(idleHandle);
      }
      teardown?.();
    };
  }, [width, compact]);

  const phoneH = (width * 620) / 300;

  return (
    <div
      ref={hostRef}
      style={{ width, height: phoneH, position: 'relative', pointerEvents: 'none' }}
    >
      {/* WebGL failed or kept losing its context: the DOM phone shell takes the slot instead
          of leaving it empty. Centred over the same box the 3D phone would occupy. */}
      {failed && fallback && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
          }}
        >
          {fallback}
        </div>
      )}

      {/* Offscreen copy of the real Fermor screen. It is a live React subtree, not a mock:
          the texture is serialised straight off it, so the 3D display cannot drift from the
          DOM one. Kept out of the layout and out of the accessibility tree. */}
      <div
        ref={screenSrcRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: -10000,
          top: 0,
          width: 300,
          height: 620,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {screen}
      </div>

      {/* Drawing area. It overhangs the host on every side. Below, so there is somewhere
          off-frame for the lower four fifths of the phone to wait through phase 1; above and to
          both sides, because the landed phone lies diagonally across nearly the whole hero and
          is wider still mid-tumble as it crosses the diagonal. Too small a canvas does not
          overflow the page, it quietly clips the phone. The overhang costs nothing outside: the
          box is absolutely positioned inside the hero, which clips its own overflow, so it
          cannot widen the document or raise a horizontal scrollbar.

          Its height also sets the world-unit to pixel scale for every py in the pose table
          above, so changing it moves the phone. Retune the poses if it changes. */}
      <div
        ref={stageRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-210%',
          top: '-45%',
          width: '520%',
          height: '215%',
        }}
      />

      {/* Bottom-centred, but not on host's own bottom edge: host's bottom is flush with the
          viewport's bottom edge by design (see the hero's "phone flush to the fold" comment in
          HomepageClient - the lower part of the phone deliberately runs off-frame), so a caption
          anchored there would render below the fold on every screen, never actually visible.
          Measured instead against the clear space below where the phone actually lands (it
          settles diagonally across the upper two-thirds of this box), which is where "bottom
          centre of the phone" reads as a real caption underneath it rather than off-screen.
          Hidden and pushed down by default; buildAnimation only ever reveals it once the phone
          has actually reached its landed pose, so a reduced-motion visitor - whose phone never
          leaves its flat opening pose - never sees it rise out of nowhere. Real copy, so it
          stays out of the aria-hidden subtree above. */}
      <p
        ref={taglineRef}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '90px',
          // No transform here: gsap.set below already applies xPercent:-50 for this same
          // centering, and GSAP composes its own transform on top of whatever the element
          // already has rather than replacing it - stating the -50% shift in both places was
          // compounding into a double-width offset once the text got wide enough to notice
          // (it clipped off the left edge on mobile). Opacity 0 keeps it invisible in the gap
          // before GSAP's first tick regardless.
          opacity: 0,
          margin: 0,
          width: 'max-content',
          maxWidth: '90vw',
          textAlign: 'center',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: compact ? 22 : 32,
          fontWeight: 800,
          lineHeight: 1.15,
          color: '#101214',
          letterSpacing: '-.01em',
        }}
      >
        Your financial <span style={{ color: '#75FB90' }}>momentum</span>
        <br />
        starts here
      </p>
    </div>
  );
}
