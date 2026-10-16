import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Chad",
  "slug": "chad",
  "iso3": "TCD",
  "region": "Africa",
  "rank2026": 127,
  "flagEmoji": "🇹🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Trinidad and Tobago",
      "slug": "trinidad-and-tobago",
      "rank": 126
    },
    {
      "name": "Niger",
      "slug": "niger",
      "rank": 128
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.958,
      "growth": -6,
      "perCapita": 212.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.133,
      "growth": -10.8,
      "perCapita": 245.6,
      "popChangePct": 2.19
    },
    {
      "year": 1982,
      "gdp": 1.095,
      "growth": 5.4,
      "perCapita": 232.1,
      "popChangePct": 2.28
    },
    {
      "year": 1983,
      "gdp": 1.096,
      "growth": 15.7,
      "perCapita": 226.7,
      "popChangePct": 2.42
    },
    {
      "year": 1984,
      "gdp": 1.177,
      "growth": 5.3,
      "perCapita": 237.4,
      "popChangePct": 2.61
    },
    {
      "year": 1985,
      "gdp": 1.275,
      "growth": 7.9,
      "perCapita": 250.3,
      "popChangePct": 2.76
    },
    {
      "year": 1986,
      "gdp": 1.57,
      "growth": 6,
      "perCapita": 299.3,
      "popChangePct": 2.98
    },
    {
      "year": 1987,
      "gdp": 1.78,
      "growth": 3.6,
      "perCapita": 328.9,
      "popChangePct": 3.16
    },
    {
      "year": 1988,
      "gdp": 2.081,
      "growth": 7.5,
      "perCapita": 372.3,
      "popChangePct": 3.27
    },
    {
      "year": 1989,
      "gdp": 1.966,
      "growth": 2,
      "perCapita": 340.4,
      "popChangePct": 3.29
    },
    {
      "year": 1990,
      "gdp": 2.369,
      "growth": 3.2,
      "perCapita": 397.2,
      "popChangePct": 3.27
    },
    {
      "year": 1991,
      "gdp": 2.347,
      "growth": 10.4,
      "perCapita": 381.2,
      "popChangePct": 3.25
    },
    {
      "year": 1992,
      "gdp": 2.446,
      "growth": 2.4,
      "perCapita": 384.9,
      "popChangePct": 3.25
    },
    {
      "year": 1993,
      "gdp": 2.138,
      "growth": -2.1,
      "perCapita": 325.7,
      "popChangePct": 3.26
    },
    {
      "year": 1994,
      "gdp": 1.732,
      "growth": 5.5,
      "perCapita": 255.4,
      "popChangePct": 3.31
    },
    {
      "year": 1995,
      "gdp": 2.123,
      "growth": -0.8,
      "perCapita": 302.8,
      "popChangePct": 3.38
    },
    {
      "year": 1996,
      "gdp": 2.36,
      "growth": 2.1,
      "perCapita": 325.4,
      "popChangePct": 3.44
    },
    {
      "year": 1997,
      "gdp": 2.268,
      "growth": 5.7,
      "perCapita": 302.2,
      "popChangePct": 3.48
    },
    {
      "year": 1998,
      "gdp": 2.561,
      "growth": 7,
      "perCapita": 329.7,
      "popChangePct": 3.56
    },
    {
      "year": 1999,
      "gdp": 2.256,
      "growth": -0.7,
      "perCapita": 280.1,
      "popChangePct": 3.66
    },
    {
      "year": 2000,
      "gdp": 2.039,
      "growth": -0.9,
      "perCapita": 244.1,
      "popChangePct": 3.75
    },
    {
      "year": 2001,
      "gdp": 2.512,
      "growth": 11.7,
      "perCapita": 289.4,
      "popChangePct": 3.85
    },
    {
      "year": 2002,
      "gdp": 2.928,
      "growth": 8.5,
      "perCapita": 324.7,
      "popChangePct": 3.93
    },
    {
      "year": 2003,
      "gdp": 4.025,
      "growth": 14.7,
      "perCapita": 429.3,
      "popChangePct": 3.94
    },
    {
      "year": 2004,
      "gdp": 6.49,
      "growth": 33.6,
      "perCapita": 666.6,
      "popChangePct": 3.85
    },
    {
      "year": 2005,
      "gdp": 8.66,
      "growth": 7.5,
      "perCapita": 857.7,
      "popChangePct": 3.72
    },
    {
      "year": 2006,
      "gdp": 9.71,
      "growth": -0.5,
      "perCapita": 928.6,
      "popChangePct": 3.57
    },
    {
      "year": 2007,
      "gdp": 10.867,
      "growth": 4.4,
      "perCapita": 1004.5,
      "popChangePct": 3.45
    },
    {
      "year": 2008,
      "gdp": 13.384,
      "growth": 3.1,
      "perCapita": 1196.7,
      "popChangePct": 3.38
    },
    {
      "year": 2009,
      "gdp": 12.304,
      "growth": -1.3,
      "perCapita": 1064.4,
      "popChangePct": 3.36
    },
    {
      "year": 2010,
      "gdp": 14.07,
      "growth": 13.8,
      "perCapita": 1177.2,
      "popChangePct": 3.39
    },
    {
      "year": 2011,
      "gdp": 16.682,
      "growth": 4.6,
      "perCapita": 1349.6,
      "popChangePct": 3.42
    },
    {
      "year": 2012,
      "gdp": 17.878,
      "growth": 8.9,
      "perCapita": 1398.4,
      "popChangePct": 3.43
    },
    {
      "year": 2013,
      "gdp": 17.861,
      "growth": 2.9,
      "perCapita": 1351.0,
      "popChangePct": 3.4
    },
    {
      "year": 2014,
      "gdp": 18.186,
      "growth": 2.3,
      "perCapita": 1330.9,
      "popChangePct": 3.36
    },
    {
      "year": 2015,
      "gdp": 14.566,
      "growth": 3.2,
      "perCapita": 1032.3,
      "popChangePct": 3.27
    },
    {
      "year": 2016,
      "gdp": 13.075,
      "growth": -3.7,
      "perCapita": 897.9,
      "popChangePct": 3.2
    },
    {
      "year": 2017,
      "gdp": 13.258,
      "growth": -2.1,
      "perCapita": 882.9,
      "popChangePct": 3.12
    },
    {
      "year": 2018,
      "gdp": 15.169,
      "growth": 5.2,
      "perCapita": 980.1,
      "popChangePct": 3.07
    },
    {
      "year": 2019,
      "gdp": 14.819,
      "growth": 5.9,
      "perCapita": 929.2,
      "popChangePct": 3.03
    },
    {
      "year": 2020,
      "gdp": 14.812,
      "growth": 0,
      "perCapita": 901.7,
      "popChangePct": 3.0
    },
    {
      "year": 2021,
      "gdp": 16.975,
      "growth": 2,
      "perCapita": 1003.5,
      "popChangePct": 2.98
    },
    {
      "year": 2022,
      "gdp": 18.052,
      "growth": 4.7,
      "perCapita": 1036.6,
      "popChangePct": 2.95
    },
    {
      "year": 2023,
      "gdp": 18.638,
      "growth": 5,
      "perCapita": 1040.0,
      "popChangePct": 2.91
    },
    {
      "year": 2024,
      "gdp": 20.656,
      "growth": 5,
      "perCapita": 1120.4,
      "popChangePct": 2.88
    },
    {
      "year": 2025,
      "gdp": 22.092,
      "growth": 5.6,
      "perCapita": 1165.1,
      "popChangePct": 2.84
    },
    {
      "year": 2026,
      "gdp": 25.628,
      "growth": 5.2,
      "perCapita": 1314.9,
      "popChangePct": 2.8
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 27.257,
      "growth": 4.9,
      "perCapita": 1360.8,
      "popChangePct": 2.77
    },
    {
      "year": 2028,
      "gdp": 29.023,
      "growth": 4.8,
      "perCapita": 1410.5,
      "popChangePct": 2.73
    },
    {
      "year": 2029,
      "gdp": 31.16,
      "growth": 5.1,
      "perCapita": 1474.7,
      "popChangePct": 2.69
    },
    {
      "year": 2030,
      "gdp": 33.514,
      "growth": 5.2,
      "perCapita": 1545.1,
      "popChangePct": 2.66
    },
    {
      "year": 2031,
      "gdp": 36.085,
      "growth": 5.3,
      "perCapita": 1621.1,
      "popChangePct": 2.62
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.267,
      "perCapitaPPP": 502.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.213,
      "perCapitaPPP": 479.8,
      "perCapitaPPPChangePct": -4.45,
      "popChangePct": 2.19
    },
    {
      "year": 1982,
      "gdpPPP": 2.476,
      "perCapitaPPP": 524.9,
      "perCapitaPPPChangePct": 9.39,
      "popChangePct": 2.28
    },
    {
      "year": 1983,
      "gdpPPP": 2.976,
      "perCapitaPPP": 615.9,
      "perCapitaPPPChangePct": 17.35,
      "popChangePct": 2.42
    },
    {
      "year": 1984,
      "gdpPPP": 3.246,
      "perCapitaPPP": 654.7,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 2.61
    },
    {
      "year": 1985,
      "gdpPPP": 3.613,
      "perCapitaPPP": 709.0,
      "perCapitaPPPChangePct": 8.3,
      "popChangePct": 2.76
    },
    {
      "year": 1986,
      "gdpPPP": 3.905,
      "perCapitaPPP": 744.3,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 2.98
    },
    {
      "year": 1987,
      "gdpPPP": 4.148,
      "perCapitaPPP": 766.4,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 3.16
    },
    {
      "year": 1988,
      "gdpPPP": 4.619,
      "perCapitaPPP": 826.3,
      "perCapitaPPPChangePct": 7.82,
      "popChangePct": 3.27
    },
    {
      "year": 1989,
      "gdpPPP": 4.893,
      "perCapitaPPP": 847.5,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 3.29
    },
    {
      "year": 1990,
      "gdpPPP": 5.239,
      "perCapitaPPP": 878.5,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 3.27
    },
    {
      "year": 1991,
      "gdpPPP": 5.98,
      "perCapitaPPP": 971.2,
      "perCapitaPPPChangePct": 10.54,
      "popChangePct": 3.25
    },
    {
      "year": 1992,
      "gdpPPP": 6.262,
      "perCapitaPPP": 985.1,
      "perCapitaPPPChangePct": 1.44,
      "popChangePct": 3.25
    },
    {
      "year": 1993,
      "gdpPPP": 6.278,
      "perCapitaPPP": 956.4,
      "perCapitaPPPChangePct": -2.92,
      "popChangePct": 3.26
    },
    {
      "year": 1994,
      "gdpPPP": 6.764,
      "perCapitaPPP": 997.5,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 3.31
    },
    {
      "year": 1995,
      "gdpPPP": 6.852,
      "perCapitaPPP": 977.5,
      "perCapitaPPPChangePct": -2.01,
      "popChangePct": 3.38
    },
    {
      "year": 1996,
      "gdpPPP": 7.125,
      "perCapitaPPP": 982.7,
      "perCapitaPPPChangePct": 0.53,
      "popChangePct": 3.44
    },
    {
      "year": 1997,
      "gdpPPP": 7.658,
      "perCapitaPPP": 1020.6,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 3.48
    },
    {
      "year": 1998,
      "gdpPPP": 8.282,
      "perCapitaPPP": 1065.9,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 3.56
    },
    {
      "year": 1999,
      "gdpPPP": 8.342,
      "perCapitaPPP": 1035.8,
      "perCapitaPPPChangePct": -2.82,
      "popChangePct": 3.66
    },
    {
      "year": 2000,
      "gdpPPP": 8.456,
      "perCapitaPPP": 1012.0,
      "perCapitaPPPChangePct": -2.3,
      "popChangePct": 3.75
    },
    {
      "year": 2001,
      "gdpPPP": 9.655,
      "perCapitaPPP": 1112.5,
      "perCapitaPPPChangePct": 9.93,
      "popChangePct": 3.85
    },
    {
      "year": 2002,
      "gdpPPP": 10.637,
      "perCapitaPPP": 1179.4,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 3.93
    },
    {
      "year": 2003,
      "gdpPPP": 12.444,
      "perCapitaPPP": 1327.5,
      "perCapitaPPPChangePct": 12.56,
      "popChangePct": 3.94
    },
    {
      "year": 2004,
      "gdpPPP": 17.076,
      "perCapitaPPP": 1754.1,
      "perCapitaPPPChangePct": 32.14,
      "popChangePct": 3.85
    },
    {
      "year": 2005,
      "gdpPPP": 18.932,
      "perCapitaPPP": 1875.0,
      "perCapitaPPPChangePct": 6.89,
      "popChangePct": 3.72
    },
    {
      "year": 2006,
      "gdpPPP": 19.415,
      "perCapitaPPP": 1856.6,
      "perCapitaPPPChangePct": -0.98,
      "popChangePct": 3.57
    },
    {
      "year": 2007,
      "gdpPPP": 20.809,
      "perCapitaPPP": 1923.6,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 3.45
    },
    {
      "year": 2008,
      "gdpPPP": 21.87,
      "perCapitaPPP": 1955.4,
      "perCapitaPPPChangePct": 1.66,
      "popChangePct": 3.38
    },
    {
      "year": 2009,
      "gdpPPP": 21.71,
      "perCapitaPPP": 1878.0,
      "perCapitaPPPChangePct": -3.96,
      "popChangePct": 3.36
    },
    {
      "year": 2010,
      "gdpPPP": 25.005,
      "perCapitaPPP": 2092.1,
      "perCapitaPPPChangePct": 11.4,
      "popChangePct": 3.39
    },
    {
      "year": 2011,
      "gdpPPP": 26.683,
      "perCapitaPPP": 2158.6,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 3.42
    },
    {
      "year": 2012,
      "gdpPPP": 29.6,
      "perCapitaPPP": 2315.2,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": 3.43
    },
    {
      "year": 2013,
      "gdpPPP": 30.984,
      "perCapitaPPP": 2343.8,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": 3.4
    },
    {
      "year": 2014,
      "gdpPPP": 32.254,
      "perCapitaPPP": 2360.5,
      "perCapitaPPPChangePct": 0.71,
      "popChangePct": 3.36
    },
    {
      "year": 2015,
      "gdpPPP": 33.579,
      "perCapitaPPP": 2379.6,
      "perCapitaPPPChangePct": 0.81,
      "popChangePct": 3.27
    },
    {
      "year": 2016,
      "gdpPPP": 32.66,
      "perCapitaPPP": 2242.8,
      "perCapitaPPPChangePct": -5.75,
      "popChangePct": 3.2
    },
    {
      "year": 2017,
      "gdpPPP": 32.551,
      "perCapitaPPP": 2167.6,
      "perCapitaPPPChangePct": -3.35,
      "popChangePct": 3.12
    },
    {
      "year": 2018,
      "gdpPPP": 35.607,
      "perCapitaPPP": 2300.5,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 3.07
    },
    {
      "year": 2019,
      "gdpPPP": 39.007,
      "perCapitaPPP": 2446.1,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 3.03
    },
    {
      "year": 2020,
      "gdpPPP": 37.294,
      "perCapitaPPP": 2270.4,
      "perCapitaPPPChangePct": -7.18,
      "popChangePct": 3.0
    },
    {
      "year": 2021,
      "gdpPPP": 43.654,
      "perCapitaPPP": 2580.8,
      "perCapitaPPPChangePct": 13.67,
      "popChangePct": 2.98
    },
    {
      "year": 2022,
      "gdpPPP": 48.942,
      "perCapitaPPP": 2810.5,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": 2.95
    },
    {
      "year": 2023,
      "gdpPPP": 53.279,
      "perCapitaPPP": 2973.0,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 2.91
    },
    {
      "year": 2024,
      "gdpPPP": 57.339,
      "perCapitaPPP": 3110.0,
      "perCapitaPPPChangePct": 4.61,
      "popChangePct": 2.88
    },
    {
      "year": 2025,
      "gdpPPP": 62.271,
      "perCapitaPPP": 3284.2,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 2.84
    },
    {
      "year": 2026,
      "gdpPPP": 67.405,
      "perCapitaPPP": 3458.3,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 2.8
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 72.284,
      "perCapitaPPP": 3608.8,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 2.77
    },
    {
      "year": 2028,
      "gdpPPP": 77.019,
      "perCapitaPPP": 3743.2,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 2.73
    },
    {
      "year": 2029,
      "gdpPPP": 82.349,
      "perCapitaPPP": 3897.4,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 2.69
    },
    {
      "year": 2030,
      "gdpPPP": 88.195,
      "perCapitaPPP": 4066.2,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 2.66
    },
    {
      "year": 2031,
      "gdpPPP": 94.528,
      "perCapitaPPP": 4246.7,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 2.62
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ChadGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
