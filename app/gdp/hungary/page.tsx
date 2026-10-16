import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Hungary",
  "slug": "hungary",
  "iso3": "HUN",
  "region": "Europe",
  "rank2026": 55,
  "flagEmoji": "🇭🇺",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "New Zealand",
      "slug": "new-zealand",
      "rank": 54
    },
    {
      "name": "Iraq",
      "slug": "iraq",
      "rank": 56
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 23.117,
      "growth": 0.2,
      "perCapita": 2158.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 23.706,
      "growth": 2.9,
      "perCapita": 2214.3,
      "popChangePct": -0.04
    },
    {
      "year": 1982,
      "gdp": 24.142,
      "growth": 2.8,
      "perCapita": 2257.3,
      "popChangePct": -0.1
    },
    {
      "year": 1983,
      "gdp": 21.91,
      "growth": 0.7,
      "perCapita": 2053.1,
      "popChangePct": -0.22
    },
    {
      "year": 1984,
      "gdp": 21.243,
      "growth": 2.7,
      "perCapita": 1996.4,
      "popChangePct": -0.29
    },
    {
      "year": 1985,
      "gdp": 21.511,
      "growth": -0.3,
      "perCapita": 2029.6,
      "popChangePct": -0.39
    },
    {
      "year": 1986,
      "gdp": 24.778,
      "growth": 1.5,
      "perCapita": 2346.5,
      "popChangePct": -0.37
    },
    {
      "year": 1987,
      "gdp": 27.233,
      "growth": 4.1,
      "perCapita": 2591.3,
      "popChangePct": -0.48
    },
    {
      "year": 1988,
      "gdp": 29.8,
      "growth": -0.1,
      "perCapita": 2847.9,
      "popChangePct": -0.43
    },
    {
      "year": 1989,
      "gdp": 30.423,
      "growth": 0.7,
      "perCapita": 2919.2,
      "popChangePct": -0.4
    },
    {
      "year": 1990,
      "gdp": 34.478,
      "growth": -3.5,
      "perCapita": 3323.2,
      "popChangePct": -0.45
    },
    {
      "year": 1991,
      "gdp": 34.867,
      "growth": -11.9,
      "perCapita": 3361.2,
      "popChangePct": -0.02
    },
    {
      "year": 1992,
      "gdp": 38.857,
      "growth": -3.1,
      "perCapita": 3745.7,
      "popChangePct": 0.01
    },
    {
      "year": 1993,
      "gdp": 40.256,
      "growth": -0.6,
      "perCapita": 3883.7,
      "popChangePct": -0.09
    },
    {
      "year": 1994,
      "gdp": 43.308,
      "growth": 2.9,
      "perCapita": 4184.2,
      "popChangePct": -0.14
    },
    {
      "year": 1995,
      "gdp": 46.578,
      "growth": 2.5,
      "perCapita": 4505.9,
      "popChangePct": -0.13
    },
    {
      "year": 1996,
      "gdp": 46.834,
      "growth": 0.1,
      "perCapita": 4537.7,
      "popChangePct": -0.15
    },
    {
      "year": 1997,
      "gdp": 47.399,
      "growth": 3,
      "perCapita": 4601.4,
      "popChangePct": -0.19
    },
    {
      "year": 1998,
      "gdp": 48.784,
      "growth": 3.8,
      "perCapita": 4745.6,
      "popChangePct": -0.2
    },
    {
      "year": 1999,
      "gdp": 49.16,
      "growth": 3.1,
      "perCapita": 4794.7,
      "popChangePct": -0.26
    },
    {
      "year": 2000,
      "gdp": 47.276,
      "growth": 4.4,
      "perCapita": 4624.9,
      "popChangePct": -0.3
    },
    {
      "year": 2001,
      "gdp": 53.8,
      "growth": 4.1,
      "perCapita": 5274.5,
      "popChangePct": -0.22
    },
    {
      "year": 2002,
      "gdp": 67.636,
      "growth": 4.7,
      "perCapita": 6647.3,
      "popChangePct": -0.25
    },
    {
      "year": 2003,
      "gdp": 85.19,
      "growth": 3.9,
      "perCapita": 8399.8,
      "popChangePct": -0.32
    },
    {
      "year": 2004,
      "gdp": 104.015,
      "growth": 5,
      "perCapita": 10281.2,
      "popChangePct": -0.25
    },
    {
      "year": 2005,
      "gdp": 113.098,
      "growth": 4.3,
      "perCapita": 11200.1,
      "popChangePct": -0.19
    },
    {
      "year": 2006,
      "gdp": 115.604,
      "growth": 3.9,
      "perCapita": 11472.1,
      "popChangePct": -0.21
    },
    {
      "year": 2007,
      "gdp": 140.123,
      "growth": 0.3,
      "perCapita": 13920.5,
      "popChangePct": -0.11
    },
    {
      "year": 2008,
      "gdp": 158.228,
      "growth": 1,
      "perCapita": 15751.9,
      "popChangePct": -0.21
    },
    {
      "year": 2009,
      "gdp": 130.807,
      "growth": -6.7,
      "perCapita": 13040.3,
      "popChangePct": -0.14
    },
    {
      "year": 2010,
      "gdp": 131.899,
      "growth": 1.1,
      "perCapita": 13171.4,
      "popChangePct": -0.17
    },
    {
      "year": 2011,
      "gdp": 141.713,
      "growth": 1.9,
      "perCapita": 14191.1,
      "popChangePct": -0.28
    },
    {
      "year": 2012,
      "gdp": 128.47,
      "growth": -1.3,
      "perCapita": 12935.0,
      "popChangePct": -0.54
    },
    {
      "year": 2013,
      "gdp": 135.646,
      "growth": 2,
      "perCapita": 13708.5,
      "popChangePct": -0.37
    },
    {
      "year": 2014,
      "gdp": 141.129,
      "growth": 4.3,
      "perCapita": 14327.8,
      "popChangePct": -0.45
    },
    {
      "year": 2015,
      "gdp": 125.244,
      "growth": 3.7,
      "perCapita": 12759.2,
      "popChangePct": -0.35
    },
    {
      "year": 2016,
      "gdp": 128.984,
      "growth": 2.4,
      "perCapita": 13188.5,
      "popChangePct": -0.37
    },
    {
      "year": 2017,
      "gdp": 143.335,
      "growth": 4.1,
      "perCapita": 14716.1,
      "popChangePct": -0.41
    },
    {
      "year": 2018,
      "gdp": 161.185,
      "growth": 5.6,
      "perCapita": 16593.0,
      "popChangePct": -0.27
    },
    {
      "year": 2019,
      "gdp": 164.927,
      "growth": 5.1,
      "perCapita": 17002.8,
      "popChangePct": -0.14
    },
    {
      "year": 2020,
      "gdp": 158.468,
      "growth": -4.3,
      "perCapita": 16355.5,
      "popChangePct": -0.11
    },
    {
      "year": 2021,
      "gdp": 183.283,
      "growth": 7.2,
      "perCapita": 18991.1,
      "popChangePct": -0.39
    },
    {
      "year": 2022,
      "gdp": 177.784,
      "growth": 4.2,
      "perCapita": 18499.9,
      "popChangePct": -0.42
    },
    {
      "year": 2023,
      "gdp": 213.315,
      "growth": -0.8,
      "perCapita": 22220.3,
      "popChangePct": -0.1
    },
    {
      "year": 2024,
      "gdp": 222.878,
      "growth": 0.6,
      "perCapita": 23252.8,
      "popChangePct": -0.16
    },
    {
      "year": 2025,
      "gdp": 246.891,
      "growth": 0.4,
      "perCapita": 25825.6,
      "popChangePct": -0.26
    },
    {
      "year": 2026,
      "gdp": 271.122,
      "growth": 1.7,
      "perCapita": 28430.5,
      "popChangePct": -0.25
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 284.462,
      "growth": 2,
      "perCapita": 29902.5,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdp": 298.261,
      "growth": 2.3,
      "perCapita": 31432.1,
      "popChangePct": -0.25
    },
    {
      "year": 2029,
      "gdp": 313.46,
      "growth": 2.5,
      "perCapita": 33114.5,
      "popChangePct": -0.24
    },
    {
      "year": 2030,
      "gdp": 329.605,
      "growth": 2.5,
      "perCapita": 34905.1,
      "popChangePct": -0.24
    },
    {
      "year": 2031,
      "gdp": 346.359,
      "growth": 2.5,
      "perCapita": 36767.2,
      "popChangePct": -0.24
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 67.558,
      "perCapitaPPP": 6308.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 76.07,
      "perCapitaPPP": 7105.5,
      "perCapitaPPPChangePct": 12.64,
      "popChangePct": -0.04
    },
    {
      "year": 1982,
      "gdpPPP": 83.066,
      "perCapitaPPP": 7766.7,
      "perCapitaPPPChangePct": 9.31,
      "popChangePct": -0.1
    },
    {
      "year": 1983,
      "gdpPPP": 86.942,
      "perCapitaPPP": 8146.9,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": -0.22
    },
    {
      "year": 1984,
      "gdpPPP": 92.475,
      "perCapitaPPP": 8690.8,
      "perCapitaPPPChangePct": 6.68,
      "popChangePct": -0.29
    },
    {
      "year": 1985,
      "gdpPPP": 95.158,
      "perCapitaPPP": 8978.1,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": -0.39
    },
    {
      "year": 1986,
      "gdpPPP": 98.564,
      "perCapitaPPP": 9333.7,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": -0.37
    },
    {
      "year": 1987,
      "gdpPPP": 105.098,
      "perCapitaPPP": 10000.5,
      "perCapitaPPPChangePct": 7.14,
      "popChangePct": -0.48
    },
    {
      "year": 1988,
      "gdpPPP": 108.733,
      "perCapitaPPP": 10391.0,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": -0.43
    },
    {
      "year": 1989,
      "gdpPPP": 113.829,
      "perCapitaPPP": 10922.5,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": -0.4
    },
    {
      "year": 1990,
      "gdpPPP": 113.96,
      "perCapitaPPP": 10984.0,
      "perCapitaPPPChangePct": 0.56,
      "popChangePct": -0.45
    },
    {
      "year": 1991,
      "gdpPPP": 103.804,
      "perCapitaPPP": 10006.7,
      "perCapitaPPPChangePct": -8.9,
      "popChangePct": -0.02
    },
    {
      "year": 1992,
      "gdpPPP": 102.917,
      "perCapitaPPP": 9920.7,
      "perCapitaPPPChangePct": -0.86,
      "popChangePct": 0.01
    },
    {
      "year": 1993,
      "gdpPPP": 104.749,
      "perCapitaPPP": 10105.7,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": -0.09
    },
    {
      "year": 1994,
      "gdpPPP": 110.139,
      "perCapitaPPP": 10641.1,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": -0.14
    },
    {
      "year": 1995,
      "gdpPPP": 115.305,
      "perCapitaPPP": 11154.6,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": -0.13
    },
    {
      "year": 1996,
      "gdpPPP": 117.535,
      "perCapitaPPP": 11388.0,
      "perCapitaPPPChangePct": 2.09,
      "popChangePct": -0.15
    },
    {
      "year": 1997,
      "gdpPPP": 123.122,
      "perCapitaPPP": 11952.5,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": -0.19
    },
    {
      "year": 1998,
      "gdpPPP": 129.297,
      "perCapitaPPP": 12577.6,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": -0.2
    },
    {
      "year": 1999,
      "gdpPPP": 135.174,
      "perCapitaPPP": 13183.8,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": -0.26
    },
    {
      "year": 2000,
      "gdpPPP": 144.331,
      "perCapitaPPP": 14119.6,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": -0.3
    },
    {
      "year": 2001,
      "gdpPPP": 153.575,
      "perCapitaPPP": 15056.4,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": -0.22
    },
    {
      "year": 2002,
      "gdpPPP": 163.339,
      "perCapitaPPP": 16053.0,
      "perCapitaPPPChangePct": 6.62,
      "popChangePct": -0.25
    },
    {
      "year": 2003,
      "gdpPPP": 173.124,
      "perCapitaPPP": 17070.0,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": -0.32
    },
    {
      "year": 2004,
      "gdpPPP": 186.603,
      "perCapitaPPP": 18444.5,
      "perCapitaPPPChangePct": 8.05,
      "popChangePct": -0.25
    },
    {
      "year": 2005,
      "gdpPPP": 200.73,
      "perCapitaPPP": 19878.2,
      "perCapitaPPPChangePct": 7.77,
      "popChangePct": -0.19
    },
    {
      "year": 2006,
      "gdpPPP": 215.061,
      "perCapitaPPP": 21341.8,
      "perCapitaPPPChangePct": 7.36,
      "popChangePct": -0.21
    },
    {
      "year": 2007,
      "gdpPPP": 221.622,
      "perCapitaPPP": 22016.8,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": -0.11
    },
    {
      "year": 2008,
      "gdpPPP": 228.135,
      "perCapitaPPP": 22711.3,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": -0.21
    },
    {
      "year": 2009,
      "gdpPPP": 214.071,
      "perCapitaPPP": 21340.9,
      "perCapitaPPPChangePct": -6.03,
      "popChangePct": -0.14
    },
    {
      "year": 2010,
      "gdpPPP": 218.986,
      "perCapitaPPP": 21868.0,
      "perCapitaPPPChangePct": 2.47,
      "popChangePct": -0.17
    },
    {
      "year": 2011,
      "gdpPPP": 227.788,
      "perCapitaPPP": 22810.8,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": -0.28
    },
    {
      "year": 2012,
      "gdpPPP": 228.922,
      "perCapitaPPP": 23048.9,
      "perCapitaPPPChangePct": 1.04,
      "popChangePct": -0.54
    },
    {
      "year": 2013,
      "gdpPPP": 237.549,
      "perCapitaPPP": 24007.0,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": -0.37
    },
    {
      "year": 2014,
      "gdpPPP": 252.162,
      "perCapitaPPP": 25600.2,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": -0.45
    },
    {
      "year": 2015,
      "gdpPPP": 263.817,
      "perCapitaPPP": 26876.2,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": -0.35
    },
    {
      "year": 2016,
      "gdpPPP": 272.818,
      "perCapitaPPP": 27895.5,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": -0.37
    },
    {
      "year": 2017,
      "gdpPPP": 289.157,
      "perCapitaPPP": 29687.6,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": -0.41
    },
    {
      "year": 2018,
      "gdpPPP": 313.13,
      "perCapitaPPP": 32234.9,
      "perCapitaPPPChangePct": 8.58,
      "popChangePct": -0.27
    },
    {
      "year": 2019,
      "gdpPPP": 345.4,
      "perCapitaPPP": 35608.2,
      "perCapitaPPPChangePct": 10.46,
      "popChangePct": -0.14
    },
    {
      "year": 2020,
      "gdpPPP": 344.108,
      "perCapitaPPP": 35515.3,
      "perCapitaPPPChangePct": -0.26,
      "popChangePct": -0.11
    },
    {
      "year": 2021,
      "gdpPPP": 377.684,
      "perCapitaPPP": 39134.2,
      "perCapitaPPPChangePct": 10.19,
      "popChangePct": -0.39
    },
    {
      "year": 2022,
      "gdpPPP": 421.345,
      "perCapitaPPP": 43844.4,
      "perCapitaPPPChangePct": 12.04,
      "popChangePct": -0.42
    },
    {
      "year": 2023,
      "gdpPPP": 433.365,
      "perCapitaPPP": 45142.2,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": -0.1
    },
    {
      "year": 2024,
      "gdpPPP": 446.611,
      "perCapitaPPP": 46594.8,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": -0.16
    },
    {
      "year": 2025,
      "gdpPPP": 461.159,
      "perCapitaPPP": 48238.6,
      "perCapitaPPPChangePct": 3.53,
      "popChangePct": -0.26
    },
    {
      "year": 2026,
      "gdpPPP": 482.256,
      "perCapitaPPP": 50570.4,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": -0.25
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 502.948,
      "perCapitaPPP": 52869.7,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdpPPP": 522.798,
      "perCapitaPPP": 55094.6,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": -0.25
    },
    {
      "year": 2029,
      "gdpPPP": 545.453,
      "perCapitaPPP": 57622.6,
      "perCapitaPPPChangePct": 4.59,
      "popChangePct": -0.24
    },
    {
      "year": 2030,
      "gdpPPP": 569.423,
      "perCapitaPPP": 60301.7,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": -0.24
    },
    {
      "year": 2031,
      "gdpPPP": 594.258,
      "perCapitaPPP": 63082.5,
      "perCapitaPPPChangePct": 4.61,
      "popChangePct": -0.24
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function HungaryGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
