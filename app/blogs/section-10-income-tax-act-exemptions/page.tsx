import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

const SLUG = 'section-10-income-tax-act-exemptions';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const TITLE = 'Section 10 of Income Tax Act: Exemptions List, Allowances and How to Claim';
const PUBLISHED = '2026-10-08T17:44:47+05:30';
const MODIFIED = '2026-10-13T18:35:25+05:30';

export const metadata: Metadata = {
  title: 'Section 10 of Income Tax Act: Exemptions List, HRA, LTA & How to Claim',
  description:
    'Section 10 of the Income Tax Act explained: the full list of tax exemptions and allowances (HRA, LTA, gratuity, leave encashment, 10(10D), agricultural income), which still work in the new tax regime, 2026 limit changes, worked examples and how to claim them in your ITR.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Section 10 of Income Tax Act: Exemptions List, Allowances and How to Claim',
    description:
      'Every Section 10 exemption in one place: HRA, LTA, children education allowance, gratuity, leave encashment, life insurance 10(10D), agricultural income. What changed under the Income-tax Act 2025 and which exemptions the new regime allows.',
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ['Fermor Analysis'],
    tags: ['Section 10', 'Income Tax Exemptions', 'HRA Exemption', 'Allowances', 'Income Tax India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 10 of Income Tax Act: Exemptions, Allowances, How to Claim',
    description: 'Full Section 10 exemptions list with limits, regime rules, 2026 changes and worked examples.',
  },
  keywords: [
    'section 10', 'section 10 of income tax act', 'section 10 exemptions', 'section 10 exemptions list',
    'tax exemptions', 'income tax exemptions', 'tax exempt income', 'exempt income under income tax act',
    'hra exemption', 'hra tax exemption', 'hra exemption calculator', 'hra full form', 'section 10(13a)',
    'lta allowance', 'leave travel allowance exemption', 'conveyance allowance', 'food allowance', 'travel allowance',
    'children education allowance', '10 14 i of income tax act', '10 10d income tax act', 'section 10(10d)',
    'gratuity exemption', 'leave encashment exemption', 'agriculture income', 'allowance meaning',
    'dearness allowance meaning', 'per diem meaning', 'exemption vs deduction', '80c exemptions list',
    'capital gains tax exemptions', '54f exemption', 'section 11 income tax act 2025', 'new tax regime exemptions',
  ],
};

