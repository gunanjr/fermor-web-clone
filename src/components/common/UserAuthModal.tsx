'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const C = {
  dark:   '#1A3530',
  lime:   '#C8F135',
  ink:    '#16140F',
  ink2:   '#5A5A52',
  ink3:   '#8A8F86',
  white:  '#ffffff',
  border: '#E2EBE0',
  bg:     '#F9FCF8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type Step = 'form' | 'otp';
type Mode = 'signup' | 'login';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 8,
  border: `1px solid ${C.border}`, fontSize: 14, background: C.bg,
  outline: 'none', color: C.ink, fontFamily: INTER, boxSizing: 'border-box',
};

export function UserAuthModal({ initialEmail, onClose }: { initialEmail: string; onClose: () => void }) {
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>('signup');
  const [step, setStep] = useState<Step>('form');

  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const startResendTimer = () => {
    setResendCountdown(60);
    const t = setInterval(() => {
      setResendCountdown(c => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; });
    }, 1000);
  };

  /* ── Step 1: Send OTP or Login ── */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await fetch(`${API}/api/v1/auth/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) { login(data.data.token, data.data.user); onClose(); }
        else setError(data.error?.message || 'Invalid email or password.');
      } else {
        const res = await fetch(`${API}/api/v1/auth/user/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) { setStep('otp'); startResendTimer(); }
        else setError(data.error?.message || 'Failed to send code. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: Verify OTP + Create Account ── */
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/v1/auth/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, otp }),
      });
      const data = await res.json();
      if (res.ok) { login(data.data.token, data.data.user); onClose(); }
      else setError(data.error?.message || 'Invalid or expired code. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend OTP ── */
  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setError('');
    try {
      const res = await fetch(`${API}/api/v1/auth/user/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { startResendTimer(); setOtp(''); }
      else setError(data.error?.message || 'Failed to resend code.');
    } catch {
      setError('Network error. Please try again.');
    }
  };

  const switchMode = (m: Mode) => { setMode(m); setStep('form'); setError(''); setOtp(''); };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.48)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, fontFamily: INTER,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: C.white, borderRadius: 18, padding: '36px 32px',
        width: '100%', maxWidth: 420, boxShadow: '0 24px 48px rgba(0,0,0,0.16)',
        position: 'relative',
      }}>
        <button onClick={onClose} aria-label="Close"
          style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: C.ink3, lineHeight: 1 }}>
          &times;
        </button>

        {/* ── OTP Step ── */}
        {step === 'otp' ? (
          <>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ margin: '0 0 6px', color: C.ink, fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>
                Check your email
              </h2>
              <p style={{ margin: 0, color: C.ink2, fontSize: 14, lineHeight: 1.6 }}>
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below to create your account.
              </p>
            </div>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: 8, marginBottom: 18, fontSize: 13 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: C.ink }}>
                  Verification Code
                </label>
                <input
                  type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6}
                  value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456" autoFocus required
                  style={{ ...inputStyle, fontSize: 24, letterSpacing: '0.2em', textAlign: 'center', fontWeight: 700 }}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
              </div>

              <button type="submit" className="fx-btn" disabled={loading || otp.length < 6}
                style={{
                  width: '100%', padding: '13px', background: '#E9ECEE', color: '#101214',
                  border: '1px solid #D3D7DA', borderRadius: 10, fontSize: 15, fontWeight: 700,
                  cursor: (loading || otp.length < 6) ? 'not-allowed' : 'pointer',
                  fontFamily: INTER, opacity: (loading || otp.length < 6) ? 0.7 : 1,
                }}>
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </form>

            <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13.5, color: C.ink2 }}>
              {resendCountdown > 0 ? (
                <span>Resend code in {resendCountdown}s</span>
              ) : (
                <button onClick={handleResend}
                  style={{ background: 'none', border: 'none', color: C.dark, fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: 13.5, fontFamily: INTER }}>
                  Resend code
                </button>
              )}
              <span style={{ color: C.ink3, margin: '0 8px' }}>|</span>
              <button onClick={() => setStep('form')}
                style={{ background: 'none', border: 'none', color: C.ink3, cursor: 'pointer', padding: 0, fontSize: 13.5, fontFamily: INTER }}>
                Go back
              </button>
            </div>
          </>
        ) : (
          /* ── Form Step ── */
          <>
            <div style={{ marginBottom: 22 }}>
              <h2 style={{ margin: '0 0 6px', color: C.ink, fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>
                {mode === 'login' ? 'Welcome back' : 'Join Fermor free'}
              </h2>
              <p style={{ margin: 0, color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                {mode === 'login' ? 'Sign in to your account.' : 'Get financial tips and updates. Free forever.'}
              </p>
            </div>

            {/* Google OAuth Button */}
            <a
              href={`${API}/api/v1/auth/user/google/start`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: '11px 14px', background: C.white,
                border: `1.5px solid ${C.border}`, borderRadius: 10, textDecoration: 'none',
                color: C.ink, fontSize: 14, fontWeight: 600, marginBottom: 16,
                fontFamily: INTER, cursor: 'pointer', boxSizing: 'border-box',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>or</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mode === 'signup' && (
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: C.ink }}>Full Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)}
                    placeholder="Priya Sharma" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = C.dark)}
                    onBlur={e => (e.target.style.borderColor = C.border)} />
                </div>
              )}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: C.ink }}>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: C.ink }}>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : ''}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </div>
              <button className="fx-btn" type="submit" disabled={loading}
                style={{
                  marginTop: 4, width: '100%', padding: '13px', background: '#E9ECEE', color: '#101214',
                  border: '1px solid #D3D7DA', borderRadius: 10, fontSize: 15, fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer', fontFamily: INTER,
                  opacity: loading ? 0.7 : 1,
                }}>
                {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Send Verification Code')}
              </button>
            </form>

            <p style={{ marginTop: 20, textAlign: 'center', fontSize: 13.5, color: C.ink2 }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                style={{ background: 'none', border: 'none', color: C.dark, fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: 13.5, fontFamily: INTER }}>
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
