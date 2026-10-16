import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../src/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const sym = symbol.toUpperCase();
  const days = Math.min(30, Math.max(1, parseInt(req.nextUrl.searchParams.get('days') ?? '7')));

  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('commodity_prices')
    .select('fetch_date,price_per_gram_inr')
    .eq('symbol', sym)
    .gte('fetch_date', sinceStr)
    .order('fetch_date', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  const byDate: Record<string, number[]> = {};
  for (const row of data ?? []) {
    const d = row.fetch_date as string;
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(row.price_per_gram_inr as number);
  }

  const history = Object.entries(byDate).map(([date, prices]) => ({
    date,
    price_per_gram_inr: Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) / 100,
  }));

  const res = NextResponse.json(history);
  res.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res;
}
