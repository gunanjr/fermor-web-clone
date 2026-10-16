import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Financial planning webinars, workplace financial wellness reports and practical fintech resources from Fermor.',
};

const webinars = [
  ['PAST', 'The Architecture of Financial Resilience', '3.20.2024', 'A planner-led conversation on debt design, credit health and building a balance sheet that can absorb change.'],
  ['PAST', 'Tax Season, With Clarity', '2.21.2024', 'A precise conversation on tax planning, deduction strategy and the cash-flow decisions that compound over time.'],
  ['PAST', 'The New Language of Sustainable Living', '1.24.2024', 'How intentional spending, financial systems and long-term goals can work together without compromising the present.'],
];

const reports = [
  ['E-BOOK', 'Beyond Benefits: Designing Financial Wellness for Modern Workforces', '10.26.2023', 'A strategic guide to building employee financial confidence through better benefits, education and access.'],
  ['E-BOOK', 'Financial Confidence as a Pillar of Inclusive Growth', '10.26.2023', 'How financial wellness can strengthen DEI strategy, employee trust and the everyday experience of work.'],
  ['E-BOOK', 'The State of Employee Financial Health and Wealth', '10.26.2023', 'A measured look at the financial pressures employees face and the tools organisations can build around them.'],
];

type Resource = typeof webinars[number];

function resourceSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function ResourceRow({ label, title, items, report = false }: { label: string; title: string; items: Resource[]; report?: boolean }) {
  return (
    <section className="resource-row">
      <div className="resource-inner">
        <div className="resource-heading">
          <div className="resource-label">{label}</div>
          <h1>{title}</h1>
        </div>
        <div className="resource-grid">
          {items.map(item => (
            <Link href={`/resources/${resourceSlug(item[1])}`} key={item[1]} className="resource-link" aria-label={`Open ${item[1]}`}>
              <article className="resource-card">
                <div>
                  <div className="resource-type">{item[0]}</div>
                  <h2 className={report ? 'report-title' : ''}>{item[1]}</h2>
                  {report && <p>{item[3]}</p>}
                </div>
                <div className="resource-date">{item[2]}</div>
              </article>
            </Link>
          ))}
        </div>
        <div className="see-more"><Link href="/resources/all">SEE MORE</Link></div>
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <style>{`
        .resources-page { min-height: 100vh; background: linear-gradient(180deg, #0d0f0f 0%, #171919 72%, #f2f8e8 72%, #f2f8e8 100%); color: #f7f7f4; font-family: var(--font-inter), Inter, sans-serif; }
        .resources-nav { height: 64px; display: flex; align-items: center; justify-content: space-between; max-width: 1160px; margin: 0 auto; padding: 0 28px; }
        .resources-nav a { text-decoration: none; color: #f7f7f4; font-size: 14px; font-weight: 600; }
        .resources-nav .back { color: rgba(255,255,255,.6); font-weight: 500; }
        .resource-row { padding: 42px 28px 54px; }
        .resource-inner { max-width: 1160px; margin: 0 auto; }
        .resource-heading { text-align: center; margin-bottom: 42px; }
        .resource-label { color: rgba(200,241,53,.8); font-size: 11px; font-weight: 700; letter-spacing: .08em; margin-bottom: 10px; }
        .resource-heading h1 { margin: 0; color: #f7f7f4; font-family: var(--font-poppins), Poppins, sans-serif; font-size: clamp(27px, 3.7vw, 40px); font-weight: 500; line-height: 1.08; }
        .resource-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .resource-link { min-width: 0; color: #fff; text-decoration: none; }
        .resource-card { min-height: 500px; border-radius: 22px; padding: 34px 36px 30px; background: linear-gradient(145deg, rgba(255,255,255,.105), rgba(255,255,255,.035)); border: 1px solid rgba(255,255,255,.075); box-shadow: inset 0 1px 0 rgba(255,255,255,.045), 0 18px 40px rgba(0,0,0,.18); display: flex; flex-direction: column; justify-content: space-between; transition: transform .2s ease, border-color .2s ease; }
        .resource-card:hover { transform: translateY(-4px); border-color: rgba(200,241,53,.45); }
        .resource-type { color: rgba(255,255,255,.55); font-size: 10px; font-weight: 700; letter-spacing: .08em; }
        .resource-card h2 { color: #f7f7f4; font-family: var(--font-poppins), Poppins, sans-serif; font-size: 23px; font-weight: 500; line-height: 1.25; letter-spacing: -.01em; margin: 190px 0 0; }
        .resource-card h2.report-title { font-size: 21px; margin-top: 152px; }
        .resource-card p { color: rgba(255,255,255,.62); font-size: 13px; line-height: 1.6; margin: 14px 0 0; }
        .resource-date { color: rgba(255,255,255,.58); font-size: 10.5px; font-weight: 600; margin-top: 18px; }
        .see-more { text-align: center; margin-top: 28px; }
        .see-more a { display: inline-block; padding: 8px 14px; border-radius: 7px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.09); color: #fff; font-size: 10px; font-weight: 800; letter-spacing: .03em; text-decoration: none; }
        .resource-divider { max-width: 1160px; margin: 0 auto; border-top: 1px solid rgba(255,255,255,.07); }
        .resources-footer { color: #16140f; background: #f2f8e8; padding: 58px 28px 0; }
        .resources-footer-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; }
        .resources-footer strong { font-size: 12px; font-weight: 700; }
        .resources-footer .brand-name { display: flex; align-items: center; gap: 8px; font-size: 21px; }
        .resources-footer .brand-mark { width: 28px; height: auto; display: block; }
        .resources-footer p { max-width: 250px; color: #5a5a52; font-size: 12px; line-height: 1.55; margin: 14px 0 0; }
        .resources-footer-links { display: contents; }
        .resources-footer-links div { display: flex; flex-direction: column; gap: 10px; }
        .resources-footer-links span { color: #5a5a52; font-size: 12px; }
        .resources-footer-company { max-width: 1160px; margin: 30px auto 0; display: flex; flex-direction: column; gap: 10px; }
        .resources-footer-bottom { max-width: 1160px; margin: 36px auto 0; padding: 18px 0 0; border-top: 1px solid rgba(20,30,18,.12); color: #7a7a70; font-size: 10px; display: flex; justify-content: space-between; gap: 16px; }
        .resources-wordmark { overflow: hidden; text-align: center; line-height: .78; margin-top: 40px; }
        .resources-wordmark span { color: rgba(149,204,66,.28); display: inline-block; font-size: clamp(100px, 21vw, 300px); font-weight: 800; letter-spacing: .02em; transform: translateY(16%); }
        @media (max-width: 760px) {
          .resources-page { background: linear-gradient(180deg, #0d0f0f 0%, #171919 84%, #f2f8e8 84%, #f2f8e8 100%); }
          .resources-nav { padding: 0 18px; }
          .resource-row { padding: 42px 18px; }
          .resource-heading { margin-bottom: 28px; }
          .resource-grid { grid-template-columns: 1fr; gap: 12px; }
          .resource-card { min-height: 420px; border-radius: 16px; padding: 24px 20px 20px; }
          .resource-card h2, .resource-card h2.report-title { font-size: 20px; margin-top: 150px; }
          .resources-footer { padding: 42px 18px 22px; }
          .resources-footer-inner { grid-template-columns: 1fr 1fr; gap: 30px 24px; }
          .resources-footer-inner > div:first-child { grid-column: span 2; }
          .resources-footer-company { margin-top: 28px; }
          .resources-footer-bottom { display: block; line-height: 1.6; }
        }
      `}</style>
      <nav className="resources-nav" aria-label="Resources navigation">
        <Link href="/">Fermor</Link>
        <Link href="/" className="back">Back to home</Link>
      </nav>
      <ResourceRow label="WEBINARS" title="Conversations led by Fermor financial planners" items={webinars} />
      <div className="resource-divider" />
      <ResourceRow label="E-BOOKS" title="Reports for people building healthier finances" items={reports} report />
      <footer className="resources-footer">
        <div className="resources-footer-inner">
          <div>
            <div className="brand-name"><img className="brand-mark" src="/fermor-mark-clean.png" alt="Fermor" /><strong>Fermor</strong></div>
            <p>Financial intelligence and fintech tools for more confident money decisions in India.</p>
          </div>
          <div className="resources-footer-links">
            <div><strong>Navigation</strong><span>Home</span><span>Calculators</span><span>Analysis</span><span>About</span><span>Contact</span></div>
            <div><strong>Calculators</strong><span>SIP Calculator</span><span>Capital Gains Calculator</span><span>EMI Calculator</span><span>PPF Calculator</span><span>NPS Calculator</span><span>FD Calculator</span><span>Lumpsum</span><span>Home Loan</span><span>Mortgage</span><span>Car Loan</span><span>GST</span><span>Loan</span><span>% Calculator</span><span>Goal Planning</span><span>Future Value</span><span>Present Value</span></div>
            <div><strong>Legal</strong><span>Privacy Policy</span><span>Terms of Use</span><span>Disclosures</span></div>
          </div>
        </div>
        <div className="resources-footer-company"><strong>Company</strong><span>About Us</span><span>Contact</span><span>Gratuity Calc</span><span>SWP Calc</span></div>
        <div className="resources-footer-bottom"><span>© 2026 Fermor Technologies Pvt. Ltd. Educational use only.</span><span>Financial clarity. Real momentum.</span></div>
        <div className="resources-wordmark"><span>Fermor</span></div>
      </footer>
    </main>
  );
}
