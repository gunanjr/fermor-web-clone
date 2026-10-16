"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { DEFAULT_NET_WORTH_INPUTS, calculateNetWorth, type NetWorthInputs } from "../../src/lib/wealthForecast";
import { onScrollFrame } from "./scrollScheduler";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* A pure-formula compound curve is mathematically correct but reads as fake next to a real
   NAV chart's day-to-day jitter (see NavHistoryChart.tsx). This adds seeded, deterministic
   wiggle around the true exponential trend so the line looks like real recorded data, while
   the "Today" and dragged-year dot always snap back to the exact formula value - only the
   texture in between is stylised, never the numbers actually shown to the user. */
function mulberry32(seed: number) {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (Math.imul(31, hash) + value.charCodeAt(index)) | 0;
  }
  return hash;
}

// Same edge-aware clamping as the NAV chart on mutual fund pages: a tooltip near either
// edge of the chart hugs that edge instead of overflowing the card.
function forecastTooltipStyle(xPercent: number): React.CSSProperties {
  if (xPercent < 12) return { left: `${xPercent}%`, transform: 'translate(0%,-100%)' };
  if (xPercent > 88) return { left: `${xPercent}%`, transform: 'translate(-100%,-100%)' };
  return { left: `${xPercent}%`, transform: 'translate(-50%,-100%)' };
}

type BP = { m: boolean; t: boolean; d: boolean; w: number };

function useBP(): BP {
  const [bp, setBp] = useState<BP>({ m: true, t: false, d: false, w: 375 });
  useIsomorphicLayoutEffect(() => {
    const get = (): BP => {
      const w = window.innerWidth;
      return { m: w < 760, t: w >= 760 && w < 1080, d: w >= 1080, w };
    };
    setBp(get());
    let r: ReturnType<typeof requestAnimationFrame>;
    const h = () => { cancelAnimationFrame(r); r = requestAnimationFrame(() => setBp(get())); };
    window.addEventListener("resize", h);
    return () => { window.removeEventListener("resize", h); cancelAnimationFrame(r); };
  }, []);
  return bp;
}

