import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Guinea-Bissau",
  "slug": "guinea-bissau",
  "iso3": "GNB",
  "region": "Africa",
  "rank2026": 185,
  "flagEmoji": "🇬🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Cabo Verde",
      "slug": "cabo-verde",
      "rank": 182
    },
    {
      "name": "Lesotho",
      "slug": "lesotho",
      "rank": 186
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.289,
      "growth": null,
      "perCapita": 370.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.37,
      "growth": -0.5,
      "perCapita": 463.7,
      "popChangePct": 2.05
    },
    {
      "year": 1982,
      "gdp": 0.421,
      "growth": 4.2,
      "perCapita": 516.5,
      "popChangePct": 2.13
    },
    {
      "year": 1983,
      "gdp": 0.475,
      "growth": -3.4,
      "perCapita": 570.7,
      "popChangePct": 2.09
    },
    {
      "year": 1984,
      "gdp": 0.33,
      "growth": 5.5,
      "perCapita": 388.7,
      "popChangePct": 2.16
    },
    {
      "year": 1985,
      "gdp": 0.485,
      "growth": 4.3,
      "perCapita": 559.4,
      "popChangePct": 2.0
    },
    {
      "year": 1986,
      "gdp": 0.474,
      "growth": -1,
      "perCapita": 534.9,
      "popChangePct": 2.19
    },
    {
      "year": 1987,
      "gdp": 0.401,
      "growth": 5.6,
      "perCapita": 444.5,
      "popChangePct": 1.92
    },
    {
      "year": 1988,
      "gdp": 0.374,
      "growth": 2,
      "perCapita": 406.0,
      "popChangePct": 1.99
    },
    {
      "year": 1989,
      "gdp": 0.449,
      "growth": 2.9,
      "perCapita": 478.4,
      "popChangePct": 2.06
    },
    {
      "year": 1990,
      "gdp": 0.548,
      "growth": 4.6,
      "perCapita": 571.8,
      "popChangePct": 2.02
    },
    {
      "year": 1991,
      "gdp": 0.772,
      "growth": 7.3,
      "perCapita": 787.2,
      "popChangePct": 2.19
    },
    {
      "year": 1992,
      "gdp": 0.846,
      "growth": 3.1,
      "perCapita": 843.6,
      "popChangePct": 2.35
    },
    {
      "year": 1993,
      "gdp": 0.653,
      "growth": 2.3,
      "perCapita": 636.9,
      "popChangePct": 2.19
    },
    {
      "year": 1994,
      "gdp": 0.361,
      "growth": 3,
      "perCapita": 344.1,
      "popChangePct": 2.24
    },
    {
      "year": 1995,
      "gdp": 0.778,
      "growth": 4,
      "perCapita": 725.8,
      "popChangePct": 2.29
    },
    {
      "year": 1996,
      "gdp": 0.741,
      "growth": 3.7,
      "perCapita": 676.1,
      "popChangePct": 2.15
    },
    {
      "year": 1997,
      "gdp": 0.704,
      "growth": 6,
      "perCapita": 628.4,
      "popChangePct": 2.19
    },
    {
      "year": 1998,
      "gdp": 0.592,
      "growth": -22.4,
      "perCapita": 517.7,
      "popChangePct": 2.23
    },
    {
      "year": 1999,
      "gdp": 0.58,
      "growth": 16.8,
      "perCapita": 496.4,
      "popChangePct": 2.19
    },
    {
      "year": 2000,
      "gdp": 0.392,
      "growth": 1.1,
      "perCapita": 327.9,
      "popChangePct": 2.14
    },
    {
      "year": 2001,
      "gdp": 0.413,
      "growth": 4.8,
      "perCapita": 338.4,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdp": 0.466,
      "growth": 3.7,
      "perCapita": 374.5,
      "popChangePct": 2.21
    },
    {
      "year": 2003,
      "gdp": 0.553,
      "growth": -0.3,
      "perCapita": 435.1,
      "popChangePct": 2.09
    },
    {
      "year": 2004,
      "gdp": 0.582,
      "growth": 1.2,
      "perCapita": 447.8,
      "popChangePct": 2.12
    },
    {
      "year": 2005,
      "gdp": 0.64,
      "growth": 6.6,
      "perCapita": 482.2,
      "popChangePct": 2.23
    },
    {
      "year": 2006,
      "gdp": 0.635,
      "growth": 2.7,
      "perCapita": 468.0,
      "popChangePct": 2.11
    },
    {
      "year": 2007,
      "gdp": 0.753,
      "growth": 2.6,
      "perCapita": 543.4,
      "popChangePct": 2.21
    },
    {
      "year": 2008,
      "gdp": 0.953,
      "growth": 4.5,
      "perCapita": 672.3,
      "popChangePct": 2.24
    },
    {
      "year": 2009,
      "gdp": 0.889,
      "growth": 2.4,
      "perCapita": 613.6,
      "popChangePct": 2.26
    },
    {
      "year": 2010,
      "gdp": 0.941,
      "growth": 5.6,
      "perCapita": 644.3,
      "popChangePct": 0.76
    },
    {
      "year": 2011,
      "gdp": 1.157,
      "growth": 8.1,
      "perCapita": 775.2,
      "popChangePct": 2.19
    },
    {
      "year": 2012,
      "gdp": 1.05,
      "growth": -1.7,
      "perCapita": 688.5,
      "popChangePct": 2.21
    },
    {
      "year": 2013,
      "gdp": 1.11,
      "growth": 3.3,
      "perCapita": 711.9,
      "popChangePct": 2.23
    },
    {
      "year": 2014,
      "gdp": 1.136,
      "growth": 1,
      "perCapita": 712.8,
      "popChangePct": 2.18
    },
    {
      "year": 2015,
      "gdp": 1.153,
      "growth": 6.1,
      "perCapita": 707.9,
      "popChangePct": 2.2
    },
    {
      "year": 2016,
      "gdp": 1.245,
      "growth": 5.3,
      "perCapita": 748.1,
      "popChangePct": 2.21
    },
    {
      "year": 2017,
      "gdp": 1.469,
      "growth": 4.8,
      "perCapita": 864.1,
      "popChangePct": 2.16
    },
    {
      "year": 2018,
      "gdp": 1.555,
      "growth": 3.8,
      "perCapita": 894.7,
      "popChangePct": 2.24
    },
    {
      "year": 2019,
      "gdp": 1.487,
      "growth": 4.5,
      "perCapita": 837.0,
      "popChangePct": 2.19
    },
    {
      "year": 2020,
      "gdp": 1.523,
      "growth": 1.5,
      "perCapita": 838.8,
      "popChangePct": 2.2
    },
    {
      "year": 2021,
      "gdp": 1.722,
      "growth": 6.2,
      "perCapita": 928.4,
      "popChangePct": 2.2
    },
    {
      "year": 2022,
      "gdp": 1.721,
      "growth": 4.6,
      "perCapita": 907.6,
      "popChangePct": 2.21
    },
    {
      "year": 2023,
      "gdp": 2.005,
      "growth": 5.2,
      "perCapita": 1035.3,
      "popChangePct": 2.16
    },
    {
      "year": 2024,
      "gdp": 2.186,
      "growth": 4.8,
      "perCapita": 1105.3,
      "popChangePct": 2.12
    },
    {
      "year": 2025,
      "gdp": 2.648,
      "growth": 5.5,
      "perCapita": 1311.5,
      "popChangePct": 2.07
    },
    {
      "year": 2026,
      "gdp": 2.985,
      "growth": 4.9,
      "perCapita": 1448.5,
      "popChangePct": 2.03
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3.214,
      "growth": 4.9,
      "perCapita": 1528.7,
      "popChangePct": 2.09
    },
    {
      "year": 2028,
      "gdp": 3.444,
      "growth": 4.5,
      "perCapita": 1605.6,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdp": 3.697,
      "growth": 4.5,
      "perCapita": 1690.7,
      "popChangePct": 1.96
    },
    {
      "year": 2030,
      "gdp": 3.971,
      "growth": 4.2,
      "perCapita": 1781.0,
      "popChangePct": 1.97
    },
    {
      "year": 2031,
      "gdp": 4.232,
      "growth": 4.2,
      "perCapita": 1862.1,
      "popChangePct": 1.93
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.553,
      "perCapitaPPP": 707.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.602,
      "perCapitaPPP": 754.3,
      "perCapitaPPPChangePct": 6.68,
      "popChangePct": 2.05
    },
    {
      "year": 1982,
      "gdpPPP": 0.666,
      "perCapitaPPP": 817.4,
      "perCapitaPPPChangePct": 8.36,
      "popChangePct": 2.13
    },
    {
      "year": 1983,
      "gdpPPP": 0.669,
      "perCapitaPPP": 803.6,
      "perCapitaPPPChangePct": -1.68,
      "popChangePct": 2.09
    },
    {
      "year": 1984,
      "gdpPPP": 0.731,
      "perCapitaPPP": 860.4,
      "perCapitaPPPChangePct": 7.06,
      "popChangePct": 2.16
    },
    {
      "year": 1985,
      "gdpPPP": 0.787,
      "perCapitaPPP": 906.7,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 2.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.794,
      "perCapitaPPP": 896.9,
      "perCapitaPPPChangePct": -1.08,
      "popChangePct": 2.19
    },
    {
      "year": 1987,
      "gdpPPP": 0.86,
      "perCapitaPPP": 952.0,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 1.92
    },
    {
      "year": 1988,
      "gdpPPP": 0.907,
      "perCapitaPPP": 985.2,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 1.99
    },
    {
      "year": 1989,
      "gdpPPP": 0.971,
      "perCapitaPPP": 1032.9,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 2.06
    },
    {
      "year": 1990,
      "gdpPPP": 1.053,
      "perCapitaPPP": 1098.4,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 2.02
    },
    {
      "year": 1991,
      "gdpPPP": 1.168,
      "perCapitaPPP": 1191.5,
      "perCapitaPPPChangePct": 8.47,
      "popChangePct": 2.19
    },
    {
      "year": 1992,
      "gdpPPP": 1.232,
      "perCapitaPPP": 1228.5,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 2.35
    },
    {
      "year": 1993,
      "gdpPPP": 1.29,
      "perCapitaPPP": 1257.8,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 2.19
    },
    {
      "year": 1994,
      "gdpPPP": 1.356,
      "perCapitaPPP": 1293.6,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 2.24
    },
    {
      "year": 1995,
      "gdpPPP": 1.44,
      "perCapitaPPP": 1343.8,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 2.29
    },
    {
      "year": 1996,
      "gdpPPP": 1.521,
      "perCapitaPPP": 1388.9,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.15
    },
    {
      "year": 1997,
      "gdpPPP": 1.64,
      "perCapitaPPP": 1465.3,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 2.19
    },
    {
      "year": 1998,
      "gdpPPP": 1.287,
      "perCapitaPPP": 1124.7,
      "perCapitaPPPChangePct": -23.25,
      "popChangePct": 2.23
    },
    {
      "year": 1999,
      "gdpPPP": 1.524,
      "perCapitaPPP": 1304.1,
      "perCapitaPPPChangePct": 15.96,
      "popChangePct": 2.19
    },
    {
      "year": 2000,
      "gdpPPP": 1.576,
      "perCapitaPPP": 1319.9,
      "perCapitaPPPChangePct": 1.21,
      "popChangePct": 2.14
    },
    {
      "year": 2001,
      "gdpPPP": 1.688,
      "perCapitaPPP": 1384.6,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdpPPP": 1.777,
      "perCapitaPPP": 1427.0,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": 2.21
    },
    {
      "year": 2003,
      "gdpPPP": 1.807,
      "perCapitaPPP": 1420.6,
      "perCapitaPPPChangePct": -0.45,
      "popChangePct": 2.09
    },
    {
      "year": 2004,
      "gdpPPP": 1.878,
      "perCapitaPPP": 1444.9,
      "perCapitaPPPChangePct": 1.71,
      "popChangePct": 2.12
    },
    {
      "year": 2005,
      "gdpPPP": 2.063,
      "perCapitaPPP": 1554.3,
      "perCapitaPPPChangePct": 7.57,
      "popChangePct": 2.23
    },
    {
      "year": 2006,
      "gdpPPP": 2.184,
      "perCapitaPPP": 1609.9,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 2.11
    },
    {
      "year": 2007,
      "gdpPPP": 2.3,
      "perCapitaPPP": 1659.5,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 2.21
    },
    {
      "year": 2008,
      "gdpPPP": 2.451,
      "perCapitaPPP": 1729.6,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 2.24
    },
    {
      "year": 2009,
      "gdpPPP": 2.526,
      "perCapitaPPP": 1743.2,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": 2.26
    },
    {
      "year": 2010,
      "gdpPPP": 2.7,
      "perCapitaPPP": 1849.2,
      "perCapitaPPPChangePct": 6.08,
      "popChangePct": 0.76
    },
    {
      "year": 2011,
      "gdpPPP": 2.979,
      "perCapitaPPP": 1996.1,
      "perCapitaPPPChangePct": 7.94,
      "popChangePct": 2.19
    },
    {
      "year": 2012,
      "gdpPPP": 2.982,
      "perCapitaPPP": 1955.4,
      "perCapitaPPPChangePct": -2.04,
      "popChangePct": 2.21
    },
    {
      "year": 2013,
      "gdpPPP": 3.132,
      "perCapitaPPP": 2009.2,
      "perCapitaPPPChangePct": 2.75,
      "popChangePct": 2.23
    },
    {
      "year": 2014,
      "gdpPPP": 3.217,
      "perCapitaPPP": 2019.5,
      "perCapitaPPPChangePct": 0.51,
      "popChangePct": 2.18
    },
    {
      "year": 2015,
      "gdpPPP": 3.446,
      "perCapitaPPP": 2116.7,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 2.2
    },
    {
      "year": 2016,
      "gdpPPP": 3.664,
      "perCapitaPPP": 2201.8,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 2.21
    },
    {
      "year": 2017,
      "gdpPPP": 3.908,
      "perCapitaPPP": 2298.0,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 2.16
    },
    {
      "year": 2018,
      "gdpPPP": 3.956,
      "perCapitaPPP": 2276.2,
      "perCapitaPPPChangePct": -0.95,
      "popChangePct": 2.24
    },
    {
      "year": 2019,
      "gdpPPP": 4.118,
      "perCapitaPPP": 2318.5,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 2.19
    },
    {
      "year": 2020,
      "gdpPPP": 4.201,
      "perCapitaPPP": 2314.2,
      "perCapitaPPPChangePct": -0.19,
      "popChangePct": 2.2
    },
    {
      "year": 2021,
      "gdpPPP": 4.686,
      "perCapitaPPP": 2525.7,
      "perCapitaPPPChangePct": 9.14,
      "popChangePct": 2.2
    },
    {
      "year": 2022,
      "gdpPPP": 5.25,
      "perCapitaPPP": 2768.2,
      "perCapitaPPPChangePct": 9.6,
      "popChangePct": 2.21
    },
    {
      "year": 2023,
      "gdpPPP": 5.727,
      "perCapitaPPP": 2957.0,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 2.16
    },
    {
      "year": 2024,
      "gdpPPP": 6.151,
      "perCapitaPPP": 3109.7,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 2.12
    },
    {
      "year": 2025,
      "gdpPPP": 6.673,
      "perCapitaPPP": 3304.8,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 2.07
    },
    {
      "year": 2026,
      "gdpPPP": 7.201,
      "perCapitaPPP": 3494.7,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": 2.03
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 7.72,
      "perCapitaPPP": 3671.4,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 2.09
    },
    {
      "year": 2028,
      "gdpPPP": 8.199,
      "perCapitaPPP": 3823.0,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 2.0
    },
    {
      "year": 2029,
      "gdpPPP": 8.721,
      "perCapitaPPP": 3987.7,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 1.96
    },
    {
      "year": 2030,
      "gdpPPP": 9.254,
      "perCapitaPPP": 4150.1,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 1.97
    },
    {
      "year": 2031,
      "gdpPPP": 9.818,
      "perCapitaPPP": 4319.6,
      "perCapitaPPPChangePct": 4.08,
      "popChangePct": 1.93
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GuineaBissauGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
