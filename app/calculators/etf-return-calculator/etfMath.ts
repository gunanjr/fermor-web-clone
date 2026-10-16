/**
 * ETF return maths.
 *
 * - An ETF's price tracks its NAV, which is already net of the expense ratio, so the net yearly
 *   return of a fund that follows an index is the index return minus the expense ratio.
 * - Brokerage and other charges are one percentage of the trade value, paid on each buy and
 *   again on the sale. Charges on the purchase become part of the cost of acquisition.
 * - SIP instalments are paid at the end of each month at the effective monthly rate
 *   (1 + net)^(1/12) - 1.
 * - Tax is the equity rule for sales on or after 23 July 2024: gains on units held for more than
 *   12 months are taxed at 12.5% above Rs 1.25 lakh a year, and gains on units held 12 months
 *   or less at 20%. Surcharge and cess are not included. Gold and debt ETFs follow other rules.
 */

export const LTCG_RATE = 0.125;
export const STCG_RATE = 0.20;
export const LTCG_EXEMPTION = 125000;

/** Tax on a sale: long-term gain above the exemption at 12.5%, short-term gain at 20%. Losses are not offset. */
export function capitalGainsTax(longTermGain: number, shortTermGain: number, ltcgExemption = LTCG_EXEMPTION): number {
  const exemption = Number.isFinite(ltcgExemption) ? Math.max(0, ltcgExemption) : LTCG_EXEMPTION;
  const lt = Math.max(0, longTermGain - exemption) * LTCG_RATE;
  const st = Math.max(0, shortTermGain) * STCG_RATE;
  return lt + st;
}

const finiteOr = (n: number, fallback = 0): number => (Number.isFinite(n) ? n : fallback);
const growthFactor = (pct: number): number => Math.max(0, 1 + pct / 100);

/** Yearly return in percent from a start and end value, or -100 when nothing is left. */
function cagrPct(end: number, start: number, years: number): number {
  if (!(start > 0) || !(years > 0)) return 0;
  if (!(end > 0)) return -100;
  return finiteOr((Math.pow(end / start, 1 / years) - 1) * 100);
}

/* ── From price ── */
export interface PriceRow {
  year: number;
  value: number;
}

export interface PriceResult {
  rows: PriceRow[];
  invested: number;
  buyCharge: number;
  currentValue: number;
  sellCharge: number;
  totalCharges: number;
  gain: number;
  absoluteReturnPct: number;
  cagrPct: number;
  taxableGain: number;
  tax: number;
  afterTaxValue: number;
  netCagrPct: number;
}

export function calcFromPrice(units: number, buyPrice: number, currentPrice: number, years: number, chargePct: number, ltcgExemption = LTCG_EXEMPTION): PriceResult {
  const empty: PriceResult = { rows: [], invested: 0, buyCharge: 0, currentValue: 0, sellCharge: 0, totalCharges: 0, gain: 0, absoluteReturnPct: 0, cagrPct: 0, taxableGain: 0, tax: 0, afterTaxValue: 0, netCagrPct: 0 };
  if (!(units > 0) || !(buyPrice > 0) || !(currentPrice > 0) || !(years > 0)) return empty;
  const c = Math.max(0, chargePct) / 100;
  const invested = units * buyPrice;
  const currentValue = units * currentPrice;
  const buyCharge = invested * c;
  const sellCharge = currentValue * c;
  const cost = invested + buyCharge;
  const proceeds = currentValue - sellCharge;
  const taxableGain = proceeds - cost;
  const tax = years > 1 ? capitalGainsTax(taxableGain, 0, ltcgExemption) : capitalGainsTax(0, taxableGain, ltcgExemption);
  const afterTaxValue = proceeds - tax;
  // The implied path between the two prices at a steady yearly rate, one row per full year held.
  const rows: PriceRow[] = [];
  for (let year = 1; year <= Math.floor(years); year++) rows.push({ year, value: invested * Math.pow(currentValue / invested, year / years) });
  return {
    rows,
    invested,
    buyCharge,
    currentValue,
    sellCharge,
    totalCharges: buyCharge + sellCharge,
    gain: currentValue - invested,
    absoluteReturnPct: ((currentValue - invested) / invested) * 100,
    cagrPct: cagrPct(currentValue, invested, years),
    taxableGain,
    tax,
    afterTaxValue,
    netCagrPct: cagrPct(afterTaxValue, cost, years),
  };
}

/* ── SIP ── */
export interface SipRow {
  year: number;
  invested: number;
  value: number;
  noChargeValue: number;
}

export interface SipResult {
  rows: SipRow[];
  invested: number;
  finalValue: number;
  noChargeValue: number;
  chargeCost: number;
  netProceeds: number;
  gain: number;
  tax: number;
  afterTaxValue: number;
}

