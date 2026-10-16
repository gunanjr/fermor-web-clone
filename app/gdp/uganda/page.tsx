import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Uganda",
  "slug": "uganda",
  "iso3": "UGA",
  "region": "Africa",
  "rank2026": 92,
  "flagEmoji": "🇺🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Azerbaijan",
      "slug": "azerbaijan",
      "rank": 91
    },
    {
      "name": "Cameroon",
      "slug": "cameroon",
      "rank": 93
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 7.486,
      "growth": -3.4,
      "perCapita": 664.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 12.12,
      "growth": 3.9,
      "perCapita": 1044.1,
      "popChangePct": 3.05
    },
    {
      "year": 1982,
      "gdp": 8.41,
      "growth": 8.2,
      "perCapita": 703.0,
      "popChangePct": 3.06
    },
    {
      "year": 1983,
      "gdp": 9.619,
      "growth": 4.9,
      "perCapita": 779.8,
      "popChangePct": 3.12
    },
    {
      "year": 1984,
      "gdp": 7.399,
      "growth": -3,
      "perCapita": 581.0,
      "popChangePct": 3.23
    },
    {
      "year": 1985,
      "gdp": 6.771,
      "growth": -3,
      "perCapita": 514.2,
      "popChangePct": 3.42
    },
    {
      "year": 1986,
      "gdp": 6.746,
      "growth": 0.9,
      "perCapita": 494.5,
      "popChangePct": 3.58
    },
    {
      "year": 1987,
      "gdp": 10.878,
      "growth": 4,
      "perCapita": 768.9,
      "popChangePct": 3.71
    },
    {
      "year": 1988,
      "gdp": 11.268,
      "growth": 8.3,
      "perCapita": 767.7,
      "popChangePct": 3.76
    },
    {
      "year": 1989,
      "gdp": 9.136,
      "growth": 6.4,
      "perCapita": 600.0,
      "popChangePct": 3.73
    },
    {
      "year": 1990,
      "gdp": 7.452,
      "growth": 6.5,
      "perCapita": 472.2,
      "popChangePct": 3.64
    },
    {
      "year": 1991,
      "gdp": 3.897,
      "growth": 1.8,
      "perCapita": 238.5,
      "popChangePct": 3.55
    },
    {
      "year": 1992,
      "gdp": 3.645,
      "growth": 5.9,
      "perCapita": 216.0,
      "popChangePct": 3.24
    },
    {
      "year": 1993,
      "gdp": 4.311,
      "growth": 6.7,
      "perCapita": 247.1,
      "popChangePct": 3.4
    },
    {
      "year": 1994,
      "gdp": 6.24,
      "growth": 7.7,
      "perCapita": 346.3,
      "popChangePct": 3.29
    },
    {
      "year": 1995,
      "gdp": 7.473,
      "growth": 9.2,
      "perCapita": 401.9,
      "popChangePct": 3.19
    },
    {
      "year": 1996,
      "gdp": 7.713,
      "growth": 6.6,
      "perCapita": 401.4,
      "popChangePct": 3.33
    },
    {
      "year": 1997,
      "gdp": 8.407,
      "growth": 4.6,
      "perCapita": 423.9,
      "popChangePct": 3.22
    },
    {
      "year": 1998,
      "gdp": 8.23,
      "growth": 6.1,
      "perCapita": 402.5,
      "popChangePct": 3.12
    },
    {
      "year": 1999,
      "gdp": 7.823,
      "growth": 8,
      "perCapita": 370.5,
      "popChangePct": 3.24
    },
    {
      "year": 2000,
      "gdp": 7.756,
      "growth": 3.9,
      "perCapita": 355.5,
      "popChangePct": 3.35
    },
    {
      "year": 2001,
      "gdp": 7.835,
      "growth": 8.8,
      "perCapita": 347.8,
      "popChangePct": 3.24
    },
    {
      "year": 2002,
      "gdp": 8.425,
      "growth": 7.1,
      "perCapita": 362.0,
      "popChangePct": 3.33
    },
    {
      "year": 2003,
      "gdp": 8.725,
      "growth": 6.2,
      "perCapita": 361.8,
      "popChangePct": 3.6
    },
    {
      "year": 2004,
      "gdp": 10.75,
      "growth": 5.8,
      "perCapita": 430.8,
      "popChangePct": 3.48
    },
    {
      "year": 2005,
      "gdp": 12.46,
      "growth": 10,
      "perCapita": 483.0,
      "popChangePct": 3.36
    },
    {
      "year": 2006,
      "gdp": 14.079,
      "growth": 7,
      "perCapita": 527.7,
      "popChangePct": 3.42
    },
    {
      "year": 2007,
      "gdp": 17.512,
      "growth": 8.1,
      "perCapita": 634.4,
      "popChangePct": 3.48
    },
    {
      "year": 2008,
      "gdp": 22.419,
      "growth": 10.4,
      "perCapita": 784.5,
      "popChangePct": 3.52
    },
    {
      "year": 2009,
      "gdp": 24.107,
      "growth": 8.1,
      "perCapita": 815.8,
      "popChangePct": 3.4
    },
    {
      "year": 2010,
      "gdp": 24.683,
      "growth": 7.5,
      "perCapita": 808.7,
      "popChangePct": 3.29
    },
    {
      "year": 2011,
      "gdp": 27.501,
      "growth": 7.7,
      "perCapita": 872.0,
      "popChangePct": 3.33
    },
    {
      "year": 2012,
      "gdp": 30.939,
      "growth": 2.3,
      "perCapita": 950.6,
      "popChangePct": 3.21
    },
    {
      "year": 2013,
      "gdp": 32.331,
      "growth": 3.9,
      "perCapita": 964.8,
      "popChangePct": 2.96
    },
    {
      "year": 2014,
      "gdp": 34.754,
      "growth": 5.7,
      "perCapita": 1008.0,
      "popChangePct": 2.89
    },
    {
      "year": 2015,
      "gdp": 30.122,
      "growth": 8,
      "perCapita": 848.7,
      "popChangePct": 2.94
    },
    {
      "year": 2016,
      "gdp": 30.232,
      "growth": 0.2,
      "perCapita": 826.9,
      "popChangePct": 3.01
    },
    {
      "year": 2017,
      "gdp": 31.589,
      "growth": 6.8,
      "perCapita": 838.5,
      "popChangePct": 3.04
    },
    {
      "year": 2018,
      "gdp": 34.127,
      "growth": 5.6,
      "perCapita": 879.0,
      "popChangePct": 3.05
    },
    {
      "year": 2019,
      "gdp": 37.895,
      "growth": 7.6,
      "perCapita": 951.6,
      "popChangePct": 2.58
    },
    {
      "year": 2020,
      "gdp": 37.889,
      "growth": -1.2,
      "perCapita": 919.1,
      "popChangePct": 3.51
    },
    {
      "year": 2021,
      "gdp": 42.805,
      "growth": 5.5,
      "perCapita": 1008.1,
      "popChangePct": 3.0
    },
    {
      "year": 2022,
      "gdp": 47.272,
      "growth": 6.2,
      "perCapita": 1079.3,
      "popChangePct": 3.15
    },
    {
      "year": 2023,
      "gdp": 52.038,
      "growth": 5,
      "perCapita": 1150.7,
      "popChangePct": 3.25
    },
    {
      "year": 2024,
      "gdp": 57.061,
      "growth": 6,
      "perCapita": 1223.9,
      "popChangePct": 3.1
    },
    {
      "year": 2025,
      "gdp": 66.014,
      "growth": 6.7,
      "perCapita": 1374.7,
      "popChangePct": 3.0
    },
    {
      "year": 2026,
      "gdp": 73.37,
      "growth": 7.5,
      "perCapita": 1476.1,
      "popChangePct": 3.51
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 80.198,
      "growth": 8.2,
      "perCapita": 1543.8,
      "popChangePct": 4.51
    },
    {
      "year": 2028,
      "gdp": 87.684,
      "growth": 7,
      "perCapita": 1623.4,
      "popChangePct": 3.98
    },
    {
      "year": 2029,
      "gdp": 95.952,
      "growth": 6.7,
      "perCapita": 1724.7,
      "popChangePct": 3.0
    },
    {
      "year": 2030,
      "gdp": 103.904,
      "growth": 6.2,
      "perCapita": 1813.2,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdp": 112.31,
      "growth": 5.9,
      "perCapita": 1893.5,
      "popChangePct": 3.51
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 4.687,
      "perCapitaPPP": 416.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 5.328,
      "perCapitaPPP": 459.0,
      "perCapitaPPPChangePct": 10.32,
      "popChangePct": 3.05
    },
    {
      "year": 1982,
      "gdpPPP": 6.121,
      "perCapitaPPP": 511.7,
      "perCapitaPPPChangePct": 11.49,
      "popChangePct": 3.06
    },
    {
      "year": 1983,
      "gdpPPP": 6.673,
      "perCapitaPPP": 541.0,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 3.12
    },
    {
      "year": 1984,
      "gdpPPP": 6.706,
      "perCapitaPPP": 526.6,
      "perCapitaPPPChangePct": -2.65,
      "popChangePct": 3.23
    },
    {
      "year": 1985,
      "gdpPPP": 6.711,
      "perCapitaPPP": 509.6,
      "perCapitaPPPChangePct": -3.23,
      "popChangePct": 3.42
    },
    {
      "year": 1986,
      "gdpPPP": 6.911,
      "perCapitaPPP": 506.6,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 3.58
    },
    {
      "year": 1987,
      "gdpPPP": 7.365,
      "perCapitaPPP": 520.6,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 3.71
    },
    {
      "year": 1988,
      "gdpPPP": 8.257,
      "perCapitaPPP": 562.5,
      "perCapitaPPPChangePct": 8.05,
      "popChangePct": 3.76
    },
    {
      "year": 1989,
      "gdpPPP": 9.13,
      "perCapitaPPP": 599.6,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 3.73
    },
    {
      "year": 1990,
      "gdpPPP": 10.088,
      "perCapitaPPP": 639.2,
      "perCapitaPPPChangePct": 6.6,
      "popChangePct": 3.64
    },
    {
      "year": 1991,
      "gdpPPP": 10.614,
      "perCapitaPPP": 649.5,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 3.55
    },
    {
      "year": 1992,
      "gdpPPP": 11.491,
      "perCapitaPPP": 681.1,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 3.24
    },
    {
      "year": 1993,
      "gdpPPP": 12.55,
      "perCapitaPPP": 719.3,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 3.4
    },
    {
      "year": 1994,
      "gdpPPP": 13.804,
      "perCapitaPPP": 766.0,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 3.29
    },
    {
      "year": 1995,
      "gdpPPP": 15.387,
      "perCapitaPPP": 827.5,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 3.19
    },
    {
      "year": 1996,
      "gdpPPP": 16.702,
      "perCapitaPPP": 869.3,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 3.33
    },
    {
      "year": 1997,
      "gdpPPP": 17.775,
      "perCapitaPPP": 896.3,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 3.22
    },
    {
      "year": 1998,
      "gdpPPP": 19.066,
      "perCapitaPPP": 932.3,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 3.12
    },
    {
      "year": 1999,
      "gdpPPP": 20.874,
      "perCapitaPPP": 988.7,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 3.24
    },
    {
      "year": 2000,
      "gdpPPP": 22.188,
      "perCapitaPPP": 1016.9,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 3.35
    },
    {
      "year": 2001,
      "gdpPPP": 24.676,
      "perCapitaPPP": 1095.4,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 3.24
    },
    {
      "year": 2002,
      "gdpPPP": 26.828,
      "perCapitaPPP": 1152.5,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 3.33
    },
    {
      "year": 2003,
      "gdpPPP": 29.043,
      "perCapitaPPP": 1204.3,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 3.6
    },
    {
      "year": 2004,
      "gdpPPP": 31.554,
      "perCapitaPPP": 1264.4,
      "perCapitaPPPChangePct": 4.99,
      "popChangePct": 3.48
    },
    {
      "year": 2005,
      "gdpPPP": 35.801,
      "perCapitaPPP": 1387.9,
      "perCapitaPPPChangePct": 9.77,
      "popChangePct": 3.36
    },
    {
      "year": 2006,
      "gdpPPP": 39.506,
      "perCapitaPPP": 1480.8,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 3.42
    },
    {
      "year": 2007,
      "gdpPPP": 43.849,
      "perCapitaPPP": 1588.4,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 3.48
    },
    {
      "year": 2008,
      "gdpPPP": 49.354,
      "perCapitaPPP": 1727.0,
      "perCapitaPPPChangePct": 8.73,
      "popChangePct": 3.52
    },
    {
      "year": 2009,
      "gdpPPP": 53.665,
      "perCapitaPPP": 1816.1,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 3.4
    },
    {
      "year": 2010,
      "gdpPPP": 58.382,
      "perCapitaPPP": 1912.9,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": 3.29
    },
    {
      "year": 2011,
      "gdpPPP": 64.162,
      "perCapitaPPP": 2034.5,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 3.33
    },
    {
      "year": 2012,
      "gdpPPP": 66.881,
      "perCapitaPPP": 2054.9,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 3.21
    },
    {
      "year": 2013,
      "gdpPPP": 70.698,
      "perCapitaPPP": 2109.8,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 2.96
    },
    {
      "year": 2014,
      "gdpPPP": 76.062,
      "perCapitaPPP": 2206.2,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 2.89
    },
    {
      "year": 2015,
      "gdpPPP": 82.913,
      "perCapitaPPP": 2336.1,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 2.94
    },
    {
      "year": 2016,
      "gdpPPP": 83.841,
      "perCapitaPPP": 2293.2,
      "perCapitaPPPChangePct": -1.84,
      "popChangePct": 3.01
    },
    {
      "year": 2017,
      "gdpPPP": 91.142,
      "perCapitaPPP": 2419.2,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 3.04
    },
    {
      "year": 2018,
      "gdpPPP": 101.251,
      "perCapitaPPP": 2608.0,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 3.05
    },
    {
      "year": 2019,
      "gdpPPP": 111.336,
      "perCapitaPPP": 2795.8,
      "perCapitaPPPChangePct": 7.2,
      "popChangePct": 2.58
    },
    {
      "year": 2020,
      "gdpPPP": 113.757,
      "perCapitaPPP": 2759.6,
      "perCapitaPPPChangePct": -1.29,
      "popChangePct": 3.51
    },
    {
      "year": 2021,
      "gdpPPP": 127.618,
      "perCapitaPPP": 3005.6,
      "perCapitaPPPChangePct": 8.91,
      "popChangePct": 3.0
    },
    {
      "year": 2022,
      "gdpPPP": 145.139,
      "perCapitaPPP": 3313.8,
      "perCapitaPPPChangePct": 10.25,
      "popChangePct": 3.15
    },
    {
      "year": 2023,
      "gdpPPP": 158.047,
      "perCapitaPPP": 3494.9,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 3.25
    },
    {
      "year": 2024,
      "gdpPPP": 171.686,
      "perCapitaPPP": 3682.4,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 3.1
    },
    {
      "year": 2025,
      "gdpPPP": 188.429,
      "perCapitaPPP": 3923.8,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": 3.0
    },
    {
      "year": 2026,
      "gdpPPP": 208.381,
      "perCapitaPPP": 4192.3,
      "perCapitaPPPChangePct": 6.84,
      "popChangePct": 3.51
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 230.41,
      "perCapitaPPP": 4435.4,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 4.51
    },
    {
      "year": 2028,
      "gdpPPP": 250.609,
      "perCapitaPPP": 4639.8,
      "perCapitaPPPChangePct": 4.61,
      "popChangePct": 3.98
    },
    {
      "year": 2029,
      "gdpPPP": 272.07,
      "perCapitaPPP": 4890.4,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 3.0
    },
    {
      "year": 2030,
      "gdpPPP": 294.282,
      "perCapitaPPP": 5135.6,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdpPPP": 317.231,
      "perCapitaPPP": 5348.5,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 3.51
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function UgandaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
