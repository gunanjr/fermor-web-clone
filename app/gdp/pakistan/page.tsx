import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Pakistan",
  "slug": "pakistan",
  "iso3": "PAK",
  "region": "Asia",
  "rank2026": 45,
  "flagEmoji": "🇵🇰",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Chile",
      "slug": "chile",
      "rank": 44
    },
    {
      "name": "Peru",
      "slug": "peru",
      "rank": 46
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 38.616,
      "growth": 6.9,
      "perCapita": 479.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 45.681,
      "growth": 6.2,
      "perCapita": 550.4,
      "popChangePct": 2.96
    },
    {
      "year": 1982,
      "gdp": 49.932,
      "growth": 7.6,
      "perCapita": 584.4,
      "popChangePct": 2.96
    },
    {
      "year": 1983,
      "gdp": 46.619,
      "growth": 6.8,
      "perCapita": 530.4,
      "popChangePct": 2.87
    },
    {
      "year": 1984,
      "gdp": 50.612,
      "growth": 4,
      "perCapita": 560.2,
      "popChangePct": 2.79
    },
    {
      "year": 1985,
      "gdp": 50.607,
      "growth": 8.7,
      "perCapita": 545.2,
      "popChangePct": 2.74
    },
    {
      "year": 1986,
      "gdp": 51.827,
      "growth": 6.4,
      "perCapita": 543.6,
      "popChangePct": 2.71
    },
    {
      "year": 1987,
      "gdp": 54.171,
      "growth": 5.8,
      "perCapita": 553.5,
      "popChangePct": 2.66
    },
    {
      "year": 1988,
      "gdp": 62.385,
      "growth": 6.4,
      "perCapita": 621.1,
      "popChangePct": 2.62
    },
    {
      "year": 1989,
      "gdp": 65.042,
      "growth": 4.8,
      "perCapita": 631.4,
      "popChangePct": 2.57
    },
    {
      "year": 1990,
      "gdp": 65.276,
      "growth": 4.6,
      "perCapita": 615.8,
      "popChangePct": 2.89
    },
    {
      "year": 1991,
      "gdp": 74.158,
      "growth": 5.1,
      "perCapita": 684.5,
      "popChangePct": 2.21
    },
    {
      "year": 1992,
      "gdp": 79.338,
      "growth": 7.6,
      "perCapita": 713.4,
      "popChangePct": 2.65
    },
    {
      "year": 1993,
      "gdp": 83.969,
      "growth": 2.1,
      "perCapita": 735.8,
      "popChangePct": 2.61
    },
    {
      "year": 1994,
      "gdp": 84.642,
      "growth": 4.4,
      "perCapita": 723.1,
      "popChangePct": 2.58
    },
    {
      "year": 1995,
      "gdp": 98.917,
      "growth": 5.1,
      "perCapita": 824.0,
      "popChangePct": 2.55
    },
    {
      "year": 1996,
      "gdp": 103.296,
      "growth": 6.6,
      "perCapita": 839.3,
      "popChangePct": 2.52
    },
    {
      "year": 1997,
      "gdp": 101.848,
      "growth": 1.7,
      "perCapita": 807.5,
      "popChangePct": 2.49
    },
    {
      "year": 1998,
      "gdp": 101.381,
      "growth": 3.5,
      "perCapita": 784.5,
      "popChangePct": 2.45
    },
    {
      "year": 1999,
      "gdp": 96.008,
      "growth": 4.2,
      "perCapita": 725.4,
      "popChangePct": 2.42
    },
    {
      "year": 2000,
      "gdp": 99.421,
      "growth": 3.9,
      "perCapita": 733.5,
      "popChangePct": 2.42
    },
    {
      "year": 2001,
      "gdp": 96.784,
      "growth": 3.6,
      "perCapita": 696.9,
      "popChangePct": 2.45
    },
    {
      "year": 2002,
      "gdp": 98.169,
      "growth": 2.6,
      "perCapita": 690.0,
      "popChangePct": 2.46
    },
    {
      "year": 2003,
      "gdp": 112.507,
      "growth": 5.2,
      "perCapita": 771.8,
      "popChangePct": 2.46
    },
    {
      "year": 2004,
      "gdp": 132.206,
      "growth": 7.7,
      "perCapita": 885.1,
      "popChangePct": 2.46
    },
    {
      "year": 2005,
      "gdp": 145.209,
      "growth": 8,
      "perCapita": 948.8,
      "popChangePct": 2.46
    },
    {
      "year": 2006,
      "gdp": 161.871,
      "growth": 5.7,
      "perCapita": 1032.3,
      "popChangePct": 2.46
    },
    {
      "year": 2007,
      "gdp": 184.141,
      "growth": 5.1,
      "perCapita": 1146.1,
      "popChangePct": 2.46
    },
    {
      "year": 2008,
      "gdp": 202.204,
      "growth": 4.4,
      "perCapita": 1228.2,
      "popChangePct": 2.46
    },
    {
      "year": 2009,
      "gdp": 187.074,
      "growth": 1.1,
      "perCapita": 1109.0,
      "popChangePct": 2.47
    },
    {
      "year": 2010,
      "gdp": 196.712,
      "growth": 2.3,
      "perCapita": 1138.0,
      "popChangePct": 2.47
    },
    {
      "year": 2011,
      "gdp": 230.577,
      "growth": 3.2,
      "perCapita": 1301.7,
      "popChangePct": 2.47
    },
    {
      "year": 2012,
      "gdp": 250.094,
      "growth": 3.2,
      "perCapita": 1377.8,
      "popChangePct": 2.48
    },
    {
      "year": 2013,
      "gdp": 258.674,
      "growth": 3.9,
      "perCapita": 1390.6,
      "popChangePct": 2.47
    },
    {
      "year": 2014,
      "gdp": 271.422,
      "growth": 3.6,
      "perCapita": 1423.9,
      "popChangePct": 2.48
    },
    {
      "year": 2015,
      "gdp": 299.93,
      "growth": 3.8,
      "perCapita": 1535.3,
      "popChangePct": 2.48
    },
    {
      "year": 2016,
      "gdp": 313.623,
      "growth": 4.1,
      "perCapita": 1566.6,
      "popChangePct": 2.48
    },
    {
      "year": 2017,
      "gdp": 339.229,
      "growth": 4.6,
      "perCapita": 1653.4,
      "popChangePct": 2.49
    },
    {
      "year": 2018,
      "gdp": 356.163,
      "growth": 6.1,
      "perCapita": 1698.0,
      "popChangePct": 2.23
    },
    {
      "year": 2019,
      "gdp": 321.071,
      "growth": 3.1,
      "perCapita": 1500.7,
      "popChangePct": 2.0
    },
    {
      "year": 2020,
      "gdp": 300.41,
      "growth": -0.9,
      "perCapita": 1376.5,
      "popChangePct": 2.01
    },
    {
      "year": 2021,
      "gdp": 348.481,
      "growth": 5.8,
      "perCapita": 1565.6,
      "popChangePct": 1.99
    },
    {
      "year": 2022,
      "gdp": 374.85,
      "growth": 6.2,
      "perCapita": 1651.3,
      "popChangePct": 1.98
    },
    {
      "year": 2023,
      "gdp": 336.555,
      "growth": -0.2,
      "perCapita": 1454.1,
      "popChangePct": 1.96
    },
    {
      "year": 2024,
      "gdp": 372.243,
      "growth": 2.6,
      "perCapita": 1577.6,
      "popChangePct": 1.94
    },
    {
      "year": 2025,
      "gdp": 407.786,
      "growth": 3.1,
      "perCapita": 1695.6,
      "popChangePct": 1.92
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 74.903,
      "perCapitaPPP": 929.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 87.079,
      "perCapitaPPP": 1049.3,
      "perCapitaPPPChangePct": 12.92,
      "popChangePct": 2.96
    },
    {
      "year": 1982,
      "gdpPPP": 99.452,
      "perCapitaPPP": 1163.9,
      "perCapitaPPPChangePct": 10.93,
      "popChangePct": 2.96
    },
    {
      "year": 1983,
      "gdpPPP": 110.362,
      "perCapitaPPP": 1255.5,
      "perCapitaPPPChangePct": 7.87,
      "popChangePct": 2.87
    },
    {
      "year": 1984,
      "gdpPPP": 118.888,
      "perCapitaPPP": 1315.8,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 2.79
    },
    {
      "year": 1985,
      "gdpPPP": 133.328,
      "perCapitaPPP": 1436.3,
      "perCapitaPPPChangePct": 9.16,
      "popChangePct": 2.74
    },
    {
      "year": 1986,
      "gdpPPP": 144.666,
      "perCapitaPPP": 1517.4,
      "perCapitaPPPChangePct": 5.64,
      "popChangePct": 2.71
    },
    {
      "year": 1987,
      "gdpPPP": 156.866,
      "perCapitaPPP": 1602.7,
      "perCapitaPPPChangePct": 5.63,
      "popChangePct": 2.66
    },
    {
      "year": 1988,
      "gdpPPP": 172.85,
      "perCapitaPPP": 1721.0,
      "perCapitaPPPChangePct": 7.38,
      "popChangePct": 2.62
    },
    {
      "year": 1989,
      "gdpPPP": 188.265,
      "perCapitaPPP": 1827.5,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 2.57
    },
    {
      "year": 1990,
      "gdpPPP": 204.273,
      "perCapitaPPP": 1927.1,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 2.89
    },
    {
      "year": 1991,
      "gdpPPP": 222.009,
      "perCapitaPPP": 2049.1,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 2.21
    },
    {
      "year": 1992,
      "gdpPPP": 244.256,
      "perCapitaPPP": 2196.3,
      "perCapitaPPPChangePct": 7.19,
      "popChangePct": 2.65
    },
    {
      "year": 1993,
      "gdpPPP": 255.289,
      "perCapitaPPP": 2237.1,
      "perCapitaPPPChangePct": 1.86,
      "popChangePct": 2.61
    },
    {
      "year": 1994,
      "gdpPPP": 272.132,
      "perCapitaPPP": 2324.7,
      "perCapitaPPPChangePct": 3.92,
      "popChangePct": 2.58
    },
    {
      "year": 1995,
      "gdpPPP": 291.901,
      "perCapitaPPP": 2431.6,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 2.55
    },
    {
      "year": 1996,
      "gdpPPP": 316.86,
      "perCapitaPPP": 2574.7,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 2.52
    },
    {
      "year": 1997,
      "gdpPPP": 327.813,
      "perCapitaPPP": 2599.1,
      "perCapitaPPPChangePct": 0.95,
      "popChangePct": 2.49
    },
    {
      "year": 1998,
      "gdpPPP": 343.079,
      "perCapitaPPP": 2655.0,
      "perCapitaPPPChangePct": 2.15,
      "popChangePct": 2.45
    },
    {
      "year": 1999,
      "gdpPPP": 362.485,
      "perCapitaPPP": 2738.8,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 2.42
    },
    {
      "year": 2000,
      "gdpPPP": 385.182,
      "perCapitaPPP": 2841.6,
      "perCapitaPPPChangePct": 3.75,
      "popChangePct": 2.42
    },
    {
      "year": 2001,
      "gdpPPP": 408.183,
      "perCapitaPPP": 2939.3,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 2.45
    },
    {
      "year": 2002,
      "gdpPPP": 425.401,
      "perCapitaPPP": 2989.9,
      "perCapitaPPPChangePct": 1.72,
      "popChangePct": 2.46
    },
    {
      "year": 2003,
      "gdpPPP": 456.214,
      "perCapitaPPP": 3129.5,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 2.46
    },
    {
      "year": 2004,
      "gdpPPP": 504.511,
      "perCapitaPPP": 3377.8,
      "perCapitaPPPChangePct": 7.94,
      "popChangePct": 2.46
    },
    {
      "year": 2005,
      "gdpPPP": 561.945,
      "perCapitaPPP": 3671.9,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": 2.46
    },
    {
      "year": 2006,
      "gdpPPP": 612.084,
      "perCapitaPPP": 3903.3,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 2.46
    },
    {
      "year": 2007,
      "gdpPPP": 660.796,
      "perCapitaPPP": 4112.8,
      "perCapitaPPPChangePct": 5.36,
      "popChangePct": 2.46
    },
    {
      "year": 2008,
      "gdpPPP": 703.464,
      "perCapitaPPP": 4273.0,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 2.46
    },
    {
      "year": 2009,
      "gdpPPP": 715.327,
      "perCapitaPPP": 4240.5,
      "perCapitaPPPChangePct": -0.76,
      "popChangePct": 2.47
    },
    {
      "year": 2010,
      "gdpPPP": 740.417,
      "perCapitaPPP": 4283.3,
      "perCapitaPPPChangePct": 1.01,
      "popChangePct": 2.47
    },
    {
      "year": 2011,
      "gdpPPP": 779.909,
      "perCapitaPPP": 4403.0,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 2.47
    },
    {
      "year": 2012,
      "gdpPPP": 819.823,
      "perCapitaPPP": 4516.4,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 2.48
    },
    {
      "year": 2013,
      "gdpPPP": 865.929,
      "perCapitaPPP": 4655.3,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": 2.47
    },
    {
      "year": 2014,
      "gdpPPP": 912.343,
      "perCapitaPPP": 4786.2,
      "perCapitaPPPChangePct": 2.81,
      "popChangePct": 2.48
    },
    {
      "year": 2015,
      "gdpPPP": 955.907,
      "perCapitaPPP": 4893.3,
      "perCapitaPPPChangePct": 2.24,
      "popChangePct": 2.48
    },
    {
      "year": 2016,
      "gdpPPP": 1004.281,
      "perCapitaPPP": 5016.6,
      "perCapitaPPPChangePct": 2.52,
      "popChangePct": 2.48
    },
    {
      "year": 2017,
      "gdpPPP": 1069.379,
      "perCapitaPPP": 5212.2,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 2.49
    },
    {
      "year": 2018,
      "gdpPPP": 1129.964,
      "perCapitaPPP": 5387.2,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 2.23
    },
    {
      "year": 2019,
      "gdpPPP": 1162.667,
      "perCapitaPPP": 5434.3,
      "perCapitaPPPChangePct": 0.87,
      "popChangePct": 2.0
    },
    {
      "year": 2020,
      "gdpPPP": 1186.294,
      "perCapitaPPP": 5435.7,
      "perCapitaPPPChangePct": 0.03,
      "popChangePct": 2.01
    },
    {
      "year": 2021,
      "gdpPPP": 1285.343,
      "perCapitaPPP": 5774.5,
      "perCapitaPPPChangePct": 6.23,
      "popChangePct": 1.99
    },
    {
      "year": 2022,
      "gdpPPP": 1461.845,
      "perCapitaPPP": 6439.8,
      "perCapitaPPPChangePct": 11.52,
      "popChangePct": 1.98
    },
    {
      "year": 2023,
      "gdpPPP": 1512.714,
      "perCapitaPPP": 6535.8,
      "perCapitaPPPChangePct": 1.49,
      "popChangePct": 1.96
    },
    {
      "year": 2024,
      "gdpPPP": 1591.102,
      "perCapitaPPP": 6743.4,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 1.94
    },
    {
      "year": 2025,
      "gdpPPP": 1686.854,
      "perCapitaPPP": 7014.2,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 1.92
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function PakistanGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
