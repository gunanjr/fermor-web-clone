import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Rwanda",
  "slug": "rwanda",
  "iso3": "RWA",
  "region": "Africa",
  "rank2026": 143,
  "flagEmoji": "🇷🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Malawi",
      "slug": "malawi",
      "rank": 142
    },
    {
      "name": "Namibia",
      "slug": "namibia",
      "rank": 144
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.472,
      "growth": -3.6,
      "perCapita": 288.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.671,
      "growth": 2.5,
      "perCapita": 316.0,
      "popChangePct": 3.67
    },
    {
      "year": 1982,
      "gdp": 1.783,
      "growth": -2.5,
      "perCapita": 325.0,
      "popChangePct": 3.74
    },
    {
      "year": 1983,
      "gdp": 1.904,
      "growth": 6,
      "perCapita": 334.5,
      "popChangePct": 3.79
    },
    {
      "year": 1984,
      "gdp": 1.825,
      "growth": 13,
      "perCapita": 312.9,
      "popChangePct": 2.42
    },
    {
      "year": 1985,
      "gdp": 2.167,
      "growth": 4.4,
      "perCapita": 359.4,
      "popChangePct": 3.4
    },
    {
      "year": 1986,
      "gdp": 2.455,
      "growth": 5.5,
      "perCapita": 393.6,
      "popChangePct": 3.43
    },
    {
      "year": 1987,
      "gdp": 2.726,
      "growth": -0.3,
      "perCapita": 422.3,
      "popChangePct": 3.5
    },
    {
      "year": 1988,
      "gdp": 2.917,
      "growth": 0.3,
      "perCapita": 436.5,
      "popChangePct": 3.52
    },
    {
      "year": 1989,
      "gdp": 3.046,
      "growth": -5.7,
      "perCapita": 440.8,
      "popChangePct": 3.41
    },
    {
      "year": 1990,
      "gdp": 2.912,
      "growth": 0.4,
      "perCapita": 411.8,
      "popChangePct": 2.36
    },
    {
      "year": 1991,
      "gdp": 2.149,
      "growth": -4.3,
      "perCapita": 294.7,
      "popChangePct": 3.07
    },
    {
      "year": 1992,
      "gdp": 2.28,
      "growth": 6.6,
      "perCapita": 312.5,
      "popChangePct": 0.07
    },
    {
      "year": 1993,
      "gdp": 2.199,
      "growth": -10.4,
      "perCapita": 321.2,
      "popChangePct": -6.14
    },
    {
      "year": 1994,
      "gdp": 1.398,
      "growth": -41.9,
      "perCapita": 220.3,
      "popChangePct": -7.32
    },
    {
      "year": 1995,
      "gdp": 1.449,
      "growth": 24.5,
      "perCapita": 241.8,
      "popChangePct": -5.58
    },
    {
      "year": 1996,
      "gdp": 1.571,
      "growth": 11.6,
      "perCapita": 265.1,
      "popChangePct": -1.12
    },
    {
      "year": 1997,
      "gdp": 2.114,
      "growth": 14.9,
      "perCapita": 340.8,
      "popChangePct": 4.69
    },
    {
      "year": 1998,
      "gdp": 2.257,
      "growth": 8.3,
      "perCapita": 333.5,
      "popChangePct": 9.12
    },
    {
      "year": 1999,
      "gdp": 2.101,
      "growth": 3.3,
      "perCapita": 280.1,
      "popChangePct": 10.8
    },
    {
      "year": 2000,
      "gdp": 2.02,
      "growth": 8.4,
      "perCapita": 262.3,
      "popChangePct": 2.67
    },
    {
      "year": 2001,
      "gdp": 1.939,
      "growth": 8.5,
      "perCapita": 245.5,
      "popChangePct": 2.6
    },
    {
      "year": 2002,
      "gdp": 1.935,
      "growth": 13.2,
      "perCapita": 238.9,
      "popChangePct": 2.53
    },
    {
      "year": 2003,
      "gdp": 2.109,
      "growth": 2.2,
      "perCapita": 254.0,
      "popChangePct": 2.47
    },
    {
      "year": 2004,
      "gdp": 2.354,
      "growth": 7.4,
      "perCapita": 273.7,
      "popChangePct": 3.61
    },
    {
      "year": 2005,
      "gdp": 2.903,
      "growth": 9.4,
      "perCapita": 329.9,
      "popChangePct": 2.33
    },
    {
      "year": 2006,
      "gdp": 3.271,
      "growth": 9.2,
      "perCapita": 363.5,
      "popChangePct": 2.27
    },
    {
      "year": 2007,
      "gdp": 4.016,
      "growth": 7.7,
      "perCapita": 436.6,
      "popChangePct": 2.22
    },
    {
      "year": 2008,
      "gdp": 5.121,
      "growth": 11.2,
      "perCapita": 539.0,
      "popChangePct": 3.26
    },
    {
      "year": 2009,
      "gdp": 5.605,
      "growth": 6.2,
      "perCapita": 577.8,
      "popChangePct": 2.11
    },
    {
      "year": 2010,
      "gdp": 6.052,
      "growth": 7.3,
      "perCapita": 605.2,
      "popChangePct": 3.09
    },
    {
      "year": 2011,
      "gdp": 6.803,
      "growth": 8,
      "perCapita": 667.0,
      "popChangePct": 2.0
    },
    {
      "year": 2012,
      "gdp": 7.557,
      "growth": 8.6,
      "perCapita": 720.8,
      "popChangePct": 2.77
    },
    {
      "year": 2013,
      "gdp": 7.714,
      "growth": 4.7,
      "perCapita": 718.4,
      "popChangePct": 2.42
    },
    {
      "year": 2014,
      "gdp": 8.13,
      "growth": 5.7,
      "perCapita": 739.3,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdp": 8.451,
      "growth": 8.9,
      "perCapita": 750.3,
      "popChangePct": 2.42
    },
    {
      "year": 2016,
      "gdp": 8.597,
      "growth": 5.7,
      "perCapita": 745.4,
      "popChangePct": 2.4
    },
    {
      "year": 2017,
      "gdp": 9.165,
      "growth": 4.7,
      "perCapita": 776.1,
      "popChangePct": 2.39
    },
    {
      "year": 2018,
      "gdp": 9.651,
      "growth": 8.1,
      "perCapita": 798.2,
      "popChangePct": 2.38
    },
    {
      "year": 2019,
      "gdp": 10.519,
      "growth": 9.3,
      "perCapita": 850.1,
      "popChangePct": 2.35
    },
    {
      "year": 2020,
      "gdp": 10.488,
      "growth": -2.8,
      "perCapita": 828.2,
      "popChangePct": 2.34
    },
    {
      "year": 2021,
      "gdp": 11.25,
      "growth": 8.4,
      "perCapita": 868.3,
      "popChangePct": 2.31
    },
    {
      "year": 2022,
      "gdp": 13.744,
      "growth": 9.8,
      "perCapita": 1037.6,
      "popChangePct": 2.24
    },
    {
      "year": 2023,
      "gdp": 14.805,
      "growth": 8.6,
      "perCapita": 1096.8,
      "popChangePct": 1.91
    },
    {
      "year": 2024,
      "gdp": 15.111,
      "growth": 7.2,
      "perCapita": 1090.5,
      "popChangePct": 2.65
    },
    {
      "year": 2025,
      "gdp": 15.973,
      "growth": 7,
      "perCapita": 1127.9,
      "popChangePct": 2.2
    },
    {
      "year": 2026,
      "gdp": 17.336,
      "growth": 7.2,
      "perCapita": 1198.0,
      "popChangePct": 2.18
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 18.428,
      "growth": 7.6,
      "perCapita": 1246.3,
      "popChangePct": 2.18
    },
    {
      "year": 2028,
      "gdp": 19.531,
      "growth": 6.8,
      "perCapita": 1297.5,
      "popChangePct": 1.81
    },
    {
      "year": 2029,
      "gdp": 20.909,
      "growth": 6.8,
      "perCapita": 1364.7,
      "popChangePct": 1.79
    },
    {
      "year": 2030,
      "gdp": 22.663,
      "growth": 6.8,
      "perCapita": 1450.7,
      "popChangePct": 1.96
    },
    {
      "year": 2031,
      "gdp": 24.68,
      "growth": 6.8,
      "perCapita": 1549.3,
      "popChangePct": 1.97
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.121,
      "perCapitaPPP": 415.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.379,
      "perCapitaPPP": 449.8,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 3.67
    },
    {
      "year": 1982,
      "gdpPPP": 2.463,
      "perCapitaPPP": 449.0,
      "perCapitaPPPChangePct": -0.17,
      "popChangePct": 3.74
    },
    {
      "year": 1983,
      "gdpPPP": 2.714,
      "perCapitaPPP": 476.7,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 3.79
    },
    {
      "year": 1984,
      "gdpPPP": 3.177,
      "perCapitaPPP": 544.8,
      "perCapitaPPPChangePct": 14.27,
      "popChangePct": 2.42
    },
    {
      "year": 1985,
      "gdpPPP": 3.421,
      "perCapitaPPP": 567.4,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 3.4
    },
    {
      "year": 1986,
      "gdpPPP": 3.682,
      "perCapitaPPP": 590.3,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 3.43
    },
    {
      "year": 1987,
      "gdpPPP": 3.762,
      "perCapitaPPP": 582.9,
      "perCapitaPPPChangePct": -1.27,
      "popChangePct": 3.5
    },
    {
      "year": 1988,
      "gdpPPP": 3.907,
      "perCapitaPPP": 584.6,
      "perCapitaPPPChangePct": 0.3,
      "popChangePct": 3.52
    },
    {
      "year": 1989,
      "gdpPPP": 3.828,
      "perCapitaPPP": 554.0,
      "perCapitaPPPChangePct": -5.23,
      "popChangePct": 3.41
    },
    {
      "year": 1990,
      "gdpPPP": 3.988,
      "perCapitaPPP": 563.9,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 2.36
    },
    {
      "year": 1991,
      "gdpPPP": 3.946,
      "perCapitaPPP": 541.2,
      "perCapitaPPPChangePct": -4.01,
      "popChangePct": 3.07
    },
    {
      "year": 1992,
      "gdpPPP": 4.302,
      "perCapitaPPP": 589.7,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": 0.07
    },
    {
      "year": 1993,
      "gdpPPP": 3.947,
      "perCapitaPPP": 576.4,
      "perCapitaPPPChangePct": -2.25,
      "popChangePct": -6.14
    },
    {
      "year": 1994,
      "gdpPPP": 2.342,
      "perCapitaPPP": 369.1,
      "perCapitaPPPChangePct": -35.96,
      "popChangePct": -7.32
    },
    {
      "year": 1995,
      "gdpPPP": 2.978,
      "perCapitaPPP": 497.0,
      "perCapitaPPPChangePct": 34.65,
      "popChangePct": -5.58
    },
    {
      "year": 1996,
      "gdpPPP": 3.385,
      "perCapitaPPP": 571.3,
      "perCapitaPPPChangePct": 14.94,
      "popChangePct": -1.12
    },
    {
      "year": 1997,
      "gdpPPP": 3.956,
      "perCapitaPPP": 637.8,
      "perCapitaPPPChangePct": 11.64,
      "popChangePct": 4.69
    },
    {
      "year": 1998,
      "gdpPPP": 4.334,
      "perCapitaPPP": 640.3,
      "perCapitaPPPChangePct": 0.4,
      "popChangePct": 9.12
    },
    {
      "year": 1999,
      "gdpPPP": 4.541,
      "perCapitaPPP": 605.5,
      "perCapitaPPPChangePct": -5.45,
      "popChangePct": 10.8
    },
    {
      "year": 2000,
      "gdpPPP": 5.033,
      "perCapitaPPP": 653.6,
      "perCapitaPPPChangePct": 7.95,
      "popChangePct": 2.67
    },
    {
      "year": 2001,
      "gdpPPP": 5.583,
      "perCapitaPPP": 706.7,
      "perCapitaPPPChangePct": 8.12,
      "popChangePct": 2.6
    },
    {
      "year": 2002,
      "gdpPPP": 6.416,
      "perCapitaPPP": 792.1,
      "perCapitaPPPChangePct": 12.1,
      "popChangePct": 2.53
    },
    {
      "year": 2003,
      "gdpPPP": 6.688,
      "perCapitaPPP": 805.8,
      "perCapitaPPPChangePct": 1.73,
      "popChangePct": 2.47
    },
    {
      "year": 2004,
      "gdpPPP": 7.379,
      "perCapitaPPP": 858.0,
      "perCapitaPPPChangePct": 6.48,
      "popChangePct": 3.61
    },
    {
      "year": 2005,
      "gdpPPP": 8.326,
      "perCapitaPPP": 946.1,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 2.33
    },
    {
      "year": 2006,
      "gdpPPP": 9.373,
      "perCapitaPPP": 1041.4,
      "perCapitaPPPChangePct": 10.07,
      "popChangePct": 2.27
    },
    {
      "year": 2007,
      "gdpPPP": 10.363,
      "perCapitaPPP": 1126.4,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 2.22
    },
    {
      "year": 2008,
      "gdpPPP": 11.743,
      "perCapitaPPP": 1236.1,
      "perCapitaPPPChangePct": 9.74,
      "popChangePct": 3.26
    },
    {
      "year": 2009,
      "gdpPPP": 12.552,
      "perCapitaPPP": 1294.1,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": 2.11
    },
    {
      "year": 2010,
      "gdpPPP": 13.638,
      "perCapitaPPP": 1363.8,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 3.09
    },
    {
      "year": 2011,
      "gdpPPP": 15.026,
      "perCapitaPPP": 1473.2,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 2.0
    },
    {
      "year": 2012,
      "gdpPPP": 16.628,
      "perCapitaPPP": 1586.2,
      "perCapitaPPPChangePct": 7.67,
      "popChangePct": 2.77
    },
    {
      "year": 2013,
      "gdpPPP": 17.711,
      "perCapitaPPP": 1649.5,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.42
    },
    {
      "year": 2014,
      "gdpPPP": 19.039,
      "perCapitaPPP": 1731.3,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdpPPP": 20.92,
      "perCapitaPPP": 1857.4,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 2.42
    },
    {
      "year": 2016,
      "gdpPPP": 22.315,
      "perCapitaPPP": 1934.9,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 2.4
    },
    {
      "year": 2017,
      "gdpPPP": 23.784,
      "perCapitaPPP": 2014.1,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 2.39
    },
    {
      "year": 2018,
      "gdpPPP": 26.578,
      "perCapitaPPP": 2198.3,
      "perCapitaPPPChangePct": 9.15,
      "popChangePct": 2.38
    },
    {
      "year": 2019,
      "gdpPPP": 30.337,
      "perCapitaPPP": 2451.7,
      "perCapitaPPPChangePct": 11.52,
      "popChangePct": 2.35
    },
    {
      "year": 2020,
      "gdpPPP": 30.774,
      "perCapitaPPP": 2430.2,
      "perCapitaPPPChangePct": -0.88,
      "popChangePct": 2.34
    },
    {
      "year": 2021,
      "gdpPPP": 37.08,
      "perCapitaPPP": 2862.0,
      "perCapitaPPPChangePct": 17.77,
      "popChangePct": 2.31
    },
    {
      "year": 2022,
      "gdpPPP": 43.613,
      "perCapitaPPP": 3292.6,
      "perCapitaPPPChangePct": 15.05,
      "popChangePct": 2.24
    },
    {
      "year": 2023,
      "gdpPPP": 49.098,
      "perCapitaPPP": 3637.2,
      "perCapitaPPPChangePct": 10.47,
      "popChangePct": 1.91
    },
    {
      "year": 2024,
      "gdpPPP": 53.943,
      "perCapitaPPP": 3892.9,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": 2.65
    },
    {
      "year": 2025,
      "gdpPPP": 59.345,
      "perCapitaPPP": 4190.4,
      "perCapitaPPPChangePct": 7.64,
      "popChangePct": 2.2
    },
    {
      "year": 2026,
      "gdpPPP": 65.461,
      "perCapitaPPP": 4523.6,
      "perCapitaPPPChangePct": 7.95,
      "popChangePct": 2.18
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 71.982,
      "perCapitaPPP": 4868.2,
      "perCapitaPPPChangePct": 7.62,
      "popChangePct": 2.18
    },
    {
      "year": 2028,
      "gdpPPP": 78.104,
      "perCapitaPPP": 5188.6,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 1.81
    },
    {
      "year": 2029,
      "gdpPPP": 84.895,
      "perCapitaPPP": 5540.7,
      "perCapitaPPPChangePct": 6.79,
      "popChangePct": 1.79
    },
    {
      "year": 2030,
      "gdpPPP": 92.369,
      "perCapitaPPP": 5912.8,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": 1.96
    },
    {
      "year": 2031,
      "gdpPPP": 100.431,
      "perCapitaPPP": 6304.6,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": 1.97
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function RwandaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
