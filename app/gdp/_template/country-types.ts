export interface GDPYearRow {
  year: number;
  gdp: number;              // nominal GDP, USD billions
  growth: number | null;    // real GDP growth, %
  perCapita: number | null; // GDP per capita, current USD
  popChangePct: number | null; // population change, %
}

export interface PPPYearRow {
  year: number;
  gdpPPP: number;               // GDP, PPP valuation, international $ billions
  perCapitaPPP: number | null;  // GDP per capita, PPP valuation, international $
  perCapitaPPPChangePct: number | null;
  popChangePct: number | null;
}

export interface CountryGDPData {
  name: string;
  slug: string;
  iso3: string;
  region: 'Asia' | 'Africa' | 'Europe' | 'Americas' | 'Oceania';
  rank2026: number;
  flagEmoji: string;
  history: GDPYearRow[];       // 1980-2026 (whatever years IMF has), nominal
  projections: GDPYearRow[];   // 2027-2031, nominal
  pppHistory: PPPYearRow[];
  pppProjections: PPPYearRow[];
  neighbors: { name: string; slug: string; rank: number }[]; // adjacent-rank countries for cross-links
  /** Explicit override for the two in-content calculator CTAs on this page (skips the rank-based auto-rotation). */
  calcOverride?: [{ label: string; desc: string; href: string }, { label: string; desc: string; href: string }];
  datePublished: string;
  dateModified: string;
}
