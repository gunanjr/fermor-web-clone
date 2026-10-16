import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Haiti",
  "slug": "haiti",
  "iso3": "HTI",
  "region": "Americas",
  "rank2026": 113,
  "flagEmoji": "🇭🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "El Salvador",
      "slug": "el-salvador",
      "rank": 112
    },
    {
      "name": "Bosnia and Herzegovina",
      "slug": "bosnia-and-herzegovina",
      "rank": 114
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.664,
      "growth": 7.3,
      "perCapita": 447.9,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.932,
      "growth": 1.1,
      "perCapita": 484.3,
      "popChangePct": 1.8
    },
    {
      "year": 1982,
      "gdp": 3.05,
      "growth": -2.8,
      "perCapita": 494.9,
      "popChangePct": 1.8
    },
    {
      "year": 1983,
      "gdp": 3.273,
      "growth": -1.5,
      "perCapita": 521.8,
      "popChangePct": 1.8
    },
    {
      "year": 1984,
      "gdp": 3.627,
      "growth": 0.2,
      "perCapita": 567.9,
      "popChangePct": 1.8
    },
    {
      "year": 1985,
      "gdp": 4.028,
      "growth": 0.8,
      "perCapita": 619.5,
      "popChangePct": 1.8
    },
    {
      "year": 1986,
      "gdp": 4.475,
      "growth": 0.3,
      "perCapita": 676.1,
      "popChangePct": 1.8
    },
    {
      "year": 1987,
      "gdp": 2.205,
      "growth": -0.4,
      "perCapita": 327.2,
      "popChangePct": 1.81
    },
    {
      "year": 1988,
      "gdp": 1.45,
      "growth": 0.6,
      "perCapita": 212.6,
      "popChangePct": 1.19
    },
    {
      "year": 1989,
      "gdp": 1.34,
      "growth": -1.1,
      "perCapita": 192.6,
      "popChangePct": 2.04
    },
    {
      "year": 1990,
      "gdp": 1.706,
      "growth": -0.4,
      "perCapita": 240.2,
      "popChangePct": 2.06
    },
    {
      "year": 1991,
      "gdp": 1.53,
      "growth": 1.3,
      "perCapita": 211.5,
      "popChangePct": 1.86
    },
    {
      "year": 1992,
      "gdp": 0.918,
      "growth": -2.3,
      "perCapita": 124.5,
      "popChangePct": 1.95
    },
    {
      "year": 1993,
      "gdp": 1.107,
      "growth": -4.9,
      "perCapita": 147.0,
      "popChangePct": 2.06
    },
    {
      "year": 1994,
      "gdp": 3.054,
      "growth": -11.6,
      "perCapita": 397.2,
      "popChangePct": 2.17
    },
    {
      "year": 1995,
      "gdp": 4.846,
      "growth": 9.9,
      "perCapita": 618.4,
      "popChangePct": 1.91
    },
    {
      "year": 1996,
      "gdp": 5,
      "growth": 4.1,
      "perCapita": 626.3,
      "popChangePct": 1.89
    },
    {
      "year": 1997,
      "gdp": 5.748,
      "growth": 2.7,
      "perCapita": 706.8,
      "popChangePct": 1.85
    },
    {
      "year": 1998,
      "gdp": 6.408,
      "growth": 2.2,
      "perCapita": 773.8,
      "popChangePct": 1.83
    },
    {
      "year": 1999,
      "gdp": 7.148,
      "growth": 2.7,
      "perCapita": 847.9,
      "popChangePct": 1.8
    },
    {
      "year": 2000,
      "gdp": 6.81,
      "growth": 0.9,
      "perCapita": 794.1,
      "popChangePct": 1.73
    },
    {
      "year": 2001,
      "gdp": 6.285,
      "growth": -0.3,
      "perCapita": 720.8,
      "popChangePct": 1.68
    },
    {
      "year": 2002,
      "gdp": 6.064,
      "growth": 1.1,
      "perCapita": 684.3,
      "popChangePct": 1.62
    },
    {
      "year": 2003,
      "gdp": 4.866,
      "growth": 3.5,
      "perCapita": 540.6,
      "popChangePct": 1.58
    },
    {
      "year": 2004,
      "gdp": 6.037,
      "growth": -1.3,
      "perCapita": 660.2,
      "popChangePct": 1.6
    },
    {
      "year": 2005,
      "gdp": 7.186,
      "growth": 3.1,
      "perCapita": 773.4,
      "popChangePct": 1.61
    },
    {
      "year": 2006,
      "gdp": 7.507,
      "growth": 1.8,
      "perCapita": 794.8,
      "popChangePct": 1.65
    },
    {
      "year": 2007,
      "gdp": 9.522,
      "growth": 4.7,
      "perCapita": 991.7,
      "popChangePct": 1.66
    },
    {
      "year": 2008,
      "gdp": 10.488,
      "growth": 2.7,
      "perCapita": 1074.4,
      "popChangePct": 1.67
    },
    {
      "year": 2009,
      "gdp": 11.598,
      "growth": 5.9,
      "perCapita": 1168.7,
      "popChangePct": 1.65
    },
    {
      "year": 2010,
      "gdp": 11.852,
      "growth": -5.7,
      "perCapita": 1175.2,
      "popChangePct": 1.63
    },
    {
      "year": 2011,
      "gdp": 13.009,
      "growth": 5.1,
      "perCapita": 1269.3,
      "popChangePct": 1.62
    },
    {
      "year": 2012,
      "gdp": 13.709,
      "growth": 0.5,
      "perCapita": 1316.5,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdp": 14.904,
      "growth": 4.3,
      "perCapita": 1408.8,
      "popChangePct": 1.59
    },
    {
      "year": 2014,
      "gdp": 15.137,
      "growth": 1.7,
      "perCapita": 1408.7,
      "popChangePct": 1.58
    },
    {
      "year": 2015,
      "gdp": 14.831,
      "growth": 2.6,
      "perCapita": 1359.2,
      "popChangePct": 1.54
    },
    {
      "year": 2016,
      "gdp": 13.996,
      "growth": 1.8,
      "perCapita": 1263.4,
      "popChangePct": 1.52
    },
    {
      "year": 2017,
      "gdp": 15.036,
      "growth": 2.5,
      "perCapita": 1337.2,
      "popChangePct": 1.51
    },
    {
      "year": 2018,
      "gdp": 16.454,
      "growth": 1.7,
      "perCapita": 1441.9,
      "popChangePct": 1.49
    },
    {
      "year": 2019,
      "gdp": 14.787,
      "growth": -1.7,
      "perCapita": 1277.2,
      "popChangePct": 1.45
    },
    {
      "year": 2020,
      "gdp": 14.508,
      "growth": -3.3,
      "perCapita": 1235.5,
      "popChangePct": 1.43
    },
    {
      "year": 2021,
      "gdp": 21.017,
      "growth": -1.8,
      "perCapita": 1765.2,
      "popChangePct": 1.39
    },
    {
      "year": 2022,
      "gdp": 19.826,
      "growth": -1.7,
      "perCapita": 1643.2,
      "popChangePct": 1.34
    },
    {
      "year": 2023,
      "gdp": 19.603,
      "growth": -1.9,
      "perCapita": 1603.3,
      "popChangePct": 1.34
    },
    {
      "year": 2024,
      "gdp": 25.285,
      "growth": -4.2,
      "perCapita": 2040.6,
      "popChangePct": 1.34
    },
    {
      "year": 2025,
      "gdp": 32.102,
      "growth": -2.7,
      "perCapita": 2556.5,
      "popChangePct": 1.34
    },
    {
      "year": 2026,
      "gdp": 39.18,
      "growth": -1.7,
      "perCapita": 3078.9,
      "popChangePct": 1.34
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 45.098,
      "growth": 0.5,
      "perCapita": 3497.1,
      "popChangePct": 1.34
    },
    {
      "year": 2028,
      "gdp": 47.515,
      "growth": 1.2,
      "perCapita": 3635.8,
      "popChangePct": 1.34
    },
    {
      "year": 2029,
      "gdp": 48.388,
      "growth": 1.3,
      "perCapita": 3653.7,
      "popChangePct": 1.34
    },
    {
      "year": 2030,
      "gdp": 48.882,
      "growth": 1.5,
      "perCapita": 3642.2,
      "popChangePct": 1.34
    },
    {
      "year": 2031,
      "gdp": 50.588,
      "growth": 1.5,
      "perCapita": 3719.4,
      "popChangePct": 1.34
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 10.2,
      "perCapitaPPP": 1715.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 11.283,
      "perCapitaPPP": 1863.7,
      "perCapitaPPPChangePct": 8.65,
      "popChangePct": 1.8
    },
    {
      "year": 1982,
      "gdpPPP": 11.645,
      "perCapitaPPP": 1889.6,
      "perCapitaPPPChangePct": 1.39,
      "popChangePct": 1.8
    },
    {
      "year": 1983,
      "gdpPPP": 11.92,
      "perCapitaPPP": 1900.0,
      "perCapitaPPPChangePct": 0.55,
      "popChangePct": 1.8
    },
    {
      "year": 1984,
      "gdpPPP": 12.375,
      "perCapitaPPP": 1937.6,
      "perCapitaPPPChangePct": 1.98,
      "popChangePct": 1.8
    },
    {
      "year": 1985,
      "gdpPPP": 12.863,
      "perCapitaPPP": 1978.3,
      "perCapitaPPPChangePct": 2.1,
      "popChangePct": 1.8
    },
    {
      "year": 1986,
      "gdpPPP": 13.158,
      "perCapitaPPP": 1987.8,
      "perCapitaPPPChangePct": 0.48,
      "popChangePct": 1.8
    },
    {
      "year": 1987,
      "gdpPPP": 13.426,
      "perCapitaPPP": 1992.2,
      "perCapitaPPPChangePct": 0.22,
      "popChangePct": 1.81
    },
    {
      "year": 1988,
      "gdpPPP": 13.977,
      "perCapitaPPP": 2049.7,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 1.19
    },
    {
      "year": 1989,
      "gdpPPP": 14.36,
      "perCapitaPPP": 2063.9,
      "perCapitaPPPChangePct": 0.7,
      "popChangePct": 2.04
    },
    {
      "year": 1990,
      "gdpPPP": 14.832,
      "perCapitaPPP": 2088.8,
      "perCapitaPPPChangePct": 1.21,
      "popChangePct": 2.06
    },
    {
      "year": 1991,
      "gdpPPP": 15.528,
      "perCapitaPPP": 2146.9,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 1.86
    },
    {
      "year": 1992,
      "gdpPPP": 15.524,
      "perCapitaPPP": 2105.2,
      "perCapitaPPPChangePct": -1.94,
      "popChangePct": 1.95
    },
    {
      "year": 1993,
      "gdpPPP": 15.11,
      "perCapitaPPP": 2007.6,
      "perCapitaPPPChangePct": -4.63,
      "popChangePct": 2.06
    },
    {
      "year": 1994,
      "gdpPPP": 13.642,
      "perCapitaPPP": 1774.2,
      "perCapitaPPPChangePct": -11.63,
      "popChangePct": 2.17
    },
    {
      "year": 1995,
      "gdpPPP": 15.306,
      "perCapitaPPP": 1953.2,
      "perCapitaPPPChangePct": 10.09,
      "popChangePct": 1.91
    },
    {
      "year": 1996,
      "gdpPPP": 16.231,
      "perCapitaPPP": 2033.0,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 1.89
    },
    {
      "year": 1997,
      "gdpPPP": 16.958,
      "perCapitaPPP": 2085.2,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": 1.85
    },
    {
      "year": 1998,
      "gdpPPP": 17.523,
      "perCapitaPPP": 2115.9,
      "perCapitaPPPChangePct": 1.47,
      "popChangePct": 1.83
    },
    {
      "year": 1999,
      "gdpPPP": 18.252,
      "perCapitaPPP": 2165.3,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 1.8
    },
    {
      "year": 2000,
      "gdpPPP": 18.828,
      "perCapitaPPP": 2195.4,
      "perCapitaPPPChangePct": 1.39,
      "popChangePct": 1.73
    },
    {
      "year": 2001,
      "gdpPPP": 19.186,
      "perCapitaPPP": 2200.3,
      "perCapitaPPPChangePct": 0.22,
      "popChangePct": 1.68
    },
    {
      "year": 2002,
      "gdpPPP": 19.689,
      "perCapitaPPP": 2222.1,
      "perCapitaPPPChangePct": 0.99,
      "popChangePct": 1.62
    },
    {
      "year": 2003,
      "gdpPPP": 20.777,
      "perCapitaPPP": 2308.1,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 1.58
    },
    {
      "year": 2004,
      "gdpPPP": 21.054,
      "perCapitaPPP": 2302.4,
      "perCapitaPPPChangePct": -0.25,
      "popChangePct": 1.6
    },
    {
      "year": 2005,
      "gdpPPP": 22.382,
      "perCapitaPPP": 2408.6,
      "perCapitaPPPChangePct": 4.61,
      "popChangePct": 1.61
    },
    {
      "year": 2006,
      "gdpPPP": 23.48,
      "perCapitaPPP": 2485.8,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 1.65
    },
    {
      "year": 2007,
      "gdpPPP": 25.251,
      "perCapitaPPP": 2629.7,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 1.66
    },
    {
      "year": 2008,
      "gdpPPP": 26.422,
      "perCapitaPPP": 2706.6,
      "perCapitaPPPChangePct": 2.92,
      "popChangePct": 1.67
    },
    {
      "year": 2009,
      "gdpPPP": 28.15,
      "perCapitaPPP": 2836.8,
      "perCapitaPPPChangePct": 4.81,
      "popChangePct": 1.65
    },
    {
      "year": 2010,
      "gdpPPP": 26.882,
      "perCapitaPPP": 2665.5,
      "perCapitaPPPChangePct": -6.04,
      "popChangePct": 1.63
    },
    {
      "year": 2011,
      "gdpPPP": 28.836,
      "perCapitaPPP": 2813.7,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 1.62
    },
    {
      "year": 2012,
      "gdpPPP": 29.52,
      "perCapitaPPP": 2834.9,
      "perCapitaPPPChangePct": 0.75,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdpPPP": 31.321,
      "perCapitaPPP": 2960.6,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 1.59
    },
    {
      "year": 2014,
      "gdpPPP": 32.416,
      "perCapitaPPP": 3016.6,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 1.58
    },
    {
      "year": 2015,
      "gdpPPP": 33.555,
      "perCapitaPPP": 3075.1,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 1.54
    },
    {
      "year": 2016,
      "gdpPPP": 34.488,
      "perCapitaPPP": 3113.1,
      "perCapitaPPPChangePct": 1.24,
      "popChangePct": 1.52
    },
    {
      "year": 2017,
      "gdpPPP": 35.986,
      "perCapitaPPP": 3200.3,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 1.51
    },
    {
      "year": 2018,
      "gdpPPP": 35.156,
      "perCapitaPPP": 3080.7,
      "perCapitaPPPChangePct": -3.74,
      "popChangePct": 1.49
    },
    {
      "year": 2019,
      "gdpPPP": 35.396,
      "perCapitaPPP": 3057.2,
      "perCapitaPPPChangePct": -0.76,
      "popChangePct": 1.45
    },
    {
      "year": 2020,
      "gdpPPP": 34.892,
      "perCapitaPPP": 2971.3,
      "perCapitaPPPChangePct": -2.81,
      "popChangePct": 1.43
    },
    {
      "year": 2021,
      "gdpPPP": 35.773,
      "perCapitaPPP": 3004.7,
      "perCapitaPPPChangePct": 1.12,
      "popChangePct": 1.39
    },
    {
      "year": 2022,
      "gdpPPP": 37.673,
      "perCapitaPPP": 3122.4,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 1.34
    },
    {
      "year": 2023,
      "gdpPPP": 38.339,
      "perCapitaPPP": 3135.6,
      "perCapitaPPPChangePct": 0.42,
      "popChangePct": 1.34
    },
    {
      "year": 2024,
      "gdpPPP": 37.646,
      "perCapitaPPP": 3038.2,
      "perCapitaPPPChangePct": -3.1,
      "popChangePct": 1.34
    },
    {
      "year": 2025,
      "gdpPPP": 37.664,
      "perCapitaPPP": 2999.4,
      "perCapitaPPPChangePct": -1.28,
      "popChangePct": 1.34
    },
    {
      "year": 2026,
      "gdpPPP": 38.084,
      "perCapitaPPP": 2992.8,
      "perCapitaPPPChangePct": -0.22,
      "popChangePct": 1.34
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 39.107,
      "perCapitaPPP": 3032.6,
      "perCapitaPPPChangePct": 1.33,
      "popChangePct": 1.34
    },
    {
      "year": 2028,
      "gdpPPP": 40.226,
      "perCapitaPPP": 3078.1,
      "perCapitaPPPChangePct": 1.5,
      "popChangePct": 1.34
    },
    {
      "year": 2029,
      "gdpPPP": 41.474,
      "perCapitaPPP": 3131.6,
      "perCapitaPPPChangePct": 1.74,
      "popChangePct": 1.34
    },
    {
      "year": 2030,
      "gdpPPP": 42.869,
      "perCapitaPPP": 3194.2,
      "perCapitaPPPChangePct": 2.0,
      "popChangePct": 1.34
    },
    {
      "year": 2031,
      "gdpPPP": 44.298,
      "perCapitaPPP": 3257.0,
      "perCapitaPPPChangePct": 1.97,
      "popChangePct": 1.34
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function HaitiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
