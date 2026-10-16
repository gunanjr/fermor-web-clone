import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage, type InfoSection } from '../../src/components/common/InfoPage';

export const metadata: Metadata = {
  title: 'About Fermor: Free Finance Calculators for India',
  description: 'Fermor builds free, accurate personal finance calculators for India. Free to use, no login wall on any tool. Just clear math for every money decision.',
  alternates: { canonical: 'https://fermor.in/about' },
};

const START_LINKS = [
  { href: '/calculators', label: 'Calculators', note: 'EMI, SIP, FD, income tax, salary take-home and more' },
  { href: '/mutual-funds', label: 'Mutual funds', note: 'Scheme pages with NAV and period returns' },
  { href: '/tax', label: 'Income tax', note: 'Tax on salary, by amount and by city' },
  { href: '/blogs', label: 'Blogs', note: 'Guides on tax, compliance and money decisions' },
];

const sections: InfoSection[] = [
  {
    id: 'what-we-build',
    title: 'What we build',
    body: (
      <>
        <p>
          Fermor is a personal finance platform built for India. We make free, accurate calculators that help you understand the real math behind every money decision: EMI, SIP returns, FD interest, income tax, salary take-home, and more.
        </p>
        <p>
          Every calculator&apos;s math runs entirely in your browser: the numbers you type in are never sent to our servers just to get a result. Creating an account is optional and only needed if you want to save a calculation and come back to it later. Fermor is supported by advertising and affiliate partnerships, which is what lets every tool stay free with no paywall.
        </p>
      </>
    ),
  },
  {
    id: 'why-we-exist',
    title: 'Why we exist',
    body: (
      <>
        <p>
          Most personal finance tools in India are either buried inside bank websites designed to sell you products, or cluttered with ads and dark patterns. We wanted something clean, fast, and honest.
        </p>
        <p>
          Fermor was started by a small team of engineers and finance enthusiasts who were tired of having to reverse-engineer their own loan amortization schedules from bank PDFs. If we had to build it for ourselves, we figured others needed it too.
        </p>
      </>
    ),
  },
  {
    id: 'principles',
    title: 'Our principles',
    body: (
      <ul className="ip-list">
        <li>Show the full math, not just the answer</li>
        <li>No login wall on any calculator: an account is optional, only to save your results</li>
        <li>Ads and affiliate links are always clearly labeled, never disguised as neutral advice</li>
        <li>Transparent methodology on every tool</li>
        <li>Mobile-first: most Indians are on phones</li>
      </ul>
    ),
  },
  {
    id: 'where-to-start',
    title: 'Where to start',
    body: (
      <ul className="ip-links">
        {START_LINKS.map(l => (
          <li key={l.href}>
            <Link href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<span>{l.note}</span></Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>For questions, feedback, or partnership enquiries, reach us at:</p>
        <p><a className="ip-btn" href="mailto:fermor.in.contact@gmail.com">fermor.in.contact@gmail.com</a></p>
        <p>We are based in India and typically respond within 2 business days.</p>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      path="/about"
      crumb="About"
      eyebrow="Company"
      title="About Fermor"
      lead="Free personal finance calculators built for India. No login wall on any tool."
      sections={sections}
    />
  );
}
