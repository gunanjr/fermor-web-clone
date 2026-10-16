import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Turkmenistan",
  "slug": "turkmenistan",
  "iso3": "TKM",
  "region": "Asia",
  "rank2026": 89,
  "flagEmoji": "🇹🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Myanmar",
      "slug": "myanmar",
      "rank": 88
    },
    {
      "name": "Bolivia",
      "slug": "bolivia",
      "rank": 90
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.886,
      "growth": null,
      "perCapita": 215.4,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 4.997,
      "growth": -10,
      "perCapita": 1203.0,
      "popChangePct": 1.02
    },
    {
      "year": 1994,
      "gdp": 4.232,
      "growth": -17.3,
      "perCapita": 993.0,
      "popChangePct": 2.6
    },
    {
      "year": 1995,
      "gdp": 5.473,
      "growth": -7.2,
      "perCapita": 1256.0,
      "popChangePct": 2.25
    },
    {
      "year": 1996,
      "gdp": 2.217,
      "growth": -6.7,
      "perCapita": 499.2,
      "popChangePct": 1.9
    },
    {
      "year": 1997,
      "gdp": 2.498,
      "growth": -11.3,
      "perCapita": 553.7,
      "popChangePct": 1.6
    },
    {
      "year": 1998,
      "gdp": 2.667,
      "growth": 6.7,
      "perCapita": 583.1,
      "popChangePct": 1.37
    },
    {
      "year": 1999,
      "gdp": 3.594,
      "growth": 16.5,
      "perCapita": 776.3,
      "popChangePct": 1.22
    },
    {
      "year": 2000,
      "gdp": 4.68,
      "growth": 18.6,
      "perCapita": 999.1,
      "popChangePct": 1.17
    },
    {
      "year": 2001,
      "gdp": 6.461,
      "growth": 20.4,
      "perCapita": 1364.1,
      "popChangePct": 1.11
    },
    {
      "year": 2002,
      "gdp": 8.107,
      "growth": 15.8,
      "perCapita": 1693.6,
      "popChangePct": 1.08
    },
    {
      "year": 2003,
      "gdp": 10.645,
      "growth": 17.1,
      "perCapita": 2201.0,
      "popChangePct": 1.04
    },
    {
      "year": 2004,
      "gdp": 13.228,
      "growth": 14.7,
      "perCapita": 2706.6,
      "popChangePct": 1.03
    },
    {
      "year": 2005,
      "gdp": 16.003,
      "growth": 13,
      "perCapita": 3239.1,
      "popChangePct": 1.08
    },
    {
      "year": 2006,
      "gdp": 19.935,
      "growth": 11,
      "perCapita": 3989.8,
      "popChangePct": 1.13
    },
    {
      "year": 2007,
      "gdp": 24.192,
      "growth": 11.1,
      "perCapita": 4785.4,
      "popChangePct": 1.18
    },
    {
      "year": 2008,
      "gdp": 20.049,
      "growth": 14.7,
      "perCapita": 3918.2,
      "popChangePct": 1.23
    },
    {
      "year": 2009,
      "gdp": 18.836,
      "growth": 6.1,
      "perCapita": 3635.6,
      "popChangePct": 1.25
    },
    {
      "year": 2010,
      "gdp": 21.321,
      "growth": 17.1,
      "perCapita": 4047.2,
      "popChangePct": 1.68
    },
    {
      "year": 2011,
      "gdp": 27.776,
      "growth": 21.5,
      "perCapita": 5181.4,
      "popChangePct": 1.77
    },
    {
      "year": 2012,
      "gdp": 35.164,
      "growth": 16.9,
      "perCapita": 6441.9,
      "popChangePct": 1.83
    },
    {
      "year": 2013,
      "gdp": 39.198,
      "growth": 10.2,
      "perCapita": 7049.8,
      "popChangePct": 1.85
    },
    {
      "year": 2014,
      "gdp": 43.524,
      "growth": 5.2,
      "perCapita": 7685.5,
      "popChangePct": 1.85
    },
    {
      "year": 2015,
      "gdp": 35.8,
      "growth": 0.8,
      "perCapita": 6208.3,
      "popChangePct": 1.82
    },
    {
      "year": 2016,
      "gdp": 36.18,
      "growth": 3.7,
      "perCapita": 6165.1,
      "popChangePct": 1.79
    },
    {
      "year": 2017,
      "gdp": 37.926,
      "growth": 4.3,
      "perCapita": 6354.5,
      "popChangePct": 1.69
    },
    {
      "year": 2018,
      "gdp": 40.762,
      "growth": 4.8,
      "perCapita": 6720.8,
      "popChangePct": 1.63
    },
    {
      "year": 2019,
      "gdp": 44.974,
      "growth": 5.1,
      "perCapita": 7302.9,
      "popChangePct": 1.53
    },
    {
      "year": 2020,
      "gdp": 45.455,
      "growth": -1.6,
      "perCapita": 7272.3,
      "popChangePct": 1.49
    },
    {
      "year": 2021,
      "gdp": 49.477,
      "growth": 9.9,
      "perCapita": 7801.7,
      "popChangePct": 1.47
    },
    {
      "year": 2022,
      "gdp": 56.677,
      "growth": 3.3,
      "perCapita": 8813.5,
      "popChangePct": 1.4
    },
    {
      "year": 2023,
      "gdp": 62.814,
      "growth": 4.3,
      "perCapita": 9639.8,
      "popChangePct": 1.32
    },
    {
      "year": 2024,
      "gdp": 68.675,
      "growth": 3.4,
      "perCapita": 10408.3,
      "popChangePct": 1.26
    },
    {
      "year": 2025,
      "gdp": 77.398,
      "growth": 3.6,
      "perCapita": 11586.5,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdp": 83.065,
      "growth": 2.6,
      "perCapita": 12300.5,
      "popChangePct": 1.09
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 87.909,
      "growth": 2,
      "perCapita": 12877.8,
      "popChangePct": 1.08
    },
    {
      "year": 2028,
      "gdp": 93.864,
      "growth": 2.3,
      "perCapita": 13608.4,
      "popChangePct": 1.04
    },
    {
      "year": 2029,
      "gdp": 100.335,
      "growth": 2.3,
      "perCapita": 14401.9,
      "popChangePct": 1.01
    },
    {
      "year": 2030,
      "gdp": 107.282,
      "growth": 2.3,
      "perCapita": 15250.3,
      "popChangePct": 0.98
    },
    {
      "year": 2031,
      "gdp": 114.732,
      "growth": 2.3,
      "perCapita": 16156.0,
      "popChangePct": 0.94
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 9.626,
      "perCapitaPPP": 2340.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 8.869,
      "perCapitaPPP": 2135.0,
      "perCapitaPPPChangePct": -8.79,
      "popChangePct": 1.02
    },
    {
      "year": 1994,
      "gdpPPP": 7.491,
      "perCapitaPPP": 1757.7,
      "perCapitaPPPChangePct": -17.67,
      "popChangePct": 2.6
    },
    {
      "year": 1995,
      "gdpPPP": 7.097,
      "perCapitaPPP": 1628.6,
      "perCapitaPPPChangePct": -7.35,
      "popChangePct": 2.25
    },
    {
      "year": 1996,
      "gdpPPP": 6.743,
      "perCapitaPPP": 1518.4,
      "perCapitaPPPChangePct": -6.77,
      "popChangePct": 1.9
    },
    {
      "year": 1997,
      "gdpPPP": 6.084,
      "perCapitaPPP": 1348.5,
      "perCapitaPPPChangePct": -11.19,
      "popChangePct": 1.6
    },
    {
      "year": 1998,
      "gdpPPP": 6.565,
      "perCapitaPPP": 1435.4,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 1.37
    },
    {
      "year": 1999,
      "gdpPPP": 7.756,
      "perCapitaPPP": 1675.2,
      "perCapitaPPPChangePct": 16.71,
      "popChangePct": 1.22
    },
    {
      "year": 2000,
      "gdpPPP": 9.406,
      "perCapitaPPP": 2008.1,
      "perCapitaPPPChangePct": 19.87,
      "popChangePct": 1.17
    },
    {
      "year": 2001,
      "gdpPPP": 11.579,
      "perCapitaPPP": 2444.7,
      "perCapitaPPPChangePct": 21.74,
      "popChangePct": 1.11
    },
    {
      "year": 2002,
      "gdpPPP": 13.613,
      "perCapitaPPP": 2843.9,
      "perCapitaPPPChangePct": 16.33,
      "popChangePct": 1.08
    },
    {
      "year": 2003,
      "gdpPPP": 16.255,
      "perCapitaPPP": 3360.8,
      "perCapitaPPPChangePct": 18.18,
      "popChangePct": 1.04
    },
    {
      "year": 2004,
      "gdpPPP": 19.145,
      "perCapitaPPP": 3917.1,
      "perCapitaPPPChangePct": 16.55,
      "popChangePct": 1.03
    },
    {
      "year": 2005,
      "gdpPPP": 22.32,
      "perCapitaPPP": 4517.7,
      "perCapitaPPPChangePct": 15.33,
      "popChangePct": 1.08
    },
    {
      "year": 2006,
      "gdpPPP": 25.531,
      "perCapitaPPP": 5109.9,
      "perCapitaPPPChangePct": 13.11,
      "popChangePct": 1.13
    },
    {
      "year": 2007,
      "gdpPPP": 29.123,
      "perCapitaPPP": 5760.8,
      "perCapitaPPPChangePct": 12.74,
      "popChangePct": 1.18
    },
    {
      "year": 2008,
      "gdpPPP": 34.061,
      "perCapitaPPP": 6656.4,
      "perCapitaPPPChangePct": 15.55,
      "popChangePct": 1.23
    },
    {
      "year": 2009,
      "gdpPPP": 36.373,
      "perCapitaPPP": 7020.5,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.25
    },
    {
      "year": 2010,
      "gdpPPP": 43.128,
      "perCapitaPPP": 8186.9,
      "perCapitaPPPChangePct": 16.61,
      "popChangePct": 1.68
    },
    {
      "year": 2011,
      "gdpPPP": 53.487,
      "perCapitaPPP": 9977.4,
      "perCapitaPPPChangePct": 21.87,
      "popChangePct": 1.77
    },
    {
      "year": 2012,
      "gdpPPP": 63.677,
      "perCapitaPPP": 11665.3,
      "perCapitaPPPChangePct": 16.92,
      "popChangePct": 1.83
    },
    {
      "year": 2013,
      "gdpPPP": 71.342,
      "perCapitaPPP": 12831.1,
      "perCapitaPPPChangePct": 9.99,
      "popChangePct": 1.85
    },
    {
      "year": 2014,
      "gdpPPP": 76.381,
      "perCapitaPPP": 13487.3,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": 1.85
    },
    {
      "year": 2015,
      "gdpPPP": 77.736,
      "perCapitaPPP": 13480.7,
      "perCapitaPPPChangePct": -0.05,
      "popChangePct": 1.82
    },
    {
      "year": 2016,
      "gdpPPP": 81.393,
      "perCapitaPPP": 13869.3,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 1.79
    },
    {
      "year": 2017,
      "gdpPPP": 86.403,
      "perCapitaPPP": 14476.8,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 1.69
    },
    {
      "year": 2018,
      "gdpPPP": 95.622,
      "perCapitaPPP": 15766.0,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": 1.63
    },
    {
      "year": 2019,
      "gdpPPP": 104.708,
      "perCapitaPPP": 17002.3,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 1.53
    },
    {
      "year": 2020,
      "gdpPPP": 104.049,
      "perCapitaPPP": 16646.7,
      "perCapitaPPPChangePct": -2.09,
      "popChangePct": 1.49
    },
    {
      "year": 2021,
      "gdpPPP": 115.316,
      "perCapitaPPP": 18183.3,
      "perCapitaPPPChangePct": 9.23,
      "popChangePct": 1.47
    },
    {
      "year": 2022,
      "gdpPPP": 127.651,
      "perCapitaPPP": 19850.1,
      "perCapitaPPPChangePct": 9.17,
      "popChangePct": 1.4
    },
    {
      "year": 2023,
      "gdpPPP": 138.01,
      "perCapitaPPP": 21179.9,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 1.32
    },
    {
      "year": 2024,
      "gdpPPP": 146.269,
      "perCapitaPPP": 22168.5,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 1.26
    },
    {
      "year": 2025,
      "gdpPPP": 155.798,
      "perCapitaPPP": 23323.0,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdpPPP": 164.428,
      "perCapitaPPP": 24348.9,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 1.09
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 171.397,
      "perCapitaPPP": 25108.0,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": 1.08
    },
    {
      "year": 2028,
      "gdpPPP": 178.223,
      "perCapitaPPP": 25838.9,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 1.04
    },
    {
      "year": 2029,
      "gdpPPP": 185.561,
      "perCapitaPPP": 26635.1,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.01
    },
    {
      "year": 2030,
      "gdpPPP": 193.311,
      "perCapitaPPP": 27479.4,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 0.98
    },
    {
      "year": 2031,
      "gdpPPP": 201.337,
      "perCapitaPPP": 28351.3,
      "perCapitaPPPChangePct": 3.17,
      "popChangePct": 0.94
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TurkmenistanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
