import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Nicaragua",
  "slug": "nicaragua",
  "iso3": "NIC",
  "region": "Americas",
  "rank2026": 129,
  "flagEmoji": "🇳🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Niger",
      "slug": "niger",
      "rank": 128
    },
    {
      "name": "Kyrgyzstan",
      "slug": "kyrgyzstan",
      "rank": 130
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.832,
      "growth": 4.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.156,
      "growth": 5.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 2.497,
      "growth": -0.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdp": 2.9,
      "growth": 4.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdp": 3.966,
      "growth": -1.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdp": 3.854,
      "growth": -4.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 5.8,
      "growth": -1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 3.409,
      "growth": -0.7,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdp": 1.499,
      "growth": -12.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdp": 2.082,
      "growth": -1.7,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 0.519,
      "growth": -0.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 3.678,
      "growth": -0.2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdp": 3.894,
      "growth": 0.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 3.726,
      "growth": -0.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdp": 3.861,
      "growth": 5,
      "perCapita": 898.2,
      "popChangePct": null
    },
    {
      "year": 1995,
      "gdp": 4.14,
      "growth": 5.9,
      "perCapita": 935.3,
      "popChangePct": 2.98
    },
    {
      "year": 1996,
      "gdp": 4.308,
      "growth": 6.3,
      "perCapita": 947.1,
      "popChangePct": 2.76
    },
    {
      "year": 1997,
      "gdp": 4.39,
      "growth": 4,
      "perCapita": 940.1,
      "popChangePct": 2.64
    },
    {
      "year": 1998,
      "gdp": 4.635,
      "growth": 3.7,
      "perCapita": 973.1,
      "popChangePct": 2.01
    },
    {
      "year": 1999,
      "gdp": 4.856,
      "growth": 7,
      "perCapita": 999.4,
      "popChangePct": 2.02
    },
    {
      "year": 2000,
      "gdp": 5.109,
      "growth": 4.1,
      "perCapita": 1030.7,
      "popChangePct": 2.02
    },
    {
      "year": 2001,
      "gdp": 5.335,
      "growth": 3,
      "perCapita": 1054.7,
      "popChangePct": 2.06
    },
    {
      "year": 2002,
      "gdp": 5.224,
      "growth": 0.8,
      "perCapita": 1011.9,
      "popChangePct": 2.04
    },
    {
      "year": 2003,
      "gdp": 5.322,
      "growth": 2.5,
      "perCapita": 1010.2,
      "popChangePct": 2.05
    },
    {
      "year": 2004,
      "gdp": 5.793,
      "growth": 5.4,
      "perCapita": 1077.8,
      "popChangePct": 2.03
    },
    {
      "year": 2005,
      "gdp": 6.321,
      "growth": 4.2,
      "perCapita": 1152.8,
      "popChangePct": 2.01
    },
    {
      "year": 2006,
      "gdp": 6.764,
      "growth": 3.8,
      "perCapita": 1224.7,
      "popChangePct": 0.73
    },
    {
      "year": 2007,
      "gdp": 7.423,
      "growth": 5.1,
      "perCapita": 1326.7,
      "popChangePct": 1.32
    },
    {
      "year": 2008,
      "gdp": 8.497,
      "growth": 3.4,
      "perCapita": 1498.9,
      "popChangePct": 1.3
    },
    {
      "year": 2009,
      "gdp": 8.297,
      "growth": -3.3,
      "perCapita": 1444.9,
      "popChangePct": 1.29
    },
    {
      "year": 2010,
      "gdp": 8.759,
      "growth": 4.4,
      "perCapita": 1506.1,
      "popChangePct": 1.29
    },
    {
      "year": 2011,
      "gdp": 9.774,
      "growth": 6.3,
      "perCapita": 1630.0,
      "popChangePct": 3.11
    },
    {
      "year": 2012,
      "gdp": 10.532,
      "growth": 6.5,
      "perCapita": 1734.8,
      "popChangePct": 1.23
    },
    {
      "year": 2013,
      "gdp": 10.983,
      "growth": 4.9,
      "perCapita": 1790.4,
      "popChangePct": 1.04
    },
    {
      "year": 2014,
      "gdp": 11.88,
      "growth": 4.8,
      "perCapita": 1916.8,
      "popChangePct": 1.04
    },
    {
      "year": 2015,
      "gdp": 12.757,
      "growth": 4.8,
      "perCapita": 2036.9,
      "popChangePct": 1.05
    },
    {
      "year": 2016,
      "gdp": 13.286,
      "growth": 4.6,
      "perCapita": 2099.6,
      "popChangePct": 1.04
    },
    {
      "year": 2017,
      "gdp": 13.786,
      "growth": 4.6,
      "perCapita": 2156.2,
      "popChangePct": 1.04
    },
    {
      "year": 2018,
      "gdp": 13.025,
      "growth": -3.4,
      "perCapita": 2016.2,
      "popChangePct": 1.03
    },
    {
      "year": 2019,
      "gdp": 12.713,
      "growth": -2.9,
      "perCapita": 1947.6,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdp": 12.73,
      "growth": -2.2,
      "perCapita": 1930.1,
      "popChangePct": 1.04
    },
    {
      "year": 2021,
      "gdp": 14.208,
      "growth": 10.5,
      "perCapita": 2132.0,
      "popChangePct": 1.03
    },
    {
      "year": 2022,
      "gdp": 15.634,
      "growth": 3.6,
      "perCapita": 2345.9,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 17.813,
      "growth": 4.4,
      "perCapita": 2672.8,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 19.697,
      "growth": 3.6,
      "perCapita": 2955.5,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 22.237,
      "growth": 4.9,
      "perCapita": 3336.7,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 24.227,
      "growth": 3.8,
      "perCapita": 3558.8,
      "popChangePct": 2.16
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 26.258,
      "growth": 3.8,
      "perCapita": 3808.7,
      "popChangePct": 1.26
    },
    {
      "year": 2028,
      "gdp": 28.001,
      "growth": 3.5,
      "perCapita": 4010.4,
      "popChangePct": 1.28
    },
    {
      "year": 2029,
      "gdp": 29.859,
      "growth": 3.5,
      "perCapita": 4223.0,
      "popChangePct": 1.27
    },
    {
      "year": 2030,
      "gdp": 31.84,
      "growth": 3.5,
      "perCapita": 4446.9,
      "popChangePct": 1.26
    },
    {
      "year": 2031,
      "gdp": 33.953,
      "growth": 3.5,
      "perCapita": 4693.1,
      "popChangePct": 1.05
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 6.586,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 7.596,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 8,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdpPPP": 8.697,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdpPPP": 8.869,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdpPPP": 8.776,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 8.862,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdpPPP": 9.017,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdpPPP": 8.178,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdpPPP": 8.355,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdpPPP": 8.656,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 8.935,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdpPPP": 9.175,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 9.355,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdpPPP": 10.032,
      "perCapitaPPP": 2333.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1995,
      "gdpPPP": 10.848,
      "perCapitaPPP": 2450.6,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 2.98
    },
    {
      "year": 1996,
      "gdpPPP": 11.748,
      "perCapitaPPP": 2582.6,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 2.76
    },
    {
      "year": 1997,
      "gdpPPP": 12.424,
      "perCapitaPPP": 2660.8,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 2.64
    },
    {
      "year": 1998,
      "gdpPPP": 13.03,
      "perCapitaPPP": 2735.5,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 2.01
    },
    {
      "year": 1999,
      "gdpPPP": 14.144,
      "perCapitaPPP": 2911.2,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 2.02
    },
    {
      "year": 2000,
      "gdpPPP": 15.058,
      "perCapitaPPP": 3037.7,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 2.02
    },
    {
      "year": 2001,
      "gdpPPP": 15.853,
      "perCapitaPPP": 3133.8,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 2.06
    },
    {
      "year": 2002,
      "gdpPPP": 16.221,
      "perCapitaPPP": 3142.1,
      "perCapitaPPPChangePct": 0.27,
      "popChangePct": 2.04
    },
    {
      "year": 2003,
      "gdpPPP": 16.958,
      "perCapitaPPP": 3219.2,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 2.05
    },
    {
      "year": 2004,
      "gdpPPP": 18.345,
      "perCapitaPPP": 3413.2,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": 2.03
    },
    {
      "year": 2005,
      "gdpPPP": 19.724,
      "perCapitaPPP": 3597.0,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 2.01
    },
    {
      "year": 2006,
      "gdpPPP": 21.106,
      "perCapitaPPP": 3821.7,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 0.73
    },
    {
      "year": 2007,
      "gdpPPP": 22.778,
      "perCapitaPPP": 4070.8,
      "perCapitaPPPChangePct": 6.52,
      "popChangePct": 1.32
    },
    {
      "year": 2008,
      "gdpPPP": 24.014,
      "perCapitaPPP": 4236.2,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 1.3
    },
    {
      "year": 2009,
      "gdpPPP": 23.367,
      "perCapitaPPP": 4069.3,
      "perCapitaPPPChangePct": -3.94,
      "popChangePct": 1.29
    },
    {
      "year": 2010,
      "gdpPPP": 24.694,
      "perCapitaPPP": 4246.2,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 1.29
    },
    {
      "year": 2011,
      "gdpPPP": 26.795,
      "perCapitaPPP": 4468.4,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 3.11
    },
    {
      "year": 2012,
      "gdpPPP": 29.067,
      "perCapitaPPP": 4787.9,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 1.23
    },
    {
      "year": 2013,
      "gdpPPP": 31.019,
      "perCapitaPPP": 5056.6,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 1.04
    },
    {
      "year": 2014,
      "gdpPPP": 33.069,
      "perCapitaPPP": 5335.3,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 1.04
    },
    {
      "year": 2015,
      "gdpPPP": 34.976,
      "perCapitaPPP": 5584.8,
      "perCapitaPPPChangePct": 4.68,
      "popChangePct": 1.05
    },
    {
      "year": 2016,
      "gdpPPP": 36.919,
      "perCapitaPPP": 5834.3,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": 1.04
    },
    {
      "year": 2017,
      "gdpPPP": 39.321,
      "perCapitaPPP": 6149.8,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 1.04
    },
    {
      "year": 2018,
      "gdpPPP": 37.986,
      "perCapitaPPP": 5879.8,
      "perCapitaPPPChangePct": -4.39,
      "popChangePct": 1.03
    },
    {
      "year": 2019,
      "gdpPPP": 38.779,
      "perCapitaPPP": 5940.8,
      "perCapitaPPPChangePct": 1.04,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdpPPP": 41.191,
      "perCapitaPPP": 6245.1,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": 1.04
    },
    {
      "year": 2021,
      "gdpPPP": 47.305,
      "perCapitaPPP": 7098.2,
      "perCapitaPPPChangePct": 13.66,
      "popChangePct": 1.03
    },
    {
      "year": 2022,
      "gdpPPP": 52.468,
      "perCapitaPPP": 7872.9,
      "perCapitaPPPChangePct": 10.92,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 56.819,
      "perCapitaPPP": 8525.7,
      "perCapitaPPPChangePct": 8.29,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 60.315,
      "perCapitaPPP": 9050.3,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 65.08,
      "perCapitaPPP": 9765.3,
      "perCapitaPPPChangePct": 7.9,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 69.515,
      "perCapitaPPP": 10211.5,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 2.16
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 73.741,
      "perCapitaPPP": 10695.9,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 1.26
    },
    {
      "year": 2028,
      "gdpPPP": 77.597,
      "perCapitaPPP": 11113.9,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 1.28
    },
    {
      "year": 2029,
      "gdpPPP": 81.764,
      "perCapitaPPP": 11564.1,
      "perCapitaPPPChangePct": 4.05,
      "popChangePct": 1.27
    },
    {
      "year": 2030,
      "gdpPPP": 86.206,
      "perCapitaPPP": 12039.9,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 1.26
    },
    {
      "year": 2031,
      "gdpPPP": 90.86,
      "perCapitaPPP": 12559.1,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 1.05
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NicaraguaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
