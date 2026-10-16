import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Taiwan",
  "slug": "taiwan",
  "iso3": "TWN",
  "region": "Asia",
  "rank2026": 22,
  "flagEmoji": "🇹🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Poland",
      "slug": "poland",
      "rank": 21
    },
    {
      "name": "Ireland",
      "slug": "ireland",
      "rank": 23
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 42.285,
      "growth": 8,
      "perCapita": 2366.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 48.969,
      "growth": 9.5,
      "perCapita": 2691.5,
      "popChangePct": 1.84
    },
    {
      "year": 1982,
      "gdp": 49.535,
      "growth": 4.8,
      "perCapita": 2675.3,
      "popChangePct": 1.77
    },
    {
      "year": 1983,
      "gdp": 54.148,
      "growth": 9,
      "perCapita": 2881.7,
      "popChangePct": 1.49
    },
    {
      "year": 1984,
      "gdp": 61.071,
      "growth": 10,
      "perCapita": 3202.6,
      "popChangePct": 1.48
    },
    {
      "year": 1985,
      "gdp": 63.617,
      "growth": 4.8,
      "perCapita": 3293.9,
      "popChangePct": 1.28
    },
    {
      "year": 1986,
      "gdp": 78.195,
      "growth": 11.5,
      "perCapita": 4008.1,
      "popChangePct": 1.01
    },
    {
      "year": 1987,
      "gdp": 105.039,
      "growth": 12.8,
      "perCapita": 5325.2,
      "popChangePct": 1.11
    },
    {
      "year": 1988,
      "gdp": 126.473,
      "growth": 8,
      "perCapita": 6338.1,
      "popChangePct": 1.16
    },
    {
      "year": 1989,
      "gdp": 152.704,
      "growth": 8.7,
      "perCapita": 7575.9,
      "popChangePct": 1.02
    },
    {
      "year": 1990,
      "gdp": 166.622,
      "growth": 5.5,
      "perCapita": 8167.2,
      "popChangePct": 1.21
    },
    {
      "year": 1991,
      "gdp": 187.14,
      "growth": 8.4,
      "perCapita": 9081.9,
      "popChangePct": 1.0
    },
    {
      "year": 1992,
      "gdp": 222.911,
      "growth": 8.3,
      "perCapita": 10715.5,
      "popChangePct": 0.96
    },
    {
      "year": 1993,
      "gdp": 236.339,
      "growth": 6.8,
      "perCapita": 11256.7,
      "popChangePct": 0.92
    },
    {
      "year": 1994,
      "gdp": 256.247,
      "growth": 7.5,
      "perCapita": 12099.7,
      "popChangePct": 0.87
    },
    {
      "year": 1995,
      "gdp": 279.059,
      "growth": 6.5,
      "perCapita": 13066.1,
      "popChangePct": 0.85
    },
    {
      "year": 1996,
      "gdp": 292.494,
      "growth": 6.2,
      "perCapita": 13588.3,
      "popChangePct": 0.79
    },
    {
      "year": 1997,
      "gdp": 303.284,
      "growth": 6.1,
      "perCapita": 13948.7,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdp": 279.964,
      "growth": 4.2,
      "perCapita": 12767.1,
      "popChangePct": 0.86
    },
    {
      "year": 1999,
      "gdp": 303.83,
      "growth": 6.7,
      "perCapita": 13752.7,
      "popChangePct": 0.74
    },
    {
      "year": 2000,
      "gdp": 330.68,
      "growth": 6.3,
      "perCapita": 14844.2,
      "popChangePct": 0.84
    },
    {
      "year": 2001,
      "gdp": 299.276,
      "growth": -1.4,
      "perCapita": 13357.2,
      "popChangePct": 0.58
    },
    {
      "year": 2002,
      "gdp": 307.439,
      "growth": 5.5,
      "perCapita": 13651.4,
      "popChangePct": 0.51
    },
    {
      "year": 2003,
      "gdp": 317.381,
      "growth": 4.2,
      "perCapita": 14040.6,
      "popChangePct": 0.37
    },
    {
      "year": 2004,
      "gdp": 346.924,
      "growth": 7,
      "perCapita": 15290.3,
      "popChangePct": 0.37
    },
    {
      "year": 2005,
      "gdp": 374.06,
      "growth": 5.4,
      "perCapita": 16427.5,
      "popChangePct": 0.36
    },
    {
      "year": 2006,
      "gdp": 386.45,
      "growth": 5.8,
      "perCapita": 16892.9,
      "popChangePct": 0.47
    },
    {
      "year": 2007,
      "gdp": 406.907,
      "growth": 6.9,
      "perCapita": 17723.7,
      "popChangePct": 0.35
    },
    {
      "year": 2008,
      "gdp": 415.901,
      "growth": 0.8,
      "perCapita": 18053.6,
      "popChangePct": 0.34
    },
    {
      "year": 2009,
      "gdp": 390.829,
      "growth": -1.6,
      "perCapita": 16904.5,
      "popChangePct": 0.36
    },
    {
      "year": 2010,
      "gdp": 444.281,
      "growth": 10.2,
      "perCapita": 19181.4,
      "popChangePct": 0.18
    },
    {
      "year": 2011,
      "gdp": 483.974,
      "growth": 3.7,
      "perCapita": 20838.6,
      "popChangePct": 0.27
    },
    {
      "year": 2012,
      "gdp": 495.61,
      "growth": 2.2,
      "perCapita": 21256.4,
      "popChangePct": 0.39
    },
    {
      "year": 2013,
      "gdp": 512.943,
      "growth": 2.5,
      "perCapita": 21945.5,
      "popChangePct": 0.25
    },
    {
      "year": 2014,
      "gdp": 535.328,
      "growth": 4.7,
      "perCapita": 22844.3,
      "popChangePct": 0.26
    },
    {
      "year": 2015,
      "gdp": 534.515,
      "growth": 1.5,
      "perCapita": 22753.0,
      "popChangePct": 0.25
    },
    {
      "year": 2016,
      "gdp": 543.081,
      "growth": 2.2,
      "perCapita": 23070.7,
      "popChangePct": 0.2
    },
    {
      "year": 2017,
      "gdp": 591.687,
      "growth": 3.7,
      "perCapita": 25102.1,
      "popChangePct": 0.13
    },
    {
      "year": 2018,
      "gdp": 610.69,
      "growth": 2.9,
      "perCapita": 25888.8,
      "popChangePct": 0.08
    },
    {
      "year": 2019,
      "gdp": 613.512,
      "growth": 3.1,
      "perCapita": 25992.8,
      "popChangePct": 0.06
    },
    {
      "year": 2020,
      "gdp": 676.861,
      "growth": 3.4,
      "perCapita": 28727.7,
      "popChangePct": -0.18
    },
    {
      "year": 2021,
      "gdp": 776.965,
      "growth": 6.7,
      "perCapita": 33238.7,
      "popChangePct": -0.79
    },
    {
      "year": 2022,
      "gdp": 765.624,
      "growth": 2.7,
      "perCapita": 32909.3,
      "popChangePct": -0.47
    },
    {
      "year": 2023,
      "gdp": 757.387,
      "growth": 1.1,
      "perCapita": 32338.7,
      "popChangePct": 0.67
    },
    {
      "year": 2024,
      "gdp": 801.495,
      "growth": 5.3,
      "perCapita": 34251.6,
      "popChangePct": -0.09
    },
    {
      "year": 2025,
      "gdp": 920.05,
      "growth": 8.7,
      "perCapita": 39488.6,
      "popChangePct": -0.43
    },
    {
      "year": 2026,
      "gdp": 976.719,
      "growth": 5.2,
      "perCapita": 42102.7,
      "popChangePct": -0.43
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1036.931,
      "growth": 3,
      "perCapita": 44892.2,
      "popChangePct": -0.43
    },
    {
      "year": 2028,
      "gdp": 1094.177,
      "growth": 2.4,
      "perCapita": 47576.1,
      "popChangePct": -0.43
    },
    {
      "year": 2029,
      "gdp": 1153.424,
      "growth": 2.4,
      "perCapita": 50369.8,
      "popChangePct": -0.43
    },
    {
      "year": 2030,
      "gdp": 1214.118,
      "growth": 2.4,
      "perCapita": 53250.3,
      "popChangePct": -0.43
    },
    {
      "year": 2031,
      "gdp": 1273.582,
      "growth": 2.1,
      "perCapita": 56100.7,
      "popChangePct": -0.43
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 57.425,
      "perCapitaPPP": 3214.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 68.812,
      "perCapitaPPP": 3782.1,
      "perCapitaPPPChangePct": 17.67,
      "popChangePct": 1.84
    },
    {
      "year": 1982,
      "gdpPPP": 76.579,
      "perCapitaPPP": 4135.9,
      "perCapitaPPPChangePct": 9.35,
      "popChangePct": 1.77
    },
    {
      "year": 1983,
      "gdpPPP": 86.759,
      "perCapitaPPP": 4617.2,
      "perCapitaPPPChangePct": 11.64,
      "popChangePct": 1.49
    },
    {
      "year": 1984,
      "gdpPPP": 98.924,
      "perCapitaPPP": 5187.7,
      "perCapitaPPPChangePct": 12.36,
      "popChangePct": 1.48
    },
    {
      "year": 1985,
      "gdpPPP": 106.96,
      "perCapitaPPP": 5538.0,
      "perCapitaPPPChangePct": 6.75,
      "popChangePct": 1.28
    },
    {
      "year": 1986,
      "gdpPPP": 121.675,
      "perCapitaPPP": 6236.8,
      "perCapitaPPPChangePct": 12.62,
      "popChangePct": 1.01
    },
    {
      "year": 1987,
      "gdpPPP": 140.59,
      "perCapitaPPP": 7127.5,
      "perCapitaPPPChangePct": 14.28,
      "popChangePct": 1.11
    },
    {
      "year": 1988,
      "gdpPPP": 157.227,
      "perCapitaPPP": 7879.3,
      "perCapitaPPPChangePct": 10.55,
      "popChangePct": 1.16
    },
    {
      "year": 1989,
      "gdpPPP": 177.644,
      "perCapitaPPP": 8813.2,
      "perCapitaPPPChangePct": 11.85,
      "popChangePct": 1.02
    },
    {
      "year": 1990,
      "gdpPPP": 194.504,
      "perCapitaPPP": 9533.9,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 1.21
    },
    {
      "year": 1991,
      "gdpPPP": 217.918,
      "perCapitaPPP": 10575.6,
      "perCapitaPPPChangePct": 10.93,
      "popChangePct": 1.0
    },
    {
      "year": 1992,
      "gdpPPP": 241.408,
      "perCapitaPPP": 11604.7,
      "perCapitaPPPChangePct": 9.73,
      "popChangePct": 0.96
    },
    {
      "year": 1993,
      "gdpPPP": 263.97,
      "perCapitaPPP": 12572.8,
      "perCapitaPPPChangePct": 8.34,
      "popChangePct": 0.92
    },
    {
      "year": 1994,
      "gdpPPP": 289.839,
      "perCapitaPPP": 13685.9,
      "perCapitaPPPChangePct": 8.85,
      "popChangePct": 0.87
    },
    {
      "year": 1995,
      "gdpPPP": 315.147,
      "perCapitaPPP": 14755.8,
      "perCapitaPPPChangePct": 7.82,
      "popChangePct": 0.85
    },
    {
      "year": 1996,
      "gdpPPP": 340.738,
      "perCapitaPPP": 15829.6,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 0.79
    },
    {
      "year": 1997,
      "gdpPPP": 367.589,
      "perCapitaPPP": 16906.2,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdpPPP": 387.351,
      "perCapitaPPP": 17664.2,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.86
    },
    {
      "year": 1999,
      "gdpPPP": 419.277,
      "perCapitaPPP": 18978.4,
      "perCapitaPPPChangePct": 7.44,
      "popChangePct": 0.74
    },
    {
      "year": 2000,
      "gdpPPP": 455.849,
      "perCapitaPPP": 20463.1,
      "perCapitaPPPChangePct": 7.82,
      "popChangePct": 0.84
    },
    {
      "year": 2001,
      "gdpPPP": 459.578,
      "perCapitaPPP": 20511.8,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 0.58
    },
    {
      "year": 2002,
      "gdpPPP": 492.314,
      "perCapitaPPP": 21860.4,
      "perCapitaPPPChangePct": 6.57,
      "popChangePct": 0.51
    },
    {
      "year": 2003,
      "gdpPPP": 523.242,
      "perCapitaPPP": 23147.6,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 0.37
    },
    {
      "year": 2004,
      "gdpPPP": 574.665,
      "perCapitaPPP": 25327.8,
      "perCapitaPPPChangePct": 9.42,
      "popChangePct": 0.37
    },
    {
      "year": 2005,
      "gdpPPP": 624.591,
      "perCapitaPPP": 27430.0,
      "perCapitaPPPChangePct": 8.3,
      "popChangePct": 0.36
    },
    {
      "year": 2006,
      "gdpPPP": 681.005,
      "perCapitaPPP": 29768.7,
      "perCapitaPPPChangePct": 8.53,
      "popChangePct": 0.47
    },
    {
      "year": 2007,
      "gdpPPP": 747.369,
      "perCapitaPPP": 32553.2,
      "perCapitaPPPChangePct": 9.35,
      "popChangePct": 0.35
    },
    {
      "year": 2008,
      "gdpPPP": 767.851,
      "perCapitaPPP": 33331.2,
      "perCapitaPPPChangePct": 2.39,
      "popChangePct": 0.34
    },
    {
      "year": 2009,
      "gdpPPP": 760.12,
      "perCapitaPPP": 32877.5,
      "perCapitaPPPChangePct": -1.36,
      "popChangePct": 0.36
    },
    {
      "year": 2010,
      "gdpPPP": 848.181,
      "perCapitaPPP": 36619.3,
      "perCapitaPPPChangePct": 11.38,
      "popChangePct": 0.18
    },
    {
      "year": 2011,
      "gdpPPP": 897.478,
      "perCapitaPPP": 38642.9,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 0.27
    },
    {
      "year": 2012,
      "gdpPPP": 934.492,
      "perCapitaPPP": 40079.7,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 0.39
    },
    {
      "year": 2013,
      "gdpPPP": 973.996,
      "perCapitaPPP": 41670.9,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 0.25
    },
    {
      "year": 2014,
      "gdpPPP": 1037.722,
      "perCapitaPPP": 44283.2,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": 0.26
    },
    {
      "year": 2015,
      "gdpPPP": 1062.698,
      "perCapitaPPP": 45236.4,
      "perCapitaPPPChangePct": 2.15,
      "popChangePct": 0.25
    },
    {
      "year": 2016,
      "gdpPPP": 1096.022,
      "perCapitaPPP": 46560.3,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 0.2
    },
    {
      "year": 2017,
      "gdpPPP": 1156.502,
      "perCapitaPPP": 49064.2,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.13
    },
    {
      "year": 2018,
      "gdpPPP": 1183.021,
      "perCapitaPPP": 50151.5,
      "perCapitaPPPChangePct": 2.22,
      "popChangePct": 0.08
    },
    {
      "year": 2019,
      "gdpPPP": 1242.247,
      "perCapitaPPP": 52630.6,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 0.06
    },
    {
      "year": 2020,
      "gdpPPP": 1366.457,
      "perCapitaPPP": 57996.0,
      "perCapitaPPPChangePct": 10.19,
      "popChangePct": -0.18
    },
    {
      "year": 2021,
      "gdpPPP": 1512.429,
      "perCapitaPPP": 64702.0,
      "perCapitaPPPChangePct": 11.56,
      "popChangePct": -0.79
    },
    {
      "year": 2022,
      "gdpPPP": 1663.473,
      "perCapitaPPP": 71502.2,
      "perCapitaPPPChangePct": 10.51,
      "popChangePct": -0.47
    },
    {
      "year": 2023,
      "gdpPPP": 1743.738,
      "perCapitaPPP": 74453.7,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 0.67
    },
    {
      "year": 2024,
      "gdpPPP": 1881.151,
      "perCapitaPPP": 80390.3,
      "perCapitaPPPChangePct": 7.97,
      "popChangePct": -0.09
    },
    {
      "year": 2025,
      "gdpPPP": 2102.357,
      "perCapitaPPP": 90233.3,
      "perCapitaPPPChangePct": 12.24,
      "popChangePct": -0.43
    },
    {
      "year": 2026,
      "gdpPPP": 2274.626,
      "perCapitaPPP": 98050.7,
      "perCapitaPPPChangePct": 8.66,
      "popChangePct": -0.43
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2393.601,
      "perCapitaPPP": 103626.9,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": -0.43
    },
    {
      "year": 2028,
      "gdpPPP": 2492.495,
      "perCapitaPPP": 108376.5,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": -0.43
    },
    {
      "year": 2029,
      "gdpPPP": 2596.943,
      "perCapitaPPP": 113407.9,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": -0.43
    },
    {
      "year": 2030,
      "gdpPPP": 2708.707,
      "perCapitaPPP": 118801.9,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": -0.43
    },
    {
      "year": 2031,
      "gdpPPP": 2816.202,
      "perCapitaPPP": 124052.4,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": -0.43
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TaiwanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
