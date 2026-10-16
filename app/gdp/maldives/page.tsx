import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Maldives",
  "slug": "maldives",
  "iso3": "MDV",
  "region": "Asia",
  "rank2026": 163,
  "flagEmoji": "🇲🇻",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Burundi",
      "slug": "burundi",
      "rank": 162
    },
    {
      "name": "Yemen",
      "slug": "yemen",
      "rank": 164
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.063,
      "growth": 18.8,
      "perCapita": 412.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.073,
      "growth": 7.9,
      "perCapita": 464.9,
      "popChangePct": 3.95
    },
    {
      "year": 1982,
      "gdp": 0.087,
      "growth": 7.5,
      "perCapita": 534.9,
      "popChangePct": 3.16
    },
    {
      "year": 1983,
      "gdp": 0.094,
      "growth": 4.4,
      "perCapita": 560.2,
      "popChangePct": 3.68
    },
    {
      "year": 1984,
      "gdp": 0.113,
      "growth": 17.4,
      "perCapita": 646.4,
      "popChangePct": 3.55
    },
    {
      "year": 1985,
      "gdp": 0.134,
      "growth": 13.8,
      "perCapita": 737.8,
      "popChangePct": 4.0
    },
    {
      "year": 1986,
      "gdp": 0.158,
      "growth": 8.6,
      "perCapita": 835.6,
      "popChangePct": 3.85
    },
    {
      "year": 1987,
      "gdp": 0.149,
      "growth": 8.9,
      "perCapita": 769.8,
      "popChangePct": 2.12
    },
    {
      "year": 1988,
      "gdp": 0.178,
      "growth": 8.7,
      "perCapita": 897.9,
      "popChangePct": 2.59
    },
    {
      "year": 1989,
      "gdp": 0.201,
      "growth": 9.3,
      "perCapita": 987.8,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdp": 0.231,
      "growth": -4,
      "perCapita": 1091.5,
      "popChangePct": 3.92
    },
    {
      "year": 1991,
      "gdp": 0.262,
      "growth": 6.9,
      "perCapita": 1184.7,
      "popChangePct": 4.72
    },
    {
      "year": 1992,
      "gdp": 0.306,
      "growth": 6.5,
      "perCapita": 1343.0,
      "popChangePct": 2.7
    },
    {
      "year": 1993,
      "gdp": 0.346,
      "growth": 5.4,
      "perCapita": 1479.4,
      "popChangePct": 2.63
    },
    {
      "year": 1994,
      "gdp": 0.382,
      "growth": 7.5,
      "perCapita": 1591.1,
      "popChangePct": 2.56
    },
    {
      "year": 1995,
      "gdp": 0.466,
      "growth": 7.4,
      "perCapita": 1903.2,
      "popChangePct": 2.08
    },
    {
      "year": 1996,
      "gdp": 0.527,
      "growth": 9.1,
      "perCapita": 2107.6,
      "popChangePct": 2.04
    },
    {
      "year": 1997,
      "gdp": 0.652,
      "growth": 10.4,
      "perCapita": 2554.0,
      "popChangePct": 2.0
    },
    {
      "year": 1998,
      "gdp": 0.693,
      "growth": 9.8,
      "perCapita": 2658.9,
      "popChangePct": 2.35
    },
    {
      "year": 1999,
      "gdp": 0.756,
      "growth": 7.2,
      "perCapita": 2842.7,
      "popChangePct": 1.92
    },
    {
      "year": 2000,
      "gdp": 0.801,
      "growth": 4.7,
      "perCapita": 2967.3,
      "popChangePct": 1.5
    },
    {
      "year": 2001,
      "gdp": 0.767,
      "growth": 1.5,
      "perCapita": 2780.5,
      "popChangePct": 2.22
    },
    {
      "year": 2002,
      "gdp": 0.828,
      "growth": 6.1,
      "perCapita": 2952.2,
      "popChangePct": 1.81
    },
    {
      "year": 2003,
      "gdp": 1.052,
      "growth": 14.2,
      "perCapita": 3690.8,
      "popChangePct": 1.42
    },
    {
      "year": 2004,
      "gdp": 1.227,
      "growth": 6,
      "perCapita": 4238.0,
      "popChangePct": 1.4
    },
    {
      "year": 2005,
      "gdp": 1.163,
      "growth": -11.2,
      "perCapita": 3960.4,
      "popChangePct": 1.73
    },
    {
      "year": 2006,
      "gdp": 1.575,
      "growth": 23.6,
      "perCapita": 5268.8,
      "popChangePct": 1.7
    },
    {
      "year": 2007,
      "gdp": 1.868,
      "growth": 7.1,
      "perCapita": 6128.5,
      "popChangePct": 2.01
    },
    {
      "year": 2008,
      "gdp": 2.272,
      "growth": 9,
      "perCapita": 7338.0,
      "popChangePct": 1.64
    },
    {
      "year": 2009,
      "gdp": 2.345,
      "growth": -8.2,
      "perCapita": 7450.8,
      "popChangePct": 1.61
    },
    {
      "year": 2010,
      "gdp": 2.588,
      "growth": 6.8,
      "perCapita": 8086.7,
      "popChangePct": 1.59
    },
    {
      "year": 2011,
      "gdp": 2.629,
      "growth": 8.6,
      "perCapita": 8078.3,
      "popChangePct": 1.56
    },
    {
      "year": 2012,
      "gdp": 2.885,
      "growth": 2.4,
      "perCapita": 8719.6,
      "popChangePct": 1.85
    },
    {
      "year": 2013,
      "gdp": 3.286,
      "growth": 7,
      "perCapita": 9766.2,
      "popChangePct": 1.51
    },
    {
      "year": 2014,
      "gdp": 3.69,
      "growth": 7.8,
      "perCapita": 10787.5,
      "popChangePct": 1.79
    },
    {
      "year": 2015,
      "gdp": 4.118,
      "growth": 3.9,
      "perCapita": 11838.6,
      "popChangePct": 1.75
    },
    {
      "year": 2016,
      "gdp": 4.398,
      "growth": 6.4,
      "perCapita": 12435.6,
      "popChangePct": 1.72
    },
    {
      "year": 2017,
      "gdp": 4.809,
      "growth": 7.1,
      "perCapita": 13373.8,
      "popChangePct": 1.69
    },
    {
      "year": 2018,
      "gdp": 5.398,
      "growth": 8.6,
      "perCapita": 14762.3,
      "popChangePct": 1.67
    },
    {
      "year": 2019,
      "gdp": 5.716,
      "growth": 6.9,
      "perCapita": 15374.2,
      "popChangePct": 1.64
    },
    {
      "year": 2020,
      "gdp": 3.706,
      "growth": -32.9,
      "perCapita": 9803.1,
      "popChangePct": 1.61
    },
    {
      "year": 2021,
      "gdp": 5.24,
      "growth": 37.5,
      "perCapita": 13632.5,
      "popChangePct": 1.59
    },
    {
      "year": 2022,
      "gdp": 6.168,
      "growth": 13.8,
      "perCapita": 15782.1,
      "popChangePct": 1.82
    },
    {
      "year": 2023,
      "gdp": 6.611,
      "growth": 5.1,
      "perCapita": 16637.1,
      "popChangePct": 1.53
    },
    {
      "year": 2024,
      "gdp": 7.052,
      "growth": 3.1,
      "perCapita": 17454.0,
      "popChangePct": 1.76
    },
    {
      "year": 2025,
      "gdp": 7.665,
      "growth": 5,
      "perCapita": 18658.3,
      "popChangePct": 1.73
    },
    {
      "year": 2026,
      "gdp": 8.13,
      "growth": 3,
      "perCapita": 19463.8,
      "popChangePct": 1.7
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 8.673,
      "growth": 4.6,
      "perCapita": 20421.1,
      "popChangePct": 1.67
    },
    {
      "year": 2028,
      "gdp": 9.214,
      "growth": 4.2,
      "perCapita": 21336.3,
      "popChangePct": 1.65
    },
    {
      "year": 2029,
      "gdp": 9.776,
      "growth": 4,
      "perCapita": 22264.0,
      "popChangePct": 1.62
    },
    {
      "year": 2030,
      "gdp": 10.369,
      "growth": 4,
      "perCapita": 23224.5,
      "popChangePct": 1.59
    },
    {
      "year": 2031,
      "gdp": 11.033,
      "growth": 4,
      "perCapita": 24304.1,
      "popChangePct": 1.79
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.32,
      "perCapitaPPP": 2111.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.378,
      "perCapitaPPP": 2399.0,
      "perCapitaPPPChangePct": 13.64,
      "popChangePct": 3.95
    },
    {
      "year": 1982,
      "gdpPPP": 0.432,
      "perCapitaPPP": 2653.9,
      "perCapitaPPPChangePct": 10.63,
      "popChangePct": 3.16
    },
    {
      "year": 1983,
      "gdpPPP": 0.469,
      "perCapitaPPP": 2778.0,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 3.68
    },
    {
      "year": 1984,
      "gdpPPP": 0.57,
      "perCapitaPPP": 3263.2,
      "perCapitaPPPChangePct": 17.47,
      "popChangePct": 3.55
    },
    {
      "year": 1985,
      "gdpPPP": 0.669,
      "perCapitaPPP": 3684.5,
      "perCapitaPPPChangePct": 12.91,
      "popChangePct": 4.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.741,
      "perCapitaPPP": 3931.4,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 3.85
    },
    {
      "year": 1987,
      "gdpPPP": 0.827,
      "perCapitaPPP": 4274.9,
      "perCapitaPPPChangePct": 8.74,
      "popChangePct": 2.12
    },
    {
      "year": 1988,
      "gdpPPP": 0.931,
      "perCapitaPPP": 4689.7,
      "perCapitaPPPChangePct": 9.7,
      "popChangePct": 2.59
    },
    {
      "year": 1989,
      "gdpPPP": 1.057,
      "perCapitaPPP": 5191.5,
      "perCapitaPPPChangePct": 10.7,
      "popChangePct": 3.03
    },
    {
      "year": 1990,
      "gdpPPP": 1.052,
      "perCapitaPPP": 4973.7,
      "perCapitaPPPChangePct": -4.2,
      "popChangePct": 3.92
    },
    {
      "year": 1991,
      "gdpPPP": 1.163,
      "perCapitaPPP": 5248.9,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 4.72
    },
    {
      "year": 1992,
      "gdpPPP": 1.266,
      "perCapitaPPP": 5559.0,
      "perCapitaPPPChangePct": 5.91,
      "popChangePct": 2.7
    },
    {
      "year": 1993,
      "gdpPPP": 1.366,
      "perCapitaPPP": 5839.0,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 2.63
    },
    {
      "year": 1994,
      "gdpPPP": 1.5,
      "perCapitaPPP": 6244.6,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 2.56
    },
    {
      "year": 1995,
      "gdpPPP": 1.645,
      "perCapitaPPP": 6718.3,
      "perCapitaPPPChangePct": 7.59,
      "popChangePct": 2.08
    },
    {
      "year": 1996,
      "gdpPPP": 1.827,
      "perCapitaPPP": 7303.8,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": 2.04
    },
    {
      "year": 1997,
      "gdpPPP": 2.052,
      "perCapitaPPP": 8032.1,
      "perCapitaPPPChangePct": 9.97,
      "popChangePct": 2.0
    },
    {
      "year": 1998,
      "gdpPPP": 2.278,
      "perCapitaPPP": 8735.7,
      "perCapitaPPPChangePct": 8.76,
      "popChangePct": 2.35
    },
    {
      "year": 1999,
      "gdpPPP": 2.477,
      "perCapitaPPP": 9310.3,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 1.92
    },
    {
      "year": 2000,
      "gdpPPP": 2.654,
      "perCapitaPPP": 9824.2,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 1.5
    },
    {
      "year": 2001,
      "gdpPPP": 2.753,
      "perCapitaPPP": 9974.2,
      "perCapitaPPPChangePct": 1.53,
      "popChangePct": 2.22
    },
    {
      "year": 2002,
      "gdpPPP": 2.966,
      "perCapitaPPP": 10571.6,
      "perCapitaPPPChangePct": 5.99,
      "popChangePct": 1.81
    },
    {
      "year": 2003,
      "gdpPPP": 3.452,
      "perCapitaPPP": 12111.1,
      "perCapitaPPPChangePct": 14.56,
      "popChangePct": 1.42
    },
    {
      "year": 2004,
      "gdpPPP": 3.759,
      "perCapitaPPP": 12985.8,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 1.4
    },
    {
      "year": 2005,
      "gdpPPP": 3.442,
      "perCapitaPPP": 11717.2,
      "perCapitaPPPChangePct": -9.77,
      "popChangePct": 1.73
    },
    {
      "year": 2006,
      "gdpPPP": 4.386,
      "perCapitaPPP": 14669.0,
      "perCapitaPPPChangePct": 25.19,
      "popChangePct": 1.7
    },
    {
      "year": 2007,
      "gdpPPP": 4.825,
      "perCapitaPPP": 15827.3,
      "perCapitaPPPChangePct": 7.9,
      "popChangePct": 2.01
    },
    {
      "year": 2008,
      "gdpPPP": 5.36,
      "perCapitaPPP": 17313.5,
      "perCapitaPPPChangePct": 9.39,
      "popChangePct": 1.64
    },
    {
      "year": 2009,
      "gdpPPP": 4.953,
      "perCapitaPPP": 15735.1,
      "perCapitaPPPChangePct": -9.12,
      "popChangePct": 1.61
    },
    {
      "year": 2010,
      "gdpPPP": 5.356,
      "perCapitaPPP": 16734.2,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.59
    },
    {
      "year": 2011,
      "gdpPPP": 5.935,
      "perCapitaPPP": 18237.5,
      "perCapitaPPPChangePct": 8.98,
      "popChangePct": 1.56
    },
    {
      "year": 2012,
      "gdpPPP": 6.188,
      "perCapitaPPP": 18702.3,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 1.85
    },
    {
      "year": 2013,
      "gdpPPP": 6.732,
      "perCapitaPPP": 20009.3,
      "perCapitaPPPChangePct": 6.99,
      "popChangePct": 1.51
    },
    {
      "year": 2014,
      "gdpPPP": 7.383,
      "perCapitaPPP": 21583.6,
      "perCapitaPPPChangePct": 7.87,
      "popChangePct": 1.79
    },
    {
      "year": 2015,
      "gdpPPP": 7.74,
      "perCapitaPPP": 22253.1,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 1.75
    },
    {
      "year": 2016,
      "gdpPPP": 8.312,
      "perCapitaPPP": 23502.3,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 1.72
    },
    {
      "year": 2017,
      "gdpPPP": 9.059,
      "perCapitaPPP": 25192.8,
      "perCapitaPPPChangePct": 7.19,
      "popChangePct": 1.69
    },
    {
      "year": 2018,
      "gdpPPP": 10.361,
      "perCapitaPPP": 28335.8,
      "perCapitaPPPChangePct": 12.48,
      "popChangePct": 1.67
    },
    {
      "year": 2019,
      "gdpPPP": 11.255,
      "perCapitaPPP": 30275.1,
      "perCapitaPPPChangePct": 6.84,
      "popChangePct": 1.64
    },
    {
      "year": 2020,
      "gdpPPP": 6.741,
      "perCapitaPPP": 17833.0,
      "perCapitaPPPChangePct": -41.1,
      "popChangePct": 1.61
    },
    {
      "year": 2021,
      "gdpPPP": 9.834,
      "perCapitaPPP": 25585.8,
      "perCapitaPPPChangePct": 43.47,
      "popChangePct": 1.59
    },
    {
      "year": 2022,
      "gdpPPP": 11.99,
      "perCapitaPPP": 30679.8,
      "perCapitaPPPChangePct": 19.91,
      "popChangePct": 1.82
    },
    {
      "year": 2023,
      "gdpPPP": 13.068,
      "perCapitaPPP": 32886.8,
      "perCapitaPPPChangePct": 7.19,
      "popChangePct": 1.53
    },
    {
      "year": 2024,
      "gdpPPP": 13.804,
      "perCapitaPPP": 34165.2,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.76
    },
    {
      "year": 2025,
      "gdpPPP": 14.91,
      "perCapitaPPP": 36292.8,
      "perCapitaPPPChangePct": 6.23,
      "popChangePct": 1.73
    },
    {
      "year": 2026,
      "gdpPPP": 15.8,
      "perCapitaPPP": 37825.7,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 1.7
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 16.888,
      "perCapitaPPP": 39762.2,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": 1.67
    },
    {
      "year": 2028,
      "gdpPPP": 17.878,
      "perCapitaPPP": 41398.2,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 1.65
    },
    {
      "year": 2029,
      "gdpPPP": 18.927,
      "perCapitaPPP": 43104.2,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 1.62
    },
    {
      "year": 2030,
      "gdpPPP": 20.043,
      "perCapitaPPP": 44892.1,
      "perCapitaPPPChangePct": 4.15,
      "popChangePct": 1.59
    },
    {
      "year": 2031,
      "gdpPPP": 21.224,
      "perCapitaPPP": 46751.9,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 1.79
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MaldivesGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
