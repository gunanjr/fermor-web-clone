import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Tanzania",
  "slug": "tanzania",
  "iso3": "TZA",
  "region": "Africa",
  "rank2026": 86,
  "flagEmoji": "🇹🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Panama",
      "slug": "panama",
      "rank": 85
    },
    {
      "name": "Slovenia",
      "slug": "slovenia",
      "rank": 87
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 10.873,
      "growth": 3.3,
      "perCapita": 591.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 13.005,
      "growth": 0.5,
      "perCapita": 686.2,
      "popChangePct": 3.11
    },
    {
      "year": 1982,
      "gdp": 14.932,
      "growth": 0.6,
      "perCapita": 764.2,
      "popChangePct": 3.09
    },
    {
      "year": 1983,
      "gdp": 15.294,
      "growth": 2.4,
      "perCapita": 759.1,
      "popChangePct": 3.11
    },
    {
      "year": 1984,
      "gdp": 13.915,
      "growth": 3.4,
      "perCapita": 667.2,
      "popChangePct": 3.51
    },
    {
      "year": 1985,
      "gdp": 12.556,
      "growth": 4.6,
      "perCapita": 584.0,
      "popChangePct": 3.08
    },
    {
      "year": 1986,
      "gdp": 15.874,
      "growth": 6.6,
      "perCapita": 713.1,
      "popChangePct": 3.55
    },
    {
      "year": 1987,
      "gdp": 7.821,
      "growth": 5.9,
      "perCapita": 340.5,
      "popChangePct": 3.19
    },
    {
      "year": 1988,
      "gdp": 7.474,
      "growth": 4.4,
      "perCapita": 314.5,
      "popChangePct": 3.44
    },
    {
      "year": 1989,
      "gdp": 6.444,
      "growth": 3.8,
      "perCapita": 264.0,
      "popChangePct": 2.72
    },
    {
      "year": 1990,
      "gdp": 5.172,
      "growth": 7,
      "perCapita": 206.4,
      "popChangePct": 2.68
    },
    {
      "year": 1991,
      "gdp": 6.019,
      "growth": 2.1,
      "perCapita": 234.1,
      "popChangePct": 2.6
    },
    {
      "year": 1992,
      "gdp": 5.588,
      "growth": 0.6,
      "perCapita": 211.9,
      "popChangePct": 2.54
    },
    {
      "year": 1993,
      "gdp": 5.17,
      "growth": 1.2,
      "perCapita": 191.3,
      "popChangePct": 2.52
    },
    {
      "year": 1994,
      "gdp": 5.478,
      "growth": 1.6,
      "perCapita": 195.2,
      "popChangePct": 3.84
    },
    {
      "year": 1995,
      "gdp": 6.382,
      "growth": 3.6,
      "perCapita": 218.6,
      "popChangePct": 3.99
    },
    {
      "year": 1996,
      "gdp": 7.889,
      "growth": 4.5,
      "perCapita": 263.9,
      "popChangePct": 2.43
    },
    {
      "year": 1997,
      "gdp": 9.341,
      "growth": 3.5,
      "perCapita": 308.5,
      "popChangePct": 1.29
    },
    {
      "year": 1998,
      "gdp": 11.481,
      "growth": 3.7,
      "perCapita": 369.2,
      "popChangePct": 2.7
    },
    {
      "year": 1999,
      "gdp": 11.777,
      "growth": 4.8,
      "perCapita": 369.3,
      "popChangePct": 2.55
    },
    {
      "year": 2000,
      "gdp": 12.369,
      "growth": 4.9,
      "perCapita": 377.0,
      "popChangePct": 2.88
    },
    {
      "year": 2001,
      "gdp": 12.61,
      "growth": 6,
      "perCapita": 373.5,
      "popChangePct": 2.89
    },
    {
      "year": 2002,
      "gdp": 13.123,
      "growth": 7.2,
      "perCapita": 378.9,
      "popChangePct": 2.6
    },
    {
      "year": 2003,
      "gdp": 14.159,
      "growth": 6.9,
      "perCapita": 398.3,
      "popChangePct": 2.65
    },
    {
      "year": 2004,
      "gdp": 15.576,
      "growth": 7.8,
      "perCapita": 426.6,
      "popChangePct": 2.71
    },
    {
      "year": 2005,
      "gdp": 17.174,
      "growth": 7.4,
      "perCapita": 457.6,
      "popChangePct": 2.79
    },
    {
      "year": 2006,
      "gdp": 18.878,
      "growth": 4.7,
      "perCapita": 489.1,
      "popChangePct": 2.84
    },
    {
      "year": 2007,
      "gdp": 21.81,
      "growth": 8.5,
      "perCapita": 549.4,
      "popChangePct": 2.84
    },
    {
      "year": 2008,
      "gdp": 27.779,
      "growth": 5.6,
      "perCapita": 681.0,
      "popChangePct": 2.76
    },
    {
      "year": 2009,
      "gdp": 29.301,
      "growth": 5.4,
      "perCapita": 699.7,
      "popChangePct": 2.66
    },
    {
      "year": 2010,
      "gdp": 31.86,
      "growth": 6.4,
      "perCapita": 743.4,
      "popChangePct": 2.34
    },
    {
      "year": 2011,
      "gdp": 34.369,
      "growth": 7.9,
      "perCapita": 780.0,
      "popChangePct": 2.81
    },
    {
      "year": 2012,
      "gdp": 39.65,
      "growth": 5.1,
      "perCapita": 874.8,
      "popChangePct": 2.86
    },
    {
      "year": 2013,
      "gdp": 45.677,
      "growth": 6.8,
      "perCapita": 978.6,
      "popChangePct": 2.98
    },
    {
      "year": 2014,
      "gdp": 49.982,
      "growth": 6.7,
      "perCapita": 1038.2,
      "popChangePct": 3.14
    },
    {
      "year": 2015,
      "gdp": 47.424,
      "growth": 6.2,
      "perCapita": 955.3,
      "popChangePct": 3.11
    },
    {
      "year": 2016,
      "gdp": 49.774,
      "growth": 6.9,
      "perCapita": 968.7,
      "popChangePct": 3.51
    },
    {
      "year": 2017,
      "gdp": 54,
      "growth": 6.7,
      "perCapita": 1016.1,
      "popChangePct": 3.42
    },
    {
      "year": 2018,
      "gdp": 54.775,
      "growth": 7,
      "perCapita": 997.1,
      "popChangePct": 3.37
    },
    {
      "year": 2019,
      "gdp": 58.797,
      "growth": 6.9,
      "perCapita": 1038.7,
      "popChangePct": 3.05
    },
    {
      "year": 2020,
      "gdp": 63.373,
      "growth": 4.5,
      "perCapita": 1086.8,
      "popChangePct": 3.01
    },
    {
      "year": 2021,
      "gdp": 67.964,
      "growth": 4.8,
      "perCapita": 1131.6,
      "popChangePct": 3.01
    },
    {
      "year": 2022,
      "gdp": 74.173,
      "growth": 4.7,
      "perCapita": 1198.9,
      "popChangePct": 3.01
    },
    {
      "year": 2023,
      "gdp": 78.368,
      "growth": 5.1,
      "perCapita": 1229.7,
      "popChangePct": 3.01
    },
    {
      "year": 2024,
      "gdp": 79.236,
      "growth": 5.5,
      "perCapita": 1207.0,
      "popChangePct": 3.01
    },
    {
      "year": 2025,
      "gdp": 87.344,
      "growth": 5.9,
      "perCapita": 1291.7,
      "popChangePct": 3.01
    },
    {
      "year": 2026,
      "gdp": 94.889,
      "growth": 5.9,
      "perCapita": 1362.3,
      "popChangePct": 3.01
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 103.767,
      "growth": 6.1,
      "perCapita": 1446.3,
      "popChangePct": 3.01
    },
    {
      "year": 2028,
      "gdp": 113.93,
      "growth": 6.3,
      "perCapita": 1541.6,
      "popChangePct": 3.01
    },
    {
      "year": 2029,
      "gdp": 125.045,
      "growth": 6.3,
      "perCapita": 1642.6,
      "popChangePct": 3.01
    },
    {
      "year": 2030,
      "gdp": 137.185,
      "growth": 6.3,
      "perCapita": 1749.5,
      "popChangePct": 3.01
    },
    {
      "year": 2031,
      "gdp": 151.961,
      "growth": 6.3,
      "perCapita": 1881.3,
      "popChangePct": 3.01
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 9.107,
      "perCapitaPPP": 495.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 10.018,
      "perCapitaPPP": 528.6,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 3.11
    },
    {
      "year": 1982,
      "gdpPPP": 10.701,
      "perCapitaPPP": 547.6,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 3.09
    },
    {
      "year": 1983,
      "gdpPPP": 11.387,
      "perCapitaPPP": 565.2,
      "perCapitaPPPChangePct": 3.2,
      "popChangePct": 3.11
    },
    {
      "year": 1984,
      "gdpPPP": 12.199,
      "perCapitaPPP": 584.9,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 3.51
    },
    {
      "year": 1985,
      "gdpPPP": 13.164,
      "perCapitaPPP": 612.3,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 3.08
    },
    {
      "year": 1986,
      "gdpPPP": 14.315,
      "perCapitaPPP": 643.0,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 3.55
    },
    {
      "year": 1987,
      "gdpPPP": 15.535,
      "perCapitaPPP": 676.3,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": 3.19
    },
    {
      "year": 1988,
      "gdpPPP": 16.791,
      "perCapitaPPP": 706.6,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 3.44
    },
    {
      "year": 1989,
      "gdpPPP": 18.112,
      "perCapitaPPP": 742.0,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 2.72
    },
    {
      "year": 1990,
      "gdpPPP": 20.114,
      "perCapitaPPP": 802.6,
      "perCapitaPPPChangePct": 8.15,
      "popChangePct": 2.68
    },
    {
      "year": 1991,
      "gdpPPP": 21.225,
      "perCapitaPPP": 825.4,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 2.6
    },
    {
      "year": 1992,
      "gdpPPP": 21.836,
      "perCapitaPPP": 828.2,
      "perCapitaPPPChangePct": 0.33,
      "popChangePct": 2.54
    },
    {
      "year": 1993,
      "gdpPPP": 22.623,
      "perCapitaPPP": 836.9,
      "perCapitaPPPChangePct": 1.06,
      "popChangePct": 2.52
    },
    {
      "year": 1994,
      "gdpPPP": 23.468,
      "perCapitaPPP": 836.1,
      "perCapitaPPPChangePct": -0.1,
      "popChangePct": 3.84
    },
    {
      "year": 1995,
      "gdpPPP": 24.815,
      "perCapitaPPP": 850.2,
      "perCapitaPPPChangePct": 1.68,
      "popChangePct": 3.99
    },
    {
      "year": 1996,
      "gdpPPP": 26.418,
      "perCapitaPPP": 883.6,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 2.43
    },
    {
      "year": 1997,
      "gdpPPP": 27.821,
      "perCapitaPPP": 918.7,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 1.29
    },
    {
      "year": 1998,
      "gdpPPP": 29.177,
      "perCapitaPPP": 938.2,
      "perCapitaPPPChangePct": 2.12,
      "popChangePct": 2.7
    },
    {
      "year": 1999,
      "gdpPPP": 31.022,
      "perCapitaPPP": 972.7,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 2.55
    },
    {
      "year": 2000,
      "gdpPPP": 33.29,
      "perCapitaPPP": 1014.6,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 2.88
    },
    {
      "year": 2001,
      "gdpPPP": 36.081,
      "perCapitaPPP": 1068.8,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 2.89
    },
    {
      "year": 2002,
      "gdpPPP": 39.267,
      "perCapitaPPP": 1133.8,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": 2.6
    },
    {
      "year": 2003,
      "gdpPPP": 42.799,
      "perCapitaPPP": 1203.9,
      "perCapitaPPPChangePct": 6.18,
      "popChangePct": 2.65
    },
    {
      "year": 2004,
      "gdpPPP": 47.391,
      "perCapitaPPP": 1297.9,
      "perCapitaPPPChangePct": 7.81,
      "popChangePct": 2.71
    },
    {
      "year": 2005,
      "gdpPPP": 52.479,
      "perCapitaPPP": 1398.2,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 2.79
    },
    {
      "year": 2006,
      "gdpPPP": 56.619,
      "perCapitaPPP": 1466.9,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 2.84
    },
    {
      "year": 2007,
      "gdpPPP": 63.075,
      "perCapitaPPP": 1589.0,
      "perCapitaPPPChangePct": 8.32,
      "popChangePct": 2.84
    },
    {
      "year": 2008,
      "gdpPPP": 67.869,
      "perCapitaPPP": 1663.8,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 2.76
    },
    {
      "year": 2009,
      "gdpPPP": 71.963,
      "perCapitaPPP": 1718.4,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 2.66
    },
    {
      "year": 2010,
      "gdpPPP": 77.469,
      "perCapitaPPP": 1807.6,
      "perCapitaPPPChangePct": 5.19,
      "popChangePct": 2.34
    },
    {
      "year": 2011,
      "gdpPPP": 85.317,
      "perCapitaPPP": 1936.3,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": 2.81
    },
    {
      "year": 2012,
      "gdpPPP": 91.374,
      "perCapitaPPP": 2016.0,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 2.86
    },
    {
      "year": 2013,
      "gdpPPP": 99.231,
      "perCapitaPPP": 2126.0,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 2.98
    },
    {
      "year": 2014,
      "gdpPPP": 107.757,
      "perCapitaPPP": 2238.4,
      "perCapitaPPPChangePct": 5.28,
      "popChangePct": 3.14
    },
    {
      "year": 2015,
      "gdpPPP": 115.457,
      "perCapitaPPP": 2325.9,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 3.11
    },
    {
      "year": 2016,
      "gdpPPP": 124.558,
      "perCapitaPPP": 2424.1,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 3.51
    },
    {
      "year": 2017,
      "gdpPPP": 135.318,
      "perCapitaPPP": 2546.3,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 3.42
    },
    {
      "year": 2018,
      "gdpPPP": 146.044,
      "perCapitaPPP": 2658.5,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 3.37
    },
    {
      "year": 2019,
      "gdpPPP": 164.885,
      "perCapitaPPP": 2912.8,
      "perCapitaPPPChangePct": 9.57,
      "popChangePct": 3.05
    },
    {
      "year": 2020,
      "gdpPPP": 186.62,
      "perCapitaPPP": 3200.5,
      "perCapitaPPPChangePct": 9.88,
      "popChangePct": 3.01
    },
    {
      "year": 2021,
      "gdpPPP": 204.686,
      "perCapitaPPP": 3407.9,
      "perCapitaPPPChangePct": 6.48,
      "popChangePct": 3.01
    },
    {
      "year": 2022,
      "gdpPPP": 229.473,
      "perCapitaPPP": 3709.0,
      "perCapitaPPPChangePct": 8.84,
      "popChangePct": 3.01
    },
    {
      "year": 2023,
      "gdpPPP": 250.217,
      "perCapitaPPP": 3926.3,
      "perCapitaPPPChangePct": 5.86,
      "popChangePct": 3.01
    },
    {
      "year": 2024,
      "gdpPPP": 270.439,
      "perCapitaPPP": 4119.7,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 3.01
    },
    {
      "year": 2025,
      "gdpPPP": 294.453,
      "perCapitaPPP": 4354.6,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 3.01
    },
    {
      "year": 2026,
      "gdpPPP": 320.879,
      "perCapitaPPP": 4606.9,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 3.01
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 347.94,
      "perCapitaPPP": 4849.5,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 3.01
    },
    {
      "year": 2028,
      "gdpPPP": 375.95,
      "perCapitaPPP": 5087.0,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 3.01
    },
    {
      "year": 2029,
      "gdpPPP": 406.751,
      "perCapitaPPP": 5343.1,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 3.01
    },
    {
      "year": 2030,
      "gdpPPP": 440.146,
      "perCapitaPPP": 5613.0,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 3.01
    },
    {
      "year": 2031,
      "gdpPPP": 476.203,
      "perCapitaPPP": 5895.5,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 3.01
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TanzaniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
