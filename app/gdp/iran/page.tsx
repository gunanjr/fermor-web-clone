import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Iran",
  "slug": "iran",
  "iso3": "IRN",
  "region": "Asia",
  "rank2026": 53,
  "flagEmoji": "🇮🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Greece",
      "slug": "greece",
      "rank": 52
    },
    {
      "name": "New Zealand",
      "slug": "new-zealand",
      "rank": 54
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 116.976,
      "growth": -21.6,
      "perCapita": 2977.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 123.852,
      "growth": -5.7,
      "perCapita": 3033.7,
      "popChangePct": 3.91
    },
    {
      "year": 1982,
      "gdp": 153.533,
      "growth": 23.2,
      "perCapita": 3619.4,
      "popChangePct": 3.9
    },
    {
      "year": 1983,
      "gdp": 191.522,
      "growth": 11.1,
      "perCapita": 4345.2,
      "popChangePct": 3.91
    },
    {
      "year": 1984,
      "gdp": 197.372,
      "growth": -7.1,
      "perCapita": 4309.6,
      "popChangePct": 3.9
    },
    {
      "year": 1985,
      "gdp": 220.341,
      "growth": 1.9,
      "perCapita": 4630.3,
      "popChangePct": 3.91
    },
    {
      "year": 1986,
      "gdp": 254.987,
      "growth": -9.8,
      "perCapita": 5157.0,
      "popChangePct": 3.9
    },
    {
      "year": 1987,
      "gdp": 338.089,
      "growth": -0.2,
      "perCapita": 6673.4,
      "popChangePct": 2.46
    },
    {
      "year": 1988,
      "gdp": 380.698,
      "growth": -6.1,
      "perCapita": 7334.0,
      "popChangePct": 2.46
    },
    {
      "year": 1989,
      "gdp": 463.073,
      "growth": 6.1,
      "perCapita": 8706.5,
      "popChangePct": 2.46
    },
    {
      "year": 1990,
      "gdp": 709.094,
      "growth": 13.6,
      "perCapita": 13011.8,
      "popChangePct": 2.46
    },
    {
      "year": 1991,
      "gdp": 371.097,
      "growth": 12.7,
      "perCapita": 6646.1,
      "popChangePct": 2.46
    },
    {
      "year": 1992,
      "gdp": 61.598,
      "growth": 3.3,
      "perCapita": 1087.2,
      "popChangePct": 1.47
    },
    {
      "year": 1993,
      "gdp": 78.656,
      "growth": -1.5,
      "perCapita": 1368.2,
      "popChangePct": 1.47
    },
    {
      "year": 1994,
      "gdp": 97.415,
      "growth": -1.7,
      "perCapita": 1670.0,
      "popChangePct": 1.47
    },
    {
      "year": 1995,
      "gdp": 140.28,
      "growth": 2.4,
      "perCapita": 2370.1,
      "popChangePct": 1.47
    },
    {
      "year": 1996,
      "gdp": 192.871,
      "growth": 6.4,
      "perCapita": 3211.6,
      "popChangePct": 1.47
    },
    {
      "year": 1997,
      "gdp": 224.733,
      "growth": 1.4,
      "perCapita": 3684.5,
      "popChangePct": 1.56
    },
    {
      "year": 1998,
      "gdp": 250.194,
      "growth": 2.1,
      "perCapita": 4045.7,
      "popChangePct": 1.39
    },
    {
      "year": 1999,
      "gdp": 335.737,
      "growth": 2,
      "perCapita": 5370.8,
      "popChangePct": 1.08
    },
    {
      "year": 2000,
      "gdp": 447.805,
      "growth": 5.8,
      "perCapita": 7050.4,
      "popChangePct": 1.6
    },
    {
      "year": 2001,
      "gdp": 403.943,
      "growth": 2.4,
      "perCapita": 6254.5,
      "popChangePct": 1.68
    },
    {
      "year": 2002,
      "gdp": 161.932,
      "growth": 8.1,
      "perCapita": 2466.3,
      "popChangePct": 1.66
    },
    {
      "year": 2003,
      "gdp": 193.34,
      "growth": 8.6,
      "perCapita": 2872.2,
      "popChangePct": 2.53
    },
    {
      "year": 2004,
      "gdp": 230.618,
      "growth": 4.3,
      "perCapita": 3374.3,
      "popChangePct": 1.53
    },
    {
      "year": 2005,
      "gdp": 276.383,
      "growth": 3.2,
      "perCapita": 3983.0,
      "popChangePct": 1.53
    },
    {
      "year": 2006,
      "gdp": 326.45,
      "growth": 5,
      "perCapita": 4630.8,
      "popChangePct": 1.59
    },
    {
      "year": 2007,
      "gdp": 430.465,
      "growth": 8.2,
      "perCapita": 6017.8,
      "popChangePct": 1.47
    },
    {
      "year": 2008,
      "gdp": 498.712,
      "growth": 0.3,
      "perCapita": 6901.0,
      "popChangePct": 1.03
    },
    {
      "year": 2009,
      "gdp": 509.095,
      "growth": 1,
      "perCapita": 6955.2,
      "popChangePct": 1.29
    },
    {
      "year": 2010,
      "gdp": 598.566,
      "growth": 5.8,
      "perCapita": 8071.6,
      "popChangePct": 1.31
    },
    {
      "year": 2011,
      "gdp": 722.13,
      "growth": 5.7,
      "perCapita": 9609.2,
      "popChangePct": 1.34
    },
    {
      "year": 2012,
      "gdp": 487.11,
      "growth": -3.7,
      "perCapita": 6406.1,
      "popChangePct": 1.18
    },
    {
      "year": 2013,
      "gdp": 494.544,
      "growth": -1.5,
      "perCapita": 6421.3,
      "popChangePct": 1.29
    },
    {
      "year": 2014,
      "gdp": 532.056,
      "growth": 5,
      "perCapita": 6823.9,
      "popChangePct": 1.24
    },
    {
      "year": 2015,
      "gdp": 471.415,
      "growth": -1.4,
      "perCapita": 5971.8,
      "popChangePct": 1.24
    },
    {
      "year": 2016,
      "gdp": 477.575,
      "growth": 6.5,
      "perCapita": 5975.2,
      "popChangePct": 1.25
    },
    {
      "year": 2017,
      "gdp": 507.8,
      "growth": 3,
      "perCapita": 6263.7,
      "popChangePct": 1.43
    },
    {
      "year": 2018,
      "gdp": 343.713,
      "growth": -3.7,
      "perCapita": 4187.3,
      "popChangePct": 1.25
    },
    {
      "year": 2019,
      "gdp": 252.142,
      "growth": -2.4,
      "perCapita": 3035.1,
      "popChangePct": 1.21
    },
    {
      "year": 2020,
      "gdp": 209.51,
      "growth": 4.4,
      "perCapita": 2493.0,
      "popChangePct": 1.16
    },
    {
      "year": 2021,
      "gdp": 307.337,
      "growth": 4.1,
      "perCapita": 3656.4,
      "popChangePct": 0.02
    },
    {
      "year": 2022,
      "gdp": 403.254,
      "growth": 4.4,
      "perCapita": 4761.0,
      "popChangePct": 0.77
    },
    {
      "year": 2023,
      "gdp": 421.547,
      "growth": 5.3,
      "perCapita": 4940.3,
      "popChangePct": 0.74
    },
    {
      "year": 2024,
      "gdp": 416.676,
      "growth": 3.7,
      "perCapita": 4834.4,
      "popChangePct": 1.01
    },
    {
      "year": 2025,
      "gdp": 371.196,
      "growth": -1.5,
      "perCapita": 4263.8,
      "popChangePct": 1.01
    },
    {
      "year": 2026,
      "gdp": 300.293,
      "growth": -6.1,
      "perCapita": 3415.0,
      "popChangePct": 1.01
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 313.33,
      "growth": 3.2,
      "perCapita": 3527.6,
      "popChangePct": 1.01
    },
    {
      "year": 2028,
      "gdp": 323.13,
      "growth": 1.5,
      "perCapita": 3601.6,
      "popChangePct": 1.01
    },
    {
      "year": 2029,
      "gdp": 335.486,
      "growth": 1.8,
      "perCapita": 3702.0,
      "popChangePct": 1.01
    },
    {
      "year": 2030,
      "gdp": 349.527,
      "growth": 2.1,
      "perCapita": 3818.3,
      "popChangePct": 1.01
    },
    {
      "year": 2031,
      "gdp": 363.953,
      "growth": 2.1,
      "perCapita": 3936.1,
      "popChangePct": 1.01
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 172.035,
      "perCapitaPPP": 4378.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 177.584,
      "perCapitaPPP": 4349.8,
      "perCapitaPPPChangePct": -0.66,
      "popChangePct": 3.91
    },
    {
      "year": 1982,
      "gdpPPP": 232.249,
      "perCapitaPPP": 5475.0,
      "perCapitaPPPChangePct": 25.87,
      "popChangePct": 3.9
    },
    {
      "year": 1983,
      "gdpPPP": 268.101,
      "perCapitaPPP": 6082.6,
      "perCapitaPPPChangePct": 11.1,
      "popChangePct": 3.91
    },
    {
      "year": 1984,
      "gdpPPP": 257.944,
      "perCapitaPPP": 5632.2,
      "perCapitaPPPChangePct": -7.4,
      "popChangePct": 3.9
    },
    {
      "year": 1985,
      "gdpPPP": 271.071,
      "perCapitaPPP": 5696.3,
      "perCapitaPPPChangePct": 1.14,
      "popChangePct": 3.91
    },
    {
      "year": 1986,
      "gdpPPP": 249.47,
      "perCapitaPPP": 5045.4,
      "perCapitaPPPChangePct": -11.43,
      "popChangePct": 3.9
    },
    {
      "year": 1987,
      "gdpPPP": 255.213,
      "perCapitaPPP": 5037.6,
      "perCapitaPPPChangePct": -0.16,
      "popChangePct": 2.46
    },
    {
      "year": 1988,
      "gdpPPP": 248.143,
      "perCapitaPPP": 4780.4,
      "perCapitaPPPChangePct": -5.11,
      "popChangePct": 2.46
    },
    {
      "year": 1989,
      "gdpPPP": 273.687,
      "perCapitaPPP": 5145.8,
      "perCapitaPPPChangePct": 7.64,
      "popChangePct": 2.46
    },
    {
      "year": 1990,
      "gdpPPP": 322.53,
      "perCapitaPPP": 5918.4,
      "perCapitaPPPChangePct": 15.02,
      "popChangePct": 2.46
    },
    {
      "year": 1991,
      "gdpPPP": 375.84,
      "perCapitaPPP": 6731.0,
      "perCapitaPPPChangePct": 13.73,
      "popChangePct": 2.46
    },
    {
      "year": 1992,
      "gdpPPP": 397.082,
      "perCapitaPPP": 7008.7,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 1.47
    },
    {
      "year": 1993,
      "gdpPPP": 400.514,
      "perCapitaPPP": 6966.9,
      "perCapitaPPPChangePct": -0.6,
      "popChangePct": 1.47
    },
    {
      "year": 1994,
      "gdpPPP": 402.12,
      "perCapitaPPP": 6893.8,
      "perCapitaPPPChangePct": -1.05,
      "popChangePct": 1.47
    },
    {
      "year": 1995,
      "gdpPPP": 420.407,
      "perCapitaPPP": 7103.0,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 1.47
    },
    {
      "year": 1996,
      "gdpPPP": 455.291,
      "perCapitaPPP": 7581.2,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 1.47
    },
    {
      "year": 1997,
      "gdpPPP": 469.397,
      "perCapitaPPP": 7695.8,
      "perCapitaPPPChangePct": 1.51,
      "popChangePct": 1.56
    },
    {
      "year": 1998,
      "gdpPPP": 484.546,
      "perCapitaPPP": 7835.2,
      "perCapitaPPPChangePct": 1.81,
      "popChangePct": 1.39
    },
    {
      "year": 1999,
      "gdpPPP": 501.244,
      "perCapitaPPP": 8018.4,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 1.08
    },
    {
      "year": 2000,
      "gdpPPP": 542.562,
      "perCapitaPPP": 8542.3,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 1.6
    },
    {
      "year": 2001,
      "gdpPPP": 568.049,
      "perCapitaPPP": 8795.5,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": 1.68
    },
    {
      "year": 2002,
      "gdpPPP": 623.482,
      "perCapitaPPP": 9496.0,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": 1.66
    },
    {
      "year": 2003,
      "gdpPPP": 690.719,
      "perCapitaPPP": 10261.0,
      "perCapitaPPPChangePct": 8.06,
      "popChangePct": 2.53
    },
    {
      "year": 2004,
      "gdpPPP": 740.051,
      "perCapitaPPP": 10828.2,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 1.53
    },
    {
      "year": 2005,
      "gdpPPP": 787.604,
      "perCapitaPPP": 11350.4,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 1.53
    },
    {
      "year": 2006,
      "gdpPPP": 852.486,
      "perCapitaPPP": 12092.7,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 1.59
    },
    {
      "year": 2007,
      "gdpPPP": 946.993,
      "perCapitaPPP": 13238.7,
      "perCapitaPPPChangePct": 9.48,
      "popChangePct": 1.47
    },
    {
      "year": 2008,
      "gdpPPP": 967.657,
      "perCapitaPPP": 13390.2,
      "perCapitaPPPChangePct": 1.14,
      "popChangePct": 1.03
    },
    {
      "year": 2009,
      "gdpPPP": 983.433,
      "perCapitaPPP": 13435.5,
      "perCapitaPPPChangePct": 0.34,
      "popChangePct": 1.29
    },
    {
      "year": 2010,
      "gdpPPP": 1053.097,
      "perCapitaPPP": 14200.8,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 1.31
    },
    {
      "year": 2011,
      "gdpPPP": 1135.616,
      "perCapitaPPP": 15111.4,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 1.34
    },
    {
      "year": 2012,
      "gdpPPP": 1113.415,
      "perCapitaPPP": 14642.9,
      "perCapitaPPPChangePct": -3.1,
      "popChangePct": 1.18
    },
    {
      "year": 2013,
      "gdpPPP": 1115.131,
      "perCapitaPPP": 14479.2,
      "perCapitaPPPChangePct": -1.12,
      "popChangePct": 1.29
    },
    {
      "year": 2014,
      "gdpPPP": 1191.108,
      "perCapitaPPP": 15276.5,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 1.24
    },
    {
      "year": 2015,
      "gdpPPP": 1185.033,
      "perCapitaPPP": 15011.8,
      "perCapitaPPPChangePct": -1.73,
      "popChangePct": 1.24
    },
    {
      "year": 2016,
      "gdpPPP": 1274.479,
      "perCapitaPPP": 15945.7,
      "perCapitaPPPChangePct": 6.22,
      "popChangePct": 1.25
    },
    {
      "year": 2017,
      "gdpPPP": 1336.571,
      "perCapitaPPP": 16486.6,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 1.43
    },
    {
      "year": 2018,
      "gdpPPP": 1319.678,
      "perCapitaPPP": 16077.2,
      "perCapitaPPPChangePct": -2.48,
      "popChangePct": 1.25
    },
    {
      "year": 2019,
      "gdpPPP": 1212.413,
      "perCapitaPPP": 14594.2,
      "perCapitaPPPChangePct": -9.22,
      "popChangePct": 1.21
    },
    {
      "year": 2020,
      "gdpPPP": 1326.318,
      "perCapitaPPP": 15782.4,
      "perCapitaPPPChangePct": 8.14,
      "popChangePct": 1.16
    },
    {
      "year": 2021,
      "gdpPPP": 1405.065,
      "perCapitaPPP": 16716.0,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": 0.02
    },
    {
      "year": 2022,
      "gdpPPP": 1570.509,
      "perCapitaPPP": 18542.0,
      "perCapitaPPPChangePct": 10.92,
      "popChangePct": 0.77
    },
    {
      "year": 2023,
      "gdpPPP": 1715.462,
      "perCapitaPPP": 20104.1,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": 0.74
    },
    {
      "year": 2024,
      "gdpPPP": 1822.448,
      "perCapitaPPP": 21144.8,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 1.01
    },
    {
      "year": 2025,
      "gdpPPP": 1845.572,
      "perCapitaPPP": 21199.5,
      "perCapitaPPPChangePct": 0.26,
      "popChangePct": 1.01
    },
    {
      "year": 2026,
      "gdpPPP": 1783.218,
      "perCapitaPPP": 20279.1,
      "perCapitaPPPChangePct": -4.34,
      "popChangePct": 1.01
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1880.969,
      "perCapitaPPP": 21177.0,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 1.01
    },
    {
      "year": 2028,
      "gdpPPP": 1940.101,
      "perCapitaPPP": 21624.5,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 1.01
    },
    {
      "year": 2029,
      "gdpPPP": 2010.398,
      "perCapitaPPP": 22183.9,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 1.01
    },
    {
      "year": 2030,
      "gdpPPP": 2089.412,
      "perCapitaPPP": 22825.2,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 1.01
    },
    {
      "year": 2031,
      "gdpPPP": 2170.952,
      "perCapitaPPP": 23478.8,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 1.01
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IranGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
