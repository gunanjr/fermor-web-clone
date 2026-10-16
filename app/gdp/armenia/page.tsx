import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Armenia",
  "slug": "armenia",
  "iso3": "ARM",
  "region": "Asia",
  "rank2026": 121,
  "flagEmoji": "🇦🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Burkina Faso",
      "slug": "burkina-faso",
      "rank": 120
    },
    {
      "name": "Malta",
      "slug": "malta",
      "rank": 122
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 0.108,
      "growth": null,
      "perCapita": 31.3,
      "popChangePct": -1.71
    },
    {
      "year": 1993,
      "gdp": 0.835,
      "growth": -14.1,
      "perCapita": 247.9,
      "popChangePct": -2.32
    },
    {
      "year": 1994,
      "gdp": 0.648,
      "growth": 5.4,
      "perCapita": 199.1,
      "popChangePct": -3.41
    },
    {
      "year": 1995,
      "gdp": 1.287,
      "growth": 8.2,
      "perCapita": 396.2,
      "popChangePct": -0.25
    },
    {
      "year": 1996,
      "gdp": 1.597,
      "growth": 5.9,
      "perCapita": 492.6,
      "popChangePct": -0.15
    },
    {
      "year": 1997,
      "gdp": 1.639,
      "growth": 3.2,
      "perCapita": 506.5,
      "popChangePct": -0.22
    },
    {
      "year": 1998,
      "gdp": 1.892,
      "growth": 7.3,
      "perCapita": 585.9,
      "popChangePct": -0.15
    },
    {
      "year": 1999,
      "gdp": 1.845,
      "growth": 3.4,
      "perCapita": 572.9,
      "popChangePct": -0.28
    },
    {
      "year": 2000,
      "gdp": 1.912,
      "growth": 5.6,
      "perCapita": 595.2,
      "popChangePct": -0.28
    },
    {
      "year": 2001,
      "gdp": 2.118,
      "growth": 9.6,
      "perCapita": 662.1,
      "popChangePct": -0.37
    },
    {
      "year": 2002,
      "gdp": 2.376,
      "growth": 14.8,
      "perCapita": 746.7,
      "popChangePct": -0.53
    },
    {
      "year": 2003,
      "gdp": 2.807,
      "growth": 14,
      "perCapita": 886.9,
      "popChangePct": -0.57
    },
    {
      "year": 2004,
      "gdp": 3.577,
      "growth": 10.4,
      "perCapita": 1136.7,
      "popChangePct": -0.6
    },
    {
      "year": 2005,
      "gdp": 4.9,
      "growth": 13.8,
      "perCapita": 1567.1,
      "popChangePct": -0.6
    },
    {
      "year": 2006,
      "gdp": 6.384,
      "growth": 13.2,
      "perCapita": 2054.6,
      "popChangePct": -0.64
    },
    {
      "year": 2007,
      "gdp": 9.206,
      "growth": 13.7,
      "perCapita": 2982.2,
      "popChangePct": -0.64
    },
    {
      "year": 2008,
      "gdp": 11.662,
      "growth": 6.9,
      "perCapita": 3803.7,
      "popChangePct": -0.68
    },
    {
      "year": 2009,
      "gdp": 8.648,
      "growth": -14.1,
      "perCapita": 2847.5,
      "popChangePct": -0.95
    },
    {
      "year": 2010,
      "gdp": 9.26,
      "growth": 2.2,
      "perCapita": 3066.2,
      "popChangePct": -0.56
    },
    {
      "year": 2011,
      "gdp": 10.142,
      "growth": 4.7,
      "perCapita": 3353.7,
      "popChangePct": 0.13
    },
    {
      "year": 2012,
      "gdp": 10.619,
      "growth": 7.1,
      "perCapita": 3514.0,
      "popChangePct": -0.07
    },
    {
      "year": 2013,
      "gdp": 11.121,
      "growth": 3.4,
      "perCapita": 3690.1,
      "popChangePct": -0.26
    },
    {
      "year": 2014,
      "gdp": 11.61,
      "growth": 3.6,
      "perCapita": 3863.9,
      "popChangePct": -0.3
    },
    {
      "year": 2015,
      "gdp": 10.553,
      "growth": 3.3,
      "perCapita": 3526.7,
      "popChangePct": -0.43
    },
    {
      "year": 2016,
      "gdp": 10.546,
      "growth": 0.2,
      "perCapita": 3539.6,
      "popChangePct": -0.43
    },
    {
      "year": 2017,
      "gdp": 11.527,
      "growth": 7.5,
      "perCapita": 3882.6,
      "popChangePct": -0.34
    },
    {
      "year": 2018,
      "gdp": 12.458,
      "growth": 5.2,
      "perCapita": 4205.2,
      "popChangePct": -0.2
    },
    {
      "year": 2019,
      "gdp": 13.619,
      "growth": 7.6,
      "perCapita": 4598.8,
      "popChangePct": -0.03
    },
    {
      "year": 2020,
      "gdp": 12.642,
      "growth": -7.1,
      "perCapita": 4267.5,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 13.879,
      "growth": 5.8,
      "perCapita": 4674.2,
      "popChangePct": 0.24
    },
    {
      "year": 2022,
      "gdp": 19.514,
      "growth": 12.6,
      "perCapita": 6539.1,
      "popChangePct": 0.51
    },
    {
      "year": 2023,
      "gdp": 24.186,
      "growth": 8.3,
      "perCapita": 7972.5,
      "popChangePct": 1.68
    },
    {
      "year": 2024,
      "gdp": 25.955,
      "growth": 5.9,
      "perCapita": 8555.6,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdp": 29.243,
      "growth": 7.2,
      "perCapita": 9521.0,
      "popChangePct": 1.22
    },
    {
      "year": 2026,
      "gdp": 31.873,
      "growth": 5.3,
      "perCapita": 10409.9,
      "popChangePct": -0.29
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 33.553,
      "growth": 5.5,
      "perCapita": 10994.9,
      "popChangePct": -0.33
    },
    {
      "year": 2028,
      "gdp": 35.404,
      "growth": 5,
      "perCapita": 11641.5,
      "popChangePct": -0.36
    },
    {
      "year": 2029,
      "gdp": 37.902,
      "growth": 5,
      "perCapita": 12507.4,
      "popChangePct": -0.36
    },
    {
      "year": 2030,
      "gdp": 40.665,
      "growth": 5,
      "perCapita": 13468.8,
      "popChangePct": -0.36
    },
    {
      "year": 2031,
      "gdp": 43.618,
      "growth": 5,
      "perCapita": 14500.9,
      "popChangePct": -0.36
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 6.177,
      "perCapitaPPP": 1790.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": -1.71
    },
    {
      "year": 1993,
      "gdpPPP": 5.434,
      "perCapitaPPP": 1612.6,
      "perCapitaPPPChangePct": -9.93,
      "popChangePct": -2.32
    },
    {
      "year": 1994,
      "gdpPPP": 5.85,
      "perCapitaPPP": 1797.5,
      "perCapitaPPPChangePct": 11.47,
      "popChangePct": -3.41
    },
    {
      "year": 1995,
      "gdpPPP": 6.462,
      "perCapitaPPP": 1990.0,
      "perCapitaPPPChangePct": 10.71,
      "popChangePct": -0.25
    },
    {
      "year": 1996,
      "gdpPPP": 6.968,
      "perCapitaPPP": 2149.1,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": -0.15
    },
    {
      "year": 1997,
      "gdpPPP": 7.318,
      "perCapitaPPP": 2262.0,
      "perCapitaPPPChangePct": 5.25,
      "popChangePct": -0.22
    },
    {
      "year": 1998,
      "gdpPPP": 7.939,
      "perCapitaPPP": 2458.1,
      "perCapitaPPPChangePct": 8.67,
      "popChangePct": -0.15
    },
    {
      "year": 1999,
      "gdpPPP": 8.323,
      "perCapitaPPP": 2584.0,
      "perCapitaPPPChangePct": 5.12,
      "popChangePct": -0.28
    },
    {
      "year": 2000,
      "gdpPPP": 8.986,
      "perCapitaPPP": 2797.8,
      "perCapitaPPPChangePct": 8.27,
      "popChangePct": -0.28
    },
    {
      "year": 2001,
      "gdpPPP": 10.07,
      "perCapitaPPP": 3147.2,
      "perCapitaPPPChangePct": 12.49,
      "popChangePct": -0.37
    },
    {
      "year": 2002,
      "gdpPPP": 11.735,
      "perCapitaPPP": 3687.5,
      "perCapitaPPPChangePct": 17.17,
      "popChangePct": -0.53
    },
    {
      "year": 2003,
      "gdpPPP": 13.647,
      "perCapitaPPP": 4312.1,
      "perCapitaPPPChangePct": 16.94,
      "popChangePct": -0.57
    },
    {
      "year": 2004,
      "gdpPPP": 15.465,
      "perCapitaPPP": 4915.3,
      "perCapitaPPPChangePct": 13.99,
      "popChangePct": -0.6
    },
    {
      "year": 2005,
      "gdpPPP": 18.152,
      "perCapitaPPP": 5804.9,
      "perCapitaPPPChangePct": 18.1,
      "popChangePct": -0.6
    },
    {
      "year": 2006,
      "gdpPPP": 21.182,
      "perCapitaPPP": 6816.7,
      "perCapitaPPPChangePct": 17.43,
      "popChangePct": -0.64
    },
    {
      "year": 2007,
      "gdpPPP": 24.747,
      "perCapitaPPP": 8016.4,
      "perCapitaPPPChangePct": 17.6,
      "popChangePct": -0.64
    },
    {
      "year": 2008,
      "gdpPPP": 26.976,
      "perCapitaPPP": 8798.5,
      "perCapitaPPPChangePct": 9.76,
      "popChangePct": -0.68
    },
    {
      "year": 2009,
      "gdpPPP": 23.302,
      "perCapitaPPP": 7672.6,
      "perCapitaPPPChangePct": -12.8,
      "popChangePct": -0.95
    },
    {
      "year": 2010,
      "gdpPPP": 24.104,
      "perCapitaPPP": 7981.1,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": -0.56
    },
    {
      "year": 2011,
      "gdpPPP": 25.757,
      "perCapitaPPP": 8517.3,
      "perCapitaPPPChangePct": 6.72,
      "popChangePct": 0.13
    },
    {
      "year": 2012,
      "gdpPPP": 28.109,
      "perCapitaPPP": 9301.4,
      "perCapitaPPPChangePct": 9.21,
      "popChangePct": -0.07
    },
    {
      "year": 2013,
      "gdpPPP": 29.563,
      "perCapitaPPP": 9809.0,
      "perCapitaPPPChangePct": 5.46,
      "popChangePct": -0.26
    },
    {
      "year": 2014,
      "gdpPPP": 31.162,
      "perCapitaPPP": 10371.6,
      "perCapitaPPPChangePct": 5.74,
      "popChangePct": -0.3
    },
    {
      "year": 2015,
      "gdpPPP": 32.475,
      "perCapitaPPP": 10852.5,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": -0.43
    },
    {
      "year": 2016,
      "gdpPPP": 32.848,
      "perCapitaPPP": 11024.7,
      "perCapitaPPPChangePct": 1.59,
      "popChangePct": -0.43
    },
    {
      "year": 2017,
      "gdpPPP": 35.949,
      "perCapitaPPP": 12108.3,
      "perCapitaPPPChangePct": 9.83,
      "popChangePct": -0.34
    },
    {
      "year": 2018,
      "gdpPPP": 38.233,
      "perCapitaPPP": 12905.7,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": -0.2
    },
    {
      "year": 2019,
      "gdpPPP": 44.366,
      "perCapitaPPP": 14980.8,
      "perCapitaPPPChangePct": 16.08,
      "popChangePct": -0.03
    },
    {
      "year": 2020,
      "gdpPPP": 43.553,
      "perCapitaPPP": 14702.1,
      "perCapitaPPPChangePct": -1.86,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 47.165,
      "perCapitaPPP": 15884.4,
      "perCapitaPPPChangePct": 8.04,
      "popChangePct": 0.24
    },
    {
      "year": 2022,
      "gdpPPP": 56.869,
      "perCapitaPPP": 19057.1,
      "perCapitaPPPChangePct": 19.97,
      "popChangePct": 0.51
    },
    {
      "year": 2023,
      "gdpPPP": 63.896,
      "perCapitaPPP": 21062.0,
      "perCapitaPPPChangePct": 10.52,
      "popChangePct": 1.68
    },
    {
      "year": 2024,
      "gdpPPP": 69.317,
      "perCapitaPPP": 22849.2,
      "perCapitaPPPChangePct": 8.49,
      "popChangePct": 0.0
    },
    {
      "year": 2025,
      "gdpPPP": 76.39,
      "perCapitaPPP": 24870.6,
      "perCapitaPPPChangePct": 8.85,
      "popChangePct": 1.22
    },
    {
      "year": 2026,
      "gdpPPP": 82.743,
      "perCapitaPPP": 27024.0,
      "perCapitaPPPChangePct": 8.66,
      "popChangePct": -0.29
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 89.169,
      "perCapitaPPP": 29219.2,
      "perCapitaPPPChangePct": 8.12,
      "popChangePct": -0.33
    },
    {
      "year": 2028,
      "gdpPPP": 95.12,
      "perCapitaPPP": 31277.0,
      "perCapitaPPPChangePct": 7.04,
      "popChangePct": -0.36
    },
    {
      "year": 2029,
      "gdpPPP": 101.604,
      "perCapitaPPP": 33528.9,
      "perCapitaPPPChangePct": 7.2,
      "popChangePct": -0.36
    },
    {
      "year": 2030,
      "gdpPPP": 108.594,
      "perCapitaPPP": 35967.5,
      "perCapitaPPPChangePct": 7.27,
      "popChangePct": -0.36
    },
    {
      "year": 2031,
      "gdpPPP": 116.028,
      "perCapitaPPP": 38574.1,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": -0.36
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ArmeniaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
