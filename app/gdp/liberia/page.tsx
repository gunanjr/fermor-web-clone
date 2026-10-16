import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Liberia",
  "slug": "liberia",
  "iso3": "LBR",
  "region": "Africa",
  "rank2026": 173,
  "flagEmoji": "🇱🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Eswatini",
      "slug": "eswatini",
      "rank": 172
    },
    {
      "name": "Andorra",
      "slug": "andorra",
      "rank": 174
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 0.863,
      "growth": null,
      "perCapita": 303.1,
      "popChangePct": 5.48
    },
    {
      "year": 2001,
      "gdp": 0.904,
      "growth": 2.8,
      "perCapita": 305.9,
      "popChangePct": 3.72
    },
    {
      "year": 2002,
      "gdp": 0.943,
      "growth": 4.4,
      "perCapita": 311.8,
      "popChangePct": 2.4
    },
    {
      "year": 2003,
      "gdp": 0.713,
      "growth": -29,
      "perCapita": 231.9,
      "popChangePct": 1.72
    },
    {
      "year": 2004,
      "gdp": 0.897,
      "growth": 4,
      "perCapita": 286.1,
      "popChangePct": 1.92
    },
    {
      "year": 2005,
      "gdp": 0.944,
      "growth": 5.9,
      "perCapita": 293.5,
      "popChangePct": 2.61
    },
    {
      "year": 2006,
      "gdp": 1.109,
      "growth": 8.5,
      "perCapita": 333.1,
      "popChangePct": 3.45
    },
    {
      "year": 2007,
      "gdp": 1.344,
      "growth": 13.1,
      "perCapita": 388.1,
      "popChangePct": 4.0
    },
    {
      "year": 2008,
      "gdp": 1.676,
      "growth": 6.1,
      "perCapita": 464.4,
      "popChangePct": 4.22
    },
    {
      "year": 2009,
      "gdp": 1.765,
      "growth": 5.2,
      "perCapita": 470.2,
      "popChangePct": 4.05
    },
    {
      "year": 2010,
      "gdp": 1.966,
      "growth": 6.4,
      "perCapita": 505.4,
      "popChangePct": 3.65
    },
    {
      "year": 2011,
      "gdp": 2.34,
      "growth": 7.7,
      "perCapita": 582.6,
      "popChangePct": 3.24
    },
    {
      "year": 2012,
      "gdp": 2.675,
      "growth": 8.4,
      "perCapita": 646.7,
      "popChangePct": 2.96
    },
    {
      "year": 2013,
      "gdp": 3.044,
      "growth": 8.8,
      "perCapita": 716.6,
      "popChangePct": 2.71
    },
    {
      "year": 2014,
      "gdp": 3.09,
      "growth": 0.7,
      "perCapita": 708.8,
      "popChangePct": 2.64
    },
    {
      "year": 2015,
      "gdp": 3.092,
      "growth": 0,
      "perCapita": 691.4,
      "popChangePct": 2.57
    },
    {
      "year": 2016,
      "gdp": 3.256,
      "growth": -1.6,
      "perCapita": 709.8,
      "popChangePct": 2.57
    },
    {
      "year": 2017,
      "gdp": 3.321,
      "growth": 2.5,
      "perCapita": 706.2,
      "popChangePct": 2.51
    },
    {
      "year": 2018,
      "gdp": 3.264,
      "growth": 1.2,
      "perCapita": 677.4,
      "popChangePct": 2.49
    },
    {
      "year": 2019,
      "gdp": 3.08,
      "growth": -2.5,
      "perCapita": 623.9,
      "popChangePct": 2.45
    },
    {
      "year": 2020,
      "gdp": 3.037,
      "growth": -3,
      "perCapita": 589.8,
      "popChangePct": 4.29
    },
    {
      "year": 2021,
      "gdp": 3.509,
      "growth": 5,
      "perCapita": 667.2,
      "popChangePct": 2.14
    },
    {
      "year": 2022,
      "gdp": 3.974,
      "growth": 4.8,
      "perCapita": 739.7,
      "popChangePct": 2.17
    },
    {
      "year": 2023,
      "gdp": 4.39,
      "growth": 4.6,
      "perCapita": 799.3,
      "popChangePct": 2.23
    },
    {
      "year": 2024,
      "gdp": 4.778,
      "growth": 4,
      "perCapita": 851.2,
      "popChangePct": 2.18
    },
    {
      "year": 2025,
      "gdp": 5.216,
      "growth": 5.1,
      "perCapita": 910.1,
      "popChangePct": 2.1
    },
    {
      "year": 2026,
      "gdp": 5.642,
      "growth": 5.1,
      "perCapita": 963.7,
      "popChangePct": 2.15
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 6.053,
      "growth": 5.4,
      "perCapita": 1011.1,
      "popChangePct": 2.27
    },
    {
      "year": 2028,
      "gdp": 6.469,
      "growth": 5.6,
      "perCapita": 1057.2,
      "popChangePct": 2.2
    },
    {
      "year": 2029,
      "gdp": 6.919,
      "growth": 5.6,
      "perCapita": 1107.8,
      "popChangePct": 2.06
    },
    {
      "year": 2030,
      "gdp": 7.416,
      "growth": 5.6,
      "perCapita": 1164.9,
      "popChangePct": 1.94
    },
    {
      "year": 2031,
      "gdp": 7.976,
      "growth": 5.5,
      "perCapita": 1229.6,
      "popChangePct": 1.9
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 3.652,
      "perCapitaPPP": 1282.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": 5.48
    },
    {
      "year": 2001,
      "gdpPPP": 3.837,
      "perCapitaPPP": 1299.0,
      "perCapitaPPPChangePct": 1.3,
      "popChangePct": 3.72
    },
    {
      "year": 2002,
      "gdpPPP": 4.069,
      "perCapitaPPP": 1345.3,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 2.4
    },
    {
      "year": 2003,
      "gdpPPP": 2.947,
      "perCapitaPPP": 957.9,
      "perCapitaPPPChangePct": -28.8,
      "popChangePct": 1.72
    },
    {
      "year": 2004,
      "gdpPPP": 3.147,
      "perCapitaPPP": 1003.5,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 1.92
    },
    {
      "year": 2005,
      "gdpPPP": 3.436,
      "perCapitaPPP": 1067.6,
      "perCapitaPPPChangePct": 6.39,
      "popChangePct": 2.61
    },
    {
      "year": 2006,
      "gdpPPP": 3.842,
      "perCapitaPPP": 1154.1,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 3.45
    },
    {
      "year": 2007,
      "gdpPPP": 4.463,
      "perCapitaPPP": 1289.1,
      "perCapitaPPPChangePct": 11.7,
      "popChangePct": 4.0
    },
    {
      "year": 2008,
      "gdpPPP": 4.827,
      "perCapitaPPP": 1337.8,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": 4.22
    },
    {
      "year": 2009,
      "gdpPPP": 5.109,
      "perCapitaPPP": 1360.8,
      "perCapitaPPPChangePct": 1.72,
      "popChangePct": 4.05
    },
    {
      "year": 2010,
      "gdpPPP": 5.499,
      "perCapitaPPP": 1413.3,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 3.65
    },
    {
      "year": 2011,
      "gdpPPP": 6.045,
      "perCapitaPPP": 1504.8,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 3.24
    },
    {
      "year": 2012,
      "gdpPPP": 6.676,
      "perCapitaPPP": 1614.1,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 2.96
    },
    {
      "year": 2013,
      "gdpPPP": 7.389,
      "perCapitaPPP": 1739.5,
      "perCapitaPPPChangePct": 7.77,
      "popChangePct": 2.71
    },
    {
      "year": 2014,
      "gdpPPP": 7.57,
      "perCapitaPPP": 1736.3,
      "perCapitaPPPChangePct": -0.18,
      "popChangePct": 2.64
    },
    {
      "year": 2015,
      "gdpPPP": 7.641,
      "perCapitaPPP": 1708.6,
      "perCapitaPPPChangePct": -1.59,
      "popChangePct": 2.57
    },
    {
      "year": 2016,
      "gdpPPP": 7.588,
      "perCapitaPPP": 1654.2,
      "perCapitaPPPChangePct": -3.18,
      "popChangePct": 2.57
    },
    {
      "year": 2017,
      "gdpPPP": 7.914,
      "perCapitaPPP": 1683.2,
      "perCapitaPPPChangePct": 1.75,
      "popChangePct": 2.51
    },
    {
      "year": 2018,
      "gdpPPP": 8.496,
      "perCapitaPPP": 1763.1,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 2.49
    },
    {
      "year": 2019,
      "gdpPPP": 8.89,
      "perCapitaPPP": 1800.8,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 2.45
    },
    {
      "year": 2020,
      "gdpPPP": 8.168,
      "perCapitaPPP": 1586.3,
      "perCapitaPPPChangePct": -11.91,
      "popChangePct": 4.29
    },
    {
      "year": 2021,
      "gdpPPP": 8.084,
      "perCapitaPPP": 1537.1,
      "perCapitaPPPChangePct": -3.1,
      "popChangePct": 2.14
    },
    {
      "year": 2022,
      "gdpPPP": 9.076,
      "perCapitaPPP": 1689.0,
      "perCapitaPPPChangePct": 9.88,
      "popChangePct": 2.17
    },
    {
      "year": 2023,
      "gdpPPP": 9.843,
      "perCapitaPPP": 1791.9,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": 2.23
    },
    {
      "year": 2024,
      "gdpPPP": 10.492,
      "perCapitaPPP": 1869.3,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 2.18
    },
    {
      "year": 2025,
      "gdpPPP": 11.344,
      "perCapitaPPP": 1979.4,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 2.1
    },
    {
      "year": 2026,
      "gdpPPP": 12.266,
      "perCapitaPPP": 2095.3,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 2.15
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 13.21,
      "perCapitaPPP": 2206.6,
      "perCapitaPPPChangePct": 5.31,
      "popChangePct": 2.27
    },
    {
      "year": 2028,
      "gdpPPP": 14.181,
      "perCapitaPPP": 2317.6,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 2.2
    },
    {
      "year": 2029,
      "gdpPPP": 15.238,
      "perCapitaPPP": 2439.9,
      "perCapitaPPPChangePct": 5.28,
      "popChangePct": 2.06
    },
    {
      "year": 2030,
      "gdpPPP": 16.391,
      "perCapitaPPP": 2574.6,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 1.94
    },
    {
      "year": 2031,
      "gdpPPP": 17.604,
      "perCapitaPPP": 2713.8,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 1.9
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LiberiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
