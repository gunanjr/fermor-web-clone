import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Cambodia",
  "slug": "cambodia",
  "iso3": "KHM",
  "region": "Asia",
  "rank2026": 101,
  "flagEmoji": "🇰🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Libya",
      "slug": "libya",
      "rank": 100
    },
    {
      "name": "Estonia",
      "slug": "estonia",
      "rank": 102
    }
  ],
  "history": [
    {
      "year": 1986,
      "gdp": 0.205,
      "growth": null,
      "perCapita": 29.0,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 0.141,
      "growth": null,
      "perCapita": 19.3,
      "popChangePct": 2.98
    },
    {
      "year": 1988,
      "gdp": 0.276,
      "growth": 9.6,
      "perCapita": 36.8,
      "popChangePct": 2.89
    },
    {
      "year": 1989,
      "gdp": 0.346,
      "growth": 3.3,
      "perCapita": 44.8,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdp": 0.899,
      "growth": 1.1,
      "perCapita": 112.7,
      "popChangePct": 3.27
    },
    {
      "year": 1991,
      "gdp": 2.011,
      "growth": 7.6,
      "perCapita": 243.5,
      "popChangePct": 3.5
    },
    {
      "year": 1992,
      "gdp": 2.439,
      "growth": 7.1,
      "perCapita": 285.0,
      "popChangePct": 3.6
    },
    {
      "year": 1993,
      "gdp": 2.427,
      "growth": 4,
      "perCapita": 273.7,
      "popChangePct": 3.6
    },
    {
      "year": 1994,
      "gdp": 2.765,
      "growth": 8.2,
      "perCapita": 299.2,
      "popChangePct": 4.23
    },
    {
      "year": 1995,
      "gdp": 3.441,
      "growth": 9.9,
      "perCapita": 343.5,
      "popChangePct": 8.43
    },
    {
      "year": 1996,
      "gdp": 3.507,
      "growth": 5.9,
      "perCapita": 324.7,
      "popChangePct": 7.82
    },
    {
      "year": 1997,
      "gdp": 3.443,
      "growth": 4,
      "perCapita": 297.6,
      "popChangePct": 7.13
    },
    {
      "year": 1998,
      "gdp": 3.13,
      "growth": 4.7,
      "perCapita": 259.6,
      "popChangePct": 4.21
    },
    {
      "year": 1999,
      "gdp": 3.513,
      "growth": 12.7,
      "perCapita": 286.4,
      "popChangePct": 1.72
    },
    {
      "year": 2000,
      "gdp": 3.785,
      "growth": 10.7,
      "perCapita": 303.8,
      "popChangePct": 1.6
    },
    {
      "year": 2001,
      "gdp": 4.138,
      "growth": 5.5,
      "perCapita": 326.9,
      "popChangePct": 1.57
    },
    {
      "year": 2002,
      "gdp": 4.516,
      "growth": 8.7,
      "perCapita": 351.3,
      "popChangePct": 1.56
    },
    {
      "year": 2003,
      "gdp": 5.073,
      "growth": 7.9,
      "perCapita": 388.7,
      "popChangePct": 1.52
    },
    {
      "year": 2004,
      "gdp": 5.978,
      "growth": 8.3,
      "perCapita": 451.3,
      "popChangePct": 1.49
    },
    {
      "year": 2005,
      "gdp": 7.145,
      "growth": 14.1,
      "perCapita": 531.7,
      "popChangePct": 1.46
    },
    {
      "year": 2006,
      "gdp": 8.374,
      "growth": 10.9,
      "perCapita": 614.0,
      "popChangePct": 1.49
    },
    {
      "year": 2007,
      "gdp": 10.028,
      "growth": 9.8,
      "perCapita": 724.5,
      "popChangePct": 1.49
    },
    {
      "year": 2008,
      "gdp": 12.292,
      "growth": 9,
      "perCapita": 874.7,
      "popChangePct": 1.52
    },
    {
      "year": 2009,
      "gdp": 12.798,
      "growth": 5.3,
      "perCapita": 896.4,
      "popChangePct": 1.59
    },
    {
      "year": 2010,
      "gdp": 13.72,
      "growth": 5.3,
      "perCapita": 946.2,
      "popChangePct": 1.57
    },
    {
      "year": 2011,
      "gdp": 16.055,
      "growth": 8.8,
      "perCapita": 1090.5,
      "popChangePct": 1.53
    },
    {
      "year": 2012,
      "gdp": 17.757,
      "growth": 9.1,
      "perCapita": 1188.2,
      "popChangePct": 1.51
    },
    {
      "year": 2013,
      "gdp": 19.679,
      "growth": 7.8,
      "perCapita": 1297.2,
      "popChangePct": 1.51
    },
    {
      "year": 2014,
      "gdp": 22.176,
      "growth": 5.8,
      "perCapita": 1440.3,
      "popChangePct": 1.5
    },
    {
      "year": 2015,
      "gdp": 24.08,
      "growth": 6.8,
      "perCapita": 1541.3,
      "popChangePct": 1.47
    },
    {
      "year": 2016,
      "gdp": 26.502,
      "growth": 7.4,
      "perCapita": 1671.8,
      "popChangePct": 1.47
    },
    {
      "year": 2017,
      "gdp": 29.121,
      "growth": 7.6,
      "perCapita": 1811.7,
      "popChangePct": 1.39
    },
    {
      "year": 2018,
      "gdp": 32.839,
      "growth": 8.7,
      "perCapita": 2017.8,
      "popChangePct": 1.26
    },
    {
      "year": 2019,
      "gdp": 35.979,
      "growth": 7.9,
      "perCapita": 2183.0,
      "popChangePct": 1.27
    },
    {
      "year": 2020,
      "gdp": 34.497,
      "growth": -3,
      "perCapita": 2062.6,
      "popChangePct": 1.48
    },
    {
      "year": 2021,
      "gdp": 36.17,
      "growth": 2.9,
      "perCapita": 2130.9,
      "popChangePct": 1.49
    },
    {
      "year": 2022,
      "gdp": 39.461,
      "growth": 5.5,
      "perCapita": 2294.0,
      "popChangePct": 1.34
    },
    {
      "year": 2023,
      "gdp": 42.404,
      "growth": 5,
      "perCapita": 2433.7,
      "popChangePct": 1.29
    },
    {
      "year": 2024,
      "gdp": 46.098,
      "growth": 6,
      "perCapita": 2613.5,
      "popChangePct": 1.23
    },
    {
      "year": 2025,
      "gdp": 49.288,
      "growth": 5,
      "perCapita": 2761.6,
      "popChangePct": 1.18
    },
    {
      "year": 2026,
      "gdp": 52.379,
      "growth": 4,
      "perCapita": 2901.7,
      "popChangePct": 1.14
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 56.115,
      "growth": 4.7,
      "perCapita": 3074.8,
      "popChangePct": 1.1
    },
    {
      "year": 2028,
      "gdp": 60.391,
      "growth": 5,
      "perCapita": 3273.8,
      "popChangePct": 1.08
    },
    {
      "year": 2029,
      "gdp": 65.157,
      "growth": 5.3,
      "perCapita": 3495.7,
      "popChangePct": 1.04
    },
    {
      "year": 2030,
      "gdp": 70.369,
      "growth": 5.4,
      "perCapita": 3737.6,
      "popChangePct": 1.01
    },
    {
      "year": 2031,
      "gdp": 76.069,
      "growth": 5.5,
      "perCapita": 4001.1,
      "popChangePct": 0.98
    }
  ],
  "pppHistory": [
    {
      "year": 1987,
      "gdpPPP": 4.839,
      "perCapitaPPP": 663.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": 2.98
    },
    {
      "year": 1988,
      "gdpPPP": 5.492,
      "perCapitaPPP": 732.2,
      "perCapitaPPPChangePct": 10.28,
      "popChangePct": 2.89
    },
    {
      "year": 1989,
      "gdpPPP": 5.897,
      "perCapitaPPP": 763.1,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdpPPP": 6.186,
      "perCapitaPPP": 775.2,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 3.27
    },
    {
      "year": 1991,
      "gdpPPP": 6.881,
      "perCapitaPPP": 833.1,
      "perCapitaPPPChangePct": 7.48,
      "popChangePct": 3.5
    },
    {
      "year": 1992,
      "gdpPPP": 7.535,
      "perCapitaPPP": 880.7,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 3.6
    },
    {
      "year": 1993,
      "gdpPPP": 8.025,
      "perCapitaPPP": 905.4,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 3.6
    },
    {
      "year": 1994,
      "gdpPPP": 8.867,
      "perCapitaPPP": 959.8,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 4.23
    },
    {
      "year": 1995,
      "gdpPPP": 9.95,
      "perCapitaPPP": 993.2,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 8.43
    },
    {
      "year": 1996,
      "gdpPPP": 10.73,
      "perCapitaPPP": 993.4,
      "perCapitaPPPChangePct": 0.02,
      "popChangePct": 7.82
    },
    {
      "year": 1997,
      "gdpPPP": 11.352,
      "perCapitaPPP": 981.1,
      "perCapitaPPPChangePct": -1.24,
      "popChangePct": 7.13
    },
    {
      "year": 1998,
      "gdpPPP": 12.017,
      "perCapitaPPP": 996.6,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 4.21
    },
    {
      "year": 1999,
      "gdpPPP": 13.735,
      "perCapitaPPP": 1119.8,
      "perCapitaPPPChangePct": 12.37,
      "popChangePct": 1.72
    },
    {
      "year": 2000,
      "gdpPPP": 15.551,
      "perCapitaPPP": 1247.9,
      "perCapitaPPPChangePct": 11.43,
      "popChangePct": 1.6
    },
    {
      "year": 2001,
      "gdpPPP": 16.782,
      "perCapitaPPP": 1325.8,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 1.57
    },
    {
      "year": 2002,
      "gdpPPP": 18.519,
      "perCapitaPPP": 1440.6,
      "perCapitaPPPChangePct": 8.66,
      "popChangePct": 1.56
    },
    {
      "year": 2003,
      "gdpPPP": 20.386,
      "perCapitaPPP": 1562.0,
      "perCapitaPPPChangePct": 8.43,
      "popChangePct": 1.52
    },
    {
      "year": 2004,
      "gdpPPP": 22.662,
      "perCapitaPPP": 1711.0,
      "perCapitaPPPChangePct": 9.54,
      "popChangePct": 1.49
    },
    {
      "year": 2005,
      "gdpPPP": 26.672,
      "perCapitaPPP": 1984.7,
      "perCapitaPPPChangePct": 15.99,
      "popChangePct": 1.46
    },
    {
      "year": 2006,
      "gdpPPP": 30.48,
      "perCapitaPPP": 2234.8,
      "perCapitaPPPChangePct": 12.6,
      "popChangePct": 1.49
    },
    {
      "year": 2007,
      "gdpPPP": 34.375,
      "perCapitaPPP": 2483.5,
      "perCapitaPPPChangePct": 11.13,
      "popChangePct": 1.49
    },
    {
      "year": 2008,
      "gdpPPP": 38.206,
      "perCapitaPPP": 2718.6,
      "perCapitaPPPChangePct": 9.47,
      "popChangePct": 1.52
    },
    {
      "year": 2009,
      "gdpPPP": 40.477,
      "perCapitaPPP": 2835.2,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 1.59
    },
    {
      "year": 2010,
      "gdpPPP": 43.127,
      "perCapitaPPP": 2974.1,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 1.57
    },
    {
      "year": 2011,
      "gdpPPP": 47.877,
      "perCapitaPPP": 3252.0,
      "perCapitaPPPChangePct": 9.34,
      "popChangePct": 1.53
    },
    {
      "year": 2012,
      "gdpPPP": 53.214,
      "perCapitaPPP": 3560.6,
      "perCapitaPPPChangePct": 9.49,
      "popChangePct": 1.51
    },
    {
      "year": 2013,
      "gdpPPP": 58.358,
      "perCapitaPPP": 3846.9,
      "perCapitaPPPChangePct": 8.04,
      "popChangePct": 1.51
    },
    {
      "year": 2014,
      "gdpPPP": 62.842,
      "perCapitaPPP": 4081.5,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 1.5
    },
    {
      "year": 2015,
      "gdpPPP": 67.76,
      "perCapitaPPP": 4337.1,
      "perCapitaPPPChangePct": 6.26,
      "popChangePct": 1.47
    },
    {
      "year": 2016,
      "gdpPPP": 73.436,
      "perCapitaPPP": 4632.4,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 1.47
    },
    {
      "year": 2017,
      "gdpPPP": 80.417,
      "perCapitaPPP": 5003.1,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 1.39
    },
    {
      "year": 2018,
      "gdpPPP": 90.47,
      "perCapitaPPP": 5559.0,
      "perCapitaPPPChangePct": 11.11,
      "popChangePct": 1.26
    },
    {
      "year": 2019,
      "gdpPPP": 99.485,
      "perCapitaPPP": 6036.2,
      "perCapitaPPPChangePct": 8.58,
      "popChangePct": 1.27
    },
    {
      "year": 2020,
      "gdpPPP": 98.248,
      "perCapitaPPP": 5874.2,
      "perCapitaPPPChangePct": -2.68,
      "popChangePct": 1.48
    },
    {
      "year": 2021,
      "gdpPPP": 103.874,
      "perCapitaPPP": 6119.5,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 1.49
    },
    {
      "year": 2022,
      "gdpPPP": 117.385,
      "perCapitaPPP": 6824.0,
      "perCapitaPPPChangePct": 11.51,
      "popChangePct": 1.34
    },
    {
      "year": 2023,
      "gdpPPP": 127.823,
      "perCapitaPPP": 7336.1,
      "perCapitaPPPChangePct": 7.5,
      "popChangePct": 1.29
    },
    {
      "year": 2024,
      "gdpPPP": 138.882,
      "perCapitaPPP": 7873.7,
      "perCapitaPPPChangePct": 7.33,
      "popChangePct": 1.23
    },
    {
      "year": 2025,
      "gdpPPP": 149.981,
      "perCapitaPPP": 8403.3,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 1.18
    },
    {
      "year": 2026,
      "gdpPPP": 160.483,
      "perCapitaPPP": 8890.4,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 1.14
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 171.75,
      "perCapitaPPP": 9410.9,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 1.1
    },
    {
      "year": 2028,
      "gdpPPP": 183.283,
      "perCapitaPPP": 9935.8,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 1.08
    },
    {
      "year": 2029,
      "gdpPPP": 196.351,
      "perCapitaPPP": 10534.2,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.04
    },
    {
      "year": 2030,
      "gdpPPP": 210.679,
      "perCapitaPPP": 11190.0,
      "perCapitaPPPChangePct": 6.23,
      "popChangePct": 1.01
    },
    {
      "year": 2031,
      "gdpPPP": 226.194,
      "perCapitaPPP": 11897.4,
      "perCapitaPPPChangePct": 6.32,
      "popChangePct": 0.98
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CambodiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
