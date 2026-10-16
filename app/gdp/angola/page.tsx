import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Angola",
  "slug": "angola",
  "iso3": "AGO",
  "region": "Africa",
  "rank2026": 64,
  "flagEmoji": "🇦🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Slovakia",
      "slug": "slovakia",
      "rank": 63
    },
    {
      "name": "Bulgaria",
      "slug": "bulgaria",
      "rank": 65
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 8.73,
      "growth": 2.4,
      "perCapita": 1073.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 8.17,
      "growth": -4.4,
      "perCapita": 978.5,
      "popChangePct": 2.71
    },
    {
      "year": 1982,
      "gdp": 8.17,
      "growth": 0,
      "perCapita": 953.2,
      "popChangePct": 2.65
    },
    {
      "year": 1983,
      "gdp": 8.514,
      "growth": 4.2,
      "perCapita": 968.1,
      "popChangePct": 2.61
    },
    {
      "year": 1984,
      "gdp": 9.025,
      "growth": 6,
      "perCapita": 999.7,
      "popChangePct": 2.65
    },
    {
      "year": 1985,
      "gdp": 11.119,
      "growth": 3.5,
      "perCapita": 1093.0,
      "popChangePct": 12.68
    },
    {
      "year": 1986,
      "gdp": 10.411,
      "growth": 2.9,
      "perCapita": 994.9,
      "popChangePct": 2.86
    },
    {
      "year": 1987,
      "gdp": 11.9,
      "growth": 4.1,
      "perCapita": 1108.9,
      "popChangePct": 2.55
    },
    {
      "year": 1988,
      "gdp": 12.909,
      "growth": 6.1,
      "perCapita": 1171.2,
      "popChangePct": 2.71
    },
    {
      "year": 1989,
      "gdp": 15.017,
      "growth": 0,
      "perCapita": 1326.1,
      "popChangePct": 2.74
    },
    {
      "year": 1990,
      "gdp": 16.529,
      "growth": -3.5,
      "perCapita": 1421.7,
      "popChangePct": 2.67
    },
    {
      "year": 1991,
      "gdp": 16.022,
      "growth": 12.1,
      "perCapita": 1332.6,
      "popChangePct": 3.42
    },
    {
      "year": 1992,
      "gdp": 12.354,
      "growth": 11.4,
      "perCapita": 994.4,
      "popChangePct": 3.33
    },
    {
      "year": 1993,
      "gdp": 8.966,
      "growth": 11,
      "perCapita": 699.0,
      "popChangePct": 3.24
    },
    {
      "year": 1994,
      "gdp": 6.529,
      "growth": 10.5,
      "perCapita": 492.7,
      "popChangePct": 3.3
    },
    {
      "year": 1995,
      "gdp": 8.148,
      "growth": 10.4,
      "perCapita": 594.8,
      "popChangePct": 3.4
    },
    {
      "year": 1996,
      "gdp": 10.51,
      "growth": 11.2,
      "perCapita": 741.7,
      "popChangePct": 3.44
    },
    {
      "year": 1997,
      "gdp": 12.344,
      "growth": 7.3,
      "perCapita": 842.0,
      "popChangePct": 3.45
    },
    {
      "year": 1998,
      "gdp": 10.464,
      "growth": 4.7,
      "perCapita": 690.2,
      "popChangePct": 3.4
    },
    {
      "year": 1999,
      "gdp": 9.895,
      "growth": 2.2,
      "perCapita": 631.6,
      "popChangePct": 3.35
    },
    {
      "year": 2000,
      "gdp": 12.646,
      "growth": 3.1,
      "perCapita": 780.9,
      "popChangePct": 3.37
    },
    {
      "year": 2001,
      "gdp": 12.378,
      "growth": 4.2,
      "perCapita": 739.1,
      "popChangePct": 3.41
    },
    {
      "year": 2002,
      "gdp": 17.312,
      "growth": 13.7,
      "perCapita": 999.1,
      "popChangePct": 3.47
    },
    {
      "year": 2003,
      "gdp": 20.342,
      "growth": 3.5,
      "perCapita": 1133.7,
      "popChangePct": 3.55
    },
    {
      "year": 2004,
      "gdp": 26.998,
      "growth": 11.4,
      "perCapita": 1451.5,
      "popChangePct": 3.66
    },
    {
      "year": 2005,
      "gdp": 41.397,
      "growth": 14.1,
      "perCapita": 2145.9,
      "popChangePct": 3.72
    },
    {
      "year": 2006,
      "gdp": 58.654,
      "growth": 11.8,
      "perCapita": 2930.4,
      "popChangePct": 3.75
    },
    {
      "year": 2007,
      "gdp": 73.038,
      "growth": 13,
      "perCapita": 3515.1,
      "popChangePct": 3.82
    },
    {
      "year": 2008,
      "gdp": 98.79,
      "growth": 10.8,
      "perCapita": 4578.2,
      "popChangePct": 3.85
    },
    {
      "year": 2009,
      "gdp": 81.705,
      "growth": 2,
      "perCapita": 3645.1,
      "popChangePct": 3.87
    },
    {
      "year": 2010,
      "gdp": 95.547,
      "growth": 5.3,
      "perCapita": 4101.6,
      "popChangePct": 3.93
    },
    {
      "year": 2011,
      "gdp": 125.552,
      "growth": 3.6,
      "perCapita": 5184.2,
      "popChangePct": 3.96
    },
    {
      "year": 2012,
      "gdp": 143.573,
      "growth": 8.5,
      "perCapita": 5702.5,
      "popChangePct": 3.96
    },
    {
      "year": 2013,
      "gdp": 153.761,
      "growth": 4.9,
      "perCapita": 5876.5,
      "popChangePct": 3.93
    },
    {
      "year": 2014,
      "gdp": 164.448,
      "growth": 4.7,
      "perCapita": 6054.6,
      "popChangePct": 3.8
    },
    {
      "year": 2015,
      "gdp": 131.661,
      "growth": 0.8,
      "perCapita": 4675.8,
      "popChangePct": 3.67
    },
    {
      "year": 2016,
      "gdp": 116.473,
      "growth": -1.7,
      "perCapita": 3991.1,
      "popChangePct": 3.64
    },
    {
      "year": 2017,
      "gdp": 141.911,
      "growth": -0.1,
      "perCapita": 4693.6,
      "popChangePct": 3.6
    },
    {
      "year": 2018,
      "gdp": 115.456,
      "growth": -0.6,
      "perCapita": 3689.0,
      "popChangePct": 3.51
    },
    {
      "year": 2019,
      "gdp": 95.21,
      "growth": -0.2,
      "perCapita": 2940.8,
      "popChangePct": 3.45
    },
    {
      "year": 2020,
      "gdp": 66.136,
      "growth": -4,
      "perCapita": 1977.1,
      "popChangePct": 3.32
    },
    {
      "year": 2021,
      "gdp": 83.022,
      "growth": 2.1,
      "perCapita": 2404.2,
      "popChangePct": 3.23
    },
    {
      "year": 2022,
      "gdp": 139.171,
      "growth": 4.2,
      "perCapita": 3905.4,
      "popChangePct": 3.19
    },
    {
      "year": 2023,
      "gdp": 113.135,
      "growth": 1.3,
      "perCapita": 3078.5,
      "popChangePct": 3.13
    },
    {
      "year": 2024,
      "gdp": 119.574,
      "growth": 5,
      "perCapita": 3156.2,
      "popChangePct": 3.09
    },
    {
      "year": 2025,
      "gdp": 141.728,
      "growth": 3.1,
      "perCapita": 3614.4,
      "popChangePct": 3.5
    },
    {
      "year": 2026,
      "gdp": 152.354,
      "growth": 2.3,
      "perCapita": 3754.0,
      "popChangePct": 3.5
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 154.464,
      "growth": 2.6,
      "perCapita": 3677.3,
      "popChangePct": 3.5
    },
    {
      "year": 2028,
      "gdp": 159.152,
      "growth": 2.8,
      "perCapita": 3660.8,
      "popChangePct": 3.5
    },
    {
      "year": 2029,
      "gdp": 164.468,
      "growth": 3,
      "perCapita": 3655.1,
      "popChangePct": 3.5
    },
    {
      "year": 2030,
      "gdp": 171.593,
      "growth": 3,
      "perCapita": 3684.5,
      "popChangePct": 3.5
    },
    {
      "year": 2031,
      "gdp": 179.876,
      "growth": 3.1,
      "perCapita": 3731.8,
      "popChangePct": 3.5
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 12.679,
      "perCapitaPPP": 1559.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 13.268,
      "perCapitaPPP": 1589.0,
      "perCapitaPPPChangePct": 1.89,
      "popChangePct": 2.71
    },
    {
      "year": 1982,
      "gdpPPP": 14.088,
      "perCapitaPPP": 1643.7,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 2.65
    },
    {
      "year": 1983,
      "gdpPPP": 15.255,
      "perCapitaPPP": 1734.4,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 2.61
    },
    {
      "year": 1984,
      "gdpPPP": 16.753,
      "perCapitaPPP": 1855.8,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 2.65
    },
    {
      "year": 1985,
      "gdpPPP": 17.888,
      "perCapitaPPP": 1758.4,
      "perCapitaPPPChangePct": -5.25,
      "popChangePct": 12.68
    },
    {
      "year": 1986,
      "gdpPPP": 18.778,
      "perCapitaPPP": 1794.5,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 2.86
    },
    {
      "year": 1987,
      "gdpPPP": 20.028,
      "perCapitaPPP": 1866.4,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 2.55
    },
    {
      "year": 1988,
      "gdpPPP": 22.006,
      "perCapitaPPP": 1996.6,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 2.71
    },
    {
      "year": 1989,
      "gdpPPP": 22.878,
      "perCapitaPPP": 2020.3,
      "perCapitaPPPChangePct": 1.19,
      "popChangePct": 2.74
    },
    {
      "year": 1990,
      "gdpPPP": 22.915,
      "perCapitaPPP": 1971.0,
      "perCapitaPPPChangePct": -2.44,
      "popChangePct": 2.67
    },
    {
      "year": 1991,
      "gdpPPP": 26.553,
      "perCapitaPPP": 2208.4,
      "perCapitaPPPChangePct": 12.05,
      "popChangePct": 3.42
    },
    {
      "year": 1992,
      "gdpPPP": 30.255,
      "perCapitaPPP": 2435.3,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 3.33
    },
    {
      "year": 1993,
      "gdpPPP": 34.369,
      "perCapitaPPP": 2679.4,
      "perCapitaPPPChangePct": 10.03,
      "popChangePct": 3.24
    },
    {
      "year": 1994,
      "gdpPPP": 38.793,
      "perCapitaPPP": 2927.8,
      "perCapitaPPPChangePct": 9.27,
      "popChangePct": 3.3
    },
    {
      "year": 1995,
      "gdpPPP": 43.711,
      "perCapitaPPP": 3190.6,
      "perCapitaPPPChangePct": 8.98,
      "popChangePct": 3.4
    },
    {
      "year": 1996,
      "gdpPPP": 49.5,
      "perCapitaPPP": 3493.0,
      "perCapitaPPPChangePct": 9.48,
      "popChangePct": 3.44
    },
    {
      "year": 1997,
      "gdpPPP": 54.016,
      "perCapitaPPP": 3684.5,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 3.45
    },
    {
      "year": 1998,
      "gdpPPP": 57.186,
      "perCapitaPPP": 3772.3,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 3.4
    },
    {
      "year": 1999,
      "gdpPPP": 59.26,
      "perCapitaPPP": 3782.4,
      "perCapitaPPPChangePct": 0.27,
      "popChangePct": 3.35
    },
    {
      "year": 2000,
      "gdpPPP": 62.454,
      "perCapitaPPP": 3856.4,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 3.37
    },
    {
      "year": 2001,
      "gdpPPP": 66.546,
      "perCapitaPPP": 3973.6,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 3.41
    },
    {
      "year": 2002,
      "gdpPPP": 76.815,
      "perCapitaPPP": 4433.1,
      "perCapitaPPPChangePct": 11.57,
      "popChangePct": 3.47
    },
    {
      "year": 2003,
      "gdpPPP": 81.066,
      "perCapitaPPP": 4517.8,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 3.55
    },
    {
      "year": 2004,
      "gdpPPP": 92.752,
      "perCapitaPPP": 4986.6,
      "perCapitaPPPChangePct": 10.38,
      "popChangePct": 3.66
    },
    {
      "year": 2005,
      "gdpPPP": 109.197,
      "perCapitaPPP": 5660.4,
      "perCapitaPPPChangePct": 13.51,
      "popChangePct": 3.72
    },
    {
      "year": 2006,
      "gdpPPP": 125.892,
      "perCapitaPPP": 6289.8,
      "perCapitaPPPChangePct": 11.12,
      "popChangePct": 3.75
    },
    {
      "year": 2007,
      "gdpPPP": 146.112,
      "perCapitaPPP": 7031.9,
      "perCapitaPPPChangePct": 11.8,
      "popChangePct": 3.82
    },
    {
      "year": 2008,
      "gdpPPP": 164.996,
      "perCapitaPPP": 7646.2,
      "perCapitaPPPChangePct": 8.74,
      "popChangePct": 3.85
    },
    {
      "year": 2009,
      "gdpPPP": 169.334,
      "perCapitaPPP": 7554.6,
      "perCapitaPPPChangePct": -1.2,
      "popChangePct": 3.87
    },
    {
      "year": 2010,
      "gdpPPP": 180.458,
      "perCapitaPPP": 7746.7,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 3.93
    },
    {
      "year": 2011,
      "gdpPPP": 190.794,
      "perCapitaPPP": 7878.1,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 3.96
    },
    {
      "year": 2012,
      "gdpPPP": 210.865,
      "perCapitaPPP": 8375.2,
      "perCapitaPPPChangePct": 6.31,
      "popChangePct": 3.96
    },
    {
      "year": 2013,
      "gdpPPP": 224.92,
      "perCapitaPPP": 8596.0,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 3.93
    },
    {
      "year": 2014,
      "gdpPPP": 239.501,
      "perCapitaPPP": 8817.9,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 3.8
    },
    {
      "year": 2015,
      "gdpPPP": 243.561,
      "perCapitaPPP": 8649.9,
      "perCapitaPPPChangePct": -1.91,
      "popChangePct": 3.67
    },
    {
      "year": 2016,
      "gdpPPP": 241.695,
      "perCapitaPPP": 8282.0,
      "perCapitaPPPChangePct": -4.25,
      "popChangePct": 3.64
    },
    {
      "year": 2017,
      "gdpPPP": 245.679,
      "perCapitaPPP": 8125.7,
      "perCapitaPPPChangePct": -1.89,
      "popChangePct": 3.6
    },
    {
      "year": 2018,
      "gdpPPP": 261.964,
      "perCapitaPPP": 8370.2,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 3.51
    },
    {
      "year": 2019,
      "gdpPPP": 279.132,
      "perCapitaPPP": 8621.7,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 3.45
    },
    {
      "year": 2020,
      "gdpPPP": 260.322,
      "perCapitaPPP": 7782.2,
      "perCapitaPPPChangePct": -9.74,
      "popChangePct": 3.32
    },
    {
      "year": 2021,
      "gdpPPP": 301.129,
      "perCapitaPPP": 8720.2,
      "perCapitaPPPChangePct": 12.05,
      "popChangePct": 3.23
    },
    {
      "year": 2022,
      "gdpPPP": 336.158,
      "perCapitaPPP": 9433.4,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 3.19
    },
    {
      "year": 2023,
      "gdpPPP": 353.198,
      "perCapitaPPP": 9610.9,
      "perCapitaPPPChangePct": 1.88,
      "popChangePct": 3.13
    },
    {
      "year": 2024,
      "gdpPPP": 379.894,
      "perCapitaPPP": 10027.3,
      "perCapitaPPPChangePct": 4.33,
      "popChangePct": 3.09
    },
    {
      "year": 2025,
      "gdpPPP": 402.898,
      "perCapitaPPP": 10274.9,
      "perCapitaPPPChangePct": 2.47,
      "popChangePct": 3.5
    },
    {
      "year": 2026,
      "gdpPPP": 423.947,
      "perCapitaPPP": 10446.1,
      "perCapitaPPPChangePct": 1.67,
      "popChangePct": 3.5
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 444.682,
      "perCapitaPPP": 10586.5,
      "perCapitaPPPChangePct": 1.34,
      "popChangePct": 3.5
    },
    {
      "year": 2028,
      "gdpPPP": 464.712,
      "perCapitaPPP": 10689.2,
      "perCapitaPPPChangePct": 0.97,
      "popChangePct": 3.5
    },
    {
      "year": 2029,
      "gdpPPP": 487.021,
      "perCapitaPPP": 10823.5,
      "perCapitaPPPChangePct": 1.26,
      "popChangePct": 3.5
    },
    {
      "year": 2030,
      "gdpPPP": 510.993,
      "perCapitaPPP": 10972.3,
      "perCapitaPPPChangePct": 1.37,
      "popChangePct": 3.5
    },
    {
      "year": 2031,
      "gdpPPP": 536.297,
      "perCapitaPPP": 11126.2,
      "perCapitaPPPChangePct": 1.4,
      "popChangePct": 3.5
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function AngolaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
