import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Suriname",
  "slug": "suriname",
  "iso3": "SUR",
  "region": "Americas",
  "rank2026": 171,
  "flagEmoji": "🇸🇷",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "South Sudan",
      "slug": "south-sudan",
      "rank": 170
    },
    {
      "name": "Eswatini",
      "slug": "eswatini",
      "rank": 172
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.276,
      "growth": -6.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.427,
      "growth": 1.9,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 1.469,
      "growth": -6.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdp": 1.419,
      "growth": -5.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdp": 1.387,
      "growth": -3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdp": 1.402,
      "growth": -0.9,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 1.43,
      "growth": -2.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 1.573,
      "growth": -8.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdp": 1.864,
      "growth": 10.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdp": 2.177,
      "growth": 2.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 0.577,
      "growth": -1.5,
      "perCapita": 1412.5,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 0.637,
      "growth": -13.8,
      "perCapita": 1537.0,
      "popChangePct": 1.22
    },
    {
      "year": 1992,
      "gdp": 0.59,
      "growth": 3.9,
      "perCapita": 1405.5,
      "popChangePct": 1.45
    },
    {
      "year": 1993,
      "gdp": 0.465,
      "growth": -2.2,
      "perCapita": 1093.8,
      "popChangePct": 1.19
    },
    {
      "year": 1994,
      "gdp": 0.523,
      "growth": -7,
      "perCapita": 1212.4,
      "popChangePct": 1.41
    },
    {
      "year": 1995,
      "gdp": 0.993,
      "growth": 11.3,
      "perCapita": 2272.3,
      "popChangePct": 1.39
    },
    {
      "year": 1996,
      "gdp": 1.234,
      "growth": 11.2,
      "perCapita": 2788.0,
      "popChangePct": 1.37
    },
    {
      "year": 1997,
      "gdp": 1.322,
      "growth": 7,
      "perCapita": 2947.3,
      "popChangePct": 1.35
    },
    {
      "year": 1998,
      "gdp": 1.588,
      "growth": 2.2,
      "perCapita": 3492.8,
      "popChangePct": 1.34
    },
    {
      "year": 1999,
      "gdp": 1.308,
      "growth": -0.9,
      "perCapita": 2839.0,
      "popChangePct": 1.32
    },
    {
      "year": 2000,
      "gdp": 1.355,
      "growth": -0.1,
      "perCapita": 2902.5,
      "popChangePct": 1.3
    },
    {
      "year": 2001,
      "gdp": 1.167,
      "growth": 4.9,
      "perCapita": 2466.3,
      "popChangePct": 1.28
    },
    {
      "year": 2002,
      "gdp": 1.474,
      "growth": 3.7,
      "perCapita": 3078.4,
      "popChangePct": 1.27
    },
    {
      "year": 2003,
      "gdp": 1.729,
      "growth": 6.2,
      "perCapita": 3549.9,
      "popChangePct": 1.67
    },
    {
      "year": 2004,
      "gdp": 2,
      "growth": 7.3,
      "perCapita": 4034.4,
      "popChangePct": 1.85
    },
    {
      "year": 2005,
      "gdp": 2.393,
      "growth": 4.9,
      "perCapita": 4773.4,
      "popChangePct": 1.01
    },
    {
      "year": 2006,
      "gdp": 2.812,
      "growth": 5.8,
      "perCapita": 5545.7,
      "popChangePct": 1.2
    },
    {
      "year": 2007,
      "gdp": 3.144,
      "growth": 5.1,
      "perCapita": 6123.0,
      "popChangePct": 1.38
    },
    {
      "year": 2008,
      "gdp": 3.783,
      "growth": 4.1,
      "perCapita": 7266.6,
      "popChangePct": 1.36
    },
    {
      "year": 2009,
      "gdp": 4.15,
      "growth": 3,
      "perCapita": 7864.6,
      "popChangePct": 1.34
    },
    {
      "year": 2010,
      "gdp": 4.677,
      "growth": 5.2,
      "perCapita": 8734.2,
      "popChangePct": 1.52
    },
    {
      "year": 2011,
      "gdp": 4.735,
      "growth": 5.8,
      "perCapita": 8756.3,
      "popChangePct": 0.93
    },
    {
      "year": 2012,
      "gdp": 5.332,
      "growth": 2.7,
      "perCapita": 9767.3,
      "popChangePct": 0.92
    },
    {
      "year": 2013,
      "gdp": 5.51,
      "growth": 2.9,
      "perCapita": 9936.5,
      "popChangePct": 1.47
    },
    {
      "year": 2014,
      "gdp": 5.612,
      "growth": 0.3,
      "perCapita": 9966.7,
      "popChangePct": 1.62
    },
    {
      "year": 2015,
      "gdp": 5.126,
      "growth": -3.4,
      "perCapita": 9036.2,
      "popChangePct": 0.71
    },
    {
      "year": 2016,
      "gdp": 3.317,
      "growth": -4.9,
      "perCapita": 5762.4,
      "popChangePct": 1.59
    },
    {
      "year": 2017,
      "gdp": 3.592,
      "growth": 1.6,
      "perCapita": 6158.6,
      "popChangePct": 1.22
    },
    {
      "year": 2018,
      "gdp": 3.996,
      "growth": 4.9,
      "perCapita": 6772.1,
      "popChangePct": 1.2
    },
    {
      "year": 2019,
      "gdp": 4.016,
      "growth": 1.2,
      "perCapita": 6715.7,
      "popChangePct": 1.36
    },
    {
      "year": 2020,
      "gdp": 2.912,
      "growth": -16,
      "perCapita": 4782.1,
      "popChangePct": 1.84
    },
    {
      "year": 2021,
      "gdp": 3.084,
      "growth": -2.4,
      "perCapita": 4988.0,
      "popChangePct": 1.48
    },
    {
      "year": 2022,
      "gdp": 3.802,
      "growth": 2.4,
      "perCapita": 6056.9,
      "popChangePct": 1.62
    },
    {
      "year": 2023,
      "gdp": 3.462,
      "growth": 2.4,
      "perCapita": 5432.4,
      "popChangePct": 1.43
    },
    {
      "year": 2024,
      "gdp": 4.434,
      "growth": 1.7,
      "perCapita": 6852.3,
      "popChangePct": 1.57
    },
    {
      "year": 2025,
      "gdp": 4.664,
      "growth": 1.5,
      "perCapita": 7098.9,
      "popChangePct": 1.55
    },
    {
      "year": 2026,
      "gdp": 5.908,
      "growth": 3.9,
      "perCapita": 8856.1,
      "popChangePct": 1.52
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 6.766,
      "growth": 4.4,
      "perCapita": 9989.8,
      "popChangePct": 1.5
    },
    {
      "year": 2028,
      "gdp": 8.97,
      "growth": 28.5,
      "perCapita": 13043.1,
      "popChangePct": 1.62
    },
    {
      "year": 2029,
      "gdp": 13.091,
      "growth": 43.5,
      "perCapita": 18748.4,
      "popChangePct": 1.45
    },
    {
      "year": 2030,
      "gdp": 13.605,
      "growth": 3.1,
      "perCapita": 19189.9,
      "popChangePct": 1.58
    },
    {
      "year": 2031,
      "gdp": 14.086,
      "growth": 2.9,
      "perCapita": 19568.8,
      "popChangePct": 1.55
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.545,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.839,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 2.825,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdpPPP": 2.786,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdpPPP": 2.8,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdpPPP": 2.862,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 2.85,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdpPPP": 2.663,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdpPPP": 3.055,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdpPPP": 3.248,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdpPPP": 3.319,
      "perCapitaPPP": 8121.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 2.958,
      "perCapitaPPP": 7141.5,
      "perCapitaPPPChangePct": -12.06,
      "popChangePct": 1.22
    },
    {
      "year": 1992,
      "gdpPPP": 3.143,
      "perCapitaPPP": 7488.6,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 1.45
    },
    {
      "year": 1993,
      "gdpPPP": 3.147,
      "perCapitaPPP": 7398.2,
      "perCapitaPPPChangePct": -1.21,
      "popChangePct": 1.19
    },
    {
      "year": 1994,
      "gdpPPP": 2.989,
      "perCapitaPPP": 6934.1,
      "perCapitaPPPChangePct": -6.27,
      "popChangePct": 1.41
    },
    {
      "year": 1995,
      "gdpPPP": 3.396,
      "perCapitaPPP": 7775.1,
      "perCapitaPPPChangePct": 12.13,
      "popChangePct": 1.39
    },
    {
      "year": 1996,
      "gdpPPP": 3.846,
      "perCapitaPPP": 8687.6,
      "perCapitaPPPChangePct": 11.74,
      "popChangePct": 1.37
    },
    {
      "year": 1997,
      "gdpPPP": 4.186,
      "perCapitaPPP": 9330.7,
      "perCapitaPPPChangePct": 7.4,
      "popChangePct": 1.35
    },
    {
      "year": 1998,
      "gdpPPP": 4.326,
      "perCapitaPPP": 9515.5,
      "perCapitaPPPChangePct": 1.98,
      "popChangePct": 1.34
    },
    {
      "year": 1999,
      "gdpPPP": 4.348,
      "perCapitaPPP": 9436.6,
      "perCapitaPPPChangePct": -0.83,
      "popChangePct": 1.32
    },
    {
      "year": 2000,
      "gdpPPP": 4.442,
      "perCapitaPPP": 9513.0,
      "perCapitaPPPChangePct": 0.81,
      "popChangePct": 1.3
    },
    {
      "year": 2001,
      "gdpPPP": 4.765,
      "perCapitaPPP": 10068.8,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 1.28
    },
    {
      "year": 2002,
      "gdpPPP": 5.02,
      "perCapitaPPP": 10485.7,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 1.27
    },
    {
      "year": 2003,
      "gdpPPP": 5.436,
      "perCapitaPPP": 11162.7,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 1.67
    },
    {
      "year": 2004,
      "gdpPPP": 5.99,
      "perCapitaPPP": 12084.5,
      "perCapitaPPPChangePct": 8.26,
      "popChangePct": 1.85
    },
    {
      "year": 2005,
      "gdpPPP": 6.482,
      "perCapitaPPP": 12927.4,
      "perCapitaPPPChangePct": 6.98,
      "popChangePct": 1.01
    },
    {
      "year": 2006,
      "gdpPPP": 7.067,
      "perCapitaPPP": 13935.8,
      "perCapitaPPPChangePct": 7.8,
      "popChangePct": 1.2
    },
    {
      "year": 2007,
      "gdpPPP": 7.629,
      "perCapitaPPP": 14855.8,
      "perCapitaPPPChangePct": 6.6,
      "popChangePct": 1.38
    },
    {
      "year": 2008,
      "gdpPPP": 8.098,
      "perCapitaPPP": 15555.6,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 1.36
    },
    {
      "year": 2009,
      "gdpPPP": 8.394,
      "perCapitaPPP": 15908.1,
      "perCapitaPPPChangePct": 2.27,
      "popChangePct": 1.34
    },
    {
      "year": 2010,
      "gdpPPP": 8.935,
      "perCapitaPPP": 16683.5,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 1.52
    },
    {
      "year": 2011,
      "gdpPPP": 9.652,
      "perCapitaPPP": 17848.9,
      "perCapitaPPPChangePct": 6.99,
      "popChangePct": 0.93
    },
    {
      "year": 2012,
      "gdpPPP": 10.097,
      "perCapitaPPP": 18495.2,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 0.92
    },
    {
      "year": 2013,
      "gdpPPP": 10.57,
      "perCapitaPPP": 19062.1,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 1.47
    },
    {
      "year": 2014,
      "gdpPPP": 10.781,
      "perCapitaPPP": 19148.7,
      "perCapitaPPPChangePct": 0.45,
      "popChangePct": 1.62
    },
    {
      "year": 2015,
      "gdpPPP": 10.51,
      "perCapitaPPP": 18526.2,
      "perCapitaPPPChangePct": -3.25,
      "popChangePct": 0.71
    },
    {
      "year": 2016,
      "gdpPPP": 10.089,
      "perCapitaPPP": 17524.2,
      "perCapitaPPPChangePct": -5.41,
      "popChangePct": 1.59
    },
    {
      "year": 2017,
      "gdpPPP": 10.43,
      "perCapitaPPP": 17884.4,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 1.22
    },
    {
      "year": 2018,
      "gdpPPP": 10.705,
      "perCapitaPPP": 18140.3,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 1.2
    },
    {
      "year": 2019,
      "gdpPPP": 11.977,
      "perCapitaPPP": 20028.4,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": 1.36
    },
    {
      "year": 2020,
      "gdpPPP": 10.377,
      "perCapitaPPP": 17042.0,
      "perCapitaPPPChangePct": -14.91,
      "popChangePct": 1.84
    },
    {
      "year": 2021,
      "gdpPPP": 11.314,
      "perCapitaPPP": 18299.8,
      "perCapitaPPPChangePct": 7.38,
      "popChangePct": 1.48
    },
    {
      "year": 2022,
      "gdpPPP": 12.41,
      "perCapitaPPP": 19769.9,
      "perCapitaPPPChangePct": 8.03,
      "popChangePct": 1.62
    },
    {
      "year": 2023,
      "gdpPPP": 13.18,
      "perCapitaPPP": 20679.9,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 1.43
    },
    {
      "year": 2024,
      "gdpPPP": 13.74,
      "perCapitaPPP": 21232.5,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 1.57
    },
    {
      "year": 2025,
      "gdpPPP": 14.343,
      "perCapitaPPP": 21830.2,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 1.55
    },
    {
      "year": 2026,
      "gdpPPP": 15.333,
      "perCapitaPPP": 22985.1,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 1.52
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 16.356,
      "perCapitaPPP": 24148.0,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 1.5
    },
    {
      "year": 2028,
      "gdpPPP": 21.369,
      "perCapitaPPP": 31072.5,
      "perCapitaPPPChangePct": 28.68,
      "popChangePct": 1.62
    },
    {
      "year": 2029,
      "gdpPPP": 31.199,
      "perCapitaPPP": 44682.9,
      "perCapitaPPPChangePct": 43.8,
      "popChangePct": 1.45
    },
    {
      "year": 2030,
      "gdpPPP": 32.75,
      "perCapitaPPP": 46195.1,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 1.58
    },
    {
      "year": 2031,
      "gdpPPP": 34.294,
      "perCapitaPPP": 47642.7,
      "perCapitaPPPChangePct": 3.13,
      "popChangePct": 1.55
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SurinameGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
