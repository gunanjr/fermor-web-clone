import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MutualFundsHeader, MutualFundsFooter, MUTUAL_FUNDS_CHROME_CSS } from '../../MutualFundsChrome';
import { buildSchemeSlug } from '../../../../src/utils/mutualFundSlug';
import { getAmcLogo } from '../../../../src/utils/amcLogos';
import { AmcFundTable, type AmcFundRow } from './AmcFundTable';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';
const INTER = 'system-ui, -apple-system, sans-serif';

interface AmcDetail {
  amcName: string;
  fundCount: number;
  funds: AmcFundRow[];
}

async function getAmc(amcSlug: string): Promise<AmcDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/amc/${amcSlug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ amcSlug: string }> }): Promise<Metadata> {
  const { amcSlug } = await params;
  const amc = await getAmc(amcSlug);
  if (!amc) return { title: 'AMC Not Found' };

  const title = `${amc.amcName}: All Schemes & Live NAV`;
  const description = `${amc.amcName} runs ${amc.fundCount} Direct Plan, Growth option mutual fund schemes. See live NAV and 1-year returns for every one, sourced from AMFI.`;
  return {
    title,
    description,
    keywords: [
      amc.amcName, `${amc.amcName} schemes`, `${amc.amcName} nav`, `${amc.amcName} mutual funds list`,
      'mutual fund amc', 'asset management company india',
    ],
    alternates: { canonical: `https://fermor.in/mutual-funds/amc/${amcSlug}` },
    openGraph: { title, description, type: 'website', url: `https://fermor.in/mutual-funds/amc/${amcSlug}` },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function initials(name: string): string {
  return name.replace(/Mutual Fund$/i, '').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function AmcDetailPage({ params }: { params: Promise<{ amcSlug: string }> }) {
  const { amcSlug } = await params;
  const amc = await getAmc(amcSlug);
  if (!amc) notFound();

  const pageUrl = `https://fermor.in/mutual-funds/amc/${amcSlug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Mutual Funds', item: 'https://fermor.in/mutual-funds' },
      { '@type': 'ListItem', position: 3, name: 'AMCs', item: 'https://fermor.in/mutual-funds/amc' },
      { '@type': 'ListItem', position: 4, name: amc.amcName, item: pageUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${amc.amcName} - All Schemes`,
    description: `Every Direct Plan, Growth option scheme run by ${amc.amcName}, with live NAV and 1-year returns.`,
    url: pageUrl,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
    publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${amc.amcName} schemes`,
    itemListElement: amc.funds.slice(0, 200).map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: f.schemeName,
      url: `https://fermor.in/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <style>{MUTUAL_FUNDS_CHROME_CSS}</style>

      <div style={{ fontFamily: INTER, background: '#f4f5f6', minHeight: '100vh' }}>
        <MutualFundsHeader />

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '14px 24px 0', font: '13px system-ui,sans-serif', color: '#565c62', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Fermor</Link>
          <span>/</span>
          <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Mutual Funds</Link>
          <span>/</span>
          <Link href="/mutual-funds/amc" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>AMCs</Link>
          <span>/</span>
          <span style={{ color: '#101214', fontWeight: 600, overflowWrap: 'anywhere' }} aria-current="page">{amc.amcName}</span>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 24px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            {getAmcLogo(amc.amcName) ? (
              <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid #e3e6e8', overflow: 'hidden', flexShrink: 0, background: '#fff' }}>
                <Image src={getAmcLogo(amc.amcName)!} alt="" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
              </div>
            ) : (
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f1f3f4', color: '#1f7a58', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 17px system-ui', flexShrink: 0 }}>
                {initials(amc.amcName)}
              </div>
            )}
            <h1 style={{ margin: 0, font: '700 26px system-ui,sans-serif', color: '#101214', letterSpacing: '-0.02em' }}>
              {amc.amcName}
            </h1>
          </div>
          <p style={{ margin: '0 0 24px', font: '14px/1.6 system-ui,sans-serif', color: '#565c62', maxWidth: 720 }}>
            {amc.fundCount} Direct Plan, Growth option schemes on record, sourced from AMFI and refreshed daily. NAV and 1-year returns shown below are computed the same way as on each scheme&apos;s own page.
          </p>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 64px' }}>
          <AmcFundTable funds={amc.funds} />
        </div>

        <MutualFundsFooter />
      </div>
    </>
  );
}
