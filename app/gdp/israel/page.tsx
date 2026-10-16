import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Israel",
  "slug": "israel",
  "iso3": "ISR",
  "region": "Asia",
  "rank2026": 26,
  "flagEmoji": "🇮🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Sweden",
      "slug": "sweden",
      "rank": 25
    },
    {
      "name": "Argentina",
      "slug": "argentina",
      "rank": 27
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 25.043,
      "growth": 3.6,
      "perCapita": 6389.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 26.534,
      "growth": 4.7,
      "perCapita": 6721.6,
      "popChangePct": 0.71
    },
    {
      "year": 1982,
      "gdp": 28.438,
      "growth": 1.4,
      "perCapita": 7076.8,
      "popChangePct": 1.77
    },
    {
      "year": 1983,
      "gdp": 31.716,
      "growth": 2.6,
      "perCapita": 7728.3,
      "popChangePct": 2.14
    },
    {
      "year": 1984,
      "gdp": 30.025,
      "growth": 2.2,
      "perCapita": 7223.1,
      "popChangePct": 1.29
    },
    {
      "year": 1985,
      "gdp": 27.906,
      "growth": 4.5,
      "perCapita": 6596.1,
      "popChangePct": 1.78
    },
    {
      "year": 1986,
      "gdp": 34.354,
      "growth": 3.6,
      "perCapita": 7996.0,
      "popChangePct": 1.54
    },
    {
      "year": 1987,
      "gdp": 41.033,
      "growth": 7.5,
      "perCapita": 9397.2,
      "popChangePct": 1.63
    },
    {
      "year": 1988,
      "gdp": 50.83,
      "growth": 3.6,
      "perCapita": 11450.1,
      "popChangePct": 1.67
    },
    {
      "year": 1989,
      "gdp": 51.718,
      "growth": 1.4,
      "perCapita": 11452.9,
      "popChangePct": 1.73
    },
    {
      "year": 1990,
      "gdp": 61.027,
      "growth": 6.6,
      "perCapita": 13102.7,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdp": 69.228,
      "growth": 4.6,
      "perCapita": 13995.6,
      "popChangePct": 6.18
    },
    {
      "year": 1992,
      "gdp": 77.357,
      "growth": 7.2,
      "perCapita": 15098.4,
      "popChangePct": 3.6
    },
    {
      "year": 1993,
      "gdp": 77.748,
      "growth": 3.8,
      "perCapita": 14783.9,
      "popChangePct": 2.63
    },
    {
      "year": 1994,
      "gdp": 88.751,
      "growth": 7,
      "perCapita": 16451.8,
      "popChangePct": 2.59
    },
    {
      "year": 1995,
      "gdp": 105.432,
      "growth": 9.7,
      "perCapita": 19025.2,
      "popChangePct": 2.72
    },
    {
      "year": 1996,
      "gdp": 115.054,
      "growth": 5.8,
      "perCapita": 20249.4,
      "popChangePct": 2.53
    },
    {
      "year": 1997,
      "gdp": 119.391,
      "growth": 3.6,
      "perCapita": 20501.5,
      "popChangePct": 2.5
    },
    {
      "year": 1998,
      "gdp": 120.469,
      "growth": 4.1,
      "perCapita": 20188.3,
      "popChangePct": 2.46
    },
    {
      "year": 1999,
      "gdp": 121.329,
      "growth": 3.3,
      "perCapita": 19833.4,
      "popChangePct": 2.51
    },
    {
      "year": 2000,
      "gdp": 136.409,
      "growth": 8.6,
      "perCapita": 21700.8,
      "popChangePct": 2.76
    },
    {
      "year": 2001,
      "gdp": 134.891,
      "growth": 0.3,
      "perCapita": 20957.7,
      "popChangePct": 2.39
    },
    {
      "year": 2002,
      "gdp": 125.215,
      "growth": -0.2,
      "perCapita": 19068.6,
      "popChangePct": 2.04
    },
    {
      "year": 2003,
      "gdp": 131.278,
      "growth": 1.4,
      "perCapita": 19631.7,
      "popChangePct": 1.83
    },
    {
      "year": 2004,
      "gdp": 139.926,
      "growth": 4.7,
      "perCapita": 20558.8,
      "popChangePct": 1.78
    },
    {
      "year": 2005,
      "gdp": 147.346,
      "growth": 4.4,
      "perCapita": 21271.6,
      "popChangePct": 1.78
    },
    {
      "year": 2006,
      "gdp": 158.706,
      "growth": 5.6,
      "perCapita": 22506.2,
      "popChangePct": 1.8
    },
    {
      "year": 2007,
      "gdp": 184.45,
      "growth": 6.3,
      "perCapita": 25703.0,
      "popChangePct": 1.76
    },
    {
      "year": 2008,
      "gdp": 220.951,
      "growth": 3.2,
      "perCapita": 30240.2,
      "popChangePct": 1.83
    },
    {
      "year": 2009,
      "gdp": 213.111,
      "growth": 1.2,
      "perCapita": 28482.9,
      "popChangePct": 2.39
    },
    {
      "year": 2010,
      "gdp": 239.373,
      "growth": 5.5,
      "perCapita": 31410.4,
      "popChangePct": 1.86
    },
    {
      "year": 2011,
      "gdp": 267.739,
      "growth": 5.5,
      "perCapita": 34488.9,
      "popChangePct": 1.86
    },
    {
      "year": 2012,
      "gdp": 263.172,
      "growth": 2.4,
      "perCapita": 33282.5,
      "popChangePct": 1.85
    },
    {
      "year": 2013,
      "gdp": 298.045,
      "growth": 4.1,
      "perCapita": 36996.1,
      "popChangePct": 1.88
    },
    {
      "year": 2014,
      "gdp": 314.377,
      "growth": 3.7,
      "perCapita": 38282.3,
      "popChangePct": 1.94
    },
    {
      "year": 2015,
      "gdp": 302.839,
      "growth": 2.2,
      "perCapita": 36152.5,
      "popChangePct": 2.01
    },
    {
      "year": 2016,
      "gdp": 321.083,
      "growth": 4.5,
      "perCapita": 37582.5,
      "popChangePct": 1.98
    },
    {
      "year": 2017,
      "gdp": 357.361,
      "growth": 4.3,
      "perCapita": 41030.2,
      "popChangePct": 1.95
    },
    {
      "year": 2018,
      "gdp": 375.471,
      "growth": 4.1,
      "perCapita": 42285.3,
      "popChangePct": 1.94
    },
    {
      "year": 2019,
      "gdp": 399.209,
      "growth": 3.6,
      "perCapita": 44106.5,
      "popChangePct": 1.94
    },
    {
      "year": 2020,
      "gdp": 410.909,
      "growth": -1.8,
      "perCapita": 44594.5,
      "popChangePct": 1.8
    },
    {
      "year": 2021,
      "gdp": 489.736,
      "growth": 9.3,
      "perCapita": 52281.0,
      "popChangePct": 1.66
    },
    {
      "year": 2022,
      "gdp": 525.159,
      "growth": 6.4,
      "perCapita": 54983.9,
      "popChangePct": 1.96
    },
    {
      "year": 2023,
      "gdp": 513.394,
      "growth": 2.1,
      "perCapita": 52146.5,
      "popChangePct": 3.08
    },
    {
      "year": 2024,
      "gdp": 542.285,
      "growth": 1,
      "perCapita": 54294.2,
      "popChangePct": 1.45
    },
    {
      "year": 2025,
      "gdp": 610.778,
      "growth": 2.9,
      "perCapita": 60334.8,
      "popChangePct": 1.35
    },
    {
      "year": 2026,
      "gdp": 719.848,
      "growth": 3.5,
      "perCapita": 69803.9,
      "popChangePct": 1.87
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 761.058,
      "growth": 4.4,
      "perCapita": 72459.5,
      "popChangePct": 1.85
    },
    {
      "year": 2028,
      "gdp": 799.158,
      "growth": 3.7,
      "perCapita": 74719.5,
      "popChangePct": 1.83
    },
    {
      "year": 2029,
      "gdp": 837.127,
      "growth": 3.5,
      "perCapita": 76885.7,
      "popChangePct": 1.8
    },
    {
      "year": 2030,
      "gdp": 875.796,
      "growth": 3.4,
      "perCapita": 79014.9,
      "popChangePct": 1.8
    },
    {
      "year": 2031,
      "gdp": 916.264,
      "growth": 3.4,
      "perCapita": 81204.2,
      "popChangePct": 1.8
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 29.822,
      "perCapitaPPP": 7608.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 34.185,
      "perCapitaPPP": 8659.7,
      "perCapitaPPPChangePct": 13.82,
      "popChangePct": 0.71
    },
    {
      "year": 1982,
      "gdpPPP": 36.815,
      "perCapitaPPP": 9161.4,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 1.77
    },
    {
      "year": 1983,
      "gdpPPP": 39.246,
      "perCapitaPPP": 9563.2,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.14
    },
    {
      "year": 1984,
      "gdpPPP": 41.561,
      "perCapitaPPP": 9998.3,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 1.29
    },
    {
      "year": 1985,
      "gdpPPP": 44.784,
      "perCapitaPPP": 10585.5,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 1.78
    },
    {
      "year": 1986,
      "gdpPPP": 47.307,
      "perCapitaPPP": 11010.9,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 1.54
    },
    {
      "year": 1987,
      "gdpPPP": 52.111,
      "perCapitaPPP": 11934.3,
      "perCapitaPPPChangePct": 8.39,
      "popChangePct": 1.63
    },
    {
      "year": 1988,
      "gdpPPP": 55.871,
      "perCapitaPPP": 12585.8,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 1.67
    },
    {
      "year": 1989,
      "gdpPPP": 58.886,
      "perCapitaPPP": 13040.3,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 1.73
    },
    {
      "year": 1990,
      "gdpPPP": 65.142,
      "perCapitaPPP": 13986.1,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdpPPP": 70.455,
      "perCapitaPPP": 14243.8,
      "perCapitaPPPChangePct": 1.84,
      "popChangePct": 6.18
    },
    {
      "year": 1992,
      "gdpPPP": 77.217,
      "perCapitaPPP": 15071.0,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 3.6
    },
    {
      "year": 1993,
      "gdpPPP": 82.028,
      "perCapitaPPP": 15597.7,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 2.63
    },
    {
      "year": 1994,
      "gdpPPP": 89.653,
      "perCapitaPPP": 16619.1,
      "perCapitaPPPChangePct": 6.55,
      "popChangePct": 2.59
    },
    {
      "year": 1995,
      "gdpPPP": 100.369,
      "perCapitaPPP": 18111.7,
      "perCapitaPPPChangePct": 8.98,
      "popChangePct": 2.72
    },
    {
      "year": 1996,
      "gdpPPP": 108.176,
      "perCapitaPPP": 19039.0,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": 2.53
    },
    {
      "year": 1997,
      "gdpPPP": 114.015,
      "perCapitaPPP": 19578.3,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 2.5
    },
    {
      "year": 1998,
      "gdpPPP": 120.025,
      "perCapitaPPP": 20113.8,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": 2.46
    },
    {
      "year": 1999,
      "gdpPPP": 125.726,
      "perCapitaPPP": 20552.1,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": 2.51
    },
    {
      "year": 2000,
      "gdpPPP": 139.62,
      "perCapitaPPP": 22211.7,
      "perCapitaPPPChangePct": 8.07,
      "popChangePct": 2.76
    },
    {
      "year": 2001,
      "gdpPPP": 143.15,
      "perCapitaPPP": 22241.0,
      "perCapitaPPPChangePct": 0.13,
      "popChangePct": 2.39
    },
    {
      "year": 2002,
      "gdpPPP": 145.153,
      "perCapitaPPP": 22104.8,
      "perCapitaPPPChangePct": -0.61,
      "popChangePct": 2.04
    },
    {
      "year": 2003,
      "gdpPPP": 150.142,
      "perCapitaPPP": 22452.7,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 1.83
    },
    {
      "year": 2004,
      "gdpPPP": 161.349,
      "perCapitaPPP": 23706.3,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 1.78
    },
    {
      "year": 2005,
      "gdpPPP": 173.652,
      "perCapitaPPP": 25069.2,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": 1.78
    },
    {
      "year": 2006,
      "gdpPPP": 189.015,
      "perCapitaPPP": 26804.4,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 1.8
    },
    {
      "year": 2007,
      "gdpPPP": 206.392,
      "perCapitaPPP": 28760.6,
      "perCapitaPPPChangePct": 7.3,
      "popChangePct": 1.76
    },
    {
      "year": 2008,
      "gdpPPP": 217.133,
      "perCapitaPPP": 29717.7,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 1.83
    },
    {
      "year": 2009,
      "gdpPPP": 221.138,
      "perCapitaPPP": 29555.8,
      "perCapitaPPPChangePct": -0.54,
      "popChangePct": 2.39
    },
    {
      "year": 2010,
      "gdpPPP": 236.236,
      "perCapitaPPP": 30998.8,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 1.86
    },
    {
      "year": 2011,
      "gdpPPP": 254.403,
      "perCapitaPPP": 32771.0,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 1.86
    },
    {
      "year": 2012,
      "gdpPPP": 265.387,
      "perCapitaPPP": 33562.6,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": 1.85
    },
    {
      "year": 2013,
      "gdpPPP": 280.942,
      "perCapitaPPP": 34873.2,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 1.88
    },
    {
      "year": 2014,
      "gdpPPP": 296.463,
      "perCapitaPPP": 36100.9,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 1.94
    },
    {
      "year": 2015,
      "gdpPPP": 305.905,
      "perCapitaPPP": 36518.5,
      "perCapitaPPPChangePct": 1.16,
      "popChangePct": 2.01
    },
    {
      "year": 2016,
      "gdpPPP": 322.819,
      "perCapitaPPP": 37785.7,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": 1.98
    },
    {
      "year": 2017,
      "gdpPPP": 342.875,
      "perCapitaPPP": 39366.9,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 1.95
    },
    {
      "year": 2018,
      "gdpPPP": 356.214,
      "perCapitaPPP": 40116.6,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": 1.94
    },
    {
      "year": 2019,
      "gdpPPP": 372.817,
      "perCapitaPPP": 41190.5,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 1.94
    },
    {
      "year": 2020,
      "gdpPPP": 377.537,
      "perCapitaPPP": 40972.7,
      "perCapitaPPPChangePct": -0.53,
      "popChangePct": 1.8
    },
    {
      "year": 2021,
      "gdpPPP": 433.341,
      "perCapitaPPP": 46260.7,
      "perCapitaPPPChangePct": 12.91,
      "popChangePct": 1.66
    },
    {
      "year": 2022,
      "gdpPPP": 493.702,
      "perCapitaPPP": 51690.3,
      "perCapitaPPPChangePct": 11.74,
      "popChangePct": 1.96
    },
    {
      "year": 2023,
      "gdpPPP": 522.529,
      "perCapitaPPP": 53074.3,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 3.08
    },
    {
      "year": 2024,
      "gdpPPP": 540.608,
      "perCapitaPPP": 54126.2,
      "perCapitaPPPChangePct": 1.98,
      "popChangePct": 1.45
    },
    {
      "year": 2025,
      "gdpPPP": 572.239,
      "perCapitaPPP": 56527.8,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 1.35
    },
    {
      "year": 2026,
      "gdpPPP": 609.411,
      "perCapitaPPP": 59094.7,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 1.87
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 650.132,
      "perCapitaPPP": 61898.3,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 1.85
    },
    {
      "year": 2028,
      "gdpPPP": 685.532,
      "perCapitaPPP": 64095.7,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 1.83
    },
    {
      "year": 2029,
      "gdpPPP": 721.865,
      "perCapitaPPP": 66299.5,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 1.8
    },
    {
      "year": 2030,
      "gdpPPP": 760.037,
      "perCapitaPPP": 68571.0,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 1.8
    },
    {
      "year": 2031,
      "gdpPPP": 799.946,
      "perCapitaPPP": 70895.5,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 1.8
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IsraelGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
