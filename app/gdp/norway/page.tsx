import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Norway",
  "slug": "norway",
  "iso3": "NOR",
  "region": "Europe",
  "rank2026": 31,
  "flagEmoji": "🇳🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "United Arab Emirates",
      "slug": "united-arab-emirates",
      "rank": 30
    },
    {
      "name": "Thailand",
      "slug": "thailand",
      "rank": 32
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 64.177,
      "growth": 4.5,
      "perCapita": 15682.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 63.393,
      "growth": 1.7,
      "perCapita": 15435.0,
      "popChangePct": 0.37
    },
    {
      "year": 1982,
      "gdp": 62.453,
      "growth": 0.2,
      "perCapita": 15149.2,
      "popChangePct": 0.39
    },
    {
      "year": 1983,
      "gdp": 61.418,
      "growth": 3.9,
      "perCapita": 14855.5,
      "popChangePct": 0.27
    },
    {
      "year": 1984,
      "gdp": 61.866,
      "growth": 6.1,
      "perCapita": 14922.5,
      "popChangePct": 0.29
    },
    {
      "year": 1985,
      "gdp": 65.211,
      "growth": 5.6,
      "perCapita": 15678.9,
      "popChangePct": 0.31
    },
    {
      "year": 1986,
      "gdp": 78.438,
      "growth": 4,
      "perCapita": 18792.0,
      "popChangePct": 0.36
    },
    {
      "year": 1987,
      "gdp": 93.914,
      "growth": 1.7,
      "perCapita": 22369.6,
      "popChangePct": 0.57
    },
    {
      "year": 1988,
      "gdp": 101.498,
      "growth": -0.3,
      "perCapita": 24047.7,
      "popChangePct": 0.55
    },
    {
      "year": 1989,
      "gdp": 102.227,
      "growth": 1,
      "perCapita": 24149.4,
      "popChangePct": 0.28
    },
    {
      "year": 1990,
      "gdp": 119.344,
      "growth": 2,
      "perCapita": 28082.0,
      "popChangePct": 0.4
    },
    {
      "year": 1991,
      "gdp": 121.149,
      "growth": 2.9,
      "perCapita": 28345.3,
      "popChangePct": 0.56
    },
    {
      "year": 1992,
      "gdp": 129.999,
      "growth": 3.6,
      "perCapita": 30237.7,
      "popChangePct": 0.58
    },
    {
      "year": 1993,
      "gdp": 119.841,
      "growth": 2.9,
      "perCapita": 27710.1,
      "popChangePct": 0.6
    },
    {
      "year": 1994,
      "gdp": 126.325,
      "growth": 5,
      "perCapita": 29050.8,
      "popChangePct": 0.53
    },
    {
      "year": 1995,
      "gdp": 151.085,
      "growth": 4.2,
      "perCapita": 34573.5,
      "popChangePct": 0.51
    },
    {
      "year": 1996,
      "gdp": 162.428,
      "growth": 5,
      "perCapita": 36976.6,
      "popChangePct": 0.53
    },
    {
      "year": 1997,
      "gdp": 160.014,
      "growth": 5.1,
      "perCapita": 36257.1,
      "popChangePct": 0.46
    },
    {
      "year": 1998,
      "gdp": 152.956,
      "growth": 2.7,
      "perCapita": 34445.1,
      "popChangePct": 0.63
    },
    {
      "year": 1999,
      "gdp": 161.305,
      "growth": 2.2,
      "perCapita": 36059.3,
      "popChangePct": 0.72
    },
    {
      "year": 2000,
      "gdp": 170.619,
      "growth": 3.4,
      "perCapita": 37908.6,
      "popChangePct": 0.63
    },
    {
      "year": 2001,
      "gdp": 173.592,
      "growth": 2.2,
      "perCapita": 38410.4,
      "popChangePct": 0.4
    },
    {
      "year": 2002,
      "gdp": 195.361,
      "growth": 1.5,
      "perCapita": 42961.9,
      "popChangePct": 0.62
    },
    {
      "year": 2003,
      "gdp": 229.193,
      "growth": 1.1,
      "perCapita": 50119.5,
      "popChangePct": 0.57
    },
    {
      "year": 2004,
      "gdp": 265.662,
      "growth": 4.3,
      "perCapita": 57762.7,
      "popChangePct": 0.57
    },
    {
      "year": 2005,
      "gdp": 311.418,
      "growth": 3,
      "perCapita": 67234.8,
      "popChangePct": 0.72
    },
    {
      "year": 2006,
      "gdp": 349.772,
      "growth": 2.8,
      "perCapita": 74867.6,
      "popChangePct": 0.86
    },
    {
      "year": 2007,
      "gdp": 407.817,
      "growth": 3.4,
      "perCapita": 86372.2,
      "popChangePct": 1.07
    },
    {
      "year": 2008,
      "gdp": 472.061,
      "growth": 0.8,
      "perCapita": 98612.7,
      "popChangePct": 1.38
    },
    {
      "year": 2009,
      "gdp": 395.663,
      "growth": -1.6,
      "perCapita": 81703.3,
      "popChangePct": 1.17
    },
    {
      "year": 2010,
      "gdp": 440.133,
      "growth": 1,
      "perCapita": 89673.9,
      "popChangePct": 1.34
    },
    {
      "year": 2011,
      "gdp": 512.869,
      "growth": 1.4,
      "perCapita": 103130.1,
      "popChangePct": 1.32
    },
    {
      "year": 2012,
      "gdp": 525.084,
      "growth": 2.8,
      "perCapita": 104221.9,
      "popChangePct": 1.31
    },
    {
      "year": 2013,
      "gdp": 540.133,
      "growth": 1.3,
      "perCapita": 105985.3,
      "popChangePct": 1.15
    },
    {
      "year": 2014,
      "gdp": 515.83,
      "growth": 2.1,
      "perCapita": 100035.8,
      "popChangePct": 1.18
    },
    {
      "year": 2015,
      "gdp": 400.669,
      "growth": 2,
      "perCapita": 76971.2,
      "popChangePct": 0.95
    },
    {
      "year": 2016,
      "gdp": 383.284,
      "growth": 1.3,
      "perCapita": 72976.4,
      "popChangePct": 0.9
    },
    {
      "year": 2017,
      "gdp": 415.673,
      "growth": 2.7,
      "perCapita": 78572.8,
      "popChangePct": 0.72
    },
    {
      "year": 2018,
      "gdp": 454.589,
      "growth": 1.1,
      "perCapita": 85386.0,
      "popChangePct": 0.64
    },
    {
      "year": 2019,
      "gdp": 424.245,
      "growth": 1.5,
      "perCapita": 79197.7,
      "popChangePct": 0.62
    },
    {
      "year": 2020,
      "gdp": 382.253,
      "growth": -1.4,
      "perCapita": 70990.3,
      "popChangePct": 0.52
    },
    {
      "year": 2021,
      "gdp": 521.592,
      "growth": 4.1,
      "perCapita": 96320.6,
      "popChangePct": 0.56
    },
    {
      "year": 2022,
      "gdp": 617.322,
      "growth": 4.1,
      "perCapita": 112747.9,
      "popChangePct": 1.11
    },
    {
      "year": 2023,
      "gdp": 502.198,
      "growth": 0.4,
      "perCapita": 90754.5,
      "popChangePct": 1.08
    },
    {
      "year": 2024,
      "gdp": 500.886,
      "growth": 1.4,
      "perCapita": 89683.5,
      "popChangePct": 0.92
    },
    {
      "year": 2025,
      "gdp": 530.756,
      "growth": 1.1,
      "perCapita": 94468.2,
      "popChangePct": 0.59
    },
    {
      "year": 2026,
      "gdp": 599.406,
      "growth": 1.5,
      "perCapita": 105876.9,
      "popChangePct": 0.77
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 604.144,
      "growth": 1.3,
      "perCapita": 105903.2,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdp": 605.423,
      "growth": 1.1,
      "perCapita": 105321.3,
      "popChangePct": 0.75
    },
    {
      "year": 2029,
      "gdp": 607.524,
      "growth": 1.1,
      "perCapita": 104884.2,
      "popChangePct": 0.77
    },
    {
      "year": 2030,
      "gdp": 611.78,
      "growth": 1.1,
      "perCapita": 104816.7,
      "popChangePct": 0.78
    },
    {
      "year": 2031,
      "gdp": 617.687,
      "growth": 1.1,
      "perCapita": 105024.9,
      "popChangePct": 0.75
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 54.648,
      "perCapitaPPP": 13353.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 60.819,
      "perCapitaPPP": 14808.5,
      "perCapitaPPPChangePct": 10.89,
      "popChangePct": 0.37
    },
    {
      "year": 1982,
      "gdpPPP": 64.734,
      "perCapitaPPP": 15702.6,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 0.39
    },
    {
      "year": 1983,
      "gdpPPP": 69.92,
      "perCapitaPPP": 16912.0,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": 0.27
    },
    {
      "year": 1984,
      "gdpPPP": 76.845,
      "perCapitaPPP": 18535.5,
      "perCapitaPPPChangePct": 9.6,
      "popChangePct": 0.29
    },
    {
      "year": 1985,
      "gdpPPP": 83.684,
      "perCapitaPPP": 20120.2,
      "perCapitaPPPChangePct": 8.55,
      "popChangePct": 0.31
    },
    {
      "year": 1986,
      "gdpPPP": 88.824,
      "perCapitaPPP": 21280.3,
      "perCapitaPPPChangePct": 5.77,
      "popChangePct": 0.36
    },
    {
      "year": 1987,
      "gdpPPP": 92.613,
      "perCapitaPPP": 22059.7,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 0.57
    },
    {
      "year": 1988,
      "gdpPPP": 95.562,
      "perCapitaPPP": 22641.5,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 0.55
    },
    {
      "year": 1989,
      "gdpPPP": 100.332,
      "perCapitaPPP": 23701.8,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 0.28
    },
    {
      "year": 1990,
      "gdpPPP": 106.126,
      "perCapitaPPP": 24971.9,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.4
    },
    {
      "year": 1991,
      "gdpPPP": 112.852,
      "perCapitaPPP": 26404.2,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 0.56
    },
    {
      "year": 1992,
      "gdpPPP": 119.538,
      "perCapitaPPP": 27804.5,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 0.58
    },
    {
      "year": 1993,
      "gdpPPP": 125.887,
      "perCapitaPPP": 29108.1,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": 0.6
    },
    {
      "year": 1994,
      "gdpPPP": 135.055,
      "perCapitaPPP": 31058.4,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 0.53
    },
    {
      "year": 1995,
      "gdpPPP": 143.612,
      "perCapitaPPP": 32863.5,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 0.51
    },
    {
      "year": 1996,
      "gdpPPP": 153.509,
      "perCapitaPPP": 34946.3,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 0.53
    },
    {
      "year": 1997,
      "gdpPPP": 164.108,
      "perCapitaPPP": 37184.8,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 0.46
    },
    {
      "year": 1998,
      "gdpPPP": 170.476,
      "perCapitaPPP": 38390.6,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 0.63
    },
    {
      "year": 1999,
      "gdpPPP": 176.662,
      "perCapitaPPP": 39492.2,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 0.72
    },
    {
      "year": 2000,
      "gdpPPP": 186.885,
      "perCapitaPPP": 41522.5,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 0.63
    },
    {
      "year": 2001,
      "gdpPPP": 195.227,
      "perCapitaPPP": 43197.4,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.4
    },
    {
      "year": 2002,
      "gdpPPP": 201.15,
      "perCapitaPPP": 44235.0,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 0.62
    },
    {
      "year": 2003,
      "gdpPPP": 207.37,
      "perCapitaPPP": 45347.4,
      "perCapitaPPPChangePct": 2.51,
      "popChangePct": 0.57
    },
    {
      "year": 2004,
      "gdpPPP": 222.167,
      "perCapitaPPP": 48305.6,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 0.57
    },
    {
      "year": 2005,
      "gdpPPP": 235.938,
      "perCapitaPPP": 50938.8,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 0.72
    },
    {
      "year": 2006,
      "gdpPPP": 250.139,
      "perCapitaPPP": 53541.6,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": 0.86
    },
    {
      "year": 2007,
      "gdpPPP": 265.704,
      "perCapitaPPP": 56273.8,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": 1.07
    },
    {
      "year": 2008,
      "gdpPPP": 273.05,
      "perCapitaPPP": 57039.7,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 1.38
    },
    {
      "year": 2009,
      "gdpPPP": 270.302,
      "perCapitaPPP": 55816.7,
      "perCapitaPPPChangePct": -2.14,
      "popChangePct": 1.17
    },
    {
      "year": 2010,
      "gdpPPP": 276.337,
      "perCapitaPPP": 56301.7,
      "perCapitaPPPChangePct": 0.87,
      "popChangePct": 1.34
    },
    {
      "year": 2011,
      "gdpPPP": 285.945,
      "perCapitaPPP": 57499.1,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 1.32
    },
    {
      "year": 2012,
      "gdpPPP": 299.494,
      "perCapitaPPP": 59445.4,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 1.31
    },
    {
      "year": 2013,
      "gdpPPP": 308.469,
      "perCapitaPPP": 60528.0,
      "perCapitaPPPChangePct": 1.82,
      "popChangePct": 1.15
    },
    {
      "year": 2014,
      "gdpPPP": 320.417,
      "perCapitaPPP": 62139.0,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 1.18
    },
    {
      "year": 2015,
      "gdpPPP": 330.002,
      "perCapitaPPP": 63395.6,
      "perCapitaPPPChangePct": 2.02,
      "popChangePct": 0.95
    },
    {
      "year": 2016,
      "gdpPPP": 337.44,
      "perCapitaPPP": 64247.8,
      "perCapitaPPPChangePct": 1.34,
      "popChangePct": 0.9
    },
    {
      "year": 2017,
      "gdpPPP": 352.653,
      "perCapitaPPP": 66660.5,
      "perCapitaPPPChangePct": 3.76,
      "popChangePct": 0.72
    },
    {
      "year": 2018,
      "gdpPPP": 385.742,
      "perCapitaPPP": 72454.3,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 0.64
    },
    {
      "year": 2019,
      "gdpPPP": 393.766,
      "perCapitaPPP": 73507.9,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 0.62
    },
    {
      "year": 2020,
      "gdpPPP": 375.376,
      "perCapitaPPP": 69713.2,
      "perCapitaPPPChangePct": -5.16,
      "popChangePct": 0.52
    },
    {
      "year": 2021,
      "gdpPPP": 499.939,
      "perCapitaPPP": 92322.1,
      "perCapitaPPPChangePct": 32.43,
      "popChangePct": 0.56
    },
    {
      "year": 2022,
      "gdpPPP": 557.347,
      "perCapitaPPP": 101794.1,
      "perCapitaPPPChangePct": 10.26,
      "popChangePct": 1.11
    },
    {
      "year": 2023,
      "gdpPPP": 580.008,
      "perCapitaPPP": 104816.0,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 1.08
    },
    {
      "year": 2024,
      "gdpPPP": 602.87,
      "perCapitaPPP": 107943.6,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 0.92
    },
    {
      "year": 2025,
      "gdpPPP": 626.7,
      "perCapitaPPP": 111545.1,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 0.59
    },
    {
      "year": 2026,
      "gdpPPP": 654.16,
      "perCapitaPPP": 115548.4,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 0.77
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 677.417,
      "perCapitaPPP": 118747.6,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 0.78
    },
    {
      "year": 2028,
      "gdpPPP": 696.344,
      "perCapitaPPP": 121138.3,
      "perCapitaPPPChangePct": 2.01,
      "popChangePct": 0.75
    },
    {
      "year": 2029,
      "gdpPPP": 716.792,
      "perCapitaPPP": 123748.4,
      "perCapitaPPPChangePct": 2.15,
      "popChangePct": 0.77
    },
    {
      "year": 2030,
      "gdpPPP": 738.301,
      "perCapitaPPP": 126493.7,
      "perCapitaPPPChangePct": 2.22,
      "popChangePct": 0.78
    },
    {
      "year": 2031,
      "gdpPPP": 760.247,
      "perCapitaPPP": 129264.3,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 0.75
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NorwayGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
