import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Gabon",
  "slug": "gabon",
  "iso3": "GAB",
  "region": "Africa",
  "rank2026": 131,
  "flagEmoji": "🇬🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Kyrgyzstan",
      "slug": "kyrgyzstan",
      "rank": 130
    },
    {
      "name": "Mozambique",
      "slug": "mozambique",
      "rank": 132
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.559,
      "growth": 0,
      "perCapita": 6093.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.111,
      "growth": -4,
      "perCapita": 5376.6,
      "popChangePct": 2.27
    },
    {
      "year": 1982,
      "gdp": 3.853,
      "growth": 4.1,
      "perCapita": 4930.5,
      "popChangePct": 2.09
    },
    {
      "year": 1983,
      "gdp": 3.689,
      "growth": 2,
      "perCapita": 4619.0,
      "popChangePct": 2.3
    },
    {
      "year": 1984,
      "gdp": 3.547,
      "growth": 4.9,
      "perCapita": 4346.4,
      "popChangePct": 2.13
    },
    {
      "year": 1985,
      "gdp": 3.736,
      "growth": 5.8,
      "perCapita": 4478.5,
      "popChangePct": 2.21
    },
    {
      "year": 1986,
      "gdp": 4.889,
      "growth": -2.1,
      "perCapita": 5735.4,
      "popChangePct": 2.16
    },
    {
      "year": 1987,
      "gdp": 3.699,
      "growth": -15.4,
      "perCapita": 4246.0,
      "popChangePct": 2.23
    },
    {
      "year": 1988,
      "gdp": 4.079,
      "growth": 3.5,
      "perCapita": 4581.1,
      "popChangePct": 2.18
    },
    {
      "year": 1989,
      "gdp": 4.458,
      "growth": 15.4,
      "perCapita": 4899.2,
      "popChangePct": 2.25
    },
    {
      "year": 1990,
      "gdp": 6.339,
      "growth": 5.1,
      "perCapita": 6815.6,
      "popChangePct": 2.2
    },
    {
      "year": 1991,
      "gdp": 5.754,
      "growth": 6.1,
      "perCapita": 5993.3,
      "popChangePct": 3.23
    },
    {
      "year": 1992,
      "gdp": 5.955,
      "growth": -3.1,
      "perCapita": 6015.5,
      "popChangePct": 3.13
    },
    {
      "year": 1993,
      "gdp": 5.757,
      "growth": 3.9,
      "perCapita": 5677.6,
      "popChangePct": 2.42
    },
    {
      "year": 1994,
      "gdp": 4.463,
      "growth": 3.7,
      "perCapita": 4293.9,
      "popChangePct": 2.47
    },
    {
      "year": 1995,
      "gdp": 5.281,
      "growth": 5,
      "perCapita": 4956.8,
      "popChangePct": 2.5
    },
    {
      "year": 1996,
      "gdp": 6.064,
      "growth": 3.6,
      "perCapita": 5552.9,
      "popChangePct": 2.54
    },
    {
      "year": 1997,
      "gdp": 5.673,
      "growth": 5.7,
      "perCapita": 5068.1,
      "popChangePct": 2.47
    },
    {
      "year": 1998,
      "gdp": 4.774,
      "growth": 3.5,
      "perCapita": 4161.6,
      "popChangePct": 2.5
    },
    {
      "year": 1999,
      "gdp": 4.966,
      "growth": -8.9,
      "perCapita": 4222.7,
      "popChangePct": 2.53
    },
    {
      "year": 2000,
      "gdp": 5.397,
      "growth": -1.9,
      "perCapita": 4477.3,
      "popChangePct": 2.47
    },
    {
      "year": 2001,
      "gdp": 5.023,
      "growth": 2.1,
      "perCapita": 4065.9,
      "popChangePct": 2.49
    },
    {
      "year": 2002,
      "gdp": 5.332,
      "growth": -0.2,
      "perCapita": 4210.3,
      "popChangePct": 2.51
    },
    {
      "year": 2003,
      "gdp": 6.51,
      "growth": 2.2,
      "perCapita": 5015.6,
      "popChangePct": 2.53
    },
    {
      "year": 2004,
      "gdp": 7.767,
      "growth": 0.7,
      "perCapita": 5837.6,
      "popChangePct": 2.47
    },
    {
      "year": 2005,
      "gdp": 9.468,
      "growth": 3.9,
      "perCapita": 6942.7,
      "popChangePct": 2.56
    },
    {
      "year": 2006,
      "gdp": 10.164,
      "growth": -3.6,
      "perCapita": 7271.1,
      "popChangePct": 2.49
    },
    {
      "year": 2007,
      "gdp": 12.457,
      "growth": 6.5,
      "perCapita": 8652.1,
      "popChangePct": 3.0
    },
    {
      "year": 2008,
      "gdp": 15.57,
      "growth": -3,
      "perCapita": 10418.3,
      "popChangePct": 3.75
    },
    {
      "year": 2009,
      "gdp": 12.188,
      "growth": -1.2,
      "perCapita": 7856.9,
      "popChangePct": 3.82
    },
    {
      "year": 2010,
      "gdp": 14.384,
      "growth": 7.4,
      "perCapita": 8933.3,
      "popChangePct": 3.8
    },
    {
      "year": 2011,
      "gdp": 18.207,
      "growth": 7.1,
      "perCapita": 10893.5,
      "popChangePct": 3.79
    },
    {
      "year": 2012,
      "gdp": 17.181,
      "growth": 5.3,
      "perCapita": 9903.4,
      "popChangePct": 3.83
    },
    {
      "year": 2013,
      "gdp": 17.596,
      "growth": 5.5,
      "perCapita": 9760.7,
      "popChangePct": 3.92
    },
    {
      "year": 2014,
      "gdp": 18.209,
      "growth": 4.4,
      "perCapita": 9746.8,
      "popChangePct": 3.61
    },
    {
      "year": 2015,
      "gdp": 14.385,
      "growth": 3.9,
      "perCapita": 7453.1,
      "popChangePct": 3.32
    },
    {
      "year": 2016,
      "gdp": 14.02,
      "growth": 2.1,
      "perCapita": 7082.2,
      "popChangePct": 2.59
    },
    {
      "year": 2017,
      "gdp": 14.924,
      "growth": 0.5,
      "perCapita": 7370.3,
      "popChangePct": 2.27
    },
    {
      "year": 2018,
      "gdp": 16.83,
      "growth": 0.9,
      "perCapita": 8198.6,
      "popChangePct": 1.38
    },
    {
      "year": 2019,
      "gdp": 16.875,
      "growth": 3.8,
      "perCapita": 8111.3,
      "popChangePct": 1.32
    },
    {
      "year": 2020,
      "gdp": 15.364,
      "growth": -1.8,
      "perCapita": 7289.5,
      "popChangePct": 1.35
    },
    {
      "year": 2021,
      "gdp": 19.455,
      "growth": 1.5,
      "perCapita": 9113.8,
      "popChangePct": 1.28
    },
    {
      "year": 2022,
      "gdp": 20.485,
      "growth": 3,
      "perCapita": 9478.2,
      "popChangePct": 1.22
    },
    {
      "year": 2023,
      "gdp": 20.059,
      "growth": 2.4,
      "perCapita": 9079.3,
      "popChangePct": 2.22
    },
    {
      "year": 2024,
      "gdp": 20.9,
      "growth": 3.4,
      "perCapita": 9258.0,
      "popChangePct": 2.22
    },
    {
      "year": 2025,
      "gdp": 21.624,
      "growth": 2.5,
      "perCapita": 9376.4,
      "popChangePct": 2.13
    },
    {
      "year": 2026,
      "gdp": 23.363,
      "growth": 2.7,
      "perCapita": 9917.6,
      "popChangePct": 2.17
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 24.185,
      "growth": 2.8,
      "perCapita": 10050.0,
      "popChangePct": 2.12
    },
    {
      "year": 2028,
      "gdp": 25.231,
      "growth": 2.8,
      "perCapita": 10261.8,
      "popChangePct": 2.2
    },
    {
      "year": 2029,
      "gdp": 26.416,
      "growth": 2.8,
      "perCapita": 10516.4,
      "popChangePct": 2.16
    },
    {
      "year": 2030,
      "gdp": 27.64,
      "growth": 2.8,
      "perCapita": 10771.2,
      "popChangePct": 2.15
    },
    {
      "year": 2031,
      "gdp": 28.906,
      "growth": 2.9,
      "perCapita": 11026.8,
      "popChangePct": 2.14
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 5.946,
      "perCapitaPPP": 7947.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 6.248,
      "perCapitaPPP": 8171.7,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 2.27
    },
    {
      "year": 1982,
      "gdpPPP": 6.906,
      "perCapitaPPP": 8837.9,
      "perCapitaPPPChangePct": 8.15,
      "popChangePct": 2.09
    },
    {
      "year": 1983,
      "gdpPPP": 7.32,
      "perCapitaPPP": 9166.1,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 2.3
    },
    {
      "year": 1984,
      "gdpPPP": 7.956,
      "perCapitaPPP": 9747.8,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 2.13
    },
    {
      "year": 1985,
      "gdpPPP": 8.684,
      "perCapitaPPP": 10410.3,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 2.21
    },
    {
      "year": 1986,
      "gdpPPP": 8.672,
      "perCapitaPPP": 10173.1,
      "perCapitaPPPChangePct": -2.28,
      "popChangePct": 2.16
    },
    {
      "year": 1987,
      "gdpPPP": 7.519,
      "perCapitaPPP": 8629.8,
      "perCapitaPPPChangePct": -15.17,
      "popChangePct": 2.23
    },
    {
      "year": 1988,
      "gdpPPP": 8.056,
      "perCapitaPPP": 9047.8,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 2.18
    },
    {
      "year": 1989,
      "gdpPPP": 9.664,
      "perCapitaPPP": 10619.9,
      "perCapitaPPPChangePct": 17.37,
      "popChangePct": 2.25
    },
    {
      "year": 1990,
      "gdpPPP": 10.542,
      "perCapitaPPP": 11335.2,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 2.2
    },
    {
      "year": 1991,
      "gdpPPP": 11.566,
      "perCapitaPPP": 12047.6,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 3.23
    },
    {
      "year": 1992,
      "gdpPPP": 11.464,
      "perCapitaPPP": 11579.9,
      "perCapitaPPPChangePct": -3.88,
      "popChangePct": 3.13
    },
    {
      "year": 1993,
      "gdpPPP": 12.199,
      "perCapitaPPP": 12030.5,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 2.42
    },
    {
      "year": 1994,
      "gdpPPP": 12.922,
      "perCapitaPPP": 12432.8,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 2.47
    },
    {
      "year": 1995,
      "gdpPPP": 13.849,
      "perCapitaPPP": 12999.8,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 2.5
    },
    {
      "year": 1996,
      "gdpPPP": 14.614,
      "perCapitaPPP": 13383.1,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 2.54
    },
    {
      "year": 1997,
      "gdpPPP": 15.719,
      "perCapitaPPP": 14044.0,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 2.47
    },
    {
      "year": 1998,
      "gdpPPP": 16.449,
      "perCapitaPPP": 14337.4,
      "perCapitaPPPChangePct": 2.09,
      "popChangePct": 2.5
    },
    {
      "year": 1999,
      "gdpPPP": 15.189,
      "perCapitaPPP": 12917.0,
      "perCapitaPPPChangePct": -9.91,
      "popChangePct": 2.53
    },
    {
      "year": 2000,
      "gdpPPP": 15.241,
      "perCapitaPPP": 12644.7,
      "perCapitaPPPChangePct": -2.11,
      "popChangePct": 2.47
    },
    {
      "year": 2001,
      "gdpPPP": 15.919,
      "perCapitaPPP": 12885.2,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": 2.49
    },
    {
      "year": 2002,
      "gdpPPP": 16.126,
      "perCapitaPPP": 12734.5,
      "perCapitaPPPChangePct": -1.17,
      "popChangePct": 2.51
    },
    {
      "year": 2003,
      "gdpPPP": 16.814,
      "perCapitaPPP": 12953.9,
      "perCapitaPPPChangePct": 1.72,
      "popChangePct": 2.53
    },
    {
      "year": 2004,
      "gdpPPP": 17.385,
      "perCapitaPPP": 13067.2,
      "perCapitaPPPChangePct": 0.88,
      "popChangePct": 2.47
    },
    {
      "year": 2005,
      "gdpPPP": 18.63,
      "perCapitaPPP": 13661.0,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 2.56
    },
    {
      "year": 2006,
      "gdpPPP": 18.506,
      "perCapitaPPP": 13239.6,
      "perCapitaPPPChangePct": -3.08,
      "popChangePct": 2.49
    },
    {
      "year": 2007,
      "gdpPPP": 20.241,
      "perCapitaPPP": 14058.6,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 3.0
    },
    {
      "year": 2008,
      "gdpPPP": 20.006,
      "perCapitaPPP": 13386.6,
      "perCapitaPPPChangePct": -4.78,
      "popChangePct": 3.75
    },
    {
      "year": 2009,
      "gdpPPP": 19.888,
      "perCapitaPPP": 12820.9,
      "perCapitaPPPChangePct": -4.23,
      "popChangePct": 3.82
    },
    {
      "year": 2010,
      "gdpPPP": 21.615,
      "perCapitaPPP": 13423.6,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 3.8
    },
    {
      "year": 2011,
      "gdpPPP": 23.625,
      "perCapitaPPP": 14135.0,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 3.79
    },
    {
      "year": 2012,
      "gdpPPP": 25.329,
      "perCapitaPPP": 14599.5,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 3.83
    },
    {
      "year": 2013,
      "gdpPPP": 27.181,
      "perCapitaPPP": 15077.6,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 3.92
    },
    {
      "year": 2014,
      "gdpPPP": 28.881,
      "perCapitaPPP": 15459.4,
      "perCapitaPPPChangePct": 2.53,
      "popChangePct": 3.61
    },
    {
      "year": 2015,
      "gdpPPP": 30.279,
      "perCapitaPPP": 15688.8,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 3.32
    },
    {
      "year": 2016,
      "gdpPPP": 31.206,
      "perCapitaPPP": 15764.0,
      "perCapitaPPPChangePct": 0.48,
      "popChangePct": 2.59
    },
    {
      "year": 2017,
      "gdpPPP": 31.915,
      "perCapitaPPP": 15761.2,
      "perCapitaPPPChangePct": -0.02,
      "popChangePct": 2.27
    },
    {
      "year": 2018,
      "gdpPPP": 34.049,
      "perCapitaPPP": 16586.9,
      "perCapitaPPPChangePct": 5.24,
      "popChangePct": 1.38
    },
    {
      "year": 2019,
      "gdpPPP": 36.169,
      "perCapitaPPP": 17385.3,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 1.32
    },
    {
      "year": 2020,
      "gdpPPP": 33.624,
      "perCapitaPPP": 15952.3,
      "perCapitaPPPChangePct": -8.24,
      "popChangePct": 1.35
    },
    {
      "year": 2021,
      "gdpPPP": 44.025,
      "perCapitaPPP": 20623.8,
      "perCapitaPPPChangePct": 29.28,
      "popChangePct": 1.28
    },
    {
      "year": 2022,
      "gdpPPP": 48.589,
      "perCapitaPPP": 22482.3,
      "perCapitaPPPChangePct": 9.01,
      "popChangePct": 1.22
    },
    {
      "year": 2023,
      "gdpPPP": 51.619,
      "perCapitaPPP": 23364.8,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 2.22
    },
    {
      "year": 2024,
      "gdpPPP": 54.693,
      "perCapitaPPP": 24226.6,
      "perCapitaPPPChangePct": 3.69,
      "popChangePct": 2.22
    },
    {
      "year": 2025,
      "gdpPPP": 57.657,
      "perCapitaPPP": 25000.3,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 2.13
    },
    {
      "year": 2026,
      "gdpPPP": 60.889,
      "perCapitaPPP": 25847.2,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 2.17
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 63.974,
      "perCapitaPPP": 26584.9,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 2.12
    },
    {
      "year": 2028,
      "gdpPPP": 66.876,
      "perCapitaPPP": 27199.9,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 2.2
    },
    {
      "year": 2029,
      "gdpPPP": 70.005,
      "perCapitaPPP": 27869.6,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 2.16
    },
    {
      "year": 2030,
      "gdpPPP": 73.319,
      "perCapitaPPP": 28572.6,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 2.15
    },
    {
      "year": 2031,
      "gdpPPP": 76.785,
      "perCapitaPPP": 29291.2,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 2.14
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GabonGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
