import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Lesotho",
  "slug": "lesotho",
  "iso3": "LSO",
  "region": "Africa",
  "rank2026": 186,
  "flagEmoji": "🇱🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Guinea-Bissau",
      "slug": "guinea-bissau",
      "rank": 185
    },
    {
      "name": "Gambia",
      "slug": "gambia",
      "rank": 187
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.428,
      "growth": -0.8,
      "perCapita": 302.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.435,
      "growth": 3.1,
      "perCapita": 299.3,
      "popChangePct": 2.61
    },
    {
      "year": 1982,
      "gdp": 0.362,
      "growth": 5.6,
      "perCapita": 242.8,
      "popChangePct": 2.62
    },
    {
      "year": 1983,
      "gdp": 0.401,
      "growth": 3,
      "perCapita": 261.4,
      "popChangePct": 2.88
    },
    {
      "year": 1984,
      "gdp": 0.36,
      "growth": 4.8,
      "perCapita": 228.3,
      "popChangePct": 2.93
    },
    {
      "year": 1985,
      "gdp": 0.288,
      "growth": 3,
      "perCapita": 177.3,
      "popChangePct": 2.85
    },
    {
      "year": 1986,
      "gdp": 0.331,
      "growth": 3.8,
      "perCapita": 198.9,
      "popChangePct": 2.59
    },
    {
      "year": 1987,
      "gdp": 0.434,
      "growth": 2.7,
      "perCapita": 254.6,
      "popChangePct": 2.22
    },
    {
      "year": 1988,
      "gdp": 0.496,
      "growth": 7.9,
      "perCapita": 284.9,
      "popChangePct": 2.17
    },
    {
      "year": 1989,
      "gdp": 0.519,
      "growth": 6,
      "perCapita": 292.1,
      "popChangePct": 2.01
    },
    {
      "year": 1990,
      "gdp": 0.635,
      "growth": 6.4,
      "perCapita": 351.0,
      "popChangePct": 1.97
    },
    {
      "year": 1991,
      "gdp": 0.743,
      "growth": 7.5,
      "perCapita": 403.2,
      "popChangePct": 1.77
    },
    {
      "year": 1992,
      "gdp": 0.863,
      "growth": 6.1,
      "perCapita": 460.5,
      "popChangePct": 1.68
    },
    {
      "year": 1993,
      "gdp": 0.865,
      "growth": 4,
      "perCapita": 455.0,
      "popChangePct": 1.55
    },
    {
      "year": 1994,
      "gdp": 0.915,
      "growth": 5.2,
      "perCapita": 474.4,
      "popChangePct": 1.37
    },
    {
      "year": 1995,
      "gdp": 1.032,
      "growth": 4.1,
      "perCapita": 528.7,
      "popChangePct": 1.19
    },
    {
      "year": 1996,
      "gdp": 0.977,
      "growth": 4.8,
      "perCapita": 495.3,
      "popChangePct": 1.08
    },
    {
      "year": 1997,
      "gdp": 1.027,
      "growth": 3.3,
      "perCapita": 516.6,
      "popChangePct": 0.81
    },
    {
      "year": 1998,
      "gdp": 0.949,
      "growth": 1.3,
      "perCapita": 474.7,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdp": 0.937,
      "growth": 1.4,
      "perCapita": 467.5,
      "popChangePct": 0.25
    },
    {
      "year": 2000,
      "gdp": 0.922,
      "growth": 4,
      "perCapita": 459.9,
      "popChangePct": 0.05
    },
    {
      "year": 2001,
      "gdp": 0.774,
      "growth": 3.3,
      "perCapita": 386.8,
      "popChangePct": -0.15
    },
    {
      "year": 2002,
      "gdp": 0.856,
      "growth": 2.4,
      "perCapita": 429.3,
      "popChangePct": -0.3
    },
    {
      "year": 2003,
      "gdp": 1.256,
      "growth": 4.2,
      "perCapita": 632.8,
      "popChangePct": -0.5
    },
    {
      "year": 2004,
      "gdp": 1.598,
      "growth": 2.1,
      "perCapita": 810.6,
      "popChangePct": -0.71
    },
    {
      "year": 2005,
      "gdp": 1.73,
      "growth": 3.3,
      "perCapita": 885.6,
      "popChangePct": -0.91
    },
    {
      "year": 2006,
      "gdp": 1.72,
      "growth": 4.2,
      "perCapita": 884.3,
      "popChangePct": -0.41
    },
    {
      "year": 2007,
      "gdp": 1.759,
      "growth": 5,
      "perCapita": 900.3,
      "popChangePct": 0.41
    },
    {
      "year": 2008,
      "gdp": 1.652,
      "growth": 2.7,
      "perCapita": 840.0,
      "popChangePct": 0.72
    },
    {
      "year": 2009,
      "gdp": 1.937,
      "growth": 0.5,
      "perCapita": 977.7,
      "popChangePct": 0.71
    },
    {
      "year": 2010,
      "gdp": 2.356,
      "growth": 5.1,
      "perCapita": 1180.3,
      "popChangePct": 0.76
    },
    {
      "year": 2011,
      "gdp": 2.571,
      "growth": 6.3,
      "perCapita": 1276.5,
      "popChangePct": 0.9
    },
    {
      "year": 2012,
      "gdp": 2.465,
      "growth": 4.7,
      "perCapita": 1211.6,
      "popChangePct": 0.99
    },
    {
      "year": 2013,
      "gdp": 2.345,
      "growth": 1.2,
      "perCapita": 1140.2,
      "popChangePct": 1.13
    },
    {
      "year": 2014,
      "gdp": 2.477,
      "growth": 1.5,
      "perCapita": 1190.7,
      "popChangePct": 1.12
    },
    {
      "year": 2015,
      "gdp": 2.202,
      "growth": 3.6,
      "perCapita": 1046.4,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdp": 2.206,
      "growth": 2.3,
      "perCapita": 1035.6,
      "popChangePct": 1.19
    },
    {
      "year": 2017,
      "gdp": 2.424,
      "growth": -3.3,
      "perCapita": 1123.8,
      "popChangePct": 1.27
    },
    {
      "year": 2018,
      "gdp": 2.472,
      "growth": -1.3,
      "perCapita": 1132.3,
      "popChangePct": 1.25
    },
    {
      "year": 2019,
      "gdp": 2.323,
      "growth": -1.8,
      "perCapita": 1051.6,
      "popChangePct": 1.14
    },
    {
      "year": 2020,
      "gdp": 2.092,
      "growth": -8.6,
      "perCapita": 935.9,
      "popChangePct": 1.22
    },
    {
      "year": 2021,
      "gdp": 2.443,
      "growth": 4.6,
      "perCapita": 1080.4,
      "popChangePct": 1.16
    },
    {
      "year": 2022,
      "gdp": 2.275,
      "growth": 1.6,
      "perCapita": 995.0,
      "popChangePct": 1.06
    },
    {
      "year": 2023,
      "gdp": 2.227,
      "growth": 2.5,
      "perCapita": 963.4,
      "popChangePct": 1.09
    },
    {
      "year": 2024,
      "gdp": 2.514,
      "growth": 4.9,
      "perCapita": 1075.4,
      "popChangePct": 1.13
    },
    {
      "year": 2025,
      "gdp": 2.854,
      "growth": 1.4,
      "perCapita": 1206.3,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdp": 2.972,
      "growth": 1.1,
      "perCapita": 1241.4,
      "popChangePct": 1.18
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3.096,
      "growth": 0.8,
      "perCapita": 1277.6,
      "popChangePct": 1.21
    },
    {
      "year": 2028,
      "gdp": 3.24,
      "growth": 1.4,
      "perCapita": 1321.0,
      "popChangePct": 1.24
    },
    {
      "year": 2029,
      "gdp": 3.394,
      "growth": 1.5,
      "perCapita": 1367.2,
      "popChangePct": 1.18
    },
    {
      "year": 2030,
      "gdp": 3.557,
      "growth": 1.5,
      "perCapita": 1415.9,
      "popChangePct": 1.25
    },
    {
      "year": 2031,
      "gdp": 3.743,
      "growth": 1.5,
      "perCapita": 1472.0,
      "popChangePct": 1.19
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.599,
      "perCapitaPPP": 422.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.676,
      "perCapitaPPP": 464.9,
      "perCapitaPPPChangePct": 9.93,
      "popChangePct": 2.61
    },
    {
      "year": 1982,
      "gdpPPP": 0.757,
      "perCapitaPPP": 508.0,
      "perCapitaPPPChangePct": 9.27,
      "popChangePct": 2.62
    },
    {
      "year": 1983,
      "gdpPPP": 0.811,
      "perCapitaPPP": 528.5,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 2.88
    },
    {
      "year": 1984,
      "gdpPPP": 0.88,
      "perCapitaPPP": 557.5,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 2.93
    },
    {
      "year": 1985,
      "gdpPPP": 0.935,
      "perCapitaPPP": 575.5,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 2.85
    },
    {
      "year": 1986,
      "gdpPPP": 0.99,
      "perCapitaPPP": 594.0,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 2.59
    },
    {
      "year": 1987,
      "gdpPPP": 1.041,
      "perCapitaPPP": 611.4,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 2.22
    },
    {
      "year": 1988,
      "gdpPPP": 1.163,
      "perCapitaPPP": 668.4,
      "perCapitaPPPChangePct": 9.32,
      "popChangePct": 2.17
    },
    {
      "year": 1989,
      "gdpPPP": 1.281,
      "perCapitaPPP": 721.4,
      "perCapitaPPPChangePct": 7.94,
      "popChangePct": 2.01
    },
    {
      "year": 1990,
      "gdpPPP": 1.414,
      "perCapitaPPP": 781.5,
      "perCapitaPPPChangePct": 8.32,
      "popChangePct": 1.97
    },
    {
      "year": 1991,
      "gdpPPP": 1.572,
      "perCapitaPPP": 853.5,
      "perCapitaPPPChangePct": 9.22,
      "popChangePct": 1.77
    },
    {
      "year": 1992,
      "gdpPPP": 1.706,
      "perCapitaPPP": 910.6,
      "perCapitaPPPChangePct": 6.69,
      "popChangePct": 1.68
    },
    {
      "year": 1993,
      "gdpPPP": 1.816,
      "perCapitaPPP": 954.7,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 1.55
    },
    {
      "year": 1994,
      "gdpPPP": 1.951,
      "perCapitaPPP": 1012.0,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 1.37
    },
    {
      "year": 1995,
      "gdpPPP": 2.073,
      "perCapitaPPP": 1062.2,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": 1.19
    },
    {
      "year": 1996,
      "gdpPPP": 2.211,
      "perCapitaPPP": 1121.2,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": 1.08
    },
    {
      "year": 1997,
      "gdpPPP": 2.323,
      "perCapitaPPP": 1168.5,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 0.81
    },
    {
      "year": 1998,
      "gdpPPP": 2.38,
      "perCapitaPPP": 1191.4,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdpPPP": 2.449,
      "perCapitaPPP": 1222.5,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 0.25
    },
    {
      "year": 2000,
      "gdpPPP": 2.603,
      "perCapitaPPP": 1299.1,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": 0.05
    },
    {
      "year": 2001,
      "gdpPPP": 2.75,
      "perCapitaPPP": 1374.3,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": -0.15
    },
    {
      "year": 2002,
      "gdpPPP": 2.86,
      "perCapitaPPP": 1433.8,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": -0.3
    },
    {
      "year": 2003,
      "gdpPPP": 3.04,
      "perCapitaPPP": 1531.6,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": -0.5
    },
    {
      "year": 2004,
      "gdpPPP": 3.187,
      "perCapitaPPP": 1616.6,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": -0.71
    },
    {
      "year": 2005,
      "gdpPPP": 3.396,
      "perCapitaPPP": 1738.7,
      "perCapitaPPPChangePct": 7.55,
      "popChangePct": -0.91
    },
    {
      "year": 2006,
      "gdpPPP": 3.648,
      "perCapitaPPP": 1875.3,
      "perCapitaPPPChangePct": 7.86,
      "popChangePct": -0.41
    },
    {
      "year": 2007,
      "gdpPPP": 3.935,
      "perCapitaPPP": 2014.6,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": 0.41
    },
    {
      "year": 2008,
      "gdpPPP": 4.118,
      "perCapitaPPP": 2094.1,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 0.72
    },
    {
      "year": 2009,
      "gdpPPP": 4.164,
      "perCapitaPPP": 2101.9,
      "perCapitaPPPChangePct": 0.37,
      "popChangePct": 0.71
    },
    {
      "year": 2010,
      "gdpPPP": 4.43,
      "perCapitaPPP": 2219.1,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 0.76
    },
    {
      "year": 2011,
      "gdpPPP": 4.805,
      "perCapitaPPP": 2385.8,
      "perCapitaPPPChangePct": 7.51,
      "popChangePct": 0.9
    },
    {
      "year": 2012,
      "gdpPPP": 5.127,
      "perCapitaPPP": 2520.0,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 0.99
    },
    {
      "year": 2013,
      "gdpPPP": 5.278,
      "perCapitaPPP": 2566.3,
      "perCapitaPPPChangePct": 1.84,
      "popChangePct": 1.13
    },
    {
      "year": 2014,
      "gdpPPP": 5.449,
      "perCapitaPPP": 2619.4,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 1.12
    },
    {
      "year": 2015,
      "gdpPPP": 5.699,
      "perCapitaPPP": 2707.9,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdpPPP": 5.886,
      "perCapitaPPP": 2762.8,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": 1.19
    },
    {
      "year": 2017,
      "gdpPPP": 5.791,
      "perCapitaPPP": 2684.7,
      "perCapitaPPPChangePct": -2.83,
      "popChangePct": 1.27
    },
    {
      "year": 2018,
      "gdpPPP": 5.778,
      "perCapitaPPP": 2646.2,
      "perCapitaPPPChangePct": -1.44,
      "popChangePct": 1.25
    },
    {
      "year": 2019,
      "gdpPPP": 5.644,
      "perCapitaPPP": 2554.5,
      "perCapitaPPPChangePct": -3.46,
      "popChangePct": 1.14
    },
    {
      "year": 2020,
      "gdpPPP": 5.795,
      "perCapitaPPP": 2592.2,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 1.22
    },
    {
      "year": 2021,
      "gdpPPP": 5.858,
      "perCapitaPPP": 2590.3,
      "perCapitaPPPChangePct": -0.07,
      "popChangePct": 1.16
    },
    {
      "year": 2022,
      "gdpPPP": 6.378,
      "perCapitaPPP": 2789.8,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": 1.06
    },
    {
      "year": 2023,
      "gdpPPP": 6.779,
      "perCapitaPPP": 2932.8,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 1.09
    },
    {
      "year": 2024,
      "gdpPPP": 7.288,
      "perCapitaPPP": 3117.9,
      "perCapitaPPPChangePct": 6.31,
      "popChangePct": 1.13
    },
    {
      "year": 2025,
      "gdpPPP": 7.598,
      "perCapitaPPP": 3211.8,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdpPPP": 7.903,
      "perCapitaPPP": 3300.6,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 1.18
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 8.143,
      "perCapitaPPP": 3360.2,
      "perCapitaPPPChangePct": 1.81,
      "popChangePct": 1.21
    },
    {
      "year": 2028,
      "gdpPPP": 8.393,
      "perCapitaPPP": 3421.9,
      "perCapitaPPPChangePct": 1.83,
      "popChangePct": 1.24
    },
    {
      "year": 2029,
      "gdpPPP": 8.671,
      "perCapitaPPP": 3492.7,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 1.18
    },
    {
      "year": 2030,
      "gdpPPP": 8.963,
      "perCapitaPPP": 3567.2,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 1.25
    },
    {
      "year": 2031,
      "gdpPPP": 9.263,
      "perCapitaPPP": 3642.4,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 1.19
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LesothoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
