import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Kuwait",
  "slug": "kuwait",
  "iso3": "KWT",
  "region": "Asia",
  "rank2026": 62,
  "flagEmoji": "🇰🇼",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Uzbekistan",
      "slug": "uzbekistan",
      "rank": 61
    },
    {
      "name": "Slovakia",
      "slug": "slovakia",
      "rank": 63
    }
  ],
  "history": [
    {
      "year": 1981,
      "gdp": 25.249,
      "growth": null,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 21.583,
      "growth": -9.5,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdp": 20.871,
      "growth": 5.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdp": 21.7,
      "growth": 5.2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdp": 21.445,
      "growth": -4.3,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdp": 17.904,
      "growth": 8.6,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdp": 22.368,
      "growth": 8.1,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdp": 20.69,
      "growth": -10,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdp": 24.313,
      "growth": 25.9,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdp": 18.239,
      "growth": -26.2,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdp": 10.791,
      "growth": -41,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdp": 19.871,
      "growth": 82.8,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdp": 23.955,
      "growth": 35.1,
      "perCapita": 15825.2,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdp": 24.859,
      "growth": 8.6,
      "perCapita": 14766.8,
      "popChangePct": 11.16
    },
    {
      "year": 1995,
      "gdp": 27.186,
      "growth": 1.7,
      "perCapita": 15088.4,
      "popChangePct": 7.07
    },
    {
      "year": 1996,
      "gdp": 31.491,
      "growth": 0.6,
      "perCapita": 16623.5,
      "popChangePct": 5.11
    },
    {
      "year": 1997,
      "gdp": 30.35,
      "growth": 2.5,
      "perCapita": 15330.4,
      "popChangePct": 4.54
    },
    {
      "year": 1998,
      "gdp": 25.941,
      "growth": 3.7,
      "perCapita": 12797.0,
      "popChangePct": 2.37
    },
    {
      "year": 1999,
      "gdp": 30.126,
      "growth": -1.8,
      "perCapita": 14296.6,
      "popChangePct": 3.95
    },
    {
      "year": 2000,
      "gdp": 37.714,
      "growth": 4.7,
      "perCapita": 17639.1,
      "popChangePct": 1.47
    },
    {
      "year": 2001,
      "gdp": 34.906,
      "growth": 0.2,
      "perCapita": 15992.7,
      "popChangePct": 2.1
    },
    {
      "year": 2002,
      "gdp": 38.129,
      "growth": 3,
      "perCapita": 16856.6,
      "popChangePct": 3.62
    },
    {
      "year": 2003,
      "gdp": 47.869,
      "growth": 17.3,
      "perCapita": 20585.0,
      "popChangePct": 2.79
    },
    {
      "year": 2004,
      "gdp": 59.439,
      "growth": 10.2,
      "perCapita": 24863.8,
      "popChangePct": 2.84
    },
    {
      "year": 2005,
      "gdp": 80.799,
      "growth": 10.6,
      "perCapita": 35990.6,
      "popChangePct": -6.11
    },
    {
      "year": 2006,
      "gdp": 101.548,
      "growth": 7.5,
      "perCapita": 43618.3,
      "popChangePct": 3.7
    },
    {
      "year": 2007,
      "gdp": 114.608,
      "growth": 6,
      "perCapita": 47539.0,
      "popChangePct": 3.57
    },
    {
      "year": 2008,
      "gdp": 147.391,
      "growth": 2.5,
      "perCapita": 53059.2,
      "popChangePct": 15.22
    },
    {
      "year": 2009,
      "gdp": 105.992,
      "growth": -7.1,
      "perCapita": 38156.1,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 115.401,
      "growth": -2.4,
      "perCapita": 39342.1,
      "popChangePct": 5.58
    },
    {
      "year": 2011,
      "gdp": 154.02,
      "growth": 9.6,
      "perCapita": 47440.1,
      "popChangePct": 10.71
    },
    {
      "year": 2012,
      "gdp": 174.066,
      "growth": 6.6,
      "perCapita": 50783.7,
      "popChangePct": 5.57
    },
    {
      "year": 2013,
      "gdp": 174.179,
      "growth": 1.1,
      "perCapita": 48543.7,
      "popChangePct": 4.67
    },
    {
      "year": 2014,
      "gdp": 162.695,
      "growth": 0.5,
      "perCapita": 43458.8,
      "popChangePct": 4.35
    },
    {
      "year": 2015,
      "gdp": 114.606,
      "growth": 0.6,
      "perCapita": 29195.3,
      "popChangePct": 4.83
    },
    {
      "year": 2016,
      "gdp": 109.399,
      "growth": 2.9,
      "perCapita": 26795.7,
      "popChangePct": 4.03
    },
    {
      "year": 2017,
      "gdp": 120.688,
      "growth": -4.7,
      "perCapita": 28552.2,
      "popChangePct": 3.53
    },
    {
      "year": 2018,
      "gdp": 138.655,
      "growth": 2.7,
      "perCapita": 31369.2,
      "popChangePct": 4.57
    },
    {
      "year": 2019,
      "gdp": 140.855,
      "growth": 2.3,
      "perCapita": 31549.9,
      "popChangePct": 1.02
    },
    {
      "year": 2020,
      "gdp": 111.048,
      "growth": -4.8,
      "perCapita": 25610.7,
      "popChangePct": -2.89
    },
    {
      "year": 2021,
      "gdp": 148.346,
      "growth": 1.7,
      "perCapita": 33824.9,
      "popChangePct": 1.15
    },
    {
      "year": 2022,
      "gdp": 183.539,
      "growth": 6.8,
      "perCapita": 38288.6,
      "popChangePct": 9.3
    },
    {
      "year": 2023,
      "gdp": 165.474,
      "growth": -1.6,
      "perCapita": 33679.0,
      "popChangePct": 2.48
    },
    {
      "year": 2024,
      "gdp": 160.902,
      "growth": -1.5,
      "perCapita": 32106.3,
      "popChangePct": 2.02
    },
    {
      "year": 2025,
      "gdp": 157.835,
      "growth": 3.5,
      "perCapita": 30876.9,
      "popChangePct": 2.0
    },
    {
      "year": 2026,
      "gdp": 172.92,
      "growth": -0.6,
      "perCapita": 33164.5,
      "popChangePct": 2.0
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 174.746,
      "growth": 2.8,
      "perCapita": 32857.6,
      "popChangePct": 1.99
    },
    {
      "year": 2028,
      "gdp": 180.084,
      "growth": 2.5,
      "perCapita": 33197.4,
      "popChangePct": 2.01
    },
    {
      "year": 2029,
      "gdp": 186.64,
      "growth": 2.4,
      "perCapita": 33731.4,
      "popChangePct": 1.99
    },
    {
      "year": 2030,
      "gdp": 193.409,
      "growth": 2.4,
      "perCapita": 34269.4,
      "popChangePct": 2.01
    },
    {
      "year": 2031,
      "gdp": 200.267,
      "growth": 2.4,
      "perCapita": 34788.6,
      "popChangePct": 2.0
    }
  ],
  "pppHistory": [
    {
      "year": 1981,
      "gdpPPP": 27.307,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 26.239,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1983,
      "gdpPPP": 28.698,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1984,
      "gdpPPP": 31.292,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1985,
      "gdpPPP": 30.907,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1986,
      "gdpPPP": 34.23,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1987,
      "gdpPPP": 37.935,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1988,
      "gdpPPP": 35.326,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1989,
      "gdpPPP": 46.218,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1990,
      "gdpPPP": 35.371,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1991,
      "gdpPPP": 21.572,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1992,
      "gdpPPP": 40.334,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1993,
      "gdpPPP": 55.796,
      "perCapitaPPP": 36860.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1994,
      "gdpPPP": 61.898,
      "perCapitaPPP": 36768.6,
      "perCapitaPPPChangePct": -0.25,
      "popChangePct": 11.16
    },
    {
      "year": 1995,
      "gdpPPP": 64.25,
      "perCapitaPPP": 35659.0,
      "perCapitaPPPChangePct": -3.02,
      "popChangePct": 7.07
    },
    {
      "year": 1996,
      "gdpPPP": 65.818,
      "perCapitaPPP": 34744.0,
      "perCapitaPPPChangePct": -2.57,
      "popChangePct": 5.11
    },
    {
      "year": 1997,
      "gdpPPP": 68.622,
      "perCapitaPPP": 34663.0,
      "perCapitaPPPChangePct": -0.23,
      "popChangePct": 4.54
    },
    {
      "year": 1998,
      "gdpPPP": 71.929,
      "perCapitaPPP": 35483.6,
      "perCapitaPPPChangePct": 2.37,
      "popChangePct": 2.37
    },
    {
      "year": 1999,
      "gdpPPP": 71.642,
      "perCapitaPPP": 33998.8,
      "perCapitaPPPChangePct": -4.18,
      "popChangePct": 3.95
    },
    {
      "year": 2000,
      "gdpPPP": 76.701,
      "perCapitaPPP": 35873.1,
      "perCapitaPPPChangePct": 5.51,
      "popChangePct": 1.47
    },
    {
      "year": 2001,
      "gdpPPP": 78.595,
      "perCapitaPPP": 36009.7,
      "perCapitaPPPChangePct": 0.38,
      "popChangePct": 2.1
    },
    {
      "year": 2002,
      "gdpPPP": 82.222,
      "perCapitaPPP": 36350.2,
      "perCapitaPPPChangePct": 0.95,
      "popChangePct": 3.62
    },
    {
      "year": 2003,
      "gdpPPP": 98.373,
      "perCapitaPPP": 42302.9,
      "perCapitaPPPChangePct": 16.38,
      "popChangePct": 2.79
    },
    {
      "year": 2004,
      "gdpPPP": 111.362,
      "perCapitaPPP": 46583.7,
      "perCapitaPPPChangePct": 10.12,
      "popChangePct": 2.84
    },
    {
      "year": 2005,
      "gdpPPP": 127.04,
      "perCapitaPPP": 56587.9,
      "perCapitaPPPChangePct": 21.48,
      "popChangePct": -6.11
    },
    {
      "year": 2006,
      "gdpPPP": 140.798,
      "perCapitaPPP": 60477.4,
      "perCapitaPPPChangePct": 6.87,
      "popChangePct": 3.7
    },
    {
      "year": 2007,
      "gdpPPP": 153.278,
      "perCapitaPPP": 63578.8,
      "perCapitaPPPChangePct": 5.13,
      "popChangePct": 3.57
    },
    {
      "year": 2008,
      "gdpPPP": 160.105,
      "perCapitaPPP": 57635.9,
      "perCapitaPPPChangePct": -9.35,
      "popChangePct": 15.22
    },
    {
      "year": 2009,
      "gdpPPP": 149.693,
      "perCapitaPPP": 53887.9,
      "perCapitaPPPChangePct": -6.5,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 147.921,
      "perCapitaPPP": 50428.6,
      "perCapitaPPPChangePct": -6.42,
      "popChangePct": 5.58
    },
    {
      "year": 2011,
      "gdpPPP": 165.509,
      "perCapitaPPP": 50978.8,
      "perCapitaPPPChangePct": 1.09,
      "popChangePct": 10.71
    },
    {
      "year": 2012,
      "gdpPPP": 179.762,
      "perCapitaPPP": 52445.6,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 5.57
    },
    {
      "year": 2013,
      "gdpPPP": 184.922,
      "perCapitaPPP": 51537.8,
      "perCapitaPPPChangePct": -1.73,
      "popChangePct": 4.67
    },
    {
      "year": 2014,
      "gdpPPP": 189.086,
      "perCapitaPPP": 50508.3,
      "perCapitaPPPChangePct": -2.0,
      "popChangePct": 4.35
    },
    {
      "year": 2015,
      "gdpPPP": 191.972,
      "perCapitaPPP": 48904.0,
      "perCapitaPPPChangePct": -3.18,
      "popChangePct": 4.83
    },
    {
      "year": 2016,
      "gdpPPP": 199.467,
      "perCapitaPPP": 48856.6,
      "perCapitaPPPChangePct": -0.1,
      "popChangePct": 4.03
    },
    {
      "year": 2017,
      "gdpPPP": 193.471,
      "perCapitaPPP": 45771.2,
      "perCapitaPPPChangePct": -6.32,
      "popChangePct": 3.53
    },
    {
      "year": 2018,
      "gdpPPP": 222.102,
      "perCapitaPPP": 50248.1,
      "perCapitaPPPChangePct": 9.78,
      "popChangePct": 4.57
    },
    {
      "year": 2019,
      "gdpPPP": 225.239,
      "perCapitaPPP": 50450.9,
      "perCapitaPPPChangePct": 0.4,
      "popChangePct": 1.02
    },
    {
      "year": 2020,
      "gdpPPP": 182.443,
      "perCapitaPPP": 42076.2,
      "perCapitaPPPChangePct": -16.6,
      "popChangePct": -2.89
    },
    {
      "year": 2021,
      "gdpPPP": 220.886,
      "perCapitaPPP": 50364.9,
      "perCapitaPPPChangePct": 19.7,
      "popChangePct": 1.15
    },
    {
      "year": 2022,
      "gdpPPP": 252.595,
      "perCapitaPPP": 52694.6,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 9.3
    },
    {
      "year": 2023,
      "gdpPPP": 257.64,
      "perCapitaPPP": 52437.7,
      "perCapitaPPPChangePct": -0.49,
      "popChangePct": 2.48
    },
    {
      "year": 2024,
      "gdpPPP": 260.144,
      "perCapitaPPP": 51909.0,
      "perCapitaPPPChangePct": -1.01,
      "popChangePct": 2.02
    },
    {
      "year": 2025,
      "gdpPPP": 276.802,
      "perCapitaPPP": 54149.9,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 2.0
    },
    {
      "year": 2026,
      "gdpPPP": 283.133,
      "perCapitaPPP": 54302.5,
      "perCapitaPPPChangePct": 0.28,
      "popChangePct": 2.0
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 297.485,
      "perCapitaPPP": 55936.2,
      "perCapitaPPPChangePct": 3.01,
      "popChangePct": 1.99
    },
    {
      "year": 2028,
      "gdpPPP": 309.941,
      "perCapitaPPP": 57135.7,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 2.01
    },
    {
      "year": 2029,
      "gdpPPP": 323.089,
      "perCapitaPPP": 58391.6,
      "perCapitaPPPChangePct": 2.2,
      "popChangePct": 1.99
    },
    {
      "year": 2030,
      "gdpPPP": 336.871,
      "perCapitaPPP": 59688.7,
      "perCapitaPPPChangePct": 2.22,
      "popChangePct": 2.01
    },
    {
      "year": 2031,
      "gdpPPP": 351.146,
      "perCapitaPPP": 60998.0,
      "perCapitaPPPChangePct": 2.19,
      "popChangePct": 2.0
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function KuwaitGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
