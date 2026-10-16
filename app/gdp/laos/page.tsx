import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Laos",
  "slug": "laos",
  "iso3": "LAO",
  "region": "Asia",
  "rank2026": 141,
  "flagEmoji": "🇱🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Afghanistan",
      "slug": "afghanistan",
      "rank": 140
    },
    {
      "name": "Malawi",
      "slug": "malawi",
      "rank": 142
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.913,
      "growth": 10,
      "perCapita": 584.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.118,
      "growth": 15.3,
      "perCapita": 335.2,
      "popChangePct": 1.93
    },
    {
      "year": 1982,
      "gdp": 1.119,
      "growth": 4.7,
      "perCapita": 327.9,
      "popChangePct": 2.31
    },
    {
      "year": 1983,
      "gdp": 2.047,
      "growth": 3,
      "perCapita": 584.8,
      "popChangePct": 2.58
    },
    {
      "year": 1984,
      "gdp": 2.93,
      "growth": 6.4,
      "perCapita": 815.2,
      "popChangePct": 2.71
    },
    {
      "year": 1985,
      "gdp": 3.685,
      "growth": 9.1,
      "perCapita": 997.6,
      "popChangePct": 2.75
    },
    {
      "year": 1986,
      "gdp": 2.577,
      "growth": 4.8,
      "perCapita": 678.5,
      "popChangePct": 2.82
    },
    {
      "year": 1987,
      "gdp": 1.815,
      "growth": -1,
      "perCapita": 464.7,
      "popChangePct": 2.84
    },
    {
      "year": 1988,
      "gdp": 1.182,
      "growth": -2.1,
      "perCapita": 294.2,
      "popChangePct": 2.87
    },
    {
      "year": 1989,
      "gdp": 1.46,
      "growth": 9.9,
      "perCapita": 353.3,
      "popChangePct": 2.86
    },
    {
      "year": 1990,
      "gdp": 1.742,
      "growth": 6.7,
      "perCapita": 406.2,
      "popChangePct": 3.77
    },
    {
      "year": 1991,
      "gdp": 2.053,
      "growth": 4,
      "perCapita": 464.9,
      "popChangePct": 2.96
    },
    {
      "year": 1992,
      "gdp": 2.354,
      "growth": 7,
      "perCapita": 517.9,
      "popChangePct": 2.92
    },
    {
      "year": 1993,
      "gdp": 2.652,
      "growth": 5.9,
      "perCapita": 567.2,
      "popChangePct": 2.86
    },
    {
      "year": 1994,
      "gdp": 3.081,
      "growth": 8.2,
      "perCapita": 641.6,
      "popChangePct": 2.7
    },
    {
      "year": 1995,
      "gdp": 3.579,
      "growth": 7,
      "perCapita": 727.1,
      "popChangePct": 2.54
    },
    {
      "year": 1996,
      "gdp": 3.726,
      "growth": 6.9,
      "perCapita": 739.3,
      "popChangePct": 2.36
    },
    {
      "year": 1997,
      "gdp": 3.515,
      "growth": 6.9,
      "perCapita": 682.5,
      "popChangePct": 2.22
    },
    {
      "year": 1998,
      "gdp": 1.334,
      "growth": 4.3,
      "perCapita": 254.2,
      "popChangePct": 1.86
    },
    {
      "year": 1999,
      "gdp": 1.415,
      "growth": 4,
      "perCapita": 264.9,
      "popChangePct": 1.77
    },
    {
      "year": 2000,
      "gdp": 1.72,
      "growth": 6.4,
      "perCapita": 316.7,
      "popChangePct": 1.7
    },
    {
      "year": 2001,
      "gdp": 1.757,
      "growth": 4.8,
      "perCapita": 318.3,
      "popChangePct": 1.64
    },
    {
      "year": 2002,
      "gdp": 1.844,
      "growth": 6.8,
      "perCapita": 328.9,
      "popChangePct": 1.56
    },
    {
      "year": 2003,
      "gdp": 2.26,
      "growth": 6.2,
      "perCapita": 397.3,
      "popChangePct": 1.48
    },
    {
      "year": 2004,
      "gdp": 2.651,
      "growth": 7.2,
      "perCapita": 459.6,
      "popChangePct": 1.39
    },
    {
      "year": 2005,
      "gdp": 3.079,
      "growth": 6.9,
      "perCapita": 526.0,
      "popChangePct": 1.47
    },
    {
      "year": 2006,
      "gdp": 3.934,
      "growth": 9,
      "perCapita": 661.6,
      "popChangePct": 1.61
    },
    {
      "year": 2007,
      "gdp": 4.757,
      "growth": 7.9,
      "perCapita": 787.4,
      "popChangePct": 1.58
    },
    {
      "year": 2008,
      "gdp": 5.946,
      "growth": 7.8,
      "perCapita": 969.1,
      "popChangePct": 1.57
    },
    {
      "year": 2009,
      "gdp": 6.431,
      "growth": 7.4,
      "perCapita": 1032.3,
      "popChangePct": 1.53
    },
    {
      "year": 2010,
      "gdp": 7.506,
      "growth": 8,
      "perCapita": 1187.0,
      "popChangePct": 1.49
    },
    {
      "year": 2011,
      "gdp": 8.964,
      "growth": 8,
      "perCapita": 1397.0,
      "popChangePct": 1.47
    },
    {
      "year": 2012,
      "gdp": 10.194,
      "growth": 7.8,
      "perCapita": 1566.2,
      "popChangePct": 1.45
    },
    {
      "year": 2013,
      "gdp": 11.972,
      "growth": 8,
      "perCapita": 1813.8,
      "popChangePct": 1.41
    },
    {
      "year": 2014,
      "gdp": 13.266,
      "growth": 7.6,
      "perCapita": 1982.5,
      "popChangePct": 1.36
    },
    {
      "year": 2015,
      "gdp": 14.418,
      "growth": 7.3,
      "perCapita": 2124.3,
      "popChangePct": 1.43
    },
    {
      "year": 2016,
      "gdp": 15.904,
      "growth": 7,
      "perCapita": 2307.8,
      "popChangePct": 1.53
    },
    {
      "year": 2017,
      "gdp": 17.055,
      "growth": 6.9,
      "perCapita": 2437.1,
      "popChangePct": 1.55
    },
    {
      "year": 2018,
      "gdp": 18.131,
      "growth": 6.2,
      "perCapita": 2551.8,
      "popChangePct": 1.53
    },
    {
      "year": 2019,
      "gdp": 18.77,
      "growth": 4.7,
      "perCapita": 2602.6,
      "popChangePct": 1.51
    },
    {
      "year": 2020,
      "gdp": 18.511,
      "growth": -0.4,
      "perCapita": 2529.0,
      "popChangePct": 1.48
    },
    {
      "year": 2021,
      "gdp": 18.533,
      "growth": 2.1,
      "perCapita": 2496.0,
      "popChangePct": 1.45
    },
    {
      "year": 2022,
      "gdp": 15.121,
      "growth": 2.3,
      "perCapita": 2022.4,
      "popChangePct": 0.7
    },
    {
      "year": 2023,
      "gdp": 14.993,
      "growth": 3.7,
      "perCapita": 1977.5,
      "popChangePct": 1.4
    },
    {
      "year": 2024,
      "gdp": 15.792,
      "growth": 4.3,
      "perCapita": 2054.8,
      "popChangePct": 1.37
    },
    {
      "year": 2025,
      "gdp": 17.822,
      "growth": 4.8,
      "perCapita": 2288.4,
      "popChangePct": 1.33
    },
    {
      "year": 2026,
      "gdp": 18.959,
      "growth": 4,
      "perCapita": 2403.3,
      "popChangePct": 1.3
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 20.087,
      "growth": 4,
      "perCapita": 2514.6,
      "popChangePct": 1.25
    },
    {
      "year": 2028,
      "gdp": 21.238,
      "growth": 3.5,
      "perCapita": 2626.5,
      "popChangePct": 1.23
    },
    {
      "year": 2029,
      "gdp": 22.319,
      "growth": 3,
      "perCapita": 2727.9,
      "popChangePct": 1.19
    },
    {
      "year": 2030,
      "gdp": 23.412,
      "growth": 3,
      "perCapita": 2829.1,
      "popChangePct": 1.15
    },
    {
      "year": 2031,
      "gdp": 24.522,
      "growth": 3,
      "perCapita": 2930.8,
      "popChangePct": 1.1
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.916,
      "perCapitaPPP": 585.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.418,
      "perCapitaPPP": 725.2,
      "perCapitaPPPChangePct": 23.87,
      "popChangePct": 1.93
    },
    {
      "year": 1982,
      "gdpPPP": 2.689,
      "perCapitaPPP": 788.1,
      "perCapitaPPPChangePct": 8.68,
      "popChangePct": 2.31
    },
    {
      "year": 1983,
      "gdpPPP": 2.878,
      "perCapitaPPP": 822.4,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 2.58
    },
    {
      "year": 1984,
      "gdpPPP": 3.174,
      "perCapitaPPP": 882.9,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": 2.71
    },
    {
      "year": 1985,
      "gdpPPP": 3.573,
      "perCapitaPPP": 967.3,
      "perCapitaPPPChangePct": 9.55,
      "popChangePct": 2.75
    },
    {
      "year": 1986,
      "gdpPPP": 3.821,
      "perCapitaPPP": 1006.1,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 2.82
    },
    {
      "year": 1987,
      "gdpPPP": 3.878,
      "perCapitaPPP": 992.8,
      "perCapitaPPPChangePct": -1.32,
      "popChangePct": 2.84
    },
    {
      "year": 1988,
      "gdpPPP": 3.93,
      "perCapitaPPP": 978.2,
      "perCapitaPPPChangePct": -1.48,
      "popChangePct": 2.87
    },
    {
      "year": 1989,
      "gdpPPP": 4.488,
      "perCapitaPPP": 1086.0,
      "perCapitaPPPChangePct": 11.02,
      "popChangePct": 2.86
    },
    {
      "year": 1990,
      "gdpPPP": 4.968,
      "perCapitaPPP": 1158.2,
      "perCapitaPPPChangePct": 6.65,
      "popChangePct": 3.77
    },
    {
      "year": 1991,
      "gdpPPP": 5.341,
      "perCapitaPPP": 1209.5,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 2.96
    },
    {
      "year": 1992,
      "gdpPPP": 5.845,
      "perCapitaPPP": 1286.0,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 2.92
    },
    {
      "year": 1993,
      "gdpPPP": 6.335,
      "perCapitaPPP": 1355.1,
      "perCapitaPPPChangePct": 5.38,
      "popChangePct": 2.86
    },
    {
      "year": 1994,
      "gdpPPP": 6.998,
      "perCapitaPPP": 1457.5,
      "perCapitaPPPChangePct": 7.56,
      "popChangePct": 2.7
    },
    {
      "year": 1995,
      "gdpPPP": 7.648,
      "perCapitaPPP": 1553.6,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 2.54
    },
    {
      "year": 1996,
      "gdpPPP": 8.325,
      "perCapitaPPP": 1652.0,
      "perCapitaPPPChangePct": 6.34,
      "popChangePct": 2.36
    },
    {
      "year": 1997,
      "gdpPPP": 9.053,
      "perCapitaPPP": 1757.8,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 2.22
    },
    {
      "year": 1998,
      "gdpPPP": 9.547,
      "perCapitaPPP": 1819.5,
      "perCapitaPPPChangePct": 3.51,
      "popChangePct": 1.86
    },
    {
      "year": 1999,
      "gdpPPP": 10.072,
      "perCapitaPPP": 1886.1,
      "perCapitaPPPChangePct": 3.66,
      "popChangePct": 1.77
    },
    {
      "year": 2000,
      "gdpPPP": 10.962,
      "perCapitaPPP": 2018.5,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": 1.7
    },
    {
      "year": 2001,
      "gdpPPP": 11.744,
      "perCapitaPPP": 2127.7,
      "perCapitaPPPChangePct": 5.41,
      "popChangePct": 1.64
    },
    {
      "year": 2002,
      "gdpPPP": 12.739,
      "perCapitaPPP": 2272.3,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 1.56
    },
    {
      "year": 2003,
      "gdpPPP": 13.793,
      "perCapitaPPP": 2424.5,
      "perCapitaPPPChangePct": 6.7,
      "popChangePct": 1.48
    },
    {
      "year": 2004,
      "gdpPPP": 15.182,
      "perCapitaPPP": 2632.0,
      "perCapitaPPPChangePct": 8.56,
      "popChangePct": 1.39
    },
    {
      "year": 2005,
      "gdpPPP": 16.744,
      "perCapitaPPP": 2860.8,
      "perCapitaPPPChangePct": 8.7,
      "popChangePct": 1.47
    },
    {
      "year": 2006,
      "gdpPPP": 18.806,
      "perCapitaPPP": 3162.5,
      "perCapitaPPPChangePct": 10.55,
      "popChangePct": 1.61
    },
    {
      "year": 2007,
      "gdpPPP": 20.832,
      "perCapitaPPP": 3448.3,
      "perCapitaPPPChangePct": 9.04,
      "popChangePct": 1.58
    },
    {
      "year": 2008,
      "gdpPPP": 22.895,
      "perCapitaPPP": 3731.3,
      "perCapitaPPPChangePct": 8.21,
      "popChangePct": 1.57
    },
    {
      "year": 2009,
      "gdpPPP": 24.734,
      "perCapitaPPP": 3970.2,
      "perCapitaPPPChangePct": 6.4,
      "popChangePct": 1.53
    },
    {
      "year": 2010,
      "gdpPPP": 27.042,
      "perCapitaPPP": 4276.5,
      "perCapitaPPPChangePct": 7.71,
      "popChangePct": 1.49
    },
    {
      "year": 2011,
      "gdpPPP": 29.804,
      "perCapitaPPP": 4645.1,
      "perCapitaPPPChangePct": 8.62,
      "popChangePct": 1.47
    },
    {
      "year": 2012,
      "gdpPPP": 32.729,
      "perCapitaPPP": 5028.4,
      "perCapitaPPPChangePct": 8.25,
      "popChangePct": 1.45
    },
    {
      "year": 2013,
      "gdpPPP": 35.957,
      "perCapitaPPP": 5447.5,
      "perCapitaPPPChangePct": 8.33,
      "popChangePct": 1.41
    },
    {
      "year": 2014,
      "gdpPPP": 39.369,
      "perCapitaPPP": 5883.4,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 1.36
    },
    {
      "year": 2015,
      "gdpPPP": 42.623,
      "perCapitaPPP": 6279.6,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 1.43
    },
    {
      "year": 2016,
      "gdpPPP": 46.049,
      "perCapitaPPP": 6682.2,
      "perCapitaPPPChangePct": 6.41,
      "popChangePct": 1.53
    },
    {
      "year": 2017,
      "gdpPPP": 50.105,
      "perCapitaPPP": 7159.9,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 1.55
    },
    {
      "year": 2018,
      "gdpPPP": 53.367,
      "perCapitaPPP": 7511.2,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 1.53
    },
    {
      "year": 2019,
      "gdpPPP": 56.188,
      "perCapitaPPP": 7790.9,
      "perCapitaPPPChangePct": 3.72,
      "popChangePct": 1.51
    },
    {
      "year": 2020,
      "gdpPPP": 56.769,
      "perCapitaPPP": 7756.0,
      "perCapitaPPPChangePct": -0.45,
      "popChangePct": 1.48
    },
    {
      "year": 2021,
      "gdpPPP": 59.62,
      "perCapitaPPP": 8029.6,
      "perCapitaPPPChangePct": 3.53,
      "popChangePct": 1.45
    },
    {
      "year": 2022,
      "gdpPPP": 65.299,
      "perCapitaPPP": 8733.4,
      "perCapitaPPPChangePct": 8.76,
      "popChangePct": 0.7
    },
    {
      "year": 2023,
      "gdpPPP": 70.192,
      "perCapitaPPP": 9257.8,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 1.4
    },
    {
      "year": 2024,
      "gdpPPP": 75.027,
      "perCapitaPPP": 9762.1,
      "perCapitaPPPChangePct": 5.45,
      "popChangePct": 1.37
    },
    {
      "year": 2025,
      "gdpPPP": 80.837,
      "perCapitaPPP": 10380.0,
      "perCapitaPPPChangePct": 6.33,
      "popChangePct": 1.33
    },
    {
      "year": 2026,
      "gdpPPP": 86.49,
      "perCapitaPPP": 10963.6,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": 1.3
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 91.889,
      "perCapitaPPP": 11503.0,
      "perCapitaPPPChangePct": 4.92,
      "popChangePct": 1.25
    },
    {
      "year": 2028,
      "gdpPPP": 96.668,
      "perCapitaPPP": 11955.2,
      "perCapitaPPPChangePct": 3.93,
      "popChangePct": 1.23
    },
    {
      "year": 2029,
      "gdpPPP": 101.341,
      "perCapitaPPP": 12386.3,
      "perCapitaPPPChangePct": 3.61,
      "popChangePct": 1.19
    },
    {
      "year": 2030,
      "gdpPPP": 106.282,
      "perCapitaPPP": 12842.9,
      "perCapitaPPPChangePct": 3.69,
      "popChangePct": 1.15
    },
    {
      "year": 2031,
      "gdpPPP": 111.413,
      "perCapitaPPP": 13315.7,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 1.1
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LaosGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