export function calcSip(monthly: number, indexPct: number, expensePct: number, years: number, chargePct: number, ltcgExemption = LTCG_EXEMPTION): SipResult {
  const n = Math.floor(years);
  const empty: SipResult = { rows: [], invested: 0, finalValue: 0, noChargeValue: 0, chargeCost: 0, netProceeds: 0, gain: 0, tax: 0, afterTaxValue: 0 };
  if (!(monthly > 0) || n < 1) return empty;

  const c = Math.max(0, chargePct) / 100;
  const mr = Math.pow(growthFactor(indexPct - expensePct), 1 / 12) - 1;
  const months = n * 12;
  let value = 0;
  let noCharge = 0;
  let invested = 0;
  const rows: SipRow[] = [];

  for (let m = 1; m <= months; m++) {
    value = value * (1 + mr) + monthly * (1 - c);
    noCharge = noCharge * (1 + mr) + monthly;
    invested += monthly;
    if (m % 12 === 0) rows.push({ year: m / 12, invested, value, noChargeValue: noCharge });
  }

  // First-in-first-out: an instalment paid in month m has been held (months - m) months at the sale.
  // Each lot is sold for its grown value less the sale charge, against a cost equal to the instalment.
  let longTermGain = 0;
  let shortTermGain = 0;
  for (let m = 1; m <= months; m++) {
    const proceeds = monthly * (1 - c) * Math.pow(1 + mr, months - m) * (1 - c);
    const gain = proceeds - monthly;
    if (months - m > 12) longTermGain += gain; else shortTermGain += gain;
  }

  const netProceeds = value * (1 - c);
  const tax = capitalGainsTax(longTermGain, shortTermGain, ltcgExemption);
  return {
    rows,
    invested,
    finalValue: value,
    noChargeValue: noCharge,
    chargeCost: noCharge - netProceeds,
    netProceeds,
    gain: netProceeds - invested,
    tax,
    afterTaxValue: netProceeds - tax,
  };
}

/* ── ETF against mutual fund (lumpsum) ── */
export interface CompareRow {
  year: number;
  etfValue: number;
  mfValue: number;
}

export interface CompareInput {
  invest: number;
  etfReturnPct: number;
  etfExpensePct: number;
  mfReturnPct: number;
  mfExpensePct: number;
  years: number;
  chargePct: number;
}

export interface CompareResult {
  rows: CompareRow[];
  etfFinal: number;
  mfFinal: number;
  etfTax: number;
  mfTax: number;
  etfAfterTax: number;
  mfAfterTax: number;
  difference: number;
  etfWins: boolean;
  requiredMfReturnPct: number;
  etfCharges: number;
  etfAfterTaxCagrPct: number;
  mfAfterTaxCagrPct: number;
}

/** ETF values are shown as if sold that year, so they carry the buy and the sell charge. The mutual fund has none. */
export function calcEtfVsMf(p: CompareInput, ltcgExemption = LTCG_EXEMPTION): CompareResult {
  const n = Math.floor(p.years);
  const empty: CompareResult = { rows: [], etfFinal: 0, mfFinal: 0, etfTax: 0, mfTax: 0, etfAfterTax: 0, mfAfterTax: 0, difference: 0, etfWins: false, requiredMfReturnPct: 0, etfCharges: 0, etfAfterTaxCagrPct: 0, mfAfterTaxCagrPct: 0 };
  if (!(p.invest > 0) || n < 1) return empty;

  const c = Math.max(0, p.chargePct) / 100;
  const etfNet = growthFactor(p.etfReturnPct - p.etfExpensePct);
  const mfNet = growthFactor(p.mfReturnPct - p.mfExpensePct);
  const rows: CompareRow[] = [];
  for (let year = 1; year <= n; year++) {
    rows.push({
      year,
      etfValue: p.invest * (1 - c) * Math.pow(etfNet, year) * (1 - c),
      mfValue: p.invest * Math.pow(mfNet, year),
    });
  }
  const last = rows[rows.length - 1];
  const taxOf = (gain: number) => (n > 1 ? capitalGainsTax(gain, 0, ltcgExemption) : capitalGainsTax(0, gain, ltcgExemption));
  const etfTax = taxOf(last.etfValue - p.invest);
  const mfTax = taxOf(last.mfValue - p.invest);

  // The mutual fund's net yearly return that ties with the ETF, then its gross return before the ratio.
  const tieNet = Math.pow((1 - c) * (1 - c), 1 / n) * etfNet - 1;
  return {
    rows,
    etfFinal: last.etfValue,
    mfFinal: last.mfValue,
    etfTax,
    mfTax,
    etfAfterTax: last.etfValue - etfTax,
    mfAfterTax: last.mfValue - mfTax,
    difference: last.etfValue - last.mfValue,
    etfWins: last.etfValue > last.mfValue,
    requiredMfReturnPct: finiteOr(tieNet * 100 + p.mfExpensePct),
    etfCharges: p.invest * c + p.invest * (1 - c) * Math.pow(etfNet, n) * c,
    etfAfterTaxCagrPct: cagrPct(last.etfValue - etfTax, p.invest, n),
    mfAfterTaxCagrPct: cagrPct(last.mfValue - mfTax, p.invest, n),
  };
}
