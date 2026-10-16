import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Dominican Republic",
  "slug": "dominican-republic",
  "iso3": "DOM",
  "region": "Americas",
  "rank2026": 68,
  "flagEmoji": "🇩🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Ecuador",
      "slug": "ecuador",
      "rank": 67
    },
    {
      "name": "Puerto Rico",
      "slug": "puerto-rico",
      "rank": 69
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 8.672,
      "growth": 8,
      "perCapita": 1534.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 9.698,
      "growth": 4.3,
      "perCapita": 1677.4,
      "popChangePct": 2.28
    },
    {
      "year": 1982,
      "gdp": 9.141,
      "growth": 1.7,
      "perCapita": 1545.1,
      "popChangePct": 2.34
    },
    {
      "year": 1983,
      "gdp": 9.461,
      "growth": 4.6,
      "perCapita": 1562.1,
      "popChangePct": 2.37
    },
    {
      "year": 1984,
      "gdp": 14.87,
      "growth": 1.3,
      "perCapita": 2397.6,
      "popChangePct": 2.41
    },
    {
      "year": 1985,
      "gdp": 6.496,
      "growth": -2.1,
      "perCapita": 1022.6,
      "popChangePct": 2.43
    },
    {
      "year": 1986,
      "gdp": 7.891,
      "growth": 3.5,
      "perCapita": 1212.4,
      "popChangePct": 2.46
    },
    {
      "year": 1987,
      "gdp": 8.305,
      "growth": 10.1,
      "perCapita": 1245.3,
      "popChangePct": 2.46
    },
    {
      "year": 1988,
      "gdp": 7.605,
      "growth": 2.2,
      "perCapita": 1113.8,
      "popChangePct": 2.38
    },
    {
      "year": 1989,
      "gdp": 8.589,
      "growth": 4.4,
      "perCapita": 1230.7,
      "popChangePct": 2.21
    },
    {
      "year": 1990,
      "gdp": 7.995,
      "growth": -5.5,
      "perCapita": 1123.2,
      "popChangePct": 1.99
    },
    {
      "year": 1991,
      "gdp": 9.887,
      "growth": 0.9,
      "perCapita": 1365.2,
      "popChangePct": 1.74
    },
    {
      "year": 1992,
      "gdp": 11.605,
      "growth": 11.2,
      "perCapita": 1573.7,
      "popChangePct": 1.84
    },
    {
      "year": 1993,
      "gdp": 13.081,
      "growth": 7.4,
      "perCapita": 1741.7,
      "popChangePct": 1.84
    },
    {
      "year": 1994,
      "gdp": 14.645,
      "growth": 2.6,
      "perCapita": 1916.4,
      "popChangePct": 1.74
    },
    {
      "year": 1995,
      "gdp": 16.637,
      "growth": 5.7,
      "perCapita": 2141.1,
      "popChangePct": 1.69
    },
    {
      "year": 1996,
      "gdp": 18.242,
      "growth": 6,
      "perCapita": 2309.9,
      "popChangePct": 1.62
    },
    {
      "year": 1997,
      "gdp": 20.017,
      "growth": 8.9,
      "perCapita": 2495.0,
      "popChangePct": 1.6
    },
    {
      "year": 1998,
      "gdp": 21.672,
      "growth": 6.7,
      "perCapita": 2658.5,
      "popChangePct": 1.61
    },
    {
      "year": 1999,
      "gdp": 22.137,
      "growth": 6,
      "perCapita": 2674.8,
      "popChangePct": 1.52
    },
    {
      "year": 2000,
      "gdp": 24.306,
      "growth": 4.7,
      "perCapita": 2894.3,
      "popChangePct": 1.47
    },
    {
      "year": 2001,
      "gdp": 25.602,
      "growth": 2.5,
      "perCapita": 3007.4,
      "popChangePct": 1.37
    },
    {
      "year": 2002,
      "gdp": 27.249,
      "growth": 4.5,
      "perCapita": 3158.4,
      "popChangePct": 1.35
    },
    {
      "year": 2003,
      "gdp": 21.518,
      "growth": -1.3,
      "perCapita": 2460.6,
      "popChangePct": 1.36
    },
    {
      "year": 2004,
      "gdp": 22.506,
      "growth": 2.6,
      "perCapita": 2540.8,
      "popChangePct": 1.29
    },
    {
      "year": 2005,
      "gdp": 35.948,
      "growth": 9.4,
      "perCapita": 4008.4,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdp": 37.998,
      "growth": 9.2,
      "perCapita": 4188.7,
      "popChangePct": 1.15
    },
    {
      "year": 2007,
      "gdp": 44.067,
      "growth": 7.4,
      "perCapita": 4803.5,
      "popChangePct": 1.14
    },
    {
      "year": 2008,
      "gdp": 48.174,
      "growth": 3.3,
      "perCapita": 5191.4,
      "popChangePct": 1.16
    },
    {
      "year": 2009,
      "gdp": 48.281,
      "growth": 1,
      "perCapita": 5147.2,
      "popChangePct": 1.08
    },
    {
      "year": 2010,
      "gdp": 53.862,
      "growth": 8.4,
      "perCapita": 5682.5,
      "popChangePct": 1.06
    },
    {
      "year": 2011,
      "gdp": 58.006,
      "growth": 3.2,
      "perCapita": 6054.8,
      "popChangePct": 1.07
    },
    {
      "year": 2012,
      "gdp": 60.627,
      "growth": 2.8,
      "perCapita": 6262.5,
      "popChangePct": 1.05
    },
    {
      "year": 2013,
      "gdp": 62.631,
      "growth": 4.9,
      "perCapita": 6401.0,
      "popChangePct": 1.07
    },
    {
      "year": 2014,
      "gdp": 67.098,
      "growth": 7.1,
      "perCapita": 6788.9,
      "popChangePct": 1.0
    },
    {
      "year": 2015,
      "gdp": 71.056,
      "growth": 7,
      "perCapita": 7119.6,
      "popChangePct": 0.98
    },
    {
      "year": 2016,
      "gdp": 75.625,
      "growth": 6.7,
      "perCapita": 7506.2,
      "popChangePct": 0.95
    },
    {
      "year": 2017,
      "gdp": 79.153,
      "growth": 3.9,
      "perCapita": 7783.6,
      "popChangePct": 0.93
    },
    {
      "year": 2018,
      "gdp": 85.068,
      "growth": 7.1,
      "perCapita": 8286.3,
      "popChangePct": 0.95
    },
    {
      "year": 2019,
      "gdp": 89.237,
      "growth": 4.9,
      "perCapita": 8615.0,
      "popChangePct": 0.9
    },
    {
      "year": 2020,
      "gdp": 78.625,
      "growth": -7.9,
      "perCapita": 7525.0,
      "popChangePct": 0.87
    },
    {
      "year": 2021,
      "gdp": 95.067,
      "growth": 14,
      "perCapita": 9023.4,
      "popChangePct": 0.84
    },
    {
      "year": 2022,
      "gdp": 113.813,
      "growth": 5.2,
      "perCapita": 10714.9,
      "popChangePct": 0.82
    },
    {
      "year": 2023,
      "gdp": 120.794,
      "growth": 2.2,
      "perCapita": 11279.6,
      "popChangePct": 0.82
    },
    {
      "year": 2024,
      "gdp": 124.613,
      "growth": 5,
      "perCapita": 11541.6,
      "popChangePct": 0.82
    },
    {
      "year": 2025,
      "gdp": 127.895,
      "growth": 2.1,
      "perCapita": 11749.2,
      "popChangePct": 0.82
    },
    {
      "year": 2026,
      "gdp": 136.148,
      "growth": 3.7,
      "perCapita": 12405.6,
      "popChangePct": 0.83
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 144.243,
      "growth": 4.4,
      "perCapita": 13036.4,
      "popChangePct": 0.82
    },
    {
      "year": 2028,
      "gdp": 154.411,
      "growth": 4.7,
      "perCapita": 13841.8,
      "popChangePct": 0.81
    },
    {
      "year": 2029,
      "gdp": 165.495,
      "growth": 4.9,
      "perCapita": 14714.7,
      "popChangePct": 0.82
    },
    {
      "year": 2030,
      "gdp": 177.435,
      "growth": 5,
      "perCapita": 15647.9,
      "popChangePct": 0.82
    },
    {
      "year": 2031,
      "gdp": 190.474,
      "growth": 5,
      "perCapita": 16661.2,
      "popChangePct": 0.82
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 14.099,
      "perCapitaPPP": 2494.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 16.094,
      "perCapitaPPP": 2783.8,
      "perCapitaPPPChangePct": 11.59,
      "popChangePct": 2.28
    },
    {
      "year": 1982,
      "gdpPPP": 17.379,
      "perCapitaPPP": 2937.6,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 2.34
    },
    {
      "year": 1983,
      "gdpPPP": 18.895,
      "perCapitaPPP": 3119.9,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 2.37
    },
    {
      "year": 1984,
      "gdpPPP": 19.822,
      "perCapitaPPP": 3196.1,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 2.41
    },
    {
      "year": 1985,
      "gdpPPP": 20.015,
      "perCapitaPPP": 3150.7,
      "perCapitaPPPChangePct": -1.42,
      "popChangePct": 2.43
    },
    {
      "year": 1986,
      "gdpPPP": 21.137,
      "perCapitaPPP": 3247.5,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 2.46
    },
    {
      "year": 1987,
      "gdpPPP": 23.852,
      "perCapitaPPP": 3576.7,
      "perCapitaPPPChangePct": 10.14,
      "popChangePct": 2.46
    },
    {
      "year": 1988,
      "gdpPPP": 25.226,
      "perCapitaPPP": 3694.6,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 2.38
    },
    {
      "year": 1989,
      "gdpPPP": 27.369,
      "perCapitaPPP": 3921.6,
      "perCapitaPPPChangePct": 6.14,
      "popChangePct": 2.21
    },
    {
      "year": 1990,
      "gdpPPP": 26.844,
      "perCapitaPPP": 3771.4,
      "perCapitaPPPChangePct": -3.83,
      "popChangePct": 1.99
    },
    {
      "year": 1991,
      "gdpPPP": 28.015,
      "perCapitaPPP": 3868.4,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 1.74
    },
    {
      "year": 1992,
      "gdpPPP": 31.873,
      "perCapitaPPP": 4322.0,
      "perCapitaPPPChangePct": 11.72,
      "popChangePct": 1.84
    },
    {
      "year": 1993,
      "gdpPPP": 35.032,
      "perCapitaPPP": 4664.3,
      "perCapitaPPPChangePct": 7.92,
      "popChangePct": 1.84
    },
    {
      "year": 1994,
      "gdpPPP": 36.708,
      "perCapitaPPP": 4803.7,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 1.74
    },
    {
      "year": 1995,
      "gdpPPP": 39.614,
      "perCapitaPPP": 5097.9,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": 1.69
    },
    {
      "year": 1996,
      "gdpPPP": 42.744,
      "perCapitaPPP": 5412.6,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 1.62
    },
    {
      "year": 1997,
      "gdpPPP": 47.351,
      "perCapitaPPP": 5901.9,
      "perCapitaPPPChangePct": 9.04,
      "popChangePct": 1.6
    },
    {
      "year": 1998,
      "gdpPPP": 51.094,
      "perCapitaPPP": 6267.7,
      "perCapitaPPPChangePct": 6.2,
      "popChangePct": 1.61
    },
    {
      "year": 1999,
      "gdpPPP": 54.903,
      "perCapitaPPP": 6634.1,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 1.52
    },
    {
      "year": 2000,
      "gdpPPP": 58.759,
      "perCapitaPPP": 6996.9,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.47
    },
    {
      "year": 2001,
      "gdpPPP": 61.565,
      "perCapitaPPP": 7231.9,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 1.37
    },
    {
      "year": 2002,
      "gdpPPP": 65.327,
      "perCapitaPPP": 7572.0,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 1.35
    },
    {
      "year": 2003,
      "gdpPPP": 65.718,
      "perCapitaPPP": 7514.9,
      "perCapitaPPPChangePct": -0.75,
      "popChangePct": 1.36
    },
    {
      "year": 2004,
      "gdpPPP": 69.23,
      "perCapitaPPP": 7815.8,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.29
    },
    {
      "year": 2005,
      "gdpPPP": 78.135,
      "perCapitaPPP": 8712.5,
      "perCapitaPPPChangePct": 11.47,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdpPPP": 87.932,
      "perCapitaPPP": 9693.2,
      "perCapitaPPPChangePct": 11.26,
      "popChangePct": 1.15
    },
    {
      "year": 2007,
      "gdpPPP": 97.014,
      "perCapitaPPP": 10574.8,
      "perCapitaPPPChangePct": 9.09,
      "popChangePct": 1.14
    },
    {
      "year": 2008,
      "gdpPPP": 102.114,
      "perCapitaPPP": 11004.2,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 1.16
    },
    {
      "year": 2009,
      "gdpPPP": 103.775,
      "perCapitaPPP": 11063.3,
      "perCapitaPPPChangePct": 0.54,
      "popChangePct": 1.08
    },
    {
      "year": 2010,
      "gdpPPP": 113.861,
      "perCapitaPPP": 12012.4,
      "perCapitaPPPChangePct": 8.58,
      "popChangePct": 1.06
    },
    {
      "year": 2011,
      "gdpPPP": 119.919,
      "perCapitaPPP": 12517.5,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 1.07
    },
    {
      "year": 2012,
      "gdpPPP": 125.543,
      "perCapitaPPP": 12968.0,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": 1.05
    },
    {
      "year": 2013,
      "gdpPPP": 133.98,
      "perCapitaPPP": 13692.8,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 1.07
    },
    {
      "year": 2014,
      "gdpPPP": 146.007,
      "perCapitaPPP": 14772.8,
      "perCapitaPPPChangePct": 7.89,
      "popChangePct": 1.0
    },
    {
      "year": 2015,
      "gdpPPP": 157.659,
      "perCapitaPPP": 15797.2,
      "perCapitaPPPChangePct": 6.93,
      "popChangePct": 0.98
    },
    {
      "year": 2016,
      "gdpPPP": 169.853,
      "perCapitaPPP": 16858.7,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": 0.95
    },
    {
      "year": 2017,
      "gdpPPP": 179.696,
      "perCapitaPPP": 17670.6,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 0.93
    },
    {
      "year": 2018,
      "gdpPPP": 194.021,
      "perCapitaPPP": 18899.1,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 0.95
    },
    {
      "year": 2019,
      "gdpPPP": 215.34,
      "perCapitaPPP": 20789.1,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 0.9
    },
    {
      "year": 2020,
      "gdpPPP": 209.139,
      "perCapitaPPP": 20016.2,
      "perCapitaPPPChangePct": -3.72,
      "popChangePct": 0.87
    },
    {
      "year": 2021,
      "gdpPPP": 245.311,
      "perCapitaPPP": 23284.2,
      "perCapitaPPPChangePct": 16.33,
      "popChangePct": 0.84
    },
    {
      "year": 2022,
      "gdpPPP": 276.522,
      "perCapitaPPP": 26033.1,
      "perCapitaPPPChangePct": 11.81,
      "popChangePct": 0.82
    },
    {
      "year": 2023,
      "gdpPPP": 293.04,
      "perCapitaPPP": 27363.7,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": 0.82
    },
    {
      "year": 2024,
      "gdpPPP": 315.191,
      "perCapitaPPP": 29192.8,
      "perCapitaPPPChangePct": 6.68,
      "popChangePct": 0.82
    },
    {
      "year": 2025,
      "gdpPPP": 330.995,
      "perCapitaPPP": 30407.2,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 0.82
    },
    {
      "year": 2026,
      "gdpPPP": 353.142,
      "perCapitaPPP": 32177.9,
      "perCapitaPPPChangePct": 5.82,
      "popChangePct": 0.83
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 376.764,
      "perCapitaPPP": 34051.0,
      "perCapitaPPPChangePct": 5.82,
      "popChangePct": 0.82
    },
    {
      "year": 2028,
      "gdpPPP": 400.876,
      "perCapitaPPP": 35935.4,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 0.81
    },
    {
      "year": 2029,
      "gdpPPP": 427.818,
      "perCapitaPPP": 38038.6,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 0.82
    },
    {
      "year": 2030,
      "gdpPPP": 457.255,
      "perCapitaPPP": 40325.3,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 0.82
    },
    {
      "year": 2031,
      "gdpPPP": 488.804,
      "perCapitaPPP": 42756.9,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 0.82
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function DominicanRepublicGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
