export const CESS = 0.04;
/** TDS threshold on dividend from one company for a resident individual, from 1 April 2025. */
export const TDS_THRESHOLD = 10000;
export const TDS_RATE = 0.10;

/** Effective tax on dividend at a slab rate, including 4% cess (surcharge ignored). */
export function dividendTaxRate(slabPct: number): number {
  return (slabPct / 100) * (1 + CESS);
}

export interface YieldInput {
  dps: number;
  price: number;
  shares: number;
  buyPrice: number;
  slabPct: number;
}

export interface YieldResult {
  yieldPct: number;
  yocPct: number;
  postTaxYieldPct: number;
  annualIncome: number;
  taxAtSlab: number;
  netIncome: number;
  tds: number;
  taxDueAtFiling: number;
  monthlyNet: number;
}

export function calcYield(i: YieldInput): YieldResult {
  const yieldPct = i.price > 0 ? (i.dps / i.price) * 100 : 0;
  const yocPct = i.buyPrice > 0 ? (i.dps / i.buyPrice) * 100 : 0;
  const annualIncome = i.dps * i.shares;
  const taxAtSlab = annualIncome * dividendTaxRate(i.slabPct);
  const netIncome = annualIncome - taxAtSlab;
  const tds = annualIncome > TDS_THRESHOLD ? annualIncome * TDS_RATE : 0;
  return {
    yieldPct,
    yocPct,
    postTaxYieldPct: yieldPct * (1 - dividendTaxRate(i.slabPct)),
    annualIncome,
    taxAtSlab,
    netIncome,
    tds,
    taxDueAtFiling: taxAtSlab - tds,
    monthlyNet: netIncome / 12,
  };
}

export interface IncomeInput {
  invest: number;
  yieldPct: number;
  years: number;
  growthPct: number;
  slabPct: number;
}

export interface IncomeRow {
  year: number;
  yocPct: number;
  gross: number;
  tax: number;
  net: number;
  cumNet: number;
}

export interface IncomeResult {
  rows: IncomeRow[];
  year1Gross: number;
  year1Net: number;
  totalGross: number;
  totalTax: number;
  totalNet: number;
  finalYocPct: number;
  monthlyNetYear1: number;
}

export function calcIncome(i: IncomeInput): IncomeResult {
  const rows: IncomeRow[] = [];
  let cum = 0;
  let totalGross = 0;
  const rate = dividendTaxRate(i.slabPct);
  for (let y = 1; y <= i.years; y++) {
    const yocPct = i.yieldPct * Math.pow(1 + i.growthPct / 100, y - 1);
    const gross = (i.invest * yocPct) / 100;
    const tax = gross * rate;
    const net = gross - tax;
    cum += net;
    totalGross += gross;
    rows.push({ year: y, yocPct, gross, tax, net, cumNet: cum });
  }
  const first = rows[0];
  const last = rows[rows.length - 1];
  return {
    rows,
    year1Gross: first ? first.gross : 0,
    year1Net: first ? first.net : 0,
    totalGross,
    totalTax: rows.reduce((s, r) => s + r.tax, 0),
    totalNet: cum,
    finalYocPct: last ? last.yocPct : 0,
    monthlyNetYear1: first ? first.net / 12 : 0,
  };
}
