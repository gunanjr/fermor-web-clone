/**
 * New tax regime (Section 115BAC) maths for an individual, FY 2025-26 and FY 2026-27 (the slabs
 * are the same in both years).
 *
 * - Standard deduction of Rs 75,000 for salary income.
 * - Employer NPS contribution under 80CCD(2), up to 14% of basic salary plus DA.
 * - Section 87A rebate makes the tax nil up to Rs 12 lakh of taxable income, for residents only,
 *   with marginal relief just above it.
 * - Surcharge of 10% above Rs 50 lakh, 15% above Rs 1 crore and 25% above Rs 2 crore, with
 *   marginal relief at each threshold, then 4% cess.
 * - All income is treated as slab-rate income. Capital gains at special rates are not modelled.
 */
import { NEW_SLABS, NEW_STD_DEDUCTION, SURCHARGE_THRESHOLDS, CESS_RATE, slabTax } from '../surcharge-calculator/surchargeMath';

export const REBATE_LIMIT = 1200000;
export const NPS_CAP_RATE = 0.14;

export type Residency = 'resident' | 'nri';

export interface NewRegimeInput {
  salary: number;
  basicShare: number;
  employerNps: number;
  otherIncome: number;
  taxesPaid: number;
  residency: Residency;
}

export interface SlabRow {
  from: number;
  to: number;
  rate: number;
  income: number;
  tax: number;
}

export interface NewRegimeResult {
  grossIncome: number;
  standardDeduction: number;
  npsDeduction: number;
  npsCap: number;
  taxable: number;
  slabTax: number;
  rebate: number;
  taxAfterRebate: number;
  surchargeRate: number;
  surcharge: number;
  surchargeRelief: number;
  cess: number;
  totalTax: number;
  taxesPaid: number;
  balance: number;
  monthlyTax: number;
  takeHome: number;
  effectiveRate: number;
  marginalRate: number;
  slabs: SlabRow[];
}

const num = (n: number): number => (Number.isFinite(n) && n > 0 ? n : 0);

/** Surcharge rate on tax for a total income under the new regime. Income exactly on a threshold stays in the lower band. */
export function surchargeRateNew(totalIncome: number): number {
  if (totalIncome <= SURCHARGE_THRESHOLDS[0]) return 0;
  if (totalIncome <= SURCHARGE_THRESHOLDS[1]) return 0.10;
  if (totalIncome <= SURCHARGE_THRESHOLDS[2]) return 0.15;
  return 0.25;
}

/** Tax after rebate and its marginal relief, before surcharge and cess. */
export function taxAfterRebate(taxable: number, resident: boolean): { base: number; rebate: number; net: number } {
  const base = slabTax(taxable, NEW_SLABS);
  if (!resident) return { base, rebate: 0, net: base };
  // Up to the limit the rebate wipes out the tax. Just above it, marginal relief caps the tax at the income over the limit.
  const net = taxable <= REBATE_LIMIT ? Math.max(0, base - 60000) : Math.min(base, taxable - REBATE_LIMIT);
  return { base, rebate: base - net, net };
}

/** Tax plus surcharge, before cess, with surcharge marginal relief. */
function taxWithSurcharge(taxable: number, resident: boolean): { net: number; rate: number; surcharge: number; relief: number } {
  const { net } = taxAfterRebate(taxable, resident);
  const rate = surchargeRateNew(taxable);
  const raw = net * rate;
  let relief = 0;
  let lower = 0;
  for (const t of SURCHARGE_THRESHOLDS) if (taxable > t && surchargeRateNew(t) < rate) lower = t;
  if (lower > 0 && raw > 0) {
    const atThreshold = taxAfterRebate(lower, resident).net;
    const thresholdTotal = atThreshold + atThreshold * surchargeRateNew(lower);
    const limit = thresholdTotal + (taxable - lower);
    if (net + raw > limit) relief = Math.min(raw, net + raw - limit);
  }
  return { net, rate, surcharge: raw - relief, relief };
}

export function calcNewRegime(input: NewRegimeInput): NewRegimeResult {
  const salary = num(input.salary);
  const other = num(input.otherIncome);
  const resident = input.residency === 'resident';
  const grossIncome = salary + other;
  const standardDeduction = salary > 0 ? NEW_STD_DEDUCTION : 0;
  const basicShare = Number.isFinite(input.basicShare) ? Math.min(1, Math.max(0, input.basicShare)) : 0;
  const basic = salary * basicShare;
  const npsCap = basic * NPS_CAP_RATE;
  const npsDeduction = Math.min(num(input.employerNps), npsCap);
  const taxable = Math.max(0, grossIncome - standardDeduction - npsDeduction);

  const tr = taxAfterRebate(taxable, resident);
  const ts = taxWithSurcharge(taxable, resident);
  const cess = (ts.net + ts.surcharge) * CESS_RATE;
  const totalTax = ts.net + ts.surcharge + cess;
  const taxesPaid = num(input.taxesPaid);

  const slabs: SlabRow[] = NEW_SLABS.map(s => {
    const income = Math.max(0, Math.min(taxable, s.max) - s.min);
    return { from: s.min, to: s.max, rate: s.rate, income, tax: income * s.rate };
  }).filter(r => r.income > 0);

  // Marginal rate on the next rupee, found by differencing, so rebate and relief zones show correctly.
  const step = 1;
  const next = taxWithSurcharge(taxable + step, resident);
  const nextTotal = (next.net + next.surcharge) * (1 + CESS_RATE);
  const marginalRate = ((nextTotal - totalTax) / step) * 100;

  return {
    grossIncome,
    standardDeduction,
    npsDeduction,
    npsCap,
    taxable,
    slabTax: tr.base,
    rebate: tr.rebate,
    taxAfterRebate: tr.net,
    surchargeRate: ts.rate,
    surcharge: ts.surcharge,
    surchargeRelief: ts.relief,
    cess,
    totalTax,
    taxesPaid,
    balance: totalTax - taxesPaid,
    monthlyTax: totalTax / 12,
    takeHome: grossIncome - totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    marginalRate: Number.isFinite(marginalRate) ? marginalRate : 0,
    slabs,
  };
}
