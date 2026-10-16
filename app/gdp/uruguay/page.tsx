import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Uruguay",
  "slug": "uruguay",
  "iso3": "URY",
  "region": "Americas",
  "rank2026": 84,
  "flagEmoji": "🇺🇾",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Sri Lanka",
      "slug": "sri-lanka",
      "rank": 83
    },
    {
      "name": "Panama",
      "slug": "panama",
      "rank": 85
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 12.217,
      "growth": 6,
      "perCapita": 4157.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 13.636,
      "growth": 1.9,
      "perCapita": 4608.6,
      "popChangePct": 0.68
    },
    {
      "year": 1982,
      "gdp": 11.147,
      "growth": -9.4,
      "perCapita": 3743.3,
      "popChangePct": 0.64
    },
    {
      "year": 1983,
      "gdp": 6.119,
      "growth": -5.9,
      "perCapita": 2041.6,
      "popChangePct": 0.64
    },
    {
      "year": 1984,
      "gdp": 5.819,
      "growth": -1.5,
      "perCapita": 1929.1,
      "popChangePct": 0.63
    },
    {
      "year": 1985,
      "gdp": 5.686,
      "growth": 0.3,
      "perCapita": 1873.1,
      "popChangePct": 0.63
    },
    {
      "year": 1986,
      "gdp": 7.059,
      "growth": 7.5,
      "perCapita": 2312.4,
      "popChangePct": 0.59
    },
    {
      "year": 1987,
      "gdp": 8.832,
      "growth": 5.9,
      "perCapita": 2876.9,
      "popChangePct": 0.56
    },
    {
      "year": 1988,
      "gdp": 9.137,
      "growth": 0.5,
      "perCapita": 2958.9,
      "popChangePct": 0.59
    },
    {
      "year": 1989,
      "gdp": 9.63,
      "growth": 1.1,
      "perCapita": 3101.2,
      "popChangePct": 0.55
    },
    {
      "year": 1990,
      "gdp": 11.204,
      "growth": 0.3,
      "perCapita": 3588.3,
      "popChangePct": 0.55
    },
    {
      "year": 1991,
      "gdp": 13.502,
      "growth": 3.5,
      "perCapita": 4299.4,
      "popChangePct": 0.58
    },
    {
      "year": 1992,
      "gdp": 15.515,
      "growth": 7.9,
      "perCapita": 4911.1,
      "popChangePct": 0.61
    },
    {
      "year": 1993,
      "gdp": 18.064,
      "growth": 2.7,
      "perCapita": 5683.7,
      "popChangePct": 0.6
    },
    {
      "year": 1994,
      "gdp": 21.04,
      "growth": 7.3,
      "perCapita": 6557.8,
      "popChangePct": 0.94
    },
    {
      "year": 1995,
      "gdp": 23.267,
      "growth": -1.4,
      "perCapita": 7207.0,
      "popChangePct": 0.62
    },
    {
      "year": 1996,
      "gdp": 24.73,
      "growth": 5.6,
      "perCapita": 7612.9,
      "popChangePct": 0.62
    },
    {
      "year": 1997,
      "gdp": 26.155,
      "growth": 5.5,
      "perCapita": 7959.7,
      "popChangePct": 1.17
    },
    {
      "year": 1998,
      "gdp": 27.704,
      "growth": 4.5,
      "perCapita": 8364.6,
      "popChangePct": 0.79
    },
    {
      "year": 1999,
      "gdp": 26.178,
      "growth": -1.9,
      "perCapita": 7847.9,
      "popChangePct": 0.72
    },
    {
      "year": 2000,
      "gdp": 24.892,
      "growth": -1.9,
      "perCapita": 7432.3,
      "popChangePct": 0.39
    },
    {
      "year": 2001,
      "gdp": 22.802,
      "growth": -3.8,
      "perCapita": 6803.6,
      "popChangePct": 0.06
    },
    {
      "year": 2002,
      "gdp": 14.863,
      "growth": -7.7,
      "perCapita": 4441.1,
      "popChangePct": -0.12
    },
    {
      "year": 2003,
      "gdp": 13.159,
      "growth": 0.8,
      "perCapita": 3941.7,
      "popChangePct": -0.27
    },
    {
      "year": 2004,
      "gdp": 14.959,
      "growth": 5,
      "perCapita": 4476.9,
      "popChangePct": 0.09
    },
    {
      "year": 2005,
      "gdp": 18.986,
      "growth": 7.5,
      "perCapita": 5663.5,
      "popChangePct": 0.33
    },
    {
      "year": 2006,
      "gdp": 21.416,
      "growth": 4.1,
      "perCapita": 6377.5,
      "popChangePct": 0.18
    },
    {
      "year": 2007,
      "gdp": 25.603,
      "growth": 6.5,
      "perCapita": 7622.8,
      "popChangePct": 0.03
    },
    {
      "year": 2008,
      "gdp": 33.151,
      "growth": 7.2,
      "perCapita": 9857.3,
      "popChangePct": 0.12
    },
    {
      "year": 2009,
      "gdp": 34.565,
      "growth": 4.2,
      "perCapita": 10232.1,
      "popChangePct": 0.45
    },
    {
      "year": 2010,
      "gdp": 43.967,
      "growth": 7.8,
      "perCapita": 12943.9,
      "popChangePct": 0.56
    },
    {
      "year": 2011,
      "gdp": 52.354,
      "growth": 5.2,
      "perCapita": 15341.3,
      "popChangePct": 0.47
    },
    {
      "year": 2012,
      "gdp": 55.938,
      "growth": 3.5,
      "perCapita": 16320.2,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdp": 62.857,
      "growth": 4.6,
      "perCapita": 18261.6,
      "popChangePct": 0.41
    },
    {
      "year": 2014,
      "gdp": 62.546,
      "growth": 3.2,
      "perCapita": 18090.9,
      "popChangePct": 0.44
    },
    {
      "year": 2015,
      "gdp": 58.218,
      "growth": 0.4,
      "perCapita": 16765.1,
      "popChangePct": 0.46
    },
    {
      "year": 2016,
      "gdp": 57.58,
      "growth": 1.7,
      "perCapita": 16516.7,
      "popChangePct": 0.37
    },
    {
      "year": 2017,
      "gdp": 65.068,
      "growth": 1.7,
      "perCapita": 18608.3,
      "popChangePct": 0.32
    },
    {
      "year": 2018,
      "gdp": 65.37,
      "growth": 0.2,
      "perCapita": 18656.0,
      "popChangePct": 0.2
    },
    {
      "year": 2019,
      "gdp": 62.229,
      "growth": 0.9,
      "perCapita": 17740.5,
      "popChangePct": 0.11
    },
    {
      "year": 2020,
      "gdp": 53.557,
      "growth": -7.4,
      "perCapita": 15256.9,
      "popChangePct": 0.06
    },
    {
      "year": 2021,
      "gdp": 60.742,
      "growth": 5.8,
      "perCapita": 17313.5,
      "popChangePct": -0.06
    },
    {
      "year": 2022,
      "gdp": 71.247,
      "growth": 4.6,
      "perCapita": 20347.5,
      "popChangePct": -0.2
    },
    {
      "year": 2023,
      "gdp": 79.214,
      "growth": 0.8,
      "perCapita": 22655.8,
      "popChangePct": -0.14
    },
    {
      "year": 2024,
      "gdp": 82.323,
      "growth": 3.3,
      "perCapita": 23576.3,
      "popChangePct": -0.11
    },
    {
      "year": 2025,
      "gdp": 85.575,
      "growth": 1.8,
      "perCapita": 24548.8,
      "popChangePct": -0.17
    },
    {
      "year": 2026,
      "gdp": 96.092,
      "growth": 1.8,
      "perCapita": 27608.0,
      "popChangePct": -0.14
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 100.859,
      "growth": 2.6,
      "perCapita": 29017.4,
      "popChangePct": -0.14
    },
    {
      "year": 2028,
      "gdp": 104.917,
      "growth": 2.3,
      "perCapita": 30219.7,
      "popChangePct": -0.12
    },
    {
      "year": 2029,
      "gdp": 109.609,
      "growth": 2.2,
      "perCapita": 31599.0,
      "popChangePct": -0.09
    },
    {
      "year": 2030,
      "gdp": 115.274,
      "growth": 2.2,
      "perCapita": 33254.0,
      "popChangePct": -0.09
    },
    {
      "year": 2031,
      "gdp": 121.215,
      "growth": 2.2,
      "perCapita": 34985.4,
      "popChangePct": -0.03
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 14.13,
      "perCapitaPPP": 4808.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 15.761,
      "perCapitaPPP": 5326.8,
      "perCapitaPPPChangePct": 10.78,
      "popChangePct": 0.68
    },
    {
      "year": 1982,
      "gdpPPP": 15.163,
      "perCapitaPPP": 5091.8,
      "perCapitaPPPChangePct": -4.41,
      "popChangePct": 0.64
    },
    {
      "year": 1983,
      "gdpPPP": 14.835,
      "perCapitaPPP": 4949.6,
      "perCapitaPPPChangePct": -2.79,
      "popChangePct": 0.64
    },
    {
      "year": 1984,
      "gdpPPP": 15.146,
      "perCapitaPPP": 5021.4,
      "perCapitaPPPChangePct": 1.45,
      "popChangePct": 0.63
    },
    {
      "year": 1985,
      "gdpPPP": 15.672,
      "perCapitaPPP": 5162.9,
      "perCapitaPPPChangePct": 2.82,
      "popChangePct": 0.63
    },
    {
      "year": 1986,
      "gdpPPP": 17.186,
      "perCapitaPPP": 5630.0,
      "perCapitaPPPChangePct": 9.05,
      "popChangePct": 0.59
    },
    {
      "year": 1987,
      "gdpPPP": 18.653,
      "perCapitaPPP": 6076.4,
      "perCapitaPPPChangePct": 7.93,
      "popChangePct": 0.56
    },
    {
      "year": 1988,
      "gdpPPP": 19.407,
      "perCapitaPPP": 6284.7,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 0.59
    },
    {
      "year": 1989,
      "gdpPPP": 20.391,
      "perCapitaPPP": 6566.8,
      "perCapitaPPPChangePct": 4.49,
      "popChangePct": 0.55
    },
    {
      "year": 1990,
      "gdpPPP": 21.217,
      "perCapitaPPP": 6795.2,
      "perCapitaPPPChangePct": 3.48,
      "popChangePct": 0.55
    },
    {
      "year": 1991,
      "gdpPPP": 22.71,
      "perCapitaPPP": 7231.6,
      "perCapitaPPPChangePct": 6.42,
      "popChangePct": 0.58
    },
    {
      "year": 1992,
      "gdpPPP": 25.07,
      "perCapitaPPP": 7935.4,
      "perCapitaPPPChangePct": 9.73,
      "popChangePct": 0.61
    },
    {
      "year": 1993,
      "gdpPPP": 26.347,
      "perCapitaPPP": 8289.7,
      "perCapitaPPPChangePct": 4.46,
      "popChangePct": 0.6
    },
    {
      "year": 1994,
      "gdpPPP": 28.869,
      "perCapitaPPP": 8998.0,
      "perCapitaPPPChangePct": 8.55,
      "popChangePct": 0.94
    },
    {
      "year": 1995,
      "gdpPPP": 29.047,
      "perCapitaPPP": 8997.4,
      "perCapitaPPPChangePct": -0.01,
      "popChangePct": 0.62
    },
    {
      "year": 1996,
      "gdpPPP": 31.229,
      "perCapitaPPP": 9613.5,
      "perCapitaPPPChangePct": 6.85,
      "popChangePct": 0.62
    },
    {
      "year": 1997,
      "gdpPPP": 33.513,
      "perCapitaPPP": 10198.9,
      "perCapitaPPPChangePct": 6.09,
      "popChangePct": 1.17
    },
    {
      "year": 1998,
      "gdpPPP": 35.421,
      "perCapitaPPP": 10694.5,
      "perCapitaPPPChangePct": 4.86,
      "popChangePct": 0.79
    },
    {
      "year": 1999,
      "gdpPPP": 35.226,
      "perCapitaPPP": 10560.5,
      "perCapitaPPPChangePct": -1.25,
      "popChangePct": 0.72
    },
    {
      "year": 2000,
      "gdpPPP": 35.329,
      "perCapitaPPP": 10548.5,
      "perCapitaPPPChangePct": -0.11,
      "popChangePct": 0.39
    },
    {
      "year": 2001,
      "gdpPPP": 34.735,
      "perCapitaPPP": 10364.2,
      "perCapitaPPPChangePct": -1.75,
      "popChangePct": 0.06
    },
    {
      "year": 2002,
      "gdpPPP": 32.548,
      "perCapitaPPP": 9725.4,
      "perCapitaPPPChangePct": -6.16,
      "popChangePct": -0.12
    },
    {
      "year": 2003,
      "gdpPPP": 33.458,
      "perCapitaPPP": 10022.0,
      "perCapitaPPPChangePct": 3.05,
      "popChangePct": -0.27
    },
    {
      "year": 2004,
      "gdpPPP": 36.076,
      "perCapitaPPP": 10796.7,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 0.09
    },
    {
      "year": 2005,
      "gdpPPP": 39.983,
      "perCapitaPPP": 11927.0,
      "perCapitaPPPChangePct": 10.47,
      "popChangePct": 0.33
    },
    {
      "year": 2006,
      "gdpPPP": 42.906,
      "perCapitaPPP": 12777.2,
      "perCapitaPPPChangePct": 7.13,
      "popChangePct": 0.18
    },
    {
      "year": 2007,
      "gdpPPP": 46.951,
      "perCapitaPPP": 13978.5,
      "perCapitaPPPChangePct": 9.4,
      "popChangePct": 0.03
    },
    {
      "year": 2008,
      "gdpPPP": 51.29,
      "perCapitaPPP": 15250.9,
      "perCapitaPPPChangePct": 9.1,
      "popChangePct": 0.12
    },
    {
      "year": 2009,
      "gdpPPP": 53.796,
      "perCapitaPPP": 15925.0,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 0.45
    },
    {
      "year": 2010,
      "gdpPPP": 58.699,
      "perCapitaPPP": 17281.0,
      "perCapitaPPPChangePct": 8.52,
      "popChangePct": 0.56
    },
    {
      "year": 2011,
      "gdpPPP": 63.002,
      "perCapitaPPP": 18461.5,
      "perCapitaPPPChangePct": 6.83,
      "popChangePct": 0.47
    },
    {
      "year": 2012,
      "gdpPPP": 66.446,
      "perCapitaPPP": 19385.9,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 0.44
    },
    {
      "year": 2013,
      "gdpPPP": 70.711,
      "perCapitaPPP": 20543.3,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 0.41
    },
    {
      "year": 2014,
      "gdpPPP": 74.272,
      "perCapitaPPP": 21482.7,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.44
    },
    {
      "year": 2015,
      "gdpPPP": 75.24,
      "perCapitaPPP": 21666.7,
      "perCapitaPPPChangePct": 0.86,
      "popChangePct": 0.46
    },
    {
      "year": 2016,
      "gdpPPP": 77.238,
      "perCapitaPPP": 22155.7,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 0.37
    },
    {
      "year": 2017,
      "gdpPPP": 79.99,
      "perCapitaPPP": 22875.7,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 0.32
    },
    {
      "year": 2018,
      "gdpPPP": 82.781,
      "perCapitaPPP": 23624.8,
      "perCapitaPPPChangePct": 3.27,
      "popChangePct": 0.2
    },
    {
      "year": 2019,
      "gdpPPP": 87.589,
      "perCapitaPPP": 24970.0,
      "perCapitaPPPChangePct": 5.69,
      "popChangePct": 0.11
    },
    {
      "year": 2020,
      "gdpPPP": 87.439,
      "perCapitaPPP": 24909.3,
      "perCapitaPPPChangePct": -0.24,
      "popChangePct": 0.06
    },
    {
      "year": 2021,
      "gdpPPP": 99.971,
      "perCapitaPPP": 28495.1,
      "perCapitaPPPChangePct": 14.4,
      "popChangePct": -0.06
    },
    {
      "year": 2022,
      "gdpPPP": 112.014,
      "perCapitaPPP": 31990.3,
      "perCapitaPPPChangePct": 12.27,
      "popChangePct": -0.2
    },
    {
      "year": 2023,
      "gdpPPP": 117.043,
      "perCapitaPPP": 33475.4,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": -0.14
    },
    {
      "year": 2024,
      "gdpPPP": 123.938,
      "perCapitaPPP": 35494.4,
      "perCapitaPPPChangePct": 6.03,
      "popChangePct": -0.11
    },
    {
      "year": 2025,
      "gdpPPP": 129.729,
      "perCapitaPPP": 37214.9,
      "perCapitaPPPChangePct": 4.85,
      "popChangePct": -0.17
    },
    {
      "year": 2026,
      "gdpPPP": 135.847,
      "perCapitaPPP": 39029.8,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": -0.14
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 142.438,
      "perCapitaPPP": 40979.9,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": -0.14
    },
    {
      "year": 2028,
      "gdpPPP": 148.122,
      "perCapitaPPP": 42664.2,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": -0.12
    },
    {
      "year": 2029,
      "gdpPPP": 154.119,
      "perCapitaPPP": 44430.5,
      "perCapitaPPPChangePct": 4.14,
      "popChangePct": -0.09
    },
    {
      "year": 2030,
      "gdpPPP": 160.432,
      "perCapitaPPP": 46281.3,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": -0.09
    },
    {
      "year": 2031,
      "gdpPPP": 166.952,
      "perCapitaPPP": 48186.3,
      "perCapitaPPPChangePct": 4.12,
      "popChangePct": -0.03
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function UruguayGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
