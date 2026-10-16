"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { apiFetch, setToken } from "@/lib/api";

type Step = "client-info" | "tax-input" | "report-preview";

interface TaxInput {
  ageGroup: "below60" | "60to80" | "above80";
  grossSalary: number; basicSalary: number; hraReceived: number; rentPaid: number;
  isMetroCity: boolean; interestIncome: number; rentalIncome: number;
  digitalAssetIncome: number; otherIncome: number;
  homeLoanInterestSelfOccupied: number; homeLoanInterestLetOut: number;
  section80C: number; section80D: number; section80CCD: number; section80CCD2: number;
  section80EEA: number; section80TTA: number; section80G: number; section80E: number;
}

interface TaxResult {
  recommendedRegime: "old" | "new";
  savings: number;
  oldRegime: { totalTax: number };
  newRegime: { totalTax: number };
  missedDeductions: { label: string; description: string; potentialSaving: number }[];
}

interface ReportPreview {
  reportId: string; publicToken: string; planUrl: string;
  taxResult: TaxResult; pdfBase64: string;
}

const defaultTaxInput: TaxInput = {
  ageGroup: "below60", grossSalary: 0, basicSalary: 0, hraReceived: 0, rentPaid: 0,
  isMetroCity: false, interestIncome: 0, rentalIncome: 0, digitalAssetIncome: 0,
  otherIncome: 0, homeLoanInterestSelfOccupied: 0, homeLoanInterestLetOut: 0,
  section80C: 0, section80D: 0, section80CCD: 0, section80CCD2: 0,
  section80EEA: 0, section80TTA: 0, section80G: 0, section80E: 0,
};

