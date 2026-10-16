"use client";

import { useEffect, useRef, useState } from "react";
import { onScrollFrame } from "./scrollScheduler";

type ScenarioType =
  | "retirement"
  | "overspending"
  | "rebalance"
  | "review";

type Phase =
  | "typing"
  | "waiting"
  | "thinking"
  | "answer";

type Scenario = {
  type: ScenarioType;
  question: string;
  answer: string;
};

/* The "type" field only ever selects which Output component below renders it - it is not shown
   anywhere, so it is left as-is even where it no longer matches the new question in name
   ("retirement" -> the investments answer, "rebalance" -> the market answer). Each Output
   component owns its own title, values and disclaimer directly, exactly as it already did. */
const SCENARIOS: Scenario[] = [
  {
    type: "retirement",
    question: "How are my investments performing?",
    answer:
      "Your portfolio value has increased by 6.8% over the last 3 months, led by gains in your mutual funds.",
  },
  {
    type: "overspending",
    question: "Where am i overspending ?",
    answer:
      "Your dining out spend is 42% higher than your 3-month average.",
  },
  {
    type: "rebalance",
    question: "How is the market today?",
    answer:
      "Buoyed by strong banking and IT performance, Indian markets are trading in the green amid positive global cues.",
  },
  {
    type: "review",
    question: "What should i review ?",
    answer:
      "A few areas look worth your attention based on your recent activity and market changes.",
  },
];

/*
 * TIMING
 *
 * Question typing: 38ms per character
 * After typing: 1 second
 * Thinking: 0.9 second
 * Answer: 3 seconds
 * Then next question starts automatically.
 */

const TYPING_SPEED_MS = 38;
const THINKING_DELAY_MS = 1000;
const THINKING_DURATION_MS = 900;
const ANSWER_DURATION_MS = 3000;

/*
 * Synthetic demo data only.
 * No real customer financial data.
 */

const SPENDING_BLUE = [
  30, 34, 38, 35, 40, 37, 43, 40,
  45, 43, 48, 46, 51, 48, 54, 52,
  57, 55, 60, 58, 64, 61, 67, 65,
  71, 69, 75, 72, 79, 76, 84,
];

const SPENDING_GREY = [
  18, 21, 23, 25, 28, 27, 31, 33,
  35, 38, 39, 42, 44, 46, 45, 49,
  51, 50, 54, 53, 57, 56, 59, 61,
  60, 63, 65, 64, 68, 70, 74,
];

function Sparkle({
  size = 42,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="ferm-or-sparkle-gradient"
          x1="4"
          y1="4"
          x2="38"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#668CFF" />
          <stop offset="1" stopColor="#8A68FF" />
        </linearGradient>
      </defs>

      <path
        d="M21 1.5C22.8 11.8 30.2 19.2 40.5 21C30.2 22.8 22.8 30.2 21 40.5C19.2 30.2 11.8 22.8 1.5 21C11.8 19.2 19.2 11.8 21 1.5Z"
        fill="url(#ferm-or-sparkle-gradient)"
      />
    </svg>
  );
}

/*
 * Icons for the four answer cards below. Same line-icon convention already used elsewhere in
 * this file (viewBox 0 0 24 24, stroke="currentColor", no fill), just a wider set of glyphs -
 * the four scenarios cover money, spending, market and review content that the two icons this
 * file already had (the graph-range icons) don't cover.
 */

export function MenuDotsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="5" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="19" r="1.7" fill="currentColor" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UtensilsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3v7a2 2 0 002 2v9M6 3v7M8 3v7M6 10h2M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShoppingBagIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 16v-3l2-5h12l2 5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16h16v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="16" r="0.9" fill="currentColor" />
      <circle cx="16" cy="16" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function DocumentIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LightbulbIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18h6M10 21h4M8 14a5 5 0 116.6 1.7c-.6.5-1 1.1-1.1 1.8v.5H10.5v-.5c-.1-.7-.5-1.3-1.1-1.8A5 5 0 018 14z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BankIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10l9-6 9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 19h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitorIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 6v5c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 11v5c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LightningIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function PieChartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3a9 9 0 109 9h-9V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 3.5A9 9 0 0120.5 9H15V3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function TargetIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function CreditCardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10.5h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TrendUpIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getGraphPointY(
  value: number,
  values: number[],
  height: number,
) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum || 1;

  const normalized =
    (value - minimum) / range;

  return height - normalized * height;
}

function createGraphPath(
  values: number[],
  width: number,
  height: number,
) {
  if (values.length < 2) {
    return "";
  }

  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum || 1;

  const points = values.map(
    (value, index) => {
      const x =
        (index / (values.length - 1)) *
        width;

      const normalized =
        (value - minimum) / range;

      const y =
        height -
        normalized * height;

      return {
        x,
        y,
      };
    },
  );

  let path =
    `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (
    let index = 1;
    index < points.length;
    index += 1
  ) {
    const previous = points[index - 1];
    const current = points[index];

    const midpoint =
      (previous.x + current.x) / 2;

    path +=
      ` C ${midpoint.toFixed(2)} ${previous.y.toFixed(2)},` +
      ` ${midpoint.toFixed(2)} ${current.y.toFixed(2)},` +
      ` ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
  }

  return path;
}

