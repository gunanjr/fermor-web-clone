import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Peru",
  "slug": "peru",
  "iso3": "PER",
  "region": "Americas",
  "rank2026": 46,
  "flagEmoji": "🇵🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Pakistan",
      "slug": "pakistan",
      "rank": 45
    },
    {
      "name": "Portugal",
      "slug": "portugal",
      "rank": 47
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 20.19,
      "growth": 7.7,
      "perCapita": 1150.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 24.398,
      "growth": 5.5,
      "perCapita": 1356.4,
      "popChangePct": 2.51
    },
    {
      "year": 1982,
      "gdp": 24.259,
      "growth": -0.3,
      "perCapita": 1316.3,
      "popChangePct": 2.46
    },
    {
      "year": 1983,
      "gdp": 18.863,
      "growth": -9.3,
      "perCapita": 999.4,
      "popChangePct": 2.4
    },
    {
      "year": 1984,
      "gdp": 19.442,
      "growth": 3.8,
      "perCapita": 1006.4,
      "popChangePct": 2.36
    },
    {
      "year": 1985,
      "gdp": 16.823,
      "growth": 2.1,
      "perCapita": 851.1,
      "popChangePct": 2.32
    },
    {
      "year": 1986,
      "gdp": 25.241,
      "growth": 12.1,
      "perCapita": 1248.4,
      "popChangePct": 2.29
    },
    {
      "year": 1987,
      "gdp": 41.681,
      "growth": 7.7,
      "perCapita": 2015.9,
      "popChangePct": 2.26
    },
    {
      "year": 1988,
      "gdp": 32.978,
      "growth": -9.4,
      "perCapita": 1560.4,
      "popChangePct": 2.22
    },
    {
      "year": 1989,
      "gdp": 40.699,
      "growth": -13.4,
      "perCapita": 1885.3,
      "popChangePct": 2.14
    },
    {
      "year": 1990,
      "gdp": 28.326,
      "growth": -5.1,
      "perCapita": 1285.7,
      "popChangePct": 2.06
    },
    {
      "year": 1991,
      "gdp": 33.988,
      "growth": 2.2,
      "perCapita": 1511.9,
      "popChangePct": 2.03
    },
    {
      "year": 1992,
      "gdp": 35.026,
      "growth": -0.5,
      "perCapita": 1527.9,
      "popChangePct": 1.98
    },
    {
      "year": 1993,
      "gdp": 34.032,
      "growth": 5.2,
      "perCapita": 1456.5,
      "popChangePct": 1.93
    },
    {
      "year": 1994,
      "gdp": 43.217,
      "growth": 12.3,
      "perCapita": 1815.4,
      "popChangePct": 1.88
    },
    {
      "year": 1995,
      "gdp": 51.365,
      "growth": 7.4,
      "perCapita": 2118.8,
      "popChangePct": 1.84
    },
    {
      "year": 1996,
      "gdp": 53.26,
      "growth": 2.8,
      "perCapita": 2157.3,
      "popChangePct": 1.84
    },
    {
      "year": 1997,
      "gdp": 56.076,
      "growth": 6.5,
      "perCapita": 2230.1,
      "popChangePct": 1.85
    },
    {
      "year": 1998,
      "gdp": 53.533,
      "growth": -0.4,
      "perCapita": 2091.7,
      "popChangePct": 1.78
    },
    {
      "year": 1999,
      "gdp": 48.46,
      "growth": 1.5,
      "perCapita": 1862.9,
      "popChangePct": 1.64
    },
    {
      "year": 2000,
      "gdp": 50.352,
      "growth": 2.7,
      "perCapita": 1908.0,
      "popChangePct": 1.45
    },
    {
      "year": 2001,
      "gdp": 51.053,
      "growth": 0.6,
      "perCapita": 1911.0,
      "popChangePct": 1.23
    },
    {
      "year": 2002,
      "gdp": 53.921,
      "growth": 5.5,
      "perCapita": 1997.1,
      "popChangePct": 1.06
    },
    {
      "year": 2003,
      "gdp": 58.578,
      "growth": 4.2,
      "perCapita": 2149.3,
      "popChangePct": 0.95
    },
    {
      "year": 2004,
      "gdp": 66.214,
      "growth": 5,
      "perCapita": 2408.5,
      "popChangePct": 0.87
    },
    {
      "year": 2005,
      "gdp": 74.054,
      "growth": 6.3,
      "perCapita": 2671.3,
      "popChangePct": 0.84
    },
    {
      "year": 2006,
      "gdp": 87.667,
      "growth": 7.5,
      "perCapita": 3138.3,
      "popChangePct": 0.77
    },
    {
      "year": 2007,
      "gdp": 102.335,
      "growth": 8.5,
      "perCapita": 3638.9,
      "popChangePct": 0.67
    },
    {
      "year": 2008,
      "gdp": 120.24,
      "growth": 9.1,
      "perCapita": 4248.8,
      "popChangePct": 0.63
    },
    {
      "year": 2009,
      "gdp": 122.427,
      "growth": 1.1,
      "perCapita": 4297.9,
      "popChangePct": 0.65
    },
    {
      "year": 2010,
      "gdp": 149.267,
      "growth": 8.3,
      "perCapita": 5202.2,
      "popChangePct": 0.73
    },
    {
      "year": 2011,
      "gdp": 170.773,
      "growth": 6.3,
      "perCapita": 5907.9,
      "popChangePct": 0.74
    },
    {
      "year": 2012,
      "gdp": 193.268,
      "growth": 6.1,
      "perCapita": 6638.5,
      "popChangePct": 0.72
    },
    {
      "year": 2013,
      "gdp": 201.568,
      "growth": 5.9,
      "perCapita": 6869.8,
      "popChangePct": 0.78
    },
    {
      "year": 2014,
      "gdp": 203.671,
      "growth": 2.4,
      "perCapita": 6877.1,
      "popChangePct": 0.94
    },
    {
      "year": 2015,
      "gdp": 193.344,
      "growth": 3.3,
      "perCapita": 6452.6,
      "popChangePct": 1.18
    },
    {
      "year": 2016,
      "gdp": 198.818,
      "growth": 4,
      "perCapita": 6535.1,
      "popChangePct": 1.53
    },
    {
      "year": 2017,
      "gdp": 220.09,
      "growth": 2.5,
      "perCapita": 7105.6,
      "popChangePct": 1.81
    },
    {
      "year": 2018,
      "gdp": 229.55,
      "growth": 4,
      "perCapita": 7273.0,
      "popChangePct": 1.9
    },
    {
      "year": 2019,
      "gdp": 236.263,
      "growth": 2.2,
      "perCapita": 7353.1,
      "popChangePct": 1.8
    },
    {
      "year": 2020,
      "gdp": 209.057,
      "growth": -10.9,
      "perCapita": 6407.7,
      "popChangePct": 1.54
    },
    {
      "year": 2021,
      "gdp": 228.704,
      "growth": 13.4,
      "perCapita": 6923.1,
      "popChangePct": 1.25
    },
    {
      "year": 2022,
      "gdp": 248.179,
      "growth": 2.8,
      "perCapita": 7431.2,
      "popChangePct": 1.1
    },
    {
      "year": 2023,
      "gdp": 272.755,
      "growth": -0.4,
      "perCapita": 8086.2,
      "popChangePct": 1.0
    },
    {
      "year": 2024,
      "gdp": 295.22,
      "growth": 3.5,
      "perCapita": 8665.5,
      "popChangePct": 1.0
    },
    {
      "year": 2025,
      "gdp": 341.025,
      "growth": 3.4,
      "perCapita": 9910.9,
      "popChangePct": 1.0
    },
    {
      "year": 2026,
      "gdp": 380.9,
      "growth": 2.8,
      "perCapita": 10960.2,
      "popChangePct": 1.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 386.375,
      "growth": 2.8,
      "perCapita": 11007.7,
      "popChangePct": 1.0
    },
    {
      "year": 2028,
      "gdp": 402.72,
      "growth": 2.8,
      "perCapita": 11359.7,
      "popChangePct": 1.0
    },
    {
      "year": 2029,
      "gdp": 418.912,
      "growth": 2.8,
      "perCapita": 11699.5,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdp": 437.099,
      "growth": 2.8,
      "perCapita": 12086.5,
      "popChangePct": 1.0
    },
    {
      "year": 2031,
      "gdp": 458.414,
      "growth": 2.8,
      "perCapita": 12550.4,
      "popChangePct": 1.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 52.43,
      "perCapitaPPP": 2988.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 60.524,
      "perCapitaPPP": 3364.8,
      "perCapitaPPPChangePct": 12.61,
      "popChangePct": 2.51
    },
    {
      "year": 1982,
      "gdpPPP": 64.056,
      "perCapitaPPP": 3475.7,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 2.46
    },
    {
      "year": 1983,
      "gdpPPP": 60.354,
      "perCapitaPPP": 3197.9,
      "perCapitaPPPChangePct": -7.99,
      "popChangePct": 2.4
    },
    {
      "year": 1984,
      "gdpPPP": 64.91,
      "perCapitaPPP": 3360.0,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 2.36
    },
    {
      "year": 1985,
      "gdpPPP": 68.361,
      "perCapitaPPP": 3458.5,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 2.32
    },
    {
      "year": 1986,
      "gdpPPP": 78.18,
      "perCapitaPPP": 3866.7,
      "perCapitaPPPChangePct": 11.8,
      "popChangePct": 2.29
    },
    {
      "year": 1987,
      "gdpPPP": 86.317,
      "perCapitaPPP": 4174.6,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": 2.26
    },
    {
      "year": 1988,
      "gdpPPP": 80.941,
      "perCapitaPPP": 3829.8,
      "perCapitaPPPChangePct": -8.26,
      "popChangePct": 2.22
    },
    {
      "year": 1989,
      "gdpPPP": 72.826,
      "perCapitaPPP": 3373.4,
      "perCapitaPPPChangePct": -11.92,
      "popChangePct": 2.14
    },
    {
      "year": 1990,
      "gdpPPP": 71.706,
      "perCapitaPPP": 3254.6,
      "perCapitaPPPChangePct": -3.52,
      "popChangePct": 2.06
    },
    {
      "year": 1991,
      "gdpPPP": 75.776,
      "perCapitaPPP": 3370.8,
      "perCapitaPPPChangePct": 3.57,
      "popChangePct": 2.03
    },
    {
      "year": 1992,
      "gdpPPP": 77.084,
      "perCapitaPPP": 3362.6,
      "perCapitaPPPChangePct": -0.24,
      "popChangePct": 1.98
    },
    {
      "year": 1993,
      "gdpPPP": 83.049,
      "perCapitaPPP": 3554.3,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 1.93
    },
    {
      "year": 1994,
      "gdpPPP": 95.262,
      "perCapitaPPP": 4001.6,
      "perCapitaPPPChangePct": 12.59,
      "popChangePct": 1.88
    },
    {
      "year": 1995,
      "gdpPPP": 104.467,
      "perCapitaPPP": 4309.2,
      "perCapitaPPPChangePct": 7.69,
      "popChangePct": 1.84
    },
    {
      "year": 1996,
      "gdpPPP": 109.358,
      "perCapitaPPP": 4429.4,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 1.84
    },
    {
      "year": 1997,
      "gdpPPP": 118.448,
      "perCapitaPPP": 4710.6,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.85
    },
    {
      "year": 1998,
      "gdpPPP": 119.311,
      "perCapitaPPP": 4661.9,
      "perCapitaPPPChangePct": -1.04,
      "popChangePct": 1.78
    },
    {
      "year": 1999,
      "gdpPPP": 122.808,
      "perCapitaPPP": 4720.8,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 1.64
    },
    {
      "year": 2000,
      "gdpPPP": 128.974,
      "perCapitaPPP": 4887.2,
      "perCapitaPPPChangePct": 3.52,
      "popChangePct": 1.45
    },
    {
      "year": 2001,
      "gdpPPP": 132.692,
      "perCapitaPPP": 4966.9,
      "perCapitaPPPChangePct": 1.63,
      "popChangePct": 1.23
    },
    {
      "year": 2002,
      "gdpPPP": 142.103,
      "perCapitaPPP": 5263.3,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 1.06
    },
    {
      "year": 2003,
      "gdpPPP": 150.944,
      "perCapitaPPP": 5538.2,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 0.95
    },
    {
      "year": 2004,
      "gdpPPP": 162.689,
      "perCapitaPPP": 5917.7,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": 0.87
    },
    {
      "year": 2005,
      "gdpPPP": 178.336,
      "perCapitaPPP": 6433.0,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": 0.84
    },
    {
      "year": 2006,
      "gdpPPP": 197.676,
      "perCapitaPPP": 7076.3,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 0.77
    },
    {
      "year": 2007,
      "gdpPPP": 220.327,
      "perCapitaPPP": 7834.7,
      "perCapitaPPPChangePct": 10.72,
      "popChangePct": 0.67
    },
    {
      "year": 2008,
      "gdpPPP": 245.067,
      "perCapitaPPP": 8659.6,
      "perCapitaPPPChangePct": 10.53,
      "popChangePct": 0.63
    },
    {
      "year": 2009,
      "gdpPPP": 249.28,
      "perCapitaPPP": 8751.3,
      "perCapitaPPPChangePct": 1.06,
      "popChangePct": 0.65
    },
    {
      "year": 2010,
      "gdpPPP": 273.326,
      "perCapitaPPP": 9525.9,
      "perCapitaPPPChangePct": 8.85,
      "popChangePct": 0.73
    },
    {
      "year": 2011,
      "gdpPPP": 296.618,
      "perCapitaPPP": 10261.5,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": 0.74
    },
    {
      "year": 2012,
      "gdpPPP": 320.692,
      "perCapitaPPP": 11015.4,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": 0.72
    },
    {
      "year": 2013,
      "gdpPPP": 345.236,
      "perCapitaPPP": 11766.3,
      "perCapitaPPPChangePct": 6.82,
      "popChangePct": 0.78
    },
    {
      "year": 2014,
      "gdpPPP": 359.621,
      "perCapitaPPP": 12142.8,
      "perCapitaPPPChangePct": 3.2,
      "popChangePct": 0.94
    },
    {
      "year": 2015,
      "gdpPPP": 374.759,
      "perCapitaPPP": 12507.0,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 1.18
    },
    {
      "year": 2016,
      "gdpPPP": 393.278,
      "perCapitaPPP": 12927.0,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 1.53
    },
    {
      "year": 2017,
      "gdpPPP": 410.405,
      "perCapitaPPP": 13250.0,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 1.81
    },
    {
      "year": 2018,
      "gdpPPP": 430.776,
      "perCapitaPPP": 13648.6,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 1.9
    },
    {
      "year": 2019,
      "gdpPPP": 455.675,
      "perCapitaPPP": 14181.8,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 1.8
    },
    {
      "year": 2020,
      "gdpPPP": 430.198,
      "perCapitaPPP": 13185.8,
      "perCapitaPPPChangePct": -7.02,
      "popChangePct": 1.54
    },
    {
      "year": 2021,
      "gdpPPP": 514.677,
      "perCapitaPPP": 15579.7,
      "perCapitaPPPChangePct": 18.16,
      "popChangePct": 1.25
    },
    {
      "year": 2022,
      "gdpPPP": 566.824,
      "perCapitaPPP": 16972.3,
      "perCapitaPPPChangePct": 8.94,
      "popChangePct": 1.1
    },
    {
      "year": 2023,
      "gdpPPP": 585.737,
      "perCapitaPPP": 17365.0,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 1.0
    },
    {
      "year": 2024,
      "gdpPPP": 621.37,
      "perCapitaPPP": 18239.0,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 1.0
    },
    {
      "year": 2025,
      "gdpPPP": 660.974,
      "perCapitaPPP": 19209.3,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 1.0
    },
    {
      "year": 2026,
      "gdpPPP": 699.083,
      "perCapitaPPP": 20115.7,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 1.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 734.438,
      "perCapitaPPP": 20923.8,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 1.0
    },
    {
      "year": 2028,
      "gdpPPP": 767.413,
      "perCapitaPPP": 21646.8,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 1.0
    },
    {
      "year": 2029,
      "gdpPPP": 802.897,
      "perCapitaPPP": 22423.5,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 1.0
    },
    {
      "year": 2030,
      "gdpPPP": 840.57,
      "perCapitaPPP": 23243.2,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 1.0
    },
    {
      "year": 2031,
      "gdpPPP": 879.713,
      "perCapitaPPP": 24084.7,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 1.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PeruGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
