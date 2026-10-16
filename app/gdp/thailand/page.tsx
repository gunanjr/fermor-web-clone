import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Thailand",
  "slug": "thailand",
  "iso3": "THA",
  "region": "Asia",
  "rank2026": 32,
  "flagEmoji": "🇹🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Norway",
      "slug": "norway",
      "rank": 31
    },
    {
      "name": "Colombia",
      "slug": "colombia",
      "rank": 33
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 33.422,
      "growth": 4.6,
      "perCapita": 705.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 35.999,
      "growth": 5.9,
      "perCapita": 744.9,
      "popChangePct": 2.01
    },
    {
      "year": 1982,
      "gdp": 37.799,
      "growth": 5.4,
      "perCapita": 767.4,
      "popChangePct": 1.92
    },
    {
      "year": 1983,
      "gdp": 41.366,
      "growth": 5.6,
      "perCapita": 824.4,
      "popChangePct": 1.86
    },
    {
      "year": 1984,
      "gdp": 43.179,
      "growth": 5.8,
      "perCapita": 845.1,
      "popChangePct": 1.84
    },
    {
      "year": 1985,
      "gdp": 40.185,
      "growth": 4.6,
      "perCapita": 772.4,
      "popChangePct": 1.82
    },
    {
      "year": 1986,
      "gdp": 44.52,
      "growth": 5.5,
      "perCapita": 840.3,
      "popChangePct": 1.83
    },
    {
      "year": 1987,
      "gdp": 52.204,
      "growth": 9.5,
      "perCapita": 967.7,
      "popChangePct": 1.82
    },
    {
      "year": 1988,
      "gdp": 63.704,
      "growth": 13.3,
      "perCapita": 1160.5,
      "popChangePct": 1.75
    },
    {
      "year": 1989,
      "gdp": 74.637,
      "growth": 12.2,
      "perCapita": 1338.3,
      "popChangePct": 1.6
    },
    {
      "year": 1990,
      "gdp": 88.467,
      "growth": 11.6,
      "perCapita": 1564.2,
      "popChangePct": 1.41
    },
    {
      "year": 1991,
      "gdp": 101.247,
      "growth": 8.4,
      "perCapita": 1769.0,
      "popChangePct": 1.19
    },
    {
      "year": 1992,
      "gdp": 115.576,
      "growth": 9.2,
      "perCapita": 1999.2,
      "popChangePct": 1.01
    },
    {
      "year": 1993,
      "gdp": 128.889,
      "growth": 8.7,
      "perCapita": 2209.4,
      "popChangePct": 0.91
    },
    {
      "year": 1994,
      "gdp": 146.684,
      "growth": 8,
      "perCapita": 2491.4,
      "popChangePct": 0.92
    },
    {
      "year": 1995,
      "gdp": 169.279,
      "growth": 8.1,
      "perCapita": 2846.6,
      "popChangePct": 1.01
    },
    {
      "year": 1996,
      "gdp": 183.035,
      "growth": 5.7,
      "perCapita": 3044.0,
      "popChangePct": 1.11
    },
    {
      "year": 1997,
      "gdp": 150.18,
      "growth": -2.8,
      "perCapita": 2468.2,
      "popChangePct": 1.19
    },
    {
      "year": 1998,
      "gdp": 113.676,
      "growth": -7.6,
      "perCapita": 1845.8,
      "popChangePct": 1.21
    },
    {
      "year": 1999,
      "gdp": 126.669,
      "growth": 4.6,
      "perCapita": 2033.3,
      "popChangePct": 1.16
    },
    {
      "year": 2000,
      "gdp": 126.392,
      "growth": 4.5,
      "perCapita": 2006.0,
      "popChangePct": 1.14
    },
    {
      "year": 2001,
      "gdp": 120.296,
      "growth": 3.4,
      "perCapita": 1889.9,
      "popChangePct": 1.02
    },
    {
      "year": 2002,
      "gdp": 134.301,
      "growth": 6.1,
      "perCapita": 2089.8,
      "popChangePct": 0.97
    },
    {
      "year": 2003,
      "gdp": 152.281,
      "growth": 7.2,
      "perCapita": 2347.5,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdp": 172.896,
      "growth": 6.3,
      "perCapita": 2641.6,
      "popChangePct": 0.9
    },
    {
      "year": 2005,
      "gdp": 189.318,
      "growth": 4.2,
      "perCapita": 2867.7,
      "popChangePct": 0.86
    },
    {
      "year": 2006,
      "gdp": 221.758,
      "growth": 5,
      "perCapita": 3331.3,
      "popChangePct": 0.83
    },
    {
      "year": 2007,
      "gdp": 262.943,
      "growth": 5.4,
      "perCapita": 3918.5,
      "popChangePct": 0.8
    },
    {
      "year": 2008,
      "gdp": 291.383,
      "growth": 1.7,
      "perCapita": 4309.1,
      "popChangePct": 0.77
    },
    {
      "year": 2009,
      "gdp": 281.711,
      "growth": -0.7,
      "perCapita": 4135.4,
      "popChangePct": 0.74
    },
    {
      "year": 2010,
      "gdp": 341.105,
      "growth": 7.5,
      "perCapita": 4973.9,
      "popChangePct": 0.67
    },
    {
      "year": 2011,
      "gdp": 370.819,
      "growth": 0.8,
      "perCapita": 5373.6,
      "popChangePct": 0.62
    },
    {
      "year": 2012,
      "gdp": 397.558,
      "growth": 7.2,
      "perCapita": 5725.5,
      "popChangePct": 0.62
    },
    {
      "year": 2013,
      "gdp": 420.334,
      "growth": 2.7,
      "perCapita": 6018.1,
      "popChangePct": 0.59
    },
    {
      "year": 2014,
      "gdp": 407.339,
      "growth": 1,
      "perCapita": 5801.2,
      "popChangePct": 0.53
    },
    {
      "year": 2015,
      "gdp": 401.296,
      "growth": 3.1,
      "perCapita": 5688.9,
      "popChangePct": 0.46
    },
    {
      "year": 2016,
      "gdp": 413.366,
      "growth": 3.4,
      "perCapita": 5833.6,
      "popChangePct": 0.45
    },
    {
      "year": 2017,
      "gdp": 456.357,
      "growth": 4.2,
      "perCapita": 6413.1,
      "popChangePct": 0.42
    },
    {
      "year": 2018,
      "gdp": 506.754,
      "growth": 4.2,
      "perCapita": 7099.8,
      "popChangePct": 0.3
    },
    {
      "year": 2019,
      "gdp": 543.977,
      "growth": 2.1,
      "perCapita": 7605.7,
      "popChangePct": 0.2
    },
    {
      "year": 2020,
      "gdp": 500.275,
      "growth": -6.1,
      "perCapita": 6983.0,
      "popChangePct": 0.17
    },
    {
      "year": 2021,
      "gdp": 506.05,
      "growth": 1.6,
      "perCapita": 7055.2,
      "popChangePct": 0.12
    },
    {
      "year": 2022,
      "gdp": 495.692,
      "growth": 2.7,
      "perCapita": 6910.0,
      "popChangePct": 0.01
    },
    {
      "year": 2023,
      "gdp": 517.013,
      "growth": 2.2,
      "perCapita": 7210.5,
      "popChangePct": -0.05
    },
    {
      "year": 2024,
      "gdp": 529.386,
      "growth": 2.9,
      "perCapita": 7386.6,
      "popChangePct": -0.05
    },
    {
      "year": 2025,
      "gdp": 577.01,
      "growth": 2.4,
      "perCapita": 8056.6,
      "popChangePct": -0.07
    },
    {
      "year": 2026,
      "gdp": 579.996,
      "growth": 1.5,
      "perCapita": 8105.1,
      "popChangePct": -0.08
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 584.045,
      "growth": 2.1,
      "perCapita": 8169.8,
      "popChangePct": -0.1
    },
    {
      "year": 2028,
      "gdp": 599.255,
      "growth": 2.3,
      "perCapita": 8392.1,
      "popChangePct": -0.11
    },
    {
      "year": 2029,
      "gdp": 622.614,
      "growth": 2.5,
      "perCapita": 8730.3,
      "popChangePct": -0.13
    },
    {
      "year": 2030,
      "gdp": 647.521,
      "growth": 2.5,
      "perCapita": 9092.5,
      "popChangePct": -0.14
    },
    {
      "year": 2031,
      "gdp": 675.349,
      "growth": 2.5,
      "perCapita": 9498.0,
      "popChangePct": -0.16
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 75.722,
      "perCapitaPPP": 1598.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 87.784,
      "perCapitaPPP": 1816.5,
      "perCapitaPPPChangePct": 13.65,
      "popChangePct": 2.01
    },
    {
      "year": 1982,
      "gdpPPP": 98.198,
      "perCapitaPPP": 1993.6,
      "perCapitaPPPChangePct": 9.75,
      "popChangePct": 1.92
    },
    {
      "year": 1983,
      "gdpPPP": 107.739,
      "perCapitaPPP": 2147.3,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": 1.86
    },
    {
      "year": 1984,
      "gdpPPP": 118.057,
      "perCapitaPPP": 2310.5,
      "perCapitaPPPChangePct": 7.6,
      "popChangePct": 1.84
    },
    {
      "year": 1985,
      "gdpPPP": 127.445,
      "perCapitaPPP": 2449.6,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.82
    },
    {
      "year": 1986,
      "gdpPPP": 137.205,
      "perCapitaPPP": 2589.8,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.83
    },
    {
      "year": 1987,
      "gdpPPP": 153.99,
      "perCapitaPPP": 2854.5,
      "perCapitaPPPChangePct": 10.22,
      "popChangePct": 1.82
    },
    {
      "year": 1988,
      "gdpPPP": 180.604,
      "perCapitaPPP": 3290.2,
      "perCapitaPPPChangePct": 15.26,
      "popChangePct": 1.75
    },
    {
      "year": 1989,
      "gdpPPP": 210.572,
      "perCapitaPPP": 3775.6,
      "perCapitaPPPChangePct": 14.75,
      "popChangePct": 1.6
    },
    {
      "year": 1990,
      "gdpPPP": 243.843,
      "perCapitaPPP": 4311.4,
      "perCapitaPPPChangePct": 14.19,
      "popChangePct": 1.41
    },
    {
      "year": 1991,
      "gdpPPP": 273.273,
      "perCapitaPPP": 4774.8,
      "perCapitaPPPChangePct": 10.75,
      "popChangePct": 1.19
    },
    {
      "year": 1992,
      "gdpPPP": 305.298,
      "perCapitaPPP": 5281.0,
      "perCapitaPPPChangePct": 10.6,
      "popChangePct": 1.01
    },
    {
      "year": 1993,
      "gdpPPP": 339.649,
      "perCapitaPPP": 5822.1,
      "perCapitaPPPChangePct": 10.25,
      "popChangePct": 0.91
    },
    {
      "year": 1994,
      "gdpPPP": 374.644,
      "perCapitaPPP": 6363.3,
      "perCapitaPPPChangePct": 9.3,
      "popChangePct": 0.92
    },
    {
      "year": 1995,
      "gdpPPP": 413.558,
      "perCapitaPPP": 6954.4,
      "perCapitaPPPChangePct": 9.29,
      "popChangePct": 1.01
    },
    {
      "year": 1996,
      "gdpPPP": 444.932,
      "perCapitaPPP": 7399.5,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 1.11
    },
    {
      "year": 1997,
      "gdpPPP": 440.141,
      "perCapitaPPP": 7233.6,
      "perCapitaPPPChangePct": -2.24,
      "popChangePct": 1.19
    },
    {
      "year": 1998,
      "gdpPPP": 411.11,
      "perCapitaPPP": 6675.5,
      "perCapitaPPPChangePct": -7.72,
      "popChangePct": 1.21
    },
    {
      "year": 1999,
      "gdpPPP": 435.991,
      "perCapitaPPP": 6998.4,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 1.16
    },
    {
      "year": 2000,
      "gdpPPP": 465.732,
      "perCapitaPPP": 7391.6,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 1.14
    },
    {
      "year": 2001,
      "gdpPPP": 492.62,
      "perCapitaPPP": 7739.4,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 1.02
    },
    {
      "year": 2002,
      "gdpPPP": 531.038,
      "perCapitaPPP": 8263.1,
      "perCapitaPPPChangePct": 6.77,
      "popChangePct": 0.97
    },
    {
      "year": 2003,
      "gdpPPP": 580.453,
      "perCapitaPPP": 8948.2,
      "perCapitaPPPChangePct": 8.29,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdpPPP": 633.549,
      "perCapitaPPP": 9679.6,
      "perCapitaPPPChangePct": 8.17,
      "popChangePct": 0.9
    },
    {
      "year": 2005,
      "gdpPPP": 680.779,
      "perCapitaPPP": 10312.1,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 0.86
    },
    {
      "year": 2006,
      "gdpPPP": 736.636,
      "perCapitaPPP": 11066.0,
      "perCapitaPPPChangePct": 7.31,
      "popChangePct": 0.83
    },
    {
      "year": 2007,
      "gdpPPP": 797.715,
      "perCapitaPPP": 11888.0,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 0.8
    },
    {
      "year": 2008,
      "gdpPPP": 827.114,
      "perCapitaPPP": 12231.8,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 0.77
    },
    {
      "year": 2009,
      "gdpPPP": 826.467,
      "perCapitaPPP": 12132.3,
      "perCapitaPPPChangePct": -0.81,
      "popChangePct": 0.74
    },
    {
      "year": 2010,
      "gdpPPP": 899.363,
      "perCapitaPPP": 13114.2,
      "perCapitaPPPChangePct": 8.09,
      "popChangePct": 0.67
    },
    {
      "year": 2011,
      "gdpPPP": 925.63,
      "perCapitaPPP": 13413.5,
      "perCapitaPPPChangePct": 2.28,
      "popChangePct": 0.62
    },
    {
      "year": 2012,
      "gdpPPP": 1011.155,
      "perCapitaPPP": 14562.4,
      "perCapitaPPPChangePct": 8.56,
      "popChangePct": 0.62
    },
    {
      "year": 2013,
      "gdpPPP": 1056.002,
      "perCapitaPPP": 15119.2,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.59
    },
    {
      "year": 2014,
      "gdpPPP": 1084.972,
      "perCapitaPPP": 15451.8,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 0.53
    },
    {
      "year": 2015,
      "gdpPPP": 1129.36,
      "perCapitaPPP": 16010.0,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 0.46
    },
    {
      "year": 2016,
      "gdpPPP": 1179.255,
      "perCapitaPPP": 16642.1,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 0.45
    },
    {
      "year": 2017,
      "gdpPPP": 1250.522,
      "perCapitaPPP": 17573.3,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 0.42
    },
    {
      "year": 2018,
      "gdpPPP": 1347.311,
      "perCapitaPPP": 18876.2,
      "perCapitaPPPChangePct": 7.41,
      "popChangePct": 0.3
    },
    {
      "year": 2019,
      "gdpPPP": 1427.827,
      "perCapitaPPP": 19963.4,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 0.2
    },
    {
      "year": 2020,
      "gdpPPP": 1372.406,
      "perCapitaPPP": 19156.6,
      "perCapitaPPPChangePct": -4.04,
      "popChangePct": 0.17
    },
    {
      "year": 2021,
      "gdpPPP": 1451.544,
      "perCapitaPPP": 20237.0,
      "perCapitaPPPChangePct": 5.64,
      "popChangePct": 0.12
    },
    {
      "year": 2022,
      "gdpPPP": 1596.526,
      "perCapitaPPP": 22255.8,
      "perCapitaPPPChangePct": 9.98,
      "popChangePct": 0.01
    },
    {
      "year": 2023,
      "gdpPPP": 1692.686,
      "perCapitaPPP": 23607.1,
      "perCapitaPPPChangePct": 6.07,
      "popChangePct": -0.05
    },
    {
      "year": 2024,
      "gdpPPP": 1785.79,
      "perCapitaPPP": 24917.5,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": -0.05
    },
    {
      "year": 2025,
      "gdpPPP": 1880.755,
      "perCapitaPPP": 26260.2,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": -0.07
    },
    {
      "year": 2026,
      "gdpPPP": 1963.655,
      "perCapitaPPP": 27440.8,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": -0.08
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2048.928,
      "perCapitaPPP": 28661.1,
      "perCapitaPPPChangePct": 4.45,
      "popChangePct": -0.1
    },
    {
      "year": 2028,
      "gdpPPP": 2130.29,
      "perCapitaPPP": 29833.1,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": -0.11
    },
    {
      "year": 2029,
      "gdpPPP": 2221.427,
      "perCapitaPPP": 31149.0,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": -0.13
    },
    {
      "year": 2030,
      "gdpPPP": 2318.733,
      "perCapitaPPP": 32559.6,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": -0.14
    },
    {
      "year": 2031,
      "gdpPPP": 2419.608,
      "perCapitaPPP": 34029.1,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": -0.16
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ThailandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
