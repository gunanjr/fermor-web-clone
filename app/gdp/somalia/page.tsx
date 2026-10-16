import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Somalia",
  "slug": "somalia",
  "iso3": "SOM",
  "region": "Africa",
  "rank2026": 151,
  "flagEmoji": "🇸🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Mauritania",
      "slug": "mauritania",
      "rank": 150
    },
    {
      "name": "Equatorial Guinea",
      "slug": "equatorial-guinea",
      "rank": 152
    }
  ],
  "history": [
    {
      "year": 2011,
      "gdp": 5.022,
      "growth": null,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2012,
      "gdp": 5.183,
      "growth": 1.2,
      "perCapita": 437.5,
      "popChangePct": null
    },
    {
      "year": 2013,
      "gdp": 5.869,
      "growth": 5.7,
      "perCapita": 481.9,
      "popChangePct": 2.8
    },
    {
      "year": 2014,
      "gdp": 6.443,
      "growth": 2.7,
      "perCapita": 514.7,
      "popChangePct": 2.8
    },
    {
      "year": 2015,
      "gdp": 6.841,
      "growth": 4.6,
      "perCapita": 531.6,
      "popChangePct": 2.8
    },
    {
      "year": 2016,
      "gdp": 7.391,
      "growth": -1.3,
      "perCapita": 558.6,
      "popChangePct": 2.8
    },
    {
      "year": 2017,
      "gdp": 8.252,
      "growth": 9.5,
      "perCapita": 606.8,
      "popChangePct": 2.8
    },
    {
      "year": 2018,
      "gdp": 7.873,
      "growth": 1.4,
      "perCapita": 563.1,
      "popChangePct": 2.8
    },
    {
      "year": 2019,
      "gdp": 8.655,
      "growth": 2.8,
      "perCapita": 602.2,
      "popChangePct": 2.8
    },
    {
      "year": 2020,
      "gdp": 8.628,
      "growth": -2.8,
      "perCapita": 584.0,
      "popChangePct": 2.8
    },
    {
      "year": 2021,
      "gdp": 9.484,
      "growth": 3.5,
      "perCapita": 624.4,
      "popChangePct": 2.8
    },
    {
      "year": 2022,
      "gdp": 10.203,
      "growth": 2.7,
      "perCapita": 653.4,
      "popChangePct": 2.8
    },
    {
      "year": 2023,
      "gdp": 10.969,
      "growth": 4.2,
      "perCapita": 683.3,
      "popChangePct": 2.8
    },
    {
      "year": 2024,
      "gdp": 12.161,
      "growth": 4.1,
      "perCapita": 737.0,
      "popChangePct": 2.8
    },
    {
      "year": 2025,
      "gdp": 12.956,
      "growth": 3,
      "perCapita": 763.8,
      "popChangePct": 2.8
    },
    {
      "year": 2026,
      "gdp": 14.174,
      "growth": 2.6,
      "perCapita": 812.9,
      "popChangePct": 2.8
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 15.539,
      "growth": 3.1,
      "perCapita": 866.9,
      "popChangePct": 2.8
    },
    {
      "year": 2028,
      "gdp": 16.875,
      "growth": 3.6,
      "perCapita": 915.7,
      "popChangePct": 2.8
    },
    {
      "year": 2029,
      "gdp": 18.341,
      "growth": 4,
      "perCapita": 968.2,
      "popChangePct": 2.8
    },
    {
      "year": 2030,
      "gdp": 19.851,
      "growth": 4.1,
      "perCapita": 1019.4,
      "popChangePct": 2.8
    },
    {
      "year": 2031,
      "gdp": 21.991,
      "growth": 4.2,
      "perCapita": 1098.5,
      "popChangePct": 2.8
    }
  ],
  "pppHistory": [
    {
      "year": 2011,
      "gdpPPP": 18.994,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2012,
      "gdpPPP": 19.58,
      "perCapitaPPP": 1652.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2013,
      "gdpPPP": 21.04,
      "perCapitaPPP": 1727.7,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 2.8
    },
    {
      "year": 2014,
      "gdpPPP": 21.994,
      "perCapitaPPP": 1756.8,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": 2.8
    },
    {
      "year": 2015,
      "gdpPPP": 23.217,
      "perCapitaPPP": 1804.0,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 2.8
    },
    {
      "year": 2016,
      "gdpPPP": 23.139,
      "perCapitaPPP": 1749.0,
      "perCapitaPPPChangePct": -3.05,
      "popChangePct": 2.8
    },
    {
      "year": 2017,
      "gdpPPP": 25.791,
      "perCapitaPPP": 1896.3,
      "perCapitaPPPChangePct": 8.43,
      "popChangePct": 2.8
    },
    {
      "year": 2018,
      "gdpPPP": 23.975,
      "perCapitaPPP": 1714.8,
      "perCapitaPPPChangePct": -9.57,
      "popChangePct": 2.8
    },
    {
      "year": 2019,
      "gdpPPP": 24.817,
      "perCapitaPPP": 1726.7,
      "perCapitaPPPChangePct": 0.69,
      "popChangePct": 2.8
    },
    {
      "year": 2020,
      "gdpPPP": 24.215,
      "perCapitaPPP": 1638.9,
      "perCapitaPPPChangePct": -5.08,
      "popChangePct": 2.8
    },
    {
      "year": 2021,
      "gdpPPP": 24.05,
      "perCapitaPPP": 1583.4,
      "perCapitaPPPChangePct": -3.39,
      "popChangePct": 2.8
    },
    {
      "year": 2022,
      "gdpPPP": 26.463,
      "perCapitaPPP": 1694.8,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": 2.8
    },
    {
      "year": 2023,
      "gdpPPP": 28.599,
      "perCapitaPPP": 1781.7,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 2.8
    },
    {
      "year": 2024,
      "gdpPPP": 30.511,
      "perCapitaPPP": 1849.1,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 2.8
    },
    {
      "year": 2025,
      "gdpPPP": 32.318,
      "perCapitaPPP": 1905.2,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 2.8
    },
    {
      "year": 2026,
      "gdpPPP": 34.108,
      "perCapitaPPP": 1956.0,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 2.8
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 35.937,
      "perCapitaPPP": 2004.8,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 2.8
    },
    {
      "year": 2028,
      "gdpPPP": 37.842,
      "perCapitaPPP": 2053.5,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 2.8
    },
    {
      "year": 2029,
      "gdpPPP": 40.056,
      "perCapitaPPP": 2114.4,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 2.8
    },
    {
      "year": 2030,
      "gdpPPP": 42.464,
      "perCapitaPPP": 2180.5,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 2.8
    },
    {
      "year": 2031,
      "gdpPPP": 45.046,
      "perCapitaPPP": 2250.1,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 2.8
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SomaliaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