const faqItems = [
  { q: 'What is Section 10 of the Income Tax Act?', a: 'Section 10 of the Income Tax Act, 1961 lists the incomes that are left out of your total income and therefore not taxed, either fully or up to a limit. It covers salary allowances such as HRA and LTA, retirement benefits such as gratuity and leave encashment, agricultural income, life insurance proceeds and several other receipts. For income earned up to 31 March 2026 it still applies, since the Income-tax Act, 2025 only takes over from 1 April 2026.' },
  { q: 'What are the tax exemptions under Section 10?', a: 'The main Section 10 tax exemptions are agricultural income 10(1), a partner\'s share of profit 10(2A), leave travel allowance 10(5), gratuity 10(10), commuted pension 10(10A), leave encashment 10(10AA), retrenchment compensation 10(10B), voluntary retirement compensation 10(10C), life insurance proceeds 10(10D), provident fund and Sukanya Samriddhi interest 10(11) and 10(11A), house rent allowance 10(13A), special allowances 10(14), and interest on specified savings certificates 10(15). Several capital gains and dividend exemptions, such as 10(34) and 10(38), have ended.' },
  { q: 'Has Section 10 been replaced under the Income-tax Act, 2025?', a: 'Yes, for income of tax year 2026-27 onward. Section 11 of the Income-tax Act, 2025 now carries the exempt-income provisions, and the individual exemptions moved into Schedules II to VII. The 1961 Act and Section 10 still govern income earned up to 31 March 2026, so the return you file for assessment year 2026-27 is still read against Section 10.' },
  { q: 'Which Section 10 exemptions are available in the new tax regime?', a: 'The new tax regime allows only a short list of Section 10 exemptions: gratuity, leave encashment on retirement, commuted pension, retrenchment and voluntary retirement compensation, life insurance proceeds under 10(10D), agricultural income, the employer-provided meal exemption and travel or daily allowances spent on official duty. HRA, LTA, children education and hostel allowance are old regime only. Choose the regime after running both through the old vs new tax regime calculator.' },
  { q: 'How is HRA exemption calculated under Section 10(13A)?', a: 'HRA exemption under Section 10(13A) is the lowest of three amounts: the HRA your employer actually pays, 50% of basic salary plus DA if you live in a metro city (40% elsewhere), and the rent you pay minus 10% of basic salary plus DA. Everything above that lowest figure is taxable. You can only claim it if you pay rent and you are in the old tax regime.' },
  { q: 'What is the full form of HRA and who can claim it?', a: 'HRA stands for House Rent Allowance, the part of salary an employer pays towards your rented accommodation. Any salaried employee who receives HRA, pays rent and has opted for the old tax regime can claim the exemption. If your salary has no HRA component, Section 80GG may let you deduct rent instead.' },
  { q: 'Which cities count as metro cities for HRA exemption?', a: 'Under the Income-tax Rules, 2026, eight cities qualify for the 50% rate: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune and Ahmedabad. Earlier only the first four did. Every other city uses 40%.' },
  { q: 'How do I use an HRA exemption calculator?', a: 'Enter your annual basic salary plus dearness allowance, the HRA you receive, the rent you pay and whether your city is a metro, and the HRA calculator returns the exempt and taxable parts. Use annual figures if rent changed during the year, otherwise multiply monthly numbers by 12. The tool applies the same least-of-three rule the Income Tax Department uses.' },
  { q: 'Can I claim HRA if I live with my parents?', a: 'Yes, if you actually pay rent to your parents and they own the house. Keep a rent agreement or receipts, transfer the rent by bank so it leaves a trail, and note that your parents must declare that rent as their income. If annual rent exceeds ₹1,00,000 you must give the landlord\'s PAN.' },
  { q: 'What does Section 10(14)(i) of the Income Tax Act cover?', a: 'Section 10(14)(i) exempts allowances an employer pays to meet expenses actually incurred while performing official duties, such as travelling, daily allowance during tour or transfer, conveyance, a helper, research and uniform allowance. The exemption is capped at the amount actually spent, so any unspent balance is taxable. Allowances for ordinary commuting to the office do not qualify.' },
  { q: 'How much is the children education allowance exemption?', a: 'Under the Income-tax Rules, 2026, children education allowance is exempt up to ₹3,000 per month per child for a maximum of two children, up from ₹100. Hostel allowance is exempt up to ₹9,000 per month per child for two children, up from ₹300. Both are available only in the old tax regime.' },
  { q: 'Is food allowance or meal voucher tax free?', a: 'Employer-provided meals during working hours are tax free up to ₹200 per meal under the Income-tax Rules, 2026, up from ₹50. At two meals a day and 22 working days that is ₹8,800 a month or ₹1,05,600 a year, provided the benefit is a meal or meal voucher and not cash. Confirm the rule is applied in your payroll.' },
  { q: 'Is conveyance allowance or travel allowance exempt from tax?', a: 'Conveyance and travel allowance are exempt only to the extent you actually spend them on official duty, under Section 10(14)(i). A fixed monthly conveyance allowance for commuting to office is taxable. Keep bills or a signed declaration so your employer does not deduct TDS on it.' },
  { q: 'What is LTA allowance and how many journeys are exempt?', a: 'LTA, or leave travel allowance, is the part of salary paid for travel within India on leave with your family. Section 10(5) exempts the actual domestic fare for two journeys in a block of four calendar years, and nothing for hotels, food or local sightseeing. It is available only in the old tax regime, and the LTA calculator shows how much of your allowance is exempt.' },
  { q: 'What does 10(10D) of the Income Tax Act exempt?', a: 'Section 10(10D) exempts the sum received on maturity or death under a life insurance policy, including bonus. Maturity proceeds lose the exemption if the annual premium exceeds 10% of the sum assured for policies issued from 1 April 2012, if the aggregate premium on non-ULIP policies issued from 1 April 2023 is above ₹5 lakh a year, or if ULIP premium exceeds ₹2.5 lakh a year. A death benefit received by a nominee is always exempt.' },
  { q: 'Is gratuity tax free and what is the limit?', a: 'Gratuity is fully tax free for government employees. For private employees covered by the Payment of Gratuity Act, the exempt amount is the lowest of the gratuity received, ₹20 lakh, or 15 days of last drawn salary for each completed year of service (15/26 of monthly basic plus DA times years). The ₹20 lakh limit is cumulative across all your employers over your lifetime.' },
  { q: 'Is leave encashment taxable?', a: 'Leave encashment while you are still working is fully taxable as salary. When you retire or resign, a government employee gets it fully exempt, while others get the lowest of ₹25 lakh, the amount received, 10 months\' average salary, or the cash value of unavailed leave. The ₹25 lakh limit applies across all employers combined.' },
  { q: 'What does Section 10(10C) exempt?', a: 'Section 10(10C) exempts compensation received on voluntary retirement under a scheme that meets Rule 2BA, up to the lowest of ₹5 lakh, 3 months\' salary for each completed year of service, or salary at retirement multiplied by the months of service left. The ₹5 lakh limit is a lifetime ceiling across employers. Anything above it is taxed as salary.' },
  { q: 'Is the maturity amount of a Sukanya Samriddhi Account exempt?', a: 'Yes. Payments from a Sukanya Samriddhi Account, including interest and the maturity amount, are exempt under Section 10(11A), and deposits qualify for Section 80C. That makes SSY an EEE product. Check the Sukanya Samriddhi Yojana guide for current rates and the SSY calculator for maturity value.' },
  { q: 'Is NPS exempt from tax?', a: 'NPS is partly exempt. On exit at retirement, up to 60% of the corpus can be withdrawn tax free, and the remaining 40% must go into an annuity whose payouts are taxable. Contributions are separately deductible under Sections 80CCD(1), 80CCD(1B) and 80CCD(2), the last one also in the new regime.' },
  { q: 'What is the difference between a tax exemption and a tax deduction?', a: 'A tax exemption removes an income from your total income altogether, so it never enters the calculation, while a deduction such as Section 80C is subtracted from your total income after the income has been counted. Section 10 lists exemptions, and Chapter VI-A (Sections 80C to 80U) lists deductions. Both reduce taxable income, but exemptions often carry their own caps and conditions.' },
  { q: 'Is agricultural income taxable?', a: 'Agricultural income from land in India is exempt under Section 10(1). However, if your non-agricultural income exceeds the basic exemption limit and your net agricultural income is above ₹5,000, the agricultural income is added back to work out the rate of tax on your other income, a method called partial integration. It still is not taxed itself, but it can push your other income into a higher slab.' },
  { q: 'Is dividend income exempt under Section 10(34)?', a: 'No longer. Section 10(34) exempted dividends from Indian companies only up to 31 March 2020, because the company paid dividend distribution tax. From 1 April 2020 dividends are taxed in the shareholder\'s hands at slab rates.' },
  { q: 'Is the 54F exemption part of Section 10?', a: 'No. Section 54F is a capital gains exemption that sits in Chapter IV, not Section 10. It lets you avoid tax on long-term gains from selling an asset other than a house if you invest the net sale proceeds in a residential house. The only capital gains exemptions in Section 10 are 10(37) and the ended 10(38).' },
  { q: 'How do I claim Section 10 exemptions in my ITR?', a: 'Declare allowance exemptions such as HRA to your employer through Form 12BB so TDS is cut on the lower taxable figure, and your Form 16 will show the exempt amounts. In the ITR, salary exemptions go in the salary schedule and other exempt income, like agricultural income above ₹5,000, in Schedule EI. Keep rent receipts, travel tickets and policy documents ready in case of a notice.' },
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  description:
    'Complete guide to Section 10 of the Income Tax Act: the exemptions list, salary allowances, retirement benefits, life insurance 10(10D), agricultural income, the 2026 limit changes, regime-wise availability, worked examples and how to claim.',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Section 10 of the Income Tax Act, 1961', description: 'Exempt income provisions: incomes excluded from total income' },
    { '@type': 'Thing', name: 'House Rent Allowance exemption', description: 'Section 10(13A) HRA exemption for salaried taxpayers' },
    { '@type': 'Thing', name: 'Income-tax Act, 2025', description: 'The Act in force from 1 April 2026 that carries exempt income in Section 11 and Schedules II to VII' },
  ],
  keywords: 'section 10, section 10 of income tax act, tax exemptions, hra exemption, lta allowance, 10(10D), gratuity exemption, leave encashment exemption, income tax exemptions list',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 10 of Income Tax Act', item: PAGE_URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Claim Section 10 Exemptions',
  description: 'Steps to claim Section 10 exemptions on your salary and other income, from the employer declaration to the income tax return',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Pick the regime', text: 'Compare the old and new tax regimes, since HRA, LTA, children education and hostel allowance are available only in the old regime.' },
    { '@type': 'HowToStep', position: 2, name: 'Declare to your employer', text: 'Submit Form 12BB with rent receipts, landlord PAN for annual rent above Rs 1,00,000 and LTA travel proof so TDS is calculated on the lower taxable salary.' },
    { '@type': 'HowToStep', position: 3, name: 'Check Form 16', text: 'Confirm that Form 16 Part B shows each exempt allowance under Section 10 with the right amount.' },
    { '@type': 'HowToStep', position: 4, name: 'Report in the ITR', text: 'Fill the salary schedule with the exempt allowances and report other exempt income, such as agricultural income above Rs 5,000, in Schedule EI.' },
    { '@type': 'HowToStep', position: 5, name: 'File and e-verify', text: 'Choose the correct ITR form, file before the due date and e-verify the return. Keep supporting documents for several years.' },
  ],
};

