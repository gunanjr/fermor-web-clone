import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "DR Congo",
  "slug": "dr-congo",
  "iso3": "COD",
  "region": "Africa",
  "rank2026": 71,
  "flagEmoji": "🇨🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Guatemala",
      "slug": "guatemala",
      "rank": 70
    },
    {
      "name": "Ethiopia",
      "slug": "ethiopia",
      "rank": 72
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 68.606,
      "growth": 2.4,
      "perCapita": 2730.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 59.726,
      "growth": 0.9,
      "perCapita": 2301.3,
      "popChangePct": 3.3
    },
    {
      "year": 1982,
      "gdp": 64.939,
      "growth": -0.5,
      "perCapita": 2422.2,
      "popChangePct": 3.3
    },
    {
      "year": 1983,
      "gdp": 52.378,
      "growth": 1.4,
      "perCapita": 1891.3,
      "popChangePct": 3.3
    },
    {
      "year": 1984,
      "gdp": 34.951,
      "growth": 4.8,
      "perCapita": 1221.7,
      "popChangePct": 3.3
    },
    {
      "year": 1985,
      "gdp": 31.943,
      "growth": 0.5,
      "perCapita": 1080.9,
      "popChangePct": 3.3
    },
    {
      "year": 1986,
      "gdp": 35.84,
      "growth": 4.7,
      "perCapita": 1174.0,
      "popChangePct": 3.3
    },
    {
      "year": 1987,
      "gdp": 33.932,
      "growth": 2.7,
      "perCapita": 1076.0,
      "popChangePct": 3.3
    },
    {
      "year": 1988,
      "gdp": 39.314,
      "growth": 0.5,
      "perCapita": 1206.8,
      "popChangePct": 3.3
    },
    {
      "year": 1989,
      "gdp": 40.006,
      "growth": -1.3,
      "perCapita": 1188.9,
      "popChangePct": 3.3
    },
    {
      "year": 1990,
      "gdp": 41.448,
      "growth": -6.6,
      "perCapita": 1192.4,
      "popChangePct": 3.3
    },
    {
      "year": 1991,
      "gdp": 40.25,
      "growth": -8.4,
      "perCapita": 1120.9,
      "popChangePct": 3.3
    },
    {
      "year": 1992,
      "gdp": 36.333,
      "growth": -10.5,
      "perCapita": 973.2,
      "popChangePct": 3.97
    },
    {
      "year": 1993,
      "gdp": 47.45,
      "growth": -13.5,
      "perCapita": 1222.4,
      "popChangePct": 3.97
    },
    {
      "year": 1994,
      "gdp": 25.746,
      "growth": -6.1,
      "perCapita": 639.6,
      "popChangePct": 3.7
    },
    {
      "year": 1995,
      "gdp": 25.021,
      "growth": 2.8,
      "perCapita": 601.8,
      "popChangePct": 3.29
    },
    {
      "year": 1996,
      "gdp": 32.099,
      "growth": -1.9,
      "perCapita": 750.7,
      "popChangePct": 2.84
    },
    {
      "year": 1997,
      "gdp": 28.819,
      "growth": -7.8,
      "perCapita": 642.7,
      "popChangePct": 4.87
    },
    {
      "year": 1998,
      "gdp": 21.089,
      "growth": -3.9,
      "perCapita": 461.1,
      "popChangePct": 2.0
    },
    {
      "year": 1999,
      "gdp": 19.147,
      "growth": -3.8,
      "perCapita": 410.5,
      "popChangePct": 2.0
    },
    {
      "year": 2000,
      "gdp": 19.077,
      "growth": -8.1,
      "perCapita": 397.0,
      "popChangePct": 3.0
    },
    {
      "year": 2001,
      "gdp": 7.246,
      "growth": -2.1,
      "perCapita": 146.5,
      "popChangePct": 2.91
    },
    {
      "year": 2002,
      "gdp": 8.72,
      "growth": 2.9,
      "perCapita": 171.1,
      "popChangePct": 3.08
    },
    {
      "year": 2003,
      "gdp": 9.022,
      "growth": 6.6,
      "perCapita": 171.5,
      "popChangePct": 3.2
    },
    {
      "year": 2004,
      "gdp": 10.275,
      "growth": 7.7,
      "perCapita": 189.2,
      "popChangePct": 3.26
    },
    {
      "year": 2005,
      "gdp": 12.72,
      "growth": 9.8,
      "perCapita": 226.8,
      "popChangePct": 3.27
    },
    {
      "year": 2006,
      "gdp": 15.403,
      "growth": 5.1,
      "perCapita": 265.9,
      "popChangePct": 3.28
    },
    {
      "year": 2007,
      "gdp": 18.598,
      "growth": 8.5,
      "perCapita": 310.8,
      "popChangePct": 3.29
    },
    {
      "year": 2008,
      "gdp": 22.665,
      "growth": 7.4,
      "perCapita": 366.7,
      "popChangePct": 3.3
    },
    {
      "year": 2009,
      "gdp": 18.626,
      "growth": 0.6,
      "perCapita": 291.7,
      "popChangePct": 3.29
    },
    {
      "year": 2010,
      "gdp": 22.34,
      "growth": 7.8,
      "perCapita": 338.8,
      "popChangePct": 3.28
    },
    {
      "year": 2011,
      "gdp": 26.406,
      "growth": 7.6,
      "perCapita": 387.8,
      "popChangePct": 3.26
    },
    {
      "year": 2012,
      "gdp": 30.074,
      "growth": 8.7,
      "perCapita": 427.8,
      "popChangePct": 3.24
    },
    {
      "year": 2013,
      "gdp": 34.908,
      "growth": 9.6,
      "perCapita": 481.1,
      "popChangePct": 3.22
    },
    {
      "year": 2014,
      "gdp": 38.355,
      "growth": 7.3,
      "perCapita": 512.2,
      "popChangePct": 3.2
    },
    {
      "year": 2015,
      "gdp": 40.154,
      "growth": 6.4,
      "perCapita": 519.7,
      "popChangePct": 3.19
    },
    {
      "year": 2016,
      "gdp": 38.086,
      "growth": 0.4,
      "perCapita": 477.3,
      "popChangePct": 3.28
    },
    {
      "year": 2017,
      "gdp": 37.499,
      "growth": 4.2,
      "perCapita": 455.0,
      "popChangePct": 3.28
    },
    {
      "year": 2018,
      "gdp": 46.66,
      "growth": 6.1,
      "perCapita": 548.2,
      "popChangePct": 3.28
    },
    {
      "year": 2019,
      "gdp": 46.844,
      "growth": 0.6,
      "perCapita": 532.9,
      "popChangePct": 3.28
    },
    {
      "year": 2020,
      "gdp": 46.682,
      "growth": 0.8,
      "perCapita": 514.2,
      "popChangePct": 3.28
    },
    {
      "year": 2021,
      "gdp": 59.068,
      "growth": 6.4,
      "perCapita": 630.1,
      "popChangePct": 3.26
    },
    {
      "year": 2022,
      "gdp": 70.422,
      "growth": 9.3,
      "perCapita": 727.5,
      "popChangePct": 3.25
    },
    {
      "year": 2023,
      "gdp": 69.844,
      "growth": 8.5,
      "perCapita": 698.8,
      "popChangePct": 3.25
    },
    {
      "year": 2024,
      "gdp": 76.731,
      "growth": 6.1,
      "perCapita": 743.5,
      "popChangePct": 3.25
    },
    {
      "year": 2025,
      "gdp": 92.833,
      "growth": 5.7,
      "perCapita": 871.2,
      "popChangePct": 3.25
    },
    {
      "year": 2026,
      "gdp": 123.406,
      "growth": 5.9,
      "perCapita": 1121.7,
      "popChangePct": 3.25
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 132.555,
      "growth": 5.4,
      "perCapita": 1166.8,
      "popChangePct": 3.26
    },
    {
      "year": 2028,
      "gdp": 142.352,
      "growth": 5.4,
      "perCapita": 1213.4,
      "popChangePct": 3.26
    },
    {
      "year": 2029,
      "gdp": 152.565,
      "growth": 5.4,
      "perCapita": 1259.4,
      "popChangePct": 3.26
    },
    {
      "year": 2030,
      "gdp": 163.628,
      "growth": 5.4,
      "perCapita": 1308.0,
      "popChangePct": 3.26
    },
    {
      "year": 2031,
      "gdp": 175.414,
      "growth": 5.4,
      "perCapita": 1358.0,
      "popChangePct": 3.26
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 23.392,
      "perCapitaPPP": 931.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 25.847,
      "perCapitaPPP": 995.9,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 3.3
    },
    {
      "year": 1982,
      "gdpPPP": 27.32,
      "perCapitaPPP": 1019.0,
      "perCapitaPPPChangePct": 2.32,
      "popChangePct": 3.3
    },
    {
      "year": 1983,
      "gdpPPP": 28.79,
      "perCapitaPPP": 1039.6,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 3.3
    },
    {
      "year": 1984,
      "gdpPPP": 31.274,
      "perCapitaPPP": 1093.2,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 3.3
    },
    {
      "year": 1985,
      "gdpPPP": 32.413,
      "perCapitaPPP": 1096.8,
      "perCapitaPPPChangePct": 0.33,
      "popChangePct": 3.3
    },
    {
      "year": 1986,
      "gdpPPP": 34.626,
      "perCapitaPPP": 1134.3,
      "perCapitaPPPChangePct": 3.42,
      "popChangePct": 3.3
    },
    {
      "year": 1987,
      "gdpPPP": 36.432,
      "perCapitaPPP": 1155.3,
      "perCapitaPPPChangePct": 1.85,
      "popChangePct": 3.3
    },
    {
      "year": 1988,
      "gdpPPP": 37.892,
      "perCapitaPPP": 1163.2,
      "perCapitaPPPChangePct": 0.68,
      "popChangePct": 3.3
    },
    {
      "year": 1989,
      "gdpPPP": 38.882,
      "perCapitaPPP": 1155.5,
      "perCapitaPPPChangePct": -0.67,
      "popChangePct": 3.3
    },
    {
      "year": 1990,
      "gdpPPP": 37.687,
      "perCapitaPPP": 1084.2,
      "perCapitaPPPChangePct": -6.17,
      "popChangePct": 3.3
    },
    {
      "year": 1991,
      "gdpPPP": 35.672,
      "perCapitaPPP": 993.4,
      "perCapitaPPPChangePct": -8.37,
      "popChangePct": 3.3
    },
    {
      "year": 1992,
      "gdpPPP": 32.668,
      "perCapitaPPP": 875.0,
      "perCapitaPPPChangePct": -11.92,
      "popChangePct": 3.97
    },
    {
      "year": 1993,
      "gdpPPP": 28.938,
      "perCapitaPPP": 745.5,
      "perCapitaPPPChangePct": -14.8,
      "popChangePct": 3.97
    },
    {
      "year": 1994,
      "gdpPPP": 27.74,
      "perCapitaPPP": 689.1,
      "perCapitaPPPChangePct": -7.56,
      "popChangePct": 3.7
    },
    {
      "year": 1995,
      "gdpPPP": 29.104,
      "perCapitaPPP": 700.0,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 3.29
    },
    {
      "year": 1996,
      "gdpPPP": 29.063,
      "perCapitaPPP": 679.7,
      "perCapitaPPPChangePct": -2.9,
      "popChangePct": 2.84
    },
    {
      "year": 1997,
      "gdpPPP": 27.247,
      "perCapitaPPP": 607.7,
      "perCapitaPPPChangePct": -10.6,
      "popChangePct": 4.87
    },
    {
      "year": 1998,
      "gdpPPP": 26.485,
      "perCapitaPPP": 579.1,
      "perCapitaPPPChangePct": -4.7,
      "popChangePct": 2.0
    },
    {
      "year": 1999,
      "gdpPPP": 25.839,
      "perCapitaPPP": 553.9,
      "perCapitaPPPChangePct": -4.35,
      "popChangePct": 2.0
    },
    {
      "year": 2000,
      "gdpPPP": 24.274,
      "perCapitaPPP": 505.2,
      "perCapitaPPPChangePct": -8.79,
      "popChangePct": 3.0
    },
    {
      "year": 2001,
      "gdpPPP": 24.299,
      "perCapitaPPP": 491.4,
      "perCapitaPPPChangePct": -2.73,
      "popChangePct": 2.91
    },
    {
      "year": 2002,
      "gdpPPP": 25.404,
      "perCapitaPPP": 498.4,
      "perCapitaPPPChangePct": 1.42,
      "popChangePct": 3.08
    },
    {
      "year": 2003,
      "gdpPPP": 27.624,
      "perCapitaPPP": 525.2,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 3.2
    },
    {
      "year": 2004,
      "gdpPPP": 30.54,
      "perCapitaPPP": 562.3,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 3.26
    },
    {
      "year": 2005,
      "gdpPPP": 34.586,
      "perCapitaPPP": 616.6,
      "perCapitaPPPChangePct": 9.66,
      "popChangePct": 3.27
    },
    {
      "year": 2006,
      "gdpPPP": 37.474,
      "perCapitaPPP": 646.9,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 3.28
    },
    {
      "year": 2007,
      "gdpPPP": 41.772,
      "perCapitaPPP": 698.1,
      "perCapitaPPPChangePct": 7.92,
      "popChangePct": 3.29
    },
    {
      "year": 2008,
      "gdpPPP": 45.728,
      "perCapitaPPP": 739.8,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 3.3
    },
    {
      "year": 2009,
      "gdpPPP": 46.27,
      "perCapitaPPP": 724.7,
      "perCapitaPPPChangePct": -2.04,
      "popChangePct": 3.29
    },
    {
      "year": 2010,
      "gdpPPP": 50.506,
      "perCapitaPPP": 766.0,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 3.28
    },
    {
      "year": 2011,
      "gdpPPP": 55.462,
      "perCapitaPPP": 814.6,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 3.26
    },
    {
      "year": 2012,
      "gdpPPP": 61.392,
      "perCapitaPPP": 873.4,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 3.24
    },
    {
      "year": 2013,
      "gdpPPP": 68.446,
      "perCapitaPPP": 943.4,
      "perCapitaPPPChangePct": 8.01,
      "popChangePct": 3.22
    },
    {
      "year": 2014,
      "gdpPPP": 74.724,
      "perCapitaPPP": 998.0,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 3.2
    },
    {
      "year": 2015,
      "gdpPPP": 80.213,
      "perCapitaPPP": 1038.1,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 3.19
    },
    {
      "year": 2016,
      "gdpPPP": 81.295,
      "perCapitaPPP": 1018.7,
      "perCapitaPPPChangePct": -1.87,
      "popChangePct": 3.28
    },
    {
      "year": 2017,
      "gdpPPP": 86.26,
      "perCapitaPPP": 1046.6,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 3.28
    },
    {
      "year": 2018,
      "gdpPPP": 94.448,
      "perCapitaPPP": 1109.6,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 3.28
    },
    {
      "year": 2019,
      "gdpPPP": 98.168,
      "perCapitaPPP": 1116.7,
      "perCapitaPPPChangePct": 0.64,
      "popChangePct": 3.28
    },
    {
      "year": 2020,
      "gdpPPP": 104.513,
      "perCapitaPPP": 1151.1,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 3.28
    },
    {
      "year": 2021,
      "gdpPPP": 139.045,
      "perCapitaPPP": 1483.1,
      "perCapitaPPPChangePct": 28.85,
      "popChangePct": 3.26
    },
    {
      "year": 2022,
      "gdpPPP": 162.802,
      "perCapitaPPP": 1681.8,
      "perCapitaPPPChangePct": 13.4,
      "popChangePct": 3.25
    },
    {
      "year": 2023,
      "gdpPPP": 183.232,
      "perCapitaPPP": 1833.3,
      "perCapitaPPPChangePct": 9.01,
      "popChangePct": 3.25
    },
    {
      "year": 2024,
      "gdpPPP": 199.168,
      "perCapitaPPP": 1930.0,
      "perCapitaPPPChangePct": 5.28,
      "popChangePct": 3.25
    },
    {
      "year": 2025,
      "gdpPPP": 216.586,
      "perCapitaPPP": 2032.7,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 3.25
    },
    {
      "year": 2026,
      "gdpPPP": 235.938,
      "perCapitaPPP": 2144.5,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 3.25
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 254.055,
      "perCapitaPPP": 2236.3,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 3.26
    },
    {
      "year": 2028,
      "gdpPPP": 272.162,
      "perCapitaPPP": 2319.9,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 3.26
    },
    {
      "year": 2029,
      "gdpPPP": 292.082,
      "perCapitaPPP": 2411.1,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 3.26
    },
    {
      "year": 2030,
      "gdpPPP": 313.555,
      "perCapitaPPP": 2506.6,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 3.26
    },
    {
      "year": 2031,
      "gdpPPP": 336.455,
      "perCapitaPPP": 2604.7,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 3.26
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function DrCongoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
