import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Sudan",
  "slug": "sudan",
  "iso3": "SDN",
  "region": "Africa",
  "rank2026": 106,
  "flagEmoji": "🇸🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Cyprus",
      "slug": "cyprus",
      "rank": 105
    },
    {
      "name": "Iceland",
      "slug": "iceland",
      "rank": 107
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 9.095,
      "growth": 2.5,
      "perCapita": 486.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 6.53,
      "growth": 6.3,
      "perCapita": 339.4,
      "popChangePct": 3.0
    },
    {
      "year": 1982,
      "gdp": 4.748,
      "growth": 4.1,
      "perCapita": 239.8,
      "popChangePct": 2.91
    },
    {
      "year": 1983,
      "gdp": 6.485,
      "growth": -1.5,
      "perCapita": 318.5,
      "popChangePct": 2.83
    },
    {
      "year": 1984,
      "gdp": 7.992,
      "growth": -5.6,
      "perCapita": 375.0,
      "popChangePct": 4.67
    },
    {
      "year": 1985,
      "gdp": 5.547,
      "growth": -0.6,
      "perCapita": 253.2,
      "popChangePct": 2.8
    },
    {
      "year": 1986,
      "gdp": 7.4,
      "growth": 9.9,
      "perCapita": 328.6,
      "popChangePct": 2.8
    },
    {
      "year": 1987,
      "gdp": 11.964,
      "growth": 6.5,
      "perCapita": 516.8,
      "popChangePct": 2.8
    },
    {
      "year": 1988,
      "gdp": 9.551,
      "growth": 4.3,
      "perCapita": 404.7,
      "popChangePct": 1.94
    },
    {
      "year": 1989,
      "gdp": 16.853,
      "growth": 1.4,
      "perCapita": 696.4,
      "popChangePct": 2.54
    },
    {
      "year": 1990,
      "gdp": 2.245,
      "growth": 0.8,
      "perCapita": 87.2,
      "popChangePct": 6.4
    },
    {
      "year": 1991,
      "gdp": 2.528,
      "growth": 7,
      "perCapita": 95.3,
      "popChangePct": 3.03
    },
    {
      "year": 1992,
      "gdp": 3.1,
      "growth": 5.5,
      "perCapita": 113.5,
      "popChangePct": 2.98
    },
    {
      "year": 1993,
      "gdp": 5.246,
      "growth": 2.8,
      "perCapita": 186.5,
      "popChangePct": 2.96
    },
    {
      "year": 1994,
      "gdp": 5.961,
      "growth": 3.5,
      "perCapita": 205.9,
      "popChangePct": 2.92
    },
    {
      "year": 1995,
      "gdp": 6.694,
      "growth": 8.9,
      "perCapita": 239.5,
      "popChangePct": -3.45
    },
    {
      "year": 1996,
      "gdp": 8.377,
      "growth": 5.5,
      "perCapita": 292.9,
      "popChangePct": 2.33
    },
    {
      "year": 1997,
      "gdp": 10.241,
      "growth": 6.1,
      "perCapita": 350.7,
      "popChangePct": 2.1
    },
    {
      "year": 1998,
      "gdp": 10.924,
      "growth": 8.2,
      "perCapita": 366.6,
      "popChangePct": 2.05
    },
    {
      "year": 1999,
      "gdp": 10.714,
      "growth": 4.2,
      "perCapita": 352.4,
      "popChangePct": 2.01
    },
    {
      "year": 2000,
      "gdp": 13.134,
      "growth": 8.4,
      "perCapita": 422.3,
      "popChangePct": 2.3
    },
    {
      "year": 2001,
      "gdp": 15.716,
      "growth": 10.9,
      "perCapita": 492.7,
      "popChangePct": 2.57
    },
    {
      "year": 2002,
      "gdp": 18.137,
      "growth": 5.9,
      "perCapita": 554.7,
      "popChangePct": 2.51
    },
    {
      "year": 2003,
      "gdp": 21.355,
      "growth": 6.3,
      "perCapita": 635.6,
      "popChangePct": 2.75
    },
    {
      "year": 2004,
      "gdp": 26.646,
      "growth": 5.1,
      "perCapita": 772.9,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdp": 35.183,
      "growth": 5.6,
      "perCapita": 996.7,
      "popChangePct": 2.4
    },
    {
      "year": 2006,
      "gdp": 45.264,
      "growth": 6.5,
      "perCapita": 1249.8,
      "popChangePct": 2.6
    },
    {
      "year": 2007,
      "gdp": 59.44,
      "growth": 5.7,
      "perCapita": 1599.6,
      "popChangePct": 2.6
    },
    {
      "year": 2008,
      "gdp": 64.833,
      "growth": 3.8,
      "perCapita": 1700.5,
      "popChangePct": 2.6
    },
    {
      "year": 2009,
      "gdp": 54.812,
      "growth": -2.8,
      "perCapita": 1401.2,
      "popChangePct": 2.6
    },
    {
      "year": 2010,
      "gdp": 65.716,
      "growth": 3.9,
      "perCapita": 1637.4,
      "popChangePct": 2.6
    },
    {
      "year": 2011,
      "gdp": 66.448,
      "growth": -3.2,
      "perCapita": 2034.5,
      "popChangePct": -18.62
    },
    {
      "year": 2012,
      "gdp": 48.948,
      "growth": -17,
      "perCapita": 1396.3,
      "popChangePct": 7.33
    },
    {
      "year": 2013,
      "gdp": 52.892,
      "growth": 2,
      "perCapita": 1462.6,
      "popChangePct": 3.16
    },
    {
      "year": 2014,
      "gdp": 60.726,
      "growth": 4.7,
      "perCapita": 1628.5,
      "popChangePct": 3.11
    },
    {
      "year": 2015,
      "gdp": 64.534,
      "growth": 4.9,
      "perCapita": 1679.0,
      "popChangePct": 3.07
    },
    {
      "year": 2016,
      "gdp": 64.888,
      "growth": 4.7,
      "perCapita": 1638.6,
      "popChangePct": 3.03
    },
    {
      "year": 2017,
      "gdp": 48.906,
      "growth": 0.8,
      "perCapita": 1199.2,
      "popChangePct": 2.99
    },
    {
      "year": 2018,
      "gdp": 33.59,
      "growth": -2.3,
      "perCapita": 800.1,
      "popChangePct": 2.95
    },
    {
      "year": 2019,
      "gdp": 31.484,
      "growth": -2.5,
      "perCapita": 728.4,
      "popChangePct": 2.95
    },
    {
      "year": 2020,
      "gdp": 35.215,
      "growth": -3.6,
      "perCapita": 794.1,
      "popChangePct": 2.6
    },
    {
      "year": 2021,
      "gdp": 35.131,
      "growth": 0.5,
      "perCapita": 772.1,
      "popChangePct": 2.6
    },
    {
      "year": 2022,
      "gdp": 33.462,
      "growth": -2.5,
      "perCapita": 716.8,
      "popChangePct": 2.6
    },
    {
      "year": 2023,
      "gdp": 36.947,
      "growth": -20.8,
      "perCapita": 771.4,
      "popChangePct": 2.6
    },
    {
      "year": 2024,
      "gdp": 29.156,
      "growth": -23.4,
      "perCapita": 593.3,
      "popChangePct": 2.6
    },
    {
      "year": 2025,
      "gdp": 39.718,
      "growth": 3.2,
      "perCapita": 787.8,
      "popChangePct": 2.6
    },
    {
      "year": 2026,
      "gdp": 44.688,
      "growth": 0.7,
      "perCapita": 863.9,
      "popChangePct": 2.6
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 47.622,
      "growth": 8.1,
      "perCapita": 897.3,
      "popChangePct": 2.6
    },
    {
      "year": 2028,
      "gdp": 53.433,
      "growth": 12.8,
      "perCapita": 981.3,
      "popChangePct": 2.6
    },
    {
      "year": 2029,
      "gdp": 58.33,
      "growth": 8.3,
      "perCapita": 1044.0,
      "popChangePct": 2.6
    },
    {
      "year": 2030,
      "gdp": 62.143,
      "growth": 6,
      "perCapita": 1084.1,
      "popChangePct": 2.6
    },
    {
      "year": 2031,
      "gdp": 67.643,
      "growth": 4.5,
      "perCapita": 1150.1,
      "popChangePct": 2.6
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 20.603,
      "perCapitaPPP": 1102.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 23.977,
      "perCapitaPPP": 1246.2,
      "perCapitaPPPChangePct": 12.99,
      "popChangePct": 3.0
    },
    {
      "year": 1982,
      "gdpPPP": 26.51,
      "perCapitaPPP": 1338.9,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 2.91
    },
    {
      "year": 1983,
      "gdpPPP": 27.132,
      "perCapitaPPP": 1332.6,
      "perCapitaPPPChangePct": -0.47,
      "popChangePct": 2.83
    },
    {
      "year": 1984,
      "gdpPPP": 26.529,
      "perCapitaPPP": 1244.8,
      "perCapitaPPPChangePct": -6.59,
      "popChangePct": 4.67
    },
    {
      "year": 1985,
      "gdpPPP": 27.197,
      "perCapitaPPP": 1241.4,
      "perCapitaPPPChangePct": -0.27,
      "popChangePct": 2.8
    },
    {
      "year": 1986,
      "gdpPPP": 30.501,
      "perCapitaPPP": 1354.3,
      "perCapitaPPPChangePct": 9.09,
      "popChangePct": 2.8
    },
    {
      "year": 1987,
      "gdpPPP": 33.276,
      "perCapitaPPP": 1437.3,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 2.8
    },
    {
      "year": 1988,
      "gdpPPP": 35.929,
      "perCapitaPPP": 1522.4,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": 1.94
    },
    {
      "year": 1989,
      "gdpPPP": 37.869,
      "perCapitaPPP": 1564.8,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 2.54
    },
    {
      "year": 1990,
      "gdpPPP": 39.615,
      "perCapitaPPP": 1538.5,
      "perCapitaPPPChangePct": -1.69,
      "popChangePct": 6.4
    },
    {
      "year": 1991,
      "gdpPPP": 43.832,
      "perCapitaPPP": 1652.2,
      "perCapitaPPPChangePct": 7.39,
      "popChangePct": 3.03
    },
    {
      "year": 1992,
      "gdpPPP": 47.315,
      "perCapitaPPP": 1731.9,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 2.98
    },
    {
      "year": 1993,
      "gdpPPP": 49.769,
      "perCapitaPPP": 1769.2,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 2.96
    },
    {
      "year": 1994,
      "gdpPPP": 52.618,
      "perCapitaPPP": 1817.5,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 2.92
    },
    {
      "year": 1995,
      "gdpPPP": 58.481,
      "perCapitaPPP": 2092.3,
      "perCapitaPPPChangePct": 15.12,
      "popChangePct": -3.45
    },
    {
      "year": 1996,
      "gdpPPP": 62.806,
      "perCapitaPPP": 2196.0,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": 2.33
    },
    {
      "year": 1997,
      "gdpPPP": 67.759,
      "perCapitaPPP": 2320.5,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 2.1
    },
    {
      "year": 1998,
      "gdpPPP": 74.168,
      "perCapitaPPP": 2488.9,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": 2.05
    },
    {
      "year": 1999,
      "gdpPPP": 78.403,
      "perCapitaPPP": 2579.1,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 2.01
    },
    {
      "year": 2000,
      "gdpPPP": 86.902,
      "perCapitaPPP": 2794.3,
      "perCapitaPPPChangePct": 8.35,
      "popChangePct": 2.3
    },
    {
      "year": 2001,
      "gdpPPP": 98.515,
      "perCapitaPPP": 3088.3,
      "perCapitaPPPChangePct": 10.52,
      "popChangePct": 2.57
    },
    {
      "year": 2002,
      "gdpPPP": 105.99,
      "perCapitaPPP": 3241.3,
      "perCapitaPPPChangePct": 4.96,
      "popChangePct": 2.51
    },
    {
      "year": 2003,
      "gdpPPP": 114.88,
      "perCapitaPPP": 3419.0,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 2.75
    },
    {
      "year": 2004,
      "gdpPPP": 124.028,
      "perCapitaPPP": 3597.8,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 2.6
    },
    {
      "year": 2005,
      "gdpPPP": 135.143,
      "perCapitaPPP": 3828.4,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 2.4
    },
    {
      "year": 2006,
      "gdpPPP": 148.409,
      "perCapitaPPP": 4097.7,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": 2.6
    },
    {
      "year": 2007,
      "gdpPPP": 161.172,
      "perCapitaPPP": 4337.3,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 2.6
    },
    {
      "year": 2008,
      "gdpPPP": 170.596,
      "perCapitaPPP": 4474.6,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 2.6
    },
    {
      "year": 2009,
      "gdpPPP": 166.897,
      "perCapitaPPP": 4266.6,
      "perCapitaPPPChangePct": -4.65,
      "popChangePct": 2.6
    },
    {
      "year": 2010,
      "gdpPPP": 175.443,
      "perCapitaPPP": 4371.4,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 2.6
    },
    {
      "year": 2011,
      "gdpPPP": 173.309,
      "perCapitaPPP": 5306.2,
      "perCapitaPPPChangePct": 21.38,
      "popChangePct": -18.62
    },
    {
      "year": 2012,
      "gdpPPP": 146.516,
      "perCapitaPPP": 4179.5,
      "perCapitaPPPChangePct": -21.23,
      "popChangePct": 7.33
    },
    {
      "year": 2013,
      "gdpPPP": 151.923,
      "perCapitaPPP": 4201.0,
      "perCapitaPPPChangePct": 0.51,
      "popChangePct": 3.16
    },
    {
      "year": 2014,
      "gdpPPP": 161.774,
      "perCapitaPPP": 4338.3,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 3.11
    },
    {
      "year": 2015,
      "gdpPPP": 171.286,
      "perCapitaPPP": 4456.5,
      "perCapitaPPPChangePct": 2.72,
      "popChangePct": 3.07
    },
    {
      "year": 2016,
      "gdpPPP": 181.041,
      "perCapitaPPP": 4571.9,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 3.03
    },
    {
      "year": 2017,
      "gdpPPP": 185.698,
      "perCapitaPPP": 4553.3,
      "perCapitaPPPChangePct": -0.41,
      "popChangePct": 2.99
    },
    {
      "year": 2018,
      "gdpPPP": 192.299,
      "perCapitaPPP": 4580.2,
      "perCapitaPPPChangePct": 0.59,
      "popChangePct": 2.95
    },
    {
      "year": 2019,
      "gdpPPP": 183.587,
      "perCapitaPPP": 4247.6,
      "perCapitaPPPChangePct": -7.26,
      "popChangePct": 2.95
    },
    {
      "year": 2020,
      "gdpPPP": 197.404,
      "perCapitaPPP": 4451.5,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 2.6
    },
    {
      "year": 2021,
      "gdpPPP": 171.047,
      "perCapitaPPP": 3759.4,
      "perCapitaPPPChangePct": -15.55,
      "popChangePct": 2.6
    },
    {
      "year": 2022,
      "gdpPPP": 178.632,
      "perCapitaPPP": 3826.6,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 2.6
    },
    {
      "year": 2023,
      "gdpPPP": 146.795,
      "perCapitaPPP": 3064.9,
      "perCapitaPPPChangePct": -19.91,
      "popChangePct": 2.6
    },
    {
      "year": 2024,
      "gdpPPP": 115.292,
      "perCapitaPPP": 2346.2,
      "perCapitaPPPChangePct": -23.45,
      "popChangePct": 2.6
    },
    {
      "year": 2025,
      "gdpPPP": 122.386,
      "perCapitaPPP": 2427.4,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 2.6
    },
    {
      "year": 2026,
      "gdpPPP": 126.791,
      "perCapitaPPP": 2451.1,
      "perCapitaPPPChangePct": 0.97,
      "popChangePct": 2.6
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 140.104,
      "perCapitaPPP": 2639.8,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": 2.6
    },
    {
      "year": 2028,
      "gdpPPP": 160.699,
      "perCapitaPPP": 2951.1,
      "perCapitaPPPChangePct": 11.79,
      "popChangePct": 2.6
    },
    {
      "year": 2029,
      "gdpPPP": 177.198,
      "perCapitaPPP": 3171.6,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": 2.6
    },
    {
      "year": 2030,
      "gdpPPP": 191.282,
      "perCapitaPPP": 3337.0,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 2.6
    },
    {
      "year": 2031,
      "gdpPPP": 203.512,
      "perCapitaPPP": 3460.3,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 2.6
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SudanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
