import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Eritrea",
  "slug": "eritrea",
  "iso3": "ERI",
  "region": "Africa",
  "rank2026": 191,
  "flagEmoji": "🇪🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Antigua and Barbuda",
      "slug": "antigua-and-barbuda",
      "rank": 190
    },
    {
      "name": "Seychelles",
      "slug": "seychelles",
      "rank": 192
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.606,
      "growth": null,
      "perCapita": 268.2,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 0.374,
      "growth": 12.9,
      "perCapita": 167.1,
      "popChangePct": -0.84
    },
    {
      "year": 1994,
      "gdp": 0.433,
      "growth": 20.9,
      "perCapita": 195.4,
      "popChangePct": -0.94
    },
    {
      "year": 1995,
      "gdp": 0.483,
      "growth": 2.3,
      "perCapita": 219.1,
      "popChangePct": -0.63
    },
    {
      "year": 1996,
      "gdp": 0.579,
      "growth": 9.1,
      "perCapita": 263.8,
      "popChangePct": -0.36
    },
    {
      "year": 1997,
      "gdp": 0.594,
      "growth": 7.9,
      "perCapita": 270.6,
      "popChangePct": -0.05
    },
    {
      "year": 1998,
      "gdp": 0.626,
      "growth": 2,
      "perCapita": 283.9,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdp": 0.614,
      "growth": 0.2,
      "perCapita": 274.6,
      "popChangePct": 1.41
    },
    {
      "year": 2000,
      "gdp": 0.547,
      "growth": -12.4,
      "perCapita": 238.5,
      "popChangePct": 2.46
    },
    {
      "year": 2001,
      "gdp": 0.582,
      "growth": 8.8,
      "perCapita": 245.2,
      "popChangePct": 3.62
    },
    {
      "year": 2002,
      "gdp": 0.564,
      "growth": 3,
      "perCapita": 227.5,
      "popChangePct": 4.46
    },
    {
      "year": 2003,
      "gdp": 0.673,
      "growth": -2.7,
      "perCapita": 258.9,
      "popChangePct": 4.84
    },
    {
      "year": 2004,
      "gdp": 0.858,
      "growth": 1.5,
      "perCapita": 315.6,
      "popChangePct": 4.58
    },
    {
      "year": 2005,
      "gdp": 0.85,
      "growth": 2.6,
      "perCapita": 300.7,
      "popChangePct": 3.93
    },
    {
      "year": 2006,
      "gdp": 0.937,
      "growth": -1,
      "perCapita": 321.2,
      "popChangePct": 3.22
    },
    {
      "year": 2007,
      "gdp": 1.02,
      "growth": 1.4,
      "perCapita": 340.3,
      "popChangePct": 2.71
    },
    {
      "year": 2008,
      "gdp": 0.923,
      "growth": -19.4,
      "perCapita": 301.2,
      "popChangePct": 2.2
    },
    {
      "year": 2009,
      "gdp": 1.297,
      "growth": 12.2,
      "perCapita": 415.6,
      "popChangePct": 1.86
    },
    {
      "year": 2010,
      "gdp": 1.59,
      "growth": 10.9,
      "perCapita": 501.4,
      "popChangePct": 1.6
    },
    {
      "year": 2011,
      "gdp": 2.065,
      "growth": 25.7,
      "perCapita": 642.5,
      "popChangePct": 1.39
    },
    {
      "year": 2012,
      "gdp": 2.255,
      "growth": 1.9,
      "perCapita": 693.8,
      "popChangePct": 1.12
    },
    {
      "year": 2013,
      "gdp": 1.958,
      "growth": -10.5,
      "perCapita": 596.8,
      "popChangePct": 0.95
    },
    {
      "year": 2014,
      "gdp": 2.604,
      "growth": 30.9,
      "perCapita": 786.5,
      "popChangePct": 0.91
    },
    {
      "year": 2015,
      "gdp": 2.016,
      "growth": -20.6,
      "perCapita": 603.2,
      "popChangePct": 0.97
    },
    {
      "year": 2016,
      "gdp": 2.213,
      "growth": 7.4,
      "perCapita": 655.4,
      "popChangePct": 1.02
    },
    {
      "year": 2017,
      "gdp": 1.904,
      "growth": -10,
      "perCapita": 557.9,
      "popChangePct": 1.07
    },
    {
      "year": 2018,
      "gdp": 2.006,
      "growth": 13,
      "perCapita": 580.8,
      "popChangePct": 1.17
    },
    {
      "year": 2019,
      "gdp": 1.982,
      "growth": 3.8,
      "perCapita": 566.7,
      "popChangePct": 1.27
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 1.723,
      "perCapitaPPP": 763.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 1.991,
      "perCapitaPPP": 889.3,
      "perCapitaPPPChangePct": 16.54,
      "popChangePct": -0.84
    },
    {
      "year": 1994,
      "gdpPPP": 2.459,
      "perCapitaPPP": 1108.7,
      "perCapitaPPPChangePct": 24.67,
      "popChangePct": -0.94
    },
    {
      "year": 1995,
      "gdpPPP": 2.569,
      "perCapitaPPP": 1165.6,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": -0.63
    },
    {
      "year": 1996,
      "gdpPPP": 2.855,
      "perCapitaPPP": 1300.1,
      "perCapitaPPPChangePct": 11.54,
      "popChangePct": -0.36
    },
    {
      "year": 1997,
      "gdpPPP": 3.134,
      "perCapitaPPP": 1427.6,
      "perCapitaPPPChangePct": 9.81,
      "popChangePct": -0.05
    },
    {
      "year": 1998,
      "gdpPPP": 3.231,
      "perCapitaPPP": 1464.7,
      "perCapitaPPPChangePct": 2.6,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdpPPP": 3.283,
      "perCapitaPPP": 1467.6,
      "perCapitaPPPChangePct": 0.2,
      "popChangePct": 1.41
    },
    {
      "year": 2000,
      "gdpPPP": 2.943,
      "perCapitaPPP": 1283.8,
      "perCapitaPPPChangePct": -12.52,
      "popChangePct": 2.46
    },
    {
      "year": 2001,
      "gdpPPP": 3.272,
      "perCapitaPPP": 1377.8,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 3.62
    },
    {
      "year": 2002,
      "gdpPPP": 3.423,
      "perCapitaPPP": 1379.7,
      "perCapitaPPPChangePct": 0.14,
      "popChangePct": 4.46
    },
    {
      "year": 2003,
      "gdpPPP": 3.398,
      "perCapitaPPP": 1306.3,
      "perCapitaPPPChangePct": -5.31,
      "popChangePct": 4.84
    },
    {
      "year": 2004,
      "gdpPPP": 3.54,
      "perCapitaPPP": 1301.4,
      "perCapitaPPPChangePct": -0.38,
      "popChangePct": 4.58
    },
    {
      "year": 2005,
      "gdpPPP": 3.745,
      "perCapitaPPP": 1324.7,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 3.93
    },
    {
      "year": 2006,
      "gdpPPP": 3.823,
      "perCapitaPPP": 1310.1,
      "perCapitaPPPChangePct": -1.1,
      "popChangePct": 3.22
    },
    {
      "year": 2007,
      "gdpPPP": 3.982,
      "perCapitaPPP": 1328.8,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 2.71
    },
    {
      "year": 2008,
      "gdpPPP": 3.27,
      "perCapitaPPP": 1067.7,
      "perCapitaPPPChangePct": -19.65,
      "popChangePct": 2.2
    },
    {
      "year": 2009,
      "gdpPPP": 3.691,
      "perCapitaPPP": 1183.1,
      "perCapitaPPPChangePct": 10.81,
      "popChangePct": 1.86
    },
    {
      "year": 2010,
      "gdpPPP": 4.141,
      "perCapitaPPP": 1306.5,
      "perCapitaPPPChangePct": 10.43,
      "popChangePct": 1.6
    },
    {
      "year": 2011,
      "gdpPPP": 5.314,
      "perCapitaPPP": 1653.3,
      "perCapitaPPPChangePct": 26.55,
      "popChangePct": 1.39
    },
    {
      "year": 2012,
      "gdpPPP": 5.515,
      "perCapitaPPP": 1696.8,
      "perCapitaPPPChangePct": 2.63,
      "popChangePct": 1.12
    },
    {
      "year": 2013,
      "gdpPPP": 5.022,
      "perCapitaPPP": 1530.7,
      "perCapitaPPPChangePct": -9.79,
      "popChangePct": 0.95
    },
    {
      "year": 2014,
      "gdpPPP": 6.69,
      "perCapitaPPP": 2020.6,
      "perCapitaPPPChangePct": 32.01,
      "popChangePct": 0.91
    },
    {
      "year": 2015,
      "gdpPPP": 5.36,
      "perCapitaPPP": 1603.3,
      "perCapitaPPPChangePct": -20.65,
      "popChangePct": 0.97
    },
    {
      "year": 2016,
      "gdpPPP": 5.811,
      "perCapitaPPP": 1720.7,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 1.02
    },
    {
      "year": 2017,
      "gdpPPP": 5.322,
      "perCapitaPPP": 1559.5,
      "perCapitaPPPChangePct": -9.37,
      "popChangePct": 1.07
    },
    {
      "year": 2018,
      "gdpPPP": 6.095,
      "perCapitaPPP": 1765.1,
      "perCapitaPPPChangePct": 13.18,
      "popChangePct": 1.17
    },
    {
      "year": 2019,
      "gdpPPP": 6.369,
      "perCapitaPPP": 1821.3,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 1.27
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function EritreaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
