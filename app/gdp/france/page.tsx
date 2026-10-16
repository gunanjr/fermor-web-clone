import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "France",
  "slug": "france",
  "iso3": "FRA",
  "region": "Europe",
  "rank2026": 7,
  "flagEmoji": "🇫🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "India",
      "slug": "india",
      "rank": 6
    },
    {
      "name": "Italy",
      "slug": "italy",
      "rank": 8
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 695.475,
      "growth": 1.8,
      "perCapita": 12623.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 612.552,
      "growth": 1.2,
      "perCapita": 11057.5,
      "popChangePct": 0.55
    },
    {
      "year": 1982,
      "gdp": 581.254,
      "growth": 2.4,
      "perCapita": 10433.4,
      "popChangePct": 0.57
    },
    {
      "year": 1983,
      "gdp": 555.956,
      "growth": 1.3,
      "perCapita": 9921.8,
      "popChangePct": 0.58
    },
    {
      "year": 1984,
      "gdp": 526.671,
      "growth": 1.7,
      "perCapita": 9357.2,
      "popChangePct": 0.45
    },
    {
      "year": 1985,
      "gdp": 551.596,
      "growth": 1.7,
      "perCapita": 9753.4,
      "popChangePct": 0.48
    },
    {
      "year": 1986,
      "gdp": 766.302,
      "growth": 2.3,
      "perCapita": 13487.8,
      "popChangePct": 0.46
    },
    {
      "year": 1987,
      "gdp": 927.257,
      "growth": 2.6,
      "perCapita": 16241.5,
      "popChangePct": 0.49
    },
    {
      "year": 1988,
      "gdp": 1012.843,
      "growth": 4.7,
      "perCapita": 17650.4,
      "popChangePct": 0.51
    },
    {
      "year": 1989,
      "gdp": 1017.702,
      "growth": 4.6,
      "perCapita": 17639.4,
      "popChangePct": 0.54
    },
    {
      "year": 1990,
      "gdp": 1260.874,
      "growth": 2.8,
      "perCapita": 21735.5,
      "popChangePct": 0.55
    },
    {
      "year": 1991,
      "gdp": 1263.244,
      "growth": 1.3,
      "perCapita": 21675.4,
      "popChangePct": 0.47
    },
    {
      "year": 1992,
      "gdp": 1392.563,
      "growth": 1.4,
      "perCapita": 23775.5,
      "popChangePct": 0.5
    },
    {
      "year": 1993,
      "gdp": 1315.795,
      "growth": -0.4,
      "perCapita": 22357.7,
      "popChangePct": 0.48
    },
    {
      "year": 1994,
      "gdp": 1388.477,
      "growth": 2.4,
      "perCapita": 23505.6,
      "popChangePct": 0.37
    },
    {
      "year": 1995,
      "gdp": 1596.25,
      "growth": 2.5,
      "perCapita": 26927.0,
      "popChangePct": 0.36
    },
    {
      "year": 1996,
      "gdp": 1599.248,
      "growth": 1.3,
      "perCapita": 26883.8,
      "popChangePct": 0.35
    },
    {
      "year": 1997,
      "gdp": 1451.058,
      "growth": 2.5,
      "perCapita": 24309.4,
      "popChangePct": 0.34
    },
    {
      "year": 1998,
      "gdp": 1498.974,
      "growth": 3.5,
      "perCapita": 25024.9,
      "popChangePct": 0.35
    },
    {
      "year": 1999,
      "gdp": 1488.392,
      "growth": 3.3,
      "perCapita": 24755.9,
      "popChangePct": 0.37
    },
    {
      "year": 2000,
      "gdp": 1361.56,
      "growth": 4.4,
      "perCapita": 22502.1,
      "popChangePct": 0.64
    },
    {
      "year": 2001,
      "gdp": 1370.386,
      "growth": 1.8,
      "perCapita": 22486.9,
      "popChangePct": 0.72
    },
    {
      "year": 2002,
      "gdp": 1491.373,
      "growth": 1.1,
      "perCapita": 24295.4,
      "popChangePct": 0.73
    },
    {
      "year": 2003,
      "gdp": 1834.637,
      "growth": 1,
      "perCapita": 29675.1,
      "popChangePct": 0.72
    },
    {
      "year": 2004,
      "gdp": 2108.835,
      "growth": 2.5,
      "perCapita": 33876.3,
      "popChangePct": 0.69
    },
    {
      "year": 2005,
      "gdp": 2193.358,
      "growth": 2,
      "perCapita": 34964.8,
      "popChangePct": 0.77
    },
    {
      "year": 2006,
      "gdp": 2317.985,
      "growth": 2.9,
      "perCapita": 36685.0,
      "popChangePct": 0.73
    },
    {
      "year": 2007,
      "gdp": 2656.13,
      "growth": 2.5,
      "perCapita": 41762.6,
      "popChangePct": 0.66
    },
    {
      "year": 2008,
      "gdp": 2926.483,
      "growth": 0.3,
      "perCapita": 45753.6,
      "popChangePct": 0.57
    },
    {
      "year": 2009,
      "gdp": 2697.144,
      "growth": -2.7,
      "perCapita": 41943.3,
      "popChangePct": 0.54
    },
    {
      "year": 2010,
      "gdp": 2648.391,
      "growth": 1.8,
      "perCapita": 40988.6,
      "popChangePct": 0.48
    },
    {
      "year": 2011,
      "gdp": 2869.903,
      "growth": 2.5,
      "perCapita": 44197.6,
      "popChangePct": 0.5
    },
    {
      "year": 2012,
      "gdp": 2684.706,
      "growth": 0.2,
      "perCapita": 41150.5,
      "popChangePct": 0.47
    },
    {
      "year": 2013,
      "gdp": 2816.119,
      "growth": 0.9,
      "perCapita": 42951.7,
      "popChangePct": 0.5
    },
    {
      "year": 2014,
      "gdp": 2861.973,
      "growth": 1,
      "perCapita": 43277.4,
      "popChangePct": 0.86
    },
    {
      "year": 2015,
      "gdp": 2442.731,
      "growth": 1,
      "perCapita": 36775.7,
      "popChangePct": 0.44
    },
    {
      "year": 2016,
      "gdp": 2469.726,
      "growth": 0.7,
      "perCapita": 37081.5,
      "popChangePct": 0.27
    },
    {
      "year": 2017,
      "gdp": 2587.955,
      "growth": 2.3,
      "perCapita": 38756.7,
      "popChangePct": 0.26
    },
    {
      "year": 2018,
      "gdp": 2782.838,
      "growth": 1.6,
      "perCapita": 41539.8,
      "popChangePct": 0.33
    },
    {
      "year": 2019,
      "gdp": 2723.094,
      "growth": 2.1,
      "perCapita": 40487.3,
      "popChangePct": 0.4
    },
    {
      "year": 2020,
      "gdp": 2645.806,
      "growth": -7.6,
      "perCapita": 39230.9,
      "popChangePct": 0.27
    },
    {
      "year": 2021,
      "gdp": 2968.405,
      "growth": 6.8,
      "perCapita": 43848.3,
      "popChangePct": 0.38
    },
    {
      "year": 2022,
      "gdp": 2796.987,
      "growth": 2.8,
      "perCapita": 41095.8,
      "popChangePct": 0.54
    },
    {
      "year": 2023,
      "gdp": 3061.095,
      "growth": 1.6,
      "perCapita": 44749.7,
      "popChangePct": 0.51
    },
    {
      "year": 2024,
      "gdp": 3161.042,
      "growth": 1.1,
      "perCapita": 46053.6,
      "popChangePct": 0.34
    },
    {
      "year": 2025,
      "gdp": 3368.925,
      "growth": 0.9,
      "perCapita": 48929.9,
      "popChangePct": 0.31
    },
    {
      "year": 2026,
      "gdp": 3596.094,
      "growth": 0.9,
      "perCapita": 52083.3,
      "popChangePct": 0.28
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3672.073,
      "growth": 0.9,
      "perCapita": 53035.1,
      "popChangePct": 0.28
    },
    {
      "year": 2028,
      "gdp": 3775.707,
      "growth": 1.2,
      "perCapita": 54379.4,
      "popChangePct": 0.28
    },
    {
      "year": 2029,
      "gdp": 3888.624,
      "growth": 1.2,
      "perCapita": 55849.1,
      "popChangePct": 0.28
    },
    {
      "year": 2030,
      "gdp": 4004.118,
      "growth": 1.1,
      "perCapita": 57347.1,
      "popChangePct": 0.28
    },
    {
      "year": 2031,
      "gdp": 4116.865,
      "growth": 1.1,
      "perCapita": 58797.0,
      "popChangePct": 0.28
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 592.726,
      "perCapitaPPP": 10758.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 656.502,
      "perCapitaPPP": 11850.9,
      "perCapitaPPPChangePct": 10.15,
      "popChangePct": 0.55
    },
    {
      "year": 1982,
      "gdpPPP": 713.825,
      "perCapitaPPP": 12813.0,
      "perCapitaPPPChangePct": 8.12,
      "popChangePct": 0.57
    },
    {
      "year": 1983,
      "gdpPPP": 751.143,
      "perCapitaPPP": 13405.1,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 0.58
    },
    {
      "year": 1984,
      "gdpPPP": 791.275,
      "perCapitaPPP": 14058.3,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 0.45
    },
    {
      "year": 1985,
      "gdpPPP": 829.928,
      "perCapitaPPP": 14674.9,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 0.48
    },
    {
      "year": 1986,
      "gdpPPP": 866.324,
      "perCapitaPPP": 15248.3,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 0.46
    },
    {
      "year": 1987,
      "gdpPPP": 910.585,
      "perCapitaPPP": 15949.5,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 0.49
    },
    {
      "year": 1988,
      "gdpPPP": 986.722,
      "perCapitaPPP": 17195.2,
      "perCapitaPPPChangePct": 7.81,
      "popChangePct": 0.51
    },
    {
      "year": 1989,
      "gdpPPP": 1072.428,
      "perCapitaPPP": 18587.9,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 0.54
    },
    {
      "year": 1990,
      "gdpPPP": 1143.631,
      "perCapitaPPP": 19714.5,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 0.55
    },
    {
      "year": 1991,
      "gdpPPP": 1197.588,
      "perCapitaPPP": 20548.8,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 0.47
    },
    {
      "year": 1992,
      "gdpPPP": 1242.13,
      "perCapitaPPP": 21207.2,
      "perCapitaPPPChangePct": 3.2,
      "popChangePct": 0.5
    },
    {
      "year": 1993,
      "gdpPPP": 1266.159,
      "perCapitaPPP": 21514.3,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 0.48
    },
    {
      "year": 1994,
      "gdpPPP": 1324.269,
      "perCapitaPPP": 22418.6,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 0.37
    },
    {
      "year": 1995,
      "gdpPPP": 1385.256,
      "perCapitaPPP": 23367.8,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 0.36
    },
    {
      "year": 1996,
      "gdpPPP": 1429.615,
      "perCapitaPPP": 24032.2,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.35
    },
    {
      "year": 1997,
      "gdpPPP": 1490.844,
      "perCapitaPPP": 24976.0,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 0.34
    },
    {
      "year": 1998,
      "gdpPPP": 1559.855,
      "perCapitaPPP": 26041.3,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 0.35
    },
    {
      "year": 1999,
      "gdpPPP": 1633.51,
      "perCapitaPPP": 27169.6,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 0.37
    },
    {
      "year": 2000,
      "gdpPPP": 1743.459,
      "perCapitaPPP": 28813.6,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 0.64
    },
    {
      "year": 2001,
      "gdpPPP": 1815.553,
      "perCapitaPPP": 29791.8,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 0.72
    },
    {
      "year": 2002,
      "gdpPPP": 1864.48,
      "perCapitaPPP": 30373.5,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": 0.73
    },
    {
      "year": 2003,
      "gdpPPP": 1920.114,
      "perCapitaPPP": 31057.7,
      "perCapitaPPPChangePct": 2.25,
      "popChangePct": 0.72
    },
    {
      "year": 2004,
      "gdpPPP": 2021.521,
      "perCapitaPPP": 32473.7,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 0.69
    },
    {
      "year": 2005,
      "gdpPPP": 2126.282,
      "perCapitaPPP": 33895.5,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 0.77
    },
    {
      "year": 2006,
      "gdpPPP": 2256.091,
      "perCapitaPPP": 35705.5,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 0.73
    },
    {
      "year": 2007,
      "gdpPPP": 2374.773,
      "perCapitaPPP": 37338.8,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.66
    },
    {
      "year": 2008,
      "gdpPPP": 2426.877,
      "perCapitaPPP": 37942.6,
      "perCapitaPPPChangePct": 1.62,
      "popChangePct": 0.57
    },
    {
      "year": 2009,
      "gdpPPP": 2375.172,
      "perCapitaPPP": 36936.3,
      "perCapitaPPPChangePct": -2.65,
      "popChangePct": 0.54
    },
    {
      "year": 2010,
      "gdpPPP": 2448.236,
      "perCapitaPPP": 37890.8,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 0.48
    },
    {
      "year": 2011,
      "gdpPPP": 2560.809,
      "perCapitaPPP": 39437.5,
      "perCapitaPPPChangePct": 4.08,
      "popChangePct": 0.5
    },
    {
      "year": 2012,
      "gdpPPP": 2614.465,
      "perCapitaPPP": 40073.8,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 0.47
    },
    {
      "year": 2013,
      "gdpPPP": 2683.596,
      "perCapitaPPP": 40930.5,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 0.5
    },
    {
      "year": 2014,
      "gdpPPP": 2757.618,
      "perCapitaPPP": 41699.4,
      "perCapitaPPPChangePct": 1.88,
      "popChangePct": 0.86
    },
    {
      "year": 2015,
      "gdpPPP": 2810.992,
      "perCapitaPPP": 42319.9,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 0.44
    },
    {
      "year": 2016,
      "gdpPPP": 2858.554,
      "perCapitaPPP": 42919.5,
      "perCapitaPPPChangePct": 1.42,
      "popChangePct": 0.27
    },
    {
      "year": 2017,
      "gdpPPP": 2975.79,
      "perCapitaPPP": 44564.8,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 0.26
    },
    {
      "year": 2018,
      "gdpPPP": 3114.876,
      "perCapitaPPP": 46496.1,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 0.33
    },
    {
      "year": 2019,
      "gdpPPP": 3445.275,
      "perCapitaPPP": 51224.8,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": 0.4
    },
    {
      "year": 2020,
      "gdpPPP": 3345.026,
      "perCapitaPPP": 49598.7,
      "perCapitaPPPChangePct": -3.17,
      "popChangePct": 0.27
    },
    {
      "year": 2021,
      "gdpPPP": 3656.802,
      "perCapitaPPP": 54017.1,
      "perCapitaPPPChangePct": 8.91,
      "popChangePct": 0.38
    },
    {
      "year": 2022,
      "gdpPPP": 4026.451,
      "perCapitaPPP": 59160.1,
      "perCapitaPPPChangePct": 9.52,
      "popChangePct": 0.54
    },
    {
      "year": 2023,
      "gdpPPP": 4243.08,
      "perCapitaPPP": 62028.9,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 0.51
    },
    {
      "year": 2024,
      "gdpPPP": 4396.548,
      "perCapitaPPP": 64053.8,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.34
    },
    {
      "year": 2025,
      "gdpPPP": 4563.23,
      "perCapitaPPP": 66275.9,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": 0.31
    },
    {
      "year": 2026,
      "gdpPPP": 4734.241,
      "perCapitaPPP": 68567.5,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 0.28
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 4880.588,
      "perCapitaPPP": 70489.4,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 0.28
    },
    {
      "year": 2028,
      "gdpPPP": 5021.057,
      "perCapitaPPP": 72315.5,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 0.28
    },
    {
      "year": 2029,
      "gdpPPP": 5169.633,
      "perCapitaPPP": 74247.2,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 0.28
    },
    {
      "year": 2030,
      "gdpPPP": 5322.852,
      "perCapitaPPP": 76234.0,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 0.28
    },
    {
      "year": 2031,
      "gdpPPP": 5476.255,
      "perCapitaPPP": 78211.8,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 0.28
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function FranceGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
