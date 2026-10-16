import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Costa Rica",
  "slug": "costa-rica",
  "iso3": "CRI",
  "region": "Americas",
  "rank2026": 80,
  "flagEmoji": "🇨🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Luxembourg",
      "slug": "luxembourg",
      "rank": 79
    },
    {
      "name": "Lithuania",
      "slug": "lithuania",
      "rank": 81
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.854,
      "growth": 0.8,
      "perCapita": 2108.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.636,
      "growth": -2.3,
      "perCapita": 1111.3,
      "popChangePct": 3.04
    },
    {
      "year": 1982,
      "gdp": 2.619,
      "growth": -7.3,
      "perCapita": 1071.9,
      "popChangePct": 2.99
    },
    {
      "year": 1983,
      "gdp": 3.162,
      "growth": 2.9,
      "perCapita": 1257.4,
      "popChangePct": 2.91
    },
    {
      "year": 1984,
      "gdp": 3.678,
      "growth": 8,
      "perCapita": 1421.2,
      "popChangePct": 2.94
    },
    {
      "year": 1985,
      "gdp": 3.941,
      "growth": 0.7,
      "perCapita": 1478.4,
      "popChangePct": 3.01
    },
    {
      "year": 1986,
      "gdp": 4.425,
      "growth": 5.5,
      "perCapita": 1611.3,
      "popChangePct": 3.0
    },
    {
      "year": 1987,
      "gdp": 4.554,
      "growth": 4.8,
      "perCapita": 1612.6,
      "popChangePct": 2.84
    },
    {
      "year": 1988,
      "gdp": 4.636,
      "growth": 3.4,
      "perCapita": 1598.0,
      "popChangePct": 2.73
    },
    {
      "year": 1989,
      "gdp": 5.25,
      "growth": 5.7,
      "perCapita": 1763.5,
      "popChangePct": 2.62
    },
    {
      "year": 1990,
      "gdp": 5.737,
      "growth": 3.6,
      "perCapita": 1880.8,
      "popChangePct": 2.49
    },
    {
      "year": 1991,
      "gdp": 7.197,
      "growth": 2.3,
      "perCapita": 2305.4,
      "popChangePct": 2.33
    },
    {
      "year": 1992,
      "gdp": 8.566,
      "growth": 9.2,
      "perCapita": 2684.1,
      "popChangePct": 2.21
    },
    {
      "year": 1993,
      "gdp": 9.586,
      "growth": 7.1,
      "perCapita": 2926.9,
      "popChangePct": 2.63
    },
    {
      "year": 1994,
      "gdp": 10.489,
      "growth": 4.5,
      "perCapita": 3110.2,
      "popChangePct": 2.99
    },
    {
      "year": 1995,
      "gdp": 11.578,
      "growth": 4.2,
      "perCapita": 3336.7,
      "popChangePct": 2.88
    },
    {
      "year": 1996,
      "gdp": 11.683,
      "growth": 1.4,
      "perCapita": 3277.6,
      "popChangePct": 2.74
    },
    {
      "year": 1997,
      "gdp": 12.618,
      "growth": 5.5,
      "perCapita": 3450.9,
      "popChangePct": 2.58
    },
    {
      "year": 1998,
      "gdp": 13.688,
      "growth": 7.1,
      "perCapita": 3653.2,
      "popChangePct": 2.46
    },
    {
      "year": 1999,
      "gdp": 14.259,
      "growth": 4.1,
      "perCapita": 3715.4,
      "popChangePct": 2.43
    },
    {
      "year": 2000,
      "gdp": 15.016,
      "growth": 3.8,
      "perCapita": 3941.1,
      "popChangePct": -0.73
    },
    {
      "year": 2001,
      "gdp": 15.979,
      "growth": 3.5,
      "perCapita": 4041.9,
      "popChangePct": 3.75
    },
    {
      "year": 2002,
      "gdp": 16.584,
      "growth": 3.4,
      "perCapita": 4122.8,
      "popChangePct": 1.75
    },
    {
      "year": 2003,
      "gdp": 17.277,
      "growth": 4.3,
      "perCapita": 4227.8,
      "popChangePct": 1.59
    },
    {
      "year": 2004,
      "gdp": 18.615,
      "growth": 4.4,
      "perCapita": 4483.6,
      "popChangePct": 1.62
    },
    {
      "year": 2005,
      "gdp": 20.049,
      "growth": 4,
      "perCapita": 4756.3,
      "popChangePct": 1.52
    },
    {
      "year": 2006,
      "gdp": 22.717,
      "growth": 7.3,
      "perCapita": 5309.3,
      "popChangePct": 1.52
    },
    {
      "year": 2007,
      "gdp": 26.885,
      "growth": 8.2,
      "perCapita": 6194.0,
      "popChangePct": 1.43
    },
    {
      "year": 2008,
      "gdp": 30.802,
      "growth": 4.7,
      "perCapita": 6993.9,
      "popChangePct": 1.47
    },
    {
      "year": 2009,
      "gdp": 30.746,
      "growth": -0.9,
      "perCapita": 6879.3,
      "popChangePct": 1.48
    },
    {
      "year": 2010,
      "gdp": 37.656,
      "growth": 5.4,
      "perCapita": 8268.9,
      "popChangePct": 1.9
    },
    {
      "year": 2011,
      "gdp": 42.762,
      "growth": 4.4,
      "perCapita": 9270.6,
      "popChangePct": 1.3
    },
    {
      "year": 2012,
      "gdp": 47.231,
      "growth": 4.9,
      "perCapita": 10107.5,
      "popChangePct": 1.3
    },
    {
      "year": 2013,
      "gdp": 50.949,
      "growth": 2.5,
      "perCapita": 10764.5,
      "popChangePct": 1.28
    },
    {
      "year": 2014,
      "gdp": 52.017,
      "growth": 3.5,
      "perCapita": 10853.6,
      "popChangePct": 1.27
    },
    {
      "year": 2015,
      "gdp": 56.442,
      "growth": 3.7,
      "perCapita": 11635.2,
      "popChangePct": 1.21
    },
    {
      "year": 2016,
      "gdp": 58.847,
      "growth": 4.2,
      "perCapita": 11986.9,
      "popChangePct": 1.2
    },
    {
      "year": 2017,
      "gdp": 60.517,
      "growth": 4.2,
      "perCapita": 12185.3,
      "popChangePct": 1.16
    },
    {
      "year": 2018,
      "gdp": 62.57,
      "growth": 2.9,
      "perCapita": 12458.3,
      "popChangePct": 1.13
    },
    {
      "year": 2019,
      "gdp": 64.748,
      "growth": 2.7,
      "perCapita": 12757.3,
      "popChangePct": 1.06
    },
    {
      "year": 2020,
      "gdp": 62.792,
      "growth": -4.1,
      "perCapita": 12244.0,
      "popChangePct": 1.04
    },
    {
      "year": 2021,
      "gdp": 65.582,
      "growth": 8.2,
      "perCapita": 12660.5,
      "popChangePct": 1.01
    },
    {
      "year": 2022,
      "gdp": 70.993,
      "growth": 5.5,
      "perCapita": 13575.9,
      "popChangePct": 0.95
    },
    {
      "year": 2023,
      "gdp": 87.524,
      "growth": 4.8,
      "perCapita": 16582.5,
      "popChangePct": 0.94
    },
    {
      "year": 2024,
      "gdp": 96.73,
      "growth": 4.1,
      "perCapita": 18165.0,
      "popChangePct": 0.89
    },
    {
      "year": 2025,
      "gdp": 102.902,
      "growth": 4.6,
      "perCapita": 19162.0,
      "popChangePct": 0.85
    },
    {
      "year": 2026,
      "gdp": 109.931,
      "growth": 3.6,
      "perCapita": 20299.2,
      "popChangePct": 0.86
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 116.204,
      "growth": 3.6,
      "perCapita": 21277.7,
      "popChangePct": 0.83
    },
    {
      "year": 2028,
      "gdp": 122.751,
      "growth": 3.6,
      "perCapita": 22288.0,
      "popChangePct": 0.86
    },
    {
      "year": 2029,
      "gdp": 129.529,
      "growth": 3.5,
      "perCapita": 23321.5,
      "popChangePct": 0.84
    },
    {
      "year": 2030,
      "gdp": 136.738,
      "growth": 3.5,
      "perCapita": 24413.0,
      "popChangePct": 0.85
    },
    {
      "year": 2031,
      "gdp": 144.622,
      "growth": 3.5,
      "perCapita": 25604.1,
      "popChangePct": 0.84
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 9.627,
      "perCapitaPPP": 4182.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 10.299,
      "perCapitaPPP": 4341.9,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 3.04
    },
    {
      "year": 1982,
      "gdpPPP": 10.139,
      "perCapitaPPP": 4149.9,
      "perCapitaPPPChangePct": -4.42,
      "popChangePct": 2.99
    },
    {
      "year": 1983,
      "gdpPPP": 10.837,
      "perCapitaPPP": 4309.9,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 2.91
    },
    {
      "year": 1984,
      "gdpPPP": 12.13,
      "perCapitaPPP": 4687.3,
      "perCapitaPPPChangePct": 8.76,
      "popChangePct": 2.94
    },
    {
      "year": 1985,
      "gdpPPP": 12.604,
      "perCapitaPPP": 4727.6,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 3.01
    },
    {
      "year": 1986,
      "gdpPPP": 13.569,
      "perCapitaPPP": 4941.1,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 3.0
    },
    {
      "year": 1987,
      "gdpPPP": 14.568,
      "perCapitaPPP": 5158.7,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 2.84
    },
    {
      "year": 1988,
      "gdpPPP": 15.599,
      "perCapitaPPP": 5377.5,
      "perCapitaPPPChangePct": 4.24,
      "popChangePct": 2.73
    },
    {
      "year": 1989,
      "gdpPPP": 17.13,
      "perCapitaPPP": 5754.0,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 2.62
    },
    {
      "year": 1990,
      "gdpPPP": 18.41,
      "perCapitaPPP": 6035.1,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 2.49
    },
    {
      "year": 1991,
      "gdpPPP": 19.464,
      "perCapitaPPP": 6235.1,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 2.33
    },
    {
      "year": 1992,
      "gdpPPP": 21.739,
      "perCapitaPPP": 6812.1,
      "perCapitaPPPChangePct": 9.25,
      "popChangePct": 2.21
    },
    {
      "year": 1993,
      "gdpPPP": 23.834,
      "perCapitaPPP": 7277.6,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": 2.63
    },
    {
      "year": 1994,
      "gdpPPP": 25.443,
      "perCapitaPPP": 7544.0,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 2.99
    },
    {
      "year": 1995,
      "gdpPPP": 27.055,
      "perCapitaPPP": 7797.4,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.88
    },
    {
      "year": 1996,
      "gdpPPP": 27.923,
      "perCapitaPPP": 7833.3,
      "perCapitaPPPChangePct": 0.46,
      "popChangePct": 2.74
    },
    {
      "year": 1997,
      "gdpPPP": 29.96,
      "perCapitaPPP": 8193.5,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 2.58
    },
    {
      "year": 1998,
      "gdpPPP": 32.444,
      "perCapitaPPP": 8658.7,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 2.46
    },
    {
      "year": 1999,
      "gdpPPP": 34.268,
      "perCapitaPPP": 8929.3,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 2.43
    },
    {
      "year": 2000,
      "gdpPPP": 36.377,
      "perCapitaPPP": 9547.2,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": -0.73
    },
    {
      "year": 2001,
      "gdpPPP": 38.494,
      "perCapitaPPP": 9737.0,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 3.75
    },
    {
      "year": 2002,
      "gdpPPP": 40.428,
      "perCapitaPPP": 10050.7,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 1.75
    },
    {
      "year": 2003,
      "gdpPPP": 43.006,
      "perCapitaPPP": 10524.2,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 1.59
    },
    {
      "year": 2004,
      "gdpPPP": 46.116,
      "perCapitaPPP": 11107.5,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 1.62
    },
    {
      "year": 2005,
      "gdpPPP": 49.454,
      "perCapitaPPP": 11732.2,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 1.52
    },
    {
      "year": 2006,
      "gdpPPP": 54.714,
      "perCapitaPPP": 12787.7,
      "perCapitaPPPChangePct": 9.0,
      "popChangePct": 1.52
    },
    {
      "year": 2007,
      "gdpPPP": 60.813,
      "perCapitaPPP": 14011.0,
      "perCapitaPPPChangePct": 9.57,
      "popChangePct": 1.43
    },
    {
      "year": 2008,
      "gdpPPP": 64.922,
      "perCapitaPPP": 14741.2,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 1.47
    },
    {
      "year": 2009,
      "gdpPPP": 64.752,
      "perCapitaPPP": 14487.9,
      "perCapitaPPPChangePct": -1.72,
      "popChangePct": 1.48
    },
    {
      "year": 2010,
      "gdpPPP": 69.052,
      "perCapitaPPP": 15163.1,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 1.9
    },
    {
      "year": 2011,
      "gdpPPP": 73.579,
      "perCapitaPPP": 15951.6,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 1.3
    },
    {
      "year": 2012,
      "gdpPPP": 78.609,
      "perCapitaPPP": 16822.2,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 1.3
    },
    {
      "year": 2013,
      "gdpPPP": 81.941,
      "perCapitaPPP": 17312.6,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 1.28
    },
    {
      "year": 2014,
      "gdpPPP": 86.322,
      "perCapitaPPP": 18011.4,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 1.27
    },
    {
      "year": 2015,
      "gdpPPP": 90.304,
      "perCapitaPPP": 18615.9,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 1.21
    },
    {
      "year": 2016,
      "gdpPPP": 94.995,
      "perCapitaPPP": 19350.1,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 1.2
    },
    {
      "year": 2017,
      "gdpPPP": 100.717,
      "perCapitaPPP": 20279.6,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 1.16
    },
    {
      "year": 2018,
      "gdpPPP": 106.835,
      "perCapitaPPP": 21272.2,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 1.13
    },
    {
      "year": 2019,
      "gdpPPP": 117.296,
      "perCapitaPPP": 23110.8,
      "perCapitaPPPChangePct": 8.64,
      "popChangePct": 1.06
    },
    {
      "year": 2020,
      "gdpPPP": 111.991,
      "perCapitaPPP": 21837.3,
      "perCapitaPPPChangePct": -5.51,
      "popChangePct": 1.04
    },
    {
      "year": 2021,
      "gdpPPP": 123.332,
      "perCapitaPPP": 23809,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": 1.01
    },
    {
      "year": 2022,
      "gdpPPP": 139.318,
      "perCapitaPPP": 26641.8,
      "perCapitaPPPChangePct": 11.9,
      "popChangePct": 0.95
    },
    {
      "year": 2023,
      "gdpPPP": 151.396,
      "perCapitaPPP": 28683.7,
      "perCapitaPPPChangePct": 7.66,
      "popChangePct": 0.94
    },
    {
      "year": 2024,
      "gdpPPP": 161.489,
      "perCapitaPPP": 30325.9,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": 0.89
    },
    {
      "year": 2025,
      "gdpPPP": 173.643,
      "perCapitaPPP": 32335.0,
      "perCapitaPPPChangePct": 6.62,
      "popChangePct": 0.85
    },
    {
      "year": 2026,
      "gdpPPP": 184.977,
      "perCapitaPPP": 34156.8,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 0.86
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 195.781,
      "perCapitaPPP": 35848.7,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 0.83
    },
    {
      "year": 2028,
      "gdpPPP": 206.071,
      "perCapitaPPP": 37416.5,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 0.86
    },
    {
      "year": 2029,
      "gdpPPP": 217.097,
      "perCapitaPPP": 39088.0,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": 0.84
    },
    {
      "year": 2030,
      "gdpPPP": 228.736,
      "perCapitaPPP": 40838.2,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.85
    },
    {
      "year": 2031,
      "gdpPPP": 240.923,
      "perCapitaPPP": 42653.4,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.84
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CostaRicaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
