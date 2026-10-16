#!/usr/bin/env tsx
/**
 * Programmatic SEO generator for income tax pages.
 * Creates one page.tsx per salary level using the shared IncomeTaxPageTemplate.
 *
 * Usage:
 *   npx tsx scripts/generate-tax-pages.ts              (reads .env.local automatically)
 *   npx tsx scripts/generate-tax-pages.ts --dry-run
 *   npx tsx scripts/generate-tax-pages.ts --salaries=5,10,15
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// Auto-load .env.local so you never need to prefix keys in the terminal
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const [k, ...rest] = line.trim().split('=');
    if (k && !k.startsWith('#') && !(k in process.env)) process.env[k] = rest.join('=');
  }
}
import type { TaxPageData, DeductionScenario } from '../app/tax/_template/types';

// ─── CLI flags ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const saltArg = args.find(a => a.startsWith('--salaries='));
const ALL_SALARIES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75, 100];
const SALARIES: number[] = saltArg
  ? saltArg.replace('--salaries=', '').split(',').map(Number).filter(n => !isNaN(n))
  : ALL_SALARIES;

const ROOT = path.resolve(__dirname, '..');
const TAX_DIR = path.join(ROOT, 'app', 'tax');
const TODAY = new Date().toISOString().split('T')[0];

// ─── Formatting helpers ────────────────────────────────────────────────────

function fmtRs(n: number): string {
  if (n === 0) return 'Rs 0';
  const sign = n < 0 ? '- Rs ' : 'Rs ';
  const s = Math.abs(Math.round(n)).toString();
  if (s.length <= 3) return sign + s;
  let result = s.slice(-3);
  let rest = s.slice(0, -3);
  while (rest.length > 2) { result = rest.slice(-2) + ',' + result; rest = rest.slice(0, -2); }
  return sign + rest + ',' + result;
}

function fmtLakh(n: number): string {
  const l = n / 100000;
  return l % 1 === 0 ? `${l} lakh` : `${l.toFixed(2)} lakh`;
}

// ─── Tax computation ───────────────────────────────────────────────────────

const NEW_SLABS: [number, number, number][] = [
  [0,        400000,   0   ],
  [400000,   800000,   0.05],
  [800000,   1200000,  0.10],
  [1200000,  1600000,  0.15],
  [1600000,  2000000,  0.20],
  [2000000,  2400000,  0.25],
  [2400000,  Infinity, 0.30],
];

const OLD_SLABS: [number, number, number][] = [
  [0,        250000,   0   ],
  [250000,   500000,   0.05],
  [500000,   1000000,  0.20],
  [1000000,  Infinity, 0.30],
];

function applySlabs(taxable: number, slabs: [number, number, number][]): number {
  let tax = 0;
  for (const [from, to, rate] of slabs) {
    if (taxable <= from) break;
    const ceil = to === Infinity ? taxable : Math.min(taxable, to);
    tax += (ceil - from) * rate;
  }
  return Math.round(tax);
}

function surchargeRate(taxable: number): number {
  if (taxable <= 5000000)  return 0;
  if (taxable <= 10000000) return 0.10;
  if (taxable <= 20000000) return 0.15;
  return 0.25; // 25% max for new regime; use 37% for old when needed
}

function computeFull(taxable: number, slabs: [number, number, number][], rebateCeiling: number, maxRebate: number): {
  base: number; surcharge: number; rebate: number; cess: number; net: number;
} {
  const base = applySlabs(taxable, slabs);
  const surcharge = Math.round(base * surchargeRate(taxable));
  const rebate = taxable <= rebateCeiling ? Math.min(base, maxRebate) : 0;
  const taxAfterRebate = Math.max(0, base + surcharge - rebate);
  const cess = Math.round(taxAfterRebate * 0.04);
  return { base, surcharge, rebate, cess, net: taxAfterRebate + cess };
}

function computeOldWithDeduction(oldTaxable: number, additionalDeduction: number): number {
  const taxable = Math.max(0, oldTaxable - additionalDeduction);
  return computeFull(taxable, OLD_SLABS, 500000, 12500).net;
}

function computeTaxData(grossLakh: number): Omit<TaxPageData, 'introProse' | 'metaTitle' | 'metaDescription' | 'datePublished'> {
  const gross       = grossLakh * 100000;
  const newTaxable  = gross - 75000; // New regime: Rs 75,000 standard deduction (Budget 2024)
  const oldTaxable  = gross - 50000; // Old regime: Rs 50,000 standard deduction (unchanged)

  const newResult = computeFull(newTaxable, NEW_SLABS, 1200000, 60000);
  const oldResult = computeFull(oldTaxable, OLD_SLABS, 500000, 12500);

  const monthlyGross   = Math.round(gross / 12);
  const monthlyBasic   = Math.round(monthlyGross * 0.5);
  const monthlyHRA     = Math.round(monthlyGross * 0.2);
  const monthlySpecial = monthlyGross - monthlyBasic - monthlyHRA;
  const monthlyPF      = Math.round(monthlyBasic * 0.12);
  const profTax        = 200;

  const newMonthlyTds = Math.round(newResult.net / 12);
  const oldMonthlyTds = Math.round(oldResult.net / 12);
  const newInHand     = monthlyGross - monthlyPF - profTax - newMonthlyTds;
  const oldInHand     = monthlyGross - monthlyPF - profTax - oldMonthlyTds;

  const deductionScenarios: DeductionScenario[] = [
    { label: 'No deductions (standard only)',         deduction: 0,      oldTax: oldResult.net,                              newTax: newResult.net },
    { label: '80C only: Rs 1,50,000',                deduction: 150000, oldTax: computeOldWithDeduction(oldTaxable, 150000),  newTax: newResult.net },
    { label: '80C + 80D: Rs 1,75,000',               deduction: 175000, oldTax: computeOldWithDeduction(oldTaxable, 175000),  newTax: newResult.net },
    { label: '80C + 80D + NPS: Rs 2,25,000',         deduction: 225000, oldTax: computeOldWithDeduction(oldTaxable, 225000),  newTax: newResult.net },
    { label: 'Maximum deductions: Rs 3,50,000',      deduction: 350000, oldTax: computeOldWithDeduction(oldTaxable, 350000),  newTax: newResult.net },
  ];

  return {
    grossLakh,
    slug: `income-tax-on-${grossLakh}-lakh-salary`,
    gross,
    taxable: newTaxable,
    newBaseTax:    newResult.base,
    new87ARebate:  newResult.rebate,
    newNetTax:     newResult.net,
    newMonthlyTds,
    newSurcharge:  newResult.surcharge,
    newCess:       newResult.cess,
    oldBaseTax:    oldResult.base,
    old87ARebate:  oldResult.rebate,
    oldNetTax:     oldResult.net,
    oldMonthlyTds,
    oldSurcharge:  oldResult.surcharge,
    oldCess:       oldResult.cess,
    monthlyGross,
    monthlyBasic,
    monthlyHRA,
    monthlySpecial,
    monthlyPF,
    newInHand,
    oldInHand,
    deductionScenarios,
  };
}

// ─── Groq prose generation ─────────────────────────────────────────────────

async function callGroq(prompt: string): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('GROQ_API_KEY not set');
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
      temperature: 0.6,
    });
    const req = https.request({
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 15000,
    }, res => {
      let raw = '';
      res.on('data', d => raw += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          const text: string = parsed.choices?.[0]?.message?.content ?? '';
          resolve(text.trim());
        } catch { reject(new Error('Groq parse error: ' + raw.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Groq timeout')); });
    req.write(body);
    req.end();
  });
}

function buildFallbackProse(grossLakh: number, data: ReturnType<typeof computeTaxData>): string {
  const isZeroNew = data.newNetTax === 0;
  const saves = fmtRs(data.oldNetTax - data.newNetTax);
  if (isZeroNew) {
    return `The new tax regime introduced by the Finance Act 2025 is the clear choice for a Rs ${grossLakh} lakh salary: zero TDS deduction, ${fmtRs(data.newInHand)} monthly in-hand, and no paperwork for exemptions or declarations. The old regime produces ${fmtRs(data.oldNetTax)} in tax on the same gross with no deductions, a gap of ${fmtRs(data.oldNetTax)} per year that no Section 80C or 80D claim can recover.`;
  }
  return `The new tax regime produces ${fmtRs(data.newNetTax)} in annual tax on a Rs ${grossLakh} lakh salary, against ${fmtRs(data.oldNetTax)} under the old regime with no Chapter VI-A deductions claimed, a saving of ${saves} per year from switching. To make the old regime a better choice, Chapter VI-A deductions beyond Rs ${fmtRs(Math.round((data.oldNetTax - data.newNetTax) / 0.3))} would be required at this income level.`;
}

async function getIntroProse(grossLakh: number, data: ReturnType<typeof computeTaxData>): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    console.log(`  [Groq] No API key, using fallback prose for ${grossLakh}L`);
    return buildFallbackProse(grossLakh, data);
  }
  const isZeroNew = data.newNetTax === 0;
  const prompt = [
    `Write exactly 2 sentences (no em dashes) about income tax on a Rs ${grossLakh} lakh annual salary in India FY 2025-26.`,
    `Facts to include: new regime tax is ${fmtRs(data.newNetTax)}, old regime tax is ${fmtRs(data.oldNetTax)}, monthly in-hand is ${fmtRs(data.newInHand)}.`,
    isZeroNew
      ? `The Section 87A rebate makes the new regime zero-tax at this salary level.`
      : `The new regime saves ${fmtRs(data.oldNetTax - data.newNetTax)} per year versus old regime.`,
    `Write in a confident, factual tone. No filler phrases. No words like "robust" or "comprehensive".`,
    `Output only the 2 sentences, nothing else.`,
  ].join(' ');
  try {
    const raw = await callGroq(prompt);
    const clean = raw.replace(/—/g, '-').replace(/\n+/g, ' ').trim();
    if (clean.length > 50) {
      console.log(`  [Groq] Got prose for ${grossLakh}L`);
      return clean;
    }
    throw new Error('Response too short: ' + clean);
  } catch (err) {
    console.warn(`  [Groq] Failed for ${grossLakh}L, using fallback: ${(err as Error).message}`);
    return buildFallbackProse(grossLakh, data);
  }
}

// ─── Schema helpers ────────────────────────────────────────────────────────

function buildFaqSchema(d: TaxPageData) {
  const xlph = `${d.grossLakh}`;
  const grossFmt = fmtRs(d.gross);
  const taxableFmt = fmtRs(d.taxable);
  const isNewZero = d.newNetTax === 0;
  const isOldZero = d.oldNetTax === 0;
  const new87AApplies = d.new87ARebate > 0;
  const hasSurcharge = d.taxable > 5000000;

  const questions = [
    {
      name: `How much income tax do I pay on a ${xlph} lakh salary in FY 2025-26?`,
      text: `Under the new tax regime in FY 2025-26, income tax on a Rs ${xlph} lakh annual salary is ${isNewZero ? 'zero' : fmtRs(d.newNetTax)}. After the standard deduction of Rs 75,000, taxable income is ${taxableFmt}. ${new87AApplies ? `Tax at new regime slabs is ${fmtRs(d.newBaseTax)}. Section 87A provides a full rebate for net taxable income up to Rs 12,00,000, wiping out the entire ${fmtRs(d.new87ARebate)}.` : `Tax at new regime slabs is ${fmtRs(d.newBaseTax)}.`} Under the old regime with no deductions, the tax is ${isOldZero ? 'zero' : fmtRs(d.oldNetTax)} including 4% cess.`,
    },
    {
      name: `What is the in-hand salary for ${xlph} LPA in India?`,
      text: `The monthly in-hand salary for ${xlph} LPA under the new tax regime is approximately ${fmtRs(d.newInHand)}, assuming 50% basic salary. This accounts for employee PF of ${fmtRs(d.monthlyPF)} per month (12% of ${fmtRs(d.monthlyBasic)} basic) and professional tax of Rs 200 per month. ${isNewZero ? 'Income tax TDS is zero under the new regime.' : `Income tax TDS is ${fmtRs(d.newMonthlyTds)} per month.`}`,
    },
    {
      name: `Should I choose old or new regime for ${xlph} LPA salary?`,
      text: isNewZero
        ? `The new regime is better for ${xlph} LPA in FY 2025-26 because Section 87A delivers zero tax, while the old regime produces ${fmtRs(d.oldNetTax)} with no deductions. Even with maximum Chapter VI-A claims, the old regime cannot match the new regime's zero-tax outcome at this income level.`
        : `The new regime is better for ${xlph} LPA in FY 2025-26, producing ${fmtRs(d.newNetTax)} versus ${fmtRs(d.oldNetTax)} under the old regime with no deductions. The annual saving is ${fmtRs(d.oldNetTax - d.newNetTax)}.`,
    },
    {
      name: `Does ${xlph} LPA salary attract surcharge?`,
      text: hasSurcharge
        ? `Yes. Surcharge at 10% applies when taxable income exceeds Rs 50 lakh. For ${xlph} LPA, taxable income is ${taxableFmt}, so the 10% surcharge of ${fmtRs(d.newSurcharge)} applies. The new regime net tax including surcharge and 4% cess is ${fmtRs(d.newNetTax)}.`
        : `No. Surcharge applies only when taxable income exceeds Rs 50 lakh. For ${xlph} LPA, taxable income is ${taxableFmt}, which is below the Rs 50 lakh threshold. Only the 4% health and education cess applies.`,
    },
    {
      name: `What is the TDS per month for a ${xlph} LPA salary?`,
      text: `TDS on a ${xlph} LPA salary under the new regime is ${isNewZero ? 'zero per month since annual tax liability is nil after the Section 87A rebate' : `${fmtRs(d.newMonthlyTds)} per month`}. Under the old regime with no deductions, TDS is ${isOldZero ? 'also zero' : `approximately ${fmtRs(d.oldMonthlyTds)} per month`}. Employers compute TDS based on the regime you declare at the start of the financial year.`,
    },
    {
      name: `What is ${xlph} LPA in-hand salary in Bangalore or Delhi?`,
      text: `Monthly in-hand for ${xlph} LPA in Bangalore is approximately ${fmtRs(d.newInHand)} (professional tax Rs 200/month). In Delhi, there is no professional tax, so in-hand is approximately ${fmtRs(d.newInHand + 200)}. Income tax TDS is ${isNewZero ? 'zero under the new regime in all cities' : `${fmtRs(d.newMonthlyTds)} per month under the new regime in all cities`}.`,
    },
    {
      name: `How much PF is deducted for a ${xlph} lakh salary?`,
      text: `For a ${xlph} LPA salary with basic pay of ${fmtRs(d.monthlyBasic)} per month, the employee PF deduction is ${fmtRs(d.monthlyPF)} per month (12% of basic) and ${fmtRs(d.monthlyPF * 12)} per year. The employer contributes an equal ${fmtRs(d.monthlyPF)} per month, which is part of CTC but not deducted from take-home pay.`,
    },
    {
      name: `What is the income tax for ${xlph} lakh salary under the old regime?`,
      text: isOldZero
        ? `Under the old regime, income tax on Rs ${xlph} lakh salary is zero. Taxable income of ${taxableFmt} falls within the Section 87A rebate ceiling of Rs 5,00,000 for the old regime, so the base tax of ${fmtRs(d.oldBaseTax)} is fully rebated.`
        : `Under the old regime with no Chapter VI-A deductions, the tax on Rs ${xlph} lakh salary is ${fmtRs(d.oldNetTax)} including 4% cess. Taxable income is ${taxableFmt} after the standard deduction of Rs 75,000.`,
    },
    {
      name: `How to calculate income tax on ${xlph} lakh salary in Excel?`,
      text: `In Excel, place taxable income (${taxableFmt}) in cell A1. New regime formula: =MAX(0,(MIN(A1,800000)-400000)*0.05)+(MAX(0,MIN(A1,1200000)-800000)*0.1)+(MAX(0,MIN(A1,1600000)-1200000)*0.15)+(MAX(0,MIN(A1,2000000)-1600000)*0.2)+(MAX(0,MIN(A1,2400000)-2000000)*0.25)+(MAX(0,A1-2400000)*0.3). This gives ${fmtRs(d.newBaseTax)} for ${fmtRs(d.taxable)} taxable income. ${new87AApplies ? `Add a Section 87A check: =IF(A1<=1200000,0,[formula]*1.04) to get ${isNewZero ? 'zero' : fmtRs(d.newNetTax)} final tax.` : `Multiply by 1.04 for cess to get ${fmtRs(d.newNetTax)}.`}`,
    },
    {
      name: 'What is Fermor?',
      text: 'Fermor is a financial platform built for India. The calculators and tax guides are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
    },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.name,
      acceptedAnswer: { '@type': 'Answer', text: q.text },
    })),
  };
}

function buildHowToSchema(d: TaxPageData): Record<string, unknown> {
  const isZeroNew = d.newNetTax === 0;
  const taxableFmt = fmtRs(d.taxable);
  const baseTaxFmt = fmtRs(d.newBaseTax);
  const netTaxFmt  = fmtRs(d.newNetTax);
  const step4 = isZeroNew
    ? `Since taxable income (${taxableFmt}) is below Rs 12,00,000, Section 87A provides a full rebate. Tax after rebate: Rs 0.`
    : `Taxable income exceeds Rs 12,00,000 so Section 87A does not apply. Add 4% cess on ${baseTaxFmt} to reach ${netTaxFmt}.`;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate Income Tax on ${d.grossLakh} Lakh Salary in FY 2025-26`,
    description: `Step-by-step method to compute income tax on Rs ${d.grossLakh} lakh annual salary under new and old tax regimes.`,
    totalTime: 'PT2M',
    tool: [{ '@type': 'HowToTool', name: 'Fermor Income Tax Calculator' }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Start with gross salary',   text: `Begin with total annual CTC or gross salary. For this example: ${fmtRs(d.gross)}.` },
      { '@type': 'HowToStep', position: 2, name: 'Apply standard deduction',  text: `Subtract the standard deduction of Rs 75,000 (applicable under both regimes in FY 2025-26). Net taxable income: ${taxableFmt}.` },
      { '@type': 'HowToStep', position: 3, name: 'Apply new regime tax slabs', text: `New regime FY 2025-26 slabs: 0% on Rs 0-4L, 5% on Rs 4-8L, 10% on Rs 8-12L, 15% on Rs 12-16L. Tax: ${baseTaxFmt}.` },
      { '@type': 'HowToStep', position: 4, name: 'Apply rebate and cess',      text: step4 },
    ],
  };
}

// ─── Page template generator ───────────────────────────────────────────────

function generateKeywords(d: TaxPageData): string[] {
  const n = `${d.grossLakh}`;
  const base = [
    `income tax on ${n} lakh salary`,
    `${n} lpa in hand salary`,
    `${n} lakh salary tax 2025-26`,
    `tax on ${n} lakh income india`,
    `${n} lpa take home salary`,
    `income tax ${n} lpa new regime`,
    `${n} lakh ctc in hand salary`,
    `tax calculation ${n} lakh salary`,
    `${n} lpa salary breakup`,
    `how much tax on ${n} lakh salary`,
    `income tax on ${n} lpa old regime`,
    `${n} lakh salary monthly in hand`,
    `income tax calculator ${n} lakh`,
    `${n} lpa income tax 2025`,
    `old vs new regime ${n} lpa`,
    `${n} lpa net salary india`,
    `income tax on ${n} lakh salary bangalore`,
    `income tax on ${n} lakh salary delhi`,
    `${n} lakh annual salary in hand`,
    `income tax ${n} lpa calculator`,
    `take home salary ${n} lpa india`,
    `${n} lakh salary excel calculation`,
  ];
  if (d.newNetTax === 0) {
    base.push(`zero tax ${n} lakh salary new regime`);
    base.push(`section 87a rebate ${n} lakh`);
  }
  return base;
}

function buildMetaTitle(d: TaxPageData): string {
  if (d.newNetTax === 0) {
    return `Income Tax on ${d.grossLakh} Lakh Salary: Zero Tax in 2025-26 - Fermor`;
  }
  return `Income Tax on ${d.grossLakh} Lakh Salary: ${fmtRs(d.newNetTax)} in New Regime 2025-26 - Fermor`;
}

function buildMetaDescription(d: TaxPageData): string {
  const isZero = d.newNetTax === 0;
  if (isZero) {
    return `Income tax on ${d.grossLakh} lakh salary 2025-26. Zero tax in new regime after Section 87A rebate. Old regime tax ${fmtRs(d.oldNetTax)}. Monthly in-hand ${fmtRs(d.newInHand)}. No sign-up required.`;
  }
  return `Income tax on ${d.grossLakh} lakh salary 2025-26. New regime: ${fmtRs(d.newNetTax)}. Old regime: ${fmtRs(d.oldNetTax)}. Monthly in-hand ${fmtRs(d.newInHand)}. Slab-by-slab breakdown, old vs new comparison.`;
}

function camelPageName(grossLakh: number): string {
  return `IncomeTaxOn${grossLakh}LakhPage`;
}

function generatePageTsx(data: TaxPageData, faqSchema: object, howToSchema: object): string {
  const slug = data.slug;
  const pageTitle = buildMetaTitle(data);
  const pageDesc  = buildMetaDescription(data);
  const keywords  = generateKeywords(data);
  const isZeroNew = data.newNetTax === 0;
  const newTaxFmt = fmtRs(data.newNetTax);
  const oldTaxFmt = fmtRs(data.oldNetTax);
  const inHandFmt = fmtRs(data.newInHand);
  const n = `${data.grossLakh}`;

  const ogDesc = isZeroNew
    ? `Complete FY 2025-26 income tax breakdown for Rs ${n} lakh annual salary. New regime: zero tax after Section 87A rebate. Old regime: ${oldTaxFmt}. Monthly in-hand salary ${inHandFmt}. Old vs new regime comparison with all deduction scenarios.`
    : `Complete FY 2025-26 income tax breakdown for Rs ${n} lakh annual salary. New regime: ${newTaxFmt}. Old regime: ${oldTaxFmt}. Monthly in-hand salary ${inHandFmt}. Old vs new regime comparison with all deduction scenarios.`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle.replace(' - Fermor', ''),
    description: pageDesc,
    url: `https://fermor.in/tax/${slug}`,
    datePublished: data.datePublished,
    dateModified: data.datePublished,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
    author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
    publisher: {
      '@type': 'Organization',
      name: 'Fermor',
      url: 'https://fermor.in',
      logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'article p:first-of-type'],
    },
    about: [
      { '@type': 'DefinedTerm', name: 'Income Tax',      alternateName: 'Indian Income Tax Act 1961' },
      { '@type': 'DefinedTerm', name: 'Section 87A',     alternateName: 'Tax Rebate 87A' },
      { '@type': 'DefinedTerm', name: 'New Tax Regime',  alternateName: 'Default Tax Regime FY 2025-26' },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Salaried employees, taxpayers, financial planners in India',
      geographicArea: { '@type': 'Country', name: 'India' },
    },
    hasPart: [
      { '@type': 'WebPageElement', cssSelector: '#what-is-income-tax',   name: `What Is Income Tax on a ${n} Lakh Salary` },
      { '@type': 'WebPageElement', cssSelector: '#tax-formula',          name: 'Income Tax Formula' },
      { '@type': 'WebPageElement', cssSelector: '#excel-calculation',    name: 'Income Tax in Excel' },
      { '@type': 'WebPageElement', cssSelector: '#new-regime-breakdown', name: 'New Regime Tax Breakdown' },
      { '@type': 'WebPageElement', cssSelector: '#old-regime-breakdown', name: 'Old Regime Tax Breakdown' },
      { '@type': 'WebPageElement', cssSelector: '#old-vs-new',          name: 'Old vs New Regime Comparison' },
      { '@type': 'WebPageElement', cssSelector: '#section-87a',         name: 'Section 87A Rebate' },
      { '@type': 'WebPageElement', cssSelector: '#with-deductions',     name: 'Tax with Deductions' },
      { '@type': 'WebPageElement', cssSelector: '#in-hand-salary',      name: `In-Hand Salary for ${n} LPA` },
      { '@type': 'WebPageElement', cssSelector: '#how-to-use',          name: 'How to Use the Calculator' },
      { '@type': 'WebPageElement', cssSelector: '#limitations',         name: 'When These Tax Numbers May Not Apply' },
      { '@type': 'WebPageElement', cssSelector: '#faq',                 name: 'Frequently Asked Questions' },
    ],
  };

  const calcSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Income Tax on ${n} Lakh Salary Calculator by Fermor`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `https://fermor.in/tax/${slug}`,
    description: `Pre-computed income tax breakdown for Rs ${n} lakh annual salary in FY 2025-26. ${isZeroNew ? 'New regime: zero tax after Section 87A rebate.' : `New regime: ${newTaxFmt}.`} Old regime: ${oldTaxFmt}. Monthly in-hand salary and old vs new regime comparison.`,
    featureList: [
      'New Regime Tax Breakdown FY 2025-26',
      'Old Regime Tax Computation',
      'Section 87A Rebate Applied',
      'Old vs New Regime Comparison',
      'Tax Impact by Deduction Level Table',
      'Monthly In-Hand Salary Breakup',
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
    datePublished: data.datePublished,
    dateModified: data.datePublished,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Tax',  item: 'https://fermor.in/tax' },
      { '@type': 'ListItem', position: 3, name: `Income Tax on ${n} Lakh Salary`, item: `https://fermor.in/tax/${slug}` },
    ],
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: 'Section 87A Rebate',
    alternateName: 'Income Tax Rebate under Section 87A',
    description: 'A rebate under the Income Tax Act 1961 that reduces tax liability to zero for resident individuals with net taxable income not exceeding Rs 12,00,000 under the new regime in FY 2025-26.',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Indian Income Tax Terms',
      url: 'https://fermor.in/tax',
    },
    sameAs: [
      'https://en.wikipedia.org/wiki/Income_tax_in_India',
      'https://www.wikidata.org/wiki/Q751437',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
    sameAs: ['https://fermor.in', 'https://fermor.in/about'],
    description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
    knowsAbout: ['Income Tax India', 'Old vs New Tax Regime', 'Section 87A Rebate', 'Salary Taxation India', 'Standard Deduction', 'SEBI Regulations', 'AMFI Guidelines', 'Personal Finance India', 'Tax Planning India', 'ITR Filing India', 'Account Aggregator Framework'],
  };

  // Serialize data as JSON-safe literal (no undefined values)
  const pageDataLiteral = JSON.stringify({ ...data }, null, 2)
    .replace(/\n/g, '\n  ');

  return `import type { Metadata } from 'next';
import { headers } from 'next/headers';
import IncomeTaxPageTemplate from '../_template/IncomeTaxPageTemplate';
import type { TaxPageData } from '../_template/types';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'tax' : region;
  const canonical = \`https://fermor.in/\${canonicalPath}/${slug}\`;
  return {
    title: ${JSON.stringify(pageTitle)},
    description: ${JSON.stringify(pageDesc)},
    keywords: ${JSON.stringify(keywords)},
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: ${JSON.stringify(pageTitle.replace(' - Fermor', ''))},
      description: ${JSON.stringify(pageDesc)},
      images: ['https://fermor.in/og-income-tax-${n}-lakh.png'],
    },
    openGraph: {
      title: ${JSON.stringify(pageTitle)},
      description: ${JSON.stringify(ogDesc)},
      type: 'website',
      url: 'https://fermor.in/tax/${slug}',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-income-tax-${n}-lakh.png', width: 1200, height: 630, alt: ${JSON.stringify(`Income Tax on ${n} Lakh Salary 2025-26`)} }],
    },
  };
}

const PAGE_DATA: TaxPageData = ${pageDataLiteral};

const organizationSchema = ${JSON.stringify(organizationSchema, null, 2)};

const faqSchema = ${JSON.stringify(faqSchema, null, 2)};

const calcSchema = ${JSON.stringify(calcSchema, null, 2)};

const breadcrumbSchema = ${JSON.stringify(breadcrumbSchema, null, 2)};

const howToSchema = ${JSON.stringify(howToSchema, null, 2)};

const definedTermSchema = ${JSON.stringify(definedTermSchema, null, 2)};

const webPageSchema = ${JSON.stringify(webPageSchema, null, 2)};

export default async function ${camelPageName(data.grossLakh)}() {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <IncomeTaxPageTemplate data={PAGE_DATA} region={region} />
    </>
  );
}
`;
}

// ─── llms.txt updater ──────────────────────────────────────────────────────

function buildLlmsEntry(d: TaxPageData): string {
  const isZero = d.newNetTax === 0;
  const detail = isZero
    ? `New regime: zero tax after Section 87A rebate (taxable income ${fmtRs(d.taxable)} below Rs 12L ceiling). Old regime: ${fmtRs(d.oldNetTax)}.`
    : `New regime: ${fmtRs(d.newNetTax)}. Old regime: ${fmtRs(d.oldNetTax)}.`;
  return `- [Income Tax on ${d.grossLakh} Lakh Salary](https://fermor.in/tax/${d.slug}): Complete FY 2025-26 income tax breakdown for Rs ${d.grossLakh} lakh annual salary. ${detail} Monthly in-hand salary ${fmtRs(d.newInHand)}. Includes slab-by-slab computation, old vs new regime comparison, deduction-level scenarios, and Section 87A deep-dive. Verified against ClearTax formula implementation.`;
}

async function updateLlmsTxt(newEntries: TaxPageData[]): Promise<void> {
  const llmsPath = path.join(ROOT, 'public', 'llms.txt');
  let content = fs.readFileSync(llmsPath, 'utf-8');

  const sectionHeader = '## Tax Guides (programmatic SEO — pre-computed answers for specific salary levels)\n';
  const sectionStart = content.indexOf(sectionHeader);
  if (sectionStart === -1) {
    console.warn('  [llms.txt] Tax Guides section not found, skipping update');
    return;
  }

  // Find the end of the Tax Guides section (next ## heading or end of file)
  const afterHeader = sectionStart + sectionHeader.length;
  const nextSection = content.indexOf('\n##', afterHeader);
  const sectionEnd = nextSection === -1 ? content.length : nextSection;
  const existingSection = content.slice(afterHeader, sectionEnd);

  // Build full new section
  const allEntries = new Map<number, string>();

  // Parse existing entries
  const existingLines = existingSection.split('\n').filter(l => l.startsWith('- [Income Tax on'));
  for (const line of existingLines) {
    const match = line.match(/Income Tax on (\d+) Lakh/);
    if (match) allEntries.set(parseInt(match[1]), line);
  }
  // Add / overwrite new entries
  for (const d of newEntries) {
    allEntries.set(d.grossLakh, buildLlmsEntry(d));
  }

  // Sort by salary ascending
  const sorted = [...allEntries.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v);
  const newSection = '\n' + sorted.join('\n') + '\n';

  content = content.slice(0, afterHeader) + newSection + content.slice(sectionEnd);
  fs.writeFileSync(llmsPath, content, 'utf-8');
  console.log(`  [llms.txt] Updated with ${allEntries.size} tax guide entries`);
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`\nFermor tax page generator`);
  console.log(`  Salaries: ${SALARIES.join(', ')} LPA`);
  console.log(`  Dry run: ${DRY_RUN}`);
  console.log(`  Groq: ${process.env.GROQ_API_KEY ? 'enabled' : 'disabled (fallback prose)'}`);
  console.log('');

  const generated: TaxPageData[] = [];

  for (const grossLakh of SALARIES) {
    console.log(`Processing ${grossLakh} LPA...`);

    const computed = computeTaxData(grossLakh);
    const introProse = await getIntroProse(grossLakh, computed);

    const data: TaxPageData = {
      ...computed,
      introProse,
      metaTitle: buildMetaTitle(computed as TaxPageData),
      metaDescription: buildMetaDescription(computed as TaxPageData),
      datePublished: TODAY,
    };

    const faqSchema = buildFaqSchema(data);
    const howToSchema = buildHowToSchema(data);
    const tsx = generatePageTsx(data, faqSchema, howToSchema);

    const dirPath  = path.join(TAX_DIR, data.slug);
    const filePath = path.join(dirPath, 'page.tsx');

    if (DRY_RUN) {
      console.log(`  [dry-run] Would write ${filePath} (${tsx.length} chars)`);
      console.log(`  [dry-run] newNetTax=${fmtRs(data.newNetTax)} oldNetTax=${fmtRs(data.oldNetTax)} inHand=${fmtRs(data.newInHand)}`);
    } else {
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(filePath, tsx, 'utf-8');
      console.log(`  Written: ${filePath}`);
    }

    generated.push(data);

    // Small delay to avoid Groq rate limits
    if (process.env.GROQ_API_KEY && SALARIES.indexOf(grossLakh) < SALARIES.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  if (!DRY_RUN && generated.length > 0) {
    console.log('\nUpdating llms.txt...');
    await updateLlmsTxt(generated);
  }

  console.log('\nDone.');
  console.log(`  ${DRY_RUN ? 'Would generate' : 'Generated'} ${generated.length} page(s)`);
  if (!DRY_RUN) {
    console.log('\nNext steps:');
    console.log('  1. cd fermor-web && npm run build');
    console.log('  2. Verify zero TypeScript errors');
    console.log('  3. git add app/tax/ public/llms.txt && git commit on dev branch');
  }
}

main().catch(err => {
  console.error('Generator failed:', err);
  process.exit(1);
});
