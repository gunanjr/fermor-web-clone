import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bulgaria",
  "slug": "bulgaria",
  "iso3": "BGR",
  "region": "Europe",
  "rank2026": 65,
  "flagEmoji": "🇧🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Angola",
      "slug": "angola",
      "rank": 64
    },
    {
      "name": "Kenya",
      "slug": "kenya",
      "rank": 66
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 37.751,
      "growth": 5.7,
      "perCapita": 4286.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 40.718,
      "growth": 5.3,
      "perCapita": 4609.4,
      "popChangePct": 0.3
    },
    {
      "year": 1982,
      "gdp": 42.467,
      "growth": 4.2,
      "perCapita": 4793.7,
      "popChangePct": 0.28
    },
    {
      "year": 1983,
      "gdp": 43.641,
      "growth": 3,
      "perCapita": 4913.8,
      "popChangePct": 0.25
    },
    {
      "year": 1984,
      "gdp": 46.358,
      "growth": 4.6,
      "perCapita": 5210.5,
      "popChangePct": 0.18
    },
    {
      "year": 1985,
      "gdp": 39.692,
      "growth": 1.8,
      "perCapita": 4458.1,
      "popChangePct": 0.07
    },
    {
      "year": 1986,
      "gdp": 35.13,
      "growth": 5.3,
      "perCapita": 3946.9,
      "popChangePct": -0.02
    },
    {
      "year": 1987,
      "gdp": 40.721,
      "growth": 4.7,
      "perCapita": 4581.2,
      "popChangePct": -0.13
    },
    {
      "year": 1988,
      "gdp": 66.546,
      "growth": 2.4,
      "perCapita": 7506.6,
      "popChangePct": -0.27
    },
    {
      "year": 1989,
      "gdp": 67.774,
      "growth": -0.5,
      "perCapita": 7678.8,
      "popChangePct": -0.44
    },
    {
      "year": 1990,
      "gdp": 29.882,
      "growth": -9.1,
      "perCapita": 3407.1,
      "popChangePct": -0.62
    },
    {
      "year": 1991,
      "gdp": 2.928,
      "growth": -10.8,
      "perCapita": 336.6,
      "popChangePct": -0.84
    },
    {
      "year": 1992,
      "gdp": 11.882,
      "growth": -8.4,
      "perCapita": 1380.6,
      "popChangePct": -1.03
    },
    {
      "year": 1993,
      "gdp": 6.449,
      "growth": -11.6,
      "perCapita": 758.1,
      "popChangePct": -1.16
    },
    {
      "year": 1994,
      "gdp": 11.338,
      "growth": -3.7,
      "perCapita": 1348.7,
      "popChangePct": -1.18
    },
    {
      "year": 1995,
      "gdp": 18.992,
      "growth": -1.6,
      "perCapita": 2284.8,
      "popChangePct": -1.13
    },
    {
      "year": 1996,
      "gdp": 12.295,
      "growth": 5.2,
      "perCapita": 1494.8,
      "popChangePct": -1.05
    },
    {
      "year": 1997,
      "gdp": 11.317,
      "growth": -14.1,
      "perCapita": 1386.5,
      "popChangePct": -0.77
    },
    {
      "year": 1998,
      "gdp": 15.031,
      "growth": 3.8,
      "perCapita": 1854.5,
      "popChangePct": -0.7
    },
    {
      "year": 1999,
      "gdp": 13.66,
      "growth": -8.4,
      "perCapita": 1693.3,
      "popChangePct": -0.47
    },
    {
      "year": 2000,
      "gdp": 13.287,
      "growth": 4.6,
      "perCapita": 1630.5,
      "popChangePct": 1.03
    },
    {
      "year": 2001,
      "gdp": 14.19,
      "growth": 3.8,
      "perCapita": 1798.2,
      "popChangePct": -3.18
    },
    {
      "year": 2002,
      "gdp": 16.459,
      "growth": 5.9,
      "perCapita": 2097.9,
      "popChangePct": -0.57
    },
    {
      "year": 2003,
      "gdp": 21.184,
      "growth": 5.2,
      "perCapita": 2715.5,
      "popChangePct": -0.57
    },
    {
      "year": 2004,
      "gdp": 26.192,
      "growth": 6.5,
      "perCapita": 3374.8,
      "popChangePct": -0.51
    },
    {
      "year": 2005,
      "gdp": 29.924,
      "growth": 7.1,
      "perCapita": 3876.8,
      "popChangePct": -0.54
    },
    {
      "year": 2006,
      "gdp": 34.417,
      "growth": 6.8,
      "perCapita": 4481.8,
      "popChangePct": -0.52
    },
    {
      "year": 2007,
      "gdp": 44.497,
      "growth": 6.7,
      "perCapita": 5824.0,
      "popChangePct": -0.51
    },
    {
      "year": 2008,
      "gdp": 54.774,
      "growth": 6.1,
      "perCapita": 7200.9,
      "popChangePct": -0.43
    },
    {
      "year": 2009,
      "gdp": 52.132,
      "growth": -3.3,
      "perCapita": 6892.4,
      "popChangePct": -0.57
    },
    {
      "year": 2010,
      "gdp": 50.802,
      "growth": 1.6,
      "perCapita": 6769.3,
      "popChangePct": -0.78
    },
    {
      "year": 2011,
      "gdp": 57.727,
      "growth": 2.1,
      "perCapita": 7878.4,
      "popChangePct": -2.37
    },
    {
      "year": 2012,
      "gdp": 54.323,
      "growth": 0.7,
      "perCapita": 7457.2,
      "popChangePct": -0.57
    },
    {
      "year": 2013,
      "gdp": 55.855,
      "growth": -0.5,
      "perCapita": 7708.8,
      "popChangePct": -0.54
    },
    {
      "year": 2014,
      "gdp": 57.172,
      "growth": 0.9,
      "perCapita": 7938.2,
      "popChangePct": -0.61
    },
    {
      "year": 2015,
      "gdp": 50.818,
      "growth": 3.4,
      "perCapita": 7103.6,
      "popChangePct": -0.67
    },
    {
      "year": 2016,
      "gdp": 53.948,
      "growth": 3,
      "perCapita": 7596.3,
      "popChangePct": -0.73
    },
    {
      "year": 2017,
      "gdp": 59.288,
      "growth": 2.7,
      "perCapita": 8409.7,
      "popChangePct": -0.73
    },
    {
      "year": 2018,
      "gdp": 66.163,
      "growth": 2.3,
      "perCapita": 9451.8,
      "popChangePct": -0.71
    },
    {
      "year": 2019,
      "gdp": 68.513,
      "growth": 3.8,
      "perCapita": 9855.9,
      "popChangePct": -0.7
    },
    {
      "year": 2020,
      "gdp": 70.595,
      "growth": -3.1,
      "perCapita": 10206.6,
      "popChangePct": -0.49
    },
    {
      "year": 2021,
      "gdp": 84.437,
      "growth": 7.8,
      "perCapita": 12346.6,
      "popChangePct": -1.13
    },
    {
      "year": 2022,
      "gdp": 90.716,
      "growth": 4.1,
      "perCapita": 14069.5,
      "popChangePct": -5.72
    },
    {
      "year": 2023,
      "gdp": 102.237,
      "growth": 1.7,
      "perCapita": 15861.7,
      "popChangePct": -0.05
    },
    {
      "year": 2024,
      "gdp": 113.364,
      "growth": 3.4,
      "perCapita": 17610.3,
      "popChangePct": -0.12
    },
    {
      "year": 2025,
      "gdp": 131.024,
      "growth": 3.1,
      "perCapita": 20920.7,
      "popChangePct": -2.7
    },
    {
      "year": 2026,
      "gdp": 148.121,
      "growth": 2.8,
      "perCapita": 23848.5,
      "popChangePct": -0.83
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 158.387,
      "growth": 2.5,
      "perCapita": 25714.8,
      "popChangePct": -0.84
    },
    {
      "year": 2028,
      "gdp": 170.208,
      "growth": 2.8,
      "perCapita": 27865.3,
      "popChangePct": -0.83
    },
    {
      "year": 2029,
      "gdp": 179.53,
      "growth": 2.6,
      "perCapita": 29637.3,
      "popChangePct": -0.82
    },
    {
      "year": 2030,
      "gdp": 190.064,
      "growth": 2.6,
      "perCapita": 31639.0,
      "popChangePct": -0.84
    },
    {
      "year": 2031,
      "gdp": 200.586,
      "growth": 2.6,
      "perCapita": 33624.9,
      "popChangePct": -0.7
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 44.707,
      "perCapitaPPP": 5075.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 51.53,
      "perCapitaPPP": 5833.4,
      "perCapitaPPPChangePct": 14.92,
      "popChangePct": 0.3
    },
    {
      "year": 1982,
      "gdpPPP": 57.012,
      "perCapitaPPP": 6435.5,
      "perCapitaPPPChangePct": 10.32,
      "popChangePct": 0.28
    },
    {
      "year": 1983,
      "gdpPPP": 61.022,
      "perCapitaPPP": 6870.8,
      "perCapitaPPPChangePct": 6.77,
      "popChangePct": 0.25
    },
    {
      "year": 1984,
      "gdpPPP": 66.133,
      "perCapitaPPP": 7433.2,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 0.18
    },
    {
      "year": 1985,
      "gdpPPP": 69.452,
      "perCapitaPPP": 7800.7,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 0.07
    },
    {
      "year": 1986,
      "gdpPPP": 74.606,
      "perCapitaPPP": 8382.1,
      "perCapitaPPPChangePct": 7.45,
      "popChangePct": -0.02
    },
    {
      "year": 1987,
      "gdpPPP": 80.048,
      "perCapitaPPP": 9005.6,
      "perCapitaPPPChangePct": 7.44,
      "popChangePct": -0.13
    },
    {
      "year": 1988,
      "gdpPPP": 84.86,
      "perCapitaPPP": 9572.5,
      "perCapitaPPPChangePct": 6.29,
      "popChangePct": -0.27
    },
    {
      "year": 1989,
      "gdpPPP": 87.746,
      "perCapitaPPP": 9941.7,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": -0.44
    },
    {
      "year": 1990,
      "gdpPPP": 82.747,
      "perCapitaPPP": 9434.6,
      "perCapitaPPPChangePct": -5.1,
      "popChangePct": -0.62
    },
    {
      "year": 1991,
      "gdpPPP": 76.345,
      "perCapitaPPP": 8778.7,
      "perCapitaPPPChangePct": -6.95,
      "popChangePct": -0.84
    },
    {
      "year": 1992,
      "gdpPPP": 71.505,
      "perCapitaPPP": 8308.1,
      "perCapitaPPPChangePct": -5.36,
      "popChangePct": -1.03
    },
    {
      "year": 1993,
      "gdpPPP": 64.69,
      "perCapitaPPP": 7604.2,
      "perCapitaPPPChangePct": -8.47,
      "popChangePct": -1.16
    },
    {
      "year": 1994,
      "gdpPPP": 63.65,
      "perCapitaPPP": 7571.3,
      "perCapitaPPPChangePct": -0.43,
      "popChangePct": -1.18
    },
    {
      "year": 1995,
      "gdpPPP": 63.944,
      "perCapitaPPP": 7692.9,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": -1.13
    },
    {
      "year": 1996,
      "gdpPPP": 68.504,
      "perCapitaPPP": 8328.3,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": -1.05
    },
    {
      "year": 1997,
      "gdpPPP": 59.849,
      "perCapitaPPP": 7332.3,
      "perCapitaPPPChangePct": -11.96,
      "popChangePct": -0.77
    },
    {
      "year": 1998,
      "gdpPPP": 62.815,
      "perCapitaPPP": 7749.8,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": -0.7
    },
    {
      "year": 1999,
      "gdpPPP": 58.355,
      "perCapitaPPP": 7233.8,
      "perCapitaPPPChangePct": -6.66,
      "popChangePct": -0.47
    },
    {
      "year": 2000,
      "gdpPPP": 62.415,
      "perCapitaPPP": 7658.7,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 1.03
    },
    {
      "year": 2001,
      "gdpPPP": 66.26,
      "perCapitaPPP": 8396.8,
      "perCapitaPPPChangePct": 9.64,
      "popChangePct": -3.18
    },
    {
      "year": 2002,
      "gdpPPP": 71.241,
      "perCapitaPPP": 9080.2,
      "perCapitaPPPChangePct": 8.14,
      "popChangePct": -0.57
    },
    {
      "year": 2003,
      "gdpPPP": 76.452,
      "perCapitaPPP": 9800.0,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": -0.57
    },
    {
      "year": 2004,
      "gdpPPP": 83.619,
      "perCapitaPPP": 10774.2,
      "perCapitaPPPChangePct": 9.94,
      "popChangePct": -0.51
    },
    {
      "year": 2005,
      "gdpPPP": 92.327,
      "perCapitaPPP": 11961.4,
      "perCapitaPPPChangePct": 11.02,
      "popChangePct": -0.54
    },
    {
      "year": 2006,
      "gdpPPP": 101.648,
      "perCapitaPPP": 13236.7,
      "perCapitaPPPChangePct": 10.66,
      "popChangePct": -0.52
    },
    {
      "year": 2007,
      "gdpPPP": 111.35,
      "perCapitaPPP": 14574.1,
      "perCapitaPPPChangePct": 10.1,
      "popChangePct": -0.51
    },
    {
      "year": 2008,
      "gdpPPP": 120.451,
      "perCapitaPPP": 15835.2,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": -0.43
    },
    {
      "year": 2009,
      "gdpPPP": 117.138,
      "perCapitaPPP": 15486.8,
      "perCapitaPPPChangePct": -2.2,
      "popChangePct": -0.57
    },
    {
      "year": 2010,
      "gdpPPP": 120.405,
      "perCapitaPPP": 16043.6,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": -0.78
    },
    {
      "year": 2011,
      "gdpPPP": 125.458,
      "perCapitaPPP": 17122.2,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": -2.37
    },
    {
      "year": 2012,
      "gdpPPP": 128.751,
      "perCapitaPPP": 17674.5,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": -0.57
    },
    {
      "year": 2013,
      "gdpPPP": 130.232,
      "perCapitaPPP": 17973.7,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": -0.54
    },
    {
      "year": 2014,
      "gdpPPP": 133.758,
      "perCapitaPPP": 18571.8,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": -0.61
    },
    {
      "year": 2015,
      "gdpPPP": 139.586,
      "perCapitaPPP": 19512.2,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": -0.67
    },
    {
      "year": 2016,
      "gdpPPP": 145.177,
      "perCapitaPPP": 20442.2,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": -0.73
    },
    {
      "year": 2017,
      "gdpPPP": 151.835,
      "perCapitaPPP": 21536.8,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": -0.73
    },
    {
      "year": 2018,
      "gdpPPP": 161.044,
      "perCapitaPPP": 23006.2,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": -0.71
    },
    {
      "year": 2019,
      "gdpPPP": 177.101,
      "perCapitaPPP": 25476.7,
      "perCapitaPPPChangePct": 10.74,
      "popChangePct": -0.7
    },
    {
      "year": 2020,
      "gdpPPP": 179.174,
      "perCapitaPPP": 25905.2,
      "perCapitaPPPChangePct": 1.68,
      "popChangePct": -0.49
    },
    {
      "year": 2021,
      "gdpPPP": 203.06,
      "perCapitaPPP": 29691.8,
      "perCapitaPPPChangePct": 14.62,
      "popChangePct": -1.13
    },
    {
      "year": 2022,
      "gdpPPP": 226.386,
      "perCapitaPPP": 35111.0,
      "perCapitaPPPChangePct": 18.25,
      "popChangePct": -5.72
    },
    {
      "year": 2023,
      "gdpPPP": 238.709,
      "perCapitaPPP": 37035.2,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": -0.05
    },
    {
      "year": 2024,
      "gdpPPP": 252.921,
      "perCapitaPPP": 39289.6,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": -0.12
    },
    {
      "year": 2025,
      "gdpPPP": 268.15,
      "perCapitaPPP": 42815.5,
      "perCapitaPPPChangePct": 8.97,
      "popChangePct": -2.7
    },
    {
      "year": 2026,
      "gdpPPP": 283.481,
      "perCapitaPPP": 45642.3,
      "perCapitaPPPChangePct": 6.6,
      "popChangePct": -0.83
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 296.878,
      "perCapitaPPP": 48199.4,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": -0.84
    },
    {
      "year": 2028,
      "gdpPPP": 310.073,
      "perCapitaPPP": 50763.0,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": -0.83
    },
    {
      "year": 2029,
      "gdpPPP": 323.911,
      "perCapitaPPP": 53472.3,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": -0.82
    },
    {
      "year": 2030,
      "gdpPPP": 338.572,
      "perCapitaPPP": 56360.4,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": -0.84
    },
    {
      "year": 2031,
      "gdpPPP": 353.773,
      "perCapitaPPP": 59303.9,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": -0.7
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BulgariaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