const TOC_ITEMS = [
  { id: 'what-is-section-10', label: 'What is Section 10?' },
  { id: 'income-tax-act-2025', label: 'Section 10 vs the Income-tax Act 2025' },
  { id: 'exemptions-list', label: 'Section 10 exemptions list' },
  { id: 'new-regime', label: 'Exemptions in the new tax regime' },
  { id: 'hra', label: 'HRA exemption 10(13A)' },
  { id: 'lta', label: 'LTA exemption 10(5)' },
  { id: 'special-allowances', label: 'Special allowances 10(14)' },
  { id: 'retirement', label: 'Gratuity, leave encashment, pension' },
  { id: 'life-insurance', label: 'Life insurance 10(10D)' },
  { id: 'savings', label: 'PF, SSY, NPS, savings interest' },
  { id: 'agricultural', label: 'Agricultural income 10(1)' },
  { id: 'ended', label: 'Exemptions that have ended' },
  { id: 'how-to-claim', label: 'How to claim' },
  { id: 'salaried-impact', label: 'Impact on salaried taxpayers' },
  { id: 'mistakes', label: 'Common mistakes' },
  { id: 'faq', label: 'FAQs' },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: TITLE,
  url: PAGE_URL,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Section 10',
      alternateName: 'Exempt income under the Income Tax Act, 1961',
      description: 'Section 10 of the Income Tax Act, 1961 lists incomes that are not included in total income, fully or up to a prescribed limit.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'House Rent Allowance',
      alternateName: 'HRA',
      description: 'The allowance an employer pays towards an employee\'s rent, exempt under Section 10(13A) up to the least of three prescribed amounts in the old tax regime.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: { '@type': 'Audience', audienceType: 'Salaried employees, retirees and taxpayers in India', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    ...TOC_ITEMS.map(t => ({ '@type': 'WebPageElement', cssSelector: `#${t.id}`, name: t.label })),
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
  knowsAbout: [
    'Income Tax India',
    'Section 10 Exemptions',
    'HRA Exemption',
    'Salary Tax Planning',
    'Income-tax Act 2025',
    'Old vs New Tax Regime',
    'Personal Finance India',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const C = {
  dark: '#111111',
  dg: '#101214',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
  green: '#166534',
  paleDg: '#f1f3f4',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em', scrollMarginTop: 80 } as React.CSSProperties;
const h3Style = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, marginTop: 24, marginBottom: 10 } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;
const linkStyle = { color: C.dg, fontWeight: 600 } as React.CSSProperties;

const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, verticalAlign: 'middle' } as React.CSSProperties;
const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'left', lineHeight: 1.55 } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'right', lineHeight: 1.55 } as React.CSSProperties;

type Col = { label: string; num?: boolean };

function DataTable({ caption, cols, rows, minWidth = 520 }: { caption: string; cols: Col[]; rows: React.ReactNode[][]; minWidth?: number }) {
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0', fontFamily: INTER, WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <table style={{ width: '100%', minWidth, borderCollapse: 'collapse', fontSize: 13, captionSide: 'bottom' }}>
        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 2px 0' }}>{caption}</caption>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.label} scope="col" style={c.num ? { ...thS, textAlign: 'right' } : thS}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={cols[j].num ? tdR : j === 0 ? { ...tdL, color: C.ink, fontWeight: 600 } : tdL}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function L({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</Link>;
}

function ExtL({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>;
}

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Section 10 of Income Tax Act' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
        {TOC_ITEMS.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} className="toc-link" style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '6px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: C.ink3, fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function KeyLimits() {
  const rows = [
    { label: 'HRA metro rate', value: '50% (8 cities)' },
    { label: 'HRA other cities', value: '40%' },
    { label: 'Children education', value: '₹3,000/mo/child' },
    { label: 'Hostel allowance', value: '₹9,000/mo/child' },
    { label: 'Meal exemption', value: '₹200 per meal' },
    { label: 'Gratuity limit', value: '₹20 lakh' },
    { label: 'Leave encashment', value: '₹25 lakh' },
    { label: 'VRS / retrenchment', value: '₹5 lakh' },
    { label: 'Agri income limit', value: 'No limit' },
  ];
  return (
    <SidebarCard title="Key Limits at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{r.value}</span>
        </div>
      ))}
    </SidebarCard>
  );
}

function RegimeSnapshot() {
  const rows = [
    { label: 'Old regime only', value: 'HRA, LTA, education, hostel' },
    { label: 'Both regimes', value: 'Gratuity, 10(10D), agri income' },
    { label: 'Governing law FY25-26', value: 'Income Tax Act, 1961' },
    { label: 'From 1 April 2026', value: 'Income-tax Act, 2025' },
  ];
  return (
    <SidebarCard title="Regime Snapshot">
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 12, color: C.ink3 }}>{r.label}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginTop: 2 }}>{r.value}</div>
        </div>
      ))}
    </SidebarCard>
  );
}

