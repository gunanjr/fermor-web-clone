'use client';

import React, { useEffect, useState } from 'react';
import { MainNavbar } from '../../src/components/common/MainNavbar';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Footer } from '../_home/Footer';
import { PRODUCT_COLUMNS } from '../../src/components/common/footerLinks';

const C = {
  dark:     '#101214',
  lime:     '#75FB90',
  lime2:    '#95CC42',
  paleLime: '#EDFBBC',
  ink:      '#16140F',
  ink2:     '#5A5A52',
  ink3:     '#8A8F86',
  white:    '#ffffff',
  bg:       '#F4F8F5',
  border:   '#E2EBE0',
  red:      '#DC2626',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`, borderRadius: 16,
      padding: '28px 32px', marginBottom: 20, ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 18px', fontFamily: INTER }}>
      {children}
    </p>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.ink2, marginBottom: 7, fontFamily: INTER }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: `1px solid ${C.border}`, fontSize: 14, background: '#F9FCF8',
  outline: 'none', color: C.ink, fontFamily: INTER, boxSizing: 'border-box',
};

export default function ProfilePage() {
  const { user, token, logout, updateUser, isLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.push('/sign-in');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username || '');
      setAvatarUrl(user.avatarUrl || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setCity(user.city || '');
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, fontFamily: INTER, color: C.ink3 }}>
        Loading...
      </div>
    );
  }

  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileSaving(true);
    try {
      const res = await fetch(`${API}/api/v1/auth/user/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim() || null,
          avatarUrl: avatarUrl.trim() || null,
          phone: phone.trim() || null,
          bio: bio.trim() || null,
          city: city.trim() || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data.data.user);
        setProfileMsg({ type: 'ok', text: 'Profile updated.' });
      } else {
        setProfileMsg({ type: 'err', text: data.error?.message || 'Failed to save profile.' });
      }
    } catch {
      setProfileMsg({ type: 'err', text: 'Network error. Please try again.' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (newPw !== confirmPw) {
      setPwMsg({ type: 'err', text: 'New passwords do not match.' });
      return;
    }
    if (newPw.length < 6) {
      setPwMsg({ type: 'err', text: 'New password must be at least 6 characters.' });
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch(`${API}/api/v1/auth/user/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMsg({ type: 'ok', text: 'Password changed successfully.' });
        setCurrentPw(''); setNewPw(''); setConfirmPw('');
      } else {
        setPwMsg({ type: 'err', text: data.error?.message || 'Failed to change password.' });
      }
    } catch {
      setPwMsg({ type: 'err', text: 'Network error. Please try again.' });
    } finally {
      setPwSaving(false);
    }
  };

  const displayAvatar = user.avatarUrl || avatarUrl;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: C.bg, fontFamily: INTER }}>
      <MainNavbar />

      <main style={{ flex: 1, padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {displayAvatar ? (
                <img src={displayAvatar} alt={user.name}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.border}` }} />
              ) : (
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: C.dark, color: C.lime,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, flexShrink: 0,
                }}>
                  {initials}
                </div>
              )}
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.ink, letterSpacing: '-.02em' }}>{user.name}</h1>
                <p style={{ margin: '2px 0 0', fontSize: 14, color: C.ink3 }}>{user.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/calculators" style={{
                fontSize: 13, fontWeight: 600, color: C.ink2, background: C.white,
                border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', textDecoration: 'none',
              }}>
                Calculators
              </Link>
              <button
                onClick={() => { logout(); router.push('/'); }}
                style={{ fontSize: 13, fontWeight: 600, color: C.red, background: 'transparent', border: `1px solid #FCA5A5`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER }}
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Profile details */}
          <Card>
            <SectionLabel>Profile</SectionLabel>
            <form onSubmit={handleSaveProfile}>
              <Field label="Full Name">
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </Field>
              <Field label="Username (optional)">
                <input type="text" value={username} onChange={e => setUsername(e.target.value.toLowerCase())}
                  placeholder="e.g. priyasharma" maxLength={30}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
                <p style={{ margin: '6px 0 0', fontSize: 12, color: C.ink3 }}>
                  Lowercase letters, numbers, and underscores only.
                </p>
              </Field>
              <Field label="Email address">
                <input type="email" value={user.email} readOnly
                  style={{ ...inputStyle, color: C.ink3, cursor: 'not-allowed', background: C.bg }} />
              </Field>
              <Field label="Phone number (optional)">
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </Field>
              <Field label="City (optional)">
                <input type="text" value={city} onChange={e => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </Field>
              <Field label="Short bio (optional)">
                <textarea value={bio} onChange={e => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself..." maxLength={300} rows={3}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
                <p style={{ margin: '6px 0 0', fontSize: 12, color: C.ink3 }}>
                  {bio.length}/300 characters
                </p>
              </Field>
              <Field label="Profile picture URL (optional)">
                <input type="url" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
                <p style={{ margin: '6px 0 0', fontSize: 12, color: C.ink3 }}>
                  Paste any image URL. Your initials show if left blank.
                </p>
              </Field>
              {profileMsg && (
                <div style={{
                  padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13,
                  background: profileMsg.type === 'ok' ? '#DCFCE7' : '#FEE2E2',
                  color: profileMsg.type === 'ok' ? '#166534' : '#991B1B',
                }}>
                  {profileMsg.text}
                </div>
              )}
              <button type="submit" disabled={profileSaving}
                style={{
                  padding: '11px 24px', background: C.dark, color: C.lime,
                  border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
                  cursor: profileSaving ? 'not-allowed' : 'pointer', fontFamily: INTER,
                  opacity: profileSaving ? 0.7 : 1,
                }}>
                {profileSaving ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </Card>

          {/* Change password */}
          <Card>
            <SectionLabel>Change Password</SectionLabel>
            <form onSubmit={handleChangePassword}>
              <Field label="Current Password">
                <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </Field>
              <Field label="New Password">
                <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} required
                  placeholder="At least 6 characters"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </Field>
              <Field label="Confirm New Password">
                <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = C.dark)}
                  onBlur={e => (e.target.style.borderColor = C.border)} />
              </Field>
              {pwMsg && (
                <div style={{
                  padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13,
                  background: pwMsg.type === 'ok' ? '#DCFCE7' : '#FEE2E2',
                  color: pwMsg.type === 'ok' ? '#166534' : '#991B1B',
                }}>
                  {pwMsg.text}
                </div>
              )}
              <button type="submit" disabled={pwSaving}
                style={{
                  padding: '11px 24px', background: C.dark, color: C.lime,
                  border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
                  cursor: pwSaving ? 'not-allowed' : 'pointer', fontFamily: INTER,
                  opacity: pwSaving ? 0.7 : 1,
                }}>
                {pwSaving ? 'Updating...' : 'Change password'}
              </button>
            </form>
          </Card>

          {/* Account info */}
          <Card>
            <SectionLabel>Account Info</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 14, color: C.ink2 }}>Email</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{user.email}</span>
              </div>
              {user.createdAt && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 14, color: C.ink2 }}>Member since</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: 14, color: C.ink2 }}>Account type</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '3px 10px', borderRadius: 20 }}>Free</span>
              </div>
            </div>
          </Card>

        </div>
      </main>

      <Footer minimal unified columns={PRODUCT_COLUMNS} />
    </div>
  );
}
