'use client';

/**
 * Fermor hero globe.
 *
 * A point-cloud Earth built programmatically with Three.js: golden-angle (sunflower) sampling
 * over the sphere, masked against real Natural Earth 50m land polygons, drawn as one Points
 * draw call with a custom shader. Great-circle arcs between financial centres animate as a
 * single LineSegments buffer. Nothing here is an image, a CSS circle or a textured Earth.
 *
 * Draw calls: 1 occluder sphere + 1 Points cloud + 1 LineSegments + 1 marker Points = 4 total,
 * regardless of how many dots or arcs are on screen.
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getLandMask, isLand, LAND_W, LAND_H } from './heroGlobeLandMask';

/* ---------------------------------------------------------------- palette */
/* Monochrome at rest. The globe is a background element on the hero's neutral grey gradient,
   so the sphere sits only a shade off the page and the land dots carry all of the contrast.
   There is no chromatic value anywhere in here. 'accent' is simply the darkest tone in the
   ramp, and the hover pool spends it on size and weight rather than on colour, so hovering
   reads as the land mesh thickening rather than as the globe changing colour. */
const C = {
  ocean: new THREE.Color('#E9EAEC'), // sphere, away from the light: light neutral grey
  oceanLit: new THREE.Color('#FAFAFB'), // sphere under the key light: near white
  dot: new THREE.Color('#33383D'), // land points, lit: charcoal
  dotFade: new THREE.Color('#C4C8CC'), // land points falling away from the light
  accent: new THREE.Color('#23272B'), // the darkest tone: hovered land, arc heads, markers
  halo: new THREE.Color('#D2D6DA'), // atmospheric edge: very light neutral grey
};

/* --------------------------------------------------------------- geography */
/* Arc endpoints. India-weighted, because that is who Fermor is built for. */
const CITIES: Record<string, [number, number]> = {
  mumbai: [19.08, 72.88],
  delhi: [28.61, 77.21],
  bengaluru: [12.97, 77.59],
  singapore: [1.35, 103.82],
  dubai: [25.2, 55.27],
  london: [51.51, -0.13],
  newYork: [40.71, -74.01],
  frankfurt: [50.11, 8.68],
  hongKong: [22.32, 114.17],
  tokyo: [35.68, 139.69],
  sydney: [-33.87, 151.21],
  saoPaulo: [-23.55, -46.63],
  toronto: [43.65, -79.38],
  zurich: [47.38, 8.54],
  nairobi: [-1.29, 36.82],
};

const ROUTES: [keyof typeof CITIES, keyof typeof CITIES][] = [
  ['mumbai', 'london'],
  ['mumbai', 'dubai'],
  ['mumbai', 'newYork'],
  ['mumbai', 'singapore'],
  ['mumbai', 'nairobi'],
  ['delhi', 'singapore'],
  ['delhi', 'frankfurt'],
  ['delhi', 'sydney'],
  ['delhi', 'toronto'],
  ['bengaluru', 'newYork'],
  ['bengaluru', 'tokyo'],
  ['bengaluru', 'zurich'],
  ['bengaluru', 'saoPaulo'],
  ['delhi', 'hongKong'],
];

const DEG = Math.PI / 180;

/* The globe's orientation at first paint, before the idle spin or a drag has run - independent
   of the animation loop below, so the opening frame can be dialled in here without touching how
   the globe subsequently moves. rotation.x is the centred latitude, rotation.y = -longitude
   brings that meridian to face the camera (see toVec3 below). There is no INITIAL_ROTATION_Z:
   this globe never rolls on its view axis, so a third constant would do nothing. */
const INITIAL_ROTATION_X_DEG = -8;
const INITIAL_ROTATION_Y_DEG = -30;

/** lon 0 sits on +Z, so rotating the group by -lon brings that meridian to face the camera. */
function toVec3(latDeg: number, lonDeg: number, radius: number, out = new THREE.Vector3()) {
  const lat = latDeg * DEG;
  const lon = lonDeg * DEG;
  const cl = Math.cos(lat);
  return out.set(cl * Math.sin(lon) * radius, Math.sin(lat) * radius, cl * Math.cos(lon) * radius);
}

