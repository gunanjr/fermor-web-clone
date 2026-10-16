import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Micronesia",
  "slug": "micronesia",
  "iso3": "FSM",
  "region": "Oceania",
  "rank2026": 210,
  "flagEmoji": "🇫🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Tonga",
      "slug": "tonga",
      "rank": 208
    },
    {
      "name": "Kiribati",
      "slug": "kiribati",
      "rank": 212
    }
  ],
  "history": [
    {
      "year": 1995,
      "gdp": 0.222,
      "growth": null,
      "perCapita": 2097.5,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdp": 0.221,
      "growth": -3.3,
      "perCapita": 2082.7,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdp": 0.207,
      "growth": -6.2,
      "perCapita": 1949.6,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdp": 0.219,
      "growth": 2.9,
      "perCapita": 2060.3,
      "popChangePct": 0.94
    },
    {
      "year": 1999,
      "gdp": 0.22,
      "growth": 1.1,
      "perCapita": 2064.8,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdp": 0.233,
      "growth": 4.3,
      "perCapita": 2176.0,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdp": 0.24,
      "growth": 2.1,
      "perCapita": 2250.8,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.24,
      "growth": 0.3,
      "perCapita": 2255.9,
      "popChangePct": -0.93
    },
    {
      "year": 2003,
      "gdp": 0.243,
      "growth": 1.6,
      "perCapita": 2289.0,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.236,
      "growth": -3.2,
      "perCapita": 2233.5,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.247,
      "growth": 2.4,
      "perCapita": 2340.7,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.25,
      "growth": -0.3,
      "perCapita": 2376.4,
      "popChangePct": -0.94
    },
    {
      "year": 2007,
      "gdp": 0.253,
      "growth": -1.7,
      "perCapita": 2421.6,
      "popChangePct": -0.95
    },
    {
      "year": 2008,
      "gdp": 0.261,
      "growth": -2.6,
      "perCapita": 2511.4,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.277,
      "growth": 1.1,
      "perCapita": 2678.3,
      "popChangePct": -0.96
    },
    {
      "year": 2010,
      "gdp": 0.292,
      "growth": 2,
      "perCapita": 2835.4,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.308,
      "growth": 3.8,
      "perCapita": 2975.4,
      "popChangePct": 0.97
    },
    {
      "year": 2012,
      "gdp": 0.324,
      "growth": -1.7,
      "perCapita": 3117.6,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 0.314,
      "growth": -3.7,
      "perCapita": 3022.1,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 0.316,
      "growth": -2.6,
      "perCapita": 3055.6,
      "popChangePct": -0.96
    },
    {
      "year": 2015,
      "gdp": 0.312,
      "growth": 4.5,
      "perCapita": 3036.3,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdp": 0.327,
      "growth": 1,
      "perCapita": 3208.2,
      "popChangePct": -0.97
    },
    {
      "year": 2017,
      "gdp": 0.361,
      "growth": 2.3,
      "perCapita": 3563.9,
      "popChangePct": -0.98
    },
    {
      "year": 2018,
      "gdp": 0.394,
      "growth": 0.5,
      "perCapita": 3960.7,
      "popChangePct": -0.99
    },
    {
      "year": 2019,
      "gdp": 0.395,
      "growth": 3.4,
      "perCapita": 4011.1,
      "popChangePct": -2.0
    },
    {
      "year": 2020,
      "gdp": 0.373,
      "growth": -2,
      "perCapita": 3837.8,
      "popChangePct": -1.02
    },
    {
      "year": 2021,
      "gdp": 0.392,
      "growth": 3.1,
      "perCapita": 4080.6,
      "popChangePct": -1.03
    },
    {
      "year": 2022,
      "gdp": 0.415,
      "growth": -3.1,
      "perCapita": 4381.6,
      "popChangePct": -1.04
    },
    {
      "year": 2023,
      "gdp": 0.443,
      "growth": 1.1,
      "perCapita": 4680.2,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 0.481,
      "growth": 2.3,
      "perCapita": 5089.0,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 0.502,
      "growth": 1.1,
      "perCapita": 5307.7,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 0.521,
      "growth": 0.7,
      "perCapita": 5513.8,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.548,
      "growth": 1.1,
      "perCapita": 5798.7,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 0.565,
      "growth": 1.4,
      "perCapita": 5980.5,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 0.583,
      "growth": 1,
      "perCapita": 6163.9,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdp": 0.598,
      "growth": 0.7,
      "perCapita": 6328.8,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.614,
      "growth": 0.7,
      "perCapita": 6498.1,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1995,
      "gdpPPP": 0.218,
      "perCapitaPPP": 2065.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdpPPP": 0.215,
      "perCapitaPPP": 2027.9,
      "perCapitaPPPChangePct": -1.81,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdpPPP": 0.205,
      "perCapitaPPP": 1929.4,
      "perCapitaPPPChangePct": -4.86,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdpPPP": 0.213,
      "perCapitaPPP": 2003.4,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 0.94
    },
    {
      "year": 1999,
      "gdpPPP": 0.219,
      "perCapitaPPP": 2049.5,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdpPPP": 0.233,
      "perCapitaPPP": 2181.0,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdpPPP": 0.244,
      "perCapitaPPP": 2283.0,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 0.248,
      "perCapitaPPP": 2330.9,
      "perCapitaPPPChangePct": 2.1,
      "popChangePct": -0.93
    },
    {
      "year": 2003,
      "gdpPPP": 0.257,
      "perCapitaPPP": 2420.4,
      "perCapitaPPPChangePct": 3.84,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.255,
      "perCapitaPPP": 2411.9,
      "perCapitaPPPChangePct": -0.35,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.27,
      "perCapitaPPP": 2553.7,
      "perCapitaPPPChangePct": 5.88,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.277,
      "perCapitaPPP": 2638.9,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": -0.94
    },
    {
      "year": 2007,
      "gdpPPP": 0.28,
      "perCapitaPPP": 2677.4,
      "perCapitaPPPChangePct": 1.46,
      "popChangePct": -0.95
    },
    {
      "year": 2008,
      "gdpPPP": 0.278,
      "perCapitaPPP": 2671.9,
      "perCapitaPPPChangePct": -0.21,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.282,
      "perCapitaPPP": 2731.4,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": -0.96
    },
    {
      "year": 2010,
      "gdpPPP": 0.292,
      "perCapitaPPP": 2835.9,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 0.309,
      "perCapitaPPP": 2980.6,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": 0.97
    },
    {
      "year": 2012,
      "gdpPPP": 0.309,
      "perCapitaPPP": 2978.5,
      "perCapitaPPPChangePct": -0.07,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 0.303,
      "perCapitaPPP": 2919.7,
      "perCapitaPPPChangePct": -1.98,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 0.3,
      "perCapitaPPP": 2903.1,
      "perCapitaPPPChangePct": -0.57,
      "popChangePct": -0.96
    },
    {
      "year": 2015,
      "gdpPPP": 0.317,
      "perCapitaPPP": 3080.7,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": 0.0
    },
    {
      "year": 2016,
      "gdpPPP": 0.323,
      "perCapitaPPP": 3168.7,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": -0.97
    },
    {
      "year": 2017,
      "gdpPPP": 0.336,
      "perCapitaPPP": 3322.9,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": -0.98
    },
    {
      "year": 2018,
      "gdpPPP": 0.346,
      "perCapitaPPP": 3471.0,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": -0.99
    },
    {
      "year": 2019,
      "gdpPPP": 0.363,
      "perCapitaPPP": 3692.5,
      "perCapitaPPPChangePct": 6.38,
      "popChangePct": -2.0
    },
    {
      "year": 2020,
      "gdpPPP": 0.361,
      "perCapitaPPP": 3713.5,
      "perCapitaPPPChangePct": 0.57,
      "popChangePct": -1.02
    },
    {
      "year": 2021,
      "gdpPPP": 0.389,
      "perCapitaPPP": 4053.3,
      "perCapitaPPPChangePct": 9.15,
      "popChangePct": -1.03
    },
    {
      "year": 2022,
      "gdpPPP": 0.404,
      "perCapitaPPP": 4259.6,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": -1.04
    },
    {
      "year": 2023,
      "gdpPPP": 0.423,
      "perCapitaPPP": 4472.8,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 0.444,
      "perCapitaPPP": 4694.7,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 0.461,
      "perCapitaPPP": 4879.1,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 0.478,
      "perCapitaPPP": 5052.3,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.493,
      "perCapitaPPP": 5219.6,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 0.509,
      "perCapitaPPP": 5381.5,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 0.523,
      "perCapitaPPP": 5534.5,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 0.0
    },
    {
      "year": 2030,
      "gdpPPP": 0.536,
      "perCapitaPPP": 5673.5,
      "perCapitaPPPChangePct": 2.51,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 0.55,
      "perCapitaPPP": 5814.1,
      "perCapitaPPPChangePct": 2.48,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MicronesiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
