import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Comoros",
  "slug": "comoros",
  "iso3": "COM",
  "region": "Africa",
  "rank2026": 195,
  "flagEmoji": "🇰🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Solomon Islands",
      "slug": "solomon-islands",
      "rank": 194
    },
    {
      "name": "Grenada",
      "slug": "grenada",
      "rank": 199
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.243,
      "growth": 7.4,
      "perCapita": 722.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.213,
      "growth": 5.5,
      "perCapita": 616.7,
      "popChangePct": 2.37
    },
    {
      "year": 1982,
      "gdp": 0.202,
      "growth": 4.1,
      "perCapita": 571.5,
      "popChangePct": 2.61
    },
    {
      "year": 1983,
      "gdp": 0.196,
      "growth": 3.1,
      "perCapita": 541.8,
      "popChangePct": 2.26
    },
    {
      "year": 1984,
      "gdp": 0.189,
      "growth": 4.2,
      "perCapita": 517.1,
      "popChangePct": 1.1
    },
    {
      "year": 1985,
      "gdp": 0.192,
      "growth": 2.8,
      "perCapita": 511.0,
      "popChangePct": 2.73
    },
    {
      "year": 1986,
      "gdp": 0.258,
      "growth": 2.1,
      "perCapita": 668.6,
      "popChangePct": 2.66
    },
    {
      "year": 1987,
      "gdp": 0.313,
      "growth": 2.1,
      "perCapita": 789.4,
      "popChangePct": 2.85
    },
    {
      "year": 1988,
      "gdp": 0.336,
      "growth": 5,
      "perCapita": 824.4,
      "popChangePct": 2.77
    },
    {
      "year": 1989,
      "gdp": 0.329,
      "growth": -0.9,
      "perCapita": 783.3,
      "popChangePct": 2.94
    },
    {
      "year": 1990,
      "gdp": 0.402,
      "growth": 7.3,
      "perCapita": 931.4,
      "popChangePct": 2.62
    },
    {
      "year": 1991,
      "gdp": 0.401,
      "growth": -6.2,
      "perCapita": 905.7,
      "popChangePct": 2.55
    },
    {
      "year": 1992,
      "gdp": 0.437,
      "growth": 7.4,
      "perCapita": 963.7,
      "popChangePct": 2.49
    },
    {
      "year": 1993,
      "gdp": 0.428,
      "growth": 2.5,
      "perCapita": 923.2,
      "popChangePct": 2.21
    },
    {
      "year": 1994,
      "gdp": 0.315,
      "growth": -4,
      "perCapita": 664.8,
      "popChangePct": 2.16
    },
    {
      "year": 1995,
      "gdp": 0.393,
      "growth": 5.6,
      "perCapita": 812.0,
      "popChangePct": 2.33
    },
    {
      "year": 1996,
      "gdp": 0.392,
      "growth": -0.5,
      "perCapita": 794.0,
      "popChangePct": 2.07
    },
    {
      "year": 1997,
      "gdp": 0.363,
      "growth": 4.4,
      "perCapita": 718.4,
      "popChangePct": 2.23
    },
    {
      "year": 1998,
      "gdp": 0.364,
      "growth": 0,
      "perCapita": 705.3,
      "popChangePct": 2.18
    },
    {
      "year": 1999,
      "gdp": 0.372,
      "growth": 2.7,
      "perCapita": 707.4,
      "popChangePct": 1.94
    },
    {
      "year": 2000,
      "gdp": 0.34,
      "growth": -1,
      "perCapita": 632.8,
      "popChangePct": 2.09
    },
    {
      "year": 2001,
      "gdp": 0.373,
      "growth": 5.4,
      "perCapita": 680.5,
      "popChangePct": 2.05
    },
    {
      "year": 2002,
      "gdp": 0.427,
      "growth": 4.6,
      "perCapita": 763.9,
      "popChangePct": 2.01
    },
    {
      "year": 2003,
      "gdp": 0.547,
      "growth": 1.9,
      "perCapita": 958.9,
      "popChangePct": 1.97
    },
    {
      "year": 2004,
      "gdp": 0.622,
      "growth": 3.1,
      "perCapita": 1071.0,
      "popChangePct": 1.93
    },
    {
      "year": 2005,
      "gdp": 0.656,
      "growth": 5.7,
      "perCapita": 1106.4,
      "popChangePct": 2.07
    },
    {
      "year": 2006,
      "gdp": 0.689,
      "growth": -1.8,
      "perCapita": 1138.7,
      "popChangePct": 2.02
    },
    {
      "year": 2007,
      "gdp": 0.796,
      "growth": 0.8,
      "perCapita": 1289.9,
      "popChangePct": 1.98
    },
    {
      "year": 2008,
      "gdp": 0.916,
      "growth": 4,
      "perCapita": 1454.5,
      "popChangePct": 1.94
    },
    {
      "year": 2009,
      "gdp": 0.904,
      "growth": 3.2,
      "perCapita": 1407.6,
      "popChangePct": 2.07
    },
    {
      "year": 2010,
      "gdp": 0.909,
      "growth": 3.8,
      "perCapita": 1385.2,
      "popChangePct": 2.18
    },
    {
      "year": 2011,
      "gdp": 1.023,
      "growth": 4.1,
      "perCapita": 1526.6,
      "popChangePct": 2.13
    },
    {
      "year": 2012,
      "gdp": 1.016,
      "growth": 3.2,
      "perCapita": 1484.9,
      "popChangePct": 2.24
    },
    {
      "year": 2013,
      "gdp": 1.116,
      "growth": 4.5,
      "perCapita": 1596.0,
      "popChangePct": 2.04
    },
    {
      "year": 2014,
      "gdp": 1.15,
      "growth": 2.1,
      "perCapita": 1609.1,
      "popChangePct": 2.29
    },
    {
      "year": 2015,
      "gdp": 0.966,
      "growth": 1.1,
      "perCapita": 1323.1,
      "popChangePct": 2.1
    },
    {
      "year": 2016,
      "gdp": 1.013,
      "growth": 3.3,
      "perCapita": 1356.9,
      "popChangePct": 2.19
    },
    {
      "year": 2017,
      "gdp": 1.077,
      "growth": 3.8,
      "perCapita": 1414.1,
      "popChangePct": 2.14
    },
    {
      "year": 2018,
      "gdp": 1.179,
      "growth": 3.6,
      "perCapita": 1518.8,
      "popChangePct": 1.84
    },
    {
      "year": 2019,
      "gdp": 1.188,
      "growth": 1.8,
      "perCapita": 1502.0,
      "popChangePct": 1.93
    },
    {
      "year": 2020,
      "gdp": 1.218,
      "growth": -0.2,
      "perCapita": 1510.6,
      "popChangePct": 1.9
    },
    {
      "year": 2021,
      "gdp": 1.273,
      "growth": 2,
      "perCapita": 1549.5,
      "popChangePct": 1.99
    },
    {
      "year": 2022,
      "gdp": 1.224,
      "growth": 2.6,
      "perCapita": 1438.5,
      "popChangePct": 3.53
    },
    {
      "year": 2023,
      "gdp": 1.329,
      "growth": 3,
      "perCapita": 1527.0,
      "popChangePct": 2.23
    },
    {
      "year": 2024,
      "gdp": 1.442,
      "growth": 3.3,
      "perCapita": 1620.8,
      "popChangePct": 2.3
    },
    {
      "year": 2025,
      "gdp": 1.609,
      "growth": 3.8,
      "perCapita": 1769.4,
      "popChangePct": 2.25
    },
    {
      "year": 2026,
      "gdp": 1.814,
      "growth": 4.1,
      "perCapita": 1951.0,
      "popChangePct": 2.2
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.93,
      "growth": 4.1,
      "perCapita": 2032.1,
      "popChangePct": 2.15
    },
    {
      "year": 2028,
      "gdp": 2.048,
      "growth": 3.8,
      "perCapita": 2110.4,
      "popChangePct": 2.11
    },
    {
      "year": 2029,
      "gdp": 2.173,
      "growth": 3.6,
      "perCapita": 2192.3,
      "popChangePct": 2.16
    },
    {
      "year": 2030,
      "gdp": 2.315,
      "growth": 3.6,
      "perCapita": 2288.3,
      "popChangePct": 2.12
    },
    {
      "year": 2031,
      "gdp": 2.46,
      "growth": 3.6,
      "perCapita": 2382.4,
      "popChangePct": 2.08
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.381,
      "perCapitaPPP": 1130.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.44,
      "perCapitaPPP": 1272.8,
      "perCapitaPPPChangePct": 12.63,
      "popChangePct": 2.37
    },
    {
      "year": 1982,
      "gdpPPP": 0.486,
      "perCapitaPPP": 1372.9,
      "perCapitaPPPChangePct": 7.86,
      "popChangePct": 2.61
    },
    {
      "year": 1983,
      "gdpPPP": 0.52,
      "perCapitaPPP": 1437.0,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 2.26
    },
    {
      "year": 1984,
      "gdpPPP": 0.562,
      "perCapitaPPP": 1535.6,
      "perCapitaPPPChangePct": 6.86,
      "popChangePct": 1.1
    },
    {
      "year": 1985,
      "gdpPPP": 0.595,
      "perCapitaPPP": 1584.9,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 2.73
    },
    {
      "year": 1986,
      "gdpPPP": 0.62,
      "perCapitaPPP": 1605.8,
      "perCapitaPPPChangePct": 1.32,
      "popChangePct": 2.66
    },
    {
      "year": 1987,
      "gdpPPP": 0.649,
      "perCapitaPPP": 1634.0,
      "perCapitaPPPChangePct": 1.76,
      "popChangePct": 2.85
    },
    {
      "year": 1988,
      "gdpPPP": 0.705,
      "perCapitaPPP": 1727.0,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 2.77
    },
    {
      "year": 1989,
      "gdpPPP": 0.726,
      "perCapitaPPP": 1729.5,
      "perCapitaPPPChangePct": 0.14,
      "popChangePct": 2.94
    },
    {
      "year": 1990,
      "gdpPPP": 0.808,
      "perCapitaPPP": 1874.3,
      "perCapitaPPPChangePct": 8.38,
      "popChangePct": 2.62
    },
    {
      "year": 1991,
      "gdpPPP": 0.784,
      "perCapitaPPP": 1772.4,
      "perCapitaPPPChangePct": -5.44,
      "popChangePct": 2.55
    },
    {
      "year": 1992,
      "gdpPPP": 0.861,
      "perCapitaPPP": 1900.1,
      "perCapitaPPPChangePct": 7.21,
      "popChangePct": 2.49
    },
    {
      "year": 1993,
      "gdpPPP": 0.904,
      "perCapitaPPP": 1950.2,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 2.21
    },
    {
      "year": 1994,
      "gdpPPP": 0.886,
      "perCapitaPPP": 1871.4,
      "perCapitaPPPChangePct": -4.04,
      "popChangePct": 2.16
    },
    {
      "year": 1995,
      "gdpPPP": 0.956,
      "perCapitaPPP": 1975.5,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 2.33
    },
    {
      "year": 1996,
      "gdpPPP": 0.968,
      "perCapitaPPP": 1958.8,
      "perCapitaPPPChangePct": -0.85,
      "popChangePct": 2.07
    },
    {
      "year": 1997,
      "gdpPPP": 1.028,
      "perCapitaPPP": 2036.2,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 2.23
    },
    {
      "year": 1998,
      "gdpPPP": 1.04,
      "perCapitaPPP": 2015.9,
      "perCapitaPPPChangePct": -0.99,
      "popChangePct": 2.18
    },
    {
      "year": 1999,
      "gdpPPP": 1.083,
      "perCapitaPPP": 2057.8,
      "perCapitaPPPChangePct": 2.08,
      "popChangePct": 1.94
    },
    {
      "year": 2000,
      "gdpPPP": 1.097,
      "perCapitaPPP": 2043.2,
      "perCapitaPPPChangePct": -0.71,
      "popChangePct": 2.09
    },
    {
      "year": 2001,
      "gdpPPP": 1.182,
      "perCapitaPPP": 2158.3,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 2.05
    },
    {
      "year": 2002,
      "gdpPPP": 1.256,
      "perCapitaPPP": 2246.2,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 2.01
    },
    {
      "year": 2003,
      "gdpPPP": 1.305,
      "perCapitaPPP": 2289.5,
      "perCapitaPPPChangePct": 1.93,
      "popChangePct": 1.97
    },
    {
      "year": 2004,
      "gdpPPP": 1.382,
      "perCapitaPPP": 2378.0,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 1.93
    },
    {
      "year": 2005,
      "gdpPPP": 1.506,
      "perCapitaPPP": 2541.1,
      "perCapitaPPPChangePct": 6.86,
      "popChangePct": 2.07
    },
    {
      "year": 2006,
      "gdpPPP": 1.525,
      "perCapitaPPP": 2522.5,
      "perCapitaPPPChangePct": -0.73,
      "popChangePct": 2.02
    },
    {
      "year": 2007,
      "gdpPPP": 1.579,
      "perCapitaPPP": 2559.8,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 1.98
    },
    {
      "year": 2008,
      "gdpPPP": 1.673,
      "perCapitaPPP": 2658.4,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 1.94
    },
    {
      "year": 2009,
      "gdpPPP": 1.738,
      "perCapitaPPP": 2705.5,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 2.07
    },
    {
      "year": 2010,
      "gdpPPP": 1.826,
      "perCapitaPPP": 2783.2,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 2.18
    },
    {
      "year": 2011,
      "gdpPPP": 1.941,
      "perCapitaPPP": 2896.3,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 2.13
    },
    {
      "year": 2012,
      "gdpPPP": 2.04,
      "perCapitaPPP": 2979.4,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 2.24
    },
    {
      "year": 2013,
      "gdpPPP": 2.167,
      "perCapitaPPP": 3098.2,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.04
    },
    {
      "year": 2014,
      "gdpPPP": 2.251,
      "perCapitaPPP": 3150.1,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 2.29
    },
    {
      "year": 2015,
      "gdpPPP": 2.298,
      "perCapitaPPP": 3147.1,
      "perCapitaPPPChangePct": -0.1,
      "popChangePct": 2.1
    },
    {
      "year": 2016,
      "gdpPPP": 2.397,
      "perCapitaPPP": 3212.0,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 2.19
    },
    {
      "year": 2017,
      "gdpPPP": 2.533,
      "perCapitaPPP": 3325.5,
      "perCapitaPPPChangePct": 3.53,
      "popChangePct": 2.14
    },
    {
      "year": 2018,
      "gdpPPP": 2.528,
      "perCapitaPPP": 3256.1,
      "perCapitaPPPChangePct": -2.09,
      "popChangePct": 1.84
    },
    {
      "year": 2019,
      "gdpPPP": 2.59,
      "perCapitaPPP": 3274.7,
      "perCapitaPPPChangePct": 0.57,
      "popChangePct": 1.93
    },
    {
      "year": 2020,
      "gdpPPP": 2.603,
      "perCapitaPPP": 3228.8,
      "perCapitaPPPChangePct": -1.4,
      "popChangePct": 1.9
    },
    {
      "year": 2021,
      "gdpPPP": 2.764,
      "perCapitaPPP": 3363.7,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 1.99
    },
    {
      "year": 2022,
      "gdpPPP": 3.037,
      "perCapitaPPP": 3570.4,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 3.53
    },
    {
      "year": 2023,
      "gdpPPP": 3.244,
      "perCapitaPPP": 3728.6,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 2.23
    },
    {
      "year": 2024,
      "gdpPPP": 3.436,
      "perCapitaPPP": 3861.6,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 2.3
    },
    {
      "year": 2025,
      "gdpPPP": 3.666,
      "perCapitaPPP": 4031.2,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.25
    },
    {
      "year": 2026,
      "gdpPPP": 3.925,
      "perCapitaPPP": 4222.5,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 2.2
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 4.177,
      "perCapitaPPP": 4396.9,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 2.15
    },
    {
      "year": 2028,
      "gdpPPP": 4.409,
      "perCapitaPPP": 4543.1,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.11
    },
    {
      "year": 2029,
      "gdpPPP": 4.65,
      "perCapitaPPP": 4691.4,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 2.16
    },
    {
      "year": 2030,
      "gdpPPP": 4.907,
      "perCapitaPPP": 4849.7,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 2.12
    },
    {
      "year": 2031,
      "gdpPPP": 5.178,
      "perCapitaPPP": 5013.5,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 2.08
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ComorosGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
