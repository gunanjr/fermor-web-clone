import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Cabo Verde",
  "slug": "cabo-verde",
  "iso3": "CPV",
  "region": "Africa",
  "rank2026": 182,
  "flagEmoji": "🇨🇻",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Belize",
      "slug": "belize",
      "rank": 181
    },
    {
      "name": "Guinea-Bissau",
      "slug": "guinea-bissau",
      "rank": 185
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.157,
      "growth": 5.3,
      "perCapita": 569.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.187,
      "growth": 8.5,
      "perCapita": 668.8,
      "popChangePct": 1.45
    },
    {
      "year": 1982,
      "gdp": 0.149,
      "growth": 2.8,
      "perCapita": 522.0,
      "popChangePct": 2.15
    },
    {
      "year": 1983,
      "gdp": 0.144,
      "growth": 9.5,
      "perCapita": 494.4,
      "popChangePct": 1.75
    },
    {
      "year": 1984,
      "gdp": 0.146,
      "growth": 3.8,
      "perCapita": 493.6,
      "popChangePct": 2.41
    },
    {
      "year": 1985,
      "gdp": 0.164,
      "growth": 8.6,
      "perCapita": 542.2,
      "popChangePct": 2.02
    },
    {
      "year": 1986,
      "gdp": 0.212,
      "growth": 2.9,
      "perCapita": 685.4,
      "popChangePct": 1.98
    },
    {
      "year": 1987,
      "gdp": 0.264,
      "growth": 4.3,
      "perCapita": 836.4,
      "popChangePct": 2.27
    },
    {
      "year": 1988,
      "gdp": 0.322,
      "growth": 6,
      "perCapita": 997.3,
      "popChangePct": 1.9
    },
    {
      "year": 1989,
      "gdp": 0.332,
      "growth": 5.7,
      "perCapita": 1006.7,
      "popChangePct": 2.17
    },
    {
      "year": 1990,
      "gdp": 0.413,
      "growth": 0.7,
      "perCapita": 1224.5,
      "popChangePct": 2.43
    },
    {
      "year": 1991,
      "gdp": 0.443,
      "growth": 1.4,
      "perCapita": 1284.6,
      "popChangePct": 2.37
    },
    {
      "year": 1992,
      "gdp": 0.479,
      "growth": 3,
      "perCapita": 1356.3,
      "popChangePct": 2.32
    },
    {
      "year": 1993,
      "gdp": 0.431,
      "growth": 7.3,
      "perCapita": 1190.1,
      "popChangePct": 2.55
    },
    {
      "year": 1994,
      "gdp": 0.45,
      "growth": 6.9,
      "perCapita": 1247.0,
      "popChangePct": -0.28
    },
    {
      "year": 1995,
      "gdp": 0.57,
      "growth": 7.5,
      "perCapita": 1540.8,
      "popChangePct": 2.49
    },
    {
      "year": 1996,
      "gdp": 0.611,
      "growth": 6.7,
      "perCapita": 1611.2,
      "popChangePct": 2.43
    },
    {
      "year": 1997,
      "gdp": 0.609,
      "growth": 7.6,
      "perCapita": 1568.8,
      "popChangePct": 2.37
    },
    {
      "year": 1998,
      "gdp": 0.648,
      "growth": 8.4,
      "perCapita": 1631.8,
      "popChangePct": 2.32
    },
    {
      "year": 1999,
      "gdp": 0.693,
      "growth": 11.9,
      "perCapita": 1709.2,
      "popChangePct": 2.02
    },
    {
      "year": 2000,
      "gdp": 0.699,
      "growth": 7.3,
      "perCapita": 1689.5,
      "popChangePct": 2.22
    },
    {
      "year": 2001,
      "gdp": 0.791,
      "growth": 6.1,
      "perCapita": 1875.2,
      "popChangePct": 1.93
    },
    {
      "year": 2002,
      "gdp": 0.867,
      "growth": 5.3,
      "perCapita": 2015.4,
      "popChangePct": 1.9
    },
    {
      "year": 2003,
      "gdp": 1.105,
      "growth": 7.5,
      "perCapita": 2524.3,
      "popChangePct": 1.86
    },
    {
      "year": 2004,
      "gdp": 1.263,
      "growth": 4.9,
      "perCapita": 2839.3,
      "popChangePct": 1.6
    },
    {
      "year": 2005,
      "gdp": 1.395,
      "growth": 5.8,
      "perCapita": 3091.0,
      "popChangePct": 1.35
    },
    {
      "year": 2006,
      "gdp": 1.452,
      "growth": 9.1,
      "perCapita": 3174.5,
      "popChangePct": 1.33
    },
    {
      "year": 2007,
      "gdp": 1.65,
      "growth": 15.2,
      "perCapita": 3565.3,
      "popChangePct": 1.31
    },
    {
      "year": 2008,
      "gdp": 1.96,
      "growth": 7,
      "perCapita": 4189.7,
      "popChangePct": 1.08
    },
    {
      "year": 2009,
      "gdp": 1.852,
      "growth": -1.5,
      "perCapita": 3918.6,
      "popChangePct": 1.07
    },
    {
      "year": 2010,
      "gdp": 1.825,
      "growth": 1.8,
      "perCapita": 3818.6,
      "popChangePct": 1.06
    },
    {
      "year": 2011,
      "gdp": 2.047,
      "growth": 3.9,
      "perCapita": 4259.1,
      "popChangePct": 0.63
    },
    {
      "year": 2012,
      "gdp": 1.913,
      "growth": 1.1,
      "perCapita": 3958.5,
      "popChangePct": 0.42
    },
    {
      "year": 2013,
      "gdp": 2.029,
      "growth": 0.6,
      "perCapita": 4174.7,
      "popChangePct": 0.62
    },
    {
      "year": 2014,
      "gdp": 2.042,
      "growth": 0.7,
      "perCapita": 4178.1,
      "popChangePct": 0.62
    },
    {
      "year": 2015,
      "gdp": 1.75,
      "growth": 0.9,
      "perCapita": 3560.7,
      "popChangePct": 0.41
    },
    {
      "year": 2016,
      "gdp": 1.85,
      "growth": 4.3,
      "perCapita": 3748.6,
      "popChangePct": 0.41
    },
    {
      "year": 2017,
      "gdp": 1.997,
      "growth": 4.6,
      "perCapita": 4029.6,
      "popChangePct": 0.61
    },
    {
      "year": 2018,
      "gdp": 2.205,
      "growth": 3.7,
      "perCapita": 4431.8,
      "popChangePct": 0.4
    },
    {
      "year": 2019,
      "gdp": 2.251,
      "growth": 6.9,
      "perCapita": 4504.7,
      "popChangePct": 0.4
    },
    {
      "year": 2020,
      "gdp": 1.829,
      "growth": -20.8,
      "perCapita": 3646.8,
      "popChangePct": 0.4
    },
    {
      "year": 2021,
      "gdp": 2.053,
      "growth": 7,
      "perCapita": 4072.4,
      "popChangePct": 0.4
    },
    {
      "year": 2022,
      "gdp": 2.252,
      "growth": 15.8,
      "perCapita": 4445.5,
      "popChangePct": 0.6
    },
    {
      "year": 2023,
      "gdp": 2.501,
      "growth": 4.8,
      "perCapita": 4912.8,
      "popChangePct": 0.39
    },
    {
      "year": 2024,
      "gdp": 2.726,
      "growth": 7.2,
      "perCapita": 5328.9,
      "popChangePct": 0.59
    },
    {
      "year": 2025,
      "gdp": 3.081,
      "growth": 5.5,
      "perCapita": 5994.8,
      "popChangePct": 0.39
    },
    {
      "year": 2026,
      "gdp": 3.448,
      "growth": 4.8,
      "perCapita": 6670.3,
      "popChangePct": 0.58
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3.699,
      "growth": 5,
      "perCapita": 7114.4,
      "popChangePct": 0.58
    },
    {
      "year": 2028,
      "gdp": 3.963,
      "growth": 5,
      "perCapita": 7580.3,
      "popChangePct": 0.58
    },
    {
      "year": 2029,
      "gdp": 4.253,
      "growth": 5.1,
      "perCapita": 8090.4,
      "popChangePct": 0.57
    },
    {
      "year": 2030,
      "gdp": 4.565,
      "growth": 5.1,
      "perCapita": 8635.9,
      "popChangePct": 0.57
    },
    {
      "year": 2031,
      "gdp": 4.902,
      "growth": 5.1,
      "perCapita": 9217.5,
      "popChangePct": 0.57
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.237,
      "perCapitaPPP": 860.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.281,
      "perCapitaPPP": 1006.0,
      "perCapitaPPPChangePct": 16.9,
      "popChangePct": 1.45
    },
    {
      "year": 1982,
      "gdpPPP": 0.307,
      "perCapitaPPP": 1078.4,
      "perCapitaPPPChangePct": 7.2,
      "popChangePct": 2.15
    },
    {
      "year": 1983,
      "gdpPPP": 0.349,
      "perCapitaPPP": 1202.7,
      "perCapitaPPPChangePct": 11.52,
      "popChangePct": 1.75
    },
    {
      "year": 1984,
      "gdpPPP": 0.375,
      "perCapitaPPP": 1266.2,
      "perCapitaPPPChangePct": 5.28,
      "popChangePct": 2.41
    },
    {
      "year": 1985,
      "gdpPPP": 0.421,
      "perCapitaPPP": 1389.5,
      "perCapitaPPPChangePct": 9.74,
      "popChangePct": 2.02
    },
    {
      "year": 1986,
      "gdpPPP": 0.442,
      "perCapitaPPP": 1428.2,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 1.98
    },
    {
      "year": 1987,
      "gdpPPP": 0.472,
      "perCapitaPPP": 1495.3,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 2.27
    },
    {
      "year": 1988,
      "gdpPPP": 0.518,
      "perCapitaPPP": 1606.9,
      "perCapitaPPPChangePct": 7.46,
      "popChangePct": 1.9
    },
    {
      "year": 1989,
      "gdpPPP": 0.569,
      "perCapitaPPP": 1727.4,
      "perCapitaPPPChangePct": 7.5,
      "popChangePct": 2.17
    },
    {
      "year": 1990,
      "gdpPPP": 0.594,
      "perCapitaPPP": 1764.2,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 2.43
    },
    {
      "year": 1991,
      "gdpPPP": 0.623,
      "perCapitaPPP": 1806.8,
      "perCapitaPPPChangePct": 2.41,
      "popChangePct": 2.37
    },
    {
      "year": 1992,
      "gdpPPP": 0.657,
      "perCapitaPPP": 1859.1,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 2.32
    },
    {
      "year": 1993,
      "gdpPPP": 0.721,
      "perCapitaPPP": 1993.9,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": 2.55
    },
    {
      "year": 1994,
      "gdpPPP": 0.788,
      "perCapitaPPP": 2184.8,
      "perCapitaPPPChangePct": 9.57,
      "popChangePct": -0.28
    },
    {
      "year": 1995,
      "gdpPPP": 0.865,
      "perCapitaPPP": 2336.3,
      "perCapitaPPPChangePct": 6.93,
      "popChangePct": 2.49
    },
    {
      "year": 1996,
      "gdpPPP": 0.94,
      "perCapitaPPP": 2476.9,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 2.43
    },
    {
      "year": 1997,
      "gdpPPP": 1.029,
      "perCapitaPPP": 2649.7,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 2.37
    },
    {
      "year": 1998,
      "gdpPPP": 1.128,
      "perCapitaPPP": 2841.2,
      "perCapitaPPPChangePct": 7.23,
      "popChangePct": 2.32
    },
    {
      "year": 1999,
      "gdpPPP": 1.279,
      "perCapitaPPP": 3155.4,
      "perCapitaPPPChangePct": 11.06,
      "popChangePct": 2.02
    },
    {
      "year": 2000,
      "gdpPPP": 1.403,
      "perCapitaPPP": 3391.4,
      "perCapitaPPPChangePct": 7.48,
      "popChangePct": 2.22
    },
    {
      "year": 2001,
      "gdpPPP": 1.523,
      "perCapitaPPP": 3608.9,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 1.93
    },
    {
      "year": 2002,
      "gdpPPP": 1.629,
      "perCapitaPPP": 3787.6,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 1.9
    },
    {
      "year": 2003,
      "gdpPPP": 1.786,
      "perCapitaPPP": 4079.6,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": 1.86
    },
    {
      "year": 2004,
      "gdpPPP": 1.924,
      "perCapitaPPP": 4325.1,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.6
    },
    {
      "year": 2005,
      "gdpPPP": 2.1,
      "perCapitaPPP": 4651.2,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 1.35
    },
    {
      "year": 2006,
      "gdpPPP": 2.362,
      "perCapitaPPP": 5164.1,
      "perCapitaPPPChangePct": 11.03,
      "popChangePct": 1.33
    },
    {
      "year": 2007,
      "gdpPPP": 2.794,
      "perCapitaPPP": 6039.3,
      "perCapitaPPPChangePct": 16.95,
      "popChangePct": 1.31
    },
    {
      "year": 2008,
      "gdpPPP": 3.049,
      "perCapitaPPP": 6518.1,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 1.08
    },
    {
      "year": 2009,
      "gdpPPP": 3.021,
      "perCapitaPPP": 6391.6,
      "perCapitaPPPChangePct": -1.94,
      "popChangePct": 1.07
    },
    {
      "year": 2010,
      "gdpPPP": 3.114,
      "perCapitaPPP": 6517.0,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 1.06
    },
    {
      "year": 2011,
      "gdpPPP": 3.303,
      "perCapitaPPP": 6873.4,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 0.63
    },
    {
      "year": 2012,
      "gdpPPP": 3.401,
      "perCapitaPPP": 7037.6,
      "perCapitaPPPChangePct": 2.39,
      "popChangePct": 0.42
    },
    {
      "year": 2013,
      "gdpPPP": 3.481,
      "perCapitaPPP": 7162.4,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 0.62
    },
    {
      "year": 2014,
      "gdpPPP": 3.566,
      "perCapitaPPP": 7297.1,
      "perCapitaPPPChangePct": 1.88,
      "popChangePct": 0.62
    },
    {
      "year": 2015,
      "gdpPPP": 3.633,
      "perCapitaPPP": 7392.6,
      "perCapitaPPPChangePct": 1.31,
      "popChangePct": 0.41
    },
    {
      "year": 2016,
      "gdpPPP": 3.825,
      "perCapitaPPP": 7750.3,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 0.41
    },
    {
      "year": 2017,
      "gdpPPP": 4.07,
      "perCapitaPPP": 8214.0,
      "perCapitaPPPChangePct": 5.98,
      "popChangePct": 0.61
    },
    {
      "year": 2018,
      "gdpPPP": 4.064,
      "perCapitaPPP": 8168.7,
      "perCapitaPPPChangePct": -0.55,
      "popChangePct": 0.4
    },
    {
      "year": 2019,
      "gdpPPP": 4.442,
      "perCapitaPPP": 8890.2,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 0.4
    },
    {
      "year": 2020,
      "gdpPPP": 3.536,
      "perCapitaPPP": 7047.7,
      "perCapitaPPPChangePct": -20.73,
      "popChangePct": 0.4
    },
    {
      "year": 2021,
      "gdpPPP": 3.971,
      "perCapitaPPP": 7876.3,
      "perCapitaPPPChangePct": 11.76,
      "popChangePct": 0.4
    },
    {
      "year": 2022,
      "gdpPPP": 4.927,
      "perCapitaPPP": 9725.6,
      "perCapitaPPPChangePct": 23.48,
      "popChangePct": 0.6
    },
    {
      "year": 2023,
      "gdpPPP": 5.354,
      "perCapitaPPP": 10517.4,
      "perCapitaPPPChangePct": 8.14,
      "popChangePct": 0.39
    },
    {
      "year": 2024,
      "gdpPPP": 5.885,
      "perCapitaPPP": 11503.8,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": 0.59
    },
    {
      "year": 2025,
      "gdpPPP": 6.385,
      "perCapitaPPP": 12422.5,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 0.39
    },
    {
      "year": 2026,
      "gdpPPP": 6.882,
      "perCapitaPPP": 13313.8,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 0.58
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 7.388,
      "perCapitaPPP": 14211.2,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 0.58
    },
    {
      "year": 2028,
      "gdpPPP": 7.885,
      "perCapitaPPP": 15081.8,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 0.58
    },
    {
      "year": 2029,
      "gdpPPP": 8.431,
      "perCapitaPPP": 16037.9,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 0.57
    },
    {
      "year": 2030,
      "gdpPPP": 9.021,
      "perCapitaPPP": 17064.3,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 0.57
    },
    {
      "year": 2031,
      "gdpPPP": 9.649,
      "perCapitaPPP": 18145.4,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 0.57
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CaboVerdeGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
