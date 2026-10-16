import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Brunei",
  "slug": "brunei",
  "iso3": "BRN",
  "region": "Asia",
  "rank2026": 148,
  "flagEmoji": "🇧🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Congo",
      "slug": "congo",
      "rank": 147
    },
    {
      "name": "Mauritania",
      "slug": "mauritania",
      "rank": 150
    }
  ],
  "history": [
    {
      "year": 1985,
      "gdp": 4.831,
      "growth": null,
      "perCapita": 21770.7,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 3.291,
      "growth": -2.7,
      "perCapita": 14544.4,
      "popChangePct": 1.8
    },
    {
      "year": 1987,
      "gdp": 3.872,
      "growth": 2,
      "perCapita": 16561.0,
      "popChangePct": 3.54
    },
    {
      "year": 1988,
      "gdp": 3.689,
      "growth": 1.1,
      "perCapita": 15281.1,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdp": 4.109,
      "growth": -1.1,
      "perCapita": 16683.2,
      "popChangePct": 2.07
    },
    {
      "year": 1990,
      "gdp": 4.923,
      "growth": 1.1,
      "perCapita": 19428.8,
      "popChangePct": 2.85
    },
    {
      "year": 1991,
      "gdp": 5.254,
      "growth": 3.1,
      "perCapita": 20171.3,
      "popChangePct": 2.77
    },
    {
      "year": 1992,
      "gdp": 5.526,
      "growth": 4.8,
      "perCapita": 20679.7,
      "popChangePct": 2.69
    },
    {
      "year": 1993,
      "gdp": 5.588,
      "growth": 0.3,
      "perCapita": 20430.2,
      "popChangePct": 2.62
    },
    {
      "year": 1994,
      "gdp": 6.002,
      "growth": 3.1,
      "perCapita": 21350.4,
      "popChangePct": 2.55
    },
    {
      "year": 1995,
      "gdp": 7.153,
      "growth": 4.5,
      "perCapita": 24895.6,
      "popChangePct": 2.14
    },
    {
      "year": 1996,
      "gdp": 7.204,
      "growth": 2.9,
      "perCapita": 24460.8,
      "popChangePct": 2.79
    },
    {
      "year": 1997,
      "gdp": 7.043,
      "growth": -1.5,
      "perCapita": 23344.4,
      "popChangePct": 2.37
    },
    {
      "year": 1998,
      "gdp": 5.353,
      "growth": -0.6,
      "perCapita": 17294.9,
      "popChangePct": 2.65
    },
    {
      "year": 1999,
      "gdp": 5.779,
      "growth": 3.1,
      "perCapita": 18237.1,
      "popChangePct": 2.26
    },
    {
      "year": 2000,
      "gdp": 6.65,
      "growth": 11,
      "perCapita": 20473.3,
      "popChangePct": 2.52
    },
    {
      "year": 2001,
      "gdp": 6.206,
      "growth": 1.5,
      "perCapita": 18646.0,
      "popChangePct": 2.46
    },
    {
      "year": 2002,
      "gdp": 6.475,
      "growth": 4,
      "perCapita": 19037.8,
      "popChangePct": 2.1
    },
    {
      "year": 2003,
      "gdp": 7.266,
      "growth": 3.6,
      "perCapita": 20975.5,
      "popChangePct": 1.76
    },
    {
      "year": 2004,
      "gdp": 8.723,
      "growth": 0.1,
      "perCapita": 24759.5,
      "popChangePct": 1.73
    },
    {
      "year": 2005,
      "gdp": 10.561,
      "growth": 0,
      "perCapita": 29459.7,
      "popChangePct": 1.99
    },
    {
      "year": 2006,
      "gdp": 12.71,
      "growth": 4.1,
      "perCapita": 34869.2,
      "popChangePct": 1.67
    },
    {
      "year": 2007,
      "gdp": 13.571,
      "growth": -3.8,
      "perCapita": 36678.3,
      "popChangePct": 1.37
    },
    {
      "year": 2008,
      "gdp": 15.949,
      "growth": -3.9,
      "perCapita": 42529.7,
      "popChangePct": 1.35
    },
    {
      "year": 2009,
      "gdp": 11.892,
      "growth": -1.9,
      "perCapita": 31287.3,
      "popChangePct": 1.33
    },
    {
      "year": 2010,
      "gdp": 13.711,
      "growth": 2.7,
      "perCapita": 35446.1,
      "popChangePct": 1.84
    },
    {
      "year": 2011,
      "gdp": 18.524,
      "growth": 3.7,
      "perCapita": 47089.0,
      "popChangePct": 1.55
    },
    {
      "year": 2012,
      "gdp": 19.051,
      "growth": 0.9,
      "perCapita": 47782.1,
      "popChangePct": 1.53
    },
    {
      "year": 2013,
      "gdp": 18.094,
      "growth": -2.1,
      "perCapita": 44865.2,
      "popChangePct": 1.0
    },
    {
      "year": 2014,
      "gdp": 17.093,
      "growth": -2.5,
      "perCapita": 41935.0,
      "popChangePct": 1.24
    },
    {
      "year": 2015,
      "gdp": 12.933,
      "growth": -0.4,
      "perCapita": 31361.2,
      "popChangePct": 0.98
    },
    {
      "year": 2016,
      "gdp": 11.403,
      "growth": -2.5,
      "perCapita": 27328.9,
      "popChangePct": 1.21
    },
    {
      "year": 2017,
      "gdp": 12.13,
      "growth": 1.3,
      "perCapita": 28447.8,
      "popChangePct": 2.16
    },
    {
      "year": 2018,
      "gdp": 13.564,
      "growth": 0.1,
      "perCapita": 31068.3,
      "popChangePct": 2.58
    },
    {
      "year": 2019,
      "gdp": 13.472,
      "growth": 3.9,
      "perCapita": 29871.9,
      "popChangePct": 3.2
    },
    {
      "year": 2020,
      "gdp": 12.008,
      "growth": 1.1,
      "perCapita": 27178.7,
      "popChangePct": -2.0
    },
    {
      "year": 2021,
      "gdp": 14.008,
      "growth": -1.6,
      "perCapita": 31784.6,
      "popChangePct": -0.23
    },
    {
      "year": 2022,
      "gdp": 16.684,
      "growth": -1.6,
      "perCapita": 37458.5,
      "popChangePct": 0.91
    },
    {
      "year": 2023,
      "gdp": 15.098,
      "growth": 1.1,
      "perCapita": 33513.6,
      "popChangePct": 1.35
    },
    {
      "year": 2024,
      "gdp": 15.334,
      "growth": 4.1,
      "perCapita": 33665.2,
      "popChangePct": 1.11
    },
    {
      "year": 2025,
      "gdp": 15.942,
      "growth": 0.6,
      "perCapita": 34678.4,
      "popChangePct": 0.88
    },
    {
      "year": 2026,
      "gdp": 16.863,
      "growth": 2.6,
      "perCapita": 36287.9,
      "popChangePct": 1.09
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 17.581,
      "growth": 2.6,
      "perCapita": 37438.1,
      "popChangePct": 1.08
    },
    {
      "year": 2028,
      "gdp": 18.318,
      "growth": 2.5,
      "perCapita": 38596.0,
      "popChangePct": 1.06
    },
    {
      "year": 2029,
      "gdp": 19.013,
      "growth": 2.6,
      "perCapita": 39642.5,
      "popChangePct": 1.05
    },
    {
      "year": 2030,
      "gdp": 19.804,
      "growth": 3,
      "perCapita": 40848.9,
      "popChangePct": 1.04
    },
    {
      "year": 2031,
      "gdp": 20.662,
      "growth": 2.9,
      "perCapita": 42176.3,
      "popChangePct": 1.03
    }
  ],
  "pppHistory": [
    {
      "year": 1985,
      "gdpPPP": 9.621,
      "perCapitaPPP": 43358.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 9.549,
      "perCapitaPPP": 42194.1,
      "perCapitaPPPChangePct": -2.69,
      "popChangePct": 1.8
    },
    {
      "year": 1987,
      "gdpPPP": 9.982,
      "perCapitaPPP": 42693.5,
      "perCapitaPPPChangePct": 1.18,
      "popChangePct": 3.54
    },
    {
      "year": 1988,
      "gdpPPP": 10.447,
      "perCapitaPPP": 43277.4,
      "perCapitaPPPChangePct": 1.37,
      "popChangePct": 2.99
    },
    {
      "year": 1989,
      "gdpPPP": 10.74,
      "perCapitaPPP": 43606.2,
      "perCapitaPPPChangePct": 0.76,
      "popChangePct": 2.07
    },
    {
      "year": 1990,
      "gdpPPP": 11.264,
      "perCapitaPPP": 44449.6,
      "perCapitaPPPChangePct": 1.93,
      "popChangePct": 2.85
    },
    {
      "year": 1991,
      "gdpPPP": 12.011,
      "perCapitaPPP": 46110.1,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": 2.77
    },
    {
      "year": 1992,
      "gdpPPP": 12.869,
      "perCapitaPPP": 48163.0,
      "perCapitaPPPChangePct": 4.45,
      "popChangePct": 2.69
    },
    {
      "year": 1993,
      "gdpPPP": 13.214,
      "perCapitaPPP": 48315.5,
      "perCapitaPPPChangePct": 0.32,
      "popChangePct": 2.62
    },
    {
      "year": 1994,
      "gdpPPP": 13.921,
      "perCapitaPPP": 49523.2,
      "perCapitaPPPChangePct": 2.5,
      "popChangePct": 2.55
    },
    {
      "year": 1995,
      "gdpPPP": 14.849,
      "perCapitaPPP": 51685.9,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 2.14
    },
    {
      "year": 1996,
      "gdpPPP": 15.556,
      "perCapitaPPP": 52823.4,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 2.79
    },
    {
      "year": 1997,
      "gdpPPP": 15.592,
      "perCapitaPPP": 51680.2,
      "perCapitaPPPChangePct": -2.16,
      "popChangePct": 2.37
    },
    {
      "year": 1998,
      "gdpPPP": 15.679,
      "perCapitaPPP": 50659.5,
      "perCapitaPPPChangePct": -1.98,
      "popChangePct": 2.65
    },
    {
      "year": 1999,
      "gdpPPP": 16.386,
      "perCapitaPPP": 51708.1,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 2.26
    },
    {
      "year": 2000,
      "gdpPPP": 18.595,
      "perCapitaPPP": 57249.7,
      "perCapitaPPPChangePct": 10.72,
      "popChangePct": 2.52
    },
    {
      "year": 2001,
      "gdpPPP": 19.292,
      "perCapitaPPP": 57961.5,
      "perCapitaPPPChangePct": 1.24,
      "popChangePct": 2.46
    },
    {
      "year": 2002,
      "gdpPPP": 20.368,
      "perCapitaPPP": 59888.5,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 2.1
    },
    {
      "year": 2003,
      "gdpPPP": 21.514,
      "perCapitaPPP": 62108.7,
      "perCapitaPPPChangePct": 3.71,
      "popChangePct": 1.76
    },
    {
      "year": 2004,
      "gdpPPP": 22.116,
      "perCapitaPPP": 62776.2,
      "perCapitaPPPChangePct": 1.07,
      "popChangePct": 1.73
    },
    {
      "year": 2005,
      "gdpPPP": 22.809,
      "perCapitaPPP": 63622.5,
      "perCapitaPPPChangePct": 1.35,
      "popChangePct": 1.99
    },
    {
      "year": 2006,
      "gdpPPP": 24.476,
      "perCapitaPPP": 67148.7,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 1.67
    },
    {
      "year": 2007,
      "gdpPPP": 24.193,
      "perCapitaPPP": 65385.6,
      "perCapitaPPPChangePct": -2.63,
      "popChangePct": 1.37
    },
    {
      "year": 2008,
      "gdpPPP": 23.697,
      "perCapitaPPP": 63191.6,
      "perCapitaPPPChangePct": -3.36,
      "popChangePct": 1.35
    },
    {
      "year": 2009,
      "gdpPPP": 23.39,
      "perCapitaPPP": 61536.3,
      "perCapitaPPPChangePct": -2.62,
      "popChangePct": 1.33
    },
    {
      "year": 2010,
      "gdpPPP": 24.323,
      "perCapitaPPP": 62883.9,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 1.84
    },
    {
      "year": 2011,
      "gdpPPP": 25.755,
      "perCapitaPPP": 65472.1,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 1.55
    },
    {
      "year": 2012,
      "gdpPPP": 26.474,
      "perCapitaPPP": 66400.8,
      "perCapitaPPPChangePct": 1.42,
      "popChangePct": 1.53
    },
    {
      "year": 2013,
      "gdpPPP": 26.352,
      "perCapitaPPP": 65342.1,
      "perCapitaPPPChangePct": -1.59,
      "popChangePct": 1.0
    },
    {
      "year": 2014,
      "gdpPPP": 26.139,
      "perCapitaPPP": 64129.2,
      "perCapitaPPPChangePct": -1.86,
      "popChangePct": 1.24
    },
    {
      "year": 2015,
      "gdpPPP": 26.278,
      "perCapitaPPP": 63720.0,
      "perCapitaPPPChangePct": -0.64,
      "popChangePct": 0.98
    },
    {
      "year": 2016,
      "gdpPPP": 25.871,
      "perCapitaPPP": 62001.5,
      "perCapitaPPPChangePct": -2.7,
      "popChangePct": 1.21
    },
    {
      "year": 2017,
      "gdpPPP": 26.684,
      "perCapitaPPP": 62579.1,
      "perCapitaPPPChangePct": 0.93,
      "popChangePct": 2.16
    },
    {
      "year": 2018,
      "gdpPPP": 28.523,
      "perCapitaPPP": 65329.4,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 2.58
    },
    {
      "year": 2019,
      "gdpPPP": 30.701,
      "perCapitaPPP": 68074.3,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 3.2
    },
    {
      "year": 2020,
      "gdpPPP": 31.223,
      "perCapitaPPP": 70673.2,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": -2.0
    },
    {
      "year": 2021,
      "gdpPPP": 35.347,
      "perCapitaPPP": 80202.9,
      "perCapitaPPPChangePct": 13.48,
      "popChangePct": -0.23
    },
    {
      "year": 2022,
      "gdpPPP": 37.244,
      "perCapitaPPP": 83619.5,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 0.91
    },
    {
      "year": 2023,
      "gdpPPP": 39.058,
      "perCapitaPPP": 86698.5,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 1.35
    },
    {
      "year": 2024,
      "gdpPPP": 41.649,
      "perCapitaPPP": 91436.7,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.11
    },
    {
      "year": 2025,
      "gdpPPP": 43.088,
      "perCapitaPPP": 93730.5,
      "perCapitaPPPChangePct": 2.51,
      "popChangePct": 0.88
    },
    {
      "year": 2026,
      "gdpPPP": 45.475,
      "perCapitaPPP": 97858.2,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 1.09
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 47.705,
      "perCapitaPPP": 101586.1,
      "perCapitaPPPChangePct": 3.81,
      "popChangePct": 1.08
    },
    {
      "year": 2028,
      "gdpPPP": 49.7,
      "perCapitaPPP": 104719.8,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.06
    },
    {
      "year": 2029,
      "gdpPPP": 51.899,
      "perCapitaPPP": 108213.0,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 1.05
    },
    {
      "year": 2030,
      "gdpPPP": 54.438,
      "perCapitaPPP": 112290.0,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": 1.04
    },
    {
      "year": 2031,
      "gdpPPP": 57.028,
      "perCapitaPPP": 116407.7,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 1.03
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BruneiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
