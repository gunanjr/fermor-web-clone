import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Malaysia",
  "slug": "malaysia",
  "iso3": "MYS",
  "region": "Asia",
  "rank2026": 35,
  "flagEmoji": "🇲🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Vietnam",
      "slug": "vietnam",
      "rank": 34
    },
    {
      "name": "Philippines",
      "slug": "philippines",
      "rank": 36
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 26.757,
      "growth": 7.4,
      "perCapita": 1927.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 27.321,
      "growth": 6.9,
      "perCapita": 1920.1,
      "popChangePct": 2.48
    },
    {
      "year": 1982,
      "gdp": 29.278,
      "growth": 5.9,
      "perCapita": 2006.5,
      "popChangePct": 2.55
    },
    {
      "year": 1983,
      "gdp": 32.745,
      "growth": 6.3,
      "perCapita": 2189.6,
      "popChangePct": 2.49
    },
    {
      "year": 1984,
      "gdp": 37.087,
      "growth": 7.8,
      "perCapita": 2419.5,
      "popChangePct": 2.49
    },
    {
      "year": 1985,
      "gdp": 34.09,
      "growth": -0.9,
      "perCapita": 2154.5,
      "popChangePct": 3.23
    },
    {
      "year": 1986,
      "gdp": 30.303,
      "growth": 1.2,
      "perCapita": 1864.0,
      "popChangePct": 2.74
    },
    {
      "year": 1987,
      "gdp": 34.529,
      "growth": 5.4,
      "perCapita": 2070.0,
      "popChangePct": 2.61
    },
    {
      "year": 1988,
      "gdp": 37.845,
      "growth": 9.9,
      "perCapita": 2213.9,
      "popChangePct": 2.48
    },
    {
      "year": 1989,
      "gdp": 41.678,
      "growth": 9.1,
      "perCapita": 2380.5,
      "popChangePct": 2.42
    },
    {
      "year": 1990,
      "gdp": 47.245,
      "growth": 9,
      "perCapita": 2586.3,
      "popChangePct": 4.34
    },
    {
      "year": 1991,
      "gdp": 53.519,
      "growth": 9.5,
      "perCapita": 2885.6,
      "popChangePct": 1.53
    },
    {
      "year": 1992,
      "gdp": 64.427,
      "growth": 8.9,
      "perCapita": 3378.9,
      "popChangePct": 2.81
    },
    {
      "year": 1993,
      "gdp": 72.857,
      "growth": 9.9,
      "perCapita": 3716.9,
      "popChangePct": 2.8
    },
    {
      "year": 1994,
      "gdp": 81.156,
      "growth": 9.2,
      "perCapita": 4029.3,
      "popChangePct": 2.75
    },
    {
      "year": 1995,
      "gdp": 96.606,
      "growth": 9.8,
      "perCapita": 4671.1,
      "popChangePct": 2.68
    },
    {
      "year": 1996,
      "gdp": 109.846,
      "growth": 10,
      "perCapita": 5175.9,
      "popChangePct": 2.62
    },
    {
      "year": 1997,
      "gdp": 109.116,
      "growth": 7.3,
      "perCapita": 5012.4,
      "popChangePct": 2.57
    },
    {
      "year": 1998,
      "gdp": 78.639,
      "growth": -7.4,
      "perCapita": 3521.1,
      "popChangePct": 2.6
    },
    {
      "year": 1999,
      "gdp": 86.203,
      "growth": 6.1,
      "perCapita": 3762.8,
      "popChangePct": 2.58
    },
    {
      "year": 2000,
      "gdp": 102.149,
      "growth": 8.7,
      "perCapita": 4347.7,
      "popChangePct": 2.55
    },
    {
      "year": 2001,
      "gdp": 101.054,
      "growth": 0.5,
      "perCapita": 4189.1,
      "popChangePct": 2.67
    },
    {
      "year": 2002,
      "gdp": 109.833,
      "growth": 5.4,
      "perCapita": 4441.8,
      "popChangePct": 2.5
    },
    {
      "year": 2003,
      "gdp": 120.025,
      "growth": 5.8,
      "perCapita": 4740.3,
      "popChangePct": 2.4
    },
    {
      "year": 2004,
      "gdp": 135.869,
      "growth": 6.8,
      "perCapita": 5244.9,
      "popChangePct": 2.31
    },
    {
      "year": 2005,
      "gdp": 150.345,
      "growth": 5,
      "perCapita": 5678.3,
      "popChangePct": 2.21
    },
    {
      "year": 2006,
      "gdp": 170.41,
      "growth": 5.6,
      "perCapita": 6351.1,
      "popChangePct": 1.34
    },
    {
      "year": 2007,
      "gdp": 202.733,
      "growth": 6.3,
      "perCapita": 7480.9,
      "popChangePct": 1.0
    },
    {
      "year": 2008,
      "gdp": 241.947,
      "growth": 4.8,
      "perCapita": 8766.2,
      "popChangePct": 1.85
    },
    {
      "year": 2009,
      "gdp": 211.847,
      "growth": -1.5,
      "perCapita": 7543.9,
      "popChangePct": 1.75
    },
    {
      "year": 2010,
      "gdp": 258.641,
      "growth": 7.5,
      "perCapita": 9047.0,
      "popChangePct": 1.81
    },
    {
      "year": 2011,
      "gdp": 302.184,
      "growth": 5.3,
      "perCapita": 10397.9,
      "popChangePct": 1.65
    },
    {
      "year": 2012,
      "gdp": 318.91,
      "growth": 5.5,
      "perCapita": 10806.8,
      "popChangePct": 1.54
    },
    {
      "year": 2013,
      "gdp": 327.869,
      "growth": 4.7,
      "perCapita": 10851.7,
      "popChangePct": 2.39
    },
    {
      "year": 2014,
      "gdp": 342.868,
      "growth": 6,
      "perCapita": 11165.3,
      "popChangePct": 1.64
    },
    {
      "year": 2015,
      "gdp": 301.355,
      "growth": 5,
      "perCapita": 9663.1,
      "popChangePct": 1.55
    },
    {
      "year": 2016,
      "gdp": 301.256,
      "growth": 4.4,
      "perCapita": 9523.3,
      "popChangePct": 1.44
    },
    {
      "year": 2017,
      "gdp": 319.109,
      "growth": 5.8,
      "perCapita": 9965.1,
      "popChangePct": 1.23
    },
    {
      "year": 2018,
      "gdp": 358.783,
      "growth": 4.8,
      "perCapita": 11079.6,
      "popChangePct": 1.12
    },
    {
      "year": 2019,
      "gdp": 365.178,
      "growth": 4.4,
      "perCapita": 11228.3,
      "popChangePct": 0.44
    },
    {
      "year": 2020,
      "gdp": 337.456,
      "growth": -5.5,
      "perCapita": 10400.2,
      "popChangePct": -0.23
    },
    {
      "year": 2021,
      "gdp": 373.785,
      "growth": 3.3,
      "perCapita": 11474.2,
      "popChangePct": 0.4
    },
    {
      "year": 2022,
      "gdp": 407.83,
      "growth": 9,
      "perCapita": 12490.2,
      "popChangePct": 0.23
    },
    {
      "year": 2023,
      "gdp": 399.949,
      "growth": 3.5,
      "perCapita": 12098.0,
      "popChangePct": 1.25
    },
    {
      "year": 2024,
      "gdp": 422.227,
      "growth": 5.1,
      "perCapita": 12618.7,
      "popChangePct": 1.21
    },
    {
      "year": 2025,
      "gdp": 472.193,
      "growth": 5.2,
      "perCapita": 13948.7,
      "popChangePct": 1.17
    },
    {
      "year": 2026,
      "gdp": 516.428,
      "growth": 4.7,
      "perCapita": 15085.4,
      "popChangePct": 1.13
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 552.855,
      "growth": 4.3,
      "perCapita": 15975.7,
      "popChangePct": 1.09
    },
    {
      "year": 2028,
      "gdp": 591.087,
      "growth": 4.3,
      "perCapita": 16903.6,
      "popChangePct": 1.05
    },
    {
      "year": 2029,
      "gdp": 630.528,
      "growth": 4.3,
      "perCapita": 17852.2,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdp": 672.494,
      "growth": 4.3,
      "perCapita": 18859.2,
      "popChangePct": 0.96
    },
    {
      "year": 2031,
      "gdp": 716.446,
      "growth": 4.3,
      "perCapita": 19909.1,
      "popChangePct": 0.92
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 42.296,
      "perCapitaPPP": 3046.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 49.511,
      "perCapitaPPP": 3479.7,
      "perCapitaPPPChangePct": 14.24,
      "popChangePct": 2.48
    },
    {
      "year": 1982,
      "gdpPPP": 55.694,
      "perCapitaPPP": 3816.8,
      "perCapitaPPPChangePct": 9.69,
      "popChangePct": 2.55
    },
    {
      "year": 1983,
      "gdpPPP": 61.492,
      "perCapitaPPP": 4111.8,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 2.49
    },
    {
      "year": 1984,
      "gdpPPP": 68.657,
      "perCapitaPPP": 4479.0,
      "perCapitaPPPChangePct": 8.93,
      "popChangePct": 2.49
    },
    {
      "year": 1985,
      "gdpPPP": 70.208,
      "perCapitaPPP": 4437.1,
      "perCapitaPPPChangePct": -0.94,
      "popChangePct": 3.23
    },
    {
      "year": 1986,
      "gdpPPP": 72.447,
      "perCapitaPPP": 4456.4,
      "perCapitaPPPChangePct": 0.43,
      "popChangePct": 2.74
    },
    {
      "year": 1987,
      "gdpPPP": 78.242,
      "perCapitaPPP": 4690.6,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": 2.61
    },
    {
      "year": 1988,
      "gdpPPP": 89.051,
      "perCapitaPPP": 5209.4,
      "perCapitaPPPChangePct": 11.06,
      "popChangePct": 2.48
    },
    {
      "year": 1989,
      "gdpPPP": 100.928,
      "perCapitaPPP": 5764.6,
      "perCapitaPPPChangePct": 10.66,
      "popChangePct": 2.42
    },
    {
      "year": 1990,
      "gdpPPP": 114.136,
      "perCapitaPPP": 6248.1,
      "perCapitaPPPChangePct": 8.39,
      "popChangePct": 4.34
    },
    {
      "year": 1991,
      "gdpPPP": 129.262,
      "perCapitaPPP": 6969.4,
      "perCapitaPPPChangePct": 11.54,
      "popChangePct": 1.53
    },
    {
      "year": 1992,
      "gdpPPP": 143.956,
      "perCapitaPPP": 7549.8,
      "perCapitaPPPChangePct": 8.33,
      "popChangePct": 2.81
    },
    {
      "year": 1993,
      "gdpPPP": 161.951,
      "perCapitaPPP": 8262.2,
      "perCapitaPPPChangePct": 9.44,
      "popChangePct": 2.8
    },
    {
      "year": 1994,
      "gdpPPP": 180.646,
      "perCapitaPPP": 8968.7,
      "perCapitaPPPChangePct": 8.55,
      "popChangePct": 2.75
    },
    {
      "year": 1995,
      "gdpPPP": 202.562,
      "perCapitaPPP": 9794.2,
      "perCapitaPPPChangePct": 9.2,
      "popChangePct": 2.68
    },
    {
      "year": 1996,
      "gdpPPP": 226.902,
      "perCapitaPPP": 10691.5,
      "perCapitaPPPChangePct": 9.16,
      "popChangePct": 2.62
    },
    {
      "year": 1997,
      "gdpPPP": 247.727,
      "perCapitaPPP": 11379.7,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 2.57
    },
    {
      "year": 1998,
      "gdpPPP": 232.077,
      "perCapitaPPP": 10391.4,
      "perCapitaPPPChangePct": -8.68,
      "popChangePct": 2.6
    },
    {
      "year": 1999,
      "gdpPPP": 249.791,
      "perCapitaPPP": 10903.4,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 2.58
    },
    {
      "year": 2000,
      "gdpPPP": 277.599,
      "perCapitaPPP": 11815.3,
      "perCapitaPPPChangePct": 8.36,
      "popChangePct": 2.55
    },
    {
      "year": 2001,
      "gdpPPP": 285.318,
      "perCapitaPPP": 11827.4,
      "perCapitaPPPChangePct": 0.1,
      "popChangePct": 2.67
    },
    {
      "year": 2002,
      "gdpPPP": 305.373,
      "perCapitaPPP": 12349.7,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 2.5
    },
    {
      "year": 2003,
      "gdpPPP": 329.428,
      "perCapitaPPP": 13010.6,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 2.4
    },
    {
      "year": 2004,
      "gdpPPP": 361.231,
      "perCapitaPPP": 13944.4,
      "perCapitaPPPChangePct": 7.18,
      "popChangePct": 2.31
    },
    {
      "year": 2005,
      "gdpPPP": 391.097,
      "perCapitaPPP": 14771.2,
      "perCapitaPPPChangePct": 5.93,
      "popChangePct": 2.21
    },
    {
      "year": 2006,
      "gdpPPP": 425.672,
      "perCapitaPPP": 15864.6,
      "perCapitaPPPChangePct": 7.4,
      "popChangePct": 1.34
    },
    {
      "year": 2007,
      "gdpPPP": 464.744,
      "perCapitaPPP": 17149.2,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 1.0
    },
    {
      "year": 2008,
      "gdpPPP": 496.587,
      "perCapitaPPP": 17992.3,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 1.85
    },
    {
      "year": 2009,
      "gdpPPP": 492.086,
      "perCapitaPPP": 17523.2,
      "perCapitaPPPChangePct": -2.61,
      "popChangePct": 1.75
    },
    {
      "year": 2010,
      "gdpPPP": 535.561,
      "perCapitaPPP": 18733.4,
      "perCapitaPPPChangePct": 6.91,
      "popChangePct": 1.81
    },
    {
      "year": 2011,
      "gdpPPP": 575.545,
      "perCapitaPPP": 19804.1,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.65
    },
    {
      "year": 2012,
      "gdpPPP": 618.352,
      "perCapitaPPP": 20954.0,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 1.54
    },
    {
      "year": 2013,
      "gdpPPP": 658.393,
      "perCapitaPPP": 21791.2,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 2.39
    },
    {
      "year": 2014,
      "gdpPPP": 710.097,
      "perCapitaPPP": 23123.8,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": 1.64
    },
    {
      "year": 2015,
      "gdpPPP": 752.573,
      "perCapitaPPP": 24131.7,
      "perCapitaPPPChangePct": 4.36,
      "popChangePct": 1.55
    },
    {
      "year": 2016,
      "gdpPPP": 793.531,
      "perCapitaPPP": 25085.1,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 1.44
    },
    {
      "year": 2017,
      "gdpPPP": 854.694,
      "perCapitaPPP": 26690.3,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 1.23
    },
    {
      "year": 2018,
      "gdpPPP": 914.713,
      "perCapitaPPP": 28247.3,
      "perCapitaPPPChangePct": 5.83,
      "popChangePct": 1.12
    },
    {
      "year": 2019,
      "gdpPPP": 967.568,
      "perCapitaPPP": 29750.3,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 0.44
    },
    {
      "year": 2020,
      "gdpPPP": 931.107,
      "perCapitaPPP": 28696.2,
      "perCapitaPPPChangePct": -3.54,
      "popChangePct": -0.23
    },
    {
      "year": 2021,
      "gdpPPP": 1022.399,
      "perCapitaPPP": 31385.0,
      "perCapitaPPPChangePct": 9.37,
      "popChangePct": 0.4
    },
    {
      "year": 2022,
      "gdpPPP": 1194.024,
      "perCapitaPPP": 36568.2,
      "perCapitaPPPChangePct": 16.51,
      "popChangePct": 0.23
    },
    {
      "year": 2023,
      "gdpPPP": 1281.999,
      "perCapitaPPP": 38779.0,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 1.25
    },
    {
      "year": 2024,
      "gdpPPP": 1380.902,
      "perCapitaPPP": 41269.8,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 1.21
    },
    {
      "year": 2025,
      "gdpPPP": 1493.511,
      "perCapitaPPP": 44118.8,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": 1.17
    },
    {
      "year": 2026,
      "gdpPPP": 1608.504,
      "perCapitaPPP": 46986.0,
      "perCapitaPPPChangePct": 6.5,
      "popChangePct": 1.13
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1714.51,
      "perCapitaPPP": 49543.7,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 1.09
    },
    {
      "year": 2028,
      "gdpPPP": 1817.586,
      "perCapitaPPP": 51978.2,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 1.05
    },
    {
      "year": 2029,
      "gdpPPP": 1929.45,
      "perCapitaPPP": 54628.8,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdpPPP": 2049.395,
      "perCapitaPPP": 57472.6,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 0.96
    },
    {
      "year": 2031,
      "gdpPPP": 2176.108,
      "perCapitaPPP": 60471.2,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 0.92
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MalaysiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
