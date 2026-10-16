# Fermor Page Standards

This document is for everyone who touches fermor.in — engineers, designers, writers, and every AI assistant used in VS Code, Cursor, or any other tool. Before anything goes to `main`, it should pass every check here.

The reason these standards exist: the calculators are Fermor's distribution layer. They are how a person first trusts Fermor enough to eventually connect their real financial accounts. A poorly written calculator page, or one that reads like it was churned out by an AI, costs that trust before the real product ever gets a chance to earn it.

The reference implementation for every standard here is the CAGR calculator:
`app/calculators/cagr-calculator/page.tsx` and `app/calculators/cagr-calculator/CAGRCalculatorClient.tsx`

---

## The Pre-Push Checklist

This is the gate. Everything must be yes before pushing to `main`.

**Build**
- `npm run build` passes with zero TypeScript errors
- No browser console errors on the page
- Lighthouse performance above 80 on mobile

**Content**
- `grep -n "—"` on the file returns zero results
- You can read the article out loud and it sounds like a real person wrote it
- Every H2 is answered directly in its first sentence
- All numbers are specific — not "around 10-15%" but "approximately 11.9%"
- SEBI, AMFI, or RBI is cited with an external link wherever a regulation is mentioned
- The disclaimer is at the bottom

**SEO**
- Meta title under 60 characters, primary keyword first
- Meta description 140-155 characters, contains primary and secondary keywords
- Canonical URL set
- Keywords array has 20+ entries covering primary, long-tail, NRI, Excel, comparison variants
- H1 contains exact primary keyword
- All required H2 sections present (see article structure section below)

**Schema**
- FAQPage — 10 questions minimum
- WebApplication — with featureList and dateModified set to today
- BreadcrumbList — three levels: Home, Calculators, page name
- HowTo — 4 steps minimum
- WebPage — with speakable, hasPart, audience, dateModified
- Organization — same on every page
- DefinedTerm — with sameAs pointing to Wikipedia and Wikidata

**Calculator**
- localStorage saves and restores user inputs (key: `fermor-[name]-v1`)
- Currency selector present and functional
- ARIA labels on every tab, slider, button, and result value
- `aria-live="polite"` on the primary result
- All sidebar calculator links open in a new tab
- All inline article links to other calculators open in a new tab
- Year presets present where duration is an input
- Year-by-year table present with mobile swipe indicator
- `<SiteFooter columns={...} />` is the last element on the page and `<PageNav />` is the first (no `Footer`, `CalculatorNav`, `SubFooter` or hand-pasted nav or footer); `npm run test:branding` passes
- No red anywhere — `grep -n "#D32F2F\|#FDECEA\|C\.error\|errorBg"` returns zero results
- Input and output panels use `gridTemplateColumns: '1fr 1fr'` — not asymmetric
- Output panel has a donut chart (principal vs interest, or equivalent split)
- Input pagination implemented if input panel is taller than output panel

**Distribution**
- Twitter card: `summary_large_image` (never `summary`). Required fields in metadata:
  ```ts
  twitter: { card: 'summary_large_image', title: '...', description: '...', images: ['https://fermor.in/og-[slug].png'] }
  ```
- OG image in `openGraph`: `images: [{ url: '...', width: 1200, height: 630 }]`
- llms.txt entry added (new calculator) or rewritten to reflect current content (revamped calculator) — a stale one-line entry left over from before a major revamp undersells the page to AI crawlers and defeats the purpose of having it
- sitemap.ts priority set correctly (target pages: 0.95)

---

## Current Design (required on every new and revamped calculator)

**Every calculator is on the current design. A new calculator, and any revamp of an existing one, is built on it from the first line, and it stays on it.** The older notes in this document that mention `CalculatorNav`, `Footer`, `SubFooter`, `fermor-mark-clean.png`, lime or pale-lime colours, or a CA box describe the previous design and are superseded by this section. Full detail and the reasons are in "New and Revamped Pages Must Use the Current Design" in `CLAUDE.md`.

