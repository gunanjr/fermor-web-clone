import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bahamas",
  "slug": "bahamas",
  "iso3": "BHS",
  "region": "Americas",
  "rank2026": 146,
  "flagEmoji": "🇧🇸",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Mauritius",
      "slug": "mauritius",
      "rank": 145
    },
    {
      "name": "Congo",
      "slug": "congo",
      "rank": 147
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.598,
      "growth": 7.1,
      "perCapita": 12291.7,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.692,
      "growth": -2.9,
      "perCapita": 12496.2,
      "popChangePct": 1.9
    },
    {
      "year": 1982,
      "gdp": 3.031,
      "growth": 6.3,
      "perCapita": 13749.5,
      "popChangePct": 2.33
    },
    {
      "year": 1983,
      "gdp": 3.373,
      "growth": 6.8,
      "perCapita": 14961.6,
      "popChangePct": 2.27
    },
    {
      "year": 1984,
      "gdp": 3.603,
      "growth": 2.4,
      "perCapita": 15630.1,
      "popChangePct": 2.22
    },
    {
      "year": 1985,
      "gdp": 3.923,
      "growth": 4.1,
      "perCapita": 16801.1,
      "popChangePct": 1.74
    },
    {
      "year": 1986,
      "gdp": 4.241,
      "growth": 2.6,
      "perCapita": 17854.1,
      "popChangePct": 1.71
    },
    {
      "year": 1987,
      "gdp": 4.669,
      "growth": 3.7,
      "perCapita": 19329.9,
      "popChangePct": 1.68
    },
    {
      "year": 1988,
      "gdp": 4.855,
      "growth": 2.3,
      "perCapita": 19687.5,
      "popChangePct": 2.07
    },
    {
      "year": 1989,
      "gdp": 5.473,
      "growth": 2.3,
      "perCapita": 21818.6,
      "popChangePct": 1.62
    },
    {
      "year": 1990,
      "gdp": 5.218,
      "growth": 1.1,
      "perCapita": 20460.3,
      "popChangePct": 1.59
    },
    {
      "year": 1991,
      "gdp": 5.128,
      "growth": -4.2,
      "perCapita": 19767.7,
      "popChangePct": 1.57
    },
    {
      "year": 1992,
      "gdp": 5.125,
      "growth": -3.8,
      "perCapita": 19417.2,
      "popChangePct": 1.93
    },
    {
      "year": 1993,
      "gdp": 5.097,
      "growth": 0.3,
      "perCapita": 18979.0,
      "popChangePct": 1.89
    },
    {
      "year": 1994,
      "gdp": 5.372,
      "growth": 3.1,
      "perCapita": 19660.9,
      "popChangePct": 1.49
    },
    {
      "year": 1995,
      "gdp": 5.653,
      "growth": 4.4,
      "perCapita": 20271.2,
      "popChangePct": 2.2
    },
    {
      "year": 1996,
      "gdp": 5.95,
      "growth": 4.2,
      "perCapita": 20974.5,
      "popChangePct": 1.79
    },
    {
      "year": 1997,
      "gdp": 6.332,
      "growth": 4.9,
      "perCapita": 21951.8,
      "popChangePct": 1.41
    },
    {
      "year": 1998,
      "gdp": 6.833,
      "growth": 4.7,
      "perCapita": 23300.8,
      "popChangePct": 1.74
    },
    {
      "year": 1999,
      "gdp": 7.684,
      "growth": 7.1,
      "perCapita": 25780.5,
      "popChangePct": 1.71
    },
    {
      "year": 2000,
      "gdp": 8.076,
      "growth": 4.1,
      "perCapita": 26601.4,
      "popChangePct": 2.01
    },
    {
      "year": 2001,
      "gdp": 8.318,
      "growth": 2.6,
      "perCapita": 26971.3,
      "popChangePct": 1.32
    },
    {
      "year": 2002,
      "gdp": 8.881,
      "growth": 2.7,
      "perCapita": 28357.9,
      "popChangePct": 1.62
    },
    {
      "year": 2003,
      "gdp": 8.87,
      "growth": -1.3,
      "perCapita": 27896.3,
      "popChangePct": 1.6
    },
    {
      "year": 2004,
      "gdp": 9.055,
      "growth": 0.9,
      "perCapita": 28056.6,
      "popChangePct": 1.57
    },
    {
      "year": 2005,
      "gdp": 9.836,
      "growth": 3.4,
      "perCapita": 30030.9,
      "popChangePct": 1.55
    },
    {
      "year": 2006,
      "gdp": 10.167,
      "growth": 2.5,
      "perCapita": 30594.7,
      "popChangePct": 1.22
    },
    {
      "year": 2007,
      "gdp": 10.618,
      "growth": 1.4,
      "perCapita": 31498.5,
      "popChangePct": 1.51
    },
    {
      "year": 2008,
      "gdp": 10.526,
      "growth": -2.3,
      "perCapita": 30787.6,
      "popChangePct": 1.48
    },
    {
      "year": 2009,
      "gdp": 9.982,
      "growth": -4.2,
      "perCapita": 28793.3,
      "popChangePct": 1.46
    },
    {
      "year": 2010,
      "gdp": 10.096,
      "growth": 1.5,
      "perCapita": 28725.1,
      "popChangePct": 1.15
    },
    {
      "year": 2011,
      "gdp": 10.07,
      "growth": 0.6,
      "perCapita": 28365.9,
      "popChangePct": 1.14
    },
    {
      "year": 2012,
      "gdp": 10.72,
      "growth": 4.6,
      "perCapita": 29895.4,
      "popChangePct": 1.13
    },
    {
      "year": 2013,
      "gdp": 10.475,
      "growth": -2.9,
      "perCapita": 28919.0,
      "popChangePct": 0.84
    },
    {
      "year": 2014,
      "gdp": 11.139,
      "growth": 1.8,
      "perCapita": 30441.3,
      "popChangePct": 1.1
    },
    {
      "year": 2015,
      "gdp": 11.838,
      "growth": 1,
      "perCapita": 32022.1,
      "popChangePct": 1.09
    },
    {
      "year": 2016,
      "gdp": 11.881,
      "growth": -1.2,
      "perCapita": 31811.5,
      "popChangePct": 0.81
    },
    {
      "year": 2017,
      "gdp": 12.447,
      "growth": 3.4,
      "perCapita": 32984.2,
      "popChangePct": 1.07
    },
    {
      "year": 2018,
      "gdp": 12.819,
      "growth": 2.4,
      "perCapita": 33618.1,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdp": 13.277,
      "growth": -0.8,
      "perCapita": 34455.2,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdp": 10.363,
      "growth": -20.1,
      "perCapita": 26612.6,
      "popChangePct": 1.04
    },
    {
      "year": 2021,
      "gdp": 12.037,
      "growth": 17.6,
      "perCapita": 30522.7,
      "popChangePct": 1.29
    },
    {
      "year": 2022,
      "gdp": 13.897,
      "growth": 10.9,
      "perCapita": 34801.7,
      "popChangePct": 1.27
    },
    {
      "year": 2023,
      "gdp": 15.271,
      "growth": 3,
      "perCapita": 37827.6,
      "popChangePct": 1.25
    },
    {
      "year": 2024,
      "gdp": 15.833,
      "growth": 3.4,
      "perCapita": 38791.8,
      "popChangePct": 0.99
    },
    {
      "year": 2025,
      "gdp": 16.508,
      "growth": 2.8,
      "perCapita": 40005.1,
      "popChangePct": 1.23
    },
    {
      "year": 2026,
      "gdp": 17.042,
      "growth": 2.1,
      "perCapita": 40892.4,
      "popChangePct": 0.97
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 17.605,
      "growth": 1.9,
      "perCapita": 41824.7,
      "popChangePct": 0.96
    },
    {
      "year": 2028,
      "gdp": 18.208,
      "growth": 1.8,
      "perCapita": 42829.3,
      "popChangePct": 0.95
    },
    {
      "year": 2029,
      "gdp": 18.851,
      "growth": 1.5,
      "perCapita": 43901.9,
      "popChangePct": 0.94
    },
    {
      "year": 2030,
      "gdp": 19.513,
      "growth": 1.5,
      "perCapita": 44992.7,
      "popChangePct": 1.17
    },
    {
      "year": 2031,
      "gdp": 20.201,
      "growth": 1.5,
      "perCapita": 46472.2,
      "popChangePct": 0.23
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 2.719,
      "perCapitaPPP": 12865.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.89,
      "perCapitaPPP": 13419.2,
      "perCapitaPPPChangePct": 4.3,
      "popChangePct": 1.9
    },
    {
      "year": 1982,
      "gdpPPP": 3.262,
      "perCapitaPPP": 14800.2,
      "perCapitaPPPChangePct": 10.29,
      "popChangePct": 2.33
    },
    {
      "year": 1983,
      "gdpPPP": 3.621,
      "perCapitaPPP": 16059.0,
      "perCapitaPPPChangePct": 8.5,
      "popChangePct": 2.27
    },
    {
      "year": 1984,
      "gdpPPP": 3.841,
      "perCapitaPPP": 16665.9,
      "perCapitaPPPChangePct": 3.78,
      "popChangePct": 2.22
    },
    {
      "year": 1985,
      "gdpPPP": 4.125,
      "perCapitaPPP": 17666.4,
      "perCapitaPPPChangePct": 6.0,
      "popChangePct": 1.74
    },
    {
      "year": 1986,
      "gdpPPP": 4.318,
      "perCapitaPPP": 18177.2,
      "perCapitaPPPChangePct": 2.89,
      "popChangePct": 1.71
    },
    {
      "year": 1987,
      "gdpPPP": 4.588,
      "perCapitaPPP": 18994.9,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": 1.68
    },
    {
      "year": 1988,
      "gdpPPP": 4.857,
      "perCapitaPPP": 19697.8,
      "perCapitaPPPChangePct": 3.7,
      "popChangePct": 2.07
    },
    {
      "year": 1989,
      "gdpPPP": 5.164,
      "perCapitaPPP": 20588.1,
      "perCapitaPPPChangePct": 4.52,
      "popChangePct": 1.62
    },
    {
      "year": 1990,
      "gdpPPP": 5.414,
      "perCapitaPPP": 21225.6,
      "perCapitaPPPChangePct": 3.1,
      "popChangePct": 1.59
    },
    {
      "year": 1991,
      "gdpPPP": 5.363,
      "perCapitaPPP": 20670.4,
      "perCapitaPPPChangePct": -2.62,
      "popChangePct": 1.57
    },
    {
      "year": 1992,
      "gdpPPP": 5.275,
      "perCapitaPPP": 19985.0,
      "perCapitaPPPChangePct": -3.32,
      "popChangePct": 1.93
    },
    {
      "year": 1993,
      "gdpPPP": 5.417,
      "perCapitaPPP": 20170.7,
      "perCapitaPPPChangePct": 0.93,
      "popChangePct": 1.89
    },
    {
      "year": 1994,
      "gdpPPP": 5.707,
      "perCapitaPPP": 20886.8,
      "perCapitaPPPChangePct": 3.55,
      "popChangePct": 1.49
    },
    {
      "year": 1995,
      "gdpPPP": 6.081,
      "perCapitaPPP": 21807.2,
      "perCapitaPPPChangePct": 4.41,
      "popChangePct": 2.2
    },
    {
      "year": 1996,
      "gdpPPP": 6.454,
      "perCapitaPPP": 22752.8,
      "perCapitaPPPChangePct": 4.34,
      "popChangePct": 1.79
    },
    {
      "year": 1997,
      "gdpPPP": 6.89,
      "perCapitaPPP": 23885.6,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": 1.41
    },
    {
      "year": 1998,
      "gdpPPP": 7.296,
      "perCapitaPPP": 24879.8,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 1.74
    },
    {
      "year": 1999,
      "gdpPPP": 7.928,
      "perCapitaPPP": 26600.0,
      "perCapitaPPPChangePct": 6.91,
      "popChangePct": 1.71
    },
    {
      "year": 2000,
      "gdpPPP": 8.444,
      "perCapitaPPP": 27812.4,
      "perCapitaPPPChangePct": 4.56,
      "popChangePct": 2.01
    },
    {
      "year": 2001,
      "gdpPPP": 8.861,
      "perCapitaPPP": 28732.5,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 1.32
    },
    {
      "year": 2002,
      "gdpPPP": 9.242,
      "perCapitaPPP": 29510.3,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": 1.62
    },
    {
      "year": 2003,
      "gdpPPP": 9.305,
      "perCapitaPPP": 29265.2,
      "perCapitaPPPChangePct": -0.83,
      "popChangePct": 1.6
    },
    {
      "year": 2004,
      "gdpPPP": 9.64,
      "perCapitaPPP": 29867.9,
      "perCapitaPPPChangePct": 2.06,
      "popChangePct": 1.57
    },
    {
      "year": 2005,
      "gdpPPP": 10.28,
      "perCapitaPPP": 31385.1,
      "perCapitaPPPChangePct": 5.08,
      "popChangePct": 1.55
    },
    {
      "year": 2006,
      "gdpPPP": 10.863,
      "perCapitaPPP": 32689.7,
      "perCapitaPPPChangePct": 4.16,
      "popChangePct": 1.22
    },
    {
      "year": 2007,
      "gdpPPP": 11.319,
      "perCapitaPPP": 33577.6,
      "perCapitaPPPChangePct": 2.72,
      "popChangePct": 1.51
    },
    {
      "year": 2008,
      "gdpPPP": 11.269,
      "perCapitaPPP": 32961.2,
      "perCapitaPPPChangePct": -1.84,
      "popChangePct": 1.48
    },
    {
      "year": 2009,
      "gdpPPP": 10.865,
      "perCapitaPPP": 31341.1,
      "perCapitaPPPChangePct": -4.92,
      "popChangePct": 1.46
    },
    {
      "year": 2010,
      "gdpPPP": 11.166,
      "perCapitaPPP": 31771.6,
      "perCapitaPPPChangePct": 1.37,
      "popChangePct": 1.15
    },
    {
      "year": 2011,
      "gdpPPP": 11.467,
      "perCapitaPPP": 32298.8,
      "perCapitaPPPChangePct": 1.66,
      "popChangePct": 1.14
    },
    {
      "year": 2012,
      "gdpPPP": 12.219,
      "perCapitaPPP": 34073.4,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 1.13
    },
    {
      "year": 2013,
      "gdpPPP": 12.071,
      "perCapitaPPP": 33323.9,
      "perCapitaPPPChangePct": -2.2,
      "popChangePct": 0.84
    },
    {
      "year": 2014,
      "gdpPPP": 12.508,
      "perCapitaPPP": 34182.4,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 1.1
    },
    {
      "year": 2015,
      "gdpPPP": 12.75,
      "perCapitaPPP": 34490.0,
      "perCapitaPPPChangePct": 0.9,
      "popChangePct": 1.09
    },
    {
      "year": 2016,
      "gdpPPP": 12.722,
      "perCapitaPPP": 34064.1,
      "perCapitaPPPChangePct": -1.23,
      "popChangePct": 0.81
    },
    {
      "year": 2017,
      "gdpPPP": 13.387,
      "perCapitaPPP": 35474.6,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": 1.07
    },
    {
      "year": 2018,
      "gdpPPP": 13.835,
      "perCapitaPPP": 36280.8,
      "perCapitaPPPChangePct": 2.27,
      "popChangePct": 1.06
    },
    {
      "year": 2019,
      "gdpPPP": 14.254,
      "perCapitaPPP": 36990.8,
      "perCapitaPPPChangePct": 1.96,
      "popChangePct": 1.05
    },
    {
      "year": 2020,
      "gdpPPP": 10.769,
      "perCapitaPPP": 27655.4,
      "perCapitaPPPChangePct": -25.24,
      "popChangePct": 1.04
    },
    {
      "year": 2021,
      "gdpPPP": 12.313,
      "perCapitaPPP": 31223.1,
      "perCapitaPPPChangePct": 12.9,
      "popChangePct": 1.29
    },
    {
      "year": 2022,
      "gdpPPP": 14.624,
      "perCapitaPPP": 36621.8,
      "perCapitaPPPChangePct": 17.29,
      "popChangePct": 1.27
    },
    {
      "year": 2023,
      "gdpPPP": 15.627,
      "perCapitaPPP": 38708.9,
      "perCapitaPPPChangePct": 5.7,
      "popChangePct": 1.25
    },
    {
      "year": 2024,
      "gdpPPP": 16.556,
      "perCapitaPPP": 40563.9,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 0.99
    },
    {
      "year": 2025,
      "gdpPPP": 17.502,
      "perCapitaPPP": 42416.0,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 1.23
    },
    {
      "year": 2026,
      "gdpPPP": 18.382,
      "perCapitaPPP": 44106.4,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 0.97
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 19.142,
      "perCapitaPPP": 45476.6,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 0.96
    },
    {
      "year": 2028,
      "gdpPPP": 19.807,
      "perCapitaPPP": 46589.1,
      "perCapitaPPPChangePct": 2.45,
      "popChangePct": 0.95
    },
    {
      "year": 2029,
      "gdpPPP": 20.472,
      "perCapitaPPP": 47675.7,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 0.94
    },
    {
      "year": 2030,
      "gdpPPP": 21.16,
      "perCapitaPPP": 48792.2,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 1.17
    },
    {
      "year": 2031,
      "gdpPPP": 21.866,
      "perCapitaPPP": 50302.1,
      "perCapitaPPPChangePct": 3.09,
      "popChangePct": 0.23
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BahamasGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
