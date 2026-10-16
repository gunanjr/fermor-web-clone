import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Luxembourg",
  "slug": "luxembourg",
  "iso3": "LUX",
  "region": "Europe",
  "rank2026": 79,
  "flagEmoji": "🇱🇺",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Venezuela",
      "slug": "venezuela",
      "rank": 78
    },
    {
      "name": "Costa Rica",
      "slug": "costa-rica",
      "rank": 80
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 6.434,
      "growth": 3.2,
      "perCapita": 17666.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 5.549,
      "growth": 0.8,
      "perCapita": 15190.2,
      "popChangePct": 0.27
    },
    {
      "year": 1982,
      "gdp": 4.557,
      "growth": 1,
      "perCapita": 12464.1,
      "popChangePct": 0.27
    },
    {
      "year": 1983,
      "gdp": 4.473,
      "growth": 1.9,
      "perCapita": 12234.7,
      "popChangePct": 0.0
    },
    {
      "year": 1984,
      "gdp": 4.385,
      "growth": 4.7,
      "perCapita": 11984.3,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdp": 4.544,
      "growth": 5.6,
      "perCapita": 12393.8,
      "popChangePct": 0.27
    },
    {
      "year": 1986,
      "gdp": 6.611,
      "growth": 10,
      "perCapita": 17950.1,
      "popChangePct": 0.27
    },
    {
      "year": 1987,
      "gdp": 8.211,
      "growth": 4,
      "perCapita": 22149.6,
      "popChangePct": 0.82
    },
    {
      "year": 1988,
      "gdp": 9.301,
      "growth": 8.5,
      "perCapita": 24875.6,
      "popChangePct": 0.81
    },
    {
      "year": 1989,
      "gdp": 9.903,
      "growth": 9.8,
      "perCapita": 26227.0,
      "popChangePct": 1.07
    },
    {
      "year": 1990,
      "gdp": 12.628,
      "growth": 5.3,
      "perCapita": 33067.0,
      "popChangePct": 1.06
    },
    {
      "year": 1991,
      "gdp": 13.683,
      "growth": 8.6,
      "perCapita": 35346.6,
      "popChangePct": 1.31
    },
    {
      "year": 1992,
      "gdp": 15.328,
      "growth": 1.8,
      "perCapita": 39061.2,
      "popChangePct": 1.29
    },
    {
      "year": 1993,
      "gdp": 15.714,
      "growth": 4.2,
      "perCapita": 39483.2,
      "popChangePct": 1.53
    },
    {
      "year": 1994,
      "gdp": 17.487,
      "growth": 3.8,
      "perCapita": 43307.1,
      "popChangePct": 1.51
    },
    {
      "year": 1995,
      "gdp": 20.571,
      "growth": 1.4,
      "perCapita": 50705.3,
      "popChangePct": 0.5
    },
    {
      "year": 1996,
      "gdp": 20.464,
      "growth": 1.5,
      "perCapita": 49719.1,
      "popChangePct": 1.48
    },
    {
      "year": 1997,
      "gdp": 18.428,
      "growth": 5.9,
      "perCapita": 44202.8,
      "popChangePct": 1.21
    },
    {
      "year": 1998,
      "gdp": 19.263,
      "growth": 6.5,
      "perCapita": 45636.8,
      "popChangePct": 1.2
    },
    {
      "year": 1999,
      "gdp": 21.089,
      "growth": 8.4,
      "perCapita": 49341.4,
      "popChangePct": 1.18
    },
    {
      "year": 2000,
      "gdp": 21.24,
      "growth": 8.4,
      "perCapita": 48984.4,
      "popChangePct": 1.64
    },
    {
      "year": 2001,
      "gdp": 21.388,
      "growth": 3.1,
      "perCapita": 48719.1,
      "popChangePct": 1.15
    },
    {
      "year": 2002,
      "gdp": 23.633,
      "growth": 3.2,
      "perCapita": 53227.8,
      "popChangePct": 1.14
    },
    {
      "year": 2003,
      "gdp": 29.66,
      "growth": 2.6,
      "perCapita": 66160.7,
      "popChangePct": 0.9
    },
    {
      "year": 2004,
      "gdp": 35.049,
      "growth": 4.2,
      "perCapita": 77030.6,
      "popChangePct": 1.56
    },
    {
      "year": 2005,
      "gdp": 37.693,
      "growth": 2.5,
      "perCapita": 81728.4,
      "popChangePct": 1.32
    },
    {
      "year": 2006,
      "gdp": 42.912,
      "growth": 6,
      "perCapita": 91478.1,
      "popChangePct": 1.74
    },
    {
      "year": 2007,
      "gdp": 51.593,
      "growth": 8.1,
      "perCapita": 108344.1,
      "popChangePct": 1.49
    },
    {
      "year": 2008,
      "gdp": 58.838,
      "growth": -0.3,
      "perCapita": 121615.8,
      "popChangePct": 1.68
    },
    {
      "year": 2009,
      "gdp": 54.408,
      "growth": -3.2,
      "perCapita": 110249.4,
      "popChangePct": 2.07
    },
    {
      "year": 2010,
      "gdp": 56.26,
      "growth": 3.8,
      "perCapita": 112049.1,
      "popChangePct": 1.62
    },
    {
      "year": 2011,
      "gdp": 61.685,
      "growth": 1,
      "perCapita": 120526.5,
      "popChangePct": 1.99
    },
    {
      "year": 2012,
      "gdp": 59.814,
      "growth": 1.6,
      "perCapita": 113953.5,
      "popChangePct": 2.54
    },
    {
      "year": 2013,
      "gdp": 65.204,
      "growth": 3.2,
      "perCapita": 121423.2,
      "popChangePct": 2.29
    },
    {
      "year": 2014,
      "gdp": 68.823,
      "growth": 2.6,
      "perCapita": 125200.4,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdp": 60.078,
      "growth": 2.3,
      "perCapita": 106710.1,
      "popChangePct": 2.36
    },
    {
      "year": 2016,
      "gdp": 62.2,
      "growth": 5,
      "perCapita": 107948.0,
      "popChangePct": 2.31
    },
    {
      "year": 2017,
      "gdp": 65.689,
      "growth": 1.3,
      "perCapita": 111211.6,
      "popChangePct": 2.6
    },
    {
      "year": 2018,
      "gdp": 71.118,
      "growth": 1.6,
      "perCapita": 118135.3,
      "popChangePct": 1.86
    },
    {
      "year": 2019,
      "gdp": 69.88,
      "growth": 2.7,
      "perCapita": 113830.3,
      "popChangePct": 1.99
    },
    {
      "year": 2020,
      "gdp": 73.612,
      "growth": -0.5,
      "perCapita": 117570.4,
      "popChangePct": 1.95
    },
    {
      "year": 2021,
      "gdp": 86.444,
      "growth": 6.9,
      "perCapita": 136190.7,
      "popChangePct": 1.44
    },
    {
      "year": 2022,
      "gdp": 80.865,
      "growth": -1.1,
      "perCapita": 125295.4,
      "popChangePct": 1.57
    },
    {
      "year": 2023,
      "gdp": 88.814,
      "growth": 0.1,
      "perCapita": 134402.5,
      "popChangePct": 2.48
    },
    {
      "year": 2024,
      "gdp": 93.252,
      "growth": 0.4,
      "perCapita": 138757.2,
      "popChangePct": 1.66
    },
    {
      "year": 2025,
      "gdp": 101.1,
      "growth": 0.6,
      "perCapita": 148247.0,
      "popChangePct": 1.49
    },
    {
      "year": 2026,
      "gdp": 110.417,
      "growth": 1.6,
      "perCapita": 158733.3,
      "popChangePct": 2.05
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 114.475,
      "growth": 1.7,
      "perCapita": 161340.2,
      "popChangePct": 2.01
    },
    {
      "year": 2028,
      "gdp": 119.152,
      "growth": 2.1,
      "perCapita": 164639.7,
      "popChangePct": 1.97
    },
    {
      "year": 2029,
      "gdp": 124.119,
      "growth": 2.1,
      "perCapita": 168140.3,
      "popChangePct": 1.93
    },
    {
      "year": 2030,
      "gdp": 129.281,
      "growth": 2,
      "perCapita": 171698.2,
      "popChangePct": 2.03
    },
    {
      "year": 2031,
      "gdp": 134.618,
      "growth": 2,
      "perCapita": 175281.0,
      "popChangePct": 1.99
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.342,
      "perCapitaPPP": 17414.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 6.998,
      "perCapitaPPP": 19156.4,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 0.27
    },
    {
      "year": 1982,
      "gdpPPP": 7.508,
      "perCapitaPPP": 20534.8,
      "perCapitaPPPChangePct": 7.2,
      "popChangePct": 0.27
    },
    {
      "year": 1983,
      "gdpPPP": 7.949,
      "perCapitaPPP": 21741.4,
      "perCapitaPPPChangePct": 5.88,
      "popChangePct": 0.0
    },
    {
      "year": 1984,
      "gdpPPP": 8.625,
      "perCapitaPPP": 23572.2,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdpPPP": 9.396,
      "perCapitaPPP": 25629.4,
      "perCapitaPPPChangePct": 8.73,
      "popChangePct": 0.27
    },
    {
      "year": 1986,
      "gdpPPP": 10.542,
      "perCapitaPPP": 28622.8,
      "perCapitaPPPChangePct": 11.68,
      "popChangePct": 0.27
    },
    {
      "year": 1987,
      "gdpPPP": 11.23,
      "perCapitaPPP": 30293.6,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 0.82
    },
    {
      "year": 1988,
      "gdpPPP": 12.61,
      "perCapitaPPP": 33725.1,
      "perCapitaPPPChangePct": 11.33,
      "popChangePct": 0.81
    },
    {
      "year": 1989,
      "gdpPPP": 14.388,
      "perCapitaPPP": 38104.5,
      "perCapitaPPPChangePct": 12.99,
      "popChangePct": 1.07
    },
    {
      "year": 1990,
      "gdpPPP": 15.721,
      "perCapitaPPP": 41164.7,
      "perCapitaPPPChangePct": 8.03,
      "popChangePct": 1.06
    },
    {
      "year": 1991,
      "gdpPPP": 17.658,
      "perCapitaPPP": 45614.9,
      "perCapitaPPPChangePct": 10.81,
      "popChangePct": 1.31
    },
    {
      "year": 1992,
      "gdpPPP": 18.389,
      "perCapitaPPP": 46861.7,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 1.29
    },
    {
      "year": 1993,
      "gdpPPP": 19.615,
      "perCapitaPPP": 49284.2,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": 1.53
    },
    {
      "year": 1994,
      "gdpPPP": 20.8,
      "perCapitaPPP": 51509.5,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 1.51
    },
    {
      "year": 1995,
      "gdpPPP": 21.54,
      "perCapitaPPP": 53092.7,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 0.5
    },
    {
      "year": 1996,
      "gdpPPP": 22.266,
      "perCapitaPPP": 54097.3,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 1.48
    },
    {
      "year": 1997,
      "gdpPPP": 23.995,
      "perCapitaPPP": 57556.3,
      "perCapitaPPPChangePct": 6.39,
      "popChangePct": 1.21
    },
    {
      "year": 1998,
      "gdpPPP": 25.84,
      "perCapitaPPP": 61218.4,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 1.2
    },
    {
      "year": 1999,
      "gdpPPP": 28.413,
      "perCapitaPPP": 66477.7,
      "perCapitaPPPChangePct": 8.59,
      "popChangePct": 1.18
    },
    {
      "year": 2000,
      "gdpPPP": 31.509,
      "perCapitaPPP": 72668.4,
      "perCapitaPPPChangePct": 9.31,
      "popChangePct": 1.64
    },
    {
      "year": 2001,
      "gdpPPP": 33.209,
      "perCapitaPPP": 75646.5,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 1.15
    },
    {
      "year": 2002,
      "gdpPPP": 34.813,
      "perCapitaPPP": 78407.1,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 1.14
    },
    {
      "year": 2003,
      "gdpPPP": 36.43,
      "perCapitaPPP": 81262.1,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 0.9
    },
    {
      "year": 2004,
      "gdpPPP": 38.992,
      "perCapitaPPP": 85696.9,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 1.56
    },
    {
      "year": 2005,
      "gdpPPP": 41.213,
      "perCapitaPPP": 89360.4,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.32
    },
    {
      "year": 2006,
      "gdpPPP": 45.04,
      "perCapitaPPP": 96013.9,
      "perCapitaPPPChangePct": 7.45,
      "popChangePct": 1.74
    },
    {
      "year": 2007,
      "gdpPPP": 50.007,
      "perCapitaPPP": 105012.2,
      "perCapitaPPPChangePct": 9.37,
      "popChangePct": 1.49
    },
    {
      "year": 2008,
      "gdpPPP": 50.816,
      "perCapitaPPP": 105035.3,
      "perCapitaPPPChangePct": 0.02,
      "popChangePct": 1.68
    },
    {
      "year": 2009,
      "gdpPPP": 49.473,
      "perCapitaPPP": 100250.1,
      "perCapitaPPPChangePct": -4.56,
      "popChangePct": 2.07
    },
    {
      "year": 2010,
      "gdpPPP": 51.958,
      "perCapitaPPP": 103480.9,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 1.62
    },
    {
      "year": 2011,
      "gdpPPP": 53.584,
      "perCapitaPPP": 104696.5,
      "perCapitaPPPChangePct": 1.17,
      "popChangePct": 1.99
    },
    {
      "year": 2012,
      "gdpPPP": 55.482,
      "perCapitaPPP": 105699.3,
      "perCapitaPPPChangePct": 0.96,
      "popChangePct": 2.54
    },
    {
      "year": 2013,
      "gdpPPP": 58.216,
      "perCapitaPPP": 108408.9,
      "perCapitaPPPChangePct": 2.56,
      "popChangePct": 2.29
    },
    {
      "year": 2014,
      "gdpPPP": 60.783,
      "perCapitaPPP": 110575.2,
      "perCapitaPPPChangePct": 2.0,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdpPPP": 62.739,
      "perCapitaPPP": 111436.5,
      "perCapitaPPPChangePct": 0.78,
      "popChangePct": 2.36
    },
    {
      "year": 2016,
      "gdpPPP": 66.488,
      "perCapitaPPP": 115390.2,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 2.31
    },
    {
      "year": 2017,
      "gdpPPP": 68.57,
      "perCapitaPPP": 116089.4,
      "perCapitaPPPChangePct": 0.61,
      "popChangePct": 2.6
    },
    {
      "year": 2018,
      "gdpPPP": 70.911,
      "perCapitaPPP": 117790.6,
      "perCapitaPPPChangePct": 1.47,
      "popChangePct": 1.86
    },
    {
      "year": 2019,
      "gdpPPP": 75.251,
      "perCapitaPPP": 122579.1,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 1.99
    },
    {
      "year": 2020,
      "gdpPPP": 76.953,
      "perCapitaPPP": 122907.1,
      "perCapitaPPPChangePct": 0.27,
      "popChangePct": 1.95
    },
    {
      "year": 2021,
      "gdpPPP": 89.123,
      "perCapitaPPP": 140411.4,
      "perCapitaPPPChangePct": 14.24,
      "popChangePct": 1.44
    },
    {
      "year": 2022,
      "gdpPPP": 94.414,
      "perCapitaPPP": 146288.8,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 1.57
    },
    {
      "year": 2023,
      "gdpPPP": 98.005,
      "perCapitaPPP": 148310.8,
      "perCapitaPPPChangePct": 1.38,
      "popChangePct": 2.48
    },
    {
      "year": 2024,
      "gdpPPP": 100.798,
      "perCapitaPPP": 149986.4,
      "perCapitaPPPChangePct": 1.13,
      "popChangePct": 1.66
    },
    {
      "year": 2025,
      "gdpPPP": 104.319,
      "perCapitaPPP": 152966.5,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 1.49
    },
    {
      "year": 2026,
      "gdpPPP": 109.016,
      "perCapitaPPP": 156719.1,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 2.05
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 113.259,
      "perCapitaPPP": 159626.7,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 2.01
    },
    {
      "year": 2028,
      "gdpPPP": 117.583,
      "perCapitaPPP": 162471.9,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 1.97
    },
    {
      "year": 2029,
      "gdpPPP": 122.152,
      "perCapitaPPP": 165475.4,
      "perCapitaPPPChangePct": 1.85,
      "popChangePct": 1.93
    },
    {
      "year": 2030,
      "gdpPPP": 126.922,
      "perCapitaPPP": 168565.8,
      "perCapitaPPPChangePct": 1.87,
      "popChangePct": 2.03
    },
    {
      "year": 2031,
      "gdpPPP": 131.784,
      "perCapitaPPP": 171591.3,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 1.99
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LuxembourgGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
