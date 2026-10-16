"use client";
import { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch, getToken } from "@/lib/api";

type Step = "client-info" | "tax-input" | "report-preview" | "done";

interface TaxInput {
  ageGroup: "below60" | "60to80" | "above80";
  grossSalary: number; basicSalary: number; hraReceived: number; rentPaid: number;
  isMetroCity: boolean; professionalTax: number;
  interestIncome: number; dividendIncome: number; rentalIncome: number;
  digitalAssetIncome: number; otherIncome: number;
  tdsDeducted: number;
  homeLoanInterestSelfOccupied: number; homeLoanInterestLetOut: number;
  section80C: number; section80D: number; section80CCD: number; section80CCD2: number;
  section80DD: number; section80EEA: number;
  section80TTA: number; section80TTB: number; section80GG: number;
  section80G: number; section80E: number;
}

interface RegimeResult { totalTax: number; netPayable: number }
interface TaxResult {
  recommendedRegime: "old" | "new";
  savings: number;
  oldRegime: RegimeResult;
  newRegime: RegimeResult;
  missedDeductions: { label: string; description: string; potentialSaving: number }[];
}

interface ReportPreview {
  reportId: string;
  publicToken: string;
  planUrl: string;
  taxResult: TaxResult;
  pdfBase64: string;
}

const defaultTaxInput: TaxInput = {
  ageGroup: "below60", grossSalary: 0, basicSalary: 0, hraReceived: 0, rentPaid: 0,
  isMetroCity: false, professionalTax: 0,
  interestIncome: 0, dividendIncome: 0, rentalIncome: 0, digitalAssetIncome: 0,
  otherIncome: 0, tdsDeducted: 0,
  homeLoanInterestSelfOccupied: 0, homeLoanInterestLetOut: 0,
  section80C: 0, section80D: 0, section80CCD: 0, section80CCD2: 0,
  section80DD: 0, section80EEA: 0,
  section80TTA: 0, section80TTB: 0, section80GG: 0,
  section80G: 0, section80E: 0,
};

const FIELD_DISPLAY: Partial<Record<keyof TaxInput, string>> = {
  grossSalary: "Gross Salary",
  basicSalary: "Basic Salary",
  hraReceived: "HRA Received",
  professionalTax: "Professional Tax (Sec. 16iii)",
  tdsDeducted: "TDS Deducted",
  section80C: "80C Investments",
  section80D: "80D Health Insurance",
  section80CCD: "80CCD(1B) NPS",
  section80CCD2: "80CCD(2) Employer NPS",
  section80TTA: "80TTA Savings Interest",
  section80TTB: "80TTB Senior Interest",
  section80G: "80G Donations",
  section80E: "80E Education Loan",
  section80EEA: "80EEA Home Loan",
  section80DD: "80DD Disability",
  section80GG: "80GG House Rent",
  interestIncome: "Interest Income",
  rentalIncome: "Rental Income",
  digitalAssetIncome: "Digital Asset / Crypto",
  otherIncome: "Other Income",
};

