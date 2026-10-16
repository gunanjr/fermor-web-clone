import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Guinea",
  "slug": "guinea",
  "iso3": "GIN",
  "region": "Africa",
  "rank2026": 123,
  "flagEmoji": "🇬🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Malta",
      "slug": "malta",
      "rank": 122
    },
    {
      "name": "Mongolia",
      "slug": "mongolia",
      "rank": 124
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.4,
      "growth": 2.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.381,
      "growth": 0.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 2.335,
      "growth": 1.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdp": 2.284,
      "growth": 1.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdp": 2.327,
      "growth": 1.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdp": 2.473,
      "growth": 5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 2.675,
      "growth": 3.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 2.84,
      "growth": 3.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdp": 3.317,
      "growth": 6.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdp": 3.384,
      "growth": 4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 3.71,
      "growth": 4.3,
      "perCapita": 616.3,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 4.195,
      "growth": 2.5,
      "perCapita": 660.4,
      "popChangePct": 5.51
    },
    {
      "year": 1992,
      "gdp": 4.57,
      "growth": 3.3,
      "perCapita": 678.6,
      "popChangePct": 6.01
    },
    {
      "year": 1993,
      "gdp": 4.562,
      "growth": 5,
      "perCapita": 639.3,
      "popChangePct": 5.97
    },
    {
      "year": 1994,
      "gdp": 4.707,
      "growth": 4,
      "perCapita": 626.4,
      "popChangePct": 5.3
    },
    {
      "year": 1995,
      "gdp": 5.139,
      "growth": 4.7,
      "perCapita": 655.7,
      "popChangePct": 4.3
    },
    {
      "year": 1996,
      "gdp": 5.316,
      "growth": 4.5,
      "perCapita": 656.7,
      "popChangePct": 3.29
    },
    {
      "year": 1997,
      "gdp": 5.212,
      "growth": 5.2,
      "perCapita": 628.2,
      "popChangePct": 2.48
    },
    {
      "year": 1998,
      "gdp": 5.003,
      "growth": 3.6,
      "perCapita": 591.5,
      "popChangePct": 1.94
    },
    {
      "year": 1999,
      "gdp": 4.798,
      "growth": 3.8,
      "perCapita": 557.8,
      "popChangePct": 1.7
    },
    {
      "year": 2000,
      "gdp": 4.039,
      "growth": 2.5,
      "perCapita": 461.8,
      "popChangePct": 1.69
    },
    {
      "year": 2001,
      "gdp": 3.806,
      "growth": 3.7,
      "perCapita": 427.9,
      "popChangePct": 1.7
    },
    {
      "year": 2002,
      "gdp": 4.022,
      "growth": 5.2,
      "perCapita": 444.7,
      "popChangePct": 1.7
    },
    {
      "year": 2003,
      "gdp": 4.759,
      "growth": 1.2,
      "perCapita": 517.0,
      "popChangePct": 1.76
    },
    {
      "year": 2004,
      "gdp": 5.012,
      "growth": 2.3,
      "perCapita": 534.3,
      "popChangePct": 1.9
    },
    {
      "year": 2005,
      "gdp": 4.506,
      "growth": 3,
      "perCapita": 470.6,
      "popChangePct": 2.09
    },
    {
      "year": 2006,
      "gdp": 4.178,
      "growth": 2.5,
      "perCapita": 426.4,
      "popChangePct": 2.33
    },
    {
      "year": 2007,
      "gdp": 6.317,
      "growth": 6.5,
      "perCapita": 628.7,
      "popChangePct": 2.53
    },
    {
      "year": 2008,
      "gdp": 6.966,
      "growth": 4.1,
      "perCapita": 675.4,
      "popChangePct": 2.67
    },
    {
      "year": 2009,
      "gdp": 6.753,
      "growth": -1.5,
      "perCapita": 637.5,
      "popChangePct": 2.7
    },
    {
      "year": 2010,
      "gdp": 6.858,
      "growth": 4.2,
      "perCapita": 630.5,
      "popChangePct": 2.67
    },
    {
      "year": 2011,
      "gdp": 6.775,
      "growth": 5.6,
      "perCapita": 607.0,
      "popChangePct": 2.63
    },
    {
      "year": 2012,
      "gdp": 7.387,
      "growth": 5.9,
      "perCapita": 645.1,
      "popChangePct": 2.59
    },
    {
      "year": 2013,
      "gdp": 8.376,
      "growth": 3.9,
      "perCapita": 713.1,
      "popChangePct": 2.57
    },
    {
      "year": 2014,
      "gdp": 8.777,
      "growth": 3.7,
      "perCapita": 728.7,
      "popChangePct": 2.55
    },
    {
      "year": 2015,
      "gdp": 8.79,
      "growth": 3.8,
      "perCapita": 712.0,
      "popChangePct": 2.5
    },
    {
      "year": 2016,
      "gdp": 8.604,
      "growth": 10.8,
      "perCapita": 680.0,
      "popChangePct": 2.5
    },
    {
      "year": 2017,
      "gdp": 10.325,
      "growth": 10.3,
      "perCapita": 796.0,
      "popChangePct": 2.5
    },
    {
      "year": 2018,
      "gdp": 11.857,
      "growth": 6.4,
      "perCapita": 891.9,
      "popChangePct": 2.5
    },
    {
      "year": 2019,
      "gdp": 13.443,
      "growth": 5.6,
      "perCapita": 986.5,
      "popChangePct": 2.5
    },
    {
      "year": 2020,
      "gdp": 14.089,
      "growth": 4.7,
      "perCapita": 1008.7,
      "popChangePct": 2.5
    },
    {
      "year": 2021,
      "gdp": 16.32,
      "growth": 5.6,
      "perCapita": 1140.0,
      "popChangePct": 2.51
    },
    {
      "year": 2022,
      "gdp": 19.589,
      "growth": 4,
      "perCapita": 1334.9,
      "popChangePct": 2.49
    },
    {
      "year": 2023,
      "gdp": 22.089,
      "growth": 6.2,
      "perCapita": 1468.6,
      "popChangePct": 2.5
    },
    {
      "year": 2024,
      "gdp": 24.233,
      "growth": 6.1,
      "perCapita": 1571.8,
      "popChangePct": 2.5
    },
    {
      "year": 2025,
      "gdp": 27.215,
      "growth": 6.7,
      "perCapita": 1722.2,
      "popChangePct": 2.5
    },
    {
      "year": 2026,
      "gdp": 29.93,
      "growth": 8.7,
      "perCapita": 1847.8,
      "popChangePct": 2.5
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 32.898,
      "growth": 9.3,
      "perCapita": 1981.4,
      "popChangePct": 2.5
    },
    {
      "year": 2028,
      "gdp": 36.242,
      "growth": 9.8,
      "perCapita": 2129.6,
      "popChangePct": 2.5
    },
    {
      "year": 2029,
      "gdp": 40.102,
      "growth": 10.2,
      "perCapita": 2299.0,
      "popChangePct": 2.5
    },
    {
      "year": 2030,
      "gdp": 43.877,
      "growth": 8.5,
      "perCapita": 2454.0,
      "popChangePct": 2.5
    },
    {
      "year": 2031,
      "gdp": 47.534,
      "growth": 7.2,
      "perCapita": 2593.7,
      "popChangePct": 2.5
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 3.169,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.49,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 3.772,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdpPPP": 3.971,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdpPPP": 4.172,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdpPPP": 4.519,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 4.753,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdpPPP": 5.032,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdpPPP": 5.538,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdpPPP": 5.986,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdpPPP": 6.478,
      "perCapitaPPP": 1076.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 6.864,
      "perCapitaPPP": 1080.7,
      "perCapitaPPPChangePct": 0.43,
      "popChangePct": 5.51
    },
    {
      "year": 1992,
      "gdpPPP": 7.251,
      "perCapitaPPP": 1076.7,
      "perCapitaPPPChangePct": -0.37,
      "popChangePct": 6.01
    },
    {
      "year": 1993,
      "gdpPPP": 7.797,
      "perCapitaPPP": 1092.6,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 5.97
    },
    {
      "year": 1994,
      "gdpPPP": 8.282,
      "perCapitaPPP": 1102.2,
      "perCapitaPPPChangePct": 0.88,
      "popChangePct": 5.3
    },
    {
      "year": 1995,
      "gdpPPP": 8.852,
      "perCapitaPPP": 1129.5,
      "perCapitaPPPChangePct": 2.47,
      "popChangePct": 4.3
    },
    {
      "year": 1996,
      "gdpPPP": 9.416,
      "perCapitaPPP": 1163.2,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 3.29
    },
    {
      "year": 1997,
      "gdpPPP": 10.075,
      "perCapitaPPP": 1214.3,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.48
    },
    {
      "year": 1998,
      "gdpPPP": 10.559,
      "perCapitaPPP": 1248.5,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 1.94
    },
    {
      "year": 1999,
      "gdpPPP": 11.117,
      "perCapitaPPP": 1292.5,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 1.7
    },
    {
      "year": 2000,
      "gdpPPP": 11.653,
      "perCapitaPPP": 1332.4,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.69
    },
    {
      "year": 2001,
      "gdpPPP": 12.351,
      "perCapitaPPP": 1388.5,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 1.7
    },
    {
      "year": 2002,
      "gdpPPP": 13.191,
      "perCapitaPPP": 1458.3,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 1.7
    },
    {
      "year": 2003,
      "gdpPPP": 13.62,
      "perCapitaPPP": 1479.7,
      "perCapitaPPPChangePct": 1.47,
      "popChangePct": 1.76
    },
    {
      "year": 2004,
      "gdpPPP": 14.313,
      "perCapitaPPP": 1526.0,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 1.9
    },
    {
      "year": 2005,
      "gdpPPP": 15.204,
      "perCapitaPPP": 1587.7,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 2.09
    },
    {
      "year": 2006,
      "gdpPPP": 16.065,
      "perCapitaPPP": 1639.4,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 2.33
    },
    {
      "year": 2007,
      "gdpPPP": 17.574,
      "perCapitaPPP": 1749.2,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 2.53
    },
    {
      "year": 2008,
      "gdpPPP": 18.655,
      "perCapitaPPP": 1808.6,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 2.67
    },
    {
      "year": 2009,
      "gdpPPP": 18.481,
      "perCapitaPPP": 1744.6,
      "perCapitaPPPChangePct": -3.54,
      "popChangePct": 2.7
    },
    {
      "year": 2010,
      "gdpPPP": 19.495,
      "perCapitaPPP": 1792.5,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 2.67
    },
    {
      "year": 2011,
      "gdpPPP": 21.014,
      "perCapitaPPP": 1882.7,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 2.63
    },
    {
      "year": 2012,
      "gdpPPP": 22.671,
      "perCapitaPPP": 1979.8,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 2.59
    },
    {
      "year": 2013,
      "gdpPPP": 23.967,
      "perCapitaPPP": 2040.6,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 2.57
    },
    {
      "year": 2014,
      "gdpPPP": 25.286,
      "perCapitaPPP": 2099.4,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 2.55
    },
    {
      "year": 2015,
      "gdpPPP": 26.497,
      "perCapitaPPP": 2146.3,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 2.5
    },
    {
      "year": 2016,
      "gdpPPP": 29.643,
      "perCapitaPPP": 2342.6,
      "perCapitaPPPChangePct": 9.15,
      "popChangePct": 2.5
    },
    {
      "year": 2017,
      "gdpPPP": 33.281,
      "perCapitaPPP": 2566.0,
      "perCapitaPPPChangePct": 9.54,
      "popChangePct": 2.5
    },
    {
      "year": 2018,
      "gdpPPP": 36.138,
      "perCapitaPPP": 2718.3,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": 2.5
    },
    {
      "year": 2019,
      "gdpPPP": 40.482,
      "perCapitaPPP": 2970.8,
      "perCapitaPPPChangePct": 9.29,
      "popChangePct": 2.5
    },
    {
      "year": 2020,
      "gdpPPP": 44.551,
      "perCapitaPPP": 3189.6,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": 2.5
    },
    {
      "year": 2021,
      "gdpPPP": 51.261,
      "perCapitaPPP": 3580.5,
      "perCapitaPPPChangePct": 12.25,
      "popChangePct": 2.51
    },
    {
      "year": 2022,
      "gdpPPP": 57.088,
      "perCapitaPPP": 3890.3,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": 2.49
    },
    {
      "year": 2023,
      "gdpPPP": 62.895,
      "perCapitaPPP": 4181.5,
      "perCapitaPPPChangePct": 7.49,
      "popChangePct": 2.5
    },
    {
      "year": 2024,
      "gdpPPP": 68.371,
      "perCapitaPPP": 4434.7,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 2.5
    },
    {
      "year": 2025,
      "gdpPPP": 75.012,
      "perCapitaPPP": 4746.8,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": 2.5
    },
    {
      "year": 2026,
      "gdpPPP": 83.856,
      "perCapitaPPP": 5177.0,
      "perCapitaPPPChangePct": 9.06,
      "popChangePct": 2.5
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 93.695,
      "perCapitaPPP": 5643.3,
      "perCapitaPPPChangePct": 9.01,
      "popChangePct": 2.5
    },
    {
      "year": 2028,
      "gdpPPP": 104.601,
      "perCapitaPPP": 6146.5,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 2.5
    },
    {
      "year": 2029,
      "gdpPPP": 117.347,
      "perCapitaPPP": 6727.4,
      "perCapitaPPPChangePct": 9.45,
      "popChangePct": 2.5
    },
    {
      "year": 2030,
      "gdpPPP": 129.679,
      "perCapitaPPP": 7253.0,
      "perCapitaPPPChangePct": 7.81,
      "popChangePct": 2.5
    },
    {
      "year": 2031,
      "gdpPPP": 141.585,
      "perCapitaPPP": 7725.7,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 2.5
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GuineaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
