import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Papua New Guinea",
  "slug": "papua-new-guinea",
  "iso3": "PNG",
  "region": "Oceania",
  "rank2026": 116,
  "flagEmoji": "🇵🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Lebanon",
      "slug": "lebanon",
      "rank": 115
    },
    {
      "name": "Guyana",
      "slug": "guyana",
      "rank": 117
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.087,
      "growth": -2.3,
      "perCapita": 1380.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.011,
      "growth": 1.1,
      "perCapita": 1319.4,
      "popChangePct": 2.7
    },
    {
      "year": 1982,
      "gdp": 3.805,
      "growth": 0.8,
      "perCapita": 1223.4,
      "popChangePct": 2.3
    },
    {
      "year": 1983,
      "gdp": 3.799,
      "growth": 3.4,
      "perCapita": 1194.7,
      "popChangePct": 2.25
    },
    {
      "year": 1984,
      "gdp": 3.509,
      "growth": -1,
      "perCapita": 1079.6,
      "popChangePct": 2.2
    },
    {
      "year": 1985,
      "gdp": 3.25,
      "growth": 3.6,
      "perCapita": 976.0,
      "popChangePct": 2.46
    },
    {
      "year": 1986,
      "gdp": 3.535,
      "growth": 5.7,
      "perCapita": 1039.8,
      "popChangePct": 2.1
    },
    {
      "year": 1987,
      "gdp": 3.885,
      "growth": 2.8,
      "perCapita": 1159.8,
      "popChangePct": -1.47
    },
    {
      "year": 1988,
      "gdp": 5.4,
      "growth": 2.9,
      "perCapita": 1565.2,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdp": 5.238,
      "growth": -1.4,
      "perCapita": 1455.0,
      "popChangePct": 4.35
    },
    {
      "year": 1990,
      "gdp": 4.757,
      "growth": -3.1,
      "perCapita": 1265.9,
      "popChangePct": 4.39
    },
    {
      "year": 1991,
      "gdp": 5.596,
      "growth": 9.6,
      "perCapita": 1444.1,
      "popChangePct": 3.11
    },
    {
      "year": 1992,
      "gdp": 6.466,
      "growth": 13.8,
      "perCapita": 1546.6,
      "popChangePct": 7.9
    },
    {
      "year": 1993,
      "gdp": 7.349,
      "growth": 13.3,
      "perCapita": 1713.7,
      "popChangePct": 2.56
    },
    {
      "year": 1994,
      "gdp": 8.077,
      "growth": 10.5,
      "perCapita": 1835.0,
      "popChangePct": 2.64
    },
    {
      "year": 1995,
      "gdp": 7.149,
      "growth": -3.4,
      "perCapita": 1581.6,
      "popChangePct": 2.7
    },
    {
      "year": 1996,
      "gdp": 7.608,
      "growth": 6.6,
      "perCapita": 1639.8,
      "popChangePct": 2.65
    },
    {
      "year": 1997,
      "gdp": 7.272,
      "growth": -6.3,
      "perCapita": 1527.4,
      "popChangePct": 2.61
    },
    {
      "year": 1998,
      "gdp": 5.558,
      "growth": 4.7,
      "perCapita": 1138.4,
      "popChangePct": 2.56
    },
    {
      "year": 1999,
      "gdp": 5.072,
      "growth": 1.9,
      "perCapita": 1013.2,
      "popChangePct": 2.52
    },
    {
      "year": 2000,
      "gdp": 5.169,
      "growth": -2.5,
      "perCapita": 1007.5,
      "popChangePct": 2.48
    },
    {
      "year": 2001,
      "gdp": 4.531,
      "growth": -0.1,
      "perCapita": 862.1,
      "popChangePct": 2.46
    },
    {
      "year": 2002,
      "gdp": 4.387,
      "growth": -0.2,
      "perCapita": 814.7,
      "popChangePct": 2.44
    },
    {
      "year": 2003,
      "gdp": 5.488,
      "growth": 9,
      "perCapita": 995.3,
      "popChangePct": 2.43
    },
    {
      "year": 2004,
      "gdp": 6.279,
      "growth": 0.6,
      "perCapita": 1111.9,
      "popChangePct": 2.39
    },
    {
      "year": 2005,
      "gdp": 7.339,
      "growth": 4.3,
      "perCapita": 1269.5,
      "popChangePct": 2.37
    },
    {
      "year": 2006,
      "gdp": 8.355,
      "growth": 2.5,
      "perCapita": 1411.9,
      "popChangePct": 2.35
    },
    {
      "year": 2007,
      "gdp": 9.545,
      "growth": 7.8,
      "perCapita": 1576.2,
      "popChangePct": 2.35
    },
    {
      "year": 2008,
      "gdp": 11.671,
      "growth": -0.3,
      "perCapita": 1883.5,
      "popChangePct": 2.31
    },
    {
      "year": 2009,
      "gdp": 11.619,
      "growth": 6.8,
      "perCapita": 1833.1,
      "popChangePct": 2.31
    },
    {
      "year": 2010,
      "gdp": 14.251,
      "growth": 10.1,
      "perCapita": 2114.9,
      "popChangePct": 6.29
    },
    {
      "year": 2011,
      "gdp": 17.985,
      "growth": 1.1,
      "perCapita": 2479.2,
      "popChangePct": 7.66
    },
    {
      "year": 2012,
      "gdp": 21.295,
      "growth": 4.7,
      "perCapita": 2796.5,
      "popChangePct": 4.98
    },
    {
      "year": 2013,
      "gdp": 21.261,
      "growth": 3.8,
      "perCapita": 2659.9,
      "popChangePct": 4.96
    },
    {
      "year": 2014,
      "gdp": 23.211,
      "growth": 13.5,
      "perCapita": 2766.3,
      "popChangePct": 4.97
    },
    {
      "year": 2015,
      "gdp": 21.723,
      "growth": 6.6,
      "perCapita": 2466.5,
      "popChangePct": 4.97
    },
    {
      "year": 2016,
      "gdp": 20.759,
      "growth": 5.5,
      "perCapita": 2245.4,
      "popChangePct": 4.97
    },
    {
      "year": 2017,
      "gdp": 22.743,
      "growth": 3.5,
      "perCapita": 2343.6,
      "popChangePct": 4.96
    },
    {
      "year": 2018,
      "gdp": 24.11,
      "growth": -0.3,
      "perCapita": 2366.8,
      "popChangePct": 4.97
    },
    {
      "year": 2019,
      "gdp": 24.751,
      "growth": 4.5,
      "perCapita": 2314.7,
      "popChangePct": 4.98
    },
    {
      "year": 2020,
      "gdp": 23.848,
      "growth": -3.2,
      "perCapita": 2124.8,
      "popChangePct": 4.97
    },
    {
      "year": 2021,
      "gdp": 26.113,
      "growth": -0.5,
      "perCapita": 2216.5,
      "popChangePct": 4.97
    },
    {
      "year": 2022,
      "gdp": 31.653,
      "growth": 5.7,
      "perCapita": 2631.4,
      "popChangePct": 2.1
    },
    {
      "year": 2023,
      "gdp": 30.729,
      "growth": 3.8,
      "perCapita": 2502.0,
      "popChangePct": 2.1
    },
    {
      "year": 2024,
      "gdp": 30.756,
      "growth": 3.9,
      "perCapita": 2452.7,
      "popChangePct": 2.09
    },
    {
      "year": 2025,
      "gdp": 32.491,
      "growth": 5.6,
      "perCapita": 2537.8,
      "popChangePct": 2.11
    },
    {
      "year": 2026,
      "gdp": 34.403,
      "growth": 3.8,
      "perCapita": 2631.9,
      "popChangePct": 2.1
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 34.978,
      "growth": 3.8,
      "perCapita": 2620.8,
      "popChangePct": 2.1
    },
    {
      "year": 2028,
      "gdp": 36.655,
      "growth": 3.2,
      "perCapita": 2690.0,
      "popChangePct": 2.1
    },
    {
      "year": 2029,
      "gdp": 38.349,
      "growth": 3.1,
      "perCapita": 2756.4,
      "popChangePct": 2.11
    },
    {
      "year": 2030,
      "gdp": 40.312,
      "growth": 3.1,
      "perCapita": 2837.9,
      "popChangePct": 2.1
    },
    {
      "year": 2031,
      "gdp": 42.785,
      "growth": 3.1,
      "perCapita": 2950.1,
      "popChangePct": 2.1
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 3.179,
      "perCapitaPPP": 1074.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.52,
      "perCapitaPPP": 1157.8,
      "perCapitaPPPChangePct": 7.81,
      "popChangePct": 2.7
    },
    {
      "year": 1982,
      "gdpPPP": 3.768,
      "perCapitaPPP": 1211.7,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 2.3
    },
    {
      "year": 1983,
      "gdpPPP": 4.051,
      "perCapitaPPP": 1273.8,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": 2.25
    },
    {
      "year": 1984,
      "gdpPPP": 4.156,
      "perCapitaPPP": 1278.6,
      "perCapitaPPPChangePct": 0.38,
      "popChangePct": 2.2
    },
    {
      "year": 1985,
      "gdpPPP": 4.44,
      "perCapitaPPP": 1333.4,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 2.46
    },
    {
      "year": 1986,
      "gdpPPP": 4.786,
      "perCapitaPPP": 1407.6,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 2.1
    },
    {
      "year": 1987,
      "gdpPPP": 5.04,
      "perCapitaPPP": 1504.4,
      "perCapitaPPPChangePct": 6.88,
      "popChangePct": -1.47
    },
    {
      "year": 1988,
      "gdpPPP": 5.369,
      "perCapitaPPP": 1556.3,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdpPPP": 5.5,
      "perCapitaPPP": 1527.9,
      "perCapitaPPPChangePct": -1.83,
      "popChangePct": 4.35
    },
    {
      "year": 1990,
      "gdpPPP": 5.528,
      "perCapitaPPP": 1470.8,
      "perCapitaPPPChangePct": -3.74,
      "popChangePct": 4.39
    },
    {
      "year": 1991,
      "gdpPPP": 6.261,
      "perCapitaPPP": 1615.9,
      "perCapitaPPPChangePct": 9.87,
      "popChangePct": 3.11
    },
    {
      "year": 1992,
      "gdpPPP": 7.29,
      "perCapitaPPP": 1743.6,
      "perCapitaPPPChangePct": 7.9,
      "popChangePct": 7.9
    },
    {
      "year": 1993,
      "gdpPPP": 8.457,
      "perCapitaPPP": 1972.1,
      "perCapitaPPPChangePct": 13.11,
      "popChangePct": 2.56
    },
    {
      "year": 1994,
      "gdpPPP": 9.544,
      "perCapitaPPP": 2168.4,
      "perCapitaPPPChangePct": 9.95,
      "popChangePct": 2.64
    },
    {
      "year": 1995,
      "gdpPPP": 9.409,
      "perCapitaPPP": 2081.5,
      "perCapitaPPPChangePct": -4.01,
      "popChangePct": 2.7
    },
    {
      "year": 1996,
      "gdpPPP": 10.213,
      "perCapitaPPP": 2201.2,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": 2.65
    },
    {
      "year": 1997,
      "gdpPPP": 9.73,
      "perCapitaPPP": 2043.8,
      "perCapitaPPPChangePct": -7.15,
      "popChangePct": 2.61
    },
    {
      "year": 1998,
      "gdpPPP": 10.3,
      "perCapitaPPP": 2109.5,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 2.56
    },
    {
      "year": 1999,
      "gdpPPP": 10.64,
      "perCapitaPPP": 2125.4,
      "perCapitaPPPChangePct": 0.76,
      "popChangePct": 2.52
    },
    {
      "year": 2000,
      "gdpPPP": 10.609,
      "perCapitaPPP": 2068.1,
      "perCapitaPPPChangePct": -2.7,
      "popChangePct": 2.48
    },
    {
      "year": 2001,
      "gdpPPP": 10.835,
      "perCapitaPPP": 2061.4,
      "perCapitaPPPChangePct": -0.32,
      "popChangePct": 2.46
    },
    {
      "year": 2002,
      "gdpPPP": 10.986,
      "perCapitaPPP": 2040.4,
      "perCapitaPPPChangePct": -1.02,
      "popChangePct": 2.44
    },
    {
      "year": 2003,
      "gdpPPP": 12.216,
      "perCapitaPPP": 2215.3,
      "perCapitaPPPChangePct": 8.57,
      "popChangePct": 2.43
    },
    {
      "year": 2004,
      "gdpPPP": 12.617,
      "perCapitaPPP": 2234.4,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 2.39
    },
    {
      "year": 2005,
      "gdpPPP": 13.566,
      "perCapitaPPP": 2346.6,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 2.37
    },
    {
      "year": 2006,
      "gdpPPP": 14.339,
      "perCapitaPPP": 2423.2,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 2.35
    },
    {
      "year": 2007,
      "gdpPPP": 15.879,
      "perCapitaPPP": 2622.0,
      "perCapitaPPPChangePct": 8.21,
      "popChangePct": 2.35
    },
    {
      "year": 2008,
      "gdpPPP": 16.137,
      "perCapitaPPP": 2604.2,
      "perCapitaPPPChangePct": -0.68,
      "popChangePct": 2.31
    },
    {
      "year": 2009,
      "gdpPPP": 17.34,
      "perCapitaPPP": 2735.6,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 2.31
    },
    {
      "year": 2010,
      "gdpPPP": 19.329,
      "perCapitaPPP": 2868.4,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 6.29
    },
    {
      "year": 2011,
      "gdpPPP": 19.946,
      "perCapitaPPP": 2749.5,
      "perCapitaPPPChangePct": -4.15,
      "popChangePct": 7.66
    },
    {
      "year": 2012,
      "gdpPPP": 21.264,
      "perCapitaPPP": 2792.4,
      "perCapitaPPPChangePct": 1.56,
      "popChangePct": 4.98
    },
    {
      "year": 2013,
      "gdpPPP": 22.453,
      "perCapitaPPP": 2808.9,
      "perCapitaPPPChangePct": 0.59,
      "popChangePct": 4.96
    },
    {
      "year": 2014,
      "gdpPPP": 25.938,
      "perCapitaPPP": 3091.3,
      "perCapitaPPPChangePct": 10.05,
      "popChangePct": 4.97
    },
    {
      "year": 2015,
      "gdpPPP": 27.9,
      "perCapitaPPP": 3167.8,
      "perCapitaPPPChangePct": 2.47,
      "popChangePct": 4.97
    },
    {
      "year": 2016,
      "gdpPPP": 29.712,
      "perCapitaPPP": 3213.8,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 4.97
    },
    {
      "year": 2017,
      "gdpPPP": 31.313,
      "perCapitaPPP": 3226.7,
      "perCapitaPPPChangePct": 0.4,
      "popChangePct": 4.96
    },
    {
      "year": 2018,
      "gdpPPP": 31.941,
      "perCapitaPPP": 3135.6,
      "perCapitaPPPChangePct": -2.82,
      "popChangePct": 4.97
    },
    {
      "year": 2019,
      "gdpPPP": 33.923,
      "perCapitaPPP": 3172.5,
      "perCapitaPPPChangePct": 1.18,
      "popChangePct": 4.98
    },
    {
      "year": 2020,
      "gdpPPP": 33.29,
      "perCapitaPPP": 2966.0,
      "perCapitaPPPChangePct": -6.51,
      "popChangePct": 4.97
    },
    {
      "year": 2021,
      "gdpPPP": 34.631,
      "perCapitaPPP": 2939.4,
      "perCapitaPPPChangePct": -0.9,
      "popChangePct": 4.97
    },
    {
      "year": 2022,
      "gdpPPP": 39.211,
      "perCapitaPPP": 3259.7,
      "perCapitaPPPChangePct": 10.9,
      "popChangePct": 2.1
    },
    {
      "year": 2023,
      "gdpPPP": 42.212,
      "perCapitaPPP": 3437.0,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 2.1
    },
    {
      "year": 2024,
      "gdpPPP": 44.942,
      "perCapitaPPP": 3584,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 2.09
    },
    {
      "year": 2025,
      "gdpPPP": 48.822,
      "perCapitaPPP": 3813.4,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 2.11
    },
    {
      "year": 2026,
      "gdpPPP": 52.105,
      "perCapitaPPP": 3986.1,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 2.1
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 55.272,
      "perCapitaPPP": 4141.4,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 2.1
    },
    {
      "year": 2028,
      "gdpPPP": 57.995,
      "perCapitaPPP": 4256.0,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 2.1
    },
    {
      "year": 2029,
      "gdpPPP": 60.856,
      "perCapitaPPP": 4374.1,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 2.11
    },
    {
      "year": 2030,
      "gdpPPP": 63.895,
      "perCapitaPPP": 4498.1,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 2.1
    },
    {
      "year": 2031,
      "gdpPPP": 67.065,
      "perCapitaPPP": 4624.2,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 2.1
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PapuaNewGuineaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
