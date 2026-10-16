import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Botswana",
  "slug": "botswana",
  "iso3": "BWA",
  "region": "Africa",
  "rank2026": 134,
  "flagEmoji": "🇧🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Jamaica",
      "slug": "jamaica",
      "rank": 133
    },
    {
      "name": "Moldova",
      "slug": "moldova",
      "rank": 135
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.174,
      "growth": 12,
      "perCapita": 1255.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.037,
      "growth": 8.2,
      "perCapita": 1088.3,
      "popChangePct": 1.93
    },
    {
      "year": 1982,
      "gdp": 1.094,
      "growth": 15.9,
      "perCapita": 1107.3,
      "popChangePct": 3.67
    },
    {
      "year": 1983,
      "gdp": 1.208,
      "growth": 10.8,
      "perCapita": 1179.9,
      "popChangePct": 3.64
    },
    {
      "year": 1984,
      "gdp": 1.2,
      "growth": 6.5,
      "perCapita": 1130.0,
      "popChangePct": 3.71
    },
    {
      "year": 1985,
      "gdp": 1.117,
      "growth": 7.7,
      "perCapita": 1014.5,
      "popChangePct": 3.67
    },
    {
      "year": 1986,
      "gdp": 1.515,
      "growth": 8.6,
      "perCapita": 1326.8,
      "popChangePct": 3.72
    },
    {
      "year": 1987,
      "gdp": 2.374,
      "growth": 14.9,
      "perCapita": 2005.2,
      "popChangePct": 3.68
    },
    {
      "year": 1988,
      "gdp": 3.082,
      "growth": 23.4,
      "perCapita": 2511.5,
      "popChangePct": 3.63
    },
    {
      "year": 1989,
      "gdp": 3.441,
      "growth": 4.7,
      "perCapita": 2705.8,
      "popChangePct": 3.67
    },
    {
      "year": 1990,
      "gdp": 3.799,
      "growth": 8.8,
      "perCapita": 2880.2,
      "popChangePct": 3.69
    },
    {
      "year": 1991,
      "gdp": 3.802,
      "growth": 6.2,
      "perCapita": 2799.4,
      "popChangePct": 2.96
    },
    {
      "year": 1992,
      "gdp": 3.928,
      "growth": -0.2,
      "perCapita": 2810.5,
      "popChangePct": 2.95
    },
    {
      "year": 1993,
      "gdp": 3.957,
      "growth": 4,
      "perCapita": 2753.5,
      "popChangePct": 2.79
    },
    {
      "year": 1994,
      "gdp": 4.258,
      "growth": -0.8,
      "perCapita": 2885.4,
      "popChangePct": 2.71
    },
    {
      "year": 1995,
      "gdp": 4.805,
      "growth": 8.5,
      "perCapita": 3176.0,
      "popChangePct": 2.51
    },
    {
      "year": 1996,
      "gdp": 4.926,
      "growth": 2.5,
      "perCapita": 3179.2,
      "popChangePct": 2.38
    },
    {
      "year": 1997,
      "gdp": 5.011,
      "growth": 7.1,
      "perCapita": 3162.5,
      "popChangePct": 2.26
    },
    {
      "year": 1998,
      "gdp": 4.808,
      "growth": -1.6,
      "perCapita": 2971.6,
      "popChangePct": 2.15
    },
    {
      "year": 1999,
      "gdp": 5.413,
      "growth": 8,
      "perCapita": 3282.8,
      "popChangePct": 1.92
    },
    {
      "year": 2000,
      "gdp": 5.682,
      "growth": 4.3,
      "perCapita": 3387.6,
      "popChangePct": 1.7
    },
    {
      "year": 2001,
      "gdp": 5.46,
      "growth": 2.3,
      "perCapita": 3189.0,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdp": 5.395,
      "growth": 7.4,
      "perCapita": 3092.3,
      "popChangePct": 1.93
    },
    {
      "year": 2003,
      "gdp": 7.469,
      "growth": 5.4,
      "perCapita": 4206.2,
      "popChangePct": 1.78
    },
    {
      "year": 2004,
      "gdp": 8.819,
      "growth": 1.4,
      "perCapita": 4880.0,
      "popChangePct": 1.75
    },
    {
      "year": 2005,
      "gdp": 9.833,
      "growth": 5,
      "perCapita": 5344.1,
      "popChangePct": 1.83
    },
    {
      "year": 2006,
      "gdp": 9.919,
      "growth": 6,
      "perCapita": 5291.6,
      "popChangePct": 1.9
    },
    {
      "year": 2007,
      "gdp": 10.566,
      "growth": 5.8,
      "perCapita": 5528.6,
      "popChangePct": 1.92
    },
    {
      "year": 2008,
      "gdp": 10.731,
      "growth": 3.3,
      "perCapita": 5503.1,
      "popChangePct": 2.04
    },
    {
      "year": 2009,
      "gdp": 10.118,
      "growth": -14.1,
      "perCapita": 5082.9,
      "popChangePct": 2.1
    },
    {
      "year": 2010,
      "gdp": 12.637,
      "growth": 10.1,
      "perCapita": 6215.7,
      "popChangePct": 2.11
    },
    {
      "year": 2011,
      "gdp": 15.111,
      "growth": 6.8,
      "perCapita": 7287.4,
      "popChangePct": 2.02
    },
    {
      "year": 2012,
      "gdp": 13.907,
      "growth": -0.2,
      "perCapita": 6595.5,
      "popChangePct": 1.69
    },
    {
      "year": 2013,
      "gdp": 14.272,
      "growth": 11.1,
      "perCapita": 6666.9,
      "popChangePct": 1.52
    },
    {
      "year": 2014,
      "gdp": 15.47,
      "growth": 5.7,
      "perCapita": 7122.4,
      "popChangePct": 1.45
    },
    {
      "year": 2015,
      "gdp": 13.531,
      "growth": -4.9,
      "perCapita": 6141.2,
      "popChangePct": 1.43
    },
    {
      "year": 2016,
      "gdp": 15.083,
      "growth": 7.2,
      "perCapita": 6749.1,
      "popChangePct": 1.45
    },
    {
      "year": 2017,
      "gdp": 16.105,
      "growth": 4.1,
      "perCapita": 7105.0,
      "popChangePct": 1.43
    },
    {
      "year": 2018,
      "gdp": 17.032,
      "growth": 4.2,
      "perCapita": 7408.0,
      "popChangePct": 1.41
    },
    {
      "year": 2019,
      "gdp": 16.696,
      "growth": 3,
      "perCapita": 7159.3,
      "popChangePct": 1.44
    },
    {
      "year": 2020,
      "gdp": 14.93,
      "growth": -8.7,
      "perCapita": 6310.5,
      "popChangePct": 1.46
    },
    {
      "year": 2021,
      "gdp": 18.75,
      "growth": 11.9,
      "perCapita": 7807.9,
      "popChangePct": 1.48
    },
    {
      "year": 2022,
      "gdp": 20.321,
      "growth": 5.5,
      "perCapita": 8328.7,
      "popChangePct": 1.62
    },
    {
      "year": 2023,
      "gdp": 19.411,
      "growth": 3.2,
      "perCapita": 7826.4,
      "popChangePct": 1.64
    },
    {
      "year": 2024,
      "gdp": 19.356,
      "growth": -3,
      "perCapita": 7677.6,
      "popChangePct": 1.65
    },
    {
      "year": 2025,
      "gdp": 19.533,
      "growth": -0.9,
      "perCapita": 7662.3,
      "popChangePct": 1.11
    },
    {
      "year": 2026,
      "gdp": 21.937,
      "growth": 4.7,
      "perCapita": 8489.6,
      "popChangePct": 1.37
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 23.661,
      "growth": 2.2,
      "perCapita": 9035.2,
      "popChangePct": 1.35
    },
    {
      "year": 2028,
      "gdp": 25.4,
      "growth": 3,
      "perCapita": 9571.2,
      "popChangePct": 1.34
    },
    {
      "year": 2029,
      "gdp": 28.042,
      "growth": 3.9,
      "perCapita": 10428.7,
      "popChangePct": 1.32
    },
    {
      "year": 2030,
      "gdp": 30.928,
      "growth": 3.9,
      "perCapita": 11353.9,
      "popChangePct": 1.3
    },
    {
      "year": 2031,
      "gdp": 33.58,
      "growth": 4,
      "perCapita": 12170.3,
      "popChangePct": 1.28
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.935,
      "perCapitaPPP": 2068.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.29,
      "perCapitaPPP": 2404.5,
      "perCapitaPPPChangePct": 16.24,
      "popChangePct": 1.93
    },
    {
      "year": 1982,
      "gdpPPP": 2.818,
      "perCapitaPPP": 2853.0,
      "perCapitaPPPChangePct": 18.65,
      "popChangePct": 3.67
    },
    {
      "year": 1983,
      "gdpPPP": 3.244,
      "perCapitaPPP": 3167.7,
      "perCapitaPPPChangePct": 11.03,
      "popChangePct": 3.64
    },
    {
      "year": 1984,
      "gdpPPP": 3.581,
      "perCapitaPPP": 3371.3,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 3.71
    },
    {
      "year": 1985,
      "gdpPPP": 3.978,
      "perCapitaPPP": 3612.3,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 3.67
    },
    {
      "year": 1986,
      "gdpPPP": 4.408,
      "perCapitaPPP": 3860.4,
      "perCapitaPPPChangePct": 6.87,
      "popChangePct": 3.72
    },
    {
      "year": 1987,
      "gdpPPP": 5.19,
      "perCapitaPPP": 4384.2,
      "perCapitaPPPChangePct": 13.57,
      "popChangePct": 3.68
    },
    {
      "year": 1988,
      "gdpPPP": 6.631,
      "perCapitaPPP": 5404.3,
      "perCapitaPPPChangePct": 23.27,
      "popChangePct": 3.63
    },
    {
      "year": 1989,
      "gdpPPP": 7.212,
      "perCapitaPPP": 5672.1,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 3.67
    },
    {
      "year": 1990,
      "gdpPPP": 8.14,
      "perCapitaPPP": 6171.1,
      "perCapitaPPPChangePct": 8.8,
      "popChangePct": 3.69
    },
    {
      "year": 1991,
      "gdpPPP": 8.94,
      "perCapitaPPP": 6581.6,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 2.96
    },
    {
      "year": 1992,
      "gdpPPP": 9.125,
      "perCapitaPPP": 6527.9,
      "perCapitaPPPChangePct": -0.82,
      "popChangePct": 2.95
    },
    {
      "year": 1993,
      "gdpPPP": 9.717,
      "perCapitaPPP": 6761.9,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 2.79
    },
    {
      "year": 1994,
      "gdpPPP": 9.847,
      "perCapitaPPP": 6673.1,
      "perCapitaPPPChangePct": -1.31,
      "popChangePct": 2.71
    },
    {
      "year": 1995,
      "gdpPPP": 10.903,
      "perCapitaPPP": 7206.2,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": 2.51
    },
    {
      "year": 1996,
      "gdpPPP": 11.376,
      "perCapitaPPP": 7342.8,
      "perCapitaPPPChangePct": 1.9,
      "popChangePct": 2.38
    },
    {
      "year": 1997,
      "gdpPPP": 12.395,
      "perCapitaPPP": 7822.7,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 2.26
    },
    {
      "year": 1998,
      "gdpPPP": 12.331,
      "perCapitaPPP": 7621.5,
      "perCapitaPPPChangePct": -2.57,
      "popChangePct": 2.15
    },
    {
      "year": 1999,
      "gdpPPP": 13.51,
      "perCapitaPPP": 8192.9,
      "perCapitaPPPChangePct": 7.5,
      "popChangePct": 1.92
    },
    {
      "year": 2000,
      "gdpPPP": 14.406,
      "perCapitaPPP": 8588.5,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 1.7
    },
    {
      "year": 2001,
      "gdpPPP": 15.076,
      "perCapitaPPP": 8805.0,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdpPPP": 16.449,
      "perCapitaPPP": 9427.6,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 1.93
    },
    {
      "year": 2003,
      "gdpPPP": 17.677,
      "perCapitaPPP": 9954.9,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 1.78
    },
    {
      "year": 2004,
      "gdpPPP": 18.406,
      "perCapitaPPP": 10185.3,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 1.75
    },
    {
      "year": 2005,
      "gdpPPP": 19.927,
      "perCapitaPPP": 10830.8,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 1.83
    },
    {
      "year": 2006,
      "gdpPPP": 21.781,
      "perCapitaPPP": 11619.8,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 1.9
    },
    {
      "year": 2007,
      "gdpPPP": 23.667,
      "perCapitaPPP": 12383.6,
      "perCapitaPPPChangePct": 6.57,
      "popChangePct": 1.92
    },
    {
      "year": 2008,
      "gdpPPP": 24.908,
      "perCapitaPPP": 12773.5,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 2.04
    },
    {
      "year": 2009,
      "gdpPPP": 21.517,
      "perCapitaPPP": 10808.8,
      "perCapitaPPPChangePct": -15.38,
      "popChangePct": 2.1
    },
    {
      "year": 2010,
      "gdpPPP": 23.983,
      "perCapitaPPP": 11796.1,
      "perCapitaPPPChangePct": 9.13,
      "popChangePct": 2.11
    },
    {
      "year": 2011,
      "gdpPPP": 26.151,
      "perCapitaPPP": 12612.0,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 2.02
    },
    {
      "year": 2012,
      "gdpPPP": 26.593,
      "perCapitaPPP": 12611.5,
      "perCapitaPPPChangePct": -0.0,
      "popChangePct": 1.69
    },
    {
      "year": 2013,
      "gdpPPP": 30.048,
      "perCapitaPPP": 14036.8,
      "perCapitaPPPChangePct": 11.3,
      "popChangePct": 1.52
    },
    {
      "year": 2014,
      "gdpPPP": 32.313,
      "perCapitaPPP": 14876.9,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": 1.45
    },
    {
      "year": 2015,
      "gdpPPP": 31.031,
      "perCapitaPPP": 14084.1,
      "perCapitaPPPChangePct": -5.33,
      "popChangePct": 1.43
    },
    {
      "year": 2016,
      "gdpPPP": 33.582,
      "perCapitaPPP": 15027.0,
      "perCapitaPPPChangePct": 6.69,
      "popChangePct": 1.45
    },
    {
      "year": 2017,
      "gdpPPP": 35.589,
      "perCapitaPPP": 15700.7,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 1.43
    },
    {
      "year": 2018,
      "gdpPPP": 36.294,
      "perCapitaPPP": 15785.8,
      "perCapitaPPPChangePct": 0.54,
      "popChangePct": 1.41
    },
    {
      "year": 2019,
      "gdpPPP": 37.153,
      "perCapitaPPP": 15931.5,
      "perCapitaPPPChangePct": 0.92,
      "popChangePct": 1.44
    },
    {
      "year": 2020,
      "gdpPPP": 36.107,
      "perCapitaPPP": 15261.4,
      "perCapitaPPPChangePct": -4.21,
      "popChangePct": 1.46
    },
    {
      "year": 2021,
      "gdpPPP": 43.131,
      "perCapitaPPP": 17960.6,
      "perCapitaPPPChangePct": 17.69,
      "popChangePct": 1.48
    },
    {
      "year": 2022,
      "gdpPPP": 48.734,
      "perCapitaPPP": 19973.7,
      "perCapitaPPPChangePct": 11.21,
      "popChangePct": 1.62
    },
    {
      "year": 2023,
      "gdpPPP": 52.158,
      "perCapitaPPP": 21029.4,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 1.64
    },
    {
      "year": 2024,
      "gdpPPP": 51.855,
      "perCapitaPPP": 20567.9,
      "perCapitaPPPChangePct": -2.19,
      "popChangePct": 1.65
    },
    {
      "year": 2025,
      "gdpPPP": 52.853,
      "perCapitaPPP": 20732.4,
      "perCapitaPPPChangePct": 0.8,
      "popChangePct": 1.11
    },
    {
      "year": 2026,
      "gdpPPP": 56.949,
      "perCapitaPPP": 22039.5,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 1.37
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 59.495,
      "perCapitaPPP": 22718.4,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.35
    },
    {
      "year": 2028,
      "gdpPPP": 62.262,
      "perCapitaPPP": 23461.2,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 1.34
    },
    {
      "year": 2029,
      "gdpPPP": 65.861,
      "perCapitaPPP": 24493.6,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 1.32
    },
    {
      "year": 2030,
      "gdpPPP": 69.72,
      "perCapitaPPP": 25594.5,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 1.3
    },
    {
      "year": 2031,
      "gdpPPP": 73.789,
      "perCapitaPPP": 26743.3,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 1.28
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BotswanaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
