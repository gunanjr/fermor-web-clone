"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, setToken } from "@/lib/api";

export default function CaLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiFetch<{ accessToken: string; caProfile: { firmName: string } }>(
        "/api/v1/ca/login",
        { method: "POST", body: JSON.stringify({ email, password }) }
      );
      setToken(data.accessToken);
      router.push("/ca/clients");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-green-700">fermor</span>
          <p className="text-sm text-gray-500 mt-1">CA Portal</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Sign in</h1>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="ca@yourfirm.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            New to Fermor?{" "}
            <Link href="/ca/signup" className="text-green-700 font-medium hover:underline">
              Create free account
            </Link>
          </p>

          <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/ca/try"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
            >
              Explore without an account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
