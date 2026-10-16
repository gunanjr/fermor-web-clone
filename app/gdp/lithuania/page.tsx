import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Lithuania",
  "slug": "lithuania",
  "iso3": "LTU",
  "region": "Europe",
  "rank2026": 81,
  "flagEmoji": "🇱🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Costa Rica",
      "slug": "costa-rica",
      "rank": 80
    },
    {
      "name": "Belarus",
      "slug": "belarus",
      "rank": 82
    }
  ],
  "history": [
    {
      "year": 1995,
      "gdp": 6.742,
      "growth": null,
      "perCapita": 1857.7,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdp": 8.44,
      "growth": 5.2,
      "perCapita": 2343.4,
      "popChangePct": -0.74
    },
    {
      "year": 1997,
      "gdp": 10.159,
      "growth": 8.4,
      "perCapita": 2841.5,
      "popChangePct": -0.75
    },
    {
      "year": 1998,
      "gdp": 11.284,
      "growth": 7.7,
      "perCapita": 3179.1,
      "popChangePct": -0.73
    },
    {
      "year": 1999,
      "gdp": 11.017,
      "growth": -1.1,
      "perCapita": 3126.1,
      "popChangePct": -0.7
    },
    {
      "year": 2000,
      "gdp": 11.541,
      "growth": 3.3,
      "perCapita": 3297.8,
      "popChangePct": -0.68
    },
    {
      "year": 2001,
      "gdp": 12.26,
      "growth": 6.6,
      "perCapita": 3532.2,
      "popChangePct": -0.83
    },
    {
      "year": 2002,
      "gdp": 14.283,
      "growth": 6.5,
      "perCapita": 4148.2,
      "popChangePct": -0.81
    },
    {
      "year": 2003,
      "gdp": 18.801,
      "growth": 10.5,
      "perCapita": 5505.1,
      "popChangePct": -0.81
    },
    {
      "year": 2004,
      "gdp": 22.71,
      "growth": 6.3,
      "perCapita": 6724.7,
      "popChangePct": -1.11
    },
    {
      "year": 2005,
      "gdp": 26.118,
      "growth": 8.2,
      "perCapita": 7861.0,
      "popChangePct": -1.6
    },
    {
      "year": 2006,
      "gdp": 30.138,
      "growth": 7.3,
      "perCapita": 9216.8,
      "popChangePct": -1.59
    },
    {
      "year": 2007,
      "gdp": 39.765,
      "growth": 11.1,
      "perCapita": 12306.2,
      "popChangePct": -1.19
    },
    {
      "year": 2008,
      "gdp": 48.004,
      "growth": 2.2,
      "perCapita": 15009.6,
      "popChangePct": -1.02
    },
    {
      "year": 2009,
      "gdp": 37.591,
      "growth": -14.5,
      "perCapita": 11884.9,
      "popChangePct": -1.09
    },
    {
      "year": 2010,
      "gdp": 36.693,
      "growth": 0.3,
      "perCapita": 11846.8,
      "popChangePct": -2.09
    },
    {
      "year": 2011,
      "gdp": 43.201,
      "growth": 6.3,
      "perCapita": 14266.8,
      "popChangePct": -2.23
    },
    {
      "year": 2012,
      "gdp": 42.736,
      "growth": 4.4,
      "perCapita": 14297.0,
      "popChangePct": -1.29
    },
    {
      "year": 2013,
      "gdp": 46.321,
      "growth": 4.1,
      "perCapita": 15642.2,
      "popChangePct": -0.94
    },
    {
      "year": 2014,
      "gdp": 48.388,
      "growth": 3.8,
      "perCapita": 16473.7,
      "popChangePct": -0.81
    },
    {
      "year": 2015,
      "gdp": 41.548,
      "growth": 2.8,
      "perCapita": 14272.2,
      "popChangePct": -0.89
    },
    {
      "year": 2016,
      "gdp": 42.952,
      "growth": 2.6,
      "perCapita": 14927.8,
      "popChangePct": -1.17
    },
    {
      "year": 2017,
      "gdp": 47.745,
      "growth": 4.7,
      "perCapita": 16795.9,
      "popChangePct": -1.18
    },
    {
      "year": 2018,
      "gdp": 54.295,
      "growth": 4.8,
      "perCapita": 19258.8,
      "popChangePct": -0.84
    },
    {
      "year": 2019,
      "gdp": 55.132,
      "growth": 4.7,
      "perCapita": 19612.3,
      "popChangePct": -0.28
    },
    {
      "year": 2020,
      "gdp": 57.352,
      "growth": 0,
      "perCapita": 20407.4,
      "popChangePct": -0.04
    },
    {
      "year": 2021,
      "gdp": 67.103,
      "growth": 6.4,
      "perCapita": 23893.8,
      "popChangePct": -0.07
    },
    {
      "year": 2022,
      "gdp": 70.687,
      "growth": 2.4,
      "perCapita": 24963.4,
      "popChangePct": 0.85
    },
    {
      "year": 2023,
      "gdp": 80.392,
      "growth": 0.8,
      "perCapita": 27995.6,
      "popChangePct": 1.41
    },
    {
      "year": 2024,
      "gdp": 85.482,
      "growth": 3,
      "perCapita": 29598.5,
      "popChangePct": 0.56
    },
    {
      "year": 2025,
      "gdp": 94.927,
      "growth": 2.9,
      "perCapita": 32839.0,
      "popChangePct": 0.1
    },
    {
      "year": 2026,
      "gdp": 105.907,
      "growth": 2.9,
      "perCapita": 36544.7,
      "popChangePct": 0.24
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 110.453,
      "growth": 2.2,
      "perCapita": 38088.3,
      "popChangePct": 0.07
    },
    {
      "year": 2028,
      "gdp": 116.583,
      "growth": 2.6,
      "perCapita": 40256.0,
      "popChangePct": -0.14
    },
    {
      "year": 2029,
      "gdp": 122.104,
      "growth": 2.5,
      "perCapita": 42299.2,
      "popChangePct": -0.31
    },
    {
      "year": 2030,
      "gdp": 128.588,
      "growth": 2.4,
      "perCapita": 44689.3,
      "popChangePct": -0.35
    },
    {
      "year": 2031,
      "gdp": 134.66,
      "growth": 2.4,
      "perCapita": 46955.2,
      "popChangePct": -0.31
    }
  ],
  "pppHistory": [
    {
      "year": 1995,
      "gdpPPP": 25.491,
      "perCapitaPPP": 7024.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdpPPP": 27.318,
      "perCapitaPPP": 7584.8,
      "perCapitaPPPChangePct": 7.98,
      "popChangePct": -0.74
    },
    {
      "year": 1997,
      "gdpPPP": 30.113,
      "perCapitaPPP": 8422.9,
      "perCapitaPPPChangePct": 11.05,
      "popChangePct": -0.75
    },
    {
      "year": 1998,
      "gdpPPP": 32.786,
      "perCapitaPPP": 9237.4,
      "perCapitaPPPChangePct": 9.67,
      "popChangePct": -0.73
    },
    {
      "year": 1999,
      "gdpPPP": 32.889,
      "perCapitaPPP": 9332.1,
      "perCapitaPPPChangePct": 1.03,
      "popChangePct": -0.7
    },
    {
      "year": 2000,
      "gdpPPP": 34.758,
      "perCapitaPPP": 9932.3,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": -0.68
    },
    {
      "year": 2001,
      "gdpPPP": 37.902,
      "perCapitaPPP": 10920.1,
      "perCapitaPPPChangePct": 9.95,
      "popChangePct": -0.83
    },
    {
      "year": 2002,
      "gdpPPP": 41.01,
      "perCapitaPPP": 11910.8,
      "perCapitaPPPChangePct": 9.07,
      "popChangePct": -0.81
    },
    {
      "year": 2003,
      "gdpPPP": 46.223,
      "perCapitaPPP": 13534.6,
      "perCapitaPPPChangePct": 13.63,
      "popChangePct": -0.81
    },
    {
      "year": 2004,
      "gdpPPP": 50.461,
      "perCapitaPPP": 14942.1,
      "perCapitaPPPChangePct": 10.4,
      "popChangePct": -1.11
    },
    {
      "year": 2005,
      "gdpPPP": 56.3,
      "perCapitaPPP": 16944.8,
      "perCapitaPPPChangePct": 13.4,
      "popChangePct": -1.6
    },
    {
      "year": 2006,
      "gdpPPP": 62.277,
      "perCapitaPPP": 19045.5,
      "perCapitaPPPChangePct": 12.4,
      "popChangePct": -1.59
    },
    {
      "year": 2007,
      "gdpPPP": 71.062,
      "perCapitaPPP": 21991.7,
      "perCapitaPPPChangePct": 15.47,
      "popChangePct": -1.19
    },
    {
      "year": 2008,
      "gdpPPP": 74.017,
      "perCapitaPPP": 23143.2,
      "perCapitaPPPChangePct": 5.24,
      "popChangePct": -1.02
    },
    {
      "year": 2009,
      "gdpPPP": 63.67,
      "perCapitaPPP": 20130.0,
      "perCapitaPPPChangePct": -13.02,
      "popChangePct": -1.09
    },
    {
      "year": 2010,
      "gdpPPP": 64.626,
      "perCapitaPPP": 20865.3,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": -2.09
    },
    {
      "year": 2011,
      "gdpPPP": 70.137,
      "perCapitaPPP": 23161.9,
      "perCapitaPPPChangePct": 11.01,
      "popChangePct": -2.23
    },
    {
      "year": 2012,
      "gdpPPP": 74.569,
      "perCapitaPPP": 24946.8,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": -1.29
    },
    {
      "year": 2013,
      "gdpPPP": 78.932,
      "perCapitaPPP": 26654.9,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": -0.94
    },
    {
      "year": 2014,
      "gdpPPP": 83.333,
      "perCapitaPPP": 28371.0,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": -0.81
    },
    {
      "year": 2015,
      "gdpPPP": 86.499,
      "perCapitaPPP": 29713.3,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": -0.89
    },
    {
      "year": 2016,
      "gdpPPP": 89.603,
      "perCapitaPPP": 31141.2,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": -1.17
    },
    {
      "year": 2017,
      "gdpPPP": 95.498,
      "perCapitaPPP": 33594.9,
      "perCapitaPPPChangePct": 7.88,
      "popChangePct": -1.18
    },
    {
      "year": 2018,
      "gdpPPP": 102.894,
      "perCapitaPPP": 36497.4,
      "perCapitaPPPChangePct": 8.64,
      "popChangePct": -0.84
    },
    {
      "year": 2019,
      "gdpPPP": 114.036,
      "perCapitaPPP": 40566.6,
      "perCapitaPPPChangePct": 11.15,
      "popChangePct": -0.28
    },
    {
      "year": 2020,
      "gdpPPP": 115.935,
      "perCapitaPPP": 41252.8,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": -0.04
    },
    {
      "year": 2021,
      "gdpPPP": 130.492,
      "perCapitaPPP": 46465.2,
      "perCapitaPPPChangePct": 12.64,
      "popChangePct": -0.07
    },
    {
      "year": 2022,
      "gdpPPP": 143.189,
      "perCapitaPPP": 50567.7,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 0.85
    },
    {
      "year": 2023,
      "gdpPPP": 149.713,
      "perCapitaPPP": 52136.1,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 1.41
    },
    {
      "year": 2024,
      "gdpPPP": 158.007,
      "perCapitaPPP": 54710.5,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 0.56
    },
    {
      "year": 2025,
      "gdpPPP": 167.134,
      "perCapitaPPP": 57818.5,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 0.1
    },
    {
      "year": 2026,
      "gdpPPP": 176.929,
      "perCapitaPPP": 61051.6,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 0.24
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 184.843,
      "perCapitaPPP": 63741.0,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 0.07
    },
    {
      "year": 2028,
      "gdpPPP": 192.842,
      "perCapitaPPP": 66588.0,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": -0.14
    },
    {
      "year": 2029,
      "gdpPPP": 201.126,
      "perCapitaPPP": 69674.0,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": -0.31
    },
    {
      "year": 2030,
      "gdpPPP": 209.828,
      "perCapitaPPP": 72923.3,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": -0.35
    },
    {
      "year": 2031,
      "gdpPPP": 218.75,
      "perCapitaPPP": 76276.8,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": -0.31
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LithuaniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
