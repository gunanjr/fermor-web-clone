import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Côte d'Ivoire",
  "slug": "cote-d-ivoire",
  "iso3": "CIV",
  "region": "Africa",
  "rank2026": 76,
  "flagEmoji": "🇨🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Croatia",
      "slug": "croatia",
      "rank": 75
    },
    {
      "name": "Serbia",
      "slug": "serbia",
      "rank": 77
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 13.877,
      "growth": 5.2,
      "perCapita": 1764.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 11.502,
      "growth": 3.5,
      "perCapita": 1430.0,
      "popChangePct": 2.28
    },
    {
      "year": 1982,
      "gdp": 10.32,
      "growth": 0.2,
      "perCapita": 1235.2,
      "popChangePct": 3.88
    },
    {
      "year": 1983,
      "gdp": 9.312,
      "growth": -2.5,
      "perCapita": 1060.7,
      "popChangePct": 5.07
    },
    {
      "year": 1984,
      "gdp": 9.284,
      "growth": -2,
      "perCapita": 1028.7,
      "popChangePct": 2.8
    },
    {
      "year": 1985,
      "gdp": 9.47,
      "growth": 3.6,
      "perCapita": 1010.2,
      "popChangePct": 3.87
    },
    {
      "year": 1986,
      "gdp": 12.675,
      "growth": 4.8,
      "perCapita": 1301.1,
      "popChangePct": 3.93
    },
    {
      "year": 1987,
      "gdp": 13.944,
      "growth": -0.5,
      "perCapita": 1377.9,
      "popChangePct": 3.88
    },
    {
      "year": 1988,
      "gdp": 14.092,
      "growth": 1.1,
      "perCapita": 1379.6,
      "popChangePct": 0.93
    },
    {
      "year": 1989,
      "gdp": 13.487,
      "growth": 2.9,
      "perCapita": 1268.8,
      "popChangePct": 4.07
    },
    {
      "year": 1990,
      "gdp": 14.923,
      "growth": -1.1,
      "perCapita": 1348.8,
      "popChangePct": 4.08
    },
    {
      "year": 1991,
      "gdp": 14.504,
      "growth": 0,
      "perCapita": 1260.4,
      "popChangePct": 4.01
    },
    {
      "year": 1992,
      "gdp": 15.416,
      "growth": -0.2,
      "perCapita": 1288.9,
      "popChangePct": 3.94
    },
    {
      "year": 1993,
      "gdp": 15.268,
      "growth": -0.2,
      "perCapita": 1161.8,
      "popChangePct": 9.87
    },
    {
      "year": 1994,
      "gdp": 11.492,
      "growth": 0.2,
      "perCapita": 849.0,
      "popChangePct": 3.0
    },
    {
      "year": 1995,
      "gdp": 15.205,
      "growth": 5.6,
      "perCapita": 1091.6,
      "popChangePct": 2.9
    },
    {
      "year": 1996,
      "gdp": 16.78,
      "growth": 8.1,
      "perCapita": 1171.4,
      "popChangePct": 2.84
    },
    {
      "year": 1997,
      "gdp": 16.203,
      "growth": 5.7,
      "perCapita": 1092.1,
      "popChangePct": 3.57
    },
    {
      "year": 1998,
      "gdp": 17.433,
      "growth": 4.9,
      "perCapita": 1134.5,
      "popChangePct": 3.58
    },
    {
      "year": 1999,
      "gdp": 17.114,
      "growth": 1.6,
      "perCapita": 1082.8,
      "popChangePct": 2.86
    },
    {
      "year": 2000,
      "gdp": 14.851,
      "growth": -2.1,
      "perCapita": 913.4,
      "popChangePct": 2.86
    },
    {
      "year": 2001,
      "gdp": 15.485,
      "growth": 0.1,
      "perCapita": 926.0,
      "popChangePct": 2.86
    },
    {
      "year": 2002,
      "gdp": 17.148,
      "growth": -1.7,
      "perCapita": 996.9,
      "popChangePct": 2.86
    },
    {
      "year": 2003,
      "gdp": 21.206,
      "growth": -1.4,
      "perCapita": 1198.5,
      "popChangePct": 2.86
    },
    {
      "year": 2004,
      "gdp": 22.924,
      "growth": 1.2,
      "perCapita": 1259.6,
      "popChangePct": 2.86
    },
    {
      "year": 2005,
      "gdp": 23.626,
      "growth": 1.7,
      "perCapita": 1262.1,
      "popChangePct": 2.86
    },
    {
      "year": 2006,
      "gdp": 24.628,
      "growth": 1.5,
      "perCapita": 1279.1,
      "popChangePct": 2.86
    },
    {
      "year": 2007,
      "gdp": 28.158,
      "growth": 1.8,
      "perCapita": 1421.8,
      "popChangePct": 2.86
    },
    {
      "year": 2008,
      "gdp": 33.621,
      "growth": 2.5,
      "perCapita": 1650.4,
      "popChangePct": 2.86
    },
    {
      "year": 2009,
      "gdp": 33.693,
      "growth": 3.3,
      "perCapita": 1608.0,
      "popChangePct": 2.86
    },
    {
      "year": 2010,
      "gdp": 34.431,
      "growth": 2,
      "perCapita": 1597.5,
      "popChangePct": 2.86
    },
    {
      "year": 2011,
      "gdp": 35.529,
      "growth": -4.9,
      "perCapita": 1602.6,
      "popChangePct": 2.86
    },
    {
      "year": 2012,
      "gdp": 37.03,
      "growth": 10.9,
      "perCapita": 1623.9,
      "popChangePct": 2.86
    },
    {
      "year": 2013,
      "gdp": 43.228,
      "growth": 9.3,
      "perCapita": 1843.0,
      "popChangePct": 2.86
    },
    {
      "year": 2014,
      "gdp": 48.882,
      "growth": 8.8,
      "perCapita": 2026.2,
      "popChangePct": 2.86
    },
    {
      "year": 2015,
      "gdp": 45.815,
      "growth": 8.8,
      "perCapita": 1846.2,
      "popChangePct": 2.86
    },
    {
      "year": 2016,
      "gdp": 48.408,
      "growth": 7.2,
      "perCapita": 1896.5,
      "popChangePct": 2.86
    },
    {
      "year": 2017,
      "gdp": 52.512,
      "growth": 7.4,
      "perCapita": 2000.1,
      "popChangePct": 2.86
    },
    {
      "year": 2018,
      "gdp": 58.522,
      "growth": 4.8,
      "perCapita": 2167.0,
      "popChangePct": 2.86
    },
    {
      "year": 2019,
      "gdp": 60.383,
      "growth": 6.7,
      "perCapita": 2173.8,
      "popChangePct": 2.86
    },
    {
      "year": 2020,
      "gdp": 63.119,
      "growth": 0.7,
      "perCapita": 2209.1,
      "popChangePct": 2.86
    },
    {
      "year": 2021,
      "gdp": 72.833,
      "growth": 7.1,
      "perCapita": 2478.2,
      "popChangePct": 2.86
    },
    {
      "year": 2022,
      "gdp": 71.075,
      "growth": 6.4,
      "perCapita": 2351.2,
      "popChangePct": 2.86
    },
    {
      "year": 2023,
      "gdp": 80.792,
      "growth": 6.6,
      "perCapita": 2598.3,
      "popChangePct": 2.86
    },
    {
      "year": 2024,
      "gdp": 87.132,
      "growth": 6,
      "perCapita": 2724.3,
      "popChangePct": 2.86
    },
    {
      "year": 2025,
      "gdp": 98.885,
      "growth": 6.5,
      "perCapita": 3005.8,
      "popChangePct": 2.86
    },
    {
      "year": 2026,
      "gdp": 112.115,
      "growth": 6.2,
      "perCapita": 3313.3,
      "popChangePct": 2.86
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 121.282,
      "growth": 6.3,
      "perCapita": 3484.6,
      "popChangePct": 2.86
    },
    {
      "year": 2028,
      "gdp": 131.516,
      "growth": 6.6,
      "perCapita": 3673.5,
      "popChangePct": 2.86
    },
    {
      "year": 2029,
      "gdp": 143.461,
      "growth": 7,
      "perCapita": 3895.8,
      "popChangePct": 2.86
    },
    {
      "year": 2030,
      "gdp": 156.28,
      "growth": 6.8,
      "perCapita": 4125.9,
      "popChangePct": 2.86
    },
    {
      "year": 2031,
      "gdp": 169.767,
      "growth": 6.5,
      "perCapita": 4357.4,
      "popChangePct": 2.86
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 20.31,
      "perCapitaPPP": 2582.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 23.009,
      "perCapitaPPP": 2860.7,
      "perCapitaPPPChangePct": 10.76,
      "popChangePct": 2.28
    },
    {
      "year": 1982,
      "gdpPPP": 24.48,
      "perCapitaPPP": 2930.1,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": 3.88
    },
    {
      "year": 1983,
      "gdpPPP": 24.802,
      "perCapitaPPP": 2825.0,
      "perCapitaPPPChangePct": -3.58,
      "popChangePct": 5.07
    },
    {
      "year": 1984,
      "gdpPPP": 25.184,
      "perCapitaPPP": 2790.4,
      "perCapitaPPPChangePct": -1.22,
      "popChangePct": 2.8
    },
    {
      "year": 1985,
      "gdpPPP": 26.915,
      "perCapitaPPP": 2871.2,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 3.87
    },
    {
      "year": 1986,
      "gdpPPP": 28.775,
      "perCapitaPPP": 2953.6,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 3.93
    },
    {
      "year": 1987,
      "gdpPPP": 29.341,
      "perCapitaPPP": 2899.3,
      "perCapitaPPPChangePct": -1.84,
      "popChangePct": 3.88
    },
    {
      "year": 1988,
      "gdpPPP": 30.722,
      "perCapitaPPP": 3007.7,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 0.93
    },
    {
      "year": 1989,
      "gdpPPP": 32.868,
      "perCapitaPPP": 3092.1,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 4.07
    },
    {
      "year": 1990,
      "gdpPPP": 33.727,
      "perCapitaPPP": 3048.3,
      "perCapitaPPPChangePct": -1.42,
      "popChangePct": 4.08
    },
    {
      "year": 1991,
      "gdpPPP": 34.881,
      "perCapitaPPP": 3031.1,
      "perCapitaPPPChangePct": -0.56,
      "popChangePct": 4.01
    },
    {
      "year": 1992,
      "gdpPPP": 35.587,
      "perCapitaPPP": 2975.3,
      "perCapitaPPPChangePct": -1.84,
      "popChangePct": 3.94
    },
    {
      "year": 1993,
      "gdpPPP": 36.365,
      "perCapitaPPP": 2767.0,
      "perCapitaPPPChangePct": -7.0,
      "popChangePct": 9.87
    },
    {
      "year": 1994,
      "gdpPPP": 37.205,
      "perCapitaPPP": 2748.6,
      "perCapitaPPPChangePct": -0.67,
      "popChangePct": 3.0
    },
    {
      "year": 1995,
      "gdpPPP": 40.101,
      "perCapitaPPP": 2878.9,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 2.9
    },
    {
      "year": 1996,
      "gdpPPP": 44.158,
      "perCapitaPPP": 3082.7,
      "perCapitaPPPChangePct": 7.08,
      "popChangePct": 2.84
    },
    {
      "year": 1997,
      "gdpPPP": 47.49,
      "perCapitaPPP": 3200.9,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 3.57
    },
    {
      "year": 1998,
      "gdpPPP": 50.392,
      "perCapitaPPP": 3279.3,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 3.58
    },
    {
      "year": 1999,
      "gdpPPP": 51.931,
      "perCapitaPPP": 3285.5,
      "perCapitaPPPChangePct": 0.19,
      "popChangePct": 2.86
    },
    {
      "year": 2000,
      "gdpPPP": 52.009,
      "perCapitaPPP": 3199.0,
      "perCapitaPPPChangePct": -2.63,
      "popChangePct": 2.86
    },
    {
      "year": 2001,
      "gdpPPP": 53.245,
      "perCapitaPPP": 3183.9,
      "perCapitaPPPChangePct": -0.47,
      "popChangePct": 2.86
    },
    {
      "year": 2002,
      "gdpPPP": 53.17,
      "perCapitaPPP": 3091.1,
      "perCapitaPPPChangePct": -2.92,
      "popChangePct": 2.86
    },
    {
      "year": 2003,
      "gdpPPP": 53.483,
      "perCapitaPPP": 3022.9,
      "perCapitaPPPChangePct": -2.21,
      "popChangePct": 2.86
    },
    {
      "year": 2004,
      "gdpPPP": 55.598,
      "perCapitaPPP": 3055.0,
      "perCapitaPPPChangePct": 1.06,
      "popChangePct": 2.86
    },
    {
      "year": 2005,
      "gdpPPP": 58.328,
      "perCapitaPPP": 3116.0,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 2.86
    },
    {
      "year": 2006,
      "gdpPPP": 61.038,
      "perCapitaPPP": 3170.1,
      "perCapitaPPPChangePct": 1.74,
      "popChangePct": 2.86
    },
    {
      "year": 2007,
      "gdpPPP": 63.799,
      "perCapitaPPP": 3221.3,
      "perCapitaPPPChangePct": 1.62,
      "popChangePct": 2.86
    },
    {
      "year": 2008,
      "gdpPPP": 66.681,
      "perCapitaPPP": 3273.3,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 2.86
    },
    {
      "year": 2009,
      "gdpPPP": 69.274,
      "perCapitaPPP": 3306.0,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 2.86
    },
    {
      "year": 2010,
      "gdpPPP": 71.53,
      "perCapitaPPP": 3318.8,
      "perCapitaPPPChangePct": 0.39,
      "popChangePct": 2.86
    },
    {
      "year": 2011,
      "gdpPPP": 69.46,
      "perCapitaPPP": 3133.2,
      "perCapitaPPPChangePct": -5.59,
      "popChangePct": 2.86
    },
    {
      "year": 2012,
      "gdpPPP": 78.44,
      "perCapitaPPP": 3439.9,
      "perCapitaPPPChangePct": 9.79,
      "popChangePct": 2.86
    },
    {
      "year": 2013,
      "gdpPPP": 87.172,
      "perCapitaPPP": 3716.5,
      "perCapitaPPPChangePct": 8.04,
      "popChangePct": 2.86
    },
    {
      "year": 2014,
      "gdpPPP": 96.49,
      "perCapitaPPP": 3999.4,
      "perCapitaPPPChangePct": 7.61,
      "popChangePct": 2.86
    },
    {
      "year": 2015,
      "gdpPPP": 105.997,
      "perCapitaPPP": 4271.4,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 2.86
    },
    {
      "year": 2016,
      "gdpPPP": 114.678,
      "perCapitaPPP": 4492.8,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 2.86
    },
    {
      "year": 2017,
      "gdpPPP": 125.384,
      "perCapitaPPP": 4775.6,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 2.86
    },
    {
      "year": 2018,
      "gdpPPP": 135.828,
      "perCapitaPPP": 5029.6,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 2.86
    },
    {
      "year": 2019,
      "gdpPPP": 155.524,
      "perCapitaPPP": 5598.8,
      "perCapitaPPPChangePct": 11.32,
      "popChangePct": 2.86
    },
    {
      "year": 2020,
      "gdpPPP": 160.303,
      "perCapitaPPP": 5610.5,
      "perCapitaPPPChangePct": 0.21,
      "popChangePct": 2.86
    },
    {
      "year": 2021,
      "gdpPPP": 179.178,
      "perCapitaPPP": 6096.7,
      "perCapitaPPPChangePct": 8.67,
      "popChangePct": 2.86
    },
    {
      "year": 2022,
      "gdpPPP": 204.205,
      "perCapitaPPP": 6755.2,
      "perCapitaPPPChangePct": 10.8,
      "popChangePct": 2.86
    },
    {
      "year": 2023,
      "gdpPPP": 225.737,
      "perCapitaPPP": 7259.9,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": 2.86
    },
    {
      "year": 2024,
      "gdpPPP": 245.266,
      "perCapitaPPP": 7668.7,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 2.86
    },
    {
      "year": 2025,
      "gdpPPP": 268.619,
      "perCapitaPPP": 8165.3,
      "perCapitaPPPChangePct": 6.48,
      "popChangePct": 2.86
    },
    {
      "year": 2026,
      "gdpPPP": 293.446,
      "perCapitaPPP": 8672.0,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 2.86
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 318.783,
      "perCapitaPPP": 9158.9,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 2.86
    },
    {
      "year": 2028,
      "gdpPPP": 345.4,
      "perCapitaPPP": 9647.8,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 2.86
    },
    {
      "year": 2029,
      "gdpPPP": 376.149,
      "perCapitaPPP": 10214.6,
      "perCapitaPPPChangePct": 5.88,
      "popChangePct": 2.86
    },
    {
      "year": 2030,
      "gdpPPP": 409.109,
      "perCapitaPPP": 10800.9,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 2.86
    },
    {
      "year": 2031,
      "gdpPPP": 443.567,
      "perCapitaPPP": 11385.0,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 2.86
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CTeDIvoireGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
