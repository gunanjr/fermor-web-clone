import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Mali",
  "slug": "mali",
  "iso3": "MLI",
  "region": "Africa",
  "rank2026": 118,
  "flagEmoji": "🇲🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Guyana",
      "slug": "guyana",
      "rank": 117
    },
    {
      "name": "Albania",
      "slug": "albania",
      "rank": 119
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.704,
      "growth": 3.3,
      "perCapita": 359.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.235,
      "growth": -0.9,
      "perCapita": 290.5,
      "popChangePct": 2.15
    },
    {
      "year": 1982,
      "gdp": 1.68,
      "growth": -3.3,
      "perCapita": 213.8,
      "popChangePct": 2.17
    },
    {
      "year": 1983,
      "gdp": 1.497,
      "growth": 0.3,
      "perCapita": 186.3,
      "popChangePct": 2.21
    },
    {
      "year": 1984,
      "gdp": 1.388,
      "growth": -3.9,
      "perCapita": 169.1,
      "popChangePct": 2.18
    },
    {
      "year": 1985,
      "gdp": 1.594,
      "growth": 9.6,
      "perCapita": 190.4,
      "popChangePct": 2.02
    },
    {
      "year": 1986,
      "gdp": 2.126,
      "growth": -1,
      "perCapita": 249.2,
      "popChangePct": 1.86
    },
    {
      "year": 1987,
      "gdp": 2.449,
      "growth": -0.2,
      "perCapita": 282.1,
      "popChangePct": 1.76
    },
    {
      "year": 1988,
      "gdp": 2.712,
      "growth": 8.1,
      "perCapita": 307.0,
      "popChangePct": 1.76
    },
    {
      "year": 1989,
      "gdp": 3.31,
      "growth": 3,
      "perCapita": 367.7,
      "popChangePct": 1.88
    },
    {
      "year": 1990,
      "gdp": 3.248,
      "growth": -4.6,
      "perCapita": 353.9,
      "popChangePct": 1.99
    },
    {
      "year": 1991,
      "gdp": 3.589,
      "growth": 11.7,
      "perCapita": 383.3,
      "popChangePct": 2.0
    },
    {
      "year": 1992,
      "gdp": 3.689,
      "growth": -5.6,
      "perCapita": 386.1,
      "popChangePct": 2.04
    },
    {
      "year": 1993,
      "gdp": 3.637,
      "growth": 5.4,
      "perCapita": 372.8,
      "popChangePct": 2.1
    },
    {
      "year": 1994,
      "gdp": 2.708,
      "growth": 2.2,
      "perCapita": 271.7,
      "popChangePct": 2.17
    },
    {
      "year": 1995,
      "gdp": 3.339,
      "growth": 1.6,
      "perCapita": 327.8,
      "popChangePct": 2.19
    },
    {
      "year": 1996,
      "gdp": 3.722,
      "growth": 6.4,
      "perCapita": 357.7,
      "popChangePct": 2.18
    },
    {
      "year": 1997,
      "gdp": 3.383,
      "growth": 6.4,
      "perCapita": 317.8,
      "popChangePct": 2.3
    },
    {
      "year": 1998,
      "gdp": 3.868,
      "growth": 5.5,
      "perCapita": 354.2,
      "popChangePct": 2.57
    },
    {
      "year": 1999,
      "gdp": 4.069,
      "growth": 2.4,
      "perCapita": 362.4,
      "popChangePct": 2.81
    },
    {
      "year": 2000,
      "gdp": 3.482,
      "growth": -1.6,
      "perCapita": 301.2,
      "popChangePct": 2.96
    },
    {
      "year": 2001,
      "gdp": 4.055,
      "growth": 11.8,
      "perCapita": 340.4,
      "popChangePct": 3.05
    },
    {
      "year": 2002,
      "gdp": 4.631,
      "growth": 7.4,
      "perCapita": 376.9,
      "popChangePct": 3.16
    },
    {
      "year": 2003,
      "gdp": 5.522,
      "growth": 5.2,
      "perCapita": 435.3,
      "popChangePct": 3.23
    },
    {
      "year": 2004,
      "gdp": 6.408,
      "growth": -2.8,
      "perCapita": 489.1,
      "popChangePct": 3.29
    },
    {
      "year": 2005,
      "gdp": 7.376,
      "growth": 6.9,
      "perCapita": 544.8,
      "popChangePct": 3.34
    },
    {
      "year": 2006,
      "gdp": 8.086,
      "growth": 5,
      "perCapita": 578.0,
      "popChangePct": 3.33
    },
    {
      "year": 2007,
      "gdp": 9.669,
      "growth": 4.1,
      "perCapita": 668.8,
      "popChangePct": 3.35
    },
    {
      "year": 2008,
      "gdp": 11.474,
      "growth": 4.8,
      "perCapita": 768.0,
      "popChangePct": 3.34
    },
    {
      "year": 2009,
      "gdp": 11.909,
      "growth": 4.9,
      "perCapita": 771.5,
      "popChangePct": 3.31
    },
    {
      "year": 2010,
      "gdp": 12.438,
      "growth": 5.9,
      "perCapita": 780.1,
      "popChangePct": 3.3
    },
    {
      "year": 2011,
      "gdp": 15.461,
      "growth": 3.8,
      "perCapita": 938.8,
      "popChangePct": 3.29
    },
    {
      "year": 2012,
      "gdp": 14.816,
      "growth": -0.3,
      "perCapita": 873.7,
      "popChangePct": 2.96
    },
    {
      "year": 2013,
      "gdp": 15.753,
      "growth": 3.3,
      "perCapita": 902.3,
      "popChangePct": 2.97
    },
    {
      "year": 2014,
      "gdp": 17.1,
      "growth": 6.5,
      "perCapita": 948.9,
      "popChangePct": 3.21
    },
    {
      "year": 2015,
      "gdp": 15.592,
      "growth": 6.2,
      "perCapita": 838.6,
      "popChangePct": 3.18
    },
    {
      "year": 2016,
      "gdp": 16.765,
      "growth": 6,
      "perCapita": 873.6,
      "popChangePct": 3.22
    },
    {
      "year": 2017,
      "gdp": 18.334,
      "growth": 5.4,
      "perCapita": 925.3,
      "popChangePct": 3.24
    },
    {
      "year": 2018,
      "gdp": 20.418,
      "growth": 4.9,
      "perCapita": 998.8,
      "popChangePct": 3.17
    },
    {
      "year": 2019,
      "gdp": 20.521,
      "growth": 5,
      "perCapita": 974.0,
      "popChangePct": 3.06
    },
    {
      "year": 2020,
      "gdp": 20.777,
      "growth": -1.2,
      "perCapita": 956.8,
      "popChangePct": 3.07
    },
    {
      "year": 2021,
      "gdp": 23.061,
      "growth": 3.1,
      "perCapita": 1030.0,
      "popChangePct": 3.11
    },
    {
      "year": 2022,
      "gdp": 22.657,
      "growth": 3.7,
      "perCapita": 982.0,
      "popChangePct": 3.06
    },
    {
      "year": 2023,
      "gdp": 24.817,
      "growth": 4.7,
      "perCapita": 1044.1,
      "popChangePct": 3.02
    },
    {
      "year": 2024,
      "gdp": 26.777,
      "growth": 5,
      "perCapita": 1093.1,
      "popChangePct": 3.06
    },
    {
      "year": 2025,
      "gdp": 30.05,
      "growth": 4.9,
      "perCapita": 1190.2,
      "popChangePct": 3.06
    },
    {
      "year": 2026,
      "gdp": 33.847,
      "growth": 5.5,
      "perCapita": 1300.8,
      "popChangePct": 3.06
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 36.408,
      "growth": 5.7,
      "perCapita": 1357.8,
      "popChangePct": 3.05
    },
    {
      "year": 2028,
      "gdp": 39.073,
      "growth": 5.5,
      "perCapita": 1414.1,
      "popChangePct": 3.05
    },
    {
      "year": 2029,
      "gdp": 41.924,
      "growth": 5.2,
      "perCapita": 1472.2,
      "popChangePct": 3.05
    },
    {
      "year": 2030,
      "gdp": 45.001,
      "growth": 5.3,
      "perCapita": 1533.4,
      "popChangePct": 3.06
    },
    {
      "year": 2031,
      "gdp": 48.303,
      "growth": 5.2,
      "perCapita": 1597.1,
      "popChangePct": 3.06
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.123,
      "perCapitaPPP": 813.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 6.643,
      "perCapitaPPP": 863.5,
      "perCapitaPPPChangePct": 6.2,
      "popChangePct": 2.15
    },
    {
      "year": 1982,
      "gdpPPP": 6.82,
      "perCapitaPPP": 867.7,
      "perCapitaPPPChangePct": 0.49,
      "popChangePct": 2.17
    },
    {
      "year": 1983,
      "gdpPPP": 7.11,
      "perCapitaPPP": 884.9,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 2.21
    },
    {
      "year": 1984,
      "gdpPPP": 7.076,
      "perCapitaPPP": 862.0,
      "perCapitaPPPChangePct": -2.59,
      "popChangePct": 2.18
    },
    {
      "year": 1985,
      "gdpPPP": 8.001,
      "perCapitaPPP": 955.4,
      "perCapitaPPPChangePct": 10.83,
      "popChangePct": 2.02
    },
    {
      "year": 1986,
      "gdpPPP": 8.08,
      "perCapitaPPP": 947.1,
      "perCapitaPPPChangePct": -0.86,
      "popChangePct": 1.86
    },
    {
      "year": 1987,
      "gdpPPP": 8.261,
      "perCapitaPPP": 951.5,
      "perCapitaPPPChangePct": 0.47,
      "popChangePct": 1.76
    },
    {
      "year": 1988,
      "gdpPPP": 9.244,
      "perCapitaPPP": 1046.4,
      "perCapitaPPPChangePct": 9.96,
      "popChangePct": 1.76
    },
    {
      "year": 1989,
      "gdpPPP": 9.892,
      "perCapitaPPP": 1099.1,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 1.88
    },
    {
      "year": 1990,
      "gdpPPP": 9.788,
      "perCapitaPPP": 1066.4,
      "perCapitaPPPChangePct": -2.98,
      "popChangePct": 1.99
    },
    {
      "year": 1991,
      "gdpPPP": 11.306,
      "perCapitaPPP": 1207.5,
      "perCapitaPPPChangePct": 13.24,
      "popChangePct": 2.0
    },
    {
      "year": 1992,
      "gdpPPP": 10.913,
      "perCapitaPPP": 1142.3,
      "perCapitaPPPChangePct": -5.4,
      "popChangePct": 2.04
    },
    {
      "year": 1993,
      "gdpPPP": 11.773,
      "perCapitaPPP": 1206.9,
      "perCapitaPPPChangePct": 5.65,
      "popChangePct": 2.1
    },
    {
      "year": 1994,
      "gdpPPP": 12.293,
      "perCapitaPPP": 1233.4,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.17
    },
    {
      "year": 1995,
      "gdpPPP": 12.749,
      "perCapitaPPP": 1251.7,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 2.19
    },
    {
      "year": 1996,
      "gdpPPP": 13.819,
      "perCapitaPPP": 1327.8,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": 2.18
    },
    {
      "year": 1997,
      "gdpPPP": 14.955,
      "perCapitaPPP": 1404.7,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 2.3
    },
    {
      "year": 1998,
      "gdpPPP": 15.956,
      "perCapitaPPP": 1461.2,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 2.57
    },
    {
      "year": 1999,
      "gdpPPP": 16.575,
      "perCapitaPPP": 1476.3,
      "perCapitaPPPChangePct": 1.03,
      "popChangePct": 2.81
    },
    {
      "year": 2000,
      "gdpPPP": 16.673,
      "perCapitaPPP": 1442.4,
      "perCapitaPPPChangePct": -2.3,
      "popChangePct": 2.96
    },
    {
      "year": 2001,
      "gdpPPP": 19.066,
      "perCapitaPPP": 1600.6,
      "perCapitaPPPChangePct": 10.96,
      "popChangePct": 3.05
    },
    {
      "year": 2002,
      "gdpPPP": 20.801,
      "perCapitaPPP": 1692.8,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 3.16
    },
    {
      "year": 2003,
      "gdpPPP": 22.313,
      "perCapitaPPP": 1759.0,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 3.23
    },
    {
      "year": 2004,
      "gdpPPP": 22.271,
      "perCapitaPPP": 1699.8,
      "perCapitaPPPChangePct": -3.37,
      "popChangePct": 3.29
    },
    {
      "year": 2005,
      "gdpPPP": 24.555,
      "perCapitaPPP": 1813.7,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 3.34
    },
    {
      "year": 2006,
      "gdpPPP": 26.578,
      "perCapitaPPP": 1899.7,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 3.33
    },
    {
      "year": 2007,
      "gdpPPP": 28.417,
      "perCapitaPPP": 1965.5,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 3.35
    },
    {
      "year": 2008,
      "gdpPPP": 30.347,
      "perCapitaPPP": 2031.1,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 3.34
    },
    {
      "year": 2009,
      "gdpPPP": 32.03,
      "perCapitaPPP": 2075.1,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 3.31
    },
    {
      "year": 2010,
      "gdpPPP": 34.332,
      "perCapitaPPP": 2153.1,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": 3.3
    },
    {
      "year": 2011,
      "gdpPPP": 36.372,
      "perCapitaPPP": 2208.5,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 3.29
    },
    {
      "year": 2012,
      "gdpPPP": 36.929,
      "perCapitaPPP": 2177.8,
      "perCapitaPPPChangePct": -1.39,
      "popChangePct": 2.96
    },
    {
      "year": 2013,
      "gdpPPP": 38.793,
      "perCapitaPPP": 2221.9,
      "perCapitaPPPChangePct": 2.02,
      "popChangePct": 2.97
    },
    {
      "year": 2014,
      "gdpPPP": 42.035,
      "perCapitaPPP": 2332.7,
      "perCapitaPPPChangePct": 4.99,
      "popChangePct": 3.21
    },
    {
      "year": 2015,
      "gdpPPP": 45.072,
      "perCapitaPPP": 2424.1,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 3.18
    },
    {
      "year": 2016,
      "gdpPPP": 48.233,
      "perCapitaPPP": 2513.3,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 3.22
    },
    {
      "year": 2017,
      "gdpPPP": 51.736,
      "perCapitaPPP": 2611.2,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 3.24
    },
    {
      "year": 2018,
      "gdpPPP": 54.984,
      "perCapitaPPP": 2689.7,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 3.17
    },
    {
      "year": 2019,
      "gdpPPP": 59.534,
      "perCapitaPPP": 2825.7,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 3.06
    },
    {
      "year": 2020,
      "gdpPPP": 59.279,
      "perCapitaPPP": 2730.0,
      "perCapitaPPPChangePct": -3.39,
      "popChangePct": 3.07
    },
    {
      "year": 2021,
      "gdpPPP": 62.738,
      "perCapitaPPP": 2802.2,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 3.11
    },
    {
      "year": 2022,
      "gdpPPP": 69.709,
      "perCapitaPPP": 3021.3,
      "perCapitaPPPChangePct": 7.82,
      "popChangePct": 3.06
    },
    {
      "year": 2023,
      "gdpPPP": 75.684,
      "perCapitaPPP": 3184.1,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 3.02
    },
    {
      "year": 2024,
      "gdpPPP": 81.454,
      "perCapitaPPP": 3325.1,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 3.06
    },
    {
      "year": 2025,
      "gdpPPP": 87.869,
      "perCapitaPPP": 3480.4,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 3.06
    },
    {
      "year": 2026,
      "gdpPPP": 95.358,
      "perCapitaPPP": 3664.8,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 3.06
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 103.007,
      "perCapitaPPP": 3841.6,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 3.05
    },
    {
      "year": 2028,
      "gdpPPP": 110.456,
      "perCapitaPPP": 3997.4,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 3.05
    },
    {
      "year": 2029,
      "gdpPPP": 118.322,
      "perCapitaPPP": 4155.1,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 3.05
    },
    {
      "year": 2030,
      "gdpPPP": 126.822,
      "perCapitaPPP": 4321.5,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 3.06
    },
    {
      "year": 2031,
      "gdpPPP": 135.89,
      "perCapitaPPP": 4493.2,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 3.06
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MaliGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
