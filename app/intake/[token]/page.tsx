"use client";
import { useEffect, useState, FormEvent } from "react";
import { useParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fermor.in";

interface IntakeInfo {
  clientName: string; caName: string; firmName: string; hasExistingData: boolean;
}

export default function IntakePage() {
  const { token } = useParams<{ token: string }>();
  const [info, setInfo] = useState<IntakeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    ageGroup: "below60", grossSalary: "", basicSalary: "",
    hraReceived: "", rentPaid: "", isMetroCity: false,
    section80C: "", section80D: "", section80CCD: "",
    homeLoanInterestSelfOccupied: "",
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/ca/clients/intake/${token}`)
      .then((r) => r.json())
      .then((j) => { if (j.success) setInfo(j.data); else setError("Invalid or expired link"); })
      .catch(() => setError("Could not load intake form"))
      .finally(() => setLoading(false));
  }, [token]);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        ageGroup: form.ageGroup,
        grossSalary: Number(form.grossSalary) || 0,
        basicSalary: Number(form.basicSalary) || 0,
        hraReceived: Number(form.hraReceived) || 0,
        rentPaid: Number(form.rentPaid) || 0,
        isMetroCity: form.isMetroCity,
        section80C: Number(form.section80C) || 0,
        section80D: Number(form.section80D) || 0,
        section80CCD: Number(form.section80CCD) || 0,
        homeLoanInterestSelfOccupied: Number(form.homeLoanInterestSelfOccupied) || 0,
        interestIncome: 0, rentalIncome: 0, digitalAssetIncome: 0,
        otherIncome: 0, homeLoanInterestLetOut: 0,
        section80CCD2: 0, section80EEA: 0, section80TTA: 0, section80G: 0, section80E: 0,
      };
      const res = await fetch(`${API_BASE}/api/v1/ca/clients/intake/${token}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) setSubmitted(true);
      else setError(json.error?.message ?? "Submission failed");
    } catch {
      setError("Submission failed — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;

  if (error && !info) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg border border-red-100">{error}</p>
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-sm text-center shadow-sm">
        <div className="text-4xl mb-4">✓</div>
        <h1 className="text-lg font-bold text-gray-900 mb-2">Details submitted</h1>
        <p className="text-sm text-gray-500">
          Your CA {info?.caName} at {info?.firmName} will receive your details and prepare your tax plan.
        </p>
      </div>
    </div>
  );

  function numField(label: string, field: string, placeholder = "0") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
          <input type="number" min={0} value={form[field as keyof typeof form] as string}
            onChange={(e) => set(field, e.target.value)} placeholder={placeholder}
            className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="text-xl font-bold text-green-700">fermor</span>
          <h1 className="text-xl font-bold text-gray-900 mt-4">Tax details — {info?.clientName}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Requested by <strong>{info?.caName}</strong>, {info?.firmName}
          </p>
        </div>

        {error && <p className="text-sm text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your age group</label>
            <select value={form.ageGroup} onChange={(e) => set("ageGroup", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="below60">Below 60</option>
              <option value="60to80">60–80</option>
              <option value="above80">Above 80</option>
            </select>
          </div>

          {numField("Annual Gross Salary (from Form 16)", "grossSalary")}
          {numField("Basic Salary (annual)", "basicSalary")}
          {numField("HRA received (annual)", "hraReceived")}
          {numField("Annual rent paid", "rentPaid")}

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input type="checkbox" checked={form.isMetroCity} onChange={(e) => set("isMetroCity", e.target.checked)}
              className="w-4 h-4 accent-green-600 rounded" />
            I live in a metro city (Delhi/Mumbai/Chennai/Kolkata)
          </label>

          {numField("80C investments (PPF/ELSS/LIC etc.)", "section80C")}
          {numField("80D — health insurance premium", "section80D")}
          {numField("Home loan interest (self-occupied property)", "homeLoanInterestSelfOccupied")}
          {numField("NPS contribution (80CCD)", "section80CCD")}

          <button type="submit" disabled={loading}
            className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors">
            {loading ? "Submitting..." : "Submit to my CA"}
          </button>

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Your data is shared only with your CA and used to prepare your tax plan.
            <br />Powered by <span className="font-medium text-green-600">fermor.in</span>
          </p>
        </form>
      </div>
    </div>
  );
}
