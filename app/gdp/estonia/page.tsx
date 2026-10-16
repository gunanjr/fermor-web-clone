import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Estonia",
  "slug": "estonia",
  "iso3": "EST",
  "region": "Europe",
  "rank2026": 102,
  "flagEmoji": "🇪🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Cambodia",
      "slug": "cambodia",
      "rank": 101
    },
    {
      "name": "Bahrain",
      "slug": "bahrain",
      "rank": 103
    }
  ],
  "history": [
    {
      "year": 1993,
      "gdp": 1.791,
      "growth": null,
      "perCapita": 1194.2,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdp": 2.507,
      "growth": -1.6,
      "perCapita": 1711.3,
      "popChangePct": -2.27
    },
    {
      "year": 1995,
      "gdp": 3.909,
      "growth": 2.2,
      "perCapita": 2721.0,
      "popChangePct": -1.91
    },
    {
      "year": 1996,
      "gdp": 4.785,
      "growth": 4.9,
      "perCapita": 3379.9,
      "popChangePct": -1.46
    },
    {
      "year": 1997,
      "gdp": 5.16,
      "growth": 13.1,
      "perCapita": 3686.9,
      "popChangePct": -1.13
    },
    {
      "year": 1998,
      "gdp": 5.678,
      "growth": 4.3,
      "perCapita": 4096.1,
      "popChangePct": -1.0
    },
    {
      "year": 1999,
      "gdp": 5.771,
      "growth": -0.4,
      "perCapita": 4151.4,
      "popChangePct": 0.29
    },
    {
      "year": 2000,
      "gdp": 5.707,
      "growth": 10.1,
      "perCapita": 4084.9,
      "popChangePct": 0.5
    },
    {
      "year": 2001,
      "gdp": 6.265,
      "growth": 5.9,
      "perCapita": 4513.0,
      "popChangePct": -0.64
    },
    {
      "year": 2002,
      "gdp": 7.393,
      "growth": 6.9,
      "perCapita": 5360.0,
      "popChangePct": -0.65
    },
    {
      "year": 2003,
      "gdp": 9.894,
      "growth": 7.6,
      "perCapita": 7218.2,
      "popChangePct": -0.58
    },
    {
      "year": 2004,
      "gdp": 12.161,
      "growth": 6.8,
      "perCapita": 8925.2,
      "popChangePct": -0.58
    },
    {
      "year": 2005,
      "gdp": 14.129,
      "growth": 9.5,
      "perCapita": 10428.7,
      "popChangePct": -0.59
    },
    {
      "year": 2006,
      "gdp": 17.049,
      "growth": 9.8,
      "perCapita": 12659.1,
      "popChangePct": -0.59
    },
    {
      "year": 2007,
      "gdp": 22.478,
      "growth": 7.6,
      "perCapita": 16765.8,
      "popChangePct": -0.45
    },
    {
      "year": 2008,
      "gdp": 24.434,
      "growth": -5.1,
      "perCapita": 18274.2,
      "popChangePct": -0.3
    },
    {
      "year": 2009,
      "gdp": 19.694,
      "growth": -14.6,
      "perCapita": 14757.1,
      "popChangePct": -0.15
    },
    {
      "year": 2010,
      "gdp": 19.569,
      "growth": 2.4,
      "perCapita": 14697.5,
      "popChangePct": -0.3
    },
    {
      "year": 2011,
      "gdp": 23.3,
      "growth": 7.6,
      "perCapita": 17552.5,
      "popChangePct": -0.3
    },
    {
      "year": 2012,
      "gdp": 23.252,
      "growth": 3.7,
      "perCapita": 17579.3,
      "popChangePct": -0.3
    },
    {
      "year": 2013,
      "gdp": 25.451,
      "growth": 1.8,
      "perCapita": 19310.7,
      "popChangePct": -0.38
    },
    {
      "year": 2014,
      "gdp": 27.063,
      "growth": 3.3,
      "perCapita": 20574.6,
      "popChangePct": -0.23
    },
    {
      "year": 2015,
      "gdp": 23.314,
      "growth": 1.8,
      "perCapita": 17724.0,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 24.554,
      "growth": 3.1,
      "perCapita": 18661.2,
      "popChangePct": 0.08
    },
    {
      "year": 2017,
      "gdp": 27.46,
      "growth": 5.6,
      "perCapita": 20844.2,
      "popChangePct": 0.08
    },
    {
      "year": 2018,
      "gdp": 31.237,
      "growth": 3.7,
      "perCapita": 23628.9,
      "popChangePct": 0.38
    },
    {
      "year": 2019,
      "gdp": 31.877,
      "growth": 3.7,
      "perCapita": 24023.9,
      "popChangePct": 0.38
    },
    {
      "year": 2020,
      "gdp": 31.795,
      "growth": -2.9,
      "perCapita": 23914.8,
      "popChangePct": 0.23
    },
    {
      "year": 2021,
      "gdp": 37.226,
      "growth": 8.3,
      "perCapita": 27969.7,
      "popChangePct": 0.08
    },
    {
      "year": 2022,
      "gdp": 38.257,
      "growth": -1.2,
      "perCapita": 28362.7,
      "popChangePct": 1.35
    },
    {
      "year": 2023,
      "gdp": 41.482,
      "growth": -2.7,
      "perCapita": 30272.8,
      "popChangePct": 1.56
    },
    {
      "year": 2024,
      "gdp": 43.117,
      "growth": -0.1,
      "perCapita": 31418.9,
      "popChangePct": 0.15
    },
    {
      "year": 2025,
      "gdp": 47.004,
      "growth": 0.6,
      "perCapita": 34325.3,
      "popChangePct": -0.22
    },
    {
      "year": 2026,
      "gdp": 51.634,
      "growth": 1.4,
      "perCapita": 37718.0,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 54.2,
      "growth": 1.9,
      "perCapita": 39644.0,
      "popChangePct": -0.15
    },
    {
      "year": 2028,
      "gdp": 57.062,
      "growth": 2.3,
      "perCapita": 41798.8,
      "popChangePct": -0.15
    },
    {
      "year": 2029,
      "gdp": 59.802,
      "growth": 2.1,
      "perCapita": 43876.0,
      "popChangePct": -0.15
    },
    {
      "year": 2030,
      "gdp": 62.434,
      "growth": 1.7,
      "perCapita": 45879.8,
      "popChangePct": -0.15
    },
    {
      "year": 2031,
      "gdp": 65.152,
      "growth": 1.7,
      "perCapita": 47876.6,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1993,
      "gdpPPP": 11.785,
      "perCapitaPPP": 7860.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdpPPP": 11.839,
      "perCapitaPPP": 8080.0,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": -2.27
    },
    {
      "year": 1995,
      "gdpPPP": 12.348,
      "perCapitaPPP": 8595.2,
      "perCapitaPPPChangePct": 6.38,
      "popChangePct": -1.91
    },
    {
      "year": 1996,
      "gdpPPP": 13.196,
      "perCapitaPPP": 9321.8,
      "perCapitaPPPChangePct": 8.45,
      "popChangePct": -1.46
    },
    {
      "year": 1997,
      "gdpPPP": 15.175,
      "perCapitaPPP": 10843.0,
      "perCapitaPPPChangePct": 16.32,
      "popChangePct": -1.13
    },
    {
      "year": 1998,
      "gdpPPP": 16.012,
      "perCapitaPPP": 11551.1,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": -1.0
    },
    {
      "year": 1999,
      "gdpPPP": 16.169,
      "perCapitaPPP": 11630.5,
      "perCapitaPPPChangePct": 0.69,
      "popChangePct": 0.29
    },
    {
      "year": 2000,
      "gdpPPP": 18.204,
      "perCapitaPPP": 13030.6,
      "perCapitaPPPChangePct": 12.04,
      "popChangePct": 0.5
    },
    {
      "year": 2001,
      "gdpPPP": 19.708,
      "perCapitaPPP": 14197.7,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": -0.64
    },
    {
      "year": 2002,
      "gdpPPP": 21.402,
      "perCapitaPPP": 15515.9,
      "perCapitaPPPChangePct": 9.28,
      "popChangePct": -0.65
    },
    {
      "year": 2003,
      "gdpPPP": 23.482,
      "perCapitaPPP": 17131.3,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": -0.58
    },
    {
      "year": 2004,
      "gdpPPP": 25.754,
      "perCapitaPPP": 18901.0,
      "perCapitaPPPChangePct": 10.33,
      "popChangePct": -0.58
    },
    {
      "year": 2005,
      "gdpPPP": 29.091,
      "perCapitaPPP": 21472.6,
      "perCapitaPPPChangePct": 13.61,
      "popChangePct": -0.59
    },
    {
      "year": 2006,
      "gdpPPP": 32.915,
      "perCapitaPPP": 24439.4,
      "perCapitaPPPChangePct": 13.82,
      "popChangePct": -0.59
    },
    {
      "year": 2007,
      "gdpPPP": 36.367,
      "perCapitaPPP": 27125.4,
      "perCapitaPPPChangePct": 10.99,
      "popChangePct": -0.45
    },
    {
      "year": 2008,
      "gdpPPP": 35.167,
      "perCapitaPPP": 26301.4,
      "perCapitaPPPChangePct": -3.04,
      "popChangePct": -0.3
    },
    {
      "year": 2009,
      "gdpPPP": 30.207,
      "perCapitaPPP": 22635.5,
      "perCapitaPPPChangePct": -13.94,
      "popChangePct": -0.15
    },
    {
      "year": 2010,
      "gdpPPP": 31.324,
      "perCapitaPPP": 23525.5,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": -0.3
    },
    {
      "year": 2011,
      "gdpPPP": 34.402,
      "perCapitaPPP": 25915.9,
      "perCapitaPPPChangePct": 10.16,
      "popChangePct": -0.3
    },
    {
      "year": 2012,
      "gdpPPP": 36.329,
      "perCapitaPPP": 27465.9,
      "perCapitaPPPChangePct": 5.98,
      "popChangePct": -0.3
    },
    {
      "year": 2013,
      "gdpPPP": 37.596,
      "perCapitaPPP": 28525.4,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": -0.38
    },
    {
      "year": 2014,
      "gdpPPP": 39.522,
      "perCapitaPPP": 30047.0,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": -0.23
    },
    {
      "year": 2015,
      "gdpPPP": 40.622,
      "perCapitaPPP": 30881.9,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 42.277,
      "perCapitaPPP": 32130.2,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 0.08
    },
    {
      "year": 2017,
      "gdpPPP": 45.459,
      "perCapitaPPP": 34506.7,
      "perCapitaPPPChangePct": 7.4,
      "popChangePct": 0.08
    },
    {
      "year": 2018,
      "gdpPPP": 49.073,
      "perCapitaPPP": 37121.0,
      "perCapitaPPPChangePct": 7.58,
      "popChangePct": 0.38
    },
    {
      "year": 2019,
      "gdpPPP": 53.854,
      "perCapitaPPP": 40586.3,
      "perCapitaPPPChangePct": 9.34,
      "popChangePct": 0.38
    },
    {
      "year": 2020,
      "gdpPPP": 54.074,
      "perCapitaPPP": 40672.1,
      "perCapitaPPPChangePct": 0.21,
      "popChangePct": 0.23
    },
    {
      "year": 2021,
      "gdpPPP": 59.971,
      "perCapitaPPP": 45059.3,
      "perCapitaPPPChangePct": 10.79,
      "popChangePct": 0.08
    },
    {
      "year": 2022,
      "gdpPPP": 63.449,
      "perCapitaPPP": 47039.4,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 1.35
    },
    {
      "year": 2023,
      "gdpPPP": 63.991,
      "perCapitaPPP": 46698.8,
      "perCapitaPPPChangePct": -0.72,
      "popChangePct": 1.56
    },
    {
      "year": 2024,
      "gdpPPP": 65.52,
      "perCapitaPPP": 47743.4,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 0.15
    },
    {
      "year": 2025,
      "gdpPPP": 67.773,
      "perCapitaPPP": 49491.7,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": -0.22
    },
    {
      "year": 2026,
      "gdpPPP": 70.711,
      "perCapitaPPP": 51652.8,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 73.66,
      "perCapitaPPP": 53878.2,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": -0.15
    },
    {
      "year": 2028,
      "gdpPPP": 76.616,
      "perCapitaPPP": 56122.3,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": -0.15
    },
    {
      "year": 2029,
      "gdpPPP": 79.595,
      "perCapitaPPP": 58397.7,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": -0.15
    },
    {
      "year": 2030,
      "gdpPPP": 82.437,
      "perCapitaPPP": 60578.5,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": -0.15
    },
    {
      "year": 2031,
      "gdpPPP": 85.324,
      "perCapitaPPP": 62700.1,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function EstoniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
