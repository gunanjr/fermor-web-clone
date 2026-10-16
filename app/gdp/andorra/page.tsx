import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Andorra",
  "slug": "andorra",
  "iso3": "AND",
  "region": "Europe",
  "rank2026": 174,
  "flagEmoji": "🇦🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Liberia",
      "slug": "liberia",
      "rank": 173
    },
    {
      "name": "Djibouti",
      "slug": "djibouti",
      "rank": 175
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 1.429,
      "growth": null,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 1.547,
      "growth": 8.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdp": 1.758,
      "growth": 4.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdp": 2.362,
      "growth": 8.7,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2004,
      "gdp": 2.896,
      "growth": 8.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2005,
      "gdp": 3.158,
      "growth": 5.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2006,
      "gdp": 3.456,
      "growth": 4.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2007,
      "gdp": 3.952,
      "growth": 1.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2008,
      "gdp": 4.082,
      "growth": -5.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2009,
      "gdp": 3.675,
      "growth": -5.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2010,
      "gdp": 3.446,
      "growth": -2,
      "perCapita": 49030.2,
      "popChangePct": null
    },
    {
      "year": 2011,
      "gdp": 3.625,
      "growth": 0,
      "perCapita": 51957.3,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 3.189,
      "growth": -5,
      "perCapita": 45714.0,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 3.193,
      "growth": -3.5,
      "perCapita": 45630.2,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 3.267,
      "growth": 2.5,
      "perCapita": 46299.3,
      "popChangePct": 1.43
    },
    {
      "year": 2015,
      "gdp": 2.789,
      "growth": 1.4,
      "perCapita": 38877.5,
      "popChangePct": 1.41
    },
    {
      "year": 2016,
      "gdp": 2.895,
      "growth": 3.7,
      "perCapita": 39595.3,
      "popChangePct": 1.39
    },
    {
      "year": 2017,
      "gdp": 2.993,
      "growth": 0.3,
      "perCapita": 40017.7,
      "popChangePct": 2.74
    },
    {
      "year": 2018,
      "gdp": 3.217,
      "growth": 1.6,
      "perCapita": 42229.9,
      "popChangePct": 1.33
    },
    {
      "year": 2019,
      "gdp": 3.155,
      "growth": 2,
      "perCapita": 40688.5,
      "popChangePct": 2.63
    },
    {
      "year": 2020,
      "gdp": 2.885,
      "growth": -11.2,
      "perCapita": 36973.8,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 3.325,
      "growth": 8.3,
      "perCapita": 41806.9,
      "popChangePct": 2.56
    },
    {
      "year": 2022,
      "gdp": 3.376,
      "growth": 9.6,
      "perCapita": 41378.9,
      "popChangePct": 2.5
    },
    {
      "year": 2023,
      "gdp": 3.786,
      "growth": 2.6,
      "perCapita": 44483.6,
      "popChangePct": 3.66
    },
    {
      "year": 2024,
      "gdp": 4.042,
      "growth": 3.8,
      "perCapita": 46409.9,
      "popChangePct": 2.35
    },
    {
      "year": 2025,
      "gdp": 4.491,
      "growth": 3.9,
      "perCapita": 50378.9,
      "popChangePct": 2.3
    },
    {
      "year": 2026,
      "gdp": 4.879,
      "growth": 2.1,
      "perCapita": 53474.5,
      "popChangePct": 2.25
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 5.065,
      "growth": 1.8,
      "perCapita": 54250.4,
      "popChangePct": 2.2
    },
    {
      "year": 2028,
      "gdp": 5.245,
      "growth": 1.7,
      "perCapita": 54889.6,
      "popChangePct": 3.23
    },
    {
      "year": 2029,
      "gdp": 5.43,
      "growth": 1.6,
      "perCapita": 55524.1,
      "popChangePct": 2.08
    },
    {
      "year": 2030,
      "gdp": 5.617,
      "growth": 1.5,
      "perCapita": 56118.2,
      "popChangePct": 2.04
    },
    {
      "year": 2031,
      "gdp": 5.878,
      "growth": 1.5,
      "perCapita": 57376.8,
      "popChangePct": 2.0
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 2.198,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 2.43,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdpPPP": 2.58,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdpPPP": 2.859,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2004,
      "gdpPPP": 3.175,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2005,
      "gdpPPP": 3.451,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2006,
      "gdpPPP": 3.729,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2007,
      "gdpPPP": 3.889,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2008,
      "gdpPPP": 3.744,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2009,
      "gdpPPP": 3.567,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2010,
      "gdpPPP": 3.539,
      "perCapitaPPP": 50351.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2011,
      "gdpPPP": 3.612,
      "perCapitaPPP": 51767.8,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 3.496,
      "perCapitaPPP": 50118.6,
      "perCapitaPPPChangePct": -3.19,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 3.43,
      "perCapitaPPP": 49017.2,
      "perCapitaPPPChangePct": -2.2,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 3.577,
      "perCapitaPPP": 50682.4,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 1.43
    },
    {
      "year": 2015,
      "gdpPPP": 3.662,
      "perCapitaPPP": 51045.9,
      "perCapitaPPPChangePct": 0.72,
      "popChangePct": 1.41
    },
    {
      "year": 2016,
      "gdpPPP": 3.834,
      "perCapitaPPP": 52438.8,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 1.39
    },
    {
      "year": 2017,
      "gdpPPP": 3.916,
      "perCapitaPPP": 52353.1,
      "perCapitaPPPChangePct": -0.16,
      "popChangePct": 2.74
    },
    {
      "year": 2018,
      "gdpPPP": 4.152,
      "perCapitaPPP": 54508.6,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 1.33
    },
    {
      "year": 2019,
      "gdpPPP": 4.395,
      "perCapitaPPP": 56682.7,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.63
    },
    {
      "year": 2020,
      "gdpPPP": 4.031,
      "perCapitaPPP": 51671.8,
      "perCapitaPPPChangePct": -8.84,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 4.65,
      "perCapitaPPP": 58458.7,
      "perCapitaPPPChangePct": 13.13,
      "popChangePct": 2.56
    },
    {
      "year": 2022,
      "gdpPPP": 5.457,
      "perCapitaPPP": 66879.2,
      "perCapitaPPPChangePct": 14.4,
      "popChangePct": 2.5
    },
    {
      "year": 2023,
      "gdpPPP": 5.805,
      "perCapitaPPP": 68208.6,
      "perCapitaPPPChangePct": 1.99,
      "popChangePct": 3.66
    },
    {
      "year": 2024,
      "gdpPPP": 6.178,
      "perCapitaPPP": 70928.9,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.35
    },
    {
      "year": 2025,
      "gdpPPP": 6.601,
      "perCapitaPPP": 74049.0,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 2.3
    },
    {
      "year": 2026,
      "gdpPPP": 6.932,
      "perCapitaPPP": 75987.7,
      "perCapitaPPPChangePct": 2.62,
      "popChangePct": 2.25
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 7.215,
      "perCapitaPPP": 77272.8,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": 2.2
    },
    {
      "year": 2028,
      "gdpPPP": 7.458,
      "perCapitaPPP": 78045.8,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 3.23
    },
    {
      "year": 2029,
      "gdpPPP": 7.712,
      "perCapitaPPP": 78855.0,
      "perCapitaPPPChangePct": 1.04,
      "popChangePct": 2.08
    },
    {
      "year": 2030,
      "gdpPPP": 7.972,
      "perCapitaPPP": 79640.6,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 2.04
    },
    {
      "year": 2031,
      "gdpPPP": 8.237,
      "perCapitaPPP": 80408.6,
      "perCapitaPPPChangePct": 0.96,
      "popChangePct": 2.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AndorraGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
