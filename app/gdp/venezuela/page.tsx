import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Venezuela",
  "slug": "venezuela",
  "iso3": "VEN",
  "region": "Americas",
  "rank2026": 78,
  "flagEmoji": "🇻🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Serbia",
      "slug": "serbia",
      "rank": 77
    },
    {
      "name": "Luxembourg",
      "slug": "luxembourg",
      "rank": 79
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 69.841,
      "growth": -4.9,
      "perCapita": 4671.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 78.367,
      "growth": -1.3,
      "perCapita": 5085.6,
      "popChangePct": 3.06
    },
    {
      "year": 1982,
      "gdp": 79.998,
      "growth": 2.6,
      "perCapita": 5041.6,
      "popChangePct": 2.97
    },
    {
      "year": 1983,
      "gdp": 79.672,
      "growth": -9.9,
      "perCapita": 4883.2,
      "popChangePct": 2.82
    },
    {
      "year": 1984,
      "gdp": 57.826,
      "growth": 5.2,
      "perCapita": 3447.4,
      "popChangePct": 2.8
    },
    {
      "year": 1985,
      "gdp": 59.865,
      "growth": 0.9,
      "perCapita": 3472.2,
      "popChangePct": 2.79
    },
    {
      "year": 1986,
      "gdp": 60.877,
      "growth": 6.1,
      "perCapita": 3488.6,
      "popChangePct": 1.21
    },
    {
      "year": 1987,
      "gdp": 46.854,
      "growth": 4.8,
      "perCapita": 2619.2,
      "popChangePct": 2.51
    },
    {
      "year": 1988,
      "gdp": 60.378,
      "growth": 6.5,
      "perCapita": 3292.8,
      "popChangePct": 2.5
    },
    {
      "year": 1989,
      "gdp": 44.672,
      "growth": -13.9,
      "perCapita": 2378.2,
      "popChangePct": 2.44
    },
    {
      "year": 1990,
      "gdp": 48.391,
      "growth": 6.5,
      "perCapita": 2492.9,
      "popChangePct": 3.34
    },
    {
      "year": 1991,
      "gdp": 53.382,
      "growth": 9.7,
      "perCapita": 2685.3,
      "popChangePct": 2.41
    },
    {
      "year": 1992,
      "gdp": 60.4,
      "growth": 6.1,
      "perCapita": 2968.5,
      "popChangePct": 2.35
    },
    {
      "year": 1993,
      "gdp": 59.865,
      "growth": 0.3,
      "perCapita": 2876.1,
      "popChangePct": 2.3
    },
    {
      "year": 1994,
      "gdp": 58.357,
      "growth": -2.3,
      "perCapita": 2742.0,
      "popChangePct": 2.25
    },
    {
      "year": 1995,
      "gdp": 77.427,
      "growth": 4,
      "perCapita": 3559.8,
      "popChangePct": 2.2
    },
    {
      "year": 1996,
      "gdp": 70.536,
      "growth": -0.2,
      "perCapita": 3174.6,
      "popChangePct": 2.15
    },
    {
      "year": 1997,
      "gdp": 85.684,
      "growth": 6.4,
      "perCapita": 3778.5,
      "popChangePct": 2.06
    },
    {
      "year": 1998,
      "gdp": 91.836,
      "growth": 0.3,
      "perCapita": 3970.4,
      "popChangePct": 2.0
    },
    {
      "year": 1999,
      "gdp": 97.517,
      "growth": -6,
      "perCapita": 4133.4,
      "popChangePct": 2.0
    },
    {
      "year": 2000,
      "gdp": 117.596,
      "growth": 3.7,
      "perCapita": 4820.6,
      "popChangePct": 3.4
    },
    {
      "year": 2001,
      "gdp": 123.119,
      "growth": 3.4,
      "perCapita": 4963.9,
      "popChangePct": 1.68
    },
    {
      "year": 2002,
      "gdp": 95.258,
      "growth": -8.9,
      "perCapita": 3778.3,
      "popChangePct": 1.65
    },
    {
      "year": 2003,
      "gdp": 83.684,
      "growth": -7.8,
      "perCapita": 3266.1,
      "popChangePct": 1.63
    },
    {
      "year": 2004,
      "gdp": 112.254,
      "growth": 18.3,
      "perCapita": 4312.0,
      "popChangePct": 1.6
    },
    {
      "year": 2005,
      "gdp": 143.375,
      "growth": 10.3,
      "perCapita": 5421.7,
      "popChangePct": 1.58
    },
    {
      "year": 2006,
      "gdp": 178.521,
      "growth": 9.9,
      "perCapita": 6646.8,
      "popChangePct": 1.56
    },
    {
      "year": 2007,
      "gdp": 232.857,
      "growth": 8.8,
      "perCapita": 8538.1,
      "popChangePct": 1.55
    },
    {
      "year": 2008,
      "gdp": 306.764,
      "growth": 5.3,
      "perCapita": 11079.1,
      "popChangePct": 1.53
    },
    {
      "year": 2009,
      "gdp": 268.624,
      "growth": -3.2,
      "perCapita": 9557.5,
      "popChangePct": 1.51
    },
    {
      "year": 2010,
      "gdp": 318.281,
      "growth": -1.5,
      "perCapita": 11158.2,
      "popChangePct": 1.49
    },
    {
      "year": 2011,
      "gdp": 316.482,
      "growth": 4.2,
      "perCapita": 10934.3,
      "popChangePct": 1.47
    },
    {
      "year": 2012,
      "gdp": 372.592,
      "growth": 5.6,
      "perCapita": 12688.1,
      "popChangePct": 1.45
    },
    {
      "year": 2013,
      "gdp": 258.932,
      "growth": 1.3,
      "perCapita": 8693.0,
      "popChangePct": 1.43
    },
    {
      "year": 2014,
      "gdp": 214.69,
      "growth": -3.9,
      "perCapita": 7107.4,
      "popChangePct": 1.41
    },
    {
      "year": 2015,
      "gdp": 125.449,
      "growth": -6.2,
      "perCapita": 4097.0,
      "popChangePct": 1.37
    },
    {
      "year": 2016,
      "gdp": 112.915,
      "growth": -17,
      "perCapita": 3676.4,
      "popChangePct": 0.31
    },
    {
      "year": 2017,
      "gdp": 115.882,
      "growth": -15.7,
      "perCapita": 3806.6,
      "popChangePct": -0.89
    },
    {
      "year": 2018,
      "gdp": 102.021,
      "growth": -19.7,
      "perCapita": 3529.7,
      "popChangePct": -5.06
    },
    {
      "year": 2019,
      "gdp": 73.014,
      "growth": -27.7,
      "perCapita": 2624.8,
      "popChangePct": -3.76
    },
    {
      "year": 2020,
      "gdp": 42.838,
      "growth": -30,
      "perCapita": 1532.6,
      "popChangePct": 0.48
    },
    {
      "year": 2021,
      "gdp": 56.615,
      "growth": 1,
      "perCapita": 2052.3,
      "popChangePct": -1.31
    },
    {
      "year": 2022,
      "gdp": 89.013,
      "growth": 8,
      "perCapita": 3306.9,
      "popChangePct": -2.43
    },
    {
      "year": 2023,
      "gdp": 102.378,
      "growth": 4,
      "perCapita": 3828.6,
      "popChangePct": -0.66
    },
    {
      "year": 2024,
      "gdp": 120.566,
      "growth": 5.3,
      "perCapita": 4539.2,
      "popChangePct": -0.67
    },
    {
      "year": 2025,
      "gdp": 99.661,
      "growth": 1.5,
      "perCapita": 3736.3,
      "popChangePct": 0.43
    },
    {
      "year": 2026,
      "gdp": 111.303,
      "growth": 4,
      "perCapita": 4139.7,
      "popChangePct": 0.8
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 117.908,
      "growth": 6,
      "perCapita": 4350.5,
      "popChangePct": 0.8
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 118.832,
      "perCapitaPPP": 7947.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 128.399,
      "perCapitaPPP": 8332.4,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 3.06
    },
    {
      "year": 1982,
      "gdpPPP": 139.939,
      "perCapitaPPP": 8819.2,
      "perCapitaPPPChangePct": 5.84,
      "popChangePct": 2.97
    },
    {
      "year": 1983,
      "gdpPPP": 131.087,
      "perCapitaPPP": 8034.5,
      "perCapitaPPPChangePct": -8.9,
      "popChangePct": 2.82
    },
    {
      "year": 1984,
      "gdpPPP": 142.912,
      "perCapitaPPP": 8520.1,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": 2.8
    },
    {
      "year": 1985,
      "gdpPPP": 148.71,
      "perCapitaPPP": 8625.2,
      "perCapitaPPPChangePct": 1.23,
      "popChangePct": 2.79
    },
    {
      "year": 1986,
      "gdpPPP": 160.927,
      "perCapitaPPP": 9222.0,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 1.21
    },
    {
      "year": 1987,
      "gdpPPP": 172.833,
      "perCapitaPPP": 9661.8,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 2.51
    },
    {
      "year": 1988,
      "gdpPPP": 190.577,
      "perCapitaPPP": 10393.4,
      "perCapitaPPPChangePct": 7.57,
      "popChangePct": 2.5
    },
    {
      "year": 1989,
      "gdpPPP": 170.482,
      "perCapitaPPP": 9075.8,
      "perCapitaPPPChangePct": -12.68,
      "popChangePct": 2.44
    },
    {
      "year": 1990,
      "gdpPPP": 188.301,
      "perCapitaPPP": 9700.6,
      "perCapitaPPPChangePct": 6.88,
      "popChangePct": 3.34
    },
    {
      "year": 1991,
      "gdpPPP": 213.612,
      "perCapitaPPP": 10745.5,
      "perCapitaPPPChangePct": 10.77,
      "popChangePct": 2.41
    },
    {
      "year": 1992,
      "gdpPPP": 231.72,
      "perCapitaPPP": 11388.4,
      "perCapitaPPPChangePct": 5.98,
      "popChangePct": 2.35
    },
    {
      "year": 1993,
      "gdpPPP": 237.866,
      "perCapitaPPP": 11427.6,
      "perCapitaPPPChangePct": 0.34,
      "popChangePct": 2.3
    },
    {
      "year": 1994,
      "gdpPPP": 237.238,
      "perCapitaPPP": 11146.9,
      "perCapitaPPPChangePct": -2.46,
      "popChangePct": 2.25
    },
    {
      "year": 1995,
      "gdpPPP": 251.782,
      "perCapitaPPP": 11575.8,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 2.2
    },
    {
      "year": 1996,
      "gdpPPP": 255.885,
      "perCapitaPPP": 11516.7,
      "perCapitaPPPChangePct": -0.51,
      "popChangePct": 2.15
    },
    {
      "year": 1997,
      "gdpPPP": 276.881,
      "perCapitaPPP": 12210.0,
      "perCapitaPPPChangePct": 6.02,
      "popChangePct": 2.06
    },
    {
      "year": 1998,
      "gdpPPP": 280.816,
      "perCapitaPPP": 12140.8,
      "perCapitaPPPChangePct": -0.57,
      "popChangePct": 2.0
    },
    {
      "year": 1999,
      "gdpPPP": 267.786,
      "perCapitaPPP": 11350.4,
      "perCapitaPPPChangePct": -6.51,
      "popChangePct": 2.0
    },
    {
      "year": 2000,
      "gdpPPP": 283.949,
      "perCapitaPPP": 11640.1,
      "perCapitaPPPChangePct": 2.55,
      "popChangePct": 3.4
    },
    {
      "year": 2001,
      "gdpPPP": 300.198,
      "perCapitaPPP": 12103.3,
      "perCapitaPPPChangePct": 3.98,
      "popChangePct": 1.68
    },
    {
      "year": 2002,
      "gdpPPP": 277.865,
      "perCapitaPPP": 11021.1,
      "perCapitaPPPChangePct": -8.94,
      "popChangePct": 1.65
    },
    {
      "year": 2003,
      "gdpPPP": 261.376,
      "perCapitaPPP": 10201.2,
      "perCapitaPPPChangePct": -7.44,
      "popChangePct": 1.63
    },
    {
      "year": 2004,
      "gdpPPP": 317.486,
      "perCapitaPPP": 12195.6,
      "perCapitaPPPChangePct": 19.55,
      "popChangePct": 1.6
    },
    {
      "year": 2005,
      "gdpPPP": 361.227,
      "perCapitaPPP": 13659.6,
      "perCapitaPPPChangePct": 12.0,
      "popChangePct": 1.58
    },
    {
      "year": 2006,
      "gdpPPP": 409.128,
      "perCapitaPPP": 15232.9,
      "perCapitaPPPChangePct": 11.52,
      "popChangePct": 1.56
    },
    {
      "year": 2007,
      "gdpPPP": 456.996,
      "perCapitaPPP": 16756.5,
      "perCapitaPPPChangePct": 10.0,
      "popChangePct": 1.55
    },
    {
      "year": 2008,
      "gdpPPP": 490.383,
      "perCapitaPPP": 17710.6,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 1.53
    },
    {
      "year": 2009,
      "gdpPPP": 477.607,
      "perCapitaPPP": 16993.1,
      "perCapitaPPPChangePct": -4.05,
      "popChangePct": 1.51
    },
    {
      "year": 2010,
      "gdpPPP": 476.215,
      "perCapitaPPP": 16695.0,
      "perCapitaPPPChangePct": -1.75,
      "popChangePct": 1.49
    },
    {
      "year": 2011,
      "gdpPPP": 506.34,
      "perCapitaPPP": 17493.7,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": 1.47
    },
    {
      "year": 2012,
      "gdpPPP": 544.784,
      "perCapitaPPP": 18551.9,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 1.45
    },
    {
      "year": 2013,
      "gdpPPP": 561.498,
      "perCapitaPPP": 18850.9,
      "perCapitaPPPChangePct": 1.61,
      "popChangePct": 1.43
    },
    {
      "year": 2014,
      "gdpPPP": 549.03,
      "perCapitaPPP": 18176.0,
      "perCapitaPPPChangePct": -3.58,
      "popChangePct": 1.41
    },
    {
      "year": 2015,
      "gdpPPP": 519.651,
      "perCapitaPPP": 16971.0,
      "perCapitaPPPChangePct": -6.63,
      "popChangePct": 1.37
    },
    {
      "year": 2016,
      "gdpPPP": 435.197,
      "perCapitaPPP": 14169.5,
      "perCapitaPPPChangePct": -16.51,
      "popChangePct": 0.31
    },
    {
      "year": 2017,
      "gdpPPP": 373.568,
      "perCapitaPPP": 12271.4,
      "perCapitaPPPChangePct": -13.4,
      "popChangePct": -0.89
    },
    {
      "year": 2018,
      "gdpPPP": 307.018,
      "perCapitaPPP": 10622.2,
      "perCapitaPPPChangePct": -13.44,
      "popChangePct": -5.06
    },
    {
      "year": 2019,
      "gdpPPP": 225.769,
      "perCapitaPPP": 8116.2,
      "perCapitaPPPChangePct": -23.59,
      "popChangePct": -3.76
    },
    {
      "year": 2020,
      "gdpPPP": 160.167,
      "perCapitaPPP": 5730.3,
      "perCapitaPPPChangePct": -29.4,
      "popChangePct": 0.48
    },
    {
      "year": 2021,
      "gdpPPP": 169.075,
      "perCapitaPPP": 6129.0,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": -1.31
    },
    {
      "year": 2022,
      "gdpPPP": 195.59,
      "perCapitaPPP": 7266.3,
      "perCapitaPPPChangePct": 18.56,
      "popChangePct": -2.43
    },
    {
      "year": 2023,
      "gdpPPP": 210.944,
      "perCapitaPPP": 7888.6,
      "perCapitaPPPChangePct": 8.56,
      "popChangePct": -0.66
    },
    {
      "year": 2024,
      "gdpPPP": 227.633,
      "perCapitaPPP": 8570.1,
      "perCapitaPPPChangePct": 8.64,
      "popChangePct": -0.67
    },
    {
      "year": 2025,
      "gdpPPP": 237.679,
      "perCapitaPPP": 8910.6,
      "perCapitaPPPChangePct": 3.97,
      "popChangePct": 0.43
    },
    {
      "year": 2026,
      "gdpPPP": 254.372,
      "perCapitaPPP": 9460.7,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 0.8
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 275.548,
      "perCapitaPPP": 10167.0,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": 0.8
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function VenezuelaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
