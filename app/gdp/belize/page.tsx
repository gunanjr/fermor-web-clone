import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Belize",
  "slug": "belize",
  "iso3": "BLZ",
  "region": "Americas",
  "rank2026": 181,
  "flagEmoji": "🇧🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Central African Republic",
      "slug": "central-african-republic",
      "rank": 180
    },
    {
      "name": "Cabo Verde",
      "slug": "cabo-verde",
      "rank": 182
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.229,
      "growth": 5,
      "perCapita": 1523.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.238,
      "growth": 0.2,
      "perCapita": 1584.0,
      "popChangePct": 0.0
    },
    {
      "year": 1982,
      "gdp": 0.238,
      "growth": -7.6,
      "perCapita": 1553.7,
      "popChangePct": 2.0
    },
    {
      "year": 1983,
      "gdp": 0.251,
      "growth": 6.1,
      "perCapita": 1593.3,
      "popChangePct": 2.61
    },
    {
      "year": 1984,
      "gdp": 0.28,
      "growth": 11.3,
      "perCapita": 1730.8,
      "popChangePct": 3.18
    },
    {
      "year": 1985,
      "gdp": 0.278,
      "growth": -1.4,
      "perCapita": 1670.3,
      "popChangePct": 2.47
    },
    {
      "year": 1986,
      "gdp": 0.302,
      "growth": 7.3,
      "perCapita": 1768.4,
      "popChangePct": 3.01
    },
    {
      "year": 1987,
      "gdp": 0.354,
      "growth": 22,
      "perCapita": 2015.3,
      "popChangePct": 2.92
    },
    {
      "year": 1988,
      "gdp": 0.418,
      "growth": 10.9,
      "perCapita": 2334.5,
      "popChangePct": 1.7
    },
    {
      "year": 1989,
      "gdp": 0.482,
      "growth": 15.5,
      "perCapita": 2623.4,
      "popChangePct": 2.79
    },
    {
      "year": 1990,
      "gdp": 0.547,
      "growth": 11.2,
      "perCapita": 2892.9,
      "popChangePct": 2.72
    },
    {
      "year": 1991,
      "gdp": 0.597,
      "growth": 11.8,
      "perCapita": 3075.7,
      "popChangePct": 2.65
    },
    {
      "year": 1992,
      "gdp": 0.696,
      "growth": 12.7,
      "perCapita": 3496.2,
      "popChangePct": 2.58
    },
    {
      "year": 1993,
      "gdp": 0.752,
      "growth": 6.1,
      "perCapita": 3669.5,
      "popChangePct": 3.02
    },
    {
      "year": 1994,
      "gdp": 0.772,
      "growth": 0,
      "perCapita": 3658,
      "popChangePct": 2.93
    },
    {
      "year": 1995,
      "gdp": 0.819,
      "growth": 0.7,
      "perCapita": 3781.0,
      "popChangePct": 2.84
    },
    {
      "year": 1996,
      "gdp": 0.85,
      "growth": 1.1,
      "perCapita": 3830.4,
      "popChangePct": 2.3
    },
    {
      "year": 1997,
      "gdp": 0.873,
      "growth": 4.2,
      "perCapita": 3795.3,
      "popChangePct": 3.6
    },
    {
      "year": 1998,
      "gdp": 0.929,
      "growth": 3.9,
      "perCapita": 3895.4,
      "popChangePct": 3.91
    },
    {
      "year": 1999,
      "gdp": 1,
      "growth": 9.4,
      "perCapita": 4113.1,
      "popChangePct": 1.67
    },
    {
      "year": 2000,
      "gdp": 1.138,
      "growth": 12.2,
      "perCapita": 4556.8,
      "popChangePct": 2.88
    },
    {
      "year": 2001,
      "gdp": 1.172,
      "growth": 5,
      "perCapita": 4576.7,
      "popChangePct": 2.4
    },
    {
      "year": 2002,
      "gdp": 1.244,
      "growth": 5.4,
      "perCapita": 4736.5,
      "popChangePct": 2.73
    },
    {
      "year": 2003,
      "gdp": 1.308,
      "growth": 9.7,
      "perCapita": 4856.7,
      "popChangePct": 2.28
    },
    {
      "year": 2004,
      "gdp": 1.4,
      "growth": 4.8,
      "perCapita": 5066.2,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdp": 1.474,
      "growth": 2.2,
      "perCapita": 5198.5,
      "popChangePct": 2.9
    },
    {
      "year": 2006,
      "gdp": 1.59,
      "growth": 4.5,
      "perCapita": 5464.2,
      "popChangePct": 2.46
    },
    {
      "year": 2007,
      "gdp": 1.706,
      "growth": 3.3,
      "perCapita": 5710.3,
      "popChangePct": 2.75
    },
    {
      "year": 2008,
      "gdp": 1.738,
      "growth": -1.6,
      "perCapita": 5666.2,
      "popChangePct": 2.68
    },
    {
      "year": 2009,
      "gdp": 1.688,
      "growth": -0.4,
      "perCapita": 5357.4,
      "popChangePct": 2.61
    },
    {
      "year": 2010,
      "gdp": 1.749,
      "growth": 1.4,
      "perCapita": 5424.0,
      "popChangePct": 2.22
    },
    {
      "year": 2011,
      "gdp": 1.832,
      "growth": -0.1,
      "perCapita": 5577.7,
      "popChangePct": 1.86
    },
    {
      "year": 2012,
      "gdp": 1.917,
      "growth": 3.9,
      "perCapita": 5737.1,
      "popChangePct": 1.83
    },
    {
      "year": 2013,
      "gdp": 2.035,
      "growth": 4.1,
      "perCapita": 5956.9,
      "popChangePct": 2.4
    },
    {
      "year": 2014,
      "gdp": 2.138,
      "growth": 3.9,
      "perCapita": 6123.8,
      "popChangePct": 2.05
    },
    {
      "year": 2015,
      "gdp": 2.193,
      "growth": 2.8,
      "perCapita": 6148.2,
      "popChangePct": 2.29
    },
    {
      "year": 2016,
      "gdp": 2.24,
      "growth": 0,
      "perCapita": 6150.8,
      "popChangePct": 1.96
    },
    {
      "year": 2017,
      "gdp": 2.266,
      "growth": -1.8,
      "perCapita": 6102.1,
      "popChangePct": 1.92
    },
    {
      "year": 2018,
      "gdp": 2.286,
      "growth": 0.8,
      "perCapita": 6035.1,
      "popChangePct": 2.16
    },
    {
      "year": 2019,
      "gdp": 2.381,
      "growth": 4.3,
      "perCapita": 6166.9,
      "popChangePct": 1.85
    },
    {
      "year": 2020,
      "gdp": 2.047,
      "growth": -13.5,
      "perCapita": 5209.4,
      "popChangePct": 1.81
    },
    {
      "year": 2021,
      "gdp": 2.429,
      "growth": 18,
      "perCapita": 6081.0,
      "popChangePct": 1.53
    },
    {
      "year": 2022,
      "gdp": 2.847,
      "growth": 9.3,
      "perCapita": 7161.6,
      "popChangePct": -0.5
    },
    {
      "year": 2023,
      "gdp": 3.052,
      "growth": 0.5,
      "perCapita": 7551.7,
      "popChangePct": 1.76
    },
    {
      "year": 2024,
      "gdp": 3.204,
      "growth": 3.5,
      "perCapita": 7796.3,
      "popChangePct": 1.73
    },
    {
      "year": 2025,
      "gdp": 3.327,
      "growth": 2.7,
      "perCapita": 7968.3,
      "popChangePct": 1.46
    },
    {
      "year": 2026,
      "gdp": 3.45,
      "growth": 2.2,
      "perCapita": 8134.1,
      "popChangePct": 1.68
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3.577,
      "growth": 2.1,
      "perCapita": 8305.5,
      "popChangePct": 1.65
    },
    {
      "year": 2028,
      "gdp": 3.695,
      "growth": 2,
      "perCapita": 8449.1,
      "popChangePct": 1.39
    },
    {
      "year": 2029,
      "gdp": 3.816,
      "growth": 2,
      "perCapita": 8597.7,
      "popChangePct": 1.6
    },
    {
      "year": 2030,
      "gdp": 3.941,
      "growth": 2,
      "perCapita": 8748.9,
      "popChangePct": 1.58
    },
    {
      "year": 2031,
      "gdp": 4.071,
      "growth": 2,
      "perCapita": 8902.8,
      "popChangePct": 1.33
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.233,
      "perCapitaPPP": 1555.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.256,
      "perCapitaPPP": 1702.5,
      "perCapitaPPPChangePct": 9.48,
      "popChangePct": 0.0
    },
    {
      "year": 1982,
      "gdpPPP": 0.251,
      "perCapitaPPP": 1640.6,
      "perCapitaPPPChangePct": -3.63,
      "popChangePct": 2.0
    },
    {
      "year": 1983,
      "gdpPPP": 0.277,
      "perCapitaPPP": 1759.0,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 2.61
    },
    {
      "year": 1984,
      "gdpPPP": 0.319,
      "perCapitaPPP": 1975.1,
      "perCapitaPPPChangePct": 12.28,
      "popChangePct": 3.18
    },
    {
      "year": 1985,
      "gdpPPP": 0.325,
      "perCapitaPPP": 1954.3,
      "perCapitaPPPChangePct": -1.05,
      "popChangePct": 2.47
    },
    {
      "year": 1986,
      "gdpPPP": 0.355,
      "perCapitaPPP": 2078.6,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 3.01
    },
    {
      "year": 1987,
      "gdpPPP": 0.444,
      "perCapitaPPP": 2532.0,
      "perCapitaPPPChangePct": 21.81,
      "popChangePct": 2.92
    },
    {
      "year": 1988,
      "gdpPPP": 0.51,
      "perCapitaPPP": 2849.2,
      "perCapitaPPPChangePct": 12.53,
      "popChangePct": 1.7
    },
    {
      "year": 1989,
      "gdpPPP": 0.612,
      "perCapitaPPP": 3331.6,
      "perCapitaPPPChangePct": 16.93,
      "popChangePct": 2.79
    },
    {
      "year": 1990,
      "gdpPPP": 0.706,
      "perCapitaPPP": 3735.9,
      "perCapitaPPPChangePct": 12.14,
      "popChangePct": 2.72
    },
    {
      "year": 1991,
      "gdpPPP": 0.816,
      "perCapitaPPP": 4206.0,
      "perCapitaPPPChangePct": 12.58,
      "popChangePct": 2.65
    },
    {
      "year": 1992,
      "gdpPPP": 0.941,
      "perCapitaPPP": 4727.9,
      "perCapitaPPPChangePct": 12.41,
      "popChangePct": 2.58
    },
    {
      "year": 1993,
      "gdpPPP": 1.022,
      "perCapitaPPP": 4986.6,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 3.02
    },
    {
      "year": 1994,
      "gdpPPP": 1.044,
      "perCapitaPPP": 4947.3,
      "perCapitaPPPChangePct": -0.79,
      "popChangePct": 2.93
    },
    {
      "year": 1995,
      "gdpPPP": 1.074,
      "perCapitaPPP": 4958.7,
      "perCapitaPPPChangePct": 0.23,
      "popChangePct": 2.84
    },
    {
      "year": 1996,
      "gdpPPP": 1.105,
      "perCapitaPPP": 4978.8,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 2.3
    },
    {
      "year": 1997,
      "gdpPPP": 1.172,
      "perCapitaPPP": 5095.5,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 3.6
    },
    {
      "year": 1998,
      "gdpPPP": 1.231,
      "perCapitaPPP": 5162.6,
      "perCapitaPPPChangePct": 1.32,
      "popChangePct": 3.91
    },
    {
      "year": 1999,
      "gdpPPP": 1.366,
      "perCapitaPPP": 5621.7,
      "perCapitaPPPChangePct": 8.89,
      "popChangePct": 1.67
    },
    {
      "year": 2000,
      "gdpPPP": 1.568,
      "perCapitaPPP": 6279.4,
      "perCapitaPPPChangePct": 11.7,
      "popChangePct": 2.88
    },
    {
      "year": 2001,
      "gdpPPP": 1.684,
      "perCapitaPPP": 6574.9,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 2.4
    },
    {
      "year": 2002,
      "gdpPPP": 1.802,
      "perCapitaPPP": 6862.5,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 2.73
    },
    {
      "year": 2003,
      "gdpPPP": 2.015,
      "perCapitaPPP": 7481.9,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": 2.28
    },
    {
      "year": 2004,
      "gdpPPP": 2.169,
      "perCapitaPPP": 7846.4,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdpPPP": 2.286,
      "perCapitaPPP": 8061.4,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 2.9
    },
    {
      "year": 2006,
      "gdpPPP": 2.463,
      "perCapitaPPP": 8462.1,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 2.46
    },
    {
      "year": 2007,
      "gdpPPP": 2.614,
      "perCapitaPPP": 8749.5,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 2.75
    },
    {
      "year": 2008,
      "gdpPPP": 2.621,
      "perCapitaPPP": 8543.6,
      "perCapitaPPPChangePct": -2.35,
      "popChangePct": 2.68
    },
    {
      "year": 2009,
      "gdpPPP": 2.626,
      "perCapitaPPP": 8333.2,
      "perCapitaPPPChangePct": -2.46,
      "popChangePct": 2.61
    },
    {
      "year": 2010,
      "gdpPPP": 2.695,
      "perCapitaPPP": 8358.5,
      "perCapitaPPPChangePct": 0.3,
      "popChangePct": 2.22
    },
    {
      "year": 2011,
      "gdpPPP": 2.747,
      "perCapitaPPP": 8366.2,
      "perCapitaPPPChangePct": 0.09,
      "popChangePct": 1.86
    },
    {
      "year": 2012,
      "gdpPPP": 2.909,
      "perCapitaPPP": 8704.8,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 1.83
    },
    {
      "year": 2013,
      "gdpPPP": 3.079,
      "perCapitaPPP": 9010.8,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 2.4
    },
    {
      "year": 2014,
      "gdpPPP": 3.254,
      "perCapitaPPP": 9319.6,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 2.05
    },
    {
      "year": 2015,
      "gdpPPP": 3.375,
      "perCapitaPPP": 9461.5,
      "perCapitaPPPChangePct": 1.52,
      "popChangePct": 2.29
    },
    {
      "year": 2016,
      "gdpPPP": 3.406,
      "perCapitaPPP": 9355.2,
      "perCapitaPPPChangePct": -1.12,
      "popChangePct": 1.96
    },
    {
      "year": 2017,
      "gdpPPP": 3.404,
      "perCapitaPPP": 9166.1,
      "perCapitaPPPChangePct": -2.02,
      "popChangePct": 1.92
    },
    {
      "year": 2018,
      "gdpPPP": 3.611,
      "perCapitaPPP": 9533.7,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 2.16
    },
    {
      "year": 2019,
      "gdpPPP": 4.051,
      "perCapitaPPP": 10492.0,
      "perCapitaPPPChangePct": 10.05,
      "popChangePct": 1.85
    },
    {
      "year": 2020,
      "gdpPPP": 3.767,
      "perCapitaPPP": 9585.3,
      "perCapitaPPPChangePct": -8.64,
      "popChangePct": 1.81
    },
    {
      "year": 2021,
      "gdpPPP": 4.632,
      "perCapitaPPP": 11598.2,
      "perCapitaPPPChangePct": 21.0,
      "popChangePct": 1.53
    },
    {
      "year": 2022,
      "gdpPPP": 5.42,
      "perCapitaPPP": 13636.8,
      "perCapitaPPPChangePct": 17.58,
      "popChangePct": -0.5
    },
    {
      "year": 2023,
      "gdpPPP": 5.649,
      "perCapitaPPP": 13976.0,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 1.76
    },
    {
      "year": 2024,
      "gdpPPP": 5.992,
      "perCapitaPPP": 14582.5,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 1.73
    },
    {
      "year": 2025,
      "gdpPPP": 6.331,
      "perCapitaPPP": 15165.4,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 1.46
    },
    {
      "year": 2026,
      "gdpPPP": 6.656,
      "perCapitaPPP": 15693.9,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 1.68
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 6.946,
      "perCapitaPPP": 16126.6,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 1.65
    },
    {
      "year": 2028,
      "gdpPPP": 7.201,
      "perCapitaPPP": 16467.2,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 1.39
    },
    {
      "year": 2029,
      "gdpPPP": 7.476,
      "perCapitaPPP": 16842.6,
      "perCapitaPPPChangePct": 2.28,
      "popChangePct": 1.6
    },
    {
      "year": 2030,
      "gdpPPP": 7.765,
      "perCapitaPPP": 17236.5,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 1.58
    },
    {
      "year": 2031,
      "gdpPPP": 8.064,
      "perCapitaPPP": 17634.1,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 1.33
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BelizeGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
