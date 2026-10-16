import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Australia",
  "slug": "australia",
  "iso3": "AUS",
  "region": "Oceania",
  "rank2026": 12,
  "flagEmoji": "🇦🇺",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Canada",
      "slug": "canada",
      "rank": 11
    },
    {
      "name": "Mexico",
      "slug": "mexico",
      "rank": 13
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 163.135,
      "growth": 2.9,
      "perCapita": 11021.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 188.653,
      "growth": 4.1,
      "perCapita": 12544.1,
      "popChangePct": 1.6
    },
    {
      "year": 1982,
      "gdp": 187.291,
      "growth": 0.1,
      "perCapita": 12250.1,
      "popChangePct": 1.66
    },
    {
      "year": 1983,
      "gdp": 179.709,
      "growth": -0.5,
      "perCapita": 11606.5,
      "popChangePct": 1.27
    },
    {
      "year": 1984,
      "gdp": 197.39,
      "growth": 6.3,
      "perCapita": 12590.9,
      "popChangePct": 1.25
    },
    {
      "year": 1985,
      "gdp": 174.61,
      "growth": 5.5,
      "perCapita": 10981.3,
      "popChangePct": 1.43
    },
    {
      "year": 1986,
      "gdp": 181.712,
      "growth": 2.4,
      "perCapita": 11259.3,
      "popChangePct": 1.5
    },
    {
      "year": 1987,
      "gdp": 213.375,
      "growth": 4.9,
      "perCapita": 13014.9,
      "popChangePct": 1.59
    },
    {
      "year": 1988,
      "gdp": 271.438,
      "growth": 4.3,
      "perCapita": 16266.4,
      "popChangePct": 1.78
    },
    {
      "year": 1989,
      "gdp": 308.794,
      "growth": 4.6,
      "perCapita": 18232.2,
      "popChangePct": 1.5
    },
    {
      "year": 1990,
      "gdp": 324.567,
      "growth": 1.5,
      "perCapita": 18903.4,
      "popChangePct": 1.38
    },
    {
      "year": 1991,
      "gdp": 324.897,
      "growth": -1,
      "perCapita": 18694.8,
      "popChangePct": 1.22
    },
    {
      "year": 1992,
      "gdp": 318.448,
      "growth": 2.6,
      "perCapita": 18137.8,
      "popChangePct": 1.02
    },
    {
      "year": 1993,
      "gdp": 309.74,
      "growth": 3.9,
      "perCapita": 17480.6,
      "popChangePct": 0.92
    },
    {
      "year": 1994,
      "gdp": 353.899,
      "growth": 4.9,
      "perCapita": 19778.2,
      "popChangePct": 0.98
    },
    {
      "year": 1995,
      "gdp": 379.794,
      "growth": 3,
      "perCapita": 20960.4,
      "popChangePct": 1.27
    },
    {
      "year": 1996,
      "gdp": 425.321,
      "growth": 4,
      "perCapita": 23203.4,
      "popChangePct": 1.16
    },
    {
      "year": 1997,
      "gdp": 427.113,
      "growth": 4.7,
      "perCapita": 23074.7,
      "popChangePct": 0.98
    },
    {
      "year": 1998,
      "gdp": 382.157,
      "growth": 4.7,
      "perCapita": 20430.1,
      "popChangePct": 1.06
    },
    {
      "year": 1999,
      "gdp": 412.701,
      "growth": 4.4,
      "perCapita": 21813.9,
      "popChangePct": 1.14
    },
    {
      "year": 2000,
      "gdp": 401.043,
      "growth": 3.1,
      "perCapita": 20952.0,
      "popChangePct": 1.17
    },
    {
      "year": 2001,
      "gdp": 378.776,
      "growth": 2.6,
      "perCapita": 19538.2,
      "popChangePct": 1.28
    },
    {
      "year": 2002,
      "gdp": 426.227,
      "growth": 4.1,
      "perCapita": 21740.2,
      "popChangePct": 1.13
    },
    {
      "year": 2003,
      "gdp": 542.024,
      "growth": 3,
      "perCapita": 27337.5,
      "popChangePct": 1.13
    },
    {
      "year": 2004,
      "gdp": 659.797,
      "growth": 4.1,
      "perCapita": 32914.2,
      "popChangePct": 1.1
    },
    {
      "year": 2005,
      "gdp": 737.709,
      "growth": 3,
      "perCapita": 36319.7,
      "popChangePct": 1.33
    },
    {
      "year": 2006,
      "gdp": 784.874,
      "growth": 2.6,
      "perCapita": 38049.8,
      "popChangePct": 1.56
    },
    {
      "year": 2007,
      "gdp": 951.942,
      "growth": 4.4,
      "perCapita": 45295.8,
      "popChangePct": 1.88
    },
    {
      "year": 2008,
      "gdp": 1059.505,
      "growth": 2.7,
      "perCapita": 49335.2,
      "popChangePct": 2.19
    },
    {
      "year": 2009,
      "gdp": 1004.22,
      "growth": 2,
      "perCapita": 45926.9,
      "popChangePct": 1.82
    },
    {
      "year": 2010,
      "gdp": 1258.45,
      "growth": 2.4,
      "perCapita": 56757.3,
      "popChangePct": 1.4
    },
    {
      "year": 2011,
      "gdp": 1520.441,
      "growth": 2.8,
      "perCapita": 67508.5,
      "popChangePct": 1.58
    },
    {
      "year": 2012,
      "gdp": 1575.93,
      "growth": 3.9,
      "perCapita": 68733.8,
      "popChangePct": 1.8
    },
    {
      "year": 2013,
      "gdp": 1526.608,
      "growth": 2.2,
      "perCapita": 65525.9,
      "popChangePct": 1.61
    },
    {
      "year": 2014,
      "gdp": 1463.091,
      "growth": 2.6,
      "perCapita": 61889.6,
      "popChangePct": 1.47
    },
    {
      "year": 2015,
      "gdp": 1238.863,
      "growth": 2.3,
      "perCapita": 51652.5,
      "popChangePct": 1.46
    },
    {
      "year": 2016,
      "gdp": 1267.66,
      "growth": 2.7,
      "perCapita": 51985.1,
      "popChangePct": 1.67
    },
    {
      "year": 2017,
      "gdp": 1386.367,
      "growth": 2.4,
      "perCapita": 55994.4,
      "popChangePct": 1.53
    },
    {
      "year": 2018,
      "gdp": 1422.597,
      "growth": 2.8,
      "perCapita": 56573.2,
      "popChangePct": 1.56
    },
    {
      "year": 2019,
      "gdp": 1391.987,
      "growth": 2,
      "perCapita": 54544.0,
      "popChangePct": 1.49
    },
    {
      "year": 2020,
      "gdp": 1366.669,
      "growth": -2,
      "perCapita": 53321.6,
      "popChangePct": 0.43
    },
    {
      "year": 2021,
      "gdp": 1660.123,
      "growth": 5.4,
      "perCapita": 64411.3,
      "popChangePct": 0.56
    },
    {
      "year": 2022,
      "gdp": 1731.233,
      "growth": 4.2,
      "perCapita": 65775.6,
      "popChangePct": 2.12
    },
    {
      "year": 2023,
      "gdp": 1748.175,
      "growth": 2.1,
      "perCapita": 64851.3,
      "popChangePct": 2.42
    },
    {
      "year": 2024,
      "gdp": 1799.418,
      "growth": 1,
      "perCapita": 65700.9,
      "popChangePct": 1.6
    },
    {
      "year": 2025,
      "gdp": 1839.961,
      "growth": 2,
      "perCapita": 66351.9,
      "popChangePct": 1.25
    },
    {
      "year": 2026,
      "gdp": 2123.963,
      "growth": 2,
      "perCapita": 75647.8,
      "popChangePct": 1.25
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2211.254,
      "growth": 1.7,
      "perCapita": 77822.9,
      "popChangePct": 1.2
    },
    {
      "year": 2028,
      "gdp": 2292.786,
      "growth": 1.9,
      "perCapita": 79735.5,
      "popChangePct": 1.2
    },
    {
      "year": 2029,
      "gdp": 2380.653,
      "growth": 2.1,
      "perCapita": 81809.6,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdp": 2483.975,
      "growth": 2.3,
      "perCapita": 84348.0,
      "popChangePct": 1.2
    },
    {
      "year": 2031,
      "gdp": 2590.235,
      "growth": 2.3,
      "perCapita": 86913.3,
      "popChangePct": 1.2
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 152.443,
      "perCapitaPPP": 10299.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 173.753,
      "perCapitaPPP": 11553.4,
      "perCapitaPPPChangePct": 12.18,
      "popChangePct": 1.6
    },
    {
      "year": 1982,
      "gdpPPP": 184.605,
      "perCapitaPPP": 12074.5,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 1.66
    },
    {
      "year": 1983,
      "gdpPPP": 190.926,
      "perCapitaPPP": 12330.9,
      "perCapitaPPPChangePct": 2.12,
      "popChangePct": 1.27
    },
    {
      "year": 1984,
      "gdpPPP": 210.37,
      "perCapitaPPP": 13418.8,
      "perCapitaPPPChangePct": 8.82,
      "popChangePct": 1.25
    },
    {
      "year": 1985,
      "gdpPPP": 228.864,
      "perCapitaPPP": 14393.5,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 1.43
    },
    {
      "year": 1986,
      "gdpPPP": 239.188,
      "perCapitaPPP": 14820.7,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 1.5
    },
    {
      "year": 1987,
      "gdpPPP": 257.107,
      "perCapitaPPP": 15682.4,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 1.59
    },
    {
      "year": 1988,
      "gdpPPP": 277.496,
      "perCapitaPPP": 16629.4,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 1.78
    },
    {
      "year": 1989,
      "gdpPPP": 301.731,
      "perCapitaPPP": 17815.2,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 1.5
    },
    {
      "year": 1990,
      "gdpPPP": 317.675,
      "perCapitaPPP": 18502.0,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 1.38
    },
    {
      "year": 1991,
      "gdpPPP": 325.182,
      "perCapitaPPP": 18711.2,
      "perCapitaPPPChangePct": 1.13,
      "popChangePct": 1.22
    },
    {
      "year": 1992,
      "gdpPPP": 341.247,
      "perCapitaPPP": 19436.4,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 1.02
    },
    {
      "year": 1993,
      "gdpPPP": 363.022,
      "perCapitaPPP": 20487.6,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 0.92
    },
    {
      "year": 1994,
      "gdpPPP": 388.853,
      "perCapitaPPP": 21731.6,
      "perCapitaPPPChangePct": 6.07,
      "popChangePct": 0.98
    },
    {
      "year": 1995,
      "gdpPPP": 408.752,
      "perCapitaPPP": 22558.5,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 1.27
    },
    {
      "year": 1996,
      "gdpPPP": 432.754,
      "perCapitaPPP": 23608.9,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 1.16
    },
    {
      "year": 1997,
      "gdpPPP": 461.01,
      "perCapitaPPP": 24906.0,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 0.98
    },
    {
      "year": 1998,
      "gdpPPP": 488.044,
      "perCapitaPPP": 26090.8,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 1.06
    },
    {
      "year": 1999,
      "gdpPPP": 516.829,
      "perCapitaPPP": 27317.7,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 1.14
    },
    {
      "year": 2000,
      "gdpPPP": 544.965,
      "perCapitaPPP": 28471.0,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 1.17
    },
    {
      "year": 2001,
      "gdpPPP": 571.631,
      "perCapitaPPP": 29486.1,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 1.28
    },
    {
      "year": 2002,
      "gdpPPP": 604.591,
      "perCapitaPPP": 30837.9,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": 1.13
    },
    {
      "year": 2003,
      "gdpPPP": 635.133,
      "perCapitaPPP": 32033.5,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 1.13
    },
    {
      "year": 2004,
      "gdpPPP": 678.971,
      "perCapitaPPP": 33870.6,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 1.1
    },
    {
      "year": 2005,
      "gdpPPP": 721.553,
      "perCapitaPPP": 35524.3,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 1.33
    },
    {
      "year": 2006,
      "gdpPPP": 763.413,
      "perCapitaPPP": 37009.4,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 1.56
    },
    {
      "year": 2007,
      "gdpPPP": 818.262,
      "perCapitaPPP": 38934.9,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 1.88
    },
    {
      "year": 2008,
      "gdpPPP": 856.243,
      "perCapitaPPP": 39870.5,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 2.19
    },
    {
      "year": 2009,
      "gdpPPP": 878.556,
      "perCapitaPPP": 40179.8,
      "perCapitaPPPChangePct": 0.78,
      "popChangePct": 1.82
    },
    {
      "year": 2010,
      "gdpPPP": 910.828,
      "perCapitaPPP": 41079.2,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 1.4
    },
    {
      "year": 2011,
      "gdpPPP": 955.19,
      "perCapitaPPP": 42411.1,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 1.58
    },
    {
      "year": 2012,
      "gdpPPP": 1010.674,
      "perCapitaPPP": 44080.3,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 1.8
    },
    {
      "year": 2013,
      "gdpPPP": 1050.935,
      "perCapitaPPP": 45108.8,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 1.61
    },
    {
      "year": 2014,
      "gdpPPP": 1096.598,
      "perCapitaPPP": 46386.7,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 1.47
    },
    {
      "year": 2015,
      "gdpPPP": 1132.454,
      "perCapitaPPP": 47215.9,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 1.46
    },
    {
      "year": 2016,
      "gdpPPP": 1174.12,
      "perCapitaPPP": 48149.2,
      "perCapitaPPPChangePct": 1.98,
      "popChangePct": 1.67
    },
    {
      "year": 2017,
      "gdpPPP": 1223.68,
      "perCapitaPPP": 49423.6,
      "perCapitaPPPChangePct": 2.65,
      "popChangePct": 1.53
    },
    {
      "year": 2018,
      "gdpPPP": 1293.19,
      "perCapitaPPP": 51427.0,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 1.56
    },
    {
      "year": 2019,
      "gdpPPP": 1371.687,
      "perCapitaPPP": 53748.5,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 1.49
    },
    {
      "year": 2020,
      "gdpPPP": 1383.119,
      "perCapitaPPP": 53963.4,
      "perCapitaPPPChangePct": 0.4,
      "popChangePct": 0.43
    },
    {
      "year": 2021,
      "gdpPPP": 1558.753,
      "perCapitaPPP": 60478.2,
      "perCapitaPPPChangePct": 12.07,
      "popChangePct": 0.56
    },
    {
      "year": 2022,
      "gdpPPP": 1739.877,
      "perCapitaPPP": 66104.0,
      "perCapitaPPPChangePct": 9.3,
      "popChangePct": 2.12
    },
    {
      "year": 2023,
      "gdpPPP": 1842.776,
      "perCapitaPPP": 68360.7,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 2.42
    },
    {
      "year": 2024,
      "gdpPPP": 1907.482,
      "perCapitaPPP": 69646.6,
      "perCapitaPPPChangePct": 1.88,
      "popChangePct": 1.6
    },
    {
      "year": 2025,
      "gdpPPP": 2000.256,
      "perCapitaPPP": 72132.4,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 1.25
    },
    {
      "year": 2026,
      "gdpPPP": 2098.888,
      "perCapitaPPP": 74754.8,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 1.25
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2181.39,
      "perCapitaPPP": 76771.9,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 1.2
    },
    {
      "year": 2028,
      "gdpPPP": 2258.33,
      "perCapitaPPP": 78537.3,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 1.2
    },
    {
      "year": 2029,
      "gdpPPP": 2345.77,
      "perCapitaPPP": 80610.8,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdpPPP": 2442.837,
      "perCapitaPPP": 82951.1,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 1.2
    },
    {
      "year": 2031,
      "gdpPPP": 2544.76,
      "perCapitaPPP": 85387.4,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 1.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AustraliaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
