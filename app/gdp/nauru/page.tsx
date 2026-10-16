import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Nauru",
  "slug": "nauru",
  "iso3": "NRU",
  "region": "Oceania",
  "rank2026": 216,
  "flagEmoji": "🇳🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Marshall Islands",
      "slug": "marshall-islands",
      "rank": 215
    },
    {
      "name": "Tuvalu",
      "slug": "tuvalu",
      "rank": 218
    }
  ],
  "history": [
    {
      "year": 2004,
      "gdp": 0.032,
      "growth": null,
      "perCapita": 3165.0,
      "popChangePct": null
    },
    {
      "year": 2005,
      "gdp": 0.031,
      "growth": -0.4,
      "perCapita": 3065.6,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.029,
      "growth": 8.3,
      "perCapita": 2930.0,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.025,
      "growth": -22.2,
      "perCapita": 2462.1,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 0.036,
      "growth": 20.4,
      "perCapita": 3553.3,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.047,
      "growth": -5.7,
      "perCapita": 4729.7,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.05,
      "growth": -0.2,
      "perCapita": 4937.5,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.069,
      "growth": 14.4,
      "perCapita": 6793.3,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 0.101,
      "growth": 25.3,
      "perCapita": 9873.3,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 0.089,
      "growth": 3.6,
      "perCapita": 8481.8,
      "popChangePct": 10.0
    },
    {
      "year": 2014,
      "gdp": 0.097,
      "growth": 16.4,
      "perCapita": 9050.3,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.076,
      "growth": 2.7,
      "perCapita": 6976.9,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 0.1,
      "growth": 4.4,
      "perCapita": 8926.4,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 0.109,
      "growth": -6,
      "perCapita": 9626.4,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 0.131,
      "growth": -1.2,
      "perCapita": 11427.0,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 0.125,
      "growth": 8.5,
      "perCapita": 10793.4,
      "popChangePct": 9.09
    },
    {
      "year": 2020,
      "gdp": 0.125,
      "growth": 2,
      "perCapita": 10721.8,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 0.149,
      "growth": 7.2,
      "perCapita": 12761.6,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 0.181,
      "growth": 0.1,
      "perCapita": 15301.3,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 0.161,
      "growth": -0.3,
      "perCapita": 13588.2,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 0.168,
      "growth": 1.4,
      "perCapita": 14025.7,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 0.176,
      "growth": 2.2,
      "perCapita": 14584.0,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 0.196,
      "growth": 2.1,
      "perCapita": 16052.8,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.214,
      "growth": 2,
      "perCapita": 17350.7,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 0.223,
      "growth": 2,
      "perCapita": 17907.3,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 0.233,
      "growth": 2,
      "perCapita": 18475.5,
      "popChangePct": 8.33
    },
    {
      "year": 2030,
      "gdp": 0.242,
      "growth": 2,
      "perCapita": 19023.5,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.252,
      "growth": 2,
      "perCapita": 19598.3,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 2004,
      "gdpPPP": 0.044,
      "perCapitaPPP": 4335.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2005,
      "gdpPPP": 0.045,
      "perCapitaPPP": 4460.6,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.05,
      "perCapitaPPP": 4988.6,
      "perCapitaPPPChangePct": 11.84,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.04,
      "perCapitaPPP": 3992.6,
      "perCapitaPPPChangePct": -19.97,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 0.049,
      "perCapitaPPP": 4904.3,
      "perCapitaPPPChangePct": 22.83,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.047,
      "perCapitaPPP": 4652.4,
      "perCapitaPPPChangePct": -5.14,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 0.047,
      "perCapitaPPP": 4688.7,
      "perCapitaPPPChangePct": 0.78,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 0.055,
      "perCapitaPPP": 5444.5,
      "perCapitaPPPChangePct": 16.12,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 0.07,
      "perCapitaPPP": 6833.5,
      "perCapitaPPPChangePct": 25.51,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 0.074,
      "perCapitaPPP": 7032.1,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 10.0
    },
    {
      "year": 2014,
      "gdpPPP": 0.088,
      "perCapitaPPP": 8155.1,
      "perCapitaPPPChangePct": 15.97,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 0.091,
      "perCapitaPPP": 8289.2,
      "perCapitaPPPChangePct": 1.65,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 0.096,
      "perCapitaPPP": 8579.6,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.092,
      "perCapitaPPP": 8082.2,
      "perCapitaPPPChangePct": -5.8,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 0.092,
      "perCapitaPPP": 8057.6,
      "perCapitaPPPChangePct": -0.3,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 0.102,
      "perCapitaPPP": 8801.4,
      "perCapitaPPPChangePct": 9.23,
      "popChangePct": 9.09
    },
    {
      "year": 2020,
      "gdpPPP": 0.105,
      "perCapitaPPP": 9052.8,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 0.118,
      "perCapitaPPP": 10090.8,
      "perCapitaPPPChangePct": 11.47,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 0.127,
      "perCapitaPPP": 10736.2,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 0.131,
      "perCapitaPPP": 11034.7,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 0.136,
      "perCapitaPPP": 11399.5,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 0.143,
      "perCapitaPPP": 11855.4,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 0.15,
      "perCapitaPPP": 12323.0,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.157,
      "perCapitaPPP": 12709.4,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 0.162,
      "perCapitaPPP": 13033.8,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 0.169,
      "perCapitaPPP": 13387.6,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 8.33
    },
    {
      "year": 2030,
      "gdpPPP": 0.175,
      "perCapitaPPP": 13756.8,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 0.182,
      "perCapitaPPP": 14137.9,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NauruGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
