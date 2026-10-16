"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, setToken } from "@/lib/api";

export default function CaSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", firmName: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiFetch<{ accessToken: string }>(
        "/api/v1/ca/register",
        { method: "POST", body: JSON.stringify(form) }
      );
      setToken(data.accessToken);
      router.push("/ca/clients");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-green-700">fermor</span>
          <p className="text-sm text-gray-500 mt-1">CA Portal — Free forever to start</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Create your account</h1>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="CA Rajesh Sharma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firm name</label>
              <input
                required
                value={form.firmName}
                onChange={(e) => set("firmName", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Sharma & Associates"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="ca@yourfirm.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Min 8 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating account..." : "Create free account"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            No credit card needed. Free to use.
          </p>

          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{" "}
            <Link href="/ca/login" className="text-green-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
