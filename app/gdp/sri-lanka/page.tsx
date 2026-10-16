import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Sri Lanka",
  "slug": "sri-lanka",
  "iso3": "LKA",
  "region": "Asia",
  "rank2026": 83,
  "flagEmoji": "🇱🇰",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Belarus",
      "slug": "belarus",
      "rank": 82
    },
    {
      "name": "Uruguay",
      "slug": "uruguay",
      "rank": 84
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 5.194,
      "growth": 5.8,
      "perCapita": 333.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 5.404,
      "growth": 5.3,
      "perCapita": 342.8,
      "popChangePct": 1.35
    },
    {
      "year": 1982,
      "gdp": 5.834,
      "growth": 5.2,
      "perCapita": 365.5,
      "popChangePct": 1.26
    },
    {
      "year": 1983,
      "gdp": 6.298,
      "growth": 3.3,
      "perCapita": 390.0,
      "popChangePct": 1.17
    },
    {
      "year": 1984,
      "gdp": 7.382,
      "growth": 6.7,
      "perCapita": 452.3,
      "popChangePct": 1.08
    },
    {
      "year": 1985,
      "gdp": 7.302,
      "growth": 5,
      "perCapita": 443.0,
      "popChangePct": 0.98
    },
    {
      "year": 1986,
      "gdp": 7.826,
      "growth": 4.3,
      "perCapita": 470.1,
      "popChangePct": 0.99
    },
    {
      "year": 1987,
      "gdp": 8.149,
      "growth": 1.5,
      "perCapita": 484.7,
      "popChangePct": 1.0
    },
    {
      "year": 1988,
      "gdp": 8.518,
      "growth": 2.7,
      "perCapita": 501.6,
      "popChangePct": 1.01
    },
    {
      "year": 1989,
      "gdp": 8.55,
      "growth": 2.3,
      "perCapita": 498.5,
      "popChangePct": 1.01
    },
    {
      "year": 1990,
      "gdp": 9.787,
      "growth": 6.2,
      "perCapita": 564.9,
      "popChangePct": 1.02
    },
    {
      "year": 1991,
      "gdp": 10.716,
      "growth": 10.8,
      "perCapita": 611.1,
      "popChangePct": 1.21
    },
    {
      "year": 1992,
      "gdp": 11.553,
      "growth": -3.1,
      "perCapita": 651.3,
      "popChangePct": 1.15
    },
    {
      "year": 1993,
      "gdp": 12.351,
      "growth": 7.5,
      "perCapita": 689.0,
      "popChangePct": 1.06
    },
    {
      "year": 1994,
      "gdp": 14.245,
      "growth": 8,
      "perCapita": 787.3,
      "popChangePct": 0.94
    },
    {
      "year": 1995,
      "gdp": 15.127,
      "growth": 6.1,
      "perCapita": 829.2,
      "popChangePct": 0.82
    },
    {
      "year": 1996,
      "gdp": 16.592,
      "growth": 12.2,
      "perCapita": 903.3,
      "popChangePct": 0.68
    },
    {
      "year": 1997,
      "gdp": 18.544,
      "growth": 10.3,
      "perCapita": 1003.9,
      "popChangePct": 0.57
    },
    {
      "year": 1998,
      "gdp": 19.05,
      "growth": -1.6,
      "perCapita": 1026.2,
      "popChangePct": 0.51
    },
    {
      "year": 1999,
      "gdp": 19.143,
      "growth": 2.9,
      "perCapita": 1025.7,
      "popChangePct": 0.53
    },
    {
      "year": 2000,
      "gdp": 20.007,
      "growth": 8.4,
      "perCapita": 1065.5,
      "popChangePct": 0.62
    },
    {
      "year": 2001,
      "gdp": 19.236,
      "growth": -1.9,
      "perCapita": 1017.2,
      "popChangePct": 0.71
    },
    {
      "year": 2002,
      "gdp": 20.238,
      "growth": 3.7,
      "perCapita": 1061.7,
      "popChangePct": 0.79
    },
    {
      "year": 2003,
      "gdp": 22.352,
      "growth": 5.9,
      "perCapita": 1162.7,
      "popChangePct": 0.85
    },
    {
      "year": 2004,
      "gdp": 24.423,
      "growth": 5.4,
      "perCapita": 1259.8,
      "popChangePct": 0.85
    },
    {
      "year": 2005,
      "gdp": 28.88,
      "growth": 6.2,
      "perCapita": 1477.6,
      "popChangePct": 0.81
    },
    {
      "year": 2006,
      "gdp": 33.447,
      "growth": 7.7,
      "perCapita": 1698.2,
      "popChangePct": 0.77
    },
    {
      "year": 2007,
      "gdp": 38.27,
      "growth": 6.8,
      "perCapita": 1928.7,
      "popChangePct": 0.74
    },
    {
      "year": 2008,
      "gdp": 48.177,
      "growth": 6,
      "perCapita": 2410.8,
      "popChangePct": 0.72
    },
    {
      "year": 2009,
      "gdp": 49.75,
      "growth": 3.5,
      "perCapita": 2472.2,
      "popChangePct": 0.7
    },
    {
      "year": 2010,
      "gdp": 58.643,
      "growth": 8,
      "perCapita": 2894.3,
      "popChangePct": 0.69
    },
    {
      "year": 2011,
      "gdp": 67.725,
      "growth": 8.7,
      "perCapita": 3320.1,
      "popChangePct": 0.67
    },
    {
      "year": 2012,
      "gdp": 70.392,
      "growth": 8.6,
      "perCapita": 3446.4,
      "popChangePct": 0.13
    },
    {
      "year": 2013,
      "gdp": 76.934,
      "growth": 4.1,
      "perCapita": 3737.4,
      "popChangePct": 0.78
    },
    {
      "year": 2014,
      "gdp": 82.483,
      "growth": 6.4,
      "perCapita": 3969.7,
      "popChangePct": 0.94
    },
    {
      "year": 2015,
      "gdp": 85.091,
      "growth": 4.2,
      "perCapita": 4057.7,
      "popChangePct": 0.92
    },
    {
      "year": 2016,
      "gdp": 88,
      "growth": 5.1,
      "perCapita": 4150.4,
      "popChangePct": 1.11
    },
    {
      "year": 2017,
      "gdp": 94.376,
      "growth": 6.5,
      "perCapita": 4401.1,
      "popChangePct": 1.14
    },
    {
      "year": 2018,
      "gdp": 94.484,
      "growth": 2.3,
      "perCapita": 4360.1,
      "popChangePct": 1.05
    },
    {
      "year": 2019,
      "gdp": 89.015,
      "growth": -0.2,
      "perCapita": 4082.7,
      "popChangePct": 0.61
    },
    {
      "year": 2020,
      "gdp": 84.304,
      "growth": -4.6,
      "perCapita": 3846.2,
      "popChangePct": 0.53
    },
    {
      "year": 2021,
      "gdp": 88.609,
      "growth": 4.2,
      "perCapita": 3999.3,
      "popChangePct": 1.08
    },
    {
      "year": 2022,
      "gdp": 74.584,
      "growth": -7.3,
      "perCapita": 3362.5,
      "popChangePct": 0.11
    },
    {
      "year": 2023,
      "gdp": 83.723,
      "growth": -2.3,
      "perCapita": 3799.2,
      "popChangePct": -0.65
    },
    {
      "year": 2024,
      "gdp": 98.964,
      "growth": 5,
      "perCapita": 4515.6,
      "popChangePct": -0.55
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 16.908,
      "perCapitaPPP": 1087.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 19.497,
      "perCapitaPPP": 1236.9,
      "perCapitaPPPChangePct": 13.78,
      "popChangePct": 1.35
    },
    {
      "year": 1982,
      "gdpPPP": 21.786,
      "perCapitaPPP": 1364.8,
      "perCapitaPPPChangePct": 10.35,
      "popChangePct": 1.26
    },
    {
      "year": 1983,
      "gdpPPP": 23.389,
      "perCapitaPPP": 1448.4,
      "perCapitaPPPChangePct": 6.12,
      "popChangePct": 1.17
    },
    {
      "year": 1984,
      "gdpPPP": 25.863,
      "perCapitaPPP": 1584.6,
      "perCapitaPPPChangePct": 9.4,
      "popChangePct": 1.08
    },
    {
      "year": 1985,
      "gdpPPP": 28.003,
      "perCapitaPPP": 1699.0,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 0.98
    },
    {
      "year": 1986,
      "gdpPPP": 29.79,
      "perCapitaPPP": 1789.7,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 0.99
    },
    {
      "year": 1987,
      "gdpPPP": 30.972,
      "perCapitaPPP": 1842.3,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 1.0
    },
    {
      "year": 1988,
      "gdpPPP": 32.929,
      "perCapitaPPP": 1939.3,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": 1.01
    },
    {
      "year": 1989,
      "gdpPPP": 34.991,
      "perCapitaPPP": 2040.1,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": 1.01
    },
    {
      "year": 1990,
      "gdpPPP": 38.541,
      "perCapitaPPP": 2224.5,
      "perCapitaPPPChangePct": 9.04,
      "popChangePct": 1.02
    },
    {
      "year": 1991,
      "gdpPPP": 44.156,
      "perCapitaPPP": 2518.1,
      "perCapitaPPPChangePct": 13.2,
      "popChangePct": 1.21
    },
    {
      "year": 1992,
      "gdpPPP": 43.747,
      "perCapitaPPP": 2466.4,
      "perCapitaPPPChangePct": -2.05,
      "popChangePct": 1.15
    },
    {
      "year": 1993,
      "gdpPPP": 48.132,
      "perCapitaPPP": 2685.2,
      "perCapitaPPPChangePct": 8.87,
      "popChangePct": 1.06
    },
    {
      "year": 1994,
      "gdpPPP": 53.11,
      "perCapitaPPP": 2935.2,
      "perCapitaPPPChangePct": 9.31,
      "popChangePct": 0.94
    },
    {
      "year": 1995,
      "gdpPPP": 57.505,
      "perCapitaPPP": 3152.2,
      "perCapitaPPPChangePct": 7.39,
      "popChangePct": 0.82
    },
    {
      "year": 1996,
      "gdpPPP": 65.679,
      "perCapitaPPP": 3575.9,
      "perCapitaPPPChangePct": 13.44,
      "popChangePct": 0.68
    },
    {
      "year": 1997,
      "gdpPPP": 73.688,
      "perCapitaPPP": 3989.4,
      "perCapitaPPPChangePct": 11.56,
      "popChangePct": 0.57
    },
    {
      "year": 1998,
      "gdpPPP": 73.29,
      "perCapitaPPP": 3947.8,
      "perCapitaPPPChangePct": -1.04,
      "popChangePct": 0.51
    },
    {
      "year": 1999,
      "gdpPPP": 76.467,
      "perCapitaPPP": 4097.2,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 0.53
    },
    {
      "year": 2000,
      "gdpPPP": 84.781,
      "perCapitaPPP": 4515.0,
      "perCapitaPPPChangePct": 10.2,
      "popChangePct": 0.62
    },
    {
      "year": 2001,
      "gdpPPP": 85.002,
      "perCapitaPPP": 4494.6,
      "perCapitaPPPChangePct": -0.45,
      "popChangePct": 0.71
    },
    {
      "year": 2002,
      "gdpPPP": 89.539,
      "perCapitaPPP": 4697.2,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 0.79
    },
    {
      "year": 2003,
      "gdpPPP": 96.731,
      "perCapitaPPP": 5031.8,
      "perCapitaPPPChangePct": 7.12,
      "popChangePct": 0.85
    },
    {
      "year": 2004,
      "gdpPPP": 104.741,
      "perCapitaPPP": 5402.6,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": 0.85
    },
    {
      "year": 2005,
      "gdpPPP": 114.768,
      "perCapitaPPP": 5872.0,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 0.81
    },
    {
      "year": 2006,
      "gdpPPP": 127.379,
      "perCapitaPPP": 6467.3,
      "perCapitaPPPChangePct": 10.14,
      "popChangePct": 0.77
    },
    {
      "year": 2007,
      "gdpPPP": 139.723,
      "perCapitaPPP": 7041.7,
      "perCapitaPPPChangePct": 8.88,
      "popChangePct": 0.74
    },
    {
      "year": 2008,
      "gdpPPP": 150.888,
      "perCapitaPPP": 7550.5,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 0.72
    },
    {
      "year": 2009,
      "gdpPPP": 157.191,
      "perCapitaPPP": 7811.3,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 0.7
    },
    {
      "year": 2010,
      "gdpPPP": 171.855,
      "perCapitaPPP": 8481.8,
      "perCapitaPPPChangePct": 8.58,
      "popChangePct": 0.69
    },
    {
      "year": 2011,
      "gdpPPP": 190.608,
      "perCapitaPPP": 9344.2,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": 0.67
    },
    {
      "year": 2012,
      "gdpPPP": 210.917,
      "perCapitaPPP": 10326.4,
      "perCapitaPPPChangePct": 10.51,
      "popChangePct": 0.13
    },
    {
      "year": 2013,
      "gdpPPP": 223.198,
      "perCapitaPPP": 10842.7,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": 0.78
    },
    {
      "year": 2014,
      "gdpPPP": 241.568,
      "perCapitaPPP": 11626.2,
      "perCapitaPPPChangePct": 7.23,
      "popChangePct": 0.94
    },
    {
      "year": 2015,
      "gdpPPP": 254.065,
      "perCapitaPPP": 12115.6,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 0.92
    },
    {
      "year": 2016,
      "gdpPPP": 269.441,
      "perCapitaPPP": 12707.7,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": 1.11
    },
    {
      "year": 2017,
      "gdpPPP": 291.985,
      "perCapitaPPP": 13616.2,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 1.14
    },
    {
      "year": 2018,
      "gdpPPP": 307.238,
      "perCapitaPPP": 14178.0,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 1.05
    },
    {
      "year": 2019,
      "gdpPPP": 307.705,
      "perCapitaPPP": 14113.0,
      "perCapitaPPPChangePct": -0.46,
      "popChangePct": 0.61
    },
    {
      "year": 2020,
      "gdpPPP": 283.652,
      "perCapitaPPP": 12940.9,
      "perCapitaPPPChangePct": -8.3,
      "popChangePct": 0.53
    },
    {
      "year": 2021,
      "gdpPPP": 317.188,
      "perCapitaPPP": 14316.1,
      "perCapitaPPPChangePct": 10.63,
      "popChangePct": 1.08
    },
    {
      "year": 2022,
      "gdpPPP": 314.779,
      "perCapitaPPP": 14191.4,
      "perCapitaPPPChangePct": -0.87,
      "popChangePct": 0.11
    },
    {
      "year": 2023,
      "gdpPPP": 318.821,
      "perCapitaPPP": 14467.5,
      "perCapitaPPPChangePct": 1.95,
      "popChangePct": -0.65
    },
    {
      "year": 2024,
      "gdpPPP": 343.101,
      "perCapitaPPP": 15655.3,
      "perCapitaPPPChangePct": 8.21,
      "popChangePct": -0.55
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function SriLankaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
