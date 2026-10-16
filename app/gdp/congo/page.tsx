import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Congo",
  "slug": "congo",
  "iso3": "COG",
  "region": "Africa",
  "rank2026": 147,
  "flagEmoji": "🇨🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bahamas",
      "slug": "bahamas",
      "rank": 146
    },
    {
      "name": "Brunei",
      "slug": "brunei",
      "rank": 148
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.165,
      "growth": 12.7,
      "perCapita": 1268.3,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.775,
      "growth": 2.6,
      "perCapita": 1008.6,
      "popChangePct": 3.1
    },
    {
      "year": 1982,
      "gdp": 1.548,
      "growth": 2.4,
      "perCapita": 853.0,
      "popChangePct": 3.07
    },
    {
      "year": 1983,
      "gdp": 1.407,
      "growth": 2.4,
      "perCapita": 752.4,
      "popChangePct": 3.09
    },
    {
      "year": 1984,
      "gdp": 1.294,
      "growth": 2.4,
      "perCapita": 671.1,
      "popChangePct": 3.1
    },
    {
      "year": 1985,
      "gdp": 1.327,
      "growth": 2.4,
      "perCapita": 667.6,
      "popChangePct": 3.11
    },
    {
      "year": 1986,
      "gdp": 1.815,
      "growth": 2.3,
      "perCapita": 885.8,
      "popChangePct": 3.07
    },
    {
      "year": 1987,
      "gdp": 2.205,
      "growth": 2.3,
      "perCapita": 1043.9,
      "popChangePct": 3.07
    },
    {
      "year": 1988,
      "gdp": 2.346,
      "growth": 21.9,
      "perCapita": 1077.3,
      "popChangePct": 3.08
    },
    {
      "year": 1989,
      "gdp": 2.478,
      "growth": 21.3,
      "perCapita": 1071.0,
      "popChangePct": 6.29
    },
    {
      "year": 1990,
      "gdp": 2.909,
      "growth": 1,
      "perCapita": 1219.6,
      "popChangePct": 3.07
    },
    {
      "year": 1991,
      "gdp": 3.035,
      "growth": 3.4,
      "perCapita": 1237.6,
      "popChangePct": 2.85
    },
    {
      "year": 1992,
      "gdp": 3.28,
      "growth": 4.2,
      "perCapita": 1301.3,
      "popChangePct": 2.77
    },
    {
      "year": 1993,
      "gdp": 3.004,
      "growth": 1.3,
      "perCapita": 1157.8,
      "popChangePct": 2.9
    },
    {
      "year": 1994,
      "gdp": 2.068,
      "growth": -1.4,
      "perCapita": 774.9,
      "popChangePct": 2.89
    },
    {
      "year": 1995,
      "gdp": 2.457,
      "growth": 4,
      "perCapita": 896.0,
      "popChangePct": 2.74
    },
    {
      "year": 1996,
      "gdp": 2.84,
      "growth": 3.5,
      "perCapita": 1008.3,
      "popChangePct": 2.74
    },
    {
      "year": 1997,
      "gdp": 2.568,
      "growth": -1,
      "perCapita": 893.1,
      "popChangePct": 2.06
    },
    {
      "year": 1998,
      "gdp": 2.24,
      "growth": 8.9,
      "perCapita": 762.5,
      "popChangePct": 2.16
    },
    {
      "year": 1999,
      "gdp": 2.646,
      "growth": -3.7,
      "perCapita": 877.2,
      "popChangePct": 2.72
    },
    {
      "year": 2000,
      "gdp": 3.624,
      "growth": 11.8,
      "perCapita": 1156.4,
      "popChangePct": 3.88
    },
    {
      "year": 2001,
      "gdp": 3.038,
      "growth": -4.8,
      "perCapita": 933.6,
      "popChangePct": 3.83
    },
    {
      "year": 2002,
      "gdp": 3.33,
      "growth": 1,
      "perCapita": 999.6,
      "popChangePct": 2.37
    },
    {
      "year": 2003,
      "gdp": 3.863,
      "growth": 0.5,
      "perCapita": 1128.0,
      "popChangePct": 2.82
    },
    {
      "year": 2004,
      "gdp": 5.101,
      "growth": -0.2,
      "perCapita": 1439.6,
      "popChangePct": 3.45
    },
    {
      "year": 2005,
      "gdp": 6.654,
      "growth": 9.2,
      "perCapita": 1811.6,
      "popChangePct": 3.67
    },
    {
      "year": 2006,
      "gdp": 8.073,
      "growth": 8,
      "perCapita": 2117.0,
      "popChangePct": 3.81
    },
    {
      "year": 2007,
      "gdp": 8.784,
      "growth": -6.6,
      "perCapita": 2220.2,
      "popChangePct": 3.75
    },
    {
      "year": 2008,
      "gdp": 11.649,
      "growth": 6.3,
      "perCapita": 2848.3,
      "popChangePct": 3.39
    },
    {
      "year": 2009,
      "gdp": 9.713,
      "growth": 11.6,
      "perCapita": 2281.5,
      "popChangePct": 4.08
    },
    {
      "year": 2010,
      "gdp": 13.159,
      "growth": 9.9,
      "perCapita": 2965.2,
      "popChangePct": 4.25
    },
    {
      "year": 2011,
      "gdp": 15.653,
      "growth": 2.2,
      "perCapita": 3414.5,
      "popChangePct": 3.29
    },
    {
      "year": 2012,
      "gdp": 17.704,
      "growth": 9.9,
      "perCapita": 3756.2,
      "popChangePct": 2.81
    },
    {
      "year": 2013,
      "gdp": 17.959,
      "growth": -0.7,
      "perCapita": 3719.7,
      "popChangePct": 2.44
    },
    {
      "year": 2014,
      "gdp": 17.918,
      "growth": 6.7,
      "perCapita": 3623.5,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdp": 11.891,
      "growth": -3.6,
      "perCapita": 2348.1,
      "popChangePct": 2.41
    },
    {
      "year": 2016,
      "gdp": 10.928,
      "growth": -5,
      "perCapita": 2106.9,
      "popChangePct": 2.43
    },
    {
      "year": 2017,
      "gdp": 11.83,
      "growth": -5.6,
      "perCapita": 2226.9,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdp": 14.781,
      "growth": -2.3,
      "perCapita": 2716.5,
      "popChangePct": 2.43
    },
    {
      "year": 2019,
      "gdp": 13.977,
      "growth": 1.1,
      "perCapita": 2509.0,
      "popChangePct": 2.39
    },
    {
      "year": 2020,
      "gdp": 11.485,
      "growth": -6.3,
      "perCapita": 2014.2,
      "popChangePct": 2.35
    },
    {
      "year": 2021,
      "gdp": 13.387,
      "growth": 1.1,
      "perCapita": 2294.0,
      "popChangePct": 2.35
    },
    {
      "year": 2022,
      "gdp": 13.967,
      "growth": 1.8,
      "perCapita": 2339.4,
      "popChangePct": 2.3
    },
    {
      "year": 2023,
      "gdp": 14.169,
      "growth": 2,
      "perCapita": 2308.5,
      "popChangePct": 2.81
    },
    {
      "year": 2024,
      "gdp": 14.774,
      "growth": 2.1,
      "perCapita": 2341.6,
      "popChangePct": 2.79
    },
    {
      "year": 2025,
      "gdp": 15.592,
      "growth": 2.4,
      "perCapita": 2403.9,
      "popChangePct": 2.81
    },
    {
      "year": 2026,
      "gdp": 17.028,
      "growth": 2.8,
      "perCapita": 2553.9,
      "popChangePct": 2.81
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 17.958,
      "growth": 3.2,
      "perCapita": 2619.9,
      "popChangePct": 2.79
    },
    {
      "year": 2028,
      "gdp": 19.119,
      "growth": 3.7,
      "perCapita": 2713.3,
      "popChangePct": 2.8
    },
    {
      "year": 2029,
      "gdp": 20.405,
      "growth": 3.7,
      "perCapita": 2817.0,
      "popChangePct": 2.81
    },
    {
      "year": 2030,
      "gdp": 21.721,
      "growth": 3.6,
      "perCapita": 2916.9,
      "popChangePct": 2.79
    },
    {
      "year": 2031,
      "gdp": 23.214,
      "growth": 3.6,
      "perCapita": 3032.5,
      "popChangePct": 2.81
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.77,
      "perCapitaPPP": 1622.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.111,
      "perCapitaPPP": 1767.9,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": 3.1
    },
    {
      "year": 1982,
      "gdpPPP": 3.383,
      "perCapitaPPP": 1864.8,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 3.07
    },
    {
      "year": 1983,
      "gdpPPP": 3.6,
      "perCapitaPPP": 1924.8,
      "perCapitaPPPChangePct": 3.22,
      "popChangePct": 3.09
    },
    {
      "year": 1984,
      "gdpPPP": 3.818,
      "perCapitaPPP": 1980.5,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 3.1
    },
    {
      "year": 1985,
      "gdpPPP": 4.032,
      "perCapitaPPP": 2028.7,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 3.11
    },
    {
      "year": 1986,
      "gdpPPP": 4.21,
      "perCapitaPPP": 2054.6,
      "perCapitaPPPChangePct": 1.28,
      "popChangePct": 3.07
    },
    {
      "year": 1987,
      "gdpPPP": 4.414,
      "perCapitaPPP": 2090.0,
      "perCapitaPPPChangePct": 1.72,
      "popChangePct": 3.07
    },
    {
      "year": 1988,
      "gdpPPP": 5.571,
      "perCapitaPPP": 2558.7,
      "perCapitaPPPChangePct": 22.43,
      "popChangePct": 3.08
    },
    {
      "year": 1989,
      "gdpPPP": 7.021,
      "perCapitaPPP": 3034.4,
      "perCapitaPPPChangePct": 18.59,
      "popChangePct": 6.29
    },
    {
      "year": 1990,
      "gdpPPP": 7.357,
      "perCapitaPPP": 3084.1,
      "perCapitaPPPChangePct": 1.64,
      "popChangePct": 3.07
    },
    {
      "year": 1991,
      "gdpPPP": 7.864,
      "perCapitaPPP": 3206.5,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 2.85
    },
    {
      "year": 1992,
      "gdpPPP": 8.38,
      "perCapitaPPP": 3324.1,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 2.77
    },
    {
      "year": 1993,
      "gdpPPP": 8.691,
      "perCapitaPPP": 3350.4,
      "perCapitaPPPChangePct": 0.79,
      "popChangePct": 2.9
    },
    {
      "year": 1994,
      "gdpPPP": 8.753,
      "perCapitaPPP": 3279.1,
      "perCapitaPPPChangePct": -2.13,
      "popChangePct": 2.89
    },
    {
      "year": 1995,
      "gdpPPP": 9.29,
      "perCapitaPPP": 3387.8,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.74
    },
    {
      "year": 1996,
      "gdpPPP": 9.791,
      "perCapitaPPP": 3476.3,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 2.74
    },
    {
      "year": 1997,
      "gdpPPP": 9.86,
      "perCapitaPPP": 3429.5,
      "perCapitaPPPChangePct": -1.34,
      "popChangePct": 2.06
    },
    {
      "year": 1998,
      "gdpPPP": 10.863,
      "perCapitaPPP": 3698.5,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 2.16
    },
    {
      "year": 1999,
      "gdpPPP": 10.612,
      "perCapitaPPP": 3517.7,
      "perCapitaPPPChangePct": -4.89,
      "popChangePct": 2.72
    },
    {
      "year": 2000,
      "gdpPPP": 12.128,
      "perCapitaPPP": 3869.6,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 3.88
    },
    {
      "year": 2001,
      "gdpPPP": 11.803,
      "perCapitaPPP": 3627.0,
      "perCapitaPPPChangePct": -6.27,
      "popChangePct": 3.83
    },
    {
      "year": 2002,
      "gdpPPP": 12.104,
      "perCapitaPPP": 3633.6,
      "perCapitaPPPChangePct": 0.18,
      "popChangePct": 2.37
    },
    {
      "year": 2003,
      "gdpPPP": 12.4,
      "perCapitaPPP": 3620.7,
      "perCapitaPPPChangePct": -0.35,
      "popChangePct": 2.82
    },
    {
      "year": 2004,
      "gdpPPP": 12.708,
      "perCapitaPPP": 3586.8,
      "perCapitaPPPChangePct": -0.94,
      "popChangePct": 3.45
    },
    {
      "year": 2005,
      "gdpPPP": 14.314,
      "perCapitaPPP": 3897.2,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": 3.67
    },
    {
      "year": 2006,
      "gdpPPP": 15.934,
      "perCapitaPPP": 4178.4,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 3.81
    },
    {
      "year": 2007,
      "gdpPPP": 15.283,
      "perCapitaPPP": 3862.9,
      "perCapitaPPPChangePct": -7.55,
      "popChangePct": 3.75
    },
    {
      "year": 2008,
      "gdpPPP": 16.56,
      "perCapitaPPP": 4049.2,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 3.39
    },
    {
      "year": 2009,
      "gdpPPP": 18.601,
      "perCapitaPPP": 4369.2,
      "perCapitaPPPChangePct": 7.9,
      "popChangePct": 4.08
    },
    {
      "year": 2010,
      "gdpPPP": 20.697,
      "perCapitaPPP": 4663.6,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 4.25
    },
    {
      "year": 2011,
      "gdpPPP": 21.59,
      "perCapitaPPP": 4709.5,
      "perCapitaPPPChangePct": 0.98,
      "popChangePct": 3.29
    },
    {
      "year": 2012,
      "gdpPPP": 24.179,
      "perCapitaPPP": 5130.0,
      "perCapitaPPPChangePct": 8.93,
      "popChangePct": 2.81
    },
    {
      "year": 2013,
      "gdpPPP": 24.415,
      "perCapitaPPP": 5057.0,
      "perCapitaPPPChangePct": -1.42,
      "popChangePct": 2.44
    },
    {
      "year": 2014,
      "gdpPPP": 26.509,
      "perCapitaPPP": 5360.9,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 2.42
    },
    {
      "year": 2015,
      "gdpPPP": 25.805,
      "perCapitaPPP": 5095.4,
      "perCapitaPPPChangePct": -4.95,
      "popChangePct": 2.41
    },
    {
      "year": 2016,
      "gdpPPP": 24.75,
      "perCapitaPPP": 4771.6,
      "perCapitaPPPChangePct": -6.35,
      "popChangePct": 2.43
    },
    {
      "year": 2017,
      "gdpPPP": 23.783,
      "perCapitaPPP": 4477.0,
      "perCapitaPPPChangePct": -6.17,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdpPPP": 30.668,
      "perCapitaPPP": 5636.4,
      "perCapitaPPPChangePct": 25.9,
      "popChangePct": 2.43
    },
    {
      "year": 2019,
      "gdpPPP": 32.125,
      "perCapitaPPP": 5766.8,
      "perCapitaPPPChangePct": 2.31,
      "popChangePct": 2.39
    },
    {
      "year": 2020,
      "gdpPPP": 27.446,
      "perCapitaPPP": 4813.3,
      "perCapitaPPPChangePct": -16.53,
      "popChangePct": 2.35
    },
    {
      "year": 2021,
      "gdpPPP": 33.306,
      "perCapitaPPP": 5707.2,
      "perCapitaPPPChangePct": 18.57,
      "popChangePct": 2.35
    },
    {
      "year": 2022,
      "gdpPPP": 36.316,
      "perCapitaPPP": 6082.7,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 2.3
    },
    {
      "year": 2023,
      "gdpPPP": 38.405,
      "perCapitaPPP": 6257.3,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 2.81
    },
    {
      "year": 2024,
      "gdpPPP": 40.189,
      "perCapitaPPP": 6369.7,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 2.79
    },
    {
      "year": 2025,
      "gdpPPP": 42.308,
      "perCapitaPPP": 6522.8,
      "perCapitaPPPChangePct": 2.4,
      "popChangePct": 2.81
    },
    {
      "year": 2026,
      "gdpPPP": 44.754,
      "perCapitaPPP": 6712.1,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 2.81
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 47.221,
      "perCapitaPPP": 6889.2,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 2.79
    },
    {
      "year": 2028,
      "gdpPPP": 49.792,
      "perCapitaPPP": 7066.3,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 2.8
    },
    {
      "year": 2029,
      "gdpPPP": 52.547,
      "perCapitaPPP": 7254.2,
      "perCapitaPPPChangePct": 2.66,
      "popChangePct": 2.81
    },
    {
      "year": 2030,
      "gdpPPP": 55.429,
      "perCapitaPPP": 7443.7,
      "perCapitaPPPChangePct": 2.61,
      "popChangePct": 2.79
    },
    {
      "year": 2031,
      "gdpPPP": 58.449,
      "perCapitaPPP": 7635.4,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 2.81
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CongoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
