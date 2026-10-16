import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Namibia",
  "slug": "namibia",
  "iso3": "NAM",
  "region": "Africa",
  "rank2026": 144,
  "flagEmoji": "🇳🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Rwanda",
      "slug": "rwanda",
      "rank": 143
    },
    {
      "name": "Mauritius",
      "slug": "mauritius",
      "rank": 145
    }
  ],
  "history": [
    {
      "year": 1989,
      "gdp": 2.268,
      "growth": null,
      "perCapita": 1765.6,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 2.568,
      "growth": null,
      "perCapita": 1908.8,
      "popChangePct": 4.75
    },
    {
      "year": 1991,
      "gdp": 2.841,
      "growth": 5.3,
      "perCapita": 2025.6,
      "popChangePct": 4.31
    },
    {
      "year": 1992,
      "gdp": 3.296,
      "growth": 9.3,
      "perCapita": 2264.9,
      "popChangePct": 3.71
    },
    {
      "year": 1993,
      "gdp": 3.156,
      "growth": -1.6,
      "perCapita": 2099.2,
      "popChangePct": 3.37
    },
    {
      "year": 1994,
      "gdp": 3.537,
      "growth": 3,
      "perCapita": 2283.1,
      "popChangePct": 2.99
    },
    {
      "year": 1995,
      "gdp": 3.948,
      "growth": 4.1,
      "perCapita": 2499.3,
      "popChangePct": 2.0
    },
    {
      "year": 1996,
      "gdp": 3.954,
      "growth": 3.2,
      "perCapita": 2433.8,
      "popChangePct": 2.85
    },
    {
      "year": 1997,
      "gdp": 4.11,
      "growth": 4.2,
      "perCapita": 2464.8,
      "popChangePct": 2.65
    },
    {
      "year": 1998,
      "gdp": 3.832,
      "growth": 3.3,
      "perCapita": 2239.5,
      "popChangePct": 2.58
    },
    {
      "year": 1999,
      "gdp": 3.824,
      "growth": 3.4,
      "perCapita": 2179.3,
      "popChangePct": 2.57
    },
    {
      "year": 2000,
      "gdp": 3.941,
      "growth": 3.5,
      "perCapita": 2191.8,
      "popChangePct": 2.45
    },
    {
      "year": 2001,
      "gdp": 3.577,
      "growth": 2.4,
      "perCapita": 1945.2,
      "popChangePct": 2.28
    },
    {
      "year": 2002,
      "gdp": 3.396,
      "growth": 6.7,
      "perCapita": 1811.3,
      "popChangePct": 1.96
    },
    {
      "year": 2003,
      "gdp": 4.974,
      "growth": 3.5,
      "perCapita": 2610.8,
      "popChangePct": 1.6
    },
    {
      "year": 2004,
      "gdp": 6.673,
      "growth": 6.6,
      "perCapita": 3457.6,
      "popChangePct": 1.31
    },
    {
      "year": 2005,
      "gdp": 7.324,
      "growth": 4.7,
      "perCapita": 3747.9,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdp": 7.711,
      "growth": 3.9,
      "perCapita": 3896.5,
      "popChangePct": 1.28
    },
    {
      "year": 2007,
      "gdp": 8.73,
      "growth": 3.6,
      "perCapita": 4354.3,
      "popChangePct": 1.31
    },
    {
      "year": 2008,
      "gdp": 8.496,
      "growth": 2.6,
      "perCapita": 4180.5,
      "popChangePct": 1.35
    },
    {
      "year": 2009,
      "gdp": 8.915,
      "growth": 0.3,
      "perCapita": 4323.9,
      "popChangePct": 1.48
    },
    {
      "year": 2010,
      "gdp": 11.281,
      "growth": 6,
      "perCapita": 5389.7,
      "popChangePct": 1.5
    },
    {
      "year": 2011,
      "gdp": 12.423,
      "growth": 5.1,
      "perCapita": 5841.9,
      "popChangePct": 1.62
    },
    {
      "year": 2012,
      "gdp": 13.016,
      "growth": 5.1,
      "perCapita": 6009.2,
      "popChangePct": 1.83
    },
    {
      "year": 2013,
      "gdp": 12.168,
      "growth": 5.6,
      "perCapita": 5473.0,
      "popChangePct": 2.63
    },
    {
      "year": 2014,
      "gdp": 12.434,
      "growth": 6.1,
      "perCapita": 5449.1,
      "popChangePct": 2.65
    },
    {
      "year": 2015,
      "gdp": 11.45,
      "growth": 4.3,
      "perCapita": 4888.1,
      "popChangePct": 2.63
    },
    {
      "year": 2016,
      "gdp": 10.719,
      "growth": 0,
      "perCapita": 4454.9,
      "popChangePct": 2.73
    },
    {
      "year": 2017,
      "gdp": 12.883,
      "growth": -1,
      "perCapita": 5210.9,
      "popChangePct": 2.74
    },
    {
      "year": 2018,
      "gdp": 13.676,
      "growth": 1.1,
      "perCapita": 5381.5,
      "popChangePct": 2.79
    },
    {
      "year": 2019,
      "gdp": 12.539,
      "growth": -0.8,
      "perCapita": 4798.3,
      "popChangePct": 2.83
    },
    {
      "year": 2020,
      "gdp": 10.583,
      "growth": -8.1,
      "perCapita": 3937.7,
      "popChangePct": 2.87
    },
    {
      "year": 2021,
      "gdp": 12.399,
      "growth": 3.6,
      "perCapita": 4476.6,
      "popChangePct": 3.05
    },
    {
      "year": 2022,
      "gdp": 12.564,
      "growth": 5.4,
      "perCapita": 4406.6,
      "popChangePct": 2.92
    },
    {
      "year": 2023,
      "gdp": 12.402,
      "growth": 4.4,
      "perCapita": 4235.7,
      "popChangePct": 2.7
    },
    {
      "year": 2024,
      "gdp": 13.37,
      "growth": 3.7,
      "perCapita": 4471.8,
      "popChangePct": 2.12
    },
    {
      "year": 2025,
      "gdp": 14.826,
      "growth": 2.4,
      "perCapita": 4862.3,
      "popChangePct": 1.97
    },
    {
      "year": 2026,
      "gdp": 17.314,
      "growth": 2.4,
      "perCapita": 5573.0,
      "popChangePct": 1.9
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 18.351,
      "growth": 2.7,
      "perCapita": 5798.8,
      "popChangePct": 1.87
    },
    {
      "year": 2028,
      "gdp": 19.244,
      "growth": 3,
      "perCapita": 5974.1,
      "popChangePct": 1.77
    },
    {
      "year": 2029,
      "gdp": 20.309,
      "growth": 3.1,
      "perCapita": 6195.5,
      "popChangePct": 1.77
    },
    {
      "year": 2030,
      "gdp": 21.367,
      "growth": 3,
      "perCapita": 6405.4,
      "popChangePct": 1.77
    },
    {
      "year": 2031,
      "gdp": 22.45,
      "growth": 3,
      "perCapita": 6613.7,
      "popChangePct": 1.74
    }
  ],
  "pppHistory": [
    {
      "year": 1990,
      "gdpPPP": 5.375,
      "perCapitaPPP": 3995.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": 4.75
    },
    {
      "year": 1991,
      "gdpPPP": 5.854,
      "perCapitaPPP": 4173.1,
      "perCapitaPPPChangePct": 4.45,
      "popChangePct": 4.31
    },
    {
      "year": 1992,
      "gdpPPP": 6.542,
      "perCapitaPPP": 4495.5,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 3.71
    },
    {
      "year": 1993,
      "gdpPPP": 6.588,
      "perCapitaPPP": 4381.7,
      "perCapitaPPPChangePct": -2.53,
      "popChangePct": 3.37
    },
    {
      "year": 1994,
      "gdpPPP": 6.931,
      "perCapitaPPP": 4474.2,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 2.99
    },
    {
      "year": 1995,
      "gdpPPP": 7.368,
      "perCapitaPPP": 4663.9,
      "perCapitaPPPChangePct": 4.24,
      "popChangePct": 2.0
    },
    {
      "year": 1996,
      "gdpPPP": 7.742,
      "perCapitaPPP": 4765.8,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.85
    },
    {
      "year": 1997,
      "gdpPPP": 8.208,
      "perCapitaPPP": 4922.0,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 2.65
    },
    {
      "year": 1998,
      "gdpPPP": 8.573,
      "perCapitaPPP": 5011.1,
      "perCapitaPPPChangePct": 1.81,
      "popChangePct": 2.58
    },
    {
      "year": 1999,
      "gdpPPP": 8.987,
      "perCapitaPPP": 5122.3,
      "perCapitaPPPChangePct": 2.22,
      "popChangePct": 2.57
    },
    {
      "year": 2000,
      "gdpPPP": 9.513,
      "perCapitaPPP": 5290.2,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 2.45
    },
    {
      "year": 2001,
      "gdpPPP": 9.959,
      "perCapitaPPP": 5415.3,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": 2.28
    },
    {
      "year": 2002,
      "gdpPPP": 10.79,
      "perCapitaPPP": 5754.8,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": 1.96
    },
    {
      "year": 2003,
      "gdpPPP": 11.386,
      "perCapitaPPP": 5976.7,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 1.6
    },
    {
      "year": 2004,
      "gdpPPP": 12.467,
      "perCapitaPPP": 6459.8,
      "perCapitaPPPChangePct": 8.08,
      "popChangePct": 1.31
    },
    {
      "year": 2005,
      "gdpPPP": 13.459,
      "perCapitaPPP": 6886.9,
      "perCapitaPPPChangePct": 6.61,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdpPPP": 14.421,
      "perCapitaPPP": 7287.4,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 1.28
    },
    {
      "year": 2007,
      "gdpPPP": 15.352,
      "perCapitaPPP": 7657.5,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 1.31
    },
    {
      "year": 2008,
      "gdpPPP": 16.062,
      "perCapitaPPP": 7903.3,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 1.35
    },
    {
      "year": 2009,
      "gdpPPP": 16.209,
      "perCapitaPPP": 7862.0,
      "perCapitaPPPChangePct": -0.52,
      "popChangePct": 1.48
    },
    {
      "year": 2010,
      "gdpPPP": 17.397,
      "perCapitaPPP": 8311.9,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.5
    },
    {
      "year": 2011,
      "gdpPPP": 18.66,
      "perCapitaPPP": 8774.7,
      "perCapitaPPPChangePct": 5.57,
      "popChangePct": 1.62
    },
    {
      "year": 2012,
      "gdpPPP": 19.97,
      "perCapitaPPP": 9219.3,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 1.83
    },
    {
      "year": 2013,
      "gdpPPP": 21.45,
      "perCapitaPPP": 9648.0,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 2.63
    },
    {
      "year": 2014,
      "gdpPPP": 23.153,
      "perCapitaPPP": 10147.0,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": 2.65
    },
    {
      "year": 2015,
      "gdpPPP": 24.364,
      "perCapitaPPP": 10401.0,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 2.63
    },
    {
      "year": 2016,
      "gdpPPP": 24.604,
      "perCapitaPPP": 10225.8,
      "perCapitaPPPChangePct": -1.69,
      "popChangePct": 2.73
    },
    {
      "year": 2017,
      "gdpPPP": 24.788,
      "perCapitaPPP": 10026.0,
      "perCapitaPPPChangePct": -1.95,
      "popChangePct": 2.74
    },
    {
      "year": 2018,
      "gdpPPP": 25.396,
      "perCapitaPPP": 9993.1,
      "perCapitaPPPChangePct": -0.33,
      "popChangePct": 2.79
    },
    {
      "year": 2019,
      "gdpPPP": 25.47,
      "perCapitaPPP": 9746.4,
      "perCapitaPPPChangePct": -2.47,
      "popChangePct": 2.83
    },
    {
      "year": 2020,
      "gdpPPP": 25.525,
      "perCapitaPPP": 9497.0,
      "perCapitaPPPChangePct": -2.56,
      "popChangePct": 2.87
    },
    {
      "year": 2021,
      "gdpPPP": 27.288,
      "perCapitaPPP": 9851.9,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 3.05
    },
    {
      "year": 2022,
      "gdpPPP": 30.807,
      "perCapitaPPP": 10804.5,
      "perCapitaPPPChangePct": 9.67,
      "popChangePct": 2.92
    },
    {
      "year": 2023,
      "gdpPPP": 33.366,
      "perCapitaPPP": 11395.3,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 2.7
    },
    {
      "year": 2024,
      "gdpPPP": 35.463,
      "perCapitaPPP": 11861.2,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 2.12
    },
    {
      "year": 2025,
      "gdpPPP": 37.359,
      "perCapitaPPP": 12252.1,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 1.97
    },
    {
      "year": 2026,
      "gdpPPP": 39.35,
      "perCapitaPPP": 12666.3,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 1.9
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 41.318,
      "perCapitaPPP": 13056.2,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.87
    },
    {
      "year": 2028,
      "gdpPPP": 43.27,
      "perCapitaPPP": 13432.3,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 1.77
    },
    {
      "year": 2029,
      "gdpPPP": 45.424,
      "perCapitaPPP": 13857.0,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 1.77
    },
    {
      "year": 2030,
      "gdpPPP": 47.645,
      "perCapitaPPP": 14283.1,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.77
    },
    {
      "year": 2031,
      "gdpPPP": 49.963,
      "perCapitaPPP": 14719.1,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 1.74
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NamibiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
