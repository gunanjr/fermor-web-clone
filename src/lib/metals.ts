export interface CommoditySnapshot {
  symbol: string;
  price_per_gram_inr: number;
  price_per_10g_inr: number;
  price_per_tola_inr: number;
  change_24h: number;
  change_pct_24h: number;
  source: string;
}

const TROY_OZ_TO_GRAM = 31.1034768;

export async function fetchGoldPrice(): Promise<CommoditySnapshot | null> {
  const primary = await tryMetalsDev();
  if (primary) return primary;
  return tryGoldAPI();
}

async function tryMetalsDev(): Promise<CommoditySnapshot | null> {
  const key = process.env.METALS_DEV_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${key}&currency=INR&unit=g`,
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`Metals.dev HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== 'success') throw new Error('Metals.dev non-success status');
    const g: number = json.metals.gold;
    return {
      symbol: 'GOLD',
      price_per_gram_inr: round2(g),
      price_per_10g_inr: round2(g * 10),
      price_per_tola_inr: round2(g * 11.664),
      change_24h: 0,
      change_pct_24h: 0,
      source: 'metals.dev',
    };
  } catch (err) {
    console.warn('[metals] Metals.dev failed:', err);
    return null;
  }
}

async function tryGoldAPI(): Promise<CommoditySnapshot | null> {
  const key = process.env.GOLDAPI_KEY;
  if (!key) return null;
  try {
    const res = await fetch('https://www.goldapi.io/api/XAU/INR', {
      headers: { 'x-access-token': key },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`GoldAPI HTTP ${res.status}`);
    const json = await res.json();
    const g = json.price / TROY_OZ_TO_GRAM;
    return {
      symbol: 'GOLD',
      price_per_gram_inr: round2(g),
      price_per_10g_inr: round2(g * 10),
      price_per_tola_inr: round2(g * 11.664),
      change_24h: round2((json.ch ?? 0) / TROY_OZ_TO_GRAM),
      change_pct_24h: round4(json.chp ?? 0),
      source: 'goldapi',
    };
  } catch (err) {
    console.warn('[metals] GoldAPI failed:', err);
    return null;
  }
}

function round2(n: number) { return Math.round(n * 100) / 100; }
function round4(n: number) { return Math.round(n * 10000) / 10000; }
