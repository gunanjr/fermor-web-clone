"use client";

import { useEffect, useRef, useState } from "react";
import {
  MenuDotsIcon,
  ChevronRightIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  CarIcon,
  DocumentIcon,
  LightbulbIcon,
  PieChartIcon,
  TargetIcon,
  CreditCardIcon,
  TrendUpIcon,
} from "./AskAnything";

/* ============================================================
   Both cards below reuse the same visual system they always had - the purple gradient panel
   backgrounds, the glass card surfaces, the entrance animations (pageFourCardIn/pageFourRecapIn)
   and the dot-indicator + pill-nav mechanism. Only the content inside each card changed, from a
   typed-question demo and a dollar-denominated recap feed to the six dashboards specified for
   this pass. The mint accent (#b9efcf) already existed here (it was the "is-positive" colour on
   the old metric); it is now the one recurring highlight across both cards instead of a new one.
   ============================================================ */
const MINT = "#b9efcf";
const AUTO_ADVANCE_MS = 5500;

/* ---- icons not already available from AskAnything.tsx ---- */
function WalletIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 12.5h3M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function HomeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function PlaneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15.5l-9-4V5.2a1.2 1.2 0 10-2.4 0v6.3l-9 4v1.9l9-2.6v3.6l-2.4 1.5v1.4l3.6-1 3.6 1v-1.4L12 18.4v-3.6l9 2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ShieldIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BarsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19V10M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function LeafIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4c-9 0-14 3.7-14 9.4 0 2 .7 3.6 1.8 4.8L5 21h2.5l1.6-2.1c1 .5 2.2.8 3.4.8 4.7 0 7.5-4 7.5-9.7V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function HeartLineIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h4l2-6 3 12 2-8 1.5 2H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InfoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5.5M12 8v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---- a plain ring/donut, shared by the spending donut and the health-score ring ---- */
function Ring({
  size,
  stroke,
  segments,
  center,
  centerSub,
}: {
  size: number;
  stroke: number;
  segments: { pct: number; color: string }[];
  center: string;
  centerSub?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="page-four-ring" style={{ ["--rs" as string]: `${size}px` }}>
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          const len = (seg.pct / 100) * c;
          const dashOffset = -offset;
          offset += len;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
        })}
      </svg>
      <div className="page-four-ring-center">
        <strong>{center}</strong>
        {centerSub && <span>{centerSub}</span>}
      </div>
    </div>
  );
}

