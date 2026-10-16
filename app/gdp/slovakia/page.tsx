import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Slovakia",
  "slug": "slovakia",
  "iso3": "SVK",
  "region": "Europe",
  "rank2026": 63,
  "flagEmoji": "🇸🇰",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Kuwait",
      "slug": "kuwait",
      "rank": 62
    },
    {
      "name": "Angola",
      "slug": "angola",
      "rank": 64
    }
  ],
  "history": [
    {
      "year": 1993,
      "gdp": 13.906,
      "growth": null,
      "perCapita": 2605.7,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdp": 16.046,
      "growth": 6.2,
      "perCapita": 2989.7,
      "popChangePct": 0.56
    },
    {
      "year": 1995,
      "gdp": 20.297,
      "growth": 7.9,
      "perCapita": 3760.8,
      "popChangePct": 0.56
    },
    {
      "year": 1996,
      "gdp": 21.871,
      "growth": 6.9,
      "perCapita": 4043.9,
      "popChangePct": 0.2
    },
    {
      "year": 1997,
      "gdp": 22.037,
      "growth": 4.4,
      "perCapita": 4096.9,
      "popChangePct": -0.54
    },
    {
      "year": 1998,
      "gdp": 22.917,
      "growth": 3.8,
      "perCapita": 4253.7,
      "popChangePct": 0.17
    },
    {
      "year": 1999,
      "gdp": 20.89,
      "growth": -0.5,
      "perCapita": 3873.2,
      "popChangePct": 0.09
    },
    {
      "year": 2000,
      "gdp": 20.711,
      "growth": 0.8,
      "perCapita": 3836.3,
      "popChangePct": 0.11
    },
    {
      "year": 2001,
      "gdp": 21.384,
      "growth": 2.9,
      "perCapita": 3975.7,
      "popChangePct": -0.37
    },
    {
      "year": 2002,
      "gdp": 24.849,
      "growth": 4.4,
      "perCapita": 4619.7,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 33.864,
      "growth": 4.9,
      "perCapita": 6300.5,
      "popChangePct": -0.07
    },
    {
      "year": 2004,
      "gdp": 43.023,
      "growth": 5.4,
      "perCapita": 8009.0,
      "popChangePct": -0.06
    },
    {
      "year": 2005,
      "gdp": 48.912,
      "growth": 6.5,
      "perCapita": 9103.8,
      "popChangePct": 0.02
    },
    {
      "year": 2006,
      "gdp": 57.48,
      "growth": 8.9,
      "perCapita": 10698.0,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 77.26,
      "growth": 10.8,
      "perCapita": 14378.8,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 97.122,
      "growth": 5.4,
      "perCapita": 18065.7,
      "popChangePct": 0.06
    },
    {
      "year": 2009,
      "gdp": 89.246,
      "growth": -5.5,
      "perCapita": 16581.1,
      "popChangePct": 0.11
    },
    {
      "year": 2010,
      "gdp": 91.187,
      "growth": 6.8,
      "perCapita": 16916.5,
      "popChangePct": 0.15
    },
    {
      "year": 2011,
      "gdp": 99.688,
      "growth": 2.6,
      "perCapita": 18486.5,
      "popChangePct": 0.04
    },
    {
      "year": 2012,
      "gdp": 94.784,
      "growth": 1.6,
      "perCapita": 17538.6,
      "popChangePct": 0.22
    },
    {
      "year": 2013,
      "gdp": 99.136,
      "growth": 0.7,
      "perCapita": 18321.7,
      "popChangePct": 0.13
    },
    {
      "year": 2014,
      "gdp": 101.739,
      "growth": 2.7,
      "perCapita": 18785.1,
      "popChangePct": 0.09
    },
    {
      "year": 2015,
      "gdp": 89.188,
      "growth": 5.2,
      "perCapita": 16451.2,
      "popChangePct": 0.09
    },
    {
      "year": 2016,
      "gdp": 90.322,
      "growth": 1.9,
      "perCapita": 16645.4,
      "popChangePct": 0.09
    },
    {
      "year": 2017,
      "gdp": 95.944,
      "growth": 2.9,
      "perCapita": 17651.9,
      "popChangePct": 0.17
    },
    {
      "year": 2018,
      "gdp": 106.66,
      "growth": 4.1,
      "perCapita": 19595.4,
      "popChangePct": 0.15
    },
    {
      "year": 2019,
      "gdp": 105.855,
      "growth": 2.3,
      "perCapita": 19421.5,
      "popChangePct": 0.13
    },
    {
      "year": 2020,
      "gdp": 107.646,
      "growth": -2.6,
      "perCapita": 19723.1,
      "popChangePct": 0.15
    },
    {
      "year": 2021,
      "gdp": 120.591,
      "growth": 5.7,
      "perCapita": 22087.2,
      "popChangePct": 0.04
    },
    {
      "year": 2022,
      "gdp": 115.884,
      "growth": 0.5,
      "perCapita": 21322.9,
      "popChangePct": -0.46
    },
    {
      "year": 2023,
      "gdp": 133.617,
      "growth": 2.1,
      "perCapita": 24612.7,
      "popChangePct": -0.11
    },
    {
      "year": 2024,
      "gdp": 140.892,
      "growth": 1.9,
      "perCapita": 25972.3,
      "popChangePct": -0.07
    },
    {
      "year": 2025,
      "gdp": 154.442,
      "growth": 0.8,
      "perCapita": 28497.8,
      "popChangePct": -0.11
    },
    {
      "year": 2026,
      "gdp": 168.897,
      "growth": 0.6,
      "perCapita": 31241.8,
      "popChangePct": -0.24
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 177.004,
      "growth": 1.6,
      "perCapita": 32823.1,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdp": 186.384,
      "growth": 2.6,
      "perCapita": 34652.2,
      "popChangePct": -0.26
    },
    {
      "year": 2029,
      "gdp": 195.392,
      "growth": 2.5,
      "perCapita": 36423.6,
      "popChangePct": -0.28
    },
    {
      "year": 2030,
      "gdp": 203.719,
      "growth": 2.2,
      "perCapita": 38081.4,
      "popChangePct": -0.26
    },
    {
      "year": 2031,
      "gdp": 211.484,
      "growth": 1.8,
      "perCapita": 39649.0,
      "popChangePct": -0.3
    }
  ],
  "pppHistory": [
    {
      "year": 1993,
      "gdpPPP": 41.076,
      "perCapitaPPP": 7696.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdpPPP": 44.557,
      "perCapitaPPP": 8301.9,
      "perCapitaPPPChangePct": 7.87,
      "popChangePct": 0.56
    },
    {
      "year": 1995,
      "gdpPPP": 49.072,
      "perCapitaPPP": 9092.3,
      "perCapitaPPPChangePct": 9.52,
      "popChangePct": 0.56
    },
    {
      "year": 1996,
      "gdpPPP": 53.439,
      "perCapitaPPP": 9881.0,
      "perCapitaPPPChangePct": 8.67,
      "popChangePct": 0.2
    },
    {
      "year": 1997,
      "gdpPPP": 56.777,
      "perCapitaPPP": 10555.4,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": -0.54
    },
    {
      "year": 1998,
      "gdpPPP": 59.612,
      "perCapitaPPP": 11064.5,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 0.17
    },
    {
      "year": 1999,
      "gdpPPP": 60.169,
      "perCapitaPPP": 11156.1,
      "perCapitaPPPChangePct": 0.83,
      "popChangePct": 0.09
    },
    {
      "year": 2000,
      "gdpPPP": 62.018,
      "perCapitaPPP": 11487.6,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 0.11
    },
    {
      "year": 2001,
      "gdpPPP": 65.269,
      "perCapitaPPP": 12134.5,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": -0.37
    },
    {
      "year": 2002,
      "gdpPPP": 69.211,
      "perCapitaPPP": 12867.1,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 74.005,
      "perCapitaPPP": 13768.8,
      "perCapitaPPPChangePct": 7.01,
      "popChangePct": -0.07
    },
    {
      "year": 2004,
      "gdpPPP": 80.091,
      "perCapitaPPP": 14909.4,
      "perCapitaPPPChangePct": 8.28,
      "popChangePct": -0.06
    },
    {
      "year": 2005,
      "gdpPPP": 87.959,
      "perCapitaPPP": 16371.6,
      "perCapitaPPPChangePct": 9.81,
      "popChangePct": 0.02
    },
    {
      "year": 2006,
      "gdpPPP": 98.765,
      "perCapitaPPP": 18382.0,
      "perCapitaPPPChangePct": 12.28,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 112.415,
      "perCapitaPPP": 20921.6,
      "perCapitaPPPChangePct": 13.82,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 120.726,
      "perCapitaPPP": 22456.3,
      "perCapitaPPPChangePct": 7.34,
      "popChangePct": 0.06
    },
    {
      "year": 2009,
      "gdpPPP": 114.784,
      "perCapitaPPP": 21325.7,
      "perCapitaPPPChangePct": -5.03,
      "popChangePct": 0.11
    },
    {
      "year": 2010,
      "gdpPPP": 124.068,
      "perCapitaPPP": 23016.4,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 0.15
    },
    {
      "year": 2011,
      "gdpPPP": 129.872,
      "perCapitaPPP": 24084.1,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 0.04
    },
    {
      "year": 2012,
      "gdpPPP": 134.366,
      "perCapitaPPP": 24862.7,
      "perCapitaPPPChangePct": 3.23,
      "popChangePct": 0.22
    },
    {
      "year": 2013,
      "gdpPPP": 137.614,
      "perCapitaPPP": 25433.1,
      "perCapitaPPPChangePct": 2.29,
      "popChangePct": 0.13
    },
    {
      "year": 2014,
      "gdpPPP": 143.803,
      "perCapitaPPP": 26551.7,
      "perCapitaPPPChangePct": 4.4,
      "popChangePct": 0.09
    },
    {
      "year": 2015,
      "gdpPPP": 152.651,
      "perCapitaPPP": 28157.4,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 0.09
    },
    {
      "year": 2016,
      "gdpPPP": 157.103,
      "perCapitaPPP": 28952.4,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 0.09
    },
    {
      "year": 2017,
      "gdpPPP": 164.514,
      "perCapitaPPP": 30267.4,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 0.17
    },
    {
      "year": 2018,
      "gdpPPP": 171.627,
      "perCapitaPPP": 31530.9,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 0.15
    },
    {
      "year": 2019,
      "gdpPPP": 185.363,
      "perCapitaPPP": 34008.9,
      "perCapitaPPPChangePct": 7.86,
      "popChangePct": 0.13
    },
    {
      "year": 2020,
      "gdpPPP": 192.849,
      "perCapitaPPP": 35334.2,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 0.15
    },
    {
      "year": 2021,
      "gdpPPP": 209.238,
      "perCapitaPPP": 38323.5,
      "perCapitaPPPChangePct": 8.46,
      "popChangePct": 0.04
    },
    {
      "year": 2022,
      "gdpPPP": 225.341,
      "perCapitaPPP": 41463.2,
      "perCapitaPPPChangePct": 8.19,
      "popChangePct": -0.46
    },
    {
      "year": 2023,
      "gdpPPP": 238.615,
      "perCapitaPPP": 43953.5,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": -0.11
    },
    {
      "year": 2024,
      "gdpPPP": 249.279,
      "perCapitaPPP": 45952.8,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": -0.07
    },
    {
      "year": 2025,
      "gdpPPP": 258.421,
      "perCapitaPPP": 47683.9,
      "perCapitaPPPChangePct": 3.77,
      "popChangePct": -0.11
    },
    {
      "year": 2026,
      "gdpPPP": 267.42,
      "perCapitaPPP": 49466.1,
      "perCapitaPPPChangePct": 3.74,
      "popChangePct": -0.24
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 277.801,
      "perCapitaPPP": 51514.6,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdpPPP": 289.626,
      "perCapitaPPP": 53846.9,
      "perCapitaPPPChangePct": 4.53,
      "popChangePct": -0.26
    },
    {
      "year": 2029,
      "gdpPPP": 302.1,
      "perCapitaPPP": 56315.3,
      "perCapitaPPPChangePct": 4.58,
      "popChangePct": -0.28
    },
    {
      "year": 2030,
      "gdpPPP": 314.5,
      "perCapitaPPP": 58789.6,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": -0.26
    },
    {
      "year": 2031,
      "gdpPPP": 325.941,
      "perCapitaPPP": 61107.4,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": -0.3
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SlovakiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
