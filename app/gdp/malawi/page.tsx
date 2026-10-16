import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Malawi",
  "slug": "malawi",
  "iso3": "MWI",
  "region": "Africa",
  "rank2026": 142,
  "flagEmoji": "🇲🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Laos",
      "slug": "laos",
      "rank": 141
    },
    {
      "name": "Rwanda",
      "slug": "rwanda",
      "rank": 143
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.022,
      "growth": 0.4,
      "perCapita": 460.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.022,
      "growth": -5.2,
      "perCapita": 447.8,
      "popChangePct": 2.8
    },
    {
      "year": 1982,
      "gdp": 2.881,
      "growth": 2.5,
      "perCapita": 416.2,
      "popChangePct": 2.59
    },
    {
      "year": 1983,
      "gdp": 2.986,
      "growth": 3.7,
      "perCapita": 419.7,
      "popChangePct": 2.79
    },
    {
      "year": 1984,
      "gdp": 2.949,
      "growth": 5.4,
      "perCapita": 400.3,
      "popChangePct": 3.54
    },
    {
      "year": 1985,
      "gdp": 2.762,
      "growth": 4.6,
      "perCapita": 358.7,
      "popChangePct": 4.51
    },
    {
      "year": 1986,
      "gdp": 2.883,
      "growth": -0.2,
      "perCapita": 354.5,
      "popChangePct": 5.62
    },
    {
      "year": 1987,
      "gdp": 2.834,
      "growth": 1.6,
      "perCapita": 327.8,
      "popChangePct": 6.32
    },
    {
      "year": 1988,
      "gdp": 3.258,
      "growth": 3.2,
      "perCapita": 354.7,
      "popChangePct": 6.22
    },
    {
      "year": 1989,
      "gdp": 3.715,
      "growth": 1.3,
      "perCapita": 384.3,
      "popChangePct": 5.25
    },
    {
      "year": 1990,
      "gdp": 4.222,
      "growth": 5.7,
      "perCapita": 420.6,
      "popChangePct": 3.85
    },
    {
      "year": 1991,
      "gdp": 5.38,
      "growth": 8.7,
      "perCapita": 523.6,
      "popChangePct": 2.35
    },
    {
      "year": 1992,
      "gdp": 4.394,
      "growth": -7.3,
      "perCapita": 422.5,
      "popChangePct": 1.22
    },
    {
      "year": 1993,
      "gdp": 5.056,
      "growth": 9.7,
      "perCapita": 483.3,
      "popChangePct": 0.59
    },
    {
      "year": 1994,
      "gdp": 2.93,
      "growth": -10.3,
      "perCapita": 278.1,
      "popChangePct": 0.69
    },
    {
      "year": 1995,
      "gdp": 3.412,
      "growth": 13.8,
      "perCapita": 319.9,
      "popChangePct": 1.26
    },
    {
      "year": 1996,
      "gdp": 5.569,
      "growth": 10,
      "perCapita": 512.1,
      "popChangePct": 1.97
    },
    {
      "year": 1997,
      "gdp": 6.504,
      "growth": 6.6,
      "perCapita": 583.4,
      "popChangePct": 2.5
    },
    {
      "year": 1998,
      "gdp": 4.275,
      "growth": 1.1,
      "perCapita": 373.1,
      "popChangePct": 2.78
    },
    {
      "year": 1999,
      "gdp": 4.336,
      "growth": 3.5,
      "perCapita": 368.3,
      "popChangePct": 2.76
    },
    {
      "year": 2000,
      "gdp": 4.257,
      "growth": 0.8,
      "perCapita": 352.6,
      "popChangePct": 2.51
    },
    {
      "year": 2001,
      "gdp": 4.178,
      "growth": -4.1,
      "perCapita": 338.5,
      "popChangePct": 2.26
    },
    {
      "year": 2002,
      "gdp": 4.922,
      "growth": 1.8,
      "perCapita": 384.1,
      "popChangePct": 3.81
    },
    {
      "year": 2003,
      "gdp": 4.521,
      "growth": 5.7,
      "perCapita": 345.2,
      "popChangePct": 2.22
    },
    {
      "year": 2004,
      "gdp": 4.895,
      "growth": 5.4,
      "perCapita": 365.7,
      "popChangePct": 2.19
    },
    {
      "year": 2005,
      "gdp": 5.148,
      "growth": 3.3,
      "perCapita": 377.0,
      "popChangePct": 2.01
    },
    {
      "year": 2006,
      "gdp": 5.63,
      "growth": 4.7,
      "perCapita": 400.9,
      "popChangePct": 2.85
    },
    {
      "year": 2007,
      "gdp": 6.24,
      "growth": 9.6,
      "perCapita": 432.1,
      "popChangePct": 2.82
    },
    {
      "year": 2008,
      "gdp": 7.492,
      "growth": 7.6,
      "perCapita": 504.6,
      "popChangePct": 2.82
    },
    {
      "year": 2009,
      "gdp": 8.723,
      "growth": 8.3,
      "perCapita": 571.1,
      "popChangePct": 2.88
    },
    {
      "year": 2010,
      "gdp": 9.796,
      "growth": 6.9,
      "perCapita": 623.4,
      "popChangePct": 2.88
    },
    {
      "year": 2011,
      "gdp": 11.241,
      "growth": 4.9,
      "perCapita": 695.3,
      "popChangePct": 2.88
    },
    {
      "year": 2012,
      "gdp": 8.421,
      "growth": 1.9,
      "perCapita": 506.3,
      "popChangePct": 2.88
    },
    {
      "year": 2013,
      "gdp": 7.648,
      "growth": 5.2,
      "perCapita": 447.0,
      "popChangePct": 2.88
    },
    {
      "year": 2014,
      "gdp": 8.526,
      "growth": 5.7,
      "perCapita": 484.3,
      "popChangePct": 2.88
    },
    {
      "year": 2015,
      "gdp": 9.014,
      "growth": 3,
      "perCapita": 497.7,
      "popChangePct": 2.88
    },
    {
      "year": 2016,
      "gdp": 7.733,
      "growth": 2.3,
      "perCapita": 415.0,
      "popChangePct": 2.88
    },
    {
      "year": 2017,
      "gdp": 8.943,
      "growth": 4,
      "perCapita": 466.6,
      "popChangePct": 2.88
    },
    {
      "year": 2018,
      "gdp": 9.882,
      "growth": 4.4,
      "perCapita": 501.1,
      "popChangePct": 2.88
    },
    {
      "year": 2019,
      "gdp": 11.031,
      "growth": 5.4,
      "perCapita": 543.7,
      "popChangePct": 2.88
    },
    {
      "year": 2020,
      "gdp": 11.847,
      "growth": 1,
      "perCapita": 567.6,
      "popChangePct": 2.88
    },
    {
      "year": 2021,
      "gdp": 12.475,
      "growth": 4.6,
      "perCapita": 580.9,
      "popChangePct": 2.88
    },
    {
      "year": 2022,
      "gdp": 12.531,
      "growth": 0.9,
      "perCapita": 567.2,
      "popChangePct": 2.88
    },
    {
      "year": 2023,
      "gdp": 13.439,
      "growth": 1.9,
      "perCapita": 591.3,
      "popChangePct": 2.88
    },
    {
      "year": 2024,
      "gdp": 11.79,
      "growth": 1.7,
      "perCapita": 504.2,
      "popChangePct": 2.88
    },
    {
      "year": 2025,
      "gdp": 15.047,
      "growth": 2.1,
      "perCapita": 625.5,
      "popChangePct": 2.88
    },
    {
      "year": 2026,
      "gdp": 18.152,
      "growth": 2.2,
      "perCapita": 733.4,
      "popChangePct": 2.88
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 20.983,
      "growth": 2.4,
      "perCapita": 824.1,
      "popChangePct": 2.88
    },
    {
      "year": 2028,
      "gdp": 24.194,
      "growth": 2.7,
      "perCapita": 923.6,
      "popChangePct": 2.88
    },
    {
      "year": 2029,
      "gdp": 27.567,
      "growth": 2.9,
      "perCapita": 1022.9,
      "popChangePct": 2.88
    },
    {
      "year": 2030,
      "gdp": 31.426,
      "growth": 3,
      "perCapita": 1133.4,
      "popChangePct": 2.88
    },
    {
      "year": 2031,
      "gdp": 33.357,
      "growth": 3,
      "perCapita": 1169.4,
      "popChangePct": 2.88
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.704,
      "perCapitaPPP": 412.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.805,
      "perCapitaPPP": 415.6,
      "perCapitaPPPChangePct": 0.88,
      "popChangePct": 2.8
    },
    {
      "year": 1982,
      "gdpPPP": 3.053,
      "perCapitaPPP": 441.0,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 2.59
    },
    {
      "year": 1983,
      "gdpPPP": 3.29,
      "perCapitaPPP": 462.3,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 2.79
    },
    {
      "year": 1984,
      "gdpPPP": 3.592,
      "perCapitaPPP": 487.5,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 3.54
    },
    {
      "year": 1985,
      "gdpPPP": 3.875,
      "perCapitaPPP": 503.2,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 4.51
    },
    {
      "year": 1986,
      "gdpPPP": 3.944,
      "perCapitaPPP": 484.9,
      "perCapitaPPPChangePct": -3.62,
      "popChangePct": 5.62
    },
    {
      "year": 1987,
      "gdpPPP": 4.108,
      "perCapitaPPP": 475.0,
      "perCapitaPPPChangePct": -2.05,
      "popChangePct": 6.32
    },
    {
      "year": 1988,
      "gdpPPP": 4.388,
      "perCapitaPPP": 477.7,
      "perCapitaPPPChangePct": 0.56,
      "popChangePct": 6.22
    },
    {
      "year": 1989,
      "gdpPPP": 4.621,
      "perCapitaPPP": 478.0,
      "perCapitaPPPChangePct": 0.07,
      "popChangePct": 5.25
    },
    {
      "year": 1990,
      "gdpPPP": 5.067,
      "perCapitaPPP": 504.7,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 3.85
    },
    {
      "year": 1991,
      "gdpPPP": 5.695,
      "perCapitaPPP": 554.3,
      "perCapitaPPPChangePct": 9.82,
      "popChangePct": 2.35
    },
    {
      "year": 1992,
      "gdpPPP": 5.398,
      "perCapitaPPP": 519.0,
      "perCapitaPPPChangePct": -6.36,
      "popChangePct": 1.22
    },
    {
      "year": 1993,
      "gdpPPP": 6.062,
      "perCapitaPPP": 579.4,
      "perCapitaPPPChangePct": 11.63,
      "popChangePct": 0.59
    },
    {
      "year": 1994,
      "gdpPPP": 5.553,
      "perCapitaPPP": 527.2,
      "perCapitaPPPChangePct": -9.02,
      "popChangePct": 0.69
    },
    {
      "year": 1995,
      "gdpPPP": 6.453,
      "perCapitaPPP": 605.0,
      "perCapitaPPPChangePct": 14.77,
      "popChangePct": 1.26
    },
    {
      "year": 1996,
      "gdpPPP": 7.227,
      "perCapitaPPP": 664.4,
      "perCapitaPPPChangePct": 9.82,
      "popChangePct": 1.97
    },
    {
      "year": 1997,
      "gdpPPP": 7.836,
      "perCapitaPPP": 702.9,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 2.5
    },
    {
      "year": 1998,
      "gdpPPP": 8.008,
      "perCapitaPPP": 698.9,
      "perCapitaPPPChangePct": -0.57,
      "popChangePct": 2.78
    },
    {
      "year": 1999,
      "gdpPPP": 8.409,
      "perCapitaPPP": 714.2,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.76
    },
    {
      "year": 2000,
      "gdpPPP": 8.666,
      "perCapitaPPP": 717.9,
      "perCapitaPPPChangePct": 0.53,
      "popChangePct": 2.51
    },
    {
      "year": 2001,
      "gdpPPP": 8.5,
      "perCapitaPPP": 688.6,
      "perCapitaPPPChangePct": -4.09,
      "popChangePct": 2.26
    },
    {
      "year": 2002,
      "gdpPPP": 8.784,
      "perCapitaPPP": 685.5,
      "perCapitaPPPChangePct": -0.45,
      "popChangePct": 3.81
    },
    {
      "year": 2003,
      "gdpPPP": 9.468,
      "perCapitaPPP": 722.9,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 2.22
    },
    {
      "year": 2004,
      "gdpPPP": 10.25,
      "perCapitaPPP": 765.8,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": 2.19
    },
    {
      "year": 2005,
      "gdpPPP": 10.917,
      "perCapitaPPP": 799.5,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 2.01
    },
    {
      "year": 2006,
      "gdpPPP": 11.782,
      "perCapitaPPP": 839.1,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 2.85
    },
    {
      "year": 2007,
      "gdpPPP": 13.263,
      "perCapitaPPP": 918.6,
      "perCapitaPPPChangePct": 9.47,
      "popChangePct": 2.82
    },
    {
      "year": 2008,
      "gdpPPP": 14.552,
      "perCapitaPPP": 980.2,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 2.82
    },
    {
      "year": 2009,
      "gdpPPP": 15.861,
      "perCapitaPPP": 1038.4,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": 2.88
    },
    {
      "year": 2010,
      "gdpPPP": 17.157,
      "perCapitaPPP": 1091.9,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 2.88
    },
    {
      "year": 2011,
      "gdpPPP": 18.361,
      "perCapitaPPP": 1135.8,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 2.88
    },
    {
      "year": 2012,
      "gdpPPP": 19.056,
      "perCapitaPPP": 1145.7,
      "perCapitaPPPChangePct": 0.88,
      "popChangePct": 2.88
    },
    {
      "year": 2013,
      "gdpPPP": 20.388,
      "perCapitaPPP": 1191.5,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 2.88
    },
    {
      "year": 2014,
      "gdpPPP": 21.925,
      "perCapitaPPP": 1245.5,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 2.88
    },
    {
      "year": 2015,
      "gdpPPP": 22.782,
      "perCapitaPPP": 1257.9,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 2.88
    },
    {
      "year": 2016,
      "gdpPPP": 23.52,
      "perCapitaPPP": 1262.3,
      "perCapitaPPPChangePct": 0.35,
      "popChangePct": 2.88
    },
    {
      "year": 2017,
      "gdpPPP": 24.899,
      "perCapitaPPP": 1298.9,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 2.88
    },
    {
      "year": 2018,
      "gdpPPP": 25.272,
      "perCapitaPPP": 1281.5,
      "perCapitaPPPChangePct": -1.34,
      "popChangePct": 2.88
    },
    {
      "year": 2019,
      "gdpPPP": 27.521,
      "perCapitaPPP": 1356.5,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 2.88
    },
    {
      "year": 2020,
      "gdpPPP": 29.543,
      "perCapitaPPP": 1415.4,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 2.88
    },
    {
      "year": 2021,
      "gdpPPP": 33.832,
      "perCapitaPPP": 1575.5,
      "perCapitaPPPChangePct": 11.31,
      "popChangePct": 2.88
    },
    {
      "year": 2022,
      "gdpPPP": 36.572,
      "perCapitaPPP": 1655.4,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 2.88
    },
    {
      "year": 2023,
      "gdpPPP": 38.663,
      "perCapitaPPP": 1701.0,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 2.88
    },
    {
      "year": 2024,
      "gdpPPP": 40.286,
      "perCapitaPPP": 1722.8,
      "perCapitaPPPChangePct": 1.28,
      "popChangePct": 2.88
    },
    {
      "year": 2025,
      "gdpPPP": 42.293,
      "perCapitaPPP": 1758.0,
      "perCapitaPPPChangePct": 2.04,
      "popChangePct": 2.88
    },
    {
      "year": 2026,
      "gdpPPP": 44.473,
      "perCapitaPPP": 1796.9,
      "perCapitaPPPChangePct": 2.21,
      "popChangePct": 2.88
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 46.555,
      "perCapitaPPP": 1828.4,
      "perCapitaPPPChangePct": 1.75,
      "popChangePct": 2.88
    },
    {
      "year": 2028,
      "gdpPPP": 48.606,
      "perCapitaPPP": 1855.5,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 2.88
    },
    {
      "year": 2029,
      "gdpPPP": 50.899,
      "perCapitaPPP": 1888.6,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 2.88
    },
    {
      "year": 2030,
      "gdpPPP": 53.389,
      "perCapitaPPP": 1925.6,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 2.88
    },
    {
      "year": 2031,
      "gdpPPP": 55.984,
      "perCapitaPPP": 1962.6,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 2.88
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MalawiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
