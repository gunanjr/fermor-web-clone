import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { PMKisanLanguageSwitcher } from '../../../components/PMKisanLanguageSwitcher';

export const metadata: Metadata = {
  title: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ: ਯੋਗਤਾ, 6,000 ਰੁਪਏ ਲਾਭ, eKYC, ਸਟੇਟਸ ਚੈੱਕ',
  description: 'ਪੀਐਮ-ਕਿਸਾਨ (ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ) ਦੀ ਪੂਰੀ ਗਾਈਡ: 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ 6,000 ਰੁਪਏ ਸਾਲਾਨਾ ਲਾਭ, ਪੂਰੀ ਯੋਗਤਾ ਅਤੇ ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ, ਤਿੰਨ eKYC ਤਰੀਕੇ, ਨਵੇਂ ਕਿਸਾਨ ਵਜੋਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਲਾਭਪਾਤਰੀ ਸਟੇਟਸ ਚੈੱਕ, 23ਵੀਂ ਕਿਸ਼ਤ, ਅਤੇ ਭੁਗਤਾਨ ਨਾ ਆਉਣ ਤੇ ਕੀ ਕਰਨਾ ਹੈ।',
  alternates: {
    canonical: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa',
    languages: {
      'en-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
      'hi-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi',
      'mr-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr',
      'te-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te',
      'pa-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa',
      'x-default': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
    },
  },
  openGraph: {
    title: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ: ਯੋਗਤਾ, ਲਾਭ, eKYC ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ',
    description: 'ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ DBT ਰਾਹੀਂ 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਸਾਲਾਨਾ 6,000 ਰੁਪਏ। ਪੂਰੀ ਯੋਗਤਾ, ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ, eKYC, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ ਗਾਈਡ।',
    type: 'article',
    publishedTime: '2026-09-28T18:02:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PM-KISAN', 'Kisan Samman Nidhi', 'Government Scheme', 'Farmer Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ: ਯੋਗਤਾ, ਲਾਭ ਅਤੇ ਸਟੇਟਸ',
    description: '3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਸਾਲਾਨਾ 6,000 ਰੁਪਏ। ਪੂਰੀ ਯੋਗਤਾ, ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ, eKYC, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ ਗਾਈਡ।',
  },
  keywords: [
    'ਪੀਐਮ ਕਿਸਾਨ ਸਕੀਮ ਪੰਜਾਬੀ', 'pm kisan punjabi', 'ਪੀਐਮ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ', 'ਪੀਐਮ ਕਿਸਾਨ ਸਟੇਟਸ',
    'ਪੀਐਮ ਕਿਸਾਨ ਯੋਗਤਾ', 'ਪੀਐਮ ਕਿਸਾਨ eKYC', 'ਪੀਐਮ ਕਿਸਾਨ ਆਨਲਾਈਨ ਅਪਲਾਈ', 'ਪੀਐਮ ਕਿਸਾਨ ਕਿਸ਼ਤ',
    'ਪੀਐਮ ਕਿਸਾਨ 24ਵੀਂ ਕਿਸ਼ਤ', 'ਪੀਐਮ ਕਿਸਾਨ 23ਵੀਂ ਕਿਸ਼ਤ', 'ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ ਯੋਜਨਾ',
    'ਪੀਐਮ ਕਿਸਾਨ ਲਾਭਪਾਤਰੀ ਸਟੇਟਸ', 'ਪੀਐਮ ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ', 'pmkisan.gov.in punjabi',
    'ਪੀਐਮ ਕਿਸਾਨ ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ',
  ],
};

const PUBLISHED = '2026-06-28T00:00:00+05:30';
const UPDATED = '2026-09-28T18:02:00+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'ਪੀਐਮ-ਕਿਸਾਨ (ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ): ਯੋਗਤਾ, ਲਾਭ, eKYC ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ',
  description: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ ਦੀ ਪੂਰੀ ਗਾਈਡ: ਤਿੰਨ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਮਿਲਣ ਵਾਲਾ 6,000 ਰੁਪਏ ਸਾਲਾਨਾ ਲਾਭ, ਪੂਰੀ ਯੋਗਤਾ ਅਤੇ ਬਾਹਰ ਰੱਖਣ ਦੇ ਮਾਪਦੰਡ, ਤਿੰਨ eKYC ਤਰੀਕੇ, ਨਵੇਂ ਕਿਸਾਨ ਵਜੋਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਲਾਭਪਾਤਰੀ ਅਤੇ ਭੁਗਤਾਨ ਸਟੇਟਸ ਚੈੱਕ, ਭੁਗਤਾਨ ਨਾ ਆਉਣ ਤੇ ਕੀ ਕਰਨਾ ਹੈ, 23ਵੀਂ ਕਿਸ਼ਤ, ਟੈਕਸ ਯੋਗਤਾ, ਅਤੇ ਭਾਰਤ ਦੀਆਂ ਹੋਰ ਕਿਸਾਨ ਭਲਾਈ ਸਕੀਮਾਂ ਵਿੱਚ ਪੀਐਮ-ਕਿਸਾਨ ਦਾ ਸਥਾਨ।',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'pa-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme', inLanguage: 'en-IN', name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained' },
  about: [
    { '@type': 'Thing', name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ', description: 'ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਦੇਣ ਵਾਲੀ ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ' },
    { '@type': 'GovernmentOrganization', name: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲਾ', description: 'ਪੀਐਮ-ਕਿਸਾਨ ਨੂੰ ਚਲਾਉਣ ਵਾਲਾ ਕੇਂਦਰ ਸਰਕਾਰ ਦਾ ਮੰਤਰਾਲਾ' },
  ],
  keywords: 'ਪੀਐਮ ਕਿਸਾਨ ਸਕੀਮ, ਪੀਐਮ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ, ਪੀਐਮ ਕਿਸਾਨ ਯੋਗਤਾ, ਪੀਐਮ ਕਿਸਾਨ eKYC, ਪੀਐਮ ਕਿਸਾਨ ਸਟੇਟਸ, ਪੀਐਮ ਕਿਸਾਨ ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ, ਪੀਐਮ ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ, 23ਵੀਂ ਕਿਸ਼ਤ',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ', item: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa' },
  ],
};

