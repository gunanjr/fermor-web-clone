import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Tunisia",
  "slug": "tunisia",
  "iso3": "TUN",
  "region": "Africa",
  "rank2026": 95,
  "flagEmoji": "🇹🇳",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Jordan",
      "slug": "jordan",
      "rank": 94
    },
    {
      "name": "Paraguay",
      "slug": "paraguay",
      "rank": 96
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 9.566,
      "growth": 7.4,
      "perCapita": 1466.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 9.223,
      "growth": 5.5,
      "perCapita": 1375.1,
      "popChangePct": 2.82
    },
    {
      "year": 1982,
      "gdp": 8.9,
      "growth": -0.5,
      "perCapita": 1295.5,
      "popChangePct": 2.43
    },
    {
      "year": 1983,
      "gdp": 9.202,
      "growth": 4.7,
      "perCapita": 1308.3,
      "popChangePct": 2.39
    },
    {
      "year": 1984,
      "gdp": 9.054,
      "growth": 5.7,
      "perCapita": 1272.4,
      "popChangePct": 1.15
    },
    {
      "year": 1985,
      "gdp": 9.245,
      "growth": 5.7,
      "perCapita": 1257.8,
      "popChangePct": 3.3
    },
    {
      "year": 1986,
      "gdp": 9.91,
      "growth": -1.5,
      "perCapita": 1297.8,
      "popChangePct": 3.89
    },
    {
      "year": 1987,
      "gdp": 10.663,
      "growth": 6.7,
      "perCapita": 1367.2,
      "popChangePct": 2.13
    },
    {
      "year": 1988,
      "gdp": 11.073,
      "growth": 0.1,
      "perCapita": 1396.0,
      "popChangePct": 1.71
    },
    {
      "year": 1989,
      "gdp": 11.069,
      "growth": 2.6,
      "perCapita": 1370.7,
      "popChangePct": 1.8
    },
    {
      "year": 1990,
      "gdp": 14.133,
      "growth": 7.1,
      "perCapita": 1697.8,
      "popChangePct": 3.1
    },
    {
      "year": 1991,
      "gdp": 14.897,
      "growth": 4.1,
      "perCapita": 1752.2,
      "popChangePct": 2.13
    },
    {
      "year": 1992,
      "gdp": 17.809,
      "growth": 8,
      "perCapita": 2051.1,
      "popChangePct": 2.13
    },
    {
      "year": 1993,
      "gdp": 16.724,
      "growth": 2.5,
      "perCapita": 1888.0,
      "popChangePct": 2.02
    },
    {
      "year": 1994,
      "gdp": 17.886,
      "growth": 3.6,
      "perCapita": 1983.3,
      "popChangePct": 1.81
    },
    {
      "year": 1995,
      "gdp": 20.616,
      "growth": 2.7,
      "perCapita": 2250.3,
      "popChangePct": 1.59
    },
    {
      "year": 1996,
      "gdp": 22.324,
      "growth": 6.9,
      "perCapita": 2401.9,
      "popChangePct": 1.45
    },
    {
      "year": 1997,
      "gdp": 21.762,
      "growth": 5.7,
      "perCapita": 2309.8,
      "popChangePct": 1.37
    },
    {
      "year": 1998,
      "gdp": 22.87,
      "growth": 5,
      "perCapita": 2396.8,
      "popChangePct": 1.28
    },
    {
      "year": 1999,
      "gdp": 24.066,
      "growth": 6,
      "perCapita": 2492.3,
      "popChangePct": 1.19
    },
    {
      "year": 2000,
      "gdp": 22.524,
      "growth": 4.3,
      "perCapita": 2306.6,
      "popChangePct": 1.13
    },
    {
      "year": 2001,
      "gdp": 23.146,
      "growth": 3.8,
      "perCapita": 2345.1,
      "popChangePct": 1.08
    },
    {
      "year": 2002,
      "gdp": 24.274,
      "growth": 1.3,
      "perCapita": 2434.3,
      "popChangePct": 1.03
    },
    {
      "year": 2003,
      "gdp": 28.797,
      "growth": 4.7,
      "perCapita": 2859.2,
      "popChangePct": 1.0
    },
    {
      "year": 2004,
      "gdp": 32.71,
      "growth": 6.2,
      "perCapita": 3217.5,
      "popChangePct": 0.93
    },
    {
      "year": 2005,
      "gdp": 33.851,
      "growth": 3.5,
      "perCapita": 3300.8,
      "popChangePct": 0.88
    },
    {
      "year": 2006,
      "gdp": 36.059,
      "growth": 5.2,
      "perCapita": 3485.1,
      "popChangePct": 0.89
    },
    {
      "year": 2007,
      "gdp": 40.819,
      "growth": 6.7,
      "perCapita": 3909.3,
      "popChangePct": 0.93
    },
    {
      "year": 2008,
      "gdp": 47.039,
      "growth": 4.2,
      "perCapita": 4461.7,
      "popChangePct": 0.97
    },
    {
      "year": 2009,
      "gdp": 45.593,
      "growth": 3,
      "perCapita": 4280.7,
      "popChangePct": 1.02
    },
    {
      "year": 2010,
      "gdp": 46.21,
      "growth": 3.5,
      "perCapita": 4292.2,
      "popChangePct": 1.08
    },
    {
      "year": 2011,
      "gdp": 48.122,
      "growth": -2,
      "perCapita": 4420.5,
      "popChangePct": 1.11
    },
    {
      "year": 2012,
      "gdp": 47.311,
      "growth": 4.2,
      "perCapita": 4297.3,
      "popChangePct": 1.14
    },
    {
      "year": 2013,
      "gdp": 48.681,
      "growth": 2.4,
      "perCapita": 4369.4,
      "popChangePct": 1.19
    },
    {
      "year": 2014,
      "gdp": 50.273,
      "growth": 3.1,
      "perCapita": 4459.1,
      "popChangePct": 1.19
    },
    {
      "year": 2015,
      "gdp": 45.779,
      "growth": 1,
      "perCapita": 4014.9,
      "popChangePct": 1.14
    },
    {
      "year": 2016,
      "gdp": 44.36,
      "growth": 1.1,
      "perCapita": 3847.8,
      "popChangePct": 1.11
    },
    {
      "year": 2017,
      "gdp": 42.167,
      "growth": 2.3,
      "perCapita": 3619.4,
      "popChangePct": 1.05
    },
    {
      "year": 2018,
      "gdp": 42.687,
      "growth": 2.6,
      "perCapita": 3628.1,
      "popChangePct": 1.0
    },
    {
      "year": 2019,
      "gdp": 41.905,
      "growth": 1.6,
      "perCapita": 3528.8,
      "popChangePct": 0.93
    },
    {
      "year": 2020,
      "gdp": 42.494,
      "growth": -9,
      "perCapita": 3548.8,
      "popChangePct": 0.83
    },
    {
      "year": 2021,
      "gdp": 46.813,
      "growth": 4.7,
      "perCapita": 3885.4,
      "popChangePct": 0.63
    },
    {
      "year": 2022,
      "gdp": 44.596,
      "growth": 2.7,
      "perCapita": 3679.7,
      "popChangePct": 0.58
    },
    {
      "year": 2023,
      "gdp": 48.54,
      "growth": 0.2,
      "perCapita": 3978.5,
      "popChangePct": 0.67
    },
    {
      "year": 2024,
      "gdp": 51.331,
      "growth": 1.6,
      "perCapita": 4181.1,
      "popChangePct": 0.63
    },
    {
      "year": 2025,
      "gdp": 57.589,
      "growth": 2.5,
      "perCapita": 4663.6,
      "popChangePct": 0.59
    },
    {
      "year": 2026,
      "gdp": 60.745,
      "growth": 2.1,
      "perCapita": 4892.8,
      "popChangePct": 0.53
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 59.061,
      "growth": 1.6,
      "perCapita": 4733.9,
      "popChangePct": 0.49
    },
    {
      "year": 2028,
      "gdp": 59.611,
      "growth": 1.5,
      "perCapita": 4756.7,
      "popChangePct": 0.45
    },
    {
      "year": 2029,
      "gdp": 60.631,
      "growth": 1.5,
      "perCapita": 4818.6,
      "popChangePct": 0.41
    },
    {
      "year": 2030,
      "gdp": 61.553,
      "growth": 1.5,
      "perCapita": 4874.3,
      "popChangePct": 0.36
    },
    {
      "year": 2031,
      "gdp": 62.669,
      "growth": 1.5,
      "perCapita": 4946.3,
      "popChangePct": 0.33
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 13.337,
      "perCapitaPPP": 2044.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 15.405,
      "perCapitaPPP": 2296.9,
      "perCapitaPPPChangePct": 12.34,
      "popChangePct": 2.82
    },
    {
      "year": 1982,
      "gdpPPP": 16.279,
      "perCapitaPPP": 2369.4,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 2.43
    },
    {
      "year": 1983,
      "gdpPPP": 17.707,
      "perCapitaPPP": 2517.4,
      "perCapitaPPPChangePct": 6.25,
      "popChangePct": 2.39
    },
    {
      "year": 1984,
      "gdpPPP": 19.397,
      "perCapitaPPP": 2726.1,
      "perCapitaPPPChangePct": 8.29,
      "popChangePct": 1.15
    },
    {
      "year": 1985,
      "gdpPPP": 21.145,
      "perCapitaPPP": 2876.8,
      "perCapitaPPPChangePct": 5.53,
      "popChangePct": 3.3
    },
    {
      "year": 1986,
      "gdpPPP": 21.257,
      "perCapitaPPP": 2783.8,
      "perCapitaPPPChangePct": -3.23,
      "popChangePct": 3.89
    },
    {
      "year": 1987,
      "gdpPPP": 23.244,
      "perCapitaPPP": 2980.2,
      "perCapitaPPPChangePct": 7.06,
      "popChangePct": 2.13
    },
    {
      "year": 1988,
      "gdpPPP": 24.08,
      "perCapitaPPP": 3035.8,
      "perCapitaPPPChangePct": 1.87,
      "popChangePct": 1.71
    },
    {
      "year": 1989,
      "gdpPPP": 25.67,
      "perCapitaPPP": 3179.0,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 1.8
    },
    {
      "year": 1990,
      "gdpPPP": 28.515,
      "perCapitaPPP": 3425.4,
      "perCapitaPPPChangePct": 7.75,
      "popChangePct": 3.1
    },
    {
      "year": 1991,
      "gdpPPP": 30.699,
      "perCapitaPPP": 3610.9,
      "perCapitaPPPChangePct": 5.42,
      "popChangePct": 2.13
    },
    {
      "year": 1992,
      "gdpPPP": 33.914,
      "perCapitaPPP": 3906.0,
      "perCapitaPPPChangePct": 8.17,
      "popChangePct": 2.13
    },
    {
      "year": 1993,
      "gdpPPP": 35.577,
      "perCapitaPPP": 4016.4,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": 2.02
    },
    {
      "year": 1994,
      "gdpPPP": 37.655,
      "perCapitaPPP": 4175.4,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 1.81
    },
    {
      "year": 1995,
      "gdpPPP": 39.472,
      "perCapitaPPP": 4308.5,
      "perCapitaPPPChangePct": 3.19,
      "popChangePct": 1.59
    },
    {
      "year": 1996,
      "gdpPPP": 42.95,
      "perCapitaPPP": 4621.0,
      "perCapitaPPPChangePct": 7.25,
      "popChangePct": 1.45
    },
    {
      "year": 1997,
      "gdpPPP": 46.191,
      "perCapitaPPP": 4902.9,
      "perCapitaPPPChangePct": 6.1,
      "popChangePct": 1.37
    },
    {
      "year": 1998,
      "gdpPPP": 49.029,
      "perCapitaPPP": 5138.4,
      "perCapitaPPPChangePct": 4.8,
      "popChangePct": 1.28
    },
    {
      "year": 1999,
      "gdpPPP": 52.715,
      "perCapitaPPP": 5459.3,
      "perCapitaPPPChangePct": 6.24,
      "popChangePct": 1.19
    },
    {
      "year": 2000,
      "gdpPPP": 56.227,
      "perCapitaPPP": 5758.0,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 1.13
    },
    {
      "year": 2001,
      "gdpPPP": 59.675,
      "perCapitaPPP": 6046.3,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 1.08
    },
    {
      "year": 2002,
      "gdpPPP": 61.404,
      "perCapitaPPP": 6158.0,
      "perCapitaPPPChangePct": 1.85,
      "popChangePct": 1.03
    },
    {
      "year": 2003,
      "gdpPPP": 65.561,
      "perCapitaPPP": 6509.5,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 1.0
    },
    {
      "year": 2004,
      "gdpPPP": 71.522,
      "perCapitaPPP": 7035.3,
      "perCapitaPPPChangePct": 8.08,
      "popChangePct": 0.93
    },
    {
      "year": 2005,
      "gdpPPP": 76.337,
      "perCapitaPPP": 7443.5,
      "perCapitaPPPChangePct": 5.8,
      "popChangePct": 0.88
    },
    {
      "year": 2006,
      "gdpPPP": 82.817,
      "perCapitaPPP": 8004.4,
      "perCapitaPPPChangePct": 7.54,
      "popChangePct": 0.89
    },
    {
      "year": 2007,
      "gdpPPP": 90.768,
      "perCapitaPPP": 8692.9,
      "perCapitaPPPChangePct": 8.6,
      "popChangePct": 0.93
    },
    {
      "year": 2008,
      "gdpPPP": 96.437,
      "perCapitaPPP": 9147.4,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": 0.97
    },
    {
      "year": 2009,
      "gdpPPP": 99.985,
      "perCapitaPPP": 9387.7,
      "perCapitaPPPChangePct": 2.63,
      "popChangePct": 1.02
    },
    {
      "year": 2010,
      "gdpPPP": 104.754,
      "perCapitaPPP": 9730.1,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 1.08
    },
    {
      "year": 2011,
      "gdpPPP": 104.727,
      "perCapitaPPP": 9620.3,
      "perCapitaPPPChangePct": -1.13,
      "popChangePct": 1.11
    },
    {
      "year": 2012,
      "gdpPPP": 111.175,
      "perCapitaPPP": 10098.0,
      "perCapitaPPPChangePct": 4.97,
      "popChangePct": 1.14
    },
    {
      "year": 2013,
      "gdpPPP": 115.815,
      "perCapitaPPP": 10395.0,
      "perCapitaPPPChangePct": 2.94,
      "popChangePct": 1.19
    },
    {
      "year": 2014,
      "gdpPPP": 121.473,
      "perCapitaPPP": 10774.4,
      "perCapitaPPPChangePct": 3.65,
      "popChangePct": 1.19
    },
    {
      "year": 2015,
      "gdpPPP": 123.787,
      "perCapitaPPP": 10856.4,
      "perCapitaPPPChangePct": 0.76,
      "popChangePct": 1.14
    },
    {
      "year": 2016,
      "gdpPPP": 126.36,
      "perCapitaPPP": 10960.5,
      "perCapitaPPPChangePct": 0.96,
      "popChangePct": 1.11
    },
    {
      "year": 2017,
      "gdpPPP": 131.52,
      "perCapitaPPP": 11288.8,
      "perCapitaPPPChangePct": 3.0,
      "popChangePct": 1.05
    },
    {
      "year": 2018,
      "gdpPPP": 139.32,
      "perCapitaPPP": 11841.4,
      "perCapitaPPPChangePct": 4.9,
      "popChangePct": 1.0
    },
    {
      "year": 2019,
      "gdpPPP": 148.377,
      "perCapitaPPP": 12494.8,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 0.93
    },
    {
      "year": 2020,
      "gdpPPP": 142.71,
      "perCapitaPPP": 11918.3,
      "perCapitaPPPChangePct": -4.61,
      "popChangePct": 0.83
    },
    {
      "year": 2021,
      "gdpPPP": 149.106,
      "perCapitaPPP": 12375.4,
      "perCapitaPPPChangePct": 3.84,
      "popChangePct": 0.63
    },
    {
      "year": 2022,
      "gdpPPP": 163.982,
      "perCapitaPPP": 13530.6,
      "perCapitaPPPChangePct": 9.33,
      "popChangePct": 0.58
    },
    {
      "year": 2023,
      "gdpPPP": 170.457,
      "perCapitaPPP": 13971.4,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.67
    },
    {
      "year": 2024,
      "gdpPPP": 177.546,
      "perCapitaPPP": 14461.6,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 0.63
    },
    {
      "year": 2025,
      "gdpPPP": 187.135,
      "perCapitaPPP": 15154.4,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.59
    },
    {
      "year": 2026,
      "gdpPPP": 196.564,
      "perCapitaPPP": 15832.6,
      "perCapitaPPPChangePct": 4.48,
      "popChangePct": 0.53
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 204.141,
      "perCapitaPPP": 16362.5,
      "perCapitaPPPChangePct": 3.35,
      "popChangePct": 0.49
    },
    {
      "year": 2028,
      "gdpPPP": 210.691,
      "perCapitaPPP": 16812.3,
      "perCapitaPPPChangePct": 2.75,
      "popChangePct": 0.45
    },
    {
      "year": 2029,
      "gdpPPP": 217.734,
      "perCapitaPPP": 17304.2,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": 0.41
    },
    {
      "year": 2030,
      "gdpPPP": 225.141,
      "perCapitaPPP": 17828.5,
      "perCapitaPPPChangePct": 3.03,
      "popChangePct": 0.36
    },
    {
      "year": 2031,
      "gdpPPP": 232.713,
      "perCapitaPPP": 18367.4,
      "perCapitaPPPChangePct": 3.02,
      "popChangePct": 0.33
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function TunisiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
