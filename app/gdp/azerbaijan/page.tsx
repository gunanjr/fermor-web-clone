import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Azerbaijan",
  "slug": "azerbaijan",
  "iso3": "AZE",
  "region": "Asia",
  "rank2026": 91,
  "flagEmoji": "🇦🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bolivia",
      "slug": "bolivia",
      "rank": 90
    },
    {
      "name": "Uganda",
      "slug": "uganda",
      "rank": 92
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 1.193,
      "growth": null,
      "perCapita": 160.0,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 1.309,
      "growth": -23.1,
      "perCapita": 174.9,
      "popChangePct": 0.38
    },
    {
      "year": 1994,
      "gdp": 2.258,
      "growth": -19.7,
      "perCapita": 297.2,
      "popChangePct": 1.47
    },
    {
      "year": 1995,
      "gdp": 2.417,
      "growth": -13,
      "perCapita": 316.2,
      "popChangePct": 0.62
    },
    {
      "year": 1996,
      "gdp": 3.177,
      "growth": 2.5,
      "perCapita": 411.1,
      "popChangePct": 1.07
    },
    {
      "year": 1997,
      "gdp": 4.317,
      "growth": 8.9,
      "perCapita": 553.5,
      "popChangePct": 0.96
    },
    {
      "year": 1998,
      "gdp": 4.28,
      "growth": 6,
      "perCapita": 543.3,
      "popChangePct": 0.99
    },
    {
      "year": 1999,
      "gdp": 4.581,
      "growth": 11.4,
      "perCapita": 576.0,
      "popChangePct": 0.96
    },
    {
      "year": 2000,
      "gdp": 5.273,
      "growth": 6.2,
      "perCapita": 656.4,
      "popChangePct": 1.01
    },
    {
      "year": 2001,
      "gdp": 5.475,
      "growth": 9.9,
      "perCapita": 674.8,
      "popChangePct": 1.01
    },
    {
      "year": 2002,
      "gdp": 6.232,
      "growth": 9.4,
      "perCapita": 760.8,
      "popChangePct": 0.95
    },
    {
      "year": 2003,
      "gdp": 7.276,
      "growth": 10.2,
      "perCapita": 879.9,
      "popChangePct": 0.95
    },
    {
      "year": 2004,
      "gdp": 8.682,
      "growth": 9.3,
      "perCapita": 1039.8,
      "popChangePct": 0.97
    },
    {
      "year": 2005,
      "gdp": 13.239,
      "growth": 26.4,
      "perCapita": 1567.2,
      "popChangePct": 1.17
    },
    {
      "year": 2006,
      "gdp": 20.983,
      "growth": 34.5,
      "perCapita": 2453.3,
      "popChangePct": 1.25
    },
    {
      "year": 2007,
      "gdp": 33.05,
      "growth": 25,
      "perCapita": 3813.8,
      "popChangePct": 1.32
    },
    {
      "year": 2008,
      "gdp": 48.852,
      "growth": 10.8,
      "perCapita": 5564.4,
      "popChangePct": 1.3
    },
    {
      "year": 2009,
      "gdp": 44.297,
      "growth": 9.3,
      "perCapita": 4964.7,
      "popChangePct": 1.63
    },
    {
      "year": 2010,
      "gdp": 52.909,
      "growth": 5,
      "perCapita": 5880.5,
      "popChangePct": 0.84
    },
    {
      "year": 2011,
      "gdp": 65.952,
      "growth": 0.1,
      "perCapita": 7238.6,
      "popChangePct": 1.27
    },
    {
      "year": 2012,
      "gdp": 69.684,
      "growth": 2.2,
      "perCapita": 7545.6,
      "popChangePct": 1.36
    },
    {
      "year": 2013,
      "gdp": 74.164,
      "growth": 5.8,
      "perCapita": 7926.6,
      "popChangePct": 1.31
    },
    {
      "year": 2014,
      "gdp": 75.235,
      "growth": 2.8,
      "perCapita": 7938.6,
      "popChangePct": 1.29
    },
    {
      "year": 2015,
      "gdp": 52.997,
      "growth": 1.1,
      "perCapita": 5524.5,
      "popChangePct": 1.22
    },
    {
      "year": 2016,
      "gdp": 37.83,
      "growth": -3.1,
      "perCapita": 3897.8,
      "popChangePct": 1.17
    },
    {
      "year": 2017,
      "gdp": 41.375,
      "growth": 0.2,
      "perCapita": 4217.7,
      "popChangePct": 1.08
    },
    {
      "year": 2018,
      "gdp": 47.113,
      "growth": 1.5,
      "perCapita": 4759.8,
      "popChangePct": 0.9
    },
    {
      "year": 2019,
      "gdp": 48.174,
      "growth": 2.5,
      "perCapita": 4841.1,
      "popChangePct": 0.54
    },
    {
      "year": 2020,
      "gdp": 42.693,
      "growth": -4.2,
      "perCapita": 4280.4,
      "popChangePct": 0.23
    },
    {
      "year": 2021,
      "gdp": 54.825,
      "growth": 5.6,
      "perCapita": 5468.3,
      "popChangePct": 0.52
    },
    {
      "year": 2022,
      "gdp": 78.807,
      "growth": 4.7,
      "perCapita": 7831.2,
      "popChangePct": 0.37
    },
    {
      "year": 2023,
      "gdp": 72.428,
      "growth": 1.4,
      "perCapita": 7151.9,
      "popChangePct": 0.64
    },
    {
      "year": 2024,
      "gdp": 74.426,
      "growth": 4.2,
      "perCapita": 7262.0,
      "popChangePct": 1.2
    },
    {
      "year": 2025,
      "gdp": 75.938,
      "growth": 1.4,
      "perCapita": 7321.7,
      "popChangePct": 1.2
    },
    {
      "year": 2026,
      "gdp": 78.372,
      "growth": 2.2,
      "perCapita": 7466.8,
      "popChangePct": 1.2
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 83.06,
      "growth": 2.5,
      "perCapita": 7819.6,
      "popChangePct": 1.2
    },
    {
      "year": 2028,
      "gdp": 88.175,
      "growth": 2.5,
      "perCapita": 8202.7,
      "popChangePct": 1.2
    },
    {
      "year": 2029,
      "gdp": 93.718,
      "growth": 2.5,
      "perCapita": 8615.0,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdp": 99.6,
      "growth": 2.5,
      "perCapita": 9047.1,
      "popChangePct": 1.2
    },
    {
      "year": 2031,
      "gdp": 105.923,
      "growth": 2.5,
      "perCapita": 9507.4,
      "popChangePct": 1.2
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 27.537,
      "perCapitaPPP": 3691.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 21.678,
      "perCapitaPPP": 2895.5,
      "perCapitaPPPChangePct": -21.57,
      "popChangePct": 0.38
    },
    {
      "year": 1994,
      "gdpPPP": 17.785,
      "perCapitaPPP": 2341.1,
      "perCapitaPPPChangePct": -19.15,
      "popChangePct": 1.47
    },
    {
      "year": 1995,
      "gdpPPP": 15.793,
      "perCapitaPPP": 2066.2,
      "perCapitaPPPChangePct": -11.74,
      "popChangePct": 0.62
    },
    {
      "year": 1996,
      "gdpPPP": 16.489,
      "perCapitaPPP": 2134.1,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 1.07
    },
    {
      "year": 1997,
      "gdpPPP": 18.263,
      "perCapitaPPP": 2341.5,
      "perCapitaPPPChangePct": 9.72,
      "popChangePct": 0.96
    },
    {
      "year": 1998,
      "gdpPPP": 19.578,
      "perCapitaPPP": 2485.6,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 0.99
    },
    {
      "year": 1999,
      "gdpPPP": 22.118,
      "perCapitaPPP": 2780.9,
      "perCapitaPPPChangePct": 11.88,
      "popChangePct": 0.96
    },
    {
      "year": 2000,
      "gdpPPP": 24.027,
      "perCapitaPPP": 2991.1,
      "perCapitaPPPChangePct": 7.56,
      "popChangePct": 1.01
    },
    {
      "year": 2001,
      "gdpPPP": 27,
      "perCapitaPPP": 3327.5,
      "perCapitaPPPChangePct": 11.25,
      "popChangePct": 1.01
    },
    {
      "year": 2002,
      "gdpPPP": 30.008,
      "perCapitaPPP": 3663.4,
      "perCapitaPPPChangePct": 10.09,
      "popChangePct": 0.95
    },
    {
      "year": 2003,
      "gdpPPP": 33.724,
      "perCapitaPPP": 4078.3,
      "perCapitaPPPChangePct": 11.33,
      "popChangePct": 0.95
    },
    {
      "year": 2004,
      "gdpPPP": 37.836,
      "perCapitaPPP": 4531.7,
      "perCapitaPPPChangePct": 11.12,
      "popChangePct": 0.97
    },
    {
      "year": 2005,
      "gdpPPP": 49.324,
      "perCapitaPPP": 5839.0,
      "perCapitaPPPChangePct": 28.85,
      "popChangePct": 1.17
    },
    {
      "year": 2006,
      "gdpPPP": 68.37,
      "perCapitaPPP": 7993.6,
      "perCapitaPPPChangePct": 36.9,
      "popChangePct": 1.25
    },
    {
      "year": 2007,
      "gdpPPP": 87.778,
      "perCapitaPPP": 10128.9,
      "perCapitaPPPChangePct": 26.71,
      "popChangePct": 1.32
    },
    {
      "year": 2008,
      "gdpPPP": 99.105,
      "perCapitaPPP": 11288.3,
      "perCapitaPPPChangePct": 11.45,
      "popChangePct": 1.3
    },
    {
      "year": 2009,
      "gdpPPP": 108.95,
      "perCapitaPPP": 12210.8,
      "perCapitaPPPChangePct": 8.17,
      "popChangePct": 1.63
    },
    {
      "year": 2010,
      "gdpPPP": 115.787,
      "perCapitaPPP": 12869.0,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 0.84
    },
    {
      "year": 2011,
      "gdpPPP": 118.295,
      "perCapitaPPP": 12983.6,
      "perCapitaPPPChangePct": 0.89,
      "popChangePct": 1.27
    },
    {
      "year": 2012,
      "gdpPPP": 123.152,
      "perCapitaPPP": 13335.2,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 1.36
    },
    {
      "year": 2013,
      "gdpPPP": 132.566,
      "perCapitaPPP": 14168.5,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 1.31
    },
    {
      "year": 2014,
      "gdpPPP": 138.608,
      "perCapitaPPP": 14625.6,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": 1.29
    },
    {
      "year": 2015,
      "gdpPPP": 141.405,
      "perCapitaPPP": 14740.4,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": 1.22
    },
    {
      "year": 2016,
      "gdpPPP": 138.375,
      "perCapitaPPP": 14257.5,
      "perCapitaPPPChangePct": -3.28,
      "popChangePct": 1.17
    },
    {
      "year": 2017,
      "gdpPPP": 141.07,
      "perCapitaPPP": 14380.2,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 1.08
    },
    {
      "year": 2018,
      "gdpPPP": 151.91,
      "perCapitaPPP": 15347.3,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 0.9
    },
    {
      "year": 2019,
      "gdpPPP": 167.158,
      "perCapitaPPP": 16798.1,
      "perCapitaPPPChangePct": 9.45,
      "popChangePct": 0.54
    },
    {
      "year": 2020,
      "gdpPPP": 153.048,
      "perCapitaPPP": 15344.7,
      "perCapitaPPPChangePct": -8.65,
      "popChangePct": 0.23
    },
    {
      "year": 2021,
      "gdpPPP": 203.884,
      "perCapitaPPP": 20335.3,
      "perCapitaPPPChangePct": 32.52,
      "popChangePct": 0.52
    },
    {
      "year": 2022,
      "gdpPPP": 228.681,
      "perCapitaPPP": 22724.3,
      "perCapitaPPPChangePct": 11.75,
      "popChangePct": 0.37
    },
    {
      "year": 2023,
      "gdpPPP": 240.355,
      "perCapitaPPP": 23733.8,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.64
    },
    {
      "year": 2024,
      "gdpPPP": 256.56,
      "perCapitaPPP": 25033.6,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 1.2
    },
    {
      "year": 2025,
      "gdpPPP": 267.531,
      "perCapitaPPP": 25794.6,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 1.2
    },
    {
      "year": 2026,
      "gdpPPP": 281.296,
      "perCapitaPPP": 26800.1,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 1.2
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 294.598,
      "perCapitaPPP": 27734.7,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 1.2
    },
    {
      "year": 2028,
      "gdpPPP": 306.821,
      "perCapitaPPP": 28542.9,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 1.2
    },
    {
      "year": 2029,
      "gdpPPP": 319.986,
      "perCapitaPPP": 29414.6,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdpPPP": 334.007,
      "perCapitaPPP": 30339.4,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 1.2
    },
    {
      "year": 2031,
      "gdpPPP": 348.632,
      "perCapitaPPP": 31292.3,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 1.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AzerbaijanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
