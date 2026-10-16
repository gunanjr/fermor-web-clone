import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Ukraine",
  "slug": "ukraine",
  "iso3": "UKR",
  "region": "Europe",
  "rank2026": 57,
  "flagEmoji": "🇺🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Iraq",
      "slug": "iraq",
      "rank": 56
    },
    {
      "name": "Qatar",
      "slug": "qatar",
      "rank": 58
    }
  ],
  "history": [
    {
      "year": 1991,
      "gdp": 515.517,
      "growth": null,
      "perCapita": 9969.7,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdp": 21.461,
      "growth": -9.9,
      "perCapita": 413.7,
      "popChangePct": 0.31
    },
    {
      "year": 1993,
      "gdp": 32.713,
      "growth": -14.2,
      "perCapita": 632.6,
      "popChangePct": -0.3
    },
    {
      "year": 1994,
      "gdp": 36.755,
      "growth": -22.9,
      "perCapita": 716.5,
      "popChangePct": -0.8
    },
    {
      "year": 1995,
      "gdp": 37.009,
      "growth": -12.2,
      "perCapita": 727.5,
      "popChangePct": -0.83
    },
    {
      "year": 1996,
      "gdp": 44.559,
      "growth": -10,
      "perCapita": 884.1,
      "popChangePct": -0.93
    },
    {
      "year": 1997,
      "gdp": 50.152,
      "growth": -3,
      "perCapita": 1003.6,
      "popChangePct": -0.85
    },
    {
      "year": 1998,
      "gdp": 41.883,
      "growth": -1.9,
      "perCapita": 845.3,
      "popChangePct": -0.86
    },
    {
      "year": 1999,
      "gdp": 31.581,
      "growth": -0.2,
      "perCapita": 643.0,
      "popChangePct": -0.87
    },
    {
      "year": 2000,
      "gdp": 32.375,
      "growth": 5.9,
      "perCapita": 665.3,
      "popChangePct": -0.92
    },
    {
      "year": 2001,
      "gdp": 39.309,
      "growth": 8.8,
      "perCapita": 814.9,
      "popChangePct": -0.87
    },
    {
      "year": 2002,
      "gdp": 43.956,
      "growth": 5.3,
      "perCapita": 919.1,
      "popChangePct": -0.87
    },
    {
      "year": 2003,
      "gdp": 52.01,
      "growth": 9.5,
      "perCapita": 1096.3,
      "popChangePct": -0.8
    },
    {
      "year": 2004,
      "gdp": 67.221,
      "growth": 11.8,
      "perCapita": 1427.2,
      "popChangePct": -0.72
    },
    {
      "year": 2005,
      "gdp": 89.282,
      "growth": 3.1,
      "perCapita": 1909.8,
      "popChangePct": -0.75
    },
    {
      "year": 2006,
      "gdp": 111.885,
      "growth": 7.6,
      "perCapita": 2407.9,
      "popChangePct": -0.61
    },
    {
      "year": 2007,
      "gdp": 148.734,
      "growth": 8.2,
      "perCapita": 3219.9,
      "popChangePct": -0.59
    },
    {
      "year": 2008,
      "gdp": 188.24,
      "growth": 2.2,
      "perCapita": 4095.4,
      "popChangePct": -0.5
    },
    {
      "year": 2009,
      "gdp": 121.552,
      "growth": -15.1,
      "perCapita": 2655.0,
      "popChangePct": -0.39
    },
    {
      "year": 2010,
      "gdp": 141.208,
      "growth": 4.1,
      "perCapita": 3096.8,
      "popChangePct": -0.4
    },
    {
      "year": 2011,
      "gdp": 169.229,
      "growth": 5.4,
      "perCapita": 3723.1,
      "popChangePct": -0.32
    },
    {
      "year": 2012,
      "gdp": 182.592,
      "growth": 0.2,
      "perCapita": 4024.3,
      "popChangePct": -0.18
    },
    {
      "year": 2013,
      "gdp": 190.499,
      "growth": 0,
      "perCapita": 4210.3,
      "popChangePct": -0.28
    },
    {
      "year": 2014,
      "gdp": 133.434,
      "growth": -10,
      "perCapita": 3120.6,
      "popChangePct": -5.49
    },
    {
      "year": 2015,
      "gdp": 90.981,
      "growth": -9.8,
      "perCapita": 2136.2,
      "popChangePct": -0.4
    },
    {
      "year": 2016,
      "gdp": 93.355,
      "growth": 2.4,
      "perCapita": 2201.0,
      "popChangePct": -0.41
    },
    {
      "year": 2017,
      "gdp": 112.091,
      "growth": 2.4,
      "perCapita": 2655.1,
      "popChangePct": -0.47
    },
    {
      "year": 2018,
      "gdp": 130.891,
      "growth": 3.5,
      "perCapita": 3117.7,
      "popChangePct": -0.55
    },
    {
      "year": 2019,
      "gdp": 153.883,
      "growth": 3.2,
      "perCapita": 3687.3,
      "popChangePct": -0.6
    },
    {
      "year": 2020,
      "gdp": 156.618,
      "growth": -3.8,
      "perCapita": 3781.3,
      "popChangePct": -0.75
    },
    {
      "year": 2021,
      "gdp": 199.766,
      "growth": 3.4,
      "perCapita": 4872.6,
      "popChangePct": -1.02
    },
    {
      "year": 2022,
      "gdp": 161.99,
      "growth": -28.8,
      "perCapita": 4693.9,
      "popChangePct": -15.82
    },
    {
      "year": 2023,
      "gdp": 181.222,
      "growth": 5.5,
      "perCapita": 5326.0,
      "popChangePct": -1.41
    },
    {
      "year": 2024,
      "gdp": 190.834,
      "growth": 3.2,
      "perCapita": 5723.4,
      "popChangePct": -2.01
    },
    {
      "year": 2025,
      "gdp": 212.927,
      "growth": 1.8,
      "perCapita": 6499.3,
      "popChangePct": -1.74
    },
    {
      "year": 2026,
      "gdp": 225.337,
      "growth": 2,
      "perCapita": 6980.1,
      "popChangePct": -1.46
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 238.712,
      "growth": 3.5,
      "perCapita": 7298.8,
      "popChangePct": 1.31
    },
    {
      "year": 2028,
      "gdp": 251.095,
      "growth": 4.2,
      "perCapita": 7533.5,
      "popChangePct": 1.91
    },
    {
      "year": 2029,
      "gdp": 260.888,
      "growth": 3.9,
      "perCapita": 7774.4,
      "popChangePct": 0.68
    },
    {
      "year": 2030,
      "gdp": 274.476,
      "growth": 3.7,
      "perCapita": 8196.7,
      "popChangePct": -0.21
    },
    {
      "year": 2031,
      "gdp": 290.868,
      "growth": 3.6,
      "perCapita": 8756.7,
      "popChangePct": -0.8
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 432.917,
      "perCapitaPPP": 8346.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": 0.31
    },
    {
      "year": 1993,
      "gdpPPP": 380.131,
      "perCapitaPPP": 7350.4,
      "perCapitaPPPChangePct": -11.93,
      "popChangePct": -0.3
    },
    {
      "year": 1994,
      "gdpPPP": 299.207,
      "perCapitaPPP": 5832.5,
      "perCapitaPPPChangePct": -20.65,
      "popChangePct": -0.8
    },
    {
      "year": 1995,
      "gdpPPP": 268.362,
      "perCapitaPPP": 5275.0,
      "perCapitaPPPChangePct": -9.56,
      "popChangePct": -0.83
    },
    {
      "year": 1996,
      "gdpPPP": 245.829,
      "perCapitaPPP": 4877.6,
      "perCapitaPPPChangePct": -7.53,
      "popChangePct": -0.93
    },
    {
      "year": 1997,
      "gdpPPP": 242.595,
      "perCapitaPPP": 4854.5,
      "perCapitaPPPChangePct": -0.47,
      "popChangePct": -0.85
    },
    {
      "year": 1998,
      "gdpPPP": 240.553,
      "perCapitaPPP": 4855.3,
      "perCapitaPPPChangePct": 0.02,
      "popChangePct": -0.86
    },
    {
      "year": 1999,
      "gdpPPP": 243.565,
      "perCapitaPPP": 4959.1,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": -0.87
    },
    {
      "year": 2000,
      "gdpPPP": 263.755,
      "perCapitaPPP": 5420.0,
      "perCapitaPPPChangePct": 9.29,
      "popChangePct": -0.92
    },
    {
      "year": 2001,
      "gdpPPP": 293.513,
      "perCapitaPPP": 6084.3,
      "perCapitaPPPChangePct": 12.26,
      "popChangePct": -0.87
    },
    {
      "year": 2002,
      "gdpPPP": 313.991,
      "perCapitaPPP": 6565.7,
      "perCapitaPPPChangePct": 7.91,
      "popChangePct": -0.87
    },
    {
      "year": 2003,
      "gdpPPP": 350.661,
      "perCapitaPPP": 7391.3,
      "perCapitaPPPChangePct": 12.58,
      "popChangePct": -0.8
    },
    {
      "year": 2004,
      "gdpPPP": 402.563,
      "perCapitaPPP": 8546.9,
      "perCapitaPPPChangePct": 15.63,
      "popChangePct": -0.72
    },
    {
      "year": 2005,
      "gdpPPP": 427.938,
      "perCapitaPPP": 9153.9,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": -0.75
    },
    {
      "year": 2006,
      "gdpPPP": 474.535,
      "perCapitaPPP": 10212.6,
      "perCapitaPPPChangePct": 11.57,
      "popChangePct": -0.61
    },
    {
      "year": 2007,
      "gdpPPP": 527.435,
      "perCapitaPPP": 11418.3,
      "perCapitaPPPChangePct": 11.81,
      "popChangePct": -0.59
    },
    {
      "year": 2008,
      "gdpPPP": 549.657,
      "perCapitaPPP": 11958.6,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": -0.5
    },
    {
      "year": 2009,
      "gdpPPP": 469.335,
      "perCapitaPPP": 10251.4,
      "perCapitaPPPChangePct": -14.28,
      "popChangePct": -0.39
    },
    {
      "year": 2010,
      "gdpPPP": 494.478,
      "perCapitaPPP": 10844.2,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": -0.4
    },
    {
      "year": 2011,
      "gdpPPP": 532.161,
      "perCapitaPPP": 11707.9,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": -0.32
    },
    {
      "year": 2012,
      "gdpPPP": 542.896,
      "perCapitaPPP": 11965.3,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": -0.18
    },
    {
      "year": 2013,
      "gdpPPP": 552.386,
      "perCapitaPPP": 12208.5,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": -0.28
    },
    {
      "year": 2014,
      "gdpPPP": 506.022,
      "perCapitaPPP": 11834.1,
      "perCapitaPPPChangePct": -3.07,
      "popChangePct": -5.49
    },
    {
      "year": 2015,
      "gdpPPP": 460.806,
      "perCapitaPPP": 10819.4,
      "perCapitaPPPChangePct": -8.57,
      "popChangePct": -0.4
    },
    {
      "year": 2016,
      "gdpPPP": 476.54,
      "perCapitaPPP": 11235.2,
      "perCapitaPPPChangePct": 3.84,
      "popChangePct": -0.41
    },
    {
      "year": 2017,
      "gdpPPP": 496.522,
      "perCapitaPPP": 11761.2,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": -0.47
    },
    {
      "year": 2018,
      "gdpPPP": 537.198,
      "perCapitaPPP": 12795.4,
      "perCapitaPPPChangePct": 8.79,
      "popChangePct": -0.55
    },
    {
      "year": 2019,
      "gdpPPP": 604.396,
      "perCapitaPPP": 14482.5,
      "perCapitaPPPChangePct": 13.19,
      "popChangePct": -0.6
    },
    {
      "year": 2020,
      "gdpPPP": 656.106,
      "perCapitaPPP": 15840.8,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": -0.75
    },
    {
      "year": 2021,
      "gdpPPP": 746.471,
      "perCapitaPPP": 18207.6,
      "perCapitaPPPChangePct": 14.94,
      "popChangePct": -1.02
    },
    {
      "year": 2022,
      "gdpPPP": 569.62,
      "perCapitaPPP": 16505.6,
      "perCapitaPPPChangePct": -9.35,
      "popChangePct": -15.82
    },
    {
      "year": 2023,
      "gdpPPP": 623.389,
      "perCapitaPPP": 18321.1,
      "perCapitaPPPChangePct": 11.0,
      "popChangePct": -1.41
    },
    {
      "year": 2024,
      "gdpPPP": 659.616,
      "perCapitaPPP": 19782.9,
      "perCapitaPPPChangePct": 7.98,
      "popChangePct": -2.01
    },
    {
      "year": 2025,
      "gdpPPP": 690.538,
      "perCapitaPPP": 21077.6,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": -1.74
    },
    {
      "year": 2026,
      "gdpPPP": 724.527,
      "perCapitaPPP": 22443.2,
      "perCapitaPPPChangePct": 6.48,
      "popChangePct": -1.46
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 766.353,
      "perCapitaPPP": 23431.8,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 1.31
    },
    {
      "year": 2028,
      "gdpPPP": 811.646,
      "perCapitaPPP": 24351.5,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 1.91
    },
    {
      "year": 2029,
      "gdpPPP": 858.295,
      "perCapitaPPP": 25577.0,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 0.68
    },
    {
      "year": 2030,
      "gdpPPP": 906.407,
      "perCapitaPPP": 27068.3,
      "perCapitaPPPChangePct": 5.83,
      "popChangePct": -0.21
    },
    {
      "year": 2031,
      "gdpPPP": 955.99,
      "perCapitaPPP": 28780.5,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": -0.8
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function UkraineGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
