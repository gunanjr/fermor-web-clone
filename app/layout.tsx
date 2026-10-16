import type { Metadata } from "next";
import { DM_Sans, Poppins, Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { CurrencyProvider } from "../src/context/CurrencyContext";
import { AuthProvider } from "../src/context/AuthContext";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: false,
});

// display:'optional' eliminates font-induced CLS (0.52): browser uses fallback
// on slow first loads, then shows Poppins on cached visits. Only heading weights needed.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'optional',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

// Loaded only for the footer's big "Fermor" wordmark (app/_home/Footer.tsx), not used
// site-wide. Space Grotesk's own geometric letterforms (chunkier strokes, tighter
// counters at bold weight) are closer to Jeton's wordmark proportions than Poppins is,
// without needing a same-color SVG stroke hack to fake extra weight -- that hack has a
// hard ceiling since it can't thicken a letter's outer edge without also shrinking and
// distorting its inner counter (the "o" hole, the "e" aperture) by the same amount.
// Space Grotesk only ships weights up to 700 (Bold) on Google Fonts, no 800/900.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
  display: 'optional',
});


const siteUrl = 'https://fermor.in';
const siteName = 'Fermor';
const defaultTitle = 'Fermor - Finance Smarter';
const defaultDesc = 'Free calculators, comparisons, and clear math for every money move in India. SIP, FD, salary, income tax, home loans, and more, built for Indians.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    // One title format sitewide: "Page Name - Fermor". Page titles are written without the brand so this
    // template adds it exactly once. A brand-led title (the homepage) or one that must not get the suffix
    // uses `title: { absolute: '...' }` instead.
    template: `%s - ${siteName}`,
  },
  description: defaultDesc,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDesc,
    url: siteUrl,
    siteName,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDesc,
    site: '@fermor_in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description: 'Personal finance calculators and comparisons built for India',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  // The 2026 mark on solid white (512x512, public/fermor-schema-logo.png), made for structured data and search
  // results. public/fermor-logo-2026.png is the dark nav tile and is not a schema logo. Page-level schema logos in
  // migrated families use the same file. public/fermor-mark-clean.png stays at its URL because the calculator
  // and blog pages not yet in a branding batch still reference it.
  logo: `${siteUrl}/fermor-schema-logo.png`,
  description: "India's personal finance platform: free calculators, unbiased rate comparisons, and open methodology.",
  foundingDate: '2025',
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Personal Finance', 'Investment Planning', 'Income Tax India',
    'Mutual Funds', 'SIP', 'Fixed Deposits', 'Home Loans', 'Capital Gains Tax',
    'Retirement Planning', 'Financial Calculators',
  ],
  sameAs: ['https://twitter.com/fermor_in'],
};

const financialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: `${siteName} Financial Calculators`,
  url: siteUrl,
  description: 'Free personal finance calculators covering SIP, EMI, income tax, capital gains, FD, retirement, and more, built for India.',
  areaServed: { '@type': 'Country', name: 'India' },
  serviceType: 'Personal Finance Calculators',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    description: 'All financial calculators are free to use. An account is optional and only needed to save your results.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Google tag (GA4). Lives in the root layout so it loads once on every route; do not
            add it to individual pages. Native script tags, same reasoning as AdSense below. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q401RZ5BBJ" suppressHydrationWarning />
        <script
          id="ga4-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Q401RZ5BBJ');`,
          }}
          suppressHydrationWarning
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* AdSense site verification - meta tag method, works on every page rendered through
            this root layout without needing per-page changes. Kept alongside the script tag
            below since Google documents both as valid, non-exclusive verification methods. */}
        <meta name="google-adsense-account" content="ca-pub-9143818422004116" />
        {/* Plain native script tag, not next/script: next/script's managed strategies stamp
            a data-nscript attribute onto the tag, which triggers AdSense's own head-scan
            warning ("head tag doesn't support data-nscript attribute"). A bare script tag
            matches Google's official embed snippet exactly and avoids that attribute entirely. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9143818422004116"
          crossOrigin="anonymous"
          suppressHydrationWarning
        />
      </head>
      <body suppressHydrationWarning>
        <script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          suppressHydrationWarning
        />
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          suppressHydrationWarning
        />
        <script
          id="schema-financial-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
          suppressHydrationWarning
        />
        <AuthProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
