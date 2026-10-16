'use client';

import { useCurrency } from '../../../src/hooks/useCurrency';
import { COUNTRY_CURRENCY } from './countryCurrency';

function formatLocal(amount: number, symbol: string): string {
  if (amount >= 1e12) return `${symbol}${(amount / 1e12).toFixed(2)} trillion`;
  if (amount >= 1e9) return `${symbol}${(amount / 1e9).toFixed(2)} billion`;
  if (amount >= 1e6) return `${symbol}${(amount / 1e6).toFixed(2)} million`;
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

export function LocalCurrencyConversionLine({ iso3, countryName, gdpUsdBillions, year, pStyle }: {
  iso3: string;
  countryName: string;
  gdpUsdBillions: number;
  year: number;
  pStyle: React.CSSProperties;
}) {
  const { rates } = useCurrency();
  const currency = COUNTRY_CURRENCY[iso3];

  // Nothing to convert to if: the country's currency isn't tracked by the live feed (South
  // Sudan, Palestine — omitted from COUNTRY_CURRENCY on purpose, not a bug), or the local
  // currency already IS US dollars (the GDP figure is already in that unit, so a "conversion"
  // would be redundant — this covers the US itself and dollarized economies like Ecuador).
  if (!currency || currency.code === 'USD') return null;
  if (!rates?.rates?.[currency.code] || !rates.rates.USD) return null;

  const unitsPerUsd = rates.rates[currency.code] / rates.rates.USD;
  const localAmount = gdpUsdBillions * 1e9 * unitsPerUsd;

  // Same freshness label as INRConversionLine: only this line's own date moves day to day, not
  // the page's overall "Updated" date, since the exchange rate refreshes daily but the GDP
  // figures it's converting don't.
  const asOfLabel = rates?.lastUpdated
    ? new Date(rates.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <p style={pStyle}>
      In {currency.name}, at approximately {currency.symbol}{unitsPerUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} per US dollar, {countryName}&apos;s {year} GDP converts to roughly {formatLocal(localAmount, currency.symbol)}.
      {asOfLabel && <span style={{ fontSize: 12.5, color: '#888888' }}> (rate as of {asOfLabel})</span>}
    </p>
  );
}
