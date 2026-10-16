import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "South Africa",
  "slug": "south-africa",
  "iso3": "ZAF",
  "region": "Africa",
  "rank2026": 40,
  "flagEmoji": "🇿🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Romania",
      "slug": "romania",
      "rank": 39
    },
    {
      "name": "Hong Kong",
      "slug": "hong-kong",
      "rank": 41
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 89.412,
      "growth": 6.6,
      "perCapita": 3074.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 93.15,
      "growth": 5.4,
      "perCapita": 3122.7,
      "popChangePct": 2.58
    },
    {
      "year": 1982,
      "gdp": 85.897,
      "growth": -0.4,
      "perCapita": 2806.2,
      "popChangePct": 2.61
    },
    {
      "year": 1983,
      "gdp": 96.205,
      "growth": -1.8,
      "perCapita": 3062.9,
      "popChangePct": 2.61
    },
    {
      "year": 1984,
      "gdp": 84.838,
      "growth": 5.1,
      "perCapita": 2633.9,
      "popChangePct": 2.55
    },
    {
      "year": 1985,
      "gdp": 64.481,
      "growth": -1.2,
      "perCapita": 1955.2,
      "popChangePct": 2.39
    },
    {
      "year": 1986,
      "gdp": 73.399,
      "growth": 0,
      "perCapita": 2176.1,
      "popChangePct": 2.27
    },
    {
      "year": 1987,
      "gdp": 96.533,
      "growth": 2.1,
      "perCapita": 2801.3,
      "popChangePct": 2.16
    },
    {
      "year": 1988,
      "gdp": 104.01,
      "growth": 4.2,
      "perCapita": 2954.8,
      "popChangePct": 2.15
    },
    {
      "year": 1989,
      "gdp": 108.07,
      "growth": 2.4,
      "perCapita": 3004.4,
      "popChangePct": 2.19
    },
    {
      "year": 1990,
      "gdp": 126.027,
      "growth": -0.3,
      "perCapita": 3425.6,
      "popChangePct": 2.28
    },
    {
      "year": 1991,
      "gdp": 135.227,
      "growth": -1,
      "perCapita": 3587.9,
      "popChangePct": 2.45
    },
    {
      "year": 1992,
      "gdp": 146.97,
      "growth": -2.1,
      "perCapita": 3802.6,
      "popChangePct": 2.55
    },
    {
      "year": 1993,
      "gdp": 147.236,
      "growth": 1.2,
      "perCapita": 3716.2,
      "popChangePct": 2.51
    },
    {
      "year": 1994,
      "gdp": 153.569,
      "growth": 3.2,
      "perCapita": 3786.2,
      "popChangePct": 2.37
    },
    {
      "year": 1995,
      "gdp": 171.736,
      "growth": 3.1,
      "perCapita": 4145.2,
      "popChangePct": 2.14
    },
    {
      "year": 1996,
      "gdp": 163.34,
      "growth": 4.3,
      "perCapita": 3869.7,
      "popChangePct": 1.88
    },
    {
      "year": 1997,
      "gdp": 169.004,
      "growth": 2.6,
      "perCapita": 3937.7,
      "popChangePct": 1.68
    },
    {
      "year": 1998,
      "gdp": 152.885,
      "growth": 0.5,
      "perCapita": 3508.1,
      "popChangePct": 1.54
    },
    {
      "year": 1999,
      "gdp": 151.426,
      "growth": 2.4,
      "perCapita": 3423.6,
      "popChangePct": 1.49
    },
    {
      "year": 2000,
      "gdp": 151.855,
      "growth": 4.2,
      "perCapita": 3382.1,
      "popChangePct": 1.51
    },
    {
      "year": 2001,
      "gdp": 135.527,
      "growth": 2.7,
      "perCapita": 2964.0,
      "popChangePct": 1.84
    },
    {
      "year": 2002,
      "gdp": 129.385,
      "growth": 3.7,
      "perCapita": 2778.1,
      "popChangePct": 1.86
    },
    {
      "year": 2003,
      "gdp": 197.017,
      "growth": 2.9,
      "perCapita": 4191.4,
      "popChangePct": 0.93
    },
    {
      "year": 2004,
      "gdp": 256.188,
      "growth": 4.6,
      "perCapita": 5392.9,
      "popChangePct": 1.06
    },
    {
      "year": 2005,
      "gdp": 288.749,
      "growth": 5.3,
      "perCapita": 6008.0,
      "popChangePct": 1.17
    },
    {
      "year": 2006,
      "gdp": 304.055,
      "growth": 5.6,
      "perCapita": 6250.9,
      "popChangePct": 1.21
    },
    {
      "year": 2007,
      "gdp": 332.65,
      "growth": 5.4,
      "perCapita": 6737.4,
      "popChangePct": 1.5
    },
    {
      "year": 2008,
      "gdp": 316.491,
      "growth": 3.2,
      "perCapita": 6321.2,
      "popChangePct": 1.41
    },
    {
      "year": 2009,
      "gdp": 331.184,
      "growth": -1.5,
      "perCapita": 6521.5,
      "popChangePct": 1.43
    },
    {
      "year": 2010,
      "gdp": 417.315,
      "growth": 3,
      "perCapita": 8102.0,
      "popChangePct": 1.43
    },
    {
      "year": 2011,
      "gdp": 458.708,
      "growth": 3.2,
      "perCapita": 8773.2,
      "popChangePct": 1.51
    },
    {
      "year": 2012,
      "gdp": 434.4,
      "growth": 2.4,
      "perCapita": 8176.8,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdp": 400.877,
      "growth": 2.5,
      "perCapita": 7429.0,
      "popChangePct": 1.57
    },
    {
      "year": 2014,
      "gdp": 381.195,
      "growth": 1.4,
      "perCapita": 6951.4,
      "popChangePct": 1.62
    },
    {
      "year": 2015,
      "gdp": 346.663,
      "growth": 1.3,
      "perCapita": 6227.2,
      "popChangePct": 1.52
    },
    {
      "year": 2016,
      "gdp": 323.493,
      "growth": 0.7,
      "perCapita": 5732.0,
      "popChangePct": 1.38
    },
    {
      "year": 2017,
      "gdp": 381.317,
      "growth": 1.2,
      "perCapita": 6665.1,
      "popChangePct": 1.37
    },
    {
      "year": 2018,
      "gdp": 405.093,
      "growth": 1.6,
      "perCapita": 6979.7,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdp": 389.245,
      "growth": 0.3,
      "perCapita": 6609.7,
      "popChangePct": 1.47
    },
    {
      "year": 2020,
      "gdp": 337.876,
      "growth": -6.2,
      "perCapita": 5660.1,
      "popChangePct": 1.37
    },
    {
      "year": 2021,
      "gdp": 419.878,
      "growth": 4.9,
      "perCapita": 6970.7,
      "popChangePct": 0.91
    },
    {
      "year": 2022,
      "gdp": 407.43,
      "growth": 2.1,
      "perCapita": 6693.8,
      "popChangePct": 1.05
    },
    {
      "year": 2023,
      "gdp": 381.334,
      "growth": 0.8,
      "perCapita": 6192.7,
      "popChangePct": 1.17
    },
    {
      "year": 2024,
      "gdp": 401.076,
      "growth": 0.5,
      "perCapita": 6434.9,
      "popChangePct": 1.22
    },
    {
      "year": 2025,
      "gdp": 427.141,
      "growth": 1.1,
      "perCapita": 6769.2,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdp": 479.964,
      "growth": 1,
      "perCapita": 7503.0,
      "popChangePct": 1.38
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 494.409,
      "growth": 1.3,
      "perCapita": 7623.8,
      "popChangePct": 1.38
    },
    {
      "year": 2028,
      "gdp": 513.063,
      "growth": 1.5,
      "perCapita": 7804.0,
      "popChangePct": 1.38
    },
    {
      "year": 2029,
      "gdp": 533.314,
      "growth": 1.7,
      "perCapita": 8001.8,
      "popChangePct": 1.38
    },
    {
      "year": 2030,
      "gdp": 555.264,
      "growth": 1.8,
      "perCapita": 8218.0,
      "popChangePct": 1.38
    },
    {
      "year": 2031,
      "gdp": 577.966,
      "growth": 1.8,
      "perCapita": 8437.8,
      "popChangePct": 1.38
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 140.741,
      "perCapitaPPP": 4839.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 162.316,
      "perCapitaPPP": 5441.4,
      "perCapitaPPPChangePct": 12.43,
      "popChangePct": 2.58
    },
    {
      "year": 1982,
      "gdpPPP": 171.685,
      "perCapitaPPP": 5608.8,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 2.61
    },
    {
      "year": 1983,
      "gdpPPP": 175.114,
      "perCapitaPPP": 5575.1,
      "perCapitaPPPChangePct": -0.6,
      "popChangePct": 2.61
    },
    {
      "year": 1984,
      "gdpPPP": 190.686,
      "perCapitaPPP": 5920.1,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 2.55
    },
    {
      "year": 1985,
      "gdpPPP": 194.332,
      "perCapitaPPP": 5892.4,
      "perCapitaPPPChangePct": -0.47,
      "popChangePct": 2.39
    },
    {
      "year": 1986,
      "gdpPPP": 198.28,
      "perCapitaPPP": 5878.4,
      "perCapitaPPPChangePct": -0.24,
      "popChangePct": 2.27
    },
    {
      "year": 1987,
      "gdpPPP": 207.462,
      "perCapitaPPP": 6020.4,
      "perCapitaPPPChangePct": 2.41,
      "popChangePct": 2.16
    },
    {
      "year": 1988,
      "gdpPPP": 223.799,
      "perCapitaPPP": 6357.9,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": 2.15
    },
    {
      "year": 1989,
      "gdpPPP": 238.145,
      "perCapitaPPP": 6620.7,
      "perCapitaPPPChangePct": 4.13,
      "popChangePct": 2.19
    },
    {
      "year": 1990,
      "gdpPPP": 246.272,
      "perCapitaPPP": 6694.0,
      "perCapitaPPPChangePct": 1.11,
      "popChangePct": 2.28
    },
    {
      "year": 1991,
      "gdpPPP": 252.01,
      "perCapitaPPP": 6686.4,
      "perCapitaPPPChangePct": -0.11,
      "popChangePct": 2.45
    },
    {
      "year": 1992,
      "gdpPPP": 252.245,
      "perCapitaPPP": 6526.4,
      "perCapitaPPPChangePct": -2.39,
      "popChangePct": 2.55
    },
    {
      "year": 1993,
      "gdpPPP": 261.409,
      "perCapitaPPP": 6597.9,
      "perCapitaPPPChangePct": 1.1,
      "popChangePct": 2.51
    },
    {
      "year": 1994,
      "gdpPPP": 275.535,
      "perCapitaPPP": 6793.3,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": 2.37
    },
    {
      "year": 1995,
      "gdpPPP": 290.031,
      "perCapitaPPP": 7000.5,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 2.14
    },
    {
      "year": 1996,
      "gdpPPP": 308.041,
      "perCapitaPPP": 7297.8,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 1.88
    },
    {
      "year": 1997,
      "gdpPPP": 321.5,
      "perCapitaPPP": 7490.7,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 1.68
    },
    {
      "year": 1998,
      "gdpPPP": 326.74,
      "perCapitaPPP": 7497.5,
      "perCapitaPPPChangePct": 0.09,
      "popChangePct": 1.54
    },
    {
      "year": 1999,
      "gdpPPP": 339.316,
      "perCapitaPPP": 7671.6,
      "perCapitaPPPChangePct": 2.32,
      "popChangePct": 1.49
    },
    {
      "year": 2000,
      "gdpPPP": 361.576,
      "perCapitaPPP": 8052.9,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 1.51
    },
    {
      "year": 2001,
      "gdpPPP": 379.7,
      "perCapitaPPP": 8304.2,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": 1.84
    },
    {
      "year": 2002,
      "gdpPPP": 399.869,
      "perCapitaPPP": 8585.9,
      "perCapitaPPPChangePct": 3.39,
      "popChangePct": 1.86
    },
    {
      "year": 2003,
      "gdpPPP": 419.789,
      "perCapitaPPP": 8930.7,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 0.93
    },
    {
      "year": 2004,
      "gdpPPP": 450.71,
      "perCapitaPPP": 9487.6,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 1.06
    },
    {
      "year": 2005,
      "gdpPPP": 489.373,
      "perCapitaPPP": 10182.3,
      "perCapitaPPPChangePct": 7.32,
      "popChangePct": 1.17
    },
    {
      "year": 2006,
      "gdpPPP": 532.734,
      "perCapitaPPP": 10952.1,
      "perCapitaPPPChangePct": 7.56,
      "popChangePct": 1.21
    },
    {
      "year": 2007,
      "gdpPPP": 576.498,
      "perCapitaPPP": 11676.3,
      "perCapitaPPPChangePct": 6.61,
      "popChangePct": 1.5
    },
    {
      "year": 2008,
      "gdpPPP": 606.355,
      "perCapitaPPP": 12110.5,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 1.41
    },
    {
      "year": 2009,
      "gdpPPP": 600.711,
      "perCapitaPPP": 11828.9,
      "perCapitaPPPChangePct": -2.32,
      "popChangePct": 1.43
    },
    {
      "year": 2010,
      "gdpPPP": 626.493,
      "perCapitaPPP": 12163.1,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 1.43
    },
    {
      "year": 2011,
      "gdpPPP": 659.68,
      "perCapitaPPP": 12616.9,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 1.51
    },
    {
      "year": 2012,
      "gdpPPP": 688.064,
      "perCapitaPPP": 12951.7,
      "perCapitaPPPChangePct": 2.65,
      "popChangePct": 1.61
    },
    {
      "year": 2013,
      "gdpPPP": 717.168,
      "perCapitaPPP": 13290.5,
      "perCapitaPPPChangePct": 2.62,
      "popChangePct": 1.57
    },
    {
      "year": 2014,
      "gdpPPP": 739.975,
      "perCapitaPPP": 13494.1,
      "perCapitaPPPChangePct": 1.53,
      "popChangePct": 1.62
    },
    {
      "year": 2015,
      "gdpPPP": 756.715,
      "perCapitaPPP": 13593.0,
      "perCapitaPPPChangePct": 0.73,
      "popChangePct": 1.52
    },
    {
      "year": 2016,
      "gdpPPP": 768.982,
      "perCapitaPPP": 13625.7,
      "perCapitaPPPChangePct": 0.24,
      "popChangePct": 1.38
    },
    {
      "year": 2017,
      "gdpPPP": 791.817,
      "perCapitaPPP": 13840.4,
      "perCapitaPPPChangePct": 1.58,
      "popChangePct": 1.37
    },
    {
      "year": 2018,
      "gdpPPP": 782.329,
      "perCapitaPPP": 13479.4,
      "perCapitaPPPChangePct": -2.61,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdpPPP": 796.183,
      "perCapitaPPP": 13519.9,
      "perCapitaPPPChangePct": 0.3,
      "popChangePct": 1.47
    },
    {
      "year": 2020,
      "gdpPPP": 767.391,
      "perCapitaPPP": 12855.4,
      "perCapitaPPPChangePct": -4.92,
      "popChangePct": 1.37
    },
    {
      "year": 2021,
      "gdpPPP": 841.476,
      "perCapitaPPP": 13969.9,
      "perCapitaPPPChangePct": 8.67,
      "popChangePct": 0.91
    },
    {
      "year": 2022,
      "gdpPPP": 919.876,
      "perCapitaPPP": 15112.9,
      "perCapitaPPPChangePct": 8.18,
      "popChangePct": 1.05
    },
    {
      "year": 2023,
      "gdpPPP": 961.601,
      "perCapitaPPP": 15615.9,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 1.17
    },
    {
      "year": 2024,
      "gdpPPP": 990.744,
      "perCapitaPPP": 15895.5,
      "perCapitaPPPChangePct": 1.79,
      "popChangePct": 1.22
    },
    {
      "year": 2025,
      "gdpPPP": 1030.205,
      "perCapitaPPP": 16326.3,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 1.24
    },
    {
      "year": 2026,
      "gdpPPP": 1070.835,
      "perCapitaPPP": 16739.7,
      "perCapitaPPPChangePct": 2.53,
      "popChangePct": 1.38
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1108.029,
      "perCapitaPPP": 17085.8,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 1.38
    },
    {
      "year": 2028,
      "gdpPPP": 1143.661,
      "perCapitaPPP": 17395.7,
      "perCapitaPPPChangePct": 1.81,
      "popChangePct": 1.38
    },
    {
      "year": 2029,
      "gdpPPP": 1183.436,
      "perCapitaPPP": 17756.2,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 1.38
    },
    {
      "year": 2030,
      "gdpPPP": 1227.237,
      "perCapitaPPP": 18163.3,
      "perCapitaPPPChangePct": 2.29,
      "popChangePct": 1.38
    },
    {
      "year": 2031,
      "gdpPPP": 1271.977,
      "perCapitaPPP": 18569.7,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 1.38
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SouthAfricaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
