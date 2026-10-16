import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Malta",
  "slug": "malta",
  "iso3": "MLT",
  "region": "Europe",
  "rank2026": 122,
  "flagEmoji": "🇲🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Armenia",
      "slug": "armenia",
      "rank": 121
    },
    {
      "name": "Guinea",
      "slug": "guinea",
      "rank": 123
    }
  ],
  "history": [
    {
      "year": 1995,
      "gdp": 3.353,
      "growth": null,
      "perCapita": 8906.8,
      "popChangePct": 0.8
    },
    {
      "year": 1996,
      "gdp": 3.419,
      "growth": null,
      "perCapita": 9034.5,
      "popChangePct": 0.53
    },
    {
      "year": 1997,
      "gdp": 3.461,
      "growth": null,
      "perCapita": 9074.5,
      "popChangePct": 0.79
    },
    {
      "year": 1998,
      "gdp": 3.667,
      "growth": null,
      "perCapita": 9544.7,
      "popChangePct": 0.79
    },
    {
      "year": 1999,
      "gdp": 3.827,
      "growth": null,
      "perCapita": 9903.7,
      "popChangePct": 0.52
    },
    {
      "year": 2000,
      "gdp": 4.042,
      "growth": null,
      "perCapita": 10397.8,
      "popChangePct": 0.78
    },
    {
      "year": 2001,
      "gdp": 4.072,
      "growth": -0.8,
      "perCapita": 10403.1,
      "popChangePct": 0.51
    },
    {
      "year": 2002,
      "gdp": 4.462,
      "growth": 2.7,
      "perCapita": 11307.3,
      "popChangePct": 1.02
    },
    {
      "year": 2003,
      "gdp": 5.425,
      "growth": 3.7,
      "perCapita": 13654.8,
      "popChangePct": 0.51
    },
    {
      "year": 2004,
      "gdp": 6.109,
      "growth": 0.4,
      "perCapita": 15276.9,
      "popChangePct": 0.76
    },
    {
      "year": 2005,
      "gdp": 6.392,
      "growth": 2.9,
      "perCapita": 15873.5,
      "popChangePct": 0.75
    },
    {
      "year": 2006,
      "gdp": 6.783,
      "growth": 2.3,
      "perCapita": 16748.3,
      "popChangePct": 0.5
    },
    {
      "year": 2007,
      "gdp": 7.972,
      "growth": 5,
      "perCapita": 19655.1,
      "popChangePct": 0.25
    },
    {
      "year": 2008,
      "gdp": 9.171,
      "growth": 4.4,
      "perCapita": 22487.7,
      "popChangePct": 0.49
    },
    {
      "year": 2009,
      "gdp": 8.76,
      "growth": -1.4,
      "perCapita": 21318.8,
      "popChangePct": 0.74
    },
    {
      "year": 2010,
      "gdp": 9.104,
      "growth": 6.2,
      "perCapita": 21989.8,
      "popChangePct": 0.73
    },
    {
      "year": 2011,
      "gdp": 9.788,
      "growth": 1,
      "perCapita": 23585.3,
      "popChangePct": 0.24
    },
    {
      "year": 2012,
      "gdp": 9.616,
      "growth": 4.1,
      "perCapita": 23029.0,
      "popChangePct": 0.72
    },
    {
      "year": 2013,
      "gdp": 10.797,
      "growth": 6.3,
      "perCapita": 25617.8,
      "popChangePct": 0.72
    },
    {
      "year": 2014,
      "gdp": 11.891,
      "growth": 7.6,
      "perCapita": 27772.9,
      "popChangePct": 1.66
    },
    {
      "year": 2015,
      "gdp": 11.342,
      "growth": 9.6,
      "perCapita": 25847.3,
      "popChangePct": 2.57
    },
    {
      "year": 2016,
      "gdp": 12.022,
      "growth": 4.1,
      "perCapita": 26738.2,
      "popChangePct": 2.51
    },
    {
      "year": 2017,
      "gdp": 14.156,
      "growth": 13,
      "perCapita": 30816.5,
      "popChangePct": 2.0
    },
    {
      "year": 2018,
      "gdp": 16.161,
      "growth": 7.2,
      "perCapita": 34035.1,
      "popChangePct": 3.49
    },
    {
      "year": 2019,
      "gdp": 16.34,
      "growth": 4.1,
      "perCapita": 33145.4,
      "popChangePct": 3.79
    },
    {
      "year": 2020,
      "gdp": 16.392,
      "growth": -3.5,
      "perCapita": 31837.4,
      "popChangePct": 4.46
    },
    {
      "year": 2021,
      "gdp": 19.743,
      "growth": 13.4,
      "perCapita": 38253.0,
      "popChangePct": 0.19
    },
    {
      "year": 2022,
      "gdp": 18.954,
      "growth": 2.6,
      "perCapita": 36437.6,
      "popChangePct": 0.78
    },
    {
      "year": 2023,
      "gdp": 22.632,
      "growth": 10.6,
      "perCapita": 41752.1,
      "popChangePct": 4.23
    },
    {
      "year": 2024,
      "gdp": 25.035,
      "growth": 6.2,
      "perCapita": 45295.2,
      "popChangePct": 2.03
    },
    {
      "year": 2025,
      "gdp": 27.756,
      "growth": 4,
      "perCapita": 49297.1,
      "popChangePct": 1.81
    },
    {
      "year": 2026,
      "gdp": 30.712,
      "growth": 3.7,
      "perCapita": 53560.4,
      "popChangePct": 1.78
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 32.449,
      "growth": 3.8,
      "perCapita": 55581.8,
      "popChangePct": 1.92
    },
    {
      "year": 2028,
      "gdp": 34.333,
      "growth": 4,
      "perCapita": 57779.0,
      "popChangePct": 1.71
    },
    {
      "year": 2029,
      "gdp": 36.407,
      "growth": 4,
      "perCapita": 60243.3,
      "popChangePct": 1.68
    },
    {
      "year": 2030,
      "gdp": 38.63,
      "growth": 4,
      "perCapita": 62901.4,
      "popChangePct": 1.66
    },
    {
      "year": 2031,
      "gdp": 41,
      "growth": 4,
      "perCapita": 65745.4,
      "popChangePct": 1.63
    }
  ],
  "pppHistory": [
    {
      "year": 1995,
      "gdpPPP": 6.207,
      "perCapitaPPP": 16490.1,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 0.8
    },
    {
      "year": 1996,
      "gdpPPP": 6.574,
      "perCapitaPPP": 17372.5,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 0.53
    },
    {
      "year": 1997,
      "gdpPPP": 7.011,
      "perCapitaPPP": 18382.7,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 0.79
    },
    {
      "year": 1998,
      "gdpPPP": 7.331,
      "perCapitaPPP": 19082.9,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 0.79
    },
    {
      "year": 1999,
      "gdpPPP": 7.716,
      "perCapitaPPP": 19968.2,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 0.52
    },
    {
      "year": 2000,
      "gdpPPP": 7.812,
      "perCapitaPPP": 20095.3,
      "perCapitaPPPChangePct": 0.64,
      "popChangePct": 0.78
    },
    {
      "year": 2001,
      "gdpPPP": 7.928,
      "perCapitaPPP": 20253.6,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": 0.51
    },
    {
      "year": 2002,
      "gdpPPP": 8.271,
      "perCapitaPPP": 20959.4,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 1.02
    },
    {
      "year": 2003,
      "gdpPPP": 8.746,
      "perCapitaPPP": 22015.0,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 0.51
    },
    {
      "year": 2004,
      "gdpPPP": 9.018,
      "perCapitaPPP": 22552.6,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 0.76
    },
    {
      "year": 2005,
      "gdpPPP": 9.569,
      "perCapitaPPP": 23763.9,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 0.75
    },
    {
      "year": 2006,
      "gdpPPP": 10.095,
      "perCapitaPPP": 24924.8,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 0.5
    },
    {
      "year": 2007,
      "gdpPPP": 10.89,
      "perCapitaPPP": 26848.1,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": 0.25
    },
    {
      "year": 2008,
      "gdpPPP": 11.589,
      "perCapitaPPP": 28416.8,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 0.49
    },
    {
      "year": 2009,
      "gdpPPP": 11.498,
      "perCapitaPPP": 27980.9,
      "perCapitaPPPChangePct": -1.53,
      "popChangePct": 0.74
    },
    {
      "year": 2010,
      "gdpPPP": 12.359,
      "perCapitaPPP": 29851.1,
      "perCapitaPPPChangePct": 6.68,
      "popChangePct": 0.73
    },
    {
      "year": 2011,
      "gdpPPP": 12.739,
      "perCapitaPPP": 30698.1,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.24
    },
    {
      "year": 2012,
      "gdpPPP": 13.509,
      "perCapitaPPP": 32353.0,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 0.72
    },
    {
      "year": 2013,
      "gdpPPP": 14.603,
      "perCapitaPPP": 34648.8,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": 0.72
    },
    {
      "year": 2014,
      "gdpPPP": 15.991,
      "perCapitaPPP": 37349.5,
      "perCapitaPPPChangePct": 7.79,
      "popChangePct": 1.66
    },
    {
      "year": 2015,
      "gdpPPP": 17.693,
      "perCapitaPPP": 40319.9,
      "perCapitaPPPChangePct": 7.95,
      "popChangePct": 2.57
    },
    {
      "year": 2016,
      "gdpPPP": 18.589,
      "perCapitaPPP": 41342.6,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 2.51
    },
    {
      "year": 2017,
      "gdpPPP": 21.377,
      "perCapitaPPP": 46534.0,
      "perCapitaPPPChangePct": 12.56,
      "popChangePct": 2.0
    },
    {
      "year": 2018,
      "gdpPPP": 23.314,
      "perCapitaPPP": 49098.3,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 3.49
    },
    {
      "year": 2019,
      "gdpPPP": 25.897,
      "perCapitaPPP": 52533.8,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 3.79
    },
    {
      "year": 2020,
      "gdpPPP": 25.76,
      "perCapitaPPP": 50034.0,
      "perCapitaPPPChangePct": -4.76,
      "popChangePct": 4.46
    },
    {
      "year": 2021,
      "gdpPPP": 30.198,
      "perCapitaPPP": 58508.7,
      "perCapitaPPPChangePct": 16.94,
      "popChangePct": 0.19
    },
    {
      "year": 2022,
      "gdpPPP": 33.184,
      "perCapitaPPP": 63794.9,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": 0.78
    },
    {
      "year": 2023,
      "gdpPPP": 38.071,
      "perCapitaPPP": 70236.0,
      "perCapitaPPPChangePct": 10.1,
      "popChangePct": 4.23
    },
    {
      "year": 2024,
      "gdpPPP": 41.441,
      "perCapitaPPP": 74977.1,
      "perCapitaPPPChangePct": 6.75,
      "popChangePct": 2.03
    },
    {
      "year": 2025,
      "gdpPPP": 44.305,
      "perCapitaPPP": 78689.2,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 1.81
    },
    {
      "year": 2026,
      "gdpPPP": 47.26,
      "perCapitaPPP": 82420.9,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 1.78
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 50.133,
      "perCapitaPPP": 85874.4,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 1.92
    },
    {
      "year": 2028,
      "gdpPPP": 52.994,
      "perCapitaPPP": 89184.3,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 1.71
    },
    {
      "year": 2029,
      "gdpPPP": 56.094,
      "perCapitaPPP": 92821.3,
      "perCapitaPPPChangePct": 4.08,
      "popChangePct": 1.68
    },
    {
      "year": 2030,
      "gdpPPP": 59.41,
      "perCapitaPPP": 96737.2,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 1.66
    },
    {
      "year": 2031,
      "gdpPPP": 62.902,
      "perCapitaPPP": 100865.7,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.63
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MaltaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
