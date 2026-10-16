import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Benin",
  "slug": "benin",
  "iso3": "BEN",
  "region": "Africa",
  "rank2026": 125,
  "flagEmoji": "🇧🇯",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Mongolia",
      "slug": "mongolia",
      "rank": 124
    },
    {
      "name": "Trinidad and Tobago",
      "slug": "trinidad-and-tobago",
      "rank": 126
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.302,
      "growth": 9.3,
      "perCapita": 596.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.557,
      "growth": 1.9,
      "perCapita": 390.2,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdp": 1.542,
      "growth": 1.7,
      "perCapita": 374.8,
      "popChangePct": 3.08
    },
    {
      "year": 1983,
      "gdp": 1.365,
      "growth": -2,
      "perCapita": 321.3,
      "popChangePct": 3.26
    },
    {
      "year": 1984,
      "gdp": 1.456,
      "growth": 0.4,
      "perCapita": 332.3,
      "popChangePct": 3.15
    },
    {
      "year": 1985,
      "gdp": 1.58,
      "growth": 4.3,
      "perCapita": 349.1,
      "popChangePct": 3.31
    },
    {
      "year": 1986,
      "gdp": 2.036,
      "growth": 2.7,
      "perCapita": 435.9,
      "popChangePct": 3.2
    },
    {
      "year": 1987,
      "gdp": 2.43,
      "growth": -2.1,
      "perCapita": 504.5,
      "popChangePct": 3.1
    },
    {
      "year": 1988,
      "gdp": 2.552,
      "growth": 3.4,
      "perCapita": 513.1,
      "popChangePct": 3.24
    },
    {
      "year": 1989,
      "gdp": 2.37,
      "growth": -2.8,
      "perCapita": 463.0,
      "popChangePct": 2.96
    },
    {
      "year": 1990,
      "gdp": 2.89,
      "growth": 9,
      "perCapita": 547.1,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdp": 2.954,
      "growth": 4.2,
      "perCapita": 542.3,
      "popChangePct": 3.14
    },
    {
      "year": 1992,
      "gdp": 3.284,
      "growth": 3,
      "perCapita": 584.5,
      "popChangePct": 3.14
    },
    {
      "year": 1993,
      "gdp": 3.199,
      "growth": 5.8,
      "perCapita": 544.8,
      "popChangePct": 4.54
    },
    {
      "year": 1994,
      "gdp": 2.227,
      "growth": 2,
      "perCapita": 365.3,
      "popChangePct": 3.81
    },
    {
      "year": 1995,
      "gdp": 2.993,
      "growth": 6,
      "perCapita": 480.7,
      "popChangePct": 2.13
    },
    {
      "year": 1996,
      "gdp": 3.251,
      "growth": 4.3,
      "perCapita": 508.7,
      "popChangePct": 2.65
    },
    {
      "year": 1997,
      "gdp": 3.124,
      "growth": 5.7,
      "perCapita": 474.5,
      "popChangePct": 2.99
    },
    {
      "year": 1998,
      "gdp": 3.362,
      "growth": 4,
      "perCapita": 495.1,
      "popChangePct": 3.13
    },
    {
      "year": 1999,
      "gdp": 3.681,
      "growth": 4.4,
      "perCapita": 525.7,
      "popChangePct": 3.15
    },
    {
      "year": 2000,
      "gdp": 3.522,
      "growth": 5.9,
      "perCapita": 487.6,
      "popChangePct": 3.13
    },
    {
      "year": 2001,
      "gdp": 3.666,
      "growth": 5.3,
      "perCapita": 492.4,
      "popChangePct": 3.1
    },
    {
      "year": 2002,
      "gdp": 4.191,
      "growth": 4.6,
      "perCapita": 546.1,
      "popChangePct": 3.08
    },
    {
      "year": 2003,
      "gdp": 5.348,
      "growth": 3.4,
      "perCapita": 675.8,
      "popChangePct": 3.1
    },
    {
      "year": 2004,
      "gdp": 6.187,
      "growth": 4.4,
      "perCapita": 758.4,
      "popChangePct": 3.11
    },
    {
      "year": 2005,
      "gdp": 6.571,
      "growth": 1.7,
      "perCapita": 779.9,
      "popChangePct": 3.27
    },
    {
      "year": 2006,
      "gdp": 7.034,
      "growth": 3.9,
      "perCapita": 809.2,
      "popChangePct": 3.17
    },
    {
      "year": 2007,
      "gdp": 8.17,
      "growth": 6,
      "perCapita": 912.4,
      "popChangePct": 3.0
    },
    {
      "year": 2008,
      "gdp": 9.787,
      "growth": 4.9,
      "perCapita": 1060.5,
      "popChangePct": 3.06
    },
    {
      "year": 2009,
      "gdp": 9.728,
      "growth": 2.3,
      "perCapita": 1023.0,
      "popChangePct": 3.05
    },
    {
      "year": 2010,
      "gdp": 9.543,
      "growth": 2.1,
      "perCapita": 974.0,
      "popChangePct": 3.03
    },
    {
      "year": 2011,
      "gdp": 10.691,
      "growth": 3,
      "perCapita": 1059.2,
      "popChangePct": 3.03
    },
    {
      "year": 2012,
      "gdp": 11.148,
      "growth": 4.8,
      "perCapita": 1072.2,
      "popChangePct": 3.01
    },
    {
      "year": 2013,
      "gdp": 12.518,
      "growth": 7.2,
      "perCapita": 1168.9,
      "popChangePct": 2.99
    },
    {
      "year": 2014,
      "gdp": 13.288,
      "growth": 6.4,
      "perCapita": 1204.7,
      "popChangePct": 3.0
    },
    {
      "year": 2015,
      "gdp": 11.389,
      "growth": 1.8,
      "perCapita": 1002.5,
      "popChangePct": 3.0
    },
    {
      "year": 2016,
      "gdp": 11.818,
      "growth": 3.3,
      "perCapita": 1010.3,
      "popChangePct": 2.97
    },
    {
      "year": 2017,
      "gdp": 12.766,
      "growth": 5.6,
      "perCapita": 1060.3,
      "popChangePct": 2.92
    },
    {
      "year": 2018,
      "gdp": 14.346,
      "growth": 6.6,
      "perCapita": 1158.5,
      "popChangePct": 2.85
    },
    {
      "year": 2019,
      "gdp": 14.697,
      "growth": 7.1,
      "perCapita": 1154.8,
      "popChangePct": 2.78
    },
    {
      "year": 2020,
      "gdp": 15.674,
      "growth": 3.8,
      "perCapita": 1199.2,
      "popChangePct": 2.7
    },
    {
      "year": 2021,
      "gdp": 17.699,
      "growth": 7.2,
      "perCapita": 1319.5,
      "popChangePct": 2.62
    },
    {
      "year": 2022,
      "gdp": 17.439,
      "growth": 6.3,
      "perCapita": 1267.4,
      "popChangePct": 2.59
    },
    {
      "year": 2023,
      "gdp": 19.679,
      "growth": 6.4,
      "perCapita": 1394.6,
      "popChangePct": 2.55
    },
    {
      "year": 2024,
      "gdp": 21.487,
      "growth": 7.5,
      "perCapita": 1481.9,
      "popChangePct": 2.76
    },
    {
      "year": 2025,
      "gdp": 24.382,
      "growth": 7.5,
      "perCapita": 1633.9,
      "popChangePct": 2.92
    },
    {
      "year": 2026,
      "gdp": 27.786,
      "growth": 7,
      "perCapita": 1809.3,
      "popChangePct": 2.91
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 30.179,
      "growth": 6.7,
      "perCapita": 1909.0,
      "popChangePct": 2.94
    },
    {
      "year": 2028,
      "gdp": 32.731,
      "growth": 6.6,
      "perCapita": 2010.1,
      "popChangePct": 3.0
    },
    {
      "year": 2029,
      "gdp": 35.543,
      "growth": 6.5,
      "perCapita": 2117.6,
      "popChangePct": 3.08
    },
    {
      "year": 2030,
      "gdp": 38.456,
      "growth": 6,
      "perCapita": 2222.6,
      "popChangePct": 3.09
    },
    {
      "year": 2031,
      "gdp": 41.601,
      "growth": 6,
      "perCapita": 2335.4,
      "popChangePct": 2.95
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 3.772,
      "perCapitaPPP": 977.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 4.208,
      "perCapitaPPP": 1054.3,
      "perCapitaPPPChangePct": 7.83,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdpPPP": 4.543,
      "perCapitaPPP": 1104.4,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 3.08
    },
    {
      "year": 1983,
      "gdpPPP": 4.627,
      "perCapitaPPP": 1089.2,
      "perCapitaPPPChangePct": -1.37,
      "popChangePct": 3.26
    },
    {
      "year": 1984,
      "gdpPPP": 4.813,
      "perCapitaPPP": 1098.5,
      "perCapitaPPPChangePct": 0.85,
      "popChangePct": 3.15
    },
    {
      "year": 1985,
      "gdpPPP": 5.18,
      "perCapitaPPP": 1144.4,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 3.31
    },
    {
      "year": 1986,
      "gdpPPP": 5.43,
      "perCapitaPPP": 1162.3,
      "perCapitaPPPChangePct": 1.56,
      "popChangePct": 3.2
    },
    {
      "year": 1987,
      "gdpPPP": 5.449,
      "perCapitaPPP": 1131.3,
      "perCapitaPPPChangePct": -2.67,
      "popChangePct": 3.1
    },
    {
      "year": 1988,
      "gdpPPP": 5.834,
      "perCapitaPPP": 1173.3,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 3.24
    },
    {
      "year": 1989,
      "gdpPPP": 5.89,
      "perCapitaPPP": 1150.5,
      "perCapitaPPPChangePct": -1.94,
      "popChangePct": 2.96
    },
    {
      "year": 1990,
      "gdpPPP": 6.659,
      "perCapitaPPP": 1260.9,
      "perCapitaPPPChangePct": 9.59,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdpPPP": 7.175,
      "perCapitaPPP": 1317.3,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 3.14
    },
    {
      "year": 1992,
      "gdpPPP": 7.556,
      "perCapitaPPP": 1345.0,
      "perCapitaPPPChangePct": 2.1,
      "popChangePct": 3.14
    },
    {
      "year": 1993,
      "gdpPPP": 8.187,
      "perCapitaPPP": 1394.0,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 4.54
    },
    {
      "year": 1994,
      "gdpPPP": 8.53,
      "perCapitaPPP": 1399.2,
      "perCapitaPPPChangePct": 0.37,
      "popChangePct": 3.81
    },
    {
      "year": 1995,
      "gdpPPP": 9.236,
      "perCapitaPPP": 1483.2,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 2.13
    },
    {
      "year": 1996,
      "gdpPPP": 9.811,
      "perCapitaPPP": 1535.0,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 2.65
    },
    {
      "year": 1997,
      "gdpPPP": 10.553,
      "perCapitaPPP": 1603.0,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 2.99
    },
    {
      "year": 1998,
      "gdpPPP": 11.094,
      "perCapitaPPP": 1634.0,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 3.13
    },
    {
      "year": 1999,
      "gdpPPP": 11.742,
      "perCapitaPPP": 1676.7,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 3.15
    },
    {
      "year": 2000,
      "gdpPPP": 12.711,
      "perCapitaPPP": 1760.1,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": 3.13
    },
    {
      "year": 2001,
      "gdpPPP": 13.69,
      "perCapitaPPP": 1838.7,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 3.1
    },
    {
      "year": 2002,
      "gdpPPP": 14.549,
      "perCapitaPPP": 1895.5,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 3.08
    },
    {
      "year": 2003,
      "gdpPPP": 15.347,
      "perCapitaPPP": 1939.4,
      "perCapitaPPPChangePct": 2.32,
      "popChangePct": 3.1
    },
    {
      "year": 2004,
      "gdpPPP": 16.457,
      "perCapitaPPP": 2017.1,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 3.11
    },
    {
      "year": 2005,
      "gdpPPP": 17.264,
      "perCapitaPPP": 2048.9,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 3.27
    },
    {
      "year": 2006,
      "gdpPPP": 18.499,
      "perCapitaPPP": 2127.9,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 3.17
    },
    {
      "year": 2007,
      "gdpPPP": 20.137,
      "perCapitaPPP": 2249.0,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 3.0
    },
    {
      "year": 2008,
      "gdpPPP": 21.53,
      "perCapitaPPP": 2333.0,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 3.06
    },
    {
      "year": 2009,
      "gdpPPP": 22.165,
      "perCapitaPPP": 2330.9,
      "perCapitaPPPChangePct": -0.09,
      "popChangePct": 3.05
    },
    {
      "year": 2010,
      "gdpPPP": 22.909,
      "perCapitaPPP": 2338.3,
      "perCapitaPPPChangePct": 0.32,
      "popChangePct": 3.03
    },
    {
      "year": 2011,
      "gdpPPP": 24.075,
      "perCapitaPPP": 2385.1,
      "perCapitaPPPChangePct": 2.0,
      "popChangePct": 3.03
    },
    {
      "year": 2012,
      "gdpPPP": 25.703,
      "perCapitaPPP": 2472.0,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 3.01
    },
    {
      "year": 2013,
      "gdpPPP": 28.02,
      "perCapitaPPP": 2616.5,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 2.99
    },
    {
      "year": 2014,
      "gdpPPP": 30.321,
      "perCapitaPPP": 2748.9,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 3.0
    },
    {
      "year": 2015,
      "gdpPPP": 31.146,
      "perCapitaPPP": 2741.6,
      "perCapitaPPPChangePct": -0.27,
      "popChangePct": 3.0
    },
    {
      "year": 2016,
      "gdpPPP": 32.492,
      "perCapitaPPP": 2777.6,
      "perCapitaPPPChangePct": 1.31,
      "popChangePct": 2.97
    },
    {
      "year": 2017,
      "gdpPPP": 34.935,
      "perCapitaPPP": 2901.6,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 2.92
    },
    {
      "year": 2018,
      "gdpPPP": 36.918,
      "perCapitaPPP": 2981.2,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 2.85
    },
    {
      "year": 2019,
      "gdpPPP": 40.925,
      "perCapitaPPP": 3215.7,
      "perCapitaPPPChangePct": 7.86,
      "popChangePct": 2.78
    },
    {
      "year": 2020,
      "gdpPPP": 42.407,
      "perCapitaPPP": 3244.6,
      "perCapitaPPPChangePct": 0.9,
      "popChangePct": 2.7
    },
    {
      "year": 2021,
      "gdpPPP": 46.468,
      "perCapitaPPP": 3464.3,
      "perCapitaPPPChangePct": 6.77,
      "popChangePct": 2.62
    },
    {
      "year": 2022,
      "gdpPPP": 52.885,
      "perCapitaPPP": 3843.6,
      "perCapitaPPPChangePct": 10.95,
      "popChangePct": 2.59
    },
    {
      "year": 2023,
      "gdpPPP": 58.326,
      "perCapitaPPP": 4133.4,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 2.55
    },
    {
      "year": 2024,
      "gdpPPP": 64.229,
      "perCapitaPPP": 4429.5,
      "perCapitaPPPChangePct": 7.16,
      "popChangePct": 2.76
    },
    {
      "year": 2025,
      "gdpPPP": 71.005,
      "perCapitaPPP": 4758.2,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": 2.92
    },
    {
      "year": 2026,
      "gdpPPP": 78.131,
      "perCapitaPPP": 5087.6,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 2.91
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 85.195,
      "perCapitaPPP": 5389.1,
      "perCapitaPPPChangePct": 5.93,
      "popChangePct": 2.94
    },
    {
      "year": 2028,
      "gdpPPP": 92.297,
      "perCapitaPPP": 5668.2,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 3.0
    },
    {
      "year": 2029,
      "gdpPPP": 100.028,
      "perCapitaPPP": 5959.6,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 3.08
    },
    {
      "year": 2030,
      "gdpPPP": 108.021,
      "perCapitaPPP": 6243.2,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 3.09
    },
    {
      "year": 2031,
      "gdpPPP": 116.598,
      "perCapitaPPP": 6545.5,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 2.95
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BeninGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