- **Navbar:** `<PageNav />`. **Footer:** `<SiteFooter columns={DISCOVERY_COLUMNS} />`, or `pipeColumns([...])` for the calculator's own related links (Calculators column of 10 links or fewer). Footer links hover mint with a mint underline; that is built into `SiteFooter`, do not restyle it per page.
- **Logo:** `/fermor-mark-2026.svg` (mint `#75FB90`). Schema logo: `https://fermor.in/fermor-schema-logo.png`, 512 by 512.
- **Palette:** `src/theme/pageTheme.ts`. No lime, pale lime or green-tinted surfaces; the local `C` object takes its values from `PAGE_THEME`.
- **Charts:** donut rings, stacked bars, split bars and legend chips use `CHART_PAIR` and `seriesColor(i)` from `src/theme/chartPalette.ts` (the Fermor app's chart palette). Never `C.dark` and `C.lime2` for a chart.
- **No CA call-to-action box.** Do not add one above the article, before the FAQ, or anywhere else. The old "CA Portal CTA" requirement below is withdrawn.
- **Registry:** every new calculator is added to `rollout/branding-registry.json` (then `npx tsx scripts/branding/generate-counter.ts`) in the same change.
- **Merging `main`:** a calculator that arrives from `main` in the old design is migrated before you push. Run `npm run test:branding`; it fails on a missing `PageNav` or `SiteFooter`, a legacy nav, footer or logo, a legacy colour, a chart on the page colours, the CA box, or an unregistered page. A branch that forked earlier also brings old-design notes (`Footer minimal`, the CA box, `#F5F9F2`, `C.lime2`): rewrite them, drop the retired CA sentence from any disclaimer, and replace `/#` footer links with real routes.
- Any calculator task must still: keep input and output panels equal and responsive (rule 19), wrap article tables in a horizontal scroll container, keep the footer and nav usable at 320px and wider, and validate links by enumerating them against a local production build and reporting the count checked and the count broken.

---

## Content

### How It Should Sound

The target is a senior financial journalist who has spent ten years covering SEBI regulations and Indian markets, and who has also been edited hard enough to cut every word that isn't doing work. Confident. Specific. No hedging beyond what the facts actually warrant. Real Indian examples, real product names, real regulatory citations.

Here is the test: read a paragraph out loud. If it sounds like someone explaining something clearly to a knowledgeable friend, it's right. If it sounds like a response from a chatbot trying to be thorough, cut it down.

The data specificity rule matters more than people expect. "The Nifty 50 has returned approximately 11.9% CAGR on price return over the past 10 years" is citable. AI systems will quote it. Search engines can verify it. "Equity funds have historically given strong returns" is noise that nobody remembers.

### Paragraph Rules

**Keep paragraphs short.** Maximum 3 sentences, and treat that as a ceiling, not a target: two short sentences almost always reads better than three, even when all three are individually correct and non-repetitive. A 3-sentence paragraph built from long or compound sentences still looks like a wall of text at a glance, before anyone reads a word of it, and that visual impression alone reads as AI-generated to a scanning user. When in doubt, split a paragraph you're unsure about — the reader loses nothing by seeing one idea per line instead of three ideas stacked together.

**One idea per sentence.** Do not chain multiple clauses together. "X happened, which caused Y, which means Z for investors" should be three sentences.

**No long continuity.** Every paragraph should be able to stand alone. A reader who skips the previous paragraph should still understand the current one.

**When auditing paragraph length programmatically, check character length, not just sentence count.** A `grep`/script check for "more than 3 sentences" alone will pass paragraphs that are technically 2-3 sentences but built from long or compound sentences, and those still render as a 4-6 line wall of text at typical article column widths (roughly 90-100 characters per visual line at the standard 15-15.5px article font size). On `world-gdp-ranking-2026`, an automated sentence-count-only check reported zero violations while 11 paragraphs were visually 4-6 lines long, because most were 2-3 sentences of unusually long, data-dense prose. Estimate visual lines as `Math.ceil(charCount / 95)` and flag anything over 3 estimated lines in addition to the sentence-count check.

### The Worst Things You Can Write

**Em dashes.** Every em dash in visible content signals AI generation to readers. Run `grep -n "—"` before every commit and remove every result.

**Self-referential link phrases.** Never write "see our X", "read our analysis", "check our breakdown". Link the actual thing: write "the [Accenture Q3 analysis] covers this in detail" not "see [our Accenture coverage]". The "our" makes it sound like a chatbot promoting itself.

**"Fermor's X Calculator."** Just say "the X Calculator." It is already on Fermor. The branding is redundant.

**These filler phrases:**
- "It's worth noting that..."
- "In conclusion..."
- "Firstly, Secondly, Thirdly..."
- "Comprehensive guide to..."
- "This section explores..."
- "Taken together, these..."
- "To put this in context:" followed by a long clause — just state the context.
- "Dive deep into..."
- "Robust solution..."

**Bullet lists where every item follows the same sentence structure.** Real writing varies. Parallel structure in a table is fine. Parallel structure across five bullet points each starting with the same word reads like a machine made it.

**Vague claims.** "CAGR is an important concept for investors" tells nobody anything. "SEBI mandates that all mutual funds report returns as CAGR for periods exceeding one year" tells readers something they can use and cite.

**Decorative boxes in article prose.** Data tables are fine. Formula code blocks are fine. One definition block with a left border per page is fine. Coloured callout blocks floating in the middle of article text make pages look like content farms.

**Spatial/physical metaphors applied to abstract things.** A subtler AI tell than the filler phrases above: giving a non-agentive noun (a tax rate, a policy, a rule) a verb that implies motion, location, or intent, in an attempt to sound more "natural." It reads as the opposite. Caught live on `gst-rates` and `tds-rate-chart`:
- "GST in India **runs on** four slabs" → "India **has** four GST rates"
- "Gold and jewellery **sit outside this structure**" → "Gold and jewellery **are taxed separately**"
- "most goods... **fall here**" → "...are taxed at 18% unless a lower or higher slab applies"
- "the rate... **stayed there**" → "...the rate did not move"
- "sin goods **funnelled into** the new slab" → "sin goods **are now taxed at** the new rate"
- "relief **specifically scoped to**" → "relief **applies only to**" (product-manager jargon, not how a tax journalist writes)
- "**a handful of** items", "**a growing list of** essentials" → vague LLM quantifiers; use a real count or drop the qualifier
- "**This guide covers** X, Y, Z" → listicle-intro tic; "Below: X, Y, Z" reads more human

Before shipping a page, reread every prose paragraph (not tables) out loud and flag any sentence where the subject "moves," "sits," "stays," or is "scoped." State what the thing IS or DOES in the driest accurate phrasing. Treat this as its own review pass, separate from the paragraph-length and em-dash checks.

### India-First

Everything defaults to the Indian context:
- Amounts in Rs / lakh / crore (the currency selector handles conversions for NRI users)
- Products: SIP, PPF, EPF, ELSS, NPS — not 401(k), IRA, ISA
- Regulations: SEBI, AMFI, RBI, IRDAI, EPFO — not SEC, FINRA
- Examples: Infosys, Reliance, Nifty 50, HDFC Bank — not Apple, S&P 500, Vanguard

---

## Metadata

### Title Formula

```
[Primary Keyword]: [Short Descriptive Subtitle]
```

Under 60 characters (counting the string you actually write, before Next.js appends anything). Primary keyword first, always.

**Do not append the brand to `metadata.title` yourself.** `app/layout.tsx` sets `title: { default: ..., template: '%s - Fermor' }`, so Next.js appends " - Fermor" to every page's title automatically (the sitewide format is `Page Name - Fermor`, see CLAUDE.md "A2. Titles and social metadata"). If the page's own `title` string already ends in the brand, the rendered `<title>` tag doubles up to "...- Fermor - Fermor" — this was found live on several existing calculator pages (including this one before the July 2026 revamp) and silently hurts Google SERP click-through, since a doubled suffix reads as broken. `openGraph.title` and `twitter.title` are separate fields not covered by the template, so write " - Fermor" into them yourself when they repeat the page title. Use a hyphen, never an em dash, an en dash or a pipe. When editing an existing page, always verify the rendered `<title>` (via page source or a quick dev-server curl) rather than assuming the `metadata.title` string is what ships.

### Description Formula

```
Free [primary keyword] for India. [Feature 1], [Feature 2]. [Feature 3]. Free to use.
```

140-155 characters. Must contain the primary keyword and at least one secondary keyword.

**Do not claim "No sign-up" or "No ads" as blanket statements anywhere on the site — both are false.** Fermor has a real, visible sign-up flow (`SaveResultsCard`, "Sign up free") on every calculator page, and the site runs ads (the "Advertisement 300x250" placeholder in every calculator sidebar). "No sign-up required to use the calculator" is true and fine to say once, precisely, if it's genuinely relevant. A flat "No sign-up" or "No ads" bullet next to a sign-up form and an ad slot is a direct, visible contradiction and reads as careless. Use "Free to use" in meta descriptions instead of "No sign-up." In the "What is Fermor?" FAQ answer, footer taglines, and anywhere the product is described in prose, say what's actually true: every calculator is free to use, a free account is available to save results, and the site is ad-supported. Do not hide or downplay either feature — they're real parts of the product, not something to pretend doesn't exist.

### Keywords Array Structure

Start with the exact-match primary keyword, then expand outward: formula variants → tool type variants → geographic variants (India, NRI) → Excel variants → comparison variants (vs XIRR, vs absolute return) → long-tail question variants (5-year CAGR, 10-year CAGR). Minimum 20 entries.

---

## Schema

Every calculator page needs all seven of these schemas in `page.tsx`. Copy from the CAGR calculator as the starting point and adapt for the new page.

### FAQPage

10 questions minimum. Target real People Also Ask results for the primary keyword — search the keyword in an incognito window and write questions that match what appears under PAA. Each answer must be self-contained, because Google may display it without surrounding context.

```ts
{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Question exactly as it appears in PAA',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Self-contained answer. Plain prose. Specific numbers. No markdown, no HTML.',
      },
    },
  ],
}
```

Always include a "What is Fermor?" question with an answer that describes the action platform vision, not just "free calculators." This is how brand queries get answered by AI systems.

### WebApplication

```ts
{
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '[Calculator Name] by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/[slug]',
  featureList: [
    'Mode 1 name',
    'Mode 2 name',
    'Year-by-Year Growth Table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: 'YYYY-MM-DD',
  dateModified: 'YYYY-MM-DD',   // update this every time the page changes
}
```

### BreadcrumbList

```ts
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: '[Name]',      item: 'https://fermor.in/calculators/[slug]' },
  ],
}
```

### HowTo

```ts
{
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate [Term]',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor [Calc Name]' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: '...', text: '...' },
    { '@type': 'HowToStep', position: 2, name: '...', text: '...' },
    { '@type': 'HowToStep', position: 3, name: '...', text: '...' },
    { '@type': 'HowToStep', position: 4, name: '...', text: '...' },
  ],
}
```

### Organization (use this exact block on every page)

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India — the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Compound Annual Growth Rate',
    'Mutual Fund Returns',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    /* add 3-5 terms specific to the calculator page */
  ],
}
```

### WebPage

```ts
{
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '...',
  url: 'https://fermor.in/calculators/[slug]',
  datePublished: 'YYYY-MM-DD',
  dateModified: 'YYYY-MM-DD',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: '[Primary Term]', alternateName: '[Full Name]' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    // one entry per H2 section, with cssSelector matching the id attribute on the h2
    { '@type': 'WebPageElement', cssSelector: '#[section-id]', name: '[Section Name]' },
  ],
}
```

### DefinedTerm

```ts
{
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: '[Abbreviation]',
  alternateName: '[Full Name]',
  description: 'One clear sentence. No em dashes.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/[Wikipedia_slug]',
    'https://www.wikidata.org/wiki/[QID]',
  ],
}
```

---

## Calculator UI

### Page Header

Every calculator page uses a `<header>` element wrapping H1 + subtitle. No visible breadcrumb in the UI (breadcrumb exists only in the JSON-LD schema in page.tsx).

```tsx
<header style={{ marginBottom: 28 }}>
  <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
    [Calculator Name]
  </h1>
  <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
    [One-sentence description]
  </p>
</header>
```

`maxWidth: mobile ? '100%' : 800` on the subtitle paragraph is required. Without it the text spans the full 1280px page width on desktop. Do not omit this.

### Structure

```
page.tsx (server) — metadata, all JSON-LD schemas, region detection
[Name]Client.tsx (client) — all interactive UI
```

### Shared Components (required on every calculator page)

```tsx
import { useCurrency }     from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { PageNav }          from '../../../src/components/common/PageNav';
import { SiteFooter }       from '../../../src/components/common/SiteFooter';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
```

**CRITICAL:** Never redefine a shared component locally in the calculator file. If `SaveResultsCard` (or any component) is imported from `src/components/common/`, it must not also be defined as a local function in the same file. Duplicate declarations cause a Turbopack build error (`TS2440: Import declaration conflicts with local declaration`). The shared component from `src/components/common/` is the canonical version — use it directly.

**`useCurrency` — `selectedCurrency` is an object, not a string.** The hook returns `{ formatCurrency, convertCurrency, selectedCurrency }` where `selectedCurrency` is a `CurrencyInfo` object `{ code: string, symbol: string, name: string }`. Never use `selectedCurrency` directly in JSX (it renders as `[object Object]` and throws "Objects are not valid as a React child"). Always extract the property you need:
```tsx
// CORRECT
{selectedCurrency.code}    // e.g. "INR"
{selectedCurrency.symbol}  // e.g. "₹"
{selectedCurrency.name}    // e.g. "Indian Rupee"
// In a caption with fallback:
{selectedCurrency?.code || 'INR'}

// WRONG — runtime crash
{selectedCurrency}         // throws "Objects are not valid as a React child"
{selectedCurrency || 'INR'} // same crash — || doesn't help on an object
```

### Color System

Do not deviate from these values:

```ts
const C = {
  dark:     '#1A3530',
  lime:     '#C8F135',
  lime2:    '#95CC42',
  paleLime: '#EDFBBC',
  ink:      '#16140F',
  ink2:     '#5A5A52',
  ink3:     '#8A8F86',
  white:    '#ffffff',
  bg:       '#F4F8F5',
  border:   '#E2EBE0',
};
```

### Inputs

- Current value shown as a clickable button — click to enter exact number
- No lime or dark colors anywhere in the input panel section — this includes sliders, value buttons, informational display elements (derived values, loan amount summaries, calculated breakdowns), and any other element within the input panel. **Banned colors in input panels:** `C.lime`, `C.lime2`, `C.paleLime`, `C.dark`.
  - Input value buttons: white background (`C.white`), `1px solid ${C.border}`
  - Informational display boxes (e.g. "Loan Amount = price - down payment"): use `background: '#F5F9F2', border: '1px solid ${C.border}'`, text color `C.ink`
  - **Never use** `C.paleLime` or `C.lime2` as background/border on ANY element inside the input panel
- When editing, the text input also uses white background with `1.5px solid ${C.dark}` border (not lime)
- Hover state: `onMouseOver` sets borderColor to `#AAAAAA`, `onMouseOut` restores `C.border`
- Dark fill left of thumb; border-colored fill right
- Min/max labels below track

