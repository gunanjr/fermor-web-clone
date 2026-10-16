import type { Metadata } from 'next';
import { SubNav } from '../../components/SubNav';
import { RegulatoryUpdatesClient, GovUpdate } from './RegulatoryUpdatesClient';
import { Footer } from '../_home/Footer';
import { DISCOVERY_COLUMNS } from '../../src/components/common/footerLinks';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';

export const metadata: Metadata = {
  title: 'Regulatory Updates: Live SEBI & Income Tax Circular Tracker',
  description: 'A live feed of new circulars, notices and press releases detected on the official SEBI and Income Tax Department portals. No summaries, no analysis, just what changed and when Fermor detected it.',
  keywords: [
    'sebi circulars', 'sebi press releases', 'income tax department notices',
    'sebi updates today', 'regulatory updates india', 'sebi notice',
  ],
  alternates: { canonical: 'https://fermor.in/regulatory-updates' },
  openGraph: {
    title: 'Regulatory Updates: Live SEBI & Income Tax Circular Tracker - Fermor',
    description: 'A live feed of new circulars, notices and press releases detected on the official SEBI and Income Tax Department portals.',
    type: 'website',
    url: 'https://fermor.in/regulatory-updates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regulatory Updates: Live SEBI & Income Tax Circular Tracker',
    description: 'A live feed of new circulars, notices and press releases from SEBI and the Income Tax Department.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Regulatory Updates', item: 'https://fermor.in/regulatory-updates' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Regulatory Updates',
  description: 'Live feed of new circulars, notices and press releases detected on the official SEBI and Income Tax Department portals.',
  url: 'https://fermor.in/regulatory-updates',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, taxpayers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
};

// A title this scraper has captured before that is not a real circular headline (an accessibility
// skip-link the Income Tax portal's markup exposes as the first list item). Filtered out here
// rather than upstream in the backend so the raw capture is still available for debugging via the
// API directly, while the public page never shows a broken-looking entry.
const JUNK_TITLES = new Set(['skip to main content']);

function isUsableUpdate(u: { title: string }): boolean {
  const t = u.title.trim();
  return t.length >= 10 && !JUNK_TITLES.has(t.toLowerCase());
}

async function getUpdates(): Promise<GovUpdate[]> {
  try {
    const res = await fetch(`${API_BASE}/gov-updates?limit=500`, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const { results } = (await res.json()) as { results: GovUpdate[] };
    return results.filter(isUsableUpdate).sort((a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime());
  } catch {
    return [];
  }
}

export default async function RegulatoryUpdatesPage() {
  const updates = await getUpdates();
  const lastUpdated = updates[0]?.detectedAt
    ? new Date(updates[0].detectedAt).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata',
      })
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <div style={{ minHeight: '100vh', background: '#F4F8F5', display: 'flex', flexDirection: 'column' }}>
        <SubNav breadcrumb="Regulatory Updates" />
        <div style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px', width: '100%', boxSizing: 'border-box' }}>
          <header style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: '#16140F', margin: 0, letterSpacing: '-0.025em', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                Regulatory Updates
              </h1>
              {lastUpdated && (
                <span style={{
                  fontSize: 12.5, fontWeight: 600, color: '#101214', background: '#fff', border: '1px solid #E2EBE0',
                  borderRadius: 999, padding: '6px 14px', fontFamily: 'var(--font-inter), Inter, sans-serif', whiteSpace: 'nowrap',
                }}>
                  Last updated {lastUpdated}
                </span>
              )}
            </div>
            <p style={{ fontSize: 14.5, color: '#5A5A52', margin: 0, maxWidth: 640, lineHeight: 1.6, fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              A live tracker of new circulars, notices and press releases published on the official{' '}
              <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#101214', fontWeight: 600 }}>SEBI</a>{' '}
              and{' '}
              <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#101214', fontWeight: 600 }}>Income Tax Department</a>{' '}
              portals. Every entry links straight to the source. No summaries, no rewriting, just what changed and when Fermor&apos;s tracker detected it. EPFO tracking is not live yet.
            </p>
          </header>
          <RegulatoryUpdatesClient updates={updates} />
        </div>
        <Footer minimal unified columns={DISCOVERY_COLUMNS} />
      </div>
    </>
  );
}
