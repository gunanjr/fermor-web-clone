import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Kazakhstan",
  "slug": "kazakhstan",
  "iso3": "KAZ",
  "region": "Asia",
  "rank2026": 49,
  "flagEmoji": "🇰🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Nigeria",
      "slug": "nigeria",
      "rank": 48
    },
    {
      "name": "Finland",
      "slug": "finland",
      "rank": 50
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 2.875,
      "growth": null,
      "perCapita": 168.6,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 5.152,
      "growth": -9.2,
      "perCapita": 304.9,
      "popChangePct": -0.87
    },
    {
      "year": 1994,
      "gdp": 11.881,
      "growth": -12.6,
      "perCapita": 752.0,
      "popChangePct": -6.51
    },
    {
      "year": 1995,
      "gdp": 16.639,
      "growth": -8.2,
      "perCapita": 1061.5,
      "popChangePct": -0.78
    },
    {
      "year": 1996,
      "gdp": 21.035,
      "growth": 0.5,
      "perCapita": 1358.8,
      "popChangePct": -1.24
    },
    {
      "year": 1997,
      "gdp": 22.166,
      "growth": 1.7,
      "perCapita": 1459.4,
      "popChangePct": -1.89
    },
    {
      "year": 1998,
      "gdp": 22.135,
      "growth": -1.9,
      "perCapita": 1480.1,
      "popChangePct": -1.53
    },
    {
      "year": 1999,
      "gdp": 16.871,
      "growth": 2.7,
      "perCapita": 1132.1,
      "popChangePct": -0.35
    },
    {
      "year": 2000,
      "gdp": 18.292,
      "growth": 9.8,
      "perCapita": 1229.0,
      "popChangePct": -0.12
    },
    {
      "year": 2001,
      "gdp": 22.153,
      "growth": 13.5,
      "perCapita": 1490.9,
      "popChangePct": -0.17
    },
    {
      "year": 2002,
      "gdp": 24.637,
      "growth": 9.8,
      "perCapita": 1658.0,
      "popChangePct": 0.01
    },
    {
      "year": 2003,
      "gdp": 30.834,
      "growth": 9.3,
      "perCapita": 2068.1,
      "popChangePct": 0.34
    },
    {
      "year": 2004,
      "gdp": 43.152,
      "growth": 9.6,
      "perCapita": 2874.3,
      "popChangePct": 0.7
    },
    {
      "year": 2005,
      "gdp": 57.125,
      "growth": 9.7,
      "perCapita": 3771.3,
      "popChangePct": 0.89
    },
    {
      "year": 2006,
      "gdp": 81.003,
      "growth": 10.7,
      "perCapita": 5291.6,
      "popChangePct": 1.06
    },
    {
      "year": 2007,
      "gdp": 104.85,
      "growth": 8.9,
      "perCapita": 6771.4,
      "popChangePct": 1.15
    },
    {
      "year": 2008,
      "gdp": 133.442,
      "growth": 3.3,
      "perCapita": 8513.6,
      "popChangePct": 1.23
    },
    {
      "year": 2009,
      "gdp": 115.309,
      "growth": 1.2,
      "perCapita": 7165.3,
      "popChangePct": 2.67
    },
    {
      "year": 2010,
      "gdp": 148.047,
      "growth": 7.3,
      "perCapita": 9070.6,
      "popChangePct": 1.42
    },
    {
      "year": 2011,
      "gdp": 192.626,
      "growth": 7.5,
      "perCapita": 11634.2,
      "popChangePct": 1.44
    },
    {
      "year": 2012,
      "gdp": 207.999,
      "growth": 5,
      "perCapita": 12387.0,
      "popChangePct": 1.42
    },
    {
      "year": 2013,
      "gdp": 236.635,
      "growth": 5.9,
      "perCapita": 13891.1,
      "popChangePct": 1.45
    },
    {
      "year": 2014,
      "gdp": 221.416,
      "growth": 4.3,
      "perCapita": 12807.8,
      "popChangePct": 1.49
    },
    {
      "year": 2015,
      "gdp": 184.388,
      "growth": 1,
      "perCapita": 10511.4,
      "popChangePct": 1.47
    },
    {
      "year": 2016,
      "gdp": 137.278,
      "growth": 0.9,
      "perCapita": 7715.4,
      "popChangePct": 1.43
    },
    {
      "year": 2017,
      "gdp": 166.806,
      "growth": 3.9,
      "perCapita": 9248.4,
      "popChangePct": 1.37
    },
    {
      "year": 2018,
      "gdp": 179.34,
      "growth": 4.1,
      "perCapita": 9813.3,
      "popChangePct": 1.33
    },
    {
      "year": 2019,
      "gdp": 181.667,
      "growth": 4.5,
      "perCapita": 9813.1,
      "popChangePct": 1.3
    },
    {
      "year": 2020,
      "gdp": 171.082,
      "growth": -2.6,
      "perCapita": 9122.0,
      "popChangePct": 1.31
    },
    {
      "year": 2021,
      "gdp": 197.112,
      "growth": 4.1,
      "perCapita": 10374.0,
      "popChangePct": 1.31
    },
    {
      "year": 2022,
      "gdp": 225.496,
      "growth": 3.2,
      "perCapita": 11484.4,
      "popChangePct": 3.34
    },
    {
      "year": 2023,
      "gdp": 261.84,
      "growth": 5.1,
      "perCapita": 13157.6,
      "popChangePct": 1.35
    },
    {
      "year": 2024,
      "gdp": 291.48,
      "growth": 5,
      "perCapita": 14459.3,
      "popChangePct": 1.3
    },
    {
      "year": 2025,
      "gdp": 302.746,
      "growth": 6.5,
      "perCapita": 14854.8,
      "popChangePct": 1.1
    },
    {
      "year": 2026,
      "gdp": 360.456,
      "growth": 4.6,
      "perCapita": 17502.6,
      "popChangePct": 1.05
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 385.966,
      "growth": 4.4,
      "perCapita": 18546.6,
      "popChangePct": 1.05
    },
    {
      "year": 2028,
      "gdp": 410.771,
      "growth": 3.3,
      "perCapita": 19543.1,
      "popChangePct": 1.0
    },
    {
      "year": 2029,
      "gdp": 439.14,
      "growth": 3.6,
      "perCapita": 20685.9,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdp": 468.832,
      "growth": 3.6,
      "perCapita": 21866.0,
      "popChangePct": 1.0
    },
    {
      "year": 2031,
      "gdp": 501.684,
      "growth": 3.6,
      "perCapita": 23166.5,
      "popChangePct": 1.0
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 116.413,
      "perCapitaPPP": 6828.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 108.208,
      "perCapitaPPP": 6402.8,
      "perCapitaPPPChangePct": -6.23,
      "popChangePct": -0.87
    },
    {
      "year": 1994,
      "gdpPPP": 96.616,
      "perCapitaPPP": 6114.9,
      "perCapitaPPPChangePct": -4.5,
      "popChangePct": -6.51
    },
    {
      "year": 1995,
      "gdpPPP": 90.553,
      "perCapitaPPP": 5776.6,
      "perCapitaPPPChangePct": -5.53,
      "popChangePct": -0.78
    },
    {
      "year": 1996,
      "gdpPPP": 92.672,
      "perCapitaPPP": 5986.3,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": -1.24
    },
    {
      "year": 1997,
      "gdpPPP": 95.872,
      "perCapitaPPP": 6312.3,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": -1.89
    },
    {
      "year": 1998,
      "gdpPPP": 95.108,
      "perCapitaPPP": 6359.5,
      "perCapitaPPPChangePct": 0.75,
      "popChangePct": -1.53
    },
    {
      "year": 1999,
      "gdpPPP": 99.058,
      "perCapitaPPP": 6647.5,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": -0.35
    },
    {
      "year": 2000,
      "gdpPPP": 111.23,
      "perCapitaPPP": 7473.3,
      "perCapitaPPPChangePct": 12.42,
      "popChangePct": -0.12
    },
    {
      "year": 2001,
      "gdpPPP": 129.088,
      "perCapitaPPP": 8687.9,
      "perCapitaPPPChangePct": 16.25,
      "popChangePct": -0.17
    },
    {
      "year": 2002,
      "gdpPPP": 143.94,
      "perCapitaPPP": 9687.1,
      "perCapitaPPPChangePct": 11.5,
      "popChangePct": 0.01
    },
    {
      "year": 2003,
      "gdpPPP": 160.432,
      "perCapitaPPP": 10760.8,
      "perCapitaPPPChangePct": 11.08,
      "popChangePct": 0.34
    },
    {
      "year": 2004,
      "gdpPPP": 180.56,
      "perCapitaPPP": 12026.9,
      "perCapitaPPPChangePct": 11.77,
      "popChangePct": 0.7
    },
    {
      "year": 2005,
      "gdpPPP": 204.285,
      "perCapitaPPP": 13486.8,
      "perCapitaPPPChangePct": 12.14,
      "popChangePct": 0.89
    },
    {
      "year": 2006,
      "gdpPPP": 233.121,
      "perCapitaPPP": 15228.6,
      "perCapitaPPPChangePct": 12.91,
      "popChangePct": 1.06
    },
    {
      "year": 2007,
      "gdpPPP": 260.747,
      "perCapitaPPP": 16839.6,
      "perCapitaPPPChangePct": 10.58,
      "popChangePct": 1.15
    },
    {
      "year": 2008,
      "gdpPPP": 274.54,
      "perCapitaPPP": 17515.7,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.23
    },
    {
      "year": 2009,
      "gdpPPP": 279.548,
      "perCapitaPPP": 17371.1,
      "perCapitaPPPChangePct": -0.83,
      "popChangePct": 2.67
    },
    {
      "year": 2010,
      "gdpPPP": 303.601,
      "perCapitaPPP": 18601.0,
      "perCapitaPPPChangePct": 7.08,
      "popChangePct": 1.42
    },
    {
      "year": 2011,
      "gdpPPP": 333.105,
      "perCapitaPPP": 20118.7,
      "perCapitaPPPChangePct": 8.16,
      "popChangePct": 1.44
    },
    {
      "year": 2012,
      "gdpPPP": 356.272,
      "perCapitaPPP": 21217.2,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 1.42
    },
    {
      "year": 2013,
      "gdpPPP": 383.714,
      "perCapitaPPP": 22525.0,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 1.45
    },
    {
      "year": 2014,
      "gdpPPP": 407.184,
      "perCapitaPPP": 23553.6,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 1.49
    },
    {
      "year": 2015,
      "gdpPPP": 415.073,
      "perCapitaPPP": 23661.9,
      "perCapitaPPPChangePct": 0.46,
      "popChangePct": 1.47
    },
    {
      "year": 2016,
      "gdpPPP": 422.788,
      "perCapitaPPP": 23761.9,
      "perCapitaPPPChangePct": 0.42,
      "popChangePct": 1.43
    },
    {
      "year": 2017,
      "gdpPPP": 447.144,
      "perCapitaPPP": 24791.4,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 1.37
    },
    {
      "year": 2018,
      "gdpPPP": 475.138,
      "perCapitaPPP": 25999.0,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 1.33
    },
    {
      "year": 2019,
      "gdpPPP": 551.108,
      "perCapitaPPP": 29769.1,
      "perCapitaPPPChangePct": 14.5,
      "popChangePct": 1.3
    },
    {
      "year": 2020,
      "gdpPPP": 565.757,
      "perCapitaPPP": 30165.8,
      "perCapitaPPPChangePct": 1.33,
      "popChangePct": 1.31
    },
    {
      "year": 2021,
      "gdpPPP": 650.47,
      "perCapitaPPP": 34234.0,
      "perCapitaPPPChangePct": 13.49,
      "popChangePct": 1.31
    },
    {
      "year": 2022,
      "gdpPPP": 719.029,
      "perCapitaPPP": 36619.8,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 3.34
    },
    {
      "year": 2023,
      "gdpPPP": 783.661,
      "perCapitaPPP": 39379.3,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 1.35
    },
    {
      "year": 2024,
      "gdpPPP": 843.272,
      "perCapitaPPP": 41831.8,
      "perCapitaPPPChangePct": 6.23,
      "popChangePct": 1.3
    },
    {
      "year": 2025,
      "gdpPPP": 923.433,
      "perCapitaPPP": 45309.9,
      "perCapitaPPPChangePct": 8.31,
      "popChangePct": 1.1
    },
    {
      "year": 2026,
      "gdpPPP": 993.672,
      "perCapitaPPP": 48249.7,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 1.05
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1060.176,
      "perCapitaPPP": 50944.0,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 1.05
    },
    {
      "year": 2028,
      "gdpPPP": 1113.233,
      "perCapitaPPP": 52963.9,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 1.0
    },
    {
      "year": 2029,
      "gdpPPP": 1173.772,
      "perCapitaPPP": 55291.2,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdpPPP": 1238.353,
      "perCapitaPPP": 57755.8,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 1.0
    },
    {
      "year": 2031,
      "gdpPPP": 1306.264,
      "perCapitaPPP": 60319.9,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 1.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function KazakhstanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
