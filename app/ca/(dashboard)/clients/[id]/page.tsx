"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, getToken } from "@/lib/api";

interface Report {
  id: string; generatedAt: string; publicToken: string; pdfUrl: string | null;
}
interface Client {
  id: string; name: string; email: string | null; status: string;
  updatedAt: string; intakeToken: string | null;
  reports: Report[];
}

const STATUS_COLOR: Record<string, string> = {
  PENDING_DATA:     "bg-yellow-100 text-yellow-800",
  DATA_RECEIVED:    "bg-blue-100 text-blue-800",
  REPORT_GENERATED: "bg-green-100 text-green-700",
  COMPLETED:        "bg-gray-100 text-gray-600",
};
const STATUS_LABEL: Record<string, string> = {
  PENDING_DATA: "Pending data", DATA_RECEIVED: "Data received",
  REPORT_GENERATED: "Report ready", COMPLETED: "Completed",
};

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [intakeLoading, setIntakeLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState<string>("");
  const [intakeUrl, setIntakeUrl] = useState<string>("");

  useEffect(() => {
    const token = getToken();
    if (!token) { router.replace("/ca/login"); return; }
    apiFetch<Client>(`/api/v1/ca/clients/${id}`, {}, token)
      .then(setClient)
      .catch(() => router.replace("/ca/clients"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function generateIntakeLink() {
    setIntakeLoading(true);
    try {
      const token = getToken()!;
      const data = await apiFetch<{ token: string; url: string }>(
        `/api/v1/ca/clients/${id}/intake-link`,
        { method: "POST", body: JSON.stringify({}) },
        token
      );
      setIntakeUrl(data.url);
      try { await navigator.clipboard.writeText(data.url); setCopied("intake"); setTimeout(() => setCopied(""), 2000); }
      catch { /* clipboard blocked — URL shown in UI below */ }
    } catch (err) {
      alert(`Could not generate intake link: ${err instanceof Error ? err.message : "unknown error"}`);
    } finally {
      setIntakeLoading(false);
    }
  }

  async function copyPlanLink(publicToken: string) {
    const url = `https://fermor.in/plan/${publicToken}`;
    await navigator.clipboard.writeText(url);
    setCopied(publicToken);
    setTimeout(() => setCopied(""), 2000);
  }

  async function deleteClient() {
    if (!confirm(`Delete ${client?.name}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const token = getToken()!;
      await apiFetch(`/api/v1/ca/clients/${id}`, { method: "DELETE" }, token);
      router.replace("/ca/clients");
    } catch {
      alert("Failed to delete client.");
      setDeleting(false);
    }
  }

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!client) return null;

  const st = STATUS_LABEL[client.status] ?? client.status;
  const stColor = STATUS_COLOR[client.status] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/ca/clients" className="text-sm text-gray-400 hover:text-gray-600 mb-2 inline-block">
          ← Clients
        </Link>
        <div className="flex items-center gap-3 mt-1">
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${stColor}`}>{st}</span>
        </div>
        {client.email && <p className="text-sm text-gray-400 mt-0.5">{client.email}</p>}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link href={`/ca/clients/new?clientId=${client.id}&clientName=${encodeURIComponent(client.name)}`}
          className="bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold text-center hover:bg-green-800 transition-colors">
          + Generate report
        </Link>

        <button onClick={generateIntakeLink} disabled={intakeLoading}
          className="border border-gray-200 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">
          {intakeLoading ? "Generating..." : copied === "intake" ? "Copied!" : "Share intake form"}
        </button>
      </div>

      {/* Intake link hint */}
      {intakeUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6 text-sm text-blue-800">
          <p className="font-medium mb-1">
            {copied === "intake" ? "Link copied!" : "Intake form link generated"}
          </p>
          <p className="text-xs text-blue-600 break-all select-all">{intakeUrl}</p>
          <p className="text-xs text-blue-500 mt-1">Copy and paste into WhatsApp or email to {client.name}</p>
        </div>
      )}

      {/* Report history */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Reports ({client.reports.length})</h2>
        </div>

        {client.reports.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-gray-400">No reports yet</p>
            <Link href={`/ca/clients/new?clientId=${client.id}&clientName=${encodeURIComponent(client.name)}`}
              className="text-green-700 text-sm font-medium hover:underline mt-2 inline-block">
              Generate first report →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {client.reports.map((r, i) => (
              <div key={r.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Report {client.reports.length - i}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(r.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => copyPlanLink(r.publicToken)}
                    className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    {copied === r.publicToken ? "Copied!" : "Copy link"}
                  </button>
                  <a href={`https://fermor.in/plan/${r.publicToken}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-green-700 font-medium hover:underline">
                    Preview
                  </a>
                  {r.pdfUrl && (
                    <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors">
                      PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Danger zone */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <button onClick={deleteClient} disabled={deleting}
          className="text-sm text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors">
          {deleting ? "Deleting..." : "Delete this client"}
        </button>
      </div>
    </div>
  );
}
