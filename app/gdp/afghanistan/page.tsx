import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Afghanistan",
  "slug": "afghanistan",
  "iso3": "AFG",
  "region": "Asia",
  "rank2026": 140,
  "flagEmoji": "🇦🇫",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Syria",
      "slug": "syria",
      "rank": 139
    },
    {
      "name": "Laos",
      "slug": "laos",
      "rank": 141
    }
  ],
  "history": [
    {
      "year": 2002,
      "gdp": 4.367,
      "growth": null,
      "perCapita": 207.9,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdp": 4.553,
      "growth": 8.7,
      "perCapita": 201.1,
      "popChangePct": 7.83
    },
    {
      "year": 2004,
      "gdp": 5.146,
      "growth": 0.7,
      "perCapita": 218.5,
      "popChangePct": 4.01
    },
    {
      "year": 2005,
      "gdp": 6.167,
      "growth": 11.8,
      "perCapita": 252.6,
      "popChangePct": 3.64
    },
    {
      "year": 2006,
      "gdp": 6.925,
      "growth": 5.4,
      "perCapita": 272.2,
      "popChangePct": 4.23
    },
    {
      "year": 2007,
      "gdp": 8.556,
      "growth": 13.3,
      "perCapita": 330.3,
      "popChangePct": 1.81
    },
    {
      "year": 2008,
      "gdp": 10.297,
      "growth": 3.9,
      "perCapita": 389.6,
      "popChangePct": 2.02
    },
    {
      "year": 2009,
      "gdp": 12.066,
      "growth": 20.6,
      "perCapita": 440.6,
      "popChangePct": 3.63
    },
    {
      "year": 2010,
      "gdp": 15.325,
      "growth": 8.4,
      "perCapita": 543.7,
      "popChangePct": 2.94
    },
    {
      "year": 2011,
      "gdp": 17.89,
      "growth": 6.5,
      "perCapita": 611.6,
      "popChangePct": 3.76
    },
    {
      "year": 2012,
      "gdp": 20.293,
      "growth": 14,
      "perCapita": 666.1,
      "popChangePct": 4.16
    },
    {
      "year": 2013,
      "gdp": 20.17,
      "growth": 5.7,
      "perCapita": 639.5,
      "popChangePct": 3.53
    },
    {
      "year": 2014,
      "gdp": 20.616,
      "growth": 2.7,
      "perCapita": 630.1,
      "popChangePct": 3.73
    },
    {
      "year": 2015,
      "gdp": 20.057,
      "growth": 1,
      "perCapita": 594.2,
      "popChangePct": 3.17
    },
    {
      "year": 2016,
      "gdp": 18.02,
      "growth": 2.2,
      "perCapita": 520.3,
      "popChangePct": 2.62
    },
    {
      "year": 2017,
      "gdp": 18.883,
      "growth": 2.6,
      "perCapita": 529.8,
      "popChangePct": 2.91
    },
    {
      "year": 2018,
      "gdp": 18.336,
      "growth": 1.2,
      "perCapita": 499.8,
      "popChangePct": 2.93
    },
    {
      "year": 2019,
      "gdp": 18.876,
      "growth": 3.9,
      "perCapita": 499.8,
      "popChangePct": 2.95
    },
    {
      "year": 2020,
      "gdp": 20.136,
      "growth": -2.4,
      "perCapita": 516.7,
      "popChangePct": 3.19
    },
    {
      "year": 2021,
      "gdp": 14.278,
      "growth": -14.5,
      "perCapita": 356.1,
      "popChangePct": 2.89
    },
    {
      "year": 2022,
      "gdp": 14.501,
      "growth": -6.2,
      "perCapita": 357.3,
      "popChangePct": 1.2
    },
    {
      "year": 2023,
      "gdp": 17.248,
      "growth": 2.3,
      "perCapita": 416.1,
      "popChangePct": 2.16
    },
    {
      "year": 2024,
      "gdp": 17.817,
      "growth": 1.9,
      "perCapita": 417.8,
      "popChangePct": 2.88
    },
    {
      "year": 2025,
      "gdp": 19.662,
      "growth": 3,
      "perCapita": 448.5,
      "popChangePct": 2.81
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 2002,
      "gdpPPP": 22.742,
      "perCapitaPPP": 1082.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdpPPP": 25.206,
      "perCapitaPPP": 1113.1,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 7.83
    },
    {
      "year": 2004,
      "gdpPPP": 26.058,
      "perCapitaPPP": 1106.3,
      "perCapitaPPPChangePct": -0.61,
      "popChangePct": 4.01
    },
    {
      "year": 2005,
      "gdpPPP": 30.054,
      "perCapitaPPP": 1231.2,
      "perCapitaPPPChangePct": 11.28,
      "popChangePct": 3.64
    },
    {
      "year": 2006,
      "gdpPPP": 32.642,
      "perCapitaPPP": 1282.9,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 4.23
    },
    {
      "year": 2007,
      "gdpPPP": 37.999,
      "perCapitaPPP": 1466.9,
      "perCapitaPPPChangePct": 14.34,
      "popChangePct": 1.81
    },
    {
      "year": 2008,
      "gdpPPP": 40.227,
      "perCapitaPPP": 1522.2,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": 2.02
    },
    {
      "year": 2009,
      "gdpPPP": 48.807,
      "perCapitaPPP": 1782.2,
      "perCapitaPPPChangePct": 17.08,
      "popChangePct": 3.63
    },
    {
      "year": 2010,
      "gdpPPP": 53.568,
      "perCapitaPPP": 1900.3,
      "perCapitaPPPChangePct": 6.62,
      "popChangePct": 2.94
    },
    {
      "year": 2011,
      "gdpPPP": 58.216,
      "perCapitaPPP": 1990.3,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 3.76
    },
    {
      "year": 2012,
      "gdpPPP": 67.583,
      "perCapitaPPP": 2218.3,
      "perCapitaPPPChangePct": 11.45,
      "popChangePct": 4.16
    },
    {
      "year": 2013,
      "gdpPPP": 72.639,
      "perCapitaPPP": 2303.0,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 3.53
    },
    {
      "year": 2014,
      "gdpPPP": 75.898,
      "perCapitaPPP": 2319.9,
      "perCapitaPPPChangePct": 0.73,
      "popChangePct": 3.73
    },
    {
      "year": 2015,
      "gdpPPP": 77.358,
      "perCapitaPPP": 2291.9,
      "perCapitaPPPChangePct": -1.21,
      "popChangePct": 3.17
    },
    {
      "year": 2016,
      "gdpPPP": 79.784,
      "perCapitaPPP": 2303.5,
      "perCapitaPPPChangePct": 0.51,
      "popChangePct": 2.62
    },
    {
      "year": 2017,
      "gdpPPP": 83.362,
      "perCapitaPPP": 2338.8,
      "perCapitaPPPChangePct": 1.53,
      "popChangePct": 2.91
    },
    {
      "year": 2018,
      "gdpPPP": 89.369,
      "perCapitaPPP": 2436.0,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 2.93
    },
    {
      "year": 2019,
      "gdpPPP": 97.801,
      "perCapitaPPP": 2589.4,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 2.95
    },
    {
      "year": 2020,
      "gdpPPP": 100.898,
      "perCapitaPPP": 2589.0,
      "perCapitaPPPChangePct": -0.02,
      "popChangePct": 3.19
    },
    {
      "year": 2021,
      "gdpPPP": 85.768,
      "perCapitaPPP": 2138.9,
      "perCapitaPPPChangePct": -17.39,
      "popChangePct": 2.89
    },
    {
      "year": 2022,
      "gdpPPP": 86.135,
      "perCapitaPPP": 2122.6,
      "perCapitaPPPChangePct": -0.76,
      "popChangePct": 1.2
    },
    {
      "year": 2023,
      "gdpPPP": 91.347,
      "perCapitaPPP": 2203.5,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 2.16
    },
    {
      "year": 2024,
      "gdpPPP": 95.368,
      "perCapitaPPP": 2236.2,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 2.88
    },
    {
      "year": 2025,
      "gdpPPP": 101.02,
      "perCapitaPPP": 2304.1,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 2.81
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function AfghanistanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
