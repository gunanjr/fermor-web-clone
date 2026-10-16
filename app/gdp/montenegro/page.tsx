import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Montenegro",
  "slug": "montenegro",
  "iso3": "MNE",
  "region": "Europe",
  "rank2026": 155,
  "flagEmoji": "🇲🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Togo",
      "slug": "togo",
      "rank": 154
    },
    {
      "name": "Liechtenstein",
      "slug": "liechtenstein",
      "rank": 158
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 0.964,
      "growth": null,
      "perCapita": 1594.3,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 1.148,
      "growth": 1.1,
      "perCapita": 1890.8,
      "popChangePct": 0.33
    },
    {
      "year": 2002,
      "gdp": 1.267,
      "growth": 1.9,
      "perCapita": 2077.7,
      "popChangePct": 0.49
    },
    {
      "year": 2003,
      "gdp": 1.679,
      "growth": 2.5,
      "perCapita": 2741.7,
      "popChangePct": 0.33
    },
    {
      "year": 2004,
      "gdp": 2.07,
      "growth": 4.4,
      "perCapita": 3374.7,
      "popChangePct": 0.16
    },
    {
      "year": 2005,
      "gdp": 2.257,
      "growth": 4.2,
      "perCapita": 3674.4,
      "popChangePct": 0.16
    },
    {
      "year": 2006,
      "gdp": 2.72,
      "growth": 8.6,
      "perCapita": 4422.8,
      "popChangePct": 0.16
    },
    {
      "year": 2007,
      "gdp": 3.683,
      "growth": 7.1,
      "perCapita": 5980.9,
      "popChangePct": 0.16
    },
    {
      "year": 2008,
      "gdp": 4.559,
      "growth": 6.9,
      "perCapita": 7389.2,
      "popChangePct": 0.16
    },
    {
      "year": 2009,
      "gdp": 4.155,
      "growth": -6,
      "perCapita": 6719.4,
      "popChangePct": 0.16
    },
    {
      "year": 2010,
      "gdp": 4.14,
      "growth": 2.8,
      "perCapita": 6684.1,
      "popChangePct": 0.16
    },
    {
      "year": 2011,
      "gdp": 4.506,
      "growth": 3.4,
      "perCapita": 7264.2,
      "popChangePct": 0.16
    },
    {
      "year": 2012,
      "gdp": 4.074,
      "growth": -2.5,
      "perCapita": 6556.6,
      "popChangePct": 0.16
    },
    {
      "year": 2013,
      "gdp": 4.422,
      "growth": 3.4,
      "perCapita": 7102.9,
      "popChangePct": 0.32
    },
    {
      "year": 2014,
      "gdp": 4.581,
      "growth": 2.4,
      "perCapita": 7344.1,
      "popChangePct": 0.16
    },
    {
      "year": 2015,
      "gdp": 4.011,
      "growth": 2.5,
      "perCapita": 6421.6,
      "popChangePct": 0.16
    },
    {
      "year": 2016,
      "gdp": 4.356,
      "growth": 3.4,
      "perCapita": 6966.1,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 4.802,
      "growth": 3.2,
      "perCapita": 7671.6,
      "popChangePct": 0.16
    },
    {
      "year": 2018,
      "gdp": 5.436,
      "growth": 4.7,
      "perCapita": 8677.5,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 5.484,
      "growth": 4.4,
      "perCapita": 8750.2,
      "popChangePct": 0.16
    },
    {
      "year": 2020,
      "gdp": 4.73,
      "growth": -15,
      "perCapita": 7549.4,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 5.827,
      "growth": 13,
      "perCapita": 9322.1,
      "popChangePct": -0.32
    },
    {
      "year": 2022,
      "gdp": 6.265,
      "growth": 7.7,
      "perCapita": 10046.1,
      "popChangePct": -0.16
    },
    {
      "year": 2023,
      "gdp": 7.646,
      "growth": 6.5,
      "perCapita": 12261.7,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 8.272,
      "growth": 3.2,
      "perCapita": 13259.5,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 9.228,
      "growth": 2.7,
      "perCapita": 14784.2,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 10.227,
      "growth": 2.8,
      "perCapita": 16377.1,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 10.808,
      "growth": 2.7,
      "perCapita": 17299.1,
      "popChangePct": 0.16
    },
    {
      "year": 2028,
      "gdp": 11.382,
      "growth": 3.2,
      "perCapita": 18208.2,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 11.994,
      "growth": 3,
      "perCapita": 19178.4,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 12.62,
      "growth": 3,
      "perCapita": 20168.6,
      "popChangePct": 0.16
    },
    {
      "year": 2031,
      "gdp": 13.281,
      "growth": 3,
      "perCapita": 21214.0,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 5.466,
      "perCapitaPPP": 9035.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 5.65,
      "perCapitaPPP": 9302.6,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": 0.33
    },
    {
      "year": 2002,
      "gdpPPP": 5.847,
      "perCapitaPPP": 9588.2,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 0.49
    },
    {
      "year": 2003,
      "gdpPPP": 6.112,
      "perCapitaPPP": 9982.0,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 0.33
    },
    {
      "year": 2004,
      "gdpPPP": 6.552,
      "perCapitaPPP": 10682.5,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": 0.16
    },
    {
      "year": 2005,
      "gdpPPP": 7.041,
      "perCapitaPPP": 11463.2,
      "perCapitaPPPChangePct": 7.31,
      "popChangePct": 0.16
    },
    {
      "year": 2006,
      "gdpPPP": 7.883,
      "perCapitaPPP": 12817.0,
      "perCapitaPPPChangePct": 11.81,
      "popChangePct": 0.16
    },
    {
      "year": 2007,
      "gdpPPP": 8.671,
      "perCapitaPPP": 14081.2,
      "perCapitaPPPChangePct": 9.86,
      "popChangePct": 0.16
    },
    {
      "year": 2008,
      "gdpPPP": 9.448,
      "perCapitaPPP": 15313.7,
      "perCapitaPPPChangePct": 8.75,
      "popChangePct": 0.16
    },
    {
      "year": 2009,
      "gdpPPP": 8.936,
      "perCapitaPPP": 14452.6,
      "perCapitaPPPChangePct": -5.62,
      "popChangePct": 0.16
    },
    {
      "year": 2010,
      "gdpPPP": 9.298,
      "perCapitaPPP": 15010.3,
      "perCapitaPPPChangePct": 3.86,
      "popChangePct": 0.16
    },
    {
      "year": 2011,
      "gdpPPP": 9.812,
      "perCapitaPPP": 15817.5,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.16
    },
    {
      "year": 2012,
      "gdpPPP": 9.746,
      "perCapitaPPP": 15684.1,
      "perCapitaPPPChangePct": -0.84,
      "popChangePct": 0.16
    },
    {
      "year": 2013,
      "gdpPPP": 10.248,
      "perCapitaPPP": 16460.2,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 0.32
    },
    {
      "year": 2014,
      "gdpPPP": 10.674,
      "perCapitaPPP": 17112.1,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 0.16
    },
    {
      "year": 2015,
      "gdpPPP": 11.044,
      "perCapitaPPP": 17680.9,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 0.16
    },
    {
      "year": 2016,
      "gdpPPP": 11.533,
      "perCapitaPPP": 18442.1,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 12.117,
      "perCapitaPPP": 19356.7,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": 0.16
    },
    {
      "year": 2018,
      "gdpPPP": 13.208,
      "perCapitaPPP": 21083.6,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 14.857,
      "perCapitaPPP": 23705.4,
      "perCapitaPPPChangePct": 12.44,
      "popChangePct": 0.16
    },
    {
      "year": 2020,
      "gdpPPP": 12.923,
      "perCapitaPPP": 20624.8,
      "perCapitaPPPChangePct": -13.0,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 15.08,
      "perCapitaPPP": 24125.8,
      "perCapitaPPPChangePct": 16.97,
      "popChangePct": -0.32
    },
    {
      "year": 2022,
      "gdpPPP": 17.403,
      "perCapitaPPP": 27907.1,
      "perCapitaPPPChangePct": 15.67,
      "popChangePct": -0.16
    },
    {
      "year": 2023,
      "gdpPPP": 19.216,
      "perCapitaPPP": 30817.5,
      "perCapitaPPPChangePct": 10.43,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 20.316,
      "perCapitaPPP": 32565.6,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 21.456,
      "perCapitaPPP": 34376.4,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 22.689,
      "perCapitaPPP": 36333.2,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 23.813,
      "perCapitaPPP": 38114.5,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 0.16
    },
    {
      "year": 2028,
      "gdpPPP": 24.978,
      "perCapitaPPP": 39959.8,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 26.187,
      "perCapitaPPP": 41871.6,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 27.465,
      "perCapitaPPP": 43894.0,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 0.16
    },
    {
      "year": 2031,
      "gdpPPP": 28.8,
      "perCapitaPPP": 46004.0,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MontenegroGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
