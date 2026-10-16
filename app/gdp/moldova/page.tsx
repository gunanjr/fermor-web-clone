import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Moldova",
  "slug": "moldova",
  "iso3": "MDA",
  "region": "Europe",
  "rank2026": 135,
  "flagEmoji": "🇲🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Botswana",
      "slug": "botswana",
      "rank": 134
    },
    {
      "name": "North Macedonia",
      "slug": "north-macedonia",
      "rank": 136
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.864,
      "growth": -29.7,
      "perCapita": 290.1,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 1.11,
      "growth": -1.2,
      "perCapita": 373.9,
      "popChangePct": -0.27
    },
    {
      "year": 1994,
      "gdp": 1.158,
      "growth": -30.9,
      "perCapita": 389.6,
      "popChangePct": 0.13
    },
    {
      "year": 1995,
      "gdp": 1.441,
      "growth": -1.4,
      "perCapita": 485.4,
      "popChangePct": -0.1
    },
    {
      "year": 1996,
      "gdp": 1.694,
      "growth": -5.9,
      "perCapita": 572.3,
      "popChangePct": -0.34
    },
    {
      "year": 1997,
      "gdp": 1.928,
      "growth": 1.6,
      "perCapita": 653.5,
      "popChangePct": -0.34
    },
    {
      "year": 1998,
      "gdp": 1.697,
      "growth": -6.5,
      "perCapita": 576.0,
      "popChangePct": -0.14
    },
    {
      "year": 1999,
      "gdp": 1.172,
      "growth": -3.4,
      "perCapita": 398.4,
      "popChangePct": -0.17
    },
    {
      "year": 2000,
      "gdp": 1.315,
      "growth": 2.1,
      "perCapita": 448.1,
      "popChangePct": -0.24
    },
    {
      "year": 2001,
      "gdp": 1.481,
      "growth": 6.1,
      "perCapita": 505.8,
      "popChangePct": -0.2
    },
    {
      "year": 2002,
      "gdp": 1.662,
      "growth": 7.8,
      "perCapita": 569.1,
      "popChangePct": -0.27
    },
    {
      "year": 2003,
      "gdp": 1.981,
      "growth": 6.6,
      "perCapita": 680.3,
      "popChangePct": -0.31
    },
    {
      "year": 2004,
      "gdp": 2.598,
      "growth": 7.4,
      "perCapita": 894.1,
      "popChangePct": -0.17
    },
    {
      "year": 2005,
      "gdp": 2.988,
      "growth": 7.5,
      "perCapita": 1031.4,
      "popChangePct": -0.31
    },
    {
      "year": 2006,
      "gdp": 3.408,
      "growth": 4.8,
      "perCapita": 1179.3,
      "popChangePct": -0.24
    },
    {
      "year": 2007,
      "gdp": 4.401,
      "growth": 3,
      "perCapita": 1526.4,
      "popChangePct": -0.24
    },
    {
      "year": 2008,
      "gdp": 6.055,
      "growth": 7.8,
      "perCapita": 2102.9,
      "popChangePct": -0.14
    },
    {
      "year": 2009,
      "gdp": 5.438,
      "growth": -6,
      "perCapita": 1890.6,
      "popChangePct": -0.1
    },
    {
      "year": 2010,
      "gdp": 6.977,
      "growth": 7.1,
      "perCapita": 2428.1,
      "popChangePct": -0.1
    },
    {
      "year": 2011,
      "gdp": 8.417,
      "growth": 5.8,
      "perCapita": 2930.1,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 8.708,
      "growth": -0.6,
      "perCapita": 3031.1,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 9.496,
      "growth": 9,
      "perCapita": 3307.4,
      "popChangePct": -0.07
    },
    {
      "year": 2014,
      "gdp": 9.402,
      "growth": 5,
      "perCapita": 3276.9,
      "popChangePct": -0.07
    },
    {
      "year": 2015,
      "gdp": 7.778,
      "growth": -0.7,
      "perCapita": 2734.2,
      "popChangePct": -0.84
    },
    {
      "year": 2016,
      "gdp": 7.981,
      "growth": 4.6,
      "perCapita": 2825.8,
      "popChangePct": -0.74
    },
    {
      "year": 2017,
      "gdp": 9.515,
      "growth": 4.2,
      "perCapita": 3422.6,
      "popChangePct": -1.56
    },
    {
      "year": 2018,
      "gdp": 11.252,
      "growth": 4.1,
      "perCapita": 4121.0,
      "popChangePct": -1.8
    },
    {
      "year": 2019,
      "gdp": 11.737,
      "growth": 3.6,
      "perCapita": 4371.7,
      "popChangePct": -1.65
    },
    {
      "year": 2020,
      "gdp": 11.53,
      "growth": -8.3,
      "perCapita": 4361.5,
      "popChangePct": -1.53
    },
    {
      "year": 2021,
      "gdp": 13.694,
      "growth": 13.9,
      "perCapita": 5213.5,
      "popChangePct": -0.64
    },
    {
      "year": 2022,
      "gdp": 14.524,
      "growth": -4.6,
      "perCapita": 5662.2,
      "popChangePct": -2.36
    },
    {
      "year": 2023,
      "gdp": 16.711,
      "growth": 1.2,
      "perCapita": 6704.9,
      "popChangePct": -2.85
    },
    {
      "year": 2024,
      "gdp": 18.208,
      "growth": 0.3,
      "perCapita": 7513.6,
      "popChangePct": -2.77
    },
    {
      "year": 2025,
      "gdp": 20.342,
      "growth": 2.4,
      "perCapita": 8542.4,
      "popChangePct": -1.73
    },
    {
      "year": 2026,
      "gdp": 21.889,
      "growth": 1.9,
      "perCapita": 9354.1,
      "popChangePct": -1.72
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 23.723,
      "growth": 3.2,
      "perCapita": 10316.7,
      "popChangePct": -1.75
    },
    {
      "year": 2028,
      "gdp": 25.722,
      "growth": 3.6,
      "perCapita": 11383.0,
      "popChangePct": -1.7
    },
    {
      "year": 2029,
      "gdp": 27.876,
      "growth": 3.6,
      "perCapita": 12554.0,
      "popChangePct": -1.73
    },
    {
      "year": 2030,
      "gdp": 30.197,
      "growth": 3.5,
      "perCapita": 13838.9,
      "popChangePct": -1.76
    },
    {
      "year": 2031,
      "gdp": 32.879,
      "growth": 3.5,
      "perCapita": 15333.7,
      "popChangePct": -1.74
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 15.242,
      "perCapitaPPP": 5119.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 15.416,
      "perCapitaPPP": 5191.6,
      "perCapitaPPPChangePct": 1.4,
      "popChangePct": -0.27
    },
    {
      "year": 1994,
      "gdpPPP": 10.88,
      "perCapitaPPP": 3659.8,
      "perCapitaPPPChangePct": -29.5,
      "popChangePct": 0.13
    },
    {
      "year": 1995,
      "gdpPPP": 10.95,
      "perCapitaPPP": 3687.3,
      "perCapitaPPPChangePct": 0.75,
      "popChangePct": -0.1
    },
    {
      "year": 1996,
      "gdpPPP": 10.492,
      "perCapitaPPP": 3544.5,
      "perCapitaPPPChangePct": -3.87,
      "popChangePct": -0.34
    },
    {
      "year": 1997,
      "gdpPPP": 10.844,
      "perCapitaPPP": 3675.5,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": -0.34
    },
    {
      "year": 1998,
      "gdpPPP": 10.253,
      "perCapitaPPP": 3480.6,
      "perCapitaPPPChangePct": -5.3,
      "popChangePct": -0.14
    },
    {
      "year": 1999,
      "gdpPPP": 10.045,
      "perCapitaPPP": 3415.4,
      "perCapitaPPPChangePct": -1.88,
      "popChangePct": -0.17
    },
    {
      "year": 2000,
      "gdpPPP": 10.488,
      "perCapitaPPP": 3574.9,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": -0.24
    },
    {
      "year": 2001,
      "gdpPPP": 11.378,
      "perCapitaPPP": 3886.1,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": -0.2
    },
    {
      "year": 2002,
      "gdpPPP": 12.456,
      "perCapitaPPP": 4265.5,
      "perCapitaPPPChangePct": 9.76,
      "popChangePct": -0.27
    },
    {
      "year": 2003,
      "gdpPPP": 13.54,
      "perCapitaPPP": 4650.8,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": -0.31
    },
    {
      "year": 2004,
      "gdpPPP": 14.933,
      "perCapitaPPP": 5139.2,
      "perCapitaPPPChangePct": 10.5,
      "popChangePct": -0.17
    },
    {
      "year": 2005,
      "gdpPPP": 16.557,
      "perCapitaPPP": 5714.6,
      "perCapitaPPPChangePct": 11.2,
      "popChangePct": -0.31
    },
    {
      "year": 2006,
      "gdpPPP": 17.887,
      "perCapitaPPP": 6188.8,
      "perCapitaPPPChangePct": 8.3,
      "popChangePct": -0.24
    },
    {
      "year": 2007,
      "gdpPPP": 18.922,
      "perCapitaPPP": 6562.6,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": -0.24
    },
    {
      "year": 2008,
      "gdpPPP": 20.791,
      "perCapitaPPP": 7221.2,
      "perCapitaPPPChangePct": 10.04,
      "popChangePct": -0.14
    },
    {
      "year": 2009,
      "gdpPPP": 19.664,
      "perCapitaPPP": 6837.1,
      "perCapitaPPPChangePct": -5.32,
      "popChangePct": -0.1
    },
    {
      "year": 2010,
      "gdpPPP": 21.317,
      "perCapitaPPP": 7418.4,
      "perCapitaPPPChangePct": 8.5,
      "popChangePct": -0.1
    },
    {
      "year": 2011,
      "gdpPPP": 23.022,
      "perCapitaPPP": 8014.0,
      "perCapitaPPPChangePct": 8.03,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 23.313,
      "perCapitaPPP": 8115.1,
      "perCapitaPPPChangePct": 1.26,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 25.854,
      "perCapitaPPP": 9004.4,
      "perCapitaPPPChangePct": 10.96,
      "popChangePct": -0.07
    },
    {
      "year": 2014,
      "gdpPPP": 27.619,
      "perCapitaPPP": 9626.0,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": -0.07
    },
    {
      "year": 2015,
      "gdpPPP": 27.68,
      "perCapitaPPP": 9730.6,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": -0.84
    },
    {
      "year": 2016,
      "gdpPPP": 29.229,
      "perCapitaPPP": 10348.7,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": -0.74
    },
    {
      "year": 2017,
      "gdpPPP": 31.002,
      "perCapitaPPP": 11151.9,
      "perCapitaPPPChangePct": 7.76,
      "popChangePct": -1.56
    },
    {
      "year": 2018,
      "gdpPPP": 32.13,
      "perCapitaPPP": 11767.5,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": -1.8
    },
    {
      "year": 2019,
      "gdpPPP": 35.736,
      "perCapitaPPP": 13310.6,
      "perCapitaPPPChangePct": 13.11,
      "popChangePct": -1.65
    },
    {
      "year": 2020,
      "gdpPPP": 35.647,
      "perCapitaPPP": 13483.7,
      "perCapitaPPPChangePct": 1.3,
      "popChangePct": -1.53
    },
    {
      "year": 2021,
      "gdpPPP": 40.708,
      "perCapitaPPP": 15498.3,
      "perCapitaPPPChangePct": 14.94,
      "popChangePct": -0.64
    },
    {
      "year": 2022,
      "gdpPPP": 41.597,
      "perCapitaPPP": 16217.0,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": -2.36
    },
    {
      "year": 2023,
      "gdpPPP": 43.654,
      "perCapitaPPP": 17515.7,
      "perCapitaPPPChangePct": 8.01,
      "popChangePct": -2.85
    },
    {
      "year": 2024,
      "gdpPPP": 44.872,
      "perCapitaPPP": 18517.0,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": -2.77
    },
    {
      "year": 2025,
      "gdpPPP": 47.26,
      "perCapitaPPP": 19846.3,
      "perCapitaPPPChangePct": 7.18,
      "popChangePct": -1.73
    },
    {
      "year": 2026,
      "gdpPPP": 49.537,
      "perCapitaPPP": 21169.5,
      "perCapitaPPPChangePct": 6.67,
      "popChangePct": -1.72
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 52.245,
      "perCapitaPPP": 22720.3,
      "perCapitaPPPChangePct": 7.33,
      "popChangePct": -1.75
    },
    {
      "year": 2028,
      "gdpPPP": 55.041,
      "perCapitaPPP": 24358.2,
      "perCapitaPPPChangePct": 7.21,
      "popChangePct": -1.7
    },
    {
      "year": 2029,
      "gdpPPP": 58.037,
      "perCapitaPPP": 26136.7,
      "perCapitaPPPChangePct": 7.3,
      "popChangePct": -1.73
    },
    {
      "year": 2030,
      "gdpPPP": 61.201,
      "perCapitaPPP": 28047.8,
      "perCapitaPPPChangePct": 7.31,
      "popChangePct": -1.76
    },
    {
      "year": 2031,
      "gdpPPP": 64.487,
      "perCapitaPPP": 30074.6,
      "perCapitaPPPChangePct": 7.23,
      "popChangePct": -1.74
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MoldovaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
