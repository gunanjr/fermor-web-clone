import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Philippines",
  "slug": "philippines",
  "iso3": "PHL",
  "region": "Asia",
  "rank2026": 36,
  "flagEmoji": "🇵🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Malaysia",
      "slug": "malaysia",
      "rank": 35
    },
    {
      "name": "Bangladesh",
      "slug": "bangladesh",
      "rank": 37
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 37.082,
      "growth": 5.1,
      "perCapita": 774.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 40.735,
      "growth": 3.4,
      "perCapita": 829.8,
      "popChangePct": 2.53
    },
    {
      "year": 1982,
      "gdp": 42.441,
      "growth": 3.6,
      "perCapita": 843.5,
      "popChangePct": 2.5
    },
    {
      "year": 1983,
      "gdp": 37.953,
      "growth": 1.9,
      "perCapita": 735.7,
      "popChangePct": 2.52
    },
    {
      "year": 1984,
      "gdp": 35.86,
      "growth": -7.3,
      "perCapita": 678.3,
      "popChangePct": 2.48
    },
    {
      "year": 1985,
      "gdp": 34.973,
      "growth": -7.3,
      "perCapita": 645.6,
      "popChangePct": 2.47
    },
    {
      "year": 1986,
      "gdp": 34.129,
      "growth": 3.4,
      "perCapita": 615.0,
      "popChangePct": 2.43
    },
    {
      "year": 1987,
      "gdp": 37.932,
      "growth": 4.3,
      "perCapita": 666.9,
      "popChangePct": 2.5
    },
    {
      "year": 1988,
      "gdp": 43.293,
      "growth": 6.8,
      "perCapita": 744.3,
      "popChangePct": 2.26
    },
    {
      "year": 1989,
      "gdp": 48.652,
      "growth": 6.2,
      "perCapita": 817.0,
      "popChangePct": 2.39
    },
    {
      "year": 1990,
      "gdp": 50.508,
      "growth": 3,
      "perCapita": 828.8,
      "popChangePct": 2.33
    },
    {
      "year": 1991,
      "gdp": 51.784,
      "growth": -0.4,
      "perCapita": 830.4,
      "popChangePct": 2.33
    },
    {
      "year": 1992,
      "gdp": 60.422,
      "growth": 0.4,
      "perCapita": 946.8,
      "popChangePct": 2.34
    },
    {
      "year": 1993,
      "gdp": 62.037,
      "growth": 2.2,
      "perCapita": 949.7,
      "popChangePct": 2.35
    },
    {
      "year": 1994,
      "gdp": 73.159,
      "growth": 4.4,
      "perCapita": 1094.5,
      "popChangePct": 2.33
    },
    {
      "year": 1995,
      "gdp": 84.644,
      "growth": 4.6,
      "perCapita": 1237.3,
      "popChangePct": 2.35
    },
    {
      "year": 1996,
      "gdp": 94.65,
      "growth": 5.9,
      "perCapita": 1316.4,
      "popChangePct": 5.1
    },
    {
      "year": 1997,
      "gdp": 94.106,
      "growth": 5.2,
      "perCapita": 1279.8,
      "popChangePct": 2.27
    },
    {
      "year": 1998,
      "gdp": 74.492,
      "growth": -0.5,
      "perCapita": 988.5,
      "popChangePct": 2.49
    },
    {
      "year": 1999,
      "gdp": 85.64,
      "growth": 3.3,
      "perCapita": 1112.4,
      "popChangePct": 2.16
    },
    {
      "year": 2000,
      "gdp": 83.667,
      "growth": 4.4,
      "perCapita": 1087.3,
      "popChangePct": -0.05
    },
    {
      "year": 2001,
      "gdp": 78.921,
      "growth": 3,
      "perCapita": 1004.0,
      "popChangePct": 2.16
    },
    {
      "year": 2002,
      "gdp": 84.307,
      "growth": 3.7,
      "perCapita": 1050.3,
      "popChangePct": 2.11
    },
    {
      "year": 2003,
      "gdp": 87.039,
      "growth": 5.1,
      "perCapita": 1062.6,
      "popChangePct": 2.04
    },
    {
      "year": 2004,
      "gdp": 95.002,
      "growth": 6.6,
      "perCapita": 1137.1,
      "popChangePct": 2.0
    },
    {
      "year": 2005,
      "gdp": 107.42,
      "growth": 4.9,
      "perCapita": 1261.2,
      "popChangePct": 1.94
    },
    {
      "year": 2006,
      "gdp": 127.653,
      "growth": 5.3,
      "perCapita": 1470.8,
      "popChangePct": 1.9
    },
    {
      "year": 2007,
      "gdp": 155.98,
      "growth": 6.5,
      "perCapita": 1764.7,
      "popChangePct": 1.84
    },
    {
      "year": 2008,
      "gdp": 181.007,
      "growth": 4.3,
      "perCapita": 2011.6,
      "popChangePct": 1.8
    },
    {
      "year": 2009,
      "gdp": 176.132,
      "growth": 1.4,
      "perCapita": 1923.7,
      "popChangePct": 1.76
    },
    {
      "year": 2010,
      "gdp": 208.369,
      "growth": 7.3,
      "perCapita": 2237.2,
      "popChangePct": 1.73
    },
    {
      "year": 2011,
      "gdp": 234.217,
      "growth": 3.9,
      "perCapita": 2473.2,
      "popChangePct": 1.67
    },
    {
      "year": 2012,
      "gdp": 261.92,
      "growth": 6.9,
      "perCapita": 2721.3,
      "popChangePct": 1.64
    },
    {
      "year": 2013,
      "gdp": 283.903,
      "growth": 6.8,
      "perCapita": 2903.2,
      "popChangePct": 1.6
    },
    {
      "year": 2014,
      "gdp": 297.484,
      "growth": 6.3,
      "perCapita": 2995.5,
      "popChangePct": 1.55
    },
    {
      "year": 2015,
      "gdp": 306.446,
      "growth": 6.3,
      "perCapita": 3039.2,
      "popChangePct": 1.53
    },
    {
      "year": 2016,
      "gdp": 318.627,
      "growth": 7.1,
      "perCapita": 3107.6,
      "popChangePct": 1.69
    },
    {
      "year": 2017,
      "gdp": 328.481,
      "growth": 6.9,
      "perCapita": 3153.3,
      "popChangePct": 1.6
    },
    {
      "year": 2018,
      "gdp": 346.842,
      "growth": 6.3,
      "perCapita": 3279.5,
      "popChangePct": 1.53
    },
    {
      "year": 2019,
      "gdp": 376.823,
      "growth": 6.1,
      "perCapita": 3512.2,
      "popChangePct": 1.45
    },
    {
      "year": 2020,
      "gdp": 361.751,
      "growth": -9.5,
      "perCapita": 3312.7,
      "popChangePct": 1.78
    },
    {
      "year": 2021,
      "gdp": 394.087,
      "growth": 5.7,
      "perCapita": 3580.0,
      "popChangePct": 0.81
    },
    {
      "year": 2022,
      "gdp": 404.353,
      "growth": 7.6,
      "perCapita": 3644.8,
      "popChangePct": 0.78
    },
    {
      "year": 2023,
      "gdp": 437.055,
      "growth": 5.5,
      "perCapita": 3905.4,
      "popChangePct": 0.87
    },
    {
      "year": 2024,
      "gdp": 461.617,
      "growth": 5.7,
      "perCapita": 4089.3,
      "popChangePct": 0.87
    },
    {
      "year": 2025,
      "gdp": 487.161,
      "growth": 4.4,
      "perCapita": 4270.1,
      "popChangePct": 1.06
    },
    {
      "year": 2026,
      "gdp": 512.222,
      "growth": 4.1,
      "perCapita": 4442.6,
      "popChangePct": 1.06
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 556.747,
      "growth": 5.8,
      "perCapita": 4777.9,
      "popChangePct": 1.06
    },
    {
      "year": 2028,
      "gdp": 605.64,
      "growth": 6.1,
      "perCapita": 5142.8,
      "popChangePct": 1.06
    },
    {
      "year": 2029,
      "gdp": 658.454,
      "growth": 6.1,
      "perCapita": 5532.4,
      "popChangePct": 1.06
    },
    {
      "year": 2030,
      "gdp": 715.542,
      "growth": 6,
      "perCapita": 5948.8,
      "popChangePct": 1.06
    },
    {
      "year": 2031,
      "gdp": 777.576,
      "growth": 6,
      "perCapita": 6396.5,
      "popChangePct": 1.06
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 85.411,
      "perCapitaPPP": 1783.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 96.693,
      "perCapitaPPP": 1969.8,
      "perCapitaPPPChangePct": 10.42,
      "popChangePct": 2.53
    },
    {
      "year": 1982,
      "gdpPPP": 106.384,
      "perCapitaPPP": 2114.2,
      "perCapitaPPPChangePct": 7.34,
      "popChangePct": 2.5
    },
    {
      "year": 1983,
      "gdpPPP": 112.622,
      "perCapitaPPP": 2183.2,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 2.52
    },
    {
      "year": 1984,
      "gdpPPP": 108.141,
      "perCapitaPPP": 2045.6,
      "perCapitaPPPChangePct": -6.3,
      "popChangePct": 2.48
    },
    {
      "year": 1985,
      "gdpPPP": 103.409,
      "perCapitaPPP": 1908.9,
      "perCapitaPPPChangePct": -6.68,
      "popChangePct": 2.47
    },
    {
      "year": 1986,
      "gdpPPP": 109.096,
      "perCapitaPPP": 1966.0,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 2.43
    },
    {
      "year": 1987,
      "gdpPPP": 116.62,
      "perCapitaPPP": 2050.4,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 2.5
    },
    {
      "year": 1988,
      "gdpPPP": 128.885,
      "perCapitaPPP": 2215.8,
      "perCapitaPPPChangePct": 8.07,
      "popChangePct": 2.26
    },
    {
      "year": 1989,
      "gdpPPP": 142.25,
      "perCapitaPPP": 2388.6,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 2.39
    },
    {
      "year": 1990,
      "gdpPPP": 152.056,
      "perCapitaPPP": 2495.2,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 2.33
    },
    {
      "year": 1991,
      "gdpPPP": 156.513,
      "perCapitaPPP": 2509.8,
      "perCapitaPPPChangePct": 0.59,
      "popChangePct": 2.33
    },
    {
      "year": 1992,
      "gdpPPP": 160.748,
      "perCapitaPPP": 2518.8,
      "perCapitaPPPChangePct": 0.36,
      "popChangePct": 2.34
    },
    {
      "year": 1993,
      "gdpPPP": 168.149,
      "perCapitaPPP": 2574.2,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 2.35
    },
    {
      "year": 1994,
      "gdpPPP": 179.251,
      "perCapitaPPP": 2681.8,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 2.33
    },
    {
      "year": 1995,
      "gdpPPP": 191.473,
      "perCapitaPPP": 2798.9,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 2.35
    },
    {
      "year": 1996,
      "gdpPPP": 206.405,
      "perCapitaPPP": 2870.7,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 5.1
    },
    {
      "year": 1997,
      "gdpPPP": 220.854,
      "perCapitaPPP": 3003.6,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 2.27
    },
    {
      "year": 1998,
      "gdpPPP": 222.188,
      "perCapitaPPP": 2948.4,
      "perCapitaPPPChangePct": -1.84,
      "popChangePct": 2.49
    },
    {
      "year": 1999,
      "gdpPPP": 232.873,
      "perCapitaPPP": 3024.7,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 2.16
    },
    {
      "year": 2000,
      "gdpPPP": 248.585,
      "perCapitaPPP": 3230.5,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": -0.05
    },
    {
      "year": 2001,
      "gdpPPP": 261.932,
      "perCapitaPPP": 3332.0,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 2.16
    },
    {
      "year": 2002,
      "gdpPPP": 275.888,
      "perCapitaPPP": 3437.0,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 2.11
    },
    {
      "year": 2003,
      "gdpPPP": 295.646,
      "perCapitaPPP": 3609.4,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 2.04
    },
    {
      "year": 2004,
      "gdpPPP": 323.54,
      "perCapitaPPP": 3872.4,
      "perCapitaPPPChangePct": 7.29,
      "popChangePct": 2.0
    },
    {
      "year": 2005,
      "gdpPPP": 350.178,
      "perCapitaPPP": 4111.5,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 1.94
    },
    {
      "year": 2006,
      "gdpPPP": 380.168,
      "perCapitaPPP": 4380.3,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 1.9
    },
    {
      "year": 2007,
      "gdpPPP": 415.923,
      "perCapitaPPP": 4705.5,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": 1.84
    },
    {
      "year": 2008,
      "gdpPPP": 442.353,
      "perCapitaPPP": 4916.1,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 1.8
    },
    {
      "year": 2009,
      "gdpPPP": 451.528,
      "perCapitaPPP": 4931.5,
      "perCapitaPPPChangePct": 0.31,
      "popChangePct": 1.76
    },
    {
      "year": 2010,
      "gdpPPP": 490.535,
      "perCapitaPPP": 5266.6,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 1.73
    },
    {
      "year": 2011,
      "gdpPPP": 519.973,
      "perCapitaPPP": 5490.7,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 1.67
    },
    {
      "year": 2012,
      "gdpPPP": 566.184,
      "perCapitaPPP": 5882.4,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 1.64
    },
    {
      "year": 2013,
      "gdpPPP": 614.692,
      "perCapitaPPP": 6285.8,
      "perCapitaPPPChangePct": 6.86,
      "popChangePct": 1.6
    },
    {
      "year": 2014,
      "gdpPPP": 665.098,
      "perCapitaPPP": 6697.2,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 1.55
    },
    {
      "year": 2015,
      "gdpPPP": 713.885,
      "perCapitaPPP": 7080.1,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.53
    },
    {
      "year": 2016,
      "gdpPPP": 772.192,
      "perCapitaPPP": 7531.4,
      "perCapitaPPPChangePct": 6.37,
      "popChangePct": 1.69
    },
    {
      "year": 2017,
      "gdpPPP": 840.501,
      "perCapitaPPP": 8068.5,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 1.6
    },
    {
      "year": 2018,
      "gdpPPP": 914.883,
      "perCapitaPPP": 8650.6,
      "perCapitaPPPChangePct": 7.21,
      "popChangePct": 1.53
    },
    {
      "year": 2019,
      "gdpPPP": 988.832,
      "perCapitaPPP": 9216.4,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 1.45
    },
    {
      "year": 2020,
      "gdpPPP": 923.367,
      "perCapitaPPP": 8455.7,
      "perCapitaPPPChangePct": -8.25,
      "popChangePct": 1.78
    },
    {
      "year": 2021,
      "gdpPPP": 1001.825,
      "perCapitaPPP": 9100.9,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 0.81
    },
    {
      "year": 2022,
      "gdpPPP": 1154.428,
      "perCapitaPPP": 10405.9,
      "perCapitaPPPChangePct": 14.34,
      "popChangePct": 0.78
    },
    {
      "year": 2023,
      "gdpPPP": 1263.212,
      "perCapitaPPP": 11287.8,
      "perCapitaPPPChangePct": 8.47,
      "popChangePct": 0.87
    },
    {
      "year": 2024,
      "gdpPPP": 1368.259,
      "perCapitaPPP": 12120.8,
      "perCapitaPPPChangePct": 7.38,
      "popChangePct": 0.87
    },
    {
      "year": 2025,
      "gdpPPP": 1469.033,
      "perCapitaPPP": 12876.6,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 1.06
    },
    {
      "year": 2026,
      "gdpPPP": 1572.561,
      "perCapitaPPP": 13639.0,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": 1.06
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1699.893,
      "perCapitaPPP": 14588.2,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": 1.06
    },
    {
      "year": 2028,
      "gdpPPP": 1832.805,
      "perCapitaPPP": 15563.3,
      "perCapitaPPPChangePct": 6.68,
      "popChangePct": 1.06
    },
    {
      "year": 2029,
      "gdpPPP": 1978.359,
      "perCapitaPPP": 16622.4,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 1.06
    },
    {
      "year": 2030,
      "gdpPPP": 2135.729,
      "perCapitaPPP": 17755.8,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 1.06
    },
    {
      "year": 2031,
      "gdpPPP": 2304.874,
      "perCapitaPPP": 18960.4,
      "perCapitaPPPChangePct": 6.78,
      "popChangePct": 1.06
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PhilippinesGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
