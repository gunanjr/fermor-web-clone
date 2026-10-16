import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Kyrgyzstan",
  "slug": "kyrgyzstan",
  "iso3": "KGZ",
  "region": "Asia",
  "rank2026": 130,
  "flagEmoji": "🇰🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Nicaragua",
      "slug": "nicaragua",
      "rank": 129
    },
    {
      "name": "Gabon",
      "slug": "gabon",
      "rank": 131
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.917,
      "growth": null,
      "perCapita": 208.0,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 0.665,
      "growth": -13,
      "perCapita": 148.2,
      "popChangePct": 1.68
    },
    {
      "year": 1994,
      "gdp": 1.108,
      "growth": -19.8,
      "perCapita": 245.9,
      "popChangePct": 0.45
    },
    {
      "year": 1995,
      "gdp": 1.493,
      "growth": -5.4,
      "perCapita": 329.9,
      "popChangePct": 0.44
    },
    {
      "year": 1996,
      "gdp": 1.822,
      "growth": 7.1,
      "perCapita": 396.5,
      "popChangePct": 1.57
    },
    {
      "year": 1997,
      "gdp": 1.767,
      "growth": 9.9,
      "perCapita": 379.1,
      "popChangePct": 1.41
    },
    {
      "year": 1998,
      "gdp": 1.63,
      "growth": 2.1,
      "perCapita": 344.4,
      "popChangePct": 1.52
    },
    {
      "year": 1999,
      "gdp": 1.242,
      "growth": 3.7,
      "perCapita": 258.5,
      "popChangePct": 1.56
    },
    {
      "year": 2000,
      "gdp": 1.368,
      "growth": 5.4,
      "perCapita": 280.6,
      "popChangePct": 1.44
    },
    {
      "year": 2001,
      "gdp": 1.525,
      "growth": 5.3,
      "perCapita": 309.9,
      "popChangePct": 0.96
    },
    {
      "year": 2002,
      "gdp": 1.606,
      "growth": 0,
      "perCapita": 323.3,
      "popChangePct": 0.93
    },
    {
      "year": 2003,
      "gdp": 1.92,
      "growth": 7,
      "perCapita": 382.9,
      "popChangePct": 0.91
    },
    {
      "year": 2004,
      "gdp": 2.214,
      "growth": 7,
      "perCapita": 436.5,
      "popChangePct": 1.2
    },
    {
      "year": 2005,
      "gdp": 2.459,
      "growth": -0.2,
      "perCapita": 478.8,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdp": 2.837,
      "growth": 3.1,
      "perCapita": 546.6,
      "popChangePct": 1.03
    },
    {
      "year": 2007,
      "gdp": 3.807,
      "growth": 8.5,
      "perCapita": 725.5,
      "popChangePct": 1.14
    },
    {
      "year": 2008,
      "gdp": 5.139,
      "growth": 7.6,
      "perCapita": 971.7,
      "popChangePct": 0.78
    },
    {
      "year": 2009,
      "gdp": 4.69,
      "growth": 2.9,
      "perCapita": 876.9,
      "popChangePct": 1.12
    },
    {
      "year": 2010,
      "gdp": 4.794,
      "growth": -0.5,
      "perCapita": 884.8,
      "popChangePct": 1.31
    },
    {
      "year": 2011,
      "gdp": 6.198,
      "growth": 6,
      "perCapita": 1131.5,
      "popChangePct": 1.11
    },
    {
      "year": 2012,
      "gdp": 6.604,
      "growth": -0.1,
      "perCapita": 1189.5,
      "popChangePct": 1.35
    },
    {
      "year": 2013,
      "gdp": 7.335,
      "growth": 10.9,
      "perCapita": 1295.2,
      "popChangePct": 2.0
    },
    {
      "year": 2014,
      "gdp": 7.467,
      "growth": 4,
      "perCapita": 1292.6,
      "popChangePct": 2.01
    },
    {
      "year": 2015,
      "gdp": 6.678,
      "growth": 3.9,
      "perCapita": 1132.8,
      "popChangePct": 2.04
    },
    {
      "year": 2016,
      "gdp": 6.813,
      "growth": 4.3,
      "perCapita": 1131.8,
      "popChangePct": 2.1
    },
    {
      "year": 2017,
      "gdp": 7.703,
      "growth": 4.7,
      "perCapita": 1254.5,
      "popChangePct": 2.01
    },
    {
      "year": 2018,
      "gdp": 8.271,
      "growth": 3.5,
      "perCapita": 1322.0,
      "popChangePct": 1.91
    },
    {
      "year": 2019,
      "gdp": 9.372,
      "growth": 4.6,
      "perCapita": 1467.0,
      "popChangePct": 2.11
    },
    {
      "year": 2020,
      "gdp": 8.283,
      "growth": -7.1,
      "perCapita": 1271.0,
      "popChangePct": 2.0
    },
    {
      "year": 2021,
      "gdp": 9.256,
      "growth": 5.5,
      "perCapita": 1390.9,
      "popChangePct": 2.1
    },
    {
      "year": 2022,
      "gdp": 12.269,
      "growth": 9,
      "perCapita": 1805.6,
      "popChangePct": 2.12
    },
    {
      "year": 2023,
      "gdp": 15.187,
      "growth": 9,
      "perCapita": 2191.1,
      "popChangePct": 2.0
    },
    {
      "year": 2024,
      "gdp": 18.175,
      "growth": 11.5,
      "perCapita": 2568.1,
      "popChangePct": 2.11
    },
    {
      "year": 2025,
      "gdp": 21.567,
      "growth": 11.1,
      "perCapita": 2984.3,
      "popChangePct": 2.12
    },
    {
      "year": 2026,
      "gdp": 23.606,
      "growth": 6.1,
      "perCapita": 3202.3,
      "popChangePct": 2.01
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 25.412,
      "growth": 6.1,
      "perCapita": 3375.9,
      "popChangePct": 2.1
    },
    {
      "year": 2028,
      "gdp": 27.228,
      "growth": 5.7,
      "perCapita": 3542.5,
      "popChangePct": 2.11
    },
    {
      "year": 2029,
      "gdp": 29.097,
      "growth": 5.4,
      "perCapita": 3711.2,
      "popChangePct": 2.0
    },
    {
      "year": 2030,
      "gdp": 30.855,
      "growth": 5.3,
      "perCapita": 3854.1,
      "popChangePct": 2.12
    },
    {
      "year": 2031,
      "gdp": 32.491,
      "growth": 5.2,
      "perCapita": 3974.6,
      "popChangePct": 2.11
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 10.982,
      "perCapitaPPP": 2489.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 9.78,
      "perCapitaPPP": 2180.4,
      "perCapitaPPPChangePct": -12.43,
      "popChangePct": 1.68
    },
    {
      "year": 1994,
      "gdpPPP": 8.01,
      "perCapitaPPP": 1778.0,
      "perCapitaPPPChangePct": -18.45,
      "popChangePct": 0.45
    },
    {
      "year": 1995,
      "gdpPPP": 7.735,
      "perCapitaPPP": 1709.3,
      "perCapitaPPPChangePct": -3.86,
      "popChangePct": 0.44
    },
    {
      "year": 1996,
      "gdpPPP": 8.434,
      "perCapitaPPP": 1835.1,
      "perCapitaPPPChangePct": 7.36,
      "popChangePct": 1.57
    },
    {
      "year": 1997,
      "gdpPPP": 9.43,
      "perCapitaPPP": 2023.2,
      "perCapitaPPPChangePct": 10.25,
      "popChangePct": 1.41
    },
    {
      "year": 1998,
      "gdpPPP": 9.739,
      "perCapitaPPP": 2058.1,
      "perCapitaPPPChangePct": 1.72,
      "popChangePct": 1.52
    },
    {
      "year": 1999,
      "gdpPPP": 10.237,
      "perCapitaPPP": 2130.1,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 1.56
    },
    {
      "year": 2000,
      "gdpPPP": 11.039,
      "perCapitaPPP": 2264.6,
      "perCapitaPPPChangePct": 6.32,
      "popChangePct": 1.44
    },
    {
      "year": 2001,
      "gdpPPP": 11.888,
      "perCapitaPPP": 2415.4,
      "perCapitaPPPChangePct": 6.66,
      "popChangePct": 0.96
    },
    {
      "year": 2002,
      "gdpPPP": 12.071,
      "perCapitaPPP": 2429.7,
      "perCapitaPPPChangePct": 0.59,
      "popChangePct": 0.93
    },
    {
      "year": 2003,
      "gdpPPP": 13.175,
      "perCapitaPPP": 2628.0,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 0.91
    },
    {
      "year": 2004,
      "gdpPPP": 14.48,
      "perCapitaPPP": 2854.1,
      "perCapitaPPPChangePct": 8.6,
      "popChangePct": 1.2
    },
    {
      "year": 2005,
      "gdpPPP": 14.908,
      "perCapitaPPP": 2902.5,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 1.24
    },
    {
      "year": 2006,
      "gdpPPP": 15.844,
      "perCapitaPPP": 3053.3,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 1.03
    },
    {
      "year": 2007,
      "gdpPPP": 17.664,
      "perCapitaPPP": 3366.1,
      "perCapitaPPPChangePct": 10.24,
      "popChangePct": 1.14
    },
    {
      "year": 2008,
      "gdpPPP": 19.366,
      "perCapitaPPP": 3661.5,
      "perCapitaPPPChangePct": 8.78,
      "popChangePct": 0.78
    },
    {
      "year": 2009,
      "gdpPPP": 20.048,
      "perCapitaPPP": 3748.5,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 1.12
    },
    {
      "year": 2010,
      "gdpPPP": 20.196,
      "perCapitaPPP": 3727.4,
      "perCapitaPPPChangePct": -0.56,
      "popChangePct": 1.31
    },
    {
      "year": 2011,
      "gdpPPP": 21.84,
      "perCapitaPPP": 3987.2,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 1.11
    },
    {
      "year": 2012,
      "gdpPPP": 22.227,
      "perCapitaPPP": 4003.6,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 1.35
    },
    {
      "year": 2013,
      "gdpPPP": 25.073,
      "perCapitaPPP": 4427.5,
      "perCapitaPPPChangePct": 10.59,
      "popChangePct": 2.0
    },
    {
      "year": 2014,
      "gdpPPP": 26.537,
      "perCapitaPPP": 4593.8,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": 2.01
    },
    {
      "year": 2015,
      "gdpPPP": 27.821,
      "perCapitaPPP": 4719.4,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 2.04
    },
    {
      "year": 2016,
      "gdpPPP": 29.303,
      "perCapitaPPP": 4868.0,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 2.1
    },
    {
      "year": 2017,
      "gdpPPP": 31.242,
      "perCapitaPPP": 5088.0,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 2.01
    },
    {
      "year": 2018,
      "gdpPPP": 30.789,
      "perCapitaPPP": 4921.0,
      "perCapitaPPPChangePct": -3.28,
      "popChangePct": 1.91
    },
    {
      "year": 2019,
      "gdpPPP": 34.956,
      "perCapitaPPP": 5471.5,
      "perCapitaPPPChangePct": 11.19,
      "popChangePct": 2.11
    },
    {
      "year": 2020,
      "gdpPPP": 34.834,
      "perCapitaPPP": 5345.2,
      "perCapitaPPPChangePct": -2.31,
      "popChangePct": 2.0
    },
    {
      "year": 2021,
      "gdpPPP": 39.302,
      "perCapitaPPP": 5906.1,
      "perCapitaPPPChangePct": 10.49,
      "popChangePct": 2.1
    },
    {
      "year": 2022,
      "gdpPPP": 45.872,
      "perCapitaPPP": 6751.0,
      "perCapitaPPPChangePct": 14.31,
      "popChangePct": 2.12
    },
    {
      "year": 2023,
      "gdpPPP": 51.857,
      "perCapitaPPP": 7481.7,
      "perCapitaPPPChangePct": 10.82,
      "popChangePct": 2.0
    },
    {
      "year": 2024,
      "gdpPPP": 59.277,
      "perCapitaPPP": 8375.5,
      "perCapitaPPPChangePct": 11.95,
      "popChangePct": 2.11
    },
    {
      "year": 2025,
      "gdpPPP": 67.723,
      "perCapitaPPP": 9371.0,
      "perCapitaPPPChangePct": 11.89,
      "popChangePct": 2.12
    },
    {
      "year": 2026,
      "gdpPPP": 73.895,
      "perCapitaPPP": 10024.1,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 2.01
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 80.106,
      "perCapitaPPP": 10642.0,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 2.1
    },
    {
      "year": 2028,
      "gdpPPP": 86.039,
      "perCapitaPPP": 11193.9,
      "perCapitaPPPChangePct": 5.19,
      "popChangePct": 2.11
    },
    {
      "year": 2029,
      "gdpPPP": 92.272,
      "perCapitaPPP": 11768.8,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 2.0
    },
    {
      "year": 2030,
      "gdpPPP": 98.939,
      "perCapitaPPP": 12358.4,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 2.12
    },
    {
      "year": 2031,
      "gdpPPP": 105.954,
      "perCapitaPPP": 12961.0,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 2.11
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function KyrgyzstanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