export default function NewClientPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState<Step>("client-info");
  const [clientId, setClientId] = useState(() => params.get("clientId") ?? "");
  const [clientName, setClientName] = useState(() => params.get("clientName") ?? "");
  const [clientEmail, setClientEmail] = useState("");
  const [taxInput, setTaxInput] = useState<TaxInput>(defaultTaxInput);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [report, setReport] = useState<ReportPreview | null>(null);
  const [editableLines, setEditableLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Form 16 upload state
  const [form16Loading, setForm16Loading] = useState(false);
  const [form16Status, setForm16Status] = useState<"idle" | "success" | "partial" | "error">("idle");
  const [form16Message, setForm16Message] = useState("");
  const form16Ref = useRef<HTMLInputElement>(null);
  const [dpdpConsent, setDpdpConsent] = useState(false);
  // Holds parsed values for CA review before applying to form
  const [parsedPreview, setParsedPreview] = useState<{ filled: Partial<TaxInput>; count: number } | null>(null);

  useEffect(() => {
    const urlClientId = params.get("clientId");
    if (!urlClientId) return;
    const draft = localStorage.getItem(`fermor-ca-draft-${urlClientId}`);
    if (draft) {
      try { setTaxInput(JSON.parse(draft)); } catch { /* ignore corrupt draft */ }
    }
    setStep("tax-input");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!clientId) return;
    localStorage.setItem(`fermor-ca-draft-${clientId}`, JSON.stringify(taxInput));
  }, [taxInput, clientId]);

  function setTax<K extends keyof TaxInput>(k: K, v: TaxInput[K]) {
    setTaxInput((t) => ({ ...t, [k]: v }));
  }

  function numField(label: string, field: keyof TaxInput, max?: number, hint?: string) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">Rs.</span>
          <input
            type="number" min={0} max={max}
            value={(taxInput[field] as number) || ""}
            onChange={(e) => setTax(field, Number(e.target.value) as TaxInput[typeof field])}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0"
          />
        </div>
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      </div>
    );
  }

  async function uploadForm16(file: File) {
    setForm16Loading(true);
    setForm16Status("idle");
    setForm16Message("");
    try {
      const token = getToken()!;
      const fd = new FormData();
      fd.append("file", file);

      const data = await apiFetch<{
        grossSalary?: number; basicSalary?: number; hraReceived?: number;
        professionalTax?: number; tdsDeducted?: number;
        section80C?: number; section80D?: number; section80CCD?: number;
        section80CCD2?: number; section80TTA?: number; section80TTB?: number;
        section80G?: number; section80E?: number; section80EEA?: number;
        section80DD?: number; taxableIncome?: number;
        _parseMethod?: string;
      }>(
        "/api/v1/reports/parse-form16",
        { method: "POST", body: fd },
        token,
        true // multipart
      );

      if (data._parseMethod === "scanned-pdf") {
        setForm16Status("error");
        setForm16Message("Scanned PDF. Text cannot be extracted. Please fill in manually.");
        return;
      }
      if (data._parseMethod?.startsWith("groq-error")) {
        setForm16Status("error");
        setForm16Message("Could not read this Form 16. Please fill in manually.");
        return;
      }

      const filled: Partial<TaxInput> = {};
      if (data.grossSalary) filled.grossSalary = data.grossSalary;
      if (data.basicSalary) filled.basicSalary = data.basicSalary;
      if (data.hraReceived) filled.hraReceived = data.hraReceived;
      if (data.professionalTax) filled.professionalTax = data.professionalTax;
      if (data.tdsDeducted) filled.tdsDeducted = data.tdsDeducted;
      if (data.section80C) filled.section80C = data.section80C;
      if (data.section80D) filled.section80D = data.section80D;
      if (data.section80CCD) filled.section80CCD = data.section80CCD;
      if (data.section80CCD2) filled.section80CCD2 = data.section80CCD2;
      if (data.section80TTA) filled.section80TTA = data.section80TTA;
      if (data.section80TTB) filled.section80TTB = data.section80TTB;
      if (data.section80G) filled.section80G = data.section80G;
      if (data.section80E) filled.section80E = data.section80E;
      if (data.section80EEA) filled.section80EEA = data.section80EEA;
      if (data.section80DD) filled.section80DD = data.section80DD;

      const filledCount = Object.keys(filled).length;
      // Do NOT auto-fill — present for CA review first (human-in-the-loop)
      setParsedPreview({ filled, count: filledCount });

      if (filledCount >= 3) {
        setForm16Status("success");
        setForm16Message(`${filledCount} fields extracted. Review the values below, then click Apply.`);
      } else {
        setForm16Status("partial");
        setForm16Message(`Only ${filledCount} field${filledCount === 1 ? "" : "s"} extracted. Review and fill the rest manually.`);
      }
    } catch {
      setForm16Status("error");
      setForm16Message("Could not read this Form 16. Please fill in manually.");
    } finally {
      setForm16Loading(false);
    }
  }

  async function handleCreateClient(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = getToken()!;
      const data = await apiFetch<{ id: string; name: string }>(
        "/api/v1/ca/clients",
        { method: "POST", body: JSON.stringify({ name: clientName, email: clientEmail || undefined }) },
        token
      );
      setClientId(data.id);
      setStep("tax-input");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create client");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateReport(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = getToken()!;
      const data = await apiFetch<ReportPreview>(
        "/api/v1/reports/generate",
        { method: "POST", body: JSON.stringify({ clientId, taxInput }) },
        token
      );
      setReport(data);
      setEditableLines(data.taxResult.missedDeductions.map((m) => m.description));
      localStorage.removeItem(`fermor-ca-draft-${clientId}`);
      setStep("report-preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report");
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

  async function copyPlanLink() {
    if (!report) return;
    await navigator.clipboard.writeText(report.planUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const isSenior = taxInput.ageGroup !== "below60";

  if (step === "client-info") {
    return (
      <div className="max-w-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add client</h1>
          <p className="text-sm text-gray-500 mt-1">Step 1 of 3: Client details</p>
        </div>
        {error && <p className="text-sm text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}
        <form onSubmit={handleCreateClient} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
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
            <p className="text-xs text-gray-400 mt-1">We send tax deadline reminders on your behalf (optional)</p>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors">
            {loading ? "Creating..." : "Continue →"}
          </button>
        </form>
      </div>
    );
  }

  if (step === "tax-input") {
    return (
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tax details: {clientName}</h1>
          <p className="text-sm text-gray-500 mt-1">Step 2 of 3: Income and deductions</p>
        </div>

        {/* Form 16 upload */}
        <div className={`border rounded-xl p-4 mb-6 ${
          form16Status === "success" ? "bg-green-50 border-green-200" :
          form16Status === "partial" ? "bg-amber-50 border-amber-200" :
          form16Status === "error"   ? "bg-red-50 border-red-200" :
                                       "bg-green-50 border-green-200"
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {form16Status === "success" ? (
                <>
                  <p className="text-sm font-semibold text-green-800">Form 16 auto-filled</p>
                  <p className="text-xs text-green-700 mt-0.5">{form16Message}</p>
                </>
              ) : form16Status === "partial" ? (
                <>
                  <p className="text-sm font-semibold text-amber-800">Partially auto-filled</p>
                  <p className="text-xs text-amber-700 mt-0.5">{form16Message}</p>
                </>
              ) : form16Status === "error" ? (
                <>
                  <p className="text-sm font-semibold text-red-700">Could not read Form 16</p>
                  <p className="text-xs text-red-600 mt-0.5">{form16Message}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-green-800">Upload Form 16 to auto-fill</p>
                  <p className="text-xs text-green-700 mt-0.5">Tax figures are anonymised on our server before processing. No PAN or names leave your device.</p>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => form16Ref.current?.click()}
              disabled={form16Loading || (!dpdpConsent && form16Status === "idle")}
              className={`shrink-0 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                form16Status === "error"
                  ? "bg-white border border-red-300 text-red-600 hover:bg-red-50"
                  : form16Status === "partial"
                  ? "bg-white border border-amber-300 text-amber-700 hover:bg-amber-50"
                  : "bg-white border border-green-300 text-green-700 hover:bg-green-50"
              }`}
            >
              {form16Loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin inline-block" />
                  Reading...
                </span>
              ) : (form16Status === "success" || form16Status === "partial" || form16Status === "error") ? "Upload different PDF" : "Upload PDF"}
            </button>
          </div>

          {/* Consent checkbox — shown only in idle state */}
          {form16Status === "idle" && (
            <label className="flex items-start gap-2 mt-3 pt-3 border-t border-green-100 cursor-pointer">
              <input
                type="checkbox"
                checked={dpdpConsent}
                onChange={(e) => setDpdpConsent(e.target.checked)}
                className="mt-0.5 accent-green-700"
              />
              <span className="text-xs text-green-700 leading-snug">
                I confirm I have this client&apos;s explicit authorization to upload and process their tax documents (DPDP Act 2023).
              </span>
            </label>
          )}

          {/* Remove PDF — shown only after a parse attempt */}
          {(form16Status === "success" || form16Status === "partial") && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-green-100">
              <button
                type="button"
                onClick={() => {
                  if (form16Ref.current) form16Ref.current.value = "";
                  setForm16Status("idle");
                  setForm16Message("");
                  setParsedPreview(null);
                }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Remove PDF reference
              </button>
            </div>
          )}

          <input ref={form16Ref} type="file" accept=".pdf" className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) uploadForm16(e.target.files[0]); }} />
        </div>

        {/* Parsed values review panel — CA must confirm before values are applied */}
        {parsedPreview && (
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-amber-800 mb-1">Review extracted values</p>
            <p className="text-xs text-amber-700 mb-3">
              Verify these values match the Form 16 before applying. You are responsible for accuracy as the filing professional.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
              {(Object.entries(parsedPreview.filled) as [keyof TaxInput, number][]).map(([field, value]) => (
                <div key={field} className="flex justify-between text-xs">
                  <span className="text-amber-700">{FIELD_DISPLAY[field] ?? field}</span>
                  <span className="font-semibold text-amber-900">Rs. {value.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setTaxInput((t) => ({ ...t, ...parsedPreview.filled }));
                  setParsedPreview(null);
                }}
                className="text-sm px-4 py-1.5 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
              >
                Apply these values
              </button>
              <button
                type="button"
                onClick={() => setParsedPreview(null)}
                className="text-xs text-amber-600 hover:text-amber-800 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}

        <form onSubmit={handleGenerateReport} className="space-y-6">
          {/* Basic */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Basic</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age group</label>
                <select value={taxInput.ageGroup} onChange={(e) => setTax("ageGroup", e.target.value as TaxInput["ageGroup"])}
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
                  Metro city (HRA)
                  <span className="text-xs text-gray-400">(Delhi/Mumbai/Chennai/Kolkata)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Salary Income */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Salary Income</h2>
            <div className="grid grid-cols-2 gap-4">
              {numField("Gross Salary *", "grossSalary")}
              {numField("Basic Salary *", "basicSalary")}
              {numField("HRA received", "hraReceived")}
              {numField("Rent paid (annual)", "rentPaid")}
              {numField("Professional Tax paid", "professionalTax", 2500, "Max Rs. 2,500/year (shown on Form 16 Part B)")}
              {numField("TDS deducted by employer", "tdsDeducted", undefined, "From Form 16 Part A, for refund/due calculation")}
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Deductions (Old Regime)</h2>
            <div className="grid grid-cols-2 gap-4">
              {numField("80C (PPF / ELSS / LIC / EPF etc.)", "section80C", 150000, "Max Rs. 1,50,000")}
              {numField("80D (Medical Insurance)", "section80D", 100000, isSenior ? "Self Rs. 50K + parents Rs. 50K" : "Self Rs. 25K + parents up to Rs. 50K")}
              {numField("Home Loan Interest (self-occupied)", "homeLoanInterestSelfOccupied", 200000, "Max Rs. 2,00,000")}
              {numField("80CCD(1B): NPS (employee)", "section80CCD", 50000, "Extra Rs. 50K over 80C limit")}
              {numField("80CCD(2): NPS (employer)", "section80CCD2", undefined, "Allowed in new regime too")}
            </div>
          </div>

          {/* Advanced toggle */}
          <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-green-700 font-medium flex items-center gap-1">
            {showAdvanced ? "▲ Hide advanced fields" : "▼ More deductions and income sources"}
          </button>

          {showAdvanced && (
            <>
              {/* Other income */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Other Income</h2>
                <div className="grid grid-cols-2 gap-4">
                  {numField("Interest income", "interestIncome", undefined, "Savings bank + FD + post office")}
                  {numField("Dividend income", "dividendIncome")}
                  {numField("Rental income", "rentalIncome")}
                  {numField("Digital asset / Crypto income", "digitalAssetIncome", undefined, "Taxed at 30% flat (Sec. 115BBH)")}
                  {numField("Other income", "otherIncome")}
                  {numField("Home Loan Interest (let-out property)", "homeLoanInterestLetOut")}
                </div>
              </div>

              {/* More deductions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">More Deductions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {numField("80EEA (Affordable Housing Loan)", "section80EEA", 150000, "Max Rs. 1,50,000")}
                  {isSenior
                    ? numField("80TTB (Interest: Senior Citizens)", "section80TTB", 50000, "All interest income, max Rs. 50,000")
                    : numField("80TTA (Savings Account Interest)", "section80TTA", 10000, "Max Rs. 10,000")}
                  {numField("80DD (Disabled Dependent)", "section80DD", 125000, "Rs. 75,000 (normal) or Rs. 1,25,000 (severe)")}
                  {numField("80GG (Rent paid, no HRA from employer)", "section80GG", 60000, "Max Rs. 60,000/year")}
                  {numField("80G (Donations)", "section80G")}
                  {numField("80E (Education Loan Interest)", "section80E")}
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={loading || !taxInput.grossSalary}
              className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors">
              {loading ? "Generating report..." : "Generate report →"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTaxInput(defaultTaxInput);
                if (form16Ref.current) form16Ref.current.value = "";
                setForm16Status("idle");
                setForm16Message("");
              }}
              className="w-full border border-red-200 text-red-500 rounded-lg py-2 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              Clear all fields
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "report-preview" && report) {
    const { taxResult } = report;
    const recommended = taxResult.recommendedRegime === "new" ? taxResult.newRegime : taxResult.oldRegime;
    const netPayable = recommended.netPayable;

    return (
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Review before sending: {clientName}</h1>
          <p className="text-sm text-gray-500 mt-1">Step 3 of 3: Review and edit report before downloading</p>
        </div>

        {/* Summary */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <p className="text-sm font-semibold text-green-800 mb-3">Tax summary</p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-green-700">Recommended</p>
              <p className="text-base font-bold text-green-900 mt-0.5">
                {taxResult.recommendedRegime === "new" ? "New" : "Old"} Regime
              </p>
            </div>
            <div>
              <p className="text-xs text-green-700">Tax liability</p>
              <p className="text-base font-bold text-green-900 mt-0.5">
                Rs. {recommended.totalTax.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-700">
                {netPayable >= 0 ? "Amount due" : "Refund"}
              </p>
              <p className={`text-base font-bold mt-0.5 ${netPayable < 0 ? "text-blue-700" : "text-green-900"}`}>
                Rs. {Math.abs(netPayable).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-700">Savings vs other regime</p>
              <p className="text-base font-bold text-green-900 mt-0.5">Rs. {taxResult.savings.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        {/* Editable suggestion lines */}
        {editableLines.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-800">Investment action lines in the report</p>
              <p className="text-xs text-gray-400">Edit or remove before sending</p>
            </div>
            <div className="space-y-3">
              {editableLines.map((line, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <textarea
                    value={line}
                    onChange={(e) => setEditableLines((lines) => lines.map((l, j) => j === i ? e.target.value : l))}
                    rows={2}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                  <button onClick={() => setEditableLines((lines) => lines.filter((_, j) => j !== i))}
                    className="text-red-400 hover:text-red-600 text-lg mt-1 flex-shrink-0">x</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <p className="text-sm font-semibold text-gray-800 mb-4">Send to {clientName}</p>

          <button onClick={downloadPdf}
            className="w-full flex items-center justify-center gap-2 bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 transition-colors">
            Download PDF
          </button>

          <button onClick={copyPlanLink}
            className={`w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium transition-colors ${copied ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
            {copied ? "Link copied!" : "Copy shareable link (fermor.in/plan/...)"}
          </button>

          <p className="text-xs text-gray-400 text-center pt-1">
            The shareable link opens an interactive version on Fermor's website. The PDF has no external links.
          </p>
        </div>

        <button onClick={() => router.push("/ca/clients")}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Back to all clients
        </button>
      </div>
    );
  }

  return null;
}
