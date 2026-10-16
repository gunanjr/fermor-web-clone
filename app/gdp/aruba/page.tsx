import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Aruba",
  "slug": "aruba",
  "iso3": "ABW",
  "region": "Americas",
  "rank2026": 177,
  "flagEmoji": "🇦🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Djibouti",
      "slug": "djibouti",
      "rank": 175
    },
    {
      "name": "Bhutan",
      "slug": "bhutan",
      "rank": 179
    }
  ],
  "history": [
    {
      "year": 1995,
      "gdp": 1.321,
      "growth": 9,
      "perCapita": 13707.7,
      "popChangePct": 2.13
    },
    {
      "year": 1996,
      "gdp": 1.38,
      "growth": 1.6,
      "perCapita": 13947.1,
      "popChangePct": 3.13
    },
    {
      "year": 1997,
      "gdp": 1.532,
      "growth": 7.3,
      "perCapita": 15339.1,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdp": 1.665,
      "growth": 1.3,
      "perCapita": 16580.5,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdp": 1.723,
      "growth": 1.4,
      "perCapita": 16989.1,
      "popChangePct": 1.0
    },
    {
      "year": 2000,
      "gdp": 1.873,
      "growth": 8.6,
      "perCapita": 18403.1,
      "popChangePct": 0.99
    },
    {
      "year": 2001,
      "gdp": 1.896,
      "growth": -2.9,
      "perCapita": 18615.3,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 1.962,
      "growth": -0.9,
      "perCapita": 18990.1,
      "popChangePct": 0.98
    },
    {
      "year": 2003,
      "gdp": 2.044,
      "growth": 1.1,
      "perCapita": 19483.7,
      "popChangePct": 1.94
    },
    {
      "year": 2004,
      "gdp": 2.255,
      "growth": 7.2,
      "perCapita": 21184.3,
      "popChangePct": 0.95
    },
    {
      "year": 2005,
      "gdp": 2.36,
      "growth": -0.5,
      "perCapita": 22019.2,
      "popChangePct": 0.94
    },
    {
      "year": 2006,
      "gdp": 2.47,
      "growth": 1.1,
      "perCapita": 22734.1,
      "popChangePct": 1.87
    },
    {
      "year": 2007,
      "gdp": 2.678,
      "growth": 3.1,
      "perCapita": 24605.9,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 2.843,
      "growth": 1.8,
      "perCapita": 26166.6,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 2.554,
      "growth": -11.6,
      "perCapita": 23394.1,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 2.454,
      "growth": -3.3,
      "perCapita": 22460.2,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 2.638,
      "growth": 3.6,
      "perCapita": 24440.0,
      "popChangePct": -0.92
    },
    {
      "year": 2012,
      "gdp": 2.615,
      "growth": -1.2,
      "perCapita": 24334.5,
      "popChangePct": -0.93
    },
    {
      "year": 2013,
      "gdp": 2.728,
      "growth": 7.1,
      "perCapita": 25458.5,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 2.791,
      "growth": 1.4,
      "perCapita": 25945.5,
      "popChangePct": 0.93
    },
    {
      "year": 2015,
      "gdp": 2.963,
      "growth": 3.6,
      "perCapita": 27327.8,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 2.984,
      "growth": 1.2,
      "perCapita": 27469.6,
      "popChangePct": 0.93
    },
    {
      "year": 2017,
      "gdp": 3.092,
      "growth": 3.5,
      "perCapita": 28424.9,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 3.276,
      "growth": 3.2,
      "perCapita": 30082.7,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 3.347,
      "growth": 1.2,
      "perCapita": 30698.5,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 2.471,
      "growth": -23.9,
      "perCapita": 22653.2,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 2.881,
      "growth": 14.7,
      "perCapita": 26386.3,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 3.324,
      "growth": 10.6,
      "perCapita": 30442.7,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 3.871,
      "growth": 8.9,
      "perCapita": 35455.9,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 4.285,
      "growth": 7.6,
      "perCapita": 39262.4,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 4.521,
      "growth": 5.6,
      "perCapita": 41461.9,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 4.671,
      "growth": 2.3,
      "perCapita": 42862.3,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 4.853,
      "growth": 2,
      "perCapita": 44544.9,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 5.024,
      "growth": 1.5,
      "perCapita": 46142.0,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 5.198,
      "growth": 1.4,
      "perCapita": 47798.0,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 5.377,
      "growth": 1.4,
      "perCapita": 49477.0,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 5.557,
      "growth": 1.3,
      "perCapita": 51163.0,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1995,
      "gdpPPP": 1.975,
      "perCapitaPPP": 20504.0,
      "perCapitaPPPChangePct": 8.56,
      "popChangePct": 2.13
    },
    {
      "year": 1996,
      "gdpPPP": 2.044,
      "perCapitaPPP": 20659.0,
      "perCapitaPPPChangePct": 0.76,
      "popChangePct": 3.13
    },
    {
      "year": 1997,
      "gdpPPP": 2.23,
      "perCapitaPPP": 22333.3,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdpPPP": 2.285,
      "perCapitaPPP": 22748.8,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdpPPP": 2.35,
      "perCapitaPPP": 23177.7,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 1.0
    },
    {
      "year": 2000,
      "gdpPPP": 2.61,
      "perCapitaPPP": 25643.1,
      "perCapitaPPPChangePct": 10.64,
      "popChangePct": 0.99
    },
    {
      "year": 2001,
      "gdpPPP": 2.592,
      "perCapitaPPP": 25447.3,
      "perCapitaPPPChangePct": -0.76,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 2.608,
      "perCapitaPPP": 25247.3,
      "perCapitaPPPChangePct": -0.79,
      "popChangePct": 0.98
    },
    {
      "year": 2003,
      "gdpPPP": 2.69,
      "perCapitaPPP": 25638.0,
      "perCapitaPPPChangePct": 1.55,
      "popChangePct": 1.94
    },
    {
      "year": 2004,
      "gdpPPP": 2.961,
      "perCapitaPPP": 27823.0,
      "perCapitaPPPChangePct": 8.52,
      "popChangePct": 0.95
    },
    {
      "year": 2005,
      "gdpPPP": 3.038,
      "perCapitaPPP": 28348.8,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 0.94
    },
    {
      "year": 2006,
      "gdpPPP": 3.167,
      "perCapitaPPP": 29156.3,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 1.87
    },
    {
      "year": 2007,
      "gdpPPP": 3.354,
      "perCapitaPPP": 30823.6,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 3.481,
      "perCapitaPPP": 32034.0,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 3.095,
      "perCapitaPPP": 28354.1,
      "perCapitaPPPChangePct": -11.49,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 3.029,
      "perCapitaPPP": 27729.8,
      "perCapitaPPPChangePct": -2.2,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 3.203,
      "perCapitaPPP": 29678.9,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": -0.92
    },
    {
      "year": 2012,
      "gdpPPP": 3.225,
      "perCapitaPPP": 30011.1,
      "perCapitaPPPChangePct": 1.12,
      "popChangePct": -0.93
    },
    {
      "year": 2013,
      "gdpPPP": 3.512,
      "perCapitaPPP": 32777.5,
      "perCapitaPPPChangePct": 9.22,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 3.624,
      "perCapitaPPP": 33692.8,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 0.93
    },
    {
      "year": 2015,
      "gdpPPP": 3.79,
      "perCapitaPPP": 34955.8,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 3.873,
      "perCapitaPPP": 35659.4,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 0.93
    },
    {
      "year": 2017,
      "gdpPPP": 4.08,
      "perCapitaPPP": 37504.9,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 4.279,
      "perCapitaPPP": 39287.8,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 4.209,
      "perCapitaPPP": 38610.1,
      "perCapitaPPPChangePct": -1.73,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 3.133,
      "perCapitaPPP": 28719.4,
      "perCapitaPPPChangePct": -25.62,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 3.781,
      "perCapitaPPP": 34628.3,
      "perCapitaPPPChangePct": 20.57,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 4.48,
      "perCapitaPPP": 41033.4,
      "perCapitaPPPChangePct": 18.5,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 5.058,
      "perCapitaPPP": 46321.4,
      "perCapitaPPPChangePct": 12.89,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 5.579,
      "perCapitaPPP": 51123.8,
      "perCapitaPPPChangePct": 10.37,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 6.059,
      "perCapitaPPP": 55564.5,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 6.373,
      "perCapitaPPP": 58480.0,
      "perCapitaPPPChangePct": 5.25,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 6.645,
      "perCapitaPPP": 60998.7,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 6.854,
      "perCapitaPPP": 62955.0,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 7.076,
      "perCapitaPPP": 65063.0,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 7.308,
      "perCapitaPPP": 67241.1,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 7.539,
      "perCapitaPPP": 69415.7,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ArubaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
