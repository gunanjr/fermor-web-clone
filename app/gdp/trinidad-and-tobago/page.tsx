import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Trinidad and Tobago",
  "slug": "trinidad-and-tobago",
  "iso3": "TTO",
  "region": "Americas",
  "rank2026": 126,
  "flagEmoji": "🇹🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Benin",
      "slug": "benin",
      "rank": 125
    },
    {
      "name": "Chad",
      "slug": "chad",
      "rank": 127
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 6.343,
      "growth": 10.4,
      "perCapita": 5847.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 7.113,
      "growth": 4.6,
      "perCapita": 6454.4,
      "popChangePct": 1.57
    },
    {
      "year": 1982,
      "gdp": 8.28,
      "growth": 3.8,
      "perCapita": 7393.2,
      "popChangePct": 1.63
    },
    {
      "year": 1983,
      "gdp": 7.898,
      "growth": -10.3,
      "perCapita": 6939.4,
      "popChangePct": 1.61
    },
    {
      "year": 1984,
      "gdp": 7.891,
      "growth": -5.8,
      "perCapita": 6831.2,
      "popChangePct": 1.49
    },
    {
      "year": 1985,
      "gdp": 7.503,
      "growth": -4.1,
      "perCapita": 6411.2,
      "popChangePct": 1.3
    },
    {
      "year": 1986,
      "gdp": 4.877,
      "growth": -3.3,
      "perCapita": 4121.2,
      "popChangePct": 1.11
    },
    {
      "year": 1987,
      "gdp": 4.88,
      "growth": -4.6,
      "perCapita": 4085.6,
      "popChangePct": 1.01
    },
    {
      "year": 1988,
      "gdp": 4.574,
      "growth": -3.9,
      "perCapita": 3798.8,
      "popChangePct": 0.75
    },
    {
      "year": 1989,
      "gdp": 4.397,
      "growth": -0.8,
      "perCapita": 3625.7,
      "popChangePct": 0.75
    },
    {
      "year": 1990,
      "gdp": 5.155,
      "growth": 1.5,
      "perCapita": 4221.8,
      "popChangePct": 0.66
    },
    {
      "year": 1991,
      "gdp": 5.399,
      "growth": 3.1,
      "perCapita": 4392.9,
      "popChangePct": 0.66
    },
    {
      "year": 1992,
      "gdp": 5.533,
      "growth": 10.1,
      "perCapita": 4474.1,
      "popChangePct": 0.65
    },
    {
      "year": 1993,
      "gdp": 4.656,
      "growth": -0.7,
      "perCapita": 3743.6,
      "popChangePct": 0.57
    },
    {
      "year": 1994,
      "gdp": 5.032,
      "growth": 3.6,
      "perCapita": 4027.4,
      "popChangePct": 0.48
    },
    {
      "year": 1995,
      "gdp": 5.421,
      "growth": 3.8,
      "perCapita": 4322.3,
      "popChangePct": 0.32
    },
    {
      "year": 1996,
      "gdp": 5.859,
      "growth": 7.1,
      "perCapita": 4658.9,
      "popChangePct": 0.32
    },
    {
      "year": 1997,
      "gdp": 5.837,
      "growth": 7.5,
      "perCapita": 4632.8,
      "popChangePct": 0.16
    },
    {
      "year": 1998,
      "gdp": 6.148,
      "growth": 8.1,
      "perCapita": 4872.6,
      "popChangePct": 0.16
    },
    {
      "year": 1999,
      "gdp": 6.926,
      "growth": 8,
      "perCapita": 5479.9,
      "popChangePct": 0.16
    },
    {
      "year": 2000,
      "gdp": 8.295,
      "growth": 6.9,
      "perCapita": 6546.0,
      "popChangePct": 0.24
    },
    {
      "year": 2001,
      "gdp": 8.96,
      "growth": 3.7,
      "perCapita": 7046.4,
      "popChangePct": 0.39
    },
    {
      "year": 2002,
      "gdp": 9.148,
      "growth": 7.2,
      "perCapita": 7162.5,
      "popChangePct": 0.39
    },
    {
      "year": 2003,
      "gdp": 11.464,
      "growth": 13.9,
      "perCapita": 8931.0,
      "popChangePct": 0.55
    },
    {
      "year": 2004,
      "gdp": 13.472,
      "growth": 7.3,
      "perCapita": 10442.2,
      "popChangePct": 0.47
    },
    {
      "year": 2005,
      "gdp": 16.17,
      "growth": 5.9,
      "perCapita": 12472.0,
      "popChangePct": 0.47
    },
    {
      "year": 2006,
      "gdp": 18.6,
      "growth": 14.2,
      "perCapita": 14280.0,
      "popChangePct": 0.54
    },
    {
      "year": 2007,
      "gdp": 21.937,
      "growth": 4.3,
      "perCapita": 16765.9,
      "popChangePct": 0.38
    },
    {
      "year": 2008,
      "gdp": 28.193,
      "growth": 3.3,
      "perCapita": 21448.7,
      "popChangePct": 0.46
    },
    {
      "year": 2009,
      "gdp": 19.52,
      "growth": -4.8,
      "perCapita": 14777.4,
      "popChangePct": 0.53
    },
    {
      "year": 2010,
      "gdp": 22.522,
      "growth": 3.5,
      "perCapita": 16957.4,
      "popChangePct": 0.53
    },
    {
      "year": 2011,
      "gdp": 25.789,
      "growth": -0.2,
      "perCapita": 19300.8,
      "popChangePct": 0.6
    },
    {
      "year": 2012,
      "gdp": 27.147,
      "growth": 4.6,
      "perCapita": 20186.7,
      "popChangePct": 0.67
    },
    {
      "year": 2013,
      "gdp": 28.561,
      "growth": 3.4,
      "perCapita": 21098.0,
      "popChangePct": 0.67
    },
    {
      "year": 2014,
      "gdp": 29.474,
      "growth": 3.7,
      "perCapita": 21635.0,
      "popChangePct": 0.59
    },
    {
      "year": 2015,
      "gdp": 26.841,
      "growth": -0.4,
      "perCapita": 19587.3,
      "popChangePct": 0.59
    },
    {
      "year": 2016,
      "gdp": 23.624,
      "growth": -7.5,
      "perCapita": 17149.4,
      "popChangePct": 0.58
    },
    {
      "year": 2017,
      "gdp": 23.831,
      "growth": -4.9,
      "perCapita": 17218.0,
      "popChangePct": 0.44
    },
    {
      "year": 2018,
      "gdp": 23.883,
      "growth": -0.9,
      "perCapita": 17184.0,
      "popChangePct": 0.43
    },
    {
      "year": 2019,
      "gdp": 23.478,
      "growth": 0.5,
      "perCapita": 16830.3,
      "popChangePct": 0.36
    },
    {
      "year": 2020,
      "gdp": 20.889,
      "growth": -8.8,
      "perCapita": 14925.8,
      "popChangePct": 0.29
    },
    {
      "year": 2021,
      "gdp": 24.223,
      "growth": -0.7,
      "perCapita": 17218.1,
      "popChangePct": 0.57
    },
    {
      "year": 2022,
      "gdp": 28.341,
      "growth": 0.9,
      "perCapita": 20041.8,
      "popChangePct": 0.5
    },
    {
      "year": 2023,
      "gdp": 25.037,
      "growth": 1.5,
      "perCapita": 17616.5,
      "popChangePct": 0.5
    },
    {
      "year": 2024,
      "gdp": 25.634,
      "growth": 2.5,
      "perCapita": 17948.6,
      "popChangePct": 0.49
    },
    {
      "year": 2025,
      "gdp": 25.932,
      "growth": 0.8,
      "perCapita": 18072.0,
      "popChangePct": 0.49
    },
    {
      "year": 2026,
      "gdp": 26.836,
      "growth": 0.8,
      "perCapita": 18616.1,
      "popChangePct": 0.49
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 28.149,
      "growth": 3,
      "perCapita": 19438.9,
      "popChangePct": 0.42
    },
    {
      "year": 2028,
      "gdp": 29.378,
      "growth": 3.5,
      "perCapita": 20195.5,
      "popChangePct": 0.48
    },
    {
      "year": 2029,
      "gdp": 30.362,
      "growth": 2.8,
      "perCapita": 20777.2,
      "popChangePct": 0.41
    },
    {
      "year": 2030,
      "gdp": 31.345,
      "growth": 2.1,
      "perCapita": 21350.4,
      "popChangePct": 0.48
    },
    {
      "year": 2031,
      "gdp": 32.265,
      "growth": 1.8,
      "perCapita": 21871.9,
      "popChangePct": 0.48
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.507,
      "perCapitaPPP": 5998.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 7.448,
      "perCapitaPPP": 6759.1,
      "perCapitaPPPChangePct": 12.68,
      "popChangePct": 1.57
    },
    {
      "year": 1982,
      "gdpPPP": 8.209,
      "perCapitaPPP": 7329.4,
      "perCapitaPPPChangePct": 8.44,
      "popChangePct": 1.63
    },
    {
      "year": 1983,
      "gdpPPP": 7.652,
      "perCapitaPPP": 6723.6,
      "perCapitaPPPChangePct": -8.27,
      "popChangePct": 1.61
    },
    {
      "year": 1984,
      "gdpPPP": 7.472,
      "perCapitaPPP": 6468.9,
      "perCapitaPPPChangePct": -3.79,
      "popChangePct": 1.49
    },
    {
      "year": 1985,
      "gdpPPP": 7.391,
      "perCapitaPPP": 6315.4,
      "perCapitaPPPChangePct": -2.37,
      "popChangePct": 1.3
    },
    {
      "year": 1986,
      "gdpPPP": 7.292,
      "perCapitaPPP": 6162.4,
      "perCapitaPPPChangePct": -2.42,
      "popChangePct": 1.11
    },
    {
      "year": 1987,
      "gdpPPP": 7.132,
      "perCapitaPPP": 5970.7,
      "perCapitaPPPChangePct": -3.11,
      "popChangePct": 1.01
    },
    {
      "year": 1988,
      "gdpPPP": 7.094,
      "perCapitaPPP": 5891.6,
      "perCapitaPPPChangePct": -1.33,
      "popChangePct": 0.75
    },
    {
      "year": 1989,
      "gdpPPP": 7.311,
      "perCapitaPPP": 6028.2,
      "perCapitaPPPChangePct": 2.32,
      "popChangePct": 0.75
    },
    {
      "year": 1990,
      "gdpPPP": 7.699,
      "perCapitaPPP": 6305.2,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 0.66
    },
    {
      "year": 1991,
      "gdpPPP": 8.208,
      "perCapitaPPP": 6677.7,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 0.66
    },
    {
      "year": 1992,
      "gdpPPP": 9.242,
      "perCapitaPPP": 7473.1,
      "perCapitaPPPChangePct": 11.91,
      "popChangePct": 0.65
    },
    {
      "year": 1993,
      "gdpPPP": 9.398,
      "perCapitaPPP": 7556.8,
      "perCapitaPPPChangePct": 1.12,
      "popChangePct": 0.57
    },
    {
      "year": 1994,
      "gdpPPP": 9.941,
      "perCapitaPPP": 7955.6,
      "perCapitaPPPChangePct": 5.28,
      "popChangePct": 0.48
    },
    {
      "year": 1995,
      "gdpPPP": 10.536,
      "perCapitaPPP": 8400.4,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 0.32
    },
    {
      "year": 1996,
      "gdpPPP": 11.494,
      "perCapitaPPP": 9140.1,
      "perCapitaPPPChangePct": 8.81,
      "popChangePct": 0.32
    },
    {
      "year": 1997,
      "gdpPPP": 12.572,
      "perCapitaPPP": 9979.0,
      "perCapitaPPPChangePct": 9.18,
      "popChangePct": 0.16
    },
    {
      "year": 1998,
      "gdpPPP": 13.746,
      "perCapitaPPP": 10895.0,
      "perCapitaPPPChangePct": 9.18,
      "popChangePct": 0.16
    },
    {
      "year": 1999,
      "gdpPPP": 15.059,
      "perCapitaPPP": 11914.8,
      "perCapitaPPPChangePct": 9.36,
      "popChangePct": 0.16
    },
    {
      "year": 2000,
      "gdpPPP": 16.463,
      "perCapitaPPP": 12992.3,
      "perCapitaPPPChangePct": 9.04,
      "popChangePct": 0.24
    },
    {
      "year": 2001,
      "gdpPPP": 17.457,
      "perCapitaPPP": 13727.7,
      "perCapitaPPPChangePct": 5.66,
      "popChangePct": 0.39
    },
    {
      "year": 2002,
      "gdpPPP": 18.996,
      "perCapitaPPP": 14872.8,
      "perCapitaPPPChangePct": 8.34,
      "popChangePct": 0.39
    },
    {
      "year": 2003,
      "gdpPPP": 22.059,
      "perCapitaPPP": 17185.8,
      "perCapitaPPPChangePct": 15.55,
      "popChangePct": 0.55
    },
    {
      "year": 2004,
      "gdpPPP": 24.312,
      "perCapitaPPP": 18844.9,
      "perCapitaPPPChangePct": 9.65,
      "popChangePct": 0.47
    },
    {
      "year": 2005,
      "gdpPPP": 26.553,
      "perCapitaPPP": 20480.3,
      "perCapitaPPPChangePct": 8.68,
      "popChangePct": 0.47
    },
    {
      "year": 2006,
      "gdpPPP": 31.253,
      "perCapitaPPP": 23993.8,
      "perCapitaPPPChangePct": 17.16,
      "popChangePct": 0.54
    },
    {
      "year": 2007,
      "gdpPPP": 33.466,
      "perCapitaPPP": 25576.6,
      "perCapitaPPPChangePct": 6.6,
      "popChangePct": 0.38
    },
    {
      "year": 2008,
      "gdpPPP": 35.231,
      "perCapitaPPP": 26803.1,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 0.46
    },
    {
      "year": 2009,
      "gdpPPP": 33.739,
      "perCapitaPPP": 25541.9,
      "perCapitaPPPChangePct": -4.71,
      "popChangePct": 0.53
    },
    {
      "year": 2010,
      "gdpPPP": 35.331,
      "perCapitaPPP": 26601.6,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 0.53
    },
    {
      "year": 2011,
      "gdpPPP": 35.991,
      "perCapitaPPP": 26935.5,
      "perCapitaPPPChangePct": 1.25,
      "popChangePct": 0.6
    },
    {
      "year": 2012,
      "gdpPPP": 38.358,
      "perCapitaPPP": 28522.9,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 0.67
    },
    {
      "year": 2013,
      "gdpPPP": 40.325,
      "perCapitaPPP": 29788.6,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.67
    },
    {
      "year": 2014,
      "gdpPPP": 42.534,
      "perCapitaPPP": 31221.0,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 0.59
    },
    {
      "year": 2015,
      "gdpPPP": 42.754,
      "perCapitaPPP": 31199.6,
      "perCapitaPPPChangePct": -0.07,
      "popChangePct": 0.59
    },
    {
      "year": 2016,
      "gdpPPP": 39.907,
      "perCapitaPPP": 28969.6,
      "perCapitaPPPChangePct": -7.15,
      "popChangePct": 0.58
    },
    {
      "year": 2017,
      "gdpPPP": 38.643,
      "perCapitaPPP": 27919.8,
      "perCapitaPPPChangePct": -3.62,
      "popChangePct": 0.44
    },
    {
      "year": 2018,
      "gdpPPP": 38.972,
      "perCapitaPPP": 28041.0,
      "perCapitaPPPChangePct": 0.43,
      "popChangePct": 0.43
    },
    {
      "year": 2019,
      "gdpPPP": 39.986,
      "perCapitaPPP": 28664.7,
      "perCapitaPPPChangePct": 2.22,
      "popChangePct": 0.36
    },
    {
      "year": 2020,
      "gdpPPP": 36.534,
      "perCapitaPPP": 26105.5,
      "perCapitaPPPChangePct": -8.93,
      "popChangePct": 0.29
    },
    {
      "year": 2021,
      "gdpPPP": 41.686,
      "perCapitaPPP": 29631.1,
      "perCapitaPPPChangePct": 13.51,
      "popChangePct": 0.57
    },
    {
      "year": 2022,
      "gdpPPP": 45.036,
      "perCapitaPPP": 31847.4,
      "perCapitaPPPChangePct": 7.48,
      "popChangePct": 0.5
    },
    {
      "year": 2023,
      "gdpPPP": 47.387,
      "perCapitaPPP": 33342.1,
      "perCapitaPPPChangePct": 4.69,
      "popChangePct": 0.5
    },
    {
      "year": 2024,
      "gdpPPP": 49.782,
      "perCapitaPPP": 34857.2,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 0.49
    },
    {
      "year": 2025,
      "gdpPPP": 51.594,
      "perCapitaPPP": 35956.3,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 0.49
    },
    {
      "year": 2026,
      "gdpPPP": 53.479,
      "perCapitaPPP": 37098.3,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 0.49
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 56.266,
      "perCapitaPPP": 38854.7,
      "perCapitaPPPChangePct": 4.73,
      "popChangePct": 0.42
    },
    {
      "year": 2028,
      "gdpPPP": 59.191,
      "perCapitaPPP": 40690.6,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 0.48
    },
    {
      "year": 2029,
      "gdpPPP": 61.951,
      "perCapitaPPP": 42393.9,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 0.41
    },
    {
      "year": 2030,
      "gdpPPP": 64.41,
      "perCapitaPPP": 43872.7,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 0.48
    },
    {
      "year": 2031,
      "gdpPPP": 66.747,
      "perCapitaPPP": 45246.9,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 0.48
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TrinidadAndTobagoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
