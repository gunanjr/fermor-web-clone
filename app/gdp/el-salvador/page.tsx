import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "El Salvador",
  "slug": "el-salvador",
  "iso3": "SLV",
  "region": "Americas",
  "rank2026": 112,
  "flagEmoji": "🇸🇻",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Senegal",
      "slug": "senegal",
      "rank": 111
    },
    {
      "name": "Haiti",
      "slug": "haiti",
      "rank": 113
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.912,
      "growth": -8.6,
      "perCapita": 802.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.449,
      "growth": -5.7,
      "perCapita": 699.3,
      "popChangePct": 1.15
    },
    {
      "year": 1982,
      "gdp": 3.406,
      "growth": -6.3,
      "perCapita": 685.1,
      "popChangePct": 0.77
    },
    {
      "year": 1983,
      "gdp": 3.261,
      "growth": 1.5,
      "perCapita": 652.1,
      "popChangePct": 0.6
    },
    {
      "year": 1984,
      "gdp": 2.385,
      "growth": 1.3,
      "perCapita": 474.0,
      "popChangePct": 0.62
    },
    {
      "year": 1985,
      "gdp": 2.319,
      "growth": 0.6,
      "perCapita": 457.2,
      "popChangePct": 0.79
    },
    {
      "year": 1986,
      "gdp": 2.335,
      "growth": 0.2,
      "perCapita": 455.7,
      "popChangePct": 1.03
    },
    {
      "year": 1987,
      "gdp": 2.374,
      "growth": 2.5,
      "perCapita": 457.8,
      "popChangePct": 1.21
    },
    {
      "year": 1988,
      "gdp": 2.771,
      "growth": 1.9,
      "perCapita": 527.0,
      "popChangePct": 1.41
    },
    {
      "year": 1989,
      "gdp": 3.167,
      "growth": 1,
      "perCapita": 592.9,
      "popChangePct": 1.58
    },
    {
      "year": 1990,
      "gdp": 4.818,
      "growth": 4.8,
      "perCapita": 886.4,
      "popChangePct": 1.74
    },
    {
      "year": 1991,
      "gdp": 5.252,
      "growth": 1.5,
      "perCapita": 953.4,
      "popChangePct": 1.36
    },
    {
      "year": 1992,
      "gdp": 5.813,
      "growth": 7,
      "perCapita": 1040.8,
      "popChangePct": 1.4
    },
    {
      "year": 1993,
      "gdp": 6.68,
      "growth": 5.8,
      "perCapita": 1180.3,
      "popChangePct": 1.32
    },
    {
      "year": 1994,
      "gdp": 7.679,
      "growth": 4.7,
      "perCapita": 1343.9,
      "popChangePct": 0.95
    },
    {
      "year": 1995,
      "gdp": 8.922,
      "growth": 4.7,
      "perCapita": 1548.4,
      "popChangePct": 0.84
    },
    {
      "year": 1996,
      "gdp": 9.586,
      "growth": 0.8,
      "perCapita": 1651.3,
      "popChangePct": 0.75
    },
    {
      "year": 1997,
      "gdp": 10.222,
      "growth": 3.1,
      "perCapita": 1748.9,
      "popChangePct": 0.69
    },
    {
      "year": 1998,
      "gdp": 10.937,
      "growth": 2.7,
      "perCapita": 1859.7,
      "popChangePct": 0.62
    },
    {
      "year": 1999,
      "gdp": 11.284,
      "growth": 2.2,
      "perCapita": 1908.1,
      "popChangePct": 0.56
    },
    {
      "year": 2000,
      "gdp": 11.785,
      "growth": 1.1,
      "perCapita": 1982.9,
      "popChangePct": 0.49
    },
    {
      "year": 2001,
      "gdp": 12.283,
      "growth": 0.9,
      "perCapita": 2058.0,
      "popChangePct": 0.42
    },
    {
      "year": 2002,
      "gdp": 12.664,
      "growth": 1.6,
      "perCapita": 2115.4,
      "popChangePct": 0.32
    },
    {
      "year": 2003,
      "gdp": 13.244,
      "growth": 1.6,
      "perCapita": 2207.8,
      "popChangePct": 0.2
    },
    {
      "year": 2004,
      "gdp": 13.725,
      "growth": 0.9,
      "perCapita": 2285.7,
      "popChangePct": 0.1
    },
    {
      "year": 2005,
      "gdp": 14.698,
      "growth": 2.7,
      "perCapita": 2447.4,
      "popChangePct": 0.02
    },
    {
      "year": 2006,
      "gdp": 16,
      "growth": 4.3,
      "perCapita": 2665.6,
      "popChangePct": -0.07
    },
    {
      "year": 2007,
      "gdp": 17.012,
      "growth": 1.9,
      "perCapita": 2830.7,
      "popChangePct": 0.13
    },
    {
      "year": 2008,
      "gdp": 17.987,
      "growth": 2.1,
      "perCapita": 2983.2,
      "popChangePct": 0.32
    },
    {
      "year": 2009,
      "gdp": 17.602,
      "growth": -2.1,
      "perCapita": 2910.2,
      "popChangePct": 0.32
    },
    {
      "year": 2010,
      "gdp": 18.448,
      "growth": 2.1,
      "perCapita": 3040.1,
      "popChangePct": 0.33
    },
    {
      "year": 2011,
      "gdp": 20.284,
      "growth": 3.8,
      "perCapita": 3330.6,
      "popChangePct": 0.36
    },
    {
      "year": 2012,
      "gdp": 21.386,
      "growth": 2.8,
      "perCapita": 3497.9,
      "popChangePct": 0.39
    },
    {
      "year": 2013,
      "gdp": 21.991,
      "growth": 2.2,
      "perCapita": 3582.3,
      "popChangePct": 0.41
    },
    {
      "year": 2014,
      "gdp": 22.593,
      "growth": 1.7,
      "perCapita": 3666.0,
      "popChangePct": 0.39
    },
    {
      "year": 2015,
      "gdp": 23.438,
      "growth": 2.4,
      "perCapita": 3790.3,
      "popChangePct": 0.34
    },
    {
      "year": 2016,
      "gdp": 24.191,
      "growth": 2.5,
      "perCapita": 3901.3,
      "popChangePct": 0.27
    },
    {
      "year": 2017,
      "gdp": 24.979,
      "growth": 2.3,
      "perCapita": 4020.1,
      "popChangePct": 0.21
    },
    {
      "year": 2018,
      "gdp": 26.021,
      "growth": 2.4,
      "perCapita": 4183.6,
      "popChangePct": 0.1
    },
    {
      "year": 2019,
      "gdp": 26.881,
      "growth": 2.4,
      "perCapita": 4320.1,
      "popChangePct": 0.03
    },
    {
      "year": 2020,
      "gdp": 24.921,
      "growth": -7.9,
      "perCapita": 3997.2,
      "popChangePct": 0.21
    },
    {
      "year": 2021,
      "gdp": 29.043,
      "growth": 11.9,
      "perCapita": 4642.6,
      "popChangePct": 0.34
    },
    {
      "year": 2022,
      "gdp": 31.87,
      "growth": 3,
      "perCapita": 5074.6,
      "popChangePct": 0.38
    },
    {
      "year": 2023,
      "gdp": 33.854,
      "growth": 3.5,
      "perCapita": 5365.5,
      "popChangePct": 0.48
    },
    {
      "year": 2024,
      "gdp": 35.365,
      "growth": 2.6,
      "perCapita": 5579.7,
      "popChangePct": 0.44
    },
    {
      "year": 2025,
      "gdp": 37.268,
      "growth": 3.7,
      "perCapita": 5839.0,
      "popChangePct": 0.71
    },
    {
      "year": 2026,
      "gdp": 39.838,
      "growth": 3.3,
      "perCapita": 6195.8,
      "popChangePct": 0.74
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 42.139,
      "growth": 3,
      "perCapita": 6508.2,
      "popChangePct": 0.7
    },
    {
      "year": 2028,
      "gdp": 44.588,
      "growth": 3,
      "perCapita": 6838.6,
      "popChangePct": 0.69
    },
    {
      "year": 2029,
      "gdp": 47.085,
      "growth": 3,
      "perCapita": 7171.3,
      "popChangePct": 0.71
    },
    {
      "year": 2030,
      "gdp": 49.568,
      "growth": 3,
      "perCapita": 7496.9,
      "popChangePct": 0.7
    },
    {
      "year": 2031,
      "gdp": 52.243,
      "growth": 3,
      "perCapita": 7846.7,
      "popChangePct": 0.7
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 11.174,
      "perCapitaPPP": 2291.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 11.531,
      "perCapitaPPP": 2337.8,
      "perCapitaPPPChangePct": 2.04,
      "popChangePct": 1.15
    },
    {
      "year": 1982,
      "gdpPPP": 11.472,
      "perCapitaPPP": 2307.6,
      "perCapitaPPPChangePct": -1.29,
      "popChangePct": 0.77
    },
    {
      "year": 1983,
      "gdpPPP": 12.104,
      "perCapitaPPP": 2420.3,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 0.6
    },
    {
      "year": 1984,
      "gdpPPP": 12.708,
      "perCapitaPPP": 2525.6,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 0.62
    },
    {
      "year": 1985,
      "gdpPPP": 13.191,
      "perCapitaPPP": 2600.7,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 0.79
    },
    {
      "year": 1986,
      "gdpPPP": 13.482,
      "perCapitaPPP": 2631.3,
      "perCapitaPPPChangePct": 1.18,
      "popChangePct": 1.03
    },
    {
      "year": 1987,
      "gdpPPP": 14.164,
      "perCapitaPPP": 2731.2,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 1.21
    },
    {
      "year": 1988,
      "gdpPPP": 14.938,
      "perCapitaPPP": 2840.7,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.41
    },
    {
      "year": 1989,
      "gdpPPP": 15.673,
      "perCapitaPPP": 2934.0,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 1.58
    },
    {
      "year": 1990,
      "gdpPPP": 17.046,
      "perCapitaPPP": 3136.4,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": 1.74
    },
    {
      "year": 1991,
      "gdpPPP": 17.886,
      "perCapitaPPP": 3246.5,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 1.36
    },
    {
      "year": 1992,
      "gdpPPP": 19.577,
      "perCapitaPPP": 3504.9,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": 1.4
    },
    {
      "year": 1993,
      "gdpPPP": 21.207,
      "perCapitaPPP": 3746.8,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": 1.32
    },
    {
      "year": 1994,
      "gdpPPP": 22.676,
      "perCapitaPPP": 3968.4,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 0.95
    },
    {
      "year": 1995,
      "gdpPPP": 24.247,
      "perCapitaPPP": 4208.1,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 0.84
    },
    {
      "year": 1996,
      "gdpPPP": 24.893,
      "perCapitaPPP": 4288.0,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": 0.75
    },
    {
      "year": 1997,
      "gdpPPP": 26.116,
      "perCapitaPPP": 4468.5,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 0.69
    },
    {
      "year": 1998,
      "gdpPPP": 27.111,
      "perCapitaPPP": 4610.1,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 0.62
    },
    {
      "year": 1999,
      "gdpPPP": 28.089,
      "perCapitaPPP": 4749.6,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 0.56
    },
    {
      "year": 2000,
      "gdpPPP": 29.048,
      "perCapitaPPP": 4887.5,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 0.49
    },
    {
      "year": 2001,
      "gdpPPP": 29.963,
      "perCapitaPPP": 5020.5,
      "perCapitaPPPChangePct": 2.72,
      "popChangePct": 0.42
    },
    {
      "year": 2002,
      "gdpPPP": 30.91,
      "perCapitaPPP": 5163.1,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.32
    },
    {
      "year": 2003,
      "gdpPPP": 32.012,
      "perCapitaPPP": 5336.6,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 0.2
    },
    {
      "year": 2004,
      "gdpPPP": 33.166,
      "perCapitaPPP": 5523.3,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 0.1
    },
    {
      "year": 2005,
      "gdpPPP": 35.132,
      "perCapitaPPP": 5849.9,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 0.02
    },
    {
      "year": 2006,
      "gdpPPP": 37.788,
      "perCapitaPPP": 6295.6,
      "perCapitaPPPChangePct": 7.62,
      "popChangePct": -0.07
    },
    {
      "year": 2007,
      "gdpPPP": 39.534,
      "perCapitaPPP": 6578.3,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 0.13
    },
    {
      "year": 2008,
      "gdpPPP": 41.153,
      "perCapitaPPP": 6825.5,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": 0.32
    },
    {
      "year": 2009,
      "gdpPPP": 40.544,
      "perCapitaPPP": 6703.4,
      "perCapitaPPPChangePct": -1.79,
      "popChangePct": 0.32
    },
    {
      "year": 2010,
      "gdpPPP": 41.901,
      "perCapitaPPP": 6905.0,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 0.33
    },
    {
      "year": 2011,
      "gdpPPP": 44.396,
      "perCapitaPPP": 7289.8,
      "perCapitaPPPChangePct": 5.57,
      "popChangePct": 0.36
    },
    {
      "year": 2012,
      "gdpPPP": 46.495,
      "perCapitaPPP": 7604.7,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 0.39
    },
    {
      "year": 2013,
      "gdpPPP": 48.345,
      "perCapitaPPP": 7875.3,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 0.41
    },
    {
      "year": 2014,
      "gdpPPP": 50.028,
      "perCapitaPPP": 8117.5,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 0.39
    },
    {
      "year": 2015,
      "gdpPPP": 51.702,
      "perCapitaPPP": 8361.0,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 0.34
    },
    {
      "year": 2016,
      "gdpPPP": 53.52,
      "perCapitaPPP": 8631.1,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": 0.27
    },
    {
      "year": 2017,
      "gdpPPP": 55.706,
      "perCapitaPPP": 8965.3,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 0.21
    },
    {
      "year": 2018,
      "gdpPPP": 57.246,
      "perCapitaPPP": 9203.8,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 0.1
    },
    {
      "year": 2019,
      "gdpPPP": 60.71,
      "perCapitaPPP": 9756.8,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 0.03
    },
    {
      "year": 2020,
      "gdpPPP": 58.56,
      "perCapitaPPP": 9392.6,
      "perCapitaPPPChangePct": -3.73,
      "popChangePct": 0.21
    },
    {
      "year": 2021,
      "gdpPPP": 67.623,
      "perCapitaPPP": 10809.7,
      "perCapitaPPPChangePct": 15.09,
      "popChangePct": 0.34
    },
    {
      "year": 2022,
      "gdpPPP": 74.573,
      "perCapitaPPP": 11874.1,
      "perCapitaPPPChangePct": 9.85,
      "popChangePct": 0.38
    },
    {
      "year": 2023,
      "gdpPPP": 80.069,
      "perCapitaPPP": 12690.0,
      "perCapitaPPPChangePct": 6.87,
      "popChangePct": 0.48
    },
    {
      "year": 2024,
      "gdpPPP": 84.192,
      "perCapitaPPP": 13283.3,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 0.44
    },
    {
      "year": 2025,
      "gdpPPP": 89.784,
      "perCapitaPPP": 14067.0,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 0.71
    },
    {
      "year": 2026,
      "gdpPPP": 95.404,
      "perCapitaPPP": 14837.7,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 0.74
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 100.424,
      "perCapitaPPP": 15509.9,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 0.7
    },
    {
      "year": 2028,
      "gdpPPP": 105.134,
      "perCapitaPPP": 16124.5,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 0.69
    },
    {
      "year": 2029,
      "gdpPPP": 110.214,
      "perCapitaPPP": 16786.1,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 0.71
    },
    {
      "year": 2030,
      "gdpPPP": 115.606,
      "perCapitaPPP": 17485.0,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 0.7
    },
    {
      "year": 2031,
      "gdpPPP": 121.224,
      "perCapitaPPP": 18207.2,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 0.7
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ElSalvadorGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
