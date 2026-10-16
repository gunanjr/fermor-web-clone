import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Gambia",
  "slug": "gambia",
  "iso3": "GMB",
  "region": "Africa",
  "rank2026": 187,
  "flagEmoji": "🇬🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Lesotho",
      "slug": "lesotho",
      "rank": 186
    },
    {
      "name": "Saint Lucia",
      "slug": "saint-lucia",
      "rank": 188
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.606,
      "growth": 0.7,
      "perCapita": 903.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.58,
      "growth": -9.5,
      "perCapita": 814.8,
      "popChangePct": 6.27
    },
    {
      "year": 1982,
      "gdp": 0.547,
      "growth": 20.8,
      "perCapita": 740.8,
      "popChangePct": 3.65
    },
    {
      "year": 1983,
      "gdp": 0.55,
      "growth": 13.5,
      "perCapita": 717.1,
      "popChangePct": 4.07
    },
    {
      "year": 1984,
      "gdp": 0.396,
      "growth": -7.6,
      "perCapita": 495.9,
      "popChangePct": 4.04
    },
    {
      "year": 1985,
      "gdp": 0.482,
      "growth": 3.6,
      "perCapita": 579.2,
      "popChangePct": 4.13
    },
    {
      "year": 1986,
      "gdp": 0.376,
      "growth": 2.4,
      "perCapita": 434.2,
      "popChangePct": 4.09
    },
    {
      "year": 1987,
      "gdp": 0.504,
      "growth": 2.8,
      "perCapita": 559.2,
      "popChangePct": 4.04
    },
    {
      "year": 1988,
      "gdp": 0.585,
      "growth": 1.7,
      "perCapita": 623.5,
      "popChangePct": 4.11
    },
    {
      "year": 1989,
      "gdp": 0.614,
      "growth": 4.3,
      "perCapita": 629.3,
      "popChangePct": 4.05
    },
    {
      "year": 1990,
      "gdp": 0.721,
      "growth": 5.7,
      "perCapita": 709.1,
      "popChangePct": 4.1
    },
    {
      "year": 1991,
      "gdp": 0.76,
      "growth": 2.2,
      "perCapita": 718.7,
      "popChangePct": 4.13
    },
    {
      "year": 1992,
      "gdp": 0.82,
      "growth": 1.8,
      "perCapita": 744.8,
      "popChangePct": 4.06
    },
    {
      "year": 1993,
      "gdp": 0.878,
      "growth": 3.8,
      "perCapita": 753.6,
      "popChangePct": 5.9
    },
    {
      "year": 1994,
      "gdp": 0.87,
      "growth": -3.4,
      "perCapita": 721.2,
      "popChangePct": 3.43
    },
    {
      "year": 1995,
      "gdp": 0.909,
      "growth": 3.3,
      "perCapita": 731.0,
      "popChangePct": 3.15
    },
    {
      "year": 1996,
      "gdp": 0.949,
      "growth": 2.9,
      "perCapita": 740.8,
      "popChangePct": 2.97
    },
    {
      "year": 1997,
      "gdp": 0.983,
      "growth": 1.4,
      "perCapita": 734.2,
      "popChangePct": 4.53
    },
    {
      "year": 1998,
      "gdp": 1.009,
      "growth": 6.5,
      "perCapita": 733.1,
      "popChangePct": 2.84
    },
    {
      "year": 1999,
      "gdp": 1.036,
      "growth": 6.4,
      "perCapita": 731.8,
      "popChangePct": 2.83
    },
    {
      "year": 2000,
      "gdp": 1.01,
      "growth": 5.5,
      "perCapita": 693.9,
      "popChangePct": 2.75
    },
    {
      "year": 2001,
      "gdp": 1.002,
      "growth": 5.8,
      "perCapita": 670.5,
      "popChangePct": 2.75
    },
    {
      "year": 2002,
      "gdp": 0.887,
      "growth": -3.2,
      "perCapita": 577.5,
      "popChangePct": 2.74
    },
    {
      "year": 2003,
      "gdp": 0.843,
      "growth": 6.9,
      "perCapita": 534.3,
      "popChangePct": 2.73
    },
    {
      "year": 2004,
      "gdp": 0.962,
      "growth": 7,
      "perCapita": 593.3,
      "popChangePct": 2.72
    },
    {
      "year": 2005,
      "gdp": 1.028,
      "growth": -2.4,
      "perCapita": 616.5,
      "popChangePct": 2.84
    },
    {
      "year": 2006,
      "gdp": 1.054,
      "growth": -0.6,
      "perCapita": 614.5,
      "popChangePct": 2.88
    },
    {
      "year": 2007,
      "gdp": 1.28,
      "growth": 3,
      "perCapita": 724.7,
      "popChangePct": 2.97
    },
    {
      "year": 2008,
      "gdp": 1.562,
      "growth": 6.3,
      "perCapita": 859.1,
      "popChangePct": 2.94
    },
    {
      "year": 2009,
      "gdp": 1.45,
      "growth": 6.7,
      "perCapita": 774.9,
      "popChangePct": 2.92
    },
    {
      "year": 2010,
      "gdp": 1.543,
      "growth": 5.9,
      "perCapita": 801.0,
      "popChangePct": 2.99
    },
    {
      "year": 2011,
      "gdp": 1.41,
      "growth": -8.1,
      "perCapita": 710.6,
      "popChangePct": 2.96
    },
    {
      "year": 2012,
      "gdp": 1.415,
      "growth": 5.2,
      "perCapita": 692.6,
      "popChangePct": 2.97
    },
    {
      "year": 2013,
      "gdp": 1.376,
      "growth": 2.9,
      "perCapita": 653.9,
      "popChangePct": 2.99
    },
    {
      "year": 2014,
      "gdp": 1.229,
      "growth": -1.4,
      "perCapita": 568.0,
      "popChangePct": 2.9
    },
    {
      "year": 2015,
      "gdp": 1.355,
      "growth": 4.1,
      "perCapita": 609.0,
      "popChangePct": 2.77
    },
    {
      "year": 2016,
      "gdp": 1.47,
      "growth": 1.9,
      "perCapita": 643.7,
      "popChangePct": 2.65
    },
    {
      "year": 2017,
      "gdp": 1.498,
      "growth": 4.8,
      "perCapita": 639.6,
      "popChangePct": 2.54
    },
    {
      "year": 2018,
      "gdp": 1.662,
      "growth": 7.2,
      "perCapita": 692.7,
      "popChangePct": 2.48
    },
    {
      "year": 2019,
      "gdp": 1.806,
      "growth": 6.2,
      "perCapita": 733.9,
      "popChangePct": 2.54
    },
    {
      "year": 2020,
      "gdp": 1.809,
      "growth": 0.6,
      "perCapita": 717.1,
      "popChangePct": 2.52
    },
    {
      "year": 2021,
      "gdp": 2.045,
      "growth": 5.3,
      "perCapita": 790.6,
      "popChangePct": 2.5
    },
    {
      "year": 2022,
      "gdp": 2.135,
      "growth": 5.5,
      "perCapita": 805.2,
      "popChangePct": 2.55
    },
    {
      "year": 2023,
      "gdp": 2.331,
      "growth": 5.9,
      "perCapita": 857.5,
      "popChangePct": 2.53
    },
    {
      "year": 2024,
      "gdp": 2.403,
      "growth": 5.6,
      "perCapita": 861.9,
      "popChangePct": 2.5
    },
    {
      "year": 2025,
      "gdp": 2.584,
      "growth": 6,
      "perCapita": 904.3,
      "popChangePct": 2.55
    },
    {
      "year": 2026,
      "gdp": 2.792,
      "growth": 5.1,
      "perCapita": 953.1,
      "popChangePct": 2.52
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3.021,
      "growth": 5,
      "perCapita": 1005.9,
      "popChangePct": 2.53
    },
    {
      "year": 2028,
      "gdp": 3.273,
      "growth": 5,
      "perCapita": 1062.8,
      "popChangePct": 2.5
    },
    {
      "year": 2029,
      "gdp": 3.516,
      "growth": 5,
      "perCapita": 1113.8,
      "popChangePct": 2.53
    },
    {
      "year": 2030,
      "gdp": 3.793,
      "growth": 5,
      "perCapita": 1172.0,
      "popChangePct": 2.53
    },
    {
      "year": 2031,
      "gdp": 4.106,
      "growth": 5,
      "perCapita": 1237.2,
      "popChangePct": 2.5
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.651,
      "perCapitaPPP": 970.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.645,
      "perCapitaPPP": 905.6,
      "perCapitaPPPChangePct": -6.72,
      "popChangePct": 6.27
    },
    {
      "year": 1982,
      "gdpPPP": 0.826,
      "perCapitaPPP": 1119.7,
      "perCapitaPPPChangePct": 23.65,
      "popChangePct": 3.65
    },
    {
      "year": 1983,
      "gdpPPP": 0.975,
      "perCapitaPPP": 1270.0,
      "perCapitaPPPChangePct": 13.43,
      "popChangePct": 4.07
    },
    {
      "year": 1984,
      "gdpPPP": 0.933,
      "perCapitaPPP": 1167.9,
      "perCapitaPPPChangePct": -8.05,
      "popChangePct": 4.04
    },
    {
      "year": 1985,
      "gdpPPP": 0.998,
      "perCapitaPPP": 1199.7,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 4.13
    },
    {
      "year": 1986,
      "gdpPPP": 1.042,
      "perCapitaPPP": 1203.5,
      "perCapitaPPPChangePct": 0.32,
      "popChangePct": 4.09
    },
    {
      "year": 1987,
      "gdpPPP": 1.098,
      "perCapitaPPP": 1218.1,
      "perCapitaPPPChangePct": 1.21,
      "popChangePct": 4.04
    },
    {
      "year": 1988,
      "gdpPPP": 1.156,
      "perCapitaPPP": 1232.1,
      "perCapitaPPPChangePct": 1.15,
      "popChangePct": 4.11
    },
    {
      "year": 1989,
      "gdpPPP": 1.253,
      "perCapitaPPP": 1283.4,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 4.05
    },
    {
      "year": 1990,
      "gdpPPP": 1.374,
      "perCapitaPPP": 1352.0,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 4.1
    },
    {
      "year": 1991,
      "gdpPPP": 1.451,
      "perCapitaPPP": 1371.8,
      "perCapitaPPPChangePct": 1.47,
      "popChangePct": 4.13
    },
    {
      "year": 1992,
      "gdpPPP": 1.51,
      "perCapitaPPP": 1371.7,
      "perCapitaPPPChangePct": -0.01,
      "popChangePct": 4.06
    },
    {
      "year": 1993,
      "gdpPPP": 1.605,
      "perCapitaPPP": 1377.4,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 5.9
    },
    {
      "year": 1994,
      "gdpPPP": 1.584,
      "perCapitaPPP": 1313.5,
      "perCapitaPPPChangePct": -4.64,
      "popChangePct": 3.43
    },
    {
      "year": 1995,
      "gdpPPP": 1.671,
      "perCapitaPPP": 1343.7,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 3.15
    },
    {
      "year": 1996,
      "gdpPPP": 1.751,
      "perCapitaPPP": 1367.0,
      "perCapitaPPPChangePct": 1.74,
      "popChangePct": 2.97
    },
    {
      "year": 1997,
      "gdpPPP": 1.806,
      "perCapitaPPP": 1349.1,
      "perCapitaPPPChangePct": -1.31,
      "popChangePct": 4.53
    },
    {
      "year": 1998,
      "gdpPPP": 1.945,
      "perCapitaPPP": 1412.8,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 2.84
    },
    {
      "year": 1999,
      "gdpPPP": 2.099,
      "perCapitaPPP": 1482.7,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 2.83
    },
    {
      "year": 2000,
      "gdpPPP": 2.265,
      "perCapitaPPP": 1556.8,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 2.75
    },
    {
      "year": 2001,
      "gdpPPP": 2.45,
      "perCapitaPPP": 1638.5,
      "perCapitaPPPChangePct": 5.25,
      "popChangePct": 2.75
    },
    {
      "year": 2002,
      "gdpPPP": 2.407,
      "perCapitaPPP": 1567.3,
      "perCapitaPPPChangePct": -4.35,
      "popChangePct": 2.74
    },
    {
      "year": 2003,
      "gdpPPP": 2.623,
      "perCapitaPPP": 1662.7,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": 2.73
    },
    {
      "year": 2004,
      "gdpPPP": 2.883,
      "perCapitaPPP": 1778.5,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": 2.72
    },
    {
      "year": 2005,
      "gdpPPP": 2.904,
      "perCapitaPPP": 1742.0,
      "perCapitaPPPChangePct": -2.05,
      "popChangePct": 2.84
    },
    {
      "year": 2006,
      "gdpPPP": 2.977,
      "perCapitaPPP": 1735.5,
      "perCapitaPPPChangePct": -0.37,
      "popChangePct": 2.88
    },
    {
      "year": 2007,
      "gdpPPP": 3.151,
      "perCapitaPPP": 1784.2,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 2.97
    },
    {
      "year": 2008,
      "gdpPPP": 3.412,
      "perCapitaPPP": 1877.0,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 2.94
    },
    {
      "year": 2009,
      "gdpPPP": 3.662,
      "perCapitaPPP": 1956.8,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 2.92
    },
    {
      "year": 2010,
      "gdpPPP": 3.926,
      "perCapitaPPP": 2037.5,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 2.99
    },
    {
      "year": 2011,
      "gdpPPP": 3.681,
      "perCapitaPPP": 1855.4,
      "perCapitaPPPChangePct": -8.94,
      "popChangePct": 2.96
    },
    {
      "year": 2012,
      "gdpPPP": 3.946,
      "perCapitaPPP": 1931.3,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 2.97
    },
    {
      "year": 2013,
      "gdpPPP": 4.128,
      "perCapitaPPP": 1962.3,
      "perCapitaPPPChangePct": 1.6,
      "popChangePct": 2.99
    },
    {
      "year": 2014,
      "gdpPPP": 4.141,
      "perCapitaPPP": 1913.1,
      "perCapitaPPPChangePct": -2.5,
      "popChangePct": 2.9
    },
    {
      "year": 2015,
      "gdpPPP": 4.349,
      "perCapitaPPP": 1955.1,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.77
    },
    {
      "year": 2016,
      "gdpPPP": 4.476,
      "perCapitaPPP": 1959.8,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 2.65
    },
    {
      "year": 2017,
      "gdpPPP": 4.776,
      "perCapitaPPP": 2039.0,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 2.54
    },
    {
      "year": 2018,
      "gdpPPP": 5.465,
      "perCapitaPPP": 2277.4,
      "perCapitaPPPChangePct": 11.7,
      "popChangePct": 2.48
    },
    {
      "year": 2019,
      "gdpPPP": 5.95,
      "perCapitaPPP": 2417.6,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 2.54
    },
    {
      "year": 2020,
      "gdpPPP": 6.367,
      "perCapitaPPP": 2523.4,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 2.52
    },
    {
      "year": 2021,
      "gdpPPP": 7.156,
      "perCapitaPPP": 2766.6,
      "perCapitaPPPChangePct": 9.64,
      "popChangePct": 2.5
    },
    {
      "year": 2022,
      "gdpPPP": 8.086,
      "perCapitaPPP": 3049.0,
      "perCapitaPPPChangePct": 10.21,
      "popChangePct": 2.55
    },
    {
      "year": 2023,
      "gdpPPP": 8.881,
      "perCapitaPPP": 3266.5,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 2.53
    },
    {
      "year": 2024,
      "gdpPPP": 9.607,
      "perCapitaPPP": 3446.5,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 2.5
    },
    {
      "year": 2025,
      "gdpPPP": 10.472,
      "perCapitaPPP": 3664.6,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 2.55
    },
    {
      "year": 2026,
      "gdpPPP": 11.323,
      "perCapitaPPP": 3864.8,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 2.52
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 12.153,
      "perCapitaPPP": 4046.1,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": 2.53
    },
    {
      "year": 2028,
      "gdpPPP": 12.973,
      "perCapitaPPP": 4212.6,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 2.5
    },
    {
      "year": 2029,
      "gdpPPP": 13.866,
      "perCapitaPPP": 4391.9,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 2.53
    },
    {
      "year": 2030,
      "gdpPPP": 14.829,
      "perCapitaPPP": 4581.5,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 2.53
    },
    {
      "year": 2031,
      "gdpPPP": 15.855,
      "perCapitaPPP": 4777.8,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 2.5
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GambiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
