import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Japan",
  "slug": "japan",
  "iso3": "JPN",
  "region": "Asia",
  "rank2026": 4,
  "flagEmoji": "🇯🇵",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Germany",
      "slug": "germany",
      "rank": 3
    },
    {
      "name": "United Kingdom",
      "slug": "united-kingdom",
      "rank": 5
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1155.182,
      "growth": 3.2,
      "perCapita": 9892.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1273.672,
      "growth": 4.3,
      "perCapita": 10828.4,
      "popChangePct": 0.73
    },
    {
      "year": 1982,
      "gdp": 1185.206,
      "growth": 3.3,
      "perCapita": 10005.9,
      "popChangePct": 0.7
    },
    {
      "year": 1983,
      "gdp": 1299.897,
      "growth": 3.6,
      "perCapita": 10898.7,
      "popChangePct": 0.69
    },
    {
      "year": 1984,
      "gdp": 1376.575,
      "growth": 4.4,
      "perCapita": 11466.7,
      "popChangePct": 0.65
    },
    {
      "year": 1985,
      "gdp": 1459.625,
      "growth": 5.2,
      "perCapita": 12082.9,
      "popChangePct": 0.62
    },
    {
      "year": 1986,
      "gdp": 2168.525,
      "growth": 3.3,
      "perCapita": 17855.9,
      "popChangePct": 0.53
    },
    {
      "year": 1987,
      "gdp": 2639.715,
      "growth": 4.6,
      "perCapita": 21631.6,
      "popChangePct": 0.48
    },
    {
      "year": 1988,
      "gdp": 3197.143,
      "growth": 6.7,
      "perCapita": 26088.9,
      "popChangePct": 0.42
    },
    {
      "year": 1989,
      "gdp": 3180.501,
      "growth": 4.9,
      "perCapita": 25851.8,
      "popChangePct": 0.39
    },
    {
      "year": 1990,
      "gdp": 3258.697,
      "growth": 4.8,
      "perCapita": 26399.4,
      "popChangePct": 0.33
    },
    {
      "year": 1991,
      "gdp": 3731.419,
      "growth": 3.5,
      "perCapita": 30109.5,
      "popChangePct": 0.4
    },
    {
      "year": 1992,
      "gdp": 4071.656,
      "growth": 0.9,
      "perCapita": 32739.0,
      "popChangePct": 0.35
    },
    {
      "year": 1993,
      "gdp": 4640.603,
      "growth": -0.5,
      "perCapita": 37193.3,
      "popChangePct": 0.32
    },
    {
      "year": 1994,
      "gdp": 5104.062,
      "growth": 0.9,
      "perCapita": 40794.5,
      "popChangePct": 0.28
    },
    {
      "year": 1995,
      "gdp": 5639.651,
      "growth": 2.3,
      "perCapita": 44960.3,
      "popChangePct": 0.26
    },
    {
      "year": 1996,
      "gdp": 5021.444,
      "growth": 3.1,
      "perCapita": 39944.3,
      "popChangePct": 0.22
    },
    {
      "year": 1997,
      "gdp": 4579.783,
      "growth": 1.4,
      "perCapita": 36344.3,
      "popChangePct": 0.24
    },
    {
      "year": 1998,
      "gdp": 4150.36,
      "growth": -1.8,
      "perCapita": 32848.5,
      "popChangePct": 0.27
    },
    {
      "year": 1999,
      "gdp": 4688.982,
      "growth": -0.3,
      "perCapita": 37041.6,
      "popChangePct": 0.19
    },
    {
      "year": 2000,
      "gdp": 5042.382,
      "growth": 3,
      "perCapita": 39756.6,
      "popChangePct": 0.19
    },
    {
      "year": 2001,
      "gdp": 4438.791,
      "growth": 0.3,
      "perCapita": 34914.7,
      "popChangePct": 0.24
    },
    {
      "year": 2002,
      "gdp": 4245.946,
      "growth": 0.1,
      "perCapita": 33327.6,
      "popChangePct": 0.21
    },
    {
      "year": 2003,
      "gdp": 4573.415,
      "growth": 1.4,
      "perCapita": 35832.1,
      "popChangePct": 0.18
    },
    {
      "year": 2004,
      "gdp": 4941.505,
      "growth": 2.1,
      "perCapita": 38685.8,
      "popChangePct": 0.08
    },
    {
      "year": 2005,
      "gdp": 4875.649,
      "growth": 1.8,
      "perCapita": 38165.0,
      "popChangePct": 0.01
    },
    {
      "year": 2006,
      "gdp": 4648.058,
      "growth": 1.5,
      "perCapita": 36385.1,
      "popChangePct": -0.0
    },
    {
      "year": 2007,
      "gdp": 4624.668,
      "growth": 1.7,
      "perCapita": 36198.8,
      "popChangePct": 0.01
    },
    {
      "year": 2008,
      "gdp": 5160.198,
      "growth": -1.2,
      "perCapita": 40411.2,
      "popChangePct": -0.05
    },
    {
      "year": 2009,
      "gdp": 5336.766,
      "growth": -5.9,
      "perCapita": 41840.4,
      "popChangePct": -0.11
    },
    {
      "year": 2010,
      "gdp": 5811.577,
      "growth": 4.1,
      "perCapita": 45547.3,
      "popChangePct": 0.03
    },
    {
      "year": 2011,
      "gdp": 6279.423,
      "growth": -0.2,
      "perCapita": 49122.9,
      "popChangePct": 0.19
    },
    {
      "year": 2012,
      "gdp": 6333.803,
      "growth": 1.6,
      "perCapita": 49656.7,
      "popChangePct": -0.22
    },
    {
      "year": 2013,
      "gdp": 5272.297,
      "growth": 2,
      "perCapita": 41405.7,
      "popChangePct": -0.17
    },
    {
      "year": 2014,
      "gdp": 4985.764,
      "growth": 0.9,
      "perCapita": 39221.1,
      "popChangePct": -0.17
    },
    {
      "year": 2015,
      "gdp": 4534.438,
      "growth": 1.8,
      "perCapita": 35710.6,
      "popChangePct": -0.11
    },
    {
      "year": 2016,
      "gdp": 5110.357,
      "growth": 0.7,
      "perCapita": 40251.7,
      "popChangePct": -0.01
    },
    {
      "year": 2017,
      "gdp": 5038.232,
      "growth": 1.6,
      "perCapita": 39750.6,
      "popChangePct": -0.17
    },
    {
      "year": 2018,
      "gdp": 5154.293,
      "growth": 0.8,
      "perCapita": 40746.9,
      "popChangePct": -0.2
    },
    {
      "year": 2019,
      "gdp": 5245.755,
      "growth": -0.3,
      "perCapita": 41560.2,
      "popChangePct": -0.22
    },
    {
      "year": 2020,
      "gdp": 5189.197,
      "growth": -4.3,
      "perCapita": 41233.6,
      "popChangePct": -0.29
    },
    {
      "year": 2021,
      "gdp": 5225.934,
      "growth": 3.6,
      "perCapita": 41643.6,
      "popChangePct": -0.28
    },
    {
      "year": 2022,
      "gdp": 4447.976,
      "growth": 1.3,
      "perCapita": 35566.0,
      "popChangePct": -0.34
    },
    {
      "year": 2023,
      "gdp": 4384.854,
      "growth": 0.7,
      "perCapita": 35224.7,
      "popChangePct": -0.46
    },
    {
      "year": 2024,
      "gdp": 4190.008,
      "growth": -0.2,
      "perCapita": 33820.3,
      "popChangePct": -0.48
    },
    {
      "year": 2025,
      "gdp": 4435.163,
      "growth": 1.2,
      "perCapita": 35973.2,
      "popChangePct": -0.48
    },
    {
      "year": 2026,
      "gdp": 4379.253,
      "growth": 0.7,
      "perCapita": 35703.4,
      "popChangePct": -0.52
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 4561.624,
      "growth": 0.6,
      "perCapita": 37390.8,
      "popChangePct": -0.54
    },
    {
      "year": 2028,
      "gdp": 4744.089,
      "growth": 0.6,
      "perCapita": 39104.2,
      "popChangePct": -0.56
    },
    {
      "year": 2029,
      "gdp": 4872.753,
      "growth": 0.6,
      "perCapita": 40397.9,
      "popChangePct": -0.58
    },
    {
      "year": 2030,
      "gdp": 5002.181,
      "growth": 0.6,
      "perCapita": 41720.2,
      "popChangePct": -0.6
    },
    {
      "year": 2031,
      "gdp": 5128.325,
      "growth": 0.6,
      "perCapita": 43038.1,
      "popChangePct": -0.62
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1046.261,
      "perCapitaPPP": 8960.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 1194.044,
      "perCapitaPPP": 10151.4,
      "perCapitaPPPChangePct": 13.3,
      "popChangePct": 0.73
    },
    {
      "year": 1982,
      "gdpPPP": 1309.411,
      "perCapitaPPP": 11054.4,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": 0.7
    },
    {
      "year": 1983,
      "gdpPPP": 1410.081,
      "perCapitaPPP": 11822.5,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 0.69
    },
    {
      "year": 1984,
      "gdpPPP": 1525.416,
      "perCapitaPPP": 12706.5,
      "perCapitaPPPChangePct": 7.48,
      "popChangePct": 0.65
    },
    {
      "year": 1985,
      "gdpPPP": 1654.85,
      "perCapitaPPP": 13699.0,
      "perCapitaPPPChangePct": 7.81,
      "popChangePct": 0.62
    },
    {
      "year": 1986,
      "gdpPPP": 1743.777,
      "perCapitaPPP": 14358.5,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.53
    },
    {
      "year": 1987,
      "gdpPPP": 1870.064,
      "perCapitaPPP": 15324.5,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 0.48
    },
    {
      "year": 1988,
      "gdpPPP": 2064.983,
      "perCapitaPPP": 16850.4,
      "perCapitaPPPChangePct": 9.96,
      "popChangePct": 0.42
    },
    {
      "year": 1989,
      "gdpPPP": 2251.665,
      "perCapitaPPP": 18302.0,
      "perCapitaPPPChangePct": 8.61,
      "popChangePct": 0.39
    },
    {
      "year": 1990,
      "gdpPPP": 2449.012,
      "perCapitaPPP": 19840.0,
      "perCapitaPPPChangePct": 8.4,
      "popChangePct": 0.33
    },
    {
      "year": 1991,
      "gdpPPP": 2621.053,
      "perCapitaPPP": 21149.7,
      "perCapitaPPPChangePct": 6.6,
      "popChangePct": 0.4
    },
    {
      "year": 1992,
      "gdpPPP": 2704.93,
      "perCapitaPPP": 21749.6,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.35
    },
    {
      "year": 1993,
      "gdpPPP": 2756.322,
      "perCapitaPPP": 22091.3,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 0.32
    },
    {
      "year": 1994,
      "gdpPPP": 2841.096,
      "perCapitaPPP": 22707.6,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 0.28
    },
    {
      "year": 1995,
      "gdpPPP": 2968.593,
      "perCapitaPPP": 23666.1,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 0.26
    },
    {
      "year": 1996,
      "gdpPPP": 3115.914,
      "perCapitaPPP": 24786.3,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 0.22
    },
    {
      "year": 1997,
      "gdpPPP": 3212.845,
      "perCapitaPPP": 25496.6,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 0.24
    },
    {
      "year": 1998,
      "gdpPPP": 3191.366,
      "perCapitaPPP": 25258.4,
      "perCapitaPPPChangePct": -0.93,
      "popChangePct": 0.27
    },
    {
      "year": 1999,
      "gdpPPP": 3225.274,
      "perCapitaPPP": 25478.7,
      "perCapitaPPPChangePct": 0.87,
      "popChangePct": 0.19
    },
    {
      "year": 2000,
      "gdpPPP": 3396.568,
      "perCapitaPPP": 26780.2,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": 0.19
    },
    {
      "year": 2001,
      "gdpPPP": 3482.929,
      "perCapitaPPP": 27396.1,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 0.24
    },
    {
      "year": 2002,
      "gdpPPP": 3540.062,
      "perCapitaPPP": 27786.9,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 0.21
    },
    {
      "year": 2003,
      "gdpPPP": 3659.772,
      "perCapitaPPP": 28673.9,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.18
    },
    {
      "year": 2004,
      "gdpPPP": 3837.587,
      "perCapitaPPP": 30043.5,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 0.08
    },
    {
      "year": 2005,
      "gdpPPP": 4031.081,
      "perCapitaPPP": 31554.0,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 0.01
    },
    {
      "year": 2006,
      "gdpPPP": 4219.65,
      "perCapitaPPP": 33031.5,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": -0.0
    },
    {
      "year": 2007,
      "gdpPPP": 4408.878,
      "perCapitaPPP": 34509.8,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.01
    },
    {
      "year": 2008,
      "gdpPPP": 4441.386,
      "perCapitaPPP": 34781.9,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": -0.05
    },
    {
      "year": 2009,
      "gdpPPP": 4203.514,
      "perCapitaPPP": 32955.7,
      "perCapitaPPPChangePct": -5.25,
      "popChangePct": -0.11
    },
    {
      "year": 2010,
      "gdpPPP": 4430.592,
      "perCapitaPPP": 34724.1,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 0.03
    },
    {
      "year": 2011,
      "gdpPPP": 4512.946,
      "perCapitaPPP": 35304.1,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 0.19
    },
    {
      "year": 2012,
      "gdpPPP": 4672.775,
      "perCapitaPPP": 36634.3,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": -0.22
    },
    {
      "year": 2013,
      "gdpPPP": 4847.222,
      "perCapitaPPP": 38067.4,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": -0.17
    },
    {
      "year": 2014,
      "gdpPPP": 4976.324,
      "perCapitaPPP": 39146.8,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": -0.17
    },
    {
      "year": 2015,
      "gdpPPP": 5112.912,
      "perCapitaPPP": 40266.3,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": -0.11
    },
    {
      "year": 2016,
      "gdpPPP": 5197.882,
      "perCapitaPPP": 40941.1,
      "perCapitaPPPChangePct": 1.68,
      "popChangePct": -0.01
    },
    {
      "year": 2017,
      "gdpPPP": 5376.868,
      "perCapitaPPP": 42422.4,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": -0.17
    },
    {
      "year": 2018,
      "gdpPPP": 5464.294,
      "perCapitaPPP": 43197.6,
      "perCapitaPPPChangePct": 1.83,
      "popChangePct": -0.2
    },
    {
      "year": 2019,
      "gdpPPP": 5539.374,
      "perCapitaPPP": 43886.4,
      "perCapitaPPPChangePct": 1.59,
      "popChangePct": -0.22
    },
    {
      "year": 2020,
      "gdpPPP": 5499.93,
      "perCapitaPPP": 43702.7,
      "perCapitaPPPChangePct": -0.42,
      "popChangePct": -0.29
    },
    {
      "year": 2021,
      "gdpPPP": 5811.791,
      "perCapitaPPP": 46312.1,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": -0.28
    },
    {
      "year": 2022,
      "gdpPPP": 6308.048,
      "perCapitaPPP": 50439.1,
      "perCapitaPPPChangePct": 8.91,
      "popChangePct": -0.34
    },
    {
      "year": 2023,
      "gdpPPP": 6588.598,
      "perCapitaPPP": 52927.9,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": -0.46
    },
    {
      "year": 2024,
      "gdpPPP": 6735.801,
      "perCapitaPPP": 54369.0,
      "perCapitaPPPChangePct": 2.72,
      "popChangePct": -0.48
    },
    {
      "year": 2025,
      "gdpPPP": 7009.525,
      "perCapitaPPP": 56853.5,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": -0.48
    },
    {
      "year": 2026,
      "gdpPPP": 7262.163,
      "perCapitaPPP": 59207.4,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": -0.52
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 7467.888,
      "perCapitaPPP": 61212.9,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": -0.54
    },
    {
      "year": 2028,
      "gdpPPP": 7637.915,
      "perCapitaPPP": 62957.2,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": -0.56
    },
    {
      "year": 2029,
      "gdpPPP": 7821.432,
      "perCapitaPPP": 64844.2,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": -0.58
    },
    {
      "year": 2030,
      "gdpPPP": 8014.063,
      "perCapitaPPP": 66840.5,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": -0.6
    },
    {
      "year": 2031,
      "gdpPPP": 8208.377,
      "perCapitaPPP": 68886.6,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": -0.62
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function JapanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
