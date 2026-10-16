import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Denmark",
  "slug": "denmark",
  "iso3": "DNK",
  "region": "Europe",
  "rank2026": 38,
  "flagEmoji": "🇩🇰",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bangladesh",
      "slug": "bangladesh",
      "rank": 37
    },
    {
      "name": "Romania",
      "slug": "romania",
      "rank": 39
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 70.811,
      "growth": -0.7,
      "perCapita": 13824.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 61.46,
      "growth": -0.7,
      "perCapita": 11994.6,
      "popChangePct": 0.04
    },
    {
      "year": 1982,
      "gdp": 60.084,
      "growth": 3.9,
      "perCapita": 11737.1,
      "popChangePct": -0.1
    },
    {
      "year": 1983,
      "gdp": 60.331,
      "growth": 2.6,
      "perCapita": 11791.6,
      "popChangePct": -0.06
    },
    {
      "year": 1984,
      "gdp": 58.869,
      "growth": 4.3,
      "perCapita": 11515.5,
      "popChangePct": -0.08
    },
    {
      "year": 1985,
      "gdp": 62.452,
      "growth": 4.2,
      "perCapita": 12219.0,
      "popChangePct": -0.02
    },
    {
      "year": 1986,
      "gdp": 87.749,
      "growth": 4.7,
      "perCapita": 17150.9,
      "popChangePct": 0.1
    },
    {
      "year": 1987,
      "gdp": 109.183,
      "growth": 0.5,
      "perCapita": 21304.9,
      "popChangePct": 0.18
    },
    {
      "year": 1988,
      "gdp": 115.54,
      "growth": 0.3,
      "perCapita": 22525.7,
      "popChangePct": 0.08
    },
    {
      "year": 1989,
      "gdp": 112.312,
      "growth": 0.7,
      "perCapita": 21894.2,
      "popChangePct": 0.02
    },
    {
      "year": 1990,
      "gdp": 138.219,
      "growth": 1.7,
      "perCapita": 26914.9,
      "popChangePct": 0.1
    },
    {
      "year": 1991,
      "gdp": 139.182,
      "growth": 1.5,
      "perCapita": 27044.1,
      "popChangePct": 0.21
    },
    {
      "year": 1992,
      "gdp": 152.966,
      "growth": 2,
      "perCapita": 29632.3,
      "popChangePct": 0.31
    },
    {
      "year": 1993,
      "gdp": 143.11,
      "growth": -0.1,
      "perCapita": 27624.2,
      "popChangePct": 0.37
    },
    {
      "year": 1994,
      "gdp": 156.019,
      "growth": 5.3,
      "perCapita": 30023.1,
      "popChangePct": 0.31
    },
    {
      "year": 1995,
      "gdp": 184.85,
      "growth": 3,
      "perCapita": 35440.9,
      "popChangePct": 0.37
    },
    {
      "year": 1996,
      "gdp": 187.482,
      "growth": 2.9,
      "perCapita": 35703.9,
      "popChangePct": 0.67
    },
    {
      "year": 1997,
      "gdp": 173.242,
      "growth": 3.2,
      "perCapita": 32841.4,
      "popChangePct": 0.46
    },
    {
      "year": 1998,
      "gdp": 176.876,
      "growth": 2.3,
      "perCapita": 33405.3,
      "popChangePct": 0.38
    },
    {
      "year": 1999,
      "gdp": 177.887,
      "growth": 3,
      "perCapita": 33477.8,
      "popChangePct": 0.36
    },
    {
      "year": 2000,
      "gdp": 164.043,
      "growth": 3.7,
      "perCapita": 30777.2,
      "popChangePct": 0.3
    },
    {
      "year": 2001,
      "gdp": 164.881,
      "growth": 1,
      "perCapita": 30823.5,
      "popChangePct": 0.36
    },
    {
      "year": 2002,
      "gdp": 178.788,
      "growth": 0.5,
      "perCapita": 33304.1,
      "popChangePct": 0.36
    },
    {
      "year": 2003,
      "gdp": 218.422,
      "growth": 0.4,
      "perCapita": 40572.4,
      "popChangePct": 0.3
    },
    {
      "year": 2004,
      "gdp": 251.988,
      "growth": 2.8,
      "perCapita": 46684.8,
      "popChangePct": 0.26
    },
    {
      "year": 2005,
      "gdp": 265.15,
      "growth": 2.4,
      "perCapita": 48998.3,
      "popChangePct": 0.24
    },
    {
      "year": 2006,
      "gdp": 283.387,
      "growth": 3.8,
      "perCapita": 52213.6,
      "popChangePct": 0.3
    },
    {
      "year": 2007,
      "gdp": 320.213,
      "growth": 1,
      "perCapita": 58786.1,
      "popChangePct": 0.37
    },
    {
      "year": 2008,
      "gdp": 354.977,
      "growth": -0.4,
      "perCapita": 64826.7,
      "popChangePct": 0.53
    },
    {
      "year": 2009,
      "gdp": 322.621,
      "growth": -5,
      "perCapita": 58536.6,
      "popChangePct": 0.64
    },
    {
      "year": 2010,
      "gdp": 322.346,
      "growth": 1.6,
      "perCapita": 58240.4,
      "popChangePct": 0.44
    },
    {
      "year": 2011,
      "gdp": 344.316,
      "growth": 1.3,
      "perCapita": 61920.3,
      "popChangePct": 0.47
    },
    {
      "year": 2012,
      "gdp": 326.793,
      "growth": 0,
      "perCapita": 58559.6,
      "popChangePct": 0.36
    },
    {
      "year": 2013,
      "gdp": 344.631,
      "growth": 1.4,
      "perCapita": 61512.4,
      "popChangePct": 0.39
    },
    {
      "year": 2014,
      "gdp": 352.833,
      "growth": 1.3,
      "perCapita": 62700.9,
      "popChangePct": 0.43
    },
    {
      "year": 2015,
      "gdp": 301.759,
      "growth": 2.1,
      "perCapita": 53317.0,
      "popChangePct": 0.59
    },
    {
      "year": 2016,
      "gdp": 312.182,
      "growth": 3.1,
      "perCapita": 54699.2,
      "popChangePct": 0.83
    },
    {
      "year": 2017,
      "gdp": 331.611,
      "growth": 3.1,
      "perCapita": 57683.7,
      "popChangePct": 0.74
    },
    {
      "year": 2018,
      "gdp": 355.293,
      "growth": 1.9,
      "perCapita": 61456.8,
      "popChangePct": 0.56
    },
    {
      "year": 2019,
      "gdp": 345.402,
      "growth": 1.7,
      "perCapita": 59489.6,
      "popChangePct": 0.43
    },
    {
      "year": 2020,
      "gdp": 355.631,
      "growth": -1.8,
      "perCapita": 61075.9,
      "popChangePct": 0.29
    },
    {
      "year": 2021,
      "gdp": 406.11,
      "growth": 6.5,
      "perCapita": 69538.9,
      "popChangePct": 0.29
    },
    {
      "year": 2022,
      "gdp": 400.115,
      "growth": 0.4,
      "perCapita": 68122.9,
      "popChangePct": 0.57
    },
    {
      "year": 2023,
      "gdp": 404.652,
      "growth": 0.6,
      "perCapita": 68207.6,
      "popChangePct": 1.02
    },
    {
      "year": 2024,
      "gdp": 424.525,
      "growth": 3.5,
      "perCapita": 71214.1,
      "popChangePct": 0.47
    },
    {
      "year": 2025,
      "gdp": 461.718,
      "growth": 2.9,
      "perCapita": 77046.4,
      "popChangePct": 0.54
    },
    {
      "year": 2026,
      "gdp": 503.772,
      "growth": 2,
      "perCapita": 83445.3,
      "popChangePct": 0.73
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 525.228,
      "growth": 1.6,
      "perCapita": 86325.2,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdp": 546.484,
      "growth": 1.6,
      "perCapita": 88992.7,
      "popChangePct": 0.94
    },
    {
      "year": 2029,
      "gdp": 567.415,
      "growth": 1.5,
      "perCapita": 91891.0,
      "popChangePct": 0.55
    },
    {
      "year": 2030,
      "gdp": 589.219,
      "growth": 1.5,
      "perCapita": 94769.8,
      "popChangePct": 0.68
    },
    {
      "year": 2031,
      "gdp": 611.871,
      "growth": 1.5,
      "perCapita": 97740.5,
      "popChangePct": 0.69
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 63.654,
      "perCapitaPPP": 12427.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 69.16,
      "perCapitaPPP": 13497.3,
      "perCapitaPPPChangePct": 8.61,
      "popChangePct": 0.04
    },
    {
      "year": 1982,
      "gdpPPP": 76.291,
      "perCapitaPPP": 14903.0,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": -0.1
    },
    {
      "year": 1983,
      "gdpPPP": 81.379,
      "perCapitaPPP": 15905.3,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": -0.06
    },
    {
      "year": 1984,
      "gdpPPP": 87.976,
      "perCapitaPPP": 17209.2,
      "perCapitaPPPChangePct": 8.2,
      "popChangePct": -0.08
    },
    {
      "year": 1985,
      "gdpPPP": 94.526,
      "perCapitaPPP": 18494.2,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": -0.02
    },
    {
      "year": 1986,
      "gdpPPP": 100.996,
      "perCapitaPPP": 19740.1,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 0.1
    },
    {
      "year": 1987,
      "gdpPPP": 103.98,
      "perCapitaPPP": 20289.5,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 0.18
    },
    {
      "year": 1988,
      "gdpPPP": 107.938,
      "perCapitaPPP": 21043.6,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 0.08
    },
    {
      "year": 1989,
      "gdpPPP": 112.951,
      "perCapitaPPP": 22018.8,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 0.02
    },
    {
      "year": 1990,
      "gdpPPP": 119.129,
      "perCapitaPPP": 23197.6,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 0.1
    },
    {
      "year": 1991,
      "gdpPPP": 124.953,
      "perCapitaPPP": 24279.3,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 0.21
    },
    {
      "year": 1992,
      "gdpPPP": 130.387,
      "perCapitaPPP": 25258.4,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.31
    },
    {
      "year": 1993,
      "gdpPPP": 133.37,
      "perCapitaPPP": 25744.1,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 0.37
    },
    {
      "year": 1994,
      "gdpPPP": 143.427,
      "perCapitaPPP": 27600.0,
      "perCapitaPPPChangePct": 7.21,
      "popChangePct": 0.31
    },
    {
      "year": 1995,
      "gdpPPP": 150.884,
      "perCapitaPPP": 28928.7,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.37
    },
    {
      "year": 1996,
      "gdpPPP": 158.102,
      "perCapitaPPP": 30108.8,
      "perCapitaPPPChangePct": 4.08,
      "popChangePct": 0.67
    },
    {
      "year": 1997,
      "gdpPPP": 165.921,
      "perCapitaPPP": 31453.5,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": 0.46
    },
    {
      "year": 1998,
      "gdpPPP": 171.685,
      "perCapitaPPP": 32424.8,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 0.38
    },
    {
      "year": 1999,
      "gdpPPP": 179.287,
      "perCapitaPPP": 33741.4,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 0.36
    },
    {
      "year": 2000,
      "gdpPPP": 190.169,
      "perCapitaPPP": 35678.9,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 0.3
    },
    {
      "year": 2001,
      "gdpPPP": 196.306,
      "perCapitaPPP": 36698.1,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 0.36
    },
    {
      "year": 2002,
      "gdpPPP": 200.262,
      "perCapitaPPP": 37304.2,
      "perCapitaPPPChangePct": 1.65,
      "popChangePct": 0.36
    },
    {
      "year": 2003,
      "gdpPPP": 205.117,
      "perCapitaPPP": 38101.0,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 0.3
    },
    {
      "year": 2004,
      "gdpPPP": 216.484,
      "perCapitaPPP": 40107.2,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 0.26
    },
    {
      "year": 2005,
      "gdpPPP": 228.535,
      "perCapitaPPP": 42232.1,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 0.24
    },
    {
      "year": 2006,
      "gdpPPP": 244.581,
      "perCapitaPPP": 45063.7,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 0.3
    },
    {
      "year": 2007,
      "gdpPPP": 253.686,
      "perCapitaPPP": 46572.9,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 0.37
    },
    {
      "year": 2008,
      "gdpPPP": 257.494,
      "perCapitaPPP": 47024.1,
      "perCapitaPPPChangePct": 0.97,
      "popChangePct": 0.53
    },
    {
      "year": 2009,
      "gdpPPP": 246.185,
      "perCapitaPPP": 44668,
      "perCapitaPPPChangePct": -5.01,
      "popChangePct": 0.64
    },
    {
      "year": 2010,
      "gdpPPP": 253.125,
      "perCapitaPPP": 45733.8,
      "perCapitaPPPChangePct": 2.39,
      "popChangePct": 0.44
    },
    {
      "year": 2011,
      "gdpPPP": 261.739,
      "perCapitaPPP": 47070.0,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.47
    },
    {
      "year": 2012,
      "gdpPPP": 266.599,
      "perCapitaPPP": 47773.2,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 0.36
    },
    {
      "year": 2013,
      "gdpPPP": 274.914,
      "perCapitaPPP": 49068.8,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 0.39
    },
    {
      "year": 2014,
      "gdpPPP": 283.277,
      "perCapitaPPP": 50340.3,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 0.43
    },
    {
      "year": 2015,
      "gdpPPP": 291.914,
      "perCapitaPPP": 51577.4,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 0.59
    },
    {
      "year": 2016,
      "gdpPPP": 303.751,
      "perCapitaPPP": 53221.9,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.83
    },
    {
      "year": 2017,
      "gdpPPP": 318.64,
      "perCapitaPPP": 55427.4,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 0.74
    },
    {
      "year": 2018,
      "gdpPPP": 331.591,
      "perCapitaPPP": 57356.8,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 0.56
    },
    {
      "year": 2019,
      "gdpPPP": 352.325,
      "perCapitaPPP": 60682.0,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.43
    },
    {
      "year": 2020,
      "gdpPPP": 365.525,
      "perCapitaPPP": 62775.2,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 0.29
    },
    {
      "year": 2021,
      "gdpPPP": 409.688,
      "perCapitaPPP": 70151.5,
      "perCapitaPPPChangePct": 11.75,
      "popChangePct": 0.29
    },
    {
      "year": 2022,
      "gdpPPP": 440.775,
      "perCapitaPPP": 75045.7,
      "perCapitaPPPChangePct": 6.98,
      "popChangePct": 0.57
    },
    {
      "year": 2023,
      "gdpPPP": 459.857,
      "perCapitaPPP": 77512.9,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 1.02
    },
    {
      "year": 2024,
      "gdpPPP": 487.667,
      "perCapitaPPP": 81806.1,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 0.47
    },
    {
      "year": 2025,
      "gdpPPP": 515.94,
      "perCapitaPPP": 86094.2,
      "perCapitaPPPChangePct": 5.24,
      "popChangePct": 0.54
    },
    {
      "year": 2026,
      "gdpPPP": 541.335,
      "perCapitaPPP": 89667.3,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 0.73
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 561.797,
      "perCapitaPPP": 92335.7,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdpPPP": 579.869,
      "perCapitaPPP": 94429.5,
      "perCapitaPPPChangePct": 2.27,
      "popChangePct": 0.94
    },
    {
      "year": 2029,
      "gdpPPP": 599.269,
      "perCapitaPPP": 97049.6,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 0.55
    },
    {
      "year": 2030,
      "gdpPPP": 619.679,
      "perCapitaPPP": 99669.0,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 0.68
    },
    {
      "year": 2031,
      "gdpPPP": 640.014,
      "perCapitaPPP": 102236.0,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 0.69
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function DenmarkGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
