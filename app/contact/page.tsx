import type { Metadata } from 'next';
import { InfoPage, type InfoSection } from '../../src/components/common/InfoPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Fermor team for questions, feedback, or partnership enquiries.',
  alternates: { canonical: 'https://fermor.in/contact' },
};

const sections: InfoSection[] = [
  {
    id: 'email',
    title: 'Email',
    body: (
      <>
        <p>For all enquiries: feedback, bug reports, feature requests, or partnerships:</p>
        <div className="ip-panel">
          <p>Write to us at</p>
          <a className="ip-btn" href="mailto:fermor.in.contact@gmail.com">fermor.in.contact@gmail.com</a>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-include',
    title: 'What to include',
    body: (
      <ul className="ip-list">
        <li>The calculator or page you were using</li>
        <li>What you expected vs what happened</li>
        <li>Your device and browser (for bugs)</li>
      </ul>
    ),
  },
  {
    id: 'response-time',
    title: 'Response time',
    body: (
      <p>
        We are a small team based in India. We typically respond within 2 business days, Monday–Friday. We do not offer phone support.
      </p>
    ),
  },
];

export default function ContactPage() {
  return (
    <InfoPage
      path="/contact"
      crumb="Contact"
      eyebrow="Company"
      title="Contact Us"
      lead="We read every message and respond within 2 business days."
      sections={sections}
    />
  );
}
