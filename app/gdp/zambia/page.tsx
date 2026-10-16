import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Zambia",
  "slug": "zambia",
  "iso3": "ZMB",
  "region": "Africa",
  "rank2026": 110,
  "flagEmoji": "🇿🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Honduras",
      "slug": "honduras",
      "rank": 109
    },
    {
      "name": "Senegal",
      "slug": "senegal",
      "rank": 111
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.246,
      "growth": 3.9,
      "perCapita": 755.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.385,
      "growth": 6.6,
      "perCapita": 755.8,
      "popChangePct": 3.28
    },
    {
      "year": 1982,
      "gdp": 4.232,
      "growth": -2.9,
      "perCapita": 706.6,
      "popChangePct": 3.22
    },
    {
      "year": 1983,
      "gdp": 3.653,
      "growth": -1.1,
      "perCapita": 591.4,
      "popChangePct": 3.14
    },
    {
      "year": 1984,
      "gdp": 3.003,
      "growth": -1.7,
      "perCapita": 471.6,
      "popChangePct": 3.08
    },
    {
      "year": 1985,
      "gdp": 2.848,
      "growth": 1.2,
      "perCapita": 434.1,
      "popChangePct": 3.02
    },
    {
      "year": 1986,
      "gdp": 1.962,
      "growth": 1.7,
      "perCapita": 290.4,
      "popChangePct": 3.0
    },
    {
      "year": 1987,
      "gdp": 2.431,
      "growth": 1.5,
      "perCapita": 349.4,
      "popChangePct": 3.0
    },
    {
      "year": 1988,
      "gdp": 4.095,
      "growth": 9.3,
      "perCapita": 571.3,
      "popChangePct": 3.02
    },
    {
      "year": 1989,
      "gdp": 4.365,
      "growth": -3.7,
      "perCapita": 590.8,
      "popChangePct": 3.05
    },
    {
      "year": 1990,
      "gdp": 4.085,
      "growth": -0.6,
      "perCapita": 536.0,
      "popChangePct": 3.15
    },
    {
      "year": 1991,
      "gdp": 3.69,
      "growth": -0.7,
      "perCapita": 469.8,
      "popChangePct": 3.06
    },
    {
      "year": 1992,
      "gdp": 3.614,
      "growth": 2.1,
      "perCapita": 446.8,
      "popChangePct": 2.98
    },
    {
      "year": 1993,
      "gdp": 3.549,
      "growth": -0.1,
      "perCapita": 426.5,
      "popChangePct": 2.91
    },
    {
      "year": 1994,
      "gdp": 3.657,
      "growth": -13.3,
      "perCapita": 426.4,
      "popChangePct": 3.04
    },
    {
      "year": 1995,
      "gdp": 3.799,
      "growth": 2.9,
      "perCapita": 432.4,
      "popChangePct": 2.45
    },
    {
      "year": 1996,
      "gdp": 3.599,
      "growth": 6.2,
      "perCapita": 399.7,
      "popChangePct": 2.48
    },
    {
      "year": 1997,
      "gdp": 4.303,
      "growth": 3.8,
      "perCapita": 465.8,
      "popChangePct": 2.59
    },
    {
      "year": 1998,
      "gdp": 3.538,
      "growth": -0.4,
      "perCapita": 373.1,
      "popChangePct": 2.65
    },
    {
      "year": 1999,
      "gdp": 3.405,
      "growth": 4.7,
      "perCapita": 349.6,
      "popChangePct": 2.72
    },
    {
      "year": 2000,
      "gdp": 3.601,
      "growth": 3.9,
      "perCapita": 359.4,
      "popChangePct": 2.85
    },
    {
      "year": 2001,
      "gdp": 3.87,
      "growth": 5.3,
      "perCapita": 374.8,
      "popChangePct": 3.06
    },
    {
      "year": 2002,
      "gdp": 4.194,
      "growth": 4.5,
      "perCapita": 393.9,
      "popChangePct": 3.13
    },
    {
      "year": 2003,
      "gdp": 4.902,
      "growth": 6.9,
      "perCapita": 446.3,
      "popChangePct": 3.16
    },
    {
      "year": 2004,
      "gdp": 6.221,
      "growth": 7,
      "perCapita": 548.7,
      "popChangePct": 3.22
    },
    {
      "year": 2005,
      "gdp": 8.329,
      "growth": 7.2,
      "perCapita": 710.7,
      "popChangePct": 3.36
    },
    {
      "year": 2006,
      "gdp": 12.762,
      "growth": 7.9,
      "perCapita": 1052.1,
      "popChangePct": 3.51
    },
    {
      "year": 2007,
      "gdp": 14.06,
      "growth": 8.4,
      "perCapita": 1119.0,
      "popChangePct": 3.59
    },
    {
      "year": 2008,
      "gdp": 17.914,
      "growth": 7.8,
      "perCapita": 1375.8,
      "popChangePct": 3.63
    },
    {
      "year": 2009,
      "gdp": 15.332,
      "growth": 9.2,
      "perCapita": 1136.5,
      "popChangePct": 3.6
    },
    {
      "year": 2010,
      "gdp": 20.264,
      "growth": 10.3,
      "perCapita": 1451.0,
      "popChangePct": 3.53
    },
    {
      "year": 2011,
      "gdp": 23.455,
      "growth": 5.6,
      "perCapita": 1624.5,
      "popChangePct": 3.38
    },
    {
      "year": 2012,
      "gdp": 25.502,
      "growth": 7.6,
      "perCapita": 1710.0,
      "popChangePct": 3.3
    },
    {
      "year": 2013,
      "gdp": 28.042,
      "growth": 5.1,
      "perCapita": 1821.1,
      "popChangePct": 3.25
    },
    {
      "year": 2014,
      "gdp": 27.145,
      "growth": 4.7,
      "perCapita": 1707.7,
      "popChangePct": 3.22
    },
    {
      "year": 2015,
      "gdp": 21.245,
      "growth": 2.9,
      "perCapita": 1295.5,
      "popChangePct": 3.17
    },
    {
      "year": 2016,
      "gdp": 20.965,
      "growth": 3.8,
      "perCapita": 1239.5,
      "popChangePct": 3.14
    },
    {
      "year": 2017,
      "gdp": 25.874,
      "growth": 3.5,
      "perCapita": 1483.5,
      "popChangePct": 3.12
    },
    {
      "year": 2018,
      "gdp": 26.311,
      "growth": 4,
      "perCapita": 1463.9,
      "popChangePct": 3.06
    },
    {
      "year": 2019,
      "gdp": 23.309,
      "growth": 1.4,
      "perCapita": 1259.0,
      "popChangePct": 3.0
    },
    {
      "year": 2020,
      "gdp": 18.138,
      "growth": -2.8,
      "perCapita": 951.6,
      "popChangePct": 2.94
    },
    {
      "year": 2021,
      "gdp": 22.096,
      "growth": 6.2,
      "perCapita": 1127.2,
      "popChangePct": 2.86
    },
    {
      "year": 2022,
      "gdp": 29.164,
      "growth": 5.2,
      "perCapita": 1447.1,
      "popChangePct": 2.8
    },
    {
      "year": 2023,
      "gdp": 27.578,
      "growth": 5.4,
      "perCapita": 1330.7,
      "popChangePct": 2.83
    },
    {
      "year": 2024,
      "gdp": 25.303,
      "growth": 3.8,
      "perCapita": 1187.1,
      "popChangePct": 2.85
    },
    {
      "year": 2025,
      "gdp": 28.88,
      "growth": 3.8,
      "perCapita": 1317.9,
      "popChangePct": 2.81
    },
    {
      "year": 2026,
      "gdp": 41.243,
      "growth": 4.3,
      "perCapita": 1831.2,
      "popChangePct": 2.77
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 43.263,
      "growth": 4.7,
      "perCapita": 1869.7,
      "popChangePct": 2.74
    },
    {
      "year": 2028,
      "gdp": 46.098,
      "growth": 5.1,
      "perCapita": 1940.1,
      "popChangePct": 2.69
    },
    {
      "year": 2029,
      "gdp": 51.702,
      "growth": 5.3,
      "perCapita": 2119.8,
      "popChangePct": 2.65
    },
    {
      "year": 2030,
      "gdp": 55.931,
      "growth": 5.3,
      "perCapita": 2235.0,
      "popChangePct": 2.6
    },
    {
      "year": 2031,
      "gdp": 60.5,
      "growth": 5.3,
      "perCapita": 2357.2,
      "popChangePct": 2.57
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.927,
      "perCapitaPPP": 1233.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 8.085,
      "perCapitaPPP": 1393.3,
      "perCapitaPPPChangePct": 13.0,
      "popChangePct": 3.28
    },
    {
      "year": 1982,
      "gdpPPP": 8.334,
      "perCapitaPPP": 1391.7,
      "perCapitaPPPChangePct": -0.12,
      "popChangePct": 3.22
    },
    {
      "year": 1983,
      "gdpPPP": 8.562,
      "perCapitaPPP": 1386.1,
      "perCapitaPPPChangePct": -0.4,
      "popChangePct": 3.14
    },
    {
      "year": 1984,
      "gdpPPP": 8.718,
      "perCapitaPPP": 1369.4,
      "perCapitaPPPChangePct": -1.21,
      "popChangePct": 3.08
    },
    {
      "year": 1985,
      "gdpPPP": 9.105,
      "perCapitaPPP": 1388.1,
      "perCapitaPPPChangePct": 1.37,
      "popChangePct": 3.02
    },
    {
      "year": 1986,
      "gdpPPP": 9.446,
      "perCapitaPPP": 1398.1,
      "perCapitaPPPChangePct": 0.72,
      "popChangePct": 3.0
    },
    {
      "year": 1987,
      "gdpPPP": 9.825,
      "perCapitaPPP": 1411.8,
      "perCapitaPPPChangePct": 0.98,
      "popChangePct": 3.0
    },
    {
      "year": 1988,
      "gdpPPP": 11.114,
      "perCapitaPPP": 1550.4,
      "perCapitaPPPChangePct": 9.81,
      "popChangePct": 3.02
    },
    {
      "year": 1989,
      "gdpPPP": 11.127,
      "perCapitaPPP": 1506.0,
      "perCapitaPPPChangePct": -2.86,
      "popChangePct": 3.05
    },
    {
      "year": 1990,
      "gdpPPP": 11.477,
      "perCapitaPPP": 1506.0,
      "perCapitaPPPChangePct": -0.0,
      "popChangePct": 3.15
    },
    {
      "year": 1991,
      "gdpPPP": 11.786,
      "perCapitaPPP": 1500.6,
      "perCapitaPPPChangePct": -0.36,
      "popChangePct": 3.06
    },
    {
      "year": 1992,
      "gdpPPP": 12.302,
      "perCapitaPPP": 1521.0,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 2.98
    },
    {
      "year": 1993,
      "gdpPPP": 12.584,
      "perCapitaPPP": 1512.0,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 2.91
    },
    {
      "year": 1994,
      "gdpPPP": 11.142,
      "perCapitaPPP": 1299.2,
      "perCapitaPPPChangePct": -14.07,
      "popChangePct": 3.04
    },
    {
      "year": 1995,
      "gdpPPP": 11.705,
      "perCapitaPPP": 1332.3,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 2.45
    },
    {
      "year": 1996,
      "gdpPPP": 12.661,
      "perCapitaPPP": 1406.1,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 2.48
    },
    {
      "year": 1997,
      "gdpPPP": 13.37,
      "perCapitaPPP": 1447.5,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 2.59
    },
    {
      "year": 1998,
      "gdpPPP": 13.469,
      "perCapitaPPP": 1420.4,
      "perCapitaPPPChangePct": -1.87,
      "popChangePct": 2.65
    },
    {
      "year": 1999,
      "gdpPPP": 14.294,
      "perCapitaPPP": 1467.6,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.72
    },
    {
      "year": 2000,
      "gdpPPP": 15.188,
      "perCapitaPPP": 1516.1,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 2.85
    },
    {
      "year": 2001,
      "gdpPPP": 16.356,
      "perCapitaPPP": 1584.0,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 3.06
    },
    {
      "year": 2002,
      "gdpPPP": 17.358,
      "perCapitaPPP": 1630.2,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 3.13
    },
    {
      "year": 2003,
      "gdpPPP": 18.93,
      "perCapitaPPP": 1723.5,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 3.16
    },
    {
      "year": 2004,
      "gdpPPP": 20.806,
      "perCapitaPPP": 1835.1,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 3.22
    },
    {
      "year": 2005,
      "gdpPPP": 23.011,
      "perCapitaPPP": 1963.6,
      "perCapitaPPPChangePct": 7.01,
      "popChangePct": 3.36
    },
    {
      "year": 2006,
      "gdpPPP": 25.596,
      "perCapitaPPP": 2110.2,
      "perCapitaPPPChangePct": 7.46,
      "popChangePct": 3.51
    },
    {
      "year": 2007,
      "gdpPPP": 28.485,
      "perCapitaPPP": 2267.0,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 3.59
    },
    {
      "year": 2008,
      "gdpPPP": 31.291,
      "perCapitaPPP": 2403.0,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 3.63
    },
    {
      "year": 2009,
      "gdpPPP": 34.387,
      "perCapitaPPP": 2549.0,
      "perCapitaPPPChangePct": 6.07,
      "popChangePct": 3.6
    },
    {
      "year": 2010,
      "gdpPPP": 38.389,
      "perCapitaPPP": 2748.8,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 3.53
    },
    {
      "year": 2011,
      "gdpPPP": 41.363,
      "perCapitaPPP": 2864.9,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 3.38
    },
    {
      "year": 2012,
      "gdpPPP": 45.334,
      "perCapitaPPP": 3039.8,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 3.3
    },
    {
      "year": 2013,
      "gdpPPP": 48.438,
      "perCapitaPPP": 3145.5,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 3.25
    },
    {
      "year": 2014,
      "gdpPPP": 51.594,
      "perCapitaPPP": 3245.9,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 3.22
    },
    {
      "year": 2015,
      "gdpPPP": 53.594,
      "perCapitaPPP": 3268.1,
      "perCapitaPPPChangePct": 0.68,
      "popChangePct": 3.17
    },
    {
      "year": 2016,
      "gdpPPP": 56.135,
      "perCapitaPPP": 3318.7,
      "perCapitaPPPChangePct": 1.55,
      "popChangePct": 3.14
    },
    {
      "year": 2017,
      "gdpPPP": 59.154,
      "perCapitaPPP": 3391.6,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 3.12
    },
    {
      "year": 2018,
      "gdpPPP": 61.87,
      "perCapitaPPP": 3442.3,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 3.06
    },
    {
      "year": 2019,
      "gdpPPP": 62.233,
      "perCapitaPPP": 3361.4,
      "perCapitaPPPChangePct": -2.35,
      "popChangePct": 3.0
    },
    {
      "year": 2020,
      "gdpPPP": 60.176,
      "perCapitaPPP": 3157.3,
      "perCapitaPPPChangePct": -6.07,
      "popChangePct": 2.94
    },
    {
      "year": 2021,
      "gdpPPP": 68.672,
      "perCapitaPPP": 3503.0,
      "perCapitaPPPChangePct": 10.95,
      "popChangePct": 2.86
    },
    {
      "year": 2022,
      "gdpPPP": 77.39,
      "perCapitaPPP": 3840.1,
      "perCapitaPPPChangePct": 9.62,
      "popChangePct": 2.8
    },
    {
      "year": 2023,
      "gdpPPP": 84.561,
      "perCapitaPPP": 4080.3,
      "perCapitaPPPChangePct": 6.26,
      "popChangePct": 2.83
    },
    {
      "year": 2024,
      "gdpPPP": 89.971,
      "perCapitaPPP": 4221.0,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 2.85
    },
    {
      "year": 2025,
      "gdpPPP": 96,
      "perCapitaPPP": 4380.8,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 2.81
    },
    {
      "year": 2026,
      "gdpPPP": 102.983,
      "perCapitaPPP": 4572.6,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 2.77
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 110.167,
      "perCapitaPPP": 4761.2,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 2.74
    },
    {
      "year": 2028,
      "gdpPPP": 117.642,
      "perCapitaPPP": 4951.0,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.69
    },
    {
      "year": 2029,
      "gdpPPP": 126.067,
      "perCapitaPPP": 5168.9,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 2.65
    },
    {
      "year": 2030,
      "gdpPPP": 135.212,
      "perCapitaPPP": 5403.1,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 2.6
    },
    {
      "year": 2031,
      "gdpPPP": 144.938,
      "perCapitaPPP": 5647.0,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 2.57
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ZambiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
