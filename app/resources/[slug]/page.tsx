import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fermor Resource',
  description: 'Explore practical financial planning and workplace financial wellness insights from Fermor.',
};

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug === 'all'
    ? 'Fermor financial intelligence, in focus'
    : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main style={{ minHeight: '100vh', background: '#f2f8e8', color: '#16140f', fontFamily: 'var(--font-inter), Inter, sans-serif', padding: '28px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Link href="/resources" style={{ color: '#1A3530', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Back to Resources</Link>
        <div style={{ marginTop: 90, padding: '48px', borderRadius: 24, background: '#1A3530', color: '#fff', boxShadow: '0 24px 60px rgba(20,30,18,.16)' }}>
          <div style={{ color: '#C8F135', fontSize: 11, fontWeight: 700, letterSpacing: '.1em' }}>FERMOR RESOURCE</div>
          <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 500, lineHeight: 1.08, margin: '20px 0' }}>{title}</h1>
          <p style={{ maxWidth: 600, color: 'rgba(255,255,255,.72)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>A considered perspective on financial decisions, workplace wellbeing and the systems that help people build lasting financial confidence.</p>
        </div>
      </div>
    </main>
  );
}
