import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Jamaica",
  "slug": "jamaica",
  "iso3": "JAM",
  "region": "Americas",
  "rank2026": 133,
  "flagEmoji": "🇯🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Mozambique",
      "slug": "mozambique",
      "rank": 132
    },
    {
      "name": "Botswana",
      "slug": "botswana",
      "rank": 134
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.631,
      "growth": -4,
      "perCapita": 1245.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.891,
      "growth": 4.4,
      "perCapita": 1344.5,
      "popChangePct": 1.8
    },
    {
      "year": 1982,
      "gdp": 3.319,
      "growth": 3.1,
      "perCapita": 1517.9,
      "popChangePct": 1.67
    },
    {
      "year": 1983,
      "gdp": 2.95,
      "growth": 4.2,
      "perCapita": 1322.7,
      "popChangePct": 2.01
    },
    {
      "year": 1984,
      "gdp": 2.174,
      "growth": 0.9,
      "perCapita": 972.6,
      "popChangePct": 0.22
    },
    {
      "year": 1985,
      "gdp": 2.045,
      "growth": -0.9,
      "perCapita": 901.2,
      "popChangePct": 1.52
    },
    {
      "year": 1986,
      "gdp": 2.431,
      "growth": 7,
      "perCapita": 1061.6,
      "popChangePct": 0.93
    },
    {
      "year": 1987,
      "gdp": 2.741,
      "growth": 7.7,
      "perCapita": 1188.7,
      "popChangePct": 0.7
    },
    {
      "year": 1988,
      "gdp": 3.267,
      "growth": -4,
      "perCapita": 1408.4,
      "popChangePct": 0.61
    },
    {
      "year": 1989,
      "gdp": 3.788,
      "growth": 4.7,
      "perCapita": 1629.8,
      "popChangePct": 0.17
    },
    {
      "year": 1990,
      "gdp": 4.784,
      "growth": 4.9,
      "perCapita": 2022.9,
      "popChangePct": 1.76
    },
    {
      "year": 1991,
      "gdp": 4.396,
      "growth": 0.8,
      "perCapita": 1846.5,
      "popChangePct": 0.68
    },
    {
      "year": 1992,
      "gdp": 4.44,
      "growth": 2.8,
      "perCapita": 1851.2,
      "popChangePct": 0.76
    },
    {
      "year": 1993,
      "gdp": 5.581,
      "growth": 2.2,
      "perCapita": 2307.7,
      "popChangePct": 0.83
    },
    {
      "year": 1994,
      "gdp": 5.594,
      "growth": 1.9,
      "perCapita": 2292.8,
      "popChangePct": 0.87
    },
    {
      "year": 1995,
      "gdp": 6.719,
      "growth": 2.5,
      "perCapita": 2729.2,
      "popChangePct": 0.9
    },
    {
      "year": 1996,
      "gdp": 7.586,
      "growth": 0.2,
      "perCapita": 3052.3,
      "popChangePct": 0.93
    },
    {
      "year": 1997,
      "gdp": 8.618,
      "growth": -1.6,
      "perCapita": 3434.2,
      "popChangePct": 0.97
    },
    {
      "year": 1998,
      "gdp": 9.015,
      "growth": -1.2,
      "perCapita": 3557.5,
      "popChangePct": 1.0
    },
    {
      "year": 1999,
      "gdp": 9.118,
      "growth": 1,
      "perCapita": 3563.6,
      "popChangePct": 0.99
    },
    {
      "year": 2000,
      "gdp": 9.3,
      "growth": 0.8,
      "perCapita": 3601.7,
      "popChangePct": 0.9
    },
    {
      "year": 2001,
      "gdp": 9.433,
      "growth": 1.3,
      "perCapita": 3621.3,
      "popChangePct": 0.89
    },
    {
      "year": 2002,
      "gdp": 9.971,
      "growth": 0.7,
      "perCapita": 3805.8,
      "popChangePct": 0.58
    },
    {
      "year": 2003,
      "gdp": 9.675,
      "growth": 3.7,
      "perCapita": 3679.5,
      "popChangePct": 0.34
    },
    {
      "year": 2004,
      "gdp": 10.439,
      "growth": 1.3,
      "perCapita": 3955.7,
      "popChangePct": 0.38
    },
    {
      "year": 2005,
      "gdp": 11.524,
      "growth": 0.9,
      "perCapita": 4351.5,
      "popChangePct": 0.34
    },
    {
      "year": 2006,
      "gdp": 12.256,
      "growth": 2.9,
      "perCapita": 4611.3,
      "popChangePct": 0.38
    },
    {
      "year": 2007,
      "gdp": 13.215,
      "growth": 1.4,
      "perCapita": 4954.6,
      "popChangePct": 0.34
    },
    {
      "year": 2008,
      "gdp": 14.099,
      "growth": -0.8,
      "perCapita": 5267.5,
      "popChangePct": 0.37
    },
    {
      "year": 2009,
      "gdp": 12.421,
      "growth": -3.4,
      "perCapita": 4624.2,
      "popChangePct": 0.34
    },
    {
      "year": 2010,
      "gdp": 13.535,
      "growth": -1.4,
      "perCapita": 5021.4,
      "popChangePct": 0.37
    },
    {
      "year": 2011,
      "gdp": 14.787,
      "growth": 1.4,
      "perCapita": 5470.9,
      "popChangePct": 0.26
    },
    {
      "year": 2012,
      "gdp": 15.149,
      "growth": -0.5,
      "perCapita": 5589.9,
      "popChangePct": 0.26
    },
    {
      "year": 2013,
      "gdp": 14.582,
      "growth": 0.2,
      "perCapita": 5374.1,
      "popChangePct": 0.11
    },
    {
      "year": 2014,
      "gdp": 14.225,
      "growth": 0.6,
      "perCapita": 5238.0,
      "popChangePct": 0.11
    },
    {
      "year": 2015,
      "gdp": 14.927,
      "growth": 1.4,
      "perCapita": 5489.0,
      "popChangePct": 0.11
    },
    {
      "year": 2016,
      "gdp": 14.931,
      "growth": 2.8,
      "perCapita": 5486.1,
      "popChangePct": 0.11
    },
    {
      "year": 2017,
      "gdp": 15.726,
      "growth": 2.3,
      "perCapita": 5769.3,
      "popChangePct": 0.15
    },
    {
      "year": 2018,
      "gdp": 16.767,
      "growth": 2.5,
      "perCapita": 6139.4,
      "popChangePct": 0.18
    },
    {
      "year": 2019,
      "gdp": 17.002,
      "growth": 1.8,
      "perCapita": 6218.4,
      "popChangePct": 0.11
    },
    {
      "year": 2020,
      "gdp": 15.079,
      "growth": -8.3,
      "perCapita": 5508.8,
      "popChangePct": 0.11
    },
    {
      "year": 2021,
      "gdp": 15.982,
      "growth": 5.7,
      "perCapita": 5832.1,
      "popChangePct": 0.11
    },
    {
      "year": 2022,
      "gdp": 18.71,
      "growth": 6.4,
      "perCapita": 6819.7,
      "popChangePct": 0.11
    },
    {
      "year": 2023,
      "gdp": 21.299,
      "growth": 2.7,
      "perCapita": 7754.7,
      "popChangePct": 0.15
    },
    {
      "year": 2024,
      "gdp": 21.9,
      "growth": -0.5,
      "perCapita": 7964.7,
      "popChangePct": 0.11
    },
    {
      "year": 2025,
      "gdp": 22.313,
      "growth": -0.1,
      "perCapita": 8105.5,
      "popChangePct": 0.11
    },
    {
      "year": 2026,
      "gdp": 23.028,
      "growth": -1.2,
      "perCapita": 8355.8,
      "popChangePct": 0.11
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 23.932,
      "growth": 3.1,
      "perCapita": 8673.7,
      "popChangePct": 0.11
    },
    {
      "year": 2028,
      "gdp": 24.838,
      "growth": 1.8,
      "perCapita": 8991.9,
      "popChangePct": 0.11
    },
    {
      "year": 2029,
      "gdp": 25.717,
      "growth": 1.5,
      "perCapita": 9299.6,
      "popChangePct": 0.11
    },
    {
      "year": 2030,
      "gdp": 26.58,
      "growth": 1.5,
      "perCapita": 9600.7,
      "popChangePct": 0.14
    },
    {
      "year": 2031,
      "gdp": 27.472,
      "growth": 1.5,
      "perCapita": 9911.5,
      "popChangePct": 0.11
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.723,
      "perCapitaPPP": 3183.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 7.685,
      "perCapitaPPP": 3574.5,
      "perCapitaPPPChangePct": 12.29,
      "popChangePct": 1.8
    },
    {
      "year": 1982,
      "gdpPPP": 8.411,
      "perCapitaPPP": 3846.8,
      "perCapitaPPPChangePct": 7.62,
      "popChangePct": 1.67
    },
    {
      "year": 1983,
      "gdpPPP": 9.103,
      "perCapitaPPP": 4081.7,
      "perCapitaPPPChangePct": 6.11,
      "popChangePct": 2.01
    },
    {
      "year": 1984,
      "gdpPPP": 9.521,
      "perCapitaPPP": 4259.6,
      "perCapitaPPPChangePct": 4.36,
      "popChangePct": 0.22
    },
    {
      "year": 1985,
      "gdpPPP": 9.734,
      "perCapitaPPP": 4289.7,
      "perCapitaPPPChangePct": 0.71,
      "popChangePct": 1.52
    },
    {
      "year": 1986,
      "gdpPPP": 10.625,
      "perCapitaPPP": 4640.7,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 0.93
    },
    {
      "year": 1987,
      "gdpPPP": 11.727,
      "perCapitaPPP": 5084.9,
      "perCapitaPPPChangePct": 9.57,
      "popChangePct": 0.7
    },
    {
      "year": 1988,
      "gdpPPP": 11.655,
      "perCapitaPPP": 5024.4,
      "perCapitaPPPChangePct": -1.19,
      "popChangePct": 0.61
    },
    {
      "year": 1989,
      "gdpPPP": 12.682,
      "perCapitaPPP": 5456.2,
      "perCapitaPPPChangePct": 8.59,
      "popChangePct": 0.17
    },
    {
      "year": 1990,
      "gdpPPP": 13.798,
      "perCapitaPPP": 5833.7,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 1.76
    },
    {
      "year": 1991,
      "gdpPPP": 14.384,
      "perCapitaPPP": 6041.4,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": 0.68
    },
    {
      "year": 1992,
      "gdpPPP": 15.12,
      "perCapitaPPP": 6303.5,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 0.76
    },
    {
      "year": 1993,
      "gdpPPP": 15.82,
      "perCapitaPPP": 6541.3,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": 0.83
    },
    {
      "year": 1994,
      "gdpPPP": 16.461,
      "perCapitaPPP": 6746.9,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 0.87
    },
    {
      "year": 1995,
      "gdpPPP": 17.23,
      "perCapitaPPP": 6998.3,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 0.9
    },
    {
      "year": 1996,
      "gdpPPP": 17.587,
      "perCapitaPPP": 7076.6,
      "perCapitaPPPChangePct": 1.12,
      "popChangePct": 0.93
    },
    {
      "year": 1997,
      "gdpPPP": 17.597,
      "perCapitaPPP": 7012.2,
      "perCapitaPPPChangePct": -0.91,
      "popChangePct": 0.97
    },
    {
      "year": 1998,
      "gdpPPP": 17.579,
      "perCapitaPPP": 6936.9,
      "perCapitaPPPChangePct": -1.07,
      "popChangePct": 1.0
    },
    {
      "year": 1999,
      "gdpPPP": 18.003,
      "perCapitaPPP": 7036.2,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 0.99
    },
    {
      "year": 2000,
      "gdpPPP": 18.553,
      "perCapitaPPP": 7185.1,
      "perCapitaPPPChangePct": 2.12,
      "popChangePct": 0.9
    },
    {
      "year": 2001,
      "gdpPPP": 19.214,
      "perCapitaPPP": 7376.0,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 0.89
    },
    {
      "year": 2002,
      "gdpPPP": 19.644,
      "perCapitaPPP": 7497.9,
      "perCapitaPPPChangePct": 1.65,
      "popChangePct": 0.58
    },
    {
      "year": 2003,
      "gdpPPP": 20.767,
      "perCapitaPPP": 7897.9,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": 0.34
    },
    {
      "year": 2004,
      "gdpPPP": 21.607,
      "perCapitaPPP": 8188.1,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 0.38
    },
    {
      "year": 2005,
      "gdpPPP": 22.484,
      "perCapitaPPP": 8490.0,
      "perCapitaPPPChangePct": 3.69,
      "popChangePct": 0.34
    },
    {
      "year": 2006,
      "gdpPPP": 23.849,
      "perCapitaPPP": 8973.5,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 0.38
    },
    {
      "year": 2007,
      "gdpPPP": 24.849,
      "perCapitaPPP": 9316.7,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.34
    },
    {
      "year": 2008,
      "gdpPPP": 25.121,
      "perCapitaPPP": 9385.1,
      "perCapitaPPPChangePct": 0.74,
      "popChangePct": 0.37
    },
    {
      "year": 2009,
      "gdpPPP": 24.414,
      "perCapitaPPP": 9088.9,
      "perCapitaPPPChangePct": -3.16,
      "popChangePct": 0.34
    },
    {
      "year": 2010,
      "gdpPPP": 24.356,
      "perCapitaPPP": 9035.6,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 0.37
    },
    {
      "year": 2011,
      "gdpPPP": 25.213,
      "perCapitaPPP": 9328.0,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 0.26
    },
    {
      "year": 2012,
      "gdpPPP": 25.554,
      "perCapitaPPP": 9429.3,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": 0.26
    },
    {
      "year": 2013,
      "gdpPPP": 26.047,
      "perCapitaPPP": 9599.3,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 0.11
    },
    {
      "year": 2014,
      "gdpPPP": 26.653,
      "perCapitaPPP": 9814.4,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 0.11
    },
    {
      "year": 2015,
      "gdpPPP": 27.284,
      "perCapitaPPP": 10032.9,
      "perCapitaPPPChangePct": 2.23,
      "popChangePct": 0.11
    },
    {
      "year": 2016,
      "gdpPPP": 28.304,
      "perCapitaPPP": 10399.4,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 0.11
    },
    {
      "year": 2017,
      "gdpPPP": 29.471,
      "perCapitaPPP": 10811.6,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 0.15
    },
    {
      "year": 2018,
      "gdpPPP": 30.324,
      "perCapitaPPP": 11103.6,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 0.18
    },
    {
      "year": 2019,
      "gdpPPP": 30.618,
      "perCapitaPPP": 11198.7,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 0.11
    },
    {
      "year": 2020,
      "gdpPPP": 27.64,
      "perCapitaPPP": 10098.0,
      "perCapitaPPPChangePct": -9.83,
      "popChangePct": 0.11
    },
    {
      "year": 2021,
      "gdpPPP": 29.599,
      "perCapitaPPP": 10801.3,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": 0.11
    },
    {
      "year": 2022,
      "gdpPPP": 33.746,
      "perCapitaPPP": 12300.5,
      "perCapitaPPPChangePct": 13.88,
      "popChangePct": 0.11
    },
    {
      "year": 2023,
      "gdpPPP": 35.955,
      "perCapitaPPP": 13091.0,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 0.15
    },
    {
      "year": 2024,
      "gdpPPP": 36.651,
      "perCapitaPPP": 13329.1,
      "perCapitaPPPChangePct": 1.82,
      "popChangePct": 0.11
    },
    {
      "year": 2025,
      "gdpPPP": 37.668,
      "perCapitaPPP": 13683.4,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 0.11
    },
    {
      "year": 2026,
      "gdpPPP": 38.301,
      "perCapitaPPP": 13897.4,
      "perCapitaPPPChangePct": 1.56,
      "popChangePct": 0.11
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 40.372,
      "perCapitaPPP": 14632.3,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 0.11
    },
    {
      "year": 2028,
      "gdpPPP": 41.792,
      "perCapitaPPP": 15129.8,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": 0.11
    },
    {
      "year": 2029,
      "gdpPPP": 43.173,
      "perCapitaPPP": 15612.0,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 0.11
    },
    {
      "year": 2030,
      "gdpPPP": 44.626,
      "perCapitaPPP": 16119.0,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 0.14
    },
    {
      "year": 2031,
      "gdpPPP": 46.113,
      "perCapitaPPP": 16637.2,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 0.11
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function JamaicaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
