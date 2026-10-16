import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Equatorial Guinea",
  "slug": "equatorial-guinea",
  "iso3": "GNQ",
  "region": "Africa",
  "rank2026": 152,
  "flagEmoji": "🇬🇶",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Somalia",
      "slug": "somalia",
      "rank": 151
    },
    {
      "name": "State of Palestine",
      "slug": "state-of-palestine",
      "rank": 153
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.032,
      "growth": 4.8,
      "perCapita": 123.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.03,
      "growth": 5.8,
      "perCapita": 109.8,
      "popChangePct": 5.88
    },
    {
      "year": 1982,
      "gdp": 0.035,
      "growth": 2.2,
      "perCapita": 121.3,
      "popChangePct": 7.78
    },
    {
      "year": 1983,
      "gdp": 0.04,
      "growth": 5,
      "perCapita": 126.4,
      "popChangePct": 7.9
    },
    {
      "year": 1984,
      "gdp": 0.044,
      "growth": 1,
      "perCapita": 130.1,
      "popChangePct": 7.64
    },
    {
      "year": 1985,
      "gdp": 0.074,
      "growth": 12.9,
      "perCapita": 205.7,
      "popChangePct": 6.21
    },
    {
      "year": 1986,
      "gdp": 0.091,
      "growth": -2.3,
      "perCapita": 241.4,
      "popChangePct": 4.74
    },
    {
      "year": 1987,
      "gdp": 0.111,
      "growth": 4.4,
      "perCapita": 284.3,
      "popChangePct": 3.72
    },
    {
      "year": 1988,
      "gdp": 0.119,
      "growth": 2.7,
      "perCapita": 296.9,
      "popChangePct": 3.08
    },
    {
      "year": 1989,
      "gdp": 0.105,
      "growth": -1.2,
      "perCapita": 253.2,
      "popChangePct": 2.99
    },
    {
      "year": 1990,
      "gdp": 0.133,
      "growth": 2.5,
      "perCapita": 312.1,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdp": 0.132,
      "growth": -1.2,
      "perCapita": 299.1,
      "popChangePct": 3.28
    },
    {
      "year": 1992,
      "gdp": 0.16,
      "growth": 33,
      "perCapita": 351.7,
      "popChangePct": 3.17
    },
    {
      "year": 1993,
      "gdp": 0.162,
      "growth": 10.5,
      "perCapita": 343.5,
      "popChangePct": 3.52
    },
    {
      "year": 1994,
      "gdp": 0.12,
      "growth": 16.8,
      "perCapita": 245.9,
      "popChangePct": 3.4
    },
    {
      "year": 1995,
      "gdp": 0.169,
      "growth": 26.5,
      "perCapita": 333.8,
      "popChangePct": 3.7
    },
    {
      "year": 1996,
      "gdp": 0.276,
      "growth": 52.7,
      "perCapita": 527.1,
      "popChangePct": 3.76
    },
    {
      "year": 1997,
      "gdp": 0.526,
      "growth": 148,
      "perCapita": 965.0,
      "popChangePct": 4.01
    },
    {
      "year": 1998,
      "gdp": 0.44,
      "growth": 24.8,
      "perCapita": 777.3,
      "popChangePct": 4.04
    },
    {
      "year": 1999,
      "gdp": 0.738,
      "growth": 26.4,
      "perCapita": 1251.5,
      "popChangePct": 4.06
    },
    {
      "year": 2000,
      "gdp": 1.159,
      "growth": 110.5,
      "perCapita": 1886.0,
      "popChangePct": 4.07
    },
    {
      "year": 2001,
      "gdp": 1.674,
      "growth": 60,
      "perCapita": 2616.5,
      "popChangePct": 4.23
    },
    {
      "year": 2002,
      "gdp": 2.07,
      "growth": 19.6,
      "perCapita": 3105.7,
      "popChangePct": 4.06
    },
    {
      "year": 2003,
      "gdp": 3.733,
      "growth": 14.5,
      "perCapita": 5373.6,
      "popChangePct": 4.35
    },
    {
      "year": 2004,
      "gdp": 5.935,
      "growth": 30.4,
      "perCapita": 8187.8,
      "popChangePct": 4.32
    },
    {
      "year": 2005,
      "gdp": 8.191,
      "growth": 8.2,
      "perCapita": 10816.4,
      "popChangePct": 4.41
    },
    {
      "year": 2006,
      "gdp": 10.096,
      "growth": 6.5,
      "perCapita": 12744.0,
      "popChangePct": 4.62
    },
    {
      "year": 2007,
      "gdp": 13.091,
      "growth": 15.3,
      "perCapita": 15784.5,
      "popChangePct": 4.67
    },
    {
      "year": 2008,
      "gdp": 19.828,
      "growth": 17.8,
      "perCapita": 22831.9,
      "popChangePct": 4.7
    },
    {
      "year": 2009,
      "gdp": 15.072,
      "growth": 1.3,
      "perCapita": 16578.7,
      "popChangePct": 4.72
    },
    {
      "year": 2010,
      "gdp": 16.328,
      "growth": -8.9,
      "perCapita": 17167.2,
      "popChangePct": 4.62
    },
    {
      "year": 2011,
      "gdp": 21.354,
      "growth": 6.5,
      "perCapita": 21476.2,
      "popChangePct": 4.52
    },
    {
      "year": 2012,
      "gdp": 22.403,
      "growth": 8.3,
      "perCapita": 21570.1,
      "popChangePct": 4.53
    },
    {
      "year": 2013,
      "gdp": 21.949,
      "growth": -4.1,
      "perCapita": 20253.0,
      "popChangePct": 4.33
    },
    {
      "year": 2014,
      "gdp": 21.771,
      "growth": 0.4,
      "perCapita": 19276.3,
      "popChangePct": 4.15
    },
    {
      "year": 2015,
      "gdp": 13.187,
      "growth": -9.1,
      "perCapita": 11219.1,
      "popChangePct": 4.07
    },
    {
      "year": 2016,
      "gdp": 11.238,
      "growth": -8.8,
      "perCapita": 9200,
      "popChangePct": 3.91
    },
    {
      "year": 2017,
      "gdp": 12.197,
      "growth": -5.7,
      "perCapita": 9621.1,
      "popChangePct": 3.85
    },
    {
      "year": 2018,
      "gdp": 13.309,
      "growth": -6.2,
      "perCapita": 10129.6,
      "popChangePct": 3.63
    },
    {
      "year": 2019,
      "gdp": 11.365,
      "growth": -5.5,
      "perCapita": 8355.7,
      "popChangePct": 3.5
    },
    {
      "year": 2020,
      "gdp": 9.908,
      "growth": -4.8,
      "perCapita": 7045.6,
      "popChangePct": 3.38
    },
    {
      "year": 2021,
      "gdp": 12.222,
      "growth": 0.9,
      "perCapita": 8415.5,
      "popChangePct": 3.27
    },
    {
      "year": 2022,
      "gdp": 13.717,
      "growth": 3.2,
      "perCapita": 9155.2,
      "popChangePct": 3.17
    },
    {
      "year": 2023,
      "gdp": 12.339,
      "growth": -5.1,
      "perCapita": 7990.8,
      "popChangePct": 3.07
    },
    {
      "year": 2024,
      "gdp": 12.769,
      "growth": 0.9,
      "perCapita": 8029.1,
      "popChangePct": 2.98
    },
    {
      "year": 2025,
      "gdp": 12.484,
      "growth": -6.4,
      "perCapita": 7627.6,
      "popChangePct": 2.96
    },
    {
      "year": 2026,
      "gdp": 13.722,
      "growth": -2.7,
      "perCapita": 8151.6,
      "popChangePct": 2.81
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 13.504,
      "growth": -1.3,
      "perCapita": 7804.9,
      "popChangePct": 2.79
    },
    {
      "year": 2028,
      "gdp": 13.625,
      "growth": 1.1,
      "perCapita": 7665.8,
      "popChangePct": 2.72
    },
    {
      "year": 2029,
      "gdp": 14.192,
      "growth": 2.1,
      "perCapita": 7779.2,
      "popChangePct": 2.64
    },
    {
      "year": 2030,
      "gdp": 14.982,
      "growth": 2.4,
      "perCapita": 8006.6,
      "popChangePct": 2.58
    },
    {
      "year": 2031,
      "gdp": 15.727,
      "growth": 2.5,
      "perCapita": 8200.8,
      "popChangePct": 2.51
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.086,
      "perCapitaPPP": 334.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.099,
      "perCapitaPPP": 366.6,
      "perCapitaPPPChangePct": 9.46,
      "popChangePct": 5.88
    },
    {
      "year": 1982,
      "gdpPPP": 0.107,
      "perCapitaPPP": 369.7,
      "perCapitaPPPChangePct": 0.84,
      "popChangePct": 7.78
    },
    {
      "year": 1983,
      "gdpPPP": 0.117,
      "perCapitaPPP": 372.8,
      "perCapitaPPPChangePct": 0.84,
      "popChangePct": 7.9
    },
    {
      "year": 1984,
      "gdpPPP": 0.123,
      "perCapitaPPP": 362.9,
      "perCapitaPPPChangePct": -2.65,
      "popChangePct": 7.64
    },
    {
      "year": 1985,
      "gdpPPP": 0.143,
      "perCapitaPPP": 398.2,
      "perCapitaPPPChangePct": 9.72,
      "popChangePct": 6.21
    },
    {
      "year": 1986,
      "gdpPPP": 0.142,
      "perCapitaPPP": 378.7,
      "perCapitaPPPChangePct": -4.9,
      "popChangePct": 4.74
    },
    {
      "year": 1987,
      "gdpPPP": 0.152,
      "perCapitaPPP": 390.6,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 3.72
    },
    {
      "year": 1988,
      "gdpPPP": 0.162,
      "perCapitaPPP": 402.6,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 3.08
    },
    {
      "year": 1989,
      "gdpPPP": 0.166,
      "perCapitaPPP": 401.4,
      "perCapitaPPPChangePct": -0.28,
      "popChangePct": 2.99
    },
    {
      "year": 1990,
      "gdpPPP": 0.177,
      "perCapitaPPP": 414.3,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdpPPP": 0.181,
      "perCapitaPPP": 409.7,
      "perCapitaPPPChangePct": -1.1,
      "popChangePct": 3.28
    },
    {
      "year": 1992,
      "gdpPPP": 0.246,
      "perCapitaPPP": 539.6,
      "perCapitaPPPChangePct": 31.69,
      "popChangePct": 3.17
    },
    {
      "year": 1993,
      "gdpPPP": 0.278,
      "perCapitaPPP": 590.1,
      "perCapitaPPPChangePct": 9.36,
      "popChangePct": 3.52
    },
    {
      "year": 1994,
      "gdpPPP": 0.331,
      "perCapitaPPP": 680.1,
      "perCapitaPPPChangePct": 15.25,
      "popChangePct": 3.4
    },
    {
      "year": 1995,
      "gdpPPP": 0.428,
      "perCapitaPPP": 847.6,
      "perCapitaPPPChangePct": 24.63,
      "popChangePct": 3.7
    },
    {
      "year": 1996,
      "gdpPPP": 0.665,
      "perCapitaPPP": 1269.7,
      "perCapitaPPPChangePct": 49.8,
      "popChangePct": 3.76
    },
    {
      "year": 1997,
      "gdpPPP": 1.678,
      "perCapitaPPP": 3081.5,
      "perCapitaPPPChangePct": 142.69,
      "popChangePct": 4.01
    },
    {
      "year": 1998,
      "gdpPPP": 2.118,
      "perCapitaPPP": 3738.1,
      "perCapitaPPPChangePct": 21.31,
      "popChangePct": 4.04
    },
    {
      "year": 1999,
      "gdpPPP": 2.715,
      "perCapitaPPP": 4602.7,
      "perCapitaPPPChangePct": 23.13,
      "popChangePct": 4.06
    },
    {
      "year": 2000,
      "gdpPPP": 5.845,
      "perCapitaPPP": 9515.1,
      "perCapitaPPPChangePct": 106.73,
      "popChangePct": 4.07
    },
    {
      "year": 2001,
      "gdpPPP": 9.564,
      "perCapitaPPP": 14950.1,
      "perCapitaPPPChangePct": 57.12,
      "popChangePct": 4.23
    },
    {
      "year": 2002,
      "gdpPPP": 11.619,
      "perCapitaPPP": 17435.2,
      "perCapitaPPPChangePct": 16.62,
      "popChangePct": 4.06
    },
    {
      "year": 2003,
      "gdpPPP": 13.561,
      "perCapitaPPP": 19523.2,
      "perCapitaPPPChangePct": 11.98,
      "popChangePct": 4.35
    },
    {
      "year": 2004,
      "gdpPPP": 18.158,
      "perCapitaPPP": 25051.7,
      "perCapitaPPPChangePct": 28.32,
      "popChangePct": 4.32
    },
    {
      "year": 2005,
      "gdpPPP": 20.265,
      "perCapitaPPP": 26758.7,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 4.41
    },
    {
      "year": 2006,
      "gdpPPP": 22.248,
      "perCapitaPPP": 28083.0,
      "perCapitaPPPChangePct": 4.95,
      "popChangePct": 4.62
    },
    {
      "year": 2007,
      "gdpPPP": 26.343,
      "perCapitaPPP": 31763.8,
      "perCapitaPPPChangePct": 13.11,
      "popChangePct": 4.67
    },
    {
      "year": 2008,
      "gdpPPP": 31.629,
      "perCapitaPPP": 36421.6,
      "perCapitaPPPChangePct": 14.66,
      "popChangePct": 4.7
    },
    {
      "year": 2009,
      "gdpPPP": 32.252,
      "perCapitaPPP": 35476.1,
      "perCapitaPPPChangePct": -2.6,
      "popChangePct": 4.72
    },
    {
      "year": 2010,
      "gdpPPP": 29.731,
      "perCapitaPPP": 31259.0,
      "perCapitaPPPChangePct": -11.89,
      "popChangePct": 4.62
    },
    {
      "year": 2011,
      "gdpPPP": 32.324,
      "perCapitaPPP": 32509.2,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 4.52
    },
    {
      "year": 2012,
      "gdpPPP": 35.662,
      "perCapitaPPP": 34337.3,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 4.53
    },
    {
      "year": 2013,
      "gdpPPP": 34.77,
      "perCapitaPPP": 32083.5,
      "perCapitaPPPChangePct": -6.56,
      "popChangePct": 4.33
    },
    {
      "year": 2014,
      "gdpPPP": 35.523,
      "perCapitaPPP": 31452.1,
      "perCapitaPPPChangePct": -1.97,
      "popChangePct": 4.15
    },
    {
      "year": 2015,
      "gdpPPP": 32.586,
      "perCapitaPPP": 27723.8,
      "perCapitaPPPChangePct": -11.85,
      "popChangePct": 4.07
    },
    {
      "year": 2016,
      "gdpPPP": 29.996,
      "perCapitaPPP": 24556.6,
      "perCapitaPPPChangePct": -11.42,
      "popChangePct": 3.91
    },
    {
      "year": 2017,
      "gdpPPP": 28.802,
      "perCapitaPPP": 22720.4,
      "perCapitaPPPChangePct": -7.48,
      "popChangePct": 3.85
    },
    {
      "year": 2018,
      "gdpPPP": 30.232,
      "perCapitaPPP": 23009.5,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 3.63
    },
    {
      "year": 2019,
      "gdpPPP": 27.477,
      "perCapitaPPP": 20201.9,
      "perCapitaPPPChangePct": -12.2,
      "popChangePct": 3.5
    },
    {
      "year": 2020,
      "gdpPPP": 23.476,
      "perCapitaPPP": 16693.9,
      "perCapitaPPPChangePct": -17.36,
      "popChangePct": 3.38
    },
    {
      "year": 2021,
      "gdpPPP": 29.585,
      "perCapitaPPP": 20370.7,
      "perCapitaPPPChangePct": 22.02,
      "popChangePct": 3.27
    },
    {
      "year": 2022,
      "gdpPPP": 32.711,
      "perCapitaPPP": 21832.3,
      "perCapitaPPPChangePct": 7.18,
      "popChangePct": 3.17
    },
    {
      "year": 2023,
      "gdpPPP": 32.195,
      "perCapitaPPP": 20849.0,
      "perCapitaPPPChangePct": -4.5,
      "popChangePct": 3.07
    },
    {
      "year": 2024,
      "gdpPPP": 33.285,
      "perCapitaPPP": 20930.4,
      "perCapitaPPPChangePct": 0.39,
      "popChangePct": 2.98
    },
    {
      "year": 2025,
      "gdpPPP": 32.053,
      "perCapitaPPP": 19584.9,
      "perCapitaPPPChangePct": -6.43,
      "popChangePct": 2.96
    },
    {
      "year": 2026,
      "gdpPPP": 32.086,
      "perCapitaPPP": 19061.2,
      "perCapitaPPPChangePct": -2.67,
      "popChangePct": 2.81
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 32.352,
      "perCapitaPPP": 18697.5,
      "perCapitaPPPChangePct": -1.91,
      "popChangePct": 2.79
    },
    {
      "year": 2028,
      "gdpPPP": 33.246,
      "perCapitaPPP": 18705.3,
      "perCapitaPPPChangePct": 0.04,
      "popChangePct": 2.72
    },
    {
      "year": 2029,
      "gdpPPP": 34.546,
      "perCapitaPPP": 18935.6,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": 2.64
    },
    {
      "year": 2030,
      "gdpPPP": 36.023,
      "perCapitaPPP": 19250.9,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 2.58
    },
    {
      "year": 2031,
      "gdpPPP": 37.604,
      "perCapitaPPP": 19607.8,
      "perCapitaPPPChangePct": 1.85,
      "popChangePct": 2.51
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function EquatorialGuineaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
