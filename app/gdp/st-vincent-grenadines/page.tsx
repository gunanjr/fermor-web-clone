import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "St. Vincent & Grenadines",
  "slug": "st-vincent-grenadines",
  "iso3": "VCT",
  "region": "Americas",
  "rank2026": 202,
  "flagEmoji": "🇻🇨",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Samoa",
      "slug": "samoa",
      "rank": 201
    },
    {
      "name": "Sao Tome & Principe",
      "slug": "sao-tome-principe",
      "rank": 203
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.089,
      "growth": 2.4,
      "perCapita": 903.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.11,
      "growth": 4.6,
      "perCapita": 1110.4,
      "popChangePct": 1.02
    },
    {
      "year": 1982,
      "gdp": 0.123,
      "growth": 4.5,
      "perCapita": 1227.4,
      "popChangePct": 1.01
    },
    {
      "year": 1983,
      "gdp": 0.132,
      "growth": 2.2,
      "perCapita": 1309.1,
      "popChangePct": 1.0
    },
    {
      "year": 1984,
      "gdp": 0.146,
      "growth": 6.6,
      "perCapita": 1435.3,
      "popChangePct": 0.99
    },
    {
      "year": 1985,
      "gdp": 0.157,
      "growth": 6.2,
      "perCapita": 1537.2,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdp": 0.174,
      "growth": 5.6,
      "perCapita": 1686.1,
      "popChangePct": 0.98
    },
    {
      "year": 1987,
      "gdp": 0.19,
      "growth": 0.4,
      "perCapita": 1828.4,
      "popChangePct": 0.97
    },
    {
      "year": 1988,
      "gdp": 0.217,
      "growth": 14.1,
      "perCapita": 2077.7,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdp": 0.232,
      "growth": 1.4,
      "perCapita": 2211.4,
      "popChangePct": 0.96
    },
    {
      "year": 1990,
      "gdp": 0.26,
      "growth": 4.1,
      "perCapita": 2456.3,
      "popChangePct": 0.95
    },
    {
      "year": 1991,
      "gdp": 0.275,
      "growth": 1.1,
      "perCapita": 2584.1,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdp": 0.3,
      "growth": 6.4,
      "perCapita": 2815.1,
      "popChangePct": 0.94
    },
    {
      "year": 1993,
      "gdp": 0.309,
      "growth": 4.3,
      "perCapita": 2896.0,
      "popChangePct": 0.0
    },
    {
      "year": 1994,
      "gdp": 0.313,
      "growth": -1.2,
      "perCapita": 2924.0,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdp": 0.341,
      "growth": 7.8,
      "perCapita": 3188.5,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 0.358,
      "growth": 1.3,
      "perCapita": 3340.5,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdp": 0.376,
      "growth": 3.5,
      "perCapita": 3500.2,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdp": 0.403,
      "growth": 4.1,
      "perCapita": 3755.7,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdp": 0.422,
      "growth": 2.7,
      "perCapita": 3922.7,
      "popChangePct": 0.93
    },
    {
      "year": 2000,
      "gdp": 0.428,
      "growth": 1.6,
      "perCapita": 3973.4,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdp": 0.462,
      "growth": 1.6,
      "perCapita": 4285.0,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.488,
      "growth": 4.9,
      "perCapita": 4518.1,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 0.509,
      "growth": 6.1,
      "perCapita": 4710.3,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.55,
      "growth": 3.7,
      "perCapita": 5082.1,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.58,
      "growth": 2.3,
      "perCapita": 5353.7,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.644,
      "growth": 6.5,
      "perCapita": 5933.6,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.714,
      "growth": 3.1,
      "perCapita": 6572.5,
      "popChangePct": 0.93
    },
    {
      "year": 2008,
      "gdp": 0.733,
      "growth": 0.4,
      "perCapita": 6740.5,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.714,
      "growth": -1.2,
      "perCapita": 6564.1,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.72,
      "growth": -4.3,
      "perCapita": 6613.1,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.714,
      "growth": -0.6,
      "perCapita": 6544.7,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 0.73,
      "growth": 1.1,
      "perCapita": 6686.0,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 0.765,
      "growth": 2.5,
      "perCapita": 6988.3,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 0.771,
      "growth": 1.1,
      "perCapita": 7028.3,
      "popChangePct": 0.92
    },
    {
      "year": 2015,
      "gdp": 0.787,
      "growth": 2.8,
      "perCapita": 7154.8,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 0.814,
      "growth": 4.1,
      "perCapita": 7390.5,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 0.844,
      "growth": 1.5,
      "perCapita": 7643.1,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 0.884,
      "growth": 3.2,
      "perCapita": 8001.6,
      "popChangePct": 0.91
    },
    {
      "year": 2019,
      "gdp": 0.91,
      "growth": 0.7,
      "perCapita": 8231.6,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 0.864,
      "growth": -4.8,
      "perCapita": 7802.9,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 0.888,
      "growth": 2.1,
      "perCapita": 8017.6,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 0.97,
      "growth": 5,
      "perCapita": 8748.0,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 1.047,
      "growth": 4.5,
      "perCapita": 9432.8,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 1.126,
      "growth": 4.5,
      "perCapita": 10138.1,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 1.176,
      "growth": 3.4,
      "perCapita": 10572.7,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 1.236,
      "growth": 3,
      "perCapita": 11098.2,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.295,
      "growth": 2.7,
      "perCapita": 11612.9,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 1.356,
      "growth": 2.7,
      "perCapita": 12150.5,
      "popChangePct": 0.9
    },
    {
      "year": 2029,
      "gdp": 1.42,
      "growth": 2.7,
      "perCapita": 12712.9,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 1.488,
      "growth": 2.7,
      "perCapita": 13301.3,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 1.558,
      "growth": 2.7,
      "perCapita": 13917.0,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.182,
      "perCapitaPPP": 1845.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.208,
      "perCapitaPPP": 2095.1,
      "perCapitaPPPChangePct": 13.52,
      "popChangePct": 1.02
    },
    {
      "year": 1982,
      "gdpPPP": 0.231,
      "perCapitaPPP": 2305.4,
      "perCapitaPPPChangePct": 10.04,
      "popChangePct": 1.01
    },
    {
      "year": 1983,
      "gdpPPP": 0.245,
      "perCapitaPPP": 2429.0,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 1.0
    },
    {
      "year": 1984,
      "gdpPPP": 0.271,
      "perCapitaPPP": 2662.9,
      "perCapitaPPPChangePct": 9.63,
      "popChangePct": 0.99
    },
    {
      "year": 1985,
      "gdpPPP": 0.296,
      "perCapitaPPP": 2896.3,
      "perCapitaPPPChangePct": 8.77,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.319,
      "perCapitaPPP": 3098.7,
      "perCapitaPPPChangePct": 6.99,
      "popChangePct": 0.98
    },
    {
      "year": 1987,
      "gdpPPP": 0.329,
      "perCapitaPPP": 3168.4,
      "perCapitaPPPChangePct": 2.25,
      "popChangePct": 0.97
    },
    {
      "year": 1988,
      "gdpPPP": 0.388,
      "perCapitaPPP": 3719.3,
      "perCapitaPPPChangePct": 17.39,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdpPPP": 0.409,
      "perCapitaPPP": 3899.4,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 0.96
    },
    {
      "year": 1990,
      "gdpPPP": 0.442,
      "perCapitaPPP": 4180.9,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 0.95
    },
    {
      "year": 1991,
      "gdpPPP": 0.462,
      "perCapitaPPP": 4337.8,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdpPPP": 0.503,
      "perCapitaPPP": 4713.7,
      "perCapitaPPPChangePct": 8.67,
      "popChangePct": 0.94
    },
    {
      "year": 1993,
      "gdpPPP": 0.536,
      "perCapitaPPP": 5024.3,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 0.0
    },
    {
      "year": 1994,
      "gdpPPP": 0.541,
      "perCapitaPPP": 5061.2,
      "perCapitaPPPChangePct": 0.74,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdpPPP": 0.595,
      "perCapitaPPP": 5561.7,
      "perCapitaPPPChangePct": 9.89,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 0.614,
      "perCapitaPPP": 5729.3,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdpPPP": 0.646,
      "perCapitaPPP": 6024.9,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdpPPP": 0.68,
      "perCapitaPPP": 6333.9,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdpPPP": 0.709,
      "perCapitaPPP": 6589.4,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.93
    },
    {
      "year": 2000,
      "gdpPPP": 0.737,
      "perCapitaPPP": 6840.7,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdpPPP": 0.765,
      "perCapitaPPP": 7098.3,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 0.815,
      "perCapitaPPP": 7551.1,
      "perCapitaPPPChangePct": 6.38,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 0.882,
      "perCapitaPPP": 8162.5,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.94,
      "perCapitaPPP": 8686.4,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.991,
      "perCapitaPPP": 9151.6,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 1.089,
      "perCapitaPPP": 10039.3,
      "perCapitaPPPChangePct": 9.7,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 1.153,
      "perCapitaPPP": 10617.5,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 0.93
    },
    {
      "year": 2008,
      "gdpPPP": 1.18,
      "perCapitaPPP": 10856.3,
      "perCapitaPPPChangePct": 2.25,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 1.173,
      "perCapitaPPP": 10777.3,
      "perCapitaPPPChangePct": -0.73,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 1.136,
      "perCapitaPPP": 10430.1,
      "perCapitaPPPChangePct": -3.22,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 1.153,
      "perCapitaPPP": 10568.3,
      "perCapitaPPPChangePct": 1.32,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 1.186,
      "perCapitaPPP": 10866.0,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 1.236,
      "perCapitaPPP": 11297.4,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 1.272,
      "perCapitaPPP": 11599.5,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 0.92
    },
    {
      "year": 2015,
      "gdpPPP": 1.32,
      "perCapitaPPP": 12006.0,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 1.388,
      "perCapitaPPP": 12594.5,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 1.434,
      "perCapitaPPP": 12989.2,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 1.541,
      "perCapitaPPP": 13946.4,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": 0.91
    },
    {
      "year": 2019,
      "gdpPPP": 1.598,
      "perCapitaPPP": 14446.3,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 1.586,
      "perCapitaPPP": 14329.7,
      "perCapitaPPPChangePct": -0.81,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 1.665,
      "perCapitaPPP": 15031.6,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 1.873,
      "perCapitaPPP": 16891.6,
      "perCapitaPPPChangePct": 12.37,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 2.03,
      "perCapitaPPP": 18287.1,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 2.174,
      "perCapitaPPP": 19563.1,
      "perCapitaPPPChangePct": 6.98,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 2.311,
      "perCapitaPPP": 20777.5,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 2.449,
      "perCapitaPPP": 21990.0,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2.57,
      "perCapitaPPP": 23054.5,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 2.683,
      "perCapitaPPP": 24039.4,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 0.9
    },
    {
      "year": 2029,
      "gdpPPP": 2.804,
      "perCapitaPPP": 25100.2,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 2.933,
      "perCapitaPPP": 26223.0,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 3.066,
      "perCapitaPPP": 27387.4,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function StVincentGrenadinesGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
