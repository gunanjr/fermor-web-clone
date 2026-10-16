import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Nepal",
  "slug": "nepal",
  "iso3": "NPL",
  "region": "Asia",
  "rank2026": 104,
  "flagEmoji": "🇳🇵",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bahrain",
      "slug": "bahrain",
      "rank": 103
    },
    {
      "name": "Cyprus",
      "slug": "cyprus",
      "rank": 105
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.258,
      "growth": -2.3,
      "perCapita": 145.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.641,
      "growth": 8.3,
      "perCapita": 165.7,
      "popChangePct": 2.32
    },
    {
      "year": 1982,
      "gdp": 2.669,
      "growth": 3.8,
      "perCapita": 163.6,
      "popChangePct": 2.35
    },
    {
      "year": 1983,
      "gdp": 2.92,
      "growth": -3,
      "perCapita": 174.9,
      "popChangePct": 2.35
    },
    {
      "year": 1984,
      "gdp": 3.089,
      "growth": 9.7,
      "perCapita": 180.8,
      "popChangePct": 2.34
    },
    {
      "year": 1985,
      "gdp": 3.208,
      "growth": 6.1,
      "perCapita": 183.6,
      "popChangePct": 2.31
    },
    {
      "year": 1986,
      "gdp": 3.491,
      "growth": 4.6,
      "perCapita": 195.4,
      "popChangePct": 2.23
    },
    {
      "year": 1987,
      "gdp": 3.621,
      "growth": 1.7,
      "perCapita": 198.4,
      "popChangePct": 2.14
    },
    {
      "year": 1988,
      "gdp": 4.27,
      "growth": 7.7,
      "perCapita": 229.1,
      "popChangePct": 2.13
    },
    {
      "year": 1989,
      "gdp": 4.317,
      "growth": 4.3,
      "perCapita": 226.5,
      "popChangePct": 2.25
    },
    {
      "year": 1990,
      "gdp": 4.442,
      "growth": 4.6,
      "perCapita": 227.5,
      "popChangePct": 2.45
    },
    {
      "year": 1991,
      "gdp": 4.861,
      "growth": 6.4,
      "perCapita": 242.6,
      "popChangePct": 2.62
    },
    {
      "year": 1992,
      "gdp": 4.417,
      "growth": 4.1,
      "perCapita": 214.3,
      "popChangePct": 2.86
    },
    {
      "year": 1993,
      "gdp": 4.743,
      "growth": 3.8,
      "perCapita": 223.9,
      "popChangePct": 2.77
    },
    {
      "year": 1994,
      "gdp": 4.954,
      "growth": 8.2,
      "perCapita": 228.1,
      "popChangePct": 2.54
    },
    {
      "year": 1995,
      "gdp": 5.379,
      "growth": 3.5,
      "perCapita": 241.8,
      "popChangePct": 2.43
    },
    {
      "year": 1996,
      "gdp": 5.544,
      "growth": 5.3,
      "perCapita": 243.8,
      "popChangePct": 2.23
    },
    {
      "year": 1997,
      "gdp": 6.027,
      "growth": 5.3,
      "perCapita": 259.6,
      "popChangePct": 2.1
    },
    {
      "year": 1998,
      "gdp": 5.992,
      "growth": 2.9,
      "perCapita": 253.1,
      "popChangePct": 1.99
    },
    {
      "year": 1999,
      "gdp": 6.164,
      "growth": 4.5,
      "perCapita": 255.5,
      "popChangePct": 1.88
    },
    {
      "year": 2000,
      "gdp": 6.537,
      "growth": 6.1,
      "perCapita": 266.3,
      "popChangePct": 1.75
    },
    {
      "year": 2001,
      "gdp": 6.719,
      "growth": 5.6,
      "perCapita": 269.4,
      "popChangePct": 1.63
    },
    {
      "year": 2002,
      "gdp": 6.816,
      "growth": 0.1,
      "perCapita": 269.1,
      "popChangePct": 1.53
    },
    {
      "year": 2003,
      "gdp": 7.218,
      "growth": 3.9,
      "perCapita": 281.0,
      "popChangePct": 1.42
    },
    {
      "year": 2004,
      "gdp": 8.297,
      "growth": 4.7,
      "perCapita": 318.9,
      "popChangePct": 1.28
    },
    {
      "year": 2005,
      "gdp": 9.331,
      "growth": 3.5,
      "perCapita": 354.6,
      "popChangePct": 1.12
    },
    {
      "year": 2006,
      "gdp": 10.316,
      "growth": 3.4,
      "perCapita": 388.3,
      "popChangePct": 0.97
    },
    {
      "year": 2007,
      "gdp": 11.777,
      "growth": 3.4,
      "perCapita": 439.6,
      "popChangePct": 0.84
    },
    {
      "year": 2008,
      "gdp": 14.31,
      "growth": 6.1,
      "perCapita": 530.2,
      "popChangePct": 0.75
    },
    {
      "year": 2009,
      "gdp": 14.663,
      "growth": 4.5,
      "perCapita": 539.6,
      "popChangePct": 0.68
    },
    {
      "year": 2010,
      "gdp": 18.253,
      "growth": 4.8,
      "perCapita": 667.6,
      "popChangePct": 0.62
    },
    {
      "year": 2011,
      "gdp": 21.685,
      "growth": 3.4,
      "perCapita": 789.6,
      "popChangePct": 0.45
    },
    {
      "year": 2012,
      "gdp": 21.703,
      "growth": 4.7,
      "perCapita": 788.2,
      "popChangePct": 0.26
    },
    {
      "year": 2013,
      "gdp": 22.162,
      "growth": 3.5,
      "perCapita": 803.3,
      "popChangePct": 0.2
    },
    {
      "year": 2014,
      "gdp": 22.722,
      "growth": 6,
      "perCapita": 821.1,
      "popChangePct": 0.3
    },
    {
      "year": 2015,
      "gdp": 24.361,
      "growth": 4,
      "perCapita": 875.5,
      "popChangePct": 0.55
    },
    {
      "year": 2016,
      "gdp": 24.524,
      "growth": 0.4,
      "perCapita": 877.3,
      "popChangePct": 0.47
    },
    {
      "year": 2017,
      "gdp": 28.972,
      "growth": 9,
      "perCapita": 1034.3,
      "popChangePct": 0.2
    },
    {
      "year": 2018,
      "gdp": 33.112,
      "growth": 7.6,
      "perCapita": 1179.2,
      "popChangePct": 0.25
    },
    {
      "year": 2019,
      "gdp": 34.186,
      "growth": 6.7,
      "perCapita": 1203.1,
      "popChangePct": 1.19
    },
    {
      "year": 2020,
      "gdp": 33.434,
      "growth": -2.4,
      "perCapita": 1154.2,
      "popChangePct": 1.95
    },
    {
      "year": 2021,
      "gdp": 36.927,
      "growth": 4.8,
      "perCapita": 1252.8,
      "popChangePct": 1.75
    },
    {
      "year": 2022,
      "gdp": 41.183,
      "growth": 5.6,
      "perCapita": 1385.9,
      "popChangePct": 0.81
    },
    {
      "year": 2023,
      "gdp": 41.048,
      "growth": 2,
      "perCapita": 1382.3,
      "popChangePct": -0.07
    },
    {
      "year": 2024,
      "gdp": 42.914,
      "growth": 3.7,
      "perCapita": 1447.3,
      "popChangePct": -0.15
    },
    {
      "year": 2025,
      "gdp": 44.81,
      "growth": 4.6,
      "perCapita": 1511.5,
      "popChangePct": -0.02
    },
    {
      "year": 2026,
      "gdp": 45.844,
      "growth": 3,
      "perCapita": 1547.6,
      "popChangePct": -0.07
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 48.09,
      "growth": 4.6,
      "perCapita": 1624.4,
      "popChangePct": -0.06
    },
    {
      "year": 2028,
      "gdp": 52.928,
      "growth": 5.3,
      "perCapita": 1788.9,
      "popChangePct": -0.06
    },
    {
      "year": 2029,
      "gdp": 58.294,
      "growth": 5.1,
      "perCapita": 1971.5,
      "popChangePct": -0.06
    },
    {
      "year": 2030,
      "gdp": 64.168,
      "growth": 5,
      "perCapita": 2171.5,
      "popChangePct": -0.06
    },
    {
      "year": 2031,
      "gdp": 70.396,
      "growth": 5,
      "perCapita": 2383.8,
      "popChangePct": -0.06
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 7.68,
      "perCapitaPPP": 493.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 9.108,
      "perCapitaPPP": 571.5,
      "perCapitaPPPChangePct": 15.89,
      "popChangePct": 2.32
    },
    {
      "year": 1982,
      "gdpPPP": 10.036,
      "perCapitaPPP": 615.3,
      "perCapitaPPPChangePct": 7.66,
      "popChangePct": 2.35
    },
    {
      "year": 1983,
      "gdpPPP": 10.118,
      "perCapitaPPP": 606.1,
      "perCapitaPPPChangePct": -1.5,
      "popChangePct": 2.35
    },
    {
      "year": 1984,
      "gdpPPP": 11.498,
      "perCapitaPPP": 673.1,
      "perCapitaPPPChangePct": 11.05,
      "popChangePct": 2.34
    },
    {
      "year": 1985,
      "gdpPPP": 12.591,
      "perCapitaPPP": 720.4,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": 2.31
    },
    {
      "year": 1986,
      "gdpPPP": 13.431,
      "perCapitaPPP": 751.7,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 2.23
    },
    {
      "year": 1987,
      "gdpPPP": 13.998,
      "perCapitaPPP": 767.0,
      "perCapitaPPPChangePct": 2.04,
      "popChangePct": 2.14
    },
    {
      "year": 1988,
      "gdpPPP": 15.607,
      "perCapitaPPP": 837.3,
      "perCapitaPPPChangePct": 9.17,
      "popChangePct": 2.13
    },
    {
      "year": 1989,
      "gdpPPP": 16.921,
      "perCapitaPPP": 887.9,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 2.25
    },
    {
      "year": 1990,
      "gdpPPP": 18.367,
      "perCapitaPPP": 940.7,
      "perCapitaPPPChangePct": 5.96,
      "popChangePct": 2.45
    },
    {
      "year": 1991,
      "gdpPPP": 20.198,
      "perCapitaPPP": 1008.0,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 2.62
    },
    {
      "year": 1992,
      "gdpPPP": 21.507,
      "perCapitaPPP": 1043.5,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 2.86
    },
    {
      "year": 1993,
      "gdpPPP": 22.863,
      "perCapitaPPP": 1079.5,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 2.77
    },
    {
      "year": 1994,
      "gdpPPP": 25.271,
      "perCapitaPPP": 1163.6,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 2.54
    },
    {
      "year": 1995,
      "gdpPPP": 26.695,
      "perCapitaPPP": 1200.0,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 2.43
    },
    {
      "year": 1996,
      "gdpPPP": 28.635,
      "perCapitaPPP": 1259.1,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 2.23
    },
    {
      "year": 1997,
      "gdpPPP": 30.661,
      "perCapitaPPP": 1320.5,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 2.1
    },
    {
      "year": 1998,
      "gdpPPP": 31.918,
      "perCapitaPPP": 1347.9,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 1.99
    },
    {
      "year": 1999,
      "gdpPPP": 33.821,
      "perCapitaPPP": 1401.9,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.88
    },
    {
      "year": 2000,
      "gdpPPP": 36.703,
      "perCapitaPPP": 1495.2,
      "perCapitaPPPChangePct": 6.66,
      "popChangePct": 1.75
    },
    {
      "year": 2001,
      "gdpPPP": 39.641,
      "perCapitaPPP": 1589.0,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": 1.63
    },
    {
      "year": 2002,
      "gdpPPP": 40.306,
      "perCapitaPPP": 1591.3,
      "perCapitaPPPChangePct": 0.14,
      "popChangePct": 1.53
    },
    {
      "year": 2003,
      "gdpPPP": 42.723,
      "perCapitaPPP": 1663.1,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 1.42
    },
    {
      "year": 2004,
      "gdpPPP": 45.926,
      "perCapitaPPP": 1765.3,
      "perCapitaPPPChangePct": 6.14,
      "popChangePct": 1.28
    },
    {
      "year": 2005,
      "gdpPPP": 49.014,
      "perCapitaPPP": 1863.0,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 1.12
    },
    {
      "year": 2006,
      "gdpPPP": 52.226,
      "perCapitaPPP": 1965.9,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 0.97
    },
    {
      "year": 2007,
      "gdpPPP": 55.471,
      "perCapitaPPP": 2070.7,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": 0.84
    },
    {
      "year": 2008,
      "gdpPPP": 59.991,
      "perCapitaPPP": 2222.7,
      "perCapitaPPPChangePct": 7.34,
      "popChangePct": 0.75
    },
    {
      "year": 2009,
      "gdpPPP": 63.097,
      "perCapitaPPP": 2322.0,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": 0.68
    },
    {
      "year": 2010,
      "gdpPPP": 66.94,
      "perCapitaPPP": 2448.2,
      "perCapitaPPPChangePct": 5.43,
      "popChangePct": 0.62
    },
    {
      "year": 2011,
      "gdpPPP": 70.659,
      "perCapitaPPP": 2572.7,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 0.45
    },
    {
      "year": 2012,
      "gdpPPP": 75.336,
      "perCapitaPPP": 2736.0,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 0.26
    },
    {
      "year": 2013,
      "gdpPPP": 79.319,
      "perCapitaPPP": 2874.9,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 0.2
    },
    {
      "year": 2014,
      "gdpPPP": 85.552,
      "perCapitaPPP": 3091.6,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 0.3
    },
    {
      "year": 2015,
      "gdpPPP": 89.779,
      "perCapitaPPP": 3226.7,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 0.55
    },
    {
      "year": 2016,
      "gdpPPP": 91.024,
      "perCapitaPPP": 3256.1,
      "perCapitaPPPChangePct": 0.91,
      "popChangePct": 0.47
    },
    {
      "year": 2017,
      "gdpPPP": 100.972,
      "perCapitaPPP": 3604.7,
      "perCapitaPPPChangePct": 10.71,
      "popChangePct": 0.2
    },
    {
      "year": 2018,
      "gdpPPP": 111.087,
      "perCapitaPPP": 3956.1,
      "perCapitaPPPChangePct": 9.75,
      "popChangePct": 0.25
    },
    {
      "year": 2019,
      "gdpPPP": 121.063,
      "perCapitaPPP": 4260.7,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": 1.19
    },
    {
      "year": 2020,
      "gdpPPP": 122.69,
      "perCapitaPPP": 4235.6,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 1.95
    },
    {
      "year": 2021,
      "gdpPPP": 134,
      "perCapitaPPP": 4546.2,
      "perCapitaPPPChangePct": 7.33,
      "popChangePct": 1.75
    },
    {
      "year": 2022,
      "gdpPPP": 151.613,
      "perCapitaPPP": 5102.2,
      "perCapitaPPPChangePct": 12.23,
      "popChangePct": 0.81
    },
    {
      "year": 2023,
      "gdpPPP": 160.34,
      "perCapitaPPP": 5399.6,
      "perCapitaPPPChangePct": 5.83,
      "popChangePct": -0.07
    },
    {
      "year": 2024,
      "gdpPPP": 170.344,
      "perCapitaPPP": 5744.9,
      "perCapitaPPPChangePct": 6.39,
      "popChangePct": -0.15
    },
    {
      "year": 2025,
      "gdpPPP": 183.241,
      "perCapitaPPP": 6181.1,
      "perCapitaPPPChangePct": 7.59,
      "popChangePct": -0.02
    },
    {
      "year": 2026,
      "gdpPPP": 194.062,
      "perCapitaPPP": 6551.1,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": -0.07
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 207.375,
      "perCapitaPPP": 7004.8,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": -0.06
    },
    {
      "year": 2028,
      "gdpPPP": 221.966,
      "perCapitaPPP": 7502.3,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": -0.06
    },
    {
      "year": 2029,
      "gdpPPP": 237.545,
      "perCapitaPPP": 8033.9,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": -0.06
    },
    {
      "year": 2030,
      "gdpPPP": 254.119,
      "perCapitaPPP": 8599.8,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": -0.06
    },
    {
      "year": 2031,
      "gdpPPP": 271.749,
      "perCapitaPPP": 9202.2,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": -0.06
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NepalGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
