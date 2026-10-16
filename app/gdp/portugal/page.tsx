import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Portugal",
  "slug": "portugal",
  "iso3": "PRT",
  "region": "Europe",
  "rank2026": 47,
  "flagEmoji": "🇵🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Peru",
      "slug": "peru",
      "rank": 46
    },
    {
      "name": "Nigeria",
      "slug": "nigeria",
      "rank": 48
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 32.607,
      "growth": 6.7,
      "perCapita": 3338.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 32.477,
      "growth": 3.5,
      "perCapita": 3296.7,
      "popChangePct": 0.87
    },
    {
      "year": 1982,
      "gdp": 30.678,
      "growth": 2.2,
      "perCapita": 3095.1,
      "popChangePct": 0.62
    },
    {
      "year": 1983,
      "gdp": 28.267,
      "growth": 1,
      "perCapita": 2838.7,
      "popChangePct": 0.46
    },
    {
      "year": 1984,
      "gdp": 25.951,
      "growth": -1,
      "perCapita": 2596.1,
      "popChangePct": 0.38
    },
    {
      "year": 1985,
      "gdp": 27.231,
      "growth": 1.6,
      "perCapita": 2716.6,
      "popChangePct": 0.28
    },
    {
      "year": 1986,
      "gdp": 37.869,
      "growth": 3.3,
      "perCapita": 3774.6,
      "popChangePct": 0.09
    },
    {
      "year": 1987,
      "gdp": 47.386,
      "growth": 7.6,
      "perCapita": 4724.5,
      "popChangePct": -0.03
    },
    {
      "year": 1988,
      "gdp": 55.435,
      "growth": 5.3,
      "perCapita": 5532.6,
      "popChangePct": -0.1
    },
    {
      "year": 1989,
      "gdp": 59.806,
      "growth": 6.6,
      "perCapita": 5977.6,
      "popChangePct": -0.15
    },
    {
      "year": 1990,
      "gdp": 79.439,
      "growth": 7.9,
      "perCapita": 7957.3,
      "popChangePct": -0.22
    },
    {
      "year": 1991,
      "gdp": 89.904,
      "growth": 3.4,
      "perCapita": 9026.3,
      "popChangePct": -0.23
    },
    {
      "year": 1992,
      "gdp": 108.119,
      "growth": 3.1,
      "perCapita": 10863.5,
      "popChangePct": -0.08
    },
    {
      "year": 1993,
      "gdp": 95.139,
      "growth": -0.7,
      "perCapita": 9547.7,
      "popChangePct": 0.13
    },
    {
      "year": 1994,
      "gdp": 99.692,
      "growth": 1.5,
      "perCapita": 9977.6,
      "popChangePct": 0.27
    },
    {
      "year": 1995,
      "gdp": 118.182,
      "growth": 2.3,
      "perCapita": 11787.3,
      "popChangePct": 0.34
    },
    {
      "year": 1996,
      "gdp": 122.655,
      "growth": 3.5,
      "perCapita": 12187.5,
      "popChangePct": 0.38
    },
    {
      "year": 1997,
      "gdp": 117.211,
      "growth": 4.4,
      "perCapita": 11594.8,
      "popChangePct": 0.45
    },
    {
      "year": 1998,
      "gdp": 124.124,
      "growth": 4.8,
      "perCapita": 12216.7,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdp": 127.597,
      "growth": 3.9,
      "perCapita": 12487.7,
      "popChangePct": 0.57
    },
    {
      "year": 2000,
      "gdp": 118.658,
      "growth": 3.8,
      "perCapita": 11531.5,
      "popChangePct": 0.7
    },
    {
      "year": 2001,
      "gdp": 121.605,
      "growth": 1.9,
      "perCapita": 11734.9,
      "popChangePct": 0.71
    },
    {
      "year": 2002,
      "gdp": 134.7,
      "growth": 0.8,
      "perCapita": 12927.5,
      "popChangePct": 0.55
    },
    {
      "year": 2003,
      "gdp": 165.185,
      "growth": -0.9,
      "perCapita": 15793.8,
      "popChangePct": 0.37
    },
    {
      "year": 2004,
      "gdp": 189.296,
      "growth": 1.8,
      "perCapita": 18056.0,
      "popChangePct": 0.24
    },
    {
      "year": 2005,
      "gdp": 197.363,
      "growth": 0.8,
      "perCapita": 18790.5,
      "popChangePct": 0.18
    },
    {
      "year": 2006,
      "gdp": 208.767,
      "growth": 1.6,
      "perCapita": 19840.5,
      "popChangePct": 0.18
    },
    {
      "year": 2007,
      "gdp": 240.524,
      "growth": 2.5,
      "perCapita": 22813.8,
      "popChangePct": 0.2
    },
    {
      "year": 2008,
      "gdp": 263.388,
      "growth": 0.3,
      "perCapita": 24946.3,
      "popChangePct": 0.14
    },
    {
      "year": 2009,
      "gdp": 244.402,
      "growth": -3.1,
      "perCapita": 23126.1,
      "popChangePct": 0.09
    },
    {
      "year": 2010,
      "gdp": 238.639,
      "growth": 1.7,
      "perCapita": 22570.4,
      "popChangePct": 0.05
    },
    {
      "year": 2011,
      "gdp": 245.383,
      "growth": -1.7,
      "perCapita": 23205.1,
      "popChangePct": 0.02
    },
    {
      "year": 2012,
      "gdp": 216.674,
      "growth": -4.1,
      "perCapita": 20574.0,
      "popChangePct": -0.42
    },
    {
      "year": 2013,
      "gdp": 226.681,
      "growth": -1,
      "perCapita": 21642.2,
      "popChangePct": -0.54
    },
    {
      "year": 2014,
      "gdp": 230.138,
      "growth": 0.7,
      "perCapita": 22087.0,
      "popChangePct": -0.52
    },
    {
      "year": 2015,
      "gdp": 199.059,
      "growth": 1.6,
      "perCapita": 19173.7,
      "popChangePct": -0.36
    },
    {
      "year": 2016,
      "gdp": 206.249,
      "growth": 2,
      "perCapita": 19914.9,
      "popChangePct": -0.24
    },
    {
      "year": 2017,
      "gdp": 220.785,
      "growth": 3.3,
      "perCapita": 21352.3,
      "popChangePct": -0.16
    },
    {
      "year": 2018,
      "gdp": 242.203,
      "growth": 2.9,
      "perCapita": 23436.0,
      "popChangePct": -0.05
    },
    {
      "year": 2019,
      "gdp": 240.142,
      "growth": 2.7,
      "perCapita": 23192.2,
      "popChangePct": 0.18
    },
    {
      "year": 2020,
      "gdp": 229.435,
      "growth": -8.2,
      "perCapita": 22093.2,
      "popChangePct": 0.3
    },
    {
      "year": 2021,
      "gdp": 256.226,
      "growth": 5.6,
      "perCapita": 24618.9,
      "popChangePct": 0.22
    },
    {
      "year": 2022,
      "gdp": 257.101,
      "growth": 7,
      "perCapita": 24558.6,
      "popChangePct": 0.59
    },
    {
      "year": 2023,
      "gdp": 292.408,
      "growth": 3.1,
      "perCapita": 27642.6,
      "popChangePct": 1.04
    },
    {
      "year": 2024,
      "gdp": 313.562,
      "growth": 2.2,
      "perCapita": 29319.5,
      "popChangePct": 1.11
    },
    {
      "year": 2025,
      "gdp": 346.412,
      "growth": 1.9,
      "perCapita": 32165.9,
      "popChangePct": 0.7
    },
    {
      "year": 2026,
      "gdp": 380.637,
      "growth": 1.9,
      "perCapita": 35433.5,
      "popChangePct": -0.26
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 396.349,
      "growth": 1.8,
      "perCapita": 36989.7,
      "popChangePct": -0.25
    },
    {
      "year": 2028,
      "gdp": 412.482,
      "growth": 1.8,
      "perCapita": 38593.1,
      "popChangePct": -0.25
    },
    {
      "year": 2029,
      "gdp": 428.894,
      "growth": 1.7,
      "perCapita": 40209.1,
      "popChangePct": -0.2
    },
    {
      "year": 2030,
      "gdp": 444.873,
      "growth": 1.6,
      "perCapita": 41790.7,
      "popChangePct": -0.21
    },
    {
      "year": 2031,
      "gdp": 461.165,
      "growth": 1.6,
      "perCapita": 43407.9,
      "popChangePct": -0.2
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 63.517,
      "perCapitaPPP": 6503.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 71.975,
      "perCapitaPPP": 7306.1,
      "perCapitaPPPChangePct": 12.34,
      "popChangePct": 0.87
    },
    {
      "year": 1982,
      "gdpPPP": 78.076,
      "perCapitaPPP": 7877.1,
      "perCapitaPPPChangePct": 7.82,
      "popChangePct": 0.62
    },
    {
      "year": 1983,
      "gdpPPP": 81.922,
      "perCapitaPPP": 8226.8,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.46
    },
    {
      "year": 1984,
      "gdpPPP": 83.994,
      "perCapitaPPP": 8402.6,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 0.38
    },
    {
      "year": 1985,
      "gdpPPP": 88.068,
      "perCapitaPPP": 8786.1,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 0.28
    },
    {
      "year": 1986,
      "gdpPPP": 92.824,
      "perCapitaPPP": 9252.1,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 0.09
    },
    {
      "year": 1987,
      "gdpPPP": 102.384,
      "perCapitaPPP": 10207.7,
      "perCapitaPPPChangePct": 10.33,
      "popChangePct": -0.03
    },
    {
      "year": 1988,
      "gdpPPP": 111.655,
      "perCapitaPPP": 11143.6,
      "perCapitaPPPChangePct": 9.17,
      "popChangePct": -0.1
    },
    {
      "year": 1989,
      "gdpPPP": 123.748,
      "perCapitaPPP": 12368.6,
      "perCapitaPPPChangePct": 10.99,
      "popChangePct": -0.15
    },
    {
      "year": 1990,
      "gdpPPP": 138.469,
      "perCapitaPPP": 13870.2,
      "perCapitaPPPChangePct": 12.14,
      "popChangePct": -0.22
    },
    {
      "year": 1991,
      "gdpPPP": 147.977,
      "perCapitaPPP": 14856.7,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": -0.23
    },
    {
      "year": 1992,
      "gdpPPP": 156.086,
      "perCapitaPPP": 15683.1,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": -0.08
    },
    {
      "year": 1993,
      "gdpPPP": 158.687,
      "perCapitaPPP": 15925.0,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 0.13
    },
    {
      "year": 1994,
      "gdpPPP": 164.49,
      "perCapitaPPP": 16462.9,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 0.27
    },
    {
      "year": 1995,
      "gdpPPP": 171.813,
      "perCapitaPPP": 17136.4,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 0.34
    },
    {
      "year": 1996,
      "gdpPPP": 181.089,
      "perCapitaPPP": 17993.9,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 0.38
    },
    {
      "year": 1997,
      "gdpPPP": 192.319,
      "perCapitaPPP": 19024.6,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": 0.45
    },
    {
      "year": 1998,
      "gdpPPP": 203.831,
      "perCapitaPPP": 20061.7,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdpPPP": 214.791,
      "perCapitaPPP": 21021.2,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 0.57
    },
    {
      "year": 2000,
      "gdpPPP": 228.039,
      "perCapitaPPP": 22161.4,
      "perCapitaPPPChangePct": 5.42,
      "popChangePct": 0.7
    },
    {
      "year": 2001,
      "gdpPPP": 237.706,
      "perCapitaPPP": 22938.5,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 0.71
    },
    {
      "year": 2002,
      "gdpPPP": 243.261,
      "perCapitaPPP": 23346.4,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 0.55
    },
    {
      "year": 2003,
      "gdpPPP": 245.755,
      "perCapitaPPP": 23497.4,
      "perCapitaPPPChangePct": 0.65,
      "popChangePct": 0.37
    },
    {
      "year": 2004,
      "gdpPPP": 256.877,
      "perCapitaPPP": 24502.1,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.24
    },
    {
      "year": 2005,
      "gdpPPP": 267.004,
      "perCapitaPPP": 25420.9,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 0.18
    },
    {
      "year": 2006,
      "gdpPPP": 279.711,
      "perCapitaPPP": 26582.7,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.18
    },
    {
      "year": 2007,
      "gdpPPP": 294.49,
      "perCapitaPPP": 27932.4,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 0.2
    },
    {
      "year": 2008,
      "gdpPPP": 301.121,
      "perCapitaPPP": 28520.2,
      "perCapitaPPPChangePct": 2.1,
      "popChangePct": 0.14
    },
    {
      "year": 2009,
      "gdpPPP": 293.519,
      "perCapitaPPP": 27773.7,
      "perCapitaPPPChangePct": -2.62,
      "popChangePct": 0.09
    },
    {
      "year": 2010,
      "gdpPPP": 302.248,
      "perCapitaPPP": 28586.6,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 0.05
    },
    {
      "year": 2011,
      "gdpPPP": 303.199,
      "perCapitaPPP": 28672.5,
      "perCapitaPPPChangePct": 0.3,
      "popChangePct": 0.02
    },
    {
      "year": 2012,
      "gdpPPP": 296.333,
      "perCapitaPPP": 28138.0,
      "perCapitaPPPChangePct": -1.86,
      "popChangePct": -0.42
    },
    {
      "year": 2013,
      "gdpPPP": 298.411,
      "perCapitaPPP": 28490.7,
      "perCapitaPPPChangePct": 1.25,
      "popChangePct": -0.54
    },
    {
      "year": 2014,
      "gdpPPP": 305.859,
      "perCapitaPPP": 29354.2,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": -0.52
    },
    {
      "year": 2015,
      "gdpPPP": 313.606,
      "perCapitaPPP": 30207.1,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": -0.36
    },
    {
      "year": 2016,
      "gdpPPP": 322.93,
      "perCapitaPPP": 31181.3,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": -0.24
    },
    {
      "year": 2017,
      "gdpPPP": 339.609,
      "perCapitaPPP": 32843.8,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": -0.16
    },
    {
      "year": 2018,
      "gdpPPP": 358.872,
      "perCapitaPPP": 34725.2,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": -0.05
    },
    {
      "year": 2019,
      "gdpPPP": 389.495,
      "perCapitaPPP": 37616.2,
      "perCapitaPPPChangePct": 8.33,
      "popChangePct": 0.18
    },
    {
      "year": 2020,
      "gdpPPP": 370.353,
      "perCapitaPPP": 35662.8,
      "perCapitaPPPChangePct": -5.19,
      "popChangePct": 0.3
    },
    {
      "year": 2021,
      "gdpPPP": 402.683,
      "perCapitaPPP": 38690.8,
      "perCapitaPPPChangePct": 8.49,
      "popChangePct": 0.22
    },
    {
      "year": 2022,
      "gdpPPP": 461.454,
      "perCapitaPPP": 44078.7,
      "perCapitaPPPChangePct": 13.93,
      "popChangePct": 0.59
    },
    {
      "year": 2023,
      "gdpPPP": 493.362,
      "perCapitaPPP": 46639.7,
      "perCapitaPPPChangePct": 5.81,
      "popChangePct": 1.04
    },
    {
      "year": 2024,
      "gdpPPP": 516.808,
      "perCapitaPPP": 48323.8,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 1.11
    },
    {
      "year": 2025,
      "gdpPPP": 541.374,
      "perCapitaPPP": 50269.0,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.7
    },
    {
      "year": 2026,
      "gdpPPP": 567.632,
      "perCapitaPPP": 52840.9,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": -0.26
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 590.538,
      "perCapitaPPP": 55112.7,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": -0.25
    },
    {
      "year": 2028,
      "gdpPPP": 610.795,
      "perCapitaPPP": 57147.9,
      "perCapitaPPPChangePct": 3.69,
      "popChangePct": -0.25
    },
    {
      "year": 2029,
      "gdpPPP": 632.224,
      "perCapitaPPP": 59271.4,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": -0.2
    },
    {
      "year": 2030,
      "gdpPPP": 654.465,
      "perCapitaPPP": 61479.4,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": -0.21
    },
    {
      "year": 2031,
      "gdpPPP": 676.94,
      "perCapitaPPP": 63718.2,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": -0.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PortugalGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
