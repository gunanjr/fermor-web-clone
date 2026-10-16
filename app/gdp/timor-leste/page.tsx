import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Timor-Leste",
  "slug": "timor-leste",
  "iso3": "TLS",
  "region": "Asia",
  "rank2026": 193,
  "flagEmoji": "🇹🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Seychelles",
      "slug": "seychelles",
      "rank": 192
    },
    {
      "name": "Solomon Islands",
      "slug": "solomon-islands",
      "rank": 194
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 0.367,
      "growth": null,
      "perCapita": 513.9,
      "popChangePct": -25.24
    },
    {
      "year": 2001,
      "gdp": 0.477,
      "growth": 16.3,
      "perCapita": 615.3,
      "popChangePct": 8.68
    },
    {
      "year": 2002,
      "gdp": 0.47,
      "growth": -6.7,
      "perCapita": 553.3,
      "popChangePct": 9.28
    },
    {
      "year": 2003,
      "gdp": 0.49,
      "growth": -2.2,
      "perCapita": 539.0,
      "popChangePct": 7.31
    },
    {
      "year": 2004,
      "gdp": 0.441,
      "growth": 0.4,
      "perCapita": 477.1,
      "popChangePct": 1.54
    },
    {
      "year": 2005,
      "gdp": 0.462,
      "growth": 3,
      "perCapita": 494.8,
      "popChangePct": 1.08
    },
    {
      "year": 2006,
      "gdp": 0.454,
      "growth": -4.1,
      "perCapita": 471.5,
      "popChangePct": 3.0
    },
    {
      "year": 2007,
      "gdp": 0.543,
      "growth": 10.3,
      "perCapita": 547.8,
      "popChangePct": 3.01
    },
    {
      "year": 2008,
      "gdp": 0.648,
      "growth": 11.4,
      "perCapita": 636.4,
      "popChangePct": 2.83
    },
    {
      "year": 2009,
      "gdp": 0.727,
      "growth": 10.1,
      "perCapita": 695.0,
      "popChangePct": 2.65
    },
    {
      "year": 2010,
      "gdp": 0.882,
      "growth": 9.3,
      "perCapita": 822.8,
      "popChangePct": 2.49
    },
    {
      "year": 2011,
      "gdp": 1.042,
      "growth": 6,
      "perCapita": 949.7,
      "popChangePct": 2.43
    },
    {
      "year": 2012,
      "gdp": 1.16,
      "growth": 4.9,
      "perCapita": 1033.5,
      "popChangePct": 2.28
    },
    {
      "year": 2013,
      "gdp": 1.396,
      "growth": 3.1,
      "perCapita": 1216.6,
      "popChangePct": 2.14
    },
    {
      "year": 2014,
      "gdp": 1.448,
      "growth": 4.5,
      "perCapita": 1236.8,
      "popChangePct": 2.01
    },
    {
      "year": 2015,
      "gdp": 1.59,
      "growth": 2.5,
      "perCapita": 1332.5,
      "popChangePct": 1.97
    },
    {
      "year": 2016,
      "gdp": 1.64,
      "growth": 3,
      "perCapita": 1348.2,
      "popChangePct": 2.01
    },
    {
      "year": 2017,
      "gdp": 1.585,
      "growth": -3.2,
      "perCapita": 1278.3,
      "popChangePct": 1.89
    },
    {
      "year": 2018,
      "gdp": 1.556,
      "growth": -0.5,
      "perCapita": 1231.4,
      "popChangePct": 1.94
    },
    {
      "year": 2019,
      "gdp": 2.033,
      "growth": 2.7,
      "perCapita": 1577.7,
      "popChangePct": 1.9
    },
    {
      "year": 2020,
      "gdp": 2.163,
      "growth": -8.5,
      "perCapita": 1646.4,
      "popChangePct": 2.02
    },
    {
      "year": 2021,
      "gdp": 3.625,
      "growth": 3,
      "perCapita": 2708.2,
      "popChangePct": 1.9
    },
    {
      "year": 2022,
      "gdp": 3.209,
      "growth": 4,
      "perCapita": 2356.2,
      "popChangePct": 1.72
    },
    {
      "year": 2023,
      "gdp": 2.08,
      "growth": 2.4,
      "perCapita": 1510.5,
      "popChangePct": 1.1
    },
    {
      "year": 2024,
      "gdp": 1.866,
      "growth": 4.3,
      "perCapita": 1340.5,
      "popChangePct": 1.09
    },
    {
      "year": 2025,
      "gdp": 2.064,
      "growth": 4.5,
      "perCapita": 1463.9,
      "popChangePct": 1.29
    },
    {
      "year": 2026,
      "gdp": 2.17,
      "growth": 4.1,
      "perCapita": 1519.9,
      "popChangePct": 1.21
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2.315,
      "growth": 3.8,
      "perCapita": 1600.6,
      "popChangePct": 1.33
    },
    {
      "year": 2028,
      "gdp": 2.466,
      "growth": 3.6,
      "perCapita": 1681.5,
      "popChangePct": 1.38
    },
    {
      "year": 2029,
      "gdp": 2.621,
      "growth": 3.4,
      "perCapita": 1762.0,
      "popChangePct": 1.43
    },
    {
      "year": 2030,
      "gdp": 2.783,
      "growth": 3.3,
      "perCapita": 1844.5,
      "popChangePct": 1.48
    },
    {
      "year": 2031,
      "gdp": 2.953,
      "growth": 3.2,
      "perCapita": 1928.8,
      "popChangePct": 1.46
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 1.655,
      "perCapitaPPP": 2317.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": -25.24
    },
    {
      "year": 2001,
      "gdpPPP": 1.969,
      "perCapitaPPP": 2537.4,
      "perCapitaPPPChangePct": 9.49,
      "popChangePct": 8.68
    },
    {
      "year": 2002,
      "gdpPPP": 1.866,
      "perCapitaPPP": 2198.8,
      "perCapitaPPPChangePct": -13.34,
      "popChangePct": 9.28
    },
    {
      "year": 2003,
      "gdpPPP": 1.861,
      "perCapitaPPP": 2045.4,
      "perCapitaPPPChangePct": -6.98,
      "popChangePct": 7.31
    },
    {
      "year": 2004,
      "gdpPPP": 1.919,
      "perCapitaPPP": 2076.6,
      "perCapitaPPPChangePct": 1.53,
      "popChangePct": 1.54
    },
    {
      "year": 2005,
      "gdpPPP": 2.038,
      "perCapitaPPP": 2181.4,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 1.08
    },
    {
      "year": 2006,
      "gdpPPP": 2.014,
      "perCapitaPPP": 2092.9,
      "perCapitaPPPChangePct": -4.06,
      "popChangePct": 3.0
    },
    {
      "year": 2007,
      "gdpPPP": 2.281,
      "perCapitaPPP": 2302.3,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 3.01
    },
    {
      "year": 2008,
      "gdpPPP": 2.59,
      "perCapitaPPP": 2541.6,
      "perCapitaPPPChangePct": 10.4,
      "popChangePct": 2.83
    },
    {
      "year": 2009,
      "gdpPPP": 2.87,
      "perCapitaPPP": 2744.3,
      "perCapitaPPPChangePct": 7.97,
      "popChangePct": 2.65
    },
    {
      "year": 2010,
      "gdpPPP": 3.176,
      "perCapitaPPP": 2963.6,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 2.49
    },
    {
      "year": 2011,
      "gdpPPP": 3.435,
      "perCapitaPPP": 3129.1,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 2.43
    },
    {
      "year": 2012,
      "gdpPPP": 3.668,
      "perCapitaPPP": 3267.4,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 2.28
    },
    {
      "year": 2013,
      "gdpPPP": 3.845,
      "perCapitaPPP": 3352.5,
      "perCapitaPPPChangePct": 2.6,
      "popChangePct": 2.14
    },
    {
      "year": 2014,
      "gdpPPP": 4.089,
      "perCapitaPPP": 3494.2,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 2.01
    },
    {
      "year": 2015,
      "gdpPPP": 4.23,
      "perCapitaPPP": 3544.2,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 1.97
    },
    {
      "year": 2016,
      "gdpPPP": 4.399,
      "perCapitaPPP": 3614.8,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 2.01
    },
    {
      "year": 2017,
      "gdpPPP": 4.335,
      "perCapitaPPP": 3496.4,
      "perCapitaPPPChangePct": -3.28,
      "popChangePct": 1.89
    },
    {
      "year": 2018,
      "gdpPPP": 4.544,
      "perCapitaPPP": 3596.1,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 1.94
    },
    {
      "year": 2019,
      "gdpPPP": 5.928,
      "perCapitaPPP": 4601.3,
      "perCapitaPPPChangePct": 27.95,
      "popChangePct": 1.9
    },
    {
      "year": 2020,
      "gdpPPP": 8.131,
      "perCapitaPPP": 6190.3,
      "perCapitaPPPChangePct": 34.53,
      "popChangePct": 2.02
    },
    {
      "year": 2021,
      "gdpPPP": 9.215,
      "perCapitaPPP": 6884.2,
      "perCapitaPPPChangePct": 11.21,
      "popChangePct": 1.9
    },
    {
      "year": 2022,
      "gdpPPP": 7.845,
      "perCapitaPPP": 5760.7,
      "perCapitaPPPChangePct": -16.32,
      "popChangePct": 1.72
    },
    {
      "year": 2023,
      "gdpPPP": 6.659,
      "perCapitaPPP": 4836.8,
      "perCapitaPPPChangePct": -16.04,
      "popChangePct": 1.1
    },
    {
      "year": 2024,
      "gdpPPP": 6.204,
      "perCapitaPPP": 4457.6,
      "perCapitaPPPChangePct": -7.84,
      "popChangePct": 1.09
    },
    {
      "year": 2025,
      "gdpPPP": 7.133,
      "perCapitaPPP": 5060.2,
      "perCapitaPPPChangePct": 13.52,
      "popChangePct": 1.29
    },
    {
      "year": 2026,
      "gdpPPP": 7.523,
      "perCapitaPPP": 5269.8,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 1.21
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 7.98,
      "perCapitaPPP": 5517.2,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": 1.33
    },
    {
      "year": 2028,
      "gdpPPP": 8.403,
      "perCapitaPPP": 5730.7,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 1.38
    },
    {
      "year": 2029,
      "gdpPPP": 8.843,
      "perCapitaPPP": 5945.4,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 1.43
    },
    {
      "year": 2030,
      "gdpPPP": 9.303,
      "perCapitaPPP": 6165.5,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 1.48
    },
    {
      "year": 2031,
      "gdpPPP": 9.774,
      "perCapitaPPP": 6384.9,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 1.46
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TimorLesteGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
