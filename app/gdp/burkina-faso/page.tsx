import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Burkina Faso",
  "slug": "burkina-faso",
  "iso3": "BFA",
  "region": "Africa",
  "rank2026": 120,
  "flagEmoji": "🇧🇫",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Albania",
      "slug": "albania",
      "rank": 119
    },
    {
      "name": "Armenia",
      "slug": "armenia",
      "rank": 121
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.386,
      "growth": 4,
      "perCapita": 337.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.076,
      "growth": 2.7,
      "perCapita": 287.1,
      "popChangePct": 2.38
    },
    {
      "year": 1982,
      "gdp": 1.934,
      "growth": 1.4,
      "perCapita": 260.9,
      "popChangePct": 2.48
    },
    {
      "year": 1983,
      "gdp": 1.767,
      "growth": -1.2,
      "perCapita": 232.5,
      "popChangePct": 2.55
    },
    {
      "year": 1984,
      "gdp": 1.579,
      "growth": 1.6,
      "perCapita": 202.6,
      "popChangePct": 2.59
    },
    {
      "year": 1985,
      "gdp": 1.746,
      "growth": 11.3,
      "perCapita": 218.3,
      "popChangePct": 2.62
    },
    {
      "year": 1986,
      "gdp": 2.29,
      "growth": 8,
      "perCapita": 278.3,
      "popChangePct": 2.86
    },
    {
      "year": 1987,
      "gdp": 2.665,
      "growth": -0.2,
      "perCapita": 315.2,
      "popChangePct": 2.77
    },
    {
      "year": 1988,
      "gdp": 2.942,
      "growth": 5.8,
      "perCapita": 338.7,
      "popChangePct": 2.72
    },
    {
      "year": 1989,
      "gdp": 2.942,
      "growth": 2.2,
      "perCapita": 329.7,
      "popChangePct": 2.69
    },
    {
      "year": 1990,
      "gdp": 3.488,
      "growth": -0.6,
      "perCapita": 380.8,
      "popChangePct": 2.67
    },
    {
      "year": 1991,
      "gdp": 3.526,
      "growth": 9.1,
      "perCapita": 375.3,
      "popChangePct": 2.58
    },
    {
      "year": 1992,
      "gdp": 3.775,
      "growth": 0.2,
      "perCapita": 392.1,
      "popChangePct": 2.49
    },
    {
      "year": 1993,
      "gdp": 3.599,
      "growth": 3.5,
      "perCapita": 364.5,
      "popChangePct": 2.52
    },
    {
      "year": 1994,
      "gdp": 2.164,
      "growth": 1.3,
      "perCapita": 213.8,
      "popChangePct": 2.55
    },
    {
      "year": 1995,
      "gdp": 2.676,
      "growth": 5.7,
      "perCapita": 257.7,
      "popChangePct": 2.6
    },
    {
      "year": 1996,
      "gdp": 2.909,
      "growth": 11,
      "perCapita": 273,
      "popChangePct": 2.59
    },
    {
      "year": 1997,
      "gdp": 2.753,
      "growth": 6.3,
      "perCapita": 251.8,
      "popChangePct": 2.61
    },
    {
      "year": 1998,
      "gdp": 3.155,
      "growth": 7.3,
      "perCapita": 280.6,
      "popChangePct": 2.81
    },
    {
      "year": 1999,
      "gdp": 3.388,
      "growth": 7.3,
      "perCapita": 292.7,
      "popChangePct": 2.97
    },
    {
      "year": 2000,
      "gdp": 2.961,
      "growth": 1.9,
      "perCapita": 248.3,
      "popChangePct": 3.03
    },
    {
      "year": 2001,
      "gdp": 3.19,
      "growth": 6.6,
      "perCapita": 259.5,
      "popChangePct": 3.09
    },
    {
      "year": 2002,
      "gdp": 3.62,
      "growth": 4.4,
      "perCapita": 285.5,
      "popChangePct": 3.14
    },
    {
      "year": 2003,
      "gdp": 4.74,
      "growth": 7.8,
      "perCapita": 362.3,
      "popChangePct": 3.17
    },
    {
      "year": 2004,
      "gdp": 5.449,
      "growth": 4.5,
      "perCapita": 403.6,
      "popChangePct": 3.19
    },
    {
      "year": 2005,
      "gdp": 6.15,
      "growth": 8.7,
      "perCapita": 441.4,
      "popChangePct": 3.19
    },
    {
      "year": 2006,
      "gdp": 6.548,
      "growth": 6.3,
      "perCapita": 455.5,
      "popChangePct": 3.17
    },
    {
      "year": 2007,
      "gdp": 7.627,
      "growth": 4.1,
      "perCapita": 514.7,
      "popChangePct": 3.07
    },
    {
      "year": 2008,
      "gdp": 9.45,
      "growth": 5.8,
      "perCapita": 619.4,
      "popChangePct": 2.98
    },
    {
      "year": 2009,
      "gdp": 9.44,
      "growth": 3,
      "perCapita": 600.9,
      "popChangePct": 2.96
    },
    {
      "year": 2010,
      "gdp": 10.118,
      "growth": 8.4,
      "perCapita": 625.5,
      "popChangePct": 2.97
    },
    {
      "year": 2011,
      "gdp": 12.078,
      "growth": 6.6,
      "perCapita": 724.9,
      "popChangePct": 3.0
    },
    {
      "year": 2012,
      "gdp": 12.569,
      "growth": 6.5,
      "perCapita": 731.9,
      "popChangePct": 3.06
    },
    {
      "year": 2013,
      "gdp": 13.444,
      "growth": 5.8,
      "perCapita": 759.8,
      "popChangePct": 3.05
    },
    {
      "year": 2014,
      "gdp": 13.947,
      "growth": 4.3,
      "perCapita": 765.1,
      "popChangePct": 3.02
    },
    {
      "year": 2015,
      "gdp": 11.833,
      "growth": 3.9,
      "perCapita": 630.2,
      "popChangePct": 3.01
    },
    {
      "year": 2016,
      "gdp": 12.829,
      "growth": 6,
      "perCapita": 663.5,
      "popChangePct": 2.97
    },
    {
      "year": 2017,
      "gdp": 14.094,
      "growth": 6.2,
      "perCapita": 708.5,
      "popChangePct": 2.89
    },
    {
      "year": 2018,
      "gdp": 15.916,
      "growth": 6.6,
      "perCapita": 778.7,
      "popChangePct": 2.73
    },
    {
      "year": 2019,
      "gdp": 16.092,
      "growth": 5.9,
      "perCapita": 767.7,
      "popChangePct": 2.56
    },
    {
      "year": 2020,
      "gdp": 17.837,
      "growth": 2,
      "perCapita": 830.5,
      "popChangePct": 2.47
    },
    {
      "year": 2021,
      "gdp": 19.708,
      "growth": 6.9,
      "perCapita": 896.0,
      "popChangePct": 2.4
    },
    {
      "year": 2022,
      "gdp": 18.662,
      "growth": 1.6,
      "perCapita": 829.1,
      "popChangePct": 2.34
    },
    {
      "year": 2023,
      "gdp": 20.116,
      "growth": 3,
      "perCapita": 873.6,
      "popChangePct": 2.3
    },
    {
      "year": 2024,
      "gdp": 23.13,
      "growth": 4.8,
      "perCapita": 982.0,
      "popChangePct": 2.29
    },
    {
      "year": 2025,
      "gdp": 27.14,
      "growth": 5,
      "perCapita": 1126.4,
      "popChangePct": 2.3
    },
    {
      "year": 2026,
      "gdp": 32.513,
      "growth": 4.9,
      "perCapita": 1319.1,
      "popChangePct": 2.3
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 36.047,
      "growth": 4.8,
      "perCapita": 1429.6,
      "popChangePct": 2.3
    },
    {
      "year": 2028,
      "gdp": 38.516,
      "growth": 4.8,
      "perCapita": 1493.3,
      "popChangePct": 2.3
    },
    {
      "year": 2029,
      "gdp": 41.19,
      "growth": 4.8,
      "perCapita": 1561.1,
      "popChangePct": 2.3
    },
    {
      "year": 2030,
      "gdp": 44.045,
      "growth": 4.8,
      "perCapita": 1631.9,
      "popChangePct": 2.3
    },
    {
      "year": 2031,
      "gdp": 47.063,
      "growth": 4.9,
      "perCapita": 1704.5,
      "popChangePct": 2.29
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.717,
      "perCapitaPPP": 384.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.053,
      "perCapitaPPP": 422.2,
      "perCapitaPPPChangePct": 9.76,
      "popChangePct": 2.38
    },
    {
      "year": 1982,
      "gdpPPP": 3.287,
      "perCapitaPPP": 443.6,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 2.48
    },
    {
      "year": 1983,
      "gdpPPP": 3.375,
      "perCapitaPPP": 444.1,
      "perCapitaPPPChangePct": 0.11,
      "popChangePct": 2.55
    },
    {
      "year": 1984,
      "gdpPPP": 3.552,
      "perCapitaPPP": 455.6,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 2.59
    },
    {
      "year": 1985,
      "gdpPPP": 4.079,
      "perCapitaPPP": 509.9,
      "perCapitaPPPChangePct": 11.9,
      "popChangePct": 2.62
    },
    {
      "year": 1986,
      "gdpPPP": 4.492,
      "perCapitaPPP": 545.9,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 2.86
    },
    {
      "year": 1987,
      "gdpPPP": 4.592,
      "perCapitaPPP": 543.0,
      "perCapitaPPPChangePct": -0.52,
      "popChangePct": 2.77
    },
    {
      "year": 1988,
      "gdpPPP": 5.03,
      "perCapitaPPP": 579.0,
      "perCapitaPPPChangePct": 6.62,
      "popChangePct": 2.72
    },
    {
      "year": 1989,
      "gdpPPP": 5.34,
      "perCapitaPPP": 598.5,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 2.69
    },
    {
      "year": 1990,
      "gdpPPP": 5.506,
      "perCapitaPPP": 601.1,
      "perCapitaPPPChangePct": 0.44,
      "popChangePct": 2.67
    },
    {
      "year": 1991,
      "gdpPPP": 6.209,
      "perCapitaPPP": 660.9,
      "perCapitaPPPChangePct": 9.94,
      "popChangePct": 2.58
    },
    {
      "year": 1992,
      "gdpPPP": 6.365,
      "perCapitaPPP": 661.0,
      "perCapitaPPPChangePct": 0.02,
      "popChangePct": 2.49
    },
    {
      "year": 1993,
      "gdpPPP": 6.741,
      "perCapitaPPP": 682.9,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 2.52
    },
    {
      "year": 1994,
      "gdpPPP": 6.976,
      "perCapitaPPP": 689.0,
      "perCapitaPPPChangePct": 0.9,
      "popChangePct": 2.55
    },
    {
      "year": 1995,
      "gdpPPP": 7.529,
      "perCapitaPPP": 724.9,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 2.6
    },
    {
      "year": 1996,
      "gdpPPP": 8.511,
      "perCapitaPPP": 798.7,
      "perCapitaPPPChangePct": 10.19,
      "popChangePct": 2.59
    },
    {
      "year": 1997,
      "gdpPPP": 9.205,
      "perCapitaPPP": 841.9,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 2.61
    },
    {
      "year": 1998,
      "gdpPPP": 9.989,
      "perCapitaPPP": 888.6,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 2.81
    },
    {
      "year": 1999,
      "gdpPPP": 10.873,
      "perCapitaPPP": 939.4,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 2.97
    },
    {
      "year": 2000,
      "gdpPPP": 11.329,
      "perCapitaPPP": 950.0,
      "perCapitaPPPChangePct": 1.13,
      "popChangePct": 3.03
    },
    {
      "year": 2001,
      "gdpPPP": 12.35,
      "perCapitaPPP": 1004.5,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 3.09
    },
    {
      "year": 2002,
      "gdpPPP": 13.088,
      "perCapitaPPP": 1032.1,
      "perCapitaPPPChangePct": 2.75,
      "popChangePct": 3.14
    },
    {
      "year": 2003,
      "gdpPPP": 14.388,
      "perCapitaPPP": 1099.8,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": 3.17
    },
    {
      "year": 2004,
      "gdpPPP": 15.437,
      "perCapitaPPP": 1143.4,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 3.19
    },
    {
      "year": 2005,
      "gdpPPP": 17.3,
      "perCapitaPPP": 1241.7,
      "perCapitaPPPChangePct": 8.6,
      "popChangePct": 3.19
    },
    {
      "year": 2006,
      "gdpPPP": 18.948,
      "perCapitaPPP": 1318.3,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 3.17
    },
    {
      "year": 2007,
      "gdpPPP": 20.262,
      "perCapitaPPP": 1367.5,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 3.07
    },
    {
      "year": 2008,
      "gdpPPP": 21.85,
      "perCapitaPPP": 1432.0,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 2.98
    },
    {
      "year": 2009,
      "gdpPPP": 22.636,
      "perCapitaPPP": 1440.9,
      "perCapitaPPPChangePct": 0.62,
      "popChangePct": 2.96
    },
    {
      "year": 2010,
      "gdpPPP": 24.846,
      "perCapitaPPP": 1535.9,
      "perCapitaPPPChangePct": 6.6,
      "popChangePct": 2.97
    },
    {
      "year": 2011,
      "gdpPPP": 27.038,
      "perCapitaPPP": 1622.8,
      "perCapitaPPPChangePct": 5.65,
      "popChangePct": 3.0
    },
    {
      "year": 2012,
      "gdpPPP": 29.319,
      "perCapitaPPP": 1707.3,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 3.06
    },
    {
      "year": 2013,
      "gdpPPP": 31.545,
      "perCapitaPPP": 1782.7,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 3.05
    },
    {
      "year": 2014,
      "gdpPPP": 33.483,
      "perCapitaPPP": 1836.8,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 3.02
    },
    {
      "year": 2015,
      "gdpPPP": 35.119,
      "perCapitaPPP": 1870.3,
      "perCapitaPPPChangePct": 1.82,
      "popChangePct": 3.01
    },
    {
      "year": 2016,
      "gdpPPP": 37.565,
      "perCapitaPPP": 1942.9,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 2.97
    },
    {
      "year": 2017,
      "gdpPPP": 40.61,
      "perCapitaPPP": 2041.3,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 2.89
    },
    {
      "year": 2018,
      "gdpPPP": 42.426,
      "perCapitaPPP": 2075.8,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": 2.73
    },
    {
      "year": 2019,
      "gdpPPP": 46.961,
      "perCapitaPPP": 2240.3,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 2.56
    },
    {
      "year": 2020,
      "gdpPPP": 51.385,
      "perCapitaPPP": 2392.4,
      "perCapitaPPPChangePct": 6.79,
      "popChangePct": 2.47
    },
    {
      "year": 2021,
      "gdpPPP": 54.69,
      "perCapitaPPP": 2486.4,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 2.4
    },
    {
      "year": 2022,
      "gdpPPP": 59.532,
      "perCapitaPPP": 2644.8,
      "perCapitaPPPChangePct": 6.37,
      "popChangePct": 2.34
    },
    {
      "year": 2023,
      "gdpPPP": 63.587,
      "perCapitaPPP": 2761.6,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 2.3
    },
    {
      "year": 2024,
      "gdpPPP": 68.294,
      "perCapitaPPP": 2899.4,
      "perCapitaPPPChangePct": 4.99,
      "popChangePct": 2.29
    },
    {
      "year": 2025,
      "gdpPPP": 73.739,
      "perCapitaPPP": 3060.3,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": 2.3
    },
    {
      "year": 2026,
      "gdpPPP": 79.537,
      "perCapitaPPP": 3226.9,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 2.3
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 85.185,
      "perCapitaPPP": 3378.5,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 2.3
    },
    {
      "year": 2028,
      "gdpPPP": 90.724,
      "perCapitaPPP": 3517.4,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 2.3
    },
    {
      "year": 2029,
      "gdpPPP": 96.775,
      "perCapitaPPP": 3667.8,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 2.3
    },
    {
      "year": 2030,
      "gdpPPP": 103.314,
      "perCapitaPPP": 3827.7,
      "perCapitaPPPChangePct": 4.36,
      "popChangePct": 2.3
    },
    {
      "year": 2031,
      "gdpPPP": 110.284,
      "perCapitaPPP": 3994.3,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 2.29
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BurkinaFasoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
