import { notFound } from "next/navigation";
import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fermor.in";

interface DeductionItem { label: string; amount: number; taxSaving: number }
interface MissedDeduction { label: string; description: string; potentialSaving: number; maxAllowed: number; currentlyUsed: number }
interface RegimeResult {
  grossIncome: number; standardDeduction: number; hraExemption: number;
  totalDeductions: number; taxableIncome: number; basicTax: number;
  surcharge: number; cess: number; rebate87A: number; totalTax: number;
  effectiveRate: number; deductionBreakdown: DeductionItem[];
}
interface TaxResult {
  oldRegime: RegimeResult; newRegime: RegimeResult;
  recommendedRegime: "old" | "new"; savings: number;
  missedDeductions: MissedDeduction[];
}
interface PlanData {
  clientName: string; generatedAt: string; publicToken: string; taxResult: TaxResult;
}
interface AffiliateProduct {
  id: string; slug: string; name: string; category: string;
  description: string; partner: string;
}

async function getPlan(token: string): Promise<PlanData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/reports/public/${token}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch { return null; }
}

async function getProducts(): Promise<AffiliateProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/products`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch { return []; }
}

function fmt(n: number) { return "₹" + n.toLocaleString("en-IN"); }

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const plan = await getPlan(token);
  if (!plan) return { title: "Tax Plan" };
  return {
    title: "Tax Plan",
    description: `Financial tax planning report for FY 2025-26`,
    robots: "noindex",
  };
}

export default async function PlanPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [plan, products] = await Promise.all([getPlan(token), getProducts()]);
  if (!plan) notFound();

  const { taxResult } = plan;
  const recommended = taxResult.recommendedRegime === "new" ? taxResult.newRegime : taxResult.oldRegime;
  const other = taxResult.recommendedRegime === "new" ? taxResult.oldRegime : taxResult.newRegime;
  const FRONTEND_BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://fermor.in";

  const elssProducts = products.filter((p) => p.category === "elss");
  const npsProducts = products.filter((p) => p.category === "nps");
  const insuranceProducts = products.filter((p) => p.category === "insurance");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold text-green-700">fermor</span>
          <span className="text-xs text-gray-400">Tax Planning Report · FY 2025-26</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Your Tax Plan</h1>
          <p className="text-sm text-gray-500 mb-6">FY 2025-26 (Assessment Year 2026-27)</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-xs text-green-700 font-medium uppercase tracking-wide">Recommended</p>
              <p className="text-lg font-bold text-green-900 mt-1">
                {taxResult.recommendedRegime === "new" ? "New" : "Old"} Regime
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Tax payable</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{fmt(recommended.totalTax)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">vs other regime</p>
              <p className="text-lg font-bold text-green-700 mt-1">Save {fmt(taxResult.savings)}</p>
            </div>
          </div>
        </div>

        {/* Regime comparison */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Regime Comparison</h2>
          </div>
          <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Particulars</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Old Regime</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">New Regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Gross Income", taxResult.oldRegime.grossIncome, taxResult.newRegime.grossIncome],
                  ["Standard Deduction", -taxResult.oldRegime.standardDeduction, -taxResult.newRegime.standardDeduction],
                  ["HRA Exemption", -taxResult.oldRegime.hraExemption, 0],
                  ["Other Deductions", -(taxResult.oldRegime.totalDeductions - taxResult.oldRegime.standardDeduction - taxResult.oldRegime.hraExemption), 0],
                  ["Taxable Income", taxResult.oldRegime.taxableIncome, taxResult.newRegime.taxableIncome],
                  ["Income Tax", taxResult.oldRegime.basicTax, taxResult.newRegime.basicTax],
                  ["87A Rebate", -taxResult.oldRegime.rebate87A, -taxResult.newRegime.rebate87A],
                  ["Cess (4%)", taxResult.oldRegime.cess, taxResult.newRegime.cess],
                ].map(([label, oldVal, newVal], i) => (
                  <tr key={String(label)} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}>
                    <td className="px-6 py-2.5 text-sm text-gray-700">{label}</td>
                    <td className="text-right px-4 py-2.5 text-sm text-gray-600">{fmt(Math.abs(Number(oldVal)))}</td>
                    <td className="text-right px-6 py-2.5 text-sm text-gray-600">{fmt(Math.abs(Number(newVal)))}</td>
                  </tr>
                ))}
                <tr className="bg-green-50">
                  <td className="px-6 py-3 text-sm font-bold text-gray-900">Total Tax Payable</td>
                  <td className={`text-right px-4 py-3 text-sm font-bold ${taxResult.recommendedRegime === "old" ? "text-green-700" : "text-gray-700"}`}>
                    {fmt(taxResult.oldRegime.totalTax)} {taxResult.recommendedRegime === "old" ? "✓" : ""}
                  </td>
                  <td className={`text-right px-6 py-3 text-sm font-bold ${taxResult.recommendedRegime === "new" ? "text-green-700" : "text-gray-700"}`}>
                    {fmt(taxResult.newRegime.totalTax)} {taxResult.recommendedRegime === "new" ? "✓" : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action items from missed deductions */}
        {taxResult.missedDeductions.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Investment Actions Before March 31</h2>
            <div className="space-y-3">
              {taxResult.missedDeductions.map((m) => (
                <div key={m.label} className="border-l-4 border-green-500 bg-green-50 px-4 py-3 rounded-r-lg">
                  <p className="text-sm font-semibold text-gray-800">{m.label}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{m.description}</p>
                  <p className="text-sm font-bold text-green-700 mt-1">Potential tax saving: {fmt(m.potentialSaving)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affiliate action section — Fermor's own, clearly disclosed */}
        {(elssProducts.length > 0 || npsProducts.length > 0 || insuranceProducts.length > 0) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-800">Take Action</h2>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">Fermor Partner Links</span>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Fermor may earn a referral fee if you sign up through these links.
              This is not investment advice — please consult your CA before investing.
            </p>

            {elssProducts.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">ELSS Tax Saving Funds (80C)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {elssProducts.map((p) => (
                    <a key={p.slug} href={`${FRONTEND_BASE}/r/${token}/${p.slug}`} target="_blank" rel="noopener noreferrer"
                      className="border border-gray-200 rounded-lg p-3 hover:border-green-400 hover:bg-green-50/30 transition-colors group">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.description}</p>
                      <p className="text-xs text-green-600 font-medium mt-2">via {p.partner} →</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {npsProducts.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">NPS — Additional 80CCD deduction</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {npsProducts.map((p) => (
                    <a key={p.slug} href={`${FRONTEND_BASE}/r/${token}/${p.slug}`} target="_blank" rel="noopener noreferrer"
                      className="border border-gray-200 rounded-lg p-3 hover:border-green-400 hover:bg-green-50/30 transition-colors group">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.description}</p>
                      <p className="text-xs text-green-600 font-medium mt-2">via {p.partner} →</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {insuranceProducts.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Insurance — 80D deduction</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {insuranceProducts.map((p) => (
                    <a key={p.slug} href={`${FRONTEND_BASE}/r/${token}/${p.slug}`} target="_blank" rel="noopener noreferrer"
                      className="border border-gray-200 rounded-lg p-3 hover:border-green-400 hover:bg-green-50/30 transition-colors group">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.description}</p>
                      <p className="text-xs text-green-600 font-medium mt-2">via {p.partner} →</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 leading-relaxed pb-6">
          This report is for planning purposes only and does not constitute tax filing or
          SEBI/IRDAI regulated investment advice. Figures are based on FY 2025-26 tax rules.
          Verify with your CA before making any financial decision.
          <br />
          <span className="font-medium">Fermor · fermor.in</span>
        </p>
      </div>
    </div>
  );
}
