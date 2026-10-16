/**
 * Index fund return maths.
 *
 * - An index fund NAV is already net of its expense ratio, so the net yearly return is the
 *   index return minus the expense ratio.
 * - SIP instalments are paid at the end of each month at the effective monthly rate
 *   (1 + net)^(1/12) - 1, and the instalment can step up once a year.
 * - Tax is the equity-fund rule for sales on or after 23 July 2024: gains on units held for
 *   more than 12 months are taxed at 12.5% above Rs 1.25 lakh a year, and gains on units held
 *   12 months or less at 20%. Surcharge and cess are not included.
 */

export const LTCG_RATE = 0.125;
export const STCG_RATE = 0.20;
export const LTCG_EXEMPTION = 125000;

/** Net yearly return in percent after the expense ratio. */
export const netReturnPct = (indexPct: number, expensePct: number): number => indexPct - expensePct;

/** Tax on a sale: long-term gain above the exemption at 12.5%, short-term gain at 20%. Losses are not offset. */
export function capitalGainsTax(longTermGain: number, shortTermGain: number, ltcgExemption = LTCG_EXEMPTION): number {
  const exemption = Number.isFinite(ltcgExemption) ? Math.max(0, ltcgExemption) : LTCG_EXEMPTION;
  const lt = Math.max(0, longTermGain - exemption) * LTCG_RATE;
  const st = Math.max(0, shortTermGain) * STCG_RATE;
  return lt + st;
}

const finiteOr = (n: number, fallback = 0): number => (Number.isFinite(n) ? n : fallback);
const growthFactor = (pct: number): number => Math.max(0, 1 + pct / 100);

/* ── Lumpsum ── */
export interface LumpsumRow {
  year: number;
  netValue: number;
  noFeeValue: number;
  feeDrag: number;
}

export interface LumpsumResult {
  rows: LumpsumRow[];
  finalValue: number;
  noFeeValue: number;
  feeCost: number;
  gain: number;
  tax: number;
  afterTaxValue: number;
  netCagrPct: number;
}

export function calcLumpsum(invest: number, indexPct: number, expensePct: number, years: number, ltcgExemption = LTCG_EXEMPTION): LumpsumResult {
  const n = Math.floor(years);
  const empty: LumpsumResult = { rows: [], finalValue: 0, noFeeValue: 0, feeCost: 0, gain: 0, tax: 0, afterTaxValue: 0, netCagrPct: 0 };
  if (!(invest > 0) || n < 1) return empty;

  const net = growthFactor(netReturnPct(indexPct, expensePct));
  const gross = growthFactor(indexPct);
  const rows: LumpsumRow[] = [];
  for (let year = 1; year <= n; year++) {
    const netValue = invest * Math.pow(net, year);
    const noFeeValue = invest * Math.pow(gross, year);
    rows.push({ year, netValue, noFeeValue, feeDrag: noFeeValue - netValue });
  }
  const last = rows[rows.length - 1];
  const gain = last.netValue - invest;
  const tax = n > 1 ? capitalGainsTax(gain, 0, ltcgExemption) : capitalGainsTax(0, gain, ltcgExemption);
  return {
    rows,
    finalValue: last.netValue,
    noFeeValue: last.noFeeValue,
    feeCost: last.feeDrag,
    gain,
    tax,
    afterTaxValue: last.netValue - tax,
    netCagrPct: finiteOr((Math.pow(last.netValue / invest, 1 / n) - 1) * 100),
  };
}

/* ── SIP ── */
export interface SipRow {
  year: number;
  monthlySip: number;
  invested: number;
  value: number;
  noFeeValue: number;
}

export interface SipResult {
  rows: SipRow[];
  invested: number;
  finalValue: number;
  noFeeValue: number;
  feeCost: number;
  gain: number;
  tax: number;
  afterTaxValue: number;
  finalYearSip: number;
}

export function calcSip(monthly: number, stepUpPct: number, indexPct: number, expensePct: number, years: number, ltcgExemption = LTCG_EXEMPTION): SipResult {
  const n = Math.floor(years);
  const empty: SipResult = { rows: [], invested: 0, finalValue: 0, noFeeValue: 0, feeCost: 0, gain: 0, tax: 0, afterTaxValue: 0, finalYearSip: 0 };
  if (!(monthly > 0) || n < 1) return empty;

  const mrNet = Math.pow(growthFactor(netReturnPct(indexPct, expensePct)), 1 / 12) - 1;
  const mrGross = Math.pow(growthFactor(indexPct), 1 / 12) - 1;
  const months = n * 12;
  let value = 0;
  let noFee = 0;
  let invested = 0;
  let shortTermGain = 0;
  let longTermGain = 0;
  const rows: SipRow[] = [];

  for (let m = 1; m <= months; m++) {
    const year = Math.ceil(m / 12);
    const sip = monthly * Math.pow(1 + stepUpPct / 100, year - 1);
    value = value * (1 + mrNet) + sip;
    noFee = noFee * (1 + mrGross) + sip;
    invested += sip;
    if (m % 12 === 0) rows.push({ year, monthlySip: sip, invested, value, noFeeValue: noFee });
  }

  // First-in-first-out: an instalment paid in month m has been held (months - m) months at the sale.
  for (let m = 1; m <= months; m++) {
    const year = Math.ceil(m / 12);
    const sip = monthly * Math.pow(1 + stepUpPct / 100, year - 1);
    const gain = sip * (Math.pow(1 + mrNet, months - m) - 1);
    if (months - m > 12) longTermGain += gain; else shortTermGain += gain;
  }

  const tax = capitalGainsTax(longTermGain, shortTermGain, ltcgExemption);
  return {
    rows,
    invested,
    finalValue: value,
    noFeeValue: noFee,
    feeCost: noFee - value,
    gain: value - invested,
    tax,
    afterTaxValue: value - tax,
    finalYearSip: monthly * Math.pow(1 + stepUpPct / 100, n - 1),
  };
}

/* ── From NAV ── */
export interface NavRow {
  year: number;
  value: number;
}

export interface NavResult {
  rows: NavRow[];
  units: number;
  currentValue: number;
  gain: number;
  absoluteReturnPct: number;
  cagrPct: number;
  tax: number;
  afterTaxValue: number;
}

export function calcFromNav(invest: number, buyNav: number, currentNav: number, years: number, ltcgExemption = LTCG_EXEMPTION): NavResult {
  const empty: NavResult = { rows: [], units: 0, currentValue: 0, gain: 0, absoluteReturnPct: 0, cagrPct: 0, tax: 0, afterTaxValue: 0 };
  if (!(invest > 0) || !(buyNav > 0) || !(currentNav > 0) || !(years > 0)) return empty;
  const units = invest / buyNav;
  const currentValue = units * currentNav;
  const gain = currentValue - invest;
  const tax = years > 1 ? capitalGainsTax(gain, 0, ltcgExemption) : capitalGainsTax(0, gain, ltcgExemption);
  // The implied path between the two NAVs at a steady yearly rate, one row per full year held.
  const rows: NavRow[] = [];
  for (let year = 1; year <= Math.floor(years); year++) rows.push({ year, value: invest * Math.pow(currentNav / buyNav, year / years) });
  return {
    rows,
    units,
    currentValue,
    gain,
    absoluteReturnPct: (gain / invest) * 100,
    cagrPct: finiteOr((Math.pow(currentNav / buyNav, 1 / years) - 1) * 100),
    tax,
    afterTaxValue: currentValue - tax,
  };
}
