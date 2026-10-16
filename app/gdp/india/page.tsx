import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "India",
  "slug": "india",
  "iso3": "IND",
  "region": "Asia",
  "rank2026": 6,
  "flagEmoji": "🇮🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "United Kingdom",
      "slug": "united-kingdom",
      "rank": 5
    },
    {
      "name": "France",
      "slug": "france",
      "rank": 7
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 186.17,
      "growth": 6.7,
      "perCapita": 270.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 193.153,
      "growth": 6,
      "perCapita": 274.5,
      "popChangePct": 2.38
    },
    {
      "year": 1982,
      "gdp": 200.035,
      "growth": 3.5,
      "perCapita": 277.7,
      "popChangePct": 2.36
    },
    {
      "year": 1983,
      "gdp": 218.218,
      "growth": 7.3,
      "perCapita": 295.9,
      "popChangePct": 2.37
    },
    {
      "year": 1984,
      "gdp": 211.843,
      "growth": 3.8,
      "perCapita": 280.6,
      "popChangePct": 2.37
    },
    {
      "year": 1985,
      "gdp": 233.52,
      "growth": 5.3,
      "perCapita": 302.2,
      "popChangePct": 2.35
    },
    {
      "year": 1986,
      "gdp": 248.398,
      "growth": 4.8,
      "perCapita": 314.2,
      "popChangePct": 2.34
    },
    {
      "year": 1987,
      "gdp": 278.864,
      "growth": 4,
      "perCapita": 344.7,
      "popChangePct": 2.31
    },
    {
      "year": 1988,
      "gdp": 294.479,
      "growth": 9.6,
      "perCapita": 355.9,
      "popChangePct": 2.28
    },
    {
      "year": 1989,
      "gdp": 296.043,
      "growth": 5.9,
      "perCapita": 349.9,
      "popChangePct": 2.26
    },
    {
      "year": 1990,
      "gdp": 320.979,
      "growth": 5.5,
      "perCapita": 371.1,
      "popChangePct": 2.24
    },
    {
      "year": 1991,
      "gdp": 270.105,
      "growth": 1.1,
      "perCapita": 305.6,
      "popChangePct": 2.19
    },
    {
      "year": 1992,
      "gdp": 288.21,
      "growth": 5.5,
      "perCapita": 319.2,
      "popChangePct": 2.15
    },
    {
      "year": 1993,
      "gdp": 279.295,
      "growth": 4.8,
      "perCapita": 302.9,
      "popChangePct": 2.12
    },
    {
      "year": 1994,
      "gdp": 327.275,
      "growth": 6.7,
      "perCapita": 347.7,
      "popChangePct": 2.07
    },
    {
      "year": 1995,
      "gdp": 360.281,
      "growth": 7.6,
      "perCapita": 375.2,
      "popChangePct": 2.03
    },
    {
      "year": 1996,
      "gdp": 392.902,
      "growth": 7.5,
      "perCapita": 401.1,
      "popChangePct": 2.02
    },
    {
      "year": 1997,
      "gdp": 415.895,
      "growth": 4,
      "perCapita": 416.3,
      "popChangePct": 1.99
    },
    {
      "year": 1998,
      "gdp": 421.378,
      "growth": 6.2,
      "perCapita": 413.7,
      "popChangePct": 1.95
    },
    {
      "year": 1999,
      "gdp": 458.821,
      "growth": 8.8,
      "perCapita": 441.9,
      "popChangePct": 1.92
    },
    {
      "year": 2000,
      "gdp": 468.396,
      "growth": 3.8,
      "perCapita": 442.8,
      "popChangePct": 1.9
    },
    {
      "year": 2001,
      "gdp": 485.44,
      "growth": 4.8,
      "perCapita": 450.4,
      "popChangePct": 1.89
    },
    {
      "year": 2002,
      "gdp": 514.938,
      "growth": 3.8,
      "perCapita": 469.1,
      "popChangePct": 1.83
    },
    {
      "year": 2003,
      "gdp": 607.701,
      "growth": 7.9,
      "perCapita": 544.1,
      "popChangePct": 1.75
    },
    {
      "year": 2004,
      "gdp": 709.152,
      "growth": 7.9,
      "perCapita": 624.3,
      "popChangePct": 1.72
    },
    {
      "year": 2005,
      "gdp": 820.385,
      "growth": 7.9,
      "perCapita": 710.5,
      "popChangePct": 1.64
    },
    {
      "year": 2006,
      "gdp": 940.26,
      "growth": 8.1,
      "perCapita": 801.7,
      "popChangePct": 1.58
    },
    {
      "year": 2007,
      "gdp": 1216.736,
      "growth": 7.7,
      "perCapita": 1021.9,
      "popChangePct": 1.52
    },
    {
      "year": 2008,
      "gdp": 1198.895,
      "growth": 3.1,
      "perCapita": 992.5,
      "popChangePct": 1.45
    },
    {
      "year": 2009,
      "gdp": 1341.889,
      "growth": 7.9,
      "perCapita": 1095.0,
      "popChangePct": 1.46
    },
    {
      "year": 2010,
      "gdp": 1675.615,
      "growth": 8.5,
      "perCapita": 1347.5,
      "popChangePct": 1.47
    },
    {
      "year": 2011,
      "gdp": 1823.052,
      "growth": 5.2,
      "perCapita": 1445.5,
      "popChangePct": 1.43
    },
    {
      "year": 2012,
      "gdp": 1822.862,
      "growth": 5.5,
      "perCapita": 1425.6,
      "popChangePct": 1.38
    },
    {
      "year": 2013,
      "gdp": 1847.019,
      "growth": 6.4,
      "perCapita": 1425.4,
      "popChangePct": 1.34
    },
    {
      "year": 2014,
      "gdp": 2023.143,
      "growth": 7.4,
      "perCapita": 1541.7,
      "popChangePct": 1.27
    },
    {
      "year": 2015,
      "gdp": 2081.604,
      "growth": 8,
      "perCapita": 1567.4,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdp": 2264.818,
      "growth": 8.3,
      "perCapita": 1685.2,
      "popChangePct": 1.2
    },
    {
      "year": 2017,
      "gdp": 2609.908,
      "growth": 6.8,
      "perCapita": 1919.5,
      "popChangePct": 1.17
    },
    {
      "year": 2018,
      "gdp": 2653.495,
      "growth": 6.5,
      "perCapita": 1930.3,
      "popChangePct": 1.1
    },
    {
      "year": 2019,
      "gdp": 2776.336,
      "growth": 3.9,
      "perCapita": 1998.8,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdp": 2611.953,
      "growth": -5.8,
      "perCapita": 1862.2,
      "popChangePct": 0.98
    },
    {
      "year": 2021,
      "gdp": 3084.517,
      "growth": 9.7,
      "perCapita": 2181.1,
      "popChangePct": 0.83
    },
    {
      "year": 2022,
      "gdp": 3249.939,
      "growth": 7.6,
      "perCapita": 2280.0,
      "popChangePct": 0.79
    },
    {
      "year": 2023,
      "gdp": 3500.906,
      "growth": 7.2,
      "perCapita": 2434.4,
      "popChangePct": 0.89
    },
    {
      "year": 2024,
      "gdp": 3760.814,
      "growth": 7.1,
      "perCapita": 2592.0,
      "popChangePct": 0.89
    },
    {
      "year": 2025,
      "gdp": 3916.312,
      "growth": 7.6,
      "perCapita": 2675.3,
      "popChangePct": 0.89
    },
    {
      "year": 2026,
      "gdp": 4153.191,
      "growth": 6.5,
      "perCapita": 2812.6,
      "popChangePct": 0.87
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 4579.083,
      "growth": 6.5,
      "perCapita": 3074.9,
      "popChangePct": 0.85
    },
    {
      "year": 2028,
      "gdp": 5058.754,
      "growth": 6.5,
      "perCapita": 3369.3,
      "popChangePct": 0.82
    },
    {
      "year": 2029,
      "gdp": 5599.432,
      "growth": 6.5,
      "perCapita": 3699.8,
      "popChangePct": 0.8
    },
    {
      "year": 2030,
      "gdp": 6173.385,
      "growth": 6.5,
      "perCapita": 4047.8,
      "popChangePct": 0.77
    },
    {
      "year": 2031,
      "gdp": 6792.432,
      "growth": 6.5,
      "perCapita": 4420.6,
      "popChangePct": 0.75
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 360.713,
      "perCapitaPPP": 524.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 418.558,
      "perCapitaPPP": 594.8,
      "perCapitaPPPChangePct": 13.34,
      "popChangePct": 2.38
    },
    {
      "year": 1982,
      "gdpPPP": 459.867,
      "perCapitaPPP": 638.4,
      "perCapitaPPPChangePct": 7.33,
      "popChangePct": 2.36
    },
    {
      "year": 1983,
      "gdpPPP": 512.709,
      "perCapitaPPP": 695.3,
      "perCapitaPPPChangePct": 8.91,
      "popChangePct": 2.37
    },
    {
      "year": 1984,
      "gdpPPP": 551.509,
      "perCapitaPPP": 730.6,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 2.37
    },
    {
      "year": 1985,
      "gdpPPP": 598.842,
      "perCapitaPPP": 775.1,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": 2.35
    },
    {
      "year": 1986,
      "gdpPPP": 640.081,
      "perCapitaPPP": 809.5,
      "perCapitaPPPChangePct": 4.45,
      "popChangePct": 2.34
    },
    {
      "year": 1987,
      "gdpPPP": 681.952,
      "perCapitaPPP": 843.0,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 2.31
    },
    {
      "year": 1988,
      "gdpPPP": 773.974,
      "perCapitaPPP": 935.5,
      "perCapitaPPPChangePct": 10.97,
      "popChangePct": 2.28
    },
    {
      "year": 1989,
      "gdpPPP": 852.16,
      "perCapitaPPP": 1007.2,
      "perCapitaPPPChangePct": 7.67,
      "popChangePct": 2.26
    },
    {
      "year": 1990,
      "gdpPPP": 932.971,
      "perCapitaPPP": 1078.6,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": 2.24
    },
    {
      "year": 1991,
      "gdpPPP": 974.719,
      "perCapitaPPP": 1102.7,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 2.19
    },
    {
      "year": 1992,
      "gdpPPP": 1051.591,
      "perCapitaPPP": 1164.6,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 2.15
    },
    {
      "year": 1993,
      "gdpPPP": 1127.656,
      "perCapitaPPP": 1222.9,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 2.12
    },
    {
      "year": 1994,
      "gdpPPP": 1228.431,
      "perCapitaPPP": 1305.2,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 2.07
    },
    {
      "year": 1995,
      "gdpPPP": 1349.179,
      "perCapitaPPP": 1405.0,
      "perCapitaPPPChangePct": 7.64,
      "popChangePct": 2.03
    },
    {
      "year": 1996,
      "gdpPPP": 1477.606,
      "perCapitaPPP": 1508.3,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": 2.02
    },
    {
      "year": 1997,
      "gdpPPP": 1563.958,
      "perCapitaPPP": 1565.3,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 1.99
    },
    {
      "year": 1998,
      "gdpPPP": 1679.343,
      "perCapitaPPP": 1648.6,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 1.95
    },
    {
      "year": 1999,
      "gdpPPP": 1853.758,
      "perCapitaPPP": 1785.5,
      "perCapitaPPPChangePct": 8.31,
      "popChangePct": 1.92
    },
    {
      "year": 2000,
      "gdpPPP": 1968.569,
      "perCapitaPPP": 1860.8,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 1.9
    },
    {
      "year": 2001,
      "gdpPPP": 2109.995,
      "perCapitaPPP": 1957.5,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 1.89
    },
    {
      "year": 2002,
      "gdpPPP": 2224.292,
      "perCapitaPPP": 2026.5,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 1.83
    },
    {
      "year": 2003,
      "gdpPPP": 2446.496,
      "perCapitaPPP": 2190.6,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 1.75
    },
    {
      "year": 2004,
      "gdpPPP": 2711.326,
      "perCapitaPPP": 2386.7,
      "perCapitaPPPChangePct": 8.95,
      "popChangePct": 1.72
    },
    {
      "year": 2005,
      "gdpPPP": 3017.913,
      "perCapitaPPP": 2613.6,
      "perCapitaPPPChangePct": 9.51,
      "popChangePct": 1.64
    },
    {
      "year": 2006,
      "gdpPPP": 3361.754,
      "perCapitaPPP": 2866.2,
      "perCapitaPPPChangePct": 9.66,
      "popChangePct": 1.58
    },
    {
      "year": 2007,
      "gdpPPP": 3717.347,
      "perCapitaPPP": 3122.0,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 1.52
    },
    {
      "year": 2008,
      "gdpPPP": 3905.909,
      "perCapitaPPP": 3233.6,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 1.45
    },
    {
      "year": 2009,
      "gdpPPP": 4238.973,
      "perCapitaPPP": 3458.9,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 1.46
    },
    {
      "year": 2010,
      "gdpPPP": 4655.083,
      "perCapitaPPP": 3743.6,
      "perCapitaPPPChangePct": 8.23,
      "popChangePct": 1.47
    },
    {
      "year": 2011,
      "gdpPPP": 5000.148,
      "perCapitaPPP": 3964.5,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 1.43
    },
    {
      "year": 2012,
      "gdpPPP": 5371.155,
      "perCapitaPPP": 4200.6,
      "perCapitaPPPChangePct": 5.95,
      "popChangePct": 1.38
    },
    {
      "year": 2013,
      "gdpPPP": 5811.417,
      "perCapitaPPP": 4484.7,
      "perCapitaPPPChangePct": 6.76,
      "popChangePct": 1.34
    },
    {
      "year": 2014,
      "gdpPPP": 6350.774,
      "perCapitaPPP": 4839.5,
      "perCapitaPPPChangePct": 7.91,
      "popChangePct": 1.27
    },
    {
      "year": 2015,
      "gdpPPP": 6922.249,
      "perCapitaPPP": 5212.4,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdpPPP": 7564.98,
      "perCapitaPPP": 5628.9,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 1.2
    },
    {
      "year": 2017,
      "gdpPPP": 8223.736,
      "perCapitaPPP": 6048.4,
      "perCapitaPPPChangePct": 7.45,
      "popChangePct": 1.17
    },
    {
      "year": 2018,
      "gdpPPP": 9061.964,
      "perCapitaPPP": 6592.2,
      "perCapitaPPPChangePct": 8.99,
      "popChangePct": 1.1
    },
    {
      "year": 2019,
      "gdpPPP": 9725.232,
      "perCapitaPPP": 7001.5,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdpPPP": 9541.256,
      "perCapitaPPP": 6802.5,
      "perCapitaPPPChangePct": -2.84,
      "popChangePct": 0.98
    },
    {
      "year": 2021,
      "gdpPPP": 11086.92,
      "perCapitaPPP": 7839.7,
      "perCapitaPPPChangePct": 15.25,
      "popChangePct": 0.83
    },
    {
      "year": 2022,
      "gdpPPP": 12779.117,
      "perCapitaPPP": 8965.1,
      "perCapitaPPPChangePct": 14.36,
      "popChangePct": 0.79
    },
    {
      "year": 2023,
      "gdpPPP": 14207.444,
      "perCapitaPPP": 9879.5,
      "perCapitaPPPChangePct": 10.2,
      "popChangePct": 0.89
    },
    {
      "year": 2024,
      "gdpPPP": 15593.814,
      "perCapitaPPP": 10747.4,
      "perCapitaPPPChangePct": 8.78,
      "popChangePct": 0.89
    },
    {
      "year": 2025,
      "gdpPPP": 17257.883,
      "perCapitaPPP": 11789.3,
      "perCapitaPPPChangePct": 9.69,
      "popChangePct": 0.89
    },
    {
      "year": 2026,
      "gdpPPP": 18902.32,
      "perCapitaPPP": 12801.0,
      "perCapitaPPPChangePct": 8.58,
      "popChangePct": 0.87
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 20578.63,
      "perCapitaPPP": 13818.9,
      "perCapitaPPPChangePct": 7.95,
      "popChangePct": 0.85
    },
    {
      "year": 2028,
      "gdpPPP": 22276.032,
      "perCapitaPPP": 14836.5,
      "perCapitaPPPChangePct": 7.36,
      "popChangePct": 0.82
    },
    {
      "year": 2029,
      "gdpPPP": 24150.412,
      "perCapitaPPP": 15957.5,
      "perCapitaPPPChangePct": 7.56,
      "popChangePct": 0.8
    },
    {
      "year": 2030,
      "gdpPPP": 26193.658,
      "perCapitaPPP": 17174.6,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 0.77
    },
    {
      "year": 2031,
      "gdpPPP": 28403.573,
      "perCapitaPPP": 18485.4,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 0.75
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IndiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
