import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "San Marino",
  "slug": "san-marino",
  "iso3": "SMR",
  "region": "Europe",
  "rank2026": 189,
  "flagEmoji": "🇸🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Saint Lucia",
      "slug": "saint-lucia",
      "rank": 188
    },
    {
      "name": "Antigua and Barbuda",
      "slug": "antigua-and-barbuda",
      "rank": 190
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 1.008,
      "growth": 2.2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 1.06,
      "growth": 5.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdp": 1.148,
      "growth": 0.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdp": 1.462,
      "growth": 3.9,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2004,
      "gdp": 1.714,
      "growth": 4.6,
      "perCapita": 59313.4,
      "popChangePct": null
    },
    {
      "year": 2005,
      "gdp": 1.788,
      "growth": 2.4,
      "perCapita": 61150.6,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 1.91,
      "growth": 3.8,
      "perCapita": 64498.5,
      "popChangePct": 3.45
    },
    {
      "year": 2007,
      "gdp": 2.189,
      "growth": 7.1,
      "perCapita": 72991.5,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 2.403,
      "growth": -0.4,
      "perCapita": 79110.2,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 2.062,
      "growth": -10.2,
      "perCapita": 67011.5,
      "popChangePct": 3.33
    },
    {
      "year": 2010,
      "gdp": 1.883,
      "growth": -5.9,
      "perCapita": 60426.2,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 1.813,
      "growth": -8.6,
      "perCapita": 57512.9,
      "popChangePct": 3.23
    },
    {
      "year": 2012,
      "gdp": 1.606,
      "growth": -7.2,
      "perCapita": 50336.2,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 1.678,
      "growth": -0.8,
      "perCapita": 51986.5,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 1.674,
      "growth": -0.7,
      "perCapita": 51234.9,
      "popChangePct": 3.13
    },
    {
      "year": 2015,
      "gdp": 1.42,
      "growth": 2.7,
      "perCapita": 43068.7,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 1.468,
      "growth": 2.3,
      "perCapita": 44308.7,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 1.528,
      "growth": 0.3,
      "perCapita": 45887.7,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 1.656,
      "growth": 1.5,
      "perCapita": 49477.3,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 1.616,
      "growth": 2,
      "perCapita": 48043.9,
      "popChangePct": 3.03
    },
    {
      "year": 2020,
      "gdp": 1.543,
      "growth": -6.8,
      "perCapita": 45641.0,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 1.857,
      "growth": 14.5,
      "perCapita": 54733.2,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 1.833,
      "growth": 7.8,
      "perCapita": 53875.8,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 2.028,
      "growth": 0.4,
      "perCapita": 59415.5,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 2.086,
      "growth": 1,
      "perCapita": 60946.2,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 2.251,
      "growth": 1.5,
      "perCapita": 65542.6,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 2.417,
      "growth": 1.3,
      "perCapita": 70187.1,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2.487,
      "growth": 1.2,
      "perCapita": 72002.3,
      "popChangePct": 2.94
    },
    {
      "year": 2028,
      "gdp": 2.572,
      "growth": 1.3,
      "perCapita": 74224.5,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 2.654,
      "growth": 1.3,
      "perCapita": 76383.6,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 2.74,
      "growth": 1.3,
      "perCapita": 78612.1,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 2.829,
      "growth": 1.3,
      "perCapita": 80909.0,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 1.328,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 1.433,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdpPPP": 1.46,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdpPPP": 1.547,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2004,
      "gdpPPP": 1.661,
      "perCapitaPPP": 57451.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2005,
      "gdpPPP": 1.754,
      "perCapitaPPP": 59995.1,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 1.878,
      "perCapitaPPP": 63400.7,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 3.45
    },
    {
      "year": 2007,
      "gdpPPP": 2.065,
      "perCapitaPPP": 68863.1,
      "perCapitaPPPChangePct": 8.62,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 2.097,
      "perCapitaPPP": 69032.8,
      "perCapitaPPPChangePct": 0.25,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 1.896,
      "perCapitaPPP": 61614.9,
      "perCapitaPPPChangePct": -10.75,
      "popChangePct": 3.33
    },
    {
      "year": 2010,
      "gdpPPP": 1.806,
      "perCapitaPPP": 57972.4,
      "perCapitaPPPChangePct": -5.91,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 1.686,
      "perCapitaPPP": 53467.5,
      "perCapitaPPPChangePct": -7.77,
      "popChangePct": 3.23
    },
    {
      "year": 2012,
      "gdpPPP": 1.593,
      "perCapitaPPP": 49921.1,
      "perCapitaPPPChangePct": -6.63,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 1.607,
      "perCapitaPPP": 49765.6,
      "perCapitaPPPChangePct": -0.31,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 1.624,
      "perCapitaPPP": 49707.1,
      "perCapitaPPPChangePct": -0.12,
      "popChangePct": 3.13
    },
    {
      "year": 2015,
      "gdpPPP": 1.683,
      "perCapitaPPP": 51073.9,
      "perCapitaPPPChangePct": 2.75,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 1.739,
      "perCapitaPPP": 52481.7,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 1.775,
      "perCapitaPPP": 53289.8,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 1.88,
      "perCapitaPPP": 56169.3,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 1.991,
      "perCapitaPPP": 59183.2,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 3.03
    },
    {
      "year": 2020,
      "gdpPPP": 1.92,
      "perCapitaPPP": 56761.0,
      "perCapitaPPPChangePct": -4.09,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 2.218,
      "perCapitaPPP": 65376.1,
      "perCapitaPPPChangePct": 15.18,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 2.56,
      "perCapitaPPP": 75249.1,
      "perCapitaPPPChangePct": 15.1,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 2.666,
      "perCapitaPPP": 78107.6,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 2.759,
      "perCapitaPPP": 80600.2,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 2.88,
      "perCapitaPPP": 83878.3,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 3.001,
      "perCapitaPPP": 87141.5,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3.103,
      "perCapitaPPP": 89840.3,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 2.94
    },
    {
      "year": 2028,
      "gdpPPP": 3.195,
      "perCapitaPPP": 92207.1,
      "perCapitaPPPChangePct": 2.63,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 3.293,
      "perCapitaPPP": 94763.6,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 3.397,
      "perCapitaPPP": 97447.8,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 3.502,
      "perCapitaPPP": 100176.4,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SanMarinoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
