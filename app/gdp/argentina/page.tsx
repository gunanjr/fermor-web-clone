import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Argentina",
  "slug": "argentina",
  "iso3": "ARG",
  "region": "Americas",
  "rank2026": 27,
  "flagEmoji": "🇦🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Israel",
      "slug": "israel",
      "rank": 26
    },
    {
      "name": "Singapore",
      "slug": "singapore",
      "rank": 28
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 233.696,
      "growth": 0.7,
      "perCapita": 8361.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 189.802,
      "growth": -5.7,
      "perCapita": 6671.4,
      "popChangePct": 1.79
    },
    {
      "year": 1982,
      "gdp": 94.25,
      "growth": -3.1,
      "perCapita": 3257.9,
      "popChangePct": 1.69
    },
    {
      "year": 1983,
      "gdp": 116.267,
      "growth": 3.7,
      "perCapita": 3962.7,
      "popChangePct": 1.42
    },
    {
      "year": 1984,
      "gdp": 130.544,
      "growth": 2,
      "perCapita": 4374.8,
      "popChangePct": 1.7
    },
    {
      "year": 1985,
      "gdp": 98.599,
      "growth": -7,
      "perCapita": 3248.7,
      "popChangePct": 1.71
    },
    {
      "year": 1986,
      "gdp": 118.565,
      "growth": 7.1,
      "perCapita": 3857.0,
      "popChangePct": 1.29
    },
    {
      "year": 1987,
      "gdp": 121.561,
      "growth": 2.5,
      "perCapita": 3910.0,
      "popChangePct": 1.14
    },
    {
      "year": 1988,
      "gdp": 142.386,
      "growth": -2,
      "perCapita": 4524.5,
      "popChangePct": 1.22
    },
    {
      "year": 1989,
      "gdp": 91.352,
      "growth": -7,
      "perCapita": 2867.3,
      "popChangePct": 1.24
    },
    {
      "year": 1990,
      "gdp": 158.024,
      "growth": -1.3,
      "perCapita": 4857.8,
      "popChangePct": 2.1
    },
    {
      "year": 1991,
      "gdp": 211.979,
      "growth": 10.5,
      "perCapita": 6429.5,
      "popChangePct": 1.35
    },
    {
      "year": 1992,
      "gdp": 255.787,
      "growth": 10.3,
      "perCapita": 7653.7,
      "popChangePct": 1.36
    },
    {
      "year": 1993,
      "gdp": 264.429,
      "growth": 6.3,
      "perCapita": 7796.2,
      "popChangePct": 1.49
    },
    {
      "year": 1994,
      "gdp": 287.835,
      "growth": 5.8,
      "perCapita": 8378.7,
      "popChangePct": 1.29
    },
    {
      "year": 1995,
      "gdp": 288.497,
      "growth": -2.8,
      "perCapita": 8295.1,
      "popChangePct": 1.24
    },
    {
      "year": 1996,
      "gdp": 304.282,
      "growth": 5.5,
      "perCapita": 8645.5,
      "popChangePct": 1.2
    },
    {
      "year": 1997,
      "gdp": 327.436,
      "growth": 8.1,
      "perCapita": 9196.5,
      "popChangePct": 1.16
    },
    {
      "year": 1998,
      "gdp": 334.244,
      "growth": 3.9,
      "perCapita": 9283.2,
      "popChangePct": 1.13
    },
    {
      "year": 1999,
      "gdp": 316.998,
      "growth": -3.4,
      "perCapita": 8709.1,
      "popChangePct": 1.09
    },
    {
      "year": 2000,
      "gdp": 317.759,
      "growth": -0.8,
      "perCapita": 8638.5,
      "popChangePct": 1.06
    },
    {
      "year": 2001,
      "gdp": 300.421,
      "growth": -4.4,
      "perCapita": 8085.4,
      "popChangePct": 1.01
    },
    {
      "year": 2002,
      "gdp": 112.458,
      "growth": -10.9,
      "perCapita": 2997.6,
      "popChangePct": 0.97
    },
    {
      "year": 2003,
      "gdp": 142.431,
      "growth": 9,
      "perCapita": 3761.1,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdp": 164.911,
      "growth": 8.9,
      "perCapita": 4314.1,
      "popChangePct": 0.94
    },
    {
      "year": 2005,
      "gdp": 199.273,
      "growth": 8.9,
      "perCapita": 5163.6,
      "popChangePct": 0.96
    },
    {
      "year": 2006,
      "gdp": 232.892,
      "growth": 8,
      "perCapita": 5976.1,
      "popChangePct": 0.98
    },
    {
      "year": 2007,
      "gdp": 287.921,
      "growth": 9,
      "perCapita": 7315.7,
      "popChangePct": 0.99
    },
    {
      "year": 2008,
      "gdp": 363.545,
      "growth": 4.1,
      "perCapita": 9146.8,
      "popChangePct": 0.99
    },
    {
      "year": 2009,
      "gdp": 334.633,
      "growth": -5.9,
      "perCapita": 8337.8,
      "popChangePct": 0.98
    },
    {
      "year": 2010,
      "gdp": 424.729,
      "growth": 10.1,
      "perCapita": 10413.0,
      "popChangePct": 1.63
    },
    {
      "year": 2011,
      "gdp": 527.644,
      "growth": 6,
      "perCapita": 12787.8,
      "popChangePct": 1.16
    },
    {
      "year": 2012,
      "gdp": 579.666,
      "growth": -1,
      "perCapita": 13889.8,
      "popChangePct": 1.14
    },
    {
      "year": 2013,
      "gdp": 611.471,
      "growth": 2.4,
      "perCapita": 14488.8,
      "popChangePct": 1.13
    },
    {
      "year": 2014,
      "gdp": 563.614,
      "growth": -2.5,
      "perCapita": 13208.8,
      "popChangePct": 1.11
    },
    {
      "year": 2015,
      "gdp": 642.464,
      "growth": 2.7,
      "perCapita": 14895.3,
      "popChangePct": 1.08
    },
    {
      "year": 2016,
      "gdp": 556.774,
      "growth": -2.1,
      "perCapita": 12772.9,
      "popChangePct": 1.06
    },
    {
      "year": 2017,
      "gdp": 643.861,
      "growth": 2.8,
      "perCapita": 14618.3,
      "popChangePct": 1.04
    },
    {
      "year": 2018,
      "gdp": 524.431,
      "growth": -2.6,
      "perCapita": 11786.4,
      "popChangePct": 1.02
    },
    {
      "year": 2019,
      "gdp": 446.762,
      "growth": -2,
      "perCapita": 9941.6,
      "popChangePct": 1.0
    },
    {
      "year": 2020,
      "gdp": 385.218,
      "growth": -9.9,
      "perCapita": 8489.3,
      "popChangePct": 0.97
    },
    {
      "year": 2021,
      "gdp": 486.04,
      "growth": 10.4,
      "perCapita": 10610.2,
      "popChangePct": 0.95
    },
    {
      "year": 2022,
      "gdp": 633.52,
      "growth": 6,
      "perCapita": 13702.2,
      "popChangePct": 0.93
    },
    {
      "year": 2023,
      "gdp": 648.895,
      "growth": -1.9,
      "perCapita": 13908.5,
      "popChangePct": 0.91
    },
    {
      "year": 2024,
      "gdp": 637.234,
      "growth": -1.3,
      "perCapita": 13538.7,
      "popChangePct": 0.89
    },
    {
      "year": 2025,
      "gdp": 681.485,
      "growth": 4.4,
      "perCapita": 14355.0,
      "popChangePct": 0.86
    },
    {
      "year": 2026,
      "gdp": 688.378,
      "growth": 3.5,
      "perCapita": 14356.6,
      "popChangePct": 1.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 703.668,
      "growth": 4,
      "perCapita": 14530.2,
      "popChangePct": 1.0
    },
    {
      "year": 2028,
      "gdp": 746.843,
      "growth": 3.8,
      "perCapita": 15269.0,
      "popChangePct": 1.0
    },
    {
      "year": 2029,
      "gdp": 789.967,
      "growth": 3.5,
      "perCapita": 15990.8,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdp": 833.284,
      "growth": 3.2,
      "perCapita": 16700.6,
      "popChangePct": 1.0
    },
    {
      "year": 2031,
      "gdp": 878.051,
      "growth": 3,
      "perCapita": 17423.6,
      "popChangePct": 1.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 200.626,
      "perCapitaPPP": 7178.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 206.994,
      "perCapitaPPP": 7275.7,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 1.79
    },
    {
      "year": 1982,
      "gdpPPP": 212.865,
      "perCapitaPPP": 7357.9,
      "perCapitaPPPChangePct": 1.13,
      "popChangePct": 1.69
    },
    {
      "year": 1983,
      "gdpPPP": 229.459,
      "perCapitaPPP": 7820.7,
      "perCapitaPPPChangePct": 6.29,
      "popChangePct": 1.42
    },
    {
      "year": 1984,
      "gdpPPP": 242.496,
      "perCapitaPPP": 8126.5,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 1.7
    },
    {
      "year": 1985,
      "gdpPPP": 232.774,
      "perCapitaPPP": 7669.7,
      "perCapitaPPPChangePct": -5.62,
      "popChangePct": 1.71
    },
    {
      "year": 1986,
      "gdpPPP": 254.429,
      "perCapitaPPP": 8276.8,
      "perCapitaPPPChangePct": 7.92,
      "popChangePct": 1.29
    },
    {
      "year": 1987,
      "gdpPPP": 267.327,
      "perCapitaPPP": 8598.5,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.14
    },
    {
      "year": 1988,
      "gdpPPP": 271.34,
      "perCapitaPPP": 8622.2,
      "perCapitaPPPChangePct": 0.28,
      "popChangePct": 1.22
    },
    {
      "year": 1989,
      "gdpPPP": 262.222,
      "perCapitaPPP": 8230.4,
      "perCapitaPPPChangePct": -4.54,
      "popChangePct": 1.24
    },
    {
      "year": 1990,
      "gdpPPP": 268.397,
      "perCapitaPPP": 8250.7,
      "perCapitaPPPChangePct": 0.25,
      "popChangePct": 2.1
    },
    {
      "year": 1991,
      "gdpPPP": 306.605,
      "perCapitaPPP": 9299.5,
      "perCapitaPPPChangePct": 12.71,
      "popChangePct": 1.35
    },
    {
      "year": 1992,
      "gdpPPP": 345.89,
      "perCapitaPPP": 10349.8,
      "perCapitaPPPChangePct": 11.29,
      "popChangePct": 1.36
    },
    {
      "year": 1993,
      "gdpPPP": 376.221,
      "perCapitaPPP": 11092.3,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 1.49
    },
    {
      "year": 1994,
      "gdpPPP": 406.656,
      "perCapitaPPP": 11837.5,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": 1.29
    },
    {
      "year": 1995,
      "gdpPPP": 403.369,
      "perCapitaPPP": 11598.0,
      "perCapitaPPPChangePct": -2.02,
      "popChangePct": 1.24
    },
    {
      "year": 1996,
      "gdpPPP": 433.455,
      "perCapitaPPP": 12315.6,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 1.2
    },
    {
      "year": 1997,
      "gdpPPP": 476.692,
      "perCapitaPPP": 13388.6,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": 1.16
    },
    {
      "year": 1998,
      "gdpPPP": 500.611,
      "perCapitaPPP": 13903.8,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 1.13
    },
    {
      "year": 1999,
      "gdpPPP": 490.507,
      "perCapitaPPP": 13476.0,
      "perCapitaPPPChangePct": -3.08,
      "popChangePct": 1.09
    },
    {
      "year": 2000,
      "gdpPPP": 497.66,
      "perCapitaPPP": 13529.3,
      "perCapitaPPPChangePct": 0.4,
      "popChangePct": 1.06
    },
    {
      "year": 2001,
      "gdpPPP": 486.43,
      "perCapitaPPP": 13091.5,
      "perCapitaPPPChangePct": -3.24,
      "popChangePct": 1.01
    },
    {
      "year": 2002,
      "gdpPPP": 440.172,
      "perCapitaPPP": 11733.0,
      "perCapitaPPPChangePct": -10.38,
      "popChangePct": 0.97
    },
    {
      "year": 2003,
      "gdpPPP": 489.059,
      "perCapitaPPP": 12914.2,
      "perCapitaPPPChangePct": 10.07,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdpPPP": 546.962,
      "perCapitaPPP": 14308.6,
      "perCapitaPPPChangePct": 10.8,
      "popChangePct": 0.94
    },
    {
      "year": 2005,
      "gdpPPP": 614.047,
      "perCapitaPPP": 15911.2,
      "perCapitaPPPChangePct": 11.2,
      "popChangePct": 0.96
    },
    {
      "year": 2006,
      "gdpPPP": 683.921,
      "perCapitaPPP": 17549.7,
      "perCapitaPPPChangePct": 10.3,
      "popChangePct": 0.98
    },
    {
      "year": 2007,
      "gdpPPP": 765.725,
      "perCapitaPPP": 19456.2,
      "perCapitaPPPChangePct": 10.86,
      "popChangePct": 0.99
    },
    {
      "year": 2008,
      "gdpPPP": 812.141,
      "perCapitaPPP": 20433.5,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 0.99
    },
    {
      "year": 2009,
      "gdpPPP": 768.787,
      "perCapitaPPP": 19155.3,
      "perCapitaPPPChangePct": -6.26,
      "popChangePct": 0.98
    },
    {
      "year": 2010,
      "gdpPPP": 856.919,
      "perCapitaPPP": 21008.9,
      "perCapitaPPPChangePct": 9.68,
      "popChangePct": 1.63
    },
    {
      "year": 2011,
      "gdpPPP": 927.11,
      "perCapitaPPP": 22469.1,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 1.16
    },
    {
      "year": 2012,
      "gdpPPP": 934.679,
      "perCapitaPPP": 22396.5,
      "perCapitaPPPChangePct": -0.32,
      "popChangePct": 1.14
    },
    {
      "year": 2013,
      "gdpPPP": 973.452,
      "perCapitaPPP": 23066.0,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 1.13
    },
    {
      "year": 2014,
      "gdpPPP": 965.522,
      "perCapitaPPP": 22627.9,
      "perCapitaPPPChangePct": -1.9,
      "popChangePct": 1.11
    },
    {
      "year": 2015,
      "gdpPPP": 1001.097,
      "perCapitaPPP": 23210.1,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 1.08
    },
    {
      "year": 2016,
      "gdpPPP": 989.586,
      "perCapitaPPP": 22701.9,
      "perCapitaPPPChangePct": -2.19,
      "popChangePct": 1.06
    },
    {
      "year": 2017,
      "gdpPPP": 1035.699,
      "perCapitaPPP": 23514.7,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 1.04
    },
    {
      "year": 2018,
      "gdpPPP": 1090.043,
      "perCapitaPPP": 24498.4,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 1.02
    },
    {
      "year": 2019,
      "gdpPPP": 1057.633,
      "perCapitaPPP": 23535.0,
      "perCapitaPPPChangePct": -3.93,
      "popChangePct": 1.0
    },
    {
      "year": 2020,
      "gdpPPP": 1011.999,
      "perCapitaPPP": 22302.2,
      "perCapitaPPPChangePct": -5.24,
      "popChangePct": 0.97
    },
    {
      "year": 2021,
      "gdpPPP": 1191.725,
      "perCapitaPPP": 26015.2,
      "perCapitaPPPChangePct": 16.65,
      "popChangePct": 0.95
    },
    {
      "year": 2022,
      "gdpPPP": 1353.34,
      "perCapitaPPP": 29271.0,
      "perCapitaPPPChangePct": 12.51,
      "popChangePct": 0.93
    },
    {
      "year": 2023,
      "gdpPPP": 1377.369,
      "perCapitaPPP": 29522.7,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 0.91
    },
    {
      "year": 2024,
      "gdpPPP": 1392.607,
      "perCapitaPPP": 29587.4,
      "perCapitaPPPChangePct": 0.22,
      "popChangePct": 0.89
    },
    {
      "year": 2025,
      "gdpPPP": 1494.657,
      "perCapitaPPP": 31483.9,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 0.86
    },
    {
      "year": 2026,
      "gdpPPP": 1591.288,
      "perCapitaPPP": 33187.5,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 1.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1691.335,
      "perCapitaPPP": 34924.7,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 1.0
    },
    {
      "year": 2028,
      "gdpPPP": 1783.87,
      "perCapitaPPP": 36470.8,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 1.0
    },
    {
      "year": 2029,
      "gdpPPP": 1879.808,
      "perCapitaPPP": 38051.7,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdpPPP": 1974.667,
      "perCapitaPPP": 39576.1,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.0
    },
    {
      "year": 2031,
      "gdpPPP": 2071.426,
      "perCapitaPPP": 41104.3,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 1.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ArgentinaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
