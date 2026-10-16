"use client";
import { useEffect, useState, FormEvent, useRef } from "react";
import { apiFetch, getToken } from "@/lib/api";

interface CaProfile {
  name: string; email: string; firmName: string; phone: string | null;
  logoUrl: string | null; credits: number; plan: string; clientCount: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fermor.in";

export default function SettingsPage() {
  const [profile, setProfile] = useState<CaProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [error, setError] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    apiFetch<CaProfile>("/api/v1/ca/me", {}, token)
      .then((data) => {
        setProfile(data);
        setName(data.name);
        setFirmName(data.firmName);
        setPhone(data.phone ?? "");
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError(""); setSaving(true);
    try {
      const token = getToken()!;
      await apiFetch("/api/v1/ca/me", {
        method: "PATCH",
        body: JSON.stringify({ name: name || undefined, firmName: firmName || undefined, phone: phone || undefined }),
      }, token);
      setProfile((p) => p ? { ...p, name, firmName, phone } : p);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(file: File) {
    setUploadingLogo(true);
    setError("");
    try {
      const token = getToken()!;
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch(`${API_BASE}/api/v1/ca/me/logo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.data?.logoUrl) {
        setProfile((p) => p ? { ...p, logoUrl: json.data.logoUrl } : p);
      } else {
        setError(json.error?.message ?? "Logo upload failed");
      }
    } catch {
      setError("Logo upload failed — please try again");
    } finally {
      setUploadingLogo(false);
    }
  }

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Firm branding and account details</p>
      </div>

      {error && <p className="text-sm text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}

      {/* Firm logo */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Firm logo</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile?.logoUrl
              ? <img src={profile.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              : <span className="text-2xl text-gray-300">🏢</span>}
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium mb-1">
              {profile?.logoUrl ? "Change logo" : "Upload your firm logo"}
            </p>
            <p className="text-xs text-gray-400 mb-2">PNG or JPG, max 2 MB. Appears on every PDF report.</p>
            <button onClick={() => logoRef.current?.click()} disabled={uploadingLogo}
              className="text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
              {uploadingLogo ? "Uploading..." : "Choose file"}
            </button>
            <input ref={logoRef} type="file" accept="image/png,image/jpeg" className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) handleLogoUpload(e.target.files[0]); }} />
          </div>
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 mb-4 space-y-4">
        <h2 className="text-sm font-semibold text-gray-800">Profile</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="CA Ramesh Iyer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Firm name</label>
          <input value={firmName} onChange={(e) => setFirmName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Iyer & Associates" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input value={profile?.email ?? ""} disabled
            className="w-full border border-gray-100 bg-gray-50 text-gray-400 rounded-lg px-3 py-2 text-sm cursor-not-allowed" />
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
        </div>

        <button type="submit" disabled={saving}
          className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors">
          {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
        </button>
      </form>

      {/* Credits + plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Plan & credits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Current plan</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">
              {profile?.plan === "FREE" ? "Free" : "Pro"}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-700">Fermor credits</p>
            <p className="text-sm font-bold text-green-900 mt-0.5">{profile?.credits ?? 0}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
          You earn 1 credit per report generated and 2 credits when a client clicks a Fermor partner link.
          Credits unlock Pro features when Fermor launches subscription plans in 2025.
        </p>
      </div>
    </div>
  );
}
