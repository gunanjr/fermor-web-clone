import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Slovenia",
  "slug": "slovenia",
  "iso3": "SVN",
  "region": "Europe",
  "rank2026": 87,
  "flagEmoji": "🇸🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Tanzania",
      "slug": "tanzania",
      "rank": 86
    },
    {
      "name": "Myanmar",
      "slug": "myanmar",
      "rank": 88
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 19.285,
      "growth": null,
      "perCapita": 9646.2,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 16.638,
      "growth": 2.8,
      "perCapita": 8363.9,
      "popChangePct": -0.5
    },
    {
      "year": 1994,
      "gdp": 16.857,
      "growth": 5.3,
      "perCapita": 8474.3,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdp": 21.399,
      "growth": 4.1,
      "perCapita": 10756.1,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 21.48,
      "growth": 3.3,
      "perCapita": 10792.5,
      "popChangePct": 0.05
    },
    {
      "year": 1997,
      "gdp": 20.769,
      "growth": 5.2,
      "perCapita": 10452.3,
      "popChangePct": -0.15
    },
    {
      "year": 1998,
      "gdp": 22.08,
      "growth": 3.1,
      "perCapita": 11124.0,
      "popChangePct": -0.1
    },
    {
      "year": 1999,
      "gdp": 22.668,
      "growth": 5.3,
      "perCapita": 11457.9,
      "popChangePct": -0.35
    },
    {
      "year": 2000,
      "gdp": 20.262,
      "growth": 3.5,
      "perCapita": 10193.5,
      "popChangePct": 0.51
    },
    {
      "year": 2001,
      "gdp": 20.693,
      "growth": 2.8,
      "perCapita": 10398.0,
      "popChangePct": 0.1
    },
    {
      "year": 2002,
      "gdp": 23.263,
      "growth": 3.3,
      "perCapita": 11666.4,
      "popChangePct": 0.2
    },
    {
      "year": 2003,
      "gdp": 29.399,
      "growth": 3.2,
      "perCapita": 14736.0,
      "popChangePct": 0.05
    },
    {
      "year": 2004,
      "gdp": 34.19,
      "growth": 4.5,
      "perCapita": 17125.4,
      "popChangePct": 0.05
    },
    {
      "year": 2005,
      "gdp": 36.002,
      "growth": 3.9,
      "perCapita": 18022.6,
      "popChangePct": 0.1
    },
    {
      "year": 2006,
      "gdp": 39.293,
      "growth": 5.9,
      "perCapita": 19613.6,
      "popChangePct": 0.25
    },
    {
      "year": 2007,
      "gdp": 47.886,
      "growth": 7.1,
      "perCapita": 23819.3,
      "popChangePct": 0.35
    },
    {
      "year": 2008,
      "gdp": 55.503,
      "growth": 3.4,
      "perCapita": 27609.8,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 49.921,
      "growth": -7.6,
      "perCapita": 24563.1,
      "popChangePct": 1.09
    },
    {
      "year": 2010,
      "gdp": 47.832,
      "growth": 1.1,
      "perCapita": 23367.3,
      "popChangePct": 0.74
    },
    {
      "year": 2011,
      "gdp": 51.19,
      "growth": 0.7,
      "perCapita": 24968.4,
      "popChangePct": 0.15
    },
    {
      "year": 2012,
      "gdp": 46.196,
      "growth": -2.9,
      "perCapita": 22474.5,
      "popChangePct": 0.24
    },
    {
      "year": 2013,
      "gdp": 47.868,
      "growth": -0.8,
      "perCapita": 23250.1,
      "popChangePct": 0.19
    },
    {
      "year": 2014,
      "gdp": 49.527,
      "growth": 2.8,
      "perCapita": 24029.7,
      "popChangePct": 0.1
    },
    {
      "year": 2015,
      "gdp": 42.714,
      "growth": 2.4,
      "perCapita": 20706.0,
      "popChangePct": 0.1
    },
    {
      "year": 2016,
      "gdp": 44.279,
      "growth": 3,
      "perCapita": 21450.8,
      "popChangePct": 0.05
    },
    {
      "year": 2017,
      "gdp": 48.136,
      "growth": 5.2,
      "perCapita": 23300.4,
      "popChangePct": 0.1
    },
    {
      "year": 2018,
      "gdp": 53.713,
      "growth": 4.4,
      "perCapita": 25987.7,
      "popChangePct": 0.05
    },
    {
      "year": 2019,
      "gdp": 53.916,
      "growth": 3.5,
      "perCapita": 25909.8,
      "popChangePct": 0.68
    },
    {
      "year": 2020,
      "gdp": 53.342,
      "growth": -4.1,
      "perCapita": 25451.1,
      "popChangePct": 0.72
    },
    {
      "year": 2021,
      "gdp": 61.582,
      "growth": 8.4,
      "perCapita": 29199.8,
      "popChangePct": 0.62
    },
    {
      "year": 2022,
      "gdp": 59.946,
      "growth": 2.7,
      "perCapita": 28448.5,
      "popChangePct": -0.09
    },
    {
      "year": 2023,
      "gdp": 69.275,
      "growth": 2.4,
      "perCapita": 32723.7,
      "popChangePct": 0.47
    },
    {
      "year": 2024,
      "gdp": 72.95,
      "growth": 1.7,
      "perCapita": 34346.4,
      "popChangePct": 0.33
    },
    {
      "year": 2025,
      "gdp": 79.603,
      "growth": 1.1,
      "perCapita": 37357.4,
      "popChangePct": 0.33
    },
    {
      "year": 2026,
      "gdp": 86.732,
      "growth": 2,
      "perCapita": 40630.1,
      "popChangePct": 0.19
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 90.18,
      "growth": 2.1,
      "perCapita": 42191.9,
      "popChangePct": 0.09
    },
    {
      "year": 2028,
      "gdp": 94.09,
      "growth": 2.2,
      "perCapita": 43989.3,
      "popChangePct": 0.09
    },
    {
      "year": 2029,
      "gdp": 98.207,
      "growth": 2.1,
      "perCapita": 45901.6,
      "popChangePct": 0.05
    },
    {
      "year": 2030,
      "gdp": 102.467,
      "growth": 2.1,
      "perCapita": 47882.0,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 106.842,
      "growth": 2.1,
      "perCapita": 49917.6,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 23.663,
      "perCapitaPPP": 11836.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 24.902,
      "perCapitaPPP": 12518.4,
      "perCapitaPPPChangePct": 5.77,
      "popChangePct": -0.5
    },
    {
      "year": 1994,
      "gdpPPP": 26.781,
      "perCapitaPPP": 13463.3,
      "perCapitaPPPChangePct": 7.55,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdpPPP": 28.464,
      "perCapitaPPP": 14307.3,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 29.942,
      "perCapitaPPP": 15044.2,
      "perCapitaPPPChangePct": 5.15,
      "popChangePct": 0.05
    },
    {
      "year": 1997,
      "gdpPPP": 32.033,
      "perCapitaPPP": 16121.5,
      "perCapitaPPPChangePct": 7.16,
      "popChangePct": -0.15
    },
    {
      "year": 1998,
      "gdpPPP": 33.386,
      "perCapitaPPP": 16819.6,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": -0.1
    },
    {
      "year": 1999,
      "gdpPPP": 35.642,
      "perCapitaPPP": 18016.0,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": -0.35
    },
    {
      "year": 2000,
      "gdpPPP": 37.724,
      "perCapitaPPP": 18978.3,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 0.51
    },
    {
      "year": 2001,
      "gdpPPP": 39.665,
      "perCapitaPPP": 19931.0,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 0.1
    },
    {
      "year": 2002,
      "gdpPPP": 41.603,
      "perCapitaPPP": 20864.0,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 0.2
    },
    {
      "year": 2003,
      "gdpPPP": 43.78,
      "perCapitaPPP": 21944.5,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 0.05
    },
    {
      "year": 2004,
      "gdpPPP": 47.001,
      "perCapitaPPP": 23542.5,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 0.05
    },
    {
      "year": 2005,
      "gdpPPP": 50.343,
      "perCapitaPPP": 25202.0,
      "perCapitaPPPChangePct": 7.05,
      "popChangePct": 0.1
    },
    {
      "year": 2006,
      "gdpPPP": 54.962,
      "perCapitaPPP": 27435.1,
      "perCapitaPPPChangePct": 8.86,
      "popChangePct": 0.25
    },
    {
      "year": 2007,
      "gdpPPP": 60.482,
      "perCapitaPPP": 30084.7,
      "perCapitaPPPChangePct": 9.66,
      "popChangePct": 0.35
    },
    {
      "year": 2008,
      "gdpPPP": 63.725,
      "perCapitaPPP": 31699.9,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 59.252,
      "perCapitaPPP": 29154.0,
      "perCapitaPPPChangePct": -8.03,
      "popChangePct": 1.09
    },
    {
      "year": 2010,
      "gdpPPP": 60.639,
      "perCapitaPPP": 29623.5,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 0.74
    },
    {
      "year": 2011,
      "gdpPPP": 62.295,
      "perCapitaPPP": 30385.2,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 0.15
    },
    {
      "year": 2012,
      "gdpPPP": 61.605,
      "perCapitaPPP": 29971.0,
      "perCapitaPPPChangePct": -1.36,
      "popChangePct": 0.24
    },
    {
      "year": 2013,
      "gdpPPP": 62.138,
      "perCapitaPPP": 30181.2,
      "perCapitaPPPChangePct": 0.7,
      "popChangePct": 0.19
    },
    {
      "year": 2014,
      "gdpPPP": 64.966,
      "perCapitaPPP": 31520.4,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.1
    },
    {
      "year": 2015,
      "gdpPPP": 67.139,
      "perCapitaPPP": 32546.2,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 0.1
    },
    {
      "year": 2016,
      "gdpPPP": 69.833,
      "perCapitaPPP": 33830.9,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 0.05
    },
    {
      "year": 2017,
      "gdpPPP": 74.762,
      "perCapitaPPP": 36188.7,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 0.1
    },
    {
      "year": 2018,
      "gdpPPP": 80.094,
      "perCapitaPPP": 38751.3,
      "perCapitaPPPChangePct": 7.08,
      "popChangePct": 0.05
    },
    {
      "year": 2019,
      "gdpPPP": 88.492,
      "perCapitaPPP": 42525.5,
      "perCapitaPPPChangePct": 9.74,
      "popChangePct": 0.68
    },
    {
      "year": 2020,
      "gdpPPP": 87.812,
      "perCapitaPPP": 41897.9,
      "perCapitaPPPChangePct": -1.48,
      "popChangePct": 0.72
    },
    {
      "year": 2021,
      "gdpPPP": 97.568,
      "perCapitaPPP": 46263.2,
      "perCapitaPPPChangePct": 10.42,
      "popChangePct": 0.62
    },
    {
      "year": 2022,
      "gdpPPP": 107.297,
      "perCapitaPPP": 50919.5,
      "perCapitaPPPChangePct": 10.06,
      "popChangePct": -0.09
    },
    {
      "year": 2023,
      "gdpPPP": 113.91,
      "perCapitaPPP": 53808.1,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 0.47
    },
    {
      "year": 2024,
      "gdpPPP": 118.759,
      "perCapitaPPP": 55914.4,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 0.33
    },
    {
      "year": 2025,
      "gdpPPP": 123.423,
      "perCapitaPPP": 57921.8,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 0.33
    },
    {
      "year": 2026,
      "gdpPPP": 129.498,
      "perCapitaPPP": 60663.9,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 0.19
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 135.121,
      "perCapitaPPP": 63218.2,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 0.09
    },
    {
      "year": 2028,
      "gdpPPP": 140.36,
      "perCapitaPPP": 65621.6,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 0.09
    },
    {
      "year": 2029,
      "gdpPPP": 145.856,
      "perCapitaPPP": 68172.5,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 0.05
    },
    {
      "year": 2030,
      "gdpPPP": 151.655,
      "perCapitaPPP": 70867.2,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 157.635,
      "perCapitaPPP": 73648.3,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SloveniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
