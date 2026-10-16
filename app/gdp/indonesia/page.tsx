import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Indonesia",
  "slug": "indonesia",
  "iso3": "IDN",
  "region": "Asia",
  "rank2026": 17,
  "flagEmoji": "🇮🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Turkey",
      "slug": "turkey",
      "rank": 16
    },
    {
      "name": "Netherlands",
      "slug": "netherlands",
      "rank": 18
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 99.296,
      "growth": 9.9,
      "perCapita": 673.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 110.848,
      "growth": 7.6,
      "perCapita": 737.0,
      "popChangePct": 1.98
    },
    {
      "year": 1982,
      "gdp": 113.799,
      "growth": 2.2,
      "perCapita": 741.9,
      "popChangePct": 1.98
    },
    {
      "year": 1983,
      "gdp": 103.149,
      "growth": 4.2,
      "perCapita": 659.5,
      "popChangePct": 1.98
    },
    {
      "year": 1984,
      "gdp": 107.218,
      "growth": 7.6,
      "perCapita": 672.2,
      "popChangePct": 1.98
    },
    {
      "year": 1985,
      "gdp": 107.062,
      "growth": 3.9,
      "perCapita": 658.2,
      "popChangePct": 1.98
    },
    {
      "year": 1986,
      "gdp": 101.22,
      "growth": 7.2,
      "perCapita": 610.2,
      "popChangePct": 1.98
    },
    {
      "year": 1987,
      "gdp": 95.214,
      "growth": 6.6,
      "perCapita": 562.9,
      "popChangePct": 1.98
    },
    {
      "year": 1988,
      "gdp": 107.279,
      "growth": 7,
      "perCapita": 621.9,
      "popChangePct": 1.98
    },
    {
      "year": 1989,
      "gdp": 122.582,
      "growth": 9.1,
      "perCapita": 696.9,
      "popChangePct": 1.98
    },
    {
      "year": 1990,
      "gdp": 138.258,
      "growth": 9,
      "perCapita": 770.8,
      "popChangePct": 1.98
    },
    {
      "year": 1991,
      "gdp": 154.558,
      "growth": 8.9,
      "perCapita": 847.6,
      "popChangePct": 1.66
    },
    {
      "year": 1992,
      "gdp": 168.28,
      "growth": 6.5,
      "perCapita": 907.8,
      "popChangePct": 1.66
    },
    {
      "year": 1993,
      "gdp": 190.913,
      "growth": 8,
      "perCapita": 1013.1,
      "popChangePct": 1.66
    },
    {
      "year": 1994,
      "gdp": 213.727,
      "growth": 7.5,
      "perCapita": 1115.6,
      "popChangePct": 1.66
    },
    {
      "year": 1995,
      "gdp": 244.227,
      "growth": 8.2,
      "perCapita": 1254.0,
      "popChangePct": 1.66
    },
    {
      "year": 1996,
      "gdp": 274.722,
      "growth": 7.8,
      "perCapita": 1394.5,
      "popChangePct": 1.15
    },
    {
      "year": 1997,
      "gdp": 260.68,
      "growth": 4.7,
      "perCapita": 1308.1,
      "popChangePct": 1.16
    },
    {
      "year": 1998,
      "gdp": 115.323,
      "growth": -13.1,
      "perCapita": 572.1,
      "popChangePct": 1.15
    },
    {
      "year": 1999,
      "gdp": 169.158,
      "growth": 0.8,
      "perCapita": 829.6,
      "popChangePct": 1.15
    },
    {
      "year": 2000,
      "gdp": 179.482,
      "growth": 5,
      "perCapita": 870.2,
      "popChangePct": 1.16
    },
    {
      "year": 2001,
      "gdp": 174.507,
      "growth": 3.6,
      "perCapita": 834.1,
      "popChangePct": 1.43
    },
    {
      "year": 2002,
      "gdp": 212.807,
      "growth": 4.5,
      "perCapita": 1002.9,
      "popChangePct": 1.43
    },
    {
      "year": 2003,
      "gdp": 255.346,
      "growth": 4.8,
      "perCapita": 1186.5,
      "popChangePct": 1.43
    },
    {
      "year": 2004,
      "gdp": 279.344,
      "growth": 5,
      "perCapita": 1279.7,
      "popChangePct": 1.43
    },
    {
      "year": 2005,
      "gdp": 310.92,
      "growth": 5.7,
      "perCapita": 1404.3,
      "popChangePct": 1.43
    },
    {
      "year": 2006,
      "gdp": 396.518,
      "growth": 5.5,
      "perCapita": 1765.8,
      "popChangePct": 1.43
    },
    {
      "year": 2007,
      "gdp": 470.092,
      "growth": 6.3,
      "perCapita": 2064.0,
      "popChangePct": 1.43
    },
    {
      "year": 2008,
      "gdp": 558.291,
      "growth": 7.4,
      "perCapita": 2416.8,
      "popChangePct": 1.43
    },
    {
      "year": 2009,
      "gdp": 578.577,
      "growth": 4.7,
      "perCapita": 2469.4,
      "popChangePct": 1.43
    },
    {
      "year": 2010,
      "gdp": 755.094,
      "growth": 6.4,
      "perCapita": 3177.5,
      "popChangePct": 1.43
    },
    {
      "year": 2011,
      "gdp": 892.969,
      "growth": 6.2,
      "perCapita": 3690.1,
      "popChangePct": 1.83
    },
    {
      "year": 2012,
      "gdp": 917.87,
      "growth": 6,
      "perCapita": 3739.9,
      "popChangePct": 1.42
    },
    {
      "year": 2013,
      "gdp": 912.524,
      "growth": 5.6,
      "perCapita": 3667.4,
      "popChangePct": 1.38
    },
    {
      "year": 2014,
      "gdp": 890.815,
      "growth": 5,
      "perCapita": 3532.7,
      "popChangePct": 1.35
    },
    {
      "year": 2015,
      "gdp": 860.854,
      "growth": 4.9,
      "perCapita": 3373.5,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdp": 931.877,
      "growth": 5,
      "perCapita": 3605.0,
      "popChangePct": 1.3
    },
    {
      "year": 2017,
      "gdp": 1015.619,
      "growth": 5.1,
      "perCapita": 3886.0,
      "popChangePct": 1.11
    },
    {
      "year": 2018,
      "gdp": 1042.272,
      "growth": 5.2,
      "perCapita": 3945.6,
      "popChangePct": 1.07
    },
    {
      "year": 2019,
      "gdp": 1119.1,
      "growth": 5,
      "perCapita": 4192.8,
      "popChangePct": 1.04
    },
    {
      "year": 2020,
      "gdp": 1059.055,
      "growth": -2.1,
      "perCapita": 3919.5,
      "popChangePct": 1.23
    },
    {
      "year": 2021,
      "gdp": 1186.51,
      "growth": 3.7,
      "perCapita": 4351.3,
      "popChangePct": 0.92
    },
    {
      "year": 2022,
      "gdp": 1319.101,
      "growth": 5.3,
      "perCapita": 4784.2,
      "popChangePct": 1.12
    },
    {
      "year": 2023,
      "gdp": 1371.167,
      "growth": 5,
      "perCapita": 4919.9,
      "popChangePct": 1.08
    },
    {
      "year": 2024,
      "gdp": 1396.302,
      "growth": 5,
      "perCapita": 4958.4,
      "popChangePct": 1.04
    },
    {
      "year": 2025,
      "gdp": 1445.642,
      "growth": 5.1,
      "perCapita": 5082.4,
      "popChangePct": 1.01
    },
    {
      "year": 2026,
      "gdp": 1539.872,
      "growth": 5,
      "perCapita": 5361.7,
      "popChangePct": 0.97
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1659.491,
      "growth": 5.1,
      "perCapita": 5724.8,
      "popChangePct": 0.93
    },
    {
      "year": 2028,
      "gdp": 1790.06,
      "growth": 5.2,
      "perCapita": 6120.3,
      "popChangePct": 0.9
    },
    {
      "year": 2029,
      "gdp": 1930.127,
      "growth": 5.2,
      "perCapita": 6542.8,
      "popChangePct": 0.86
    },
    {
      "year": 2030,
      "gdp": 2081.911,
      "growth": 5.2,
      "perCapita": 6999.6,
      "popChangePct": 0.82
    },
    {
      "year": 2031,
      "gdp": 2245.812,
      "growth": 5.2,
      "perCapita": 7491.5,
      "popChangePct": 0.79
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 163.519,
      "perCapitaPPP": 1108.7,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 192.601,
      "perCapitaPPP": 1280.5,
      "perCapitaPPPChangePct": 15.5,
      "popChangePct": 1.98
    },
    {
      "year": 1982,
      "gdpPPP": 209.096,
      "perCapitaPPP": 1363.3,
      "perCapitaPPPChangePct": 6.46,
      "popChangePct": 1.98
    },
    {
      "year": 1983,
      "gdpPPP": 226.395,
      "perCapitaPPP": 1447.4,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 1.98
    },
    {
      "year": 1984,
      "gdpPPP": 252.333,
      "perCapitaPPP": 1582.0,
      "perCapitaPPPChangePct": 9.3,
      "popChangePct": 1.98
    },
    {
      "year": 1985,
      "gdpPPP": 270.479,
      "perCapitaPPP": 1662.9,
      "perCapitaPPPChangePct": 5.11,
      "popChangePct": 1.98
    },
    {
      "year": 1986,
      "gdpPPP": 295.759,
      "perCapitaPPP": 1783.1,
      "perCapitaPPPChangePct": 7.23,
      "popChangePct": 1.98
    },
    {
      "year": 1987,
      "gdpPPP": 323.008,
      "perCapitaPPP": 1909.6,
      "perCapitaPPPChangePct": 7.1,
      "popChangePct": 1.98
    },
    {
      "year": 1988,
      "gdpPPP": 357.737,
      "perCapitaPPP": 2073.9,
      "perCapitaPPPChangePct": 8.6,
      "popChangePct": 1.98
    },
    {
      "year": 1989,
      "gdpPPP": 405.538,
      "perCapitaPPP": 2305.5,
      "perCapitaPPPChangePct": 11.16,
      "popChangePct": 1.98
    },
    {
      "year": 1990,
      "gdpPPP": 458.588,
      "perCapitaPPP": 2556.5,
      "perCapitaPPPChangePct": 10.89,
      "popChangePct": 1.98
    },
    {
      "year": 1991,
      "gdpPPP": 516.429,
      "perCapitaPPP": 2832.0,
      "perCapitaPPPChangePct": 10.78,
      "popChangePct": 1.66
    },
    {
      "year": 1992,
      "gdpPPP": 562.651,
      "perCapitaPPP": 3035.2,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 1.66
    },
    {
      "year": 1993,
      "gdpPPP": 621.811,
      "perCapitaPPP": 3299.6,
      "perCapitaPPPChangePct": 8.71,
      "popChangePct": 1.66
    },
    {
      "year": 1994,
      "gdpPPP": 682.975,
      "perCapitaPPP": 3565.0,
      "perCapitaPPPChangePct": 8.04,
      "popChangePct": 1.66
    },
    {
      "year": 1995,
      "gdpPPP": 754.611,
      "perCapitaPPP": 3874.7,
      "perCapitaPPPChangePct": 8.69,
      "popChangePct": 1.66
    },
    {
      "year": 1996,
      "gdpPPP": 828.503,
      "perCapitaPPP": 4205.5,
      "perCapitaPPPChangePct": 8.54,
      "popChangePct": 1.15
    },
    {
      "year": 1997,
      "gdpPPP": 882.4,
      "perCapitaPPP": 4427.9,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 1.16
    },
    {
      "year": 1998,
      "gdpPPP": 775.186,
      "perCapitaPPP": 3845.5,
      "perCapitaPPPChangePct": -13.15,
      "popChangePct": 1.15
    },
    {
      "year": 1999,
      "gdpPPP": 792.374,
      "perCapitaPPP": 3885.9,
      "perCapitaPPPChangePct": 1.05,
      "popChangePct": 1.15
    },
    {
      "year": 2000,
      "gdpPPP": 850.667,
      "perCapitaPPP": 4124.2,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 1.16
    },
    {
      "year": 2001,
      "gdpPPP": 901.512,
      "perCapitaPPP": 4309.2,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 1.43
    },
    {
      "year": 2002,
      "gdpPPP": 956.715,
      "perCapitaPPP": 4508.8,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 1.43
    },
    {
      "year": 2003,
      "gdpPPP": 1022.241,
      "perCapitaPPP": 4749.8,
      "perCapitaPPPChangePct": 5.35,
      "popChangePct": 1.43
    },
    {
      "year": 2004,
      "gdpPPP": 1102.538,
      "perCapitaPPP": 5050.9,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 1.43
    },
    {
      "year": 2005,
      "gdpPPP": 1201.842,
      "perCapitaPPP": 5428.4,
      "perCapitaPPPChangePct": 7.47,
      "popChangePct": 1.43
    },
    {
      "year": 2006,
      "gdpPPP": 1307.057,
      "perCapitaPPP": 5820.7,
      "perCapitaPPPChangePct": 7.23,
      "popChangePct": 1.43
    },
    {
      "year": 2007,
      "gdpPPP": 1427.649,
      "perCapitaPPP": 6268.3,
      "perCapitaPPPChangePct": 7.69,
      "popChangePct": 1.43
    },
    {
      "year": 2008,
      "gdpPPP": 1563.44,
      "perCapitaPPP": 6768.0,
      "perCapitaPPPChangePct": 7.97,
      "popChangePct": 1.43
    },
    {
      "year": 2009,
      "gdpPPP": 1647.046,
      "perCapitaPPP": 7029.6,
      "perCapitaPPPChangePct": 3.87,
      "popChangePct": 1.43
    },
    {
      "year": 2010,
      "gdpPPP": 1773.382,
      "perCapitaPPP": 7462.4,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 1.43
    },
    {
      "year": 2011,
      "gdpPPP": 1921.643,
      "perCapitaPPP": 7941.0,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 1.83
    },
    {
      "year": 2012,
      "gdpPPP": 2075.456,
      "perCapitaPPP": 8456.6,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 1.42
    },
    {
      "year": 2013,
      "gdpPPP": 2228.082,
      "perCapitaPPP": 8954.7,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 1.38
    },
    {
      "year": 2014,
      "gdpPPP": 2380.385,
      "perCapitaPPP": 9439.8,
      "perCapitaPPPChangePct": 5.42,
      "popChangePct": 1.35
    },
    {
      "year": 2015,
      "gdpPPP": 2519.629,
      "perCapitaPPP": 9873.8,
      "perCapitaPPPChangePct": 4.6,
      "popChangePct": 1.2
    },
    {
      "year": 2016,
      "gdpPPP": 2671.59,
      "perCapitaPPP": 10335.1,
      "perCapitaPPPChangePct": 4.67,
      "popChangePct": 1.3
    },
    {
      "year": 2017,
      "gdpPPP": 2857.305,
      "perCapitaPPP": 10932.6,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 1.11
    },
    {
      "year": 2018,
      "gdpPPP": 3069.919,
      "perCapitaPPP": 11621.4,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 1.07
    },
    {
      "year": 2019,
      "gdpPPP": 3266.186,
      "perCapitaPPP": 12236.9,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": 1.04
    },
    {
      "year": 2020,
      "gdpPPP": 3223.405,
      "perCapitaPPP": 11929.5,
      "perCapitaPPPChangePct": -2.51,
      "popChangePct": 1.23
    },
    {
      "year": 2021,
      "gdpPPP": 3530.623,
      "perCapitaPPP": 12947.9,
      "perCapitaPPPChangePct": 8.54,
      "popChangePct": 0.92
    },
    {
      "year": 2022,
      "gdpPPP": 3982.44,
      "perCapitaPPP": 14443.8,
      "perCapitaPPPChangePct": 11.55,
      "popChangePct": 1.12
    },
    {
      "year": 2023,
      "gdpPPP": 4338.298,
      "perCapitaPPP": 15566.4,
      "perCapitaPPPChangePct": 7.77,
      "popChangePct": 1.08
    },
    {
      "year": 2024,
      "gdpPPP": 4669.746,
      "perCapitaPPP": 16582.7,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 1.04
    },
    {
      "year": 2025,
      "gdpPPP": 5047.517,
      "perCapitaPPP": 17745.5,
      "perCapitaPPPChangePct": 7.01,
      "popChangePct": 1.01
    },
    {
      "year": 2026,
      "gdpPPP": 5449.145,
      "perCapitaPPP": 18973.5,
      "perCapitaPPPChangePct": 6.92,
      "popChangePct": 0.97
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 5851.128,
      "perCapitaPPP": 20184.6,
      "perCapitaPPPChangePct": 6.38,
      "popChangePct": 0.93
    },
    {
      "year": 2028,
      "gdpPPP": 6254.603,
      "perCapitaPPP": 21384.7,
      "perCapitaPPPChangePct": 5.95,
      "popChangePct": 0.9
    },
    {
      "year": 2029,
      "gdpPPP": 6695.867,
      "perCapitaPPP": 22698.0,
      "perCapitaPPPChangePct": 6.14,
      "popChangePct": 0.86
    },
    {
      "year": 2030,
      "gdpPPP": 7175.058,
      "perCapitaPPP": 24123.5,
      "perCapitaPPPChangePct": 6.28,
      "popChangePct": 0.82
    },
    {
      "year": 2031,
      "gdpPPP": 7686.731,
      "perCapitaPPP": 25641.2,
      "perCapitaPPPChangePct": 6.29,
      "popChangePct": 0.79
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function IndonesiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
