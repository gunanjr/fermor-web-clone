import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Iceland",
  "slug": "iceland",
  "iso3": "ISL",
  "region": "Europe",
  "rank2026": 107,
  "flagEmoji": "🇮🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Sudan",
      "slug": "sudan",
      "rank": 106
    },
    {
      "name": "Georgia",
      "slug": "georgia",
      "rank": 108
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.528,
      "growth": 5.7,
      "perCapita": 15545.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.642,
      "growth": 4.3,
      "perCapita": 15882.2,
      "popChangePct": 0.88
    },
    {
      "year": 1982,
      "gdp": 3.347,
      "growth": 2.2,
      "perCapita": 14416.1,
      "popChangePct": 1.31
    },
    {
      "year": 1983,
      "gdp": 2.876,
      "growth": -2.2,
      "perCapita": 12210.1,
      "popChangePct": 1.72
    },
    {
      "year": 1984,
      "gdp": 2.971,
      "growth": 4.1,
      "perCapita": 12462.0,
      "popChangePct": 0.85
    },
    {
      "year": 1985,
      "gdp": 3.096,
      "growth": 3.3,
      "perCapita": 12867.0,
      "popChangePct": 1.26
    },
    {
      "year": 1986,
      "gdp": 4.132,
      "growth": 6.3,
      "perCapita": 17062.1,
      "popChangePct": 0.41
    },
    {
      "year": 1987,
      "gdp": 5.733,
      "growth": 8.5,
      "perCapita": 23480.1,
      "popChangePct": 0.83
    },
    {
      "year": 1988,
      "gdp": 6.345,
      "growth": -0.1,
      "perCapita": 25630.6,
      "popChangePct": 1.64
    },
    {
      "year": 1989,
      "gdp": 5.881,
      "growth": 0.3,
      "perCapita": 23343.3,
      "popChangePct": 1.61
    },
    {
      "year": 1990,
      "gdp": 6.709,
      "growth": 1.2,
      "perCapita": 26434.1,
      "popChangePct": 0.79
    },
    {
      "year": 1991,
      "gdp": 7.174,
      "growth": -0.2,
      "perCapita": 28039.7,
      "popChangePct": 0.79
    },
    {
      "year": 1992,
      "gdp": 7.343,
      "growth": -3.4,
      "perCapita": 28272.6,
      "popChangePct": 1.56
    },
    {
      "year": 1993,
      "gdp": 6.439,
      "growth": 1.3,
      "perCapita": 24540.2,
      "popChangePct": 0.77
    },
    {
      "year": 1994,
      "gdp": 6.611,
      "growth": 3.6,
      "perCapita": 24941.8,
      "popChangePct": 1.15
    },
    {
      "year": 1995,
      "gdp": 7.373,
      "growth": 0.1,
      "perCapita": 27615.2,
      "popChangePct": 0.75
    },
    {
      "year": 1996,
      "gdp": 7.687,
      "growth": 4.5,
      "perCapita": 28685.7,
      "popChangePct": 0.37
    },
    {
      "year": 1997,
      "gdp": 7.717,
      "growth": 4.1,
      "perCapita": 28594.0,
      "popChangePct": 0.75
    },
    {
      "year": 1998,
      "gdp": 8.638,
      "growth": 7,
      "perCapita": 31711.9,
      "popChangePct": 0.74
    },
    {
      "year": 1999,
      "gdp": 9.108,
      "growth": 3.9,
      "perCapita": 33033.2,
      "popChangePct": 1.47
    },
    {
      "year": 2000,
      "gdp": 9.14,
      "growth": 4.9,
      "perCapita": 32754.7,
      "popChangePct": 1.09
    },
    {
      "year": 2001,
      "gdp": 8.323,
      "growth": 3.8,
      "perCapita": 29373.8,
      "popChangePct": 1.43
    },
    {
      "year": 2002,
      "gdp": 9.416,
      "growth": 0.5,
      "perCapita": 32857.7,
      "popChangePct": 1.41
    },
    {
      "year": 2003,
      "gdp": 11.565,
      "growth": 2.3,
      "perCapita": 40089.6,
      "popChangePct": 0.35
    },
    {
      "year": 2004,
      "gdp": 13.964,
      "growth": 7.6,
      "perCapita": 48057.1,
      "popChangePct": 1.04
    },
    {
      "year": 2005,
      "gdp": 17.146,
      "growth": 7,
      "perCapita": 58405.2,
      "popChangePct": 1.03
    },
    {
      "year": 2006,
      "gdp": 17.672,
      "growth": 5.7,
      "perCapita": 58926.9,
      "popChangePct": 2.04
    },
    {
      "year": 2007,
      "gdp": 21.96,
      "growth": 8.7,
      "perCapita": 71375.1,
      "popChangePct": 2.67
    },
    {
      "year": 2008,
      "gdp": 18.248,
      "growth": 1.7,
      "perCapita": 57845.6,
      "popChangePct": 2.27
    },
    {
      "year": 2009,
      "gdp": 13.213,
      "growth": -8.3,
      "perCapita": 41370.9,
      "popChangePct": 1.27
    },
    {
      "year": 2010,
      "gdp": 13.923,
      "growth": -2.2,
      "perCapita": 43833.1,
      "popChangePct": -0.31
    },
    {
      "year": 2011,
      "gdp": 15.394,
      "growth": 1.4,
      "perCapita": 49364.9,
      "popChangePct": -1.89
    },
    {
      "year": 2012,
      "gdp": 14.944,
      "growth": 1.2,
      "perCapita": 47715.9,
      "popChangePct": 0.32
    },
    {
      "year": 2013,
      "gdp": 16.244,
      "growth": 3.6,
      "perCapita": 51437.0,
      "popChangePct": 0.96
    },
    {
      "year": 2014,
      "gdp": 18.052,
      "growth": 1.9,
      "perCapita": 56462.8,
      "popChangePct": 1.27
    },
    {
      "year": 2015,
      "gdp": 17.7,
      "growth": 3.8,
      "perCapita": 54796.2,
      "popChangePct": 0.94
    },
    {
      "year": 2016,
      "gdp": 21.084,
      "growth": 6.2,
      "perCapita": 64666.8,
      "popChangePct": 0.93
    },
    {
      "year": 2017,
      "gdp": 25.06,
      "growth": 3.5,
      "perCapita": 75367.1,
      "popChangePct": 2.15
    },
    {
      "year": 2018,
      "gdp": 26.678,
      "growth": 4.7,
      "perCapita": 77963.1,
      "popChangePct": 2.7
    },
    {
      "year": 2019,
      "gdp": 24.986,
      "growth": 1.1,
      "perCapita": 71496.4,
      "popChangePct": 2.05
    },
    {
      "year": 2020,
      "gdp": 22.035,
      "growth": -6.6,
      "perCapita": 62237.4,
      "popChangePct": 1.43
    },
    {
      "year": 2021,
      "gdp": 26.235,
      "growth": 5.2,
      "perCapita": 73220.8,
      "popChangePct": 1.13
    },
    {
      "year": 2022,
      "gdp": 29.176,
      "growth": 8.9,
      "perCapita": 79953.0,
      "popChangePct": 1.96
    },
    {
      "year": 2023,
      "gdp": 31.702,
      "growth": 5,
      "perCapita": 84489.6,
      "popChangePct": 2.74
    },
    {
      "year": 2024,
      "gdp": 33.187,
      "growth": -1.3,
      "perCapita": 86485.2,
      "popChangePct": 2.4
    },
    {
      "year": 2025,
      "gdp": 38.583,
      "growth": 1.3,
      "perCapita": 99070.8,
      "popChangePct": 1.3
    },
    {
      "year": 2026,
      "gdp": 43.8,
      "growth": 1.9,
      "perCapita": 110048.2,
      "popChangePct": 2.31
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 45.968,
      "growth": 2.1,
      "perCapita": 113118.7,
      "popChangePct": 2.01
    },
    {
      "year": 2028,
      "gdp": 48.085,
      "growth": 2.4,
      "perCapita": 115893.4,
      "popChangePct": 2.22
    },
    {
      "year": 2029,
      "gdp": 50.33,
      "growth": 2.4,
      "perCapita": 118925.7,
      "popChangePct": 1.93
    },
    {
      "year": 2030,
      "gdp": 52.695,
      "growth": 2.4,
      "perCapita": 122073.9,
      "popChangePct": 2.13
    },
    {
      "year": 2031,
      "gdp": 55.162,
      "growth": 2.4,
      "perCapita": 125283.0,
      "popChangePct": 1.85
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.842,
      "perCapitaPPP": 12524.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.244,
      "perCapitaPPP": 14145.4,
      "perCapitaPPPChangePct": 12.95,
      "popChangePct": 0.88
    },
    {
      "year": 1982,
      "gdpPPP": 3.519,
      "perCapitaPPP": 15154.4,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 1.31
    },
    {
      "year": 1983,
      "gdpPPP": 3.578,
      "perCapitaPPP": 15189.6,
      "perCapitaPPPChangePct": 0.23,
      "popChangePct": 1.72
    },
    {
      "year": 1984,
      "gdpPPP": 3.86,
      "perCapitaPPP": 16189.8,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 0.85
    },
    {
      "year": 1985,
      "gdpPPP": 4.113,
      "perCapitaPPP": 17094.7,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 1.26
    },
    {
      "year": 1986,
      "gdpPPP": 4.459,
      "perCapitaPPP": 18410.1,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": 0.41
    },
    {
      "year": 1987,
      "gdpPPP": 4.96,
      "perCapitaPPP": 20314.8,
      "perCapitaPPPChangePct": 10.35,
      "popChangePct": 0.83
    },
    {
      "year": 1988,
      "gdpPPP": 5.13,
      "perCapitaPPP": 20723.4,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 1.64
    },
    {
      "year": 1989,
      "gdpPPP": 5.345,
      "perCapitaPPP": 21218.2,
      "perCapitaPPPChangePct": 2.39,
      "popChangePct": 1.61
    },
    {
      "year": 1990,
      "gdpPPP": 5.61,
      "perCapitaPPP": 22105.9,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.79
    },
    {
      "year": 1991,
      "gdpPPP": 5.787,
      "perCapitaPPP": 22617.0,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 0.79
    },
    {
      "year": 1992,
      "gdpPPP": 5.719,
      "perCapitaPPP": 22019.7,
      "perCapitaPPPChangePct": -2.64,
      "popChangePct": 1.56
    },
    {
      "year": 1993,
      "gdpPPP": 5.932,
      "perCapitaPPP": 22606.3,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 0.77
    },
    {
      "year": 1994,
      "gdpPPP": 6.277,
      "perCapitaPPP": 23680.5,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 1.15
    },
    {
      "year": 1995,
      "gdpPPP": 6.416,
      "perCapitaPPP": 24031.7,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 0.75
    },
    {
      "year": 1996,
      "gdpPPP": 6.827,
      "perCapitaPPP": 25478.8,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 0.37
    },
    {
      "year": 1997,
      "gdpPPP": 7.233,
      "perCapitaPPP": 26799.8,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 0.75
    },
    {
      "year": 1998,
      "gdpPPP": 7.827,
      "perCapitaPPP": 28733.9,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 0.74
    },
    {
      "year": 1999,
      "gdpPPP": 8.247,
      "perCapitaPPP": 29910.6,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 1.47
    },
    {
      "year": 2000,
      "gdpPPP": 8.847,
      "perCapitaPPP": 31704.9,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 1.09
    },
    {
      "year": 2001,
      "gdpPPP": 9.394,
      "perCapitaPPP": 33151.6,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 1.43
    },
    {
      "year": 2002,
      "gdpPPP": 9.592,
      "perCapitaPPP": 33469.8,
      "perCapitaPPPChangePct": 0.96,
      "popChangePct": 1.41
    },
    {
      "year": 2003,
      "gdpPPP": 10.004,
      "perCapitaPPP": 34679.8,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 0.35
    },
    {
      "year": 2004,
      "gdpPPP": 11.056,
      "perCapitaPPP": 38050.0,
      "perCapitaPPPChangePct": 9.72,
      "popChangePct": 1.04
    },
    {
      "year": 2005,
      "gdpPPP": 12.204,
      "perCapitaPPP": 41571.4,
      "perCapitaPPPChangePct": 9.25,
      "popChangePct": 1.03
    },
    {
      "year": 2006,
      "gdpPPP": 13.294,
      "perCapitaPPP": 44330.5,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": 2.04
    },
    {
      "year": 2007,
      "gdpPPP": 14.848,
      "perCapitaPPP": 48259.5,
      "perCapitaPPPChangePct": 8.86,
      "popChangePct": 2.67
    },
    {
      "year": 2008,
      "gdpPPP": 15.391,
      "perCapitaPPP": 48790.3,
      "perCapitaPPPChangePct": 1.1,
      "popChangePct": 2.27
    },
    {
      "year": 2009,
      "gdpPPP": 14.198,
      "perCapitaPPP": 44455.3,
      "perCapitaPPPChangePct": -8.89,
      "popChangePct": 1.27
    },
    {
      "year": 2010,
      "gdpPPP": 14.051,
      "perCapitaPPP": 44236.6,
      "perCapitaPPPChangePct": -0.49,
      "popChangePct": -0.31
    },
    {
      "year": 2011,
      "gdpPPP": 14.539,
      "perCapitaPPP": 46622.1,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": -1.89
    },
    {
      "year": 2012,
      "gdpPPP": 14.983,
      "perCapitaPPP": 47839.7,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 0.32
    },
    {
      "year": 2013,
      "gdpPPP": 15.786,
      "perCapitaPPP": 49984.6,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.96
    },
    {
      "year": 2014,
      "gdpPPP": 16.368,
      "perCapitaPPP": 51194.9,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": 1.27
    },
    {
      "year": 2015,
      "gdpPPP": 17.142,
      "perCapitaPPP": 53068.5,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 0.94
    },
    {
      "year": 2016,
      "gdpPPP": 18.381,
      "perCapitaPPP": 56378.3,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 0.93
    },
    {
      "year": 2017,
      "gdpPPP": 19.363,
      "perCapitaPPP": 58232.2,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 2.15
    },
    {
      "year": 2018,
      "gdpPPP": 20.495,
      "perCapitaPPP": 59895.0,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 2.7
    },
    {
      "year": 2019,
      "gdpPPP": 22.092,
      "perCapitaPPP": 63215.4,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 2.05
    },
    {
      "year": 2020,
      "gdpPPP": 20.83,
      "perCapitaPPP": 58834.9,
      "perCapitaPPPChangePct": -6.93,
      "popChangePct": 1.43
    },
    {
      "year": 2021,
      "gdpPPP": 23.475,
      "perCapitaPPP": 65517.4,
      "perCapitaPPPChangePct": 11.36,
      "popChangePct": 1.13
    },
    {
      "year": 2022,
      "gdpPPP": 27.371,
      "perCapitaPPP": 75007.4,
      "perCapitaPPPChangePct": 14.48,
      "popChangePct": 1.96
    },
    {
      "year": 2023,
      "gdpPPP": 29.813,
      "perCapitaPPP": 79454.1,
      "perCapitaPPPChangePct": 5.93,
      "popChangePct": 2.74
    },
    {
      "year": 2024,
      "gdpPPP": 30.161,
      "perCapitaPPP": 78599.7,
      "perCapitaPPPChangePct": -1.08,
      "popChangePct": 2.4
    },
    {
      "year": 2025,
      "gdpPPP": 31.413,
      "perCapitaPPP": 80661.7,
      "perCapitaPPPChangePct": 2.62,
      "popChangePct": 1.3
    },
    {
      "year": 2026,
      "gdpPPP": 32.928,
      "perCapitaPPP": 82730.3,
      "perCapitaPPPChangePct": 2.56,
      "popChangePct": 2.31
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 34.358,
      "perCapitaPPP": 84548.0,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 2.01
    },
    {
      "year": 2028,
      "gdpPPP": 35.753,
      "perCapitaPPP": 86170.8,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 2.22
    },
    {
      "year": 2029,
      "gdpPPP": 37.266,
      "perCapitaPPP": 88057.9,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 1.93
    },
    {
      "year": 2030,
      "gdpPPP": 38.862,
      "perCapitaPPP": 90028.4,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 2.13
    },
    {
      "year": 2031,
      "gdpPPP": 40.503,
      "perCapitaPPP": 91990.7,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": 1.85
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IcelandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
