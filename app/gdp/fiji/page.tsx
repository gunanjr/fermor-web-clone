import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Fiji",
  "slug": "fiji",
  "iso3": "FJI",
  "region": "Oceania",
  "rank2026": 169,
  "flagEmoji": "🇫🇯",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Yemen",
      "slug": "yemen",
      "rank": 164
    },
    {
      "name": "South Sudan",
      "slug": "south-sudan",
      "rank": 170
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.303,
      "growth": -1.7,
      "perCapita": 2056.1,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.339,
      "growth": 6,
      "perCapita": 2062.2,
      "popChangePct": 2.37
    },
    {
      "year": 1982,
      "gdp": 1.293,
      "growth": -1.1,
      "perCapita": 1941.8,
      "popChangePct": 2.62
    },
    {
      "year": 1983,
      "gdp": 1.217,
      "growth": -4.2,
      "perCapita": 1781.1,
      "popChangePct": 2.55
    },
    {
      "year": 1984,
      "gdp": 1.276,
      "growth": 10.1,
      "perCapita": 1828.9,
      "popChangePct": 2.2
    },
    {
      "year": 1985,
      "gdp": 1.236,
      "growth": -3.8,
      "perCapita": 1744.4,
      "popChangePct": 1.58
    },
    {
      "year": 1986,
      "gdp": 1.398,
      "growth": 6.6,
      "perCapita": 1954.1,
      "popChangePct": 0.85
    },
    {
      "year": 1987,
      "gdp": 1.276,
      "growth": -7.2,
      "perCapita": 1776.9,
      "popChangePct": 0.42
    },
    {
      "year": 1988,
      "gdp": 1.202,
      "growth": 3.5,
      "perCapita": 1672.5,
      "popChangePct": 0.14
    },
    {
      "year": 1989,
      "gdp": 1.281,
      "growth": 13.9,
      "perCapita": 1747.1,
      "popChangePct": 1.95
    },
    {
      "year": 1990,
      "gdp": 1.448,
      "growth": 5.8,
      "perCapita": 1959.2,
      "popChangePct": 0.82
    },
    {
      "year": 1991,
      "gdp": 1.5,
      "growth": -2.7,
      "perCapita": 2012.5,
      "popChangePct": 0.81
    },
    {
      "year": 1992,
      "gdp": 1.659,
      "growth": 6.1,
      "perCapita": 2209.0,
      "popChangePct": 0.81
    },
    {
      "year": 1993,
      "gdp": 1.772,
      "growth": 2.6,
      "perCapita": 2339.8,
      "popChangePct": 0.8
    },
    {
      "year": 1994,
      "gdp": 1.977,
      "growth": 5.1,
      "perCapita": 2590.9,
      "popChangePct": 0.79
    },
    {
      "year": 1995,
      "gdp": 2.134,
      "growth": 2.6,
      "perCapita": 2780.0,
      "popChangePct": 0.66
    },
    {
      "year": 1996,
      "gdp": 2.307,
      "growth": 4.8,
      "perCapita": 2975.9,
      "popChangePct": 0.91
    },
    {
      "year": 1997,
      "gdp": 2.268,
      "growth": -2.4,
      "perCapita": 2900.3,
      "popChangePct": 0.9
    },
    {
      "year": 1998,
      "gdp": 1.795,
      "growth": 1.3,
      "perCapita": 2270.1,
      "popChangePct": 1.15
    },
    {
      "year": 1999,
      "gdp": 2.104,
      "growth": 8.7,
      "perCapita": 2638.5,
      "popChangePct": 0.76
    },
    {
      "year": 2000,
      "gdp": 1.824,
      "growth": -1.7,
      "perCapita": 2274.6,
      "popChangePct": 0.63
    },
    {
      "year": 2001,
      "gdp": 1.798,
      "growth": 1.9,
      "perCapita": 2234.5,
      "popChangePct": 0.37
    },
    {
      "year": 2002,
      "gdp": 1.996,
      "growth": 3.2,
      "perCapita": 2463.3,
      "popChangePct": 0.62
    },
    {
      "year": 2003,
      "gdp": 2.509,
      "growth": 0.8,
      "perCapita": 3073.0,
      "popChangePct": 0.74
    },
    {
      "year": 2004,
      "gdp": 2.954,
      "growth": 5.4,
      "perCapita": 3596.7,
      "popChangePct": 0.61
    },
    {
      "year": 2005,
      "gdp": 3.257,
      "growth": -1.3,
      "perCapita": 3940.0,
      "popChangePct": 0.73
    },
    {
      "year": 2006,
      "gdp": 3.361,
      "growth": 1.9,
      "perCapita": 4050.9,
      "popChangePct": 0.36
    },
    {
      "year": 2007,
      "gdp": 3.688,
      "growth": -0.9,
      "perCapita": 4405.2,
      "popChangePct": 0.84
    },
    {
      "year": 2008,
      "gdp": 3.816,
      "growth": 1,
      "perCapita": 4553.7,
      "popChangePct": 0.12
    },
    {
      "year": 2009,
      "gdp": 3.106,
      "growth": -1.4,
      "perCapita": 3682.5,
      "popChangePct": 0.6
    },
    {
      "year": 2010,
      "gdp": 3.402,
      "growth": 3,
      "perCapita": 4011.0,
      "popChangePct": 0.59
    },
    {
      "year": 2011,
      "gdp": 4.094,
      "growth": 2.7,
      "perCapita": 4802.5,
      "popChangePct": 0.47
    },
    {
      "year": 2012,
      "gdp": 4.303,
      "growth": 1.4,
      "perCapita": 5022.1,
      "popChangePct": 0.59
    },
    {
      "year": 2013,
      "gdp": 4.539,
      "growth": 4.7,
      "perCapita": 5277.4,
      "popChangePct": 0.35
    },
    {
      "year": 2014,
      "gdp": 4.857,
      "growth": 5.6,
      "perCapita": 5622.4,
      "popChangePct": 0.47
    },
    {
      "year": 2015,
      "gdp": 4.682,
      "growth": 4.5,
      "perCapita": 5397.1,
      "popChangePct": 0.46
    },
    {
      "year": 2016,
      "gdp": 4.93,
      "growth": 2.4,
      "perCapita": 5658.2,
      "popChangePct": 0.35
    },
    {
      "year": 2017,
      "gdp": 5.353,
      "growth": 5.4,
      "perCapita": 6049.9,
      "popChangePct": 1.61
    },
    {
      "year": 2018,
      "gdp": 5.581,
      "growth": 3.8,
      "perCapita": 6269.9,
      "popChangePct": 0.56
    },
    {
      "year": 2019,
      "gdp": 5.345,
      "growth": 7.6,
      "perCapita": 5968.4,
      "popChangePct": 0.67
    },
    {
      "year": 2020,
      "gdp": 4.228,
      "growth": -17.2,
      "perCapita": 4692.7,
      "popChangePct": 0.56
    },
    {
      "year": 2021,
      "gdp": 4.159,
      "growth": -4.4,
      "perCapita": 4588.8,
      "popChangePct": 0.55
    },
    {
      "year": 2022,
      "gdp": 4.978,
      "growth": 17.7,
      "perCapita": 5459.7,
      "popChangePct": 0.66
    },
    {
      "year": 2023,
      "gdp": 5.477,
      "growth": 9.4,
      "perCapita": 5970.9,
      "popChangePct": 0.55
    },
    {
      "year": 2024,
      "gdp": 5.968,
      "growth": 3.5,
      "perCapita": 6467.9,
      "popChangePct": 0.65
    },
    {
      "year": 2025,
      "gdp": 6.041,
      "growth": 3.2,
      "perCapita": 6508.0,
      "popChangePct": 0.54
    },
    {
      "year": 2026,
      "gdp": 6.352,
      "growth": 2.4,
      "perCapita": 6801.6,
      "popChangePct": 0.65
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 6.663,
      "growth": 2.7,
      "perCapita": 7093.1,
      "popChangePct": 0.54
    },
    {
      "year": 2028,
      "gdp": 7.013,
      "growth": 3,
      "perCapita": 7420.5,
      "popChangePct": 0.64
    },
    {
      "year": 2029,
      "gdp": 7.393,
      "growth": 3.1,
      "perCapita": 7775.6,
      "popChangePct": 0.63
    },
    {
      "year": 2030,
      "gdp": 7.804,
      "growth": 3.3,
      "perCapita": 8159.6,
      "popChangePct": 0.53
    },
    {
      "year": 2031,
      "gdp": 8.457,
      "growth": 3.4,
      "perCapita": 8789.7,
      "popChangePct": 0.63
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.883,
      "perCapitaPPP": 2971.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.185,
      "perCapitaPPP": 3365.8,
      "perCapitaPPPChangePct": 13.27,
      "popChangePct": 2.37
    },
    {
      "year": 1982,
      "gdpPPP": 2.295,
      "perCapitaPPP": 3444.6,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 2.62
    },
    {
      "year": 1983,
      "gdpPPP": 2.284,
      "perCapitaPPP": 3343.7,
      "perCapitaPPPChangePct": -2.93,
      "popChangePct": 2.55
    },
    {
      "year": 1984,
      "gdpPPP": 2.606,
      "perCapitaPPP": 3734.3,
      "perCapitaPPPChangePct": 11.68,
      "popChangePct": 2.2
    },
    {
      "year": 1985,
      "gdpPPP": 2.587,
      "perCapitaPPP": 3649.6,
      "perCapitaPPPChangePct": -2.27,
      "popChangePct": 1.58
    },
    {
      "year": 1986,
      "gdpPPP": 2.813,
      "perCapitaPPP": 3932.3,
      "perCapitaPPPChangePct": 7.75,
      "popChangePct": 0.85
    },
    {
      "year": 1987,
      "gdpPPP": 2.675,
      "perCapitaPPP": 3725.0,
      "perCapitaPPPChangePct": -5.27,
      "popChangePct": 0.42
    },
    {
      "year": 1988,
      "gdpPPP": 2.865,
      "perCapitaPPP": 3985.3,
      "perCapitaPPPChangePct": 6.99,
      "popChangePct": 0.14
    },
    {
      "year": 1989,
      "gdpPPP": 3.391,
      "perCapitaPPP": 4624.5,
      "perCapitaPPPChangePct": 16.04,
      "popChangePct": 1.95
    },
    {
      "year": 1990,
      "gdpPPP": 3.722,
      "perCapitaPPP": 5034.9,
      "perCapitaPPPChangePct": 8.88,
      "popChangePct": 0.82
    },
    {
      "year": 1991,
      "gdpPPP": 3.744,
      "perCapitaPPP": 5024.1,
      "perCapitaPPPChangePct": -0.21,
      "popChangePct": 0.81
    },
    {
      "year": 1992,
      "gdpPPP": 4.063,
      "perCapitaPPP": 5408.7,
      "perCapitaPPPChangePct": 7.66,
      "popChangePct": 0.81
    },
    {
      "year": 1993,
      "gdpPPP": 4.267,
      "perCapitaPPP": 5636.1,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 0.8
    },
    {
      "year": 1994,
      "gdpPPP": 4.581,
      "perCapitaPPP": 6002.7,
      "perCapitaPPPChangePct": 6.5,
      "popChangePct": 0.79
    },
    {
      "year": 1995,
      "gdpPPP": 4.799,
      "perCapitaPPP": 6250.0,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": 0.66
    },
    {
      "year": 1996,
      "gdpPPP": 5.121,
      "perCapitaPPP": 6607.0,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": 0.91
    },
    {
      "year": 1997,
      "gdpPPP": 5.084,
      "perCapitaPPP": 6500.4,
      "perCapitaPPPChangePct": -1.61,
      "popChangePct": 0.9
    },
    {
      "year": 1998,
      "gdpPPP": 5.208,
      "perCapitaPPP": 6587.6,
      "perCapitaPPPChangePct": 1.34,
      "popChangePct": 1.15
    },
    {
      "year": 1999,
      "gdpPPP": 5.741,
      "perCapitaPPP": 7200.5,
      "perCapitaPPPChangePct": 9.3,
      "popChangePct": 0.76
    },
    {
      "year": 2000,
      "gdpPPP": 5.772,
      "perCapitaPPP": 7196.4,
      "perCapitaPPPChangePct": -0.06,
      "popChangePct": 0.63
    },
    {
      "year": 2001,
      "gdpPPP": 6.014,
      "perCapitaPPP": 7472.2,
      "perCapitaPPPChangePct": 3.83,
      "popChangePct": 0.37
    },
    {
      "year": 2002,
      "gdpPPP": 6.303,
      "perCapitaPPP": 7777.3,
      "perCapitaPPPChangePct": 4.08,
      "popChangePct": 0.62
    },
    {
      "year": 2003,
      "gdpPPP": 6.478,
      "perCapitaPPP": 7935.2,
      "perCapitaPPPChangePct": 2.03,
      "popChangePct": 0.74
    },
    {
      "year": 2004,
      "gdpPPP": 7.012,
      "perCapitaPPP": 8536.2,
      "perCapitaPPPChangePct": 7.57,
      "popChangePct": 0.61
    },
    {
      "year": 2005,
      "gdpPPP": 7.138,
      "perCapitaPPP": 8634.6,
      "perCapitaPPPChangePct": 1.15,
      "popChangePct": 0.73
    },
    {
      "year": 2006,
      "gdpPPP": 7.498,
      "perCapitaPPP": 9036.8,
      "perCapitaPPPChangePct": 4.66,
      "popChangePct": 0.36
    },
    {
      "year": 2007,
      "gdpPPP": 7.632,
      "perCapitaPPP": 9114.8,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 0.84
    },
    {
      "year": 2008,
      "gdpPPP": 7.856,
      "perCapitaPPP": 9375.7,
      "perCapitaPPPChangePct": 2.86,
      "popChangePct": 0.12
    },
    {
      "year": 2009,
      "gdpPPP": 7.794,
      "perCapitaPPP": 9241.1,
      "perCapitaPPPChangePct": -1.44,
      "popChangePct": 0.6
    },
    {
      "year": 2010,
      "gdpPPP": 8.125,
      "perCapitaPPP": 9581.0,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 0.59
    },
    {
      "year": 2011,
      "gdpPPP": 8.517,
      "perCapitaPPP": 9990.7,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.47
    },
    {
      "year": 2012,
      "gdpPPP": 8.798,
      "perCapitaPPP": 10269.0,
      "perCapitaPPPChangePct": 2.79,
      "popChangePct": 0.59
    },
    {
      "year": 2013,
      "gdpPPP": 9.371,
      "perCapitaPPP": 10896.3,
      "perCapitaPPPChangePct": 6.11,
      "popChangePct": 0.35
    },
    {
      "year": 2014,
      "gdpPPP": 10.069,
      "perCapitaPPP": 11655.3,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 0.47
    },
    {
      "year": 2015,
      "gdpPPP": 10.62,
      "perCapitaPPP": 12240.6,
      "perCapitaPPPChangePct": 5.02,
      "popChangePct": 0.46
    },
    {
      "year": 2016,
      "gdpPPP": 10.983,
      "perCapitaPPP": 12604.7,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": 0.35
    },
    {
      "year": 2017,
      "gdpPPP": 11.778,
      "perCapitaPPP": 13310.3,
      "perCapitaPPPChangePct": 5.6,
      "popChangePct": 1.61
    },
    {
      "year": 2018,
      "gdpPPP": 12.131,
      "perCapitaPPP": 13626.8,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 0.56
    },
    {
      "year": 2019,
      "gdpPPP": 11.874,
      "perCapitaPPP": 13258.7,
      "perCapitaPPPChangePct": -2.7,
      "popChangePct": 0.67
    },
    {
      "year": 2020,
      "gdpPPP": 9.805,
      "perCapitaPPP": 10883.4,
      "perCapitaPPPChangePct": -17.91,
      "popChangePct": 0.56
    },
    {
      "year": 2021,
      "gdpPPP": 9.463,
      "perCapitaPPP": 10440.8,
      "perCapitaPPPChangePct": -4.07,
      "popChangePct": 0.55
    },
    {
      "year": 2022,
      "gdpPPP": 11.934,
      "perCapitaPPP": 13088.7,
      "perCapitaPPPChangePct": 25.36,
      "popChangePct": 0.66
    },
    {
      "year": 2023,
      "gdpPPP": 13.545,
      "perCapitaPPP": 14766.9,
      "perCapitaPPPChangePct": 12.82,
      "popChangePct": 0.55
    },
    {
      "year": 2024,
      "gdpPPP": 14.373,
      "perCapitaPPP": 15576.3,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 0.65
    },
    {
      "year": 2025,
      "gdpPPP": 15.252,
      "perCapitaPPP": 16430.7,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 0.54
    },
    {
      "year": 2026,
      "gdpPPP": 16.07,
      "perCapitaPPP": 17208.8,
      "perCapitaPPPChangePct": 4.74,
      "popChangePct": 0.65
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 16.868,
      "perCapitaPPP": 17955.6,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 0.54
    },
    {
      "year": 2028,
      "gdpPPP": 17.652,
      "perCapitaPPP": 18678.3,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 0.64
    },
    {
      "year": 2029,
      "gdpPPP": 18.524,
      "perCapitaPPP": 19484.2,
      "perCapitaPPPChangePct": 4.31,
      "popChangePct": 0.63
    },
    {
      "year": 2030,
      "gdpPPP": 19.482,
      "perCapitaPPP": 20368.7,
      "perCapitaPPPChangePct": 4.54,
      "popChangePct": 0.53
    },
    {
      "year": 2031,
      "gdpPPP": 20.504,
      "perCapitaPPP": 21310.2,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 0.63
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function FijiGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
