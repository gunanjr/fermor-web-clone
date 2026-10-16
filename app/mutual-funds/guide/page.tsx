import type { Metadata } from 'next';
import Link from 'next/link';
import { MutualFundsHeader, MutualFundsFooter } from '../MutualFundsChrome';
import { FAQBox } from '@/components/common/FAQBox';

const INTER = "system-ui, -apple-system, sans-serif";

const MF = {
  green: '#2D9970',
  greenDark: '#1f7a58',
  ink: '#101214',
  ink2: '#565c62',
  ink3: '#80868c',
  border: '#e3e6e8',
  panel: '#f4f5f6',
  bg: '#f4f5f6',
  darkHeader: '#101214',
};

const hStyle: React.CSSProperties = { fontFamily: 'system-ui, sans-serif', fontSize: 22, fontWeight: 700, color: MF.ink, marginTop: 44, marginBottom: 16, letterSpacing: '-0.01em' };
const pStyle: React.CSSProperties = { fontSize: 15.5, color: MF.ink2, lineHeight: 1.8, marginBottom: 18, maxWidth: '68ch' };

export const metadata: Metadata = {
  title: 'How Mutual Funds Work in India: NAV, Plans, Returns Explained',
  description: 'How mutual fund NAV is calculated, the difference between Direct and Regular plans, Growth vs IDCW options, and how period returns are computed. Sourced from SEBI and AMFI regulations.',
  keywords: ['what is nav in mutual fund', 'how to invest in mutual funds india', 'direct vs regular mutual fund', 'growth vs idcw', 'how mutual fund returns are calculated', 'sebi mutual fund rules'],
  alternates: { canonical: 'https://fermor.in/mutual-funds/guide' },
  openGraph: {
    title: 'How Mutual Funds Work in India: NAV, Plans, Returns Explained',
    description: 'NAV calculation, Direct vs Regular, Growth vs IDCW, and how returns are computed, sourced from SEBI and AMFI.',
    type: 'article',
    url: 'https://fermor.in/mutual-funds/guide',
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'What is NAV in a mutual fund?', a: 'NAV (Net Asset Value) is the per-unit market value of a mutual fund scheme. It is calculated by dividing the total value of the scheme\'s assets, minus liabilities, by the number of outstanding units. SEBI requires every AMC to publish NAV daily.' },
  { q: 'How often does mutual fund NAV update?', a: 'Mutual fund NAV updates once every business day. AMFI publishes the official NAV for all schemes after market close, and asset management companies are required to report it under SEBI regulations.' },
  { q: 'How is mutual fund return calculated?', a: 'For periods under 1 year, return is calculated as (current NAV minus starting NAV) divided by starting NAV. For periods of 1 year or longer, return is annualised (CAGR): ((current NAV divided by starting NAV) to the power of (365 divided by days elapsed)) minus 1.' },
  { q: 'What is the difference between Direct and Regular mutual fund plans?', a: 'A Direct Plan is bought straight from the AMC with no distributor commission, resulting in a lower expense ratio and marginally higher NAV growth over time. A Regular Plan is bought through a distributor or advisor, whose commission is built into a higher expense ratio.' },
  { q: 'What is the difference between Growth and IDCW options?', a: 'The Growth option reinvests all gains back into the scheme, so the NAV keeps compounding and investors realise gains only on redemption. The IDCW (Income Distribution cum Capital Withdrawal) option pays out gains periodically, reducing the NAV each time, with the payout taxed as income in the investor\'s hands in the year received.' },
  { q: 'Is a higher NAV better than a lower NAV?', a: 'No. NAV is a per-unit price, not a quality signal. A fund at Rs 500 NAV is not "more expensive" or "better performing" than one at Rs 50 NAV; what matters is the percentage return over time, not the absolute NAV figure. Two funds with identical underlying returns will show different NAVs purely based on how long ago they launched and what their starting NAV was.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial infrastructure platform for India, combining free calculators and live mutual fund data with an eligibility engine that shows what financial products a user actually qualifies for.' },
];

