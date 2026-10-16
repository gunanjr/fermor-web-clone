import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Niger",
  "slug": "niger",
  "iso3": "NER",
  "region": "Africa",
  "rank2026": 128,
  "flagEmoji": "🇳🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Chad",
      "slug": "chad",
      "rank": 127
    },
    {
      "name": "Nicaragua",
      "slug": "nicaragua",
      "rank": 129
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.531,
      "growth": 4.9,
      "perCapita": 609.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.056,
      "growth": -0.2,
      "perCapita": 510.0,
      "popChangePct": 3.4
    },
    {
      "year": 1982,
      "gdp": 2.84,
      "growth": 2.2,
      "perCapita": 458.1,
      "popChangePct": 3.47
    },
    {
      "year": 1983,
      "gdp": 2.538,
      "growth": -3.9,
      "perCapita": 395.7,
      "popChangePct": 3.48
    },
    {
      "year": 1984,
      "gdp": 2.056,
      "growth": -16.8,
      "perCapita": 310.0,
      "popChangePct": 3.41
    },
    {
      "year": 1985,
      "gdp": 2.027,
      "growth": 7.7,
      "perCapita": 295.8,
      "popChangePct": 3.32
    },
    {
      "year": 1986,
      "gdp": 2.68,
      "growth": 6.4,
      "perCapita": 378.7,
      "popChangePct": 3.24
    },
    {
      "year": 1987,
      "gdp": 3.143,
      "growth": 0.1,
      "perCapita": 430.4,
      "popChangePct": 3.21
    },
    {
      "year": 1988,
      "gdp": 3.21,
      "growth": 6.9,
      "perCapita": 426.0,
      "popChangePct": 3.16
    },
    {
      "year": 1989,
      "gdp": 3.068,
      "growth": 1,
      "perCapita": 394.7,
      "popChangePct": 3.16
    },
    {
      "year": 1990,
      "gdp": 3.491,
      "growth": -1.3,
      "perCapita": 435.3,
      "popChangePct": 3.18
    },
    {
      "year": 1991,
      "gdp": 3.271,
      "growth": -0.4,
      "perCapita": 394.9,
      "popChangePct": 3.28
    },
    {
      "year": 1992,
      "gdp": 3.372,
      "growth": 2,
      "perCapita": 393.7,
      "popChangePct": 3.4
    },
    {
      "year": 1993,
      "gdp": 3.041,
      "growth": 0.3,
      "perCapita": 343.2,
      "popChangePct": 3.47
    },
    {
      "year": 1994,
      "gdp": 1.935,
      "growth": 1.9,
      "perCapita": 211.0,
      "popChangePct": 3.5
    },
    {
      "year": 1995,
      "gdp": 2.296,
      "growth": 2.5,
      "perCapita": 242.0,
      "popChangePct": 3.48
    },
    {
      "year": 1996,
      "gdp": 2.397,
      "growth": 0.1,
      "perCapita": 244.0,
      "popChangePct": 3.55
    },
    {
      "year": 1997,
      "gdp": 2.285,
      "growth": 1.5,
      "perCapita": 224.5,
      "popChangePct": 3.57
    },
    {
      "year": 1998,
      "gdp": 2.639,
      "growth": 10,
      "perCapita": 250.2,
      "popChangePct": 3.62
    },
    {
      "year": 1999,
      "gdp": 2.532,
      "growth": -0.2,
      "perCapita": 231.7,
      "popChangePct": 3.64
    },
    {
      "year": 2000,
      "gdp": 2.235,
      "growth": -1.2,
      "perCapita": 197.3,
      "popChangePct": 3.68
    },
    {
      "year": 2001,
      "gdp": 2.442,
      "growth": 7.3,
      "perCapita": 207.8,
      "popChangePct": 3.7
    },
    {
      "year": 2002,
      "gdp": 2.772,
      "growth": 4.9,
      "perCapita": 227.4,
      "popChangePct": 3.74
    },
    {
      "year": 2003,
      "gdp": 3.382,
      "growth": 2.2,
      "perCapita": 267.4,
      "popChangePct": 3.76
    },
    {
      "year": 2004,
      "gdp": 3.746,
      "growth": 0.4,
      "perCapita": 285.4,
      "popChangePct": 3.78
    },
    {
      "year": 2005,
      "gdp": 4.372,
      "growth": 7.3,
      "perCapita": 320.9,
      "popChangePct": 3.79
    },
    {
      "year": 2006,
      "gdp": 4.743,
      "growth": 5.9,
      "perCapita": 335.3,
      "popChangePct": 3.82
    },
    {
      "year": 2007,
      "gdp": 5.716,
      "growth": 3.1,
      "perCapita": 389.3,
      "popChangePct": 3.82
    },
    {
      "year": 2008,
      "gdp": 7.279,
      "growth": 7.7,
      "perCapita": 477.3,
      "popChangePct": 3.85
    },
    {
      "year": 2009,
      "gdp": 7.324,
      "growth": 2,
      "perCapita": 462.3,
      "popChangePct": 3.88
    },
    {
      "year": 2010,
      "gdp": 7.838,
      "growth": 8.6,
      "perCapita": 476.1,
      "popChangePct": 3.92
    },
    {
      "year": 2011,
      "gdp": 8.754,
      "growth": 2.4,
      "perCapita": 511.5,
      "popChangePct": 3.95
    },
    {
      "year": 2012,
      "gdp": 9.412,
      "growth": 10.5,
      "perCapita": 528.9,
      "popChangePct": 3.97
    },
    {
      "year": 2013,
      "gdp": 10.206,
      "growth": 5.3,
      "perCapita": 551.6,
      "popChangePct": 3.98
    },
    {
      "year": 2014,
      "gdp": 10.83,
      "growth": 6.6,
      "perCapita": 562.9,
      "popChangePct": 3.98
    },
    {
      "year": 2015,
      "gdp": 9.684,
      "growth": 4.4,
      "perCapita": 484.2,
      "popChangePct": 3.96
    },
    {
      "year": 2016,
      "gdp": 10.35,
      "growth": 5.7,
      "perCapita": 497.9,
      "popChangePct": 3.93
    },
    {
      "year": 2017,
      "gdp": 11.181,
      "growth": 5,
      "perCapita": 517.6,
      "popChangePct": 3.91
    },
    {
      "year": 2018,
      "gdp": 12.814,
      "growth": 7,
      "perCapita": 571.0,
      "popChangePct": 3.89
    },
    {
      "year": 2019,
      "gdp": 12.917,
      "growth": 6.1,
      "perCapita": 554.1,
      "popChangePct": 3.87
    },
    {
      "year": 2020,
      "gdp": 13.764,
      "growth": 3.5,
      "perCapita": 568.6,
      "popChangePct": 3.84
    },
    {
      "year": 2021,
      "gdp": 14.923,
      "growth": 1.4,
      "perCapita": 593.8,
      "popChangePct": 3.82
    },
    {
      "year": 2022,
      "gdp": 15.458,
      "growth": 11.9,
      "perCapita": 592.6,
      "popChangePct": 3.79
    },
    {
      "year": 2023,
      "gdp": 16.809,
      "growth": 2.4,
      "perCapita": 621.0,
      "popChangePct": 3.76
    },
    {
      "year": 2024,
      "gdp": 19.866,
      "growth": 10.3,
      "perCapita": 707.5,
      "popChangePct": 3.75
    },
    {
      "year": 2025,
      "gdp": 21.836,
      "growth": 6.9,
      "perCapita": 749.7,
      "popChangePct": 3.73
    },
    {
      "year": 2026,
      "gdp": 24.813,
      "growth": 6.7,
      "perCapita": 821.5,
      "popChangePct": 3.7
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 26.928,
      "growth": 6.5,
      "perCapita": 859.9,
      "popChangePct": 3.68
    },
    {
      "year": 2028,
      "gdp": 29.039,
      "growth": 6,
      "perCapita": 894.6,
      "popChangePct": 3.65
    },
    {
      "year": 2029,
      "gdp": 31.38,
      "growth": 6,
      "perCapita": 932.9,
      "popChangePct": 3.63
    },
    {
      "year": 2030,
      "gdp": 33.914,
      "growth": 6,
      "perCapita": 973.3,
      "popChangePct": 3.6
    },
    {
      "year": 2031,
      "gdp": 36.646,
      "growth": 6,
      "perCapita": 1015.4,
      "popChangePct": 3.57
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 3.676,
      "perCapitaPPP": 634.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 4.017,
      "perCapitaPPP": 670.5,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 3.4
    },
    {
      "year": 1982,
      "gdpPPP": 4.358,
      "perCapitaPPP": 703.0,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 3.47
    },
    {
      "year": 1983,
      "gdpPPP": 4.353,
      "perCapitaPPP": 678.7,
      "perCapitaPPPChangePct": -3.46,
      "popChangePct": 3.48
    },
    {
      "year": 1984,
      "gdpPPP": 3.752,
      "perCapitaPPP": 565.6,
      "perCapitaPPPChangePct": -16.66,
      "popChangePct": 3.41
    },
    {
      "year": 1985,
      "gdpPPP": 4.169,
      "perCapitaPPP": 608.3,
      "perCapitaPPPChangePct": 7.56,
      "popChangePct": 3.32
    },
    {
      "year": 1986,
      "gdpPPP": 4.523,
      "perCapitaPPP": 639.2,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 3.24
    },
    {
      "year": 1987,
      "gdpPPP": 4.64,
      "perCapitaPPP": 635.3,
      "perCapitaPPPChangePct": -0.61,
      "popChangePct": 3.21
    },
    {
      "year": 1988,
      "gdpPPP": 5.133,
      "perCapitaPPP": 681.3,
      "perCapitaPPPChangePct": 7.24,
      "popChangePct": 3.16
    },
    {
      "year": 1989,
      "gdpPPP": 5.386,
      "perCapitaPPP": 693.0,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 3.16
    },
    {
      "year": 1990,
      "gdpPPP": 5.514,
      "perCapitaPPP": 687.7,
      "perCapitaPPPChangePct": -0.76,
      "popChangePct": 3.18
    },
    {
      "year": 1991,
      "gdpPPP": 5.675,
      "perCapitaPPP": 685.3,
      "perCapitaPPPChangePct": -0.35,
      "popChangePct": 3.28
    },
    {
      "year": 1992,
      "gdpPPP": 5.921,
      "perCapitaPPP": 691.4,
      "perCapitaPPPChangePct": 0.89,
      "popChangePct": 3.4
    },
    {
      "year": 1993,
      "gdpPPP": 6.081,
      "perCapitaPPP": 686.2,
      "perCapitaPPPChangePct": -0.74,
      "popChangePct": 3.47
    },
    {
      "year": 1994,
      "gdpPPP": 6.326,
      "perCapitaPPP": 689.8,
      "perCapitaPPPChangePct": 0.52,
      "popChangePct": 3.5
    },
    {
      "year": 1995,
      "gdpPPP": 6.617,
      "perCapitaPPP": 697.3,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 3.48
    },
    {
      "year": 1996,
      "gdpPPP": 6.745,
      "perCapitaPPP": 686.4,
      "perCapitaPPPChangePct": -1.56,
      "popChangePct": 3.55
    },
    {
      "year": 1997,
      "gdpPPP": 6.966,
      "perCapitaPPP": 684.4,
      "perCapitaPPPChangePct": -0.29,
      "popChangePct": 3.57
    },
    {
      "year": 1998,
      "gdpPPP": 7.747,
      "perCapitaPPP": 734.6,
      "perCapitaPPPChangePct": 7.34,
      "popChangePct": 3.62
    },
    {
      "year": 1999,
      "gdpPPP": 7.839,
      "perCapitaPPP": 717.2,
      "perCapitaPPPChangePct": -2.37,
      "popChangePct": 3.64
    },
    {
      "year": 2000,
      "gdpPPP": 7.92,
      "perCapitaPPP": 698.9,
      "perCapitaPPPChangePct": -2.55,
      "popChangePct": 3.68
    },
    {
      "year": 2001,
      "gdpPPP": 8.687,
      "perCapitaPPP": 739.2,
      "perCapitaPPPChangePct": 5.77,
      "popChangePct": 3.7
    },
    {
      "year": 2002,
      "gdpPPP": 9.256,
      "perCapitaPPP": 759.3,
      "perCapitaPPPChangePct": 2.72,
      "popChangePct": 3.74
    },
    {
      "year": 2003,
      "gdpPPP": 9.645,
      "perCapitaPPP": 762.6,
      "perCapitaPPPChangePct": 0.43,
      "popChangePct": 3.76
    },
    {
      "year": 2004,
      "gdpPPP": 9.94,
      "perCapitaPPP": 757.3,
      "perCapitaPPPChangePct": -0.69,
      "popChangePct": 3.78
    },
    {
      "year": 2005,
      "gdpPPP": 11.004,
      "perCapitaPPP": 807.6,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 3.79
    },
    {
      "year": 2006,
      "gdpPPP": 12.016,
      "perCapitaPPP": 849.5,
      "perCapitaPPPChangePct": 5.19,
      "popChangePct": 3.82
    },
    {
      "year": 2007,
      "gdpPPP": 12.729,
      "perCapitaPPP": 866.8,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": 3.82
    },
    {
      "year": 2008,
      "gdpPPP": 13.978,
      "perCapitaPPP": 916.5,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 3.85
    },
    {
      "year": 2009,
      "gdpPPP": 14.34,
      "perCapitaPPP": 905.1,
      "perCapitaPPPChangePct": -1.24,
      "popChangePct": 3.88
    },
    {
      "year": 2010,
      "gdpPPP": 15.76,
      "perCapitaPPP": 957.2,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 3.92
    },
    {
      "year": 2011,
      "gdpPPP": 16.464,
      "perCapitaPPP": 962.0,
      "perCapitaPPPChangePct": 0.5,
      "popChangePct": 3.95
    },
    {
      "year": 2012,
      "gdpPPP": 18.539,
      "perCapitaPPP": 1041.8,
      "perCapitaPPPChangePct": 8.29,
      "popChangePct": 3.97
    },
    {
      "year": 2013,
      "gdpPPP": 19.855,
      "perCapitaPPP": 1073.0,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 3.98
    },
    {
      "year": 2014,
      "gdpPPP": 21.543,
      "perCapitaPPP": 1119.7,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 3.98
    },
    {
      "year": 2015,
      "gdpPPP": 22.699,
      "perCapitaPPP": 1134.8,
      "perCapitaPPPChangePct": 1.35,
      "popChangePct": 3.96
    },
    {
      "year": 2016,
      "gdpPPP": 24.23,
      "perCapitaPPP": 1165.5,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 3.93
    },
    {
      "year": 2017,
      "gdpPPP": 25.897,
      "perCapitaPPP": 1198.8,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 3.91
    },
    {
      "year": 2018,
      "gdpPPP": 28.249,
      "perCapitaPPP": 1258.7,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 3.89
    },
    {
      "year": 2019,
      "gdpPPP": 32.635,
      "perCapitaPPP": 1400.0,
      "perCapitaPPPChangePct": 11.23,
      "popChangePct": 3.87
    },
    {
      "year": 2020,
      "gdpPPP": 35.5,
      "perCapitaPPP": 1466.5,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 3.84
    },
    {
      "year": 2021,
      "gdpPPP": 38.85,
      "perCapitaPPP": 1545.9,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 3.82
    },
    {
      "year": 2022,
      "gdpPPP": 46.55,
      "perCapitaPPP": 1784.6,
      "perCapitaPPPChangePct": 15.44,
      "popChangePct": 3.79
    },
    {
      "year": 2023,
      "gdpPPP": 49.418,
      "perCapitaPPP": 1825.8,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 3.76
    },
    {
      "year": 2024,
      "gdpPPP": 55.862,
      "perCapitaPPP": 1989.4,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": 3.75
    },
    {
      "year": 2025,
      "gdpPPP": 61.41,
      "perCapitaPPP": 2108.5,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": 3.73
    },
    {
      "year": 2026,
      "gdpPPP": 67.419,
      "perCapitaPPP": 2232.1,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 3.7
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 73.412,
      "perCapitaPPP": 2344.3,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 3.68
    },
    {
      "year": 2028,
      "gdpPPP": 79.1,
      "perCapitaPPP": 2437.0,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 3.65
    },
    {
      "year": 2029,
      "gdpPPP": 85.343,
      "perCapitaPPP": 2537.3,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 3.63
    },
    {
      "year": 2030,
      "gdpPPP": 92.14,
      "perCapitaPPP": 2644.2,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 3.6
    },
    {
      "year": 2031,
      "gdpPPP": 99.432,
      "perCapitaPPP": 2755.1,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 3.57
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NigerGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
