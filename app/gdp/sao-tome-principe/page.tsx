import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Sao Tome & Principe",
  "slug": "sao-tome-principe",
  "iso3": "STP",
  "region": "Africa",
  "rank2026": 203,
  "flagEmoji": "🇸🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "St. Vincent & Grenadines",
      "slug": "st-vincent-grenadines",
      "rank": 202
    },
    {
      "name": "Saint Kitts & Nevis",
      "slug": "saint-kitts-nevis",
      "rank": 204
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.069,
      "growth": -1.1,
      "perCapita": 751.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.084,
      "growth": -10.3,
      "perCapita": 901.3,
      "popChangePct": 2.2
    },
    {
      "year": 1982,
      "gdp": 0.081,
      "growth": 3.1,
      "perCapita": 848.2,
      "popChangePct": 2.15
    },
    {
      "year": 1983,
      "gdp": 0.076,
      "growth": -3.9,
      "perCapita": 774.9,
      "popChangePct": 3.16
    },
    {
      "year": 1984,
      "gdp": 0.079,
      "growth": -6,
      "perCapita": 787.1,
      "popChangePct": 2.04
    },
    {
      "year": 1985,
      "gdp": 0.083,
      "growth": 9.3,
      "perCapita": 810.9,
      "popChangePct": 3.0
    },
    {
      "year": 1986,
      "gdp": 0.117,
      "growth": -5.8,
      "perCapita": 1106.4,
      "popChangePct": 2.91
    },
    {
      "year": 1987,
      "gdp": 0.117,
      "growth": -2.9,
      "perCapita": 1076.2,
      "popChangePct": 2.83
    },
    {
      "year": 1988,
      "gdp": 0.1,
      "growth": 2,
      "perCapita": 893.5,
      "popChangePct": 2.75
    },
    {
      "year": 1989,
      "gdp": 0.099,
      "growth": 3.1,
      "perCapita": 863.9,
      "popChangePct": 2.68
    },
    {
      "year": 1990,
      "gdp": 0.12,
      "growth": -2.2,
      "perCapita": 1016.8,
      "popChangePct": 2.61
    },
    {
      "year": 1991,
      "gdp": 0.108,
      "growth": 1.2,
      "perCapita": 891.4,
      "popChangePct": 3.39
    },
    {
      "year": 1992,
      "gdp": 0.096,
      "growth": 0.7,
      "perCapita": 763.4,
      "popChangePct": 2.46
    },
    {
      "year": 1993,
      "gdp": 0.127,
      "growth": 1.1,
      "perCapita": 1000.1,
      "popChangePct": 1.6
    },
    {
      "year": 1994,
      "gdp": 0.132,
      "growth": 2.2,
      "perCapita": 1025.2,
      "popChangePct": 1.57
    },
    {
      "year": 1995,
      "gdp": 0.104,
      "growth": 2,
      "perCapita": 794.4,
      "popChangePct": 1.55
    },
    {
      "year": 1996,
      "gdp": 0.136,
      "growth": 1.5,
      "perCapita": 1016.6,
      "popChangePct": 2.29
    },
    {
      "year": 1997,
      "gdp": 0.093,
      "growth": 1,
      "perCapita": 678.6,
      "popChangePct": 1.49
    },
    {
      "year": 1998,
      "gdp": 0.073,
      "growth": 2.5,
      "perCapita": 524.0,
      "popChangePct": 2.21
    },
    {
      "year": 1999,
      "gdp": 0.078,
      "growth": 2.5,
      "perCapita": 550.4,
      "popChangePct": 1.44
    },
    {
      "year": 2000,
      "gdp": 0.077,
      "growth": 0.4,
      "perCapita": 533.0,
      "popChangePct": 2.13
    },
    {
      "year": 2001,
      "gdp": 0.072,
      "growth": 2.4,
      "perCapita": 489.4,
      "popChangePct": 1.39
    },
    {
      "year": 2002,
      "gdp": 0.08,
      "growth": 2.4,
      "perCapita": 532.7,
      "popChangePct": 2.74
    },
    {
      "year": 2003,
      "gdp": 0.096,
      "growth": 6.6,
      "perCapita": 621.2,
      "popChangePct": 2.67
    },
    {
      "year": 2004,
      "gdp": 0.104,
      "growth": 3.8,
      "perCapita": 662.5,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdp": 0.125,
      "growth": 7.1,
      "perCapita": 774.2,
      "popChangePct": 2.53
    },
    {
      "year": 2006,
      "gdp": 0.133,
      "growth": 9.1,
      "perCapita": 804.9,
      "popChangePct": 2.47
    },
    {
      "year": 2007,
      "gdp": 0.145,
      "growth": 3.3,
      "perCapita": 852.2,
      "popChangePct": 2.41
    },
    {
      "year": 2008,
      "gdp": 0.188,
      "growth": 8.2,
      "perCapita": 1081.9,
      "popChangePct": 2.35
    },
    {
      "year": 2009,
      "gdp": 0.201,
      "growth": 3.3,
      "perCapita": 1128.3,
      "popChangePct": 2.3
    },
    {
      "year": 2010,
      "gdp": 0.191,
      "growth": 1.4,
      "perCapita": 1049.5,
      "popChangePct": 2.25
    },
    {
      "year": 2011,
      "gdp": 0.228,
      "growth": 2,
      "perCapita": 1228.8,
      "popChangePct": 2.2
    },
    {
      "year": 2012,
      "gdp": 0.231,
      "growth": 2.9,
      "perCapita": 1219.9,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdp": 0.269,
      "growth": 5.1,
      "perCapita": 1393.3,
      "popChangePct": 2.12
    },
    {
      "year": 2014,
      "gdp": 0.295,
      "growth": 4.9,
      "perCapita": 1500.0,
      "popChangePct": 2.07
    },
    {
      "year": 2015,
      "gdp": 0.262,
      "growth": 1.5,
      "perCapita": 1307.1,
      "popChangePct": 1.52
    },
    {
      "year": 2016,
      "gdp": 0.294,
      "growth": 5.2,
      "perCapita": 1443.4,
      "popChangePct": 2.0
    },
    {
      "year": 2017,
      "gdp": 0.325,
      "growth": 4.1,
      "perCapita": 1571.5,
      "popChangePct": 1.47
    },
    {
      "year": 2018,
      "gdp": 0.387,
      "growth": 4.4,
      "perCapita": 1840.6,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdp": 0.416,
      "growth": 2,
      "perCapita": 1950.0,
      "popChangePct": 1.43
    },
    {
      "year": 2020,
      "gdp": 0.476,
      "growth": 2.6,
      "perCapita": 2187.5,
      "popChangePct": 1.88
    },
    {
      "year": 2021,
      "gdp": 0.529,
      "growth": 1.9,
      "perCapita": 2381.4,
      "popChangePct": 2.3
    },
    {
      "year": 2022,
      "gdp": 0.546,
      "growth": 0.2,
      "perCapita": 2412.1,
      "popChangePct": 1.8
    },
    {
      "year": 2023,
      "gdp": 0.696,
      "growth": 0.4,
      "perCapita": 3013.9,
      "popChangePct": 2.21
    },
    {
      "year": 2024,
      "gdp": 0.828,
      "growth": 1.1,
      "perCapita": 3516.9,
      "popChangePct": 2.16
    },
    {
      "year": 2025,
      "gdp": 0.981,
      "growth": 2.1,
      "perCapita": 4085.2,
      "popChangePct": 1.69
    },
    {
      "year": 2026,
      "gdp": 1.161,
      "growth": 3.4,
      "perCapita": 4739.3,
      "popChangePct": 2.08
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.294,
      "growth": 3.9,
      "perCapita": 5179.6,
      "popChangePct": 2.04
    },
    {
      "year": 2028,
      "gdp": 1.412,
      "growth": 3.3,
      "perCapita": 5544.1,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdp": 1.538,
      "growth": 3.3,
      "perCapita": 5925.0,
      "popChangePct": 1.96
    },
    {
      "year": 2030,
      "gdp": 1.679,
      "growth": 3.3,
      "perCapita": 6345.2,
      "popChangePct": 1.92
    },
    {
      "year": 2031,
      "gdp": 1.82,
      "growth": 3.2,
      "perCapita": 6751.2,
      "popChangePct": 1.89
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.137,
      "perCapitaPPP": 1501.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.135,
      "perCapitaPPP": 1444.7,
      "perCapitaPPPChangePct": -3.77,
      "popChangePct": 2.2
    },
    {
      "year": 1982,
      "gdpPPP": 0.148,
      "perCapitaPPP": 1547.3,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": 2.15
    },
    {
      "year": 1983,
      "gdpPPP": 0.147,
      "perCapitaPPP": 1509.8,
      "perCapitaPPPChangePct": -2.42,
      "popChangePct": 3.16
    },
    {
      "year": 1984,
      "gdpPPP": 0.144,
      "perCapitaPPP": 1433.8,
      "perCapitaPPPChangePct": -5.04,
      "popChangePct": 2.04
    },
    {
      "year": 1985,
      "gdpPPP": 0.162,
      "perCapitaPPP": 1574.6,
      "perCapitaPPPChangePct": 9.82,
      "popChangePct": 3.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.155,
      "perCapitaPPP": 1472.9,
      "perCapitaPPPChangePct": -6.46,
      "popChangePct": 2.91
    },
    {
      "year": 1987,
      "gdpPPP": 0.155,
      "perCapitaPPP": 1424.9,
      "perCapitaPPPChangePct": -3.26,
      "popChangePct": 2.83
    },
    {
      "year": 1988,
      "gdpPPP": 0.163,
      "perCapitaPPP": 1463.1,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 2.75
    },
    {
      "year": 1989,
      "gdpPPP": 0.175,
      "perCapitaPPP": 1523.2,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 2.68
    },
    {
      "year": 1990,
      "gdpPPP": 0.178,
      "perCapitaPPP": 1503.2,
      "perCapitaPPPChangePct": -1.32,
      "popChangePct": 2.61
    },
    {
      "year": 1991,
      "gdpPPP": 0.186,
      "perCapitaPPP": 1528.8,
      "perCapitaPPPChangePct": 1.71,
      "popChangePct": 3.39
    },
    {
      "year": 1992,
      "gdpPPP": 0.191,
      "perCapitaPPP": 1529.4,
      "perCapitaPPPChangePct": 0.04,
      "popChangePct": 2.46
    },
    {
      "year": 1993,
      "gdpPPP": 0.198,
      "perCapitaPPP": 1564.4,
      "perCapitaPPPChangePct": 2.29,
      "popChangePct": 1.6
    },
    {
      "year": 1994,
      "gdpPPP": 0.207,
      "perCapitaPPP": 1602.6,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 1.57
    },
    {
      "year": 1995,
      "gdpPPP": 0.215,
      "perCapitaPPP": 1638.1,
      "perCapitaPPPChangePct": 2.21,
      "popChangePct": 1.55
    },
    {
      "year": 1996,
      "gdpPPP": 0.223,
      "perCapitaPPP": 1661.9,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 2.29
    },
    {
      "year": 1997,
      "gdpPPP": 0.229,
      "perCapitaPPP": 1676.2,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 1.49
    },
    {
      "year": 1998,
      "gdpPPP": 0.237,
      "perCapitaPPP": 1706.0,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 2.21
    },
    {
      "year": 1999,
      "gdpPPP": 0.246,
      "perCapitaPPP": 1741.7,
      "perCapitaPPPChangePct": 2.09,
      "popChangePct": 1.44
    },
    {
      "year": 2000,
      "gdpPPP": 0.253,
      "perCapitaPPP": 1757.7,
      "perCapitaPPPChangePct": 0.92,
      "popChangePct": 2.13
    },
    {
      "year": 2001,
      "gdpPPP": 0.265,
      "perCapitaPPP": 1810.8,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 1.39
    },
    {
      "year": 2002,
      "gdpPPP": 0.276,
      "perCapitaPPP": 1838.1,
      "perCapitaPPPChangePct": 1.51,
      "popChangePct": 2.74
    },
    {
      "year": 2003,
      "gdpPPP": 0.299,
      "perCapitaPPP": 1947.0,
      "perCapitaPPPChangePct": 5.93,
      "popChangePct": 2.67
    },
    {
      "year": 2004,
      "gdpPPP": 0.319,
      "perCapitaPPP": 2024.8,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdpPPP": 0.353,
      "perCapitaPPP": 2182.0,
      "perCapitaPPPChangePct": 7.76,
      "popChangePct": 2.53
    },
    {
      "year": 2006,
      "gdpPPP": 0.397,
      "perCapitaPPP": 2395.1,
      "perCapitaPPPChangePct": 9.77,
      "popChangePct": 2.47
    },
    {
      "year": 2007,
      "gdpPPP": 0.421,
      "perCapitaPPP": 2479.2,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 2.41
    },
    {
      "year": 2008,
      "gdpPPP": 0.464,
      "perCapitaPPP": 2669.4,
      "perCapitaPPPChangePct": 7.67,
      "popChangePct": 2.35
    },
    {
      "year": 2009,
      "gdpPPP": 0.482,
      "perCapitaPPP": 2711.2,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 2.3
    },
    {
      "year": 2010,
      "gdpPPP": 0.495,
      "perCapitaPPP": 2723.5,
      "perCapitaPPPChangePct": 0.45,
      "popChangePct": 2.25
    },
    {
      "year": 2011,
      "gdpPPP": 0.515,
      "perCapitaPPP": 2776.5,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": 2.2
    },
    {
      "year": 2012,
      "gdpPPP": 0.541,
      "perCapitaPPP": 2853.2,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdpPPP": 0.578,
      "perCapitaPPP": 2991.7,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 2.12
    },
    {
      "year": 2014,
      "gdpPPP": 0.617,
      "perCapitaPPP": 3134.4,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 2.07
    },
    {
      "year": 2015,
      "gdpPPP": 0.632,
      "perCapitaPPP": 3155.7,
      "perCapitaPPPChangePct": 0.68,
      "popChangePct": 1.52
    },
    {
      "year": 2016,
      "gdpPPP": 0.671,
      "perCapitaPPP": 3294.7,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 2.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.711,
      "perCapitaPPP": 3436.3,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 1.47
    },
    {
      "year": 2018,
      "gdpPPP": 0.828,
      "perCapitaPPP": 3941.0,
      "perCapitaPPPChangePct": 14.69,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdpPPP": 0.993,
      "perCapitaPPP": 4655.5,
      "perCapitaPPPChangePct": 18.13,
      "popChangePct": 1.43
    },
    {
      "year": 2020,
      "gdpPPP": 1.119,
      "perCapitaPPP": 5144.5,
      "perCapitaPPPChangePct": 10.51,
      "popChangePct": 1.88
    },
    {
      "year": 2021,
      "gdpPPP": 1.272,
      "perCapitaPPP": 5732.7,
      "perCapitaPPPChangePct": 11.43,
      "popChangePct": 2.3
    },
    {
      "year": 2022,
      "gdpPPP": 1.365,
      "perCapitaPPP": 6032.7,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 1.8
    },
    {
      "year": 2023,
      "gdpPPP": 1.421,
      "perCapitaPPP": 6155.0,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": 2.21
    },
    {
      "year": 2024,
      "gdpPPP": 1.472,
      "perCapitaPPP": 6251.5,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 2.16
    },
    {
      "year": 2025,
      "gdpPPP": 1.546,
      "perCapitaPPP": 6435.0,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 1.69
    },
    {
      "year": 2026,
      "gdpPPP": 1.644,
      "perCapitaPPP": 6712.0,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 2.08
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1.746,
      "perCapitaPPP": 6990.1,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 2.04
    },
    {
      "year": 2028,
      "gdpPPP": 1.832,
      "perCapitaPPP": 7195.4,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdpPPP": 1.926,
      "perCapitaPPP": 7417.7,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 1.96
    },
    {
      "year": 2030,
      "gdpPPP": 2.025,
      "perCapitaPPP": 7653.5,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 1.92
    },
    {
      "year": 2031,
      "gdpPPP": 2.128,
      "perCapitaPPP": 7895.5,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 1.89
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SaoTomePrincipeGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
