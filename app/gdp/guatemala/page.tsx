import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Guatemala",
  "slug": "guatemala",
  "iso3": "GTM",
  "region": "Americas",
  "rank2026": 70,
  "flagEmoji": "🇬🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Puerto Rico",
      "slug": "puerto-rico",
      "rank": 69
    },
    {
      "name": "DR Congo",
      "slug": "dr-congo",
      "rank": 71
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 7.718,
      "growth": 3.7,
      "perCapita": 1098.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 8.431,
      "growth": 0.6,
      "perCapita": 1170.4,
      "popChangePct": 2.55
    },
    {
      "year": 1982,
      "gdp": 8.539,
      "growth": -3.5,
      "perCapita": 1156.0,
      "popChangePct": 2.54
    },
    {
      "year": 1983,
      "gdp": 8.864,
      "growth": -2.5,
      "perCapita": 1170.2,
      "popChangePct": 2.55
    },
    {
      "year": 1984,
      "gdp": 9.276,
      "growth": 0.5,
      "perCapita": 1193.9,
      "popChangePct": 2.57
    },
    {
      "year": 1985,
      "gdp": 10.951,
      "growth": -0.6,
      "perCapita": 1374.2,
      "popChangePct": 2.56
    },
    {
      "year": 1986,
      "gdp": 5.921,
      "growth": 0.1,
      "perCapita": 724.4,
      "popChangePct": 2.56
    },
    {
      "year": 1987,
      "gdp": 6.857,
      "growth": 3.6,
      "perCapita": 818.1,
      "popChangePct": 2.56
    },
    {
      "year": 1988,
      "gdp": 7.426,
      "growth": 3.9,
      "perCapita": 864.1,
      "popChangePct": 2.53
    },
    {
      "year": 1989,
      "gdp": 8.561,
      "growth": 3.9,
      "perCapita": 971.8,
      "popChangePct": 2.5
    },
    {
      "year": 1990,
      "gdp": 7.535,
      "growth": 3.1,
      "perCapita": 834.9,
      "popChangePct": 2.45
    },
    {
      "year": 1991,
      "gdp": 9.174,
      "growth": 3,
      "perCapita": 989.3,
      "popChangePct": 2.75
    },
    {
      "year": 1992,
      "gdp": 10.138,
      "growth": 4.6,
      "perCapita": 1064.7,
      "popChangePct": 2.69
    },
    {
      "year": 1993,
      "gdp": 11.045,
      "growth": 3.4,
      "perCapita": 1129.4,
      "popChangePct": 2.71
    },
    {
      "year": 1994,
      "gdp": 12.482,
      "growth": 3.5,
      "perCapita": 1242.7,
      "popChangePct": 2.7
    },
    {
      "year": 1995,
      "gdp": 14.05,
      "growth": 4.4,
      "perCapita": 1362.4,
      "popChangePct": 2.68
    },
    {
      "year": 1996,
      "gdp": 14.992,
      "growth": 2.8,
      "perCapita": 1416.5,
      "popChangePct": 2.63
    },
    {
      "year": 1997,
      "gdp": 16.982,
      "growth": 4.1,
      "perCapita": 1564.0,
      "popChangePct": 2.59
    },
    {
      "year": 1998,
      "gdp": 18.461,
      "growth": 4.6,
      "perCapita": 1657.3,
      "popChangePct": 2.59
    },
    {
      "year": 1999,
      "gdp": 17.422,
      "growth": 3.7,
      "perCapita": 1525.2,
      "popChangePct": 2.55
    },
    {
      "year": 2000,
      "gdp": 18.124,
      "growth": 2.5,
      "perCapita": 1549.3,
      "popChangePct": 2.41
    },
    {
      "year": 2001,
      "gdp": 19.735,
      "growth": 3.1,
      "perCapita": 1648.8,
      "popChangePct": 2.32
    },
    {
      "year": 2002,
      "gdp": 21.924,
      "growth": 3.8,
      "perCapita": 1790.2,
      "popChangePct": 2.32
    },
    {
      "year": 2003,
      "gdp": 23.092,
      "growth": 2.6,
      "perCapita": 1843.6,
      "popChangePct": 2.28
    },
    {
      "year": 2004,
      "gdp": 24.977,
      "growth": 3.1,
      "perCapita": 1950.2,
      "popChangePct": 2.24
    },
    {
      "year": 2005,
      "gdp": 28.179,
      "growth": 3.3,
      "perCapita": 2153.1,
      "popChangePct": 2.19
    },
    {
      "year": 2006,
      "gdp": 31.308,
      "growth": 5.4,
      "perCapita": 2342.1,
      "popChangePct": 2.13
    },
    {
      "year": 2007,
      "gdp": 35.028,
      "growth": 6.3,
      "perCapita": 2565.8,
      "popChangePct": 2.13
    },
    {
      "year": 2008,
      "gdp": 40.242,
      "growth": 3.3,
      "perCapita": 2887.8,
      "popChangePct": 2.07
    },
    {
      "year": 2009,
      "gdp": 37.997,
      "growth": 0.5,
      "perCapita": 2672.9,
      "popChangePct": 2.02
    },
    {
      "year": 2010,
      "gdp": 41.493,
      "growth": 2.9,
      "perCapita": 2861.5,
      "popChangePct": 2.0
    },
    {
      "year": 2011,
      "gdp": 47.419,
      "growth": 4.2,
      "perCapita": 3205.7,
      "popChangePct": 2.01
    },
    {
      "year": 2012,
      "gdp": 49.902,
      "growth": 3,
      "perCapita": 3307.0,
      "popChangePct": 2.01
    },
    {
      "year": 2013,
      "gdp": 52.989,
      "growth": 3.7,
      "perCapita": 3443.7,
      "popChangePct": 1.97
    },
    {
      "year": 2014,
      "gdp": 57.835,
      "growth": 4.4,
      "perCapita": 3688.0,
      "popChangePct": 1.92
    },
    {
      "year": 2015,
      "gdp": 62.18,
      "growth": 4.1,
      "perCapita": 3893.1,
      "popChangePct": 1.85
    },
    {
      "year": 2016,
      "gdp": 66.034,
      "growth": 2.7,
      "perCapita": 4059.0,
      "popChangePct": 1.86
    },
    {
      "year": 2017,
      "gdp": 71.624,
      "growth": 3.1,
      "perCapita": 4323.2,
      "popChangePct": 1.83
    },
    {
      "year": 2018,
      "gdp": 73.331,
      "growth": 3.4,
      "perCapita": 4353.1,
      "popChangePct": 1.68
    },
    {
      "year": 2019,
      "gdp": 77.156,
      "growth": 4,
      "perCapita": 4511.1,
      "popChangePct": 1.53
    },
    {
      "year": 2020,
      "gdp": 77.718,
      "growth": -1.8,
      "perCapita": 4477.5,
      "popChangePct": 1.48
    },
    {
      "year": 2021,
      "gdp": 86.443,
      "growth": 8,
      "perCapita": 4911.9,
      "popChangePct": 1.39
    },
    {
      "year": 2022,
      "gdp": 95.642,
      "growth": 4.2,
      "perCapita": 5358.7,
      "popChangePct": 1.41
    },
    {
      "year": 2023,
      "gdp": 104.354,
      "growth": 3.5,
      "perCapita": 5757.5,
      "popChangePct": 1.55
    },
    {
      "year": 2024,
      "gdp": 113.19,
      "growth": 3.7,
      "perCapita": 6149.5,
      "popChangePct": 1.55
    },
    {
      "year": 2025,
      "gdp": 121.113,
      "growth": 4.1,
      "perCapita": 6489.1,
      "popChangePct": 1.4
    },
    {
      "year": 2026,
      "gdp": 128.886,
      "growth": 3.9,
      "perCapita": 6810.3,
      "popChangePct": 1.4
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 139.461,
      "growth": 4,
      "perCapita": 7267.3,
      "popChangePct": 1.4
    },
    {
      "year": 2028,
      "gdp": 150.089,
      "growth": 3.9,
      "perCapita": 7716.2,
      "popChangePct": 1.36
    },
    {
      "year": 2029,
      "gdp": 161.812,
      "growth": 3.8,
      "perCapita": 8207.2,
      "popChangePct": 1.36
    },
    {
      "year": 2030,
      "gdp": 174.766,
      "growth": 3.9,
      "perCapita": 8747.0,
      "popChangePct": 1.34
    },
    {
      "year": 2031,
      "gdp": 188.873,
      "growth": 3.9,
      "perCapita": 9329.9,
      "popChangePct": 1.32
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 22.281,
      "perCapitaPPP": 3171.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 24.546,
      "perCapitaPPP": 3407.5,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 2.55
    },
    {
      "year": 1982,
      "gdpPPP": 25.14,
      "perCapitaPPP": 3403.4,
      "perCapitaPPPChangePct": -0.12,
      "popChangePct": 2.54
    },
    {
      "year": 1983,
      "gdpPPP": 25.464,
      "perCapitaPPP": 3361.4,
      "perCapitaPPPChangePct": -1.23,
      "popChangePct": 2.55
    },
    {
      "year": 1984,
      "gdpPPP": 26.518,
      "perCapitaPPP": 3413.0,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 2.57
    },
    {
      "year": 1985,
      "gdpPPP": 27.192,
      "perCapitaPPP": 3412.3,
      "perCapitaPPPChangePct": -0.02,
      "popChangePct": 2.56
    },
    {
      "year": 1986,
      "gdpPPP": 27.767,
      "perCapitaPPP": 3397.4,
      "perCapitaPPPChangePct": -0.44,
      "popChangePct": 2.56
    },
    {
      "year": 1987,
      "gdpPPP": 29.474,
      "perCapitaPPP": 3516.4,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 2.56
    },
    {
      "year": 1988,
      "gdpPPP": 31.701,
      "perCapitaPPP": 3688.8,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 2.53
    },
    {
      "year": 1989,
      "gdpPPP": 34.243,
      "perCapitaPPP": 3887.4,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 2.5
    },
    {
      "year": 1990,
      "gdpPPP": 36.626,
      "perCapitaPPP": 4058.4,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 2.45
    },
    {
      "year": 1991,
      "gdpPPP": 39.001,
      "perCapitaPPP": 4206.0,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 2.75
    },
    {
      "year": 1992,
      "gdpPPP": 41.725,
      "perCapitaPPP": 4381.8,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 2.69
    },
    {
      "year": 1993,
      "gdpPPP": 44.166,
      "perCapitaPPP": 4516.0,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": 2.71
    },
    {
      "year": 1994,
      "gdpPPP": 46.688,
      "perCapitaPPP": 4648.5,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 2.7
    },
    {
      "year": 1995,
      "gdpPPP": 49.764,
      "perCapitaPPP": 4825.4,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 2.68
    },
    {
      "year": 1996,
      "gdpPPP": 52.094,
      "perCapitaPPP": 4922.2,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 2.63
    },
    {
      "year": 1997,
      "gdpPPP": 55.165,
      "perCapitaPPP": 5080.7,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 2.59
    },
    {
      "year": 1998,
      "gdpPPP": 58.351,
      "perCapitaPPP": 5238.4,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 2.59
    },
    {
      "year": 1999,
      "gdpPPP": 61.366,
      "perCapitaPPP": 5372.2,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 2.55
    },
    {
      "year": 2000,
      "gdpPPP": 64.325,
      "perCapitaPPP": 5499.0,
      "perCapitaPPPChangePct": 2.36,
      "popChangePct": 2.41
    },
    {
      "year": 2001,
      "gdpPPP": 67.815,
      "perCapitaPPP": 5665.7,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 2.32
    },
    {
      "year": 2002,
      "gdpPPP": 71.513,
      "perCapitaPPP": 5839.3,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": 2.32
    },
    {
      "year": 2003,
      "gdpPPP": 74.792,
      "perCapitaPPP": 5971.0,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 2.28
    },
    {
      "year": 2004,
      "gdpPPP": 79.213,
      "perCapitaPPP": 6184.9,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 2.24
    },
    {
      "year": 2005,
      "gdpPPP": 84.373,
      "perCapitaPPP": 6446.8,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 2.19
    },
    {
      "year": 2006,
      "gdpPPP": 91.63,
      "perCapitaPPP": 6854.7,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 2.13
    },
    {
      "year": 2007,
      "gdpPPP": 100.077,
      "perCapitaPPP": 7330.5,
      "perCapitaPPPChangePct": 6.94,
      "popChangePct": 2.13
    },
    {
      "year": 2008,
      "gdpPPP": 105.364,
      "perCapitaPPP": 7561.0,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 2.07
    },
    {
      "year": 2009,
      "gdpPPP": 106.52,
      "perCapitaPPP": 7493.1,
      "perCapitaPPPChangePct": -0.9,
      "popChangePct": 2.02
    },
    {
      "year": 2010,
      "gdpPPP": 110.924,
      "perCapitaPPP": 7649.9,
      "perCapitaPPPChangePct": 2.09,
      "popChangePct": 2.0
    },
    {
      "year": 2011,
      "gdpPPP": 117.926,
      "perCapitaPPP": 7972.2,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 2.01
    },
    {
      "year": 2012,
      "gdpPPP": 123.695,
      "perCapitaPPP": 8197.4,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 2.01
    },
    {
      "year": 2013,
      "gdpPPP": 130.449,
      "perCapitaPPP": 8477.7,
      "perCapitaPPPChangePct": 3.42,
      "popChangePct": 1.97
    },
    {
      "year": 2014,
      "gdpPPP": 138.619,
      "perCapitaPPP": 8839.5,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.92
    },
    {
      "year": 2015,
      "gdpPPP": 145.631,
      "perCapitaPPP": 9118.0,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 1.85
    },
    {
      "year": 2016,
      "gdpPPP": 150.951,
      "perCapitaPPP": 9278.6,
      "perCapitaPPPChangePct": 1.76,
      "popChangePct": 1.86
    },
    {
      "year": 2017,
      "gdpPPP": 158.387,
      "perCapitaPPP": 9560.2,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 1.83
    },
    {
      "year": 2018,
      "gdpPPP": 167.561,
      "perCapitaPPP": 9946.8,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 1.68
    },
    {
      "year": 2019,
      "gdpPPP": 183.966,
      "perCapitaPPP": 10755.9,
      "perCapitaPPPChangePct": 8.13,
      "popChangePct": 1.53
    },
    {
      "year": 2020,
      "gdpPPP": 190.017,
      "perCapitaPPP": 10947.4,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 1.48
    },
    {
      "year": 2021,
      "gdpPPP": 208.107,
      "perCapitaPPP": 11825.1,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 1.39
    },
    {
      "year": 2022,
      "gdpPPP": 232.236,
      "perCapitaPPP": 13011.9,
      "perCapitaPPPChangePct": 10.04,
      "popChangePct": 1.41
    },
    {
      "year": 2023,
      "gdpPPP": 249.337,
      "perCapitaPPP": 13756.7,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.55
    },
    {
      "year": 2024,
      "gdpPPP": 264.859,
      "perCapitaPPP": 14389.5,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 1.55
    },
    {
      "year": 2025,
      "gdpPPP": 283.589,
      "perCapitaPPP": 15194.4,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 1.4
    },
    {
      "year": 2026,
      "gdpPPP": 303.207,
      "perCapitaPPP": 16021.2,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 1.4
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 322.197,
      "perCapitaPPP": 16789.6,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 1.4
    },
    {
      "year": 2028,
      "gdpPPP": 340.323,
      "perCapitaPPP": 17496.2,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 1.36
    },
    {
      "year": 2029,
      "gdpPPP": 359.675,
      "perCapitaPPP": 18243.0,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.36
    },
    {
      "year": 2030,
      "gdpPPP": 380.496,
      "perCapitaPPP": 19043.8,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 1.34
    },
    {
      "year": 2031,
      "gdpPPP": 402.55,
      "perCapitaPPP": 19885.2,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 1.32
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GuatemalaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
