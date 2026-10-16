import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Puerto Rico",
  "slug": "puerto-rico",
  "iso3": "PRI",
  "region": "Americas",
  "rank2026": 69,
  "flagEmoji": "🇵🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Dominican Republic",
      "slug": "dominican-republic",
      "rank": 68
    },
    {
      "name": "Guatemala",
      "slug": "guatemala",
      "rank": 70
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 14.436,
      "growth": null,
      "perCapita": 4507.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 15.956,
      "growth": 1.1,
      "perCapita": 4940.8,
      "popChangePct": 0.81
    },
    {
      "year": 1982,
      "gdp": 16.764,
      "growth": -3,
      "perCapita": 5146.9,
      "popChangePct": 0.87
    },
    {
      "year": 1983,
      "gdp": 17.277,
      "growth": 0.5,
      "perCapita": 5257.2,
      "popChangePct": 0.89
    },
    {
      "year": 1984,
      "gdp": 19.163,
      "growth": 7.3,
      "perCapita": 5777.4,
      "popChangePct": 0.94
    },
    {
      "year": 1985,
      "gdp": 20.289,
      "growth": 2.1,
      "perCapita": 6058.6,
      "popChangePct": 0.96
    },
    {
      "year": 1986,
      "gdp": 21.969,
      "growth": 8.2,
      "perCapita": 6495.5,
      "popChangePct": 0.99
    },
    {
      "year": 1987,
      "gdp": 23.878,
      "growth": 4.9,
      "perCapita": 6987.4,
      "popChangePct": 1.03
    },
    {
      "year": 1988,
      "gdp": 26.178,
      "growth": 6.5,
      "perCapita": 7579.3,
      "popChangePct": 1.08
    },
    {
      "year": 1989,
      "gdp": 28.267,
      "growth": 4.9,
      "perCapita": 8094.3,
      "popChangePct": 1.1
    },
    {
      "year": 1990,
      "gdp": 30.604,
      "growth": 3.8,
      "perCapita": 8675.6,
      "popChangePct": 1.03
    },
    {
      "year": 1991,
      "gdp": 32.287,
      "growth": 2.3,
      "perCapita": 9093.5,
      "popChangePct": 0.65
    },
    {
      "year": 1992,
      "gdp": 34.63,
      "growth": 4.6,
      "perCapita": 9687.4,
      "popChangePct": 0.68
    },
    {
      "year": 1993,
      "gdp": 36.923,
      "growth": 4.6,
      "perCapita": 10255.5,
      "popChangePct": 0.7
    },
    {
      "year": 1994,
      "gdp": 39.691,
      "growth": 4.2,
      "perCapita": 10942.9,
      "popChangePct": 0.75
    },
    {
      "year": 1995,
      "gdp": 42.647,
      "growth": 4.5,
      "perCapita": 11667.6,
      "popChangePct": 0.77
    },
    {
      "year": 1996,
      "gdp": 45.341,
      "growth": 2.3,
      "perCapita": 12305.0,
      "popChangePct": 0.82
    },
    {
      "year": 1997,
      "gdp": 48.187,
      "growth": 4.9,
      "perCapita": 12968.4,
      "popChangePct": 0.84
    },
    {
      "year": 1998,
      "gdp": 54.086,
      "growth": 6.5,
      "perCapita": 14430.2,
      "popChangePct": 0.86
    },
    {
      "year": 1999,
      "gdp": 57.841,
      "growth": 4.4,
      "perCapita": 15293.2,
      "popChangePct": 0.91
    },
    {
      "year": 2000,
      "gdp": 61.702,
      "growth": 3.3,
      "perCapita": 16192.1,
      "popChangePct": 0.77
    },
    {
      "year": 2001,
      "gdp": 69.669,
      "growth": 9.5,
      "perCapita": 18243.7,
      "popChangePct": 0.21
    },
    {
      "year": 2002,
      "gdp": 72.546,
      "growth": 2.2,
      "perCapita": 18972.8,
      "popChangePct": 0.13
    },
    {
      "year": 2003,
      "gdp": 75.834,
      "growth": 2.3,
      "perCapita": 19820.2,
      "popChangePct": 0.05
    },
    {
      "year": 2004,
      "gdp": 80.322,
      "growth": 2,
      "perCapita": 20989.0,
      "popChangePct": 0.03
    },
    {
      "year": 2005,
      "gdp": 83.915,
      "growth": -2,
      "perCapita": 21959.3,
      "popChangePct": -0.16
    },
    {
      "year": 2006,
      "gdp": 87.276,
      "growth": -1.4,
      "perCapita": 22936.0,
      "popChangePct": -0.42
    },
    {
      "year": 2007,
      "gdp": 89.524,
      "growth": -1.2,
      "perCapita": 23664.9,
      "popChangePct": -0.58
    },
    {
      "year": 2008,
      "gdp": 93.639,
      "growth": -1.8,
      "perCapita": 24898.3,
      "popChangePct": -0.58
    },
    {
      "year": 2009,
      "gdp": 96.386,
      "growth": -2,
      "perCapita": 25768.7,
      "popChangePct": -0.56
    },
    {
      "year": 2010,
      "gdp": 98.381,
      "growth": -0.4,
      "perCapita": 26435.7,
      "popChangePct": -0.48
    },
    {
      "year": 2011,
      "gdp": 100.352,
      "growth": -0.4,
      "perCapita": 27278.9,
      "popChangePct": -1.16
    },
    {
      "year": 2012,
      "gdp": 101.565,
      "growth": 0,
      "perCapita": 27944.7,
      "popChangePct": -1.22
    },
    {
      "year": 2013,
      "gdp": 102.45,
      "growth": -0.3,
      "perCapita": 28513.2,
      "popChangePct": -1.13
    },
    {
      "year": 2014,
      "gdp": 102.446,
      "growth": -1.2,
      "perCapita": 28981.3,
      "popChangePct": -1.61
    },
    {
      "year": 2015,
      "gdp": 103.376,
      "growth": -1,
      "perCapita": 29755.3,
      "popChangePct": -1.73
    },
    {
      "year": 2016,
      "gdp": 104.337,
      "growth": -1.3,
      "perCapita": 30585.5,
      "popChangePct": -1.81
    },
    {
      "year": 2017,
      "gdp": 103.446,
      "growth": -2.9,
      "perCapita": 31347.3,
      "popChangePct": -3.25
    },
    {
      "year": 2018,
      "gdp": 100.958,
      "growth": -4.4,
      "perCapita": 31549.4,
      "popChangePct": -3.03
    },
    {
      "year": 2019,
      "gdp": 105.126,
      "growth": 1.7,
      "perCapita": 32851.9,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 103.131,
      "growth": -4.2,
      "perCapita": 32643.2,
      "popChangePct": -1.28
    },
    {
      "year": 2021,
      "gdp": 106.427,
      "growth": 0.4,
      "perCapita": 33258.3,
      "popChangePct": 1.3
    },
    {
      "year": 2022,
      "gdp": 113.844,
      "growth": 3,
      "perCapita": 35576.2,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 118.375,
      "growth": 0.5,
      "perCapita": 36926.5,
      "popChangePct": 0.19
    },
    {
      "year": 2024,
      "gdp": 125.842,
      "growth": 3.2,
      "perCapita": 39612.2,
      "popChangePct": -0.9
    },
    {
      "year": 2025,
      "gdp": 126.525,
      "growth": -0.8,
      "perCapita": 39846.7,
      "popChangePct": -0.06
    },
    {
      "year": 2026,
      "gdp": 129.012,
      "growth": -0.1,
      "perCapita": 40650.1,
      "popChangePct": -0.03
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 133.41,
      "growth": 1,
      "perCapita": 42056.3,
      "popChangePct": -0.06
    },
    {
      "year": 2028,
      "gdp": 137.41,
      "growth": 0.6,
      "perCapita": 43338.5,
      "popChangePct": -0.03
    },
    {
      "year": 2029,
      "gdp": 141.508,
      "growth": 0.8,
      "perCapita": 44653.0,
      "popChangePct": -0.06
    },
    {
      "year": 2030,
      "gdp": 145.596,
      "growth": 0.8,
      "perCapita": 45965.5,
      "popChangePct": -0.03
    },
    {
      "year": 2031,
      "gdp": 149.804,
      "growth": 0.8,
      "perCapita": 47317.0,
      "popChangePct": -0.06
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 20.154,
      "perCapitaPPP": 6292.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 22.297,
      "perCapitaPPP": 6904.3,
      "perCapitaPPPChangePct": 9.73,
      "popChangePct": 0.81
    },
    {
      "year": 1982,
      "gdpPPP": 22.953,
      "perCapitaPPP": 7046.9,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 0.87
    },
    {
      "year": 1983,
      "gdpPPP": 23.963,
      "perCapitaPPP": 7291.8,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 0.89
    },
    {
      "year": 1984,
      "gdpPPP": 26.645,
      "perCapitaPPP": 8033.3,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": 0.94
    },
    {
      "year": 1985,
      "gdpPPP": 28.054,
      "perCapitaPPP": 8377.3,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.96
    },
    {
      "year": 1986,
      "gdpPPP": 30.955,
      "perCapitaPPP": 9152.2,
      "perCapitaPPPChangePct": 9.25,
      "popChangePct": 0.99
    },
    {
      "year": 1987,
      "gdpPPP": 33.282,
      "perCapitaPPP": 9739.2,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 1.03
    },
    {
      "year": 1988,
      "gdpPPP": 36.698,
      "perCapitaPPP": 10625.0,
      "perCapitaPPPChangePct": 9.1,
      "popChangePct": 1.08
    },
    {
      "year": 1989,
      "gdpPPP": 40.021,
      "perCapitaPPP": 11460.2,
      "perCapitaPPPChangePct": 7.86,
      "popChangePct": 1.1
    },
    {
      "year": 1990,
      "gdpPPP": 43.089,
      "perCapitaPPP": 12214.8,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 1.03
    },
    {
      "year": 1991,
      "gdpPPP": 45.573,
      "perCapitaPPP": 12835.3,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 0.65
    },
    {
      "year": 1992,
      "gdpPPP": 48.739,
      "perCapitaPPP": 13634.1,
      "perCapitaPPPChangePct": 6.22,
      "popChangePct": 0.68
    },
    {
      "year": 1993,
      "gdpPPP": 52.211,
      "perCapitaPPP": 14502.1,
      "perCapitaPPPChangePct": 6.37,
      "popChangePct": 0.7
    },
    {
      "year": 1994,
      "gdpPPP": 55.558,
      "perCapitaPPP": 15317.8,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 0.75
    },
    {
      "year": 1995,
      "gdpPPP": 59.303,
      "perCapitaPPP": 16224.4,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": 0.77
    },
    {
      "year": 1996,
      "gdpPPP": 61.786,
      "perCapitaPPP": 16768.2,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 0.82
    },
    {
      "year": 1997,
      "gdpPPP": 65.919,
      "perCapitaPPP": 17740.5,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.84
    },
    {
      "year": 1998,
      "gdpPPP": 71.005,
      "perCapitaPPP": 18944.0,
      "perCapitaPPPChangePct": 6.78,
      "popChangePct": 0.86
    },
    {
      "year": 1999,
      "gdpPPP": 75.187,
      "perCapitaPPP": 19879.5,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 0.91
    },
    {
      "year": 2000,
      "gdpPPP": 79.406,
      "perCapitaPPP": 20838.2,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 0.77
    },
    {
      "year": 2001,
      "gdpPPP": 88.881,
      "perCapitaPPP": 23274.8,
      "perCapitaPPPChangePct": 11.69,
      "popChangePct": 0.21
    },
    {
      "year": 2002,
      "gdpPPP": 92.222,
      "perCapitaPPP": 24118.4,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 0.13
    },
    {
      "year": 2003,
      "gdpPPP": 96.244,
      "perCapitaPPP": 25154.6,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 0.05
    },
    {
      "year": 2004,
      "gdpPPP": 100.796,
      "perCapitaPPP": 26338.9,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 0.03
    },
    {
      "year": 2005,
      "gdpPPP": 101.891,
      "perCapitaPPP": 26663.4,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": -0.16
    },
    {
      "year": 2006,
      "gdpPPP": 103.552,
      "perCapitaPPP": 27213.3,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": -0.42
    },
    {
      "year": 2007,
      "gdpPPP": 105.122,
      "perCapitaPPP": 27787.9,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": -0.58
    },
    {
      "year": 2008,
      "gdpPPP": 105.171,
      "perCapitaPPP": 27964.5,
      "perCapitaPPPChangePct": 0.64,
      "popChangePct": -0.58
    },
    {
      "year": 2009,
      "gdpPPP": 103.753,
      "perCapitaPPP": 27738.5,
      "perCapitaPPPChangePct": -0.81,
      "popChangePct": -0.56
    },
    {
      "year": 2010,
      "gdpPPP": 104.58,
      "perCapitaPPP": 28101.4,
      "perCapitaPPPChangePct": 1.31,
      "popChangePct": -0.48
    },
    {
      "year": 2011,
      "gdpPPP": 106.355,
      "perCapitaPPP": 28910.8,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": -1.16
    },
    {
      "year": 2012,
      "gdpPPP": 108.367,
      "perCapitaPPP": 29816.4,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": -1.22
    },
    {
      "year": 2013,
      "gdpPPP": 109.874,
      "perCapitaPPP": 30579.2,
      "perCapitaPPPChangePct": 2.56,
      "popChangePct": -1.13
    },
    {
      "year": 2014,
      "gdpPPP": 110.457,
      "perCapitaPPP": 31247.5,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": -1.61
    },
    {
      "year": 2015,
      "gdpPPP": 110.312,
      "perCapitaPPP": 31751.9,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": -1.73
    },
    {
      "year": 2016,
      "gdpPPP": 109.952,
      "perCapitaPPP": 32231.7,
      "perCapitaPPPChangePct": 1.51,
      "popChangePct": -1.81
    },
    {
      "year": 2017,
      "gdpPPP": 108.692,
      "perCapitaPPP": 32937.1,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": -3.25
    },
    {
      "year": 2018,
      "gdpPPP": 110.918,
      "perCapitaPPP": 34661.8,
      "perCapitaPPPChangePct": 5.24,
      "popChangePct": -3.03
    },
    {
      "year": 2019,
      "gdpPPP": 119.615,
      "perCapitaPPP": 37379.8,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 120.955,
      "perCapitaPPP": 38284.8,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": -1.28
    },
    {
      "year": 2021,
      "gdpPPP": 132.334,
      "perCapitaPPP": 41354.3,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 1.3
    },
    {
      "year": 2022,
      "gdpPPP": 145.938,
      "perCapitaPPP": 45605.5,
      "perCapitaPPPChangePct": 10.28,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 152.091,
      "perCapitaPPP": 47444.1,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.19
    },
    {
      "year": 2024,
      "gdpPPP": 160.896,
      "perCapitaPPP": 50646.7,
      "perCapitaPPPChangePct": 6.75,
      "popChangePct": -0.9
    },
    {
      "year": 2025,
      "gdpPPP": 164.137,
      "perCapitaPPP": 51692.1,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": -0.06
    },
    {
      "year": 2026,
      "gdpPPP": 168.67,
      "perCapitaPPP": 53145.8,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": -0.03
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 174.098,
      "perCapitaPPP": 54882.9,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": -0.06
    },
    {
      "year": 2028,
      "gdpPPP": 178.017,
      "perCapitaPPP": 56145.9,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": -0.03
    },
    {
      "year": 2029,
      "gdpPPP": 182.632,
      "perCapitaPPP": 57629.7,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": -0.06
    },
    {
      "year": 2030,
      "gdpPPP": 187.476,
      "perCapitaPPP": 59187.1,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": -0.03
    },
    {
      "year": 2031,
      "gdpPPP": 192.387,
      "perCapitaPPP": 60767.5,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": -0.06
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PuertoRicoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
