import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "South Korea",
  "slug": "south-korea",
  "iso3": "KOR",
  "region": "Asia",
  "rank2026": 15,
  "flagEmoji": "🇰🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Spain",
      "slug": "spain",
      "rank": 14
    },
    {
      "name": "Turkey",
      "slug": "turkey",
      "rank": 16
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 66.517,
      "growth": -1.5,
      "perCapita": 1744.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 74.287,
      "growth": 7.4,
      "perCapita": 1918.4,
      "popChangePct": 1.57
    },
    {
      "year": 1982,
      "gdp": 79.912,
      "growth": 8.5,
      "perCapita": 2032.0,
      "popChangePct": 1.56
    },
    {
      "year": 1983,
      "gdp": 89.621,
      "growth": 13.5,
      "perCapita": 2245.6,
      "popChangePct": 1.49
    },
    {
      "year": 1984,
      "gdp": 99.75,
      "growth": 10.6,
      "perCapita": 2468.7,
      "popChangePct": 1.24
    },
    {
      "year": 1985,
      "gdp": 103.764,
      "growth": 7.9,
      "perCapita": 2542.9,
      "popChangePct": 0.99
    },
    {
      "year": 1986,
      "gdp": 119.966,
      "growth": 11.5,
      "perCapita": 2910.8,
      "popChangePct": 1.0
    },
    {
      "year": 1987,
      "gdp": 152.241,
      "growth": 12.9,
      "perCapita": 3657.7,
      "popChangePct": 0.99
    },
    {
      "year": 1988,
      "gdp": 205.479,
      "growth": 12.1,
      "perCapita": 4888.7,
      "popChangePct": 0.98
    },
    {
      "year": 1989,
      "gdp": 254.236,
      "growth": 7.2,
      "perCapita": 5989.2,
      "popChangePct": 0.99
    },
    {
      "year": 1990,
      "gdp": 292.064,
      "growth": 10,
      "perCapita": 6812.9,
      "popChangePct": 0.99
    },
    {
      "year": 1991,
      "gdp": 340.863,
      "growth": 10.9,
      "perCapita": 7872.9,
      "popChangePct": 1.0
    },
    {
      "year": 1992,
      "gdp": 366.912,
      "growth": 6.4,
      "perCapita": 8386.9,
      "popChangePct": 1.04
    },
    {
      "year": 1993,
      "gdp": 405.772,
      "growth": 7,
      "perCapita": 9181.5,
      "popChangePct": 1.02
    },
    {
      "year": 1994,
      "gdp": 478.988,
      "growth": 9.4,
      "perCapita": 10729.6,
      "popChangePct": 1.01
    },
    {
      "year": 1995,
      "gdp": 586.301,
      "growth": 9.7,
      "perCapita": 13002.0,
      "popChangePct": 1.01
    },
    {
      "year": 1996,
      "gdp": 631.194,
      "growth": 8,
      "perCapita": 13864.9,
      "popChangePct": 0.96
    },
    {
      "year": 1997,
      "gdp": 590.07,
      "growth": 6.3,
      "perCapita": 12840.6,
      "popChangePct": 0.94
    },
    {
      "year": 1998,
      "gdp": 396.803,
      "growth": -4.9,
      "perCapita": 8572.8,
      "popChangePct": 0.72
    },
    {
      "year": 1999,
      "gdp": 515.427,
      "growth": 11.6,
      "perCapita": 11056.7,
      "popChangePct": 0.71
    },
    {
      "year": 2000,
      "gdp": 597.802,
      "growth": 9.2,
      "perCapita": 12717.0,
      "popChangePct": 0.84
    },
    {
      "year": 2001,
      "gdp": 567.655,
      "growth": 4.7,
      "perCapita": 11983.4,
      "popChangePct": 0.77
    },
    {
      "year": 2002,
      "gdp": 649.747,
      "growth": 7.7,
      "perCapita": 13637.3,
      "popChangePct": 0.58
    },
    {
      "year": 2003,
      "gdp": 728.497,
      "growth": 3.1,
      "perCapita": 15211.1,
      "popChangePct": 0.52
    },
    {
      "year": 2004,
      "gdp": 822.583,
      "growth": 5.2,
      "perCapita": 17107.7,
      "popChangePct": 0.4
    },
    {
      "year": 2005,
      "gdp": 971.54,
      "growth": 4.4,
      "perCapita": 20162.9,
      "popChangePct": 0.21
    },
    {
      "year": 2006,
      "gdp": 1094.545,
      "growth": 5.2,
      "perCapita": 22596.7,
      "popChangePct": 0.53
    },
    {
      "year": 2007,
      "gdp": 1220.756,
      "growth": 5.8,
      "perCapita": 25075.3,
      "popChangePct": 0.51
    },
    {
      "year": 2008,
      "gdp": 1093.487,
      "growth": 3,
      "perCapita": 22291.2,
      "popChangePct": 0.76
    },
    {
      "year": 2009,
      "gdp": 982.854,
      "growth": 0.8,
      "perCapita": 19933.0,
      "popChangePct": 0.52
    },
    {
      "year": 2010,
      "gdp": 1192.722,
      "growth": 7,
      "perCapita": 24069.1,
      "popChangePct": 0.5
    },
    {
      "year": 2011,
      "gdp": 1307.239,
      "growth": 3.7,
      "perCapita": 26177.9,
      "popChangePct": 0.77
    },
    {
      "year": 2012,
      "gdp": 1335.344,
      "growth": 2.5,
      "perCapita": 26600.5,
      "popChangePct": 0.53
    },
    {
      "year": 2013,
      "gdp": 1434.67,
      "growth": 3.3,
      "perCapita": 28449.4,
      "popChangePct": 0.46
    },
    {
      "year": 2014,
      "gdp": 1556.252,
      "growth": 3.2,
      "perCapita": 30667.1,
      "popChangePct": 0.63
    },
    {
      "year": 2015,
      "gdp": 1539.212,
      "growth": 2.9,
      "perCapita": 30171.8,
      "popChangePct": 0.53
    },
    {
      "year": 2016,
      "gdp": 1578.816,
      "growth": 3.2,
      "perCapita": 30825.5,
      "popChangePct": 0.4
    },
    {
      "year": 2017,
      "gdp": 1710.197,
      "growth": 3.4,
      "perCapita": 33297.0,
      "popChangePct": 0.28
    },
    {
      "year": 2018,
      "gdp": 1824.251,
      "growth": 3.2,
      "perCapita": 35364.0,
      "popChangePct": 0.43
    },
    {
      "year": 2019,
      "gdp": 1751.046,
      "growth": 2.3,
      "perCapita": 33826.9,
      "popChangePct": 0.35
    },
    {
      "year": 2020,
      "gdp": 1744.455,
      "growth": -0.7,
      "perCapita": 33653.2,
      "popChangePct": 0.14
    },
    {
      "year": 2021,
      "gdp": 1942.314,
      "growth": 4.6,
      "perCapita": 37518.5,
      "popChangePct": -0.13
    },
    {
      "year": 2022,
      "gdp": 1799.363,
      "growth": 2.7,
      "perCapita": 34822.4,
      "popChangePct": -0.19
    },
    {
      "year": 2023,
      "gdp": 1844.801,
      "growth": 1.6,
      "perCapita": 35674.1,
      "popChangePct": 0.08
    },
    {
      "year": 2024,
      "gdp": 1875.388,
      "growth": 2,
      "perCapita": 36238.6,
      "popChangePct": 0.07
    },
    {
      "year": 2025,
      "gdp": 1872.375,
      "growth": 1,
      "perCapita": 36227.0,
      "popChangePct": -0.13
    },
    {
      "year": 2026,
      "gdp": 1931.008,
      "growth": 1.9,
      "perCapita": 37412.1,
      "popChangePct": -0.14
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2010.456,
      "growth": 2.1,
      "perCapita": 39011.8,
      "popChangePct": -0.15
    },
    {
      "year": 2028,
      "gdp": 2094.331,
      "growth": 2.2,
      "perCapita": 40694.6,
      "popChangePct": -0.14
    },
    {
      "year": 2029,
      "gdp": 2181.451,
      "growth": 2,
      "perCapita": 42453.5,
      "popChangePct": -0.16
    },
    {
      "year": 2030,
      "gdp": 2266.933,
      "growth": 1.9,
      "perCapita": 44177.2,
      "popChangePct": -0.14
    },
    {
      "year": 2031,
      "gdp": 2357.31,
      "growth": 1.9,
      "perCapita": 46019.2,
      "popChangePct": -0.18
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 83.857,
      "perCapitaPPP": 2199.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 98.587,
      "perCapitaPPP": 2545.9,
      "perCapitaPPPChangePct": 15.75,
      "popChangePct": 1.57
    },
    {
      "year": 1982,
      "gdpPPP": 113.543,
      "perCapitaPPP": 2887.2,
      "perCapitaPPPChangePct": 13.4,
      "popChangePct": 1.56
    },
    {
      "year": 1983,
      "gdpPPP": 133.879,
      "perCapitaPPP": 3354.5,
      "perCapitaPPPChangePct": 16.18,
      "popChangePct": 1.49
    },
    {
      "year": 1984,
      "gdpPPP": 153.465,
      "perCapitaPPP": 3798.1,
      "perCapitaPPPChangePct": 13.22,
      "popChangePct": 1.24
    },
    {
      "year": 1985,
      "gdpPPP": 170.886,
      "perCapitaPPP": 4187.8,
      "perCapitaPPPChangePct": 10.26,
      "popChangePct": 0.99
    },
    {
      "year": 1986,
      "gdpPPP": 194.38,
      "perCapitaPPP": 4716.4,
      "perCapitaPPPChangePct": 12.62,
      "popChangePct": 1.0
    },
    {
      "year": 1987,
      "gdpPPP": 224.877,
      "perCapitaPPP": 5402.9,
      "perCapitaPPPChangePct": 14.56,
      "popChangePct": 0.99
    },
    {
      "year": 1988,
      "gdpPPP": 261.055,
      "perCapitaPPP": 6211.0,
      "perCapitaPPPChangePct": 14.96,
      "popChangePct": 0.98
    },
    {
      "year": 1989,
      "gdpPPP": 290.73,
      "perCapitaPPP": 6848.9,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 0.99
    },
    {
      "year": 1990,
      "gdpPPP": 331.846,
      "perCapitaPPP": 7740.9,
      "perCapitaPPPChangePct": 13.02,
      "popChangePct": 0.99
    },
    {
      "year": 1991,
      "gdpPPP": 380.38,
      "perCapitaPPP": 8785.6,
      "perCapitaPPPChangePct": 13.5,
      "popChangePct": 1.0
    },
    {
      "year": 1992,
      "gdpPPP": 413.759,
      "perCapitaPPP": 9457.8,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": 1.04
    },
    {
      "year": 1993,
      "gdpPPP": 453.193,
      "perCapitaPPP": 10254.5,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": 1.02
    },
    {
      "year": 1994,
      "gdpPPP": 506.25,
      "perCapitaPPP": 11340.3,
      "perCapitaPPPChangePct": 10.59,
      "popChangePct": 1.01
    },
    {
      "year": 1995,
      "gdpPPP": 567.184,
      "perCapitaPPP": 12578.1,
      "perCapitaPPPChangePct": 10.91,
      "popChangePct": 1.01
    },
    {
      "year": 1996,
      "gdpPPP": 623.719,
      "perCapitaPPP": 13700.7,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 0.96
    },
    {
      "year": 1997,
      "gdpPPP": 674.333,
      "perCapitaPPP": 14674.2,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": 0.94
    },
    {
      "year": 1998,
      "gdpPPP": 648.233,
      "perCapitaPPP": 14004.8,
      "perCapitaPPPChangePct": -4.56,
      "popChangePct": 0.72
    },
    {
      "year": 1999,
      "gdpPPP": 733.779,
      "perCapitaPPP": 15740.7,
      "perCapitaPPPChangePct": 12.39,
      "popChangePct": 0.71
    },
    {
      "year": 2000,
      "gdpPPP": 819.451,
      "perCapitaPPP": 17432.1,
      "perCapitaPPPChangePct": 10.75,
      "popChangePct": 0.84
    },
    {
      "year": 2001,
      "gdpPPP": 877.501,
      "perCapitaPPP": 18524.3,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": 0.77
    },
    {
      "year": 2002,
      "gdpPPP": 960.147,
      "perCapitaPPP": 20152.2,
      "perCapitaPPPChangePct": 8.79,
      "popChangePct": 0.58
    },
    {
      "year": 2003,
      "gdpPPP": 1009.207,
      "perCapitaPPP": 21072.4,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.52
    },
    {
      "year": 2004,
      "gdpPPP": 1090.064,
      "perCapitaPPP": 22670.7,
      "perCapitaPPPChangePct": 7.58,
      "popChangePct": 0.4
    },
    {
      "year": 2005,
      "gdpPPP": 1173.244,
      "perCapitaPPP": 24349.0,
      "perCapitaPPPChangePct": 7.4,
      "popChangePct": 0.21
    },
    {
      "year": 2006,
      "gdpPPP": 1272.859,
      "perCapitaPPP": 26278.0,
      "perCapitaPPPChangePct": 7.92,
      "popChangePct": 0.53
    },
    {
      "year": 2007,
      "gdpPPP": 1383.719,
      "perCapitaPPP": 28422.7,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 0.51
    },
    {
      "year": 2008,
      "gdpPPP": 1452.749,
      "perCapitaPPP": 29614.9,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 0.76
    },
    {
      "year": 2009,
      "gdpPPP": 1473.693,
      "perCapitaPPP": 29887.6,
      "perCapitaPPPChangePct": 0.92,
      "popChangePct": 0.52
    },
    {
      "year": 2010,
      "gdpPPP": 1595.742,
      "perCapitaPPP": 32202.0,
      "perCapitaPPPChangePct": 7.74,
      "popChangePct": 0.5
    },
    {
      "year": 2011,
      "gdpPPP": 1688.732,
      "perCapitaPPP": 33817.5,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 0.77
    },
    {
      "year": 2012,
      "gdpPPP": 1763.999,
      "perCapitaPPP": 35139.5,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 0.53
    },
    {
      "year": 2013,
      "gdpPPP": 1853.071,
      "perCapitaPPP": 36746.2,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.46
    },
    {
      "year": 2014,
      "gdpPPP": 1945.954,
      "perCapitaPPP": 38346.4,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 0.63
    },
    {
      "year": 2015,
      "gdpPPP": 2021.368,
      "perCapitaPPP": 39623.1,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 0.53
    },
    {
      "year": 2016,
      "gdpPPP": 2105.293,
      "perCapitaPPP": 41104.7,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 0.4
    },
    {
      "year": 2017,
      "gdpPPP": 2216.57,
      "perCapitaPPP": 43155.9,
      "perCapitaPPPChangePct": 4.99,
      "popChangePct": 0.28
    },
    {
      "year": 2018,
      "gdpPPP": 2347.692,
      "perCapitaPPP": 45511.1,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 0.43
    },
    {
      "year": 2019,
      "gdpPPP": 2407.645,
      "perCapitaPPP": 46511.2,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 0.35
    },
    {
      "year": 2020,
      "gdpPPP": 2481.996,
      "perCapitaPPP": 47881.5,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 0.14
    },
    {
      "year": 2021,
      "gdpPPP": 2685.823,
      "perCapitaPPP": 51880.4,
      "perCapitaPPPChangePct": 8.35,
      "popChangePct": -0.13
    },
    {
      "year": 2022,
      "gdpPPP": 2955.318,
      "perCapitaPPP": 57193.2,
      "perCapitaPPPChangePct": 10.24,
      "popChangePct": -0.19
    },
    {
      "year": 2023,
      "gdpPPP": 3113.18,
      "perCapitaPPP": 60201.6,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": 0.08
    },
    {
      "year": 2024,
      "gdpPPP": 3254.39,
      "perCapitaPPP": 62885.5,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 0.07
    },
    {
      "year": 2025,
      "gdpPPP": 3380.412,
      "perCapitaPPP": 65404.7,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": -0.13
    },
    {
      "year": 2026,
      "gdpPPP": 3542.014,
      "perCapitaPPP": 68624.3,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": -0.14
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3696.662,
      "perCapitaPPP": 71731.7,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": -0.15
    },
    {
      "year": 2028,
      "gdpPPP": 3838.484,
      "perCapitaPPP": 74585.0,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": -0.14
    },
    {
      "year": 2029,
      "gdpPPP": 3983.652,
      "perCapitaPPP": 77526.3,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": -0.16
    },
    {
      "year": 2030,
      "gdpPPP": 4133.257,
      "perCapitaPPP": 80547.5,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": -0.14
    },
    {
      "year": 2031,
      "gdpPPP": 4287.293,
      "perCapitaPPP": 83696.1,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": -0.18
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SouthKoreaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
