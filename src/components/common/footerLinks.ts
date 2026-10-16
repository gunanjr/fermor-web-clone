/**
 * Footer link data, one set per page family. The footer's VISUAL design is shared (Footer in
 * app/_home/Footer.tsx); what each family shows in its columns is contextual, so these sets keep
 * the links each family's old footer carried. Pass one to <Footer minimal columns={...} />.
 *
 * The dark homepage Footer (unified) renders its own single "Sitemap" link and strips any
 * /sitemap.xml item found in a column, so GENERAL_COLUMNS does not contain one. SiteFooter, used
 * on individual pages, gets its Sitemap link from the shared Explore column below (SITEMAP_ITEM),
 * always as the last Explore item; withSharedColumns keeps exactly one.
 */

/** Compliance paragraph shown by both footers (Footer and SiteFooter). */
export const FOOTER_LEGAL: string[] = [
  'Fermor Technologies Pvt. Ltd. is registered in India and operates fermor.in, a financial calculator and education platform for Indian users. Fermor is not a SEBI-registered investment adviser and does not provide personalized financial, investment, or tax advice. All calculators, content, and tools on this platform are provided for educational and informational purposes only; individual results may vary.',
];

export type FooterItem = { l: string; href: string };
export type FooterColumn = { h: string; items: FooterItem[] };

/** The one Sitemap link on individual pages. It lives in the shared Explore column and points at
    the XML sitemap, which is the only sitemap Fermor serves. */
export const SITEMAP_ITEM: FooterItem = { l: 'Sitemap', href: '/sitemap.xml' };

/** Per-calculator footers were written as { hd, links: ['/path|Label', ...] }. Same data, kept in
    that compact form next to each calculator, converted here. A few of them carried
    "/#|Income Tax"-style placeholders (they only scroll the homepage to the top, they lead
    nowhere), which are dropped; a column left empty by that is dropped too. */
export function pipeColumns(groups: { hd: string; links: string[] }[]): FooterColumn[] {
  return groups
    .map(g => ({
      h: g.hd,
      items: g.links
        .map(s => { const i = s.indexOf('|'); return { l: s.slice(i + 1), href: s.slice(0, i) }; })
        .filter(it => it.href && it.href !== '#' && it.href !== '/#'),
    }))
    .filter(c => c.items.length > 0);
}

/** Homepage, /calculators, /blogs and general pages. */
export const GENERAL_COLUMNS: FooterColumn[] = [
    { h: 'Navigation', items: [{ l: 'Home', href: '/' }, { l: 'Calculators', href: '/calculators' }, { l: 'Blogs', href: '/blogs' }, { l: 'About', href: '/about' }, { l: 'Contact', href: '/contact' }] },
    { h: 'Calculators', items: [{ l: 'SIP Calculator', href: '/calculators/sip-calculator' }, { l: 'EMI Calculator', href: '/calculators/emi-calculator' }, { l: 'Compound Interest', href: '/calculators/compound-interest-calculator' }, { l: 'Home Loan', href: '/calculators/home-loan-calculator' }, { l: 'FD Calculator', href: '/calculators/fd-calculator' }, { l: 'PPF Calculator', href: '/calculators/ppf-calculator' }, { l: 'Lumpsum', href: '/calculators/lumpsum-calculator' }, { l: 'Income Tax', href: '/calculators/income-tax-calculator' }, { l: 'All calculators', href: '/calculators' }] },
    { h: 'Legal', items: [{ l: 'Privacy Policy', href: '/privacy' }, { l: 'Terms of Use', href: '/terms' }, { l: 'Disclosures', href: '/about' }] },
    { h: 'Company', items: [{ l: 'About Us', href: '/about' }, { l: 'Contact', href: '/contact' }] },
];

/** Calculators without a contextual list of their own, GDP pages, blogs and company pages: the
    discovery links the dark-green SubFooter carried. Its five "Home Loans / Fixed Deposits /
    Stocks / Income Tax / Retirement" links all pointed at "/", so they are not carried over
    (the calculators they stood for are in the Calculators column; Income Tax now points at /tax).
    Added: Browse by AMC, Blogs and All calculators. */
export const DISCOVERY_COLUMNS: FooterColumn[] = [
  { h: 'Calculators', items: [{ l: 'SIP Calculator', href: '/calculators/sip-calculator' }, { l: 'Lumpsum Calculator', href: '/calculators/lumpsum-calculator' }, { l: 'EMI Calculator', href: '/calculators/emi-calculator' }, { l: 'PPF Calculator', href: '/calculators/ppf-calculator' }, { l: 'NPS Calculator', href: '/calculators/nps-calculator' }, { l: 'FD Calculator', href: '/calculators/fd-calculator' }, { l: 'Gratuity Calculator', href: '/calculators/gratuity-calculator' }, { l: 'Home Loan Calculator', href: '/calculators/home-loan-calculator' }, { l: 'SWP Calculator', href: '/calculators/swp-calculator' }, { l: 'Mortgage Calculator', href: '/calculators/mortgage-calculator' }] },
  { h: 'Explore', items: [{ l: 'Mutual Funds', href: '/mutual-funds' }, { l: 'Browse by AMC', href: '/mutual-funds/amc' }, { l: 'Income Tax', href: '/tax' }, { l: 'Blogs', href: '/blogs' }, { l: 'All calculators', href: '/calculators' }] },
  { h: 'Company', items: [{ l: 'About', href: '/about' }, { l: 'Contact', href: '/contact' }, { l: 'Privacy Policy', href: '/privacy' }, { l: 'Terms of Use', href: '/terms' }] },
];

