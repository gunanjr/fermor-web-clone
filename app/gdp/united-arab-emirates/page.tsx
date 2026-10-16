import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "United Arab Emirates",
  "slug": "united-arab-emirates",
  "iso3": "ARE",
  "region": "Asia",
  "rank2026": 30,
  "flagEmoji": "🇦🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Austria",
      "slug": "austria",
      "rank": 29
    },
    {
      "name": "Norway",
      "slug": "norway",
      "rank": 31
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 41.725,
      "growth": -1.8,
      "perCapita": 41311.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 46.461,
      "growth": 8,
      "perCapita": 42237.3,
      "popChangePct": 8.91
    },
    {
      "year": 1982,
      "gdp": 43.205,
      "growth": -7.2,
      "perCapita": 36927.3,
      "popChangePct": 6.36
    },
    {
      "year": 1983,
      "gdp": 39.588,
      "growth": -5.2,
      "perCapita": 32717.5,
      "popChangePct": 3.42
    },
    {
      "year": 1984,
      "gdp": 39.245,
      "growth": 4.5,
      "perCapita": 29957.8,
      "popChangePct": 8.26
    },
    {
      "year": 1985,
      "gdp": 38.519,
      "growth": -2.5,
      "perCapita": 27912.5,
      "popChangePct": 5.34
    },
    {
      "year": 1986,
      "gdp": 30.526,
      "growth": -19.3,
      "perCapita": 21198.7,
      "popChangePct": 4.35
    },
    {
      "year": 1987,
      "gdp": 33.519,
      "growth": 5.3,
      "perCapita": 22345.8,
      "popChangePct": 4.17
    },
    {
      "year": 1988,
      "gdp": 34.069,
      "growth": -2.6,
      "perCapita": 19032.9,
      "popChangePct": 19.33
    },
    {
      "year": 1989,
      "gdp": 39.325,
      "growth": 15.7,
      "perCapita": 21142.5,
      "popChangePct": 3.91
    },
    {
      "year": 1990,
      "gdp": 50.682,
      "growth": 23.6,
      "perCapita": 27484.6,
      "popChangePct": -0.86
    },
    {
      "year": 1991,
      "gdp": 49.3,
      "growth": 2.2,
      "perCapita": 25577.0,
      "popChangePct": 4.56
    },
    {
      "year": 1992,
      "gdp": 51.952,
      "growth": 3.1,
      "perCapita": 25833.8,
      "popChangePct": 4.3
    },
    {
      "year": 1993,
      "gdp": 52.144,
      "growth": 0.3,
      "perCapita": 25033.0,
      "popChangePct": 3.58
    },
    {
      "year": 1994,
      "gdp": 57.395,
      "growth": 7.4,
      "perCapita": 25737.5,
      "popChangePct": 7.06
    },
    {
      "year": 1995,
      "gdp": 63.432,
      "growth": 6.6,
      "perCapita": 26309.3,
      "popChangePct": 8.12
    },
    {
      "year": 1996,
      "gdp": 72.853,
      "growth": 5.4,
      "perCapita": 29821.1,
      "popChangePct": 1.33
    },
    {
      "year": 1997,
      "gdp": 77.167,
      "growth": 8.6,
      "perCapita": 29909.6,
      "popChangePct": 5.61
    },
    {
      "year": 1998,
      "gdp": 75.304,
      "growth": 0.9,
      "perCapita": 26571.6,
      "popChangePct": 9.84
    },
    {
      "year": 1999,
      "gdp": 84.42,
      "growth": 3.8,
      "perCapita": 27833.7,
      "popChangePct": 7.02
    },
    {
      "year": 2000,
      "gdp": 102.987,
      "growth": 12.3,
      "perCapita": 32495.9,
      "popChangePct": 4.48
    },
    {
      "year": 2001,
      "gdp": 103.312,
      "growth": 1.4,
      "perCapita": 30877.7,
      "popChangePct": 5.59
    },
    {
      "year": 2002,
      "gdp": 109.816,
      "growth": 2.4,
      "perCapita": 30969.0,
      "popChangePct": 5.98
    },
    {
      "year": 2003,
      "gdp": 124.346,
      "growth": 8.8,
      "perCapita": 32166.9,
      "popChangePct": 9.02
    },
    {
      "year": 2004,
      "gdp": 147.812,
      "growth": 9.6,
      "perCapita": 34944.8,
      "popChangePct": 9.42
    },
    {
      "year": 2005,
      "gdp": 180.616,
      "growth": 4.9,
      "perCapita": 39389.2,
      "popChangePct": 8.39
    },
    {
      "year": 2006,
      "gdp": 222.117,
      "growth": 9.8,
      "perCapita": 45239.6,
      "popChangePct": 7.09
    },
    {
      "year": 2007,
      "gdp": 257.883,
      "growth": 3.2,
      "perCapita": 46090.4,
      "popChangePct": 13.95
    },
    {
      "year": 2008,
      "gdp": 315.464,
      "growth": 3.2,
      "perCapita": 48548.6,
      "popChangePct": 16.14
    },
    {
      "year": 2009,
      "gdp": 253.547,
      "growth": -5.2,
      "perCapita": 37428.4,
      "popChangePct": 4.25
    },
    {
      "year": 2010,
      "gdp": 307.736,
      "growth": 7.9,
      "perCapita": 44180.2,
      "popChangePct": 2.82
    },
    {
      "year": 2011,
      "gdp": 368.881,
      "growth": 6.7,
      "perCapita": 50925.2,
      "popChangePct": 4.01
    },
    {
      "year": 2012,
      "gdp": 392.793,
      "growth": 4.7,
      "perCapita": 52099.4,
      "popChangePct": 4.07
    },
    {
      "year": 2013,
      "gdp": 409.633,
      "growth": 4.9,
      "perCapita": 52204.1,
      "popChangePct": 4.09
    },
    {
      "year": 2014,
      "gdp": 424.936,
      "growth": 4.6,
      "perCapita": 51369.6,
      "popChangePct": 5.42
    },
    {
      "year": 2015,
      "gdp": 381.973,
      "growth": 7.1,
      "perCapita": 43712.3,
      "popChangePct": 5.63
    },
    {
      "year": 2016,
      "gdp": 381.717,
      "growth": 5.7,
      "perCapita": 41800.7,
      "popChangePct": 4.51
    },
    {
      "year": 2017,
      "gdp": 403.365,
      "growth": -1.1,
      "perCapita": 43304.5,
      "popChangePct": 2.0
    },
    {
      "year": 2018,
      "gdp": 440.56,
      "growth": 1.5,
      "perCapita": 46974.1,
      "popChangePct": 0.69
    },
    {
      "year": 2019,
      "gdp": 433.926,
      "growth": 1.3,
      "perCapita": 45615.1,
      "popChangePct": 1.43
    },
    {
      "year": 2020,
      "gdp": 357.162,
      "growth": -8.7,
      "perCapita": 38448.8,
      "popChangePct": -2.35
    },
    {
      "year": 2021,
      "gdp": 422.441,
      "growth": 4.6,
      "perCapita": 42839.6,
      "popChangePct": 6.16
    },
    {
      "year": 2022,
      "gdp": 511.403,
      "growth": 7.5,
      "perCapita": 49704.2,
      "popChangePct": 4.34
    },
    {
      "year": 2023,
      "gdp": 522.622,
      "growth": 4.3,
      "perCapita": 48941.3,
      "popChangePct": 3.79
    },
    {
      "year": 2024,
      "gdp": 552.325,
      "growth": 4,
      "perCapita": 48905.8,
      "popChangePct": 5.76
    },
    {
      "year": 2025,
      "gdp": 571.643,
      "growth": 5.8,
      "perCapita": 50231.6,
      "popChangePct": 0.76
    },
    {
      "year": 2026,
      "gdp": 621.546,
      "growth": 3.1,
      "perCapita": 54214.4,
      "popChangePct": 0.75
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 648.673,
      "growth": 5.3,
      "perCapita": 56178.8,
      "popChangePct": 0.72
    },
    {
      "year": 2028,
      "gdp": 686.352,
      "growth": 4.6,
      "perCapita": 59035.1,
      "popChangePct": 0.68
    },
    {
      "year": 2029,
      "gdp": 727.722,
      "growth": 4.4,
      "perCapita": 62179.1,
      "popChangePct": 0.67
    },
    {
      "year": 2030,
      "gdp": 770.217,
      "growth": 4,
      "perCapita": 65387.4,
      "popChangePct": 0.64
    },
    {
      "year": 2031,
      "gdp": 815.049,
      "growth": 4,
      "perCapita": 69186.5,
      "popChangePct": 0.01
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 64.139,
      "perCapitaPPP": 63504.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 75.841,
      "perCapitaPPP": 68946.5,
      "perCapitaPPPChangePct": 8.57,
      "popChangePct": 8.91
    },
    {
      "year": 1982,
      "gdpPPP": 74.739,
      "perCapitaPPP": 63879.4,
      "perCapitaPPPChangePct": -7.35,
      "popChangePct": 6.36
    },
    {
      "year": 1983,
      "gdpPPP": 73.588,
      "perCapitaPPP": 60816.9,
      "perCapitaPPPChangePct": -4.79,
      "popChangePct": 3.42
    },
    {
      "year": 1984,
      "gdpPPP": 79.638,
      "perCapitaPPP": 60792.1,
      "perCapitaPPPChangePct": -0.04,
      "popChangePct": 8.26
    },
    {
      "year": 1985,
      "gdpPPP": 80.084,
      "perCapitaPPP": 58032.1,
      "perCapitaPPPChangePct": -4.54,
      "popChangePct": 5.34
    },
    {
      "year": 1986,
      "gdpPPP": 65.955,
      "perCapitaPPP": 45802.0,
      "perCapitaPPPChangePct": -21.07,
      "popChangePct": 4.35
    },
    {
      "year": 1987,
      "gdpPPP": 71.174,
      "perCapitaPPP": 47449.4,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": 4.17
    },
    {
      "year": 1988,
      "gdpPPP": 71.751,
      "perCapitaPPP": 40084.5,
      "perCapitaPPPChangePct": -15.52,
      "popChangePct": 19.33
    },
    {
      "year": 1989,
      "gdpPPP": 86.296,
      "perCapitaPPP": 46395.7,
      "perCapitaPPPChangePct": 15.74,
      "popChangePct": 3.91
    },
    {
      "year": 1990,
      "gdpPPP": 110.62,
      "perCapitaPPP": 59989.0,
      "perCapitaPPPChangePct": 29.3,
      "popChangePct": -0.86
    },
    {
      "year": 1991,
      "gdpPPP": 116.85,
      "perCapitaPPP": 60622.4,
      "perCapitaPPPChangePct": 1.06,
      "popChangePct": 4.56
    },
    {
      "year": 1992,
      "gdpPPP": 123.27,
      "perCapitaPPP": 61297.9,
      "perCapitaPPPChangePct": 1.11,
      "popChangePct": 4.3
    },
    {
      "year": 1993,
      "gdpPPP": 126.522,
      "perCapitaPPP": 60740.5,
      "perCapitaPPPChangePct": -0.91,
      "popChangePct": 3.58
    },
    {
      "year": 1994,
      "gdpPPP": 138.85,
      "perCapitaPPP": 62264.4,
      "perCapitaPPPChangePct": 2.51,
      "popChangePct": 7.06
    },
    {
      "year": 1995,
      "gdpPPP": 151.157,
      "perCapitaPPP": 62694.9,
      "perCapitaPPPChangePct": 0.69,
      "popChangePct": 8.12
    },
    {
      "year": 1996,
      "gdpPPP": 162.236,
      "perCapitaPPP": 66408.4,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": 1.33
    },
    {
      "year": 1997,
      "gdpPPP": 179.172,
      "perCapitaPPP": 69446.6,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 5.61
    },
    {
      "year": 1998,
      "gdpPPP": 182.776,
      "perCapitaPPP": 64494.1,
      "perCapitaPPPChangePct": -7.13,
      "popChangePct": 9.84
    },
    {
      "year": 1999,
      "gdpPPP": 192.462,
      "perCapitaPPP": 63456.0,
      "perCapitaPPPChangePct": -1.61,
      "popChangePct": 7.02
    },
    {
      "year": 2000,
      "gdpPPP": 221.073,
      "perCapitaPPP": 69756.4,
      "perCapitaPPPChangePct": 9.93,
      "popChangePct": 4.48
    },
    {
      "year": 2001,
      "gdpPPP": 229.214,
      "perCapitaPPP": 68507.1,
      "perCapitaPPPChangePct": -1.79,
      "popChangePct": 5.59
    },
    {
      "year": 2002,
      "gdpPPP": 238.44,
      "perCapitaPPP": 67242.0,
      "perCapitaPPPChangePct": -1.85,
      "popChangePct": 5.98
    },
    {
      "year": 2003,
      "gdpPPP": 264.546,
      "perCapitaPPP": 68434.8,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 9.02
    },
    {
      "year": 2004,
      "gdpPPP": 297.647,
      "perCapitaPPP": 70368.2,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 9.42
    },
    {
      "year": 2005,
      "gdpPPP": 321.885,
      "perCapitaPPP": 70197.5,
      "perCapitaPPPChangePct": -0.24,
      "popChangePct": 8.39
    },
    {
      "year": 2006,
      "gdpPPP": 364.453,
      "perCapitaPPP": 74230.0,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": 7.09
    },
    {
      "year": 2007,
      "gdpPPP": 386.247,
      "perCapitaPPP": 69032.5,
      "perCapitaPPPChangePct": -7.0,
      "popChangePct": 13.95
    },
    {
      "year": 2008,
      "gdpPPP": 406.254,
      "perCapitaPPP": 62520.9,
      "perCapitaPPPChangePct": -9.43,
      "popChangePct": 16.14
    },
    {
      "year": 2009,
      "gdpPPP": 387.328,
      "perCapitaPPP": 57177.1,
      "perCapitaPPPChangePct": -8.55,
      "popChangePct": 4.25
    },
    {
      "year": 2010,
      "gdpPPP": 423.127,
      "perCapitaPPP": 60746.2,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 2.82
    },
    {
      "year": 2011,
      "gdpPPP": 460.949,
      "perCapitaPPP": 63635.4,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 4.01
    },
    {
      "year": 2012,
      "gdpPPP": 491.521,
      "perCapitaPPP": 65194.4,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 4.07
    },
    {
      "year": 2013,
      "gdpPPP": 524.473,
      "perCapitaPPP": 66839.5,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 4.09
    },
    {
      "year": 2014,
      "gdpPPP": 558.33,
      "perCapitaPPP": 67495.3,
      "perCapitaPPPChangePct": 0.98,
      "popChangePct": 5.42
    },
    {
      "year": 2015,
      "gdpPPP": 603.451,
      "perCapitaPPP": 69057.8,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 5.63
    },
    {
      "year": 2016,
      "gdpPPP": 643.652,
      "perCapitaPPP": 70484.4,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 4.51
    },
    {
      "year": 2017,
      "gdpPPP": 648.226,
      "perCapitaPPP": 69592.4,
      "perCapitaPPPChangePct": -1.27,
      "popChangePct": 2.0
    },
    {
      "year": 2018,
      "gdpPPP": 723.867,
      "perCapitaPPP": 77181.2,
      "perCapitaPPPChangePct": 10.9,
      "popChangePct": 0.69
    },
    {
      "year": 2019,
      "gdpPPP": 753.928,
      "perCapitaPPP": 79254.2,
      "perCapitaPPPChangePct": 2.69,
      "popChangePct": 1.43
    },
    {
      "year": 2020,
      "gdpPPP": 627.902,
      "perCapitaPPP": 67594.1,
      "perCapitaPPPChangePct": -14.71,
      "popChangePct": -2.35
    },
    {
      "year": 2021,
      "gdpPPP": 656.665,
      "perCapitaPPP": 66592.1,
      "perCapitaPPPChangePct": -1.48,
      "popChangePct": 6.16
    },
    {
      "year": 2022,
      "gdpPPP": 756.225,
      "perCapitaPPP": 73498.8,
      "perCapitaPPPChangePct": 10.37,
      "popChangePct": 4.34
    },
    {
      "year": 2023,
      "gdpPPP": 817.935,
      "perCapitaPPP": 76596.1,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 3.79
    },
    {
      "year": 2024,
      "gdpPPP": 871.702,
      "perCapitaPPP": 77185.2,
      "perCapitaPPPChangePct": 0.77,
      "popChangePct": 5.76
    },
    {
      "year": 2025,
      "gdpPPP": 948.457,
      "perCapitaPPP": 83343.1,
      "perCapitaPPPChangePct": 7.98,
      "popChangePct": 0.76
    },
    {
      "year": 2026,
      "gdpPPP": 1006.293,
      "perCapitaPPP": 87773.9,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 0.75
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1082.55,
      "perCapitaPPP": 93754.9,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 0.72
    },
    {
      "year": 2028,
      "gdpPPP": 1151.248,
      "perCapitaPPP": 99022.1,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 0.68
    },
    {
      "year": 2029,
      "gdpPPP": 1222.958,
      "perCapitaPPP": 104493.6,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 0.67
    },
    {
      "year": 2030,
      "gdpPPP": 1295.642,
      "perCapitaPPP": 109993.2,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": 0.64
    },
    {
      "year": 2031,
      "gdpPPP": 1372.314,
      "perCapitaPPP": 116490.6,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 0.01
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function UnitedArabEmiratesGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
