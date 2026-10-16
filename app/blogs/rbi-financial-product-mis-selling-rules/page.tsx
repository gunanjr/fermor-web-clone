import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'RBI Financial Product Mis-Selling Rules: What Banks Must Now Do',
  description:
    "RBI's guidelines on financial product suitability and mis-selling change what banks can and cannot do when recommending ULIPs, insurance, loans, and investments. Here is what has changed for consumers.",
  alternates: { canonical: 'https://fermor.in/blogs/rbi-financial-product-mis-selling-rules' },
  openGraph: {
    title: 'RBI Financial Product Mis-Selling Rules: What Banks Must Now Do',
    description: "Banks must assess suitability before recommending any financial product. Unsolicited product bundling and high-pressure selling are being targeted by new RBI norms. What this means for you.",
    type: 'article',
    publishedTime: '2026-06-17T16:47:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['RBI', 'Mis-Selling', 'Financial Regulation', 'Consumer Protection', 'ULIP', 'Banking India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RBI Financial Product Mis-Selling Rules',
    description: "RBI's new suitability norms for financial product distribution. What banks must disclose, what they can no longer push, and what your rights are.",
  },
  keywords: [
    'rbi financial product mis-selling rules', 'rbi mis-selling guidelines', 'rbi suitability norms',
    'bank mis-selling insurance ulip india', 'rbi consumer protection financial products',
    'financial product bundling ban india', 'rbi guidelines banks selling insurance',
    'mis-selling rules india 2026',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'RBI Financial Product Mis-Selling Rules: What Banks Must Now Do',
  description: "A detailed breakdown of RBI's suitability and mis-selling guidelines for financial product distribution, what changes for banks, and what rights consumers now have.",
  datePublished: '2026-06-17T16:47:00+05:30',
  dateModified: '2026-06-17T16:47:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/rbi-financial-product-mis-selling-rules' },
  articleSection: 'Regulation',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Organization', name: 'Reserve Bank of India', sameAs: 'https://rbi.org.in' },
    { '@type': 'Thing', name: 'Financial Product Mis-Selling', description: 'Practice of selling unsuitable financial products to consumers without adequate disclosure' },
  ],
  keywords: 'rbi financial product mis-selling rules, rbi suitability norms, consumer protection banking india',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'RBI Financial Product Mis-Selling Rules', item: 'https://fermor.in/blogs/rbi-financial-product-mis-selling-rules' },
  ],
};

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

