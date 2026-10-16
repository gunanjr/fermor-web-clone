import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "State of Palestine",
  "slug": "state-of-palestine",
  "iso3": "WBG",
  "region": "Asia",
  "rank2026": 153,
  "flagEmoji": "🏳️",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Equatorial Guinea",
      "slug": "equatorial-guinea",
      "rank": 152
    },
    {
      "name": "Togo",
      "slug": "togo",
      "rank": 154
    }
  ],
  "history": [
    {
      "year": 1994,
      "gdp": 2.843,
      "growth": null,
      "perCapita": 1227.2,
      "popChangePct": 6.09
    },
    {
      "year": 1995,
      "gdp": 3.283,
      "growth": 7.1,
      "perCapita": 1322.1,
      "popChangePct": 7.16
    },
    {
      "year": 1996,
      "gdp": 3.41,
      "growth": 1.2,
      "perCapita": 1296.1,
      "popChangePct": 5.96
    },
    {
      "year": 1997,
      "gdp": 3.76,
      "growth": 14.7,
      "perCapita": 1350.9,
      "popChangePct": 5.78
    },
    {
      "year": 1998,
      "gdp": 4.068,
      "growth": 14.3,
      "perCapita": 1416.6,
      "popChangePct": 3.2
    },
    {
      "year": 1999,
      "gdp": 4.271,
      "growth": 8.3,
      "perCapita": 1441.9,
      "popChangePct": 3.13
    },
    {
      "year": 2000,
      "gdp": 4.314,
      "growth": -8.6,
      "perCapita": 1412.8,
      "popChangePct": 3.07
    },
    {
      "year": 2001,
      "gdp": 4.004,
      "growth": -9.3,
      "perCapita": 1275.7,
      "popChangePct": 2.78
    },
    {
      "year": 2002,
      "gdp": 3.556,
      "growth": -12.5,
      "perCapita": 1102.5,
      "popChangePct": 2.77
    },
    {
      "year": 2003,
      "gdp": 3.968,
      "growth": 14,
      "perCapita": 1197.2,
      "popChangePct": 2.79
    },
    {
      "year": 2004,
      "gdp": 4.603,
      "growth": 21.9,
      "perCapita": 1350.9,
      "popChangePct": 2.78
    },
    {
      "year": 2005,
      "gdp": 5.126,
      "growth": 11.3,
      "perCapita": 1461.1,
      "popChangePct": 2.96
    },
    {
      "year": 2006,
      "gdp": 5.348,
      "growth": -1,
      "perCapita": 1480.7,
      "popChangePct": 2.96
    },
    {
      "year": 2007,
      "gdp": 5.816,
      "growth": 3.8,
      "perCapita": 1563.7,
      "popChangePct": 2.96
    },
    {
      "year": 2008,
      "gdp": 7.31,
      "growth": 7.4,
      "perCapita": 1913.3,
      "popChangePct": 2.74
    },
    {
      "year": 2009,
      "gdp": 8.086,
      "growth": 8.6,
      "perCapita": 2061.6,
      "popChangePct": 2.64
    },
    {
      "year": 2010,
      "gdp": 9.682,
      "growth": 5.8,
      "perCapita": 2406.3,
      "popChangePct": 2.58
    },
    {
      "year": 2011,
      "gdp": 11.186,
      "growth": 9.6,
      "perCapita": 2711.9,
      "popChangePct": 2.54
    },
    {
      "year": 2012,
      "gdp": 12.208,
      "growth": 6.1,
      "perCapita": 2888.6,
      "popChangePct": 2.45
    },
    {
      "year": 2013,
      "gdp": 13.515,
      "growth": 4.7,
      "perCapita": 3123.0,
      "popChangePct": 2.41
    },
    {
      "year": 2014,
      "gdp": 13.99,
      "growth": -0.2,
      "perCapita": 3158.6,
      "popChangePct": 2.33
    },
    {
      "year": 2015,
      "gdp": 13.972,
      "growth": 3.7,
      "perCapita": 3084.1,
      "popChangePct": 2.28
    },
    {
      "year": 2016,
      "gdp": 15.405,
      "growth": 8.9,
      "perCapita": 3325.8,
      "popChangePct": 2.25
    },
    {
      "year": 2017,
      "gdp": 16.128,
      "growth": 1.4,
      "perCapita": 3407.3,
      "popChangePct": 2.18
    },
    {
      "year": 2018,
      "gdp": 16.277,
      "growth": 1.2,
      "perCapita": 3353.2,
      "popChangePct": 2.56
    },
    {
      "year": 2019,
      "gdp": 17.134,
      "growth": 1.4,
      "perCapita": 3442.8,
      "popChangePct": 2.53
    },
    {
      "year": 2020,
      "gdp": 15.532,
      "growth": -11.3,
      "perCapita": 3044.7,
      "popChangePct": 2.49
    },
    {
      "year": 2021,
      "gdp": 18.109,
      "growth": 7,
      "perCapita": 3464.4,
      "popChangePct": 2.47
    },
    {
      "year": 2022,
      "gdp": 19.166,
      "growth": 4.1,
      "perCapita": 3579.2,
      "popChangePct": 2.45
    },
    {
      "year": 2023,
      "gdp": 18.635,
      "growth": -1,
      "perCapita": 3398.4,
      "popChangePct": 2.39
    },
    {
      "year": 2024,
      "gdp": 16.017,
      "growth": -22.9,
      "perCapita": 2853.3,
      "popChangePct": 2.37
    }
  ],
  "projections": [],
  "pppHistory": [
    {
      "year": 1994,
      "gdpPPP": 5.848,
      "perCapitaPPP": 2523.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": 6.09
    },
    {
      "year": 1995,
      "gdpPPP": 6.395,
      "perCapitaPPP": 2575.4,
      "perCapitaPPPChangePct": 2.04,
      "popChangePct": 7.16
    },
    {
      "year": 1996,
      "gdpPPP": 6.591,
      "perCapitaPPP": 2505.5,
      "perCapitaPPPChangePct": -2.72,
      "popChangePct": 5.96
    },
    {
      "year": 1997,
      "gdpPPP": 7.688,
      "perCapitaPPP": 2762.5,
      "perCapitaPPPChangePct": 10.26,
      "popChangePct": 5.78
    },
    {
      "year": 1998,
      "gdpPPP": 8.889,
      "perCapitaPPP": 3095.6,
      "perCapitaPPPChangePct": 12.06,
      "popChangePct": 3.2
    },
    {
      "year": 1999,
      "gdpPPP": 9.762,
      "perCapitaPPP": 3295.3,
      "perCapitaPPPChangePct": 6.45,
      "popChangePct": 3.13
    },
    {
      "year": 2000,
      "gdpPPP": 9.129,
      "perCapitaPPP": 2989.7,
      "perCapitaPPPChangePct": -9.27,
      "popChangePct": 3.07
    },
    {
      "year": 2001,
      "gdpPPP": 8.465,
      "perCapitaPPP": 2697.2,
      "perCapitaPPPChangePct": -9.78,
      "popChangePct": 2.78
    },
    {
      "year": 2002,
      "gdpPPP": 7.523,
      "perCapitaPPP": 2332.6,
      "perCapitaPPPChangePct": -13.52,
      "popChangePct": 2.77
    },
    {
      "year": 2003,
      "gdpPPP": 8.747,
      "perCapitaPPP": 2638.9,
      "perCapitaPPPChangePct": 13.13,
      "popChangePct": 2.79
    },
    {
      "year": 2004,
      "gdpPPP": 10.951,
      "perCapitaPPP": 3213.9,
      "perCapitaPPPChangePct": 21.79,
      "popChangePct": 2.78
    },
    {
      "year": 2005,
      "gdpPPP": 12.57,
      "perCapitaPPP": 3583.0,
      "perCapitaPPPChangePct": 11.49,
      "popChangePct": 2.96
    },
    {
      "year": 2006,
      "gdpPPP": 12.828,
      "perCapitaPPP": 3551.6,
      "perCapitaPPPChangePct": -0.88,
      "popChangePct": 2.96
    },
    {
      "year": 2007,
      "gdpPPP": 13.675,
      "perCapitaPPP": 3676.9,
      "perCapitaPPPChangePct": 3.53,
      "popChangePct": 2.96
    },
    {
      "year": 2008,
      "gdpPPP": 14.974,
      "perCapitaPPP": 3919.1,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 2.74
    },
    {
      "year": 2009,
      "gdpPPP": 16.361,
      "perCapitaPPP": 4171.5,
      "perCapitaPPPChangePct": 6.44,
      "popChangePct": 2.64
    },
    {
      "year": 2010,
      "gdpPPP": 17.517,
      "perCapitaPPP": 4353.6,
      "perCapitaPPPChangePct": 4.37,
      "popChangePct": 2.58
    },
    {
      "year": 2011,
      "gdpPPP": 19.594,
      "perCapitaPPP": 4750.4,
      "perCapitaPPPChangePct": 9.11,
      "popChangePct": 2.54
    },
    {
      "year": 2012,
      "gdpPPP": 21.176,
      "perCapitaPPP": 5010.4,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 2.45
    },
    {
      "year": 2013,
      "gdpPPP": 22.548,
      "perCapitaPPP": 5210.2,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": 2.41
    },
    {
      "year": 2014,
      "gdpPPP": 22.905,
      "perCapitaPPP": 5171.5,
      "perCapitaPPPChangePct": -0.74,
      "popChangePct": 2.33
    },
    {
      "year": 2015,
      "gdpPPP": 23.978,
      "perCapitaPPP": 5292.6,
      "perCapitaPPPChangePct": 2.34,
      "popChangePct": 2.28
    },
    {
      "year": 2016,
      "gdpPPP": 26.351,
      "perCapitaPPP": 5688.9,
      "perCapitaPPPChangePct": 7.49,
      "popChangePct": 2.25
    },
    {
      "year": 2017,
      "gdpPPP": 27.204,
      "perCapitaPPP": 5747.3,
      "perCapitaPPPChangePct": 1.03,
      "popChangePct": 2.18
    },
    {
      "year": 2018,
      "gdpPPP": 28.401,
      "perCapitaPPP": 5851.0,
      "perCapitaPPPChangePct": 1.8,
      "popChangePct": 2.56
    },
    {
      "year": 2019,
      "gdpPPP": 30.494,
      "perCapitaPPP": 6127.4,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": 2.53
    },
    {
      "year": 2020,
      "gdpPPP": 28.61,
      "perCapitaPPP": 5608.5,
      "perCapitaPPPChangePct": -8.47,
      "popChangePct": 2.49
    },
    {
      "year": 2021,
      "gdpPPP": 27.878,
      "perCapitaPPP": 5333.3,
      "perCapitaPPPChangePct": -4.91,
      "popChangePct": 2.47
    },
    {
      "year": 2022,
      "gdpPPP": 31.08,
      "perCapitaPPP": 5804.3,
      "perCapitaPPPChangePct": 8.83,
      "popChangePct": 2.45
    },
    {
      "year": 2023,
      "gdpPPP": 31.917,
      "perCapitaPPP": 5820.6,
      "perCapitaPPPChangePct": 0.28,
      "popChangePct": 2.39
    },
    {
      "year": 2024,
      "gdpPPP": 25.233,
      "perCapitaPPP": 4495.0,
      "perCapitaPPPChangePct": -22.77,
      "popChangePct": 2.37
    }
  ],
  "pppProjections": []
};

export const metadata = buildGDPMetadata(DATA);

export default function StateOfPalestineGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
