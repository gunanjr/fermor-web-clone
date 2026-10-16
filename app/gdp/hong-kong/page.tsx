import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Hong Kong",
  "slug": "hong-kong",
  "iso3": "HKG",
  "region": "Asia",
  "rank2026": 41,
  "flagEmoji": "🇭🇰",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "South Africa",
      "slug": "south-africa",
      "rank": 40
    },
    {
      "name": "Czech Republic (Czechia)",
      "slug": "czech-republic-czechia",
      "rank": 42
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 28.862,
      "growth": 10.3,
      "perCapita": 5704.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 31.055,
      "growth": 9.2,
      "perCapita": 5995.2,
      "popChangePct": 2.37
    },
    {
      "year": 1982,
      "gdp": 32.291,
      "growth": 2.9,
      "perCapita": 6139.0,
      "popChangePct": 1.54
    },
    {
      "year": 1983,
      "gdp": 29.907,
      "growth": 6,
      "perCapita": 5590.2,
      "popChangePct": 1.71
    },
    {
      "year": 1984,
      "gdp": 33.511,
      "growth": 10,
      "perCapita": 6170.5,
      "popChangePct": 1.51
    },
    {
      "year": 1985,
      "gdp": 35.7,
      "growth": 0.7,
      "perCapita": 6490.4,
      "popChangePct": 1.27
    },
    {
      "year": 1986,
      "gdp": 41.076,
      "growth": 11.1,
      "perCapita": 7380.1,
      "popChangePct": 1.2
    },
    {
      "year": 1987,
      "gdp": 50.623,
      "growth": 13.4,
      "perCapita": 9015.2,
      "popChangePct": 0.88
    },
    {
      "year": 1988,
      "gdp": 59.708,
      "growth": 8.5,
      "perCapita": 10527.5,
      "popChangePct": 1.02
    },
    {
      "year": 1989,
      "gdp": 68.79,
      "growth": 2.3,
      "perCapita": 12012.6,
      "popChangePct": 0.97
    },
    {
      "year": 1990,
      "gdp": 76.929,
      "growth": 3.8,
      "perCapita": 13374.3,
      "popChangePct": 0.44
    },
    {
      "year": 1991,
      "gdp": 88.96,
      "growth": 5.7,
      "perCapita": 15297.6,
      "popChangePct": 1.1
    },
    {
      "year": 1992,
      "gdp": 104.272,
      "growth": 6.2,
      "perCapita": 17710.5,
      "popChangePct": 1.26
    },
    {
      "year": 1993,
      "gdp": 120.354,
      "growth": 6.2,
      "perCapita": 20065.7,
      "popChangePct": 1.87
    },
    {
      "year": 1994,
      "gdp": 135.812,
      "growth": 6,
      "perCapita": 22194.0,
      "popChangePct": 2.02
    },
    {
      "year": 1995,
      "gdp": 144.652,
      "growth": 2.4,
      "perCapita": 23070.5,
      "popChangePct": 2.47
    },
    {
      "year": 1996,
      "gdp": 159.718,
      "growth": 4.3,
      "perCapita": 24699.0,
      "popChangePct": 3.14
    },
    {
      "year": 1997,
      "gdp": 177.349,
      "growth": 5.1,
      "perCapita": 27214.6,
      "popChangePct": 0.77
    },
    {
      "year": 1998,
      "gdp": 168.858,
      "growth": -5.9,
      "perCapita": 25649.1,
      "popChangePct": 1.01
    },
    {
      "year": 1999,
      "gdp": 165.734,
      "growth": 2.5,
      "perCapita": 24969.0,
      "popChangePct": 0.84
    },
    {
      "year": 2000,
      "gdp": 171.643,
      "growth": 7.7,
      "perCapita": 25574.5,
      "popChangePct": 1.11
    },
    {
      "year": 2001,
      "gdp": 169.381,
      "growth": 0.6,
      "perCapita": 25166.9,
      "popChangePct": 0.27
    },
    {
      "year": 2002,
      "gdp": 166.336,
      "growth": 1.7,
      "perCapita": 24731.1,
      "popChangePct": -0.06
    },
    {
      "year": 2003,
      "gdp": 161.37,
      "growth": 3.1,
      "perCapita": 23856.5,
      "popChangePct": 0.56
    },
    {
      "year": 2004,
      "gdp": 169.085,
      "growth": 8.7,
      "perCapita": 24873.9,
      "popChangePct": 0.5
    },
    {
      "year": 2005,
      "gdp": 181.556,
      "growth": 7.4,
      "perCapita": 26551.8,
      "popChangePct": 0.59
    },
    {
      "year": 2006,
      "gdp": 193.515,
      "growth": 7,
      "perCapita": 28028.2,
      "popChangePct": 0.97
    },
    {
      "year": 2007,
      "gdp": 211.583,
      "growth": 6.5,
      "perCapita": 30494.6,
      "popChangePct": 0.49
    },
    {
      "year": 2008,
      "gdp": 219.279,
      "growth": 2.1,
      "perCapita": 31487.9,
      "popChangePct": 0.37
    },
    {
      "year": 2009,
      "gdp": 214.048,
      "growth": -2.5,
      "perCapita": 30594.0,
      "popChangePct": 0.46
    },
    {
      "year": 2010,
      "gdp": 228.639,
      "growth": 6.8,
      "perCapita": 32421.4,
      "popChangePct": 0.8
    },
    {
      "year": 2011,
      "gdp": 248.514,
      "growth": 4.8,
      "perCapita": 34955.1,
      "popChangePct": 0.82
    },
    {
      "year": 2012,
      "gdp": 262.629,
      "growth": 1.7,
      "perCapita": 36623.7,
      "popChangePct": 0.86
    },
    {
      "year": 2013,
      "gdp": 275.697,
      "growth": 3.1,
      "perCapita": 38233.4,
      "popChangePct": 0.56
    },
    {
      "year": 2014,
      "gdp": 291.46,
      "growth": 2.8,
      "perCapita": 40185.3,
      "popChangePct": 0.58
    },
    {
      "year": 2015,
      "gdp": 309.386,
      "growth": 2.4,
      "perCapita": 42325.4,
      "popChangePct": 0.79
    },
    {
      "year": 2016,
      "gdp": 320.86,
      "growth": 2.2,
      "perCapita": 43488.2,
      "popChangePct": 0.93
    },
    {
      "year": 2017,
      "gdp": 341.271,
      "growth": 3.8,
      "perCapita": 46025.7,
      "popChangePct": 0.5
    },
    {
      "year": 2018,
      "gdp": 361.731,
      "growth": 2.8,
      "perCapita": 48310.0,
      "popChangePct": 0.98
    },
    {
      "year": 2019,
      "gdp": 363.075,
      "growth": -1.7,
      "perCapita": 48278.0,
      "popChangePct": 0.44
    },
    {
      "year": 2020,
      "gdp": 344.941,
      "growth": -6.5,
      "perCapita": 46446.1,
      "popChangePct": -1.25
    },
    {
      "year": 2021,
      "gdp": 368.954,
      "growth": 6.5,
      "perCapita": 49848.6,
      "popChangePct": -0.34
    },
    {
      "year": 2022,
      "gdp": 358.674,
      "growth": -3.7,
      "perCapita": 47998.5,
      "popChangePct": 0.96
    },
    {
      "year": 2023,
      "gdp": 380.762,
      "growth": 3.2,
      "perCapita": 50580.1,
      "popChangePct": 0.74
    },
    {
      "year": 2024,
      "gdp": 408.369,
      "growth": 2.6,
      "perCapita": 54444.8,
      "popChangePct": -0.36
    },
    {
      "year": 2025,
      "gdp": 427.31,
      "growth": 3.5,
      "perCapita": 56892.8,
      "popChangePct": 0.13
    },
    {
      "year": 2026,
      "gdp": 450.138,
      "growth": 2.4,
      "perCapita": 59640.1,
      "popChangePct": 0.49
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 469.525,
      "growth": 2.4,
      "perCapita": 61867.6,
      "popChangePct": 0.54
    },
    {
      "year": 2028,
      "gdp": 490.629,
      "growth": 2.3,
      "perCapita": 64263.1,
      "popChangePct": 0.61
    },
    {
      "year": 2029,
      "gdp": 513.28,
      "growth": 2.3,
      "perCapita": 66824.8,
      "popChangePct": 0.6
    },
    {
      "year": 2030,
      "gdp": 536.918,
      "growth": 2.2,
      "perCapita": 69488.7,
      "popChangePct": 0.6
    },
    {
      "year": 2031,
      "gdp": 562.359,
      "growth": 2.2,
      "perCapita": 72380.2,
      "popChangePct": 0.56
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 33.435,
      "perCapitaPPP": 6607.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 39.963,
      "perCapitaPPP": 7714.8,
      "perCapitaPPPChangePct": 16.75,
      "popChangePct": 2.37
    },
    {
      "year": 1982,
      "gdpPPP": 43.657,
      "perCapitaPPP": 8299.8,
      "perCapitaPPPChangePct": 7.58,
      "popChangePct": 1.54
    },
    {
      "year": 1983,
      "gdpPPP": 48.095,
      "perCapitaPPP": 8989.7,
      "perCapitaPPPChangePct": 8.31,
      "popChangePct": 1.71
    },
    {
      "year": 1984,
      "gdpPPP": 54.815,
      "perCapitaPPP": 10093.2,
      "perCapitaPPPChangePct": 12.27,
      "popChangePct": 1.51
    },
    {
      "year": 1985,
      "gdpPPP": 56.953,
      "perCapitaPPP": 10354.3,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 1.27
    },
    {
      "year": 1986,
      "gdpPPP": 64.551,
      "perCapitaPPP": 11598.0,
      "perCapitaPPPChangePct": 12.01,
      "popChangePct": 1.2
    },
    {
      "year": 1987,
      "gdpPPP": 75.012,
      "perCapitaPPP": 13358.4,
      "perCapitaPPPChangePct": 15.18,
      "popChangePct": 0.88
    },
    {
      "year": 1988,
      "gdpPPP": 84.267,
      "perCapitaPPP": 14857.7,
      "perCapitaPPPChangePct": 11.22,
      "popChangePct": 1.02
    },
    {
      "year": 1989,
      "gdpPPP": 89.565,
      "perCapitaPPP": 15640.5,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 0.97
    },
    {
      "year": 1990,
      "gdpPPP": 96.476,
      "perCapitaPPP": 16772.7,
      "perCapitaPPPChangePct": 7.24,
      "popChangePct": 0.44
    },
    {
      "year": 1991,
      "gdpPPP": 105.427,
      "perCapitaPPP": 18129.2,
      "perCapitaPPPChangePct": 8.09,
      "popChangePct": 1.1
    },
    {
      "year": 1992,
      "gdpPPP": 114.553,
      "perCapitaPPP": 19456.6,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 1.26
    },
    {
      "year": 1993,
      "gdpPPP": 124.539,
      "perCapitaPPP": 20763.5,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": 1.87
    },
    {
      "year": 1994,
      "gdpPPP": 134.877,
      "perCapitaPPP": 22041.2,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 2.02
    },
    {
      "year": 1995,
      "gdpPPP": 140.973,
      "perCapitaPPP": 22483.8,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 2.47
    },
    {
      "year": 1996,
      "gdpPPP": 149.667,
      "perCapitaPPP": 23144.7,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 3.14
    },
    {
      "year": 1997,
      "gdpPPP": 160.013,
      "perCapitaPPP": 24554.2,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": 0.77
    },
    {
      "year": 1998,
      "gdpPPP": 152.292,
      "perCapitaPPP": 23132.8,
      "perCapitaPPPChangePct": -5.79,
      "popChangePct": 1.01
    },
    {
      "year": 1999,
      "gdpPPP": 158.319,
      "perCapitaPPP": 23851.8,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 0.84
    },
    {
      "year": 2000,
      "gdpPPP": 174.313,
      "perCapitaPPP": 25972.2,
      "perCapitaPPPChangePct": 8.89,
      "popChangePct": 1.11
    },
    {
      "year": 2001,
      "gdpPPP": 179.237,
      "perCapitaPPP": 26631.4,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 0.27
    },
    {
      "year": 2002,
      "gdpPPP": 185.038,
      "perCapitaPPP": 27511.7,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": -0.06
    },
    {
      "year": 2003,
      "gdpPPP": 194.458,
      "perCapitaPPP": 28748.2,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 0.56
    },
    {
      "year": 2004,
      "gdpPPP": 217.06,
      "perCapitaPPP": 31931.4,
      "perCapitaPPPChangePct": 11.07,
      "popChangePct": 0.5
    },
    {
      "year": 2005,
      "gdpPPP": 240.406,
      "perCapitaPPP": 35158.4,
      "perCapitaPPPChangePct": 10.11,
      "popChangePct": 0.59
    },
    {
      "year": 2006,
      "gdpPPP": 265.248,
      "perCapitaPPP": 38417.8,
      "perCapitaPPPChangePct": 9.27,
      "popChangePct": 0.97
    },
    {
      "year": 2007,
      "gdpPPP": 290.047,
      "perCapitaPPP": 41803.2,
      "perCapitaPPPChangePct": 8.81,
      "popChangePct": 0.49
    },
    {
      "year": 2008,
      "gdpPPP": 301.925,
      "perCapitaPPP": 43355.8,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 0.37
    },
    {
      "year": 2009,
      "gdpPPP": 296.317,
      "perCapitaPPP": 42352.8,
      "perCapitaPPPChangePct": -2.31,
      "popChangePct": 0.46
    },
    {
      "year": 2010,
      "gdpPPP": 320.216,
      "perCapitaPPP": 45407.2,
      "perCapitaPPPChangePct": 7.21,
      "popChangePct": 0.8
    },
    {
      "year": 2011,
      "gdpPPP": 342.558,
      "perCapitaPPP": 48183.2,
      "perCapitaPPPChangePct": 6.11,
      "popChangePct": 0.82
    },
    {
      "year": 2012,
      "gdpPPP": 354.87,
      "perCapitaPPP": 49486.8,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 0.86
    },
    {
      "year": 2013,
      "gdpPPP": 372.103,
      "perCapitaPPP": 51602.9,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.56
    },
    {
      "year": 2014,
      "gdpPPP": 389.042,
      "perCapitaPPP": 53639.6,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 0.58
    },
    {
      "year": 2015,
      "gdpPPP": 402.029,
      "perCapitaPPP": 54999.3,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 0.79
    },
    {
      "year": 2016,
      "gdpPPP": 414.678,
      "perCapitaPPP": 56203.9,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 0.93
    },
    {
      "year": 2017,
      "gdpPPP": 438.128,
      "perCapitaPPP": 59088.3,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 0.5
    },
    {
      "year": 2018,
      "gdpPPP": 453.865,
      "perCapitaPPP": 60614.8,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 0.98
    },
    {
      "year": 2019,
      "gdpPPP": 459.644,
      "perCapitaPPP": 61118.8,
      "perCapitaPPPChangePct": 0.83,
      "popChangePct": 0.44
    },
    {
      "year": 2020,
      "gdpPPP": 435.301,
      "perCapitaPPP": 58612.9,
      "perCapitaPPPChangePct": -4.1,
      "popChangePct": -1.25
    },
    {
      "year": 2021,
      "gdpPPP": 488.412,
      "perCapitaPPP": 65988.2,
      "perCapitaPPPChangePct": 12.58,
      "popChangePct": -0.34
    },
    {
      "year": 2022,
      "gdpPPP": 503.87,
      "perCapitaPPP": 67429,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": 0.96
    },
    {
      "year": 2023,
      "gdpPPP": 538.974,
      "perCapitaPPP": 71596.9,
      "perCapitaPPPChangePct": 6.18,
      "popChangePct": 0.74
    },
    {
      "year": 2024,
      "gdpPPP": 566.878,
      "perCapitaPPP": 75577.7,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": -0.36
    },
    {
      "year": 2025,
      "gdpPPP": 603.291,
      "perCapitaPPP": 80323.1,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 0.13
    },
    {
      "year": 2026,
      "gdpPPP": 635.594,
      "perCapitaPPP": 84211.9,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 0.49
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 664.836,
      "perCapitaPPP": 87603.1,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.54
    },
    {
      "year": 2028,
      "gdpPPP": 691.345,
      "perCapitaPPP": 90553.1,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 0.61
    },
    {
      "year": 2029,
      "gdpPPP": 719.664,
      "perCapitaPPP": 93694.1,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": 0.6
    },
    {
      "year": 2030,
      "gdpPPP": 748.94,
      "perCapitaPPP": 96928.9,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 0.6
    },
    {
      "year": 2031,
      "gdpPPP": 779.008,
      "perCapitaPPP": 100264.7,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 0.56
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function HongKongGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
