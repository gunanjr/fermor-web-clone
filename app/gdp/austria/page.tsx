import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Austria",
  "slug": "austria",
  "iso3": "AUT",
  "region": "Europe",
  "rank2026": 29,
  "flagEmoji": "🇦🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Singapore",
      "slug": "singapore",
      "rank": 28
    },
    {
      "name": "United Arab Emirates",
      "slug": "united-arab-emirates",
      "rank": 30
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 80.481,
      "growth": 2.3,
      "perCapita": 10673.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 69.738,
      "growth": -0.1,
      "perCapita": 9229.9,
      "popChangePct": 0.21
    },
    {
      "year": 1982,
      "gdp": 69.727,
      "growth": 1.9,
      "perCapita": 9216.9,
      "popChangePct": 0.12
    },
    {
      "year": 1983,
      "gdp": 70.644,
      "growth": 2.8,
      "perCapita": 9365.7,
      "popChangePct": -0.29
    },
    {
      "year": 1984,
      "gdp": 66.64,
      "growth": 0.3,
      "perCapita": 8834.0,
      "popChangePct": 0.01
    },
    {
      "year": 1985,
      "gdp": 68.248,
      "growth": 2.2,
      "perCapita": 9041.0,
      "popChangePct": 0.07
    },
    {
      "year": 1986,
      "gdp": 96.842,
      "growth": 2.3,
      "perCapita": 12815.6,
      "popChangePct": 0.11
    },
    {
      "year": 1987,
      "gdp": 121.104,
      "growth": 1.7,
      "perCapita": 16005.0,
      "popChangePct": 0.13
    },
    {
      "year": 1988,
      "gdp": 132.86,
      "growth": 1,
      "perCapita": 17536.3,
      "popChangePct": 0.12
    },
    {
      "year": 1989,
      "gdp": 132.534,
      "growth": 3.9,
      "perCapita": 17451.8,
      "popChangePct": 0.24
    },
    {
      "year": 1990,
      "gdp": 165.953,
      "growth": 4.3,
      "perCapita": 21708.0,
      "popChangePct": 0.67
    },
    {
      "year": 1991,
      "gdp": 173.481,
      "growth": 3.4,
      "perCapita": 22498.1,
      "popChangePct": 0.86
    },
    {
      "year": 1992,
      "gdp": 194.436,
      "growth": 2.1,
      "perCapita": 24931.2,
      "popChangePct": 1.14
    },
    {
      "year": 1993,
      "gdp": 189.342,
      "growth": 0.5,
      "perCapita": 24020.5,
      "popChangePct": 1.08
    },
    {
      "year": 1994,
      "gdp": 202.854,
      "growth": 2.4,
      "perCapita": 25584.8,
      "popChangePct": 0.58
    },
    {
      "year": 1995,
      "gdp": 239.914,
      "growth": 2.7,
      "perCapita": 30184.4,
      "popChangePct": 0.24
    },
    {
      "year": 1996,
      "gdp": 236.044,
      "growth": 2.4,
      "perCapita": 29657.4,
      "popChangePct": 0.14
    },
    {
      "year": 1997,
      "gdp": 211.978,
      "growth": 2.1,
      "perCapita": 26603.6,
      "popChangePct": 0.11
    },
    {
      "year": 1998,
      "gdp": 217.363,
      "growth": 3.5,
      "perCapita": 27249.5,
      "popChangePct": 0.11
    },
    {
      "year": 1999,
      "gdp": 216.637,
      "growth": 3.8,
      "perCapita": 27105.6,
      "popChangePct": 0.19
    },
    {
      "year": 2000,
      "gdp": 196.268,
      "growth": 3.2,
      "perCapita": 24498.1,
      "popChangePct": 0.25
    },
    {
      "year": 2001,
      "gdp": 196.479,
      "growth": 1.3,
      "perCapita": 24430.7,
      "popChangePct": 0.37
    },
    {
      "year": 2002,
      "gdp": 212.687,
      "growth": 1.5,
      "perCapita": 26315.7,
      "popChangePct": 0.5
    },
    {
      "year": 2003,
      "gdp": 260.714,
      "growth": 1.1,
      "perCapita": 32114.6,
      "popChangePct": 0.45
    },
    {
      "year": 2004,
      "gdp": 299.075,
      "growth": 2.6,
      "perCapita": 36608.9,
      "popChangePct": 0.63
    },
    {
      "year": 2005,
      "gdp": 314.126,
      "growth": 2.3,
      "perCapita": 38190.3,
      "popChangePct": 0.69
    },
    {
      "year": 2006,
      "gdp": 333.924,
      "growth": 3.3,
      "perCapita": 40387.7,
      "popChangePct": 0.52
    },
    {
      "year": 2007,
      "gdp": 386.806,
      "growth": 3.8,
      "perCapita": 46630.1,
      "popChangePct": 0.33
    },
    {
      "year": 2008,
      "gdp": 429.187,
      "growth": 1.5,
      "perCapita": 51575.5,
      "popChangePct": 0.33
    },
    {
      "year": 2009,
      "gdp": 398.857,
      "growth": -3.6,
      "perCapita": 47816.0,
      "popChangePct": 0.23
    },
    {
      "year": 2010,
      "gdp": 390.146,
      "growth": 1.8,
      "perCapita": 46662.2,
      "popChangePct": 0.24
    },
    {
      "year": 2011,
      "gdp": 428.879,
      "growth": 2.9,
      "perCapita": 51126.9,
      "popChangePct": 0.33
    },
    {
      "year": 2012,
      "gdp": 407.008,
      "growth": 0.6,
      "perCapita": 48302.0,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdp": 426.587,
      "growth": -0.3,
      "perCapita": 50321.5,
      "popChangePct": 0.61
    },
    {
      "year": 2014,
      "gdp": 438.669,
      "growth": 0.8,
      "perCapita": 51342.7,
      "popChangePct": 0.79
    },
    {
      "year": 2015,
      "gdp": 379.584,
      "growth": 1.3,
      "perCapita": 43986.7,
      "popChangePct": 1.01
    },
    {
      "year": 2016,
      "gdp": 393.579,
      "growth": 2.1,
      "perCapita": 45032.9,
      "popChangePct": 1.27
    },
    {
      "year": 2017,
      "gdp": 414.78,
      "growth": 2.3,
      "perCapita": 47055.7,
      "popChangePct": 0.86
    },
    {
      "year": 2018,
      "gdp": 452.787,
      "growth": 2.5,
      "perCapita": 50963.2,
      "popChangePct": 0.79
    },
    {
      "year": 2019,
      "gdp": 443.033,
      "growth": 1.8,
      "perCapita": 50010.4,
      "popChangePct": -0.29
    },
    {
      "year": 2020,
      "gdp": 434.05,
      "growth": -6.3,
      "perCapita": 48764.2,
      "popChangePct": 0.47
    },
    {
      "year": 2021,
      "gdp": 480.786,
      "growth": 4.9,
      "perCapita": 53827.3,
      "popChangePct": 0.35
    },
    {
      "year": 2022,
      "gdp": 473.594,
      "growth": 5.3,
      "perCapita": 52748.8,
      "popChangePct": 0.52
    },
    {
      "year": 2023,
      "gdp": 516.82,
      "growth": -0.8,
      "perCapita": 56763.6,
      "popChangePct": 1.41
    },
    {
      "year": 2024,
      "gdp": 534.63,
      "growth": -0.7,
      "perCapita": 58373.3,
      "popChangePct": 0.59
    },
    {
      "year": 2025,
      "gdp": 579.928,
      "growth": 0.6,
      "perCapita": 63161.4,
      "popChangePct": 0.25
    },
    {
      "year": 2026,
      "gdp": 623.719,
      "growth": 0.7,
      "perCapita": 67761.2,
      "popChangePct": 0.25
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 644.693,
      "growth": 1,
      "perCapita": 69865.3,
      "popChangePct": 0.25
    },
    {
      "year": 2028,
      "gdp": 664.452,
      "growth": 1.3,
      "perCapita": 71805.4,
      "popChangePct": 0.28
    },
    {
      "year": 2029,
      "gdp": 686.014,
      "growth": 1.1,
      "perCapita": 73928.6,
      "popChangePct": 0.27
    },
    {
      "year": 2030,
      "gdp": 706.581,
      "growth": 0.8,
      "perCapita": 75932.4,
      "popChangePct": 0.28
    },
    {
      "year": 2031,
      "gdp": 727.089,
      "growth": 0.8,
      "perCapita": 77918.1,
      "popChangePct": 0.28
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 91.96,
      "perCapitaPPP": 12195.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 100.56,
      "perCapitaPPP": 13309.4,
      "perCapitaPPPChangePct": 9.13,
      "popChangePct": 0.21
    },
    {
      "year": 1982,
      "gdpPPP": 108.811,
      "perCapitaPPP": 14383.3,
      "perCapitaPPPChangePct": 8.07,
      "popChangePct": 0.12
    },
    {
      "year": 1983,
      "gdpPPP": 116.243,
      "perCapitaPPP": 15411.1,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": -0.29
    },
    {
      "year": 1984,
      "gdpPPP": 120.838,
      "perCapitaPPP": 16018.6,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 0.01
    },
    {
      "year": 1985,
      "gdpPPP": 127.456,
      "perCapitaPPP": 16884.5,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 0.07
    },
    {
      "year": 1986,
      "gdpPPP": 133.065,
      "perCapitaPPP": 17609.1,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 0.11
    },
    {
      "year": 1987,
      "gdpPPP": 138.654,
      "perCapitaPPP": 18324.3,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 0.13
    },
    {
      "year": 1988,
      "gdpPPP": 144.923,
      "perCapitaPPP": 19128.5,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 0.12
    },
    {
      "year": 1989,
      "gdpPPP": 156.46,
      "perCapitaPPP": 20602.3,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": 0.24
    },
    {
      "year": 1990,
      "gdpPPP": 169.369,
      "perCapitaPPP": 22154.8,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 0.67
    },
    {
      "year": 1991,
      "gdpPPP": 181.124,
      "perCapitaPPP": 23489.4,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 0.86
    },
    {
      "year": 1992,
      "gdpPPP": 189.13,
      "perCapitaPPP": 24250.9,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 1.14
    },
    {
      "year": 1993,
      "gdpPPP": 194.633,
      "perCapitaPPP": 24691.8,
      "perCapitaPPPChangePct": 1.82,
      "popChangePct": 1.08
    },
    {
      "year": 1994,
      "gdpPPP": 203.564,
      "perCapitaPPP": 25674.4,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 0.58
    },
    {
      "year": 1995,
      "gdpPPP": 213.377,
      "perCapitaPPP": 26845.7,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 0.24
    },
    {
      "year": 1996,
      "gdpPPP": 222.495,
      "perCapitaPPP": 27955.0,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 0.14
    },
    {
      "year": 1997,
      "gdpPPP": 231.188,
      "perCapitaPPP": 29014.4,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 0.11
    },
    {
      "year": 1998,
      "gdpPPP": 241.952,
      "perCapitaPPP": 30332.0,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 0.11
    },
    {
      "year": 1999,
      "gdpPPP": 254.607,
      "perCapitaPPP": 31856.4,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 0.19
    },
    {
      "year": 2000,
      "gdpPPP": 268.679,
      "perCapitaPPP": 33536.4,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 0.25
    },
    {
      "year": 2001,
      "gdpPPP": 278.347,
      "perCapitaPPP": 34610.4,
      "perCapitaPPPChangePct": 3.2,
      "popChangePct": 0.37
    },
    {
      "year": 2002,
      "gdpPPP": 286.868,
      "perCapitaPPP": 35494.2,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 0.5
    },
    {
      "year": 2003,
      "gdpPPP": 295.871,
      "perCapitaPPP": 36445.2,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 0.45
    },
    {
      "year": 2004,
      "gdpPPP": 311.621,
      "perCapitaPPP": 38144.7,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 0.63
    },
    {
      "year": 2005,
      "gdpPPP": 328.85,
      "perCapitaPPP": 39980.4,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.69
    },
    {
      "year": 2006,
      "gdpPPP": 350.074,
      "perCapitaPPP": 42341.1,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 0.52
    },
    {
      "year": 2007,
      "gdpPPP": 373.133,
      "perCapitaPPP": 44981.8,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 0.33
    },
    {
      "year": 2008,
      "gdpPPP": 385.848,
      "perCapitaPPP": 46367.4,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 0.33
    },
    {
      "year": 2009,
      "gdpPPP": 374.305,
      "perCapitaPPP": 44872.7,
      "perCapitaPPPChangePct": -3.22,
      "popChangePct": 0.23
    },
    {
      "year": 2010,
      "gdpPPP": 385.707,
      "perCapitaPPP": 46131.3,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 0.24
    },
    {
      "year": 2011,
      "gdpPPP": 405.19,
      "perCapitaPPP": 48302.8,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 0.33
    },
    {
      "year": 2012,
      "gdpPPP": 415.327,
      "perCapitaPPP": 49289.3,
      "perCapitaPPPChangePct": 2.04,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdpPPP": 421.337,
      "perCapitaPPP": 49702.2,
      "perCapitaPPPChangePct": 0.84,
      "popChangePct": 0.61
    },
    {
      "year": 2014,
      "gdpPPP": 431.916,
      "perCapitaPPP": 50552.3,
      "perCapitaPPPChangePct": 1.71,
      "popChangePct": 0.79
    },
    {
      "year": 2015,
      "gdpPPP": 441.606,
      "perCapitaPPP": 51173.9,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": 1.01
    },
    {
      "year": 2016,
      "gdpPPP": 455.241,
      "perCapitaPPP": 52088.2,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 1.27
    },
    {
      "year": 2017,
      "gdpPPP": 473.924,
      "perCapitaPPP": 53765.5,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 0.86
    },
    {
      "year": 2018,
      "gdpPPP": 500.696,
      "perCapitaPPP": 56355.6,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 0.79
    },
    {
      "year": 2019,
      "gdpPPP": 535.947,
      "perCapitaPPP": 60498.8,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": -0.29
    },
    {
      "year": 2020,
      "gdpPPP": 521.842,
      "perCapitaPPP": 58627.3,
      "perCapitaPPPChangePct": -3.09,
      "popChangePct": 0.47
    },
    {
      "year": 2021,
      "gdpPPP": 569.375,
      "perCapitaPPP": 63745.5,
      "perCapitaPPPChangePct": 8.73,
      "popChangePct": 0.35
    },
    {
      "year": 2022,
      "gdpPPP": 642.383,
      "perCapitaPPP": 71548.5,
      "perCapitaPPPChangePct": 12.24,
      "popChangePct": 0.52
    },
    {
      "year": 2023,
      "gdpPPP": 660.914,
      "perCapitaPPP": 72589.9,
      "perCapitaPPPChangePct": 1.46,
      "popChangePct": 1.41
    },
    {
      "year": 2024,
      "gdpPPP": 672.857,
      "perCapitaPPP": 73465.7,
      "perCapitaPPPChangePct": 1.21,
      "popChangePct": 0.59
    },
    {
      "year": 2025,
      "gdpPPP": 696.205,
      "perCapitaPPP": 75825.4,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 0.25
    },
    {
      "year": 2026,
      "gdpPPP": 721.033,
      "perCapitaPPP": 78333.6,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 0.25
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 744.265,
      "perCapitaPPP": 80655.8,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": 0.25
    },
    {
      "year": 2028,
      "gdpPPP": 766.46,
      "perCapitaPPP": 82829.2,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 0.28
    },
    {
      "year": 2029,
      "gdpPPP": 788.505,
      "perCapitaPPP": 84973.6,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 0.27
    },
    {
      "year": 2030,
      "gdpPPP": 809.657,
      "perCapitaPPP": 87009.4,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 0.28
    },
    {
      "year": 2031,
      "gdpPPP": 830.743,
      "perCapitaPPP": 89026.2,
      "perCapitaPPPChangePct": 2.32,
      "popChangePct": 0.28
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AustriaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
