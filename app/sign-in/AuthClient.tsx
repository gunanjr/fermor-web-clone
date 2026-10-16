'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const C = {
  dark:     '#101214',
  lime:     '#75FB90',
  ink:      '#16140F',
  white:    '#ffffff',
  border:   '#E2EBE0',
  bg:       '#F4F8F5'
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AuthClient({ isLoginMode }: { isLoginMode: boolean }) {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (!isLoading && user) router.push('/account');
  }, [user, isLoading, router]);

  const startResendTimer = () => {
    setResendCountdown(60);
    const t = setInterval(() => {
      setResendCountdown(c => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLoginMode) {
        const res = await fetch(`${API}/api/v1/auth/user/login`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) { login(data.data.token, data.data.user); router.push('/account'); }
        else setError(data.error?.message || 'Invalid email or password.');
      } else {
        const res = await fetch(`${API}/api/v1/auth/user/send-otp`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) { setStep('otp'); startResendTimer(); }
        else setError(data.error?.message || 'Failed to send code.');
      }
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/v1/auth/user/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, otp }),
      });
      const data = await res.json();
      if (res.ok) { login(data.data.token, data.data.user); router.push('/account'); }
      else setError(data.error?.message || 'Invalid or expired code.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setError('');
    try {
      const res = await fetch(`${API}/api/v1/auth/user/send-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { startResendTimer(); setOtp(''); }
      else setError(data.error?.message || 'Failed to resend.');
    } catch { setError('Network error.'); }
  };

  if (isLoading || user) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 16px'
    }}>
      <div style={{ position: 'absolute', top: 24, left: 24 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <img src="/fermor-mark-2026.svg" alt="Fermor" width={28} height={21} style={{ height: 21 }} />
          <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 18, fontWeight: 800, color: '#16140F', letterSpacing: '-.02em' }}>Fermor</span>
        </Link>
      </div>

      <div style={{
        background: C.white, borderRadius: 20, padding: '40px 32px',
        width: '100%', maxWidth: 440, boxShadow: '0 20px 40px rgba(20,30,18,0.06)',
        border: `1px solid ${C.border}`
      }}>
        <h2 style={{ margin: '0 0 10px', color: C.ink, fontSize: 26, fontWeight: 700, letterSpacing: '-.02em' }}>
          {isLoginMode ? 'Welcome back' : 'Create an account'}
        </h2>
        <p style={{ margin: '0 0 22px', color: '#5A5A52', fontSize: 15, lineHeight: 1.5 }}>
          {isLoginMode ? 'Sign in to access your Fermor account.' : 'Join free to get financial tips, calculator updates, and insights.'}
        </p>

        {/* Google OAuth */}
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/auth/user/google/start`}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', padding: '12px 16px', background: C.white,
            border: `1.5px solid #E2EBE0`, borderRadius: 12, textDecoration: 'none',
            color: '#16140F', fontSize: 15, fontWeight: 600, marginBottom: 18,
            fontFamily: 'var(--font-inter), Inter, sans-serif', cursor: 'pointer',
          }}>
          <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#E2EBE0' }} />
          <span style={{ fontSize: 12, color: '#8A8F86', fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#E2EBE0' }} />
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14, border: '1px solid #FCA5A5' }}>
            {error}
          </div>
        )}

        {step === 'otp' ? (
          <>
            <p style={{ fontSize: 15, color: '#5A5A52', margin: '0 0 20px', lineHeight: 1.6 }}>
              We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
            </p>
            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Verification Code</label>
                <input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6}
                  value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456" autoFocus required
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 28, letterSpacing: '0.2em', textAlign: 'center', fontWeight: 700, background: '#F9FCF8', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </div>
              <button type="submit" disabled={loading || otp.length < 6}
                style={{ marginTop: 6, width: '100%', padding: '14px', background: C.dark, color: C.lime, border: 'none', borderRadius: 10, fontSize: 15.5, fontWeight: 700, cursor: (loading || otp.length < 6) ? 'not-allowed' : 'pointer', opacity: (loading || otp.length < 6) ? 0.7 : 1 }}>
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </form>
            <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#5A5A52' }}>
              {resendCountdown > 0 ? <span>Resend in {resendCountdown}s</span> : (
                <button onClick={handleResend} style={{ background: 'none', border: 'none', color: C.dark, fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: 14 }}>
                  Resend code
                </button>
              )}
              <span style={{ margin: '0 8px', color: '#8A8F86' }}>|</span>
              <button onClick={() => { setStep('form'); setError(''); }} style={{ background: 'none', border: 'none', color: '#8A8F86', cursor: 'pointer', padding: 0, fontSize: 14 }}>
                Go back
              </button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {!isLoginMode && (
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Full Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 15, background: '#F9FCF8', outline: 'none' }}
                    onFocus={e => (e.target.style.borderColor = C.dark)} onBlur={e => (e.target.style.borderColor = C.border)} />
                </div>
              )}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 15, background: '#F9FCF8', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor = C.dark)} onBlur={e => (e.target.style.borderColor = C.border)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 15, background: '#F9FCF8', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor = C.dark)} onBlur={e => (e.target.style.borderColor = C.border)} />
              </div>
              <button type="submit" disabled={loading}
                style={{ marginTop: 10, width: '100%', padding: '14px', background: C.dark, color: C.lime, border: 'none', borderRadius: 10, fontSize: 15.5, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Please wait...' : (isLoginMode ? 'Sign In' : 'Send Verification Code')}
              </button>
            </form>
            <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14.5, color: '#5A5A52' }}>
              {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
              <Link href={isLoginMode ? '/signup' : '/sign-in'} style={{ color: '#2E6B1E', fontWeight: 700, textDecoration: 'none' }}>
                {isLoginMode ? 'Sign up' : 'Log in'}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
