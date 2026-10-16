import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Solomon Islands",
  "slug": "solomon-islands",
  "iso3": "SLB",
  "region": "Oceania",
  "rank2026": 194,
  "flagEmoji": "🇸🇧",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Timor-Leste",
      "slug": "timor-leste",
      "rank": 193
    },
    {
      "name": "Comoros",
      "slug": "comoros",
      "rank": 195
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.217,
      "growth": -2.7,
      "perCapita": 939.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.23,
      "growth": -1.8,
      "perCapita": 962.8,
      "popChangePct": 3.03
    },
    {
      "year": 1982,
      "gdp": 0.229,
      "growth": -1.7,
      "perCapita": 927.3,
      "popChangePct": 3.36
    },
    {
      "year": 1983,
      "gdp": 0.215,
      "growth": 3.9,
      "perCapita": 843.4,
      "popChangePct": 3.66
    },
    {
      "year": 1984,
      "gdp": 0.215,
      "growth": 0.2,
      "perCapita": 818.9,
      "popChangePct": 3.14
    },
    {
      "year": 1985,
      "gdp": 0.196,
      "growth": -3.1,
      "perCapita": 724.2,
      "popChangePct": 3.04
    },
    {
      "year": 1986,
      "gdp": 0.175,
      "growth": -0.2,
      "perCapita": 627.2,
      "popChangePct": 2.95
    },
    {
      "year": 1987,
      "gdp": 0.184,
      "growth": 8.4,
      "perCapita": 640.7,
      "popChangePct": 2.87
    },
    {
      "year": 1988,
      "gdp": 0.209,
      "growth": 1.3,
      "perCapita": 708.9,
      "popChangePct": 2.79
    },
    {
      "year": 1989,
      "gdp": 0.205,
      "growth": 4.3,
      "perCapita": 675.4,
      "popChangePct": 2.71
    },
    {
      "year": 1990,
      "gdp": 0.255,
      "growth": 2.2,
      "perCapita": 811.2,
      "popChangePct": 3.63
    },
    {
      "year": 1991,
      "gdp": 0.27,
      "growth": 6,
      "perCapita": 831.0,
      "popChangePct": 3.18
    },
    {
      "year": 1992,
      "gdp": 0.319,
      "growth": 12.7,
      "perCapita": 951.5,
      "popChangePct": 3.4
    },
    {
      "year": 1993,
      "gdp": 0.356,
      "growth": 4,
      "perCapita": 1031.1,
      "popChangePct": 3.28
    },
    {
      "year": 1994,
      "gdp": 0.477,
      "growth": 8.1,
      "perCapita": 1340.1,
      "popChangePct": 2.89
    },
    {
      "year": 1995,
      "gdp": 0.556,
      "growth": 10.1,
      "perCapita": 1516.6,
      "popChangePct": 3.09
    },
    {
      "year": 1996,
      "gdp": 0.605,
      "growth": 1.6,
      "perCapita": 1603.3,
      "popChangePct": 2.72
    },
    {
      "year": 1997,
      "gdp": 0.624,
      "growth": -0.9,
      "perCapita": 1608.3,
      "popChangePct": 2.92
    },
    {
      "year": 1998,
      "gdp": 0.542,
      "growth": 1.3,
      "perCapita": 1360.5,
      "popChangePct": 2.58
    },
    {
      "year": 1999,
      "gdp": 0.578,
      "growth": -0.5,
      "perCapita": 1413.5,
      "popChangePct": 2.76
    },
    {
      "year": 2000,
      "gdp": 0.497,
      "growth": -14.3,
      "perCapita": 1175.1,
      "popChangePct": 3.42
    },
    {
      "year": 2001,
      "gdp": 0.485,
      "growth": -8,
      "perCapita": 1108.9,
      "popChangePct": 3.55
    },
    {
      "year": 2002,
      "gdp": 0.41,
      "growth": -2.8,
      "perCapita": 908.4,
      "popChangePct": 3.2
    },
    {
      "year": 2003,
      "gdp": 0.418,
      "growth": 6.5,
      "perCapita": 896.2,
      "popChangePct": 3.1
    },
    {
      "year": 2004,
      "gdp": 0.468,
      "growth": 7.7,
      "perCapita": 974.4,
      "popChangePct": 3.0
    },
    {
      "year": 2005,
      "gdp": 0.553,
      "growth": 7.4,
      "perCapita": 1118.0,
      "popChangePct": 3.13
    },
    {
      "year": 2006,
      "gdp": 0.617,
      "growth": 4.1,
      "perCapita": 1213.2,
      "popChangePct": 2.83
    },
    {
      "year": 2007,
      "gdp": 0.695,
      "growth": 3.6,
      "perCapita": 1329.4,
      "popChangePct": 2.75
    },
    {
      "year": 2008,
      "gdp": 0.776,
      "growth": 6.2,
      "perCapita": 1444.9,
      "popChangePct": 2.68
    },
    {
      "year": 2009,
      "gdp": 0.806,
      "growth": 2.9,
      "perCapita": 1460.6,
      "popChangePct": 2.79
    },
    {
      "year": 2010,
      "gdp": 0.898,
      "growth": 9.7,
      "perCapita": 1582.8,
      "popChangePct": 2.72
    },
    {
      "year": 2011,
      "gdp": 1.064,
      "growth": 7.4,
      "perCapita": 1823.7,
      "popChangePct": 2.82
    },
    {
      "year": 2012,
      "gdp": 1.185,
      "growth": 2.4,
      "perCapita": 1977.7,
      "popChangePct": 2.74
    },
    {
      "year": 2013,
      "gdp": 1.286,
      "growth": 5.3,
      "perCapita": 2090.2,
      "popChangePct": 2.67
    },
    {
      "year": 2014,
      "gdp": 1.336,
      "growth": 1.2,
      "perCapita": 2116.2,
      "popChangePct": 2.6
    },
    {
      "year": 2015,
      "gdp": 1.308,
      "growth": 1.7,
      "perCapita": 2021.3,
      "popChangePct": 2.54
    },
    {
      "year": 2016,
      "gdp": 1.379,
      "growth": 5.6,
      "perCapita": 2080.8,
      "popChangePct": 2.47
    },
    {
      "year": 2017,
      "gdp": 1.47,
      "growth": 3.1,
      "perCapita": 2165.0,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdp": 1.615,
      "growth": 2.7,
      "perCapita": 2325.0,
      "popChangePct": 2.36
    },
    {
      "year": 2019,
      "gdp": 1.619,
      "growth": 1.7,
      "perCapita": 2278.1,
      "popChangePct": 2.3
    },
    {
      "year": 2020,
      "gdp": 1.536,
      "growth": -3.4,
      "perCapita": 2118.6,
      "popChangePct": 1.97
    },
    {
      "year": 2021,
      "gdp": 1.558,
      "growth": -0.2,
      "perCapita": 2107.1,
      "popChangePct": 2.07
    },
    {
      "year": 2022,
      "gdp": 1.467,
      "growth": -2.6,
      "perCapita": 1944.9,
      "popChangePct": 1.89
    },
    {
      "year": 2023,
      "gdp": 1.506,
      "growth": 2.8,
      "perCapita": 1959.3,
      "popChangePct": 1.99
    },
    {
      "year": 2024,
      "gdp": 1.584,
      "growth": 3,
      "perCapita": 2022.1,
      "popChangePct": 1.82
    },
    {
      "year": 2025,
      "gdp": 1.704,
      "growth": 2.7,
      "perCapita": 2134.9,
      "popChangePct": 1.92
    },
    {
      "year": 2026,
      "gdp": 1.836,
      "growth": 2.8,
      "perCapita": 2258.0,
      "popChangePct": 1.88
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.949,
      "growth": 2.9,
      "perCapita": 2353.1,
      "popChangePct": 1.85
    },
    {
      "year": 2028,
      "gdp": 2.076,
      "growth": 3,
      "perCapita": 2461.7,
      "popChangePct": 1.81
    },
    {
      "year": 2029,
      "gdp": 2.212,
      "growth": 3,
      "perCapita": 2577.3,
      "popChangePct": 1.78
    },
    {
      "year": 2030,
      "gdp": 2.36,
      "growth": 3,
      "perCapita": 2700.5,
      "popChangePct": 1.86
    },
    {
      "year": 2031,
      "gdp": 2.509,
      "growth": 3,
      "perCapita": 2821.5,
      "popChangePct": 1.72
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.219,
      "perCapitaPPP": 950.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.236,
      "perCapitaPPP": 988.2,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 3.03
    },
    {
      "year": 1982,
      "gdpPPP": 0.246,
      "perCapitaPPP": 998.1,
      "perCapitaPPPChangePct": 1.01,
      "popChangePct": 3.36
    },
    {
      "year": 1983,
      "gdpPPP": 0.266,
      "perCapitaPPP": 1043.2,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 3.66
    },
    {
      "year": 1984,
      "gdpPPP": 0.276,
      "perCapitaPPP": 1049.2,
      "perCapitaPPPChangePct": 0.58,
      "popChangePct": 3.14
    },
    {
      "year": 1985,
      "gdpPPP": 0.275,
      "perCapitaPPP": 1017.2,
      "perCapitaPPPChangePct": -3.06,
      "popChangePct": 3.04
    },
    {
      "year": 1986,
      "gdpPPP": 0.28,
      "perCapitaPPP": 1005.7,
      "perCapitaPPPChangePct": -1.13,
      "popChangePct": 2.95
    },
    {
      "year": 1987,
      "gdpPPP": 0.312,
      "perCapitaPPP": 1086.1,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 2.87
    },
    {
      "year": 1988,
      "gdpPPP": 0.327,
      "perCapitaPPP": 1107.2,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 2.79
    },
    {
      "year": 1989,
      "gdpPPP": 0.354,
      "perCapitaPPP": 1166.8,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 2.71
    },
    {
      "year": 1990,
      "gdpPPP": 0.375,
      "perCapitaPPP": 1195.4,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 3.63
    },
    {
      "year": 1991,
      "gdpPPP": 0.411,
      "perCapitaPPP": 1267.3,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 3.18
    },
    {
      "year": 1992,
      "gdpPPP": 0.474,
      "perCapitaPPP": 1414.7,
      "perCapitaPPPChangePct": 11.63,
      "popChangePct": 3.4
    },
    {
      "year": 1993,
      "gdpPPP": 0.505,
      "perCapitaPPP": 1460.0,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 3.28
    },
    {
      "year": 1994,
      "gdpPPP": 0.557,
      "perCapitaPPP": 1564.1,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 2.89
    },
    {
      "year": 1995,
      "gdpPPP": 0.626,
      "perCapitaPPP": 1707.3,
      "perCapitaPPPChangePct": 9.15,
      "popChangePct": 3.09
    },
    {
      "year": 1996,
      "gdpPPP": 0.648,
      "perCapitaPPP": 1717.0,
      "perCapitaPPPChangePct": 0.57,
      "popChangePct": 2.72
    },
    {
      "year": 1997,
      "gdpPPP": 0.653,
      "perCapitaPPP": 1683.5,
      "perCapitaPPPChangePct": -1.95,
      "popChangePct": 2.92
    },
    {
      "year": 1998,
      "gdpPPP": 0.669,
      "perCapitaPPP": 1678.6,
      "perCapitaPPPChangePct": -0.29,
      "popChangePct": 2.58
    },
    {
      "year": 1999,
      "gdpPPP": 0.675,
      "perCapitaPPP": 1650.3,
      "perCapitaPPPChangePct": -1.69,
      "popChangePct": 2.76
    },
    {
      "year": 2000,
      "gdpPPP": 0.592,
      "perCapitaPPP": 1398.0,
      "perCapitaPPPChangePct": -15.29,
      "popChangePct": 3.42
    },
    {
      "year": 2001,
      "gdpPPP": 0.557,
      "perCapitaPPP": 1272.9,
      "perCapitaPPPChangePct": -8.95,
      "popChangePct": 3.55
    },
    {
      "year": 2002,
      "gdpPPP": 0.55,
      "perCapitaPPP": 1216.9,
      "perCapitaPPPChangePct": -4.4,
      "popChangePct": 3.2
    },
    {
      "year": 2003,
      "gdpPPP": 0.597,
      "perCapitaPPP": 1281.4,
      "perCapitaPPPChangePct": 5.31,
      "popChangePct": 3.1
    },
    {
      "year": 2004,
      "gdpPPP": 0.66,
      "perCapitaPPP": 1375.0,
      "perCapitaPPPChangePct": 7.3,
      "popChangePct": 3.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.731,
      "perCapitaPPP": 1478.6,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 3.13
    },
    {
      "year": 2006,
      "gdpPPP": 0.785,
      "perCapitaPPP": 1542.8,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 2.83
    },
    {
      "year": 2007,
      "gdpPPP": 0.836,
      "perCapitaPPP": 1597.5,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 2.75
    },
    {
      "year": 2008,
      "gdpPPP": 0.905,
      "perCapitaPPP": 1683.8,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 2.68
    },
    {
      "year": 2009,
      "gdpPPP": 0.936,
      "perCapitaPPP": 1697.7,
      "perCapitaPPPChangePct": 0.83,
      "popChangePct": 2.79
    },
    {
      "year": 2010,
      "gdpPPP": 1.04,
      "perCapitaPPP": 1832.3,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 2.72
    },
    {
      "year": 2011,
      "gdpPPP": 1.14,
      "perCapitaPPP": 1954.2,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 2.82
    },
    {
      "year": 2012,
      "gdpPPP": 1.189,
      "perCapitaPPP": 1983.4,
      "perCapitaPPPChangePct": 1.5,
      "popChangePct": 2.74
    },
    {
      "year": 2013,
      "gdpPPP": 1.274,
      "perCapitaPPP": 2070.0,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 2.67
    },
    {
      "year": 2014,
      "gdpPPP": 1.311,
      "perCapitaPPP": 2077.4,
      "perCapitaPPPChangePct": 0.35,
      "popChangePct": 2.6
    },
    {
      "year": 2015,
      "gdpPPP": 1.345,
      "perCapitaPPP": 2079.3,
      "perCapitaPPPChangePct": 0.09,
      "popChangePct": 2.54
    },
    {
      "year": 2016,
      "gdpPPP": 1.434,
      "perCapitaPPP": 2162.5,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 2.47
    },
    {
      "year": 2017,
      "gdpPPP": 1.504,
      "perCapitaPPP": 2215.7,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdpPPP": 1.581,
      "perCapitaPPP": 2275.3,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 2.36
    },
    {
      "year": 2019,
      "gdpPPP": 1.635,
      "perCapitaPPP": 2300.6,
      "perCapitaPPPChangePct": 1.11,
      "popChangePct": 2.3
    },
    {
      "year": 2020,
      "gdpPPP": 1.601,
      "perCapitaPPP": 2208.2,
      "perCapitaPPPChangePct": -4.02,
      "popChangePct": 1.97
    },
    {
      "year": 2021,
      "gdpPPP": 1.67,
      "perCapitaPPP": 2258.5,
      "perCapitaPPPChangePct": 2.28,
      "popChangePct": 2.07
    },
    {
      "year": 2022,
      "gdpPPP": 1.743,
      "perCapitaPPP": 2311.2,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 1.89
    },
    {
      "year": 2023,
      "gdpPPP": 1.859,
      "perCapitaPPP": 2418.1,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 1.99
    },
    {
      "year": 2024,
      "gdpPPP": 1.962,
      "perCapitaPPP": 2504.7,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 1.82
    },
    {
      "year": 2025,
      "gdpPPP": 2.072,
      "perCapitaPPP": 2595.9,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 1.92
    },
    {
      "year": 2026,
      "gdpPPP": 2.19,
      "perCapitaPPP": 2694.2,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 1.88
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2.303,
      "perCapitaPPP": 2781.1,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 1.85
    },
    {
      "year": 2028,
      "gdpPPP": 2.41,
      "perCapitaPPP": 2857.9,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 1.81
    },
    {
      "year": 2029,
      "gdpPPP": 2.526,
      "perCapitaPPP": 2942.1,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 1.78
    },
    {
      "year": 2030,
      "gdpPPP": 2.65,
      "perCapitaPPP": 3032.9,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 1.86
    },
    {
      "year": 2031,
      "gdpPPP": 2.778,
      "perCapitaPPP": 3124.5,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 1.72
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SolomonIslandsGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
