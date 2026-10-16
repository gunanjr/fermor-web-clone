import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Romania",
  "slug": "romania",
  "iso3": "ROU",
  "region": "Europe",
  "rank2026": 39,
  "flagEmoji": "🇷🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Denmark",
      "slug": "denmark",
      "rank": 38
    },
    {
      "name": "South Africa",
      "slug": "south-africa",
      "rank": 40
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 46.053,
      "growth": 3.3,
      "perCapita": 2052.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 55.319,
      "growth": 0.1,
      "perCapita": 2450.4,
      "popChangePct": 0.6
    },
    {
      "year": 1982,
      "gdp": 55.375,
      "growth": 3.9,
      "perCapita": 2441.2,
      "popChangePct": 0.47
    },
    {
      "year": 1983,
      "gdp": 48.401,
      "growth": 6,
      "perCapita": 2125.2,
      "popChangePct": 0.41
    },
    {
      "year": 1984,
      "gdp": 39.111,
      "growth": 6,
      "perCapita": 1710.3,
      "popChangePct": 0.41
    },
    {
      "year": 1985,
      "gdp": 48.286,
      "growth": -0.1,
      "perCapita": 2102.0,
      "popChangePct": 0.45
    },
    {
      "year": 1986,
      "gdp": 52.29,
      "growth": 2.4,
      "perCapita": 2264.4,
      "popChangePct": 0.53
    },
    {
      "year": 1987,
      "gdp": 58.477,
      "growth": 0.8,
      "perCapita": 2517.9,
      "popChangePct": 0.57
    },
    {
      "year": 1988,
      "gdp": 60.538,
      "growth": -0.5,
      "perCapita": 2593.1,
      "popChangePct": 0.53
    },
    {
      "year": 1989,
      "gdp": 54.236,
      "growth": -5.8,
      "perCapita": 2314.7,
      "popChangePct": 0.36
    },
    {
      "year": 1990,
      "gdp": 38.516,
      "growth": -5.6,
      "perCapita": 1641.9,
      "popChangePct": 0.12
    },
    {
      "year": 1991,
      "gdp": 29.07,
      "growth": -12.9,
      "perCapita": 1241.1,
      "popChangePct": -0.15
    },
    {
      "year": 1992,
      "gdp": 19.779,
      "growth": -8.8,
      "perCapita": 847.7,
      "popChangePct": -0.38
    },
    {
      "year": 1993,
      "gdp": 26.624,
      "growth": 1.5,
      "perCapita": 1147.3,
      "popChangePct": -0.55
    },
    {
      "year": 1994,
      "gdp": 30.376,
      "growth": 3.9,
      "perCapita": 1317.0,
      "popChangePct": -0.61
    },
    {
      "year": 1995,
      "gdp": 35.838,
      "growth": 7.1,
      "perCapita": 1563.1,
      "popChangePct": -0.59
    },
    {
      "year": 1996,
      "gdp": 35.692,
      "growth": 3.9,
      "perCapita": 1565.5,
      "popChangePct": -0.55
    },
    {
      "year": 1997,
      "gdp": 35.644,
      "growth": -6.1,
      "perCapita": 1571.7,
      "popChangePct": -0.53
    },
    {
      "year": 1998,
      "gdp": 42.543,
      "growth": -4.8,
      "perCapita": 1885.3,
      "popChangePct": -0.5
    },
    {
      "year": 1999,
      "gdp": 35.953,
      "growth": -1.2,
      "perCapita": 1600.9,
      "popChangePct": -0.47
    },
    {
      "year": 2000,
      "gdp": 37.447,
      "growth": 2.9,
      "perCapita": 1667.6,
      "popChangePct": -0.01
    },
    {
      "year": 2001,
      "gdp": 40.396,
      "growth": 5.2,
      "perCapita": 1801.0,
      "popChangePct": -0.11
    },
    {
      "year": 2002,
      "gdp": 46.035,
      "growth": 5.7,
      "perCapita": 2108.4,
      "popChangePct": -2.66
    },
    {
      "year": 2003,
      "gdp": 57.79,
      "growth": 2.3,
      "perCapita": 2672.1,
      "popChangePct": -0.94
    },
    {
      "year": 2004,
      "gdp": 75.059,
      "growth": 10.4,
      "perCapita": 3487.7,
      "popChangePct": -0.49
    },
    {
      "year": 2005,
      "gdp": 98.547,
      "growth": 4.7,
      "perCapita": 4608.8,
      "popChangePct": -0.65
    },
    {
      "year": 2006,
      "gdp": 122.114,
      "growth": 8,
      "perCapita": 5744.6,
      "popChangePct": -0.58
    },
    {
      "year": 2007,
      "gdp": 174.831,
      "growth": 7.2,
      "perCapita": 8273.9,
      "popChangePct": -0.59
    },
    {
      "year": 2008,
      "gdp": 215.567,
      "growth": 9.3,
      "perCapita": 10446.4,
      "popChangePct": -2.35
    },
    {
      "year": 2009,
      "gdp": 174.572,
      "growth": -5.5,
      "perCapita": 8540.6,
      "popChangePct": -0.94
    },
    {
      "year": 2010,
      "gdp": 170.329,
      "growth": -3.9,
      "perCapita": 8392.8,
      "popChangePct": -0.71
    },
    {
      "year": 2011,
      "gdp": 192.846,
      "growth": 4.5,
      "perCapita": 9547.3,
      "popChangePct": -0.47
    },
    {
      "year": 2012,
      "gdp": 179.228,
      "growth": 1.9,
      "perCapita": 8918.6,
      "popChangePct": -0.51
    },
    {
      "year": 2013,
      "gdp": 189.839,
      "growth": 0.3,
      "perCapita": 9482.4,
      "popChangePct": -0.38
    },
    {
      "year": 2014,
      "gdp": 199.989,
      "growth": 4.1,
      "perCapita": 10025.9,
      "popChangePct": -0.36
    },
    {
      "year": 2015,
      "gdp": 177.878,
      "growth": 3.2,
      "perCapita": 8951.8,
      "popChangePct": -0.38
    },
    {
      "year": 2016,
      "gdp": 185.337,
      "growth": 2.9,
      "perCapita": 9379.1,
      "popChangePct": -0.55
    },
    {
      "year": 2017,
      "gdp": 210.53,
      "growth": 8.2,
      "perCapita": 10717.3,
      "popChangePct": -0.59
    },
    {
      "year": 2018,
      "gdp": 241.973,
      "growth": 5.4,
      "perCapita": 12387.6,
      "popChangePct": -0.57
    },
    {
      "year": 2019,
      "gdp": 250.056,
      "growth": 4,
      "perCapita": 12879.9,
      "popChangePct": -0.61
    },
    {
      "year": 2020,
      "gdp": 250.961,
      "growth": -3.6,
      "perCapita": 12983.8,
      "popChangePct": -0.44
    },
    {
      "year": 2021,
      "gdp": 285.275,
      "growth": 5.6,
      "perCapita": 14856.8,
      "popChangePct": -0.66
    },
    {
      "year": 2022,
      "gdp": 295.891,
      "growth": 4.2,
      "perCapita": 15538.0,
      "popChangePct": -0.83
    },
    {
      "year": 2023,
      "gdp": 347.829,
      "growth": 2.3,
      "perCapita": 18253.7,
      "popChangePct": 0.06
    },
    {
      "year": 2024,
      "gdp": 382.65,
      "growth": 0.9,
      "perCapita": 20199.2,
      "popChangePct": -0.58
    },
    {
      "year": 2025,
      "gdp": 427.941,
      "growth": 0.7,
      "perCapita": 22724.5,
      "popChangePct": -0.59
    },
    {
      "year": 2026,
      "gdp": 480.834,
      "growth": 0.7,
      "perCapita": 25693.0,
      "popChangePct": -0.62
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 511.274,
      "growth": 2.5,
      "perCapita": 27497.8,
      "popChangePct": -0.65
    },
    {
      "year": 2028,
      "gdp": 546.987,
      "growth": 2.7,
      "perCapita": 29620.4,
      "popChangePct": -0.68
    },
    {
      "year": 2029,
      "gdp": 579.249,
      "growth": 2.9,
      "perCapita": 31581.0,
      "popChangePct": -0.68
    },
    {
      "year": 2030,
      "gdp": 613.798,
      "growth": 3.1,
      "perCapita": 33690.8,
      "popChangePct": -0.67
    },
    {
      "year": 2031,
      "gdp": 648.39,
      "growth": 3.1,
      "perCapita": 35827.9,
      "popChangePct": -0.67
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 118.891,
      "perCapitaPPP": 5297.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 130.269,
      "perCapitaPPP": 5770.2,
      "perCapitaPPPChangePct": 8.92,
      "popChangePct": 0.6
    },
    {
      "year": 1982,
      "gdpPPP": 143.714,
      "perCapitaPPP": 6335.7,
      "perCapitaPPPChangePct": 9.8,
      "popChangePct": 0.47
    },
    {
      "year": 1983,
      "gdpPPP": 158.302,
      "perCapitaPPP": 6950.7,
      "perCapitaPPPChangePct": 9.71,
      "popChangePct": 0.41
    },
    {
      "year": 1984,
      "gdpPPP": 173.856,
      "perCapitaPPP": 7602.7,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": 0.41
    },
    {
      "year": 1985,
      "gdpPPP": 179.175,
      "perCapitaPPP": 7799.9,
      "perCapitaPPPChangePct": 2.59,
      "popChangePct": 0.45
    },
    {
      "year": 1986,
      "gdpPPP": 187.169,
      "perCapitaPPP": 8105.1,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 0.53
    },
    {
      "year": 1987,
      "gdpPPP": 193.341,
      "perCapitaPPP": 8325.0,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 0.57
    },
    {
      "year": 1988,
      "gdpPPP": 199.159,
      "perCapitaPPP": 8530.7,
      "perCapitaPPPChangePct": 2.47,
      "popChangePct": 0.53
    },
    {
      "year": 1989,
      "gdpPPP": 194.965,
      "perCapitaPPP": 8321.0,
      "perCapitaPPPChangePct": -2.46,
      "popChangePct": 0.36
    },
    {
      "year": 1990,
      "gdpPPP": 190.909,
      "perCapitaPPP": 8138.1,
      "perCapitaPPPChangePct": -2.2,
      "popChangePct": 0.12
    },
    {
      "year": 1991,
      "gdpPPP": 171.853,
      "perCapitaPPP": 7336.9,
      "perCapitaPPPChangePct": -9.85,
      "popChangePct": -0.15
    },
    {
      "year": 1992,
      "gdpPPP": 160.361,
      "perCapitaPPP": 6872.6,
      "perCapitaPPPChangePct": -6.33,
      "popChangePct": -0.38
    },
    {
      "year": 1993,
      "gdpPPP": 166.669,
      "perCapitaPPP": 7182.3,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": -0.55
    },
    {
      "year": 1994,
      "gdpPPP": 176.922,
      "perCapitaPPP": 7670.9,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": -0.61
    },
    {
      "year": 1995,
      "gdpPPP": 193.525,
      "perCapitaPPP": 8440.9,
      "perCapitaPPPChangePct": 10.04,
      "popChangePct": -0.59
    },
    {
      "year": 1996,
      "gdpPPP": 204.849,
      "perCapitaPPP": 8984.7,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": -0.55
    },
    {
      "year": 1997,
      "gdpPPP": 195.768,
      "perCapitaPPP": 8632.3,
      "perCapitaPPPChangePct": -3.92,
      "popChangePct": -0.53
    },
    {
      "year": 1998,
      "gdpPPP": 188.431,
      "perCapitaPPP": 8350.6,
      "perCapitaPPPChangePct": -3.26,
      "popChangePct": -0.5
    },
    {
      "year": 1999,
      "gdpPPP": 188.9,
      "perCapitaPPP": 8411.2,
      "perCapitaPPPChangePct": 0.73,
      "popChangePct": -0.47
    },
    {
      "year": 2000,
      "gdpPPP": 198.821,
      "perCapitaPPP": 8854.0,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": -0.01
    },
    {
      "year": 2001,
      "gdpPPP": 213.906,
      "perCapitaPPP": 9536.4,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": -0.11
    },
    {
      "year": 2002,
      "gdpPPP": 229.619,
      "perCapitaPPP": 10516.8,
      "perCapitaPPPChangePct": 10.28,
      "popChangePct": -2.66
    },
    {
      "year": 2003,
      "gdpPPP": 239.634,
      "perCapitaPPP": 11080.0,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": -0.94
    },
    {
      "year": 2004,
      "gdpPPP": 271.738,
      "perCapitaPPP": 12626.6,
      "perCapitaPPPChangePct": 13.96,
      "popChangePct": -0.49
    },
    {
      "year": 2005,
      "gdpPPP": 293.342,
      "perCapitaPPP": 13718.9,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": -0.65
    },
    {
      "year": 2006,
      "gdpPPP": 326.667,
      "perCapitaPPP": 15367.5,
      "perCapitaPPPChangePct": 12.02,
      "popChangePct": -0.58
    },
    {
      "year": 2007,
      "gdpPPP": 359.788,
      "perCapitaPPP": 17027.0,
      "perCapitaPPPChangePct": 10.8,
      "popChangePct": -0.59
    },
    {
      "year": 2008,
      "gdpPPP": 400.851,
      "perCapitaPPP": 19425.4,
      "perCapitaPPPChangePct": 14.09,
      "popChangePct": -2.35
    },
    {
      "year": 2009,
      "gdpPPP": 381.073,
      "perCapitaPPP": 18643.2,
      "perCapitaPPPChangePct": -4.03,
      "popChangePct": -0.94
    },
    {
      "year": 2010,
      "gdpPPP": 370.64,
      "perCapitaPPP": 18262.9,
      "perCapitaPPPChangePct": -2.04,
      "popChangePct": -0.71
    },
    {
      "year": 2011,
      "gdpPPP": 395.293,
      "perCapitaPPP": 19569.9,
      "perCapitaPPPChangePct": 7.16,
      "popChangePct": -0.47
    },
    {
      "year": 2012,
      "gdpPPP": 410.318,
      "perCapitaPPP": 20417.9,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": -0.51
    },
    {
      "year": 2013,
      "gdpPPP": 418.465,
      "perCapitaPPP": 20902.3,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": -0.38
    },
    {
      "year": 2014,
      "gdpPPP": 443.278,
      "perCapitaPPP": 22222.4,
      "perCapitaPPPChangePct": 6.32,
      "popChangePct": -0.36
    },
    {
      "year": 2015,
      "gdpPPP": 461.516,
      "perCapitaPPP": 23226.0,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": -0.38
    },
    {
      "year": 2016,
      "gdpPPP": 479.226,
      "perCapitaPPP": 24251.6,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": -0.55
    },
    {
      "year": 2017,
      "gdpPPP": 527.787,
      "perCapitaPPP": 26867.6,
      "perCapitaPPPChangePct": 10.79,
      "popChangePct": -0.59
    },
    {
      "year": 2018,
      "gdpPPP": 572.2,
      "perCapitaPPP": 29293.3,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": -0.57
    },
    {
      "year": 2019,
      "gdpPPP": 647.503,
      "perCapitaPPP": 33351.6,
      "perCapitaPPPChangePct": 13.85,
      "popChangePct": -0.61
    },
    {
      "year": 2020,
      "gdpPPP": 658.755,
      "perCapitaPPP": 34081.4,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": -0.44
    },
    {
      "year": 2021,
      "gdpPPP": 724.206,
      "perCapitaPPP": 37715.8,
      "perCapitaPPPChangePct": 10.66,
      "popChangePct": -0.66
    },
    {
      "year": 2022,
      "gdpPPP": 808.199,
      "perCapitaPPP": 42440.5,
      "perCapitaPPPChangePct": 12.53,
      "popChangePct": -0.83
    },
    {
      "year": 2023,
      "gdpPPP": 857.024,
      "perCapitaPPP": 44975.8,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 0.06
    },
    {
      "year": 2024,
      "gdpPPP": 886.346,
      "perCapitaPPP": 46788.0,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": -0.58
    },
    {
      "year": 2025,
      "gdpPPP": 917.55,
      "perCapitaPPP": 48723.7,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": -0.59
    },
    {
      "year": 2026,
      "gdpPPP": 950.384,
      "perCapitaPPP": 50783.0,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": -0.62
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 995.071,
      "perCapitaPPP": 53517.7,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": -0.65
    },
    {
      "year": 2028,
      "gdpPPP": 1038.722,
      "perCapitaPPP": 56248.7,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": -0.68
    },
    {
      "year": 2029,
      "gdpPPP": 1087.457,
      "perCapitaPPP": 59288.7,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": -0.68
    },
    {
      "year": 2030,
      "gdpPPP": 1141.587,
      "perCapitaPPP": 62660.7,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": -0.67
    },
    {
      "year": 2031,
      "gdpPPP": 1197.86,
      "perCapitaPPP": 66189.8,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": -0.67
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function RomaniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
