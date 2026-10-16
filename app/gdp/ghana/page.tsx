import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Ghana",
  "slug": "ghana",
  "iso3": "GHA",
  "region": "Africa",
  "rank2026": 73,
  "flagEmoji": "🇬🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Ethiopia",
      "slug": "ethiopia",
      "rank": 72
    },
    {
      "name": "Oman",
      "slug": "oman",
      "rank": 74
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 38.684,
      "growth": 0.5,
      "perCapita": 3239.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 61.487,
      "growth": -3.8,
      "perCapita": 5006.4,
      "popChangePct": 2.86
    },
    {
      "year": 1982,
      "gdp": 70.954,
      "growth": -8.3,
      "perCapita": 5611.7,
      "popChangePct": 2.95
    },
    {
      "year": 1983,
      "gdp": 49.337,
      "growth": -6.2,
      "perCapita": 3786.5,
      "popChangePct": 3.05
    },
    {
      "year": 1984,
      "gdp": 17.998,
      "growth": 9.4,
      "perCapita": 1346.1,
      "popChangePct": 2.62
    },
    {
      "year": 1985,
      "gdp": 15.97,
      "growth": 6.4,
      "perCapita": 1169.0,
      "popChangePct": 2.17
    },
    {
      "year": 1986,
      "gdp": 15.086,
      "growth": 6.2,
      "perCapita": 1080.3,
      "popChangePct": 2.23
    },
    {
      "year": 1987,
      "gdp": 12.692,
      "growth": 6.7,
      "perCapita": 888.2,
      "popChangePct": 2.32
    },
    {
      "year": 1988,
      "gdp": 13.566,
      "growth": 6.5,
      "perCapita": 926.9,
      "popChangePct": 2.44
    },
    {
      "year": 1989,
      "gdp": 13.723,
      "growth": 4.5,
      "perCapita": 914.4,
      "popChangePct": 2.53
    },
    {
      "year": 1990,
      "gdp": 15.882,
      "growth": 3.6,
      "perCapita": 1031.7,
      "popChangePct": 2.59
    },
    {
      "year": 1991,
      "gdp": 17.795,
      "growth": 4.8,
      "perCapita": 1127.2,
      "popChangePct": 2.55
    },
    {
      "year": 1992,
      "gdp": 17.666,
      "growth": 4.5,
      "perCapita": 1091.5,
      "popChangePct": 2.52
    },
    {
      "year": 1993,
      "gdp": 14.532,
      "growth": 4.8,
      "perCapita": 876.0,
      "popChangePct": 2.5
    },
    {
      "year": 1994,
      "gdp": 13.433,
      "growth": 3.5,
      "perCapita": 790.5,
      "popChangePct": 2.43
    },
    {
      "year": 1995,
      "gdp": 15.692,
      "growth": 4.2,
      "perCapita": 901.9,
      "popChangePct": 2.39
    },
    {
      "year": 1996,
      "gdp": 16.629,
      "growth": 4.8,
      "perCapita": 933.7,
      "popChangePct": 2.36
    },
    {
      "year": 1997,
      "gdp": 17.024,
      "growth": 5.8,
      "perCapita": 933.4,
      "popChangePct": 2.41
    },
    {
      "year": 1998,
      "gdp": 18.528,
      "growth": 5,
      "perCapita": 991.4,
      "popChangePct": 2.46
    },
    {
      "year": 1999,
      "gdp": 19.165,
      "growth": 4.5,
      "perCapita": 1000.8,
      "popChangePct": 2.47
    },
    {
      "year": 2000,
      "gdp": 12.349,
      "growth": 3.6,
      "perCapita": 628.9,
      "popChangePct": 2.54
    },
    {
      "year": 2001,
      "gdp": 13.113,
      "growth": 3.8,
      "perCapita": 650.2,
      "popChangePct": 2.7
    },
    {
      "year": 2002,
      "gdp": 15.229,
      "growth": 4.6,
      "perCapita": 734.7,
      "popChangePct": 2.79
    },
    {
      "year": 2003,
      "gdp": 18.79,
      "growth": 5.1,
      "perCapita": 882.3,
      "popChangePct": 2.74
    },
    {
      "year": 2004,
      "gdp": 21.754,
      "growth": 5.4,
      "perCapita": 994.8,
      "popChangePct": 2.68
    },
    {
      "year": 2005,
      "gdp": 26.415,
      "growth": 6.2,
      "perCapita": 1176.6,
      "popChangePct": 2.66
    },
    {
      "year": 2006,
      "gdp": 30.963,
      "growth": 5.8,
      "perCapita": 1343.8,
      "popChangePct": 2.64
    },
    {
      "year": 2007,
      "gdp": 36.544,
      "growth": 4.1,
      "perCapita": 1545.7,
      "popChangePct": 2.61
    },
    {
      "year": 2008,
      "gdp": 41.323,
      "growth": 9,
      "perCapita": 1704.1,
      "popChangePct": 2.57
    },
    {
      "year": 2009,
      "gdp": 37.127,
      "growth": 5.7,
      "perCapita": 1493.3,
      "popChangePct": 2.53
    },
    {
      "year": 2010,
      "gdp": 45.447,
      "growth": 7.8,
      "perCapita": 1784.0,
      "popChangePct": 2.46
    },
    {
      "year": 2011,
      "gdp": 53.625,
      "growth": 14,
      "perCapita": 2055,
      "popChangePct": 2.43
    },
    {
      "year": 2012,
      "gdp": 55.8,
      "growth": 8.4,
      "perCapita": 2087.2,
      "popChangePct": 2.45
    },
    {
      "year": 2013,
      "gdp": 62.846,
      "growth": 7.2,
      "perCapita": 2294.8,
      "popChangePct": 2.44
    },
    {
      "year": 2014,
      "gdp": 54.678,
      "growth": 2.9,
      "perCapita": 1949.9,
      "popChangePct": 2.4
    },
    {
      "year": 2015,
      "gdp": 49.437,
      "growth": 2.1,
      "perCapita": 1722.8,
      "popChangePct": 2.33
    },
    {
      "year": 2016,
      "gdp": 56.144,
      "growth": 3.4,
      "perCapita": 1912.5,
      "popChangePct": 2.3
    },
    {
      "year": 2017,
      "gdp": 60.385,
      "growth": 8.1,
      "perCapita": 2012.3,
      "popChangePct": 2.22
    },
    {
      "year": 2018,
      "gdp": 67.259,
      "growth": 6.2,
      "perCapita": 2195.3,
      "popChangePct": 2.1
    },
    {
      "year": 2019,
      "gdp": 68.353,
      "growth": 6.5,
      "perCapita": 2186.7,
      "popChangePct": 2.03
    },
    {
      "year": 2020,
      "gdp": 70.008,
      "growth": 0.5,
      "perCapita": 2195.5,
      "popChangePct": 2.01
    },
    {
      "year": 2021,
      "gdp": 79.514,
      "growth": 5.1,
      "perCapita": 2445.2,
      "popChangePct": 1.98
    },
    {
      "year": 2022,
      "gdp": 73.919,
      "growth": 3.8,
      "perCapita": 2229.9,
      "popChangePct": 1.94
    },
    {
      "year": 2023,
      "gdp": 80.547,
      "growth": 3.1,
      "perCapita": 2383.9,
      "popChangePct": 1.93
    },
    {
      "year": 2024,
      "gdp": 83.289,
      "growth": 5.8,
      "perCapita": 2419.3,
      "popChangePct": 1.89
    },
    {
      "year": 2025,
      "gdp": 114.708,
      "growth": 6,
      "perCapita": 3271.4,
      "popChangePct": 1.85
    },
    {
      "year": 2026,
      "gdp": 118.293,
      "growth": 4.8,
      "perCapita": 3313.8,
      "popChangePct": 1.81
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 120.962,
      "growth": 4.9,
      "perCapita": 3329.7,
      "popChangePct": 1.76
    },
    {
      "year": 2028,
      "gdp": 125.294,
      "growth": 5,
      "perCapita": 3390.1,
      "popChangePct": 1.74
    },
    {
      "year": 2029,
      "gdp": 133.196,
      "growth": 5,
      "perCapita": 3543.4,
      "popChangePct": 1.71
    },
    {
      "year": 2030,
      "gdp": 142.064,
      "growth": 5,
      "perCapita": 3716.8,
      "popChangePct": 1.68
    },
    {
      "year": 2031,
      "gdp": 151.56,
      "growth": 5,
      "perCapita": 3900.5,
      "popChangePct": 1.66
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 11.45,
      "perCapitaPPP": 958.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 12.063,
      "perCapitaPPP": 982.2,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 2.86
    },
    {
      "year": 1982,
      "gdpPPP": 11.745,
      "perCapitaPPP": 928.9,
      "perCapitaPPPChangePct": -5.43,
      "popChangePct": 2.95
    },
    {
      "year": 1983,
      "gdpPPP": 11.445,
      "perCapitaPPP": 878.4,
      "perCapitaPPPChangePct": -5.44,
      "popChangePct": 3.05
    },
    {
      "year": 1984,
      "gdpPPP": 12.97,
      "perCapitaPPP": 970.1,
      "perCapitaPPPChangePct": 10.44,
      "popChangePct": 2.62
    },
    {
      "year": 1985,
      "gdpPPP": 14.241,
      "perCapitaPPP": 1042.5,
      "perCapitaPPPChangePct": 7.46,
      "popChangePct": 2.17
    },
    {
      "year": 1986,
      "gdpPPP": 15.427,
      "perCapitaPPP": 1104.7,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 2.23
    },
    {
      "year": 1987,
      "gdpPPP": 16.862,
      "perCapitaPPP": 1180.1,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 2.32
    },
    {
      "year": 1988,
      "gdpPPP": 18.586,
      "perCapitaPPP": 1269.8,
      "perCapitaPPPChangePct": 7.61,
      "popChangePct": 2.44
    },
    {
      "year": 1989,
      "gdpPPP": 20.192,
      "perCapitaPPP": 1345.5,
      "perCapitaPPPChangePct": 5.96,
      "popChangePct": 2.53
    },
    {
      "year": 1990,
      "gdpPPP": 21.701,
      "perCapitaPPP": 1409.6,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 2.59
    },
    {
      "year": 1991,
      "gdpPPP": 23.506,
      "perCapitaPPP": 1488.9,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 2.55
    },
    {
      "year": 1992,
      "gdpPPP": 25.117,
      "perCapitaPPP": 1551.9,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 2.52
    },
    {
      "year": 1993,
      "gdpPPP": 26.939,
      "perCapitaPPP": 1623.9,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 2.5
    },
    {
      "year": 1994,
      "gdpPPP": 28.48,
      "perCapitaPPP": 1675.9,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 2.43
    },
    {
      "year": 1995,
      "gdpPPP": 30.307,
      "perCapitaPPP": 1741.9,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 2.39
    },
    {
      "year": 1996,
      "gdpPPP": 32.333,
      "perCapitaPPP": 1815.4,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 2.36
    },
    {
      "year": 1997,
      "gdpPPP": 34.797,
      "perCapitaPPP": 1907.8,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 2.41
    },
    {
      "year": 1998,
      "gdpPPP": 36.951,
      "perCapitaPPP": 1977.3,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 2.46
    },
    {
      "year": 1999,
      "gdpPPP": 39.171,
      "perCapitaPPP": 2045.5,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 2.47
    },
    {
      "year": 2000,
      "gdpPPP": 41.499,
      "perCapitaPPP": 2113.3,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 2.54
    },
    {
      "year": 2001,
      "gdpPPP": 44.058,
      "perCapitaPPP": 2184.6,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 2.7
    },
    {
      "year": 2002,
      "gdpPPP": 46.808,
      "perCapitaPPP": 2258.1,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.79
    },
    {
      "year": 2003,
      "gdpPPP": 50.173,
      "perCapitaPPP": 2355.9,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 2.74
    },
    {
      "year": 2004,
      "gdpPPP": 54.306,
      "perCapitaPPP": 2483.3,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 2.68
    },
    {
      "year": 2005,
      "gdpPPP": 59.498,
      "perCapitaPPP": 2650.3,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 2.66
    },
    {
      "year": 2006,
      "gdpPPP": 64.901,
      "perCapitaPPP": 2816.8,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 2.64
    },
    {
      "year": 2007,
      "gdpPPP": 69.375,
      "perCapitaPPP": 2934.3,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 2.61
    },
    {
      "year": 2008,
      "gdpPPP": 77.077,
      "perCapitaPPP": 3178.4,
      "perCapitaPPPChangePct": 8.32,
      "popChangePct": 2.57
    },
    {
      "year": 2009,
      "gdpPPP": 81.958,
      "perCapitaPPP": 3296.4,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 2.53
    },
    {
      "year": 2010,
      "gdpPPP": 89.407,
      "perCapitaPPP": 3509.6,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 2.46
    },
    {
      "year": 2011,
      "gdpPPP": 103.986,
      "perCapitaPPP": 3984.9,
      "perCapitaPPPChangePct": 13.54,
      "popChangePct": 2.43
    },
    {
      "year": 2012,
      "gdpPPP": 114.842,
      "perCapitaPPP": 4295.7,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 2.45
    },
    {
      "year": 2013,
      "gdpPPP": 125.254,
      "perCapitaPPP": 4573.6,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 2.44
    },
    {
      "year": 2014,
      "gdpPPP": 131.075,
      "perCapitaPPP": 4674.3,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 2.4
    },
    {
      "year": 2015,
      "gdpPPP": 135.097,
      "perCapitaPPP": 4707.9,
      "perCapitaPPPChangePct": 0.72,
      "popChangePct": 2.33
    },
    {
      "year": 2016,
      "gdpPPP": 140.982,
      "perCapitaPPP": 4802.4,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 2.3
    },
    {
      "year": 2017,
      "gdpPPP": 155.172,
      "perCapitaPPP": 5171.0,
      "perCapitaPPPChangePct": 7.68,
      "popChangePct": 2.22
    },
    {
      "year": 2018,
      "gdpPPP": 169.625,
      "perCapitaPPP": 5536.5,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 2.1
    },
    {
      "year": 2019,
      "gdpPPP": 187.633,
      "perCapitaPPP": 6002.6,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": 2.03
    },
    {
      "year": 2020,
      "gdpPPP": 192.835,
      "perCapitaPPP": 6047.3,
      "perCapitaPPPChangePct": 0.75,
      "popChangePct": 2.01
    },
    {
      "year": 2021,
      "gdpPPP": 214.867,
      "perCapitaPPP": 6607.5,
      "perCapitaPPPChangePct": 9.26,
      "popChangePct": 1.98
    },
    {
      "year": 2022,
      "gdpPPP": 238.935,
      "perCapitaPPP": 7207.9,
      "perCapitaPPPChangePct": 9.09,
      "popChangePct": 1.94
    },
    {
      "year": 2023,
      "gdpPPP": 255.525,
      "perCapitaPPP": 7562.6,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 1.93
    },
    {
      "year": 2024,
      "gdpPPP": 277.182,
      "perCapitaPPP": 8051.2,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 1.89
    },
    {
      "year": 2025,
      "gdpPPP": 302.017,
      "perCapitaPPP": 8613.2,
      "perCapitaPPPChangePct": 6.98,
      "popChangePct": 1.85
    },
    {
      "year": 2026,
      "gdpPPP": 325.428,
      "perCapitaPPP": 9116.2,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 1.81
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 348.963,
      "perCapitaPPP": 9605.8,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 1.76
    },
    {
      "year": 2028,
      "gdpPPP": 372.422,
      "perCapitaPPP": 10076.6,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 1.74
    },
    {
      "year": 2029,
      "gdpPPP": 397.997,
      "perCapitaPPP": 10587.9,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 1.71
    },
    {
      "year": 2030,
      "gdpPPP": 425.576,
      "perCapitaPPP": 11134.3,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 1.68
    },
    {
      "year": 2031,
      "gdpPPP": 454.921,
      "perCapitaPPP": 11707.6,
      "perCapitaPPPChangePct": 5.15,
      "popChangePct": 1.66
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GhanaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
