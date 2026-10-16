'use client';

/**
 * App promo: the Fermor product advertisement on the left half, the Fermor mark as a real
 * extruded solid on the right half, split exactly down the middle on desktop.
 *
 * The advertisement is built from ordinary elements, not a picture of an advertisement, so its
 * type is selectable, its buttons are real links, and it reflows instead of squashing. It has
 * no panel of its own: both halves sit on the page's white, so the split reads as one section
 * rather than as two pages joined at a seam.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { onScrollFrame, requestScrollFrame } from './scrollScheduler';
import * as THREE from 'three';

const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

/** The page’s single accent. The 3D mark is one of the places green is kept on purpose. */
const LOGO_GREEN = '#75FB90';
const DG = '#1F2225';
const INK = '#101214';
const INK2 = '#5B6065';
/** The existing brand purple (same token as UnifyShowcase's "Plan" tint and DeepRecaps' gradient
    panel), reused here for the heading and supporting text instead of introducing a new purple.
    (Previously this drove the curtain's own field colour, with the text green; both are now
    swapped - see the reveal's doc comment below.) */
const TEXT_PURPLE = '#9E79FF';
/** The uploaded curtain-reveal background, copied byte-for-byte into public/ so it can be
    referenced as a CSS background-image without re-encoding or otherwise altering it. */
const CURTAIN_BG_IMAGE = '/images/app-promo/curtain-reveal-bg.png';

/* ------------------------------------------------------------ logo shape */

/**
 * One arm of the Fermor mark, traced off the supplied logo and normalised so the whole mark
 * spans x in [-1, 1].
 *
 * The mark is a single constant-width stroke, two horizontal arms joined by a diagonal, with
 * both free ends cut parallel to that diagonal. The second arm is not a copy sitting lower
 * down: it is this one turned through half a circle, which is why the long arm is top right on
 * one and bottom left on the other.
 */
const ARM: [number, number][] = [
  [0.9526, 0.7447],
  [0.7342, 0.4684],
  [0.1684, 0.4684],
  [-0.2895, -0.1132],
  [-1.0, -0.1132],
  [-0.7868, 0.1579],
  [-0.4342, 0.1579],
  [0.0289, 0.7447],
];

/* ------------------------------------------------------------- 3D logo */

