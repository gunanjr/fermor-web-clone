import type { Metadata } from 'next';
import { InfoPage, type InfoSection } from '../../src/components/common/InfoPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Fermor privacy policy: what data an optional account collects, how Google AdSense advertising works on this site, and what we never collect.',
  alternates: { canonical: 'https://fermor.in/privacy' },
};

const sections: InfoSection[] = [
  {
    id: 'short-version',
    title: 'The short version',
    body: (
      <p>
        The financial figures you type into any calculator (loan amount, salary, interest rate, and so on) stay in your browser and are never sent to our servers, whether or not you have an account. Fermor offers an optional free account so you can save your results, and displays advertising through Google AdSense to keep every tool free. Both of those involve some real data collection, described in full below.
      </p>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <ul className="ip-list">
        <li>If you create a free account to save your calculator results: your name, email address, and a securely hashed password (or, if you use &quot;Sign in with Google&quot;, the name and email Google shares with us)</li>
        <li>If you sign up for email updates on a specific calculator or page: your email address only</li>
        <li>If you previously registered as a Chartered Accountant on the CA Portal, which has since been retired: your name, firm name, email, and optional phone number, under a separate CA account system. You can request deletion of this data at any time: see Data retention below</li>
        <li>Standard web server request logs (IP address, user-agent) via our hosting provider, described under Third-party services below</li>
      </ul>
    ),
  },
  {
    id: 'what-we-do-not-collect',
    title: 'What we do not collect',
    body: (
      <ul className="ip-list">
        <li>The financial figures you enter into a calculator: loan amounts, salary, interest rates, and similar inputs are computed entirely in your browser and are not transmitted to our servers</li>
        <li>Any personal data at all, if you never create an account or sign up for email updates, since using a calculator never requires either</li>
        <li>Payment information of any kind, since Fermor does not process payments directly on fermor.in</li>
      </ul>
    ),
  },
  {
    id: 'advertising',
    title: 'Advertising',
    body: (
      <>
        <p>
          Fermor displays advertisements through Google AdSense to keep every calculator free to use. Google and its advertising partners may use cookies and similar technologies to serve ads based on your visits to this and other websites.
        </p>
        <p>
          You can learn more about how Google uses this data at{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s advertising technologies page</a>, and manage or opt out of personalized advertising at{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Fermor does not control the specific ads shown to you or the data Google&apos;s advertising system collects for ad personalization.
        </p>
        <p>
          Some calculator and comparison pages also link out directly to bank and financial product websites (for example, a credit card&apos;s official application page). These are plain outbound links; Fermor does not currently attach any tracking identifiers to them.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: (
      <p>
        Fermor&apos;s own code does not set any cookies. If you sign in to an account, your session is kept in your browser&apos;s local storage, not a cookie. Google AdSense, which serves ads on this site, sets its own cookies for ad delivery and personalization on Google&apos;s behalf: see Advertising above for how to manage those.
      </p>
    ),
  },
  {
    id: 'analytics',
    title: 'Analytics',
    body: (
      <p>
        Fermor does not currently use Google Analytics or any other analytics or tracking service, beyond the AdSense advertising described above and the standard infrastructure-level request logs described below.
      </p>
    ),
  },
  {
    id: 'third-party-services',
    title: 'Third-party services',
    body: (
      <>
        <p>
          The Fermor website is hosted on Vercel. Vercel may log standard HTTP request metadata (IP address, user-agent) for infrastructure and security purposes, subject to{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&apos;s Privacy Policy</a>.
        </p>
        <p>
          Google AdSense is the only advertising network used on fermor.in: see Advertising above. We do not sell data to data brokers.
        </p>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data retention',
    body: (
      <p>
        If you create an account, we keep your name, email, and hashed password for as long as your account is active. You can request deletion of your account and associated data at any time by contacting us at{' '}
        <a href="mailto:fermor.in.contact@gmail.com">fermor.in.contact@gmail.com</a>. Email addresses collected through an on-page sign-up are used only to notify you about the specific feature you signed up for and are never sold to third parties. If you never create an account or sign up for updates, we hold no personal data about you to retain in the first place.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we make material changes to this policy, we will update the &ldquo;Last updated&rdquo; date above. Continued use of Fermor after any changes constitutes your acceptance of the updated policy.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      path="/privacy"
      crumb="Privacy Policy"
      eyebrow="Legal"
      title="Privacy Policy"
      lead="What an optional account collects, how advertising works on this site, and what Fermor does not collect."
      meta="Last updated: October 2026"
      sections={sections}
      showIndex
    />
  );
}
