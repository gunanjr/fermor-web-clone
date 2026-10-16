import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Jordan",
  "slug": "jordan",
  "iso3": "JOR",
  "region": "Asia",
  "rank2026": 94,
  "flagEmoji": "🇯🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Cameroon",
      "slug": "cameroon",
      "rank": 93
    },
    {
      "name": "Tunisia",
      "slug": "tunisia",
      "rank": 95
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.344,
      "growth": 11.1,
      "perCapita": 1959.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.878,
      "growth": 15,
      "perCapita": 2114.7,
      "popChangePct": 4.06
    },
    {
      "year": 1982,
      "gdp": 5.206,
      "growth": 5.8,
      "perCapita": 2163.6,
      "popChangePct": 4.29
    },
    {
      "year": 1983,
      "gdp": 5.471,
      "growth": 1.4,
      "perCapita": 2175.5,
      "popChangePct": 4.53
    },
    {
      "year": 1984,
      "gdp": 5.527,
      "growth": 5.5,
      "perCapita": 2101.4,
      "popChangePct": 4.57
    },
    {
      "year": 1985,
      "gdp": 5.559,
      "growth": -1.1,
      "perCapita": 2020.4,
      "popChangePct": 4.6
    },
    {
      "year": 1986,
      "gdp": 7.119,
      "growth": 5.9,
      "perCapita": 2471.9,
      "popChangePct": 4.69
    },
    {
      "year": 1987,
      "gdp": 7.504,
      "growth": 2.7,
      "perCapita": 2489.2,
      "popChangePct": 4.69
    },
    {
      "year": 1988,
      "gdp": 7.03,
      "growth": 2.9,
      "perCapita": 2226.6,
      "popChangePct": 4.71
    },
    {
      "year": 1989,
      "gdp": 4.727,
      "growth": -10.7,
      "perCapita": 1427.6,
      "popChangePct": 4.88
    },
    {
      "year": 1990,
      "gdp": 4.625,
      "growth": -1.6,
      "perCapita": 1328.7,
      "popChangePct": 5.13
    },
    {
      "year": 1991,
      "gdp": 4.83,
      "growth": -5.7,
      "perCapita": 1317.3,
      "popChangePct": 5.31
    },
    {
      "year": 1992,
      "gdp": 5.968,
      "growth": 16.9,
      "perCapita": 1543.4,
      "popChangePct": 5.48
    },
    {
      "year": 1993,
      "gdp": 6.202,
      "growth": 4.4,
      "perCapita": 1521.6,
      "popChangePct": 5.4
    },
    {
      "year": 1994,
      "gdp": 6.982,
      "growth": 5,
      "perCapita": 1632.0,
      "popChangePct": 4.96
    },
    {
      "year": 1995,
      "gdp": 7.466,
      "growth": 6,
      "perCapita": 1674.7,
      "popChangePct": 4.21
    },
    {
      "year": 1996,
      "gdp": 7.792,
      "growth": 1.9,
      "perCapita": 1690.7,
      "popChangePct": 3.39
    },
    {
      "year": 1997,
      "gdp": 8.162,
      "growth": 3.7,
      "perCapita": 1724.2,
      "popChangePct": 2.71
    },
    {
      "year": 1998,
      "gdp": 9.017,
      "growth": 3.2,
      "perCapita": 1861.3,
      "popChangePct": 2.32
    },
    {
      "year": 1999,
      "gdp": 9.294,
      "growth": 3.2,
      "perCapita": 1877.3,
      "popChangePct": 2.21
    },
    {
      "year": 2000,
      "gdp": 9.637,
      "growth": 4.2,
      "perCapita": 1906.0,
      "popChangePct": 2.12
    },
    {
      "year": 2001,
      "gdp": 10.238,
      "growth": 5,
      "perCapita": 1982.8,
      "popChangePct": 2.12
    },
    {
      "year": 2002,
      "gdp": 11.015,
      "growth": 6.6,
      "perCapita": 2087.9,
      "popChangePct": 2.19
    },
    {
      "year": 2003,
      "gdp": 11.681,
      "growth": 4,
      "perCapita": 2164.8,
      "popChangePct": 2.27
    },
    {
      "year": 2004,
      "gdp": 13.002,
      "growth": 8.3,
      "perCapita": 2350.1,
      "popChangePct": 2.52
    },
    {
      "year": 2005,
      "gdp": 14.507,
      "growth": 8.8,
      "perCapita": 2554.8,
      "popChangePct": 2.66
    },
    {
      "year": 2006,
      "gdp": 17.447,
      "growth": 8.5,
      "perCapita": 2871.7,
      "popChangePct": 6.99
    },
    {
      "year": 2007,
      "gdp": 19.835,
      "growth": 8.4,
      "perCapita": 3064.0,
      "popChangePct": 6.53
    },
    {
      "year": 2008,
      "gdp": 25.64,
      "growth": 8.3,
      "perCapita": 3865.5,
      "popChangePct": 2.47
    },
    {
      "year": 2009,
      "gdp": 27.462,
      "growth": 5.1,
      "perCapita": 4050.2,
      "popChangePct": 2.22
    },
    {
      "year": 2010,
      "gdp": 30.203,
      "growth": 2.6,
      "perCapita": 4357.5,
      "popChangePct": 2.23
    },
    {
      "year": 2011,
      "gdp": 32.64,
      "growth": 2.9,
      "perCapita": 4590.8,
      "popChangePct": 2.58
    },
    {
      "year": 2012,
      "gdp": 34.903,
      "growth": 2.4,
      "perCapita": 4839.7,
      "popChangePct": 1.43
    },
    {
      "year": 2013,
      "gdp": 37.927,
      "growth": 2.7,
      "perCapita": 4928.9,
      "popChangePct": 6.7
    },
    {
      "year": 2014,
      "gdp": 40.592,
      "growth": 3.3,
      "perCapita": 4688.4,
      "popChangePct": 12.51
    },
    {
      "year": 2015,
      "gdp": 42.454,
      "growth": 2.5,
      "perCapita": 4471.5,
      "popChangePct": 9.66
    },
    {
      "year": 2016,
      "gdp": 43.75,
      "growth": 2.1,
      "perCapita": 4390.5,
      "popChangePct": 4.96
    },
    {
      "year": 2017,
      "gdp": 45.6,
      "growth": 2.5,
      "perCapita": 4463.9,
      "popChangePct": 2.51
    },
    {
      "year": 2018,
      "gdp": 47.503,
      "growth": 1.9,
      "perCapita": 4541.4,
      "popChangePct": 2.4
    },
    {
      "year": 2019,
      "gdp": 48.709,
      "growth": 1.9,
      "perCapita": 4552.8,
      "popChangePct": 2.28
    },
    {
      "year": 2020,
      "gdp": 48,
      "growth": -1.2,
      "perCapita": 4417.7,
      "popChangePct": 1.55
    },
    {
      "year": 2021,
      "gdp": 50.775,
      "growth": 3.8,
      "perCapita": 4588.2,
      "popChangePct": 1.85
    },
    {
      "year": 2022,
      "gdp": 53.593,
      "growth": 2.7,
      "perCapita": 4761.1,
      "popChangePct": 1.72
    },
    {
      "year": 2023,
      "gdp": 56.203,
      "growth": 3.1,
      "perCapita": 4913.2,
      "popChangePct": 1.63
    },
    {
      "year": 2024,
      "gdp": 58.701,
      "growth": 2.6,
      "perCapita": 5081.1,
      "popChangePct": 1.0
    },
    {
      "year": 2025,
      "gdp": 61.692,
      "growth": 2.7,
      "perCapita": 5354.9,
      "popChangePct": -0.28
    },
    {
      "year": 2026,
      "gdp": 64.909,
      "growth": 2.7,
      "perCapita": 5600.7,
      "popChangePct": 0.6
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 68.46,
      "growth": 3.1,
      "perCapita": 5792.2,
      "popChangePct": 1.98
    },
    {
      "year": 2028,
      "gdp": 72.136,
      "growth": 3,
      "perCapita": 5994.1,
      "popChangePct": 1.82
    },
    {
      "year": 2029,
      "gdp": 76.009,
      "growth": 3,
      "perCapita": 6207.0,
      "popChangePct": 1.76
    },
    {
      "year": 2030,
      "gdp": 80.09,
      "growth": 3,
      "perCapita": 6433.6,
      "popChangePct": 1.66
    },
    {
      "year": 2031,
      "gdp": 84.39,
      "growth": 3,
      "perCapita": 6669.8,
      "popChangePct": 1.64
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 9.497,
      "perCapitaPPP": 4283.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 11.952,
      "perCapitaPPP": 5181.4,
      "perCapitaPPPChangePct": 20.95,
      "popChangePct": 4.06
    },
    {
      "year": 1982,
      "gdpPPP": 13.432,
      "perCapitaPPP": 5581.9,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 4.29
    },
    {
      "year": 1983,
      "gdpPPP": 14.149,
      "perCapitaPPP": 5626.2,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": 4.53
    },
    {
      "year": 1984,
      "gdpPPP": 15.462,
      "perCapitaPPP": 5879.4,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": 4.57
    },
    {
      "year": 1985,
      "gdpPPP": 15.778,
      "perCapitaPPP": 5734.3,
      "perCapitaPPPChangePct": -2.47,
      "popChangePct": 4.6
    },
    {
      "year": 1986,
      "gdpPPP": 17.051,
      "perCapitaPPP": 5920.8,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 4.69
    },
    {
      "year": 1987,
      "gdpPPP": 17.947,
      "perCapitaPPP": 5953.0,
      "perCapitaPPPChangePct": 0.55,
      "popChangePct": 4.69
    },
    {
      "year": 1988,
      "gdpPPP": 19.117,
      "perCapitaPPP": 6055.0,
      "perCapitaPPPChangePct": 1.71,
      "popChangePct": 4.71
    },
    {
      "year": 1989,
      "gdpPPP": 17.748,
      "perCapitaPPP": 5360.5,
      "perCapitaPPPChangePct": -11.47,
      "popChangePct": 4.88
    },
    {
      "year": 1990,
      "gdpPPP": 18.117,
      "perCapitaPPP": 5205.2,
      "perCapitaPPPChangePct": -2.9,
      "popChangePct": 5.13
    },
    {
      "year": 1991,
      "gdpPPP": 17.672,
      "perCapitaPPP": 4819.9,
      "perCapitaPPPChangePct": -7.4,
      "popChangePct": 5.31
    },
    {
      "year": 1992,
      "gdpPPP": 21.121,
      "perCapitaPPP": 5462.0,
      "perCapitaPPPChangePct": 13.32,
      "popChangePct": 5.48
    },
    {
      "year": 1993,
      "gdpPPP": 22.564,
      "perCapitaPPP": 5536.2,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 5.4
    },
    {
      "year": 1994,
      "gdpPPP": 24.199,
      "perCapitaPPP": 5656.4,
      "perCapitaPPPChangePct": 2.17,
      "popChangePct": 4.96
    },
    {
      "year": 1995,
      "gdpPPP": 26.177,
      "perCapitaPPP": 5871.6,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 4.21
    },
    {
      "year": 1996,
      "gdpPPP": 27.166,
      "perCapitaPPP": 5894.5,
      "perCapitaPPPChangePct": 0.39,
      "popChangePct": 3.39
    },
    {
      "year": 1997,
      "gdpPPP": 28.668,
      "perCapitaPPP": 6056.2,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 2.71
    },
    {
      "year": 1998,
      "gdpPPP": 29.92,
      "perCapitaPPP": 6176.1,
      "perCapitaPPPChangePct": 1.98,
      "popChangePct": 2.32
    },
    {
      "year": 1999,
      "gdpPPP": 31.325,
      "perCapitaPPP": 6327.3,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 2.21
    },
    {
      "year": 2000,
      "gdpPPP": 33.38,
      "perCapitaPPP": 6601.9,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 2.12
    },
    {
      "year": 2001,
      "gdpPPP": 35.834,
      "perCapitaPPP": 6940.1,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": 2.12
    },
    {
      "year": 2002,
      "gdpPPP": 38.787,
      "perCapitaPPP": 7352.3,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": 2.19
    },
    {
      "year": 2003,
      "gdpPPP": 41.127,
      "perCapitaPPP": 7621.6,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 2.27
    },
    {
      "year": 2004,
      "gdpPPP": 45.72,
      "perCapitaPPP": 8264.0,
      "perCapitaPPPChangePct": 8.43,
      "popChangePct": 2.52
    },
    {
      "year": 2005,
      "gdpPPP": 51.314,
      "perCapitaPPP": 9036.5,
      "perCapitaPPPChangePct": 9.35,
      "popChangePct": 2.66
    },
    {
      "year": 2006,
      "gdpPPP": 57.401,
      "perCapitaPPP": 9447.8,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 6.99
    },
    {
      "year": 2007,
      "gdpPPP": 63.892,
      "perCapitaPPP": 9869.8,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": 6.53
    },
    {
      "year": 2008,
      "gdpPPP": 70.531,
      "perCapitaPPP": 10633.5,
      "perCapitaPPPChangePct": 7.74,
      "popChangePct": 2.47
    },
    {
      "year": 2009,
      "gdpPPP": 74.597,
      "perCapitaPPP": 11001.7,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 2.22
    },
    {
      "year": 2010,
      "gdpPPP": 77.495,
      "perCapitaPPP": 11180.5,
      "perCapitaPPPChangePct": 1.63,
      "popChangePct": 2.23
    },
    {
      "year": 2011,
      "gdpPPP": 81.394,
      "perCapitaPPP": 11447.8,
      "perCapitaPPPChangePct": 2.39,
      "popChangePct": 2.58
    },
    {
      "year": 2012,
      "gdpPPP": 84.903,
      "perCapitaPPP": 11772.6,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 1.43
    },
    {
      "year": 2013,
      "gdpPPP": 88.699,
      "perCapitaPPP": 11527.1,
      "perCapitaPPPChangePct": -2.09,
      "popChangePct": 6.7
    },
    {
      "year": 2014,
      "gdpPPP": 93.243,
      "perCapitaPPP": 10769.5,
      "perCapitaPPPChangePct": -6.57,
      "popChangePct": 12.51
    },
    {
      "year": 2015,
      "gdpPPP": 96.482,
      "perCapitaPPP": 10162.2,
      "perCapitaPPPChangePct": -5.64,
      "popChangePct": 9.66
    },
    {
      "year": 2016,
      "gdpPPP": 99.456,
      "perCapitaPPP": 9980.8,
      "perCapitaPPPChangePct": -1.78,
      "popChangePct": 4.96
    },
    {
      "year": 2017,
      "gdpPPP": 103.775,
      "perCapitaPPP": 10158.7,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 2.51
    },
    {
      "year": 2018,
      "gdpPPP": 103.471,
      "perCapitaPPP": 9892.2,
      "perCapitaPPPChangePct": -2.62,
      "popChangePct": 2.4
    },
    {
      "year": 2019,
      "gdpPPP": 109.981,
      "perCapitaPPP": 10279.9,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 2.28
    },
    {
      "year": 2020,
      "gdpPPP": 114.158,
      "perCapitaPPP": 10506.7,
      "perCapitaPPPChangePct": 2.21,
      "popChangePct": 1.55
    },
    {
      "year": 2021,
      "gdpPPP": 111.289,
      "perCapitaPPP": 10056.6,
      "perCapitaPPPChangePct": -4.28,
      "popChangePct": 1.85
    },
    {
      "year": 2022,
      "gdpPPP": 122.479,
      "perCapitaPPP": 10881.0,
      "perCapitaPPPChangePct": 8.2,
      "popChangePct": 1.72
    },
    {
      "year": 2023,
      "gdpPPP": 130.985,
      "perCapitaPPP": 11450.5,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 1.63
    },
    {
      "year": 2024,
      "gdpPPP": 137.668,
      "perCapitaPPP": 11916.3,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 1.0
    },
    {
      "year": 2025,
      "gdpPPP": 145.372,
      "perCapitaPPP": 12618.3,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": -0.28
    },
    {
      "year": 2026,
      "gdpPPP": 153.646,
      "perCapitaPPP": 13257.3,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 0.6
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 161.887,
      "perCapitaPPP": 13696.6,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 1.98
    },
    {
      "year": 2028,
      "gdpPPP": 169.481,
      "perCapitaPPP": 14082.9,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 1.82
    },
    {
      "year": 2029,
      "gdpPPP": 177.669,
      "perCapitaPPP": 14508.6,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 1.76
    },
    {
      "year": 2030,
      "gdpPPP": 186.362,
      "perCapitaPPP": 14970.3,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 1.66
    },
    {
      "year": 2031,
      "gdpPPP": 195.418,
      "perCapitaPPP": 15444.9,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 1.64
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function JordanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
