'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const C = { dark: '#1A3530', lime: '#C8F135', bg: '#F4F8F5', ink3: '#8A8F86' };
const INTER = 'var(--font-inter), Inter, sans-serif';

function CallbackInner() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'error'>('processing');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = params.get('token');
    const userParam = params.get('user');
    const error = params.get('error');

    if (error) {
      const messages: Record<string, string> = {
        google_denied: 'Google sign-in was cancelled.',
        google_failed: 'Google sign-in failed. Please try again.',
        google_not_configured: 'Google sign-in is not yet available.',
        invalid_state: 'Invalid request. Please try again.',
      };
      setErrorMsg(messages[error] || 'Sign-in failed. Please try again.');
      setStatus('error');
      return;
    }

    if (!token || !userParam) {
      setErrorMsg('Sign-in failed. Please try again.');
      setStatus('error');
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam));
      login(token, user);
      router.replace('/account');
    } catch {
      setErrorMsg('Failed to process sign-in. Please try again.');
      setStatus('error');
    }
  }, [params, login, router]);

  if (status === 'error') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: C.bg, fontFamily: INTER, padding: 24, textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <p style={{ fontSize: 16, color: '#991B1B', fontWeight: 600, marginBottom: 8 }}>
          {errorMsg}
        </p>
        <button
          onClick={() => router.push('/sign-in')}
          style={{
            marginTop: 16, padding: '11px 24px', background: C.dark, color: C.lime,
            border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: INTER,
          }}>
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: C.bg, fontFamily: INTER,
    }}>
      <div style={{
        width: 40, height: 40, border: `3px solid ${C.dark}`,
        borderTopColor: 'transparent', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite', marginBottom: 16,
      }} />
      <p style={{ fontSize: 15, color: C.ink3 }}>Signing you in...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F8F5' }} />
    }>
      <CallbackInner />
    </Suspense>
  );
}


