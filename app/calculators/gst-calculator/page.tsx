import type { Metadata } from 'next';
import GSTCalculatorClient from './GSTCalculatorClient';

export const metadata: Metadata = {
  title: 'GST Calculator: Calculate GST Amount Online',
  description: 'Calculate GST for India with the free online GST calculator. Add or remove GST, view CGST/SGST/IGST breakup, and compare all GST slab rates (5%, 12%, 18%, 28%). Free to use.',
  keywords: [
    'gst calculator',
    'gst calc',
    'gst',
    'tax calculator',
    'gst calculator india',
    'cgst sgst calculator',
    'gst amount calculator',
    'gst slab rates india',
  ],
  openGraph: {
    title: 'GST Calculator: Calculate GST Amount Online',
    description: 'Calculate GST for India with the free online GST calculator. Add or remove GST, view CGST/SGST/IGST breakup.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/gst-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is GST and how is it calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GST (Goods and Services Tax) is a value-added tax levied on the supply of goods and services in India. It is calculated as a percentage of the taxable value (base price). The formula is: GST Amount = Base Price × (GST Rate / 100). The total amount payable = Base Price + GST Amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the different GST slabs in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'India has four main GST slab rates: 5% (essential items like packaged food, footwear under ₹1,000), 12% (standard rate for items like processed food, computers), 18% (most goods and services including telecom, IT services, restaurants), and 28% (luxury items like cars, tobacco products, premium appliances). Some essential items like fresh vegetables and milk are exempt from GST.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between CGST, SGST, and IGST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CGST (Central GST) and SGST (State GST) are levied on intra-state transactions, when goods or services are supplied within the same state. The total GST is split equally: half goes to the central government (CGST) and half to the state government (SGST). IGST (Integrated GST) is levied on inter-state transactions, when goods or services are supplied across state borders. In this case, the full GST amount is collected as IGST by the central government and later distributed to the destination state.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate GST from a total amount?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you have the GST-inclusive total amount and want to find the base price, use the formula: Base Price = Total Amount / (1 + GST Rate / 100). The GST amount is then Total Amount minus Base Price. For example, if ₹1,180 is the total at 18% GST, the base price = ₹1,180 / 1.18 = ₹1,000, and GST = ₹180.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add GST to a base price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To add GST to a base price, multiply the base price by (1 + GST Rate / 100). For example, if the base price is ₹1,000 and the GST rate is 18%, the total amount = ₹1,000 × 1.18 = ₹1,180. The GST component is ₹180.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the formula for GST calculation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The GST formula is: GST Amount = Base Price × (GST Rate / 100). The total GST-inclusive amount = Base Price × (1 + GST Rate / 100). To extract the base price from a GST-inclusive amount: Base Price = Total Amount / (1 + GST Rate / 100).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is GST the same across all states in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GST rates are uniform across all states in India, making it a unified national tax system. However, the tax components differ based on whether the transaction is intra-state (CGST + SGST, split 50-50) or inter-state (IGST, the full rate). The total GST percentage remains the same in both cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who needs to register for GST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any business whose aggregate turnover exceeds ₹40 lakh (₹20 lakh for special category states) in a financial year must register for GST. Businesses engaged in inter-state supply, e-commerce operators, and casual taxable persons must register regardless of turnover. Registration is mandatory for suppliers on e-commerce platforms and those required to pay tax under reverse charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Input Tax Credit (ITC) under GST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Input Tax Credit lets a registered business reduce the GST it owes on sales by the GST it already paid on purchases used for the business, so tax is only paid on the value actually added at each stage. This is the mechanism that stops GST from cascading (tax being charged on top of tax) as goods move through the supply chain.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is reverse charge mechanism (RCM) under GST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under reverse charge, the buyer pays GST directly to the government instead of the supplier, reversing the usual flow. This applies to specific notified categories of goods and services, such as certain imports of services and supplies from goods transport agencies, rather than to transactions generally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an HSN code and why does it matter for GST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HSN (Harmonised System of Nomenclature) code is a standardised numeric code used to classify goods for tax purposes, and it determines which GST slab rate applies to a given product. GST invoices are required to mention the HSN code, with the number of digits required depending on the business\'s annual turnover.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is GST applicable on all products and services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A few items are kept entirely outside GST and continue under the earlier tax system, most notably petrol, diesel, aviation turbine fuel, natural gas, and alcohol for human consumption, which attract state excise duty and VAT instead. Everything else falls under GST, either at one of the four slab rates or as an exempt item.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if GST is paid late?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Late payment attracts interest at 18% per annum on the outstanding tax amount, calculated from the day after the due date until payment. A separate, smaller per-day late fee also applies for filing the return itself late, with a lower rate for a nil return, subject to a maximum cap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a consumer claim Input Tax Credit on GST paid on personal purchases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Input Tax Credit is available only to GST-registered businesses, and only for purchases used in the course of business. An individual buying goods or services for personal use pays GST as a final consumer and cannot claim any of it back.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who decides GST rates in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The GST Council decides tax rates, exemptions, and rule changes. It is a constitutional body chaired by the Union Finance Minister, with the finance ministers of every state and union territory as members, so rate changes require agreement between the central and state governments rather than a unilateral decision.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is GSTIN and how many digits does it have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GSTIN (Goods and Services Tax Identification Number) is a 15-character alphanumeric code assigned to every GST-registered business. It is built from the two-digit state code, the business PAN, a registration count digit for that state, a default character, and a final checksum digit, so it uniquely identifies both the business and the state it is registered in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is GST different from the old VAT system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VAT was levied separately by each state at different rates, and tax paid at one stage often could not be fully offset against tax at the next, creating a cascading tax-on-tax effect. GST replaced this with one uniform nationwide tax structure and seamless input tax credit across the entire supply chain, so businesses are only ever taxed on the value they actually add.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do freelancers and consultants need to charge GST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A freelancer or consultant providing services must register for GST once their aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in special category states), a lower threshold than the one that applies to businesses selling goods. Once registered, GST must be charged and collected on invoices for services rendered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'GST Calculator', item: 'https://fermor.in/calculators/gst-calculator' },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor GST Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate GST amounts for India with CGST, SGST, and IGST breakup. Free online GST calculator for all slab rates.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
};

export default function GSTCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }}
      />
      <GSTCalculatorClient />
    </>
  );
}