function SpendingGraph() {
  const width = 760;
  const height = 230;

  const bluePath = createGraphPath(
    SPENDING_BLUE,
    width,
    height,
  );

  const greyPath = createGraphPath(
    SPENDING_GREY,
    width,
    height,
  );

  const finalBlue =
    SPENDING_BLUE[
      SPENDING_BLUE.length - 1
    ];

  const finalBlueY =
    getGraphPointY(
      finalBlue,
      SPENDING_BLUE,
      height,
    );

  return (
    <div className="ferm-or-spending-card">
      <div className="ferm-or-spending-header">
        <span className="ferm-or-spending-label">
          SPEND THIS MONTH
        </span>

        <div className="ferm-or-graph-controls">
          <div className="ferm-or-graph-control ferm-or-graph-control-active">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 18V6M4 18H20M7 15L11 11L14 14L20 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="ferm-or-graph-control">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="5"
                width="16"
                height="15"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M8 3V7M16 3V7M4 10H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="ferm-or-graph-divider" />

      <div className="ferm-or-spending-total">
        ₹2,132
      </div>

      <div className="ferm-or-spending-month">
        <span className="ferm-or-blue-dot" />
        <span>May</span>
      </div>

      <div className="ferm-or-chart">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Spending trend"
        >
          <line
            x1="0"
            y1="55"
            x2={width}
            y2="55"
            className="ferm-or-chart-grid"
          />

          <line
            x1="0"
            y1="115"
            x2={width}
            y2="115"
            className="ferm-or-chart-grid"
          />

          <line
            x1="0"
            y1="175"
            x2={width}
            y2="175"
            className="ferm-or-chart-grid"
          />

          <path
            d={greyPath}
            className="ferm-or-grey-line"
          />

          <path
            d={bluePath}
            className="ferm-or-blue-line"
          />

          <circle
            cx={width - 1}
            cy={finalBlueY}
            r="6"
            className="ferm-or-blue-point"
          />
        </svg>
      </div>

      <div className="ferm-or-chart-ranges">
        <span>1W</span>
        <span>1M</span>
        <span>3M</span>
        <span>YTD</span>
        <span>ALL</span>
      </div>
    </div>
  );
}

/*
 * Synthetic demo data only, same as SPENDING_BLUE/SPENDING_GREY above: a rising portfolio
 * value, not a real NAV series.
 */
const PORTFOLIO_TREND = [
  100, 101, 100, 103, 104, 103, 106, 105, 108, 110, 109, 113, 112, 116, 118,
  117, 121, 124, 123, 128, 130, 129, 134, 137, 136, 142, 141, 146, 150, 149,
  156,
];

/* Same path-building utility SpendingGraph uses above, reused rather than duplicated - the only
   real difference here is the line trends up and reads as a gain, not a spend, so it gets the
   existing positive green instead of the existing chart's blue, plus a soft fill under the line
   and a glowing dot at the last point in place of the plain white-ringed one. */
function PerformanceGraph() {
  const width = 760;
  const height = 200;

  const linePath = createGraphPath(PORTFOLIO_TREND, width, height);
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  const lastValue = PORTFOLIO_TREND[PORTFOLIO_TREND.length - 1];
  const lastY = getGraphPointY(lastValue, PORTFOLIO_TREND, height);

  return (
    <div className="ferm-or-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Portfolio performance trend, rising over the last 3 months"
      >
        <defs>
          <linearGradient id="ferm-or-perf-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#269553" stopOpacity="0.22" />
            <stop offset="1" stopColor="#269553" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ferm-or-perf-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#269553" stopOpacity="0.55" />
            <stop offset="1" stopColor="#269553" stopOpacity="0" />
          </radialGradient>
        </defs>

        <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} className="ferm-or-chart-grid" />
        <line x1="0" y1={height * 0.55} x2={width} y2={height * 0.55} className="ferm-or-chart-grid" />
        <line x1="0" y1={height * 0.85} x2={width} y2={height * 0.85} className="ferm-or-chart-grid" />

        <path d={areaPath} fill="url(#ferm-or-perf-area-fill)" stroke="none" />
        <path d={linePath} className="ferm-or-perf-line-path" />

        <circle cx={width - 1} cy={lastY} r="13" fill="url(#ferm-or-perf-glow)" />
        <circle cx={width - 1} cy={lastY} r="5" className="ferm-or-perf-point" />
      </svg>
    </div>
  );
}

const ALLOCATION_ROWS: { label: string; value: string; change: string; positive: boolean }[] = [
  { label: "Mutual Funds", value: "₹10,24,300", change: "+7.4%", positive: true },
  { label: "Stocks", value: "₹5,18,200", change: "+4.1%", positive: true },
  { label: "ETFs", value: "₹2,36,500", change: "+2.8%", positive: true },
  { label: "Others", value: "₹63,300", change: "-1.2%", positive: false },
];

function RetirementOutput({
  answer,
}: {
  answer: string;
}) {
  return (
    <div className="ferm-or-answer-card">
      <div className="ferm-or-answer-topbar">
        <span className="ferm-or-icon-tile">
          <Sparkle size={16} />
        </span>

        <span className="ferm-or-menu-dots">
          <MenuDotsIcon />
        </span>
      </div>

      <p className="ferm-or-answer-title">
        Your investments are up
      </p>

      <p className="ferm-or-answer-text">
        {answer}
      </p>

      <div className="ferm-or-value-row">
        <span className="ferm-or-metric-label">Total value</span>
        <span className="ferm-or-period-pill">
          3M
          <ChevronRightIcon size={11} />
        </span>
      </div>

      <div className="ferm-or-spending-total">₹18,42,300</div>

      <div className="ferm-or-perf-line ferm-or-positive">
        <TrendUpIcon size={14} />
        +6.8% (3M)
      </div>

      <PerformanceGraph />

      <div className="ferm-or-chart-ranges" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>

      <div className="ferm-or-forecast-table">
        {ALLOCATION_ROWS.map((row) => (
          <div className="ferm-or-forecast-row" key={row.label}>
            <span>{row.label}</span>
            <span>{row.value}</span>
            <span className={row.positive ? "ferm-or-positive" : "ferm-or-negative"}>
              {row.change}
            </span>
          </div>
        ))}
      </div>

      <p className="ferm-or-disclaimer">
        Returns are based on current market data and are not guaranteed.
      </p>
    </div>
  );
}

