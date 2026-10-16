# Fermor — AI Assistant Context

Read `CALCULATOR_STANDARDS.md` before working on any calculator page, news article, or new page. Every change must pass the quality gate defined there before it is committed or pushed.

---

## What Fermor Actually Is

Fermor is a financial product distribution company built on trust.

Not a calculator company. Not a behavioral finance app. Not a financial advisor. The infrastructure layer that sits between people who have financial decisions to make and the products that serve those decisions.

**The three-layer architecture — built in sequence:**

**Layer 1 — Distribution:** 525+ financial calculators across 20 categories, programmatic SEO, FermorAI, organic search. This is how users find Fermor. Calculators are the door.

**Layer 2 — Conversion:** Financial Eligibility Engine (Tier 1: range-based algorithmic estimate, no PAN; Tier 2: verified snapshot via CIBIL/Experian soft pull with PAN), Tax Regime Decision Funnel, Guided Decision Flows, Second Opinion Tool. This is how visitors become users and users become customers. The eligibility engine is the lobby.

**Layer 3 — Monetization:** Affiliate commissions on loans/cards/insurance/investments, Annual Optimization Report (₹999/year per user), corporate wellness (Year 2), data intelligence (Year 3). The marketplace is the business.

**The business model in one loop:** User has a financial question → Fermor gives clarity through tools → Fermor shows what they qualify for → Fermor matches them to the right product → user takes action through a partner → partner pays Fermor for the qualified lead → user trusts Fermor more and returns for the next decision.

**The two proven models Fermor combines:**
- NerdWallet (US): Calculator depth + editorial trust + affiliate marketplace. $836M revenue, 92% gross margin.
- PaisaBazaar (India): Eligibility matching + credit bureau integration + pre-qualified leads. ₹8,000+ crore market cap.

Neither exists as a combined, full-spectrum, tool-first platform in India. That is the gap Fermor fills.

**The CA Portal (ca.fermor.in) and the Kids section were retired on 14 Oct 2026.** Neither is a product, a roadmap item or a place to send users. Do not link to either, build for either, or describe either as live or upcoming. See "Retired Sections" below. Priority #1 is now the distribution layer and the eligibility engine.

**The calculator architecture rule:** Minimum 4 user-adjustable inputs per calculator. Below 4 variables, AI Overview can answer generically. Above 4, it becomes personal — personal = click required = user on Fermor. This is not a guideline. It is an architecture rule.

This distinction matters for everything you write on this codebase. The calculator is top-of-funnel distribution. The eligibility engine and the marketplace are the actual revenue engine. Every piece of content should earn trust for that eventual conversion — not just provide a good answer for one search query.

---

## Non-Negotiable Rules

1. **No em dashes anywhere in visible content.** Run `grep -n "—"` before every commit. Replace with a colon, period, or restructure. This includes list items — `<strong>Label:</strong> text` not `<strong>Label</strong> — text`.
2. **Content must not read like AI wrote it.** No "It's worth noting", "In conclusion", "Firstly/Secondly", "Robust", "Comprehensive", "Taken together". Write the way a senior finance journalist at a serious Indian publication would write — specific, confident, no padding.
3. **Never push to main without `npm run build` passing with zero TypeScript errors.**
4. **Every link on every page opens in a new tab.** Every `<Link>` and `<a>` anywhere on the site needs `target="_blank" rel="noopener noreferrer"` — nav links, breadcrumbs, inline article links, CTAs, sidebar tools, related reads. No exceptions.
5. **Cite real sources inline.** When you mention SEBI regulations, link to sebi.gov.in. When you mention AMFI, link to amfiindia.com. AI systems and Google both weight pages that cite the authorities they were trained on.
6. **All calculator pages need:** FAQPage (10+ questions), WebApplication, BreadcrumbList, HowTo, WebPage with speakable and hasPart, Organization with knowsAbout, DefinedTerm with Wikipedia sameAs. See CALCULATOR_STANDARDS.md for schema templates.
7. **localStorage persistence on every calculator.** Returning users should see their last calculation. Key pattern: `fermor-[name]-v1`.
8. **No decorative colored boxes in article prose.** Data tables are fine. Formula code blocks are fine. One definition block with a left border per page is fine. No yellow/blue/green info boxes.
9. **Every H2 must be answered in its first sentence.** AEO requirement for featured snippet coverage.
10. **Tabs go INSIDE the white calculator card, never above it.** Use CAGR's underline style (`borderBottom: 2.5px solid C.dark` on active tab, `background: #FAFDF8` on tab strip). Never use a pill-style tablist floating above the card.
11. **No visible breadcrumb in calculator UI.** The `<BreadcrumbList>` schema lives in page.tsx only. The calculator client renders `<header>` with H1 + subtitle, nothing else above it.
12. **WaitlistCard position and text are fixed.** Always placed AFTER the calculator card and BEFORE the `<article>` tag. Title: "Save your results". Subtitle: "Sign up to save this calculation and access your results any time." Button: "Sign up free" / "Saving...". Never "Join waitlist", never "Get your complete financial picture".
13. **Article table headers use `fontWeight: 700, color: C.ink`.** Never `fontWeight: 600, color: C.ink3` — that makes headers too faint to read. Every article `<table>` also needs `fontSize: 13` on the element itself.
14. **`selectedCurrency` from `useCurrency` is a `CurrencyInfo` object, never a string.** Always use `selectedCurrency.code`, `.symbol`, or `.name`. Using `selectedCurrency` directly in JSX throws "Objects are not valid as a React child" at runtime.
15. **Never redefine an imported shared component locally.** If `SaveResultsCard` (or any component) is imported from `src/components/common/`, do NOT also define a local `function SaveResultsCard` in the same file. This causes `TS2440` build errors. Delete the local definition and use the imported version.
16. **There is no CA call-to-action box on any page.** The "Are you a CA or financial advisor?" box was removed from every calculator, blog, tax and mutual fund page on 14 Oct 2026. Never add it, in any wording, to a new or revamped page. `scripts/branding/design.test.ts` fails if that text appears. The CA Portal is still reachable from the footer (Company column) and from the one-line prose mention on tax articles (see "CA Portal CTAs on fermor.in").
17. **No fill colors anywhere in the input panel — the input section must feel colorless.** This applies to ALL elements inside the input section: sliders, value display buttons, toggle buttons (yr/mo, employment type, CIBIL score, regime), year/tenure preset pills, and informational display boxes. Never use `C.paleLime`, `C.lime2`, `C.lime`, `C.dark`, or any tinted fill (e.g. `#F0F4EE`) as background or border colors on input section buttons or containers. Toggle button container: `border: 1px solid ${C.border}, borderRadius: 8, overflow: hidden`. Active toggle: `background: C.white, color: C.ink, fontWeight: 600`. Inactive toggle: `background: transparent, color: C.ink3, fontWeight: 400`. Preset pill buttons: active = `background: C.white, border: 1.5px solid C.ink, color: C.ink, fontWeight: 700`; inactive = `background: transparent, border: 1px solid C.border, color: C.ink3, fontWeight: 500`. Informational derived-value boxes use `background: '#F5F9F2', border: '1px solid ${C.border}'`. All color lives in the output/result panel only.
18. **No red anywhere in any calculator UI.** The C palette has no red. Never add `error`, `errorBg`, or any red hex (`#D32F2F`, `#FDECEA`, `#5F2120`, or any variant) to the C object or to inline styles. Error and warning states use only C palette colors: `background: C.white, border: \`1px solid ${C.border}\`, borderLeft: \`3px solid ${C.ink3}\`, title: C.ink, body: C.ink2`. The only off-palette colors permitted are amber for CIBIL/regime tips (`background: '#FFF4E5', border: '1px solid #FFD8A8', text: '#A15C00'`) and semantic data colors in amortization tables (interest: `#B45309`, principal: `#166534`).
19. **Calculator input and output panels must have equal column widths and equal visual height.** Always use `gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)'` (plain `1fr 1fr` lets inputs widen one column and clip the other). Never use `1.1fr 0.9fr` or any asymmetric split. If the input panel content is taller than the output panel, paginate inputs using the "More settings" / "Back" pattern (see CALCULATOR_STANDARDS.md Input Section Pagination). The reference implementation is `in-hand-salary-calculator/InHandSalaryCalculatorClient.tsx`.
20. **Every calculator output panel must have a donut chart.** The donut shows the primary split relevant to that calculator type (e.g. principal vs interest for loan calculators, in-hand vs deductions for salary calculators). Place it at the top of the result panel on desktop using `order: mobile ? 1 : -1` on the donut div and `order: mobile ? 2 : -1` on the legend. SVG must have `role="img"` and `aria-label`. See CALCULATOR_STANDARDS.md Result Panel section.
21. **Calculators with an amortization schedule must include a stacked bar chart above the table.** Each bar shows principal (C.dark fill) stacked on interest (C.lime2 fill) for that year. The chart sits inside the collapsible Amortization Schedule section, above the data table. Clicking the "Amortization Schedule" toggle reveals both the chart and the table together. Use the SVG `BarChart` component from `mortgage-calculator/MortgageCalculatorClient.tsx` as the reference implementation. The bar chart is a major UX differentiator that top competitors (HDFC, Groww, Bankrate India) do not offer at the same quality.
22. **Never claim "No sign-up" or "No ads" as blanket statements anywhere on the site.** Both are false. Fermor has a real, visible sign-up flow (`SaveResultsCard`, "Sign up free") on every calculator page, and the site displays ads (see the "Advertisement 300x250" placeholder already present in every calculator sidebar). Saying either in a meta description, footer tagline, or the "What is Fermor?" answer directly contradicts what's visibly on the same page and reads as careless, not confident. Meta descriptions should say "Free to use" instead of "No sign-up." Footer taglines should describe what's actually true and durable — e.g. "Free financial calculators for India. Clear math, no bias." Don't hide the account or ad features; they're real parts of the product, not something to pretend doesn't exist. Before writing any absolute claim ("no X", "never Y", "always Z") about the product, verify it against what the page you're editing actually shows.
23. **When revamping an EXISTING calculator page (not building a new one), explicitly re-check two structural elements that content work tends to skip past:** the In-Content Promo Bar (a distinct pattern from inline `<Link>`s, see CALCULATOR_STANDARDS.md) and input/output panel height balance. A revamp session's attention naturally goes to content depth (new sections, bigger tables, more FAQs), and these boilerplate-feeling elements are easy to leave exactly as the pre-revamp page had them, including missing entirely if the original page never had them either. Grep for `Open calculator` (promo bar button text) before considering a revamp done. A revamp must also keep the page on the current design (see "New and Revamped Pages Must Use the Current Design"): never restore an old nav, footer, logo or palette because the revamp branch started from an older copy of the file.
24. **Panel-height pagination is not always the right fix for an imbalanced input/output panel.** The "More settings" pattern (rule 19) works when some inputs are genuinely optional (property tax, insurance, advanced allowances). But if a calculator's basic-page inputs are already all essential (e.g. an EMI calculator's home price, down payment, rate, and tenure — none of which can be deferred without breaking the core calculation), moving one to an "advanced" page just makes the advanced page emptier without fixing the basic page's height. In that case, fix the gap from the output side: add a genuinely useful derived stat (not a filler box) that a user would actually want. On `mortgage-calculator`, adding "EMI per lakh borrowed" and "Estimated loan payoff date" to the output panel closed a real visual gap while also creating new content that maps to a real search pattern ("emi per lakh calculator"). Check both directions before assuming pagination is the answer.

25. **One FAQ design: `FAQBox` from `src/components/common/FAQBox.tsx`.** Calculators and mutual fund pages render their FAQ with it, and it copies the boxed accordion the article pages have always used (hairline `#E5E5E5` border, 10px radius, 14.5px semibold question, rotating chevron, `#555555` answer, native `<details>`). Never write a local accordion with `useState` and `aria-expanded` in a calculator, and never restyle it per page. It renders presentation only: the FAQPage JSON-LD stays in each `page.tsx`, built from the same items, so the component can never duplicate it. `scripts/branding/design.test.ts` fails on a calculator or mutual fund FAQ that bypasses it. The article pages keep their own `FaqAccordion` for now and `FAQBox` matches it value for value; change one only together with the other.
26. **Buttons and result panels are light grey, not solid black (14 Oct 2026).** A button, CTA or promo-bar action is `background: '#E9ECEE'`, `border: '1px solid #D3D7DA'`, charcoal `#101214` text, with `className="fx-btn"` for the hover, active, focus and disabled states (defined once in `app/globals.css`, matching nothing without the class). A result or summary panel is `background: '#F4F5F6'` with `1px solid #E3E6E8`, ink labels, and the key figure in green `#1F7A58` (the SIP Maturity Amount is the reference). Never use `C.dark`, `C.dg` or `#101214` as a fill for a button or panel. Kept dark on purpose: legend swatches, progress and bar-chart fills, list bullets, slider thumbs and selected-state indicators on tabs, pills and toggles (they are data or state, not surfaces). `design.test.ts` fails on a dark button.
27. **About, Contact, Privacy and Terms use `InfoPage` (`src/components/common/InfoPage.tsx`).** It supplies `PageNav`, a breadcrumb, a plain white header, a readable column, an "On this page" index for long documents and `SiteFooter`. A page passes its sections; the legal wording is rendered verbatim, so a design change never edits a clause. Never put `SubNav`, the dark `Footer` or a dark hero back on these four pages.
28. **Article and content text is neutral.** Headings, body, captions and links use the ink and grey tokens; links are ink with an underline and go green only on hover. Accent colours are for data (returns, tax comparisons, status badges, the GSTIN diagram) and never for words in prose.

