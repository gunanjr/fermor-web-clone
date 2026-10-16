import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Panama",
  "slug": "panama",
  "iso3": "PAN",
  "region": "Americas",
  "rank2026": 85,
  "flagEmoji": "🇵🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Uruguay",
      "slug": "uruguay",
      "rank": 84
    },
    {
      "name": "Tanzania",
      "slug": "tanzania",
      "rank": 86
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.759,
      "growth": 4.5,
      "perCapita": 1897.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 4.255,
      "growth": 9.2,
      "perCapita": 2096.3,
      "popChangePct": 2.42
    },
    {
      "year": 1982,
      "gdp": 4.701,
      "growth": 5.3,
      "perCapita": 2261.8,
      "popChangePct": 2.36
    },
    {
      "year": 1983,
      "gdp": 4.827,
      "growth": -4.5,
      "perCapita": 2269.2,
      "popChangePct": 2.36
    },
    {
      "year": 1984,
      "gdp": 5.038,
      "growth": 2.7,
      "perCapita": 2315.3,
      "popChangePct": 2.3
    },
    {
      "year": 1985,
      "gdp": 5.33,
      "growth": 4.9,
      "perCapita": 2395.3,
      "popChangePct": 2.25
    },
    {
      "year": 1986,
      "gdp": 5.539,
      "growth": 3.6,
      "perCapita": 2435.2,
      "popChangePct": 2.2
    },
    {
      "year": 1987,
      "gdp": 5.563,
      "growth": -1.8,
      "perCapita": 2393.7,
      "popChangePct": 2.2
    },
    {
      "year": 1988,
      "gdp": 4.809,
      "growth": -13.4,
      "perCapita": 2026.0,
      "popChangePct": 2.15
    },
    {
      "year": 1989,
      "gdp": 4.822,
      "growth": 1.6,
      "perCapita": 1989.4,
      "popChangePct": 2.11
    },
    {
      "year": 1990,
      "gdp": 5.242,
      "growth": 8.1,
      "perCapita": 2118.8,
      "popChangePct": 2.06
    },
    {
      "year": 1991,
      "gdp": 5.764,
      "growth": 9.4,
      "perCapita": 2280.7,
      "popChangePct": 2.14
    },
    {
      "year": 1992,
      "gdp": 6.553,
      "growth": 8.2,
      "perCapita": 2538.3,
      "popChangePct": 2.14
    },
    {
      "year": 1993,
      "gdp": 7.156,
      "growth": 5.5,
      "perCapita": 2714.5,
      "popChangePct": 2.13
    },
    {
      "year": 1994,
      "gdp": 7.631,
      "growth": 2.8,
      "perCapita": 2835.3,
      "popChangePct": 2.09
    },
    {
      "year": 1995,
      "gdp": 7.8,
      "growth": 1.8,
      "perCapita": 2839.7,
      "popChangePct": 2.08
    },
    {
      "year": 1996,
      "gdp": 9.198,
      "growth": 7.4,
      "perCapita": 3280.3,
      "popChangePct": 2.07
    },
    {
      "year": 1997,
      "gdp": 10.059,
      "growth": 7.7,
      "perCapita": 3515.0,
      "popChangePct": 2.07
    },
    {
      "year": 1998,
      "gdp": 11.02,
      "growth": 8.4,
      "perCapita": 3773.1,
      "popChangePct": 2.06
    },
    {
      "year": 1999,
      "gdp": 11.661,
      "growth": 5.2,
      "perCapita": 3912.9,
      "popChangePct": 2.02
    },
    {
      "year": 2000,
      "gdp": 11.966,
      "growth": 4.2,
      "perCapita": 3935.4,
      "popChangePct": 2.05
    },
    {
      "year": 2001,
      "gdp": 12.253,
      "growth": 0.9,
      "perCapita": 3949.7,
      "popChangePct": 2.01
    },
    {
      "year": 2002,
      "gdp": 12.801,
      "growth": 2.5,
      "perCapita": 4045.3,
      "popChangePct": 2.0
    },
    {
      "year": 2003,
      "gdp": 13.603,
      "growth": 5.1,
      "perCapita": 4216.1,
      "popChangePct": 1.99
    },
    {
      "year": 2004,
      "gdp": 15.1,
      "growth": 8.2,
      "perCapita": 4591.5,
      "popChangePct": 1.92
    },
    {
      "year": 2005,
      "gdp": 16.624,
      "growth": 8.3,
      "perCapita": 4960.9,
      "popChangePct": 1.89
    },
    {
      "year": 2006,
      "gdp": 18.66,
      "growth": 9.9,
      "perCapita": 5466.6,
      "popChangePct": 1.85
    },
    {
      "year": 2007,
      "gdp": 21.717,
      "growth": 13.2,
      "perCapita": 6248.3,
      "popChangePct": 1.85
    },
    {
      "year": 2008,
      "gdp": 25.721,
      "growth": 10.2,
      "perCapita": 7270.0,
      "popChangePct": 1.78
    },
    {
      "year": 2009,
      "gdp": 27.791,
      "growth": 1.6,
      "perCapita": 7719.8,
      "popChangePct": 1.75
    },
    {
      "year": 2010,
      "gdp": 30.231,
      "growth": 6.1,
      "perCapita": 8255.7,
      "popChangePct": 1.72
    },
    {
      "year": 2011,
      "gdp": 35.688,
      "growth": 11.9,
      "perCapita": 9583.6,
      "popChangePct": 1.69
    },
    {
      "year": 2012,
      "gdp": 41.595,
      "growth": 9.6,
      "perCapita": 10982.3,
      "popChangePct": 1.72
    },
    {
      "year": 2013,
      "gdp": 46.949,
      "growth": 6.3,
      "perCapita": 12192.3,
      "popChangePct": 1.66
    },
    {
      "year": 2014,
      "gdp": 51.427,
      "growth": 4.6,
      "perCapita": 13141.7,
      "popChangePct": 1.61
    },
    {
      "year": 2015,
      "gdp": 55.768,
      "growth": 5.3,
      "perCapita": 14028.2,
      "popChangePct": 1.58
    },
    {
      "year": 2016,
      "gdp": 59.761,
      "growth": 4.6,
      "perCapita": 14803.1,
      "popChangePct": 1.56
    },
    {
      "year": 2017,
      "gdp": 64.328,
      "growth": 5.7,
      "perCapita": 15696.8,
      "popChangePct": 1.51
    },
    {
      "year": 2018,
      "gdp": 67.316,
      "growth": 3.9,
      "perCapita": 16186.6,
      "popChangePct": 1.49
    },
    {
      "year": 2019,
      "gdp": 69.779,
      "growth": 3.1,
      "perCapita": 16540.0,
      "popChangePct": 1.44
    },
    {
      "year": 2020,
      "gdp": 57.06,
      "growth": -17.8,
      "perCapita": 13336.4,
      "popChangePct": 1.42
    },
    {
      "year": 2021,
      "gdp": 67.396,
      "growth": 16.5,
      "perCapita": 15538.4,
      "popChangePct": 1.36
    },
    {
      "year": 2022,
      "gdp": 76.479,
      "growth": 11,
      "perCapita": 17399.8,
      "popChangePct": 1.34
    },
    {
      "year": 2023,
      "gdp": 83.812,
      "growth": 7.2,
      "perCapita": 18822.3,
      "popChangePct": 1.32
    },
    {
      "year": 2024,
      "gdp": 86.524,
      "growth": 2.7,
      "perCapita": 19186.9,
      "popChangePct": 1.28
    },
    {
      "year": 2025,
      "gdp": 90.463,
      "growth": 4.4,
      "perCapita": 19814.1,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdp": 95.024,
      "growth": 3.8,
      "perCapita": 20563.6,
      "popChangePct": 1.2
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 101.325,
      "growth": 4.5,
      "perCapita": 21664.2,
      "popChangePct": 1.21
    },
    {
      "year": 2028,
      "gdp": 108.043,
      "growth": 4.5,
      "perCapita": 22823.6,
      "popChangePct": 1.22
    },
    {
      "year": 2029,
      "gdp": 115.443,
      "growth": 4.8,
      "perCapita": 24094.4,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdp": 123.098,
      "growth": 4.5,
      "perCapita": 25692.0,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 131.26,
      "growth": 4.5,
      "perCapita": 27395.6,
      "popChangePct": 0.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 8.806,
      "perCapitaPPP": 4443.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 10.526,
      "perCapitaPPP": 5185.8,
      "perCapitaPPPChangePct": 16.7,
      "popChangePct": 2.42
    },
    {
      "year": 1982,
      "gdpPPP": 11.775,
      "perCapitaPPP": 5665.3,
      "perCapitaPPPChangePct": 9.24,
      "popChangePct": 2.36
    },
    {
      "year": 1983,
      "gdpPPP": 11.686,
      "perCapitaPPP": 5494.2,
      "perCapitaPPPChangePct": -3.02,
      "popChangePct": 2.36
    },
    {
      "year": 1984,
      "gdpPPP": 12.436,
      "perCapitaPPP": 5715.2,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 2.3
    },
    {
      "year": 1985,
      "gdpPPP": 13.463,
      "perCapitaPPP": 6050.6,
      "perCapitaPPPChangePct": 5.87,
      "popChangePct": 2.25
    },
    {
      "year": 1986,
      "gdpPPP": 14.224,
      "perCapitaPPP": 6254.0,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.2
    },
    {
      "year": 1987,
      "gdpPPP": 14.313,
      "perCapitaPPP": 6158.9,
      "perCapitaPPPChangePct": -1.52,
      "popChangePct": 2.2
    },
    {
      "year": 1988,
      "gdpPPP": 12.835,
      "perCapitaPPP": 5407.0,
      "perCapitaPPPChangePct": -12.21,
      "popChangePct": 2.15
    },
    {
      "year": 1989,
      "gdpPPP": 13.547,
      "perCapitaPPP": 5588.9,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.11
    },
    {
      "year": 1990,
      "gdpPPP": 15.192,
      "perCapitaPPP": 6140.5,
      "perCapitaPPPChangePct": 9.87,
      "popChangePct": 2.06
    },
    {
      "year": 1991,
      "gdpPPP": 17.185,
      "perCapitaPPP": 6799.6,
      "perCapitaPPPChangePct": 10.73,
      "popChangePct": 2.14
    },
    {
      "year": 1992,
      "gdpPPP": 19.019,
      "perCapitaPPP": 7367.4,
      "perCapitaPPPChangePct": 8.35,
      "popChangePct": 2.14
    },
    {
      "year": 1993,
      "gdpPPP": 20.532,
      "perCapitaPPP": 7788.7,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": 2.13
    },
    {
      "year": 1994,
      "gdpPPP": 21.568,
      "perCapitaPPP": 8014.0,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 2.09
    },
    {
      "year": 1995,
      "gdpPPP": 22.406,
      "perCapitaPPP": 8156.6,
      "perCapitaPPPChangePct": 1.78,
      "popChangePct": 2.08
    },
    {
      "year": 1996,
      "gdpPPP": 24.498,
      "perCapitaPPP": 8737.2,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": 2.07
    },
    {
      "year": 1997,
      "gdpPPP": 26.841,
      "perCapitaPPP": 9379.5,
      "perCapitaPPPChangePct": 7.35,
      "popChangePct": 2.07
    },
    {
      "year": 1998,
      "gdpPPP": 29.42,
      "perCapitaPPP": 10073.2,
      "perCapitaPPPChangePct": 7.4,
      "popChangePct": 2.06
    },
    {
      "year": 1999,
      "gdpPPP": 31.391,
      "perCapitaPPP": 10533.5,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 2.02
    },
    {
      "year": 2000,
      "gdpPPP": 33.453,
      "perCapitaPPP": 11001.8,
      "perCapitaPPPChangePct": 4.45,
      "popChangePct": 2.05
    },
    {
      "year": 2001,
      "gdpPPP": 34.531,
      "perCapitaPPP": 11131.0,
      "perCapitaPPPChangePct": 1.17,
      "popChangePct": 2.01
    },
    {
      "year": 2002,
      "gdpPPP": 35.948,
      "perCapitaPPP": 11360.2,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 2.0
    },
    {
      "year": 2003,
      "gdpPPP": 38.526,
      "perCapitaPPP": 11940.3,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": 1.99
    },
    {
      "year": 2004,
      "gdpPPP": 42.796,
      "perCapitaPPP": 13012.9,
      "perCapitaPPPChangePct": 8.98,
      "popChangePct": 1.92
    },
    {
      "year": 2005,
      "gdpPPP": 47.791,
      "perCapitaPPP": 14261.7,
      "perCapitaPPPChangePct": 9.6,
      "popChangePct": 1.89
    },
    {
      "year": 2006,
      "gdpPPP": 54.121,
      "perCapitaPPP": 15855.5,
      "perCapitaPPPChangePct": 11.18,
      "popChangePct": 1.85
    },
    {
      "year": 2007,
      "gdpPPP": 62.899,
      "perCapitaPPP": 18096.5,
      "perCapitaPPPChangePct": 14.13,
      "popChangePct": 1.85
    },
    {
      "year": 2008,
      "gdpPPP": 70.648,
      "perCapitaPPP": 19968.4,
      "perCapitaPPPChangePct": 10.34,
      "popChangePct": 1.78
    },
    {
      "year": 2009,
      "gdpPPP": 72.229,
      "perCapitaPPP": 20063.8,
      "perCapitaPPPChangePct": 0.48,
      "popChangePct": 1.75
    },
    {
      "year": 2010,
      "gdpPPP": 77.547,
      "perCapitaPPP": 21177.2,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": 1.72
    },
    {
      "year": 2011,
      "gdpPPP": 88.573,
      "perCapitaPPP": 23785.5,
      "perCapitaPPPChangePct": 12.32,
      "popChangePct": 1.69
    },
    {
      "year": 2012,
      "gdpPPP": 98.908,
      "perCapitaPPP": 26114.3,
      "perCapitaPPPChangePct": 9.79,
      "popChangePct": 1.72
    },
    {
      "year": 2013,
      "gdpPPP": 106.953,
      "perCapitaPPP": 27774.8,
      "perCapitaPPPChangePct": 6.36,
      "popChangePct": 1.66
    },
    {
      "year": 2014,
      "gdpPPP": 113.85,
      "perCapitaPPP": 29093.2,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 1.61
    },
    {
      "year": 2015,
      "gdpPPP": 120.958,
      "perCapitaPPP": 30426.7,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": 1.58
    },
    {
      "year": 2016,
      "gdpPPP": 127.691,
      "perCapitaPPP": 31629.7,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 1.56
    },
    {
      "year": 2017,
      "gdpPPP": 137.443,
      "perCapitaPPP": 33538.0,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 1.51
    },
    {
      "year": 2018,
      "gdpPPP": 135.303,
      "perCapitaPPP": 32534.4,
      "perCapitaPPPChangePct": -2.99,
      "popChangePct": 1.49
    },
    {
      "year": 2019,
      "gdpPPP": 140.76,
      "perCapitaPPP": 33364.9,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 1.44
    },
    {
      "year": 2020,
      "gdpPPP": 115.991,
      "perCapitaPPP": 27110.2,
      "perCapitaPPPChangePct": -18.75,
      "popChangePct": 1.42
    },
    {
      "year": 2021,
      "gdpPPP": 134.415,
      "perCapitaPPP": 30989.8,
      "perCapitaPPPChangePct": 14.31,
      "popChangePct": 1.36
    },
    {
      "year": 2022,
      "gdpPPP": 159.868,
      "perCapitaPPP": 36371.6,
      "perCapitaPPPChangePct": 17.37,
      "popChangePct": 1.34
    },
    {
      "year": 2023,
      "gdpPPP": 177.664,
      "perCapitaPPP": 39899.2,
      "perCapitaPPPChangePct": 9.7,
      "popChangePct": 1.32
    },
    {
      "year": 2024,
      "gdpPPP": 187.078,
      "perCapitaPPP": 41485.0,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 1.28
    },
    {
      "year": 2025,
      "gdpPPP": 200.754,
      "perCapitaPPP": 43971.4,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdpPPP": 214.435,
      "perCapitaPPP": 46404.8,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 1.2
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 229.093,
      "perCapitaPPP": 48982.3,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": 1.21
    },
    {
      "year": 2028,
      "gdpPPP": 243.425,
      "perCapitaPPP": 51422.4,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": 1.22
    },
    {
      "year": 2029,
      "gdpPPP": 259.532,
      "perCapitaPPP": 54167.4,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 1.2
    },
    {
      "year": 2030,
      "gdpPPP": 276.3,
      "perCapitaPPP": 57667.1,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 294.058,
      "perCapitaPPP": 61373.5,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 0.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function PanamaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
