import { NextRequest, NextResponse } from 'next/server';
import { decodeGSTIN } from '../../../../../src/utils/gstin';

export const dynamic = 'force-dynamic';

interface GstinCheckResponse {
  flag: boolean;
  message: string;
  data?: {
    gstin: string;
    lgnm: string;
    tradeNam: string;
    sts: string;
    rgdt: string;
    ctb: string;
    dty: string;
    nba: string[];
    stj: string;
    ctj: string;
    cxdt: string;
    lstupdt: string;
    einvoiceStatus?: string;
    pradr?: {
      addr?: {
        bno?: string; bnm?: string; st?: string; loc?: string;
        city?: string; dst?: string; stcd?: string; pncd?: string;
      };
    };
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ gstin: string }> }
) {
  const { gstin: rawGstin } = await params;
  const gstin = rawGstin.toUpperCase().trim();

  const decoded = decodeGSTIN(gstin);
  if (!decoded.valid) {
    return NextResponse.json({ error: 'invalid_format', details: decoded.errors }, { status: 400 });
  }

  const apiKey = process.env.GSTIN_CHECK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'lookup_unavailable' }, { status: 503 });
  }

  try {
    const upstream = await fetch(`https://sheet.gstincheck.co.in/check/${apiKey}/${gstin}`, {
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'lookup_unavailable' }, { status: 502 });
    }

    const body: GstinCheckResponse = await upstream.json();

    if (!body.flag || !body.data) {
      return NextResponse.json({ error: 'not_found', message: body.message }, { status: 404 });
    }

    const d = body.data;
    const addr = d.pradr?.addr;
    const addressParts = addr
      ? [addr.bno, addr.bnm, addr.st, addr.loc, addr.city, addr.dst, addr.stcd, addr.pncd].filter(Boolean)
      : [];

    const result = {
      gstin: d.gstin,
      legalName: d.lgnm,
      tradeName: d.tradeNam,
      status: d.sts,
      registrationDate: d.rgdt,
      constitutionOfBusiness: d.ctb,
      taxpayerType: d.dty,
      natureOfBusiness: d.nba,
      stateJurisdiction: d.stj,
      centreJurisdiction: d.ctj,
      cancellationDate: d.cxdt || null,
      lastUpdated: d.lstupdt || null,
      eInvoiceEnabled: d.einvoiceStatus === 'Yes',
      address: addressParts.join(', ') || null,
    };

    // GSTIN registration details change rarely; cache aggressively at the CDN edge
    // to preserve the limited verification API quota across repeat/shared traffic.
    const res = NextResponse.json({ source: 'live', data: result });
    res.headers.set('Cache-Control', 's-maxage=604800, stale-while-revalidate=2592000');
    return res;
  } catch {
    return NextResponse.json({ error: 'lookup_unavailable' }, { status: 502 });
  }
}
