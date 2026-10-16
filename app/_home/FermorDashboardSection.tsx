"use client";

import { useState, useMemo } from 'react';

function buildPoints(data: number[], w: number, h: number, pad = 4) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  return data.map((v, i) => ({
    x: pad + i * step,
    y: h - pad - ((v - min) / range) * (h - pad * 2),
    v,
  }));
}

/* ---- procedural chart data (ported from sumit-potential-ui @ 8e49139) ----
   The dashboard charts want a dense, jittery "live feed" line rather than a
   handful of hand-picked points. generateNoisyData walks from start to end
   with a seeded RNG so the shape is identical on server and client (no
   hydration mismatch) and stable across renders. generateSharpPath is a plain
   polyline builder used everywhere a smooth map().join() was before. */
function generateSharpPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  return points.reduce((path, point, index) => `${path}${index === 0 ? 'M' : 'L'} ${point.x} ${point.y} `, '').trim();
}

// Same edge-aware clamping as the NAV chart on mutual fund pages: the tooltip
// hugs the hovered point instead of overflowing the card near either edge.
function tooltipStyle(xPercent: number): React.CSSProperties {
  if (xPercent < 15) return { left: `${xPercent}%`, transform: 'translateX(0%)' };
  if (xPercent > 85) return { left: `${xPercent}%`, transform: 'translateX(-100%)' };
  return { left: `${xPercent}%`, transform: 'translateX(-50%)' };
}

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

