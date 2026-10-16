import Link from 'next/link';

interface SubNavProps {
  breadcrumb: string;
  parent?: { label: string; href: string };
}

const linkStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600,
  color: 'rgba(255,255,255,0.55)',
  textDecoration: 'none',
  padding: '5px 12px',
  borderRadius: 6,
  border: '1px solid rgba(255,255,255,0.12)',
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

/* Mobile behaviour lives in globals.css (.subnav-*): the brand text drops out below 400px, the
   right-hand button tightens, and the breadcrumb truncates instead of pushing the bar wider
   than the screen. */
export function SubNav({ breadcrumb, parent }: SubNavProps) {
  return (
    <nav className="subnav" style={{
      background: '#101214',
      borderBottom: '1px solid rgba(255,255,255,0.10)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="subnav-in" style={{
        maxWidth: 1160,
        margin: '0 auto',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div className="subnav-l" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Link href="/" className="subnav-brand" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <img src="/fermor-mark-2026.svg" alt="Fermor" width={32} height={24} style={{ height: 24, width: 'auto', display: 'block' }} />
            <span style={{
              fontSize: 16, fontWeight: 800, color: 'white',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}>Fermor</span>
          </Link>
          {parent && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, margin: '0 2px' }}>/</span>
              <Link href={parent.href} className="subnav-parent" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif', whiteSpace: 'nowrap' }}>
                {parent.label}
              </Link>
            </>
          )}
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, margin: '0 2px' }}>/</span>
          <span style={{ fontSize: 13, color: '#75FB90', fontWeight: 600, fontFamily: 'var(--font-inter), Inter, sans-serif', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{breadcrumb}</span>
        </div>
        <div className="subnav-r" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" className="subnav-all" style={linkStyle}>
            Mutual Funds
          </Link>
          <Link href="/calculators" target="_blank" rel="noopener noreferrer" className="subnav-all" style={linkStyle}>
            <span className="subnav-pre">All </span>Calculators
          </Link>
        </div>
      </div>
    </nav>
  );
}
