import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "New Zealand",
  "slug": "new-zealand",
  "iso3": "NZL",
  "region": "Oceania",
  "rank2026": 54,
  "flagEmoji": "🇳🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Iran",
      "slug": "iran",
      "rank": 53
    },
    {
      "name": "Hungary",
      "slug": "hungary",
      "rank": 55
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 22.551,
      "growth": 1,
      "perCapita": 7255.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 23.472,
      "growth": 3,
      "perCapita": 7511.6,
      "popChangePct": 0.55
    },
    {
      "year": 1982,
      "gdp": 23.237,
      "growth": 2.9,
      "perCapita": 7378.9,
      "popChangePct": 0.77
    },
    {
      "year": 1983,
      "gdp": 22.484,
      "growth": -0.1,
      "perCapita": 7072.3,
      "popChangePct": 0.95
    },
    {
      "year": 1984,
      "gdp": 22.377,
      "growth": 6.9,
      "perCapita": 6968.5,
      "popChangePct": 1.01
    },
    {
      "year": 1985,
      "gdp": 22.539,
      "growth": 1.2,
      "perCapita": 6951.3,
      "popChangePct": 0.97
    },
    {
      "year": 1986,
      "gdp": 27.428,
      "growth": 1.8,
      "perCapita": 8383.0,
      "popChangePct": 0.93
    },
    {
      "year": 1987,
      "gdp": 36.978,
      "growth": 2.4,
      "perCapita": 11202.1,
      "popChangePct": 0.89
    },
    {
      "year": 1988,
      "gdp": 45.505,
      "growth": 0.6,
      "perCapita": 13659.1,
      "popChangePct": 0.91
    },
    {
      "year": 1989,
      "gdp": 44.132,
      "growth": 0.4,
      "perCapita": 13111.5,
      "popChangePct": 1.05
    },
    {
      "year": 1990,
      "gdp": 45.722,
      "growth": 0,
      "perCapita": 13425.0,
      "popChangePct": 1.19
    },
    {
      "year": 1991,
      "gdp": 43.44,
      "growth": -1.3,
      "perCapita": 12426.5,
      "popChangePct": 2.64
    },
    {
      "year": 1992,
      "gdp": 41.515,
      "growth": 0.7,
      "perCapita": 11750.8,
      "popChangePct": 1.06
    },
    {
      "year": 1993,
      "gdp": 44.807,
      "growth": 5.2,
      "perCapita": 12538.3,
      "popChangePct": 1.16
    },
    {
      "year": 1994,
      "gdp": 52.92,
      "growth": 5.6,
      "perCapita": 14612.3,
      "popChangePct": 1.34
    },
    {
      "year": 1995,
      "gdp": 62.241,
      "growth": 4.9,
      "perCapita": 16932.7,
      "popChangePct": 1.49
    },
    {
      "year": 1996,
      "gdp": 69.1,
      "growth": 4.1,
      "perCapita": 18506.1,
      "popChangePct": 1.58
    },
    {
      "year": 1997,
      "gdp": 68.869,
      "growth": 2.4,
      "perCapita": 18206.7,
      "popChangePct": 1.31
    },
    {
      "year": 1998,
      "gdp": 56.815,
      "growth": 0.4,
      "perCapita": 14889.5,
      "popChangePct": 0.87
    },
    {
      "year": 1999,
      "gdp": 58.898,
      "growth": 4.5,
      "perCapita": 15348.8,
      "popChangePct": 0.55
    },
    {
      "year": 2000,
      "gdp": 54.127,
      "growth": 4.2,
      "perCapita": 14021.9,
      "popChangePct": 0.6
    },
    {
      "year": 2001,
      "gdp": 53.128,
      "growth": 2.5,
      "perCapita": 13669.2,
      "popChangePct": 0.7
    },
    {
      "year": 2002,
      "gdp": 62.061,
      "growth": 4.7,
      "perCapita": 15706.9,
      "popChangePct": 1.65
    },
    {
      "year": 2003,
      "gdp": 82.408,
      "growth": 4.4,
      "perCapita": 20460.3,
      "popChangePct": 1.95
    },
    {
      "year": 2004,
      "gdp": 101.599,
      "growth": 4.8,
      "perCapita": 24848.8,
      "popChangePct": 1.51
    },
    {
      "year": 2005,
      "gdp": 113.265,
      "growth": 3.2,
      "perCapita": 27385.2,
      "popChangePct": 1.15
    },
    {
      "year": 2006,
      "gdp": 109.742,
      "growth": 2.8,
      "perCapita": 26220.8,
      "popChangePct": 1.18
    },
    {
      "year": 2007,
      "gdp": 134.85,
      "growth": 3.5,
      "perCapita": 31908.0,
      "popChangePct": 0.98
    },
    {
      "year": 2008,
      "gdp": 135.614,
      "growth": -0.2,
      "perCapita": 31819.4,
      "popChangePct": 0.85
    },
    {
      "year": 2009,
      "gdp": 122.003,
      "growth": -1.1,
      "perCapita": 28340.6,
      "popChangePct": 1.01
    },
    {
      "year": 2010,
      "gdp": 145.742,
      "growth": 1.7,
      "perCapita": 33480.9,
      "popChangePct": 1.11
    },
    {
      "year": 2011,
      "gdp": 167.151,
      "growth": 1.7,
      "perCapita": 38107.5,
      "popChangePct": 0.76
    },
    {
      "year": 2012,
      "gdp": 175.315,
      "growth": 2.5,
      "perCapita": 39747.7,
      "popChangePct": 0.57
    },
    {
      "year": 2013,
      "gdp": 187.226,
      "growth": 2.1,
      "perCapita": 42102.6,
      "popChangePct": 0.82
    },
    {
      "year": 2014,
      "gdp": 200.224,
      "growth": 3.8,
      "perCapita": 44300.3,
      "popChangePct": 1.64
    },
    {
      "year": 2015,
      "gdp": 176.375,
      "growth": 3.6,
      "perCapita": 38235.3,
      "popChangePct": 2.06
    },
    {
      "year": 2016,
      "gdp": 185.978,
      "growth": 4,
      "perCapita": 39431.4,
      "popChangePct": 2.25
    },
    {
      "year": 2017,
      "gdp": 203.663,
      "growth": 3.3,
      "perCapita": 42297.6,
      "popChangePct": 2.08
    },
    {
      "year": 2018,
      "gdp": 209.489,
      "growth": 3.3,
      "perCapita": 42744.1,
      "popChangePct": 1.79
    },
    {
      "year": 2019,
      "gdp": 210.962,
      "growth": 3,
      "perCapita": 42390.0,
      "popChangePct": 1.55
    },
    {
      "year": 2020,
      "gdp": 210.84,
      "growth": -1.2,
      "perCapita": 41600.5,
      "popChangePct": 1.83
    },
    {
      "year": 2021,
      "gdp": 249.72,
      "growth": 5.5,
      "perCapita": 49116.0,
      "popChangePct": 0.32
    },
    {
      "year": 2022,
      "gdp": 245.165,
      "growth": 2.6,
      "perCapita": 48165.1,
      "popChangePct": 0.12
    },
    {
      "year": 2023,
      "gdp": 253.65,
      "growth": 2.2,
      "perCapita": 48787.3,
      "popChangePct": 2.14
    },
    {
      "year": 2024,
      "gdp": 258.827,
      "growth": -0.3,
      "perCapita": 48929.4,
      "popChangePct": 1.75
    },
    {
      "year": 2025,
      "gdp": 258.832,
      "growth": 0.2,
      "perCapita": 48620.7,
      "popChangePct": 0.64
    },
    {
      "year": 2026,
      "gdp": 278.636,
      "growth": 2.1,
      "perCapita": 52023.0,
      "popChangePct": 0.6
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 290.452,
      "growth": 2.4,
      "perCapita": 53899.7,
      "popChangePct": 0.62
    },
    {
      "year": 2028,
      "gdp": 301.931,
      "growth": 2.4,
      "perCapita": 55689.7,
      "popChangePct": 0.61
    },
    {
      "year": 2029,
      "gdp": 314.363,
      "growth": 2.3,
      "perCapita": 57630.6,
      "popChangePct": 0.61
    },
    {
      "year": 2030,
      "gdp": 327.131,
      "growth": 2.2,
      "perCapita": 59607.2,
      "popChangePct": 0.6
    },
    {
      "year": 2031,
      "gdp": 339.935,
      "growth": 2.2,
      "perCapita": 61564.1,
      "popChangePct": 0.62
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 30.362,
      "perCapitaPPP": 9768.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 34.219,
      "perCapitaPPP": 10951.1,
      "perCapitaPPPChangePct": 12.11,
      "popChangePct": 0.55
    },
    {
      "year": 1982,
      "gdpPPP": 37.379,
      "perCapitaPPP": 11869.8,
      "perCapitaPPPChangePct": 8.39,
      "popChangePct": 0.77
    },
    {
      "year": 1983,
      "gdpPPP": 38.795,
      "perCapitaPPP": 12202.6,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 0.95
    },
    {
      "year": 1984,
      "gdpPPP": 42.951,
      "perCapitaPPP": 13375.5,
      "perCapitaPPPChangePct": 9.61,
      "popChangePct": 1.01
    },
    {
      "year": 1985,
      "gdpPPP": 44.847,
      "perCapitaPPP": 13831.6,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 0.97
    },
    {
      "year": 1986,
      "gdpPPP": 46.578,
      "perCapitaPPP": 14236.0,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.93
    },
    {
      "year": 1987,
      "gdpPPP": 48.895,
      "perCapitaPPP": 14812.3,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 0.89
    },
    {
      "year": 1988,
      "gdpPPP": 50.9,
      "perCapitaPPP": 15278.7,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 0.91
    },
    {
      "year": 1989,
      "gdpPPP": 53.129,
      "perCapitaPPP": 15784.7,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 1.05
    },
    {
      "year": 1990,
      "gdpPPP": 55.119,
      "perCapitaPPP": 16184.1,
      "perCapitaPPPChangePct": 2.53,
      "popChangePct": 1.19
    },
    {
      "year": 1991,
      "gdpPPP": 56.236,
      "perCapitaPPP": 16086.8,
      "perCapitaPPPChangePct": -0.6,
      "popChangePct": 2.64
    },
    {
      "year": 1992,
      "gdpPPP": 57.929,
      "perCapitaPPP": 16396.5,
      "perCapitaPPPChangePct": 1.93,
      "popChangePct": 1.06
    },
    {
      "year": 1993,
      "gdpPPP": 62.398,
      "perCapitaPPP": 17460.8,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 1.16
    },
    {
      "year": 1994,
      "gdpPPP": 67.279,
      "perCapitaPPP": 18577.0,
      "perCapitaPPPChangePct": 6.39,
      "popChangePct": 1.34
    },
    {
      "year": 1995,
      "gdpPPP": 72.064,
      "perCapitaPPP": 19604.9,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 1.49
    },
    {
      "year": 1996,
      "gdpPPP": 76.359,
      "perCapitaPPP": 20450.3,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 1.58
    },
    {
      "year": 1997,
      "gdpPPP": 79.574,
      "perCapitaPPP": 21036.9,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 1.31
    },
    {
      "year": 1998,
      "gdpPPP": 80.79,
      "perCapitaPPP": 21172.6,
      "perCapitaPPPChangePct": 0.65,
      "popChangePct": 0.87
    },
    {
      "year": 1999,
      "gdpPPP": 85.615,
      "perCapitaPPP": 22311.3,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.55
    },
    {
      "year": 2000,
      "gdpPPP": 91.243,
      "perCapitaPPP": 23636.8,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": 0.6
    },
    {
      "year": 2001,
      "gdpPPP": 95.653,
      "perCapitaPPP": 24610.4,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 0.7
    },
    {
      "year": 2002,
      "gdpPPP": 101.711,
      "perCapitaPPP": 25741.9,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 1.65
    },
    {
      "year": 2003,
      "gdpPPP": 108.309,
      "perCapitaPPP": 26891.0,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 1.95
    },
    {
      "year": 2004,
      "gdpPPP": 116.609,
      "perCapitaPPP": 28519.8,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 1.51
    },
    {
      "year": 2005,
      "gdpPPP": 124.132,
      "perCapitaPPP": 30012.5,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 1.15
    },
    {
      "year": 2006,
      "gdpPPP": 131.562,
      "perCapitaPPP": 31434.4,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 1.18
    },
    {
      "year": 2007,
      "gdpPPP": 139.84,
      "perCapitaPPP": 33088.8,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": 0.98
    },
    {
      "year": 2008,
      "gdpPPP": 142.307,
      "perCapitaPPP": 33389.7,
      "perCapitaPPPChangePct": 0.91,
      "popChangePct": 0.85
    },
    {
      "year": 2009,
      "gdpPPP": 141.671,
      "perCapitaPPP": 32909.3,
      "perCapitaPPPChangePct": -1.44,
      "popChangePct": 1.01
    },
    {
      "year": 2010,
      "gdpPPP": 145.89,
      "perCapitaPPP": 33514.9,
      "perCapitaPPPChangePct": 1.84,
      "popChangePct": 1.11
    },
    {
      "year": 2011,
      "gdpPPP": 151.432,
      "perCapitaPPP": 34523.8,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 0.76
    },
    {
      "year": 2012,
      "gdpPPP": 158.162,
      "perCapitaPPP": 35858.7,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 0.57
    },
    {
      "year": 2013,
      "gdpPPP": 164.282,
      "perCapitaPPP": 36943.0,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 0.82
    },
    {
      "year": 2014,
      "gdpPPP": 173.474,
      "perCapitaPPP": 38381.7,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.64
    },
    {
      "year": 2015,
      "gdpPPP": 181.469,
      "perCapitaPPP": 39339.5,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 2.06
    },
    {
      "year": 2016,
      "gdpPPP": 190.432,
      "perCapitaPPP": 40375.8,
      "perCapitaPPPChangePct": 2.63,
      "popChangePct": 2.25
    },
    {
      "year": 2017,
      "gdpPPP": 200.22,
      "perCapitaPPP": 41582.6,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 2.08
    },
    {
      "year": 2018,
      "gdpPPP": 205.647,
      "perCapitaPPP": 41960.3,
      "perCapitaPPPChangePct": 0.91,
      "popChangePct": 1.79
    },
    {
      "year": 2019,
      "gdpPPP": 222.73,
      "perCapitaPPP": 44754.5,
      "perCapitaPPPChangePct": 6.66,
      "popChangePct": 1.55
    },
    {
      "year": 2020,
      "gdpPPP": 227.948,
      "perCapitaPPP": 44976.1,
      "perCapitaPPPChangePct": 0.5,
      "popChangePct": 1.83
    },
    {
      "year": 2021,
      "gdpPPP": 242.45,
      "perCapitaPPP": 47686.0,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 0.32
    },
    {
      "year": 2022,
      "gdpPPP": 266.488,
      "perCapitaPPP": 52354.1,
      "perCapitaPPPChangePct": 9.79,
      "popChangePct": 0.12
    },
    {
      "year": 2023,
      "gdpPPP": 282.375,
      "perCapitaPPP": 54312.3,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 2.14
    },
    {
      "year": 2024,
      "gdpPPP": 288.555,
      "perCapitaPPP": 54549.2,
      "perCapitaPPPChangePct": 0.44,
      "popChangePct": 1.75
    },
    {
      "year": 2025,
      "gdpPPP": 297.264,
      "perCapitaPPP": 55839.9,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": 0.64
    },
    {
      "year": 2026,
      "gdpPPP": 312.297,
      "perCapitaPPP": 58307.5,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 0.6
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 326.761,
      "perCapitaPPP": 60637.6,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.62
    },
    {
      "year": 2028,
      "gdpPPP": 339.987,
      "perCapitaPPP": 62708.9,
      "perCapitaPPPChangePct": 3.42,
      "popChangePct": 0.61
    },
    {
      "year": 2029,
      "gdpPPP": 353.992,
      "perCapitaPPP": 64895.6,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 0.61
    },
    {
      "year": 2030,
      "gdpPPP": 368.396,
      "perCapitaPPP": 67126.1,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 0.6
    },
    {
      "year": 2031,
      "gdpPPP": 383.247,
      "perCapitaPPP": 69408.2,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 0.62
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NewZealandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
