export type Regime = 'new' | 'old';
export type AgeGroup = 'below60' | 'senior' | 'superSenior';

export interface Slab { min: number; max: number; rate: number }

/** New regime slabs, unchanged for FY 2026-27 (AY 2027-28). */
export const NEW_SLABS: Slab[] = [
  { min: 0,       max: 400000,   rate: 0 },
  { min: 400000,  max: 800000,   rate: 0.05 },
  { min: 800000,  max: 1200000,  rate: 0.10 },
  { min: 1200000, max: 1600000,  rate: 0.15 },
  { min: 1600000, max: 2000000,  rate: 0.20 },
  { min: 2000000, max: 2400000,  rate: 0.25 },
  { min: 2400000, max: Infinity, rate: 0.30 },
];

export const OLD_SLABS: Record<AgeGroup, Slab[]> = {
  below60: [
    { min: 0,       max: 250000,   rate: 0 },
    { min: 250000,  max: 500000,   rate: 0.05 },
    { min: 500000,  max: 1000000,  rate: 0.20 },
    { min: 1000000, max: Infinity, rate: 0.30 },
  ],
  senior: [
    { min: 0,       max: 300000,   rate: 0 },
    { min: 300000,  max: 500000,   rate: 0.05 },
    { min: 500000,  max: 1000000,  rate: 0.20 },
    { min: 1000000, max: Infinity, rate: 0.30 },
  ],
  superSenior: [
    { min: 0,       max: 500000,   rate: 0 },
    { min: 500000,  max: 1000000,  rate: 0.20 },
    { min: 1000000, max: Infinity, rate: 0.30 },
  ],
};

export const NEW_STD_DEDUCTION = 75000;
export const OLD_STD_DEDUCTION = 50000;
export const SURCHARGE_THRESHOLDS = [5000000, 10000000, 20000000, 50000000];
export const CESS_RATE = 0.04;

export function slabTax(income: number, slabs: Slab[]): number {
  let tax = 0;
  for (const s of slabs) {
    if (income <= s.min) break;
    tax += (Math.min(income, s.max) - s.min) * s.rate;
  }
  return tax;
}

/** Surcharge rate on tax for a total income. Income exactly on a threshold stays in the lower band. */
export function surchargeRate(totalIncome: number, regime: Regime, special: boolean): number {
  if (totalIncome <= 5000000) return 0;
  if (totalIncome <= 10000000) return 0.10;
  if (totalIncome <= 20000000) return 0.15;
  if (special) return 0.15;
  if (totalIncome <= 50000000) return 0.25;
  return regime === 'new' ? 0.25 : 0.37;
}

/** Slab tax on regular income after the Section 87A rebate and its marginal relief. */
export function regularTax(taxableRegular: number, regime: Regime, age: AgeGroup): number {
  const slabs = regime === 'new' ? NEW_SLABS : OLD_SLABS[age];
  const base = slabTax(taxableRegular, slabs);
  if (regime === 'new') {
    if (taxableRegular <= 1200000) return 0;
    return Math.min(base, taxableRegular - 1200000);
  }
  return taxableRegular <= 500000 ? 0 : base;
}

export interface SurchargeInput {
  taxableRegular: number;
  special: number;
  specialRate: number;
  regime: Regime;
  age: AgeGroup;
}

export interface SurchargeResult {
  totalIncome: number;
  regularTaxAmt: number;
  specialTaxAmt: number;
  baseTax: number;
  regRate: number;
  specRate: number;
  rawSurcharge: number;
  relief: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  lowerThreshold: number;
  nextThreshold: number;
}

export function computeSurcharge(p: SurchargeInput): SurchargeResult {
  const { taxableRegular, special, specialRate, regime, age } = p;
  const totalIncome = taxableRegular + special;
  const regularTaxAmt = regularTax(taxableRegular, regime, age);
  const specialTaxAmt = special * specialRate;
  const baseTax = regularTaxAmt + specialTaxAmt;

  const regRate = surchargeRate(totalIncome, regime, false);
  const specRate = surchargeRate(totalIncome, regime, true);
  const rawSurcharge = regularTaxAmt * regRate + specialTaxAmt * specRate;

  let lowerThreshold = 0;
  for (const t of SURCHARGE_THRESHOLDS) if (totalIncome > t) lowerThreshold = t;
  const nextThreshold = SURCHARGE_THRESHOLDS.find(t => totalIncome <= t) ?? 0;

  let relief = 0;
  if (lowerThreshold > 0 && rawSurcharge > 0) {
    // Income above the threshold is taken off regular income first, then special income.
    const excess = totalIncome - lowerThreshold;
    const tRegular = Math.max(0, taxableRegular - excess);
    const tSpecial = Math.max(0, special - Math.max(0, excess - taxableRegular));
    const tRegTax = regularTax(tRegular, regime, age);
    const tSpecTax = tSpecial * specialRate;
    const tSurcharge = tRegTax * surchargeRate(lowerThreshold, regime, false)
      + tSpecTax * surchargeRate(lowerThreshold, regime, true);
    const allowedTotal = tRegTax + tSpecTax + tSurcharge + excess;
    const actualTotal = baseTax + rawSurcharge;
    if (actualTotal > allowedTotal) relief = Math.min(rawSurcharge, actualTotal - allowedTotal);
  }

  const surcharge = rawSurcharge - relief;
  const cess = (baseTax + surcharge) * CESS_RATE;
  const totalTax = baseTax + surcharge + cess;
  const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;
  return {
    totalIncome, regularTaxAmt, specialTaxAmt, baseTax, regRate, specRate,
    rawSurcharge, relief, surcharge, cess, totalTax, effectiveRate, lowerThreshold, nextThreshold,
  };
}
