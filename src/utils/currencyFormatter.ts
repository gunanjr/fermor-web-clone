import { CurrencyInfo } from "../types/currency";

export function formatCurrencyAmount(
  amount: number,
  currency: CurrencyInfo,
  compactOptions: { useCrL?: boolean } = {}
): string {
  if (currency.code === "INR") {
    if (compactOptions.useCrL) {
      if (amount >= 1e7) return `${currency.symbol}${(amount / 1e7).toFixed(2)} Cr`;
      if (amount >= 1e5) return `${currency.symbol}${(amount / 1e5).toFixed(2)} L`;
    }
    // Standard INR formatting
    return `${currency.symbol}${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(amount))}`;
  }

  // Non-INR formatting
  if (compactOptions.useCrL) {
    // For non-INR, if we requested compact format, we use millions/billions
    if (amount >= 1e9) return `${currency.symbol}${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `${currency.symbol}${(amount / 1e6).toFixed(2)}M`;
  }

  // Use a generic English locale for others, could map correctly to specific locales if needed
  return `${currency.symbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(amount))}`;
}
