import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Tuvalu",
  "slug": "tuvalu",
  "iso3": "TUV",
  "region": "Oceania",
  "rank2026": 218,
  "flagEmoji": "🇹🇻",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Nauru",
      "slug": "nauru",
      "rank": 216
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 0.015,
      "growth": null,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 0.014,
      "growth": 0.7,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdp": 0.017,
      "growth": 8.3,
      "perCapita": 1742.2,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdp": 0.02,
      "growth": -4.4,
      "perCapita": 2076.5,
      "popChangePct": -10.0
    },
    {
      "year": 2004,
      "gdp": 0.023,
      "growth": -1.9,
      "perCapita": 2386.4,
      "popChangePct": 11.11
    },
    {
      "year": 2005,
      "gdp": 0.023,
      "growth": -3.7,
      "perCapita": 2349.5,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.024,
      "growth": 1.3,
      "perCapita": 2465.1,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.029,
      "growth": 6.9,
      "perCapita": 2866.9,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 0.032,
      "growth": 6.6,
      "perCapita": 3188.0,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.028,
      "growth": -5.6,
      "perCapita": 2760.1,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.033,
      "growth": -2.5,
      "perCapita": 3134.2,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.04,
      "growth": 7.5,
      "perCapita": 3778.7,
      "popChangePct": 10.0
    },
    {
      "year": 2012,
      "gdp": 0.039,
      "growth": -2.9,
      "perCapita": 3610.4,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 0.039,
      "growth": 3.8,
      "perCapita": 3616.6,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 0.039,
      "growth": 1.7,
      "perCapita": 3605.2,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.037,
      "growth": 9.4,
      "perCapita": 3437.4,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 0.041,
      "growth": 4.8,
      "perCapita": 3867.7,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 0.045,
      "growth": 3.3,
      "perCapita": 4312.3,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 0.048,
      "growth": 1.7,
      "perCapita": 4561.4,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 0.054,
      "growth": 13.4,
      "perCapita": 5238.0,
      "popChangePct": -9.09
    },
    {
      "year": 2020,
      "gdp": 0.053,
      "growth": -3.3,
      "perCapita": 5158.7,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 0.062,
      "growth": 0.1,
      "perCapita": 5983.0,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 0.054,
      "growth": -11.8,
      "perCapita": 5123.1,
      "popChangePct": 10.0
    },
    {
      "year": 2023,
      "gdp": 0.051,
      "growth": 4,
      "perCapita": 5008.8,
      "popChangePct": -9.09
    },
    {
      "year": 2024,
      "gdp": 0.056,
      "growth": 3.1,
      "perCapita": 5729.4,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 0.058,
      "growth": 2.2,
      "perCapita": 5822.5,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 0.065,
      "growth": 2.5,
      "perCapita": 6581.2,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.069,
      "growth": 2.4,
      "perCapita": 6901.9,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 0.072,
      "growth": 2.3,
      "perCapita": 7211.0,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 0.075,
      "growth": 2,
      "perCapita": 7496.3,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 0.078,
      "growth": 1.8,
      "perCapita": 7770.4,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.081,
      "growth": 1.6,
      "perCapita": 8040.4,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 0.023,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 0.024,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdpPPP": 0.026,
      "perCapitaPPP": 2743.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdpPPP": 0.026,
      "perCapitaPPP": 2698.9,
      "perCapitaPPPChangePct": -1.63,
      "popChangePct": -10.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.026,
      "perCapitaPPP": 2684.5,
      "perCapitaPPPChangePct": -0.53,
      "popChangePct": 11.11
    },
    {
      "year": 2005,
      "gdpPPP": 0.026,
      "perCapitaPPP": 2630.9,
      "perCapitaPPPChangePct": -1.99,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.027,
      "perCapitaPPP": 2712.3,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.029,
      "perCapitaPPP": 2940.2,
      "perCapitaPPPChangePct": 8.4,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 0.032,
      "perCapitaPPP": 3153.3,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.03,
      "perCapitaPPP": 2956.3,
      "perCapitaPPPChangePct": -6.25,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 0.03,
      "perCapitaPPP": 2881.2,
      "perCapitaPPPChangePct": -2.54,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 0.033,
      "perCapitaPPP": 3121.5,
      "perCapitaPPPChangePct": 8.34,
      "popChangePct": 10.0
    },
    {
      "year": 2012,
      "gdpPPP": 0.032,
      "perCapitaPPP": 3009.3,
      "perCapitaPPPChangePct": -3.59,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 0.034,
      "perCapitaPPP": 3185.6,
      "perCapitaPPPChangePct": 5.86,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 0.035,
      "perCapitaPPP": 3300.9,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 0.039,
      "perCapitaPPP": 3651.5,
      "perCapitaPPPChangePct": 10.62,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 0.041,
      "perCapitaPPP": 3871.3,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.044,
      "perCapitaPPP": 4141.3,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 0.045,
      "perCapitaPPP": 4280.1,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 0.052,
      "perCapitaPPP": 5079.9,
      "perCapitaPPPChangePct": 18.68,
      "popChangePct": -9.09
    },
    {
      "year": 2020,
      "gdpPPP": 0.051,
      "perCapitaPPP": 5013.3,
      "perCapitaPPPChangePct": -1.31,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 0.054,
      "perCapitaPPP": 5208.4,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 0.051,
      "perCapitaPPP": 4776.0,
      "perCapitaPPPChangePct": -8.3,
      "popChangePct": 10.0
    },
    {
      "year": 2023,
      "gdpPPP": 0.055,
      "perCapitaPPP": 5406.2,
      "perCapitaPPPChangePct": 13.2,
      "popChangePct": -9.09
    },
    {
      "year": 2024,
      "gdpPPP": 0.058,
      "perCapitaPPP": 5853.6,
      "perCapitaPPPChangePct": 8.28,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 0.061,
      "perCapitaPPP": 6130.9,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 0.064,
      "perCapitaPPP": 6447.0,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.067,
      "perCapitaPPP": 6724.9,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 0.07,
      "perCapitaPPP": 6972.6,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 0.072,
      "perCapitaPPP": 7217.7,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 0.075,
      "perCapitaPPP": 7460.7,
      "perCapitaPPPChangePct": 3.37,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 0.077,
      "perCapitaPPP": 7697.3,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TuvaluGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
