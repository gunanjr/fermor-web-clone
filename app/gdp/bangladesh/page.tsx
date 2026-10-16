import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bangladesh",
  "slug": "bangladesh",
  "iso3": "BGD",
  "region": "Asia",
  "rank2026": 37,
  "flagEmoji": "🇧🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Philippines",
      "slug": "philippines",
      "rank": 36
    },
    {
      "name": "Denmark",
      "slug": "denmark",
      "rank": 38
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 24.775,
      "growth": null,
      "perCapita": 311.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 26.355,
      "growth": 3.8,
      "perCapita": 322.3,
      "popChangePct": 2.67
    },
    {
      "year": 1982,
      "gdp": 24.678,
      "growth": 2.4,
      "perCapita": 294.0,
      "popChangePct": 2.65
    },
    {
      "year": 1983,
      "gdp": 23.904,
      "growth": 4,
      "perCapita": 277.5,
      "popChangePct": 2.63
    },
    {
      "year": 1984,
      "gdp": 26.817,
      "growth": 5.2,
      "perCapita": 303.3,
      "popChangePct": 2.64
    },
    {
      "year": 1985,
      "gdp": 28.819,
      "growth": 3.2,
      "perCapita": 317.5,
      "popChangePct": 2.65
    },
    {
      "year": 1986,
      "gdp": 29.639,
      "growth": 4.2,
      "perCapita": 318.1,
      "popChangePct": 2.67
    },
    {
      "year": 1987,
      "gdp": 32.449,
      "growth": 3.7,
      "perCapita": 339.2,
      "popChangePct": 2.66
    },
    {
      "year": 1988,
      "gdp": 34.914,
      "growth": 2.2,
      "perCapita": 355.6,
      "popChangePct": 2.63
    },
    {
      "year": 1989,
      "gdp": 38.07,
      "growth": 2.6,
      "perCapita": 378.1,
      "popChangePct": 2.56
    },
    {
      "year": 1990,
      "gdp": 41.068,
      "growth": 5.9,
      "perCapita": 398.1,
      "popChangePct": 2.46
    },
    {
      "year": 1991,
      "gdp": 42.488,
      "growth": 3.3,
      "perCapita": 402.4,
      "popChangePct": 2.35
    },
    {
      "year": 1992,
      "gdp": 43.292,
      "growth": 5,
      "perCapita": 400.9,
      "popChangePct": 2.26
    },
    {
      "year": 1993,
      "gdp": 43.684,
      "growth": 4.6,
      "perCapita": 395.9,
      "popChangePct": 2.19
    },
    {
      "year": 1994,
      "gdp": 46.438,
      "growth": 4.1,
      "perCapita": 411.9,
      "popChangePct": 2.16
    },
    {
      "year": 1995,
      "gdp": 51.842,
      "growth": 4.9,
      "perCapita": 450.1,
      "popChangePct": 2.16
    },
    {
      "year": 1996,
      "gdp": 55.445,
      "growth": 4.6,
      "perCapita": 471.3,
      "popChangePct": 2.15
    },
    {
      "year": 1997,
      "gdp": 57.599,
      "growth": 4.5,
      "perCapita": 479.4,
      "popChangePct": 2.13
    },
    {
      "year": 1998,
      "gdp": 59.879,
      "growth": 5.2,
      "perCapita": 488.1,
      "popChangePct": 2.1
    },
    {
      "year": 1999,
      "gdp": 61.526,
      "growth": 4.7,
      "perCapita": 491.5,
      "popChangePct": 2.04
    },
    {
      "year": 2000,
      "gdp": 61.687,
      "growth": 5.3,
      "perCapita": 483.2,
      "popChangePct": 1.97
    },
    {
      "year": 2001,
      "gdp": 62.537,
      "growth": 5.1,
      "perCapita": 480.7,
      "popChangePct": 1.9
    },
    {
      "year": 2002,
      "gdp": 65.036,
      "growth": 3.8,
      "perCapita": 490.9,
      "popChangePct": 1.84
    },
    {
      "year": 2003,
      "gdp": 71.755,
      "growth": 4.7,
      "perCapita": 532.3,
      "popChangePct": 1.75
    },
    {
      "year": 2004,
      "gdp": 77.152,
      "growth": 5.2,
      "perCapita": 563.2,
      "popChangePct": 1.63
    },
    {
      "year": 2005,
      "gdp": 79.53,
      "growth": 6.5,
      "perCapita": 572.0,
      "popChangePct": 1.5
    },
    {
      "year": 2006,
      "gdp": 86.028,
      "growth": 6.7,
      "perCapita": 610.5,
      "popChangePct": 1.36
    },
    {
      "year": 2007,
      "gdp": 95.374,
      "growth": 7.1,
      "perCapita": 668.5,
      "popChangePct": 1.23
    },
    {
      "year": 2008,
      "gdp": 109.765,
      "growth": 6,
      "perCapita": 760.6,
      "popChangePct": 1.15
    },
    {
      "year": 2009,
      "gdp": 122.76,
      "growth": 5,
      "perCapita": 841.3,
      "popChangePct": 1.12
    },
    {
      "year": 2010,
      "gdp": 138.094,
      "growth": 5.6,
      "perCapita": 935.8,
      "popChangePct": 1.13
    },
    {
      "year": 2011,
      "gdp": 154.097,
      "growth": 6.5,
      "perCapita": 1032.3,
      "popChangePct": 1.15
    },
    {
      "year": 2012,
      "gdp": 159.749,
      "growth": 6.5,
      "perCapita": 1057.9,
      "popChangePct": 1.16
    },
    {
      "year": 2013,
      "gdp": 179.676,
      "growth": 6,
      "perCapita": 1176.2,
      "popChangePct": 1.16
    },
    {
      "year": 2014,
      "gdp": 207.102,
      "growth": 6.1,
      "perCapita": 1340.3,
      "popChangePct": 1.15
    },
    {
      "year": 2015,
      "gdp": 233.687,
      "growth": 6.6,
      "perCapita": 1495.5,
      "popChangePct": 1.12
    },
    {
      "year": 2016,
      "gdp": 265.236,
      "growth": 7.1,
      "perCapita": 1679.0,
      "popChangePct": 1.1
    },
    {
      "year": 2017,
      "gdp": 293.755,
      "growth": 6.6,
      "perCapita": 1839.8,
      "popChangePct": 1.08
    },
    {
      "year": 2018,
      "gdp": 321.379,
      "growth": 7.3,
      "perCapita": 1991.7,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdp": 351.238,
      "growth": 7.9,
      "perCapita": 2154.2,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdp": 373.902,
      "growth": 3.4,
      "perCapita": 2270.3,
      "popChangePct": 1.01
    },
    {
      "year": 2021,
      "gdp": 416.265,
      "growth": 6.9,
      "perCapita": 2497.7,
      "popChangePct": 1.19
    },
    {
      "year": 2022,
      "gdp": 460.201,
      "growth": 7.1,
      "perCapita": 2730.8,
      "popChangePct": 1.12
    },
    {
      "year": 2023,
      "gdp": 451.534,
      "growth": 5.8,
      "perCapita": 2651.7,
      "popChangePct": 1.04
    },
    {
      "year": 2024,
      "gdp": 450.461,
      "growth": 4.2,
      "perCapita": 2618.7,
      "popChangePct": 1.02
    },
    {
      "year": 2025,
      "gdp": 457.904,
      "growth": 3.5,
      "perCapita": 2635.6,
      "popChangePct": 1.0
    },
    {
      "year": 2026,
      "gdp": 510.705,
      "growth": 4.7,
      "perCapita": 2911.3,
      "popChangePct": 0.97
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 539.741,
      "growth": 4.3,
      "perCapita": 3048.2,
      "popChangePct": 0.94
    },
    {
      "year": 2028,
      "gdp": 574.318,
      "growth": 4.5,
      "perCapita": 3214.2,
      "popChangePct": 0.91
    },
    {
      "year": 2029,
      "gdp": 621.977,
      "growth": 5.7,
      "perCapita": 3450.7,
      "popChangePct": 0.88
    },
    {
      "year": 2030,
      "gdp": 677.005,
      "growth": 5.8,
      "perCapita": 3724.6,
      "popChangePct": 0.84
    },
    {
      "year": 2031,
      "gdp": 740.011,
      "growth": 6.1,
      "perCapita": 4038.7,
      "popChangePct": 0.8
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 51.603,
      "perCapitaPPP": 648.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 58.633,
      "perCapitaPPP": 717.1,
      "perCapitaPPPChangePct": 10.67,
      "popChangePct": 2.67
    },
    {
      "year": 1982,
      "gdpPPP": 63.736,
      "perCapitaPPP": 759.4,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 2.65
    },
    {
      "year": 1983,
      "gdpPPP": 68.892,
      "perCapitaPPP": 799.7,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 2.63
    },
    {
      "year": 1984,
      "gdpPPP": 75.076,
      "perCapitaPPP": 849.1,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 2.64
    },
    {
      "year": 1985,
      "gdpPPP": 79.947,
      "perCapitaPPP": 880.8,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 2.65
    },
    {
      "year": 1986,
      "gdpPPP": 85.021,
      "perCapitaPPP": 912.4,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 2.67
    },
    {
      "year": 1987,
      "gdpPPP": 90.38,
      "perCapitaPPP": 944.7,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 2.66
    },
    {
      "year": 1988,
      "gdpPPP": 95.588,
      "perCapitaPPP": 973.5,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 2.63
    },
    {
      "year": 1989,
      "gdpPPP": 101.931,
      "perCapitaPPP": 1012.3,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 2.56
    },
    {
      "year": 1990,
      "gdpPPP": 112.028,
      "perCapitaPPP": 1085.8,
      "perCapitaPPPChangePct": 7.27,
      "popChangePct": 2.46
    },
    {
      "year": 1991,
      "gdpPPP": 119.685,
      "perCapitaPPP": 1133.4,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 2.35
    },
    {
      "year": 1992,
      "gdpPPP": 128.582,
      "perCapitaPPP": 1190.8,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 2.26
    },
    {
      "year": 1993,
      "gdpPPP": 137.65,
      "perCapitaPPP": 1247.4,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 2.19
    },
    {
      "year": 1994,
      "gdpPPP": 146.332,
      "perCapitaPPP": 1298.0,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 2.16
    },
    {
      "year": 1995,
      "gdpPPP": 156.758,
      "perCapitaPPP": 1361.1,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 2.16
    },
    {
      "year": 1996,
      "gdpPPP": 167.006,
      "perCapitaPPP": 1419.5,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 2.15
    },
    {
      "year": 1997,
      "gdpPPP": 177.513,
      "perCapitaPPP": 1477.3,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 2.13
    },
    {
      "year": 1998,
      "gdpPPP": 188.802,
      "perCapitaPPP": 1538.9,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 2.1
    },
    {
      "year": 1999,
      "gdpPPP": 200.415,
      "perCapitaPPP": 1600.9,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 2.04
    },
    {
      "year": 2000,
      "gdpPPP": 215.804,
      "perCapitaPPP": 1690.5,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 1.97
    },
    {
      "year": 2001,
      "gdpPPP": 231.867,
      "perCapitaPPP": 1782.4,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 1.9
    },
    {
      "year": 2002,
      "gdpPPP": 244.496,
      "perCapitaPPP": 1845.6,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 1.84
    },
    {
      "year": 2003,
      "gdpPPP": 261.14,
      "perCapitaPPP": 1937.4,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 1.75
    },
    {
      "year": 2004,
      "gdpPPP": 282.212,
      "perCapitaPPP": 2060.1,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 1.63
    },
    {
      "year": 2005,
      "gdpPPP": 310.085,
      "perCapitaPPP": 2230.3,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": 1.5
    },
    {
      "year": 2006,
      "gdpPPP": 340.974,
      "perCapitaPPP": 2419.6,
      "perCapitaPPPChangePct": 8.49,
      "popChangePct": 1.36
    },
    {
      "year": 2007,
      "gdpPPP": 374.932,
      "perCapitaPPP": 2628.1,
      "perCapitaPPPChangePct": 8.62,
      "popChangePct": 1.23
    },
    {
      "year": 2008,
      "gdpPPP": 405.137,
      "perCapitaPPP": 2807.5,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": 1.15
    },
    {
      "year": 2009,
      "gdpPPP": 428.201,
      "perCapitaPPP": 2934.4,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 1.12
    },
    {
      "year": 2010,
      "gdpPPP": 457.554,
      "perCapitaPPP": 3100.5,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 1.13
    },
    {
      "year": 2011,
      "gdpPPP": 497.183,
      "perCapitaPPP": 3330.7,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": 1.15
    },
    {
      "year": 2012,
      "gdpPPP": 539.467,
      "perCapitaPPP": 3572.4,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 1.16
    },
    {
      "year": 2013,
      "gdpPPP": 581.642,
      "perCapitaPPP": 3807.4,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 1.16
    },
    {
      "year": 2014,
      "gdpPPP": 627.641,
      "perCapitaPPP": 4061.9,
      "perCapitaPPPChangePct": 6.68,
      "popChangePct": 1.15
    },
    {
      "year": 2015,
      "gdpPPP": 674.975,
      "perCapitaPPP": 4319.7,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.12
    },
    {
      "year": 2016,
      "gdpPPP": 729.859,
      "perCapitaPPP": 4620.2,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": 1.1
    },
    {
      "year": 2017,
      "gdpPPP": 791.891,
      "perCapitaPPP": 4959.5,
      "perCapitaPPPChangePct": 7.34,
      "popChangePct": 1.08
    },
    {
      "year": 2018,
      "gdpPPP": 897.768,
      "perCapitaPPP": 5563.9,
      "perCapitaPPPChangePct": 12.19,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdpPPP": 997.25,
      "perCapitaPPP": 6116.4,
      "perCapitaPPPChangePct": 9.93,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdpPPP": 1104.316,
      "perCapitaPPP": 6705.4,
      "perCapitaPPPChangePct": 9.63,
      "popChangePct": 1.01
    },
    {
      "year": 2021,
      "gdpPPP": 1247.561,
      "perCapitaPPP": 7485.8,
      "perCapitaPPPChangePct": 11.64,
      "popChangePct": 1.19
    },
    {
      "year": 2022,
      "gdpPPP": 1431.168,
      "perCapitaPPP": 8492.6,
      "perCapitaPPPChangePct": 13.45,
      "popChangePct": 1.12
    },
    {
      "year": 2023,
      "gdpPPP": 1569.831,
      "perCapitaPPP": 9219.2,
      "perCapitaPPPChangePct": 8.56,
      "popChangePct": 1.04
    },
    {
      "year": 2024,
      "gdpPPP": 1676.747,
      "perCapitaPPP": 9747.5,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": 1.02
    },
    {
      "year": 2025,
      "gdpPPP": 1784.489,
      "perCapitaPPP": 10271.3,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 1.0
    },
    {
      "year": 2026,
      "gdpPPP": 1921.752,
      "perCapitaPPP": 10954.9,
      "perCapitaPPPChangePct": 6.66,
      "popChangePct": 0.97
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2047.585,
      "perCapitaPPP": 11563.7,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 0.94
    },
    {
      "year": 2028,
      "gdpPPP": 2175.843,
      "perCapitaPPP": 12177.3,
      "perCapitaPPPChangePct": 5.31,
      "popChangePct": 0.91
    },
    {
      "year": 2029,
      "gdpPPP": 2340.851,
      "perCapitaPPP": 12987.1,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 0.88
    },
    {
      "year": 2030,
      "gdpPPP": 2520.937,
      "perCapitaPPP": 13869.1,
      "perCapitaPPPChangePct": 6.79,
      "popChangePct": 0.84
    },
    {
      "year": 2031,
      "gdpPPP": 2722.231,
      "perCapitaPPP": 14856.9,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": 0.8
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BangladeshGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
