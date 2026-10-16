import type { Metadata } from 'next';
import { InfoPage, type InfoSection } from '../../src/components/common/InfoPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Fermor terms of use. Free calculators for informational purposes only. Not financial advice.',
  alternates: { canonical: 'https://fermor.in/terms' },
};

const sections: InfoSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    body: (
      <p>
        By using fermor.in (&ldquo;the Site&rdquo;), you agree to these Terms of Use. If you do not agree, please do not use the Site. Fermor reserves the right to update these terms at any time; your continued use after changes are posted constitutes acceptance.
      </p>
    ),
  },
  {
    id: 'informational-purpose',
    title: 'Informational purpose only, not financial advice',
    body: (
      <>
        <p>
          All calculators, tools, and content on Fermor are provided for general informational and educational purposes only. Results are indicative estimates based on the inputs you provide and standard financial formulas.
        </p>
        <div className="ip-note">
          <p>
            <strong>Fermor is not a bank, lender, financial adviser, or registered investment adviser under any Indian or international regulation.</strong> Nothing on this Site constitutes financial, investment, tax, or legal advice. Always verify figures with your lender, bank, or a qualified financial professional before committing to any financial product.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'accuracy',
    title: 'Accuracy of results',
    body: (
      <p>
        Fermor calculators use standard, publicly available financial formulas (reducing-balance EMI, compound interest, etc.). While we strive for accuracy, actual loan terms, interest rates, charges, and repayment amounts are determined solely by your lender and may differ from calculator estimates.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: (
      <p>
        All content on the Site, including text, design, code, and graphics, is the property of Fermor and is protected under applicable copyright and intellectual property laws. You may not reproduce, redistribute, or create derivative works without express written permission.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the maximum extent permitted by law, Fermor and its owners shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site or reliance on any calculator result. The Site is provided &ldquo;as is&rdquo; without any warranty of any kind.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of India. For questions, contact us at{' '}
        <a href="mailto:fermor.in.contact@gmail.com">fermor.in.contact@gmail.com</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      path="/terms"
      crumb="Terms of Use"
      eyebrow="Legal"
      title="Terms of Use"
      lead="The terms for using fermor.in and its free calculators."
      meta="Last updated: June 2026"
      sections={sections}
      showIndex
    />
  );
}