export default function MutualFundGuidePage() {
  const pageUrl = 'https://fermor.in/mutual-funds/guide';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Mutual Funds', item: 'https://fermor.in/mutual-funds' },
      { '@type': 'ListItem', position: 3, name: 'How Mutual Funds Work', item: pageUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How Mutual Funds Work in India',
    description: 'NAV calculation, Direct vs Regular plans, Growth vs IDCW options, and how mutual fund returns are computed under SEBI and AMFI rules.',
    url: pageUrl,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
    publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#what-is-nav p:first-of-type'] },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Invest in a Mutual Fund in India',
    totalTime: 'PT10M',
    tool: [{ '@type': 'HowToTool', name: 'PAN and Aadhaar-based KYC' }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Complete KYC', text: 'Complete your KYC once via any KYC Registration Agency (KRA) using PAN and Aadhaar-based e-KYC, either directly with the AMC or through any SEBI-registered platform.' },
      { '@type': 'HowToStep', position: 2, name: 'Choose Direct or Regular', text: 'Decide between the Direct Plan, bought straight from the AMC with no distributor commission, or the Regular Plan through a distributor, which carries a higher expense ratio.' },
      { '@type': 'HowToStep', position: 3, name: 'Choose lumpsum or SIP', text: 'Decide whether to invest a lumpsum or set up a monthly SIP, based on how much you have available now versus how much you can commit monthly.' },
      { '@type': 'HowToStep', position: 4, name: 'Choose Growth or IDCW', text: 'Pick the Growth option to let gains compound within the fund, or the IDCW option to receive periodic payouts, which are taxed as income in the year received.' },
      { '@type': 'HowToStep', position: 5, name: 'Submit the application', text: 'Submit the purchase through the AMC website, a registered mutual fund platform, or an RTA, and monitor NAV and returns going forward.' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        a.mfg-link { color: ${MF.ink}; text-decoration: underline; text-decoration-color: #B9BEC3; text-underline-offset: 3px; }
        a.mfg-link:hover { color: #1F7A58; text-decoration-color: #1F7A58; }
      `}</style>

      <div style={{ fontFamily: INTER, background: MF.bg, color: MF.ink, minHeight: '100vh', lineHeight: 1.5 }}>
        <MutualFundsHeader />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '14px 24px 0', font: '13px system-ui,sans-serif', color: '#565c62', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Fermor</Link>
          <span>/</span>
          <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Mutual Funds</Link>
          <span>/</span>
          <span style={{ color: MF.ink, fontWeight: 600 }} aria-current="page">How Mutual Funds Work</span>
        </div>

        <main style={{ maxWidth: 800, margin: '0 auto', padding: '28px 24px 60px' }}>
          <h1 style={{ margin: '0 0 12px', font: '700 30px/1.3 system-ui,sans-serif', letterSpacing: '-0.01em', color: MF.ink }}>
            How Mutual Funds Work in India
          </h1>
          <p style={{ ...pStyle, fontSize: 16.5, color: MF.ink }}>
            NAV, Direct vs Regular plans, Growth vs IDCW options, and how period returns are actually calculated, explained once in full detail rather than repeated in short form on every scheme page.
          </p>

          <section id="what-is-nav" aria-labelledby="nav-h2">
            <h2 id="nav-h2" style={hStyle}>What Is NAV and How Is It Calculated?</h2>
            <p style={pStyle}>
              A mutual fund&apos;s Net Asset Value (NAV) is the per-unit price of a scheme, published once every business day.
              It equals total scheme assets minus liabilities, divided by the number of units outstanding. Under{' '}
              <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>SEBI</a> regulations,
              every AMC must compute and report this daily, and{' '}
              <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>AMFI</a> consolidates
              this figure for every scheme in the country each evening.
            </p>
            <p style={pStyle}>
              NAV is not a quality signal. A fund trading at Rs 500 NAV is not more expensive or better-performing than one at Rs 50 NAV.
              What matters for an investor is the percentage return over time, not the absolute NAV figure: two funds with identical
              underlying performance can show very different NAVs purely because of when they launched and what their starting NAV was.
            </p>
          </section>

          <section id="how-to-invest" aria-labelledby="invest-h2">
            <h2 id="invest-h2" style={hStyle}>How to Invest in a Mutual Fund</h2>
            <p style={{ ...pStyle, marginBottom: 14 }}>Investing in any AMFI-registered scheme follows the same five-step process, regardless of which fund or AMC.</p>
            <ol style={{ margin: '4px 0 16px', paddingLeft: 22 }}>
              <li style={{ fontSize: 15, color: '#565c62', lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: MF.ink }}>Complete KYC.</strong> A one-time PAN and Aadhaar based e-KYC through any KYC Registration Agency (KRA) covers all mutual fund investing across every AMC, not just one.
              </li>
              <li style={{ fontSize: 15, color: '#565c62', lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: MF.ink }}>Choose Direct or Regular.</strong> The Direct plan has a lower expense ratio since it carries no distributor commission, which compounds into a meaningfully larger corpus over a long holding period. See the comparison below.
              </li>
              <li style={{ fontSize: 15, color: '#565c62', lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: MF.ink }}>Decide lumpsum or SIP.</strong> A lumpsum works when a large amount is available now; an SIP works for a fixed monthly commitment. Use the{' '}
                <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>SIP Calculator</Link> or{' '}
                <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>Lumpsum Calculator</Link> to compare both approaches for a specific target amount.
              </li>
              <li style={{ fontSize: 15, color: '#565c62', lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: MF.ink }}>Choose Growth or IDCW.</strong> Growth compounds gains inside the fund. IDCW pays out periodically as taxable income. See the comparison below.
              </li>
              <li style={{ fontSize: 15, color: '#565c62', lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: MF.ink }}>Submit the application.</strong> Apply through the AMC&apos;s own site, a registered mutual fund platform, or an RTA (CAMS or KFin Technologies), and track NAV and returns going forward.
              </li>
            </ol>
          </section>

          <section id="direct-vs-regular" aria-labelledby="direct-h2">
            <h2 id="direct-h2" style={hStyle}>Direct vs Regular Plans</h2>
            <p style={pStyle}>
              A Direct Plan is bought straight from the AMC, with no distributor or advisor involved, so there is no commission built into the cost structure.
              A Regular Plan is bought through a distributor, bank, or advisor, whose trail commission is folded into a higher expense ratio, typically 0.5 to 1.5 percentage points higher than the same scheme&apos;s Direct Plan.
            </p>
            <p style={pStyle}>
              That gap looks small year to year but compounds meaningfully over a long holding period, since the difference in expense ratio directly reduces the NAV growth rate every single year, not just once.
              Every scheme on Fermor that is eligible for indexing is shown as its Direct Plan, Growth option variant specifically because that is the lowest-cost, most-compared version of each fund.
            </p>
          </section>

          <section id="growth-vs-idcw" aria-labelledby="growth-h2">
            <h2 id="growth-h2" style={hStyle}>Growth vs IDCW Options</h2>
            <p style={pStyle}>
              The Growth option reinvests every gain back into the fund, so NAV keeps compounding and the investor only realises a gain when units are actually redeemed.
              The IDCW (Income Distribution cum Capital Withdrawal) option pays out gains periodically, whenever the fund declares one, and each payout reduces the NAV by roughly the payout amount.
            </p>
            <p style={pStyle}>
              IDCW payouts are taxed as income in the investor&apos;s hands in the year received, regardless of how long the units have been held.
              For an investor not relying on the fund for periodic income, Growth is almost always the more tax-efficient and higher-compounding choice of the two.
            </p>
          </section>

          <section id="how-returns-are-calculated" aria-labelledby="returns-h2">
            <h2 id="returns-h2" style={hStyle}>How Mutual Fund Returns Are Calculated</h2>
            <p style={pStyle}>
              For periods under 1 year, return is a simple point-to-point calculation: (current NAV minus starting NAV) divided by starting NAV, expressed as a percentage.
              For periods of 1 year or longer, return is annualised using CAGR: ((current NAV divided by starting NAV) raised to the power of (365 divided by days elapsed)) minus 1.
            </p>
            <p style={pStyle}>
              Annualising longer periods matters because it puts a 3-year return and a 5-year return on the same comparable footing (a percentage per year), rather than a raw cumulative number that makes longer-held funds look artificially better just for having more time to compound.
              Run the exact CAGR math for any two NAV points using the{' '}
              <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>CAGR Calculator</Link>, or the{' '}
              <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>XIRR Calculator</Link> for a series of SIP instalments made on different dates.
            </p>
          </section>


          <section id="faq" aria-labelledby="faq-h2">
            <h2 id="faq-h2" style={hStyle}>Frequently Asked Questions</h2>
            <FAQBox items={faqItems} marginTop={16} />
          </section>

          <p style={{ ...pStyle, marginTop: 28 }}>
            Look up NAV and real returns for any specific scheme on the{' '}
            <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>Mutual Fund NAV Search</Link>, or run the numbers on a specific investment with the{' '}
            <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" className="mfg-link" style={{ fontWeight: 600 }}>SIP Calculator</Link>.
          </p>

          <div itemProp="disclaimer" style={{ borderTop: `1px solid ${MF.border}`, paddingTop: 20, marginTop: 24 }}>
            <p style={{ margin: 0, font: '11.5px/1.65 system-ui', color: '#80868c' }}>
              <strong>Disclaimer:</strong> This page explains general mutual fund mechanics under SEBI and AMFI rules and is for informational purposes only.
              It does not constitute investment advice. Mutual fund investments are subject to market risk. Consult a SEBI-registered investment adviser or a chartered accountant before making investment or tax decisions.
            </p>
          </div>
        </main>

        <MutualFundsFooter />
      </div>
    </>
  );
}
