"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "@/lib/api";

const NAV = [
  { label: "Clients", href: "/ca/clients", icon: "👥" },
  { label: "Settings", href: "/ca/settings", icon: "⚙️" },
];

export default function CaDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/ca/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/ca/clients" className="text-lg font-bold text-green-700">
            fermor <span className="text-xs font-normal text-gray-400 ml-1">CA Portal</span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => { clearToken(); router.push("/ca/login"); }}
              className="ml-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
