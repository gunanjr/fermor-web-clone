import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Djibouti",
  "slug": "djibouti",
  "iso3": "DJI",
  "region": "Africa",
  "rank2026": 175,
  "flagEmoji": "🇩🇯",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Andorra",
      "slug": "andorra",
      "rank": 174
    },
    {
      "name": "Aruba",
      "slug": "aruba",
      "rank": 177
    }
  ],
  "history": [
    {
      "year": 1990,
      "gdp": 0.635,
      "growth": null,
      "perCapita": 1076.2,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 0.65,
      "growth": -4.5,
      "perCapita": 1070.4,
      "popChangePct": 2.88
    },
    {
      "year": 1992,
      "gdp": 0.672,
      "growth": 0.6,
      "perCapita": 1091.8,
      "popChangePct": 1.32
    },
    {
      "year": 1993,
      "gdp": 0.655,
      "growth": -6.8,
      "perCapita": 1058.5,
      "popChangePct": 0.65
    },
    {
      "year": 1994,
      "gdp": 0.691,
      "growth": -1.4,
      "perCapita": 1109.8,
      "popChangePct": 0.48
    },
    {
      "year": 1995,
      "gdp": 0.699,
      "growth": -3.5,
      "perCapita": 1109.1,
      "popChangePct": 1.29
    },
    {
      "year": 1996,
      "gdp": 0.694,
      "growth": -3.7,
      "perCapita": 1078.1,
      "popChangePct": 2.22
    },
    {
      "year": 1997,
      "gdp": 0.706,
      "growth": -1.2,
      "perCapita": 1068.5,
      "popChangePct": 2.64
    },
    {
      "year": 1998,
      "gdp": 0.722,
      "growth": 0.1,
      "perCapita": 1061.6,
      "popChangePct": 2.87
    },
    {
      "year": 1999,
      "gdp": 0.759,
      "growth": 2.9,
      "perCapita": 1084.9,
      "popChangePct": 2.94
    },
    {
      "year": 2000,
      "gdp": 0.781,
      "growth": 0.7,
      "perCapita": 1088.2,
      "popChangePct": 2.57
    },
    {
      "year": 2001,
      "gdp": 0.811,
      "growth": 1.8,
      "perCapita": 1106.7,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdp": 0.837,
      "growth": 3.2,
      "perCapita": 1121.2,
      "popChangePct": 1.91
    },
    {
      "year": 2003,
      "gdp": 0.882,
      "growth": 3.2,
      "perCapita": 1160.5,
      "popChangePct": 1.74
    },
    {
      "year": 2004,
      "gdp": 0.936,
      "growth": 2.8,
      "perCapita": 1212.8,
      "popChangePct": 1.58
    },
    {
      "year": 2005,
      "gdp": 0.996,
      "growth": 3.1,
      "perCapita": 1271.2,
      "popChangePct": 1.42
    },
    {
      "year": 2006,
      "gdp": 1.08,
      "growth": 4.8,
      "perCapita": 1359.5,
      "popChangePct": 1.53
    },
    {
      "year": 2007,
      "gdp": 1.191,
      "growth": 5,
      "perCapita": 1478.4,
      "popChangePct": 1.26
    },
    {
      "year": 2008,
      "gdp": 1.382,
      "growth": 5.8,
      "perCapita": 1692.4,
      "popChangePct": 1.37
    },
    {
      "year": 2009,
      "gdp": 1.426,
      "growth": 1.6,
      "perCapita": 1722.3,
      "popChangePct": 1.47
    },
    {
      "year": 2010,
      "gdp": 1.544,
      "growth": 4.1,
      "perCapita": 1837.2,
      "popChangePct": 1.45
    },
    {
      "year": 2011,
      "gdp": 1.74,
      "growth": 7.3,
      "perCapita": 2038.6,
      "popChangePct": 1.67
    },
    {
      "year": 2012,
      "gdp": 1.901,
      "growth": 4.8,
      "perCapita": 2190.3,
      "popChangePct": 1.64
    },
    {
      "year": 2013,
      "gdp": 2.044,
      "growth": 5,
      "perCapita": 2314.6,
      "popChangePct": 1.73
    },
    {
      "year": 2014,
      "gdp": 2.221,
      "growth": 7.2,
      "perCapita": 2470.9,
      "popChangePct": 1.81
    },
    {
      "year": 2015,
      "gdp": 2.424,
      "growth": 7.3,
      "perCapita": 2652.5,
      "popChangePct": 1.67
    },
    {
      "year": 2016,
      "gdp": 2.605,
      "growth": 7.1,
      "perCapita": 2803.7,
      "popChangePct": 1.64
    },
    {
      "year": 2017,
      "gdp": 2.763,
      "growth": 5.5,
      "perCapita": 2926.2,
      "popChangePct": 1.61
    },
    {
      "year": 2018,
      "gdp": 2.913,
      "growth": 4.8,
      "perCapita": 3038.3,
      "popChangePct": 1.59
    },
    {
      "year": 2019,
      "gdp": 3.089,
      "growth": 5.5,
      "perCapita": 3172.7,
      "popChangePct": 1.56
    },
    {
      "year": 2020,
      "gdp": 3.144,
      "growth": 1.2,
      "perCapita": 3182.3,
      "popChangePct": 1.44
    },
    {
      "year": 2021,
      "gdp": 3.393,
      "growth": 4.4,
      "perCapita": 3385.4,
      "popChangePct": 1.42
    },
    {
      "year": 2022,
      "gdp": 3.563,
      "growth": 5.2,
      "perCapita": 3506.4,
      "popChangePct": 1.4
    },
    {
      "year": 2023,
      "gdp": 3.898,
      "growth": 6.8,
      "perCapita": 3786.0,
      "popChangePct": 1.38
    },
    {
      "year": 2024,
      "gdp": 4.152,
      "growth": 7,
      "perCapita": 3980.9,
      "popChangePct": 1.26
    },
    {
      "year": 2025,
      "gdp": 4.378,
      "growth": 6,
      "perCapita": 4145.3,
      "popChangePct": 1.25
    },
    {
      "year": 2026,
      "gdp": 4.725,
      "growth": 6,
      "perCapita": 4420.7,
      "popChangePct": 1.23
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 5.064,
      "growth": 6,
      "perCapita": 4683.1,
      "popChangePct": 1.12
    },
    {
      "year": 2028,
      "gdp": 5.393,
      "growth": 5.5,
      "perCapita": 4932.0,
      "popChangePct": 1.11
    },
    {
      "year": 2029,
      "gdp": 5.745,
      "growth": 5.5,
      "perCapita": 5196.1,
      "popChangePct": 1.19
    },
    {
      "year": 2030,
      "gdp": 6.121,
      "growth": 5.5,
      "perCapita": 5481.0,
      "popChangePct": 0.99
    },
    {
      "year": 2031,
      "gdp": 6.521,
      "growth": 5.5,
      "perCapita": 5781.0,
      "popChangePct": 0.98
    }
  ],
  "pppHistory": [
    {
      "year": 1991,
      "gdpPPP": 1.579,
      "perCapitaPPP": 2602.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": 2.88
    },
    {
      "year": 1992,
      "gdpPPP": 1.624,
      "perCapitaPPP": 2640.6,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 1.32
    },
    {
      "year": 1993,
      "gdpPPP": 1.55,
      "perCapitaPPP": 2506.6,
      "perCapitaPPPChangePct": -5.07,
      "popChangePct": 0.65
    },
    {
      "year": 1994,
      "gdpPPP": 1.562,
      "perCapitaPPP": 2509.6,
      "perCapitaPPPChangePct": 0.12,
      "popChangePct": 0.48
    },
    {
      "year": 1995,
      "gdpPPP": 1.539,
      "perCapitaPPP": 2441.6,
      "perCapitaPPPChangePct": -2.71,
      "popChangePct": 1.29
    },
    {
      "year": 1996,
      "gdpPPP": 1.509,
      "perCapitaPPP": 2344.2,
      "perCapitaPPPChangePct": -3.99,
      "popChangePct": 2.22
    },
    {
      "year": 1997,
      "gdpPPP": 1.516,
      "perCapitaPPP": 2294.3,
      "perCapitaPPPChangePct": -2.13,
      "popChangePct": 2.64
    },
    {
      "year": 1998,
      "gdpPPP": 1.535,
      "perCapitaPPP": 2255.8,
      "perCapitaPPPChangePct": -1.68,
      "popChangePct": 2.87
    },
    {
      "year": 1999,
      "gdpPPP": 1.602,
      "perCapitaPPP": 2288.9,
      "perCapitaPPPChangePct": 1.47,
      "popChangePct": 2.94
    },
    {
      "year": 2000,
      "gdpPPP": 1.65,
      "perCapitaPPP": 2299.6,
      "perCapitaPPPChangePct": 0.47,
      "popChangePct": 2.57
    },
    {
      "year": 2001,
      "gdpPPP": 1.718,
      "perCapitaPPP": 2343.1,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdpPPP": 1.801,
      "perCapitaPPP": 2410.6,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 1.91
    },
    {
      "year": 2003,
      "gdpPPP": 1.895,
      "perCapitaPPP": 2494.2,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": 1.74
    },
    {
      "year": 2004,
      "gdpPPP": 2,
      "perCapitaPPP": 2591.6,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 1.58
    },
    {
      "year": 2005,
      "gdpPPP": 2.127,
      "perCapitaPPP": 2715.1,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 1.42
    },
    {
      "year": 2006,
      "gdpPPP": 2.298,
      "perCapitaPPP": 2892.1,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 1.53
    },
    {
      "year": 2007,
      "gdpPPP": 2.479,
      "perCapitaPPP": 3077.2,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 1.26
    },
    {
      "year": 2008,
      "gdpPPP": 2.673,
      "perCapitaPPP": 3274.3,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 1.37
    },
    {
      "year": 2009,
      "gdpPPP": 2.733,
      "perCapitaPPP": 3301.4,
      "perCapitaPPPChangePct": 0.83,
      "popChangePct": 1.47
    },
    {
      "year": 2010,
      "gdpPPP": 2.881,
      "perCapitaPPP": 3428.8,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 1.45
    },
    {
      "year": 2011,
      "gdpPPP": 3.155,
      "perCapitaPPP": 3695.5,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": 1.67
    },
    {
      "year": 2012,
      "gdpPPP": 3.369,
      "perCapitaPPP": 3880.8,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 1.64
    },
    {
      "year": 2013,
      "gdpPPP": 3.598,
      "perCapitaPPP": 4073.1,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 1.73
    },
    {
      "year": 2014,
      "gdpPPP": 3.924,
      "perCapitaPPP": 4366.0,
      "perCapitaPPPChangePct": 7.19,
      "popChangePct": 1.81
    },
    {
      "year": 2015,
      "gdpPPP": 4.25,
      "perCapitaPPP": 4649.5,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 1.67
    },
    {
      "year": 2016,
      "gdpPPP": 4.596,
      "perCapitaPPP": 4946.2,
      "perCapitaPPPChangePct": 6.38,
      "popChangePct": 1.64
    },
    {
      "year": 2017,
      "gdpPPP": 4.933,
      "perCapitaPPP": 5225.3,
      "perCapitaPPPChangePct": 5.64,
      "popChangePct": 1.61
    },
    {
      "year": 2018,
      "gdpPPP": 5.448,
      "perCapitaPPP": 5681.9,
      "perCapitaPPPChangePct": 8.74,
      "popChangePct": 1.59
    },
    {
      "year": 2019,
      "gdpPPP": 5.877,
      "perCapitaPPP": 6036.5,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 1.56
    },
    {
      "year": 2020,
      "gdpPPP": 6.108,
      "perCapitaPPP": 6182.6,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": 1.44
    },
    {
      "year": 2021,
      "gdpPPP": 6.683,
      "perCapitaPPP": 6668.1,
      "perCapitaPPPChangePct": 7.85,
      "popChangePct": 1.42
    },
    {
      "year": 2022,
      "gdpPPP": 7.528,
      "perCapitaPPP": 7408.6,
      "perCapitaPPPChangePct": 11.11,
      "popChangePct": 1.4
    },
    {
      "year": 2023,
      "gdpPPP": 8.338,
      "perCapitaPPP": 8097.3,
      "perCapitaPPPChangePct": 9.3,
      "popChangePct": 1.38
    },
    {
      "year": 2024,
      "gdpPPP": 9.141,
      "perCapitaPPP": 8764.3,
      "perCapitaPPPChangePct": 8.24,
      "popChangePct": 1.26
    },
    {
      "year": 2025,
      "gdpPPP": 9.965,
      "perCapitaPPP": 9435.7,
      "perCapitaPPPChangePct": 7.66,
      "popChangePct": 1.25
    },
    {
      "year": 2026,
      "gdpPPP": 10.865,
      "perCapitaPPP": 10165.7,
      "perCapitaPPPChangePct": 7.74,
      "popChangePct": 1.23
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 11.77,
      "perCapitaPPP": 10885.6,
      "perCapitaPPPChangePct": 7.08,
      "popChangePct": 1.12
    },
    {
      "year": 2028,
      "gdpPPP": 12.621,
      "perCapitaPPP": 11543.2,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 1.11
    },
    {
      "year": 2029,
      "gdpPPP": 13.552,
      "perCapitaPPP": 12257.0,
      "perCapitaPPPChangePct": 6.18,
      "popChangePct": 1.19
    },
    {
      "year": 2030,
      "gdpPPP": 14.56,
      "perCapitaPPP": 13038.4,
      "perCapitaPPPChangePct": 6.37,
      "popChangePct": 0.99
    },
    {
      "year": 2031,
      "gdpPPP": 15.638,
      "perCapitaPPP": 13864.4,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 0.98
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function DjiboutiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
