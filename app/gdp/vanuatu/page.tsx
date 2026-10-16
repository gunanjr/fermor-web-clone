import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Vanuatu",
  "slug": "vanuatu",
  "iso3": "VUT",
  "region": "Oceania",
  "rank2026": 200,
  "flagEmoji": "🇻🇺",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Grenada",
      "slug": "grenada",
      "rank": 199
    },
    {
      "name": "Samoa",
      "slug": "samoa",
      "rank": 201
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.134,
      "growth": 5.5,
      "perCapita": 1165.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.126,
      "growth": 4.4,
      "perCapita": 1057.7,
      "popChangePct": 3.48
    },
    {
      "year": 1982,
      "gdp": 0.127,
      "growth": 2,
      "perCapita": 1029.7,
      "popChangePct": 3.36
    },
    {
      "year": 1983,
      "gdp": 0.13,
      "growth": 3,
      "perCapita": 1030.6,
      "popChangePct": 2.44
    },
    {
      "year": 1984,
      "gdp": 0.16,
      "growth": 9.6,
      "perCapita": 1229.4,
      "popChangePct": 3.17
    },
    {
      "year": 1985,
      "gdp": 0.146,
      "growth": 1,
      "perCapita": 1080.5,
      "popChangePct": 3.85
    },
    {
      "year": 1986,
      "gdp": 0.141,
      "growth": -0.1,
      "perCapita": 1016.2,
      "popChangePct": 2.96
    },
    {
      "year": 1987,
      "gdp": 0.154,
      "growth": -2.9,
      "perCapita": 1094.2,
      "popChangePct": 1.44
    },
    {
      "year": 1988,
      "gdp": 0.175,
      "growth": -1.7,
      "perCapita": 1208.0,
      "popChangePct": 2.84
    },
    {
      "year": 1989,
      "gdp": 0.17,
      "growth": 1.5,
      "perCapita": 1166.9,
      "popChangePct": 0.69
    },
    {
      "year": 1990,
      "gdp": 0.187,
      "growth": 11.7,
      "perCapita": 1262.2,
      "popChangePct": 1.37
    },
    {
      "year": 1991,
      "gdp": 0.223,
      "growth": 3.1,
      "perCapita": 1475.0,
      "popChangePct": 2.03
    },
    {
      "year": 1992,
      "gdp": 0.231,
      "growth": 2.6,
      "perCapita": 1501.9,
      "popChangePct": 1.99
    },
    {
      "year": 1993,
      "gdp": 0.222,
      "growth": 0.7,
      "perCapita": 1412.6,
      "popChangePct": 1.95
    },
    {
      "year": 1994,
      "gdp": 0.259,
      "growth": 9.1,
      "perCapita": 1573.9,
      "popChangePct": 4.46
    },
    {
      "year": 1995,
      "gdp": 0.276,
      "growth": 1,
      "perCapita": 1636.7,
      "popChangePct": 3.05
    },
    {
      "year": 1996,
      "gdp": 0.289,
      "growth": 2.3,
      "perCapita": 1672.2,
      "popChangePct": 2.37
    },
    {
      "year": 1997,
      "gdp": 0.302,
      "growth": 4.9,
      "perCapita": 1700.9,
      "popChangePct": 2.31
    },
    {
      "year": 1998,
      "gdp": 0.29,
      "growth": 1.2,
      "perCapita": 1594.1,
      "popChangePct": 2.82
    },
    {
      "year": 1999,
      "gdp": 0.296,
      "growth": 0.3,
      "perCapita": 1588.1,
      "popChangePct": 2.75
    },
    {
      "year": 2000,
      "gdp": 0.3,
      "growth": 5.9,
      "perCapita": 1573.2,
      "popChangePct": 2.14
    },
    {
      "year": 2001,
      "gdp": 0.285,
      "growth": -3.4,
      "perCapita": 1456.9,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdp": 0.29,
      "growth": -5.2,
      "perCapita": 1452.9,
      "popChangePct": 2.56
    },
    {
      "year": 2003,
      "gdp": 0.349,
      "growth": 4.3,
      "perCapita": 1705.8,
      "popChangePct": 2.0
    },
    {
      "year": 2004,
      "gdp": 0.403,
      "growth": 4,
      "perCapita": 1928.4,
      "popChangePct": 2.45
    },
    {
      "year": 2005,
      "gdp": 0.432,
      "growth": 5.3,
      "perCapita": 2018.2,
      "popChangePct": 2.39
    },
    {
      "year": 2006,
      "gdp": 0.481,
      "growth": 8.5,
      "perCapita": 2196.1,
      "popChangePct": 2.34
    },
    {
      "year": 2007,
      "gdp": 0.572,
      "growth": 2.9,
      "perCapita": 2553.7,
      "popChangePct": 2.28
    },
    {
      "year": 2008,
      "gdp": 0.644,
      "growth": 5.6,
      "perCapita": 2810.5,
      "popChangePct": 2.23
    },
    {
      "year": 2009,
      "gdp": 0.652,
      "growth": 3,
      "perCapita": 2787.2,
      "popChangePct": 2.18
    },
    {
      "year": 2010,
      "gdp": 0.721,
      "growth": 1.3,
      "perCapita": 3008.0,
      "popChangePct": 2.56
    },
    {
      "year": 2011,
      "gdp": 0.816,
      "growth": 3.1,
      "perCapita": 3326.9,
      "popChangePct": 2.08
    },
    {
      "year": 2012,
      "gdp": 0.814,
      "growth": 1,
      "perCapita": 3246.5,
      "popChangePct": 2.45
    },
    {
      "year": 2013,
      "gdp": 0.859,
      "growth": 3.4,
      "perCapita": 3347.5,
      "popChangePct": 2.39
    },
    {
      "year": 2014,
      "gdp": 0.881,
      "growth": 3.1,
      "perCapita": 3355.9,
      "popChangePct": 2.33
    },
    {
      "year": 2015,
      "gdp": 0.871,
      "growth": 3.5,
      "perCapita": 3243.8,
      "popChangePct": 2.28
    },
    {
      "year": 2016,
      "gdp": 0.902,
      "growth": 3.6,
      "perCapita": 3309.7,
      "popChangePct": 1.12
    },
    {
      "year": 2017,
      "gdp": 0.999,
      "growth": 4.2,
      "perCapita": 3584.2,
      "popChangePct": 2.57
    },
    {
      "year": 2018,
      "gdp": 1,
      "growth": 2.5,
      "perCapita": 3505.7,
      "popChangePct": 2.15
    },
    {
      "year": 2019,
      "gdp": 1.054,
      "growth": 3.3,
      "perCapita": 3612.9,
      "popChangePct": 2.46
    },
    {
      "year": 2020,
      "gdp": 1.128,
      "growth": -5.7,
      "perCapita": 3778.9,
      "popChangePct": 2.05
    },
    {
      "year": 2021,
      "gdp": 1.06,
      "growth": -1.2,
      "perCapita": 3472.5,
      "popChangePct": 2.35
    },
    {
      "year": 2022,
      "gdp": 1.13,
      "growth": 5.6,
      "perCapita": 3617.7,
      "popChangePct": 2.3
    },
    {
      "year": 2023,
      "gdp": 1.198,
      "growth": 5.8,
      "perCapita": 3750.7,
      "popChangePct": 2.24
    },
    {
      "year": 2024,
      "gdp": 1.265,
      "growth": 3.8,
      "perCapita": 3871.3,
      "popChangePct": 2.51
    },
    {
      "year": 2025,
      "gdp": 1.316,
      "growth": 3.1,
      "perCapita": 3935.8,
      "popChangePct": 2.14
    },
    {
      "year": 2026,
      "gdp": 1.396,
      "growth": 3.5,
      "perCapita": 4082.1,
      "popChangePct": 2.4
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.477,
      "growth": 3.2,
      "perCapita": 4222.5,
      "popChangePct": 2.34
    },
    {
      "year": 2028,
      "gdp": 1.553,
      "growth": 2.8,
      "perCapita": 4338.6,
      "popChangePct": 2.29
    },
    {
      "year": 2029,
      "gdp": 1.628,
      "growth": 2.5,
      "perCapita": 4447.1,
      "popChangePct": 2.23
    },
    {
      "year": 2030,
      "gdp": 1.707,
      "growth": 2.5,
      "perCapita": 4557.6,
      "popChangePct": 2.46
    },
    {
      "year": 2031,
      "gdp": 1.789,
      "growth": 2.5,
      "perCapita": 4667.4,
      "popChangePct": 2.13
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.12,
      "perCapitaPPP": 1044.3,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.137,
      "perCapitaPPP": 1153.0,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": 3.48
    },
    {
      "year": 1982,
      "gdpPPP": 0.149,
      "perCapitaPPP": 1207.9,
      "perCapitaPPPChangePct": 4.76,
      "popChangePct": 3.36
    },
    {
      "year": 1983,
      "gdpPPP": 0.159,
      "perCapitaPPP": 1262.2,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 2.44
    },
    {
      "year": 1984,
      "gdpPPP": 0.181,
      "perCapitaPPP": 1388.9,
      "perCapitaPPPChangePct": 10.04,
      "popChangePct": 3.17
    },
    {
      "year": 1985,
      "gdpPPP": 0.188,
      "perCapitaPPP": 1393.6,
      "perCapitaPPPChangePct": 0.34,
      "popChangePct": 3.85
    },
    {
      "year": 1986,
      "gdpPPP": 0.192,
      "perCapitaPPP": 1378.7,
      "perCapitaPPPChangePct": -1.07,
      "popChangePct": 2.96
    },
    {
      "year": 1987,
      "gdpPPP": 0.191,
      "perCapitaPPP": 1352.5,
      "perCapitaPPPChangePct": -1.9,
      "popChangePct": 1.44
    },
    {
      "year": 1988,
      "gdpPPP": 0.194,
      "perCapitaPPP": 1338.5,
      "perCapitaPPPChangePct": -1.04,
      "popChangePct": 2.84
    },
    {
      "year": 1989,
      "gdpPPP": 0.205,
      "perCapitaPPP": 1402.6,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.69
    },
    {
      "year": 1990,
      "gdpPPP": 0.237,
      "perCapitaPPP": 1603.3,
      "perCapitaPPPChangePct": 14.31,
      "popChangePct": 1.37
    },
    {
      "year": 1991,
      "gdpPPP": 0.253,
      "perCapitaPPP": 1675.8,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 2.03
    },
    {
      "year": 1992,
      "gdpPPP": 0.265,
      "perCapitaPPP": 1724.0,
      "perCapitaPPPChangePct": 2.88,
      "popChangePct": 1.99
    },
    {
      "year": 1993,
      "gdpPPP": 0.274,
      "perCapitaPPP": 1743.9,
      "perCapitaPPPChangePct": 1.15,
      "popChangePct": 1.95
    },
    {
      "year": 1994,
      "gdpPPP": 0.305,
      "perCapitaPPP": 1857.1,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 4.46
    },
    {
      "year": 1995,
      "gdpPPP": 0.315,
      "perCapitaPPP": 1866.6,
      "perCapitaPPPChangePct": 0.51,
      "popChangePct": 3.05
    },
    {
      "year": 1996,
      "gdpPPP": 0.328,
      "perCapitaPPP": 1895.7,
      "perCapitaPPPChangePct": 1.56,
      "popChangePct": 2.37
    },
    {
      "year": 1997,
      "gdpPPP": 0.35,
      "perCapitaPPP": 1971.8,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": 2.31
    },
    {
      "year": 1998,
      "gdpPPP": 0.358,
      "perCapitaPPP": 1966.2,
      "perCapitaPPPChangePct": -0.28,
      "popChangePct": 2.82
    },
    {
      "year": 1999,
      "gdpPPP": 0.364,
      "perCapitaPPP": 1950.7,
      "perCapitaPPPChangePct": -0.79,
      "popChangePct": 2.75
    },
    {
      "year": 2000,
      "gdpPPP": 0.394,
      "perCapitaPPP": 2065.9,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 2.14
    },
    {
      "year": 2001,
      "gdpPPP": 0.39,
      "perCapitaPPP": 1995.0,
      "perCapitaPPPChangePct": -3.43,
      "popChangePct": 2.09
    },
    {
      "year": 2002,
      "gdpPPP": 0.375,
      "perCapitaPPP": 1877.8,
      "perCapitaPPPChangePct": -5.88,
      "popChangePct": 2.56
    },
    {
      "year": 2003,
      "gdpPPP": 0.399,
      "perCapitaPPP": 1951.3,
      "perCapitaPPPChangePct": 3.91,
      "popChangePct": 2.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.426,
      "perCapitaPPP": 2036.8,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 2.45
    },
    {
      "year": 2005,
      "gdpPPP": 0.463,
      "perCapitaPPP": 2162.4,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 2.39
    },
    {
      "year": 2006,
      "gdpPPP": 0.517,
      "perCapitaPPP": 2363.3,
      "perCapitaPPPChangePct": 9.29,
      "popChangePct": 2.34
    },
    {
      "year": 2007,
      "gdpPPP": 0.547,
      "perCapitaPPP": 2441.0,
      "perCapitaPPPChangePct": 3.29,
      "popChangePct": 2.28
    },
    {
      "year": 2008,
      "gdpPPP": 0.588,
      "perCapitaPPP": 2568.3,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 2.23
    },
    {
      "year": 2009,
      "gdpPPP": 0.61,
      "perCapitaPPP": 2606.3,
      "perCapitaPPPChangePct": 1.48,
      "popChangePct": 2.18
    },
    {
      "year": 2010,
      "gdpPPP": 0.625,
      "perCapitaPPP": 2607.6,
      "perCapitaPPPChangePct": 0.05,
      "popChangePct": 2.56
    },
    {
      "year": 2011,
      "gdpPPP": 0.658,
      "perCapitaPPP": 2683.3,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 2.08
    },
    {
      "year": 2012,
      "gdpPPP": 0.677,
      "perCapitaPPP": 2698.6,
      "perCapitaPPPChangePct": 0.57,
      "popChangePct": 2.45
    },
    {
      "year": 2013,
      "gdpPPP": 0.712,
      "perCapitaPPP": 2774.3,
      "perCapitaPPPChangePct": 2.8,
      "popChangePct": 2.39
    },
    {
      "year": 2014,
      "gdpPPP": 0.747,
      "perCapitaPPP": 2844.8,
      "perCapitaPPPChangePct": 2.54,
      "popChangePct": 2.33
    },
    {
      "year": 2015,
      "gdpPPP": 0.78,
      "perCapitaPPP": 2905.0,
      "perCapitaPPPChangePct": 2.11,
      "popChangePct": 2.28
    },
    {
      "year": 2016,
      "gdpPPP": 0.816,
      "perCapitaPPP": 2995.6,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": 1.12
    },
    {
      "year": 2017,
      "gdpPPP": 0.866,
      "perCapitaPPP": 3106.6,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 2.57
    },
    {
      "year": 2018,
      "gdpPPP": 0.908,
      "perCapitaPPP": 3184.5,
      "perCapitaPPPChangePct": 2.51,
      "popChangePct": 2.15
    },
    {
      "year": 2019,
      "gdpPPP": 0.953,
      "perCapitaPPP": 3268.0,
      "perCapitaPPPChangePct": 2.62,
      "popChangePct": 2.46
    },
    {
      "year": 2020,
      "gdpPPP": 0.911,
      "perCapitaPPP": 3052.1,
      "perCapitaPPPChangePct": -6.61,
      "popChangePct": 2.05
    },
    {
      "year": 2021,
      "gdpPPP": 0.941,
      "perCapitaPPP": 3083.3,
      "perCapitaPPPChangePct": 1.02,
      "popChangePct": 2.35
    },
    {
      "year": 2022,
      "gdpPPP": 1.065,
      "perCapitaPPP": 3408.9,
      "perCapitaPPPChangePct": 10.56,
      "popChangePct": 2.3
    },
    {
      "year": 2023,
      "gdpPPP": 1.168,
      "perCapitaPPP": 3657.0,
      "perCapitaPPPChangePct": 7.28,
      "popChangePct": 2.24
    },
    {
      "year": 2024,
      "gdpPPP": 1.242,
      "perCapitaPPP": 3801.5,
      "perCapitaPPPChangePct": 3.95,
      "popChangePct": 2.51
    },
    {
      "year": 2025,
      "gdpPPP": 1.317,
      "perCapitaPPP": 3938.1,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": 2.14
    },
    {
      "year": 2026,
      "gdpPPP": 1.402,
      "perCapitaPPP": 4099.6,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 2.4
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1.478,
      "perCapitaPPP": 4224.4,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": 2.34
    },
    {
      "year": 2028,
      "gdpPPP": 1.544,
      "perCapitaPPP": 4314.6,
      "perCapitaPPPChangePct": 2.13,
      "popChangePct": 2.29
    },
    {
      "year": 2029,
      "gdpPPP": 1.612,
      "perCapitaPPP": 4401.9,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": 2.23
    },
    {
      "year": 2030,
      "gdpPPP": 1.683,
      "perCapitaPPP": 4493.0,
      "perCapitaPPPChangePct": 2.07,
      "popChangePct": 2.46
    },
    {
      "year": 2031,
      "gdpPPP": 1.756,
      "perCapitaPPP": 4581.1,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 2.13
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function VanuatuGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
