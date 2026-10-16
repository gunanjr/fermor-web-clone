import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Mexico",
  "slug": "mexico",
  "iso3": "MEX",
  "region": "Americas",
  "rank2026": 13,
  "flagEmoji": "🇲🇽",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Australia",
      "slug": "australia",
      "rank": 12
    },
    {
      "name": "Spain",
      "slug": "spain",
      "rank": 14
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 242.153,
      "growth": 9.5,
      "perCapita": 3557.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 311.012,
      "growth": 9.6,
      "perCapita": 4461.2,
      "popChangePct": 2.41
    },
    {
      "year": 1982,
      "gdp": 225.706,
      "growth": 0,
      "perCapita": 3162.5,
      "popChangePct": 2.37
    },
    {
      "year": 1983,
      "gdp": 184.01,
      "growth": -4.6,
      "perCapita": 2519.5,
      "popChangePct": 2.33
    },
    {
      "year": 1984,
      "gdp": 217.001,
      "growth": 3.5,
      "perCapita": 2904.7,
      "popChangePct": 2.29
    },
    {
      "year": 1985,
      "gdp": 230.272,
      "growth": 1.9,
      "perCapita": 3015.0,
      "popChangePct": 2.23
    },
    {
      "year": 1986,
      "gdp": 159.434,
      "growth": -3.9,
      "perCapita": 2043.3,
      "popChangePct": 2.17
    },
    {
      "year": 1987,
      "gdp": 174.84,
      "growth": 2.1,
      "perCapita": 2194.7,
      "popChangePct": 2.1
    },
    {
      "year": 1988,
      "gdp": 213.893,
      "growth": 1.2,
      "perCapita": 2631.5,
      "popChangePct": 2.03
    },
    {
      "year": 1989,
      "gdp": 260.663,
      "growth": 3.6,
      "perCapita": 3144.7,
      "popChangePct": 1.98
    },
    {
      "year": 1990,
      "gdp": 307.613,
      "growth": 5.3,
      "perCapita": 3640.3,
      "popChangePct": 1.95
    },
    {
      "year": 1991,
      "gdp": 368.772,
      "growth": 4,
      "perCapita": 4281.7,
      "popChangePct": 1.92
    },
    {
      "year": 1992,
      "gdp": 427.661,
      "growth": 3.6,
      "perCapita": 4873.5,
      "popChangePct": 1.89
    },
    {
      "year": 1993,
      "gdp": 530.226,
      "growth": 2.9,
      "perCapita": 5933.3,
      "popChangePct": 1.84
    },
    {
      "year": 1994,
      "gdp": 553.618,
      "growth": 4.4,
      "perCapita": 6086.8,
      "popChangePct": 1.78
    },
    {
      "year": 1995,
      "gdp": 380.182,
      "growth": -5.9,
      "perCapita": 4109.8,
      "popChangePct": 1.71
    },
    {
      "year": 1996,
      "gdp": 432.158,
      "growth": 6.2,
      "perCapita": 4597.2,
      "popChangePct": 1.62
    },
    {
      "year": 1997,
      "gdp": 523.45,
      "growth": 7.2,
      "perCapita": 5484.7,
      "popChangePct": 1.52
    },
    {
      "year": 1998,
      "gdp": 557.485,
      "growth": 6.2,
      "perCapita": 5759.2,
      "popChangePct": 1.43
    },
    {
      "year": 1999,
      "gdp": 631.24,
      "growth": 2.8,
      "perCapita": 6435.6,
      "popChangePct": 1.33
    },
    {
      "year": 2000,
      "gdp": 742.061,
      "growth": 5,
      "perCapita": 7467.7,
      "popChangePct": 1.31
    },
    {
      "year": 2001,
      "gdp": 796.055,
      "growth": -0.5,
      "perCapita": 7902.1,
      "popChangePct": 1.38
    },
    {
      "year": 2002,
      "gdp": 810.666,
      "growth": -0.2,
      "perCapita": 7934.7,
      "popChangePct": 1.42
    },
    {
      "year": 2003,
      "gdp": 765.55,
      "growth": 1.2,
      "perCapita": 7390.3,
      "popChangePct": 1.39
    },
    {
      "year": 2004,
      "gdp": 819.459,
      "growth": 3.6,
      "perCapita": 7806.6,
      "popChangePct": 1.34
    },
    {
      "year": 2005,
      "gdp": 917.572,
      "growth": 2.1,
      "perCapita": 8626.2,
      "popChangePct": 1.33
    },
    {
      "year": 2006,
      "gdp": 1020.265,
      "growth": 4.8,
      "perCapita": 9456.9,
      "popChangePct": 1.42
    },
    {
      "year": 2007,
      "gdp": 1102.356,
      "growth": 2.1,
      "perCapita": 10063.6,
      "popChangePct": 1.53
    },
    {
      "year": 2008,
      "gdp": 1161.553,
      "growth": 0.9,
      "perCapita": 10438.5,
      "popChangePct": 1.59
    },
    {
      "year": 2009,
      "gdp": 943.437,
      "growth": -6.3,
      "perCapita": 8346.8,
      "popChangePct": 1.58
    },
    {
      "year": 2010,
      "gdp": 1105.424,
      "growth": 5,
      "perCapita": 9632.8,
      "popChangePct": 1.53
    },
    {
      "year": 2011,
      "gdp": 1229.014,
      "growth": 3.4,
      "perCapita": 10554.4,
      "popChangePct": 1.47
    },
    {
      "year": 2012,
      "gdp": 1255.11,
      "growth": 3.6,
      "perCapita": 10631.1,
      "popChangePct": 1.39
    },
    {
      "year": 2013,
      "gdp": 1327.436,
      "growth": 0.9,
      "perCapita": 11099.2,
      "popChangePct": 1.3
    },
    {
      "year": 2014,
      "gdp": 1364.508,
      "growth": 2.5,
      "perCapita": 11272.4,
      "popChangePct": 1.21
    },
    {
      "year": 2015,
      "gdp": 1213.294,
      "growth": 2.7,
      "perCapita": 9915.1,
      "popChangePct": 1.09
    },
    {
      "year": 2016,
      "gdp": 1112.233,
      "growth": 1.8,
      "perCapita": 8999.6,
      "popChangePct": 1.0
    },
    {
      "year": 2017,
      "gdp": 1190.721,
      "growth": 1.9,
      "perCapita": 9542.8,
      "popChangePct": 0.96
    },
    {
      "year": 2018,
      "gdp": 1256.3,
      "growth": 2,
      "perCapita": 9971.0,
      "popChangePct": 0.98
    },
    {
      "year": 2019,
      "gdp": 1304.106,
      "growth": -0.4,
      "perCapita": 10251.1,
      "popChangePct": 0.97
    },
    {
      "year": 2020,
      "gdp": 1121.065,
      "growth": -8.4,
      "perCapita": 8744.0,
      "popChangePct": 0.78
    },
    {
      "year": 2021,
      "gdp": 1316.569,
      "growth": 6,
      "perCapita": 10207.3,
      "popChangePct": 0.6
    },
    {
      "year": 2022,
      "gdp": 1466.935,
      "growth": 3.7,
      "perCapita": 11287.5,
      "popChangePct": 0.76
    },
    {
      "year": 2023,
      "gdp": 1794.41,
      "growth": 3.1,
      "perCapita": 13683.7,
      "popChangePct": 0.9
    },
    {
      "year": 2024,
      "gdp": 1830.489,
      "growth": 1.4,
      "perCapita": 13838.6,
      "popChangePct": 0.87
    },
    {
      "year": 2025,
      "gdp": 1832.641,
      "growth": 0.6,
      "perCapita": 13741.3,
      "popChangePct": 0.83
    },
    {
      "year": 2026,
      "gdp": 2120.855,
      "growth": 1.6,
      "perCapita": 15779.3,
      "popChangePct": 0.78
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2222.003,
      "growth": 2.2,
      "perCapita": 16411.7,
      "popChangePct": 0.73
    },
    {
      "year": 2028,
      "gdp": 2327.102,
      "growth": 2.1,
      "perCapita": 17070.7,
      "popChangePct": 0.69
    },
    {
      "year": 2029,
      "gdp": 2435.745,
      "growth": 2,
      "perCapita": 17753.1,
      "popChangePct": 0.64
    },
    {
      "year": 2030,
      "gdp": 2548.63,
      "growth": 2,
      "perCapita": 18463.8,
      "popChangePct": 0.61
    },
    {
      "year": 2031,
      "gdp": 2667.215,
      "growth": 2,
      "perCapita": 19212.7,
      "popChangePct": 0.57
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 441.519,
      "perCapitaPPP": 6486.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 529.62,
      "perCapitaPPP": 7596.9,
      "perCapitaPPPChangePct": 17.13,
      "popChangePct": 2.41
    },
    {
      "year": 1982,
      "gdpPPP": 562.068,
      "perCapitaPPP": 7875.5,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 2.37
    },
    {
      "year": 1983,
      "gdpPPP": 557.07,
      "perCapitaPPP": 7627.5,
      "perCapitaPPPChangePct": -3.15,
      "popChangePct": 2.33
    },
    {
      "year": 1984,
      "gdpPPP": 597.454,
      "perCapitaPPP": 7997.3,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 2.29
    },
    {
      "year": 1985,
      "gdpPPP": 628.176,
      "perCapitaPPP": 8224.9,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 2.23
    },
    {
      "year": 1986,
      "gdpPPP": 615.639,
      "perCapitaPPP": 7889.9,
      "perCapitaPPPChangePct": -4.07,
      "popChangePct": 2.17
    },
    {
      "year": 1987,
      "gdpPPP": 643.913,
      "perCapitaPPP": 8082.8,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 2.1
    },
    {
      "year": 1988,
      "gdpPPP": 674.742,
      "perCapitaPPP": 8301.2,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 2.03
    },
    {
      "year": 1989,
      "gdpPPP": 726.623,
      "perCapitaPPP": 8766.1,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 1.98
    },
    {
      "year": 1990,
      "gdpPPP": 793.392,
      "perCapitaPPP": 9388.9,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": 1.95
    },
    {
      "year": 1991,
      "gdpPPP": 852.839,
      "perCapitaPPP": 9902.1,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.92
    },
    {
      "year": 1992,
      "gdpPPP": 903.403,
      "perCapitaPPP": 10294.8,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 1.89
    },
    {
      "year": 1993,
      "gdpPPP": 951.329,
      "perCapitaPPP": 10645.5,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 1.84
    },
    {
      "year": 1994,
      "gdpPPP": 1014.339,
      "perCapitaPPP": 11152.3,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 1.78
    },
    {
      "year": 1995,
      "gdpPPP": 974.397,
      "perCapitaPPP": 10533.2,
      "perCapitaPPPChangePct": -5.55,
      "popChangePct": 1.71
    },
    {
      "year": 1996,
      "gdpPPP": 1053.937,
      "perCapitaPPP": 11211.4,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 1.62
    },
    {
      "year": 1997,
      "gdpPPP": 1149.291,
      "perCapitaPPP": 12042.3,
      "perCapitaPPPChangePct": 7.41,
      "popChangePct": 1.52
    },
    {
      "year": 1998,
      "gdpPPP": 1234.092,
      "perCapitaPPP": 12749.0,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 1.43
    },
    {
      "year": 1999,
      "gdpPPP": 1286.036,
      "perCapitaPPP": 13111.4,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": 1.33
    },
    {
      "year": 2000,
      "gdpPPP": 1381.311,
      "perCapitaPPP": 13900.8,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 1.31
    },
    {
      "year": 2001,
      "gdpPPP": 1406.045,
      "perCapitaPPP": 13957.3,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 1.38
    },
    {
      "year": 2002,
      "gdpPPP": 1424.517,
      "perCapitaPPP": 13943.0,
      "perCapitaPPPChangePct": -0.1,
      "popChangePct": 1.42
    },
    {
      "year": 2003,
      "gdpPPP": 1469.862,
      "perCapitaPPP": 14189.5,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 1.39
    },
    {
      "year": 2004,
      "gdpPPP": 1563.201,
      "perCapitaPPP": 14891.8,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 1.34
    },
    {
      "year": 2005,
      "gdpPPP": 1646.29,
      "perCapitaPPP": 15476.9,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 1.33
    },
    {
      "year": 2006,
      "gdpPPP": 1778.604,
      "perCapitaPPP": 16486.0,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 1.42
    },
    {
      "year": 2007,
      "gdpPPP": 1864.749,
      "perCapitaPPP": 17023.7,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 1.53
    },
    {
      "year": 2008,
      "gdpPPP": 1918.602,
      "perCapitaPPP": 17241.8,
      "perCapitaPPPChangePct": 1.28,
      "popChangePct": 1.59
    },
    {
      "year": 2009,
      "gdpPPP": 1808.909,
      "perCapitaPPP": 16003.8,
      "perCapitaPPPChangePct": -7.18,
      "popChangePct": 1.58
    },
    {
      "year": 2010,
      "gdpPPP": 1921.914,
      "perCapitaPPP": 16747.8,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 1.53
    },
    {
      "year": 2011,
      "gdpPPP": 2029.125,
      "perCapitaPPP": 17425.4,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 1.47
    },
    {
      "year": 2012,
      "gdpPPP": 2140.347,
      "perCapitaPPP": 18129.2,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 1.39
    },
    {
      "year": 2013,
      "gdpPPP": 2195.324,
      "perCapitaPPP": 18355.9,
      "perCapitaPPPChangePct": 1.25,
      "popChangePct": 1.3
    },
    {
      "year": 2014,
      "gdpPPP": 2289.484,
      "perCapitaPPP": 18913.8,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 1.21
    },
    {
      "year": 2015,
      "gdpPPP": 2373.175,
      "perCapitaPPP": 19393.7,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 1.09
    },
    {
      "year": 2016,
      "gdpPPP": 2438.189,
      "perCapitaPPP": 19728.5,
      "perCapitaPPPChangePct": 1.73,
      "popChangePct": 1.0
    },
    {
      "year": 2017,
      "gdpPPP": 2528.308,
      "perCapitaPPP": 20262.6,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 0.96
    },
    {
      "year": 2018,
      "gdpPPP": 2606.266,
      "perCapitaPPP": 20685.3,
      "perCapitaPPPChangePct": 2.09,
      "popChangePct": 0.98
    },
    {
      "year": 2019,
      "gdpPPP": 2636.53,
      "perCapitaPPP": 20724.9,
      "perCapitaPPPChangePct": 0.19,
      "popChangePct": 0.97
    },
    {
      "year": 2020,
      "gdpPPP": 2454.085,
      "perCapitaPPP": 19141.3,
      "perCapitaPPPChangePct": -7.64,
      "popChangePct": 0.78
    },
    {
      "year": 2021,
      "gdpPPP": 2684.659,
      "perCapitaPPP": 20814.1,
      "perCapitaPPPChangePct": 8.74,
      "popChangePct": 0.6
    },
    {
      "year": 2022,
      "gdpPPP": 2982.281,
      "perCapitaPPP": 22947.6,
      "perCapitaPPPChangePct": 10.25,
      "popChangePct": 0.76
    },
    {
      "year": 2023,
      "gdpPPP": 3188.708,
      "perCapitaPPP": 24316.2,
      "perCapitaPPPChangePct": 5.96,
      "popChangePct": 0.9
    },
    {
      "year": 2024,
      "gdpPPP": 3312.004,
      "perCapitaPPP": 25038.9,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 0.87
    },
    {
      "year": 2025,
      "gdpPPP": 3425.088,
      "perCapitaPPP": 25681.6,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 0.83
    },
    {
      "year": 2026,
      "gdpPPP": 3580.952,
      "perCapitaPPP": 26642.5,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 0.78
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3739.589,
      "perCapitaPPP": 27620.5,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 0.73
    },
    {
      "year": 2028,
      "gdpPPP": 3881.012,
      "perCapitaPPP": 28469.5,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 0.69
    },
    {
      "year": 2029,
      "gdpPPP": 4029.615,
      "perCapitaPPP": 29370.2,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 0.64
    },
    {
      "year": 2030,
      "gdpPPP": 4186.351,
      "perCapitaPPP": 30328.4,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.61
    },
    {
      "year": 2031,
      "gdpPPP": 4347.807,
      "perCapitaPPP": 31318.4,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.57
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MexicoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
