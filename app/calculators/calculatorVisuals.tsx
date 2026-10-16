/**
 * The calculator cards' small decorative visual cues.
 *
 * There are 158 calculators and this is deliberately NOT 158 hand-drawn illustrations. It is a
 * finite set of motifs (one SVG component per shape below) plus a pure classifier,
 * `getVisualType()`, that inspects a calculator's own slug/title and its category to pick one -
 * falling back to a per-category default when no keyword matches. Add a new calculator to
 * src/data/calculators.ts and it gets a sensible motif automatically; nothing here needs to be
 * touched for that to happen. A card only ever renders through <CalculatorVisual>, which is the
 * one place that switches on the resulting type.
 *
 * Every motif takes the card's own accent colour (the alternating green/purple from
 * CalculatorCard.tsx) and draws with it at low opacity - these are meant to read as a quiet
 * texture integrated into the glass, not as a small illustration competing with the title.
 */

export type VisualType =
  | 'growth' | 'bars' | 'percent' | 'coins' | 'bank' | 'pie' | 'gauge'
  | 'timeline' | 'wallet' | 'document' | 'loan' | 'house' | 'gold' | 'insurance' | 'calc';

/* Checked in order, most specific first, so e.g. "gold-loan" resolves to the gold motif rather
   than the generic loan one, and "home-loan-eligibility" resolves to the eligibility gauge rather
   than the plain home-loan bank glyph. A slug/title pair that matches nothing here falls through
   to CATEGORY_DEFAULT below rather than a hand-picked exception. */
const RULES: [RegExp, VisualType][] = [
  [/gold/, 'gold'],
  [/insuranc|floater/, 'insurance'],
  [/comparison|-vs-|compare/, 'bars'],
  [/property|real-estate|home-buying|home-equity|home-maintenance|stamp-duty|down-payment|rental-yield|rental-income/, 'house'],
  [/eligibility|utilization|debt-to-income|credit-health-score/, 'gauge'],
  [/asset-allocation|net-worth|monthly-budget/, 'pie'],
  [/retirement|pension|fire-calculator|epf|vpf|eps-calculator|gratuity|annuity|8th-pay-commission|leave-encashment|lta-calculator/, 'timeline'],
  [/in-hand|ctc|salary|take-home|bonus|appraisal/, 'wallet'],
  [/form16|tax-refund|advance-tax/, 'document'],
  [/mortgage|home-loan|bank-interest/, 'bank'],
  [/emi|loan|debt-|balance-transfer|overdraft|outstanding-loan|credit-card-interest/, 'loan'],
  [/tax|gst|surcharge|\btds\b|80c|80d|percentage|\bapy\b|\bapr\b|rule-of-|money-doubling|dividend-yield/, 'percent'],
  [/fd-|-fd\b|rd-calculator|ppf|nsc-calculator|kvp-calculator|scss|post-office|savings-account|ssy-calculator|interest-calculator|compound-interest/, 'coins'],
  [/sip|mutual-fund|lumpsum|cagr|xirr|wealth-growth|step-up|index-fund|etf|dividend-reinvestment|stock-|future-value|present-value|\bnpv\b|education-corpus|child-education|inflation-adjusted-return|real-return|monthly-investment|savings-growth/, 'growth'],
];

const CATEGORY_DEFAULT: Record<string, VisualType> = {
  investing: 'growth',
  tax: 'percent',
  loans: 'bank',
  retirement: 'timeline',
  tools: 'calc',
  others: 'wallet',
};

export function getVisualType(slug: string, title: string, categoryKey: string): VisualType {
  const s = `${slug} ${title}`.toLowerCase();
  for (const [re, type] of RULES) {
    if (re.test(s)) return type;
  }
  return CATEGORY_DEFAULT[categoryKey] || 'calc';
}

/* ============================================================
   MOTIFS - one small SVG per type, all sized to the same ~56x28 box so they drop into a card's
   footer without needing per-type layout rules. Each draws only with `color` (the card's own
   accent) at partial opacity, plus a neutral, near-invisible structural stroke where a motif
   needs one axis/outline - never a hardcoded brand colour of its own.
   ============================================================ */

function Growth({ color }: { color: string }) {
  return (
    <svg width="52" height="24" viewBox="0 0 52 24" fill="none" aria-hidden="true">
      <path d="M2 20 12 13 20 16 30 6 42 9 50 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity=".75" />
      <circle cx="50" cy="2" r="2.2" fill={color} opacity=".9" />
    </svg>
  );
}

function Bars({ color }: { color: string }) {
  return (
    <svg width="52" height="24" viewBox="0 0 52 24" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="9" height="14" rx="2" fill={color} opacity=".4" />
      <rect x="18" y="3" width="9" height="21" rx="2" fill={color} opacity=".8" />
      <rect x="33" y="13" width="9" height="11" rx="2" fill={color} opacity=".55" />
    </svg>
  );
}

