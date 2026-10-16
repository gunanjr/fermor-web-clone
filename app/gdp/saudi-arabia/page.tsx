import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Saudi Arabia",
  "slug": "saudi-arabia",
  "iso3": "SAU",
  "region": "Asia",
  "rank2026": 19,
  "flagEmoji": "🇸🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Netherlands",
      "slug": "netherlands",
      "rank": 18
    },
    {
      "name": "Switzerland",
      "slug": "switzerland",
      "rank": 20
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 164.54,
      "growth": 5.8,
      "perCapita": 19543.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 184.292,
      "growth": 3,
      "perCapita": 20846.2,
      "popChangePct": 5.01
    },
    {
      "year": 1982,
      "gdp": 153.24,
      "growth": -16.1,
      "perCapita": 16507.7,
      "popChangePct": 5.0
    },
    {
      "year": 1983,
      "gdp": 129.181,
      "growth": -11,
      "perCapita": 13252.6,
      "popChangePct": 5.01
    },
    {
      "year": 1984,
      "gdp": 119.631,
      "growth": -4,
      "perCapita": 11688.0,
      "popChangePct": 5.0
    },
    {
      "year": 1985,
      "gdp": 103.894,
      "growth": -7.2,
      "perCapita": 9666.7,
      "popChangePct": 5.01
    },
    {
      "year": 1986,
      "gdp": 86.886,
      "growth": 1,
      "perCapita": 7698.9,
      "popChangePct": 5.0
    },
    {
      "year": 1987,
      "gdp": 85.582,
      "growth": -3.1,
      "perCapita": 7221.9,
      "popChangePct": 5.01
    },
    {
      "year": 1988,
      "gdp": 88.138,
      "growth": 6.6,
      "perCapita": 7083.2,
      "popChangePct": 5.0
    },
    {
      "year": 1989,
      "gdp": 95.217,
      "growth": 0.4,
      "perCapita": 7287.4,
      "popChangePct": 5.01
    },
    {
      "year": 1990,
      "gdp": 117.474,
      "growth": 9.4,
      "perCapita": 8562.3,
      "popChangePct": 5.01
    },
    {
      "year": 1991,
      "gdp": 132.047,
      "growth": 8.2,
      "perCapita": 9143.2,
      "popChangePct": 5.26
    },
    {
      "year": 1992,
      "gdp": 136.905,
      "growth": 4.6,
      "perCapita": 9242.6,
      "popChangePct": 2.56
    },
    {
      "year": 1993,
      "gdp": 132.79,
      "growth": 0.4,
      "perCapita": 8740.7,
      "popChangePct": 2.57
    },
    {
      "year": 1994,
      "gdp": 134.995,
      "growth": 1,
      "perCapita": 8663.7,
      "popChangePct": 2.57
    },
    {
      "year": 1995,
      "gdp": 143.152,
      "growth": 0.3,
      "perCapita": 8957.5,
      "popChangePct": 2.56
    },
    {
      "year": 1996,
      "gdp": 158.451,
      "growth": 3.3,
      "perCapita": 9666.9,
      "popChangePct": 2.57
    },
    {
      "year": 1997,
      "gdp": 165.742,
      "growth": 2.6,
      "perCapita": 9859.0,
      "popChangePct": 2.56
    },
    {
      "year": 1998,
      "gdp": 146.776,
      "growth": 2.8,
      "perCapita": 8512.5,
      "popChangePct": 2.56
    },
    {
      "year": 1999,
      "gdp": 161.717,
      "growth": -0.6,
      "perCapita": 9144.6,
      "popChangePct": 2.56
    },
    {
      "year": 2000,
      "gdp": 189.515,
      "growth": 4.7,
      "perCapita": 10448.6,
      "popChangePct": 2.57
    },
    {
      "year": 2001,
      "gdp": 184.138,
      "growth": 0.3,
      "perCapita": 9898.3,
      "popChangePct": 2.56
    },
    {
      "year": 2002,
      "gdp": 189.606,
      "growth": -0.7,
      "perCapita": 9937.4,
      "popChangePct": 2.56
    },
    {
      "year": 2003,
      "gdp": 215.808,
      "growth": 8.8,
      "perCapita": 11027.9,
      "popChangePct": 2.56
    },
    {
      "year": 2004,
      "gdp": 258.742,
      "growth": 8.6,
      "perCapita": 12891.3,
      "popChangePct": 2.57
    },
    {
      "year": 2005,
      "gdp": 328.205,
      "growth": 5.9,
      "perCapita": 15943.4,
      "popChangePct": 2.57
    },
    {
      "year": 2006,
      "gdp": 376.398,
      "growth": 3.3,
      "perCapita": 17827.4,
      "popChangePct": 2.56
    },
    {
      "year": 2007,
      "gdp": 415.687,
      "growth": 2.2,
      "perCapita": 19196.1,
      "popChangePct": 2.57
    },
    {
      "year": 2008,
      "gdp": 519.797,
      "growth": 6.2,
      "perCapita": 23403.7,
      "popChangePct": 2.56
    },
    {
      "year": 2009,
      "gdp": 429.098,
      "growth": -1.1,
      "perCapita": 18837.0,
      "popChangePct": 2.57
    },
    {
      "year": 2010,
      "gdp": 528.207,
      "growth": 5,
      "perCapita": 22028.4,
      "popChangePct": 5.26
    },
    {
      "year": 2011,
      "gdp": 680.661,
      "growth": 11.8,
      "perCapita": 27126.8,
      "popChangePct": 4.65
    },
    {
      "year": 2012,
      "gdp": 751.921,
      "growth": 5.8,
      "perCapita": 28733.4,
      "popChangePct": 4.29
    },
    {
      "year": 2013,
      "gdp": 769.755,
      "growth": 2.9,
      "perCapita": 27865.5,
      "popChangePct": 5.56
    },
    {
      "year": 2014,
      "gdp": 787.153,
      "growth": 4,
      "perCapita": 27805.5,
      "popChangePct": 2.48
    },
    {
      "year": 2015,
      "gdp": 693.415,
      "growth": 4.7,
      "perCapita": 23256.2,
      "popChangePct": 5.32
    },
    {
      "year": 2016,
      "gdp": 689.279,
      "growth": 1.7,
      "perCapita": 22267.7,
      "popChangePct": 3.82
    },
    {
      "year": 2017,
      "gdp": 741.266,
      "growth": 1.2,
      "perCapita": 23929.3,
      "popChangePct": 0.07
    },
    {
      "year": 2018,
      "gdp": 886.564,
      "growth": 3.2,
      "perCapita": 29360.0,
      "popChangePct": -2.52
    },
    {
      "year": 2019,
      "gdp": 888.888,
      "growth": 1.7,
      "perCapita": 29566.7,
      "popChangePct": -0.44
    },
    {
      "year": 2020,
      "gdp": 767.303,
      "growth": -3.8,
      "perCapita": 24318.3,
      "popChangePct": 4.95
    },
    {
      "year": 2021,
      "gdp": 982.661,
      "growth": 6.5,
      "perCapita": 31920.8,
      "popChangePct": -2.44
    },
    {
      "year": 2022,
      "gdp": 1239.075,
      "growth": 12,
      "perCapita": 38510.2,
      "popChangePct": 4.52
    },
    {
      "year": 2023,
      "gdp": 1218.585,
      "growth": 0.5,
      "perCapita": 36156.8,
      "popChangePct": 4.75
    },
    {
      "year": 2024,
      "gdp": 1254.141,
      "growth": 2.6,
      "perCapita": 35527.8,
      "popChangePct": 4.74
    },
    {
      "year": 2025,
      "gdp": 1276.943,
      "growth": 4.5,
      "perCapita": 35464.4,
      "popChangePct": 2.0
    },
    {
      "year": 2026,
      "gdp": 1388.676,
      "growth": 3.1,
      "perCapita": 37811.4,
      "popChangePct": 2.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1432.348,
      "growth": 4.5,
      "perCapita": 38235.8,
      "popChangePct": 2.0
    },
    {
      "year": 2028,
      "gdp": 1498.027,
      "growth": 3.6,
      "perCapita": 39205.0,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdp": 1572.125,
      "growth": 3.5,
      "perCapita": 40337.4,
      "popChangePct": 2.0
    },
    {
      "year": 2030,
      "gdp": 1649.507,
      "growth": 3.5,
      "perCapita": 41493.0,
      "popChangePct": 2.0
    },
    {
      "year": 2031,
      "gdp": 1730.075,
      "growth": 3.6,
      "perCapita": 42666.3,
      "popChangePct": 2.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 319.006,
      "perCapitaPPP": 37890.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 359.604,
      "perCapitaPPP": 40676.7,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": 5.01
    },
    {
      "year": 1982,
      "gdpPPP": 320.316,
      "perCapitaPPP": 34505.8,
      "perCapitaPPPChangePct": -15.17,
      "popChangePct": 5.0
    },
    {
      "year": 1983,
      "gdpPPP": 296.267,
      "perCapitaPPP": 30394.0,
      "perCapitaPPPChangePct": -11.92,
      "popChangePct": 5.01
    },
    {
      "year": 1984,
      "gdpPPP": 294.658,
      "perCapitaPPP": 28788.3,
      "perCapitaPPPChangePct": -5.28,
      "popChangePct": 5.0
    },
    {
      "year": 1985,
      "gdpPPP": 282.054,
      "perCapitaPPP": 26243.4,
      "perCapitaPPPChangePct": -8.84,
      "popChangePct": 5.01
    },
    {
      "year": 1986,
      "gdpPPP": 290.633,
      "perCapitaPPP": 25752.9,
      "perCapitaPPPChangePct": -1.87,
      "popChangePct": 5.0
    },
    {
      "year": 1987,
      "gdpPPP": 288.504,
      "perCapitaPPP": 24345.8,
      "perCapitaPPPChangePct": -5.46,
      "popChangePct": 5.01
    },
    {
      "year": 1988,
      "gdpPPP": 318.392,
      "perCapitaPPP": 25587.4,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": 5.0
    },
    {
      "year": 1989,
      "gdpPPP": 332.251,
      "perCapitaPPP": 25428.6,
      "perCapitaPPPChangePct": -0.62,
      "popChangePct": 5.01
    },
    {
      "year": 1990,
      "gdpPPP": 377.176,
      "perCapitaPPP": 27491.1,
      "perCapitaPPPChangePct": 8.11,
      "popChangePct": 5.01
    },
    {
      "year": 1991,
      "gdpPPP": 421.989,
      "perCapitaPPP": 29219.5,
      "perCapitaPPPChangePct": 6.29,
      "popChangePct": 5.26
    },
    {
      "year": 1992,
      "gdpPPP": 451.376,
      "perCapitaPPP": 30473.0,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 2.56
    },
    {
      "year": 1993,
      "gdpPPP": 463.829,
      "perCapitaPPP": 30530.8,
      "perCapitaPPPChangePct": 0.19,
      "popChangePct": 2.57
    },
    {
      "year": 1994,
      "gdpPPP": 478.249,
      "perCapitaPPP": 30693.0,
      "perCapitaPPPChangePct": 0.53,
      "popChangePct": 2.57
    },
    {
      "year": 1995,
      "gdpPPP": 489.797,
      "perCapitaPPP": 30648.3,
      "perCapitaPPPChangePct": -0.15,
      "popChangePct": 2.56
    },
    {
      "year": 1996,
      "gdpPPP": 515.247,
      "perCapitaPPP": 31434.8,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 2.57
    },
    {
      "year": 1997,
      "gdpPPP": 538.007,
      "perCapitaPPP": 32002.8,
      "perCapitaPPPChangePct": 1.81,
      "popChangePct": 2.56
    },
    {
      "year": 1998,
      "gdpPPP": 559.309,
      "perCapitaPPP": 32438.1,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 2.56
    },
    {
      "year": 1999,
      "gdpPPP": 563.63,
      "perCapitaPPP": 31871.5,
      "perCapitaPPPChangePct": -1.75,
      "popChangePct": 2.56
    },
    {
      "year": 2000,
      "gdpPPP": 603.593,
      "perCapitaPPP": 33278.0,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 2.57
    },
    {
      "year": 2001,
      "gdpPPP": 619.31,
      "perCapitaPPP": 33290.9,
      "perCapitaPPPChangePct": 0.04,
      "popChangePct": 2.56
    },
    {
      "year": 2002,
      "gdpPPP": 624.605,
      "perCapitaPPP": 32736.2,
      "perCapitaPPPChangePct": -1.67,
      "popChangePct": 2.56
    },
    {
      "year": 2003,
      "gdpPPP": 692.787,
      "perCapitaPPP": 35401.9,
      "perCapitaPPPChangePct": 8.14,
      "popChangePct": 2.56
    },
    {
      "year": 2004,
      "gdpPPP": 772.818,
      "perCapitaPPP": 38504.3,
      "perCapitaPPPChangePct": 8.76,
      "popChangePct": 2.57
    },
    {
      "year": 2005,
      "gdpPPP": 844.436,
      "perCapitaPPP": 41020.7,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 2.57
    },
    {
      "year": 2006,
      "gdpPPP": 899.321,
      "perCapitaPPP": 42594.7,
      "perCapitaPPPChangePct": 3.84,
      "popChangePct": 2.56
    },
    {
      "year": 2007,
      "gdpPPP": 944.133,
      "perCapitaPPP": 43599.2,
      "perCapitaPPPChangePct": 2.36,
      "popChangePct": 2.57
    },
    {
      "year": 2008,
      "gdpPPP": 1022.35,
      "perCapitaPPP": 46030.9,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 2.56
    },
    {
      "year": 2009,
      "gdpPPP": 1017.683,
      "perCapitaPPP": 44675.2,
      "perCapitaPPPChangePct": -2.95,
      "popChangePct": 2.57
    },
    {
      "year": 2010,
      "gdpPPP": 1081.961,
      "perCapitaPPP": 45122.2,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 5.26
    },
    {
      "year": 2011,
      "gdpPPP": 1234.136,
      "perCapitaPPP": 49184.7,
      "perCapitaPPPChangePct": 9.0,
      "popChangePct": 4.65
    },
    {
      "year": 2012,
      "gdpPPP": 1329.543,
      "perCapitaPPP": 50806.3,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 4.29
    },
    {
      "year": 2013,
      "gdpPPP": 1392.003,
      "perCapitaPPP": 50391.1,
      "perCapitaPPPChangePct": -0.82,
      "popChangePct": 5.56
    },
    {
      "year": 2014,
      "gdpPPP": 1473.247,
      "perCapitaPPP": 52041.1,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 2.48
    },
    {
      "year": 2015,
      "gdpPPP": 1556.137,
      "perCapitaPPP": 52190.7,
      "perCapitaPPPChangePct": 0.29,
      "popChangePct": 5.32
    },
    {
      "year": 2016,
      "gdpPPP": 1597.694,
      "perCapitaPPP": 51614.8,
      "perCapitaPPPChangePct": -1.1,
      "popChangePct": 3.82
    },
    {
      "year": 2017,
      "gdpPPP": 1645.531,
      "perCapitaPPP": 53120.4,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.07
    },
    {
      "year": 2018,
      "gdpPPP": 1792.987,
      "perCapitaPPP": 59377.7,
      "perCapitaPPPChangePct": 11.78,
      "popChangePct": -2.52
    },
    {
      "year": 2019,
      "gdpPPP": 1790.603,
      "perCapitaPPP": 59560.1,
      "perCapitaPPPChangePct": 0.31,
      "popChangePct": -0.44
    },
    {
      "year": 2020,
      "gdpPPP": 1498.062,
      "perCapitaPPP": 47478.4,
      "perCapitaPPPChangePct": -20.28,
      "popChangePct": 4.95
    },
    {
      "year": 2021,
      "gdpPPP": 1929.888,
      "perCapitaPPP": 62690.5,
      "perCapitaPPPChangePct": 32.04,
      "popChangePct": -2.44
    },
    {
      "year": 2022,
      "gdpPPP": 2315.22,
      "perCapitaPPP": 71956.6,
      "perCapitaPPPChangePct": 14.78,
      "popChangePct": 4.52
    },
    {
      "year": 2023,
      "gdpPPP": 2413.911,
      "perCapitaPPP": 71623.6,
      "perCapitaPPPChangePct": -0.46,
      "popChangePct": 4.75
    },
    {
      "year": 2024,
      "gdpPPP": 2539.368,
      "perCapitaPPP": 71936.2,
      "perCapitaPPPChangePct": 0.44,
      "popChangePct": 4.74
    },
    {
      "year": 2025,
      "gdpPPP": 2728.981,
      "perCapitaPPP": 75791.8,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 2.0
    },
    {
      "year": 2026,
      "gdpPPP": 2894.592,
      "perCapitaPPP": 78815.0,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3089.92,
      "perCapitaPPP": 82483.8,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 2.0
    },
    {
      "year": 2028,
      "gdpPPP": 3255.104,
      "perCapitaPPP": 85189.5,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdpPPP": 3430.369,
      "perCapitaPPP": 88016.0,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.0
    },
    {
      "year": 2030,
      "gdpPPP": 3616.383,
      "perCapitaPPP": 90969.4,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.0
    },
    {
      "year": 2031,
      "gdpPPP": 3812.387,
      "perCapitaPPP": 94019.4,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 2.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SaudiArabiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
