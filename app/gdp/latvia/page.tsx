import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Latvia",
  "slug": "latvia",
  "iso3": "LVA",
  "region": "Europe",
  "rank2026": 99,
  "flagEmoji": "🇱🇻",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Macao",
      "slug": "macao",
      "rank": 98
    },
    {
      "name": "Libya",
      "slug": "libya",
      "rank": 100
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 1.641,
      "growth": null,
      "perCapita": 613.2,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 2.643,
      "growth": -11.4,
      "perCapita": 990.4,
      "popChangePct": -0.3
    },
    {
      "year": 1994,
      "gdp": 4.391,
      "growth": 2.2,
      "perCapita": 1671.3,
      "popChangePct": -1.57
    },
    {
      "year": 1995,
      "gdp": 5.242,
      "growth": -2.1,
      "perCapita": 2096.1,
      "popChangePct": -4.8
    },
    {
      "year": 1996,
      "gdp": 5.799,
      "growth": 2.3,
      "perCapita": 2348.4,
      "popChangePct": -1.24
    },
    {
      "year": 1997,
      "gdp": 6.351,
      "growth": 9.2,
      "perCapita": 2597.5,
      "popChangePct": -1.01
    },
    {
      "year": 1998,
      "gdp": 6.977,
      "growth": 6.6,
      "perCapita": 2882.1,
      "popChangePct": -0.98
    },
    {
      "year": 1999,
      "gdp": 7.325,
      "growth": 2.8,
      "perCapita": 3053.2,
      "popChangePct": -0.91
    },
    {
      "year": 2000,
      "gdp": 7.765,
      "growth": 5.8,
      "perCapita": 3260.2,
      "popChangePct": -0.71
    },
    {
      "year": 2001,
      "gdp": 8.192,
      "growth": 6.5,
      "perCapita": 3480.8,
      "popChangePct": -1.22
    },
    {
      "year": 2002,
      "gdp": 9.256,
      "growth": 7.7,
      "perCapita": 3987.9,
      "popChangePct": -1.36
    },
    {
      "year": 2003,
      "gdp": 11.249,
      "growth": 8.4,
      "perCapita": 4892.2,
      "popChangePct": -0.95
    },
    {
      "year": 2004,
      "gdp": 13.831,
      "growth": 8.7,
      "perCapita": 6075.4,
      "popChangePct": -0.96
    },
    {
      "year": 2005,
      "gdp": 16.332,
      "growth": 11.6,
      "perCapita": 7259.7,
      "popChangePct": -1.19
    },
    {
      "year": 2006,
      "gdp": 20.453,
      "growth": 12.8,
      "perCapita": 9180.5,
      "popChangePct": -0.98
    },
    {
      "year": 2007,
      "gdp": 29.463,
      "growth": 10.4,
      "perCapita": 13338.8,
      "popChangePct": -0.85
    },
    {
      "year": 2008,
      "gdp": 34.296,
      "growth": -3.4,
      "perCapita": 15647.2,
      "popChangePct": -0.77
    },
    {
      "year": 2009,
      "gdp": 25.758,
      "growth": -16,
      "perCapita": 11909.6,
      "popChangePct": -1.32
    },
    {
      "year": 2010,
      "gdp": 23.509,
      "growth": -3.7,
      "perCapita": 11086.5,
      "popChangePct": -1.94
    },
    {
      "year": 2011,
      "gdp": 26.832,
      "growth": 3,
      "perCapita": 12933.6,
      "popChangePct": -2.17
    },
    {
      "year": 2012,
      "gdp": 27.136,
      "growth": 7.3,
      "perCapita": 13270.9,
      "popChangePct": -1.45
    },
    {
      "year": 2013,
      "gdp": 29.157,
      "growth": 2.1,
      "perCapita": 14407,
      "popChangePct": -1.03
    },
    {
      "year": 2014,
      "gdp": 30.285,
      "growth": 2.1,
      "perCapita": 15131.4,
      "popChangePct": -1.14
    },
    {
      "year": 2015,
      "gdp": 26.347,
      "growth": 3.8,
      "perCapita": 13265.8,
      "popChangePct": -0.75
    },
    {
      "year": 2016,
      "gdp": 27.11,
      "growth": 2.6,
      "perCapita": 13768.5,
      "popChangePct": -0.86
    },
    {
      "year": 2017,
      "gdp": 29.381,
      "growth": 3.4,
      "perCapita": 15066.1,
      "popChangePct": -0.96
    },
    {
      "year": 2018,
      "gdp": 33.263,
      "growth": 4.3,
      "perCapita": 17195.7,
      "popChangePct": -0.82
    },
    {
      "year": 2019,
      "gdp": 33.103,
      "growth": 0.7,
      "perCapita": 17241.5,
      "popChangePct": -0.72
    },
    {
      "year": 2020,
      "gdp": 33.353,
      "growth": -3.5,
      "perCapita": 17483.7,
      "popChangePct": -0.63
    },
    {
      "year": 2021,
      "gdp": 38.209,
      "growth": 6.9,
      "perCapita": 20181.8,
      "popChangePct": -0.79
    },
    {
      "year": 2022,
      "gdp": 38.033,
      "growth": 1.9,
      "perCapita": 20276.1,
      "popChangePct": -0.9
    },
    {
      "year": 2023,
      "gdp": 42.792,
      "growth": -0.9,
      "perCapita": 22725.3,
      "popChangePct": 0.37
    },
    {
      "year": 2024,
      "gdp": 43.988,
      "growth": 0,
      "perCapita": 23499.4,
      "popChangePct": -0.58
    },
    {
      "year": 2025,
      "gdp": 48.591,
      "growth": 2.1,
      "perCapita": 26116.4,
      "popChangePct": -0.59
    },
    {
      "year": 2026,
      "gdp": 53.686,
      "growth": 2.2,
      "perCapita": 28912.7,
      "popChangePct": -0.21
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 56.741,
      "growth": 2.4,
      "perCapita": 30618.9,
      "popChangePct": -0.22
    },
    {
      "year": 2028,
      "gdp": 59.801,
      "growth": 2.4,
      "perCapita": 32334.8,
      "popChangePct": -0.22
    },
    {
      "year": 2029,
      "gdp": 62.785,
      "growth": 2.4,
      "perCapita": 34016.7,
      "popChangePct": -0.16
    },
    {
      "year": 2030,
      "gdp": 65.872,
      "growth": 2.4,
      "perCapita": 35760.7,
      "popChangePct": -0.22
    },
    {
      "year": 2031,
      "gdp": 69.132,
      "growth": 2.4,
      "perCapita": 37605.3,
      "popChangePct": -0.22
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 15.749,
      "perCapitaPPP": 5883.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 14.284,
      "perCapitaPPP": 5352.6,
      "perCapitaPPPChangePct": -9.03,
      "popChangePct": -0.3
    },
    {
      "year": 1994,
      "gdpPPP": 14.91,
      "perCapitaPPP": 5674.8,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": -1.57
    },
    {
      "year": 1995,
      "gdpPPP": 14.905,
      "perCapitaPPP": 5960.7,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": -4.8
    },
    {
      "year": 1996,
      "gdpPPP": 15.527,
      "perCapitaPPP": 6287.5,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": -1.24
    },
    {
      "year": 1997,
      "gdpPPP": 17.244,
      "perCapitaPPP": 7052.9,
      "perCapitaPPPChangePct": 12.17,
      "popChangePct": -1.01
    },
    {
      "year": 1998,
      "gdpPPP": 18.58,
      "perCapitaPPP": 7675.0,
      "perCapitaPPPChangePct": 8.82,
      "popChangePct": -0.98
    },
    {
      "year": 1999,
      "gdpPPP": 19.374,
      "perCapitaPPP": 8074.8,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": -0.91
    },
    {
      "year": 2000,
      "gdpPPP": 20.97,
      "perCapitaPPP": 8804.4,
      "perCapitaPPPChangePct": 9.04,
      "popChangePct": -0.71
    },
    {
      "year": 2001,
      "gdpPPP": 22.827,
      "perCapitaPPP": 9699.7,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": -1.22
    },
    {
      "year": 2002,
      "gdpPPP": 24.959,
      "perCapitaPPP": 10753.7,
      "perCapitaPPPChangePct": 10.87,
      "popChangePct": -1.36
    },
    {
      "year": 2003,
      "gdpPPP": 27.597,
      "perCapitaPPP": 12001.8,
      "perCapitaPPPChangePct": 11.61,
      "popChangePct": -0.95
    },
    {
      "year": 2004,
      "gdpPPP": 30.812,
      "perCapitaPPP": 13534.5,
      "perCapitaPPPChangePct": 12.77,
      "popChangePct": -0.96
    },
    {
      "year": 2005,
      "gdpPPP": 35.469,
      "perCapitaPPP": 15765.9,
      "perCapitaPPPChangePct": 16.49,
      "popChangePct": -1.19
    },
    {
      "year": 2006,
      "gdpPPP": 41.252,
      "perCapitaPPP": 18516.2,
      "perCapitaPPPChangePct": 17.45,
      "popChangePct": -0.98
    },
    {
      "year": 2007,
      "gdpPPP": 46.782,
      "perCapitaPPP": 21179.4,
      "perCapitaPPPChangePct": 14.38,
      "popChangePct": -0.85
    },
    {
      "year": 2008,
      "gdpPPP": 46.067,
      "perCapitaPPP": 21018.0,
      "perCapitaPPPChangePct": -0.76,
      "popChangePct": -0.77
    },
    {
      "year": 2009,
      "gdpPPP": 38.917,
      "perCapitaPPP": 17993.4,
      "perCapitaPPPChangePct": -14.39,
      "popChangePct": -1.32
    },
    {
      "year": 2010,
      "gdpPPP": 37.948,
      "perCapitaPPP": 17895.5,
      "perCapitaPPPChangePct": -0.54,
      "popChangePct": -1.94
    },
    {
      "year": 2011,
      "gdpPPP": 39.906,
      "perCapitaPPP": 19235.7,
      "perCapitaPPPChangePct": 7.49,
      "popChangePct": -2.17
    },
    {
      "year": 2012,
      "gdpPPP": 43.619,
      "perCapitaPPP": 21331.6,
      "perCapitaPPPChangePct": 10.9,
      "popChangePct": -1.45
    },
    {
      "year": 2013,
      "gdpPPP": 45.291,
      "perCapitaPPP": 22379.1,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": -1.03
    },
    {
      "year": 2014,
      "gdpPPP": 47.045,
      "perCapitaPPP": 23505.5,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": -1.14
    },
    {
      "year": 2015,
      "gdpPPP": 49.279,
      "perCapitaPPP": 24811.8,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": -0.75
    },
    {
      "year": 2016,
      "gdpPPP": 51.016,
      "perCapitaPPP": 25910.2,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": -0.86
    },
    {
      "year": 2017,
      "gdpPPP": 53.695,
      "perCapitaPPP": 27534.2,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": -0.96
    },
    {
      "year": 2018,
      "gdpPPP": 57.464,
      "perCapitaPPP": 29706.8,
      "perCapitaPPPChangePct": 7.89,
      "popChangePct": -0.82
    },
    {
      "year": 2019,
      "gdpPPP": 61.623,
      "perCapitaPPP": 32096.0,
      "perCapitaPPPChangePct": 8.04,
      "popChangePct": -0.72
    },
    {
      "year": 2020,
      "gdpPPP": 62.223,
      "perCapitaPPP": 32617.4,
      "perCapitaPPPChangePct": 1.62,
      "popChangePct": -0.63
    },
    {
      "year": 2021,
      "gdpPPP": 67.094,
      "perCapitaPPP": 35439.0,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": -0.79
    },
    {
      "year": 2022,
      "gdpPPP": 73.237,
      "perCapitaPPP": 39044.2,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": -0.9
    },
    {
      "year": 2023,
      "gdpPPP": 75.232,
      "perCapitaPPP": 39953.2,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 0.37
    },
    {
      "year": 2024,
      "gdpPPP": 77.071,
      "perCapitaPPP": 41173.1,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": -0.58
    },
    {
      "year": 2025,
      "gdpPPP": 80.952,
      "perCapitaPPP": 43509.4,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": -0.59
    },
    {
      "year": 2026,
      "gdpPPP": 85.118,
      "perCapitaPPP": 45840.2,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": -0.21
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 89.052,
      "perCapitaPPP": 48054.8,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": -0.22
    },
    {
      "year": 2028,
      "gdpPPP": 92.668,
      "perCapitaPPP": 50106.5,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": -0.22
    },
    {
      "year": 2029,
      "gdpPPP": 96.561,
      "perCapitaPPP": 52316.2,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": -0.16
    },
    {
      "year": 2030,
      "gdpPPP": 100.665,
      "perCapitaPPP": 54648.6,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": -0.22
    },
    {
      "year": 2031,
      "gdpPPP": 104.906,
      "perCapitaPPP": 57065.2,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": -0.22
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LatviaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
