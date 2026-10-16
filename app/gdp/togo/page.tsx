import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Togo",
  "slug": "togo",
  "iso3": "TGO",
  "region": "Africa",
  "rank2026": 154,
  "flagEmoji": "🇹🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "State of Palestine",
      "slug": "state-of-palestine",
      "rank": 153
    },
    {
      "name": "Montenegro",
      "slug": "montenegro",
      "rank": 155
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.921,
      "growth": -2.3,
      "perCapita": 660.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.616,
      "growth": -3.4,
      "perCapita": 537.7,
      "popChangePct": 3.37
    },
    {
      "year": 1982,
      "gdp": 1.396,
      "growth": -3.7,
      "perCapita": 448.2,
      "popChangePct": 3.66
    },
    {
      "year": 1983,
      "gdp": 1.33,
      "growth": -5.2,
      "perCapita": 412.8,
      "popChangePct": 3.47
    },
    {
      "year": 1984,
      "gdp": 1.222,
      "growth": 5.9,
      "perCapita": 366.6,
      "popChangePct": 3.41
    },
    {
      "year": 1985,
      "gdp": 1.281,
      "growth": 3.7,
      "perCapita": 372.3,
      "popChangePct": 3.24
    },
    {
      "year": 1986,
      "gdp": 1.795,
      "growth": 3.3,
      "perCapita": 505.9,
      "popChangePct": 3.11
    },
    {
      "year": 1987,
      "gdp": 2.107,
      "growth": -2.5,
      "perCapita": 576.2,
      "popChangePct": 3.1
    },
    {
      "year": 1988,
      "gdp": 2.345,
      "growth": 10.1,
      "perCapita": 622.2,
      "popChangePct": 3.06
    },
    {
      "year": 1989,
      "gdp": 2.302,
      "growth": 4.1,
      "perCapita": 592.7,
      "popChangePct": 3.0
    },
    {
      "year": 1990,
      "gdp": 2.772,
      "growth": 5.9,
      "perCapita": 693.3,
      "popChangePct": 2.99
    },
    {
      "year": 1991,
      "gdp": 2.74,
      "growth": -0.6,
      "perCapita": 665.7,
      "popChangePct": 2.93
    },
    {
      "year": 1992,
      "gdp": 2.873,
      "growth": -3.2,
      "perCapita": 678.7,
      "popChangePct": 2.87
    },
    {
      "year": 1993,
      "gdp": 2.189,
      "growth": -16.3,
      "perCapita": 520.3,
      "popChangePct": -0.64
    },
    {
      "year": 1994,
      "gdp": 1.697,
      "growth": 13.9,
      "perCapita": 401.8,
      "popChangePct": 0.38
    },
    {
      "year": 1995,
      "gdp": 2.24,
      "growth": 19.7,
      "perCapita": 507.9,
      "popChangePct": 4.45
    },
    {
      "year": 1996,
      "gdp": 2.448,
      "growth": -3.9,
      "perCapita": 534.8,
      "popChangePct": 3.79
    },
    {
      "year": 1997,
      "gdp": 2.494,
      "growth": 3.8,
      "perCapita": 527.7,
      "popChangePct": 3.21
    },
    {
      "year": 1998,
      "gdp": 2.361,
      "growth": -2.3,
      "perCapita": 485.7,
      "popChangePct": 2.88
    },
    {
      "year": 1999,
      "gdp": 2.37,
      "growth": 2.5,
      "perCapita": 474.0,
      "popChangePct": 2.86
    },
    {
      "year": 2000,
      "gdp": 2.014,
      "growth": -1,
      "perCapita": 391.9,
      "popChangePct": 2.8
    },
    {
      "year": 2001,
      "gdp": 2,
      "growth": 0.8,
      "perCapita": 378.9,
      "popChangePct": 2.67
    },
    {
      "year": 2002,
      "gdp": 2.301,
      "growth": 3.8,
      "perCapita": 425.1,
      "popChangePct": 2.58
    },
    {
      "year": 2003,
      "gdp": 2.854,
      "growth": 6.7,
      "perCapita": 514.0,
      "popChangePct": 2.57
    },
    {
      "year": 2004,
      "gdp": 3.048,
      "growth": -1,
      "perCapita": 535.1,
      "popChangePct": 2.61
    },
    {
      "year": 2005,
      "gdp": 3.08,
      "growth": -4.7,
      "perCapita": 526.9,
      "popChangePct": 2.6
    },
    {
      "year": 2006,
      "gdp": 3.173,
      "growth": 2.7,
      "perCapita": 527.8,
      "popChangePct": 2.84
    },
    {
      "year": 2007,
      "gdp": 3.76,
      "growth": 1.2,
      "perCapita": 607.7,
      "popChangePct": 2.94
    },
    {
      "year": 2008,
      "gdp": 4.578,
      "growth": 4,
      "perCapita": 718.9,
      "popChangePct": 2.93
    },
    {
      "year": 2009,
      "gdp": 4.717,
      "growth": 5.5,
      "perCapita": 719.9,
      "popChangePct": 2.87
    },
    {
      "year": 2010,
      "gdp": 4.75,
      "growth": 5.9,
      "perCapita": 705.6,
      "popChangePct": 2.76
    },
    {
      "year": 2011,
      "gdp": 5.421,
      "growth": 5.8,
      "perCapita": 783.9,
      "popChangePct": 2.72
    },
    {
      "year": 2012,
      "gdp": 5.417,
      "growth": 6.3,
      "perCapita": 762.9,
      "popChangePct": 2.67
    },
    {
      "year": 2013,
      "gdp": 6.022,
      "growth": 5.8,
      "perCapita": 826.6,
      "popChangePct": 2.59
    },
    {
      "year": 2014,
      "gdp": 6.395,
      "growth": 5.6,
      "perCapita": 855.8,
      "popChangePct": 2.57
    },
    {
      "year": 2015,
      "gdp": 5.756,
      "growth": 5.5,
      "perCapita": 751.1,
      "popChangePct": 2.56
    },
    {
      "year": 2016,
      "gdp": 6.069,
      "growth": 5.7,
      "perCapita": 772.4,
      "popChangePct": 2.54
    },
    {
      "year": 2017,
      "gdp": 6.385,
      "growth": 4,
      "perCapita": 792.5,
      "popChangePct": 2.53
    },
    {
      "year": 2018,
      "gdp": 7.032,
      "growth": 4.8,
      "perCapita": 851.5,
      "popChangePct": 2.51
    },
    {
      "year": 2019,
      "gdp": 6.993,
      "growth": 4.9,
      "perCapita": 826.3,
      "popChangePct": 2.47
    },
    {
      "year": 2020,
      "gdp": 7.497,
      "growth": 2.2,
      "perCapita": 864.7,
      "popChangePct": 2.45
    },
    {
      "year": 2021,
      "gdp": 8.546,
      "growth": 5.1,
      "perCapita": 962.3,
      "popChangePct": 2.43
    },
    {
      "year": 2022,
      "gdp": 8.665,
      "growth": 6.3,
      "perCapita": 952.4,
      "popChangePct": 2.44
    },
    {
      "year": 2023,
      "gdp": 9.725,
      "growth": 6.2,
      "perCapita": 1043.4,
      "popChangePct": 2.44
    },
    {
      "year": 2024,
      "gdp": 10.644,
      "growth": 6.3,
      "perCapita": 1114.7,
      "popChangePct": 2.45
    },
    {
      "year": 2025,
      "gdp": 11.899,
      "growth": 5.9,
      "perCapita": 1216.5,
      "popChangePct": 2.44
    },
    {
      "year": 2026,
      "gdp": 13.437,
      "growth": 5,
      "perCapita": 1341.0,
      "popChangePct": 2.44
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 14.441,
      "growth": 5.3,
      "perCapita": 1406.9,
      "popChangePct": 2.45
    },
    {
      "year": 2028,
      "gdp": 15.498,
      "growth": 5.5,
      "perCapita": 1473.9,
      "popChangePct": 2.44
    },
    {
      "year": 2029,
      "gdp": 16.669,
      "growth": 5.5,
      "perCapita": 1547.4,
      "popChangePct": 2.44
    },
    {
      "year": 2030,
      "gdp": 17.937,
      "growth": 5.5,
      "perCapita": 1625.5,
      "popChangePct": 2.44
    },
    {
      "year": 2031,
      "gdp": 19.302,
      "growth": 5.5,
      "perCapita": 1707.5,
      "popChangePct": 2.45
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.635,
      "perCapitaPPP": 906.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.786,
      "perCapitaPPP": 927.0,
      "perCapitaPPPChangePct": 2.29,
      "popChangePct": 3.37
    },
    {
      "year": 1982,
      "gdpPPP": 2.848,
      "perCapitaPPP": 914.3,
      "perCapitaPPPChangePct": -1.37,
      "popChangePct": 3.66
    },
    {
      "year": 1983,
      "gdpPPP": 2.807,
      "perCapitaPPP": 871.0,
      "perCapitaPPPChangePct": -4.74,
      "popChangePct": 3.47
    },
    {
      "year": 1984,
      "gdpPPP": 3.079,
      "perCapitaPPP": 924.0,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": 3.41
    },
    {
      "year": 1985,
      "gdpPPP": 3.295,
      "perCapitaPPP": 957.5,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": 3.24
    },
    {
      "year": 1986,
      "gdpPPP": 3.471,
      "perCapitaPPP": 978.3,
      "perCapitaPPPChangePct": 2.17,
      "popChangePct": 3.11
    },
    {
      "year": 1987,
      "gdpPPP": 3.469,
      "perCapitaPPP": 948.3,
      "perCapitaPPPChangePct": -3.06,
      "popChangePct": 3.1
    },
    {
      "year": 1988,
      "gdpPPP": 3.954,
      "perCapitaPPP": 1049.0,
      "perCapitaPPPChangePct": 10.61,
      "popChangePct": 3.06
    },
    {
      "year": 1989,
      "gdpPPP": 4.278,
      "perCapitaPPP": 1101.6,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 3.0
    },
    {
      "year": 1990,
      "gdpPPP": 4.7,
      "perCapitaPPP": 1175.3,
      "perCapitaPPPChangePct": 6.69,
      "popChangePct": 2.99
    },
    {
      "year": 1991,
      "gdpPPP": 4.83,
      "perCapitaPPP": 1173.6,
      "perCapitaPPPChangePct": -0.14,
      "popChangePct": 2.93
    },
    {
      "year": 1992,
      "gdpPPP": 4.782,
      "perCapitaPPP": 1129.5,
      "perCapitaPPPChangePct": -3.76,
      "popChangePct": 2.87
    },
    {
      "year": 1993,
      "gdpPPP": 4.096,
      "perCapitaPPP": 973.6,
      "perCapitaPPPChangePct": -13.8,
      "popChangePct": -0.64
    },
    {
      "year": 1994,
      "gdpPPP": 4.766,
      "perCapitaPPP": 1128.7,
      "perCapitaPPPChangePct": 15.94,
      "popChangePct": 0.38
    },
    {
      "year": 1995,
      "gdpPPP": 5.825,
      "perCapitaPPP": 1320.5,
      "perCapitaPPPChangePct": 16.99,
      "popChangePct": 4.45
    },
    {
      "year": 1996,
      "gdpPPP": 5.702,
      "perCapitaPPP": 1245.5,
      "perCapitaPPPChangePct": -5.68,
      "popChangePct": 3.79
    },
    {
      "year": 1997,
      "gdpPPP": 6.021,
      "perCapitaPPP": 1274.2,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 3.21
    },
    {
      "year": 1998,
      "gdpPPP": 5.95,
      "perCapitaPPP": 1224.1,
      "perCapitaPPPChangePct": -3.93,
      "popChangePct": 2.88
    },
    {
      "year": 1999,
      "gdpPPP": 6.188,
      "perCapitaPPP": 1237.5,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": 2.86
    },
    {
      "year": 2000,
      "gdpPPP": 6.267,
      "perCapitaPPP": 1219.2,
      "perCapitaPPPChangePct": -1.48,
      "popChangePct": 2.8
    },
    {
      "year": 2001,
      "gdpPPP": 6.46,
      "perCapitaPPP": 1224.2,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 2.67
    },
    {
      "year": 2002,
      "gdpPPP": 6.812,
      "perCapitaPPP": 1258.4,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 2.58
    },
    {
      "year": 2003,
      "gdpPPP": 7.413,
      "perCapitaPPP": 1335.2,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 2.57
    },
    {
      "year": 2004,
      "gdpPPP": 7.538,
      "perCapitaPPP": 1323.3,
      "perCapitaPPPChangePct": -0.89,
      "popChangePct": 2.61
    },
    {
      "year": 2005,
      "gdpPPP": 7.411,
      "perCapitaPPP": 1268.1,
      "perCapitaPPPChangePct": -4.17,
      "popChangePct": 2.6
    },
    {
      "year": 2006,
      "gdpPPP": 7.842,
      "perCapitaPPP": 1304.7,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 2.84
    },
    {
      "year": 2007,
      "gdpPPP": 8.155,
      "perCapitaPPP": 1317.9,
      "perCapitaPPPChangePct": 1.01,
      "popChangePct": 2.94
    },
    {
      "year": 2008,
      "gdpPPP": 8.648,
      "perCapitaPPP": 1357.9,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 2.93
    },
    {
      "year": 2009,
      "gdpPPP": 9.176,
      "perCapitaPPP": 1400.5,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 2.87
    },
    {
      "year": 2010,
      "gdpPPP": 9.831,
      "perCapitaPPP": 1460.2,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 2.76
    },
    {
      "year": 2011,
      "gdpPPP": 10.618,
      "perCapitaPPP": 1535.2,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 2.72
    },
    {
      "year": 2012,
      "gdpPPP": 11.498,
      "perCapitaPPP": 1619.2,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 2.67
    },
    {
      "year": 2013,
      "gdpPPP": 12.374,
      "perCapitaPPP": 1698.5,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 2.59
    },
    {
      "year": 2014,
      "gdpPPP": 13.299,
      "perCapitaPPP": 1779.8,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 2.57
    },
    {
      "year": 2015,
      "gdpPPP": 14.157,
      "perCapitaPPP": 1847.3,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 2.56
    },
    {
      "year": 2016,
      "gdpPPP": 15.111,
      "perCapitaPPP": 1922.9,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 2.54
    },
    {
      "year": 2017,
      "gdpPPP": 15.998,
      "perCapitaPPP": 1985.5,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 2.53
    },
    {
      "year": 2018,
      "gdpPPP": 17.071,
      "perCapitaPPP": 2067.1,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 2.51
    },
    {
      "year": 2019,
      "gdpPPP": 18.743,
      "perCapitaPPP": 2214.7,
      "perCapitaPPPChangePct": 7.14,
      "popChangePct": 2.47
    },
    {
      "year": 2020,
      "gdpPPP": 20.669,
      "perCapitaPPP": 2384.1,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": 2.45
    },
    {
      "year": 2021,
      "gdpPPP": 23.428,
      "perCapitaPPP": 2637.9,
      "perCapitaPPPChangePct": 10.65,
      "popChangePct": 2.43
    },
    {
      "year": 2022,
      "gdpPPP": 26.674,
      "perCapitaPPP": 2931.8,
      "perCapitaPPPChangePct": 11.14,
      "popChangePct": 2.44
    },
    {
      "year": 2023,
      "gdpPPP": 29.376,
      "perCapitaPPP": 3151.7,
      "perCapitaPPPChangePct": 7.5,
      "popChangePct": 2.44
    },
    {
      "year": 2024,
      "gdpPPP": 32.007,
      "perCapitaPPP": 3352.2,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 2.45
    },
    {
      "year": 2025,
      "gdpPPP": 34.853,
      "perCapitaPPP": 3563.3,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 2.44
    },
    {
      "year": 2026,
      "gdpPPP": 37.644,
      "perCapitaPPP": 3756.9,
      "perCapitaPPPChangePct": 5.43,
      "popChangePct": 2.44
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 40.51,
      "perCapitaPPP": 3946.5,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 2.45
    },
    {
      "year": 2028,
      "gdpPPP": 43.44,
      "perCapitaPPP": 4131.1,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 2.44
    },
    {
      "year": 2029,
      "gdpPPP": 46.644,
      "perCapitaPPP": 4330.0,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 2.44
    },
    {
      "year": 2030,
      "gdpPPP": 50.113,
      "perCapitaPPP": 4541.3,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 2.44
    },
    {
      "year": 2031,
      "gdpPPP": 53.824,
      "perCapitaPPP": 4761.3,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 2.45
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TogoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