**Full Slider ARIA (copy this pattern exactly):**
```tsx
function Slider({ label, id, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  // ...
  return (
    <div>
      <div>
        {label
          ? <label htmlFor={editing ? inputId : rangeId}>{label}</label>
          : <span />
        }
        {editing
          ? <input id={inputId} aria-label={`Enter ${label} value`}
              style={{ background: C.white, border: `1.5px solid ${C.dark}` }} />
          : <button aria-label={`${label}: ${display}. Click to edit.`}
              style={{ background: C.white, border: `1px solid ${C.border}` }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#AAAAAA'}
              onMouseOut={e => e.currentTarget.style.borderColor = C.border} />
        }
      </div>
      <input id={rangeId} type="range"
        aria-label={label}
        aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} />
    </div>
  );
}
```

### Tabs

**Tabs always go INSIDE the white calculator card, never above it.** The white card contains: tabs at top (underline style) → tab panels below. This matches the CAGR reference implementation.

```tsx
// ONE outer white card wrapping everything
<div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(26,53,48,0.06)', marginBottom: 40 }}>

  {/* Tabs at the top of the card — CAGR underline style */}
  <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#FAFDF8' }}>
    {tabs.map(t => (
      <button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
        onClick={() => setActiveTab(t.id)}
        style={{
          flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
          fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === t.id ? 700 : 400,
          color: activeTab === t.id ? C.dark : C.ink3,
          borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
          transition: 'all 0.15s', fontFamily: INTER,
        }}>
        {t.label}
      </button>
    ))}
  </div>

  {/* Tab panels — no individual card styling, the outer card provides the frame */}
  {activeTab === 'emi' && (
    <div id="panel-emi" role="tabpanel" aria-labelledby="tab-emi">
      {/* tab content */}
    </div>
  )}
</div>
```

Do NOT put a pill-style tab strip above the card. Do NOT give each tab panel its own `background: C.white, border, borderRadius, boxShadow`. The outer card is the single frame.

### Result Panel

Primary result on `C.dark` background with `C.lime` text. This is always the most visually prominent element on the page.

`aria-live="polite"` and `aria-label` on the primary result span so screen readers announce updates:
```tsx
<span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`}>{fmtIN(emi)}</span>
```

**Donut chart is always at the top of the result panel on desktop.** Achieve this with CSS `order` — put the donut element AFTER the stat rows in source, then set `order: mobile ? 1 : -1` on the donut and `order: mobile ? 2 : -1` on the legend. This way on desktop (order:-1) both render before the stat rows (order:0); on mobile they drop below the stats.

```tsx
// Source order: dark box → stat rows → donut → legend
// Visual order on desktop: donut → legend → dark box → stat rows
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {/* dark result box — order 0 */}
  <div style={{ width: '100%', background: C.dark, ...  }}>...</div>
  {/* stat rows — order 0 */}
  {rows.map(row => <div key={row.label}>...</div>)}
  {/* donut — order -1 on desktop, 1 on mobile */}
  <div style={{ order: mobile ? 1 : -1 }}>
    <DonutChart ... />
  </div>
  {/* legend — order -1 on desktop, 2 on mobile */}
  <div style={{ order: mobile ? 2 : -1 }}>
    {/* legend items */}
  </div>
