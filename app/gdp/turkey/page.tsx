import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Turkey",
  "slug": "turkey",
  "iso3": "TUR",
  "region": "Asia",
  "rank2026": 16,
  "flagEmoji": "🇹🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "South Korea",
      "slug": "south-korea",
      "rank": 15
    },
    {
      "name": "Indonesia",
      "slug": "indonesia",
      "rank": 17
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 96.629,
      "growth": -0.8,
      "perCapita": 2149.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 97.898,
      "growth": 4.4,
      "perCapita": 2128.9,
      "popChangePct": 2.3
    },
    {
      "year": 1982,
      "gdp": 88.948,
      "growth": 3.4,
      "perCapita": 1890.7,
      "popChangePct": 2.31
    },
    {
      "year": 1983,
      "gdp": 84.996,
      "growth": 4.8,
      "perCapita": 1766.5,
      "popChangePct": 2.28
    },
    {
      "year": 1984,
      "gdp": 82.67,
      "growth": 6.8,
      "perCapita": 1681.0,
      "popChangePct": 2.21
    },
    {
      "year": 1985,
      "gdp": 92.858,
      "growth": 4.3,
      "perCapita": 1849.0,
      "popChangePct": 2.12
    },
    {
      "year": 1986,
      "gdp": 102.371,
      "growth": 6.9,
      "perCapita": 1997.9,
      "popChangePct": 2.03
    },
    {
      "year": 1987,
      "gdp": 118.966,
      "growth": 10,
      "perCapita": 2277.6,
      "popChangePct": 1.94
    },
    {
      "year": 1988,
      "gdp": 125.075,
      "growth": 2.1,
      "perCapita": 2350.7,
      "popChangePct": 1.86
    },
    {
      "year": 1989,
      "gdp": 147.777,
      "growth": 0.3,
      "perCapita": 2728.2,
      "popChangePct": 1.8
    },
    {
      "year": 1990,
      "gdp": 207.578,
      "growth": 9.3,
      "perCapita": 3766.2,
      "popChangePct": 1.75
    },
    {
      "year": 1991,
      "gdp": 208.473,
      "growth": 0.9,
      "perCapita": 3719.1,
      "popChangePct": 1.7
    },
    {
      "year": 1992,
      "gdp": 219.25,
      "growth": 6,
      "perCapita": 3847.4,
      "popChangePct": 1.66
    },
    {
      "year": 1993,
      "gdp": 248.657,
      "growth": 8,
      "perCapita": 4293.6,
      "popChangePct": 1.63
    },
    {
      "year": 1994,
      "gdp": 179.42,
      "growth": -5.5,
      "perCapita": 3049.4,
      "popChangePct": 1.6
    },
    {
      "year": 1995,
      "gdp": 233.645,
      "growth": 7.2,
      "perCapita": 3910.0,
      "popChangePct": 1.56
    },
    {
      "year": 1996,
      "gdp": 250.571,
      "growth": 7,
      "perCapita": 4130.0,
      "popChangePct": 1.53
    },
    {
      "year": 1997,
      "gdp": 261.946,
      "growth": 7.5,
      "perCapita": 4253.6,
      "popChangePct": 1.5
    },
    {
      "year": 1998,
      "gdp": 277.693,
      "growth": 3.1,
      "perCapita": 4445.7,
      "popChangePct": 1.43
    },
    {
      "year": 1999,
      "gdp": 254.3,
      "growth": -3.1,
      "perCapita": 4013.3,
      "popChangePct": 1.44
    },
    {
      "year": 2000,
      "gdp": 273.57,
      "growth": 7,
      "perCapita": 4256.6,
      "popChangePct": 1.43
    },
    {
      "year": 2001,
      "gdp": 203.001,
      "growth": -5.5,
      "perCapita": 3115.1,
      "popChangePct": 1.4
    },
    {
      "year": 2002,
      "gdp": 238.674,
      "growth": 6.4,
      "perCapita": 3616.1,
      "popChangePct": 1.28
    },
    {
      "year": 2003,
      "gdp": 317.342,
      "growth": 5.8,
      "perCapita": 4751.0,
      "popChangePct": 1.2
    },
    {
      "year": 2004,
      "gdp": 408.309,
      "growth": 9.9,
      "perCapita": 6040.2,
      "popChangePct": 1.2
    },
    {
      "year": 2005,
      "gdp": 506.794,
      "growth": 9.1,
      "perCapita": 7405.5,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdp": 554.902,
      "growth": 7.1,
      "perCapita": 8007.8,
      "popChangePct": 1.26
    },
    {
      "year": 2007,
      "gdp": 686.909,
      "growth": 5.1,
      "perCapita": 9790.9,
      "popChangePct": 1.25
    },
    {
      "year": 2008,
      "gdp": 787.897,
      "growth": 0.9,
      "perCapita": 11089.0,
      "popChangePct": 1.27
    },
    {
      "year": 2009,
      "gdp": 656.134,
      "growth": -4.9,
      "perCapita": 9108.0,
      "popChangePct": 1.39
    },
    {
      "year": 2010,
      "gdp": 783.025,
      "growth": 8.5,
      "perCapita": 10705.5,
      "popChangePct": 1.53
    },
    {
      "year": 2011,
      "gdp": 843.326,
      "growth": 11,
      "perCapita": 11361.9,
      "popChangePct": 1.48
    },
    {
      "year": 2012,
      "gdp": 882.437,
      "growth": 4.8,
      "perCapita": 11738.3,
      "popChangePct": 1.28
    },
    {
      "year": 2013,
      "gdp": 962.457,
      "growth": 8.5,
      "perCapita": 12639.3,
      "popChangePct": 1.29
    },
    {
      "year": 2014,
      "gdp": 943.337,
      "growth": 4.6,
      "perCapita": 12222.2,
      "popChangePct": 1.36
    },
    {
      "year": 2015,
      "gdp": 868.204,
      "growth": 5.8,
      "perCapita": 11099.8,
      "popChangePct": 1.34
    },
    {
      "year": 2016,
      "gdp": 870.339,
      "growth": 3.3,
      "perCapita": 10978.3,
      "popChangePct": 1.36
    },
    {
      "year": 2017,
      "gdp": 863.906,
      "growth": 7.8,
      "perCapita": 10756.7,
      "popChangePct": 1.31
    },
    {
      "year": 2018,
      "gdp": 807.318,
      "growth": 3.5,
      "perCapita": 9917.1,
      "popChangePct": 1.36
    },
    {
      "year": 2019,
      "gdp": 775.223,
      "growth": 1.3,
      "perCapita": 9387.7,
      "popChangePct": 1.44
    },
    {
      "year": 2020,
      "gdp": 730.345,
      "growth": 1.8,
      "perCapita": 8758.7,
      "popChangePct": 0.98
    },
    {
      "year": 2021,
      "gdp": 827.673,
      "growth": 11.8,
      "perCapita": 9836.0,
      "popChangePct": 0.91
    },
    {
      "year": 2022,
      "gdp": 924.752,
      "growth": 5.4,
      "perCapita": 10882.0,
      "popChangePct": 0.99
    },
    {
      "year": 2023,
      "gdp": 1153.295,
      "growth": 5,
      "perCapita": 13516.3,
      "popChangePct": 0.41
    },
    {
      "year": 2024,
      "gdp": 1358.251,
      "growth": 3.3,
      "perCapita": 15882.6,
      "popChangePct": 0.23
    },
    {
      "year": 2025,
      "gdp": 1597.301,
      "growth": 3.6,
      "perCapita": 18611.1,
      "popChangePct": 0.36
    },
    {
      "year": 2026,
      "gdp": 1640.223,
      "growth": 3.4,
      "perCapita": 19018.2,
      "popChangePct": 0.49
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1629.539,
      "growth": 3.5,
      "perCapita": 18805.3,
      "popChangePct": 0.47
    },
    {
      "year": 2028,
      "gdp": 1741.606,
      "growth": 3.8,
      "perCapita": 20007.4,
      "popChangePct": 0.46
    },
    {
      "year": 2029,
      "gdp": 1842.887,
      "growth": 4,
      "perCapita": 21078.1,
      "popChangePct": 0.44
    },
    {
      "year": 2030,
      "gdp": 1933.816,
      "growth": 4,
      "perCapita": 22025.1,
      "popChangePct": 0.42
    },
    {
      "year": 2031,
      "gdp": 2027.846,
      "growth": 4,
      "perCapita": 22954.7,
      "popChangePct": 0.62
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 161.138,
      "perCapitaPPP": 3584.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 184.082,
      "perCapitaPPP": 4003.1,
      "perCapitaPPPChangePct": 11.67,
      "popChangePct": 2.3
    },
    {
      "year": 1982,
      "gdpPPP": 202.16,
      "perCapitaPPP": 4297.2,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": 2.31
    },
    {
      "year": 1983,
      "gdpPPP": 220.071,
      "perCapitaPPP": 4573.8,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 2.28
    },
    {
      "year": 1984,
      "gdpPPP": 243.571,
      "perCapitaPPP": 4952.7,
      "perCapitaPPPChangePct": 8.28,
      "popChangePct": 2.21
    },
    {
      "year": 1985,
      "gdpPPP": 261.973,
      "perCapitaPPP": 5216.3,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 2.12
    },
    {
      "year": 1986,
      "gdpPPP": 285.798,
      "perCapitaPPP": 5577.8,
      "perCapitaPPPChangePct": 6.93,
      "popChangePct": 2.03
    },
    {
      "year": 1987,
      "gdpPPP": 322.248,
      "perCapitaPPP": 6169.5,
      "perCapitaPPPChangePct": 10.61,
      "popChangePct": 1.94
    },
    {
      "year": 1988,
      "gdpPPP": 340.688,
      "perCapitaPPP": 6403.1,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 1.86
    },
    {
      "year": 1989,
      "gdpPPP": 354.944,
      "perCapitaPPP": 6552.9,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 1.8
    },
    {
      "year": 1990,
      "gdpPPP": 402.307,
      "perCapitaPPP": 7299.3,
      "perCapitaPPPChangePct": 11.39,
      "popChangePct": 1.75
    },
    {
      "year": 1991,
      "gdpPPP": 419.766,
      "perCapitaPPP": 7488.5,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 1.7
    },
    {
      "year": 1992,
      "gdpPPP": 455.025,
      "perCapitaPPP": 7984.9,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": 1.66
    },
    {
      "year": 1993,
      "gdpPPP": 503.272,
      "perCapitaPPP": 8690.1,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 1.63
    },
    {
      "year": 1994,
      "gdpPPP": 485.974,
      "perCapitaPPP": 8259.7,
      "perCapitaPPPChangePct": -4.95,
      "popChangePct": 1.6
    },
    {
      "year": 1995,
      "gdpPPP": 531.836,
      "perCapitaPPP": 8900.1,
      "perCapitaPPPChangePct": 7.75,
      "popChangePct": 1.56
    },
    {
      "year": 1996,
      "gdpPPP": 579.522,
      "perCapitaPPP": 9551.9,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 1.53
    },
    {
      "year": 1997,
      "gdpPPP": 633.892,
      "perCapitaPPP": 10293.5,
      "perCapitaPPPChangePct": 7.76,
      "popChangePct": 1.5
    },
    {
      "year": 1998,
      "gdpPPP": 660.84,
      "perCapitaPPP": 10579.5,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 1.43
    },
    {
      "year": 1999,
      "gdpPPP": 649.732,
      "perCapitaPPP": 10254.0,
      "perCapitaPPPChangePct": -3.08,
      "popChangePct": 1.44
    },
    {
      "year": 2000,
      "gdpPPP": 710.863,
      "perCapitaPPP": 11060.7,
      "perCapitaPPPChangePct": 7.87,
      "popChangePct": 1.43
    },
    {
      "year": 2001,
      "gdpPPP": 687.186,
      "perCapitaPPP": 10545.2,
      "perCapitaPPPChangePct": -4.66,
      "popChangePct": 1.4
    },
    {
      "year": 2002,
      "gdpPPP": 742.777,
      "perCapitaPPP": 11253.7,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": 1.28
    },
    {
      "year": 2003,
      "gdpPPP": 801.365,
      "perCapitaPPP": 11997.4,
      "perCapitaPPPChangePct": 6.61,
      "popChangePct": 1.2
    },
    {
      "year": 2004,
      "gdpPPP": 904.591,
      "perCapitaPPP": 13381.7,
      "perCapitaPPPChangePct": 11.54,
      "popChangePct": 1.2
    },
    {
      "year": 2005,
      "gdpPPP": 1017.964,
      "perCapitaPPP": 14874.9,
      "perCapitaPPPChangePct": 11.16,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdpPPP": 1123.522,
      "perCapitaPPP": 16213.6,
      "perCapitaPPPChangePct": 9.0,
      "popChangePct": 1.26
    },
    {
      "year": 2007,
      "gdpPPP": 1212.907,
      "perCapitaPPP": 17288.2,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": 1.25
    },
    {
      "year": 2008,
      "gdpPPP": 1247.648,
      "perCapitaPPP": 17559.6,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 1.27
    },
    {
      "year": 2009,
      "gdpPPP": 1194.048,
      "perCapitaPPP": 16575.0,
      "perCapitaPPPChangePct": -5.61,
      "popChangePct": 1.39
    },
    {
      "year": 2010,
      "gdpPPP": 1311.798,
      "perCapitaPPP": 17935.0,
      "perCapitaPPPChangePct": 8.2,
      "popChangePct": 1.53
    },
    {
      "year": 2011,
      "gdpPPP": 1485.87,
      "perCapitaPPP": 20018.7,
      "perCapitaPPPChangePct": 11.62,
      "popChangePct": 1.48
    },
    {
      "year": 2012,
      "gdpPPP": 1586.302,
      "perCapitaPPP": 21101.2,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 1.28
    },
    {
      "year": 2013,
      "gdpPPP": 1750.242,
      "perCapitaPPP": 22984.7,
      "perCapitaPPPChangePct": 8.93,
      "popChangePct": 1.29
    },
    {
      "year": 2014,
      "gdpPPP": 1862.653,
      "perCapitaPPP": 24133.3,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 1.36
    },
    {
      "year": 2015,
      "gdpPPP": 1989.081,
      "perCapitaPPP": 25430.0,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 1.34
    },
    {
      "year": 2016,
      "gdpPPP": 2074.72,
      "perCapitaPPP": 26170.2,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 1.36
    },
    {
      "year": 2017,
      "gdpPPP": 2277.149,
      "perCapitaPPP": 28353.4,
      "perCapitaPPPChangePct": 8.34,
      "popChangePct": 1.31
    },
    {
      "year": 2018,
      "gdpPPP": 2331.53,
      "perCapitaPPP": 28640.4,
      "perCapitaPPPChangePct": 1.01,
      "popChangePct": 1.36
    },
    {
      "year": 2019,
      "gdpPPP": 2396.162,
      "perCapitaPPP": 29016.6,
      "perCapitaPPPChangePct": 1.31,
      "popChangePct": 1.44
    },
    {
      "year": 2020,
      "gdpPPP": 2435.61,
      "perCapitaPPP": 29209.2,
      "perCapitaPPPChangePct": 0.66,
      "popChangePct": 0.98
    },
    {
      "year": 2021,
      "gdpPPP": 2727.394,
      "perCapitaPPP": 32412.3,
      "perCapitaPPPChangePct": 10.97,
      "popChangePct": 0.91
    },
    {
      "year": 2022,
      "gdpPPP": 3080.336,
      "perCapitaPPP": 36247.8,
      "perCapitaPPPChangePct": 11.83,
      "popChangePct": 0.99
    },
    {
      "year": 2023,
      "gdpPPP": 3355.467,
      "perCapitaPPP": 39325.3,
      "perCapitaPPPChangePct": 8.49,
      "popChangePct": 0.41
    },
    {
      "year": 2024,
      "gdpPPP": 3553.197,
      "perCapitaPPP": 41549.1,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 0.23
    },
    {
      "year": 2025,
      "gdpPPP": 3785.705,
      "perCapitaPPP": 44109.6,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 0.36
    },
    {
      "year": 2026,
      "gdpPPP": 4025.249,
      "perCapitaPPP": 46672.2,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 0.49
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 4256.446,
      "perCapitaPPP": 49120.6,
      "perCapitaPPPChangePct": 5.25,
      "popChangePct": 0.47
    },
    {
      "year": 2028,
      "gdpPPP": 4492.405,
      "perCapitaPPP": 51608.3,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 0.46
    },
    {
      "year": 2029,
      "gdpPPP": 4755.569,
      "perCapitaPPP": 54392.1,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 0.44
    },
    {
      "year": 2030,
      "gdpPPP": 5038.266,
      "perCapitaPPP": 57383.2,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 0.42
    },
    {
      "year": 2031,
      "gdpPPP": 5335.556,
      "perCapitaPPP": 60397.2,
      "perCapitaPPPChangePct": 5.25,
      "popChangePct": 0.62
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TurkeyGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
