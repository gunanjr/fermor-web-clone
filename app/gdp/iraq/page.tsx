import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Iraq",
  "slug": "iraq",
  "iso3": "IRQ",
  "region": "Asia",
  "rank2026": 56,
  "flagEmoji": "🇮🇶",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Hungary",
      "slug": "hungary",
      "rank": 55
    },
    {
      "name": "Ukraine",
      "slug": "ukraine",
      "rank": 57
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 25.984,
      "growth": null,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 21.113,
      "growth": 1.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdp": 21.063,
      "growth": -8.2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdp": 15.8,
      "growth": -36.7,
      "perCapita": 608.7,
      "popChangePct": null
    },
    {
      "year": 2004,
      "gdp": 36.642,
      "growth": 53.4,
      "perCapita": 1373.7,
      "popChangePct": 2.75
    },
    {
      "year": 2005,
      "gdp": 50.065,
      "growth": 1.7,
      "perCapita": 1828.7,
      "popChangePct": 2.64
    },
    {
      "year": 2006,
      "gdp": 65.144,
      "growth": 5.6,
      "perCapita": 2321.3,
      "popChangePct": 2.51
    },
    {
      "year": 2007,
      "gdp": 88.833,
      "growth": 1.9,
      "perCapita": 3090.9,
      "popChangePct": 2.41
    },
    {
      "year": 2008,
      "gdp": 131.614,
      "growth": 8.2,
      "perCapita": 4472.1,
      "popChangePct": 2.4
    },
    {
      "year": 2009,
      "gdp": 111.66,
      "growth": 3.4,
      "perCapita": 3701.9,
      "popChangePct": 2.49
    },
    {
      "year": 2010,
      "gdp": 138.517,
      "growth": 6.4,
      "perCapita": 4473.7,
      "popChangePct": 2.65
    },
    {
      "year": 2011,
      "gdp": 185.75,
      "growth": 7.5,
      "perCapita": 5848.5,
      "popChangePct": 2.58
    },
    {
      "year": 2012,
      "gdp": 218.032,
      "growth": 13.9,
      "perCapita": 6692.6,
      "popChangePct": 2.58
    },
    {
      "year": 2013,
      "gdp": 234.638,
      "growth": 7.6,
      "perCapita": 7021.4,
      "popChangePct": 2.58
    },
    {
      "year": 2014,
      "gdp": 234.651,
      "growth": 0.7,
      "perCapita": 6704.3,
      "popChangePct": 4.74
    },
    {
      "year": 2015,
      "gdp": 177.634,
      "growth": 2.5,
      "perCapita": 5044.6,
      "popChangePct": 0.61
    },
    {
      "year": 2016,
      "gdp": 168.429,
      "growth": 16.2,
      "perCapita": 4656.7,
      "popChangePct": 2.71
    },
    {
      "year": 2017,
      "gdp": 190.048,
      "growth": -1.5,
      "perCapita": 5117.1,
      "popChangePct": 2.68
    },
    {
      "year": 2018,
      "gdp": 230.189,
      "growth": 2.6,
      "perCapita": 6037.9,
      "popChangePct": 2.65
    },
    {
      "year": 2019,
      "gdp": 236.682,
      "growth": 5.6,
      "perCapita": 6048.9,
      "popChangePct": 2.63
    },
    {
      "year": 2020,
      "gdp": 182.576,
      "growth": -12.4,
      "perCapita": 4547.3,
      "popChangePct": 2.61
    },
    {
      "year": 2021,
      "gdp": 210.753,
      "growth": 1.4,
      "perCapita": 5116.5,
      "popChangePct": 2.59
    },
    {
      "year": 2022,
      "gdp": 288.059,
      "growth": 7.7,
      "perCapita": 6818.2,
      "popChangePct": 2.57
    },
    {
      "year": 2023,
      "gdp": 270.799,
      "growth": 0.9,
      "perCapita": 6250.5,
      "popChangePct": 2.54
    },
    {
      "year": 2024,
      "gdp": 286.523,
      "growth": 0.1,
      "perCapita": 6451.1,
      "popChangePct": 2.52
    },
    {
      "year": 2025,
      "gdp": 264.167,
      "growth": -0.4,
      "perCapita": 5803.3,
      "popChangePct": 2.49
    },
    {
      "year": 2026,
      "gdp": 264.784,
      "growth": -6.8,
      "perCapita": 5677.2,
      "popChangePct": 2.46
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 292.777,
      "growth": 11.3,
      "perCapita": 6128.7,
      "popChangePct": 2.43
    },
    {
      "year": 2028,
      "gdp": 305.531,
      "growth": 3.5,
      "perCapita": 6246.3,
      "popChangePct": 2.39
    },
    {
      "year": 2029,
      "gdp": 321.415,
      "growth": 3.3,
      "perCapita": 6420.4,
      "popChangePct": 2.35
    },
    {
      "year": 2030,
      "gdp": 339.825,
      "growth": 3.4,
      "perCapita": 6635.7,
      "popChangePct": 2.3
    },
    {
      "year": 2031,
      "gdp": 360.511,
      "growth": 3.5,
      "perCapita": 6861.2,
      "popChangePct": 2.6
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 160.302,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 166.807,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdpPPP": 155.502,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2003,
      "gdpPPP": 100.445,
      "perCapitaPPP": 3869.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2004,
      "gdpPPP": 158.21,
      "perCapitaPPP": 5931.4,
      "perCapitaPPPChangePct": 53.29,
      "popChangePct": 2.75
    },
    {
      "year": 2005,
      "gdpPPP": 165.905,
      "perCapitaPPP": 6060.0,
      "perCapitaPPPChangePct": 2.17,
      "popChangePct": 2.64
    },
    {
      "year": 2006,
      "gdpPPP": 180.664,
      "perCapitaPPP": 6437.6,
      "perCapitaPPPChangePct": 6.23,
      "popChangePct": 2.51
    },
    {
      "year": 2007,
      "gdpPPP": 189.063,
      "perCapitaPPP": 6578.3,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.41
    },
    {
      "year": 2008,
      "gdpPPP": 208.561,
      "perCapitaPPP": 7086.7,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 2.4
    },
    {
      "year": 2009,
      "gdpPPP": 216.939,
      "perCapitaPPP": 7192.2,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 2.49
    },
    {
      "year": 2010,
      "gdpPPP": 233.634,
      "perCapitaPPP": 7545.7,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 2.65
    },
    {
      "year": 2011,
      "gdpPPP": 256.449,
      "perCapitaPPP": 8074.6,
      "perCapitaPPPChangePct": 7.01,
      "popChangePct": 2.58
    },
    {
      "year": 2012,
      "gdpPPP": 297.63,
      "perCapitaPPP": 9135.8,
      "perCapitaPPPChangePct": 13.14,
      "popChangePct": 2.58
    },
    {
      "year": 2013,
      "gdpPPP": 325.786,
      "perCapitaPPP": 9749.0,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 2.58
    },
    {
      "year": 2014,
      "gdpPPP": 333.908,
      "perCapitaPPP": 9540.2,
      "perCapitaPPPChangePct": -2.14,
      "popChangePct": 4.74
    },
    {
      "year": 2015,
      "gdpPPP": 345.555,
      "perCapitaPPP": 9813.4,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 0.61
    },
    {
      "year": 2016,
      "gdpPPP": 405.254,
      "perCapitaPPP": 11204.4,
      "perCapitaPPPChangePct": 14.17,
      "popChangePct": 2.71
    },
    {
      "year": 2017,
      "gdpPPP": 406.286,
      "perCapitaPPP": 10939.4,
      "perCapitaPPPChangePct": -2.36,
      "popChangePct": 2.68
    },
    {
      "year": 2018,
      "gdpPPP": 490.276,
      "perCapitaPPP": 12860.0,
      "perCapitaPPPChangePct": 17.56,
      "popChangePct": 2.65
    },
    {
      "year": 2019,
      "gdpPPP": 511.123,
      "perCapitaPPP": 13062.9,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 2.63
    },
    {
      "year": 2020,
      "gdpPPP": 448.956,
      "perCapitaPPP": 11181.9,
      "perCapitaPPPChangePct": -14.4,
      "popChangePct": 2.61
    },
    {
      "year": 2021,
      "gdpPPP": 551.148,
      "perCapitaPPP": 13380.4,
      "perCapitaPPPChangePct": 19.66,
      "popChangePct": 2.59
    },
    {
      "year": 2022,
      "gdpPPP": 635.88,
      "perCapitaPPP": 15050.8,
      "perCapitaPPPChangePct": 12.48,
      "popChangePct": 2.57
    },
    {
      "year": 2023,
      "gdpPPP": 665.475,
      "perCapitaPPP": 15360.4,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 2.54
    },
    {
      "year": 2024,
      "gdpPPP": 682.72,
      "perCapitaPPP": 15371.4,
      "perCapitaPPPChangePct": 0.07,
      "popChangePct": 2.52
    },
    {
      "year": 2025,
      "gdpPPP": 699.177,
      "perCapitaPPP": 15359.6,
      "perCapitaPPPChangePct": -0.08,
      "popChangePct": 2.49
    },
    {
      "year": 2026,
      "gdpPPP": 670.507,
      "perCapitaPPP": 14376.3,
      "perCapitaPPPChangePct": -6.4,
      "popChangePct": 2.46
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 762.686,
      "perCapitaPPP": 15965.3,
      "perCapitaPPPChangePct": 11.05,
      "popChangePct": 2.43
    },
    {
      "year": 2028,
      "gdpPPP": 802.105,
      "perCapitaPPP": 16398.2,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 2.39
    },
    {
      "year": 2029,
      "gdpPPP": 843.583,
      "perCapitaPPP": 16850.9,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 2.35
    },
    {
      "year": 2030,
      "gdpPPP": 888.251,
      "perCapitaPPP": 17344.7,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 2.3
    },
    {
      "year": 2031,
      "gdpPPP": 935.552,
      "perCapitaPPP": 17805.4,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 2.6
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IraqGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
