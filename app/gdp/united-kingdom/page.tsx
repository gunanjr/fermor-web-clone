import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "United Kingdom",
  "slug": "united-kingdom",
  "iso3": "GBR",
  "region": "Europe",
  "rank2026": 5,
  "flagEmoji": "🇬🇧",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Japan",
      "slug": "japan",
      "rank": 4
    },
    {
      "name": "India",
      "slug": "india",
      "rank": 6
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 604.664,
      "growth": -2,
      "perCapita": 10734.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 589.092,
      "growth": -0.6,
      "perCapita": 10452.7,
      "popChangePct": 0.05
    },
    {
      "year": 1982,
      "gdp": 560.122,
      "growth": 2,
      "perCapita": 9950.5,
      "popChangePct": -0.12
    },
    {
      "year": 1983,
      "gdp": 533.763,
      "growth": 4.2,
      "perCapita": 9478.0,
      "popChangePct": 0.04
    },
    {
      "year": 1984,
      "gdp": 505.859,
      "growth": 2.2,
      "perCapita": 8967.7,
      "popChangePct": 0.17
    },
    {
      "year": 1985,
      "gdp": 538.269,
      "growth": 4.1,
      "perCapita": 9517.8,
      "popChangePct": 0.26
    },
    {
      "year": 1986,
      "gdp": 656.445,
      "growth": 3.1,
      "perCapita": 11580.8,
      "popChangePct": 0.23
    },
    {
      "year": 1987,
      "gdp": 816.119,
      "growth": 5.5,
      "perCapita": 14367.3,
      "popChangePct": 0.21
    },
    {
      "year": 1988,
      "gdp": 992.545,
      "growth": 5.4,
      "perCapita": 17438.8,
      "popChangePct": 0.2
    },
    {
      "year": 1989,
      "gdp": 1010.843,
      "growth": 2.4,
      "perCapita": 17710.2,
      "popChangePct": 0.28
    },
    {
      "year": 1990,
      "gdp": 1200.911,
      "growth": 0.6,
      "perCapita": 20981.0,
      "popChangePct": 0.28
    },
    {
      "year": 1991,
      "gdp": 1252.495,
      "growth": -1.4,
      "perCapita": 21805.7,
      "popChangePct": 0.35
    },
    {
      "year": 1992,
      "gdp": 1293.728,
      "growth": 0.3,
      "perCapita": 22466.4,
      "popChangePct": 0.25
    },
    {
      "year": 1993,
      "gdp": 1158.966,
      "growth": 2.3,
      "perCapita": 20081.2,
      "popChangePct": 0.22
    },
    {
      "year": 1994,
      "gdp": 1245.905,
      "growth": 3.4,
      "perCapita": 21532.4,
      "popChangePct": 0.26
    },
    {
      "year": 1995,
      "gdp": 1349.359,
      "growth": 2.4,
      "perCapita": 23254.8,
      "popChangePct": 0.28
    },
    {
      "year": 1996,
      "gdp": 1426.746,
      "growth": 2.6,
      "perCapita": 24529.7,
      "popChangePct": 0.24
    },
    {
      "year": 1997,
      "gdp": 1569.646,
      "growth": 4.9,
      "perCapita": 26917.1,
      "popChangePct": 0.26
    },
    {
      "year": 1998,
      "gdp": 1660.979,
      "growth": 3.2,
      "perCapita": 28404.9,
      "popChangePct": 0.28
    },
    {
      "year": 1999,
      "gdp": 1693.878,
      "growth": 2.9,
      "perCapita": 28864.4,
      "popChangePct": 0.36
    },
    {
      "year": 2000,
      "gdp": 1674.765,
      "growth": 4.5,
      "perCapita": 28440.8,
      "popChangePct": 0.34
    },
    {
      "year": 2001,
      "gdp": 1656.597,
      "growth": 2.4,
      "perCapita": 28024.2,
      "popChangePct": 0.39
    },
    {
      "year": 2002,
      "gdp": 1793.363,
      "growth": 1.7,
      "perCapita": 30208.6,
      "popChangePct": 0.43
    },
    {
      "year": 2003,
      "gdp": 2063.105,
      "growth": 3.2,
      "perCapita": 34594.4,
      "popChangePct": 0.46
    },
    {
      "year": 2004,
      "gdp": 2430.872,
      "growth": 2.3,
      "perCapita": 40548.3,
      "popChangePct": 0.52
    },
    {
      "year": 2005,
      "gdp": 2554.229,
      "growth": 2.8,
      "perCapita": 42279.5,
      "popChangePct": 0.77
    },
    {
      "year": 2006,
      "gdp": 2723.389,
      "growth": 2.2,
      "perCapita": 44772.7,
      "popChangePct": 0.69
    },
    {
      "year": 2007,
      "gdp": 3105.89,
      "growth": 2.9,
      "perCapita": 50651.3,
      "popChangePct": 0.81
    },
    {
      "year": 2008,
      "gdp": 2976.398,
      "growth": 0,
      "perCapita": 48143.1,
      "popChangePct": 0.82
    },
    {
      "year": 2009,
      "gdp": 2438.053,
      "growth": -4.6,
      "perCapita": 39158.6,
      "popChangePct": 0.71
    },
    {
      "year": 2010,
      "gdp": 2499.193,
      "growth": 2.3,
      "perCapita": 39821.4,
      "popChangePct": 0.8
    },
    {
      "year": 2011,
      "gdp": 2676.507,
      "growth": 0.9,
      "perCapita": 42292.9,
      "popChangePct": 0.84
    },
    {
      "year": 2012,
      "gdp": 2720.2,
      "growth": 1.5,
      "perCapita": 42695.9,
      "popChangePct": 0.67
    },
    {
      "year": 2013,
      "gdp": 2798.728,
      "growth": 1.7,
      "perCapita": 43636.0,
      "popChangePct": 0.67
    },
    {
      "year": 2014,
      "gdp": 3086.969,
      "growth": 3.2,
      "perCapita": 47771.8,
      "popChangePct": 0.75
    },
    {
      "year": 2015,
      "gdp": 2946.231,
      "growth": 2.1,
      "perCapita": 45266.0,
      "popChangePct": 0.72
    },
    {
      "year": 2016,
      "gdp": 2716.852,
      "growth": 2.2,
      "perCapita": 41411.6,
      "popChangePct": 0.8
    },
    {
      "year": 2017,
      "gdp": 2701.37,
      "growth": 3,
      "perCapita": 40952.2,
      "popChangePct": 0.55
    },
    {
      "year": 2018,
      "gdp": 2900.745,
      "growth": 1.6,
      "perCapita": 43760.4,
      "popChangePct": 0.49
    },
    {
      "year": 2019,
      "gdp": 2877.392,
      "growth": 1.3,
      "perCapita": 43185.9,
      "popChangePct": 0.51
    },
    {
      "year": 2020,
      "gdp": 2725.948,
      "growth": -10,
      "perCapita": 40844.3,
      "popChangePct": 0.17
    },
    {
      "year": 2021,
      "gdp": 3195.327,
      "growth": 8.5,
      "perCapita": 47707.1,
      "popChangePct": 0.36
    },
    {
      "year": 2022,
      "gdp": 3192.851,
      "growth": 5.1,
      "perCapita": 47206.4,
      "popChangePct": 0.98
    },
    {
      "year": 2023,
      "gdp": 3422.072,
      "growth": 0.3,
      "perCapita": 49938.3,
      "popChangePct": 1.32
    },
    {
      "year": 2024,
      "gdp": 3695.355,
      "growth": 1.1,
      "perCapita": 53338.7,
      "popChangePct": 1.1
    },
    {
      "year": 2025,
      "gdp": 4003.022,
      "growth": 1.3,
      "perCapita": 57608.2,
      "popChangePct": 0.3
    },
    {
      "year": 2026,
      "gdp": 4264.794,
      "growth": 0.8,
      "perCapita": 61056.1,
      "popChangePct": 0.52
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 4466.076,
      "growth": 1.3,
      "perCapita": 63704.1,
      "popChangePct": 0.37
    },
    {
      "year": 2028,
      "gdp": 4675.048,
      "growth": 1.6,
      "perCapita": 66419.1,
      "popChangePct": 0.4
    },
    {
      "year": 2029,
      "gdp": 4898.448,
      "growth": 1.6,
      "perCapita": 69288.3,
      "popChangePct": 0.44
    },
    {
      "year": 2030,
      "gdp": 5148.434,
      "growth": 1.5,
      "perCapita": 72501.3,
      "popChangePct": 0.45
    },
    {
      "year": 2031,
      "gdp": 5403.155,
      "growth": 1.4,
      "perCapita": 75760.8,
      "popChangePct": 0.43
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 529.303,
      "perCapitaPPP": 9396.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 576.169,
      "perCapitaPPP": 10223.4,
      "perCapitaPPPChangePct": 8.8,
      "popChangePct": 0.05
    },
    {
      "year": 1982,
      "gdpPPP": 623.919,
      "perCapitaPPP": 11083.8,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": -0.12
    },
    {
      "year": 1983,
      "gdpPPP": 675.492,
      "perCapitaPPP": 11994.7,
      "perCapitaPPPChangePct": 8.22,
      "popChangePct": 0.04
    },
    {
      "year": 1984,
      "gdpPPP": 715.571,
      "perCapitaPPP": 12685.4,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 0.17
    },
    {
      "year": 1985,
      "gdpPPP": 768.456,
      "perCapitaPPP": 13588.0,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": 0.26
    },
    {
      "year": 1986,
      "gdpPPP": 808.347,
      "perCapitaPPP": 14260.6,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 0.23
    },
    {
      "year": 1987,
      "gdpPPP": 873.567,
      "perCapitaPPP": 15378.6,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 0.21
    },
    {
      "year": 1988,
      "gdpPPP": 953.405,
      "perCapitaPPP": 16751.1,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 0.2
    },
    {
      "year": 1989,
      "gdpPPP": 1014.799,
      "perCapitaPPP": 17779.5,
      "perCapitaPPPChangePct": 6.14,
      "popChangePct": 0.28
    },
    {
      "year": 1990,
      "gdpPPP": 1058.756,
      "perCapitaPPP": 18497.4,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 0.28
    },
    {
      "year": 1991,
      "gdpPPP": 1079.182,
      "perCapitaPPP": 18788.3,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 0.35
    },
    {
      "year": 1992,
      "gdpPPP": 1106.82,
      "perCapitaPPP": 19220.6,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 0.25
    },
    {
      "year": 1993,
      "gdpPPP": 1158.813,
      "perCapitaPPP": 20078.5,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 0.22
    },
    {
      "year": 1994,
      "gdpPPP": 1224.021,
      "perCapitaPPP": 21154.1,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.26
    },
    {
      "year": 1995,
      "gdpPPP": 1279.745,
      "perCapitaPPP": 22055.1,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 0.28
    },
    {
      "year": 1996,
      "gdpPPP": 1337.253,
      "perCapitaPPP": 22991.1,
      "perCapitaPPPChangePct": 4.24,
      "popChangePct": 0.24
    },
    {
      "year": 1997,
      "gdpPPP": 1426.695,
      "perCapitaPPP": 24465.7,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 0.26
    },
    {
      "year": 1998,
      "gdpPPP": 1489.567,
      "perCapitaPPP": 25473.6,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 0.28
    },
    {
      "year": 1999,
      "gdpPPP": 1555.125,
      "perCapitaPPP": 26500.0,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.36
    },
    {
      "year": 2000,
      "gdpPPP": 1662.305,
      "perCapitaPPP": 28229.2,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 0.34
    },
    {
      "year": 2001,
      "gdpPPP": 1740.375,
      "perCapitaPPP": 29441.5,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 0.39
    },
    {
      "year": 2002,
      "gdpPPP": 1797.627,
      "perCapitaPPP": 30280.4,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 0.43
    },
    {
      "year": 2003,
      "gdpPPP": 1892.115,
      "perCapitaPPP": 31727.2,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 0.46
    },
    {
      "year": 2004,
      "gdpPPP": 1988.186,
      "perCapitaPPP": 33164.1,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 0.52
    },
    {
      "year": 2005,
      "gdpPPP": 2107.755,
      "perCapitaPPP": 34889.1,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 0.77
    },
    {
      "year": 2006,
      "gdpPPP": 2220.336,
      "perCapitaPPP": 36502.5,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 0.69
    },
    {
      "year": 2007,
      "gdpPPP": 2347.33,
      "perCapitaPPP": 38280.6,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 0.81
    },
    {
      "year": 2008,
      "gdpPPP": 2391.367,
      "perCapitaPPP": 38680.2,
      "perCapitaPPPChangePct": 1.04,
      "popChangePct": 0.82
    },
    {
      "year": 2009,
      "gdpPPP": 2295.737,
      "perCapitaPPP": 36872.8,
      "perCapitaPPPChangePct": -4.67,
      "popChangePct": 0.71
    },
    {
      "year": 2010,
      "gdpPPP": 2376.165,
      "perCapitaPPP": 37861.1,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 0.8
    },
    {
      "year": 2011,
      "gdpPPP": 2445.841,
      "perCapitaPPP": 38648.0,
      "perCapitaPPPChangePct": 2.08,
      "popChangePct": 0.84
    },
    {
      "year": 2012,
      "gdpPPP": 2529.455,
      "perCapitaPPP": 39702.0,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 0.67
    },
    {
      "year": 2013,
      "gdpPPP": 2616.715,
      "perCapitaPPP": 40798.2,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 0.67
    },
    {
      "year": 2014,
      "gdpPPP": 2746.423,
      "perCapitaPPP": 42501.8,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.75
    },
    {
      "year": 2015,
      "gdpPPP": 2831.242,
      "perCapitaPPP": 43499.3,
      "perCapitaPPPChangePct": 2.35,
      "popChangePct": 0.72
    },
    {
      "year": 2016,
      "gdpPPP": 2921.21,
      "perCapitaPPP": 44526.6,
      "perCapitaPPPChangePct": 2.36,
      "popChangePct": 0.8
    },
    {
      "year": 2017,
      "gdpPPP": 3063.422,
      "perCapitaPPP": 46440.8,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 0.55
    },
    {
      "year": 2018,
      "gdpPPP": 3157.647,
      "perCapitaPPP": 47636.0,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 0.49
    },
    {
      "year": 2019,
      "gdpPPP": 3364.31,
      "perCapitaPPP": 50493.9,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 0.51
    },
    {
      "year": 2020,
      "gdpPPP": 3251.564,
      "perCapitaPPP": 48719.9,
      "perCapitaPPPChangePct": -3.51,
      "popChangePct": 0.17
    },
    {
      "year": 2021,
      "gdpPPP": 3601.593,
      "perCapitaPPP": 53772.8,
      "perCapitaPPPChangePct": 10.37,
      "popChangePct": 0.36
    },
    {
      "year": 2022,
      "gdpPPP": 4056.416,
      "perCapitaPPP": 59974.2,
      "perCapitaPPPChangePct": 11.53,
      "popChangePct": 0.98
    },
    {
      "year": 2023,
      "gdpPPP": 4217.932,
      "perCapitaPPP": 61552.3,
      "perCapitaPPPChangePct": 2.63,
      "popChangePct": 1.32
    },
    {
      "year": 2024,
      "gdpPPP": 4369.68,
      "perCapitaPPP": 63071.8,
      "perCapitaPPPChangePct": 2.47,
      "popChangePct": 1.1
    },
    {
      "year": 2025,
      "gdpPPP": 4553.105,
      "perCapitaPPP": 65524.6,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 0.3
    },
    {
      "year": 2026,
      "gdpPPP": 4720.863,
      "perCapitaPPP": 67585.3,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 0.52
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 4887.092,
      "perCapitaPPP": 69709.5,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 0.37
    },
    {
      "year": 2028,
      "gdpPPP": 5048.434,
      "perCapitaPPP": 71723.8,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 0.4
    },
    {
      "year": 2029,
      "gdpPPP": 5221.18,
      "perCapitaPPP": 73853.3,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 0.44
    },
    {
      "year": 2030,
      "gdpPPP": 5398.943,
      "perCapitaPPP": 76029.0,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 0.45
    },
    {
      "year": 2031,
      "gdpPPP": 5573.965,
      "perCapitaPPP": 78155.8,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 0.43
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function UnitedKingdomGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
