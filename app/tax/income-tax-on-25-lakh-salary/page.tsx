import type { Metadata } from 'next';
import { headers } from 'next/headers';
import IncomeTaxPageTemplate from '../_template/IncomeTaxPageTemplate';
import type { TaxPageData } from '../_template/types';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'tax' : region;
  const canonical = `https://fermor.in/${canonicalPath}/income-tax-on-25-lakh-salary`;
  return {
    title: "Income Tax on 25 Lakh Salary: Rs 3,19,800 in New Regime 2025-26",
    description: "Income tax on 25 lakh salary 2025-26. New regime: Rs 3,19,800. Old regime: Rs 5,69,400. Monthly in-hand Rs 1,68,983. Slab-by-slab breakdown, old vs new comparison.",
    keywords: ["income tax on 25 lakh salary","25 lpa in hand salary","25 lakh salary tax 2025-26","tax on 25 lakh income india","25 lpa take home salary","income tax 25 lpa new regime","25 lakh ctc in hand salary","tax calculation 25 lakh salary","25 lpa salary breakup","how much tax on 25 lakh salary","income tax on 25 lpa old regime","25 lakh salary monthly in hand","income tax calculator 25 lakh","25 lpa income tax 2025","old vs new regime 25 lpa","25 lpa net salary india","income tax on 25 lakh salary bangalore","income tax on 25 lakh salary delhi","25 lakh annual salary in hand","income tax 25 lpa calculator","take home salary 25 lpa india","25 lakh salary excel calculation"],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: "Income Tax on 25 Lakh Salary: Rs 3,19,800 in New Regime 2025-26",
      description: "Income tax on 25 lakh salary 2025-26. New regime: Rs 3,19,800. Old regime: Rs 5,69,400. Monthly in-hand Rs 1,68,983. Slab-by-slab breakdown, old vs new comparison.",
      images: ['https://fermor.in/og-income-tax-25-lakh.png'],
    },
    openGraph: {
      title: "Income Tax on 25 Lakh Salary: Rs 3,19,800 in New Regime 2025-26 - Fermor",
      description: "Complete FY 2025-26 income tax breakdown for Rs 25 lakh annual salary. New regime: Rs 3,19,800. Old regime: Rs 5,69,400. Monthly in-hand salary Rs 1,68,983. Old vs new regime comparison with all deduction scenarios.",
      type: 'website',
      url: 'https://fermor.in/tax/income-tax-on-25-lakh-salary',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-income-tax-25-lakh.png', width: 1200, height: 630, alt: "Income Tax on 25 Lakh Salary 2025-26" }],
    },
  };
}

