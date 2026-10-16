import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Uzbekistan",
  "slug": "uzbekistan",
  "iso3": "UZB",
  "region": "Asia",
  "rank2026": 61,
  "flagEmoji": "🇺🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Morocco",
      "slug": "morocco",
      "rank": 60
    },
    {
      "name": "Kuwait",
      "slug": "kuwait",
      "rank": 62
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 4.971,
      "growth": -11.1,
      "perCapita": 232.7,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 7.659,
      "growth": -2.3,
      "perCapita": 350.5,
      "popChangePct": 2.31
    },
    {
      "year": 1994,
      "gdp": 9.078,
      "growth": -5.2,
      "perCapita": 407.4,
      "popChangePct": 1.96
    },
    {
      "year": 1995,
      "gdp": 14.155,
      "growth": -0.9,
      "perCapita": 623.9,
      "popChangePct": 1.83
    },
    {
      "year": 1996,
      "gdp": 19.382,
      "growth": 1.7,
      "perCapita": 837.9,
      "popChangePct": 1.94
    },
    {
      "year": 1997,
      "gdp": 20.471,
      "growth": 5.2,
      "perCapita": 857.7,
      "popChangePct": 3.19
    },
    {
      "year": 1998,
      "gdp": 20.81,
      "growth": 4.3,
      "perCapita": 858.8,
      "popChangePct": 1.53
    },
    {
      "year": 1999,
      "gdp": 23.724,
      "growth": 4.3,
      "perCapita": 965.1,
      "popChangePct": 1.45
    },
    {
      "year": 2000,
      "gdp": 19.096,
      "growth": 3.8,
      "perCapita": 779.8,
      "popChangePct": -0.39
    },
    {
      "year": 2001,
      "gdp": 16.193,
      "growth": 4.2,
      "perCapita": 652.6,
      "popChangePct": 1.33
    },
    {
      "year": 2002,
      "gdp": 13.444,
      "growth": 4,
      "perCapita": 535.3,
      "popChangePct": 1.22
    },
    {
      "year": 2003,
      "gdp": 14.1,
      "growth": 4.2,
      "perCapita": 554.5,
      "popChangePct": 1.24
    },
    {
      "year": 2004,
      "gdp": 16.708,
      "growth": 7.4,
      "perCapita": 649.9,
      "popChangePct": 1.1
    },
    {
      "year": 2005,
      "gdp": 19.922,
      "growth": 7,
      "perCapita": 765.6,
      "popChangePct": 1.22
    },
    {
      "year": 2006,
      "gdp": 23.703,
      "growth": 7.5,
      "perCapita": 900.8,
      "popChangePct": 1.12
    },
    {
      "year": 2007,
      "gdp": 31.054,
      "growth": 9.5,
      "perCapita": 1164.6,
      "popChangePct": 1.33
    },
    {
      "year": 2008,
      "gdp": 39.822,
      "growth": 9,
      "perCapita": 1471.0,
      "popChangePct": 1.53
    },
    {
      "year": 2009,
      "gdp": 46.582,
      "growth": 8.1,
      "perCapita": 1691.8,
      "popChangePct": 1.7
    },
    {
      "year": 2010,
      "gdp": 55.551,
      "growth": 7.7,
      "perCapita": 1983.9,
      "popChangePct": 1.7
    },
    {
      "year": 2011,
      "gdp": 67.443,
      "growth": 8.1,
      "perCapita": 2315.8,
      "popChangePct": 4.01
    },
    {
      "year": 2012,
      "gdp": 75.322,
      "growth": 7.4,
      "perCapita": 2548.5,
      "popChangePct": 1.48
    },
    {
      "year": 2013,
      "gdp": 82.688,
      "growth": 7.9,
      "perCapita": 2756.8,
      "popChangePct": 1.49
    },
    {
      "year": 2014,
      "gdp": 91.307,
      "growth": 7.7,
      "perCapita": 2994.4,
      "popChangePct": 1.66
    },
    {
      "year": 2015,
      "gdp": 96.96,
      "growth": 7.9,
      "perCapita": 3125.5,
      "popChangePct": 1.74
    },
    {
      "year": 2016,
      "gdp": 97.325,
      "growth": 6.7,
      "perCapita": 3082.3,
      "popChangePct": 1.78
    },
    {
      "year": 2017,
      "gdp": 69.703,
      "growth": 4.7,
      "perCapita": 2170.1,
      "popChangePct": 1.73
    },
    {
      "year": 2018,
      "gdp": 61.318,
      "growth": 5.7,
      "perCapita": 1877.7,
      "popChangePct": 1.67
    },
    {
      "year": 2019,
      "gdp": 70.171,
      "growth": 6.8,
      "perCapita": 2069.6,
      "popChangePct": 3.82
    },
    {
      "year": 2020,
      "gdp": 70.127,
      "growth": 1.6,
      "perCapita": 2029.2,
      "popChangePct": 1.93
    },
    {
      "year": 2021,
      "gdp": 81.17,
      "growth": 8.2,
      "perCapita": 2301.3,
      "popChangePct": 2.06
    },
    {
      "year": 2022,
      "gdp": 94.317,
      "growth": 6.1,
      "perCapita": 2618.1,
      "popChangePct": 2.14
    },
    {
      "year": 2023,
      "gdp": 107.518,
      "growth": 6.3,
      "perCapita": 2921.7,
      "popChangePct": 2.15
    },
    {
      "year": 2024,
      "gdp": 121.352,
      "growth": 6.7,
      "perCapita": 3232.3,
      "popChangePct": 2.02
    },
    {
      "year": 2025,
      "gdp": 147.069,
      "growth": 7.7,
      "perCapita": 3846.3,
      "popChangePct": 1.85
    },
    {
      "year": 2026,
      "gdp": 181.502,
      "growth": 6.5,
      "perCapita": 4660.7,
      "popChangePct": 1.85
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 203.085,
      "growth": 5.9,
      "perCapita": 5120.3,
      "popChangePct": 1.85
    },
    {
      "year": 2028,
      "gdp": 224.851,
      "growth": 5.8,
      "perCapita": 5566.3,
      "popChangePct": 1.85
    },
    {
      "year": 2029,
      "gdp": 248.258,
      "growth": 5.8,
      "perCapita": 6034.3,
      "popChangePct": 1.85
    },
    {
      "year": 2030,
      "gdp": 273.441,
      "growth": 5.7,
      "perCapita": 6525.8,
      "popChangePct": 1.85
    },
    {
      "year": 2031,
      "gdp": 301.174,
      "growth": 5.7,
      "perCapita": 7057.4,
      "popChangePct": 1.85
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 44.613,
      "perCapitaPPP": 2088.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 44.62,
      "perCapitaPPP": 2041.9,
      "perCapitaPPPChangePct": -2.24,
      "popChangePct": 2.31
    },
    {
      "year": 1994,
      "gdpPPP": 43.203,
      "perCapitaPPP": 1938.9,
      "perCapitaPPPChangePct": -5.04,
      "popChangePct": 1.96
    },
    {
      "year": 1995,
      "gdpPPP": 43.712,
      "perCapitaPPP": 1926.5,
      "perCapitaPPPChangePct": -0.64,
      "popChangePct": 1.83
    },
    {
      "year": 1996,
      "gdpPPP": 45.269,
      "perCapitaPPP": 1957.1,
      "perCapitaPPPChangePct": 1.59,
      "popChangePct": 1.94
    },
    {
      "year": 1997,
      "gdpPPP": 48.444,
      "perCapitaPPP": 2029.7,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 3.19
    },
    {
      "year": 1998,
      "gdpPPP": 51.095,
      "perCapitaPPP": 2108.7,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.53
    },
    {
      "year": 1999,
      "gdpPPP": 54.046,
      "perCapitaPPP": 2198.5,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 1.45
    },
    {
      "year": 2000,
      "gdpPPP": 57.37,
      "perCapitaPPP": 2342.8,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": -0.39
    },
    {
      "year": 2001,
      "gdpPPP": 61.126,
      "perCapitaPPP": 2463.5,
      "perCapitaPPPChangePct": 5.15,
      "popChangePct": 1.33
    },
    {
      "year": 2002,
      "gdpPPP": 64.559,
      "perCapitaPPP": 2570.5,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 1.22
    },
    {
      "year": 2003,
      "gdpPPP": 68.599,
      "perCapitaPPP": 2697.8,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 1.24
    },
    {
      "year": 2004,
      "gdpPPP": 75.656,
      "perCapitaPPP": 2943.0,
      "perCapitaPPPChangePct": 9.09,
      "popChangePct": 1.1
    },
    {
      "year": 2005,
      "gdpPPP": 83.49,
      "perCapitaPPP": 3208.5,
      "perCapitaPPPChangePct": 9.02,
      "popChangePct": 1.22
    },
    {
      "year": 2006,
      "gdpPPP": 92.52,
      "perCapitaPPP": 3516.2,
      "perCapitaPPPChangePct": 9.59,
      "popChangePct": 1.12
    },
    {
      "year": 2007,
      "gdpPPP": 104.054,
      "perCapitaPPP": 3902.4,
      "perCapitaPPPChangePct": 10.99,
      "popChangePct": 1.33
    },
    {
      "year": 2008,
      "gdpPPP": 115.604,
      "perCapitaPPP": 4270.2,
      "perCapitaPPPChangePct": 9.42,
      "popChangePct": 1.53
    },
    {
      "year": 2009,
      "gdpPPP": 125.738,
      "perCapitaPPP": 4566.8,
      "perCapitaPPPChangePct": 6.94,
      "popChangePct": 1.7
    },
    {
      "year": 2010,
      "gdpPPP": 137.006,
      "perCapitaPPP": 4892.8,
      "perCapitaPPPChangePct": 7.14,
      "popChangePct": 1.7
    },
    {
      "year": 2011,
      "gdpPPP": 151.199,
      "perCapitaPPP": 5191.7,
      "perCapitaPPPChangePct": 6.11,
      "popChangePct": 4.01
    },
    {
      "year": 2012,
      "gdpPPP": 165.344,
      "perCapitaPPP": 5594.4,
      "perCapitaPPPChangePct": 7.76,
      "popChangePct": 1.48
    },
    {
      "year": 2013,
      "gdpPPP": 181.48,
      "perCapitaPPP": 6050.6,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 1.49
    },
    {
      "year": 2014,
      "gdpPPP": 198.883,
      "perCapitaPPP": 6522.3,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 1.66
    },
    {
      "year": 2015,
      "gdpPPP": 216.676,
      "perCapitaPPP": 6984.5,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": 1.74
    },
    {
      "year": 2016,
      "gdpPPP": 233.415,
      "perCapitaPPP": 7392.3,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 1.78
    },
    {
      "year": 2017,
      "gdpPPP": 248.763,
      "perCapitaPPP": 7744.7,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 1.73
    },
    {
      "year": 2018,
      "gdpPPP": 274.914,
      "perCapitaPPP": 8418.3,
      "perCapitaPPPChangePct": 8.7,
      "popChangePct": 1.67
    },
    {
      "year": 2019,
      "gdpPPP": 293.695,
      "perCapitaPPP": 8662.2,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 3.82
    },
    {
      "year": 2020,
      "gdpPPP": 299.601,
      "perCapitaPPP": 8669.3,
      "perCapitaPPPChangePct": 0.08,
      "popChangePct": 1.93
    },
    {
      "year": 2021,
      "gdpPPP": 332.356,
      "perCapitaPPP": 9422.8,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 2.06
    },
    {
      "year": 2022,
      "gdpPPP": 377.66,
      "perCapitaPPP": 10483.3,
      "perCapitaPPPChangePct": 11.25,
      "popChangePct": 2.14
    },
    {
      "year": 2023,
      "gdpPPP": 416.369,
      "perCapitaPPP": 11314.4,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 2.15
    },
    {
      "year": 2024,
      "gdpPPP": 455.193,
      "perCapitaPPP": 12124.5,
      "perCapitaPPPChangePct": 7.16,
      "popChangePct": 2.02
    },
    {
      "year": 2025,
      "gdpPPP": 504.148,
      "perCapitaPPP": 13184.9,
      "perCapitaPPPChangePct": 8.75,
      "popChangePct": 1.85
    },
    {
      "year": 2026,
      "gdpPPP": 552.163,
      "perCapitaPPP": 14178.7,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 1.85
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 597.375,
      "perCapitaPPP": 15061.5,
      "perCapitaPPPChangePct": 6.23,
      "popChangePct": 1.85
    },
    {
      "year": 2028,
      "gdpPPP": 642.229,
      "perCapitaPPP": 15898.7,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 1.85
    },
    {
      "year": 2029,
      "gdpPPP": 691.284,
      "perCapitaPPP": 16802.7,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 1.85
    },
    {
      "year": 2030,
      "gdpPPP": 744.044,
      "perCapitaPPP": 17757.1,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 1.85
    },
    {
      "year": 2031,
      "gdpPPP": 800.658,
      "perCapitaPPP": 18761.7,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 1.85
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function UzbekistanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
