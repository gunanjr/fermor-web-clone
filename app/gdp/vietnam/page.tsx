import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Vietnam",
  "slug": "vietnam",
  "iso3": "VNM",
  "region": "Asia",
  "rank2026": 34,
  "flagEmoji": "🇻🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Colombia",
      "slug": "colombia",
      "rank": 33
    },
    {
      "name": "Malaysia",
      "slug": "malaysia",
      "rank": 35
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 35.357,
      "growth": -3.5,
      "perCapita": 652.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 17.617,
      "growth": 5.8,
      "perCapita": 318.5,
      "popChangePct": 2.09
    },
    {
      "year": 1982,
      "gdp": 23.369,
      "growth": 8.2,
      "perCapita": 414.3,
      "popChangePct": 1.97
    },
    {
      "year": 1983,
      "gdp": 35.204,
      "growth": 7.1,
      "perCapita": 612.6,
      "popChangePct": 1.9
    },
    {
      "year": 1984,
      "gdp": 61.171,
      "growth": 8.4,
      "perCapita": 1044.4,
      "popChangePct": 1.91
    },
    {
      "year": 1985,
      "gdp": 19.045,
      "growth": 5.6,
      "perCapita": 319.0,
      "popChangePct": 1.95
    },
    {
      "year": 1986,
      "gdp": 43.009,
      "growth": 3.4,
      "perCapita": 706.0,
      "popChangePct": 2.03
    },
    {
      "year": 1987,
      "gdp": 53.385,
      "growth": 2.5,
      "perCapita": 856.9,
      "popChangePct": 2.27
    },
    {
      "year": 1988,
      "gdp": 29.501,
      "growth": 5.1,
      "perCapita": 464.6,
      "popChangePct": 1.93
    },
    {
      "year": 1989,
      "gdp": 7.991,
      "growth": 7.8,
      "perCapita": 123.4,
      "popChangePct": 2.01
    },
    {
      "year": 1990,
      "gdp": 8.217,
      "growth": 5,
      "perCapita": 121.7,
      "popChangePct": 4.23
    },
    {
      "year": 1991,
      "gdp": 9.704,
      "growth": 5.8,
      "perCapita": 141.1,
      "popChangePct": 1.86
    },
    {
      "year": 1992,
      "gdp": 12.528,
      "growth": 8.7,
      "perCapita": 179.0,
      "popChangePct": 1.8
    },
    {
      "year": 1993,
      "gdp": 16.736,
      "growth": 8.1,
      "perCapita": 235.0,
      "popChangePct": 1.74
    },
    {
      "year": 1994,
      "gdp": 20.712,
      "growth": 8.8,
      "perCapita": 286.0,
      "popChangePct": 1.69
    },
    {
      "year": 1995,
      "gdp": 26.407,
      "growth": 9.5,
      "perCapita": 358.7,
      "popChangePct": 1.65
    },
    {
      "year": 1996,
      "gdp": 31.352,
      "growth": 9.3,
      "perCapita": 419.1,
      "popChangePct": 1.61
    },
    {
      "year": 1997,
      "gdp": 34.146,
      "growth": 8.2,
      "perCapita": 449.3,
      "popChangePct": 1.57
    },
    {
      "year": 1998,
      "gdp": 34.58,
      "growth": 5.8,
      "perCapita": 448.1,
      "popChangePct": 1.55
    },
    {
      "year": 1999,
      "gdp": 36.444,
      "growth": 4.8,
      "perCapita": 465.2,
      "popChangePct": 1.51
    },
    {
      "year": 2000,
      "gdp": 39.585,
      "growth": 6.8,
      "perCapita": 498.6,
      "popChangePct": 1.36
    },
    {
      "year": 2001,
      "gdp": 41.297,
      "growth": 6.9,
      "perCapita": 513.2,
      "popChangePct": 1.35
    },
    {
      "year": 2002,
      "gdp": 44.563,
      "growth": 7.1,
      "perCapita": 546.6,
      "popChangePct": 1.32
    },
    {
      "year": 2003,
      "gdp": 50.233,
      "growth": 7.3,
      "perCapita": 610.4,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdp": 62.877,
      "growth": 7.8,
      "perCapita": 757.0,
      "popChangePct": 0.92
    },
    {
      "year": 2005,
      "gdp": 73.197,
      "growth": 7.5,
      "perCapita": 873.1,
      "popChangePct": 0.93
    },
    {
      "year": 2006,
      "gdp": 84.301,
      "growth": 7,
      "perCapita": 996.3,
      "popChangePct": 0.94
    },
    {
      "year": 2007,
      "gdp": 98.426,
      "growth": 7.1,
      "perCapita": 1152.3,
      "popChangePct": 0.95
    },
    {
      "year": 2008,
      "gdp": 124.756,
      "growth": 5.7,
      "perCapita": 1446.6,
      "popChangePct": 0.96
    },
    {
      "year": 2009,
      "gdp": 129.022,
      "growth": 5.4,
      "perCapita": 1481.4,
      "popChangePct": 0.98
    },
    {
      "year": 2010,
      "gdp": 143.287,
      "growth": 6.4,
      "perCapita": 1628.9,
      "popChangePct": 1.01
    },
    {
      "year": 2011,
      "gdp": 171.367,
      "growth": 6.4,
      "perCapita": 1950.5,
      "popChangePct": -0.12
    },
    {
      "year": 2012,
      "gdp": 195.167,
      "growth": 5.5,
      "perCapita": 2197.6,
      "popChangePct": 1.08
    },
    {
      "year": 2013,
      "gdp": 212.737,
      "growth": 5.6,
      "perCapita": 2370.1,
      "popChangePct": 1.07
    },
    {
      "year": 2014,
      "gdp": 232.891,
      "growth": 6.4,
      "perCapita": 2566.9,
      "popChangePct": 1.08
    },
    {
      "year": 2015,
      "gdp": 236.839,
      "growth": 7,
      "perCapita": 2582.4,
      "popChangePct": 1.08
    },
    {
      "year": 2016,
      "gdp": 252.139,
      "growth": 6.7,
      "perCapita": 2720.1,
      "popChangePct": 1.07
    },
    {
      "year": 2017,
      "gdp": 277.076,
      "growth": 6.9,
      "perCapita": 2958.0,
      "popChangePct": 1.05
    },
    {
      "year": 2018,
      "gdp": 304.474,
      "growth": 7.5,
      "perCapita": 3216.3,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdp": 331.811,
      "growth": 7.4,
      "perCapita": 3439.0,
      "popChangePct": 1.92
    },
    {
      "year": 2020,
      "gdp": 346.283,
      "growth": 2.9,
      "perCapita": 3548.6,
      "popChangePct": 1.14
    },
    {
      "year": 2021,
      "gdp": 370.065,
      "growth": 2.6,
      "perCapita": 3756.8,
      "popChangePct": 0.95
    },
    {
      "year": 2022,
      "gdp": 411.031,
      "growth": 8.5,
      "perCapita": 4132.6,
      "popChangePct": 0.97
    },
    {
      "year": 2023,
      "gdp": 432.981,
      "growth": 5.1,
      "perCapita": 4316.5,
      "popChangePct": 0.85
    },
    {
      "year": 2024,
      "gdp": 459.448,
      "growth": 7,
      "perCapita": 4535.5,
      "popChangePct": 0.99
    },
    {
      "year": 2025,
      "gdp": 494.046,
      "growth": 8,
      "perCapita": 4829.4,
      "popChangePct": 0.99
    },
    {
      "year": 2026,
      "gdp": 527.266,
      "growth": 7.1,
      "perCapita": 5115.2,
      "popChangePct": 0.76
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 557.405,
      "growth": 6.7,
      "perCapita": 5372.3,
      "popChangePct": 0.66
    },
    {
      "year": 2028,
      "gdp": 594.826,
      "growth": 6.2,
      "perCapita": 5698.4,
      "popChangePct": 0.61
    },
    {
      "year": 2029,
      "gdp": 631.081,
      "growth": 5.6,
      "perCapita": 6010.1,
      "popChangePct": 0.59
    },
    {
      "year": 2030,
      "gdp": 667.52,
      "growth": 5.4,
      "perCapita": 6322.8,
      "popChangePct": 0.54
    },
    {
      "year": 2031,
      "gdp": 705.443,
      "growth": 5.4,
      "perCapita": 6652.0,
      "popChangePct": 0.45
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 31.438,
      "perCapitaPPP": 580.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 36.407,
      "perCapitaPPP": 658.2,
      "perCapitaPPPChangePct": 13.44,
      "popChangePct": 2.09
    },
    {
      "year": 1982,
      "gdpPPP": 41.807,
      "perCapitaPPP": 741.3,
      "perCapitaPPPChangePct": 12.61,
      "popChangePct": 1.97
    },
    {
      "year": 1983,
      "gdpPPP": 46.526,
      "perCapitaPPP": 809.6,
      "perCapitaPPPChangePct": 9.21,
      "popChangePct": 1.9
    },
    {
      "year": 1984,
      "gdpPPP": 52.253,
      "perCapitaPPP": 892.1,
      "perCapitaPPPChangePct": 10.2,
      "popChangePct": 1.91
    },
    {
      "year": 1985,
      "gdpPPP": 56.935,
      "perCapitaPPP": 953.5,
      "perCapitaPPPChangePct": 6.88,
      "popChangePct": 1.95
    },
    {
      "year": 1986,
      "gdpPPP": 60.031,
      "perCapitaPPP": 985.4,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 2.03
    },
    {
      "year": 1987,
      "gdpPPP": 63.086,
      "perCapitaPPP": 1012.6,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 2.27
    },
    {
      "year": 1988,
      "gdpPPP": 68.642,
      "perCapitaPPP": 1081.0,
      "perCapitaPPPChangePct": 6.75,
      "popChangePct": 1.93
    },
    {
      "year": 1989,
      "gdpPPP": 76.898,
      "perCapitaPPP": 1187.2,
      "perCapitaPPPChangePct": 9.82,
      "popChangePct": 2.01
    },
    {
      "year": 1990,
      "gdpPPP": 83.802,
      "perCapitaPPP": 1241.3,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 4.23
    },
    {
      "year": 1991,
      "gdpPPP": 91.669,
      "perCapitaPPP": 1333.1,
      "perCapitaPPPChangePct": 7.39,
      "popChangePct": 1.86
    },
    {
      "year": 1992,
      "gdpPPP": 101.915,
      "perCapitaPPP": 1455.9,
      "perCapitaPPPChangePct": 9.22,
      "popChangePct": 1.8
    },
    {
      "year": 1993,
      "gdpPPP": 112.759,
      "perCapitaPPP": 1583.2,
      "perCapitaPPPChangePct": 8.74,
      "popChangePct": 1.74
    },
    {
      "year": 1994,
      "gdpPPP": 125.34,
      "perCapitaPPP": 1730.5,
      "perCapitaPPPChangePct": 9.31,
      "popChangePct": 1.69
    },
    {
      "year": 1995,
      "gdpPPP": 140.177,
      "perCapitaPPP": 1903.9,
      "perCapitaPPPChangePct": 10.02,
      "popChangePct": 1.65
    },
    {
      "year": 1996,
      "gdpPPP": 156.075,
      "perCapitaPPP": 2086.2,
      "perCapitaPPPChangePct": 9.57,
      "popChangePct": 1.61
    },
    {
      "year": 1997,
      "gdpPPP": 171.709,
      "perCapitaPPP": 2259.6,
      "perCapitaPPPChangePct": 8.31,
      "popChangePct": 1.57
    },
    {
      "year": 1998,
      "gdpPPP": 183.649,
      "perCapitaPPP": 2379.9,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 1.55
    },
    {
      "year": 1999,
      "gdpPPP": 195.138,
      "perCapitaPPP": 2491.1,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 1.51
    },
    {
      "year": 2000,
      "gdpPPP": 213.103,
      "perCapitaPPP": 2684.1,
      "perCapitaPPPChangePct": 7.75,
      "popChangePct": 1.36
    },
    {
      "year": 2001,
      "gdpPPP": 232.925,
      "perCapitaPPP": 2894.6,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 1.35
    },
    {
      "year": 2002,
      "gdpPPP": 253.293,
      "perCapitaPPP": 3106.6,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 1.32
    },
    {
      "year": 2003,
      "gdpPPP": 277.256,
      "perCapitaPPP": 3368.8,
      "perCapitaPPPChangePct": 8.44,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdpPPP": 306.888,
      "perCapitaPPP": 3694.7,
      "perCapitaPPPChangePct": 9.67,
      "popChangePct": 0.92
    },
    {
      "year": 2005,
      "gdpPPP": 340.4,
      "perCapitaPPP": 4060.5,
      "perCapitaPPPChangePct": 9.9,
      "popChangePct": 0.93
    },
    {
      "year": 2006,
      "gdpPPP": 375.383,
      "perCapitaPPP": 4436.2,
      "perCapitaPPPChangePct": 9.25,
      "popChangePct": 0.94
    },
    {
      "year": 2007,
      "gdpPPP": 413.041,
      "perCapitaPPP": 4835.4,
      "perCapitaPPPChangePct": 9.0,
      "popChangePct": 0.95
    },
    {
      "year": 2008,
      "gdpPPP": 444.833,
      "perCapitaPPP": 5157.9,
      "perCapitaPPPChangePct": 6.67,
      "popChangePct": 0.96
    },
    {
      "year": 2009,
      "gdpPPP": 471.737,
      "perCapitaPPP": 5416.5,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 0.98
    },
    {
      "year": 2010,
      "gdpPPP": 508.139,
      "perCapitaPPP": 5776.4,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": 1.01
    },
    {
      "year": 2011,
      "gdpPPP": 551.883,
      "perCapitaPPP": 6281.4,
      "perCapitaPPPChangePct": 8.74,
      "popChangePct": -0.12
    },
    {
      "year": 2012,
      "gdpPPP": 593.103,
      "perCapitaPPP": 6678.4,
      "perCapitaPPPChangePct": 6.32,
      "popChangePct": 1.08
    },
    {
      "year": 2013,
      "gdpPPP": 636.697,
      "perCapitaPPP": 7093.4,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 1.07
    },
    {
      "year": 2014,
      "gdpPPP": 689.389,
      "perCapitaPPP": 7598.3,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": 1.08
    },
    {
      "year": 2015,
      "gdpPPP": 744.402,
      "perCapitaPPP": 8116.6,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 1.08
    },
    {
      "year": 2016,
      "gdpPPP": 801.749,
      "perCapitaPPP": 8649.3,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": 1.07
    },
    {
      "year": 2017,
      "gdpPPP": 872.747,
      "perCapitaPPP": 9317.1,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": 1.05
    },
    {
      "year": 2018,
      "gdpPPP": 963.333,
      "perCapitaPPP": 10176.1,
      "perCapitaPPPChangePct": 9.22,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdpPPP": 1071.756,
      "perCapitaPPP": 11108.1,
      "perCapitaPPPChangePct": 9.16,
      "popChangePct": 1.92
    },
    {
      "year": 2020,
      "gdpPPP": 1138.632,
      "perCapitaPPP": 11668.4,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 1.14
    },
    {
      "year": 2021,
      "gdpPPP": 1192.059,
      "perCapitaPPP": 12101.4,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 0.95
    },
    {
      "year": 2022,
      "gdpPPP": 1385.854,
      "perCapitaPPP": 13933.5,
      "perCapitaPPPChangePct": 15.14,
      "popChangePct": 0.97
    },
    {
      "year": 2023,
      "gdpPPP": 1509.922,
      "perCapitaPPP": 15052.7,
      "perCapitaPPPChangePct": 8.03,
      "popChangePct": 0.85
    },
    {
      "year": 2024,
      "gdpPPP": 1654.976,
      "perCapitaPPP": 16337.4,
      "perCapitaPPPChangePct": 8.53,
      "popChangePct": 0.99
    },
    {
      "year": 2025,
      "gdpPPP": 1838.398,
      "perCapitaPPP": 17970.7,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 0.99
    },
    {
      "year": 2026,
      "gdpPPP": 2025.331,
      "perCapitaPPP": 19648.6,
      "perCapitaPPPChangePct": 9.34,
      "popChangePct": 0.76
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2208.482,
      "perCapitaPPP": 21285.4,
      "perCapitaPPPChangePct": 8.33,
      "popChangePct": 0.66
    },
    {
      "year": 2028,
      "gdpPPP": 2383.905,
      "perCapitaPPP": 22837.6,
      "perCapitaPPPChangePct": 7.29,
      "popChangePct": 0.61
    },
    {
      "year": 2029,
      "gdpPPP": 2562.166,
      "perCapitaPPP": 24400.6,
      "perCapitaPPPChangePct": 6.84,
      "popChangePct": 0.59
    },
    {
      "year": 2030,
      "gdpPPP": 2749.885,
      "perCapitaPPP": 26047.1,
      "perCapitaPPPChangePct": 6.75,
      "popChangePct": 0.54
    },
    {
      "year": 2031,
      "gdpPPP": 2950.423,
      "perCapitaPPP": 27820.9,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 0.45
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function VietnamGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
