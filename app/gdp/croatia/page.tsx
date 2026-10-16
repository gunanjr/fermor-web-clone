import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Croatia",
  "slug": "croatia",
  "iso3": "HRV",
  "region": "Europe",
  "rank2026": 75,
  "flagEmoji": "🇭🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Oman",
      "slug": "oman",
      "rank": 74
    },
    {
      "name": "Côte d'Ivoire",
      "slug": "cote-d-ivoire",
      "rank": 76
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.568,
      "growth": null,
      "perCapita": 120.0,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 7.358,
      "growth": -8,
      "perCapita": 1591.1,
      "popChangePct": -2.24
    },
    {
      "year": 1994,
      "gdp": 16.669,
      "growth": 5.9,
      "perCapita": 3684.3,
      "popChangePct": -2.16
    },
    {
      "year": 1995,
      "gdp": 20.657,
      "growth": 6.6,
      "perCapita": 4639.1,
      "popChangePct": -1.57
    },
    {
      "year": 1996,
      "gdp": 22.104,
      "growth": 5.9,
      "perCapita": 4918.6,
      "popChangePct": 0.92
    },
    {
      "year": 1997,
      "gdp": 22.101,
      "growth": 6.6,
      "perCapita": 4834.1,
      "popChangePct": 1.74
    },
    {
      "year": 1998,
      "gdp": 23.971,
      "growth": 1.9,
      "perCapita": 5325.8,
      "popChangePct": -1.55
    },
    {
      "year": 1999,
      "gdp": 23.593,
      "growth": -0.9,
      "perCapita": 5180.8,
      "popChangePct": 1.18
    },
    {
      "year": 2000,
      "gdp": 22.145,
      "growth": 3.7,
      "perCapita": 5054.8,
      "popChangePct": -3.8
    },
    {
      "year": 2001,
      "gdp": 23.068,
      "growth": 3.1,
      "perCapita": 5364.6,
      "popChangePct": -1.85
    },
    {
      "year": 2002,
      "gdp": 26.739,
      "growth": 5.8,
      "perCapita": 6215.5,
      "popChangePct": 0.05
    },
    {
      "year": 2003,
      "gdp": 35.24,
      "growth": 5.6,
      "perCapita": 8189.7,
      "popChangePct": 0.02
    },
    {
      "year": 2004,
      "gdp": 41.817,
      "growth": 4.2,
      "perCapita": 9713.6,
      "popChangePct": 0.05
    },
    {
      "year": 2005,
      "gdp": 45.035,
      "growth": 4.3,
      "perCapita": 10448.9,
      "popChangePct": 0.12
    },
    {
      "year": 2006,
      "gdp": 49.584,
      "growth": 5.1,
      "perCapita": 11501.7,
      "popChangePct": 0.02
    },
    {
      "year": 2007,
      "gdp": 59.295,
      "growth": 5.1,
      "perCapita": 13757.6,
      "popChangePct": -0.02
    },
    {
      "year": 2008,
      "gdp": 68.461,
      "growth": 2,
      "perCapita": 15884.1,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 62.251,
      "growth": -6.8,
      "perCapita": 14460.2,
      "popChangePct": -0.12
    },
    {
      "year": 2010,
      "gdp": 59.028,
      "growth": -1.3,
      "perCapita": 13743.4,
      "popChangePct": -0.23
    },
    {
      "year": 2011,
      "gdp": 62.875,
      "growth": -0.1,
      "perCapita": 14686.9,
      "popChangePct": -0.33
    },
    {
      "year": 2012,
      "gdp": 57.586,
      "growth": -2.2,
      "perCapita": 13517.8,
      "popChangePct": -0.49
    },
    {
      "year": 2013,
      "gdp": 59.846,
      "growth": -0.1,
      "perCapita": 14134.6,
      "popChangePct": -0.61
    },
    {
      "year": 2014,
      "gdp": 59.623,
      "growth": -0.6,
      "perCapita": 14189.1,
      "popChangePct": -0.76
    },
    {
      "year": 2015,
      "gdp": 51.005,
      "growth": 2.3,
      "perCapita": 12284.4,
      "popChangePct": -1.19
    },
    {
      "year": 2016,
      "gdp": 52.636,
      "growth": 3.5,
      "perCapita": 12816.3,
      "popChangePct": -1.08
    },
    {
      "year": 2017,
      "gdp": 56.164,
      "growth": 3.3,
      "perCapita": 13898.5,
      "popChangePct": -1.61
    },
    {
      "year": 2018,
      "gdp": 61.694,
      "growth": 2.9,
      "perCapita": 15466.0,
      "popChangePct": -1.29
    },
    {
      "year": 2019,
      "gdp": 61.474,
      "growth": 3.1,
      "perCapita": 15566.9,
      "popChangePct": -1.0
    },
    {
      "year": 2020,
      "gdp": 57.914,
      "growth": -8.3,
      "perCapita": 14796.7,
      "popChangePct": -0.89
    },
    {
      "year": 2021,
      "gdp": 69.052,
      "growth": 12.6,
      "perCapita": 17801.4,
      "popChangePct": -0.89
    },
    {
      "year": 2022,
      "gdp": 71.257,
      "growth": 7.3,
      "perCapita": 18479.5,
      "popChangePct": -0.59
    },
    {
      "year": 2023,
      "gdp": 85.647,
      "growth": 3.8,
      "perCapita": 22188.4,
      "popChangePct": 0.1
    },
    {
      "year": 2024,
      "gdp": 92.955,
      "growth": 3.8,
      "perCapita": 24044.3,
      "popChangePct": 0.16
    },
    {
      "year": 2025,
      "gdp": 106.055,
      "growth": 3.2,
      "perCapita": 27376.5,
      "popChangePct": 0.21
    },
    {
      "year": 2026,
      "gdp": 116.574,
      "growth": 2.6,
      "perCapita": 30030.1,
      "popChangePct": 0.21
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 122.612,
      "growth": 2.6,
      "perCapita": 31520.8,
      "popChangePct": 0.21
    },
    {
      "year": 2028,
      "gdp": 128.198,
      "growth": 2.6,
      "perCapita": 32889.4,
      "popChangePct": 0.21
    },
    {
      "year": 2029,
      "gdp": 134.195,
      "growth": 2.5,
      "perCapita": 34357.2,
      "popChangePct": 0.21
    },
    {
      "year": 2030,
      "gdp": 140.601,
      "growth": 2.5,
      "perCapita": 35923.4,
      "popChangePct": 0.2
    },
    {
      "year": 2031,
      "gdp": 147.301,
      "growth": 2.5,
      "perCapita": 37558.3,
      "popChangePct": 0.2
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 41.902,
      "perCapitaPPP": 8859.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 39.463,
      "perCapitaPPP": 8534.1,
      "perCapitaPPPChangePct": -3.67,
      "popChangePct": -2.24
    },
    {
      "year": 1994,
      "gdpPPP": 42.684,
      "perCapitaPPP": 9434.4,
      "perCapitaPPPChangePct": 10.55,
      "popChangePct": -2.16
    },
    {
      "year": 1995,
      "gdpPPP": 46.47,
      "perCapitaPPP": 10436.0,
      "perCapitaPPPChangePct": 10.62,
      "popChangePct": -1.57
    },
    {
      "year": 1996,
      "gdpPPP": 50.1,
      "perCapitaPPP": 11148.2,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 0.92
    },
    {
      "year": 1997,
      "gdpPPP": 54.351,
      "perCapitaPPP": 11887.7,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": 1.74
    },
    {
      "year": 1998,
      "gdpPPP": 55.985,
      "perCapitaPPP": 12438.3,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": -1.55
    },
    {
      "year": 1999,
      "gdpPPP": 56.246,
      "perCapitaPPP": 12350.9,
      "perCapitaPPPChangePct": -0.7,
      "popChangePct": 1.18
    },
    {
      "year": 2000,
      "gdpPPP": 59.677,
      "perCapitaPPP": 13621.7,
      "perCapitaPPPChangePct": 10.29,
      "popChangePct": -3.8
    },
    {
      "year": 2001,
      "gdpPPP": 62.92,
      "perCapitaPPP": 14632.6,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": -1.85
    },
    {
      "year": 2002,
      "gdpPPP": 67.603,
      "perCapitaPPP": 15714.4,
      "perCapitaPPPChangePct": 7.39,
      "popChangePct": 0.05
    },
    {
      "year": 2003,
      "gdpPPP": 72.778,
      "perCapitaPPP": 16913.4,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 0.02
    },
    {
      "year": 2004,
      "gdpPPP": 77.852,
      "perCapitaPPP": 18084.1,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 0.05
    },
    {
      "year": 2005,
      "gdpPPP": 83.767,
      "perCapitaPPP": 19435.4,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": 0.12
    },
    {
      "year": 2006,
      "gdpPPP": 90.726,
      "perCapitaPPP": 21045.2,
      "perCapitaPPPChangePct": 8.28,
      "popChangePct": 0.02
    },
    {
      "year": 2007,
      "gdpPPP": 97.891,
      "perCapitaPPP": 22712.4,
      "perCapitaPPPChangePct": 7.92,
      "popChangePct": -0.02
    },
    {
      "year": 2008,
      "gdpPPP": 101.744,
      "perCapitaPPP": 23606.4,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 95.398,
      "perCapitaPPP": 22159.8,
      "perCapitaPPPChangePct": -6.13,
      "popChangePct": -0.12
    },
    {
      "year": 2010,
      "gdpPPP": 95.267,
      "perCapitaPPP": 22181.0,
      "perCapitaPPPChangePct": 0.1,
      "popChangePct": -0.23
    },
    {
      "year": 2011,
      "gdpPPP": 97.122,
      "perCapitaPPP": 22686.9,
      "perCapitaPPPChangePct": 2.28,
      "popChangePct": -0.33
    },
    {
      "year": 2012,
      "gdpPPP": 96.722,
      "perCapitaPPP": 22704.6,
      "perCapitaPPPChangePct": 0.08,
      "popChangePct": -0.49
    },
    {
      "year": 2013,
      "gdpPPP": 98.235,
      "perCapitaPPP": 23201.6,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": -0.61
    },
    {
      "year": 2014,
      "gdpPPP": 99.389,
      "perCapitaPPP": 23652.8,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": -0.76
    },
    {
      "year": 2015,
      "gdpPPP": 102.639,
      "perCapitaPPP": 24720.5,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": -1.19
    },
    {
      "year": 2016,
      "gdpPPP": 107.204,
      "perCapitaPPP": 26102.7,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": -1.08
    },
    {
      "year": 2017,
      "gdpPPP": 112.71,
      "perCapitaPPP": 27891.5,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": -1.61
    },
    {
      "year": 2018,
      "gdpPPP": 118.823,
      "perCapitaPPP": 29787.7,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": -1.29
    },
    {
      "year": 2019,
      "gdpPPP": 130.585,
      "perCapitaPPP": 33067.9,
      "perCapitaPPPChangePct": 11.01,
      "popChangePct": -1.0
    },
    {
      "year": 2020,
      "gdpPPP": 123.668,
      "perCapitaPPP": 31596.4,
      "perCapitaPPPChangePct": -4.45,
      "popChangePct": -0.89
    },
    {
      "year": 2021,
      "gdpPPP": 143.189,
      "perCapitaPPP": 36913.9,
      "perCapitaPPPChangePct": 16.83,
      "popChangePct": -0.89
    },
    {
      "year": 2022,
      "gdpPPP": 164.564,
      "perCapitaPPP": 42677.5,
      "perCapitaPPPChangePct": 15.61,
      "popChangePct": -0.59
    },
    {
      "year": 2023,
      "gdpPPP": 177.071,
      "perCapitaPPP": 45873.2,
      "perCapitaPPPChangePct": 7.49,
      "popChangePct": 0.1
    },
    {
      "year": 2024,
      "gdpPPP": 188.412,
      "perCapitaPPP": 48735.6,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 0.16
    },
    {
      "year": 2025,
      "gdpPPP": 199.868,
      "perCapitaPPP": 51592.9,
      "perCapitaPPPChangePct": 5.86,
      "popChangePct": 0.21
    },
    {
      "year": 2026,
      "gdpPPP": 211.016,
      "perCapitaPPP": 54359.0,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.21
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 221.338,
      "perCapitaPPP": 56901.0,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 0.21
    },
    {
      "year": 2028,
      "gdpPPP": 230.82,
      "perCapitaPPP": 59217.0,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 0.21
    },
    {
      "year": 2029,
      "gdpPPP": 240.798,
      "perCapitaPPP": 61650.1,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 0.21
    },
    {
      "year": 2030,
      "gdpPPP": 251.353,
      "perCapitaPPP": 64220.6,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 0.2
    },
    {
      "year": 2031,
      "gdpPPP": 262.288,
      "perCapitaPPP": 66877.0,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 0.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CroatiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
