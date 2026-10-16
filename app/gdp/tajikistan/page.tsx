import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Tajikistan",
  "slug": "tajikistan",
  "iso3": "TJK",
  "region": "Asia",
  "rank2026": 138,
  "flagEmoji": "🇹🇯",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Madagascar",
      "slug": "madagascar",
      "rank": 137
    },
    {
      "name": "Syria",
      "slug": "syria",
      "rank": 139
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.291,
      "growth": null,
      "perCapita": 52.6,
      "popChangePct": 0.54
    },
    {
      "year": 1993,
      "gdp": 0.678,
      "growth": -11.1,
      "perCapita": 121.6,
      "popChangePct": 0.67
    },
    {
      "year": 1994,
      "gdp": 0.829,
      "growth": -21.4,
      "perCapita": 147.9,
      "popChangePct": 0.61
    },
    {
      "year": 1995,
      "gdp": 0.569,
      "growth": -12.5,
      "perCapita": 100.4,
      "popChangePct": 1.09
    },
    {
      "year": 1996,
      "gdp": 1.052,
      "growth": -4.4,
      "perCapita": 183.4,
      "popChangePct": 1.18
    },
    {
      "year": 1997,
      "gdp": 1.121,
      "growth": 1.7,
      "perCapita": 192.6,
      "popChangePct": 1.52
    },
    {
      "year": 1998,
      "gdp": 1.32,
      "growth": 5.3,
      "perCapita": 222.3,
      "popChangePct": 2.01
    },
    {
      "year": 1999,
      "gdp": 1.087,
      "growth": 3.7,
      "perCapita": 177.7,
      "popChangePct": 2.96
    },
    {
      "year": 2000,
      "gdp": 0.991,
      "growth": 8.3,
      "perCapita": 159.4,
      "popChangePct": 1.65
    },
    {
      "year": 2001,
      "gdp": 1.057,
      "growth": 10.2,
      "perCapita": 167.0,
      "popChangePct": 1.79
    },
    {
      "year": 2002,
      "gdp": 1.212,
      "growth": 9.1,
      "perCapita": 188.0,
      "popChangePct": 1.91
    },
    {
      "year": 2003,
      "gdp": 1.555,
      "growth": 10.2,
      "perCapita": 236.4,
      "popChangePct": 2.0
    },
    {
      "year": 2004,
      "gdp": 2.073,
      "growth": 10.6,
      "perCapita": 308.8,
      "popChangePct": 2.07
    },
    {
      "year": 2005,
      "gdp": 2.311,
      "growth": 6.7,
      "perCapita": 337.1,
      "popChangePct": 2.1
    },
    {
      "year": 2006,
      "gdp": 2.811,
      "growth": 7,
      "perCapita": 401.6,
      "popChangePct": 2.14
    },
    {
      "year": 2007,
      "gdp": 3.712,
      "growth": 7.8,
      "perCapita": 519.0,
      "popChangePct": 2.16
    },
    {
      "year": 2008,
      "gdp": 5.135,
      "growth": 7.9,
      "perCapita": 702.4,
      "popChangePct": 2.21
    },
    {
      "year": 2009,
      "gdp": 4.977,
      "growth": 3.9,
      "perCapita": 666.0,
      "popChangePct": 2.23
    },
    {
      "year": 2010,
      "gdp": 5.642,
      "growth": 6.5,
      "perCapita": 738.3,
      "popChangePct": 2.26
    },
    {
      "year": 2011,
      "gdp": 6.523,
      "growth": 7.4,
      "perCapita": 834.5,
      "popChangePct": 2.28
    },
    {
      "year": 2012,
      "gdp": 7.592,
      "growth": 7.5,
      "perCapita": 949.6,
      "popChangePct": 2.29
    },
    {
      "year": 2013,
      "gdp": 8.506,
      "growth": 7.4,
      "perCapita": 1040.2,
      "popChangePct": 2.29
    },
    {
      "year": 2014,
      "gdp": 9.242,
      "growth": 6.7,
      "perCapita": 1105.2,
      "popChangePct": 2.26
    },
    {
      "year": 2015,
      "gdp": 7.857,
      "growth": 6,
      "perCapita": 919.1,
      "popChangePct": 2.22
    },
    {
      "year": 2016,
      "gdp": 6.994,
      "growth": 6.9,
      "perCapita": 800.6,
      "popChangePct": 2.18
    },
    {
      "year": 2017,
      "gdp": 7.535,
      "growth": 7.1,
      "perCapita": 844.6,
      "popChangePct": 2.13
    },
    {
      "year": 2018,
      "gdp": 7.762,
      "growth": 7.6,
      "perCapita": 852.3,
      "popChangePct": 2.08
    },
    {
      "year": 2019,
      "gdp": 8.301,
      "growth": 7.4,
      "perCapita": 893.3,
      "popChangePct": 2.03
    },
    {
      "year": 2020,
      "gdp": 8.134,
      "growth": 4.4,
      "perCapita": 858.4,
      "popChangePct": 1.97
    },
    {
      "year": 2021,
      "gdp": 8.934,
      "growth": 9.4,
      "perCapita": 925.1,
      "popChangePct": 1.92
    },
    {
      "year": 2022,
      "gdp": 10.716,
      "growth": 8,
      "perCapita": 1089.5,
      "popChangePct": 1.85
    },
    {
      "year": 2023,
      "gdp": 12.242,
      "growth": 8.3,
      "perCapita": 1222.6,
      "popChangePct": 1.8
    },
    {
      "year": 2024,
      "gdp": 14.426,
      "growth": 8.4,
      "perCapita": 1416.0,
      "popChangePct": 1.75
    },
    {
      "year": 2025,
      "gdp": 17.542,
      "growth": 8.4,
      "perCapita": 1693.2,
      "popChangePct": 1.69
    },
    {
      "year": 2026,
      "gdp": 20.418,
      "growth": 6,
      "perCapita": 1938.9,
      "popChangePct": 1.64
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 21.403,
      "growth": 4.8,
      "perCapita": 2000.6,
      "popChangePct": 1.6
    },
    {
      "year": 2028,
      "gdp": 22.67,
      "growth": 4.5,
      "perCapita": 2086.6,
      "popChangePct": 1.55
    },
    {
      "year": 2029,
      "gdp": 24.041,
      "growth": 4.5,
      "perCapita": 2179.7,
      "popChangePct": 1.52
    },
    {
      "year": 2030,
      "gdp": 25.662,
      "growth": 4.5,
      "perCapita": 2292.4,
      "popChangePct": 1.5
    },
    {
      "year": 2031,
      "gdp": 27.657,
      "growth": 4.5,
      "perCapita": 2434.7,
      "popChangePct": 1.47
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 7.07,
      "perCapitaPPP": 1277.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": 0.54
    },
    {
      "year": 1993,
      "gdpPPP": 6.434,
      "perCapitaPPP": 1154.4,
      "perCapitaPPPChangePct": -9.6,
      "popChangePct": 0.67
    },
    {
      "year": 1994,
      "gdpPPP": 5.165,
      "perCapitaPPP": 921.2,
      "perCapitaPPPChangePct": -20.2,
      "popChangePct": 0.61
    },
    {
      "year": 1995,
      "gdpPPP": 4.614,
      "perCapitaPPP": 814.2,
      "perCapitaPPPChangePct": -11.62,
      "popChangePct": 1.09
    },
    {
      "year": 1996,
      "gdpPPP": 4.494,
      "perCapitaPPP": 783.5,
      "perCapitaPPPChangePct": -3.77,
      "popChangePct": 1.18
    },
    {
      "year": 1997,
      "gdpPPP": 4.649,
      "perCapitaPPP": 798.4,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": 1.52
    },
    {
      "year": 1998,
      "gdpPPP": 4.95,
      "perCapitaPPP": 833.6,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 2.01
    },
    {
      "year": 1999,
      "gdpPPP": 5.206,
      "perCapitaPPP": 851.4,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 2.96
    },
    {
      "year": 2000,
      "gdpPPP": 5.766,
      "perCapitaPPP": 927.5,
      "perCapitaPPPChangePct": 8.95,
      "popChangePct": 1.65
    },
    {
      "year": 2001,
      "gdpPPP": 6.497,
      "perCapitaPPP": 1026.8,
      "perCapitaPPPChangePct": 10.71,
      "popChangePct": 1.79
    },
    {
      "year": 2002,
      "gdpPPP": 7.198,
      "perCapitaPPP": 1116.4,
      "perCapitaPPPChangePct": 8.72,
      "popChangePct": 1.91
    },
    {
      "year": 2003,
      "gdpPPP": 8.089,
      "perCapitaPPP": 1229.9,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": 2.0
    },
    {
      "year": 2004,
      "gdpPPP": 9.187,
      "perCapitaPPP": 1368.6,
      "perCapitaPPPChangePct": 11.27,
      "popChangePct": 2.07
    },
    {
      "year": 2005,
      "gdpPPP": 10.11,
      "perCapitaPPP": 1475.0,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": 2.1
    },
    {
      "year": 2006,
      "gdpPPP": 11.152,
      "perCapitaPPP": 1592.9,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 2.14
    },
    {
      "year": 2007,
      "gdpPPP": 12.347,
      "perCapitaPPP": 1726.3,
      "perCapitaPPPChangePct": 8.37,
      "popChangePct": 2.16
    },
    {
      "year": 2008,
      "gdpPPP": 13.579,
      "perCapitaPPP": 1857.7,
      "perCapitaPPPChangePct": 7.61,
      "popChangePct": 2.21
    },
    {
      "year": 2009,
      "gdpPPP": 14.196,
      "perCapitaPPP": 1899.6,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 2.23
    },
    {
      "year": 2010,
      "gdpPPP": 15.302,
      "perCapitaPPP": 2002.5,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 2.26
    },
    {
      "year": 2011,
      "gdpPPP": 16.774,
      "perCapitaPPP": 2146.1,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 2.28
    },
    {
      "year": 2012,
      "gdpPPP": 18.367,
      "perCapitaPPP": 2297.3,
      "perCapitaPPPChangePct": 7.05,
      "popChangePct": 2.29
    },
    {
      "year": 2013,
      "gdpPPP": 20.062,
      "perCapitaPPP": 2453.3,
      "perCapitaPPPChangePct": 6.79,
      "popChangePct": 2.29
    },
    {
      "year": 2014,
      "gdpPPP": 21.779,
      "perCapitaPPP": 2604.3,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 2.26
    },
    {
      "year": 2015,
      "gdpPPP": 23.3,
      "perCapitaPPP": 2725.6,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 2.22
    },
    {
      "year": 2016,
      "gdpPPP": 25.145,
      "perCapitaPPP": 2878.6,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 2.18
    },
    {
      "year": 2017,
      "gdpPPP": 27.412,
      "perCapitaPPP": 3072.7,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 2.13
    },
    {
      "year": 2018,
      "gdpPPP": 28.565,
      "perCapitaPPP": 3136.5,
      "perCapitaPPPChangePct": 2.08,
      "popChangePct": 2.08
    },
    {
      "year": 2019,
      "gdpPPP": 32.973,
      "perCapitaPPP": 3548.6,
      "perCapitaPPPChangePct": 13.14,
      "popChangePct": 2.03
    },
    {
      "year": 2020,
      "gdpPPP": 35.624,
      "perCapitaPPP": 3759.6,
      "perCapitaPPPChangePct": 5.95,
      "popChangePct": 1.97
    },
    {
      "year": 2021,
      "gdpPPP": 39.727,
      "perCapitaPPP": 4114.0,
      "perCapitaPPPChangePct": 9.42,
      "popChangePct": 1.92
    },
    {
      "year": 2022,
      "gdpPPP": 45.957,
      "perCapitaPPP": 4672.3,
      "perCapitaPPPChangePct": 13.57,
      "popChangePct": 1.85
    },
    {
      "year": 2023,
      "gdpPPP": 51.589,
      "perCapitaPPP": 5152.2,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 1.8
    },
    {
      "year": 2024,
      "gdpPPP": 57.32,
      "perCapitaPPP": 5626.3,
      "perCapitaPPPChangePct": 9.2,
      "popChangePct": 1.75
    },
    {
      "year": 2025,
      "gdpPPP": 63.897,
      "perCapitaPPP": 6167.5,
      "perCapitaPPPChangePct": 9.62,
      "popChangePct": 1.69
    },
    {
      "year": 2026,
      "gdpPPP": 69.671,
      "perCapitaPPP": 6616.2,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 1.64
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 74.619,
      "perCapitaPPP": 6974.9,
      "perCapitaPPPChangePct": 5.42,
      "popChangePct": 1.6
    },
    {
      "year": 2028,
      "gdpPPP": 79.257,
      "perCapitaPPP": 7295.2,
      "perCapitaPPPChangePct": 4.59,
      "popChangePct": 1.55
    },
    {
      "year": 2029,
      "gdpPPP": 84.296,
      "perCapitaPPP": 7642.8,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 1.52
    },
    {
      "year": 2030,
      "gdpPPP": 89.708,
      "perCapitaPPP": 8013.6,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 1.5
    },
    {
      "year": 2031,
      "gdpPPP": 95.437,
      "perCapitaPPP": 8401.7,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 1.47
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TajikistanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
