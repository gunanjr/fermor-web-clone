import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Ethiopia",
  "slug": "ethiopia",
  "iso3": "ETH",
  "region": "Africa",
  "rank2026": 72,
  "flagEmoji": "🇪🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "DR Congo",
      "slug": "dr-congo",
      "rank": 71
    },
    {
      "name": "Ghana",
      "slug": "ghana",
      "rank": 73
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 7.385,
      "growth": 4,
      "perCapita": 227.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 7.578,
      "growth": 0,
      "perCapita": 228.1,
      "popChangePct": 2.41
    },
    {
      "year": 1982,
      "gdp": 7.973,
      "growth": 1,
      "perCapita": 233.3,
      "popChangePct": 2.85
    },
    {
      "year": 1983,
      "gdp": 8.863,
      "growth": 7.8,
      "perCapita": 251.4,
      "popChangePct": 3.16
    },
    {
      "year": 1984,
      "gdp": 8.375,
      "growth": -2.3,
      "perCapita": 230.0,
      "popChangePct": 3.29
    },
    {
      "year": 1985,
      "gdp": 9.808,
      "growth": -11.4,
      "perCapita": 260.8,
      "popChangePct": 3.29
    },
    {
      "year": 1986,
      "gdp": 10.188,
      "growth": 9.7,
      "perCapita": 262.3,
      "popChangePct": 3.26
    },
    {
      "year": 1987,
      "gdp": 10.89,
      "growth": 13.9,
      "perCapita": 271.5,
      "popChangePct": 3.26
    },
    {
      "year": 1988,
      "gdp": 11.285,
      "growth": 0.6,
      "perCapita": 272.4,
      "popChangePct": 3.28
    },
    {
      "year": 1989,
      "gdp": 11.872,
      "growth": -0.5,
      "perCapita": 277.4,
      "popChangePct": 3.33
    },
    {
      "year": 1990,
      "gdp": 12.595,
      "growth": 2.6,
      "perCapita": 284.6,
      "popChangePct": 3.39
    },
    {
      "year": 1991,
      "gdp": 13.928,
      "growth": -7.2,
      "perCapita": 304.3,
      "popChangePct": 3.45
    },
    {
      "year": 1992,
      "gdp": 14.696,
      "growth": -8.9,
      "perCapita": 310.3,
      "popChangePct": 3.46
    },
    {
      "year": 1993,
      "gdp": 9.143,
      "growth": 13.4,
      "perCapita": 186.7,
      "popChangePct": 3.42
    },
    {
      "year": 1994,
      "gdp": 8.135,
      "growth": 3.5,
      "perCapita": 160.7,
      "popChangePct": 3.32
    },
    {
      "year": 1995,
      "gdp": 7.887,
      "growth": 6.1,
      "perCapita": 151.1,
      "popChangePct": 3.17
    },
    {
      "year": 1996,
      "gdp": 8.794,
      "growth": 13.5,
      "perCapita": 163.5,
      "popChangePct": 3.02
    },
    {
      "year": 1997,
      "gdp": 8.621,
      "growth": 2.8,
      "perCapita": 155.8,
      "popChangePct": 2.89
    },
    {
      "year": 1998,
      "gdp": 7.815,
      "growth": -4.2,
      "perCapita": 137.4,
      "popChangePct": 2.79
    },
    {
      "year": 1999,
      "gdp": 7.515,
      "growth": 6.3,
      "perCapita": 128.6,
      "popChangePct": 2.74
    },
    {
      "year": 2000,
      "gdp": 8.167,
      "growth": 9.8,
      "perCapita": 136.1,
      "popChangePct": 2.71
    },
    {
      "year": 2001,
      "gdp": 8.103,
      "growth": 7.4,
      "perCapita": 131.6,
      "popChangePct": 2.6
    },
    {
      "year": 2002,
      "gdp": 7.828,
      "growth": 1.6,
      "perCapita": 123.9,
      "popChangePct": 2.6
    },
    {
      "year": 2003,
      "gdp": 8.604,
      "growth": -2.1,
      "perCapita": 132.7,
      "popChangePct": 2.6
    },
    {
      "year": 2004,
      "gdp": 10.122,
      "growth": 11.7,
      "perCapita": 152.2,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdp": 12.387,
      "growth": 12.6,
      "perCapita": 181.5,
      "popChangePct": 2.6
    },
    {
      "year": 2006,
      "gdp": 15.31,
      "growth": 11.5,
      "perCapita": 218.6,
      "popChangePct": 2.6
    },
    {
      "year": 2007,
      "gdp": 19.329,
      "growth": 11.8,
      "perCapita": 266.9,
      "popChangePct": 3.42
    },
    {
      "year": 2008,
      "gdp": 26.25,
      "growth": 11.2,
      "perCapita": 350.6,
      "popChangePct": 3.39
    },
    {
      "year": 2009,
      "gdp": 28.672,
      "growth": 10,
      "perCapita": 373.2,
      "popChangePct": 2.6
    },
    {
      "year": 2010,
      "gdp": 26.887,
      "growth": 10.6,
      "perCapita": 341.1,
      "popChangePct": 2.6
    },
    {
      "year": 2011,
      "gdp": 30.48,
      "growth": 11.4,
      "perCapita": 377.7,
      "popChangePct": 2.38
    },
    {
      "year": 2012,
      "gdp": 42.221,
      "growth": 8.7,
      "perCapita": 510.5,
      "popChangePct": 2.48
    },
    {
      "year": 2013,
      "gdp": 46.544,
      "growth": 9.9,
      "perCapita": 548.9,
      "popChangePct": 2.54
    },
    {
      "year": 2014,
      "gdp": 54.165,
      "growth": 10.3,
      "perCapita": 622.6,
      "popChangePct": 2.59
    },
    {
      "year": 2015,
      "gdp": 63.081,
      "growth": 10.4,
      "perCapita": 708.0,
      "popChangePct": 2.41
    },
    {
      "year": 2016,
      "gdp": 72.12,
      "growth": 8,
      "perCapita": 790.8,
      "popChangePct": 2.36
    },
    {
      "year": 2017,
      "gdp": 76.841,
      "growth": 10.2,
      "perCapita": 822.7,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdp": 80.207,
      "growth": 7.7,
      "perCapita": 839.9,
      "popChangePct": 2.25
    },
    {
      "year": 2019,
      "gdp": 92.608,
      "growth": 9,
      "perCapita": 948.9,
      "popChangePct": 2.2
    },
    {
      "year": 2020,
      "gdp": 96.611,
      "growth": 6.1,
      "perCapita": 969.0,
      "popChangePct": 2.15
    },
    {
      "year": 2021,
      "gdp": 99.261,
      "growth": 6.3,
      "perCapita": 974.1,
      "popChangePct": 2.21
    },
    {
      "year": 2022,
      "gdp": 118.958,
      "growth": 6.4,
      "perCapita": 1142.9,
      "popChangePct": 2.14
    },
    {
      "year": 2023,
      "gdp": 159.761,
      "growth": 7.2,
      "perCapita": 1511.4,
      "popChangePct": 1.56
    },
    {
      "year": 2024,
      "gdp": 142.073,
      "growth": 8.1,
      "perCapita": 1310.6,
      "popChangePct": 2.55
    },
    {
      "year": 2025,
      "gdp": 109.109,
      "growth": 9.2,
      "perCapita": 986.5,
      "popChangePct": 2.03
    },
    {
      "year": 2026,
      "gdp": 121.527,
      "growth": 9.2,
      "perCapita": 1081.5,
      "popChangePct": 1.6
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 140.912,
      "growth": 7.9,
      "perCapita": 1234.3,
      "popChangePct": 1.6
    },
    {
      "year": 2028,
      "gdp": 160.907,
      "growth": 8.2,
      "perCapita": 1387.2,
      "popChangePct": 1.6
    },
    {
      "year": 2029,
      "gdp": 184.983,
      "growth": 8.5,
      "perCapita": 1569.6,
      "popChangePct": 1.6
    },
    {
      "year": 2030,
      "gdp": 211.587,
      "growth": 8,
      "perCapita": 1767.1,
      "popChangePct": 1.6
    },
    {
      "year": 2031,
      "gdp": 242.553,
      "growth": 7.7,
      "perCapita": 1993.8,
      "popChangePct": 1.6
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 11.919,
      "perCapitaPPP": 367.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 13.047,
      "perCapitaPPP": 392.7,
      "perCapitaPPPChangePct": 6.88,
      "popChangePct": 2.41
    },
    {
      "year": 1982,
      "gdpPPP": 13.987,
      "perCapitaPPP": 409.3,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 2.85
    },
    {
      "year": 1983,
      "gdpPPP": 15.675,
      "perCapitaPPP": 444.6,
      "perCapitaPPPChangePct": 8.63,
      "popChangePct": 3.16
    },
    {
      "year": 1984,
      "gdpPPP": 15.866,
      "perCapitaPPP": 435.7,
      "perCapitaPPPChangePct": -2.0,
      "popChangePct": 3.29
    },
    {
      "year": 1985,
      "gdpPPP": 14.5,
      "perCapitaPPP": 385.5,
      "perCapitaPPPChangePct": -11.52,
      "popChangePct": 3.29
    },
    {
      "year": 1986,
      "gdpPPP": 16.225,
      "perCapitaPPP": 417.8,
      "perCapitaPPPChangePct": 8.37,
      "popChangePct": 3.26
    },
    {
      "year": 1987,
      "gdpPPP": 18.934,
      "perCapitaPPP": 472.1,
      "perCapitaPPPChangePct": 13.01,
      "popChangePct": 3.26
    },
    {
      "year": 1988,
      "gdpPPP": 19.714,
      "perCapitaPPP": 475.9,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": 3.28
    },
    {
      "year": 1989,
      "gdpPPP": 20.393,
      "perCapitaPPP": 476.5,
      "perCapitaPPPChangePct": 0.11,
      "popChangePct": 3.33
    },
    {
      "year": 1990,
      "gdpPPP": 21.707,
      "perCapitaPPP": 490.6,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 3.39
    },
    {
      "year": 1991,
      "gdpPPP": 20.821,
      "perCapitaPPP": 454.9,
      "perCapitaPPPChangePct": -7.27,
      "popChangePct": 3.45
    },
    {
      "year": 1992,
      "gdpPPP": 19.399,
      "perCapitaPPP": 409.6,
      "perCapitaPPPChangePct": -9.95,
      "popChangePct": 3.46
    },
    {
      "year": 1993,
      "gdpPPP": 22.512,
      "perCapitaPPP": 459.6,
      "perCapitaPPPChangePct": 12.21,
      "popChangePct": 3.42
    },
    {
      "year": 1994,
      "gdpPPP": 23.795,
      "perCapitaPPP": 470.2,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 3.32
    },
    {
      "year": 1995,
      "gdpPPP": 25.781,
      "perCapitaPPP": 493.8,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 3.17
    },
    {
      "year": 1996,
      "gdpPPP": 29.805,
      "perCapitaPPP": 554.1,
      "perCapitaPPPChangePct": 12.22,
      "popChangePct": 3.02
    },
    {
      "year": 1997,
      "gdpPPP": 31.181,
      "perCapitaPPP": 563.4,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 2.89
    },
    {
      "year": 1998,
      "gdpPPP": 30.211,
      "perCapitaPPP": 531.0,
      "perCapitaPPPChangePct": -5.74,
      "popChangePct": 2.79
    },
    {
      "year": 1999,
      "gdpPPP": 32.567,
      "perCapitaPPP": 557.2,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 2.74
    },
    {
      "year": 2000,
      "gdpPPP": 36.581,
      "perCapitaPPP": 609.4,
      "perCapitaPPPChangePct": 9.36,
      "popChangePct": 2.71
    },
    {
      "year": 2001,
      "gdpPPP": 40.173,
      "perCapitaPPP": 652.3,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": 2.6
    },
    {
      "year": 2002,
      "gdpPPP": 41.45,
      "perCapitaPPP": 655.9,
      "perCapitaPPPChangePct": 0.56,
      "popChangePct": 2.6
    },
    {
      "year": 2003,
      "gdpPPP": 41.381,
      "perCapitaPPP": 638.2,
      "perCapitaPPPChangePct": -2.7,
      "popChangePct": 2.6
    },
    {
      "year": 2004,
      "gdpPPP": 47.465,
      "perCapitaPPP": 713.5,
      "perCapitaPPPChangePct": 11.8,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdpPPP": 55.122,
      "perCapitaPPP": 807.6,
      "perCapitaPPPChangePct": 13.19,
      "popChangePct": 2.6
    },
    {
      "year": 2006,
      "gdpPPP": 63.356,
      "perCapitaPPP": 904.8,
      "perCapitaPPPChangePct": 12.03,
      "popChangePct": 2.6
    },
    {
      "year": 2007,
      "gdpPPP": 72.751,
      "perCapitaPPP": 1004.6,
      "perCapitaPPPChangePct": 11.03,
      "popChangePct": 3.42
    },
    {
      "year": 2008,
      "gdpPPP": 82.458,
      "perCapitaPPP": 1101.2,
      "perCapitaPPPChangePct": 9.62,
      "popChangePct": 3.39
    },
    {
      "year": 2009,
      "gdpPPP": 91.263,
      "perCapitaPPP": 1187.9,
      "perCapitaPPPChangePct": 7.87,
      "popChangePct": 2.6
    },
    {
      "year": 2010,
      "gdpPPP": 102.163,
      "perCapitaPPP": 1296.1,
      "perCapitaPPPChangePct": 9.11,
      "popChangePct": 2.6
    },
    {
      "year": 2011,
      "gdpPPP": 116.158,
      "perCapitaPPP": 1439.4,
      "perCapitaPPPChangePct": 11.06,
      "popChangePct": 2.38
    },
    {
      "year": 2012,
      "gdpPPP": 128.615,
      "perCapitaPPP": 1555.2,
      "perCapitaPPPChangePct": 8.05,
      "popChangePct": 2.48
    },
    {
      "year": 2013,
      "gdpPPP": 143.753,
      "perCapitaPPP": 1695.2,
      "perCapitaPPPChangePct": 9.0,
      "popChangePct": 2.54
    },
    {
      "year": 2014,
      "gdpPPP": 161.322,
      "perCapitaPPP": 1854.3,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": 2.59
    },
    {
      "year": 2015,
      "gdpPPP": 179.752,
      "perCapitaPPP": 2017.4,
      "perCapitaPPPChangePct": 8.8,
      "popChangePct": 2.41
    },
    {
      "year": 2016,
      "gdpPPP": 195.977,
      "perCapitaPPP": 2148.9,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 2.36
    },
    {
      "year": 2017,
      "gdpPPP": 219.854,
      "perCapitaPPP": 2353.9,
      "perCapitaPPPChangePct": 9.54,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdpPPP": 236.067,
      "perCapitaPPP": 2471.9,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 2.25
    },
    {
      "year": 2019,
      "gdpPPP": 259.535,
      "perCapitaPPP": 2659.2,
      "perCapitaPPPChangePct": 7.58,
      "popChangePct": 2.2
    },
    {
      "year": 2020,
      "gdpPPP": 286.176,
      "perCapitaPPP": 2870.4,
      "perCapitaPPPChangePct": 7.94,
      "popChangePct": 2.15
    },
    {
      "year": 2021,
      "gdpPPP": 316.145,
      "perCapitaPPP": 3102.5,
      "perCapitaPPPChangePct": 8.09,
      "popChangePct": 2.21
    },
    {
      "year": 2022,
      "gdpPPP": 360.174,
      "perCapitaPPP": 3460.5,
      "perCapitaPPPChangePct": 11.54,
      "popChangePct": 2.14
    },
    {
      "year": 2023,
      "gdpPPP": 400.285,
      "perCapitaPPP": 3786.7,
      "perCapitaPPPChangePct": 9.43,
      "popChangePct": 1.56
    },
    {
      "year": 2024,
      "gdpPPP": 443.251,
      "perCapitaPPP": 4089.0,
      "perCapitaPPPChangePct": 7.98,
      "popChangePct": 2.55
    },
    {
      "year": 2025,
      "gdpPPP": 497.54,
      "perCapitaPPP": 4498.5,
      "perCapitaPPPChangePct": 10.02,
      "popChangePct": 2.03
    },
    {
      "year": 2026,
      "gdpPPP": 558.897,
      "perCapitaPPP": 4973.7,
      "perCapitaPPPChangePct": 10.56,
      "popChangePct": 1.6
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 616.365,
      "perCapitaPPP": 5398.8,
      "perCapitaPPPChangePct": 8.55,
      "popChangePct": 1.6
    },
    {
      "year": 2028,
      "gdpPPP": 678.062,
      "perCapitaPPP": 5845.7,
      "perCapitaPPPChangePct": 8.28,
      "popChangePct": 1.6
    },
    {
      "year": 2029,
      "gdpPPP": 748.525,
      "perCapitaPPP": 6351.5,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": 1.6
    },
    {
      "year": 2030,
      "gdpPPP": 823.248,
      "perCapitaPPP": 6875.5,
      "perCapitaPPPChangePct": 8.25,
      "popChangePct": 1.6
    },
    {
      "year": 2031,
      "gdpPPP": 902.433,
      "perCapitaPPP": 7418.2,
      "perCapitaPPPChangePct": 7.89,
      "popChangePct": 1.6
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function EthiopiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
