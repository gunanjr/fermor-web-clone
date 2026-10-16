import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Ireland",
  "slug": "ireland",
  "iso3": "IRL",
  "region": "Europe",
  "rank2026": 23,
  "flagEmoji": "🇮🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Taiwan",
      "slug": "taiwan",
      "rank": 22
    },
    {
      "name": "Belgium",
      "slug": "belgium",
      "rank": 24
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 21.425,
      "growth": 2.9,
      "perCapita": 6254.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 20.423,
      "growth": 2.5,
      "perCapita": 5888.2,
      "popChangePct": 1.23
    },
    {
      "year": 1982,
      "gdp": 21.313,
      "growth": 1.5,
      "perCapita": 6080.0,
      "popChangePct": 1.07
    },
    {
      "year": 1983,
      "gdp": 20.618,
      "growth": -0.7,
      "perCapita": 5841.6,
      "popChangePct": 0.71
    },
    {
      "year": 1984,
      "gdp": 19.883,
      "growth": 3.2,
      "perCapita": 5593.5,
      "popChangePct": 0.71
    },
    {
      "year": 1985,
      "gdp": 21.168,
      "growth": 1.9,
      "perCapita": 5936.4,
      "popChangePct": 0.31
    },
    {
      "year": 1986,
      "gdp": 28.516,
      "growth": 0.4,
      "perCapita": 7995.6,
      "popChangePct": 0.0
    },
    {
      "year": 1987,
      "gdp": 33.66,
      "growth": 3.6,
      "perCapita": 9422.4,
      "popChangePct": 0.17
    },
    {
      "year": 1988,
      "gdp": 36.875,
      "growth": 3,
      "perCapita": 10368.5,
      "popChangePct": -0.45
    },
    {
      "year": 1989,
      "gdp": 38.03,
      "growth": 5.6,
      "perCapita": 10758.0,
      "popChangePct": -0.59
    },
    {
      "year": 1990,
      "gdp": 48.199,
      "growth": 7.7,
      "perCapita": 13649.0,
      "popChangePct": -0.11
    },
    {
      "year": 1991,
      "gdp": 48.84,
      "growth": 1.6,
      "perCapita": 13752.5,
      "popChangePct": 0.57
    },
    {
      "year": 1992,
      "gdp": 54.911,
      "growth": 3.6,
      "perCapita": 15336.7,
      "popChangePct": 0.82
    },
    {
      "year": 1993,
      "gdp": 51.364,
      "growth": 2.3,
      "perCapita": 14267.2,
      "popChangePct": 0.56
    },
    {
      "year": 1994,
      "gdp": 55.843,
      "growth": 5.9,
      "perCapita": 15460.2,
      "popChangePct": 0.33
    },
    {
      "year": 1995,
      "gdp": 69.26,
      "growth": 9.6,
      "perCapita": 19092.7,
      "popChangePct": 0.44
    },
    {
      "year": 1996,
      "gdp": 75.928,
      "growth": 9.1,
      "perCapita": 20787.9,
      "popChangePct": 0.69
    },
    {
      "year": 1997,
      "gdp": 82.957,
      "growth": 10.7,
      "perCapita": 22475.6,
      "popChangePct": 1.04
    },
    {
      "year": 1998,
      "gdp": 90.305,
      "growth": 8.8,
      "perCapita": 24210.0,
      "popChangePct": 1.06
    },
    {
      "year": 1999,
      "gdp": 98.993,
      "growth": 10.5,
      "perCapita": 26237.0,
      "popChangePct": 1.15
    },
    {
      "year": 2000,
      "gdp": 100.253,
      "growth": 9.4,
      "perCapita": 26187.5,
      "popChangePct": 1.46
    },
    {
      "year": 2001,
      "gdp": 109.347,
      "growth": 5.3,
      "perCapita": 28120.8,
      "popChangePct": 1.57
    },
    {
      "year": 2002,
      "gdp": 128.505,
      "growth": 5.9,
      "perCapita": 32482.2,
      "popChangePct": 1.75
    },
    {
      "year": 2003,
      "gdp": 164.63,
      "growth": 3,
      "perCapita": 40939.4,
      "popChangePct": 1.64
    },
    {
      "year": 2004,
      "gdp": 194.283,
      "growth": 6.8,
      "perCapita": 47388.0,
      "popChangePct": 1.96
    },
    {
      "year": 2005,
      "gdp": 211.993,
      "growth": 5.7,
      "perCapita": 50475.2,
      "popChangePct": 2.44
    },
    {
      "year": 2006,
      "gdp": 232.193,
      "growth": 5,
      "perCapita": 53737.8,
      "popChangePct": 2.88
    },
    {
      "year": 2007,
      "gdp": 270.112,
      "growth": 5.3,
      "perCapita": 60769.6,
      "popChangePct": 2.87
    },
    {
      "year": 2008,
      "gdp": 275.417,
      "growth": -4.5,
      "perCapita": 60989.7,
      "popChangePct": 1.6
    },
    {
      "year": 2009,
      "gdp": 236.187,
      "growth": -5.1,
      "perCapita": 51943.7,
      "popChangePct": 0.69
    },
    {
      "year": 2010,
      "gdp": 221.914,
      "growth": 1.7,
      "perCapita": 48580.8,
      "popChangePct": 0.46
    },
    {
      "year": 2011,
      "gdp": 240.934,
      "growth": 1.6,
      "perCapita": 52552.8,
      "popChangePct": 0.37
    },
    {
      "year": 2012,
      "gdp": 227.066,
      "growth": -0.4,
      "perCapita": 49310.5,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdp": 242.928,
      "growth": 2.2,
      "perCapita": 52462.5,
      "popChangePct": 0.56
    },
    {
      "year": 2014,
      "gdp": 266.559,
      "growth": 9.4,
      "perCapita": 57111.4,
      "popChangePct": 0.78
    },
    {
      "year": 2015,
      "gdp": 302.133,
      "growth": 24.6,
      "perCapita": 64093.6,
      "popChangePct": 1.01
    },
    {
      "year": 2016,
      "gdp": 305.347,
      "growth": 1.2,
      "perCapita": 63870.7,
      "popChangePct": 1.42
    },
    {
      "year": 2017,
      "gdp": 348.232,
      "growth": 10.1,
      "perCapita": 71831.4,
      "popChangePct": 1.4
    },
    {
      "year": 2018,
      "gdp": 395.96,
      "growth": 7.7,
      "perCapita": 80475.2,
      "popChangePct": 1.49
    },
    {
      "year": 2019,
      "gdp": 407.256,
      "growth": 5,
      "perCapita": 81525.6,
      "popChangePct": 1.52
    },
    {
      "year": 2020,
      "gdp": 435.659,
      "growth": 7.2,
      "perCapita": 86216.9,
      "popChangePct": 1.16
    },
    {
      "year": 2021,
      "gdp": 530.747,
      "growth": 16.3,
      "perCapita": 103624.4,
      "popChangePct": 1.37
    },
    {
      "year": 2022,
      "gdp": 548.773,
      "growth": 7.5,
      "perCapita": 104719.8,
      "popChangePct": 2.3
    },
    {
      "year": 2023,
      "gdp": 567.537,
      "growth": -2.5,
      "perCapita": 106501.5,
      "popChangePct": 1.7
    },
    {
      "year": 2024,
      "gdp": 608.974,
      "growth": 2.6,
      "perCapita": 112355.8,
      "popChangePct": 1.71
    },
    {
      "year": 2025,
      "gdp": 718.14,
      "growth": 12.3,
      "perCapita": 130652.4,
      "popChangePct": 1.42
    },
    {
      "year": 2026,
      "gdp": 779.381,
      "growth": 2.5,
      "perCapita": 140185.7,
      "popChangePct": 1.15
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 808.55,
      "growth": 2.4,
      "perCapita": 144104.3,
      "popChangePct": 0.92
    },
    {
      "year": 2028,
      "gdp": 838.255,
      "growth": 2.6,
      "perCapita": 148083.8,
      "popChangePct": 0.89
    },
    {
      "year": 2029,
      "gdp": 864.923,
      "growth": 2.4,
      "perCapita": 151489.0,
      "popChangePct": 0.85
    },
    {
      "year": 2030,
      "gdp": 893.816,
      "growth": 2.3,
      "perCapita": 155253.0,
      "popChangePct": 0.84
    },
    {
      "year": 2031,
      "gdp": 924.063,
      "growth": 2.3,
      "perCapita": 159213.3,
      "popChangePct": 0.82
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 27.95,
      "perCapitaPPP": 8158.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 31.363,
      "perCapitaPPP": 9042.2,
      "perCapitaPPPChangePct": 10.83,
      "popChangePct": 1.23
    },
    {
      "year": 1982,
      "gdpPPP": 33.799,
      "perCapitaPPP": 9642.0,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": 1.07
    },
    {
      "year": 1983,
      "gdpPPP": 34.866,
      "perCapitaPPP": 9878.3,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 0.71
    },
    {
      "year": 1984,
      "gdpPPP": 37.282,
      "perCapitaPPP": 10488.0,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 0.71
    },
    {
      "year": 1985,
      "gdpPPP": 39.21,
      "perCapitaPPP": 10996.1,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 0.31
    },
    {
      "year": 1986,
      "gdpPPP": 40.169,
      "perCapitaPPP": 11263.1,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 0.0
    },
    {
      "year": 1987,
      "gdpPPP": 42.663,
      "perCapitaPPP": 11942.6,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 0.17
    },
    {
      "year": 1988,
      "gdpPPP": 45.492,
      "perCapitaPPP": 12791.4,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": -0.45
    },
    {
      "year": 1989,
      "gdpPPP": 49.93,
      "perCapitaPPP": 14124.1,
      "perCapitaPPPChangePct": 10.42,
      "popChangePct": -0.59
    },
    {
      "year": 1990,
      "gdpPPP": 55.792,
      "perCapitaPPP": 15799.1,
      "perCapitaPPPChangePct": 11.86,
      "popChangePct": -0.11
    },
    {
      "year": 1991,
      "gdpPPP": 58.626,
      "perCapitaPPP": 16508.0,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 0.57
    },
    {
      "year": 1992,
      "gdpPPP": 62.109,
      "perCapitaPPP": 17346.8,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 0.82
    },
    {
      "year": 1993,
      "gdpPPP": 65.052,
      "perCapitaPPP": 18069.3,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 0.56
    },
    {
      "year": 1994,
      "gdpPPP": 70.357,
      "perCapitaPPP": 19478.5,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 0.33
    },
    {
      "year": 1995,
      "gdpPPP": 78.723,
      "perCapitaPPP": 21701.4,
      "perCapitaPPPChangePct": 11.41,
      "popChangePct": 0.44
    },
    {
      "year": 1996,
      "gdpPPP": 87.452,
      "perCapitaPPP": 23943.1,
      "perCapitaPPPChangePct": 10.33,
      "popChangePct": 0.69
    },
    {
      "year": 1997,
      "gdpPPP": 98.521,
      "perCapitaPPP": 26692.3,
      "perCapitaPPPChangePct": 11.48,
      "popChangePct": 1.04
    },
    {
      "year": 1998,
      "gdpPPP": 108.361,
      "perCapitaPPP": 29050.7,
      "perCapitaPPPChangePct": 8.84,
      "popChangePct": 1.06
    },
    {
      "year": 1999,
      "gdpPPP": 121.466,
      "perCapitaPPP": 32193.4,
      "perCapitaPPPChangePct": 10.82,
      "popChangePct": 1.15
    },
    {
      "year": 2000,
      "gdpPPP": 135.9,
      "perCapitaPPP": 35499.1,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 1.46
    },
    {
      "year": 2001,
      "gdpPPP": 146.333,
      "perCapitaPPP": 37632.2,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 1.57
    },
    {
      "year": 2002,
      "gdpPPP": 157.374,
      "perCapitaPPP": 39779.3,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 1.75
    },
    {
      "year": 2003,
      "gdpPPP": 165.317,
      "perCapitaPPP": 41110.3,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 1.64
    },
    {
      "year": 2004,
      "gdpPPP": 181.285,
      "perCapitaPPP": 44217.7,
      "perCapitaPPPChangePct": 7.56,
      "popChangePct": 1.96
    },
    {
      "year": 2005,
      "gdpPPP": 197.702,
      "perCapitaPPP": 47072.4,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 2.44
    },
    {
      "year": 2006,
      "gdpPPP": 213.964,
      "perCapitaPPP": 49519.0,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 2.88
    },
    {
      "year": 2007,
      "gdpPPP": 231.431,
      "perCapitaPPP": 52067.1,
      "perCapitaPPPChangePct": 5.15,
      "popChangePct": 2.87
    },
    {
      "year": 2008,
      "gdpPPP": 225.311,
      "perCapitaPPP": 49893.9,
      "perCapitaPPPChangePct": -4.17,
      "popChangePct": 1.6
    },
    {
      "year": 2009,
      "gdpPPP": 215.148,
      "perCapitaPPP": 47316.7,
      "perCapitaPPPChangePct": -5.17,
      "popChangePct": 0.69
    },
    {
      "year": 2010,
      "gdpPPP": 221.428,
      "perCapitaPPP": 48474.5,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 0.46
    },
    {
      "year": 2011,
      "gdpPPP": 229.633,
      "perCapitaPPP": 50087.9,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 0.37
    },
    {
      "year": 2012,
      "gdpPPP": 232.961,
      "perCapitaPPP": 50590.8,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdpPPP": 242.121,
      "perCapitaPPP": 52288.3,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 0.56
    },
    {
      "year": 2014,
      "gdpPPP": 269.459,
      "perCapitaPPP": 57732.7,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": 0.78
    },
    {
      "year": 2015,
      "gdpPPP": 338.927,
      "perCapitaPPP": 71899.0,
      "perCapitaPPPChangePct": 24.54,
      "popChangePct": 1.01
    },
    {
      "year": 2016,
      "gdpPPP": 346.331,
      "perCapitaPPP": 72443.7,
      "perCapitaPPPChangePct": 0.76,
      "popChangePct": 1.42
    },
    {
      "year": 2017,
      "gdpPPP": 388.172,
      "perCapitaPPP": 80070.0,
      "perCapitaPPPChangePct": 10.53,
      "popChangePct": 1.4
    },
    {
      "year": 2018,
      "gdpPPP": 423.037,
      "perCapitaPPP": 85978.4,
      "perCapitaPPPChangePct": 7.38,
      "popChangePct": 1.49
    },
    {
      "year": 2019,
      "gdpPPP": 458.043,
      "perCapitaPPP": 91692.3,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 1.52
    },
    {
      "year": 2020,
      "gdpPPP": 492.269,
      "perCapitaPPP": 97419.9,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 1.16
    },
    {
      "year": 2021,
      "gdpPPP": 593.409,
      "perCapitaPPP": 115858.8,
      "perCapitaPPPChangePct": 18.93,
      "popChangePct": 1.37
    },
    {
      "year": 2022,
      "gdpPPP": 683.356,
      "perCapitaPPP": 130401.8,
      "perCapitaPPPChangePct": 12.55,
      "popChangePct": 2.3
    },
    {
      "year": 2023,
      "gdpPPP": 690.667,
      "perCapitaPPP": 129607.6,
      "perCapitaPPPChangePct": -0.61,
      "popChangePct": 1.7
    },
    {
      "year": 2024,
      "gdpPPP": 726.213,
      "perCapitaPPP": 133986.3,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 1.71
    },
    {
      "year": 2025,
      "gdpPPP": 838.953,
      "perCapitaPPP": 152632.1,
      "perCapitaPPPChangePct": 13.92,
      "popChangePct": 1.42
    },
    {
      "year": 2026,
      "gdpPPP": 884.699,
      "perCapitaPPP": 159129.0,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 1.15
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 925.383,
      "perCapitaPPP": 164926.9,
      "perCapitaPPPChangePct": 3.64,
      "popChangePct": 0.92
    },
    {
      "year": 2028,
      "gdpPPP": 964.654,
      "perCapitaPPP": 170413.1,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 0.89
    },
    {
      "year": 2029,
      "gdpPPP": 1005.406,
      "perCapitaPPP": 176094.2,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 0.85
    },
    {
      "year": 2030,
      "gdpPPP": 1047.534,
      "perCapitaPPP": 181953.2,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 0.84
    },
    {
      "year": 2031,
      "gdpPPP": 1090.868,
      "perCapitaPPP": 187953.4,
      "perCapitaPPPChangePct": 3.3,
      "popChangePct": 0.82
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IrelandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
