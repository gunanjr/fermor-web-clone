import type { Metadata } from 'next';
import { headers } from 'next/headers';
import IncomeTaxPageTemplate from '../_template/IncomeTaxPageTemplate';
import type { TaxPageData } from '../_template/types';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'tax' : region;
  const canonical = `https://fermor.in/${canonicalPath}/income-tax-on-60-lakh-salary`;
  return {
    title: "Income Tax on 60 Lakh Salary: Rs 15,52,980 in New Regime 2025-26",
    description: "Income tax on 60 lakh salary 2025-26. New regime: Rs 15,52,980. Old regime: Rs 18,27,540. Monthly in-hand Rs 3,40,385. Slab-by-slab breakdown, old vs new comparison.",
    keywords: ["income tax on 60 lakh salary","60 lpa in hand salary","60 lakh salary tax 2025-26","tax on 60 lakh income india","60 lpa take home salary","income tax 60 lpa new regime","60 lakh ctc in hand salary","tax calculation 60 lakh salary","60 lpa salary breakup","how much tax on 60 lakh salary","income tax on 60 lpa old regime","60 lakh salary monthly in hand","income tax calculator 60 lakh","60 lpa income tax 2025","old vs new regime 60 lpa","60 lpa net salary india","income tax on 60 lakh salary bangalore","income tax on 60 lakh salary delhi","60 lakh annual salary in hand","income tax 60 lpa calculator","take home salary 60 lpa india","60 lakh salary excel calculation"],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: "Income Tax on 60 Lakh Salary: Rs 15,52,980 in New Regime 2025-26",
      description: "Income tax on 60 lakh salary 2025-26. New regime: Rs 15,52,980. Old regime: Rs 18,27,540. Monthly in-hand Rs 3,40,385. Slab-by-slab breakdown, old vs new comparison.",
      images: ['https://fermor.in/og-income-tax-60-lakh.png'],
    },
    openGraph: {
      title: "Income Tax on 60 Lakh Salary: Rs 15,52,980 in New Regime 2025-26 - Fermor",
      description: "Complete FY 2025-26 income tax breakdown for Rs 60 lakh annual salary. New regime: Rs 15,52,980. Old regime: Rs 18,27,540. Monthly in-hand salary Rs 3,40,385. Old vs new regime comparison with all deduction scenarios.",
      type: 'website',
      url: 'https://fermor.in/tax/income-tax-on-60-lakh-salary',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-income-tax-60-lakh.png', width: 1200, height: 630, alt: "Income Tax on 60 Lakh Salary 2025-26" }],
    },
  };
}

