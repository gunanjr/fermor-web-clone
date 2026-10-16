import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Colombia",
  "slug": "colombia",
  "iso3": "COL",
  "region": "Americas",
  "rank2026": 33,
  "flagEmoji": "🇨🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Thailand",
      "slug": "thailand",
      "rank": 32
    },
    {
      "name": "Vietnam",
      "slug": "vietnam",
      "rank": 34
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 46.501,
      "growth": 4.4,
      "perCapita": 1682.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 50.661,
      "growth": 2.3,
      "perCapita": 1793.0,
      "popChangePct": 2.23
    },
    {
      "year": 1982,
      "gdp": 54.252,
      "growth": 0.9,
      "perCapita": 1878.9,
      "popChangePct": 2.19
    },
    {
      "year": 1983,
      "gdp": 53.92,
      "growth": 1.6,
      "perCapita": 1827.9,
      "popChangePct": 2.16
    },
    {
      "year": 1984,
      "gdp": 53.257,
      "growth": 3.4,
      "perCapita": 1767.9,
      "popChangePct": 2.12
    },
    {
      "year": 1985,
      "gdp": 48.581,
      "growth": 3.1,
      "perCapita": 1623.7,
      "popChangePct": -0.68
    },
    {
      "year": 1986,
      "gdp": 48.648,
      "growth": 5.8,
      "perCapita": 1592.8,
      "popChangePct": 2.07
    },
    {
      "year": 1987,
      "gdp": 50.64,
      "growth": 5.4,
      "perCapita": 1624.0,
      "popChangePct": 2.1
    },
    {
      "year": 1988,
      "gdp": 54.592,
      "growth": 4.1,
      "perCapita": 1714.9,
      "popChangePct": 2.09
    },
    {
      "year": 1989,
      "gdp": 55.048,
      "growth": 3.4,
      "perCapita": 1694.1,
      "popChangePct": 2.08
    },
    {
      "year": 1990,
      "gdp": 56.071,
      "growth": 4.3,
      "perCapita": 1691.1,
      "popChangePct": 2.03
    },
    {
      "year": 1991,
      "gdp": 57.954,
      "growth": 2.4,
      "perCapita": 1712.3,
      "popChangePct": 2.08
    },
    {
      "year": 1992,
      "gdp": 68.579,
      "growth": 4.4,
      "perCapita": 1986.5,
      "popChangePct": 2.0
    },
    {
      "year": 1993,
      "gdp": 77.721,
      "growth": 5.7,
      "perCapita": 2209.2,
      "popChangePct": 1.91
    },
    {
      "year": 1994,
      "gdp": 97.665,
      "growth": 5.1,
      "perCapita": 2726.8,
      "popChangePct": 1.81
    },
    {
      "year": 1995,
      "gdp": 110.564,
      "growth": 5.2,
      "perCapita": 3035.3,
      "popChangePct": 1.7
    },
    {
      "year": 1996,
      "gdp": 116.13,
      "growth": 2.1,
      "perCapita": 3137.1,
      "popChangePct": 1.63
    },
    {
      "year": 1997,
      "gdp": 127.49,
      "growth": 3.4,
      "perCapita": 3399.3,
      "popChangePct": 1.31
    },
    {
      "year": 1998,
      "gdp": 117.725,
      "growth": 0.6,
      "perCapita": 3090.9,
      "popChangePct": 1.55
    },
    {
      "year": 1999,
      "gdp": 103.132,
      "growth": -4.2,
      "perCapita": 2673.7,
      "popChangePct": 1.27
    },
    {
      "year": 2000,
      "gdp": 99.27,
      "growth": 2.9,
      "perCapita": 2535.5,
      "popChangePct": 1.5
    },
    {
      "year": 2001,
      "gdp": 97.606,
      "growth": 1.7,
      "perCapita": 2461.3,
      "popChangePct": 1.28
    },
    {
      "year": 2002,
      "gdp": 97.353,
      "growth": 2.5,
      "perCapita": 2424.3,
      "popChangePct": 1.26
    },
    {
      "year": 2003,
      "gdp": 94.072,
      "growth": 3.9,
      "perCapita": 2313.5,
      "popChangePct": 1.26
    },
    {
      "year": 2004,
      "gdp": 116.382,
      "growth": 5.3,
      "perCapita": 2827.2,
      "popChangePct": 1.24
    },
    {
      "year": 2005,
      "gdp": 145.601,
      "growth": 4.4,
      "perCapita": 3494.0,
      "popChangePct": 1.23
    },
    {
      "year": 2006,
      "gdp": 161.793,
      "growth": 6.7,
      "perCapita": 3836.7,
      "popChangePct": 1.2
    },
    {
      "year": 2007,
      "gdp": 206.23,
      "growth": 6.7,
      "perCapita": 4834.4,
      "popChangePct": 1.16
    },
    {
      "year": 2008,
      "gdp": 242.504,
      "growth": 3.3,
      "perCapita": 5622.1,
      "popChangePct": 1.11
    },
    {
      "year": 2009,
      "gdp": 232.469,
      "growth": 1.1,
      "perCapita": 5330.8,
      "popChangePct": 1.1
    },
    {
      "year": 2010,
      "gdp": 286.499,
      "growth": 4.5,
      "perCapita": 6498.6,
      "popChangePct": 1.09
    },
    {
      "year": 2011,
      "gdp": 334.967,
      "growth": 6.9,
      "perCapita": 7518.4,
      "popChangePct": 1.06
    },
    {
      "year": 2012,
      "gdp": 370.692,
      "growth": 3.9,
      "perCapita": 8237.2,
      "popChangePct": 1.01
    },
    {
      "year": 2013,
      "gdp": 382.094,
      "growth": 5.1,
      "perCapita": 8409.7,
      "popChangePct": 0.96
    },
    {
      "year": 2014,
      "gdp": 381.241,
      "growth": 4.5,
      "perCapita": 8312.1,
      "popChangePct": 0.95
    },
    {
      "year": 2015,
      "gdp": 293.493,
      "growth": 3,
      "perCapita": 6337.0,
      "popChangePct": 0.98
    },
    {
      "year": 2016,
      "gdp": 282.72,
      "growth": 2.1,
      "perCapita": 6037.2,
      "popChangePct": 1.11
    },
    {
      "year": 2017,
      "gdp": 311.89,
      "growth": 1.4,
      "perCapita": 6577.3,
      "popChangePct": 1.26
    },
    {
      "year": 2018,
      "gdp": 334.124,
      "growth": 2.6,
      "perCapita": 6923.7,
      "popChangePct": 1.77
    },
    {
      "year": 2019,
      "gdp": 323.055,
      "growth": 3.2,
      "perCapita": 6540.1,
      "popChangePct": 2.36
    },
    {
      "year": 2020,
      "gdp": 270.348,
      "growth": -7.2,
      "perCapita": 5363.2,
      "popChangePct": 2.05
    },
    {
      "year": 2021,
      "gdp": 318.525,
      "growth": 10.8,
      "perCapita": 6231.3,
      "popChangePct": 1.41
    },
    {
      "year": 2022,
      "gdp": 345.632,
      "growth": 7.3,
      "perCapita": 6687.5,
      "popChangePct": 1.11
    },
    {
      "year": 2023,
      "gdp": 366.901,
      "growth": 0.8,
      "perCapita": 7026.6,
      "popChangePct": 1.03
    },
    {
      "year": 2024,
      "gdp": 420.504,
      "growth": 1.5,
      "perCapita": 7979.8,
      "popChangePct": 0.92
    },
    {
      "year": 2025,
      "gdp": 457.41,
      "growth": 2.6,
      "perCapita": 8622.6,
      "popChangePct": 0.67
    },
    {
      "year": 2026,
      "gdp": 539.53,
      "growth": 2.3,
      "perCapita": 10103.7,
      "popChangePct": 0.66
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 554.384,
      "growth": 2.5,
      "perCapita": 10321.4,
      "popChangePct": 0.59
    },
    {
      "year": 2028,
      "gdp": 578.238,
      "growth": 2.6,
      "perCapita": 10707.8,
      "popChangePct": 0.54
    },
    {
      "year": 2029,
      "gdp": 604.409,
      "growth": 2.7,
      "perCapita": 11137.2,
      "popChangePct": 0.49
    },
    {
      "year": 2030,
      "gdp": 632.137,
      "growth": 2.8,
      "perCapita": 11595.0,
      "popChangePct": 0.46
    },
    {
      "year": 2031,
      "gdp": 661.138,
      "growth": 2.8,
      "perCapita": 12076.1,
      "popChangePct": 0.42
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 77.444,
      "perCapitaPPP": 2802.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 86.702,
      "perCapitaPPP": 3068.5,
      "perCapitaPPPChangePct": 9.51,
      "popChangePct": 2.23
    },
    {
      "year": 1982,
      "gdpPPP": 92.932,
      "perCapitaPPP": 3218.4,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 2.19
    },
    {
      "year": 1983,
      "gdpPPP": 98.091,
      "perCapitaPPP": 3325.3,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.16
    },
    {
      "year": 1984,
      "gdpPPP": 105.037,
      "perCapitaPPP": 3486.8,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 2.12
    },
    {
      "year": 1985,
      "gdpPPP": 111.725,
      "perCapitaPPP": 3734.1,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": -0.68
    },
    {
      "year": 1986,
      "gdpPPP": 120.613,
      "perCapitaPPP": 3949.2,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 2.07
    },
    {
      "year": 1987,
      "gdpPPP": 130.238,
      "perCapitaPPP": 4176.8,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 2.1
    },
    {
      "year": 1988,
      "gdpPPP": 140.311,
      "perCapitaPPP": 4407.6,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 2.09
    },
    {
      "year": 1989,
      "gdpPPP": 150.791,
      "perCapitaPPP": 4640.5,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 2.08
    },
    {
      "year": 1990,
      "gdpPPP": 163.132,
      "perCapitaPPP": 4920.1,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 2.03
    },
    {
      "year": 1991,
      "gdpPPP": 172.651,
      "perCapitaPPP": 5101.2,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 2.08
    },
    {
      "year": 1992,
      "gdpPPP": 184.272,
      "perCapitaPPP": 5337.8,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 2.0
    },
    {
      "year": 1993,
      "gdpPPP": 199.411,
      "perCapitaPPP": 5668.2,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 1.91
    },
    {
      "year": 1994,
      "gdpPPP": 214.153,
      "perCapitaPPP": 5979.2,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 1.81
    },
    {
      "year": 1995,
      "gdpPPP": 230.018,
      "perCapitaPPP": 6314.7,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 1.7
    },
    {
      "year": 1996,
      "gdpPPP": 239.044,
      "perCapitaPPP": 6457.4,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 1.63
    },
    {
      "year": 1997,
      "gdpPPP": 251.508,
      "perCapitaPPP": 6706.0,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 1.31
    },
    {
      "year": 1998,
      "gdpPPP": 255.784,
      "perCapitaPPP": 6715.7,
      "perCapitaPPPChangePct": 0.14,
      "popChangePct": 1.55
    },
    {
      "year": 1999,
      "gdpPPP": 248.498,
      "perCapitaPPP": 6442.2,
      "perCapitaPPPChangePct": -4.07,
      "popChangePct": 1.27
    },
    {
      "year": 2000,
      "gdpPPP": 261.56,
      "perCapitaPPP": 6680.5,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 1.5
    },
    {
      "year": 2001,
      "gdpPPP": 271.937,
      "perCapitaPPP": 6857.4,
      "perCapitaPPPChangePct": 2.65,
      "popChangePct": 1.28
    },
    {
      "year": 2002,
      "gdpPPP": 283.078,
      "perCapitaPPP": 7049.4,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 1.26
    },
    {
      "year": 2003,
      "gdpPPP": 299.977,
      "perCapitaPPP": 7377.4,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 1.26
    },
    {
      "year": 2004,
      "gdpPPP": 324.471,
      "perCapitaPPP": 7882.1,
      "perCapitaPPPChangePct": 6.84,
      "popChangePct": 1.24
    },
    {
      "year": 2005,
      "gdpPPP": 349.527,
      "perCapitaPPP": 8387.6,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 1.23
    },
    {
      "year": 2006,
      "gdpPPP": 384.508,
      "perCapitaPPP": 9118.1,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": 1.2
    },
    {
      "year": 2007,
      "gdpPPP": 421.537,
      "perCapitaPPP": 9881.5,
      "perCapitaPPPChangePct": 8.37,
      "popChangePct": 1.16
    },
    {
      "year": 2008,
      "gdpPPP": 443.765,
      "perCapitaPPP": 10288.0,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 1.11
    },
    {
      "year": 2009,
      "gdpPPP": 451.59,
      "perCapitaPPP": 10355.4,
      "perCapitaPPPChangePct": 0.65,
      "popChangePct": 1.1
    },
    {
      "year": 2010,
      "gdpPPP": 477.623,
      "perCapitaPPP": 10833.9,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 1.09
    },
    {
      "year": 2011,
      "gdpPPP": 521.346,
      "perCapitaPPP": 11701.7,
      "perCapitaPPPChangePct": 8.01,
      "popChangePct": 1.06
    },
    {
      "year": 2012,
      "gdpPPP": 551.832,
      "perCapitaPPP": 12262.4,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 1.01
    },
    {
      "year": 2013,
      "gdpPPP": 590.037,
      "perCapitaPPP": 12986.4,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 0.96
    },
    {
      "year": 2014,
      "gdpPPP": 627.323,
      "perCapitaPPP": 13677.3,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 0.95
    },
    {
      "year": 2015,
      "gdpPPP": 651.859,
      "perCapitaPPP": 14074.8,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 0.98
    },
    {
      "year": 2016,
      "gdpPPP": 671.79,
      "perCapitaPPP": 14345.3,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 1.11
    },
    {
      "year": 2017,
      "gdpPPP": 693.117,
      "perCapitaPPP": 14616.9,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 1.26
    },
    {
      "year": 2018,
      "gdpPPP": 747.104,
      "perCapitaPPP": 15481.4,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 1.77
    },
    {
      "year": 2019,
      "gdpPPP": 807.591,
      "perCapitaPPP": 16349.3,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 2.36
    },
    {
      "year": 2020,
      "gdpPPP": 785.738,
      "perCapitaPPP": 15587.6,
      "perCapitaPPPChangePct": -4.66,
      "popChangePct": 2.05
    },
    {
      "year": 2021,
      "gdpPPP": 906.034,
      "perCapitaPPP": 17724.7,
      "perCapitaPPPChangePct": 13.71,
      "popChangePct": 1.41
    },
    {
      "year": 2022,
      "gdpPPP": 1041.594,
      "perCapitaPPP": 20153.5,
      "perCapitaPPPChangePct": 13.7,
      "popChangePct": 1.11
    },
    {
      "year": 2023,
      "gdpPPP": 1089.228,
      "perCapitaPPP": 20860.0,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 1.03
    },
    {
      "year": 2024,
      "gdpPPP": 1132.936,
      "perCapitaPPP": 21499.5,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 0.92
    },
    {
      "year": 2025,
      "gdpPPP": 1195.855,
      "perCapitaPPP": 22542.9,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 0.67
    },
    {
      "year": 2026,
      "gdpPPP": 1258.92,
      "perCapitaPPP": 23575.6,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": 0.66
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1319.274,
      "perCapitaPPP": 24561.9,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.59
    },
    {
      "year": 2028,
      "gdpPPP": 1376.06,
      "perCapitaPPP": 25481.9,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 0.54
    },
    {
      "year": 2029,
      "gdpPPP": 1438.903,
      "perCapitaPPP": 26514.1,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 0.49
    },
    {
      "year": 2030,
      "gdpPPP": 1505.786,
      "perCapitaPPP": 27619.9,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 0.46
    },
    {
      "year": 2031,
      "gdpPPP": 1575.28,
      "perCapitaPPP": 28773.4,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.42
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ColombiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
