import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Mauritania",
  "slug": "mauritania",
  "iso3": "MRT",
  "region": "Africa",
  "rank2026": 150,
  "flagEmoji": "🇲🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Brunei",
      "slug": "brunei",
      "rank": 148
    },
    {
      "name": "Somalia",
      "slug": "somalia",
      "rank": 151
    }
  ],
  "history": [
    {
      "year": 1990,
      "gdp": 1.793,
      "growth": null,
      "perCapita": 898.7,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 2.055,
      "growth": 0,
      "perCapita": 1002.0,
      "popChangePct": 2.71
    },
    {
      "year": 1992,
      "gdp": 2.164,
      "growth": 1.8,
      "perCapita": 1026.9,
      "popChangePct": 2.83
    },
    {
      "year": 1993,
      "gdp": 1.847,
      "growth": 5.9,
      "perCapita": 852.5,
      "popChangePct": 2.8
    },
    {
      "year": 1994,
      "gdp": 1.945,
      "growth": -3.1,
      "perCapita": 872.7,
      "popChangePct": 2.81
    },
    {
      "year": 1995,
      "gdp": 2.092,
      "growth": 9.8,
      "perCapita": 912.6,
      "popChangePct": 2.87
    },
    {
      "year": 1996,
      "gdp": 2.132,
      "growth": 5.8,
      "perCapita": 904.3,
      "popChangePct": 2.88
    },
    {
      "year": 1997,
      "gdp": 2.072,
      "growth": -4,
      "perCapita": 854.3,
      "popChangePct": 2.84
    },
    {
      "year": 1998,
      "gdp": 2.027,
      "growth": 2.8,
      "perCapita": 812.2,
      "popChangePct": 2.89
    },
    {
      "year": 1999,
      "gdp": 1.986,
      "growth": 3.7,
      "perCapita": 773.4,
      "popChangePct": 2.93
    },
    {
      "year": 2000,
      "gdp": 1.78,
      "growth": -3.9,
      "perCapita": 673.4,
      "popChangePct": 2.92
    },
    {
      "year": 2001,
      "gdp": 1.746,
      "growth": -0.8,
      "perCapita": 641.8,
      "popChangePct": 2.91
    },
    {
      "year": 2002,
      "gdp": 1.777,
      "growth": 1.4,
      "perCapita": 634.6,
      "popChangePct": 2.94
    },
    {
      "year": 2003,
      "gdp": 2.051,
      "growth": 6.9,
      "perCapita": 711.7,
      "popChangePct": 2.93
    },
    {
      "year": 2004,
      "gdp": 2.362,
      "growth": 4.7,
      "perCapita": 796.9,
      "popChangePct": 2.88
    },
    {
      "year": 2005,
      "gdp": 2.936,
      "growth": 8.6,
      "perCapita": 963.5,
      "popChangePct": 2.77
    },
    {
      "year": 2006,
      "gdp": 4.009,
      "growth": 18.3,
      "perCapita": 1357.4,
      "popChangePct": -3.09
    },
    {
      "year": 2007,
      "gdp": 4.328,
      "growth": -2,
      "perCapita": 1425.5,
      "popChangePct": 2.81
    },
    {
      "year": 2008,
      "gdp": 5.138,
      "growth": -0.3,
      "perCapita": 1647.3,
      "popChangePct": 2.73
    },
    {
      "year": 2009,
      "gdp": 4.725,
      "growth": 0.1,
      "perCapita": 1475.6,
      "popChangePct": 2.66
    },
    {
      "year": 2010,
      "gdp": 5.637,
      "growth": 2.6,
      "perCapita": 1715.9,
      "popChangePct": 2.59
    },
    {
      "year": 2011,
      "gdp": 6.782,
      "growth": 4.2,
      "perCapita": 2012.8,
      "popChangePct": 2.56
    },
    {
      "year": 2012,
      "gdp": 6.721,
      "growth": 4.5,
      "perCapita": 1946.1,
      "popChangePct": 2.52
    },
    {
      "year": 2013,
      "gdp": 7.331,
      "growth": 4.2,
      "perCapita": 2072.5,
      "popChangePct": 2.4
    },
    {
      "year": 2014,
      "gdp": 6.615,
      "growth": 4.3,
      "perCapita": 1826.8,
      "popChangePct": 2.37
    },
    {
      "year": 2015,
      "gdp": 6.182,
      "growth": 5.4,
      "perCapita": 1668.1,
      "popChangePct": 2.35
    },
    {
      "year": 2016,
      "gdp": 6.414,
      "growth": 1.3,
      "perCapita": 1690.8,
      "popChangePct": 2.37
    },
    {
      "year": 2017,
      "gdp": 6.826,
      "growth": 6.3,
      "perCapita": 1758.5,
      "popChangePct": 2.29
    },
    {
      "year": 2018,
      "gdp": 7.472,
      "growth": 4.8,
      "perCapita": 1882.2,
      "popChangePct": 2.29
    },
    {
      "year": 2019,
      "gdp": 7.894,
      "growth": 3.1,
      "perCapita": 1945.0,
      "popChangePct": 2.22
    },
    {
      "year": 2020,
      "gdp": 8.464,
      "growth": -0.4,
      "perCapita": 2040.7,
      "popChangePct": 2.19
    },
    {
      "year": 2021,
      "gdp": 9.126,
      "growth": 0.7,
      "perCapita": 2152.3,
      "popChangePct": 2.24
    },
    {
      "year": 2022,
      "gdp": 9.564,
      "growth": 6.8,
      "perCapita": 2206.8,
      "popChangePct": 2.22
    },
    {
      "year": 2023,
      "gdp": 10.724,
      "growth": 6.8,
      "perCapita": 2420.6,
      "popChangePct": 2.22
    },
    {
      "year": 2024,
      "gdp": 11.003,
      "growth": 6.3,
      "perCapita": 2429.7,
      "popChangePct": 2.23
    },
    {
      "year": 2025,
      "gdp": 12.289,
      "growth": 4.2,
      "perCapita": 2654.7,
      "popChangePct": 2.21
    },
    {
      "year": 2026,
      "gdp": 14.352,
      "growth": 4.4,
      "perCapita": 3033.2,
      "popChangePct": 2.23
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 15.095,
      "growth": 4.5,
      "perCapita": 3120.8,
      "popChangePct": 2.22
    },
    {
      "year": 2028,
      "gdp": 15.966,
      "growth": 5.7,
      "perCapita": 3229.3,
      "popChangePct": 2.21
    },
    {
      "year": 2029,
      "gdp": 16.882,
      "growth": 4.9,
      "perCapita": 3340.4,
      "popChangePct": 2.22
    },
    {
      "year": 2030,
      "gdp": 17.378,
      "growth": 3,
      "perCapita": 3363.9,
      "popChangePct": 2.22
    },
    {
      "year": 2031,
      "gdp": 17.042,
      "growth": 3,
      "perCapita": 3227.3,
      "popChangePct": 2.23
    }
  ],
  "pppHistory": [
    {
      "year": 1990,
      "gdpPPP": 5.759,
      "perCapitaPPP": 2886.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 5.954,
      "perCapitaPPP": 2903.9,
      "perCapitaPPPChangePct": 0.61,
      "popChangePct": 2.71
    },
    {
      "year": 1992,
      "gdpPPP": 6.198,
      "perCapitaPPP": 2940.7,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 2.83
    },
    {
      "year": 1993,
      "gdpPPP": 6.717,
      "perCapitaPPP": 3099.9,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 2.8
    },
    {
      "year": 1994,
      "gdpPPP": 6.651,
      "perCapitaPPP": 2984.5,
      "perCapitaPPPChangePct": -3.72,
      "popChangePct": 2.81
    },
    {
      "year": 1995,
      "gdpPPP": 7.457,
      "perCapitaPPP": 3253.4,
      "perCapitaPPPChangePct": 9.01,
      "popChangePct": 2.87
    },
    {
      "year": 1996,
      "gdpPPP": 8.035,
      "perCapitaPPP": 3408.2,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 2.88
    },
    {
      "year": 1997,
      "gdpPPP": 7.843,
      "perCapitaPPP": 3233.9,
      "perCapitaPPPChangePct": -5.11,
      "popChangePct": 2.84
    },
    {
      "year": 1998,
      "gdpPPP": 8.152,
      "perCapitaPPP": 3266.9,
      "perCapitaPPPChangePct": 1.02,
      "popChangePct": 2.89
    },
    {
      "year": 1999,
      "gdpPPP": 8.571,
      "perCapitaPPP": 3337.9,
      "perCapitaPPPChangePct": 2.17,
      "popChangePct": 2.93
    },
    {
      "year": 2000,
      "gdpPPP": 8.422,
      "perCapitaPPP": 3186.7,
      "perCapitaPPPChangePct": -4.53,
      "popChangePct": 2.92
    },
    {
      "year": 2001,
      "gdpPPP": 8.542,
      "perCapitaPPP": 3140.2,
      "perCapitaPPPChangePct": -1.46,
      "popChangePct": 2.91
    },
    {
      "year": 2002,
      "gdpPPP": 8.795,
      "perCapitaPPP": 3140.7,
      "perCapitaPPPChangePct": 0.02,
      "popChangePct": 2.94
    },
    {
      "year": 2003,
      "gdpPPP": 9.59,
      "perCapitaPPP": 3327.6,
      "perCapitaPPPChangePct": 5.95,
      "popChangePct": 2.93
    },
    {
      "year": 2004,
      "gdpPPP": 10.314,
      "perCapitaPPP": 3479.1,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 2.88
    },
    {
      "year": 2005,
      "gdpPPP": 11.549,
      "perCapitaPPP": 3789.9,
      "perCapitaPPPChangePct": 8.93,
      "popChangePct": 2.77
    },
    {
      "year": 2006,
      "gdpPPP": 14.087,
      "perCapitaPPP": 4770.4,
      "perCapitaPPPChangePct": 25.87,
      "popChangePct": -3.09
    },
    {
      "year": 2007,
      "gdpPPP": 14.184,
      "perCapitaPPP": 4671.6,
      "perCapitaPPPChangePct": -2.07,
      "popChangePct": 2.81
    },
    {
      "year": 2008,
      "gdpPPP": 14.409,
      "perCapitaPPP": 4619.4,
      "perCapitaPPPChangePct": -1.12,
      "popChangePct": 2.73
    },
    {
      "year": 2009,
      "gdpPPP": 14.512,
      "perCapitaPPP": 4532.0,
      "perCapitaPPPChangePct": -1.89,
      "popChangePct": 2.66
    },
    {
      "year": 2010,
      "gdpPPP": 15.074,
      "perCapitaPPP": 4588.9,
      "perCapitaPPPChangePct": 1.26,
      "popChangePct": 2.59
    },
    {
      "year": 2011,
      "gdpPPP": 16.027,
      "perCapitaPPP": 4756.5,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 2.56
    },
    {
      "year": 2012,
      "gdpPPP": 17.055,
      "perCapitaPPP": 4938.4,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 2.52
    },
    {
      "year": 2013,
      "gdpPPP": 18.065,
      "perCapitaPPP": 5106.9,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 2.4
    },
    {
      "year": 2014,
      "gdpPPP": 19.165,
      "perCapitaPPP": 5292.3,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": 2.37
    },
    {
      "year": 2015,
      "gdpPPP": 20.383,
      "perCapitaPPP": 5500.2,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 2.35
    },
    {
      "year": 2016,
      "gdpPPP": 20.836,
      "perCapitaPPP": 5492.6,
      "perCapitaPPPChangePct": -0.14,
      "popChangePct": 2.37
    },
    {
      "year": 2017,
      "gdpPPP": 22.54,
      "perCapitaPPP": 5806.9,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 2.29
    },
    {
      "year": 2018,
      "gdpPPP": 23.55,
      "perCapitaPPP": 5932.3,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 2.29
    },
    {
      "year": 2019,
      "gdpPPP": 25.064,
      "perCapitaPPP": 6175.8,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 2.22
    },
    {
      "year": 2020,
      "gdpPPP": 26.408,
      "perCapitaPPP": 6367.4,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 2.19
    },
    {
      "year": 2021,
      "gdpPPP": 27.635,
      "perCapitaPPP": 6517.7,
      "perCapitaPPPChangePct": 2.36,
      "popChangePct": 2.24
    },
    {
      "year": 2022,
      "gdpPPP": 31.613,
      "perCapitaPPP": 7293.9,
      "perCapitaPPPChangePct": 11.91,
      "popChangePct": 2.22
    },
    {
      "year": 2023,
      "gdpPPP": 35.015,
      "perCapitaPPP": 7903.8,
      "perCapitaPPPChangePct": 8.36,
      "popChangePct": 2.22
    },
    {
      "year": 2024,
      "gdpPPP": 38.147,
      "perCapitaPPP": 8423.7,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 2.23
    },
    {
      "year": 2025,
      "gdpPPP": 40.883,
      "perCapitaPPP": 8831.8,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 2.21
    },
    {
      "year": 2026,
      "gdpPPP": 43.912,
      "perCapitaPPP": 9280.3,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 2.23
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 46.883,
      "perCapitaPPP": 9693.0,
      "perCapitaPPPChangePct": 4.45,
      "popChangePct": 2.22
    },
    {
      "year": 2028,
      "gdpPPP": 50.356,
      "perCapitaPPP": 10185.0,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 2.21
    },
    {
      "year": 2029,
      "gdpPPP": 53.777,
      "perCapitaPPP": 10640.8,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 2.22
    },
    {
      "year": 2030,
      "gdpPPP": 56.41,
      "perCapitaPPP": 10919.5,
      "perCapitaPPPChangePct": 2.62,
      "popChangePct": 2.22
    },
    {
      "year": 2031,
      "gdpPPP": 59.138,
      "perCapitaPPP": 11199.0,
      "perCapitaPPPChangePct": 2.56,
      "popChangePct": 2.23
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MauritaniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
