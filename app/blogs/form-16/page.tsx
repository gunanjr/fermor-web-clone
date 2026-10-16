import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';

export const metadata: Metadata = {
  title: 'Form 16: Download, Meaning, Password, Issue Date & TDS Guide 2026',
  description: 'Form 16 is the TDS certificate your employer issues under Section 203, showing salary, exemptions, deductions and tax deducted for FY 2025-26. Free to use guide: issue date, password format, Form 16 vs 16A vs 26AS, and the Form 130 rename under the Income Tax Act 2025.',
  alternates: {
    canonical: 'https://fermor.in/blogs/form-16',
  },
  openGraph: {
    title: 'Form 16: Download, Meaning, Password & TDS Guide (FY 2025-26)',
    description: 'Everything on Form 16: what it contains, the 15 June issue deadline, password format, Form 16 vs 16A vs 26AS, and its rename to Form 130 under the new Income Tax Act.',
    type: 'article',
    publishedTime: '2026-10-09T17:02:33+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Form 16', 'TDS Certificate', 'Income Tax', 'Salaried Employees', 'ITR Filing'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form 16: Download, Meaning, Password & TDS Guide',
    description: 'What Form 16 contains, the 15 June issue deadline, password format, and how it differs from Form 16A, Form 16B and Form 26AS.',
  },
  keywords: [
    'form 16', 'form 16 download', 'form 16 meaning', 'what is form 16', 'form 16 password',
    'form 16 part a and part b', 'form 16 issue date', 'form 16 vs form 16a', 'form 16 vs 26as',
    'form 16 for salaried employees', 'income tax form', 'tax filing', 'itr filing',
    'form 16 traces download', 'form 130 income tax act 2025', 'form 16 penalty',
    'how to download form 16', 'form 16 not received', 'income tax return', 'tax return form',
    'form 16 fy 2025-26',
  ],
};

const TOC_ITEMS = [
  { id: 'what-is', label: 'What is Form 16?' },
  { id: 'form-130', label: 'Form 16 Renamed as Form 130' },
  { id: 'issue-date', label: 'Form 16 Issuance Date' },
  { id: 'part-a-b', label: 'Part A and Part B Details' },
  { id: 'how-to-download', label: 'How to Download Form 16' },
  { id: 'who-receives', label: 'Who Receives Form 16' },
  { id: 'password', label: 'Form 16 Password' },
  { id: 'why-needed', label: 'Why Form 16 Is Required' },
  { id: 'section-89-relief', label: 'Section 89 Relief' },
  { id: 'employer-not-cooperating', label: 'Employer Not Issuing Form 16' },
  { id: 'documents-needed', label: 'Documents Needed Alongside Form 16' },
  { id: 'checking-form16', label: 'Checking Your Form 16' },
  { id: 'multiple-employers', label: 'Multiple Employers in One Year' },
  { id: 'worked-example', label: 'Worked Example: Reading Form 16' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'comparison-16a-16b', label: 'Form 16 vs 16A vs 16B' },
  { id: 'comparison-26as', label: 'Form 16 vs Form 26AS' },
  { id: 'act-2025', label: 'Income Tax Act 2025 Section Mapping' },
  { id: 'financial-planning', label: 'Using Form 16 for Financial Planning' },
  { id: 'faq', label: 'FAQs' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Form 16: Download, Meaning, Password, Issue Date and TDS Guide for FY 2025-26',
  description: 'Complete guide to Form 16, the TDS certificate employers issue under Section 203 of the Income Tax Act: what it contains, the 15 June issuance deadline, password format, how to read Part A and Part B, how it differs from Form 16A, Form 16B and Form 26AS, and its coming rename to Form 130 under the Income Tax Act 2025.',
  datePublished: '2026-10-09T17:02:33+05:30',
  dateModified: '2026-10-09T17:02:33+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/form-16' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Form 16', description: 'TDS certificate issued by an employer under Section 203 of the Income Tax Act, 1961, showing salary income, exemptions, deductions and tax deducted at source for a financial year' },
    { '@type': 'Thing', name: 'Tax Deducted at Source', description: 'Tax collected by a payer at the time of making specified payments, deposited with the government on the payee\'s behalf' },
  ],
  keywords: 'form 16, form 16 download, form 16 password, form 16 part a part b, form 16 issue date, form 16 vs form 16a, form 16 vs 26as, form 130',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Form 16', item: 'https://fermor.in/blogs/form-16' },
  ],
};

