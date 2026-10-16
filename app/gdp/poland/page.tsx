import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Poland",
  "slug": "poland",
  "iso3": "POL",
  "region": "Europe",
  "rank2026": 21,
  "flagEmoji": "🇵🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Switzerland",
      "slug": "switzerland",
      "rank": 20
    },
    {
      "name": "Taiwan",
      "slug": "taiwan",
      "rank": 22
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 56.908,
      "growth": -6,
      "perCapita": 1600.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 53.921,
      "growth": -10,
      "perCapita": 1502.5,
      "popChangePct": 0.9
    },
    {
      "year": 1982,
      "gdp": 65.52,
      "growth": -4.8,
      "perCapita": 1809.1,
      "popChangePct": 0.92
    },
    {
      "year": 1983,
      "gdp": 75.792,
      "growth": 5.6,
      "perCapita": 2063.4,
      "popChangePct": 1.42
    },
    {
      "year": 1984,
      "gdp": 75.893,
      "growth": -0.4,
      "perCapita": 2048.4,
      "popChangePct": 0.87
    },
    {
      "year": 1985,
      "gdp": 71.137,
      "growth": 3.9,
      "perCapita": 1905.8,
      "popChangePct": 0.75
    },
    {
      "year": 1986,
      "gdp": 74.053,
      "growth": 3.5,
      "perCapita": 1971.7,
      "popChangePct": 0.62
    },
    {
      "year": 1987,
      "gdp": 64.04,
      "growth": 2.3,
      "perCapita": 1696.4,
      "popChangePct": 0.51
    },
    {
      "year": 1988,
      "gdp": 68.963,
      "growth": 3.3,
      "perCapita": 1825.1,
      "popChangePct": 0.1
    },
    {
      "year": 1989,
      "gdp": 67.237,
      "growth": 3.8,
      "perCapita": 1777.6,
      "popChangePct": 0.1
    },
    {
      "year": 1990,
      "gdp": 62.401,
      "growth": -7.2,
      "perCapita": 1634.2,
      "popChangePct": 0.96
    },
    {
      "year": 1991,
      "gdp": 80.863,
      "growth": -7,
      "perCapita": 2112.1,
      "popChangePct": 0.26
    },
    {
      "year": 1992,
      "gdp": 89.166,
      "growth": 2,
      "perCapita": 2322.9,
      "popChangePct": 0.26
    },
    {
      "year": 1993,
      "gdp": 90.828,
      "growth": 4.3,
      "perCapita": 2359.1,
      "popChangePct": 0.3
    },
    {
      "year": 1994,
      "gdp": 104.213,
      "growth": 5.2,
      "perCapita": 2701.1,
      "popChangePct": 0.21
    },
    {
      "year": 1995,
      "gdp": 139.8,
      "growth": 6.7,
      "perCapita": 3623.6,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 157.485,
      "growth": 6.2,
      "perCapita": 4078.9,
      "popChangePct": 0.07
    },
    {
      "year": 1997,
      "gdp": 157.987,
      "growth": 7.1,
      "perCapita": 4088.8,
      "popChangePct": 0.08
    },
    {
      "year": 1998,
      "gdp": 172.929,
      "growth": 5,
      "perCapita": 4473.1,
      "popChangePct": 0.05
    },
    {
      "year": 1999,
      "gdp": 168.657,
      "growth": 4.5,
      "perCapita": 4361.8,
      "popChangePct": 0.02
    },
    {
      "year": 2000,
      "gdp": 172.151,
      "growth": 4.3,
      "perCapita": 4499.1,
      "popChangePct": -1.04
    },
    {
      "year": 2001,
      "gdp": 191.403,
      "growth": 1.2,
      "perCapita": 5003.5,
      "popChangePct": -0.02
    },
    {
      "year": 2002,
      "gdp": 199.694,
      "growth": 1.4,
      "perCapita": 5221.8,
      "popChangePct": -0.03
    },
    {
      "year": 2003,
      "gdp": 218.561,
      "growth": 3.5,
      "perCapita": 5718.7,
      "popChangePct": -0.06
    },
    {
      "year": 2004,
      "gdp": 256.454,
      "growth": 5.1,
      "perCapita": 6715.1,
      "popChangePct": -0.07
    },
    {
      "year": 2005,
      "gdp": 307.158,
      "growth": 3.3,
      "perCapita": 8046.3,
      "popChangePct": -0.04
    },
    {
      "year": 2006,
      "gdp": 345.898,
      "growth": 6.2,
      "perCapita": 9065.1,
      "popChangePct": -0.04
    },
    {
      "year": 2007,
      "gdp": 429.715,
      "growth": 6.8,
      "perCapita": 11271.1,
      "popChangePct": -0.08
    },
    {
      "year": 2008,
      "gdp": 535.612,
      "growth": 4.4,
      "perCapita": 14052.3,
      "popChangePct": -0.02
    },
    {
      "year": 2009,
      "gdp": 440.954,
      "growth": 2.6,
      "perCapita": 11562.7,
      "popChangePct": 0.05
    },
    {
      "year": 2010,
      "gdp": 478.111,
      "growth": 3.2,
      "perCapita": 12574.3,
      "popChangePct": -0.3
    },
    {
      "year": 2011,
      "gdp": 527.848,
      "growth": 5.3,
      "perCapita": 13867.9,
      "popChangePct": 0.11
    },
    {
      "year": 2012,
      "gdp": 498.149,
      "growth": 1.5,
      "perCapita": 13087.2,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 518.18,
      "growth": 0.7,
      "perCapita": 13613.9,
      "popChangePct": -0.0
    },
    {
      "year": 2014,
      "gdp": 542.266,
      "growth": 3.9,
      "perCapita": 14263.5,
      "popChangePct": -0.12
    },
    {
      "year": 2015,
      "gdp": 479.729,
      "growth": 4.4,
      "perCapita": 12622.6,
      "popChangePct": -0.03
    },
    {
      "year": 2016,
      "gdp": 472.883,
      "growth": 3,
      "perCapita": 12455.0,
      "popChangePct": -0.1
    },
    {
      "year": 2017,
      "gdp": 528.497,
      "growth": 5.2,
      "perCapita": 13917.7,
      "popChangePct": 0.02
    },
    {
      "year": 2018,
      "gdp": 594.641,
      "growth": 6.2,
      "perCapita": 15658.1,
      "popChangePct": 0.01
    },
    {
      "year": 2019,
      "gdp": 602.592,
      "growth": 4.6,
      "perCapita": 15869.0,
      "popChangePct": -0.01
    },
    {
      "year": 2020,
      "gdp": 605.93,
      "growth": -2,
      "perCapita": 15963.1,
      "popChangePct": -0.04
    },
    {
      "year": 2021,
      "gdp": 689.253,
      "growth": 6.9,
      "perCapita": 18591.6,
      "popChangePct": -2.33
    },
    {
      "year": 2022,
      "gdp": 695.734,
      "growth": 5.3,
      "perCapita": 18859.8,
      "popChangePct": -0.49
    },
    {
      "year": 2023,
      "gdp": 812.959,
      "growth": 0.2,
      "perCapita": 22119.1,
      "popChangePct": -0.37
    },
    {
      "year": 2024,
      "gdp": 917.623,
      "growth": 3,
      "perCapita": 25057.3,
      "popChangePct": -0.36
    },
    {
      "year": 2025,
      "gdp": 1035.586,
      "growth": 3.6,
      "perCapita": 28374.2,
      "popChangePct": -0.34
    },
    {
      "year": 2026,
      "gdp": 1134.248,
      "growth": 3.3,
      "perCapita": 31336.0,
      "popChangePct": -0.82
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1184.607,
      "growth": 2.4,
      "perCapita": 32792.8,
      "popChangePct": -0.2
    },
    {
      "year": 2028,
      "gdp": 1248.332,
      "growth": 2.6,
      "perCapita": 34626.1,
      "popChangePct": -0.2
    },
    {
      "year": 2029,
      "gdp": 1317.774,
      "growth": 2.6,
      "perCapita": 36625.5,
      "popChangePct": -0.2
    },
    {
      "year": 2030,
      "gdp": 1387.962,
      "growth": 2.5,
      "perCapita": 38653.6,
      "popChangePct": -0.2
    },
    {
      "year": 2031,
      "gdp": 1461.304,
      "growth": 2.5,
      "perCapita": 40777.7,
      "popChangePct": -0.2
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 172.98,
      "perCapitaPPP": 4863.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 170.412,
      "perCapitaPPP": 4748.6,
      "perCapitaPPPChangePct": -2.36,
      "popChangePct": 0.9
    },
    {
      "year": 1982,
      "gdpPPP": 172.173,
      "perCapitaPPP": 4754.0,
      "perCapitaPPPChangePct": 0.11,
      "popChangePct": 0.92
    },
    {
      "year": 1983,
      "gdpPPP": 188.934,
      "perCapitaPPP": 5143.7,
      "perCapitaPPPChangePct": 8.2,
      "popChangePct": 1.42
    },
    {
      "year": 1984,
      "gdpPPP": 195.037,
      "perCapitaPPP": 5264.3,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 0.87
    },
    {
      "year": 1985,
      "gdpPPP": 208.974,
      "perCapitaPPP": 5598.5,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 0.75
    },
    {
      "year": 1986,
      "gdpPPP": 220.631,
      "perCapitaPPP": 5874.4,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 0.62
    },
    {
      "year": 1987,
      "gdpPPP": 231.302,
      "perCapitaPPP": 6127.2,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 0.51
    },
    {
      "year": 1988,
      "gdpPPP": 247.326,
      "perCapitaPPP": 6545.5,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": 0.1
    },
    {
      "year": 1989,
      "gdpPPP": 266.823,
      "perCapitaPPP": 7054.4,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": 0.1
    },
    {
      "year": 1990,
      "gdpPPP": 256.959,
      "perCapitaPPP": 6729.2,
      "perCapitaPPPChangePct": -4.61,
      "popChangePct": 0.96
    },
    {
      "year": 1991,
      "gdpPPP": 247.04,
      "perCapitaPPP": 6452.5,
      "perCapitaPPPChangePct": -4.11,
      "popChangePct": 0.26
    },
    {
      "year": 1992,
      "gdpPPP": 257.807,
      "perCapitaPPP": 6716.2,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 0.26
    },
    {
      "year": 1993,
      "gdpPPP": 275.232,
      "perCapitaPPP": 7148.7,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 0.3
    },
    {
      "year": 1994,
      "gdpPPP": 295.837,
      "perCapitaPPP": 7668.0,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 0.21
    },
    {
      "year": 1995,
      "gdpPPP": 322.359,
      "perCapitaPPP": 8355.5,
      "perCapitaPPPChangePct": 8.97,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 348.742,
      "perCapitaPPP": 9032.6,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 0.07
    },
    {
      "year": 1997,
      "gdpPPP": 379.895,
      "perCapitaPPP": 9831.8,
      "perCapitaPPPChangePct": 8.85,
      "popChangePct": 0.08
    },
    {
      "year": 1998,
      "gdpPPP": 403.302,
      "perCapitaPPP": 10432.0,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 0.05
    },
    {
      "year": 1999,
      "gdpPPP": 427.514,
      "perCapitaPPP": 11056.3,
      "perCapitaPPPChangePct": 5.98,
      "popChangePct": 0.02
    },
    {
      "year": 2000,
      "gdpPPP": 455.821,
      "perCapitaPPP": 11912.8,
      "perCapitaPPPChangePct": 7.75,
      "popChangePct": -1.04
    },
    {
      "year": 2001,
      "gdpPPP": 471.703,
      "perCapitaPPP": 12330.8,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": -0.02
    },
    {
      "year": 2002,
      "gdpPPP": 485.948,
      "perCapitaPPP": 12707.1,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": -0.03
    },
    {
      "year": 2003,
      "gdpPPP": 513.001,
      "perCapitaPPP": 13422.8,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": -0.06
    },
    {
      "year": 2004,
      "gdpPPP": 553.613,
      "perCapitaPPP": 14496.1,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": -0.07
    },
    {
      "year": 2005,
      "gdpPPP": 589.592,
      "perCapitaPPP": 15444.9,
      "perCapitaPPPChangePct": 6.55,
      "popChangePct": -0.04
    },
    {
      "year": 2006,
      "gdpPPP": 645.469,
      "perCapitaPPP": 16916.1,
      "perCapitaPPPChangePct": 9.53,
      "popChangePct": -0.04
    },
    {
      "year": 2007,
      "gdpPPP": 707.776,
      "perCapitaPPP": 18564.4,
      "perCapitaPPPChangePct": 9.74,
      "popChangePct": -0.08
    },
    {
      "year": 2008,
      "gdpPPP": 753.036,
      "perCapitaPPP": 19756.6,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": -0.02
    },
    {
      "year": 2009,
      "gdpPPP": 777.494,
      "perCapitaPPP": 20387.5,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.05
    },
    {
      "year": 2010,
      "gdpPPP": 811.881,
      "perCapitaPPP": 21352.4,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": -0.3
    },
    {
      "year": 2011,
      "gdpPPP": 872.18,
      "perCapitaPPP": 22914.3,
      "perCapitaPPPChangePct": 7.31,
      "popChangePct": 0.11
    },
    {
      "year": 2012,
      "gdpPPP": 901.851,
      "perCapitaPPP": 23693.2,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 923.477,
      "perCapitaPPP": 24262.1,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": -0.0
    },
    {
      "year": 2014,
      "gdpPPP": 976.396,
      "perCapitaPPP": 25682.6,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": -0.12
    },
    {
      "year": 2015,
      "gdpPPP": 1029.131,
      "perCapitaPPP": 27078.4,
      "perCapitaPPPChangePct": 5.43,
      "popChangePct": -0.03
    },
    {
      "year": 2016,
      "gdpPPP": 1070.401,
      "perCapitaPPP": 28192.8,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": -0.1
    },
    {
      "year": 2017,
      "gdpPPP": 1145.711,
      "perCapitaPPP": 30171.8,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": 0.02
    },
    {
      "year": 2018,
      "gdpPPP": 1228.298,
      "perCapitaPPP": 32343.5,
      "perCapitaPPPChangePct": 7.2,
      "popChangePct": 0.01
    },
    {
      "year": 2019,
      "gdpPPP": 1362.291,
      "perCapitaPPP": 35875.4,
      "perCapitaPPPChangePct": 10.92,
      "popChangePct": -0.01
    },
    {
      "year": 2020,
      "gdpPPP": 1391.432,
      "perCapitaPPP": 36657.0,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": -0.04
    },
    {
      "year": 2021,
      "gdpPPP": 1544.889,
      "perCapitaPPP": 41671.1,
      "perCapitaPPPChangePct": 13.68,
      "popChangePct": -2.33
    },
    {
      "year": 2022,
      "gdpPPP": 1741.733,
      "perCapitaPPP": 47214.5,
      "perCapitaPPPChangePct": 13.3,
      "popChangePct": -0.49
    },
    {
      "year": 2023,
      "gdpPPP": 1810.686,
      "perCapitaPPP": 49265.4,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": -0.37
    },
    {
      "year": 2024,
      "gdpPPP": 1911.834,
      "perCapitaPPP": 52206.0,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": -0.36
    },
    {
      "year": 2025,
      "gdpPPP": 2036.311,
      "perCapitaPPP": 55793.2,
      "perCapitaPPPChangePct": 6.87,
      "popChangePct": -0.34
    },
    {
      "year": 2026,
      "gdpPPP": 2164.271,
      "perCapitaPPP": 59792.5,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": -0.82
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2264.444,
      "perCapitaPPP": 62685.3,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": -0.2
    },
    {
      "year": 2028,
      "gdpPPP": 2362.177,
      "perCapitaPPP": 65521.9,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": -0.2
    },
    {
      "year": 2029,
      "gdpPPP": 2465.564,
      "perCapitaPPP": 68526.7,
      "perCapitaPPPChangePct": 4.59,
      "popChangePct": -0.2
    },
    {
      "year": 2030,
      "gdpPPP": 2573.182,
      "perCapitaPPP": 71661.1,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": -0.2
    },
    {
      "year": 2031,
      "gdpPPP": 2684.623,
      "perCapitaPPP": 74914.4,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": -0.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PolandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