function generateNoisyData(seedKey: string, length: number, start: number, end: number, volatility = 1) {
  const random = mulberry32(hashSeed(seedKey));
  const values = [start];
  for (let index = 1; index < length; index += 1) {
    const drift = (end - values[index - 1]) / (length - index) * 0.35;
    const noise = (random() - 0.5) * volatility * 2;
    values.push(values[index - 1] + drift + noise);
  }
  values[values.length - 1] = end;
  return values;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.07 5.08-4.4 6.64v5.52h7.11c4.16-3.83 6.57-9.47 6.57-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18A12.02 12.02 0 0111 24c0-1.45.25-2.87.69-4.18v-5.7H4.34A21.99 21.99 0 002 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function FermorDashboardSection() {
  const RANGE_DATA: Record<string, number[]> = {
    '1W': generateNoisyData('1W', 45, 316, 325.3, 0.9),
    '1M': generateNoisyData('1M', 65, 302, 325.3, 1.4),
    '3M': generateNoisyData('3M', 85, 288, 325.3, 2),
    '6M': generateNoisyData('6M', 100, 268, 325.3, 2.6),
    '1Y': generateNoisyData('1Y', 120, 238, 325.3, 3.2),
    '2Y': generateNoisyData('2Y', 150, 178, 325.3, 4),
  };

  const ASSETS = [
    { label: 'U.S. stocks', current: 42.2, model: 56 },
    { label: 'Intl. stocks', current: 14.2, model: 24 },
    { label: 'Crypto', current: 25, model: 31 },
    { label: 'Cash', current: 13.6, model: 18.3 },
  ];

  const POSITION_ROWS = [
    { label: 'Total balance', value: '$4,065.80' },
    { label: 'Avg. cost basis', value: '$78.40' },
    { label: 'Current price', value: '$112.70' },
    { label: 'Portfolio allocation', value: '6.02%', isAllocation: true },
  ];

  const MARKETS = [
    { name: 'Dow Jones', ticker: 'DJI', value: '$42.34K', change: '1.78%', up: true, data: generateNoisyData('DJI', 32, 40.8, 42.34, 0.45) },
    { name: 'NASDAQ', ticker: 'IXIC', value: '$19.20K', change: '2.47%', up: true, data: generateNoisyData('IXIC', 32, 17.9, 19.2, 0.4) },
    { name: 'S&P 500', ticker: 'SPX', value: '$5.92K', change: '2.47%', up: true, data: generateNoisyData('SPX', 32, 5.55, 5.92, 0.12) },
    { name: 'VIX', ticker: 'VIX', value: '$18.98', change: '7.83%', up: false, data: generateNoisyData('VIX', 32, 21.6, 18.98, 0.5) },
  ];

  function PortfolioCard() {
    const [range, setRange] = useState<string>('1M');
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);
    const W = 420, H = 118;
    const data = RANGE_DATA[range];
    const points = useMemo(() => buildPoints(data, W, H), [data]);
    const linePath = generateSharpPath(points);
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;
    const active = points[hoverIdx ?? points.length - 1];

    const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W;
      let closest = 0;
      let dist = Number.POSITIVE_INFINITY;
      points.forEach((p, i) => {
        const d = Math.abs(p.x - x);
        if (d < dist) {
          dist = d;
          closest = i;
        }
      });
      setHoverIdx(closest);
    };

    // Explicit locale so server and client render identically (en-IN would give $3,25,300).
    const value = `$${Math.round(active.v * 1000).toLocaleString('en-US')}`;

    return (
      <div className="card">
        <h3 className="card-title">Monitor investment performance</h3>
        <p className="card-desc">Track your portfolio across stocks, ETFs and crypto.</p>

        <div className="panel">
          <span className="panel-label">Portfolio</span>
          <p className="panel-sub">Total balance</p>
          <div className="balance-row">
            <span className="balance">{value}</span>
            <span className="delta">
              <svg viewBox="0 0 10 10" fill="none"><path d="M5 1l4 8H1z" fill="currentColor" /></svg>
              +$12,124 (3.9%)
            </span>
          </div>

          <div className="chart-wrap">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="chart-svg"
              onMouseMove={handleMove}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <defs>
                <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#75FB90" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#75FB90" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#fade)" />
              <path d={linePath} fill="none" stroke="#75FB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {hoverIdx !== null && (
                <line x1={active.x} y1={0} x2={active.x} y2={H} stroke="rgba(117,251,144,0.18)" strokeWidth="1" />
              )}
              <circle cx={active.x} cy={active.y} r="4" fill="#75FB90" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
            <div className="chart-tag" style={{ top: -6, ...tooltipStyle((active.x / W) * 100) }}>
              {value}
            </div>
          </div>

          <div className="range-tabs">
            {Object.keys(RANGE_DATA).map((r) => (
              <button
                key={r}
                className={`tab ${range === r ? 'active' : ''}`}
                onClick={() => { setRange(r); setHoverIdx(null); }}
                type="button"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function AllocationCard() {
    const [hovered, setHovered] = useState<string | null>(null);
    return (
      <div className="card">
        <h3 className="card-title">Visualize your entire allocation</h3>
        <p className="card-desc">See how your portfolio is distributed across assets.</p>

        <div className="panel">
          <div className="panel-head">
            <span className="panel-label">Asset allocation</span>
            <div className="legend">
              <span className="legend-item"><span className="legend-dot current" />Current</span>
              <span className="legend-item"><span className="legend-dot model" />Model</span>
            </div>
          </div>
          <div className="asset-list">
            {ASSETS.map((a) => {
              const isHover = hovered === a.label;
              return (
                <div
                  key={a.label}
                  className="asset-row"
                  onMouseEnter={() => setHovered(a.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="asset-top">
                    <span className="asset-name">{a.label}</span>
                    <span className="asset-pct">
                      <span className="cur">{a.current}%</span> / {a.model}%
                    </span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${isHover ? a.model : a.current}%` }}
                    />
                    <div className="bar-marker" style={{ left: `${a.model}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function PositionCard() {
    const [hoverAlloc, setHoverAlloc] = useState(false);
    return (
      <div className="card">
        <h3 className="card-title">Dive into any position</h3>
        <p className="card-desc">Review the performance of every holding.</p>

        <div className="panel">
          <div className="holding-head">
            <div className="holding-logo"><GoogleMark /></div>
            <div>
              <div className="holding-name">Google <span>(GOOGL)</span></div>
              <div className="holding-sub">Technology &nbsp;·&nbsp; 36.1 shares</div>
            </div>
          </div>

          <div className="position-rows">
            {POSITION_ROWS.map((r) => (
              <div
                key={r.label}
                className="position-row"
                onMouseEnter={() => r.isAllocation && setHoverAlloc(true)}
                onMouseLeave={() => r.isAllocation && setHoverAlloc(false)}
              >
                <span className="position-label">{r.label}</span>
                <span className="position-value">{r.value}</span>
              </div>
            ))}
          </div>
          <div className="allocation-track">
            <div className="allocation-fill" style={{ width: hoverAlloc ? '12%' : '6.02%' }} />
          </div>
        </div>
      </div>
    );
  }

  function MarketsCard() {
    const [hover, setHover] = useState<{ ticker: string; idx: number } | null>(null);
    return (
      <div className="card">
        <h3 className="card-title">Track what&apos;s next</h3>
        <p className="card-desc">Follow the markets that matter to you.</p>

        <div className="panel">
          <span className="panel-label">Markets at a glance</span>
          <div className="markets-grid" style={{ marginTop: 14 }}>
            {MARKETS.map((m) => {
              const isHover = hover?.ticker === m.ticker;
              const pts = buildPoints(m.data, 120, 28, 2);
              const path = generateSharpPath(pts);
              const accent = m.up ? '#75FB90' : '#c0392f';
              const activeIdx = isHover ? hover!.idx : pts.length - 1;
              const active = pts[activeIdx];

              const handleSparkMove = (e: React.MouseEvent<SVGSVGElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 120;
                let closest = 0;
                let dist = Number.POSITIVE_INFINITY;
                pts.forEach((p, i) => {
                  const d = Math.abs(p.x - x);
                  if (d < dist) { dist = d; closest = i; }
                });
                setHover({ ticker: m.ticker, idx: closest });
              };

              return (
                <div key={m.ticker} className="market-box">
                  <div className="sparkline-wrap">
                    <svg
                      viewBox="0 0 120 28"
                      className="sparkline"
                      preserveAspectRatio="none"
                      onMouseMove={handleSparkMove}
                      onMouseLeave={() => setHover(null)}
                    >
                      <defs>
                        <linearGradient id={`spark-${m.ticker}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
                          <stop offset="100%" stopColor={accent} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={`${path} L ${pts[pts.length - 1].x} 28 L ${pts[0].x} 28 Z`} fill={`url(#spark-${m.ticker})`} />
                      <path
                        d={path}
                        fill="none"
                        stroke={accent}
                        strokeWidth={isHover ? 1.6 : 1.3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {isHover && (
                        <line x1={active.x} y1={0} x2={active.x} y2={28} stroke="rgba(117,251,144,0.18)" strokeWidth="0.6" />
                      )}
                      <circle cx={active.x} cy={active.y} r={isHover ? 3 : 2.2} fill={accent} stroke="#ffffff" strokeWidth="1.5" />
                    </svg>
                    {isHover && (() => {
                      const xPct = (active.x / 120) * 100;
                      const xTranslate = xPct < 15 ? '0%' : xPct > 85 ? '-100%' : '-50%';
                      return (
                        <div className="spark-tag" style={{ left: `${xPct}%`, transform: `translate(${xTranslate}, -100%)` }}>
                          ${m.data[activeIdx].toFixed(2)}K
                        </div>
                      );
                    })()}
                  </div>
                  <div className="market-row">
                    <span className="market-name">{m.name}</span>
                    <span className="market-value">{m.value}</span>
                  </div>
                  <div className="market-row bottom">
                    <span className="market-ticker">{m.ticker}</span>
                    <span className={`market-change ${m.up ? 'up' : 'down'}`}>
                      {m.up ? (
                        <svg viewBox="0 0 8 8" fill="currentColor"><path d="M4 0l4 6H0z" /></svg>
                      ) : (
                        <svg viewBox="0 0 8 8" fill="currentColor"><path d="M4 8L0 2h8z" /></svg>
                      )}
                      {m.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="fermor-root" style={{ margin: '0 auto', width: '100%' }}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="fermorGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" />
        </filter>
      </svg>
      <style>{`
        .fermor-root {
          /* Section 3 is a white band. The cards keep the green; what changed is the ground
             under them and, with it, every token that was written for a dark ground. --green
             is deepened rather than dropped: the accents stay green, they just have to carry
             on a light card now instead of glowing on a black one. */
          --bg: transparent;
          --text-1: #101512;
          --text-2: #4a554d;
          --text-3: #6c7972;
          --green: #75FB90;
          --green-soft: rgba(117, 251, 144, 0.14);
          --red: #c0392f;
          --edge: rgba(117, 251, 144, 0.18);
          position: relative;
          background: var(--bg);
          color: var(--text-1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 400;
          padding: 56px 12px 72px;
          overflow: hidden;
        }
        .fermor-root * { box-sizing: border-box; }
        /* The blooms and the vignette are gone rather than re-tinted. They were ambience for
           a dark ground; on Section 3's white they only ever read as a faint green wash, and
           because .fermor-root clips its own overflow the wash ended in a hard horizontal line
           partway down the band. The section is one flat white surface now, and the colour on
           it comes from the cards. .glow-mid and .vignette are kept as empty rules so the two
           nodes that carry those class names stay inert rather than needing to be removed. */
        .glow-mid,
        .vignette {
          display: none;
        }
        .hero, .grid { position: relative; z-index: 1; }
        .hero { max-width: 620px; margin: 0 auto 52px; text-align: center; }
        .eyebrow { color: var(--green); font-size: 12px; letter-spacing: 0.16em; font-weight: 600; margin: 0 0 16px; }
        .hero h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          font-size: 38px;
          line-height: 1.18;
          margin: 0 0 14px;
        }
        .hero h1 .highlight {
          background: linear-gradient(90deg, #75FB90, var(--green));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero p { color: var(--text-2); font-size: 15px; line-height: 1.6; margin: 0; }
        .grid {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 780px) {
          .grid { grid-template-columns: 1fr; }
          .hero h1 { font-size: 30px; }
        }
        .card {
          position: relative;
          isolation: isolate;
          background: linear-gradient(155deg, #ffffff, #fbfbfc 42%, #f1f2f4);
          border: 1px solid var(--edge);
          border-top-color: rgba(255,255,255,0.92);
          border-radius: 18px;
          padding: 28px 30px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.7) inset,
            0 -1px 0 rgba(16,18,20,0.04) inset,
            0 18px 40px rgba(16,18,20,0.08),
            0 2px 8px rgba(16,48,32,0.05);
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }
        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.65), transparent 55%);
          pointer-events: none;
          z-index: 0;
        }
        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          filter: url(#fermorGrain);
          opacity: 0.22;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 0;
        }
        .card > * { position: relative; z-index: 1; }
        .card:hover {
          border-color: rgba(16,18,20,0.16);
          background: linear-gradient(155deg, #ffffff, #ffffff 42%, #edeef1);
          transform: translateY(-3px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 -1px 0 rgba(16,18,20,0.06) inset,
            0 24px 48px rgba(16,18,20,0.13),
            0 2px 8px rgba(16,48,32,0.07);
        }
        .card-title { font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-size: 21px; line-height: 1.32; margin: 0 0 8px; text-align: center; }
        .card-desc { color: var(--text-2); font-size: 13px; line-height: 1.6; margin: 0 auto 20px; max-width: 340px; text-align: center; }
        .panel {
          position: relative;
          background: linear-gradient(160deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72));
          border: 1px solid rgba(16,18,20,0.08);
          border-radius: 13px;
          padding: 17px 18px 19px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 1px 6px rgba(16,48,32,0.06) inset;
        }
        .panel-label { font-size: 9px; letter-spacing: 0.08em; color: var(--text-3); font-weight: 600; text-transform: uppercase; }
        .panel-sub { color: var(--text-2); font-size: 12.5px; margin: 12px 0 3px; }
        .balance-row { display: flex; align-items: baseline; gap: 9px; margin-bottom: 12px; }
        .balance { font-size: 24px; font-weight: 500; letter-spacing: -0.005em; }
        .delta { font-size: 12.5px; font-weight: 500; color: var(--green); display: inline-flex; align-items: center; gap: 3px; }
        .delta svg { width: 9px; height: 9px; }
        .chart-wrap { position: relative; }
        .chart-svg { width: 100%; height: 118px; display: block; cursor: crosshair; }
        .chart-tag {
          position: absolute;
          background: #16201a;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 9px;
          border-radius: 7px;
          box-shadow: 0 4px 14px rgba(18,32,22,0.18);
          pointer-events: none;
          white-space: nowrap;
        }
        .range-tabs { display: flex; gap: 6px; margin-top: 14px; flex-wrap: wrap; }
        .tab {
          background: #ffffff; color: var(--text-3);
          border: 1px solid var(--edge);
          font-size: 10.5px; font-weight: 600; font-family: inherit; padding: 5px 11px;
          border-radius: 20px; cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .tab:hover { color: var(--text-2); }
        .tab.active { background: var(--green-soft); color: var(--green); border-color: var(--green); }
        .panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .legend { display: flex; gap: 12px; }
        .legend-item { display: flex; align-items: center; gap: 4px; font-size: 10.5px; color: var(--text-2); }
        .legend-dot { width: 6px; height: 6px; border-radius: 50%; }
        .legend-dot.current { background: var(--green); }
        .legend-dot.model { background: var(--text-3); }
        .asset-list { display: flex; flex-direction: column; gap: 12px; }
        .asset-row { padding: 5px 7px; margin: -5px -7px; border-radius: 7px; transition: background 0.15s ease; }
        .asset-row:hover { background: rgba(117,251,144,0.06); }
        .asset-top { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; }
        .asset-name { color: var(--text-1); font-weight: 400; }
        .asset-pct { color: var(--text-2); font-variant-numeric: tabular-nums; font-size: 11.5px; }
        .asset-pct .cur { color: var(--text-1); }
        .bar-track { position: relative; height: 4px; background: rgba(16,48,32,0.10); border-radius: 2px; }
        .bar-fill { height: 100%; border-radius: 2px; background: var(--green); transition: width 0.35s ease; }
        .bar-marker { position: absolute; top: -3px; width: 2px; height: 10px; border-radius: 1px; background: rgba(16,48,32,0.45); }
        .holding-head { display: flex; align-items: center; gap: 11px; padding-bottom: 13px; margin-bottom: 3px; border-bottom: 1px solid rgba(16,48,32,0.10); }
        .holding-logo {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(16,48,32,0.10);
          flex-shrink: 0;
        }
        .holding-logo svg { width: 17px; height: 17px; }
        .holding-name { font-size: 13px; font-weight: 500; color: var(--text-1); }
        .holding-name span { color: var(--text-3); font-weight: 400; }
        .holding-sub { font-size: 11.5px; color: var(--text-2); margin-top: 1px; }
        .position-rows { display: flex; flex-direction: column; margin-top: 4px; }
        .position-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12.5px; padding: 7px 7px; margin: 0 -7px; border-radius: 7px;
          transition: background 0.15s ease;
        }
        .position-row:hover { background: rgba(117,251,144,0.06); }
        .position-label { color: var(--text-2); }
        .position-value { color: var(--text-1); font-weight: 500; font-variant-numeric: tabular-nums; }
        .allocation-track { height: 4px; background: rgba(16,48,32,0.10); border-radius: 2px; margin-top: 3px; overflow: hidden; }
        .allocation-fill { height: 100%; background: var(--green); border-radius: 2px; transition: width 0.25s ease; }
        .markets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .market-box {
          position: relative;
          border: 1px solid rgba(16,48,32,0.10);
          background: linear-gradient(160deg, rgba(255,255,255,0.92), rgba(255,255,255,0.7));
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 11px 12px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .market-box:hover { border-color: rgba(117,251,144,0.26); background: linear-gradient(160deg, #ffffff, rgba(255,255,255,0.86)); }
        .sparkline-wrap { position: relative; margin-bottom: 6px; }
        .sparkline { width: 100%; height: 28px; display: block; cursor: crosshair; }
        .spark-tag {
          position: absolute; top: -8px;
          background: #16201a; color: #ffffff; font-size: 9.5px; font-weight: 700;
          padding: 3px 6px; border-radius: 5px; white-space: nowrap; pointer-events: none;
          box-shadow: 0 3px 10px rgba(18,32,22,0.18);
        }
        .market-row { display: flex; justify-content: space-between; align-items: baseline; }
        .market-name { font-size: 11.5px; color: var(--text-1); font-weight: 400; }
        .market-value { font-size: 11.5px; font-weight: 500; }
        .market-row.bottom { margin-top: 2px; }
        .market-ticker { font-size: 10.5px; color: var(--text-3); }
        .market-change { font-size: 10.5px; font-weight: 500; display: inline-flex; align-items: center; gap: 2px; }
        .market-change svg { width: 7px; height: 7px; }
        .market-change.up { color: var(--green); }
        .market-change.down { color: var(--red); }
      `}</style>

      <div className="glow-mid" />
      <div className="vignette" />

      <div className="hero">
        <p className="eyebrow">SHOW YOUR POTENTIAL</p>
        <h1>Your potential <span className="highlight">future balance</span></h1>
        <p>Adjust the inputs and see how your money can grow with the power of compounding.</p>
      </div>

      <div className="grid">
        <PortfolioCard />
        <AllocationCard />
        <PositionCard />
        <MarketsCard />
      </div>
    </section>
  );
}

export default FermorDashboardSection;