---

## New and Revamped Pages Must Use the Current Design (added 14 Oct 2026)

**Every new calculator, blog, tax, GDP or mutual fund page, and every revamp of an existing one, is built on the current design. This is not optional and it is not a later migration.** A page written against an older copy of a file, from a competitor brief, or on a branch that started before the design shipped still ships in the current design. If you merge `main` and a page that arrived from it uses the old design, migrate it in the same change.

What "current design" means on an individual page:

1. **Navbar:** `<PageNav />` from `src/components/common/PageNav.tsx` (the homepage `FloatingNav` in its in-page variant). Never `CalculatorNav` (deleted), a hand-pasted `<nav>`, or a new nav. There is no "For CAs" button.
2. **Footer:** `<SiteFooter columns={...} />` from `src/components/common/SiteFooter.tsx`, with a column set from `footerLinks.ts` (`DISCOVERY_COLUMNS` by default, `pipeColumns([...])` for a page's own contextual links). Never `<Footer minimal />`, `SubFooter` (deleted) or a hand-pasted footer. The Calculators column stays at 10 links or fewer so it occupies one column. Footer links turn mint (`#75FB90`) with a mint underline on hover; that lives in `SiteFooter` only, so do not restyle links per page.
3. **Logo and icons:** the mint mark `/fermor-mark-2026.svg` (`#75FB90`, transparent) everywhere on a page, plus `app/icon.png`, `app/apple-icon.png` and `app/favicon.ico` (regenerate with `npx tsx scripts/generate-brand-assets.ts`). Schema `logo` and `publisher.logo` use `https://fermor.in/fermor-schema-logo.png` as a 512 by 512 `ImageObject`. Never `fermor-mark-clean.png`, `fermor-logo-2026.png` or a green or black recolour of the mark.
4. **Palette:** the tokens in `src/theme/pageTheme.ts` (charcoal `#101214`, neutral greys, the greens listed there). The legacy lime, pale lime and green-tinted surfaces must not appear; `LEGACY_TO_PAGE` in that file maps old values to new. A calculator's local `C` object takes its values from there.
5. **Charts:** donut rings, stacked bars, split bars and legend chips use `CHART_PAIR` (and `seriesColor(i)` for more than two categories) from `src/theme/chartPalette.ts`, which is the Fermor app's `chartPalette`. Never `C.dark` and `C.lime2` for a chart.
6. **No CA call-to-action box** (rule 16).

**Before you commit a new or revamped page:** run `npm run test:branding`. `scripts/branding/design.test.ts` fails if a calculator or blog page lacks `PageNav` or `SiteFooter`, still uses a legacy nav, footer or logo, carries the CA box, or if the footer loses the mint hover or its one-column Calculators list. `palette.test.ts` fails on legacy colours and on charts that left the chart palette. `registry.test.ts` fails on an unregistered page. After merging `main`, run it again before pushing, because pages that landed on `main` may predate this section.

To bring an old-design page across by hand: swap the nav and footer and their imports, replace the schema logo URL, run its hex values through `LEGACY_TO_PAGE`, move any donut or bar to `CHART_PAIR`, delete the CA box, then register the route.

**Merging `main` brings old-design guidance as well as old-design pages.** A branch that forked before 14 Oct 2026 writes notes in the old vocabulary (`<Footer minimal />`, the CA box, `#F5F9F2` and `C.lime2` in new sections). After a merge, read the doc additions as well as the code, and rewrite anything that contradicts this section. Resolve a merge conflict between a design hunk and a content hunk by keeping the design side for imports, nav and footer, and the incoming side for copy, with the retired CA Portal sentence stripped from any disclaimer. A page that arrives with `/#` footer links gets real routes before it is pushed.

---

## Branding Standard: Logo, Colours, Footer, Navigation, Responsive Layout

Fermor is moving to one brand in stages. This section is the standard for the page families that have been migrated, and the target for the ones that have not.

### Release scope (read this before touching a shared component)

- **Migrated:** every page family except the three listings. The homepage and general pages, the whole mutual fund vertical, all tax pages, all GDP pages, **every calculator (`app/calculators/*`) and every blog and article (`app/blogs/*`, translated variants)** are on the current design (bulk batch D3 in `rollout/branding-registry.json`, 14 Oct 2026). `/blogs`, `/calculators` and the homepage keep their own colours and render `FloatingNav` and the dark `Footer` directly. A new page is registered in the registry as part of the same change (`npx tsx scripts/branding/check-registry.ts` and `generate-counter.ts`).
- **Excluded pages must not change by accident.** Shared components are opted into the new design with an explicit prop; the default is the old behaviour. Never change a shared component's default output, and never change `globals.css` with a selector that can match a calculator or blog page. Before merging a change to a shared nav, footer or stylesheet, compare the rendered HTML of calculator and blog pages with a build of the base branch; it must be identical apart from build hashes.
- **Branding means presentation only.** A branding task must not change calculations, formulas, fund, scheme, GDP or tax data, article copy, dates, metadata, canonical URLs, redirects, slugs, routes or the meaning of structured data. Do not recolour data colours (returns, charts, status badges). If a branding fix needs one of those, stop and ask.

### A. Logo

- Use `public/fermor-mark-2026.svg` (mint `#75FB90`) beside a "Fermor" wordmark on a dark ground. Typical nav size: `width={29} height={22}`, `style={{ height: 22, width: 'auto' }}`, `alt="Fermor"`.
- On a light nav (GDP and article navs) use the dark tile: `<img src="/fermor-logo-2026.png" alt="Fermor" width={28} height={28} style={{ height: 28, width: 28, borderRadius: 7, display: 'block' }} />`. The homepage's frosted nav and `MainNavbar` use the bare mark; mint on plain white has low contrast (about 1.3:1).
- In migrated families do not use `fermor-mark-clean.png`, `fermor-mark.png`, `fermor-mark-green.png`, `fermor-mark-white.png` or `fermor-logo.png` in an `<img>`, and do not recreate the mark in CSS or text.
- **Schema logo:** the sitewide Organization in `app/layout.tsx` and every page-level `logo` or `publisher.logo` in a migrated family use `https://fermor.in/fermor-schema-logo.png` (the mark in `#1E7A46` on solid white, 512 by 512), as a 512 by 512 `ImageObject` where dimensions are given. `fermor-logo-2026.png` is the dark nav tile and is never a schema logo. The excluded calculator and blog pages still carry `https://fermor.in/fermor-mark-clean.png` in their own schema until their release; `public/fermor-mark-clean.png` must not be overwritten, renamed or deleted.
- **Favicon:** `app/icon.png` (512x512), `app/apple-icon.png` (180x180) and `app/favicon.ico` (16, 32, 48px frames) are the 2026 mark (`public/fermor-mark-2026.svg` shapes) in the homepage mint `#75FB90` on a transparent square (no tile, no container), picked up by Next's file convention. Regenerate with `npx tsx scripts/generate-brand-assets.ts`. The navbar and footer logos on individual pages use the same `/fermor-mark-2026.svg`, so the mark is one colour everywhere. Mint is about 1.3:1 on white, so it is a decision about brand consistency over legibility of the mark alone (the wordmark sits beside it in the nav and footer). Do not add `metadata.icons` (it overrides them), do not rename them (Google asks for a stable favicon URL), and use PNG or ICO only: Google's favicon documentation does not list SVG.

### A2. Titles and social metadata

- **One title format sitewide: `Page Name - Fermor`**, with an ASCII hyphen. Never an em dash, an en dash or a pipe as the brand separator. Descriptive punctuation inside a page's own title (a colon, `&`) is unaffected.
- `app/layout.tsx` sets `title.template` to `%s - Fermor`. **Write each page's `title` without the brand** (`title: 'EMI Calculator: Calculate Your Loan EMI'`) and the template adds it once. A page title that already ends in the brand renders doubled, so never write `- Fermor` or `| Fermor` into a page-level `title`.
- **Absolute titles:** use `title: { absolute: '...' }` only when the template must not apply, for example a brand-led title. `absolute` is written in full and gets no suffix, so it must already read `Page Name - Fermor` or be intentionally brand-only. The homepage (`Fermor - Smart financial decisions for India`) is the one standing exception; it shares a segment with the root layout, so the template never reaches it anyway.
- `openGraph.title` and `twitter.title` are not covered by the template. Where a page repeats its own title, write the full `Page Name - Fermor` yourself so the card matches the tab. A social title deliberately written shorter for a card may omit the brand; do not copy the page title over it just to match.
- Keep the same hyphen format in JSON-LD fields that repeat a page title or brand string (`name`, `headline`).
- The internal Kanso workspace under `app/ops` is not Fermor-branded and keeps its own titles.

### B. Colours

Reuse the tokens in `app/globals.css`, not new hex values.

| Token | Value | Use |
|---|---|---|
| `--green` | `#75FB90` | The mark and the CTA mint |
| `--green-ink` | `#1E7A46` | Mint's readable-on-white companion, for text |
| `--brand-ink` | `#101214` | Dark ground, text on mint |
| `--brand-ground` | `#0D0F10` | Deepest dark ground, logo tile |

- Navs, headers and footer shells in migrated families use `#101214` and `#75FB90`; the GDP article accent (`C.dg`) is `#101214`.
- Do not introduce `#1A3530`, `#C8F135`, `#139D49` or `#122016` as brand colours in a migrated family. `#2FAE64` stays only as a data colour (returns, NAV) in the mutual fund vertical.
- Pale and secondary shades are not tokenised: derive them (for example `rgba(117, 251, 144, 0.14)`) or ask. Do not revive `#95CC42` or `#EDFBBC`.
- **No CA CTA box.** The old "Standard CA CTA Component" block was deleted on 14 Oct 2026 and must not be recreated.
- Keep text contrast at WCAG AA and visible focus states. Never put `--green` text on white.

### C. Footer: one design, contextual links

- **Current state (14 Oct 2026): individual pages (calculators, blogs, tax, GDP, mutual funds) render `SiteFooter` from `src/components/common/SiteFooter.tsx`, not `Footer unified`.** The bullets below that describe `<Footer minimal unified>`, `CalculatorNav` and `SubFooter` are history for the migration and apply only to the homepage, `/blogs` and `/calculators`, which keep `Footer`. On `SiteFooter`, every link turns mint (`#75FB90`) with a mint underline on hover, and the Calculators column holds 10 links or fewer so it is one column. Mint on the light footer ground is low contrast by design choice (brand consistency); the underline carries the hover state as well.

- The shared footer is `Footer` in `app/_home/Footer.tsx`. **It is opt-in:** `<Footer minimal unified columns={...} />` (optional `legalNote="..."` adds one extra line to the legal text, nothing otherwise) renders the current footer (visible Sitemap link, one-shot wordmark reveal, WebP background, family link set). Without `unified` it renders exactly what it always did, which is what the calculator and blog pages still use. Do not add `unified` to a calculator or blog page except in that family's own migration.
- Link content is per page family and existing contextual links must be kept. Pick the set from `src/components/common/footerLinks.ts`: `GENERAL_COLUMNS` (homepage), `DISCOVERY_COLUMNS` (about, contact, privacy, terms through `InfoPage`, regulatory updates, GDP), `PRODUCT_COLUMNS` (credit cards, account), `MUTUAL_FUND_COLUMNS` (every mutual fund page, through `MutualFundsFooter`, which also keeps the AMFI data note), `TAX_COLUMNS` (tax index, by-city and city pages; the salary template keeps its own list via `pipeColumns`).
- **Sitemap:** every unified footer renders exactly one visible "Sitemap" link to `/sitemap.xml`, as a plain anchor (it is an XML endpoint, not an app page). On desktop and tablet it is the last item of the last link column, with the other links; on mobile it is its own full-width row directly under the accordion headings, never inside a collapsible section. `Footer` strips any `/sitemap.xml` item from a column when `unified`, so never add one to a column set. (This describes the dark `Footer` on the homepage, /blogs and /calculators. Individual pages use `SiteFooter`: see the next bullet.) A new footer variant for a migrated family must keep it. Do not replace an existing link with Sitemap. Calculator and blog pages that are not yet in a migrated batch deliberately have no Sitemap link; it arrives with their batch. Verify it in a real browser at 320, 390, 768, 1280 and 1440px: present once, visible, clickable and not clipped.
- **SiteFooter (individual pages): Sitemap is the last item of the Explore column and Contact is in the Company column. The left brand block carries only the logo, description, copyright and social icons: never put Contact Us or Sitemap back there.** `SITEMAP_ITEM` and `withSharedColumns()` in `footerLinks.ts` add the one Sitemap link to Explore for every family. `scripts/branding/footer.test.ts` fails if Sitemap appears anywhere else or twice.
- Do not drop links to simplify a footer. A link may be removed only when it is broken, a duplicate, or a placeholder (`href="#"`, `/#`, or `/` standing in for a real destination), and the reason goes in the commit message.
- A page renders exactly one footer. Pages with no site footer by design: `/ops/*`, `/sign-in`, `/signup`, `/api/*` and other authenticated or token surfaces. Document any other exception in the page's file header.
- Footer links must go to real destinations. The social and app-store badges in the shared footer are `#` placeholders until those destinations exist; do not copy that pattern.
- `components/SubFooter.tsx` is the legacy dark-green footer, still used by calculator and blog pages. Do not import it in a migrated family.

### D. Mobile and tablet responsiveness

- Every migrated page works at 320, 390, 768, 1280, 1320, 1440 and 1600px with no horizontal page scroll. Fix overflow by finding the cause, never by clipping or hiding content.
- Use `minmax(0, 1fr)`, `min(340px, 100%)` and `flex-wrap`, not fixed pixel widths. Wrap every data table in `<div style={{ overflowX: 'auto', maxWidth: '100%' }}>`.
- Charts and cards scale with their container; forms and sliders keep touch targets of at least 44px.
- Do not add unscoped global CSS. A rule in `globals.css` that matches inline styles reaches every route. Scope it to a class the migrated family owns (for example `.tax-page`).
- Check the nav and footer at mobile and desktop widths, not just the page body.

### D2. Navigation

- **Current state (14 Oct 2026): every individual page uses `<PageNav />`** (the homepage `FloatingNav`, in-page variant). `CalculatorNav` and `SubFooter` were deleted. `SubNav` and `MainNavbar` remain only for the general company, credit card and account pages. There is no "For CAs" button in any navbar.

- Reuse the nav component of the route family: `CalculatorNav` (calculators, and tax with `unified`), `SubNav` (company and legal pages), `MainNavbar` (credit cards, account), `MutualFundsHeader` (mutual funds), the page's own article nav (GDP, blogs). Do not write a one-off nav. `CalculatorNav` keeps its legacy palette and logo unless `unified` is passed.
- Mutual Funds (`/mutual-funds`) and Calculators (`/calculators`) stay reachable from the navs of the families that carry them. Browse-by-AMC (`/mutual-funds/amc`) is linked from the mutual fund header and landing page.
- Nav links point at routes that exist and follow rule 4 (`target="_blank" rel="noopener noreferrer"`).
- `MainNavbar` shows the full desktop bar at 1480px and wider and a menu button with a drawer below; `SubNav` shortens "All Calculators" to "Calculators" at 480px and below.
- **Validate links, do not sample them.** Enumerate every internal `href` the rendered pages produce (nav, drawer, breadcrumb, footer, CTAs), request each destination against a local production build, and report the count checked and the count that failed. `href="#"` placeholders are accepted only on the shared footer's social and app-store badges and where they already existed in a shared menu.

### E. Mutual fund vertical

The whole vertical uses `MutualFundsHeader` and `MutualFundsFooter` from `app/mutual-funds/MutualFundsChrome.tsx`: near-black header, mint CTA, 2026 mark, the AMFI data note, then the shared footer with `MUTUAL_FUND_COLUMNS`. New pages in the vertical use both.

### F. Checks before a page or template is done

1. Name the route's family, its nav component and its footer column set, and whether the family is migrated.
2. Migrated family: logo, tokens and schema logo follow A and B; one `<Footer minimal unified columns={...} />` with the family's existing links kept and the Sitemap link present once.
3. Check mobile, tablet and desktop in a real browser, and say so if you cannot.
4. Every internal link requested locally, with the count and failures reported.
5. Metadata, canonical URL, structured data and indexability unchanged unless the task is about them; a new page has them, plus sitemap and `llms.txt` entries where its family requires.
6. Grep the importers of every shared file you touched. For excluded families, diff rendered HTML against the base build.
7. Run `npm run typecheck` and `npm run build`, and compare lint against the base branch.
8. Record every exception and every check you could not perform in the commit message or hand-off.

---

## News Page Standards

Full detail is in `CALCULATOR_STANDARDS.md` under "News Page Standards". Summary of what applies to every article page. **Route note:** individual articles still live as literal folders (`app/blogs/<slug>/page.tsx`, same pattern as before), but the listing/nav destination moved from `/news` to `/blogs` — see "Blogs Page (formerly /news + /resources)" below for the full migration and why `/resources` no longer exists either.

**Schema (all required):**
- `NewsArticle` with datePublished, dateModified, author, publisher, about[]
- `FAQPage` — minimum 6 questions, each with a direct-answer first sentence
- `BreadcrumbList` — 3 levels: Home > Blogs > [Topic]
- `WebPage` with `speakable` (cssSelector: h1, h2, .article-lead) for voice/AEO

**H2 rule:** First sentence of every section must directly answer the H2 heading. This is the AEO requirement for featured snippets and voice results.

**Sources:** Name official sources inline in the sentence ("per NSE India data", "per SEBI circular"). Only link to government and official exchange sites (sebi.gov.in, nseindia.com, bseindia.com, rbi.org.in, epfindia.gov.in, amfiindia.com). Never link to news sites, competitors, or third-party aggregators.

**Timestamps — always use actual IST, never estimate:**
Run `TZ=Asia/Kolkata date '+%Y-%m-%dT%H:%M:%S+05:30'` in the terminal to get the real current IST time before writing any news page. **On Windows Git Bash the `TZ=` prefix is silently ignored**, so the command prints UTC with a `+05:30` label stuck on it (a 5.5 hour error that shipped once on `pan-card-download`). On Windows use PowerShell instead: `[DateTime]::UtcNow.AddHours(5.5).ToString('yyyy-MM-ddTHH:mm:ss')+'+05:30'`. Set this value in:
- `datePublished` in articleSchema
- `dateModified` in articleSchema
- `publishedTime` in openGraph
- The visible `<time dateTime="...">` element in the article header

Never hardcode a guessed time like "09:30" or "08:00". If the page is being written at 2:16 PM IST, it must say 2:16 PM IST everywhere.

**dateModified:** Update in `articleSchema` on every meaningful edit. When updated after original publish, show "Updated [date]" visibly in the article header — **only** the updated date, not the original publish date alongside it (never "Jun 19, 2026 · Updated Jun 20, 2026"). The sitemap auto-reads file mtime, so saving the file handles sitemap freshness.

**Multi-language pages:** if an article needs a translated version, each language is a separate indexable sibling URL (`[slug]-bn`, `[slug]-hi`, etc.), never a client-side toggle or geo/locale auto-redirect. Full pattern (hreflang, `workTranslation`/`translationOfWork` schema, RTL handling, visible language switcher) is in `CALCULATOR_STANDARDS.md` under "Multi-Language Content Architecture". Reference: `app/blogs/annapurna-bhandar-2026/` and its `-bn`/`-hi`/`-ur`/`-ne` siblings.

**Calculator links:** Minimum 2 natural inline links in the article body. Place them where a reader would actually want to use the calculator — not forced. This is separate from the sidebar's calculator list — when building a new news page against an existing one as a structural reference, explicitly re-check this and the In-Content Promo Bar pattern (`CALCULATOR_STANDARDS.md`) rather than assuming the reference page's visible layout already covers it; `jai-bangla-pension-scheme-2026` initially shipped with neither.

**Government portal URLs:** run `dig @8.8.8.8 <domain> +short` and `curl -I` before citing any `.gov.in` status-check or application URL, even one every other site cites. State scheme portals get silently retired/migrated, especially after a change of state government (`jaibangla.wb.gov.in` → `samarth.wb.gov.in` after the 2026 WB election is the reference case). See `CALCULATOR_STANDARDS.md` "Government Portal URLs" for the full writeup.

**ARIA (required):**
- `<nav aria-label="Site navigation">` on the top nav
- `<article>` wrapping article body, `<aside>` for sidebar
- `<time dateTime="ISO-8601">` on all visible dates
- `aria-current="page"` on the last breadcrumb item
- All images have `alt` text

**Links:** Every `<Link>` and `<a>` opens in new tab (`target="_blank" rel="noopener noreferrer"`).

**Colour:** One neutral callout max per page (border `#CCCCCC`, bg `#FAFAFA`). Sidebar uses red/green only for data values. No coloured boxes in article prose.

---

## Blogs Page (formerly /news + /resources) — Migrated 16 Sep 2026

`/news` and `/resources` no longer exist as routes. Both were merged into a single `/blogs` page and both old paths now 301-redirect there (`/news/:path*` → `/blogs/:path*`, so individual article slugs land on their real `/blogs/<slug>` page directly; `/resources/:path*` → `/blogs`, since /resources's content was all placeholder and has no real per-page equivalent). The Navbar's "Resources" item is now a hover dropdown (`app/_home/FloatingNav.tsx`) with two entries: Blogs (`/blogs`) and Calculators (`/calculators`, the existing page, untouched).

**Why this shape, not a plain rename:** `/resources` and `/news` already shared one rendering component before the migration (`ResourcesPageClient.tsx`, then under `app/resources/`) — `/news` fed it the real, published articles typed ARTICLES/NEWS, `/resources` fed it 13 placeholder Fermor-press cards across five make-believe types (ARTICLES/NEWS/CASE STUDIES/WEBINARS/E-BOOKS), plus two more hardcoded placeholder bands below it (`NewsPressSection.tsx` — "Fermor in the news" + "Case Studies" on black; `WebinarsReportsSection.tsx` — "Webinars" + "E-books" on white). None of that placeholder content was real, so instead of keeping it and just renaming the route, all 31 real articles from the old `/news` were re-split into three genuine editorial categories and used to replace every placeholder band:

- **Category 1 — "Tax & Compliance Guides"** (11 articles: Income Tax + TDS) — the white hero/grid section, `app/blogs/page.tsx`.
- **Category 2 — "Markets & Current Affairs"** (8 articles: Sports, Macroeconomics, Stock Market, IPO, IT Sector, Personal Finance, Regulation, Stock Analysis — genuinely dated current-events pieces, not evergreen guides) — the black band, `NewsPressSection.tsx`.
- **Category 3 — "Government & Utility Services"** (12 articles: EPF, GST, Utility Services, Government Schemes) — the second white band, `WebinarsReportsSection.tsx`.

The category assignment lives in `app/blogs/blogCategories.ts` as three explicit slug sets (not derived from `article.category`, since the three blog categories don't map 1:1 onto the finer-grained per-article categories), and `assertFullCoverage()` in that file throws at build/import time if any article in `ARTICLES` is missing from all three sets, listed in more than one, or if a category lists a slug that no longer exists in `ARTICLES` — adding an article to `articles.ts` without categorizing it is a build failure, not a silent gap.

**Individual article routing:** every article is still a literal folder (`app/blogs/<slug>/page.tsx`, moved via `git mv` from `app/news/<slug>/`, history preserved), not a dynamic `[slug]` route — same pattern as before, just under `/blogs`. All in-article cross-links, breadcrumb schema, canonical/OG/JSON-LD URLs, and the visible "Blogs" breadcrumb link (previously labelled "Analysis", pointing at `/news`) were repointed in the same move.

**Search and category filter (added 13 Oct 2026).** Both the search box and the "All types" dropdown switch `/blogs` into a results mode: Featured Articles and the two category bands hide, and every match shows directly under the controls with no heading. The dropdown shows each category's article count. Matching and ranking come from `src/utils/searchMatch.ts` (`searchScore()`), shared with `/calculators`: case, accents and punctuation are ignored, "Section54" equals "section 54", plain words of 5+ letters tolerate small typos, words containing digits (54, 80d, 194j) must match exactly, and title matches outrank body matches. Search reads each article's title, lead, sub-category, slug words and tickers from `articles.ts`, so new articles are searchable with no extra step.

**Build guard: `app/blogs/listingCheck.ts`.** `app/blogs/page.tsx` calls `assertBlogListingComplete()`, so `next build` (locally, in CI and on Vercel) fails if an `app/blogs/<slug>/page.tsx` folder has no card in `articles.ts`, a card has no folder, or an article is not the top search result for its own title. Translated siblings (`<slug>-hi`, `-bn`, ...) of a listed article are skipped on purpose. It lives in the page, not a CI script, because Vercel deploys without waiting for CI. If the build fails with "Blogs listing check failed", the message names the exact folder or card to fix.

**If this section itself goes stale:** check `app/blogs/blogCategories.ts` for the current category slugs and names, `app/blogs/articles.ts` for the article data, and `app/_home/FloatingNav.tsx` for the current Navbar dropdown wiring — those three files are the actual source of truth, this paragraph is a summary of them as of the migration date above.

---

## After Every Push — Google Search Console Actions

These steps must be done in GSC every time a new page or calculator goes live. Do not skip.

**Step 1 — Request indexing (every new or updated URL):**
1. Go to [Google Search Console](https://search.google.com/search-console) → select fermor.in property
2. Paste the full URL (e.g. `https://fermor.in/calculators/sbi-home-loan-calculator`) into the URL Inspection bar at the top
3. Click "Request Indexing" — Google will crawl and index within hours to days

**Step 2 — Verify sitemap (for new pages only):**
1. GSC → Sitemaps → confirm `https://fermor.in/sitemap.xml` shows the new URL count updated
2. If sitemap count didn't increase, check `app/sitemap.ts` — the new route must be included

**Step 3 — Check for coverage errors (after 3–7 days):**
1. GSC → Pages → check "Not indexed" tab for the new URL
2. If it shows "Discovered — currently not indexed" or "Crawled — currently not indexed", request indexing again
3. If it shows a 404 or redirect error, fix the URL/canonical in code and re-push

**Step 4 — Monitor performance (after 14–21 days):**
1. GSC → Search results → filter by Page → paste the URL
2. Check which queries are getting impressions — this reveals keyword gaps to fix
3. If impressions are low, expand the `keywords` array in metadata and enrich the article content
4. If CTR is low (<1%), the title tag needs to be more specific and compelling

**What each page type needs in GSC:**
- Calculator: request indexing of the calculator URL + the `/calculators` listing page
- News article: request indexing of the article URL + `/news` listing page
- Any page: never skip — Google does not automatically crawl every push immediately

---

## Before Pushing — Quick Check

**For all changes:**
```
□ grep -n "—" [file] → zero results (em dashes banned everywhere)
□ npm run build → zero TypeScript errors
□ Content sounds like a human finance journalist
```

**For new or edited calculators:**
```
□ FAQPage schema has 10+ questions
□ CurrencySelector + useCurrency wired into the input panel header and all money values (grep for `CurrencySelector` — its absence is an immediately visible gap next to any reference calculator, not a cosmetic nice-to-have)
□ localStorage persistence implemented (key: fermor-[name]-v1)
□ All links open in new tab — grep '<Link ' and verify every one has target="_blank"
□ No decorative info boxes in article sections
□ Tabs are INSIDE the white card (underline style), not floating above as pills
□ No visible breadcrumb nav in calculator UI (JSON-LD only in page.tsx)
□ WaitlistCard: after calculator card, before <article>; correct text (rule 12 above)
□ No CA CTA box on the page (rule 16); the "Are you a CA or financial advisor?" text must not appear
□ Article table headers: fontWeight: 700, color: C.ink, fontSize: 13 on <table>
□ How-to list items use colon: <strong>Label:</strong> text — no em dashes
□ Result panel is light grey (#F4F5F6) with the key figure in green #1F7A58 (rule 26); a panel with 2 metrics uses alignItems: stretch + justifyContent: space-between on each column
□ <PageNav /> first and <SiteFooter columns={...} /> last, no /# placeholder footer links; npm run test:branding passes; the route is in rollout/branding-registry.json
□ llms.txt updated with new calculator entry, or rewritten if this was a revamp of an existing page (a stale entry from before the revamp undersells the page to AI crawlers)
□ New calculator added to src/data/calculators.ts in the correct category — this is how the /calculators listing page discovers calculators. Without this step the page exists but is invisible on the listing. The listing page reads from CATEGORIES in that file.
□ Sitemap (user standing instruction, every revamp): set the calculator's `app/calculators/<slug>/page.tsx` entry in `src/data/sitemap-lastmod.json` to the real IST time (PowerShell), then confirm `/sitemap.xml` serves that date. Do this without being asked
□ dateModified updated in WebApplication and WebPage schemas
□ GSC: request indexing for the calculator URL + /calculators page
□ Sitemap lastmod: after the hand-set entry above (revamps), later bumps are automatic once merged to main (regenerate-lastmod-manifest CI job, see
  "Sitemap and Programmatic Page Generation" below) — no manual step, but if /sitemap.xml still
  shows the old date a few minutes after merge, check that job's run history before assuming a
  new bug; apart from the revamp entry above, don't hand-edit src/data/sitemap-lastmod.json
```

**For new blog articles:**
```
□ Add article card to ARTICLES array in app/blogs/articles.ts (top of array = newest first)
□ Article card needs: slug, category, title, lead, date, readTime, tickers[]
□ Before writing, `ls app/blogs | grep -i <topic>` and read any sibling page on the same keyword cluster
  (e.g. pan-card-download vs pan-card-number-search): link to it instead of duplicating its section
  so two Fermor pages do not compete for the same query
□ Assign the new slug to a category in app/blogs/blogCategories.ts (CATEGORY_1/2/3_SLUGS) — the
  build fails loudly via assertFullCoverage() if this is skipped, but check it explicitly anyway
□ A folder without its articles.ts card also fails the build (listingCheck.ts), so the article
  can never go live invisible on /blogs and its search
□ NewsArticle + FAQPage + BreadcrumbList schemas in the page
□ datePublished and dateModified set correctly
□ Canonical URL matches the folder name exactly (https://fermor.in/blogs/<slug>)
□ Internal links to related Fermor calculators in the article body
□ All links open in new tab — every <Link> needs target="_blank" rel="noopener noreferrer"
□ grep -n "—" on both the article page and app/blogs/articles.ts after adding the card
□ GSC: request indexing for the article URL + /blogs page
```

---

## Retired Sections (14 Oct 2026)

- **Kids:** the "For Kids" entries in the `FloatingNav` desktop bar and mobile sheet are gone. Kids never had a route (the entries were `href="#"`), so there is nothing to redirect and no sitemap entry. Do not add it back.
- **CA Portal:** see the next section. Retirement strategy: the paths have no equivalent page, so they return **410 Gone** (not a blanket redirect to the homepage, which would be a soft 404). Delete `app/ca`, `app/intake`, `app/plan`, `app/r` and the `getToken`, `setToken` and `clearToken` helpers in `src/lib/api.ts` once the 410s have been live for a while, then drop the matching entries from `RETIRED_PREFIXES` only if the paths should 404 instead. Remove the `ca.fermor.in` domain from the Vercel project when convenient.
- `scripts/branding/design.test.ts` fails if a shipped file links to `ca.fermor.in`, mentions the CA Portal (other than the privacy policy's note that old CA accounts' data can be deleted on request), carries a "For Kids" or "For CAs" nav entry, or if the 410 middleware is removed.

---

## CA Portal — RETIRED 14 Oct 2026 (historical record only)

**The CA Portal was retired on 14 Oct 2026 at the owner's request. Nothing below is live, planned or to be built on.** It is kept so the history is not lost. `middleware.ts` answers 410 Gone for `ca.fermor.in`, `/ca/*`, `/plan/*`, `/intake/*` and `/r/*`, no page links to it, and the sitemap never listed it. The old source folders (`app/ca`, `app/intake`, `app/plan`, `app/r`) are slated for deletion; `src/lib/api.ts` still exports their `getToken` helpers until they go. Do not add a CA Portal link, CTA or mention anywhere.

What it was, for the record:

### What the CA Portal Does (v1, live)

**Exact product flow:**

1. CA registers at `ca.fermor.in/ca/signup` with name, email, firm name, and password.
2. CA logs in at `ca.fermor.in/ca/login`.
3. CA dashboard shows all their clients.
4. CA creates a client record: name, email (optional), phone (optional).
5. From the client detail page, the CA has two options:
   - **Direct entry:** Click "Generate report" → fill tax inputs → generate.
   - **Intake form:** Click "Share intake form" → system generates a unique link (`fermor.in/intake/[token]`) → CA sends this link to the client on WhatsApp or email → client fills their own income and deductions → data is saved to the client record → CA then generates the report.
6. Report generation form has two steps:
   - Step 1: Income (gross salary, basic, HRA, rental, interest, other)
   - Step 2: Deductions (80C, 80D, NPS, home loan, 80G, 80E, etc.)
7. System generates a tax optimization report showing:
   - Old regime vs new regime tax liability, side by side
   - Which regime saves more money and by how much
   - Missed deduction opportunities (what the client could claim but didn't)
   - Section-by-section breakdown
   - Affiliate product recommendations (investment products relevant to the client's tax situation)
8. Report outputs:
   - PDF download (stored on Supabase)
   - Shareable public link: `fermor.in/plan/[token]`
9. The **public plan page** (`fermor.in/plan/[token]`) is where clients view the full online report. It shows the tax analysis plus affiliate product recommendations. This page is accessible without login. Anyone with the link can view it.
10. Draft persistence: if the CA leaves the report form mid-way and returns, localStorage restores the draft.

### What Is NOT Yet Built (Planned)

- Payment / subscription flow. The portal is currently free.
- CA's own logo and branding on the PDF. Currently uses Fermor branding.
- Revenue share / affiliate commission tracking per CA. Currently Fermor earns all affiliate revenue.
- Aggregate analytics for CAs (how many clients viewed their plan, which products got clicks).
- Multi-CA firm support (one firm, multiple CA logins).

### Correct Terminology

- The product is called the **CA Portal** (not "CA White Label Portal" or "CA SaaS").
- The generated report is a **Tax Optimization Report** or **Financial Blueprint** (not "Fermor Financial Blueprint PDF").
- The PDF does NOT have embedded affiliate links. The **public plan page** (web) has affiliate product recommendations. The PDF just has the tax analysis and the shareable link to the web page.
- The public plan URL is `fermor.in/plan/[token]` (always on fermor.in, never on ca.fermor.in).
- The intake form URL is `fermor.in/intake/[token]` (always on fermor.in).
- The CA dashboard is at `ca.fermor.in/ca/` (middleware rewrites ca.fermor.in/* to /ca/* in the Next.js app).

### Technical Architecture (for developers)

- Frontend: Next.js app (`fermor-web`). CA pages live under `app/ca/`. Middleware at `middleware.ts` rewrites all `ca.fermor.in` requests to `/ca/` paths.
- Backend: Fastify API (`fermor-backend`), deployed at `api.fermor.in`. CA routes under `/api/v1/ca/`.
- Database: PostgreSQL via Prisma. Tables: `users`, `ca_profiles`, `ca_clients`, `ca_reports`, `affiliate_products`, `report_clicks`.
- PDF: `@react-pdf/renderer` v4 (pure ESM). Entry: `src/modules/reports/pdf-generator.ts` (NOT .tsx — NFT requires .ts).
- PDF fonts: Uses Helvetica (built-in, no external font). Currency symbol is "Rs." not "₹" (Helvetica has no rupee glyph).
- Storage: Supabase Storage for PDF files.
- Auth: JWT stored in `localStorage` as `ca_token`. `getToken()` in `src/lib/api.ts`.

### CA Portal CTAs on fermor.in: none

There is no CA Portal link, button, footer entry, calculator-dropdown button, FAQ answer, schema description or one-line article mention anywhere on fermor.in. Tax articles do not carry the old "CAs can generate Tax Optimization Reports" sentence. "What is Fermor?" answers describe the calculators, the eligibility engine and the free account only.

### CA box: removed

The colored "Are you a CA or financial advisor?" box (primary and secondary copies) was removed from every page on 14 Oct 2026 at the owner's request, along with its shared `CACTA` component in `CalcUi.tsx`. Do not rebuild it, copy it from git history, or add a variation. The one-line prose mention on tax articles was removed with the portal itself.


---

## Volatile Market Data: Never Inherit, Always Verify

A calculator page had a hardcoded 22K gold rate of Rs 7,150/g in every worked example, table, and reverse-calculator row. The real rate at the time was approximately Rs 12,900/g. The stale figure was not something invented in that editing session; it was a pre-existing constant already in the file, carried forward into new content without being checked against a current source, because there was no live web access in that session to check it against. The error was roughly 45%, and because every downstream number (per-gram tables, the weight-to-loan ladder, the reverse calculator, worked examples) was derived from that one constant, the error propagated through the entire page.

**The rule this produced: any price, rate, or figure that moves with the market (gold, silver, commodity rates, current bank interest rates, repo rate) must be verified against a source with actual current knowledge before it goes into a worked example or a static table.** A number inherited from an existing constant in the codebase is not verified just because it was already there — it may be exactly as stale as the day it was written. If the working session has no live web access, say so explicitly and ask the user (or a tool that does have live access) to confirm the figure before publishing, rather than presenting an inherited number with confidence. This applies doubly to any number that becomes the base for other computed numbers in the same page, since an error there does not stay contained to one line, it multiplies across every table built on top of it.

Where a calculator has a live data feed available (this codebase has `/api/commodities/GOLD`, backed by a `commodity_prices` Supabase table), prefer wiring content and defaults to that feed over a hardcoded snapshot constant, since a live feed cannot go stale the way a written-once number can. Static article prose (worked examples, comparison tables) still needs a hardcoded anchor figure because it cannot be computed live, but that anchor should be re-checked whenever the page is revisited, not assumed correct because it compiled without error last time.

**When a user supplies a rate/price correction themselves (not caught by the assistant), verify the arithmetic independently before applying it, even though you cannot verify the underlying real-world figure.** `mortgage-calculator`'s anchor home loan rate was corrected from 8.5% to 7.5% p.a. after the user supplied a structured brief citing RBI repo rate cuts (6.50% to 5.25% through 2025) that this session had no way to confirm directly (no live web access, and events after the assistant's training cutoff). Two things made this correction trustworthy enough to apply broadly: first, it was internally consistent with content already on the page (`fixed-vs-floating` section already said "the RBI began cutting the repo rate... by 125 basis points," but the anchor rate had never been updated to reflect that already-referenced cut, meaning 8.5% was itself stale by the page's own logic). Second, and more actionable regardless of whether the rate claim itself can be verified: every EMI/interest/eligibility figure in the user's brief was independently recomputed with `calcEMI()` before being published, and matched to within rounding. A user-supplied number can still contain arithmetic errors even when the underlying rate is correct (or vice versa); check both independently. This correction also surfaced a real pre-existing bug unrelated to the rate change: the "first EMI is roughly 59% interest" claim in two FAQ answers and one article section was wrong even at the old 8.5% rate (the true figure, computed from the same EMI formula and confirmed against the page's own Excel-formula table, was closer to 82%) — recomputing every dependent figure from scratch rather than scaling old numbers by a ratio is what caught this.

---

## Verify the Calculator's Actual Code Implements the Formula Its Own Content Claims

`wealth-growth-calculator` had a `buildProjection()` function using a simplified annual approximation (`corpus * r + yearlyContrib * (r/2)`) instead of the exact monthly-compounding SIP-plus-lumpsum future value formula. The page's own FAQ schema already stated the correct formula in words. The gap between the two was not cosmetic: the approximation understated the true corpus by 4% at 10 years and by over 14% at 30 years, and the error grew with tenure, meaning every worked example, FAQ answer, and table on the page needed to be rebuilt once the formula was fixed, not just re-labelled. This is a distinct failure mode from a stale rate constant (the "Volatile Market Data" lesson above): the rate can be perfectly current and the *arithmetic itself* can still be wrong. When revamping an existing calculator, before trusting any of its existing worked examples as a baseline, pick one and recompute it independently from the calculator's own core function. If the code's output doesn't match the article's own claimed formula or existing worked-example prose, the code is very likely the thing that's wrong, not the prose, since prose gets written by hand against the "obviously correct" formula while a small arithmetic shortcut can slip into the implementation unnoticed. Also check for internal contradictions while you're in there: the same recompute-from-scratch approach on `mortgage-calculator` (see above) separately caught a "first EMI is 59% interest" claim that was wrong even under the old rate.

## llms.txt Entries That Claim Features That Don't Exist Are Worse Than a Stale Entry

`wealth-growth-calculator`'s `llms.txt` entry described "step-up SIP and inflation adjustment" as features of the calculator. Neither existed in the actual code: the calculator only ever supported a flat monthly investment, a flat return rate, a tenure, and existing wealth, with no step-up toggle and no inflation input anywhere. A stale entry undersells a page; an aspirational entry actively misinforms any AI system or user relying on it to know what the tool can do, and is arguably worse. When rewriting an `llms.txt` entry during a revamp, describe only what the shipped code actually does, and where a natural adjacent feature is missing (step-up SIP, inflation adjustment), either build it for real or point to the dedicated calculator that already has it (`step-up-sip-calculator`, `real-return-calculator`) rather than describing it as part of this page. Linking out to a dedicated calculator instead of half-building a duplicate of its feature inside this one also avoids keyword/content cannibalization between the two pages.

---

## Calculator Input Panel Pagination: Check Panel Height Balance on Every New Calculator

CLAUDE.md rule 19 already requires equal input/output panel heights with a "More settings"/"Back" pagination pattern when the input panel has more content than the output panel (reference: `in-hand-salary-calculator/InHandSalaryCalculatorClient.tsx`, and now also `home-loan-eligibility-calculator` and `gold-loan-calculator`). In practice this gets missed on calculators that started with a shorter input list and grew more sliders and toggles over time, since nothing forces a re-check once the page already shipped. When adding a new input field to an existing calculator, or when revamping an existing calculator's content, explicitly compare the input panel's rendered height against the output panel's and paginate if they've drifted apart. The pattern itself is a `showAdvanced` boolean state, a "More settings" button (bottom-right, chevron pointing right) on the basic page, and a "Back" button (bottom-left, chevron pointing left) on the advanced page — copy this exactly from either reference implementation rather than inventing a variant.

---

## VPF-Style Result Strip, Line Limits and FAQ Sync (added 14 Oct 2026)

Learned while revamping `old-tax-regime-calculator`, `section-80c-calculator` and `section-80d-calculator`, using `vpf-calculator` as the visual reference.

**Every calculator needs the full-width collapsible strip under the card.** It sits inside the white card, below the two-panel grid, with `borderTop`, a title, a grey subtitle on desktop, a pill and a chevron, collapsed by default. Expanded content is a full-width table with a `#F4F5F6` header band and `#FAFAFA` zebra rows. A breakdown list placed inside the result panel is not a substitute. Name it for the calculator (Slab-Wise, Investment-Wise, Deduction-Wise, Year-by-Year).

**The result panel ends with the percentage bar.** A 5px bar with the two labels above it (`CHART_PAIR.primary` for the saved or paid share and `CHART_PAIR.secondary` for the rest, never `C.dark` and `C.lime2`) closes the stat rows, as on VPF.

**Paragraphs are capped at 3 rendered lines, not 3 sentences.** Measure it: in a headless browser compare each `article p` height to its line height at 1440px. Keep paragraphs near 280 characters. Disclaimers count. Split a long paragraph rather than shrinking the font.

**The visible FAQ and the FAQPage schema must be the same list.** `page.tsx` and the client file each kept their own array and drifted apart on all three pages. Diff the question lists before shipping, and keep "What is Fermor?" last in both.

**A page's `<Link>` and `<a>` rule includes the footer.** Footer Company links (About, Privacy, Terms, Contact) need `target="_blank" rel="noopener noreferrer"` too. Footer link targets must be real routes, never `/#`.

**Keywords.** Check `ls app/calculators` before adding a Keyword Planner term. Do not add generic terms (`ppf calculator`, `elss calculator`, `hra calculator`) to a sibling page when a dedicated page owns them.

**Sitemap.** Set the page's entry in `src/data/sitemap-lastmod.json` to the real IST time (PowerShell, not Git Bash) and confirm `/sitemap.xml` serves it. This is a standing instruction on every calculator revamp: do it without being asked.

**One FAQ source per page.** When the visible FAQ and the schema each carry their own array they drift. Put the questions in a `faqData.ts` next to the page and import it in both (`nps-tax-benefit-calculator` is the reference). Never write "no sign-up" in an FAQ answer (rule 22).

**Footer.** Every calculator renders `<SiteFooter columns={...} />` (`DISCOVERY_COLUMNS` or `pipeColumns([...])`) and `<PageNav />`, never `<Footer minimal />`, the old inline footer or a `/#` placeholder link. Replace a `/#|Label` footer item with a real calculator or article route.

**Re-verify tax facts, and fix the worked examples.** Recompute every worked example from the page's own tax function. `section-80c-calculator` showed a saving of Rs 52,000 where the correct figure is Rs 46,800, and `section-80d-calculator` used the 20% slab at Rs 12 lakh income where 30% applies. `nps-tax-benefit-calculator` said 10% for private employees under 80CCD(2) when the new regime allows 14% for everyone. An `llms.txt` entry must describe only what the code does: the 80C entry advertised a regime selector that did not exist.

## Sidebar Scrollbar Styling (Required on Every Calculator)

The sticky sidebar on every calculator has `overflowY: auto`. Without custom scrollbar CSS, the browser inherits the page's accent color and renders a lime/green scrollbar that looks broken next to a professional finance tool.

**Required on every calculator sidebar — non-negotiable:**

```tsx
<style>{`
  .[calc]-sidebar::-webkit-scrollbar { width: 5px; }
  .[calc]-sidebar::-webkit-scrollbar-track { background: transparent; }
  .[calc]-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
  .[calc]-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
`}</style>
<aside
  className="[calc]-sidebar"
  style={{
    ...
    scrollbarWidth: 'thin',
    scrollbarColor: '#C4C9C4 transparent',
  } as React.CSSProperties}
>
```

Use a unique class name per file (e.g. `vpf-sidebar`, `mortgage-sidebar`, `fire-sidebar`) — the `<style>` tag injects global CSS so names must not collide. The `as React.CSSProperties` cast is needed because TypeScript's React types don't include Firefox scrollbar properties. Full pattern in CALCULATOR_STANDARDS.md under "Sticky, Independently-Scrollable Sidebar".

**If the sidebar itself is `display: 'flex', flexDirection: 'column'`** (as opposed to plain block layout with `marginBottom` spacing between children), every direct child box needs `flexShrink: 0` explicitly set. Without it, children compress toward zero height before the `overflowY: auto` scroll triggers, so boxes visually collapse at normal viewport heights and only look correct once zoomed out far enough that nothing needs to scroll. This bug is invisible at a quick zoomed-out glance and only shows up at real screen heights — caught on `annapurna-bhandar-2026` via user screenshots at two different zoom levels. Plain block-layout sidebars (`epfo-login-uan-passbook`) don't have this failure mode at all.

---

## Sitemap and Programmatic Page Generation

`app/sitemap.ts` uses a two-tier priority model, not per-page fine-tuning: home 1.0 → core product (calculators, calculators listing, credit-cards) 0.9 → programmatic (tax pages, news articles) 0.85 → gold 0.9 → legal (about, contact, privacy, terms) 0.3. `changefreq` follows the same logic: calculators and tax pages are `weekly` (they get continuous UX/content/schema improvements, they are not static), news is `daily`, legal is `yearly`. Do not hand-tune individual pages away from these tiers without a real reason — the model exists so priority reflects business importance, not today's traffic. A brand-new, low-traffic calculator gets the same 0.9 as the highest-traffic one, because Fermor treats every calculator as a first-class product, not a static page that "earns" priority over time.

**`lastmod` is derived from git history, not filesystem mtime, and this matters.** A fresh git clone or checkout (which is what happens on every Vercel deploy) resets every file's filesystem mtime to the checkout time — this was verified directly: three files last edited on three different real dates all showed the identical mtime after a checkout. Using `fs.statSync().mtime` for `lastmod` silently collapses every page in the sitemap to one identical timestamp in production, defeating the entire purpose of per-page freshness signals. `fileLastMod()` in `app/sitemap.ts` instead runs `git log -1 --format=%aI -- <path>` per file, with a filesystem/now fallback for untracked files. **This assumed Vercel does a full (non-shallow) git clone at build time, and that assumption was wrong** — confirmed directly against Vercel's own documentation: Vercel always performs `git clone --depth=10` for every build, fetching only the 10 most recent commits, never the full repository history. `git log -1 -- <path>` against a shallow clone returns an empty string (not an error) for any file whose real last-touching commit falls outside that 10-commit window. If `lastmod` values in production ever look identical across many pages again, this depth-10 default is the first thing to check, not a hypothesis to verify from scratch.

**That warning above went unheeded for almost two months and shipped a factually impossible sitemap to Google.** `fileLastMod()` was added 9 June 2026. By early August, the live `sitemap.xml` had 427 of ~2951 URLs (roughly 1 in 7, including the VPF calculator) all sharing the exact identical `lastmod` of `2018-10-20T01:46:40.000Z` — eight years before the company's own 2025 founding date, and years before `fermor.in` existed at all. The real git history for one of those affected pages showed a genuine commit three weeks earlier; the sitemap was flatly wrong, not stale. **Root cause, confirmed (not a guess) by directly diffing Vercel's own real build logs against the actual git history:** Vercel's `git clone --depth=10` fetched only the 10 most recent commits reachable from `main` at build time. On 24 Jul, 6 commits landed on `main` within about 22 hours (a heavier-than-usual push day), so the depth-10 window for that day's builds barely reached back into 23 Jul. Any page whose real last edit predated that window (VPF's `page.tsx` was last genuinely touched 16 Jul, eight days outside the fetched history) made `git log -1 -- <path>` return an empty string, silently falling through to the `fs.statSync()` fallback, which itself resolved to the frozen 2018 timestamp rather than real checkout time. Mutual fund scheme/AMC pages were never at risk from this specific bug: they get their `lastModified` from a live backend API fetch in `getMutualFundSchemeUrls()`/`getAmcUrls()`, not from `fileLastMod()`'s git lookup at all, which is exactly why they kept showing correct, current dates throughout. This was never caught because nobody looked: no one had opened `fermor.in/sitemap.xml` and actually read the `lastmod` values since the feature shipped — the sitemap URL count and page presence were checked routinely, the dates inside it never were. **The fix is `EARLIEST_PLAUSIBLE_LASTMOD` in `fileLastMod()`**: any resolved date (from either git or the fs.statSync fallback) older than the company's own founding date is rejected in favor of `new Date()`, so a broken lookup now produces a slightly-wrong-but-plausible recent date instead of a nonsensical eight-year-old one. **This class of bug (a documented risk that was written down but never actually re-verified against the live site) is the reason to periodically run this check, not just when something seems wrong**: `curl -s https://fermor.in/sitemap.xml | grep -o '<lastmod>[^<]*</lastmod>' | sort | uniq -c | sort -rn | head -20` — if any single timestamp accounts for more than a handful of URLs, or any date predates the company's founding, that's the same bug resurfacing (possibly via a different fallback path next time) and needs the same treatment: don't just patch the one symptom, add a sanity floor that makes the whole class of "silently wrong historical date" impossible to ship again.

**The sanity-floor fix above was not sufficient, and the actual persistent root cause was something else entirely: `/sitemap.xml` was silently running as ISR, not pure static.** Days after shipping `EARLIEST_PLAUSIBLE_LASTMOD`, the live sitemap still showed the same class of incident: 420 URLs sharing an identical `lastmod` of `2026-07-29T12:29:56.000Z` - a plausible-looking date (after 2025, so the sanity floor didn't reject it) with no real commit at that timestamp. Two things about the original fix were wrong. First, the counter only incremented on the final `return new Date()` line, missing the case where `fs.statSync()`'s mtime passes the plausibility check and gets returned directly - a "plausible" date is not the same thing as a "correct" one, and once git's own lookup has already failed, nothing downstream of that should be trusted uncounted. Second and more important: the real mechanism wasn't the depth-10 clone at all (that was real, but not what kept recurring) - it was that Next.js infers a route's caching behavior from every `fetch()` inside it, and `getMutualFundSchemeUrls()`/`getAmcUrls()` used `next: { revalidate: 86400 }`, which silently put the **entire** sitemap route (all ~2,951 URLs) on a 1-day ISR schedule. That means `fileLastMod()` doesn't only run once at build time in an environment with full git history - it also re-runs roughly once a day inside a live deployed serverless function, where git is not reliably available at all, so every lookup falls back at once and lands on nearly the same wall-clock instant. `export const revalidate = false` at the route level was tried first and does **not** override this: verified directly by rebuilding in a real `git clone --depth=10` (matching Vercel's documented behavior) and confirming the build output's Revalidate/Expire columns for `/sitemap.xml` still showed `1d 1y` with that export present, meaning a fetch's own revalidate window wins over a route-level override when it's the more restrictive of the two. The fix that actually worked, confirmed by rebuilding and watching those columns disappear entirely: change both fetches to `{ cache: 'force-cache' }` instead. **If `sitemap.ts` is ever touched again, verify any caching-related change by rebuilding and checking the build output table directly (`grep "sitemap.xml"` against a captured build log) - the Revalidate/Expire columns are the ground truth, not what an export "should" do based on reading the code.**

**Even after the ISR fix above, the exact same class of incident happened a third time, and the real root cause turned out to be that `git log` cannot be trusted at all inside a Vercel build, not that it merely returns empty sometimes.** With ISR removed, the sitemap was confirmed genuinely regenerating fresh on every deploy (verified: new deploys produced new ETags, `x-vercel-cache: PRERENDER` not `HIT`, ruling out caching entirely) - and it still shipped 423 URLs sharing an identical, wrong `lastmod`. The build log for that exact deployment showed **zero** fallback warnings, meaning `fileLastMod()` believed every single git lookup succeeded. It had: `git log -1 -- app/calculators/vpf-calculator/page.tsx`, run inside a real `git clone --depth=10` (reproduced locally to confirm), returned commit `cc63881` - a real, single-parent commit from 29 Jul that only touches 5 files in `app/news/` and `CALCULATOR_STANDARDS.md`, nowhere near the VPF calculator. Git's diff-vs-parent logic breaks down once history hits the shallow boundary, and it can misattribute an unrelated commit as a file's last change rather than simply returning nothing. This means **no amount of retrying, sanity-checking, or fallback-counting inside `sitemap.ts` can fix this** - the tool being called (`git log` in a shallow clone) can return a wrong-but-well-formed answer, which is indistinguishable from a correct one without independently verifiable ground truth.

**The actual, final fix: stop calling git at Vercel build time entirely.** `scripts/generate-lastmod-manifest.ts` computes every page's real lastmod once, using `git log -1 -- <path>`, but only ever runs where a full (non-shallow) clone is guaranteed - a dedicated GitHub Actions job (`regenerate-lastmod-manifest` in `ci.yml`, `fetch-depth: 0`) that commits the resulting `src/data/sitemap-lastmod.json` back to `main` on every push, before Vercel's native integration builds the same commit. `app/sitemap.ts`'s `fileLastMod()` now only reads this checked-in JSON - it never shells out to git at all, so Vercel's shallow clone is no longer relevant to it in any way. The generation script itself refuses to run if it detects a shallow checkout (`git rev-parse --is-shallow-repository`), so a future CI misconfiguration fails loudly instead of silently baking the same bug back into the manifest. Verified end to end: rebuilt in a genuine `git clone --depth=10`, inspected the actual generated `.next/server/app/sitemap.xml.body` (not just the build log), and confirmed VPF's entry now reads the correct `2026-07-16T11:14:42.000Z` (16 Jul in UTC, matching its real commit exactly).

**The paragraph above described a CI job that, for over a month, did not actually exist.** `.github/workflows/ci.yml` had no `regenerate-lastmod-manifest` job at all — `src/data/sitemap-lastmod.json` was only ever updated when someone happened to run `npx tsx scripts/generate-lastmod-manifest.ts` by hand and commit it alongside unrelated work, which is how it stayed correct for a while by luck rather than by design. This surfaced in production exactly the way you'd expect: multiple calculators were genuinely revamped and merged to `main` (confirmed both by real `git log -1 --format=%aI -- <path>` dates and by a separate internal GSC indexing tracker recording the actual merge dates), yet `/sitemap.xml` kept showing each one's original creation date from July, because nothing had regenerated the manifest since. **Writing down that a fix exists is not the same as verifying it shipped** — the code side of this fix (`generate-lastmod-manifest.ts`, `fileLastMod()` reading the checked-in JSON) was real and correct; the CI automation that was supposed to keep it current was only ever documented, never added. The job now genuinely exists in `ci.yml`: it runs on every push to `main` (not PRs — no point regenerating for a commit that isn't live yet), regenerates the manifest against full history, and commits it straight back to `main` if anything changed, which Vercel's native GitHub integration then picks up like any other push. **If a calculator or blog page is revamped and merged, and its `/sitemap.xml` entry still shows the old date more than a few minutes later, check the `regenerate-lastmod-manifest` job's run history in GitHub Actions first** — this exact failure mode (a documented fix silently not wired up) is more likely than a new variant of the underlying git/Vercel bug.

**A separate, real mistake happened while chasing this bug and is worth remembering independently of the sitemap issue itself: `vercel --prod --force` deploys whatever is in the current local working directory, not the latest GitHub commit.** Running it from a local checkout that was 67 commits behind `origin/main` (kept intentionally behind to avoid disturbing unrelated uncommitted work in this same directory) deployed that stale code straight to production and 404'd several real pages (`bike-insurance-calculator` among them) for a few minutes before being caught and fixed by redeploying the correct commit via the Vercel API's redeploy-by-deployment-ID endpoint. **Never use `vercel --prod` (or `--force`) from a local directory unless it is confirmed to exactly match the commit that should go live.** To force a fresh, cache-bypassing rebuild of a specific already-known-good commit instead, redeploy by deployment ID via the API (`POST /v13/deployments` with `"deploymentId": "<id>"` and `"forceNew": 1`), which rebuilds from that deployment's actual git source rather than local disk.

**Sitemap auto-discovery is per-content-type, not generic.** `app/sitemap.ts` has four separate hand-written blocks that each scan one specific folder (`app/calculators/*`, `app/news/*`, `app/tax/*`, `app/gdp/*`) and turn its subdirectories into sitemap entries automatically. There is no generic "scan every top-level content folder" mechanism — a new content type (e.g. `app/gold/*` city pages) needs its own explicit scan block added before its pages will appear in the sitemap. Pushing new pages under a folder that doesn't have this block means the pages go live but stay invisible to Google via the sitemap until someone adds it.

**Runtime `fs.readdirSync()` in `sitemap.ts` silently 500s for every real crawler in production, while looking completely fine to every manual check.** Each auto-discovery block above calls `fs.readdirSync()` on a folder computed via `path.join(process.cwd(), ...)`. Vercel's serverless function bundler only packages files it can trace through actual static imports — a dynamically-computed `fs.readdirSync()` path isn't traceable that way, so `app/calculators`, `app/news`, `app/tax`, and `app/gdp` were silently missing from the deployed function at `/var/task/app/...`, and the very first read threw `ENOENT: no such file or directory, scandir '/var/task/app/calculators'`, killing the whole route with `FUNCTION_INVOCATION_FAILED`.

This was invisible for a long time because **Vercel bypasses its cache specifically for crawler user-agents** (so it never serves a bot stale content), which routes every browser check, every `curl`, and even a `curl` sent with an explicit Googlebot user-agent string, to the pre-built cached response — never touching the broken code path. Only requests Vercel itself classifies as a real crawler (confirmed via the function log's own `Cache: BYPASS, Reason: Crawler` line, with the actual `User-Agent: Mozilla/5.0 (compatible; Googlebot...` attached to the failed request) hit the fresh, broken execution. GSC's URL Inspection "Test Live URL" is the one tool that reproduces this, because it performs a real fetch as Googlebot rather than reading GSC's own crawl-history cache. A sitemap bug that only reproduces for actual search engine crawlers and for no other test method is the sign to check for exactly this: something Vercel's cache treats specially for bots.

**The fix has two parts, and only the first one is the actual fix — the second is a safety net, not a substitute for it.** `next.config.ts`'s `outputFileTracingIncludes` explicitly forces the four scanned directories into every deployed function's bundle, which is what actually makes `fs.readdirSync()` succeed at runtime again. Separately, `safeReadSlugs()` in `sitemap.ts` wraps every one of these reads in a try/catch that logs and returns `[]` on failure, so that if a *future* new auto-discovered directory is ever added to the scan list without also being added to `outputFileTracingIncludes`, the sitemap degrades to missing that one section's URLs instead of hard-crashing the entire route for every crawler again. **Whenever a new folder is added to the sitemap's auto-discovery scan list, it must also be added to `outputFileTracingIncludes` in `next.config.ts` in the same change** — the try/catch will hide the symptom (no more 500) but not the actual missing-URLs problem, so don't mistake "no error" for "the new pages are actually in the sitemap."

**Local `next build` cannot verify this fix.** The per-function file-trace manifests (`.nft.json`) that `outputFileTracingIncludes` actually influences are produced by Vercel's own build/deploy pipeline, not by a plain local `next build` (there's no `sitemap.xml.nft.json` in a local `.next/` output to inspect). The only real confirmation is post-deploy: rerun GSC's URL Inspection "Test Live URL" on `sitemap.xml`, or check Vercel's function logs for the absence of new `ENOENT` / `FUNCTION_INVOCATION_FAILED` entries on that route.

**Programmatic tax pages are generated by scripts, not hand-written, and have already had one silent gap.** `scripts/generate-tax-pages.ts` generates the base `/tax/income-tax-on-[N]-lakh-salary` pages; `scripts/generate-city-tax-pages.ts` generates the city-specific `/tax/income-tax-on-[N]-lakh-salary-in-[city]` variants from a hardcoded `SALARIES` array. That array once skipped straight from 11 to 13, silently omitting every 12-lakh city page (20 pages, all 404ing) while the base 12-lakh page existed fine. **Before trusting that a full salary × city matrix exists, verify it**: `for n in <salary list>; do echo "$n: $(find app/tax -maxdepth 1 -type d -iname "income-tax-on-${n}-lakh-salary-in-*" | wc -l)"; done` — every salary in the generator's list should show the same city count. To regenerate a missing salary level: fix the `SALARIES` array in `scripts/generate-city-tax-pages.ts`, then run `npx tsx scripts/generate-city-tax-pages.ts --salaries=N` (add `--dry-run` first to preview, `--cities=` to scope to specific cities). The script degrades gracefully if the Gemini/Groq API keys are rate-limited or unavailable — it falls back to deterministic, tax-accurate content rather than failing, so a quota error in the logs does not mean the generated pages are broken.

---

## Third-Party Data API Integrations (e.g. GSTIN Verification)

When a page needs live third-party data (GSTIN lookup, GST return status, etc.), the integration has a specific shape that must be followed every time, not just for GST:

1. **The API key is server-side only, never `NEXT_PUBLIC_*`.** Store it in `.env.local` (gitignored) and `.env.example` (blank placeholder, with a comment on where it's consumed). Add a Next.js Route Handler under `app/api/.../route.ts` that reads `process.env.KEY_NAME` and makes the upstream call; the browser only ever talks to Fermor's own `/api/...` route, never the third-party host directly. If a key ever appears in client-bundled code, that's a real security bug, not a style nit.
2. **Validate locally before spending a paid call.** For GSTIN specifically, run full format + check-digit validation (`src/utils/gstin.ts`, `decodeGSTIN()`) before the route ever calls the upstream API. A malformed or checksum-invalid GSTIN returns a 400 immediately, at zero cost. Never trust that a value "looks right" and send it upstream anyway.
3. **Verify any embedded algorithm against real examples before shipping it, not just the write-up you copied it from.** The GSTIN check-digit algorithm was verified against two real, government-issued GSTINs pulled directly from the API's own documentation before being trusted (see the `decodeGSTIN` checksum, confirmed against `29AACCG0527D1Z0` and `06AACCG0527D1Z8`). This is the same "recompute from scratch, don't inherit" discipline as the Volatile Market Data section above, applied to an algorithm instead of a number.
4. **Cache aggressively when the underlying data changes rarely.** GSTIN registration details don't change day to day, so the verify route sets `Cache-Control: s-maxage=604800, stale-while-revalidate=2592000` (7-day edge cache) to stretch a metered quota across real traffic, following the exact pattern already used in `app/api/commodities/[symbol]/route.ts`.
5. **Degrade gracefully when the quota runs out or the upstream fails.** A free/trial third-party API tier (the GSTIN provider in use has a 20-request trial, expiring in ~1 month) will eventually return errors. The UI must never show a raw error or a broken blank state. `GSTSearchWidget` falls back to the always-available, zero-cost client-side format decode with a clear "live lookup unavailable right now" message, rather than leaving the page looking broken once the quota is exhausted.
6. **Test the integration with a deliberately invalid input first**, since that path costs nothing, and only spend one real call at the end to confirm the full round trip works — don't repeatedly hit a metered API while iterating on UI styling.
7. **An in-memory cache does not actually enforce "once a day" on Vercel serverless functions, even though it looks like it should.** The currency-rate system (`fermor-backend/src/modules/currency/`) originally cached exchange rates in a plain in-process singleton with a 24-hour staleness check. That pattern is invisible-broken on Vercel: serverless functions can spin up multiple concurrent instances that don't share memory, and any instance can cold-start (wiping its cache) well before 24 hours pass. Real call frequency ends up closer to "once per cold start, per instance" than "once a day," which quietly threatens a metered quota even though the code reads correctly. The fix was to move the cache into Postgres (a `CurrencyRateCache` single-row table, `currency.cache.ts`), have the read path (`/currency`) only ever query that table, and have a **separate** route (`/currency/refresh`) — triggered once a day by a real Vercel Cron Job (`vercel.json` `"crons"`), authenticated via the `CRON_SECRET` env var Vercel auto-attaches as `Authorization: Bearer $CRON_SECRET` — be the only thing that ever calls the upstream provider and writes to that table. Verified by killing and restarting the whole server process and confirming it returned the identical persisted rate with zero new upstream calls. Any future "refresh once a day" requirement on a Vercel-deployed service should use this cron-writes/route-only-reads split, not an in-memory TTL cache.
8. **`CRON_SECRET`-style env vars marked "Sensitive" in Vercel cannot be viewed again once saved, by anyone, ever** — not a bug, a deliberate Vercel platform behavior. If a pre-existing sensitive var's value is genuinely unknown and confirmed unused by any code (check via `git log --all -p -S "VAR_NAME"` across the whole repo history, not just current files), it's safe to just overwrite it with a freshly generated value rather than trying to recover the old one. Also note: **saving a new value in the Vercel dashboard does not update an already-running deployment** — it only takes effect on the next build/deploy, so a manual env var change needs a fresh deploy (push a commit, or use the dashboard's "Redeploy" action) before it's actually live.
9. **When a provider can return its full dataset in one call, store all of it, not just the fields today's one consumer needs.** The exchange-rate provider originally filtered its response down to the 8 currencies the calculator dropdown uses. When the GDP page cluster later needed arbitrary countries' local currencies, most of them were missing — not because the provider didn't have the data (exchangeratesapi.io returns all ~172 currencies in the same single call regardless of any `symbols` filter), but because the filtering step had thrown the rest away before it ever reached the cache. Store the full response; let each consumer pick what it needs from the same cached table. This costs nothing extra since it's still one call.

**Never explore a competitor's private source code, even if it is sitting on the local filesystem, without first confirming why it's there and whether examining it is actually authorized.** A repo whose `git remote` points to a competitor's own GitHub org, or whose README says it "powers [Competitor]'s consumer-facing platform," is a strong signal to stop and ask before reading further, regardless of how the files got onto the machine. In this case the repos turned out to belong to Fermor's own parent company, which changed the analysis entirely, but that was confirmed by asking, not assumed. The right sequence is: identify what a directory actually is (repo name, `git remote -v`, README) before deciding whether to read its implementation, then explicitly surface what was found to the user rather than silently proceeding either direction.

**Verify tax/compliance facts against multiple current sources before publishing them, even when the correction itself comes from another AI.** A ChatGPT/Gemini-style "here's what's outdated in your draft" note is a lead, not a citation. On the GST number search page, one such note's IMS-naming correction (Invoice Management System, live since Oct 2024, manual Accept/Reject/Pending) checked out cleanly across independent sources and was applied directly. Its special-category-state threshold table did not: ClearTax's own page on the topic contradicted itself internally, and a second source grouped states differently again. Rather than ship an unverifiable table, the page was corrected only on the parts confirmed by multiple independent sources (the actual 11-state list, and that only Manipur/Mizoram/Nagaland/Tripura kept the lower ₹20L/₹10L threshold) and stayed conservative on the rest. Never let "an AI said so" substitute for checking, especially on a page readers use to judge ITC risk.

---

## Programmatic GDP Country Page Cluster (`app/gdp/`)

218 countries and territories, one shared template (`app/gdp/_template/CountryGDPPageTemplate.tsx`) plus one shared dataset (`app/blogs/world-gdp-ranking-2026/gdpData.ts`, `GDP_DATA_FULL`), literal per-country folders (`app/gdp/{slug}/page.tsx`) — the same template+dataset+literal-folders pattern as `app/tax/`, not a Next.js dynamic `[param]` route. 196 pages are built (195 generated + `united-states`, hand-written first as the reviewed sample before the rest were generated).

**Generation is scripted, not hand-written.** `scripts/generate-gdp-pages.py` merges the IMF DataMapper API's raw JSON exports (`NGDPD`, `NGDP_RPCH`, `NGDPDPC`, `PPPGDP`, `PPPPC`, `LP`, `countries.json` — fetched by a human via browser, since the IMF API itself returns HTTP 403 from Akamai bot protection when called from a sandboxed environment) against `GDP_DATA_FULL` for rank/region, computes neighbors and slugs, and writes one `page.tsx` per country. `scripts/generate-country-currency.py` builds the ISO3 → local-currency mapping (`app/gdp/_template/countryCurrency.ts`) the same way. Re-run either script (after fixing `NAME_OVERRIDES` for any new mismatch) rather than hand-editing individual generated pages when the underlying data changes.

**22 countries have no page, on purpose.** Cuba, North Korea, Monaco, Bermuda, Cayman Islands, Guam, French Polynesia, Greenland, Curaçao, and about a dozen more small territories have confirmed-empty IMF time series (checked directly against the source JSON, not assumed). Building a page for them would mean fabricating a GDP history, so they're left out of `app/gdp/` entirely and show as plain non-clickable text (not a broken link) on both hub tables. If asked to "fill the gap," the honest options are: leave them out (current state), or build a visibly different, shorter page type sourced to World Bank/UN with a single year and no trend chart — never silently interpolate an IMF-style series for a country IMF doesn't cover.

**Neighbor cross-links must be computed against the final "will this page actually exist" set, not just adjacent rank.** An early version linked every country to rank-1/rank+1 in `GDP_DATA_FULL`, which meant e.g. Tuvalu (rank 218) linked to Montserrat (rank 217) — one of the 22 with no page. The fix walks outward (rank±1, ±2, ...) until it finds a rank that's actually in the generated set, in each direction, rather than accepting or silently dropping an adjacent rank that doesn't resolve to a real page.

**Two separate hub pages both need to discover which country pages exist, and both must match by rank, not name string.** `/gdp` (`getBuiltSlugs()`, scans `app/gdp/` via `fs.readdirSync`) and `app/blogs/world-gdp-ranking-2026` (its top-30 static table and its full 218-country interactive table, `WorldGDPTableClient.tsx`) each link a country name to `/gdp/{slug}` only when that directory actually exists — otherwise it renders as plain text. The ranking page's own top-30 array uses a few different display strings than `GDP_DATA_FULL` for the same country ("UAE" vs "United Arab Emirates"), so that specific table matches by **rank number** (`slugByRank`, keyed off `GDP_DATA_FULL`), not by comparing country name strings, to avoid silently failing to link exactly the mismatched ones.

**Per-page currency conversion is two different components with different scope, not one component with a flag:**
- `INRConversionLine.tsx` — lakh-crore formatted, shown **only** on India's own page (`data.iso3 === 'IND'`).
- `LocalCurrencyConversionLine.tsx` — trillion/billion/million formatted in the country's own currency (via `countryCurrency.ts`), shown on every other page.

These used to both run on every page, alongside a "How {Country} Compares to India" section, on the reasoning that Fermor's audience is India-based regardless of which country's page they're reading. That was deliberately reversed: once every page could show its own local currency, having USD + local currency + INR + an India-comparison section on one page about, say, Japan, read as forced rather than genuinely relevant. The India-comparison section was removed from the shared template entirely; INR conversion now only appears where the country being described actually is India, where the lakh-crore format is also the objectively correct local-currency format for that page (so `LocalCurrencyConversionLine` is skipped there instead of showing a redundant second currency line in a different format). When adding audience-relevant content to a page cluster, check whether it's genuinely relevant to *that specific page's topic*, not just to the *presumed reader*, especially once a page-topic-relevant alternative (the local-currency line) already exists.

**A live, client-fetched sub-component on an otherwise-static page needs its own freshness label, separate from the page's `dateModified`.** Both currency components render a small "(rate as of {date})" span sourced from the shared rate cache's own `lastUpdated`, distinct from the page header's "Updated {date}" (which reflects the real IMF data revision date, not the daily currency refresh). Bumping the page-level date every day just because an embedded live rate refreshed would misrepresent how often the actual GDP content changes — the same "fake freshness signal" problem the sitemap `lastmod` section above warns about, just at the component level instead of the page level.

**Three SVG chart bugs worth checking for on any new hover-driven chart** (`app/gdp/_template/GDPCharts.tsx` is the reference implementation these were fixed on):
1. **An invisible hit-catcher `<rect>` drawn *underneath* the visible bar/point never receives the hover, because the visible element painted on top of it intercepts the mouse event first.** Draw the transparent catcher last (on top, still `fill="transparent"`), not first.
2. **A hover crosshair is not the same thing as a gridline, and drawing it as a full-height/full-width line creates an unwanted "boxed in" look on all four sides.** A crosshair should run only from the axis to the hovered point (an L-shape: vertical line down to the x-axis, horizontal line in from the y-axis), not to the far edges.
3. **A tooltip that always centers on the hover point (`translateX(-50%)`) overflows the container when the hover point is near an edge.** Clamp positioning based on the hover point's percentage across the chart width: left-align below ~15%, right-align above ~85%, center otherwise (see `tooltipStyle()` in `GDPCharts.tsx`).

---

## Gold Content (`/gold`, `/news/gold-rate-today-india`) — Removed 29 Aug 2026

**The standalone `/gold` price page and the `/news/gold-rate-today-india` article are gone, on purpose.** Both existed to showcase a "live 3x-daily gold rate" that was never confirmed actually working: the `/gold` page read from a Supabase `commodity_prices` table meant to be refreshed by a GitHub Actions workflow (`.github/workflows/fetch-commodities.yml` → `app/api/cron/fetch-metals/route.ts`), but a direct check found no live price payload at all, only static article prose with old, clearly stale worked-example figures (Rs 8,000-9,200/gram against a real cross-check putting gold closer to Rs 12,650-14,700/gram). Removed rather than fixed, since nobody was maintaining this as a real product surface. Both URLs now 301-redirect to `/calculators/gold-loan-calculator` (`next.config.ts`) so existing search traffic and backlinks don't just 404.

**The underlying live-rate pipeline itself was NOT removed** — `/api/commodities/[symbol]/route.ts` and the `commodity_prices` table still exist and still matter, because `gold-loan-calculator` genuinely depends on them for its live rate (`fetch('/api/commodities/GOLD')`, with a hardcoded fallback constant if that call fails). If this pipeline is ever debugged or rebuilt, remember it spans two separate secret stores: the GitHub Actions workflow reads `CRON_SECRET`/`PRODUCTION_URL` from **GitHub repo secrets**, while the Next.js route reads its own `process.env.CRON_SECRET` from **Vercel's** environment variables for `fermor-web` — a value existing in one store doesn't mean it exists in the other.

---

## Blog Article Builds: Lessons from Residential Status and GSTR-9 (added 12 Oct 2026)

Learned while building `residential-status-section-6-income-tax-act` and `gstr-9-annual-return` from pasted ClearTax briefs plus a Google Ads keyword export. They apply to every article built from a competitor brief.

**A pasted competitor brief is a lead, not a source.** The GSTR-9 brief gave a flat Rs 200 a day late fee capped at 0.25% (the slab-based fee from FY 2022-23 is Rs 50, Rs 100 or Rs 200 a day with caps of 0.04% or 0.50%), credited Notification 16/2025 with a GSTR-9 format change (it is a Finance Act commencement notification), and implied GSTR-9C needs a CA (it is self-certified). The residential status brief had a loose HUF rule and an FY 2023-24 illustration. Check every notification number by its title in a notification list before citing it, and cite only what you could confirm. Where a figure rests on one secondary source, say so in the PR description.

**Keyword exports contain noise.** Drop unrelated terms (section 133(6), 194C(6), software vendors, trusts, estate planning). Work the relevant ones into headings, tables and FAQs, and keep the metadata keyword list to terms the page really answers.

**Cannibalization check first.** `ls app/blogs | grep -i <topic>` and grep for the topic before writing. Link to `gst-rates`, `gst-number-search`, `tds-rate-chart` and similar siblings instead of repeating them.

**Categories.** Income Tax and TDS articles go in `CATEGORY_1_SLUGS`, GST, EPF and utility guides in `CATEGORY_3_SLUGS`.

**Table cells must not break at hyphens.** Cells and paragraphs that wrap as "GSTR-" then "9A", "FY 2019-" then "20", "Part" then "III" or "Rs" then "5 crore" read as wrong numbers. Article pages use the `nb()` helper and the `P` paragraph component (see the 80D-style template in `gstr-9-annual-return/page.tsx`): hyphenated tokens get `white-space: nowrap`, `Rs <amount>` is joined with a non-breaking space, table cells of 24 characters or fewer and headers of 16 characters or fewer never wrap, and a cell never ends on a one-word orphan. Copy that block into any new article. Screenshot every table before opening the PR.

**Verifying a page visually on Windows.** Headless Chrome at `--window-size=1440,9000` gives one tall PNG. Crop it into 1500px strips with `sharp` (already in `node_modules` via Next) and read the strips. Do this for every table, not only the ones that look risky.

**PR hygiene when the main folder has unrelated WIP.** Create a worktree off `origin/main` (`git worktree add ../fermor-web-<topic> -b <branch> origin/main`), copy only the new page folders in, and apply the three registration edits (`articles.ts`, `blogCategories.ts`, `sitemap-lastmod.json`) there. Staging those shared files from the main folder would drag in other unfinished articles and break `assertFullCoverage()`. `articles.ts` and `blogCategories.ts` can use CRLF in some checkouts, so detect the line ending before string-replacing.

**Tooling gotchas on this machine.** Python is not installed (use `node`). Backslashes inside a node template literal written through a shell heredoc get lost, which silently broke a regex; build such patterns with `String.fromCharCode(92)` or write the file with the Write tool. The shell defaults to `$TEMP` for scratch files.

## Shared Calculator UI, Tested Maths and Verification (added 12 Oct 2026)

Learned while revamping the step-up SIP, surcharge, stock average, dividend yield and DRIP calculators. These apply to every calculator task.

**Shared UI module.** `src/components/calculators/CalcUi.tsx` holds the pieces every calculator repeats: `Slider`, `PresetPills`, `SplitDonut`, `StackedBars`, `Legend`, `SplitBar`, `StatRow`, `ResultBox`, `CollapsibleSchedule`, `SidebarList`, `StickySidebar`, `CACTA`, `PromoBar`, `FAQAccordion` and `tableStyles`. New calculators import from it. The older pages still carry their own copies and move over when they are next revamped. Never paste a second local copy of anything this module exports (see rule 15).

**Maths lives in a pure module and gets tested.** Put the calculation in `<name>Math.ts` next to the page (examples: `surchargeMath.ts`, `stockMath.ts`, `dividendMath.ts`, `dripMath.ts`). Run it with `npx tsx` against the worked examples and against zero, negative, extreme and non-integer inputs before writing any prose. Check that every result is finite.

**Every number in an article comes from running that module.** Never copy a figure from the page being revamped. Wrong figures found this way on live pages: a surcharge example with the wrong base tax at every step, a "1% yield with 15% growth beats a 5% yield over 10 years" claim that is false until year 20, a bull and bear table that used simple instead of compound returns, and a step-up SIP corpus off by 20%.

**A "with X versus without X" comparison must count everything the user receives in both branches.** The old DRIP page compared reinvested shares with the shares alone and ignored the cash dividends, which inflated the advantage almost threefold.

**Verify external identifiers.** Look up every Wikidata ID with `wbgetentities` (and search with `wbsearchentities`) before using it. Two pages carried IDs that pointed at unrelated entities.

**Per-stock yields, prices and dividends per share are volatile market data.** Do not publish them in tables or FAQs. Describe payout policy qualitatively, compute yields from the user's own inputs, and point readers to the NSE or BSE corporate announcements. See the Volatile Market Data section.

**Tax facts to keep current.** TDS on dividends is 10% when dividends from one company exceed Rs 10,000 in a year (the limit was Rs 5,000 until 31 March 2025), and 20% without PAN. Equity gains on sales from 23 July 2024 are 20% short-term and 12.5% long-term above Rs 1.25 lakh. Treat secondary sources as leads and confirm on incometaxindia.gov.in.

**Layout details.**
- The two-panel grid must be `minmax(0, 1fr) minmax(0, 1fr)` (and `minmax(0, 1fr)` on mobile). Plain `1fr 1fr` lets number inputs widen the left column and push the results panel out of the card.
- Paginate inputs only when the input panel is taller than the results panel. If the inputs are shorter, add useful derived stats on the results side (rule 24). If everything fits level, show all inputs on one page.
- Fixed heights, motion verbs for abstract nouns ("sits", "stays", "stops at") and paragraphs above about 300 characters are review failures.

**Verification before a PR.**
1. `npx tsc --noEmit` plus `--noUnusedLocals --noUnusedParameters` on the files you touched.
2. Fetch the served page and assert: schema types, every `hasPart` selector exists as an id, the free box then the CA box sit before the article and a second CA box before the FAQ, every table has a caption and every `th` has `scope="col"`, list markers are set, the title has no doubled suffix, the description is 140 to 155 characters, and every internal link points to a real folder.
3. Screenshot the page: `chrome --headless=new --window-size=1440,1500 --virtual-time-budget=9000 --screenshot=out.png <url>`. Headless Chrome will not go below about 500px wide, so use 500 for the mobile check.
4. Write long node patch scripts to a file and run the file. Long shell heredocs with quotes and backticks fail silently.

## Chart Colours and Locale-Safe Numbers (added 14 Oct 2026)

**Calculator donuts, stacked bars, split bars and their legend chips draw from `src/theme/chartPalette.ts`, not from the page's `C.dark` / `C.lime2`.** `CHART_PALETTE` is the Fermor app's `chartPalette` copied verbatim from `fermor-app-main/src/theme/tokens.ts`. `CHART_PAIR` (deep forest #0C4A33, mid green #3FA882) is the two-series pair, and `seriesColor(i)` serves categories beyond two. The pair gives 3.5:1 between segments and 2.9:1 against white; the pale mint #58E0A5 was rejected for the pair because it is 1.7:1 on white. `scripts/branding/palette.test.ts` fails if a donut ring or bar goes back to `C.dark` / `C.lime2`.

**Never call `toLocaleString()` without a locale in a component that is server-rendered.** The server formats in en-US (`$4,153,191,000,000`) and an Indian visitor's browser formats in en-IN (`$41,53,19,10,00,000`), which is React hydration error #418. It was live on every `/gdp/*` page and the world GDP ranking table until pinned to `'en-US'`. Headless Chrome's `--lang` flag does not change the JS default locale; the OS region does, which is why the bug only showed on a machine set to India.

## Key Files

- `CALCULATOR_STANDARDS.md` — full quality standards with schema templates, content templates, prohibited patterns
- `src/utils/searchMatch.ts`: ranked, typo-tolerant `searchScore()` shared by the `/blogs` and `/calculators` search boxes. Change matching rules here, not in either page
- `app/calculators/CalculatorsClient.tsx`: all three render modes (all, one category, search) must render the first panel as the same `CategorySection` with `key="first"`. A different element or key there remounts the search input on the first keystroke, which shipped once as "typing stops after the first letter"
- `src/utils/gstin.ts` — GSTIN format + check-digit validation (verified checksum algorithm), shared by the GST search widget and the `/api/gst/verify` route
- `app/api/gst/verify/[gstin]/route.ts` — live GSTIN lookup via a metered third-party API (see "Third-Party Data API Integrations" above before touching this or adding a similar integration)
- `app/calculators/cagr-calculator/` — reference implementation; use this as the template for new calculators
- `app/calculators/cagr-calculator/page.tsx` — reference for all required schema types
- `app/calculators/cagr-calculator/CAGRCalculatorClient.tsx` — reference for UI, localStorage, ARIA, article structure
- `app/blogs/articles.ts` — **the ARTICLES array must be updated manually for every new article.** Add the new card at the top (newest first). Every article also needs a category assignment in `app/blogs/blogCategories.ts` (`CATEGORY_1_SLUGS`/`CATEGORY_2_SLUGS`/`CATEGORY_3_SLUGS`) — that file's `assertFullCoverage()` throws at build time if a slug is missing, duplicated, or unknown, so a skipped assignment fails loudly rather than silently leaving the article uncategorized. See "Blogs Page (formerly /news + /resources)" below for the full architecture.
- `app/blogs/page.tsx` — the Blogs listing page (Category 1, white hero/grid section); Category 2 (black) and Category 3 (white) render via `src/components/resources/NewsPressSection.tsx` and `WebinarsReportsSection.tsx`, both fed from `blogCategories.ts`.
- `app/blogs/annapurna-bhandar-2026/` and its `-bn`/`-hi`/`-ur`/`-ne` siblings, plus `components/AnnapurnaLanguageSwitcher.tsx` — reference implementation for multi-language article content (hreflang, workTranslation schema, RTL handling); see CALCULATOR_STANDARDS.md "Multi-Language Content Architecture" before building a translated page cluster
- `app/sitemap.ts` — priority/changefreq tiers and git-based lastmod; see "Sitemap and Programmatic Page Generation" above before editing
- `scripts/generate-city-tax-pages.ts` / `scripts/generate-tax-pages.ts` — programmatic tax page generators; see above for the salary-gap gotcha
- `scripts/generate-gdp-pages.py` / `scripts/generate-country-currency.py` — programmatic GDP country page generators; see "Programmatic GDP Country Page Cluster" above
- `app/gdp/_template/CountryGDPPageTemplate.tsx` — the shared GDP page template; edit this, not individual country `page.tsx` files, for any cross-cutting change
- `public/llms.txt`: add an entry for every new calculator, and rewrite the entry (not just leave it) whenever an existing calculator gets a substantial content revamp
- `app/robots.ts` — AI crawler allowlist; do not remove the AI bot entries
- `src/hooks/useCurrency.ts` — multi-currency hook, backed by `fermor-backend`'s `/currency` (see "Third-Party Data API Integrations" above for the Postgres-persisted-cache-plus-cron architecture)
- `src/components/common/CurrencySelector.tsx` — currency selector
- `src/components/common/CalculatorNav.tsx` — top nav for all calculator pages
- `fermor-backend/src/modules/currency/` — currency rate service (provider, Postgres cache, cron-gated refresh route); a separate repo/Vercel project from `fermor-web`, with its own independent environment variable scope

---

## Color System

**Individual pages (calculators, blogs, mutual funds, tax, GDP) are on the palette in `src/theme/pageTheme.ts`:** charcoal `#101214` text and primary buttons, neutral greys for surfaces and borders (`#F6F7F8`, `#F4F5F6`, `#E3E6E8`), and greens sampled from the portfolio reference (deep `#0B4A34`, mid `#2D9970`, text `#1F7A58`, light `#A6DBC4`, mint `#5EDDA2` for chart series only). The old lime, pale lime and green-tinted surfaces are gone from those pages; `scripts/branding/palette.test.ts` fails if they return. `LEGACY_TO_PAGE` in that file is the old-to-new mapping. The homepage, `/blogs` and `/calculators` keep their own colours, and the `C` block below is the legacy calculator palette those pages (and older copies of it) were written against.

Text selection is the browser default on individual pages; the green rule in `globals.css` is scoped to pages without the in-page nav. The favicon, `app/icon.png` and `app/apple-icon.png` are transparent and generated by `scripts/generate-brand-assets.ts`. The footer description lives in `FOOTER_DESCRIPTION` and the social profiles in `socialLinks.ts`, both under `src/components/common/`.

**Calculator palette.** The block below is the palette the calculators currently use. The brand tokens that migrated families use are in "Branding Standard" above; calculators move to them in their own release.

```ts
const C = {
  dark:     '#1A3530',  // primary dark green — result panel bg, active states
  lime:     '#C8F135',  // primary lime — result value on dark bg
  lime2:    '#95CC42',  // secondary lime — returns in charts
  paleLime: '#EDFBBC',  // hover background
  ink:      '#16140F',  // primary text
  ink2:     '#5A5A52',  // body copy
  ink3:     '#8A8F86',  // labels, tertiary text
  white:    '#ffffff',
  bg:       '#F4F8F5',  // page background
  border:   '#E2EBE0',  // all borders
};
```

---

## Content Voice

Write like a senior financial journalist. Confident. Specific. No padding. Real numbers, not vague ranges. When you cite data, name the source inline ("per NSE India data", "under AMFI guidelines") not as a footnote.

**Paragraph rules:**
- Maximum 3 sentences per paragraph. Break longer thoughts into separate paragraphs.
- No compound sentences chained with multiple clauses. One idea, one sentence.
- If a paragraph takes more than 5 seconds to read, it is too long.

**Prohibited phrases and patterns:**
- "see our X" / "read our X" / "check our X" — never self-refer like this. Link naturally inside a sentence. The link text itself is the reference.
- "Fermor's X Calculator" — just say "the X Calculator". It is already on Fermor.
- "It's worth noting", "In conclusion", "Taken together", "This is important because"
- "our analysis", "our breakdown", "our coverage" — remove "our". Link the thing directly.
- "To put this in context:" followed by a long clause — just state the context directly.
- Long parenthetical asides. Put them in a separate sentence or cut them.

**Linking rules:**
- Link the specific term, not a meta-description. Write: "The [Accenture Q3 FY26 analysis] breaks down..." not "see [our Accenture breakdown]."
- One inline link per paragraph is enough. Do not stack multiple links in the same sentence.

Full standards: `CALCULATOR_STANDARDS.md`
