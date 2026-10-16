import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Mozambique",
  "slug": "mozambique",
  "iso3": "MOZ",
  "region": "Africa",
  "rank2026": 132,
  "flagEmoji": "🇲🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Gabon",
      "slug": "gabon",
      "rank": 131
    },
    {
      "name": "Jamaica",
      "slug": "jamaica",
      "rank": 133
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.615,
      "growth": 4.2,
      "perCapita": 396.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.585,
      "growth": 5,
      "perCapita": 300.9,
      "popChangePct": 2.43
    },
    {
      "year": 1982,
      "gdp": 3.662,
      "growth": -6.9,
      "perCapita": 300.4,
      "popChangePct": 2.33
    },
    {
      "year": 1983,
      "gdp": 3.28,
      "growth": -15.7,
      "perCapita": 263.7,
      "popChangePct": 2.05
    },
    {
      "year": 1984,
      "gdp": 3.417,
      "growth": -6.5,
      "perCapita": 270.4,
      "popChangePct": 1.58
    },
    {
      "year": 1985,
      "gdp": 4.516,
      "growth": 1,
      "perCapita": 353.8,
      "popChangePct": 1.01
    },
    {
      "year": 1986,
      "gdp": 5.301,
      "growth": -2.3,
      "perCapita": 413.8,
      "popChangePct": 0.35
    },
    {
      "year": 1987,
      "gdp": 2.395,
      "growth": 14.7,
      "perCapita": 187.3,
      "popChangePct": -0.18
    },
    {
      "year": 1988,
      "gdp": 2.105,
      "growth": 8.2,
      "perCapita": 165.0,
      "popChangePct": -0.22
    },
    {
      "year": 1989,
      "gdp": 2.199,
      "growth": 6.5,
      "perCapita": 171.7,
      "popChangePct": 0.38
    },
    {
      "year": 1990,
      "gdp": 3.529,
      "growth": 1,
      "perCapita": 271.7,
      "popChangePct": 1.41
    },
    {
      "year": 1991,
      "gdp": 3.855,
      "growth": 6.6,
      "perCapita": 289.2,
      "popChangePct": 2.63
    },
    {
      "year": 1992,
      "gdp": 2.799,
      "growth": -7.6,
      "perCapita": 202.7,
      "popChangePct": 3.59
    },
    {
      "year": 1993,
      "gdp": 2.883,
      "growth": 10.9,
      "perCapita": 200.6,
      "popChangePct": 4.09
    },
    {
      "year": 1994,
      "gdp": 2.958,
      "growth": 6.4,
      "perCapita": 197.9,
      "popChangePct": 4.02
    },
    {
      "year": 1995,
      "gdp": 3.062,
      "growth": 2.1,
      "perCapita": 197.7,
      "popChangePct": 3.58
    },
    {
      "year": 1996,
      "gdp": 4.03,
      "growth": 10.7,
      "perCapita": 252.5,
      "popChangePct": 3.08
    },
    {
      "year": 1997,
      "gdp": 4.874,
      "growth": 11.8,
      "perCapita": 297.2,
      "popChangePct": 2.74
    },
    {
      "year": 1998,
      "gdp": 5.551,
      "growth": 10.4,
      "perCapita": 330.1,
      "popChangePct": 2.54
    },
    {
      "year": 1999,
      "gdp": 6.285,
      "growth": 11.8,
      "perCapita": 364.5,
      "popChangePct": 2.56
    },
    {
      "year": 2000,
      "gdp": 5.931,
      "growth": 0.8,
      "perCapita": 334.8,
      "popChangePct": 2.71
    },
    {
      "year": 2001,
      "gdp": 5.65,
      "growth": 12.9,
      "perCapita": 310.1,
      "popChangePct": 2.88
    },
    {
      "year": 2002,
      "gdp": 5.951,
      "growth": 9.7,
      "perCapita": 317.1,
      "popChangePct": 2.97
    },
    {
      "year": 2003,
      "gdp": 6.584,
      "growth": 7.2,
      "perCapita": 340.6,
      "popChangePct": 3.02
    },
    {
      "year": 2004,
      "gdp": 7.937,
      "growth": 8.2,
      "perCapita": 398.6,
      "popChangePct": 3.0
    },
    {
      "year": 2005,
      "gdp": 8.868,
      "growth": 6.3,
      "perCapita": 432.7,
      "popChangePct": 2.93
    },
    {
      "year": 2006,
      "gdp": 9.51,
      "growth": 9.9,
      "perCapita": 451.1,
      "popChangePct": 2.86
    },
    {
      "year": 2007,
      "gdp": 10.811,
      "growth": 7.6,
      "perCapita": 498.8,
      "popChangePct": 2.81
    },
    {
      "year": 2008,
      "gdp": 12.92,
      "growth": 6.9,
      "perCapita": 580.0,
      "popChangePct": 2.79
    },
    {
      "year": 2009,
      "gdp": 12.264,
      "growth": 5.9,
      "perCapita": 535.7,
      "popChangePct": 2.77
    },
    {
      "year": 2010,
      "gdp": 11.412,
      "growth": 6.7,
      "perCapita": 485.0,
      "popChangePct": 2.78
    },
    {
      "year": 2011,
      "gdp": 14.619,
      "growth": 7.1,
      "perCapita": 604.4,
      "popChangePct": 2.79
    },
    {
      "year": 2012,
      "gdp": 16.688,
      "growth": 8,
      "perCapita": 671.2,
      "popChangePct": 2.79
    },
    {
      "year": 2013,
      "gdp": 17.198,
      "growth": 6.6,
      "perCapita": 672.8,
      "popChangePct": 2.81
    },
    {
      "year": 2014,
      "gdp": 17.978,
      "growth": 7.7,
      "perCapita": 683.9,
      "popChangePct": 2.84
    },
    {
      "year": 2015,
      "gdp": 16.209,
      "growth": 7.4,
      "perCapita": 599.4,
      "popChangePct": 2.88
    },
    {
      "year": 2016,
      "gdp": 12.069,
      "growth": 4.7,
      "perCapita": 433.7,
      "popChangePct": 2.91
    },
    {
      "year": 2017,
      "gdp": 13.265,
      "growth": 2.6,
      "perCapita": 463.0,
      "popChangePct": 2.94
    },
    {
      "year": 2018,
      "gdp": 15.017,
      "growth": 3.5,
      "perCapita": 510.4,
      "popChangePct": 2.71
    },
    {
      "year": 2019,
      "gdp": 15.513,
      "growth": 2.3,
      "perCapita": 512.2,
      "popChangePct": 2.93
    },
    {
      "year": 2020,
      "gdp": 14.235,
      "growth": -1.2,
      "perCapita": 456.6,
      "popChangePct": 2.95
    },
    {
      "year": 2021,
      "gdp": 16.168,
      "growth": 2.4,
      "perCapita": 504.0,
      "popChangePct": 2.88
    },
    {
      "year": 2022,
      "gdp": 18.884,
      "growth": 4.4,
      "perCapita": 572.8,
      "popChangePct": 2.78
    },
    {
      "year": 2023,
      "gdp": 20.921,
      "growth": 5.5,
      "perCapita": 617.2,
      "popChangePct": 2.81
    },
    {
      "year": 2024,
      "gdp": 22.745,
      "growth": 2.1,
      "perCapita": 652.5,
      "popChangePct": 2.84
    },
    {
      "year": 2025,
      "gdp": 22.338,
      "growth": -0.5,
      "perCapita": 623.4,
      "popChangePct": 2.8
    },
    {
      "year": 2026,
      "gdp": 23.275,
      "growth": 0.5,
      "perCapita": 632.0,
      "popChangePct": 2.77
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 24.65,
      "growth": 2.7,
      "perCapita": 651.6,
      "popChangePct": 2.73
    },
    {
      "year": 2028,
      "gdp": 25.695,
      "growth": 2.2,
      "perCapita": 661.4,
      "popChangePct": 2.69
    },
    {
      "year": 2029,
      "gdp": 27.043,
      "growth": 3.1,
      "perCapita": 678.1,
      "popChangePct": 2.65
    },
    {
      "year": 2030,
      "gdp": 30.902,
      "growth": 12.1,
      "perCapita": 755.2,
      "popChangePct": 2.61
    },
    {
      "year": 2031,
      "gdp": 35.57,
      "growth": 13,
      "perCapita": 847.4,
      "popChangePct": 2.57
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.294,
      "perCapitaPPP": 197.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.636,
      "perCapitaPPP": 221.3,
      "perCapitaPPPChangePct": 12.2,
      "popChangePct": 2.43
    },
    {
      "year": 1982,
      "gdpPPP": 2.606,
      "perCapitaPPP": 213.8,
      "perCapitaPPPChangePct": -3.39,
      "popChangePct": 2.33
    },
    {
      "year": 1983,
      "gdpPPP": 2.283,
      "perCapitaPPP": 183.5,
      "perCapitaPPPChangePct": -14.16,
      "popChangePct": 2.05
    },
    {
      "year": 1984,
      "gdpPPP": 2.211,
      "perCapitaPPP": 175.0,
      "perCapitaPPPChangePct": -4.63,
      "popChangePct": 1.58
    },
    {
      "year": 1985,
      "gdpPPP": 2.304,
      "perCapitaPPP": 180.5,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 1.01
    },
    {
      "year": 1986,
      "gdpPPP": 2.296,
      "perCapitaPPP": 179.3,
      "perCapitaPPPChangePct": -0.68,
      "popChangePct": 0.35
    },
    {
      "year": 1987,
      "gdpPPP": 2.699,
      "perCapitaPPP": 211.1,
      "perCapitaPPPChangePct": 17.75,
      "popChangePct": -0.18
    },
    {
      "year": 1988,
      "gdpPPP": 3.024,
      "perCapitaPPP": 237.0,
      "perCapitaPPPChangePct": 12.26,
      "popChangePct": -0.22
    },
    {
      "year": 1989,
      "gdpPPP": 3.346,
      "perCapitaPPP": 261.3,
      "perCapitaPPPChangePct": 10.26,
      "popChangePct": 0.38
    },
    {
      "year": 1990,
      "gdpPPP": 3.506,
      "perCapitaPPP": 270.0,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 1.41
    },
    {
      "year": 1991,
      "gdpPPP": 3.862,
      "perCapitaPPP": 289.8,
      "perCapitaPPPChangePct": 7.34,
      "popChangePct": 2.63
    },
    {
      "year": 1992,
      "gdpPPP": 3.651,
      "perCapitaPPP": 264.5,
      "perCapitaPPPChangePct": -8.74,
      "popChangePct": 3.59
    },
    {
      "year": 1993,
      "gdpPPP": 4.147,
      "perCapitaPPP": 288.5,
      "perCapitaPPPChangePct": 9.11,
      "popChangePct": 4.09
    },
    {
      "year": 1994,
      "gdpPPP": 4.508,
      "perCapitaPPP": 301.6,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 4.02
    },
    {
      "year": 1995,
      "gdpPPP": 4.7,
      "perCapitaPPP": 303.6,
      "perCapitaPPPChangePct": 0.66,
      "popChangePct": 3.58
    },
    {
      "year": 1996,
      "gdpPPP": 5.298,
      "perCapitaPPP": 332.0,
      "perCapitaPPPChangePct": 9.35,
      "popChangePct": 3.08
    },
    {
      "year": 1997,
      "gdpPPP": 6.026,
      "perCapitaPPP": 367.5,
      "perCapitaPPPChangePct": 10.71,
      "popChangePct": 2.74
    },
    {
      "year": 1998,
      "gdpPPP": 6.726,
      "perCapitaPPP": 400.0,
      "perCapitaPPPChangePct": 8.84,
      "popChangePct": 2.54
    },
    {
      "year": 1999,
      "gdpPPP": 7.627,
      "perCapitaPPP": 442.3,
      "perCapitaPPPChangePct": 10.57,
      "popChangePct": 2.56
    },
    {
      "year": 2000,
      "gdpPPP": 7.86,
      "perCapitaPPP": 443.7,
      "perCapitaPPPChangePct": 0.33,
      "popChangePct": 2.71
    },
    {
      "year": 2001,
      "gdpPPP": 9.069,
      "perCapitaPPP": 497.7,
      "perCapitaPPPChangePct": 12.16,
      "popChangePct": 2.88
    },
    {
      "year": 2002,
      "gdpPPP": 10.101,
      "perCapitaPPP": 538.3,
      "perCapitaPPPChangePct": 8.15,
      "popChangePct": 2.97
    },
    {
      "year": 2003,
      "gdpPPP": 11.044,
      "perCapitaPPP": 571.3,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 3.02
    },
    {
      "year": 2004,
      "gdpPPP": 12.271,
      "perCapitaPPP": 616.3,
      "perCapitaPPPChangePct": 7.88,
      "popChangePct": 3.0
    },
    {
      "year": 2005,
      "gdpPPP": 13.455,
      "perCapitaPPP": 656.5,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 2.93
    },
    {
      "year": 2006,
      "gdpPPP": 15.244,
      "perCapitaPPP": 723.2,
      "perCapitaPPPChangePct": 10.15,
      "popChangePct": 2.86
    },
    {
      "year": 2007,
      "gdpPPP": 16.855,
      "perCapitaPPP": 777.7,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 2.81
    },
    {
      "year": 2008,
      "gdpPPP": 18.361,
      "perCapitaPPP": 824.2,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": 2.79
    },
    {
      "year": 2009,
      "gdpPPP": 19.57,
      "perCapitaPPP": 854.8,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 2.77
    },
    {
      "year": 2010,
      "gdpPPP": 21.131,
      "perCapitaPPP": 898.0,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 2.78
    },
    {
      "year": 2011,
      "gdpPPP": 23.106,
      "perCapitaPPP": 955.3,
      "perCapitaPPPChangePct": 6.38,
      "popChangePct": 2.79
    },
    {
      "year": 2012,
      "gdpPPP": 25.417,
      "perCapitaPPP": 1022.3,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": 2.79
    },
    {
      "year": 2013,
      "gdpPPP": 27.549,
      "perCapitaPPP": 1077.8,
      "perCapitaPPPChangePct": 5.43,
      "popChangePct": 2.81
    },
    {
      "year": 2014,
      "gdpPPP": 30.187,
      "perCapitaPPP": 1148.4,
      "perCapitaPPPChangePct": 6.55,
      "popChangePct": 2.84
    },
    {
      "year": 2015,
      "gdpPPP": 32.72,
      "perCapitaPPP": 1210.0,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 2.88
    },
    {
      "year": 2016,
      "gdpPPP": 34.582,
      "perCapitaPPP": 1242.6,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 2.91
    },
    {
      "year": 2017,
      "gdpPPP": 36.13,
      "perCapitaPPP": 1261.1,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 2.94
    },
    {
      "year": 2018,
      "gdpPPP": 38.467,
      "perCapitaPPP": 1307.3,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 2.71
    },
    {
      "year": 2019,
      "gdpPPP": 41.503,
      "perCapitaPPP": 1370.4,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 2.93
    },
    {
      "year": 2020,
      "gdpPPP": 43.455,
      "perCapitaPPP": 1393.8,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 2.95
    },
    {
      "year": 2021,
      "gdpPPP": 46.206,
      "perCapitaPPP": 1440.5,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 2.88
    },
    {
      "year": 2022,
      "gdpPPP": 51.655,
      "perCapitaPPP": 1566.7,
      "perCapitaPPPChangePct": 8.77,
      "popChangePct": 2.78
    },
    {
      "year": 2023,
      "gdpPPP": 56.514,
      "perCapitaPPP": 1667.2,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 2.81
    },
    {
      "year": 2024,
      "gdpPPP": 59.162,
      "perCapitaPPP": 1697.2,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 2.84
    },
    {
      "year": 2025,
      "gdpPPP": 60.521,
      "perCapitaPPP": 1688.9,
      "perCapitaPPPChangePct": -0.49,
      "popChangePct": 2.8
    },
    {
      "year": 2026,
      "gdpPPP": 62.578,
      "perCapitaPPP": 1699.3,
      "perCapitaPPPChangePct": 0.62,
      "popChangePct": 2.77
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 65.699,
      "perCapitaPPP": 1736.6,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 2.73
    },
    {
      "year": 2028,
      "gdpPPP": 68.236,
      "perCapitaPPP": 1756.4,
      "perCapitaPPPChangePct": 1.14,
      "popChangePct": 2.69
    },
    {
      "year": 2029,
      "gdpPPP": 71.583,
      "perCapitaPPP": 1795.0,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.65
    },
    {
      "year": 2030,
      "gdpPPP": 81.72,
      "perCapitaPPP": 1997.0,
      "perCapitaPPPChangePct": 11.26,
      "popChangePct": 2.61
    },
    {
      "year": 2031,
      "gdpPPP": 94.043,
      "perCapitaPPP": 2240.6,
      "perCapitaPPPChangePct": 12.19,
      "popChangePct": 2.57
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MozambiqueGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
