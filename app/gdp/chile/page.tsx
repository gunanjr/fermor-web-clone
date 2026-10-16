import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Chile",
  "slug": "chile",
  "iso3": "CHL",
  "region": "Americas",
  "rank2026": 44,
  "flagEmoji": "🇨🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Egypt",
      "slug": "egypt",
      "rank": 43
    },
    {
      "name": "Pakistan",
      "slug": "pakistan",
      "rank": 45
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 29.032,
      "growth": 7.9,
      "perCapita": 2598.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 34.374,
      "growth": 6.2,
      "perCapita": 3026.0,
      "popChangePct": 1.66
    },
    {
      "year": 1982,
      "gdp": 25.63,
      "growth": -13.6,
      "perCapita": 2220.0,
      "popChangePct": 1.63
    },
    {
      "year": 1983,
      "gdp": 20.819,
      "growth": -2.8,
      "perCapita": 1774.7,
      "popChangePct": 1.61
    },
    {
      "year": 1984,
      "gdp": 20.246,
      "growth": 5.9,
      "perCapita": 1698.9,
      "popChangePct": 1.59
    },
    {
      "year": 1985,
      "gdp": 17.36,
      "growth": 2,
      "perCapita": 1434.4,
      "popChangePct": 1.55
    },
    {
      "year": 1986,
      "gdp": 18.662,
      "growth": 5.6,
      "perCapita": 1515.1,
      "popChangePct": 1.78
    },
    {
      "year": 1987,
      "gdp": 22.01,
      "growth": 6.6,
      "perCapita": 1756.2,
      "popChangePct": 1.75
    },
    {
      "year": 1988,
      "gdp": 25.947,
      "growth": 7.3,
      "perCapita": 2035.3,
      "popChangePct": 1.72
    },
    {
      "year": 1989,
      "gdp": 29.889,
      "growth": 10.6,
      "perCapita": 2305.6,
      "popChangePct": 1.69
    },
    {
      "year": 1990,
      "gdp": 33.231,
      "growth": 3.7,
      "perCapita": 2521.6,
      "popChangePct": 1.67
    },
    {
      "year": 1991,
      "gdp": 38.249,
      "growth": 7.8,
      "perCapita": 2849.7,
      "popChangePct": 1.84
    },
    {
      "year": 1992,
      "gdp": 46.597,
      "growth": 11.2,
      "perCapita": 3383.8,
      "popChangePct": 2.6
    },
    {
      "year": 1993,
      "gdp": 49.855,
      "growth": 6.6,
      "perCapita": 3563.3,
      "popChangePct": 1.6
    },
    {
      "year": 1994,
      "gdp": 57.517,
      "growth": 5,
      "perCapita": 4048.7,
      "popChangePct": 1.54
    },
    {
      "year": 1995,
      "gdp": 74.119,
      "growth": 8.9,
      "perCapita": 5142.2,
      "popChangePct": 1.46
    },
    {
      "year": 1996,
      "gdp": 78.575,
      "growth": 5,
      "perCapita": 5376.8,
      "popChangePct": 1.39
    },
    {
      "year": 1997,
      "gdp": 85.73,
      "growth": 7.4,
      "perCapita": 5788.7,
      "popChangePct": 1.34
    },
    {
      "year": 1998,
      "gdp": 81.996,
      "growth": 4.2,
      "perCapita": 5465.8,
      "popChangePct": 1.3
    },
    {
      "year": 1999,
      "gdp": 75.596,
      "growth": -0.3,
      "perCapita": 4978.1,
      "popChangePct": 1.23
    },
    {
      "year": 2000,
      "gdp": 78.25,
      "growth": 5,
      "perCapita": 5092.5,
      "popChangePct": 1.19
    },
    {
      "year": 2001,
      "gdp": 71.517,
      "growth": 3.2,
      "perCapita": 4601.1,
      "popChangePct": 1.16
    },
    {
      "year": 2002,
      "gdp": 70.295,
      "growth": 3.2,
      "perCapita": 4472.9,
      "popChangePct": 1.11
    },
    {
      "year": 2003,
      "gdp": 76.508,
      "growth": 4.7,
      "perCapita": 4817.2,
      "popChangePct": 1.06
    },
    {
      "year": 2004,
      "gdp": 99.079,
      "growth": 6.7,
      "perCapita": 6176.4,
      "popChangePct": 1.01
    },
    {
      "year": 2005,
      "gdp": 122.315,
      "growth": 5.8,
      "perCapita": 7551.1,
      "popChangePct": 0.97
    },
    {
      "year": 2006,
      "gdp": 153.84,
      "growth": 6,
      "perCapita": 9405.3,
      "popChangePct": 0.98
    },
    {
      "year": 2007,
      "gdp": 172.565,
      "growth": 5.2,
      "perCapita": 10447.8,
      "popChangePct": 0.98
    },
    {
      "year": 2008,
      "gdp": 179.663,
      "growth": 3.8,
      "perCapita": 10769.8,
      "popChangePct": 1.0
    },
    {
      "year": 2009,
      "gdp": 171.794,
      "growth": -1.1,
      "perCapita": 10192.2,
      "popChangePct": 1.04
    },
    {
      "year": 2010,
      "gdp": 217.105,
      "growth": 5.9,
      "perCapita": 12748.1,
      "popChangePct": 1.04
    },
    {
      "year": 2011,
      "gdp": 251.225,
      "growth": 6.2,
      "perCapita": 14602.2,
      "popChangePct": 1.03
    },
    {
      "year": 2012,
      "gdp": 267.165,
      "growth": 6.2,
      "perCapita": 15371.4,
      "popChangePct": 1.02
    },
    {
      "year": 2013,
      "gdp": 277.218,
      "growth": 3.3,
      "perCapita": 15787.4,
      "popChangePct": 1.03
    },
    {
      "year": 2014,
      "gdp": 259.394,
      "growth": 1.8,
      "perCapita": 14614.3,
      "popChangePct": 1.08
    },
    {
      "year": 2015,
      "gdp": 242.515,
      "growth": 2.2,
      "perCapita": 13506.9,
      "popChangePct": 1.16
    },
    {
      "year": 2016,
      "gdp": 249.306,
      "growth": 1.8,
      "perCapita": 13704.9,
      "popChangePct": 1.31
    },
    {
      "year": 2017,
      "gdp": 276.357,
      "growth": 1.4,
      "perCapita": 14970.2,
      "popChangePct": 1.48
    },
    {
      "year": 2018,
      "gdp": 295.428,
      "growth": 4,
      "perCapita": 15752.4,
      "popChangePct": 1.59
    },
    {
      "year": 2019,
      "gdp": 278.04,
      "growth": 0.6,
      "perCapita": 14602.9,
      "popChangePct": 1.53
    },
    {
      "year": 2020,
      "gdp": 254.06,
      "growth": -6.1,
      "perCapita": 13207.9,
      "popChangePct": 1.03
    },
    {
      "year": 2021,
      "gdp": 315.411,
      "growth": 11.3,
      "perCapita": 16265.3,
      "popChangePct": 0.81
    },
    {
      "year": 2022,
      "gdp": 301.27,
      "growth": 2.2,
      "perCapita": 15385.4,
      "popChangePct": 0.98
    },
    {
      "year": 2023,
      "gdp": 335.627,
      "growth": 0.5,
      "perCapita": 16988.3,
      "popChangePct": 0.89
    },
    {
      "year": 2024,
      "gdp": 330.21,
      "growth": 2.6,
      "perCapita": 16589.8,
      "popChangePct": 0.75
    },
    {
      "year": 2025,
      "gdp": 355.346,
      "growth": 2.3,
      "perCapita": 17734.8,
      "popChangePct": 0.67
    },
    {
      "year": 2026,
      "gdp": 407.85,
      "growth": 2.4,
      "perCapita": 20239.8,
      "popChangePct": 0.57
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 434.037,
      "growth": 2.6,
      "perCapita": 21431.6,
      "popChangePct": 0.5
    },
    {
      "year": 2028,
      "gdp": 455.022,
      "growth": 2.3,
      "perCapita": 22368.3,
      "popChangePct": 0.44
    },
    {
      "year": 2029,
      "gdp": 475.623,
      "growth": 2.3,
      "perCapita": 23290.4,
      "popChangePct": 0.39
    },
    {
      "year": 2030,
      "gdp": 496.763,
      "growth": 2.3,
      "perCapita": 24244.4,
      "popChangePct": 0.34
    },
    {
      "year": 2031,
      "gdp": 519.088,
      "growth": 2.3,
      "perCapita": 25263.9,
      "popChangePct": 0.28
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 38.88,
      "perCapitaPPP": 3479.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 45.202,
      "perCapitaPPP": 3979.1,
      "perCapitaPPPChangePct": 14.36,
      "popChangePct": 1.66
    },
    {
      "year": 1982,
      "gdpPPP": 41.474,
      "perCapitaPPP": 3592.2,
      "perCapitaPPPChangePct": -9.72,
      "popChangePct": 1.63
    },
    {
      "year": 1983,
      "gdpPPP": 41.89,
      "perCapitaPPP": 3570.9,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 1.61
    },
    {
      "year": 1984,
      "gdpPPP": 45.956,
      "perCapitaPPP": 3856.5,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 1.59
    },
    {
      "year": 1985,
      "gdpPPP": 48.343,
      "perCapitaPPP": 3994.6,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 1.55
    },
    {
      "year": 1986,
      "gdpPPP": 52.076,
      "perCapitaPPP": 4227.8,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 1.78
    },
    {
      "year": 1987,
      "gdpPPP": 56.878,
      "perCapitaPPP": 4538.4,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": 1.75
    },
    {
      "year": 1988,
      "gdpPPP": 63.176,
      "perCapitaPPP": 4955.7,
      "perCapitaPPPChangePct": 9.2,
      "popChangePct": 1.72
    },
    {
      "year": 1989,
      "gdpPPP": 72.616,
      "perCapitaPPP": 5601.6,
      "perCapitaPPPChangePct": 13.03,
      "popChangePct": 1.69
    },
    {
      "year": 1990,
      "gdpPPP": 78.099,
      "perCapitaPPP": 5926.1,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 1.67
    },
    {
      "year": 1991,
      "gdpPPP": 87.042,
      "perCapitaPPP": 6485.0,
      "perCapitaPPPChangePct": 9.43,
      "popChangePct": 1.84
    },
    {
      "year": 1992,
      "gdpPPP": 98.967,
      "perCapitaPPP": 7186.7,
      "perCapitaPPPChangePct": 10.82,
      "popChangePct": 2.6
    },
    {
      "year": 1993,
      "gdpPPP": 107.987,
      "perCapitaPPP": 7718.3,
      "perCapitaPPPChangePct": 7.4,
      "popChangePct": 1.6
    },
    {
      "year": 1994,
      "gdpPPP": 115.841,
      "perCapitaPPP": 8154.2,
      "perCapitaPPPChangePct": 5.65,
      "popChangePct": 1.54
    },
    {
      "year": 1995,
      "gdpPPP": 128.835,
      "perCapitaPPP": 8938.2,
      "perCapitaPPPChangePct": 9.62,
      "popChangePct": 1.46
    },
    {
      "year": 1996,
      "gdpPPP": 137.734,
      "perCapitaPPP": 9424.9,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 1.39
    },
    {
      "year": 1997,
      "gdpPPP": 150.466,
      "perCapitaPPP": 10159.8,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 1.34
    },
    {
      "year": 1998,
      "gdpPPP": 158.518,
      "perCapitaPPP": 10566.7,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 1.3
    },
    {
      "year": 1999,
      "gdpPPP": 160.321,
      "perCapitaPPP": 10557.3,
      "perCapitaPPPChangePct": -0.09,
      "popChangePct": 1.23
    },
    {
      "year": 2000,
      "gdpPPP": 172.104,
      "perCapitaPPP": 11200.6,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": 1.19
    },
    {
      "year": 2001,
      "gdpPPP": 181.53,
      "perCapitaPPP": 11678.8,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.16
    },
    {
      "year": 2002,
      "gdpPPP": 190.255,
      "perCapitaPPP": 12105.9,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 1.11
    },
    {
      "year": 2003,
      "gdpPPP": 203.175,
      "perCapitaPPP": 12792.7,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 1.06
    },
    {
      "year": 2004,
      "gdpPPP": 222.563,
      "perCapitaPPP": 13874.1,
      "perCapitaPPPChangePct": 8.45,
      "popChangePct": 1.01
    },
    {
      "year": 2005,
      "gdpPPP": 242.941,
      "perCapitaPPP": 14997.9,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 0.97
    },
    {
      "year": 2006,
      "gdpPPP": 265.584,
      "perCapitaPPP": 16237.0,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": 0.98
    },
    {
      "year": 2007,
      "gdpPPP": 286.877,
      "perCapitaPPP": 17368.7,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 0.98
    },
    {
      "year": 2008,
      "gdpPPP": 303.484,
      "perCapitaPPP": 18192.0,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 1.0
    },
    {
      "year": 2009,
      "gdpPPP": 301.942,
      "perCapitaPPP": 17913.6,
      "perCapitaPPPChangePct": -1.53,
      "popChangePct": 1.04
    },
    {
      "year": 2010,
      "gdpPPP": 323.495,
      "perCapitaPPP": 18995.1,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 1.04
    },
    {
      "year": 2011,
      "gdpPPP": 350.719,
      "perCapitaPPP": 20385.2,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 1.03
    },
    {
      "year": 2012,
      "gdpPPP": 379.239,
      "perCapitaPPP": 21819.6,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": 1.02
    },
    {
      "year": 2013,
      "gdpPPP": 398.454,
      "perCapitaPPP": 22691.6,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 1.03
    },
    {
      "year": 2014,
      "gdpPPP": 412.661,
      "perCapitaPPP": 23249.4,
      "perCapitaPPPChangePct": 2.46,
      "popChangePct": 1.08
    },
    {
      "year": 2015,
      "gdpPPP": 425.453,
      "perCapitaPPP": 23695.7,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 1.16
    },
    {
      "year": 2016,
      "gdpPPP": 437.025,
      "perCapitaPPP": 24024.3,
      "perCapitaPPPChangePct": 1.39,
      "popChangePct": 1.31
    },
    {
      "year": 2017,
      "gdpPPP": 450.892,
      "perCapitaPPP": 24424.6,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 1.48
    },
    {
      "year": 2018,
      "gdpPPP": 478.094,
      "perCapitaPPP": 25492.2,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 1.59
    },
    {
      "year": 2019,
      "gdpPPP": 491.688,
      "perCapitaPPP": 25823.9,
      "perCapitaPPPChangePct": 1.3,
      "popChangePct": 1.53
    },
    {
      "year": 2020,
      "gdpPPP": 491.062,
      "perCapitaPPP": 25528.9,
      "perCapitaPPPChangePct": -1.14,
      "popChangePct": 1.03
    },
    {
      "year": 2021,
      "gdpPPP": 565.938,
      "perCapitaPPP": 29184.7,
      "perCapitaPPPChangePct": 14.32,
      "popChangePct": 0.81
    },
    {
      "year": 2022,
      "gdpPPP": 619.248,
      "perCapitaPPP": 31624.0,
      "perCapitaPPPChangePct": 8.36,
      "popChangePct": 0.98
    },
    {
      "year": 2023,
      "gdpPPP": 645.508,
      "perCapitaPPP": 32673.4,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 0.89
    },
    {
      "year": 2024,
      "gdpPPP": 679.026,
      "perCapitaPPP": 34114.5,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 0.75
    },
    {
      "year": 2025,
      "gdpPPP": 714.291,
      "perCapitaPPP": 35649.2,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": 0.67
    },
    {
      "year": 2026,
      "gdpPPP": 752.358,
      "perCapitaPPP": 37336.1,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 0.57
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 788.655,
      "perCapitaPPP": 38941.8,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 0.5
    },
    {
      "year": 2028,
      "gdpPPP": 820.266,
      "perCapitaPPP": 40323.3,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 0.44
    },
    {
      "year": 2029,
      "gdpPPP": 854.152,
      "perCapitaPPP": 41826.3,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 0.39
    },
    {
      "year": 2030,
      "gdpPPP": 889.55,
      "perCapitaPPP": 43414.3,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 0.34
    },
    {
      "year": 2031,
      "gdpPPP": 926.117,
      "perCapitaPPP": 45073.9,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.28
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ChileGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
