import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Germany",
  "slug": "germany",
  "iso3": "DEU",
  "region": "Europe",
  "rank2026": 3,
  "flagEmoji": "🇩🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "China",
      "slug": "china",
      "rank": 2
    },
    {
      "name": "Japan",
      "slug": "japan",
      "rank": 4
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 856.833,
      "growth": 1.3,
      "perCapita": 11150.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 720.895,
      "growth": 0.1,
      "perCapita": 9363.8,
      "popChangePct": 0.19
    },
    {
      "year": 1982,
      "gdp": 696.088,
      "growth": -0.8,
      "perCapita": 9048.0,
      "popChangePct": -0.07
    },
    {
      "year": 1983,
      "gdp": 694.447,
      "growth": 1.6,
      "perCapita": 9058.3,
      "popChangePct": -0.35
    },
    {
      "year": 1984,
      "gdp": 654.289,
      "growth": 2.8,
      "perCapita": 8569.0,
      "popChangePct": -0.4
    },
    {
      "year": 1985,
      "gdp": 663.459,
      "growth": 2.2,
      "perCapita": 8710.6,
      "popChangePct": -0.25
    },
    {
      "year": 1986,
      "gdp": 947.583,
      "growth": 2.4,
      "perCapita": 12432.4,
      "popChangePct": 0.07
    },
    {
      "year": 1987,
      "gdp": 1179.165,
      "growth": 1.5,
      "perCapita": 15468.0,
      "popChangePct": 0.02
    },
    {
      "year": 1988,
      "gdp": 1271.263,
      "growth": 3.7,
      "perCapita": 16575.2,
      "popChangePct": 0.61
    },
    {
      "year": 1989,
      "gdp": 1262,
      "growth": 3.9,
      "perCapita": 16291.6,
      "popChangePct": 1.0
    },
    {
      "year": 1990,
      "gdp": 1604.497,
      "growth": 5.7,
      "perCapita": 20323.3,
      "popChangePct": 1.92
    },
    {
      "year": 1991,
      "gdp": 1882.489,
      "growth": 5,
      "perCapita": 23539.0,
      "popChangePct": 1.3
    },
    {
      "year": 1992,
      "gdp": 2146.14,
      "growth": 2,
      "perCapita": 26660.2,
      "popChangePct": 0.66
    },
    {
      "year": 1993,
      "gdp": 2080.092,
      "growth": -1,
      "perCapita": 25697.1,
      "popChangePct": 0.56
    },
    {
      "year": 1994,
      "gdp": 2220.165,
      "growth": 2.6,
      "perCapita": 27359.6,
      "popChangePct": 0.25
    },
    {
      "year": 1995,
      "gdp": 2595.269,
      "growth": 1.5,
      "perCapita": 31919.0,
      "popChangePct": 0.2
    },
    {
      "year": 1996,
      "gdp": 2507.448,
      "growth": 1,
      "perCapita": 30778.9,
      "popChangePct": 0.2
    },
    {
      "year": 1997,
      "gdp": 2221.504,
      "growth": 1.9,
      "perCapita": 27254.3,
      "popChangePct": 0.05
    },
    {
      "year": 1998,
      "gdp": 2250.847,
      "growth": 2.1,
      "perCapita": 27636.0,
      "popChangePct": -0.08
    },
    {
      "year": 1999,
      "gdp": 2216.072,
      "growth": 2.1,
      "perCapita": 27216.9,
      "popChangePct": -0.03
    },
    {
      "year": 2000,
      "gdp": 1967.85,
      "growth": 2.9,
      "perCapita": 24158.2,
      "popChangePct": 0.04
    },
    {
      "year": 2001,
      "gdp": 1966.395,
      "growth": 1.6,
      "perCapita": 24122.4,
      "popChangePct": 0.07
    },
    {
      "year": 2002,
      "gdp": 2100.865,
      "growth": -0.2,
      "perCapita": 25752.7,
      "popChangePct": 0.07
    },
    {
      "year": 2003,
      "gdp": 2534.081,
      "growth": -0.5,
      "perCapita": 31074.4,
      "popChangePct": -0.04
    },
    {
      "year": 2004,
      "gdp": 2851.023,
      "growth": 1.2,
      "perCapita": 35000.5,
      "popChangePct": -0.11
    },
    {
      "year": 2005,
      "gdp": 2894.992,
      "growth": 0.9,
      "perCapita": 35592.3,
      "popChangePct": -0.15
    },
    {
      "year": 2006,
      "gdp": 3046.47,
      "growth": 3.9,
      "perCapita": 37530.2,
      "popChangePct": -0.2
    },
    {
      "year": 2007,
      "gdp": 3484.467,
      "growth": 2.9,
      "perCapita": 43021.7,
      "popChangePct": -0.22
    },
    {
      "year": 2008,
      "gdp": 3807.781,
      "growth": 0.9,
      "perCapita": 47146.7,
      "popChangePct": -0.28
    },
    {
      "year": 2009,
      "gdp": 3474.768,
      "growth": -5.6,
      "perCapita": 43173.7,
      "popChangePct": -0.35
    },
    {
      "year": 2010,
      "gdp": 3469.925,
      "growth": 4.1,
      "perCapita": 43220.1,
      "popChangePct": -0.25
    },
    {
      "year": 2011,
      "gdp": 3822.903,
      "growth": 3.8,
      "perCapita": 47622.0,
      "popChangePct": -0.01
    },
    {
      "year": 2012,
      "gdp": 3598.761,
      "growth": 0.5,
      "perCapita": 44768.6,
      "popChangePct": 0.14
    },
    {
      "year": 2013,
      "gdp": 3807.079,
      "growth": 0.4,
      "perCapita": 47282.5,
      "popChangePct": 0.16
    },
    {
      "year": 2014,
      "gdp": 3965.893,
      "growth": 2.2,
      "perCapita": 49108.1,
      "popChangePct": 0.3
    },
    {
      "year": 2015,
      "gdp": 3425.446,
      "growth": 1.7,
      "perCapita": 42109.3,
      "popChangePct": 0.73
    },
    {
      "year": 2016,
      "gdp": 3535.812,
      "growth": 2.2,
      "perCapita": 43189.6,
      "popChangePct": 0.64
    },
    {
      "year": 2017,
      "gdp": 3764.023,
      "growth": 2.8,
      "perCapita": 45881.5,
      "popChangePct": 0.21
    },
    {
      "year": 2018,
      "gdp": 4057.272,
      "growth": 1.1,
      "perCapita": 49384.5,
      "popChangePct": 0.15
    },
    {
      "year": 2019,
      "gdp": 3960.332,
      "growth": 1,
      "perCapita": 48177.6,
      "popChangePct": 0.06
    },
    {
      "year": 2020,
      "gdp": 3938.244,
      "growth": -4.1,
      "perCapita": 47953.7,
      "popChangePct": -0.09
    },
    {
      "year": 2021,
      "gdp": 4358.147,
      "growth": 3.9,
      "perCapita": 53151.5,
      "popChangePct": -0.16
    },
    {
      "year": 2022,
      "gdp": 4204.327,
      "growth": 1.8,
      "perCapita": 50943.6,
      "popChangePct": 0.65
    },
    {
      "year": 2023,
      "gdp": 4563.523,
      "growth": -0.9,
      "perCapita": 54793.1,
      "popChangePct": 0.92
    },
    {
      "year": 2024,
      "gdp": 4684.182,
      "growth": -0.5,
      "perCapita": 56086.9,
      "popChangePct": 0.28
    },
    {
      "year": 2025,
      "gdp": 5048.059,
      "growth": 0.2,
      "perCapita": 60438.8,
      "popChangePct": 0.01
    },
    {
      "year": 2026,
      "gdp": 5452.858,
      "growth": 0.8,
      "perCapita": 65302.9,
      "popChangePct": -0.03
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 5642.156,
      "growth": 1.2,
      "perCapita": 67613.1,
      "popChangePct": -0.06
    },
    {
      "year": 2028,
      "gdp": 5818.884,
      "growth": 1.2,
      "perCapita": 69804.9,
      "popChangePct": -0.11
    },
    {
      "year": 2029,
      "gdp": 6003.131,
      "growth": 0.9,
      "perCapita": 72087.8,
      "popChangePct": -0.1
    },
    {
      "year": 2030,
      "gdp": 6178.303,
      "growth": 0.7,
      "perCapita": 74263.7,
      "popChangePct": -0.1
    },
    {
      "year": 2031,
      "gdp": 6351.962,
      "growth": 0.6,
      "perCapita": 76425.9,
      "popChangePct": -0.1
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 922.849,
      "perCapitaPPP": 12009.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 1011.276,
      "perCapitaPPP": 13135.6,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": 0.19
    },
    {
      "year": 1982,
      "gdpPPP": 1065.304,
      "perCapitaPPP": 13847.2,
      "perCapitaPPPChangePct": 5.42,
      "popChangePct": -0.07
    },
    {
      "year": 1983,
      "gdpPPP": 1124.23,
      "perCapitaPPP": 14664.3,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": -0.35
    },
    {
      "year": 1984,
      "gdpPPP": 1197.725,
      "perCapitaPPP": 15686.3,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": -0.4
    },
    {
      "year": 1985,
      "gdpPPP": 1262.687,
      "perCapitaPPP": 16578.0,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": -0.25
    },
    {
      "year": 1986,
      "gdpPPP": 1319.247,
      "perCapitaPPP": 17308.7,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 0.07
    },
    {
      "year": 1987,
      "gdpPPP": 1371.803,
      "perCapitaPPP": 17995.0,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 0.02
    },
    {
      "year": 1988,
      "gdpPPP": 1473.234,
      "perCapitaPPP": 19208.5,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 0.61
    },
    {
      "year": 1989,
      "gdpPPP": 1590.913,
      "perCapitaPPP": 20537.7,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 1.0
    },
    {
      "year": 1990,
      "gdpPPP": 1744.915,
      "perCapitaPPP": 22101.9,
      "perCapitaPPPChangePct": 7.62,
      "popChangePct": 1.92
    },
    {
      "year": 1991,
      "gdpPPP": 1894.337,
      "perCapitaPPP": 23687.1,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 1.3
    },
    {
      "year": 1992,
      "gdpPPP": 1976.586,
      "perCapitaPPP": 24553.9,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 0.66
    },
    {
      "year": 1993,
      "gdpPPP": 2003.61,
      "perCapitaPPP": 24752.3,
      "perCapitaPPPChangePct": 0.81,
      "popChangePct": 0.56
    },
    {
      "year": 1994,
      "gdpPPP": 2099.541,
      "perCapitaPPP": 25873.1,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": 0.25
    },
    {
      "year": 1995,
      "gdpPPP": 2175.964,
      "perCapitaPPP": 26762.0,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 0.2
    },
    {
      "year": 1996,
      "gdpPPP": 2238.653,
      "perCapitaPPP": 27479.4,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 0.2
    },
    {
      "year": 1997,
      "gdpPPP": 2319.48,
      "perCapitaPPP": 28456.3,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 0.05
    },
    {
      "year": 1998,
      "gdpPPP": 2394.856,
      "perCapitaPPP": 29404.1,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": -0.08
    },
    {
      "year": 1999,
      "gdpPPP": 2480.399,
      "perCapitaPPP": 30463.3,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": -0.03
    },
    {
      "year": 2000,
      "gdpPPP": 2609.614,
      "perCapitaPPP": 32036.8,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": 0.04
    },
    {
      "year": 2001,
      "gdpPPP": 2712.124,
      "perCapitaPPP": 33270.5,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 0.07
    },
    {
      "year": 2002,
      "gdpPPP": 2747.819,
      "perCapitaPPP": 33683.1,
      "perCapitaPPPChangePct": 1.24,
      "popChangePct": 0.07
    },
    {
      "year": 2003,
      "gdpPPP": 2787.215,
      "perCapitaPPP": 34178.5,
      "perCapitaPPPChangePct": 1.47,
      "popChangePct": -0.04
    },
    {
      "year": 2004,
      "gdpPPP": 2895.514,
      "perCapitaPPP": 35546.6,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": -0.11
    },
    {
      "year": 2005,
      "gdpPPP": 3012.853,
      "perCapitaPPP": 37041.4,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": -0.15
    },
    {
      "year": 2006,
      "gdpPPP": 3225.545,
      "perCapitaPPP": 39736.3,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": -0.2
    },
    {
      "year": 2007,
      "gdpPPP": 3408.747,
      "perCapitaPPP": 42086.8,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": -0.22
    },
    {
      "year": 2008,
      "gdpPPP": 3505.278,
      "perCapitaPPP": 43401.2,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": -0.28
    },
    {
      "year": 2009,
      "gdpPPP": 3331.14,
      "perCapitaPPP": 41389.1,
      "perCapitaPPPChangePct": -4.64,
      "popChangePct": -0.35
    },
    {
      "year": 2010,
      "gdpPPP": 3511.345,
      "perCapitaPPP": 43736.0,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": -0.25
    },
    {
      "year": 2011,
      "gdpPPP": 3718.462,
      "perCapitaPPP": 46321.0,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": -0.01
    },
    {
      "year": 2012,
      "gdpPPP": 3805.35,
      "perCapitaPPP": 47338.6,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 0.14
    },
    {
      "year": 2013,
      "gdpPPP": 3885.387,
      "perCapitaPPP": 48255.0,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 0.16
    },
    {
      "year": 2014,
      "gdpPPP": 4039.125,
      "perCapitaPPP": 50014.9,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 0.3
    },
    {
      "year": 2015,
      "gdpPPP": 4144.409,
      "perCapitaPPP": 50947.6,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 0.73
    },
    {
      "year": 2016,
      "gdpPPP": 4276.557,
      "perCapitaPPP": 52237.7,
      "perCapitaPPPChangePct": 2.53,
      "popChangePct": 0.64
    },
    {
      "year": 2017,
      "gdpPPP": 4475.279,
      "perCapitaPPP": 54551.3,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 0.21
    },
    {
      "year": 2018,
      "gdpPPP": 4669.306,
      "perCapitaPPP": 56834.1,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.15
    },
    {
      "year": 2019,
      "gdpPPP": 4928.323,
      "perCapitaPPP": 59953.3,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 0.06
    },
    {
      "year": 2020,
      "gdpPPP": 4881.924,
      "perCapitaPPP": 59444.3,
      "perCapitaPPPChangePct": -0.85,
      "popChangePct": -0.09
    },
    {
      "year": 2021,
      "gdpPPP": 5245.574,
      "perCapitaPPP": 63974.5,
      "perCapitaPPPChangePct": 7.62,
      "popChangePct": -0.16
    },
    {
      "year": 2022,
      "gdpPPP": 5720.184,
      "perCapitaPPP": 69311.2,
      "perCapitaPPPChangePct": 8.34,
      "popChangePct": 0.65
    },
    {
      "year": 2023,
      "gdpPPP": 5880.111,
      "perCapitaPPP": 70601.0,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 0.92
    },
    {
      "year": 2024,
      "gdpPPP": 5996.196,
      "perCapitaPPP": 71796.5,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": 0.28
    },
    {
      "year": 2025,
      "gdpPPP": 6181.073,
      "perCapitaPPP": 74004.0,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 0.01
    },
    {
      "year": 2026,
      "gdpPPP": 6408.42,
      "perCapitaPPP": 76746.6,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": -0.03
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 6626.608,
      "perCapitaPPP": 79410.4,
      "perCapitaPPPChangePct": 3.47,
      "popChangePct": -0.06
    },
    {
      "year": 2028,
      "gdpPPP": 6815.95,
      "perCapitaPPP": 81765.9,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": -0.11
    },
    {
      "year": 2029,
      "gdpPPP": 7002.641,
      "perCapitaPPP": 84090.2,
      "perCapitaPPPChangePct": 2.84,
      "popChangePct": -0.1
    },
    {
      "year": 2030,
      "gdpPPP": 7178.028,
      "perCapitaPPP": 86280.5,
      "perCapitaPPPChangePct": 2.6,
      "popChangePct": -0.1
    },
    {
      "year": 2031,
      "gdpPPP": 7353.142,
      "perCapitaPPP": 88472.0,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": -0.1
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GermanyGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
