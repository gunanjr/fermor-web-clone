import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Saint Kitts & Nevis",
  "slug": "saint-kitts-nevis",
  "iso3": "KNA",
  "region": "Americas",
  "rank2026": 204,
  "flagEmoji": "🇰🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Sao Tome & Principe",
      "slug": "sao-tome-principe",
      "rank": 203
    },
    {
      "name": "Dominica",
      "slug": "dominica",
      "rank": 207
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.058,
      "growth": 1.3,
      "perCapita": 1333.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.069,
      "growth": 2.7,
      "perCapita": 1617.4,
      "popChangePct": 0.0
    },
    {
      "year": 1982,
      "gdp": 0.079,
      "growth": 6.1,
      "perCapita": 1853.3,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdp": 0.078,
      "growth": -2.1,
      "perCapita": 1834.0,
      "popChangePct": -2.33
    },
    {
      "year": 1984,
      "gdp": 0.091,
      "growth": 9.7,
      "perCapita": 2148.3,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdp": 0.101,
      "growth": 6.4,
      "perCapita": 2406.9,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdp": 0.119,
      "growth": 8.8,
      "perCapita": 2847.7,
      "popChangePct": 0.0
    },
    {
      "year": 1987,
      "gdp": 0.136,
      "growth": 8.3,
      "perCapita": 3278.2,
      "popChangePct": -2.38
    },
    {
      "year": 1988,
      "gdp": 0.161,
      "growth": 10.4,
      "perCapita": 3911.6,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdp": 0.179,
      "growth": 6,
      "perCapita": 4386.0,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdp": 0.203,
      "growth": 5.5,
      "perCapita": 4998.4,
      "popChangePct": 0.0
    },
    {
      "year": 1991,
      "gdp": 0.201,
      "growth": 2.3,
      "perCapita": 5004.4,
      "popChangePct": -2.44
    },
    {
      "year": 1992,
      "gdp": 0.223,
      "growth": 3.1,
      "perCapita": 5507.9,
      "popChangePct": 0.0
    },
    {
      "year": 1993,
      "gdp": 0.243,
      "growth": 5.4,
      "perCapita": 5929.4,
      "popChangePct": 2.5
    },
    {
      "year": 1994,
      "gdp": 0.272,
      "growth": 5.4,
      "perCapita": 6541.2,
      "popChangePct": 2.44
    },
    {
      "year": 1995,
      "gdp": 0.293,
      "growth": 3.5,
      "perCapita": 6956.8,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 0.312,
      "growth": 5.9,
      "perCapita": 7324.7,
      "popChangePct": 2.38
    },
    {
      "year": 1997,
      "gdp": 0.351,
      "growth": 7.3,
      "perCapita": 8140.0,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdp": 0.366,
      "growth": 1,
      "perCapita": 8376.0,
      "popChangePct": 2.33
    },
    {
      "year": 1999,
      "gdp": 0.389,
      "growth": 3.9,
      "perCapita": 8776.0,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdp": 0.437,
      "growth": 13.4,
      "perCapita": 9734.8,
      "popChangePct": 2.27
    },
    {
      "year": 2001,
      "gdp": 0.479,
      "growth": 5,
      "perCapita": 10516.4,
      "popChangePct": 2.22
    },
    {
      "year": 2002,
      "gdp": 0.499,
      "growth": 1.5,
      "perCapita": 10870.0,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 0.483,
      "growth": -3.7,
      "perCapita": 10484.3,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.527,
      "growth": 4,
      "perCapita": 11398.8,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.574,
      "growth": 10.2,
      "perCapita": 12376.1,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.671,
      "growth": 3.2,
      "perCapita": 14427.0,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.717,
      "growth": 1.2,
      "perCapita": 15376.3,
      "popChangePct": 2.17
    },
    {
      "year": 2008,
      "gdp": 0.778,
      "growth": 6.4,
      "perCapita": 16627.2,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.774,
      "growth": -3.4,
      "perCapita": 16509.7,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.779,
      "growth": -0.1,
      "perCapita": 16591.5,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.836,
      "growth": 1.6,
      "perCapita": 17715.8,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 0.849,
      "growth": 1.1,
      "perCapita": 17856.6,
      "popChangePct": 2.13
    },
    {
      "year": 2013,
      "gdp": 0.897,
      "growth": 5.4,
      "perCapita": 18709.7,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 0.974,
      "growth": 7.4,
      "perCapita": 20171.1,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.957,
      "growth": -0.7,
      "perCapita": 19673.7,
      "popChangePct": 2.08
    },
    {
      "year": 2016,
      "gdp": 1.007,
      "growth": 3.9,
      "perCapita": 20535.8,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 1.057,
      "growth": 0.2,
      "perCapita": 21395.3,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 1.061,
      "growth": 0.3,
      "perCapita": 21322.7,
      "popChangePct": 2.04
    },
    {
      "year": 2019,
      "gdp": 1.088,
      "growth": 2.4,
      "perCapita": 21683.6,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 0.867,
      "growth": -15.2,
      "perCapita": 17155.4,
      "popChangePct": 2.0
    },
    {
      "year": 2021,
      "gdp": 0.843,
      "growth": 0.6,
      "perCapita": 16561.6,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 0.963,
      "growth": 10.5,
      "perCapita": 18759.8,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 1.034,
      "growth": 4.6,
      "perCapita": 20153.6,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 1.051,
      "growth": 1.7,
      "perCapita": 20427.2,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 1.082,
      "growth": 1.5,
      "perCapita": 21002.1,
      "popChangePct": 1.96
    },
    {
      "year": 2026,
      "gdp": 1.143,
      "growth": 2,
      "perCapita": 22146.0,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.197,
      "growth": 2.5,
      "perCapita": 23173.5,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 1.254,
      "growth": 2.6,
      "perCapita": 24236.5,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 1.315,
      "growth": 2.7,
      "perCapita": 25404.8,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 1.377,
      "growth": 2.6,
      "perCapita": 26595.7,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 1.44,
      "growth": 2.5,
      "perCapita": 27807.4,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.121,
      "perCapitaPPP": 2798.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.136,
      "perCapitaPPP": 3190.8,
      "perCapitaPPPChangePct": 14.01,
      "popChangePct": 0.0
    },
    {
      "year": 1982,
      "gdpPPP": 0.154,
      "perCapitaPPP": 3607.9,
      "perCapitaPPPChangePct": 13.07,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdpPPP": 0.157,
      "perCapitaPPP": 3687.6,
      "perCapitaPPPChangePct": 2.21,
      "popChangePct": -2.33
    },
    {
      "year": 1984,
      "gdpPPP": 0.178,
      "perCapitaPPP": 4210.8,
      "perCapitaPPPChangePct": 14.19,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdpPPP": 0.195,
      "perCapitaPPP": 4648.5,
      "perCapitaPPPChangePct": 10.39,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.217,
      "perCapitaPPP": 5192.4,
      "perCapitaPPPChangePct": 11.7,
      "popChangePct": 0.0
    },
    {
      "year": 1987,
      "gdpPPP": 0.241,
      "perCapitaPPP": 5797.2,
      "perCapitaPPPChangePct": 11.65,
      "popChangePct": -2.38
    },
    {
      "year": 1988,
      "gdpPPP": 0.275,
      "perCapitaPPP": 6668.0,
      "perCapitaPPPChangePct": 15.02,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdpPPP": 0.303,
      "perCapitaPPP": 7398.8,
      "perCapitaPPPChangePct": 10.96,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdpPPP": 0.331,
      "perCapitaPPP": 8157.0,
      "perCapitaPPPChangePct": 10.25,
      "popChangePct": 0.0
    },
    {
      "year": 1991,
      "gdpPPP": 0.35,
      "perCapitaPPP": 8696.7,
      "perCapitaPPPChangePct": 6.62,
      "popChangePct": -2.44
    },
    {
      "year": 1992,
      "gdpPPP": 0.369,
      "perCapitaPPP": 9125.6,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 0.0
    },
    {
      "year": 1993,
      "gdpPPP": 0.398,
      "perCapitaPPP": 9722.4,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 2.5
    },
    {
      "year": 1994,
      "gdpPPP": 0.429,
      "perCapitaPPP": 10332.7,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 2.44
    },
    {
      "year": 1995,
      "gdpPPP": 0.453,
      "perCapitaPPP": 10774.6,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 0.489,
      "perCapitaPPP": 11466.2,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 2.38
    },
    {
      "year": 1997,
      "gdpPPP": 0.533,
      "perCapitaPPP": 12361.3,
      "perCapitaPPPChangePct": 7.81,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdpPPP": 0.545,
      "perCapitaPPP": 12466.4,
      "perCapitaPPPChangePct": 0.85,
      "popChangePct": 2.33
    },
    {
      "year": 1999,
      "gdpPPP": 0.574,
      "perCapitaPPP": 12969.5,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdpPPP": 0.666,
      "perCapitaPPP": 14827.2,
      "perCapitaPPPChangePct": 14.32,
      "popChangePct": 2.27
    },
    {
      "year": 2001,
      "gdpPPP": 0.715,
      "perCapitaPPP": 15693.6,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 2.22
    },
    {
      "year": 2002,
      "gdpPPP": 0.738,
      "perCapitaPPP": 16056.7,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 0.724,
      "perCapitaPPP": 15712.3,
      "perCapitaPPPChangePct": -2.14,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.773,
      "perCapitaPPP": 16721.5,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.879,
      "perCapitaPPP": 18959.1,
      "perCapitaPPPChangePct": 13.38,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.936,
      "perCapitaPPP": 20124.6,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.972,
      "perCapitaPPP": 20847.4,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 2.17
    },
    {
      "year": 2008,
      "gdpPPP": 1.054,
      "perCapitaPPP": 22542.5,
      "perCapitaPPPChangePct": 8.13,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 1.025,
      "perCapitaPPP": 21850.4,
      "perCapitaPPPChangePct": -3.07,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 1.037,
      "perCapitaPPP": 22086.9,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 1.075,
      "perCapitaPPP": 22780.6,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 1.107,
      "perCapitaPPP": 23288.4,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 2.13
    },
    {
      "year": 2013,
      "gdpPPP": 1.188,
      "perCapitaPPP": 24782.9,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 1.298,
      "perCapitaPPP": 26877.0,
      "perCapitaPPPChangePct": 8.45,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 1.3,
      "perCapitaPPP": 26722.7,
      "perCapitaPPPChangePct": -0.57,
      "popChangePct": 2.08
    },
    {
      "year": 2016,
      "gdpPPP": 1.364,
      "perCapitaPPP": 27825.0,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 1.392,
      "perCapitaPPP": 28170.2,
      "perCapitaPPPChangePct": 1.24,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 1.427,
      "perCapitaPPP": 28672.0,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 2.04
    },
    {
      "year": 2019,
      "gdpPPP": 1.497,
      "perCapitaPPP": 29850.2,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 1.256,
      "perCapitaPPP": 24857.6,
      "perCapitaPPPChangePct": -16.73,
      "popChangePct": 2.0
    },
    {
      "year": 2021,
      "gdpPPP": 1.236,
      "perCapitaPPP": 24260.5,
      "perCapitaPPPChangePct": -2.4,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 1.463,
      "perCapitaPPP": 28507.4,
      "perCapitaPPPChangePct": 17.51,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 1.587,
      "perCapitaPPP": 30922.1,
      "perCapitaPPPChangePct": 8.47,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 1.654,
      "perCapitaPPP": 32165.1,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 1.727,
      "perCapitaPPP": 33514.9,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 1.96
    },
    {
      "year": 2026,
      "gdpPPP": 1.812,
      "perCapitaPPP": 35120.4,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1.899,
      "perCapitaPPP": 36747.5,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 1.981,
      "perCapitaPPP": 38285.3,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 2.071,
      "perCapitaPPP": 40012.2,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 2.163,
      "perCapitaPPP": 41774.1,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 2.257,
      "perCapitaPPP": 43573.7,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SaintKittsNevisGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
