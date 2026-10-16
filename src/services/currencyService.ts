import { CurrencyData, CurrencyInfo } from "../types/currency";

class CurrencyService {
  // Use existing API URL or fallback to localhost backend port 8000 (standard for backend repo)
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  private ratesCache: CurrencyData | null = null;
  private supportedCache: CurrencyInfo[] | null = null;

  private getFallbackRates(): CurrencyData {
    return {
      baseCurrency: "INR",
      lastUpdated: new Date().toISOString(),
      rates: {
        INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.009,
        AED: 0.044, SGD: 0.016, AUD: 0.018, CAD: 0.017
      }
    };
  }

  private getFallbackSupported(): CurrencyInfo[] {
    return [
      { code: "INR", symbol: "₹", name: "Indian Rupee" },
      { code: "USD", symbol: "$", name: "US Dollar" },
      { code: "EUR", symbol: "€", name: "Euro" },
      { code: "GBP", symbol: "£", name: "British Pound" },
      { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
      { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
      { code: "AUD", symbol: "A$", name: "Australian Dollar" },
      { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    ];
  }

  async getRates(): Promise<CurrencyData> {
    if (this.ratesCache) {
      return this.ratesCache;
    }

    if (!this.baseUrl) {
      return this.getFallbackRates();
    }

    try {
      const res = await fetch(`${this.baseUrl}/currency`);
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      this.ratesCache = data;
      return data;
    } catch {
      return this.getFallbackRates();
    }
  }

  async getSupportedCurrencies(): Promise<CurrencyInfo[]> {
    if (this.supportedCache) {
      return this.supportedCache;
    }

    if (!this.baseUrl) {
      return this.getFallbackSupported();
    }

    try {
      const res = await fetch(`${this.baseUrl}/currency/supported`);
      if (!res.ok) throw new Error("Failed to fetch supported currencies");
      const data = await res.json();
      this.supportedCache = data;
      return data;
    } catch {
      return this.getFallbackSupported();
    }
  }
}

export const currencyService = new CurrencyService();
