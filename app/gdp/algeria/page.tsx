import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Algeria",
  "slug": "algeria",
  "iso3": "DZA",
  "region": "Africa",
  "rank2026": 51,
  "flagEmoji": "🇩🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Finland",
      "slug": "finland",
      "rank": 50
    },
    {
      "name": "Greece",
      "slug": "greece",
      "rank": 52
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 45.957,
      "growth": -5.4,
      "perCapita": 2462.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 48.156,
      "growth": 3,
      "perCapita": 2502.1,
      "popChangePct": 3.11
    },
    {
      "year": 1982,
      "gdp": 48.599,
      "growth": 6.4,
      "perCapita": 2446.6,
      "popChangePct": 3.21
    },
    {
      "year": 1983,
      "gdp": 51.582,
      "growth": 5.4,
      "perCapita": 2514.3,
      "popChangePct": 3.28
    },
    {
      "year": 1984,
      "gdp": 55.906,
      "growth": 5.6,
      "perCapita": 2640.2,
      "popChangePct": 3.21
    },
    {
      "year": 1985,
      "gdp": 66.346,
      "growth": 5.6,
      "perCapita": 2988.5,
      "popChangePct": 4.84
    },
    {
      "year": 1986,
      "gdp": 66.783,
      "growth": -0.2,
      "perCapita": 2929.1,
      "popChangePct": 2.7
    },
    {
      "year": 1987,
      "gdp": 68.698,
      "growth": -0.7,
      "perCapita": 2935.8,
      "popChangePct": 2.63
    },
    {
      "year": 1988,
      "gdp": 56.07,
      "growth": -1.9,
      "perCapita": 2326.6,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdp": 57.041,
      "growth": 4.8,
      "perCapita": 2309.3,
      "popChangePct": 2.49
    },
    {
      "year": 1990,
      "gdp": 67.171,
      "growth": 0.8,
      "perCapita": 2684.5,
      "popChangePct": 1.3
    },
    {
      "year": 1991,
      "gdp": 50.65,
      "growth": -1.2,
      "perCapita": 1975.2,
      "popChangePct": 2.48
    },
    {
      "year": 1992,
      "gdp": 53.414,
      "growth": 1.6,
      "perCapita": 2033.2,
      "popChangePct": 2.45
    },
    {
      "year": 1993,
      "gdp": 55.309,
      "growth": -2.1,
      "perCapita": 2056.6,
      "popChangePct": 2.37
    },
    {
      "year": 1994,
      "gdp": 46.044,
      "growth": -0.9,
      "perCapita": 1674.6,
      "popChangePct": 2.24
    },
    {
      "year": 1995,
      "gdp": 45.654,
      "growth": 3.8,
      "perCapita": 1627.0,
      "popChangePct": 2.05
    },
    {
      "year": 1996,
      "gdp": 50.945,
      "growth": 3.8,
      "perCapita": 1783.4,
      "popChangePct": 1.8
    },
    {
      "year": 1997,
      "gdp": 52.287,
      "growth": 1.1,
      "perCapita": 1800.2,
      "popChangePct": 1.68
    },
    {
      "year": 1998,
      "gdp": 52.297,
      "growth": 5.1,
      "perCapita": 1772.4,
      "popChangePct": 1.59
    },
    {
      "year": 1999,
      "gdp": 53.011,
      "growth": 3.2,
      "perCapita": 1769.1,
      "popChangePct": 1.55
    },
    {
      "year": 2000,
      "gdp": 59.418,
      "growth": 3.8,
      "perCapita": 1947.8,
      "popChangePct": 1.81
    },
    {
      "year": 2001,
      "gdp": 59.413,
      "growth": 3,
      "perCapita": 1919.4,
      "popChangePct": 1.47
    },
    {
      "year": 2002,
      "gdp": 61.516,
      "growth": 5.4,
      "perCapita": 1958.2,
      "popChangePct": 1.49
    },
    {
      "year": 2003,
      "gdp": 73.482,
      "growth": 6.5,
      "perCapita": 2304.6,
      "popChangePct": 1.5
    },
    {
      "year": 2004,
      "gdp": 91.914,
      "growth": 4.5,
      "perCapita": 2839.8,
      "popChangePct": 1.51
    },
    {
      "year": 2005,
      "gdp": 107.047,
      "growth": 5.4,
      "perCapita": 3258.2,
      "popChangePct": 1.51
    },
    {
      "year": 2006,
      "gdp": 123.084,
      "growth": 2.9,
      "perCapita": 3690.6,
      "popChangePct": 1.51
    },
    {
      "year": 2007,
      "gdp": 142.483,
      "growth": 3.1,
      "perCapita": 4208.2,
      "popChangePct": 1.52
    },
    {
      "year": 2008,
      "gdp": 180.384,
      "growth": 2.5,
      "perCapita": 5214.8,
      "popChangePct": 2.16
    },
    {
      "year": 2009,
      "gdp": 150.317,
      "growth": 1.2,
      "perCapita": 4262.1,
      "popChangePct": 1.96
    },
    {
      "year": 2010,
      "gdp": 177.785,
      "growth": 4.8,
      "perCapita": 4941.5,
      "popChangePct": 2.01
    },
    {
      "year": 2011,
      "gdp": 218.332,
      "growth": 3,
      "perCapita": 5946.3,
      "popChangePct": 2.05
    },
    {
      "year": 2012,
      "gdp": 227.144,
      "growth": 2.4,
      "perCapita": 6058.0,
      "popChangePct": 2.12
    },
    {
      "year": 2013,
      "gdp": 229.701,
      "growth": 2.6,
      "perCapita": 5997.9,
      "popChangePct": 2.14
    },
    {
      "year": 2014,
      "gdp": 238.943,
      "growth": 4.1,
      "perCapita": 6108.9,
      "popChangePct": 2.13
    },
    {
      "year": 2015,
      "gdp": 187.494,
      "growth": 3.2,
      "perCapita": 4691.7,
      "popChangePct": 2.17
    },
    {
      "year": 2016,
      "gdp": 180.764,
      "growth": 3.9,
      "perCapita": 4426.6,
      "popChangePct": 2.18
    },
    {
      "year": 2017,
      "gdp": 190.004,
      "growth": 1.5,
      "perCapita": 4554.1,
      "popChangePct": 2.17
    },
    {
      "year": 2018,
      "gdp": 194.507,
      "growth": 1.4,
      "perCapita": 4568.2,
      "popChangePct": 2.05
    },
    {
      "year": 2019,
      "gdp": 193.361,
      "growth": 0.9,
      "perCapita": 4452.9,
      "popChangePct": 1.99
    },
    {
      "year": 2020,
      "gdp": 164.774,
      "growth": -5,
      "perCapita": 3757.6,
      "popChangePct": 0.98
    },
    {
      "year": 2021,
      "gdp": 185.85,
      "growth": 3.8,
      "perCapita": 4169.2,
      "popChangePct": 1.66
    },
    {
      "year": 2022,
      "gdp": 225.709,
      "growth": 3.6,
      "perCapita": 4983.5,
      "popChangePct": 1.6
    },
    {
      "year": 2023,
      "gdp": 248.087,
      "growth": 4.1,
      "perCapita": 5396.3,
      "popChangePct": 1.51
    },
    {
      "year": 2024,
      "gdp": 269.14,
      "growth": 3.7,
      "perCapita": 5772.3,
      "popChangePct": 1.42
    },
    {
      "year": 2025,
      "gdp": 285.724,
      "growth": 3.8,
      "perCapita": 6046.9,
      "popChangePct": 1.34
    },
    {
      "year": 2026,
      "gdp": 317.173,
      "growth": 3.8,
      "perCapita": 6628.4,
      "popChangePct": 1.27
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 319.16,
      "growth": 2.9,
      "perCapita": 6590.8,
      "popChangePct": 1.2
    },
    {
      "year": 2028,
      "gdp": 319.479,
      "growth": 2.7,
      "perCapita": 6519.2,
      "popChangePct": 1.2
    },
    {
      "year": 2029,
      "gdp": 322.957,
      "growth": 2.7,
      "perCapita": 6512.0,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdp": 325.415,
      "growth": 2.6,
      "perCapita": 6483.8,
      "popChangePct": 1.2
    },
    {
      "year": 2031,
      "gdp": 327.645,
      "growth": 2.6,
      "perCapita": 6450.8,
      "popChangePct": 1.2
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 77.817,
      "perCapitaPPP": 4168.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 87.735,
      "perCapitaPPP": 4558.6,
      "perCapitaPPPChangePct": 9.35,
      "popChangePct": 3.11
    },
    {
      "year": 1982,
      "gdpPPP": 99.118,
      "perCapitaPPP": 4989.8,
      "perCapitaPPPChangePct": 9.46,
      "popChangePct": 3.21
    },
    {
      "year": 1983,
      "gdpPPP": 108.562,
      "perCapitaPPP": 5291.6,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 3.28
    },
    {
      "year": 1984,
      "gdpPPP": 118.779,
      "perCapitaPPP": 5609.4,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 3.21
    },
    {
      "year": 1985,
      "gdpPPP": 129.397,
      "perCapitaPPP": 5828.7,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 4.84
    },
    {
      "year": 1986,
      "gdpPPP": 131.738,
      "perCapitaPPP": 5778.0,
      "perCapitaPPPChangePct": -0.87,
      "popChangePct": 2.7
    },
    {
      "year": 1987,
      "gdpPPP": 134.057,
      "perCapitaPPP": 5729.0,
      "perCapitaPPPChangePct": -0.85,
      "popChangePct": 2.63
    },
    {
      "year": 1988,
      "gdpPPP": 136.148,
      "perCapitaPPP": 5649.3,
      "perCapitaPPPChangePct": -1.39,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdpPPP": 148.278,
      "perCapitaPPP": 6003.2,
      "perCapitaPPPChangePct": 6.26,
      "popChangePct": 2.49
    },
    {
      "year": 1990,
      "gdpPPP": 155.058,
      "perCapitaPPP": 6196.9,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": 1.3
    },
    {
      "year": 1991,
      "gdpPPP": 158.379,
      "perCapitaPPP": 6176.3,
      "perCapitaPPPChangePct": -0.33,
      "popChangePct": 2.48
    },
    {
      "year": 1992,
      "gdpPPP": 164.581,
      "perCapitaPPP": 6264.7,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 2.45
    },
    {
      "year": 1993,
      "gdpPPP": 164.939,
      "perCapitaPPP": 6132.9,
      "perCapitaPPPChangePct": -2.1,
      "popChangePct": 2.37
    },
    {
      "year": 1994,
      "gdpPPP": 166.945,
      "perCapitaPPP": 6071.6,
      "perCapitaPPPChangePct": -1.0,
      "popChangePct": 2.24
    },
    {
      "year": 1995,
      "gdpPPP": 177.003,
      "perCapitaPPP": 6308.0,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 2.05
    },
    {
      "year": 1996,
      "gdpPPP": 187.093,
      "perCapitaPPP": 6549.5,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 1.8
    },
    {
      "year": 1997,
      "gdpPPP": 192.413,
      "perCapitaPPP": 6624.6,
      "perCapitaPPPChangePct": 1.15,
      "popChangePct": 1.68
    },
    {
      "year": 1998,
      "gdpPPP": 204.499,
      "perCapitaPPP": 6930.5,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 1.59
    },
    {
      "year": 1999,
      "gdpPPP": 214.029,
      "perCapitaPPP": 7142.6,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": 1.55
    },
    {
      "year": 2000,
      "gdpPPP": 227.195,
      "perCapitaPPP": 7447.5,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.81
    },
    {
      "year": 2001,
      "gdpPPP": 239.279,
      "perCapitaPPP": 7730.2,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 1.47
    },
    {
      "year": 2002,
      "gdpPPP": 256.12,
      "perCapitaPPP": 8153.0,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.49
    },
    {
      "year": 2003,
      "gdpPPP": 278.153,
      "perCapitaPPP": 8723.6,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 1.5
    },
    {
      "year": 2004,
      "gdpPPP": 298.485,
      "perCapitaPPP": 9222.2,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.51
    },
    {
      "year": 2005,
      "gdpPPP": 324.469,
      "perCapitaPPP": 9875.8,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": 1.51
    },
    {
      "year": 2006,
      "gdpPPP": 344.175,
      "perCapitaPPP": 10319.8,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": 1.51
    },
    {
      "year": 2007,
      "gdpPPP": 364.458,
      "perCapitaPPP": 10764.3,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 1.52
    },
    {
      "year": 2008,
      "gdpPPP": 380.766,
      "perCapitaPPP": 11007.7,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 2.16
    },
    {
      "year": 2009,
      "gdpPPP": 387.712,
      "perCapitaPPP": 10993.3,
      "perCapitaPPPChangePct": -0.13,
      "popChangePct": 1.96
    },
    {
      "year": 2010,
      "gdpPPP": 411.26,
      "perCapitaPPP": 11430.9,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 2.01
    },
    {
      "year": 2011,
      "gdpPPP": 432.338,
      "perCapitaPPP": 11774.9,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 2.05
    },
    {
      "year": 2012,
      "gdpPPP": 450.957,
      "perCapitaPPP": 12027.1,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 2.12
    },
    {
      "year": 2013,
      "gdpPPP": 470.557,
      "perCapitaPPP": 12287.0,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 2.14
    },
    {
      "year": 2014,
      "gdpPPP": 498.381,
      "perCapitaPPP": 12741.8,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 2.13
    },
    {
      "year": 2015,
      "gdpPPP": 519.103,
      "perCapitaPPP": 12989.6,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 2.17
    },
    {
      "year": 2016,
      "gdpPPP": 544.473,
      "perCapitaPPP": 13333.2,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 2.18
    },
    {
      "year": 2017,
      "gdpPPP": 562.537,
      "perCapitaPPP": 13483.3,
      "perCapitaPPPChangePct": 1.13,
      "popChangePct": 2.17
    },
    {
      "year": 2018,
      "gdpPPP": 583.472,
      "perCapitaPPP": 13703.6,
      "perCapitaPPPChangePct": 1.63,
      "popChangePct": 2.05
    },
    {
      "year": 2019,
      "gdpPPP": 601.471,
      "perCapitaPPP": 13851.1,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 1.99
    },
    {
      "year": 2020,
      "gdpPPP": 558.3,
      "perCapitaPPP": 12731.8,
      "perCapitaPPPChangePct": -8.08,
      "popChangePct": 0.98
    },
    {
      "year": 2021,
      "gdpPPP": 648.896,
      "perCapitaPPP": 14556.8,
      "perCapitaPPPChangePct": 14.33,
      "popChangePct": 1.66
    },
    {
      "year": 2022,
      "gdpPPP": 720.069,
      "perCapitaPPP": 15898.8,
      "perCapitaPPPChangePct": 9.22,
      "popChangePct": 1.6
    },
    {
      "year": 2023,
      "gdpPPP": 777.328,
      "perCapitaPPP": 16908.2,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.51
    },
    {
      "year": 2024,
      "gdpPPP": 826.1,
      "perCapitaPPP": 17717.5,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 1.42
    },
    {
      "year": 2025,
      "gdpPPP": 882.007,
      "perCapitaPPP": 18666.2,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 1.34
    },
    {
      "year": 2026,
      "gdpPPP": 941.544,
      "perCapitaPPP": 19676.7,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 1.27
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 989.865,
      "perCapitaPPP": 20441.3,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.2
    },
    {
      "year": 2028,
      "gdpPPP": 1033.015,
      "perCapitaPPP": 21079.4,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": 1.2
    },
    {
      "year": 2029,
      "gdpPPP": 1079.828,
      "perCapitaPPP": 21773.4,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdpPPP": 1128.637,
      "perCapitaPPP": 22487.7,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 1.2
    },
    {
      "year": 2031,
      "gdpPPP": 1179.2,
      "perCapitaPPP": 23216.5,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 1.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AlgeriaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