/** Credit cards and account: the link set the old MainFooter carried. */
export const PRODUCT_COLUMNS: FooterColumn[] = [
    { h: 'Navigation', items: [{ l: 'Home', href: '/' }, { l: 'Calculators', href: '/calculators' }, { l: 'Blogs', href: '/blogs' }, { l: 'About', href: '/about' }, { l: 'Contact', href: '/contact' }] },
    { h: 'Calculators', items: [{ l: 'SIP Calculator', href: '/calculators/sip-calculator' }, { l: 'Capital Gains Calculator', href: '/calculators/capital-gains-calculator' }, { l: 'EMI Calculator', href: '/calculators/emi-calculator' }, { l: 'PPF Calculator', href: '/calculators/ppf-calculator' }, { l: 'SSY Calculator', href: '/calculators/ssy-calculator' }, { l: 'NPS Calculator', href: '/calculators/nps-calculator' }, { l: 'FD Calculator', href: '/calculators/fd-calculator' }, { l: 'Lumpsum', href: '/calculators/lumpsum-calculator' }, { l: 'Home Loan', href: '/calculators/home-loan-calculator' }, { l: 'Mortgage', href: '/calculators/mortgage-calculator' },         { l: 'Car Loan', href: '/calculators/car-loan-calculator' }, { l: 'GST', href: '/calculators/gst-calculator' }, { l: 'Loan', href: '/calculators/loan-calculator' }, { l: '% Calculator', href: '/calculators/percentage-calculator' }, { l: 'Goal Planning', href: '/calculators/goal-planning-calculator' }, { l: 'Future Value', href: '/calculators/future-value-calculator' }, { l: 'Present Value', href: '/calculators/present-value-calculator' }] },
    { h: 'Legal', items: [{ l: 'Privacy Policy', href: '/privacy' }, { l: 'Terms of Use', href: '/terms' }, { l: 'Disclosures', href: '/about' }] },
    { h: 'Company', items: [{ l: 'About Us', href: '/about' }, { l: 'Contact', href: '/contact' }] },
];

/** Mutual fund pages: what the old MutualFundsFooter carried (All mutual funds, Browse by AMC,
    All calculators, About), plus the guide, compare tool and legal links. */
export const MUTUAL_FUND_COLUMNS: FooterColumn[] = [
  { h: 'Mutual Funds', items: [{ l: 'All mutual funds', href: '/mutual-funds' }, { l: 'Browse by AMC', href: '/mutual-funds/amc' }, { l: 'Mutual fund guide', href: '/mutual-funds/guide' }, { l: 'Compare funds', href: '/mutual-funds/compare' }] },
  { h: 'Explore', items: [{ l: 'All calculators', href: '/calculators' }, { l: 'SIP Calculator', href: '/calculators/sip-calculator' }, { l: 'Lumpsum Calculator', href: '/calculators/lumpsum-calculator' }, { l: 'SWP Calculator', href: '/calculators/swp-calculator' }, { l: 'Blogs', href: '/blogs' }, SITEMAP_ITEM] },
  { h: 'Company', items: [{ l: 'About', href: '/about' }, { l: 'Contact', href: '/contact' }, { l: 'Privacy Policy', href: '/privacy' }, { l: 'Terms of Use', href: '/terms' }] },
];

/** Tax pages (salary and city pages, /tax, /tax/by-city): the tax-to-calculator links the tax
    template's own footer carried. */
export const TAX_COLUMNS: FooterColumn[] = pipeColumns([
  { hd: 'Calculators', links: ['/calculators/old-vs-new-tax-regime-calculator|Old vs New Regime', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/income-tax-calculator|Income Tax', '/calculators/hra-calculator|HRA Exemption', '/calculators/nps-calculator|NPS', '/calculators/ppf-calculator|PPF', '/calculators/sip-calculator|SIP'] },
  { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
  { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
]);

/** The brand line under the logo in SiteFooter. One value, so the wording changes in one place. */
export const FOOTER_DESCRIPTION = 'Fermor helps you compare your options and see what a financial decision will cost, from loans and investments to tax, before you commit.';

/**
 * Every SiteFooter shows these three categories, taken from the mutual fund set (the reference for a
 * complete footer): Mutual Funds, Explore, Company. A page family adds its own contextual columns on
 * top (a calculator's Calculators and Topics, the tax pages' tax links) and may add items to a shared
 * column, but it can no longer replace the shared structure with a shorter one.
 */
export const SHARED_FOOTER_COLUMNS: FooterColumn[] = MUTUAL_FUND_COLUMNS;

/** Family columns whose heading matches a shared one are merged into it (shared items first, then the
    family's own, duplicates by destination dropped); every other family column comes first. The
    /sitemap.xml item is never part of a column. */
export function withSharedColumns(family: FooterColumn[] = []): FooterColumn[] {
  const norm = (h: string) => h.trim().toLowerCase();
  const shared = SHARED_FOOTER_COLUMNS.map(c => ({ h: c.h, items: [...c.items] }));
  const own: FooterColumn[] = [];
  for (const col of family) {
    const target = shared.find(c => norm(c.h) === norm(col.h));
    if (!target) { own.push({ h: col.h, items: [...col.items] }); continue; }
    for (const it of col.items) if (!target.items.some(x => x.href === it.href)) target.items.push(it);
  }
  const seen = new Set<string>();
  return [...own, ...shared]
    .map(c => {
      const items = c.items.filter(it => it.href !== SITEMAP_ITEM.href && !(seen.has(c.h + it.href) ? true : (seen.add(c.h + it.href), false)));
      return { h: c.h, items: norm(c.h) === 'explore' ? [...items, SITEMAP_ITEM] : items };
    })
    .filter(c => c.items.length > 0);
}
