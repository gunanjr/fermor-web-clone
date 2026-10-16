import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { fetchGoldPrice } from '../../../../src/lib/metals';
import { supabaseAdmin } from '../../../../src/lib/supabase';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (!auth || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const price = await fetchGoldPrice();
  if (!price) {
    return NextResponse.json({ error: 'Failed to fetch gold price from all sources' }, { status: 502 });
  }

  const { data: prev } = await supabaseAdmin
    .from('commodity_prices')
    .select('price_per_gram_inr')
    .eq('symbol', 'GOLD')
    .order('fetched_at', { ascending: false })
    .limit(1)
    .single();

  const prevGram = prev?.price_per_gram_inr ?? price.price_per_gram_inr;
  const change24h = Math.round((price.price_per_gram_inr - prevGram) * 100) / 100;
  const changePct = prevGram > 0 ? Math.round(((change24h / prevGram) * 100) * 10000) / 10000 : 0;

  const today = new Date().toISOString().split('T')[0];
  const { error } = await supabaseAdmin.from('commodity_prices').insert({
    symbol: price.symbol,
    price_per_gram_inr: price.price_per_gram_inr,
    price_per_10g_inr: price.price_per_10g_inr,
    price_per_tola_inr: price.price_per_tola_inr,
    change_24h: change24h,
    change_pct_24h: changePct,
    source: price.source,
    fetched_at: new Date().toISOString(),
    fetch_date: today,
  });

  if (error) {
    console.error('[cron/fetch-metals] Supabase insert error:', error);
    return NextResponse.json({ error: 'DB insert failed', detail: error.message }, { status: 500 });
  }

  // The standalone /gold page was removed 29 Aug 2026 (see CLAUDE.md "Gold Content");
  // gold-loan-calculator is the real remaining consumer of this data now.
  revalidatePath('/calculators/gold-loan-calculator');
  return NextResponse.json({ ok: true, price_per_gram_inr: price.price_per_gram_inr, source: price.source });
}
