"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch, getToken } from "@/lib/api";

interface Client {
  id: string;
  name: string;
  email: string | null;
  status: string;
  updatedAt: string;
  reports: { generatedAt: string; publicToken: string }[];
  _count: { reports: number };
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  PENDING_DATA:     { label: "Pending data",    color: "bg-yellow-100 text-yellow-800" },
  DATA_RECEIVED:    { label: "Data received",   color: "bg-blue-100 text-blue-800" },
  REPORT_GENERATED: { label: "Report ready",    color: "bg-green-100 text-green-700" },
  COMPLETED:        { label: "Completed",        color: "bg-gray-100 text-gray-600" },
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, [search]);

  async function loadClients() {
    setLoading(true);
    try {
      const token = getToken()!;
      const q = search ? `?search=${encodeURIComponent(search)}` : "";
      const data = await apiFetch<Client[]>(`/api/v1/ca/clients${q}`, {}, token);
      setClients(data);
    } catch {
      // handled by auth layout redirect
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/ca/clients/new"
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
        >
          + Add client
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-sm mb-4">No clients yet</p>
          <Link href="/ca/clients/new" className="text-green-700 text-sm font-medium hover:underline">
            Add your first client →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reports</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last updated</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const st = STATUS_LABEL[client.status] ?? { label: client.status, color: "bg-gray-100 text-gray-600" };
                return (
                  <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 text-sm">{client.name}</p>
                      {client.email && <p className="text-xs text-gray-400 mt-0.5">{client.email}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{client._count.reports}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {new Date(client.updatedAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/ca/clients/${client.id}`} className="text-green-700 text-sm font-medium hover:underline">
                        Open
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
