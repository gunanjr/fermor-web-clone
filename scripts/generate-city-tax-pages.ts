#!/usr/bin/env tsx
/**
 * Phase 2 generator: City × Salary income tax pages
 * Creates /tax/income-tax-on-[N]-lakh-salary-in-[city]/page.tsx
 *
 * Content AI: Gemini 1.5 Flash (primary) → Groq llama-3.1-8b (fallback)
 * Tax math:   All computed here — no AI involvement in numbers
 *
 * Usage:
 *   npx tsx scripts/generate-city-tax-pages.ts
 *   npx tsx scripts/generate-city-tax-pages.ts --dry-run
 *   npx tsx scripts/generate-city-tax-pages.ts --cities=bangalore,mumbai
 *   npx tsx scripts/generate-city-tax-pages.ts --salaries=10,15,20
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import type { CityTaxPageData, CityConfig } from '../app/tax/_template/city-types';

// ─── Auto-load .env.local ────────────────────────────────────────────────────
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const [k, ...rest] = line.trim().split('=');
    if (k && !k.startsWith('#') && !(k in process.env)) process.env[k] = rest.join('=');
  }
}

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const cityFilter = args.find(a => a.startsWith('--cities='))?.split('=')[1]?.split(',') ?? null;
const salaryFilter = args.find(a => a.startsWith('--salaries='))?.split('=')[1]?.split(',').map(Number) ?? null;

// ─── City config (inline — must stay in sync with city-types.ts) ─────────────
interface City {
  name: string; slug: string; state: string;
  profTaxPerYear: number; profTaxNote: string;
  isMetroHRA: boolean; hraExemptionPct: number;
  topEmployers: string[]; costOfLivingNote: string;
}

const ALL_CITIES: City[] = [
  // ── Phase 1 (indices 0-5) — date: 2026-06-23 ──────────────────────────────
  {
    name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', profTaxPerYear: 2500,
    profTaxNote: 'Karnataka levies Rs 2,500/year. For monthly salary of Rs 25,000 or above, employers deduct Rs 200 for 11 months and Rs 300 in February, totalling Rs 2,500 annually. Salaries below Rs 24,999/month are exempt.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['Infosys', 'Wipro', 'Google', 'Amazon', 'Flipkart', 'Accenture'],
    costOfLivingNote: "India's highest-paying IT market with above-average living costs",
  },
  {
    name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', profTaxPerYear: 2500,
    profTaxNote: 'Maharashtra levies Rs 2,500/year. For salary above Rs 10,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February under the Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['TCS', 'Reliance', 'HDFC Bank', 'Goldman Sachs', 'JP Morgan', 'Deloitte'],
    costOfLivingNote: 'Highest cost of living in India, especially housing and commute',
  },
  {
    name: 'Delhi', slug: 'delhi', state: 'Delhi', profTaxPerYear: 0,
    profTaxNote: 'Delhi (National Capital Territory) does not levy professional tax. Unlike Karnataka, Maharashtra, Telangana, and Tamil Nadu, Delhi has no state professional tax legislation for salaried employees.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['HCL', 'Tech Mahindra', 'Paytm', 'OYO', 'KPMG', 'PwC'],
    costOfLivingNote: 'No professional tax; highest take-home among all metro cities at the same gross salary',
  },
  {
    name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', profTaxPerYear: 2400,
    profTaxNote: 'Telangana levies Rs 2,400/year. For monthly salary above Rs 20,000, employers deduct a flat Rs 200 every month (12 months, no February variation). The Telangana Tax on Professions, Trades, Callings and Employments Act, 1987 governs this.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['Microsoft', 'Infosys', 'Cognizant', 'Apple', 'Meta', 'Amazon'],
    costOfLivingNote: 'Lower cost of living than Bangalore with comparable IT salaries',
  },
  {
    name: 'Pune', slug: 'pune', state: 'Maharashtra', profTaxPerYear: 2500,
    profTaxNote: 'Maharashtra levies Rs 2,500/year. For salary above Rs 10,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February. Pune follows the same Maharashtra PT schedule as Mumbai.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['TCS', 'Infosys', 'Capgemini', 'Cognizant', 'Bajaj Auto', 'Persistent'],
    costOfLivingNote: 'More affordable than Mumbai with strong IT and manufacturing sectors',
  },
  {
    name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', profTaxPerYear: 2500,
    profTaxNote: 'Tamil Nadu levies Rs 2,500/year. Under the Tamil Nadu Professional Tax Rules, salaried employees earning above Rs 21,000/month pay approximately Rs 208/month (Rs 2,500/year).',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['HCL', 'Cognizant', 'TCS', 'Zoho', 'Ford India', 'Hyundai'],
    costOfLivingNote: 'Metro HRA benefit with below-average cost of living vs Mumbai and Delhi',
  },
  // ── Phase 2 (indices 6-19) — date: 2026-06-24 ─────────────────────────────
  {
    name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', profTaxPerYear: 2500,
    profTaxNote: 'West Bengal levies Rs 2,500/year professional tax. For salary above Rs 25,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February under the West Bengal State Tax on Professions, Trades, Callings and Employments Act, 1979.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['TCS', 'Wipro', 'Cognizant', 'ITC', 'Infosys', 'Coal India'],
    costOfLivingNote: 'Most affordable major metro in India with a robust IT and BFSI job market',
  },
  {
    name: 'Noida', slug: 'noida', state: 'Uttar Pradesh', profTaxPerYear: 0,
    profTaxNote: 'Uttar Pradesh does not levy professional tax. Salaried employees in Noida pay zero professional tax, resulting in higher monthly take-home compared to Bangalore, Mumbai, or Chennai earners at the same gross salary.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['HCL', 'Samsung', 'Adobe', 'Sapient', 'Infoedge', 'NIIT'],
    costOfLivingNote: 'No professional tax state; cost of living lower than Gurgaon with strong IT sector proximity to Delhi',
  },
  {
    name: 'Gurgaon', slug: 'gurgaon', state: 'Haryana', profTaxPerYear: 0,
    profTaxNote: 'Haryana does not levy professional tax. Salaried employees in Gurgaon (Gurugram) pay zero professional tax, keeping monthly take-home higher than comparable earners in Bangalore or Pune.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Maruti Suzuki', 'DLF', 'Deloitte', 'EY', 'Google', 'Microsoft'],
    costOfLivingNote: 'No professional tax with premium residential areas; one of the highest-paying IT and consulting markets in NCR',
  },
  {
    name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', profTaxPerYear: 2400,
    profTaxNote: 'Gujarat levies Rs 2,400/year professional tax. Employers deduct a flat Rs 200 per month under the Gujarat Panchayats, Municipal Corporations and State Tax on Professions, Trades, Callings and Employments Act, 1976.',
    isMetroHRA: true, hraExemptionPct: 50,
    topEmployers: ['Adani Group', 'Zydus', 'Torrent Pharma', 'Sun Pharma', 'ISRO', 'L&T'],
    costOfLivingNote: 'Metro HRA classification under 2026 rules with below-average cost of living; strong pharma and logistics sector',
  },
  {
    name: 'Kochi', slug: 'kochi', state: 'Kerala', profTaxPerYear: 2500,
    profTaxNote: 'Kerala levies professional tax up to Rs 2,500/year. For salary above Rs 20,000/month, the maximum annual deduction is Rs 2,500 collected as Rs 1,250 half-yearly under the Kerala Municipality Act and local body schedules.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Infosys', 'TCS', 'UST Global', 'IBS Group', 'Wipro', 'Cognizant'],
    costOfLivingNote: 'Strong IT services and shipping sector; below-average rent and living costs versus comparable IT cities',
  },
  {
    name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra', profTaxPerYear: 2500,
    profTaxNote: 'Maharashtra levies Rs 2,500/year professional tax. For salary above Rs 10,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February. Nagpur follows the same Maharashtra PT schedule as Mumbai and Pune.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Infosys', 'TCS', 'Wipro', 'HCL', 'NMDC', 'Coal India'],
    costOfLivingNote: 'Central India logistics hub with significantly lower cost of living than Mumbai or Pune',
  },
  {
    name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu', profTaxPerYear: 2500,
    profTaxNote: 'Tamil Nadu levies Rs 2,500/year professional tax. Salaried employees earning above Rs 21,000/month pay Rs 1,250 half-yearly under the Tamil Nadu Professional Tax Rules. Coimbatore follows the same state schedule as Chennai.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Robert Bosch', 'Pricol', 'LMW', 'Wipro', 'Cognizant', 'TCS'],
    costOfLivingNote: 'Manufacturing and textile hub with fast-growing IT sector; cost of living substantially below Chennai',
  },
  {
    name: 'Surat', slug: 'surat', state: 'Gujarat', profTaxPerYear: 2400,
    profTaxNote: 'Gujarat levies Rs 2,400/year professional tax. Employers deduct a flat Rs 200 per month under the Gujarat professional tax law. Surat follows the same Gujarat state PT schedule as Ahmedabad.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Reliance', 'Adani', 'Garden Silk Mills', 'ONGC', 'TCS', 'HCL'],
    costOfLivingNote: 'Diamond and textile trading capital with one of the lowest costs of living among major business cities',
  },
  {
    name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', profTaxPerYear: 0,
    profTaxNote: 'Rajasthan does not levy professional tax on salaried employees. Jaipur earners pay zero professional tax, adding Rs 200-208/month to take-home compared to Bangalore or Mumbai employees at the same gross salary.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Infosys', 'Wipro', 'HCL', 'Concentrix', 'Genpact', 'EXL'],
    costOfLivingNote: 'No professional tax state with rapidly growing IT services sector and below-average housing costs',
  },
  {
    name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', profTaxPerYear: 0,
    profTaxNote: 'Uttar Pradesh does not levy professional tax. Salaried employees in Lucknow, like those in Noida, pay zero professional tax on their monthly salary.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['HCL', 'TCS', 'Wipro', 'Infosys', 'NTPC', 'Indian Railways'],
    costOfLivingNote: 'No professional tax state; fast-growing Lucknow IT corridor with strong government and PSU sector',
  },
  {
    name: 'Chandigarh', slug: 'chandigarh', state: 'Chandigarh (UT)', profTaxPerYear: 0,
    profTaxNote: 'Chandigarh, as a Union Territory, does not levy any professional tax. Salaried employees in Chandigarh retain their full gross minus PF and income tax TDS, paying zero professional tax.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['Infosys', 'Quark', 'Impetus', 'Nagarro', 'Dell', 'HCL'],
    costOfLivingNote: 'Zero professional tax UT with planned city infrastructure and moderate cost of living versus metro cities',
  },
  {
    name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh', profTaxPerYear: 2500,
    profTaxNote: 'Andhra Pradesh levies Rs 2,500/year professional tax (the full constitutional maximum under Article 276). For salary above Rs 20,000/month, employers deduct Rs 200 for 11 months and Rs 300 in March under the AP Tax on Professions Act.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['HCL', 'Wipro', 'Infosys', 'HPCL', 'RINL Steel', 'NTPC'],
    costOfLivingNote: 'Coastal IT and port city with one of the lowest costs of living among major Andhra Pradesh business hubs',
  },
  {
    name: 'Indore', slug: 'indore', state: 'Madhya Pradesh', profTaxPerYear: 2500,
    profTaxNote: 'Madhya Pradesh levies Rs 2,500/year professional tax. Employers deduct approximately Rs 208/month for 11 months and a slightly adjusted amount in the 12th month under the Madhya Pradesh Vritti Kar Adhiniyam.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['TCS', 'Infosys', 'Wipro', 'Impetus', 'KPIT', 'HCL'],
    costOfLivingNote: "India's Cleanest City with a growing IT corridor; significantly lower real estate and living costs than Pune or Bangalore",
  },
  {
    name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh', profTaxPerYear: 2500,
    profTaxNote: 'Madhya Pradesh levies Rs 2,500/year professional tax. Bhopal, as the state capital, follows the same MP PT schedule. Employers deduct approximately Rs 208/month across the year.',
    isMetroHRA: false, hraExemptionPct: 40,
    topEmployers: ['HCL', 'Wipro', 'Infosys', 'BHEL', 'NTPC', 'Gas Authority of India'],
    costOfLivingNote: 'State capital with large government and PSU employer base; cost of living among the lowest of any major Indian city',
  },
];

const SALARIES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25, 30, 35, 40, 50];

const CITIES = cityFilter ? ALL_CITIES.filter(c => cityFilter.includes(c.slug)) : ALL_CITIES;
const SALARY_LIST = salaryFilter ?? SALARIES;

// ─── Tax math (identical to tax page generator) ───────────────────────────────
const NEW_SLABS: [number, number, number][] = [
  [0, 400000, 0], [400000, 800000, 0.05], [800000, 1200000, 0.10],
  [1200000, 1600000, 0.15], [1600000, 2000000, 0.20],
  [2000000, 2400000, 0.25], [2400000, Infinity, 0.30],
];
const OLD_SLABS: [number, number, number][] = [
  [0, 250000, 0], [250000, 500000, 0.05],
  [500000, 1000000, 0.20], [1000000, Infinity, 0.30],
];

function applySlabs(taxable: number, slabs: [number, number, number][]): number {
  let tax = 0;
  for (const [from, to, rate] of slabs) {
    if (taxable <= from) break;
    tax += (Math.min(taxable, to === Infinity ? taxable : to) - from) * rate;
  }
  return Math.round(tax);
}

function surchargeRate(taxable: number): number {
  if (taxable <= 5000000) return 0;
  if (taxable <= 10000000) return 0.10;
  if (taxable <= 20000000) return 0.15;
  return 0.25;
}

function computeFull(taxable: number, slabs: [number, number, number][], rebateCeiling: number, maxRebate: number) {
  const base = applySlabs(taxable, slabs);
  const surcharge = Math.round(base * surchargeRate(taxable));
  const rebate = taxable <= rebateCeiling ? Math.min(base, maxRebate) : 0;
  const taxAfterRebate = Math.max(0, base + surcharge - rebate);
  const cess = Math.round(taxAfterRebate * 0.04);
  return { base, surcharge, rebate, cess, net: taxAfterRebate + cess };
}

function computeCityData(grossLakh: number, city: City): Omit<CityTaxPageData, 'introProse' | 'cityContextProse' | 'metaTitle' | 'metaDescription' | 'datePublished'> {
  const gross = grossLakh * 100000;
  const newTaxable = gross - 75000;
  const oldTaxable = gross - 50000;

  const newResult = computeFull(newTaxable, NEW_SLABS, 1200000, 60000);
  const oldResult = computeFull(oldTaxable, OLD_SLABS, 500000, 12500);

  const monthlyGross = Math.round(gross / 12);
  const monthlyBasic = Math.round(monthlyGross * 0.5);
  const monthlyHRA = Math.round(monthlyGross * 0.2);
  const monthlySpecial = monthlyGross - monthlyBasic - monthlyHRA;
  const monthlyPF = Math.round(monthlyBasic * 0.12);
  const profTaxMonthly = Math.round(city.profTaxPerYear / 12);

  const newMonthlyTds = Math.round(newResult.net / 12);
  const oldMonthlyTds = Math.round(oldResult.net / 12);
  const newInHand = monthlyGross - monthlyPF - profTaxMonthly - newMonthlyTds;
  const oldInHand = monthlyGross - monthlyPF - profTaxMonthly - oldMonthlyTds;

  // HRA exemption estimate (assuming rent = 30% of monthly gross)
  const assumedRent = Math.round(monthlyGross * 0.3);
  const hraPct = city.hraExemptionPct / 100;
  const hraMonthly = Math.min(monthlyHRA, monthlyBasic * hraPct, Math.max(0, assumedRent - monthlyBasic * 0.1));
  const hraExemption = Math.round(hraMonthly * 12);

  return {
    grossLakh, slug: `income-tax-on-${grossLakh}-lakh-salary-in-${city.slug}`,
    gross, newTaxable, oldTaxable,
    newBaseTax: newResult.base, new87ARebate: newResult.rebate, newNetTax: newResult.net,
    newSurcharge: newResult.surcharge, newCess: newResult.cess, newMonthlyTds,
    oldBaseTax: oldResult.base, old87ARebate: oldResult.rebate, oldNetTax: oldResult.net,
    oldSurcharge: oldResult.surcharge, oldCess: oldResult.cess, oldMonthlyTds,
    monthlyGross, monthlyBasic, monthlyHRA, monthlySpecial, monthlyPF,
    newInHand, oldInHand, profTaxMonthly, hraExemption,
    hraExemptionPct: city.hraExemptionPct, city: city as any,
  };
}

// ─── Gemini API ───────────────────────────────────────────────────────────────
async function callGemini(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('No GEMINI_API_KEY');

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.75, maxOutputTokens: 300 },
  });

  return new Promise((resolve, reject) => {
    const url = `/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
    const req = https.request({ hostname: 'generativelanguage.googleapis.com', path: url, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => {
      let data = '';
      res.on('data', d => { data += d; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return reject(new Error(json.error.message));
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
          resolve(text.trim());
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Groq API (fallback) ──────────────────────────────────────────────────────
async function callGroq(prompt: string): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('No GROQ_API_KEY');

  const body = JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], max_tokens: 250, temperature: 0.7 });

  return new Promise((resolve, reject) => {
    const req = https.request({ hostname: 'api.groq.com', path: '/openai/v1/chat/completions', method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}`, 'Content-Length': Buffer.byteLength(body) } }, res => {
      let data = '';
      res.on('data', d => { data += d; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.choices?.[0]?.message?.content?.trim() ?? '');
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Intro is always deterministic — AI must never invent tax numbers
function buildIntro(grossLakh: number, city: City, d: ReturnType<typeof computeCityData>): string {
  const isZero = d.newNetTax === 0;
  const taxLine = isZero
    ? `zero income tax under the new regime (Section 87A rebate covers the full Rs ${d.newBaseTax.toLocaleString('en-IN')} liability)`
    : `Rs ${d.newNetTax.toLocaleString('en-IN')} income tax under the new regime (old regime: Rs ${d.oldNetTax.toLocaleString('en-IN')} without deductions)`;
  return `A Rs ${grossLakh} lakh annual salary in ${city.name} (${city.state}) results in ${taxLine} for FY 2025-26. After professional tax of Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/year, employee PF at 12% of basic, and TDS, monthly in-hand salary in ${city.name} is Rs ${d.newInHand.toLocaleString('en-IN')}.`;
}

// Context paragraph: AI for qualitative colour, never for numbers
function buildContextFallback(grossLakh: number, city: City): string {
  const hraNote = city.isMetroHRA
    ? `As a metro city under the Income Tax Act, ${city.name} qualifies for the 50% HRA exemption rate for old regime filers paying significant rent.`
    : `${city.name} is classified as non-metro under the Income Tax Act, so HRA exemption is capped at 40% of basic salary rather than the 50% available in Mumbai, Delhi, or Chennai.`;
  return `In ${city.name}, a Rs ${grossLakh} lakh salary is competitive within the ${city.topEmployers.slice(0, 2).join(' and ')} hiring market. ${city.costOfLivingNote}. ${hraNote}`;
}

function isValidContextText(text: string): boolean {
  if (!text || text.length < 60 || text.length > 600) return false;
  if (/[—]/.test(text)) return false; // em dashes banned
  // Reject if AI hallucinated financial numbers not provided in the prompt
  const numbers = text.match(/\b\d[\d,]*\b/g) ?? [];
  const allowedNumbers = [String(new Date().getFullYear()), '2025', '2026', '40', '50', '12', '80'];
  for (const n of numbers) {
    if (!allowedNumbers.some(a => n.includes(a))) return false;
  }
  return true;
}

async function getContent(grossLakh: number, city: City, d: ReturnType<typeof computeCityData>): Promise<{ intro: string; context: string }> {
  const intro = buildIntro(grossLakh, city, d); // always deterministic
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (!hasGemini && !hasGroq) return { intro, context: buildContextFallback(grossLakh, city) };

  const contextPrompt = `Write exactly 2 sentences about working in ${city.name} (${city.state}) at the Rs ${grossLakh} lakh annual salary level.

HARD RULES — violation means the response will be discarded:
1. Zero digits in your response. No numbers at all.
2. No em dashes (use commas or periods instead).
3. No HRA calculations, no tax maths, no salary-to-net breakdowns.
4. Write ONLY about: job market character, cost of living, employer culture, city lifestyle at this salary band.

FACTS to draw from (paraphrase, do not quote numbers):
- City character: ${city.costOfLivingNote}
- HRA context: ${city.isMetroHRA ? 'metro city' : 'non-metro city'} classification under Indian tax law
- Top employers: ${city.topEmployers.slice(0, 4).join(', ')}

Style: senior Indian finance journalist. Confident, specific, no hedging. No filler like "it is worth noting" or "comprehensive".`;

  const tryAI = async (): Promise<string> => {
    if (hasGemini) {
      try {
        const text = await callGemini(contextPrompt);
        console.log(`  [Gemini] OK (${text.length} chars)`);
        return text;
      } catch (e) {
        console.warn(`  [Gemini] Failed: ${(e as Error).message} — trying Groq`);
      }
    }
    if (hasGroq) {
      try {
        const text = await callGroq(contextPrompt);
        console.log(`  [Groq] OK (${text.length} chars)`);
        return text;
      } catch (e) {
        console.warn(`  [Groq] Failed: ${(e as Error).message}`);
      }
    }
    return '';
  };

  try {
    const contextRaw = await tryAI();
    const context = isValidContextText(contextRaw) ? contextRaw : buildContextFallback(grossLakh, city);
    if (contextRaw && !isValidContextText(contextRaw)) {
      console.warn(`  [AI] Context failed validation (digits or em dash found) — using deterministic fallback.`);
    }
    return { intro, context };
  } catch (e) {
    console.warn(`  [AI] Error: ${(e as Error).message}. Using fallback.`);
    return { intro, context: buildContextFallback(grossLakh, city) };
  }
}

// ─── JSON-LD schemas (all 7 required) ────────────────────────────────────────
function buildSchemas(d: CityTaxPageData & { city: City }) {
  const url = `https://fermor.in/tax/${d.slug}`;
  const city = d.city;
  const ptMonthly = city.profTaxPerYear === 0 ? 0 : Math.round(city.profTaxPerYear / 12);
  const newTaxLabel = d.newNetTax === 0 ? 'zero' : `Rs ${d.newNetTax.toLocaleString('en-IN')}`;

  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' },
      { '@type': 'ListItem', position: 3, name: `Rs ${d.grossLakh}L Salary Tax`, item: `https://fermor.in/tax/income-tax-on-${d.grossLakh}-lakh-salary` },
      { '@type': 'ListItem', position: 4, name: `${city.name} Tax Breakdown`, item: url },
    ],
  };

  const webPage = {
    '@context': 'https://schema.org', '@type': 'WebPage',
    '@id': url, name: d.metaTitle, description: d.metaDescription, url,
    inLanguage: 'en-IN',
    datePublished: d.datePublished, dateModified: d.datePublished,
    isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
    author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
    publisher: {
      '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
      logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
    },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
    audience: {
      '@type': 'Audience',
      audienceType: 'Indian salaried employees, job seekers, tax filers',
      geographicArea: { '@type': 'Country', name: 'India' },
    },
    hasPart: [
      { '@type': 'WebPageElement', cssSelector: '#professional-tax', name: `Professional Tax in ${city.name}` },
      { '@type': 'WebPageElement', cssSelector: '#inhand-breakdown', name: 'Monthly In-Hand Breakdown' },
      { '@type': 'WebPageElement', cssSelector: '#hra-exemption', name: `HRA Exemption in ${city.name}` },
      { '@type': 'WebPageElement', cssSelector: '#city-comparison', name: 'City-by-City In-Hand Comparison' },
      { '@type': 'WebPageElement', cssSelector: '#salary-context', name: `Job Market in ${city.name}` },
      { '@type': 'WebPageElement', cssSelector: '#new-vs-old', name: 'New vs Old Tax Regime' },
      { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
    ],
  };

  const webApplication = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: `Income Tax Calculator for Rs ${d.grossLakh}L Salary in ${city.name}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url,
    featureList: [
      'New Regime Tax Breakdown (FY 2025-26)',
      'Old Regime Tax Breakdown',
      'Monthly In-Hand Salary Calculation',
      'Professional Tax Comparison Across Cities',
      'HRA Exemption Estimate',
      'Multi-currency display (INR, USD, EUR, GBP)',
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
    datePublished: d.datePublished,
  };

  const howTo = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: `How to Calculate Income Tax on Rs ${d.grossLakh} Lakh Salary in ${city.name} (FY 2025-26)`,
    totalTime: 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'Fermor Tax Calculator' }],
    step: [
      {
        '@type': 'HowToStep', position: 1,
        name: 'Check new regime tax',
        text: `Under the new regime, the Rs ${d.grossLakh} lakh salary has a taxable income of Rs ${d.newTaxable.toLocaleString('en-IN')} after the Rs 75,000 standard deduction. Income tax is ${newTaxLabel}${d.newNetTax === 0 ? ', fully covered by the Section 87A rebate' : ''}.`,
      },
      {
        '@type': 'HowToStep', position: 2,
        name: 'Compare with old regime',
        text: `Under the old regime (without additional deductions like 80C or HRA), taxable income is Rs ${d.oldTaxable.toLocaleString('en-IN')} and tax is Rs ${d.oldNetTax.toLocaleString('en-IN')}. The new regime saves Rs ${(d.oldNetTax - d.newNetTax).toLocaleString('en-IN')} for this salary level.`,
      },
      {
        '@type': 'HowToStep', position: 3,
        name: 'Deduct PF and professional tax',
        text: `Employee PF is Rs ${d.monthlyPF.toLocaleString('en-IN')}/month (12% of basic salary). Professional tax in ${city.name} is Rs ${ptMonthly}/month. Total deductions leave a monthly in-hand of Rs ${d.newInHand.toLocaleString('en-IN')} under the new regime.`,
      },
      {
        '@type': 'HowToStep', position: 4,
        name: 'Compare with other cities',
        text: `Scroll to the city comparison table to see how ${city.name}'s professional tax of Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/year compares with Delhi (no PT) and other cities. Delhi employees take home Rs ${(city.profTaxPerYear / 12).toFixed(0)} more per month at the same gross salary.`,
      },
    ],
  };

  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'Fermor', url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
    sameAs: ['https://fermor.in', 'https://fermor.in/about'],
    description: 'Fermor is India\'s automated personal finance platform for income tax calculations, HRA exemptions, SIP planning, and compliance tools.',
    knowsAbout: [
      'Income Tax India', 'Professional Tax India', 'HRA Exemption', 'TDS Calculation',
      'New Tax Regime 2025-26', 'Old Tax Regime', 'Section 87A Rebate', 'Account Aggregator Framework',
      'Employee PF Deduction', 'Personal Finance India',
    ],
    contactPoint: { '@type': 'ContactPoint', email: 'contact@fermor.in', contactType: 'Customer Support' },
  };

  const definedTerm = {
    '@context': 'https://schema.org', '@type': 'DefinedTerm',
    name: 'Professional Tax',
    alternateName: 'PT',
    description: city.profTaxNote,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Indian Tax and Finance Glossary',
      url: 'https://fermor.in/calculators',
    },
    sameAs: [
      'https://en.wikipedia.org/wiki/Professional_tax',
      'https://www.wikidata.org/wiki/Q6256538',
    ],
  };

  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much income tax on Rs ${d.grossLakh} lakh salary in ${city.name} in FY 2025-26?`,
        acceptedAnswer: { '@type': 'Answer', text: `Under the new tax regime in FY 2025-26, income tax on a Rs ${d.grossLakh} lakh salary in ${city.name} is ${newTaxLabel}. Under the old regime (without deductions), tax is Rs ${d.oldNetTax.toLocaleString('en-IN')}. Monthly TDS (new regime) is Rs ${d.newMonthlyTds.toLocaleString('en-IN')}.` }
      },
      {
        '@type': 'Question',
        name: `What is the monthly in-hand salary for Rs ${d.grossLakh} LPA in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `For Rs ${d.grossLakh} lakh CTC in ${city.name}, monthly in-hand under the new regime is approximately Rs ${d.newInHand.toLocaleString('en-IN')}. Deductions: employee PF Rs ${d.monthlyPF.toLocaleString('en-IN')}/month, professional tax Rs ${ptMonthly}/month, TDS Rs ${d.newMonthlyTds.toLocaleString('en-IN')}/month.` }
      },
      {
        '@type': 'Question',
        name: `What is the professional tax in ${city.name} for a Rs ${d.grossLakh} lakh salary?`,
        acceptedAnswer: { '@type': 'Answer', text: city.profTaxPerYear === 0 ? `Delhi does not levy professional tax. Salaried employees in Delhi take home Rs 208/month more than comparable earners in Bangalore or Mumbai (which charge Rs 2,500/year PT).` : `${city.profTaxNote} For a Rs ${d.grossLakh} lakh salary, the monthly professional tax deduction is Rs ${ptMonthly}.` }
      },
      {
        '@type': 'Question',
        name: `Is HRA exemption 40% or 50% in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: city.isMetroHRA ? `${city.name} is classified as a metro city under Section 10(13A) of the Income Tax Act. HRA exemption under the old regime is the minimum of: actual HRA received, 50% of basic salary, or rent paid minus 10% of basic salary.` : `${city.name} is classified as a non-metro city under the Income Tax Act. HRA exemption under the old regime is capped at 40% of basic salary (not 50% as in Mumbai, Delhi, or Chennai), which reduces the old regime tax advantage for rent-payers.` }
      },
      {
        '@type': 'Question',
        name: `New regime vs old regime: which is better for Rs ${d.grossLakh} lakh salary in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `For Rs ${d.grossLakh} lakh salary in ${city.name} with no deductions, the new regime saves Rs ${(d.oldNetTax - d.newNetTax).toLocaleString('en-IN')} in tax. The old regime becomes better only if total deductions (80C, HRA, NPS, etc.) exceed Rs ${Math.round((d.oldNetTax - d.newNetTax) * 3).toLocaleString('en-IN')} approximately. Most employees at this salary level benefit from the new regime.` }
      },
      {
        '@type': 'Question',
        name: `What is the basic salary for Rs ${d.grossLakh} lakh CTC?`,
        acceptedAnswer: { '@type': 'Answer', text: `Typically, basic salary is set at 40-50% of CTC. For Rs ${d.grossLakh} lakh annual CTC, the monthly basic is approximately Rs ${d.monthlyBasic.toLocaleString('en-IN')}. Employee PF (12% of basic) deducted per month is Rs ${d.monthlyPF.toLocaleString('en-IN')}. HRA is typically 40-50% of basic: Rs ${d.monthlyHRA.toLocaleString('en-IN')}/month.` }
      },
      {
        '@type': 'Question',
        name: `Does Bangalore professional tax apply to all employees earning Rs ${d.grossLakh} lakh?`,
        acceptedAnswer: { '@type': 'Answer', text: `Karnataka's professional tax of Rs 2,500/year applies to salaried employees earning above Rs 24,999/month (i.e., Rs 3 lakh+ per year). A Rs ${d.grossLakh} lakh salary is well above this threshold. The annual Rs 2,500 is deducted as Rs 200 for 11 months and Rs 300 in February.` }
      },
      {
        '@type': 'Question',
        name: `How much PF is deducted for Rs ${d.grossLakh} lakh salary?`,
        acceptedAnswer: { '@type': 'Answer', text: `Employee PF contribution is 12% of basic salary per month. For Rs ${d.grossLakh} lakh CTC with a basic of Rs ${d.monthlyBasic.toLocaleString('en-IN')}/month, the monthly PF deduction is Rs ${d.monthlyPF.toLocaleString('en-IN')}. Employer also contributes Rs ${d.monthlyPF.toLocaleString('en-IN')}/month (not deducted from take-home). Annual employee PF contribution is Rs ${(d.monthlyPF * 12).toLocaleString('en-IN')}.` }
      },
      {
        '@type': 'Question',
        name: `What is Section 87A rebate and does it apply to Rs ${d.grossLakh} lakh salary?`,
        acceptedAnswer: { '@type': 'Answer', text: d.grossLakh <= 12 ? `The Section 87A rebate gives a full tax rebate for taxable income up to Rs 7 lakh under the new regime. For Rs ${d.grossLakh} lakh salary, taxable income after the Rs 75,000 standard deduction is Rs ${d.newTaxable.toLocaleString('en-IN')}, which is within the rebate limit. Income tax is effectively zero.` : `The Section 87A rebate applies only for taxable income up to Rs 7 lakh (new regime). For Rs ${d.grossLakh} lakh salary, taxable income is Rs ${d.newTaxable.toLocaleString('en-IN')}, which is above the limit, so the full tax of Rs ${d.newBaseTax.toLocaleString('en-IN')} plus 4% cess applies.` }
      },
      {
        '@type': 'Question',
        name: `How is TDS calculated on Rs ${d.grossLakh} lakh salary?`,
        acceptedAnswer: { '@type': 'Answer', text: `TDS (Tax Deducted at Source) is the annual income tax divided by 12. For Rs ${d.grossLakh} lakh salary under the new regime with annual tax of Rs ${d.newNetTax.toLocaleString('en-IN')}, monthly TDS is Rs ${d.newMonthlyTds.toLocaleString('en-IN')}. The employer deducts this from monthly pay and deposits it with the government under Section 192.` }
      },
    ],
  };

  return { breadcrumb, webPage, webApplication, howTo, organization, definedTerm, faq };
}

function buildKeywords(grossLakh: number, city: City): string[] {
  const n = grossLakh;
  const c = city.name;
  const s = city.state;
  const sl = city.slug;
  return [
    `income tax on ${n} lakh salary in ${c}`,
    `${n} lpa salary ${c} tax`,
    `${n} lakh salary in hand ${c}`,
    `${n} lpa in hand salary ${c}`,
    `professional tax ${c}`,
    `income tax ${c} FY 2025-26`,
    `${n} lakh ctc ${c} monthly salary`,
    `new regime tax ${n} lakh ${c}`,
    `old regime tax ${n} lakh ${c}`,
    `HRA exemption ${c}`,
    `${n} lakh salary ${s} income tax`,
    `income tax calculator ${c}`,
    `TDS on ${n} lakh salary`,
    `${n} lpa monthly take home ${c}`,
    `professional tax ${s}`,
    `section 87A rebate ${n} lakh`,
    `standard deduction new regime 2025`,
    `employee PF deduction ${n} lakh`,
    `${c} salary after tax ${n} lakh`,
    `income tax India FY 2025-26 ${c}`,
    `${n} lakh annual package ${c} in hand`,
    `${sl} income tax breakdown`,
    `${n} lakhs salary tax slab India`,
    `how much tax on ${n} lakh salary India`,
  ];
}

// ─── Page TSX generator ───────────────────────────────────────────────────────
function generatePageTsx(d: CityTaxPageData & { city: City }): string {
  const schemas = buildSchemas(d);
  const canonicalUrl = `https://fermor.in/tax/${d.slug}`;
  const keywords = buildKeywords(d.grossLakh, d.city);

  const dataJson = JSON.stringify({
    ...d,
    city: {
      name: d.city.name, slug: d.city.slug, state: d.city.state,
      profTaxPerYear: d.city.profTaxPerYear, profTaxNote: d.city.profTaxNote,
      isMetroHRA: d.city.isMetroHRA, hraExemptionPct: d.city.hraExemptionPct,
      topEmployers: d.city.topEmployers, costOfLivingNote: d.city.costOfLivingNote,
    },
  }, null, 2);

  return `import { headers } from 'next/headers';
import type { Metadata } from 'next';
import CityTaxPageTemplate from '../_template/CityTaxPageTemplate';
import type { CityTaxPageData } from '../_template/city-types';

export const metadata: Metadata = {
  title: ${JSON.stringify(d.metaTitle.replace(' - Fermor', ''))},
  description: ${JSON.stringify(d.metaDescription)},
  keywords: ${JSON.stringify(keywords)},
  alternates: { canonical: ${JSON.stringify(canonicalUrl)} },
  openGraph: {
    title: ${JSON.stringify(d.metaTitle)},
    description: ${JSON.stringify(d.metaDescription)},
    type: 'article',
    url: ${JSON.stringify(canonicalUrl)},
    siteName: 'Fermor',
    publishedTime: ${JSON.stringify(d.datePublished)},
    modifiedTime: ${JSON.stringify(d.datePublished)},
    images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: ${JSON.stringify(d.metaTitle)} }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ${JSON.stringify(d.metaTitle)},
    description: ${JSON.stringify(d.metaDescription)},
    images: ['https://fermor.in/og-tax.png'],
    site: '@fermor_in',
  },
};

const PAGE_DATA: CityTaxPageData = ${dataJson};

const breadcrumbSchema = ${JSON.stringify(schemas.breadcrumb, null, 2)};
const webPageSchema = ${JSON.stringify(schemas.webPage, null, 2)};
const webApplicationSchema = ${JSON.stringify(schemas.webApplication, null, 2)};
const howToSchema = ${JSON.stringify(schemas.howTo, null, 2)};
const organizationSchema = ${JSON.stringify(schemas.organization, null, 2)};
const definedTermSchema = ${JSON.stringify(schemas.definedTerm, null, 2)};
const faqSchema = ${JSON.stringify(schemas.faq, null, 2)};

export default async function Page() {
  await headers(); // marks page as dynamic for Next.js
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CityTaxPageTemplate data={PAGE_DATA} />
    </>
  );
}
`;
}

// Phase 1 cities (index 0-5) published 2026-06-23; Phase 2 cities (index 6+) published 2026-06-24.
// Time slots spread across 7am-11pm IST using a deterministic hash so each page has a unique timestamp.
function spreadDate(cityIdx: number, salaryIdx: number): string {
  const dateStr = cityIdx < 6 ? '2026-06-23' : '2026-06-24';
  const totalMinutes = 16 * 60; // 7am to 11pm = 960 min window
  const hash = ((cityIdx * 31 + salaryIdx * 17) * 7 + cityIdx * 3 + salaryIdx) % totalMinutes;
  const minuteOfDay = 7 * 60 + hash;
  const hh = Math.floor(minuteOfDay / 60).toString().padStart(2, '0');
  const mm = (minuteOfDay % 60).toString().padStart(2, '0');
  return `${dateStr}T${hh}:${mm}:00+05:30`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\nFermor city tax page generator — Phase 2');
  console.log(`  Cities:   ${CITIES.map(c => c.name).join(', ')}`);
  console.log(`  Salaries: ${SALARY_LIST.join(', ')} LPA`);
  console.log(`  AI:       ${process.env.GEMINI_API_KEY ? 'Gemini (primary)' : ''}${process.env.GROQ_API_KEY ? ' + Groq (fallback)' : ''}${!process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY ? 'none — using static fallback' : ''}`);
  console.log(`  Dry run:  ${DRY_RUN}`);
  console.log(`  Dates:    Phase 1 cities → 2026-06-23, Phase 2 cities → 2026-06-24 (varied IST slots)\n`);

  let count = 0;
  const taxDir = path.resolve(process.cwd(), 'app/tax');

  for (const city of CITIES) {
    const cityIdx = ALL_CITIES.findIndex(c => c.slug === city.slug);
    for (const lakh of SALARY_LIST) {
      const salaryIdx = SALARIES.indexOf(lakh);
      const datePublished = spreadDate(cityIdx, salaryIdx >= 0 ? salaryIdx : SALARY_LIST.indexOf(lakh));
      console.log(`Processing ${lakh}L — ${city.name}... (date: ${datePublished})`);

      const baseData = computeCityData(lakh, city);
      const { intro, context } = await getContent(lakh, city, baseData);

      const metaTitle = `Income Tax on ${lakh}L Salary in ${city.name} FY 2025-26 - Fermor`;
      const desc = `Income tax on Rs ${lakh} lakh salary in ${city.name}: ${baseData.newNetTax === 0 ? 'zero tax' : `Rs ${baseData.newNetTax.toLocaleString('en-IN')} new regime`}, Rs ${baseData.oldNetTax.toLocaleString('en-IN')} old regime. In-hand Rs ${baseData.newInHand.toLocaleString('en-IN')}/month. PT Rs ${city.profTaxPerYear}/yr.`;
      const metaDescription = desc.slice(0, 155);

      const fullData: CityTaxPageData & { city: City } = {
        ...baseData, city,
        introProse: intro, cityContextProse: context,
        metaTitle, metaDescription, datePublished,
      };

      const tsx = generatePageTsx(fullData);
      const dir = path.join(taxDir, `income-tax-on-${lakh}-lakh-salary-in-${city.slug}`);

      if (!DRY_RUN) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'page.tsx'), tsx, 'utf8');
        console.log(`  Written: ${path.relative(process.cwd(), dir)}/page.tsx`);
      } else {
        console.log(`  [dry-run] Would write: ${path.relative(process.cwd(), dir)}/page.tsx`);
      }

      count++;
      // Rate limit: Gemini free tier = 15 RPM, so 4s between calls keeps us safely under
      if ((process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY) && count < CITIES.length * SALARY_LIST.length) {
        await new Promise(r => setTimeout(r, 4000));
      }
    }
  }

  console.log(`\nDone. Generated ${count} page(s) across ${CITIES.length} cities.\n`);
  console.log('Next steps:');
  console.log('  1. npm run build  (verify zero TS errors)');
  console.log('  2. git add app/tax/ && git commit -m "feat: Phase 2 city tax pages"');
  console.log('  3. git push origin main');
}

main().catch(e => { console.error(e); process.exit(1); });
