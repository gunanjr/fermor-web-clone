import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bahrain",
  "slug": "bahrain",
  "iso3": "BHR",
  "region": "Asia",
  "rank2026": 103,
  "flagEmoji": "🇧🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Estonia",
      "slug": "estonia",
      "rank": 102
    },
    {
      "name": "Nepal",
      "slug": "nepal",
      "rank": 104
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.745,
      "growth": 7.5,
      "perCapita": 10622.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.228,
      "growth": 2.8,
      "perCapita": 11531.4,
      "popChangePct": 3.97
    },
    {
      "year": 1982,
      "gdp": 4.445,
      "growth": 6.4,
      "perCapita": 11698.6,
      "popChangePct": 3.54
    },
    {
      "year": 1983,
      "gdp": 4.554,
      "growth": 7,
      "perCapita": 11590.1,
      "popChangePct": 3.42
    },
    {
      "year": 1984,
      "gdp": 4.727,
      "growth": 4.2,
      "perCapita": 11637.8,
      "popChangePct": 3.31
    },
    {
      "year": 1985,
      "gdp": 4.46,
      "growth": -0.9,
      "perCapita": 10615.1,
      "popChangePct": 3.45
    },
    {
      "year": 1986,
      "gdp": 3.49,
      "growth": 0.5,
      "perCapita": 8022.8,
      "popChangePct": 3.57
    },
    {
      "year": 1987,
      "gdp": 3.78,
      "growth": -1.2,
      "perCapita": 8391.4,
      "popChangePct": 3.45
    },
    {
      "year": 1988,
      "gdp": 4.672,
      "growth": 6,
      "perCapita": 10010.9,
      "popChangePct": 3.78
    },
    {
      "year": 1989,
      "gdp": 4.873,
      "growth": 1,
      "perCapita": 10078.9,
      "popChangePct": 3.64
    },
    {
      "year": 1990,
      "gdp": 5.176,
      "growth": 3.5,
      "perCapita": 10612.2,
      "popChangePct": 0.83
    },
    {
      "year": 1991,
      "gdp": 5.43,
      "growth": 2.3,
      "perCapita": 10688.0,
      "popChangePct": 4.1
    },
    {
      "year": 1992,
      "gdp": 5.673,
      "growth": 7.1,
      "perCapita": 10984.6,
      "popChangePct": 1.57
    },
    {
      "year": 1993,
      "gdp": 6.241,
      "growth": 7.6,
      "perCapita": 11770.0,
      "popChangePct": 2.71
    },
    {
      "year": 1994,
      "gdp": 6.683,
      "growth": 3.2,
      "perCapita": 12277.5,
      "popChangePct": 2.64
    },
    {
      "year": 1995,
      "gdp": 7.075,
      "growth": 1.9,
      "perCapita": 12659.1,
      "popChangePct": 2.76
    },
    {
      "year": 1996,
      "gdp": 7.357,
      "growth": 3.2,
      "perCapita": 12821.3,
      "popChangePct": 2.68
    },
    {
      "year": 1997,
      "gdp": 7.629,
      "growth": 2.3,
      "perCapita": 12950.0,
      "popChangePct": 2.61
    },
    {
      "year": 1998,
      "gdp": 7.293,
      "growth": 4.8,
      "perCapita": 12057.5,
      "popChangePct": 2.72
    },
    {
      "year": 1999,
      "gdp": 7.905,
      "growth": 6,
      "perCapita": 12729.1,
      "popChangePct": 2.64
    },
    {
      "year": 2000,
      "gdp": 9.448,
      "growth": 7,
      "perCapita": 14818.6,
      "popChangePct": 2.74
    },
    {
      "year": 2001,
      "gdp": 9.579,
      "growth": 2.5,
      "perCapita": 14484.8,
      "popChangePct": 3.61
    },
    {
      "year": 2002,
      "gdp": 10.001,
      "growth": 3.3,
      "perCapita": 14075.3,
      "popChangePct": 7.56
    },
    {
      "year": 2003,
      "gdp": 11.546,
      "growth": 6.3,
      "perCapita": 15101.7,
      "popChangePct": 7.59
    },
    {
      "year": 2004,
      "gdp": 13.709,
      "growth": 7,
      "perCapita": 16642.4,
      "popChangePct": 7.71
    },
    {
      "year": 2005,
      "gdp": 16.647,
      "growth": 6.8,
      "perCapita": 18729.7,
      "popChangePct": 7.89
    },
    {
      "year": 2006,
      "gdp": 19.291,
      "growth": 6.5,
      "perCapita": 20086.4,
      "popChangePct": 7.99
    },
    {
      "year": 2007,
      "gdp": 22.653,
      "growth": 8.3,
      "perCapita": 21796.9,
      "popChangePct": 8.23
    },
    {
      "year": 2008,
      "gdp": 26.803,
      "growth": 6.2,
      "perCapita": 24289.6,
      "popChangePct": 6.16
    },
    {
      "year": 2009,
      "gdp": 23.913,
      "growth": 2.5,
      "perCapita": 20292.5,
      "popChangePct": 6.8
    },
    {
      "year": 2010,
      "gdp": 26.806,
      "growth": 4.3,
      "perCapita": 21819.3,
      "popChangePct": 4.33
    },
    {
      "year": 2011,
      "gdp": 29.915,
      "growth": 1.9,
      "perCapita": 25032.8,
      "popChangePct": -2.77
    },
    {
      "year": 2012,
      "gdp": 31.963,
      "growth": 3.8,
      "perCapita": 26438.7,
      "popChangePct": 1.17
    },
    {
      "year": 2013,
      "gdp": 33.823,
      "growth": 5.3,
      "perCapita": 26989.8,
      "popChangePct": 3.64
    },
    {
      "year": 2014,
      "gdp": 34.773,
      "growth": 4.3,
      "perCapita": 26451.8,
      "popChangePct": 4.95
    },
    {
      "year": 2015,
      "gdp": 32.523,
      "growth": 2.5,
      "perCapita": 23734.1,
      "popChangePct": 4.18
    },
    {
      "year": 2016,
      "gdp": 33.885,
      "growth": 3.8,
      "perCapita": 23800.0,
      "popChangePct": 3.94
    },
    {
      "year": 2017,
      "gdp": 37.205,
      "growth": 5,
      "perCapita": 24784.8,
      "popChangePct": 5.41
    },
    {
      "year": 2018,
      "gdp": 39.568,
      "growth": 2.1,
      "perCapita": 26324.4,
      "popChangePct": 0.13
    },
    {
      "year": 2019,
      "gdp": 40.447,
      "growth": 2.1,
      "perCapita": 27259.7,
      "popChangePct": -1.26
    },
    {
      "year": 2020,
      "gdp": 35.838,
      "growth": -5.9,
      "perCapita": 24342.8,
      "popChangePct": -0.81
    },
    {
      "year": 2021,
      "gdp": 40.84,
      "growth": 4.4,
      "perCapita": 27147.8,
      "popChangePct": 2.17
    },
    {
      "year": 2022,
      "gdp": 46.458,
      "growth": 6.2,
      "perCapita": 30470.5,
      "popChangePct": 1.4
    },
    {
      "year": 2023,
      "gdp": 46.192,
      "growth": 3.9,
      "perCapita": 29290.1,
      "popChangePct": 3.41
    },
    {
      "year": 2024,
      "gdp": 47.21,
      "growth": 2.9,
      "perCapita": 29716.4,
      "popChangePct": 0.76
    },
    {
      "year": 2025,
      "gdp": 47.538,
      "growth": 3.1,
      "perCapita": 29343.7,
      "popChangePct": 1.95
    },
    {
      "year": 2026,
      "gdp": 48.849,
      "growth": -0.5,
      "perCapita": 29569.2,
      "popChangePct": 1.98
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 50.994,
      "growth": 4.5,
      "perCapita": 30269.1,
      "popChangePct": 2.0
    },
    {
      "year": 2028,
      "gdp": 53.033,
      "growth": 2.8,
      "perCapita": 30868.9,
      "popChangePct": 1.96
    },
    {
      "year": 2029,
      "gdp": 55.441,
      "growth": 2.9,
      "perCapita": 31644.6,
      "popChangePct": 1.98
    },
    {
      "year": 2030,
      "gdp": 58.166,
      "growth": 3.1,
      "perCapita": 32555.4,
      "popChangePct": 2.0
    },
    {
      "year": 2031,
      "gdp": 61.074,
      "growth": 3.3,
      "perCapita": 33518.7,
      "popChangePct": 1.96
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.551,
      "perCapitaPPP": 18581.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 7.37,
      "perCapitaPPP": 20102.1,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 3.97
    },
    {
      "year": 1982,
      "gdpPPP": 8.327,
      "perCapitaPPP": 21916.3,
      "perCapitaPPPChangePct": 9.02,
      "popChangePct": 3.54
    },
    {
      "year": 1983,
      "gdpPPP": 9.259,
      "perCapitaPPP": 23563.9,
      "perCapitaPPPChangePct": 7.52,
      "popChangePct": 3.42
    },
    {
      "year": 1984,
      "gdpPPP": 9.994,
      "perCapitaPPP": 24607.3,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 3.31
    },
    {
      "year": 1985,
      "gdpPPP": 10.214,
      "perCapitaPPP": 24311.9,
      "perCapitaPPPChangePct": -1.2,
      "popChangePct": 3.45
    },
    {
      "year": 1986,
      "gdpPPP": 10.471,
      "perCapitaPPP": 24072.1,
      "perCapitaPPPChangePct": -0.99,
      "popChangePct": 3.57
    },
    {
      "year": 1987,
      "gdpPPP": 10.599,
      "perCapitaPPP": 23527.7,
      "perCapitaPPPChangePct": -2.26,
      "popChangePct": 3.45
    },
    {
      "year": 1988,
      "gdpPPP": 11.626,
      "perCapitaPPP": 24911.2,
      "perCapitaPPPChangePct": 5.88,
      "popChangePct": 3.78
    },
    {
      "year": 1989,
      "gdpPPP": 12.204,
      "perCapitaPPP": 25240.7,
      "perCapitaPPPChangePct": 1.32,
      "popChangePct": 3.64
    },
    {
      "year": 1990,
      "gdpPPP": 13.104,
      "perCapitaPPP": 26868.5,
      "perCapitaPPPChangePct": 6.45,
      "popChangePct": 0.83
    },
    {
      "year": 1991,
      "gdpPPP": 13.857,
      "perCapitaPPP": 27275.9,
      "perCapitaPPPChangePct": 1.52,
      "popChangePct": 4.1
    },
    {
      "year": 1992,
      "gdpPPP": 15.183,
      "perCapitaPPP": 29397.4,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": 1.57
    },
    {
      "year": 1993,
      "gdpPPP": 16.724,
      "perCapitaPPP": 31541.6,
      "perCapitaPPPChangePct": 7.29,
      "popChangePct": 2.71
    },
    {
      "year": 1994,
      "gdpPPP": 17.63,
      "perCapitaPPP": 32386.3,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 2.64
    },
    {
      "year": 1995,
      "gdpPPP": 18.346,
      "perCapitaPPP": 32825.8,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 2.76
    },
    {
      "year": 1996,
      "gdpPPP": 19.289,
      "perCapitaPPP": 33616.1,
      "perCapitaPPPChangePct": 2.41,
      "popChangePct": 2.68
    },
    {
      "year": 1997,
      "gdpPPP": 20.082,
      "perCapitaPPP": 34088.2,
      "perCapitaPPPChangePct": 1.4,
      "popChangePct": 2.61
    },
    {
      "year": 1998,
      "gdpPPP": 21.292,
      "perCapitaPPP": 35203.1,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 2.72
    },
    {
      "year": 1999,
      "gdpPPP": 22.883,
      "perCapitaPPP": 36849.7,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 2.64
    },
    {
      "year": 2000,
      "gdpPPP": 25.044,
      "perCapitaPPP": 39279.7,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 2.74
    },
    {
      "year": 2001,
      "gdpPPP": 26.246,
      "perCapitaPPP": 39687.2,
      "perCapitaPPPChangePct": 1.04,
      "popChangePct": 3.61
    },
    {
      "year": 2002,
      "gdpPPP": 27.546,
      "perCapitaPPP": 38767.2,
      "perCapitaPPPChangePct": -2.32,
      "popChangePct": 7.56
    },
    {
      "year": 2003,
      "gdpPPP": 29.859,
      "perCapitaPPP": 39055.6,
      "perCapitaPPPChangePct": 0.74,
      "popChangePct": 7.59
    },
    {
      "year": 2004,
      "gdpPPP": 32.802,
      "perCapitaPPP": 39820.8,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 7.71
    },
    {
      "year": 2005,
      "gdpPPP": 36.121,
      "perCapitaPPP": 40638.7,
      "perCapitaPPPChangePct": 2.05,
      "popChangePct": 7.89
    },
    {
      "year": 2006,
      "gdpPPP": 39.642,
      "perCapitaPPP": 41276.0,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 7.99
    },
    {
      "year": 2007,
      "gdpPPP": 44.094,
      "perCapitaPPP": 42426.4,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 8.23
    },
    {
      "year": 2008,
      "gdpPPP": 47.748,
      "perCapitaPPP": 43269.9,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 6.16
    },
    {
      "year": 2009,
      "gdpPPP": 49.263,
      "perCapitaPPP": 41804.6,
      "perCapitaPPPChangePct": -3.39,
      "popChangePct": 6.8
    },
    {
      "year": 2010,
      "gdpPPP": 52.024,
      "perCapitaPPP": 42346.4,
      "perCapitaPPPChangePct": 1.3,
      "popChangePct": 4.33
    },
    {
      "year": 2011,
      "gdpPPP": 54.122,
      "perCapitaPPP": 45289.2,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": -2.77
    },
    {
      "year": 2012,
      "gdpPPP": 57.226,
      "perCapitaPPP": 47334.6,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 1.17
    },
    {
      "year": 2013,
      "gdpPPP": 61.28,
      "perCapitaPPP": 48899.2,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 3.64
    },
    {
      "year": 2014,
      "gdpPPP": 65.034,
      "perCapitaPPP": 49471.9,
      "perCapitaPPPChangePct": 1.17,
      "popChangePct": 4.95
    },
    {
      "year": 2015,
      "gdpPPP": 67.284,
      "perCapitaPPP": 49100.5,
      "perCapitaPPPChangePct": -0.75,
      "popChangePct": 4.18
    },
    {
      "year": 2016,
      "gdpPPP": 70.514,
      "perCapitaPPP": 49527.9,
      "perCapitaPPPChangePct": 0.87,
      "popChangePct": 3.94
    },
    {
      "year": 2017,
      "gdpPPP": 75.333,
      "perCapitaPPP": 50184.5,
      "perCapitaPPPChangePct": 1.33,
      "popChangePct": 5.41
    },
    {
      "year": 2018,
      "gdpPPP": 78.15,
      "perCapitaPPP": 51993.1,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": 0.13
    },
    {
      "year": 2019,
      "gdpPPP": 83.98,
      "perCapitaPPP": 56599.5,
      "perCapitaPPPChangePct": 8.86,
      "popChangePct": -1.26
    },
    {
      "year": 2020,
      "gdpPPP": 78.669,
      "perCapitaPPP": 53436.0,
      "perCapitaPPPChangePct": -5.59,
      "popChangePct": -0.81
    },
    {
      "year": 2021,
      "gdpPPP": 82.672,
      "perCapitaPPP": 54954.7,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 2.17
    },
    {
      "year": 2022,
      "gdpPPP": 94.025,
      "perCapitaPPP": 61667.8,
      "perCapitaPPPChangePct": 12.22,
      "popChangePct": 1.4
    },
    {
      "year": 2023,
      "gdpPPP": 101.285,
      "perCapitaPPP": 64223.8,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 3.41
    },
    {
      "year": 2024,
      "gdpPPP": 106.806,
      "perCapitaPPP": 67230.0,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 0.76
    },
    {
      "year": 2025,
      "gdpPPP": 113.251,
      "perCapitaPPP": 69906.9,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 1.95
    },
    {
      "year": 2026,
      "gdpPPP": 115.915,
      "perCapitaPPP": 70164.9,
      "perCapitaPPPChangePct": 0.37,
      "popChangePct": 1.98
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 123.793,
      "perCapitaPPP": 73481.7,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 2.0
    },
    {
      "year": 2028,
      "gdpPPP": 129.32,
      "perCapitaPPP": 75273.9,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 1.96
    },
    {
      "year": 2029,
      "gdpPPP": 135.44,
      "perCapitaPPP": 77306.0,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 1.98
    },
    {
      "year": 2030,
      "gdpPPP": 142.201,
      "perCapitaPPP": 79589.2,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 2.0
    },
    {
      "year": 2031,
      "gdpPPP": 149.482,
      "perCapitaPPP": 82038.9,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.96
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BahrainGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
