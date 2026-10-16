import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Finland",
  "slug": "finland",
  "iso3": "FIN",
  "region": "Europe",
  "rank2026": 50,
  "flagEmoji": "🇫🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Kazakhstan",
      "slug": "kazakhstan",
      "rank": 49
    },
    {
      "name": "Algeria",
      "slug": "algeria",
      "rank": 51
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 53.714,
      "growth": 5.7,
      "perCapita": 11257.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 52.62,
      "growth": 1.3,
      "perCapita": 10990.4,
      "popChangePct": 0.36
    },
    {
      "year": 1982,
      "gdp": 53.111,
      "growth": 3.1,
      "perCapita": 11036.9,
      "popChangePct": 0.5
    },
    {
      "year": 1983,
      "gdp": 51.056,
      "growth": 3.1,
      "perCapita": 10545.1,
      "popChangePct": 0.62
    },
    {
      "year": 1984,
      "gdp": 53.032,
      "growth": 3.2,
      "perCapita": 10889.9,
      "popChangePct": 0.58
    },
    {
      "year": 1985,
      "gdp": 56.223,
      "growth": 3.5,
      "perCapita": 11488.8,
      "popChangePct": 0.49
    },
    {
      "year": 1986,
      "gdp": 73.652,
      "growth": 2.7,
      "perCapita": 14998.3,
      "popChangePct": 0.35
    },
    {
      "year": 1987,
      "gdp": 91.775,
      "growth": 3.6,
      "perCapita": 18632.1,
      "popChangePct": 0.31
    },
    {
      "year": 1988,
      "gdp": 109.255,
      "growth": 5.2,
      "perCapita": 22122.6,
      "popChangePct": 0.26
    },
    {
      "year": 1989,
      "gdp": 119.106,
      "growth": 5.1,
      "perCapita": 24040.6,
      "popChangePct": 0.3
    },
    {
      "year": 1990,
      "gdp": 141.726,
      "growth": 0.2,
      "perCapita": 28491.1,
      "popChangePct": 0.4
    },
    {
      "year": 1991,
      "gdp": 128.215,
      "growth": -5.9,
      "perCapita": 25650.7,
      "popChangePct": 0.48
    },
    {
      "year": 1992,
      "gdp": 113.139,
      "growth": -3.3,
      "perCapita": 22497.3,
      "popChangePct": 0.62
    },
    {
      "year": 1993,
      "gdp": 89.177,
      "growth": -0.8,
      "perCapita": 17641.4,
      "popChangePct": 0.52
    },
    {
      "year": 1994,
      "gdp": 103.621,
      "growth": 4,
      "perCapita": 20406.2,
      "popChangePct": 0.45
    },
    {
      "year": 1995,
      "gdp": 134.21,
      "growth": 4.2,
      "perCapita": 26322.1,
      "popChangePct": 0.41
    },
    {
      "year": 1996,
      "gdp": 132.046,
      "growth": 3.7,
      "perCapita": 25806.2,
      "popChangePct": 0.35
    },
    {
      "year": 1997,
      "gdp": 127.027,
      "growth": 6.4,
      "perCapita": 24750.4,
      "popChangePct": 0.29
    },
    {
      "year": 1998,
      "gdp": 134.164,
      "growth": 5.5,
      "perCapita": 26064.8,
      "popChangePct": 0.29
    },
    {
      "year": 1999,
      "gdp": 135.369,
      "growth": 4.4,
      "perCapita": 26236.0,
      "popChangePct": 0.25
    },
    {
      "year": 2000,
      "gdp": 126.023,
      "growth": 5.8,
      "perCapita": 24369.8,
      "popChangePct": 0.21
    },
    {
      "year": 2001,
      "gdp": 129.521,
      "growth": 2.6,
      "perCapita": 24998.6,
      "popChangePct": 0.19
    },
    {
      "year": 2002,
      "gdp": 140.262,
      "growth": 1.7,
      "perCapita": 26999.9,
      "popChangePct": 0.27
    },
    {
      "year": 2003,
      "gdp": 171.57,
      "growth": 2,
      "perCapita": 32954.3,
      "popChangePct": 0.21
    },
    {
      "year": 2004,
      "gdp": 197.369,
      "growth": 4,
      "perCapita": 37812.0,
      "popChangePct": 0.27
    },
    {
      "year": 2005,
      "gdp": 204.973,
      "growth": 2.8,
      "perCapita": 39142.2,
      "popChangePct": 0.33
    },
    {
      "year": 2006,
      "gdp": 217.056,
      "growth": 4,
      "perCapita": 41300.0,
      "popChangePct": 0.36
    },
    {
      "year": 2007,
      "gdp": 256.39,
      "growth": 5.3,
      "perCapita": 48586.8,
      "popChangePct": 0.4
    },
    {
      "year": 2008,
      "gdp": 285.667,
      "growth": 0.8,
      "perCapita": 53894.6,
      "popChangePct": 0.44
    },
    {
      "year": 2009,
      "gdp": 253.206,
      "growth": -8.1,
      "perCapita": 47538.6,
      "popChangePct": 0.49
    },
    {
      "year": 2010,
      "gdp": 249.633,
      "growth": 3.2,
      "perCapita": 46648.0,
      "popChangePct": 0.47
    },
    {
      "year": 2011,
      "gdp": 275.079,
      "growth": 2.4,
      "perCapita": 51174.8,
      "popChangePct": 0.45
    },
    {
      "year": 2012,
      "gdp": 257.606,
      "growth": -1.5,
      "perCapita": 47693.7,
      "popChangePct": 0.48
    },
    {
      "year": 2013,
      "gdp": 270.272,
      "growth": -1,
      "perCapita": 49804.4,
      "popChangePct": 0.48
    },
    {
      "year": 2014,
      "gdp": 273.549,
      "growth": -0.5,
      "perCapita": 50180.8,
      "popChangePct": 0.44
    },
    {
      "year": 2015,
      "gdp": 233.234,
      "growth": 0.5,
      "perCapita": 42625.2,
      "popChangePct": 0.39
    },
    {
      "year": 2016,
      "gdp": 238.712,
      "growth": 2.6,
      "perCapita": 43502.6,
      "popChangePct": 0.27
    },
    {
      "year": 2017,
      "gdp": 253.757,
      "growth": 3.3,
      "perCapita": 46109.9,
      "popChangePct": 0.29
    },
    {
      "year": 2018,
      "gdp": 273.993,
      "growth": 1.2,
      "perCapita": 49698.3,
      "popChangePct": 0.18
    },
    {
      "year": 2019,
      "gdp": 267.044,
      "growth": 1.3,
      "perCapita": 48395.8,
      "popChangePct": 0.09
    },
    {
      "year": 2020,
      "gdp": 269.784,
      "growth": -2.5,
      "perCapita": 48827.1,
      "popChangePct": 0.13
    },
    {
      "year": 2021,
      "gdp": 294.419,
      "growth": 2.7,
      "perCapita": 53203.8,
      "popChangePct": 0.16
    },
    {
      "year": 2022,
      "gdp": 280.474,
      "growth": 0.8,
      "perCapita": 50551.8,
      "popChangePct": 0.25
    },
    {
      "year": 2023,
      "gdp": 295.277,
      "growth": -1.3,
      "perCapita": 53069.5,
      "popChangePct": 0.29
    },
    {
      "year": 2024,
      "gdp": 298.639,
      "growth": 0.4,
      "perCapita": 53291.8,
      "popChangePct": 0.72
    },
    {
      "year": 2025,
      "gdp": 316.86,
      "growth": 0.2,
      "perCapita": 56464.4,
      "popChangePct": 0.14
    },
    {
      "year": 2026,
      "gdp": 337.669,
      "growth": 1,
      "perCapita": 60129.7,
      "popChangePct": 0.07
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 350.306,
      "growth": 1.5,
      "perCapita": 62379.3,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 361.677,
      "growth": 1.4,
      "perCapita": 64448.6,
      "popChangePct": -0.07
    },
    {
      "year": 2029,
      "gdp": 374.786,
      "growth": 1.4,
      "perCapita": 66835.0,
      "popChangePct": -0.07
    },
    {
      "year": 2030,
      "gdp": 388.605,
      "growth": 1.2,
      "perCapita": 69359.2,
      "popChangePct": -0.09
    },
    {
      "year": 2031,
      "gdp": 402.417,
      "growth": 1.2,
      "perCapita": 71893.7,
      "popChangePct": -0.11
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 47.692,
      "perCapitaPPP": 9995.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 52.879,
      "perCapitaPPP": 11044.6,
      "perCapitaPPPChangePct": 10.5,
      "popChangePct": 0.36
    },
    {
      "year": 1982,
      "gdpPPP": 57.88,
      "perCapitaPPP": 12028.0,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": 0.5
    },
    {
      "year": 1983,
      "gdpPPP": 62.025,
      "perCapitaPPP": 12810.5,
      "perCapitaPPPChangePct": 6.51,
      "popChangePct": 0.62
    },
    {
      "year": 1984,
      "gdpPPP": 66.328,
      "perCapitaPPP": 13620.2,
      "perCapitaPPPChangePct": 6.32,
      "popChangePct": 0.58
    },
    {
      "year": 1985,
      "gdpPPP": 70.846,
      "perCapitaPPP": 14476.8,
      "perCapitaPPPChangePct": 6.29,
      "popChangePct": 0.49
    },
    {
      "year": 1986,
      "gdpPPP": 74.242,
      "perCapitaPPP": 15118.6,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 0.35
    },
    {
      "year": 1987,
      "gdpPPP": 78.79,
      "perCapitaPPP": 15995.9,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.31
    },
    {
      "year": 1988,
      "gdpPPP": 85.819,
      "perCapitaPPP": 17377.2,
      "perCapitaPPPChangePct": 8.64,
      "popChangePct": 0.26
    },
    {
      "year": 1989,
      "gdpPPP": 93.721,
      "perCapitaPPP": 18916.9,
      "perCapitaPPPChangePct": 8.86,
      "popChangePct": 0.3
    },
    {
      "year": 1990,
      "gdpPPP": 97.434,
      "perCapitaPPP": 19587.2,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 0.4
    },
    {
      "year": 1991,
      "gdpPPP": 94.807,
      "perCapitaPPP": 18967.1,
      "perCapitaPPPChangePct": -3.17,
      "popChangePct": 0.48
    },
    {
      "year": 1992,
      "gdpPPP": 93.756,
      "perCapitaPPP": 18643.0,
      "perCapitaPPPChangePct": -1.71,
      "popChangePct": 0.62
    },
    {
      "year": 1993,
      "gdpPPP": 95.229,
      "perCapitaPPP": 18838.6,
      "perCapitaPPPChangePct": 1.05,
      "popChangePct": 0.52
    },
    {
      "year": 1994,
      "gdpPPP": 101.117,
      "perCapitaPPP": 19913.2,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 0.45
    },
    {
      "year": 1995,
      "gdpPPP": 107.607,
      "perCapitaPPP": 21104.5,
      "perCapitaPPPChangePct": 5.98,
      "popChangePct": 0.41
    },
    {
      "year": 1996,
      "gdpPPP": 113.589,
      "perCapitaPPP": 22199.2,
      "perCapitaPPPChangePct": 5.19,
      "popChangePct": 0.35
    },
    {
      "year": 1997,
      "gdpPPP": 122.94,
      "perCapitaPPP": 23954.2,
      "perCapitaPPPChangePct": 7.91,
      "popChangePct": 0.29
    },
    {
      "year": 1998,
      "gdpPPP": 131.103,
      "perCapitaPPP": 25470.0,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 0.29
    },
    {
      "year": 1999,
      "gdpPPP": 138.794,
      "perCapitaPPP": 26899.9,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 0.25
    },
    {
      "year": 2000,
      "gdpPPP": 150.104,
      "perCapitaPPP": 29026.4,
      "perCapitaPPPChangePct": 7.91,
      "popChangePct": 0.21
    },
    {
      "year": 2001,
      "gdpPPP": 157.537,
      "perCapitaPPP": 30405.9,
      "perCapitaPPPChangePct": 4.75,
      "popChangePct": 0.19
    },
    {
      "year": 2002,
      "gdpPPP": 162.684,
      "perCapitaPPP": 31316.1,
      "perCapitaPPPChangePct": 2.99,
      "popChangePct": 0.27
    },
    {
      "year": 2003,
      "gdpPPP": 169.233,
      "perCapitaPPP": 32505.5,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 0.21
    },
    {
      "year": 2004,
      "gdpPPP": 180.744,
      "perCapitaPPP": 34627.2,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 0.27
    },
    {
      "year": 2005,
      "gdpPPP": 191.59,
      "perCapitaPPP": 36586.7,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 0.33
    },
    {
      "year": 2006,
      "gdpPPP": 205.437,
      "perCapitaPPP": 39089.4,
      "perCapitaPPPChangePct": 6.84,
      "popChangePct": 0.36
    },
    {
      "year": 2007,
      "gdpPPP": 222.214,
      "perCapitaPPP": 42110.3,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 0.4
    },
    {
      "year": 2008,
      "gdpPPP": 228.27,
      "perCapitaPPP": 43066.0,
      "perCapitaPPPChangePct": 2.27,
      "popChangePct": 0.44
    },
    {
      "year": 2009,
      "gdpPPP": 211.13,
      "perCapitaPPP": 39639.0,
      "perCapitaPPPChangePct": -7.96,
      "popChangePct": 0.49
    },
    {
      "year": 2010,
      "gdpPPP": 220.465,
      "perCapitaPPP": 41197.4,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 0.47
    },
    {
      "year": 2011,
      "gdpPPP": 230.39,
      "perCapitaPPP": 42861.1,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 0.45
    },
    {
      "year": 2012,
      "gdpPPP": 231.105,
      "perCapitaPPP": 42787.2,
      "perCapitaPPPChangePct": -0.17,
      "popChangePct": 0.48
    },
    {
      "year": 2013,
      "gdpPPP": 232.736,
      "perCapitaPPP": 42887.4,
      "perCapitaPPPChangePct": 0.23,
      "popChangePct": 0.48
    },
    {
      "year": 2014,
      "gdpPPP": 235.657,
      "perCapitaPPP": 43229.8,
      "perCapitaPPPChangePct": 0.8,
      "popChangePct": 0.44
    },
    {
      "year": 2015,
      "gdpPPP": 238.954,
      "perCapitaPPP": 43670.5,
      "perCapitaPPPChangePct": 1.02,
      "popChangePct": 0.39
    },
    {
      "year": 2016,
      "gdpPPP": 247.429,
      "perCapitaPPP": 45091.1,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 0.27
    },
    {
      "year": 2017,
      "gdpPPP": 260.18,
      "perCapitaPPP": 47277.1,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 0.29
    },
    {
      "year": 2018,
      "gdpPPP": 271.632,
      "perCapitaPPP": 49270.1,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 0.18
    },
    {
      "year": 2019,
      "gdpPPP": 288.648,
      "perCapitaPPP": 52311.0,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 0.09
    },
    {
      "year": 2020,
      "gdpPPP": 294.706,
      "perCapitaPPP": 53337.6,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 0.13
    },
    {
      "year": 2021,
      "gdpPPP": 317.782,
      "perCapitaPPP": 57425.7,
      "perCapitaPPPChangePct": 7.66,
      "popChangePct": 0.16
    },
    {
      "year": 2022,
      "gdpPPP": 342.981,
      "perCapitaPPP": 61818.0,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": 0.25
    },
    {
      "year": 2023,
      "gdpPPP": 351.086,
      "perCapitaPPP": 63099.9,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 0.29
    },
    {
      "year": 2024,
      "gdpPPP": 361.15,
      "perCapitaPPP": 64446.7,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 0.72
    },
    {
      "year": 2025,
      "gdpPPP": 372.039,
      "perCapitaPPP": 66297.3,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 0.14
    },
    {
      "year": 2026,
      "gdpPPP": 386.703,
      "perCapitaPPP": 68861.3,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 0.07
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 401.146,
      "perCapitaPPP": 71432.6,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 413.359,
      "perCapitaPPP": 73657.9,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": -0.07
    },
    {
      "year": 2029,
      "gdpPPP": 426.585,
      "perCapitaPPP": 76072.1,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": -0.07
    },
    {
      "year": 2030,
      "gdpPPP": 439.587,
      "perCapitaPPP": 78458.6,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": -0.09
    },
    {
      "year": 2031,
      "gdpPPP": 452.771,
      "perCapitaPPP": 80889.7,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": -0.11
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function FinlandGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
