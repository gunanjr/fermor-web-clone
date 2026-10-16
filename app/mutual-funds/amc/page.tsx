import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MutualFundsHeader, MutualFundsFooter, MUTUAL_FUNDS_CHROME_CSS } from '../MutualFundsChrome';
import { buildAmcSlug } from '../../../src/utils/mutualFundSlug';
import { getAmcLogo } from '../../../src/utils/amcLogos';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';
const INTER = 'system-ui, -apple-system, sans-serif';

interface AmcRow {
  amcName: string;
  fundCount: number;
}

async function getAmcs(): Promise<AmcRow[]> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/amcs`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.amcs ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const amcs = await getAmcs();
  const description = `Every AMC (Asset Management Company) running mutual funds in India, ${amcs.length || 50}+ fund houses in total. Pick one to see every scheme it runs, with live NAV.`;
  return {
    title: 'All Mutual Fund AMCs in India: Browse by Fund House',
    description,
    keywords: [
      'mutual fund amc list', 'asset management company india', 'list of amc in india',
      'mutual fund houses india', 'amc mutual fund list', 'all mutual fund companies india',
      'sbi mutual fund', 'hdfc mutual fund', 'icici prudential mutual fund', 'nippon india mutual fund',
      'axis mutual fund', 'kotak mahindra mutual fund',
    ],
    alternates: { canonical: 'https://fermor.in/mutual-funds/amc' },
    openGraph: {
      title: 'All Mutual Fund AMCs in India: Browse by Fund House - Fermor',
      description,
      type: 'website',
      url: 'https://fermor.in/mutual-funds/amc',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'All Mutual Fund AMCs in India: Browse by Fund House',
      description,
    },
  };
}

function initials(name: string): string {
  return name.replace(/Mutual Fund$/i, '').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function AmcIndexPage() {
  const amcs = await getAmcs();
  const totalSchemes = amcs.reduce((sum, a) => sum + a.fundCount, 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Mutual Funds', item: 'https://fermor.in/mutual-funds' },
      { '@type': 'ListItem', position: 3, name: 'AMCs', item: 'https://fermor.in/mutual-funds/amc' },
    ],
  };

  const itemListSchema = amcs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mutual Fund AMCs in India',
    itemListElement: amcs.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.amcName,
      url: `https://fermor.in/mutual-funds/amc/${buildAmcSlug(a.amcName)}`,
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}

      <style>{`
        ${MUTUAL_FUNDS_CHROME_CSS}
        .amc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 900px) { .amc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .amc-grid { grid-template-columns: repeat(2, 1fr); } }
        .amc-card { transition: border-color 0.15s ease, transform 0.15s ease; }
        .amc-card:hover { border-color: #2D9970 !important; transform: translateY(-2px); }
      `}</style>

      <div style={{ fontFamily: INTER, background: '#f4f5f6', minHeight: '100vh' }}>
        <MutualFundsHeader />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px 0', font: '13px system-ui,sans-serif', color: '#565c62', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Fermor</Link>
          <span>/</span>
          <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Mutual Funds</Link>
          <span>/</span>
          <span style={{ color: '#101214', fontWeight: 600 }} aria-current="page">AMCs</span>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 8px' }}>
          <h1 style={{ margin: '0 0 8px', font: '700 28px system-ui,sans-serif', color: '#101214', letterSpacing: '-0.02em' }}>
            All Mutual Fund AMCs in India
          </h1>
          <p style={{ margin: 0, font: '14px/1.6 system-ui,sans-serif', color: '#565c62', maxWidth: 720 }}>
            {amcs.length || 50}+ Asset Management Companies run mutual funds in India, together offering {totalSchemes || '2,400+'} Direct Plan, Growth option schemes. Pick a fund house to see every scheme it runs, with live NAV.
          </p>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 56px' }}>
          {amcs.length > 0 ? (
            <div className="amc-grid">
              {amcs.map(amc => (
                <Link
                  key={amc.amcName}
                  href={`/mutual-funds/amc/${buildAmcSlug(amc.amcName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="amc-card"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: '#fff', border: '1px solid #e3e6e8', borderRadius: 12,
                    padding: '14px 16px', textDecoration: 'none',
                  }}
                >
                  {getAmcLogo(amc.amcName) ? (
                    <div style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #e3e6e8', overflow: 'hidden', flexShrink: 0, background: '#fff' }}>
                      <Image src={getAmcLogo(amc.amcName)!} alt="" width={40} height={40} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
                    </div>
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f1f3f4', color: '#1f7a58', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 14px system-ui', flexShrink: 0 }}>
                      {initials(amc.amcName)}
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ font: '600 13.5px/1.3 system-ui,sans-serif', color: '#101214', overflowWrap: 'anywhere' }}>{amc.amcName}</div>
                    <div style={{ font: '11.5px system-ui,sans-serif', color: '#80868c' }}>{amc.fundCount} schemes</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ font: '13.5px system-ui,sans-serif', color: '#80868c' }}>
              The AMC list is temporarily unavailable. Please try again shortly, or use the search on the mutual funds home page.
            </p>
          )}
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{ margin: '0 0 10px', font: '700 18px system-ui,sans-serif', color: '#101214' }}>What is an AMC?</h2>
          <p style={{ margin: '0 0 12px', font: '14px/1.7 system-ui,sans-serif', color: '#565c62' }}>
            An Asset Management Company (AMC) is the entity that actually runs a mutual fund: it pools money from investors and invests it in stocks, bonds, or other securities according to each scheme&apos;s stated objective. Every AMC in India is registered with and regulated by SEBI, and must follow AMFI&apos;s operating guidelines.
          </p>
          <p style={{ margin: 0, font: '14px/1.7 system-ui,sans-serif', color: '#565c62' }}>
            The same AMC usually runs dozens of schemes across categories: equity, debt, hybrid, index, and more. Each scheme also has its own Direct and Regular plans, and Growth or IDCW options, which is why one fund house can have anywhere from a handful to several hundred individual scheme codes on AMFI&apos;s records.
          </p>
        </div>

        <MutualFundsFooter />
      </div>
    </>
  );
}
