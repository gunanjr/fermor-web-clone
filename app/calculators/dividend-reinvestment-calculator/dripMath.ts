/**
 * Dividend reinvestment (DRIP) maths, modelled share by share.
 *
 * - The share price starts at 100 and grows at `apprPct` a year.
 * - The dividend per share starts at `yieldPct` of that price and grows at `divGrowthPct` a year.
 * - Each year's dividend is taxed at the slab rate plus 4% cess, then paid at year end.
 * - DRIP buys more shares with the net dividend at that year-end price.
 * - Without DRIP the net dividend is kept as cash, earning nothing.
 *
 * The comparison is fair: the no-DRIP total counts both the shares and the cash received.
 */

const START_PRICE = 100;
const CESS = 0.04;

export interface DripInput {
  invest: number;
  yieldPct: number;
  divGrowthPct: number;
  apprPct: number;
  years: number;
  slabPct: number;
}

export interface DripRow {
  year: number;
  shares: number;
  grossDividend: number;
  tax: number;
  netReinvested: number;
  dripValue: number;
  noDripStock: number;
  noDripCash: number;
  noDripTotal: number;
  advantage: number;
}

export interface DripResult {
  rows: DripRow[];
  dripFinal: number;
  noDripFinal: number;
  advantage: number;
  advantagePct: number;
  totalGross: number;
  totalTax: number;
  totalNetReinvested: number;
  shareMultiple: number;
  dripCagrPct: number;
  noDripCagrPct: number;
  /** Share of the total DRIP gain that comes from dividends, 0 to 1. */
  dividendGainShare: number;
}

const EMPTY: DripResult = {
  rows: [], dripFinal: 0, noDripFinal: 0, advantage: 0, advantagePct: 0, totalGross: 0, totalTax: 0,
  totalNetReinvested: 0, shareMultiple: 1, dripCagrPct: 0, noDripCagrPct: 0, dividendGainShare: 0,
};

const cagrPct = (final: number, start: number, years: number): number =>
  start > 0 && final > 0 && years > 0 ? (Math.pow(final / start, 1 / years) - 1) * 100 : 0;

export function calcDrip(i: DripInput): DripResult {
  const years = Math.floor(i.years);
  if (!(i.invest > 0) || years < 1) return EMPTY;

  const taxRate = (i.slabPct / 100) * (1 + CESS);
  const startShares = i.invest / START_PRICE;
  const startDps = (i.yieldPct / 100) * START_PRICE;

  let dripShares = startShares;
  let cash = 0;
  let totalGross = 0;
  let totalTax = 0;
  let totalNet = 0;
  const rows: DripRow[] = [];

  for (let year = 1; year <= years; year++) {
    const price = START_PRICE * Math.pow(1 + i.apprPct / 100, year);
    const dps = startDps * Math.pow(1 + i.divGrowthPct / 100, year - 1);

    const grossDividend = dripShares * dps;
    const tax = grossDividend * taxRate;
    const netReinvested = grossDividend - tax;
    dripShares += netReinvested / price;

    const noDripGross = startShares * dps;
    cash += noDripGross * (1 - taxRate);

    totalGross += grossDividend;
    totalTax += tax;
    totalNet += netReinvested;

    const dripValue = dripShares * price;
    const noDripStock = startShares * price;
    rows.push({
      year, shares: dripShares, grossDividend, tax, netReinvested, dripValue,
      noDripStock, noDripCash: cash, noDripTotal: noDripStock + cash, advantage: dripValue - (noDripStock + cash),
    });
  }

  const last = rows[rows.length - 1];
  const totalGain = last.dripValue - i.invest;
  const priceGain = last.noDripStock - i.invest;
  return {
    rows,
    dripFinal: last.dripValue,
    noDripFinal: last.noDripTotal,
    advantage: last.advantage,
    advantagePct: last.noDripTotal > 0 ? (last.advantage / last.noDripTotal) * 100 : 0,
    totalGross,
    totalTax,
    totalNetReinvested: totalNet,
    shareMultiple: dripShares / startShares,
    dripCagrPct: cagrPct(last.dripValue, i.invest, years),
    noDripCagrPct: cagrPct(last.noDripTotal, i.invest, years),
    dividendGainShare: totalGain > 0 ? Math.min(1, Math.max(0, (totalGain - priceGain) / totalGain)) : 0,
  };
}