const OVERSPEND_ROWS: { label: string; value: string; change: string; amount: number; Icon: (p: { size?: number }) => React.ReactElement }[] = [
  { label: "Dining out", value: "₹12,480", change: "42%", amount: 12480, Icon: UtensilsIcon },
  { label: "Shopping", value: "₹8,320", change: "18%", amount: 8320, Icon: ShoppingBagIcon },
  { label: "Transport", value: "₹4,260", change: "12%", amount: 4260, Icon: CarIcon },
  { label: "Subscriptions", value: "₹2,980", change: "8%", amount: 2980, Icon: DocumentIcon },
];
const OVERSPEND_MAX = Math.max(...OVERSPEND_ROWS.map((r) => r.amount));

function OverspendingOutput({
  answer,
}: {
  answer: string;
}) {
  return (
    <div className="ferm-or-answer-card">
      <p className="ferm-or-answer-title">
        You&apos;re spending more on dining out
      </p>

      <p className="ferm-or-answer-text">
        {answer}
      </p>

      <div className="ferm-or-spending-card">
        {OVERSPEND_ROWS.map((row, index) => (
          <div
            className="ferm-or-spend-item"
            key={row.label}
            style={index === 0 ? undefined : { borderTop: "1px solid #e7e8eb" }}
          >
            <div className="ferm-or-spend-item-top">
              <span className="ferm-or-icon-tile">
                <row.Icon size={15} />
              </span>

              <span className="ferm-or-spend-item-label">{row.label}</span>
              <span className="ferm-or-spend-item-value">{row.value}</span>
              <span className="ferm-or-negative ferm-or-spend-item-change">
                ↗ {row.change}
              </span>
            </div>

            <div className="ferm-or-progress-track">
              <div
                className="ferm-or-progress-fill"
                style={{
                  width: `${(row.amount / OVERSPEND_MAX) * 100}%`,
                  background: index === 0 ? "#269553" : "#c3c6cb",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="ferm-or-tip-card">
        <span className="ferm-or-icon-tile">
          <LightbulbIcon size={16} />
        </span>

        <p className="ferm-or-answer-text">
          Consider reviewing your dining out expenses to keep them in line with your goals.
        </p>
      </div>

      <p className="ferm-or-disclaimer">
        This insight is based on your connected accounts and is for informational purposes only.
      </p>
    </div>
  );
}

const MARKET_INDICES = [
  { label: "NIFTY 50", value: "24,979.10", change: "+0.62%" },
  { label: "SENSEX", value: "81,721.08", change: "+0.58%" },
  { label: "NIFTY BANK", value: "51,320.45", change: "+0.91%" },
];

const MARKET_SECTORS: { label: string; change: string; Icon: (p: { size?: number }) => React.ReactElement }[] = [
  { label: "Banking", change: "+1.8%", Icon: BankIcon },
  { label: "IT", change: "+1.4%", Icon: MonitorIcon },
  { label: "Auto", change: "+0.9%", Icon: StackIcon },
  { label: "Energy", change: "+0.7%", Icon: LightningIcon },
];

function RebalanceOutput({
  answer,
}: {
  answer: string;
}) {
  return (
    <div className="ferm-or-answer-card">
      <div className="ferm-or-answer-topbar" style={{ justifyContent: "flex-end" }}>
        <span className="ferm-or-live-pill">
          <span className="ferm-or-live-dot" />
          Live
          <span className="ferm-or-live-time">12:32 PM</span>
        </span>
      </div>

      <p className="ferm-or-answer-title">
        Markets are higher today
      </p>

      <p className="ferm-or-answer-text">
        {answer}
      </p>

      <div className="ferm-or-market-grid">
        {MARKET_INDICES.map((row) => (
          <div className="ferm-or-market-card" key={row.label}>
            <span className="ferm-or-metric-label">{row.label}</span>
            <div className="ferm-or-market-value">{row.value}</div>
            <div className="ferm-or-perf-line ferm-or-positive" style={{ fontSize: 12 }}>
              ▲ {row.change}
            </div>
          </div>
        ))}
      </div>

      <div className="ferm-or-output-heading">
        <span>Top performing sectors</span>
      </div>

      <div className="ferm-or-filter-tabs">
        <span className="ferm-or-filter-tab ferm-or-filter-tab-active">Gainers</span>
        <span className="ferm-or-filter-tab">Losers</span>
        <span className="ferm-or-filter-tab">All sectors</span>
      </div>

      <div className="ferm-or-market-grid ferm-or-market-grid-sectors" style={{ gridTemplateColumns: "repeat(4,1fr)", marginTop: 12 }}>
        {MARKET_SECTORS.map((row) => (
          <div className="ferm-or-market-card ferm-or-sector-card" key={row.label}>
            <span className="ferm-or-icon-tile">
              <row.Icon size={14} />
            </span>
            <span className="ferm-or-sector-label">{row.label}</span>
            <span className="ferm-or-positive" style={{ fontSize: 12, fontWeight: 600 }}>
              {row.change}
            </span>
          </div>
        ))}
      </div>

      <div className="ferm-or-tip-card">
        <span className="ferm-or-icon-tile">
          <TrendUpIcon size={16} />
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="ferm-or-review-item-title">How it impacts your portfolio</p>
          <p className="ferm-or-answer-text">
            Your portfolio is up 0.8% today, mainly due to gains in your banking and IT holdings.
          </p>
        </div>

        <ChevronRightIcon size={16} />
      </div>

      <p className="ferm-or-disclaimer">
        Market data is real-time and for informational purposes only.
      </p>
    </div>
  );
}

/* "High impact" is the one row that actually needs the reader's attention, so it takes the
   existing negative red; the other three are lower-urgency and share a neutral muted treatment
   rather than each inventing their own colour. */
const REVIEW_ROWS: {
  title: string;
  desc: string;
  status: string;
  tone: "negative" | "muted";
  Icon: (p: { size?: number }) => React.ReactElement;
}[] = [
  {
    title: "Recurring expenses",
    desc: "3 subscriptions increased in the last 2 months.",
    status: "High impact",
    tone: "negative",
    Icon: CreditCardIcon,
  },
  {
    title: "Portfolio allocation",
    desc: "Your equity allocation is higher than your target range.",
    status: "Review",
    tone: "muted",
    Icon: PieChartIcon,
  },
  {
    title: "Tax planning",
    desc: "Explore potential savings before the financial year ends.",
    status: "Timely",
    tone: "muted",
    Icon: DocumentIcon,
  },
  {
    title: "Goals progress",
    desc: "You're 18% behind on your home purchase goal.",
    status: "Check",
    tone: "muted",
    Icon: TargetIcon,
  },
];

function ReviewOutput({
  answer,
}: {
  answer: string;
}) {
  return (
    <div className="ferm-or-answer-card">
      <p className="ferm-or-answer-title">
        Here&apos;s what to review
      </p>

      <p className="ferm-or-answer-text">
        {answer}
      </p>

      <div className="ferm-or-review-list">
        {REVIEW_ROWS.map((row, index) => (
          <div
            className="ferm-or-review-item"
            key={row.title}
            style={index === 0 ? undefined : { borderTop: "1px solid #e7e8eb" }}
          >
            <span className="ferm-or-icon-tile">
              <row.Icon size={15} />
            </span>

            <div className="ferm-or-review-item-body">
              <p className="ferm-or-review-item-title">{row.title}</p>
              <p className="ferm-or-review-item-desc">{row.desc}</p>
            </div>

            <span className={`ferm-or-status-pill ferm-or-status-${row.tone}`}>
              {row.status}
            </span>

            <ChevronRightIcon size={16} />
          </div>
        ))}
      </div>

      <div className="ferm-or-tip-card">
        <span className="ferm-or-icon-tile">
          <LightbulbIcon size={16} />
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="ferm-or-review-item-title">Not sure where to start?</p>
          <p className="ferm-or-answer-text">
            Ask a follow-up question to dive deeper into any area.
          </p>
        </div>

        <ChevronRightIcon size={16} />
      </div>

      <p className="ferm-or-disclaimer">
        This is for informational purposes only and does not constitute financial advice.
      </p>
    </div>
  );
}

function ScenarioOutput({
  scenario,
}: {
  scenario: Scenario;
}) {
  if (scenario.type === "retirement") {
    return (
      <RetirementOutput
        answer={scenario.answer}
      />
    );
  }

  if (scenario.type === "overspending") {
    return (
      <OverspendingOutput
        answer={scenario.answer}
      />
    );
  }

  if (scenario.type === "rebalance") {
    return (
      <RebalanceOutput
        answer={scenario.answer}
      />
    );
  }

  return (
    <ReviewOutput
      answer={scenario.answer}
    />
  );
}

export default function AskAnything() {
  const [scenarioIndex, setScenarioIndex] =
    useState(0);

  const [question, setQuestion] =
    useState("");

  const [phase, setPhase] =
    useState<Phase>("typing");

  const [starRotation, setStarRotation] =
    useState(0);

  const lastScrollY = useRef(0);

  const scrollRotation = useRef(0);

  const scenario =
    SCENARIOS[scenarioIndex];

  /*
   * TYPE QUESTION
   */

  useEffect(() => {
    if (phase !== "typing") {
      return;
    }

    if (
      question.length >=
      scenario.question.length
    ) {
      setPhase("waiting");
      return;
    }

    const timer =
      window.setTimeout(() => {
        setQuestion(
          scenario.question.slice(
            0,
            question.length + 1,
          ),
        );
      }, TYPING_SPEED_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    phase,
    question,
    scenario.question,
  ]);

  /*
   * WAIT ONE SECOND
   */

  useEffect(() => {
    if (phase !== "waiting") {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setPhase("thinking");
      }, THINKING_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase]);

  /*
   * Rotate the hero sparkle only while the page is being scrolled.
   * No idle animation is used, so the mark remains still at rest.
   */

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    /* On the shared scheduler rather than its own listener, and quantised: this used to call
       setStarRotation on every scroll event, which on a fast wheel is several React renders
       per frame for a rotation nobody can see change by a fraction of a degree. A whole
       degree is the smallest step worth re-rendering for; below that React bails out. */
    let applied = scrollRotation.current;
    return onScrollFrame(({ y }) => {
      const scrollDelta = y - lastScrollY.current;
      if (scrollDelta === 0) return;
      lastScrollY.current = y;
      scrollRotation.current += scrollDelta * 0.65;
      if (Math.abs(scrollRotation.current - applied) < 1) return;
      applied = scrollRotation.current;
      setStarRotation(applied);
    });
  }, []);

  /*
   * THINKING FOR 0.9 SECOND
   */

  useEffect(() => {
    if (phase !== "thinking") {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setPhase("answer");
      }, THINKING_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase]);

  /*
   * ANSWER FOR 3 SECONDS
   */

  useEffect(() => {
    if (phase !== "answer") {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setScenarioIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            SCENARIOS.length,
        );

        setQuestion("");
        setPhase("typing");
      }, ANSWER_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase]);

  return (
    <section
      className="ferm-or-ask-section"
      aria-label="Fermor Ask Anything"
    >
      <div className="ferm-or-container">

        <div
          className="ferm-or-hero-star"
          style={{ transform: `rotate(${starRotation}deg)` }}
        >
          <Sparkle size={48} />
        </div>

        <h2>
          Ask anything
        </h2>

        <p className="ferm-or-description">
          Get clear, personalized answers about
          your money, grounded in your financial
          data in seconds.
        </p>

        <div className="ferm-or-stage">

          <div className="ferm-or-question">
            <div className="ferm-or-question-text">
              {question}

              {phase === "typing" && (
                <span className="ferm-or-cursor" />
              )}
            </div>

            <div
              className="ferm-or-arrow"
              aria-hidden="true"
            >
              ↑
            </div>
          </div>

          {phase === "thinking" && (
            <div className="ferm-or-thinking">
              <Sparkle size={22} />

              <span>
                Thinking...
              </span>
            </div>
          )}

          {phase === "answer" && (
            <ScenarioOutput
              scenario={scenario}
            />
          )}

        </div>
      </div>

      <style jsx global>{`
        .ferm-or-ask-section {
          width: 100%;
          min-height: 980px;
          padding: 112px 24px 128px;
          /* Section 2 is a dark band; the band itself paints the ground. */
          background: transparent;
          color: #f3f4f2;
          overflow: hidden;
          box-sizing: border-box;
        }

        .ferm-or-container {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          text-align: center;
          box-sizing: border-box;
        }

        .ferm-or-hero-star {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          will-change: transform;
        }

        .ferm-or-container h2 {
          margin: 0;
          color: #f7f8f6;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: clamp(
            55px,
            5.3vw,
            74px
          );
          font-style: italic;
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.06em;
        }

        .ferm-or-description {
          max-width: 420px;
          margin: 16px auto 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 17px;
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .ferm-or-stage {
          width: 100%;
          max-width: 460px;
          margin: 96px auto 0;
          text-align: left;
          box-sizing: border-box;
          /* The demo cycles question -> thinking -> answer -> question on a timer, and the
             answer card is ~700px taller than the question alone. Without a reserved box that
             swing was a document-height change every few seconds, with no user input: measured
             as this stage going 70 -> 121 -> 775 -> 70 and the page below it moving by up to
             380px each time. Everything under section 2 shifted, which is what read as the page
             scrolling by itself, and it was also what made the AppPromo curtain jump, because
             the section it measures against kept moving. Reserving the tallest state here lets
             the demo animate inside its own box instead of pushing the rest of the document. */
          min-height: 775px;
        }

        .ferm-or-question {
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 10px 12px 10px 23px;
          border: 1px solid #e2e3e6;
          border-radius: 999px;
          /* White on the dark band, the inverse of what it was on the old white one. */
          background:
            radial-gradient(
              135% 180% at 38% 0%,
              #ffffff 0%,
              #ffffff 44%,
              #f5f6f4 100%
            );
          box-shadow: none;
          box-sizing: border-box;
        }

        .ferm-or-question-text {
          min-width: 0;
          flex: 1;
          color: #111318;
          font-size: 18px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ferm-or-cursor {
          display: inline-block;
          width: 2px;
          height: 25px;
          margin-left: 3px;
          vertical-align: -4px;
          background: #111318;
          animation:
            ferm-or-cursor-blink 0.8s
            steps(1)
            infinite;
        }

        .ferm-or-arrow {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            #26282c 0%,
            #111318 100%
          );
          color: #ffffff;
          font-size: 29px;
          font-weight: 400;
          line-height: 1;
        }

        .ferm-or-thinking {
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 9px;
          margin-top: 7px;
          padding-left: 20px;
          color: rgba(255, 255, 255, 0.58);
          font-size: 15px;
          line-height: 1;
        }

        .ferm-or-answer-card {
          width: 100%;
          margin-top: 22px;
          padding: 24px 20px 22px;
          border: 1px solid #e2e3e6;
          border-radius: 22px;
          background: #ffffff;
          box-shadow: none;
          box-sizing: border-box;
          animation:
            ferm-or-answer-in 0.45s
            ease-out both;
        }

        .ferm-or-answer-text {
          margin: 0;
          color: #181b21;
          font-size: 15px;
          line-height: 1.5;
          letter-spacing: -0.01em;
          overflow-wrap: anywhere;
        }

        .ferm-or-output-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          color: #22252c;
          font-size: 15px;
          font-weight: 600;
        }

        .ferm-or-forecast-table {
          width: 100%;
          margin-top: 14px;
          overflow: hidden;
          border: 1px solid #dedfe2;
          border-radius: 16px;
          box-sizing: border-box;
        }

        .ferm-or-forecast-row {
          min-height: 59px;
          display: grid;
          grid-template-columns:
            1.4fr 1fr 1fr;
          align-items: center;
          column-gap: 16px;
          padding: 0 24px;
          border-top: 1px solid #e7e8ea;
          color: #41464e;
          font-size: 13px;
          box-sizing: border-box;
        }

        .ferm-or-forecast-row:first-child {
          border-top: 0;
        }

        .ferm-or-table-header {
          color: #777c85;
          font-size: 11px;
        }

        .ferm-or-forecast-row span:nth-child(2),
        .ferm-or-forecast-row span:nth-child(3) {
          text-align: right;
        }

        .ferm-or-forecast-row span,
        .ferm-or-rebalance-row span,
        .ferm-or-review-row span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .ferm-or-spending-summary {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-top: 21px;
          color: #3b4048;
          font-size: 14px;
        }

        .ferm-or-spending-summary strong {
          margin-bottom: 2px;
          color: #171a20;
          font-size: 15px;
          font-weight: 600;
        }

        .ferm-or-spending-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          width: 100%;
        }

        .ferm-or-spending-value {
          color: #181b21;
          white-space: nowrap;
        }

        .ferm-or-spending-change {
          color: #d45151;
          font-style: normal;
          font-weight: 400;
          white-space: nowrap;
        }

        .ferm-or-spending-card {
          width: 100%;
          margin-top: 23px;
          padding: 18px 20px 16px;
          border: 1px solid #e0e1e4;
          border-radius: 22px;
          background: #ffffff;
          box-sizing: border-box;
        }

        .ferm-or-spending-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ferm-or-spending-label {
          color: #727781;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.17em;
        }

        .ferm-or-graph-controls {
          display: flex;
          overflow: hidden;
          border: 1px solid #dfe1e4;
          border-radius: 9px;
        }

        .ferm-or-graph-control {
          width: 40px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #69707a;
          background: #ffffff;
          box-sizing: border-box;
        }

        .ferm-or-graph-control + .ferm-or-graph-control {
          border-left: 1px solid #dfe1e4;
        }

        .ferm-or-graph-control-active {
          background: #fafafa;
        }

        .ferm-or-graph-divider {
          width: 100%;
          height: 1px;
          margin-top: 14px;
          background: #e7e8eb;
        }

        .ferm-or-spending-total {
          margin-top: 18px;
          color: #15181e;
          font-size: 32px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        .ferm-or-spending-month {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          color: #707680;
          font-size: 13px;
        }

        .ferm-or-blue-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #2297e8;
        }

        .ferm-or-chart {
          width: 100%;
          height: 210px;
          margin-top: 12px;
        }

        .ferm-or-chart svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
          fill: none;
        }

        .ferm-or-chart-grid {
          stroke: #e7e8eb;
          stroke-width: 1;
          stroke-dasharray: 4 6;
        }

        .ferm-or-grey-line {
          fill: none !important;
          stroke: #a9abb0;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ferm-or-blue-line {
          fill: none !important;
          stroke: #2297e8;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ferm-or-blue-point {
          fill: #2297e8 !important;
          stroke: #ffffff;
          stroke-width: 2;
        }

        .ferm-or-chart-ranges {
          display: grid;
          grid-template-columns:
            repeat(5, 1fr);
          margin-top: 5px;
          color: #747982;
          font-size: 11px;
        }

        .ferm-or-chart-ranges span {
          text-align: center;
        }

        .ferm-or-chart-ranges span:first-child {
          text-align: left;
        }

        .ferm-or-chart-ranges span:last-child {
          text-align: right;
        }

        .ferm-or-rebalance-table {
          width: 100%;
          margin-top: 20px;
          overflow: hidden;
          border: 1px solid #dedfe2;
          border-radius: 16px;
          box-sizing: border-box;
        }

        .ferm-or-rebalance-row {
          min-height: 61px;
          display: grid;
          grid-template-columns:
            1.35fr 1fr 0.85fr 0.85fr;
          align-items: center;
          column-gap: 10px;
          padding: 0 20px;
          border-top: 1px solid #e7e8ea;
          color: #41464e;
          font-size: 12px;
          box-sizing: border-box;
        }

        .ferm-or-rebalance-row:first-child {
          border-top: 0;
        }

        .ferm-or-rebalance-row span:nth-child(2),
        .ferm-or-rebalance-row span:nth-child(3),
        .ferm-or-rebalance-row span:nth-child(4) {
          text-align: right;
        }

        .ferm-or-negative {
          color: #d45151;
        }

        .ferm-or-review-table {
          width: 100%;
          margin-top: 20px;
          overflow: hidden;
          border: 1px solid #dedfe2;
          border-radius: 16px;
          box-sizing: border-box;
        }

        .ferm-or-review-row {
          min-height: 58px;
          display: grid;
          grid-template-columns:
            1.35fr 1fr 1fr;
          align-items: center;
          column-gap: 15px;
          padding: 0 20px;
          border-top: 1px solid #e7e8ea;
          color: #41464e;
          font-size: 13px;
          box-sizing: border-box;
        }

        .ferm-or-review-row:first-child {
          border-top: 0;
        }

        .ferm-or-review-row span:nth-child(2),
        .ferm-or-review-row span:nth-child(3) {
          text-align: right;
        }

        .ferm-or-positive {
          color: #269553;
        }

        /*
         * New answer content below (Ask Anything task): every colour, border, radius and font
         * size here is one already used above - #e2e3e6/#dfe1e4/#e7e8eb borders, #269553
         * positive and #d45151 negative, #777c85/#727781/#41464e text greys, 16-22px radii - so
         * the four new answer cards read as the same system, not a second one next to it.
         */

        .ferm-or-answer-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ferm-or-icon-tile {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e3e6;
          border-radius: 10px;
          background: #fafafa;
          color: #22252c;
          box-sizing: border-box;
        }

        .ferm-or-menu-dots {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8a8f97;
        }

        .ferm-or-answer-title {
          margin: 16px 0 4px;
          color: #14171c;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.28;
        }

        .ferm-or-answer-card > .ferm-or-answer-title:first-child {
          margin-top: 0;
        }

        .ferm-or-value-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
        }

        .ferm-or-metric-label {
          color: #727781;
          font-size: 13px;
        }

        .ferm-or-period-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border: 1px solid #dfe1e4;
          border-radius: 8px;
          color: #41464e;
          font-size: 12px;
          font-weight: 500;
        }

        .ferm-or-period-pill svg {
          transform: rotate(90deg);
        }

        .ferm-or-perf-line {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 14px;
          font-weight: 600;
        }

        .ferm-or-perf-line-path {
          fill: none !important;
          stroke: #269553;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ferm-or-perf-point {
          fill: #269553 !important;
          stroke: #ffffff;
          stroke-width: 2;
        }

        .ferm-or-disclaimer {
          margin: 18px 0 0;
          padding-top: 14px;
          border-top: 1px solid #e7e8eb;
          color: #8a8f97;
          font-size: 11.5px;
          line-height: 1.5;
        }

        .ferm-or-spend-item {
          padding: 12px 0;
        }

        .ferm-or-answer-card > .ferm-or-spending-card > .ferm-or-spend-item:first-child {
          padding-top: 2px;
        }

        .ferm-or-spend-item-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ferm-or-spend-item-label {
          flex: 1;
          min-width: 0;
          color: #181b21;
          font-size: 14px;
          overflow-wrap: anywhere;
        }

        .ferm-or-spend-item-value {
          color: #41464e;
          font-size: 13px;
          white-space: nowrap;
        }

        .ferm-or-spend-item-change {
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .ferm-or-progress-track {
          height: 6px;
          margin-top: 9px;
          margin-left: 44px;
          border-radius: 999px;
          background: #eef0f1;
          overflow: hidden;
        }

        .ferm-or-progress-fill {
          height: 100%;
          border-radius: 999px;
        }

        .ferm-or-tip-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 18px;
          padding: 16px;
          border: 1px solid #e2e3e6;
          border-radius: 16px;
          background: #fafafa;
          box-sizing: border-box;
        }

        .ferm-or-tip-card .ferm-or-answer-text {
          font-size: 13.5px;
        }

        .ferm-or-tip-card svg:last-child {
          flex: 0 0 auto;
          margin-top: 8px;
          color: #8a8f97;
        }

        .ferm-or-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid #e2e3e6;
          border-radius: 999px;
          color: #41464e;
          font-size: 12px;
          font-weight: 500;
        }

        .ferm-or-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #269553;
        }

        .ferm-or-live-time {
          color: #8a8f97;
          font-weight: 400;
        }

        .ferm-or-market-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 16px;
        }

        .ferm-or-market-card {
          padding: 12px;
          border: 1px solid #e2e3e6;
          border-radius: 14px;
          background: #ffffff;
          box-sizing: border-box;
        }

        .ferm-or-market-value {
          margin-top: 4px;
          color: #15181e;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.02em;
          overflow-wrap: anywhere;
        }

        .ferm-or-sector-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ferm-or-sector-label {
          color: #41464e;
          font-size: 12px;
        }

        .ferm-or-filter-tabs {
          display: flex;
          gap: 6px;
          margin-top: 12px;
          overflow-x: auto;
        }

        .ferm-or-filter-tab {
          padding: 6px 12px;
          border: 1px solid #dfe1e4;
          border-radius: 999px;
          color: #69707a;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
        }

        .ferm-or-filter-tab-active {
          border-color: #22252c;
          background: #22252c;
          color: #ffffff;
        }

        .ferm-or-review-list {
          margin-top: 18px;
          padding: 0 18px;
          border: 1px solid #dedfe2;
          border-radius: 16px;
          box-sizing: border-box;
        }

        .ferm-or-review-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 0;
        }

        .ferm-or-review-item-body {
          flex: 1;
          min-width: 0;
        }

        .ferm-or-review-item-title {
          margin: 0;
          color: #181b21;
          font-size: 14px;
          font-weight: 600;
          overflow-wrap: anywhere;
        }

        .ferm-or-review-item-desc {
          margin: 3px 0 0;
          color: #5c626c;
          font-size: 12.5px;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .ferm-or-review-item svg:last-child {
          flex: 0 0 auto;
          margin-top: 3px;
          color: #a9abb0;
        }

        .ferm-or-status-pill {
          flex: 0 0 auto;
          padding: 4px 9px;
          border-radius: 999px;
          font-size: 10.5px;
          font-weight: 600;
          white-space: nowrap;
        }

        .ferm-or-status-negative {
          background: rgba(212, 81, 81, 0.1);
          color: #d45151;
        }

        .ferm-or-status-muted {
          background: rgba(119, 124, 133, 0.12);
          color: #6b7078;
        }

        @keyframes ferm-or-cursor-blink {
          0%,
          48% {
            opacity: 1;
          }

          49%,
          100% {
            opacity: 0;
          }
        }

        @keyframes ferm-or-answer-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .ferm-or-ask-section {
            padding: 85px 20px 100px;
          }

          .ferm-or-container h2 {
            font-size: 72px;
          }

          .ferm-or-stage {
            margin-top: 88px;
          }
        }

        /* --- mobile ---
           The demo was built at desktop proportions and then only lightly trimmed for a phone,
           so the answer card ended up taller than the viewport itself: a 460px-wide stage with a
           775px reserved box, a 54px headline above it and desktop-scale padding, type and charts
           inside it. On a 390x844 screen that is the entire page given over to one card. Every
           number below is the same design at a size that belongs on a phone - narrower stage,
           smaller headline, tighter card padding, a shorter chart - and the reserved height comes
           down with them (see .ferm-or-stage) so the section occupies about a screen instead of
           two. Nothing is restyled; only the dimensions change. */
        @media (max-width: 640px) {
          .ferm-or-ask-section {
            min-height: auto;
            padding: 54px 14px 60px;
          }

          .ferm-or-container h2 {
            font-size: clamp(38px, 11.5vw, 46px);
          }

          .ferm-or-description {
            max-width: 330px;
            margin-top: 14px;
            font-size: 14px;
            line-height: 1.5;
          }

          .ferm-or-stage {
            /* Narrower than the desktop 460px so the card reads as a card on the page rather
               than as the page. The reserved height still has to clear the tallest of the four
               answer cards (the reserve is what stops the page shifting as the demo cycles, see
               the base rule), and it is measured against these smaller numbers, not the desktop
               ones. */
            max-width: 320px;
            /* Measured, not guessed: with the mobile sizes above the tallest of the four answer
               cards renders at 630px, and the stage also has to hold the 58px question pill and
               the 16px gap over it. 710 clears that with a little slack for font-loading
               variance. Undershooting here is what would bring back the page-shifting the
               reserve exists to prevent, so it is checked against a real measurement whenever
               these sizes change. */
            min-height: 710px;
            margin-top: 40px;
          }

          .ferm-or-question {
            min-height: 58px;
            padding: 8px 8px 8px 18px;
          }

          .ferm-or-question-text {
            font-size: 14.5px;
          }

          .ferm-or-arrow {
            width: 42px;
            height: 42px;
            flex-basis: 42px;
            font-size: 21px;
          }

          .ferm-or-cursor {
            height: 20px;
          }

          .ferm-or-thinking {
            min-height: 36px;
            padding-left: 14px;
            font-size: 12.5px;
          }

          .ferm-or-answer-card {
            margin-top: 16px;
            padding: 16px 14px 15px;
            border-radius: 18px;
          }

          .ferm-or-answer-title {
            margin: 12px 0 4px;
            font-size: 15px;
          }

          .ferm-or-icon-tile {
            width: 28px;
            height: 28px;
            border-radius: 8px;
          }

          .ferm-or-value-row {
            margin-top: 14px;
          }

          .ferm-or-disclaimer {
            margin-top: 12px;
            padding-top: 10px;
            font-size: 10.5px;
          }

          .ferm-or-tip-card {
            margin-top: 12px;
            padding: 12px;
            border-radius: 13px;
          }

          .ferm-or-review-list {
            margin-top: 12px;
            padding: 0 13px;
          }

          .ferm-or-review-item {
            gap: 9px;
            padding: 9px 0;
          }

          .ferm-or-review-item-title {
            font-size: 13px;
          }

          .ferm-or-review-item-desc {
            margin-top: 2px;
            font-size: 11.5px;
            line-height: 1.35;
          }

          .ferm-or-status-pill {
            padding: 3px 7px;
            font-size: 10px;
          }

          .ferm-or-perf-line {
            font-size: 13px;
          }

          .ferm-or-chart-ranges {
            font-size: 9px;
          }

          .ferm-or-forecast-table,
          .ferm-or-market-grid {
            margin-top: 12px;
          }

          .ferm-or-answer-text {
            font-size: 13.5px;
          }

          .ferm-or-forecast-row {
            min-height: 38px;
            padding: 0 12px;
            column-gap: 8px;
            font-size: 11px;
          }

          .ferm-or-forecast-row.ferm-or-table-header {
            font-size: 9.5px;
          }

          /* The three index cards keep their 3-across row (there are only three of them, and
             stacking them would waste the vertical room the reserved .ferm-or-stage box
             already budgets for), just with less padding and a slightly smaller value so
             "24,979.10" has room to sit on one line instead of crowding its card. The four
             sector cards drop from 4-across to 2x2: at the full answer-card width divided by
             four, each card was down to roughly 70px of interior space, tight enough that the
             label and the icon tile had nowhere to breathe. The !important flags only override
             the inline 4-column style that RebalanceOutput sets for this specific grid. */
          .ferm-or-market-grid {
            gap: 7px;
          }

          .ferm-or-market-card {
            padding: 9px;
            border-radius: 12px;
          }

          .ferm-or-market-value {
            font-size: 14px;
          }

          .ferm-or-market-grid-sectors {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 7px !important;
          }

          /* The sector cards lay their icon, label and change out in a column on desktop, which
             at 2x2 on a phone cost four stacked rows of vertical space for twelve words. Laid
             out along a row instead they read identically and take roughly a third of the
             height, which is most of what made the market answer the tallest card in the set
             (and therefore what the whole section had to reserve room for). */
          .ferm-or-sector-card {
            flex-direction: row;
            align-items: center;
            gap: 7px;
            padding: 7px 9px;
          }

          .ferm-or-sector-card .ferm-or-icon-tile {
            width: 22px;
            height: 22px;
            border-radius: 7px;
          }

          .ferm-or-sector-label {
            flex: 1 1 auto;
            min-width: 0;
          }

          .ferm-or-output-heading {
            margin-top: 14px;
            font-size: 13.5px;
          }

          .ferm-or-filter-tabs {
            margin-top: 9px;
          }

          .ferm-or-filter-tab {
            padding: 4px 10px;
            font-size: 11px;
          }

          .ferm-or-spending-card {
            margin-top: 14px;
            padding: 12px 12px 10px;
            border-radius: 16px;
          }

          .ferm-or-spending-total {
            margin-top: 12px;
            font-size: 23px;
          }

          .ferm-or-chart {
            height: 92px;
            margin-top: 8px;
          }

          .ferm-or-spend-item {
            padding: 9px 0;
          }

          .ferm-or-progress-track {
            margin-top: 7px;
            margin-left: 38px;
          }

          .ferm-or-chart-ranges {
            font-size: 9px;
          }

          .ferm-or-rebalance-row {
            min-height: 51px;
            padding: 0 9px;
            column-gap: 4px;
            font-size: 8px;
          }

          .ferm-or-rebalance-row.ferm-or-table-header {
            font-size: 7px;
          }

          .ferm-or-review-row {
            min-height: 51px;
            padding: 0 10px;
            column-gap: 5px;
            font-size: 9px;
          }

          .ferm-or-review-row.ferm-or-table-header {
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ferm-or-cursor {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
