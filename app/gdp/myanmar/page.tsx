import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Myanmar",
  "slug": "myanmar",
  "iso3": "MMR",
  "region": "Asia",
  "rank2026": 88,
  "flagEmoji": "🇲🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Slovenia",
      "slug": "slovenia",
      "rank": 87
    },
    {
      "name": "Turkmenistan",
      "slug": "turkmenistan",
      "rank": 89
    }
  ],
  "history": [
    {
      "year": 1998,
      "gdp": 5.122,
      "growth": null,
      "perCapita": 115.7,
      "popChangePct": null
    },
    {
      "year": 1999,
      "gdp": 6.4,
      "growth": 8.4,
      "perCapita": 142.5,
      "popChangePct": 1.43
    },
    {
      "year": 2000,
      "gdp": 7.688,
      "growth": 12.4,
      "perCapita": 168.9,
      "popChangePct": 1.34
    },
    {
      "year": 2001,
      "gdp": 7.087,
      "growth": 12.5,
      "perCapita": 153.9,
      "popChangePct": 1.19
    },
    {
      "year": 2002,
      "gdp": 6.878,
      "growth": 9.9,
      "perCapita": 147.9,
      "popChangePct": 1.01
    },
    {
      "year": 2003,
      "gdp": 8.826,
      "growth": 13.2,
      "perCapita": 188.2,
      "popChangePct": 0.83
    },
    {
      "year": 2004,
      "gdp": 10.688,
      "growth": 15.3,
      "perCapita": 226.3,
      "popChangePct": 0.7
    },
    {
      "year": 2005,
      "gdp": 12.051,
      "growth": 13.6,
      "perCapita": 253.6,
      "popChangePct": 0.62
    },
    {
      "year": 2006,
      "gdp": 13.502,
      "growth": 13.3,
      "perCapita": 282.4,
      "popChangePct": 0.61
    },
    {
      "year": 2007,
      "gdp": 17.745,
      "growth": 12.5,
      "perCapita": 368.8,
      "popChangePct": 0.63
    },
    {
      "year": 2008,
      "gdp": 25.313,
      "growth": 7.6,
      "perCapita": 522.8,
      "popChangePct": 0.64
    },
    {
      "year": 2009,
      "gdp": 30.675,
      "growth": 4.4,
      "perCapita": 629.3,
      "popChangePct": 0.66
    },
    {
      "year": 2010,
      "gdp": 37.851,
      "growth": 5.2,
      "perCapita": 771.1,
      "popChangePct": 0.7
    },
    {
      "year": 2011,
      "gdp": 53.25,
      "growth": 5.5,
      "perCapita": 1076.9,
      "popChangePct": 0.74
    },
    {
      "year": 2012,
      "gdp": 58.374,
      "growth": 6.5,
      "perCapita": 1171.4,
      "popChangePct": 0.78
    },
    {
      "year": 2013,
      "gdp": 62.656,
      "growth": 7.9,
      "perCapita": 1247.0,
      "popChangePct": 0.83
    },
    {
      "year": 2014,
      "gdp": 65.404,
      "growth": 8.2,
      "perCapita": 1290.5,
      "popChangePct": 0.86
    },
    {
      "year": 2015,
      "gdp": 59.33,
      "growth": 5.9,
      "perCapita": 1161.3,
      "popChangePct": 0.8
    },
    {
      "year": 2016,
      "gdp": 62.839,
      "growth": 6.8,
      "perCapita": 1220.3,
      "popChangePct": 0.8
    },
    {
      "year": 2017,
      "gdp": 66.083,
      "growth": 6.1,
      "perCapita": 1273.4,
      "popChangePct": 0.77
    },
    {
      "year": 2018,
      "gdp": 67.491,
      "growth": 6.3,
      "perCapita": 1291.2,
      "popChangePct": 0.73
    },
    {
      "year": 2019,
      "gdp": 75.282,
      "growth": 6.6,
      "perCapita": 1430.1,
      "popChangePct": 0.71
    },
    {
      "year": 2020,
      "gdp": 77.026,
      "growth": -9,
      "perCapita": 1452.9,
      "popChangePct": 0.71
    },
    {
      "year": 2021,
      "gdp": 55.26,
      "growth": -12,
      "perCapita": 1035.1,
      "popChangePct": 0.7
    },
    {
      "year": 2022,
      "gdp": 67.437,
      "growth": 4,
      "perCapita": 1254.5,
      "popChangePct": 0.69
    },
    {
      "year": 2023,
      "gdp": 66.821,
      "growth": 1,
      "perCapita": 1234.4,
      "popChangePct": 0.7
    },
    {
      "year": 2024,
      "gdp": 76.759,
      "growth": -1,
      "perCapita": 1408.4,
      "popChangePct": 0.68
    },
    {
      "year": 2025,
      "gdp": 82.4,
      "growth": -2,
      "perCapita": 1502.3,
      "popChangePct": 0.64
    },
    {
      "year": 2026,
      "gdp": 83.832,
      "growth": 3,
      "perCapita": 1519.1,
      "popChangePct": 0.61
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 86.885,
      "growth": 3,
      "perCapita": 1565.4,
      "popChangePct": 0.57
    },
    {
      "year": 2028,
      "gdp": 94.087,
      "growth": 2.5,
      "perCapita": 1686.1,
      "popChangePct": 0.54
    },
    {
      "year": 2029,
      "gdp": 103.415,
      "growth": 2.2,
      "perCapita": 1843.9,
      "popChangePct": 0.51
    },
    {
      "year": 2030,
      "gdp": 107.607,
      "growth": 1.8,
      "perCapita": 1909.6,
      "popChangePct": 0.47
    },
    {
      "year": 2031,
      "gdp": 111.972,
      "growth": 1.8,
      "perCapita": 1978.2,
      "popChangePct": 0.45
    }
  ],
  "pppHistory": [
    {
      "year": 1998,
      "gdpPPP": 32.357,
      "perCapitaPPP": 730.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1999,
      "gdpPPP": 35.582,
      "perCapitaPPP": 792.2,
      "perCapitaPPPChangePct": 8.41,
      "popChangePct": 1.43
    },
    {
      "year": 2000,
      "gdpPPP": 40.906,
      "perCapitaPPP": 898.7,
      "perCapitaPPPChangePct": 13.44,
      "popChangePct": 1.34
    },
    {
      "year": 2001,
      "gdpPPP": 47.042,
      "perCapitaPPP": 1021.4,
      "perCapitaPPPChangePct": 13.65,
      "popChangePct": 1.19
    },
    {
      "year": 2002,
      "gdpPPP": 52.516,
      "perCapitaPPP": 1128.9,
      "perCapitaPPPChangePct": 10.53,
      "popChangePct": 1.01
    },
    {
      "year": 2003,
      "gdpPPP": 60.62,
      "perCapitaPPP": 1292.4,
      "perCapitaPPPChangePct": 14.48,
      "popChangePct": 0.83
    },
    {
      "year": 2004,
      "gdpPPP": 71.785,
      "perCapitaPPP": 1519.8,
      "perCapitaPPPChangePct": 17.6,
      "popChangePct": 0.7
    },
    {
      "year": 2005,
      "gdpPPP": 84.08,
      "perCapitaPPP": 1769.2,
      "perCapitaPPPChangePct": 16.41,
      "popChangePct": 0.62
    },
    {
      "year": 2006,
      "gdpPPP": 98.207,
      "perCapitaPPP": 2053.9,
      "perCapitaPPPChangePct": 16.1,
      "popChangePct": 0.61
    },
    {
      "year": 2007,
      "gdpPPP": 113.477,
      "perCapitaPPP": 2358.5,
      "perCapitaPPPChangePct": 14.83,
      "popChangePct": 0.63
    },
    {
      "year": 2008,
      "gdpPPP": 124.405,
      "perCapitaPPP": 2569.1,
      "perCapitaPPPChangePct": 8.93,
      "popChangePct": 0.64
    },
    {
      "year": 2009,
      "gdpPPP": 130.661,
      "perCapitaPPP": 2680.5,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 0.66
    },
    {
      "year": 2010,
      "gdpPPP": 139.188,
      "perCapitaPPP": 2835.7,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 0.7
    },
    {
      "year": 2011,
      "gdpPPP": 149.832,
      "perCapitaPPP": 3030.2,
      "perCapitaPPPChangePct": 6.86,
      "popChangePct": 0.74
    },
    {
      "year": 2012,
      "gdpPPP": 162.521,
      "perCapitaPPP": 3261.3,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 0.78
    },
    {
      "year": 2013,
      "gdpPPP": 178.343,
      "perCapitaPPP": 3549.3,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 0.83
    },
    {
      "year": 2014,
      "gdpPPP": 196.327,
      "perCapitaPPP": 3873.7,
      "perCapitaPPPChangePct": 9.14,
      "popChangePct": 0.86
    },
    {
      "year": 2015,
      "gdpPPP": 209.766,
      "perCapitaPPP": 4105.9,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": 0.8
    },
    {
      "year": 2016,
      "gdpPPP": 226.071,
      "perCapitaPPP": 4390.1,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 0.8
    },
    {
      "year": 2017,
      "gdpPPP": 244.24,
      "perCapitaPPP": 4706.4,
      "perCapitaPPPChangePct": 7.21,
      "popChangePct": 0.77
    },
    {
      "year": 2018,
      "gdpPPP": 291.769,
      "perCapitaPPP": 5581.7,
      "perCapitaPPPChangePct": 18.6,
      "popChangePct": 0.73
    },
    {
      "year": 2019,
      "gdpPPP": 320.969,
      "perCapitaPPP": 6097.4,
      "perCapitaPPPChangePct": 9.24,
      "popChangePct": 0.71
    },
    {
      "year": 2020,
      "gdpPPP": 296.153,
      "perCapitaPPP": 5586.0,
      "perCapitaPPPChangePct": -8.39,
      "popChangePct": 0.71
    },
    {
      "year": 2021,
      "gdpPPP": 231.881,
      "perCapitaPPP": 4343.4,
      "perCapitaPPPChangePct": -22.25,
      "popChangePct": 0.7
    },
    {
      "year": 2022,
      "gdpPPP": 258.351,
      "perCapitaPPP": 4805.9,
      "perCapitaPPPChangePct": 10.65,
      "popChangePct": 0.69
    },
    {
      "year": 2023,
      "gdpPPP": 270.582,
      "perCapitaPPP": 4998.4,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.7
    },
    {
      "year": 2024,
      "gdpPPP": 274.604,
      "perCapitaPPP": 5038.6,
      "perCapitaPPPChangePct": 0.8,
      "popChangePct": 0.68
    },
    {
      "year": 2025,
      "gdpPPP": 276.849,
      "perCapitaPPP": 5047.3,
      "perCapitaPPPChangePct": 0.17,
      "popChangePct": 0.64
    },
    {
      "year": 2026,
      "gdpPPP": 293.308,
      "perCapitaPPP": 5315.0,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 0.61
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 308.735,
      "perCapitaPPP": 5562.5,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 0.57
    },
    {
      "year": 2028,
      "gdpPPP": 321.716,
      "perCapitaPPP": 5765.2,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 0.54
    },
    {
      "year": 2029,
      "gdpPPP": 334.536,
      "perCapitaPPP": 5964.8,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 0.51
    },
    {
      "year": 2030,
      "gdpPPP": 346.857,
      "perCapitaPPP": 6155.3,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.47
    },
    {
      "year": 2031,
      "gdpPPP": 359.523,
      "perCapitaPPP": 6351.8,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.45
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MyanmarGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
