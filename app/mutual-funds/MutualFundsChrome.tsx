import { PageNav } from '../../src/components/common/PageNav';
import { SiteFooter } from '../../src/components/common/SiteFooter';
import { MUTUAL_FUND_COLUMNS } from '../../src/components/common/footerLinks';

// Shared header/footer for the whole mutual funds vertical (landing, compare, AMC directory and
// hubs, guide, individual scheme pages). The header is the site's main navigation (the homepage
// FloatingNav, in its in-page variant) and the footer is SiteFooter with the mutual fund link set,
// so this vertical looks like every other individual page. Mutual Funds and Browse by AMC are
// reachable from the Resources menu of that bar. #2D9970 stays elsewhere in this vertical as a
// data colour (returns, NAV) and is not part of the chrome.
export function MutualFundsHeader({ signupHref = '/signup' }: { signupHref?: string }) {
  return <PageNav signupHref={signupHref} />;
}

/* The vertical's footer: the one line the old footer carried that the site footer does not (where
   the data comes from and what it is not), then the shared site footer with the mutual fund link
   set. Every page in the vertical renders this, so they stay in step. */
export function MutualFundsFooter() {
  return (
    <>
      <p style={{ maxWidth: 1200, margin: '40px auto 32px', padding: '0 24px', font: '12px/1.6 system-ui', color: '#50565c' }}>
        Mutual fund data sourced from AMFI. This is not investment advice. Please read scheme documents carefully.
      </p>
      <SiteFooter columns={MUTUAL_FUND_COLUMNS} />
    </>
  );
}

// Shared header CSS (sticky sidebar scrollbar, header nav collapse, etc.) that every mutual-funds
// vertical page needs. Injected once per page via <style>{MUTUAL_FUNDS_CHROME_CSS}</style> rather
// than exported as a component, since a <style> tag with no wrapper element is the simplest way
// to share raw CSS across independent page trees.
export const MUTUAL_FUNDS_CHROME_CSS = `
  @media (max-width: 760px) {
    .mf2-header-nav, .mf2-header-search { display: none !important; }
  }
`;
