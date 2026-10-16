import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Egypt",
  "slug": "egypt",
  "iso3": "EGY",
  "region": "Africa",
  "rank2026": 43,
  "flagEmoji": "🇪🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Czech Republic (Czechia)",
      "slug": "czech-republic-czechia",
      "rank": 42
    },
    {
      "name": "Chile",
      "slug": "chile",
      "rank": 44
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 23.523,
      "growth": 3.4,
      "perCapita": 580.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 25.76,
      "growth": 2.2,
      "perCapita": 617.7,
      "popChangePct": 2.84
    },
    {
      "year": 1982,
      "gdp": 30.479,
      "growth": 7.3,
      "perCapita": 711.4,
      "popChangePct": 2.73
    },
    {
      "year": 1983,
      "gdp": 37.254,
      "growth": 8.9,
      "perCapita": 846.4,
      "popChangePct": 2.73
    },
    {
      "year": 1984,
      "gdp": 41.888,
      "growth": 8,
      "perCapita": 926.0,
      "popChangePct": 2.78
    },
    {
      "year": 1985,
      "gdp": 48.841,
      "growth": 7.4,
      "perCapita": 1049.3,
      "popChangePct": 2.89
    },
    {
      "year": 1986,
      "gdp": 54.076,
      "growth": 4.8,
      "perCapita": 1132.5,
      "popChangePct": 2.59
    },
    {
      "year": 1987,
      "gdp": 77.359,
      "growth": 4.3,
      "perCapita": 1585.2,
      "popChangePct": 2.2
    },
    {
      "year": 1988,
      "gdp": 92.53,
      "growth": 4,
      "perCapita": 1858.0,
      "popChangePct": 2.05
    },
    {
      "year": 1989,
      "gdp": 115.362,
      "growth": 3,
      "perCapita": 2266.4,
      "popChangePct": 2.21
    },
    {
      "year": 1990,
      "gdp": 96.087,
      "growth": 2.3,
      "perCapita": 1870.8,
      "popChangePct": 0.9
    },
    {
      "year": 1991,
      "gdp": 48.431,
      "growth": 2.1,
      "perCapita": 923.8,
      "popChangePct": 2.07
    },
    {
      "year": 1992,
      "gdp": 44.168,
      "growth": 0.3,
      "perCapita": 825.4,
      "popChangePct": 2.07
    },
    {
      "year": 1993,
      "gdp": 49.526,
      "growth": 2.9,
      "perCapita": 897.2,
      "popChangePct": 3.16
    },
    {
      "year": 1994,
      "gdp": 54.55,
      "growth": 4.2,
      "perCapita": 968.9,
      "popChangePct": 1.99
    },
    {
      "year": 1995,
      "gdp": 63.25,
      "growth": 4.5,
      "perCapita": 1098.1,
      "popChangePct": 2.31
    },
    {
      "year": 1996,
      "gdp": 71.118,
      "growth": 4.9,
      "perCapita": 1209.5,
      "popChangePct": 2.08
    },
    {
      "year": 1997,
      "gdp": 79.777,
      "growth": 5.9,
      "perCapita": 1327.4,
      "popChangePct": 2.21
    },
    {
      "year": 1998,
      "gdp": 89.189,
      "growth": 7.5,
      "perCapita": 1455.0,
      "popChangePct": 2.0
    },
    {
      "year": 1999,
      "gdp": 95.039,
      "growth": 6.1,
      "perCapita": 1518.2,
      "popChangePct": 2.12
    },
    {
      "year": 2000,
      "gdp": 104.752,
      "growth": 5.4,
      "perCapita": 1636.8,
      "popChangePct": 2.24
    },
    {
      "year": 2001,
      "gdp": 102.273,
      "growth": 3.5,
      "perCapita": 1566.2,
      "popChangePct": 2.03
    },
    {
      "year": 2002,
      "gdp": 90.261,
      "growth": 3.2,
      "perCapita": 1355.3,
      "popChangePct": 1.99
    },
    {
      "year": 2003,
      "gdp": 85.163,
      "growth": 3.2,
      "perCapita": 1252.4,
      "popChangePct": 2.1
    },
    {
      "year": 2004,
      "gdp": 82.855,
      "growth": 4.1,
      "perCapita": 1195.6,
      "popChangePct": 1.91
    },
    {
      "year": 2005,
      "gdp": 94.127,
      "growth": 4.5,
      "perCapita": 1331.4,
      "popChangePct": 2.02
    },
    {
      "year": 2006,
      "gdp": 112.902,
      "growth": 6.8,
      "perCapita": 1563.7,
      "popChangePct": 2.12
    },
    {
      "year": 2007,
      "gdp": 137.055,
      "growth": 7.1,
      "perCapita": 1862.2,
      "popChangePct": 1.94
    },
    {
      "year": 2008,
      "gdp": 170.797,
      "growth": 7.2,
      "perCapita": 2271.2,
      "popChangePct": 2.17
    },
    {
      "year": 2009,
      "gdp": 198.316,
      "growth": 4.7,
      "perCapita": 2578.9,
      "popChangePct": 2.26
    },
    {
      "year": 2010,
      "gdp": 230.024,
      "growth": 5.1,
      "perCapita": 2922.8,
      "popChangePct": 2.34
    },
    {
      "year": 2011,
      "gdp": 247.726,
      "growth": 1.8,
      "perCapita": 3077.3,
      "popChangePct": 2.29
    },
    {
      "year": 2012,
      "gdp": 294.482,
      "growth": 2.2,
      "perCapita": 3569.5,
      "popChangePct": 2.48
    },
    {
      "year": 2013,
      "gdp": 303.194,
      "growth": 3.3,
      "perCapita": 3583.9,
      "popChangePct": 2.55
    },
    {
      "year": 2014,
      "gdp": 321.634,
      "growth": 2.9,
      "perCapita": 3705.5,
      "popChangePct": 2.6
    },
    {
      "year": 2015,
      "gdp": 350.119,
      "growth": 4.4,
      "perCapita": 3933.9,
      "popChangePct": 2.53
    },
    {
      "year": 2016,
      "gdp": 351.443,
      "growth": 4.3,
      "perCapita": 3862.0,
      "popChangePct": 2.25
    },
    {
      "year": 2017,
      "gdp": 246.826,
      "growth": 4.2,
      "perCapita": 2592.7,
      "popChangePct": 4.62
    },
    {
      "year": 2018,
      "gdp": 263.156,
      "growth": 5.3,
      "perCapita": 2710.2,
      "popChangePct": 2.0
    },
    {
      "year": 2019,
      "gdp": 317.894,
      "growth": 5.5,
      "perCapita": 3214.3,
      "popChangePct": 1.85
    },
    {
      "year": 2020,
      "gdp": 382.525,
      "growth": 3.6,
      "perCapita": 3802.4,
      "popChangePct": 1.72
    },
    {
      "year": 2021,
      "gdp": 423.3,
      "growth": 3.3,
      "perCapita": 4145.9,
      "popChangePct": 1.49
    },
    {
      "year": 2022,
      "gdp": 475.231,
      "growth": 6.7,
      "perCapita": 4587.2,
      "popChangePct": 1.47
    },
    {
      "year": 2023,
      "gdp": 393.828,
      "growth": 3.8,
      "perCapita": 3743.6,
      "popChangePct": 1.54
    },
    {
      "year": 2024,
      "gdp": 383.105,
      "growth": 2.4,
      "perCapita": 3593.9,
      "popChangePct": 1.33
    },
    {
      "year": 2025,
      "gdp": 364.64,
      "growth": 4.4,
      "perCapita": 3379.4,
      "popChangePct": 1.22
    },
    {
      "year": 2026,
      "gdp": 429.645,
      "growth": 4.2,
      "perCapita": 3903.8,
      "popChangePct": 2.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 457.075,
      "growth": 4.8,
      "perCapita": 4071.6,
      "popChangePct": 2.0
    },
    {
      "year": 2028,
      "gdp": 508.47,
      "growth": 5.5,
      "perCapita": 4440.6,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdp": 560.081,
      "growth": 5.2,
      "perCapita": 4795.4,
      "popChangePct": 2.0
    },
    {
      "year": 2030,
      "gdp": 610.982,
      "growth": 4.8,
      "perCapita": 5078.9,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdp": 665.595,
      "growth": 4.8,
      "perCapita": 5320.1,
      "popChangePct": 4.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 88.009,
      "perCapitaPPP": 2170.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 98.453,
      "perCapitaPPP": 2360.7,
      "perCapitaPPPChangePct": 8.78,
      "popChangePct": 2.84
    },
    {
      "year": 1982,
      "gdpPPP": 112.165,
      "perCapitaPPP": 2617.9,
      "perCapitaPPPChangePct": 10.9,
      "popChangePct": 2.73
    },
    {
      "year": 1983,
      "gdpPPP": 126.903,
      "perCapitaPPP": 2883.2,
      "perCapitaPPPChangePct": 10.13,
      "popChangePct": 2.73
    },
    {
      "year": 1984,
      "gdpPPP": 142.029,
      "perCapitaPPP": 3139.7,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": 2.78
    },
    {
      "year": 1985,
      "gdpPPP": 157.4,
      "perCapitaPPP": 3381.7,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": 2.89
    },
    {
      "year": 1986,
      "gdpPPP": 168.211,
      "perCapitaPPP": 3522.7,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 2.59
    },
    {
      "year": 1987,
      "gdpPPP": 179.745,
      "perCapitaPPP": 3683.3,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 2.2
    },
    {
      "year": 1988,
      "gdpPPP": 193.515,
      "perCapitaPPP": 3885.8,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 2.05
    },
    {
      "year": 1989,
      "gdpPPP": 207.122,
      "perCapitaPPP": 4069.2,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 2.21
    },
    {
      "year": 1990,
      "gdpPPP": 219.922,
      "perCapitaPPP": 4281.9,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 0.9
    },
    {
      "year": 1991,
      "gdpPPP": 232.135,
      "perCapitaPPP": 4428.1,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 2.07
    },
    {
      "year": 1992,
      "gdpPPP": 238.138,
      "perCapitaPPP": 4450.5,
      "perCapitaPPPChangePct": 0.5,
      "popChangePct": 2.07
    },
    {
      "year": 1993,
      "gdpPPP": 250.852,
      "perCapitaPPP": 4544.4,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 3.16
    },
    {
      "year": 1994,
      "gdpPPP": 266.937,
      "perCapitaPPP": 4741.3,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 1.99
    },
    {
      "year": 1995,
      "gdpPPP": 284.753,
      "perCapitaPPP": 4943.6,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 2.31
    },
    {
      "year": 1996,
      "gdpPPP": 304.114,
      "perCapitaPPP": 5172.0,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 2.08
    },
    {
      "year": 1997,
      "gdpPPP": 327.669,
      "perCapitaPPP": 5452.1,
      "perCapitaPPPChangePct": 5.42,
      "popChangePct": 2.21
    },
    {
      "year": 1998,
      "gdpPPP": 356.345,
      "perCapitaPPP": 5813.1,
      "perCapitaPPPChangePct": 6.62,
      "popChangePct": 2.0
    },
    {
      "year": 1999,
      "gdpPPP": 383.468,
      "perCapitaPPP": 6125.7,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 2.12
    },
    {
      "year": 2000,
      "gdpPPP": 413.265,
      "perCapitaPPP": 6457.3,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 2.24
    },
    {
      "year": 2001,
      "gdpPPP": 437.462,
      "perCapitaPPP": 6699.3,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 2.03
    },
    {
      "year": 2002,
      "gdpPPP": 458.413,
      "perCapitaPPP": 6883.1,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 1.99
    },
    {
      "year": 2003,
      "gdpPPP": 482.391,
      "perCapitaPPP": 7094.0,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": 2.1
    },
    {
      "year": 2004,
      "gdpPPP": 515.632,
      "perCapitaPPP": 7440.6,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 1.91
    },
    {
      "year": 2005,
      "gdpPPP": 555.583,
      "perCapitaPPP": 7858.3,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 2.02
    },
    {
      "year": 2006,
      "gdpPPP": 611.912,
      "perCapitaPPP": 8475.2,
      "perCapitaPPPChangePct": 7.85,
      "popChangePct": 2.12
    },
    {
      "year": 2007,
      "gdpPPP": 673.036,
      "perCapitaPPP": 9144.5,
      "perCapitaPPPChangePct": 7.9,
      "popChangePct": 1.94
    },
    {
      "year": 2008,
      "gdpPPP": 735.094,
      "perCapitaPPP": 9775.2,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": 2.17
    },
    {
      "year": 2009,
      "gdpPPP": 774.195,
      "perCapitaPPP": 10067.6,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 2.26
    },
    {
      "year": 2010,
      "gdpPPP": 823.938,
      "perCapitaPPP": 10469.4,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.34
    },
    {
      "year": 2011,
      "gdpPPP": 855.777,
      "perCapitaPPP": 10630.8,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 2.29
    },
    {
      "year": 2012,
      "gdpPPP": 891.117,
      "perCapitaPPP": 10801.4,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 2.48
    },
    {
      "year": 2013,
      "gdpPPP": 936.209,
      "perCapitaPPP": 11066.3,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 2.55
    },
    {
      "year": 2014,
      "gdpPPP": 980.427,
      "perCapitaPPP": 11295.2,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 2.6
    },
    {
      "year": 2015,
      "gdpPPP": 1032.671,
      "perCapitaPPP": 11603.0,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 2.53
    },
    {
      "year": 2016,
      "gdpPPP": 1087.724,
      "perCapitaPPP": 11953.0,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 2.25
    },
    {
      "year": 2017,
      "gdpPPP": 1153.591,
      "perCapitaPPP": 12117.6,
      "perCapitaPPPChangePct": 1.38,
      "popChangePct": 4.62
    },
    {
      "year": 2018,
      "gdpPPP": 1302.98,
      "perCapitaPPP": 13419.0,
      "perCapitaPPPChangePct": 10.74,
      "popChangePct": 2.0
    },
    {
      "year": 2019,
      "gdpPPP": 1437.312,
      "perCapitaPPP": 14533.0,
      "perCapitaPPPChangePct": 8.3,
      "popChangePct": 1.85
    },
    {
      "year": 2020,
      "gdpPPP": 1665.073,
      "perCapitaPPP": 16551.4,
      "perCapitaPPPChangePct": 13.89,
      "popChangePct": 1.72
    },
    {
      "year": 2021,
      "gdpPPP": 1728.601,
      "perCapitaPPP": 16930.5,
      "perCapitaPPPChangePct": 2.29,
      "popChangePct": 1.49
    },
    {
      "year": 2022,
      "gdpPPP": 1974.699,
      "perCapitaPPP": 19060.8,
      "perCapitaPPPChangePct": 12.58,
      "popChangePct": 1.47
    },
    {
      "year": 2023,
      "gdpPPP": 2124.765,
      "perCapitaPPP": 20197.4,
      "perCapitaPPPChangePct": 5.96,
      "popChangePct": 1.54
    },
    {
      "year": 2024,
      "gdpPPP": 2229.748,
      "perCapitaPPP": 20917.0,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 1.33
    },
    {
      "year": 2025,
      "gdpPPP": 2393.718,
      "perCapitaPPP": 22184.6,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 1.22
    },
    {
      "year": 2026,
      "gdpPPP": 2566.688,
      "perCapitaPPP": 23321.2,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": 2.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2749.723,
      "perCapitaPPP": 24494.4,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 2.0
    },
    {
      "year": 2028,
      "gdpPPP": 2949.561,
      "perCapitaPPP": 25759.4,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdpPPP": 3158.91,
      "perCapitaPPP": 27046.8,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 2.0
    },
    {
      "year": 2030,
      "gdpPPP": 3372.717,
      "perCapitaPPP": 28036.3,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdpPPP": 3598.031,
      "perCapitaPPP": 28758.9,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 4.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function EgyptGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
