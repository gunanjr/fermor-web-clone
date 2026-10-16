import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Morocco",
  "slug": "morocco",
  "iso3": "MAR",
  "region": "Africa",
  "rank2026": 60,
  "flagEmoji": "🇲🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Qatar",
      "slug": "qatar",
      "rank": 58
    },
    {
      "name": "Uzbekistan",
      "slug": "uzbekistan",
      "rank": 61
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 23.807,
      "growth": 3.8,
      "perCapita": 1225.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 19.329,
      "growth": -2.8,
      "perCapita": 969.4,
      "popChangePct": 2.6
    },
    {
      "year": 1982,
      "gdp": 19.51,
      "growth": 9.6,
      "perCapita": 953.6,
      "popChangePct": 2.61
    },
    {
      "year": 1983,
      "gdp": 17.635,
      "growth": -0.6,
      "perCapita": 842.0,
      "popChangePct": 2.37
    },
    {
      "year": 1984,
      "gdp": 16.13,
      "growth": 4.3,
      "perCapita": 752.3,
      "popChangePct": 2.37
    },
    {
      "year": 1985,
      "gdp": 16.28,
      "growth": 6.3,
      "perCapita": 741.7,
      "popChangePct": 2.38
    },
    {
      "year": 1986,
      "gdp": 21.497,
      "growth": 8.3,
      "perCapita": 956.7,
      "popChangePct": 2.36
    },
    {
      "year": 1987,
      "gdp": 23.713,
      "growth": -2.5,
      "perCapita": 1030.9,
      "popChangePct": 2.37
    },
    {
      "year": 1988,
      "gdp": 28.08,
      "growth": 10.4,
      "perCapita": 1193.5,
      "popChangePct": 2.29
    },
    {
      "year": 1989,
      "gdp": 28.901,
      "growth": 2.4,
      "perCapita": 1200.5,
      "popChangePct": 2.32
    },
    {
      "year": 1990,
      "gdp": 32.661,
      "growth": 4,
      "perCapita": 1351.5,
      "popChangePct": 0.38
    },
    {
      "year": 1991,
      "gdp": 34.94,
      "growth": 7.5,
      "perCapita": 1418.4,
      "popChangePct": 1.93
    },
    {
      "year": 1992,
      "gdp": 36.483,
      "growth": -2.9,
      "perCapita": 1453.8,
      "popChangePct": 1.87
    },
    {
      "year": 1993,
      "gdp": 34.259,
      "growth": -1,
      "perCapita": 1340.9,
      "popChangePct": 1.81
    },
    {
      "year": 1994,
      "gdp": 38.532,
      "growth": 11.5,
      "perCapita": 1482.2,
      "popChangePct": 1.75
    },
    {
      "year": 1995,
      "gdp": 42.238,
      "growth": -6.3,
      "perCapita": 1600.9,
      "popChangePct": 1.49
    },
    {
      "year": 1996,
      "gdp": 46.71,
      "growth": 13.5,
      "perCapita": 1738.8,
      "popChangePct": 1.82
    },
    {
      "year": 1997,
      "gdp": 42.366,
      "growth": -2,
      "perCapita": 1552.9,
      "popChangePct": 1.56
    },
    {
      "year": 1998,
      "gdp": 45.243,
      "growth": 8,
      "perCapita": 1634.0,
      "popChangePct": 1.49
    },
    {
      "year": 1999,
      "gdp": 45.055,
      "growth": 0.5,
      "perCapita": 1604.3,
      "popChangePct": 1.43
    },
    {
      "year": 2000,
      "gdp": 42.053,
      "growth": 1.6,
      "perCapita": 1477.3,
      "popChangePct": 1.36
    },
    {
      "year": 2001,
      "gdp": 42.704,
      "growth": 7.6,
      "perCapita": 1481.1,
      "popChangePct": 1.29
    },
    {
      "year": 2002,
      "gdp": 45.711,
      "growth": 3.3,
      "perCapita": 1566.2,
      "popChangePct": 1.22
    },
    {
      "year": 2003,
      "gdp": 56.345,
      "growth": 6.3,
      "perCapita": 1908.7,
      "popChangePct": 1.15
    },
    {
      "year": 2004,
      "gdp": 64.528,
      "growth": 4.8,
      "perCapita": 2158.7,
      "popChangePct": 1.26
    },
    {
      "year": 2005,
      "gdp": 67.468,
      "growth": 3,
      "perCapita": 2232.9,
      "popChangePct": 1.08
    },
    {
      "year": 2006,
      "gdp": 74.284,
      "growth": 7.8,
      "perCapita": 2427.1,
      "popChangePct": 1.29
    },
    {
      "year": 2007,
      "gdp": 85.539,
      "growth": 2.7,
      "perCapita": 2759.5,
      "popChangePct": 1.28
    },
    {
      "year": 2008,
      "gdp": 100.112,
      "growth": 5.9,
      "perCapita": 3189.2,
      "popChangePct": 1.27
    },
    {
      "year": 2009,
      "gdp": 100.535,
      "growth": 4.2,
      "perCapita": 3162.9,
      "popChangePct": 1.26
    },
    {
      "year": 2010,
      "gdp": 100.881,
      "growth": 3.8,
      "perCapita": 3134.7,
      "popChangePct": 1.25
    },
    {
      "year": 2011,
      "gdp": 109.705,
      "growth": 5.2,
      "perCapita": 3367.3,
      "popChangePct": 1.23
    },
    {
      "year": 2012,
      "gdp": 106.345,
      "growth": 3,
      "perCapita": 3224.7,
      "popChangePct": 1.22
    },
    {
      "year": 2013,
      "gdp": 115.608,
      "growth": 4.5,
      "perCapita": 3463.6,
      "popChangePct": 1.21
    },
    {
      "year": 2014,
      "gdp": 119.131,
      "growth": 2.7,
      "perCapita": 3519.6,
      "popChangePct": 1.41
    },
    {
      "year": 2015,
      "gdp": 110.414,
      "growth": 4.3,
      "perCapita": 3235.6,
      "popChangePct": 0.82
    },
    {
      "year": 2016,
      "gdp": 111.573,
      "growth": 0.5,
      "perCapita": 3235.2,
      "popChangePct": 1.06
    },
    {
      "year": 2017,
      "gdp": 118.541,
      "growth": 5.1,
      "perCapita": 3401.3,
      "popChangePct": 1.06
    },
    {
      "year": 2018,
      "gdp": 127.341,
      "growth": 3.1,
      "perCapita": 3615.6,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdp": 128.92,
      "growth": 2.9,
      "perCapita": 3622.7,
      "popChangePct": 1.04
    },
    {
      "year": 2020,
      "gdp": 121.354,
      "growth": -7.2,
      "perCapita": 3375.4,
      "popChangePct": 1.03
    },
    {
      "year": 2021,
      "gdp": 142.022,
      "growth": 8.2,
      "perCapita": 3911.1,
      "popChangePct": 1.0
    },
    {
      "year": 2022,
      "gdp": 131.245,
      "growth": 1.8,
      "perCapita": 3579.1,
      "popChangePct": 0.98
    },
    {
      "year": 2023,
      "gdp": 146.057,
      "growth": 3.7,
      "perCapita": 3945.1,
      "popChangePct": 0.96
    },
    {
      "year": 2024,
      "gdp": 160.606,
      "growth": 3.8,
      "perCapita": 4297.7,
      "popChangePct": 0.94
    },
    {
      "year": 2025,
      "gdp": 182.587,
      "growth": 4.9,
      "perCapita": 4841.6,
      "popChangePct": 0.92
    },
    {
      "year": 2026,
      "gdp": 194.333,
      "growth": 4.9,
      "perCapita": 5107.3,
      "popChangePct": 0.9
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 212.837,
      "growth": 4.5,
      "perCapita": 5545.4,
      "popChangePct": 0.87
    },
    {
      "year": 2028,
      "gdp": 227.879,
      "growth": 4.5,
      "perCapita": 5887.4,
      "popChangePct": 0.85
    },
    {
      "year": 2029,
      "gdp": 245.01,
      "growth": 4.4,
      "perCapita": 6278.6,
      "popChangePct": 0.82
    },
    {
      "year": 2030,
      "gdp": 263.232,
      "growth": 4.1,
      "perCapita": 6692.9,
      "popChangePct": 0.79
    },
    {
      "year": 2031,
      "gdp": 283.416,
      "growth": 4,
      "perCapita": 7152.1,
      "popChangePct": 0.76
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 28.679,
      "perCapitaPPP": 1475.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 30.524,
      "perCapitaPPP": 1530.9,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 2.6
    },
    {
      "year": 1982,
      "gdpPPP": 35.528,
      "perCapitaPPP": 1736.5,
      "perCapitaPPPChangePct": 13.43,
      "popChangePct": 2.61
    },
    {
      "year": 1983,
      "gdpPPP": 36.713,
      "perCapitaPPP": 1752.9,
      "perCapitaPPPChangePct": 0.94,
      "popChangePct": 2.37
    },
    {
      "year": 1984,
      "gdpPPP": 39.688,
      "perCapitaPPP": 1851.0,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 2.37
    },
    {
      "year": 1985,
      "gdpPPP": 43.532,
      "perCapitaPPP": 1983.2,
      "perCapitaPPPChangePct": 7.14,
      "popChangePct": 2.38
    },
    {
      "year": 1986,
      "gdpPPP": 48.095,
      "perCapitaPPP": 2140.5,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 2.36
    },
    {
      "year": 1987,
      "gdpPPP": 48.033,
      "perCapitaPPP": 2088.2,
      "perCapitaPPPChangePct": -2.44,
      "popChangePct": 2.37
    },
    {
      "year": 1988,
      "gdpPPP": 54.905,
      "perCapitaPPP": 2333.6,
      "perCapitaPPPChangePct": 11.75,
      "popChangePct": 2.29
    },
    {
      "year": 1989,
      "gdpPPP": 58.408,
      "perCapitaPPP": 2426.2,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 2.32
    },
    {
      "year": 1990,
      "gdpPPP": 63.039,
      "perCapitaPPP": 2608.5,
      "perCapitaPPPChangePct": 7.52,
      "popChangePct": 0.38
    },
    {
      "year": 1991,
      "gdpPPP": 70.09,
      "perCapitaPPP": 2845.2,
      "perCapitaPPPChangePct": 9.08,
      "popChangePct": 1.93
    },
    {
      "year": 1992,
      "gdpPPP": 69.603,
      "perCapitaPPP": 2773.6,
      "perCapitaPPPChangePct": -2.52,
      "popChangePct": 1.87
    },
    {
      "year": 1993,
      "gdpPPP": 70.538,
      "perCapitaPPP": 2760.9,
      "perCapitaPPPChangePct": -0.46,
      "popChangePct": 1.81
    },
    {
      "year": 1994,
      "gdpPPP": 80.325,
      "perCapitaPPP": 3089.9,
      "perCapitaPPPChangePct": 11.92,
      "popChangePct": 1.75
    },
    {
      "year": 1995,
      "gdpPPP": 76.819,
      "perCapitaPPP": 2911.6,
      "perCapitaPPPChangePct": -5.77,
      "popChangePct": 1.49
    },
    {
      "year": 1996,
      "gdpPPP": 88.754,
      "perCapitaPPP": 3303.8,
      "perCapitaPPPChangePct": 13.47,
      "popChangePct": 1.82
    },
    {
      "year": 1997,
      "gdpPPP": 88.468,
      "perCapitaPPP": 3242.7,
      "perCapitaPPPChangePct": -1.85,
      "popChangePct": 1.56
    },
    {
      "year": 1998,
      "gdpPPP": 96.601,
      "perCapitaPPP": 3488.8,
      "perCapitaPPPChangePct": 7.59,
      "popChangePct": 1.49
    },
    {
      "year": 1999,
      "gdpPPP": 98.487,
      "perCapitaPPP": 3506.9,
      "perCapitaPPPChangePct": 0.52,
      "popChangePct": 1.43
    },
    {
      "year": 2000,
      "gdpPPP": 102.322,
      "perCapitaPPP": 3594.5,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 1.36
    },
    {
      "year": 2001,
      "gdpPPP": 112.527,
      "perCapitaPPP": 3902.7,
      "perCapitaPPPChangePct": 8.57,
      "popChangePct": 1.29
    },
    {
      "year": 2002,
      "gdpPPP": 118.065,
      "perCapitaPPP": 4045.4,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 1.22
    },
    {
      "year": 2003,
      "gdpPPP": 128.001,
      "perCapitaPPP": 4336.1,
      "perCapitaPPPChangePct": 7.19,
      "popChangePct": 1.15
    },
    {
      "year": 2004,
      "gdpPPP": 137.755,
      "perCapitaPPP": 4608.4,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 1.26
    },
    {
      "year": 2005,
      "gdpPPP": 146.306,
      "perCapitaPPP": 4842.2,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 1.08
    },
    {
      "year": 2006,
      "gdpPPP": 162.521,
      "perCapitaPPP": 5310.1,
      "perCapitaPPPChangePct": 9.66,
      "popChangePct": 1.29
    },
    {
      "year": 2007,
      "gdpPPP": 171.441,
      "perCapitaPPP": 5530.7,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 1.28
    },
    {
      "year": 2008,
      "gdpPPP": 185.094,
      "perCapitaPPP": 5896.4,
      "perCapitaPPPChangePct": 6.61,
      "popChangePct": 1.27
    },
    {
      "year": 2009,
      "gdpPPP": 194.139,
      "perCapitaPPP": 6107.7,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 1.26
    },
    {
      "year": 2010,
      "gdpPPP": 203.996,
      "perCapitaPPP": 6338.8,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 1.25
    },
    {
      "year": 2011,
      "gdpPPP": 219.127,
      "perCapitaPPP": 6726.0,
      "perCapitaPPPChangePct": 6.11,
      "popChangePct": 1.23
    },
    {
      "year": 2012,
      "gdpPPP": 229.926,
      "perCapitaPPP": 6972.1,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 1.22
    },
    {
      "year": 2013,
      "gdpPPP": 244.445,
      "perCapitaPPP": 7323.5,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 1.21
    },
    {
      "year": 2014,
      "gdpPPP": 255.341,
      "perCapitaPPP": 7543.8,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 1.41
    },
    {
      "year": 2015,
      "gdpPPP": 268.907,
      "perCapitaPPP": 7880.1,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 0.82
    },
    {
      "year": 2016,
      "gdpPPP": 272.877,
      "perCapitaPPP": 7912.5,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 1.06
    },
    {
      "year": 2017,
      "gdpPPP": 291.814,
      "perCapitaPPP": 8372.9,
      "perCapitaPPPChangePct": 5.82,
      "popChangePct": 1.06
    },
    {
      "year": 2018,
      "gdpPPP": 283.691,
      "perCapitaPPP": 8054.8,
      "perCapitaPPPChangePct": -3.8,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdpPPP": 295.694,
      "perCapitaPPP": 8309.0,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 1.04
    },
    {
      "year": 2020,
      "gdpPPP": 286.109,
      "perCapitaPPP": 7958.1,
      "perCapitaPPPChangePct": -4.22,
      "popChangePct": 1.03
    },
    {
      "year": 2021,
      "gdpPPP": 323.485,
      "perCapitaPPP": 8908.2,
      "perCapitaPPPChangePct": 11.94,
      "popChangePct": 1.0
    },
    {
      "year": 2022,
      "gdpPPP": 352.774,
      "perCapitaPPP": 9620.2,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 0.98
    },
    {
      "year": 2023,
      "gdpPPP": 379.2,
      "perCapitaPPP": 10242.5,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 0.96
    },
    {
      "year": 2024,
      "gdpPPP": 403.355,
      "perCapitaPPP": 10793.5,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.94
    },
    {
      "year": 2025,
      "gdpPPP": 435.122,
      "perCapitaPPP": 11538.0,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": 0.92
    },
    {
      "year": 2026,
      "gdpPPP": 469.394,
      "perCapitaPPP": 12336.2,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 0.9
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 501.288,
      "perCapitaPPP": 13060.8,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 0.87
    },
    {
      "year": 2028,
      "gdpPPP": 532.437,
      "perCapitaPPP": 13755.9,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 0.85
    },
    {
      "year": 2029,
      "gdpPPP": 565.755,
      "perCapitaPPP": 14498.0,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 0.82
    },
    {
      "year": 2030,
      "gdpPPP": 599.779,
      "perCapitaPPP": 15249.9,
      "perCapitaPPPChangePct": 5.19,
      "popChangePct": 0.79
    },
    {
      "year": 2031,
      "gdpPPP": 635.059,
      "perCapitaPPP": 16025.9,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 0.76
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MoroccoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
