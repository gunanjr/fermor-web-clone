import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Syria",
  "slug": "syria",
  "iso3": "SYR",
  "region": "Asia",
  "rank2026": 139,
  "flagEmoji": "🇸🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Tajikistan",
      "slug": "tajikistan",
      "rank": 138
    },
    {
      "name": "Afghanistan",
      "slug": "afghanistan",
      "rank": 140
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 12.98,
      "growth": 10.5,
      "perCapita": 1421.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 16.652,
      "growth": 8.5,
      "perCapita": 1763.3,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdp": 17.415,
      "growth": 2.6,
      "perCapita": 1784.6,
      "popChangePct": 3.32
    },
    {
      "year": 1983,
      "gdp": 18.649,
      "growth": 1.6,
      "perCapita": 1849.4,
      "popChangePct": 3.34
    },
    {
      "year": 1984,
      "gdp": 19.171,
      "growth": -6.5,
      "perCapita": 1839.9,
      "popChangePct": 3.32
    },
    {
      "year": 1985,
      "gdp": 21.177,
      "growth": 7.3,
      "perCapita": 1965.1,
      "popChangePct": 3.43
    },
    {
      "year": 1986,
      "gdp": 25.428,
      "growth": -4.8,
      "perCapita": 2284.0,
      "popChangePct": 3.31
    },
    {
      "year": 1987,
      "gdp": 32.497,
      "growth": 1.3,
      "perCapita": 2823.2,
      "popChangePct": 3.4
    },
    {
      "year": 1988,
      "gdp": 16.538,
      "growth": 12.7,
      "perCapita": 1389.8,
      "popChangePct": 3.37
    },
    {
      "year": 1989,
      "gdp": 9.849,
      "growth": -6.1,
      "perCapita": 800.9,
      "popChangePct": 3.35
    },
    {
      "year": 1990,
      "gdp": 12.303,
      "growth": 10.4,
      "perCapita": 967.1,
      "popChangePct": 3.44
    },
    {
      "year": 1991,
      "gdp": 12.738,
      "growth": 10.7,
      "perCapita": 972.2,
      "popChangePct": 3.0
    },
    {
      "year": 1992,
      "gdp": 13.263,
      "growth": 13.2,
      "perCapita": 983.6,
      "popChangePct": 2.92
    },
    {
      "year": 1993,
      "gdp": 13.796,
      "growth": 7.4,
      "perCapita": 995.1,
      "popChangePct": 2.83
    },
    {
      "year": 1994,
      "gdp": 15.105,
      "growth": 5.5,
      "perCapita": 1060.7,
      "popChangePct": 2.71
    },
    {
      "year": 1995,
      "gdp": 16.556,
      "growth": 5.4,
      "perCapita": 1133.2,
      "popChangePct": 2.59
    },
    {
      "year": 1996,
      "gdp": 17.761,
      "growth": 3,
      "perCapita": 1186.2,
      "popChangePct": 2.48
    },
    {
      "year": 1997,
      "gdp": 16.573,
      "growth": -1.1,
      "perCapita": 1080.8,
      "popChangePct": 2.41
    },
    {
      "year": 1998,
      "gdp": 16.144,
      "growth": 5.6,
      "perCapita": 1028.2,
      "popChangePct": 2.4
    },
    {
      "year": 1999,
      "gdp": 16.785,
      "growth": -3.1,
      "perCapita": 1043.2,
      "popChangePct": 2.48
    },
    {
      "year": 2000,
      "gdp": 19.861,
      "growth": 2.3,
      "perCapita": 1202.9,
      "popChangePct": 2.61
    },
    {
      "year": 2001,
      "gdp": 20.979,
      "growth": 3.7,
      "perCapita": 1236.9,
      "popChangePct": 2.73
    },
    {
      "year": 2002,
      "gdp": 22.758,
      "growth": 5.9,
      "perCapita": 1305.1,
      "popChangePct": 2.81
    },
    {
      "year": 2003,
      "gdp": 21.702,
      "growth": -2,
      "perCapita": 1208.9,
      "popChangePct": 2.95
    },
    {
      "year": 2004,
      "gdp": 25.204,
      "growth": 6.9,
      "perCapita": 1361.5,
      "popChangePct": 3.12
    },
    {
      "year": 2005,
      "gdp": 28.881,
      "growth": 6.2,
      "perCapita": 1510.4,
      "popChangePct": 3.29
    },
    {
      "year": 2006,
      "gdp": 33.824,
      "growth": 5,
      "perCapita": 1726.0,
      "popChangePct": 2.48
    },
    {
      "year": 2007,
      "gdp": 40.488,
      "growth": 5.7,
      "perCapita": 2016.1,
      "popChangePct": 2.49
    },
    {
      "year": 2008,
      "gdp": 52.631,
      "growth": 4.5,
      "perCapita": 2557.2,
      "popChangePct": 2.48
    },
    {
      "year": 2009,
      "gdp": 53.939,
      "growth": 5.9,
      "perCapita": 2557.3,
      "popChangePct": 2.48
    },
    {
      "year": 2010,
      "gdp": 60.043,
      "growth": 3.4,
      "perCapita": 2806.7,
      "popChangePct": 1.43
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 18.923,
      "perCapitaPPP": 2072.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 22.466,
      "perCapitaPPP": 2378.9,
      "perCapitaPPPChangePct": 14.77,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdpPPP": 24.47,
      "perCapitaPPP": 2507.6,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 3.32
    },
    {
      "year": 1983,
      "gdpPPP": 25.836,
      "perCapitaPPP": 2562.2,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": 3.34
    },
    {
      "year": 1984,
      "gdpPPP": 25.029,
      "perCapitaPPP": 2402.2,
      "perCapitaPPPChangePct": -6.25,
      "popChangePct": 3.32
    },
    {
      "year": 1985,
      "gdpPPP": 27.705,
      "perCapitaPPP": 2570.9,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": 3.43
    },
    {
      "year": 1986,
      "gdpPPP": 26.918,
      "perCapitaPPP": 2417.9,
      "perCapitaPPPChangePct": -5.95,
      "popChangePct": 3.31
    },
    {
      "year": 1987,
      "gdpPPP": 27.931,
      "perCapitaPPP": 2426.5,
      "perCapitaPPPChangePct": 0.36,
      "popChangePct": 3.4
    },
    {
      "year": 1988,
      "gdpPPP": 32.594,
      "perCapitaPPP": 2739.2,
      "perCapitaPPPChangePct": 12.89,
      "popChangePct": 3.37
    },
    {
      "year": 1989,
      "gdpPPP": 31.817,
      "perCapitaPPP": 2587.2,
      "perCapitaPPPChangePct": -5.55,
      "popChangePct": 3.35
    },
    {
      "year": 1990,
      "gdpPPP": 36.426,
      "perCapitaPPP": 2863.5,
      "perCapitaPPPChangePct": 10.68,
      "popChangePct": 3.44
    },
    {
      "year": 1991,
      "gdpPPP": 41.698,
      "perCapitaPPP": 3182.5,
      "perCapitaPPPChangePct": 11.14,
      "popChangePct": 3.0
    },
    {
      "year": 1992,
      "gdpPPP": 48.298,
      "perCapitaPPP": 3581.8,
      "perCapitaPPPChangePct": 12.54,
      "popChangePct": 2.92
    },
    {
      "year": 1993,
      "gdpPPP": 53.105,
      "perCapitaPPP": 3830.2,
      "perCapitaPPPChangePct": 6.94,
      "popChangePct": 2.83
    },
    {
      "year": 1994,
      "gdpPPP": 57.241,
      "perCapitaPPP": 4019.6,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 2.71
    },
    {
      "year": 1995,
      "gdpPPP": 61.61,
      "perCapitaPPP": 4216.9,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 2.59
    },
    {
      "year": 1996,
      "gdpPPP": 64.599,
      "perCapitaPPP": 4314.3,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 2.48
    },
    {
      "year": 1997,
      "gdpPPP": 64.997,
      "perCapitaPPP": 4238.8,
      "perCapitaPPPChangePct": -1.75,
      "popChangePct": 2.41
    },
    {
      "year": 1998,
      "gdpPPP": 69.378,
      "perCapitaPPP": 4418.5,
      "perCapitaPPPChangePct": 4.24,
      "popChangePct": 2.4
    },
    {
      "year": 1999,
      "gdpPPP": 68.163,
      "perCapitaPPP": 4236.2,
      "perCapitaPPPChangePct": -4.13,
      "popChangePct": 2.48
    },
    {
      "year": 2000,
      "gdpPPP": 71.307,
      "perCapitaPPP": 4318.8,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": 2.61
    },
    {
      "year": 2001,
      "gdpPPP": 75.596,
      "perCapitaPPP": 4457.1,
      "perCapitaPPPChangePct": 3.2,
      "popChangePct": 2.73
    },
    {
      "year": 2002,
      "gdpPPP": 81.297,
      "perCapitaPPP": 4662.0,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 2.81
    },
    {
      "year": 2003,
      "gdpPPP": 81.214,
      "perCapitaPPP": 4524.0,
      "perCapitaPPPChangePct": -2.96,
      "popChangePct": 2.95
    },
    {
      "year": 2004,
      "gdpPPP": 89.154,
      "perCapitaPPP": 4816.1,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 3.12
    },
    {
      "year": 2005,
      "gdpPPP": 97.665,
      "perCapitaPPP": 5107.6,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 3.29
    },
    {
      "year": 2006,
      "gdpPPP": 105.757,
      "perCapitaPPP": 5396.8,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 2.48
    },
    {
      "year": 2007,
      "gdpPPP": 114.786,
      "perCapitaPPP": 5715.7,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 2.49
    },
    {
      "year": 2008,
      "gdpPPP": 122.235,
      "perCapitaPPP": 5939.1,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 2.48
    },
    {
      "year": 2009,
      "gdpPPP": 130.26,
      "perCapitaPPP": 6175.7,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 2.48
    },
    {
      "year": 2010,
      "gdpPPP": 136.379,
      "perCapitaPPP": 6375.0,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": 1.43
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function SyriaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