function Percent({ color }: { color: string }) {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.7" opacity=".8" />
      <circle cx="31" cy="17" r="4" stroke={color} strokeWidth="1.7" opacity=".8" />
      <line x1="6" y1="21" x2="34" y2="3" stroke={color} strokeWidth="1.7" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

function Coins({ color }: { color: string }) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-hidden="true">
      <ellipse cx="18" cy="19" rx="14" ry="4" fill={color} opacity=".25" />
      <ellipse cx="18" cy="13.5" rx="14" ry="4" fill={color} opacity=".45" />
      <ellipse cx="18" cy="8" rx="14" ry="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity=".55" opacity=".9" />
    </svg>
  );
}

function Bank({ color }: { color: string }) {
  return (
    <svg width="52" height="24" viewBox="0 0 52 24" fill="none" aria-hidden="true">
      <path d="M2 21h48M6 21v-9M15 21v-9M24 21v-9M33 21v-9M42 21v-9M0 12l26-9 26 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".6" />
    </svg>
  );
}

function Pie({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeOpacity=".12" strokeWidth="4" />
      <circle cx="13" cy="13" r="10" stroke={color} strokeWidth="4" strokeDasharray="24 63" strokeLinecap="round" transform="rotate(-90 13 13)" opacity=".85" />
    </svg>
  );
}

function Gauge({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeOpacity=".12" strokeWidth="3" />
      <circle cx="13" cy="13" r="10" stroke={color} strokeWidth="3" strokeDasharray="47 63" strokeLinecap="round" transform="rotate(-90 13 13)" opacity=".85" />
    </svg>
  );
}

function Timeline({ color }: { color: string }) {
  return (
    <svg width="52" height="16" viewBox="0 0 52 16" fill="none" aria-hidden="true">
      <line x1="3" y1="8" x2="49" y2="8" stroke={color} strokeWidth="1.5" opacity=".35" />
      <circle cx="7" cy="8" r="2.4" fill={color} opacity=".5" />
      <circle cx="26" cy="8" r="2.4" fill={color} opacity=".7" />
      <circle cx="45" cy="8" r="3" fill={color} opacity=".95" />
    </svg>
  );
}

function Wallet({ color }: { color: string }) {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="34" height="18" rx="4" stroke={color} strokeWidth="1.6" opacity=".55" />
      <rect x="23" y="11" width="11" height="7" rx="2" fill={color} opacity=".65" />
    </svg>
  );
}

function DocumentIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
      <rect x="3" y="1" width="22" height="22" rx="2" stroke={color} strokeWidth="1.5" opacity=".55" />
      <line x1="7.5" y1="7.5" x2="20.5" y2="7.5" stroke={color} strokeWidth="1.4" opacity=".65" />
      <line x1="7.5" y1="12" x2="20.5" y2="12" stroke={color} strokeWidth="1.4" opacity=".65" />
      <line x1="7.5" y1="16.5" x2="16" y2="16.5" stroke={color} strokeWidth="1.4" opacity=".65" />
    </svg>
  );
}

function LoanArrows({ color }: { color: string }) {
  return (
    <svg width="46" height="24" viewBox="0 0 46 24" fill="none" aria-hidden="true">
      <path d="M2 8h32M28 3l6 5-6 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
      <path d="M44 17H12M18 12l-6 5 6 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
    </svg>
  );
}

function House({ color }: { color: string }) {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden="true">
      <path d="M3 12 15 2l12 10" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
      <path d="M6.5 11v11h17V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
    </svg>
  );
}

function Gold({ color }: { color: string }) {
  return (
    <svg width="38" height="22" viewBox="0 0 38 22" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="30" height="12" rx="2.5" fill={color} opacity=".3" />
      <rect x="4" y="6" width="30" height="12" rx="2.5" stroke={color} strokeWidth="1.4" opacity=".7" />
      <line x1="4" y1="12" x2="34" y2="12" stroke={color} strokeWidth="1" opacity=".4" />
    </svg>
  );
}

function Insurance({ color }: { color: string }) {
  return (
    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden="true">
      <path d="M12 2 21 5.5v7c0 6.3-3.9 9.5-9 11-5.1-1.5-9-4.7-9-11v-7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity=".55" />
      <path d="M7.5 12.5 10.5 15.5 16.5 9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
    </svg>
  );
}

function CalcGlyph({ color }: { color: string }) {
  return (
    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="20" height="24" rx="3" stroke={color} strokeWidth="1.5" opacity=".5" />
      <rect x="5.5" y="4.5" width="13" height="5.5" rx="1" fill={color} opacity=".3" />
      {[0, 1, 2].map(col => (
        <g key={col}>
          <circle cx={7.5 + col * 4.5} cy={16.5} r="1.4" fill={color} opacity=".65" />
          <circle cx={7.5 + col * 4.5} cy={21} r="1.4" fill={color} opacity=".65" />
        </g>
      ))}
    </svg>
  );
}

const MOTIFS: Record<VisualType, (props: { color: string }) => React.JSX.Element> = {
  growth: Growth,
  bars: Bars,
  percent: Percent,
  coins: Coins,
  bank: Bank,
  pie: Pie,
  gauge: Gauge,
  timeline: Timeline,
  wallet: Wallet,
  document: DocumentIcon,
  loan: LoanArrows,
  house: House,
  gold: Gold,
  insurance: Insurance,
  calc: CalcGlyph,
};

export function CalculatorVisual({ type, color }: { type: VisualType; color: string }) {
  const Motif = MOTIFS[type];
  return <Motif color={color} />;
}
