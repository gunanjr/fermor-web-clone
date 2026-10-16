import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Belarus",
  "slug": "belarus",
  "iso3": "BLR",
  "region": "Europe",
  "rank2026": 82,
  "flagEmoji": "🇧🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Lithuania",
      "slug": "lithuania",
      "rank": 81
    },
    {
      "name": "Sri Lanka",
      "slug": "sri-lanka",
      "rank": 83
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 12.8,
      "growth": null,
      "perCapita": 1252.8,
      "popChangePct": 0.22
    },
    {
      "year": 1993,
      "gdp": 11.408,
      "growth": -7.6,
      "perCapita": 1114.1,
      "popChangePct": 0.23
    },
    {
      "year": 1994,
      "gdp": 15.687,
      "growth": -11.7,
      "perCapita": 1533.7,
      "popChangePct": -0.12
    },
    {
      "year": 1995,
      "gdp": 10.532,
      "growth": -11.1,
      "perCapita": 1034.9,
      "popChangePct": -0.5
    },
    {
      "year": 1996,
      "gdp": 14.494,
      "growth": 2.8,
      "perCapita": 1429.1,
      "popChangePct": -0.34
    },
    {
      "year": 1997,
      "gdp": 14.091,
      "growth": 11.4,
      "perCapita": 1396.1,
      "popChangePct": -0.48
    },
    {
      "year": 1998,
      "gdp": 15.215,
      "growth": 8.4,
      "perCapita": 1514.7,
      "popChangePct": -0.48
    },
    {
      "year": 1999,
      "gdp": 12.133,
      "growth": 3.4,
      "perCapita": 1211.0,
      "popChangePct": -0.26
    },
    {
      "year": 2000,
      "gdp": 10.785,
      "growth": 5.8,
      "perCapita": 1079.6,
      "popChangePct": -0.29
    },
    {
      "year": 2001,
      "gdp": 12.778,
      "growth": 4.7,
      "perCapita": 1287.0,
      "popChangePct": -0.61
    },
    {
      "year": 2002,
      "gdp": 15.092,
      "growth": 5.1,
      "perCapita": 1529.8,
      "popChangePct": -0.63
    },
    {
      "year": 2003,
      "gdp": 18.42,
      "growth": 7.1,
      "perCapita": 1880.2,
      "popChangePct": -0.7
    },
    {
      "year": 2004,
      "gdp": 23.928,
      "growth": 11.5,
      "perCapita": 2459.2,
      "popChangePct": -0.68
    },
    {
      "year": 2005,
      "gdp": 31.239,
      "growth": 9.5,
      "perCapita": 3232.5,
      "popChangePct": -0.68
    },
    {
      "year": 2006,
      "gdp": 38.219,
      "growth": 10,
      "perCapita": 3979.1,
      "popChangePct": -0.61
    },
    {
      "year": 2007,
      "gdp": 46.815,
      "growth": 8.6,
      "perCapita": 4896.5,
      "popChangePct": -0.46
    },
    {
      "year": 2008,
      "gdp": 62.798,
      "growth": 10.2,
      "perCapita": 6590.9,
      "popChangePct": -0.35
    },
    {
      "year": 2009,
      "gdp": 50.855,
      "growth": 0.2,
      "perCapita": 5350.6,
      "popChangePct": -0.24
    },
    {
      "year": 2010,
      "gdp": 57.22,
      "growth": 7.8,
      "perCapita": 6033.4,
      "popChangePct": -0.22
    },
    {
      "year": 2011,
      "gdp": 61.368,
      "growth": 5.2,
      "perCapita": 6486.0,
      "popChangePct": -0.23
    },
    {
      "year": 2012,
      "gdp": 65.669,
      "growth": 1.6,
      "perCapita": 6951.4,
      "popChangePct": -0.16
    },
    {
      "year": 2013,
      "gdp": 75.496,
      "growth": 0.9,
      "perCapita": 7994.7,
      "popChangePct": -0.04
    },
    {
      "year": 2014,
      "gdp": 78.736,
      "growth": 2.5,
      "perCapita": 8333.2,
      "popChangePct": 0.06
    },
    {
      "year": 2015,
      "gdp": 56.329,
      "growth": -3.8,
      "perCapita": 5953.8,
      "popChangePct": 0.13
    },
    {
      "year": 2016,
      "gdp": 47.703,
      "growth": -2.5,
      "perCapita": 5037.7,
      "popChangePct": 0.08
    },
    {
      "year": 2017,
      "gdp": 54.723,
      "growth": 2.5,
      "perCapita": 5785.3,
      "popChangePct": -0.11
    },
    {
      "year": 2018,
      "gdp": 60.011,
      "growth": 3.1,
      "perCapita": 6358.0,
      "popChangePct": -0.21
    },
    {
      "year": 2019,
      "gdp": 64.414,
      "growth": 1.4,
      "perCapita": 6838.2,
      "popChangePct": -0.2
    },
    {
      "year": 2020,
      "gdp": 61.312,
      "growth": -0.7,
      "perCapita": 6536.5,
      "popChangePct": -0.42
    },
    {
      "year": 2021,
      "gdp": 68.207,
      "growth": 2.3,
      "perCapita": 7332.1,
      "popChangePct": -0.82
    },
    {
      "year": 2022,
      "gdp": 73.735,
      "growth": -4.5,
      "perCapita": 7990.3,
      "popChangePct": -0.81
    },
    {
      "year": 2023,
      "gdp": 71.792,
      "growth": 4.1,
      "perCapita": 7821.9,
      "popChangePct": -0.54
    },
    {
      "year": 2024,
      "gdp": 78.847,
      "growth": 4.3,
      "perCapita": 8633.5,
      "popChangePct": -0.49
    },
    {
      "year": 2025,
      "gdp": 92.766,
      "growth": 1.3,
      "perCapita": 10208.7,
      "popChangePct": -0.5
    },
    {
      "year": 2026,
      "gdp": 102.042,
      "growth": 1.2,
      "perCapita": 11285.9,
      "popChangePct": -0.5
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 107.418,
      "growth": 1,
      "perCapita": 11940.2,
      "popChangePct": -0.51
    },
    {
      "year": 2028,
      "gdp": 113.306,
      "growth": 1,
      "perCapita": 12658.0,
      "popChangePct": -0.5
    },
    {
      "year": 2029,
      "gdp": 120.533,
      "growth": 0.9,
      "perCapita": 13533.1,
      "popChangePct": -0.49
    },
    {
      "year": 2030,
      "gdp": 127.109,
      "growth": 1,
      "perCapita": 14343.1,
      "popChangePct": -0.51
    },
    {
      "year": 2031,
      "gdp": 133.483,
      "growth": 0.9,
      "perCapita": 15138.0,
      "popChangePct": -0.5
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 51.009,
      "perCapitaPPP": 4992.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": 0.22
    },
    {
      "year": 1993,
      "gdpPPP": 48.25,
      "perCapitaPPP": 4711.9,
      "perCapitaPPPChangePct": -5.62,
      "popChangePct": 0.23
    },
    {
      "year": 1994,
      "gdpPPP": 43.514,
      "perCapitaPPP": 4254.4,
      "perCapitaPPPChangePct": -9.71,
      "popChangePct": -0.12
    },
    {
      "year": 1995,
      "gdpPPP": 39.502,
      "perCapitaPPP": 3881.5,
      "perCapitaPPPChangePct": -8.77,
      "popChangePct": -0.5
    },
    {
      "year": 1996,
      "gdpPPP": 41.342,
      "perCapitaPPP": 4076.3,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": -0.34
    },
    {
      "year": 1997,
      "gdpPPP": 46.863,
      "perCapitaPPP": 4643.1,
      "perCapitaPPPChangePct": 13.91,
      "popChangePct": -0.48
    },
    {
      "year": 1998,
      "gdpPPP": 51.39,
      "perCapitaPPP": 5116.0,
      "perCapitaPPPChangePct": 10.18,
      "popChangePct": -0.48
    },
    {
      "year": 1999,
      "gdpPPP": 53.865,
      "perCapitaPPP": 5376.3,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": -0.26
    },
    {
      "year": 2000,
      "gdpPPP": 58.259,
      "perCapitaPPP": 5831.7,
      "perCapitaPPPChangePct": 8.47,
      "popChangePct": -0.29
    },
    {
      "year": 2001,
      "gdpPPP": 62.391,
      "perCapitaPPP": 6284.0,
      "perCapitaPPPChangePct": 7.76,
      "popChangePct": -0.61
    },
    {
      "year": 2002,
      "gdpPPP": 66.565,
      "perCapitaPPP": 6747.3,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": -0.63
    },
    {
      "year": 2003,
      "gdpPPP": 72.667,
      "perCapitaPPP": 7417.5,
      "perCapitaPPPChangePct": 9.93,
      "popChangePct": -0.7
    },
    {
      "year": 2004,
      "gdpPPP": 83.165,
      "perCapitaPPP": 8547.2,
      "perCapitaPPPChangePct": 15.23,
      "popChangePct": -0.68
    },
    {
      "year": 2005,
      "gdpPPP": 93.888,
      "perCapitaPPP": 9715.3,
      "perCapitaPPPChangePct": 13.67,
      "popChangePct": -0.68
    },
    {
      "year": 2006,
      "gdpPPP": 106.463,
      "perCapitaPPP": 11084.2,
      "perCapitaPPPChangePct": 14.09,
      "popChangePct": -0.61
    },
    {
      "year": 2007,
      "gdpPPP": 118.774,
      "perCapitaPPP": 12422.8,
      "perCapitaPPPChangePct": 12.08,
      "popChangePct": -0.46
    },
    {
      "year": 2008,
      "gdpPPP": 133.423,
      "perCapitaPPP": 14003.3,
      "perCapitaPPPChangePct": 12.72,
      "popChangePct": -0.35
    },
    {
      "year": 2009,
      "gdpPPP": 134.476,
      "perCapitaPPP": 14148.5,
      "perCapitaPPPChangePct": 1.04,
      "popChangePct": -0.24
    },
    {
      "year": 2010,
      "gdpPPP": 146.788,
      "perCapitaPPP": 15477.7,
      "perCapitaPPPChangePct": 9.39,
      "popChangePct": -0.22
    },
    {
      "year": 2011,
      "gdpPPP": 157.645,
      "perCapitaPPP": 16661.5,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": -0.23
    },
    {
      "year": 2012,
      "gdpPPP": 163.154,
      "perCapitaPPP": 17270.8,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": -0.16
    },
    {
      "year": 2013,
      "gdpPPP": 167.472,
      "perCapitaPPP": 17734.7,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": -0.04
    },
    {
      "year": 2014,
      "gdpPPP": 174.731,
      "perCapitaPPP": 18493.0,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.06
    },
    {
      "year": 2015,
      "gdpPPP": 169.599,
      "perCapitaPPP": 17926.0,
      "perCapitaPPPChangePct": -3.07,
      "popChangePct": 0.13
    },
    {
      "year": 2016,
      "gdpPPP": 166.885,
      "perCapitaPPP": 17623.7,
      "perCapitaPPPChangePct": -1.69,
      "popChangePct": 0.08
    },
    {
      "year": 2017,
      "gdpPPP": 174.175,
      "perCapitaPPP": 18413.7,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": -0.11
    },
    {
      "year": 2018,
      "gdpPPP": 189.021,
      "perCapitaPPP": 20026.0,
      "perCapitaPPPChangePct": 8.76,
      "popChangePct": -0.21
    },
    {
      "year": 2019,
      "gdpPPP": 210.076,
      "perCapitaPPP": 22301.6,
      "perCapitaPPPChangePct": 11.36,
      "popChangePct": -0.2
    },
    {
      "year": 2020,
      "gdpPPP": 233.301,
      "perCapitaPPP": 24872.3,
      "perCapitaPPPChangePct": 11.53,
      "popChangePct": -0.42
    },
    {
      "year": 2021,
      "gdpPPP": 251.445,
      "perCapitaPPP": 27029.6,
      "perCapitaPPPChangePct": 8.67,
      "popChangePct": -0.82
    },
    {
      "year": 2022,
      "gdpPPP": 257.198,
      "perCapitaPPP": 27871.3,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": -0.81
    },
    {
      "year": 2023,
      "gdpPPP": 277.721,
      "perCapitaPPP": 30258.4,
      "perCapitaPPPChangePct": 8.56,
      "popChangePct": -0.54
    },
    {
      "year": 2024,
      "gdpPPP": 296.996,
      "perCapitaPPP": 32520.3,
      "perCapitaPPPChangePct": 7.48,
      "popChangePct": -0.49
    },
    {
      "year": 2025,
      "gdpPPP": 309.278,
      "perCapitaPPP": 34035.3,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": -0.5
    },
    {
      "year": 2026,
      "gdpPPP": 322.02,
      "perCapitaPPP": 35615.7,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": -0.5
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 332.347,
      "perCapitaPPP": 36942.5,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": -0.51
    },
    {
      "year": 2028,
      "gdpPPP": 341.317,
      "perCapitaPPP": 38130.3,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": -0.5
    },
    {
      "year": 2029,
      "gdpPPP": 350.661,
      "perCapitaPPP": 39371,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": -0.49
    },
    {
      "year": 2030,
      "gdpPPP": 360.57,
      "perCapitaPPP": 40687.0,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": -0.51
    },
    {
      "year": 2031,
      "gdpPPP": 370.451,
      "perCapitaPPP": 42012.0,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": -0.5
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BelarusGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
