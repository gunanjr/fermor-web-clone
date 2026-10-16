import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bolivia",
  "slug": "bolivia",
  "iso3": "BOL",
  "region": "Americas",
  "rank2026": 90,
  "flagEmoji": "🇧🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Turkmenistan",
      "slug": "turkmenistan",
      "rank": 89
    },
    {
      "name": "Azerbaijan",
      "slug": "azerbaijan",
      "rank": 91
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 3.774,
      "growth": 0.6,
      "perCapita": 690.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.617,
      "growth": 0.3,
      "perCapita": 610.9,
      "popChangePct": 8.25
    },
    {
      "year": 1982,
      "gdp": 4.009,
      "growth": -3.9,
      "perCapita": 663.4,
      "popChangePct": 2.09
    },
    {
      "year": 1983,
      "gdp": 3.795,
      "growth": -4,
      "perCapita": 615.1,
      "popChangePct": 2.08
    },
    {
      "year": 1984,
      "gdp": 3.945,
      "growth": -0.2,
      "perCapita": 626.3,
      "popChangePct": 2.09
    },
    {
      "year": 1985,
      "gdp": 4.268,
      "growth": -1.7,
      "perCapita": 663.8,
      "popChangePct": 2.08
    },
    {
      "year": 1986,
      "gdp": 4.175,
      "growth": -2.6,
      "perCapita": 636.0,
      "popChangePct": 2.1
    },
    {
      "year": 1987,
      "gdp": 4.546,
      "growth": 2.5,
      "perCapita": 678.3,
      "popChangePct": 2.09
    },
    {
      "year": 1988,
      "gdp": 4.835,
      "growth": 2.9,
      "perCapita": 706.6,
      "popChangePct": 2.09
    },
    {
      "year": 1989,
      "gdp": 4.959,
      "growth": 3.8,
      "perCapita": 710,
      "popChangePct": 2.08
    },
    {
      "year": 1990,
      "gdp": 5.118,
      "growth": 4.6,
      "perCapita": 717.8,
      "popChangePct": 2.09
    },
    {
      "year": 1991,
      "gdp": 5.657,
      "growth": 5.1,
      "perCapita": 777.1,
      "popChangePct": 2.1
    },
    {
      "year": 1992,
      "gdp": 6.022,
      "growth": 1.9,
      "perCapita": 810.4,
      "popChangePct": 2.06
    },
    {
      "year": 1993,
      "gdp": 6.152,
      "growth": 4.3,
      "perCapita": 811.7,
      "popChangePct": 2.01
    },
    {
      "year": 1994,
      "gdp": 6.43,
      "growth": 4.7,
      "perCapita": 832.2,
      "popChangePct": 1.95
    },
    {
      "year": 1995,
      "gdp": 7.255,
      "growth": 4.7,
      "perCapita": 921.3,
      "popChangePct": 1.92
    },
    {
      "year": 1996,
      "gdp": 8.036,
      "growth": 4.6,
      "perCapita": 1001.8,
      "popChangePct": 1.87
    },
    {
      "year": 1997,
      "gdp": 8.702,
      "growth": 5,
      "perCapita": 1065.4,
      "popChangePct": 1.82
    },
    {
      "year": 1998,
      "gdp": 9.439,
      "growth": 5.7,
      "perCapita": 1135.4,
      "popChangePct": 1.78
    },
    {
      "year": 1999,
      "gdp": 9.206,
      "growth": 0.5,
      "perCapita": 1088.3,
      "popChangePct": 1.77
    },
    {
      "year": 2000,
      "gdp": 9.371,
      "growth": 2.1,
      "perCapita": 1088.8,
      "popChangePct": 1.73
    },
    {
      "year": 2001,
      "gdp": 9.1,
      "growth": 1.6,
      "perCapita": 1039.7,
      "popChangePct": 1.71
    },
    {
      "year": 2002,
      "gdp": 8.895,
      "growth": 2.7,
      "perCapita": 999.4,
      "popChangePct": 1.68
    },
    {
      "year": 2003,
      "gdp": 9.056,
      "growth": 1.8,
      "perCapita": 1000.6,
      "popChangePct": 1.7
    },
    {
      "year": 2004,
      "gdp": 9.79,
      "growth": 4.1,
      "perCapita": 1063.6,
      "popChangePct": 1.69
    },
    {
      "year": 2005,
      "gdp": 10.75,
      "growth": 4.2,
      "perCapita": 1148.5,
      "popChangePct": 1.71
    },
    {
      "year": 2006,
      "gdp": 12.897,
      "growth": 4.7,
      "perCapita": 1354.5,
      "popChangePct": 1.72
    },
    {
      "year": 2007,
      "gdp": 14.91,
      "growth": 5,
      "perCapita": 1539.4,
      "popChangePct": 1.72
    },
    {
      "year": 2008,
      "gdp": 19.078,
      "growth": 6.7,
      "perCapita": 1936.7,
      "popChangePct": 1.7
    },
    {
      "year": 2009,
      "gdp": 20.071,
      "growth": 3,
      "perCapita": 2003.8,
      "popChangePct": 1.67
    },
    {
      "year": 2010,
      "gdp": 22.698,
      "growth": 4.5,
      "perCapita": 2229.2,
      "popChangePct": 1.66
    },
    {
      "year": 2011,
      "gdp": 27.915,
      "growth": 5.5,
      "perCapita": 2697.4,
      "popChangePct": 1.64
    },
    {
      "year": 2012,
      "gdp": 31.444,
      "growth": 5.5,
      "perCapita": 2990.1,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdp": 35.965,
      "growth": 7.1,
      "perCapita": 3366.7,
      "popChangePct": 1.59
    },
    {
      "year": 2014,
      "gdp": 39.307,
      "growth": 5.8,
      "perCapita": 3623.1,
      "popChangePct": 1.55
    },
    {
      "year": 2015,
      "gdp": 40.034,
      "growth": 4.9,
      "perCapita": 3634.6,
      "popChangePct": 1.53
    },
    {
      "year": 2016,
      "gdp": 41.606,
      "growth": 4.3,
      "perCapita": 3721.4,
      "popChangePct": 1.5
    },
    {
      "year": 2017,
      "gdp": 46.262,
      "growth": 4.2,
      "perCapita": 4077.9,
      "popChangePct": 1.48
    },
    {
      "year": 2018,
      "gdp": 48.767,
      "growth": 2.9,
      "perCapita": 4237.5,
      "popChangePct": 1.44
    },
    {
      "year": 2019,
      "gdp": 49.414,
      "growth": 1.5,
      "perCapita": 4233.8,
      "popChangePct": 1.42
    },
    {
      "year": 2020,
      "gdp": 42.622,
      "growth": -12.7,
      "perCapita": 3607.1,
      "popChangePct": 1.24
    },
    {
      "year": 2021,
      "gdp": 48.227,
      "growth": 10,
      "perCapita": 4040.0,
      "popChangePct": 1.02
    },
    {
      "year": 2022,
      "gdp": 51.331,
      "growth": 3.7,
      "perCapita": 4250.2,
      "popChangePct": 1.17
    },
    {
      "year": 2023,
      "gdp": 52.722,
      "growth": 2.5,
      "perCapita": 4305.9,
      "popChangePct": 1.38
    },
    {
      "year": 2024,
      "gdp": 55.281,
      "growth": -1.1,
      "perCapita": 4453.4,
      "popChangePct": 1.38
    },
    {
      "year": 2025,
      "gdp": 64.25,
      "growth": -1.2,
      "perCapita": 5106.5,
      "popChangePct": 1.36
    },
    {
      "year": 2026,
      "gdp": 80.743,
      "growth": -3.3,
      "perCapita": 6333.2,
      "popChangePct": 1.33
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 15.05,
      "perCapitaPPP": 2752.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 16.524,
      "perCapitaPPP": 2791.0,
      "perCapitaPPPChangePct": 1.41,
      "popChangePct": 8.25
    },
    {
      "year": 1982,
      "gdpPPP": 16.854,
      "perCapitaPPP": 2788.6,
      "perCapitaPPPChangePct": -0.09,
      "popChangePct": 2.09
    },
    {
      "year": 1983,
      "gdpPPP": 16.806,
      "perCapitaPPP": 2723.8,
      "perCapitaPPPChangePct": -2.32,
      "popChangePct": 2.08
    },
    {
      "year": 1984,
      "gdpPPP": 17.377,
      "perCapitaPPP": 2758.8,
      "perCapitaPPPChangePct": 1.29,
      "popChangePct": 2.09
    },
    {
      "year": 1985,
      "gdpPPP": 17.626,
      "perCapitaPPP": 2741.1,
      "perCapitaPPPChangePct": -0.64,
      "popChangePct": 2.08
    },
    {
      "year": 1986,
      "gdpPPP": 17.519,
      "perCapitaPPP": 2668.6,
      "perCapitaPPPChangePct": -2.64,
      "popChangePct": 2.1
    },
    {
      "year": 1987,
      "gdpPPP": 18.395,
      "perCapitaPPP": 2744.8,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 2.09
    },
    {
      "year": 1988,
      "gdpPPP": 19.598,
      "perCapitaPPP": 2864.5,
      "perCapitaPPPChangePct": 4.36,
      "popChangePct": 2.09
    },
    {
      "year": 1989,
      "gdpPPP": 21.138,
      "perCapitaPPP": 3026.5,
      "perCapitaPPPChangePct": 5.65,
      "popChangePct": 2.08
    },
    {
      "year": 1990,
      "gdpPPP": 22.946,
      "perCapitaPPP": 3218.1,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 2.09
    },
    {
      "year": 1991,
      "gdpPPP": 24.941,
      "perCapitaPPP": 3425.8,
      "perCapitaPPPChangePct": 6.45,
      "popChangePct": 2.1
    },
    {
      "year": 1992,
      "gdpPPP": 25.989,
      "perCapitaPPP": 3497.7,
      "perCapitaPPPChangePct": 2.1,
      "popChangePct": 2.06
    },
    {
      "year": 1993,
      "gdpPPP": 27.756,
      "perCapitaPPP": 3662.1,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 2.01
    },
    {
      "year": 1994,
      "gdpPPP": 29.677,
      "perCapitaPPP": 3840.6,
      "perCapitaPPPChangePct": 4.87,
      "popChangePct": 1.95
    },
    {
      "year": 1995,
      "gdpPPP": 31.71,
      "perCapitaPPP": 4026.8,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": 1.92
    },
    {
      "year": 1996,
      "gdpPPP": 33.773,
      "perCapitaPPP": 4210.2,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 1.87
    },
    {
      "year": 1997,
      "gdpPPP": 36.075,
      "perCapitaPPP": 4416.6,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 1.82
    },
    {
      "year": 1998,
      "gdpPPP": 38.571,
      "perCapitaPPP": 4639.7,
      "perCapitaPPPChangePct": 5.05,
      "popChangePct": 1.78
    },
    {
      "year": 1999,
      "gdpPPP": 39.332,
      "perCapitaPPP": 4649.2,
      "perCapitaPPPChangePct": 0.21,
      "popChangePct": 1.77
    },
    {
      "year": 2000,
      "gdpPPP": 41.083,
      "perCapitaPPP": 4773.6,
      "perCapitaPPPChangePct": 2.67,
      "popChangePct": 1.73
    },
    {
      "year": 2001,
      "gdpPPP": 42.689,
      "perCapitaPPP": 4877.2,
      "perCapitaPPPChangePct": 2.17,
      "popChangePct": 1.71
    },
    {
      "year": 2002,
      "gdpPPP": 44.513,
      "perCapitaPPP": 5001.3,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 1.68
    },
    {
      "year": 2003,
      "gdpPPP": 46.225,
      "perCapitaPPP": 5107.3,
      "perCapitaPPPChangePct": 2.12,
      "popChangePct": 1.7
    },
    {
      "year": 2004,
      "gdpPPP": 49.396,
      "perCapitaPPP": 5366.7,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 1.69
    },
    {
      "year": 2005,
      "gdpPPP": 53.091,
      "perCapitaPPP": 5671.7,
      "perCapitaPPPChangePct": 5.68,
      "popChangePct": 1.71
    },
    {
      "year": 2006,
      "gdpPPP": 57.315,
      "perCapitaPPP": 6019.4,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 1.72
    },
    {
      "year": 2007,
      "gdpPPP": 61.824,
      "perCapitaPPP": 6382.9,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 1.72
    },
    {
      "year": 2008,
      "gdpPPP": 67.207,
      "perCapitaPPP": 6822.5,
      "perCapitaPPPChangePct": 6.89,
      "popChangePct": 1.7
    },
    {
      "year": 2009,
      "gdpPPP": 69.618,
      "perCapitaPPP": 6950.5,
      "perCapitaPPPChangePct": 1.88,
      "popChangePct": 1.67
    },
    {
      "year": 2010,
      "gdpPPP": 73.615,
      "perCapitaPPP": 7229.7,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 1.66
    },
    {
      "year": 2011,
      "gdpPPP": 79.278,
      "perCapitaPPP": 7660.6,
      "perCapitaPPPChangePct": 5.96,
      "popChangePct": 1.64
    },
    {
      "year": 2012,
      "gdpPPP": 85.156,
      "perCapitaPPP": 8097.9,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdpPPP": 92.789,
      "perCapitaPPP": 8686.0,
      "perCapitaPPPChangePct": 7.26,
      "popChangePct": 1.59
    },
    {
      "year": 2014,
      "gdpPPP": 99.861,
      "perCapitaPPP": 9204.7,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 1.55
    },
    {
      "year": 2015,
      "gdpPPP": 105.766,
      "perCapitaPPP": 9602.2,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 1.53
    },
    {
      "year": 2016,
      "gdpPPP": 111.406,
      "perCapitaPPP": 9964.7,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": 1.5
    },
    {
      "year": 2017,
      "gdpPPP": 118.215,
      "perCapitaPPP": 10420.4,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 1.48
    },
    {
      "year": 2018,
      "gdpPPP": 123.812,
      "perCapitaPPP": 10758.4,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 1.44
    },
    {
      "year": 2019,
      "gdpPPP": 128.448,
      "perCapitaPPP": 11005.4,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 1.42
    },
    {
      "year": 2020,
      "gdpPPP": 113.212,
      "perCapitaPPP": 9581.0,
      "perCapitaPPPChangePct": -12.94,
      "popChangePct": 1.24
    },
    {
      "year": 2021,
      "gdpPPP": 133.728,
      "perCapitaPPP": 11202.4,
      "perCapitaPPPChangePct": 16.92,
      "popChangePct": 1.02
    },
    {
      "year": 2022,
      "gdpPPP": 148.607,
      "perCapitaPPP": 12304.8,
      "perCapitaPPPChangePct": 9.84,
      "popChangePct": 1.17
    },
    {
      "year": 2023,
      "gdpPPP": 157.983,
      "perCapitaPPP": 12902.7,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 1.38
    },
    {
      "year": 2024,
      "gdpPPP": 160.086,
      "perCapitaPPP": 12896.3,
      "perCapitaPPPChangePct": -0.05,
      "popChangePct": 1.38
    },
    {
      "year": 2025,
      "gdpPPP": 162.652,
      "perCapitaPPP": 12927.5,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 1.36
    },
    {
      "year": 2026,
      "gdpPPP": 161.816,
      "perCapitaPPP": 12692.1,
      "perCapitaPPPChangePct": -1.82,
      "popChangePct": 1.33
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function BoliviaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
