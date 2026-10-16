import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Antigua and Barbuda",
  "slug": "antigua-and-barbuda",
  "iso3": "ATG",
  "region": "Americas",
  "rank2026": 190,
  "flagEmoji": "🇦🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "San Marino",
      "slug": "san-marino",
      "rank": 189
    },
    {
      "name": "Eritrea",
      "slug": "eritrea",
      "rank": 191
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.132,
      "growth": 8.2,
      "perCapita": 1935.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.149,
      "growth": 3.8,
      "perCapita": 2199.9,
      "popChangePct": 0.0
    },
    {
      "year": 1982,
      "gdp": 0.166,
      "growth": -0.1,
      "perCapita": 2479.5,
      "popChangePct": -1.47
    },
    {
      "year": 1983,
      "gdp": 0.185,
      "growth": 5.4,
      "perCapita": 2794.1,
      "popChangePct": -1.49
    },
    {
      "year": 1984,
      "gdp": 0.212,
      "growth": 10.2,
      "perCapita": 3260.0,
      "popChangePct": -1.52
    },
    {
      "year": 1985,
      "gdp": 0.246,
      "growth": 7.6,
      "perCapita": 3849.1,
      "popChangePct": -1.54
    },
    {
      "year": 1986,
      "gdp": 0.298,
      "growth": 11.5,
      "perCapita": 4730.8,
      "popChangePct": -1.56
    },
    {
      "year": 1987,
      "gdp": 0.347,
      "growth": 6.6,
      "perCapita": 5612.1,
      "popChangePct": -1.59
    },
    {
      "year": 1988,
      "gdp": 0.411,
      "growth": 5.2,
      "perCapita": 6756.8,
      "popChangePct": -1.61
    },
    {
      "year": 1989,
      "gdp": 0.455,
      "growth": 5.3,
      "perCapita": 7544.7,
      "popChangePct": -1.64
    },
    {
      "year": 1990,
      "gdp": 0.479,
      "growth": 3,
      "perCapita": 7942.8,
      "popChangePct": 0.0
    },
    {
      "year": 1991,
      "gdp": 0.504,
      "growth": 2.2,
      "perCapita": 8300.0,
      "popChangePct": 1.67
    },
    {
      "year": 1992,
      "gdp": 0.525,
      "growth": 1.2,
      "perCapita": 8503.0,
      "popChangePct": 1.64
    },
    {
      "year": 1993,
      "gdp": 0.566,
      "growth": 5.3,
      "perCapita": 8956.8,
      "popChangePct": 1.61
    },
    {
      "year": 1994,
      "gdp": 0.625,
      "growth": 6.7,
      "perCapita": 9647.5,
      "popChangePct": 3.17
    },
    {
      "year": 1995,
      "gdp": 0.616,
      "growth": -4.4,
      "perCapita": 9257.9,
      "popChangePct": 3.08
    },
    {
      "year": 1996,
      "gdp": 0.679,
      "growth": 6.6,
      "perCapita": 9930.5,
      "popChangePct": 1.49
    },
    {
      "year": 1997,
      "gdp": 0.734,
      "growth": 5.5,
      "perCapita": 10443.4,
      "popChangePct": 2.94
    },
    {
      "year": 1998,
      "gdp": 0.79,
      "growth": 4.7,
      "perCapita": 10932.0,
      "popChangePct": 2.86
    },
    {
      "year": 1999,
      "gdp": 0.836,
      "growth": 3.7,
      "perCapita": 11286.2,
      "popChangePct": 2.78
    },
    {
      "year": 2000,
      "gdp": 0.901,
      "growth": 6.2,
      "perCapita": 11918.5,
      "popChangePct": 2.7
    },
    {
      "year": 2001,
      "gdp": 0.878,
      "growth": -4.5,
      "perCapita": 11416.6,
      "popChangePct": 1.32
    },
    {
      "year": 2002,
      "gdp": 0.898,
      "growth": 1,
      "perCapita": 11563.7,
      "popChangePct": 1.3
    },
    {
      "year": 2003,
      "gdp": 0.948,
      "growth": 6.1,
      "perCapita": 12091.3,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 1.026,
      "growth": 5.8,
      "perCapita": 12959.4,
      "popChangePct": 1.28
    },
    {
      "year": 2005,
      "gdp": 1.144,
      "growth": 6.5,
      "perCapita": 14297.5,
      "popChangePct": 1.27
    },
    {
      "year": 2006,
      "gdp": 1.304,
      "growth": 12.7,
      "perCapita": 16123.6,
      "popChangePct": 1.25
    },
    {
      "year": 2007,
      "gdp": 1.487,
      "growth": 9.3,
      "perCapita": 18197.4,
      "popChangePct": 1.23
    },
    {
      "year": 2008,
      "gdp": 1.558,
      "growth": 0,
      "perCapita": 18843.3,
      "popChangePct": 1.22
    },
    {
      "year": 2009,
      "gdp": 1.387,
      "growth": -12,
      "perCapita": 16580.4,
      "popChangePct": 1.2
    },
    {
      "year": 2010,
      "gdp": 1.298,
      "growth": -7.8,
      "perCapita": 15342.9,
      "popChangePct": 1.19
    },
    {
      "year": 2011,
      "gdp": 1.287,
      "growth": -2,
      "perCapita": 15045.0,
      "popChangePct": 1.18
    },
    {
      "year": 2012,
      "gdp": 1.365,
      "growth": 3.4,
      "perCapita": 15724.0,
      "popChangePct": 1.16
    },
    {
      "year": 2013,
      "gdp": 1.325,
      "growth": -0.6,
      "perCapita": 15050.7,
      "popChangePct": 1.15
    },
    {
      "year": 2014,
      "gdp": 1.379,
      "growth": 2.2,
      "perCapita": 15423.3,
      "popChangePct": 1.14
    },
    {
      "year": 2015,
      "gdp": 1.437,
      "growth": 1.4,
      "perCapita": 15839.2,
      "popChangePct": 2.25
    },
    {
      "year": 2016,
      "gdp": 1.49,
      "growth": 4.1,
      "perCapita": 16163.8,
      "popChangePct": 1.1
    },
    {
      "year": 2017,
      "gdp": 1.535,
      "growth": 2.7,
      "perCapita": 16401.4,
      "popChangePct": 2.17
    },
    {
      "year": 2018,
      "gdp": 1.662,
      "growth": 6.7,
      "perCapita": 17470.7,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdp": 1.726,
      "growth": 3.2,
      "perCapita": 17899.4,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdp": 1.412,
      "growth": -18.9,
      "perCapita": 14419.9,
      "popChangePct": 2.08
    },
    {
      "year": 2021,
      "gdp": 1.602,
      "growth": 8.2,
      "perCapita": 16128.2,
      "popChangePct": 1.02
    },
    {
      "year": 2022,
      "gdp": 1.857,
      "growth": 8.5,
      "perCapita": 18428.9,
      "popChangePct": 2.02
    },
    {
      "year": 2023,
      "gdp": 2.054,
      "growth": 3.9,
      "perCapita": 20099.8,
      "popChangePct": 0.99
    },
    {
      "year": 2024,
      "gdp": 2.162,
      "growth": 2.5,
      "perCapita": 20887.6,
      "popChangePct": 1.96
    },
    {
      "year": 2025,
      "gdp": 2.273,
      "growth": 3,
      "perCapita": 21675.7,
      "popChangePct": 0.96
    },
    {
      "year": 2026,
      "gdp": 2.385,
      "growth": 2.6,
      "perCapita": 22447.5,
      "popChangePct": 0.95
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2.492,
      "growth": 2.4,
      "perCapita": 23156.2,
      "popChangePct": 1.89
    },
    {
      "year": 2028,
      "gdp": 2.604,
      "growth": 2.5,
      "perCapita": 23887.2,
      "popChangePct": 0.93
    },
    {
      "year": 2029,
      "gdp": 2.721,
      "growth": 2.5,
      "perCapita": 24642.7,
      "popChangePct": 0.92
    },
    {
      "year": 2030,
      "gdp": 2.844,
      "growth": 2.5,
      "perCapita": 25423.5,
      "popChangePct": 1.82
    },
    {
      "year": 2031,
      "gdp": 2.972,
      "growth": 2.5,
      "perCapita": 26230.6,
      "popChangePct": 0.89
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.234,
      "perCapitaPPP": 3426.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.266,
      "perCapitaPPP": 3923.9,
      "perCapitaPPPChangePct": 14.53,
      "popChangePct": 0.0
    },
    {
      "year": 1982,
      "gdpPPP": 0.283,
      "perCapitaPPP": 4211.2,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": -1.47
    },
    {
      "year": 1983,
      "gdpPPP": 0.31,
      "perCapitaPPP": 4678.1,
      "perCapitaPPPChangePct": 11.09,
      "popChangePct": -1.49
    },
    {
      "year": 1984,
      "gdpPPP": 0.353,
      "perCapitaPPP": 5427.1,
      "perCapitaPPPChangePct": 16.01,
      "popChangePct": -1.52
    },
    {
      "year": 1985,
      "gdpPPP": 0.392,
      "perCapitaPPP": 6129.3,
      "perCapitaPPPChangePct": 12.94,
      "popChangePct": -1.54
    },
    {
      "year": 1986,
      "gdpPPP": 0.446,
      "perCapitaPPP": 7094.3,
      "perCapitaPPPChangePct": 15.74,
      "popChangePct": -1.56
    },
    {
      "year": 1987,
      "gdpPPP": 0.488,
      "perCapitaPPP": 7888.7,
      "perCapitaPPPChangePct": 11.2,
      "popChangePct": -1.59
    },
    {
      "year": 1988,
      "gdpPPP": 0.531,
      "perCapitaPPP": 8722.6,
      "perCapitaPPPChangePct": 10.57,
      "popChangePct": -1.61
    },
    {
      "year": 1989,
      "gdpPPP": 0.581,
      "perCapitaPPP": 9628.7,
      "perCapitaPPPChangePct": 10.39,
      "popChangePct": -1.64
    },
    {
      "year": 1990,
      "gdpPPP": 0.621,
      "perCapitaPPP": 10300.0,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 0.0
    },
    {
      "year": 1991,
      "gdpPPP": 0.656,
      "perCapitaPPP": 10792.0,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 1.67
    },
    {
      "year": 1992,
      "gdpPPP": 0.678,
      "perCapitaPPP": 10985.9,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 1.64
    },
    {
      "year": 1993,
      "gdpPPP": 0.731,
      "perCapitaPPP": 11578.3,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 1.61
    },
    {
      "year": 1994,
      "gdpPPP": 0.797,
      "perCapitaPPP": 12296.3,
      "perCapitaPPPChangePct": 6.2,
      "popChangePct": 3.17
    },
    {
      "year": 1995,
      "gdpPPP": 0.778,
      "perCapitaPPP": 11690.7,
      "perCapitaPPPChangePct": -4.92,
      "popChangePct": 3.08
    },
    {
      "year": 1996,
      "gdpPPP": 0.845,
      "perCapitaPPP": 12348.5,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 1.49
    },
    {
      "year": 1997,
      "gdpPPP": 0.906,
      "perCapitaPPP": 12884.2,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 2.94
    },
    {
      "year": 1998,
      "gdpPPP": 0.96,
      "perCapitaPPP": 13282.5,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 2.86
    },
    {
      "year": 1999,
      "gdpPPP": 1.009,
      "perCapitaPPP": 13632.8,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 2.78
    },
    {
      "year": 2000,
      "gdpPPP": 1.096,
      "perCapitaPPP": 14500.0,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 2.7
    },
    {
      "year": 2001,
      "gdpPPP": 1.07,
      "perCapitaPPP": 13914.9,
      "perCapitaPPPChangePct": -4.04,
      "popChangePct": 1.32
    },
    {
      "year": 2002,
      "gdpPPP": 1.098,
      "perCapitaPPP": 14133.1,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 1.3
    },
    {
      "year": 2003,
      "gdpPPP": 1.187,
      "perCapitaPPP": 15142.3,
      "perCapitaPPPChangePct": 7.14,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 1.29,
      "perCapitaPPP": 16283.4,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 1.28
    },
    {
      "year": 2005,
      "gdpPPP": 1.416,
      "perCapitaPPP": 17699.9,
      "perCapitaPPPChangePct": 8.7,
      "popChangePct": 1.27
    },
    {
      "year": 2006,
      "gdpPPP": 1.645,
      "perCapitaPPP": 20348.8,
      "perCapitaPPPChangePct": 14.97,
      "popChangePct": 1.25
    },
    {
      "year": 2007,
      "gdpPPP": 1.847,
      "perCapitaPPP": 22600.7,
      "perCapitaPPPChangePct": 11.07,
      "popChangePct": 1.23
    },
    {
      "year": 2008,
      "gdpPPP": 1.883,
      "perCapitaPPP": 22774.6,
      "perCapitaPPPChangePct": 0.77,
      "popChangePct": 1.22
    },
    {
      "year": 2009,
      "gdpPPP": 1.668,
      "perCapitaPPP": 19941.9,
      "perCapitaPPPChangePct": -12.44,
      "popChangePct": 1.2
    },
    {
      "year": 2010,
      "gdpPPP": 1.556,
      "perCapitaPPP": 18382.3,
      "perCapitaPPPChangePct": -7.82,
      "popChangePct": 1.19
    },
    {
      "year": 2011,
      "gdpPPP": 1.557,
      "perCapitaPPP": 18191.0,
      "perCapitaPPPChangePct": -1.04,
      "popChangePct": 1.18
    },
    {
      "year": 2012,
      "gdpPPP": 1.639,
      "perCapitaPPP": 18884.2,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 1.16
    },
    {
      "year": 2013,
      "gdpPPP": 1.657,
      "perCapitaPPP": 18813.5,
      "perCapitaPPPChangePct": -0.37,
      "popChangePct": 1.15
    },
    {
      "year": 2014,
      "gdpPPP": 1.723,
      "perCapitaPPP": 19272.7,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 1.14
    },
    {
      "year": 2015,
      "gdpPPP": 1.764,
      "perCapitaPPP": 19431.6,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": 2.25
    },
    {
      "year": 2016,
      "gdpPPP": 1.854,
      "perCapitaPPP": 20113.8,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 1.1
    },
    {
      "year": 2017,
      "gdpPPP": 1.938,
      "perCapitaPPP": 20709.4,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": 2.17
    },
    {
      "year": 2018,
      "gdpPPP": 2.23,
      "perCapitaPPP": 23446.8,
      "perCapitaPPPChangePct": 13.22,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdpPPP": 2.426,
      "perCapitaPPP": 25149.7,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdpPPP": 2.055,
      "perCapitaPPP": 20987.8,
      "perCapitaPPPChangePct": -16.55,
      "popChangePct": 2.08
    },
    {
      "year": 2021,
      "gdpPPP": 2.378,
      "perCapitaPPP": 23934.4,
      "perCapitaPPPChangePct": 14.04,
      "popChangePct": 1.02
    },
    {
      "year": 2022,
      "gdpPPP": 2.763,
      "perCapitaPPP": 27419.2,
      "perCapitaPPPChangePct": 14.56,
      "popChangePct": 2.02
    },
    {
      "year": 2023,
      "gdpPPP": 2.976,
      "perCapitaPPP": 29121.6,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 0.99
    },
    {
      "year": 2024,
      "gdpPPP": 3.127,
      "perCapitaPPP": 30210.2,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 1.96
    },
    {
      "year": 2025,
      "gdpPPP": 3.314,
      "perCapitaPPP": 31600.4,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 0.96
    },
    {
      "year": 2026,
      "gdpPPP": 3.497,
      "perCapitaPPP": 32920.7,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.95
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3.66,
      "perCapitaPPP": 34008.2,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 1.89
    },
    {
      "year": 2028,
      "gdpPPP": 3.813,
      "perCapitaPPP": 34974.7,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.93
    },
    {
      "year": 2029,
      "gdpPPP": 3.978,
      "perCapitaPPP": 36019.2,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 0.92
    },
    {
      "year": 2030,
      "gdpPPP": 4.152,
      "perCapitaPPP": 37118.7,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 1.82
    },
    {
      "year": 2031,
      "gdpPPP": 4.334,
      "perCapitaPPP": 38241.8,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 0.89
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AntiguaAndBarbudaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
