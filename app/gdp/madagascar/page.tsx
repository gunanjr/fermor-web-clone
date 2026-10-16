import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Madagascar",
  "slug": "madagascar",
  "iso3": "MDG",
  "region": "Africa",
  "rank2026": 137,
  "flagEmoji": "🇲🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "North Macedonia",
      "slug": "north-macedonia",
      "rank": 136
    },
    {
      "name": "Tajikistan",
      "slug": "tajikistan",
      "rank": 138
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 5.202,
      "growth": 0.8,
      "perCapita": 599.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.759,
      "growth": -9.8,
      "perCapita": 534.1,
      "popChangePct": 2.67
    },
    {
      "year": 1982,
      "gdp": 4.785,
      "growth": -1.9,
      "perCapita": 522.9,
      "popChangePct": 2.68
    },
    {
      "year": 1983,
      "gdp": 4.686,
      "growth": 0.9,
      "perCapita": 498.8,
      "popChangePct": 2.68
    },
    {
      "year": 1984,
      "gdp": 3.906,
      "growth": 1.8,
      "perCapita": 404.9,
      "popChangePct": 2.68
    },
    {
      "year": 1985,
      "gdp": 3.803,
      "growth": 1.2,
      "perCapita": 383.9,
      "popChangePct": 2.68
    },
    {
      "year": 1986,
      "gdp": 4.348,
      "growth": 2,
      "perCapita": 427.5,
      "popChangePct": 2.68
    },
    {
      "year": 1987,
      "gdp": 3.213,
      "growth": 1.2,
      "perCapita": 307.6,
      "popChangePct": 2.68
    },
    {
      "year": 1988,
      "gdp": 3.189,
      "growth": 3.4,
      "perCapita": 297.4,
      "popChangePct": 2.68
    },
    {
      "year": 1989,
      "gdp": 3.176,
      "growth": 4.1,
      "perCapita": 288.4,
      "popChangePct": 2.68
    },
    {
      "year": 1990,
      "gdp": 3.931,
      "growth": 3.1,
      "perCapita": 347.7,
      "popChangePct": 2.68
    },
    {
      "year": 1991,
      "gdp": 3.255,
      "growth": -6.3,
      "perCapita": 280.4,
      "popChangePct": 2.68
    },
    {
      "year": 1992,
      "gdp": 3.715,
      "growth": 1.2,
      "perCapita": 311.6,
      "popChangePct": 2.68
    },
    {
      "year": 1993,
      "gdp": 4.063,
      "growth": 2.1,
      "perCapita": 332.0,
      "popChangePct": 2.68
    },
    {
      "year": 1994,
      "gdp": 3.522,
      "growth": 0,
      "perCapita": 279.4,
      "popChangePct": 3.01
    },
    {
      "year": 1995,
      "gdp": 3.838,
      "growth": 1.7,
      "perCapita": 295.5,
      "popChangePct": 3.01
    },
    {
      "year": 1996,
      "gdp": 4.932,
      "growth": 2.2,
      "perCapita": 368.7,
      "popChangePct": 3.01
    },
    {
      "year": 1997,
      "gdp": 4.263,
      "growth": 3.7,
      "perCapita": 309.4,
      "popChangePct": 3.0
    },
    {
      "year": 1998,
      "gdp": 4.402,
      "growth": 3.9,
      "perCapita": 310.1,
      "popChangePct": 3.01
    },
    {
      "year": 1999,
      "gdp": 4.278,
      "growth": 4.7,
      "perCapita": 292.6,
      "popChangePct": 3.01
    },
    {
      "year": 2000,
      "gdp": 4.629,
      "growth": 4.5,
      "perCapita": 307.3,
      "popChangePct": 3.02
    },
    {
      "year": 2001,
      "gdp": 5.438,
      "growth": 6,
      "perCapita": 350.5,
      "popChangePct": 3.01
    },
    {
      "year": 2002,
      "gdp": 5.352,
      "growth": -12.4,
      "perCapita": 334.8,
      "popChangePct": 3.01
    },
    {
      "year": 2003,
      "gdp": 6.372,
      "growth": 9.8,
      "perCapita": 387.1,
      "popChangePct": 3.01
    },
    {
      "year": 2004,
      "gdp": 5.065,
      "growth": 5.3,
      "perCapita": 298.6,
      "popChangePct": 3.01
    },
    {
      "year": 2005,
      "gdp": 5.859,
      "growth": 4.8,
      "perCapita": 335.4,
      "popChangePct": 3.01
    },
    {
      "year": 2006,
      "gdp": 6.396,
      "growth": 5.4,
      "perCapita": 355.4,
      "popChangePct": 3.01
    },
    {
      "year": 2007,
      "gdp": 8.525,
      "growth": 5.7,
      "perCapita": 459.9,
      "popChangePct": 3.01
    },
    {
      "year": 2008,
      "gdp": 10.725,
      "growth": 6.7,
      "perCapita": 561.7,
      "popChangePct": 3.01
    },
    {
      "year": 2009,
      "gdp": 9.617,
      "growth": -4,
      "perCapita": 488.9,
      "popChangePct": 3.01
    },
    {
      "year": 2010,
      "gdp": 9.983,
      "growth": 0.6,
      "perCapita": 492.7,
      "popChangePct": 3.01
    },
    {
      "year": 2011,
      "gdp": 11.552,
      "growth": 1.6,
      "perCapita": 553.5,
      "popChangePct": 3.01
    },
    {
      "year": 2012,
      "gdp": 11.579,
      "growth": 3,
      "perCapita": 538.5,
      "popChangePct": 3.01
    },
    {
      "year": 2013,
      "gdp": 12.424,
      "growth": 2.3,
      "perCapita": 560.9,
      "popChangePct": 3.01
    },
    {
      "year": 2014,
      "gdp": 12.523,
      "growth": 3.3,
      "perCapita": 548.9,
      "popChangePct": 3.01
    },
    {
      "year": 2015,
      "gdp": 11.323,
      "growth": 3.1,
      "perCapita": 481.8,
      "popChangePct": 3.01
    },
    {
      "year": 2016,
      "gdp": 11.849,
      "growth": 4,
      "perCapita": 489.4,
      "popChangePct": 3.01
    },
    {
      "year": 2017,
      "gdp": 13.176,
      "growth": 3.9,
      "perCapita": 528.4,
      "popChangePct": 3.01
    },
    {
      "year": 2018,
      "gdp": 13.76,
      "growth": 3.2,
      "perCapita": 535.9,
      "popChangePct": 2.96
    },
    {
      "year": 2019,
      "gdp": 14.105,
      "growth": 4.4,
      "perCapita": 531.8,
      "popChangePct": 3.31
    },
    {
      "year": 2020,
      "gdp": 13.051,
      "growth": -7.1,
      "perCapita": 477.4,
      "popChangePct": 3.07
    },
    {
      "year": 2021,
      "gdp": 14.355,
      "growth": 4.7,
      "perCapita": 509.4,
      "popChangePct": 3.07
    },
    {
      "year": 2022,
      "gdp": 15.342,
      "growth": 4.1,
      "perCapita": 529.7,
      "popChangePct": 2.78
    },
    {
      "year": 2023,
      "gdp": 16.037,
      "growth": 4.2,
      "perCapita": 538.8,
      "popChangePct": 2.78
    },
    {
      "year": 2024,
      "gdp": 17.593,
      "growth": 4.3,
      "perCapita": 575.0,
      "popChangePct": 2.78
    },
    {
      "year": 2025,
      "gdp": 19.556,
      "growth": 2.8,
      "perCapita": 621.9,
      "popChangePct": 2.78
    },
    {
      "year": 2026,
      "gdp": 21.185,
      "growth": 3.6,
      "perCapita": 655.5,
      "popChangePct": 2.78
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 22.926,
      "growth": 4.1,
      "perCapita": 690.2,
      "popChangePct": 2.78
    },
    {
      "year": 2028,
      "gdp": 25.256,
      "growth": 4.6,
      "perCapita": 739.8,
      "popChangePct": 2.78
    },
    {
      "year": 2029,
      "gdp": 27.861,
      "growth": 4.7,
      "perCapita": 794.0,
      "popChangePct": 2.78
    },
    {
      "year": 2030,
      "gdp": 30.748,
      "growth": 4.8,
      "perCapita": 852.6,
      "popChangePct": 2.78
    },
    {
      "year": 2031,
      "gdp": 33.637,
      "growth": 4.8,
      "perCapita": 907.5,
      "popChangePct": 2.78
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 8.225,
      "perCapitaPPP": 947.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 8.121,
      "perCapitaPPP": 911.3,
      "perCapitaPPPChangePct": -3.84,
      "popChangePct": 2.67
    },
    {
      "year": 1982,
      "gdpPPP": 8.459,
      "perCapitaPPP": 924.5,
      "perCapitaPPPChangePct": 1.44,
      "popChangePct": 2.68
    },
    {
      "year": 1983,
      "gdpPPP": 8.87,
      "perCapitaPPP": 944.0,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 2.68
    },
    {
      "year": 1984,
      "gdpPPP": 9.351,
      "perCapitaPPP": 969.3,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 2.68
    },
    {
      "year": 1985,
      "gdpPPP": 9.759,
      "perCapitaPPP": 985.1,
      "perCapitaPPPChangePct": 1.63,
      "popChangePct": 2.68
    },
    {
      "year": 1986,
      "gdpPPP": 10.15,
      "perCapitaPPP": 997.9,
      "perCapitaPPPChangePct": 1.3,
      "popChangePct": 2.68
    },
    {
      "year": 1987,
      "gdpPPP": 10.524,
      "perCapitaPPP": 1007.7,
      "perCapitaPPPChangePct": 0.98,
      "popChangePct": 2.68
    },
    {
      "year": 1988,
      "gdpPPP": 11.266,
      "perCapitaPPP": 1050.6,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 2.68
    },
    {
      "year": 1989,
      "gdpPPP": 12.185,
      "perCapitaPPP": 1106.6,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": 2.68
    },
    {
      "year": 1990,
      "gdpPPP": 13.037,
      "perCapitaPPP": 1153.1,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 2.68
    },
    {
      "year": 1991,
      "gdpPPP": 12.628,
      "perCapitaPPP": 1087.7,
      "perCapitaPPPChangePct": -5.67,
      "popChangePct": 2.68
    },
    {
      "year": 1992,
      "gdpPPP": 13.068,
      "perCapitaPPP": 1096.3,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": 2.68
    },
    {
      "year": 1993,
      "gdpPPP": 13.659,
      "perCapitaPPP": 1116.0,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 2.68
    },
    {
      "year": 1994,
      "gdpPPP": 13.945,
      "perCapitaPPP": 1106.1,
      "perCapitaPPPChangePct": -0.89,
      "popChangePct": 3.01
    },
    {
      "year": 1995,
      "gdpPPP": 14.476,
      "perCapitaPPP": 1114.7,
      "perCapitaPPPChangePct": 0.78,
      "popChangePct": 3.01
    },
    {
      "year": 1996,
      "gdpPPP": 15.058,
      "perCapitaPPP": 1125.6,
      "perCapitaPPPChangePct": 0.98,
      "popChangePct": 3.01
    },
    {
      "year": 1997,
      "gdpPPP": 15.884,
      "perCapitaPPP": 1152.7,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 3.0
    },
    {
      "year": 1998,
      "gdpPPP": 16.692,
      "perCapitaPPP": 1175.9,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 3.01
    },
    {
      "year": 1999,
      "gdpPPP": 17.723,
      "perCapitaPPP": 1212.1,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 3.01
    },
    {
      "year": 2000,
      "gdpPPP": 18.933,
      "perCapitaPPP": 1256.9,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 3.02
    },
    {
      "year": 2001,
      "gdpPPP": 20.517,
      "perCapitaPPP": 1322.3,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 3.01
    },
    {
      "year": 2002,
      "gdpPPP": 18.25,
      "perCapitaPPP": 1141.8,
      "perCapitaPPPChangePct": -13.65,
      "popChangePct": 3.01
    },
    {
      "year": 2003,
      "gdpPPP": 20.431,
      "perCapitaPPP": 1241.0,
      "perCapitaPPPChangePct": 8.68,
      "popChangePct": 3.01
    },
    {
      "year": 2004,
      "gdpPPP": 22.084,
      "perCapitaPPP": 1302.1,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 3.01
    },
    {
      "year": 2005,
      "gdpPPP": 23.86,
      "perCapitaPPP": 1365.7,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 3.01
    },
    {
      "year": 2006,
      "gdpPPP": 25.923,
      "perCapitaPPP": 1440.5,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 3.01
    },
    {
      "year": 2007,
      "gdpPPP": 28.146,
      "perCapitaPPP": 1518.3,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 3.01
    },
    {
      "year": 2008,
      "gdpPPP": 30.614,
      "perCapitaPPP": 1603.2,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 3.01
    },
    {
      "year": 2009,
      "gdpPPP": 29.577,
      "perCapitaPPP": 1503.6,
      "perCapitaPPPChangePct": -6.21,
      "popChangePct": 3.01
    },
    {
      "year": 2010,
      "gdpPPP": 30.122,
      "perCapitaPPP": 1486.6,
      "perCapitaPPPChangePct": -1.13,
      "popChangePct": 3.01
    },
    {
      "year": 2011,
      "gdpPPP": 31.229,
      "perCapitaPPP": 1496.2,
      "perCapitaPPPChangePct": 0.64,
      "popChangePct": 3.01
    },
    {
      "year": 2012,
      "gdpPPP": 32.768,
      "perCapitaPPP": 1524.0,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 3.01
    },
    {
      "year": 2013,
      "gdpPPP": 34.092,
      "perCapitaPPP": 1539.3,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 3.01
    },
    {
      "year": 2014,
      "gdpPPP": 35.844,
      "perCapitaPPP": 1571.1,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 3.01
    },
    {
      "year": 2015,
      "gdpPPP": 37.31,
      "perCapitaPPP": 1587.6,
      "perCapitaPPPChangePct": 1.05,
      "popChangePct": 3.01
    },
    {
      "year": 2016,
      "gdpPPP": 39.169,
      "perCapitaPPP": 1618.0,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 3.01
    },
    {
      "year": 2017,
      "gdpPPP": 41.438,
      "perCapitaPPP": 1661.7,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 3.01
    },
    {
      "year": 2018,
      "gdpPPP": 42.524,
      "perCapitaPPP": 1656.3,
      "perCapitaPPPChangePct": -0.33,
      "popChangePct": 2.96
    },
    {
      "year": 2019,
      "gdpPPP": 45.498,
      "perCapitaPPP": 1715.3,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 3.31
    },
    {
      "year": 2020,
      "gdpPPP": 43.15,
      "perCapitaPPP": 1578.3,
      "perCapitaPPPChangePct": -7.99,
      "popChangePct": 3.07
    },
    {
      "year": 2021,
      "gdpPPP": 46.836,
      "perCapitaPPP": 1662.1,
      "perCapitaPPPChangePct": 5.31,
      "popChangePct": 3.07
    },
    {
      "year": 2022,
      "gdpPPP": 52.242,
      "perCapitaPPP": 1803.9,
      "perCapitaPPPChangePct": 8.53,
      "popChangePct": 2.78
    },
    {
      "year": 2023,
      "gdpPPP": 56.468,
      "perCapitaPPP": 1897.0,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 2.78
    },
    {
      "year": 2024,
      "gdpPPP": 60.371,
      "perCapitaPPP": 1973.3,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 2.78
    },
    {
      "year": 2025,
      "gdpPPP": 63.844,
      "perCapitaPPP": 2030.4,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 2.78
    },
    {
      "year": 2026,
      "gdpPPP": 68.061,
      "perCapitaPPP": 2105.9,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 2.78
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 72.429,
      "perCapitaPPP": 2180.5,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 2.78
    },
    {
      "year": 2028,
      "gdpPPP": 77.024,
      "perCapitaPPP": 2256.1,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": 2.78
    },
    {
      "year": 2029,
      "gdpPPP": 82.1,
      "perCapitaPPP": 2339.7,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 2.78
    },
    {
      "year": 2030,
      "gdpPPP": 87.651,
      "perCapitaPPP": 2430.3,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 2.78
    },
    {
      "year": 2031,
      "gdpPPP": 93.559,
      "perCapitaPPP": 2524.0,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 2.78
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MadagascarGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
