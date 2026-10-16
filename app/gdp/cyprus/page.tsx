import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Cyprus",
  "slug": "cyprus",
  "iso3": "CYP",
  "region": "Europe",
  "rank2026": 105,
  "flagEmoji": "🇨🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Nepal",
      "slug": "nepal",
      "rank": 104
    },
    {
      "name": "Sudan",
      "slug": "sudan",
      "rank": 106
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.314,
      "growth": 5.9,
      "perCapita": 4549.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.242,
      "growth": 3.1,
      "perCapita": 4352.5,
      "popChangePct": 1.18
    },
    {
      "year": 1982,
      "gdp": 2.319,
      "growth": 6.3,
      "perCapita": 4452.7,
      "popChangePct": 1.17
    },
    {
      "year": 1983,
      "gdp": 2.321,
      "growth": 5.3,
      "perCapita": 4399.2,
      "popChangePct": 1.34
    },
    {
      "year": 1984,
      "gdp": 2.447,
      "growth": 8.8,
      "perCapita": 4575.7,
      "popChangePct": 1.33
    },
    {
      "year": 1985,
      "gdp": 2.611,
      "growth": 4.7,
      "perCapita": 4824.7,
      "popChangePct": 1.12
    },
    {
      "year": 1986,
      "gdp": 3.317,
      "growth": 3.6,
      "perCapita": 6057.9,
      "popChangePct": 1.29
    },
    {
      "year": 1987,
      "gdp": 3.979,
      "growth": 7.1,
      "perCapita": 7188.2,
      "popChangePct": 1.09
    },
    {
      "year": 1988,
      "gdp": 4.589,
      "growth": 8.3,
      "perCapita": 8204.3,
      "popChangePct": 0.9
    },
    {
      "year": 1989,
      "gdp": 4.901,
      "growth": 8.1,
      "perCapita": 8635.8,
      "popChangePct": 1.61
    },
    {
      "year": 1990,
      "gdp": 6.003,
      "growth": 7.4,
      "perCapita": 10360.0,
      "popChangePct": 1.94
    },
    {
      "year": 1991,
      "gdp": 6.195,
      "growth": 0.7,
      "perCapita": 10413.7,
      "popChangePct": 2.76
    },
    {
      "year": 1992,
      "gdp": 7.424,
      "growth": 9.4,
      "perCapita": 12158.6,
      "popChangePct": 2.69
    },
    {
      "year": 1993,
      "gdp": 7.098,
      "growth": 0.7,
      "perCapita": 11342.4,
      "popChangePct": 2.45
    },
    {
      "year": 1994,
      "gdp": 8.004,
      "growth": 5.9,
      "perCapita": 12525.3,
      "popChangePct": 2.08
    },
    {
      "year": 1995,
      "gdp": 9.937,
      "growth": 9.9,
      "perCapita": 15396.9,
      "popChangePct": 0.94
    },
    {
      "year": 1996,
      "gdp": 10.016,
      "growth": 1.4,
      "perCapita": 15260.6,
      "popChangePct": 1.71
    },
    {
      "year": 1997,
      "gdp": 9.544,
      "growth": 2.6,
      "perCapita": 14323.9,
      "popChangePct": 1.52
    },
    {
      "year": 1998,
      "gdp": 10.251,
      "growth": 6.1,
      "perCapita": 15182.0,
      "popChangePct": 1.35
    },
    {
      "year": 1999,
      "gdp": 10.502,
      "growth": 5,
      "perCapita": 15379.8,
      "popChangePct": 1.19
    },
    {
      "year": 2000,
      "gdp": 9.988,
      "growth": 6,
      "perCapita": 14464.8,
      "popChangePct": 1.02
    },
    {
      "year": 2001,
      "gdp": 10.397,
      "growth": 4,
      "perCapita": 14905.0,
      "popChangePct": 1.16
    },
    {
      "year": 2002,
      "gdp": 11.422,
      "growth": 3.7,
      "perCapita": 16188.4,
      "popChangePct": 1.15
    },
    {
      "year": 2003,
      "gdp": 14.552,
      "growth": 2.6,
      "perCapita": 20389.3,
      "popChangePct": 1.13
    },
    {
      "year": 2004,
      "gdp": 17.328,
      "growth": 5,
      "perCapita": 23969.8,
      "popChangePct": 1.26
    },
    {
      "year": 2005,
      "gdp": 18.713,
      "growth": 4.9,
      "perCapita": 25527.1,
      "popChangePct": 1.38
    },
    {
      "year": 2006,
      "gdp": 20.422,
      "growth": 4.7,
      "perCapita": 27448.4,
      "popChangePct": 1.5
    },
    {
      "year": 2007,
      "gdp": 24.082,
      "growth": 5.1,
      "perCapita": 31774.4,
      "popChangePct": 1.88
    },
    {
      "year": 2008,
      "gdp": 27.955,
      "growth": 3.6,
      "perCapita": 36009.4,
      "popChangePct": 2.37
    },
    {
      "year": 2009,
      "gdp": 26.02,
      "growth": -2,
      "perCapita": 32650.1,
      "popChangePct": 2.71
    },
    {
      "year": 2010,
      "gdp": 25.821,
      "growth": 2.3,
      "perCapita": 31522.1,
      "popChangePct": 2.76
    },
    {
      "year": 2011,
      "gdp": 27.637,
      "growth": 0.4,
      "perCapita": 32910.6,
      "popChangePct": 2.56
    },
    {
      "year": 2012,
      "gdp": 25.063,
      "growth": -3.4,
      "perCapita": 29075.4,
      "popChangePct": 2.62
    },
    {
      "year": 2013,
      "gdp": 23.96,
      "growth": -6.6,
      "perCapita": 27768.5,
      "popChangePct": 0.12
    },
    {
      "year": 2014,
      "gdp": 23.232,
      "growth": -1.8,
      "perCapita": 27012.8,
      "popChangePct": -0.35
    },
    {
      "year": 2015,
      "gdp": 19.911,
      "growth": 3.4,
      "perCapita": 23129.6,
      "popChangePct": 0.12
    },
    {
      "year": 2016,
      "gdp": 21.041,
      "growth": 6.6,
      "perCapita": 24359.1,
      "popChangePct": 0.35
    },
    {
      "year": 2017,
      "gdp": 22.938,
      "growth": 5.7,
      "perCapita": 26369.7,
      "popChangePct": 0.69
    },
    {
      "year": 2018,
      "gdp": 25.766,
      "growth": 6.3,
      "perCapita": 29325.8,
      "popChangePct": 1.03
    },
    {
      "year": 2019,
      "gdp": 26.2,
      "growth": 5.9,
      "perCapita": 29431.5,
      "popChangePct": 1.25
    },
    {
      "year": 2020,
      "gdp": 25.535,
      "growth": -3.2,
      "perCapita": 28295.9,
      "popChangePct": 1.35
    },
    {
      "year": 2021,
      "gdp": 30.392,
      "growth": 11.4,
      "perCapita": 33234.9,
      "popChangePct": 1.33
    },
    {
      "year": 2022,
      "gdp": 31.243,
      "growth": 8.3,
      "perCapita": 33603.0,
      "popChangePct": 1.75
    },
    {
      "year": 2023,
      "gdp": 35.085,
      "growth": 3.6,
      "perCapita": 36967.7,
      "popChangePct": 2.04
    },
    {
      "year": 2024,
      "gdp": 37.623,
      "growth": 3.9,
      "perCapita": 38932.6,
      "popChangePct": 1.79
    },
    {
      "year": 2025,
      "gdp": 41.019,
      "growth": 3.8,
      "perCapita": 41730.2,
      "popChangePct": 1.76
    },
    {
      "year": 2026,
      "gdp": 45.171,
      "growth": 3,
      "perCapita": 45408.8,
      "popChangePct": 1.22
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 47.359,
      "growth": 3,
      "perCapita": 47090.8,
      "popChangePct": 1.11
    },
    {
      "year": 2028,
      "gdp": 49.816,
      "growth": 3,
      "perCapita": 49394.9,
      "popChangePct": 0.3
    },
    {
      "year": 2029,
      "gdp": 52.479,
      "growth": 3,
      "perCapita": 51895.6,
      "popChangePct": 0.2
    },
    {
      "year": 2030,
      "gdp": 55.224,
      "growth": 3,
      "perCapita": 54475.2,
      "popChangePct": 0.3
    },
    {
      "year": 2031,
      "gdp": 58.098,
      "growth": 3,
      "perCapita": 57180.3,
      "popChangePct": 0.2
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 3.092,
      "perCapitaPPP": 6078.8,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 3.487,
      "perCapitaPPP": 6771.7,
      "perCapitaPPPChangePct": 11.4,
      "popChangePct": 1.18
    },
    {
      "year": 1982,
      "gdpPPP": 3.935,
      "perCapitaPPP": 7556.5,
      "perCapitaPPPChangePct": 11.59,
      "popChangePct": 1.17
    },
    {
      "year": 1983,
      "gdpPPP": 4.307,
      "perCapitaPPP": 8162.6,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 1.34
    },
    {
      "year": 1984,
      "gdpPPP": 4.856,
      "perCapitaPPP": 9080.6,
      "perCapitaPPPChangePct": 11.25,
      "popChangePct": 1.33
    },
    {
      "year": 1985,
      "gdpPPP": 5.248,
      "perCapitaPPP": 9698.1,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 1.12
    },
    {
      "year": 1986,
      "gdpPPP": 5.545,
      "perCapitaPPP": 10128.0,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": 1.29
    },
    {
      "year": 1987,
      "gdpPPP": 6.088,
      "perCapitaPPP": 10999.4,
      "perCapitaPPPChangePct": 8.6,
      "popChangePct": 1.09
    },
    {
      "year": 1988,
      "gdpPPP": 6.827,
      "perCapitaPPP": 12206.4,
      "perCapitaPPPChangePct": 10.97,
      "popChangePct": 0.9
    },
    {
      "year": 1989,
      "gdpPPP": 7.669,
      "perCapitaPPP": 13512.9,
      "perCapitaPPPChangePct": 10.7,
      "popChangePct": 1.61
    },
    {
      "year": 1990,
      "gdpPPP": 8.544,
      "perCapitaPPP": 14746.9,
      "perCapitaPPPChangePct": 9.13,
      "popChangePct": 1.94
    },
    {
      "year": 1991,
      "gdpPPP": 8.899,
      "perCapitaPPP": 14958.3,
      "perCapitaPPPChangePct": 1.43,
      "popChangePct": 2.76
    },
    {
      "year": 1992,
      "gdpPPP": 9.954,
      "perCapitaPPP": 16301.7,
      "perCapitaPPPChangePct": 8.98,
      "popChangePct": 2.69
    },
    {
      "year": 1993,
      "gdpPPP": 10.261,
      "perCapitaPPP": 16396.9,
      "perCapitaPPPChangePct": 0.58,
      "popChangePct": 2.45
    },
    {
      "year": 1994,
      "gdpPPP": 11.098,
      "perCapitaPPP": 17368.5,
      "perCapitaPPPChangePct": 5.93,
      "popChangePct": 2.08
    },
    {
      "year": 1995,
      "gdpPPP": 12.456,
      "perCapitaPPP": 19299.1,
      "perCapitaPPPChangePct": 11.12,
      "popChangePct": 0.94
    },
    {
      "year": 1996,
      "gdpPPP": 12.859,
      "perCapitaPPP": 19592.3,
      "perCapitaPPPChangePct": 1.52,
      "popChangePct": 1.71
    },
    {
      "year": 1997,
      "gdpPPP": 13.426,
      "perCapitaPPP": 20150.4,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 1.52
    },
    {
      "year": 1998,
      "gdpPPP": 14.407,
      "perCapitaPPP": 21336.8,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 1.35
    },
    {
      "year": 1999,
      "gdpPPP": 15.341,
      "perCapitaPPP": 22466.1,
      "perCapitaPPPChangePct": 5.29,
      "popChangePct": 1.19
    },
    {
      "year": 2000,
      "gdpPPP": 16.624,
      "perCapitaPPP": 24076.0,
      "perCapitaPPPChangePct": 7.17,
      "popChangePct": 1.02
    },
    {
      "year": 2001,
      "gdpPPP": 17.671,
      "perCapitaPPP": 25332.5,
      "perCapitaPPPChangePct": 5.22,
      "popChangePct": 1.16
    },
    {
      "year": 2002,
      "gdpPPP": 18.613,
      "perCapitaPPP": 26381.8,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 1.15
    },
    {
      "year": 2003,
      "gdpPPP": 19.479,
      "perCapitaPPP": 27292.0,
      "perCapitaPPPChangePct": 3.45,
      "popChangePct": 1.13
    },
    {
      "year": 2004,
      "gdpPPP": 21.008,
      "perCapitaPPP": 29060.9,
      "perCapitaPPPChangePct": 6.48,
      "popChangePct": 1.26
    },
    {
      "year": 2005,
      "gdpPPP": 22.718,
      "perCapitaPPP": 30991.0,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": 1.38
    },
    {
      "year": 2006,
      "gdpPPP": 24.523,
      "perCapitaPPP": 32960.1,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 1.5
    },
    {
      "year": 2007,
      "gdpPPP": 26.471,
      "perCapitaPPP": 34926.3,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 1.88
    },
    {
      "year": 2008,
      "gdpPPP": 27.965,
      "perCapitaPPP": 36022.3,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": 2.37
    },
    {
      "year": 2009,
      "gdpPPP": 27.571,
      "perCapitaPPP": 34596.1,
      "perCapitaPPPChangePct": -3.96,
      "popChangePct": 2.71
    },
    {
      "year": 2010,
      "gdpPPP": 28.543,
      "perCapitaPPP": 34844.9,
      "perCapitaPPPChangePct": 0.72,
      "popChangePct": 2.76
    },
    {
      "year": 2011,
      "gdpPPP": 29.253,
      "perCapitaPPP": 34835.7,
      "perCapitaPPPChangePct": -0.03,
      "popChangePct": 2.56
    },
    {
      "year": 2012,
      "gdpPPP": 28.77,
      "perCapitaPPP": 33375.8,
      "perCapitaPPPChangePct": -4.19,
      "popChangePct": 2.62
    },
    {
      "year": 2013,
      "gdpPPP": 27.333,
      "perCapitaPPP": 31677.4,
      "perCapitaPPPChangePct": -5.09,
      "popChangePct": 0.12
    },
    {
      "year": 2014,
      "gdpPPP": 27.315,
      "perCapitaPPP": 31760.3,
      "perCapitaPPPChangePct": 0.26,
      "popChangePct": -0.35
    },
    {
      "year": 2015,
      "gdpPPP": 28.511,
      "perCapitaPPP": 33119.3,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": 0.12
    },
    {
      "year": 2016,
      "gdpPPP": 30.674,
      "perCapitaPPP": 35511.9,
      "perCapitaPPPChangePct": 7.22,
      "popChangePct": 0.35
    },
    {
      "year": 2017,
      "gdpPPP": 33.018,
      "perCapitaPPP": 37957.6,
      "perCapitaPPPChangePct": 6.89,
      "popChangePct": 0.69
    },
    {
      "year": 2018,
      "gdpPPP": 35.608,
      "perCapitaPPP": 40528.0,
      "perCapitaPPPChangePct": 6.77,
      "popChangePct": 1.03
    },
    {
      "year": 2019,
      "gdpPPP": 39.791,
      "perCapitaPPP": 44699.2,
      "perCapitaPPPChangePct": 10.29,
      "popChangePct": 1.25
    },
    {
      "year": 2020,
      "gdpPPP": 38.673,
      "perCapitaPPP": 42854.0,
      "perCapitaPPPChangePct": -4.13,
      "popChangePct": 1.35
    },
    {
      "year": 2021,
      "gdpPPP": 44.956,
      "perCapitaPPP": 49160.3,
      "perCapitaPPPChangePct": 14.72,
      "popChangePct": 1.33
    },
    {
      "year": 2022,
      "gdpPPP": 52.138,
      "perCapitaPPP": 56077.1,
      "perCapitaPPPChangePct": 14.07,
      "popChangePct": 1.75
    },
    {
      "year": 2023,
      "gdpPPP": 56.024,
      "perCapitaPPP": 59029.6,
      "perCapitaPPPChangePct": 5.27,
      "popChangePct": 2.04
    },
    {
      "year": 2024,
      "gdpPPP": 59.677,
      "perCapitaPPP": 61754.4,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 1.79
    },
    {
      "year": 2025,
      "gdpPPP": 63.682,
      "perCapitaPPP": 64785.5,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 1.76
    },
    {
      "year": 2026,
      "gdpPPP": 67.441,
      "perCapitaPPP": 67796.1,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 1.22
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 70.979,
      "perCapitaPPP": 70576.6,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 1.11
    },
    {
      "year": 2028,
      "gdpPPP": 74.316,
      "perCapitaPPP": 73687.1,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 0.3
    },
    {
      "year": 2029,
      "gdpPPP": 77.907,
      "perCapitaPPP": 77041.3,
      "perCapitaPPPChangePct": 4.55,
      "popChangePct": 0.2
    },
    {
      "year": 2030,
      "gdpPPP": 81.712,
      "perCapitaPPP": 80605.0,
      "perCapitaPPPChangePct": 4.63,
      "popChangePct": 0.3
    },
    {
      "year": 2031,
      "gdpPPP": 85.684,
      "perCapitaPPP": 84330.8,
      "perCapitaPPPChangePct": 4.62,
      "popChangePct": 0.2
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CyprusGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
