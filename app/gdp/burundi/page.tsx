import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Burundi",
  "slug": "burundi",
  "iso3": "BDI",
  "region": "Africa",
  "rank2026": 162,
  "flagEmoji": "🇧🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Sierra Leone",
      "slug": "sierra-leone",
      "rank": 161
    },
    {
      "name": "Maldives",
      "slug": "maldives",
      "rank": 163
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.106,
      "growth": -6.8,
      "perCapita": 275.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.151,
      "growth": 12.2,
      "perCapita": 278.8,
      "popChangePct": 2.94
    },
    {
      "year": 1982,
      "gdp": 1.216,
      "growth": -1.1,
      "perCapita": 286.1,
      "popChangePct": 2.93
    },
    {
      "year": 1983,
      "gdp": 1.287,
      "growth": 3.7,
      "perCapita": 294.3,
      "popChangePct": 2.92
    },
    {
      "year": 1984,
      "gdp": 1.17,
      "growth": 0.2,
      "perCapita": 259.9,
      "popChangePct": 2.93
    },
    {
      "year": 1985,
      "gdp": 1.362,
      "growth": 11.8,
      "perCapita": 293.9,
      "popChangePct": 2.93
    },
    {
      "year": 1986,
      "gdp": 1.435,
      "growth": 3.2,
      "perCapita": 300.8,
      "popChangePct": 2.93
    },
    {
      "year": 1987,
      "gdp": 1.352,
      "growth": 5.5,
      "perCapita": 275.3,
      "popChangePct": 2.94
    },
    {
      "year": 1988,
      "gdp": 1.267,
      "growth": 5,
      "perCapita": 250.6,
      "popChangePct": 2.93
    },
    {
      "year": 1989,
      "gdp": 1.316,
      "growth": 1.3,
      "perCapita": 253.0,
      "popChangePct": 2.93
    },
    {
      "year": 1990,
      "gdp": 1.316,
      "growth": 3.5,
      "perCapita": 245.8,
      "popChangePct": 2.92
    },
    {
      "year": 1991,
      "gdp": 1.358,
      "growth": 5.8,
      "perCapita": 246.5,
      "popChangePct": 2.93
    },
    {
      "year": 1992,
      "gdp": 1.26,
      "growth": 1,
      "perCapita": 222.2,
      "popChangePct": 2.85
    },
    {
      "year": 1993,
      "gdp": 1.092,
      "growth": -6.2,
      "perCapita": 193.0,
      "popChangePct": -0.18
    },
    {
      "year": 1994,
      "gdp": 1.076,
      "growth": -3.8,
      "perCapita": 186.9,
      "popChangePct": 1.73
    },
    {
      "year": 1995,
      "gdp": 1.164,
      "growth": -7.9,
      "perCapita": 198.4,
      "popChangePct": 1.88
    },
    {
      "year": 1996,
      "gdp": 1.011,
      "growth": -8,
      "perCapita": 169.2,
      "popChangePct": 1.84
    },
    {
      "year": 1997,
      "gdp": 1.131,
      "growth": 0.4,
      "perCapita": 186.4,
      "popChangePct": 1.64
    },
    {
      "year": 1998,
      "gdp": 1.039,
      "growth": 4.8,
      "perCapita": 168.0,
      "popChangePct": 1.93
    },
    {
      "year": 1999,
      "gdp": 0.999,
      "growth": 1.2,
      "perCapita": 157.6,
      "popChangePct": 2.42
    },
    {
      "year": 2000,
      "gdp": 0.989,
      "growth": 1.8,
      "perCapita": 152.9,
      "popChangePct": 2.1
    },
    {
      "year": 2001,
      "gdp": 0.983,
      "growth": 1.7,
      "perCapita": 148.2,
      "popChangePct": 2.53
    },
    {
      "year": 2002,
      "gdp": 0.907,
      "growth": 2.4,
      "perCapita": 132.9,
      "popChangePct": 2.86
    },
    {
      "year": 2003,
      "gdp": 0.844,
      "growth": 2.5,
      "perCapita": 119.8,
      "popChangePct": 3.21
    },
    {
      "year": 2004,
      "gdp": 0.952,
      "growth": 3.8,
      "perCapita": 130.2,
      "popChangePct": 3.81
    },
    {
      "year": 2005,
      "gdp": 1.117,
      "growth": 4.4,
      "perCapita": 147.2,
      "popChangePct": 3.78
    },
    {
      "year": 2006,
      "gdp": 1.273,
      "growth": 5.4,
      "perCapita": 161.9,
      "popChangePct": 3.68
    },
    {
      "year": 2007,
      "gdp": 1.356,
      "growth": 3.5,
      "perCapita": 166.2,
      "popChangePct": 3.76
    },
    {
      "year": 2008,
      "gdp": 1.612,
      "growth": 4.9,
      "perCapita": 189.5,
      "popChangePct": 4.21
    },
    {
      "year": 2009,
      "gdp": 1.775,
      "growth": 3.8,
      "perCapita": 198.4,
      "popChangePct": 5.2
    },
    {
      "year": 2010,
      "gdp": 2.032,
      "growth": 5.1,
      "perCapita": 216.7,
      "popChangePct": 4.78
    },
    {
      "year": 2011,
      "gdp": 2.236,
      "growth": 4,
      "perCapita": 230.1,
      "popChangePct": 3.65
    },
    {
      "year": 2012,
      "gdp": 2.333,
      "growth": 4.4,
      "perCapita": 231.7,
      "popChangePct": 3.63
    },
    {
      "year": 2013,
      "gdp": 2.456,
      "growth": 4.9,
      "perCapita": 235.2,
      "popChangePct": 3.65
    },
    {
      "year": 2014,
      "gdp": 2.706,
      "growth": 4.2,
      "perCapita": 250.5,
      "popChangePct": 3.46
    },
    {
      "year": 2015,
      "gdp": 3.104,
      "growth": -3.9,
      "perCapita": 281.0,
      "popChangePct": 2.3
    },
    {
      "year": 2016,
      "gdp": 2.96,
      "growth": -0.6,
      "perCapita": 263.3,
      "popChangePct": 1.73
    },
    {
      "year": 2017,
      "gdp": 3.172,
      "growth": 0.5,
      "perCapita": 275.6,
      "popChangePct": 2.38
    },
    {
      "year": 2018,
      "gdp": 3.037,
      "growth": 1.6,
      "perCapita": 256.1,
      "popChangePct": 3.06
    },
    {
      "year": 2019,
      "gdp": 3.009,
      "growth": 1.8,
      "perCapita": 245.5,
      "popChangePct": 3.34
    },
    {
      "year": 2020,
      "gdp": 3.089,
      "growth": 0.3,
      "perCapita": 244.9,
      "popChangePct": 2.95
    },
    {
      "year": 2021,
      "gdp": 3.356,
      "growth": 3.1,
      "perCapita": 258.8,
      "popChangePct": 2.76
    },
    {
      "year": 2022,
      "gdp": 3.922,
      "growth": 1.8,
      "perCapita": 294.4,
      "popChangePct": 2.75
    },
    {
      "year": 2023,
      "gdp": 4.291,
      "growth": 2.7,
      "perCapita": 313.4,
      "popChangePct": 2.76
    },
    {
      "year": 2024,
      "gdp": 4.838,
      "growth": 4.1,
      "perCapita": 344.4,
      "popChangePct": 2.62
    },
    {
      "year": 2025,
      "gdp": 6.918,
      "growth": 3.9,
      "perCapita": 478.1,
      "popChangePct": 3.0
    },
    {
      "year": 2026,
      "gdp": 8.137,
      "growth": 3.8,
      "perCapita": 546.0,
      "popChangePct": 3.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 9.067,
      "growth": 4.2,
      "perCapita": 590.6,
      "popChangePct": 3.0
    },
    {
      "year": 2028,
      "gdp": 9.298,
      "growth": 4,
      "perCapita": 588.0,
      "popChangePct": 3.0
    },
    {
      "year": 2029,
      "gdp": 9.47,
      "growth": 4.1,
      "perCapita": 581.5,
      "popChangePct": 3.0
    },
    {
      "year": 2030,
      "gdp": 9.455,
      "growth": 4.1,
      "perCapita": 563.7,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdp": 9.749,
      "growth": 4.2,
      "perCapita": 567.6,
      "popChangePct": 2.4
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.535,
      "perCapitaPPP": 382.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 1.884,
      "perCapitaPPP": 456.4,
      "perCapitaPPPChangePct": 19.28,
      "popChangePct": 2.94
    },
    {
      "year": 1982,
      "gdpPPP": 1.98,
      "perCapitaPPP": 465.9,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 2.93
    },
    {
      "year": 1983,
      "gdpPPP": 2.134,
      "perCapitaPPP": 487.8,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 2.92
    },
    {
      "year": 1984,
      "gdpPPP": 2.214,
      "perCapitaPPP": 491.8,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": 2.93
    },
    {
      "year": 1985,
      "gdpPPP": 2.553,
      "perCapitaPPP": 551.0,
      "perCapitaPPPChangePct": 12.04,
      "popChangePct": 2.93
    },
    {
      "year": 1986,
      "gdpPPP": 2.689,
      "perCapitaPPP": 563.8,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 2.93
    },
    {
      "year": 1987,
      "gdpPPP": 2.908,
      "perCapitaPPP": 592.2,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 2.94
    },
    {
      "year": 1988,
      "gdpPPP": 3.162,
      "perCapitaPPP": 625.6,
      "perCapitaPPPChangePct": 5.64,
      "popChangePct": 2.93
    },
    {
      "year": 1989,
      "gdpPPP": 3.33,
      "perCapitaPPP": 640.2,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 2.93
    },
    {
      "year": 1990,
      "gdpPPP": 3.574,
      "perCapitaPPP": 667.6,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 2.92
    },
    {
      "year": 1991,
      "gdpPPP": 3.909,
      "perCapitaPPP": 709.2,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 2.93
    },
    {
      "year": 1992,
      "gdpPPP": 4.038,
      "perCapitaPPP": 712.4,
      "perCapitaPPPChangePct": 0.45,
      "popChangePct": 2.85
    },
    {
      "year": 1993,
      "gdpPPP": 3.876,
      "perCapitaPPP": 685.0,
      "perCapitaPPPChangePct": -3.85,
      "popChangePct": -0.18
    },
    {
      "year": 1994,
      "gdpPPP": 3.807,
      "perCapitaPPP": 661.4,
      "perCapitaPPPChangePct": -3.45,
      "popChangePct": 1.73
    },
    {
      "year": 1995,
      "gdpPPP": 3.579,
      "perCapitaPPP": 610.4,
      "perCapitaPPPChangePct": -7.72,
      "popChangePct": 1.88
    },
    {
      "year": 1996,
      "gdpPPP": 3.353,
      "perCapitaPPP": 561.5,
      "perCapitaPPPChangePct": -8.01,
      "popChangePct": 1.84
    },
    {
      "year": 1997,
      "gdpPPP": 3.425,
      "perCapitaPPP": 564.2,
      "perCapitaPPPChangePct": 0.49,
      "popChangePct": 1.64
    },
    {
      "year": 1998,
      "gdpPPP": 3.628,
      "perCapitaPPP": 586.4,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 1.93
    },
    {
      "year": 1999,
      "gdpPPP": 3.722,
      "perCapitaPPP": 587.4,
      "perCapitaPPPChangePct": 0.17,
      "popChangePct": 2.42
    },
    {
      "year": 2000,
      "gdpPPP": 3.874,
      "perCapitaPPP": 598.8,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": 2.1
    },
    {
      "year": 2001,
      "gdpPPP": 4.028,
      "perCapitaPPP": 607.1,
      "perCapitaPPPChangePct": 1.38,
      "popChangePct": 2.53
    },
    {
      "year": 2002,
      "gdpPPP": 4.186,
      "perCapitaPPP": 613.5,
      "perCapitaPPPChangePct": 1.05,
      "popChangePct": 2.86
    },
    {
      "year": 2003,
      "gdpPPP": 4.374,
      "perCapitaPPP": 621.1,
      "perCapitaPPPChangePct": 1.24,
      "popChangePct": 3.21
    },
    {
      "year": 2004,
      "gdpPPP": 4.661,
      "perCapitaPPP": 637.6,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 3.81
    },
    {
      "year": 2005,
      "gdpPPP": 5.018,
      "perCapitaPPP": 661.3,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 3.78
    },
    {
      "year": 2006,
      "gdpPPP": 5.452,
      "perCapitaPPP": 693.2,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 3.68
    },
    {
      "year": 2007,
      "gdpPPP": 5.793,
      "perCapitaPPP": 709.8,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 3.76
    },
    {
      "year": 2008,
      "gdpPPP": 6.192,
      "perCapitaPPP": 728.0,
      "perCapitaPPPChangePct": 2.56,
      "popChangePct": 4.21
    },
    {
      "year": 2009,
      "gdpPPP": 6.468,
      "perCapitaPPP": 722.8,
      "perCapitaPPPChangePct": -0.71,
      "popChangePct": 5.2
    },
    {
      "year": 2010,
      "gdpPPP": 6.882,
      "perCapitaPPP": 733.9,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 4.78
    },
    {
      "year": 2011,
      "gdpPPP": 7.307,
      "perCapitaPPP": 751.9,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 3.65
    },
    {
      "year": 2012,
      "gdpPPP": 7.774,
      "perCapitaPPP": 771.9,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 3.63
    },
    {
      "year": 2013,
      "gdpPPP": 8.296,
      "perCapitaPPP": 794.7,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 3.65
    },
    {
      "year": 2014,
      "gdpPPP": 8.798,
      "perCapitaPPP": 814.7,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 3.46
    },
    {
      "year": 2015,
      "gdpPPP": 8.533,
      "perCapitaPPP": 772.4,
      "perCapitaPPPChangePct": -5.18,
      "popChangePct": 2.3
    },
    {
      "year": 2016,
      "gdpPPP": 8.563,
      "perCapitaPPP": 761.9,
      "perCapitaPPPChangePct": -1.37,
      "popChangePct": 1.73
    },
    {
      "year": 2017,
      "gdpPPP": 8.76,
      "perCapitaPPP": 761.3,
      "perCapitaPPPChangePct": -0.08,
      "popChangePct": 2.38
    },
    {
      "year": 2018,
      "gdpPPP": 8.936,
      "perCapitaPPP": 753.5,
      "perCapitaPPPChangePct": -1.03,
      "popChangePct": 3.06
    },
    {
      "year": 2019,
      "gdpPPP": 9.539,
      "perCapitaPPP": 778.4,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 3.34
    },
    {
      "year": 2020,
      "gdpPPP": 9.933,
      "perCapitaPPP": 787.3,
      "perCapitaPPPChangePct": 1.15,
      "popChangePct": 2.95
    },
    {
      "year": 2021,
      "gdpPPP": 10.863,
      "perCapitaPPP": 837.9,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 2.76
    },
    {
      "year": 2022,
      "gdpPPP": 11.849,
      "perCapitaPPP": 889.5,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 2.75
    },
    {
      "year": 2023,
      "gdpPPP": 12.614,
      "perCapitaPPP": 921.4,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 2.76
    },
    {
      "year": 2024,
      "gdpPPP": 13.463,
      "perCapitaPPP": 958.4,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 2.62
    },
    {
      "year": 2025,
      "gdpPPP": 14.386,
      "perCapitaPPP": 994.2,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 3.0
    },
    {
      "year": 2026,
      "gdpPPP": 15.363,
      "perCapitaPPP": 1030.9,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 3.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 16.355,
      "perCapitaPPP": 1065.4,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 3.0
    },
    {
      "year": 2028,
      "gdpPPP": 17.293,
      "perCapitaPPP": 1093.7,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 3.0
    },
    {
      "year": 2029,
      "gdpPPP": 18.315,
      "perCapitaPPP": 1124.7,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 3.0
    },
    {
      "year": 2030,
      "gdpPPP": 19.419,
      "perCapitaPPP": 1157.7,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdpPPP": 20.594,
      "perCapitaPPP": 1199.0,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 2.4
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BurundiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