</div>
```

Donut chart SVG must have `role="img"` and `aria-label`:
```tsx
<svg role="img" aria-label={`Corpus split: ${lumpSumPct}% lump sum, ${100 - lumpSumPct}% annuity`}>
```

Decorative SVG icons (chevrons, arrows) must have `aria-hidden="true"`.

### Dark Result Box: Multi-Metric Alignment

When the dark box shows two labels on the left and two values on the right, use `alignItems: 'stretch'` on the outer box and `flexDirection: 'column', justifyContent: 'space-between'` on each column. This makes "Total Corpus" align with the corpus value and "Monthly pension" align with the pension value.

```tsx
<div style={{ background: C.dark, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', ... }}>
  {/* Left: labels stacked top to bottom */}
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.72)' }}>Primary label</div>
    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Secondary label</div>
  </div>
  {/* Right: values aligned to matching label rows */}
  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
    <div style={{ fontSize: 26, fontWeight: 800, color: C.lime, lineHeight: 1 }}>{primaryValue}</div>
    <div style={{ fontSize: 15, fontWeight: 700, color: C.lime, lineHeight: 1 }}>{secondaryValue}</div>
  </div>
</div>
```

Do NOT use `alignItems: 'center'` when there are two label-value pairs. `center` vertically centers the left block against the right block — the labels and values won't line up row-by-row.

### Input Section Color Rules (No Fill Colors)

**The input panel must feel colorless.** All color lives in the output/result panel only. The input section is white and neutral — this keeps the overall page feeling professional rather than cluttered with greens everywhere.

**Toggle buttons (yr/mo, regime, employment type):**
Container: `border: 1px solid ${C.border}, borderRadius: 8, overflow: 'hidden', display: flex`.
Active: `background: C.white, color: C.ink, fontWeight: 600, border: none`. Inactive: `background: transparent, color: C.ink3, fontWeight: 400, border: none`.

```tsx
<div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
  {(['yr', 'mo'] as const).map(m => (
    <button key={m} onClick={() => setTenureMode(m)}
      style={{ padding: '6px 14px', border: 'none', background: tenureMode === m ? C.white : 'transparent',
        color: tenureMode === m ? C.ink : C.ink3, fontWeight: tenureMode === m ? 600 : 400,
        cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
      {m === 'yr' ? 'Years' : 'Months'}
    </button>
  ))}
</div>
```

**Preset pill buttons (year presets, CIBIL score presets):**
Active: `background: C.white, border: 1.5px solid C.ink, color: C.ink, fontWeight: 700`.
Inactive: `background: transparent, border: 1px solid C.border, color: C.ink3, fontWeight: 500`.

```tsx
{[5, 10, 15, 20, 30].map(y => (
  <button key={y} onClick={() => setTenureYr(y)}
    style={{ padding: '4px 10px', fontSize: 12, background: C.white,
      color: tenureYr === y ? C.ink : C.ink3,
      border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`,
      fontWeight: tenureYr === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
      fontFamily: INTER, transition: 'all 0.15s' }}>
    {y}Y
  </button>
))}
```

**Never use:** `C.paleLime`, `C.lime2`, `C.lime`, `C.dark`, or `#F0F4EE` as input panel fills. These are output-only colors.

### Amortization Bar Chart (Stacked SVG)

**Every calculator with an amortization schedule must include a stacked bar chart.** The chart shows year-by-year principal (C.dark) and interest (C.lime2) as a stacked bar. It sits inside the collapsible "Amortization Schedule" toggle, above the data table.

Reference implementation: `app/calculators/mortgage-calculator/MortgageCalculatorClient.tsx` — the `BarChart` component and the toggle section starting at "Amortization Schedule". This bar chart is a strong visual differentiator vs HDFC, Groww, and Bankrate's India calculators.

Structure: bar chart → legend (Principal / Interest) → data table.

### Error / Warning States (No Red)

**Never use red in any calculator UI.** The C palette has no red. Error states use neutral ink colors only.

**Error state pattern** (when user input makes result impossible — e.g. EMI exceeds FOIR capacity):
```tsx
<div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
  <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>Error Title</div>
  <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
    Explanation of what caused the error and what the user can do to fix it.
  </div>
</div>
```

**Amber warning strip** (for advisory notices — low CIBIL, regime comparison, etc. — NOT errors):
```tsx
<div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '8px 14px' }}>
  <span style={{ fontSize: 12.5, color: '#A15C00', fontWeight: 600 }}>Advisory message here.</span>
</div>
```

**Semantic data colors in tables only** (amortization, financial breakdowns):
- Interest values: `color: '#B45309'` (amber — a cost)
- Principal / positive values: `color: '#166534'` (green — a gain)

These data colors are only for table cell values, never for backgrounds, borders, or UI chrome.

### Input Section Pagination

**Goal: the bottom edge of the input panel and the bottom edge of the output panel must be level.** If the input panel is taller than the output panel (leaving empty space below the output), split the inputs across two pages.

Move less-critical inputs to an "Advanced" page until the basic input panel height roughly matches the output panel height. The exact fields to paginate depend on the calculator — use judgement to find the break point that equalises the two panels.

Basic page: core sliders + "More settings" button (bottom-right). Advanced page: remaining sliders + "Back" button (bottom-left). Button label is "Back", not "Basic".

```tsx
const [showAdvanced, setShowAdvanced] = useState(false);

// In the input panel:
{!showAdvanced ? (
  <>
    {/* 4-5 core sliders */}
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button onClick={() => setShowAdvanced(true)} style={{ ... }}>
        More settings
        <svg>→</svg>
      </button>
    </div>
  </>
) : (
  <>
    {/* remaining sliders */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button onClick={() => setShowAdvanced(false)} style={{ ... }}>
        <svg>←</svg>
        Basic
      </button>
    </div>
  </>
)}
```

### CA Portal CTA: withdrawn

The "Are you a CA or financial advisor?" box was removed from every page on 14 Oct 2026. Calculators no longer carry it, in either position. Do not add it back or write a variation. The correct JSX order is now: tab panels → `<WaitlistCard mobile={mobile} />` → `<article>`.

### WaitlistCard

**Position:** WaitlistCard must be placed AFTER the calculator widget (all tab panels) and BEFORE the `<article>` element. Do not place it inside `<article>`. The correct JSX order is: tab panels → `<WaitlistCard mobile={mobile} />` → `<article>` (no CA CTA; it was withdrawn).

Every calculator page must include a WaitlistCard component. The card:
- Checks `localStorage.getItem('fermor-waitlist-joined')` on mount — hides if already joined
- Collects email and POSTs to `/api/waitlist` with `{ email, source: '[calc-slug]' }`
- On success: sets `localStorage.setItem('fermor-waitlist-joined', '1')` and shows confirmation
- Uses `aria-label` on the email input

**Exact copy — title, subtitle, and button text must match CAGR exactly:**
```tsx
<p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>Save your results</p>
<p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>
  Sign up to save this calculation and access your results any time.
</p>
// ... button text:
{status === 'loading' ? 'Saving...' : 'Sign up free'}
```

Do NOT use "Get your complete financial picture", "Join waitlist", "Joining...", or any other variation. The CAGR version is canonical.

### Article Content Tables

Every `<table>` in the article (content) section must have `fontSize: 13` on the `<table>` element so cells don't inherit the body 15-16px font size.

Table headers (`<th>`) in article content tables use bold, dark styling:
```tsx
const thS = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,  // 700 weight, C.ink color (not C.ink3)
  background: '#F5F9F2', textAlign: 'left' as const, textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const
};

// Data cell styles — use full border (not borderBottom) so tables render as a proper grid
const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
```

Do NOT use `fontWeight: 600, color: C.ink3` on article table headers. The `C.ink3` color makes headers too faint.

Every article `<table>` must have a `<caption>` element (with `captionSide: 'bottom'`) and every `<th>` must have `scope="col"`.

### Article Table Column Alignment

Header and data cell alignment must match in every column. A left-aligned header above a right-aligned cell is the most common table misalignment bug.

- **Text/label columns** (row labels, descriptive strings): use `thS` default (`textAlign: 'left'`) on the header, no `textAlign` override on the cell.
- **Numeric/value columns** (currency amounts, percentages, comparable figures): add `textAlign: 'right'` to BOTH the `<th>` and the `<td>`.

To right-align a column header, spread `thS` with an override — do NOT modify the `thS` constant itself:
```tsx
<th style={{ ...thS, textAlign: 'right' as const }} scope="col">Amount</th>
```

Note: `tdR` (the `C.ink, fontWeight: 500` style) does NOT set `textAlign: 'right'` — it signals visual emphasis only. Never rely on `tdR` to create right-alignment; always set it explicitly when needed.

**One shared style system for every table on the page, not just the article ones.** This rule was written for article-content tables, but it applies just as much to any live/dynamic table above the article (a bank-rate comparison, an amortization schedule tied to the calculator's own state). A page that mixes the shared `thS`/`tdL`/`tdR` constants for article tables with hand-rolled inline styles for a "widget" table above the article ends up with mismatched padding, font sizes, letter-spacing, and border treatment between tables that sit one screen-scroll apart — which reads as sloppy even when each individual table's own header/data pairing is internally correct. Define one `thS`/`tdL`/`tdR` (plus a `tdC` centered variant if a column needs center alignment, e.g. a short categorical value like a bank type) near the top of the client file and reuse them for every `<table>` on the page, calculator-widget tables included. Set `textAlign` and `verticalAlign` explicitly on all four constants rather than relying on browser defaults (`th` defaults to centered/middle, `td` defaults to left — mixing explicit and implicit alignment across cells is how columns quietly drift out of sync as a page gets edited over time).

**These `thS`/`tdL`/`tdR`/`tdC` constants are defined locally per calculator file, not imported from a shared module.** Fixing the vertical-align mismatch on one calculator's copy does not fix it anywhere else. As of this writing the fix (explicit `verticalAlign: 'middle'` on all four, explicit `textAlign` on `tdL`/`tdR`) has only been applied to `home-loan-eligibility-calculator` and `gold-loan-calculator`. Every other existing calculator likely still has the older `tdL`/`tdR` with `verticalAlign: 'top'` and no explicit `textAlign`, which is the exact mismatch a user caught by eye on a live page. When touching any calculator's tables for any reason, check its local `thS`/`tdL`/`tdR` block against this standard and fix it while you're in there, rather than assuming a fix made elsewhere already covers it.

### localStorage Pattern

```ts
// On mount
useEffect(() => {
  try {
    const s = localStorage.getItem('fermor-[name]-v1');
    if (!s) return;
    const d = JSON.parse(s);
    // restore each state value from d
  } catch { /* fail silently */ }
}, []);

// On every state change
useEffect(() => {
  try {
    localStorage.setItem('fermor-[name]-v1', JSON.stringify({ /* all state */ }));
  } catch { /* ignore */ }
}, [ /* all state deps */ ]);
```

### Collapsible Sections (Prepayment, Amortization, Year-by-Year)

All collapsible sections (toggle button + hidden panel) need:
```tsx
<button aria-expanded={showPanel} aria-controls="panel-id">Section Title</button>
{showPanel && <div id="panel-id"> ... </div>}
```

### Year-by-Year Table

- Collapsed by default, expands on click
- `aria-expanded` and `aria-controls` on the toggle button
- Mobile: animated swipe indicator — `@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`
- `overflowX: auto` with `WebkitOverflowScrolling: touch`
- `scope="col"` on all table headers — applies to EVERY data table on the page, not just this one
- `<caption>` element on every table describing the data it contains

---

## Collapsible Strip and Percentage Bar (VPF Reference)

Reference: `vpf-calculator/VPFCalculatorClient.tsx`.

- **Strip:** a full-width `<button aria-expanded aria-controls>` at the bottom of the white card, `borderTop: 1px solid C.border`, padding `18px 44px` (`14px 20px` on mobile). Left: bold title plus grey subtitle (desktop only). Right: a `#F4F5F6` pill and a rotating chevron. Collapsed by default.
- **Expanded content:** a full-width table, header band `#F4F5F6`, uppercase 11px headers with `fontWeight: 700, color: C.ink`, zebra rows `#FAFAFA`, a `<caption>`, `scope="col"` on every `th`, wrapped in `overflowX: auto`.
- **Percentage bar:** last item in the result panel. Two 11.5px labels above a 5px bar, the first share in `CHART_PAIR.primary` and the rest in `CHART_PAIR.secondary` (never `C.dark` and `C.lime2`; see "Current Design"), with `role="img"` and an `aria-label`.
- **Paragraph limit:** 3 rendered lines at desktop width, about 280 characters. Verify with a browser measurement, not by counting sentences.
- **FAQ sync:** the visible FAQ array and the FAQPage schema list must match question for question, with "What is Fermor?" last.

## Article Structure

Every calculator page needs these H2 sections. Every H2 needs an `id` attribute (kebab-case, e.g. `id="sbi-emi-formula"`) that matches the `cssSelector` in the `hasPart` array of the WebPage schema.

The `<article>` element must have `itemScope itemType="https://schema.org/Article"`:
```tsx
<article itemScope itemType="https://schema.org/Article">
  { /* all article sections */ }
</article>
```

1. **What Is [Term]?** — definition block (left green border) + 2 paragraphs. SEBI/AMFI citation where applicable.
2. **[Term] Formula: How to Calculate [Full Name]** — code block + variables table + worked example with real numbers
3. **[Term] Formula in Excel: Three Methods** — table with direct formula, POWER function, RRI function
4. **Reverse [Term] Calculator: [subtitle]** — what question it answers, the reverse formula, Rule of 72 table if applicable
5. **Monthly [Term] Formula and Calculation** — formula, table of common values
6. **Lumpsum [Term] Calculator: What It Measures** — distinguish from SIP, link to XIRR Calculator
7. **[Term] vs [Related Term]: What Is the Difference?** — table showing same scenario with different results
8. **What Is a Good [Term] for Indian Investments?** — benchmark table (at minimum 8 rows), note citing data source
9. **[Term] for Mutual Funds in India** — SEBI reporting requirement, trailing vs rolling returns
10. **[Term] Calculator for Stocks** — example with named company, price vs total return distinction
11. **Limitations of [Term]** — 4 limitations formatted as bold title + paragraph
12. **How to Use This [Term] Calculator** — visible numbered `<ol>` list (one per mode), mirrors HowTo schema
13. **Frequently Asked Questions** — accordion, 10+ questions, first one open by default
14. **Disclaimer** — required at the bottom

### Definition Block Template

```tsx
<div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
    [Term] ([Abbreviation]) is [one clear sentence]. It is expressed as [unit].
  </p>
</div>
```

### How-to Steps Template (visible numbered list — mirrors HowTo schema)

```tsx
<ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
    <strong style={{ color: C.ink }}>Mode Name:</strong> one sentence describing input and output.
  </li>
</ol>
```

**`listStyleType: 'decimal'` is required on every `<ol>`.** `app/globals.css` loads `@tailwind base`, whose Preflight reset sets `list-style: none` on all `ol`/`ul` globally. Without an explicit `listStyleType` override, the numbers silently disappear (the list still renders, just with no visible `1. 2. 3.` markers), which is easy to miss in a quick visual check since the text and spacing look fine. Any `<ul>` used for a bulleted (non-numbered) list needs the same treatment with `listStyleType: 'disc'`.

**`<strong>Label:</strong> description` — always a colon after the label, never an em dash. This applies everywhere in article list items. No exceptions.**

### FAQ Must Be a Single Source of Truth

Define one `faqItems` array (`{ q, a }[]`) per page and derive both the visible accordion and the `FAQPage` JSON-LD from it:

```tsx
const faqItems = [
  { q: '...', a: '...' },
  // ...
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
```

Never hand-write a second, separately-maintained FAQ list for the accordion. Two pages in this codebase (`epfo-login-uan-passbook` and `annapurna-bhandar-2026`) had independently-maintained schema and accordion lists that drifted out of sync, with the schema silently keeping stale figures (a wrong grain quantity, a stale benefit amount) the visible page had already corrected. The drift is invisible in a normal page review since the visible accordion looks right; it only surfaces when something diffs the JSON-LD against the rendered page, which nobody does by default.

### FAQ Accordion ARIA

Every FAQ accordion item needs `aria-expanded` on the button and `role="region"` + `id` on the answer panel:

```tsx
<button onClick={() => toggle(i)} aria-expanded={open} aria-controls={`faq-${i}`}>
  {question}
  <svg aria-hidden="true"> ... </svg>
</button>
{open && <div id={`faq-${i}`} role="region"> {answer} </div>}
```

### Disclaimer Template

Add `itemProp="disclaimer"` to the disclaimer div:

```tsx
<div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
  <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
    <strong>Disclaimer:</strong> All calculations on this page are indicative only. [Metric] is a
    mathematical measure of historical [growth/performance] and does not predict future returns. Past
    performance of any investment does not guarantee future results. This calculator is for educational
    and planning purposes only and does not constitute financial advice. Consult a SEBI-registered
    investment adviser before making investment decisions.
  </p>
</div>
```

---

## Sidebar

Every calculator page sidebar has two lists: Popular Calculators (7 items) and More Calculators (5 items).

The most contextually related calculator goes first. Build the list based on what the article content actually references — not what's generally popular. On the CAGR page, XIRR goes first because the article mentions it four times as "the correct alternative for SIP portfolios." Rule of 72 appears because it's directly referenced in the Reverse CAGR section.

The sidebar calculator list must be wrapped in `<nav aria-label="Related Calculators">` (not a plain `<div>`):
```tsx
<nav aria-label="Related Calculators" style={{ ... }}>
  { /* calculator links */ }
</nav>
```

All sidebar links open in a new tab.

### Flex-Column Sidebars Need `flexShrink: 0` on Every Direct Child

If the sidebar `<aside>` uses `display: 'flex', flexDirection: 'column'` combined with `maxHeight` + `overflowY: 'auto'` (the sticky, independently-scrollable pattern required below), every direct child box must have `flexShrink: 0` set explicitly. Without it, flex children compress toward zero height before the container's overflow scroll kicks in, so boxes visually collapse at normal viewport heights and only render correctly once the browser is zoomed out enough that everything fits without scrolling. This is easy to miss because the bug only appears at real-world screen heights, not in a quick zoomed-out visual check, and the fix is invisible in a diff unless you're looking for the missing property. Plain block-layout sidebars (no `display: flex` on the `<aside>` itself, just `marginBottom` spacing between children) never hit this bug — `epfo-login-uan-passbook`'s sidebar uses block layout and was unaffected; `annapurna-bhandar-2026` used flex and needed `flexShrink: 0` added to every child wrapper after the bug was reported.

---

## Internal Interlinking

Every calculator article must contain inline `<Link>` components woven naturally into the prose. The CAGR calculator is the reference: it links to the XIRR Calculator three times in the article body, at the exact points where the user would logically want that tool.

**Minimum: 4 inline article links per calculator page.** These are different from sidebar links — they live inside `<p>` or `<li>` elements within the article, not in a list.

**The link appears only where the linked calculator is directly useful.** Examples:

- ✅ `"Use the <Link ...>Balance Transfer Savings Calculator</Link> to quantify the net saving after fees."`
- ✅ `"Run the <Link ...>Income Tax Calculator</Link> to see how Section 24(b) changes your net liability."`
- ❌ `"See also: [Home Loan EMI Calculator]"` — link lists belong in the sidebar
- ❌ `"Click here to use our [SIP Calculator]"` — passive CTA phrasing reads as AI-generated

**Link style (inline article):**

```tsx
<Link href="/calculators/target-calculator" target="_blank" rel="noopener noreferrer"
  style={{ color: C.dark, fontWeight: 600 }}>Target Calculator Name</Link>
```

**Primary linking relationships:**

| Calculator | Must link to | Also links to |
|---|---|---|
| Home Loan EMI (`mortgage-calculator`) | `home-loan-eligibility-calculator`, `sbi-home-loan-calculator` | `income-tax-calculator`, `balance-transfer-savings-calculator`, `sip-calculator` |
| Home Loan Eligibility | `mortgage-calculator`, `sbi-home-loan-calculator` | `debt-to-income-ratio-calculator`, `car-loan-calculator`, `emi-calculator` |
| Personal Loan Eligibility | `emi-calculator`, `debt-to-income-ratio-calculator` | `mortgage-calculator`, `business-loan-eligibility-calculator` |
| SBI Home Loan | `mortgage-calculator`, `home-loan-eligibility-calculator` | `income-tax-calculator`, `balance-transfer-savings-calculator` |
| Car Loan | `emi-calculator`, `loan-eligibility-calculator` | `mortgage-calculator`, `balance-transfer-savings-calculator` |
| SIP | `cagr-calculator`, `lumpsum-calculator` | `swp-calculator`, `xirr-calculator` |
| CAGR | `xirr-calculator` | `sip-calculator`, `lumpsum-calculator` |
| Annual Appraisal Impact | `income-tax-calculator`, `section-80c-calculator` | `section-80d-calculator`, `new-tax-regime-calculator`, `old-tax-regime-calculator`, `performance-bonus-tax-calculator` |
| Performance Bonus Tax | `income-tax-calculator`, `annual-appraisal-impact-calculator` | `section-80c-calculator`, `section-80d-calculator`, `new-tax-regime-calculator`, `in-hand-salary-calculator` |

**Sidebar first-item rule:** The first item in Popular should be the calculator most referenced in the article body. Never add a link to a calculator whose directory does not exist under `app/calculators/` — always verify before committing.

### Table of Contents for Long-Form Pages

Any page over roughly 10 minutes' read time should have an in-page jump-nav right after the lead paragraphs, before the first H2. It helps real readers navigate (SXO) and gives Google a strong signal to generate jump-to sitelinks (AEO). Reference: `TableOfContents` component in `app/news/gst-rates/page.tsx`, reused across every long-form page built afterward.

Same-page anchor links (`href="#section-id"`) are the one correct exception to "every link opens in a new tab" — they navigate within the current page, not away from it, so they should NOT have `target="_blank"`.

### Reciprocal Cluster Interlinking

When a new page belongs to an existing content cluster (e.g. GST, ITR deadlines, tax slabs, and GSTIN lookup are all the same "India tax compliance" cluster), it isn't enough to link outward from the new page to its siblings. Go back and add the new page into the 2-3 most relevant siblings' own Related Articles/Related Reads lists too. A page that only ever gets linked *to* and never appears *in* the cluster's other sidebars is under-linked relative to its actual topical relevance, and this is easy to skip because it means touching files you didn't set out to edit in that session.

**Mine the user's actual keyword data harder when building an FAQ or H2 list.** When a brief supplies real Google Ads or GSC keyword volumes, check which exact-match phrases have real volume and make sure at least one FAQ question or H2 uses that literal phrasing, rather than folding it into a differently-worded question that happens to cover the same ground.

**Border-index bug to check whenever extending a `.map()`-rendered list:** `borderBottom: i === 0 ? border : 'none'` only draws a divider after the first item — it was written for a 2-item list where that happens to look right, but silently breaks once the list grows to 3+ items (the middle item loses its bottom border). Use `i < arr.length - 1 ? border : 'none'` instead, which is correct at any list length.

### In-Content Promo Bar

A stronger interlink than an inline `<Link>`, for the one or two highest-intent cross-sell points in an article (never more than two on one page — overuse reads as ad clutter and buries the actual content).

```tsx
<div style={{ background: '#F5F9F2', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
  <div style={{ flex: 1, minWidth: 200 }}>
    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Target Calculator Name</p>
    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>One sentence on what the reader gets by clicking through right now.</p>
  </div>
  <Link href="/calculators/target-calculator" target="_blank" rel="noopener noreferrer"
    style={{ background: C.dark, color: C.white, fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
</div>
```

Place it at a natural section boundary (end of a section, not mid-paragraph), pointing to the single most useful next tool given what the reader just read. This is an established exception to the "no decorative colored boxes in article prose" rule — the pale `#F5F9F2` fill and single dark button are the one sanctioned pattern, already live on the income tax calculator. Do not invent a second visual style for it.

### Calculator CTA Rotation for Programmatic Page Clusters

When a promo-bar-style calculator CTA needs to appear on every page of a large programmatic cluster (200+ country/city/salary pages, not a handful of hand-written calculator pages), a single fixed calculator for every page is repetitive and wastes the internal-link variety opportunity. The reference implementation is `app/gdp/_template/CountryGDPPageTemplate.tsx`'s `pickCalc()`:

- **A pool of real, existing calculators** (verified via `fs.existsSync` before trusting any entry — the GDP cluster's pool grew from 11 to 44 after an initial pool was found too small), not a hardcoded pair.
- **Two CTA slots per page, non-repeating.** Slot 1 rotates by `rank % pool.length`; slot 2 uses an offset that itself depends on rank (`1 + rank % (pool.length - 1)`), not a fixed offset, so the exact (slot1, slot2) pair repeats far less often than a fixed-offset scheme would.
- **A smaller "flagship" pool for the highest-traffic pages.** Top-ranked pages (by whatever ranking the cluster has — GDP rank, population, traffic) draw only from a curated subset of the highest-intent calculators, so the single most-visited page in the cluster never lands on something as niche as a Rule-of-72 calculator by chance of the rotation.
- **Context-aware tailoring where a real signal exists.** The GDP cluster tailors slot 1 by the country's own growth rate (fast growth → growth-oriented tools like SIP/Lumpsum; contraction → capital-preservation tools like FD/PPF) before falling back to plain rotation. Use a real per-page signal if one exists; don't force one that doesn't.
- **An explicit override escape hatch** (`calcOverride?: [Calc, Calc]` on the page's data type) for the rare page that needs a specific, hand-picked pair regardless of what the rotation would produce (the United States page overrides to SIP + EMI specifically).

### Sticky, Independently-Scrollable Sidebar

The sidebar should stay in view as the user scrolls a long article, and scroll internally once it's taller than the viewport, rather than running off the bottom of the screen or forcing the whole page to keep scrolling to reach lower sidebar items.

The scrollbar must be styled to look neutral and professional. Without custom scrollbar CSS, browsers inherit the page's accent color (lime/green on Fermor) and render a bright colored scrollbar that looks broken. Use a thin, gray scrollbar with no visible track.

Each calculator file needs its own unique CSS class name for the sidebar (e.g. `vpf-sidebar`, `mortgage-sidebar`) since the `<style>` tag injects global CSS and class names must not collide across pages that might both be rendered in a tab switcher or prefetched.

```tsx
{/* Sidebar scrollbar styles — use a unique class name per calculator file */}
<style>{`
  .[calc]-sidebar::-webkit-scrollbar { width: 5px; }
  .[calc]-sidebar::-webkit-scrollbar-track { background: transparent; }
  .[calc]-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
  .[calc]-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
`}</style>
<aside
  className="[calc]-sidebar"
  style={{
    position: mobile ? 'static' : 'sticky',
    top: 20,
    alignSelf: 'start',
    maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
    overflowY: mobile ? 'visible' : 'auto',
    paddingRight: mobile ? 0 : 2,
    scrollbarWidth: 'thin',           // Firefox
    scrollbarColor: '#C4C9C4 transparent', // Firefox
  } as React.CSSProperties}
>
```

The `scrollbarWidth` and `scrollbarColor` inline properties cover Firefox. The `as React.CSSProperties` cast is required because TypeScript's React types do not yet include the Firefox scrollbar properties.

The parent grid must have `alignItems: 'start'` or `position: sticky` silently does nothing. Reference: `app/calculators/income-tax-calculator/IncomeTaxCalculatorClient.tsx`.

### Sidebar Color Discipline

Do not add a second dark/filled block to the sidebar. The nav bar and the primary result panel are already the page's color anchors — a dark "quick links" card stacked underneath them reads as visual noise, not branding, and it is usually redundant with the Popular/More lists anyway (the same 4-5 calculators tend to already be in Popular). An early version of this page shipped exactly that dark box; it was removed after a direct before/after comparison against Groww's calculator sidebar, which uses plain white bordered cards with no fill color anywhere except a single CTA button. Keep every supplementary sidebar widget (facts box, related reads) in the same white-card shell as `SidebarList`: `border: 1px solid C.border, borderRadius: 10-12`, a `C.bg` (near-white) header strip, no saturated fills. If a widget needs to stand out, a thicker border or bold text does the job without adding color.

```tsx
// Snapshot / facts box — white shell, reuse for any short static-fact widget
<div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
  <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Section Title</span>
  </div>
  {/* rows */}
</div>
```

Reference implementation: `app/calculators/home-loan-eligibility-calculator/HomeLoanEligibilityClient.tsx` (`HomeLoanSnapshot`, `RelatedReads`).

---

## GEO and LLM

**llms.txt** lives at `public/llms.txt`. Add an entry for every new calculator when it goes live. The entry should describe what the calculator does, what modes it has, what topics the article covers, and any unique features (multi-currency, NRI use, year presets, etc.). **When revamping an existing calculator, rewrite its entry too, not just check it exists.** A one-line entry written when the page had 3 sections and no bank comparison table is actively misleading to an AI crawler after the page grows to 15 sections and a dozen new features. `mortgage-calculator`'s entry said only "Monthly mortgage payment and total cost" after two rounds of major content revamp had already added prepayment, eligibility, a 12-lender rate table, PMAY, and an EMI-per-lakh reference. Treat the llms.txt entry as part of the page's content, not a one-time setup task.

**robots.ts** has an AI crawler allowlist covering GPTBot, Google-Extended, ClaudeBot, PerplexityBot, and others. Do not add Disallow rules for these bots.

When writing article content, cite authoritative sources by name within the sentence — "per AMFI guidelines issued by SEBI", "per NSE India price return data" — not as footnotes. AI models weight pages that name the same sources they were trained on.

---

## News Page Standards

Every news and analysis page on Fermor follows these rules in addition to the general content rules above.

---

### Schema (required on every news page)

**NewsArticle** — headline, description, datePublished, dateModified, author, publisher, mainEntityOfPage, articleSection, isAccessibleForFree, about[], keywords.

**FAQPage** — minimum 6 questions. Questions must match real search queries ("Why is Nifty IT falling today?", not "Frequently asked questions about Nifty IT"). Every answer must begin with a direct factual statement, not a preamble.

**BreadcrumbList** — 3 levels always:
- Level 1: Home → https://fermor.in
- Level 2: Analysis → https://fermor.in/news
- Level 3: [Article title/topic] → full canonical URL of the article

The visible breadcrumb in the page UI must match the schema exactly.

---

### H2 Structure (AEO requirement)

Every H2 heading must be answered in its first sentence. Google and AI systems pull H2 + first sentence as the candidate for featured snippet and direct answer. If the heading is a question, sentence one must be the answer. If the heading is a topic label, sentence one must state the key fact about that topic.

Wrong: H2 "Why Nifty IT Is Falling" → first sentence "The IT sector has seen significant volatility this week."
Right: H2 "Why Nifty IT Is Falling" → first sentence "Nifty IT is falling because Accenture cut its FY26 revenue guidance and signalled lower demand from global enterprise clients."

---

### Source Citations (government and official sources only)

Name authoritative sources inline in the sentence. Do not footnote. Do not use vague attribution like "analysts say" or "reports suggest."

**Allowed sources to name and link:**
- SEBI (sebi.gov.in) — for regulations, circulars, DRHP filings
- NSE India (nseindia.com) — for index data, exchange rules
- BSE India (bseindia.com) — for Sensex data, company filings
- RBI (rbi.org.in) — for monetary policy, interest rates
- EPFO (epfindia.gov.in) — for PF interest rates, UAN
- AMFI (amfiindia.com) — for mutual fund return standards (SEBI-regulated body)
- Ministry of Finance, Press Information Bureau — for budget and tax data
- Company investor relations pages — for earnings and guidance that came from the company itself

**Never link to:**
- Financial news sites (Economic Times, Moneycontrol, Livemint, Business Standard)
- Any competitor platforms
- Wikipedia or crowd-sourced references
- Third-party data aggregators

When price data comes from an exchange, write "per NSE India data" or "per BSE India closing prices" in the sentence. Do not add a hyperlink to live price pages — link to the exchange homepage only if citing a specific regulation or circular.

**A pasted "AI verification" note (ChatGPT, Gemini, or similar) is a lead, not a citation.** When a brief includes a note claiming a draft's facts were already checked by another AI, treat every claim in that note with the same skepticism as an unverified source, not less. On one page, the very first such note pasted into a session was about an unrelated West Bengal pension scheme, entirely mismatched to the page being built, a mismatch caught only by actually reading it rather than assuming it applied. On another, one part of a correction note (an IMS-naming fix) checked out cleanly across independent sources and was applied, while a second part (a special-category-state threshold table) didn't hold up. ClearTax's own page on the same topic contradicted itself internally, and a second independent source grouped the states differently again. The page was corrected only on the parts confirmed by multiple independent sources and stayed conservative on the rest, rather than shipping an unverifiable table because "an AI already checked it." Independently verify every factual claim (phone numbers, thresholds, dates, form names, formulas) against real sources before publishing, regardless of what the input brief claims has already been checked.

**Check for cannibalization before building any new page.** Search the existing site for topic overlap before writing: `grep -rl "<keyword>" app/news/` and a skim of any page that already touches the subject. If a new page's core topic already has a thin or duplicate treatment elsewhere, retire the old page with a redirect (`next.config.ts` `redirects()`) rather than leaving two competing pages live. If an existing page has a *partial* overlap (a section that covers part of what the new page covers in full), trim that section down to a brief pointer plus a link to the new canonical page, and add reciprocal links between the two. This was needed three separate times in one session: a thin duplicate ITR-deadline page was retired outright; two EPF pages' pre-existing "check claim status" sections were trimmed to pointers once a dedicated claim-status page was built; and two tax-regime pages' comparison sections were linked out to a new dedicated regime-comparison page instead of staying as competing duplicate content.

---

### Timestamps — Always Use Actual IST, Never Estimate

Before writing any news page, run this command to get the real current IST:

```bash
TZ=Asia/Kolkata date '+%Y-%m-%dT%H:%M:%S+05:30'
```

Use the exact output in all four places:
1. `datePublished` in `articleSchema`
2. `dateModified` in `articleSchema`
3. `publishedTime` in `openGraph`
4. The visible `<time dateTime="...">` element in the article header

Never hardcode a guessed time like `09:30`, `08:00`, or `10:00`. If the page is being written at 2:16 PM IST, it must say `2026-06-20T14:16:00+05:30` and "2:16 PM IST" in every location. Round-number guesses undermine credibility with Google News.

---

### datePublished and dateModified

`datePublished` is set once and never changed.

`dateModified` must be updated every time the article content changes. This is a Google News freshness signal.

When an article is updated after its original publish date, the visible header shows **only** the updated date, not both:
```
Updated Jul 5, 2026  ·  18 min read  ·  Fermor Analysis
```

Do not render the original publish date alongside the update date (e.g. `Jun 19, 2026 · Updated Jun 20, 2026`). Once a page has been revised, the reader only needs to know how current the content is; showing the original creation date next to it is clutter, not a trust signal. This applies to the visible `<time>` element in the article header only — `datePublished` in the JSON-LD schema stays untouched as the real historical record; only `dateModified` and the visible header text change.

Update `dateModified` in:
1. The `articleSchema` object in the page file
2. Nothing else needed for the sitemap — `app/sitemap.ts` does NOT read filesystem `mtime` (a fresh
   Vercel checkout resets every file's mtime, which silently collapsed every page to one identical
   date the one time this was tried). It reads a checked-in manifest, `src/data/sitemap-lastmod.json`,
   which a CI job (`regenerate-lastmod-manifest` in `.github/workflows/ci.yml`) regenerates from
   real git history and commits back to `main` automatically on every push. Once the article is
   merged, its `/sitemap.xml` `lastmod` updates on its own within one CI run — don't hand-edit that
   JSON file, and see CLAUDE.md "Sitemap and Programmatic Page Generation" if it doesn't.

---

### All Links Open in New Tab

Every `<Link>` and `<a>` on a news page needs `target="_blank" rel="noopener noreferrer"` — nav links, breadcrumbs, sidebar, inline article links, CTAs. No exceptions.

Quick check: `grep -c 'target="_blank"' page.tsx` should equal `grep -c '<Link ' page.tsx`.

---

### Calculator Links in Article Body

Every news article must contain at least 2 natural inline links to Fermor calculators, placed in the "what to do" section of the article. The links must feel like a useful next step, not promotion. The right test: would a reader who just finished reading the section naturally want to use that calculator right now?

More than 2 is encouraged if it fits the content. Never force a calculator link into a section where it does not belong.

---

### ARIA and Accessibility (news pages)

News pages do not need the interactive ARIA from calculator pages (no `aria-live`, no `aria-expanded`, no slider attributes). But these are required:

**Semantic HTML — non-negotiable:**
- `<nav>` for the top navigation bar, with `aria-label="Site navigation"`
- `<article>` wrapping the article body
- `<aside>` for the Key Numbers sidebar
- `<time dateTime="ISO-8601-date">` for all visible dates

**Breadcrumb accessibility:**
- The last breadcrumb item (current page) gets `aria-current="page"`
- Other breadcrumb links are standard `<a>` or `<Link>` elements

**Images:**
- Every `<img>` must have a meaningful `alt` attribute
- Decorative-only images: `alt=""`
- Logo: `alt="Fermor"`

**Heading hierarchy:**
- One `<h1>` per page (the article title)
- All section headings are `<h2>`
- Sub-headings within a section are `<h3>`
- Never skip levels

**Speakable schema (AEO — voice search):**
Add a `speakable` block to your `articleSchema` or a separate `WebPage` schema. This tells Google Assistant and other voice engines which parts of the page to read aloud:

```ts
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/news/[slug]',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
};
```

The `article-lead` class should be on the opening paragraph of the article (the lede). This ensures the title, each section heading, and the opening summary are readable by voice assistants.

---

### Colour and Visual Design

One neutral callout block per page maximum. Use the standard callout: left border `#CCCCCC`, background `#FAFAFA`. No coloured highlights, no yellow/blue/green info boxes in article prose. The Key Numbers sidebar uses red (`#B91C1C`) for negative values and green (`#166534`) for positive values — this is data, not decoration, and is the only place colour carries semantic meaning on a news page.

---

### Multi-Language Content Architecture

When a news page needs to exist in more than one language (a government scheme with a regional audience, for example), each language is a **separate, fully indexable sibling URL** — not a client-side toggle, not an auto-redirect based on browser locale or geo-IP. Google's own guidance is explicit on this: never auto-redirect users based on detected language, always offer a visible, user-initiated switcher. Reference implementation: `annapurna-bhandar-2026` (English) plus `annapurna-bhandar-2026-bn`, `-hi`, `-ur`, `-ne` (Bengali, Hindi, Urdu, Nepali).

**URL pattern:** `[english-slug]` for the default/canonical language, `[english-slug]-[ISO-639-1 code]` for every other language (`-bn`, `-hi`, `-ur`, `-ne`). Keep the base slug identical across all versions so the relationship is legible from the URL alone.

**hreflang via `metadata.alternates.languages`** on every version, including the English original — each page must list all siblings and itself:
```ts
alternates: {
  canonical: 'https://fermor.in/news/[slug]-[lang]', // this page's own URL
  languages: {
    'en-IN': 'https://fermor.in/news/[slug]',
    'bn-IN': 'https://fermor.in/news/[slug]-bn',
    'hi-IN': 'https://fermor.in/news/[slug]-hi',
    'ur-IN': 'https://fermor.in/news/[slug]-ur',
    'ne-IN': 'https://fermor.in/news/[slug]-ne',
    'x-default': 'https://fermor.in/news/[slug]',
  },
},
```

**`workTranslation` / `translationOfWork` schema** on top of hreflang, since this is a schema.org signal AI crawlers and LLMs parse independently of HTML `<link>` tags. The English (canonical) page's `articleSchema` lists every translation:
```ts
workTranslation: [
  { '@type': 'NewsArticle', url: 'https://fermor.in/news/[slug]-bn', inLanguage: 'bn-IN', name: '[native-script title]' },
  // one entry per translated version
],
```
Each translated page's `articleSchema` instead carries a single `translationOfWork` pointing back to the English canonical, plus `inLanguage` set to its own BCP-47 code:
```ts
translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/news/[slug]', inLanguage: 'en-IN', name: '[English title]' },
inLanguage: 'bn-IN',
```

**Visible language switcher:** build one shared component (e.g. `components/AnnapurnaLanguageSwitcher.tsx`) taking a `current` prop and rendering pills/links to every language version, inserted near the top of the article (after the lead paragraphs, before the first H2). Links between language versions are same-tab (no `target="_blank"`) since the switcher is replacing the view in place, not sending the reader to a different resource — this is the one documented exception to the site's otherwise universal new-tab-for-every-link rule.

**Content depth parity:** every translated version must match the English page's structural depth (same sections, same tables, same FAQ count) rather than being a shorter summary. A thin translation defeats the purpose of a differentiated multi-language cluster — competitors ranking for the same regional keywords typically have no non-English version at all, so parity of depth is the actual differentiator.

**RTL languages (Urdu and similar):** set `dir="rtl"` on the `<article>` wrapper and `lang="ur"` (or the relevant code), `textAlign: 'right'` on heading/paragraph styles, `flexDirection: 'row-reverse'` on flex rows (bullet lists, numbered steps, table rows), and mirror asymmetric borders (`borderRight` instead of `borderLeft` for definition-block callouts). Any directional icon (chevrons, arrows) needs `transform: 'scaleX(-1)'`.

**Untranslatable specifics stay as-is, not fabricated:** if a source document (a government form, an official PDF) is only available in certain languages, list only those in every translated version's download section rather than inventing a link that doesn't exist. `annapurna-bhandar-2026`'s form downloads are English/Bengali/Hindi only in all five language versions, including the Urdu and Nepali pages, because those are the only languages the government actually published the form in.

**llms.txt:** add one entry for the whole cluster (not one per language) that names the topic once and links all versions, so AI crawlers understand it as a single multi-language topic rather than duplicate content.

---

### Pre-Publish Checklist (news pages)

```
□ Added to ARTICLES array in app/news/page.tsx (newest first)
□ grep -n "—" page.tsx → zero results
□ grep -c 'target="_blank"' == grep -c '<Link ' (all links open in new tab)
□ Every H2 answered in its first sentence
□ FAQPage schema has 6+ questions with direct-answer first sentences
□ BreadcrumbList schema: 3 levels, last item has aria-current="page"
□ Sources cited inline by name; only government/official sources are linked
□ datePublished matches actual publish time
□ dateModified matches articleSchema dateModified field
□ At least 2 natural inline calculator links in the article body
□ Semantic HTML: <nav aria-label>, <article>, <aside>, <time dateTime>
□ Speakable schema added (cssSelector: h1, h2, .article-lead)
□ Heading hierarchy: one h1, all sections h2, no skipped levels
□ npm run build → zero TypeScript errors
□ grep -n "—" app/news/page.tsx after adding the article card
□ Article header shows only the current date/"Updated [date]", never original + updated together
□ FAQ accordion and FAQPage schema derive from one shared faqItems array, not two separately maintained lists
□ If this page has translated siblings: hreflang alternates.languages set on every version, workTranslation/translationOfWork schema present, llms.txt cluster entry updated
```

---

## Government Portal URLs: Verify They Actually Resolve

Never cite a government scheme's status-check or application portal URL just because it's the one every other article uses. State governments retire and migrate subdomains, especially after a change of ruling party, and search engines keep indexing the old URL for months after it dies.

On `jai-bangla-pension-scheme-2026`, every source (including ClearTax's own page) cited `jaibangla.wb.gov.in` as the official West Bengal pension status-check portal. A real DNS lookup (via `dig @8.8.8.8` and `dig @1.1.1.1`, not just the sandbox resolver) returned NXDOMAIN: the domain no longer exists. A second search turned up `samarth.wb.gov.in`, part of a new "One Umbrella Scheme" portal the incoming BJP state government launched in 2026 — same URL path (`/track-applicant-public`), confirmed live with a real `curl` HTTP 200. The scheme name itself (Jai Bangla) had not changed, only the portal.

Before shipping any `<a href>` to a `.gov.in` domain: `dig @8.8.8.8 <domain> +short` to confirm it resolves, then `curl -I` to confirm it actually responds. If it doesn't, search for what replaced it rather than assuming the cited domain is still correct — political transitions in state governments are a common, easy-to-miss cause (see the Lakshmir Bhandar → Annapurna Bhandar rename for the same underlying dynamic, documented in `annapurna-bhandar-2026`).

## Verifying an Embedded Calculator's Formula Without a Browser

When browser automation tools (Playwright, `chromium-cli`) aren't available in the working environment, don't fall back to manual arithmetic checks alone or skip verification. Execute the calculator's actual shipped calculation function directly with `node -e`, feeding it a known-correct test case, and compare the output. This is a legitimate, defensible verification method distinct from a full UI test: it proves the math is right even though it doesn't prove the UI renders it correctly.

```bash
node -e "
function calcTax(income) { /* paste the exact function body from the .tsx file */ }
console.log(calcTax(2344123)); // compare against the known-correct expected value
"
```

On `old-vs-new-tax-regime`, this method confirmed the embedded `InlineRegimeCalculator`'s `calcTaxNew`/`calcTaxOld` functions matched a reference screenshot's numbers exactly (₹23,44,123 salary → ₹5,20,766 old / ₹2,77,972 new) when no browser tool was available to actually click through the UI. Disclose this substitution honestly wherever verification results are reported (a commit message, a summary to the user) rather than implying a full browser test was performed.

## Backslash-Escaped Apostrophes in Raw JSX Text Render Literally

`Council\'s` typed directly inside JSX text (not inside a `.ts`/`.tsx` string literal assigned to a variable) renders as a visible backslash followed by an apostrophe in the browser, because the backslash escape is only meaningful inside an actual JavaScript string, and JSX text nodes are not that. Use `&apos;` or a plain, unescaped `'` instead. This bug is easy to introduce by habit when writing prose that has apostrophes and is easy to miss in a code read, since the JSX source looks fine; it only shows up as a visible defect in the rendered page. `grep -n "\\\\'" ` across a new page's `.tsx` file before shipping catches it.

## Don't Silently Drop Requirements When Copying a Reference Page's Structure

When building a new news page by following an existing page as a structural reference, match it against the *written* requirements list (Internal Interlinking, In-Content Promo Bar, Calculator Links in Article Body), not just against what that one reference page happens to visibly contain. `jai-bangla-pension-scheme-2026` was modeled closely on `annapurna-bhandar-2026`'s sidebar and section layout, but shipped with zero inline `<Link>`s inside article prose and no In-Content Promo Bar, both required by this document, because the initial build focused on matching the visual/structural pattern rather than re-checking the full requirements list. Every new page needs its own pass against "Internal Interlinking" and "In-Content Promo Bar" above, independent of whatever the reference page did.

## Shared UI Module and Pure Maths Modules

**Shared UI.** `src/components/calculators/CalcUi.tsx` exports the presentation pieces that every calculator repeats. New pages import `Slider`, `PresetPills`, `SplitDonut`, `StackedBars`, `Legend`, `SplitBar`, `StatRow`, `ResultBox`, `CollapsibleSchedule`, `SidebarList`, `StickySidebar`, `CACTA`, `PromoBar`, `FAQAccordion` and `tableStyles` from it instead of defining local copies. `SplitDonut` draws one lime track and one dark overlay arc, so the donut rule (never two independent arcs) is enforced in one place. `tableStyles` sets `textAlign` and `verticalAlign` explicitly on every cell style.

**Pure maths modules.** Calculations live in `<name>Math.ts` beside the page, take plain numbers, return plain numbers and never touch React. That makes them testable with `npx tsx` and keeps the article honest, because every worked example is produced by the same function the calculator runs. Test each module against its own worked examples and against zero, negative, extreme and fractional inputs, and assert that every output is finite.

**Fair comparisons.** When a page compares two strategies (reinvest or take cash, step-up or flat, new or old regime), count everything the user ends up with in both branches, and state the assumption that makes the branches comparable. A comparison that leaves out one branch's cash flows overstates the winner.

**External identifiers.** Verify every Wikidata ID against the Wikidata API before it goes into `DefinedTerm.sameAs`. An ID that looks plausible can belong to an unrelated entity.

**Volatile company data.** Do not publish per-stock prices, yields or dividends per share. Compute yields from the reader's inputs and link the NSE or BSE corporate announcements. Describe payout policy in words, and keep to facts that do not go stale.

## Input Panel Balance, Restated

The goal is that the input panel and the results panel end at the same height.
- Inputs taller than results: paginate with "More settings" and "Back", or add useful derived stats to the results (a stat a reader would search for, never filler).
- Inputs shorter than results: show every input on one page, add a neutral derived-value box under the sliders, and remove result rows that belong in the dropdown.
- Use `gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)'`. Plain `1fr 1fr` lets number inputs force the left column wider and clip the results panel.

## When This Document Gets Updated

When a new SEO practice becomes standard across all pages, it gets added here. When a new prohibited pattern is identified, it gets added to the list. When the reference implementation (CAGR calculator) gets updated, check whether this document needs to reflect the change.

The `dateModified` fields in WebApplication and WebPage schemas need to be updated every time a page changes. This is a freshness signal for both Google and AI crawlers.

---

### Article Table Wrapping and Brief Verification (added 12 Oct 2026)

**Table cells and paragraphs must not break inside a code or amount.** A cell that wraps as "GSTR-" then "9A", "FY 2019-" then "20", "Part" then "III" or "Rs" then "5 crore" reads as a wrong number. The article `DataTable` and paragraph component must:
- wrap hyphenated tokens (`GSTR-9A`, `2019-20`, `ITR-2`) in `white-space: nowrap`
- join `Rs <amount>` with a non-breaking space
- set `white-space: nowrap` on string cells of 24 characters or fewer and on headers of 16 characters or fewer
- glue the last two words of a cell so it never ends on a one-word orphan

Reference: `nb()`, `P` and `DataTable` in `app/blogs/gstr-9-annual-return/page.tsx`. Check by screenshotting every table at 1440px wide before the PR.

**Verifying a pasted competitor brief.** Confirm each notification number by its title in a notification list, recompute every worked example (late fee slabs, caps, day counts) before publishing it, and keep an unverified figure out of the page or flag it in the PR. A late fee quoted from a competitor can be a superseded rule.

**Residential status and GST annual return pages** (`/blogs/residential-status-section-6-income-tax-act`, `/blogs/gstr-9-annual-return`) are the reference for a tax-explainer article with worked-example tables, a numbered "On this page" box and a closing "What is Fermor?" FAQ.

**Reference implementation:** CAGR Calculator (`app/calculators/cagr-calculator/`). For multi-language news content specifically: Annapurna Bhandar 2026 (`app/news/annapurna-bhandar-2026/` plus its `-bn`, `-hi`, `-ur`, `-ne` siblings). For long-form news pages with a Table of Contents, cluster interlinking, and an embedded interactive widget: `app/news/gst-rates/`, `app/news/epfo-claim-status/`, `app/news/old-vs-new-tax-regime/`.
**Last updated:** October 2026
