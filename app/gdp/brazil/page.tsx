import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Brazil",
  "slug": "brazil",
  "iso3": "BRA",
  "region": "Americas",
  "rank2026": 10,
  "flagEmoji": "🇧🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Russia",
      "slug": "russia",
      "rank": 9
    },
    {
      "name": "Canada",
      "slug": "canada",
      "rank": 11
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 145.819,
      "growth": 9.2,
      "perCapita": 1229.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 167.583,
      "growth": -4.4,
      "perCapita": 1382.5,
      "popChangePct": 2.24
    },
    {
      "year": 1982,
      "gdp": 179.166,
      "growth": 0.6,
      "perCapita": 1446.2,
      "popChangePct": 2.2
    },
    {
      "year": 1983,
      "gdp": 143.652,
      "growth": -3.4,
      "perCapita": 1134.9,
      "popChangePct": 2.17
    },
    {
      "year": 1984,
      "gdp": 142.957,
      "growth": 5.3,
      "perCapita": 1105.9,
      "popChangePct": 2.13
    },
    {
      "year": 1985,
      "gdp": 226.938,
      "growth": 7.9,
      "perCapita": 1719.5,
      "popChangePct": 2.09
    },
    {
      "year": 1986,
      "gdp": 263.256,
      "growth": 7.5,
      "perCapita": 1955.1,
      "popChangePct": 2.03
    },
    {
      "year": 1987,
      "gdp": 286.539,
      "growth": 3.6,
      "perCapita": 2087.4,
      "popChangePct": 1.94
    },
    {
      "year": 1988,
      "gdp": 320.105,
      "growth": 0.3,
      "perCapita": 2289.4,
      "popChangePct": 1.86
    },
    {
      "year": 1989,
      "gdp": 439.434,
      "growth": 3.2,
      "perCapita": 3087.9,
      "popChangePct": 1.78
    },
    {
      "year": 1990,
      "gdp": 455.335,
      "growth": -4.2,
      "perCapita": 3106.1,
      "popChangePct": 3.01
    },
    {
      "year": 1991,
      "gdp": 399.249,
      "growth": 1,
      "perCapita": 2677.8,
      "popChangePct": 1.71
    },
    {
      "year": 1992,
      "gdp": 382.465,
      "growth": -0.5,
      "perCapita": 2523.7,
      "popChangePct": 1.65
    },
    {
      "year": 1993,
      "gdp": 429.184,
      "growth": 4.7,
      "perCapita": 2787.2,
      "popChangePct": 1.61
    },
    {
      "year": 1994,
      "gdp": 546.764,
      "growth": 5.3,
      "perCapita": 3495.2,
      "popChangePct": 1.59
    },
    {
      "year": 1995,
      "gdp": 770.86,
      "growth": 4.4,
      "perCapita": 4852.0,
      "popChangePct": 1.56
    },
    {
      "year": 1996,
      "gdp": 851.146,
      "growth": 2.2,
      "perCapita": 5204.6,
      "popChangePct": 2.94
    },
    {
      "year": 1997,
      "gdp": 883.862,
      "growth": 3.4,
      "perCapita": 5321.1,
      "popChangePct": 1.57
    },
    {
      "year": 1998,
      "gdp": 864.307,
      "growth": 0.3,
      "perCapita": 5123.5,
      "popChangePct": 1.56
    },
    {
      "year": 1999,
      "gdp": 599.642,
      "growth": 0.5,
      "perCapita": 3501.4,
      "popChangePct": 1.52
    },
    {
      "year": 2000,
      "gdp": 655.454,
      "growth": 4.4,
      "perCapita": 3752.0,
      "popChangePct": 2.01
    },
    {
      "year": 2001,
      "gdp": 559.982,
      "growth": 1.4,
      "perCapita": 3163.7,
      "popChangePct": 1.32
    },
    {
      "year": 2002,
      "gdp": 509.798,
      "growth": 3.1,
      "perCapita": 2844.4,
      "popChangePct": 1.26
    },
    {
      "year": 2003,
      "gdp": 558.232,
      "growth": 1.1,
      "perCapita": 3077.7,
      "popChangePct": 1.2
    },
    {
      "year": 2004,
      "gdp": 669.29,
      "growth": 5.8,
      "perCapita": 3648.0,
      "popChangePct": 1.15
    },
    {
      "year": 2005,
      "gdp": 891.633,
      "growth": 3.2,
      "perCapita": 4806.2,
      "popChangePct": 1.12
    },
    {
      "year": 2006,
      "gdp": 1107.628,
      "growth": 4,
      "perCapita": 5906.2,
      "popChangePct": 1.09
    },
    {
      "year": 2007,
      "gdp": 1397.114,
      "growth": 6.1,
      "perCapita": 7374.2,
      "popChangePct": 1.03
    },
    {
      "year": 2008,
      "gdp": 1695.855,
      "growth": 5.1,
      "perCapita": 8863.3,
      "popChangePct": 0.99
    },
    {
      "year": 2009,
      "gdp": 1669.204,
      "growth": -0.1,
      "perCapita": 8640.9,
      "popChangePct": 0.96
    },
    {
      "year": 2010,
      "gdp": 2208.704,
      "growth": 7.5,
      "perCapita": 11341.3,
      "popChangePct": 0.82
    },
    {
      "year": 2011,
      "gdp": 2614.027,
      "growth": 4,
      "perCapita": 13326.1,
      "popChangePct": 0.72
    },
    {
      "year": 2012,
      "gdp": 2464.053,
      "growth": 1.9,
      "perCapita": 12465.5,
      "popChangePct": 0.77
    },
    {
      "year": 2013,
      "gdp": 2471.718,
      "growth": 3,
      "perCapita": 12406.6,
      "popChangePct": 0.79
    },
    {
      "year": 2014,
      "gdp": 2456.055,
      "growth": 0.5,
      "perCapita": 12230.7,
      "popChangePct": 0.8
    },
    {
      "year": 2015,
      "gdp": 1800.046,
      "growth": -3.5,
      "perCapita": 8893.3,
      "popChangePct": 0.79
    },
    {
      "year": 2016,
      "gdp": 1796.622,
      "growth": -3.3,
      "perCapita": 8812.5,
      "popChangePct": 0.73
    },
    {
      "year": 2017,
      "gdp": 2063.519,
      "growth": 1.3,
      "perCapita": 10055.6,
      "popChangePct": 0.66
    },
    {
      "year": 2018,
      "gdp": 1916.934,
      "growth": 1.8,
      "perCapita": 9281.7,
      "popChangePct": 0.64
    },
    {
      "year": 2019,
      "gdp": 1873.286,
      "growth": 1.2,
      "perCapita": 9010.5,
      "popChangePct": 0.66
    },
    {
      "year": 2020,
      "gdp": 1476.092,
      "growth": -3.3,
      "perCapita": 7057.1,
      "popChangePct": 0.61
    },
    {
      "year": 2021,
      "gdp": 1670.65,
      "growth": 4.8,
      "perCapita": 7951.6,
      "popChangePct": 0.45
    },
    {
      "year": 2022,
      "gdp": 1951.849,
      "growth": 3,
      "perCapita": 9256.5,
      "popChangePct": 0.36
    },
    {
      "year": 2023,
      "gdp": 2191.137,
      "growth": 3.2,
      "perCapita": 10350.4,
      "popChangePct": 0.39
    },
    {
      "year": 2024,
      "gdp": 2185.822,
      "growth": 3.4,
      "perCapita": 10282.2,
      "popChangePct": 0.42
    },
    {
      "year": 2025,
      "gdp": 2279.918,
      "growth": 2.3,
      "perCapita": 10685.7,
      "popChangePct": 0.37
    },
    {
      "year": 2026,
      "gdp": 2635.912,
      "growth": 1.9,
      "perCapita": 12312.6,
      "popChangePct": 0.34
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2766.558,
      "growth": 2,
      "perCapita": 12882.3,
      "popChangePct": 0.31
    },
    {
      "year": 2028,
      "gdp": 2879.42,
      "growth": 2.4,
      "perCapita": 13368.9,
      "popChangePct": 0.29
    },
    {
      "year": 2029,
      "gdp": 3037.171,
      "growth": 2.5,
      "perCapita": 14063.3,
      "popChangePct": 0.27
    },
    {
      "year": 2030,
      "gdp": 3203.508,
      "growth": 2.5,
      "perCapita": 14796.8,
      "popChangePct": 0.25
    },
    {
      "year": 2031,
      "gdp": 3378.877,
      "growth": 2.5,
      "perCapita": 15571.7,
      "popChangePct": 0.23
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 524.99,
      "perCapitaPPP": 4427.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 549.376,
      "perCapitaPPP": 4532.3,
      "perCapitaPPPChangePct": 2.36,
      "popChangePct": 2.24
    },
    {
      "year": 1982,
      "gdpPPP": 586.799,
      "perCapitaPPP": 4736.6,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 2.2
    },
    {
      "year": 1983,
      "gdpPPP": 589.044,
      "perCapitaPPP": 4653.8,
      "perCapitaPPPChangePct": -1.75,
      "popChangePct": 2.17
    },
    {
      "year": 1984,
      "gdpPPP": 642.696,
      "perCapitaPPP": 4971.6,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": 2.13
    },
    {
      "year": 1985,
      "gdpPPP": 715.402,
      "perCapitaPPP": 5420.6,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": 2.09
    },
    {
      "year": 1986,
      "gdpPPP": 784.865,
      "perCapitaPPP": 5828.8,
      "perCapitaPPPChangePct": 7.53,
      "popChangePct": 2.03
    },
    {
      "year": 1987,
      "gdpPPP": 833.276,
      "perCapitaPPP": 6070.4,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 1.94
    },
    {
      "year": 1988,
      "gdpPPP": 864.942,
      "perCapitaPPP": 6186.2,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 1.86
    },
    {
      "year": 1989,
      "gdpPPP": 927.623,
      "perCapitaPPP": 6518.5,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 1.78
    },
    {
      "year": 1990,
      "gdpPPP": 922.224,
      "perCapitaPPP": 6291.0,
      "perCapitaPPPChangePct": -3.49,
      "popChangePct": 3.01
    },
    {
      "year": 1991,
      "gdpPPP": 963.251,
      "perCapitaPPP": 6460.7,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 1.71
    },
    {
      "year": 1992,
      "gdpPPP": 980.605,
      "perCapitaPPP": 6470.6,
      "perCapitaPPPChangePct": 0.15,
      "popChangePct": 1.65
    },
    {
      "year": 1993,
      "gdpPPP": 1050.674,
      "perCapitaPPP": 6823.2,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 1.61
    },
    {
      "year": 1994,
      "gdpPPP": 1130.355,
      "perCapitaPPP": 7225.9,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 1.59
    },
    {
      "year": 1995,
      "gdpPPP": 1205.024,
      "perCapitaPPP": 7584.7,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 1.56
    },
    {
      "year": 1996,
      "gdpPPP": 1254.191,
      "perCapitaPPP": 7669.1,
      "perCapitaPPPChangePct": 1.11,
      "popChangePct": 2.94
    },
    {
      "year": 1997,
      "gdpPPP": 1319.129,
      "perCapitaPPP": 7941.6,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 1.57
    },
    {
      "year": 1998,
      "gdpPPP": 1338.467,
      "perCapitaPPP": 7934.3,
      "perCapitaPPPChangePct": -0.09,
      "popChangePct": 1.56
    },
    {
      "year": 1999,
      "gdpPPP": 1363.758,
      "perCapitaPPP": 7963.3,
      "perCapitaPPPChangePct": 0.36,
      "popChangePct": 1.52
    },
    {
      "year": 2000,
      "gdpPPP": 1455.848,
      "perCapitaPPP": 8333.6,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 2.01
    },
    {
      "year": 2001,
      "gdpPPP": 1509.318,
      "perCapitaPPP": 8527.0,
      "perCapitaPPPChangePct": 2.32,
      "popChangePct": 1.32
    },
    {
      "year": 2002,
      "gdpPPP": 1579.574,
      "perCapitaPPP": 8813.2,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 1.26
    },
    {
      "year": 2003,
      "gdpPPP": 1629.137,
      "perCapitaPPP": 8982.0,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 1.2
    },
    {
      "year": 2004,
      "gdpPPP": 1769.302,
      "perCapitaPPP": 9643.6,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": 1.15
    },
    {
      "year": 2005,
      "gdpPPP": 1883.216,
      "perCapitaPPP": 10151.1,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": 1.12
    },
    {
      "year": 2006,
      "gdpPPP": 2018.204,
      "perCapitaPPP": 10761.7,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.09
    },
    {
      "year": 2007,
      "gdpPPP": 2198.704,
      "perCapitaPPP": 11605.2,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 1.03
    },
    {
      "year": 2008,
      "gdpPPP": 2355.228,
      "perCapitaPPP": 12309.4,
      "perCapitaPPPChangePct": 6.07,
      "popChangePct": 0.99
    },
    {
      "year": 2009,
      "gdpPPP": 2366.771,
      "perCapitaPPP": 12252.0,
      "perCapitaPPPChangePct": -0.47,
      "popChangePct": 0.96
    },
    {
      "year": 2010,
      "gdpPPP": 2575.879,
      "perCapitaPPP": 13226.6,
      "perCapitaPPPChangePct": 7.95,
      "popChangePct": 0.82
    },
    {
      "year": 2011,
      "gdpPPP": 2733.512,
      "perCapitaPPP": 13935.2,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.72
    },
    {
      "year": 2012,
      "gdpPPP": 2837.901,
      "perCapitaPPP": 14356.7,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 0.77
    },
    {
      "year": 2013,
      "gdpPPP": 2972.929,
      "perCapitaPPP": 14922.3,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 0.79
    },
    {
      "year": 2014,
      "gdpPPP": 3039.952,
      "perCapitaPPP": 15138.4,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 0.8
    },
    {
      "year": 2015,
      "gdpPPP": 2959.374,
      "perCapitaPPP": 14621.1,
      "perCapitaPPPChangePct": -3.42,
      "popChangePct": 0.79
    },
    {
      "year": 2016,
      "gdpPPP": 2889.626,
      "perCapitaPPP": 14173.7,
      "perCapitaPPPChangePct": -3.06,
      "popChangePct": 0.73
    },
    {
      "year": 2017,
      "gdpPPP": 2980.287,
      "perCapitaPPP": 14523,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 0.66
    },
    {
      "year": 2018,
      "gdpPPP": 3187.19,
      "perCapitaPPP": 15432.2,
      "perCapitaPPPChangePct": 6.26,
      "popChangePct": 0.64
    },
    {
      "year": 2019,
      "gdpPPP": 3333.776,
      "perCapitaPPP": 16035.5,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 0.66
    },
    {
      "year": 2020,
      "gdpPPP": 3359.777,
      "perCapitaPPP": 16062.8,
      "perCapitaPPPChangePct": 0.17,
      "popChangePct": 0.61
    },
    {
      "year": 2021,
      "gdpPPP": 3787.77,
      "perCapitaPPP": 18028.1,
      "perCapitaPPPChangePct": 12.23,
      "popChangePct": 0.45
    },
    {
      "year": 2022,
      "gdpPPP": 4179.563,
      "perCapitaPPP": 19821.2,
      "perCapitaPPPChangePct": 9.95,
      "popChangePct": 0.36
    },
    {
      "year": 2023,
      "gdpPPP": 4474.703,
      "perCapitaPPP": 21137.5,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": 0.39
    },
    {
      "year": 2024,
      "gdpPPP": 4742.6,
      "perCapitaPPP": 22309.3,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 0.42
    },
    {
      "year": 2025,
      "gdpPPP": 4988.607,
      "perCapitaPPP": 23381.0,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 0.37
    },
    {
      "year": 2026,
      "gdpPPP": 5229.586,
      "perCapitaPPP": 24427.8,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.34
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 5449.217,
      "perCapitaPPP": 25373.8,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 0.31
    },
    {
      "year": 2028,
      "gdpPPP": 5668.941,
      "perCapitaPPP": 26320.4,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 0.29
    },
    {
      "year": 2029,
      "gdpPPP": 5914.167,
      "perCapitaPPP": 27385.0,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 0.27
    },
    {
      "year": 2030,
      "gdpPPP": 6173.603,
      "perCapitaPPP": 28515.6,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 0.25
    },
    {
      "year": 2031,
      "gdpPPP": 6442.38,
      "perCapitaPPP": 29689.9,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 0.23
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BrazilGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