const faqItems = [
  { q: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ ਕੀ ਹੈ?', a: 'ਪੀਐਮ-ਕਿਸਾਨ, ਯਾਨੀ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ, ਕੇਂਦਰ ਸਰਕਾਰ ਵੱਲੋਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਚਲਾਈ ਜਾਣ ਵਾਲੀ ਇੱਕ ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ ਹੈ, ਜੋ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ ਦਿੰਦੀ ਹੈ। ਇਹ ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲੇ ਅਧੀਨ 1 ਦਸੰਬਰ 2018 ਤੋਂ ਚੱਲ ਰਹੀ ਹੈ, ਅਤੇ ਪੈਸਾ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਸਿੱਧਾ ਜਮ੍ਹਾਂ ਹੁੰਦਾ ਹੈ, ਇਸ ਵਿੱਚ ਰਾਜ ਸਰਕਾਰ ਦਾ ਕੋਈ ਵਿੱਤੀ ਯੋਗਦਾਨ ਨਹੀਂ ਹੁੰਦਾ।' },
  { q: 'ਪੀਐਮ-ਕਿਸਾਨ ਕਿੰਨੇ ਪੈਸੇ ਦਿੰਦੀ ਹੈ, ਅਤੇ ਕਿੰਨੀ ਵਾਰ?', a: 'ਪੀਐਮ-ਕਿਸਾਨ ਹਰ ਯੋਗ ਕਿਸਾਨ ਪਰਿਵਾਰ ਨੂੰ ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਦਿੰਦੀ ਹੈ, ਜੋ 2,000-2,000 ਰੁਪਏ ਦੀਆਂ ਤਿੰਨ ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਵੰਡੀ ਹੁੰਦੀ ਹੈ ਅਤੇ ਲਗਭਗ ਹਰ ਚਾਰ ਮਹੀਨਿਆਂ ਬਾਅਦ ਜਾਰੀ ਹੁੰਦੀ ਹੈ। ਤਿੰਨੇ ਕਿਸ਼ਤਾਂ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਸਿੱਧਾ ਕਿਸਾਨ ਪਰਿਵਾਰ ਦੇ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਾਂਦੀਆਂ ਹਨ।' },
  { q: 'ਪੀਐਮ-ਕਿਸਾਨ ਲਈ ਕੌਣ ਯੋਗ ਹੈ?', a: 'ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ, ਜਿਨ੍ਹਾਂ ਦੀ ਪਰਿਭਾਸ਼ਾ ਪਤੀ, ਪਤਨੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਨਾਬਾਲਗ ਬੱਚਿਆਂ ਵਜੋਂ ਕੀਤੀ ਗਈ ਹੈ, ਪੀਐਮ-ਕਿਸਾਨ ਲਈ ਯੋਗ ਹਨ, ਬਸ਼ਰਤੇ ਰਾਜ ਜਾਂ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਸਰਕਾਰ ਦੇ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਉਨ੍ਹਾਂ ਨੂੰ ਇਸ ਤਰ੍ਹਾਂ ਦਰਜ ਕਰਦੇ ਹੋਣ। ਇਸ ਤੋਂ ਬਾਅਦ ਯੋਗਤਾ ਨੂੰ ਬਾਹਰ ਰੱਖਣ ਦੀ ਖਾਸ ਸੂਚੀ ਸੀਮਤ ਕਰਦੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਸੰਸਥਾਗਤ ਜ਼ਮੀਨ ਮਾਲਕ, ਸਰਕਾਰੀ ਕਰਮਚਾਰੀ ਅਤੇ ਇੱਕ ਸੀਮਾ ਤੋਂ ਵੱਧ ਪੈਨਸ਼ਨ ਲੈਣ ਵਾਲੇ, ਆਮਦਨ ਕਰ ਭਰਨ ਵਾਲੇ, ਕੁਝ ਪੇਸ਼ੇਵਰ ਅਤੇ ਕੁਝ ਹੋਰ ਮਾਮਲੇ ਸ਼ਾਮਲ ਹਨ।' },
  { q: 'ਪੀਐਮ-ਕਿਸਾਨ ਤੋਂ ਕੌਣ ਬਾਹਰ ਹੈ?', a: 'ਪੀਐਮ-ਕਿਸਾਨ ਤੋਂ ਸੰਸਥਾਗਤ ਜ਼ਮੀਨ ਮਾਲਕ, ਅਜਿਹੇ ਪਰਿਵਾਰ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਕੋਈ ਮੈਂਬਰ ਮੌਜੂਦਾ ਜਾਂ ਸਾਬਕਾ ਸੰਵਿਧਾਨਕ ਅਹੁਦੇਦਾਰ, ਸੰਸਦ ਮੈਂਬਰ, ਵਿਧਾਇਕ, ਐਮਐਲਸੀ, ਮੇਅਰ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਪੰਚਾਇਤ ਚੇਅਰਪਰਸਨ ਰਿਹਾ ਹੈ, ਮਲਟੀ-ਟਾਸਕਿੰਗ ਸਟਾਫ/ਕਲਾਸ IV ਪੱਧਰ ਤੋਂ ਉੱਪਰ ਕੰਮ ਕਰ ਰਹੇ ਜਾਂ ਸੇਵਾਮੁਕਤ ਸਰਕਾਰੀ ਅਤੇ ਜਨਤਕ ਖੇਤਰ ਦੇ ਕਰਮਚਾਰੀ, 10,000 ਰੁਪਏ ਜਾਂ ਇਸ ਤੋਂ ਵੱਧ ਮਹੀਨਾਵਾਰ ਪੈਨਸ਼ਨ ਲੈਣ ਵਾਲੇ, ਪਿਛਲੇ ਮੁਲਾਂਕਣ ਸਾਲ ਵਿੱਚ ਆਮਦਨ ਕਰ ਭਰਨ ਵਾਲੇ, ਅਤੇ ਰਜਿਸਟਰਡ ਡਾਕਟਰ, ਇੰਜੀਨੀਅਰ, ਵਕੀਲ, ਚਾਰਟਰਡ ਅਕਾਊਂਟੈਂਟ ਅਤੇ ਆਰਕੀਟੈਕਟ ਬਾਹਰ ਰੱਖੇ ਗਏ ਹਨ। 1 ਫਰਵਰੀ 2019 ਨੂੰ ਜਾਂ ਇਸ ਤੋਂ ਬਾਅਦ ਖਰੀਦੀ ਗਈ ਜ਼ਮੀਨ, ਅਤੇ ਨਾਬਾਲਗ ਦੇ ਨਾਂ ਤੇ ਦਰਜ ਜ਼ਮੀਨ ਵੀ ਇਸ ਲਾਭ ਤੋਂ ਬਾਹਰ ਹੈ।' },
  { q: 'ਪੀਐਮ-ਕਿਸਾਨ eKYC ਕੀ ਹੈ, ਅਤੇ ਕੀ ਇਹ ਜ਼ਰੂਰੀ ਹੈ?', a: 'eKYC ਇੱਕ ਵਾਰੀ ਦੀ ਪਛਾਣ ਤਸਦੀਕ ਹੈ ਜੋ ਹਰ ਪੀਐਮ-ਕਿਸਾਨ ਲਾਭਪਾਤਰੀ ਨੂੰ ਕਿਸ਼ਤਾਂ ਮਿਲਦੀਆਂ ਰਹਿਣ ਲਈ ਪੂਰੀ ਕਰਨੀ ਜ਼ਰੂਰੀ ਹੈ, ਅਤੇ ਇਹ ਲਾਜ਼ਮੀ ਹੈ: ਇਸ ਤੋਂ ਬਿਨਾਂ ਕੋਈ ਵੀ ਅਗਲੀ ਕਿਸ਼ਤ ਜਾਰੀ ਨਹੀਂ ਹੁੰਦੀ। ਇਹ ਪੋਰਟਲ ਜਾਂ ਐਪ ਤੇ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਮੋਬਾਈਲ OTP ਰਾਹੀਂ, ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ ਤੇ ਫਿੰਗਰਪ੍ਰਿੰਟ ਜਾਂ ਆਇਰਿਸ ਸਕੈਨ ਵਰਗੇ ਬਾਇਓਮੈਟ੍ਰਿਕ ਤਰੀਕੇ ਨਾਲ, ਜਾਂ ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਫੇਸ ਆਥੈਂਟੀਕੇਸ਼ਨ ਰਾਹੀਂ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ।' },
  { q: 'ਮੇਰਾ ਪੀਐਮ-ਕਿਸਾਨ eKYC ਸਟੇਟਸ ਕਿਵੇਂ ਚੈੱਕ ਕਰਾਂ?', a: 'pmkisan.gov.in ਦੇ Farmer Corner ਵਿੱਚ ਲਾਭਪਾਤਰੀ ਜਾਂ eKYC ਸਟੇਟਸ ਸੈਕਸ਼ਨ ਵਿੱਚ ਸਟੇਟਸ ਚੈੱਕ ਕਰੋ, ਜਿੱਥੇ ਪੂਰੀ ਹੋਣ ਤੇ ਇਹ "Yes" ਜਾਂ "Verified" ਦਿਖਾਉਂਦਾ ਹੈ ਅਤੇ ਅਜੇ ਬਾਕੀ ਹੋਵੇ ਤਾਂ "Pending" ਦਿਖਾਉਂਦਾ ਹੈ। eKYC ਪੂਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ ਸਟੇਟਸ ਅਪਡੇਟ ਹੋਣ ਵਿੱਚ 24 ਘੰਟੇ ਤੱਕ ਦਾ ਸਮਾਂ ਲੱਗ ਸਕਦਾ ਹੈ।' },
  { q: 'ਨਵੇਂ ਕਿਸਾਨ ਵਜੋਂ ਪੀਐਮ-ਕਿਸਾਨ ਵਿੱਚ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਿਵੇਂ ਕਰਾਂ?', a: 'ਨਵੇਂ ਕਿਸਾਨ pmkisan.gov.in ਦੇ Farmer Corner ਸੈਕਸ਼ਨ ਵਿੱਚ "New Farmer Registration" ਵਿਕਲਪ ਰਾਹੀਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਰਦੇ ਹਨ, ਇੱਥੇ ਹੀ ਸਰਕਾਰ ਮੌਜੂਦਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਫਾਰਮ ਰੱਖਦੀ ਹੈ, ਕਿਸੇ ਵੱਖਰੇ ਡੀਪ ਲਿੰਕ ਤੇ ਨਹੀਂ। ਜੋ ਕਿਸਾਨ ਮੋਬਾਈਲ ਤੋਂ ਅਪਲਾਈ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹਨ, ਉਨ੍ਹਾਂ ਲਈ ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਵੀ ਇਹੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤਰੀਕਾ ਉਪਲਬਧ ਹੈ।' },
  { q: 'ਮੇਰਾ ਪੀਐਮ-ਕਿਸਾਨ ਲਾਭਪਾਤਰੀ ਜਾਂ ਭੁਗਤਾਨ ਸਟੇਟਸ ਕਿਵੇਂ ਚੈੱਕ ਕਰਾਂ?', a: 'pmkisan.gov.in ਦੇ Farmer Corner ਸੈਕਸ਼ਨ ਵਿੱਚ "Know Your Status" ਰਾਹੀਂ ਆਪਣਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ, ਜਾਂ ਆਪਣੇ ਰਿਕਾਰਡ ਨਾਲ ਜੁੜਿਆ ਮੋਬਾਈਲ ਨੰਬਰ ਅਤੇ ਆਧਾਰ ਨੰਬਰ ਪਾ ਕੇ ਸਟੇਟਸ ਚੈੱਕ ਕਰੋ। ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਵੀ ਇਹੀ ਸਟੇਟਸ ਚੈੱਕ ਉਪਲਬਧ ਹੈ, ਅਤੇ ਕਿਸਾਨ e-Mitra ਚੈਟਬੋਟ ਆਮ ਯੋਗਤਾ ਅਤੇ ਸਟੇਟਸ ਸਬੰਧੀ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹੈ।' },
  { q: 'ਮੈਨੂੰ ਮੇਰੀ ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤ ਕਿਉਂ ਨਹੀਂ ਮਿਲੀ?', a: 'ਕਿਸ਼ਤ ਨਾ ਮਿਲਣ ਦਾ ਸਭ ਤੋਂ ਆਮ ਕਾਰਨ eKYC ਦਾ ਪੈਂਡਿੰਗ ਹੋਣਾ, ਬੈਂਕ ਖਾਤੇ ਦਾ ਆਧਾਰ ਨਾਲ ਨਾ ਜੁੜਿਆ ਹੋਣਾ, ਆਧਾਰ ਅਤੇ ਬੈਂਕ ਰਿਕਾਰਡਾਂ ਵਿੱਚ ਮੇਲ ਨਾ ਖਾਣਾ, ਜਾਂ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਦੀ ਤਸਦੀਕ ਵਿੱਚ ਅਸਫਲ ਹੋਣਾ ਹੈ। ਪਹਿਲਾਂ pmkisan.gov.in ਤੇ ਆਪਣਾ eKYC ਅਤੇ ਲਾਭਪਾਤਰੀ ਸਟੇਟਸ ਚੈੱਕ ਕਰੋ, ਕਿਉਂਕਿ ਪੋਰਟਲ ਤੇ ਆਮ ਤੌਰ ਤੇ ਭੁਗਤਾਨ ਨਾ ਹੋਣ ਦਾ ਸਹੀ ਕਾਰਨ ਦੱਸਿਆ ਹੁੰਦਾ ਹੈ।' },
  { q: 'ਜੇ ਮੇਰੇ ਪੀਐਮ-ਕਿਸਾਨ ਆਧਾਰ ਜਾਂ ਬੈਂਕ ਵੇਰਵੇ ਗਲਤ ਹਨ ਤਾਂ ਕੀ ਕਰਾਂ?', a: 'ਭੁਗਤਾਨ ਰੋਕ ਰਹੇ ਨਾਂ ਜਾਂ ਵੇਰਵੇ ਦੇ ਮੇਲ ਨਾ ਖਾਣ ਨੂੰ ਠੀਕ ਕਰਨ ਲਈ pmkisan.gov.in ਦੇ Farmer Corner ਸੈਕਸ਼ਨ ਵਿੱਚ "Edit Aadhaar Failure Records" ਵਿਕਲਪ ਵਰਤੋ। ਬੈਂਕ ਖਾਤਾ ਬਦਲਣ ਜਾਂ ਆਧਾਰ ਸੀਡਿੰਗ ਦੀ ਸਮੱਸਿਆ ਲਈ ਆਪਣੀ ਬੈਂਕ ਸ਼ਾਖਾ ਜਾਂ ਨੇੜਲੇ ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ ਜਾਓ, ਕਿਉਂਕਿ ਇਹ ਸੁਧਾਰ ਬੈਂਕ ਜਾਂ CSC ਪੱਧਰ ਤੇ ਹੁੰਦੇ ਹਨ, ਪੋਰਟਲ ਤੇ ਨਹੀਂ।' },
  { q: 'ਪੀਐਮ-ਕਿਸਾਨ ਦੀ ਆਖਰੀ ਕਿਸ਼ਤ ਕਦੋਂ ਜਾਰੀ ਹੋਈ, ਅਤੇ ਅਗਲੀ ਕਿਸ਼ਤ ਕਦੋਂ ਆਵੇਗੀ?', a: '23ਵੀਂ ਕਿਸ਼ਤ 20 ਜੂਨ 2026 ਨੂੰ ਪੱਛਮੀ ਬੰਗਾਲ ਦੇ ਹੁਗਲੀ ਤੋਂ ਜਾਰੀ ਹੋਈ, ਜਿਸ ਵਿੱਚ 9.44 ਕਰੋੜ ਤੋਂ ਵੱਧ ਕਿਸਾਨਾਂ ਨੂੰ 18,880 ਕਰੋੜ ਰੁਪਏ ਤੋਂ ਵੱਧ ਦੀ ਰਾਸ਼ੀ ਵੰਡੀ ਗਈ। 24ਵੀਂ ਕਿਸ਼ਤ ਅਕਤੂਬਰ ਜਾਂ ਨਵੰਬਰ 2026 ਦੇ ਆਸਪਾਸ ਆਉਣ ਦੀ ਉਮੀਦ ਹੈ, ਹਾਲਾਂਕਿ ਸਰਕਾਰ ਨੇ ਹਾਲੇ ਤੱਕ ਇਸਦੀ ਕੋਈ ਤਾਰੀਖ ਅਧਿਕਾਰਤ ਤੌਰ ਤੇ ਤੈਅ ਨਹੀਂ ਕੀਤੀ।' },
  { q: 'ਕੀ ਪੀਐਮ-ਕਿਸਾਨ ਦਾ 6,000 ਰੁਪਏ ਦਾ ਲਾਭ ਟੈਕਸ ਯੋਗ ਹੈ?', a: 'ਪੀਐਮ-ਕਿਸਾਨ ਭੁਗਤਾਨਾਂ ਨੂੰ ਆਮ ਤੌਰ ਤੇ ਟੈਕਸ-ਮੁਕਤ ਖੇਤੀ ਆਮਦਨ ਸਹਾਇਤਾ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ, ਨਾ ਕਿ ਟੈਕਸ ਯੋਗ ਆਮਦਨ, ਕਿਉਂਕਿ ਇਹ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਦਿੱਤੀ ਜਾਣ ਵਾਲੀ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ ਹੈ। ਜਿਨ੍ਹਾਂ ਕਿਸਾਨਾਂ ਦੀ ਹੋਰ ਆਮਦਨ ਟੈਕਸ ਯੋਗ ਹੈ, ਉਨ੍ਹਾਂ ਨੂੰ ਆਮ ਨਿਯਮ ਤੇ ਭਰੋਸਾ ਕਰਨ ਦੀ ਬਜਾਏ ਕਿਸੇ ਯੋਗ ਟੈਕਸ ਸਲਾਹਕਾਰ ਤੋਂ ਆਪਣੀ ਖਾਸ ਸਥਿਤੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।' },
  { q: 'ਕੀ ਇੱਕੋ ਪਰਿਵਾਰ ਦੇ ਇੱਕ ਤੋਂ ਵੱਧ ਮੈਂਬਰ ਪੀਐਮ-ਕਿਸਾਨ ਲੈ ਸਕਦੇ ਹਨ?', a: 'ਨਹੀਂ। ਹਰ ਯੋਗ ਕਿਸਾਨ ਪਰਿਵਾਰ ਵਿੱਚੋਂ ਸਿਰਫ਼ ਇੱਕ ਹੀ ਮੈਂਬਰ ਪੀਐਮ-ਕਿਸਾਨ ਦਾ ਲਾਭ ਲੈ ਸਕਦਾ ਹੈ, ਅਤੇ ਜੇ ਇੱਕੋ ਪਰਿਵਾਰ ਦੇ ਕਈ ਮੈਂਬਰ ਰਜਿਸਟਰਡ ਪਾਏ ਜਾਂਦੇ ਹਨ, ਤਾਂ ਵਾਧੂ ਰਜਿਸਟ੍ਰੇਸ਼ਨਾਂ ਲਾਭਪਾਤਰੀ ਸੂਚੀ ਵਿੱਚੋਂ ਹਟਾ ਦਿੱਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਇੱਥੇ "ਪਰਿਵਾਰ" ਦਾ ਮਤਲਬ ਹੈ ਪਤੀ, ਪਤਨੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਨਾਬਾਲਗ ਬੱਚੇ।' },
  { q: 'ਕੀ ਅੱਜ ਖੇਤੀ ਵਾਲੀ ਜ਼ਮੀਨ ਖਰੀਦਣ ਨਾਲ ਮੈਂ ਪੀਐਮ-ਕਿਸਾਨ ਲਈ ਯੋਗ ਹੋ ਜਾਵਾਂਗਾ?', a: 'ਆਪਣੇ ਆਪ ਨਹੀਂ। ਪੀਐਮ-ਕਿਸਾਨ ਅਜਿਹੇ ਕਿਸਾਨਾਂ ਨੂੰ ਬਾਹਰ ਰੱਖਦੀ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਜ਼ਮੀਨ ਦੀ ਮਾਲਕੀ 1 ਫਰਵਰੀ 2019 ਨੂੰ ਜਾਂ ਇਸ ਤੋਂ ਬਾਅਦ ਮਿਲੀ ਹੈ, ਇਹ ਸੀਮਾ ਸਕੀਮ ਨੇ ਖੁਦ ਸਿਰਫ਼ ਲਾਭ ਲੈਣ ਲਈ ਕੀਤੇ ਜਾਣ ਵਾਲੇ ਜ਼ਮੀਨੀ ਤਬਾਦਲਿਆਂ ਨੂੰ ਰੋਕਣ ਲਈ ਤੈਅ ਕੀਤੀ ਹੈ, ਇਸ ਲਈ ਸਿਰਫ਼ ਉਸ ਤਾਰੀਖ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਜ਼ਮੀਨ ਹੀ ਯੋਗਤਾ ਵਿੱਚ ਗਿਣੀ ਜਾਂਦੀ ਹੈ।' },
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

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa',
  name: 'ਪੀਐਮ-ਕਿਸਾਨ (ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ): ਯੋਗਤਾ, ਲਾਭ, eKYC ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ',
  url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa',
  inLanguage: 'pa-IN',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ',
      alternateName: 'PM-KISAN',
      description: 'ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ, 100% ਕੇਂਦਰੀ ਫੰਡਿੰਗ ਨਾਲ ਚੱਲਣ ਵਾਲੀ ਅਤੇ 1 ਦਸੰਬਰ 2018 ਤੋਂ ਚਾਲੂ, ਜੋ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਦੀ ਆਮਦਨ ਸਹਾਇਤਾ ਦਿੰਦੀ ਹੈ।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'eKYC (ਪੀਐਮ-ਕਿਸਾਨ)',
      description: 'ਹਰ ਪੀਐਮ-ਕਿਸਾਨ ਲਾਭਪਾਤਰੀ ਲਈ ਲਾਜ਼ਮੀ, ਇੱਕ ਵਾਰੀ ਦੀ ਪਛਾਣ ਤਸਦੀਕ, ਜੋ ਆਧਾਰ OTP, ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ ਤੇ ਬਾਇਓਮੈਟ੍ਰਿਕ ਤਸਦੀਕ, ਜਾਂ ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਫੇਸ ਆਥੈਂਟੀਕੇਸ਼ਨ ਰਾਹੀਂ ਪੂਰੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'ਭਾਰਤ ਭਰ ਦੇ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-pm-kisan', name: 'ਪੀਐਮ-ਕਿਸਾਨ ਕੀ ਹੈ' },
    { '@type': 'WebPageElement', cssSelector: '#benefit-amount', name: 'ਲਾਭ ਰਾਸ਼ੀ ਅਤੇ ਭੁਗਤਾਨ ਸਮਾਂ-ਸਾਰਣੀ' },
    { '@type': 'WebPageElement', cssSelector: '#funding', name: 'ਪੀਐਮ-ਕਿਸਾਨ ਨੂੰ ਫੰਡ ਕੌਣ ਦਿੰਦਾ ਹੈ' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'ਕੌਣ ਯੋਗ ਹੈ' },
    { '@type': 'WebPageElement', cssSelector: '#exclusions', name: 'ਕੌਣ ਬਾਹਰ ਹੈ' },
    { '@type': 'WebPageElement', cssSelector: '#ekyc', name: 'eKYC ਤਰੀਕੇ' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-register', name: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਿਵੇਂ ਕਰੀਏ' },
    { '@type': 'WebPageElement', cssSelector: '#check-status', name: 'ਸਟੇਟਸ ਕਿਵੇਂ ਚੈੱਕ ਕਰੀਏ' },
    { '@type': 'WebPageElement', cssSelector: '#payment-issues', name: 'ਕਿਸ਼ਤ ਨਾ ਆਉਣ ਜਾਂ eKYC ਅਸਫਲ ਹੋਣ ਤੇ' },
    { '@type': 'WebPageElement', cssSelector: '#latest-installment', name: '23ਵੀਂ ਕਿਸ਼ਤ ਅਤੇ ਅੱਗੇ ਕੀ' },
    { '@type': 'WebPageElement', cssSelector: '#is-it-taxable', name: 'ਲਾਭ ਟੈਕਸ ਯੋਗ ਹੈ ਜਾਂ ਨਹੀਂ' },
    { '@type': 'WebPageElement', cssSelector: '#growing-your-installment', name: 'ਕਿਸ਼ਤਾਂ ਨੂੰ ਕਿਵੇਂ ਵਧਾਈਏ' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'ਹੋਰ ਕਿਸਾਨ ਭਲਾਈ ਸਕੀਮਾਂ' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor ਭਾਰਤ ਲਈ ਆਟੋਮੇਟਿਡ ਵਿੱਤੀ ਐਕਸ਼ਨ ਲੇਅਰ ਬਣਾ ਰਿਹਾ ਹੈ, ਜੋ ਵਿੱਤੀ ਫੈਸਲੇ ਲੈਣ ਵਾਲੇ ਲੋਕਾਂ ਨੂੰ ਸਹੀ ਉਤਪਾਦਾਂ, ਸੰਦਾਂ ਅਤੇ ਸਲਾਹਕਾਰਾਂ ਨਾਲ ਜੋੜਦਾ ਹੈ।',
  knowsAbout: ['Pradhan Mantri Kisan Samman Nidhi', 'PM-KISAN', 'Central Government Farmer Welfare Schemes', 'Direct Benefit Transfer', 'Personal Finance India'],
};

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  green:  '#166534',
  amber:  '#A15C00',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' };
const pStyle: React.CSSProperties = { fontSize: 15.5, color: C.ink, lineHeight: 1.9, marginBottom: 20, fontFamily: INTER };

function Breadcrumb() {
  const crumbs = [
    { label: 'ਹੋਮ', href: '/' },
    { label: 'ਬਲੌਗ', href: '/blogs' },
    { label: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.8 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '11px 15px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '10px 15px', borderBottom: `1px solid ${C.border}`, lineHeight: 1.6 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 24 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 8, captionSide: 'top', paddingBottom: 8 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75 }}>
      {children}
    </div>
  );
}

function KeyFacts() {
  const facts = [
    { label: 'ਸਾਲਾਨਾ ਲਾਭ', value: '6,000 ਰੁਪਏ' },
    { label: 'ਕਿਸ਼ਤਾਂ', value: '3 x 2,000 ਰੁਪਏ' },
    { label: 'ਸ਼ੁਰੂਆਤ', value: '1 ਦਸੰਬਰ 2018' },
    { label: 'ਫੰਡਿੰਗ', value: '100% ਕੇਂਦਰ ਸਰਕਾਰ' },
    { label: 'ਭੁਗਤਾਨ ਤਰੀਕਾ', value: 'DBT' },
    { label: 'ਤਾਜ਼ਾ ਕਿਸ਼ਤ', value: '23ਵੀਂ, 20 ਜੂਨ 2026' },
  ];
  return (
    <TableWrap label="ਮੁੱਖ ਤੱਥ">
      {facts.map((item, i) => (
        <div key={item.label} style={{ padding: '11px 16px', borderBottom: i < facts.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink2, flexShrink: 0 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: POPPINS, textAlign: 'right' as const }}>{item.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'KVP ਕੈਲਕੂਲੇਟਰ', desc: 'ਪੀਐਮ-ਕਿਸਾਨ ਦੀ ਬੱਚਤ ਨੂੰ ਤੈਅ ਸਮਾਂ-ਮਿਆਦ ਵਿੱਚ ਕਿਸਾਨ ਵਿਕਾਸ ਪੱਤਰ ਨਾਲ ਦੁੱਗਣਾ ਕਰੋ', href: '/calculators/kvp-calculator' },
    { label: 'ਪੋਸਟ ਆਫਿਸ MIS ਕੈਲਕੂਲੇਟਰ', desc: 'ਬਚਾਈਆਂ ਕਿਸ਼ਤਾਂ ਨੂੰ ਮਹੀਨਾਵਾਰ ਆਮਦਨ ਵਿੱਚ ਬਦਲੋ', href: '/calculators/post-office-mis-calculator' },
    { label: 'ਅਟਲ ਪੈਨਸ਼ਨ ਯੋਜਨਾ ਕੈਲਕੂਲੇਟਰ', desc: 'ਪੀਐਮ-ਕਿਸਾਨ ਦੇ ਨਾਲ ਇੱਕ ਗਰੰਟੀਸ਼ੁਦਾ ਪੈਨਸ਼ਨ ਬਣਾਓ', href: '/calculators/atal-pension-yojana-calculator' },
    { label: 'ਇਨਕਮ ਟੈਕਸ ਕੈਲਕੂਲੇਟਰ', desc: 'ਜੇ ਹੋਰ ਟੈਕਸ ਯੋਗ ਆਮਦਨ ਹੈ ਤਾਂ ਕੁੱਲ ਟੈਕਸ ਜ਼ਿੰਮੇਵਾਰੀ ਚੈੱਕ ਕਰੋ', href: '/calculators/income-tax-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor ਕੈਲਕੂਲੇਟਰ</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/annapurna-bhandar-2026', label: 'Annapurna Bhandar 2026: Eligibility, Apply, Status' },
    { href: '/blogs/jai-bangla-pension-scheme-2026', label: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount, Apply' },
    { href: '/blogs/epfo-login-uan-passbook', label: 'EPFO Login, UAN and PF Passbook Guide' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>ਸੰਬੰਧਿਤ ਲੇਖ</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.7, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>ਨੋਟ:</strong> ਇਹ ਲੇਖ <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pmkisan.gov.in</a> ਅਤੇ <a href="https://www.pib.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pib.gov.in</a> ਸਮੇਤ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਸਰੋਤਾਂ ਤੇ ਆਧਾਰਿਤ ਹੈ, ਜੋ ਪ੍ਰਕਾਸ਼ਨ ਦੇ ਸਮੇਂ ਤੱਕ ਦੀ ਜਾਣਕਾਰੀ ਦਰਸਾਉਂਦਾ ਹੈ। ਯੋਗਤਾ ਨਿਯਮ, ਬਾਹਰ ਰੱਖਣ ਦੇ ਮਾਪਦੰਡ, ਕਿਸ਼ਤਾਂ ਦੀਆਂ ਤਾਰੀਖਾਂ ਅਤੇ ਪੋਰਟਲ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਬਦਲ ਸਕਦੀਆਂ ਹਨ; ਕੋਈ ਵੀ ਕਦਮ ਚੁੱਕਣ ਤੋਂ ਪਹਿਲਾਂ ਹਮੇਸ਼ਾ ਆਪਣੀ ਖਾਸ ਸਥਿਤੀ, ਦਸਤਾਵੇਜ਼ ਅਤੇ ਆਖਰੀ ਤਾਰੀਖਾਂ ਦੀ ਪੁਸ਼ਟੀ ਸਿੱਧੇ pmkisan.gov.in ਤੇ ਕਰੋ। Fermor ਭਾਰਤ ਸਰਕਾਰ ਨਾਲ ਸਬੰਧਿਤ ਨਹੀਂ ਹੈ ਅਤੇ ਇਹ ਕੋਈ ਅਧਿਕਾਰਤ ਮਾਰਗਦਰਸ਼ਨ ਜਾਂ ਟੈਕਸ ਸਲਾਹ ਨਹੀਂ ਹੈ।
      </p>
    </div>
  );
}

export default function PMKisanSchemePunjabiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="pa">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>ਸਰਕਾਰੀ ਸਕੀਮਾਂ</span>
          </div>
          <h1 lang="pa" style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.01em', marginBottom: 18, maxWidth: 860 }}>
            ਪੀਐਮ-ਕਿਸਾਨ (ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ): ਯੋਗਤਾ, ਲਾਭ, eKYC ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 720, marginBottom: 22 }}>
            ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਪੀਐਮ-ਕਿਸਾਨ ਲਾਭ ਦੀ ਪੂਰੀ ਗਾਈਡ: ਕੌਣ ਯੋਗ ਹੈ, ਕੌਣ ਬਾਹਰ ਹੈ, eKYC ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਸਟੇਟਸ ਚੈੱਕ ਕਿਵੇਂ ਕਰੀਏ, ਅਤੇ ਭੁਗਤਾਨ ਨਾ ਆਉਣ ਤੇ ਕੀ ਕਰੀਏ।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>ਅੱਪਡੇਟ ਕੀਤਾ <time dateTime={UPDATED}>28 ਸਤੰਬਰ, 2026</time></span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 ਮਿੰਟਾਂ ਵਿੱਚ ਪੜ੍ਹੋ</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article lang="pa" itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ (ਪੀਐਮ-ਕਿਸਾਨ) ਇੱਕ ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ ਹੈ, ਜੋ 100% ਭਾਰਤ ਸਰਕਾਰ ਵੱਲੋਂ ਵਿੱਤ ਪੋਸ਼ਿਤ ਹੈ, ਅਤੇ ਜੋ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ, 2,000-2,000 ਰੁਪਏ ਦੀਆਂ ਤਿੰਨ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਦਿੰਦੀ ਹੈ। ਇਹ ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲੇ ਅਧੀਨ 1 ਦਸੰਬਰ 2018 ਤੋਂ ਚੱਲ ਰਹੀ ਹੈ, ਅਤੇ ਹਰ ਭੁਗਤਾਨ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਸਿੱਧਾ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਾਂਦਾ ਹੈ, ਇਸ ਵਿੱਚ ਕੋਈ ਸ਼ਾਖਾ ਜਾਣ ਦੀ ਲੋੜ ਜਾਂ ਵਿਚੋਲੇ ਦਾ ਕੋਈ ਸ਼ਾਮਲ ਹੋਣਾ ਨਹੀਂ ਹੁੰਦਾ।
            </p>
            <p style={pStyle}>
              ਇਹ ਗਾਈਡ ਪੂਰੀ ਤਸਵੀਰ ਦਿਖਾਉਂਦੀ ਹੈ: ਸਹੀ-ਸਹੀ ਕੌਣ ਯੋਗ ਹੈ ਅਤੇ ਕੌਣ ਬਾਹਰ ਹੈ, eKYC ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਛੱਡਣ ਤੇ ਭੁਗਤਾਨ ਕਿਉਂ ਰੁਕ ਜਾਂਦਾ ਹੈ, ਨਵੇਂ ਕਿਸਾਨ ਵਜੋਂ ਕਿਵੇਂ ਰਜਿਸਟਰ ਕਰਨਾ ਹੈ, ਆਪਣਾ ਸਟੇਟਸ ਕਿਵੇਂ ਚੈੱਕ ਕਰਨਾ ਹੈ, ਕਿਸ਼ਤ ਨਾ ਆਉਣ ਤੇ ਕੀ ਕਰਨਾ ਹੈ, ਅਤੇ ਭਾਰਤ ਦੀਆਂ ਬਾਕੀ ਕਿਸਾਨ ਭਲਾਈ ਸਕੀਮਾਂ ਵਿਚਾਲੇ ਪੀਐਮ-ਕਿਸਾਨ ਦਾ ਸਥਾਨ ਕਿੱਥੇ ਹੈ।
            </p>

            <PMKisanLanguageSwitcher
              current="pa"
              heading="ਇਹ ਗਾਈਡ ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ, ਮਰਾਠੀ ਅਤੇ ਤੇਲਗੂ ਵਿੱਚ ਵੀ ਉਪਲਬਧ ਹੈ"
              subtext="ਜਿਸ ਭਾਸ਼ਾ ਵਿੱਚ ਤੁਸੀਂ ਸਹਿਜ ਹੋ, ਉਸ ਵਿੱਚ ਪੜ੍ਹੋ। ਹਰ ਵਰਜਨ ਵਿੱਚ ਇੱਕੋ ਜਿਹੀ ਯੋਗਤਾ, eKYC, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਸਟੇਟਸ ਦੀ ਜਾਣਕਾਰੀ ਹੈ।"
            />

            <h2 id="what-is-pm-kisan" style={hStyle}>ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ ਕੀ ਹੈ?</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਕੇਂਦਰ ਸਰਕਾਰ ਵੱਲੋਂ ਸਿੱਧੇ ਚਲਾਈ ਜਾਣ ਵਾਲੀ ਆਮਦਨ ਸਹਾਇਤਾ ਸਕੀਮ ਹੈ, ਇਸ ਵਿੱਚ ਰਾਜ ਸਰਕਾਰ ਦਾ ਕੋਈ ਯੋਗਦਾਨ ਜਾਂ ਕੋਈ ਵਿਚੋਲਾ ਪਰਤ ਨਹੀਂ ਹੈ। <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a> ਦੇ ਅਨੁਸਾਰ, ਇਸਨੂੰ ਇੱਕ ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ ਦੱਸਿਆ ਗਿਆ ਹੈ ਜਿਸਨੂੰ ਭਾਰਤ ਸਰਕਾਰ ਤੋਂ 100% ਫੰਡਿੰਗ ਮਿਲਦੀ ਹੈ, ਜੋ 1 ਦਸੰਬਰ 2018 ਤੋਂ ਚਾਲੂ ਹੈ ਅਤੇ ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲੇ ਵੱਲੋਂ ਚਲਾਈ ਜਾਂਦੀ ਹੈ।
            </p>
            <p style={pStyle}>
              ਇਸ ਸਕੀਮ ਦੇ ਨਾਂ ਦਾ ਮਤਲਬ ਲਗਭਗ ਕਿਸਾਨਾਂ ਦੇ ਸਨਮਾਨ ਲਈ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਦੀ ਨਿਧੀ ਹੈ, ਅਤੇ ਇਸਦਾ ਡਿਜ਼ਾਈਨ ਜਾਣਬੁੱਝ ਕੇ ਸਾਦਾ ਰੱਖਿਆ ਗਿਆ ਹੈ: ਮੌਜੂਦਾ ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਦੇ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡਾਂ ਰਾਹੀਂ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਦੀ ਪਛਾਣ ਕਰਨਾ, ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਕਰਜ਼ੇ, ਸਬਸਿਡੀ ਜਾਂ ਭਾਰੀ ਕਾਗਜ਼ੀ ਦਾਅਵਾ ਪ੍ਰਕਿਰਿਆ ਦੇ ਇੱਕ ਤੈਅ ਸਾਲਾਨਾ ਰਾਸ਼ੀ ਦੇਣਾ।
            </p>
            <BulletList items={[
              <span key={1}><strong>ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ:</strong> ਪੂਰੀ ਤਰ੍ਹਾਂ ਕੇਂਦਰ ਸਰਕਾਰ ਵੱਲੋਂ ਵਿੱਤ ਪੋਸ਼ਿਤ, ਕੇਂਦਰੀ ਸਪਾਂਸਰਡ ਸਕੀਮ ਦੇ ਉਲਟ ਜਿਸ ਵਿੱਚ ਰਾਜ ਵੀ ਯੋਗਦਾਨ ਦਿੰਦੇ ਹਨ।</span>,
              <span key={2}><strong>ਟੀਚਾ ਸਮੂਹ:</strong> ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਦੇ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡਾਂ ਰਾਹੀਂ ਪਛਾਣੇ ਗਏ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ।</span>,
              <span key={3}><strong>ਵੰਡ ਵਿਧੀ:</strong> ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ, ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ।</span>,
              <span key={4}><strong>ਸੰਚਾਲਨ ਮੰਤਰਾਲਾ:</strong> ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲਾ, ਭਾਰਤ ਸਰਕਾਰ।</span>,
            ]} />
            <DataTable
              caption="ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ: ਮੁੱਖ ਵੇਰਵੇ"
              headers={['ਪੈਰਾਮੀਟਰ', 'ਵੇਰਵਾ']}
              rows={[
                ['ਸਕੀਮ ਦਾ ਨਾਂ', 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ (ਪੀਐਮ-ਕਿਸਾਨ)'],
                ['ਸਕੀਮ ਦੀ ਕਿਸਮ', 'ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ'],
                ['ਫੰਡਿੰਗ', '100% ਭਾਰਤ ਸਰਕਾਰ'],
                ['ਸ਼ੁਰੂਆਤ', '1 ਦਸੰਬਰ 2018'],
                ['ਸਾਲਾਨਾ ਲਾਭ', 'ਪ੍ਰਤੀ ਕਿਸਾਨ ਪਰਿਵਾਰ 6,000 ਰੁਪਏ'],
                ['ਕਿਸ਼ਤਾਂ', '2,000-2,000 ਰੁਪਏ ਦੀਆਂ 3 ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ, ਲਗਭਗ ਹਰ ਚਾਰ ਮਹੀਨਿਆਂ ਬਾਅਦ'],
                ['ਭੁਗਤਾਨ ਤਰੀਕਾ', 'ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ (DBT), ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ'],
                ['ਟੀਚਾ ਸਮੂਹ', 'ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ, ਬਾਹਰ ਰੱਖਣ ਦੇ ਮਾਪਦੰਡਾਂ ਦੇ ਅਧੀਨ'],
                ['ਅਧਿਕਾਰਤ ਪੋਰਟਲ', <a key="portal" href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a>],
              ]}
            />

            <h2 id="benefit-amount" style={hStyle}>ਲਾਭ ਰਾਸ਼ੀ ਅਤੇ ਭੁਗਤਾਨ ਸਮਾਂ-ਸਾਰਣੀ</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਹਰ ਯੋਗ ਕਿਸਾਨ ਪਰਿਵਾਰ ਨੂੰ ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਦਿੰਦੀ ਹੈ, ਜੋ 2,000-2,000 ਰੁਪਏ ਦੀਆਂ ਤਿੰਨ ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਵੰਡੀ ਹੁੰਦੀ ਹੈ ਅਤੇ ਲਗਭਗ ਹਰ ਚਾਰ ਮਹੀਨਿਆਂ ਬਾਅਦ ਜਾਰੀ ਹੁੰਦੀ ਹੈ। ਹਰ ਕਿਸ਼ਤ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਸਿੱਧਾ ਲਾਭਪਾਤਰੀ ਦੇ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੁੰਦੀ ਹੈ, ਇਸ ਲਈ ਕਿਤੇ ਵੀ ਚੈੱਕ, ਨਕਦ ਵੰਡ ਜਾਂ ਖੁਦ ਲੈਣ ਦੀ ਲੋੜ ਨਹੀਂ ਪੈਂਦੀ।
            </p>
            <BulletList items={[
              'ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ, ਜੋ 2,000-2,000 ਰੁਪਏ ਦੀਆਂ 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਵੰਡੇ ਹੁੰਦੇ ਹਨ।',
              'ਕਿਸ਼ਤਾਂ ਲਗਭਗ ਹਰ ਚਾਰ ਮਹੀਨਿਆਂ ਦੇ ਚੱਕਰ ਵਿੱਚ ਜਾਰੀ ਹੁੰਦੀਆਂ ਹਨ।',
              'ਭੁਗਤਾਨ ਡਾਇਰੈਕਟ ਬੈਨੀਫਿਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਸਿੱਧਾ ਕਿਸਾਨ ਪਰਿਵਾਰ ਦੇ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਹੁੰਦਾ ਹੈ।',
              'ਇਸ ਲਾਭ ਤੇ ਕੋਈ ਫੀਸ, ਕਰਜ਼ੇ ਵਾਲਾ ਹਿੱਸਾ ਜਾਂ ਵਾਪਸ ਕਰਨ ਦੀ ਕੋਈ ਜ਼ਿੰਮੇਵਾਰੀ ਨਹੀਂ ਹੈ।',
            ]} />
            <p style={pStyle}>
              ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਦਾ ਮਤਲਬ ਹੈ ਔਸਤਨ ਮਹੀਨੇ ਵਿੱਚ 500 ਰੁਪਏ, ਇੱਕ ਛੋਟੀ ਪਰ ਤੈਅ ਰਾਸ਼ੀ ਜਿਸਨੂੰ ਕਈ ਪਰਿਵਾਰ ਖੇਤੀ ਦੀ ਹੋਰ ਆਮਦਨ ਨਾਲ ਜੋੜ ਲੈਂਦੇ ਹਨ। ਇਸ ਗਾਈਡ ਵਿੱਚ ਅੱਗੇ "ਆਪਣੀਆਂ ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤਾਂ ਨੂੰ ਵਧਾਉਣਾ" ਸੈਕਸ਼ਨ ਵਿੱਚ ਦੇਖਿਆ ਗਿਆ ਹੈ ਕਿ ਜੇ ਇਹ ਰਾਸ਼ੀ ਤੁਰੰਤ ਲੋੜੀਂਦੀ ਨਾ ਹੋਵੇ ਤਾਂ ਇਸਨੂੰ ਕਿੱਥੇ ਲਗਾਇਆ ਜਾ ਸਕਦਾ ਹੈ।
            </p>

            <h2 id="funding" style={hStyle}>ਪੀਐਮ-ਕਿਸਾਨ ਨੂੰ ਫੰਡ ਕੌਣ ਦਿੰਦਾ ਹੈ?</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਨੂੰ 100% ਭਾਰਤ ਸਰਕਾਰ ਵੱਲੋਂ ਫੰਡ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ, ਇਸ ਵਿੱਚ ਰਾਜ ਸਰਕਾਰਾਂ ਤੋਂ ਕਿਸੇ ਵਿੱਤੀ ਯੋਗਦਾਨ ਦੀ ਲੋੜ ਨਹੀਂ। ਇਹੀ ਇਸਨੂੰ ਇੱਕ ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ ਬਣਾਉਂਦਾ ਹੈ, ਜੋ ਕੇਂਦਰੀ ਸਪਾਂਸਰਡ ਸਕੀਮ ਤੋਂ ਵੱਖਰੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਆਮ ਤੌਰ ਤੇ ਕੇਂਦਰ ਅਤੇ ਰਾਜ ਤੈਅ ਅਨੁਪਾਤ ਵਿੱਚ ਫੰਡਿੰਗ ਵੰਡਦੇ ਹਨ।
            </p>
            <DataTable
              caption="ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ ਬਨਾਮ ਕੇਂਦਰੀ ਸਪਾਂਸਰਡ ਸਕੀਮ"
              headers={['ਕਿਸਮ', 'ਫੰਡਿੰਗ ਪੈਟਰਨ']}
              rows={[
                ['ਕੇਂਦਰੀ ਖੇਤਰ ਸਕੀਮ (ਪੀਐਮ-ਕਿਸਾਨ)', '100% ਭਾਰਤ ਸਰਕਾਰ'],
                ['ਕੇਂਦਰੀ ਸਪਾਂਸਰਡ ਸਕੀਮ (ਆਮ)', 'ਕੇਂਦਰ ਅਤੇ ਰਾਜ ਸਰਕਾਰਾਂ ਵਿਚਾਲੇ ਵੰਡੀ ਹੋਈ'],
              ]}
            />

            <h2 id="eligibility" style={hStyle}>ਪੀਐਮ-ਕਿਸਾਨ ਲਈ ਕੌਣ ਯੋਗ ਹੈ?</h2>
            <p style={pStyle}>
              ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ ਪੀਐਮ-ਕਿਸਾਨ ਲਈ ਯੋਗ ਹਨ, ਜਿੱਥੇ "ਪਰਿਵਾਰ" ਦੀ ਪਰਿਭਾਸ਼ਾ ਖਾਸ ਤੌਰ ਤੇ ਪਤੀ, ਪਤਨੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਨਾਬਾਲਗ ਬੱਚਿਆਂ ਵਜੋਂ ਕੀਤੀ ਗਈ ਹੈ। ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਸਰਕਾਰਾਂ ਆਪਣੇ ਜ਼ਮੀਨੀ ਮਾਲਕੀ ਰਿਕਾਰਡਾਂ ਤੋਂ ਯੋਗ ਪਰਿਵਾਰਾਂ ਦੀ ਪਛਾਣ ਕਰਦੀਆਂ ਹਨ, ਇਸੇ ਲਈ ਇਸ ਸਕੀਮ ਦੀ ਆਪਣੀ ਵੱਖਰੀ ਰਾਸ਼ਟਰੀ ਜ਼ਮੀਨੀ ਰਜਿਸਟਰੀ ਨਹੀਂ ਹੈ।
            </p>
            <p style={pStyle}>
              ਸਕੀਮ ਦੇ ਸ਼ੁਰੂਆਤੀ ਵਰਜਨ ਵਾਂਗ ਹੁਣ ਸਿਰਫ਼ ਜ਼ਮੀਨ ਦੇ ਆਕਾਰ ਨਾਲ ਯੋਗਤਾ ਤੈਅ ਨਹੀਂ ਹੁੰਦੀ; ਹੁਣ ਮਹੱਤਵਪੂਰਨ ਇਹ ਹੈ ਕਿ ਪਰਿਵਾਰ ਕੋਲ ਸਬੰਧਤ ਰਾਜ ਜਾਂ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਦੇ ਰਿਕਾਰਡਾਂ ਵਿੱਚ ਖੇਤੀਯੋਗ ਜ਼ਮੀਨ ਦਰਜ ਹੋਵੇ ਅਤੇ ਉਹ ਅੱਗੇ ਦੱਸੀਆਂ ਬਾਹਰ ਰੱਖਣ ਵਾਲੀਆਂ ਸ਼੍ਰੇਣੀਆਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵਿੱਚ ਨਾ ਆਵੇ। ਕਿਉਂਕਿ ਅਸਲ ਰਿਕਾਰਡ ਰਾਜ ਕੋਲ ਹੀ ਹੁੰਦੇ ਹਨ, ਇਸ ਲਈ ਹੋਰ ਖੇਤੀ ਸਕੀਮਾਂ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਇਹੀ ਜ਼ਮੀਨੀ ਡਾਟਾ ਆਮ ਤੌਰ ਤੇ ਪੀਐਮ-ਕਿਸਾਨ ਦੀ ਯੋਗਤਾ ਤੈਅ ਕਰਨ ਲਈ ਵੀ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।
            </p>
            <BulletList items={[
              '"ਕਿਸਾਨ ਪਰਿਵਾਰ" ਦਾ ਮਤਲਬ ਹੈ ਪਤੀ, ਪਤਨੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਨਾਬਾਲਗ ਬੱਚੇ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਯੋਗਤਾ ਲਈ ਇੱਕ ਇਕਾਈ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ।',
              'ਯੋਗਤਾ ਸਬੰਧਤ ਰਾਜ ਜਾਂ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਸਰਕਾਰ ਵੱਲੋਂ ਰੱਖੇ ਜ਼ਮੀਨੀ ਮਾਲਕੀ ਰਿਕਾਰਡਾਂ ਤੋਂ ਤੈਅ ਹੁੰਦੀ ਹੈ।',
              'ਹਰ ਯੋਗ ਪਰਿਵਾਰ ਵਿੱਚੋਂ ਸਿਰਫ਼ ਇੱਕ ਹੀ ਮੈਂਬਰ ਅਸਲ ਵਿੱਚ ਭੁਗਤਾਨ ਲੈ ਸਕਦਾ ਹੈ।',
              'ਜ਼ਮੀਨ ਵਾਲੇ ਪਰਿਵਾਰ ਦੀ ਪਰਿਭਾਸ਼ਾ ਵਿੱਚ ਆਉਣਾ ਜ਼ਰੂਰੀ ਹੈ, ਪਰ ਕਾਫ਼ੀ ਨਹੀਂ: ਹੇਠਾਂ ਦਿੱਤੀ ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ ਫਿਰ ਵੀ ਯੋਗ ਪਰਿਵਾਰ ਨੂੰ ਅਯੋਗ ਠਹਿਰਾ ਸਕਦੀ ਹੈ।',
            ]} />

            <h2 id="exclusions" style={hStyle}>ਪੀਐਮ-ਕਿਸਾਨ ਤੋਂ ਕੌਣ ਬਾਹਰ ਹੈ</h2>
            <p style={pStyle}>
              ਜ਼ਮੀਨ ਹੋਣ ਦੇ ਬਾਵਜੂਦ ਪੀਐਮ-ਕਿਸਾਨ ਕੁਝ ਖਾਸ ਸ਼੍ਰੇਣੀਆਂ ਨੂੰ ਬਾਹਰ ਰੱਖਦੀ ਹੈ, ਅਤੇ ਯੋਗਤਾ ਮੰਨਣ ਤੋਂ ਪਹਿਲਾਂ ਇਹ ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ ਸਕੀਮ ਦਾ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਹਿੱਸਾ ਹੈ ਜਿਸਨੂੰ ਜਾਂਚਣਾ ਚਾਹੀਦਾ ਹੈ। pmkisan.gov.in ਦੇ ਅਨੁਸਾਰ, ਹੇਠ ਲਿਖੀਆਂ ਸ਼੍ਰੇਣੀਆਂ ਇਸ ਲਾਭ ਲਈ ਯੋਗ ਨਹੀਂ ਹਨ।
            </p>
            <BulletList items={[
              <span key={1}><strong>ਸੰਸਥਾਗਤ ਜ਼ਮੀਨ ਮਾਲਕ:</strong> ਕਿਸੇ ਸੰਸਥਾ ਦੇ ਨਾਂ ਤੇ ਦਰਜ ਸਾਰੀ ਖੇਤੀ ਜ਼ਮੀਨ ਇਸ ਦਾਇਰੇ ਤੋਂ ਬਾਹਰ ਹੈ।</span>,
              <span key={2}><strong>ਸੰਵਿਧਾਨਕ ਅਹੁਦੇਦਾਰ ਅਤੇ ਚੁਣੇ ਹੋਏ ਨੁਮਾਇੰਦੇ:</strong> ਅਜਿਹੇ ਪਰਿਵਾਰ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਕੋਈ ਮੈਂਬਰ ਰਾਸ਼ਟਰਪਤੀ, ਉਪ-ਰਾਸ਼ਟਰਪਤੀ, ਰਾਜਪਾਲ ਜਾਂ ਇਸੇ ਤਰ੍ਹਾਂ ਦੇ ਸੰਵਿਧਾਨਕ ਅਹੁਦੇ ਤੇ ਹੈ ਜਾਂ ਰਿਹਾ ਹੈ, ਜਾਂ ਸਾਬਕਾ ਜਾਂ ਮੌਜੂਦਾ ਮੰਤਰੀ, ਸੰਸਦ ਮੈਂਬਰ, ਵਿਧਾਇਕ, ਐਮਐਲਸੀ, ਨਗਰ ਨਿਗਮ ਦਾ ਮੇਅਰ, ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਪੰਚਾਇਤ ਚੇਅਰਪਰਸਨ ਹੈ।</span>,
              <span key={3}><strong>ਸਰਕਾਰੀ ਅਤੇ ਜਨਤਕ ਖੇਤਰ ਦੇ ਕਰਮਚਾਰੀ:</strong> ਅਜਿਹੇ ਪਰਿਵਾਰ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਕੇਂਦਰ ਜਾਂ ਰਾਜ ਸਰਕਾਰ ਦੇ ਮੰਤਰਾਲਿਆਂ, ਵਿਭਾਗਾਂ, ਜਨਤਕ ਖੇਤਰ ਦੇ ਅਦਾਰਿਆਂ, ਸਰਕਾਰ ਨਾਲ ਜੁੜੇ ਦਫ਼ਤਰਾਂ ਜਾਂ ਖੁਦਮੁਖਤਿਆਰ ਸੰਸਥਾਵਾਂ ਦਾ ਕੋਈ ਕਾਰਜਸ਼ੀਲ ਜਾਂ ਸੇਵਾਮੁਕਤ ਅਧਿਕਾਰੀ ਜਾਂ ਕਰਮਚਾਰੀ ਹੋਵੇ, ਨਾਲ ਹੀ ਸਥਾਨਕ ਸੰਸਥਾਵਾਂ ਦੇ ਨਿਯਮਤ ਕਰਮਚਾਰੀ ਵੀ। ਮਲਟੀ-ਟਾਸਕਿੰਗ ਸਟਾਫ, ਕਲਾਸ IV ਅਤੇ ਗਰੁੱਪ D ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਖਾਸ ਤੌਰ ਤੇ ਛੋਟ ਦਿੱਤੀ ਗਈ ਹੈ ਅਤੇ ਉਹ ਯੋਗ ਬਣੇ ਰਹਿੰਦੇ ਹਨ।</span>,
              <span key={4}><strong>ਵੱਧ ਪੈਨਸ਼ਨ ਲੈਣ ਵਾਲੇ ਸੇਵਾਮੁਕਤ:</strong> 10,000 ਰੁਪਏ ਜਾਂ ਇਸ ਤੋਂ ਵੱਧ ਮਹੀਨਾਵਾਰ ਪੈਨਸ਼ਨ ਲੈਣ ਵਾਲੇ ਸਾਰੇ ਸੇਵਾਮੁਕਤ ਪੈਨਸ਼ਨਧਾਰਕ, ਇੱਥੇ ਵੀ ਮਲਟੀ-ਟਾਸਕਿੰਗ ਸਟਾਫ, ਕਲਾਸ IV ਅਤੇ ਗਰੁੱਪ D ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਛੋਟ ਹੈ।</span>,
              <span key={5}><strong>ਆਮਦਨ ਕਰ ਭਰਨ ਵਾਲੇ:</strong> ਜਿਸ ਨੇ ਵੀ ਪਿਛਲੇ ਮੁਲਾਂਕਣ ਸਾਲ ਵਿੱਚ ਆਮਦਨ ਕਰ ਭਰਿਆ ਹੋਵੇ, ਉਹ ਜ਼ਮੀਨ ਮਾਲਕੀ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ ਬਾਹਰ ਹੈ।</span>,
              <span key={6}><strong>ਰਜਿਸਟਰਡ ਪੇਸ਼ੇਵਰ:</strong> ਆਪਣੀਆਂ ਪੇਸ਼ੇਵਰ ਸੰਸਥਾਵਾਂ ਵਿੱਚ ਰਜਿਸਟਰਡ ਅਤੇ ਪ੍ਰੈਕਟਿਸ ਕਰ ਰਹੇ ਡਾਕਟਰ, ਇੰਜੀਨੀਅਰ, ਵਕੀਲ, ਚਾਰਟਰਡ ਅਕਾਊਂਟੈਂਟ ਅਤੇ ਆਰਕੀਟੈਕਟ।</span>,
              <span key={7}><strong>1 ਫਰਵਰੀ 2019 ਤੋਂ ਬਾਅਦ ਹਾਸਲ ਕੀਤੀ ਜ਼ਮੀਨ:</strong> ਜਿਨ੍ਹਾਂ ਕਿਸਾਨਾਂ ਨੂੰ ਇਸ ਤਾਰੀਖ ਨੂੰ ਜਾਂ ਬਾਅਦ ਵਿੱਚ ਜ਼ਮੀਨ ਦੀ ਮਾਲਕੀ ਮਿਲੀ, ਇਹ ਸੀਮਾ ਸਕੀਮ ਨੇ ਸਿਰਫ਼ ਲਾਭ ਲੈਣ ਲਈ ਕੀਤੇ ਜਾਣ ਵਾਲੇ ਜ਼ਮੀਨੀ ਤਬਾਦਲਿਆਂ ਨੂੰ ਰੋਕਣ ਲਈ ਤੈਅ ਕੀਤੀ ਹੈ।</span>,
              <span key={8}><strong>ਪਰਿਵਾਰ ਦੀ ਡੁਪਲੀਕੇਟ ਰਜਿਸਟ੍ਰੇਸ਼ਨ:</strong> ਜੇ ਇੱਕੋ ਪਰਿਵਾਰ ਦਾ ਇੱਕ ਤੋਂ ਵੱਧ ਮੈਂਬਰ ਰਜਿਸਟਰਡ ਪਾਇਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਸਿਰਫ਼ ਇੱਕ ਯੋਗ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਛੱਡ ਕੇ ਬਾਕੀ ਸਾਰੀਆਂ ਹਟਾ ਦਿੱਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।</span>,
              <span key={9}><strong>ਨਾਬਾਲਗ ਦੇ ਨਾਂ ਤੇ ਦਰਜ ਜ਼ਮੀਨ:</strong> 18 ਸਾਲ ਤੋਂ ਘੱਟ ਉਮਰ ਦੇ ਵਿਅਕਤੀ ਦੇ ਨਾਂ ਤੇ ਦਰਜ ਜ਼ਮੀਨ ਲਾਭਪਾਤਰੀ ਸੂਚੀ ਵਿੱਚੋਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਹਟਾ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।</span>,
            ]} />
            <Callout>
              ਜੇ ਪਰਿਵਾਰ ਦਾ ਕੋਈ ਵੀ ਮੈਂਬਰ ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵੀ ਸ਼੍ਰੇਣੀ ਵਿੱਚ ਆਉਂਦਾ ਹੈ, ਤਾਂ ਸਿਰਫ਼ ਉਹ ਵਿਅਕਤੀ ਹੀ ਨਹੀਂ, ਸਗੋਂ ਪੂਰਾ ਪਰਿਵਾਰ ਬਾਹਰ ਹੋ ਜਾਂਦਾ ਹੈ। ਯੋਗਤਾ ਮੰਨਣ ਤੋਂ ਪਹਿਲਾਂ <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>pmkisan.gov.in</a> ਤੇ ਮੌਜੂਦਾ ਬਾਹਰ ਰੱਖਣ ਦੀ ਸੂਚੀ ਨਾਲ ਆਪਣੇ ਖਾਸ ਮਾਮਲੇ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ, ਕਿਉਂਕਿ ਬਾਹਰ ਰੱਖਣ ਦੇ ਮਾਪਦੰਡ ਸਰਕਾਰ ਤੈਅ ਕਰਦੀ ਹੈ ਅਤੇ ਸਮੇਂ-ਸਮੇਂ ਤੇ ਇਨ੍ਹਾਂ ਵਿੱਚ ਬਦਲਾਅ ਹੋ ਸਕਦਾ ਹੈ।
            </Callout>

            <h2 id="ekyc" style={hStyle}>eKYC: ਪੂਰੀ ਕਰਨ ਦੇ ਤਿੰਨ ਤਰੀਕੇ</h2>
            <p style={pStyle}>
              eKYC ਇੱਕ ਲਾਜ਼ਮੀ, ਇੱਕ ਵਾਰੀ ਦੀ ਪਛਾਣ ਤਸਦੀਕ ਹੈ ਜੋ ਹਰ ਪੀਐਮ-ਕਿਸਾਨ ਲਾਭਪਾਤਰੀ ਨੂੰ ਪੂਰੀ ਕਰਨੀ ਜ਼ਰੂਰੀ ਹੈ, ਅਤੇ ਇਸ ਤੋਂ ਬਿਨਾਂ ਕੋਈ ਅਗਲੀ ਕਿਸ਼ਤ ਜਾਰੀ ਨਹੀਂ ਹੁੰਦੀ। ਸਰਕਾਰ ਇਸ ਲਈ ਤਿੰਨ ਵੱਖ-ਵੱਖ ਤਰੀਕੇ ਦਿੰਦੀ ਹੈ, ਤਾਂ ਜੋ ਜਿਸ ਕਿਸਾਨ ਕੋਲ ਸਥਿਰ ਇੰਟਰਨੈੱਟ ਜਾਂ ਆਧਾਰ ਨਾਲ ਜੁੜਿਆ ਮੋਬਾਈਲ ਨਾ ਹੋਵੇ, ਉਸ ਲਈ ਵੀ ਇਸਨੂੰ ਪੂਰਾ ਕਰਨ ਦਾ ਇੱਕ ਵਿਹਾਰਕ ਰਸਤਾ ਬਣਿਆ ਰਹੇ।
            </p>
            <TableWrap label="ਪੀਐਮ-ਕਿਸਾਨ eKYC ਤਰੀਕੇ">
              {[
                { method: 'OTP-ਆਧਾਰਿਤ', detail: 'ਪੋਰਟਲ ਜਾਂ ਮੋਬਾਈਲ ਐਪ ਤੇ ਕੀਤਾ ਜਾਂਦਾ ਹੈ; ਇਸ ਲਈ ਆਧਾਰ ਨਾਲ ਜੁੜਿਆ, ਸਰਗਰਮ ਮੋਬਾਈਲ ਨੰਬਰ ਜ਼ਰੂਰੀ ਹੈ ਜਿਸ ਤੇ OTP ਆਉਂਦਾ ਹੈ।' },
                { method: 'ਬਾਇਓਮੈਟ੍ਰਿਕ-ਆਧਾਰਿਤ', detail: 'ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ (CSC) ਜਾਂ SSK ਤੇ ਫਿੰਗਰਪ੍ਰਿੰਟ ਜਾਂ ਆਇਰਿਸ ਸਕੈਨ ਰਾਹੀਂ ਖੁਦ ਹਾਜ਼ਰ ਹੋ ਕੇ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।' },
                { method: 'ਫੇਸ ਆਥੈਂਟੀਕੇਸ਼ਨ', detail: 'ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਫੋਨ ਦੇ ਕੈਮਰੇ ਰਾਹੀਂ ਸਿੱਧਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਇਸ ਲਈ CSC ਜਾਣ ਦੀ ਜਾਂ ਵੱਖਰੇ ਡਿਵਾਈਸ ਦੀ ਲੋੜ ਨਹੀਂ।' },
              ].map((row, i, arr) => (
                <div key={row.method} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{row.method}</div>
                  <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.65 }}>{row.detail}</div>
                </div>
              ))}
            </TableWrap>
            <p style={pStyle}>
              eKYC ਪੂਰੀ ਹੋਣ ਤੇ ਸਟੇਟਸ "Yes" ਜਾਂ "Verified" ਦਿਖਾਉਂਦਾ ਹੈ, ਅਤੇ ਅਜੇ ਬਾਕੀ ਹੋਵੇ ਤਾਂ "Pending" ਦਿਖਾਉਂਦਾ ਹੈ, ਇਹ pmkisan.gov.in ਦੇ ਲਾਭਪਾਤਰੀ ਜਾਂ eKYC ਸਟੇਟਸ ਸੈਕਸ਼ਨ ਵਿੱਚ ਦਿਖਦਾ ਹੈ। ਨਵਾਂ ਅਪਡੇਟ ਪੋਰਟਲ ਤੇ ਦਿਖਣ ਵਿੱਚ 24 ਘੰਟੇ ਤੱਕ ਦਾ ਸਮਾਂ ਲੱਗ ਸਕਦਾ ਹੈ, ਇਸ ਲਈ ਪੂਰੀ ਕੀਤੀ eKYC ਨੂੰ ਅਸਫਲ ਮੰਨਣ ਤੋਂ ਪਹਿਲਾਂ ਇੱਕ ਦਿਨ ਉਡੀਕ ਕਰਨੀ ਬਿਹਤਰ ਹੈ।
            </p>

            <h2 id="how-to-register" style={hStyle}>ਨਵੇਂ ਕਿਸਾਨ ਵਜੋਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਿਵੇਂ ਕਰੀਏ</h2>
            <p style={pStyle}>
              ਨਵੇਂ ਕਿਸਾਨ ਦੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ pmkisan.gov.in ਦੇ Farmer Corner ਸੈਕਸ਼ਨ ਵਿੱਚ "New Farmer Registration" ਵਿਕਲਪ ਰਾਹੀਂ ਹੁੰਦੀ ਹੈ, ਕਿਸੇ ਵੱਖਰੇ ਸਟੈਂਡਅਲੋਨ ਫਾਰਮ URL ਤੇ ਨਹੀਂ। ਮੋਬਾਈਲ ਤੋਂ ਅਪਲਾਈ ਕਰਨਾ ਚਾਹੁਣ ਵਾਲੇ ਕਿਸਾਨਾਂ ਲਈ Google Play ਤੇ ਮੌਜੂਦ ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਵੀ ਇਹੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤਰੀਕਾ ਉਪਲਬਧ ਹੈ।
            </p>
            <p style={pStyle}>
              Farmer Corner ਵਿੱਚ ਸਰਕਾਰ ਪਹਿਲਾਂ ਤੋਂ ਜਾਣਨਾ ਲਾਭਦਾਇਕ ਹੋਵੇਗਾ ਅਜਿਹੇ ਹੋਰ ਸੈਲਫ-ਸਰਵਿਸ ਟੂਲ ਵੀ ਰੱਖਦੀ ਹੈ: ਭੁਗਤਾਨ ਰੋਕ ਰਹੇ ਨਾਂ ਜਾਂ ਵੇਰਵੇ ਦੇ ਮੇਲ ਨਾ ਖਾਣ ਨੂੰ ਠੀਕ ਕਰਨ ਲਈ "Edit Aadhaar Failure Records", ਰਜਿਸਟਰਡ ਮੋਬਾਈਲ ਨੰਬਰ ਅਪਡੇਟ ਕਰਨ ਦਾ ਵਿਕਲਪ, ਰਿਫੰਡ ਬੇਨਤੀਆਂ ਜਮ੍ਹਾਂ ਕਰਨਾ, ਅਤੇ ਹੁਣ ਲਾਭ ਨਾ ਚਾਹੁਣ ਵਾਲਿਆਂ ਲਈ ਸਵੈ-ਇੱਛਤ ਲਾਭ ਸਰੰਡਰ।
            </p>
            <BulletList items={[
              'New Farmer Registration: ਅਜੇ ਰਜਿਸਟਰ ਨਾ ਹੋਏ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਲਈ ਸ਼ੁਰੂਆਤੀ ਬਿੰਦੂ।',
              'Edit Aadhaar Failure Records: ਭੁਗਤਾਨ ਰੋਕ ਰਹੇ ਨਾਂ ਜਾਂ ਵੇਰਵੇ ਦੇ ਮੇਲ ਨਾ ਖਾਣ ਨੂੰ ਠੀਕ ਕਰਦਾ ਹੈ।',
              'ਮੋਬਾਈਲ ਨੰਬਰ ਅਪਡੇਟ ਕਰੋ: OTP-ਆਧਾਰਿਤ eKYC ਅਤੇ ਸਟੇਟਸ ਅਲਰਟ ਨੂੰ ਚਾਲੂ ਰੱਖਦਾ ਹੈ।',
              'ਰਿਫੰਡ ਬੇਨਤੀਆਂ ਅਤੇ ਸਵੈ-ਇੱਛਤ ਲਾਭ ਸਰੰਡਰ: ਖਾਸ ਮਾਮਲਿਆਂ ਲਈ ਸੈਲਫ-ਸਰਵਿਸ ਵਿਕਲਪ।',
            ]} />
            <Callout>
              ਇਸ ਲੇਖ ਲਈ ਸਿੱਧੀ ਜਾਂਚ ਕਰਨ ਤੇ pmkisan.gov.in ਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਫਾਰਮ ਦਾ ਇੱਕ ਖਾਸ ਡੀਪ-ਲਿੰਕ URL ਗਲਤੀ ਪੇਜ ਦਿਖਾ ਰਿਹਾ ਸੀ। ਕਿਸੇ ਪੁਰਾਣੇ ਬੁੱਕਮਾਰਕ ਕੀਤੇ ਜਾਂ ਥਰਡ-ਪਾਰਟੀ ਲਿੰਕ ਦੀ ਪਾਲਣਾ ਕਰਨ ਦੀ ਬਜਾਏ pmkisan.gov.in ਦੇ ਹੋਮਪੇਜ ਤੇ ਜਾਓ ਅਤੇ ਉੱਥੋਂ Farmer Corner ਖੋਲ੍ਹੋ, ਕਿਉਂਕਿ ਸਰਕਾਰੀ ਪੋਰਟਲ ਦੇ ਰਸਤੇ ਬਿਨਾਂ ਸੂਚਨਾ ਦੇ ਬਦਲ ਸਕਦੇ ਹਨ।
            </Callout>


            <h2 id="check-status" style={hStyle}>ਆਪਣਾ ਲਾਭਪਾਤਰੀ ਅਤੇ ਭੁਗਤਾਨ ਸਟੇਟਸ ਕਿਵੇਂ ਚੈੱਕ ਕਰੀਏ</h2>
            <p style={pStyle}>
              ਸਟੇਟਸ ਚੈੱਕ pmkisan.gov.in ਦੇ Farmer Corner ਸੈਕਸ਼ਨ ਵਿੱਚ "Know Your Status" ਟੂਲ ਰਾਹੀਂ ਹੁੰਦਾ ਹੈ, ਜਿੱਥੇ ਆਪਣਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ, ਜਾਂ ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਅਤੇ ਆਧਾਰ ਨੰਬਰ ਪਾਉਣ ਤੇ ਤੁਹਾਡਾ ਮੌਜੂਦਾ ਲਾਭਪਾਤਰੀ ਅਤੇ ਭੁਗਤਾਨ ਰਿਕਾਰਡ ਸਾਹਮਣੇ ਆ ਜਾਂਦਾ ਹੈ। ਇਹੀ ਸਟੇਟਸ ਚੈੱਕ ਪੀਐਮ-ਕਿਸਾਨ ਮੋਬਾਈਲ ਐਪ ਵਿੱਚ ਵੀ ਉਪਲਬਧ ਹੈ।
            </p>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>ਆਪਣਾ ਪੀਐਮ-ਕਿਸਾਨ ਸਟੇਟਸ ਚੈੱਕ ਕਰੋ</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: 0 }}>pmkisan.gov.in ਤੇ ਅਧਿਕਾਰਤ "Know Your Status" ਟੂਲ।</p>
              </div>
              <a className="fx-btn" href="https://pmkisan.gov.in/beneficiarystatus_new.aspx" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                ਸਟੇਟਸ ਦੇਖੋ
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <p style={pStyle}>
              ਪੂਰਾ ਸਟੇਟਸ ਦੇਖਣ ਦੀ ਬਜਾਏ ਬਸ ਜਲਦੀ ਕੋਈ ਆਮ ਸਵਾਲ ਪੁੱਛਣਾ ਹੋਵੇ, ਤਾਂ ਪੀਐਮ-ਕਿਸਾਨ ਦਾ ਕਿਸਾਨ e-Mitra ਨਾਂ ਦਾ ਇੱਕ ਚੈਟਬੋਟ ਵੀ ਹੈ, ਜੋ ਪੂਰੇ ਪੋਰਟਲ ਵਿੱਚ ਗਏ ਬਿਨਾਂ ਆਮ ਯੋਗਤਾ ਅਤੇ ਸਟੇਟਸ ਸਬੰਧੀ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦੇਣ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ।
            </p>

            <h2 id="payment-issues" style={hStyle}>ਕਿਸ਼ਤ ਨਾ ਆਉਣ ਜਾਂ eKYC ਅਸਫਲ ਹੋਣ ਤੇ ਕੀ ਕਰੀਏ</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤ ਨਾ ਮਿਲਣ ਦਾ ਸਭ ਤੋਂ ਆਮ ਕਾਰਨ eKYC ਦਾ ਪੈਂਡਿੰਗ ਹੋਣਾ, ਬੈਂਕ ਖਾਤੇ ਦਾ ਆਧਾਰ ਨਾਲ ਨਾ ਜੁੜਿਆ ਹੋਣਾ, ਆਧਾਰ ਅਤੇ ਬੈਂਕ ਜਾਂ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡਾਂ ਵਿੱਚ ਮੇਲ ਨਾ ਖਾਣਾ, ਜਾਂ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਦਾ ਰਾਜ ਦੀ ਆਪਣੀ ਤਸਦੀਕ ਪੜਾਅ ਵਿੱਚ ਅਸਫਲ ਹੋਣਾ ਹੈ। pmkisan.gov.in ਤੇ ਆਪਣਾ eKYC ਅਤੇ ਲਾਭਪਾਤਰੀ ਸਟੇਟਸ ਚੈੱਕ ਕਰਨਾ ਪਹਿਲਾ ਸਹੀ ਕਦਮ ਹੈ, ਕਿਉਂਕਿ ਪੋਰਟਲ ਤੇ ਆਮ ਤੌਰ ਤੇ ਭੁਗਤਾਨ ਨਾ ਹੋਣ ਦਾ ਸਹੀ ਕਾਰਨ ਦੱਸਿਆ ਹੁੰਦਾ ਹੈ।
            </p>
            <BulletList items={[
              <span key={1}><strong>eKYC ਅਜੇ ਪੈਂਡਿੰਗ ਹੈ:</strong> OTP, CSC ਤੇ ਬਾਇਓਮੈਟ੍ਰਿਕ ਤਸਦੀਕ, ਜਾਂ ਐਪ ਵਿੱਚ ਫੇਸ ਆਥੈਂਟੀਕੇਸ਼ਨ ਰਾਹੀਂ ਇਸਨੂੰ ਪੂਰਾ ਕਰੋ, ਫਿਰ ਸਟੇਟਸ ਅਪਡੇਟ ਹੋਣ ਲਈ 24 ਘੰਟੇ ਉਡੀਕ ਕਰੋ।</span>,
              <span key={2}><strong>ਆਧਾਰ ਜਾਂ ਬੈਂਕ ਵੇਰਵੇ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ:</strong> ਰਿਕਾਰਡ ਠੀਕ ਕਰਨ ਲਈ pmkisan.gov.in ਦੇ Farmer Corner ਵਿੱਚ "Edit Aadhaar Failure Records" ਵਰਤੋ।</span>,
              <span key={3}><strong>ਬੈਂਕ ਖਾਤਾ ਆਧਾਰ ਨਾਲ ਨਹੀਂ ਜੁੜਿਆ:</strong> ਆਧਾਰ ਸੀਡਿੰਗ ਪੂਰੀ ਕਰਨ ਲਈ ਆਪਣੀ ਬੈਂਕ ਸ਼ਾਖਾ ਜਾਓ, ਕਿਉਂਕਿ ਇਹ ਸੁਧਾਰ ਬੈਂਕ ਪੱਧਰ ਤੇ ਹੁੰਦਾ ਹੈ, ਪੀਐਮ-ਕਿਸਾਨ ਪੋਰਟਲ ਤੇ ਨਹੀਂ।</span>,
              <span key={4}><strong>ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਦੀ ਤਸਦੀਕ ਬਾਕੀ ਹੈ:</strong> ਆਪਣੀ ਯੋਗਤਾ ਜਾਂਚ ਲਈ ਵਰਤੇ ਜਾਂਦੇ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਰੱਖਣ ਵਾਲੇ ਸਥਾਨਕ ਮਾਲ ਜਾਂ ਖੇਤੀਬਾੜੀ ਦਫ਼ਤਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।</span>,
              <span key={5}><strong>ਕੋਈ ਸਪਸ਼ਟ ਸਮੱਸਿਆ ਨਹੀਂ ਦਿਖਦੀ ਫਿਰ ਵੀ ਭੁਗਤਾਨ ਨਹੀਂ ਆਇਆ:</strong> ਨੇੜਲਾ ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ ਜਾਂ ਤੁਹਾਡਾ ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਦਫ਼ਤਰ ਤੁਹਾਡੀ ਤਰਫੋਂ ਖਾਸ ਕਿਸ਼ਤ ਦਾ ਸਟੇਟਸ ਦੇਖ ਸਕਦਾ ਹੈ।</span>,
            ]} />

            <h2 id="latest-installment" style={hStyle}>23ਵੀਂ ਕਿਸ਼ਤ ਅਤੇ ਅੱਗੇ ਕੀ</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਦੀ 23ਵੀਂ ਕਿਸ਼ਤ 20 ਜੂਨ 2026 ਨੂੰ ਪੱਛਮੀ ਬੰਗਾਲ ਦੇ ਹੁਗਲੀ ਤੋਂ ਜਾਰੀ ਹੋਈ, ਜਿਸ ਵਿੱਚ ਇੱਕੋ ਵਾਰ ਵਿੱਚ 9.44 ਕਰੋੜ ਤੋਂ ਵੱਧ ਕਿਸਾਨਾਂ ਨੂੰ 18,880 ਕਰੋੜ ਰੁਪਏ ਤੋਂ ਵੱਧ ਦੀ ਰਾਸ਼ੀ ਵੰਡੀ ਗਈ। ਇਹ ਪੈਮਾਨਾ, ਯਾਨੀ ਕਰੋੜਾਂ ਪਰਿਵਾਰਾਂ ਨੂੰ ਇੱਕੋ ਸਮੇਂ ਵਿੱਚ ਭੁਗਤਾਨ ਕਰਨਾ, ਇਸ ਗੱਲ ਦਾ ਸਭ ਤੋਂ ਮਜ਼ਬੂਤ ਸਬੂਤ ਹੈ ਕਿ DBT ਢਾਂਚਾ ਸੱਚਮੁੱਚ ਰਾਸ਼ਟਰੀ ਪੱਧਰ ਤੇ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ।
            </p>
            <p style={pStyle}>
              24ਵੀਂ ਕਿਸ਼ਤ ਸਕੀਮ ਦੇ ਆਮ ਲਗਭਗ ਚਾਰ ਮਹੀਨੇ ਦੇ ਚੱਕਰ ਮੁਤਾਬਕ ਅਕਤੂਬਰ ਜਾਂ ਨਵੰਬਰ 2026 ਦੇ ਆਸਪਾਸ ਆਉਣ ਦੀ ਉਮੀਦ ਹੈ, ਹਾਲਾਂਕਿ ਇਹ ਲੇਖ ਲਿਖਣ ਵੇਲੇ ਸਰਕਾਰ ਨੇ ਕੋਈ ਪੱਕੀ ਤਾਰੀਖ ਅਧਿਕਾਰਤ ਤੌਰ ਤੇ ਤੈਅ ਨਹੀਂ ਕੀਤੀ। ਉਸ ਸਮੇਂ ਦੌਰਾਨ ਭੁਗਤਾਨ ਲੈਣ ਵਾਲੇ ਕਿਸਾਨਾਂ ਨੂੰ ਉਸ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਆਪਣਾ eKYC ਪੂਰਾ ਅਤੇ ਬੈਂਕ ਵੇਰਵੇ ਅੱਪ-ਟੂ-ਡੇਟ ਰੱਖਣੇ ਚਾਹੀਦੇ ਹਨ, ਕਿਉਂਕਿ ਵੰਡ ਚੱਕਰ ਇੱਕ ਵਾਰ ਚੱਲਣ ਤੋਂ ਬਾਅਦ ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕੋਈ ਵੀ ਪਿੱਛੇ ਜਾ ਕੇ ਠੀਕ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ।
            </p>

            <h2 id="is-it-taxable" style={hStyle}>ਕੀ ਪੀਐਮ-ਕਿਸਾਨ ਦਾ ਲਾਭ ਟੈਕਸ ਯੋਗ ਹੈ?</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਭੁਗਤਾਨਾਂ ਨੂੰ ਆਮ ਤੌਰ ਤੇ ਟੈਕਸ-ਮੁਕਤ ਖੇਤੀ ਆਮਦਨ ਸਹਾਇਤਾ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ, ਨਾ ਕਿ ਟੈਕਸ ਯੋਗ ਆਮਦਨ, ਜੋ ਇਸ ਗੱਲ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ ਕਿ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਦਿੱਤੀ ਜਾਣ ਵਾਲੀ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ ਨੂੰ ਆਮ ਤੌਰ ਤੇ ਕਿਵੇਂ ਦੇਖਿਆ ਜਾਂਦਾ ਹੈ। ਜਿਨ੍ਹਾਂ ਕਿਸਾਨਾਂ ਦੀ ਕਿਰਾਇਆ, ਤਨਖਾਹ ਜਾਂ ਗੈਰ-ਖੇਤੀ ਕਾਰੋਬਾਰ ਵਰਗੀ ਹੋਰ ਟੈਕਸ ਯੋਗ ਆਮਦਨ ਹੈ, ਉਨ੍ਹਾਂ ਨੂੰ ਫਿਰ ਵੀ ਆਮ ਨਿਯਮ ਤੇ ਭਰੋਸਾ ਕਰਨ ਦੀ ਬਜਾਏ ਆਪਣੀ ਕੁੱਲ ਟੈਕਸ ਸਥਿਤੀ ਦੀ ਪੁਸ਼ਟੀ ਕਿਸੇ ਯੋਗ ਟੈਕਸ ਸਲਾਹਕਾਰ ਤੋਂ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।
            </p>
            <p style={pStyle}>
              ਇਕੱਲੇ ਸਾਲ ਵਿੱਚ 6,000 ਰੁਪਏ ਦਾ ਇਹ ਲਾਭ, ਜੋ ਔਸਤਨ ਮਹੀਨੇ ਵਿੱਚ 500 ਰੁਪਏ ਹੈ, ਦੋਵਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵੀ ਟੈਕਸ ਪ੍ਰਣਾਲੀ ਦੀ ਮੂਲ ਛੋਟ ਸੀਮਾ ਤੋਂ ਕਿਤੇ ਹੇਠਾਂ ਆਉਂਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਆਪਣੇ ਆਪ ਵਿੱਚ ਕੋਈ ਟੈਕਸ ਜ਼ਿੰਮੇਵਾਰੀ ਨਹੀਂ ਬਣਾਉਂਦਾ। ਮਿਸ਼ਰਤ ਆਮਦਨ ਸਰੋਤ ਵਾਲੇ ਲੋਕ <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> ਨਾਲ ਆਪਣੀ ਸਮੁੱਚੀ ਸਥਿਤੀ ਚੈੱਕ ਕਰ ਸਕਦੇ ਹਨ।
            </p>

            <h2 id="growing-your-installment" style={hStyle}>ਆਪਣੀਆਂ ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤਾਂ ਨੂੰ ਕਿਵੇਂ ਵਧਾਈਏ</h2>
            <p style={pStyle}>
              ਸਾਲ ਵਿੱਚ ਤਿੰਨ ਵਾਰ ਆਉਣ ਵਾਲੇ 2,000 ਰੁਪਏ ਇੱਕ ਛੋਟੀ ਪਰ ਸੱਚਮੁੱਚ ਲਾਭਦਾਇਕ ਰਾਸ਼ੀ ਹੈ, ਜਿਸਨੂੰ ਆਉਂਦੇ ਹੀ ਖਰਚ ਕਰਨ ਦੀ ਬਜਾਏ ਬੱਚਤ ਦੀ ਆਦਤ ਬਣਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ, ਅਤੇ ਕੁਝ ਡਾਕਖਾਨਾ ਅਤੇ ਸਰਕਾਰੀ-ਸਮਰਥਿਤ ਸਾਧਨ ਇਸ ਲੈਅ ਲਈ ਚੰਗੀ ਤਰ੍ਹਾਂ ਫਿੱਟ ਬੈਠਦੇ ਹਨ। ਤਿੰਨ ਵਿਕਲਪ ਸਿੱਧੇ ਦੇਖਣ ਯੋਗ ਹਨ, ਇਹ ਸਾਰੇ ਸੁਰੱਖਿਅਤ, ਸਰਕਾਰ ਨਾਲ ਜੁੜੇ ਹਨ, ਅਤੇ ਪਹਿਲਾਂ ਤੋਂ ਡਾਕਖਾਨਾ ਅਤੇ DBT ਵਰਗੀਆਂ ਸਹੂਲਤਾਂ ਨਾਲ ਜਾਣੂ ਕਿਸਾਨ ਪਰਿਵਾਰ ਲਈ ਸੁਭਾਵਿਕ ਤੌਰ ਤੇ ਫਿੱਟ ਬੈਠਦੇ ਹਨ।
            </p>
            <BulletList items={[
              <span key={1}>ਕਿਸਾਨ ਵਿਕਾਸ ਪੱਤਰ ਇੱਕ ਡਾਕਖਾਨਾ ਬੱਚਤ ਸਰਟੀਫਿਕੇਟ ਹੈ ਜੋ ਬਿਲਕੁਲ ਇਸੇ ਤਰ੍ਹਾਂ ਦੇ ਪਰਿਵਾਰ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ, ਜੋ ਇੱਕ ਤੈਅ ਸਰਕਾਰੀ ਸਮਾਂ-ਮਿਆਦ ਵਿੱਚ ਜਮ੍ਹਾਂ ਰਾਸ਼ੀ ਨੂੰ ਦੁੱਗਣਾ ਕਰ ਦਿੰਦਾ ਹੈ; ਹਰ ਸਾਲ ਦੀ ਕਿਸ਼ਤ ਨੂੰ <Link href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>KVP ਕੈਲਕੂਲੇਟਰ</Link> ਵਿੱਚ ਪਾ ਕੇ ਮਿਆਦ ਪੂਰੀ ਹੋਣ ਦੀ ਰਾਸ਼ੀ ਦੇਖੋ।</span>,
              <span key={2}>ਪੋਸਟ ਆਫਿਸ ਮੰਥਲੀ ਇਨਕਮ ਸਕੀਮ ਇੱਕੋ ਵਾਰੀ ਜਮ੍ਹਾਂ ਰਾਸ਼ੀ ਨੂੰ ਤੈਅ ਮਹੀਨਾਵਾਰ ਭੁਗਤਾਨ ਵਿੱਚ ਬਦਲ ਦਿੰਦੀ ਹੈ, ਜੋ ਸਾਲਾਂ ਬਾਅਦ ਮਿਲਣ ਵਾਲੀ ਇਕਮੁਸ਼ਤ ਰਾਸ਼ੀ ਦੀ ਬਜਾਏ ਅੰਦਾਜ਼ਨ ਮਹੀਨਾਵਾਰ ਆਮਦਨ ਚਾਹੁਣ ਵਾਲੇ ਪਰਿਵਾਰ ਲਈ ਲਾਭਦਾਇਕ ਹੈ; <Link href="/calculators/post-office-mis-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Post Office MIS ਕੈਲਕੂਲੇਟਰ</Link> ਨਾਲ ਅੰਕੜੇ ਦੇਖੋ।</span>,
              <span key={3}>ਅਟਲ ਪੈਨਸ਼ਨ ਯੋਜਨਾ ਖਾਸ ਤੌਰ ਤੇ ਅਸੰਗਠਿਤ ਖੇਤਰ ਦੇ ਕਾਮਿਆਂ ਲਈ, ਜਿਸ ਵਿੱਚ ਕਿਸਾਨ ਵੀ ਸ਼ਾਮਲ ਹਨ, ਬਣਾਈ ਗਈ ਹੈ, ਤਾਂ ਜੋ ਸਮੇਂ ਦੇ ਨਾਲ ਇੱਕ ਛੋਟੀ ਗਰੰਟੀਸ਼ੁਦਾ ਪੈਨਸ਼ਨ ਬਣ ਸਕੇ; <Link href="/calculators/atal-pension-yojana-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Atal Pension Yojana ਕੈਲਕੂਲੇਟਰ</Link> ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਇੱਕ ਮਾਮੂਲੀ ਨਿਯਮਤ ਯੋਗਦਾਨ ਸਮੇਂ ਦੇ ਨਾਲ ਕਿੰਨਾ ਵਧ ਸਕਦਾ ਹੈ।</span>,
            ]} />
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>KVP ਕੈਲਕੂਲੇਟਰ</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>ਦੇਖੋ ਕਿ ਬਚਾਈ ਗਈ ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤ ਕਿਸਾਨ ਵਿਕਾਸ ਪੱਤਰ ਦੀ ਮਿਆਦ ਵਿੱਚ ਕਿਵੇਂ ਦੁੱਗਣੀ ਹੋ ਸਕਦੀ ਹੈ।</p>
              </div>
              <Link className="fx-btn" href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                ਕੈਲਕੂਲੇਟਰ ਖੋਲ੍ਹੋ
              </Link>
            </div>

            <h2 id="comparison" style={hStyle}>ਪੀਐਮ-ਕਿਸਾਨ ਅਤੇ ਹੋਰ ਕਿਸਾਨ ਭਲਾਈ ਸਕੀਮਾਂ</h2>
            <p style={pStyle}>
              ਪੀਐਮ-ਕਿਸਾਨ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ ਹੈ, ਇਹ ਭਾਰਤ ਦੀ ਪੂਰੀ ਕਿਸਾਨ ਭਲਾਈ ਵਿਵਸਥਾ ਨਹੀਂ ਹੈ, ਅਤੇ ਕਈ ਹੋਰ ਕੇਂਦਰੀ ਸਕੀਮਾਂ ਉਹ ਖੇਤਰ ਕਵਰ ਕਰਦੀਆਂ ਹਨ ਜੋ ਪੀਐਮ-ਕਿਸਾਨ ਜਾਣਬੁੱਝ ਕੇ ਨਹੀਂ ਕਵਰ ਕਰਦੀ। ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ ਸਬਸਿਡੀ ਵਾਲੇ ਕਿਸਾਨ ਪ੍ਰੀਮੀਅਮ ਨਾਲ ਫਸਲ ਬੀਮਾ ਸੰਭਾਲਦੀ ਹੈ, ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਕਿਸਾਨਾਂ ਨੂੰ ਰਿਆਇਤੀ ਵਿਆਜ ਦਰ ਤੇ ਥੋੜ੍ਹੇ ਸਮੇਂ ਦੇ ਫਸਲੀ ਕਰਜ਼ੇ ਦੀ ਸਹੂਲਤ ਦਿੰਦਾ ਹੈ, ਅਤੇ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਮਾਨਧਨ ਯੋਜਨਾ ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਲਈ ਇੱਕ ਵੱਖਰੀ ਸਵੈ-ਇੱਛਤ ਪੈਨਸ਼ਨ ਸਕੀਮ ਹੈ।
            </p>
            <p style={pStyle}>
              ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕੋਈ ਵੀ ਪੀਐਮ-ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨਾਲ ਆਪਣੇ ਆਪ ਨਹੀਂ ਜੁੜਦਾ। ਹਰ ਸਕੀਮ ਦੀ ਆਪਣੀ ਯੋਗਤਾ ਜਾਂਚ ਅਤੇ ਆਪਣੀ ਅਪਲਾਈ ਕਰਨ ਦੀ ਪ੍ਰਕਿਰਿਆ ਹੈ, ਇਸ ਲਈ ਫਸਲ ਬੀਮਾ, ਕ੍ਰੈਡਿਟ ਲਾਈਨ ਜਾਂ ਕਿਸਾਨ ਪੈਨਸ਼ਨ ਵੀ ਚਾਹੁਣ ਵਾਲੇ ਪੀਐਮ-ਕਿਸਾਨ ਲਾਭਪਾਤਰੀ ਨੂੰ, ਇਹ ਮੰਨਣ ਦੀ ਬਜਾਏ ਕਿ ਪੀਐਮ-ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਇਨ੍ਹਾਂ ਸਭ ਨੂੰ ਕਵਰ ਕਰਦੀ ਹੈ, ਹਰ ਸਕੀਮ ਲਈ ਵੱਖਰੇ ਤੌਰ ਤੇ ਅਪਲਾਈ ਕਰਨਾ ਪਵੇਗਾ।
            </p>


            <h2 id="faq" style={hStyle}>ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ</h2>
            <div className="faq-accordion">
              {faqItems.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: C.dark,
                    fontFamily: INTER,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff',
                    userSelect: 'none' as const,
                    lineHeight: 1.5,
                  }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.85, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <Disclaimer />
          </article>

          <aside
            className="pm-kisan-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                ਹੋਰ ਬਲੌਗ ਦੇਖੋ
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: C.border, margin: '24px 0 0' }} />
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .pm-kisan-sidebar::-webkit-scrollbar { width: 5px; }
        .pm-kisan-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pm-kisan-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pm-kisan-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}