const PAGE_DATA: TaxPageData = {
    "grossLakh": 60,
    "slug": "income-tax-on-60-lakh-salary",
    "gross": 6000000,
    "taxable": 5925000,
    "newBaseTax": 1357500,
    "new87ARebate": 0,
    "newNetTax": 1552980,
    "newMonthlyTds": 129415,
    "newSurcharge": 135750,
    "newCess": 59730,
    "oldBaseTax": 1597500,
    "old87ARebate": 0,
    "oldNetTax": 1827540,
    "oldMonthlyTds": 152295,
    "oldSurcharge": 159750,
    "oldCess": 70290,
    "monthlyGross": 500000,
    "monthlyBasic": 250000,
    "monthlyHRA": 100000,
    "monthlySpecial": 150000,
    "monthlyPF": 30000,
    "newInHand": 340385,
    "oldInHand": 317505,
    "deductionScenarios": [
      {
        "label": "No deductions (standard only)",
        "deduction": 0,
        "oldTax": 1827540,
        "newTax": 1552980
      },
      {
        "label": "80C only: Rs 1,50,000",
        "deduction": 150000,
        "oldTax": 1776060,
        "newTax": 1552980
      },
      {
        "label": "80C + 80D: Rs 1,75,000",
        "deduction": 175000,
        "oldTax": 1767480,
        "newTax": 1552980
      },
      {
        "label": "80C + 80D + NPS: Rs 2,25,000",
        "deduction": 225000,
        "oldTax": 1750320,
        "newTax": 1552980
      },
      {
        "label": "Maximum deductions: Rs 3,50,000",
        "deduction": 350000,
        "oldTax": 1707420,
        "newTax": 1552980
      }
    ],
    "introProse": "The new tax regime produces Rs 15,52,980 in annual tax on a Rs 60 lakh salary, against Rs 18,27,540 under the old regime with no Chapter VI-A deductions claimed, a saving of Rs 2,74,560 per year from switching. To make the old regime a better choice, Chapter VI-A deductions beyond Rs Rs 9,15,200 would be required at this income level.",
    "metaTitle": "Income Tax on 60 Lakh Salary: Rs 15,52,980 in New Regime 2025-26 - Fermor",
    "metaDescription": "Income tax on 60 lakh salary 2025-26. New regime: Rs 15,52,980. Old regime: Rs 18,27,540. Monthly in-hand Rs 3,40,385. Slab-by-slab breakdown, old vs new comparison.",
    "datePublished": "2026-06-22"
  };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fermor",
  "url": "https://fermor.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://fermor.in/fermor-schema-logo.png",
    "width": 512,
    "height": 512
  },
  "sameAs": [
    "https://fermor.in",
    "https://fermor.in/about"
  ],
  "description": "Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.",
  "knowsAbout": [
    "Income Tax India",
    "Old vs New Tax Regime",
    "Section 87A Rebate",
    "Salary Taxation India",
    "Standard Deduction",
    "SEBI Regulations",
    "AMFI Guidelines",
    "Personal Finance India",
    "Tax Planning India",
    "ITR Filing India",
    "Account Aggregator Framework"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much income tax do I pay on a 60 lakh salary in FY 2025-26?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under the new tax regime in FY 2025-26, income tax on a Rs 60 lakh annual salary is Rs 15,52,980. After the standard deduction of Rs 75,000, taxable income is Rs 59,25,000. Tax at new regime slabs is Rs 13,57,500. Under the old regime with no deductions, the tax is Rs 18,27,540 including 4% cess."
      }
    },
    {
      "@type": "Question",
      "name": "What is the in-hand salary for 60 LPA in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The monthly in-hand salary for 60 LPA under the new tax regime is approximately Rs 3,40,385, assuming 50% basic salary. This accounts for employee PF of Rs 30,000 per month (12% of Rs 2,50,000 basic) and professional tax of Rs 200 per month. Income tax TDS is Rs 1,29,415 per month."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose old or new regime for 60 LPA salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The new regime is better for 60 LPA in FY 2025-26, producing Rs 15,52,980 versus Rs 18,27,540 under the old regime with no deductions. The annual saving is Rs 2,74,560."
      }
    },
    {
      "@type": "Question",
      "name": "Does 60 LPA salary attract surcharge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Surcharge at 10% applies when taxable income exceeds Rs 50 lakh. For 60 LPA, taxable income is Rs 59,25,000, so the 10% surcharge of Rs 1,35,750 applies. The new regime net tax including surcharge and 4% cess is Rs 15,52,980."
      }
    },
    {
      "@type": "Question",
      "name": "What is the TDS per month for a 60 LPA salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TDS on a 60 LPA salary under the new regime is Rs 1,29,415 per month. Under the old regime with no deductions, TDS is approximately Rs 1,52,295 per month. Employers compute TDS based on the regime you declare at the start of the financial year."
      }
    },
    {
      "@type": "Question",
      "name": "What is 60 LPA in-hand salary in Bangalore or Delhi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly in-hand for 60 LPA in Bangalore is approximately Rs 3,40,385 (professional tax Rs 200/month). In Delhi, there is no professional tax, so in-hand is approximately Rs 3,40,585. Income tax TDS is Rs 1,29,415 per month under the new regime in all cities."
      }
    },
    {
      "@type": "Question",
      "name": "How much PF is deducted for a 60 lakh salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a 60 LPA salary with basic pay of Rs 2,50,000 per month, the employee PF deduction is Rs 30,000 per month (12% of basic) and Rs 3,60,000 per year. The employer contributes an equal Rs 30,000 per month, which is part of CTC but not deducted from take-home pay."
      }
    },
    {
      "@type": "Question",
      "name": "What is the income tax for 60 lakh salary under the old regime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under the old regime with no Chapter VI-A deductions, the tax on Rs 60 lakh salary is Rs 18,27,540 including 4% cess. Taxable income is Rs 59,25,000 after the standard deduction of Rs 75,000."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate income tax on 60 lakh salary in Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Excel, place taxable income (Rs 59,25,000) in cell A1. New regime formula: =MAX(0,(MIN(A1,800000)-400000)*0.05)+(MAX(0,MIN(A1,1200000)-800000)*0.1)+(MAX(0,MIN(A1,1600000)-1200000)*0.15)+(MAX(0,MIN(A1,2000000)-1600000)*0.2)+(MAX(0,MIN(A1,2400000)-2000000)*0.25)+(MAX(0,A1-2400000)*0.3). This gives Rs 13,57,500 for Rs 59,25,000 taxable income. Multiply by 1.04 for cess to get Rs 15,52,980."
      }
    },
    {
      "@type": "Question",
      "name": "What is Fermor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fermor is a financial platform built for India. The calculators and tax guides are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it."
      }
    }
  ]
};

const calcSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Income Tax on 60 Lakh Salary Calculator by Fermor",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": "https://fermor.in/tax/income-tax-on-60-lakh-salary",
  "description": "Pre-computed income tax breakdown for Rs 60 lakh annual salary in FY 2025-26. New regime: Rs 15,52,980. Old regime: Rs 18,27,540. Monthly in-hand salary and old vs new regime comparison.",
  "featureList": [
    "New Regime Tax Breakdown FY 2025-26",
    "Old Regime Tax Computation",
    "Section 87A Rebate Applied",
    "Old vs New Regime Comparison",
    "Tax Impact by Deduction Level Table",
    "Monthly In-Hand Salary Breakup"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Fermor",
    "url": "https://fermor.in"
  },
  "datePublished": "2026-06-22",
  "dateModified": "2026-06-22"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://fermor.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tax",
      "item": "https://fermor.in/tax"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Income Tax on 60 Lakh Salary",
      "item": "https://fermor.in/tax/income-tax-on-60-lakh-salary"
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Income Tax on 60 Lakh Salary in FY 2025-26",
  "description": "Step-by-step method to compute income tax on Rs 60 lakh annual salary under new and old tax regimes.",
  "totalTime": "PT2M",
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Fermor Income Tax Calculator"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start with gross salary",
      "text": "Begin with total annual CTC or gross salary. For this example: Rs 60,00,000."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Apply standard deduction",
      "text": "Subtract the standard deduction of Rs 75,000 (applicable under both regimes in FY 2025-26). Net taxable income: Rs 59,25,000."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Apply new regime tax slabs",
      "text": "New regime FY 2025-26 slabs: 0% on Rs 0-4L, 5% on Rs 4-8L, 10% on Rs 8-12L, 15% on Rs 12-16L. Tax: Rs 13,57,500."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Apply rebate and cess",
      "text": "Taxable income exceeds Rs 12,00,000 so Section 87A does not apply. Add 4% cess on Rs 13,57,500 to reach Rs 15,52,980."
    }
  ]
};

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Section 87A Rebate",
  "alternateName": "Income Tax Rebate under Section 87A",
  "description": "A rebate under the Income Tax Act 1961 that reduces tax liability to zero for resident individuals with net taxable income not exceeding Rs 12,00,000 under the new regime in FY 2025-26.",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Indian Income Tax Terms",
    "url": "https://fermor.in/tax"
  },
  "sameAs": [
    "https://en.wikipedia.org/wiki/Income_tax_in_India",
    "https://www.wikidata.org/wiki/Q751437"
  ]
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Income Tax on 60 Lakh Salary: Rs 15,52,980 in New Regime 2025-26",
  "description": "Income tax on 60 lakh salary 2025-26. New regime: Rs 15,52,980. Old regime: Rs 18,27,540. Monthly in-hand Rs 3,40,385. Slab-by-slab breakdown, old vs new comparison.",
  "url": "https://fermor.in/tax/income-tax-on-60-lakh-salary",
  "datePublished": "2026-06-22",
  "dateModified": "2026-06-22",
  "inLanguage": "en-IN",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Fermor",
    "url": "https://fermor.in"
  },
  "author": {
    "@type": "Organization",
    "name": "Fermor",
    "url": "https://fermor.in"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Fermor",
    "url": "https://fermor.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://fermor.in/fermor-schema-logo.png"
    }
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "h1",
      "h2",
      "article p:first-of-type"
    ]
  },
  "about": [
    {
      "@type": "DefinedTerm",
      "name": "Income Tax",
      "alternateName": "Indian Income Tax Act 1961"
    },
    {
      "@type": "DefinedTerm",
      "name": "Section 87A",
      "alternateName": "Tax Rebate 87A"
    },
    {
      "@type": "DefinedTerm",
      "name": "New Tax Regime",
      "alternateName": "Default Tax Regime FY 2025-26"
    }
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Salaried employees, taxpayers, financial planners in India",
    "geographicArea": {
      "@type": "Country",
      "name": "India"
    }
  },
  "hasPart": [
    {
      "@type": "WebPageElement",
      "cssSelector": "#what-is-income-tax",
      "name": "What Is Income Tax on a 60 Lakh Salary"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#tax-formula",
      "name": "Income Tax Formula"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#excel-calculation",
      "name": "Income Tax in Excel"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#new-regime-breakdown",
      "name": "New Regime Tax Breakdown"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#old-regime-breakdown",
      "name": "Old Regime Tax Breakdown"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#old-vs-new",
      "name": "Old vs New Regime Comparison"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#section-87a",
      "name": "Section 87A Rebate"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#with-deductions",
      "name": "Tax with Deductions"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#in-hand-salary",
      "name": "In-Hand Salary for 60 LPA"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#how-to-use",
      "name": "How to Use the Calculator"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#limitations",
      "name": "When These Tax Numbers May Not Apply"
    },
    {
      "@type": "WebPageElement",
      "cssSelector": "#faq",
      "name": "Frequently Asked Questions"
    }
  ]
};

export default async function IncomeTaxOn60LakhPage() {
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
