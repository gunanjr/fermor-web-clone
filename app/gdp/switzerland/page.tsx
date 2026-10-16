import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Switzerland",
  "slug": "switzerland",
  "iso3": "CHE",
  "region": "Europe",
  "rank2026": 20,
  "flagEmoji": "🇨🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Saudi Arabia",
      "slug": "saudi-arabia",
      "rank": 19
    },
    {
      "name": "Poland",
      "slug": "poland",
      "rank": 21
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 124.313,
      "growth": 5.1,
      "perCapita": 19719.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 113.96,
      "growth": 1.7,
      "perCapita": 17989.0,
      "popChangePct": 0.49
    },
    {
      "year": 1982,
      "gdp": 116.759,
      "growth": -1.3,
      "perCapita": 18320.9,
      "popChangePct": 0.6
    },
    {
      "year": 1983,
      "gdp": 116.347,
      "growth": 0.6,
      "perCapita": 18150.8,
      "popChangePct": 0.58
    },
    {
      "year": 1984,
      "gdp": 111.03,
      "growth": 3,
      "perCapita": 17272.9,
      "popChangePct": 0.28
    },
    {
      "year": 1985,
      "gdp": 112.716,
      "growth": 3.8,
      "perCapita": 17459.1,
      "popChangePct": 0.44
    },
    {
      "year": 1986,
      "gdp": 161.56,
      "growth": 1.8,
      "perCapita": 24912.9,
      "popChangePct": 0.45
    },
    {
      "year": 1987,
      "gdp": 202.276,
      "growth": 1.6,
      "perCapita": 31009.7,
      "popChangePct": 0.59
    },
    {
      "year": 1988,
      "gdp": 218.596,
      "growth": 3.2,
      "perCapita": 33287.0,
      "popChangePct": 0.67
    },
    {
      "year": 1989,
      "gdp": 211.298,
      "growth": 4.4,
      "perCapita": 31918.1,
      "popChangePct": 0.81
    },
    {
      "year": 1990,
      "gdp": 269.875,
      "growth": 3.7,
      "perCapita": 40436.7,
      "popChangePct": 0.82
    },
    {
      "year": 1991,
      "gdp": 273.072,
      "growth": -0.9,
      "perCapita": 40413.2,
      "popChangePct": 1.24
    },
    {
      "year": 1992,
      "gdp": 283.941,
      "growth": -0.1,
      "perCapita": 41493.6,
      "popChangePct": 1.27
    },
    {
      "year": 1993,
      "gdp": 276.31,
      "growth": -0.1,
      "perCapita": 39998.6,
      "popChangePct": 0.95
    },
    {
      "year": 1994,
      "gdp": 305.911,
      "growth": 1.3,
      "perCapita": 43896.0,
      "popChangePct": 0.88
    },
    {
      "year": 1995,
      "gdp": 358.258,
      "growth": 0.5,
      "perCapita": 51041.1,
      "popChangePct": 0.72
    },
    {
      "year": 1996,
      "gdp": 345.49,
      "growth": 0.6,
      "perCapita": 48922.4,
      "popChangePct": 0.61
    },
    {
      "year": 1997,
      "gdp": 298.881,
      "growth": 2.1,
      "perCapita": 42208.9,
      "popChangePct": 0.27
    },
    {
      "year": 1998,
      "gdp": 306.786,
      "growth": 2.7,
      "perCapita": 43233.7,
      "popChangePct": 0.21
    },
    {
      "year": 1999,
      "gdp": 301.703,
      "growth": 1.6,
      "perCapita": 42350.3,
      "popChangePct": 0.39
    },
    {
      "year": 2000,
      "gdp": 282.383,
      "growth": 3.7,
      "perCapita": 39416.9,
      "popChangePct": 0.56
    },
    {
      "year": 2001,
      "gdp": 290.329,
      "growth": 1.6,
      "perCapita": 40334.7,
      "popChangePct": 0.47
    },
    {
      "year": 2002,
      "gdp": 314.115,
      "growth": 0.4,
      "perCapita": 43290.3,
      "popChangePct": 0.81
    },
    {
      "year": 2003,
      "gdp": 366.595,
      "growth": -0.3,
      "perCapita": 50122.3,
      "popChangePct": 0.8
    },
    {
      "year": 2004,
      "gdp": 408.716,
      "growth": 2.5,
      "perCapita": 55501.9,
      "popChangePct": 0.68
    },
    {
      "year": 2005,
      "gdp": 424.425,
      "growth": 3,
      "perCapita": 57238.7,
      "popChangePct": 0.69
    },
    {
      "year": 2006,
      "gdp": 448.5,
      "growth": 4.2,
      "perCapita": 60128.7,
      "popChangePct": 0.59
    },
    {
      "year": 2007,
      "gdp": 499.345,
      "growth": 4,
      "perCapita": 66499.5,
      "popChangePct": 0.67
    },
    {
      "year": 2008,
      "gdp": 574.523,
      "growth": 2.4,
      "perCapita": 75664.8,
      "popChangePct": 1.12
    },
    {
      "year": 2009,
      "gdp": 563.355,
      "growth": -2,
      "perCapita": 73143.9,
      "popChangePct": 1.44
    },
    {
      "year": 2010,
      "gdp": 609.479,
      "growth": 3.2,
      "perCapita": 78278.9,
      "popChangePct": 1.09
    },
    {
      "year": 2011,
      "gdp": 727.079,
      "growth": 1.5,
      "perCapita": 92386.1,
      "popChangePct": 1.08
    },
    {
      "year": 2012,
      "gdp": 698.233,
      "growth": 1.2,
      "perCapita": 87772.8,
      "popChangePct": 1.08
    },
    {
      "year": 2013,
      "gdp": 719.187,
      "growth": 1.8,
      "perCapita": 89462.2,
      "popChangePct": 1.06
    },
    {
      "year": 2014,
      "gdp": 741.185,
      "growth": 2.5,
      "perCapita": 91054.7,
      "popChangePct": 1.26
    },
    {
      "year": 2015,
      "gdp": 705.861,
      "growth": 1.4,
      "perCapita": 85683.5,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdp": 698.552,
      "growth": 2,
      "perCapita": 83890.0,
      "popChangePct": 1.08
    },
    {
      "year": 2017,
      "gdp": 706.894,
      "growth": 1.5,
      "perCapita": 83954.2,
      "popChangePct": 1.12
    },
    {
      "year": 2018,
      "gdp": 741.219,
      "growth": 3.4,
      "perCapita": 87366.7,
      "popChangePct": 0.76
    },
    {
      "year": 2019,
      "gdp": 736.85,
      "growth": 1.1,
      "perCapita": 86231.7,
      "popChangePct": 0.72
    },
    {
      "year": 2020,
      "gdp": 755.582,
      "growth": -2.4,
      "perCapita": 87797.1,
      "popChangePct": 0.71
    },
    {
      "year": 2021,
      "gdp": 840.084,
      "growth": 6.2,
      "perCapita": 96895.5,
      "popChangePct": 0.74
    },
    {
      "year": 2022,
      "gdp": 858.345,
      "growth": 3.6,
      "perCapita": 98220.1,
      "popChangePct": 0.8
    },
    {
      "year": 2023,
      "gdp": 928.689,
      "growth": 0.9,
      "perCapita": 105353.2,
      "popChangePct": 0.87
    },
    {
      "year": 2024,
      "gdp": 970.19,
      "growth": 1.4,
      "perCapita": 108255.9,
      "popChangePct": 1.67
    },
    {
      "year": 2025,
      "gdp": 1043.544,
      "growth": 1.3,
      "perCapita": 115620.1,
      "popChangePct": 0.71
    },
    {
      "year": 2026,
      "gdp": 1146.911,
      "growth": 1.3,
      "perCapita": 126176.8,
      "popChangePct": 0.71
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1190.375,
      "growth": 1.3,
      "perCapita": 130035.2,
      "popChangePct": 0.7
    },
    {
      "year": 2028,
      "gdp": 1241.643,
      "growth": 1.8,
      "perCapita": 134679.5,
      "popChangePct": 0.71
    },
    {
      "year": 2029,
      "gdp": 1289.14,
      "growth": 1.2,
      "perCapita": 138845.6,
      "popChangePct": 0.72
    },
    {
      "year": 2030,
      "gdp": 1346.662,
      "growth": 1.8,
      "perCapita": 144018.4,
      "popChangePct": 0.71
    },
    {
      "year": 2031,
      "gdp": 1398.268,
      "growth": 1.2,
      "perCapita": 148483.2,
      "popChangePct": 0.71
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 121.979,
      "perCapitaPPP": 19349.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 135.738,
      "perCapitaPPP": 21426.6,
      "perCapitaPPPChangePct": 10.74,
      "popChangePct": 0.49
    },
    {
      "year": 1982,
      "gdpPPP": 142.206,
      "perCapitaPPP": 22313.9,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 0.6
    },
    {
      "year": 1983,
      "gdpPPP": 148.71,
      "perCapitaPPP": 23199.7,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 0.58
    },
    {
      "year": 1984,
      "gdpPPP": 158.68,
      "perCapitaPPP": 24685.7,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 0.28
    },
    {
      "year": 1985,
      "gdpPPP": 169.848,
      "perCapitaPPP": 26308.5,
      "perCapitaPPPChangePct": 6.57,
      "popChangePct": 0.44
    },
    {
      "year": 1986,
      "gdpPPP": 176.45,
      "perCapitaPPP": 27209.0,
      "perCapitaPPPChangePct": 3.42,
      "popChangePct": 0.45
    },
    {
      "year": 1987,
      "gdpPPP": 183.671,
      "perCapitaPPP": 28157.4,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 0.59
    },
    {
      "year": 1988,
      "gdpPPP": 196.208,
      "perCapitaPPP": 29877.8,
      "perCapitaPPPChangePct": 6.11,
      "popChangePct": 0.67
    },
    {
      "year": 1989,
      "gdpPPP": 212.926,
      "perCapitaPPP": 32164.1,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": 0.81
    },
    {
      "year": 1990,
      "gdpPPP": 229.049,
      "perCapitaPPP": 34319.6,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 0.82
    },
    {
      "year": 1991,
      "gdpPPP": 234.65,
      "perCapitaPPP": 34726.9,
      "perCapitaPPPChangePct": 1.19,
      "popChangePct": 1.24
    },
    {
      "year": 1992,
      "gdpPPP": 239.668,
      "perCapitaPPP": 35023.9,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 1.27
    },
    {
      "year": 1993,
      "gdpPPP": 245.144,
      "perCapitaPPP": 35487.0,
      "perCapitaPPPChangePct": 1.32,
      "popChangePct": 0.95
    },
    {
      "year": 1994,
      "gdpPPP": 253.544,
      "perCapitaPPP": 36381.7,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 0.88
    },
    {
      "year": 1995,
      "gdpPPP": 260.202,
      "perCapitaPPP": 37071.1,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 0.72
    },
    {
      "year": 1996,
      "gdpPPP": 266.471,
      "perCapitaPPP": 37733.1,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 0.61
    },
    {
      "year": 1997,
      "gdpPPP": 276.67,
      "perCapitaPPP": 39072.2,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 0.27
    },
    {
      "year": 1998,
      "gdpPPP": 287.422,
      "perCapitaPPP": 40504.8,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 0.21
    },
    {
      "year": 1999,
      "gdpPPP": 296.291,
      "perCapitaPPP": 41590.5,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 0.39
    },
    {
      "year": 2000,
      "gdpPPP": 314.303,
      "perCapitaPPP": 43872.6,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 0.56
    },
    {
      "year": 2001,
      "gdpPPP": 326.621,
      "perCapitaPPP": 45376.7,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 0.47
    },
    {
      "year": 2002,
      "gdpPPP": 332.96,
      "perCapitaPPP": 45887.5,
      "perCapitaPPPChangePct": 1.13,
      "popChangePct": 0.81
    },
    {
      "year": 2003,
      "gdpPPP": 338.385,
      "perCapitaPPP": 46265.4,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": 0.8
    },
    {
      "year": 2004,
      "gdpPPP": 356.198,
      "perCapitaPPP": 48370.1,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 0.68
    },
    {
      "year": 2005,
      "gdpPPP": 378.4,
      "perCapitaPPP": 51031.8,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 0.69
    },
    {
      "year": 2006,
      "gdpPPP": 406.426,
      "perCapitaPPP": 54488.0,
      "perCapitaPPPChangePct": 6.77,
      "popChangePct": 0.59
    },
    {
      "year": 2007,
      "gdpPPP": 434.208,
      "perCapitaPPP": 57825.1,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": 0.67
    },
    {
      "year": 2008,
      "gdpPPP": 453.324,
      "perCapitaPPP": 59702.9,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 1.12
    },
    {
      "year": 2009,
      "gdpPPP": 447.206,
      "perCapitaPPP": 58063.6,
      "perCapitaPPPChangePct": -2.75,
      "popChangePct": 1.44
    },
    {
      "year": 2010,
      "gdpPPP": 467.252,
      "perCapitaPPP": 60011.8,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 1.09
    },
    {
      "year": 2011,
      "gdpPPP": 483.916,
      "perCapitaPPP": 61488.7,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 1.08
    },
    {
      "year": 2012,
      "gdpPPP": 498.828,
      "perCapitaPPP": 62706.3,
      "perCapitaPPPChangePct": 1.98,
      "popChangePct": 1.08
    },
    {
      "year": 2013,
      "gdpPPP": 516.691,
      "perCapitaPPP": 64273.1,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 1.06
    },
    {
      "year": 2014,
      "gdpPPP": 538.737,
      "perCapitaPPP": 66183.9,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 1.26
    },
    {
      "year": 2015,
      "gdpPPP": 551.342,
      "perCapitaPPP": 66926.7,
      "perCapitaPPPChangePct": 1.12,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdpPPP": 567.455,
      "perCapitaPPP": 68146.4,
      "perCapitaPPPChangePct": 1.82,
      "popChangePct": 1.08
    },
    {
      "year": 2017,
      "gdpPPP": 586.055,
      "perCapitaPPP": 69602.8,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 1.12
    },
    {
      "year": 2018,
      "gdpPPP": 614.855,
      "perCapitaPPP": 72472.3,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 0.76
    },
    {
      "year": 2019,
      "gdpPPP": 645.801,
      "perCapitaPPP": 75576.4,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.72
    },
    {
      "year": 2020,
      "gdpPPP": 642.195,
      "perCapitaPPP": 74621.7,
      "perCapitaPPPChangePct": -1.26,
      "popChangePct": 0.71
    },
    {
      "year": 2021,
      "gdpPPP": 733.613,
      "perCapitaPPP": 84615.1,
      "perCapitaPPPChangePct": 13.39,
      "popChangePct": 0.74
    },
    {
      "year": 2022,
      "gdpPPP": 814.034,
      "perCapitaPPP": 93149.6,
      "perCapitaPPPChangePct": 10.09,
      "popChangePct": 0.8
    },
    {
      "year": 2023,
      "gdpPPP": 851.542,
      "perCapitaPPP": 96601.4,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 0.87
    },
    {
      "year": 2024,
      "gdpPPP": 884.806,
      "perCapitaPPP": 98728.6,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 1.67
    },
    {
      "year": 2025,
      "gdpPPP": 921.478,
      "perCapitaPPP": 102095.7,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 0.71
    },
    {
      "year": 2026,
      "gdpPPP": 960.599,
      "perCapitaPPP": 105679.8,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 0.71
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 994.889,
      "perCapitaPPP": 108680.6,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.7
    },
    {
      "year": 2028,
      "gdpPPP": 1029.725,
      "perCapitaPPP": 111693.0,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 0.71
    },
    {
      "year": 2029,
      "gdpPPP": 1060.873,
      "perCapitaPPP": 114260.3,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 0.72
    },
    {
      "year": 2030,
      "gdpPPP": 1100.191,
      "perCapitaPPP": 117659.7,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 0.71
    },
    {
      "year": 2031,
      "gdpPPP": 1133.774,
      "perCapitaPPP": 120396.3,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 0.71
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SwitzerlandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
