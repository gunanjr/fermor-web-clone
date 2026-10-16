import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Honduras",
  "slug": "honduras",
  "iso3": "HND",
  "region": "Americas",
  "rank2026": 109,
  "flagEmoji": "🇭🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Georgia",
      "slug": "georgia",
      "rank": 108
    },
    {
      "name": "Zambia",
      "slug": "zambia",
      "rank": 110
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.968,
      "growth": 0.6,
      "perCapita": 1075.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.044,
      "growth": -1.2,
      "perCapita": 1061.5,
      "popChangePct": 3.22
    },
    {
      "year": 1982,
      "gdp": 4.267,
      "growth": -2.1,
      "perCapita": 1086.3,
      "popChangePct": 3.1
    },
    {
      "year": 1983,
      "gdp": 4.477,
      "growth": 0.9,
      "perCapita": 1105.5,
      "popChangePct": 3.08
    },
    {
      "year": 1984,
      "gdp": 4.915,
      "growth": 6.3,
      "perCapita": 1177.3,
      "popChangePct": 3.11
    },
    {
      "year": 1985,
      "gdp": 5.278,
      "growth": 5.6,
      "perCapita": 1226.2,
      "popChangePct": 3.09
    },
    {
      "year": 1986,
      "gdp": 5.678,
      "growth": 5.3,
      "perCapita": 1280.6,
      "popChangePct": 3.02
    },
    {
      "year": 1987,
      "gdp": 6.191,
      "growth": 6.6,
      "perCapita": 1355.6,
      "popChangePct": 3.0
    },
    {
      "year": 1988,
      "gdp": 6.877,
      "growth": 1.7,
      "perCapita": 1462.0,
      "popChangePct": 3.0
    },
    {
      "year": 1989,
      "gdp": 7.877,
      "growth": 2.7,
      "perCapita": 1627.4,
      "popChangePct": 2.89
    },
    {
      "year": 1990,
      "gdp": 4.923,
      "growth": 2.8,
      "perCapita": 988.5,
      "popChangePct": 2.89
    },
    {
      "year": 1991,
      "gdp": 4.649,
      "growth": -3.3,
      "perCapita": 907.3,
      "popChangePct": 2.89
    },
    {
      "year": 1992,
      "gdp": 4.944,
      "growth": 6.1,
      "perCapita": 937.8,
      "popChangePct": 2.87
    },
    {
      "year": 1993,
      "gdp": 4.961,
      "growth": 6.5,
      "perCapita": 914.7,
      "popChangePct": 2.88
    },
    {
      "year": 1994,
      "gdp": 4.642,
      "growth": 0.2,
      "perCapita": 832.1,
      "popChangePct": 2.88
    },
    {
      "year": 1995,
      "gdp": 5.415,
      "growth": 6.2,
      "perCapita": 943.4,
      "popChangePct": 2.89
    },
    {
      "year": 1996,
      "gdp": 5.217,
      "growth": 1.9,
      "perCapita": 883.6,
      "popChangePct": 2.86
    },
    {
      "year": 1997,
      "gdp": 5.736,
      "growth": 4.6,
      "perCapita": 944.7,
      "popChangePct": 2.83
    },
    {
      "year": 1998,
      "gdp": 6.366,
      "growth": 3.6,
      "perCapita": 1021.1,
      "popChangePct": 2.68
    },
    {
      "year": 1999,
      "gdp": 6.417,
      "growth": -0.7,
      "perCapita": 1002.5,
      "popChangePct": 2.66
    },
    {
      "year": 2000,
      "gdp": 7.104,
      "growth": 7.3,
      "perCapita": 1080.0,
      "popChangePct": 2.78
    },
    {
      "year": 2001,
      "gdp": 7.652,
      "growth": 2.7,
      "perCapita": 1132.3,
      "popChangePct": 2.74
    },
    {
      "year": 2002,
      "gdp": 7.857,
      "growth": 3.8,
      "perCapita": 1132.3,
      "popChangePct": 2.68
    },
    {
      "year": 2003,
      "gdp": 8.229,
      "growth": 4.5,
      "perCapita": 1155.9,
      "popChangePct": 2.59
    },
    {
      "year": 2004,
      "gdp": 8.866,
      "growth": 6.2,
      "perCapita": 1214.6,
      "popChangePct": 2.53
    },
    {
      "year": 2005,
      "gdp": 9.755,
      "growth": 6.1,
      "perCapita": 1304.5,
      "popChangePct": 2.45
    },
    {
      "year": 2006,
      "gdp": 10.917,
      "growth": 6.6,
      "perCapita": 1425.8,
      "popChangePct": 2.39
    },
    {
      "year": 2007,
      "gdp": 12.361,
      "growth": 6.2,
      "perCapita": 1577.7,
      "popChangePct": 2.32
    },
    {
      "year": 2008,
      "gdp": 13.884,
      "growth": 4.2,
      "perCapita": 1732.8,
      "popChangePct": 2.27
    },
    {
      "year": 2009,
      "gdp": 14.586,
      "growth": -2.4,
      "perCapita": 1781.0,
      "popChangePct": 2.21
    },
    {
      "year": 2010,
      "gdp": 15.837,
      "growth": 3.7,
      "perCapita": 1893.0,
      "popChangePct": 2.15
    },
    {
      "year": 2011,
      "gdp": 17.71,
      "growth": 3.8,
      "perCapita": 2073.7,
      "popChangePct": 2.09
    },
    {
      "year": 2012,
      "gdp": 18.523,
      "growth": 4.1,
      "perCapita": 2125.4,
      "popChangePct": 2.04
    },
    {
      "year": 2013,
      "gdp": 18.494,
      "growth": 2.8,
      "perCapita": 2080.5,
      "popChangePct": 2.0
    },
    {
      "year": 2014,
      "gdp": 19.753,
      "growth": 3.1,
      "perCapita": 2179.5,
      "popChangePct": 1.96
    },
    {
      "year": 2015,
      "gdp": 20.978,
      "growth": 3.8,
      "perCapita": 2271.0,
      "popChangePct": 1.92
    },
    {
      "year": 2016,
      "gdp": 21.712,
      "growth": 3.9,
      "perCapita": 2306.8,
      "popChangePct": 1.89
    },
    {
      "year": 2017,
      "gdp": 23.138,
      "growth": 4.8,
      "perCapita": 2413.2,
      "popChangePct": 1.87
    },
    {
      "year": 2018,
      "gdp": 24.067,
      "growth": 3.8,
      "perCapita": 2464.6,
      "popChangePct": 1.85
    },
    {
      "year": 2019,
      "gdp": 24.883,
      "growth": 2.6,
      "perCapita": 2502.4,
      "popChangePct": 1.83
    },
    {
      "year": 2020,
      "gdp": 23.35,
      "growth": -9,
      "perCapita": 2307.4,
      "popChangePct": 1.77
    },
    {
      "year": 2021,
      "gdp": 28.146,
      "growth": 12.6,
      "perCapita": 2735.3,
      "popChangePct": 1.68
    },
    {
      "year": 2022,
      "gdp": 31.425,
      "growth": 4.1,
      "perCapita": 3003.2,
      "popChangePct": 1.69
    },
    {
      "year": 2023,
      "gdp": 34.356,
      "growth": 3.6,
      "perCapita": 3227.5,
      "popChangePct": 1.73
    },
    {
      "year": 2024,
      "gdp": 37.1,
      "growth": 3.6,
      "perCapita": 3427.0,
      "popChangePct": 1.7
    },
    {
      "year": 2025,
      "gdp": 39.694,
      "growth": 3.7,
      "perCapita": 3606.6,
      "popChangePct": 1.66
    },
    {
      "year": 2026,
      "gdp": 41.505,
      "growth": 3.3,
      "perCapita": 3710.9,
      "popChangePct": 1.63
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 43.884,
      "growth": 3.7,
      "perCapita": 3862.3,
      "popChangePct": 1.58
    },
    {
      "year": 2028,
      "gdp": 46.445,
      "growth": 3.8,
      "perCapita": 4025.2,
      "popChangePct": 1.55
    },
    {
      "year": 2029,
      "gdp": 49.155,
      "growth": 3.8,
      "perCapita": 4196.7,
      "popChangePct": 1.52
    },
    {
      "year": 2030,
      "gdp": 52.023,
      "growth": 3.8,
      "perCapita": 4377.1,
      "popChangePct": 1.47
    },
    {
      "year": 2031,
      "gdp": 55.059,
      "growth": 3.8,
      "perCapita": 4567.1,
      "popChangePct": 1.44
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.047,
      "perCapitaPPP": 1638.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 6.538,
      "perCapitaPPP": 1716.2,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 3.22
    },
    {
      "year": 1982,
      "gdpPPP": 6.798,
      "perCapitaPPP": 1730.8,
      "perCapitaPPPChangePct": 0.85,
      "popChangePct": 3.1
    },
    {
      "year": 1983,
      "gdpPPP": 7.128,
      "perCapitaPPP": 1760.3,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 3.08
    },
    {
      "year": 1984,
      "gdpPPP": 7.853,
      "perCapitaPPP": 1880.9,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": 3.11
    },
    {
      "year": 1985,
      "gdpPPP": 8.557,
      "perCapitaPPP": 1987.9,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 3.09
    },
    {
      "year": 1986,
      "gdpPPP": 9.195,
      "perCapitaPPP": 2073.8,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 3.02
    },
    {
      "year": 1987,
      "gdpPPP": 10.048,
      "perCapitaPPP": 2200.3,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 3.0
    },
    {
      "year": 1988,
      "gdpPPP": 10.584,
      "perCapitaPPP": 2250.1,
      "perCapitaPPPChangePct": 2.27,
      "popChangePct": 3.0
    },
    {
      "year": 1989,
      "gdpPPP": 11.299,
      "perCapitaPPP": 2334.5,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 2.89
    },
    {
      "year": 1990,
      "gdpPPP": 12.049,
      "perCapitaPPP": 2419.3,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": 2.89
    },
    {
      "year": 1991,
      "gdpPPP": 12.043,
      "perCapitaPPP": 2350.4,
      "perCapitaPPPChangePct": -2.84,
      "popChangePct": 2.89
    },
    {
      "year": 1992,
      "gdpPPP": 13.066,
      "perCapitaPPP": 2478.6,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 2.87
    },
    {
      "year": 1993,
      "gdpPPP": 14.244,
      "perCapitaPPP": 2626.5,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 2.88
    },
    {
      "year": 1994,
      "gdpPPP": 14.579,
      "perCapitaPPP": 2613.1,
      "perCapitaPPPChangePct": -0.51,
      "popChangePct": 2.88
    },
    {
      "year": 1995,
      "gdpPPP": 15.806,
      "perCapitaPPP": 2753.9,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 2.89
    },
    {
      "year": 1996,
      "gdpPPP": 16.397,
      "perCapitaPPP": 2777.2,
      "perCapitaPPPChangePct": 0.85,
      "popChangePct": 2.86
    },
    {
      "year": 1997,
      "gdpPPP": 17.446,
      "perCapitaPPP": 2873.5,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": 2.83
    },
    {
      "year": 1998,
      "gdpPPP": 18.276,
      "perCapitaPPP": 2931.4,
      "perCapitaPPPChangePct": 2.02,
      "popChangePct": 2.68
    },
    {
      "year": 1999,
      "gdpPPP": 18.398,
      "perCapitaPPP": 2874.5,
      "perCapitaPPPChangePct": -1.94,
      "popChangePct": 2.66
    },
    {
      "year": 2000,
      "gdpPPP": 20.187,
      "perCapitaPPP": 3068.9,
      "perCapitaPPPChangePct": 6.76,
      "popChangePct": 2.78
    },
    {
      "year": 2001,
      "gdpPPP": 21.203,
      "perCapitaPPP": 3137.5,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 2.74
    },
    {
      "year": 2002,
      "gdpPPP": 22.341,
      "perCapitaPPP": 3219.7,
      "perCapitaPPPChangePct": 2.62,
      "popChangePct": 2.68
    },
    {
      "year": 2003,
      "gdpPPP": 23.818,
      "perCapitaPPP": 3345.6,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 2.59
    },
    {
      "year": 2004,
      "gdpPPP": 25.983,
      "perCapitaPPP": 3559.8,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 2.53
    },
    {
      "year": 2005,
      "gdpPPP": 28.419,
      "perCapitaPPP": 3800.2,
      "perCapitaPPPChangePct": 6.75,
      "popChangePct": 2.45
    },
    {
      "year": 2006,
      "gdpPPP": 31.22,
      "perCapitaPPP": 4077.4,
      "perCapitaPPPChangePct": 7.29,
      "popChangePct": 2.39
    },
    {
      "year": 2007,
      "gdpPPP": 34.05,
      "perCapitaPPP": 4346.0,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 2.32
    },
    {
      "year": 2008,
      "gdpPPP": 36.175,
      "perCapitaPPP": 4514.7,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 2.27
    },
    {
      "year": 2009,
      "gdpPPP": 35.512,
      "perCapitaPPP": 4336.1,
      "perCapitaPPPChangePct": -3.96,
      "popChangePct": 2.21
    },
    {
      "year": 2010,
      "gdpPPP": 37.285,
      "perCapitaPPP": 4456.8,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 2.15
    },
    {
      "year": 2011,
      "gdpPPP": 39.514,
      "perCapitaPPP": 4626.6,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 2.09
    },
    {
      "year": 2012,
      "gdpPPP": 41.912,
      "perCapitaPPP": 4809.1,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 2.04
    },
    {
      "year": 2013,
      "gdpPPP": 43.815,
      "perCapitaPPP": 4929.0,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 2.0
    },
    {
      "year": 2014,
      "gdpPPP": 45.941,
      "perCapitaPPP": 5069.0,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 1.96
    },
    {
      "year": 2015,
      "gdpPPP": 48.148,
      "perCapitaPPP": 5212.4,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 1.92
    },
    {
      "year": 2016,
      "gdpPPP": 50.498,
      "perCapitaPPP": 5365.1,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 1.89
    },
    {
      "year": 2017,
      "gdpPPP": 53.892,
      "perCapitaPPP": 5620.7,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 1.87
    },
    {
      "year": 2018,
      "gdpPPP": 55.011,
      "perCapitaPPP": 5633.4,
      "perCapitaPPPChangePct": 0.23,
      "popChangePct": 1.85
    },
    {
      "year": 2019,
      "gdpPPP": 57.523,
      "perCapitaPPP": 5784.9,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 1.83
    },
    {
      "year": 2020,
      "gdpPPP": 54.491,
      "perCapitaPPP": 5384.7,
      "perCapitaPPPChangePct": -6.92,
      "popChangePct": 1.77
    },
    {
      "year": 2021,
      "gdpPPP": 63.828,
      "perCapitaPPP": 6203.0,
      "perCapitaPPPChangePct": 15.2,
      "popChangePct": 1.68
    },
    {
      "year": 2022,
      "gdpPPP": 71.201,
      "perCapitaPPP": 6804.4,
      "perCapitaPPPChangePct": 9.7,
      "popChangePct": 1.69
    },
    {
      "year": 2023,
      "gdpPPP": 76.475,
      "perCapitaPPP": 7184.2,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 1.73
    },
    {
      "year": 2024,
      "gdpPPP": 81.159,
      "perCapitaPPP": 7496.9,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 1.7
    },
    {
      "year": 2025,
      "gdpPPP": 86.55,
      "perCapitaPPP": 7864.0,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 1.66
    },
    {
      "year": 2026,
      "gdpPPP": 91.967,
      "perCapitaPPP": 8222.5,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 1.63
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 97.464,
      "perCapitaPPP": 8577.9,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 1.58
    },
    {
      "year": 2028,
      "gdpPPP": 102.828,
      "perCapitaPPP": 8911.9,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.55
    },
    {
      "year": 2029,
      "gdpPPP": 108.634,
      "perCapitaPPP": 9274.7,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 1.52
    },
    {
      "year": 2030,
      "gdpPPP": 114.834,
      "perCapitaPPP": 9661.8,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 1.47
    },
    {
      "year": 2031,
      "gdpPPP": 121.349,
      "perCapitaPPP": 10065.9,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 1.44
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function HondurasGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
