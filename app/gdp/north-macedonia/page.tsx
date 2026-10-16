import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "North Macedonia",
  "slug": "north-macedonia",
  "iso3": "MKD",
  "region": "Europe",
  "rank2026": 136,
  "flagEmoji": "🏳️",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Moldova",
      "slug": "moldova",
      "rank": 135
    },
    {
      "name": "Madagascar",
      "slug": "madagascar",
      "rank": 137
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 2.443,
      "growth": null,
      "perCapita": 1263.9,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 2.687,
      "growth": -7.5,
      "perCapita": 1383.5,
      "popChangePct": 0.47
    },
    {
      "year": 1994,
      "gdp": 3.561,
      "growth": -1.8,
      "perCapita": 1824.4,
      "popChangePct": 0.51
    },
    {
      "year": 1995,
      "gdp": 4.687,
      "growth": -1.1,
      "perCapita": 2387.2,
      "popChangePct": 0.56
    },
    {
      "year": 1996,
      "gdp": 4.642,
      "growth": 1.2,
      "perCapita": 2348.1,
      "popChangePct": 0.71
    },
    {
      "year": 1997,
      "gdp": 3.928,
      "growth": 1.4,
      "perCapita": 1980.4,
      "popChangePct": 0.3
    },
    {
      "year": 1998,
      "gdp": 3.764,
      "growth": 3.4,
      "perCapita": 1888.8,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdp": 3.867,
      "growth": 4.3,
      "perCapita": 1932.0,
      "popChangePct": 0.45
    },
    {
      "year": 2000,
      "gdp": 3.774,
      "growth": 4.5,
      "perCapita": 1878.2,
      "popChangePct": 0.4
    },
    {
      "year": 2001,
      "gdp": 3.709,
      "growth": -3.1,
      "perCapita": 1839.6,
      "popChangePct": 0.3
    },
    {
      "year": 2002,
      "gdp": 3.991,
      "growth": 1.5,
      "perCapita": 1974.1,
      "popChangePct": 0.3
    },
    {
      "year": 2003,
      "gdp": 4.946,
      "growth": 2.2,
      "perCapita": 2440.8,
      "popChangePct": 0.2
    },
    {
      "year": 2004,
      "gdp": 5.684,
      "growth": 4.7,
      "perCapita": 2810.2,
      "popChangePct": -0.15
    },
    {
      "year": 2005,
      "gdp": 6.257,
      "growth": 4.7,
      "perCapita": 3120.2,
      "popChangePct": -0.89
    },
    {
      "year": 2006,
      "gdp": 6.86,
      "growth": 5.1,
      "perCapita": 3439.9,
      "popChangePct": -0.55
    },
    {
      "year": 2007,
      "gdp": 8.337,
      "growth": 6.5,
      "perCapita": 4204.2,
      "popChangePct": -0.55
    },
    {
      "year": 2008,
      "gdp": 9.912,
      "growth": 5.5,
      "perCapita": 5027.4,
      "popChangePct": -0.61
    },
    {
      "year": 2009,
      "gdp": 9.4,
      "growth": -0.4,
      "perCapita": 4798.7,
      "popChangePct": -0.61
    },
    {
      "year": 2010,
      "gdp": 9.415,
      "growth": 3.4,
      "perCapita": 4837.2,
      "popChangePct": -0.66
    },
    {
      "year": 2011,
      "gdp": 10.499,
      "growth": 2.3,
      "perCapita": 5419.3,
      "popChangePct": -0.46
    },
    {
      "year": 2012,
      "gdp": 9.751,
      "growth": -0.5,
      "perCapita": 5053.0,
      "popChangePct": -0.36
    },
    {
      "year": 2013,
      "gdp": 10.824,
      "growth": 2.9,
      "perCapita": 5629.5,
      "popChangePct": -0.36
    },
    {
      "year": 2014,
      "gdp": 11.378,
      "growth": 3.6,
      "perCapita": 5933.4,
      "popChangePct": -0.26
    },
    {
      "year": 2015,
      "gdp": 10.067,
      "growth": 3.9,
      "perCapita": 5264.1,
      "popChangePct": -0.31
    },
    {
      "year": 2016,
      "gdp": 10.686,
      "growth": 2.8,
      "perCapita": 5605.4,
      "popChangePct": -0.31
    },
    {
      "year": 2017,
      "gdp": 11.336,
      "growth": 1.1,
      "perCapita": 5970.6,
      "popChangePct": -0.37
    },
    {
      "year": 2018,
      "gdp": 12.694,
      "growth": 2.9,
      "perCapita": 6719.6,
      "popChangePct": -0.53
    },
    {
      "year": 2019,
      "gdp": 12.609,
      "growth": 3.9,
      "perCapita": 6720.3,
      "popChangePct": -0.69
    },
    {
      "year": 2020,
      "gdp": 12.385,
      "growth": -4.7,
      "perCapita": 6672.5,
      "popChangePct": -1.07
    },
    {
      "year": 2021,
      "gdp": 14.008,
      "growth": 4.5,
      "perCapita": 7625.3,
      "popChangePct": -1.02
    },
    {
      "year": 2022,
      "gdp": 13.957,
      "growth": 2.8,
      "perCapita": 7619.4,
      "popChangePct": -0.27
    },
    {
      "year": 2023,
      "gdp": 15.864,
      "growth": 2.6,
      "perCapita": 8679.1,
      "popChangePct": -0.22
    },
    {
      "year": 2024,
      "gdp": 16.954,
      "growth": 3,
      "perCapita": 9292.9,
      "popChangePct": -0.22
    },
    {
      "year": 2025,
      "gdp": 19.142,
      "growth": 3.5,
      "perCapita": 10545.6,
      "popChangePct": -0.49
    },
    {
      "year": 2026,
      "gdp": 21.605,
      "growth": 3.1,
      "perCapita": 11966.6,
      "popChangePct": -0.55
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 23.12,
      "growth": 3,
      "perCapita": 12875.0,
      "popChangePct": -0.5
    },
    {
      "year": 2028,
      "gdp": 24.585,
      "growth": 3,
      "perCapita": 13768.3,
      "popChangePct": -0.56
    },
    {
      "year": 2029,
      "gdp": 25.955,
      "growth": 3,
      "perCapita": 14621.1,
      "popChangePct": -0.62
    },
    {
      "year": 2030,
      "gdp": 27.307,
      "growth": 3,
      "perCapita": 15479.1,
      "popChangePct": -0.62
    },
    {
      "year": 2031,
      "gdp": 28.671,
      "growth": 3,
      "perCapita": 16354.4,
      "popChangePct": -0.62
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 12.503,
      "perCapitaPPP": 6469.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 11.84,
      "perCapitaPPP": 6096.8,
      "perCapitaPPPChangePct": -5.77,
      "popChangePct": 0.47
    },
    {
      "year": 1994,
      "gdpPPP": 11.875,
      "perCapitaPPP": 6083.8,
      "perCapitaPPPChangePct": -0.21,
      "popChangePct": 0.51
    },
    {
      "year": 1995,
      "gdpPPP": 11.99,
      "perCapitaPPP": 6106.7,
      "perCapitaPPPChangePct": 0.38,
      "popChangePct": 0.56
    },
    {
      "year": 1996,
      "gdpPPP": 12.357,
      "perCapitaPPP": 6249.8,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 0.71
    },
    {
      "year": 1997,
      "gdpPPP": 12.739,
      "perCapitaPPP": 6423.1,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": 0.3
    },
    {
      "year": 1998,
      "gdpPPP": 13.318,
      "perCapitaPPP": 6682.6,
      "perCapitaPPPChangePct": 4.04,
      "popChangePct": 0.5
    },
    {
      "year": 1999,
      "gdpPPP": 14.094,
      "perCapitaPPP": 7040.7,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 0.45
    },
    {
      "year": 2000,
      "gdpPPP": 15.067,
      "perCapitaPPP": 7497.9,
      "perCapitaPPPChangePct": 6.5,
      "popChangePct": 0.4
    },
    {
      "year": 2001,
      "gdpPPP": 14.934,
      "perCapitaPPP": 7407.3,
      "perCapitaPPPChangePct": -1.21,
      "popChangePct": 0.3
    },
    {
      "year": 2002,
      "gdpPPP": 15.393,
      "perCapitaPPP": 7613.6,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 0.3
    },
    {
      "year": 2003,
      "gdpPPP": 16.045,
      "perCapitaPPP": 7918.0,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.2
    },
    {
      "year": 2004,
      "gdpPPP": 17.247,
      "perCapitaPPP": 8526.6,
      "perCapitaPPPChangePct": 7.69,
      "popChangePct": -0.15
    },
    {
      "year": 2005,
      "gdpPPP": 18.628,
      "perCapitaPPP": 9289.2,
      "perCapitaPPPChangePct": 8.94,
      "popChangePct": -0.89
    },
    {
      "year": 2006,
      "gdpPPP": 20.189,
      "perCapitaPPP": 10123.4,
      "perCapitaPPPChangePct": 8.98,
      "popChangePct": -0.55
    },
    {
      "year": 2007,
      "gdpPPP": 22.078,
      "perCapitaPPP": 11134.1,
      "perCapitaPPPChangePct": 9.98,
      "popChangePct": -0.55
    },
    {
      "year": 2008,
      "gdpPPP": 23.735,
      "perCapitaPPP": 12039.0,
      "perCapitaPPPChangePct": 8.13,
      "popChangePct": -0.61
    },
    {
      "year": 2009,
      "gdpPPP": 23.796,
      "perCapitaPPP": 12148.2,
      "perCapitaPPPChangePct": 0.91,
      "popChangePct": -0.61
    },
    {
      "year": 2010,
      "gdpPPP": 24.894,
      "perCapitaPPP": 12790.3,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": -0.66
    },
    {
      "year": 2011,
      "gdpPPP": 26.002,
      "perCapitaPPP": 13421.1,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": -0.46
    },
    {
      "year": 2012,
      "gdpPPP": 26.365,
      "perCapitaPPP": 13662.0,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": -0.36
    },
    {
      "year": 2013,
      "gdpPPP": 27.598,
      "perCapitaPPP": 14353.8,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": -0.36
    },
    {
      "year": 2014,
      "gdpPPP": 29.098,
      "perCapitaPPP": 15174.6,
      "perCapitaPPPChangePct": 5.72,
      "popChangePct": -0.26
    },
    {
      "year": 2015,
      "gdpPPP": 30.501,
      "perCapitaPPP": 15948.6,
      "perCapitaPPPChangePct": 5.1,
      "popChangePct": -0.31
    },
    {
      "year": 2016,
      "gdpPPP": 31.667,
      "perCapitaPPP": 16611.8,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": -0.31
    },
    {
      "year": 2017,
      "gdpPPP": 32.583,
      "perCapitaPPP": 17161.1,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": -0.37
    },
    {
      "year": 2018,
      "gdpPPP": 34.873,
      "perCapitaPPP": 18460.5,
      "perCapitaPPPChangePct": 7.57,
      "popChangePct": -0.53
    },
    {
      "year": 2019,
      "gdpPPP": 37.943,
      "perCapitaPPP": 20222.5,
      "perCapitaPPPChangePct": 9.55,
      "popChangePct": -0.69
    },
    {
      "year": 2020,
      "gdpPPP": 37.052,
      "perCapitaPPP": 19962.2,
      "perCapitaPPPChangePct": -1.29,
      "popChangePct": -1.07
    },
    {
      "year": 2021,
      "gdpPPP": 41.101,
      "perCapitaPPP": 22372.6,
      "perCapitaPPPChangePct": 12.07,
      "popChangePct": -1.02
    },
    {
      "year": 2022,
      "gdpPPP": 45.239,
      "perCapitaPPP": 24697.5,
      "perCapitaPPPChangePct": 10.39,
      "popChangePct": -0.27
    },
    {
      "year": 2023,
      "gdpPPP": 48.111,
      "perCapitaPPP": 26321.6,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": -0.22
    },
    {
      "year": 2024,
      "gdpPPP": 50.782,
      "perCapitaPPP": 27835.3,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": -0.22
    },
    {
      "year": 2025,
      "gdpPPP": 54.043,
      "perCapitaPPP": 29773.4,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": -0.49
    },
    {
      "year": 2026,
      "gdpPPP": 57.315,
      "perCapitaPPP": 31746.0,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": -0.55
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 60.33,
      "perCapitaPPP": 33596.5,
      "perCapitaPPPChangePct": 5.83,
      "popChangePct": -0.5
    },
    {
      "year": 2028,
      "gdpPPP": 63.16,
      "perCapitaPPP": 35371.1,
      "perCapitaPPPChangePct": 5.28,
      "popChangePct": -0.56
    },
    {
      "year": 2029,
      "gdpPPP": 66.212,
      "perCapitaPPP": 37299.0,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": -0.62
    },
    {
      "year": 2030,
      "gdpPPP": 69.451,
      "perCapitaPPP": 39369.2,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": -0.62
    },
    {
      "year": 2031,
      "gdpPPP": 72.826,
      "perCapitaPPP": 41541.1,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": -0.62
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NorthMacedoniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
