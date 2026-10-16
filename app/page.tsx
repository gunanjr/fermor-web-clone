import type { Metadata } from 'next';
import HomepageClient from './_home/HomepageClient';

export const metadata: Metadata = {
  // Brand-led title: this page shares a segment with the root layout, so its title template never applies.
  // Absolute keeps that explicit.
  title: { absolute: 'Fermor - Smart financial decisions for India' },
  description:
    'Clarity for every financial decision. Free tools, insights and calculators that help you understand, plan and grow your money - built for India.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Fermor - Smart financial decisions for India',
    description:
      'Free SIP, EMI, FD, tax, and retirement calculators built for India. Clear math, free to use.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fermor - Smart financial decisions for India',
    description:
      'Free SIP, EMI, FD, tax, and retirement calculators built for India. Clear math, free to use.',
    site: '@fermor_in',
  },
};

const recentAnalysisSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Recent Blogs from Fermor',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: 'https://fermor.in/blogs/itr-filing-last-date',
      name: 'ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know',
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: 'https://fermor.in/blogs/rbi-financial-product-mis-selling-rules',
      name: 'RBI Financial Product Mis-Selling Rules: What Banks Must Now Do',
    },
    {
      '@type': 'ListItem',
      position: 3,
      url: 'https://fermor.in/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook',
      name: "TMPV Share Price Falls 10%: What JLR's FY27 Guidance Means for Investors",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recentAnalysisSchema) }}
      />
      <HomepageClient />
    </>
  );
}
