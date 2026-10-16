import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Netherlands",
  "slug": "netherlands",
  "iso3": "NLD",
  "region": "Europe",
  "rank2026": 18,
  "flagEmoji": "🇳🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Indonesia",
      "slug": "indonesia",
      "rank": 17
    },
    {
      "name": "Saudi Arabia",
      "slug": "saudi-arabia",
      "rank": 19
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 194.031,
      "growth": null,
      "perCapita": 13769.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 162.629,
      "growth": -0.5,
      "perCapita": 11445.8,
      "popChangePct": 0.84
    },
    {
      "year": 1982,
      "gdp": 157.56,
      "growth": -1.3,
      "perCapita": 11029.1,
      "popChangePct": 0.54
    },
    {
      "year": 1983,
      "gdp": 153.396,
      "growth": 1.8,
      "perCapita": 10697.4,
      "popChangePct": 0.38
    },
    {
      "year": 1984,
      "gdp": 142.779,
      "growth": 3.1,
      "perCapita": 9918.9,
      "popChangePct": 0.38
    },
    {
      "year": 1985,
      "gdp": 144.859,
      "growth": 2.7,
      "perCapita": 10022.2,
      "popChangePct": 0.41
    },
    {
      "year": 1986,
      "gdp": 201.883,
      "growth": 3.1,
      "perCapita": 13894.8,
      "popChangePct": 0.52
    },
    {
      "year": 1987,
      "gdp": 247.277,
      "growth": 1.9,
      "perCapita": 16919.3,
      "popChangePct": 0.59
    },
    {
      "year": 1988,
      "gdp": 264.596,
      "growth": 4.6,
      "perCapita": 17981.5,
      "popChangePct": 0.68
    },
    {
      "year": 1989,
      "gdp": 260.9,
      "growth": 4.5,
      "perCapita": 17622.1,
      "popChangePct": 0.61
    },
    {
      "year": 1990,
      "gdp": 321.859,
      "growth": 4.2,
      "perCapita": 21612.0,
      "popChangePct": 0.59
    },
    {
      "year": 1991,
      "gdp": 331.565,
      "growth": 2.5,
      "perCapita": 22088.9,
      "popChangePct": 0.79
    },
    {
      "year": 1992,
      "gdp": 366.52,
      "growth": 1.6,
      "perCapita": 24226.1,
      "popChangePct": 0.79
    },
    {
      "year": 1993,
      "gdp": 356.434,
      "growth": 1.3,
      "perCapita": 23389.3,
      "popChangePct": 0.73
    },
    {
      "year": 1994,
      "gdp": 383.091,
      "growth": 3,
      "perCapita": 24970.8,
      "popChangePct": 0.68
    },
    {
      "year": 1995,
      "gdp": 453.377,
      "growth": 3.1,
      "perCapita": 29394.0,
      "popChangePct": 0.53
    },
    {
      "year": 1996,
      "gdp": 451.508,
      "growth": 3.4,
      "perCapita": 29141.0,
      "popChangePct": 0.45
    },
    {
      "year": 1997,
      "gdp": 418.023,
      "growth": 4.2,
      "perCapita": 26853.0,
      "popChangePct": 0.47
    },
    {
      "year": 1998,
      "gdp": 439.215,
      "growth": 4.7,
      "perCapita": 28057.4,
      "popChangePct": 0.56
    },
    {
      "year": 1999,
      "gdp": 448.223,
      "growth": 5,
      "perCapita": 28440.1,
      "popChangePct": 0.68
    },
    {
      "year": 2000,
      "gdp": 417.834,
      "growth": 4.2,
      "perCapita": 26338.6,
      "popChangePct": 0.66
    },
    {
      "year": 2001,
      "gdp": 432.539,
      "growth": 2.3,
      "perCapita": 27055.6,
      "popChangePct": 0.78
    },
    {
      "year": 2002,
      "gdp": 475.194,
      "growth": 0.2,
      "perCapita": 29505.5,
      "popChangePct": 0.74
    },
    {
      "year": 2003,
      "gdp": 582.29,
      "growth": 0.1,
      "perCapita": 35960.3,
      "popChangePct": 0.55
    },
    {
      "year": 2004,
      "gdp": 660.925,
      "growth": 2,
      "perCapita": 40652.2,
      "popChangePct": 0.4
    },
    {
      "year": 2005,
      "gdp": 688.514,
      "growth": 2,
      "perCapita": 42225.8,
      "popChangePct": 0.3
    },
    {
      "year": 2006,
      "gdp": 737.633,
      "growth": 3.5,
      "perCapita": 45158.8,
      "popChangePct": 0.17
    },
    {
      "year": 2007,
      "gdp": 853.6,
      "growth": 3.9,
      "perCapita": 52182.4,
      "popChangePct": 0.15
    },
    {
      "year": 2008,
      "gdp": 957.797,
      "growth": 2.1,
      "perCapita": 58383.0,
      "popChangePct": 0.29
    },
    {
      "year": 2009,
      "gdp": 878,
      "growth": -3.7,
      "perCapita": 53258.0,
      "popChangePct": 0.49
    },
    {
      "year": 2010,
      "gdp": 853.161,
      "growth": 1.3,
      "perCapita": 51472.8,
      "popChangePct": 0.54
    },
    {
      "year": 2011,
      "gdp": 912.98,
      "growth": 1.8,
      "perCapita": 54814.5,
      "popChangePct": 0.49
    },
    {
      "year": 2012,
      "gdp": 846.225,
      "growth": -1,
      "perCapita": 50580.2,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdp": 883.964,
      "growth": 0,
      "perCapita": 52681.0,
      "popChangePct": 0.3
    },
    {
      "year": 2014,
      "gdp": 901.789,
      "growth": 1.6,
      "perCapita": 53584.5,
      "popChangePct": 0.29
    },
    {
      "year": 2015,
      "gdp": 775.822,
      "growth": 2.1,
      "perCapita": 45904.7,
      "popChangePct": 0.43
    },
    {
      "year": 2016,
      "gdp": 796.944,
      "growth": 2.4,
      "perCapita": 46936.7,
      "popChangePct": 0.46
    },
    {
      "year": 2017,
      "gdp": 847.934,
      "growth": 2.8,
      "perCapita": 49640.5,
      "popChangePct": 0.61
    },
    {
      "year": 2018,
      "gdp": 930.155,
      "growth": 2.3,
      "perCapita": 54138.3,
      "popChangePct": 0.58
    },
    {
      "year": 2019,
      "gdp": 929.006,
      "growth": 2.3,
      "perCapita": 53755.2,
      "popChangePct": 0.59
    },
    {
      "year": 2020,
      "gdp": 931.814,
      "growth": -3.9,
      "perCapita": 53529.2,
      "popChangePct": 0.73
    },
    {
      "year": 2021,
      "gdp": 1055.173,
      "growth": 6.3,
      "perCapita": 60380.4,
      "popChangePct": 0.38
    },
    {
      "year": 2022,
      "gdp": 1047.364,
      "growth": 5,
      "perCapita": 59540.9,
      "popChangePct": 0.66
    },
    {
      "year": 2023,
      "gdp": 1135.803,
      "growth": -0.6,
      "perCapita": 63768.7,
      "popChangePct": 1.25
    },
    {
      "year": 2024,
      "gdp": 1214.562,
      "growth": 1.1,
      "perCapita": 67690.2,
      "popChangePct": 0.74
    },
    {
      "year": 2025,
      "gdp": 1332.24,
      "growth": 1.9,
      "perCapita": 73832.8,
      "popChangePct": 0.56
    },
    {
      "year": 2026,
      "gdp": 1449.704,
      "growth": 1.2,
      "perCapita": 79917.5,
      "popChangePct": 0.53
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1500.424,
      "growth": 1.4,
      "perCapita": 82327.8,
      "popChangePct": 0.47
    },
    {
      "year": 2028,
      "gdp": 1551.351,
      "growth": 1.4,
      "perCapita": 84750.3,
      "popChangePct": 0.44
    },
    {
      "year": 2029,
      "gdp": 1603.433,
      "growth": 1.3,
      "perCapita": 87242.9,
      "popChangePct": 0.4
    },
    {
      "year": 2030,
      "gdp": 1654.957,
      "growth": 1.2,
      "perCapita": 89683.8,
      "popChangePct": 0.4
    },
    {
      "year": 2031,
      "gdp": 1707.813,
      "growth": 1.2,
      "perCapita": 92175.6,
      "popChangePct": 0.41
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 171.338,
      "perCapitaPPP": 12159.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 186.585,
      "perCapitaPPP": 13131.8,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 0.84
    },
    {
      "year": 1982,
      "gdpPPP": 195.573,
      "perCapitaPPP": 13690.0,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 0.54
    },
    {
      "year": 1983,
      "gdpPPP": 206.805,
      "perCapitaPPP": 14422.0,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 0.38
    },
    {
      "year": 1984,
      "gdpPPP": 220.95,
      "perCapitaPPP": 15349.5,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 0.38
    },
    {
      "year": 1985,
      "gdpPPP": 233.991,
      "perCapitaPPP": 16188.9,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 0.41
    },
    {
      "year": 1986,
      "gdpPPP": 246.164,
      "perCapitaPPP": 16942.4,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 0.52
    },
    {
      "year": 1987,
      "gdpPPP": 256.931,
      "perCapitaPPP": 17579.8,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": 0.59
    },
    {
      "year": 1988,
      "gdpPPP": 278.188,
      "perCapitaPPP": 18905.1,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 0.68
    },
    {
      "year": 1989,
      "gdpPPP": 302.05,
      "perCapitaPPP": 20401.6,
      "perCapitaPPPChangePct": 7.92,
      "popChangePct": 0.61
    },
    {
      "year": 1990,
      "gdpPPP": 326.446,
      "perCapitaPPP": 21920.1,
      "perCapitaPPPChangePct": 7.44,
      "popChangePct": 0.59
    },
    {
      "year": 1991,
      "gdpPPP": 345.761,
      "perCapitaPPP": 23034.7,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 0.79
    },
    {
      "year": 1992,
      "gdpPPP": 359.259,
      "perCapitaPPP": 23746.2,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 0.79
    },
    {
      "year": 1993,
      "gdpPPP": 372.423,
      "perCapitaPPP": 24438.5,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.73
    },
    {
      "year": 1994,
      "gdpPPP": 391.82,
      "perCapitaPPP": 25539.8,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 0.68
    },
    {
      "year": 1995,
      "gdpPPP": 412.563,
      "perCapitaPPP": 26747.9,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 0.53
    },
    {
      "year": 1996,
      "gdpPPP": 434.466,
      "perCapitaPPP": 28041.2,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 0.45
    },
    {
      "year": 1997,
      "gdpPPP": 460.722,
      "perCapitaPPP": 29595.9,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 0.47
    },
    {
      "year": 1998,
      "gdpPPP": 487.582,
      "perCapitaPPP": 31147.1,
      "perCapitaPPPChangePct": 5.24,
      "popChangePct": 0.56
    },
    {
      "year": 1999,
      "gdpPPP": 519.396,
      "perCapitaPPP": 32956.1,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 0.68
    },
    {
      "year": 2000,
      "gdpPPP": 553.617,
      "perCapitaPPP": 34897.8,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 0.66
    },
    {
      "year": 2001,
      "gdpPPP": 579.261,
      "perCapitaPPP": 36233.1,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 0.78
    },
    {
      "year": 2002,
      "gdpPPP": 589.711,
      "perCapitaPPP": 36616.0,
      "perCapitaPPPChangePct": 1.06,
      "popChangePct": 0.74
    },
    {
      "year": 2003,
      "gdpPPP": 601.943,
      "perCapitaPPP": 37174.0,
      "perCapitaPPPChangePct": 1.52,
      "popChangePct": 0.55
    },
    {
      "year": 2004,
      "gdpPPP": 630.574,
      "perCapitaPPP": 38785.4,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 0.4
    },
    {
      "year": 2005,
      "gdpPPP": 663.544,
      "perCapitaPPP": 40694.4,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 0.3
    },
    {
      "year": 2006,
      "gdpPPP": 708.213,
      "perCapitaPPP": 43357.7,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 0.17
    },
    {
      "year": 2007,
      "gdpPPP": 755.638,
      "perCapitaPPP": 46193.8,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 0.15
    },
    {
      "year": 2008,
      "gdpPPP": 786.576,
      "perCapitaPPP": 47946.2,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 0.29
    },
    {
      "year": 2009,
      "gdpPPP": 762.379,
      "perCapitaPPP": 46244.6,
      "perCapitaPPPChangePct": -3.55,
      "popChangePct": 0.49
    },
    {
      "year": 2010,
      "gdpPPP": 781.807,
      "perCapitaPPP": 47167.9,
      "perCapitaPPPChangePct": 2.0,
      "popChangePct": 0.54
    },
    {
      "year": 2011,
      "gdpPPP": 812.115,
      "perCapitaPPP": 48758.7,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 0.49
    },
    {
      "year": 2012,
      "gdpPPP": 819.151,
      "perCapitaPPP": 48962.0,
      "perCapitaPPPChangePct": 0.42,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdpPPP": 832.827,
      "perCapitaPPP": 49633.4,
      "perCapitaPPPChangePct": 1.37,
      "popChangePct": 0.3
    },
    {
      "year": 2014,
      "gdpPPP": 860.993,
      "perCapitaPPP": 51160.4,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 0.29
    },
    {
      "year": 2015,
      "gdpPPP": 887.416,
      "perCapitaPPP": 52507.5,
      "perCapitaPPPChangePct": 2.63,
      "popChangePct": 0.43
    },
    {
      "year": 2016,
      "gdpPPP": 917.57,
      "perCapitaPPP": 54041.1,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 0.46
    },
    {
      "year": 2017,
      "gdpPPP": 959.996,
      "perCapitaPPP": 56200.9,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.61
    },
    {
      "year": 2018,
      "gdpPPP": 1013.552,
      "perCapitaPPP": 58992.3,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 0.58
    },
    {
      "year": 2019,
      "gdpPPP": 1081.371,
      "perCapitaPPP": 62571.5,
      "perCapitaPPPChangePct": 6.07,
      "popChangePct": 0.59
    },
    {
      "year": 2020,
      "gdpPPP": 1091.779,
      "perCapitaPPP": 62718.6,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 0.73
    },
    {
      "year": 2021,
      "gdpPPP": 1215.449,
      "perCapitaPPP": 69551.9,
      "perCapitaPPPChangePct": 10.9,
      "popChangePct": 0.38
    },
    {
      "year": 2022,
      "gdpPPP": 1367.086,
      "perCapitaPPP": 77716.5,
      "perCapitaPPPChangePct": 11.74,
      "popChangePct": 0.66
    },
    {
      "year": 2023,
      "gdpPPP": 1409.153,
      "perCapitaPPP": 79115.7,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 1.25
    },
    {
      "year": 2024,
      "gdpPPP": 1459.737,
      "perCapitaPPP": 81354.4,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 0.74
    },
    {
      "year": 2025,
      "gdpPPP": 1529.014,
      "perCapitaPPP": 84738.0,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 0.56
    },
    {
      "year": 2026,
      "gdpPPP": 1592.206,
      "perCapitaPPP": 87773.2,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 0.53
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1650.314,
      "perCapitaPPP": 90552.3,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 0.47
    },
    {
      "year": 2028,
      "gdpPPP": 1700.503,
      "perCapitaPPP": 92898.4,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 0.44
    },
    {
      "year": 2029,
      "gdpPPP": 1752.904,
      "perCapitaPPP": 95375.6,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 0.4
    },
    {
      "year": 2030,
      "gdpPPP": 1806.367,
      "perCapitaPPP": 97888.9,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 0.4
    },
    {
      "year": 2031,
      "gdpPPP": 1860.771,
      "perCapitaPPP": 100431.2,
      "perCapitaPPPChangePct": 2.6,
      "popChangePct": 0.41
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NetherlandsGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
