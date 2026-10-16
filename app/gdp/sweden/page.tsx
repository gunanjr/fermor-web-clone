import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Sweden",
  "slug": "sweden",
  "iso3": "SWE",
  "region": "Europe",
  "rank2026": 25,
  "flagEmoji": "🇸🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Belgium",
      "slug": "belgium",
      "rank": 24
    },
    {
      "name": "Israel",
      "slug": "israel",
      "rank": 26
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 140.151,
      "growth": 4.6,
      "perCapita": 16849.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 127.935,
      "growth": 4.5,
      "perCapita": 15371.2,
      "popChangePct": 0.06
    },
    {
      "year": 1982,
      "gdp": 112.912,
      "growth": 1.4,
      "perCapita": 13559.0,
      "popChangePct": 0.05
    },
    {
      "year": 1983,
      "gdp": 103.682,
      "growth": 2,
      "perCapita": 12445.9,
      "popChangePct": 0.05
    },
    {
      "year": 1984,
      "gdp": 107.978,
      "growth": 4.3,
      "perCapita": 12942.9,
      "popChangePct": 0.14
    },
    {
      "year": 1985,
      "gdp": 112.932,
      "growth": 2.3,
      "perCapita": 13511.7,
      "popChangePct": 0.18
    },
    {
      "year": 1986,
      "gdp": 149.282,
      "growth": 3.1,
      "perCapita": 17810.9,
      "popChangePct": 0.29
    },
    {
      "year": 1987,
      "gdp": 181.81,
      "growth": 3.4,
      "perCapita": 21607.8,
      "popChangePct": 0.38
    },
    {
      "year": 1988,
      "gdp": 205.868,
      "growth": 2.5,
      "perCapita": 24337.5,
      "popChangePct": 0.53
    },
    {
      "year": 1989,
      "gdp": 216.543,
      "growth": 2.6,
      "perCapita": 25394.9,
      "popChangePct": 0.8
    },
    {
      "year": 1990,
      "gdp": 259.299,
      "growth": 0.5,
      "perCapita": 30183.9,
      "popChangePct": 0.75
    },
    {
      "year": 1991,
      "gdp": 271.721,
      "growth": -1.1,
      "perCapita": 31434.2,
      "popChangePct": 0.62
    },
    {
      "year": 1992,
      "gdp": 282.441,
      "growth": -1.1,
      "perCapita": 32494.3,
      "popChangePct": 0.56
    },
    {
      "year": 1993,
      "gdp": 212.644,
      "growth": -1.8,
      "perCapita": 24315.7,
      "popChangePct": 0.61
    },
    {
      "year": 1994,
      "gdp": 228.7,
      "growth": 4,
      "perCapita": 25940.3,
      "popChangePct": 0.81
    },
    {
      "year": 1995,
      "gdp": 267.052,
      "growth": 4.1,
      "perCapita": 30218.0,
      "popChangePct": 0.24
    },
    {
      "year": 1996,
      "gdp": 291.952,
      "growth": 1.7,
      "perCapita": 33009.4,
      "popChangePct": 0.08
    },
    {
      "year": 1997,
      "gdp": 268.25,
      "growth": 3.1,
      "perCapita": 30318.9,
      "popChangePct": 0.05
    },
    {
      "year": 1998,
      "gdp": 270.888,
      "growth": 4.2,
      "perCapita": 30593.9,
      "popChangePct": 0.07
    },
    {
      "year": 1999,
      "gdp": 274.317,
      "growth": 4.2,
      "perCapita": 30956.4,
      "popChangePct": 0.08
    },
    {
      "year": 2000,
      "gdp": 262.902,
      "growth": 4.6,
      "perCapita": 29596.8,
      "popChangePct": 0.25
    },
    {
      "year": 2001,
      "gdp": 242.497,
      "growth": 1.4,
      "perCapita": 27218.9,
      "popChangePct": 0.29
    },
    {
      "year": 2002,
      "gdp": 267.371,
      "growth": 2.3,
      "perCapita": 29904.7,
      "popChangePct": 0.36
    },
    {
      "year": 2003,
      "gdp": 334.072,
      "growth": 1.9,
      "perCapita": 37219.8,
      "popChangePct": 0.39
    },
    {
      "year": 2004,
      "gdp": 384.546,
      "growth": 4.2,
      "perCapita": 42673.3,
      "popChangePct": 0.39
    },
    {
      "year": 2005,
      "gdp": 391.689,
      "growth": 2.8,
      "perCapita": 43291.3,
      "popChangePct": 0.41
    },
    {
      "year": 2006,
      "gdp": 422.526,
      "growth": 4.7,
      "perCapita": 46363.8,
      "popChangePct": 0.72
    },
    {
      "year": 2007,
      "gdp": 490.05,
      "growth": 3.2,
      "perCapita": 53365.3,
      "popChangePct": 0.77
    },
    {
      "year": 2008,
      "gdp": 514.614,
      "growth": -0.9,
      "perCapita": 55595.8,
      "popChangePct": 0.79
    },
    {
      "year": 2009,
      "gdp": 434.311,
      "growth": -4.3,
      "perCapita": 46496.7,
      "popChangePct": 0.92
    },
    {
      "year": 2010,
      "gdp": 492.751,
      "growth": 5.8,
      "perCapita": 52333.6,
      "popChangePct": 0.8
    },
    {
      "year": 2011,
      "gdp": 570.539,
      "growth": 3.2,
      "perCapita": 60165.3,
      "popChangePct": 0.71
    },
    {
      "year": 2012,
      "gdp": 549.74,
      "growth": -0.4,
      "perCapita": 57528.9,
      "popChangePct": 0.77
    },
    {
      "year": 2013,
      "gdp": 584.125,
      "growth": 1.1,
      "perCapita": 60563.4,
      "popChangePct": 0.93
    },
    {
      "year": 2014,
      "gdp": 577.728,
      "growth": 2.3,
      "perCapita": 59270.2,
      "popChangePct": 1.06
    },
    {
      "year": 2015,
      "gdp": 501.602,
      "growth": 4.4,
      "perCapita": 50918.8,
      "popChangePct": 1.07
    },
    {
      "year": 2016,
      "gdp": 513.058,
      "growth": 2.1,
      "perCapita": 51330.7,
      "popChangePct": 1.46
    },
    {
      "year": 2017,
      "gdp": 535.172,
      "growth": 1.9,
      "perCapita": 52881.4,
      "popChangePct": 1.25
    },
    {
      "year": 2018,
      "gdp": 549.649,
      "growth": 1.8,
      "perCapita": 53728.2,
      "popChangePct": 1.09
    },
    {
      "year": 2019,
      "gdp": 530.894,
      "growth": 2.6,
      "perCapita": 51405.4,
      "popChangePct": 0.96
    },
    {
      "year": 2020,
      "gdp": 544.266,
      "growth": -1.9,
      "perCapita": 52437.6,
      "popChangePct": 0.49
    },
    {
      "year": 2021,
      "gdp": 631.693,
      "growth": 5.2,
      "perCapita": 60435.7,
      "popChangePct": 0.7
    },
    {
      "year": 2022,
      "gdp": 575.071,
      "growth": 1.3,
      "perCapita": 54656.5,
      "popChangePct": 0.67
    },
    {
      "year": 2023,
      "gdp": 578.991,
      "growth": -0.2,
      "perCapita": 54871.8,
      "popChangePct": 0.29
    },
    {
      "year": 2024,
      "gdp": 604.827,
      "growth": 1,
      "perCapita": 57125.4,
      "popChangePct": 0.34
    },
    {
      "year": 2025,
      "gdp": 668.999,
      "growth": 1.5,
      "perCapita": 62661.8,
      "popChangePct": 0.83
    },
    {
      "year": 2026,
      "gdp": 760.481,
      "growth": 2,
      "perCapita": 70675.7,
      "popChangePct": 0.79
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 794.57,
      "growth": 1.9,
      "perCapita": 73307.3,
      "popChangePct": 0.73
    },
    {
      "year": 2028,
      "gdp": 834.286,
      "growth": 2.1,
      "perCapita": 76448.4,
      "popChangePct": 0.68
    },
    {
      "year": 2029,
      "gdp": 870.918,
      "growth": 1.9,
      "perCapita": 79297.1,
      "popChangePct": 0.64
    },
    {
      "year": 2030,
      "gdp": 909.888,
      "growth": 1.8,
      "perCapita": 82351.2,
      "popChangePct": 0.6
    },
    {
      "year": 2031,
      "gdp": 948.787,
      "growth": 1.8,
      "perCapita": 85389.2,
      "popChangePct": 0.56
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 89.267,
      "perCapitaPPP": 10731.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 102.15,
      "perCapitaPPP": 12273.2,
      "perCapitaPPPChangePct": 14.36,
      "popChangePct": 0.06
    },
    {
      "year": 1982,
      "gdpPPP": 109.979,
      "perCapitaPPP": 13206.7,
      "perCapitaPPPChangePct": 7.61,
      "popChangePct": 0.05
    },
    {
      "year": 1983,
      "gdpPPP": 116.52,
      "perCapitaPPP": 13987.0,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 0.05
    },
    {
      "year": 1984,
      "gdpPPP": 125.956,
      "perCapitaPPP": 15097.9,
      "perCapitaPPPChangePct": 7.94,
      "popChangePct": 0.14
    },
    {
      "year": 1985,
      "gdpPPP": 132.933,
      "perCapitaPPP": 15904.6,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 0.18
    },
    {
      "year": 1986,
      "gdpPPP": 139.814,
      "perCapitaPPP": 16681.3,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 0.29
    },
    {
      "year": 1987,
      "gdpPPP": 148.205,
      "perCapitaPPP": 17613.9,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 0.38
    },
    {
      "year": 1988,
      "gdpPPP": 157.335,
      "perCapitaPPP": 18600.0,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 0.53
    },
    {
      "year": 1989,
      "gdpPPP": 167.695,
      "perCapitaPPP": 19666.3,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": 0.8
    },
    {
      "year": 1990,
      "gdpPPP": 174.795,
      "perCapitaPPP": 20347.1,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 0.75
    },
    {
      "year": 1991,
      "gdpPPP": 178.668,
      "perCapitaPPP": 20669.3,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 0.62
    },
    {
      "year": 1992,
      "gdpPPP": 180.803,
      "perCapitaPPP": 20801.1,
      "perCapitaPPPChangePct": 0.64,
      "popChangePct": 0.56
    },
    {
      "year": 1993,
      "gdpPPP": 181.707,
      "perCapitaPPP": 20778.1,
      "perCapitaPPPChangePct": -0.11,
      "popChangePct": 0.61
    },
    {
      "year": 1994,
      "gdpPPP": 193.04,
      "perCapitaPPP": 21895.6,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.81
    },
    {
      "year": 1995,
      "gdpPPP": 205.156,
      "perCapitaPPP": 23214.3,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 0.24
    },
    {
      "year": 1996,
      "gdpPPP": 212.474,
      "perCapitaPPP": 24023.2,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 0.08
    },
    {
      "year": 1997,
      "gdpPPP": 222.762,
      "perCapitaPPP": 25177.6,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.05
    },
    {
      "year": 1998,
      "gdpPPP": 234.83,
      "perCapitaPPP": 26521.5,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 0.07
    },
    {
      "year": 1999,
      "gdpPPP": 248.158,
      "perCapitaPPP": 28004.3,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 0.08
    },
    {
      "year": 2000,
      "gdpPPP": 265.532,
      "perCapitaPPP": 29892.9,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 0.25
    },
    {
      "year": 2001,
      "gdpPPP": 275.206,
      "perCapitaPPP": 30890.3,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 0.29
    },
    {
      "year": 2002,
      "gdpPPP": 285.849,
      "perCapitaPPP": 31971.3,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 0.36
    },
    {
      "year": 2003,
      "gdpPPP": 296.975,
      "perCapitaPPP": 33086.7,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 0.39
    },
    {
      "year": 2004,
      "gdpPPP": 317.706,
      "perCapitaPPP": 35256.1,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": 0.39
    },
    {
      "year": 2005,
      "gdpPPP": 336.821,
      "perCapitaPPP": 37227.1,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 0.41
    },
    {
      "year": 2006,
      "gdpPPP": 363.444,
      "perCapitaPPP": 39880.9,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 0.72
    },
    {
      "year": 2007,
      "gdpPPP": 385.329,
      "perCapitaPPP": 41961.5,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 0.77
    },
    {
      "year": 2008,
      "gdpPPP": 389.127,
      "perCapitaPPP": 42038.9,
      "perCapitaPPPChangePct": 0.18,
      "popChangePct": 0.79
    },
    {
      "year": 2009,
      "gdpPPP": 374.865,
      "perCapitaPPP": 40132.5,
      "perCapitaPPPChangePct": -4.53,
      "popChangePct": 0.92
    },
    {
      "year": 2010,
      "gdpPPP": 401.24,
      "perCapitaPPP": 42614.6,
      "perCapitaPPPChangePct": 6.18,
      "popChangePct": 0.8
    },
    {
      "year": 2011,
      "gdpPPP": 422.476,
      "perCapitaPPP": 44551.5,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 0.71
    },
    {
      "year": 2012,
      "gdpPPP": 428.559,
      "perCapitaPPP": 44847.6,
      "perCapitaPPPChangePct": 0.66,
      "popChangePct": 0.77
    },
    {
      "year": 2013,
      "gdpPPP": 440.811,
      "perCapitaPPP": 45704.2,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 0.93
    },
    {
      "year": 2014,
      "gdpPPP": 458.785,
      "perCapitaPPP": 47067.7,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 1.06
    },
    {
      "year": 2015,
      "gdpPPP": 483.362,
      "perCapitaPPP": 49067.2,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 1.07
    },
    {
      "year": 2016,
      "gdpPPP": 498.355,
      "perCapitaPPP": 49859.6,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 1.46
    },
    {
      "year": 2017,
      "gdpPPP": 516.831,
      "perCapitaPPP": 51069.0,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 1.25
    },
    {
      "year": 2018,
      "gdpPPP": 538.902,
      "perCapitaPPP": 52677.6,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 1.09
    },
    {
      "year": 2019,
      "gdpPPP": 584.969,
      "perCapitaPPP": 56641.4,
      "perCapitaPPPChangePct": 7.52,
      "popChangePct": 0.96
    },
    {
      "year": 2020,
      "gdpPPP": 594.249,
      "perCapitaPPP": 57253.3,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 0.49
    },
    {
      "year": 2021,
      "gdpPPP": 651.825,
      "perCapitaPPP": 62361.7,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 0.7
    },
    {
      "year": 2022,
      "gdpPPP": 706.951,
      "perCapitaPPP": 67190.7,
      "perCapitaPPPChangePct": 7.74,
      "popChangePct": 0.67
    },
    {
      "year": 2023,
      "gdpPPP": 731.612,
      "perCapitaPPP": 69335.9,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.29
    },
    {
      "year": 2024,
      "gdpPPP": 757.406,
      "perCapitaPPP": 71536.4,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 0.34
    },
    {
      "year": 2025,
      "gdpPPP": 790.912,
      "perCapitaPPP": 74080.8,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 0.83
    },
    {
      "year": 2026,
      "gdpPPP": 829.539,
      "perCapitaPPP": 77093.7,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 0.79
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 863.917,
      "perCapitaPPP": 79705.3,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 0.73
    },
    {
      "year": 2028,
      "gdpPPP": 896.742,
      "perCapitaPPP": 82171.5,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 0.68
    },
    {
      "year": 2029,
      "gdpPPP": 929.687,
      "perCapitaPPP": 84648.0,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 0.64
    },
    {
      "year": 2030,
      "gdpPPP": 964.127,
      "perCapitaPPP": 87260.2,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 0.6
    },
    {
      "year": 2031,
      "gdpPPP": 998.752,
      "perCapitaPPP": 89886.0,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 0.56
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SwedenGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