const faqItems = [
  { q: 'What is Form 16?', a: 'Form 16 is a TDS certificate issued under Section 203 of the Income Tax Act, 1961 by an employer to an employee, showing the salary paid, exemptions claimed, deductions allowed and tax deducted at source during a financial year. It is the single most useful document for filing an income tax return as a salaried employee, since it already contains the computed salary and tax figures.' },
  { q: 'What are Part A and Part B of Form 16?', a: 'Part A contains a quarterly summary of TDS deducted and deposited, along with the employer\'s TAN, the employer and employee PAN, and the dates each quarter\'s TDS was deposited with the government. Part B contains the detailed break-up: gross salary, exempt allowances under Section 10, deductions under Chapter VI-A, the total taxable income, the computed tax liability, and any relief under Section 89.' },
  { q: 'When will Form 16 be issued for FY 2025-26?', a: 'For FY 2025-26 (AY 2026-27), employers must issue Form 16 to employees on or before 15 June 2026. This is the statutory deadline under the Income Tax Act for every employer who has deducted TDS on salary during the year.' },
  { q: 'How do I download Form 16?', a: 'Form 16 cannot be downloaded directly by an employee from any government portal. Only the employer can generate and download it, from the TRACES portal, using their TAN login, and must then hand it to each employee. If you have not received it by the deadline, ask your employer\'s HR or payroll team rather than searching for a self-download option.' },
  { q: 'How does an employer download Form 16 from TRACES?', a: 'The employer logs in to the TRACES portal with their TAN as the User ID, opens the Downloads tab, selects Form 16, and picks the relevant financial year. After verifying PAN, TDS receipt number, and deposited tax amounts, the employer submits the request and downloads Part A and Part B once the system processes it.' },
  { q: 'What is the Form 16 password?', a: 'The most common Form 16 password format is the first five characters of your PAN in uppercase followed by your date of birth in DDMMYYYY format, for example ABCDE01011990. Some employers use only the PAN or only the date of birth; if the standard format does not open the file, check with your payroll team for the exact format they used.' },
  { q: 'Is Form 16 mandatory for every employee?', a: 'No. An employer is only required to issue Form 16 if TDS has actually been deducted from that employee\'s salary. If your income is below the taxable threshold and no TDS was deducted, your employer is not obligated to issue a Form 16, though many organisations issue it anyway as a record of annual salary.' },
  { q: 'Can I file my ITR without Form 16?', a: 'Yes. Form 16 makes filing easier because it already has the computed numbers, but it is not mandatory to file an income tax return. You can reconstruct the same information using your monthly salary slips, Form 26AS, and the Annual Information Statement (AIS), and file your return on that basis.' },
  { q: 'What happens if my employer does not issue Form 16 on time?', a: 'A penalty under Section 272A of the Income Tax Act applies to the employer: Rs 100 for every day the delay continues, counted from the due date until the certificate is actually furnished. The responsibility to pay tax and file a return on time still rests with the employee regardless of whether Form 16 was issued.' },
  { q: 'What is the difference between Form 16 and Form 16A?', a: 'Form 16 is issued by an employer and covers TDS on salary income only. Form 16A is issued by any other deductor, such as a bank or a company paying rent, interest or professional fees, and covers TDS on income other than salary. Form 16 is issued annually; Form 16A is issued quarterly.' },
  { q: 'What is the difference between Form 16 and Form 16B?', a: 'Form 16 is an annual salary TDS certificate issued by an employer. Form 16B is issued by the buyer of an immovable property to the seller, as proof of the 1% TDS deducted under Section 194-IA when the sale value or stamp duty value of the property exceeds Rs 50 lakh. They cover entirely different transactions.' },
  { q: 'What is the difference between Form 16 and Form 26AS?', a: 'Form 16 is a certificate from your employer showing only your salary TDS and its break-up. Form 26AS is a consolidated tax statement from the Income Tax Department covering all TDS across every deductor, advance tax, self-assessment tax, and high-value transactions reported against your PAN. Always cross-check the TDS amount in Form 16 against Form 26AS before filing your return.' },
  { q: 'Will Form 16 be renamed to Form 130?', a: 'Yes, but not yet. Under the Income Tax Act 2025, the TDS certificate currently called Form 16 will be renumbered as Form 130, effective from Tax Year 2026-27 (1 April 2026) onwards. For FY 2025-26, covered by the old 1961 Act, your employer will still issue it as Form 16 under Section 203.' },
  { q: 'What happened to Section 203 under the Income Tax Act 2025?', a: 'Section 203 of the Income Tax Act, 1961, which requires an employer to issue a TDS certificate, corresponds to Section 395(4) of the Income Tax Act, 2025. Other renumbered provisions include Section 10 exemptions moving to Section 11 with Schedule II to VII, Chapter VI-A deductions moving to Chapter VIII from Section 122 onwards, and Section 89 relief on arrears moving to Section 157.' },
  { q: 'Can I get Form 16 from a previous employer after leaving the job?', a: 'Yes. Your former employer is still obligated to issue Form 16 for the period you worked there during that financial year. If you changed jobs mid-year, collect Form 16 from every employer you worked for in that year, since each one only reports the TDS they themselves deducted.' },
  { q: 'What should I check once I receive Form 16?', a: 'Verify the gross salary, exemptions, deductions and TDS amount against your salary slips and investment proofs. Check that your PAN is correctly mentioned, and confirm the digital signature on the PDF is valid. If you find an error, report it to your employer\'s payroll or HR team immediately so they can file a revised TDS return.' },
  { q: 'What if there is an error in my Form 16?', a: 'Contact your employer\'s HR or finance department right away. They will need to file a revised TDS return to correct the entry against your PAN. Once the correction is processed by the department, the employer issues you an updated Form 16 reflecting the corrected figures.' },
  { q: 'Does Form 16 show HRA exemption?', a: 'Part B of Form 16 shows HRA exemption under Section 10(13A) if you opted for the old tax regime and your employer pays HRA as part of your salary structure. If you chose the new tax regime, HRA exemption does not apply and will not appear. If HRA is not part of your salary at all, you may still be able to claim a deduction under Section 80GG instead.' },
  { q: 'Why do banks ask for Form 16 for a loan application?', a: 'Banks and NBFCs use Form 16 as verified proof of your salary and tax status when assessing a loan application, since it is signed by the employer and reflects the government\'s own TDS records rather than a self-reported number. It is commonly requested for home loans, car loans and personal loans.' },
  { q: 'Is Form 16 the same as an income tax return?', a: 'No. Form 16 is a TDS certificate from your employer confirming tax already deducted and deposited. An income tax return (ITR) is the form you file with the Income Tax Department declaring your total income, deductions and final tax liability for the year. Form 16 is one of the inputs used to prepare the ITR, not the return itself.' },
  { q: 'What if I changed jobs during the year? Do I get two Form 16s?', a: 'Yes. Each employer you worked for during the financial year issues its own Form 16, covering only the salary it paid and the TDS it deducted. You need both (or all, if you changed jobs more than once) to correctly report your total annual income when filing your ITR.' },
  { q: 'Can standard deduction or 80C get claimed twice across two Form 16s?', a: 'It can happen if you did not declare your previous employer\'s salary to your new employer using Form 12B. Each employer independently applies the standard deduction and Chapter VI-A limits without visibility into what the other employer already allowed, which can understate your true combined tax liability unless you reconcile it yourself while filing.' },
  { q: 'What is Section 89 relief in Form 16?', a: 'Section 89 relief reduces the extra tax created when arrears or advance salary for an earlier year get taxed in the year you receive them, pushing you into a higher slab than if it had been taxed correctly at the time. Your employer computes this using Form 10E and reflects the final relief in Part B; if they have not, you can file Form 10E yourself before submitting your ITR.' },
  { q: 'What if my employer refuses to issue Form 16?', a: 'You can still file your ITR using Form 26AS, your Annual Information Statement (AIS), and your own salary slips to reconstruct the figures, since the TDS credit in the government\'s own records does not depend on the certificate being issued. You can also report the non-compliant employer to the TDS Assessing Officer, since the Rs 100-per-day penalty under Section 272A applies regardless.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How an Employer Downloads Form 16 from TRACES',
  description: 'Step-by-step process for an employer to generate and download Form 16 Part A and Part B from the TRACES portal',
  totalTime: 'PT15M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Visit TRACES', text: 'Go to the official TRACES portal at tdscpc.gov.in and log in using your TAN as the User ID.' },
    { '@type': 'HowToStep', position: 2, name: 'Open Downloads', text: 'Navigate to the Downloads tab and select Form 16 from the list of available certificates.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose financial year', text: 'Select the relevant financial year and the form type (Part A, Part B, or both).' },
    { '@type': 'HowToStep', position: 4, name: 'Verify PAN and TDS details', text: 'Confirm the employee PAN, TDS receipt number, and the total tax deducted and deposited for each quarter.' },
    { '@type': 'HowToStep', position: 5, name: 'Submit the download request', text: 'Submit the request and wait for TRACES to process it; processing usually completes within a few hours.' },
    { '@type': 'HowToStep', position: 6, name: 'Download and distribute', text: 'Once available under the Downloads tab, download the file and distribute Form 16 to each employee before the 15 June deadline.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/form-16',
  name: 'Form 16: Download, Meaning, Password, Issue Date and TDS Guide',
  url: 'https://fermor.in/blogs/form-16',
  inLanguage: 'en-IN',
  datePublished: '2026-10-09T17:02:33+05:30',
  dateModified: '2026-10-09T17:02:33+05:30',
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
      name: 'Form 16',
      alternateName: 'TDS Certificate on Salary',
      description: 'A TDS certificate issued by an employer under Section 203 of the Income Tax Act, 1961, showing salary income, exemptions, deductions and tax deducted at source for a financial year.',
      sameAs: 'https://en.wikipedia.org/wiki/Income_tax_in_India',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Indian Income Tax Terms',
        url: 'https://fermor.in/blogs',
      },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Tax Deducted at Source',
      alternateName: 'TDS',
      description: 'A mechanism under the Income Tax Act where a specified payer deducts tax at the time of payment and deposits it with the government on the payee\'s behalf.',
      sameAs: 'https://en.wikipedia.org/wiki/Tax_deduction_at_source',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Indian Income Tax Terms',
        url: 'https://fermor.in/blogs',
      },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees in India filing income tax returns',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'What is Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#form-130', name: 'Form 16 Renamed as Form 130' },
    { '@type': 'WebPageElement', cssSelector: '#issue-date', name: 'Form 16 Issuance Date' },
    { '@type': 'WebPageElement', cssSelector: '#part-a-b', name: 'Part A and Part B Details' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-download', name: 'How to Download Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#who-receives', name: 'Who Receives Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#password', name: 'Form 16 Password' },
    { '@type': 'WebPageElement', cssSelector: '#why-needed', name: 'Why Form 16 Is Required' },
    { '@type': 'WebPageElement', cssSelector: '#section-89-relief', name: 'Section 89 Relief' },
    { '@type': 'WebPageElement', cssSelector: '#employer-not-cooperating', name: 'Employer Not Issuing Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#documents-needed', name: 'Documents Needed Alongside Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#checking-form16', name: 'Checking Your Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#multiple-employers', name: 'Multiple Employers in One Year' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example: Reading Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes to Avoid' },
    { '@type': 'WebPageElement', cssSelector: '#comparison-16a-16b', name: 'Form 16 vs 16A vs 16B' },
    { '@type': 'WebPageElement', cssSelector: '#comparison-26as', name: 'Form 16 vs Form 26AS' },
    { '@type': 'WebPageElement', cssSelector: '#act-2025', name: 'Income Tax Act 2025 Section Mapping' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'Using Form 16 for Financial Planning' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
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
    'TDS Certificates',
    'Form 16',
    'Income Tax Act 2025',
    'Salary Taxation India',
    'ITR Filing',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
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
  green:  '#166534',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = {
  fontFamily: POPPINS,
  fontSize: 20,
  fontWeight: 600,
  color: C.dg,
  marginTop: 40,
  marginBottom: 14,
  letterSpacing: '-.015em',
} as React.CSSProperties;

const pStyle = {
  fontSize: 15.5,
  color: C.ink,
  lineHeight: 1.8,
  marginBottom: 20,
  fontFamily: INTER,
} as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Form 16' },
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
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>On this page</span>
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

function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function KeyFacts() {
  const rows = [
    { label: 'Issued By', value: 'Employer' },
    { label: 'Issued Under', value: 'Section 203, Income Tax Act 1961' },
    { label: 'Covers', value: 'Salary income and TDS' },
    { label: 'Parts', value: 'Part A + Part B' },
    { label: 'Deadline (FY 2025-26)', value: '15 June 2026' },
    { label: 'Late Penalty', value: 'Rs 100/day (Sec 272A)' },
    { label: 'Renamed To', value: 'Form 130 (from TY 2026-27)' },
    { label: 'Download Portal', value: 'TRACES (employer only)' },
  ];
  return (
    <TableWrap label="Form 16 at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'Deadline (FY 2025-26)' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function PartABTable() {
  const rows = [
    { part: 'Part A', items: 'Employer and employee name and address, employer TAN, employer and employee PAN, quarterly TDS summary, and the dates each quarter\'s TDS was deposited.' },
    { part: 'Part B', items: 'Gross salary with all allowances and perquisites, exempt allowances under Section 10, deductions under Chapter VI-A, total taxable income, computed tax liability, and relief under Section 89 if applicable.' },
  ];
  return (
    <TableWrap label="What Part A and Part B Contain">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          {rows.map((r, i) => (
            <div key={r.part} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 70px', fontSize: 13, fontWeight: 700, color: C.dg, fontFamily: INTER }}>{r.part}</span>
              <span style={{ flex: 1, fontSize: 13.5, color: C.ink2, lineHeight: 1.6, fontFamily: INTER }}>{r.items}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function Form16ComparisonTable() {
  const cols = ['Form 16', 'Form 16A', 'Form 16B'];
  const rows = [
    { label: 'Covers', vals: ['Salary income', 'Non-salary income (rent, interest, fees)', 'Property sale under Sec 194-IA'] },
    { label: 'Issued by', vals: ['Employer', 'Bank or other deductor', 'Buyer of property'] },
    { label: 'Frequency', vals: ['Annual', 'Quarterly', 'Per transaction'] },
    { label: 'Trigger', vals: ['Income above exemption limit', 'Income crosses TDS threshold', 'Sale value or stamp value over Rs 50 lakh'] },
    { label: 'Rate basis', vals: ['Slab rates', 'Section-specific rates', '1% of sale value or stamp value, higher of the two'] },
  ];
  return (
    <TableWrap label="Form 16 vs Form 16A vs Form 16B">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 620 }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}></span>
            {cols.map(c => (
              <span key={c} style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>{c}</span>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 110px', fontSize: 12.5, fontWeight: 600, color: C.ink3, fontFamily: INTER }}>{r.label}</span>
              {r.vals.map((v, j) => (
                <span key={j} style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.55, fontFamily: INTER }}>{v}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function Form26ASCompareTable() {
  const rows = [
    { feature: 'Meaning', f16: 'Salary TDS certificate with full salary break-up', f26: 'Consolidated record of all TDS, advance tax and self-assessment tax against your PAN' },
    { feature: 'Issuer', f16: 'Employer', f26: 'Income Tax Department' },
    { feature: 'Mandatory for ITR', f16: 'No, but very useful', f26: 'No, but useful for cross-checking' },
    { feature: 'Scope', f16: 'Salary income only', f26: 'All income sources where TDS was deducted' },
    { feature: 'To fix an error', f16: 'Contact your employer', f26: 'Contact the specific deductor named in the entry' },
  ];
  return (
    <TableWrap label="Form 16 vs Form 26AS">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 140px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Feature</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Form 16</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Form 26AS</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.feature} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 140px', fontSize: 13, color: C.ink3, fontFamily: INTER }}>{r.feature}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.f16}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.f26}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function Act2025MappingTable() {
  const rows = [
    { topic: 'TDS certificate (employer)', old: 'Section 203', nw: 'Section 395(4)' },
    { topic: 'Exempt salary allowances', old: 'Section 10', nw: 'Section 11, Schedule II-VII' },
    { topic: 'Deductions from gross income', old: 'Chapter VI-A', nw: 'Chapter VIII (Sec 122 onwards)' },
    { topic: 'Relief on arrears/advance salary', old: 'Section 89', nw: 'Section 157' },
    { topic: 'TDS on property sale', old: 'Section 194-IA', nw: 'Section 393(1)' },
  ];
  return (
    <TableWrap label="Income Tax Act 1961 vs Income Tax Act 2025: Section Mapping">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Topic</span>
            <span style={{ flex: '0 0 140px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Act of 1961</span>
            <span style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Act of 2025</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.topic} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 1, fontSize: 13, color: C.ink, fontFamily: INTER, lineHeight: 1.5 }}>{r.topic}</span>
              <span style={{ flex: '0 0 140px', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.old}</span>
              <span style={{ flex: '0 0 160px', fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.nw}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Income Tax Calculator', desc: 'Check your tax liability under both regimes before filing', href: '/calculators/income-tax-calculator' },
    { label: 'In-Hand Salary Calculator', desc: 'Reconcile your Form 16 gross salary against your take-home', href: '/calculators/in-hand-salary-calculator' },
    { label: 'HRA Calculator', desc: 'Verify the HRA exemption figure shown in Part B', href: '/calculators/hra-calculator' },
    { label: 'TDS Calculator', desc: 'Check expected TDS on salary and other payments', href: '/calculators/tds-calculator' },
    { label: 'Salary Breakdown Calculator', desc: 'Break your CTC into components the way Form 16 reports them', href: '/calculators/salary-breakdown-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New and Old Regime Rates' },
    { href: '/blogs/old-vs-new-tax-regime', label: 'Old vs New Tax Regime: Which One Should You Pick' },
    { href: '/blogs/itr-filing-last-date', label: 'ITR Filing Last Date: Due Dates for AY 2026-27' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Articles</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function KeyDates() {
  const dates = [
    { label: 'FY 2025-26 ends', date: '31 Mar 2026' },
    { label: 'Form 16 issue deadline', date: '15 Jun 2026', urgent: true },
    { label: 'ITR filing opens', date: 'Apr 2026' },
    { label: 'Form 130 applies from', date: 'TY 2026-27' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Key Dates</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 13, marginBottom: 12, alignItems: 'flex-start', fontFamily: INTER }}>
      <span style={{
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#E9ECEE', border: '1px solid #D3D7DA',
        color: '#101214',
        fontSize: 11.5,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
      }}>{n}</span>
      <span style={{ fontSize: 15, color: C.ink, lineHeight: 1.65 }}>{children}</span>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}


function PromoBar({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> This article is based on the Income Tax Act, 1961, the Income Tax Act, 2025, and official guidance from the Income Tax Department and TRACES. Rules, deadlines, and penalty amounts can change. Verify current details at{' '}
        <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'underline' }}>incometax.gov.in</a>{' '}
        or your employer's payroll team before acting on this information. This article is for informational purposes only and is not tax advice.
      </p>
    </div>
  );
}

export default function Form16Page() {
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

      {/* Article header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: C.dg,
              fontFamily: INTER,
              background: C.paleDg,
              padding: '3px 10px',
              borderRadius: 4,
            }}>Income Tax</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            Form 16: Download, Meaning, Password, Issue Date and TDS Guide for Salaried Employees
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Form 16 is the TDS certificate your employer must issue by 15 June, showing your salary, exemptions, deductions and tax deducted for FY 2025-26. It is also about to be renamed Form 130 under the Income Tax Act 2025.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-10-09T17:02:33+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Oct 9, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>17 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties}
          className="article-grid"
        >

          {/* Article body */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Form 16 is the TDS certificate issued under Section 203 of the Income Tax Act by your employer, showing salary income, exemptions, deductions and tax deducted for the financial year. It is essential for filing your ITR accurately.
            </p>
            <p style={pStyle}>
              Form 16 has two parts: Part A carries the TDS summary along with employer and employee PAN and TAN, and Part B carries the full salary break-up, deductions and tax computation.
            </p>
            <p style={pStyle}>
              Employers must issue it by 15 June for FY 2025-26. The certificate is also set to be renamed Form 130 once the Income Tax Act 2025 takes full effect.
            </p>

            <TableOfContents />

            <h2 id="what-is" style={hStyle}>What is Form 16?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Form 16 is a TDS certificate issued by an employer under Section 203 of the Income Tax Act, 1961, containing the salary paid, tax deducted at source, and the full computation behind it for a given financial year.
              </p>
            </div>
            <p style={pStyle}>
              It serves as a ready reference for ITR filing because it already contains the employer's own computation of your salary income, the exemptions and deductions applied, and the tax deposited against your PAN.
            </p>
            <p style={pStyle}>
              Form 16 is split into two parts. Part A contains a summary of TDS deductions along with the employer's TAN and both employer and employee PAN. Part B contains a detailed break-up of salary, exemptions, and deductions under the Income Tax Act.
            </p>
            <p style={pStyle}>
              Run the gross salary figure in your Form 16 through the{' '}
              <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Calculator</Link>
              {' '}to independently check the computed tax matches what your employer deducted, under both the old and new regimes.
            </p>

            <h2 id="form-130" style={hStyle}>Form 16 Renamed as Form 130</h2>
            <p style={pStyle}>
              Under the Income Tax Act 2025, Form 16 has been renumbered as Form 130, effective from Tax Year 2026-27 (1 April 2026) onwards. For FY 2025-26, the financial year this guide primarily covers, your employer will still issue Form 16 as usual under the 1961 Act.
            </p>
            <Callout>
              The Income Tax Act 2025 takes effect from 1 April 2026, but the provisions of the 1961 Act still govern income earned up to 31 March 2026 (AY 2026-27). Form 16 for FY 2025-26 is unaffected by the rename.
            </Callout>

            <h2 id="issue-date" style={hStyle}>Form 16 Issuance Date for FY 2025-26 (AY 2026-27)</h2>
            <p style={pStyle}>
              Employers must issue Form 16 by 15 June of the financial year immediately following the year in which the salary was paid and tax deducted. For FY 2025-26, that means every employer must hand Form 16 to employees on or before 15 June 2026.
            </p>
            <p style={pStyle}>
              If an employer misses the deadline, a penalty under Section 272A of the Income Tax Act applies: Rs 100 for every day the default continues, counted from the due date until the certificate is actually furnished.
            </p>

            <h2 id="part-a-b" style={hStyle}>Part A and Part B: What Each Section Contains</h2>
            <p style={pStyle}>
              Part A is the TDS summary: it lists both PANs, the employer's TAN, and the quarter-by-quarter tax deposited against your name. Part B is the detailed salary computation behind that tax figure.
            </p>
            <PartABTable />

            <PromoBar
              title="Salary Breakdown Calculator"
              desc="Break your CTC into the same components Form 16 Part B reports, before you receive the actual document."
              href="/calculators/salary-breakdown-calculator"
            />

            <h2 id="how-to-download" style={hStyle}>How to Download Form 16</h2>
            <p style={pStyle}>
              To download Form 16 from the TRACES portal, an employer logs in using their TAN as the User ID and password, navigates to the Downloads tab, selects Form 16, and chooses the relevant financial year.
            </p>
            <p style={pStyle}>
              The employee cannot generate this themselves; the request and download both happen on the employer's side.
            </p>
            <Step n={1}>Visit the official{' '}
              <a href="https://www.tdscpc.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>TRACES website</a>.
            </Step>
            <Step n={2}>Log in using the TAN as User ID, or complete registration if new.</Step>
            <Step n={3}>Navigate to the Downloads tab and select Form 16.</Step>
            <Step n={4}>Choose the form type (Part A, Part B, or both) and the relevant financial year.</Step>
            <Step n={5}>Verify PAN details, TDS receipt number, and the total tax deducted and deposited.</Step>
            <Step n={6}>Submit the request and download the file once it is processed under the Downloads tab.</Step>
            <p style={pStyle}>
              Since the statute mandates the employer to furnish Form 16, it cannot be downloaded by the employee from any other source.
            </p>
            <p style={pStyle}>
              If you missed getting Form 16 from a previous employer after a job change, contact that company's HR department directly rather than looking for a self-download route.
            </p>

            <h2 id="who-receives" style={hStyle}>Who Receives Form 16?</h2>
            <p style={pStyle}>
              Every salaried individual whose income falls under the taxable bracket and has had TDS deducted is eligible to receive Form 16 from their employer.
            </p>
            <p style={pStyle}>
              If you changed jobs during the financial year, you need to collect Form 16 from every employer you worked with that year, since each one reports only the TDS they deducted.
            </p>
            <BulletList items={[
              <>If TDS was not deducted for an employee, the employer is not legally required to provide Form 16.</>,
              <>Many organisations issue it anyway as good practice, since it gives a consolidated picture of annual earnings.</>,
              <>A fresh hire who joined mid-year should check whether their previous employer's Form 16 also needs to be collected.</>,
            ]} />

            <h2 id="password" style={hStyle}>Form 16 Password</h2>
            <p style={pStyle}>
              The password format for Form 16 can differ slightly across organisations. The most common format is the first five characters of your PAN in uppercase followed by your date of birth in DDMMYYYY format.
            </p>
            <BulletList items={[
              'PAN (first 5 characters, uppercase) + date of birth in DDMMYYYY format',
              'Only PAN, in upper or lower case',
              'Only date of birth in DDMMYYYY format',
            ]} />

            <h2 id="why-needed" style={hStyle}>Why is Form 16 Required?</h2>
            <p style={pStyle}>
              Form 16 is required because it is proof that the tax deducted by your employer has actually reached the government, and it supplies the exact figures (salary, deductions, investment proof) your ITR needs.
            </p>
            <BulletList items={[
              'Proof that the government has received the tax deducted by your employer',
              'Assists ITR filing with salary details, deductions claimed, and other investment deductions',
              'Serves as proof of salary income for banks and financial institutions assessing loan applications',
            ]} />

            <h2 id="section-89-relief" style={hStyle}>Section 89 Relief Shown in Form 16</h2>
            <p style={pStyle}>
              Section 89 relief in Form 16 reduces the extra tax burden created when salary arrears or advance salary for an earlier year get taxed in the year you actually receive them, pushing you into a higher slab than if that income had been taxed in the correct year.
            </p>
            <p style={pStyle}>
              This typically shows up after a delayed increment, a pay commission revision for government employees, or a bonus payout that legally belongs to an earlier financial year.
            </p>
            <p style={pStyle}>
              Your employer computes the relief using Form 10E figures and reflects the final relief amount in Part B. If not, you can still file Form 10E yourself before submitting your ITR.
            </p>
            <p style={pStyle}>
              The Income Tax Department requires Form 10E to be filed online before the relief under Section 89 is allowed, so do this before you submit your return.
            </p>

            <h2 id="employer-not-cooperating" style={hStyle}>What to Do If Your Employer Will Not Issue Form 16</h2>
            <p style={pStyle}>
              If an employer deducted TDS but refuses or fails to issue Form 16 even after the 15 June deadline and repeated requests, you still have two separate paths forward since your return filing does not depend on the certificate alone.
            </p>
            <BulletList items={[
              'Reconstruct your salary and tax figures from Form 26AS, your Annual Information Statement (AIS), and your own salary slips, then file your ITR on that basis within the normal due date.',
              'Report the non-compliant employer to your jurisdictional Assessing Officer or the TDS Assessing Officer, since the Rs 100-per-day penalty under Section 272A applies to the employer regardless of whether you eventually get the certificate.',
              'If the company has shut down or is otherwise unreachable, the TDS already reflected in Form 26AS and AIS against your PAN is still creditable to you when filing, since that credit comes from the government\'s own deposit record, not from the certificate itself.',
            ]} />

            <h2 id="documents-needed" style={hStyle}>Documents You Need Alongside Form 16 to File Your ITR</h2>
            <p style={pStyle}>
              Form 16 covers your salary income completely, but most taxpayers need a short additional set of documents to file a complete and accurate return.
            </p>
            <BulletList items={[
              'Form 26AS and the Annual Information Statement (AIS), to cross-check every TDS entry against your PAN, not just the salary TDS in Form 16',
              'Bank interest certificates for savings accounts and fixed deposits, since this income is not part of Form 16',
              'Capital gains statements from your broker or mutual fund platform, if you sold equity, mutual funds, or property during the year',
              'Rent receipts or a rent agreement, if you are claiming HRA exemption and your employer has not already verified and applied it in Part B',
              'Proof of deductions claimed but not declared to payroll in time (life insurance premium receipts, ELSS statements, home loan interest certificate), since these need to be claimed directly in the ITR if missing from Part B',
            ]} />

            <h2 id="checking-form16" style={hStyle}>Points to Check When You Receive Form 16</h2>
            <p style={pStyle}>
              Once you receive Form 16, it is your responsibility to verify every figure before relying on it to file your return.
            </p>
            <BulletList items={[
              'Match the salary and TDS amounts against your monthly salary slips',
              'Confirm your PAN is correctly mentioned throughout the document',
              'Check that the digital signature is valid and the certificate has not been tampered with after signing',
              'If you spot an error, raise it with HR or payroll immediately so they can file a revised TDS return',
            ]} />

            <h2 id="multiple-employers" style={hStyle}>Form 16 When You Had Multiple Employers in One Year</h2>
            <p style={pStyle}>
              If you switched jobs during FY 2025-26, each employer issues a separate Form 16 covering only the salary they paid and the TDS they deducted, not your full-year income.
            </p>
            <p style={pStyle}>
              Each employer computes exemptions and the Chapter VI-A deduction limit independently, since the earlier employer has no visibility into what the new employer pays.
            </p>
            <p style={pStyle}>
              This commonly causes two issues at filing time: the standard deduction or Section 80C limit can get claimed twice across both Form 16s, and the tax slab benefit can get applied twice since neither employer sees your combined annual income.
            </p>
            <p style={pStyle}>
              The fix is to declare your previous employer's salary (Form 12B) to the new employer when you join, so TDS gets computed on your combined income for the rest of the year.
            </p>
            <p style={pStyle}>
              If that was not done, you will likely owe additional tax at filing time, which simply reflects the gap between what each employer individually withheld.
            </p>

            <h2 id="worked-example" style={hStyle}>Worked Example: Reading a Form 16</h2>
            <p style={pStyle}>
              A worked example makes the Part A/Part B split concrete. Consider an employee with a gross salary of Rs 12,00,000 for FY 2025-26, under the old tax regime.
            </p>
            <TableWrap label="Sample Form 16 Part B Computation (Old Regime)">
              <div style={{ overflowX: 'auto' as const }}>
                <div style={{ minWidth: 480 }}>
                  {[
                    { label: 'Gross Salary (incl. allowances)', value: 'Rs 12,00,000' },
                    { label: 'Less: HRA Exemption (Sec 10(13A))', value: 'Rs 1,20,000' },
                    { label: 'Less: Standard Deduction', value: 'Rs 50,000' },
                    { label: 'Income chargeable under Salaries', value: 'Rs 10,30,000' },
                    { label: 'Less: Chapter VI-A (80C + 80D)', value: 'Rs 1,80,000' },
                    { label: 'Total Taxable Income', value: 'Rs 8,50,000' },
                    { label: 'Tax on Total Income (old regime slabs)', value: 'Rs 82,500' },
                    { label: 'Add: Health and Education Cess (4%)', value: 'Rs 3,300' },
                    { label: 'Total Tax Liability', value: 'Rs 85,800' },
                    { label: 'Total TDS Deducted (per Part A)', value: 'Rs 85,800' },
                  ].map((r, i, arr) => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                      <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TableWrap>
            <p style={pStyle}>
              In this example, Part A would show Rs 85,800 deposited across four quarters, and Part B would show the exact break-up above.
            </p>
            <p style={pStyle}>
              When you file your ITR, the "Total Tax Liability" figure should match your computed tax exactly, and "Total TDS Deducted" should match Form 26AS for the same PAN and year.
            </p>
            <p style={pStyle}>
              Run your own numbers through the{' '}
              <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Calculator</Link>
              {' '}to see whether the new regime would have produced a lower figure than the old-regime computation your employer used.
            </p>

            <h2 id="common-mistakes" style={hStyle}>Common Mistakes to Avoid With Form 16</h2>
            <p style={pStyle}>
              Most Form 16-related filing errors come from treating the certificate as the final word rather than cross-checking it against other records.
            </p>
            <BulletList items={[
              <><strong>Not cross-checking TDS against Form 26AS:</strong> a mismatch usually means a deposit error on the employer's side, caught only if you compare both documents before filing.</>,
              <><strong>Forgetting Form 16 from a previous employer:</strong> filing with only the current employer's Form 16 after a mid-year job change understates your total income for the year.</>,
              <><strong>Assuming Form 16 already includes other income:</strong> interest, rental, or capital gains income is not part of Form 16 and must be added separately in the ITR.</>,
              <><strong>Ignoring Part A quarter-wise dates:</strong> a quarter where TDS was deducted but deposited late by the employer can briefly show up as a mismatch in Form 26AS until it clears.</>,
              <><strong>Not updating investment proofs before year-end:</strong> deductions declared but not proven to payroll in time will be missing from Part B, even if you are genuinely eligible for them; you then need to claim them directly in the ITR with your own proof on hand.</>,
            ]} />

            <h2 id="comparison-16a-16b" style={hStyle}>Difference Between Form 16, Form 16A and Form 16B</h2>
            <p style={pStyle}>
              Form 16, Form 16A and Form 16B are all TDS certificates, but they apply to entirely different kinds of income and are issued by different parties.
            </p>
            <Form16ComparisonTable />

            <h2 id="comparison-26as" style={hStyle}>Difference Between Form 16 and Form 26AS</h2>
            <p style={pStyle}>
              Form 16 and Form 26AS both report tax already deducted, but Form 26AS is the department's own consolidated record across every deductor, not just your employer.
            </p>
            <Form26ASCompareTable />

            <h2 id="act-2025" style={hStyle}>Income Tax Act 2025: Key Section Changes</h2>
            <p style={pStyle}>
              The Income Tax Act 2025 renumbers several provisions that directly affect how Form 16 is computed and issued, even though the certificate itself stays named Form 16 through FY 2025-26.
            </p>
            <Act2025MappingTable />


            <h2 id="financial-planning" style={hStyle}>Using Form 16 for Financial Planning</h2>
            <p style={pStyle}>
              Once you have Form 16 in hand, it is a good moment to check whether your actual take-home matches the document and whether your tax regime choice is still right.
            </p>
            <p style={pStyle}>
              Use the{' '}
              <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>In-Hand Salary Calculator</Link>
              {' '}to reconcile your Form 16 gross salary against your actual monthly credit, and the{' '}
              <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>HRA Calculator</Link>
              {' '}to verify the HRA exemption your employer applied.
            </p>
            <p style={pStyle}>
              If you are comparing regimes before your next declaration cycle, run the same salary figures through the{' '}
              <Link href="/blogs/old-vs-new-tax-regime" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Old vs New Tax Regime</Link>
              {' '}guide.
            </p>
            

            {/* FAQ section */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{
                    padding: '15px 18px',
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: C.dark,
                    fontFamily: INTER,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff',
                    userSelect: 'none' as const,
                    lineHeight: 1.4,
                  }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="form16-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
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

      <SiteFooter />

      <style>{`
        .form16-sidebar::-webkit-scrollbar { width: 5px; }
        .form16-sidebar::-webkit-scrollbar-track { background: transparent; }
        .form16-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .form16-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
        .toc-link:hover { background: #f4f5f6; color: #101214 !important; }
      `}</style>
    </>
  );
}