export default function TryPage() {
  const [step, setStep] = useState<Step>("client-info");
  const [showGate, setShowGate] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Client data (guest)
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [taxInput, setTaxInput] = useState<TaxInput>(defaultTaxInput);

  // Signup gate fields
  const [caName, setCaName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [report, setReport] = useState<ReportPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function setTax<K extends keyof TaxInput>(k: K, v: TaxInput[K]) {
    setTaxInput((t) => ({ ...t, [k]: v }));
  }

  function numField(label: string, field: keyof TaxInput, max?: number) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
          <input type="number" min={0} max={max}
            value={(taxInput[field] as number) || ""}
            onChange={(e) => setTax(field, Number(e.target.value) as TaxInput[typeof field])}
            className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0" />
        </div>
      </div>
    );
  }

  async function handleSignupAndGenerate(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // 1. Register CA account
      const regData = await apiFetch<{ accessToken: string }>(
        "/api/v1/ca/register",
        { method: "POST", body: JSON.stringify({ name: caName, firmName, email, password }) }
      );
      setToken(regData.accessToken);

      // 2. Create the client they already filled details for
      const clientData = await apiFetch<{ id: string }>(
        "/api/v1/ca/clients",
        { method: "POST", body: JSON.stringify({ name: clientName, email: clientEmail || undefined }) },
        regData.accessToken
      );

      // 3. Generate the report with all their tax data
      const reportData = await apiFetch<ReportPreview>(
        "/api/v1/reports/generate",
        { method: "POST", body: JSON.stringify({ clientId: clientData.id, taxInput }) },
        regData.accessToken
      );

      setReport(reportData);
      setShowGate(false);
      setStep("report-preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function downloadPdf() {
    if (!report) return;
    const bytes = Uint8Array.from(atob(report.pdfBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fermor-tax-plan-${clientName.replace(/\s/g, "-")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-lg font-bold text-green-700">
          fermor <span className="text-xs font-normal text-gray-400 ml-1">CA Portal</span>
        </span>
        <div className="flex items-center gap-2">
          <Link href="/ca/login"
            className="px-4 py-1.5 rounded-lg text-sm font-medium text-green-700 border border-green-200 hover:bg-green-50 transition-colors">
            Sign in
          </Link>
          <Link href="/ca/signup"
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-green-700 hover:bg-green-800 transition-colors">
            Create account
          </Link>
        </div>
      </div>
    </header>
  );

  // Signup gate modal
  const SignupGate = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📄</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your tax analysis is ready</h2>
          <p className="text-sm text-gray-500 mt-1">
            Create your free account to generate the PDF and send it to {clientName || "your client"}.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        <form onSubmit={handleSignupAndGenerate} className="space-y-3">
          <input required value={caName} onChange={(e) => setCaName(e.target.value)}
            placeholder="Your name"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input required value={firmName} onChange={(e) => setFirmName(e.target.value)}
            placeholder="Firm name (e.g. Sharma & Associates)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 characters)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />

          <button type="submit" disabled={loading}
            className="w-full bg-green-700 text-white rounded-lg py-3 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors mt-2">
            {loading ? "Creating account & generating report..." : "Create account & generate report →"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/ca/login" className="text-green-700 hover:underline">Sign in</Link>
        </p>
        <button onClick={() => { setShowGate(false); setError(""); }}
          className="mt-3 w-full text-xs text-gray-400 hover:text-gray-600">
          ← Back to editing
        </button>
      </div>
    </div>
  );

  if (step === "client-info") {
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="max-w-lg">
            <div className="mb-2">
              <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Free preview</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Add a client</h1>
            <p className="text-sm text-gray-500 mt-1">Step 1 of 3 — Client details</p>

            <form onSubmit={(e) => { e.preventDefault(); setStep("tax-input"); }}
              className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client name *</label>
                <input required value={clientName} onChange={(e) => setClientName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client email (for reminders)</label>
                <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="rahul@example.com" />
                <p className="text-xs text-gray-400 mt-1">We'll send tax deadline reminders on your behalf (optional)</p>
              </div>
              <button type="submit"
                className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 transition-colors">
                Continue →
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  if (step === "tax-input") {
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900">Tax details — {clientName}</h1>
            <p className="text-sm text-gray-500 mt-1">Step 2 of 3 — Income & deductions</p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 mb-4 flex items-center gap-3">
              <span className="text-amber-600 text-lg">💡</span>
              <p className="text-sm text-amber-800">
                Form 16 auto-fill is available after creating your account. Fill details manually for now.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowGate(true); }} className="space-y-6 mt-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Basic</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age group</label>
                    <select value={taxInput.ageGroup}
                      onChange={(e) => setTax("ageGroup", e.target.value as TaxInput["ageGroup"])}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="below60">Below 60</option>
                      <option value="60to80">60–80 (Senior)</option>
                      <option value="above80">Above 80 (Super Senior)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={taxInput.isMetroCity}
                        onChange={(e) => setTax("isMetroCity", e.target.checked)}
                        className="w-4 h-4 accent-green-600 rounded" />
                      Metro city (for HRA)
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Income</h2>
                <div className="grid grid-cols-2 gap-4">
                  {numField("Gross Salary *", "grossSalary")}
                  {numField("Basic Salary *", "basicSalary")}
                  {numField("HRA received", "hraReceived")}
                  {numField("Rent paid (annual)", "rentPaid")}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Deductions (Old Regime)</h2>
                <div className="grid grid-cols-2 gap-4">
                  {numField("80C (PPF/ELSS/LIC etc.)", "section80C", 150000)}
                  {numField("80D (Medical Insurance)", "section80D", 50000)}
                  {numField("Home Loan Interest (self-occupied)", "homeLoanInterestSelfOccupied")}
                  {numField("80CCD — NPS (employee)", "section80CCD", 50000)}
                  {numField("80CCD(2) — NPS (employer)", "section80CCD2")}
                </div>
              </div>

              <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-green-700 font-medium flex items-center gap-1">
                {showAdvanced ? "▲ Hide advanced fields" : "▼ Show advanced fields (rental income, 80G, etc.)"}
              </button>

              {showAdvanced && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Advanced</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {numField("Interest income", "interestIncome")}
                    {numField("Rental income", "rentalIncome")}
                    {numField("Digital asset income", "digitalAssetIncome")}
                    {numField("Other income", "otherIncome")}
                    {numField("Home Loan Interest (let-out property)", "homeLoanInterestLetOut")}
                    {numField("80EEA (Affordable Housing)", "section80EEA", 150000)}
                    {numField("80TTA (Savings Account Interest)", "section80TTA", 10000)}
                    {numField("80G (Donations)", "section80G")}
                    {numField("80E (Education Loan Interest)", "section80E")}
                  </div>
                </div>
              )}

              <button type="submit" disabled={!taxInput.grossSalary}
                className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors">
                Generate report →
              </button>
            </form>
          </div>
        </main>

        {showGate && <SignupGate />}
      </>
    );
  }

  if (step === "report-preview" && report) {
    const { taxResult } = report;
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900">Report ready — {clientName}</h1>
            <p className="text-sm text-gray-500 mt-1">Your account is set up. Manage all clients from your dashboard.</p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6 mb-6">
              <p className="text-sm font-semibold text-green-800 mb-3">Tax summary</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-green-700">Recommended regime</p>
                  <p className="text-lg font-bold text-green-900 mt-0.5">
                    {taxResult.recommendedRegime === "new" ? "New" : "Old"} Regime
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-700">Tax payable</p>
                  <p className="text-lg font-bold text-green-900 mt-0.5">
                    ₹{(taxResult.recommendedRegime === "new" ? taxResult.newRegime.totalTax : taxResult.oldRegime.totalTax).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-700">Savings vs other regime</p>
                  <p className="text-lg font-bold text-green-900 mt-0.5">₹{taxResult.savings.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <p className="text-sm font-semibold text-gray-800 mb-1">Send to {clientName}</p>
              <button onClick={downloadPdf}
                className="w-full flex items-center justify-center gap-2 bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 transition-colors">
                ↓ Download PDF
              </button>
              <button onClick={() => navigator.clipboard.writeText(report.planUrl)}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                Copy shareable link
              </button>
            </div>

            <Link href="/ca/clients"
              className="mt-4 inline-block text-sm text-green-700 font-medium hover:underline">
              Go to dashboard → manage all clients
            </Link>
          </div>
        </main>
      </>
    );
  }

  return null;
}
