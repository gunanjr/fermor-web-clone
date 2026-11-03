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

const SLUG = 'npv-calculator-a-step-by-step-guide-to-measuring-investment-value-with-fermor';
const URL = `https://fermor.in/blogs/${SLUG}`;
const TITLE = 'NPV Calculator: A Step‑by‑Step Guide to Measuring Investment Value with Fermor';
const DESCRIPTION = 'Understanding the Net Present Value (NPV) of a project is essential for anyone who wants to forecast their future wealth.';
const PUBLISHED = '2026-11-03T17:40:00+05:30';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} - Fermor`,
    description: DESCRIPTION,
    type: 'article',
    url: URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} - Fermor`,
    description: DESCRIPTION,
  },
};

const faqItems = [
  {
    q: 'What does a positive NPV indicate?',
    a: 'It means the investment is expected to generate more value than the cost of capital, creating wealth in today’s rupees.',
  },
  {
    q: 'Can I use Fermor’s NPV calculator for monthly cash flows?',
    a: 'Yes, just select “Monthly” as the period and enter the cash‑flow values accordingly.',
  },
  {
    q: 'How do I choose the right discount rate?',
    a: 'Use your personal hurdle rate, the expected return on similar assets, or the WACC for a business project.',
  },
  {
    q: 'Is the NPV calculator free on Fermor?',
    a: 'All basic calculators, including the NPV tool, are free to use without a subscription.',
  },
  {
    q: 'Can I compare two projects with different cash‑flow timings?',
    a: 'Absolutely. Run separate NPV calculations for each project and compare the results.',
  },
  {
    q: 'Does Fermor account for taxes in the NPV calculation?',
    a: 'The calculator itself uses the cash‑flow numbers you provide, so you should enter post‑tax amounts; Fermor’s tax library can help you estimate those figures.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  url: URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: DESCRIPTION,
  articleSection: 'Personal Finance',
  keywords: 'npv calculator',
  inLanguage: 'en-IN',
  mainEntityOfPage: { '@type': 'WebPage', '@id': URL },
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'NPV Calculator Guide', item: URL },
  ],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };

