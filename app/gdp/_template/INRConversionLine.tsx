'use client';

import { useCurrency } from '../../../src/hooks/useCurrency';

const FALLBACK_RATE = 95.4;

export function INRConversionLine({ countryName, gdpUsdBillions, year, pStyle }: {
  countryName: string;
  gdpUsdBillions: number;
  year: number;
  pStyle: React.CSSProperties;
}) {
  // Reuses the same rate table every calculator's currency dropdown already fetches (once a
  // day, cached on api.fermor.in/currency), instead of maintaining a second GDP-only fetch.
  // That table is INR-based (1 INR = rates.USD dollars), so USD-per-INR is its inverse.
  const { rates } = useCurrency();
  const rate = rates?.rates?.USD ? 1 / rates.rates.USD : FALLBACK_RATE;

  const lakhCrore = (gdpUsdBillions * 1e9 * rate) / 1e12;

  // Only this line's own "as of" date moves day to day, not the page's overall "Updated" date:
  // the exchange rate genuinely does refresh daily, but the GDP figures it's converting don't,
  // so the page-level date shouldn't imply a content update that didn't happen.
  const asOfLabel = rates?.lastUpdated
    ? new Date(rates.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <p style={pStyle}>
      In Indian rupees, at approximately Rs {rate.toFixed(2)} per US dollar, {countryName}&apos;s {year} GDP converts to roughly Rs {lakhCrore.toLocaleString('en-IN', { maximumFractionDigits: 1 })} lakh crore.
      {asOfLabel && <span style={{ fontSize: 12.5, color: '#888888' }}> (rate as of {asOfLabel})</span>}
    </p>
  );
}