const PAGE_DATA: TaxPageData = {
    "grossLakh": 25,
    "slug": "income-tax-on-25-lakh-salary",
    "gross": 2500000,
    "taxable": 2425000,
    "newBaseTax": 307500,
    "new87ARebate": 0,
    "newNetTax": 319800,
    "newMonthlyTds": 26650,
    "newSurcharge": 0,
    "newCess": 12300,
    "oldBaseTax": 547500,
    "old87ARebate": 0,
    "oldNetTax": 569400,
    "oldMonthlyTds": 47450,
    "oldSurcharge": 0,
    "oldCess": 21900,
    "monthlyGross": 208333,
    "monthlyBasic": 104167,
    "monthlyHRA": 41667,
    "monthlySpecial": 62499,
    "monthlyPF": 12500,
    "newInHand": 168983,
    "oldInHand": 148183,
    "deductionScenarios": [
      {
        "label": "No deductions (standard only)",
        "deduction": 0,
        "oldTax": 569400,
        "newTax": 319800
      },
      {
        "label": "80C only: Rs 1,50,000",
        "deduction": 150000,
        "oldTax": 522600,
        "newTax": 319800
      },
      {
        "label": "80C + 80D: Rs 1,75,000",
        "deduction": 175000,
        "oldTax": 514800,
        "newTax": 319800
      },
      {
        "label": "80C + 80D + NPS: Rs 2,25,000",
        "deduction": 225000,
        "oldTax": 499200,
        "newTax": 319800
      },
      {
        "label": "Maximum deductions: Rs 3,50,000",
        "deduction": 350000,
        "oldTax": 460200,
        "newTax": 319800
      }
    ],
    "introProse": "The new tax regime produces Rs 3,19,800 in annual tax on a Rs 25 lakh salary, against Rs 5,69,400 under the old regime with no Chapter VI-A deductions claimed, a saving of Rs 2,49,600 per year from switching. To make the old regime a better choice, Chapter VI-A deductions beyond Rs Rs 8,32,000 would be required at this income level.",
    "metaTitle": "Income Tax on 25 Lakh Salary: Rs 3,19,800 in New Regime 2025-26 - Fermor",
    "metaDescription": "Income tax on 25 lakh salary 2025-26. New regime: Rs 3,19,800. Old regime: Rs 5,69,400. Monthly in-hand Rs 1,68,983. Slab-by-slab breakdown, old vs new comparison.",
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
      "name": "How much income tax do I pay on a 25 lakh salary in FY 2025-26?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under the new tax regime in FY 2025-26, income tax on a Rs 25 lakh annual salary is Rs 3,19,800. After the standard deduction of Rs 75,000, taxable income is Rs 24,25,000. Tax at new regime slabs is Rs 3,07,500. Under the old regime with no deductions, the tax is Rs 5,69,400 including 4% cess."
      }
    },
    {
      "@type": "Question",
      "name": "What is the in-hand salary for 25 LPA in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The monthly in-hand salary for 25 LPA under the new tax regime is approximately Rs 1,68,983, assuming 50% basic salary. This accounts for employee PF of Rs 12,500 per month (12% of Rs 1,04,167 basic) and professional tax of Rs 200 per month. Income tax TDS is Rs 26,650 per month."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose old or new regime for 25 LPA salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The new regime is better for 25 LPA in FY 2025-26, producing Rs 3,19,800 versus Rs 5,69,400 under the old regime with no deductions. The annual saving is Rs 2,49,600."
      }
    },
    {
      "@type": "Question",
      "name": "Does 25 LPA salary attract surcharge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Surcharge applies only when taxable income exceeds Rs 50 lakh. For 25 LPA, taxable income is Rs 24,25,000, which is below the Rs 50 lakh threshold. Only the 4% health and education cess applies."
      }
    },
    {
      "@type": "Question",
      "name": "What is the TDS per month for a 25 LPA salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TDS on a 25 LPA salary under the new regime is Rs 26,650 per month. Under the old regime with no deductions, TDS is approximately Rs 47,450 per month. Employers compute TDS based on the regime you declare at the start of the financial year."
      }
    },
    {
      "@type": "Question",
      "name": "What is 25 LPA in-hand salary in Bangalore or Delhi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly in-hand for 25 LPA in Bangalore is approximately Rs 1,68,983 (professional tax Rs 200/month). In Delhi, there is no professional tax, so in-hand is approximately Rs 1,69,183. Income tax TDS is Rs 26,650 per month under the new regime in all cities."
      }
    },
    {
      "@type": "Question",
      "name": "How much PF is deducted for a 25 lakh salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a 25 LPA salary with basic pay of Rs 1,04,167 per month, the employee PF deduction is Rs 12,500 per month (12% of basic) and Rs 1,50,000 per year. The employer contributes an equal Rs 12,500 per month, which is part of CTC but not deducted from take-home pay."
      }
    },
    {
      "@type": "Question",
      "name": "What is the income tax for 25 lakh salary under the old regime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under the old regime with no Chapter VI-A deductions, the tax on Rs 25 lakh salary is Rs 5,69,400 including 4% cess. Taxable income is Rs 24,25,000 after the standard deduction of Rs 75,000."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate income tax on 25 lakh salary in Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Excel, place taxable income (Rs 24,25,000) in cell A1. New regime formula: =MAX(0,(MIN(A1,800000)-400000)*0.05)+(MAX(0,MIN(A1,1200000)-800000)*0.1)+(MAX(0,MIN(A1,1600000)-1200000)*0.15)+(MAX(0,MIN(A1,2000000)-1600000)*0.2)+(MAX(0,MIN(A1,2400000)-2000000)*0.25)+(MAX(0,A1-2400000)*0.3). This gives Rs 3,07,500 for Rs 24,25,000 taxable income. Multiply by 1.04 for cess to get Rs 3,19,800."
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
  "name": "Income Tax on 25 Lakh Salary Calculator by Fermor",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": "https://fermor.in/tax/income-tax-on-25-lakh-salary",
  "description": "Pre-computed income tax breakdown for Rs 25 lakh annual salary in FY 2025-26. New regime: Rs 3,19,800. Old regime: Rs 5,69,400. Monthly in-hand salary and old vs new regime comparison.",
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
      "name": "Income Tax on 25 Lakh Salary",
      "item": "https://fermor.in/tax/income-tax-on-25-lakh-salary"
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Income Tax on 25 Lakh Salary in FY 2025-26",
  "description": "Step-by-step method to compute income tax on Rs 25 lakh annual salary under new and old tax regimes.",
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
      "text": "Begin with total annual CTC or gross salary. For this example: Rs 25,00,000."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Apply standard deduction",
      "text": "Subtract the standard deduction of Rs 75,000 (applicable under both regimes in FY 2025-26). Net taxable income: Rs 24,25,000."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Apply new regime tax slabs",
      "text": "New regime FY 2025-26 slabs: 0% on Rs 0-4L, 5% on Rs 4-8L, 10% on Rs 8-12L, 15% on Rs 12-16L. Tax: Rs 3,07,500."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Apply rebate and cess",
      "text": "Taxable income exceeds Rs 12,00,000 so Section 87A does not apply. Add 4% cess on Rs 3,07,500 to reach Rs 3,19,800."
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
  "name": "Income Tax on 25 Lakh Salary: Rs 3,19,800 in New Regime 2025-26",
  "description": "Income tax on 25 lakh salary 2025-26. New regime: Rs 3,19,800. Old regime: Rs 5,69,400. Monthly in-hand Rs 1,68,983. Slab-by-slab breakdown, old vs new comparison.",
  "url": "https://fermor.in/tax/income-tax-on-25-lakh-salary",
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
      "name": "What Is Income Tax on a 25 Lakh Salary"
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
      "name": "In-Hand Salary for 25 LPA"
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

export default async function IncomeTaxOn25LakhPage() {
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
