import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Barbados",
  "slug": "barbados",
  "iso3": "BRB",
  "region": "Americas",
  "rank2026": 160,
  "flagEmoji": "🇧🇧",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Liechtenstein",
      "slug": "liechtenstein",
      "rank": 158
    },
    {
      "name": "Sierra Leone",
      "slug": "sierra-leone",
      "rank": 161
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.108,
      "growth": 4.4,
      "perCapita": 4391.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.219,
      "growth": -1.9,
      "perCapita": 4816.4,
      "popChangePct": 0.4
    },
    {
      "year": 1982,
      "gdp": 1.274,
      "growth": -4.9,
      "perCapita": 5017.2,
      "popChangePct": 0.4
    },
    {
      "year": 1983,
      "gdp": 1.352,
      "growth": 0.5,
      "perCapita": 5312.2,
      "popChangePct": 0.39
    },
    {
      "year": 1984,
      "gdp": 1.474,
      "growth": 3.6,
      "perCapita": 5775.1,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdp": 1.542,
      "growth": 1.1,
      "perCapita": 6026.7,
      "popChangePct": 0.39
    },
    {
      "year": 1986,
      "gdp": 1.693,
      "growth": 5.1,
      "perCapita": 6595.9,
      "popChangePct": 0.39
    },
    {
      "year": 1987,
      "gdp": 1.865,
      "growth": 2.6,
      "perCapita": 7238.9,
      "popChangePct": 0.39
    },
    {
      "year": 1988,
      "gdp": 1.983,
      "growth": 3.5,
      "perCapita": 7672.2,
      "popChangePct": 0.39
    },
    {
      "year": 1989,
      "gdp": 2.195,
      "growth": 3.6,
      "perCapita": 8460.6,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdp": 2.202,
      "growth": -3.3,
      "perCapita": 8455.7,
      "popChangePct": 0.39
    },
    {
      "year": 1991,
      "gdp": 2.211,
      "growth": -3.9,
      "perCapita": 8461.9,
      "popChangePct": 0.38
    },
    {
      "year": 1992,
      "gdp": 2.129,
      "growth": -5.7,
      "perCapita": 8121.3,
      "popChangePct": 0.38
    },
    {
      "year": 1993,
      "gdp": 2.257,
      "growth": 0.8,
      "perCapita": 8580.4,
      "popChangePct": 0.38
    },
    {
      "year": 1994,
      "gdp": 2.354,
      "growth": 2,
      "perCapita": 8915.0,
      "popChangePct": 0.38
    },
    {
      "year": 1995,
      "gdp": 2.481,
      "growth": 2,
      "perCapita": 9365.0,
      "popChangePct": 0.38
    },
    {
      "year": 1996,
      "gdp": 2.657,
      "growth": 4,
      "perCapita": 9992.6,
      "popChangePct": 0.38
    },
    {
      "year": 1997,
      "gdp": 2.818,
      "growth": 4.7,
      "perCapita": 10556.6,
      "popChangePct": 0.38
    },
    {
      "year": 1998,
      "gdp": 3.23,
      "growth": 3.7,
      "perCapita": 12054.5,
      "popChangePct": 0.37
    },
    {
      "year": 1999,
      "gdp": 3.392,
      "growth": 0.3,
      "perCapita": 12614.7,
      "popChangePct": 0.37
    },
    {
      "year": 2000,
      "gdp": 3.499,
      "growth": 4.5,
      "perCapita": 12967.3,
      "popChangePct": 0.37
    },
    {
      "year": 2001,
      "gdp": 3.494,
      "growth": -2.4,
      "perCapita": 12907.1,
      "popChangePct": 0.37
    },
    {
      "year": 2002,
      "gdp": 3.554,
      "growth": 0.8,
      "perCapita": 13091.8,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 3.676,
      "growth": 2.2,
      "perCapita": 13502.6,
      "popChangePct": 0.37
    },
    {
      "year": 2004,
      "gdp": 3.966,
      "growth": 1.4,
      "perCapita": 14523.6,
      "popChangePct": 0.37
    },
    {
      "year": 2005,
      "gdp": 4.451,
      "growth": 4,
      "perCapita": 16245.1,
      "popChangePct": 0.37
    },
    {
      "year": 2006,
      "gdp": 4.969,
      "growth": 5.7,
      "perCapita": 18066.1,
      "popChangePct": 0.36
    },
    {
      "year": 2007,
      "gdp": 5.572,
      "growth": 2.3,
      "perCapita": 20177.7,
      "popChangePct": 0.36
    },
    {
      "year": 2008,
      "gdp": 5.708,
      "growth": 0.7,
      "perCapita": 20581.2,
      "popChangePct": 0.36
    },
    {
      "year": 2009,
      "gdp": 5.351,
      "growth": -4.8,
      "perCapita": 19214.0,
      "popChangePct": 0.36
    },
    {
      "year": 2010,
      "gdp": 5.429,
      "growth": -2.2,
      "perCapita": 19418.0,
      "popChangePct": 0.72
    },
    {
      "year": 2011,
      "gdp": 5.563,
      "growth": -0.1,
      "perCapita": 19825.9,
      "popChangePct": 0.36
    },
    {
      "year": 2012,
      "gdp": 5.487,
      "growth": -2.9,
      "perCapita": 19484.3,
      "popChangePct": 0.36
    },
    {
      "year": 2013,
      "gdp": 5.66,
      "growth": 0.2,
      "perCapita": 20035.0,
      "popChangePct": 0.35
    },
    {
      "year": 2014,
      "gdp": 5.685,
      "growth": 0.8,
      "perCapita": 20060.7,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 5.7,
      "growth": -0.8,
      "perCapita": 20053.8,
      "popChangePct": 0.35
    },
    {
      "year": 2016,
      "gdp": 5.679,
      "growth": 1.4,
      "perCapita": 19926.7,
      "popChangePct": 0.35
    },
    {
      "year": 2017,
      "gdp": 5.847,
      "growth": 0.7,
      "perCapita": 20465.5,
      "popChangePct": 0.35
    },
    {
      "year": 2018,
      "gdp": 6.001,
      "growth": -0.3,
      "perCapita": 20950.4,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 6.167,
      "growth": 0.2,
      "perCapita": 21474.0,
      "popChangePct": 0.35
    },
    {
      "year": 2020,
      "gdp": 5.403,
      "growth": -17.4,
      "perCapita": 18767.9,
      "popChangePct": 0.35
    },
    {
      "year": 2021,
      "gdp": 5.949,
      "growth": 8,
      "perCapita": 20610.9,
      "popChangePct": 0.35
    },
    {
      "year": 2022,
      "gdp": 6.887,
      "growth": 15.9,
      "perCapita": 23799.4,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 7.223,
      "growth": 1.8,
      "perCapita": 24876.7,
      "popChangePct": 0.35
    },
    {
      "year": 2024,
      "gdp": 7.598,
      "growth": 3.4,
      "perCapita": 26076.1,
      "popChangePct": 0.34
    },
    {
      "year": 2025,
      "gdp": 8.017,
      "growth": 2.7,
      "perCapita": 27494.5,
      "popChangePct": 0.34
    },
    {
      "year": 2026,
      "gdp": 8.483,
      "growth": 2.5,
      "perCapita": 29019.6,
      "popChangePct": 0.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 8.955,
      "growth": 2.2,
      "perCapita": 30556.2,
      "popChangePct": 0.34
    },
    {
      "year": 2028,
      "gdp": 9.375,
      "growth": 2,
      "perCapita": 31908.6,
      "popChangePct": 0.34
    },
    {
      "year": 2029,
      "gdp": 9.811,
      "growth": 2,
      "perCapita": 33308.6,
      "popChangePct": 0.34
    },
    {
      "year": 2030,
      "gdp": 10.268,
      "growth": 2,
      "perCapita": 34772.0,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 10.75,
      "growth": 2,
      "perCapita": 36313.7,
      "popChangePct": 0.34
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.589,
      "perCapitaPPP": 6301.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 1.706,
      "perCapitaPPP": 6742.5,
      "perCapitaPPPChangePct": 7.01,
      "popChangePct": 0.4
    },
    {
      "year": 1982,
      "gdpPPP": 1.723,
      "perCapitaPPP": 6788.0,
      "perCapitaPPPChangePct": 0.67,
      "popChangePct": 0.4
    },
    {
      "year": 1983,
      "gdpPPP": 1.799,
      "perCapitaPPP": 7070.2,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 0.39
    },
    {
      "year": 1984,
      "gdpPPP": 1.932,
      "perCapitaPPP": 7569.0,
      "perCapitaPPPChangePct": 7.06,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdpPPP": 2.015,
      "perCapitaPPP": 7871.7,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.39
    },
    {
      "year": 1986,
      "gdpPPP": 2.16,
      "perCapitaPPP": 8413.0,
      "perCapitaPPPChangePct": 6.88,
      "popChangePct": 0.39
    },
    {
      "year": 1987,
      "gdpPPP": 2.271,
      "perCapitaPPP": 8815.6,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.39
    },
    {
      "year": 1988,
      "gdpPPP": 2.433,
      "perCapitaPPP": 9412.5,
      "perCapitaPPPChangePct": 6.77,
      "popChangePct": 0.39
    },
    {
      "year": 1989,
      "gdpPPP": 2.62,
      "perCapitaPPP": 10097.3,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdpPPP": 2.628,
      "perCapitaPPP": 10093.9,
      "perCapitaPPPChangePct": -0.03,
      "popChangePct": 0.39
    },
    {
      "year": 1991,
      "gdpPPP": 2.611,
      "perCapitaPPP": 9993.7,
      "perCapitaPPPChangePct": -0.99,
      "popChangePct": 0.38
    },
    {
      "year": 1992,
      "gdpPPP": 2.518,
      "perCapitaPPP": 9605.5,
      "perCapitaPPPChangePct": -3.89,
      "popChangePct": 0.38
    },
    {
      "year": 1993,
      "gdpPPP": 2.599,
      "perCapitaPPP": 9877.7,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 0.38
    },
    {
      "year": 1994,
      "gdpPPP": 2.707,
      "perCapitaPPP": 10254.3,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 0.38
    },
    {
      "year": 1995,
      "gdpPPP": 2.82,
      "perCapitaPPP": 10643.0,
      "perCapitaPPPChangePct": 3.79,
      "popChangePct": 0.38
    },
    {
      "year": 1996,
      "gdpPPP": 2.985,
      "perCapitaPPP": 11226.1,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 0.38
    },
    {
      "year": 1997,
      "gdpPPP": 3.181,
      "perCapitaPPP": 11916.1,
      "perCapitaPPPChangePct": 6.15,
      "popChangePct": 0.38
    },
    {
      "year": 1998,
      "gdpPPP": 3.337,
      "perCapitaPPP": 12453.8,
      "perCapitaPPPChangePct": 4.51,
      "popChangePct": 0.37
    },
    {
      "year": 1999,
      "gdpPPP": 3.395,
      "perCapitaPPP": 12625.4,
      "perCapitaPPPChangePct": 1.38,
      "popChangePct": 0.37
    },
    {
      "year": 2000,
      "gdpPPP": 3.627,
      "perCapitaPPP": 13440.1,
      "perCapitaPPPChangePct": 6.45,
      "popChangePct": 0.37
    },
    {
      "year": 2001,
      "gdpPPP": 3.621,
      "perCapitaPPP": 13375.9,
      "perCapitaPPPChangePct": -0.48,
      "popChangePct": 0.37
    },
    {
      "year": 2002,
      "gdpPPP": 3.706,
      "perCapitaPPP": 13651.2,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 3.861,
      "perCapitaPPP": 14182.2,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 0.37
    },
    {
      "year": 2004,
      "gdpPPP": 4.021,
      "perCapitaPPP": 14723.4,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.37
    },
    {
      "year": 2005,
      "gdpPPP": 4.311,
      "perCapitaPPP": 15734.3,
      "perCapitaPPPChangePct": 6.87,
      "popChangePct": 0.37
    },
    {
      "year": 2006,
      "gdpPPP": 4.696,
      "perCapitaPPP": 17074.8,
      "perCapitaPPPChangePct": 8.52,
      "popChangePct": 0.36
    },
    {
      "year": 2007,
      "gdpPPP": 4.932,
      "perCapitaPPP": 17860.1,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 0.36
    },
    {
      "year": 2008,
      "gdpPPP": 5.062,
      "perCapitaPPP": 18254.7,
      "perCapitaPPPChangePct": 2.21,
      "popChangePct": 0.36
    },
    {
      "year": 2009,
      "gdpPPP": 4.848,
      "perCapitaPPP": 17407.8,
      "perCapitaPPPChangePct": -4.64,
      "popChangePct": 0.36
    },
    {
      "year": 2010,
      "gdpPPP": 4.797,
      "perCapitaPPP": 17157.6,
      "perCapitaPPPChangePct": -1.44,
      "popChangePct": 0.72
    },
    {
      "year": 2011,
      "gdpPPP": 4.892,
      "perCapitaPPP": 17434.3,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 0.36
    },
    {
      "year": 2012,
      "gdpPPP": 4.841,
      "perCapitaPPP": 17191.0,
      "perCapitaPPPChangePct": -1.4,
      "popChangePct": 0.36
    },
    {
      "year": 2013,
      "gdpPPP": 4.933,
      "perCapitaPPP": 17460.5,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 0.35
    },
    {
      "year": 2014,
      "gdpPPP": 5.059,
      "perCapitaPPP": 17852.7,
      "perCapitaPPPChangePct": 2.25,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 5.067,
      "perCapitaPPP": 17826.8,
      "perCapitaPPPChangePct": -0.14,
      "popChangePct": 0.35
    },
    {
      "year": 2016,
      "gdpPPP": 5.187,
      "perCapitaPPP": 18201.2,
      "perCapitaPPPChangePct": 2.1,
      "popChangePct": 0.35
    },
    {
      "year": 2017,
      "gdpPPP": 5.315,
      "perCapitaPPP": 18601.2,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 0.35
    },
    {
      "year": 2018,
      "gdpPPP": 5.551,
      "perCapitaPPP": 19378.5,
      "perCapitaPPPChangePct": 4.18,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 5.62,
      "perCapitaPPP": 19571.8,
      "perCapitaPPPChangePct": 1.0,
      "popChangePct": 0.35
    },
    {
      "year": 2020,
      "gdpPPP": 4.66,
      "perCapitaPPP": 16187.4,
      "perCapitaPPPChangePct": -17.29,
      "popChangePct": 0.35
    },
    {
      "year": 2021,
      "gdpPPP": 4.99,
      "perCapitaPPP": 17289.5,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 0.35
    },
    {
      "year": 2022,
      "gdpPPP": 6.197,
      "perCapitaPPP": 21417.8,
      "perCapitaPPPChangePct": 23.88,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 6.543,
      "perCapitaPPP": 22535.4,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 0.35
    },
    {
      "year": 2024,
      "gdpPPP": 6.932,
      "perCapitaPPP": 23790.5,
      "perCapitaPPPChangePct": 5.57,
      "popChangePct": 0.34
    },
    {
      "year": 2025,
      "gdpPPP": 7.324,
      "perCapitaPPP": 25118.5,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 0.34
    },
    {
      "year": 2026,
      "gdpPPP": 7.719,
      "perCapitaPPP": 26408.1,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 8.065,
      "perCapitaPPP": 27519.5,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 0.34
    },
    {
      "year": 2028,
      "gdpPPP": 8.361,
      "perCapitaPPP": 28458.5,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 0.34
    },
    {
      "year": 2029,
      "gdpPPP": 8.68,
      "perCapitaPPP": 29469.0,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 0.34
    },
    {
      "year": 2030,
      "gdpPPP": 9.016,
      "perCapitaPPP": 30533.3,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 9.362,
      "perCapitaPPP": 31626.0,
      "perCapitaPPPChangePct": 3.58,
      "popChangePct": 0.34
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BarbadosGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
