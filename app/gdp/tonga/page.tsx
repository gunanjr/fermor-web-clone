import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Tonga",
  "slug": "tonga",
  "iso3": "TON",
  "region": "Oceania",
  "rank2026": 208,
  "flagEmoji": "🇹🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Dominica",
      "slug": "dominica",
      "rank": 207
    },
    {
      "name": "Micronesia",
      "slug": "micronesia",
      "rank": 210
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.071,
      "growth": 15.8,
      "perCapita": 770.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.079,
      "growth": 14,
      "perCapita": 850.6,
      "popChangePct": 1.09
    },
    {
      "year": 1982,
      "gdp": 0.079,
      "growth": 12.8,
      "perCapita": 843.2,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdp": 0.077,
      "growth": 5.8,
      "perCapita": 818.5,
      "popChangePct": 1.08
    },
    {
      "year": 1984,
      "gdp": 0.081,
      "growth": 44.1,
      "perCapita": 854.3,
      "popChangePct": 1.06
    },
    {
      "year": 1985,
      "gdp": 0.076,
      "growth": 5.6,
      "perCapita": 802.9,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdp": 0.09,
      "growth": 8.8,
      "perCapita": 959.3,
      "popChangePct": -1.05
    },
    {
      "year": 1987,
      "gdp": 0.098,
      "growth": 1.7,
      "perCapita": 1037.1,
      "popChangePct": 0.0
    },
    {
      "year": 1988,
      "gdp": 0.115,
      "growth": -3.5,
      "perCapita": 1213.2,
      "popChangePct": 1.06
    },
    {
      "year": 1989,
      "gdp": 0.139,
      "growth": 1.1,
      "perCapita": 1461.4,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdp": 0.144,
      "growth": 4.7,
      "perCapita": 1498.5,
      "popChangePct": 1.05
    },
    {
      "year": 1991,
      "gdp": 0.169,
      "growth": 5.9,
      "perCapita": 1750.9,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdp": 0.178,
      "growth": -3.8,
      "perCapita": 1832.8,
      "popChangePct": 1.04
    },
    {
      "year": 1993,
      "gdp": 0.183,
      "growth": -0.1,
      "perCapita": 1884.5,
      "popChangePct": 0.0
    },
    {
      "year": 1994,
      "gdp": 0.189,
      "growth": 2,
      "perCapita": 1948.1,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdp": 0.207,
      "growth": 7.9,
      "perCapita": 2123.3,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 0.218,
      "growth": 0.1,
      "perCapita": 2228.3,
      "popChangePct": 1.03
    },
    {
      "year": 1997,
      "gdp": 0.222,
      "growth": -0.6,
      "perCapita": 2263.7,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdp": 0.212,
      "growth": 2.3,
      "perCapita": 2153.2,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdp": 0.197,
      "growth": 2.3,
      "perCapita": 1994.3,
      "popChangePct": 1.02
    },
    {
      "year": 2000,
      "gdp": 0.203,
      "growth": 3.8,
      "perCapita": 2045.8,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdp": 0.181,
      "growth": 1.5,
      "perCapita": 1818.2,
      "popChangePct": 1.01
    },
    {
      "year": 2002,
      "gdp": 0.183,
      "growth": 4.5,
      "perCapita": 1828.6,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 0.202,
      "growth": 0.1,
      "perCapita": 2015.2,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.231,
      "growth": -1.9,
      "perCapita": 2288.9,
      "popChangePct": 1.0
    },
    {
      "year": 2005,
      "gdp": 0.262,
      "growth": -0.4,
      "perCapita": 2581.9,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.292,
      "growth": -2.2,
      "perCapita": 2865.3,
      "popChangePct": 0.99
    },
    {
      "year": 2007,
      "gdp": 0.299,
      "growth": -2.5,
      "perCapita": 2919.7,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 0.344,
      "growth": 4.8,
      "perCapita": 3360.5,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.312,
      "growth": -5.2,
      "perCapita": 3040.2,
      "popChangePct": 0.98
    },
    {
      "year": 2010,
      "gdp": 0.367,
      "growth": 0.8,
      "perCapita": 3561.5,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.415,
      "growth": 6.8,
      "perCapita": 4014.8,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 0.427,
      "growth": 2.4,
      "perCapita": 4153.2,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 0.452,
      "growth": -1.1,
      "perCapita": 4420.1,
      "popChangePct": -0.97
    },
    {
      "year": 2014,
      "gdp": 0.441,
      "growth": 2,
      "perCapita": 4336.6,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.438,
      "growth": 1.1,
      "perCapita": 4324.6,
      "popChangePct": -0.98
    },
    {
      "year": 2016,
      "gdp": 0.421,
      "growth": 6.6,
      "perCapita": 4181.1,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 0.46,
      "growth": 3.2,
      "perCapita": 4574.0,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 0.485,
      "growth": 0.5,
      "perCapita": 4829.6,
      "popChangePct": -0.99
    },
    {
      "year": 2019,
      "gdp": 0.505,
      "growth": -0.3,
      "perCapita": 5035.1,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 0.512,
      "growth": 1.8,
      "perCapita": 5108.1,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 0.521,
      "growth": -0.9,
      "perCapita": 5197.1,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 0.553,
      "growth": -2.1,
      "perCapita": 5535.2,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 0.596,
      "growth": 2.8,
      "perCapita": 5979.3,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 0.646,
      "growth": 1.7,
      "perCapita": 6497.5,
      "popChangePct": -1.0
    },
    {
      "year": 2025,
      "gdp": 0.68,
      "growth": 2.8,
      "perCapita": 6857.7,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 0.716,
      "growth": 2.3,
      "perCapita": 7238.0,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.753,
      "growth": 1.3,
      "perCapita": 7624.9,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 0.771,
      "growth": 1.3,
      "perCapita": 7824.5,
      "popChangePct": -1.01
    },
    {
      "year": 2029,
      "gdp": 0.797,
      "growth": 1.3,
      "perCapita": 8118.5,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 0.825,
      "growth": 1.3,
      "perCapita": 8418.6,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.854,
      "growth": 1.3,
      "perCapita": 8735.2,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.067,
      "perCapitaPPP": 723.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.083,
      "perCapitaPPP": 897.5,
      "perCapitaPPPChangePct": 24.11,
      "popChangePct": 1.09
    },
    {
      "year": 1982,
      "gdpPPP": 0.1,
      "perCapitaPPP": 1069.2,
      "perCapitaPPPChangePct": 19.13,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdpPPP": 0.11,
      "perCapitaPPP": 1163.1,
      "perCapitaPPPChangePct": 8.78,
      "popChangePct": 1.08
    },
    {
      "year": 1984,
      "gdpPPP": 0.164,
      "perCapitaPPP": 1718.3,
      "perCapitaPPPChangePct": 47.74,
      "popChangePct": 1.06
    },
    {
      "year": 1985,
      "gdpPPP": 0.178,
      "perCapitaPPP": 1881.8,
      "perCapitaPPPChangePct": 9.51,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.198,
      "perCapitaPPP": 2099.6,
      "perCapitaPPPChangePct": 11.58,
      "popChangePct": -1.05
    },
    {
      "year": 1987,
      "gdpPPP": 0.206,
      "perCapitaPPP": 2182.5,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 0.0
    },
    {
      "year": 1988,
      "gdpPPP": 0.206,
      "perCapitaPPP": 2169.6,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 1.06
    },
    {
      "year": 1989,
      "gdpPPP": 0.216,
      "perCapitaPPP": 2268.1,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdpPPP": 0.235,
      "perCapitaPPP": 2451.3,
      "perCapitaPPPChangePct": 8.08,
      "popChangePct": 1.05
    },
    {
      "year": 1991,
      "gdpPPP": 0.257,
      "perCapitaPPP": 2667.7,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdpPPP": 0.253,
      "perCapitaPPP": 2611.8,
      "perCapitaPPPChangePct": -2.1,
      "popChangePct": 1.04
    },
    {
      "year": 1993,
      "gdpPPP": 0.259,
      "perCapitaPPP": 2658.7,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 0.0
    },
    {
      "year": 1994,
      "gdpPPP": 0.27,
      "perCapitaPPP": 2776.8,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdpPPP": 0.297,
      "perCapitaPPP": 3049.6,
      "perCapitaPPPChangePct": 9.82,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 0.303,
      "perCapitaPPP": 3097.9,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 1.03
    },
    {
      "year": 1997,
      "gdpPPP": 0.306,
      "perCapitaPPP": 3126.0,
      "perCapitaPPPChangePct": 0.91,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdpPPP": 0.317,
      "perCapitaPPP": 3220.8,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdpPPP": 0.328,
      "perCapitaPPP": 3327.6,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 1.02
    },
    {
      "year": 2000,
      "gdpPPP": 0.349,
      "perCapitaPPP": 3516.6,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdpPPP": 0.362,
      "perCapitaPPP": 3633.3,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 1.01
    },
    {
      "year": 2002,
      "gdpPPP": 0.384,
      "perCapitaPPP": 3839.8,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 0.392,
      "perCapitaPPP": 3901.7,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.395,
      "perCapitaPPP": 3914.9,
      "perCapitaPPPChangePct": 0.34,
      "popChangePct": 1.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.405,
      "perCapitaPPP": 3996.0,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.409,
      "perCapitaPPP": 4005.5,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 0.99
    },
    {
      "year": 2007,
      "gdpPPP": 0.409,
      "perCapitaPPP": 4001.3,
      "perCapitaPPPChangePct": -0.11,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 0.437,
      "perCapitaPPP": 4261.6,
      "perCapitaPPPChangePct": 6.51,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.417,
      "perCapitaPPP": 4054.9,
      "perCapitaPPPChangePct": -4.85,
      "popChangePct": 0.98
    },
    {
      "year": 2010,
      "gdpPPP": 0.425,
      "perCapitaPPP": 4127.1,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 0.463,
      "perCapitaPPP": 4488.4,
      "perCapitaPPPChangePct": 8.76,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 0.483,
      "perCapitaPPP": 4704.4,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 0.486,
      "perCapitaPPP": 4754.8,
      "perCapitaPPPChangePct": 1.07,
      "popChangePct": -0.97
    },
    {
      "year": 2014,
      "gdpPPP": 0.504,
      "perCapitaPPP": 4959.2,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 0.515,
      "perCapitaPPP": 5087.0,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": -0.98
    },
    {
      "year": 2016,
      "gdpPPP": 0.554,
      "perCapitaPPP": 5502.5,
      "perCapitaPPPChangePct": 8.17,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.582,
      "perCapitaPPP": 5785.5,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 0.598,
      "perCapitaPPP": 5954.5,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": -0.99
    },
    {
      "year": 2019,
      "gdpPPP": 0.606,
      "perCapitaPPP": 6040.8,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 0.626,
      "perCapitaPPP": 6238.1,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 0.648,
      "perCapitaPPP": 6467.5,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 0.679,
      "perCapitaPPP": 6797.0,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 0.724,
      "perCapitaPPP": 7263.2,
      "perCapitaPPPChangePct": 6.86,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 0.755,
      "perCapitaPPP": 7590.2,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": -1.0
    },
    {
      "year": 2025,
      "gdpPPP": 0.798,
      "perCapitaPPP": 8044.1,
      "perCapitaPPPChangePct": 5.98,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 0.84,
      "perCapitaPPP": 8487.9,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.87,
      "perCapitaPPP": 8812.0,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 0.896,
      "perCapitaPPP": 9096.1,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": -1.01
    },
    {
      "year": 2029,
      "gdpPPP": 0.923,
      "perCapitaPPP": 9397.2,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 0.952,
      "perCapitaPPP": 9714.0,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 0.981,
      "perCapitaPPP": 10038.3,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TongaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
