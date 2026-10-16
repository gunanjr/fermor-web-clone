import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Senegal",
  "slug": "senegal",
  "iso3": "SEN",
  "region": "Africa",
  "rank2026": 111,
  "flagEmoji": "🇸🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Zambia",
      "slug": "zambia",
      "rank": 110
    },
    {
      "name": "El Salvador",
      "slug": "el-salvador",
      "rank": 112
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.338,
      "growth": -0.8,
      "perCapita": 768.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.934,
      "growth": 5.1,
      "perCapita": 677.9,
      "popChangePct": 2.74
    },
    {
      "year": 1982,
      "gdp": 3.85,
      "growth": 7.8,
      "perCapita": 645.4,
      "popChangePct": 2.81
    },
    {
      "year": 1983,
      "gdp": 3.435,
      "growth": -5.3,
      "perCapita": 559.5,
      "popChangePct": 2.92
    },
    {
      "year": 1984,
      "gdp": 3.35,
      "growth": 3.7,
      "perCapita": 529.9,
      "popChangePct": 2.96
    },
    {
      "year": 1985,
      "gdp": 3.668,
      "growth": 3.3,
      "perCapita": 563.3,
      "popChangePct": 3.01
    },
    {
      "year": 1986,
      "gdp": 5.188,
      "growth": 3.1,
      "perCapita": 773.1,
      "popChangePct": 3.06
    },
    {
      "year": 1987,
      "gdp": 6.241,
      "growth": 6.1,
      "perCapita": 902.2,
      "popChangePct": 3.08
    },
    {
      "year": 1988,
      "gdp": 6.173,
      "growth": -0.6,
      "perCapita": 865.7,
      "popChangePct": 3.06
    },
    {
      "year": 1989,
      "gdp": 6.083,
      "growth": 4,
      "perCapita": 828.1,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdp": 7.078,
      "growth": -0.7,
      "perCapita": 936.1,
      "popChangePct": 2.93
    },
    {
      "year": 1991,
      "gdp": 6.955,
      "growth": 2.6,
      "perCapita": 894.5,
      "popChangePct": 2.84
    },
    {
      "year": 1992,
      "gdp": 7.435,
      "growth": 1.2,
      "perCapita": 930.6,
      "popChangePct": 2.75
    },
    {
      "year": 1993,
      "gdp": 7.014,
      "growth": 1.3,
      "perCapita": 852.6,
      "popChangePct": 2.97
    },
    {
      "year": 1994,
      "gdp": 4.746,
      "growth": -0.2,
      "perCapita": 561.0,
      "popChangePct": 2.84
    },
    {
      "year": 1995,
      "gdp": 6.026,
      "growth": 6.1,
      "perCapita": 693.4,
      "popChangePct": 2.71
    },
    {
      "year": 1996,
      "gdp": 6.3,
      "growth": 1.9,
      "perCapita": 706.9,
      "popChangePct": 2.57
    },
    {
      "year": 1997,
      "gdp": 5.867,
      "growth": 2.7,
      "perCapita": 642.6,
      "popChangePct": 2.45
    },
    {
      "year": 1998,
      "gdp": 6.416,
      "growth": 6,
      "perCapita": 686.4,
      "popChangePct": 2.38
    },
    {
      "year": 1999,
      "gdp": 6.599,
      "growth": 6,
      "perCapita": 689.7,
      "popChangePct": 2.36
    },
    {
      "year": 2000,
      "gdp": 6.016,
      "growth": 3.9,
      "perCapita": 614.0,
      "popChangePct": 2.39
    },
    {
      "year": 2001,
      "gdp": 6.508,
      "growth": 4.3,
      "perCapita": 648.4,
      "popChangePct": 2.43
    },
    {
      "year": 2002,
      "gdp": 7.001,
      "growth": 0.1,
      "perCapita": 680.8,
      "popChangePct": 2.47
    },
    {
      "year": 2003,
      "gdp": 8.767,
      "growth": 5.6,
      "perCapita": 831.6,
      "popChangePct": 2.5
    },
    {
      "year": 2004,
      "gdp": 10.072,
      "growth": 4.6,
      "perCapita": 931.7,
      "popChangePct": 2.55
    },
    {
      "year": 2005,
      "gdp": 11.015,
      "growth": 4.3,
      "perCapita": 993.2,
      "popChangePct": 2.59
    },
    {
      "year": 2006,
      "gdp": 11.699,
      "growth": 2.3,
      "perCapita": 1027.8,
      "popChangePct": 2.63
    },
    {
      "year": 2007,
      "gdp": 13.996,
      "growth": 2.8,
      "perCapita": 1197.6,
      "popChangePct": 2.68
    },
    {
      "year": 2008,
      "gdp": 16.852,
      "growth": 3.7,
      "perCapita": 1403.8,
      "popChangePct": 2.72
    },
    {
      "year": 2009,
      "gdp": 16.128,
      "growth": 2.8,
      "perCapita": 1307.5,
      "popChangePct": 2.75
    },
    {
      "year": 2010,
      "gdp": 16.134,
      "growth": 3.4,
      "perCapita": 1272.6,
      "popChangePct": 2.78
    },
    {
      "year": 2011,
      "gdp": 17.811,
      "growth": 1.3,
      "perCapita": 1366.5,
      "popChangePct": 2.81
    },
    {
      "year": 2012,
      "gdp": 17.672,
      "growth": 4,
      "perCapita": 1318.6,
      "popChangePct": 2.82
    },
    {
      "year": 2013,
      "gdp": 18.919,
      "growth": 2.4,
      "perCapita": 1372.7,
      "popChangePct": 2.84
    },
    {
      "year": 2014,
      "gdp": 19.802,
      "growth": 6.2,
      "perCapita": 1397.0,
      "popChangePct": 2.85
    },
    {
      "year": 2015,
      "gdp": 17.777,
      "growth": 6.4,
      "perCapita": 1219.4,
      "popChangePct": 2.84
    },
    {
      "year": 2016,
      "gdp": 19.035,
      "growth": 6.4,
      "perCapita": 1269.6,
      "popChangePct": 2.85
    },
    {
      "year": 2017,
      "gdp": 20.989,
      "growth": 7.4,
      "perCapita": 1361.2,
      "popChangePct": 2.83
    },
    {
      "year": 2018,
      "gdp": 23.127,
      "growth": 6.2,
      "perCapita": 1458.7,
      "popChangePct": 2.82
    },
    {
      "year": 2019,
      "gdp": 23.405,
      "growth": 4.6,
      "perCapita": 1436.2,
      "popChangePct": 2.79
    },
    {
      "year": 2020,
      "gdp": 24.566,
      "growth": 1.3,
      "perCapita": 1467.2,
      "popChangePct": 2.75
    },
    {
      "year": 2021,
      "gdp": 27.535,
      "growth": 6.5,
      "perCapita": 1600.5,
      "popChangePct": 2.75
    },
    {
      "year": 2022,
      "gdp": 27.843,
      "growth": 3.9,
      "perCapita": 1575.2,
      "popChangePct": 2.74
    },
    {
      "year": 2023,
      "gdp": 30.701,
      "growth": 4.3,
      "perCapita": 1690.4,
      "popChangePct": 2.75
    },
    {
      "year": 2024,
      "gdp": 32.829,
      "growth": 6.1,
      "perCapita": 1759.3,
      "popChangePct": 2.75
    },
    {
      "year": 2025,
      "gdp": 37.116,
      "growth": 7.9,
      "perCapita": 1935.9,
      "popChangePct": 2.74
    },
    {
      "year": 2026,
      "gdp": 40.469,
      "growth": 2.2,
      "perCapita": 2054.3,
      "popChangePct": 2.75
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 42.165,
      "growth": 2.3,
      "perCapita": 2083.2,
      "popChangePct": 2.75
    },
    {
      "year": 2028,
      "gdp": 44.186,
      "growth": 3,
      "perCapita": 2124.7,
      "popChangePct": 2.75
    },
    {
      "year": 2029,
      "gdp": 46.352,
      "growth": 2.9,
      "perCapita": 2169.3,
      "popChangePct": 2.75
    },
    {
      "year": 2030,
      "gdp": 49.312,
      "growth": 4.3,
      "perCapita": 2246.1,
      "popChangePct": 2.75
    },
    {
      "year": 2031,
      "gdp": 52.61,
      "growth": 4.6,
      "perCapita": 2332.3,
      "popChangePct": 2.75
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 5.779,
      "perCapitaPPP": 1023.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 6.647,
      "perCapitaPPP": 1145.5,
      "perCapitaPPPChangePct": 11.95,
      "popChangePct": 2.74
    },
    {
      "year": 1982,
      "gdpPPP": 7.611,
      "perCapitaPPP": 1275.6,
      "perCapitaPPPChangePct": 11.36,
      "popChangePct": 2.81
    },
    {
      "year": 1983,
      "gdpPPP": 7.488,
      "perCapitaPPP": 1219.6,
      "perCapitaPPPChangePct": -4.39,
      "popChangePct": 2.92
    },
    {
      "year": 1984,
      "gdpPPP": 8.049,
      "perCapitaPPP": 1273.2,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.96
    },
    {
      "year": 1985,
      "gdpPPP": 8.576,
      "perCapitaPPP": 1316.9,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 3.01
    },
    {
      "year": 1986,
      "gdpPPP": 9.021,
      "perCapitaPPP": 1344.2,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 3.06
    },
    {
      "year": 1987,
      "gdpPPP": 9.808,
      "perCapitaPPP": 1417.8,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 3.08
    },
    {
      "year": 1988,
      "gdpPPP": 10.093,
      "perCapitaPPP": 1415.5,
      "perCapitaPPPChangePct": -0.16,
      "popChangePct": 3.06
    },
    {
      "year": 1989,
      "gdpPPP": 10.906,
      "perCapitaPPP": 1484.7,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdpPPP": 11.238,
      "perCapitaPPP": 1486.3,
      "perCapitaPPPChangePct": 0.11,
      "popChangePct": 2.93
    },
    {
      "year": 1991,
      "gdpPPP": 11.915,
      "perCapitaPPP": 1532.3,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 2.84
    },
    {
      "year": 1992,
      "gdpPPP": 12.338,
      "perCapitaPPP": 1544.2,
      "perCapitaPPPChangePct": 0.77,
      "popChangePct": 2.75
    },
    {
      "year": 1993,
      "gdpPPP": 12.796,
      "perCapitaPPP": 1555.4,
      "perCapitaPPPChangePct": 0.73,
      "popChangePct": 2.97
    },
    {
      "year": 1994,
      "gdpPPP": 13.04,
      "perCapitaPPP": 1541.1,
      "perCapitaPPPChangePct": -0.92,
      "popChangePct": 2.84
    },
    {
      "year": 1995,
      "gdpPPP": 14.124,
      "perCapitaPPP": 1625.3,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 2.71
    },
    {
      "year": 1996,
      "gdpPPP": 14.652,
      "perCapitaPPP": 1643.9,
      "perCapitaPPPChangePct": 1.15,
      "popChangePct": 2.57
    },
    {
      "year": 1997,
      "gdpPPP": 15.31,
      "perCapitaPPP": 1676.7,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 2.45
    },
    {
      "year": 1998,
      "gdpPPP": 16.406,
      "perCapitaPPP": 1755.1,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 2.38
    },
    {
      "year": 1999,
      "gdpPPP": 17.633,
      "perCapitaPPP": 1842.8,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 2.36
    },
    {
      "year": 2000,
      "gdpPPP": 18.734,
      "perCapitaPPP": 1912.0,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": 2.39
    },
    {
      "year": 2001,
      "gdpPPP": 19.981,
      "perCapitaPPP": 1990.9,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 2.43
    },
    {
      "year": 2002,
      "gdpPPP": 20.306,
      "perCapitaPPP": 1974.5,
      "perCapitaPPPChangePct": -0.82,
      "popChangePct": 2.47
    },
    {
      "year": 2003,
      "gdpPPP": 21.865,
      "perCapitaPPP": 2074.2,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 2.5
    },
    {
      "year": 2004,
      "gdpPPP": 23.495,
      "perCapitaPPP": 2173.5,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 2.55
    },
    {
      "year": 2005,
      "gdpPPP": 25.277,
      "perCapitaPPP": 2279.2,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 2.59
    },
    {
      "year": 2006,
      "gdpPPP": 26.663,
      "perCapitaPPP": 2342.5,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 2.63
    },
    {
      "year": 2007,
      "gdpPPP": 28.16,
      "perCapitaPPP": 2409.5,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 2.68
    },
    {
      "year": 2008,
      "gdpPPP": 29.765,
      "perCapitaPPP": 2479.5,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 2.72
    },
    {
      "year": 2009,
      "gdpPPP": 30.773,
      "perCapitaPPP": 2494.8,
      "perCapitaPPPChangePct": 0.62,
      "popChangePct": 2.75
    },
    {
      "year": 2010,
      "gdpPPP": 32.203,
      "perCapitaPPP": 2540.1,
      "perCapitaPPPChangePct": 1.82,
      "popChangePct": 2.78
    },
    {
      "year": 2011,
      "gdpPPP": 33.306,
      "perCapitaPPP": 2555.4,
      "perCapitaPPPChangePct": 0.6,
      "popChangePct": 2.81
    },
    {
      "year": 2012,
      "gdpPPP": 35.284,
      "perCapitaPPP": 2632.8,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 2.82
    },
    {
      "year": 2013,
      "gdpPPP": 36.751,
      "perCapitaPPP": 2666.5,
      "perCapitaPPPChangePct": 1.28,
      "popChangePct": 2.84
    },
    {
      "year": 2014,
      "gdpPPP": 39.718,
      "perCapitaPPP": 2802.0,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 2.85
    },
    {
      "year": 2015,
      "gdpPPP": 42.639,
      "perCapitaPPP": 2924.8,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 2.84
    },
    {
      "year": 2016,
      "gdpPPP": 45.78,
      "perCapitaPPP": 3053.3,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.85
    },
    {
      "year": 2017,
      "gdpPPP": 50.052,
      "perCapitaPPP": 3246.0,
      "perCapitaPPPChangePct": 6.31,
      "popChangePct": 2.83
    },
    {
      "year": 2018,
      "gdpPPP": 53.794,
      "perCapitaPPP": 3393.0,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 2.82
    },
    {
      "year": 2019,
      "gdpPPP": 59.655,
      "perCapitaPPP": 3660.6,
      "perCapitaPPPChangePct": 7.89,
      "popChangePct": 2.79
    },
    {
      "year": 2020,
      "gdpPPP": 63.009,
      "perCapitaPPP": 3763.1,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 2.75
    },
    {
      "year": 2021,
      "gdpPPP": 71.874,
      "perCapitaPPP": 4177.8,
      "perCapitaPPPChangePct": 11.02,
      "popChangePct": 2.75
    },
    {
      "year": 2022,
      "gdpPPP": 79.951,
      "perCapitaPPP": 4523.0,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": 2.74
    },
    {
      "year": 2023,
      "gdpPPP": 86.439,
      "perCapitaPPP": 4759.4,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 2.75
    },
    {
      "year": 2024,
      "gdpPPP": 94.026,
      "perCapitaPPP": 5038.8,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 2.75
    },
    {
      "year": 2025,
      "gdpPPP": 104.313,
      "perCapitaPPP": 5440.6,
      "perCapitaPPPChangePct": 7.98,
      "popChangePct": 2.74
    },
    {
      "year": 2026,
      "gdpPPP": 109.634,
      "perCapitaPPP": 5565.3,
      "perCapitaPPPChangePct": 2.29,
      "popChangePct": 2.75
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 114.6,
      "perCapitaPPP": 5661.9,
      "perCapitaPPPChangePct": 1.74,
      "popChangePct": 2.75
    },
    {
      "year": 2028,
      "gdpPPP": 119.993,
      "perCapitaPPP": 5769.9,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 2.75
    },
    {
      "year": 2029,
      "gdpPPP": 125.67,
      "perCapitaPPP": 5881.3,
      "perCapitaPPPChangePct": 1.93,
      "popChangePct": 2.75
    },
    {
      "year": 2030,
      "gdpPPP": 133.442,
      "perCapitaPPP": 6078.1,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 2.75
    },
    {
      "year": 2031,
      "gdpPPP": 142.085,
      "perCapitaPPP": 6298.8,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": 2.75
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SenegalGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