function FermorTools() {
  const tools = [
    { label: 'HRA Calculator', desc: 'Exempt and taxable HRA for your rent', href: '/calculators/hra-calculator' },
    { label: 'Old vs New Tax Regime Calculator', desc: 'See which regime leaves more in hand', href: '/calculators/old-vs-new-tax-regime-calculator' },
    { label: 'Income Tax Calculator', desc: 'Total tax after exemptions', href: '/calculators/income-tax-calculator' },
    { label: 'Gratuity Calculator', desc: 'Gratuity and its tax-free part', href: '/calculators/gratuity-calculator' },
    { label: 'LTA Calculator', desc: 'How much of your LTA is exempt', href: '/calculators/lta-calculator' },
    { label: 'Leave Encashment Tax Calculator', desc: 'Tax on leave encashment at exit', href: '/calculators/leave-encashment-tax-calculator' },
    { label: 'In-Hand Salary Calculator', desc: 'Take-home pay after exemptions', href: '/calculators/in-hand-salary-calculator' },
  ];
  return (
    <SidebarCard title="Fermor Calculators">
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </SidebarCard>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/old-vs-new-tax-regime', label: 'Old vs New Tax Regime: Which One to Choose' },
    { href: '/blogs/section-115bac-new-tax-regime', label: 'Section 115BAC: The New Tax Regime Explained' },
    { href: '/blogs/section-87a-rebate', label: 'Income Tax Rebate Under Section 87A: Limits and Marginal Relief' },
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New and Old Regime Rates' },
    { href: '/blogs/sukanya-samriddhi-yojana-2026', label: 'Sukanya Samriddhi Yojana (SSY) 2026: Rate, Eligibility, Rules' },
  ];
  return (
    <SidebarCard title="Related Articles">
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </SidebarCard>
  );
}

