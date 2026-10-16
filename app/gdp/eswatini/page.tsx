import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Eswatini",
  "slug": "eswatini",
  "iso3": "SWZ",
  "region": "Africa",
  "rank2026": 172,
  "flagEmoji": "🇸🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Suriname",
      "slug": "suriname",
      "rank": 171
    },
    {
      "name": "Liberia",
      "slug": "liberia",
      "rank": 173
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.732,
      "growth": -3.8,
      "perCapita": 1329.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.775,
      "growth": 6.9,
      "perCapita": 1359.9,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdp": 0.693,
      "growth": 1.4,
      "perCapita": 1176.7,
      "popChangePct": 3.33
    },
    {
      "year": 1983,
      "gdp": 0.713,
      "growth": -0.5,
      "perCapita": 1171.6,
      "popChangePct": 3.4
    },
    {
      "year": 1984,
      "gdp": 0.61,
      "growth": 2.5,
      "perCapita": 969.5,
      "popChangePct": 3.28
    },
    {
      "year": 1985,
      "gdp": 0.482,
      "growth": 1.9,
      "perCapita": 739.1,
      "popChangePct": 3.66
    },
    {
      "year": 1986,
      "gdp": 0.617,
      "growth": 18.6,
      "perCapita": 908.9,
      "popChangePct": 4.14
    },
    {
      "year": 1987,
      "gdp": 0.807,
      "growth": 10,
      "perCapita": 1143.3,
      "popChangePct": 3.83
    },
    {
      "year": 1988,
      "gdp": 0.958,
      "growth": 7.6,
      "perCapita": 1296.3,
      "popChangePct": 4.82
    },
    {
      "year": 1989,
      "gdp": 0.977,
      "growth": 9.4,
      "perCapita": 1262.3,
      "popChangePct": 4.74
    },
    {
      "year": 1990,
      "gdp": 1.201,
      "growth": 9.9,
      "perCapita": 1490.0,
      "popChangePct": 4.13
    },
    {
      "year": 1991,
      "gdp": 1.247,
      "growth": 1.8,
      "perCapita": 1486.7,
      "popChangePct": 4.09
    },
    {
      "year": 1992,
      "gdp": 1.384,
      "growth": 3.2,
      "perCapita": 1588.0,
      "popChangePct": 3.81
    },
    {
      "year": 1993,
      "gdp": 1.453,
      "growth": 3.1,
      "perCapita": 1620.0,
      "popChangePct": 2.99
    },
    {
      "year": 1994,
      "gdp": 1.574,
      "growth": 2.4,
      "perCapita": 1754.9,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdp": 1.876,
      "growth": 4.8,
      "perCapita": 2092.9,
      "popChangePct": -0.11
    },
    {
      "year": 1996,
      "gdp": 1.776,
      "growth": 3.8,
      "perCapita": 1943.0,
      "popChangePct": 2.01
    },
    {
      "year": 1997,
      "gdp": 1.9,
      "growth": 3.1,
      "perCapita": 2043.7,
      "popChangePct": 1.75
    },
    {
      "year": 1998,
      "gdp": 1.744,
      "growth": 2.6,
      "perCapita": 1852.2,
      "popChangePct": 1.29
    },
    {
      "year": 1999,
      "gdp": 1.712,
      "growth": 3,
      "perCapita": 1798.5,
      "popChangePct": 1.06
    },
    {
      "year": 2000,
      "gdp": 1.689,
      "growth": 1.8,
      "perCapita": 1755.5,
      "popChangePct": 1.05
    },
    {
      "year": 2001,
      "gdp": 1.499,
      "growth": 1.1,
      "perCapita": 1543.7,
      "popChangePct": 0.94
    },
    {
      "year": 2002,
      "gdp": 1.394,
      "growth": 4.4,
      "perCapita": 1424.3,
      "popChangePct": 0.72
    },
    {
      "year": 2003,
      "gdp": 2.133,
      "growth": 3.9,
      "perCapita": 2165.5,
      "popChangePct": 0.72
    },
    {
      "year": 2004,
      "gdp": 2.693,
      "growth": 3.6,
      "perCapita": 2717.2,
      "popChangePct": 0.61
    },
    {
      "year": 2005,
      "gdp": 3.084,
      "growth": 6,
      "perCapita": 3094.7,
      "popChangePct": 0.61
    },
    {
      "year": 2006,
      "gdp": 3.197,
      "growth": 6,
      "perCapita": 3192.3,
      "popChangePct": 0.5
    },
    {
      "year": 2007,
      "gdp": 3.364,
      "growth": 4.4,
      "perCapita": 3339.2,
      "popChangePct": 0.5
    },
    {
      "year": 2008,
      "gdp": 3.202,
      "growth": 0.8,
      "perCapita": 3156.8,
      "popChangePct": 0.7
    },
    {
      "year": 2009,
      "gdp": 3.491,
      "growth": 1.6,
      "perCapita": 3420.2,
      "popChangePct": 0.69
    },
    {
      "year": 2010,
      "gdp": 4.309,
      "growth": 3.8,
      "perCapita": 4196.6,
      "popChangePct": 0.59
    },
    {
      "year": 2011,
      "gdp": 4.685,
      "growth": 2.2,
      "perCapita": 4537.9,
      "popChangePct": 0.49
    },
    {
      "year": 2012,
      "gdp": 4.744,
      "growth": 5.4,
      "perCapita": 4570.4,
      "popChangePct": 0.58
    },
    {
      "year": 2013,
      "gdp": 4.466,
      "growth": 3.9,
      "perCapita": 4278.8,
      "popChangePct": 0.58
    },
    {
      "year": 2014,
      "gdp": 4.288,
      "growth": 2.1,
      "perCapita": 4086.1,
      "popChangePct": 0.48
    },
    {
      "year": 2015,
      "gdp": 3.906,
      "growth": 1.7,
      "perCapita": 3701.0,
      "popChangePct": 0.57
    },
    {
      "year": 2016,
      "gdp": 3.721,
      "growth": 2.9,
      "perCapita": 3505.3,
      "popChangePct": 0.66
    },
    {
      "year": 2017,
      "gdp": 4.467,
      "growth": 3.5,
      "perCapita": 4175.6,
      "popChangePct": 0.75
    },
    {
      "year": 2018,
      "gdp": 4.644,
      "growth": 0.1,
      "perCapita": 4301.5,
      "popChangePct": 0.93
    },
    {
      "year": 2019,
      "gdp": 4.617,
      "growth": 6.4,
      "perCapita": 4236.9,
      "popChangePct": 0.93
    },
    {
      "year": 2020,
      "gdp": 4.136,
      "growth": -3,
      "perCapita": 3754.8,
      "popChangePct": 1.1
    },
    {
      "year": 2021,
      "gdp": 4.807,
      "growth": 4.2,
      "perCapita": 4317.0,
      "popChangePct": 1.09
    },
    {
      "year": 2022,
      "gdp": 4.747,
      "growth": 0.4,
      "perCapita": 4216.5,
      "popChangePct": 1.08
    },
    {
      "year": 2023,
      "gdp": 4.621,
      "growth": 3.5,
      "perCapita": 4060.4,
      "popChangePct": 1.07
    },
    {
      "year": 2024,
      "gdp": 4.855,
      "growth": 3,
      "perCapita": 4220.4,
      "popChangePct": 1.05
    },
    {
      "year": 2025,
      "gdp": 5.166,
      "growth": 3.6,
      "perCapita": 4442.3,
      "popChangePct": 1.13
    },
    {
      "year": 2026,
      "gdp": 5.792,
      "growth": 4,
      "perCapita": 4927.0,
      "popChangePct": 1.12
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 5.961,
      "growth": 3.5,
      "perCapita": 5016.0,
      "popChangePct": 1.02
    },
    {
      "year": 2028,
      "gdp": 6.19,
      "growth": 2.9,
      "perCapita": 5152.9,
      "popChangePct": 1.09
    },
    {
      "year": 2029,
      "gdp": 6.476,
      "growth": 2.9,
      "perCapita": 5332.7,
      "popChangePct": 1.08
    },
    {
      "year": 2030,
      "gdp": 6.775,
      "growth": 2.8,
      "perCapita": 5518.8,
      "popChangePct": 1.15
    },
    {
      "year": 2031,
      "gdp": 7.086,
      "growth": 2.7,
      "perCapita": 5709.6,
      "popChangePct": 1.06
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.878,
      "perCapitaPPP": 1593.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 1.028,
      "perCapitaPPP": 1804.0,
      "perCapitaPPPChangePct": 13.19,
      "popChangePct": 3.45
    },
    {
      "year": 1982,
      "gdpPPP": 1.107,
      "perCapitaPPP": 1879.5,
      "perCapitaPPPChangePct": 4.19,
      "popChangePct": 3.33
    },
    {
      "year": 1983,
      "gdpPPP": 1.144,
      "perCapitaPPP": 1879.6,
      "perCapitaPPPChangePct": 0.01,
      "popChangePct": 3.4
    },
    {
      "year": 1984,
      "gdpPPP": 1.215,
      "perCapitaPPP": 1931.8,
      "perCapitaPPPChangePct": 2.78,
      "popChangePct": 3.28
    },
    {
      "year": 1985,
      "gdpPPP": 1.277,
      "perCapitaPPP": 1958.1,
      "perCapitaPPPChangePct": 1.36,
      "popChangePct": 3.66
    },
    {
      "year": 1986,
      "gdpPPP": 1.545,
      "perCapitaPPP": 2276.8,
      "perCapitaPPPChangePct": 16.27,
      "popChangePct": 4.14
    },
    {
      "year": 1987,
      "gdpPPP": 1.742,
      "perCapitaPPP": 2469.2,
      "perCapitaPPPChangePct": 8.45,
      "popChangePct": 3.83
    },
    {
      "year": 1988,
      "gdpPPP": 1.94,
      "perCapitaPPP": 2626.0,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 4.82
    },
    {
      "year": 1989,
      "gdpPPP": 2.206,
      "perCapitaPPP": 2850.3,
      "perCapitaPPPChangePct": 8.54,
      "popChangePct": 4.74
    },
    {
      "year": 1990,
      "gdpPPP": 2.514,
      "perCapitaPPP": 3119.6,
      "perCapitaPPPChangePct": 9.45,
      "popChangePct": 4.13
    },
    {
      "year": 1991,
      "gdpPPP": 2.644,
      "perCapitaPPP": 3152.6,
      "perCapitaPPPChangePct": 1.06,
      "popChangePct": 4.09
    },
    {
      "year": 1992,
      "gdpPPP": 2.792,
      "perCapitaPPP": 3204.2,
      "perCapitaPPPChangePct": 1.64,
      "popChangePct": 3.81
    },
    {
      "year": 1993,
      "gdpPPP": 2.947,
      "perCapitaPPP": 3284.9,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 2.99
    },
    {
      "year": 1994,
      "gdpPPP": 3.082,
      "perCapitaPPP": 3436.0,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdpPPP": 3.299,
      "perCapitaPPP": 3680.3,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": -0.11
    },
    {
      "year": 1996,
      "gdpPPP": 3.488,
      "perCapitaPPP": 3815.3,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 2.01
    },
    {
      "year": 1997,
      "gdpPPP": 3.658,
      "perCapitaPPP": 3934.8,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 1.75
    },
    {
      "year": 1998,
      "gdpPPP": 3.796,
      "perCapitaPPP": 4030.5,
      "perCapitaPPPChangePct": 2.43,
      "popChangePct": 1.29
    },
    {
      "year": 1999,
      "gdpPPP": 3.963,
      "perCapitaPPP": 4162.7,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 1.06
    },
    {
      "year": 2000,
      "gdpPPP": 4.124,
      "perCapitaPPP": 4287.7,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 1.05
    },
    {
      "year": 2001,
      "gdpPPP": 4.261,
      "perCapitaPPP": 4389.8,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 0.94
    },
    {
      "year": 2002,
      "gdpPPP": 4.517,
      "perCapitaPPP": 4616.5,
      "perCapitaPPPChangePct": 5.16,
      "popChangePct": 0.72
    },
    {
      "year": 2003,
      "gdpPPP": 4.785,
      "perCapitaPPP": 4857.1,
      "perCapitaPPPChangePct": 5.21,
      "popChangePct": 0.72
    },
    {
      "year": 2004,
      "gdpPPP": 5.092,
      "perCapitaPPP": 5137.3,
      "perCapitaPPPChangePct": 5.77,
      "popChangePct": 0.61
    },
    {
      "year": 2005,
      "gdpPPP": 5.567,
      "perCapitaPPP": 5585.7,
      "perCapitaPPPChangePct": 8.73,
      "popChangePct": 0.61
    },
    {
      "year": 2006,
      "gdpPPP": 6.082,
      "perCapitaPPP": 6072.5,
      "perCapitaPPPChangePct": 8.72,
      "popChangePct": 0.5
    },
    {
      "year": 2007,
      "gdpPPP": 6.524,
      "perCapitaPPP": 6476.2,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 0.5
    },
    {
      "year": 2008,
      "gdpPPP": 6.704,
      "perCapitaPPP": 6610.5,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 0.7
    },
    {
      "year": 2009,
      "gdpPPP": 6.851,
      "perCapitaPPP": 6712.2,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 0.69
    },
    {
      "year": 2010,
      "gdpPPP": 7.198,
      "perCapitaPPP": 7010.3,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": 0.59
    },
    {
      "year": 2011,
      "gdpPPP": 7.511,
      "perCapitaPPP": 7275.2,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 0.49
    },
    {
      "year": 2012,
      "gdpPPP": 8.064,
      "perCapitaPPP": 7768.7,
      "perCapitaPPPChangePct": 6.78,
      "popChangePct": 0.58
    },
    {
      "year": 2013,
      "gdpPPP": 8.518,
      "perCapitaPPP": 8161.5,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 0.58
    },
    {
      "year": 2014,
      "gdpPPP": 8.844,
      "perCapitaPPP": 8427.5,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.48
    },
    {
      "year": 2015,
      "gdpPPP": 9.079,
      "perCapitaPPP": 8601.3,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 0.57
    },
    {
      "year": 2016,
      "gdpPPP": 9.435,
      "perCapitaPPP": 8887.1,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 0.66
    },
    {
      "year": 2017,
      "gdpPPP": 9.942,
      "perCapitaPPP": 9294.5,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": 0.75
    },
    {
      "year": 2018,
      "gdpPPP": 9.977,
      "perCapitaPPP": 9241.4,
      "perCapitaPPPChangePct": -0.57,
      "popChangePct": 0.93
    },
    {
      "year": 2019,
      "gdpPPP": 10.912,
      "perCapitaPPP": 10013.5,
      "perCapitaPPPChangePct": 8.35,
      "popChangePct": 0.93
    },
    {
      "year": 2020,
      "gdpPPP": 11.127,
      "perCapitaPPP": 10101.1,
      "perCapitaPPPChangePct": 0.88,
      "popChangePct": 1.1
    },
    {
      "year": 2021,
      "gdpPPP": 12.054,
      "perCapitaPPP": 10824.8,
      "perCapitaPPPChangePct": 7.16,
      "popChangePct": 1.09
    },
    {
      "year": 2022,
      "gdpPPP": 12.962,
      "perCapitaPPP": 11514.0,
      "perCapitaPPPChangePct": 6.37,
      "popChangePct": 1.08
    },
    {
      "year": 2023,
      "gdpPPP": 13.916,
      "perCapitaPPP": 12228.5,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 1.07
    },
    {
      "year": 2024,
      "gdpPPP": 14.686,
      "perCapitaPPP": 12765.7,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 1.05
    },
    {
      "year": 2025,
      "gdpPPP": 15.648,
      "perCapitaPPP": 13455.5,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 1.13
    },
    {
      "year": 2026,
      "gdpPPP": 16.746,
      "perCapitaPPP": 14244.5,
      "perCapitaPPPChangePct": 5.86,
      "popChangePct": 1.12
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 17.705,
      "perCapitaPPP": 14898.4,
      "perCapitaPPPChangePct": 4.59,
      "popChangePct": 1.02
    },
    {
      "year": 2028,
      "gdpPPP": 18.521,
      "perCapitaPPP": 15417.0,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 1.09
    },
    {
      "year": 2029,
      "gdpPPP": 19.395,
      "perCapitaPPP": 15970.0,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 1.08
    },
    {
      "year": 2030,
      "gdpPPP": 20.3,
      "perCapitaPPP": 16535.5,
      "perCapitaPPPChangePct": 3.54,
      "popChangePct": 1.15
    },
    {
      "year": 2031,
      "gdpPPP": 21.231,
      "perCapitaPPP": 17107.3,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": 1.06
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function EswatiniGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
