import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Qatar",
  "slug": "qatar",
  "iso3": "QAT",
  "region": "Asia",
  "rank2026": 58,
  "flagEmoji": "🇶🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Ukraine",
      "slug": "ukraine",
      "rank": 57
    },
    {
      "name": "Morocco",
      "slug": "morocco",
      "rank": 60
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 6.665,
      "growth": -1,
      "perCapita": 27242.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 7.374,
      "growth": -3.9,
      "perCapita": 27819.6,
      "popChangePct": 8.16
    },
    {
      "year": 1982,
      "gdp": 6.467,
      "growth": -8.2,
      "perCapita": 22657.4,
      "popChangePct": 7.55
    },
    {
      "year": 1983,
      "gdp": 5.506,
      "growth": -5.3,
      "perCapita": 18003.8,
      "popChangePct": 7.37
    },
    {
      "year": 1984,
      "gdp": 5.708,
      "growth": 16,
      "perCapita": 17496.5,
      "popChangePct": 6.54
    },
    {
      "year": 1985,
      "gdp": 5.339,
      "growth": -13,
      "perCapita": 15495.7,
      "popChangePct": 5.83
    },
    {
      "year": 1986,
      "gdp": 4.214,
      "growth": 3.7,
      "perCapita": 11644.5,
      "popChangePct": 4.93
    },
    {
      "year": 1987,
      "gdp": 4.441,
      "growth": 0.9,
      "perCapita": 11773.2,
      "popChangePct": 4.14
    },
    {
      "year": 1988,
      "gdp": 4.26,
      "growth": 4.7,
      "perCapita": 10853.9,
      "popChangePct": 3.98
    },
    {
      "year": 1989,
      "gdp": 4.502,
      "growth": 5.3,
      "perCapita": 11039.9,
      "popChangePct": 4.08
    },
    {
      "year": 1990,
      "gdp": 6.266,
      "growth": -14.6,
      "perCapita": 13150.2,
      "popChangePct": 16.91
    },
    {
      "year": 1991,
      "gdp": 5.579,
      "growth": -1.5,
      "perCapita": 11500.5,
      "popChangePct": 1.68
    },
    {
      "year": 1992,
      "gdp": 6.384,
      "growth": 10.4,
      "perCapita": 13039.0,
      "popChangePct": 1.03
    },
    {
      "year": 1993,
      "gdp": 5.804,
      "growth": -0.9,
      "perCapita": 11797.2,
      "popChangePct": 0.41
    },
    {
      "year": 1994,
      "gdp": 5.946,
      "growth": 1.9,
      "perCapita": 12009.4,
      "popChangePct": 0.61
    },
    {
      "year": 1995,
      "gdp": 6.861,
      "growth": 0.4,
      "perCapita": 13689.7,
      "popChangePct": 1.21
    },
    {
      "year": 1996,
      "gdp": 7.761,
      "growth": 4.2,
      "perCapita": 15143.5,
      "popChangePct": 2.2
    },
    {
      "year": 1997,
      "gdp": 9.976,
      "growth": 27.7,
      "perCapita": 18841.6,
      "popChangePct": 3.32
    },
    {
      "year": 1998,
      "gdp": 8.488,
      "growth": 10.3,
      "perCapita": 15421.8,
      "popChangePct": 3.97
    },
    {
      "year": 1999,
      "gdp": 11.266,
      "growth": 3.8,
      "perCapita": 19689.7,
      "popChangePct": 4.0
    },
    {
      "year": 2000,
      "gdp": 18.085,
      "growth": 6.9,
      "perCapita": 30461.3,
      "popChangePct": 3.85
    },
    {
      "year": 2001,
      "gdp": 17.498,
      "growth": 4.5,
      "perCapita": 28600.0,
      "popChangePct": 3.03
    },
    {
      "year": 2002,
      "gdp": 19.334,
      "growth": 6.9,
      "perCapita": 30701.1,
      "popChangePct": 2.94
    },
    {
      "year": 2003,
      "gdp": 23.716,
      "growth": 4,
      "perCapita": 35919.8,
      "popChangePct": 4.76
    },
    {
      "year": 2004,
      "gdp": 30.651,
      "growth": 19.2,
      "perCapita": 42548.1,
      "popChangePct": 9.09
    },
    {
      "year": 2005,
      "gdp": 44.636,
      "growth": 7.8,
      "perCapita": 54357.8,
      "popChangePct": 14.03
    },
    {
      "year": 2006,
      "gdp": 58.629,
      "growth": 28.1,
      "perCapita": 60591.8,
      "popChangePct": 17.9
    },
    {
      "year": 2007,
      "gdp": 75.987,
      "growth": 18.2,
      "perCapita": 65934.3,
      "popChangePct": 19.01
    },
    {
      "year": 2008,
      "gdp": 112.621,
      "growth": 17.5,
      "perCapita": 72484.6,
      "popChangePct": 34.9
    },
    {
      "year": 2009,
      "gdp": 88.196,
      "growth": 13.1,
      "perCapita": 53822.9,
      "popChangePct": 5.47
    },
    {
      "year": 2010,
      "gdp": 119.707,
      "growth": 17.7,
      "perCapita": 69796.1,
      "popChangePct": 4.64
    },
    {
      "year": 2011,
      "gdp": 167.775,
      "growth": 11.3,
      "perCapita": 96827.9,
      "popChangePct": 1.05
    },
    {
      "year": 2012,
      "gdp": 186.834,
      "growth": 4.7,
      "perCapita": 101933.1,
      "popChangePct": 5.77
    },
    {
      "year": 2013,
      "gdp": 198.728,
      "growth": 5.6,
      "perCapita": 99180.4,
      "popChangePct": 9.33
    },
    {
      "year": 2014,
      "gdp": 206.225,
      "growth": 5.3,
      "perCapita": 93054.1,
      "popChangePct": 10.58
    },
    {
      "year": 2015,
      "gdp": 161.74,
      "growth": 4.8,
      "perCapita": 66346.9,
      "popChangePct": 10.02
    },
    {
      "year": 2016,
      "gdp": 151.732,
      "growth": 3.1,
      "perCapita": 57965.4,
      "popChangePct": 7.38
    },
    {
      "year": 2017,
      "gdp": 161.099,
      "growth": -1.5,
      "perCapita": 59127.5,
      "popChangePct": 4.09
    },
    {
      "year": 2018,
      "gdp": 183.335,
      "growth": 1.2,
      "perCapita": 66421.6,
      "popChangePct": 1.28
    },
    {
      "year": 2019,
      "gdp": 176.371,
      "growth": 0.7,
      "perCapita": 63007.7,
      "popChangePct": 1.41
    },
    {
      "year": 2020,
      "gdp": 144.411,
      "growth": -3.6,
      "perCapita": 50962.5,
      "popChangePct": 1.25
    },
    {
      "year": 2021,
      "gdp": 179.732,
      "growth": 1.6,
      "perCapita": 65400.9,
      "popChangePct": -3.03
    },
    {
      "year": 2022,
      "gdp": 235.709,
      "growth": 4.2,
      "perCapita": 80385.4,
      "popChangePct": 6.7
    },
    {
      "year": 2023,
      "gdp": 217.309,
      "growth": 1.5,
      "perCapita": 70946.2,
      "popChangePct": 4.47
    },
    {
      "year": 2024,
      "gdp": 219.163,
      "growth": 2.4,
      "perCapita": 69719.5,
      "popChangePct": 2.61
    },
    {
      "year": 2025,
      "gdp": 221.229,
      "growth": 2.8,
      "perCapita": 69680.1,
      "popChangePct": 1.02
    },
    {
      "year": 2026,
      "gdp": 217.416,
      "growth": -8.6,
      "perCapita": 68138.3,
      "popChangePct": 0.5
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 237.026,
      "growth": 8.6,
      "perCapita": 73914.6,
      "popChangePct": 0.5
    },
    {
      "year": 2028,
      "gdp": 250.997,
      "growth": 5.8,
      "perCapita": 77881.8,
      "popChangePct": 0.5
    },
    {
      "year": 2029,
      "gdp": 271.458,
      "growth": 7.8,
      "perCapita": 83811.9,
      "popChangePct": 0.5
    },
    {
      "year": 2030,
      "gdp": 288.882,
      "growth": 5.9,
      "perCapita": 88747.4,
      "popChangePct": 0.49
    },
    {
      "year": 2031,
      "gdp": 304.998,
      "growth": 5,
      "perCapita": 93232.4,
      "popChangePct": 0.49
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 13.722,
      "perCapitaPPP": 56086.0,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 14.436,
      "perCapitaPPP": 54463.0,
      "perCapitaPPPChangePct": -2.89,
      "popChangePct": 8.16
    },
    {
      "year": 1982,
      "gdpPPP": 14.069,
      "perCapitaPPP": 49289.4,
      "perCapitaPPPChangePct": -9.5,
      "popChangePct": 7.55
    },
    {
      "year": 1983,
      "gdpPPP": 13.841,
      "perCapitaPPP": 45257.2,
      "perCapitaPPPChangePct": -8.18,
      "popChangePct": 7.37
    },
    {
      "year": 1984,
      "gdpPPP": 16.634,
      "perCapitaPPP": 50988.5,
      "perCapitaPPPChangePct": 12.66,
      "popChangePct": 6.54
    },
    {
      "year": 1985,
      "gdpPPP": 14.924,
      "perCapitaPPP": 43310.3,
      "perCapitaPPPChangePct": -15.06,
      "popChangePct": 5.83
    },
    {
      "year": 1986,
      "gdpPPP": 15.788,
      "perCapitaPPP": 43625.7,
      "perCapitaPPPChangePct": 0.73,
      "popChangePct": 4.93
    },
    {
      "year": 1987,
      "gdpPPP": 16.325,
      "perCapitaPPP": 43280.4,
      "perCapitaPPPChangePct": -0.79,
      "popChangePct": 4.14
    },
    {
      "year": 1988,
      "gdpPPP": 17.695,
      "perCapitaPPP": 45084.9,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 3.98
    },
    {
      "year": 1989,
      "gdpPPP": 19.364,
      "perCapitaPPP": 47485.9,
      "perCapitaPPPChangePct": 5.33,
      "popChangePct": 4.08
    },
    {
      "year": 1990,
      "gdpPPP": 17.147,
      "perCapitaPPP": 35983.1,
      "perCapitaPPPChangePct": -24.22,
      "popChangePct": 16.91
    },
    {
      "year": 1991,
      "gdpPPP": 17.456,
      "perCapitaPPP": 35983.0,
      "perCapitaPPPChangePct": -0.0,
      "popChangePct": 1.68
    },
    {
      "year": 1992,
      "gdpPPP": 19.715,
      "perCapitaPPP": 40267.9,
      "perCapitaPPPChangePct": 11.91,
      "popChangePct": 1.03
    },
    {
      "year": 1993,
      "gdpPPP": 20.003,
      "perCapitaPPP": 40656.6,
      "perCapitaPPPChangePct": 0.97,
      "popChangePct": 0.41
    },
    {
      "year": 1994,
      "gdpPPP": 20.824,
      "perCapitaPPP": 42060.0,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 0.61
    },
    {
      "year": 1995,
      "gdpPPP": 21.337,
      "perCapitaPPP": 42576.5,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": 1.21
    },
    {
      "year": 1996,
      "gdpPPP": 22.647,
      "perCapitaPPP": 44191.3,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 2.2
    },
    {
      "year": 1997,
      "gdpPPP": 29.429,
      "perCapitaPPP": 55580.4,
      "perCapitaPPPChangePct": 25.77,
      "popChangePct": 3.32
    },
    {
      "year": 1998,
      "gdpPPP": 32.811,
      "perCapitaPPP": 59617.2,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 3.97
    },
    {
      "year": 1999,
      "gdpPPP": 34.529,
      "perCapitaPPP": 60349.4,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": 4.0
    },
    {
      "year": 2000,
      "gdpPPP": 37.764,
      "perCapitaPPP": 63608.7,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 3.85
    },
    {
      "year": 2001,
      "gdpPPP": 40.352,
      "perCapitaPPP": 65955.0,
      "perCapitaPPPChangePct": 3.69,
      "popChangePct": 3.03
    },
    {
      "year": 2002,
      "gdpPPP": 43.796,
      "perCapitaPPP": 69544.9,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 2.94
    },
    {
      "year": 2003,
      "gdpPPP": 46.441,
      "perCapitaPPP": 70339.4,
      "perCapitaPPPChangePct": 1.14,
      "popChangePct": 4.76
    },
    {
      "year": 2004,
      "gdpPPP": 56.858,
      "perCapitaPPP": 78927.0,
      "perCapitaPPPChangePct": 12.21,
      "popChangePct": 9.09
    },
    {
      "year": 2005,
      "gdpPPP": 63.21,
      "perCapitaPPP": 76976.5,
      "perCapitaPPPChangePct": -2.47,
      "popChangePct": 14.03
    },
    {
      "year": 2006,
      "gdpPPP": 83.458,
      "perCapitaPPP": 86251.9,
      "perCapitaPPPChangePct": 12.05,
      "popChangePct": 17.9
    },
    {
      "year": 2007,
      "gdpPPP": 101.311,
      "perCapitaPPP": 87908.9,
      "perCapitaPPPChangePct": 1.92,
      "popChangePct": 19.01
    },
    {
      "year": 2008,
      "gdpPPP": 121.328,
      "perCapitaPPP": 78088.3,
      "perCapitaPPPChangePct": -11.17,
      "popChangePct": 34.9
    },
    {
      "year": 2009,
      "gdpPPP": 138.023,
      "perCapitaPPP": 84230.7,
      "perCapitaPPPChangePct": 7.87,
      "popChangePct": 5.47
    },
    {
      "year": 2010,
      "gdpPPP": 164.491,
      "perCapitaPPP": 95907.7,
      "perCapitaPPPChangePct": 13.86,
      "popChangePct": 4.64
    },
    {
      "year": 2011,
      "gdpPPP": 186.86,
      "perCapitaPPP": 107842.2,
      "perCapitaPPPChangePct": 12.44,
      "popChangePct": 1.05
    },
    {
      "year": 2012,
      "gdpPPP": 199.343,
      "perCapitaPPP": 108757.8,
      "perCapitaPPPChangePct": 0.85,
      "popChangePct": 5.77
    },
    {
      "year": 2013,
      "gdpPPP": 214,
      "perCapitaPPP": 106802.2,
      "perCapitaPPPChangePct": -1.8,
      "popChangePct": 9.33
    },
    {
      "year": 2014,
      "gdpPPP": 229.341,
      "perCapitaPPP": 103484.9,
      "perCapitaPPPChangePct": -3.11,
      "popChangePct": 10.58
    },
    {
      "year": 2015,
      "gdpPPP": 242.472,
      "perCapitaPPP": 99463.9,
      "perCapitaPPPChangePct": -3.89,
      "popChangePct": 10.02
    },
    {
      "year": 2016,
      "gdpPPP": 252.276,
      "perCapitaPPP": 96375.7,
      "perCapitaPPPChangePct": -3.1,
      "popChangePct": 7.38
    },
    {
      "year": 2017,
      "gdpPPP": 252.949,
      "perCapitaPPP": 92838.6,
      "perCapitaPPPChangePct": -3.67,
      "popChangePct": 4.09
    },
    {
      "year": 2018,
      "gdpPPP": 283.965,
      "perCapitaPPP": 102879.6,
      "perCapitaPPPChangePct": 10.82,
      "popChangePct": 1.28
    },
    {
      "year": 2019,
      "gdpPPP": 283.662,
      "perCapitaPPP": 101336.8,
      "perCapitaPPPChangePct": -1.5,
      "popChangePct": 1.41
    },
    {
      "year": 2020,
      "gdpPPP": 229.537,
      "perCapitaPPP": 81003.3,
      "perCapitaPPPChangePct": -20.07,
      "popChangePct": 1.25
    },
    {
      "year": 2021,
      "gdpPPP": 292.655,
      "perCapitaPPP": 106491.3,
      "perCapitaPPPChangePct": 31.47,
      "popChangePct": -3.03
    },
    {
      "year": 2022,
      "gdpPPP": 326.589,
      "perCapitaPPP": 111378.6,
      "perCapitaPPPChangePct": 4.59,
      "popChangePct": 6.7
    },
    {
      "year": 2023,
      "gdpPPP": 343.888,
      "perCapitaPPP": 112271.3,
      "perCapitaPPPChangePct": 0.8,
      "popChangePct": 4.47
    },
    {
      "year": 2024,
      "gdpPPP": 360.741,
      "perCapitaPPP": 114758.2,
      "perCapitaPPPChangePct": 2.22,
      "popChangePct": 2.61
    },
    {
      "year": 2025,
      "gdpPPP": 381.354,
      "perCapitaPPP": 120114.4,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 1.02
    },
    {
      "year": 2026,
      "gdpPPP": 358.364,
      "perCapitaPPP": 112311.7,
      "perCapitaPPPChangePct": -6.5,
      "popChangePct": 0.5
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 397.693,
      "perCapitaPPP": 124017.2,
      "perCapitaPPPChangePct": 10.42,
      "popChangePct": 0.5
    },
    {
      "year": 2028,
      "gdpPPP": 427.809,
      "perCapitaPPP": 132744.9,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": 0.5
    },
    {
      "year": 2029,
      "gdpPPP": 469.538,
      "perCapitaPPP": 144968.2,
      "perCapitaPPPChangePct": 9.21,
      "popChangePct": 0.5
    },
    {
      "year": 2030,
      "gdpPPP": 506.467,
      "perCapitaPPP": 155591.9,
      "perCapitaPPPChangePct": 7.33,
      "popChangePct": 0.49
    },
    {
      "year": 2031,
      "gdpPPP": 541.273,
      "perCapitaPPP": 165457.5,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 0.49
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function QatarGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
