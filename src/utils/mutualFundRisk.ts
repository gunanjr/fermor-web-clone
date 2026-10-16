// Real, category-derived risk tier consistent with SEBI's mandatory product riskometer
// methodology (which is itself category-driven) - not a fabricated per-fund score. Shared between
// the scheme page and the mutual funds screener so both surfaces agree on the same tier for the
// same category.
export function riskProfile(category: string): { tier: string | null; note: string } {
  const c = category.toLowerCase();
  if (c.includes('overnight') || c.includes('liquid') || c.includes('money market'))
    return { tier: 'Low to Moderate', note: 'This category prioritises capital safety and same-day-to-short liquidity over growth, so its typical SEBI riskometer placement is Low to Moderate.' };
  if (c.includes('arbitrage'))
    return { tier: 'Low to Moderate', note: 'Arbitrage funds hedge their equity exposure with offsetting derivative positions, so despite holding equity, they are typically placed Low to Moderate on the riskometer.' };
  if (c.includes('credit risk'))
    return { tier: 'Moderately High to High', note: 'Credit risk funds deliberately hold lower-rated corporate bonds for a yield pickup, so they carry meaningfully higher default risk than other debt categories.' };
  if (c.includes('gilt') || c.includes('dynamic bond') || c.includes('long duration'))
    return { tier: 'Moderate to High', note: 'These funds carry no credit risk but hold long-duration bonds, making them sensitive to interest rate movements.' };
  if (c.includes('banking') && c.includes('psu'))
    return { tier: 'Low to Moderate', note: 'This category invests in relatively higher-credit-quality debt issued by banks and public institutions.' };
  if (c.includes('corporate bond') || c.includes('short duration') || c.includes('low duration') || c.includes('ultra short') || c.includes('floater') || c.includes('medium duration'))
    return { tier: 'Low to Moderate', note: 'Shorter-duration, higher-credit-quality debt categories like this one are typically placed Low to Moderate, though the exact figure depends on the portfolio\'s actual credit mix.' };
  if (c.includes('aggressive hybrid'))
    return { tier: 'Very High', note: 'Aggressive hybrid funds typically hold 65-80% in equity, so most carry a Very High riskometer rating despite the debt allocation.' };
  if (c.includes('equity savings'))
    return { tier: 'Moderately High', note: 'A mix of net equity, arbitrage, and debt brings the volatility down from a pure equity fund, but this category is not low-risk.' };
  if (c.includes('conservative hybrid'))
    return { tier: 'Moderately High', note: 'A debt-majority allocation with a smaller equity sleeve places this category below pure equity funds on the riskometer.' };
  if (c.includes('balanced advantage') || c.includes('dynamic asset'))
    return { tier: null, note: 'Equity allocation here shifts with market valuation, sometimes close to 100% and sometimes far lower, so the riskometer level moves with the fund\'s current stance. Check the latest factsheet for where it sits today.' };
  if (c.includes('multi asset'))
    return { tier: null, note: 'Spreading across three or more asset classes (equity, debt, and typically gold or another commodity) usually softens single-asset volatility, though this is not a low-risk category.' };
  if (c.includes('debt'))
    return { tier: 'Moderate', note: 'Risk within debt categories varies with average maturity and credit quality of the underlying bonds; check the scheme\'s factsheet for its specific riskometer level.' };
  if (c.includes('fund of fund') || c.includes('fof'))
    return { tier: null, note: 'A fund of funds inherits the risk profile of whatever it holds underneath, so its riskometer level depends entirely on the target fund(s), not this category label alone.' };
  if (c.includes('index') || c.includes('etf'))
    return { tier: null, note: 'An index fund or ETF carries essentially the same risk as the index it tracks; an equity index is typically Very High, a debt index considerably lower.' };
  if (c.includes('small cap') || c.includes('mid cap') || c.includes('large cap') || c.includes('flexi cap') || c.includes('multi cap') || c.includes('elss') || c.includes('sectoral') || c.includes('thematic') || c.includes('focused') || c.includes('value') || c.includes('contra') || c.includes('dividend yield') || c.includes('equity'))
    return { tier: 'Very High', note: 'SEBI\'s product riskometer methodology weighs equity allocation and volatility heavily, so pure equity categories including this one are almost universally placed Very High, regardless of market-cap focus.' };
  return { tier: null, note: 'Check this scheme\'s Scheme Information Document (SID) or factsheet for its officially disclosed riskometer level.' };
}

// The fixed set of tiers riskProfile() can return (excluding null), for filter-dropdown options -
// kept as a single source of truth so the filter UI can never offer a tier the function doesn't emit.
export const RISK_TIERS = [
  'Low to Moderate',
  'Moderate',
  'Moderate to High',
  'Moderately High',
  'Moderately High to High',
  'Very High',
] as const;
