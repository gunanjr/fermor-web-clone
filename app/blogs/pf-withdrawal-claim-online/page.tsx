import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const PORTAL_URL = 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/';
const EPFO_HOME  = 'https://www.epfindia.gov.in/site_hi/index.php';

export const metadata: Metadata = {
  title: 'PF Withdrawal Online: Claim, Status & New 2026 Rules',
  description: 'PF withdrawal guide: claim online in 8 steps, check status, EPF Scheme 2026 changes (25% minimum balance, 36-month pension wait), forms, and tax rules.',
  alternates: { canonical: 'https://fermor.in/blogs/pf-withdrawal-claim-online' },
  openGraph: {
    title: 'PF Withdrawal Online: Claim, Status & New 2026 Rules - Fermor',
    description: 'Withdraw PF online, check claim status, and see what changed under the EPF Scheme 2026: minimum balance, settlement time, and pension waiting period.',
    type: 'article',
    url: 'https://fermor.in/blogs/pf-withdrawal-claim-online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PF Withdrawal Online: Claim, Status & New 2026 Rules - Fermor',
    description: 'Step-by-step PF withdrawal, claim status check, forms, rejection fixes, and the new EPF Scheme 2026 withdrawal rules.',
  },
};

const faqItems = [
  { q: 'How can I withdraw my PF online?', a: 'Log in to the EPFO Member e-Sewa portal at unifiedportal-mem.epfindia.gov.in with your UAN and password, verify your KYC under Manage, then go to Online Services and select Claim (Form-31, 19, 10C and 10D). Choose the claim type, verify your bank details, and submit with an OTP sent to your Aadhaar-linked mobile number.' },
  { q: 'Do I need my employer\'s permission to withdraw PF?', a: 'No. Since UAN-based online claims became standard, employer attestation is no longer required for most claims once your Aadhaar, PAN, and bank details are verified on the portal. Employer approval is only needed for the offline Composite Claim Form (Non-Aadhaar) route, used when KYC is not fully seeded.' },
  { q: 'How do I check my PF claim status online?', a: 'Log in to the Member e-Sewa portal, go to Online Services, and select Track Claim Status, or use Track Claim Status without logging in in some circumstances by entering your UAN. The screen shows whether your claim is pending, under process, approved, or rejected, along with the claim reference number.' },
  { q: 'How long does PF withdrawal take?', a: 'Under the EPF Scheme, 2026, eligible online claims with complete KYC are targeted for settlement within 3 working days. Claims needing manual verification, or offline claims filed through a Composite Claim Form, can still take up to 20 working days.' },
  { q: 'What is the EPF Scheme, 2026?', a: 'The EPF Scheme, 2026 is a new scheme notified by the central government, replacing the EPF Scheme, 1952, as part of implementing the Code on Social Security, 2020. It took effect on June 29, 2026, consolidating the previous partial withdrawal categories into three broad heads: Essential Needs, Housing Needs, and Special Circumstances.' },
  { q: 'What is the minimum balance I must keep after a partial PF withdrawal?', a: 'Under the EPF Scheme, 2026, members must generally retain at least 25% of their eligible EPF balance after a partial or advance withdrawal. This replaces the varied, purpose-specific caps that applied under the earlier 1952 scheme.' },
  { q: 'Can I withdraw PF through an ATM or UPI now?', a: 'Yes, under EPFO 3.0. UPI-based withdrawals allow access to up to roughly 75% of the eligible balance, and ATM-based withdrawals up to roughly 50%, both subject to the same 25% minimum retention rule and any per-transaction ceiling the bank or EPFO applies.' },
  { q: 'What is the auto-settlement limit for PF claims in 2026?', a: 'The auto-settlement limit, the claim amount EPFO can approve automatically without manual verification, was raised to Rs 5 lakh from the earlier Rs 1 lakh, provided the member\'s UAN is fully KYC-compliant with Aadhaar, PAN, and bank details verified.' },
  { q: 'How much PF can I withdraw after leaving my job?', a: 'You can withdraw 75% of your PF balance immediately after one month of unemployment, and the remaining 25% after two months of unemployment. Full withdrawal of the PF component, as distinct from the pension component, requires at least two months without a new job.' },
  { q: 'How long is the waiting period for EPS pension withdrawal now?', a: 'The waiting period for withdrawing the pension component (EPS) has been extended to 36 months from the date your last contribution was due, or your superannuation age, whichever comes first, up from the earlier 2-month wait. This change is designed to discourage early pension cash-outs in favour of continuous pension coverage.' },
  { q: 'Which form do I need for PF withdrawal?', a: 'Form 19 covers full and final settlement of the PF balance after leaving a job. Form 31 covers partial withdrawal or an advance while still employed. Form 10C covers withdrawal of the pension (EPS) component when total service is under 9.5 years. Form 10D applies for a monthly pension after 9.5 years or more of service.' },
  { q: 'Why was my PF withdrawal claim rejected?', a: 'The most common reasons are a name mismatch between EPFO records and your Aadhaar or bank account, an unclear or unreadable cheque or passbook image showing your name and IFSC code, selecting the wrong claim reason for the form chosen, or a settled payment bouncing back because the bank account was dormant, frozen, or had an incorrect IFSC code.' },
  { q: 'Is PF withdrawal taxable?', a: 'If you have completed 5 or more years of continuous service, your PF withdrawal is entirely tax-free. If your service is under 5 years, withdrawals under Rs 50,000 attract no TDS, withdrawals above Rs 50,000 attract 10% TDS if your PAN is linked, and 30% TDS if it is not.' },
  { q: 'How can I avoid TDS on PF withdrawal with less than 5 years of service?', a: 'If your total income for the year is below the basic taxable limit, you can submit Form 15G, or Form 15H if you are a senior citizen, to the EPFO before the claim is processed. This declares that your income does not attract tax and instructs EPFO not to deduct TDS.' },
  { q: 'Can I withdraw PF while I am still employed?', a: 'Yes, through a partial withdrawal under Form 31, for specific purposes such as medical treatment, marriage, education, home purchase, or home renovation, each with its own eligibility conditions and withdrawal limit.' },
  { q: 'What is the minimum service required for PF withdrawal after leaving a job?', a: 'There is no minimum service requirement to withdraw your PF balance after leaving a job; even a short tenure qualifies once you have been unemployed for the required waiting period. Full withdrawal specifically requires at least two months of unemployment.' },
  { q: 'How do I withdraw the PF of a deceased member?', a: 'The nominee or legal heir submits Form 20 to the jurisdictional EPFO office to withdraw the PF balance, and Form 10D to claim any pension or family pension amount due under EPS.' },
  { q: 'What happens if I never withdraw my PF?', a: 'Your balance continues earning interest and stays in your account. If you resign before age 58 and do not apply for withdrawal within 36 months of becoming eligible, the account is classified inoperative and stops earning further interest from that point.' },
  { q: 'Can I merge two EPF accounts from different employers?', a: 'Yes. Your UAN links every EPF account you have held across employers; use the Transfer Claim (Form 13) option on the Member e-Sewa portal to consolidate old accounts into your current one, after which you follow the normal withdrawal process for the merged balance.' },
  { q: 'How much can I withdraw before retirement?', a: 'Up to 90% of your PF balance, along with accrued interest, can be withdrawn once you turn 54 years old, one year before the standard retirement age of 55 for this purpose.' },
  { q: 'What is Fermor?', a: "Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it." },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'PF Withdrawal Online: Claim, Status Check and the New EPF Scheme 2026 Rules',
  url: 'https://fermor.in/blogs/pf-withdrawal-claim-online',
  datePublished: '2026-07-28T00:53:23+05:30',
  dateModified: '2026-10-14T16:36:37+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete PF withdrawal guide covering the EPF Scheme 2026 (effective June 29, 2026, replacing the 1952 scheme): online withdrawal in 8 steps through the Member e-Sewa portal, a dedicated claim status check walkthrough, UMANG app withdrawal, offline Composite Claim Forms, full vs partial withdrawal limits, the extended 36-month EPS pension waiting period, EPFO 3.0 ATM and UPI withdrawal with the new Rs 5 lakh auto-settlement limit, which form to file, common claim rejection reasons, PF withdrawal taxation, and deceased-member withdrawal via Form 20.',
  articleSection: 'EPF',
  keywords: 'pf withdrawal, epfo online claim, provident fund claim online, epfo claim, pf claim, epfo claim online, epf claim online, pf claim status, claim epf status, claim epfo, claim epfo online, claim status epfo, claim status pf, employee pf claim status, employees provident fund claim, epfo pf claim, epfo pf claim status, online claim epfo, pf withdrawal online, epf withdrawal, epf withdrawal online, pf claim online, pf withdrawal process, check pf claim status, epf rules for withdrawal, epfo claim status check, form 10c in epfo, form 19 in epfo, epf claim form 31',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'PF Withdrawal Online', item: 'https://fermor.in/blogs/pf-withdrawal-claim-online' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Withdraw PF Online Through the EPFO Member Portal',
  description: 'Step-by-step process to submit an online PF withdrawal claim on the EPFO Member e-Sewa portal.',
  totalTime: 'PT5M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Log in to the UAN Member Portal', text: 'Sign in at unifiedportal-mem.epfindia.gov.in with your UAN and password.' },
    { '@type': 'HowToStep', position: 2, name: 'Verify your KYC', text: 'Go to Manage, then KYC, and confirm your Aadhaar and bank details are correct.' },
    { '@type': 'HowToStep', position: 3, name: 'Open the claim form', text: 'Go to Online Services and select Claim (Form-31, 19, 10C and 10D).' },
    { '@type': 'HowToStep', position: 4, name: 'Verify bank account details', text: 'Enter the required details and click Verify.' },
    { '@type': 'HowToStep', position: 5, name: 'Accept the certificate of undertaking', text: 'Click Yes, then Proceed for Online Claim.' },
    { '@type': 'HowToStep', position: 6, name: 'Select the claim type', text: 'Choose PF Advance (Form 31), Only PF Withdrawal (Form 19), or Only Pension Withdrawal (Form 10C) based on your situation.' },
    { '@type': 'HowToStep', position: 7, name: 'Submit with OTP', text: 'Tick the disclaimer, enter the OTP sent to your Aadhaar-linked mobile number, and click Submit.' },
    { '@type': 'HowToStep', position: 8, name: 'Track your claim', text: 'Use Track Claim Status on the same portal to monitor progress until settlement.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pf-withdrawal-claim-online',
  name: 'PF Withdrawal Online: Claim, Status Check and the New EPF Scheme 2026 Rules - Fermor',
  url: 'https://fermor.in/blogs/pf-withdrawal-claim-online',
  inLanguage: 'en-IN',
  datePublished: '2026-07-28T00:53:23+05:30',
  dateModified: '2026-10-14T16:36:37+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'EPF Scheme, 2026',
      alternateName: 'Employees Provident Fund Scheme 2026',
      description: 'A scheme notified by the Government of India on June 29, 2026, replacing the EPF Scheme, 1952, under the Code on Social Security, 2020, consolidating PF partial withdrawal categories and revising claim settlement and minimum balance rules.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian EPF and Retirement Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'UAN',
      alternateName: 'Universal Account Number',
      description: 'A 12-digit number issued by EPFO to every EPF member, used to log in to the Member e-Sewa portal, submit withdrawal claims, and track claim status.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian EPF and Retirement Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, EPF members, and pensioners in India withdrawing or claiming their provident fund',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important PF Withdrawal Links' },
    { '@type': 'WebPageElement', cssSelector: '#epf-scheme-2026', name: 'EPF Scheme 2026 Changes' },
    { '@type': 'WebPageElement', cssSelector: '#who-can-withdraw', name: 'Who Can Withdraw PF Online' },
    { '@type': 'WebPageElement', cssSelector: '#withdraw-online-steps', name: 'How to Withdraw PF Online' },
    { '@type': 'WebPageElement', cssSelector: '#check-claim-status', name: 'How to Check PF Claim Status' },
    { '@type': 'WebPageElement', cssSelector: '#umang-withdrawal', name: 'PF Withdrawal via UMANG App' },
    { '@type': 'WebPageElement', cssSelector: '#offline-withdrawal', name: 'PF Withdrawal Offline' },
    { '@type': 'WebPageElement', cssSelector: '#withdrawal-types', name: 'Types of PF Withdrawal' },
    { '@type': 'WebPageElement', cssSelector: '#pension-withdrawal', name: 'EPS Pension Withdrawal Rules' },
    { '@type': 'WebPageElement', cssSelector: '#which-form', name: 'Which Form to File' },
    { '@type': 'WebPageElement', cssSelector: '#claim-rejected', name: 'Why Claims Get Rejected' },
    { '@type': 'WebPageElement', cssSelector: '#taxability', name: 'PF Withdrawal Taxability' },
    { '@type': 'WebPageElement', cssSelector: '#epfo-3-0', name: 'EPFO 3.0 ATM and UPI Withdrawal' },
    { '@type': 'WebPageElement', cssSelector: '#deceased-member', name: 'Withdrawal for a Deceased Member' },
    { '@type': 'WebPageElement', cssSelector: '#customer-care', name: 'PF Customer Care' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors to act on those decisions.',
  knowsAbout: ['EPF Withdrawal', 'EPF Scheme 2026', 'EPFO 3.0', 'Employees Pension Scheme', 'Provident Fund India', 'UAN', 'Account Aggregator Framework'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function InfoTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NumberedSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
          <div style={{ paddingTop: 3 }}>
            <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{step.title}</p>
            <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CalcCTA({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <div style={{ background: C.paleDg, border: `1px solid #c9ced2`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>{label}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{note}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

function FaqAccordion({ items }: { items: typeof faqItems }) {
  return (
    <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <details key={i} open={i === 0} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none', lineHeight: 1.4 }}>
            <span style={{ paddingRight: 12 }}>{item.q}</span>
            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <div style={{ padding: '0 18px 16px', background: '#fff' }}>
            <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and links directly to EPFO&apos;s official portal. Fermor is not affiliated with EPFO, does not process withdrawal claims, and never asks for your UAN, password, Aadhaar, or OTP. The EPF Scheme, 2026 is newly notified; rules, limits, and settlement timelines reflect published information as of the date above and may be refined as EPFO issues further circulars. Always verify current details on epfindia.gov.in before relying on them.
      </p>
    </div>
  );
}

export default function PfWithdrawalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Nav */}
      <PageNav />

      {/* Breadcrumb */}
      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>PF Withdrawal Online</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              EPF
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime="2026-10-14T16:36:37+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Oct 14, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>14 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            PF Withdrawal Online: Claim, Status Check and the New EPF Scheme 2026 Rules
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              EPFO lets members withdraw PF online through the Member e-Sewa portal using their UAN and Aadhaar-based OTP, with no employer approval needed for most claims.
            </p>
            <p style={pStyle}>
              The rules changed on June 29, 2026, when the government notified the EPF Scheme, 2026, replacing the EPF Scheme, 1952, and simplifying withdrawal categories, minimum balance requirements, and settlement timelines.
            </p>
            <p style={pStyle}>
              This guide covers the online, app-based, and offline withdrawal routes, exactly how to check your claim status, what changed under the new scheme, and why claims get rejected.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Direct, official EPFO links for PF withdrawal and claim status"
                headers={['Service', 'Link']}
                rows={[
                  ['EPFO Member Portal (withdrawal and claim status)', <Link key="l1" href={PORTAL_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Login to EPFO Member Portal</Link>],
                  ['EPFO Official Website', <Link key="l2" href={EPFO_HOME} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>epfindia.gov.in</Link>],
                  ['UAN activation and passbook download', <Link key="l3" href="/blogs/epfo-login-uan-passbook" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>EPFO Login 2026 guide</Link>],
                  ['Official withdrawal app', 'UMANG app (App Store and Google Play)'],
                  ['PF toll-free helpline', '14470'],
                  ['PF balance by missed call', '9966044425'],
                  ['PF balance by SMS', 'EPFOHO UAN ENG to 7738299899'],
                ]}
              />
            </div>

            {/* SECTION: EPF Scheme 2026 */}
            <h2 id="epf-scheme-2026" style={hStyle}>EPF Scheme 2026: What Changed on June 29, 2026</h2>
            <p style={pStyle}>
              The government notified the EPF Scheme, 2026 on June 29, 2026, replacing the EPF Scheme, 1952, as part of implementing the Code on Social Security, 2020.
            </p>
            <p style={pStyle}>
              The revision consolidates what were previously around a dozen separate partial withdrawal categories into three broad heads: Essential Needs, Housing Needs, and Special Circumstances, each still carrying its own eligibility conditions and limits.
            </p>
            <InfoTable
              caption="EPF Scheme 2026: key changes at a glance"
              headers={['Particulars', 'EPF Scheme, 2026']}
              rows={[
                ['Effective date', 'June 29, 2026'],
                ['Withdrawal categories', 'Reduced to 3: Essential Needs, Housing Needs, Special Circumstances'],
                ['Minimum balance after partial withdrawal', 'At least 25% of eligible EPF balance retained'],
                ['Target claim settlement (clean online claims)', '3 working days'],
                ['Minimum service for most partial withdrawals', 'Standardised to 12 months of membership'],
                ['EPS pension withdrawal waiting period', 'Extended to 36 months (from 2 months)'],
                ['Withdrawal process', 'Aadhaar-based, paperless online claims'],
              ]}
            />
            <p style={pStyle}>
              The 36-month pension waiting period is the single biggest change for anyone changing jobs frequently: it applies from the date your last EPS contribution was due, or your superannuation age, whichever comes first, and is designed to discourage early pension cash-outs in favour of continuous coverage.
            </p>

            {/* SECTION: Who can withdraw */}
            <h2 id="who-can-withdraw" style={hStyle}>Who Can Withdraw PF Online?</h2>
            <p style={pStyle}>
              Online withdrawal is available to any member who meets these conditions.
            </p>
            <BulletList items={[
              'An activated UAN.',
              'Aadhaar, PAN, and bank account verified against the UAN.',
              'A mobile number linked to Aadhaar and active for OTP verification.',
              'Eligibility through retirement, unemployment, or a valid partial withdrawal reason.',
              'An updated Date of Exit recorded under Service History for the previous employer.',
            ]} />
            <p style={pStyle}>
              If your UAN isn&apos;t activated yet, the <Link href="/blogs/epfo-login-uan-passbook" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>EPFO Login 2026 guide</Link> covers activation through the UMANG app with Aadhaar Face Authentication before you attempt a withdrawal claim.
            </p>

            {/* SECTION: Online steps */}
            <h2 id="withdraw-online-steps" style={hStyle}>How to Withdraw PF Online: Step by Step</h2>
            <NumberedSteps steps={[
              { title: 'Log in to the UAN Member Portal', text: 'Sign in at unifiedportal-mem.epfindia.gov.in with your UAN and password.' },
              { title: 'Verify your KYC', text: 'Go to Manage, then KYC, and confirm your Aadhaar and bank details are correct and current.' },
              { title: 'Open the claim form', text: 'Go to Online Services and select Claim (Form-31, 19, 10C and 10D).' },
              { title: 'Verify your bank account', text: 'Enter the required details and click Verify.' },
              { title: 'Accept the certificate of undertaking', text: 'Click Yes, then Proceed for Online Claim.' },
              { title: 'Select the claim type', text: 'Choose PF Advance (Form 31) if still employed, Only PF Withdrawal (Form 19) if you have left the job, or Only Pension Withdrawal (Form 10C) if claiming the EPS component.' },
              { title: 'Submit with OTP', text: 'Tick the disclaimer box, enter the OTP sent to your Aadhaar-linked mobile number, and click Submit.' },
              { title: 'Track the claim', text: 'Use Track Claim Status on the same portal to follow your claim through to settlement.' },
            ]} />

            {/* SECTION: Check claim status */}
            <h2 id="check-claim-status" style={hStyle}>How to Check Your PF Claim Status Online</h2>
            <p style={pStyle}>
              Checking status is a separate action from filing the claim itself: log in to the Member e-Sewa portal, open Online Services, and select Track Claim Status to see your reference number and current stage.
            </p>
            <p style={pStyle}>
              What each status label actually means (Payment Under Process, Settled, Pending at Employer, DA/AO Pending, Rejected), what to do when a claim marked "Settled" shows no money yet, and how to fix a rejected claim are covered in full in the <Link href="/blogs/epfo-claim-status" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>EPFO claim status guide</Link>, along with the missed call, SMS, and toll-free helpline options for checking without logging in at all.
            </p>

            <CalcCTA
              href="/calculators/epf-calculator"
              label="EPF Calculator"
              note="Project your EPF maturity balance from your current basic salary and years left to retirement, before you decide whether to withdraw or let it grow."
            />

            {/* SECTION: UMANG */}
            <h2 id="umang-withdrawal" style={hStyle}>How to Withdraw PF via the UMANG App</h2>
            <p style={pStyle}>
              UMANG lets members file a withdrawal claim without visiting the Member e-Sewa portal at all, useful when the web portal is slow or you only have a phone handy.
            </p>
            <NumberedSteps steps={[
              { title: 'Open UMANG and log in', text: 'Sign in with your registered mobile number.' },
              { title: 'Search for EPFO services', text: 'Select EPFO from the list of available services.' },
              { title: 'Tap Raise Claim', text: 'This sits under employee-centric services on the EPFO tile.' },
              { title: 'Enter your UAN and verify OTP', text: 'Enter your UAN and confirm the OTP sent to your Aadhaar-linked mobile number.' },
              { title: 'Select your withdrawal type', text: 'Choose Full PF Settlement, Partial PF Withdrawal (Advance), or Pension Withdrawal (EPS).' },
              { title: 'Verify bank details', text: 'Confirm the bank account already linked to your UAN.' },
              { title: 'Upload documents if required', text: 'Some partial withdrawal reasons need a supporting document upload.' },
              { title: 'Submit and note the reference number', text: 'Save the claim reference number to track status later.' },
            ]} />

            {/* SECTION: Offline */}
            <h2 id="offline-withdrawal" style={hStyle}>How to Withdraw PF Offline</h2>
            <p style={pStyle}>
              Offline withdrawal uses the Composite Claim Form, and which version you need depends on whether your Aadhaar and bank details are already seeded on the UAN portal.
            </p>
            <h3 style={h3Style}>Composite Claim Form (Aadhaar)</h3>
            <p style={pStyle}>
              Use this version if your Aadhaar and bank details are already seeded and your UAN is activated. It does not require employer attestation, and is submitted directly to your jurisdictional EPFO office.
            </p>
            <h3 style={h3Style}>Composite Claim Form (Non-Aadhaar)</h3>
            <p style={pStyle}>
              Use this version if Aadhaar and bank details are not yet seeded on the UAN portal. It requires your employer&apos;s attestation before submission to the jurisdictional EPFO office.
            </p>
            <p style={pStyle}>
              For partial withdrawals filed this way, self-certification replaces the multiple supporting certificates previously required, under EPFO&apos;s order dated February 20, 2017.
            </p>

            {/* SECTION: Withdrawal types */}
            <h2 id="withdrawal-types" style={hStyle}>Types of PF Withdrawal: Full vs Partial</h2>
            <h3 style={h3Style}>Complete Withdrawal</h3>
            <p style={pStyle}>
              Full withdrawal of the PF component is available only on unemployment or retirement.
            </p>
            <InfoTable
              caption="Full PF withdrawal limits by condition"
              headers={['Condition', 'Withdrawal Limit']}
              rows={[
                ['Unemployment (PF component)', '75% immediately after 1 month; remaining 25% after 2 months of unemployment'],
                ['Pension component (EPS)', '75% after the required waiting period, 100% after 36 months of unemployment or at superannuation'],
              ]}
            />
            <p style={pStyle}>
              To withdraw 100% of the PF component specifically, a member must have been unemployed for at least 2 months; the pension component follows the separate 36-month timeline above.
            </p>

            <h3 style={h3Style}>Partial Withdrawal</h3>
            <p style={pStyle}>
              Partial withdrawal is allowed only for specific, defined reasons, each with its own limit.
            </p>
            <InfoTable
              caption="Partial PF withdrawal purposes, limits, and conditions"
              headers={['Purpose', 'Limit', 'Service Required', 'Conditions']}
              rows={[
                ['Medical', 'Employee share or 6 months\' wages, whichever is lower', '12 months', 'For self or family treatment'],
                ['Education', 'Up to 10 withdrawals over a career', '12 months', 'For children\'s education'],
                ['Marriage', 'Up to 5 withdrawals over a career', '12 months', 'For self or a family member\'s marriage'],
                ['House purchase', 'Up to 90% of EPF balance', '12 months', 'Property must be in the member\'s or spouse\'s name'],
                ['Home renovation', 'Up to 12 times monthly wages', '12 months', 'Property must be in the member\'s or spouse\'s name'],
                ['Pre-retirement', 'Up to 90% of balance', 'After age 54, or 1 year before retirement', 'Applies close to retirement'],
                ['Special cases (no salary, establishment closure)', 'Up to 100% of employee share', '12 months', 'No salary for 2 months, or the establishment has closed'],
              ]}
            />

            {/* SECTION: Pension withdrawal */}
            <h2 id="pension-withdrawal" style={hStyle}>EPS Pension Withdrawal Rules</h2>
            <p style={pStyle}>
              The pension component under the Employees&apos; Pension Scheme follows its own service-based rules, separate from the PF component.
            </p>
            <InfoTable
              caption="EPS pension withdrawal eligibility by service length"
              headers={['Service Length', 'Pension Withdrawal Rule']}
              rows={[
                ['Less than 6 months', 'Withdrawal is generally not permitted'],
                ['6 months to 9.5 years', 'Full pension amount can be withdrawn using Form 10C'],
                ['More than 9.5 years', 'Cash withdrawal is not available; a monthly pension applies instead'],
              ]}
            />
            <p style={pStyle}>
              Regardless of service length, the new 36-month waiting period under the EPF Scheme, 2026 applies before an eligible pension withdrawal can be processed, counted from your last contribution date or your superannuation age, whichever is earlier.
            </p>

            {/* SECTION: Which form */}
            <h2 id="which-form" style={hStyle}>Which PF Withdrawal Form Should You File?</h2>
            <InfoTable
              caption="EPF withdrawal and settlement forms"
              headers={['Form', 'Purpose']}
              rows={[
                ['Form 19', 'Full and final settlement of the PF balance after leaving a job'],
                ['Form 31', 'Partial withdrawal or advance while still employed'],
                ['Form 10C', 'Pension (EPS) withdrawal when total service is under 9.5 years'],
                ['Form 10D', 'Monthly pension claim after 9.5 years or more of service'],
                ['Form 20', 'PF withdrawal by a nominee or legal heir for a deceased member'],
              ]}
            />

            {/* SECTION: Rejection reasons */}
            <h2 id="claim-rejected" style={hStyle}>Why PF Withdrawal Claims Get Rejected</h2>
            <InfoTable
              caption="Common PF claim rejection reasons and fixes"
              headers={['Reason Shown', 'Likely Cause', 'Fix']}
              rows={[
                ['Name mismatch', 'Your name in EPFO records differs from your Aadhaar or bank account', 'Submit a Joint Declaration Form to correct the mismatched record'],
                ['Unclear cheque or passbook image', 'The uploaded scan doesn\'t clearly show your name or IFSC code', 'Re-upload a clear, well-lit scan or photo of the cheque or passbook page'],
                ['Wrong form or reason selected', 'You applied for Form 31 (Advance) but selected an "Out of Service" reason, or a similar mismatch', 'Re-file the claim with the form and reason that actually matches your employment status'],
                ['Settled but returned', 'The payment bounced because the bank account is dormant, frozen, or the IFSC code was wrong', 'Update your bank details on the portal, then re-submit the claim'],
              ]}
            />

            {/* SECTION: Taxability */}
            <h2 id="taxability" style={hStyle}>PF Withdrawal Taxability</h2>
            <p style={pStyle}>
              Tax treatment depends entirely on how long you have contributed continuously to the fund.
            </p>
            <InfoTable
              caption="PF withdrawal tax treatment by service tenure"
              headers={['Service Tenure', 'Tax Treatment']}
              rows={[
                ['5 years or more', 'Withdrawal is fully tax-free'],
                ['Less than 5 years, amount under Rs 50,000', 'No TDS deducted'],
                ['Less than 5 years, amount above Rs 50,000, PAN linked', '10% TDS deducted'],
                ['Less than 5 years, amount above Rs 50,000, PAN not linked', '30% TDS deducted'],
              ]}
            />
            <p style={pStyle}>
              If your service is under 5 years but your total income for the year is below the basic taxable limit, submitting Form 15G, or Form 15H if you are a senior citizen, before the claim is processed prevents TDS from being deducted at all.
            </p>

            {/* SECTION: EPFO 3.0 */}
            <h2 id="epfo-3-0" style={hStyle}>EPFO 3.0: ATM and UPI Withdrawal</h2>
            <p style={pStyle}>
              EPFO 3.0 adds instant withdrawal channels on top of the existing portal and app routes, alongside a much higher auto-settlement limit.
            </p>
            <InfoTable
              caption="EPFO 3.0 withdrawal channels and limits"
              headers={['Feature', 'Detail']}
              rows={[
                ['Auto-settlement limit', 'Raised to Rs 5 lakh, from the earlier Rs 1 lakh, for fully KYC-compliant members'],
                ['UPI withdrawal', 'Up to roughly 75% of the eligible balance, subject to the 25% minimum retention rule'],
                ['ATM withdrawal', 'Up to roughly 50% of the eligible balance, subject to the same minimum retention rule'],
                ['Manual verification claims', 'Still processed the standard way, without the instant ATM or UPI route'],
              ]}
            />
            <p style={pStyle}>
              Both instant routes still respect the EPF Scheme, 2026 requirement to retain at least 25% of the eligible balance, so neither channel can be used to fully empty an active account.
            </p>

            {/* SECTION: Deceased member */}
            <h2 id="deceased-member" style={hStyle}>How to Withdraw the EPF of a Deceased Member</h2>
            <p style={pStyle}>
              The registered nominee, or the legal heir if no nominee was recorded, can claim the deceased member&apos;s balance.
            </p>
            <BulletList items={[
              <span key="d1"><strong>PF balance:</strong> submit Form 20 to the jurisdictional EPFO office.</span>,
              <span key="d2"><strong>Pension or family pension:</strong> submit Form 10D to claim the EPS-linked amount.</span>,
            ]} />

            {/* SECTION: Customer care */}
            <h2 id="customer-care" style={hStyle}>PF Customer Care and Grievance Redressal</h2>
            <InfoTable
              caption="EPFO customer care contact points"
              headers={['Channel', 'Detail']}
              rows={[
                ['Toll-free helpline', '14470'],
                ['Missed call balance check', '9966044425'],
                ['SMS balance enquiry', 'EPFOHO UAN ENG to 7738299899, where ENG is your preferred language code'],
                ['Email', 'employeefeedback@epfindia.gov.in'],
              ]}
            />

            

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: PF Withdrawal and Claims</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="pf-withdrawal-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >

            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>PF Withdrawal Quick Reference</div>
              {([
                ['Scheme effective date', 'June 29, 2026'],
                ['Minimum balance retained', '25% of eligible balance'],
                ['Auto-settlement limit', 'Rs 5 lakh'],
                ['Target settlement (clean claims)', '3 working days'],
                ['EPS pension waiting period', '36 months'],
                ['Toll-free helpline', '14470'],
                ['SMS balance check', '7738299899'],
                ['Missed call balance check', '9966044425'],
                ['Official app', 'UMANG'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTAs */}
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Retirement Calculators</div>
                <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>EPF Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/eps-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>EPS Pension Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Retirement Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/epfo-claim-status', 'EPFO Claim Status: Check Your PF Claim Status'],
                ['/blogs/epfo-login-uan-passbook', 'EPFO Login 2026: UAN Portal and Passbook'],
                ['/blogs/pf-balance-check', 'PF Balance Check: 5 Ways to Check EPF Balance'],
              ] as [string, string][]).map(([href, title], i, arr) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: C.dark, textDecoration: 'none', lineHeight: 1.5 }}>
                    {title}
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .pf-withdrawal-sidebar::-webkit-scrollbar { width: 5px; }
        .pf-withdrawal-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pf-withdrawal-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pf-withdrawal-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
        @media (max-width: 900px) {
          article { grid-column: 1 / -1; }
          aside { display: none; }
        }
      `}</style>
    </>
  );
}
