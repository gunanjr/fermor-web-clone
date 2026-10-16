import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Lebanon",
  "slug": "lebanon",
  "iso3": "LBN",
  "region": "Asia",
  "rank2026": 115,
  "flagEmoji": "🇱🇧",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bosnia and Herzegovina",
      "slug": "bosnia-and-herzegovina",
      "rank": 114
    },
    {
      "name": "Papua New Guinea",
      "slug": "papua-new-guinea",
      "rank": 116
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 4.02,
      "growth": 1.5,
      "perCapita": 1356.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 3.843,
      "growth": 0.5,
      "perCapita": 1269.4,
      "popChangePct": 2.13
    },
    {
      "year": 1982,
      "gdp": 2.621,
      "growth": -36.8,
      "perCapita": 853.6,
      "popChangePct": 1.42
    },
    {
      "year": 1983,
      "gdp": 3.611,
      "growth": 22.7,
      "perCapita": 1162.3,
      "popChangePct": 1.21
    },
    {
      "year": 1984,
      "gdp": 4.269,
      "growth": 44.5,
      "perCapita": 1349.5,
      "popChangePct": 1.83
    },
    {
      "year": 1985,
      "gdp": 3.566,
      "growth": 24.3,
      "perCapita": 1105.1,
      "popChangePct": 1.99
    },
    {
      "year": 1986,
      "gdp": 2.78,
      "growth": -6.8,
      "perCapita": 840.3,
      "popChangePct": 2.51
    },
    {
      "year": 1987,
      "gdp": 3.254,
      "growth": 16.7,
      "perCapita": 959.7,
      "popChangePct": 2.51
    },
    {
      "year": 1988,
      "gdp": 3.269,
      "growth": -28.2,
      "perCapita": 945.7,
      "popChangePct": 1.95
    },
    {
      "year": 1989,
      "gdp": 2.682,
      "growth": -42.2,
      "perCapita": 760.7,
      "popChangePct": 2.0
    },
    {
      "year": 1990,
      "gdp": 2.801,
      "growth": -13.4,
      "perCapita": 779.3,
      "popChangePct": 1.93
    },
    {
      "year": 1991,
      "gdp": 4.392,
      "growth": 38.2,
      "perCapita": 1197.9,
      "popChangePct": 2.03
    },
    {
      "year": 1992,
      "gdp": 5.472,
      "growth": 4.5,
      "perCapita": 1461.0,
      "popChangePct": 2.13
    },
    {
      "year": 1993,
      "gdp": 7.435,
      "growth": 7,
      "perCapita": 1946.9,
      "popChangePct": 1.98
    },
    {
      "year": 1994,
      "gdp": 8.988,
      "growth": 8,
      "perCapita": 2311.7,
      "popChangePct": 1.81
    },
    {
      "year": 1995,
      "gdp": 10.971,
      "growth": 6.5,
      "perCapita": 2770.6,
      "popChangePct": 1.85
    },
    {
      "year": 1996,
      "gdp": 12.824,
      "growth": 4,
      "perCapita": 3178.9,
      "popChangePct": 1.87
    },
    {
      "year": 1997,
      "gdp": 15.535,
      "growth": 10.2,
      "perCapita": 3782.1,
      "popChangePct": 1.83
    },
    {
      "year": 1998,
      "gdp": 17.059,
      "growth": 3.9,
      "perCapita": 4082.3,
      "popChangePct": 1.73
    },
    {
      "year": 1999,
      "gdp": 17.174,
      "growth": -0.8,
      "perCapita": 4040.8,
      "popChangePct": 1.7
    },
    {
      "year": 2000,
      "gdp": 17.018,
      "growth": 1.1,
      "perCapita": 3938.8,
      "popChangePct": 1.67
    },
    {
      "year": 2001,
      "gdp": 17.361,
      "growth": 3.9,
      "perCapita": 3955.3,
      "popChangePct": 1.57
    },
    {
      "year": 2002,
      "gdp": 18.837,
      "growth": 3.4,
      "perCapita": 4236.3,
      "popChangePct": 1.32
    },
    {
      "year": 2003,
      "gdp": 19.486,
      "growth": 1.7,
      "perCapita": 4325.6,
      "popChangePct": 1.3
    },
    {
      "year": 2004,
      "gdp": 21.16,
      "growth": 7.5,
      "perCapita": 4625.2,
      "popChangePct": 1.55
    },
    {
      "year": 2005,
      "gdp": 21.497,
      "growth": 2.5,
      "perCapita": 4630.0,
      "popChangePct": 1.49
    },
    {
      "year": 2006,
      "gdp": 22.023,
      "growth": 1.5,
      "perCapita": 4665.9,
      "popChangePct": 1.66
    },
    {
      "year": 2007,
      "gdp": 24.827,
      "growth": 9.3,
      "perCapita": 5162,
      "popChangePct": 1.91
    },
    {
      "year": 2008,
      "gdp": 29.119,
      "growth": 9.1,
      "perCapita": 5957.7,
      "popChangePct": 1.62
    },
    {
      "year": 2009,
      "gdp": 35.4,
      "growth": 10.2,
      "perCapita": 7149.8,
      "popChangePct": 1.29
    },
    {
      "year": 2010,
      "gdp": 38.444,
      "growth": 8,
      "perCapita": 7695.2,
      "popChangePct": 0.91
    },
    {
      "year": 2011,
      "gdp": 39.927,
      "growth": 0.9,
      "perCapita": 7914.1,
      "popChangePct": 0.98
    },
    {
      "year": 2012,
      "gdp": 44.015,
      "growth": 2.8,
      "perCapita": 8499.8,
      "popChangePct": 2.64
    },
    {
      "year": 2013,
      "gdp": 46.868,
      "growth": 3.8,
      "perCapita": 8253.1,
      "popChangePct": 9.68
    },
    {
      "year": 2014,
      "gdp": 48.068,
      "growth": 2.4,
      "perCapita": 7661.0,
      "popChangePct": 10.48
    },
    {
      "year": 2015,
      "gdp": 49.893,
      "growth": 0.5,
      "perCapita": 7797,
      "popChangePct": 1.99
    },
    {
      "year": 2016,
      "gdp": 50.618,
      "growth": 1.6,
      "perCapita": 8087.8,
      "popChangePct": -2.19
    },
    {
      "year": 2017,
      "gdp": 52.88,
      "growth": 0.8,
      "perCapita": 8655.8,
      "popChangePct": -2.4
    },
    {
      "year": 2018,
      "gdp": 55.29,
      "growth": -1.9,
      "perCapita": 9291.1,
      "popChangePct": -2.59
    },
    {
      "year": 2019,
      "gdp": 50.983,
      "growth": -6.6,
      "perCapita": 8817.7,
      "popChangePct": -2.84
    },
    {
      "year": 2020,
      "gdp": 23.626,
      "growth": -26.8,
      "perCapita": 4172.1,
      "popChangePct": -2.06
    },
    {
      "year": 2021,
      "gdp": 20.522,
      "growth": 2.1,
      "perCapita": 3669.5,
      "popChangePct": -1.24
    },
    {
      "year": 2022,
      "gdp": 25.674,
      "growth": 1,
      "perCapita": 4676.8,
      "popChangePct": -1.84
    },
    {
      "year": 2023,
      "gdp": 24.491,
      "growth": -0.7,
      "perCapita": 4574.4,
      "popChangePct": -2.48
    },
    {
      "year": 2024,
      "gdp": 29.339,
      "growth": -7.5,
      "perCapita": 5479.8,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 34.497,
      "growth": 4,
      "perCapita": 6443.2,
      "popChangePct": 0.0
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 22.155,
      "perCapitaPPP": 7475.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 24.384,
      "perCapitaPPP": 8054.9,
      "perCapitaPPPChangePct": 7.75,
      "popChangePct": 2.13
    },
    {
      "year": 1982,
      "gdpPPP": 16.366,
      "perCapitaPPP": 5330.7,
      "perCapitaPPPChangePct": -33.82,
      "popChangePct": 1.42
    },
    {
      "year": 1983,
      "gdpPPP": 20.869,
      "perCapitaPPP": 6716.8,
      "perCapitaPPPChangePct": 26.0,
      "popChangePct": 1.21
    },
    {
      "year": 1984,
      "gdpPPP": 31.24,
      "perCapitaPPP": 9874.8,
      "perCapitaPPPChangePct": 47.02,
      "popChangePct": 1.83
    },
    {
      "year": 1985,
      "gdpPPP": 40.059,
      "perCapitaPPP": 12414.5,
      "perCapitaPPPChangePct": 25.72,
      "popChangePct": 1.99
    },
    {
      "year": 1986,
      "gdpPPP": 38.097,
      "perCapitaPPP": 11516.6,
      "perCapitaPPPChangePct": -7.23,
      "popChangePct": 2.51
    },
    {
      "year": 1987,
      "gdpPPP": 45.573,
      "perCapitaPPP": 13439.8,
      "perCapitaPPPChangePct": 16.7,
      "popChangePct": 2.51
    },
    {
      "year": 1988,
      "gdpPPP": 33.871,
      "perCapitaPPP": 9797.3,
      "perCapitaPPPChangePct": -27.1,
      "popChangePct": 1.95
    },
    {
      "year": 1989,
      "gdpPPP": 20.347,
      "perCapitaPPP": 5771.3,
      "perCapitaPPPChangePct": -41.09,
      "popChangePct": 2.0
    },
    {
      "year": 1990,
      "gdpPPP": 18.275,
      "perCapitaPPP": 5085.3,
      "perCapitaPPPChangePct": -11.89,
      "popChangePct": 1.93
    },
    {
      "year": 1991,
      "gdpPPP": 26.11,
      "perCapitaPPP": 7120.9,
      "perCapitaPPPChangePct": 40.03,
      "popChangePct": 2.03
    },
    {
      "year": 1992,
      "gdpPPP": 27.906,
      "perCapitaPPP": 7450.7,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 2.13
    },
    {
      "year": 1993,
      "gdpPPP": 30.567,
      "perCapitaPPP": 8004.3,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 1.98
    },
    {
      "year": 1994,
      "gdpPPP": 33.727,
      "perCapitaPPP": 8674.2,
      "perCapitaPPPChangePct": 8.37,
      "popChangePct": 1.81
    },
    {
      "year": 1995,
      "gdpPPP": 36.669,
      "perCapitaPPP": 9260.8,
      "perCapitaPPPChangePct": 6.76,
      "popChangePct": 1.85
    },
    {
      "year": 1996,
      "gdpPPP": 38.849,
      "perCapitaPPP": 9629.7,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 1.87
    },
    {
      "year": 1997,
      "gdpPPP": 43.545,
      "perCapitaPPP": 10601.3,
      "perCapitaPPPChangePct": 10.09,
      "popChangePct": 1.83
    },
    {
      "year": 1998,
      "gdpPPP": 45.752,
      "perCapitaPPP": 10948.7,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": 1.73
    },
    {
      "year": 1999,
      "gdpPPP": 46.028,
      "perCapitaPPP": 10830.2,
      "perCapitaPPPChangePct": -1.08,
      "popChangePct": 1.7
    },
    {
      "year": 2000,
      "gdpPPP": 47.589,
      "perCapitaPPP": 11014.3,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 1.67
    },
    {
      "year": 2001,
      "gdpPPP": 50.558,
      "perCapitaPPP": 11518.7,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": 1.57
    },
    {
      "year": 2002,
      "gdpPPP": 53.089,
      "perCapitaPPP": 11939.2,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 1.32
    },
    {
      "year": 2003,
      "gdpPPP": 55.058,
      "perCapitaPPP": 12222.0,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": 1.3
    },
    {
      "year": 2004,
      "gdpPPP": 60.779,
      "perCapitaPPP": 13285.5,
      "perCapitaPPPChangePct": 8.7,
      "popChangePct": 1.55
    },
    {
      "year": 2005,
      "gdpPPP": 64.23,
      "perCapitaPPP": 13833.6,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 1.49
    },
    {
      "year": 2006,
      "gdpPPP": 67.237,
      "perCapitaPPP": 14245.5,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 1.66
    },
    {
      "year": 2007,
      "gdpPPP": 75.487,
      "perCapitaPPP": 15695.1,
      "perCapitaPPPChangePct": 10.18,
      "popChangePct": 1.91
    },
    {
      "year": 2008,
      "gdpPPP": 83.92,
      "perCapitaPPP": 17169.9,
      "perCapitaPPPChangePct": 9.4,
      "popChangePct": 1.62
    },
    {
      "year": 2009,
      "gdpPPP": 93.077,
      "perCapitaPPP": 18799.1,
      "perCapitaPPPChangePct": 9.49,
      "popChangePct": 1.29
    },
    {
      "year": 2010,
      "gdpPPP": 101.723,
      "perCapitaPPP": 20361.6,
      "perCapitaPPPChangePct": 8.31,
      "popChangePct": 0.91
    },
    {
      "year": 2011,
      "gdpPPP": 104.721,
      "perCapitaPPP": 20757.2,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 0.98
    },
    {
      "year": 2012,
      "gdpPPP": 109.638,
      "perCapitaPPP": 21172.3,
      "perCapitaPPPChangePct": 2.0,
      "popChangePct": 2.64
    },
    {
      "year": 2013,
      "gdpPPP": 115.729,
      "perCapitaPPP": 20379.0,
      "perCapitaPPPChangePct": -3.75,
      "popChangePct": 9.68
    },
    {
      "year": 2014,
      "gdpPPP": 120.629,
      "perCapitaPPP": 19225.8,
      "perCapitaPPPChangePct": -5.66,
      "popChangePct": 10.48
    },
    {
      "year": 2015,
      "gdpPPP": 122.347,
      "perCapitaPPP": 19119.9,
      "perCapitaPPPChangePct": -0.55,
      "popChangePct": 1.99
    },
    {
      "year": 2016,
      "gdpPPP": 125.52,
      "perCapitaPPP": 20055.6,
      "perCapitaPPPChangePct": 4.89,
      "popChangePct": -2.19
    },
    {
      "year": 2017,
      "gdpPPP": 128.781,
      "perCapitaPPP": 21079.6,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": -2.4
    },
    {
      "year": 2018,
      "gdpPPP": 132.494,
      "perCapitaPPP": 22264.7,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": -2.59
    },
    {
      "year": 2019,
      "gdpPPP": 126.06,
      "perCapitaPPP": 21802.4,
      "perCapitaPPPChangePct": -2.08,
      "popChangePct": -2.84
    },
    {
      "year": 2020,
      "gdpPPP": 72.674,
      "perCapitaPPP": 12833.4,
      "perCapitaPPPChangePct": -41.14,
      "popChangePct": -2.06
    },
    {
      "year": 2021,
      "gdpPPP": 62.145,
      "perCapitaPPP": 11111.9,
      "perCapitaPPPChangePct": -13.41,
      "popChangePct": -1.24
    },
    {
      "year": 2022,
      "gdpPPP": 67.23,
      "perCapitaPPP": 12246.6,
      "perCapitaPPPChangePct": 10.21,
      "popChangePct": -1.84
    },
    {
      "year": 2023,
      "gdpPPP": 69.23,
      "perCapitaPPP": 12930.7,
      "perCapitaPPPChangePct": 5.59,
      "popChangePct": -2.48
    },
    {
      "year": 2024,
      "gdpPPP": 65.627,
      "perCapitaPPP": 12257.8,
      "perCapitaPPPChangePct": -5.2,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 70.189,
      "perCapitaPPP": 13109.8,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 0.0
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function LebanonGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
