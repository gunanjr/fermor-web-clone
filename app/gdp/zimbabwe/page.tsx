import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Zimbabwe",
  "slug": "zimbabwe",
  "iso3": "ZWE",
  "region": "Africa",
  "rank2026": 97,
  "flagEmoji": "🇿🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Paraguay",
      "slug": "paraguay",
      "rank": 96
    },
    {
      "name": "Macao",
      "slug": "macao",
      "rank": 98
    }
  ],
  "history": [
    {
      "year": 1990,
      "gdp": 14.988,
      "growth": null,
      "perCapita": 1531.5,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdp": 13.962,
      "growth": null,
      "perCapita": 1383.3,
      "popChangePct": 3.14
    },
    {
      "year": 1992,
      "gdp": 11.515,
      "growth": null,
      "perCapita": 1106.1,
      "popChangePct": 3.14
    },
    {
      "year": 1993,
      "gdp": 11.184,
      "growth": null,
      "perCapita": 1037.9,
      "popChangePct": 3.52
    },
    {
      "year": 1994,
      "gdp": 11.76,
      "growth": null,
      "perCapita": 1055.0,
      "popChangePct": 3.44
    },
    {
      "year": 1995,
      "gdp": 12.209,
      "growth": null,
      "perCapita": 1059.5,
      "popChangePct": 3.37
    },
    {
      "year": 1996,
      "gdp": 14.949,
      "growth": null,
      "perCapita": 1255.7,
      "popChangePct": 3.32
    },
    {
      "year": 1997,
      "gdp": 15.345,
      "growth": null,
      "perCapita": 1302.0,
      "popChangePct": -1.0
    },
    {
      "year": 1998,
      "gdp": 17.876,
      "growth": null,
      "perCapita": 1520.7,
      "popChangePct": -0.25
    },
    {
      "year": 1999,
      "gdp": 17.388,
      "growth": -1.1,
      "perCapita": 1483.2,
      "popChangePct": -0.27
    },
    {
      "year": 2000,
      "gdp": 16.755,
      "growth": -4.2,
      "perCapita": 1432.9,
      "popChangePct": -0.26
    },
    {
      "year": 2001,
      "gdp": 16.613,
      "growth": -0.5,
      "perCapita": 1424.5,
      "popChangePct": -0.26
    },
    {
      "year": 2002,
      "gdp": 15.861,
      "growth": -7.7,
      "perCapita": 1363.6,
      "popChangePct": -0.27
    },
    {
      "year": 2003,
      "gdp": 14.145,
      "growth": -16.2,
      "perCapita": 1215.2,
      "popChangePct": 0.07
    },
    {
      "year": 2004,
      "gdp": 13.985,
      "growth": -6.3,
      "perCapita": 1192.2,
      "popChangePct": 0.77
    },
    {
      "year": 2005,
      "gdp": 13.365,
      "growth": -7.4,
      "perCapita": 1129.8,
      "popChangePct": 0.85
    },
    {
      "year": 2006,
      "gdp": 12.029,
      "growth": -3.6,
      "perCapita": 1001.6,
      "popChangePct": 1.52
    },
    {
      "year": 2007,
      "gdp": 11.502,
      "growth": -3.4,
      "perCapita": 955.3,
      "popChangePct": 0.25
    },
    {
      "year": 2008,
      "gdp": 9.91,
      "growth": -16.3,
      "perCapita": 817.6,
      "popChangePct": 0.66
    },
    {
      "year": 2009,
      "gdp": 14.282,
      "growth": 7.4,
      "perCapita": 1167.8,
      "popChangePct": 0.91
    },
    {
      "year": 2010,
      "gdp": 17.265,
      "growth": 20,
      "perCapita": 1399.1,
      "popChangePct": 0.9
    },
    {
      "year": 2011,
      "gdp": 20.134,
      "growth": 14.2,
      "perCapita": 1616.0,
      "popChangePct": 0.96
    },
    {
      "year": 2012,
      "gdp": 24.173,
      "growth": 16.7,
      "perCapita": 1850.8,
      "popChangePct": 4.83
    },
    {
      "year": 2013,
      "gdp": 26.756,
      "growth": 2.1,
      "perCapita": 1992.3,
      "popChangePct": 2.83
    },
    {
      "year": 2014,
      "gdp": 28.248,
      "growth": 2.4,
      "perCapita": 2050.3,
      "popChangePct": 2.59
    },
    {
      "year": 2015,
      "gdp": 28.123,
      "growth": 1.8,
      "perCapita": 1998.0,
      "popChangePct": 2.16
    },
    {
      "year": 2016,
      "gdp": 29.257,
      "growth": 0.8,
      "perCapita": 2035.7,
      "popChangePct": 2.1
    },
    {
      "year": 2017,
      "gdp": 31.018,
      "growth": 5.2,
      "perCapita": 2114.7,
      "popChangePct": 2.07
    },
    {
      "year": 2018,
      "gdp": 53.914,
      "growth": 5,
      "perCapita": 3602.0,
      "popChangePct": 2.05
    },
    {
      "year": 2019,
      "gdp": 39.776,
      "growth": -6.3,
      "perCapita": 2605.1,
      "popChangePct": 2.0
    },
    {
      "year": 2020,
      "gdp": 39.962,
      "growth": -7.8,
      "perCapita": 2564.7,
      "popChangePct": 2.06
    },
    {
      "year": 2021,
      "gdp": 52.413,
      "growth": 8.5,
      "perCapita": 3295.7,
      "popChangePct": 2.07
    },
    {
      "year": 2022,
      "gdp": 48.57,
      "growth": 6.1,
      "perCapita": 2992.9,
      "popChangePct": 2.04
    },
    {
      "year": 2023,
      "gdp": 44.372,
      "growth": 5.3,
      "perCapita": 2669.2,
      "popChangePct": 2.43
    },
    {
      "year": 2024,
      "gdp": 49.154,
      "growth": 1.7,
      "perCapita": 2892.7,
      "popChangePct": 2.21
    },
    {
      "year": 2025,
      "gdp": 53.474,
      "growth": 7.5,
      "perCapita": 3080.4,
      "popChangePct": 2.17
    },
    {
      "year": 2026,
      "gdp": 56.713,
      "growth": 5,
      "perCapita": 3199.0,
      "popChangePct": 2.12
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 57.406,
      "growth": 4.2,
      "perCapita": 3170.9,
      "popChangePct": 2.12
    },
    {
      "year": 2028,
      "gdp": 59.827,
      "growth": 4.2,
      "perCapita": 3236.0,
      "popChangePct": 2.12
    },
    {
      "year": 2029,
      "gdp": 62.35,
      "growth": 4.2,
      "perCapita": 3302.2,
      "popChangePct": 2.13
    },
    {
      "year": 2030,
      "gdp": 64.994,
      "growth": 4.2,
      "perCapita": 3370.3,
      "popChangePct": 2.13
    },
    {
      "year": 2031,
      "gdp": 67.762,
      "growth": 4.2,
      "perCapita": 3440.0,
      "popChangePct": 2.15
    }
  ],
  "pppHistory": [
    {
      "year": 1998,
      "gdpPPP": 46.539,
      "perCapitaPPP": 3958.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": -0.25
    },
    {
      "year": 1999,
      "gdpPPP": 46.674,
      "perCapitaPPP": 3981.2,
      "perCapitaPPPChangePct": 0.56,
      "popChangePct": -0.27
    },
    {
      "year": 2000,
      "gdpPPP": 45.711,
      "perCapitaPPP": 3909.4,
      "perCapitaPPPChangePct": -1.8,
      "popChangePct": -0.26
    },
    {
      "year": 2001,
      "gdpPPP": 46.529,
      "perCapitaPPP": 3989.5,
      "perCapitaPPPChangePct": 2.05,
      "popChangePct": -0.26
    },
    {
      "year": 2002,
      "gdpPPP": 43.611,
      "perCapitaPPP": 3749.4,
      "perCapitaPPPChangePct": -6.02,
      "popChangePct": -0.27
    },
    {
      "year": 2003,
      "gdpPPP": 37.257,
      "perCapitaPPP": 3200.8,
      "perCapitaPPPChangePct": -14.63,
      "popChangePct": 0.07
    },
    {
      "year": 2004,
      "gdpPPP": 35.86,
      "perCapitaPPP": 3057.1,
      "perCapitaPPPChangePct": -4.49,
      "popChangePct": 0.77
    },
    {
      "year": 2005,
      "gdpPPP": 34.243,
      "perCapitaPPP": 2894.6,
      "perCapitaPPPChangePct": -5.32,
      "popChangePct": 0.85
    },
    {
      "year": 2006,
      "gdpPPP": 34.043,
      "perCapitaPPP": 2834.6,
      "perCapitaPPPChangePct": -2.07,
      "popChangePct": 1.52
    },
    {
      "year": 2007,
      "gdpPPP": 33.777,
      "perCapitaPPP": 2805.4,
      "perCapitaPPPChangePct": -1.03,
      "popChangePct": 0.25
    },
    {
      "year": 2008,
      "gdpPPP": 28.808,
      "perCapitaPPP": 2376.9,
      "perCapitaPPPChangePct": -15.27,
      "popChangePct": 0.66
    },
    {
      "year": 2009,
      "gdpPPP": 31.129,
      "perCapitaPPP": 2545.3,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": 0.91
    },
    {
      "year": 2010,
      "gdpPPP": 37.796,
      "perCapitaPPP": 3062.8,
      "perCapitaPPPChangePct": 20.33,
      "popChangePct": 0.9
    },
    {
      "year": 2011,
      "gdpPPP": 44.051,
      "perCapitaPPP": 3535.6,
      "perCapitaPPPChangePct": 15.43,
      "popChangePct": 0.96
    },
    {
      "year": 2012,
      "gdpPPP": 52.343,
      "perCapitaPPP": 4007.5,
      "perCapitaPPPChangePct": 13.35,
      "popChangePct": 4.83
    },
    {
      "year": 2013,
      "gdpPPP": 54.335,
      "perCapitaPPP": 4045.9,
      "perCapitaPPPChangePct": 0.96,
      "popChangePct": 2.83
    },
    {
      "year": 2014,
      "gdpPPP": 56.609,
      "perCapitaPPP": 4108.7,
      "perCapitaPPPChangePct": 1.55,
      "popChangePct": 2.59
    },
    {
      "year": 2015,
      "gdpPPP": 58.188,
      "perCapitaPPP": 4134.1,
      "perCapitaPPPChangePct": 0.62,
      "popChangePct": 2.16
    },
    {
      "year": 2016,
      "gdpPPP": 59.184,
      "perCapitaPPP": 4118.2,
      "perCapitaPPPChangePct": -0.38,
      "popChangePct": 2.1
    },
    {
      "year": 2017,
      "gdpPPP": 63.379,
      "perCapitaPPP": 4320.8,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 2.07
    },
    {
      "year": 2018,
      "gdpPPP": 62.043,
      "perCapitaPPP": 4145.2,
      "perCapitaPPPChangePct": -4.07,
      "popChangePct": 2.05
    },
    {
      "year": 2019,
      "gdpPPP": 75.853,
      "perCapitaPPP": 4968.0,
      "perCapitaPPPChangePct": 19.85,
      "popChangePct": 2.0
    },
    {
      "year": 2020,
      "gdpPPP": 81.074,
      "perCapitaPPP": 5203.2,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 2.06
    },
    {
      "year": 2021,
      "gdpPPP": 96.802,
      "perCapitaPPP": 6086.8,
      "perCapitaPPPChangePct": 16.98,
      "popChangePct": 2.07
    },
    {
      "year": 2022,
      "gdpPPP": 110.052,
      "perCapitaPPP": 6781.3,
      "perCapitaPPPChangePct": 11.41,
      "popChangePct": 2.04
    },
    {
      "year": 2023,
      "gdpPPP": 120.215,
      "perCapitaPPP": 7231.5,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": 2.43
    },
    {
      "year": 2024,
      "gdpPPP": 125.346,
      "perCapitaPPP": 7376.6,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 2.21
    },
    {
      "year": 2025,
      "gdpPPP": 138.621,
      "perCapitaPPP": 7985.2,
      "perCapitaPPPChangePct": 8.25,
      "popChangePct": 2.17
    },
    {
      "year": 2026,
      "gdpPPP": 149.683,
      "perCapitaPPP": 8443.2,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": 2.12
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 159.373,
      "perCapitaPPP": 8803.2,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 2.12
    },
    {
      "year": 2028,
      "gdpPPP": 168.788,
      "perCapitaPPP": 9129.5,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 2.12
    },
    {
      "year": 2029,
      "gdpPPP": 179.025,
      "perCapitaPPP": 9481.6,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 2.13
    },
    {
      "year": 2030,
      "gdpPPP": 190.024,
      "perCapitaPPP": 9853.8,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 2.13
    },
    {
      "year": 2031,
      "gdpPPP": 201.668,
      "perCapitaPPP": 10238.0,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 2.15
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ZimbabweGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
