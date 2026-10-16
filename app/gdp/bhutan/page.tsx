import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bhutan",
  "slug": "bhutan",
  "iso3": "BTN",
  "region": "Asia",
  "rank2026": 179,
  "flagEmoji": "🇧🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Aruba",
      "slug": "aruba",
      "rank": 177
    },
    {
      "name": "Central African Republic",
      "slug": "central-african-republic",
      "rank": 180
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.132,
      "growth": 5,
      "perCapita": 310.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.143,
      "growth": 13.6,
      "perCapita": 326.5,
      "popChangePct": 2.58
    },
    {
      "year": 1982,
      "gdp": 0.15,
      "growth": 8.2,
      "perCapita": 334.8,
      "popChangePct": 2.51
    },
    {
      "year": 1983,
      "gdp": 0.162,
      "growth": 7.3,
      "perCapita": 353.0,
      "popChangePct": 2.45
    },
    {
      "year": 1984,
      "gdp": 0.168,
      "growth": 7.6,
      "perCapita": 356.6,
      "popChangePct": 2.39
    },
    {
      "year": 1985,
      "gdp": 0.174,
      "growth": 4.3,
      "perCapita": 359.0,
      "popChangePct": 2.76
    },
    {
      "year": 1986,
      "gdp": 0.197,
      "growth": 8,
      "perCapita": 393.2,
      "popChangePct": 3.31
    },
    {
      "year": 1987,
      "gdp": 0.238,
      "growth": 20.2,
      "perCapita": 460.1,
      "popChangePct": 3.4
    },
    {
      "year": 1988,
      "gdp": 0.273,
      "growth": 15.1,
      "perCapita": 510.8,
      "popChangePct": 3.29
    },
    {
      "year": 1989,
      "gdp": 0.272,
      "growth": 6.2,
      "perCapita": 497.5,
      "popChangePct": 2.43
    },
    {
      "year": 1990,
      "gdp": 0.293,
      "growth": 9.1,
      "perCapita": 529.3,
      "popChangePct": 1.28
    },
    {
      "year": 1991,
      "gdp": 0.254,
      "growth": 4.9,
      "perCapita": 459.0,
      "popChangePct": -0.18
    },
    {
      "year": 1992,
      "gdp": 0.248,
      "growth": 2.1,
      "perCapita": 455.5,
      "popChangePct": -1.45
    },
    {
      "year": 1993,
      "gdp": 0.26,
      "growth": 3.2,
      "perCapita": 484.3,
      "popChangePct": -1.65
    },
    {
      "year": 1994,
      "gdp": 0.263,
      "growth": 2.2,
      "perCapita": 498.3,
      "popChangePct": -1.31
    },
    {
      "year": 1995,
      "gdp": 0.308,
      "growth": 6,
      "perCapita": 586.0,
      "popChangePct": -0.57
    },
    {
      "year": 1996,
      "gdp": 0.324,
      "growth": 6,
      "perCapita": 611.2,
      "popChangePct": 0.76
    },
    {
      "year": 1997,
      "gdp": 0.362,
      "growth": 5.5,
      "perCapita": 673.6,
      "popChangePct": 1.51
    },
    {
      "year": 1998,
      "gdp": 0.398,
      "growth": 6,
      "perCapita": 721.9,
      "popChangePct": 2.6
    },
    {
      "year": 1999,
      "gdp": 0.418,
      "growth": 7.1,
      "perCapita": 736.6,
      "popChangePct": 2.72
    },
    {
      "year": 2000,
      "gdp": 0.454,
      "growth": 6.9,
      "perCapita": 780.0,
      "popChangePct": 2.65
    },
    {
      "year": 2001,
      "gdp": 0.474,
      "growth": 7,
      "perCapita": 789.8,
      "popChangePct": 3.09
    },
    {
      "year": 2002,
      "gdp": 0.517,
      "growth": 9.5,
      "perCapita": 836.7,
      "popChangePct": 3.0
    },
    {
      "year": 2003,
      "gdp": 0.616,
      "growth": 9,
      "perCapita": 976.2,
      "popChangePct": 2.1
    },
    {
      "year": 2004,
      "gdp": 0.7,
      "growth": 6.4,
      "perCapita": 1086.5,
      "popChangePct": 2.06
    },
    {
      "year": 2005,
      "gdp": 0.818,
      "growth": 6.1,
      "perCapita": 1245.9,
      "popChangePct": 1.86
    },
    {
      "year": 2006,
      "gdp": 0.876,
      "growth": 6.3,
      "perCapita": 1314.2,
      "popChangePct": 1.52
    },
    {
      "year": 2007,
      "gdp": 1.071,
      "growth": 11,
      "perCapita": 1587.2,
      "popChangePct": 1.35
    },
    {
      "year": 2008,
      "gdp": 1.359,
      "growth": 9.9,
      "perCapita": 1991.2,
      "popChangePct": 1.04
    },
    {
      "year": 2009,
      "gdp": 1.273,
      "growth": 6.1,
      "perCapita": 1844.0,
      "popChangePct": 1.17
    },
    {
      "year": 2010,
      "gdp": 1.529,
      "growth": 10.3,
      "perCapita": 2190.7,
      "popChangePct": 1.16
    },
    {
      "year": 2011,
      "gdp": 1.88,
      "growth": 10.5,
      "perCapita": 2665.2,
      "popChangePct": 1.15
    },
    {
      "year": 2012,
      "gdp": 1.966,
      "growth": 6.8,
      "perCapita": 2756.1,
      "popChangePct": 0.99
    },
    {
      "year": 2013,
      "gdp": 1.995,
      "growth": 3.4,
      "perCapita": 2766.1,
      "popChangePct": 1.12
    },
    {
      "year": 2014,
      "gdp": 1.962,
      "growth": 3.8,
      "perCapita": 2691.3,
      "popChangePct": 1.11
    },
    {
      "year": 2015,
      "gdp": 2.159,
      "growth": 6.3,
      "perCapita": 2929.4,
      "popChangePct": 1.1
    },
    {
      "year": 2016,
      "gdp": 2.252,
      "growth": 7.6,
      "perCapita": 3025.3,
      "popChangePct": 0.95
    },
    {
      "year": 2017,
      "gdp": 2.462,
      "growth": 5.2,
      "perCapita": 3278.3,
      "popChangePct": 0.94
    },
    {
      "year": 2018,
      "gdp": 2.651,
      "growth": 2.8,
      "perCapita": 3501.4,
      "popChangePct": 0.8
    },
    {
      "year": 2019,
      "gdp": 2.618,
      "growth": 4.6,
      "perCapita": 3434.5,
      "popChangePct": 0.66
    },
    {
      "year": 2020,
      "gdp": 2.586,
      "growth": -2.5,
      "perCapita": 3369.9,
      "popChangePct": 0.66
    },
    {
      "year": 2021,
      "gdp": 2.621,
      "growth": -3.3,
      "perCapita": 3392.0,
      "popChangePct": 0.78
    },
    {
      "year": 2022,
      "gdp": 2.866,
      "growth": 4.8,
      "perCapita": 3682.8,
      "popChangePct": 0.65
    },
    {
      "year": 2023,
      "gdp": 2.92,
      "growth": 4.9,
      "perCapita": 3726.5,
      "popChangePct": 0.77
    },
    {
      "year": 2024,
      "gdp": 3.147,
      "growth": 6.1,
      "perCapita": 3989.3,
      "popChangePct": 0.64
    },
    {
      "year": 2025,
      "gdp": 3.474,
      "growth": 7.1,
      "perCapita": 4394.1,
      "popChangePct": 0.25
    },
    {
      "year": 2026,
      "gdp": 3.856,
      "growth": 7.5,
      "perCapita": 4867.0,
      "popChangePct": 0.13
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 4.247,
      "growth": 6.3,
      "perCapita": 5349.4,
      "popChangePct": 0.25
    },
    {
      "year": 2028,
      "gdp": 4.654,
      "growth": 5.8,
      "perCapita": 5814.4,
      "popChangePct": 0.76
    },
    {
      "year": 2029,
      "gdp": 5.161,
      "growth": 7.2,
      "perCapita": 6397.5,
      "popChangePct": 0.88
    },
    {
      "year": 2030,
      "gdp": 5.684,
      "growth": 6.4,
      "perCapita": 6993.6,
      "popChangePct": 0.74
    },
    {
      "year": 2031,
      "gdp": 6.209,
      "growth": 5.6,
      "perCapita": 7584.3,
      "popChangePct": 0.74
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.242,
      "perCapitaPPP": 566.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.301,
      "perCapitaPPP": 686.4,
      "perCapitaPPPChangePct": 21.11,
      "popChangePct": 2.58
    },
    {
      "year": 1982,
      "gdpPPP": 0.345,
      "perCapitaPPP": 768.6,
      "perCapitaPPPChangePct": 11.98,
      "popChangePct": 2.51
    },
    {
      "year": 1983,
      "gdpPPP": 0.385,
      "perCapitaPPP": 838.1,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": 2.45
    },
    {
      "year": 1984,
      "gdpPPP": 0.429,
      "perCapitaPPP": 911.9,
      "perCapitaPPPChangePct": 8.81,
      "popChangePct": 2.39
    },
    {
      "year": 1985,
      "gdpPPP": 0.462,
      "perCapitaPPP": 954.4,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 2.76
    },
    {
      "year": 1986,
      "gdpPPP": 0.509,
      "perCapitaPPP": 1018.5,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 3.31
    },
    {
      "year": 1987,
      "gdpPPP": 0.627,
      "perCapitaPPP": 1212.3,
      "perCapitaPPPChangePct": 19.03,
      "popChangePct": 3.4
    },
    {
      "year": 1988,
      "gdpPPP": 0.747,
      "perCapitaPPP": 1399.6,
      "perCapitaPPPChangePct": 15.45,
      "popChangePct": 3.29
    },
    {
      "year": 1989,
      "gdpPPP": 0.825,
      "perCapitaPPP": 1506.7,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": 2.43
    },
    {
      "year": 1990,
      "gdpPPP": 0.933,
      "perCapitaPPP": 1686.2,
      "perCapitaPPPChangePct": 11.91,
      "popChangePct": 1.28
    },
    {
      "year": 1991,
      "gdpPPP": 1.012,
      "perCapitaPPP": 1832.1,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": -0.18
    },
    {
      "year": 1992,
      "gdpPPP": 1.057,
      "perCapitaPPP": 1938.2,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": -1.45
    },
    {
      "year": 1993,
      "gdpPPP": 1.116,
      "perCapitaPPP": 2083.0,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": -1.65
    },
    {
      "year": 1994,
      "gdpPPP": 1.166,
      "perCapitaPPP": 2204.7,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": -1.31
    },
    {
      "year": 1995,
      "gdpPPP": 1.262,
      "perCapitaPPP": 2400.4,
      "perCapitaPPPChangePct": 8.88,
      "popChangePct": -0.57
    },
    {
      "year": 1996,
      "gdpPPP": 1.362,
      "perCapitaPPP": 2570.2,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 0.76
    },
    {
      "year": 1997,
      "gdpPPP": 1.462,
      "perCapitaPPP": 2717.1,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.51
    },
    {
      "year": 1998,
      "gdpPPP": 1.567,
      "perCapitaPPP": 2841.8,
      "perCapitaPPPChangePct": 4.59,
      "popChangePct": 2.6
    },
    {
      "year": 1999,
      "gdpPPP": 1.702,
      "perCapitaPPP": 3001.9,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 2.72
    },
    {
      "year": 2000,
      "gdpPPP": 1.861,
      "perCapitaPPP": 3195.5,
      "perCapitaPPPChangePct": 6.45,
      "popChangePct": 2.65
    },
    {
      "year": 2001,
      "gdpPPP": 2.037,
      "perCapitaPPP": 3395.1,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 3.09
    },
    {
      "year": 2002,
      "gdpPPP": 2.266,
      "perCapitaPPP": 3668.6,
      "perCapitaPPPChangePct": 8.06,
      "popChangePct": 3.0
    },
    {
      "year": 2003,
      "gdpPPP": 2.52,
      "perCapitaPPP": 3992.7,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 2.1
    },
    {
      "year": 2004,
      "gdpPPP": 2.753,
      "perCapitaPPP": 4274.9,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 2.06
    },
    {
      "year": 2005,
      "gdpPPP": 3.012,
      "perCapitaPPP": 4590.2,
      "perCapitaPPPChangePct": 7.38,
      "popChangePct": 1.86
    },
    {
      "year": 2006,
      "gdpPPP": 3.3,
      "perCapitaPPP": 4951.9,
      "perCapitaPPPChangePct": 7.88,
      "popChangePct": 1.52
    },
    {
      "year": 2007,
      "gdpPPP": 3.762,
      "perCapitaPPP": 5576.1,
      "perCapitaPPPChangePct": 12.61,
      "popChangePct": 1.35
    },
    {
      "year": 2008,
      "gdpPPP": 4.214,
      "perCapitaPPP": 6174.3,
      "perCapitaPPPChangePct": 10.73,
      "popChangePct": 1.04
    },
    {
      "year": 2009,
      "gdpPPP": 4.5,
      "perCapitaPPP": 6520.1,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 1.17
    },
    {
      "year": 2010,
      "gdpPPP": 5.025,
      "perCapitaPPP": 7200.8,
      "perCapitaPPPChangePct": 10.44,
      "popChangePct": 1.16
    },
    {
      "year": 2011,
      "gdpPPP": 5.667,
      "perCapitaPPP": 8033.1,
      "perCapitaPPPChangePct": 11.56,
      "popChangePct": 1.15
    },
    {
      "year": 2012,
      "gdpPPP": 6.163,
      "perCapitaPPP": 8640.0,
      "perCapitaPPPChangePct": 7.55,
      "popChangePct": 0.99
    },
    {
      "year": 2013,
      "gdpPPP": 6.482,
      "perCapitaPPP": 8986.3,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.12
    },
    {
      "year": 2014,
      "gdpPPP": 6.847,
      "perCapitaPPP": 9389.5,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 1.11
    },
    {
      "year": 2015,
      "gdpPPP": 7.345,
      "perCapitaPPP": 9967.1,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 1.1
    },
    {
      "year": 2016,
      "gdpPPP": 7.978,
      "perCapitaPPP": 10719.1,
      "perCapitaPPPChangePct": 7.55,
      "popChangePct": 0.95
    },
    {
      "year": 2017,
      "gdpPPP": 8.539,
      "perCapitaPPP": 11368.4,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 0.94
    },
    {
      "year": 2018,
      "gdpPPP": 8.89,
      "perCapitaPPP": 11743.2,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 0.8
    },
    {
      "year": 2019,
      "gdpPPP": 9.464,
      "perCapitaPPP": 12415.0,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 0.66
    },
    {
      "year": 2020,
      "gdpPPP": 9.884,
      "perCapitaPPP": 12879.4,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 0.66
    },
    {
      "year": 2021,
      "gdpPPP": 9.861,
      "perCapitaPPP": 12761.9,
      "perCapitaPPPChangePct": -0.91,
      "popChangePct": 0.78
    },
    {
      "year": 2022,
      "gdpPPP": 11.073,
      "perCapitaPPP": 14228.8,
      "perCapitaPPPChangePct": 11.49,
      "popChangePct": 0.65
    },
    {
      "year": 2023,
      "gdpPPP": 12.047,
      "perCapitaPPP": 15372.5,
      "perCapitaPPPChangePct": 8.04,
      "popChangePct": 0.77
    },
    {
      "year": 2024,
      "gdpPPP": 13.099,
      "perCapitaPPP": 16602.4,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 0.64
    },
    {
      "year": 2025,
      "gdpPPP": 14.43,
      "perCapitaPPP": 18250.7,
      "perCapitaPPPChangePct": 9.93,
      "popChangePct": 0.25
    },
    {
      "year": 2026,
      "gdpPPP": 15.953,
      "perCapitaPPP": 20134.8,
      "perCapitaPPPChangePct": 10.32,
      "popChangePct": 0.13
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 17.335,
      "perCapitaPPP": 21832.5,
      "perCapitaPPPChangePct": 8.43,
      "popChangePct": 0.25
    },
    {
      "year": 2028,
      "gdpPPP": 18.649,
      "perCapitaPPP": 23298.3,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 0.76
    },
    {
      "year": 2029,
      "gdpPPP": 20.34,
      "perCapitaPPP": 25213.9,
      "perCapitaPPPChangePct": 8.22,
      "popChangePct": 0.88
    },
    {
      "year": 2030,
      "gdpPPP": 22.048,
      "perCapitaPPP": 27126.7,
      "perCapitaPPPChangePct": 7.59,
      "popChangePct": 0.74
    },
    {
      "year": 2031,
      "gdpPPP": 23.693,
      "perCapitaPPP": 28942.8,
      "perCapitaPPPChangePct": 6.69,
      "popChangePct": 0.74
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BhutanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
