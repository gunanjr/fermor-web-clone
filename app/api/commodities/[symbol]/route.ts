import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../src/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const sym = symbol.toUpperCase();

  const { data, error } = await supabase
    .from('commodity_prices')
    .select('symbol,price_per_gram_inr,price_per_10g_inr,price_per_tola_inr,change_24h,change_pct_24h,source,fetched_at,fetch_date')
    .eq('symbol', sym)
    .order('fetched_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'No data available' }, { status: 404 });
  }

  const res = NextResponse.json(data);
  res.headers.set('Cache-Control', 's-maxage=900, stale-while-revalidate=86400');
  return res;
}
