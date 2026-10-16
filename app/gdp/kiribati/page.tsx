import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Kiribati",
  "slug": "kiribati",
  "iso3": "KIR",
  "region": "Oceania",
  "rank2026": 212,
  "flagEmoji": "🇰🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Micronesia",
      "slug": "micronesia",
      "rank": 210
    },
    {
      "name": "Palau",
      "slug": "palau",
      "rank": 213
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.033,
      "growth": -1.1,
      "perCapita": 567.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.035,
      "growth": 6.1,
      "perCapita": 591.5,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdp": 0.033,
      "growth": -1.1,
      "perCapita": 527.4,
      "popChangePct": 3.33
    },
    {
      "year": 1983,
      "gdp": 0.031,
      "growth": -9.8,
      "perCapita": 510.5,
      "popChangePct": -1.61
    },
    {
      "year": 1984,
      "gdp": 0.034,
      "growth": 13.9,
      "perCapita": 555.7,
      "popChangePct": 1.64
    },
    {
      "year": 1985,
      "gdp": 0.026,
      "growth": -13.2,
      "perCapita": 410.2,
      "popChangePct": 3.23
    },
    {
      "year": 1986,
      "gdp": 0.026,
      "growth": -2.5,
      "perCapita": 398.3,
      "popChangePct": 1.56
    },
    {
      "year": 1987,
      "gdp": 0.03,
      "growth": 1.3,
      "perCapita": 440.6,
      "popChangePct": 3.08
    },
    {
      "year": 1988,
      "gdp": 0.038,
      "growth": 22,
      "perCapita": 558.1,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdp": 0.038,
      "growth": -7.3,
      "perCapita": 534.6,
      "popChangePct": 2.9
    },
    {
      "year": 1990,
      "gdp": 0.037,
      "growth": -6.4,
      "perCapita": 505.4,
      "popChangePct": 1.41
    },
    {
      "year": 1991,
      "gdp": 0.041,
      "growth": -5.6,
      "perCapita": 562.3,
      "popChangePct": 1.39
    },
    {
      "year": 1992,
      "gdp": 0.062,
      "growth": 24,
      "perCapita": 827.3,
      "popChangePct": 1.37
    },
    {
      "year": 1993,
      "gdp": 0.059,
      "growth": -0.1,
      "perCapita": 781.5,
      "popChangePct": 1.35
    },
    {
      "year": 1994,
      "gdp": 0.067,
      "growth": 2,
      "perCapita": 876.5,
      "popChangePct": 2.67
    },
    {
      "year": 1995,
      "gdp": 0.069,
      "growth": 2.8,
      "perCapita": 883.6,
      "popChangePct": 1.3
    },
    {
      "year": 1996,
      "gdp": 0.081,
      "growth": -0.1,
      "perCapita": 1031.9,
      "popChangePct": 1.28
    },
    {
      "year": 1997,
      "gdp": 0.08,
      "growth": 1.2,
      "perCapita": 1001.1,
      "popChangePct": 1.27
    },
    {
      "year": 1998,
      "gdp": 0.075,
      "growth": 4.4,
      "perCapita": 918.7,
      "popChangePct": 2.5
    },
    {
      "year": 1999,
      "gdp": 0.077,
      "growth": -3.9,
      "perCapita": 930.9,
      "popChangePct": 1.22
    },
    {
      "year": 2000,
      "gdp": 0.075,
      "growth": 6.7,
      "perCapita": 890.4,
      "popChangePct": 1.2
    },
    {
      "year": 2001,
      "gdp": 0.065,
      "growth": -3.1,
      "perCapita": 755.3,
      "popChangePct": 2.38
    },
    {
      "year": 2002,
      "gdp": 0.075,
      "growth": 1.4,
      "perCapita": 853.9,
      "popChangePct": 2.33
    },
    {
      "year": 2003,
      "gdp": 0.097,
      "growth": -1.6,
      "perCapita": 1082.5,
      "popChangePct": 1.14
    },
    {
      "year": 2004,
      "gdp": 0.104,
      "growth": -0.6,
      "perCapita": 1147.3,
      "popChangePct": 2.25
    },
    {
      "year": 2005,
      "gdp": 0.114,
      "growth": 1.3,
      "perCapita": 1231.1,
      "popChangePct": 2.2
    },
    {
      "year": 2006,
      "gdp": 0.112,
      "growth": 5.8,
      "perCapita": 1188.7,
      "popChangePct": 2.15
    },
    {
      "year": 2007,
      "gdp": 0.138,
      "growth": 3.1,
      "perCapita": 1432.1,
      "popChangePct": 2.11
    },
    {
      "year": 2008,
      "gdp": 0.15,
      "growth": -3,
      "perCapita": 1518.6,
      "popChangePct": 2.06
    },
    {
      "year": 2009,
      "gdp": 0.142,
      "growth": 0.5,
      "perCapita": 1410.1,
      "popChangePct": 2.02
    },
    {
      "year": 2010,
      "gdp": 0.166,
      "growth": 1.2,
      "perCapita": 1609.3,
      "popChangePct": 1.98
    },
    {
      "year": 2011,
      "gdp": 0.196,
      "growth": 3.3,
      "perCapita": 1877.8,
      "popChangePct": 0.97
    },
    {
      "year": 2012,
      "gdp": 0.207,
      "growth": 5.8,
      "perCapita": 1956.7,
      "popChangePct": 1.92
    },
    {
      "year": 2013,
      "gdp": 0.202,
      "growth": 7.7,
      "perCapita": 1886.9,
      "popChangePct": 0.94
    },
    {
      "year": 2014,
      "gdp": 0.201,
      "growth": 1.3,
      "perCapita": 1845.5,
      "popChangePct": 1.87
    },
    {
      "year": 2015,
      "gdp": 0.192,
      "growth": 11.3,
      "perCapita": 1742.4,
      "popChangePct": 0.92
    },
    {
      "year": 2016,
      "gdp": 0.207,
      "growth": 7.1,
      "perCapita": 1845.8,
      "popChangePct": 1.82
    },
    {
      "year": 2017,
      "gdp": 0.223,
      "growth": 3.7,
      "perCapita": 1960.0,
      "popChangePct": 1.79
    },
    {
      "year": 2018,
      "gdp": 0.234,
      "growth": 3.5,
      "perCapita": 2022.2,
      "popChangePct": 1.75
    },
    {
      "year": 2019,
      "gdp": 0.234,
      "growth": 3.3,
      "perCapita": 1987.1,
      "popChangePct": 1.72
    },
    {
      "year": 2020,
      "gdp": 0.222,
      "growth": -1.5,
      "perCapita": 1855.5,
      "popChangePct": 0.85
    },
    {
      "year": 2021,
      "gdp": 0.286,
      "growth": 8.6,
      "perCapita": 2354.3,
      "popChangePct": 1.68
    },
    {
      "year": 2022,
      "gdp": 0.272,
      "growth": 5,
      "perCapita": 2202.1,
      "popChangePct": 1.65
    },
    {
      "year": 2023,
      "gdp": 0.292,
      "growth": 3.3,
      "perCapita": 2325.6,
      "popChangePct": 1.63
    },
    {
      "year": 2024,
      "gdp": 0.343,
      "growth": 4.6,
      "perCapita": 2695.1,
      "popChangePct": 1.6
    },
    {
      "year": 2025,
      "gdp": 0.349,
      "growth": 4.3,
      "perCapita": 2701.3,
      "popChangePct": 1.57
    },
    {
      "year": 2026,
      "gdp": 0.401,
      "growth": 3.1,
      "perCapita": 3051.1,
      "popChangePct": 1.55
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.417,
      "growth": 2.4,
      "perCapita": 3125.8,
      "popChangePct": 1.53
    },
    {
      "year": 2028,
      "gdp": 0.431,
      "growth": 2.2,
      "perCapita": 3183.8,
      "popChangePct": 1.5
    },
    {
      "year": 2029,
      "gdp": 0.447,
      "growth": 2.2,
      "perCapita": 3250.8,
      "popChangePct": 2.22
    },
    {
      "year": 2030,
      "gdp": 0.464,
      "growth": 2.1,
      "perCapita": 3321.8,
      "popChangePct": 1.45
    },
    {
      "year": 2031,
      "gdp": 0.48,
      "growth": 2.1,
      "perCapita": 3385.5,
      "popChangePct": 1.43
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.055,
      "perCapitaPPP": 933.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.063,
      "perCapitaPPP": 1062.7,
      "perCapitaPPPChangePct": 13.9,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdpPPP": 0.067,
      "perCapitaPPP": 1068.7,
      "perCapitaPPPChangePct": 0.57,
      "popChangePct": 3.33
    },
    {
      "year": 1983,
      "gdpPPP": 0.062,
      "perCapitaPPP": 1025.9,
      "perCapitaPPPChangePct": -4.01,
      "popChangePct": -1.61
    },
    {
      "year": 1984,
      "gdpPPP": 0.074,
      "perCapitaPPP": 1187.3,
      "perCapitaPPPChangePct": 15.73,
      "popChangePct": 1.64
    },
    {
      "year": 1985,
      "gdpPPP": 0.066,
      "perCapitaPPP": 1031.8,
      "perCapitaPPPChangePct": -13.1,
      "popChangePct": 3.23
    },
    {
      "year": 1986,
      "gdpPPP": 0.066,
      "perCapitaPPP": 1001.4,
      "perCapitaPPPChangePct": -2.94,
      "popChangePct": 1.56
    },
    {
      "year": 1987,
      "gdpPPP": 0.068,
      "perCapitaPPP": 1014.0,
      "perCapitaPPPChangePct": 1.25,
      "popChangePct": 3.08
    },
    {
      "year": 1988,
      "gdpPPP": 0.086,
      "perCapitaPPP": 1249.7,
      "perCapitaPPPChangePct": 23.25,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdpPPP": 0.083,
      "perCapitaPPP": 1174.5,
      "perCapitaPPPChangePct": -6.02,
      "popChangePct": 2.9
    },
    {
      "year": 1990,
      "gdpPPP": 0.08,
      "perCapitaPPP": 1112.6,
      "perCapitaPPPChangePct": -5.27,
      "popChangePct": 1.41
    },
    {
      "year": 1991,
      "gdpPPP": 0.079,
      "perCapitaPPP": 1070.0,
      "perCapitaPPPChangePct": -3.83,
      "popChangePct": 1.39
    },
    {
      "year": 1992,
      "gdpPPP": 0.1,
      "perCapitaPPP": 1337.4,
      "perCapitaPPPChangePct": 25.0,
      "popChangePct": 1.37
    },
    {
      "year": 1993,
      "gdpPPP": 0.102,
      "perCapitaPPP": 1348.4,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": 1.35
    },
    {
      "year": 1994,
      "gdpPPP": 0.106,
      "perCapitaPPP": 1385.6,
      "perCapitaPPPChangePct": 2.75,
      "popChangePct": 2.67
    },
    {
      "year": 1995,
      "gdpPPP": 0.111,
      "perCapitaPPP": 1433.0,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 1.3
    },
    {
      "year": 1996,
      "gdpPPP": 0.113,
      "perCapitaPPP": 1434.1,
      "perCapitaPPPChangePct": 0.08,
      "popChangePct": 1.28
    },
    {
      "year": 1997,
      "gdpPPP": 0.117,
      "perCapitaPPP": 1451.3,
      "perCapitaPPPChangePct": 1.2,
      "popChangePct": 1.27
    },
    {
      "year": 1998,
      "gdpPPP": 0.123,
      "perCapitaPPP": 1507.2,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 2.5
    },
    {
      "year": 1999,
      "gdpPPP": 0.12,
      "perCapitaPPP": 1444.1,
      "perCapitaPPPChangePct": -4.18,
      "popChangePct": 1.22
    },
    {
      "year": 2000,
      "gdpPPP": 0.131,
      "perCapitaPPP": 1550.0,
      "perCapitaPPPChangePct": 7.33,
      "popChangePct": 1.2
    },
    {
      "year": 2001,
      "gdpPPP": 0.13,
      "perCapitaPPP": 1507.4,
      "perCapitaPPPChangePct": -2.75,
      "popChangePct": 2.38
    },
    {
      "year": 2002,
      "gdpPPP": 0.134,
      "perCapitaPPP": 1525.0,
      "perCapitaPPPChangePct": 1.17,
      "popChangePct": 2.33
    },
    {
      "year": 2003,
      "gdpPPP": 0.134,
      "perCapitaPPP": 1503.1,
      "perCapitaPPPChangePct": -1.44,
      "popChangePct": 1.14
    },
    {
      "year": 2004,
      "gdpPPP": 0.137,
      "perCapitaPPP": 1506.5,
      "perCapitaPPPChangePct": 0.23,
      "popChangePct": 2.25
    },
    {
      "year": 2005,
      "gdpPPP": 0.143,
      "perCapitaPPP": 1545.4,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 2.2
    },
    {
      "year": 2006,
      "gdpPPP": 0.156,
      "perCapitaPPP": 1649.2,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 2.15
    },
    {
      "year": 2007,
      "gdpPPP": 0.165,
      "perCapitaPPP": 1708.4,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 2.11
    },
    {
      "year": 2008,
      "gdpPPP": 0.163,
      "perCapitaPPP": 1653.4,
      "perCapitaPPPChangePct": -3.22,
      "popChangePct": 2.06
    },
    {
      "year": 2009,
      "gdpPPP": 0.165,
      "perCapitaPPP": 1636.8,
      "perCapitaPPPChangePct": -1.0,
      "popChangePct": 2.02
    },
    {
      "year": 2010,
      "gdpPPP": 0.169,
      "perCapitaPPP": 1641.3,
      "perCapitaPPPChangePct": 0.27,
      "popChangePct": 1.98
    },
    {
      "year": 2011,
      "gdpPPP": 0.178,
      "perCapitaPPP": 1707.0,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.97
    },
    {
      "year": 2012,
      "gdpPPP": 0.192,
      "perCapitaPPP": 1815.4,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.92
    },
    {
      "year": 2013,
      "gdpPPP": 0.211,
      "perCapitaPPP": 1962.8,
      "perCapitaPPPChangePct": 8.12,
      "popChangePct": 0.94
    },
    {
      "year": 2014,
      "gdpPPP": 0.217,
      "perCapitaPPP": 1995.5,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 1.87
    },
    {
      "year": 2015,
      "gdpPPP": 0.244,
      "perCapitaPPP": 2211.4,
      "perCapitaPPPChangePct": 10.82,
      "popChangePct": 0.92
    },
    {
      "year": 2016,
      "gdpPPP": 0.263,
      "perCapitaPPP": 2352.2,
      "perCapitaPPPChangePct": 6.37,
      "popChangePct": 1.82
    },
    {
      "year": 2017,
      "gdpPPP": 0.278,
      "perCapitaPPP": 2444.1,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 1.79
    },
    {
      "year": 2018,
      "gdpPPP": 0.294,
      "perCapitaPPP": 2545.5,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 1.75
    },
    {
      "year": 2019,
      "gdpPPP": 0.309,
      "perCapitaPPP": 2629.0,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 1.72
    },
    {
      "year": 2020,
      "gdpPPP": 0.309,
      "perCapitaPPP": 2583.0,
      "perCapitaPPPChangePct": -1.75,
      "popChangePct": 0.85
    },
    {
      "year": 2021,
      "gdpPPP": 0.35,
      "perCapitaPPP": 2886.4,
      "perCapitaPPPChangePct": 11.75,
      "popChangePct": 1.68
    },
    {
      "year": 2022,
      "gdpPPP": 0.394,
      "perCapitaPPP": 3195.2,
      "perCapitaPPPChangePct": 10.7,
      "popChangePct": 1.65
    },
    {
      "year": 2023,
      "gdpPPP": 0.422,
      "perCapitaPPP": 3367.6,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 1.63
    },
    {
      "year": 2024,
      "gdpPPP": 0.453,
      "perCapitaPPP": 3556.4,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 1.6
    },
    {
      "year": 2025,
      "gdpPPP": 0.486,
      "perCapitaPPP": 3755.7,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 1.57
    },
    {
      "year": 2026,
      "gdpPPP": 0.515,
      "perCapitaPPP": 3921.2,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 1.55
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 0.539,
      "perCapitaPPP": 4040.3,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 1.53
    },
    {
      "year": 2028,
      "gdpPPP": 0.56,
      "perCapitaPPP": 4130.6,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 1.5
    },
    {
      "year": 2029,
      "gdpPPP": 0.582,
      "perCapitaPPP": 4228.6,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": 2.22
    },
    {
      "year": 2030,
      "gdpPPP": 0.605,
      "perCapitaPPP": 4329.7,
      "perCapitaPPPChangePct": 2.39,
      "popChangePct": 1.45
    },
    {
      "year": 2031,
      "gdpPPP": 0.629,
      "perCapitaPPP": 4432.5,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": 1.43
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function KiribatiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