/* ---- a slim progress bar, shared by the cash-flow comparison and the goal rows ---- */
function Bar({ pct, tone }: { pct: number; tone: "mint" | "muted" }) {
  return (
    <div className="page-four-bar-track">
      <div className={`page-four-bar-fill page-four-bar-${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---- the net-worth line chart: same SVG technique the file already used for its spending
   chart (gradient-filled area + animated drawn line + a dot travelling the path), recoloured to
   the existing mint accent instead of that chart's lavender, since this line represents growth
   rather than a plain spend trend. ---- */
function NetWorthChart() {
  const path =
    "M2 92 C20 88 30 94 44 84 C58 74 68 86 82 76 C96 66 108 78 122 68 C137 58 150 70 165 60 C180 50 194 63 209 52 C224 41 239 55 255 44 C271 33 287 47 303 36 C319 25 335 38 351 27 C365 18 378 24 388 14";
  return (
    <div className="page-four-chart" aria-label="Net worth trend chart">
      <svg viewBox="0 0 390 108" role="img" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="page-four-mint-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(185,239,207,0.42)" />
            <stop offset="65%" stopColor="rgba(185,239,207,0.12)" />
            <stop offset="100%" stopColor="rgba(185,239,207,0)" />
          </linearGradient>
        </defs>
        <path d="M2 88 H388" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <path d="M2 64 H388" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
        <path d="M2 40 H388" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        <path d={`${path} L388 108 L2 108 Z`} fill="url(#page-four-mint-area)" className="page-four-chart-area" />
        <path
          d={path}
          fill="none"
          stroke={MINT}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          className="page-four-chart-line"
        />
        <circle r="4" fill={MINT} className="page-four-chart-dot">
          <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto" path={path} />
        </circle>
      </svg>
    </div>
  );
}

/* ============================================================
   LEFT PANEL DATA - "Understand your money better"
   ============================================================ */
const LEFT_NAV = ["My net worth trend", "Where is my money going?", "How can I save more?"];
// Slide 1's own nav row reads "How can I save better?" rather than "...more?" in the brief -
// kept exactly as specified rather than normalised to match the other two slides.
const LEFT_NAV_BY_SLIDE = [
  ["My net worth trend", "Where is my money going?", "How can I save more?"],
  ["My net worth trend", "Where is my money going?", "How can I save better?"],
  ["My net worth trend", "Where is my money going?", "How can I save more?"],
];

const SPENDING_CATEGORIES = [
  { label: "Food", amount: "₹12,480", pct: "26%", Icon: UtensilsIcon, mint: true },
  { label: "Shopping", amount: "₹8,320", pct: "17%", Icon: ShoppingBagIcon, mint: false },
  { label: "Transport", amount: "₹6,900", pct: "14%", Icon: CarIcon, mint: false },
  { label: "Others", amount: "₹20,620", pct: "43%", Icon: MenuDotsIcon, mint: false },
];

const NET_WORTH_SUMMARY = [
  { label: "Spending", value: "₹48,320" },
  { label: "Investments", value: "₹18,42,300" },
  { label: "Savings", value: "₹4,26,800" },
];

const CASH_FLOW_ROWS = [
  { label: "Essential spending", value: "₹41,600", mint: false },
  { label: "Investments", value: "₹12,000", mint: false },
  { label: "Discretionary spending", value: "₹18,400", mint: false },
  { label: "Current savings", value: "₹10,000", mint: true },
];

function PeriodPill() {
  return (
    <span className="page-four-period-pill">
      This month
      <ChevronRightIcon size={11} />
    </span>
  );
}

function LeftSlideOne() {
  return (
    <>
      <div className="page-four-card-topline">
        <div className="page-four-icon"><CreditCardIcon size={19} /></div>
        <PeriodPill />
      </div>
      <div className="page-four-value-row">
        <span className="page-four-metric-label">Total spending</span>
        <strong>₹48,320</strong>
        <span className="page-four-change">↓ 12% vs last month</span>
      </div>
      <div className="page-four-donut-row">
        <Ring
          size={124}
          stroke={13}
          segments={[
            { pct: 26, color: MINT },
            { pct: 74, color: "rgba(255,255,255,0.16)" },
          ]}
          center="₹48,320"
          centerSub="Total"
        />
        <div className="page-four-cat-list">
          {SPENDING_CATEGORIES.map((c) => (
            <div className="page-four-cat-row" key={c.label}>
              <span className="page-four-cat-icon" style={c.mint ? { color: MINT } : undefined}>
                <c.Icon size={13} />
              </span>
              <span className="page-four-cat-label">{c.label}</span>
              <span className="page-four-cat-amount">{c.amount}</span>
              <span className="page-four-cat-pct" style={c.mint ? { color: MINT } : undefined}>
                {c.pct}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LeftSlideTwo() {
  return (
    <>
      <div className="page-four-card-topline">
        <div className="page-four-icon"><PieChartIcon size={19} /></div>
        <PeriodPill />
      </div>
      <div className="page-four-value-row">
        <span className="page-four-metric-label">Net worth</span>
        <strong>₹24,86,420</strong>
        <span className="page-four-change">↑ 8.4% this month</span>
      </div>
      <NetWorthChart />
      <div className="page-four-timeframes">
        {["1W", "1M", "3M", "1Y", "ALL"].map((t) => (
          <span key={t} className={t === "1M" ? "is-active" : ""}>{t}</span>
        ))}
      </div>
      <div className="page-four-summary-grid">
        {NET_WORTH_SUMMARY.map((s) => (
          <div key={s.label} className="page-four-summary-card">
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </div>
        ))}
      </div>
    </>
  );
}

function LeftSlideThree() {
  return (
    <>
      <div className="page-four-card-topline">
        <div className="page-four-icon"><WalletIcon size={19} /></div>
        <PeriodPill />
      </div>
      <div className="page-four-value-row">
        <span className="page-four-metric-label">Monthly cash flow</span>
        <strong>₹82,000</strong>
        <span className="page-four-change page-four-change-plain">Total income</span>
      </div>
      <div className="page-four-flow-grid">
        <div className="page-four-flow-list">
          {CASH_FLOW_ROWS.map((r) => (
            <div className="page-four-flow-row" key={r.label}>
              <span>{r.label}</span>
              <strong style={r.mint ? { color: MINT } : undefined}>{r.value}</strong>
            </div>
          ))}
        </div>
        <div className="page-four-save-box">
          <span>You could save</span>
          <strong>₹6,500 more</strong>
          <span>by optimizing a few areas</span>
          <div className="page-four-save-compare">
            <div className="page-four-save-item">
              <span>12%</span>
              <Bar pct={12} tone="muted" />
              <span className="page-four-save-item-label">Current</span>
            </div>
            <div className="page-four-save-item">
              <span style={{ color: MINT }}>20%</span>
              <Bar pct={20} tone="mint" />
              <span className="page-four-save-item-label">Potential</span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-four-insight-strip">
        <div className="page-four-icon page-four-icon-sm"><LightbulbIcon size={15} /></div>
        <p>That&apos;s ₹6,500 extra<br />every month</p>
        <ChevronRightIcon size={15} />
      </div>
    </>
  );
}

const LEFT_SLIDES = [LeftSlideOne, LeftSlideTwo, LeftSlideThree];

function MoneyOverviewPanel() {
  const [slideIndex, setSlideIndex] = useState(0);
  const timerReference = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerReference.current = setInterval(() => {
      setSlideIndex((i) => (i + 1 >= LEFT_SLIDES.length ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerReference.current !== null) clearInterval(timerReference.current);
    };
  }, []);

  const chooseSlide = (index: number) => {
    if (index < 0 || index >= LEFT_SLIDES.length) return;
    setSlideIndex(index);
  };

  const Slide = LEFT_SLIDES[slideIndex] ?? LEFT_SLIDES[0];
  const nav = LEFT_NAV_BY_SLIDE[slideIndex] ?? LEFT_NAV;

  return (
    <article className="page-four-panel page-four-panel-left">
      <div className="page-four-heading">
        <h2>Understand your money better</h2>
        <p>
          Get a clear view of your finances across investments, spending and
          savings, all in one place.
        </p>
      </div>

      <div className="page-four-card-zone page-four-card-zone-left">
        <div key={slideIndex} className="page-four-insight-card">
          <Slide />
        </div>
      </div>

      <div className="page-four-question-chips">
        {nav.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => chooseSlide(index)}
            className={index === slideIndex ? "is-active" : ""}
          >
            {label}
          </button>
        ))}
      </div>
    </article>
  );
}

/* ============================================================
   RIGHT PANEL DATA - "Stay ahead every day"
   ============================================================ */
const NEWS_ROWS = [
  {
    category: "Markets",
    time: "2h ago",
    headline: "Nifty crosses 25,000 for the first time",
    Icon: TrendUpIcon,
    mint: true,
  },
  {
    category: "Personal finance",
    time: "5h ago",
    headline: "New tax regime changes explained in simple words",
    Icon: DocumentIcon,
    mint: false,
  },
  {
    category: "Investing",
    time: "1d ago",
    headline: "Why large cap funds are in focus again",
    Icon: PieChartIcon,
    mint: false,
  },
];

const GOAL_ROWS = [
  { name: "Buy a home", target: "₹18,00,000 target", pct: 62, toGo: "₹6,84,000 to go", Icon: HomeIcon, tone: "mint" as const },
  { name: "Europe trip", target: "₹3,00,000 target", pct: 27, toGo: "₹2,19,000 to go", Icon: PlaneIcon, tone: "muted" as const },
  { name: "Build investment portfolio", target: "₹10,00,000 target", pct: 41, toGo: "₹5,90,000 to go", Icon: PieChartIcon, tone: "muted" as const },
];

const HEALTH_METRICS = [
  { label: "Emergency fund", pct: "82%", Icon: ShieldIcon, mint: false },
  { label: "Savings rate", pct: "76%", Icon: BarsIcon, mint: false },
  { label: "Debt health", pct: "91%", Icon: CreditCardIcon, mint: false },
  { label: "Investment diversification", pct: "64%", Icon: LeafIcon, mint: true },
];

function RightSlideOne() {
  return (
    <>
      <div className="page-four-card-topline">
        <div className="page-four-icon"><DocumentIcon size={18} /></div>
        <span className="page-four-view-all">
          View all
          <ChevronRightIcon size={12} />
        </span>
      </div>
      <h3 className="page-four-right-title">Latest for you</h3>
      <div className="page-four-news-list">
        {NEWS_ROWS.map((row) => (
          <div className="page-four-news-row" key={row.headline}>
            <span className="page-four-cat-icon" style={row.mint ? { color: MINT } : undefined}>
              <row.Icon size={15} />
            </span>
            <div className="page-four-news-body">
              <span className="page-four-news-meta">{row.category} • {row.time}</span>
              <p>{row.headline}</p>
            </div>
            <ChevronRightIcon size={14} />
          </div>
        ))}
      </div>
    </>
  );
}

function RightSlideTwo() {
  return (
    <>
      <div className="page-four-card-topline">
        <div className="page-four-icon"><TargetIcon size={18} /></div>
        <span className="page-four-view-all">
          Add goal
          <PlusIcon size={12} />
        </span>
      </div>
      <h3 className="page-four-right-title">Your goals</h3>
      <div className="page-four-goal-list">
        {GOAL_ROWS.map((g) => (
          <div className="page-four-goal-row" key={g.name}>
            <div className="page-four-goal-head">
              <span className="page-four-cat-icon"><g.Icon size={14} /></span>
              <span>{g.name}</span>
            </div>
            <span className="page-four-goal-target">{g.target}</span>
            <Bar pct={g.pct} tone={g.tone} />
            <div className="page-four-goal-foot">
              <span style={g.tone === "mint" ? { color: MINT } : undefined}>{g.pct}%</span>
              <span>{g.toGo}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RightSlideThree() {
  return (
    <>
      <div className="page-four-card-topline">
        <div className="page-four-icon"><HeartLineIcon size={18} /></div>
      </div>
      <h3 className="page-four-right-title">Financial health score</h3>
      <div className="page-four-score-row">
        <div>
          <strong className="page-four-score-value">78 / 100</strong>
          <span className="page-four-change">↑ +6 points vs last month</span>
        </div>
        <Ring
          size={78}
          stroke={8}
          segments={[
            { pct: 78, color: MINT },
            { pct: 22, color: "rgba(255,255,255,0.16)" },
          ]}
          center="78"
        />
      </div>
      <div className="page-four-metric-grid">
        {HEALTH_METRICS.map((m) => (
          <div className="page-four-metric-tile" key={m.label}>
            <span className="page-four-cat-icon" style={m.mint ? { color: MINT } : undefined}>
              <m.Icon size={14} />
            </span>
            <span>{m.label}</span>
            <strong style={m.mint ? { color: MINT } : undefined}>{m.pct}</strong>
          </div>
        ))}
      </div>
      <div className="page-four-insight-strip">
        <div className="page-four-icon page-four-icon-sm"><InfoIcon size={15} /></div>
        <p>
          <strong>2 areas to improve</strong>
          <br />
          Focus on investment diversification and increasing your savings rate.
        </p>
        <ChevronRightIcon size={15} />
      </div>
    </>
  );
}

const RIGHT_SLIDES = [RightSlideOne, RightSlideTwo, RightSlideThree];
const RIGHT_NAV = ["Latest for you", "Your goals", "Financial health goals"];

function DailyUpdatesPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerReference = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerReference.current = setInterval(() => {
      setActiveIndex((i) => (i + 1 >= RIGHT_SLIDES.length ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerReference.current !== null) clearInterval(timerReference.current);
    };
  }, []);

  const chooseSlide = (index: number) => {
    if (index < 0 || index >= RIGHT_SLIDES.length) return;
    setActiveIndex(index);
  };

  const Slide = RIGHT_SLIDES[activeIndex] ?? RIGHT_SLIDES[0];

  return (
    <article className="page-four-panel page-four-panel-right">
      <div className="page-four-heading">
        <h2>Stay ahead every day</h2>
        <p>
          Get timely updates on your investments, markets and personal
          finances, so you can nevver miss what matters.
        </p>
      </div>

      <div className="page-four-card-zone page-four-card-zone-right">
        <div key={activeIndex} className="page-four-recap-card">
          <Slide />
        </div>
      </div>

      <div className="page-four-question-chips">
        {RIGHT_NAV.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => chooseSlide(index)}
            className={index === activeIndex ? "is-active" : ""}
          >
            {label}
          </button>
        ))}
      </div>
    </article>
  );
}

export default function DeepRecaps() {
  return (
    <section className="page-four-section">
      <style>{`
        @keyframes pageFourChartDraw {
          0% { stroke-dashoffset: 1; opacity: 0.35; }
          18% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes pageFourChartAreaPulse {
          0%, 100% { opacity: 0.62; }
          50% { opacity: 0.9; }
        }

        @keyframes pageFourLivePulse {
          0%, 100% { opacity: 0.58; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @keyframes pageFourBarsLive {
          0%, 100% { transform: scaleY(0.92); opacity: 0.76; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes pageFourPanelDriftLeft {
          0%, 100% { background-position: 0% 48%; }
          50% { background-position: 100% 52%; }
        }

        @keyframes pageFourPanelDriftRight {
          0%, 100% { background-position: 100% 44%; }
          50% { background-position: 0% 56%; }
        }

        @keyframes pageFourCardIn {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pageFourRecapIn {
          from { opacity: 0; transform: translateX(14px) scale(0.985); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes pageFourCursor {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }

        .page-four-section {
          width: 100%;
          /* Section 2 is a dark band and paints its own ground. The two panels below keep
             their own purple exactly as they were; only what shows between them changed. */
          background: transparent;
          color: #f3f4f2;
          padding: 88px 24px 112px;
          overflow: hidden;
        }

        .page-four-grid {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .page-four-panel {
          position: relative;
          min-width: 0;
          min-height: 780px;
          border-radius: 26px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 72px 34px 34px;
          isolation: isolate;
        }

        .page-four-panel::before {
          content: "";
          position: absolute;
          inset: -18%;
          z-index: -2;
          background-size: 170% 170%;
          filter: saturate(112%);
          pointer-events: none;
        }

        .page-four-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 58%, rgba(164, 131, 255, 0.25), transparent 34%),
            radial-gradient(circle at 82% 26%, rgba(88, 94, 255, 0.2), transparent 31%),
            radial-gradient(circle at 22% 76%, rgba(235, 145, 255, 0.16), transparent 28%);
          mix-blend-mode: screen;
        }

        .page-four-panel-left::before {
          background:
            radial-gradient(ellipse 76% 52% at 78% 30%, #4f55ff 0%, rgba(79, 85, 255, 0.76) 22%, rgba(79, 85, 255, 0) 62%),
            radial-gradient(ellipse 62% 54% at 36% 82%, #cf8cff 0%, rgba(207, 140, 255, 0.55) 24%, rgba(207, 140, 255, 0) 65%),
            radial-gradient(ellipse 70% 80% at 22% 12%, #111525 0%, #1b2042 32%, rgba(27, 32, 66, 0) 70%),
            linear-gradient(135deg, #111424 0%, #252b61 42%, #4e53ff 100%);
          animation: pageFourPanelDriftLeft 18s ease-in-out infinite alternate;
        }

        .page-four-panel-right::before {
          background:
            radial-gradient(ellipse 76% 56% at 84% 30%, #5258ff 0%, rgba(82, 88, 255, 0.78) 22%, rgba(82, 88, 255, 0) 62%),
            radial-gradient(ellipse 64% 52% at 44% 82%, #9e79ff 0%, rgba(158, 121, 255, 0.42) 25%, rgba(158, 121, 255, 0) 67%),
            radial-gradient(ellipse 74% 82% at 12% 16%, #0f111a 0%, #171b31 38%, rgba(23, 27, 49, 0) 72%),
            linear-gradient(135deg, #0e1018 0%, #1d2340 44%, #5157ff 100%);
          animation: pageFourPanelDriftRight 20s ease-in-out infinite alternate;
        }

        .page-four-heading {
          text-align: center;
          color: #ffffff;
          position: relative;
          z-index: 2;
        }

        .page-four-heading h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 4vw, 68px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 400;
          font-style: italic;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.16);
        }

        .page-four-heading p {
          max-width: 500px;
          margin: 22px auto 0;
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
        }

        .page-four-card-zone {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .page-four-card-zone-left {
          padding: 38px 0 20px;
        }

        .page-four-card-zone-right {
          padding: 34px 0 18px;
        }

        .page-four-insight-card {
          width: min(100%, 460px);
          height: 460px;
          min-height: 460px;
          max-height: 460px;
          aspect-ratio: 1 / 1;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.17);
          background: linear-gradient(145deg, rgba(66, 65, 104, 0.9), rgba(42, 42, 76, 0.82));
          box-shadow: 0 30px 80px rgba(10, 12, 35, 0.28);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 28px;
          color: #ffffff;
          animation: pageFourCardIn 500ms ease-out;
        }

        .page-four-recap-card {
          width: min(100%, 316px);
          height: 526px;
          min-height: 526px;
          max-height: 526px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: linear-gradient(150deg, rgba(10, 11, 23, 0.94), rgba(42, 41, 94, 0.83));
          box-shadow: 0 34px 90px rgba(5, 7, 20, 0.34);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 25px 24px 22px;
          color: #ffffff;
          animation: pageFourRecapIn 500ms ease-out;
        }

        .page-four-card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .page-four-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: #ffffff;
          font-size: 20px;
        }

        .page-four-icon span {
          filter: drop-shadow(0 0 7px rgba(137, 184, 255, 0.72));
        }

        .page-four-card-indicators {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .page-four-card-indicators button {
          width: 7px;
          height: 7px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.28);
          cursor: pointer;
          transition: width 220ms ease, background 220ms ease;
        }

        .page-four-card-indicators button.is-active {
          width: 25px;
          background: rgba(255, 255, 255, 0.95);
        }

        .page-four-question {
          min-height: 52px;
          margin-top: 24px;
          font-size: 21px;
          line-height: 1.3;
          font-weight: 500;
          letter-spacing: -0.025em;
        }

        .page-four-cursor {
          display: inline-block;
          width: 1.5px;
          height: 22px;
          margin-left: 3px;
          vertical-align: -3px;
          background: #ffffff;
          animation: pageFourCursor 900ms infinite;
        }

        .page-four-answer {
          margin-top: 18px;
          animation: pageFourCardIn 450ms ease-out;
        }

        .page-four-answer h3 {
          margin: 0;
          font-size: 24px;
          line-height: 1.1;
          letter-spacing: -0.04em;
          font-weight: 500;
        }

        .page-four-answer > p {
          margin: 9px 0 0;
          font-size: 12px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.72);
        }

        .page-four-insight-metric,
        .page-four-bills-wrap,
        .page-four-amount-wrap {
          margin-top: 16px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 18px;
          background: rgba(9, 11, 25, 0.23);
        }

        .page-four-insight-metric {
          padding: 16px;
        }

        .page-four-metric-head,
        .page-four-metric-foot,
        .page-four-amount-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 14px;
        }

        .page-four-metric-head span,
        .page-four-metric-foot,
        .page-four-amount-head span {
          font-size: 9px;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.55);
        }

        .page-four-metric-head strong,
        .page-four-amount-head strong {
          display: block;
          margin-top: 7px;
          font-size: 29px;
          line-height: 1;
          letter-spacing: -0.045em;
          font-weight: 500;
          color: #ffffff;
        }

        .page-four-metric-category {
          text-align: right;
        }

        .page-four-metric-category strong {
          font-size: 14px;
        }

        .page-four-mini-bars {
          height: 48px;
          display: flex;
          align-items: flex-end;
          gap: 5px;
          margin-top: 14px;
        }

        .page-four-mini-bars span {
          flex: 1;
          min-width: 5px;
          border-radius: 5px 5px 2px 2px;
          background: rgba(255, 255, 255, 0.22);
          transition: height 450ms ease;
          transform-origin: center bottom;
          animation: pageFourBarsLive 2.8s ease-in-out infinite;
        }

        .page-four-mini-bars span:nth-child(2) { animation-delay: 120ms; }
        .page-four-mini-bars span:nth-child(3) { animation-delay: 240ms; }
        .page-four-mini-bars span:nth-child(4) { animation-delay: 360ms; }
        .page-four-mini-bars span:nth-child(5) { animation-delay: 480ms; }
        .page-four-mini-bars span:nth-child(6) { animation-delay: 600ms; }
        .page-four-mini-bars span:nth-child(7) { animation-delay: 720ms; }

        .page-four-mini-bars span.is-active {
          background: rgba(255, 255, 255, 0.9);
        }

        .page-four-metric-foot {
          margin-top: 7px;
          align-items: center;
        }

        .page-four-metric-foot strong.is-positive {
          color: #b9efcf;
          letter-spacing: 0;
        }

        .page-four-metric-foot strong.is-negative {
          color: #ffcfb6;
          letter-spacing: 0;
        }

        .page-four-question-chips {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .page-four-question-chips button,
        .page-four-feedback button {
          border: 1px solid rgba(255, 255, 255, 0.26);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.86);
          border-radius: 999px;
          padding: 9px 13px;
          font-size: 10px;
          cursor: pointer;
          transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
        }

        .page-four-question-chips button.is-active,
        .page-four-feedback button.is-active {
          background: rgba(8, 9, 17, 0.76);
          border-color: rgba(255, 255, 255, 0.38);
          color: #ffffff;
        }

        .page-four-recap-label {
          margin-top: 25px;
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.55);
        }

        .page-four-recap-card h3 {
          margin: 11px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          line-height: 1.02;
          letter-spacing: -0.035em;
          font-weight: 400;
        }

        .page-four-recap-description {
          margin: 12px 0 0;
          font-size: 11px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.68);
        }

        .page-four-bills-wrap,
        .page-four-amount-wrap {
          padding: 0;
          overflow: hidden;
        }

        .page-four-bills-list {
          background: rgba(3, 4, 12, 0.12);
        }

        .page-four-bill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .page-four-bill-row:last-child {
          border-bottom: 0;
        }

        .page-four-bill-row div {
          min-width: 0;
        }

        .page-four-bill-row strong {
          display: block;
          font-size: 11px;
          font-weight: 600;
        }

        .page-four-bill-row span {
          display: block;
          margin-top: 3px;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.5);
        }

        .page-four-chart {
          height: 98px;
          padding: 8px 10px 0;
          background: linear-gradient(180deg, rgba(93, 90, 185, 0.12), rgba(8, 9, 20, 0));
        }

        .page-four-chart svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .page-four-chart-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: pageFourChartDraw 5.5s ease-in-out infinite alternate;
        }

        .page-four-chart-area {
          transform-origin: center bottom;
          animation: pageFourChartAreaPulse 5.5s ease-in-out infinite;
        }

        .page-four-chart-dot {
          filter: drop-shadow(0 0 6px rgba(220, 222, 255, 0.9));
        }

        .page-four-chart-dot-glow {
          opacity: 0.45;
          filter: blur(1px);
        }

        .page-four-amount-head {
          align-items: flex-start;
          padding: 14px 14px 0;
        }

        .page-four-amount-head strong {
          font-size: 27px;
        }

        .page-four-live-label {
          color: rgba(188, 235, 255, 0.82) !important;
          letter-spacing: 0.15em;
          transform-origin: center;
          animation: pageFourLivePulse 2.2s ease-in-out infinite;
        }

        .page-four-amount-wrap > .page-four-mini-bars {
          padding: 0 14px 13px;
          margin-top: 0;
          height: 34px;
        }

        .page-four-recap-footer {
          margin-top: 14px;
          padding-top: 13px;
          border-top: 1px solid rgba(255, 255, 255, 0.11);
        }

        .page-four-recap-footer p {
          margin: 0;
          font-size: 9px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.57);
        }

        .page-four-feedback {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 13px;
        }

        .page-four-feedback button {
          padding: 7px 10px;
          font-size: 8px;
        }

        .page-four-recap-controls {
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 2;
        }

        .page-four-recap-arrows {
          display: flex;
          gap: 7px;
        }

        .page-four-recap-arrows button {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.42);
          background: rgba(255, 255, 255, 0.92);
          color: #111111;
          cursor: pointer;
          font-size: 17px;
          transition: transform 180ms ease, background 180ms ease;
        }

        .page-four-recap-arrows button:last-child {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
        }

        .page-four-recap-arrows button:hover {
          transform: translateY(-1px);
        }


        /* ============================================================
           New content styles below (left/right dashboard redesign). Every colour here is one
           already used above: the mint accent (#b9efcf), the same translucent white borders/
           fills (rgba(255,255,255,X)) and the same dark glass inset (rgba(9,11,25,0.23)).
           ============================================================ */

        .page-four-period-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.78);
        }

        .page-four-period-pill svg {
          transform: rotate(90deg);
        }

        .page-four-value-row {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
        }

        .page-four-metric-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.62);
        }

        .page-four-value-row strong {
          margin-top: 5px;
          font-size: 27px;
          line-height: 1;
          letter-spacing: -0.03em;
          font-weight: 600;
          color: #ffffff;
        }

        .page-four-change {
          margin-top: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #b9efcf;
        }

        .page-four-change-plain {
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
        }

        .page-four-donut-row {
          margin-top: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-four-ring {
          position: relative;
          flex: 0 0 auto;
          width: var(--rs);
          height: var(--rs);
        }

        .page-four-ring svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .page-four-ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .page-four-ring-center strong {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .page-four-ring-center span {
          margin-top: 2px;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.55);
        }

        .page-four-cat-list {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .page-four-cat-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-four-cat-icon {
          flex: 0 0 auto;
          display: inline-flex;
          color: rgba(255, 255, 255, 0.8);
        }

        .page-four-cat-label {
          flex: 1;
          min-width: 0;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.85);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .page-four-cat-amount {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.6);
        }

        .page-four-cat-pct {
          width: 30px;
          text-align: right;
          font-size: 10.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .page-four-timeframes {
          margin-top: 8px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.5);
        }

        .page-four-timeframes span {
          text-align: center;
          padding: 4px 0;
        }

        .page-four-timeframes span.is-active {
          color: #b9efcf;
          font-weight: 700;
        }

        .page-four-summary-grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .page-four-summary-card {
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 12px;
          background: rgba(9, 11, 25, 0.23);
          padding: 9px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .page-four-summary-card span {
          font-size: 8.5px;
          color: rgba(255, 255, 255, 0.55);
        }

        .page-four-summary-card strong {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.02em;
          overflow-wrap: anywhere;
        }

        .page-four-flow-grid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 12px;
        }

        .page-four-flow-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .page-four-flow-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          font-size: 10.5px;
        }

        .page-four-flow-row span {
          color: rgba(255, 255, 255, 0.65);
        }

        .page-four-flow-row strong {
          font-weight: 600;
          color: #ffffff;
        }

        .page-four-save-box {
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 14px;
          background: rgba(9, 11, 25, 0.23);
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .page-four-save-box > span:first-child {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.6);
        }

        .page-four-save-box > strong {
          margin-top: 4px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #b9efcf;
        }

        .page-four-save-box > span:nth-child(3) {
          margin-top: 3px;
          font-size: 9px;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.55);
        }

        .page-four-save-compare {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .page-four-save-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 9.5px;
          font-weight: 600;
        }

        .page-four-save-item-label {
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5) !important;
        }

        .page-four-bar-track {
          flex: 1;
          height: 5px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          overflow: hidden;
        }

        .page-four-bar-fill {
          height: 100%;
          border-radius: 999px;
        }

        .page-four-bar-mint {
          background: #b9efcf;
        }

        .page-four-bar-muted {
          background: rgba(255, 255, 255, 0.45);
        }

        .page-four-insight-strip {
          margin-top: 14px;
          padding-top: 13px;
          border-top: 1px solid rgba(255, 255, 255, 0.11);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .page-four-insight-strip p {
          flex: 1;
          min-width: 0;
          margin: 0;
          font-size: 10.5px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.85);
        }

        .page-four-insight-strip p strong {
          font-weight: 600;
          color: #ffffff;
        }

        .page-four-insight-strip > svg {
          flex: 0 0 auto;
          color: rgba(255, 255, 255, 0.5);
        }

        .page-four-icon-sm {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          font-size: 15px;
        }

        .page-four-right-title {
          margin: 14px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 400;
        }

        .page-four-view-all {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.65);
        }

        .page-four-news-list {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
        }

        .page-four-news-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .page-four-news-row:first-child {
          border-top: 0;
          padding-top: 0;
        }

        .page-four-news-row > svg:last-child {
          margin-top: 3px;
          flex: 0 0 auto;
          color: rgba(255, 255, 255, 0.4);
        }

        .page-four-news-body {
          flex: 1;
          min-width: 0;
        }

        .page-four-news-meta {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.5);
        }

        .page-four-news-body p {
          margin: 4px 0 0;
          font-size: 12px;
          line-height: 1.4;
          font-weight: 500;
          color: #ffffff;
        }

        .page-four-goal-list {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .page-four-goal-row {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .page-four-goal-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
        }

        .page-four-goal-target {
          margin-left: 30px;
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.5);
        }

        .page-four-goal-row .page-four-bar-track {
          margin-left: 30px;
          width: auto;
        }

        .page-four-goal-foot {
          margin-left: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .page-four-goal-foot span:last-child {
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }

        .page-four-score-row {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .page-four-score-value {
          display: block;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .page-four-score-row .page-four-change {
          margin-top: 6px;
        }

        .page-four-metric-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .page-four-metric-tile {
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 12px;
          background: rgba(9, 11, 25, 0.23);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .page-four-metric-tile span {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.65);
        }

        .page-four-metric-tile strong {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        @media (max-width: 520px) {
          .page-four-value-row strong {
            font-size: 23px;
          }

          .page-four-donut-row {
            gap: 10px;
          }

          /* Only the spending donut, not the health-score ring on the right card: the square
             left card is the tight one, with a ring competing for width against a 4-row list
             that has real numbers to show, so it is what needs to give up space here. */
          .page-four-donut-row .page-four-ring {
            --rs: 92px !important;
          }

          .page-four-flow-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 1100px) {
          .page-four-panel {
            min-height: 720px;
            padding-left: 24px;
            padding-right: 24px;
          }

          .page-four-insight-card {
            width: min(100%, 420px);
            height: 420px;
            min-height: 420px;
            max-height: 420px;
          }

          .page-four-recap-card {
            width: min(100%, 316px);
            height: 495px;
            min-height: 495px;
            max-height: 495px;
          }
        }

        @media (max-width: 900px) {
          .page-four-grid {
            grid-template-columns: 1fr;
          }

          .page-four-panel {
            min-height: 760px;
          }
        }

        @media (max-width: 520px) {
          .page-four-section {
            padding: 54px 14px 72px;
          }

          .page-four-panel {
            min-height: 690px;
            border-radius: 22px;
            padding: 46px 18px 22px;
          }

          .page-four-heading h2 {
            font-size: clamp(38px, 11vw, 52px);
          }

          .page-four-heading p {
            font-size: 13px;
            max-width: 330px;
          }

          /* Both cards drop their fixed height/aspect-ratio here. Above 520px the square and
             the tall-rectangle shapes hold because there is room for them, but on a phone the
             cash-flow and financial-health slides in particular run taller than 350px/550px of
             real content (topline + value row + a full donut-or-list block + an insight strip),
             and a fixed height with no overflow rule let that content run straight past the
             card's own rounded border instead of the card growing to hold it. min-height keeps
             the shorter slides from looking collapsed; height:auto lets the taller ones fit. */
          .page-four-insight-card {
            width: min(100%, 350px);
            height: auto;
            min-height: 350px;
            max-height: none;
            aspect-ratio: auto;
            padding: 22px;
          }

          .page-four-recap-card {
            width: min(100%, 292px);
            height: auto;
            min-height: 480px;
            max-height: none;
            padding: 22px 20px 20px;
          }

          .page-four-question-chips button {
            max-width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .page-four-panel-left::before,
          .page-four-panel-right::before,
          .page-four-insight-card,
          .page-four-recap-card,
          .page-four-cursor,
          .page-four-chart-line,
          .page-four-chart-area,
          .page-four-live-label,
          .page-four-mini-bars span {
            animation: none !important;
          }

          .page-four-panel * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="page-four-grid">
        <MoneyOverviewPanel />
        <DailyUpdatesPanel />
      </div>
    </section>
  );
}
