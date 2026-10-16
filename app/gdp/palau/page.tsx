import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Palau",
  "slug": "palau",
  "iso3": "PLW",
  "region": "Oceania",
  "rank2026": 213,
  "flagEmoji": "🇵🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Kiribati",
      "slug": "kiribati",
      "rank": 212
    },
    {
      "name": "Marshall Islands",
      "slug": "marshall-islands",
      "rank": 215
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 0.15,
      "growth": null,
      "perCapita": 7818.1,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 0.159,
      "growth": 7.3,
      "perCapita": 8269.1,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.163,
      "growth": 4.7,
      "perCapita": 8368.7,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 0.155,
      "growth": -2.1,
      "perCapita": 7889.3,
      "popChangePct": 5.26
    },
    {
      "year": 2004,
      "gdp": 0.166,
      "growth": 3.5,
      "perCapita": 8423.9,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.186,
      "growth": 2.9,
      "perCapita": 9326.3,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.191,
      "growth": 0.2,
      "perCapita": 9766.0,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.196,
      "growth": 0.7,
      "perCapita": 10224.9,
      "popChangePct": -5.0
    },
    {
      "year": 2008,
      "gdp": 0.199,
      "growth": -5.6,
      "perCapita": 10580.9,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.184,
      "growth": -6.2,
      "perCapita": 9970.0,
      "popChangePct": -5.26
    },
    {
      "year": 2010,
      "gdp": 0.184,
      "growth": -3,
      "perCapita": 10173.1,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.195,
      "growth": 4.5,
      "perCapita": 10978.4,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 0.215,
      "growth": 2.1,
      "perCapita": 12320.3,
      "popChangePct": -5.56
    },
    {
      "year": 2013,
      "gdp": 0.226,
      "growth": -1.4,
      "perCapita": 12916.7,
      "popChangePct": 5.88
    },
    {
      "year": 2014,
      "gdp": 0.245,
      "growth": 4.2,
      "perCapita": 13954.2,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.283,
      "growth": 8.6,
      "perCapita": 16036.7,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 0.303,
      "growth": 1.7,
      "perCapita": 17182.5,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 0.29,
      "growth": -3.4,
      "perCapita": 16434.0,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 0.288,
      "growth": -0.4,
      "perCapita": 16341.8,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 0.282,
      "growth": 0.3,
      "perCapita": 15993.2,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 0.259,
      "growth": -6,
      "perCapita": 14696.9,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 0.236,
      "growth": -11.9,
      "perCapita": 13394.8,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 0.247,
      "growth": -0.5,
      "perCapita": 14055.9,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 0.276,
      "growth": 1.2,
      "perCapita": 15692.2,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 0.322,
      "growth": 12,
      "perCapita": 18277.0,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 0.345,
      "growth": 6.3,
      "perCapita": 19684.7,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 0.377,
      "growth": 3.3,
      "perCapita": 21570.7,
      "popChangePct": -5.56
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.398,
      "growth": 2.8,
      "perCapita": 22802.6,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 0.419,
      "growth": 3.2,
      "perCapita": 24096.1,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 0.438,
      "growth": 2.6,
      "perCapita": 25317.9,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 0.456,
      "growth": 2,
      "perCapita": 26435.9,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.474,
      "growth": 2,
      "perCapita": 27624.0,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 0.163,
      "perCapitaPPP": 8505.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 0.179,
      "perCapitaPPP": 9261.1,
      "perCapitaPPPChangePct": 8.89,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 0.19,
      "perCapitaPPP": 9770.3,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 0.19,
      "perCapitaPPP": 9673.8,
      "perCapitaPPPChangePct": -0.99,
      "popChangePct": 5.26
    },
    {
      "year": 2004,
      "gdpPPP": 0.201,
      "perCapitaPPP": 10197.2,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.214,
      "perCapitaPPP": 10734.4,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.221,
      "perCapitaPPP": 11302.0,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.228,
      "perCapitaPPP": 11910.3,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": -5.0
    },
    {
      "year": 2008,
      "gdpPPP": 0.22,
      "perCapitaPPP": 11683.9,
      "perCapitaPPPChangePct": -1.9,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.207,
      "perCapitaPPP": 11237.6,
      "perCapitaPPPChangePct": -3.82,
      "popChangePct": -5.26
    },
    {
      "year": 2010,
      "gdpPPP": 0.204,
      "perCapitaPPP": 11239.9,
      "perCapitaPPPChangePct": 0.02,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 0.217,
      "perCapitaPPP": 12221.6,
      "perCapitaPPPChangePct": 8.73,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 0.226,
      "perCapitaPPP": 12947.7,
      "perCapitaPPPChangePct": 5.94,
      "popChangePct": -5.56
    },
    {
      "year": 2013,
      "gdpPPP": 0.227,
      "perCapitaPPP": 12931.4,
      "perCapitaPPPChangePct": -0.13,
      "popChangePct": 5.88
    },
    {
      "year": 2014,
      "gdpPPP": 0.24,
      "perCapitaPPP": 13654.9,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 0.263,
      "perCapitaPPP": 14901.4,
      "perCapitaPPPChangePct": 9.13,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 0.27,
      "perCapitaPPP": 15300.5,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.266,
      "perCapitaPPP": 15048.4,
      "perCapitaPPPChangePct": -1.65,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 0.27,
      "perCapitaPPP": 15335.6,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 0.276,
      "perCapitaPPP": 15642.6,
      "perCapitaPPPChangePct": 2.0,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 0.263,
      "perCapitaPPP": 14907.2,
      "perCapitaPPPChangePct": -4.7,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 0.242,
      "perCapitaPPP": 13736.3,
      "perCapitaPPPChangePct": -7.85,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 0.258,
      "perCapitaPPP": 14651.7,
      "perCapitaPPPChangePct": 6.66,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 0.271,
      "perCapitaPPP": 15386.5,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 0.311,
      "perCapitaPPP": 17669.4,
      "perCapitaPPPChangePct": 14.84,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 0.34,
      "perCapitaPPP": 19366.8,
      "perCapitaPPPChangePct": 9.61,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 0.361,
      "perCapitaPPP": 20641.2,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": -5.56
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.379,
      "perCapitaPPP": 21745.8,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 0.398,
      "perCapitaPPP": 22895.6,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 0.416,
      "perCapitaPPP": 23994.6,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 0.431,
      "perCapitaPPP": 25014.2,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 0.448,
      "perCapitaPPP": 26088.5,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PalauGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
