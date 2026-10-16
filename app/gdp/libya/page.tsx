import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Libya",
  "slug": "libya",
  "iso3": "LBY",
  "region": "Africa",
  "rank2026": 100,
  "flagEmoji": "🇱🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Latvia",
      "slug": "latvia",
      "rank": 99
    },
    {
      "name": "Cambodia",
      "slug": "cambodia",
      "rank": 101
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 40.19,
      "growth": 0.6,
      "perCapita": 12889.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 34.72,
      "growth": -20,
      "perCapita": 10644.8,
      "popChangePct": 4.62
    },
    {
      "year": 1982,
      "gdp": 34.616,
      "growth": 1.5,
      "perCapita": 10134.9,
      "popChangePct": 4.72
    },
    {
      "year": 1983,
      "gdp": 32.988,
      "growth": -4.7,
      "perCapita": 9268.4,
      "popChangePct": 4.19
    },
    {
      "year": 1984,
      "gdp": 30.89,
      "growth": -8.3,
      "perCapita": 8319.4,
      "popChangePct": 4.33
    },
    {
      "year": 1985,
      "gdp": 30.384,
      "growth": 0.6,
      "perCapita": 8228.6,
      "popChangePct": -0.57
    },
    {
      "year": 1986,
      "gdp": 24.756,
      "growth": -11.4,
      "perCapita": 6453.4,
      "popChangePct": 3.9
    },
    {
      "year": 1987,
      "gdp": 23.009,
      "growth": -14.7,
      "perCapita": 5752.0,
      "popChangePct": 4.28
    },
    {
      "year": 1988,
      "gdp": 25.87,
      "growth": 7.6,
      "perCapita": 5732.4,
      "popChangePct": 12.82
    },
    {
      "year": 1989,
      "gdp": 27.446,
      "growth": 7.2,
      "perCapita": 5817.1,
      "popChangePct": 4.54
    },
    {
      "year": 1990,
      "gdp": 31.627,
      "growth": 3.7,
      "perCapita": 7114.8,
      "popChangePct": -5.79
    },
    {
      "year": 1991,
      "gdp": 34.995,
      "growth": 18.3,
      "perCapita": 7700.6,
      "popChangePct": 2.23
    },
    {
      "year": 1992,
      "gdp": 35.459,
      "growth": -4.5,
      "perCapita": 7641.5,
      "popChangePct": 2.11
    },
    {
      "year": 1993,
      "gdp": 31.912,
      "growth": -5.5,
      "perCapita": 6742.4,
      "popChangePct": 2.0
    },
    {
      "year": 1994,
      "gdp": 29.719,
      "growth": 3.2,
      "perCapita": 6163.1,
      "popChangePct": 1.88
    },
    {
      "year": 1995,
      "gdp": 33.739,
      "growth": -15.4,
      "perCapita": 6875.8,
      "popChangePct": 1.76
    },
    {
      "year": 1996,
      "gdp": 36.827,
      "growth": 1.8,
      "perCapita": 7384.0,
      "popChangePct": 1.63
    },
    {
      "year": 1997,
      "gdp": 37.702,
      "growth": -2.6,
      "perCapita": 7444.2,
      "popChangePct": 1.56
    },
    {
      "year": 1998,
      "gdp": 30.921,
      "growth": -0.7,
      "perCapita": 6014.8,
      "popChangePct": 1.5
    },
    {
      "year": 1999,
      "gdp": 37.129,
      "growth": -0.2,
      "perCapita": 7115.5,
      "popChangePct": 1.5
    },
    {
      "year": 2000,
      "gdp": 39.498,
      "growth": 4,
      "perCapita": 7445.3,
      "popChangePct": 1.67
    },
    {
      "year": 2001,
      "gdp": 35.206,
      "growth": 2.6,
      "perCapita": 6515.2,
      "popChangePct": 1.87
    },
    {
      "year": 2002,
      "gdp": 21.128,
      "growth": -3.7,
      "perCapita": 3835.5,
      "popChangePct": 1.92
    },
    {
      "year": 2003,
      "gdp": 27.026,
      "growth": 16.1,
      "perCapita": 4809.4,
      "popChangePct": 2.02
    },
    {
      "year": 2004,
      "gdp": 34.054,
      "growth": 5.8,
      "perCapita": 5936.2,
      "popChangePct": 2.1
    },
    {
      "year": 2005,
      "gdp": 48.852,
      "growth": 10.6,
      "perCapita": 8338.3,
      "popChangePct": 2.13
    },
    {
      "year": 2006,
      "gdp": 60.094,
      "growth": 0.3,
      "perCapita": 10048.9,
      "popChangePct": 2.07
    },
    {
      "year": 2007,
      "gdp": 68.211,
      "growth": 6.2,
      "perCapita": 11174.2,
      "popChangePct": 2.07
    },
    {
      "year": 2008,
      "gdp": 86.804,
      "growth": -0.2,
      "perCapita": 13921.1,
      "popChangePct": 2.15
    },
    {
      "year": 2009,
      "gdp": 60.767,
      "growth": -4.4,
      "perCapita": 9544.5,
      "popChangePct": 2.12
    },
    {
      "year": 2010,
      "gdp": 75.381,
      "growth": 5,
      "perCapita": 11600.9,
      "popChangePct": 2.06
    },
    {
      "year": 2011,
      "gdp": 48.17,
      "growth": -50.3,
      "perCapita": 7594.0,
      "popChangePct": -2.39
    },
    {
      "year": 2012,
      "gdp": 92.542,
      "growth": 86.8,
      "perCapita": 14976.1,
      "popChangePct": -2.59
    },
    {
      "year": 2013,
      "gdp": 75.355,
      "growth": -18,
      "perCapita": 11952.3,
      "popChangePct": 2.04
    },
    {
      "year": 2014,
      "gdp": 57.384,
      "growth": -23,
      "perCapita": 8928.3,
      "popChangePct": 1.93
    },
    {
      "year": 2015,
      "gdp": 48.718,
      "growth": -0.8,
      "perCapita": 7458.6,
      "popChangePct": 1.63
    },
    {
      "year": 2016,
      "gdp": 49.913,
      "growth": -1.5,
      "perCapita": 7525.9,
      "popChangePct": 1.53
    },
    {
      "year": 2017,
      "gdp": 67.153,
      "growth": 32.5,
      "perCapita": 9965.2,
      "popChangePct": 1.61
    },
    {
      "year": 2018,
      "gdp": 76.682,
      "growth": 7.9,
      "perCapita": 11195.9,
      "popChangePct": 1.63
    },
    {
      "year": 2019,
      "gdp": 69.237,
      "growth": -11.2,
      "perCapita": 9960.7,
      "popChangePct": 1.49
    },
    {
      "year": 2020,
      "gdp": 46.893,
      "growth": -29.5,
      "perCapita": 6655.8,
      "popChangePct": 1.35
    },
    {
      "year": 2021,
      "gdp": 35.216,
      "growth": 27.3,
      "perCapita": 4935.6,
      "popChangePct": 1.28
    },
    {
      "year": 2022,
      "gdp": 43.281,
      "growth": -8.6,
      "perCapita": 5991.5,
      "popChangePct": 1.25
    },
    {
      "year": 2023,
      "gdp": 43.958,
      "growth": 10.5,
      "perCapita": 6016.9,
      "popChangePct": 1.14
    },
    {
      "year": 2024,
      "gdp": 49.349,
      "growth": 4.2,
      "perCapita": 6685.9,
      "popChangePct": 1.03
    },
    {
      "year": 2025,
      "gdp": 44.732,
      "growth": 15.9,
      "perCapita": 5998.6,
      "popChangePct": 1.03
    },
    {
      "year": 2026,
      "gdp": 52.453,
      "growth": 6.7,
      "perCapita": 6962.1,
      "popChangePct": 1.03
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 50.082,
      "growth": 4.5,
      "perCapita": 6579.6,
      "popChangePct": 1.04
    },
    {
      "year": 2028,
      "gdp": 49.772,
      "growth": 4.5,
      "perCapita": 6472.0,
      "popChangePct": 1.02
    },
    {
      "year": 2029,
      "gdp": 49.842,
      "growth": 4.2,
      "perCapita": 6414.9,
      "popChangePct": 1.04
    },
    {
      "year": 2030,
      "gdp": 49.763,
      "growth": 4,
      "perCapita": 6339.4,
      "popChangePct": 1.03
    },
    {
      "year": 2031,
      "gdp": 49.473,
      "growth": 3.8,
      "perCapita": 6238.0,
      "popChangePct": 1.03
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 71.569,
      "perCapitaPPP": 22952.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 62.64,
      "perCapitaPPP": 19204.8,
      "perCapitaPPPChangePct": -16.33,
      "popChangePct": 4.62
    },
    {
      "year": 1982,
      "gdpPPP": 67.521,
      "perCapitaPPP": 19768.6,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 4.72
    },
    {
      "year": 1983,
      "gdpPPP": 66.86,
      "perCapitaPPP": 18785.5,
      "perCapitaPPPChangePct": -4.97,
      "popChangePct": 4.19
    },
    {
      "year": 1984,
      "gdpPPP": 63.52,
      "perCapitaPPP": 17107.4,
      "perCapitaPPPChangePct": -8.93,
      "popChangePct": 4.33
    },
    {
      "year": 1985,
      "gdpPPP": 65.926,
      "perCapitaPPP": 17854.1,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": -0.57
    },
    {
      "year": 1986,
      "gdpPPP": 59.619,
      "perCapitaPPP": 15541.5,
      "perCapitaPPPChangePct": -12.95,
      "popChangePct": 3.9
    },
    {
      "year": 1987,
      "gdpPPP": 52.114,
      "perCapitaPPP": 13027.8,
      "perCapitaPPPChangePct": -16.17,
      "popChangePct": 4.28
    },
    {
      "year": 1988,
      "gdpPPP": 58.04,
      "perCapitaPPP": 12860.6,
      "perCapitaPPPChangePct": -1.28,
      "popChangePct": 12.82
    },
    {
      "year": 1989,
      "gdpPPP": 64.659,
      "perCapitaPPP": 13704.2,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": 4.54
    },
    {
      "year": 1990,
      "gdpPPP": 69.574,
      "perCapitaPPP": 15651.3,
      "perCapitaPPPChangePct": 14.21,
      "popChangePct": -5.79
    },
    {
      "year": 1991,
      "gdpPPP": 85.104,
      "perCapitaPPP": 18727.3,
      "perCapitaPPPChangePct": 19.65,
      "popChangePct": 2.23
    },
    {
      "year": 1992,
      "gdpPPP": 83.087,
      "perCapitaPPP": 17905.4,
      "perCapitaPPPChangePct": -4.39,
      "popChangePct": 2.11
    },
    {
      "year": 1993,
      "gdpPPP": 80.405,
      "perCapitaPPP": 16988.1,
      "perCapitaPPPChangePct": -5.12,
      "popChangePct": 2.0
    },
    {
      "year": 1994,
      "gdpPPP": 84.766,
      "perCapitaPPP": 17578.9,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 1.88
    },
    {
      "year": 1995,
      "gdpPPP": 73.189,
      "perCapitaPPP": 14915.6,
      "perCapitaPPPChangePct": -15.15,
      "popChangePct": 1.76
    },
    {
      "year": 1996,
      "gdpPPP": 75.84,
      "perCapitaPPP": 15206.3,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": 1.63
    },
    {
      "year": 1997,
      "gdpPPP": 75.115,
      "perCapitaPPP": 14831.3,
      "perCapitaPPPChangePct": -2.47,
      "popChangePct": 1.56
    },
    {
      "year": 1998,
      "gdpPPP": 75.446,
      "perCapitaPPP": 14676.1,
      "perCapitaPPPChangePct": -1.05,
      "popChangePct": 1.5
    },
    {
      "year": 1999,
      "gdpPPP": 76.368,
      "perCapitaPPP": 14635.5,
      "perCapitaPPPChangePct": -0.28,
      "popChangePct": 1.5
    },
    {
      "year": 2000,
      "gdpPPP": 81.255,
      "perCapitaPPP": 15316.6,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 1.67
    },
    {
      "year": 2001,
      "gdpPPP": 85.267,
      "perCapitaPPP": 15779.5,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 1.87
    },
    {
      "year": 2002,
      "gdpPPP": 83.365,
      "perCapitaPPP": 15134.1,
      "perCapitaPPPChangePct": -4.09,
      "popChangePct": 1.92
    },
    {
      "year": 2003,
      "gdpPPP": 98.735,
      "perCapitaPPP": 17570.5,
      "perCapitaPPPChangePct": 16.1,
      "popChangePct": 2.02
    },
    {
      "year": 2004,
      "gdpPPP": 107.316,
      "perCapitaPPP": 18707.0,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 2.1
    },
    {
      "year": 2005,
      "gdpPPP": 122.435,
      "perCapitaPPP": 20897.6,
      "perCapitaPPPChangePct": 11.71,
      "popChangePct": 2.13
    },
    {
      "year": 2006,
      "gdpPPP": 126.562,
      "perCapitaPPP": 21163.5,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 2.07
    },
    {
      "year": 2007,
      "gdpPPP": 138.09,
      "perCapitaPPP": 22621.4,
      "perCapitaPPPChangePct": 6.89,
      "popChangePct": 2.07
    },
    {
      "year": 2008,
      "gdpPPP": 140.521,
      "perCapitaPPP": 22536.0,
      "perCapitaPPPChangePct": -0.38,
      "popChangePct": 2.15
    },
    {
      "year": 2009,
      "gdpPPP": 135.167,
      "perCapitaPPP": 21230.3,
      "perCapitaPPPChangePct": -5.79,
      "popChangePct": 2.12
    },
    {
      "year": 2010,
      "gdpPPP": 143.687,
      "perCapitaPPP": 22113.1,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 2.06
    },
    {
      "year": 2011,
      "gdpPPP": 72.829,
      "perCapitaPPP": 11481.5,
      "perCapitaPPPChangePct": -48.08,
      "popChangePct": -2.39
    },
    {
      "year": 2012,
      "gdpPPP": 138.599,
      "perCapitaPPP": 22429.4,
      "perCapitaPPPChangePct": 95.35,
      "popChangePct": -2.59
    },
    {
      "year": 2013,
      "gdpPPP": 115.588,
      "perCapitaPPP": 18333.8,
      "perCapitaPPPChangePct": -18.26,
      "popChangePct": 2.04
    },
    {
      "year": 2014,
      "gdpPPP": 90.503,
      "perCapitaPPP": 14081.1,
      "perCapitaPPPChangePct": -23.2,
      "popChangePct": 1.93
    },
    {
      "year": 2015,
      "gdpPPP": 90.573,
      "perCapitaPPP": 13866.4,
      "perCapitaPPPChangePct": -1.52,
      "popChangePct": 1.63
    },
    {
      "year": 2016,
      "gdpPPP": 90.07,
      "perCapitaPPP": 13580.9,
      "perCapitaPPPChangePct": -2.06,
      "popChangePct": 1.53
    },
    {
      "year": 2017,
      "gdpPPP": 121.473,
      "perCapitaPPP": 18026.0,
      "perCapitaPPPChangePct": 32.73,
      "popChangePct": 1.61
    },
    {
      "year": 2018,
      "gdpPPP": 129.306,
      "perCapitaPPP": 18879.3,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 1.63
    },
    {
      "year": 2019,
      "gdpPPP": 112.565,
      "perCapitaPPP": 16194.1,
      "perCapitaPPPChangePct": -14.22,
      "popChangePct": 1.49
    },
    {
      "year": 2020,
      "gdpPPP": 77.181,
      "perCapitaPPP": 10954.9,
      "perCapitaPPPChangePct": -32.35,
      "popChangePct": 1.35
    },
    {
      "year": 2021,
      "gdpPPP": 90.199,
      "perCapitaPPP": 12641.5,
      "perCapitaPPPChangePct": 15.4,
      "popChangePct": 1.28
    },
    {
      "year": 2022,
      "gdpPPP": 88.281,
      "perCapitaPPP": 12220.9,
      "perCapitaPPPChangePct": -3.33,
      "popChangePct": 1.25
    },
    {
      "year": 2023,
      "gdpPPP": 101.137,
      "perCapitaPPP": 13843.6,
      "perCapitaPPPChangePct": 13.28,
      "popChangePct": 1.14
    },
    {
      "year": 2024,
      "gdpPPP": 107.99,
      "perCapitaPPP": 14630.7,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 1.03
    },
    {
      "year": 2025,
      "gdpPPP": 128.679,
      "perCapitaPPP": 17255.8,
      "perCapitaPPPChangePct": 17.94,
      "popChangePct": 1.03
    },
    {
      "year": 2026,
      "gdpPPP": 141.26,
      "perCapitaPPP": 18749.4,
      "perCapitaPPPChangePct": 8.66,
      "popChangePct": 1.03
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 150.86,
      "perCapitaPPP": 19819.2,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 1.04
    },
    {
      "year": 2028,
      "gdpPPP": 160.177,
      "perCapitaPPP": 20828.4,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 1.02
    },
    {
      "year": 2029,
      "gdpPPP": 169.843,
      "perCapitaPPP": 21859.8,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 1.04
    },
    {
      "year": 2030,
      "gdpPPP": 179.836,
      "perCapitaPPP": 22909.5,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 1.03
    },
    {
      "year": 2031,
      "gdpPPP": 189.964,
      "perCapitaPPP": 23952.7,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 1.03
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LibyaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
