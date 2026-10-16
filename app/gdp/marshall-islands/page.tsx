import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Marshall Islands",
  "slug": "marshall-islands",
  "iso3": "MHL",
  "region": "Oceania",
  "rank2026": 215,
  "flagEmoji": "🇲🇭",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Palau",
      "slug": "palau",
      "rank": 213
    },
    {
      "name": "Nauru",
      "slug": "nauru",
      "rank": 216
    }
  ],
  "history": [
    {
      "year": 1997,
      "gdp": 0.11,
      "growth": null,
      "perCapita": 2229.9,
      "popChangePct": null
    },
    {
      "year": 1998,
      "gdp": 0.112,
      "growth": -0.6,
      "perCapita": 2241.1,
      "popChangePct": 2.04
    },
    {
      "year": 1999,
      "gdp": 0.113,
      "growth": -1.3,
      "perCapita": 2231.0,
      "popChangePct": 2.0
    },
    {
      "year": 2000,
      "gdp": 0.115,
      "growth": 2.7,
      "perCapita": 2246.6,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdp": 0.123,
      "growth": 7.1,
      "perCapita": 2426.8,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.132,
      "growth": 3.5,
      "perCapita": 2657.2,
      "popChangePct": -1.96
    },
    {
      "year": 2003,
      "gdp": 0.131,
      "growth": -1.6,
      "perCapita": 2625.1,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.133,
      "growth": -0.7,
      "perCapita": 2634.2,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.138,
      "growth": 1.8,
      "perCapita": 2695.1,
      "popChangePct": 2.0
    },
    {
      "year": 2006,
      "gdp": 0.143,
      "growth": 0.2,
      "perCapita": 2780.8,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.15,
      "growth": 3.7,
      "perCapita": 2905.0,
      "popChangePct": 1.96
    },
    {
      "year": 2008,
      "gdp": 0.147,
      "growth": -7.6,
      "perCapita": 2793.9,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.151,
      "growth": 3.7,
      "perCapita": 2892.9,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.161,
      "growth": 5.6,
      "perCapita": 3043.4,
      "popChangePct": 1.92
    },
    {
      "year": 2011,
      "gdp": 0.172,
      "growth": -0.5,
      "perCapita": 3241.4,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 0.181,
      "growth": -1.3,
      "perCapita": 3437.5,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 0.186,
      "growth": 3.8,
      "perCapita": 3595.8,
      "popChangePct": -1.89
    },
    {
      "year": 2014,
      "gdp": 0.186,
      "growth": -1.3,
      "perCapita": 3652.0,
      "popChangePct": -1.92
    },
    {
      "year": 2015,
      "gdp": 0.184,
      "growth": 1.9,
      "perCapita": 3680.8,
      "popChangePct": -1.96
    },
    {
      "year": 2016,
      "gdp": 0.202,
      "growth": 2.5,
      "perCapita": 4143.7,
      "popChangePct": -2.0
    },
    {
      "year": 2017,
      "gdp": 0.214,
      "growth": 3.6,
      "perCapita": 4547.8,
      "popChangePct": -4.08
    },
    {
      "year": 2018,
      "gdp": 0.22,
      "growth": 5.5,
      "perCapita": 4850.5,
      "popChangePct": -4.26
    },
    {
      "year": 2019,
      "gdp": 0.233,
      "growth": 10.5,
      "perCapita": 5274.9,
      "popChangePct": -2.22
    },
    {
      "year": 2020,
      "gdp": 0.242,
      "growth": -2.8,
      "perCapita": 5502.4,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 0.261,
      "growth": 2.1,
      "perCapita": 6158.8,
      "popChangePct": -4.55
    },
    {
      "year": 2022,
      "gdp": 0.259,
      "growth": -0.7,
      "perCapita": 6247.2,
      "popChangePct": -2.38
    },
    {
      "year": 2023,
      "gdp": 0.264,
      "growth": -5.3,
      "perCapita": 6527.1,
      "popChangePct": -2.44
    },
    {
      "year": 2024,
      "gdp": 0.285,
      "growth": 3,
      "perCapita": 7434.0,
      "popChangePct": -5.0
    },
    {
      "year": 2025,
      "gdp": 0.308,
      "growth": 2.5,
      "perCapita": 8451.1,
      "popChangePct": -5.26
    },
    {
      "year": 2026,
      "gdp": 0.342,
      "growth": 3.7,
      "perCapita": 9677.2,
      "popChangePct": -2.78
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.368,
      "growth": 2,
      "perCapita": 10664.2,
      "popChangePct": -2.86
    },
    {
      "year": 2028,
      "gdp": 0.384,
      "growth": 1.9,
      "perCapita": 11355.2,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 0.4,
      "growth": 1.8,
      "perCapita": 12013.7,
      "popChangePct": -2.94
    },
    {
      "year": 2030,
      "gdp": 0.416,
      "growth": 1.6,
      "perCapita": 12623.8,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.433,
      "growth": 1.6,
      "perCapita": 13264.8,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1997,
      "gdpPPP": 0.104,
      "perCapitaPPP": 2107.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1998,
      "gdpPPP": 0.104,
      "perCapitaPPP": 2085.8,
      "perCapitaPPPChangePct": -1.01,
      "popChangePct": 2.04
    },
    {
      "year": 1999,
      "gdpPPP": 0.104,
      "perCapitaPPP": 2054.3,
      "perCapitaPPPChangePct": -1.51,
      "popChangePct": 2.0
    },
    {
      "year": 2000,
      "gdpPPP": 0.11,
      "perCapitaPPP": 2140.1,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdpPPP": 0.12,
      "perCapitaPPP": 2376.7,
      "perCapitaPPPChangePct": 11.06,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 0.126,
      "perCapitaPPP": 2540.4,
      "perCapitaPPPChangePct": 6.89,
      "popChangePct": -1.96
    },
    {
      "year": 2003,
      "gdpPPP": 0.127,
      "perCapitaPPP": 2534.5,
      "perCapitaPPPChangePct": -0.23,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.129,
      "perCapitaPPP": 2561.0,
      "perCapitaPPPChangePct": 1.05,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.136,
      "perCapitaPPP": 2650.4,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 2.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.14,
      "perCapitaPPP": 2721.6,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.149,
      "perCapitaPPP": 2880.5,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 1.96
    },
    {
      "year": 2008,
      "gdpPPP": 0.141,
      "perCapitaPPP": 2678.3,
      "perCapitaPPPChangePct": -7.02,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.147,
      "perCapitaPPP": 2803.9,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 0.157,
      "perCapitaPPP": 2959.3,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": 1.92
    },
    {
      "year": 2011,
      "gdpPPP": 0.159,
      "perCapitaPPP": 2991.8,
      "perCapitaPPPChangePct": 1.1,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 0.16,
      "perCapitaPPP": 3042.3,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 0.169,
      "perCapitaPPP": 3257.1,
      "perCapitaPPPChangePct": 7.06,
      "popChangePct": -1.89
    },
    {
      "year": 2014,
      "gdpPPP": 0.17,
      "perCapitaPPP": 3328.4,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": -1.92
    },
    {
      "year": 2015,
      "gdpPPP": 0.174,
      "perCapitaPPP": 3494.2,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": -1.96
    },
    {
      "year": 2016,
      "gdpPPP": 0.18,
      "perCapitaPPP": 3704.9,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": -2.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.19,
      "perCapitaPPP": 4048.2,
      "perCapitaPPPChangePct": 9.27,
      "popChangePct": -4.08
    },
    {
      "year": 2018,
      "gdpPPP": 0.205,
      "perCapitaPPP": 4525.1,
      "perCapitaPPPChangePct": 11.78,
      "popChangePct": -4.26
    },
    {
      "year": 2019,
      "gdpPPP": 0.23,
      "perCapitaPPP": 5220.4,
      "perCapitaPPPChangePct": 15.37,
      "popChangePct": -2.22
    },
    {
      "year": 2020,
      "gdpPPP": 0.227,
      "perCapitaPPP": 5168.3,
      "perCapitaPPPChangePct": -1.0,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 0.243,
      "perCapitaPPP": 5718.3,
      "perCapitaPPPChangePct": 10.64,
      "popChangePct": -4.55
    },
    {
      "year": 2022,
      "gdpPPP": 0.258,
      "perCapitaPPP": 6229.6,
      "perCapitaPPPChangePct": 8.94,
      "popChangePct": -2.38
    },
    {
      "year": 2023,
      "gdpPPP": 0.253,
      "perCapitaPPP": 6272.3,
      "perCapitaPPPChangePct": 0.69,
      "popChangePct": -2.44
    },
    {
      "year": 2024,
      "gdpPPP": 0.268,
      "perCapitaPPP": 6969.3,
      "perCapitaPPPChangePct": 11.11,
      "popChangePct": -5.0
    },
    {
      "year": 2025,
      "gdpPPP": 0.282,
      "perCapitaPPP": 7734.9,
      "perCapitaPPPChangePct": 10.99,
      "popChangePct": -5.26
    },
    {
      "year": 2026,
      "gdpPPP": 0.301,
      "perCapitaPPP": 8503.6,
      "perCapitaPPPChangePct": 9.94,
      "popChangePct": -2.78
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.313,
      "perCapitaPPP": 9088.2,
      "perCapitaPPPChangePct": 6.88,
      "popChangePct": -2.86
    },
    {
      "year": 2028,
      "gdpPPP": 0.325,
      "perCapitaPPP": 9606.5,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 0.336,
      "perCapitaPPP": 10103.9,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": -2.94
    },
    {
      "year": 2030,
      "gdpPPP": 0.348,
      "perCapitaPPP": 10560.4,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 0.36,
      "perCapitaPPP": 11033.9,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MarshallIslandsGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