function FermorMark3D() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);
  /* The click sequence lives entirely in the render loop, so React only ever flips this flag.
     `on` is read every frame; `t` is the seconds elapsed since the click. A second click while
     one is already running is ignored rather than restarting it half way. */
  const burstRef = useRef<{ on: boolean; t: number }>({ on: false, t: 0 });
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  const fireBurst = () => {
    if (burstRef.current.on) return;
    burstRef.current = { on: true, t: 0 };
    setBursting(true);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    host.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const shape = new THREE.Shape();
    shape.moveTo(ARM[0][0], ARM[0][1]);
    for (let i = 1; i < ARM.length; i++) shape.lineTo(ARM[i][0], ARM[i][1]);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.022,
      bevelSegments: 3,
      curveSegments: 1,
    });
    // Only the extrusion is recentred, never the outline: the second arm is this one turned a
    // half circle about the origin of the traced coordinates, so moving the shape off that
    // origin would put the two arms in the wrong place relative to each other.
    geo.translate(0, 0, -(0.3 + 0.022 * 2) / 2);

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(LOGO_GREEN),
      roughness: 0.38,
      metalness: 0.08,
      emissive: new THREE.Color(LOGO_GREEN),
      emissiveIntensity: 0,
    });

    /**
     * The hover wave.
     *
     * A light band that travels across the solid on a diagonal, patched into the standard
     * material's own fragment shader rather than layered over the canvas. That is the whole
     * point of doing it here: the band is evaluated per fragment in the mark's own object
     * space, so it climbs the extruded side faces and catches the bevel at a different moment
     * from the front face, and the second, tighter crest is weighted toward grazing angles so
     * the edges light before the flats do. A CSS glow or a box-shadow cannot know where the
     * geometry is and would sit in front of the shape as a halo.
     *
     * uWave is the crest's position along that diagonal; uAmp is how much of the effect is
     * showing at all, and it is zero at rest, so an unhovered mark renders exactly as before.
     */
    const uWave = { value: -1.6 };
    const uAmp = { value: 0 };
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uWave = uWave;
      shader.uniforms.uAmp = uAmp;
      shader.vertexShader =
        'varying vec3 vMarkPos;\n' +
        shader.vertexShader.replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\n  vMarkPos = position;'
        );
      shader.fragmentShader =
        'uniform float uWave;\nuniform float uAmp;\nvarying vec3 vMarkPos;\n' +
        shader.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          [
            '#include <emissivemap_fragment>',
            '{',
            // Distance along the diagonal the wave runs on, depth folded in so the crest
            // reaches the front face and the side walls at slightly different times.
            '  float d = vMarkPos.x * 0.74 + vMarkPos.y * 0.67 + vMarkPos.z * 0.35;',
            '  float t = d - uWave;',
            '  float body = smoothstep(0.55, 0.0, abs(t));',
            '  float crest = smoothstep(0.13, 0.0, abs(t));',
            // Grazing angles, so the bevel and the extruded sides take the light first.
            '  float graze = pow(1.0 - abs(normal.z), 2.0);',
            '  float w = body * 0.10 + crest * (0.16 + graze * 0.42);',
            '  totalEmissiveRadiance += uAmp * w * vec3(0.58, 1.0, 0.80);',
            '}',
          ].join('\n')
        );
    };

    // Two meshes, one geometry. The second is the first turned half a circle about its own
    // normal, which is exactly the relationship the two arms have in the supplied mark.
    const group = new THREE.Group();
    const upper = new THREE.Mesh(geo, mat);
    const lower = new THREE.Mesh(geo, mat);
    lower.rotation.z = Math.PI;
    group.add(upper, lower);

    // Fixed pose. The mark never moves; this is only the angle it is built at, chosen so the
    // extruded side faces read and it is legible as the logo at the same time.
    group.rotation.set(0.2, -0.42, 0);
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(-2.4, 3.2, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdff3e8, 0.7);
    fill.position.set(3, -1.6, 2.4);
    scene.add(fill);
    // The rim is the light that comes up on hover: parked low, it does nothing at rest.
    const rim = new THREE.PointLight(new THREE.Color(LOGO_GREEN), 0, 12, 2);
    rim.position.set(1.8, 1.6, 2.2);
    scene.add(rim);

    /* ------------------------------------------------------------ energy burst
       The click sequence, in one timeline of seconds: the mark spins up and accelerates, folds
       into a compact spinning energy ball, the ball contracts, blows out as a green wave, the
       wave spends itself and the mark grows back into exactly the pose it left. Everything
       below is built once, parked invisible, and costs nothing until the mark is clicked. */
    const T_SPIN = 1.45; // spin-up ends, the fold begins
    const T_BALL = 2.05; // the mark is gone, the ball is whole
    const T_TIGHT = 2.45; // the ball has finished contracting
    const T_WAVE = 3.35; // the wave has spent itself
    const T_END = 4.2; // the mark is fully back

    const GREEN = new THREE.Color(LOGO_GREEN);
    const orb = new THREE.Group();
    orb.visible = false;
    scene.add(orb);
    // Faceted rather than smooth: a sphere spinning at speed reads as still unless the light
    // has edges to break on.
    const orbGeo = new THREE.IcosahedronGeometry(0.34, 1);
    const orbMat = new THREE.MeshStandardMaterial({
      color: GREEN,
      emissive: GREEN,
      emissiveIntensity: 1.6,
      roughness: 0.24,
      metalness: 0,
      flatShading: true,
    });
    const haloGeo = new THREE.SphereGeometry(0.52, 24, 18);
    const haloMat = new THREE.MeshBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    orb.add(new THREE.Mesh(orbGeo, orbMat), new THREE.Mesh(haloGeo, haloMat));

    // Two rings on the same expansion, offset in time, plus a shell that carries the volume
    // between them. A single ring reads as a hoop; three staggered fronts read as a wave.
    const ringGeo = new THREE.RingGeometry(0.88, 1, 96);
    const ringMats = [0, 1].map(
      () =>
        new THREE.MeshBasicMaterial({
          color: GREEN,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
    );
    const rings = ringMats.map((m) => {
      const mesh = new THREE.Mesh(ringGeo, m);
      mesh.visible = false;
      scene.add(mesh);
      return mesh;
    });
    const shellGeo = new THREE.SphereGeometry(1, 32, 24);
    const shellMat = new THREE.MeshBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.visible = false;
    scene.add(shell);

    const BASE_RY = group.rotation.y;
    const easeIn = (p: number) => p * p * p;
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
    const span = (t: number, a: number, b: number) =>
      Math.min(1, Math.max(0, (t - a) / (b - a)));

    /** One frame of the click sequence. Returns false once it has put everything back. */
    let spinAngle = 0;
    let burstFlash = 0;
    const stepBurst = (dt: number): boolean => {
      const b = burstRef.current;
      if (!b.on) return false;
      b.t += dt;
      const t = b.t;
      burstFlash = 0;

      if (t < T_BALL) {
        // Spin-up, straight through the fold: the acceleration never breaks, so the ball is
        // already turning at full speed by the time it is whole.
        const p = Math.min(1, t / T_SPIN);
        spinAngle += (0.6 + 34 * p * p * p) * dt;
        group.rotation.y = BASE_RY + spinAngle;
        const fold = span(t, T_SPIN, T_BALL);
        group.scale.setScalar(Math.max(0.0001, 1 - easeIn(fold)));
        group.visible = fold < 1;
        orb.visible = fold > 0;
        orb.rotation.y = spinAngle * 1.6;
        orb.rotation.x = spinAngle * 0.7;
        orb.scale.setScalar(0.35 + 0.65 * easeOut(fold));
        orbMat.emissiveIntensity = 1.2 + 0.9 * fold;
        haloMat.opacity = 0.14 + 0.2 * fold;
        burstFlash = 1.4 * fold;
      } else if (t < T_TIGHT) {
        // Contraction. The ball tightens and brightens as it goes, so the blow-out reads as
        // stored energy rather than as a shape that simply vanished. The mark is put away
        // explicitly here: the fold above only ever eases its scale toward zero, and a frame
        // that lands just short of the boundary would otherwise leave a speck of it behind the
        // ball for the rest of the sequence.
        group.visible = false;
        const p = span(t, T_BALL, T_TIGHT);
        spinAngle += (34 + 26 * p) * dt;
        orb.rotation.y = spinAngle * 1.6;
        orb.rotation.x = spinAngle * 0.7;
        orb.scale.setScalar(1 - 0.62 * easeIn(p + 0.15));
        orbMat.emissiveIntensity = 2.1 + 2.6 * p;
        haloMat.opacity = 0.34 + 0.3 * p;
        burstFlash = 1.4 + 2.6 * p;
      } else if (t < T_WAVE) {
        // The wave. The ball is spent inside the first fifth of it and the fronts carry on out.
        group.visible = false;
        const p = span(t, T_TIGHT, T_WAVE);
        const pop = Math.min(1, p / 0.18);
        orb.visible = pop < 1;
        orb.scale.setScalar(Math.max(0.0001, 0.38 * (1 - pop)));
        orbMat.emissiveIntensity = 4.7 * (1 - pop);
        haloMat.opacity = 0.64 * (1 - pop);
        rings.forEach((mesh, i) => {
          const rp = span(p, i * 0.16, 1);
          mesh.visible = rp > 0 && rp < 1;
          mesh.scale.setScalar(0.12 + easeOut(rp) * 2.05);
          ringMats[i].opacity = Math.sin(Math.min(1, rp) * Math.PI) * (i ? 0.3 : 0.55);
        });
        shell.visible = p < 0.8;
        shell.scale.setScalar(0.1 + easeOut(p) * 1.5);
        shellMat.opacity = Math.max(0, 0.34 * (1 - p / 0.8));
        burstFlash = 4 * (1 - p);
      } else if (t < T_END) {
        // Restore. The mark comes back at the pose it was built at, not at whatever angle the
        // spin stopped on, and it is at zero scale when that is set, so nothing snaps.
        const p = span(t, T_WAVE, T_END);
        rings.forEach((mesh, i) => {
          mesh.visible = false;
          ringMats[i].opacity = 0;
        });
        shell.visible = false;
        shellMat.opacity = 0;
        orb.visible = false;
        spinAngle = 0;
        group.rotation.y = BASE_RY;
        group.visible = true;
        group.scale.setScalar(easeOut(p));
        burstFlash = 1.1 * (1 - p);
      } else {
        b.on = false;
        b.t = 0;
        spinAngle = 0;
        burstFlash = 0;
        group.visible = true;
        group.rotation.y = BASE_RY;
        group.scale.setScalar(1);
        orb.visible = false;
        orbMat.emissiveIntensity = 1.6;
        haloMat.opacity = 0.3;
        rings.forEach((mesh, i) => {
          mesh.visible = false;
          ringMats[i].opacity = 0;
        });
        shell.visible = false;
        shellMat.opacity = 0;
        return false;
      }
      return true;
    };

    // Fit the rotated mark to the box, once, with a margin. Nothing here runs per frame.
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    let dirty = true;

    const applySize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      const vFov = (camera.fov * Math.PI) / 180;
      const distH = size.y / 2 / Math.tan(vFov / 2);
      const distW = size.x / 2 / Math.tan(vFov / 2) / camera.aspect;
      camera.position.set(0, 0, Math.max(distH, distW) * 0.99 + size.z / 2);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      dirty = true;
    };
    applySize();
    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The wave sweeps only while the pointer is on the mark, and the mark itself never moves:
    // nothing here touches group.rotation or group.position. With the pointer away and the
    // amplitude settled at zero the loop renders nothing at all, so an idle logo is a still
    // image that costs a still image.
    //
    // A visitor who has asked for reduced motion gets the same light without the travel: the
    // crest is parked across the middle of the mark and only its amplitude eases in and out.
    const SWEEP_FROM = -1.6;
    const SWEEP_TO = 1.6;
    const SWEEP_SEC = 1.9;
    let glow = 0;
    let phase = 0;
    let last = 0;
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const target = hoverRef.current ? 1 : 0;
      if (Math.abs(target - glow) > 0.001) {
        glow += (target - glow) * 0.09;
        dirty = true;
      } else if (glow !== target) {
        glow = target;
        dirty = true;
      }

      if (!reduceMotion && glow > 0.002) {
        phase = (phase + dt / SWEEP_SEC) % 1;
        uWave.value = SWEEP_FROM + (SWEEP_TO - SWEEP_FROM) * phase;
        dirty = true;
      } else if (reduceMotion) {
        uWave.value = 0;
      }
      // Reset the crest off the near edge once it has faded out, so the next hover always
      // starts the wave from the same side rather than from wherever it stopped.
      if (glow === 0 && phase !== 0) {
        phase = 0;
        uWave.value = SWEEP_FROM;
        dirty = true;
      }

      // The click sequence drives its own frames for as long as it lasts.
      if (burstRef.current.on) {
        const running = stepBurst(dt);
        dirty = true;
        if (!running) setBursting(false);
      }

      if (!dirty) return;
      uAmp.value = glow;
      mat.roughness = 0.38 - glow * 0.08;
      rim.intensity = glow * 3.2 + burstFlash;
      key.intensity = 2.1 + glow * 0.3;
      renderer.render(scene, camera);
      dirty = false;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      ringGeo.dispose();
      ringMats.forEach(m => m.dispose());
      shellGeo.dispose();
      shellMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={fireBurst}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fireBurst();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Fermor mark. Activate to play its energy animation."
      style={{ position: 'relative', width: '100%', maxWidth: 780, aspectRatio: '4 / 3', cursor: 'pointer', outlineOffset: 6 }}
    >
      {/* Contact shadow. Two ellipses on the surface under the mark, one tight and one wide, so
          the solid reads as sitting on the page rather than floating in front of it. It is a
          painted shadow rather than a shadow map: the mark's pose never changes, and a map
          would cost a second render pass on every frame for a shape that does not move. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '11%',
          width: '46%',
          height: '9%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(17,20,24,.22) 0%, rgba(17,20,24,.10) 52%, rgba(17,20,24,0) 100%)',
          filter: 'blur(16px)',
          opacity: bursting ? 0.25 : 1,
          transition: 'opacity .45s ease',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '6%',
          width: '72%',
          height: '16%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(17,20,24,.10) 0%, rgba(17,20,24,0) 100%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />
      {/* A trace of spill on the surface behind the object, kept deliberately faint: the
          interaction is meant to happen on the solid, not as a halo around it. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(117,251,144,${bursting ? 0.3 : hover ? 0.12 : 0}) 0%, rgba(117,251,144,0) 66%)`,
          filter: 'blur(22px)',
          transition: 'background .6s ease',
          pointerEvents: 'none',
        }}
      />
      <div ref={hostRef} style={{ position: 'relative', width: '100%', height: '100%' }} />
    </div>
  );
}

/* ------------------------------------------------------------ store logos */

function PlayGlyph() {
  return (
    <svg width="21" height="23" viewBox="0 0 24 26" aria-hidden="true">
      <path d="M1.6 1.2 13.4 13 1.6 24.8A2.1 2.1 0 0 1 1 23.3V2.7c0-.6.2-1.1.6-1.5Z" fill="#00D0FF" />
      <path d="M1.6 1.2 13.4 13l3.4-3.4L4.2.6C3.3.1 2.3.4 1.6 1.2Z" fill="#00F076" />
      <path d="M1.6 24.8 13.4 13l3.4 3.4L4.2 25.4c-.9.5-1.9.2-2.6-.6Z" fill="#FF3A44" />
      <path d="m16.8 9.6 4.6 2.6c1 .6 1 1.9 0 2.5l-4.6 2.7L13.4 13Z" fill="#FFC900" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg width="21" height="24" viewBox="0 0 22 26" fill="#fff" aria-hidden="true">
      <path d="M15.9 13.8c0-2.6 2.1-3.9 2.2-4-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5.6-.9 1-1.8 1.2-2.4-2.6-1-2.5-3.9-2.5-4.4ZM13.4 4.6c.7-.9 1.2-2.1 1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3.1-1.5Z" />
    </svg>
  );
}

/* --------------------------------------------------------------- section */

export default function AppPromo() {
  const revealRef = useRef<HTMLElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(1200);
  useEffect(() => {
    const read = () => setW(window.innerWidth);
    read();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const stack = w < 980;
  const mobile = w < 620;

  const features: [React.ReactNode, string, string][] = [
    [
      <svg key="a" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DG} strokeWidth="1.9" strokeLinecap="round">
        <path d="M4 20V14M10 20V9M16 20V4" />
      </svg>,
      'Smarter',
      'Decisions',
    ],
    [
      <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DG} strokeWidth="1.7" strokeLinejoin="round">
        <path d="M12 3 20 6v6c0 4.4-3.3 8-8 9-4.7-1-8-4.6-8-9V6l8-3Z" />
      </svg>,
      'Secure &',
      'Private',
    ],
    [
      <svg key="c" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DG} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21c0-6 3-10 9-11" />
        <path d="M20 5c0 6-3.6 9.5-8 9.5-1.6 0-2.8-.6-2.8-2.4C9.2 8.4 13.6 5.4 20 5Z" />
      </svg>,
      'A Brighter',
      'Financial Future',
    ],
  ];

  /* The reveal: a sheet carrying the uploaded background image, with a bold centred peak,
     lifted up through a green field. One number drives everything. `Y` is where the sheet is,
     in vh, and it is used three times: to move the sheet, to move the copy that is clipped
     inside it by exactly the opposite amount, and for nothing else. There is no second
     animation to keep in step, which is why the boundary through the letters can never drift
     out of register with the boundary through the background: they are the same edge.

     Neither copy's own colour ever animates - the base copy is painted once, white, over the
     green field; an identical copy lives inside the sheet, painted once, purple, over the
     revealed image. The sheet's clip-path cuts that inner copy exactly where it cuts the image,
     and a counter-translate of -Y cancels the sheet's own +Y so that copy never moves a pixel
     relative to the base one underneath it. What the eye reads is one heading whose colour
     switches from white to purple along the same diagonal edge that reveals the background,
     because the edge is the boundary between the two static-coloured copies, not a transition
     painted on either of them.

     Nothing measures layout during a scroll. The section's document position and height are
     read once, and again on resize; every frame after that is arithmetic on the scrollY the
     scheduler has already read, then three transform writes. Nothing here touches React state,
     preventDefault, or the scroll position itself, so the page scrolls through the section
     exactly as it would if this effect were not here. */
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Sheet geometry in vh, matching the clip-path below. START puts the apex just under the
       fold; END lifts the shoulders clear of the top, which is the first moment the viewport is
       entirely white. The peak is therefore on screen for the whole of the sweep rather than
       for a fraction of it. */
    const START = 104;
    const END = -60;
    /* How much of the section's scroll the sweep owns; the rest is the settled white state.
       At this section height that works out at roughly one pixel of sheet per pixel of scroll,
       which is what makes it feel like the sheet is being pulled by hand. */
    /* The sweep owns the section's whole travel. It used to stop at 0.8, which left a
       stretch of pinned, finished, motionless white at the end: that was the "page is waiting
       for the curtain" feeling. Now the curtain finishes exactly as the section finishes
       passing, and the next section follows immediately. */
    const REVEAL_END = 1;

    /* --- the phone-sized variant of the same sweep, overlapped with the FAQ ---
       Measured on a 390x844 phone before changing anything: the section is 1097px tall, the
       stage is pinned for 253px of that, and the sheet's shoulders cleared the top of the
       viewport 15px into the pin. So the reveal was finished before the pinned stretch had
       really begun, and what followed was a pinned, then a scrolling, viewport of settled white
       before the footer's FAQ reached the top: about 1.3 viewports of a finished picture.

       Two numbers fix that, and neither of them is the section's height (shortening the section
       would just cut scroll out of the page) or the scroll position (nothing here touches it).

       TAIL_M stretches the sweep's window past the end of the section, so that the reveal is
       80% done at the exact scroll offset where the section stops being pinned and the footer
       starts entering the viewport. The remaining 20% therefore plays out while the FAQ rises -
       the overlap - instead of after it.

       END_M then re-aims the sweep so 80% is the moment it finishes: the shoulders reach the top
       of the viewport at e = 0.8 rather than at e = 0.735, which is where this END puts them.
       Solved, not guessed: shoulderY(e) = START + (END - START) e + 1.64 (SH_MIN + (SH_MAX -
       SH_MIN)(1 - e)^1.1), and shoulderY(0.8) = 0 gives END = -43.4vh.

       The desktop composition keeps its own numbers untouched. */
    const END_M = -43.4;
    const TAIL_M = 0.8;
    const narrow =
      typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 759px)') : null;
    /* Shoulder range, in percent of the sheet's height. Held high early so the angle reads,
       then flattening toward almost horizontal as the sheet clears. */
    const SH_MAX = 40;
    const SH_MIN = 2;

    /* One rect read per frame, deliberately, and it is the first thing the callback does.

       This started out cached, measured once at mount. That was the bug behind every symptom
       here: the hero above is GSAP-pinned with pinSpacing, and that spacer is inserted after
       this effect has already run, so the position measured at mount was thousands of pixels
       off. Progress clamped to 1 at every real scroll offset, which parked the sheet at its end
       position and rendered the section solid white: the "blank" section. It only came back
       after a zoom because zoom fires resize, which was the one path that re-measured.

       Invalidating the cache from a ResizeObserver was tried next and is not enough either. The
       document height genuinely moves during a scroll through this page (measured: 12707 ->
       12598 -> 12978 as ScrollTrigger re-lays the pin), and an observer only corrects the cache
       after the fact, so the sweep jumped by 500px at each correction. Reading the section's own
       rect makes the coordinate system exact at every offset instead of eventually.

       This is one getBoundingClientRect on one element, taken before any write in this callback,
       which is a different thing from the read/write interleaving that caused the original
       stutter. Everything else is unchanged: no state, no listener of its own, transforms only. */
    let applied = -1;
    let shApplied = -1;
    let yApplied = Infinity;
    const stop = onScrollFrame(({ vh }) => {
      const el = revealRef.current;
      const curtain = curtainRef.current;
      const inner = innerRef.current;
      if (!el || !curtain || !inner) return;

      const rect = el.getBoundingClientRect();
      const height = rect.height;
      // Zero height means the section is not laid out yet. Hold the un-revealed CSS state
      // rather than dividing by a guess.
      if (height <= 0) return;
      const rectTop = rect.top;
      const travel = Math.max(1, height - vh);
      /* Progress is a pure function of the current scroll offset and the section's measured
         box: no accumulation, no dependence on the previous frame. A reload at any offset, or
         a jump of any size, lands on exactly the state that offset implies.

         Nothing in this callback positions the stage any more - it is position: sticky and the
         browser holds it. This read drives the curtain only, and the curtain lives inside the
         stage, so none of what it writes can feed back into the geometry this progress is
         measured from. */
      const phone = !!narrow && narrow.matches;
      /* The window the sweep is measured over. On a phone it runs 1/0.8 of the section's own
         pass, which is what puts 80% of the sweep at the section's last pinned frame and leaves
         the last 20% to play over the footer's entrance. Reading a MediaQueryList's `matches` is
         a cached boolean, not a layout read, so this costs nothing per frame. */
      const span = phone ? (vh + travel) / TAIL_M : vh + travel;
      const end = phone ? END_M : END;
      const p = Math.min(1, Math.max(0, (vh - rectTop) / span));

      if (Math.abs(p - applied) < 0.0006) return;
      applied = p;
      /* Linear. The sweep is meant to feel like the sheet is attached to the scroll, and any
         easing here would make it lead or lag the gesture. Monotonic and clamped, so scrolling
         back up runs it backwards exactly and a large jump lands on the right frame. */
      const eRaw = reduce ? 1 : Math.min(1, p / REVEAL_END);
      /* Frozen at TAIL_M on phone, not left running to 1. TAIL_M (0.8) is not an arbitrary cutoff
         here - it is, by construction (see the doc comment above: shoulderY(0.8) = 0), the exact
         progress value at which the sheet has ALREADY finished covering the viewport on a phone.
         Everything from e = 0.8 to e = 1 is the sheet continuing to translate after it has
         nothing left to visually reveal, and TAIL_M's own job is to make that stretch land after
         the section has un-pinned and the footer is already rising - which is exactly what showed
         up as "the revealed background keeps sliding after the curtain is done": real, continued
         transform writes to an image the user can already see is finished. Clamping the eased
         value here (not TAIL_M or END_M themselves, and not REVEAL_END) leaves the entire 0-to-
         "visually complete" reveal - its timing, its easing, its geometry - untouched; it only
         stops the sheet from being nudged further once there is nothing left for it to reveal.
         Desktop is unaffected: END is already tuned so the shoulder clears the top exactly at
         e = 1, which is also exactly natural unpin, so this clamp never engages for it. */
      const e = phone ? Math.min(eRaw, TAIL_M) : eRaw;
      /* Negated as a number, not by prefixing a minus onto the string: yv goes negative
         halfway through the sweep, and `-${yv}` then produced "--14.34vh", which is not a
         length at all. The declaration was dropped, the green copy stopped tracking the sheet,
         and the two headings drifted apart by up to 550px. */
      const yNum = START + (end - START) * e;
      // e (and so yNum) can now stay flat for a stretch of frames during the frozen phone tail
      // while p keeps advancing underneath it - guarded the same way shApplied guards sh just
      // below, so that stretch costs a comparison instead of a redundant identical style write.
      if (Math.abs(yNum - yApplied) >= 0.01) {
        yApplied = yNum;
        curtain.style.transform = `translate3d(0, ${yNum.toFixed(2)}vh, 0)`;
        inner.style.transform = `translate3d(0, ${(-yNum).toFixed(2)}vh, 0)`;
      }
      /* Lifted and flattened at once. The exponent holds the angle open through the early and
         middle part of the pass and spends the flattening late, which is the order the shape is
         meant to read in. Quantised to a quarter of a percent: below that the edge does not
         move a pixel, and this is the one write that re-rasterises the clip. */
      const sh = SH_MIN + (SH_MAX - SH_MIN) * Math.pow(1 - e, 1.1);
      if (Math.abs(sh - shApplied) >= 0.25) {
        shApplied = sh;
        curtain.style.setProperty('--fap-sh', `${sh.toFixed(2)}%`);
      }
    });

    /* Crossing the breakpoint changes both the window and the aim, and the frame short-circuits
       on an unchanged progress value, so the cached one has to be dropped or a rotation would
       hold the old composition until the next scroll of any size. */
    const onBreakpoint = () => {
      applied = -1;
      shApplied = -1;
      yApplied = Infinity;
      requestScrollFrame();
    };
    narrow?.addEventListener('change', onBreakpoint);

    return () => {
      stop();
      narrow?.removeEventListener('change', onBreakpoint);
    };
  }, []);

  const storeBtn = (glyph: React.ReactNode, small: string, big: string, inert = false) => (
    <Link
      href="/signup"
      target="_blank"
      rel="noopener noreferrer"
      className="fap-store"
      tabIndex={inert ? -1 : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 11,
        background: '#16181A',
        color: '#fff',
        borderRadius: 11,
        padding: '10px 18px 11px',
        textDecoration: 'none',
        transition: 'transform .2s ease, box-shadow .2s ease',
      }}
    >
      {glyph}
      <span style={{ display: 'block', lineHeight: 1.1 }}>
        <span style={{ display: 'block', fontFamily: INTER, fontSize: 11, fontWeight: 500, opacity: 0.85 }}>{small}</span>
        <span style={{ display: 'block', fontFamily: POPPINS, fontSize: 16.5, fontWeight: 600, marginTop: 2 }}>{big}</span>
      </span>
    </Link>
  );

  /* Rendered twice, identically. The second copy is the one inside the sheet, so it has to lay
     out to exactly the same box: same markup, same classes, same buttons, with the buttons only
     made invisible rather than removed. Anything that changed the box would show up as the two
     headings drifting apart along the cut. The "green" flag below picks the right box (base vs.
     clipped-inside-the-curtain), keeps the CTA buttons inert in the copy nobody can click, and
     now also picks the colour: the base copy is white (over the still-green field), the
     `fap-body-green` copy is purple (`.fap-body-green .fap-h`/`.fap-sub` in the stylesheet
     below) - it is the curtain's own clip-path/transform, unchanged, that decides at every
     instant which of the two colours is showing through at a given point on the heading. */
  const copy = (green: boolean) => (
    <div className={green ? 'fap-body fap-body-green' : 'fap-body'} aria-hidden={green || undefined}>
      <h2 className="fap-h">
        <span>Get a free</span>
        <span>financial health check</span>
      </h2>
      <p className="fap-sub">Know where you stand</p>
      <div className="fap-stores">
        {storeBtn(<AppleGlyph />, 'Download on the', 'App Store', green)}
        {storeBtn(<PlayGlyph />, 'GET IT ON', 'Google Play', green)}
      </div>
    </div>
  );

  return (
    <section ref={revealRef} className="fap-root">
      <style>{`
        /* The height is CSS, not the hydrated mobile flag it used to be. Deriving it from
           state meant the server rendered 190vh and the client could then re-render it at
           165vh, changing the document height after hydration; the browser clamps the scroll
           offset when the document shrinks under it, and with scroll-behavior: smooth set
           globally that clamp animates, which is what read as the page scrolling by itself.
           Also the outer clip: the band this sits in has rounded top corners and no overflow of
           its own, so the stage's own rectangle was painting straight over them. */
        .fap-root {
          position: relative;
          /* 140vh, not 190vh. The stage is pinned for whatever the section has beyond one
             viewport, so that used to hold the page visually still for 90vh of scrolling; it is
             40vh now, and the curtain is moving and flattening throughout it. */
          min-height: 140vh;
          background: transparent;
          /* clip, not hidden. hidden is a scrollable overflow value, so it would make this
             element a scroll container - and a scroll container is what position: sticky sticks
             to, which would stop the stage below from pinning to the viewport at all. clip
             clips identically without creating a scrollport. hidden first as the fallback for
             browsers without clip (Safari < 16), which keep the previous behaviour. */
          overflow: hidden;
          overflow: clip;
          border-top-left-radius: var(--fp-r, 40px);
          border-top-right-radius: var(--fp-r, 40px);
        }
        @media (max-width: 619px) { .fap-root { min-height: 130vh; } }
        /* Pinned by the browser: position: sticky, held against the viewport on the compositor.

           This used to be an absolutely positioned box that JavaScript re-positioned every frame
           with a counter-transform read from the section's own getBoundingClientRect(). That is a
           main-thread feedback loop with a built-in frame of lag: the scroll composites straight
           away, the rAF callback reads the new position a frame later, and the correction only
           lands the frame after that, so the "pinned" stage rode the scroll and was pulled back,
           every frame. It is the same construction that was removed from the phone-in-hand and
           Unify sections for exactly the same reason, and it is what made this section feel like
           it was holding the viewport instead of letting the page through.

           The comment that used to sit here justified the hand-rolled pin by saying the homepage
           root carried overflow-x: hidden and therefore broke sticky. That was true when it was
           written; the root now uses overflow-x: clip (see SectionPanels.tsx), so nothing in the
           ancestor chain is a scrollport and sticky works. */
        .fap-stage {
          position: sticky; top: 0;
          height: 100vh;
          overflow: hidden; background: ${LOGO_GREEN};
        }
        /* The sheet, with the angle part of it rather than sitting on top: one element, one
           static clip-path that is never recomputed, and a transform is the only thing that
           moves. The apex touches the element's top edge and the shoulders drop 35.5% of 164vh,
           so the diagonals run the full width of the viewport at a deliberately steep angle. */
        .fap-curtain {
          position: absolute; left: 0; right: 0; top: 0; height: 164vh;
          background-image: url('${CURTAIN_BG_IMAGE}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          /* The shoulder is the only thing in this polygon that moves, and the driver moves it.
             A static 35.5% kept the same steep angle for the whole sweep, so the sheet only ever
             translated; now the peak also flattens as it lifts, from a strong diagonal down to
             an almost horizontal edge. The default is the steep end, so the first paint is the
             un-revealed state even before the driver's first frame. */
          --fap-sh: 40%;
          clip-path: polygon(0% var(--fap-sh), 50% 0%, 100% var(--fap-sh), 100% 100%, 0% 100%);
          will-change: transform;
          /* Decorative. The interactive buttons are the ones in the base copy underneath, so
             the sheet and everything in it must let clicks through to them. */
          pointer-events: none;
          /* The un-revealed state, in CSS. The driver overwrites this on its first frame, but
             until then (and with JS disabled) the section paints green with purple type, which
             is the correct state at the top of the page rather than a blank frame. */
          transform: translate3d(0, 104vh, 0);
        }
        /* The purple copy, counter-translated inside the sheet. Its box is the top 100vh of the
           sheet, which is the stage's own box once the two transforms cancel. */
        .fap-inner {
          position: absolute; left: 0; right: 0; top: 0; height: 100vh;
          will-change: transform;
          transform: translate3d(0, -104vh, 0);
        }
        .fap-body {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 0 22px;
        }
        /* Two copies, two colours, one boundary. The base copy sits directly over the stage's
           green field and is white there - it reads as "not yet revealed". The inner copy lives
           inside the curtain sheet, clipped by the exact same clip-path/transform that reveals
           the background image, so it is purple. Because both copies occupy the identical screen
           position (see the copy() comment above), the curtain's own moving edge is the only
           thing that ever decides which colour is showing at a given point - there is no
           separate colour transition to keep in sync, the existing reveal drives it for free. */
        .fap-h {
          margin: 0; color: #FFFFFF;
          font-family: ${POPPINS};
          font-size: clamp(38px, 7vw, 92px);
          font-weight: 600; line-height: 1.02; letter-spacing: -.035em;
        }
        .fap-h span { display: block; }
        .fap-sub {
          /* Bumped slightly from clamp(14px, 1.5vw, 18px) - still subtle, just a shade more
             legible/prominent. */
          margin: clamp(16px, 2.4vw, 26px) 0 0; color: #FFFFFF;
          font-family: ${INTER}; font-size: clamp(16px, 1.7vw, 21px); line-height: 1.5;
        }
        /* The curtain-clipped copy only - purple, once the sheet has revealed it. */
        .fap-body-green .fap-h, .fap-body-green .fap-sub {
          color: ${TEXT_PURPLE};
        }
        /* Drawn in both copies. They are the same dark pill either side of the boundary, so
           there is nothing to switch, and hiding them in the clipped copy meant that once the
           sheet covered the section the buttons vanished with it. Only the base copy's are
           interactive; these are inert via the sheet's pointer-events and tabIndex -1. */
        .fap-stores { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: clamp(28px, 3.6vw, 44px); }
        /* A narrow viewport would turn the same amplitude into a near vertical wall, so the peak
           is shallower there. The sheet and the sweep are unchanged. */
        /* A narrow viewport turns the same shoulder into a near vertical wall, so the whole
           range is shallower there. Same behaviour, adapted, not a different animation. */
        @media (max-width: 760px) {
          .fap-curtain { --fap-sh: 24%; }
        }
      `}</style>

      <div className="fap-stage">
        {copy(false)}
        <div ref={curtainRef} className="fap-curtain">
          <div ref={innerRef} className="fap-inner">{copy(true)}</div>
        </div>
      </div>
    </section>
  );
}
