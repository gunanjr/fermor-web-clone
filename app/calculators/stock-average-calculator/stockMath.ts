export interface PurchaseLot {
  id: string;
  qty: number;
  price: number;
}

export interface Position {
  totalShares: number;
  totalInvested: number;
  avgPrice: number;
  currentValue: number;
  pnl: number;
  pnlPct: number;
  lots: { qty: number; price: number; amount: number; pctOfTotal: number }[];
}

export function calcPosition(lots: PurchaseLot[], currentPrice: number): Position {
  const valid = lots.filter(l => l.qty > 0 && l.price > 0);
  const totalShares = valid.reduce((s, l) => s + l.qty, 0);
  const totalInvested = valid.reduce((s, l) => s + l.qty * l.price, 0);
  const avgPrice = totalShares > 0 ? totalInvested / totalShares : 0;
  const currentValue = totalShares * (currentPrice || 0);
  const pnl = currentValue - totalInvested;
  const pnlPct = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;
  return {
    totalShares, totalInvested, avgPrice, currentValue, pnl, pnlPct,
    lots: valid.map(l => ({
      qty: l.qty, price: l.price, amount: l.qty * l.price,
      pctOfTotal: totalInvested > 0 ? (l.qty * l.price / totalInvested) * 100 : 0,
    })),
  };
}

/** New average after buying qty more shares at price. */
export function averageAfterBuy(totalShares: number, totalInvested: number, qty: number, price: number): number {
  const shares = totalShares + qty;
  return shares > 0 ? (totalInvested + qty * price) / shares : 0;
}

/**
 * Whole shares to buy at `price` to move the average to `target`.
 * Returns null when the target cannot be reached at that price
 * (the price must sit on the far side of the target from the current average).
 */
export function sharesForTarget(totalShares: number, totalInvested: number, price: number, target: number): number | null {
  if (totalShares <= 0 || price <= 0 || target <= 0 || price === target) return null;
  const n = (target * totalShares - totalInvested) / (price - target);
  if (!isFinite(n) || n <= 0) return null;
  return Math.ceil(n - 1e-9);
}
