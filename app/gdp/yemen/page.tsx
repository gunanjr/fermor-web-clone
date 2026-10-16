import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Yemen",
  "slug": "yemen",
  "iso3": "YEM",
  "region": "Asia",
  "rank2026": 164,
  "flagEmoji": "🇾🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Maldives",
      "slug": "maldives",
      "rank": 163
    },
    {
      "name": "Fiji",
      "slug": "fiji",
      "rank": 169
    }
  ],
  "history": [
    {
      "year": 2014,
      "gdp": 14.221,
      "growth": null,
      "perCapita": 1045.5,
      "popChangePct": null
    },
    {
      "year": 2015,
      "gdp": 10.265,
      "growth": -32,
      "perCapita": 732.1,
      "popChangePct": 3.09
    },
    {
      "year": 2016,
      "gdp": 9.944,
      "growth": -4.4,
      "perCapita": 688.2,
      "popChangePct": 3.05
    },
    {
      "year": 2017,
      "gdp": 10.443,
      "growth": 4,
      "perCapita": 701.3,
      "popChangePct": 3.06
    },
    {
      "year": 2018,
      "gdp": 11.494,
      "growth": 8.5,
      "perCapita": 749.4,
      "popChangePct": 3.0
    },
    {
      "year": 2019,
      "gdp": 12.849,
      "growth": 4.7,
      "perCapita": 813.2,
      "popChangePct": 3.01
    },
    {
      "year": 2020,
      "gdp": 10.783,
      "growth": 0.3,
      "perCapita": 663.2,
      "popChangePct": 2.92
    },
    {
      "year": 2021,
      "gdp": 10.203,
      "growth": 6,
      "perCapita": 610.5,
      "popChangePct": 2.78
    },
    {
      "year": 2022,
      "gdp": 11.124,
      "growth": -0.5,
      "perCapita": 646.7,
      "popChangePct": 2.91
    },
    {
      "year": 2023,
      "gdp": 9.364,
      "growth": -9.3,
      "perCapita": 528.2,
      "popChangePct": 3.06
    },
    {
      "year": 2024,
      "gdp": 8.058,
      "growth": -1.5,
      "perCapita": 441.2,
      "popChangePct": 3.02
    },
    {
      "year": 2025,
      "gdp": 7.897,
      "growth": -0.5,
      "perCapita": 419.8,
      "popChangePct": 3.0
    },
    {
      "year": 2026,
      "gdp": 7.435,
      "growth": 0.5,
      "perCapita": 383.7,
      "popChangePct": 3.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 7.122,
      "growth": 1.5,
      "perCapita": 356.9,
      "popChangePct": 3.0
    },
    {
      "year": 2028,
      "gdp": 7.005,
      "growth": 2.5,
      "perCapita": 340.8,
      "popChangePct": 3.0
    },
    {
      "year": 2029,
      "gdp": 6.962,
      "growth": 2.5,
      "perCapita": 328.8,
      "popChangePct": 3.0
    },
    {
      "year": 2030,
      "gdp": 6.979,
      "growth": 2.5,
      "perCapita": 320.0,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdp": 7.047,
      "growth": 2.5,
      "perCapita": 313.8,
      "popChangePct": 3.0
    }
  ],
  "pppHistory": [
    {
      "year": 2014,
      "gdpPPP": 30.988,
      "perCapitaPPP": 2278.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2015,
      "gdpPPP": 21.258,
      "perCapitaPPP": 1516.1,
      "perCapitaPPPChangePct": -33.45,
      "popChangePct": 3.09
    },
    {
      "year": 2016,
      "gdpPPP": 20.521,
      "perCapitaPPP": 1420.3,
      "perCapitaPPPChangePct": -6.32,
      "popChangePct": 3.05
    },
    {
      "year": 2017,
      "gdpPPP": 21.723,
      "perCapitaPPP": 1458.8,
      "perCapitaPPPChangePct": 2.72,
      "popChangePct": 3.06
    },
    {
      "year": 2018,
      "gdpPPP": 24.1,
      "perCapitaPPP": 1571.2,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": 3.0
    },
    {
      "year": 2019,
      "gdpPPP": 25.642,
      "perCapitaPPP": 1622.9,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 3.01
    },
    {
      "year": 2020,
      "gdpPPP": 26.054,
      "perCapitaPPP": 1602.3,
      "perCapitaPPPChangePct": -1.27,
      "popChangePct": 2.92
    },
    {
      "year": 2021,
      "gdpPPP": 28.881,
      "perCapitaPPP": 1728.1,
      "perCapitaPPPChangePct": 7.85,
      "popChangePct": 2.78
    },
    {
      "year": 2022,
      "gdpPPP": 30.788,
      "perCapitaPPP": 1790.0,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 2.91
    },
    {
      "year": 2023,
      "gdpPPP": 28.96,
      "perCapitaPPP": 1633.8,
      "perCapitaPPPChangePct": -8.73,
      "popChangePct": 3.06
    },
    {
      "year": 2024,
      "gdpPPP": 29.245,
      "perCapitaPPP": 1601.4,
      "perCapitaPPPChangePct": -1.98,
      "popChangePct": 3.02
    },
    {
      "year": 2025,
      "gdpPPP": 29.912,
      "perCapitaPPP": 1590.2,
      "perCapitaPPPChangePct": -0.7,
      "popChangePct": 3.0
    },
    {
      "year": 2026,
      "gdpPPP": 30.926,
      "perCapitaPPP": 1596.2,
      "perCapitaPPPChangePct": 0.38,
      "popChangePct": 3.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 32.064,
      "perCapitaPPP": 1606.8,
      "perCapitaPPPChangePct": 0.66,
      "popChangePct": 3.0
    },
    {
      "year": 2028,
      "gdpPPP": 33.408,
      "perCapitaPPP": 1625.3,
      "perCapitaPPPChangePct": 1.16,
      "popChangePct": 3.0
    },
    {
      "year": 2029,
      "gdpPPP": 34.862,
      "perCapitaPPP": 1646.7,
      "perCapitaPPPChangePct": 1.31,
      "popChangePct": 3.0
    },
    {
      "year": 2030,
      "gdpPPP": 36.408,
      "perCapitaPPP": 1669.6,
      "perCapitaPPPChangePct": 1.39,
      "popChangePct": 3.0
    },
    {
      "year": 2031,
      "gdpPPP": 38.01,
      "perCapitaPPP": 1692.3,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 3.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function YemenGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
