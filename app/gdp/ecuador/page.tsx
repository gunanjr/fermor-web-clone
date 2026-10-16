import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Ecuador",
  "slug": "ecuador",
  "iso3": "ECU",
  "region": "Americas",
  "rank2026": 67,
  "flagEmoji": "🇪🇨",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Kenya",
      "slug": "kenya",
      "rank": 66
    },
    {
      "name": "Dominican Republic",
      "slug": "dominican-republic",
      "rank": 68
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 16.116,
      "growth": 4.9,
      "perCapita": 2015.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 16.501,
      "growth": 3.9,
      "perCapita": 2005.7,
      "popChangePct": 2.86
    },
    {
      "year": 1982,
      "gdp": 16.474,
      "growth": 1.2,
      "perCapita": 1947.1,
      "popChangePct": 2.84
    },
    {
      "year": 1983,
      "gdp": 14.478,
      "growth": -2.8,
      "perCapita": 1664.7,
      "popChangePct": 2.79
    },
    {
      "year": 1984,
      "gdp": 15.408,
      "growth": 4.2,
      "perCapita": 1724.5,
      "popChangePct": 2.74
    },
    {
      "year": 1985,
      "gdp": 18.02,
      "growth": 4.4,
      "perCapita": 1964.3,
      "popChangePct": 2.66
    },
    {
      "year": 1986,
      "gdp": 13.222,
      "growth": 3.1,
      "perCapita": 1404.7,
      "popChangePct": 2.62
    },
    {
      "year": 1987,
      "gdp": 12.355,
      "growth": -6,
      "perCapita": 1280.0,
      "popChangePct": 2.54
    },
    {
      "year": 1988,
      "gdp": 11.749,
      "growth": 10.5,
      "perCapita": 1186.4,
      "popChangePct": 2.6
    },
    {
      "year": 1989,
      "gdp": 11.531,
      "growth": 0.3,
      "perCapita": 1136.3,
      "popChangePct": 2.47
    },
    {
      "year": 1990,
      "gdp": 11.71,
      "growth": 3,
      "perCapita": 1127.2,
      "popChangePct": 2.36
    },
    {
      "year": 1991,
      "gdp": 13.139,
      "growth": 5.1,
      "perCapita": 1236.3,
      "popChangePct": 2.31
    },
    {
      "year": 1992,
      "gdp": 14.367,
      "growth": 3.6,
      "perCapita": 1321.9,
      "popChangePct": 2.26
    },
    {
      "year": 1993,
      "gdp": 16.783,
      "growth": 2,
      "perCapita": 1511.3,
      "popChangePct": 2.18
    },
    {
      "year": 1994,
      "gdp": 20.238,
      "growth": 4.3,
      "perCapita": 1785.6,
      "popChangePct": 2.06
    },
    {
      "year": 1995,
      "gdp": 21.98,
      "growth": 2.3,
      "perCapita": 1902.9,
      "popChangePct": 1.91
    },
    {
      "year": 1996,
      "gdp": 23.001,
      "growth": 1.7,
      "perCapita": 1957.4,
      "popChangePct": 1.73
    },
    {
      "year": 1997,
      "gdp": 25.847,
      "growth": 4.3,
      "perCapita": 2165.1,
      "popChangePct": 1.59
    },
    {
      "year": 1998,
      "gdp": 26.292,
      "growth": 3.3,
      "perCapita": 2169.5,
      "popChangePct": 1.52
    },
    {
      "year": 1999,
      "gdp": 18.891,
      "growth": -4.7,
      "perCapita": 1536.2,
      "popChangePct": 1.47
    },
    {
      "year": 2000,
      "gdp": 17.531,
      "growth": 1.1,
      "perCapita": 1404.6,
      "popChangePct": 1.5
    },
    {
      "year": 2001,
      "gdp": 23.127,
      "growth": 4.2,
      "perCapita": 1823.7,
      "popChangePct": 1.6
    },
    {
      "year": 2002,
      "gdp": 27.054,
      "growth": 4.9,
      "perCapita": 2097.1,
      "popChangePct": 1.73
    },
    {
      "year": 2003,
      "gdp": 30.965,
      "growth": 2.9,
      "perCapita": 2358.0,
      "popChangePct": 1.79
    },
    {
      "year": 2004,
      "gdp": 35.195,
      "growth": 6.8,
      "perCapita": 2633.1,
      "popChangePct": 1.79
    },
    {
      "year": 2005,
      "gdp": 40.279,
      "growth": 5.4,
      "perCapita": 2960.7,
      "popChangePct": 1.77
    },
    {
      "year": 2006,
      "gdp": 45.691,
      "growth": 4.3,
      "perCapita": 3298.4,
      "popChangePct": 1.82
    },
    {
      "year": 2007,
      "gdp": 49.849,
      "growth": 1.9,
      "perCapita": 3533.7,
      "popChangePct": 1.84
    },
    {
      "year": 2008,
      "gdp": 61.139,
      "growth": 6.6,
      "perCapita": 4257.9,
      "popChangePct": 1.79
    },
    {
      "year": 2009,
      "gdp": 60.095,
      "growth": 1.1,
      "perCapita": 4111.5,
      "popChangePct": 1.79
    },
    {
      "year": 2010,
      "gdp": 68.151,
      "growth": 4,
      "perCapita": 4578.9,
      "popChangePct": 1.83
    },
    {
      "year": 2011,
      "gdp": 78.987,
      "growth": 8.5,
      "perCapita": 5210.0,
      "popChangePct": 1.86
    },
    {
      "year": 2012,
      "gdp": 87.735,
      "growth": 5.8,
      "perCapita": 5682.1,
      "popChangePct": 1.85
    },
    {
      "year": 2013,
      "gdp": 96.57,
      "growth": 7.2,
      "perCapita": 6144.1,
      "popChangePct": 1.79
    },
    {
      "year": 2014,
      "gdp": 102.718,
      "growth": 4.2,
      "perCapita": 6422.1,
      "popChangePct": 1.76
    },
    {
      "year": 2015,
      "gdp": 97.21,
      "growth": 0.1,
      "perCapita": 5975.1,
      "popChangePct": 1.72
    },
    {
      "year": 2016,
      "gdp": 97.671,
      "growth": -0.7,
      "perCapita": 5907.9,
      "popChangePct": 1.62
    },
    {
      "year": 2017,
      "gdp": 104.467,
      "growth": 6,
      "perCapita": 6221.0,
      "popChangePct": 1.58
    },
    {
      "year": 2018,
      "gdp": 107.479,
      "growth": 1,
      "perCapita": 6293.5,
      "popChangePct": 1.7
    },
    {
      "year": 2019,
      "gdp": 107.596,
      "growth": 0.2,
      "perCapita": 6199.0,
      "popChangePct": 1.63
    },
    {
      "year": 2020,
      "gdp": 95.865,
      "growth": -9.2,
      "perCapita": 5469.8,
      "popChangePct": 0.97
    },
    {
      "year": 2021,
      "gdp": 107.179,
      "growth": 9.4,
      "perCapita": 6084.7,
      "popChangePct": 0.5
    },
    {
      "year": 2022,
      "gdp": 116.133,
      "growth": 5.9,
      "perCapita": 6555.5,
      "popChangePct": 0.57
    },
    {
      "year": 2023,
      "gdp": 120.793,
      "growth": 1.8,
      "perCapita": 6772.9,
      "popChangePct": 0.68
    },
    {
      "year": 2024,
      "gdp": 123.802,
      "growth": -1.9,
      "perCapita": 6890.7,
      "popChangePct": 0.74
    },
    {
      "year": 2025,
      "gdp": 130.321,
      "growth": 3.7,
      "perCapita": 7198.6,
      "popChangePct": 0.76
    },
    {
      "year": 2026,
      "gdp": 138.194,
      "growth": 2.5,
      "perCapita": 7574.9,
      "popChangePct": 0.77
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 144.135,
      "growth": 2.5,
      "perCapita": 7839.4,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdp": 150.136,
      "growth": 2.6,
      "perCapita": 8102.7,
      "popChangePct": 0.78
    },
    {
      "year": 2029,
      "gdp": 156.661,
      "growth": 2.8,
      "perCapita": 8389.9,
      "popChangePct": 0.77
    },
    {
      "year": 2030,
      "gdp": 163.818,
      "growth": 3,
      "perCapita": 8706.5,
      "popChangePct": 0.77
    },
    {
      "year": 2031,
      "gdp": 171.302,
      "growth": 3,
      "perCapita": 9035.9,
      "popChangePct": 0.76
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 24.818,
      "perCapitaPPP": 3103.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 28.225,
      "perCapitaPPP": 3430.7,
      "perCapitaPPPChangePct": 10.56,
      "popChangePct": 2.86
    },
    {
      "year": 1982,
      "gdpPPP": 30.329,
      "perCapitaPPP": 3584.7,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 2.84
    },
    {
      "year": 1983,
      "gdpPPP": 30.634,
      "perCapitaPPP": 3522.2,
      "perCapitaPPPChangePct": -1.74,
      "popChangePct": 2.79
    },
    {
      "year": 1984,
      "gdpPPP": 33.073,
      "perCapitaPPP": 3701.5,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 2.74
    },
    {
      "year": 1985,
      "gdpPPP": 35.62,
      "perCapitaPPP": 3882.9,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 2.66
    },
    {
      "year": 1986,
      "gdpPPP": 37.461,
      "perCapitaPPP": 3979.9,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 2.62
    },
    {
      "year": 1987,
      "gdpPPP": 36.097,
      "perCapitaPPP": 3739.8,
      "perCapitaPPPChangePct": -6.03,
      "popChangePct": 2.54
    },
    {
      "year": 1988,
      "gdpPPP": 41.288,
      "perCapitaPPP": 4169.1,
      "perCapitaPPPChangePct": 11.48,
      "popChangePct": 2.6
    },
    {
      "year": 1989,
      "gdpPPP": 43.029,
      "perCapitaPPP": 4240.2,
      "perCapitaPPPChangePct": 1.71,
      "popChangePct": 2.47
    },
    {
      "year": 1990,
      "gdpPPP": 45.982,
      "perCapitaPPP": 4426.5,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.36
    },
    {
      "year": 1991,
      "gdpPPP": 49.968,
      "perCapitaPPP": 4701.5,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 2.31
    },
    {
      "year": 1992,
      "gdpPPP": 52.954,
      "perCapitaPPP": 4872.3,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": 2.26
    },
    {
      "year": 1993,
      "gdpPPP": 55.294,
      "perCapitaPPP": 4979.2,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.18
    },
    {
      "year": 1994,
      "gdpPPP": 58.879,
      "perCapitaPPP": 5195.0,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 2.06
    },
    {
      "year": 1995,
      "gdpPPP": 61.468,
      "perCapitaPPP": 5321.4,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 1.91
    },
    {
      "year": 1996,
      "gdpPPP": 63.677,
      "perCapitaPPP": 5418.9,
      "perCapitaPPPChangePct": 1.83,
      "popChangePct": 1.73
    },
    {
      "year": 1997,
      "gdpPPP": 67.578,
      "perCapitaPPP": 5660.7,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 1.59
    },
    {
      "year": 1998,
      "gdpPPP": 70.57,
      "perCapitaPPP": 5823.2,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 1.52
    },
    {
      "year": 1999,
      "gdpPPP": 68.177,
      "perCapitaPPP": 5544.1,
      "perCapitaPPPChangePct": -4.79,
      "popChangePct": 1.47
    },
    {
      "year": 2000,
      "gdpPPP": 70.482,
      "perCapitaPPP": 5647.4,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 1.5
    },
    {
      "year": 2001,
      "gdpPPP": 75.101,
      "perCapitaPPP": 5922.1,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 1.6
    },
    {
      "year": 2002,
      "gdpPPP": 80.026,
      "perCapitaPPP": 6203.3,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 1.73
    },
    {
      "year": 2003,
      "gdpPPP": 83.96,
      "perCapitaPPP": 6393.7,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 1.79
    },
    {
      "year": 2004,
      "gdpPPP": 92.109,
      "perCapitaPPP": 6891.0,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": 1.79
    },
    {
      "year": 2005,
      "gdpPPP": 100.126,
      "perCapitaPPP": 7359.8,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 1.77
    },
    {
      "year": 2006,
      "gdpPPP": 107.694,
      "perCapitaPPP": 7774.4,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 1.82
    },
    {
      "year": 2007,
      "gdpPPP": 112.716,
      "perCapitaPPP": 7990.2,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 1.84
    },
    {
      "year": 2008,
      "gdpPPP": 122.43,
      "perCapitaPPP": 8526.3,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 1.79
    },
    {
      "year": 2009,
      "gdpPPP": 124.529,
      "perCapitaPPP": 8519.8,
      "perCapitaPPPChangePct": -0.08,
      "popChangePct": 1.79
    },
    {
      "year": 2010,
      "gdpPPP": 131.12,
      "perCapitaPPP": 8809.7,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 1.83
    },
    {
      "year": 2011,
      "gdpPPP": 145.176,
      "perCapitaPPP": 9575.9,
      "perCapitaPPPChangePct": 8.7,
      "popChangePct": 1.86
    },
    {
      "year": 2012,
      "gdpPPP": 156.431,
      "perCapitaPPP": 10131.2,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 1.85
    },
    {
      "year": 2013,
      "gdpPPP": 170.567,
      "perCapitaPPP": 10852.0,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": 1.79
    },
    {
      "year": 2014,
      "gdpPPP": 180.871,
      "perCapitaPPP": 11308.4,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 1.76
    },
    {
      "year": 2015,
      "gdpPPP": 182.768,
      "perCapitaPPP": 11234.0,
      "perCapitaPPPChangePct": -0.66,
      "popChangePct": 1.72
    },
    {
      "year": 2016,
      "gdpPPP": 183.236,
      "perCapitaPPP": 11083.5,
      "perCapitaPPPChangePct": -1.34,
      "popChangePct": 1.62
    },
    {
      "year": 2017,
      "gdpPPP": 197.653,
      "perCapitaPPP": 11770.1,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 1.58
    },
    {
      "year": 2018,
      "gdpPPP": 207.781,
      "perCapitaPPP": 12166.7,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 1.7
    },
    {
      "year": 2019,
      "gdpPPP": 217.496,
      "perCapitaPPP": 12530.8,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 1.63
    },
    {
      "year": 2020,
      "gdpPPP": 202.25,
      "perCapitaPPP": 11539.7,
      "perCapitaPPPChangePct": -7.91,
      "popChangePct": 0.97
    },
    {
      "year": 2021,
      "gdpPPP": 238.845,
      "perCapitaPPP": 13559.6,
      "perCapitaPPPChangePct": 17.5,
      "popChangePct": 0.5
    },
    {
      "year": 2022,
      "gdpPPP": 270.846,
      "perCapitaPPP": 15288.8,
      "perCapitaPPPChangePct": 12.75,
      "popChangePct": 0.57
    },
    {
      "year": 2023,
      "gdpPPP": 286.015,
      "perCapitaPPP": 16036.9,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 0.68
    },
    {
      "year": 2024,
      "gdpPPP": 287.417,
      "perCapitaPPP": 15997.3,
      "perCapitaPPPChangePct": -0.25,
      "popChangePct": 0.74
    },
    {
      "year": 2025,
      "gdpPPP": 306.583,
      "perCapitaPPP": 16934.9,
      "perCapitaPPPChangePct": 5.86,
      "popChangePct": 0.76
    },
    {
      "year": 2026,
      "gdpPPP": 323.282,
      "perCapitaPPP": 17720.1,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 0.77
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 338.64,
      "perCapitaPPP": 18418.4,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdpPPP": 353.148,
      "perCapitaPPP": 19059.1,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 0.78
    },
    {
      "year": 2029,
      "gdpPPP": 369.491,
      "perCapitaPPP": 19788.0,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.77
    },
    {
      "year": 2030,
      "gdpPPP": 387.569,
      "perCapitaPPP": 20598.4,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 0.77
    },
    {
      "year": 2031,
      "gdpPPP": 406.403,
      "perCapitaPPP": 21437.1,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 0.76
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function EcuadorGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
