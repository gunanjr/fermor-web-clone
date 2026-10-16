import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Spain",
  "slug": "spain",
  "iso3": "ESP",
  "region": "Europe",
  "rank2026": 14,
  "flagEmoji": "🇪🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Mexico",
      "slug": "mexico",
      "rank": 13
    },
    {
      "name": "South Korea",
      "slug": "south-korea",
      "rank": 15
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 231.048,
      "growth": 1.2,
      "perCapita": 6118.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 204.843,
      "growth": -0.4,
      "perCapita": 5373.9,
      "popChangePct": 0.95
    },
    {
      "year": 1982,
      "gdp": 197.89,
      "growth": 1.2,
      "perCapita": 5163.8,
      "popChangePct": 0.54
    },
    {
      "year": 1983,
      "gdp": 173.072,
      "growth": 1.7,
      "perCapita": 4495.1,
      "popChangePct": 0.47
    },
    {
      "year": 1984,
      "gdp": 172.597,
      "growth": 1.7,
      "perCapita": 4465.0,
      "popChangePct": 0.4
    },
    {
      "year": 1985,
      "gdp": 181.847,
      "growth": 2.4,
      "perCapita": 4687.8,
      "popChangePct": 0.35
    },
    {
      "year": 1986,
      "gdp": 251.618,
      "growth": 3.4,
      "perCapita": 6467.7,
      "popChangePct": 0.29
    },
    {
      "year": 1987,
      "gdp": 318.787,
      "growth": 5.7,
      "perCapita": 8175.1,
      "popChangePct": 0.23
    },
    {
      "year": 1988,
      "gdp": 374.535,
      "growth": 5.3,
      "perCapita": 9584.4,
      "popChangePct": 0.21
    },
    {
      "year": 1989,
      "gdp": 413.106,
      "growth": 5,
      "perCapita": 10550.4,
      "popChangePct": 0.2
    },
    {
      "year": 1990,
      "gdp": 536.322,
      "growth": 3.8,
      "perCapita": 13673.3,
      "popChangePct": 0.18
    },
    {
      "year": 1991,
      "gdp": 577.166,
      "growth": 2.5,
      "perCapita": 14675.6,
      "popChangePct": 0.27
    },
    {
      "year": 1992,
      "gdp": 630.91,
      "growth": 0.9,
      "perCapita": 15989.3,
      "popChangePct": 0.33
    },
    {
      "year": 1993,
      "gdp": 529.98,
      "growth": -1.3,
      "perCapita": 13389.8,
      "popChangePct": 0.31
    },
    {
      "year": 1994,
      "gdp": 531.801,
      "growth": 2.3,
      "perCapita": 13399.7,
      "popChangePct": 0.27
    },
    {
      "year": 1995,
      "gdp": 614.713,
      "growth": 4.1,
      "perCapita": 15452.6,
      "popChangePct": 0.23
    },
    {
      "year": 1996,
      "gdp": 642.48,
      "growth": 2.4,
      "perCapita": 16113.3,
      "popChangePct": 0.23
    },
    {
      "year": 1997,
      "gdp": 590.5,
      "growth": 3.9,
      "perCapita": 14770.7,
      "popChangePct": 0.26
    },
    {
      "year": 1998,
      "gdp": 619.541,
      "growth": 4.5,
      "perCapita": 15443.0,
      "popChangePct": 0.35
    },
    {
      "year": 1999,
      "gdp": 635.025,
      "growth": 4.7,
      "perCapita": 15747.6,
      "popChangePct": 0.52
    },
    {
      "year": 2000,
      "gdp": 598.367,
      "growth": 5.1,
      "perCapita": 14714.4,
      "popChangePct": 0.85
    },
    {
      "year": 2001,
      "gdp": 627.803,
      "growth": 3.9,
      "perCapita": 15299.1,
      "popChangePct": 0.91
    },
    {
      "year": 2002,
      "gdp": 708.437,
      "growth": 2.8,
      "perCapita": 16937.0,
      "popChangePct": 1.93
    },
    {
      "year": 2003,
      "gdp": 907.736,
      "growth": 2.9,
      "perCapita": 21334.7,
      "popChangePct": 1.72
    },
    {
      "year": 2004,
      "gdp": 1069.344,
      "growth": 3.1,
      "perCapita": 24698.3,
      "popChangePct": 1.76
    },
    {
      "year": 2005,
      "gdp": 1155.306,
      "growth": 3.6,
      "perCapita": 26251.0,
      "popChangePct": 1.65
    },
    {
      "year": 2006,
      "gdp": 1261.914,
      "growth": 4,
      "perCapita": 28177.4,
      "popChangePct": 1.76
    },
    {
      "year": 2007,
      "gdp": 1476.92,
      "growth": 3.5,
      "perCapita": 32339.7,
      "popChangePct": 1.97
    },
    {
      "year": 2008,
      "gdp": 1635.936,
      "growth": 0.8,
      "perCapita": 35379.8,
      "popChangePct": 1.25
    },
    {
      "year": 2009,
      "gdp": 1494.963,
      "growth": -3.8,
      "perCapita": 32159.0,
      "popChangePct": 0.54
    },
    {
      "year": 2010,
      "gdp": 1429.155,
      "growth": 0.1,
      "perCapita": 30624.4,
      "popChangePct": 0.39
    },
    {
      "year": 2011,
      "gdp": 1487.307,
      "growth": -0.6,
      "perCapita": 31767.7,
      "popChangePct": 0.32
    },
    {
      "year": 2012,
      "gdp": 1331.838,
      "growth": -2.9,
      "perCapita": 28511.3,
      "popChangePct": -0.22
    },
    {
      "year": 2013,
      "gdp": 1362.207,
      "growth": -1.4,
      "perCapita": 29297.5,
      "popChangePct": -0.46
    },
    {
      "year": 2014,
      "gdp": 1380.6,
      "growth": 1.5,
      "perCapita": 29737.8,
      "popChangePct": -0.15
    },
    {
      "year": 2015,
      "gdp": 1206.287,
      "growth": 4.1,
      "perCapita": 25987.0,
      "popChangePct": -0.02
    },
    {
      "year": 2016,
      "gdp": 1242.673,
      "growth": 2.9,
      "perCapita": 26725.6,
      "popChangePct": 0.17
    },
    {
      "year": 2017,
      "gdp": 1321.288,
      "growth": 2.9,
      "perCapita": 28326.4,
      "popChangePct": 0.32
    },
    {
      "year": 2018,
      "gdp": 1432.292,
      "growth": 2.4,
      "perCapita": 30526.9,
      "popChangePct": 0.59
    },
    {
      "year": 2019,
      "gdp": 1403.651,
      "growth": 2,
      "perCapita": 29664.2,
      "popChangePct": 0.85
    },
    {
      "year": 2020,
      "gdp": 1288.751,
      "growth": -10.9,
      "perCapita": 27188.4,
      "popChangePct": 0.18
    },
    {
      "year": 2021,
      "gdp": 1462.216,
      "growth": 6.7,
      "perCapita": 30792.1,
      "popChangePct": 0.18
    },
    {
      "year": 2022,
      "gdp": 1449.99,
      "growth": 6.4,
      "perCapita": 30154.5,
      "popChangePct": 1.26
    },
    {
      "year": 2023,
      "gdp": 1619.949,
      "growth": 2.5,
      "perCapita": 33312.9,
      "popChangePct": 1.13
    },
    {
      "year": 2024,
      "gdp": 1725.152,
      "growth": 3.5,
      "perCapita": 35151.2,
      "popChangePct": 0.93
    },
    {
      "year": 2025,
      "gdp": 1903.826,
      "growth": 2.8,
      "perCapita": 38290.4,
      "popChangePct": 1.31
    },
    {
      "year": 2026,
      "gdp": 2091.222,
      "growth": 2.1,
      "perCapita": 41563.2,
      "popChangePct": 1.19
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2186.521,
      "growth": 1.8,
      "perCapita": 43007.7,
      "popChangePct": 1.05
    },
    {
      "year": 2028,
      "gdp": 2284.752,
      "growth": 1.8,
      "perCapita": 44542.4,
      "popChangePct": 0.89
    },
    {
      "year": 2029,
      "gdp": 2375.602,
      "growth": 1.7,
      "perCapita": 45968.3,
      "popChangePct": 0.75
    },
    {
      "year": 2030,
      "gdp": 2472.203,
      "growth": 1.7,
      "perCapita": 47538.5,
      "popChangePct": 0.63
    },
    {
      "year": 2031,
      "gdp": 2572.443,
      "growth": 1.7,
      "perCapita": 49205.4,
      "popChangePct": 0.53
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 313.983,
      "perCapitaPPP": 8315.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 342.287,
      "perCapitaPPP": 8979.6,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 0.95
    },
    {
      "year": 1982,
      "gdpPPP": 367.94,
      "perCapitaPPP": 9601.2,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 0.54
    },
    {
      "year": 1983,
      "gdpPPP": 388.666,
      "perCapitaPPP": 10094.7,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 0.47
    },
    {
      "year": 1984,
      "gdpPPP": 409.532,
      "perCapitaPPP": 10594.4,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 0.4
    },
    {
      "year": 1985,
      "gdpPPP": 432.461,
      "perCapitaPPP": 11148.3,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 0.35
    },
    {
      "year": 1986,
      "gdpPPP": 456.308,
      "perCapitaPPP": 11729.1,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 0.29
    },
    {
      "year": 1987,
      "gdpPPP": 494.312,
      "perCapitaPPP": 12676.3,
      "perCapitaPPPChangePct": 8.08,
      "popChangePct": 0.23
    },
    {
      "year": 1988,
      "gdpPPP": 538.787,
      "perCapitaPPP": 13787.6,
      "perCapitaPPPChangePct": 8.77,
      "popChangePct": 0.21
    },
    {
      "year": 1989,
      "gdpPPP": 587.933,
      "perCapitaPPP": 15015.4,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": 0.2
    },
    {
      "year": 1990,
      "gdpPPP": 633.398,
      "perCapitaPPP": 16148.2,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 0.18
    },
    {
      "year": 1991,
      "gdpPPP": 671.359,
      "perCapitaPPP": 17070.7,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 0.27
    },
    {
      "year": 1992,
      "gdpPPP": 692.5,
      "perCapitaPPP": 17550.2,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 0.33
    },
    {
      "year": 1993,
      "gdpPPP": 699.6,
      "perCapitaPPP": 17675.1,
      "perCapitaPPPChangePct": 0.71,
      "popChangePct": 0.31
    },
    {
      "year": 1994,
      "gdpPPP": 731.221,
      "perCapitaPPP": 18424.4,
      "perCapitaPPPChangePct": 4.24,
      "popChangePct": 0.27
    },
    {
      "year": 1995,
      "gdpPPP": 777.324,
      "perCapitaPPP": 19540.3,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 0.23
    },
    {
      "year": 1996,
      "gdpPPP": 810.722,
      "perCapitaPPP": 20332.8,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 0.23
    },
    {
      "year": 1997,
      "gdpPPP": 856.581,
      "perCapitaPPP": 21426.3,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.26
    },
    {
      "year": 1998,
      "gdpPPP": 904.917,
      "perCapitaPPP": 22556.4,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 0.35
    },
    {
      "year": 1999,
      "gdpPPP": 961.271,
      "perCapitaPPP": 23837.9,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 0.52
    },
    {
      "year": 2000,
      "gdpPPP": 1032.718,
      "perCapitaPPP": 25395.4,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 0.85
    },
    {
      "year": 2001,
      "gdpPPP": 1097.356,
      "perCapitaPPP": 26741.8,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 0.91
    },
    {
      "year": 2002,
      "gdpPPP": 1145.117,
      "perCapitaPPP": 27376.9,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 1.93
    },
    {
      "year": 2003,
      "gdpPPP": 1202.046,
      "perCapitaPPP": 28251.9,
      "perCapitaPPPChangePct": 3.2,
      "popChangePct": 1.72
    },
    {
      "year": 2004,
      "gdpPPP": 1272.813,
      "perCapitaPPP": 29397.7,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 1.76
    },
    {
      "year": 2005,
      "gdpPPP": 1359.343,
      "perCapitaPPP": 30887.2,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 1.65
    },
    {
      "year": 2006,
      "gdpPPP": 1457.923,
      "perCapitaPPP": 32554.1,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 1.76
    },
    {
      "year": 2007,
      "gdpPPP": 1550.334,
      "perCapitaPPP": 33947.2,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 1.97
    },
    {
      "year": 2008,
      "gdpPPP": 1592.322,
      "perCapitaPPP": 34436.6,
      "perCapitaPPPChangePct": 1.44,
      "popChangePct": 1.25
    },
    {
      "year": 2009,
      "gdpPPP": 1541.773,
      "perCapitaPPP": 33165.9,
      "perCapitaPPPChangePct": -3.69,
      "popChangePct": 0.54
    },
    {
      "year": 2010,
      "gdpPPP": 1561.979,
      "perCapitaPPP": 33470.6,
      "perCapitaPPPChangePct": 0.92,
      "popChangePct": 0.39
    },
    {
      "year": 2011,
      "gdpPPP": 1584.005,
      "perCapitaPPP": 33833.1,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 0.32
    },
    {
      "year": 2012,
      "gdpPPP": 1567.27,
      "perCapitaPPP": 33551.3,
      "perCapitaPPPChangePct": -0.83,
      "popChangePct": -0.22
    },
    {
      "year": 2013,
      "gdpPPP": 1571.193,
      "perCapitaPPP": 33792.2,
      "perCapitaPPPChangePct": 0.72,
      "popChangePct": -0.46
    },
    {
      "year": 2014,
      "gdpPPP": 1622.865,
      "perCapitaPPP": 34956.2,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": -0.15
    },
    {
      "year": 2015,
      "gdpPPP": 1704.439,
      "perCapitaPPP": 36718.7,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": -0.02
    },
    {
      "year": 2016,
      "gdpPPP": 1770.795,
      "perCapitaPPP": 38083.8,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 0.17
    },
    {
      "year": 2017,
      "gdpPPP": 1854.71,
      "perCapitaPPP": 39762.2,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 0.32
    },
    {
      "year": 2018,
      "gdpPPP": 1918.773,
      "perCapitaPPP": 40895.5,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 0.59
    },
    {
      "year": 2019,
      "gdpPPP": 2075.23,
      "perCapitaPPP": 43857.0,
      "perCapitaPPPChangePct": 7.24,
      "popChangePct": 0.85
    },
    {
      "year": 2020,
      "gdpPPP": 1862.545,
      "perCapitaPPP": 39293.5,
      "perCapitaPPPChangePct": -10.41,
      "popChangePct": 0.18
    },
    {
      "year": 2021,
      "gdpPPP": 2090.614,
      "perCapitaPPP": 44025.2,
      "perCapitaPPPChangePct": 12.04,
      "popChangePct": 0.18
    },
    {
      "year": 2022,
      "gdpPPP": 2381.958,
      "perCapitaPPP": 49536.0,
      "perCapitaPPPChangePct": 12.52,
      "popChangePct": 1.26
    },
    {
      "year": 2023,
      "gdpPPP": 2530.877,
      "perCapitaPPP": 52045.4,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 1.13
    },
    {
      "year": 2024,
      "gdpPPP": 2683.325,
      "perCapitaPPP": 54674.7,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 0.93
    },
    {
      "year": 2025,
      "gdpPPP": 2835.764,
      "perCapitaPPP": 57033.8,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 1.31
    },
    {
      "year": 2026,
      "gdpPPP": 2977.96,
      "perCapitaPPP": 59187.2,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 1.19
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3098.725,
      "perCapitaPPP": 60950.3,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 1.05
    },
    {
      "year": 2028,
      "gdpPPP": 3207.073,
      "perCapitaPPP": 62523.5,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 0.89
    },
    {
      "year": 2029,
      "gdpPPP": 3319.662,
      "perCapitaPPP": 64236.1,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 0.75
    },
    {
      "year": 2030,
      "gdpPPP": 3438.214,
      "perCapitaPPP": 66114.1,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.63
    },
    {
      "year": 2031,
      "gdpPPP": 3559.776,
      "perCapitaPPP": 68091.1,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 0.53
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SpainGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
