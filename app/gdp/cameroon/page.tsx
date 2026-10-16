import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Cameroon",
  "slug": "cameroon",
  "iso3": "CMR",
  "region": "Africa",
  "rank2026": 93,
  "flagEmoji": "🇨🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Uganda",
      "slug": "uganda",
      "rank": 92
    },
    {
      "name": "Jordan",
      "slug": "jordan",
      "rank": 94
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 8.85,
      "growth": 9.9,
      "perCapita": 1045.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 10.026,
      "growth": 17.1,
      "perCapita": 1150.8,
      "popChangePct": 2.91
    },
    {
      "year": 1982,
      "gdp": 9.616,
      "growth": 7.6,
      "perCapita": 1073.5,
      "popChangePct": 2.82
    },
    {
      "year": 1983,
      "gdp": 9.692,
      "growth": 6.8,
      "perCapita": 1053.1,
      "popChangePct": 2.73
    },
    {
      "year": 1984,
      "gdp": 10.243,
      "growth": 7.5,
      "perCapita": 1083.9,
      "popChangePct": 2.68
    },
    {
      "year": 1985,
      "gdp": 10.698,
      "growth": 8.1,
      "perCapita": 1102.7,
      "popChangePct": 2.67
    },
    {
      "year": 1986,
      "gdp": 13.945,
      "growth": 6.8,
      "perCapita": 1398.7,
      "popChangePct": 2.76
    },
    {
      "year": 1987,
      "gdp": 16.152,
      "growth": -2.2,
      "perCapita": 1575.3,
      "popChangePct": 2.85
    },
    {
      "year": 1988,
      "gdp": 16.403,
      "growth": -7.9,
      "perCapita": 1554.1,
      "popChangePct": 2.93
    },
    {
      "year": 1989,
      "gdp": 14.626,
      "growth": -1.8,
      "perCapita": 1345.0,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdp": 14.641,
      "growth": -6.2,
      "perCapita": 1305.7,
      "popChangePct": 3.12
    },
    {
      "year": 1991,
      "gdp": 16.325,
      "growth": -3.8,
      "perCapita": 1412.4,
      "popChangePct": 3.08
    },
    {
      "year": 1992,
      "gdp": 14.963,
      "growth": -3.1,
      "perCapita": 1256.2,
      "popChangePct": 3.05
    },
    {
      "year": 1993,
      "gdp": 15.611,
      "growth": -3.2,
      "perCapita": 1272.3,
      "popChangePct": 3.01
    },
    {
      "year": 1994,
      "gdp": 10.622,
      "growth": -2.5,
      "perCapita": 840.6,
      "popChangePct": 2.98
    },
    {
      "year": 1995,
      "gdp": 10.075,
      "growth": 3.3,
      "perCapita": 775.6,
      "popChangePct": 2.79
    },
    {
      "year": 1996,
      "gdp": 11.227,
      "growth": 4.9,
      "perCapita": 840.8,
      "popChangePct": 2.8
    },
    {
      "year": 1997,
      "gdp": 11.352,
      "growth": 5.3,
      "perCapita": 827.0,
      "popChangePct": 2.8
    },
    {
      "year": 1998,
      "gdp": 11.338,
      "growth": 4.9,
      "perCapita": 803.4,
      "popChangePct": 2.8
    },
    {
      "year": 1999,
      "gdp": 11.553,
      "growth": 4.1,
      "perCapita": 796.4,
      "popChangePct": 2.8
    },
    {
      "year": 2000,
      "gdp": 10.245,
      "growth": 3.8,
      "perCapita": 687.0,
      "popChangePct": 2.81
    },
    {
      "year": 2001,
      "gdp": 10.95,
      "growth": 4.3,
      "perCapita": 715.2,
      "popChangePct": 2.66
    },
    {
      "year": 2002,
      "gdp": 12.369,
      "growth": 4.5,
      "perCapita": 786.5,
      "popChangePct": 2.72
    },
    {
      "year": 2003,
      "gdp": 15.944,
      "growth": 5.5,
      "perCapita": 986.6,
      "popChangePct": 2.76
    },
    {
      "year": 2004,
      "gdp": 18.803,
      "growth": 7,
      "perCapita": 1132.0,
      "popChangePct": 2.78
    },
    {
      "year": 2005,
      "gdp": 19.534,
      "growth": 2.2,
      "perCapita": 1144.0,
      "popChangePct": 2.8
    },
    {
      "year": 2006,
      "gdp": 20.912,
      "growth": 3.8,
      "perCapita": 1191.5,
      "popChangePct": 2.78
    },
    {
      "year": 2007,
      "gdp": 23.931,
      "growth": 4.3,
      "perCapita": 1325.8,
      "popChangePct": 2.85
    },
    {
      "year": 2008,
      "gdp": 27.712,
      "growth": 2.8,
      "perCapita": 1492.0,
      "popChangePct": 2.9
    },
    {
      "year": 2009,
      "gdp": 27.903,
      "growth": 2.6,
      "perCapita": 1459.8,
      "popChangePct": 2.91
    },
    {
      "year": 2010,
      "gdp": 27.53,
      "growth": 2.9,
      "perCapita": 1399.7,
      "popChangePct": 2.9
    },
    {
      "year": 2011,
      "gdp": 30.626,
      "growth": 3.4,
      "perCapita": 1513.7,
      "popChangePct": 2.87
    },
    {
      "year": 2012,
      "gdp": 30.174,
      "growth": 4.6,
      "perCapita": 1450.0,
      "popChangePct": 2.86
    },
    {
      "year": 2013,
      "gdp": 33.729,
      "growth": 5,
      "perCapita": 1576.0,
      "popChangePct": 2.84
    },
    {
      "year": 2014,
      "gdp": 36.396,
      "growth": 5.7,
      "perCapita": 1649.9,
      "popChangePct": 3.07
    },
    {
      "year": 2015,
      "gdp": 32.213,
      "growth": 5.7,
      "perCapita": 1415.1,
      "popChangePct": 3.19
    },
    {
      "year": 2016,
      "gdp": 33.805,
      "growth": 4.5,
      "perCapita": 1441.3,
      "popChangePct": 3.04
    },
    {
      "year": 2017,
      "gdp": 36.086,
      "growth": 3.5,
      "perCapita": 1495.6,
      "popChangePct": 2.88
    },
    {
      "year": 2018,
      "gdp": 39.992,
      "growth": 4,
      "perCapita": 1612.2,
      "popChangePct": 2.81
    },
    {
      "year": 2019,
      "gdp": 39.673,
      "growth": 3.5,
      "perCapita": 1555.4,
      "popChangePct": 2.82
    },
    {
      "year": 2020,
      "gdp": 40.832,
      "growth": 0.3,
      "perCapita": 1557.9,
      "popChangePct": 2.76
    },
    {
      "year": 2021,
      "gdp": 45.036,
      "growth": 3.3,
      "perCapita": 1673.2,
      "popChangePct": 2.69
    },
    {
      "year": 2022,
      "gdp": 44.442,
      "growth": 3.7,
      "perCapita": 1608.3,
      "popChangePct": 2.66
    },
    {
      "year": 2023,
      "gdp": 48.822,
      "growth": 3.3,
      "perCapita": 1720.7,
      "popChangePct": 2.68
    },
    {
      "year": 2024,
      "gdp": 53.308,
      "growth": 3.5,
      "perCapita": 1830.4,
      "popChangePct": 2.65
    },
    {
      "year": 2025,
      "gdp": 59.282,
      "growth": 3.1,
      "perCapita": 1984.0,
      "popChangePct": 2.59
    },
    {
      "year": 2026,
      "gdp": 65.135,
      "growth": 3.3,
      "perCapita": 2125.4,
      "popChangePct": 2.57
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 68.6,
      "growth": 3.8,
      "perCapita": 2183.2,
      "popChangePct": 2.53
    },
    {
      "year": 2028,
      "gdp": 73.876,
      "growth": 4.2,
      "perCapita": 2293.6,
      "popChangePct": 2.5
    },
    {
      "year": 2029,
      "gdp": 79.435,
      "growth": 4.3,
      "perCapita": 2406.7,
      "popChangePct": 2.47
    },
    {
      "year": 2030,
      "gdp": 85.814,
      "growth": 4.4,
      "perCapita": 2537.9,
      "popChangePct": 2.45
    },
    {
      "year": 2031,
      "gdp": 92.356,
      "growth": 4.6,
      "perCapita": 2667.0,
      "popChangePct": 2.41
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 11.15,
      "perCapitaPPP": 1317.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 14.286,
      "perCapitaPPP": 1639.7,
      "perCapitaPPPChangePct": 24.5,
      "popChangePct": 2.91
    },
    {
      "year": 1982,
      "gdpPPP": 16.316,
      "perCapitaPPP": 1821.5,
      "perCapitaPPPChangePct": 11.08,
      "popChangePct": 2.82
    },
    {
      "year": 1983,
      "gdpPPP": 18.115,
      "perCapitaPPP": 1968.5,
      "perCapitaPPPChangePct": 8.07,
      "popChangePct": 2.73
    },
    {
      "year": 1984,
      "gdpPPP": 20.171,
      "perCapitaPPP": 2134.5,
      "perCapitaPPPChangePct": 8.43,
      "popChangePct": 2.68
    },
    {
      "year": 1985,
      "gdpPPP": 22.496,
      "perCapitaPPP": 2318.7,
      "perCapitaPPPChangePct": 8.63,
      "popChangePct": 2.67
    },
    {
      "year": 1986,
      "gdpPPP": 24.507,
      "perCapitaPPP": 2458.2,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 2.76
    },
    {
      "year": 1987,
      "gdpPPP": 24.574,
      "perCapitaPPP": 2396.6,
      "perCapitaPPPChangePct": -2.51,
      "popChangePct": 2.85
    },
    {
      "year": 1988,
      "gdpPPP": 23.439,
      "perCapitaPPP": 2220.8,
      "perCapitaPPPChangePct": -7.33,
      "popChangePct": 2.93
    },
    {
      "year": 1989,
      "gdpPPP": 23.928,
      "perCapitaPPP": 2200.3,
      "perCapitaPPPChangePct": -0.92,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdpPPP": 23.294,
      "perCapitaPPP": 2077.4,
      "perCapitaPPPChangePct": -5.59,
      "popChangePct": 3.12
    },
    {
      "year": 1991,
      "gdpPPP": 23.175,
      "perCapitaPPP": 2005.0,
      "perCapitaPPPChangePct": -3.48,
      "popChangePct": 3.08
    },
    {
      "year": 1992,
      "gdpPPP": 22.98,
      "perCapitaPPP": 1929.4,
      "perCapitaPPPChangePct": -3.77,
      "popChangePct": 3.05
    },
    {
      "year": 1993,
      "gdpPPP": 22.782,
      "perCapitaPPP": 1856.8,
      "perCapitaPPPChangePct": -3.76,
      "popChangePct": 3.01
    },
    {
      "year": 1994,
      "gdpPPP": 22.688,
      "perCapitaPPP": 1795.6,
      "perCapitaPPPChangePct": -3.3,
      "popChangePct": 2.98
    },
    {
      "year": 1995,
      "gdpPPP": 23.929,
      "perCapitaPPP": 1842.2,
      "perCapitaPPPChangePct": 2.6,
      "popChangePct": 2.79
    },
    {
      "year": 1996,
      "gdpPPP": 25.564,
      "perCapitaPPP": 1914.5,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 2.8
    },
    {
      "year": 1997,
      "gdpPPP": 27.387,
      "perCapitaPPP": 1995.1,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 2.8
    },
    {
      "year": 1998,
      "gdpPPP": 29.05,
      "perCapitaPPP": 2058.6,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 2.8
    },
    {
      "year": 1999,
      "gdpPPP": 30.658,
      "perCapitaPPP": 2113.4,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 2.8
    },
    {
      "year": 2000,
      "gdpPPP": 32.554,
      "perCapitaPPP": 2183.0,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 2.81
    },
    {
      "year": 2001,
      "gdpPPP": 34.727,
      "perCapitaPPP": 2268.3,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 2.66
    },
    {
      "year": 2002,
      "gdpPPP": 36.845,
      "perCapitaPPP": 2343.0,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 2.72
    },
    {
      "year": 2003,
      "gdpPPP": 39.621,
      "perCapitaPPP": 2451.8,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 2.76
    },
    {
      "year": 2004,
      "gdpPPP": 43.555,
      "perCapitaPPP": 2622.1,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 2.78
    },
    {
      "year": 2005,
      "gdpPPP": 45.922,
      "perCapitaPPP": 2689.5,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 2.8
    },
    {
      "year": 2006,
      "gdpPPP": 49.141,
      "perCapitaPPP": 2800.0,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 2.78
    },
    {
      "year": 2007,
      "gdpPPP": 52.657,
      "perCapitaPPP": 2917.3,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 2.85
    },
    {
      "year": 2008,
      "gdpPPP": 55.199,
      "perCapitaPPP": 2971.9,
      "perCapitaPPPChangePct": 1.87,
      "popChangePct": 2.9
    },
    {
      "year": 2009,
      "gdpPPP": 56.972,
      "perCapitaPPP": 2980.7,
      "perCapitaPPPChangePct": 0.3,
      "popChangePct": 2.91
    },
    {
      "year": 2010,
      "gdpPPP": 59.337,
      "perCapitaPPP": 3016.9,
      "perCapitaPPPChangePct": 1.22,
      "popChangePct": 2.9
    },
    {
      "year": 2011,
      "gdpPPP": 62.607,
      "perCapitaPPP": 3094.4,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 2.87
    },
    {
      "year": 2012,
      "gdpPPP": 66.723,
      "perCapitaPPP": 3206.4,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 2.86
    },
    {
      "year": 2013,
      "gdpPPP": 71.249,
      "perCapitaPPP": 3329.0,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 2.84
    },
    {
      "year": 2014,
      "gdpPPP": 76.636,
      "perCapitaPPP": 3474.0,
      "perCapitaPPPChangePct": 4.36,
      "popChangePct": 3.07
    },
    {
      "year": 2015,
      "gdpPPP": 81.73,
      "perCapitaPPP": 3590.4,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 3.19
    },
    {
      "year": 2016,
      "gdpPPP": 86.249,
      "perCapitaPPP": 3677.4,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": 3.04
    },
    {
      "year": 2017,
      "gdpPPP": 90.903,
      "perCapitaPPP": 3767.4,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 2.88
    },
    {
      "year": 2018,
      "gdpPPP": 99.493,
      "perCapitaPPP": 4010.8,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 2.81
    },
    {
      "year": 2019,
      "gdpPPP": 108.174,
      "perCapitaPPP": 4241.1,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 2.82
    },
    {
      "year": 2020,
      "gdpPPP": 114.421,
      "perCapitaPPP": 4365.4,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 2.76
    },
    {
      "year": 2021,
      "gdpPPP": 129.022,
      "perCapitaPPP": 4793.6,
      "perCapitaPPPChangePct": 9.81,
      "popChangePct": 2.69
    },
    {
      "year": 2022,
      "gdpPPP": 143.363,
      "perCapitaPPP": 5188.2,
      "perCapitaPPPChangePct": 8.23,
      "popChangePct": 2.66
    },
    {
      "year": 2023,
      "gdpPPP": 153.644,
      "perCapitaPPP": 5415.2,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 2.68
    },
    {
      "year": 2024,
      "gdpPPP": 163.008,
      "perCapitaPPP": 5597.1,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.65
    },
    {
      "year": 2025,
      "gdpPPP": 172.783,
      "perCapitaPPP": 5782.7,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.59
    },
    {
      "year": 2026,
      "gdpPPP": 183.677,
      "perCapitaPPP": 5993.6,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 2.57
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 194.783,
      "perCapitaPPP": 6198.9,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 2.53
    },
    {
      "year": 2028,
      "gdpPPP": 206.341,
      "perCapitaPPP": 6406.3,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 2.5
    },
    {
      "year": 2029,
      "gdpPPP": 219.042,
      "perCapitaPPP": 6636.4,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 2.47
    },
    {
      "year": 2030,
      "gdpPPP": 232.936,
      "perCapitaPPP": 6889.0,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 2.45
    },
    {
      "year": 2031,
      "gdpPPP": 247.998,
      "perCapitaPPP": 7161.5,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 2.41
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CameroonGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
