import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Central African Republic",
  "slug": "central-african-republic",
  "iso3": "CAF",
  "region": "Africa",
  "rank2026": 180,
  "flagEmoji": "🇨🇫",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Bhutan",
      "slug": "bhutan",
      "rank": 179
    },
    {
      "name": "Belize",
      "slug": "belize",
      "rank": 181
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.714,
      "growth": -3,
      "perCapita": 324.0,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.743,
      "growth": 13,
      "perCapita": 327.2,
      "popChangePct": 2.99
    },
    {
      "year": 1982,
      "gdp": 0.719,
      "growth": -3.6,
      "perCapita": 308.8,
      "popChangePct": 2.55
    },
    {
      "year": 1983,
      "gdp": 0.69,
      "growth": -6,
      "perCapita": 289.2,
      "popChangePct": 2.45
    },
    {
      "year": 1984,
      "gdp": 0.67,
      "growth": 9.9,
      "perCapita": 274.4,
      "popChangePct": 2.39
    },
    {
      "year": 1985,
      "gdp": 0.883,
      "growth": 3.7,
      "perCapita": 351.7,
      "popChangePct": 2.74
    },
    {
      "year": 1986,
      "gdp": 1.158,
      "growth": 7.2,
      "perCapita": 445.9,
      "popChangePct": 3.47
    },
    {
      "year": 1987,
      "gdp": 1.291,
      "growth": 0,
      "perCapita": 487.0,
      "popChangePct": 2.08
    },
    {
      "year": 1988,
      "gdp": 1.379,
      "growth": 1.7,
      "perCapita": 513.3,
      "popChangePct": 1.36
    },
    {
      "year": 1989,
      "gdp": 1.372,
      "growth": 3.8,
      "perCapita": 500.8,
      "popChangePct": 2.01
    },
    {
      "year": 1990,
      "gdp": 1.605,
      "growth": 1.4,
      "perCapita": 567.6,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdp": 1.528,
      "growth": -0.8,
      "perCapita": 523.9,
      "popChangePct": 3.18
    },
    {
      "year": 1992,
      "gdp": 1.527,
      "growth": -4.9,
      "perCapita": 507.5,
      "popChangePct": 3.19
    },
    {
      "year": 1993,
      "gdp": 1.331,
      "growth": -1.2,
      "perCapita": 428.3,
      "popChangePct": 3.26
    },
    {
      "year": 1994,
      "gdp": 0.87,
      "growth": 12.6,
      "perCapita": 271.2,
      "popChangePct": 3.22
    },
    {
      "year": 1995,
      "gdp": 1.133,
      "growth": 3.2,
      "perCapita": 342.4,
      "popChangePct": 3.12
    },
    {
      "year": 1996,
      "gdp": 1.018,
      "growth": -6.2,
      "perCapita": 300.4,
      "popChangePct": 2.42
    },
    {
      "year": 1997,
      "gdp": 0.977,
      "growth": 4.1,
      "perCapita": 280.5,
      "popChangePct": 2.83
    },
    {
      "year": 1998,
      "gdp": 1.03,
      "growth": 3.3,
      "perCapita": 287.7,
      "popChangePct": 2.73
    },
    {
      "year": 1999,
      "gdp": 1.039,
      "growth": 2.9,
      "perCapita": 282.4,
      "popChangePct": 2.77
    },
    {
      "year": 2000,
      "gdp": 0.868,
      "growth": -3.6,
      "perCapita": 229.5,
      "popChangePct": 2.8
    },
    {
      "year": 2001,
      "gdp": 0.9,
      "growth": 2.6,
      "perCapita": 231.6,
      "popChangePct": 2.78
    },
    {
      "year": 2002,
      "gdp": 0.987,
      "growth": 2.1,
      "perCapita": 249.6,
      "popChangePct": 1.72
    },
    {
      "year": 2003,
      "gdp": 1.191,
      "growth": -2.2,
      "perCapita": 293.3,
      "popChangePct": 2.68
    },
    {
      "year": 2004,
      "gdp": 1.312,
      "growth": -0.1,
      "perCapita": 316.3,
      "popChangePct": 2.17
    },
    {
      "year": 2005,
      "gdp": 1.414,
      "growth": 2.9,
      "perCapita": 333.6,
      "popChangePct": 2.22
    },
    {
      "year": 2006,
      "gdp": 1.539,
      "growth": 4.8,
      "perCapita": 354.7,
      "popChangePct": 2.36
    },
    {
      "year": 2007,
      "gdp": 1.757,
      "growth": 4,
      "perCapita": 397.9,
      "popChangePct": 1.77
    },
    {
      "year": 2008,
      "gdp": 2.041,
      "growth": 2.6,
      "perCapita": 452.7,
      "popChangePct": 2.11
    },
    {
      "year": 2009,
      "gdp": 2.065,
      "growth": 2.8,
      "perCapita": 448.1,
      "popChangePct": 2.22
    },
    {
      "year": 2010,
      "gdp": 2.144,
      "growth": 4.6,
      "perCapita": 482.0,
      "popChangePct": -3.47
    },
    {
      "year": 2011,
      "gdp": 2.438,
      "growth": 4.2,
      "perCapita": 537.3,
      "popChangePct": 1.98
    },
    {
      "year": 2012,
      "gdp": 2.512,
      "growth": 5.1,
      "perCapita": 546.8,
      "popChangePct": 1.23
    },
    {
      "year": 2013,
      "gdp": 1.692,
      "growth": -36.4,
      "perCapita": 365.5,
      "popChangePct": 0.76
    },
    {
      "year": 2014,
      "gdp": 2.051,
      "growth": 0.1,
      "perCapita": 440.4,
      "popChangePct": 0.61
    },
    {
      "year": 2015,
      "gdp": 1.866,
      "growth": 4.3,
      "perCapita": 406.4,
      "popChangePct": -1.42
    },
    {
      "year": 2016,
      "gdp": 1.995,
      "growth": 4.7,
      "perCapita": 427.3,
      "popChangePct": 1.72
    },
    {
      "year": 2017,
      "gdp": 2.198,
      "growth": 4.5,
      "perCapita": 461.9,
      "popChangePct": 1.93
    },
    {
      "year": 2018,
      "gdp": 2.383,
      "growth": 3.2,
      "perCapita": 493.5,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdp": 2.444,
      "growth": 4,
      "perCapita": 495.9,
      "popChangePct": 2.09
    },
    {
      "year": 2020,
      "gdp": 2.503,
      "growth": 0.9,
      "perCapita": 504.7,
      "popChangePct": 0.65
    },
    {
      "year": 2021,
      "gdp": 2.711,
      "growth": 0.1,
      "perCapita": 532.3,
      "popChangePct": 2.66
    },
    {
      "year": 2022,
      "gdp": 2.565,
      "growth": 0.8,
      "perCapita": 499.8,
      "popChangePct": 0.75
    },
    {
      "year": 2023,
      "gdp": 2.722,
      "growth": 0.1,
      "perCapita": 537.5,
      "popChangePct": -1.29
    },
    {
      "year": 2024,
      "gdp": 2.868,
      "growth": 3.1,
      "perCapita": 538.0,
      "popChangePct": 5.25
    },
    {
      "year": 2025,
      "gdp": 3.192,
      "growth": 4.8,
      "perCapita": 579.0,
      "popChangePct": 3.41
    },
    {
      "year": 2026,
      "gdp": 3.492,
      "growth": 2.6,
      "perCapita": 612.8,
      "popChangePct": 3.37
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 3.698,
      "growth": 3,
      "perCapita": 628.0,
      "popChangePct": 3.32
    },
    {
      "year": 2028,
      "gdp": 3.922,
      "growth": 3.2,
      "perCapita": 644.8,
      "popChangePct": 3.29
    },
    {
      "year": 2029,
      "gdp": 4.191,
      "growth": 3.5,
      "perCapita": 667.5,
      "popChangePct": 3.26
    },
    {
      "year": 2030,
      "gdp": 4.477,
      "growth": 3.5,
      "perCapita": 691.1,
      "popChangePct": 3.15
    },
    {
      "year": 2031,
      "gdp": 4.783,
      "growth": 3.5,
      "perCapita": 716.0,
      "popChangePct": 3.12
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.21,
      "perCapitaPPP": 548.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 1.496,
      "perCapitaPPP": 658.4,
      "perCapitaPPPChangePct": 20.0,
      "popChangePct": 2.99
    },
    {
      "year": 1982,
      "gdpPPP": 1.531,
      "perCapitaPPP": 657.6,
      "perCapitaPPPChangePct": -0.13,
      "popChangePct": 2.55
    },
    {
      "year": 1983,
      "gdpPPP": 1.495,
      "perCapitaPPP": 626.7,
      "perCapitaPPPChangePct": -4.69,
      "popChangePct": 2.45
    },
    {
      "year": 1984,
      "gdpPPP": 1.703,
      "perCapitaPPP": 697.0,
      "perCapitaPPPChangePct": 11.21,
      "popChangePct": 2.39
    },
    {
      "year": 1985,
      "gdpPPP": 1.822,
      "perCapitaPPP": 726.0,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 2.74
    },
    {
      "year": 1986,
      "gdpPPP": 1.993,
      "perCapitaPPP": 767.5,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 3.47
    },
    {
      "year": 1987,
      "gdpPPP": 2.042,
      "perCapitaPPP": 770.3,
      "perCapitaPPPChangePct": 0.37,
      "popChangePct": 2.08
    },
    {
      "year": 1988,
      "gdpPPP": 2.151,
      "perCapitaPPP": 800.3,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.36
    },
    {
      "year": 1989,
      "gdpPPP": 2.32,
      "perCapitaPPP": 846.3,
      "perCapitaPPPChangePct": 5.75,
      "popChangePct": 2.01
    },
    {
      "year": 1990,
      "gdpPPP": 2.439,
      "perCapitaPPP": 862.8,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 3.14
    },
    {
      "year": 1991,
      "gdpPPP": 2.502,
      "perCapitaPPP": 857.7,
      "perCapitaPPPChangePct": -0.59,
      "popChangePct": 3.18
    },
    {
      "year": 1992,
      "gdpPPP": 2.433,
      "perCapitaPPP": 808.2,
      "perCapitaPPPChangePct": -5.76,
      "popChangePct": 3.19
    },
    {
      "year": 1993,
      "gdpPPP": 2.46,
      "perCapitaPPP": 791.7,
      "perCapitaPPPChangePct": -2.05,
      "popChangePct": 3.26
    },
    {
      "year": 1994,
      "gdpPPP": 2.829,
      "perCapitaPPP": 881.9,
      "perCapitaPPPChangePct": 11.4,
      "popChangePct": 3.22
    },
    {
      "year": 1995,
      "gdpPPP": 2.98,
      "perCapitaPPP": 900.7,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 3.12
    },
    {
      "year": 1996,
      "gdpPPP": 2.847,
      "perCapitaPPP": 840.4,
      "perCapitaPPPChangePct": -6.69,
      "popChangePct": 2.42
    },
    {
      "year": 1997,
      "gdpPPP": 3.015,
      "perCapitaPPP": 865.5,
      "perCapitaPPPChangePct": 2.98,
      "popChangePct": 2.83
    },
    {
      "year": 1998,
      "gdpPPP": 3.151,
      "perCapitaPPP": 880.3,
      "perCapitaPPPChangePct": 1.72,
      "popChangePct": 2.73
    },
    {
      "year": 1999,
      "gdpPPP": 3.288,
      "perCapitaPPP": 893.9,
      "perCapitaPPPChangePct": 1.54,
      "popChangePct": 2.77
    },
    {
      "year": 2000,
      "gdpPPP": 3.242,
      "perCapitaPPP": 857.5,
      "perCapitaPPPChangePct": -4.07,
      "popChangePct": 2.8
    },
    {
      "year": 2001,
      "gdpPPP": 3.402,
      "perCapitaPPP": 875.3,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 2.78
    },
    {
      "year": 2002,
      "gdpPPP": 3.527,
      "perCapitaPPP": 892.2,
      "perCapitaPPPChangePct": 1.93,
      "popChangePct": 1.72
    },
    {
      "year": 2003,
      "gdpPPP": 3.515,
      "perCapitaPPP": 866.0,
      "perCapitaPPPChangePct": -2.94,
      "popChangePct": 2.68
    },
    {
      "year": 2004,
      "gdpPPP": 3.606,
      "perCapitaPPP": 869.7,
      "perCapitaPPPChangePct": 0.43,
      "popChangePct": 2.17
    },
    {
      "year": 2005,
      "gdpPPP": 3.829,
      "perCapitaPPP": 903.2,
      "perCapitaPPPChangePct": 3.85,
      "popChangePct": 2.22
    },
    {
      "year": 2006,
      "gdpPPP": 4.134,
      "perCapitaPPP": 952.8,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 2.36
    },
    {
      "year": 2007,
      "gdpPPP": 4.417,
      "perCapitaPPP": 1000.2,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 1.77
    },
    {
      "year": 2008,
      "gdpPPP": 4.62,
      "perCapitaPPP": 1024.6,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 2.11
    },
    {
      "year": 2009,
      "gdpPPP": 4.779,
      "perCapitaPPP": 1037.0,
      "perCapitaPPPChangePct": 1.21,
      "popChangePct": 2.22
    },
    {
      "year": 2010,
      "gdpPPP": 5.061,
      "perCapitaPPP": 1137.6,
      "perCapitaPPPChangePct": 9.7,
      "popChangePct": -3.47
    },
    {
      "year": 2011,
      "gdpPPP": 5.383,
      "perCapitaPPP": 1186.4,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 1.98
    },
    {
      "year": 2012,
      "gdpPPP": 5.76,
      "perCapitaPPP": 1254.0,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 1.23
    },
    {
      "year": 2013,
      "gdpPPP": 3.726,
      "perCapitaPPP": 805.1,
      "perCapitaPPPChangePct": -35.8,
      "popChangePct": 0.76
    },
    {
      "year": 2014,
      "gdpPPP": 3.794,
      "perCapitaPPP": 814.8,
      "perCapitaPPPChangePct": 1.21,
      "popChangePct": 0.61
    },
    {
      "year": 2015,
      "gdpPPP": 3.995,
      "perCapitaPPP": 870.5,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": -1.42
    },
    {
      "year": 2016,
      "gdpPPP": 4.225,
      "perCapitaPPP": 904.9,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 1.72
    },
    {
      "year": 2017,
      "gdpPPP": 4.495,
      "perCapitaPPP": 944.7,
      "perCapitaPPPChangePct": 4.39,
      "popChangePct": 1.93
    },
    {
      "year": 2018,
      "gdpPPP": 4.739,
      "perCapitaPPP": 981.5,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdpPPP": 5.358,
      "perCapitaPPP": 1087.1,
      "perCapitaPPPChangePct": 10.77,
      "popChangePct": 2.09
    },
    {
      "year": 2020,
      "gdpPPP": 5.758,
      "perCapitaPPP": 1160.9,
      "perCapitaPPPChangePct": 6.78,
      "popChangePct": 0.65
    },
    {
      "year": 2021,
      "gdpPPP": 6.211,
      "perCapitaPPP": 1219.6,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": 2.66
    },
    {
      "year": 2022,
      "gdpPPP": 6.706,
      "perCapitaPPP": 1306.8,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 0.75
    },
    {
      "year": 2023,
      "gdpPPP": 6.961,
      "perCapitaPPP": 1374.4,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": -1.29
    },
    {
      "year": 2024,
      "gdpPPP": 7.355,
      "perCapitaPPP": 1379.7,
      "perCapitaPPPChangePct": 0.38,
      "popChangePct": 5.25
    },
    {
      "year": 2025,
      "gdpPPP": 7.927,
      "perCapitaPPP": 1437.7,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 3.41
    },
    {
      "year": 2026,
      "gdpPPP": 8.367,
      "perCapitaPPP": 1468.1,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 3.37
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 8.806,
      "perCapitaPPP": 1495.5,
      "perCapitaPPPChangePct": 1.87,
      "popChangePct": 3.32
    },
    {
      "year": 2028,
      "gdpPPP": 9.239,
      "perCapitaPPP": 1519.0,
      "perCapitaPPPChangePct": 1.57,
      "popChangePct": 3.29
    },
    {
      "year": 2029,
      "gdpPPP": 9.736,
      "perCapitaPPP": 1550.3,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 3.26
    },
    {
      "year": 2030,
      "gdpPPP": 10.26,
      "perCapitaPPP": 1583.8,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 3.15
    },
    {
      "year": 2031,
      "gdpPPP": 10.811,
      "perCapitaPPP": 1618.4,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": 3.12
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CentralAfricanRepublicGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