function BulletList({ items, mb = 20 }: { items: React.ReactNode[]; mb?: number }) {
  return (
    <ul style={{ margin: `0 0 ${mb}px`, padding: 0, listStyleType: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span aria-hidden="true" style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 9 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '8px 0 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
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
            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
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
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for general information and is not tax advice. Exemption limits, rules and rates can change through Finance Acts and CBDT notifications, and the Income-tax Rules, 2026 are new. Verify the current position on the official{' '}
        <ExtL href="https://www.incometax.gov.in">Income Tax Department portal</ExtL> or with a Chartered Accountant before filing. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function Section10Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Income Tax</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            Section 10 of the Income Tax Act: Exemptions List, Allowances and How to Claim
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Every Section 10 exemption in one place: HRA, LTA, gratuity, leave encashment, life insurance and agricultural income. Which ones the new tax regime still allows, what the 2026 rules changed, and how to claim each in your return.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime={MODIFIED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Oct 13, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>17 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 10 of the Income Tax Act, 1961 lists the incomes that are not taxed, either fully or up to a limit. For a salaried employee that means HRA, LTA, children education allowance and retirement benefits. For everyone else it includes agricultural income and life insurance proceeds.
            </p>
            <p style={pStyle}>
              Most of these exemptions work only in the old tax regime, and the Income-tax Act, 2025 moved them out of Section 10 from 1 April 2026. This guide covers each exemption with its current limit, flags the ones that have ended, and shows how to claim them.
            </p>

            <TableOfContents />

            <h2 id="what-is-section-10" style={hStyle}>What is Section 10 of the Income Tax Act?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Section 10 is the part of the Income Tax Act, 1961 that lists income which is not included in your total income, so it is not taxed, either in full or up to a prescribed limit.
              </p>
            </div>
            <p style={pStyle}>
              A tax exemption works differently from a deduction. An exempt income never enters your taxable income at all, while a deduction such as Section 80C is subtracted after the income has been counted. Section 10 holds the exemptions, and Chapter VI-A (Sections 80C to 80U) holds the deductions.
            </p>
            <p style={pStyle}>
              From a salaried employee&apos;s side, the exemptions fall into two groups. Exempt allowances are paid with your salary: HRA, LTA, children education allowance and the special allowances. Other exempt income arrives as a lump sum: gratuity, leave encashment, commuted pension, retrenchment and voluntary retirement compensation, and maturity proceeds of life insurance.
            </p>

            <h2 id="income-tax-act-2025" style={hStyle}>Section 10 and the Income-tax Act, 2025: What Changed From 1 April 2026</h2>
            <p style={pStyle}>
              The Income-tax Act, 2025 replaced the 1961 Act from 1 April 2026, and Section 11 of the new Act now carries the exempt-income provisions that Section 10 used to hold. The individual exemptions moved into Schedules II to VII instead of a single long section with more than 50 clauses.
            </p>
            <p style={pStyle}>
              The Central Board of Direct Taxes notified the Income-tax Rules, 2026 on 20 March 2026, and the Income Tax Department confirmed in its{' '}
              <ExtL href="https://www.incometax.gov.in">1 April 2026 press release</ExtL> that the new Act is in force. HRA is now worked out under Rule 279 of those rules, and the children education and hostel allowances under Rule 280.
            </p>
            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>Which law applies to your return?</strong> Income earned up to 31 March 2026, which you report in the return for assessment year 2026-27, is still governed by the 1961 Act and Section 10. Income from 1 April 2026 onward falls under the 2025 Act and is reported for tax year 2026-27. The substance of most exemptions carried over unchanged, but several limits were raised, as the sections below show.
            </Callout>

            <h2 id="exemptions-list" style={hStyle}>Section 10 Exemptions List: Every Major Exemption and Its Limit</h2>
            <p style={pStyle}>
              The Section 10 exemptions list below covers every exemption an individual taxpayer is likely to meet, with the sub-section, the current limit and whether it still exists. Use it as the quick reference, then read the sections that apply to you.
            </p>
            <DataTable
              caption="Section 10 exemptions for individuals, with current limit and status. Source: Income Tax Act, 1961 and Income-tax Rules, 2026."
              minWidth={760}
              cols={[{ label: 'Section' }, { label: 'Exemption' }, { label: 'Limit or condition' }, { label: 'Status' }]}
              rows={[
                ['10(1)', 'Agricultural income', 'No limit; partial integration applies', 'Active'],
                ['10(2A)', 'Partner\'s share of firm or LLP profit', 'Fully exempt', 'Active'],
                ['10(5)', 'Leave travel allowance', 'Actual domestic fare, 2 journeys per 4-year block', 'Active, old regime'],
                ['10(10)', 'Gratuity', 'Lowest of actual, ₹20 lakh, 15/26 formula (private)', 'Active'],
                ['10(10A)', 'Commuted pension', 'Full for government; 1/3 or 1/2 of value for others', 'Active'],
                ['10(10AA)', 'Leave encashment on retirement', 'Lowest of ₹25 lakh and three other measures (non-government)', 'Active'],
                ['10(10B)', 'Retrenchment compensation', 'Lowest of ₹5 lakh and 15 days\' pay per year of service', 'Active'],
                ['10(10C)', 'Voluntary retirement compensation', 'Up to ₹5 lakh, lifetime', 'Active'],
                ['10(10D)', 'Life insurance proceeds', 'Premium and sum assured conditions apply', 'Active'],
                ['10(11), 10(11A)', 'Statutory PF, PPF and Sukanya Samriddhi payments', 'PF interest taxable on contributions above ₹2.5 lakh a year', 'Active'],
                ['10(13A)', 'House rent allowance', 'Least of three amounts', 'Active, old regime'],
                ['10(14)', 'Special allowances (duty-linked and prescribed)', 'Actual spend or notified cap', 'Active, partly old regime'],
                ['10(15)', 'Interest on specified savings certificates and post office savings account', '₹3,500 individual, ₹7,000 joint (post office savings)', 'Active'],
                ['10(23C)', 'Educational and medical institutions', 'Annual receipts up to ₹5 crore, plus conditions', 'Active'],
                ['10(26), 10(26AAA)', 'Scheduled Tribes in specified areas; Sikkimese individuals', 'Income from specified sources in those areas', 'Active'],
                ['10(37)', 'Capital gains on compulsory acquisition of urban agricultural land', 'Conditions on use and reinvestment', 'Active'],
                ['10(34), 10(34A), 10(35), 10(38)', 'Dividends, buy-back, specified mutual fund income, equity LTCG', 'See the ended exemptions section', 'Ended'],
                ['10AA', 'SEZ units', 'Units that began before 1 April 2021', 'Sunset'],
              ]}
            />

            <h2 id="new-regime" style={hStyle}>Which Section 10 Exemptions Work in the New Tax Regime?</h2>
            <p style={pStyle}>
              The new tax regime keeps only the exemptions that are not tied to salary structuring, so HRA, LTA, children education allowance and hostel allowance are available in the old regime alone. The new regime is Section 115BAC of the 1961 Act and Section 202 of the 2025 Act, and it is the default unless you opt out.
            </p>
            <DataTable
              caption="Availability of Section 10 exemptions by regime. Sources: Income Tax Act, 1961 and Income-tax Rules, 2026."
              minWidth={560}
              cols={[{ label: 'Exemption' }, { label: 'Old regime' }, { label: 'New regime' }]}
              rows={[
                ['HRA 10(13A)', 'Yes', 'No'],
                ['LTA 10(5)', 'Yes', 'No'],
                ['Children education and hostel allowance', 'Yes', 'No'],
                ['Travel or daily allowance on official duty 10(14)(i)', 'Yes', 'Yes'],
                ['Employer meal exemption', 'Yes', 'Yes'],
                ['Gratuity, leave encashment, commuted pension', 'Yes', 'Yes'],
                ['Retrenchment and voluntary retirement compensation', 'Yes', 'Yes'],
                ['Life insurance proceeds 10(10D)', 'Yes', 'Yes'],
                ['Agricultural income 10(1)', 'Yes', 'Yes'],
              ]}
            />
            <p style={pStyle}>
              Whether the old regime is worth it depends on how many of the old-regime-only exemptions and deductions you can actually claim. The{' '}
              <L href="/blogs/old-vs-new-tax-regime">old vs new tax regime guide</L> works through the break-even, and the{' '}
              <L href="/blogs/section-115bac-new-tax-regime">Section 115BAC explainer</L> covers the new regime&apos;s slabs. For a quick answer, run your numbers through the{' '}
              <L href="/calculators/old-vs-new-tax-regime-calculator">Old vs New Tax Regime Calculator</L>.
            </p>

            <h2 id="hra" style={hStyle}>HRA Exemption Under Section 10(13A): Formula, Metro Cities and Example</h2>
            <p style={pStyle}>
              HRA exemption is the lowest of three amounts: the HRA actually received, 50% of basic salary plus dearness allowance in a metro city (40% elsewhere), and rent paid minus 10% of basic salary plus dearness allowance. HRA stands for House Rent Allowance, and you can claim it only if you pay rent and have chosen the old tax regime.
            </p>
            <DataTable
              caption="The three HRA tests under Section 10(13A) and Rule 279 of the Income-tax Rules, 2026. The exempt HRA is the lowest result."
              minWidth={520}
              cols={[{ label: 'Test' }, { label: 'Metro city' }, { label: 'Other cities' }]}
              rows={[
                ['1. HRA received from employer', 'Actual HRA', 'Actual HRA'],
                ['2. Share of basic plus DA', '50%', '40%'],
                ['3. Rent paid minus 10% of basic plus DA', 'Rent less 10%', 'Rent less 10%'],
              ]}
            />
            <h3 style={h3Style}>Which cities count as metro for HRA?</h3>
            <p style={pStyle}>
              Eight cities qualify for the 50% rate under the Income-tax Rules, 2026: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune and Ahmedabad. Before the new rules only the first four did, so an employee in Bengaluru or Pune gets a larger exemption than before.
            </p>
            <h3 style={h3Style}>HRA exemption example</h3>
            <p style={pStyle}>
              Take an employee with basic plus DA of ₹40,000 a month, HRA of ₹20,000 a month and rent of ₹24,000 a month. Annualised, that is ₹4,80,000 of salary, ₹2,40,000 of HRA and ₹2,88,000 of rent.
            </p>
            <DataTable
              caption="HRA exemption for the same employee in a metro city and in a non-metro city. All figures annual, in rupees."
              minWidth={560}
              cols={[{ label: 'Test' }, { label: 'Bengaluru (50%)', num: true }, { label: 'Jaipur (40%)', num: true }]}
              rows={[
                ['HRA received', '2,40,000', '2,40,000'],
                ['Share of basic plus DA', '2,40,000', '1,92,000'],
                ['Rent paid minus 10% of salary', '2,40,000', '2,40,000'],
                ['Exempt HRA (lowest)', '2,40,000', '1,92,000'],
                ['Taxable HRA', '0', '48,000'],
              ]}
            />
            <p style={pStyle}>
              The same salary and rent leave nothing to tax in Bengaluru and ₹48,000 of taxable HRA in Jaipur. Run your own figures through the{' '}
              <L href="/calculators/hra-calculator">HRA Calculator</L> to see the exempt and taxable split.
            </p>
            <h3 style={h3Style}>Conditions to claim HRA</h3>
            <BulletList
              items={[
                'You must actually pay rent and keep receipts or a rent agreement.',
                'If annual rent is above ₹1,00,000, you must give the landlord\'s PAN to your employer.',
                'Rent paid to parents counts if they own the house and declare it as income, and it should be paid through a bank trail.',
                'HRA is not available in the new tax regime, so the claim only makes sense if you stay in the old one.',
                'No HRA in your salary? Section 80GG can allow a rent deduction in the old regime, up to ₹5,000 a month, with Form 10BA.',
              ]}
            />

            <h2 id="lta" style={hStyle}>LTA Exemption Under Section 10(5): Two Journeys in a Four-Year Block</h2>
            <p style={pStyle}>
              Leave Travel Allowance is an old-regime exemption for eligible domestic travel fare, subject to the block-year and fare-limit rules. The detailed guide to{' '}
              <L href="/blogs/lta-exemption-rules-claim">LTA exemption, eligibility and how to claim</L> covers the 2026-29 block, carry-forward, documents and worked calculations.
            </p>
            <p style={pStyle}>
              <L href="/calculators/lta-calculator">LTA Calculator</L> shows the exempt portion for your claim.
            </p>

            <h2 id="special-allowances" style={hStyle}>Special Allowances Under Section 10(14): Children Education, Hostel, Food and Travel</h2>
            <p style={pStyle}>
              Section 10(14) exempts two kinds of allowance: those paid to meet official expenses, up to the amount actually spent under 10(14)(i), and those the government has prescribed with a fixed cap under 10(14)(ii). The 2026 rules raised several of these caps for the first time in decades.
            </p>
            <DataTable
              caption="Allowance exemptions under Section 10(14) and related rules. Sources: Income-tax Rules, 2026 (Rules 280 and the meal perquisite rule)."
              minWidth={700}
              cols={[{ label: 'Allowance' }, { label: 'Old limit' }, { label: 'Current limit' }, { label: 'Regime' }]}
              rows={[
                ['Children education allowance', '₹100 per month per child', '₹3,000 per month per child, 2 children', 'Old only'],
                ['Hostel allowance', '₹300 per month per child', '₹9,000 per month per child, 2 children', 'Old only'],
                ['Employer-provided meals', '₹50 per meal', '₹200 per meal', 'Both'],
                ['Travel, daily, conveyance, helper, research, uniform on duty', 'Actual expense', 'Actual expense', 'Old for most'],
              ]}
            />
            <h3 style={h3Style}>Food allowance and meal vouchers</h3>
            <p style={pStyle}>
              Employer-provided meals during working hours are tax free up to ₹200 per meal, which at two meals a day and 22 working days comes to ₹8,800 a month or ₹1,05,600 a year. The benefit has to be a meal or a meal voucher, not cash, and the ₹200 figure is a per-meal ceiling, not a guaranteed annual amount.
            </p>
            <h3 style={h3Style}>Conveyance, travel and per diem allowances</h3>
            <p style={pStyle}>
              A conveyance or travel allowance is exempt only when it reimburses spend on official work, and any unspent part is taxable. A flat monthly allowance for commuting to your own office is taxable salary. A per diem, which is a fixed daily amount for meals and lodging during a work trip, is exempt only up to what you actually spend, which is why employers ask for a declaration or bills.
            </p>
            <h3 style={h3Style}>Dearness allowance meaning</h3>
            <p style={pStyle}>
              Dearness allowance (DA) is a cost-of-living payment added to basic pay, and unlike the allowances above it is fully taxable. It matters for Section 10 because DA that forms part of retirement benefits is included in the salary used for the HRA, gratuity and leave encashment formulas.
            </p>

            <h2 id="retirement" style={hStyle}>Gratuity, Leave Encashment, Pension and Compensation: The Retirement Exemptions</h2>
            <p style={pStyle}>
              Retirement and exit payments are largely tax free up to a limit, and the limits are lifetime ceilings across employers, not per job. The table gives the rule for each, and the sections after it walk through the working.
            </p>
            <DataTable
              caption="Retirement and exit exemptions under Section 10. Limits are cumulative across employers where marked."
              minWidth={760}
              cols={[{ label: 'Payment' }, { label: 'Government employee' }, { label: 'Other employee' }]}
              rows={[
                ['Gratuity 10(10)', 'Fully exempt', 'Lowest of actual, ₹20 lakh, 15 days\' salary per year of service'],
                ['Leave encashment at exit 10(10AA)', 'Fully exempt', 'Lowest of ₹25 lakh, amount received, 10 months\' average salary, cash value of unavailed leave'],
                ['Commuted pension 10(10A)', 'Fully exempt', '1/3 of full value if gratuity is also received, 1/2 if not'],
                ['Retrenchment compensation 10(10B)', 'Same rule', 'Lowest of ₹5 lakh, actual, 15 days\' average pay per year of service'],
                ['Voluntary retirement 10(10C)', 'Same rule', 'Lowest of ₹5 lakh, 3 months\' salary per year of service, salary left to retirement'],
              ]}
            />
            <h3 style={h3Style}>Gratuity exemption under Section 10(10)</h3>
            <p style={pStyle}>
              Gratuity is fully tax free for government employees. For a private employee covered by the Payment of Gratuity Act, the exempt amount is the lowest of the gratuity received, ₹20 lakh, and 15 days of last drawn basic plus DA for each completed year of service, worked out as monthly salary times 15/26 times years.
            </p>
            <p style={pStyle}>
              For example, an employee with ₹60,000 of monthly basic plus DA and 12 completed years gets 15/26 × 60,000 × 12, which is ₹4,15,385. That is well below ₹20 lakh, so the full amount is exempt. The{' '}
              <L href="/calculators/gratuity-calculator">Gratuity Calculator</L> returns the gratuity and its tax-free portion.
            </p>
            <h3 style={h3Style}>Leave encashment exemption under Section 10(10AA)</h3>
            <p style={pStyle}>
              Leave encashment is exempt only when you receive it on retirement or resignation, and it is fully taxable if you encash leave during service. A government employee gets the whole amount exempt, while others get the lowest of ₹25 lakh, the amount actually received, 10 months&apos; average salary, and the cash equivalent of unavailed leave. Work out the tax on yours with the{' '}
              <L href="/calculators/leave-encashment-tax-calculator">Leave Encashment Tax Calculator</L>.
            </p>
            <h3 style={h3Style}>Commuted pension, retrenchment and voluntary retirement</h3>
            <p style={pStyle}>
              A commuted pension, the lump sum you take instead of part of your monthly pension, is fully exempt for government employees. For others, one-third of the value is exempt if you also receive gratuity and half if you do not. Retrenchment compensation under the Industrial Disputes Act is exempt up to ₹5 lakh or 15 days&apos; average pay per year of service, whichever is lower.
            </p>
            <p style={pStyle}>
              Voluntary retirement compensation is exempt up to ₹5 lakh in a lifetime, provided the scheme follows Rule 2BA. For an employee with a salary of ₹80,000 and 20 completed years, 3 months&apos; salary per year of service would be ₹48 lakh, so the ₹5 lakh ceiling is what actually applies.
            </p>

            <h2 id="life-insurance" style={hStyle}>Life Insurance Proceeds Under Section 10(10D): When the Exemption Is Lost</h2>
            <p style={pStyle}>
              Section 10(10D) exempts the sum received on maturity or death under a life insurance policy, but the exemption is lost if the premium crosses certain thresholds. The rules depend on when the policy was issued and whether it is a ULIP.
            </p>
            <DataTable
              caption="Conditions for the Section 10(10D) exemption on maturity proceeds. A death benefit paid to a nominee is always exempt."
              minWidth={620}
              cols={[{ label: 'Policy' }, { label: 'Exemption applies if' }]}
              rows={[
                ['Issued from 1 April 2012 (general)', 'Annual premium is not more than 10% of the sum assured'],
                ['Non-ULIP issued from 1 April 2023', 'Aggregate annual premium across such policies is not more than ₹5 lakh'],
                ['ULIP issued from 1 February 2021', 'Annual premium is not more than ₹2.5 lakh (aggregate across ULIPs)'],
                ['Death benefit to nominee', 'Always exempt'],
              ]}
            />
            <p style={pStyle}>
              Keyman insurance proceeds are not covered by 10(10D), and a policy taken for a person with disability or a specified disease has a higher 15% premium cap. If you are choosing a policy, test the premium against these limits before you buy, and use the{' '}
              <L href="/calculators/section-80c-calculator">Section 80C Calculator</L> to see how the premium fits your deductions.
            </p>

            <h2 id="savings" style={hStyle}>Provident Fund, Sukanya Samriddhi, NPS and Savings Interest</h2>
            <p style={pStyle}>
              Payments from a statutory provident fund and PPF are exempt under Section 10(11), and payments from a Sukanya Samriddhi Account are exempt under Section 10(11A). Interest on your own contribution to a provident fund is tax free only up to ₹2.5 lakh of contribution a year, or ₹5 lakh if there is no employer contribution.
            </p>
            <BulletList
              items={[
                <span key="pf">Provident fund: interest on contributions above the ₹2.5 lakh limit is taxable. Check your balance and rate on the{' '}<ExtL href="https://www.epfindia.gov.in">EPFO portal</ExtL> or in the <L href="/blogs/pf-balance-check">PF balance guide</L>, and project it with the <L href="/calculators/epf-calculator">EPF Calculator</L>.</span>,
                <span key="ssy">Sukanya Samriddhi: deposits, interest and maturity are all exempt, which makes the scheme EEE. See the <L href="/blogs/sukanya-samriddhi-yojana-2026">SSY 2026 guide</L> and the <L href="/calculators/ssy-calculator">SSY Calculator</L>.</span>,
                'NPS: up to 60% of the corpus withdrawn at retirement is tax free, and the remaining 40% buys an annuity whose income is taxable.',
                'Post office savings: interest is exempt up to ₹3,500 for an individual and ₹7,000 for a joint account under Section 10(15).',
              ]}
            />

            <h2 id="agricultural" style={hStyle}>Agricultural Income Under Section 10(1)</h2>
            <p style={pStyle}>
              Agricultural income from land in India is fully exempt under Section 10(1), with no upper limit. It covers the sale of produce, rent or revenue from agricultural land, income from farm buildings used for farming, and income from operations such as sowing, tilling and pruning.
            </p>
            <p style={pStyle}>
              One catch applies. If your net agricultural income is above ₹5,000 and your other income is above the basic exemption limit, the agricultural income is added back to decide the rate on your non-agricultural income. This partial integration does not tax the farm income, but it can move your other income into a higher slab. Report agricultural income above ₹5,000 in Schedule EI of the return.
            </p>
            <PromoBar name="Income Tax Calculator" desc="Add your exempt income and see your tax liability under both regimes in one run." href="/calculators/income-tax-calculator" />

            <h2 id="ended" style={hStyle}>Section 10 Exemptions That Have Ended</h2>
            <p style={pStyle}>
              Several exemptions you will still see quoted online no longer apply to current income. The main ones are the dividend exemption, the buy-back exemption, the mutual fund income exemption and the equity capital gains exemption.
            </p>
            <DataTable
              caption="Section 10 exemptions that no longer apply, and how the income is taxed now."
              minWidth={760}
              cols={[{ label: 'Section' }, { label: 'Was exempt' }, { label: 'Ended' }, { label: 'Tax treatment now' }]}
              rows={[
                ['10(34)', 'Dividend from Indian companies', 'After 31 March 2020', 'Taxed at slab rate in the shareholder\'s hands'],
                ['10(34A)', 'Buy-back of shares by a domestic company', 'Buy-backs on or after 1 October 2024', 'Taxed as deemed dividend'],
                ['10(35)', 'Income from specified mutual fund units', 'After 31 March 2020', 'Taxed as per the fund\'s category'],
                ['10(38)', 'Long-term capital gains on listed equity and equity funds', 'Sales after 31 March 2018', '12.5% on gains above ₹1.25 lakh under Section 112A (from 23 July 2024)'],
                ['10AA', 'Profits of SEZ units', 'Units set up after 31 March 2021', 'No new claims for later units'],
              ]}
            />
            <p style={pStyle}>
              Capital gains exemptions that people often file under Section 10, such as the 54F exemption and the 54EC exemption, sit in Chapter IV and not in Section 10. If you have a gain to plan around, the{' '}
              <L href="/calculators/capital-gains-calculator">Capital Gains Calculator</L> shows the tax before and after reinvestment.
            </p>

            <h2 id="how-to-claim" style={hStyle}>How to Claim Section 10 Exemptions</h2>
            <p style={pStyle}>
              You claim a Section 10 exemption by declaring it to your employer for TDS and then reporting it in your income tax return. The steps differ slightly for salary allowances and for other exempt income.
            </p>
            <ol style={{ margin: '0 0 20px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Pick the regime:</strong> compare both before the financial year starts, because HRA, LTA and the education allowances work only in the old regime.</li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Declare to your employer:</strong> submit Form 12BB with rent receipts, the landlord&apos;s PAN for rent above ₹1,00,000, and LTA travel proof so that TDS is cut on the lower figure.</li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Check Form 16:</strong> Part B should list each allowance exempt under Section 10. If an exemption is missing, you can still claim it in the return.</li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Report in the ITR:</strong> enter exempt allowances in the salary schedule and other exempt income, such as agricultural income above ₹5,000, in Schedule EI.</li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>File and e-verify:</strong> choose the right ITR form for your income sources, file on the{' '}<ExtL href="https://www.incometax.gov.in">Income Tax e-Filing portal</ExtL> before the due date and e-verify the return.</li>
            </ol>
            <p style={pStyle}>
              Keep rent receipts, tickets, policy documents and bank statements for several years, because exemptions are the first thing a notice asks you to substantiate.
            </p>

            <h2 id="salaried-impact" style={hStyle}>How Section 10 Exemptions Affect a Salaried Taxpayer</h2>
            <p style={pStyle}>
              Section 10 exemptions lower your taxable salary and raise your take-home pay, and their value is largest when you also pay rent in a metro city and have a high HRA component. The same exemptions are worth nothing in the new regime, so the choice of regime is really a choice about how many of them you can use.
            </p>
            <p style={pStyle}>
              Take the HRA example above. If that employee is in the 30% slab, the ₹2,40,000 of exempt HRA saves about ₹72,000 of tax before cess. The new regime has a standard deduction of ₹75,000 and a Section 87A rebate that makes income up to ₹12 lakh tax free, so a lower-income employee often does better there, as the{' '}
              <L href="/blogs/section-87a-rebate">Section 87A rebate guide</L> explains. Use the{' '}
              <L href="/calculators/in-hand-salary-calculator">In-Hand Salary Calculator</L> to see the effect on monthly pay, and check the{' '}
              <L href="/blogs/income-tax-slabs-fy-2025-26">income tax slabs</L> for the rates.
            </p>
            <PromoBar name="Old vs New Tax Regime Calculator" desc="Enter your salary, HRA and deductions and see which regime leaves you with more." href="/calculators/old-vs-new-tax-regime-calculator" />

            <h2 id="mistakes" style={hStyle}>Common Mistakes When Claiming Section 10 Exemptions</h2>
            <p style={pStyle}>
              The most common mistake is claiming an old-regime exemption after opting for the new regime, which a mismatch between Form 16 and the return will flag. Four other errors cause most notices.
            </p>
            <BulletList
              items={[
                <span key="m1"><strong style={{ color: C.ink }}>Claiming HRA without paying rent:</strong> receipts and a bank trail are what an assessing officer checks first, and paying rent to a relative who does not declare it creates a second problem.</span>,
                <span key="m2"><strong style={{ color: C.ink }}>Treating an unspent allowance as exempt:</strong> duty-linked allowances are exempt only up to what you spent, and the rest is taxable.</span>,
                <span key="m3"><strong style={{ color: C.ink }}>Using the old limits:</strong> children education allowance was ₹100 and meals ₹50 until the 2026 rules, so older articles and payroll templates may show stale figures.</span>,
                <span key="m4"><strong style={{ color: C.ink }}>Forgetting lifetime ceilings:</strong> the ₹20 lakh gratuity, ₹25 lakh leave encashment and ₹5 lakh VRS limits are cumulative across employers.</span>,
                <span key="m5"><strong style={{ color: C.ink }}>Missing the 10(10D) thresholds:</strong> a high-premium policy can lose its tax-free maturity, so test the premium against the sum assured before you buy.</span>,
              ]}
            />
            <p style={pStyle}>
              The official rules sit with the Income Tax Department, and the Income-tax Act, 2025 is available on{' '}
              <ExtL href="https://www.indiacode.nic.in">India Code</ExtL>.
            </p>


            <h2 id="faq" style={hStyle}>Frequently Asked Questions on Section 10 and Tax Exemptions</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          <aside
            className="section10-sidebar"
            style={{ position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><KeyLimits /></div>
            <div style={{ flexShrink: 0 }}><RegimeSnapshot /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
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
        .section10-sidebar::-webkit-scrollbar { width: 5px; }
        .section10-sidebar::-webkit-scrollbar-track { background: transparent; }
        .section10-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .section10-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .toc-link:hover { background: #f4f5f6; color: #101214 !important; }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}
