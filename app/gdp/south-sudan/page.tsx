import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "South Sudan",
  "slug": "south-sudan",
  "iso3": "SSD",
  "region": "Africa",
  "rank2026": 170,
  "flagEmoji": "🇸🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Fiji",
      "slug": "fiji",
      "rank": 169
    },
    {
      "name": "Suriname",
      "slug": "suriname",
      "rank": 171
    }
  ],
  "history": [
    {
      "year": 2011,
      "gdp": 17.34,
      "growth": null,
      "perCapita": 1685.5,
      "popChangePct": null
    },
    {
      "year": 2012,
      "gdp": 11.267,
      "growth": -50.3,
      "perCapita": 1047.5,
      "popChangePct": 4.55
    },
    {
      "year": 2013,
      "gdp": 14.947,
      "growth": 27.3,
      "perCapita": 1338.6,
      "popChangePct": 3.81
    },
    {
      "year": 2014,
      "gdp": 14.608,
      "growth": 1.6,
      "perCapita": 1300.2,
      "popChangePct": 0.62
    },
    {
      "year": 2015,
      "gdp": 15.082,
      "growth": -0.2,
      "perCapita": 1357.8,
      "popChangePct": -1.13
    },
    {
      "year": 2016,
      "gdp": 2.825,
      "growth": -13.3,
      "perCapita": 260.8,
      "popChangePct": -2.5
    },
    {
      "year": 2017,
      "gdp": 2.736,
      "growth": -5.8,
      "perCapita": 266.7,
      "popChangePct": -5.27
    },
    {
      "year": 2018,
      "gdp": 2.559,
      "growth": -2.1,
      "perCapita": 252.8,
      "popChangePct": -1.33
    },
    {
      "year": 2019,
      "gdp": 4.044,
      "growth": 0.9,
      "perCapita": 387.9,
      "popChangePct": 2.96
    },
    {
      "year": 2020,
      "gdp": 5.423,
      "growth": -6.5,
      "perCapita": 506.9,
      "popChangePct": 2.64
    },
    {
      "year": 2021,
      "gdp": 5.94,
      "growth": 5.3,
      "perCapita": 546.7,
      "popChangePct": 1.57
    },
    {
      "year": 2022,
      "gdp": 7.533,
      "growth": -5.2,
      "perCapita": 683.5,
      "popChangePct": 1.43
    },
    {
      "year": 2023,
      "gdp": 7.401,
      "growth": 3,
      "perCapita": 644.5,
      "popChangePct": 4.19
    },
    {
      "year": 2024,
      "gdp": 4.637,
      "growth": -26.1,
      "perCapita": 388.2,
      "popChangePct": 4.01
    },
    {
      "year": 2025,
      "gdp": 5.733,
      "growth": 46.1,
      "perCapita": 470.3,
      "popChangePct": 2.06
    },
    {
      "year": 2026,
      "gdp": 6.069,
      "growth": 4.1,
      "perCapita": 488.0,
      "popChangePct": 2.03
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 6.826,
      "growth": 3.3,
      "perCapita": 538.0,
      "popChangePct": 2.02
    },
    {
      "year": 2028,
      "gdp": 7.161,
      "growth": 3.6,
      "perCapita": 553.3,
      "popChangePct": 2.01
    },
    {
      "year": 2029,
      "gdp": 7.488,
      "growth": 3.5,
      "perCapita": 567.3,
      "popChangePct": 1.98
    },
    {
      "year": 2030,
      "gdp": 7.841,
      "growth": 3.8,
      "perCapita": 582.6,
      "popChangePct": 1.96
    },
    {
      "year": 2031,
      "gdp": 8.144,
      "growth": 3,
      "perCapita": 593.4,
      "popChangePct": 1.99
    }
  ],
  "pppHistory": [
    {
      "year": 2011,
      "gdpPPP": 14.616,
      "perCapitaPPP": 1420.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2012,
      "gdpPPP": 7.396,
      "perCapitaPPP": 687.6,
      "perCapitaPPPChangePct": -51.6,
      "popChangePct": 4.55
    },
    {
      "year": 2013,
      "gdpPPP": 9.574,
      "perCapitaPPP": 857.4,
      "perCapitaPPPChangePct": 24.69,
      "popChangePct": 3.81
    },
    {
      "year": 2014,
      "gdpPPP": 9.892,
      "perCapitaPPP": 880.5,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 0.62
    },
    {
      "year": 2015,
      "gdpPPP": 9.961,
      "perCapitaPPP": 896.7,
      "perCapitaPPPChangePct": 1.85,
      "popChangePct": -1.13
    },
    {
      "year": 2016,
      "gdpPPP": 8.718,
      "perCapitaPPP": 805.0,
      "perCapitaPPPChangePct": -10.23,
      "popChangePct": -2.5
    },
    {
      "year": 2017,
      "gdpPPP": 8.36,
      "perCapitaPPP": 814.9,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": -5.27
    },
    {
      "year": 2018,
      "gdpPPP": 6.088,
      "perCapitaPPP": 601.4,
      "perCapitaPPPChangePct": -26.2,
      "popChangePct": -1.33
    },
    {
      "year": 2019,
      "gdpPPP": 7.797,
      "perCapitaPPP": 748.0,
      "perCapitaPPPChangePct": 24.38,
      "popChangePct": 2.96
    },
    {
      "year": 2020,
      "gdpPPP": 8.622,
      "perCapitaPPP": 805.9,
      "perCapitaPPPChangePct": 7.74,
      "popChangePct": 2.64
    },
    {
      "year": 2021,
      "gdpPPP": 14.5,
      "perCapitaPPP": 1334.5,
      "perCapitaPPPChangePct": 65.58,
      "popChangePct": 1.57
    },
    {
      "year": 2022,
      "gdpPPP": 14.726,
      "perCapitaPPP": 1336.2,
      "perCapitaPPPChangePct": 0.13,
      "popChangePct": 1.43
    },
    {
      "year": 2023,
      "gdpPPP": 15.726,
      "perCapitaPPP": 1369.5,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 4.19
    },
    {
      "year": 2024,
      "gdpPPP": 11.903,
      "perCapitaPPP": 996.6,
      "perCapitaPPPChangePct": -27.22,
      "popChangePct": 4.01
    },
    {
      "year": 2025,
      "gdpPPP": 17.883,
      "perCapitaPPP": 1467.2,
      "perCapitaPPPChangePct": 47.21,
      "popChangePct": 2.06
    },
    {
      "year": 2026,
      "gdpPPP": 19.157,
      "perCapitaPPP": 1540.5,
      "perCapitaPPPChangePct": 4.99,
      "popChangePct": 2.03
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 20.23,
      "perCapitaPPP": 1594.5,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 2.02
    },
    {
      "year": 2028,
      "gdpPPP": 21.31,
      "perCapitaPPP": 1646.7,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 2.01
    },
    {
      "year": 2029,
      "gdpPPP": 22.444,
      "perCapitaPPP": 1700.6,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 1.98
    },
    {
      "year": 2030,
      "gdpPPP": 23.721,
      "perCapitaPPP": 1762.7,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 1.96
    },
    {
      "year": 2031,
      "gdpPPP": 24.883,
      "perCapitaPPP": 1812.9,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 1.99
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SouthSudanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
