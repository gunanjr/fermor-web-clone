import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Albania",
  "slug": "albania",
  "iso3": "ALB",
  "region": "Europe",
  "rank2026": 119,
  "flagEmoji": "🇦🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Mali",
      "slug": "mali",
      "rank": 118
    },
    {
      "name": "Burkina Faso",
      "slug": "burkina-faso",
      "rank": 120
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.946,
      "growth": 2.7,
      "perCapita": 728.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.229,
      "growth": 5.7,
      "perCapita": 817.7,
      "popChangePct": 2.02
    },
    {
      "year": 1982,
      "gdp": 2.296,
      "growth": 2.9,
      "perCapita": 824.5,
      "popChangePct": 2.13
    },
    {
      "year": 1983,
      "gdp": 2.319,
      "growth": 1.1,
      "perCapita": 815.5,
      "popChangePct": 2.16
    },
    {
      "year": 1984,
      "gdp": 2.29,
      "growth": 2,
      "perCapita": 788.3,
      "popChangePct": 2.11
    },
    {
      "year": 1985,
      "gdp": 2.339,
      "growth": -1.5,
      "perCapita": 788.8,
      "popChangePct": 2.1
    },
    {
      "year": 1986,
      "gdp": 2.587,
      "growth": 5.6,
      "perCapita": 855.7,
      "popChangePct": 1.96
    },
    {
      "year": 1987,
      "gdp": 2.566,
      "growth": -0.8,
      "perCapita": 832.2,
      "popChangePct": 2.02
    },
    {
      "year": 1988,
      "gdp": 2.53,
      "growth": -1.4,
      "perCapita": 805.0,
      "popChangePct": 1.88
    },
    {
      "year": 1989,
      "gdp": 2.779,
      "growth": 9.8,
      "perCapita": 860.8,
      "popChangePct": 2.74
    },
    {
      "year": 1990,
      "gdp": 2.221,
      "growth": -10,
      "perCapita": 675.7,
      "popChangePct": 1.83
    },
    {
      "year": 1991,
      "gdp": 1.333,
      "growth": -28,
      "perCapita": 408.0,
      "popChangePct": -0.61
    },
    {
      "year": 1992,
      "gdp": 0.843,
      "growth": -7.2,
      "perCapita": 259.8,
      "popChangePct": -0.61
    },
    {
      "year": 1993,
      "gdp": 1.461,
      "growth": 9.6,
      "perCapita": 452.6,
      "popChangePct": -0.62
    },
    {
      "year": 1994,
      "gdp": 2.361,
      "growth": 9.4,
      "perCapita": 736.0,
      "popChangePct": -0.59
    },
    {
      "year": 1995,
      "gdp": 2.882,
      "growth": 8.9,
      "perCapita": 904.0,
      "popChangePct": -0.62
    },
    {
      "year": 1996,
      "gdp": 3.2,
      "growth": 9.1,
      "perCapita": 1010.0,
      "popChangePct": -0.63
    },
    {
      "year": 1997,
      "gdp": 2.225,
      "growth": -10.9,
      "perCapita": 706.6,
      "popChangePct": -0.63
    },
    {
      "year": 1998,
      "gdp": 2.555,
      "growth": 8.8,
      "perCapita": 816.6,
      "popChangePct": -0.6
    },
    {
      "year": 1999,
      "gdp": 3.226,
      "growth": 12.9,
      "perCapita": 1037.6,
      "popChangePct": -0.64
    },
    {
      "year": 2000,
      "gdp": 3.488,
      "growth": 6.9,
      "perCapita": 1129.0,
      "popChangePct": -0.64
    },
    {
      "year": 2001,
      "gdp": 3.927,
      "growth": 8.3,
      "perCapita": 1283.2,
      "popChangePct": -0.94
    },
    {
      "year": 2002,
      "gdp": 4.356,
      "growth": 4.5,
      "perCapita": 1427.7,
      "popChangePct": -0.29
    },
    {
      "year": 2003,
      "gdp": 5.561,
      "growth": 5.5,
      "perCapita": 1829.6,
      "popChangePct": -0.36
    },
    {
      "year": 2004,
      "gdp": 7.177,
      "growth": 5.5,
      "perCapita": 2371.1,
      "popChangePct": -0.43
    },
    {
      "year": 2005,
      "gdp": 8.052,
      "growth": 5.5,
      "perCapita": 2673.8,
      "popChangePct": -0.53
    },
    {
      "year": 2006,
      "gdp": 8.896,
      "growth": 5.9,
      "perCapita": 2972.7,
      "popChangePct": -0.6
    },
    {
      "year": 2007,
      "gdp": 10.677,
      "growth": 6,
      "perCapita": 3595.1,
      "popChangePct": -0.77
    },
    {
      "year": 2008,
      "gdp": 12.881,
      "growth": 7.5,
      "perCapita": 4370.6,
      "popChangePct": -0.77
    },
    {
      "year": 2009,
      "gdp": 12.044,
      "growth": 3.4,
      "perCapita": 4114.1,
      "popChangePct": -0.64
    },
    {
      "year": 2010,
      "gdp": 11.937,
      "growth": 3.7,
      "perCapita": 4097.8,
      "popChangePct": -0.51
    },
    {
      "year": 2011,
      "gdp": 12.899,
      "growth": 2.5,
      "perCapita": 4439.9,
      "popChangePct": -0.27
    },
    {
      "year": 2012,
      "gdp": 12.324,
      "growth": 1.4,
      "perCapita": 4248.9,
      "popChangePct": -0.17
    },
    {
      "year": 2013,
      "gdp": 12.784,
      "growth": 1,
      "perCapita": 4415.6,
      "popChangePct": -0.17
    },
    {
      "year": 2014,
      "gdp": 13.246,
      "growth": 1.8,
      "perCapita": 4584.9,
      "popChangePct": -0.21
    },
    {
      "year": 2015,
      "gdp": 11.389,
      "growth": 2.2,
      "perCapita": 3953.6,
      "popChangePct": -0.28
    },
    {
      "year": 2016,
      "gdp": 11.862,
      "growth": 3.9,
      "perCapita": 4124.4,
      "popChangePct": -0.17
    },
    {
      "year": 2017,
      "gdp": 13.053,
      "growth": 3.3,
      "perCapita": 4542.8,
      "popChangePct": -0.1
    },
    {
      "year": 2018,
      "gdp": 15.38,
      "growth": 3.7,
      "perCapita": 5365.6,
      "popChangePct": -0.24
    },
    {
      "year": 2019,
      "gdp": 15.582,
      "growth": 2.1,
      "perCapita": 5459.3,
      "popChangePct": -0.42
    },
    {
      "year": 2020,
      "gdp": 15.271,
      "growth": -3.3,
      "perCapita": 5381.1,
      "popChangePct": -0.56
    },
    {
      "year": 2021,
      "gdp": 17.985,
      "growth": 9,
      "perCapita": 6396.4,
      "popChangePct": -0.92
    },
    {
      "year": 2022,
      "gdp": 19.189,
      "growth": 4.8,
      "perCapita": 6908.1,
      "popChangePct": -1.21
    },
    {
      "year": 2023,
      "gdp": 23.633,
      "growth": 4,
      "perCapita": 8594.2,
      "popChangePct": -1.01
    },
    {
      "year": 2024,
      "gdp": 27.084,
      "growth": 4,
      "perCapita": 9948.4,
      "popChangePct": -1.02
    },
    {
      "year": 2025,
      "gdp": 30.279,
      "growth": 3.7,
      "perCapita": 11234.6,
      "popChangePct": -0.99
    },
    {
      "year": 2026,
      "gdp": 33.333,
      "growth": 3.4,
      "perCapita": 12492.6,
      "popChangePct": -1.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 34.912,
      "growth": 3.2,
      "perCapita": 13216.5,
      "popChangePct": -0.97
    },
    {
      "year": 2028,
      "gdp": 36.998,
      "growth": 3.2,
      "perCapita": 14147.5,
      "popChangePct": -1.02
    },
    {
      "year": 2029,
      "gdp": 39.189,
      "growth": 3.2,
      "perCapita": 15136.8,
      "popChangePct": -0.99
    },
    {
      "year": 2030,
      "gdp": 41.533,
      "growth": 3.2,
      "perCapita": 16204.0,
      "popChangePct": -1.0
    },
    {
      "year": 2031,
      "gdp": 44.032,
      "growth": 3.2,
      "perCapita": 17352.9,
      "popChangePct": -1.01
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 5.7,
      "perCapitaPPP": 2133.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 6.595,
      "perCapitaPPP": 2419.3,
      "perCapitaPPPChangePct": 13.41,
      "popChangePct": 2.02
    },
    {
      "year": 1982,
      "gdpPPP": 7.206,
      "perCapitaPPP": 2588.0,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 2.13
    },
    {
      "year": 1983,
      "gdpPPP": 7.57,
      "perCapitaPPP": 2661.9,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 2.16
    },
    {
      "year": 1984,
      "gdpPPP": 8,
      "perCapitaPPP": 2754.6,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 2.11
    },
    {
      "year": 1985,
      "gdpPPP": 8.13,
      "perCapitaPPP": 2742.1,
      "perCapitaPPPChangePct": -0.45,
      "popChangePct": 2.1
    },
    {
      "year": 1986,
      "gdpPPP": 8.758,
      "perCapitaPPP": 2897.4,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 1.96
    },
    {
      "year": 1987,
      "gdpPPP": 8.903,
      "perCapitaPPP": 2887.2,
      "perCapitaPPPChangePct": -0.35,
      "popChangePct": 2.02
    },
    {
      "year": 1988,
      "gdpPPP": 9.088,
      "perCapitaPPP": 2892.1,
      "perCapitaPPPChangePct": 0.17,
      "popChangePct": 1.88
    },
    {
      "year": 1989,
      "gdpPPP": 10.37,
      "perCapitaPPP": 3212.5,
      "perCapitaPPPChangePct": 11.08,
      "popChangePct": 2.74
    },
    {
      "year": 1990,
      "gdpPPP": 9.682,
      "perCapitaPPP": 2946.0,
      "perCapitaPPPChangePct": -8.3,
      "popChangePct": 1.83
    },
    {
      "year": 1991,
      "gdpPPP": 7.207,
      "perCapitaPPP": 2206.1,
      "perCapitaPPPChangePct": -25.11,
      "popChangePct": -0.61
    },
    {
      "year": 1992,
      "gdpPPP": 6.84,
      "perCapitaPPP": 2106.7,
      "perCapitaPPPChangePct": -4.51,
      "popChangePct": -0.61
    },
    {
      "year": 1993,
      "gdpPPP": 7.675,
      "perCapitaPPP": 2378.1,
      "perCapitaPPPChangePct": 12.88,
      "popChangePct": -0.62
    },
    {
      "year": 1994,
      "gdpPPP": 8.576,
      "perCapitaPPP": 2673.6,
      "perCapitaPPPChangePct": 12.42,
      "popChangePct": -0.59
    },
    {
      "year": 1995,
      "gdpPPP": 9.535,
      "perCapitaPPP": 2991.0,
      "perCapitaPPPChangePct": 11.87,
      "popChangePct": -0.62
    },
    {
      "year": 1996,
      "gdpPPP": 10.593,
      "perCapitaPPP": 3343.6,
      "perCapitaPPPChangePct": 11.79,
      "popChangePct": -0.63
    },
    {
      "year": 1997,
      "gdpPPP": 9.598,
      "perCapitaPPP": 3048.7,
      "perCapitaPPPChangePct": -8.82,
      "popChangePct": -0.63
    },
    {
      "year": 1998,
      "gdpPPP": 10.563,
      "perCapitaPPP": 3376.4,
      "perCapitaPPPChangePct": 10.75,
      "popChangePct": -0.6
    },
    {
      "year": 1999,
      "gdpPPP": 12.093,
      "perCapitaPPP": 3890.1,
      "perCapitaPPPChangePct": 15.22,
      "popChangePct": -0.64
    },
    {
      "year": 2000,
      "gdpPPP": 13.226,
      "perCapitaPPP": 4281.8,
      "perCapitaPPPChangePct": 10.07,
      "popChangePct": -0.64
    },
    {
      "year": 2001,
      "gdpPPP": 14.646,
      "perCapitaPPP": 4786.0,
      "perCapitaPPPChangePct": 11.78,
      "popChangePct": -0.94
    },
    {
      "year": 2002,
      "gdpPPP": 15.548,
      "perCapitaPPP": 5096.1,
      "perCapitaPPPChangePct": 6.48,
      "popChangePct": -0.29
    },
    {
      "year": 2003,
      "gdpPPP": 16.732,
      "perCapitaPPP": 5504.6,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": -0.36
    },
    {
      "year": 2004,
      "gdpPPP": 18.129,
      "perCapitaPPP": 5989.3,
      "perCapitaPPPChangePct": 8.81,
      "popChangePct": -0.43
    },
    {
      "year": 2005,
      "gdpPPP": 19.731,
      "perCapitaPPP": 6551.9,
      "perCapitaPPPChangePct": 9.39,
      "popChangePct": -0.53
    },
    {
      "year": 2006,
      "gdpPPP": 21.54,
      "perCapitaPPP": 7197.9,
      "perCapitaPPPChangePct": 9.86,
      "popChangePct": -0.6
    },
    {
      "year": 2007,
      "gdpPPP": 23.447,
      "perCapitaPPP": 7894.7,
      "perCapitaPPPChangePct": 9.68,
      "popChangePct": -0.77
    },
    {
      "year": 2008,
      "gdpPPP": 25.692,
      "perCapitaPPP": 8716.9,
      "perCapitaPPPChangePct": 10.42,
      "popChangePct": -0.77
    },
    {
      "year": 2009,
      "gdpPPP": 26.717,
      "perCapitaPPP": 9126.2,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": -0.64
    },
    {
      "year": 2010,
      "gdpPPP": 28.044,
      "perCapitaPPP": 9627.2,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": -0.51
    },
    {
      "year": 2011,
      "gdpPPP": 29.351,
      "perCapitaPPP": 10103.1,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": -0.27
    },
    {
      "year": 2012,
      "gdpPPP": 30.322,
      "perCapitaPPP": 10454.3,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": -0.17
    },
    {
      "year": 2013,
      "gdpPPP": 31.147,
      "perCapitaPPP": 10758.5,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": -0.17
    },
    {
      "year": 2014,
      "gdpPPP": 32.252,
      "perCapitaPPP": 11163.2,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": -0.21
    },
    {
      "year": 2015,
      "gdpPPP": 33.276,
      "perCapitaPPP": 11551.3,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": -0.28
    },
    {
      "year": 2016,
      "gdpPPP": 34.905,
      "perCapitaPPP": 12136.3,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": -0.17
    },
    {
      "year": 2017,
      "gdpPPP": 36.697,
      "perCapitaPPP": 12771.0,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": -0.1
    },
    {
      "year": 2018,
      "gdpPPP": 39.26,
      "perCapitaPPP": 13696.8,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": -0.24
    },
    {
      "year": 2019,
      "gdpPPP": 42.22,
      "perCapitaPPP": 14792.3,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": -0.42
    },
    {
      "year": 2020,
      "gdpPPP": 41.183,
      "perCapitaPPP": 14512.1,
      "perCapitaPPPChangePct": -1.89,
      "popChangePct": -0.56
    },
    {
      "year": 2021,
      "gdpPPP": 45.984,
      "perCapitaPPP": 16354.6,
      "perCapitaPPPChangePct": 12.7,
      "popChangePct": -0.92
    },
    {
      "year": 2022,
      "gdpPPP": 51.632,
      "perCapitaPPP": 18588.0,
      "perCapitaPPPChangePct": 13.66,
      "popChangePct": -1.21
    },
    {
      "year": 2023,
      "gdpPPP": 55.692,
      "perCapitaPPP": 20252.3,
      "perCapitaPPPChangePct": 8.95,
      "popChangePct": -1.01
    },
    {
      "year": 2024,
      "gdpPPP": 59.384,
      "perCapitaPPP": 21812.9,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": -1.02
    },
    {
      "year": 2025,
      "gdpPPP": 63.331,
      "perCapitaPPP": 23497.7,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": -0.99
    },
    {
      "year": 2026,
      "gdpPPP": 67.366,
      "perCapitaPPP": 25247.3,
      "perCapitaPPPChangePct": 7.45,
      "popChangePct": -1.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 71.045,
      "perCapitaPPP": 26895.2,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": -0.97
    },
    {
      "year": 2028,
      "gdpPPP": 74.55,
      "perCapitaPPP": 28507.1,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": -1.02
    },
    {
      "year": 2029,
      "gdpPPP": 78.292,
      "perCapitaPPP": 30240.6,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": -0.99
    },
    {
      "year": 2030,
      "gdpPPP": 82.265,
      "perCapitaPPP": 32095.8,
      "perCapitaPPPChangePct": 6.14,
      "popChangePct": -1.0
    },
    {
      "year": 2031,
      "gdpPPP": 86.411,
      "perCapitaPPP": 34053.9,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": -1.01
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AlbaniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
