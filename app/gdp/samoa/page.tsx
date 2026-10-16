import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Samoa",
  "slug": "samoa",
  "iso3": "WSM",
  "region": "Oceania",
  "rank2026": 201,
  "flagEmoji": "🇼🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Vanuatu",
      "slug": "vanuatu",
      "rank": 200
    },
    {
      "name": "St. Vincent & Grenadines",
      "slug": "st-vincent-grenadines",
      "rank": 202
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.127,
      "growth": -6.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.119,
      "growth": -9.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 0.122,
      "growth": -1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdp": 0.113,
      "growth": 0.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdp": 0.111,
      "growth": 2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdp": 0.106,
      "growth": 5.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 0.112,
      "growth": 4.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 0.124,
      "growth": 0.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdp": 0.138,
      "growth": 2.9,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdp": 0.141,
      "growth": 5.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 0.182,
      "growth": -6.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 0.176,
      "growth": -2.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdp": 0.193,
      "growth": 4.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 0.198,
      "growth": 1.7,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdp": 0.158,
      "growth": 6.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1995,
      "gdp": 0.242,
      "growth": 6.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdp": 0.258,
      "growth": 7.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1997,
      "gdp": 0.28,
      "growth": 0.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1998,
      "gdp": 0.286,
      "growth": 1.1,
      "perCapita": 1656.0,
      "popChangePct": null
    },
    {
      "year": 1999,
      "gdp": 0.262,
      "growth": -0.6,
      "perCapita": 1509.1,
      "popChangePct": 0.58
    },
    {
      "year": 2000,
      "gdp": 0.271,
      "growth": 5.1,
      "perCapita": 1550.6,
      "popChangePct": 0.57
    },
    {
      "year": 2001,
      "gdp": 0.273,
      "growth": 7.4,
      "perCapita": 1548.4,
      "popChangePct": 0.57
    },
    {
      "year": 2002,
      "gdp": 0.289,
      "growth": 5.7,
      "perCapita": 1631.0,
      "popChangePct": 0.57
    },
    {
      "year": 2003,
      "gdp": 0.342,
      "growth": 5.2,
      "perCapita": 1921.1,
      "popChangePct": 0.56
    },
    {
      "year": 2004,
      "gdp": 0.418,
      "growth": 3.1,
      "perCapita": 2338.7,
      "popChangePct": 0.56
    },
    {
      "year": 2005,
      "gdp": 0.486,
      "growth": 6.6,
      "perCapita": 2705.4,
      "popChangePct": 0.56
    },
    {
      "year": 2006,
      "gdp": 0.516,
      "growth": 2.1,
      "perCapita": 2860.2,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.568,
      "growth": 0.5,
      "perCapita": 3128.1,
      "popChangePct": 1.11
    },
    {
      "year": 2008,
      "gdp": 0.684,
      "growth": 3.6,
      "perCapita": 3738.0,
      "popChangePct": 0.55
    },
    {
      "year": 2009,
      "gdp": 0.618,
      "growth": -0.5,
      "perCapita": 3350.0,
      "popChangePct": 0.55
    },
    {
      "year": 2010,
      "gdp": 0.68,
      "growth": 2.5,
      "perCapita": 3659.3,
      "popChangePct": 1.09
    },
    {
      "year": 2011,
      "gdp": 0.744,
      "growth": 3.8,
      "perCapita": 3974.1,
      "popChangePct": 0.54
    },
    {
      "year": 2012,
      "gdp": 0.773,
      "growth": -3.7,
      "perCapita": 4093.5,
      "popChangePct": 1.07
    },
    {
      "year": 2013,
      "gdp": 0.798,
      "growth": 0.1,
      "perCapita": 4187.5,
      "popChangePct": 1.06
    },
    {
      "year": 2014,
      "gdp": 0.797,
      "growth": 0.7,
      "perCapita": 4146.5,
      "popChangePct": 0.52
    },
    {
      "year": 2015,
      "gdp": 0.824,
      "growth": 3.9,
      "perCapita": 4253.3,
      "popChangePct": 1.04
    },
    {
      "year": 2016,
      "gdp": 0.844,
      "growth": 8,
      "perCapita": 4319.6,
      "popChangePct": 0.52
    },
    {
      "year": 2017,
      "gdp": 0.885,
      "growth": 1.4,
      "perCapita": 4490.9,
      "popChangePct": 1.03
    },
    {
      "year": 2018,
      "gdp": 0.878,
      "growth": -0.6,
      "perCapita": 4421.8,
      "popChangePct": 1.02
    },
    {
      "year": 2019,
      "gdp": 0.913,
      "growth": 4.5,
      "perCapita": 4558.1,
      "popChangePct": 0.5
    },
    {
      "year": 2020,
      "gdp": 0.869,
      "growth": -3.1,
      "perCapita": 4303.0,
      "popChangePct": 1.0
    },
    {
      "year": 2021,
      "gdp": 0.86,
      "growth": -5.1,
      "perCapita": 4204.4,
      "popChangePct": 0.99
    },
    {
      "year": 2022,
      "gdp": 0.89,
      "growth": 2.3,
      "perCapita": 4302.9,
      "popChangePct": 1.47
    },
    {
      "year": 2023,
      "gdp": 1.045,
      "growth": 15.2,
      "perCapita": 5008.5,
      "popChangePct": 0.97
    },
    {
      "year": 2024,
      "gdp": 1.176,
      "growth": 4.8,
      "perCapita": 5580.9,
      "popChangePct": 0.96
    },
    {
      "year": 2025,
      "gdp": 1.288,
      "growth": 4.2,
      "perCapita": 6075.4,
      "popChangePct": 0.47
    },
    {
      "year": 2026,
      "gdp": 1.376,
      "growth": 3.2,
      "perCapita": 6454.7,
      "popChangePct": 0.47
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.453,
      "growth": 2.8,
      "perCapita": 6777.1,
      "popChangePct": 0.47
    },
    {
      "year": 2028,
      "gdp": 1.521,
      "growth": 2.5,
      "perCapita": 7054.9,
      "popChangePct": 0.93
    },
    {
      "year": 2029,
      "gdp": 1.603,
      "growth": 2.2,
      "perCapita": 7390.6,
      "popChangePct": 0.46
    },
    {
      "year": 2030,
      "gdp": 1.676,
      "growth": 2.1,
      "perCapita": 7675.7,
      "popChangePct": 0.46
    },
    {
      "year": 2031,
      "gdp": 1.75,
      "growth": 2,
      "perCapita": 7966.0,
      "popChangePct": 0.92
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.195,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.194,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 0.204,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdpPPP": 0.213,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdpPPP": 0.225,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdpPPP": 0.245,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 0.262,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdpPPP": 0.27,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdpPPP": 0.288,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdpPPP": 0.316,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdpPPP": 0.307,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 0.31,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdpPPP": 0.33,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 0.343,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdpPPP": 0.373,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1995,
      "gdpPPP": 0.406,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdpPPP": 0.443,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1997,
      "gdpPPP": 0.454,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1998,
      "gdpPPP": 0.465,
      "perCapitaPPP": 2687.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1999,
      "gdpPPP": 0.468,
      "perCapitaPPP": 2696.5,
      "perCapitaPPPChangePct": 0.32,
      "popChangePct": 0.58
    },
    {
      "year": 2000,
      "gdpPPP": 0.503,
      "perCapitaPPP": 2881.2,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": 0.57
    },
    {
      "year": 2001,
      "gdpPPP": 0.552,
      "perCapitaPPP": 3131.5,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 0.57
    },
    {
      "year": 2002,
      "gdpPPP": 0.593,
      "perCapitaPPP": 3344.6,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 0.57
    },
    {
      "year": 2003,
      "gdpPPP": 0.636,
      "perCapitaPPP": 3572.2,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 0.56
    },
    {
      "year": 2004,
      "gdpPPP": 0.673,
      "perCapitaPPP": 3764.4,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 0.56
    },
    {
      "year": 2005,
      "gdpPPP": 0.74,
      "perCapitaPPP": 4121.7,
      "perCapitaPPPChangePct": 9.49,
      "popChangePct": 0.56
    },
    {
      "year": 2006,
      "gdpPPP": 0.78,
      "perCapitaPPP": 4325.2,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.805,
      "perCapitaPPP": 4429.2,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 1.11
    },
    {
      "year": 2008,
      "gdpPPP": 0.849,
      "perCapitaPPP": 4638.9,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 0.55
    },
    {
      "year": 2009,
      "gdpPPP": 0.85,
      "perCapitaPPP": 4606.8,
      "perCapitaPPPChangePct": -0.69,
      "popChangePct": 0.55
    },
    {
      "year": 2010,
      "gdpPPP": 0.882,
      "perCapitaPPP": 4744.5,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 1.09
    },
    {
      "year": 2011,
      "gdpPPP": 0.935,
      "perCapitaPPP": 4992.8,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 0.54
    },
    {
      "year": 2012,
      "gdpPPP": 0.917,
      "perCapitaPPP": 4853.7,
      "perCapitaPPPChangePct": -2.79,
      "popChangePct": 1.07
    },
    {
      "year": 2013,
      "gdpPPP": 0.933,
      "perCapitaPPP": 4899.3,
      "perCapitaPPPChangePct": 0.94,
      "popChangePct": 1.06
    },
    {
      "year": 2014,
      "gdpPPP": 0.956,
      "perCapitaPPP": 4974.9,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 0.52
    },
    {
      "year": 2015,
      "gdpPPP": 1.002,
      "perCapitaPPP": 5170.5,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 1.04
    },
    {
      "year": 2016,
      "gdpPPP": 1.092,
      "perCapitaPPP": 5589.9,
      "perCapitaPPPChangePct": 8.11,
      "popChangePct": 0.52
    },
    {
      "year": 2017,
      "gdpPPP": 1.127,
      "perCapitaPPP": 5721.6,
      "perCapitaPPPChangePct": 2.35,
      "popChangePct": 1.03
    },
    {
      "year": 2018,
      "gdpPPP": 1.146,
      "perCapitaPPP": 5769.2,
      "perCapitaPPPChangePct": 0.83,
      "popChangePct": 1.02
    },
    {
      "year": 2019,
      "gdpPPP": 1.217,
      "perCapitaPPP": 6075.6,
      "perCapitaPPPChangePct": 5.31,
      "popChangePct": 0.5
    },
    {
      "year": 2020,
      "gdpPPP": 1.195,
      "perCapitaPPP": 5917.6,
      "perCapitaPPPChangePct": -2.6,
      "popChangePct": 1.0
    },
    {
      "year": 2021,
      "gdpPPP": 1.186,
      "perCapitaPPP": 5800.5,
      "perCapitaPPPChangePct": -1.98,
      "popChangePct": 0.99
    },
    {
      "year": 2022,
      "gdpPPP": 1.299,
      "perCapitaPPP": 6285.5,
      "perCapitaPPPChangePct": 8.36,
      "popChangePct": 1.47
    },
    {
      "year": 2023,
      "gdpPPP": 1.552,
      "perCapitaPPP": 7441.2,
      "perCapitaPPPChangePct": 18.39,
      "popChangePct": 0.97
    },
    {
      "year": 2024,
      "gdpPPP": 1.667,
      "perCapitaPPP": 7913.5,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 0.96
    },
    {
      "year": 2025,
      "gdpPPP": 1.787,
      "perCapitaPPP": 8427.3,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 0.47
    },
    {
      "year": 2026,
      "gdpPPP": 1.897,
      "perCapitaPPP": 8894.4,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 0.47
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1.993,
      "perCapitaPPP": 9294.5,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": 0.47
    },
    {
      "year": 2028,
      "gdpPPP": 2.076,
      "perCapitaPPP": 9625.8,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 0.93
    },
    {
      "year": 2029,
      "gdpPPP": 2.16,
      "perCapitaPPP": 9955.3,
      "perCapitaPPPChangePct": 3.42,
      "popChangePct": 0.46
    },
    {
      "year": 2030,
      "gdpPPP": 2.245,
      "perCapitaPPP": 10281.9,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 0.46
    },
    {
      "year": 2031,
      "gdpPPP": 2.33,
      "perCapitaPPP": 10606.1,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 0.92
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SamoaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