export default function NpvCalculatorGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>NPV Calculator Guide</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Personal Finance
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime={PUBLISHED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Nov 3, 2026</time>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            {TITLE}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article className="npv-body" itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <h2>{"Introduction"}</h2>
<p>{"Understanding the Net Present Value (NPV) of a project is essential for anyone who wants to forecast their future wealth. An "}<strong>{"NPV calculator"}</strong>{" helps you convert future cash flows into today’s rupees, giving you a clear view of whether an investment will add value. In this guide we start from the basics, walk through the math, show how to use Fermor’s free NPV calculator, and explore how to apply the results to real‑world decisions such as SIPs, EMIs, and retirement planning."}</p>
<h2>{"What Is NPV and Why It Matters"}</h2>
<p>{"NPV is the difference between the present value of cash inflows and the present value of cash outflows over a period of time. It answers a simple question: "}<strong>{"If I invest X rupees today, how much is that investment worth in today’s terms after accounting for risk and the time value of money?"}</strong></p>
<p>{"A positive NPV means the investment is expected to generate more wealth than the cost of capital, while a negative NPV suggests the opposite. By using an "}<strong>{"NPV calculator"}</strong>{", you get personalized answers based on your own cash‑flow assumptions, allowing you to stay ahead of market noise and make confident choices."}</p>
<h2>{"Core Concepts Behind the NPV Formula"}</h2>
<table>
<thead>
<tr><th>{"Concept"}</th><th>{"Description"}</th></tr>
</thead>
<tbody>
<tr><td><strong>{"Cash Flow"}</strong></td><td>{"Money you expect to receive (inflows) or pay (outflows) in each period."}</td></tr>
<tr><td><strong>{"Discount Rate"}</strong></td><td>{"The expected rate of return or cost of capital; expressed as a percentage per period."}</td></tr>
<tr><td><strong>{"Period"}</strong></td><td>{"The time interval (usually months or years) over which cash flows occur."}</td></tr>
<tr><td><strong>{"Present Value (PV)"}</strong></td><td>{"The value today of a future cash flow after applying the discount rate."}</td></tr>
</tbody>
</table>
<p>{"The NPV formula is:"}</p>
<p>{"[ NPV = \\sum"}<em>{"{t=0}^{n} \\frac{C"}</em>{"t}{(1+r)^t} ]"}</p>
<p>{"where (C_t) is the cash flow in period (t), (r) is the discount rate, and (n) is the total number of periods."}</p>
<p>{"When (t = 0), the cash flow is the initial investment (usually a negative number)."}</p>
<h2>{"Setting Up Your First NPV Calculation"}</h2>
<h3>{"1. Gather Your Cash‑Flow Data"}</h3>
<p>{"For a typical SIP (Systematic Investment Plan) in an Indian mutual fund, you might have:"}</p>
<table>
<thead>
<tr><th>{"Year"}</th><th>{"Expected Return (₹)"}</th></tr>
</thead>
<tbody>
<tr><td>{"0 (initial)"}</td><td>{"-12,000 (first SIP installment)"}</td></tr>
<tr><td>{"1"}</td><td>{"13,200"}</td></tr>
<tr><td>{"2"}</td><td>{"14,500"}</td></tr>
<tr><td>{"3"}</td><td>{"15,800"}</td></tr>
<tr><td>{"4"}</td><td>{"17,200"}</td></tr>
<tr><td>{"5"}</td><td>{"18,800"}</td></tr>
</tbody>
</table>
<p>{"If you are evaluating a rental property, cash flows would include rent received, maintenance costs, property tax, and the eventual resale price."}</p>
<h3>{"2. Choose a Discount Rate"}</h3>
<p>{"A common approach for Indian investors is to use the weighted average cost of capital (WACC) or a personal hurdle rate. For a moderate‑risk SIP, many choose 10 % per year. For a real‑estate project, 12 % might be more realistic."}</p>
<h3>{"3. Input the Numbers into an NPV Calculator"}</h3>
<p>{"Fermor’s platform hosts a "}<strong>{"free NPV calculator"}</strong>{" among its 150+ financial tools. Simply navigate to the calculator, select “Annual” as the period, enter the cash‑flow series, and set the discount rate. The tool instantly displays the NPV and a summary chart."}</p>
<h2>{"Using Fermor’s NPV Calculator: A Live Example"}</h2>
<ol>
  <li><strong>{"Log in to Fermor"}</strong>{" – Your dashboard aggregates all your financial data, so you can pull past investment returns without manual entry."}</li>
  <li><strong>{"Open the Calculator"}</strong>{" – Under “Tools → Calculators,” click on "}<strong>{"NPV Calculator"}</strong>{"."}</li>
  <li><strong>{"Enter Cash Flows"}</strong>{" – Copy the SIP table above into the rows; the first row automatically registers as a negative outflow."}</li>
  <li><strong>{"Set Discount Rate"}</strong>{" – Type "}<strong>{"10"}</strong>{" for 10 % and select “Yearly.”"}</li>
  <li><strong>{"Calculate"}</strong>{" – Press “Compute.”"}</li>
</ol>
<p><strong>{"Result:"}</strong>{" The calculator shows an NPV of "}<strong>{"₹4,260"}</strong>{". This positive figure tells you that, given a 10 % discount rate, the SIP is expected to create extra wealth of roughly four thousand rupees over five years."}</p>
<p>{"The same workflow works for any project—just replace the cash‑flow numbers. Because Fermor pulls your existing portfolio data, you can also model scenarios such as increasing SIP amounts or adding a lump‑sum investment, and see the updated NPV instantly."}</p>
<h2>{"Interpreting the NPV Result"}</h2>
<ul>
  <li><strong>{"Positive NPV"}</strong>{" – The investment adds value relative to your chosen discount rate. Consider moving forward or increasing the allocation."}</li>
  <li><strong>{"Zero NPV"}</strong>{" – The project breaks even; you are earning exactly the rate you required. Evaluate other qualitative factors before deciding."}</li>
  <li><strong>{"Negative NPV"}</strong>{" – The investment is expected to underperform your hurdle rate. Look for alternatives with higher returns or lower risk."}</li>
</ul>
<p>{"Remember that NPV is only as accurate as your cash‑flow estimates and discount rate. Using Fermor’s “scenario planner,” you can test multiple rates (e.g., 8 %, 12 %) to see how sensitive the NPV is to market changes."}</p>
<h2>{"Common Pitfalls When Using an NPV Calculator"}</h2>
<table>
<thead>
<tr><th>{"Pitfall"}</th><th>{"How to Avoid It"}</th></tr>
</thead>
<tbody>
<tr><td><strong>{"Ignoring Inflation"}</strong></td><td>{"Adjust future cash flows for expected inflation or use a real discount rate."}</td></tr>
<tr><td><strong>{"Using the Wrong Periodicity"}</strong></td><td>{"Match the cash‑flow frequency (monthly, quarterly, yearly) with the discount rate’s compounding."}</td></tr>
<tr><td><strong>{"Over‑optimistic Cash‑Flow Estimates"}</strong></td><td>{"Base projections on historical data; Fermor’s market data feeds can help you benchmark realistic returns."}</td></tr>
<tr><td><strong>{"Forgetting Terminal Value"}</strong></td><td>{"For long‑term projects, add a terminal value (e.g., resale price) in the final period."}</td></tr>
</tbody>
</table>
<h2>{"Integrating NPV Analysis with Other Fermor Tools"}</h2>
<h3>{"SIP vs. EMI Decision"}</h3>
<p>{"Suppose you are choosing between investing ₹12,000 per year in a SIP or paying a ₹1,20,000 home loan EMI over five years. Use Fermor’s "}<strong>{"EMI calculator"}</strong>{" to find the total interest paid, then run an NPV analysis on the net cash outflows versus the SIP inflows. The side‑by‑side comparison helps you forecast which option will maximize wealth."}</p>
<h3>{"Retirement Planning"}</h3>
<p>{"Fermor’s "}<strong>{"retirement calculator"}</strong>{" estimates the corpus you need at age 60. By feeding the projected corpus as a future cash inflow into the NPV calculator, you can see today’s rupee value of your retirement goal and decide how much to invest each month."}</p>
<h3>{"Tax Impact"}</h3>
<p>{"The platform’s tax library explains how capital gains tax will affect your returns. Adjust your cash‑flow table to reflect post‑tax amounts before running the NPV calculator for a more accurate picture."}</p>
<h2>{"Step‑by‑Step: Building a Full Investment Model in Fermor"}</h2>
<ol>
  <li><strong>{"Create a New Scenario"}</strong>{" – In the dashboard, click “Add Scenario.”"}</li>
  <li><strong>{"Import Historical Data"}</strong>{" – Link your brokerage account; Fermor syncs past SIP performance."}</li>
  <li><strong>{"Define Future Contributions"}</strong>{" – Set monthly or yearly amounts, and any expected lump sums."}</li>
  <li><strong>{"Add Expected Returns"}</strong>{" – Use market‑average returns from Fermor’s “Market Insights” section (e.g., 12 % equity, 7 % debt)."}</li>
  <li><strong>{"Run NPV Calculator"}</strong>{" – Choose “Run NPV” within the scenario."}</li>
  <li><strong>{"Review Sensitivity"}</strong>{" – Switch discount rates to see best‑case and worst‑case outcomes."}</li>
  <li><strong>{"Export Report"}</strong>{" – Download a PDF that includes the NPV, cash‑flow chart, and assumptions for future reference or to share with a financial advisor."}</li>
</ol>
<h2>{"Real‑World Example: Evaluating a Small Business Expansion"}</h2>
<p><strong>{"Background:"}</strong>{" An Indian tech‑savvy professional plans to open a second co‑working space. Expected cash flows (₹) over 4 years are:"}</p>
<table>
<thead>
<tr><th>{"Year"}</th><th>{"Inflow"}</th><th>{"Outflow"}</th></tr>
</thead>
<tbody>
<tr><td>{"0"}</td><td>{"0"}</td><td>{"-8,00,000 (setup cost)"}</td></tr>
<tr><td>{"1"}</td><td>{"4,00,000"}</td><td>{"-1,00,000 (operating)"}</td></tr>
<tr><td>{"2"}</td><td>{"5,00,000"}</td><td>{"-1,00,000"}</td></tr>
<tr><td>{"3"}</td><td>{"6,00,000"}</td><td>{"-1,00,000"}</td></tr>
<tr><td>{"4"}</td><td>{"7,00,000"}</td><td>{"-1,00,000 (plus resale of furniture ₹2,00,000)"}</td></tr>
</tbody>
</table>
<p>{"Net cash flow per year = Inflow – Outflow."}</p>
<p>{"Using Fermor’s NPV calculator with a discount rate of "}<strong>{"11 %"}</strong>{", the result is "}<strong>{"₹1,35,000"}</strong>{". The positive NPV suggests the expansion is financially viable, assuming the cash‑flow assumptions hold. By tweaking the discount rate to 14 %, the NPV drops to "}<strong>{"₹30,000"}</strong>{", highlighting the importance of risk assessment."}</p>
<h2>{"When to Use an NPV Calculator vs. Other Metrics"}</h2>
<ul>
  <li><strong>{"NPV"}</strong>{" – Best for absolute value creation and comparing projects of different sizes."}</li>
  <li><strong>{"IRR (Internal Rate of Return)"}</strong>{" – Useful when you need a percentage return figure but can be misleading for non‑conventional cash flows."}</li>
  <li><strong>{"Payback Period"}</strong>{" – Simple but ignores the time value of money; complement with NPV for a complete picture."}</li>
</ul>
<p>{"Fermor provides calculators for all three metrics, so you can run them side by side and develop a holistic view."}</p>
<h2>{"Frequently Updated Data Keeps Your NPV Accurate"}</h2>
<p>{"Financial markets in India are dynamic. Fermor updates its market data daily, including mutual‑fund NAVs, ETF prices, and benchmark indices. When you refresh your scenario, the NPV calculator automatically incorporates the latest numbers, ensuring your forecast stays relevant."}</p>
<h2>{"Summary: Your Clear Path to Informed Investing"}</h2>
<ul>
  <li><strong>{"Gather realistic cash flows"}</strong>{" – Use past data from Fermor’s dashboard."}</li>
  <li><strong>{"Pick a sensible discount rate"}</strong>{" – Reflect personal risk tolerance or WACC."}</li>
  <li><strong>{"Run the NPV calculator"}</strong>{" – Fermor delivers instant results and visualizations."}</li>
  <li><strong>{"Interpret the sign"}</strong>{" – Positive means value creation; negative calls for reconsideration."}</li>
  <li><strong>{"Test alternatives"}</strong>{" – Combine with EMI, SIP, and retirement calculators for a full financial picture."}</li>
</ul>
<p>{"By following this step‑by‑step process, you can confidently decide whether an investment aligns with your wealth‑building goals."}</p>
<h2>Frequently asked questions</h2>
<h3>{"What does a positive NPV indicate?"}</h3>
<p>{"It means the investment is expected to generate more value than the cost of capital, creating wealth in today’s rupees."}</p>
<h3>{"Can I use Fermor’s NPV calculator for monthly cash flows?"}</h3>
<p>{"Yes, just select “Monthly” as the period and enter the cash‑flow values accordingly."}</p>
<h3>{"How do I choose the right discount rate?"}</h3>
<p>{"Use your personal hurdle rate, the expected return on similar assets, or the WACC for a business project."}</p>
<h3>{"Is the NPV calculator free on Fermor?"}</h3>
<p>{"All basic calculators, including the NPV tool, are free to use without a subscription."}</p>
<h3>{"Can I compare two projects with different cash‑flow timings?"}</h3>
<p>{"Absolutely. Run separate NPV calculations for each project and compare the results."}</p>
<h3>{"Does Fermor account for taxes in the NPV calculation?"}</h3>
<p>{"The calculator itself uses the cash‑flow numbers you provide, so you should enter post‑tax amounts; Fermor’s tax library can help you estimate those figures."}</p>
<p>{"Ready to see the value of your next investment? Try Fermor’s free NPV calculator now."}</p>
          </article>

          {/* Sidebar */}
          <aside
            className="npv-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
            } as React.CSSProperties}
          >
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>EMI Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/future-value-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Future Value Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .npv-body h2 { font-family: ${POPPINS}; font-size: 20px; font-weight: 700; color: ${C.dg}; line-height: 1.3; margin-top: 36px; margin-bottom: 14px; letter-spacing: -0.01em; }
        .npv-body h3 { font-family: ${POPPINS}; font-size: 16.5px; font-weight: 600; color: ${C.dg}; line-height: 1.35; margin-top: 24px; margin-bottom: 10px; }
        .npv-body p { font-family: ${INTER}; font-size: 15px; color: ${C.ink}; line-height: 1.75; margin-bottom: 16px; }
        .npv-body ul, .npv-body ol { font-family: ${INTER}; font-size: 15px; color: ${C.ink}; line-height: 1.7; margin: 0 0 20px; padding-left: 24px; }
        .npv-body ul { list-style-type: disc; }
        .npv-body ol { list-style-type: decimal; }
        .npv-body li { margin-bottom: 10px; }
        .npv-body table { border-collapse: collapse; width: 100%; font-size: 13.5px; border: 1px solid ${C.border}; margin-bottom: 20px; display: block; overflow-x: auto; }
        .npv-body th { font-family: ${INTER}; font-size: 12.5px; font-weight: 700; color: ${C.ink}; padding: 10px 14px; text-align: left; border-bottom: 2px solid ${C.border}; border-right: 1px solid ${C.border}; background: ${C.paleDg}; }
        .npv-body td { font-family: ${INTER}; font-size: 13.5px; color: ${C.ink}; padding: 9px 14px; border-bottom: 1px solid ${C.border}; border-right: 1px solid ${C.border}; line-height: 1.5; }
        .npv-body tbody tr:nth-child(even) td { background: #FAFAFA; }
        .npv-sidebar::-webkit-scrollbar { width: 5px; }
        .npv-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        @media (max-width: 900px) {
          article { grid-column: 1 / -1; }
          aside { display: none; }
        }
      `}</style>
    </>
  );
}
