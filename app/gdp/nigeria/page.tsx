import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Nigeria",
  "slug": "nigeria",
  "iso3": "NGA",
  "region": "Africa",
  "rank2026": 48,
  "flagEmoji": "🇳🇬",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Portugal",
      "slug": "portugal",
      "rank": 47
    },
    {
      "name": "Kazakhstan",
      "slug": "kazakhstan",
      "rank": 49
    }
  ],
  "history": [
    {
      "year": 1990,
      "gdp": 87.542,
      "growth": null,
      "perCapita": 935.2,
      "popChangePct": 0.88
    },
    {
      "year": 1991,
      "gdp": 84.676,
      "growth": -0.6,
      "perCapita": 878.9,
      "popChangePct": 2.93
    },
    {
      "year": 1992,
      "gdp": 73.614,
      "growth": 2.2,
      "perCapita": 742.3,
      "popChangePct": 2.93
    },
    {
      "year": 1993,
      "gdp": 79.996,
      "growth": 1.6,
      "perCapita": 783.7,
      "popChangePct": 2.93
    },
    {
      "year": 1994,
      "gdp": 112.837,
      "growth": 0.3,
      "perCapita": 1074.1,
      "popChangePct": 2.93
    },
    {
      "year": 1995,
      "gdp": 186.207,
      "growth": 1.9,
      "perCapita": 1722.1,
      "popChangePct": 2.93
    },
    {
      "year": 1996,
      "gdp": 243.178,
      "growth": 4.1,
      "perCapita": 2185.1,
      "popChangePct": 2.93
    },
    {
      "year": 1997,
      "gdp": 264.554,
      "growth": 2.9,
      "perCapita": 2309.6,
      "popChangePct": 2.93
    },
    {
      "year": 1998,
      "gdp": 295.269,
      "growth": 2.5,
      "perCapita": 2504.4,
      "popChangePct": 2.93
    },
    {
      "year": 1999,
      "gdp": 80.94,
      "growth": 0.5,
      "perCapita": 667.0,
      "popChangePct": 2.93
    },
    {
      "year": 2000,
      "gdp": 95.51,
      "growth": 5.5,
      "perCapita": 764.7,
      "popChangePct": 2.93
    },
    {
      "year": 2001,
      "gdp": 102.98,
      "growth": 6.7,
      "perCapita": 801.1,
      "popChangePct": 2.93
    },
    {
      "year": 2002,
      "gdp": 132.347,
      "growth": 14.6,
      "perCapita": 1000.3,
      "popChangePct": 2.93
    },
    {
      "year": 2003,
      "gdp": 144.955,
      "growth": 9.5,
      "perCapita": 1064.4,
      "popChangePct": 2.93
    },
    {
      "year": 2004,
      "gdp": 183.553,
      "growth": 10.4,
      "perCapita": 1309.5,
      "popChangePct": 2.93
    },
    {
      "year": 2005,
      "gdp": 238.895,
      "growth": 7,
      "perCapita": 1655.9,
      "popChangePct": 2.93
    },
    {
      "year": 2006,
      "gdp": 313.737,
      "growth": 6.7,
      "perCapita": 2112.9,
      "popChangePct": 2.93
    },
    {
      "year": 2007,
      "gdp": 375.055,
      "growth": 7.3,
      "perCapita": 2454.0,
      "popChangePct": 2.93
    },
    {
      "year": 2008,
      "gdp": 472.283,
      "growth": 7.2,
      "perCapita": 3002.4,
      "popChangePct": 2.93
    },
    {
      "year": 2009,
      "gdp": 425.922,
      "growth": 8.4,
      "perCapita": 2630.7,
      "popChangePct": 2.93
    },
    {
      "year": 2010,
      "gdp": 526.809,
      "growth": 11.3,
      "perCapita": 3161.3,
      "popChangePct": 2.93
    },
    {
      "year": 2011,
      "gdp": 591.367,
      "growth": 4.9,
      "perCapita": 3450.6,
      "popChangePct": 2.84
    },
    {
      "year": 2012,
      "gdp": 657.854,
      "growth": 4.3,
      "perCapita": 3733.6,
      "popChangePct": 2.81
    },
    {
      "year": 2013,
      "gdp": 734.89,
      "growth": 5.4,
      "perCapita": 4059.1,
      "popChangePct": 2.75
    },
    {
      "year": 2014,
      "gdp": 811.134,
      "growth": 6.3,
      "perCapita": 4363.4,
      "popChangePct": 2.68
    },
    {
      "year": 2015,
      "gdp": 696.088,
      "growth": 2.7,
      "perCapita": 3650.7,
      "popChangePct": 2.57
    },
    {
      "year": 2016,
      "gdp": 570.351,
      "growth": -1.6,
      "perCapita": 2918.2,
      "popChangePct": 2.5
    },
    {
      "year": 2017,
      "gdp": 529.144,
      "growth": 0.8,
      "perCapita": 2642.4,
      "popChangePct": 2.46
    },
    {
      "year": 2018,
      "gdp": 593.897,
      "growth": 1.9,
      "perCapita": 2897.9,
      "popChangePct": 2.34
    },
    {
      "year": 2019,
      "gdp": 668.219,
      "growth": 2.2,
      "perCapita": 3189.8,
      "popChangePct": 2.22
    },
    {
      "year": 2020,
      "gdp": 598.725,
      "growth": -6.4,
      "perCapita": 2797.8,
      "popChangePct": 2.15
    },
    {
      "year": 2021,
      "gdp": 609.479,
      "growth": 1.1,
      "perCapita": 2789.0,
      "popChangePct": 2.12
    },
    {
      "year": 2022,
      "gdp": 645.682,
      "growth": 4.3,
      "perCapita": 2893.5,
      "popChangePct": 2.12
    },
    {
      "year": 2023,
      "gdp": 487.347,
      "growth": 3.3,
      "perCapita": 2138.6,
      "popChangePct": 2.12
    },
    {
      "year": 2024,
      "gdp": 252.109,
      "growth": 4.1,
      "perCapita": 1083.5,
      "popChangePct": 2.1
    },
    {
      "year": 2025,
      "gdp": 290.491,
      "growth": 4,
      "perCapita": 1222.7,
      "popChangePct": 2.11
    },
    {
      "year": 2026,
      "gdp": 377.365,
      "growth": 4.1,
      "perCapita": 1555.6,
      "popChangePct": 2.11
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 387.645,
      "growth": 4.3,
      "perCapita": 1565.1,
      "popChangePct": 2.1
    },
    {
      "year": 2028,
      "gdp": 405.582,
      "growth": 4.1,
      "perCapita": 1603.7,
      "popChangePct": 2.11
    },
    {
      "year": 2029,
      "gdp": 434.814,
      "growth": 4.2,
      "perCapita": 1683.9,
      "popChangePct": 2.1
    },
    {
      "year": 2030,
      "gdp": 464.836,
      "growth": 4.2,
      "perCapita": 1763.0,
      "popChangePct": 2.1
    },
    {
      "year": 2031,
      "gdp": 496.284,
      "growth": 4.2,
      "perCapita": 1843.5,
      "popChangePct": 2.1
    }
  ],
  "pppHistory": [
    {
      "year": 1990,
      "gdpPPP": 233.119,
      "perCapitaPPP": 2490.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": 0.88
    },
    {
      "year": 1991,
      "gdpPPP": 239.674,
      "perCapitaPPP": 2487.6,
      "perCapitaPPPChangePct": -0.11,
      "popChangePct": 2.93
    },
    {
      "year": 1992,
      "gdpPPP": 250.513,
      "perCapitaPPP": 2526.2,
      "perCapitaPPPChangePct": 1.55,
      "popChangePct": 2.93
    },
    {
      "year": 1993,
      "gdpPPP": 260.473,
      "perCapitaPPP": 2552.0,
      "perCapitaPPPChangePct": 1.02,
      "popChangePct": 2.93
    },
    {
      "year": 1994,
      "gdpPPP": 266.718,
      "perCapitaPPP": 2538.9,
      "perCapitaPPPChangePct": -0.51,
      "popChangePct": 2.93
    },
    {
      "year": 1995,
      "gdpPPP": 277.408,
      "perCapitaPPP": 2565.6,
      "perCapitaPPPChangePct": 1.05,
      "popChangePct": 2.93
    },
    {
      "year": 1996,
      "gdpPPP": 293.934,
      "perCapitaPPP": 2641.1,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": 2.93
    },
    {
      "year": 1997,
      "gdpPPP": 307.631,
      "perCapitaPPP": 2685.6,
      "perCapitaPPPChangePct": 1.69,
      "popChangePct": 2.93
    },
    {
      "year": 1998,
      "gdpPPP": 318.852,
      "perCapitaPPP": 2704.5,
      "perCapitaPPPChangePct": 0.7,
      "popChangePct": 2.93
    },
    {
      "year": 1999,
      "gdpPPP": 325.052,
      "perCapitaPPP": 2678.7,
      "perCapitaPPPChangePct": -0.95,
      "popChangePct": 2.93
    },
    {
      "year": 2000,
      "gdpPPP": 350.759,
      "perCapitaPPP": 2808.4,
      "perCapitaPPPChangePct": 4.84,
      "popChangePct": 2.93
    },
    {
      "year": 2001,
      "gdpPPP": 382.568,
      "perCapitaPPP": 2976.0,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 2.93
    },
    {
      "year": 2002,
      "gdpPPP": 445.253,
      "perCapitaPPP": 3365.2,
      "perCapitaPPPChangePct": 13.08,
      "popChangePct": 2.93
    },
    {
      "year": 2003,
      "gdpPPP": 497.19,
      "perCapitaPPP": 3650.9,
      "perCapitaPPPChangePct": 8.49,
      "popChangePct": 2.93
    },
    {
      "year": 2004,
      "gdpPPP": 563.871,
      "perCapitaPPP": 4022.8,
      "perCapitaPPPChangePct": 10.19,
      "popChangePct": 2.93
    },
    {
      "year": 2005,
      "gdpPPP": 622.311,
      "perCapitaPPP": 4313.6,
      "perCapitaPPPChangePct": 7.23,
      "popChangePct": 2.93
    },
    {
      "year": 2006,
      "gdpPPP": 684.649,
      "perCapitaPPP": 4610.8,
      "perCapitaPPPChangePct": 6.89,
      "popChangePct": 2.93
    },
    {
      "year": 2007,
      "gdpPPP": 754.659,
      "perCapitaPPP": 4937.8,
      "perCapitaPPPChangePct": 7.09,
      "popChangePct": 2.93
    },
    {
      "year": 2008,
      "gdpPPP": 824.573,
      "perCapitaPPP": 5241.9,
      "perCapitaPPPChangePct": 6.16,
      "popChangePct": 2.93
    },
    {
      "year": 2009,
      "gdpPPP": 898.963,
      "perCapitaPPP": 5552.4,
      "perCapitaPPPChangePct": 5.92,
      "popChangePct": 2.93
    },
    {
      "year": 2010,
      "gdpPPP": 1012.333,
      "perCapitaPPP": 6074.9,
      "perCapitaPPPChangePct": 9.41,
      "popChangePct": 2.93
    },
    {
      "year": 2011,
      "gdpPPP": 1083.717,
      "perCapitaPPP": 6323.5,
      "perCapitaPPPChangePct": 4.09,
      "popChangePct": 2.84
    },
    {
      "year": 2012,
      "gdpPPP": 1151.134,
      "perCapitaPPP": 6533.1,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 2.81
    },
    {
      "year": 2013,
      "gdpPPP": 1233.88,
      "perCapitaPPP": 6815.2,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 2.75
    },
    {
      "year": 2014,
      "gdpPPP": 1334.581,
      "perCapitaPPP": 7179.1,
      "perCapitaPPPChangePct": 5.34,
      "popChangePct": 2.68
    },
    {
      "year": 2015,
      "gdpPPP": 1382.697,
      "perCapitaPPP": 7251.7,
      "perCapitaPPPChangePct": 1.01,
      "popChangePct": 2.57
    },
    {
      "year": 2016,
      "gdpPPP": 1373.267,
      "perCapitaPPP": 7026.4,
      "perCapitaPPPChangePct": -3.11,
      "popChangePct": 2.5
    },
    {
      "year": 2017,
      "gdpPPP": 1409.126,
      "perCapitaPPP": 7036.7,
      "perCapitaPPPChangePct": 0.15,
      "popChangePct": 2.46
    },
    {
      "year": 2018,
      "gdpPPP": 1466.987,
      "perCapitaPPP": 7158.2,
      "perCapitaPPPChangePct": 1.73,
      "popChangePct": 2.34
    },
    {
      "year": 2019,
      "gdpPPP": 1581.909,
      "perCapitaPPP": 7551.4,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 2.22
    },
    {
      "year": 2020,
      "gdpPPP": 1586.734,
      "perCapitaPPP": 7414.8,
      "perCapitaPPPChangePct": -1.81,
      "popChangePct": 2.15
    },
    {
      "year": 2021,
      "gdpPPP": 1658.305,
      "perCapitaPPP": 7588.5,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 2.12
    },
    {
      "year": 2022,
      "gdpPPP": 1852.964,
      "perCapitaPPP": 8303.6,
      "perCapitaPPPChangePct": 9.42,
      "popChangePct": 2.12
    },
    {
      "year": 2023,
      "gdpPPP": 1985.24,
      "perCapitaPPP": 8711.7,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 2.12
    },
    {
      "year": 2024,
      "gdpPPP": 2117.351,
      "perCapitaPPP": 9099.9,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 2.1
    },
    {
      "year": 2025,
      "gdpPPP": 2264.803,
      "perCapitaPPP": 9532.9,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 2.11
    },
    {
      "year": 2026,
      "gdpPPP": 2424.223,
      "perCapitaPPP": 9993.6,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 2.11
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2584.57,
      "perCapitaPPP": 10435.0,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 2.1
    },
    {
      "year": 2028,
      "gdpPPP": 2735.565,
      "perCapitaPPP": 10816.9,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 2.11
    },
    {
      "year": 2029,
      "gdpPPP": 2902.137,
      "perCapitaPPP": 11239.0,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 2.1
    },
    {
      "year": 2030,
      "gdpPPP": 3079.174,
      "perCapitaPPP": 11678.8,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 2.1
    },
    {
      "year": 2031,
      "gdpPPP": 3265.83,
      "perCapitaPPP": 12131.4,
      "perCapitaPPPChangePct": 3.88,
      "popChangePct": 2.1
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function NigeriaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
