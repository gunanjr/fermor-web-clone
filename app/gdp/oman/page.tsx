import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Oman",
  "slug": "oman",
  "iso3": "OMN",
  "region": "Asia",
  "rank2026": 74,
  "flagEmoji": "🇴🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Ghana",
      "slug": "ghana",
      "rank": 73
    },
    {
      "name": "Croatia",
      "slug": "croatia",
      "rank": 75
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 7.269,
      "growth": 6.1,
      "perCapita": 5357.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 8.849,
      "growth": 17.1,
      "perCapita": 6019.9,
      "popChangePct": 8.33
    },
    {
      "year": 1982,
      "gdp": 9.285,
      "growth": 11.5,
      "perCapita": 6317.0,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdp": 9.733,
      "growth": 15.9,
      "perCapita": 6148.4,
      "popChangePct": 7.69
    },
    {
      "year": 1984,
      "gdp": 10.726,
      "growth": 13.9,
      "perCapita": 6324.4,
      "popChangePct": 7.14
    },
    {
      "year": 1985,
      "gdp": 11.916,
      "growth": 14.5,
      "perCapita": 7025.7,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdp": 9.433,
      "growth": 2.1,
      "perCapita": 5214.2,
      "popChangePct": 6.66
    },
    {
      "year": 1987,
      "gdp": 9.89,
      "growth": -4,
      "perCapita": 5145.5,
      "popChangePct": 6.25
    },
    {
      "year": 1988,
      "gdp": 9.613,
      "growth": 5.2,
      "perCapita": 5001.1,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdp": 10.743,
      "growth": 3,
      "perCapita": 5278.6,
      "popChangePct": 5.88
    },
    {
      "year": 1990,
      "gdp": 13.395,
      "growth": 8.4,
      "perCapita": 7267.9,
      "popChangePct": -9.43
    },
    {
      "year": 1991,
      "gdp": 13,
      "growth": 6,
      "perCapita": 6806.2,
      "popChangePct": 3.64
    },
    {
      "year": 1992,
      "gdp": 14.274,
      "growth": 8.5,
      "perCapita": 7213.1,
      "popChangePct": 3.61
    },
    {
      "year": 1993,
      "gdp": 14.321,
      "growth": 6.1,
      "perCapita": 6995.3,
      "popChangePct": 3.44
    },
    {
      "year": 1994,
      "gdp": 14.808,
      "growth": 3.8,
      "perCapita": 7010.6,
      "popChangePct": 3.18
    },
    {
      "year": 1995,
      "gdp": 15.821,
      "growth": 4.8,
      "perCapita": 7284.8,
      "popChangePct": 2.84
    },
    {
      "year": 1996,
      "gdp": 17.512,
      "growth": 2.9,
      "perCapita": 7869.1,
      "popChangePct": 2.44
    },
    {
      "year": 1997,
      "gdp": 18.154,
      "growth": 6.2,
      "perCapita": 7984.0,
      "popChangePct": 2.2
    },
    {
      "year": 1998,
      "gdp": 16.044,
      "growth": 2.7,
      "perCapita": 6920.9,
      "popChangePct": 1.93
    },
    {
      "year": 1999,
      "gdp": 17.833,
      "growth": 0.3,
      "perCapita": 7554.5,
      "popChangePct": 1.86
    },
    {
      "year": 2000,
      "gdp": 22.259,
      "growth": 6.2,
      "perCapita": 9266.4,
      "popChangePct": 1.74
    },
    {
      "year": 2001,
      "gdp": 22.206,
      "growth": 4.6,
      "perCapita": 9088.2,
      "popChangePct": 1.71
    },
    {
      "year": 2002,
      "gdp": 23.066,
      "growth": -0.8,
      "perCapita": 9285.3,
      "popChangePct": 1.68
    },
    {
      "year": 2003,
      "gdp": 24.734,
      "growth": -2.2,
      "perCapita": 9792.6,
      "popChangePct": 1.69
    },
    {
      "year": 2004,
      "gdp": 28.379,
      "growth": 2,
      "perCapita": 11042.5,
      "popChangePct": 1.74
    },
    {
      "year": 2005,
      "gdp": 35.507,
      "growth": 2.8,
      "perCapita": 13563.5,
      "popChangePct": 1.87
    },
    {
      "year": 2006,
      "gdp": 42.578,
      "growth": 4.7,
      "perCapita": 15946.4,
      "popChangePct": 1.99
    },
    {
      "year": 2007,
      "gdp": 48.3,
      "growth": 5,
      "perCapita": 17716.4,
      "popChangePct": 2.1
    },
    {
      "year": 2008,
      "gdp": 69.805,
      "growth": 9,
      "perCapita": 25061.3,
      "popChangePct": 2.16
    },
    {
      "year": 2009,
      "gdp": 55.454,
      "growth": 6,
      "perCapita": 19235.9,
      "popChangePct": 3.52
    },
    {
      "year": 2010,
      "gdp": 64.994,
      "growth": 2.5,
      "perCapita": 21677.8,
      "popChangePct": 3.99
    },
    {
      "year": 2011,
      "gdp": 77.497,
      "growth": 2.9,
      "perCapita": 23518.6,
      "popChangePct": 9.91
    },
    {
      "year": 2012,
      "gdp": 87.409,
      "growth": 8.9,
      "perCapita": 24129.0,
      "popChangePct": 9.95
    },
    {
      "year": 2013,
      "gdp": 89.936,
      "growth": 5.2,
      "perCapita": 23328.5,
      "popChangePct": 6.4
    },
    {
      "year": 2014,
      "gdp": 92.699,
      "growth": 1.3,
      "perCapita": 23219.7,
      "popChangePct": 3.55
    },
    {
      "year": 2015,
      "gdp": 78.711,
      "growth": 5,
      "perCapita": 18925.0,
      "popChangePct": 4.18
    },
    {
      "year": 2016,
      "gdp": 75.129,
      "growth": 5,
      "perCapita": 17020.4,
      "popChangePct": 6.13
    },
    {
      "year": 2017,
      "gdp": 80.857,
      "growth": 0.3,
      "perCapita": 17731.8,
      "popChangePct": 3.31
    },
    {
      "year": 2018,
      "gdp": 91.506,
      "growth": 1.3,
      "perCapita": 19885.3,
      "popChangePct": 0.92
    },
    {
      "year": 2019,
      "gdp": 88.061,
      "growth": -1.1,
      "perCapita": 19069.3,
      "popChangePct": 0.35
    },
    {
      "year": 2020,
      "gdp": 75.909,
      "growth": -3.4,
      "perCapita": 17076.3,
      "popChangePct": -3.75
    },
    {
      "year": 2021,
      "gdp": 87.324,
      "growth": 2.6,
      "perCapita": 19458.6,
      "popChangePct": 0.97
    },
    {
      "year": 2022,
      "gdp": 109.853,
      "growth": 8,
      "perCapita": 22265.1,
      "popChangePct": 9.94
    },
    {
      "year": 2023,
      "gdp": 106.175,
      "growth": 1.4,
      "perCapita": 20552.6,
      "popChangePct": 4.7
    },
    {
      "year": 2024,
      "gdp": 107.137,
      "growth": 1.6,
      "perCapita": 20529.5,
      "popChangePct": 1.03
    },
    {
      "year": 2025,
      "gdp": 106.127,
      "growth": 2.4,
      "perCapita": 19996.1,
      "popChangePct": 1.69
    },
    {
      "year": 2026,
      "gdp": 117.176,
      "growth": 3.5,
      "perCapita": 21644.9,
      "popChangePct": 2.02
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 118.478,
      "growth": 3.4,
      "perCapita": 21456.3,
      "popChangePct": 1.99
    },
    {
      "year": 2028,
      "gdp": 122.721,
      "growth": 3.7,
      "perCapita": 21788.9,
      "popChangePct": 1.99
    },
    {
      "year": 2029,
      "gdp": 128.36,
      "growth": 3.5,
      "perCapita": 22343.3,
      "popChangePct": 2.01
    },
    {
      "year": 2030,
      "gdp": 134.117,
      "growth": 3.3,
      "perCapita": 22887.6,
      "popChangePct": 2.0
    },
    {
      "year": 2031,
      "gdp": 139.327,
      "growth": 2.7,
      "perCapita": 23310.4,
      "popChangePct": 2.0
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 9.092,
      "perCapitaPPP": 6701.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 11.654,
      "perCapitaPPP": 7928.4,
      "perCapitaPPPChangePct": 18.32,
      "popChangePct": 8.33
    },
    {
      "year": 1982,
      "gdpPPP": 13.797,
      "perCapitaPPP": 9386.5,
      "perCapitaPPPChangePct": 18.39,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdpPPP": 16.624,
      "perCapitaPPP": 10501.8,
      "perCapitaPPPChangePct": 11.88,
      "popChangePct": 7.69
    },
    {
      "year": 1984,
      "gdpPPP": 19.619,
      "perCapitaPPP": 11567.5,
      "perCapitaPPPChangePct": 10.15,
      "popChangePct": 7.14
    },
    {
      "year": 1985,
      "gdpPPP": 23.178,
      "perCapitaPPP": 13666.4,
      "perCapitaPPPChangePct": 18.14,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdpPPP": 24.152,
      "perCapitaPPP": 13350.5,
      "perCapitaPPPChangePct": -2.31,
      "popChangePct": 6.66
    },
    {
      "year": 1987,
      "gdpPPP": 23.762,
      "perCapitaPPP": 12362.5,
      "perCapitaPPPChangePct": -7.4,
      "popChangePct": 6.25
    },
    {
      "year": 1988,
      "gdpPPP": 25.891,
      "perCapitaPPP": 13469.7,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdpPPP": 27.709,
      "perCapitaPPP": 13614.7,
      "perCapitaPPPChangePct": 1.08,
      "popChangePct": 5.88
    },
    {
      "year": 1990,
      "gdpPPP": 31.154,
      "perCapitaPPP": 16904.0,
      "perCapitaPPPChangePct": 24.16,
      "popChangePct": -9.43
    },
    {
      "year": 1991,
      "gdpPPP": 34.154,
      "perCapitaPPP": 17881.2,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 3.64
    },
    {
      "year": 1992,
      "gdpPPP": 37.899,
      "perCapitaPPP": 19152.0,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": 3.61
    },
    {
      "year": 1993,
      "gdpPPP": 41.181,
      "perCapitaPPP": 20115.4,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 3.44
    },
    {
      "year": 1994,
      "gdpPPP": 43.678,
      "perCapitaPPP": 20678.4,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 3.18
    },
    {
      "year": 1995,
      "gdpPPP": 46.748,
      "perCapitaPPP": 21524.7,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 2.84
    },
    {
      "year": 1996,
      "gdpPPP": 48.979,
      "perCapitaPPP": 22009.2,
      "perCapitaPPPChangePct": 2.25,
      "popChangePct": 2.44
    },
    {
      "year": 1997,
      "gdpPPP": 52.902,
      "perCapitaPPP": 23265.7,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 2.2
    },
    {
      "year": 1998,
      "gdpPPP": 54.943,
      "perCapitaPPP": 23700.3,
      "perCapitaPPPChangePct": 1.87,
      "popChangePct": 1.93
    },
    {
      "year": 1999,
      "gdpPPP": 55.886,
      "perCapitaPPP": 23675.3,
      "perCapitaPPPChangePct": -0.11,
      "popChangePct": 1.86
    },
    {
      "year": 2000,
      "gdpPPP": 60.691,
      "perCapitaPPP": 25265.1,
      "perCapitaPPPChangePct": 6.71,
      "popChangePct": 1.74
    },
    {
      "year": 2001,
      "gdpPPP": 64.92,
      "perCapitaPPP": 26570.3,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": 1.71
    },
    {
      "year": 2002,
      "gdpPPP": 65.412,
      "perCapitaPPP": 26332.6,
      "perCapitaPPPChangePct": -0.89,
      "popChangePct": 1.68
    },
    {
      "year": 2003,
      "gdpPPP": 65.24,
      "perCapitaPPP": 25829.9,
      "perCapitaPPPChangePct": -1.91,
      "popChangePct": 1.69
    },
    {
      "year": 2004,
      "gdpPPP": 68.329,
      "perCapitaPPP": 26587.5,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 1.74
    },
    {
      "year": 2005,
      "gdpPPP": 72.43,
      "perCapitaPPP": 27668.1,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 1.87
    },
    {
      "year": 2006,
      "gdpPPP": 78.151,
      "perCapitaPPP": 29269.4,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 1.99
    },
    {
      "year": 2007,
      "gdpPPP": 84.266,
      "perCapitaPPP": 30908.5,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 2.1
    },
    {
      "year": 2008,
      "gdpPPP": 93.576,
      "perCapitaPPP": 33595.8,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 2.16
    },
    {
      "year": 2009,
      "gdpPPP": 99.786,
      "perCapitaPPP": 34613.6,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 3.52
    },
    {
      "year": 2010,
      "gdpPPP": 103.495,
      "perCapitaPPP": 34519.6,
      "perCapitaPPPChangePct": -0.27,
      "popChangePct": 3.99
    },
    {
      "year": 2011,
      "gdpPPP": 108.688,
      "perCapitaPPP": 32984.2,
      "perCapitaPPPChangePct": -4.45,
      "popChangePct": 9.91
    },
    {
      "year": 2012,
      "gdpPPP": 120.525,
      "perCapitaPPP": 33270.6,
      "perCapitaPPPChangePct": 0.87,
      "popChangePct": 9.95
    },
    {
      "year": 2013,
      "gdpPPP": 128.983,
      "perCapitaPPP": 33457.0,
      "perCapitaPPPChangePct": 0.56,
      "popChangePct": 6.4
    },
    {
      "year": 2014,
      "gdpPPP": 132.926,
      "perCapitaPPP": 33295.8,
      "perCapitaPPPChangePct": -0.48,
      "popChangePct": 3.55
    },
    {
      "year": 2015,
      "gdpPPP": 140.891,
      "perCapitaPPP": 33875.2,
      "perCapitaPPPChangePct": 1.74,
      "popChangePct": 4.18
    },
    {
      "year": 2016,
      "gdpPPP": 149.407,
      "perCapitaPPP": 33847.9,
      "perCapitaPPPChangePct": -0.08,
      "popChangePct": 6.13
    },
    {
      "year": 2017,
      "gdpPPP": 152.545,
      "perCapitaPPP": 33453.1,
      "perCapitaPPPChangePct": -1.17,
      "popChangePct": 3.31
    },
    {
      "year": 2018,
      "gdpPPP": 173.71,
      "perCapitaPPP": 37749.0,
      "perCapitaPPPChangePct": 12.84,
      "popChangePct": 0.92
    },
    {
      "year": 2019,
      "gdpPPP": 171.026,
      "perCapitaPPP": 37035.3,
      "perCapitaPPPChangePct": -1.89,
      "popChangePct": 0.35
    },
    {
      "year": 2020,
      "gdpPPP": 159.024,
      "perCapitaPPP": 35773.9,
      "perCapitaPPPChangePct": -3.41,
      "popChangePct": -3.75
    },
    {
      "year": 2021,
      "gdpPPP": 174.254,
      "perCapitaPPP": 38829.5,
      "perCapitaPPPChangePct": 8.54,
      "popChangePct": 0.97
    },
    {
      "year": 2022,
      "gdpPPP": 201.553,
      "perCapitaPPP": 40851.1,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 9.94
    },
    {
      "year": 2023,
      "gdpPPP": 211.961,
      "perCapitaPPP": 41030.0,
      "perCapitaPPPChangePct": 0.44,
      "popChangePct": 4.7
    },
    {
      "year": 2024,
      "gdpPPP": 220.772,
      "perCapitaPPP": 42304.2,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 1.03
    },
    {
      "year": 2025,
      "gdpPPP": 232.476,
      "perCapitaPPP": 43802.1,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 1.69
    },
    {
      "year": 2026,
      "gdpPPP": 247.39,
      "perCapitaPPP": 45698.2,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 2.02
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 261.458,
      "perCapitaPPP": 47350.0,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 1.99
    },
    {
      "year": 2028,
      "gdpPPP": 275.627,
      "perCapitaPPP": 48937.2,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 1.99
    },
    {
      "year": 2029,
      "gdpPPP": 290.278,
      "perCapitaPPP": 50527.9,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 2.01
    },
    {
      "year": 2030,
      "gdpPPP": 305.279,
      "perCapitaPPP": 52097.1,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 2.0
    },
    {
      "year": 2031,
      "gdpPPP": 319.106,
      "perCapitaPPP": 53389.0,
      "perCapitaPPPChangePct": 2.48,
      "popChangePct": 2.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function OmanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
