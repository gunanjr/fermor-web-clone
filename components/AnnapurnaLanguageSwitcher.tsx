import Link from 'next/link';

const C = {
  dg:     '#1A3530',
  lime2:  '#95CC42',
  paleDg: '#EBF3F1',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

const VERSIONS = [
  { code: 'en', label: 'English', native: 'English', href: '/blogs/annapurna-bhandar-2026' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', href: '/blogs/annapurna-bhandar-2026-bn' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', href: '/blogs/annapurna-bhandar-2026-hi' },
  { code: 'ur', label: 'Urdu', native: 'اردو', href: '/blogs/annapurna-bhandar-2026-ur' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली', href: '/blogs/annapurna-bhandar-2026-ne' },
] as const;

export function AnnapurnaLanguageSwitcher({ current, heading, subtext }: {
  current: 'en' | 'bn' | 'hi' | 'ur' | 'ne';
  heading: string;
  subtext: string;
}) {
  return (
    <div style={{ margin: '4px 0 32px', padding: '18px 20px', background: C.paleDg, border: `1px solid ${C.lime2}`, borderRadius: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.dg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
        <div>
          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 700, color: C.dg, margin: '0 0 2px' }}>{heading}</p>
          <p style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2, margin: 0, lineHeight: 1.5 }}>{subtext}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {VERSIONS.map(v => (
          v.code === current ? (
            <span key={v.code} aria-current="true" style={{ fontFamily: INTER, fontSize: 13.5, fontWeight: 700, color: '#fff', background: C.dg, borderRadius: 7, padding: '6px 14px' }}>
              {v.native}
            </span>
          ) : (
            <Link key={v.code} href={v.href} lang={v.code} hrefLang={v.code} style={{ fontFamily: INTER, fontSize: 13.5, fontWeight: 500, color: C.ink, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', textDecoration: 'none' }}>
              {v.native}
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
