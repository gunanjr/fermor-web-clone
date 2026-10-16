import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Kenya",
  "slug": "kenya",
  "iso3": "KEN",
  "region": "Africa",
  "rank2026": 66,
  "flagEmoji": "🇰🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bulgaria",
      "slug": "bulgaria",
      "rank": 65
    },
    {
      "name": "Ecuador",
      "slug": "ecuador",
      "rank": 67
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 13.449,
      "growth": 5.6,
      "perCapita": 855.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 12.667,
      "growth": 4.1,
      "perCapita": 776.8,
      "popChangePct": 3.73
    },
    {
      "year": 1982,
      "gdp": 12.196,
      "growth": 5.1,
      "perCapita": 721.6,
      "popChangePct": 3.63
    },
    {
      "year": 1983,
      "gdp": 11.279,
      "growth": 1.6,
      "perCapita": 644.5,
      "popChangePct": 3.55
    },
    {
      "year": 1984,
      "gdp": 11.703,
      "growth": 1.6,
      "perCapita": 646.6,
      "popChangePct": 3.43
    },
    {
      "year": 1985,
      "gdp": 11.646,
      "growth": 4.1,
      "perCapita": 622.8,
      "popChangePct": 3.31
    },
    {
      "year": 1986,
      "gdp": 13.832,
      "growth": 7,
      "perCapita": 716.7,
      "popChangePct": 3.21
    },
    {
      "year": 1987,
      "gdp": 15.163,
      "growth": 5.8,
      "perCapita": 758.2,
      "popChangePct": 3.63
    },
    {
      "year": 1988,
      "gdp": 15.721,
      "growth": 6.1,
      "perCapita": 759.5,
      "popChangePct": 3.5
    },
    {
      "year": 1989,
      "gdp": 15.586,
      "growth": 4.6,
      "perCapita": 728.3,
      "popChangePct": 3.38
    },
    {
      "year": 1990,
      "gdp": 16.219,
      "growth": 4.1,
      "perCapita": 737.2,
      "popChangePct": 2.8
    },
    {
      "year": 1991,
      "gdp": 15.315,
      "growth": 1.3,
      "perCapita": 674.7,
      "popChangePct": 3.18
    },
    {
      "year": 1992,
      "gdp": 15.084,
      "growth": -1.1,
      "perCapita": 644.6,
      "popChangePct": 3.08
    },
    {
      "year": 1993,
      "gdp": 10.479,
      "growth": -0.1,
      "perCapita": 434.8,
      "popChangePct": 2.99
    },
    {
      "year": 1994,
      "gdp": 12.546,
      "growth": 2.5,
      "perCapita": 505.9,
      "popChangePct": 2.9
    },
    {
      "year": 1995,
      "gdp": 15.905,
      "growth": 4.3,
      "perCapita": 623.7,
      "popChangePct": 2.82
    },
    {
      "year": 1996,
      "gdp": 18.064,
      "growth": 4.5,
      "perCapita": 686.8,
      "popChangePct": 3.14
    },
    {
      "year": 1997,
      "gdp": 18.3,
      "growth": 0.4,
      "perCapita": 677.8,
      "popChangePct": 2.66
    },
    {
      "year": 1998,
      "gdp": 20.63,
      "growth": 3,
      "perCapita": 742.1,
      "popChangePct": 2.96
    },
    {
      "year": 1999,
      "gdp": 18.594,
      "growth": 2.2,
      "perCapita": 647.9,
      "popChangePct": 3.24
    },
    {
      "year": 2000,
      "gdp": 18.206,
      "growth": 0.3,
      "perCapita": 617.1,
      "popChangePct": 2.79
    },
    {
      "year": 2001,
      "gdp": 18.697,
      "growth": 4,
      "perCapita": 617.0,
      "popChangePct": 2.71
    },
    {
      "year": 2002,
      "gdp": 19.03,
      "growth": 0.5,
      "perCapita": 611.9,
      "popChangePct": 2.64
    },
    {
      "year": 2003,
      "gdp": 21.391,
      "growth": 2.9,
      "perCapita": 668.5,
      "popChangePct": 2.89
    },
    {
      "year": 2004,
      "gdp": 22.79,
      "growth": 4.6,
      "perCapita": 692.7,
      "popChangePct": 2.81
    },
    {
      "year": 2005,
      "gdp": 26.307,
      "growth": 5.7,
      "perCapita": 778.3,
      "popChangePct": 2.74
    },
    {
      "year": 2006,
      "gdp": 29.668,
      "growth": 5.9,
      "perCapita": 855.0,
      "popChangePct": 2.66
    },
    {
      "year": 2007,
      "gdp": 36.708,
      "growth": 6.9,
      "perCapita": 1028.2,
      "popChangePct": 2.88
    },
    {
      "year": 2008,
      "gdp": 41.058,
      "growth": 0.2,
      "perCapita": 1118.8,
      "popChangePct": 2.8
    },
    {
      "year": 2009,
      "gdp": 42.347,
      "growth": 3.3,
      "perCapita": 1123.3,
      "popChangePct": 2.72
    },
    {
      "year": 2010,
      "gdp": 45.406,
      "growth": 8.1,
      "perCapita": 1176.3,
      "popChangePct": 2.39
    },
    {
      "year": 2011,
      "gdp": 46.555,
      "growth": 5.1,
      "perCapita": 1178.6,
      "popChangePct": 2.33
    },
    {
      "year": 2012,
      "gdp": 56.407,
      "growth": 4.6,
      "perCapita": 1396.2,
      "popChangePct": 2.28
    },
    {
      "year": 2013,
      "gdp": 61.703,
      "growth": 3.8,
      "perCapita": 1490.4,
      "popChangePct": 2.48
    },
    {
      "year": 2014,
      "gdp": 68.395,
      "growth": 5,
      "perCapita": 1613.1,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdp": 70.37,
      "growth": 5,
      "perCapita": 1625.2,
      "popChangePct": 2.12
    },
    {
      "year": 2016,
      "gdp": 74.816,
      "growth": 4.2,
      "perCapita": 1688.9,
      "popChangePct": 2.31
    },
    {
      "year": 2017,
      "gdp": 81.965,
      "growth": 3.8,
      "perCapita": 1805.4,
      "popChangePct": 2.48
    },
    {
      "year": 2018,
      "gdp": 92.211,
      "growth": 5.7,
      "perCapita": 1987.3,
      "popChangePct": 2.2
    },
    {
      "year": 2019,
      "gdp": 100.328,
      "growth": 5.1,
      "perCapita": 2107.7,
      "popChangePct": 2.59
    },
    {
      "year": 2020,
      "gdp": 100.922,
      "growth": -0.3,
      "perCapita": 2068.2,
      "popChangePct": 2.51
    },
    {
      "year": 2021,
      "gdp": 109.875,
      "growth": 7.6,
      "perCapita": 2208.7,
      "popChangePct": 1.95
    },
    {
      "year": 2022,
      "gdp": 114.733,
      "growth": 4.9,
      "perCapita": 2265.7,
      "popChangePct": 1.8
    },
    {
      "year": 2023,
      "gdp": 108.206,
      "growth": 5.7,
      "perCapita": 2099.5,
      "popChangePct": 1.78
    },
    {
      "year": 2024,
      "gdp": 119.307,
      "growth": 4.7,
      "perCapita": 2274.9,
      "popChangePct": 1.76
    },
    {
      "year": 2025,
      "gdp": 136.455,
      "growth": 4.9,
      "perCapita": 2557.5,
      "popChangePct": 1.74
    },
    {
      "year": 2026,
      "gdp": 147.265,
      "growth": 4.5,
      "perCapita": 2713.6,
      "popChangePct": 1.71
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 154.744,
      "growth": 4.7,
      "perCapita": 2803.9,
      "popChangePct": 1.7
    },
    {
      "year": 2028,
      "gdp": 161.992,
      "growth": 5.1,
      "perCapita": 2886.8,
      "popChangePct": 1.68
    },
    {
      "year": 2029,
      "gdp": 171.533,
      "growth": 5,
      "perCapita": 3007.1,
      "popChangePct": 1.66
    },
    {
      "year": 2030,
      "gdp": 183.628,
      "growth": 5,
      "perCapita": 3167.3,
      "popChangePct": 1.64
    },
    {
      "year": 2031,
      "gdp": 196.043,
      "growth": 5,
      "perCapita": 3327.7,
      "popChangePct": 1.61
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 21.678,
      "perCapitaPPP": 1378.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 24.702,
      "perCapitaPPP": 1514.7,
      "perCapitaPPPChangePct": 9.85,
      "popChangePct": 3.73
    },
    {
      "year": 1982,
      "gdpPPP": 27.553,
      "perCapitaPPP": 1630.4,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 3.63
    },
    {
      "year": 1983,
      "gdpPPP": 29.088,
      "perCapitaPPP": 1662.2,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": 3.55
    },
    {
      "year": 1984,
      "gdpPPP": 30.62,
      "perCapitaPPP": 1691.7,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 3.43
    },
    {
      "year": 1985,
      "gdpPPP": 32.875,
      "perCapitaPPP": 1758.0,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 3.31
    },
    {
      "year": 1986,
      "gdpPPP": 35.879,
      "perCapitaPPP": 1859.0,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 3.21
    },
    {
      "year": 1987,
      "gdpPPP": 38.904,
      "perCapitaPPP": 1945.2,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 3.63
    },
    {
      "year": 1988,
      "gdpPPP": 42.73,
      "perCapitaPPP": 2064.2,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": 3.5
    },
    {
      "year": 1989,
      "gdpPPP": 46.427,
      "perCapitaPPP": 2169.5,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": 3.38
    },
    {
      "year": 1990,
      "gdpPPP": 50.156,
      "perCapitaPPP": 2279.8,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 2.8
    },
    {
      "year": 1991,
      "gdpPPP": 52.547,
      "perCapitaPPP": 2314.8,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 3.18
    },
    {
      "year": 1992,
      "gdpPPP": 53.164,
      "perCapitaPPP": 2272.0,
      "perCapitaPPPChangePct": -1.85,
      "popChangePct": 3.08
    },
    {
      "year": 1993,
      "gdpPPP": 54.372,
      "perCapitaPPP": 2256.1,
      "perCapitaPPPChangePct": -0.7,
      "popChangePct": 2.99
    },
    {
      "year": 1994,
      "gdpPPP": 56.939,
      "perCapitaPPP": 2295.9,
      "perCapitaPPPChangePct": 1.76,
      "popChangePct": 2.9
    },
    {
      "year": 1995,
      "gdpPPP": 60.625,
      "perCapitaPPP": 2377.4,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 2.82
    },
    {
      "year": 1996,
      "gdpPPP": 64.5,
      "perCapitaPPP": 2452.5,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 3.14
    },
    {
      "year": 1997,
      "gdpPPP": 65.882,
      "perCapitaPPP": 2440.1,
      "perCapitaPPPChangePct": -0.51,
      "popChangePct": 2.66
    },
    {
      "year": 1998,
      "gdpPPP": 68.61,
      "perCapitaPPP": 2468.0,
      "perCapitaPPPChangePct": 1.14,
      "popChangePct": 2.96
    },
    {
      "year": 1999,
      "gdpPPP": 71.111,
      "perCapitaPPP": 2477.7,
      "perCapitaPPPChangePct": 0.4,
      "popChangePct": 3.24
    },
    {
      "year": 2000,
      "gdpPPP": 72.974,
      "perCapitaPPP": 2473.7,
      "perCapitaPPPChangePct": -0.16,
      "popChangePct": 2.79
    },
    {
      "year": 2001,
      "gdpPPP": 77.586,
      "perCapitaPPP": 2560.6,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 2.71
    },
    {
      "year": 2002,
      "gdpPPP": 79.171,
      "perCapitaPPP": 2545.7,
      "perCapitaPPPChangePct": -0.58,
      "popChangePct": 2.64
    },
    {
      "year": 2003,
      "gdpPPP": 83.115,
      "perCapitaPPP": 2597.3,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": 2.89
    },
    {
      "year": 2004,
      "gdpPPP": 89.306,
      "perCapitaPPP": 2714.5,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 2.81
    },
    {
      "year": 2005,
      "gdpPPP": 97.324,
      "perCapitaPPP": 2879.4,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": 2.74
    },
    {
      "year": 2006,
      "gdpPPP": 106.198,
      "perCapitaPPP": 3060.5,
      "perCapitaPPPChangePct": 6.29,
      "popChangePct": 2.66
    },
    {
      "year": 2007,
      "gdpPPP": 116.548,
      "perCapitaPPP": 3264.6,
      "perCapitaPPPChangePct": 6.67,
      "popChangePct": 2.88
    },
    {
      "year": 2008,
      "gdpPPP": 119.069,
      "perCapitaPPP": 3244.4,
      "perCapitaPPPChangePct": -0.62,
      "popChangePct": 2.8
    },
    {
      "year": 2009,
      "gdpPPP": 123.765,
      "perCapitaPPP": 3282.9,
      "perCapitaPPPChangePct": 1.19,
      "popChangePct": 2.72
    },
    {
      "year": 2010,
      "gdpPPP": 135.364,
      "perCapitaPPP": 3506.8,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 2.39
    },
    {
      "year": 2011,
      "gdpPPP": 145.232,
      "perCapitaPPP": 3676.8,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 2.33
    },
    {
      "year": 2012,
      "gdpPPP": 154.695,
      "perCapitaPPP": 3829.1,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 2.28
    },
    {
      "year": 2013,
      "gdpPPP": 163.303,
      "perCapitaPPP": 3944.5,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 2.48
    },
    {
      "year": 2014,
      "gdpPPP": 174.488,
      "perCapitaPPP": 4115.3,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdpPPP": 184.856,
      "perCapitaPPP": 4269.2,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 2.12
    },
    {
      "year": 2016,
      "gdpPPP": 194.475,
      "perCapitaPPP": 4390.0,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 2.31
    },
    {
      "year": 2017,
      "gdpPPP": 205.511,
      "perCapitaPPP": 4526.7,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 2.48
    },
    {
      "year": 2018,
      "gdpPPP": 221.492,
      "perCapitaPPP": 4773.5,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 2.2
    },
    {
      "year": 2019,
      "gdpPPP": 240.007,
      "perCapitaPPP": 5042.2,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 2.59
    },
    {
      "year": 2020,
      "gdpPPP": 250.255,
      "perCapitaPPP": 5128.5,
      "perCapitaPPPChangePct": 1.71,
      "popChangePct": 2.51
    },
    {
      "year": 2021,
      "gdpPPP": 284.129,
      "perCapitaPPP": 5711.5,
      "perCapitaPPPChangePct": 11.37,
      "popChangePct": 1.95
    },
    {
      "year": 2022,
      "gdpPPP": 319.128,
      "perCapitaPPP": 6301.9,
      "perCapitaPPPChangePct": 10.34,
      "popChangePct": 1.8
    },
    {
      "year": 2023,
      "gdpPPP": 349.866,
      "perCapitaPPP": 6788.4,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": 1.78
    },
    {
      "year": 2024,
      "gdpPPP": 375.492,
      "perCapitaPPP": 7159.9,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.76
    },
    {
      "year": 2025,
      "gdpPPP": 404.987,
      "perCapitaPPP": 7590.6,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.74
    },
    {
      "year": 2026,
      "gdpPPP": 435.226,
      "perCapitaPPP": 8019.8,
      "perCapitaPPPChangePct": 5.65,
      "popChangePct": 1.71
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 465.518,
      "perCapitaPPP": 8434.9,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 1.7
    },
    {
      "year": 2028,
      "gdpPPP": 497.106,
      "perCapitaPPP": 8858.9,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 1.68
    },
    {
      "year": 2029,
      "gdpPPP": 531.244,
      "perCapitaPPP": 9313.1,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 1.66
    },
    {
      "year": 2030,
      "gdpPPP": 568.1,
      "perCapitaPPP": 9798.9,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 1.64
    },
    {
      "year": 2031,
      "gdpPPP": 607.363,
      "perCapitaPPP": 10309.6,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 1.61
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function KenyaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
