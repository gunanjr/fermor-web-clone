import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Guyana",
  "slug": "guyana",
  "iso3": "GUY",
  "region": "Americas",
  "rank2026": 117,
  "flagEmoji": "🇬🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Papua New Guinea",
      "slug": "papua-new-guinea",
      "rank": 116
    },
    {
      "name": "Mali",
      "slug": "mali",
      "rank": 118
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.842,
      "growth": -2.1,
      "perCapita": 1101.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.808,
      "growth": 0.6,
      "perCapita": 1055.8,
      "popChangePct": 0.13
    },
    {
      "year": 1982,
      "gdp": 0.692,
      "growth": -8.9,
      "perCapita": 904.9,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdp": 0.703,
      "growth": -11.5,
      "perCapita": 921.5,
      "popChangePct": -0.26
    },
    {
      "year": 1984,
      "gdp": 0.654,
      "growth": 2.1,
      "perCapita": 861.1,
      "popChangePct": -0.52
    },
    {
      "year": 1985,
      "gdp": 0.697,
      "growth": 0.4,
      "perCapita": 924.3,
      "popChangePct": -0.66
    },
    {
      "year": 1986,
      "gdp": 0.789,
      "growth": -0.2,
      "perCapita": 1053.7,
      "popChangePct": -0.8
    },
    {
      "year": 1987,
      "gdp": 0.728,
      "growth": -0.1,
      "perCapita": 982.3,
      "popChangePct": -0.8
    },
    {
      "year": 1988,
      "gdp": 0.828,
      "growth": -6,
      "perCapita": 1125.9,
      "popChangePct": -0.94
    },
    {
      "year": 1989,
      "gdp": 0.832,
      "growth": -4.9,
      "perCapita": 1146.2,
      "popChangePct": -1.22
    },
    {
      "year": 1990,
      "gdp": 0.685,
      "growth": -3,
      "perCapita": 951.0,
      "popChangePct": -0.83
    },
    {
      "year": 1991,
      "gdp": 0.744,
      "growth": 6,
      "perCapita": 1036.9,
      "popChangePct": -0.28
    },
    {
      "year": 1992,
      "gdp": 0.823,
      "growth": 7.8,
      "perCapita": 1145.8,
      "popChangePct": 0.0
    },
    {
      "year": 1993,
      "gdp": 1.003,
      "growth": 8.2,
      "perCapita": 1393.0,
      "popChangePct": 0.28
    },
    {
      "year": 1994,
      "gdp": 1.176,
      "growth": 8.5,
      "perCapita": 1626.9,
      "popChangePct": 0.42
    },
    {
      "year": 1995,
      "gdp": 1.332,
      "growth": 5.1,
      "perCapita": 1832.4,
      "popChangePct": 0.55
    },
    {
      "year": 1996,
      "gdp": 1.495,
      "growth": 8,
      "perCapita": 2048.5,
      "popChangePct": 0.41
    },
    {
      "year": 1997,
      "gdp": 1.587,
      "growth": 6.2,
      "perCapita": 2161.6,
      "popChangePct": 0.55
    },
    {
      "year": 1998,
      "gdp": 1.5,
      "growth": -1.7,
      "perCapita": 2035.9,
      "popChangePct": 0.41
    },
    {
      "year": 1999,
      "gdp": 1.488,
      "growth": 3,
      "perCapita": 2010.8,
      "popChangePct": 0.41
    },
    {
      "year": 2000,
      "gdp": 1.497,
      "growth": -1.3,
      "perCapita": 2017.2,
      "popChangePct": 0.27
    },
    {
      "year": 2001,
      "gdp": 1.504,
      "growth": 2.3,
      "perCapita": 2023.6,
      "popChangePct": 0.13
    },
    {
      "year": 2002,
      "gdp": 1.555,
      "growth": 1.1,
      "perCapita": 2093.0,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 1.592,
      "growth": -0.7,
      "perCapita": 2144.1,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 1.657,
      "growth": 1.6,
      "perCapita": 2233.0,
      "popChangePct": -0.13
    },
    {
      "year": 2005,
      "gdp": 1.712,
      "growth": -1.9,
      "perCapita": 2305.9,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 1.899,
      "growth": 5.1,
      "perCapita": 2551.8,
      "popChangePct": 0.27
    },
    {
      "year": 2007,
      "gdp": 2.225,
      "growth": 7,
      "perCapita": 2982.2,
      "popChangePct": 0.27
    },
    {
      "year": 2008,
      "gdp": 2.491,
      "growth": 2,
      "perCapita": 3329.6,
      "popChangePct": 0.27
    },
    {
      "year": 2009,
      "gdp": 2.596,
      "growth": 3.3,
      "perCapita": 3457.4,
      "popChangePct": 0.4
    },
    {
      "year": 2010,
      "gdp": 2.889,
      "growth": 4.4,
      "perCapita": 3837.3,
      "popChangePct": 0.27
    },
    {
      "year": 2011,
      "gdp": 3.328,
      "growth": 5.4,
      "perCapita": 4444.9,
      "popChangePct": -0.53
    },
    {
      "year": 2012,
      "gdp": 4.063,
      "growth": 5,
      "perCapita": 5440.4,
      "popChangePct": -0.27
    },
    {
      "year": 2013,
      "gdp": 4.168,
      "growth": 3.7,
      "perCapita": 5616.9,
      "popChangePct": -0.67
    },
    {
      "year": 2014,
      "gdp": 4.128,
      "growth": 1.7,
      "perCapita": 5603.6,
      "popChangePct": -0.67
    },
    {
      "year": 2015,
      "gdp": 4.28,
      "growth": 0.7,
      "perCapita": 5794.6,
      "popChangePct": 0.27
    },
    {
      "year": 2016,
      "gdp": 4.483,
      "growth": 3.8,
      "perCapita": 6006.0,
      "popChangePct": 0.95
    },
    {
      "year": 2017,
      "gdp": 4.748,
      "growth": 3.7,
      "perCapita": 6254.7,
      "popChangePct": 1.74
    },
    {
      "year": 2018,
      "gdp": 4.788,
      "growth": 4.4,
      "perCapita": 6053.0,
      "popChangePct": 4.22
    },
    {
      "year": 2019,
      "gdp": 5.174,
      "growth": 5.4,
      "perCapita": 6174.3,
      "popChangePct": 5.94
    },
    {
      "year": 2020,
      "gdp": 5.471,
      "growth": 43.5,
      "perCapita": 6363.2,
      "popChangePct": 2.63
    },
    {
      "year": 2021,
      "gdp": 8.041,
      "growth": 20.1,
      "perCapita": 9201.4,
      "popChangePct": 1.63
    },
    {
      "year": 2022,
      "gdp": 14.718,
      "growth": 63.3,
      "perCapita": 16425.0,
      "popChangePct": 2.52
    },
    {
      "year": 2023,
      "gdp": 16.919,
      "growth": 33.8,
      "perCapita": 18428.1,
      "popChangePct": 2.46
    },
    {
      "year": 2024,
      "gdp": 24.659,
      "growth": 43.8,
      "perCapita": 25792.4,
      "popChangePct": 4.14
    },
    {
      "year": 2025,
      "gdp": 27.097,
      "growth": 19.3,
      "perCapita": 26993.6,
      "popChangePct": 5.02
    },
    {
      "year": 2026,
      "gdp": 33.961,
      "growth": 16.2,
      "perCapita": 33167.2,
      "popChangePct": 1.99
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 39.151,
      "growth": 19.7,
      "perCapita": 37486.1,
      "popChangePct": 1.95
    },
    {
      "year": 2028,
      "gdp": 43.669,
      "growth": 22.1,
      "perCapita": 41194.7,
      "popChangePct": 1.53
    },
    {
      "year": 2029,
      "gdp": 48.473,
      "growth": 12.8,
      "perCapita": 45050.1,
      "popChangePct": 1.51
    },
    {
      "year": 2030,
      "gdp": 50.425,
      "growth": 11.5,
      "perCapita": 46400.6,
      "popChangePct": 1.02
    },
    {
      "year": 2031,
      "gdp": 53.154,
      "growth": 1.1,
      "perCapita": 48428.0,
      "popChangePct": 1.01
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.996,
      "perCapitaPPP": 2613.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.197,
      "perCapitaPPP": 2871.1,
      "perCapitaPPPChangePct": 9.85,
      "popChangePct": 0.13
    },
    {
      "year": 1982,
      "gdpPPP": 2.126,
      "perCapitaPPP": 2779.5,
      "perCapitaPPPChangePct": -3.19,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdpPPP": 1.955,
      "perCapitaPPP": 2563.8,
      "perCapitaPPPChangePct": -7.76,
      "popChangePct": -0.26
    },
    {
      "year": 1984,
      "gdpPPP": 2.069,
      "perCapitaPPP": 2726.1,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": -0.52
    },
    {
      "year": 1985,
      "gdpPPP": 2.142,
      "perCapitaPPP": 2840.1,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": -0.66
    },
    {
      "year": 1986,
      "gdpPPP": 2.18,
      "perCapitaPPP": 2913.1,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": -0.8
    },
    {
      "year": 1987,
      "gdpPPP": 2.231,
      "perCapitaPPP": 3008.7,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": -0.8
    },
    {
      "year": 1988,
      "gdpPPP": 2.172,
      "perCapitaPPP": 2955.0,
      "perCapitaPPPChangePct": -1.79,
      "popChangePct": -0.94
    },
    {
      "year": 1989,
      "gdpPPP": 2.145,
      "perCapitaPPP": 2955.2,
      "perCapitaPPPChangePct": 0.01,
      "popChangePct": -1.22
    },
    {
      "year": 1990,
      "gdpPPP": 2.159,
      "perCapitaPPP": 2998.3,
      "perCapitaPPPChangePct": 1.46,
      "popChangePct": -0.83
    },
    {
      "year": 1991,
      "gdpPPP": 2.366,
      "perCapitaPPP": 3295.6,
      "perCapitaPPPChangePct": 9.92,
      "popChangePct": -0.28
    },
    {
      "year": 1992,
      "gdpPPP": 2.608,
      "perCapitaPPP": 3631.2,
      "perCapitaPPPChangePct": 10.18,
      "popChangePct": 0.0
    },
    {
      "year": 1993,
      "gdpPPP": 2.889,
      "perCapitaPPP": 4012.1,
      "perCapitaPPPChangePct": 10.49,
      "popChangePct": 0.28
    },
    {
      "year": 1994,
      "gdpPPP": 3.201,
      "perCapitaPPP": 4426.9,
      "perCapitaPPPChangePct": 10.34,
      "popChangePct": 0.42
    },
    {
      "year": 1995,
      "gdpPPP": 3.433,
      "perCapitaPPP": 4722.1,
      "perCapitaPPPChangePct": 6.67,
      "popChangePct": 0.55
    },
    {
      "year": 1996,
      "gdpPPP": 3.774,
      "perCapitaPPP": 5169.7,
      "perCapitaPPPChangePct": 9.48,
      "popChangePct": 0.41
    },
    {
      "year": 1997,
      "gdpPPP": 4.076,
      "perCapitaPPP": 5553.7,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 0.55
    },
    {
      "year": 1998,
      "gdpPPP": 4.052,
      "perCapitaPPP": 5497.8,
      "perCapitaPPPChangePct": -1.01,
      "popChangePct": 0.41
    },
    {
      "year": 1999,
      "gdpPPP": 4.232,
      "perCapitaPPP": 5718.8,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 0.41
    },
    {
      "year": 2000,
      "gdpPPP": 4.27,
      "perCapitaPPP": 5754.1,
      "perCapitaPPPChangePct": 0.62,
      "popChangePct": 0.27
    },
    {
      "year": 2001,
      "gdpPPP": 4.464,
      "perCapitaPPP": 6007.2,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 0.13
    },
    {
      "year": 2002,
      "gdpPPP": 4.586,
      "perCapitaPPP": 6171.1,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 4.646,
      "perCapitaPPP": 6256.7,
      "perCapitaPPPChangePct": 1.39,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 4.846,
      "perCapitaPPP": 6528.9,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": -0.13
    },
    {
      "year": 2005,
      "gdpPPP": 4.9,
      "perCapitaPPP": 6599.9,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 5.311,
      "perCapitaPPP": 7137.8,
      "perCapitaPPPChangePct": 8.15,
      "popChangePct": 0.27
    },
    {
      "year": 2007,
      "gdpPPP": 5.837,
      "perCapitaPPP": 7824.8,
      "perCapitaPPPChangePct": 9.63,
      "popChangePct": 0.27
    },
    {
      "year": 2008,
      "gdpPPP": 6.067,
      "perCapitaPPP": 8111.4,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 0.27
    },
    {
      "year": 2009,
      "gdpPPP": 6.307,
      "perCapitaPPP": 8398.6,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 0.4
    },
    {
      "year": 2010,
      "gdpPPP": 6.663,
      "perCapitaPPP": 8848.7,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.27
    },
    {
      "year": 2011,
      "gdpPPP": 7.17,
      "perCapitaPPP": 9575.3,
      "perCapitaPPPChangePct": 8.21,
      "popChangePct": -0.53
    },
    {
      "year": 2012,
      "gdpPPP": 7.672,
      "perCapitaPPP": 10272.5,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": -0.27
    },
    {
      "year": 2013,
      "gdpPPP": 8.087,
      "perCapitaPPP": 10899.4,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": -0.67
    },
    {
      "year": 2014,
      "gdpPPP": 8.367,
      "perCapitaPPP": 11358.9,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": -0.67
    },
    {
      "year": 2015,
      "gdpPPP": 8.503,
      "perCapitaPPP": 11512.1,
      "perCapitaPPPChangePct": 1.35,
      "popChangePct": 0.27
    },
    {
      "year": 2016,
      "gdpPPP": 8.91,
      "perCapitaPPP": 11938.2,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 0.95
    },
    {
      "year": 2017,
      "gdpPPP": 9.409,
      "perCapitaPPP": 12393.9,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 1.74
    },
    {
      "year": 2018,
      "gdpPPP": 9.849,
      "perCapitaPPP": 12452.1,
      "perCapitaPPPChangePct": 0.47,
      "popChangePct": 4.22
    },
    {
      "year": 2019,
      "gdpPPP": 10.694,
      "perCapitaPPP": 12762.4,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 5.94
    },
    {
      "year": 2020,
      "gdpPPP": 13.581,
      "perCapitaPPP": 15795.3,
      "perCapitaPPPChangePct": 23.77,
      "popChangePct": 2.63
    },
    {
      "year": 2021,
      "gdpPPP": 18.647,
      "perCapitaPPP": 21336.8,
      "perCapitaPPPChangePct": 35.08,
      "popChangePct": 1.63
    },
    {
      "year": 2022,
      "gdpPPP": 32.623,
      "perCapitaPPP": 36405.5,
      "perCapitaPPPChangePct": 70.62,
      "popChangePct": 2.52
    },
    {
      "year": 2023,
      "gdpPPP": 45.254,
      "perCapitaPPP": 49291.6,
      "perCapitaPPPChangePct": 35.4,
      "popChangePct": 2.46
    },
    {
      "year": 2024,
      "gdpPPP": 66.679,
      "perCapitaPPP": 69745.1,
      "perCapitaPPPChangePct": 41.49,
      "popChangePct": 4.14
    },
    {
      "year": 2025,
      "gdpPPP": 81.811,
      "perCapitaPPP": 81497.6,
      "perCapitaPPPChangePct": 16.85,
      "popChangePct": 5.02
    },
    {
      "year": 2026,
      "gdpPPP": 97.761,
      "perCapitaPPP": 95476.7,
      "perCapitaPPPChangePct": 17.15,
      "popChangePct": 1.99
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 119.554,
      "perCapitaPPP": 114470.9,
      "perCapitaPPPChangePct": 19.89,
      "popChangePct": 1.95
    },
    {
      "year": 2028,
      "gdpPPP": 148.355,
      "perCapitaPPP": 139949.0,
      "perCapitaPPPChangePct": 22.26,
      "popChangePct": 1.53
    },
    {
      "year": 2029,
      "gdpPPP": 170.317,
      "perCapitaPPP": 158292.2,
      "perCapitaPPPChangePct": 13.11,
      "popChangePct": 1.51
    },
    {
      "year": 2030,
      "gdpPPP": 193.43,
      "perCapitaPPP": 177993.1,
      "perCapitaPPPChangePct": 12.45,
      "popChangePct": 1.02
    },
    {
      "year": 2031,
      "gdpPPP": 199.004,
      "perCapitaPPP": 181309.5,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 1.01
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GuyanaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
