import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Seychelles",
  "slug": "seychelles",
  "iso3": "SYC",
  "region": "Africa",
  "rank2026": 192,
  "flagEmoji": "🇸🇨",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Eritrea",
      "slug": "eritrea",
      "rank": 191
    },
    {
      "name": "Timor-Leste",
      "slug": "timor-leste",
      "rank": 193
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.147,
      "growth": -2.3,
      "perCapita": 2329.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.154,
      "growth": -3.9,
      "perCapita": 2403.5,
      "popChangePct": 1.59
    },
    {
      "year": 1982,
      "gdp": 0.148,
      "growth": -2.1,
      "perCapita": 2293.9,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdp": 0.147,
      "growth": -0.6,
      "perCapita": 2280.5,
      "popChangePct": 0.0
    },
    {
      "year": 1984,
      "gdp": 0.151,
      "growth": 4.3,
      "perCapita": 2338.1,
      "popChangePct": 1.56
    },
    {
      "year": 1985,
      "gdp": 0.169,
      "growth": 10.3,
      "perCapita": 2588.6,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdp": 0.208,
      "growth": 0.8,
      "perCapita": 3165.9,
      "popChangePct": 1.54
    },
    {
      "year": 1987,
      "gdp": 0.249,
      "growth": 4.9,
      "perCapita": 3639.0,
      "popChangePct": 3.03
    },
    {
      "year": 1988,
      "gdp": 0.284,
      "growth": 5.3,
      "perCapita": 4128.1,
      "popChangePct": 1.47
    },
    {
      "year": 1989,
      "gdp": 0.305,
      "growth": 10.3,
      "perCapita": 4407.2,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdp": 0.369,
      "growth": 7.5,
      "perCapita": 5302.8,
      "popChangePct": 1.45
    },
    {
      "year": 1991,
      "gdp": 0.374,
      "growth": 2.8,
      "perCapita": 5314.7,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdp": 0.434,
      "growth": 7.2,
      "perCapita": 6128.3,
      "popChangePct": 1.43
    },
    {
      "year": 1993,
      "gdp": 0.474,
      "growth": 7.3,
      "perCapita": 6559.1,
      "popChangePct": 1.41
    },
    {
      "year": 1994,
      "gdp": 0.486,
      "growth": -2.4,
      "perCapita": 6555.4,
      "popChangePct": 2.78
    },
    {
      "year": 1995,
      "gdp": 0.508,
      "growth": 0.5,
      "perCapita": 6748.8,
      "popChangePct": 1.35
    },
    {
      "year": 1996,
      "gdp": 0.503,
      "growth": 10,
      "perCapita": 6583.1,
      "popChangePct": 1.33
    },
    {
      "year": 1997,
      "gdp": 0.563,
      "growth": 12.2,
      "perCapita": 7280.9,
      "popChangePct": 1.32
    },
    {
      "year": 1998,
      "gdp": 0.608,
      "growth": 2.5,
      "perCapita": 7715.8,
      "popChangePct": 2.6
    },
    {
      "year": 1999,
      "gdp": 0.623,
      "growth": 1.9,
      "perCapita": 7747.5,
      "popChangePct": 1.27
    },
    {
      "year": 2000,
      "gdp": 0.615,
      "growth": 4.3,
      "perCapita": 7578.8,
      "popChangePct": 1.25
    },
    {
      "year": 2001,
      "gdp": 0.622,
      "growth": -2.3,
      "perCapita": 7663.1,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.698,
      "growth": 1.2,
      "perCapita": 8431.9,
      "popChangePct": 2.47
    },
    {
      "year": 2003,
      "gdp": 0.706,
      "growth": -5.9,
      "perCapita": 8524.9,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.839,
      "growth": -2.9,
      "perCapita": 10176.7,
      "popChangePct": -1.2
    },
    {
      "year": 2005,
      "gdp": 0.919,
      "growth": 9,
      "perCapita": 11093.3,
      "popChangePct": 1.22
    },
    {
      "year": 2006,
      "gdp": 1.016,
      "growth": 9.4,
      "perCapita": 12014.4,
      "popChangePct": 2.41
    },
    {
      "year": 2007,
      "gdp": 1.034,
      "growth": 10.4,
      "perCapita": 11929.9,
      "popChangePct": 2.35
    },
    {
      "year": 2008,
      "gdp": 0.998,
      "growth": -2.1,
      "perCapita": 11387.6,
      "popChangePct": 1.15
    },
    {
      "year": 2009,
      "gdp": 0.847,
      "growth": -1.1,
      "perCapita": 9555.1,
      "popChangePct": 1.14
    },
    {
      "year": 2010,
      "gdp": 0.97,
      "growth": 6.3,
      "perCapita": 10782.2,
      "popChangePct": 1.12
    },
    {
      "year": 2011,
      "gdp": 1.018,
      "growth": 5.7,
      "perCapita": 11081.3,
      "popChangePct": 2.22
    },
    {
      "year": 2012,
      "gdp": 1.06,
      "growth": 3.8,
      "perCapita": 11237.8,
      "popChangePct": 2.17
    },
    {
      "year": 2013,
      "gdp": 1.328,
      "growth": 6.4,
      "perCapita": 13730.7,
      "popChangePct": 3.19
    },
    {
      "year": 2014,
      "gdp": 1.388,
      "growth": 4.7,
      "perCapita": 13998.2,
      "popChangePct": 2.06
    },
    {
      "year": 2015,
      "gdp": 1.432,
      "growth": 8.9,
      "perCapita": 14099.4,
      "popChangePct": 3.03
    },
    {
      "year": 2016,
      "gdp": 1.568,
      "growth": 12.1,
      "perCapita": 15076.9,
      "popChangePct": 1.96
    },
    {
      "year": 2017,
      "gdp": 1.675,
      "growth": 7,
      "perCapita": 15732.5,
      "popChangePct": 1.92
    },
    {
      "year": 2018,
      "gdp": 1.776,
      "growth": 4.9,
      "perCapita": 16302.5,
      "popChangePct": 2.83
    },
    {
      "year": 2019,
      "gdp": 1.867,
      "growth": 5.5,
      "perCapita": 16754.1,
      "popChangePct": 1.83
    },
    {
      "year": 2020,
      "gdp": 1.384,
      "growth": -11.8,
      "perCapita": 12144.9,
      "popChangePct": 2.7
    },
    {
      "year": 2021,
      "gdp": 1.49,
      "growth": 0.6,
      "perCapita": 12788.6,
      "popChangePct": 1.75
    },
    {
      "year": 2022,
      "gdp": 2,
      "growth": 9.9,
      "perCapita": 16819.7,
      "popChangePct": 2.59
    },
    {
      "year": 2023,
      "gdp": 2.172,
      "growth": 5.2,
      "perCapita": 17916.8,
      "popChangePct": 1.68
    },
    {
      "year": 2024,
      "gdp": 2.229,
      "growth": 3.4,
      "perCapita": 18040.1,
      "popChangePct": 2.48
    },
    {
      "year": 2025,
      "gdp": 2.318,
      "growth": 5.1,
      "perCapita": 18479.2,
      "popChangePct": 0.81
    },
    {
      "year": 2026,
      "gdp": 2.251,
      "growth": 1.5,
      "perCapita": 17674.6,
      "popChangePct": 1.6
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2.449,
      "growth": 4,
      "perCapita": 18944.9,
      "popChangePct": 1.57
    },
    {
      "year": 2028,
      "gdp": 2.533,
      "growth": 3.3,
      "perCapita": 19307.0,
      "popChangePct": 1.55
    },
    {
      "year": 2029,
      "gdp": 2.621,
      "growth": 3.3,
      "perCapita": 19685.1,
      "popChangePct": 1.53
    },
    {
      "year": 2030,
      "gdp": 2.711,
      "growth": 3.3,
      "perCapita": 20067.5,
      "popChangePct": 1.5
    },
    {
      "year": 2031,
      "gdp": 2.818,
      "growth": 3.3,
      "perCapita": 20558.9,
      "popChangePct": 1.48
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.268,
      "perCapitaPPP": 4231.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.282,
      "perCapitaPPP": 4398.4,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 1.59
    },
    {
      "year": 1982,
      "gdpPPP": 0.293,
      "perCapitaPPP": 4546.7,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdpPPP": 0.302,
      "perCapitaPPP": 4701.3,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 0.0
    },
    {
      "year": 1984,
      "gdpPPP": 0.327,
      "perCapitaPPP": 5050.7,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 1.56
    },
    {
      "year": 1985,
      "gdpPPP": 0.372,
      "perCapitaPPP": 5700.3,
      "perCapitaPPPChangePct": 12.86,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.382,
      "perCapitaPPP": 5823.0,
      "perCapitaPPPChangePct": 2.15,
      "popChangePct": 1.54
    },
    {
      "year": 1987,
      "gdpPPP": 0.411,
      "perCapitaPPP": 5998.1,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 3.03
    },
    {
      "year": 1988,
      "gdpPPP": 0.448,
      "perCapitaPPP": 6516.0,
      "perCapitaPPPChangePct": 8.63,
      "popChangePct": 1.47
    },
    {
      "year": 1989,
      "gdpPPP": 0.513,
      "perCapitaPPP": 7423.5,
      "perCapitaPPPChangePct": 13.93,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdpPPP": 0.572,
      "perCapitaPPP": 8235.0,
      "perCapitaPPPChangePct": 10.93,
      "popChangePct": 1.45
    },
    {
      "year": 1991,
      "gdpPPP": 0.608,
      "perCapitaPPP": 8632.8,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdpPPP": 0.667,
      "perCapitaPPP": 9419.5,
      "perCapitaPPPChangePct": 9.11,
      "popChangePct": 1.43
    },
    {
      "year": 1993,
      "gdpPPP": 0.732,
      "perCapitaPPP": 10133.6,
      "perCapitaPPPChangePct": 7.58,
      "popChangePct": 1.41
    },
    {
      "year": 1994,
      "gdpPPP": 0.73,
      "perCapitaPPP": 9832.2,
      "perCapitaPPPChangePct": -2.97,
      "popChangePct": 2.78
    },
    {
      "year": 1995,
      "gdpPPP": 0.749,
      "perCapitaPPP": 9939.8,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": 1.35
    },
    {
      "year": 1996,
      "gdpPPP": 0.838,
      "perCapitaPPP": 10971.6,
      "perCapitaPPPChangePct": 10.38,
      "popChangePct": 1.33
    },
    {
      "year": 1997,
      "gdpPPP": 0.957,
      "perCapitaPPP": 12375.7,
      "perCapitaPPPChangePct": 12.8,
      "popChangePct": 1.32
    },
    {
      "year": 1998,
      "gdpPPP": 0.992,
      "perCapitaPPP": 12575.2,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 2.6
    },
    {
      "year": 1999,
      "gdpPPP": 1.024,
      "perCapitaPPP": 12739.2,
      "perCapitaPPPChangePct": 1.3,
      "popChangePct": 1.27
    },
    {
      "year": 2000,
      "gdpPPP": 1.092,
      "perCapitaPPP": 13461.2,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 1.25
    },
    {
      "year": 2001,
      "gdpPPP": 1.091,
      "perCapitaPPP": 13439.9,
      "perCapitaPPPChangePct": -0.16,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 1.122,
      "perCapitaPPP": 13560.3,
      "perCapitaPPPChangePct": 0.9,
      "popChangePct": 2.47
    },
    {
      "year": 2003,
      "gdpPPP": 1.077,
      "perCapitaPPP": 13004.8,
      "perCapitaPPPChangePct": -4.1,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 1.074,
      "perCapitaPPP": 13022.0,
      "perCapitaPPPChangePct": 0.13,
      "popChangePct": -1.2
    },
    {
      "year": 2005,
      "gdpPPP": 1.207,
      "perCapitaPPP": 14573.2,
      "perCapitaPPPChangePct": 11.91,
      "popChangePct": 1.22
    },
    {
      "year": 2006,
      "gdpPPP": 1.362,
      "perCapitaPPP": 16096.1,
      "perCapitaPPPChangePct": 10.45,
      "popChangePct": 2.41
    },
    {
      "year": 2007,
      "gdpPPP": 1.544,
      "perCapitaPPP": 17824.1,
      "perCapitaPPPChangePct": 10.74,
      "popChangePct": 2.35
    },
    {
      "year": 2008,
      "gdpPPP": 1.541,
      "perCapitaPPP": 17579.3,
      "perCapitaPPPChangePct": -1.37,
      "popChangePct": 1.15
    },
    {
      "year": 2009,
      "gdpPPP": 1.534,
      "perCapitaPPP": 17292.1,
      "perCapitaPPPChangePct": -1.63,
      "popChangePct": 1.14
    },
    {
      "year": 2010,
      "gdpPPP": 1.65,
      "perCapitaPPP": 18345.5,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": 1.12
    },
    {
      "year": 2011,
      "gdpPPP": 1.78,
      "perCapitaPPP": 19369.6,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 2.22
    },
    {
      "year": 2012,
      "gdpPPP": 1.883,
      "perCapitaPPP": 19965.6,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 2.17
    },
    {
      "year": 2013,
      "gdpPPP": 2.037,
      "perCapitaPPP": 21066.2,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 3.19
    },
    {
      "year": 2014,
      "gdpPPP": 2.17,
      "perCapitaPPP": 21894.7,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 2.06
    },
    {
      "year": 2015,
      "gdpPPP": 2.386,
      "perCapitaPPP": 23489.0,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 3.03
    },
    {
      "year": 2016,
      "gdpPPP": 2.7,
      "perCapitaPPP": 25958.5,
      "perCapitaPPPChangePct": 10.51,
      "popChangePct": 1.96
    },
    {
      "year": 2017,
      "gdpPPP": 2.94,
      "perCapitaPPP": 27606.3,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.92
    },
    {
      "year": 2018,
      "gdpPPP": 3.105,
      "perCapitaPPP": 28495.5,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 2.83
    },
    {
      "year": 2019,
      "gdpPPP": 3.341,
      "perCapitaPPP": 29976.3,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 1.83
    },
    {
      "year": 2020,
      "gdpPPP": 3.058,
      "perCapitaPPP": 26836.0,
      "perCapitaPPPChangePct": -10.48,
      "popChangePct": 2.7
    },
    {
      "year": 2021,
      "gdpPPP": 2.976,
      "perCapitaPPP": 25543.0,
      "perCapitaPPPChangePct": -4.82,
      "popChangePct": 1.75
    },
    {
      "year": 2022,
      "gdpPPP": 3.502,
      "perCapitaPPP": 29454.8,
      "perCapitaPPPChangePct": 15.31,
      "popChangePct": 2.59
    },
    {
      "year": 2023,
      "gdpPPP": 3.82,
      "perCapitaPPP": 31516.0,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 1.68
    },
    {
      "year": 2024,
      "gdpPPP": 4.046,
      "perCapitaPPP": 32749.2,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 2.48
    },
    {
      "year": 2025,
      "gdpPPP": 4.372,
      "perCapitaPPP": 34856.9,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 0.81
    },
    {
      "year": 2026,
      "gdpPPP": 4.566,
      "perCapitaPPP": 35854.8,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 1.6
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 4.854,
      "perCapitaPPP": 37546.1,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 1.57
    },
    {
      "year": 2028,
      "gdpPPP": 5.096,
      "perCapitaPPP": 38838.2,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 1.55
    },
    {
      "year": 2029,
      "gdpPPP": 5.357,
      "perCapitaPPP": 40234.6,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": 1.53
    },
    {
      "year": 2030,
      "gdpPPP": 5.635,
      "perCapitaPPP": 41711.9,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 1.5
    },
    {
      "year": 2031,
      "gdpPPP": 5.925,
      "perCapitaPPP": 43235.9,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 1.48
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SeychellesGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
