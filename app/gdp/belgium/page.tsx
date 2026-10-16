import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Belgium",
  "slug": "belgium",
  "iso3": "BEL",
  "region": "Europe",
  "rank2026": 24,
  "flagEmoji": "🇧🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Ireland",
      "slug": "ireland",
      "rank": 23
    },
    {
      "name": "Sweden",
      "slug": "sweden",
      "rank": 25
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 123.479,
      "growth": 4.4,
      "perCapita": 12529.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 102.245,
      "growth": -0.3,
      "perCapita": 10366.2,
      "popChangePct": 0.08
    },
    {
      "year": 1982,
      "gdp": 89.959,
      "growth": 0.6,
      "perCapita": 9128.6,
      "popChangePct": -0.08
    },
    {
      "year": 1983,
      "gdp": 85.037,
      "growth": 0.3,
      "perCapita": 8626.2,
      "popChangePct": 0.03
    },
    {
      "year": 1984,
      "gdp": 81.237,
      "growth": 2.5,
      "perCapita": 8244.9,
      "popChangePct": -0.05
    },
    {
      "year": 1985,
      "gdp": 84.468,
      "growth": 1.7,
      "perCapita": 8568.7,
      "popChangePct": 0.05
    },
    {
      "year": 1986,
      "gdp": 117.063,
      "growth": 1.8,
      "perCapita": 11873.9,
      "popChangePct": 0.01
    },
    {
      "year": 1987,
      "gdp": 145.412,
      "growth": 2.3,
      "perCapita": 14740.5,
      "popChangePct": 0.06
    },
    {
      "year": 1988,
      "gdp": 158.098,
      "growth": 4.7,
      "perCapita": 16008.7,
      "popChangePct": 0.11
    },
    {
      "year": 1989,
      "gdp": 159.817,
      "growth": 3.5,
      "perCapita": 16098.2,
      "popChangePct": 0.53
    },
    {
      "year": 1990,
      "gdp": 200.15,
      "growth": 3.1,
      "perCapita": 20120.0,
      "popChangePct": 0.2
    },
    {
      "year": 1991,
      "gdp": 205.37,
      "growth": 1.8,
      "perCapita": 20563.8,
      "popChangePct": 0.39
    },
    {
      "year": 1992,
      "gdp": 228.733,
      "growth": 1.5,
      "perCapita": 22823.1,
      "popChangePct": 0.35
    },
    {
      "year": 1993,
      "gdp": 218.721,
      "growth": -1,
      "perCapita": 21723.7,
      "popChangePct": 0.46
    },
    {
      "year": 1994,
      "gdp": 238.623,
      "growth": 3.2,
      "perCapita": 23624.6,
      "popChangePct": 0.33
    },
    {
      "year": 1995,
      "gdp": 288.302,
      "growth": 2.4,
      "perCapita": 28458.6,
      "popChangePct": 0.3
    },
    {
      "year": 1996,
      "gdp": 279.292,
      "growth": 1.3,
      "perCapita": 27535.3,
      "popChangePct": 0.12
    },
    {
      "year": 1997,
      "gdp": 253.022,
      "growth": 3.8,
      "perCapita": 24878.7,
      "popChangePct": 0.27
    },
    {
      "year": 1998,
      "gdp": 258.876,
      "growth": 2,
      "perCapita": 25399.2,
      "popChangePct": 0.22
    },
    {
      "year": 1999,
      "gdp": 258.503,
      "growth": 3.5,
      "perCapita": 25309.3,
      "popChangePct": 0.22
    },
    {
      "year": 2000,
      "gdp": 236.897,
      "growth": 3.7,
      "perCapita": 23136.5,
      "popChangePct": 0.24
    },
    {
      "year": 2001,
      "gdp": 236.748,
      "growth": 1.1,
      "perCapita": 23067.2,
      "popChangePct": 0.23
    },
    {
      "year": 2002,
      "gdp": 258.2,
      "growth": 1.7,
      "perCapita": 25044.3,
      "popChangePct": 0.46
    },
    {
      "year": 2003,
      "gdp": 318.004,
      "growth": 1,
      "perCapita": 30707.7,
      "popChangePct": 0.45
    },
    {
      "year": 2004,
      "gdp": 369.047,
      "growth": 3.6,
      "perCapita": 35497.6,
      "popChangePct": 0.39
    },
    {
      "year": 2005,
      "gdp": 385.927,
      "growth": 2.3,
      "perCapita": 36945.5,
      "popChangePct": 0.48
    },
    {
      "year": 2006,
      "gdp": 408.281,
      "growth": 2.6,
      "perCapita": 38841.8,
      "popChangePct": 0.62
    },
    {
      "year": 2007,
      "gdp": 470.978,
      "growth": 3.7,
      "perCapita": 44496.8,
      "popChangePct": 0.7
    },
    {
      "year": 2008,
      "gdp": 517.271,
      "growth": 0.4,
      "perCapita": 48493.3,
      "popChangePct": 0.77
    },
    {
      "year": 2009,
      "gdp": 484.488,
      "growth": -1.9,
      "perCapita": 45055.7,
      "popChangePct": 0.81
    },
    {
      "year": 2010,
      "gdp": 481.949,
      "growth": 2.7,
      "perCapita": 44460.7,
      "popChangePct": 0.81
    },
    {
      "year": 2011,
      "gdp": 527.106,
      "growth": 1.9,
      "perCapita": 47916.0,
      "popChangePct": 1.49
    },
    {
      "year": 2012,
      "gdp": 498.731,
      "growth": 0.2,
      "perCapita": 45028.6,
      "popChangePct": 0.68
    },
    {
      "year": 2013,
      "gdp": 524.106,
      "growth": 0.3,
      "perCapita": 47055.7,
      "popChangePct": 0.56
    },
    {
      "year": 2014,
      "gdp": 538.127,
      "growth": 1.8,
      "perCapita": 48129.4,
      "popChangePct": 0.39
    },
    {
      "year": 2015,
      "gdp": 461.091,
      "growth": 1.5,
      "perCapita": 41032.3,
      "popChangePct": 0.5
    },
    {
      "year": 2016,
      "gdp": 474.141,
      "growth": 1.2,
      "perCapita": 41918.1,
      "popChangePct": 0.66
    },
    {
      "year": 2017,
      "gdp": 500.733,
      "growth": 1.5,
      "perCapita": 44110.7,
      "popChangePct": 0.36
    },
    {
      "year": 2018,
      "gdp": 542.885,
      "growth": 1.9,
      "perCapita": 47627.4,
      "popChangePct": 0.41
    },
    {
      "year": 2019,
      "gdp": 536.787,
      "growth": 2.4,
      "perCapita": 46858.4,
      "popChangePct": 0.5
    },
    {
      "year": 2020,
      "gdp": 529.269,
      "growth": -4.8,
      "perCapita": 45933.8,
      "popChangePct": 0.58
    },
    {
      "year": 2021,
      "gdp": 598.92,
      "growth": 6.3,
      "perCapita": 51833.2,
      "popChangePct": 0.29
    },
    {
      "year": 2022,
      "gdp": 591.551,
      "growth": 4,
      "perCapita": 50918.4,
      "popChangePct": 0.55
    },
    {
      "year": 2023,
      "gdp": 651.518,
      "growth": 1.7,
      "perCapita": 55482.4,
      "popChangePct": 1.08
    },
    {
      "year": 2024,
      "gdp": 671.168,
      "growth": 1.1,
      "perCapita": 56796.4,
      "popChangePct": 0.63
    },
    {
      "year": 2025,
      "gdp": 724.917,
      "growth": 1,
      "perCapita": 61002.0,
      "popChangePct": 0.56
    },
    {
      "year": 2026,
      "gdp": 776.73,
      "growth": 0.7,
      "perCapita": 65111.6,
      "popChangePct": 0.39
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 797.019,
      "growth": 1.1,
      "perCapita": 66590.1,
      "popChangePct": 0.34
    },
    {
      "year": 2028,
      "gdp": 816.962,
      "growth": 1.1,
      "perCapita": 68049.9,
      "popChangePct": 0.3
    },
    {
      "year": 2029,
      "gdp": 840.792,
      "growth": 1.2,
      "perCapita": 69840.0,
      "popChangePct": 0.28
    },
    {
      "year": 2030,
      "gdp": 863.759,
      "growth": 1.3,
      "perCapita": 71561.8,
      "popChangePct": 0.26
    },
    {
      "year": 2031,
      "gdp": 887.607,
      "growth": 1.3,
      "perCapita": 73356.5,
      "popChangePct": 0.25
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 114.99,
      "perCapitaPPP": 11668.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 125.518,
      "perCapitaPPP": 12725.7,
      "perCapitaPPPChangePct": 9.06,
      "popChangePct": 0.08
    },
    {
      "year": 1982,
      "gdpPPP": 134.067,
      "perCapitaPPP": 13604.6,
      "perCapitaPPPChangePct": 6.91,
      "popChangePct": -0.08
    },
    {
      "year": 1983,
      "gdpPPP": 139.752,
      "perCapitaPPP": 14176.5,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 0.03
    },
    {
      "year": 1984,
      "gdpPPP": 148.367,
      "perCapitaPPP": 15058.0,
      "perCapitaPPPChangePct": 6.22,
      "popChangePct": -0.05
    },
    {
      "year": 1985,
      "gdpPPP": 155.587,
      "perCapitaPPP": 15783.3,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 0.05
    },
    {
      "year": 1986,
      "gdpPPP": 161.613,
      "perCapitaPPP": 16392.6,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 0.01
    },
    {
      "year": 1987,
      "gdpPPP": 169.438,
      "perCapitaPPP": 17176.1,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 0.06
    },
    {
      "year": 1988,
      "gdpPPP": 183.698,
      "perCapitaPPP": 18601.0,
      "perCapitaPPPChangePct": 8.3,
      "popChangePct": 0.11
    },
    {
      "year": 1989,
      "gdpPPP": 197.524,
      "perCapitaPPP": 19896.5,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": 0.53
    },
    {
      "year": 1990,
      "gdpPPP": 211.346,
      "perCapitaPPP": 21245.5,
      "perCapitaPPPChangePct": 6.78,
      "popChangePct": 0.2
    },
    {
      "year": 1991,
      "gdpPPP": 222.499,
      "perCapitaPPP": 22278.9,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 0.39
    },
    {
      "year": 1992,
      "gdpPPP": 231.053,
      "perCapitaPPP": 23054.6,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 0.35
    },
    {
      "year": 1993,
      "gdpPPP": 234.254,
      "perCapitaPPP": 23266.5,
      "perCapitaPPPChangePct": 0.92,
      "popChangePct": 0.46
    },
    {
      "year": 1994,
      "gdpPPP": 246.977,
      "perCapitaPPP": 24451.7,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 0.33
    },
    {
      "year": 1995,
      "gdpPPP": 258.168,
      "perCapitaPPP": 25484.1,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 0.3
    },
    {
      "year": 1996,
      "gdpPPP": 266.369,
      "perCapitaPPP": 26261.3,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 0.12
    },
    {
      "year": 1997,
      "gdpPPP": 281.241,
      "perCapitaPPP": 27653.4,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 0.27
    },
    {
      "year": 1998,
      "gdpPPP": 289.982,
      "perCapitaPPP": 28451.2,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 0.22
    },
    {
      "year": 1999,
      "gdpPPP": 304.504,
      "perCapitaPPP": 29813.1,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.22
    },
    {
      "year": 2000,
      "gdpPPP": 322.975,
      "perCapitaPPP": 31543.4,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.24
    },
    {
      "year": 2001,
      "gdpPPP": 333.88,
      "perCapitaPPP": 32531.1,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 0.23
    },
    {
      "year": 2002,
      "gdpPPP": 344.855,
      "perCapitaPPP": 33449.5,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 0.46
    },
    {
      "year": 2003,
      "gdpPPP": 355.313,
      "perCapitaPPP": 34310.4,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 0.45
    },
    {
      "year": 2004,
      "gdpPPP": 377.898,
      "perCapitaPPP": 36348.8,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": 0.39
    },
    {
      "year": 2005,
      "gdpPPP": 398.797,
      "perCapitaPPP": 38177.5,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 0.48
    },
    {
      "year": 2006,
      "gdpPPP": 421.588,
      "perCapitaPPP": 40107.8,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 0.62
    },
    {
      "year": 2007,
      "gdpPPP": 448.932,
      "perCapitaPPP": 42413.9,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": 0.7
    },
    {
      "year": 2008,
      "gdpPPP": 459.625,
      "perCapitaPPP": 43089.0,
      "perCapitaPPPChangePct": 1.59,
      "popChangePct": 0.77
    },
    {
      "year": 2009,
      "gdpPPP": 453.643,
      "perCapitaPPP": 42187.3,
      "perCapitaPPPChangePct": -2.09,
      "popChangePct": 0.81
    },
    {
      "year": 2010,
      "gdpPPP": 471.601,
      "perCapitaPPP": 43506.0,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 0.81
    },
    {
      "year": 2011,
      "gdpPPP": 490.625,
      "perCapitaPPP": 44599.7,
      "perCapitaPPPChangePct": 2.51,
      "popChangePct": 1.49
    },
    {
      "year": 2012,
      "gdpPPP": 500.84,
      "perCapitaPPP": 45218.9,
      "perCapitaPPPChangePct": 1.39,
      "popChangePct": 0.68
    },
    {
      "year": 2013,
      "gdpPPP": 510.921,
      "perCapitaPPP": 45872.0,
      "perCapitaPPPChangePct": 1.44,
      "popChangePct": 0.56
    },
    {
      "year": 2014,
      "gdpPPP": 528.998,
      "perCapitaPPP": 47312.9,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 0.39
    },
    {
      "year": 2015,
      "gdpPPP": 541.776,
      "perCapitaPPP": 48212.4,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": 0.5
    },
    {
      "year": 2016,
      "gdpPPP": 553.451,
      "perCapitaPPP": 48929.9,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 0.66
    },
    {
      "year": 2017,
      "gdpPPP": 571.671,
      "perCapitaPPP": 50359.9,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.36
    },
    {
      "year": 2018,
      "gdpPPP": 599.541,
      "perCapitaPPP": 52597.8,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.41
    },
    {
      "year": 2019,
      "gdpPPP": 651.57,
      "perCapitaPPP": 56878.2,
      "perCapitaPPPChangePct": 8.14,
      "popChangePct": 0.5
    },
    {
      "year": 2020,
      "gdpPPP": 647.546,
      "perCapitaPPP": 56198.7,
      "perCapitaPPPChangePct": -1.19,
      "popChangePct": 0.58
    },
    {
      "year": 2021,
      "gdpPPP": 716.918,
      "perCapitaPPP": 62045.2,
      "perCapitaPPPChangePct": 10.4,
      "popChangePct": 0.29
    },
    {
      "year": 2022,
      "gdpPPP": 798.289,
      "perCapitaPPP": 68713.6,
      "perCapitaPPPChangePct": 10.75,
      "popChangePct": 0.55
    },
    {
      "year": 2023,
      "gdpPPP": 842.017,
      "perCapitaPPP": 71704.9,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 1.08
    },
    {
      "year": 2024,
      "gdpPPP": 872.158,
      "perCapitaPPP": 73804.8,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 0.63
    },
    {
      "year": 2025,
      "gdpPPP": 905.616,
      "perCapitaPPP": 76207.9,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.56
    },
    {
      "year": 2026,
      "gdpPPP": 937.719,
      "perCapitaPPP": 78606.9,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 0.39
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 968.459,
      "perCapitaPPP": 80913.7,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 0.34
    },
    {
      "year": 2028,
      "gdpPPP": 995.611,
      "perCapitaPPP": 82930.7,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 0.3
    },
    {
      "year": 2029,
      "gdpPPP": 1025.953,
      "perCapitaPPP": 85220.4,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 0.28
    },
    {
      "year": 2030,
      "gdpPPP": 1058.508,
      "perCapitaPPP": 87696.6,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 0.26
    },
    {
      "year": 2031,
      "gdpPPP": 1091.2,
      "perCapitaPPP": 90182.6,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 0.25
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BelgiumGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
