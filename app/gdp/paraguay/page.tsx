import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Paraguay",
  "slug": "paraguay",
  "iso3": "PRY",
  "region": "Americas",
  "rank2026": 96,
  "flagEmoji": "🇵🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Tunisia",
      "slug": "tunisia",
      "rank": 95
    },
    {
      "name": "Zimbabwe",
      "slug": "zimbabwe",
      "rank": 97
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.095,
      "growth": 11.7,
      "perCapita": 1344.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 5.22,
      "growth": 9.2,
      "perCapita": 1663.7,
      "popChangePct": 2.99
    },
    {
      "year": 1982,
      "gdp": 5.47,
      "growth": -1.4,
      "perCapita": 1692.7,
      "popChangePct": 3.0
    },
    {
      "year": 1983,
      "gdp": 6.069,
      "growth": -3,
      "perCapita": 1823.5,
      "popChangePct": 3.0
    },
    {
      "year": 1984,
      "gdp": 4.931,
      "growth": 2.8,
      "perCapita": 1438.7,
      "popChangePct": 3.0
    },
    {
      "year": 1985,
      "gdp": 4.214,
      "growth": 3.9,
      "perCapita": 1193.8,
      "popChangePct": 2.98
    },
    {
      "year": 1986,
      "gdp": 5.032,
      "growth": 0.3,
      "perCapita": 1385.7,
      "popChangePct": 2.89
    },
    {
      "year": 1987,
      "gdp": 4.216,
      "growth": 4.1,
      "perCapita": 1128.5,
      "popChangePct": 2.86
    },
    {
      "year": 1988,
      "gdp": 5.584,
      "growth": 5.9,
      "perCapita": 1453.2,
      "popChangePct": 2.86
    },
    {
      "year": 1989,
      "gdp": 4.046,
      "growth": 5.8,
      "perCapita": 1023.9,
      "popChangePct": 2.84
    },
    {
      "year": 1990,
      "gdp": 4.904,
      "growth": 4.1,
      "perCapita": 1207.5,
      "popChangePct": 2.76
    },
    {
      "year": 1991,
      "gdp": 6.984,
      "growth": 3.5,
      "perCapita": 1674.2,
      "popChangePct": 2.73
    },
    {
      "year": 1992,
      "gdp": 7.158,
      "growth": 1.7,
      "perCapita": 1671.2,
      "popChangePct": 2.66
    },
    {
      "year": 1993,
      "gdp": 7.249,
      "growth": 4.9,
      "perCapita": 1649.6,
      "popChangePct": 2.61
    },
    {
      "year": 1994,
      "gdp": 7.871,
      "growth": 5.3,
      "perCapita": 1746.9,
      "popChangePct": 2.53
    },
    {
      "year": 1995,
      "gdp": 9.062,
      "growth": 6.8,
      "perCapita": 1963.0,
      "popChangePct": 2.44
    },
    {
      "year": 1996,
      "gdp": 9.788,
      "growth": 1.6,
      "perCapita": 2070.9,
      "popChangePct": 2.4
    },
    {
      "year": 1997,
      "gdp": 9.965,
      "growth": 4.2,
      "perCapita": 2060.6,
      "popChangePct": 2.31
    },
    {
      "year": 1998,
      "gdp": 9.26,
      "growth": 0.1,
      "perCapita": 1872.8,
      "popChangePct": 2.25
    },
    {
      "year": 1999,
      "gdp": 8.837,
      "growth": -1.4,
      "perCapita": 1749.3,
      "popChangePct": 2.16
    },
    {
      "year": 2000,
      "gdp": 8.856,
      "growth": -2.3,
      "perCapita": 1717.9,
      "popChangePct": 2.04
    },
    {
      "year": 2001,
      "gdp": 8.496,
      "growth": -0.8,
      "perCapita": 1622.1,
      "popChangePct": 1.61
    },
    {
      "year": 2002,
      "gdp": 7.196,
      "growth": 0,
      "perCapita": 1356.2,
      "popChangePct": 1.3
    },
    {
      "year": 2003,
      "gdp": 7.691,
      "growth": 4.3,
      "perCapita": 1433.7,
      "popChangePct": 1.11
    },
    {
      "year": 2004,
      "gdp": 9.624,
      "growth": 4.1,
      "perCapita": 1776.4,
      "popChangePct": 0.99
    },
    {
      "year": 2005,
      "gdp": 10.738,
      "growth": 2.1,
      "perCapita": 1964.0,
      "popChangePct": 0.9
    },
    {
      "year": 2006,
      "gdp": 13.43,
      "growth": 4.8,
      "perCapita": 2436.8,
      "popChangePct": 0.8
    },
    {
      "year": 2007,
      "gdp": 17.856,
      "growth": 5.4,
      "perCapita": 3216.7,
      "popChangePct": 0.73
    },
    {
      "year": 2008,
      "gdp": 24.615,
      "growth": 6.5,
      "perCapita": 4404.7,
      "popChangePct": 0.67
    },
    {
      "year": 2009,
      "gdp": 22.355,
      "growth": -0.3,
      "perCapita": 3972.8,
      "popChangePct": 0.7
    },
    {
      "year": 2010,
      "gdp": 27.129,
      "growth": 11.1,
      "perCapita": 4786.4,
      "popChangePct": 0.73
    },
    {
      "year": 2011,
      "gdp": 33.737,
      "growth": 4.3,
      "perCapita": 5907.5,
      "popChangePct": 0.76
    },
    {
      "year": 2012,
      "gdp": 33.296,
      "growth": -0.7,
      "perCapita": 5784.2,
      "popChangePct": 0.79
    },
    {
      "year": 2013,
      "gdp": 38.651,
      "growth": 8.3,
      "perCapita": 6658.3,
      "popChangePct": 0.85
    },
    {
      "year": 2014,
      "gdp": 40.378,
      "growth": 5.3,
      "perCapita": 6894.0,
      "popChangePct": 0.9
    },
    {
      "year": 2015,
      "gdp": 36.211,
      "growth": 3,
      "perCapita": 6125.0,
      "popChangePct": 0.94
    },
    {
      "year": 2016,
      "gdp": 36.09,
      "growth": 4.3,
      "perCapita": 6045.7,
      "popChangePct": 0.96
    },
    {
      "year": 2017,
      "gdp": 38.997,
      "growth": 4.8,
      "perCapita": 6469.2,
      "popChangePct": 0.99
    },
    {
      "year": 2018,
      "gdp": 40.225,
      "growth": 3.2,
      "perCapita": 6608.5,
      "popChangePct": 0.98
    },
    {
      "year": 2019,
      "gdp": 37.925,
      "growth": -0.4,
      "perCapita": 6171.9,
      "popChangePct": 0.95
    },
    {
      "year": 2020,
      "gdp": 35.432,
      "growth": -0.8,
      "perCapita": 5712.6,
      "popChangePct": 0.93
    },
    {
      "year": 2021,
      "gdp": 39.937,
      "growth": 4,
      "perCapita": 6392.1,
      "popChangePct": 0.74
    },
    {
      "year": 2022,
      "gdp": 41.841,
      "growth": 0,
      "perCapita": 6658.4,
      "popChangePct": 0.58
    },
    {
      "year": 2023,
      "gdp": 43.14,
      "growth": 5.3,
      "perCapita": 6818.7,
      "popChangePct": 0.68
    },
    {
      "year": 2024,
      "gdp": 44.739,
      "growth": 4.7,
      "perCapita": 7020.5,
      "popChangePct": 0.73
    },
    {
      "year": 2025,
      "gdp": 49.358,
      "growth": 6,
      "perCapita": 7691.6,
      "popChangePct": 0.69
    },
    {
      "year": 2026,
      "gdp": 60.542,
      "growth": 4.2,
      "perCapita": 9371.6,
      "popChangePct": 0.67
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 64.029,
      "growth": 3.5,
      "perCapita": 9847.7,
      "popChangePct": 0.65
    },
    {
      "year": 2028,
      "gdp": 67.644,
      "growth": 3.5,
      "perCapita": 10339.6,
      "popChangePct": 0.62
    },
    {
      "year": 2029,
      "gdp": 71.476,
      "growth": 3.5,
      "perCapita": 10860.7,
      "popChangePct": 0.6
    },
    {
      "year": 2030,
      "gdp": 75.522,
      "growth": 3.5,
      "perCapita": 11410.4,
      "popChangePct": 0.58
    },
    {
      "year": 2031,
      "gdp": 79.788,
      "growth": 3.5,
      "perCapita": 11989.0,
      "popChangePct": 0.54
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 10.645,
      "perCapitaPPP": 3494.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 12.72,
      "perCapitaPPP": 4054.5,
      "perCapitaPPPChangePct": 16.02,
      "popChangePct": 2.99
    },
    {
      "year": 1982,
      "gdpPPP": 13.317,
      "perCapitaPPP": 4121.5,
      "perCapitaPPPChangePct": 1.65,
      "popChangePct": 3.0
    },
    {
      "year": 1983,
      "gdpPPP": 13.418,
      "perCapitaPPP": 4031.8,
      "perCapitaPPPChangePct": -2.18,
      "popChangePct": 3.0
    },
    {
      "year": 1984,
      "gdpPPP": 14.294,
      "perCapitaPPP": 4170.1,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 3.0
    },
    {
      "year": 1985,
      "gdpPPP": 15.317,
      "perCapitaPPP": 4338.6,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 2.98
    },
    {
      "year": 1986,
      "gdpPPP": 15.666,
      "perCapitaPPP": 4313.8,
      "perCapitaPPPChangePct": -0.57,
      "popChangePct": 2.89
    },
    {
      "year": 1987,
      "gdpPPP": 16.708,
      "perCapitaPPP": 4472.2,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 2.86
    },
    {
      "year": 1988,
      "gdpPPP": 18.315,
      "perCapitaPPP": 4766.2,
      "perCapitaPPPChangePct": 6.57,
      "popChangePct": 2.86
    },
    {
      "year": 1989,
      "gdpPPP": 20.14,
      "perCapitaPPP": 5096.7,
      "perCapitaPPPChangePct": 6.94,
      "popChangePct": 2.84
    },
    {
      "year": 1990,
      "gdpPPP": 21.754,
      "perCapitaPPP": 5356.4,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 2.76
    },
    {
      "year": 1991,
      "gdpPPP": 23.275,
      "perCapitaPPP": 5579.2,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 2.73
    },
    {
      "year": 1992,
      "gdpPPP": 24.209,
      "perCapitaPPP": 5652.5,
      "perCapitaPPPChangePct": 1.31,
      "popChangePct": 2.66
    },
    {
      "year": 1993,
      "gdpPPP": 26.007,
      "perCapitaPPP": 5917.9,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 2.61
    },
    {
      "year": 1994,
      "gdpPPP": 27.975,
      "perCapitaPPP": 6208.9,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 2.53
    },
    {
      "year": 1995,
      "gdpPPP": 30.51,
      "perCapitaPPP": 6609.0,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 2.44
    },
    {
      "year": 1996,
      "gdpPPP": 31.557,
      "perCapitaPPP": 6676.4,
      "perCapitaPPPChangePct": 1.02,
      "popChangePct": 2.4
    },
    {
      "year": 1997,
      "gdpPPP": 33.463,
      "perCapitaPPP": 6919.4,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 2.31
    },
    {
      "year": 1998,
      "gdpPPP": 33.862,
      "perCapitaPPP": 6848.2,
      "perCapitaPPPChangePct": -1.03,
      "popChangePct": 2.25
    },
    {
      "year": 1999,
      "gdpPPP": 33.872,
      "perCapitaPPP": 6705.2,
      "perCapitaPPPChangePct": -2.09,
      "popChangePct": 2.16
    },
    {
      "year": 2000,
      "gdpPPP": 33.838,
      "perCapitaPPP": 6564.1,
      "perCapitaPPPChangePct": -2.11,
      "popChangePct": 2.04
    },
    {
      "year": 2001,
      "gdpPPP": 34.311,
      "perCapitaPPP": 6551.0,
      "perCapitaPPPChangePct": -0.2,
      "popChangePct": 1.61
    },
    {
      "year": 2002,
      "gdpPPP": 34.837,
      "perCapitaPPP": 6565.4,
      "perCapitaPPPChangePct": 0.22,
      "popChangePct": 1.3
    },
    {
      "year": 2003,
      "gdpPPP": 37.06,
      "perCapitaPPP": 6908.2,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 1.11
    },
    {
      "year": 2004,
      "gdpPPP": 39.601,
      "perCapitaPPP": 7309.1,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.99
    },
    {
      "year": 2005,
      "gdpPPP": 41.714,
      "perCapitaPPP": 7630.0,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 0.9
    },
    {
      "year": 2006,
      "gdpPPP": 45.067,
      "perCapitaPPP": 8177.1,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 0.8
    },
    {
      "year": 2007,
      "gdpPPP": 48.798,
      "perCapitaPPP": 8790.6,
      "perCapitaPPPChangePct": 7.5,
      "popChangePct": 0.73
    },
    {
      "year": 2008,
      "gdpPPP": 52.969,
      "perCapitaPPP": 9478.2,
      "perCapitaPPPChangePct": 7.82,
      "popChangePct": 0.67
    },
    {
      "year": 2009,
      "gdpPPP": 53.156,
      "perCapitaPPP": 9446.6,
      "perCapitaPPPChangePct": -0.33,
      "popChangePct": 0.7
    },
    {
      "year": 2010,
      "gdpPPP": 59.772,
      "perCapitaPPP": 10545.4,
      "perCapitaPPPChangePct": 11.63,
      "popChangePct": 0.73
    },
    {
      "year": 2011,
      "gdpPPP": 63.62,
      "perCapitaPPP": 11140.1,
      "perCapitaPPPChangePct": 5.64,
      "popChangePct": 0.76
    },
    {
      "year": 2012,
      "gdpPPP": 64.346,
      "perCapitaPPP": 11178.1,
      "perCapitaPPPChangePct": 0.34,
      "popChangePct": 0.79
    },
    {
      "year": 2013,
      "gdpPPP": 70.868,
      "perCapitaPPP": 12208.1,
      "perCapitaPPPChangePct": 9.21,
      "popChangePct": 0.85
    },
    {
      "year": 2014,
      "gdpPPP": 75.925,
      "perCapitaPPP": 12963.1,
      "perCapitaPPPChangePct": 6.18,
      "popChangePct": 0.9
    },
    {
      "year": 2015,
      "gdpPPP": 78.895,
      "perCapitaPPP": 13344.8,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 0.94
    },
    {
      "year": 2016,
      "gdpPPP": 83.044,
      "perCapitaPPP": 13911.4,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 0.96
    },
    {
      "year": 2017,
      "gdpPPP": 88.598,
      "perCapitaPPP": 14697.5,
      "perCapitaPPPChangePct": 5.65,
      "popChangePct": 0.99
    },
    {
      "year": 2018,
      "gdpPPP": 90.877,
      "perCapitaPPP": 14930.0,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 0.98
    },
    {
      "year": 2019,
      "gdpPPP": 92.185,
      "perCapitaPPP": 15002.1,
      "perCapitaPPPChangePct": 0.48,
      "popChangePct": 0.95
    },
    {
      "year": 2020,
      "gdpPPP": 94.492,
      "perCapitaPPP": 15234.6,
      "perCapitaPPPChangePct": 1.55,
      "popChangePct": 0.93
    },
    {
      "year": 2021,
      "gdpPPP": 102.943,
      "perCapitaPPP": 16476.3,
      "perCapitaPPPChangePct": 8.15,
      "popChangePct": 0.74
    },
    {
      "year": 2022,
      "gdpPPP": 110.233,
      "perCapitaPPP": 17541.9,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 0.58
    },
    {
      "year": 2023,
      "gdpPPP": 120.355,
      "perCapitaPPP": 19022.9,
      "perCapitaPPPChangePct": 8.44,
      "popChangePct": 0.68
    },
    {
      "year": 2024,
      "gdpPPP": 129.101,
      "perCapitaPPP": 20258.8,
      "perCapitaPPPChangePct": 6.5,
      "popChangePct": 0.73
    },
    {
      "year": 2025,
      "gdpPPP": 140.73,
      "perCapitaPPP": 21930.5,
      "perCapitaPPPChangePct": 8.25,
      "popChangePct": 0.69
    },
    {
      "year": 2026,
      "gdpPPP": 150.841,
      "perCapitaPPP": 23349.5,
      "perCapitaPPPChangePct": 6.47,
      "popChangePct": 0.67
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 159.549,
      "perCapitaPPP": 24539.0,
      "perCapitaPPPChangePct": 5.09,
      "popChangePct": 0.65
    },
    {
      "year": 2028,
      "gdpPPP": 167.844,
      "perCapitaPPP": 25655.7,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 0.62
    },
    {
      "year": 2029,
      "gdpPPP": 176.807,
      "perCapitaPPP": 26865.9,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 0.6
    },
    {
      "year": 2030,
      "gdpPPP": 186.358,
      "perCapitaPPP": 28156.1,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 0.58
    },
    {
      "year": 2031,
      "gdpPPP": 196.362,
      "perCapitaPPP": 29505.7,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.54
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ParaguayGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