function Breadcrumb() {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'Regulation' }].map((crumb, i, arr) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < arr.length - 1 && crumb.href ? (
              <Link href={crumb.href} style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < arr.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `3px solid #CCCCCC`, background: '#FAFAFA', padding: '15px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function WhatChangedTable() {
  const rows = [
    { was: 'No formal suitability check before product recommendation', now: 'Bank must assess income, risk appetite, financial goal, and existing products before recommending' },
    { was: 'Commission disclosure optional or buried in fine print', now: 'Commission earned on third-party product sales must be disclosed upfront in writing' },
    { was: 'Loan approval bundled with insurance without explicit consent', now: 'Product bundling allowed only where the customer separately consents to each product' },
    { was: 'No structured cooling-off period for most products', now: 'Free-look period mandated; customers can exit unsuitable products within specified window' },
    { was: 'Grievance redressal through bank-internal channels only', now: 'Escalation path to RBI Ombudsman clearly mandated; timeline for resolution binding on banks' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '28px 0', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', display: 'flex', gap: 0, borderBottom: `1px solid ${C.border}` }}>
        <span style={{ flex: 1, fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>Before</span>
        <span style={{ flex: 1, fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3, marginLeft: 1, borderLeft: `1px solid ${C.border}`, paddingLeft: 18 }}>After (what the rules require)</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: 0, borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ flex: 1, padding: '13px 18px', borderRight: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13.5, color: C.ink3, lineHeight: 1.5, display: 'block' }}>{r.was}</span>
          </div>
          <div style={{ flex: 1, padding: '13px 18px' }}>
            <span style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.5, display: 'block' }}>{r.now}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RedFlagsList() {
  const items = [
    { flag: 'Bank agent recommends insurance at the same time as a loan approval', why: 'Classic bundling. The insurance is often a ULIP or credit life policy with high commission.' },
    { flag: 'Returns quoted as guaranteed without a signed illustration', why: 'Unit-linked products have no guaranteed returns. Verbal assurance of returns is a mis-selling red flag.' },
    { flag: 'Product pitched over a phone call without written suitability documentation', why: 'Suitability assessment must be in writing. Unsolicited calls for financial products are restricted.' },
    { flag: 'Only one product presented with no comparison or alternatives shown', why: 'Banks distributing third-party products must offer comparison across options in the same category.' },
    { flag: 'FD or savings account customers pitched ULIPs as better alternatives', why: 'Risk profiles differ fundamentally. Suitability rules require matching the product to investor profile.' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '28px 0', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>Signs You May Be Being Mis-Sold To</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ padding: '14px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginBottom: 5 }}>{item.flag}</div>
          <div style={{ fontSize: 13, color: C.ink3, lineHeight: 1.55 }}>{item.why}</div>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Investment Comparison Calculator', desc: 'Compare FD, SIP, PPF side by side', href: '/calculators/investment-comparison-calculator' },
    { label: 'SIP Calculator', desc: 'Project mutual fund returns over any horizon', href: '/calculators/sip-calculator' },
    { label: 'FD Calculator', desc: 'Calculate actual FD returns and maturity value', href: '/calculators/fd-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 18px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function KeyPoints() {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>What Changed</span>
      </div>
      {[
        { point: 'Suitability check required', detail: 'Before any product recommendation' },
        { point: 'Commission disclosure', detail: 'In writing, before product is sold' },
        { point: 'No unsolicited bundling', detail: 'Separate consent required for each product' },
        { point: 'Free-look period', detail: 'Exit unsuitable products after purchase' },
        { point: 'RBI Ombudsman escalation', detail: 'Binding resolution timeline on banks' },
      ].map((item, i, arr) => (
        <div key={item.point} style={{ padding: '12px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{item.point}</div>
          <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>{item.detail}</div>
        </div>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> This article explains regulatory frameworks and consumer rights for informational purposes. It is not legal or financial advice. For specific complaints or disputes about financial products, consult the RBI Ombudsman portal (rbi.org.in/ombudsman) or a qualified legal advisor. Regulations may evolve; refer to the RBI website for the most current circulars.
      </p>
    </div>
  );
}

export default function RBIMisSellingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.ink3, fontFamily: INTER }}>Regulation</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 600, color: C.dark, lineHeight: 1.13, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 820 }}>
            RBI Financial Product Mis-Selling Rules: What Banks Must Now Do
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            RBI has been tightening the rules on how banks and NBFCs sell financial products to customers. Suitability assessments, mandatory commission disclosure, and restrictions on product bundling are now regulatory requirements. Here is what changed and what your rights are.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-06-17T16:47:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jun 17, 2026 · 4:47 PM IST</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>7 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article style={{ fontFamily: INTER, minWidth: 0 }}>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Mis-selling of financial products in Indian banks has followed a familiar pattern for years: home loan applicants pushed into credit life insurance at closure, FD customers steered into ULIPs pitched as &quot;better returns,&quot; savings account holders sold endowment plans they did not understand. The regulatory framework has been reactive and complaint-driven. RBI&apos;s rules on suitability and mis-selling shift the obligation upstream. Banks must now ensure the product is right before it is sold, not just process the complaint after.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What the rules require: before vs after
            </h2>

            <WhatChangedTable />

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' }}>
              What mis-selling actually looks like
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Mis-selling is not always obvious at the time of sale. A bank relationship manager recommending a ULIP to a customer in their 50s who was looking for stable fixed-income returns is a suitability failure, even if no false claim was made. Similarly, bundling credit insurance into a home loan without itemising the premium and explaining that it is optional qualifies as mis-selling under Indian regulatory standards, because the customer had no meaningful choice.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              RBI has documented three categories of mis-selling in its supervisory findings over the years. First, misrepresentation of product features, including guaranteed return claims on market-linked products. Second, non-disclosure of the distributor&apos;s commission and conflicts of interest. Third, coercion by bundling, where the customer believes a product is mandatory to obtain a loan or account benefit.
            </p>

            <Callout>
              If a bank product was sold to you verbally, with no written illustration of charges and returns, that alone is non-compliant with existing regulatory guidelines. The absence of proper documentation is itself grounds for a complaint.
            </Callout>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' }}>
              Signs you may be being mis-sold to
            </h2>

            <RedFlagsList />

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' }}>
              What suitability assessment means in practice
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Before a bank or NBFC recommends any investment or insurance product, they must collect certain information from you: your income level, existing financial commitments, investment horizon, risk tolerance, and the purpose of the investment. This is standard practice in regulated securities markets under SEBI&apos;s Know Your Client requirements. RBI extending this to banking product distribution brings deposits, insurance, and loan-linked products under the same discipline.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              If you are a conservative investor with no appetite for market volatility, the bank cannot sell you a ULIP and call the suitability assessment complete. The product&apos;s risk profile must match your documented investor profile. If it does not, the sale is non-compliant.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' }}>
              What to do if you have been mis-sold a product
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 16 }}>
              The escalation path in India is structured and has teeth if you follow it correctly.
            </p>

            <ol style={{ margin: '0 0 24px 0', padding: '0 0 0 22px' }}>
              {[
                { title: 'Internal complaint to the bank', body: "File a formal written complaint through the bank's official grievance channel. Note the complaint reference number and the 30-day resolution window banks are required to honour." },
                { title: 'Escalate to the RBI Ombudsman if unresolved', body: "If the bank does not resolve within 30 days, or the resolution is unsatisfactory, file on the RBI Integrated Ombudsman Scheme portal (rbi.org.in/ombudsman). It is free and the process is entirely online." },
                { title: 'For insurance products: IRDAI Bima Bharosa', body: "Mis-sold insurance products fall under IRDAI's jurisdiction. IRDAI's consumer complaints portal (bimabharosa.irdai.gov.in) handles insurance-specific grievances, including ULIP and credit insurance mis-selling." },
                { title: 'Document everything', body: "Gather the original product brochure, your policy documents, the loan agreement if a product was bundled, any communication from the bank agent, and bank account statements showing premium deductions." },
              ].map((item, i) => (
                <li key={i} style={{ fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.7, marginBottom: 16 }}>
                  <strong style={{ fontWeight: 600, color: C.dark }}>{item.title}.</strong> {item.body}
                </li>
              ))}
            </ol>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' }}>
              What to do before you buy any bank-recommended product
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Before agreeing to any financial product a bank recommends, ask four questions. Is this product regulated by RBI, SEBI, or IRDAI, and have I been shown the official product information document? What is the actual return after all charges, and has the bank shown me a written illustration? Is this product optional, or am I being told I need it to get my loan or account service? What is the exit cost and timeline if I want to discontinue?
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Use independent tools to verify product economics before you commit. Fermor&apos;s{' '}
              <Link href="/calculators/investment-comparison-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Investment Comparison Calculator
              </Link>
              {' '}lets you run FD, SIP, and insurance endowment numbers side by side at the same investment amount. If a product a bank recommends does not look competitive in that comparison, ask why.
            </p>

            <Disclaimer />
          </article>

          <aside
            className="rbi-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><KeyPoints /></div>
            <div style={{ flexShrink: 0 }}><FermorTools /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: C.border, margin: '24px 0 0' }} />
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .rbi-sidebar::-webkit-scrollbar { width: 5px; }
        .rbi-sidebar::-webkit-scrollbar-track { background: transparent; }
        .rbi-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .rbi-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        article ol { padding-left: 22px; }
      `}</style>
    </>
  );
}
