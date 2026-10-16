import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Singapore",
  "slug": "singapore",
  "iso3": "SGP",
  "region": "Asia",
  "rank2026": 28,
  "flagEmoji": "🇸🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Argentina",
      "slug": "argentina",
      "rank": 27
    },
    {
      "name": "Austria",
      "slug": "austria",
      "rank": 29
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 12.082,
      "growth": 10.1,
      "perCapita": 5005.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 14.367,
      "growth": 10.8,
      "perCapita": 5672.1,
      "popChangePct": 4.93
    },
    {
      "year": 1982,
      "gdp": 15.879,
      "growth": 7.1,
      "perCapita": 6000.0,
      "popChangePct": 4.46
    },
    {
      "year": 1983,
      "gdp": 18.011,
      "growth": 8.6,
      "perCapita": 6717.8,
      "popChangePct": 1.32
    },
    {
      "year": 1984,
      "gdp": 19.563,
      "growth": 8.8,
      "perCapita": 7160.3,
      "popChangePct": 1.9
    },
    {
      "year": 1985,
      "gdp": 18.573,
      "growth": -0.6,
      "perCapita": 6788.4,
      "popChangePct": 0.15
    },
    {
      "year": 1986,
      "gdp": 18.78,
      "growth": 1.3,
      "perCapita": 6870.8,
      "popChangePct": -0.11
    },
    {
      "year": 1987,
      "gdp": 21.629,
      "growth": 10.8,
      "perCapita": 7794.7,
      "popChangePct": 1.54
    },
    {
      "year": 1988,
      "gdp": 26.551,
      "growth": 11.3,
      "perCapita": 9329.0,
      "popChangePct": 2.56
    },
    {
      "year": 1989,
      "gdp": 31.436,
      "growth": 10.2,
      "perCapita": 10725.7,
      "popChangePct": 2.99
    },
    {
      "year": 1990,
      "gdp": 38.892,
      "growth": 9.8,
      "perCapita": 12763.3,
      "popChangePct": 3.96
    },
    {
      "year": 1991,
      "gdp": 45.465,
      "growth": 6.7,
      "perCapita": 14502.0,
      "popChangePct": 2.89
    },
    {
      "year": 1992,
      "gdp": 52.131,
      "growth": 6.6,
      "perCapita": 16136.2,
      "popChangePct": 3.06
    },
    {
      "year": 1993,
      "gdp": 60.604,
      "growth": 11.5,
      "perCapita": 18290.1,
      "popChangePct": 2.54
    },
    {
      "year": 1994,
      "gdp": 73.689,
      "growth": 11.1,
      "perCapita": 21552.4,
      "popChangePct": 3.2
    },
    {
      "year": 1995,
      "gdp": 87.813,
      "growth": 7.2,
      "perCapita": 24914.9,
      "popChangePct": 3.1
    },
    {
      "year": 1996,
      "gdp": 96.293,
      "growth": 7.5,
      "perCapita": 26232.9,
      "popChangePct": 4.14
    },
    {
      "year": 1997,
      "gdp": 100.124,
      "growth": 8.3,
      "perCapita": 26375.9,
      "popChangePct": 3.41
    },
    {
      "year": 1998,
      "gdp": 85.728,
      "growth": -2.2,
      "perCapita": 21829.3,
      "popChangePct": 3.45
    },
    {
      "year": 1999,
      "gdp": 86.287,
      "growth": 5.7,
      "perCapita": 21796.6,
      "popChangePct": 0.81
    },
    {
      "year": 2000,
      "gdp": 96.077,
      "growth": 9,
      "perCapita": 23852.8,
      "popChangePct": 1.74
    },
    {
      "year": 2001,
      "gdp": 89.794,
      "growth": -1.1,
      "perCapita": 21699.7,
      "popChangePct": 2.73
    },
    {
      "year": 2002,
      "gdp": 92.538,
      "growth": 3.9,
      "perCapita": 22159.8,
      "popChangePct": 0.92
    },
    {
      "year": 2003,
      "gdp": 97.646,
      "growth": 4.5,
      "perCapita": 23730.4,
      "popChangePct": -1.46
    },
    {
      "year": 2004,
      "gdp": 115.034,
      "growth": 9.9,
      "perCapita": 27608.1,
      "popChangePct": 1.26
    },
    {
      "year": 2005,
      "gdp": 127.808,
      "growth": 7.4,
      "perCapita": 29961.3,
      "popChangePct": 2.38
    },
    {
      "year": 2006,
      "gdp": 148.627,
      "growth": 9,
      "perCapita": 33768.4,
      "popChangePct": 3.16
    },
    {
      "year": 2007,
      "gdp": 180.942,
      "growth": 9,
      "perCapita": 39432.9,
      "popChangePct": 4.27
    },
    {
      "year": 2008,
      "gdp": 193.617,
      "growth": 1.9,
      "perCapita": 40008.6,
      "popChangePct": 5.45
    },
    {
      "year": 2009,
      "gdp": 194.15,
      "growth": 0.1,
      "perCapita": 38926.8,
      "popChangePct": 3.08
    },
    {
      "year": 2010,
      "gdp": 239.808,
      "growth": 14.5,
      "perCapita": 47236.7,
      "popChangePct": 1.78
    },
    {
      "year": 2011,
      "gdp": 279.357,
      "growth": 6.2,
      "perCapita": 53891.5,
      "popChangePct": 2.11
    },
    {
      "year": 2012,
      "gdp": 295.093,
      "growth": 4.4,
      "perCapita": 55547.5,
      "popChangePct": 2.47
    },
    {
      "year": 2013,
      "gdp": 307.576,
      "growth": 4.8,
      "perCapita": 56967.4,
      "popChangePct": 1.64
    },
    {
      "year": 2014,
      "gdp": 314.864,
      "growth": 3.9,
      "perCapita": 57564.8,
      "popChangePct": 1.32
    },
    {
      "year": 2015,
      "gdp": 307.999,
      "growth": 3,
      "perCapita": 55645.6,
      "popChangePct": 1.19
    },
    {
      "year": 2016,
      "gdp": 320.759,
      "growth": 3.9,
      "perCapita": 57204.0,
      "popChangePct": 1.3
    },
    {
      "year": 2017,
      "gdp": 344.795,
      "growth": 4.3,
      "perCapita": 61436.1,
      "popChangePct": 0.09
    },
    {
      "year": 2018,
      "gdp": 377.976,
      "growth": 3.2,
      "perCapita": 67032.8,
      "popChangePct": 0.48
    },
    {
      "year": 2019,
      "gdp": 376.827,
      "growth": 1.2,
      "perCapita": 66068.7,
      "popChangePct": 1.15
    },
    {
      "year": 2020,
      "gdp": 351.227,
      "growth": -3.6,
      "perCapita": 61772.5,
      "popChangePct": -0.32
    },
    {
      "year": 2021,
      "gdp": 441.111,
      "growth": 10.1,
      "perCapita": 80884.8,
      "popChangePct": -4.08
    },
    {
      "year": 2022,
      "gdp": 514.253,
      "growth": 4,
      "perCapita": 91227.7,
      "popChangePct": 3.36
    },
    {
      "year": 2023,
      "gdp": 511.182,
      "growth": 1.5,
      "perCapita": 86382.6,
      "popChangePct": 4.98
    },
    {
      "year": 2024,
      "gdp": 572.877,
      "growth": 5.3,
      "perCapita": 94896.5,
      "popChangePct": 2.01
    },
    {
      "year": 2025,
      "gdp": 603.87,
      "growth": 5,
      "perCapita": 99365.3,
      "popChangePct": 0.66
    },
    {
      "year": 2026,
      "gdp": 659.572,
      "growth": 3.5,
      "perCapita": 107758.0,
      "popChangePct": 0.72
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 691.369,
      "growth": 2.7,
      "perCapita": 112064.8,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdp": 722.229,
      "growth": 2.5,
      "perCapita": 116099.2,
      "popChangePct": 0.84
    },
    {
      "year": 2029,
      "gdp": 754.191,
      "growth": 2.5,
      "perCapita": 120383.0,
      "popChangePct": 0.71
    },
    {
      "year": 2030,
      "gdp": 787.73,
      "growth": 2.5,
      "perCapita": 124762.5,
      "popChangePct": 0.78
    },
    {
      "year": 2031,
      "gdp": 822.674,
      "growth": 2.5,
      "perCapita": 129244.3,
      "popChangePct": 0.81
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 21.412,
      "perCapitaPPP": 8870.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 25.973,
      "perCapitaPPP": 10254.6,
      "perCapitaPPPChangePct": 15.61,
      "popChangePct": 4.93
    },
    {
      "year": 1982,
      "gdpPPP": 29.537,
      "perCapitaPPP": 11160.9,
      "perCapitaPPPChangePct": 8.84,
      "popChangePct": 4.46
    },
    {
      "year": 1983,
      "gdpPPP": 33.319,
      "perCapitaPPP": 12427.6,
      "perCapitaPPPChangePct": 11.35,
      "popChangePct": 1.32
    },
    {
      "year": 1984,
      "gdpPPP": 37.557,
      "perCapitaPPP": 13746.0,
      "perCapitaPPPChangePct": 10.61,
      "popChangePct": 1.9
    },
    {
      "year": 1985,
      "gdpPPP": 38.503,
      "perCapitaPPP": 14073.1,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 0.15
    },
    {
      "year": 1986,
      "gdpPPP": 39.806,
      "perCapitaPPP": 14563.0,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": -0.11
    },
    {
      "year": 1987,
      "gdpPPP": 45.197,
      "perCapitaPPP": 16288.5,
      "perCapitaPPPChangePct": 11.85,
      "popChangePct": 1.54
    },
    {
      "year": 1988,
      "gdpPPP": 52.062,
      "perCapitaPPP": 18292.2,
      "perCapitaPPPChangePct": 12.3,
      "popChangePct": 2.56
    },
    {
      "year": 1989,
      "gdpPPP": 59.599,
      "perCapitaPPP": 20334.8,
      "perCapitaPPPChangePct": 11.17,
      "popChangePct": 2.99
    },
    {
      "year": 1990,
      "gdpPPP": 67.902,
      "perCapitaPPP": 22283.9,
      "perCapitaPPPChangePct": 9.58,
      "popChangePct": 3.96
    },
    {
      "year": 1991,
      "gdpPPP": 74.894,
      "perCapitaPPP": 23889.0,
      "perCapitaPPPChangePct": 7.2,
      "popChangePct": 2.89
    },
    {
      "year": 1992,
      "gdpPPP": 81.687,
      "perCapitaPPP": 25284.6,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 3.06
    },
    {
      "year": 1993,
      "gdpPPP": 93.206,
      "perCapitaPPP": 28129.3,
      "perCapitaPPPChangePct": 11.25,
      "popChangePct": 2.54
    },
    {
      "year": 1994,
      "gdpPPP": 105.759,
      "perCapitaPPP": 30932.2,
      "perCapitaPPPChangePct": 9.96,
      "popChangePct": 3.2
    },
    {
      "year": 1995,
      "gdpPPP": 115.724,
      "perCapitaPPP": 32834.0,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 3.1
    },
    {
      "year": 1996,
      "gdpPPP": 126.647,
      "perCapitaPPP": 34502.1,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 4.14
    },
    {
      "year": 1997,
      "gdpPPP": 139.545,
      "perCapitaPPP": 36760.6,
      "perCapitaPPPChangePct": 6.55,
      "popChangePct": 3.41
    },
    {
      "year": 1998,
      "gdpPPP": 138.021,
      "perCapitaPPP": 35144.8,
      "perCapitaPPPChangePct": -4.4,
      "popChangePct": 3.45
    },
    {
      "year": 1999,
      "gdpPPP": 147.979,
      "perCapitaPPP": 37380.4,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 0.81
    },
    {
      "year": 2000,
      "gdpPPP": 165.008,
      "perCapitaPPP": 40966.5,
      "perCapitaPPPChangePct": 9.59,
      "popChangePct": 1.74
    },
    {
      "year": 2001,
      "gdpPPP": 166.917,
      "perCapitaPPP": 40337.4,
      "perCapitaPPPChangePct": -1.54,
      "popChangePct": 2.73
    },
    {
      "year": 2002,
      "gdpPPP": 176.161,
      "perCapitaPPP": 42184.7,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": 0.92
    },
    {
      "year": 2003,
      "gdpPPP": 187.81,
      "perCapitaPPP": 45642.2,
      "perCapitaPPPChangePct": 8.2,
      "popChangePct": -1.46
    },
    {
      "year": 2004,
      "gdpPPP": 212.03,
      "perCapitaPPP": 50887.2,
      "perCapitaPPPChangePct": 11.49,
      "popChangePct": 1.26
    },
    {
      "year": 2005,
      "gdpPPP": 234.787,
      "perCapitaPPP": 55039.9,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 2.38
    },
    {
      "year": 2006,
      "gdpPPP": 263.827,
      "perCapitaPPP": 59942.0,
      "perCapitaPPPChangePct": 8.91,
      "popChangePct": 3.16
    },
    {
      "year": 2007,
      "gdpPPP": 295.42,
      "perCapitaPPP": 64381.4,
      "perCapitaPPPChangePct": 7.41,
      "popChangePct": 4.27
    },
    {
      "year": 2008,
      "gdpPPP": 306.723,
      "perCapitaPPP": 63380.3,
      "perCapitaPPPChangePct": -1.55,
      "popChangePct": 5.45
    },
    {
      "year": 2009,
      "gdpPPP": 309.009,
      "perCapitaPPP": 61955.8,
      "perCapitaPPPChangePct": -2.25,
      "popChangePct": 3.08
    },
    {
      "year": 2010,
      "gdpPPP": 358.177,
      "perCapitaPPP": 70552.8,
      "perCapitaPPPChangePct": 13.88,
      "popChangePct": 1.78
    },
    {
      "year": 2011,
      "gdpPPP": 388.287,
      "perCapitaPPP": 74905.6,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 2.11
    },
    {
      "year": 2012,
      "gdpPPP": 413.06,
      "perCapitaPPP": 77753.4,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 2.47
    },
    {
      "year": 2013,
      "gdpPPP": 440.329,
      "perCapitaPPP": 81555.0,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 1.64
    },
    {
      "year": 2014,
      "gdpPPP": 465.629,
      "perCapitaPPP": 85128.5,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 1.32
    },
    {
      "year": 2015,
      "gdpPPP": 483.94,
      "perCapitaPPP": 87432.7,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 1.19
    },
    {
      "year": 2016,
      "gdpPPP": 507.645,
      "perCapitaPPP": 90533.2,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 1.3
    },
    {
      "year": 2017,
      "gdpPPP": 539.095,
      "perCapitaPPP": 96056.7,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 0.09
    },
    {
      "year": 2018,
      "gdpPPP": 587.541,
      "perCapitaPPP": 104198.4,
      "perCapitaPPPChangePct": 8.48,
      "popChangePct": 0.48
    },
    {
      "year": 2019,
      "gdpPPP": 601.85,
      "perCapitaPPP": 105521.6,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 1.15
    },
    {
      "year": 2020,
      "gdpPPP": 580.62,
      "perCapitaPPP": 102117.4,
      "perCapitaPPPChangePct": -3.23,
      "popChangePct": -0.32
    },
    {
      "year": 2021,
      "gdpPPP": 730.724,
      "perCapitaPPP": 133990.2,
      "perCapitaPPPChangePct": 31.21,
      "popChangePct": -4.08
    },
    {
      "year": 2022,
      "gdpPPP": 814.085,
      "perCapitaPPP": 144417.5,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": 3.36
    },
    {
      "year": 2023,
      "gdpPPP": 856.449,
      "perCapitaPPP": 144728.0,
      "perCapitaPPPChangePct": 0.21,
      "popChangePct": 4.98
    },
    {
      "year": 2024,
      "gdpPPP": 924.612,
      "perCapitaPPP": 153161.0,
      "perCapitaPPPChangePct": 5.83,
      "popChangePct": 2.01
    },
    {
      "year": 2025,
      "gdpPPP": 998.604,
      "perCapitaPPP": 164317.9,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 0.66
    },
    {
      "year": 2026,
      "gdpPPP": 1063.242,
      "perCapitaPPP": 173707.8,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 0.72
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1115.573,
      "perCapitaPPP": 180824.5,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdpPPP": 1162.433,
      "perCapitaPPP": 186862.3,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 0.84
    },
    {
      "year": 2029,
      "gdpPPP": 1212.517,
      "perCapitaPPP": 193540.3,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 0.71
    },
    {
      "year": 2030,
      "gdpPPP": 1265.756,
      "perCapitaPPP": 200473.5,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 0.78
    },
    {
      "year": 2031,
      "gdpPPP": 1320.824,
      "perCapitaPPP": 207505.1,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 0.81
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SingaporeGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
