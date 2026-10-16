export interface CityConfig {
  name: string;
  slug: string;
  state: string;
  /** Correct annual professional tax for salaried employees earning above the monthly threshold */
  profTaxPerYear: number;
  /** Accurate description of PT slab for use in content and AI prompts */
  profTaxNote: string;
  isMetroHRA: boolean;       // true only for Mumbai, Delhi, Chennai, Kolkata (IT Act definition)
  hraExemptionPct: number;   // 50 for metro, 40 for non-metro
  topEmployers: string[];
  costOfLivingNote: string;  // one-line for content
}

export const CITIES: CityConfig[] = [
  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    profTaxPerYear: 2500,
    profTaxNote: 'Karnataka levies Rs 2,500/year. For monthly salary of Rs 25,000 or above, employers deduct Rs 200 for 11 months and Rs 300 in February, totalling Rs 2,500 annually. Salaries below Rs 24,999/month are exempt.',
    isMetroHRA: false,
    hraExemptionPct: 40,
    topEmployers: ['Infosys', 'Wipro', 'Google', 'Amazon', 'Flipkart', 'Accenture'],
    costOfLivingNote: "India's highest-paying IT market with above-average living costs",
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    profTaxPerYear: 2500,
    profTaxNote: 'Maharashtra levies Rs 2,500/year. For salary above Rs 10,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February (under the Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975).',
    isMetroHRA: true,
    hraExemptionPct: 50,
    topEmployers: ['TCS', 'Reliance', 'HDFC Bank', 'Goldman Sachs', 'JP Morgan', 'Deloitte'],
    costOfLivingNote: 'Highest cost of living in India, especially housing and commute',
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi',
    profTaxPerYear: 0,
    profTaxNote: 'Delhi (National Capital Territory) does not levy professional tax. Unlike Karnataka, Maharashtra, Telangana, and Tamil Nadu, Delhi has no state professional tax legislation for salaried employees.',
    isMetroHRA: true,
    hraExemptionPct: 50,
    topEmployers: ['HCL', 'Tech Mahindra', 'Paytm', 'OYO', 'KPMG', 'PwC'],
    costOfLivingNote: 'No professional tax; highest take-home among all metro cities at the same gross salary',
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    profTaxPerYear: 2400,
    profTaxNote: 'Telangana levies Rs 2,400/year. For monthly salary above Rs 20,000, employers deduct a flat Rs 200 every month (12 months, no February variation). The Telangana Tax on Professions, Trades, Callings and Employments Act, 1987 governs this.',
    isMetroHRA: false,
    hraExemptionPct: 40,
    topEmployers: ['Microsoft', 'Infosys', 'Cognizant', 'Apple', 'Meta', 'Amazon'],
    costOfLivingNote: 'Lower cost of living than Bangalore with comparable IT salaries',
  },
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    profTaxPerYear: 2500,
    profTaxNote: 'Maharashtra levies Rs 2,500/year. For salary above Rs 10,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February. Pune follows the same Maharashtra PT schedule as Mumbai.',
    isMetroHRA: false,
    hraExemptionPct: 40,
    topEmployers: ['TCS', 'Infosys', 'Capgemini', 'Cognizant', 'Bajaj Auto', 'Persistent'],
    costOfLivingNote: 'More affordable than Mumbai with strong IT and manufacturing sectors',
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    profTaxPerYear: 2500,
    profTaxNote: 'Tamil Nadu levies Rs 2,500/year. Under the Tamil Nadu Professional Tax Rules, salaried employees earning above Rs 21,000/month pay approximately Rs 208/month (Rs 2,500/year). Chennai follows the state schedule.',
    isMetroHRA: true,
    hraExemptionPct: 50,
    topEmployers: ['HCL', 'Cognizant', 'TCS', 'Zoho', 'Ford India', 'Hyundai'],
    costOfLivingNote: 'Metro HRA benefit with below-average cost of living vs Mumbai and Delhi',
  },
];

export interface CityTaxPageData {
  // Salary basics
  grossLakh: number;
  slug: string;
  gross: number;
  newTaxable: number;
  oldTaxable: number;

  // New regime tax
  newBaseTax: number;
  new87ARebate: number;
  newNetTax: number;
  newSurcharge: number;
  newCess: number;
  newMonthlyTds: number;

  // Old regime tax
  oldBaseTax: number;
  old87ARebate: number;
  oldNetTax: number;
  oldSurcharge: number;
  oldCess: number;
  oldMonthlyTds: number;

  // Salary components
  monthlyGross: number;
  monthlyBasic: number;
  monthlyHRA: number;
  monthlySpecial: number;
  monthlyPF: number;

  // City-specific in-hand (uses city profTax)
  newInHand: number;
  oldInHand: number;
  profTaxMonthly: number;

  // HRA calculation (old regime, with rent assumption)
  hraExemption: number;       // estimated HRA exemption assuming rent = 30% of gross
  hraExemptionPct: number;    // 40 or 50 depending on metro status

  // City info
  city: CityConfig;

  // Content (Gemini-generated)
  introProse: string;
  cityContextProse: string;
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
}
