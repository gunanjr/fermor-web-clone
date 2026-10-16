import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Greece",
  "slug": "greece",
  "iso3": "GRC",
  "region": "Europe",
  "rank2026": 52,
  "flagEmoji": "🇬🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Algeria",
      "slug": "algeria",
      "rank": 51
    },
    {
      "name": "Iran",
      "slug": "iran",
      "rank": 53
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 56.217,
      "growth": 0.7,
      "perCapita": 5865.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 51.873,
      "growth": -1.6,
      "perCapita": 5347.3,
      "popChangePct": 1.22
    },
    {
      "year": 1982,
      "gdp": 54.114,
      "growth": -1.1,
      "perCapita": 5545.7,
      "popChangePct": 0.59
    },
    {
      "year": 1983,
      "gdp": 48.913,
      "growth": -1.1,
      "perCapita": 4980.3,
      "popChangePct": 0.65
    },
    {
      "year": 1984,
      "gdp": 47.657,
      "growth": 2,
      "perCapita": 4827.4,
      "popChangePct": 0.52
    },
    {
      "year": 1985,
      "gdp": 47.269,
      "growth": 2.5,
      "perCapita": 4765.3,
      "popChangePct": 0.49
    },
    {
      "year": 1986,
      "gdp": 55.636,
      "growth": 0.5,
      "perCapita": 5592.1,
      "popChangePct": 0.29
    },
    {
      "year": 1987,
      "gdp": 64.769,
      "growth": -2.3,
      "perCapita": 6486.4,
      "popChangePct": 0.36
    },
    {
      "year": 1988,
      "gdp": 75.384,
      "growth": 4.3,
      "perCapita": 7526.5,
      "popChangePct": 0.31
    },
    {
      "year": 1989,
      "gdp": 78.148,
      "growth": 3.8,
      "perCapita": 7769.6,
      "popChangePct": 0.42
    },
    {
      "year": 1990,
      "gdp": 96.601,
      "growth": 0,
      "perCapita": 9544.7,
      "popChangePct": 0.63
    },
    {
      "year": 1991,
      "gdp": 104.164,
      "growth": 3.1,
      "perCapita": 10139.8,
      "popChangePct": 1.5
    },
    {
      "year": 1992,
      "gdp": 114.846,
      "growth": 0.7,
      "perCapita": 11077.9,
      "popChangePct": 0.92
    },
    {
      "year": 1993,
      "gdp": 107.506,
      "growth": -1.6,
      "perCapita": 10306.4,
      "popChangePct": 0.62
    },
    {
      "year": 1994,
      "gdp": 115.055,
      "growth": 2,
      "perCapita": 10968.2,
      "popChangePct": 0.57
    },
    {
      "year": 1995,
      "gdp": 135.036,
      "growth": 2.1,
      "perCapita": 12816.7,
      "popChangePct": 0.44
    },
    {
      "year": 1996,
      "gdp": 142.513,
      "growth": 1.4,
      "perCapita": 13459.4,
      "popChangePct": 0.49
    },
    {
      "year": 1997,
      "gdp": 138.93,
      "growth": 3.6,
      "perCapita": 13070.5,
      "popChangePct": 0.39
    },
    {
      "year": 1998,
      "gdp": 139.821,
      "growth": 3.4,
      "perCapita": 13075.7,
      "popChangePct": 0.6
    },
    {
      "year": 1999,
      "gdp": 143.693,
      "growth": 2.7,
      "perCapita": 13369.6,
      "popChangePct": 0.51
    },
    {
      "year": 2000,
      "gdp": 127.438,
      "growth": 4.1,
      "perCapita": 11826.5,
      "popChangePct": 0.26
    },
    {
      "year": 2001,
      "gdp": 132.051,
      "growth": 4.7,
      "perCapita": 12186.4,
      "popChangePct": 0.56
    },
    {
      "year": 2002,
      "gdp": 150.148,
      "growth": 4.7,
      "perCapita": 13789.9,
      "popChangePct": 0.48
    },
    {
      "year": 2003,
      "gdp": 196.881,
      "growth": 5.8,
      "perCapita": 18036.4,
      "popChangePct": 0.26
    },
    {
      "year": 2004,
      "gdp": 234.873,
      "growth": 5.4,
      "perCapita": 21468.5,
      "popChangePct": 0.22
    },
    {
      "year": 2005,
      "gdp": 242.45,
      "growth": 1.2,
      "perCapita": 22101.3,
      "popChangePct": 0.27
    },
    {
      "year": 2006,
      "gdp": 269.088,
      "growth": 6.4,
      "perCapita": 24452.0,
      "popChangePct": 0.32
    },
    {
      "year": 2007,
      "gdp": 314.264,
      "growth": 3.5,
      "perCapita": 28476.2,
      "popChangePct": 0.28
    },
    {
      "year": 2008,
      "gdp": 351.083,
      "growth": 0.1,
      "perCapita": 31740.8,
      "popChangePct": 0.23
    },
    {
      "year": 2009,
      "gdp": 326.474,
      "growth": -4.1,
      "perCapita": 29426.0,
      "popChangePct": 0.31
    },
    {
      "year": 2010,
      "gdp": 296.66,
      "growth": -5.7,
      "perCapita": 26679.7,
      "popChangePct": 0.22
    },
    {
      "year": 2011,
      "gdp": 283.178,
      "growth": -9.9,
      "perCapita": 25457.9,
      "popChangePct": 0.04
    },
    {
      "year": 2012,
      "gdp": 238.992,
      "growth": -8.3,
      "perCapita": 21557.3,
      "popChangePct": -0.33
    },
    {
      "year": 2013,
      "gdp": 236.56,
      "growth": -2.3,
      "perCapita": 21498.4,
      "popChangePct": -0.74
    },
    {
      "year": 2014,
      "gdp": 233.972,
      "growth": 0.8,
      "perCapita": 21412.6,
      "popChangePct": -0.7
    },
    {
      "year": 2015,
      "gdp": 194.587,
      "growth": -0.2,
      "perCapita": 17921.1,
      "popChangePct": -0.63
    },
    {
      "year": 2016,
      "gdp": 193.044,
      "growth": 0,
      "perCapita": 17901.4,
      "popChangePct": -0.68
    },
    {
      "year": 2017,
      "gdp": 200.31,
      "growth": 1.5,
      "perCapita": 18602.0,
      "popChangePct": -0.15
    },
    {
      "year": 2018,
      "gdp": 213.396,
      "growth": 2.1,
      "perCapita": 19867.1,
      "popChangePct": -0.25
    },
    {
      "year": 2019,
      "gdp": 207.329,
      "growth": 2.3,
      "perCapita": 19332.1,
      "popChangePct": -0.15
    },
    {
      "year": 2020,
      "gdp": 191.21,
      "growth": -9.2,
      "perCapita": 17839.1,
      "popChangePct": -0.06
    },
    {
      "year": 2021,
      "gdp": 218.449,
      "growth": 8.7,
      "perCapita": 20456.6,
      "popChangePct": -0.37
    },
    {
      "year": 2022,
      "gdp": 218.162,
      "growth": 5.5,
      "perCapita": 20853.5,
      "popChangePct": -2.03
    },
    {
      "year": 2023,
      "gdp": 243.016,
      "growth": 2.1,
      "perCapita": 23335.6,
      "popChangePct": -0.46
    },
    {
      "year": 2024,
      "gdp": 256.161,
      "growth": 2.1,
      "perCapita": 24688.4,
      "popChangePct": -0.36
    },
    {
      "year": 2025,
      "gdp": 280.476,
      "growth": 2.1,
      "perCapita": 27040.8,
      "popChangePct": -0.04
    },
    {
      "year": 2026,
      "gdp": 307.554,
      "growth": 1.8,
      "perCapita": 29696.0,
      "popChangePct": -0.14
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 320.226,
      "growth": 1.7,
      "perCapita": 30965.9,
      "popChangePct": -0.15
    },
    {
      "year": 2028,
      "gdp": 332.284,
      "growth": 1.6,
      "perCapita": 32180.2,
      "popChangePct": -0.15
    },
    {
      "year": 2029,
      "gdp": 344.499,
      "growth": 1.6,
      "perCapita": 33413.2,
      "popChangePct": -0.15
    },
    {
      "year": 2030,
      "gdp": 357.268,
      "growth": 1.6,
      "perCapita": 34703.8,
      "popChangePct": -0.15
    },
    {
      "year": 2031,
      "gdp": 370.551,
      "growth": 1.6,
      "perCapita": 36102.4,
      "popChangePct": -0.3
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 90.465,
      "perCapitaPPP": 9439.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 97.484,
      "perCapitaPPP": 10049.0,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 1.22
    },
    {
      "year": 1982,
      "gdpPPP": 102.338,
      "perCapitaPPP": 10487.7,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 0.59
    },
    {
      "year": 1983,
      "gdpPPP": 105.198,
      "perCapitaPPP": 10711.4,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 0.65
    },
    {
      "year": 1984,
      "gdpPPP": 111.182,
      "perCapitaPPP": 11262.3,
      "perCapitaPPPChangePct": 5.14,
      "popChangePct": 0.52
    },
    {
      "year": 1985,
      "gdpPPP": 117.581,
      "perCapitaPPP": 11853.5,
      "perCapitaPPPChangePct": 5.25,
      "popChangePct": 0.49
    },
    {
      "year": 1986,
      "gdpPPP": 120.566,
      "perCapitaPPP": 12118.3,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 0.29
    },
    {
      "year": 1987,
      "gdpPPP": 120.765,
      "perCapitaPPP": 12094.3,
      "perCapitaPPPChangePct": -0.2,
      "popChangePct": 0.36
    },
    {
      "year": 1988,
      "gdpPPP": 130.385,
      "perCapitaPPP": 13017.8,
      "perCapitaPPPChangePct": 7.64,
      "popChangePct": 0.31
    },
    {
      "year": 1989,
      "gdpPPP": 140.645,
      "perCapitaPPP": 13983.3,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": 0.42
    },
    {
      "year": 1990,
      "gdpPPP": 145.909,
      "perCapitaPPP": 14416.6,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 0.63
    },
    {
      "year": 1991,
      "gdpPPP": 155.523,
      "perCapitaPPP": 15139.5,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 1.5
    },
    {
      "year": 1992,
      "gdpPPP": 160.177,
      "perCapitaPPP": 15450.4,
      "perCapitaPPPChangePct": 2.05,
      "popChangePct": 0.92
    },
    {
      "year": 1993,
      "gdpPPP": 161.351,
      "perCapitaPPP": 15468.4,
      "perCapitaPPPChangePct": 0.12,
      "popChangePct": 0.62
    },
    {
      "year": 1994,
      "gdpPPP": 168.092,
      "perCapitaPPP": 16024.2,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 0.57
    },
    {
      "year": 1995,
      "gdpPPP": 175.219,
      "perCapitaPPP": 16630.6,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 0.44
    },
    {
      "year": 1996,
      "gdpPPP": 180.894,
      "perCapitaPPP": 17084.3,
      "perCapitaPPPChangePct": 2.73,
      "popChangePct": 0.49
    },
    {
      "year": 1997,
      "gdpPPP": 190.643,
      "perCapitaPPP": 17935.7,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": 0.39
    },
    {
      "year": 1998,
      "gdpPPP": 199.412,
      "perCapitaPPP": 18648.4,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 0.6
    },
    {
      "year": 1999,
      "gdpPPP": 207.611,
      "perCapitaPPP": 19316.6,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 0.51
    },
    {
      "year": 2000,
      "gdpPPP": 221.099,
      "perCapitaPPP": 20518.4,
      "perCapitaPPPChangePct": 6.22,
      "popChangePct": 0.26
    },
    {
      "year": 2001,
      "gdpPPP": 236.591,
      "perCapitaPPP": 21833.8,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 0.56
    },
    {
      "year": 2002,
      "gdpPPP": 251.519,
      "perCapitaPPP": 23100.0,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.48
    },
    {
      "year": 2003,
      "gdpPPP": 271.353,
      "perCapitaPPP": 24858.8,
      "perCapitaPPPChangePct": 7.61,
      "popChangePct": 0.26
    },
    {
      "year": 2004,
      "gdpPPP": 293.635,
      "perCapitaPPP": 26839.6,
      "perCapitaPPPChangePct": 7.97,
      "popChangePct": 0.22
    },
    {
      "year": 2005,
      "gdpPPP": 306.427,
      "perCapitaPPP": 27933.4,
      "perCapitaPPPChangePct": 4.08,
      "popChangePct": 0.27
    },
    {
      "year": 2006,
      "gdpPPP": 336.23,
      "perCapitaPPP": 30553.2,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": 0.32
    },
    {
      "year": 2007,
      "gdpPPP": 357.45,
      "perCapitaPPP": 32389.4,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 0.28
    },
    {
      "year": 2008,
      "gdpPPP": 364.545,
      "perCapitaPPP": 32957.9,
      "perCapitaPPPChangePct": 1.76,
      "popChangePct": 0.23
    },
    {
      "year": 2009,
      "gdpPPP": 351.684,
      "perCapitaPPP": 31698.3,
      "perCapitaPPPChangePct": -3.82,
      "popChangePct": 0.31
    },
    {
      "year": 2010,
      "gdpPPP": 335.691,
      "perCapitaPPP": 30190.0,
      "perCapitaPPPChangePct": -4.76,
      "popChangePct": 0.22
    },
    {
      "year": 2011,
      "gdpPPP": 308.778,
      "perCapitaPPP": 27759.3,
      "perCapitaPPPChangePct": -8.05,
      "popChangePct": 0.04
    },
    {
      "year": 2012,
      "gdpPPP": 288.323,
      "perCapitaPPP": 26006.9,
      "perCapitaPPPChangePct": -6.31,
      "popChangePct": -0.33
    },
    {
      "year": 2013,
      "gdpPPP": 286.568,
      "perCapitaPPP": 26043.1,
      "perCapitaPPPChangePct": 0.14,
      "popChangePct": -0.74
    },
    {
      "year": 2014,
      "gdpPPP": 293.869,
      "perCapitaPPP": 26894.3,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": -0.7
    },
    {
      "year": 2015,
      "gdpPPP": 295.919,
      "perCapitaPPP": 27253.5,
      "perCapitaPPPChangePct": 1.34,
      "popChangePct": -0.63
    },
    {
      "year": 2016,
      "gdpPPP": 298.636,
      "perCapitaPPP": 27693.2,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": -0.68
    },
    {
      "year": 2017,
      "gdpPPP": 308.462,
      "perCapitaPPP": 28645.7,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": -0.15
    },
    {
      "year": 2018,
      "gdpPPP": 319.755,
      "perCapitaPPP": 29769.1,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": -0.25
    },
    {
      "year": 2019,
      "gdpPPP": 342.312,
      "perCapitaPPP": 31918.4,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": -0.15
    },
    {
      "year": 2020,
      "gdpPPP": 315.963,
      "perCapitaPPP": 29478.1,
      "perCapitaPPPChangePct": -7.65,
      "popChangePct": -0.06
    },
    {
      "year": 2021,
      "gdpPPP": 354.887,
      "perCapitaPPP": 33233.4,
      "perCapitaPPPChangePct": 12.74,
      "popChangePct": -0.37
    },
    {
      "year": 2022,
      "gdpPPP": 401.119,
      "perCapitaPPP": 38341.9,
      "perCapitaPPPChangePct": 15.37,
      "popChangePct": -2.03
    },
    {
      "year": 2023,
      "gdpPPP": 424.845,
      "perCapitaPPP": 40795.7,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": -0.46
    },
    {
      "year": 2024,
      "gdpPPP": 444.477,
      "perCapitaPPP": 42838.0,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": -0.36
    },
    {
      "year": 2025,
      "gdpPPP": 466.562,
      "perCapitaPPP": 44981.3,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": -0.04
    },
    {
      "year": 2026,
      "gdpPPP": 488.577,
      "perCapitaPPP": 47174.6,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": -0.14
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 507.596,
      "perCapitaPPP": 49084.6,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": -0.15
    },
    {
      "year": 2028,
      "gdpPPP": 524.168,
      "perCapitaPPP": 50763.3,
      "perCapitaPPPChangePct": 3.42,
      "popChangePct": -0.15
    },
    {
      "year": 2029,
      "gdpPPP": 542.034,
      "perCapitaPPP": 52572.4,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": -0.15
    },
    {
      "year": 2030,
      "gdpPPP": 560.829,
      "perCapitaPPP": 54477.1,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": -0.15
    },
    {
      "year": 2031,
      "gdpPPP": 580.085,
      "perCapitaPPP": 56517.0,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": -0.3
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GreeceGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
