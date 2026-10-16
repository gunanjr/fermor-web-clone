import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Serbia",
  "slug": "serbia",
  "iso3": "SRB",
  "region": "Europe",
  "rank2026": 77,
  "flagEmoji": "🇷🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Côte d'Ivoire",
      "slug": "cote-d-ivoire",
      "rank": 76
    },
    {
      "name": "Venezuela",
      "slug": "venezuela",
      "rank": 78
    }
  ],
  "history": [
    {
      "year": 1997,
      "gdp": 24.995,
      "growth": null,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1998,
      "gdp": 20.001,
      "growth": 5.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1999,
      "gdp": 12.893,
      "growth": -10.3,
      "perCapita": 1709.9,
      "popChangePct": null
    },
    {
      "year": 2000,
      "gdp": 10.431,
      "growth": 6.1,
      "perCapita": 1387.8,
      "popChangePct": -0.32
    },
    {
      "year": 2001,
      "gdp": 13.65,
      "growth": 6.8,
      "perCapita": 1819.1,
      "popChangePct": -0.17
    },
    {
      "year": 2002,
      "gdp": 17.997,
      "growth": 6.5,
      "perCapita": 2399.6,
      "popChangePct": -0.04
    },
    {
      "year": 2003,
      "gdp": 23.627,
      "growth": 4.6,
      "perCapita": 3158.4,
      "popChangePct": -0.25
    },
    {
      "year": 2004,
      "gdp": 26.718,
      "growth": 6.7,
      "perCapita": 3579.9,
      "popChangePct": -0.24
    },
    {
      "year": 2005,
      "gdp": 28.143,
      "growth": 5.9,
      "perCapita": 3782.2,
      "popChangePct": -0.29
    },
    {
      "year": 2006,
      "gdp": 33.421,
      "growth": 3.9,
      "perCapita": 4509.3,
      "popChangePct": -0.39
    },
    {
      "year": 2007,
      "gdp": 45.121,
      "growth": 7.8,
      "perCapita": 6112.7,
      "popChangePct": -0.4
    },
    {
      "year": 2008,
      "gdp": 54.117,
      "growth": 5.2,
      "perCapita": 7362.6,
      "popChangePct": -0.43
    },
    {
      "year": 2009,
      "gdp": 46.949,
      "growth": -3.1,
      "perCapita": 6413.1,
      "popChangePct": -0.39
    },
    {
      "year": 2010,
      "gdp": 43.067,
      "growth": 1.6,
      "perCapita": 5906.6,
      "popChangePct": -0.41
    },
    {
      "year": 2011,
      "gdp": 51.274,
      "growth": 0.1,
      "perCapita": 7085.5,
      "popChangePct": -0.74
    },
    {
      "year": 2012,
      "gdp": 45.111,
      "growth": -0.4,
      "perCapita": 6264.1,
      "popChangePct": -0.5
    },
    {
      "year": 2013,
      "gdp": 50.456,
      "growth": 0.5,
      "perCapita": 7040.4,
      "popChangePct": -0.47
    },
    {
      "year": 2014,
      "gdp": 49.114,
      "growth": -1.8,
      "perCapita": 6886.7,
      "popChangePct": -0.49
    },
    {
      "year": 2015,
      "gdp": 41.297,
      "growth": 1.3,
      "perCapita": 5820.3,
      "popChangePct": -0.52
    },
    {
      "year": 2016,
      "gdp": 42.225,
      "growth": 3,
      "perCapita": 5982.4,
      "popChangePct": -0.52
    },
    {
      "year": 2017,
      "gdp": 45.973,
      "growth": 2.4,
      "perCapita": 6548.0,
      "popChangePct": -0.52
    },
    {
      "year": 2018,
      "gdp": 52.788,
      "growth": 4.6,
      "perCapita": 7559.9,
      "popChangePct": -0.54
    },
    {
      "year": 2019,
      "gdp": 53.865,
      "growth": 4.8,
      "perCapita": 7755.6,
      "popChangePct": -0.54
    },
    {
      "year": 2020,
      "gdp": 55.874,
      "growth": -1,
      "perCapita": 8098.7,
      "popChangePct": -0.66
    },
    {
      "year": 2021,
      "gdp": 65.83,
      "growth": 7.9,
      "perCapita": 9632.3,
      "popChangePct": -0.94
    },
    {
      "year": 2022,
      "gdp": 66.81,
      "growth": 2.7,
      "perCapita": 10024.8,
      "popChangePct": -2.49
    },
    {
      "year": 2023,
      "gdp": 81.344,
      "growth": 3.7,
      "perCapita": 12281.7,
      "popChangePct": -0.62
    },
    {
      "year": 2024,
      "gdp": 90.088,
      "growth": 3.9,
      "perCapita": 13677.8,
      "popChangePct": -0.56
    },
    {
      "year": 2025,
      "gdp": 99.953,
      "growth": 2,
      "perCapita": 15283.9,
      "popChangePct": -0.7
    },
    {
      "year": 2026,
      "gdp": 112.025,
      "growth": 2.8,
      "perCapita": 17252.2,
      "popChangePct": -0.72
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 122.018,
      "growth": 3.5,
      "perCapita": 18954.8,
      "popChangePct": -0.86
    },
    {
      "year": 2028,
      "gdp": 130.083,
      "growth": 3.5,
      "perCapita": 20359.6,
      "popChangePct": -0.75
    },
    {
      "year": 2029,
      "gdp": 138.745,
      "growth": 3.5,
      "perCapita": 21878.6,
      "popChangePct": -0.74
    },
    {
      "year": 2030,
      "gdp": 148.05,
      "growth": 3.5,
      "perCapita": 23521.4,
      "popChangePct": -0.76
    },
    {
      "year": 2031,
      "gdp": 157.999,
      "growth": 3.5,
      "perCapita": 25290.9,
      "popChangePct": -0.75
    }
  ],
  "pppHistory": [
    {
      "year": 1997,
      "gdpPPP": 51.375,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1998,
      "gdpPPP": 54.728,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1999,
      "gdpPPP": 49.771,
      "perCapitaPPP": 6600.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2000,
      "gdpPPP": 53.981,
      "perCapitaPPP": 7181.8,
      "perCapitaPPPChangePct": 8.8,
      "popChangePct": -0.32
    },
    {
      "year": 2001,
      "gdpPPP": 58.938,
      "perCapitaPPP": 7854.7,
      "perCapitaPPPChangePct": 9.37,
      "popChangePct": -0.17
    },
    {
      "year": 2002,
      "gdpPPP": 63.769,
      "perCapitaPPP": 8502.4,
      "perCapitaPPPChangePct": 8.25,
      "popChangePct": -0.04
    },
    {
      "year": 2003,
      "gdpPPP": 67.992,
      "perCapitaPPP": 9089.2,
      "perCapitaPPPChangePct": 6.9,
      "popChangePct": -0.25
    },
    {
      "year": 2004,
      "gdpPPP": 74.49,
      "perCapitaPPP": 9981.0,
      "perCapitaPPPChangePct": 9.81,
      "popChangePct": -0.24
    },
    {
      "year": 2005,
      "gdpPPP": 81.361,
      "perCapitaPPP": 10934.5,
      "perCapitaPPPChangePct": 9.55,
      "popChangePct": -0.29
    },
    {
      "year": 2006,
      "gdpPPP": 87.141,
      "perCapitaPPP": 11757.5,
      "perCapitaPPPChangePct": 7.53,
      "popChangePct": -0.39
    },
    {
      "year": 2007,
      "gdpPPP": 96.512,
      "perCapitaPPP": 13074.7,
      "perCapitaPPPChangePct": 11.2,
      "popChangePct": -0.4
    },
    {
      "year": 2008,
      "gdpPPP": 103.448,
      "perCapitaPPP": 14074.2,
      "perCapitaPPPChangePct": 7.64,
      "popChangePct": -0.43
    },
    {
      "year": 2009,
      "gdpPPP": 100.815,
      "perCapitaPPP": 13771.0,
      "perCapitaPPPChangePct": -2.15,
      "popChangePct": -0.39
    },
    {
      "year": 2010,
      "gdpPPP": 103.684,
      "perCapitaPPP": 14220.0,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": -0.41
    },
    {
      "year": 2011,
      "gdpPPP": 105.881,
      "perCapitaPPP": 14631.5,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": -0.74
    },
    {
      "year": 2012,
      "gdpPPP": 107.374,
      "perCapitaPPP": 14909.9,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": -0.5
    },
    {
      "year": 2013,
      "gdpPPP": 109.694,
      "perCapitaPPP": 15306.4,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": -0.47
    },
    {
      "year": 2014,
      "gdpPPP": 109.591,
      "perCapitaPPP": 15366.6,
      "perCapitaPPPChangePct": 0.39,
      "popChangePct": -0.49
    },
    {
      "year": 2015,
      "gdpPPP": 112.041,
      "perCapitaPPP": 15790.7,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": -0.52
    },
    {
      "year": 2016,
      "gdpPPP": 116.471,
      "perCapitaPPP": 16501.3,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": -0.52
    },
    {
      "year": 2017,
      "gdpPPP": 121.359,
      "perCapitaPPP": 17285.5,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": -0.52
    },
    {
      "year": 2018,
      "gdpPPP": 128.962,
      "perCapitaPPP": 18469.1,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": -0.54
    },
    {
      "year": 2019,
      "gdpPPP": 142.984,
      "perCapitaPPP": 20587.3,
      "perCapitaPPPChangePct": 11.47,
      "popChangePct": -0.54
    },
    {
      "year": 2020,
      "gdpPPP": 144.972,
      "perCapitaPPP": 21013.1,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": -0.66
    },
    {
      "year": 2021,
      "gdpPPP": 161.766,
      "perCapitaPPP": 23669.7,
      "perCapitaPPPChangePct": 12.64,
      "popChangePct": -0.94
    },
    {
      "year": 2022,
      "gdpPPP": 177.956,
      "perCapitaPPP": 26702.3,
      "perCapitaPPPChangePct": 12.81,
      "popChangePct": -2.49
    },
    {
      "year": 2023,
      "gdpPPP": 191.457,
      "perCapitaPPP": 28907.1,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": -0.62
    },
    {
      "year": 2024,
      "gdpPPP": 203.96,
      "perCapitaPPP": 30966.5,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": -0.56
    },
    {
      "year": 2025,
      "gdpPPP": 214.005,
      "perCapitaPPP": 32723.6,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": -0.7
    },
    {
      "year": 2026,
      "gdpPPP": 226.376,
      "perCapitaPPP": 34862.6,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": -0.72
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 239.532,
      "perCapitaPPP": 37210.1,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": -0.86
    },
    {
      "year": 2028,
      "gdpPPP": 251.939,
      "perCapitaPPP": 39431.7,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": -0.75
    },
    {
      "year": 2029,
      "gdpPPP": 265.37,
      "perCapitaPPP": 41846.1,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": -0.74
    },
    {
      "year": 2030,
      "gdpPPP": 279.83,
      "perCapitaPPP": 44458.1,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": -0.76
    },
    {
      "year": 2031,
      "gdpPPP": 294.984,
      "perCapitaPPP": 47218.1,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": -0.75
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SerbiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
