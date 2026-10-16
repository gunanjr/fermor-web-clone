import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "China",
  "slug": "china",
  "iso3": "CHN",
  "region": "Asia",
  "rank2026": 2,
  "flagEmoji": "🇨🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "United States",
      "slug": "united-states",
      "rank": 1
    },
    {
      "name": "Germany",
      "slug": "germany",
      "rank": 3
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 303.55,
      "growth": 7.9,
      "perCapita": 307.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 289.215,
      "growth": 5.1,
      "perCapita": 289.0,
      "popChangePct": 1.38
    },
    {
      "year": 1982,
      "gdp": 285.139,
      "growth": 9,
      "perCapita": 280.5,
      "popChangePct": 1.58
    },
    {
      "year": 1983,
      "gdp": 306.013,
      "growth": 10.8,
      "perCapita": 297.1,
      "popChangePct": 1.33
    },
    {
      "year": 1984,
      "gdp": 314.832,
      "growth": 15.2,
      "perCapita": 301.7,
      "popChangePct": 1.31
    },
    {
      "year": 1985,
      "gdp": 310.709,
      "growth": 13.5,
      "perCapita": 293.5,
      "popChangePct": 1.43
    },
    {
      "year": 1986,
      "gdp": 301.471,
      "growth": 8.9,
      "perCapita": 280.4,
      "popChangePct": 1.56
    },
    {
      "year": 1987,
      "gdp": 328.305,
      "growth": 11.7,
      "perCapita": 300.4,
      "popChangePct": 1.67
    },
    {
      "year": 1988,
      "gdp": 409.363,
      "growth": 11.2,
      "perCapita": 368.7,
      "popChangePct": 1.58
    },
    {
      "year": 1989,
      "gdp": 458.985,
      "growth": 4.2,
      "perCapita": 407.2,
      "popChangePct": 1.51
    },
    {
      "year": 1990,
      "gdp": 397.359,
      "growth": 3.9,
      "perCapita": 347.5,
      "popChangePct": 1.45
    },
    {
      "year": 1991,
      "gdp": 415.946,
      "growth": 10.2,
      "perCapita": 359.1,
      "popChangePct": 1.3
    },
    {
      "year": 1992,
      "gdp": 495.515,
      "growth": 14.3,
      "perCapita": 422.9,
      "popChangePct": 1.16
    },
    {
      "year": 1993,
      "gdp": 621.918,
      "growth": 13.9,
      "perCapita": 524.8,
      "popChangePct": 1.15
    },
    {
      "year": 1994,
      "gdp": 566.382,
      "growth": 13.1,
      "perCapita": 472.6,
      "popChangePct": 1.12
    },
    {
      "year": 1995,
      "gdp": 737.894,
      "growth": 11,
      "perCapita": 609.2,
      "popChangePct": 1.06
    },
    {
      "year": 1996,
      "gdp": 868.768,
      "growth": 10,
      "perCapita": 709.8,
      "popChangePct": 1.05
    },
    {
      "year": 1997,
      "gdp": 967.89,
      "growth": 9.3,
      "perCapita": 782.9,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdp": 1035.515,
      "growth": 7.9,
      "perCapita": 830.0,
      "popChangePct": 0.92
    },
    {
      "year": 1999,
      "gdp": 1101.119,
      "growth": 7.8,
      "perCapita": 875.4,
      "popChangePct": 0.82
    },
    {
      "year": 2000,
      "gdp": 1220.346,
      "growth": 8.6,
      "perCapita": 962.9,
      "popChangePct": 0.76
    },
    {
      "year": 2001,
      "gdp": 1351.395,
      "growth": 8.3,
      "perCapita": 1058.9,
      "popChangePct": 0.7
    },
    {
      "year": 2002,
      "gdp": 1486.628,
      "growth": 9.2,
      "perCapita": 1157.3,
      "popChangePct": 0.65
    },
    {
      "year": 2003,
      "gdp": 1680.932,
      "growth": 10.1,
      "perCapita": 1300.8,
      "popChangePct": 0.6
    },
    {
      "year": 2004,
      "gdp": 1978.988,
      "growth": 10.1,
      "perCapita": 1522.4,
      "popChangePct": 0.59
    },
    {
      "year": 2005,
      "gdp": 2326.577,
      "growth": 11.4,
      "perCapita": 1779.3,
      "popChangePct": 0.59
    },
    {
      "year": 2006,
      "gdp": 2798.78,
      "growth": 12.7,
      "perCapita": 2129.2,
      "popChangePct": 0.53
    },
    {
      "year": 2007,
      "gdp": 3613.61,
      "growth": 14.2,
      "perCapita": 2734.9,
      "popChangePct": 0.52
    },
    {
      "year": 2008,
      "gdp": 4655.583,
      "growth": 9.6,
      "perCapita": 3505.7,
      "popChangePct": 0.51
    },
    {
      "year": 2009,
      "gdp": 5176.499,
      "growth": 9.4,
      "perCapita": 3879.0,
      "popChangePct": 0.49
    },
    {
      "year": 2010,
      "gdp": 6138.878,
      "growth": 10.6,
      "perCapita": 4578.1,
      "popChangePct": 0.48
    },
    {
      "year": 2011,
      "gdp": 7628.383,
      "growth": 9.5,
      "perCapita": 5654.2,
      "popChangePct": 0.62
    },
    {
      "year": 2012,
      "gdp": 8682.534,
      "growth": 7.8,
      "perCapita": 6387.9,
      "popChangePct": 0.75
    },
    {
      "year": 2013,
      "gdp": 9787.51,
      "growth": 7.8,
      "perCapita": 7158.5,
      "popChangePct": 0.59
    },
    {
      "year": 2014,
      "gdp": 10702.458,
      "growth": 7.5,
      "perCapita": 7775.4,
      "popChangePct": 0.67
    },
    {
      "year": 2015,
      "gdp": 11305.64,
      "growth": 7,
      "perCapita": 8173.2,
      "popChangePct": 0.49
    },
    {
      "year": 2016,
      "gdp": 11452,
      "growth": 6.8,
      "perCapita": 8225.1,
      "popChangePct": 0.65
    },
    {
      "year": 2017,
      "gdp": 12516.152,
      "growth": 6.9,
      "perCapita": 8939.4,
      "popChangePct": 0.56
    },
    {
      "year": 2018,
      "gdp": 14107.927,
      "growth": 6.8,
      "perCapita": 10038.3,
      "popChangePct": 0.38
    },
    {
      "year": 2019,
      "gdp": 14593.45,
      "growth": 6.1,
      "perCapita": 10349.4,
      "popChangePct": 0.33
    },
    {
      "year": 2020,
      "gdp": 15110.191,
      "growth": 2.3,
      "perCapita": 10700.4,
      "popChangePct": 0.14
    },
    {
      "year": 2021,
      "gdp": 18183.505,
      "growth": 8.6,
      "perCapita": 12872.4,
      "popChangePct": 0.03
    },
    {
      "year": 2022,
      "gdp": 18337.777,
      "growth": 3.1,
      "perCapita": 12989.4,
      "popChangePct": -0.06
    },
    {
      "year": 2023,
      "gdp": 18366.936,
      "growth": 5.4,
      "perCapita": 13029.2,
      "popChangePct": -0.15
    },
    {
      "year": 2024,
      "gdp": 18945.112,
      "growth": 5,
      "perCapita": 13452.7,
      "popChangePct": -0.1
    },
    {
      "year": 2025,
      "gdp": 19626.247,
      "growth": 5,
      "perCapita": 13968.1,
      "popChangePct": -0.23
    },
    {
      "year": 2026,
      "gdp": 20851.593,
      "growth": 4.4,
      "perCapita": 14873.6,
      "popChangePct": -0.22
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 21928.979,
      "growth": 4,
      "perCapita": 15678.0,
      "popChangePct": -0.23
    },
    {
      "year": 2028,
      "gdp": 23259.956,
      "growth": 4,
      "perCapita": 16671.4,
      "popChangePct": -0.25
    },
    {
      "year": 2029,
      "gdp": 24662.788,
      "growth": 3.7,
      "perCapita": 17725.5,
      "popChangePct": -0.27
    },
    {
      "year": 2030,
      "gdp": 26046.793,
      "growth": 3.3,
      "perCapita": 18775.5,
      "popChangePct": -0.29
    },
    {
      "year": 2031,
      "gdp": 27496.67,
      "growth": 3.3,
      "perCapita": 19883.2,
      "popChangePct": -0.32
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 271.921,
      "perCapitaPPP": 275.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 312.828,
      "perCapitaPPP": 312.6,
      "perCapitaPPPChangePct": 13.47,
      "popChangePct": 1.38
    },
    {
      "year": 1982,
      "gdpPPP": 362.053,
      "perCapitaPPP": 356.2,
      "perCapitaPPPChangePct": 13.93,
      "popChangePct": 1.58
    },
    {
      "year": 1983,
      "gdpPPP": 416.864,
      "perCapitaPPP": 404.7,
      "perCapitaPPPChangePct": 13.63,
      "popChangePct": 1.33
    },
    {
      "year": 1984,
      "gdpPPP": 497.56,
      "perCapitaPPP": 476.8,
      "perCapitaPPPChangePct": 17.81,
      "popChangePct": 1.31
    },
    {
      "year": 1985,
      "gdpPPP": 582.594,
      "perCapitaPPP": 550.4,
      "perCapitaPPPChangePct": 15.44,
      "popChangePct": 1.43
    },
    {
      "year": 1986,
      "gdpPPP": 647.219,
      "perCapitaPPP": 602.0,
      "perCapitaPPPChangePct": 9.38,
      "popChangePct": 1.56
    },
    {
      "year": 1987,
      "gdpPPP": 740.858,
      "perCapitaPPP": 677.8,
      "perCapitaPPPChangePct": 12.59,
      "popChangePct": 1.67
    },
    {
      "year": 1988,
      "gdpPPP": 852.888,
      "perCapitaPPP": 768.2,
      "perCapitaPPPChangePct": 13.33,
      "popChangePct": 1.58
    },
    {
      "year": 1989,
      "gdpPPP": 923.559,
      "perCapitaPPP": 819.5,
      "perCapitaPPPChangePct": 6.67,
      "popChangePct": 1.51
    },
    {
      "year": 1990,
      "gdpPPP": 995.375,
      "perCapitaPPP": 870.6,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 1.45
    },
    {
      "year": 1991,
      "gdpPPP": 1134.039,
      "perCapitaPPP": 979.1,
      "perCapitaPPPChangePct": 12.47,
      "popChangePct": 1.3
    },
    {
      "year": 1992,
      "gdpPPP": 1325.481,
      "perCapitaPPP": 1131.2,
      "perCapitaPPPChangePct": 15.54,
      "popChangePct": 1.16
    },
    {
      "year": 1993,
      "gdpPPP": 1545.987,
      "perCapitaPPP": 1304.4,
      "perCapitaPPPChangePct": 15.31,
      "popChangePct": 1.15
    },
    {
      "year": 1994,
      "gdpPPP": 1785.885,
      "perCapitaPPP": 1490.1,
      "perCapitaPPPChangePct": 14.23,
      "popChangePct": 1.12
    },
    {
      "year": 1995,
      "gdpPPP": 2024.185,
      "perCapitaPPP": 1671.2,
      "perCapitaPPPChangePct": 12.15,
      "popChangePct": 1.06
    },
    {
      "year": 1996,
      "gdpPPP": 2266.714,
      "perCapitaPPP": 1852.1,
      "perCapitaPPPChangePct": 10.82,
      "popChangePct": 1.05
    },
    {
      "year": 1997,
      "gdpPPP": 2520.675,
      "perCapitaPPP": 2039.0,
      "perCapitaPPPChangePct": 10.09,
      "popChangePct": 1.01
    },
    {
      "year": 1998,
      "gdpPPP": 2751.244,
      "perCapitaPPP": 2205.2,
      "perCapitaPPPChangePct": 8.15,
      "popChangePct": 0.92
    },
    {
      "year": 1999,
      "gdpPPP": 3006.613,
      "perCapitaPPP": 2390.3,
      "perCapitaPPPChangePct": 8.39,
      "popChangePct": 0.82
    },
    {
      "year": 2000,
      "gdpPPP": 3338.298,
      "perCapitaPPP": 2633.9,
      "perCapitaPPPChangePct": 10.19,
      "popChangePct": 0.76
    },
    {
      "year": 2001,
      "gdpPPP": 3697.446,
      "perCapitaPPP": 2897.1,
      "perCapitaPPPChangePct": 9.99,
      "popChangePct": 0.7
    },
    {
      "year": 2002,
      "gdpPPP": 4100.895,
      "perCapitaPPP": 3192.5,
      "perCapitaPPPChangePct": 10.2,
      "popChangePct": 0.65
    },
    {
      "year": 2003,
      "gdpPPP": 4605.114,
      "perCapitaPPP": 3563.6,
      "perCapitaPPPChangePct": 11.62,
      "popChangePct": 0.6
    },
    {
      "year": 2004,
      "gdpPPP": 5207.28,
      "perCapitaPPP": 4006.0,
      "perCapitaPPPChangePct": 12.41,
      "popChangePct": 0.59
    },
    {
      "year": 2005,
      "gdpPPP": 5984.795,
      "perCapitaPPP": 4577.1,
      "perCapitaPPPChangePct": 14.26,
      "popChangePct": 0.59
    },
    {
      "year": 2006,
      "gdpPPP": 6950.678,
      "perCapitaPPP": 5287.8,
      "perCapitaPPPChangePct": 15.53,
      "popChangePct": 0.53
    },
    {
      "year": 2007,
      "gdpPPP": 8149.415,
      "perCapitaPPP": 6167.8,
      "perCapitaPPPChangePct": 16.64,
      "popChangePct": 0.52
    },
    {
      "year": 2008,
      "gdpPPP": 9106.992,
      "perCapitaPPP": 6857.6,
      "perCapitaPPPChangePct": 11.18,
      "popChangePct": 0.51
    },
    {
      "year": 2009,
      "gdpPPP": 10028.619,
      "perCapitaPPP": 7514.9,
      "perCapitaPPPChangePct": 9.59,
      "popChangePct": 0.49
    },
    {
      "year": 2010,
      "gdpPPP": 11225.111,
      "perCapitaPPP": 8371.3,
      "perCapitaPPPChangePct": 11.4,
      "popChangePct": 0.48
    },
    {
      "year": 2011,
      "gdpPPP": 12539.482,
      "perCapitaPPP": 9294.3,
      "perCapitaPPPChangePct": 11.03,
      "popChangePct": 0.62
    },
    {
      "year": 2012,
      "gdpPPP": 13775.337,
      "perCapitaPPP": 10134.7,
      "perCapitaPPPChangePct": 9.04,
      "popChangePct": 0.75
    },
    {
      "year": 2013,
      "gdpPPP": 15098.444,
      "perCapitaPPP": 11042.8,
      "perCapitaPPPChangePct": 8.96,
      "popChangePct": 0.59
    },
    {
      "year": 2014,
      "gdpPPP": 16512.19,
      "perCapitaPPP": 11996.1,
      "perCapitaPPPChangePct": 8.63,
      "popChangePct": 0.67
    },
    {
      "year": 2015,
      "gdpPPP": 17835.078,
      "perCapitaPPP": 12893.5,
      "perCapitaPPPChangePct": 7.48,
      "popChangePct": 0.49
    },
    {
      "year": 2016,
      "gdpPPP": 19224.458,
      "perCapitaPPP": 13807.5,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": 0.65
    },
    {
      "year": 2017,
      "gdpPPP": 20917.221,
      "perCapitaPPP": 14939.7,
      "perCapitaPPPChangePct": 8.2,
      "popChangePct": 0.56
    },
    {
      "year": 2018,
      "gdpPPP": 22803.146,
      "perCapitaPPP": 16225.3,
      "perCapitaPPPChangePct": 8.61,
      "popChangePct": 0.38
    },
    {
      "year": 2019,
      "gdpPPP": 24798.514,
      "perCapitaPPP": 17586.6,
      "perCapitaPPPChangePct": 8.39,
      "popChangePct": 0.33
    },
    {
      "year": 2020,
      "gdpPPP": 25960.998,
      "perCapitaPPP": 18384.4,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 0.14
    },
    {
      "year": 2021,
      "gdpPPP": 29420.351,
      "perCapitaPPP": 20827.1,
      "perCapitaPPPChangePct": 13.29,
      "popChangePct": 0.03
    },
    {
      "year": 2022,
      "gdpPPP": 32493.554,
      "perCapitaPPP": 23016.5,
      "perCapitaPPPChangePct": 10.51,
      "popChangePct": -0.06
    },
    {
      "year": 2023,
      "gdpPPP": 35507.59,
      "perCapitaPPP": 25188.6,
      "perCapitaPPPChangePct": 9.44,
      "popChangePct": -0.15
    },
    {
      "year": 2024,
      "gdpPPP": 38209.549,
      "perCapitaPPP": 27132.1,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": -0.1
    },
    {
      "year": 2025,
      "gdpPPP": 41241.951,
      "perCapitaPPP": 29352.0,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": -0.23
    },
    {
      "year": 2026,
      "gdpPPP": 44295.453,
      "perCapitaPPP": 31596.2,
      "perCapitaPPPChangePct": 7.65,
      "popChangePct": -0.22
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 47093.755,
      "perCapitaPPP": 33669.3,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": -0.23
    },
    {
      "year": 2028,
      "gdpPPP": 49781.417,
      "perCapitaPPP": 35680.5,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": -0.25
    },
    {
      "year": 2029,
      "gdpPPP": 52523.765,
      "perCapitaPPP": 37749.6,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": -0.27
    },
    {
      "year": 2030,
      "gdpPPP": 55279.714,
      "perCapitaPPP": 39847.6,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": -0.29
    },
    {
      "year": 2031,
      "gdpPPP": 58129.519,
      "perCapitaPPP": 42034.3,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": -0.32
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ChinaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
