import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Saint Lucia",
  "slug": "saint-lucia",
  "iso3": "LCA",
  "region": "Americas",
  "rank2026": 188,
  "flagEmoji": "🇱🇨",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Gambia",
      "slug": "gambia",
      "rank": 187
    },
    {
      "name": "San Marino",
      "slug": "san-marino",
      "rank": 189
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.17,
      "growth": -0.5,
      "perCapita": 1411.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.194,
      "growth": 5.1,
      "perCapita": 1589.1,
      "popChangePct": 0.83
    },
    {
      "year": 1982,
      "gdp": 0.183,
      "growth": 2.1,
      "perCapita": 1479.3,
      "popChangePct": 1.64
    },
    {
      "year": 1983,
      "gdp": 0.197,
      "growth": 4.1,
      "perCapita": 1571.3,
      "popChangePct": 0.81
    },
    {
      "year": 1984,
      "gdp": 0.251,
      "growth": 8,
      "perCapita": 1976.2,
      "popChangePct": 1.6
    },
    {
      "year": 1985,
      "gdp": 0.284,
      "growth": 12.6,
      "perCapita": 2200.8,
      "popChangePct": 1.57
    },
    {
      "year": 1986,
      "gdp": 0.34,
      "growth": 14.4,
      "perCapita": 2589.1,
      "popChangePct": 1.55
    },
    {
      "year": 1987,
      "gdp": 0.375,
      "growth": 3.9,
      "perCapita": 2816.4,
      "popChangePct": 1.53
    },
    {
      "year": 1988,
      "gdp": 0.429,
      "growth": 13.9,
      "perCapita": 3180.6,
      "popChangePct": 1.5
    },
    {
      "year": 1989,
      "gdp": 0.486,
      "growth": 9,
      "perCapita": 3563.6,
      "popChangePct": 1.48
    },
    {
      "year": 1990,
      "gdp": 0.579,
      "growth": 9.9,
      "perCapita": 4201.0,
      "popChangePct": 0.73
    },
    {
      "year": 1991,
      "gdp": 0.613,
      "growth": 0.4,
      "perCapita": 4394.2,
      "popChangePct": 1.45
    },
    {
      "year": 1992,
      "gdp": 0.674,
      "growth": 8,
      "perCapita": 4755.8,
      "popChangePct": 1.43
    },
    {
      "year": 1993,
      "gdp": 0.684,
      "growth": 0.6,
      "perCapita": 4760.9,
      "popChangePct": 1.41
    },
    {
      "year": 1994,
      "gdp": 0.713,
      "growth": 1.6,
      "perCapita": 4888.4,
      "popChangePct": 1.39
    },
    {
      "year": 1995,
      "gdp": 0.762,
      "growth": 1.7,
      "perCapita": 5143.2,
      "popChangePct": 1.37
    },
    {
      "year": 1996,
      "gdp": 0.788,
      "growth": 2.9,
      "perCapita": 5240.0,
      "popChangePct": 1.35
    },
    {
      "year": 1997,
      "gdp": 0.805,
      "growth": -0.7,
      "perCapita": 5279.5,
      "popChangePct": 2.0
    },
    {
      "year": 1998,
      "gdp": 0.877,
      "growth": 6.3,
      "perCapita": 5667.5,
      "popChangePct": 1.31
    },
    {
      "year": 1999,
      "gdp": 0.921,
      "growth": 2.7,
      "perCapita": 5879.2,
      "popChangePct": 1.29
    },
    {
      "year": 2000,
      "gdp": 0.932,
      "growth": 0,
      "perCapita": 5875.9,
      "popChangePct": 1.27
    },
    {
      "year": 2001,
      "gdp": 0.892,
      "growth": -3.4,
      "perCapita": 5565.6,
      "popChangePct": 0.63
    },
    {
      "year": 2002,
      "gdp": 0.899,
      "growth": 0.4,
      "perCapita": 5563.7,
      "popChangePct": 1.25
    },
    {
      "year": 2003,
      "gdp": 0.987,
      "growth": 4.3,
      "perCapita": 6054.5,
      "popChangePct": 0.62
    },
    {
      "year": 2004,
      "gdp": 1.066,
      "growth": 7.3,
      "perCapita": 6490.8,
      "popChangePct": 0.61
    },
    {
      "year": 2005,
      "gdp": 1.135,
      "growth": -0.4,
      "perCapita": 6859.3,
      "popChangePct": 0.61
    },
    {
      "year": 2006,
      "gdp": 1.267,
      "growth": 6.5,
      "perCapita": 7605.7,
      "popChangePct": 1.21
    },
    {
      "year": 2007,
      "gdp": 1.331,
      "growth": 1.9,
      "perCapita": 7931.5,
      "popChangePct": 0.6
    },
    {
      "year": 2008,
      "gdp": 1.426,
      "growth": 4.9,
      "perCapita": 8450.3,
      "popChangePct": 0.6
    },
    {
      "year": 2009,
      "gdp": 1.4,
      "growth": -1.9,
      "perCapita": 8239.1,
      "popChangePct": 0.59
    },
    {
      "year": 2010,
      "gdp": 1.483,
      "growth": 0.5,
      "perCapita": 8676.8,
      "popChangePct": 0.59
    },
    {
      "year": 2011,
      "gdp": 1.569,
      "growth": 4.9,
      "perCapita": 9131.2,
      "popChangePct": 0.58
    },
    {
      "year": 2012,
      "gdp": 1.598,
      "growth": -0.4,
      "perCapita": 9259.7,
      "popChangePct": 0.58
    },
    {
      "year": 2013,
      "gdp": 1.66,
      "growth": -2.2,
      "perCapita": 9577.2,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 1.749,
      "growth": 1.3,
      "perCapita": 10044.8,
      "popChangePct": 0.58
    },
    {
      "year": 2015,
      "gdp": 1.808,
      "growth": -0.2,
      "perCapita": 10335.0,
      "popChangePct": 0.57
    },
    {
      "year": 2016,
      "gdp": 1.869,
      "growth": 3.8,
      "perCapita": 10638.1,
      "popChangePct": 0.57
    },
    {
      "year": 2017,
      "gdp": 1.999,
      "growth": 3.4,
      "perCapita": 11333.1,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 2.061,
      "growth": 2.9,
      "perCapita": 11642.7,
      "popChangePct": 0.57
    },
    {
      "year": 2019,
      "gdp": 2.095,
      "growth": -0.7,
      "perCapita": 11794.2,
      "popChangePct": 0.56
    },
    {
      "year": 2020,
      "gdp": 1.511,
      "growth": -23.8,
      "perCapita": 8479.0,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 1.869,
      "growth": 11.3,
      "perCapita": 10470.7,
      "popChangePct": 0.56
    },
    {
      "year": 2022,
      "gdp": 2.334,
      "growth": 20.6,
      "perCapita": 13052.9,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 2.397,
      "growth": 3.3,
      "perCapita": 13367.1,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 2.574,
      "growth": 4.7,
      "perCapita": 14269.8,
      "popChangePct": 0.56
    },
    {
      "year": 2025,
      "gdp": 2.651,
      "growth": 1.7,
      "perCapita": 14602.8,
      "popChangePct": 1.11
    },
    {
      "year": 2026,
      "gdp": 2.765,
      "growth": 2,
      "perCapita": 15135.3,
      "popChangePct": 0.55
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2.891,
      "growth": 1.7,
      "perCapita": 15723.5,
      "popChangePct": 0.55
    },
    {
      "year": 2028,
      "gdp": 3.021,
      "growth": 1.6,
      "perCapita": 16328.2,
      "popChangePct": 0.54
    },
    {
      "year": 2029,
      "gdp": 3.154,
      "growth": 1.6,
      "perCapita": 16939.8,
      "popChangePct": 0.54
    },
    {
      "year": 2030,
      "gdp": 3.284,
      "growth": 1.5,
      "perCapita": 17527.4,
      "popChangePct": 0.54
    },
    {
      "year": 2031,
      "gdp": 3.433,
      "growth": 1.5,
      "perCapita": 18209.2,
      "popChangePct": 1.07
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.301,
      "perCapitaPPP": 2497.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.346,
      "perCapitaPPP": 2834.6,
      "perCapitaPPPChangePct": 13.5,
      "popChangePct": 0.83
    },
    {
      "year": 1982,
      "gdpPPP": 0.376,
      "perCapitaPPP": 3033.8,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": 1.64
    },
    {
      "year": 1983,
      "gdpPPP": 0.406,
      "perCapitaPPP": 3238.2,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 0.81
    },
    {
      "year": 1984,
      "gdpPPP": 0.454,
      "perCapitaPPP": 3573.5,
      "perCapitaPPPChangePct": 10.35,
      "popChangePct": 1.6
    },
    {
      "year": 1985,
      "gdpPPP": 0.528,
      "perCapitaPPP": 4086.6,
      "perCapitaPPPChangePct": 14.36,
      "popChangePct": 1.57
    },
    {
      "year": 1986,
      "gdpPPP": 0.616,
      "perCapitaPPP": 4693.7,
      "perCapitaPPPChangePct": 14.86,
      "popChangePct": 1.55
    },
    {
      "year": 1987,
      "gdpPPP": 0.656,
      "perCapitaPPP": 4924.2,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 1.53
    },
    {
      "year": 1988,
      "gdpPPP": 0.774,
      "perCapitaPPP": 5730.1,
      "perCapitaPPPChangePct": 16.37,
      "popChangePct": 1.5
    },
    {
      "year": 1989,
      "gdpPPP": 0.876,
      "perCapitaPPP": 6417.8,
      "perCapitaPPPChangePct": 12.0,
      "popChangePct": 1.48
    },
    {
      "year": 1990,
      "gdpPPP": 0.999,
      "perCapitaPPP": 7245.1,
      "perCapitaPPPChangePct": 12.89,
      "popChangePct": 0.73
    },
    {
      "year": 1991,
      "gdpPPP": 1.036,
      "perCapitaPPP": 7428.7,
      "perCapitaPPPChangePct": 2.53,
      "popChangePct": 1.45
    },
    {
      "year": 1992,
      "gdpPPP": 1.144,
      "perCapitaPPP": 8080.7,
      "perCapitaPPPChangePct": 8.78,
      "popChangePct": 1.43
    },
    {
      "year": 1993,
      "gdpPPP": 1.178,
      "perCapitaPPP": 8198.4,
      "perCapitaPPPChangePct": 1.46,
      "popChangePct": 1.41
    },
    {
      "year": 1994,
      "gdpPPP": 1.223,
      "perCapitaPPP": 8381.2,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 1.39
    },
    {
      "year": 1995,
      "gdpPPP": 1.27,
      "perCapitaPPP": 8570.4,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 1.37
    },
    {
      "year": 1996,
      "gdpPPP": 1.331,
      "perCapitaPPP": 8849.3,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 1.35
    },
    {
      "year": 1997,
      "gdpPPP": 1.345,
      "perCapitaPPP": 8814.5,
      "perCapitaPPPChangePct": -0.39,
      "popChangePct": 2.0
    },
    {
      "year": 1998,
      "gdpPPP": 1.445,
      "perCapitaPPP": 9344.7,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.31
    },
    {
      "year": 1999,
      "gdpPPP": 1.505,
      "perCapitaPPP": 9604.3,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 1.29
    },
    {
      "year": 2000,
      "gdpPPP": 1.54,
      "perCapitaPPP": 9708.1,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 1.27
    },
    {
      "year": 2001,
      "gdpPPP": 1.521,
      "perCapitaPPP": 9491.3,
      "perCapitaPPPChangePct": -2.23,
      "popChangePct": 0.63
    },
    {
      "year": 2002,
      "gdpPPP": 1.551,
      "perCapitaPPP": 9594.9,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": 1.25
    },
    {
      "year": 2003,
      "gdpPPP": 1.649,
      "perCapitaPPP": 10118.0,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 0.62
    },
    {
      "year": 2004,
      "gdpPPP": 1.816,
      "perCapitaPPP": 11059.6,
      "perCapitaPPPChangePct": 9.31,
      "popChangePct": 0.61
    },
    {
      "year": 2005,
      "gdpPPP": 1.866,
      "perCapitaPPP": 11276.4,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 0.61
    },
    {
      "year": 2006,
      "gdpPPP": 2.047,
      "perCapitaPPP": 12287.0,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": 1.21
    },
    {
      "year": 2007,
      "gdpPPP": 2.144,
      "perCapitaPPP": 12779.4,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 0.6
    },
    {
      "year": 2008,
      "gdpPPP": 2.292,
      "perCapitaPPP": 13576.4,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 0.6
    },
    {
      "year": 2009,
      "gdpPPP": 2.262,
      "perCapitaPPP": 13318.8,
      "perCapitaPPPChangePct": -1.9,
      "popChangePct": 0.59
    },
    {
      "year": 2010,
      "gdpPPP": 2.302,
      "perCapitaPPP": 13467.2,
      "perCapitaPPPChangePct": 1.11,
      "popChangePct": 0.59
    },
    {
      "year": 2011,
      "gdpPPP": 2.463,
      "perCapitaPPP": 14338.3,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 0.58
    },
    {
      "year": 2012,
      "gdpPPP": 2.5,
      "perCapitaPPP": 14483.7,
      "perCapitaPPPChangePct": 1.01,
      "popChangePct": 0.58
    },
    {
      "year": 2013,
      "gdpPPP": 2.486,
      "perCapitaPPP": 14337.9,
      "perCapitaPPPChangePct": -1.01,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 2.562,
      "perCapitaPPP": 14712.3,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 0.58
    },
    {
      "year": 2015,
      "gdpPPP": 2.58,
      "perCapitaPPP": 14748.3,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 0.57
    },
    {
      "year": 2016,
      "gdpPPP": 2.703,
      "perCapitaPPP": 15389.8,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 0.57
    },
    {
      "year": 2017,
      "gdpPPP": 2.845,
      "perCapitaPPP": 16131.0,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 3.086,
      "perCapitaPPP": 17433.3,
      "perCapitaPPPChangePct": 8.07,
      "popChangePct": 0.57
    },
    {
      "year": 2019,
      "gdpPPP": 3.324,
      "perCapitaPPP": 18710.2,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 0.56
    },
    {
      "year": 2020,
      "gdpPPP": 2.68,
      "perCapitaPPP": 15032.6,
      "perCapitaPPPChangePct": -19.66,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 3.414,
      "perCapitaPPP": 19122.2,
      "perCapitaPPPChangePct": 27.21,
      "popChangePct": 0.56
    },
    {
      "year": 2022,
      "gdpPPP": 4.409,
      "perCapitaPPP": 24658.9,
      "perCapitaPPPChangePct": 28.95,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 4.721,
      "perCapitaPPP": 26333.4,
      "perCapitaPPPChangePct": 6.79,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 5.065,
      "perCapitaPPP": 28075.3,
      "perCapitaPPPChangePct": 6.61,
      "popChangePct": 0.56
    },
    {
      "year": 2025,
      "gdpPPP": 5.295,
      "perCapitaPPP": 29165.5,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 1.11
    },
    {
      "year": 2026,
      "gdpPPP": 5.554,
      "perCapitaPPP": 30398.5,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 0.55
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 5.772,
      "perCapitaPPP": 31396.6,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 0.55
    },
    {
      "year": 2028,
      "gdpPPP": 5.963,
      "perCapitaPPP": 32234.2,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 0.54
    },
    {
      "year": 2029,
      "gdpPPP": 6.165,
      "perCapitaPPP": 33113.2,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 0.54
    },
    {
      "year": 2030,
      "gdpPPP": 6.371,
      "perCapitaPPP": 34009.1,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 0.54
    },
    {
      "year": 2031,
      "gdpPPP": 6.584,
      "perCapitaPPP": 34922.4,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 1.07
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SaintLuciaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
