import type { Metadata } from 'next';
import CreditCardsClient from './CreditCardsClient';
import { CREDIT_CARDS } from '../../src/data/creditCards';

export const metadata: Metadata = {
  title: 'Best Credit Cards in India 2026 - Compare Cashback, Travel & Rewards',
  description: 'Compare the best credit cards in India for 2026. Honest reviews of HDFC, SBI, Axis, ICICI, Amex credit cards. Find cashback cards, travel cards, and lifetime-free cards based on your spending habits.',
  alternates: {
    canonical: 'https://fermor.in/credit-cards',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  }
};

const faqs = [
  {
    q: 'Which is the best cashback credit card in India in 2026?',
    a: 'The SBI Cashback Credit Card offers the most versatile cashback — 5% on all online transactions regardless of merchant. For Amazon-heavy spenders, the Amazon Pay ICICI Credit Card (lifetime free) is equally strong.'
  },
  {
    q: 'Which credit card is best for a salaried professional in India?',
    a: 'It depends on spending patterns. For online shopping, the SBI Cashback Card. For travel, HDFC Regalia Gold. For a first card with no annual fee, IDFC FIRST Millennia. For Amazon users, Amazon Pay ICICI.'
  },
  {
    q: 'What is a lifetime free credit card?',
    a: 'A lifetime free credit card charges ₹0 in annual fees — forever. Popular examples include Amazon Pay ICICI, IDFC FIRST Millennia, and OneCard. They\'re ideal for first-time cardholders or low-to-medium spenders.'
  },
  {
    q: 'How many credit cards should I have?',
    a: '2–3 cards is ideal for most salaried professionals — one for cashback on everyday spends, one for travel, and one for a specific category like shopping or fuel. More than 3 cards can be hard to manage and may affect your credit utilization ratio.'
  },
  {
    q: 'Does applying for a credit card affect my CIBIL score?',
    a: 'Yes, slightly. Each application triggers a "hard inquiry" that can lower your CIBIL score by 5–10 points temporarily. Multiple applications in a short period can have a larger impact. Always check your eligibility before applying.'
  },
  {
    q: 'What is the minimum salary required for a credit card in India?',
    a: 'Most entry-level credit cards require a minimum salary of ₹15,000–₹20,000/month. Premium cards like HDFC Regalia Gold typically require ₹1 lakh+/month. Lifetime-free cards like IDFC FIRST Millennia have more lenient income requirements.'
  },
  {
    q: 'Can I apply for a credit card without a credit history?',
    a: 'Yes. Secured credit cards (backed by a Fixed Deposit) don\'t require a credit history. Banks like SBI, HDFC, and ICICI all offer FD-backed cards. Alternatively, IDFC FIRST Millennia is known for approving first-time credit card applicants.'
  },
  {
    q: 'What is the difference between reward points and cashback?',
    a: 'Cashback is credited directly to your statement — straightforward savings. Reward points need to be redeemed through the bank\'s portal for vouchers, merchandise, or travel — the actual value per point varies by bank and redemption category. Cashback is simpler; reward points can offer higher value if redeemed smartly.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: CREDIT_CARDS.map((card, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: card.applyUrl,
    name: card.name,
    description: card.fermorsTake,
  }))
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://fermor.in/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Credit Cards',
      item: 'https://fermor.in/credit-cards'
    }
  ]
};

export default function CreditCardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CreditCardsClient faqs={faqs} />
    </>
  );
}