function useReveal(): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }); },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export function ForecastSection() {
  const bp = useBP();
  const [sectionRef, sectionSeen] = useReveal();
  const [selectedYear, setSelectedYear] = useState(10);
  const [showForecastInfo, setShowForecastInfo] = useState(false);
  const [isDraggingChart, setIsDraggingChart] = useState(false);
  const [isSnappingChart, setIsSnappingChart] = useState(false);
  const [netWorthInputs, setNetWorthInputs] = useState<NetWorthInputs>(DEFAULT_NET_WORTH_INPUTS);
  const [growthSettings, setGrowthSettings] = useState({ monthlyInvestment: 10000, returnRate: 12 });

  useEffect(() => {
    const readSourceData = () => {
      try {
        const savedNetWorth = JSON.parse(localStorage.getItem('fermor-net-worth-v1') || '{}');
        const savedGrowth = JSON.parse(localStorage.getItem('fermor-wealth-growth-calculator-v1') || '{}');
        setNetWorthInputs({ ...DEFAULT_NET_WORTH_INPUTS, ...savedNetWorth });
        setGrowthSettings({ monthlyInvestment: savedGrowth.monthlyInvestment ?? 10000, returnRate: savedGrowth.returnRate ?? 12 });
      } catch {
        setNetWorthInputs(DEFAULT_NET_WORTH_INPUTS);
        setGrowthSettings({ monthlyInvestment: 10000, returnRate: 12 });
      }
    };
    readSourceData();
    window.addEventListener('storage', readSourceData);
    return () => window.removeEventListener('storage', readSourceData);
  }, []);

  const currentNetWorth = calculateNetWorth(netWorthInputs);
  const maxYears = 15;
  const growthRate = growthSettings.returnRate / 100;
  const valueAtYear = (year: number) => Math.round(currentNetWorth * Math.pow(1 + growthRate, year));

  const NOISE_STEPS = 90;
  const noisySeries = useMemo(() => {
    const seedKey = `${currentNetWorth}-${growthRate}-${maxYears}`;
    const random = mulberry32(hashSeed(seedKey));
    return Array.from({ length: NOISE_STEPS + 1 }, (_, index) => {
      const year = (index / NOISE_STEPS) * maxYears;
      const trueValue = valueAtYear(year);
      if (index === 0) return { year, amount: trueValue };
      const wiggle = 1 + (random() - 0.5) * 0.06;
      return { year, amount: trueValue * wiggle };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetWorth, growthRate]);

  const noisyValueAtYear = (year: number) => {
    const t = (year / maxYears) * NOISE_STEPS;
    const lo = Math.max(0, Math.min(NOISE_STEPS - 1, Math.floor(t)));
    const hi = lo + 1;
    const frac = t - lo;
    return noisySeries[lo].amount + (noisySeries[hi].amount - noisySeries[lo].amount) * frac;
  };

  const maxForecast = Math.max(valueAtYear(maxYears), currentNetWorth + 1, ...noisySeries.map(p => p.amount));
  const chartHeight = 190;
  const chartPointAtYear = (year: number) => {
    const amount = valueAtYear(year);
    return { year, amount, x: (year / maxYears) * 1000, y: chartHeight - ((amount - currentNetWorth) / (maxForecast - currentNetWorth)) * 145 };
  };
  const noisyPointAtYear = (year: number) => {
    const amount = noisyValueAtYear(year);
    return { x: (year / maxYears) * 1000, y: chartHeight - ((amount - currentNetWorth) / (maxForecast - currentNetWorth)) * 145 };
  };
  const buildCurvePath = (endYear: number) => {
    const steps = Math.max(1, Math.ceil(endYear * 8));
    const interior = Array.from({ length: steps }, (_, index) => noisyPointAtYear((endYear * index) / steps));
    const anchoredEnd = chartPointAtYear(endYear);
    return [...interior, anchoredEnd]
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');
  };
  const todayPoint = chartPointAtYear(0);
  const activeForecast = chartPointAtYear(selectedYear);
  const linePath = buildCurvePath(selectedYear);
  const areaPath = `${linePath} L ${activeForecast.x} ${chartHeight} L 0 ${chartHeight} Z`;
  const formatInr = (amount: number) => `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  const wealthDifference = activeForecast.amount - currentNetWorth;
  const growthPercentage = currentNetWorth > 0 ? Math.round((wealthDifference / currentNetWorth) * 100) : 0;
  const chartLabels = [0, 2, 5, 10, 15];
  const selectForecastAtPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = Math.max(0, Math.min(1000, ((event.clientX - bounds.left) / bounds.width) * 1000));
    setSelectedYear((pointerX / 1000) * maxYears);
  };
  const releaseForecastPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    setIsDraggingChart(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    const snappedYear = Math.max(0, Math.min(maxYears, Math.round(selectedYear)));
    setIsSnappingChart(true);
    const startYear = selectedYear;
    const startTime = performance.now();
    const animateSnap = (time: number) => {
      const progress = Math.min(1, (time - startTime) / 250);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSelectedYear(startYear + (snappedYear - startYear) * eased);
      if (progress < 1) requestAnimationFrame(animateSnap);
      else { setSelectedYear(snappedYear); setIsSnappingChart(false); }
    };
    requestAnimationFrame(animateSnap);
  };

  return (
    <section ref={sectionRef as any} style={{ position: 'relative', overflow: 'hidden', padding: bp.m ? '72px 18px 78px' : '116px 28px 126px', background: 'transparent' }}>
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 630, margin: '0 auto 48px' }}>
          <h2 style={{ fontFamily: 'Georgia, Times New Roman, serif', fontStyle: 'italic', fontSize: 'clamp(42px,6vw,72px)', fontWeight: 400, color: '#101512', letterSpacing: '-.035em', lineHeight: 1.02, margin: 0, opacity: sectionSeen ? 1 : 0, transform: sectionSeen ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .8s ease, transform .9s cubic-bezier(.2,.82,.2,1)' }}>Forecast your future</h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 13 : 14, color: '#4A554D', lineHeight: 1.5, maxWidth: 390, margin: '18px auto 0' }}>Model scenarios from market shifts to life goals, and see how your money could grow over time.</p>
          <span style={{ position: 'relative', display: 'inline-flex', marginTop: 18, padding: 1, borderRadius: 8, overflow: 'hidden' }}>
            <span aria-hidden="true" style={{ position: 'absolute', inset: '-120%', background: 'conic-gradient(from 0deg, transparent 0deg, transparent 285deg, rgba(117,251,144,.9) 315deg, transparent 345deg)', animation: 'forecastBorderSweep 3.8s linear infinite' }} />
            <button type="button" onClick={() => setShowForecastInfo(open => !open)} aria-expanded={showForecastInfo} style={{ position: 'relative', color: '#101512', background: showForecastInfo ? 'rgba(117,251,144,.16)' : 'rgba(117,251,144,.07)', border: '1px solid rgba(117,251,144,.26)', borderRadius: 7, padding: '9px 13px', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}>More about forecasting <span aria-hidden="true">{showForecastInfo ? '↙' : '↗'}</span></button>
          </span>
          {showForecastInfo && <div style={{ margin: '18px auto 0', maxWidth: 430, padding: '12px 16px', border: '1px solid rgba(117,251,144,.22)', borderRadius: 10, background: 'rgba(117,251,144,.07)', color: '#4A554D', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, lineHeight: 1.55 }}>Choose a time horizon below the graph to compare how your current wealth could grow. These figures are illustrative estimates, not guaranteed returns.</div>}
        </div>

        <div style={{ position: 'relative', width: 'min(100%, 980px)', margin: '0 auto' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-14%', left: '4%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(117,251,144,.32), transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-18%', right: '6%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(117,251,144,.28), transparent 70%)', filter: 'blur(56px)', pointerEvents: 'none' }} />
        <div
          style={{
            position: 'relative', width: '100%',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(22px) saturate(160%)', WebkitBackdropFilter: 'blur(22px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 24px 70px rgba(16,48,32,.10), inset 0 1px 0 rgba(255,255,255,0.7)',
            borderRadius: bp.m ? 18 : 22, padding: bp.m ? '18px 14px 16px' : '24px 28px 18px', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: bp.m ? 20 : 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: '#5A6660', marginBottom: 5 }}>Total wealth today</div>
              <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 28 : 36, fontWeight: 600, color: '#101512', lineHeight: 1 }}>{formatInr(currentNetWorth)}</div>
            </div>
            <div style={{ minWidth: bp.m ? 0 : 260 }}>
              <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: '#5A6660', marginBottom: 5 }}>Projected wealth in {selectedYear.toFixed(1).replace('.0', '')} years</div>
              <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 28 : 36, fontWeight: 600, color: '#101512', lineHeight: 1 }}>{formatInr(activeForecast.amount)}</div>
              <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: '#75FB90', marginTop: 8 }}>+{formatInr(wealthDifference)} ({growthPercentage}%) from your wealth today</div>
            </div>
          </div>

          <div style={{ position: 'relative', height: bp.m ? 180 : 220, minWidth: 0 }}>
            <svg viewBox="0 0 1000 220" preserveAspectRatio="none" role="img" aria-label="Projected wealth rising over fifteen years. Drag across the chart to select a forecast horizon." onPointerDown={event => { setIsDraggingChart(true); event.currentTarget.setPointerCapture(event.pointerId); selectForecastAtPointer(event); }} onPointerMove={event => { if (isDraggingChart) selectForecastAtPointer(event); }} onPointerUp={releaseForecastPointer} onPointerCancel={() => setIsDraggingChart(false)} style={{ position: 'absolute', inset: '0 0 20px 0', width: '100%', height: 'calc(100% - 20px)', overflow: 'visible', cursor: isDraggingChart ? 'grabbing' : 'grab', touchAction: 'none' }}>
              <defs><linearGradient id="forecastArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#75FB90" stopOpacity=".26" /><stop offset="1" stopColor="#75FB90" stopOpacity="0" /></linearGradient></defs>
              <path d={areaPath} fill="url(#forecastArea)" />
              <path d={linePath} fill="none" stroke="#75FB90" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {selectedYear > 0 && (
                <line x1={activeForecast.x} y1={activeForecast.y} x2={activeForecast.x} y2="190" stroke="rgba(16,48,32,.35)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              )}
              <circle cx={todayPoint.x} cy={todayPoint.y} r="5" fill="#fff" stroke="#75FB90" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              {selectedYear > 0 && (
                <circle cx={activeForecast.x} cy={activeForecast.y} r="6" fill="#fff" stroke="#75FB90" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              )}
              <rect x="0" y="0" width="1000" height="220" fill="transparent" aria-hidden="true" />
            </svg>
            <span
              style={{
                position: 'absolute', top: `${(todayPoint.y / 220) * 100}%`, marginTop: -12,
                ...forecastTooltipStyle((todayPoint.x / 1000) * 100),
                background: '#16201a', color: '#ffffff', fontWeight: 700,
                padding: '5px 9px', borderRadius: 7, boxShadow: '0 4px 14px rgba(18,32,22,0.18)',
                fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 10.5, whiteSpace: 'nowrap',
              } as React.CSSProperties}
            >
              Today
            </span>
            {selectedYear > 0 && (
              <span
                style={{
                  position: 'absolute', top: `${(activeForecast.y / 220) * 100}%`, marginTop: -12,
                  ...forecastTooltipStyle((activeForecast.x / 1000) * 100),
                  background: '#16201a', color: '#ffffff', fontWeight: 700,
                  padding: '5px 9px', borderRadius: 7, boxShadow: '0 4px 14px rgba(18,32,22,0.18)',
                  fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 10.5, whiteSpace: 'nowrap',
                  transition: isSnappingChart ? 'left .25s ease-out, top .25s ease-out' : 'none',
                } as React.CSSProperties}
              >
                In {selectedYear.toFixed(1).replace('.0', '')} years · {formatInr(activeForecast.amount)}
              </span>
            )}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 9, color: '#5A6660', letterSpacing: '.06em' }}>{chartLabels.map(year => year === 0 ? <span key={year}>Now</span> : <button key={year} type="button" onClick={() => setSelectedYear(year)} style={{ color: selectedYear === year ? '#101512' : '#5A6660', background: 'none', border: 0, padding: 0, font: 'inherit', cursor: 'pointer' }}>{year}Y</button>)}</div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}


/**
 * The energy the circle throws off while a pointer rests inside it.
 *
 * One canvas behind the circle, one animation loop, and a small pool of fronts. Each front is a
 * closed curve, not a circle: three low harmonics with their own phases and speeds perturb the
 * radius as it grows, so a front leans and breathes on its way out and two overlapping fronts
 * never trace the same shape. That is the whole reason this is a canvas and not a stack of
 * CSS rings, which can only ever be concentric.
 *
 * A front is born at the circle's own rim and fades on two curves at once: it thins as it
 * grows, and its opacity is scaled by how far it still is from the far edge of the section, so
 * nothing ever reaches a boundary at full strength.
 *
 * Nothing is created per frame. The pool is capped, spent fronts are spliced out, and the loop
 * stops itself once the pool is empty, so an untouched circle costs nothing at all.
 */
type Front = { t: number; life: number; seed: number; drift: number; tilt: number };

const RIPPLE_CAP = 9;
const RIPPLE_INTERVAL_MS = 430;

function useCircleRipples(active: boolean, radiusOf: () => number) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frontsRef = useRef<Front[]>([]);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const spawnRef = useRef(0);
  const activeRef = useRef(false);
  const radiusRef = useRef(radiusOf);

  radiusRef.current = radiusOf;

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const dt = lastRef.current ? Math.min((now - lastRef.current) / 1000, 0.05) : 0;
      lastRef.current = now;
      const fronts = frontsRef.current;

      if (activeRef.current) {
        spawnRef.current += dt * 1000;
        while (spawnRef.current >= RIPPLE_INTERVAL_MS) {
          spawnRef.current -= RIPPLE_INTERVAL_MS;
          if (fronts.length < RIPPLE_CAP) {
            fronts.push({
              t: 0,
              life: 2.6 + Math.random() * 1.1,
              seed: Math.random() * Math.PI * 2,
              drift: 0.55 + Math.random() * 0.7,
              tilt: Math.random() * Math.PI * 2,
            });
          }
        }
      } else {
        spawnRef.current = 0;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const start = radiusRef.current();
      // Far enough that a front is already spent by the time it would meet an edge.
      const reach = Math.hypot(w, h) * 0.62;

      for (let i = fronts.length - 1; i >= 0; i--) {
        const f = fronts[i];
        f.t += dt / f.life;
        if (f.t >= 1) { fronts.splice(i, 1); continue; }

        const eased = 1 - Math.pow(1 - f.t, 2.2);
        const radius = start + (reach - start) * eased;
        // Fades as it thins and again as it nears the edge, so it never arrives at full strength.
        const alpha = Math.sin(Math.min(1, f.t) * Math.PI) * 0.82 * (1 - f.t * 0.7);
        if (alpha <= 0.002) continue;

        const wobble = 0.11 * (1 - f.t * 0.4);
        const phase = f.seed + f.t * f.drift * 4;
        // The front is traced twice at slightly different radii: a wide, soft body and a
        // brighter crest just inside it. One stroke on its own reads as a hoop; two, with the
        // body several times wider and much dimmer, read as a wave with depth to it.
        const trace = (scale: number) => {
          ctx.beginPath();
          const STEPS = 120;
          for (let k = 0; k <= STEPS; k++) {
            const a = (k / STEPS) * Math.PI * 2;
            const n =
              Math.sin(a * 2 + phase) * 0.55 +
              Math.sin(a * 3 - phase * 0.7 + f.tilt) * 0.3 +
              Math.sin(a * 5 + phase * 1.3) * 0.15;
            const r = radius * scale * (1 + n * wobble);
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r * 0.985;
            if (k === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        };

        const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
        grad.addColorStop(0, `rgba(70, 216, 136, ${alpha * 0.5})`);
        grad.addColorStop(0.5, `rgba(165, 250, 205, ${alpha})`);
        grad.addColorStop(1, `rgba(23, 198, 131, ${alpha * 0.45})`);

        ctx.strokeStyle = `rgba(70, 216, 136, ${alpha * 0.3})`;
        ctx.lineWidth = Math.max(2, 16 * (1 - f.t * 0.55));
        ctx.shadowBlur = 26 * (1 - f.t);
        ctx.shadowColor = `rgba(90, 230, 160, ${alpha * 0.9})`;
        trace(0.995);
        ctx.stroke();

        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(0.8, 3 * (1 - f.t * 0.7));
        ctx.shadowBlur = 14 * (1 - f.t);
        trace(1);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      if (fronts.length || activeRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        rafRef.current = 0;
        lastRef.current = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };

    // The loop is started by activity, not by mounting, and restarted the same way below.
    const kick = () => {
      if (!rafRef.current) {
        lastRef.current = 0;
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    (canvas as HTMLCanvasElement & { __kick?: () => void }).__kick = kick;

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      frontsRef.current = [];
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current as (HTMLCanvasElement & { __kick?: () => void }) | null;
    canvas?.__kick?.();
  }, [active]);

  return canvasRef;
}

export function SharedMoneySection() {
  const bp = useBP();
  const [sectionRef, sectionSeen] = useReveal();
  const [activeMember, setActiveMember] = useState('NS');
  const [circleScale, setCircleScale] = useState(.84);
  const [rippling, setRippling] = useState(false);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const members = ['NS', 'AR', 'JS'];

  const reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Measured off the live element, so the fronts leave the rim at whatever scale the scroll
  // animation currently has the circle at rather than at a size written down here.
  const rippleCanvasRef = useCircleRipples(rippling, () => {
    const el = circleRef.current;
    return el ? el.getBoundingClientRect().width / 2 : (bp.m ? 190 : 350);
  });

  useEffect(() => {
    // On the shared scheduler, and quantised: React bails out of a setState that returns the
    // same value, so a full scroll of this band now costs about 40 rerenders instead of one
    // per frame. The visible step is well under a pixel of circle diameter.
    return onScrollFrame(({ vh }) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const next = .8 + progress * .25;
      setCircleScale(prev => (Math.abs(next - prev) < .006 ? prev : next));
    });
  }, [sectionRef]);

  return (
    <section ref={sectionRef as any} style={{ minHeight: bp.m ? 520 : 680, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'transparent', padding: bp.m ? '70px 18px' : '96px 28px' }}>
      <div aria-hidden="true" style={{ position: 'absolute', width: bp.m ? 380 : 720, height: bp.m ? 380 : 720, borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,205,241,.62) 0%, rgba(89,130,165,.38) 30%, rgba(28,42,54,.1) 58%, transparent 72%)', filter: 'blur(7px)' }} />
      {/* The ripple field. Over the ambient glow, under the circle, and never a hit target, so
          the circle's own controls and its scroll animation are untouched by it. */}
      {!reduceMotion && (
        <canvas
          ref={rippleCanvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        />
      )}
      <div
        ref={circleRef}
        /* Mouse only. A touch pointer would fire enter on tap and leave the field running with
           nothing hovering it, so touch keeps exactly the behaviour it had. */
        onPointerEnter={e => { if (e.pointerType === 'mouse' && !reduceMotion) setRippling(true); }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') setRippling(false); }}
        style={{ position: 'relative', width: bp.m ? 'min(390px, calc(100vw - 28px))' : 'min(700px, calc(100vw - 40px))', aspectRatio: '1 / 1', borderRadius: '50%', background: '#000', boxShadow: '0 0 0 1px rgba(255,255,255,.04), 0 0 38px rgba(194,225,249,.78), 0 0 110px rgba(126,178,216,.62), 0 0 190px rgba(75,126,168,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: sectionSeen ? 1 : 0, transform: `scale(${sectionSeen ? circleScale : .78})`, transformOrigin: 'center center', transition: 'opacity .45s ease, transform .28s cubic-bezier(.2,.82,.2,1)', willChange: 'transform' }}>
        <div style={{ width: '100%', padding: bp.m ? '0 34px' : '0 80px' }}>
          <h2 style={{ fontFamily: 'Georgia, Times New Roman, serif', fontStyle: 'italic', fontSize: bp.m ? 28 : 38, fontWeight: 400, color: '#F4F4F2', lineHeight: 1.12, margin: '0 0 12px', letterSpacing: '-.025em' }}>Manage money together</h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 12 : 14, color: 'rgba(255,255,255,.72)', lineHeight: 1.5, maxWidth: bp.m ? 250 : 300, margin: '0 auto 22px' }}>Create a shared intelligent home for your finances.<br />Add your partner for free.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: 3, gap: 3, border: '1px solid rgba(133,211,255,.45)', borderRadius: 99, background: 'rgba(12,19,24,.82)' }}>
            {members.map(member => (
              <button key={member} type="button" onClick={() => setActiveMember(member)} aria-label={`Select ${member}`} style={{ width: bp.m ? 25 : 28, height: bp.m ? 25 : 28, borderRadius: '50%', border: `1px solid ${activeMember === member ? '#76D8FF' : 'rgba(126,200,235,.65)'}`, background: activeMember === member ? 'rgba(126,216,255,.16)' : 'transparent', color: '#EAF8FF', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 8 : 9, cursor: 'pointer', padding: 0, transition: 'background .2s, border-color .2s' }}>{member}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



