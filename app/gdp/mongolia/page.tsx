import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Mongolia",
  "slug": "mongolia",
  "iso3": "MNG",
  "region": "Asia",
  "rank2026": 124,
  "flagEmoji": "🇲🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Guinea",
      "slug": "guinea",
      "rank": 123
    },
    {
      "name": "Benin",
      "slug": "benin",
      "rank": 125
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.728,
      "growth": 6.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.854,
      "growth": 8.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 2.963,
      "growth": 8.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdp": 3.071,
      "growth": 5.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdp": 2.837,
      "growth": 5.9,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdp": 3.294,
      "growth": 5.7,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 3.636,
      "growth": 9.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 4.086,
      "growth": 3.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdp": 4.104,
      "growth": 5.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdp": 4.275,
      "growth": 4.2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 2.678,
      "growth": -2.5,
      "perCapita": 1288.7,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 2.821,
      "growth": -9.2,
      "perCapita": 1324.9,
      "popChangePct": 2.45
    },
    {
      "year": 1992,
      "gdp": 1.566,
      "growth": -9.3,
      "perCapita": 722.2,
      "popChangePct": 1.88
    },
    {
      "year": 1993,
      "gdp": 0.771,
      "growth": -3.2,
      "perCapita": 352.3,
      "popChangePct": 0.92
    },
    {
      "year": 1994,
      "gdp": 0.926,
      "growth": 2.1,
      "perCapita": 419.2,
      "popChangePct": 0.96
    },
    {
      "year": 1995,
      "gdp": 1.452,
      "growth": 6.4,
      "perCapita": 647.4,
      "popChangePct": 1.49
    },
    {
      "year": 1996,
      "gdp": 1.348,
      "growth": 2.2,
      "perCapita": 592.4,
      "popChangePct": 1.47
    },
    {
      "year": 1997,
      "gdp": 1.181,
      "growth": 3.9,
      "perCapita": 512.0,
      "popChangePct": 1.36
    },
    {
      "year": 1998,
      "gdp": 1.125,
      "growth": 3.3,
      "perCapita": 480.9,
      "popChangePct": 1.43
    },
    {
      "year": 1999,
      "gdp": 1.057,
      "growth": 3.1,
      "perCapita": 445.5,
      "popChangePct": 1.41
    },
    {
      "year": 2000,
      "gdp": 1.137,
      "growth": 1.1,
      "perCapita": 473.2,
      "popChangePct": 1.26
    },
    {
      "year": 2001,
      "gdp": 1.268,
      "growth": 4.6,
      "perCapita": 521.3,
      "popChangePct": 1.21
    },
    {
      "year": 2002,
      "gdp": 1.397,
      "growth": 5.3,
      "perCapita": 566.4,
      "popChangePct": 1.4
    },
    {
      "year": 2003,
      "gdp": 1.595,
      "growth": 7.4,
      "perCapita": 639.4,
      "popChangePct": 1.18
    },
    {
      "year": 2004,
      "gdp": 1.992,
      "growth": 9.4,
      "perCapita": 790.0,
      "popChangePct": 1.08
    },
    {
      "year": 2005,
      "gdp": 2.523,
      "growth": 6.5,
      "perCapita": 989.2,
      "popChangePct": 1.15
    },
    {
      "year": 2006,
      "gdp": 3.414,
      "growth": 8.2,
      "perCapita": 1321.6,
      "popChangePct": 1.25
    },
    {
      "year": 2007,
      "gdp": 4.235,
      "growth": 8.8,
      "perCapita": 1616.1,
      "popChangePct": 1.43
    },
    {
      "year": 2008,
      "gdp": 5.623,
      "growth": 7.8,
      "perCapita": 2109.3,
      "popChangePct": 1.76
    },
    {
      "year": 2009,
      "gdp": 4.584,
      "growth": -2.1,
      "perCapita": 1687.5,
      "popChangePct": 1.88
    },
    {
      "year": 2010,
      "gdp": 7.185,
      "growth": 7.3,
      "perCapita": 2602.4,
      "popChangePct": 1.66
    },
    {
      "year": 2011,
      "gdp": 10.41,
      "growth": 17.3,
      "perCapita": 3702.4,
      "popChangePct": 1.85
    },
    {
      "year": 2012,
      "gdp": 12.278,
      "growth": 12.3,
      "perCapita": 4281.3,
      "popChangePct": 1.99
    },
    {
      "year": 2013,
      "gdp": 12.582,
      "growth": 11.6,
      "perCapita": 4293.8,
      "popChangePct": 2.16
    },
    {
      "year": 2014,
      "gdp": 12.227,
      "growth": 7.9,
      "perCapita": 4081.0,
      "popChangePct": 2.25
    },
    {
      "year": 2015,
      "gdp": 11.62,
      "growth": 2.4,
      "perCapita": 3800.1,
      "popChangePct": 2.07
    },
    {
      "year": 2016,
      "gdp": 11.154,
      "growth": 1.5,
      "perCapita": 3575.1,
      "popChangePct": 2.03
    },
    {
      "year": 2017,
      "gdp": 11.481,
      "growth": 5.6,
      "perCapita": 3612.7,
      "popChangePct": 1.86
    },
    {
      "year": 2018,
      "gdp": 13.207,
      "growth": 7.7,
      "perCapita": 4078.2,
      "popChangePct": 1.89
    },
    {
      "year": 2019,
      "gdp": 14.206,
      "growth": 5.6,
      "perCapita": 4309.0,
      "popChangePct": 1.82
    },
    {
      "year": 2020,
      "gdp": 13.313,
      "growth": -4.6,
      "perCapita": 3965.1,
      "popChangePct": 1.85
    },
    {
      "year": 2021,
      "gdp": 15.286,
      "growth": 1.6,
      "perCapita": 4482.9,
      "popChangePct": 1.55
    },
    {
      "year": 2022,
      "gdp": 17.146,
      "growth": 5,
      "perCapita": 4959.1,
      "popChangePct": 1.41
    },
    {
      "year": 2023,
      "gdp": 20.315,
      "growth": 7.4,
      "perCapita": 5796.5,
      "popChangePct": 1.36
    },
    {
      "year": 2024,
      "gdp": 23.795,
      "growth": 5.1,
      "perCapita": 6712.5,
      "popChangePct": 1.14
    },
    {
      "year": 2025,
      "gdp": 25.37,
      "growth": 6.8,
      "perCapita": 7079.3,
      "popChangePct": 1.1
    },
    {
      "year": 2026,
      "gdp": 28.45,
      "growth": 5.3,
      "perCapita": 7853.0,
      "popChangePct": 1.09
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 30.604,
      "growth": 5.3,
      "perCapita": 8356.1,
      "popChangePct": 1.08
    },
    {
      "year": 2028,
      "gdp": 32.827,
      "growth": 5.2,
      "perCapita": 8866.0,
      "popChangePct": 1.12
    },
    {
      "year": 2029,
      "gdp": 35.203,
      "growth": 5,
      "perCapita": 9405.0,
      "popChangePct": 1.08
    },
    {
      "year": 2030,
      "gdp": 37.744,
      "growth": 5,
      "perCapita": 9974.6,
      "popChangePct": 1.1
    },
    {
      "year": 2031,
      "gdp": 40.473,
      "growth": 5,
      "perCapita": 10580.1,
      "popChangePct": 1.08
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.575,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.055,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 3.514,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdpPPP": 3.863,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdpPPP": 4.239,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdpPPP": 4.622,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 5.159,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdpPPP": 5.474,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdpPPP": 5.959,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdpPPP": 6.452,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdpPPP": 6.527,
      "perCapitaPPP": 3140.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 6.127,
      "perCapitaPPP": 2877.4,
      "perCapitaPPPChangePct": -8.37,
      "popChangePct": 2.45
    },
    {
      "year": 1992,
      "gdpPPP": 5.686,
      "perCapitaPPP": 2621.7,
      "perCapitaPPPChangePct": -8.89,
      "popChangePct": 1.88
    },
    {
      "year": 1993,
      "gdpPPP": 5.637,
      "perCapitaPPP": 2574.9,
      "perCapitaPPPChangePct": -1.79,
      "popChangePct": 0.92
    },
    {
      "year": 1994,
      "gdpPPP": 5.88,
      "perCapitaPPP": 2660.9,
      "perCapitaPPPChangePct": 3.34,
      "popChangePct": 0.96
    },
    {
      "year": 1995,
      "gdpPPP": 6.386,
      "perCapitaPPP": 2847.1,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 1.49
    },
    {
      "year": 1996,
      "gdpPPP": 6.648,
      "perCapitaPPP": 2921.0,
      "perCapitaPPPChangePct": 2.6,
      "popChangePct": 1.47
    },
    {
      "year": 1997,
      "gdpPPP": 7.026,
      "perCapitaPPP": 3045.0,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 1.36
    },
    {
      "year": 1998,
      "gdpPPP": 7.343,
      "perCapitaPPP": 3137.7,
      "perCapitaPPPChangePct": 3.04,
      "popChangePct": 1.43
    },
    {
      "year": 1999,
      "gdpPPP": 7.675,
      "perCapitaPPP": 3233.7,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": 1.41
    },
    {
      "year": 2000,
      "gdpPPP": 7.939,
      "perCapitaPPP": 3303.6,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 1.26
    },
    {
      "year": 2001,
      "gdpPPP": 8.494,
      "perCapitaPPP": 3492.2,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 1.21
    },
    {
      "year": 2002,
      "gdpPPP": 9.081,
      "perCapitaPPP": 3682.9,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": 1.4
    },
    {
      "year": 2003,
      "gdpPPP": 9.941,
      "perCapitaPPP": 3984.3,
      "perCapitaPPPChangePct": 8.19,
      "popChangePct": 1.18
    },
    {
      "year": 2004,
      "gdpPPP": 11.171,
      "perCapitaPPP": 4429.8,
      "perCapitaPPPChangePct": 11.18,
      "popChangePct": 1.08
    },
    {
      "year": 2005,
      "gdpPPP": 12.271,
      "perCapitaPPP": 4810.0,
      "perCapitaPPPChangePct": 8.58,
      "popChangePct": 1.15
    },
    {
      "year": 2006,
      "gdpPPP": 13.682,
      "perCapitaPPP": 5296.3,
      "perCapitaPPPChangePct": 10.11,
      "popChangePct": 1.25
    },
    {
      "year": 2007,
      "gdpPPP": 15.283,
      "perCapitaPPP": 5832.1,
      "perCapitaPPPChangePct": 10.12,
      "popChangePct": 1.43
    },
    {
      "year": 2008,
      "gdpPPP": 16.795,
      "perCapitaPPP": 6299.9,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 1.76
    },
    {
      "year": 2009,
      "gdpPPP": 16.549,
      "perCapitaPPP": 6092.6,
      "perCapitaPPPChangePct": -3.29,
      "popChangePct": 1.88
    },
    {
      "year": 2010,
      "gdpPPP": 17.975,
      "perCapitaPPP": 6510.5,
      "perCapitaPPPChangePct": 6.86,
      "popChangePct": 1.66
    },
    {
      "year": 2011,
      "gdpPPP": 21.518,
      "perCapitaPPP": 7653.2,
      "perCapitaPPPChangePct": 17.55,
      "popChangePct": 1.85
    },
    {
      "year": 2012,
      "gdpPPP": 24.619,
      "perCapitaPPP": 8584.9,
      "perCapitaPPPChangePct": 12.17,
      "popChangePct": 1.99
    },
    {
      "year": 2013,
      "gdpPPP": 27.955,
      "perCapitaPPP": 9540.0,
      "perCapitaPPPChangePct": 11.13,
      "popChangePct": 2.16
    },
    {
      "year": 2014,
      "gdpPPP": 30.685,
      "perCapitaPPP": 10242.0,
      "perCapitaPPPChangePct": 7.36,
      "popChangePct": 2.25
    },
    {
      "year": 2015,
      "gdpPPP": 31.716,
      "perCapitaPPP": 10372.2,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 2.07
    },
    {
      "year": 2016,
      "gdpPPP": 32.494,
      "perCapitaPPP": 10415.0,
      "perCapitaPPPChangePct": 0.41,
      "popChangePct": 2.03
    },
    {
      "year": 2017,
      "gdpPPP": 34.941,
      "perCapitaPPP": 10994.8,
      "perCapitaPPPChangePct": 5.57,
      "popChangePct": 1.86
    },
    {
      "year": 2018,
      "gdpPPP": 39.517,
      "perCapitaPPP": 12202.3,
      "perCapitaPPPChangePct": 10.98,
      "popChangePct": 1.89
    },
    {
      "year": 2019,
      "gdpPPP": 44.457,
      "perCapitaPPP": 13484.5,
      "perCapitaPPPChangePct": 10.51,
      "popChangePct": 1.82
    },
    {
      "year": 2020,
      "gdpPPP": 45.56,
      "perCapitaPPP": 13569.5,
      "perCapitaPPPChangePct": 0.63,
      "popChangePct": 1.85
    },
    {
      "year": 2021,
      "gdpPPP": 50.053,
      "perCapitaPPP": 14678.6,
      "perCapitaPPPChangePct": 8.17,
      "popChangePct": 1.55
    },
    {
      "year": 2022,
      "gdpPPP": 56.311,
      "perCapitaPPP": 16286.5,
      "perCapitaPPPChangePct": 10.95,
      "popChangePct": 1.41
    },
    {
      "year": 2023,
      "gdpPPP": 62.729,
      "perCapitaPPP": 17898.3,
      "perCapitaPPPChangePct": 9.9,
      "popChangePct": 1.36
    },
    {
      "year": 2024,
      "gdpPPP": 67.579,
      "perCapitaPPP": 19064.1,
      "perCapitaPPPChangePct": 6.51,
      "popChangePct": 1.14
    },
    {
      "year": 2025,
      "gdpPPP": 74.252,
      "perCapitaPPP": 20720.0,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 1.1
    },
    {
      "year": 2026,
      "gdpPPP": 80.398,
      "perCapitaPPP": 22192.0,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": 1.09
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 86.507,
      "perCapitaPPP": 23619.9,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 1.08
    },
    {
      "year": 2028,
      "gdpPPP": 92.498,
      "perCapitaPPP": 24982.3,
      "perCapitaPPPChangePct": 5.77,
      "popChangePct": 1.12
    },
    {
      "year": 2029,
      "gdpPPP": 98.851,
      "perCapitaPPP": 26409.5,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 1.08
    },
    {
      "year": 2030,
      "gdpPPP": 105.709,
      "perCapitaPPP": 27936.1,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 1.1
    },
    {
      "year": 2031,
      "gdpPPP": 113.014,
      "perCapitaPPP": 29543.4,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": 1.08
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MongoliaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