/* ------------------------------------------------------------------ props */
type Props = {
  /** Upper bound in CSS pixels. The globe otherwise fills its column and stays square. */
  maxSize?: number;
  /** Candidate sample count before land masking. Roughly 29% survive. */
  samples?: number;
  /** No longer used: the decorative mote shell it sized was removed. Kept so the call site
   *  does not have to change. */
  particles?: number;
  className?: string;
};

export default function HeroGlobe({
  maxSize = 430,
  samples = 170000,
  particles = 220,
  className,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  /* Live values the animation loop reads and writes. Never React state: the loop must not
     be able to trigger a re-render, and nothing here belongs in the render output. */
  const rot = useRef({ x: INITIAL_ROTATION_X_DEG * DEG, y: INITIAL_ROTATION_Y_DEG * DEG });
  const visible = useRef(true);
  /* Hover: `k` eases 0 -> 1 while the pointer is actually over the sphere, and `dir` is the
     point it is over, as a unit vector. Both are smoothed in the loop so the glow never snaps
     on, and both live outside React for the same reason the rotation does. */
  const hover = useRef({ k: 0, target: 0, dir: new THREE.Vector3(0, 0, 1), aim: new THREE.Vector3(0, 0, 1) });

  /* True once WebGL is confirmed unusable on this device (init failed, or the context kept
     dropping instead of recovering). The globe never leaves a blank hole when this happens: the
     host div below swaps for a static CSS sphere in the same palette, sized identically, so the
     hero composition holds even on a device that cannot run the shader at all. */
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let idleHandle: number | null = null;
    let teardown: (() => void) | null = null;
    /* Lives outside mount() so it survives a remount: a context restore does not just resume
       the render loop (a lost context invalidates every GPU-side buffer, texture and program;
       three.js's own object cache does not know to re-upload them, so the shader silently
       renders nothing forever after). The reliable fix is to tear the whole scene down and
       build it fresh, which re-issues every buffer from scratch. Counted so a device whose
       driver cannot hold a context at all still gives up after a few tries instead of rebuilding
       in a loop. */
    let lossCount = 0;

    /* Mobile only. The globe is the single heaviest synchronous thing the hero does on first
       paint: a lattice of 70k-110k points built and uploaded before anything else in the hero
       can settle. Deferring the whole setup by one idle tick lets the browser paint the nav,
       headline and waitlist field first, so the page reads as usable immediately instead of the
       hero waiting on WebGL. Desktop and tablet mount exactly as before, synchronously. */
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 760;

    const mount = () => {
      if (cancelled) return;

      const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* ---------------------------------------------------------- renderer */
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      } catch {
        setFailed(true);
        return; // no WebGL: the fallback sphere below takes over
      }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearAlpha(0);
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    // No JS gesture claims this canvas any more (see "interaction" below: hover only, no
    // drag), so touch is left entirely to the browser's native scrolling in every direction.
    canvas.style.touchAction = 'auto';
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const FOV = 32;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 20);
    // asin(1.038 / 4.05) = 14.8deg against a 16deg half-fov: the globe fills ~90% of the
    // canvas with the atmosphere shell still fully inside the frame.
    camera.position.set(0, 0, 4.05);

    /* Pixels per world unit at one unit of depth. gl_PointSize is in device pixels, so this
       is what converts a dot's world size into a correct on-screen size at any DPR or width.
       Driven by the element's measured width, never by the viewport: deriving it from
       window.innerWidth is off by the scrollbar and produced a non-square canvas. */
    let boxPx = Math.max(1, Math.round(host.clientWidth));
    const projScale = () =>
      (boxPx * renderer.getPixelRatio()) / (2 * Math.tan((FOV * Math.PI) / 360));
    renderer.setSize(boxPx, boxPx, false);

    const globe = new THREE.Group();
    globe.rotation.x = rot.current.x;
    globe.rotation.y = rot.current.y;
    scene.add(globe);

    /* The camera is fixed at +Z with no rotation of its own, so a direction in world space and
       the same direction in view space are identical. That is what lets the hover direction be
       compared straight against the view-space normals the shaders already compute, with no
       extra matrix work per frame. */
    const uHover = { value: 0 };
    const uHoverDir = { value: hover.current.dir };

    /* --------------------------------------------- 1. opaque inner sphere
       Sits just under the point shell and writes depth, so points on the far side fail the
       depth test and disappear. That is what gives the cloud a solid, readable silhouette
       without sorting 48k transparent points. */
    const bodyGeo = new THREE.SphereGeometry(0.9915, 64, 48);
    const bodyMat = new THREE.ShaderMaterial({
      uniforms: { uSea: { value: C.ocean }, uSeaLit: { value: C.oceanLit } },
      vertexShader: `
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uSea;
        uniform vec3 uSeaLit;
        varying vec3 vN;
        void main() {
          // Gentle key light from the upper left so the sphere reads as a solid body.
          float key = clamp(dot(normalize(vN), normalize(vec3(-0.45, 0.62, 0.75))), 0.0, 1.0);
          vec3 col = mix(uSea * 0.96, uSeaLit, pow(key, 1.15));
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.renderOrder = 0;
    globe.add(body);

    /* ------------------------------------------------ 3. surface point field
       One BufferGeometry, one draw call, three populations distinguished only by `aTier`:
       0 ocean, 1 land, 2 coastline. Nothing is a separate object, so the continents read as
       part of the same mesh rather than as something laid on top of it.

       The field is a latitude/longitude lattice, not the golden-angle spiral this used to be.
       The spiral is deliberately aperiodic, which is the opposite of what is wanted here: the
       surface should read as ordered rows curving with the sphere, and that is exactly what a
       lattice projects to. Longitude count is recomputed per row from cos(lat), so spacing
       stays even in real distance instead of crowding to a point at the poles. */
    const mask = getLandMask();
    const stepDeg = Math.sqrt((4 * Math.PI) / Math.max(4000, samples)) / DEG;
    const rows = Math.max(24, Math.round(180 / stepDeg));
    const rowDeg = 180 / rows;
    /* Order is the point, so this is only enough jitter to stop the lattice beating against
       the pixel grid. The spiral it replaced needed 0.55 of a step; this needs 0.16. */
    const JIT = 0.16;
    /* Land carries a second lattice offset by half a step, kept at this fraction. That is what
       makes a continent slightly denser than the ocean around it without making it a different
       material: it is the same mesh, closer together. */
    const LAND_INFILL = 0.4;

    const px: number[] = [];
    const seeds: number[] = [];
    const tiers: number[] = [];
    const v = new THREE.Vector3();
    const put = (lat: number, lon: number, tier: number) => {
      toVec3(lat, lon, 1, v);
      px.push(v.x, v.y, v.z);
      seeds.push(Math.random());
      tiers.push(tier);
    };

    for (let ri = 0; ri < rows; ri++) {
      const lat = -90 + (ri + 0.5) * rowDeg;
      const cols = Math.max(1, Math.round((360 * Math.cos(lat * DEG)) / stepDeg));
      const colDeg = 360 / cols;
      for (let ci = 0; ci < cols; ci++) {
        const lon = -180 + (ci + 0.5) * colDeg;
        const jLat = lat + (Math.random() - 0.5) * JIT * rowDeg;
        const jLon = lon + (Math.random() - 0.5) * JIT * colDeg;
        put(jLat, jLon, isLand(mask, jLat, jLon) ? 1 : 0);
        if (Math.random() >= LAND_INFILL) continue;
        const hLat = lat + rowDeg * 0.5;
        const hLon = lon + colDeg * 0.5;
        if (isLand(mask, hLat, hLon)) put(hLat, hLon, 1);
      }
    }

    /* The outline, walked off the mask itself. A land cell with an ocean 4-neighbour is a
       boundary cell, and one particle per boundary cell traces the coast as a connected chain
       with an even gap between neighbours. Deriving it from the field instead could never
       guarantee that: the chain broke wherever the sampling happened to thin out, and had to
       be widened into a band to hide it. This is one particle thick.

       Every boundary cell is kept. Thinning the polar rows, where longitude cells narrow and
       an east-west coast bunches up, was tried and reverted: it broke the chain at exactly the
       wrong places, leaving 19% of the outline with no neighbouring particle at all against
       0.9% when every cell is kept. */
    const cellLat = 180 / LAND_H;
    const cellLon = 360 / LAND_W;
    const cellAt = (r: number, c: number) =>
      r < 0 || r >= LAND_H ? 0 : mask[r * LAND_W + (((c % LAND_W) + LAND_W) % LAND_W)];
    for (let row = 0; row < LAND_H; row++) {
      const clat = 90 - (row + 0.5) * cellLat;
      for (let col = 0; col < LAND_W; col++) {
        if (cellAt(row, col) !== 1) continue;
        const openNS = !cellAt(row - 1, col) || !cellAt(row + 1, col);
        const openEW = !cellAt(row, col - 1) || !cellAt(row, col + 1);
        if (!openNS && !openEW) continue;
        // A sixth of a cell of jitter: enough that the chain does not read as a machine-drawn
        // stroke sitting on a half-degree grid, small enough that it does not open gaps of
        // its own. It used to be a third, which was the larger half of the gap problem.
        const jLat = () => (Math.random() - 0.5) * 0.34 * cellLat;
        const jLon = () => (Math.random() - 0.5) * 0.34 * cellLon;
        const clon = -180 + (col + 0.5) * cellLon;
        put(clat + jLat(), clon + jLon(), 2);
        /* One cell of pitch is a ~3px dot on a ~10px gap at the size the hero runs the globe
           at, which is what makes the contour read as dashes. A half-cell step ALONG the
           coast halves that pitch; across it would only thicken the chain. Ocean to the
           north or south means the coast runs east/west there, and the other way round. The
           land test keeps the step from wandering off the boundary at a corner. */
        const midLat = clat + (openNS ? 0 : cellLat * 0.5);
        const midLon = clon + (openNS ? cellLon * 0.5 : 0);
        if (isLand(mask, midLat, midLon)) put(midLat + jLat(), midLon + jLon(), 2);
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(px, 3));
    dotGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
    dotGeo.setAttribute('aTier', new THREE.Float32BufferAttribute(tiers, 1));
    dotGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1);

    const dotMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProj: { value: projScale() },
        uDot: { value: C.dot },
        uDotFade: { value: C.dotFade },
        uAccent: { value: C.accent },
        uHover,
        uHoverDir,
      },
      transparent: true,
      depthWrite: false,
      vertexShader: `
        attribute float aSeed;
        attribute float aTier;
        uniform float uTime;
        uniform float uProj;
        uniform float uHover;
        uniform vec3 uHoverDir;
        varying float vShade;
        varying float vHot;
        varying float vTier;
        void main() {
          vTier = aTier;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec3 n = normalize(normalMatrix * position);
          float facing = clamp(n.z, 0.0, 1.0);
          float key = clamp(dot(n, normalize(vec3(-0.45, 0.62, 0.75))), 0.0, 1.0);
          vShade = 0.56 + 0.44 * pow(key, 0.9);

          // Nothing animates the land at rest. vHot is driven by the pointer and by nothing
          // else, so a point only ever brightens because the cursor is on it.
          // The pool is tight rather than a wash: 0.88 is about 28 degrees of arc, 0.999 about
          // 2.5. vHot still carries both the size bump and the accent mix downstream.
          float pool = smoothstep(0.88, 0.999, dot(n, uHoverDir));
          vHot = pool * uHover * 0.8;

          // Three populations out of one attribute, every one of them small: the whole
          // surface is meant to read as a fine mesh, so a continent is a step in weight and
          // a fraction of a pixel in size, not a jump to a different kind of dot. aSeed
          // varies each one point to point so no population looks machine-printed.
          float land = clamp(aTier, 0.0, 1.0);
          float coast = clamp(aTier - 1.0, 0.0, 1.0);
          float grade = 0.62 + 0.16 * aSeed + land * 0.26 + coast * 0.26;
          // Hover thickens rather than recolours, and the field grows harder than the
          // outline does, so the pool reads as the mesh gathering rather than as a separate
          // shape arriving on top of it.
          float bump = 1.0 + vHot * (1.6 - 0.5 * coast);
          // The base was tuned when the globe was 430px wide and only land carried points.
          // At the size the hero runs it at now the same constant drew 10px dots, which is
          // what made the surface read as blobs rather than as a mesh.
          float s = 0.0019 * uProj * (0.76 + 0.38 * facing) * grade * bump;
          gl_PointSize = max(1.15, s / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 uDot;
        uniform vec3 uDotFade;
        uniform vec3 uAccent;
        varying float vShade;
        varying float vHot;
        varying float vTier;
        void main() {
          // Round, softly antialiased dot drawn at ~55% of the sprite. No texture lookup.
          vec2 d = gl_PointCoord - 0.5;
          float a = smoothstep(0.120, 0.035, dot(d, d));
          if (a < 0.02) discard;
          // On a light sphere, points away from the key light fade toward the mint rather
          // than darkening, and carry most of the depth cue in their opacity.
          vec3 col = mix(uDotFade, uDot, vShade);
          // The outline sits most of the way onto the darkest tone in the ramp at rest. That is
          // where its contrast against the land mesh comes from, rather than from a bigger dot:
          // the borders were legible up close but washed out at normal viewing distance against
          // this light hero. Hover still pushes further onto the same tone.
          float coast = clamp(vTier - 1.0, 0.0, 1.0);
          col = mix(col, uAccent, clamp(coast * 0.95 + vHot * 0.85, 0.0, 1.0));
          // Weight is what actually separates the three at a glance: the ocean field is a
          // faint speckle, land steps up out of it, and the outline is the strongest thing
          // on the sphere while still being a small dot.
          float weight = 0.30 + clamp(vTier, 0.0, 1.0) * 0.50 + coast * 1.42;
          gl_FragColor = vec4(col, a * (0.15 + 0.38 * vShade) * weight * (0.80 + 0.55 * vHot));
        }`,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    dots.renderOrder = 2;
    globe.add(dots);

    /* ------------------------------------------------------------ 4. arcs
       Every great circle packed into one LineSegments buffer. The travelling comet is
       computed per-vertex in the shader from uTime, so the geometry never changes. */
    const SEG = 72;
    const arcPos: number[] = [];
    const arcT: number[] = [];
    const arcSeed: number[] = [];
    const a3 = new THREE.Vector3();
    const b3 = new THREE.Vector3();
    const p3 = new THREE.Vector3();

    ROUTES.forEach(([fromKey, toKey], idx) => {
      const [alat, alon] = CITIES[fromKey];
      const [blat, blon] = CITIES[toKey];
      toVec3(alat, alon, 1, a3);
      toVec3(blat, blon, 1, b3);
      const omega = Math.acos(THREE.MathUtils.clamp(a3.dot(b3), -1, 1));
      const sinO = Math.sin(omega);
      const lift = 0.06 + 0.20 * (omega / Math.PI); // longer hops arc higher
      const seed = idx / ROUTES.length;

      const pts: number[] = [];
      for (let i = 0; i <= SEG; i++) {
        const t = i / SEG;
        // slerp, falling back to a plain lerp for near-coincident endpoints
        if (sinO < 1e-6) p3.copy(a3).lerp(b3, t);
        else {
          const w1 = Math.sin((1 - t) * omega) / sinO;
          const w2 = Math.sin(t * omega) / sinO;
          p3.set(a3.x * w1 + b3.x * w2, a3.y * w1 + b3.y * w2, a3.z * w1 + b3.z * w2);
        }
        p3.normalize().multiplyScalar(1 + lift * Math.sin(Math.PI * t));
        pts.push(p3.x, p3.y, p3.z);
      }
      for (let i = 0; i < SEG; i++) {
        arcPos.push(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2]);
        arcPos.push(pts[i * 3 + 3], pts[i * 3 + 4], pts[i * 3 + 5]);
        arcT.push(i / SEG, (i + 1) / SEG);
        arcSeed.push(seed, seed);
      }
    });

    const arcGeo = new THREE.BufferGeometry();
    arcGeo.setAttribute('position', new THREE.Float32BufferAttribute(arcPos, 3));
    arcGeo.setAttribute('aT', new THREE.Float32BufferAttribute(arcT, 1));
    arcGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(arcSeed, 1));

    const arcMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uAccent: { value: C.accent }, uHalo: { value: C.halo } },
      transparent: true,
      depthWrite: false,
      vertexShader: `
        attribute float aT;
        attribute float aSeed;
        uniform float uTime;
        varying float vA;
        void main() {
          // Head sweeps 0 -> 1 along the arc; the segment behind it fades out as a tail.
          float head = fract(uTime * 0.115 + aSeed);
          float d = head - aT;
          float comet = step(0.0, d) * smoothstep(0.34, 0.0, d);
          // Ease the whole arc in and out across its cycle so nothing pops.
          float cycle = smoothstep(0.0, 0.12, head) * smoothstep(1.0, 0.82, head);
          vA = comet * cycle;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uAccent;
        uniform vec3 uHalo;
        varying float vA;
        void main() {
          if (vA < 0.012) discard;
          gl_FragColor = vec4(mix(uHalo, uAccent, vA), vA * 0.62);
        }`,
    });
    const arcs = new THREE.LineSegments(arcGeo, arcMat);
    arcs.renderOrder = 3;
    globe.add(arcs);

    /* --------------------------------------------------------- 5. markers */
    const mKeys = Array.from(new Set(ROUTES.flat())) as (keyof typeof CITIES)[];
    const mPos: number[] = [];
    const mSeed: number[] = [];
    mKeys.forEach((k, i) => {
      const [lat, lon] = CITIES[k];
      toVec3(lat, lon, 1.006, p3);
      mPos.push(p3.x, p3.y, p3.z);
      mSeed.push(i / mKeys.length);
    });
    const markGeo = new THREE.BufferGeometry();
    markGeo.setAttribute('position', new THREE.Float32BufferAttribute(mPos, 3));
    markGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(mSeed, 1));
    const markMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProj: { value: projScale() },
        uAccent: { value: C.accent },
      },
      transparent: true,
      depthWrite: false,
      vertexShader: `
        attribute float aSeed;
        uniform float uTime;
        uniform float uProj;
        varying float vPulse;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vPulse = 0.5 + 0.5 * sin(uTime * 1.5 + aSeed * 6.2831);
          float s = 0.045 * uProj * (0.72 + 0.28 * vPulse);
          gl_PointSize = max(2.0, s / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 uAccent;
        varying float vPulse;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          float core = smoothstep(0.32, 0.10, r);
          float ring = smoothstep(0.95, 0.62, r) * smoothstep(0.42, 0.66, r);
          float a = (core * 0.95 + ring * (0.20 + 0.30 * vPulse)) * 0.72;
          if (a < 0.02) discard;
          gl_FragColor = vec4(uAccent, a);
        }`,
    });
    const markers = new THREE.Points(markGeo, markMat);
    markers.renderOrder = 4;
    globe.add(markers);

    /* ---------------------------------------------------------- interaction
       Hover only: the globe used to also accept a click-and-drag to spin it by hand, and that
       manual control is gone (mouse and touch both). Auto-spin and idle motion live in draw()
       below and run unconditionally now.

       onDown here is not a drag handler; it does nothing but preventDefault, and only for a
       mouse. Removing the old drag listeners outright (no pointerdown/pointermove capture, no
       preventDefault at all) was tried first and reintroduced a worse problem than the one it
       fixed: this canvas is a huge point cloud sized well past the viewport on every side (see
       maxSize/globeSize above), and with nothing suppressing the browser's own default action on
       a mousedown-then-move over it, Chromium's native "drag near/past an edge auto-scrolls the
       page" behaviour took over - a plain horizontal mouse drag on the globe was measured
       jumping window.scrollY by thousands of pixels. A bare preventDefault on pointerdown, the
       same guard real drag controls (three.js's own OrbitControls included) use for exactly this
       class of browser interference, stops that native gesture from ever starting, without
       reintroducing any rotation control of its own.

       Scoped to pointerType === 'mouse' specifically: preventDefault on a touch pointerdown
       does not just block this drag-to-autoscroll quirk, it can suppress the browser's native
       touch-scroll gesture for any swipe that happens to start on the globe, which is exactly
       the "touch handler fights the user's scroll" failure this whole task is about avoiding.
       Touch never had the auto-scroll problem in the first place (there is no click-drag text
       selection to accidentally trigger), so it is left completely alone here. */
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.cancelable) e.preventDefault();
    };

    const canHover =
      typeof window.matchMedia !== 'function' || window.matchMedia('(hover: hover)').matches;
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const unit = new THREE.Sphere(new THREE.Vector3(), 1);
    const hitPt = new THREE.Vector3();

    const onHoverMove = (e: PointerEvent) => {
      if (!canHover) return;
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.ray.intersectSphere(unit, hitPt);
      if (hit) {
        hover.current.aim.copy(hit).normalize();
        hover.current.target = 1;
      } else {
        hover.current.target = 0;
      }
      if (reduceMotion) draw(0);
    };
    const onHoverLeave = () => { hover.current.target = 0; };

    canvas.addEventListener('pointerdown', onDown, { passive: false });
    canvas.addEventListener('pointermove', onHoverMove, { passive: true });
    canvas.addEventListener('pointerleave', onHoverLeave);

    /* Re-fit on any box or DPR change, without rebuilding the point cloud. */
    const applySize = () => {
      const w = Math.max(1, Math.round(host.clientWidth));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      if (w === boxPx && dpr === renderer.getPixelRatio()) return;
      boxPx = w;
      renderer.setPixelRatio(dpr);
      renderer.setSize(boxPx, boxPx, false);
      const proj = projScale();
      dotMat.uniforms.uProj.value = proj;
      markMat.uniforms.uProj.value = proj;
      if (reduceMotion) draw(0);
    };
    const ro = new ResizeObserver(applySize);
    ro.observe(host);

    /* Skip work entirely while scrolled away or on a hidden tab. */
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(host);
    const onVis = () => {
      visible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVis);

    /* ----------------------------------------------------------- the loop */
    let raf = 0;
    let last = performance.now();
    let clock = 0;

    function draw(dt: number) {
      const r = rot.current;
      // Automatic idle spin, unconditional now that there is no drag to hold it off.
      if (!reduceMotion) r.y += dt * 0.045;
      globe.rotation.x = r.x;
      globe.rotation.y = r.y;

      // Ease into and out of the hover state, and slide the highlight toward the pointer
      // rather than teleporting it. Frame-rate independent, so a 120Hz display and a 60Hz one
      // reach the same place in the same wall-clock time.
      const h = hover.current;
      const ease = reduceMotion ? 1 : 1 - Math.pow(0.0015, Math.min(dt, 0.05));
      h.k += (h.target - h.k) * ease;
      h.dir.lerp(h.aim, ease).normalize();
      uHover.value = h.k;

      dotMat.uniforms.uTime.value = clock;
      arcMat.uniforms.uTime.value = clock;
      markMat.uniforms.uTime.value = clock;
      renderer.render(scene, camera);
    }

    let contextLost = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (contextLost) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible.current) return;
      clock += dt;
      draw(dt);
    };

    if (reduceMotion) {
      // Static frame: no idle spin, no arc animation. Drag still redraws on demand.
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    /* ------------------------------------------------------- context loss
       A lost context stops rendering cleanly instead of throwing into a blank or frozen
       canvas: the loop simply skips its draw call until (and unless) the context comes back.
       Restoring is not just a matter of resuming the loop -- every GPU-side buffer, texture
       and program the context held is gone, and three.js's own object cache does not know to
       re-upload them, so a bare resume renders nothing forever after. Tearing this mount down
       and building a fresh one re-issues every buffer from scratch, which is what actually gets
       the sphere back. If it keeps dropping rather than recovering -- a real failure mode on
       some low-memory mobile GPUs under tab/app-switch pressure -- the third loss gives up on
       WebGL for good and swaps in the static fallback sphere instead of rebuilding in a loop. */
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

    /* -------------------------------------------------------------- teardown */
    teardown = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onHoverMove);
      canvas.removeEventListener('pointerleave', onHoverLeave);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      [bodyGeo, dotGeo, arcGeo, markGeo].forEach((g) => g.dispose());
      [bodyMat, dotMat, arcMat, markMat].forEach((m) => m.dispose());
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
      // Built once per sample budget. Size changes are handled by the ResizeObserver above,
      // so resizing never re-runs the land masking or reallocates the buffers.
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
  }, [samples, particles]);

  if (failed) {
    // Same box the canvas would have filled, so the hero's layout never shifts: a soft
    // gradient sphere in the globe's own resting palette instead of an empty hole.
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          width: '100%',
          maxWidth: maxSize,
          aspectRatio: '1 / 1',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '50%',
          background: `radial-gradient(circle at 38% 32%, ${C.oceanLit.getStyle()} 0%, ${C.ocean.getStyle()} 68%, ${C.dotFade.getStyle()} 100%)`,
        }}
      />
    );
  }

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', maxWidth: maxSize, aspectRatio: '1 / 1', margin: '0 auto', position: 'relative' }}
    />
  );
}
