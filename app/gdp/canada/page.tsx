import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Canada",
  "slug": "canada",
  "iso3": "CAN",
  "region": "Americas",
  "rank2026": 11,
  "flagEmoji": "🇨🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Brazil",
      "slug": "brazil",
      "rank": 10
    },
    {
      "name": "Australia",
      "slug": "australia",
      "rank": 12
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 276.064,
      "growth": 2.2,
      "perCapita": 11281.4,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 307.246,
      "growth": 3.5,
      "perCapita": 12396.7,
      "popChangePct": 1.28
    },
    {
      "year": 1982,
      "gdp": 314.639,
      "growth": -3.2,
      "perCapita": 12543.9,
      "popChangePct": 1.2
    },
    {
      "year": 1983,
      "gdp": 341.863,
      "growth": 2.6,
      "perCapita": 13493.2,
      "popChangePct": 1.01
    },
    {
      "year": 1984,
      "gdp": 356.728,
      "growth": 5.9,
      "perCapita": 13947.4,
      "popChangePct": 0.95
    },
    {
      "year": 1985,
      "gdp": 366.184,
      "growth": 4.7,
      "perCapita": 14185.9,
      "popChangePct": 0.92
    },
    {
      "year": 1986,
      "gdp": 379.015,
      "growth": 2.1,
      "perCapita": 14539.8,
      "popChangePct": 0.98
    },
    {
      "year": 1987,
      "gdp": 433.14,
      "growth": 4.1,
      "perCapita": 16408.1,
      "popChangePct": 1.27
    },
    {
      "year": 1988,
      "gdp": 509.38,
      "growth": 4.4,
      "perCapita": 19041.2,
      "popChangePct": 1.34
    },
    {
      "year": 1989,
      "gdp": 567.225,
      "growth": 2.3,
      "perCapita": 20842.5,
      "popChangePct": 1.73
    },
    {
      "year": 1990,
      "gdp": 596.089,
      "growth": 0.2,
      "perCapita": 21572.1,
      "popChangePct": 1.53
    },
    {
      "year": 1991,
      "gdp": 612.514,
      "growth": -2.1,
      "perCapita": 21885.6,
      "popChangePct": 1.28
    },
    {
      "year": 1992,
      "gdp": 594.376,
      "growth": 0.9,
      "perCapita": 20984.8,
      "popChangePct": 1.2
    },
    {
      "year": 1993,
      "gdp": 579.059,
      "growth": 2.7,
      "perCapita": 20210.5,
      "popChangePct": 1.15
    },
    {
      "year": 1994,
      "gdp": 579.913,
      "growth": 4.5,
      "perCapita": 20024.6,
      "popChangePct": 1.08
    },
    {
      "year": 1995,
      "gdp": 605.941,
      "growth": 2.7,
      "perCapita": 20706.7,
      "popChangePct": 1.05
    },
    {
      "year": 1996,
      "gdp": 630.598,
      "growth": 1.7,
      "perCapita": 21325.7,
      "popChangePct": 1.05
    },
    {
      "year": 1997,
      "gdp": 655.01,
      "growth": 4.3,
      "perCapita": 21930.5,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdp": 634.004,
      "growth": 3.9,
      "perCapita": 21046.6,
      "popChangePct": 0.86
    },
    {
      "year": 1999,
      "gdp": 678.417,
      "growth": 5.1,
      "perCapita": 22340.6,
      "popChangePct": 0.81
    },
    {
      "year": 2000,
      "gdp": 744.631,
      "growth": 5.1,
      "perCapita": 24296.7,
      "popChangePct": 0.92
    },
    {
      "year": 2001,
      "gdp": 738.968,
      "growth": 1.9,
      "perCapita": 23859.8,
      "popChangePct": 1.06
    },
    {
      "year": 2002,
      "gdp": 760.149,
      "growth": 3,
      "perCapita": 24279.8,
      "popChangePct": 1.09
    },
    {
      "year": 2003,
      "gdp": 895.599,
      "growth": 1.8,
      "perCapita": 28340.1,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdp": 1026.473,
      "growth": 3.1,
      "perCapita": 32178.5,
      "popChangePct": 0.94
    },
    {
      "year": 2005,
      "gdp": 1173.505,
      "growth": 3.2,
      "perCapita": 36441.0,
      "popChangePct": 0.95
    },
    {
      "year": 2006,
      "gdp": 1319.356,
      "growth": 2.6,
      "perCapita": 40559.0,
      "popChangePct": 1.01
    },
    {
      "year": 2007,
      "gdp": 1468.896,
      "growth": 2,
      "perCapita": 44717.1,
      "popChangePct": 0.98
    },
    {
      "year": 2008,
      "gdp": 1552.864,
      "growth": 1,
      "perCapita": 46773.7,
      "popChangePct": 1.07
    },
    {
      "year": 2009,
      "gdp": 1376.509,
      "growth": -2.9,
      "perCapita": 40989.3,
      "popChangePct": 1.15
    },
    {
      "year": 2010,
      "gdp": 1617.345,
      "growth": 3.1,
      "perCapita": 47625.7,
      "popChangePct": 1.12
    },
    {
      "year": 2011,
      "gdp": 1793.327,
      "growth": 3.1,
      "perCapita": 52285.8,
      "popChangePct": 1.0
    },
    {
      "year": 2012,
      "gdp": 1828.362,
      "growth": 1.8,
      "perCapita": 52745.1,
      "popChangePct": 1.06
    },
    {
      "year": 2013,
      "gdp": 1846.595,
      "growth": 2.3,
      "perCapita": 52711.3,
      "popChangePct": 1.06
    },
    {
      "year": 2014,
      "gdp": 1805.751,
      "growth": 2.9,
      "perCapita": 51025.4,
      "popChangePct": 1.02
    },
    {
      "year": 2015,
      "gdp": 1556.508,
      "growth": 0.6,
      "perCapita": 43628.4,
      "popChangePct": 0.81
    },
    {
      "year": 2016,
      "gdp": 1527.996,
      "growth": 1,
      "perCapita": 42382.5,
      "popChangePct": 1.06
    },
    {
      "year": 2017,
      "gdp": 1649.266,
      "growth": 3,
      "perCapita": 45192.4,
      "popChangePct": 1.22
    },
    {
      "year": 2018,
      "gdp": 1725.3,
      "growth": 2.7,
      "perCapita": 46618.0,
      "popChangePct": 1.41
    },
    {
      "year": 2019,
      "gdp": 1743.725,
      "growth": 1.9,
      "perCapita": 46431.0,
      "popChangePct": 1.48
    },
    {
      "year": 2020,
      "gdp": 1655.685,
      "growth": -5,
      "perCapita": 43573.2,
      "popChangePct": 1.18
    },
    {
      "year": 2021,
      "gdp": 2022.382,
      "growth": 6,
      "perCapita": 52907.5,
      "popChangePct": 0.6
    },
    {
      "year": 2022,
      "gdp": 2200.567,
      "growth": 4.7,
      "perCapita": 56608.8,
      "popChangePct": 1.7
    },
    {
      "year": 2023,
      "gdp": 2196.594,
      "growth": 2,
      "perCapita": 55002.4,
      "popChangePct": 2.73
    },
    {
      "year": 2024,
      "gdp": 2270.076,
      "growth": 2,
      "perCapita": 55209.1,
      "popChangePct": 2.96
    },
    {
      "year": 2025,
      "gdp": 2319.9,
      "growth": 1.7,
      "perCapita": 55764.7,
      "popChangePct": 1.18
    },
    {
      "year": 2026,
      "gdp": 2507.34,
      "growth": 1.5,
      "perCapita": 60304.6,
      "popChangePct": -0.06
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2640.393,
      "growth": 1.9,
      "perCapita": 63468.2,
      "popChangePct": 0.06
    },
    {
      "year": 2028,
      "gdp": 2759.418,
      "growth": 1.7,
      "perCapita": 66123.1,
      "popChangePct": 0.31
    },
    {
      "year": 2029,
      "gdp": 2882.317,
      "growth": 1.7,
      "perCapita": 68607.2,
      "popChangePct": 0.67
    },
    {
      "year": 2030,
      "gdp": 3008.107,
      "growth": 1.7,
      "perCapita": 71028.4,
      "popChangePct": 0.81
    },
    {
      "year": 2031,
      "gdp": 3139.433,
      "growth": 1.8,
      "perCapita": 73536.1,
      "popChangePct": 0.81
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 290.29,
      "perCapitaPPP": 11862.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 328.886,
      "perCapitaPPP": 13269.8,
      "perCapitaPPPChangePct": 11.86,
      "popChangePct": 1.28
    },
    {
      "year": 1982,
      "gdpPPP": 338.153,
      "perCapitaPPP": 13481.4,
      "perCapitaPPPChangePct": 1.59,
      "popChangePct": 1.2
    },
    {
      "year": 1983,
      "gdpPPP": 360.398,
      "perCapitaPPP": 14224.8,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 1.01
    },
    {
      "year": 1984,
      "gdpPPP": 395.431,
      "perCapitaPPP": 15460.6,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 0.95
    },
    {
      "year": 1985,
      "gdpPPP": 427.262,
      "perCapitaPPP": 16552.1,
      "perCapitaPPPChangePct": 7.06,
      "popChangePct": 0.92
    },
    {
      "year": 1986,
      "gdpPPP": 445.111,
      "perCapitaPPP": 17075.3,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 0.98
    },
    {
      "year": 1987,
      "gdpPPP": 474.716,
      "perCapitaPPP": 17983.1,
      "perCapitaPPPChangePct": 5.32,
      "popChangePct": 1.27
    },
    {
      "year": 1988,
      "gdpPPP": 513.134,
      "perCapitaPPP": 19181.5,
      "perCapitaPPPChangePct": 6.66,
      "popChangePct": 1.34
    },
    {
      "year": 1989,
      "gdpPPP": 545.72,
      "perCapitaPPP": 20052.3,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 1.73
    },
    {
      "year": 1990,
      "gdpPPP": 567.292,
      "perCapitaPPP": 20530.0,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 1.53
    },
    {
      "year": 1991,
      "gdpPPP": 574.217,
      "perCapitaPPP": 20517.2,
      "perCapitaPPPChangePct": -0.06,
      "popChangePct": 1.28
    },
    {
      "year": 1992,
      "gdpPPP": 592.533,
      "perCapitaPPP": 20919.7,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 1.2
    },
    {
      "year": 1993,
      "gdpPPP": 622.697,
      "perCapitaPPP": 21733.5,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.15
    },
    {
      "year": 1994,
      "gdpPPP": 664.576,
      "perCapitaPPP": 22948.0,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": 1.08
    },
    {
      "year": 1995,
      "gdpPPP": 696.709,
      "perCapitaPPP": 23808.5,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 1.05
    },
    {
      "year": 1996,
      "gdpPPP": 721.447,
      "perCapitaPPP": 24398.0,
      "perCapitaPPPChangePct": 2.48,
      "popChangePct": 1.05
    },
    {
      "year": 1997,
      "gdpPPP": 765.299,
      "perCapitaPPP": 25623.1,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdpPPP": 804.028,
      "perCapitaPPP": 26690.7,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 0.86
    },
    {
      "year": 1999,
      "gdpPPP": 857.326,
      "perCapitaPPP": 28232.1,
      "perCapitaPPPChangePct": 5.77,
      "popChangePct": 0.81
    },
    {
      "year": 2000,
      "gdpPPP": 921.798,
      "perCapitaPPP": 30077.5,
      "perCapitaPPPChangePct": 6.54,
      "popChangePct": 0.92
    },
    {
      "year": 2001,
      "gdpPPP": 960.227,
      "perCapitaPPP": 31003.8,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 1.06
    },
    {
      "year": 2002,
      "gdpPPP": 1004.396,
      "perCapitaPPP": 32081.3,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 1.09
    },
    {
      "year": 2003,
      "gdpPPP": 1042.727,
      "perCapitaPPP": 32995.8,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 0.94
    },
    {
      "year": 2004,
      "gdpPPP": 1103.876,
      "perCapitaPPP": 34605.0,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 0.94
    },
    {
      "year": 2005,
      "gdpPPP": 1175.043,
      "perCapitaPPP": 36488.7,
      "perCapitaPPPChangePct": 5.44,
      "popChangePct": 0.95
    },
    {
      "year": 2006,
      "gdpPPP": 1243.233,
      "perCapitaPPP": 38218.9,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 1.01
    },
    {
      "year": 2007,
      "gdpPPP": 1303.091,
      "perCapitaPPP": 39669.5,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 0.98
    },
    {
      "year": 2008,
      "gdpPPP": 1341.414,
      "perCapitaPPP": 40404.7,
      "perCapitaPPPChangePct": 1.85,
      "popChangePct": 1.07
    },
    {
      "year": 2009,
      "gdpPPP": 1310.343,
      "perCapitaPPP": 39019.0,
      "perCapitaPPPChangePct": -3.43,
      "popChangePct": 1.15
    },
    {
      "year": 2010,
      "gdpPPP": 1367.261,
      "perCapitaPPP": 40261.5,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 1.12
    },
    {
      "year": 2011,
      "gdpPPP": 1439.25,
      "perCapitaPPP": 41962.4,
      "perCapitaPPPChangePct": 4.22,
      "popChangePct": 1.0
    },
    {
      "year": 2012,
      "gdpPPP": 1491.786,
      "perCapitaPPP": 43035.4,
      "perCapitaPPPChangePct": 2.56,
      "popChangePct": 1.06
    },
    {
      "year": 2013,
      "gdpPPP": 1552.463,
      "perCapitaPPP": 44315.3,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 1.06
    },
    {
      "year": 2014,
      "gdpPPP": 1624.889,
      "perCapitaPPP": 45914.8,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 1.02
    },
    {
      "year": 2015,
      "gdpPPP": 1650.628,
      "perCapitaPPP": 46266.6,
      "perCapitaPPPChangePct": 0.77,
      "popChangePct": 0.81
    },
    {
      "year": 2016,
      "gdpPPP": 1683.619,
      "perCapitaPPP": 46699.0,
      "perCapitaPPPChangePct": 0.93,
      "popChangePct": 1.06
    },
    {
      "year": 2017,
      "gdpPPP": 1765.763,
      "perCapitaPPP": 48384.6,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 1.22
    },
    {
      "year": 2018,
      "gdpPPP": 1852.988,
      "perCapitaPPP": 50068.1,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 1.41
    },
    {
      "year": 2019,
      "gdpPPP": 1899.695,
      "perCapitaPPP": 50584.1,
      "perCapitaPPPChangePct": 1.03,
      "popChangePct": 1.48
    },
    {
      "year": 2020,
      "gdpPPP": 1847.839,
      "perCapitaPPP": 48630.2,
      "perCapitaPPPChangePct": -3.86,
      "popChangePct": 1.18
    },
    {
      "year": 2021,
      "gdpPPP": 2148.927,
      "perCapitaPPP": 56218.1,
      "perCapitaPPPChangePct": 15.6,
      "popChangePct": 0.6
    },
    {
      "year": 2022,
      "gdpPPP": 2409.845,
      "perCapitaPPP": 61992.4,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 1.7
    },
    {
      "year": 2023,
      "gdpPPP": 2547.818,
      "perCapitaPPP": 63797.0,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": 2.73
    },
    {
      "year": 2024,
      "gdpPPP": 2664.499,
      "perCapitaPPP": 64801.5,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 2.96
    },
    {
      "year": 2025,
      "gdpPPP": 2787.835,
      "perCapitaPPP": 67012.7,
      "perCapitaPPPChangePct": 3.41,
      "popChangePct": 1.18
    },
    {
      "year": 2026,
      "gdpPPP": 2910.718,
      "perCapitaPPP": 70006.3,
      "perCapitaPPPChangePct": 4.47,
      "popChangePct": -0.06
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3031.03,
      "perCapitaPPP": 72858.1,
      "perCapitaPPPChangePct": 4.07,
      "popChangePct": 0.06
    },
    {
      "year": 2028,
      "gdpPPP": 3131.757,
      "perCapitaPPP": 75045.3,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 0.31
    },
    {
      "year": 2029,
      "gdpPPP": 3242.526,
      "perCapitaPPP": 77181.1,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 0.67
    },
    {
      "year": 2030,
      "gdpPPP": 3357.099,
      "perCapitaPPP": 79268.9,
      "perCapitaPPPChangePct": 2.7,
      "popChangePct": 0.81
    },
    {
      "year": 2031,
      "gdpPPP": 3477.635,
      "perCapitaPPP": 81457.9,
      "perCapitaPPPChangePct": 2.76,
      "popChangePct": 0.81
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CanadaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
