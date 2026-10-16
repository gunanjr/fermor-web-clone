import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Dominica",
  "slug": "dominica",
  "iso3": "DMA",
  "region": "Americas",
  "rank2026": 207,
  "flagEmoji": "🇩🇲",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Saint Kitts & Nevis",
      "slug": "saint-kitts-nevis",
      "rank": 204
    },
    {
      "name": "Tonga",
      "slug": "tonga",
      "rank": 208
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.073,
      "growth": 13.4,
      "perCapita": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.082,
      "growth": 10.8,
      "perCapita": 1112.6,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdp": 0.09,
      "growth": 4.1,
      "perCapita": 1217.6,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdp": 0.099,
      "growth": 2.6,
      "perCapita": 1346.7,
      "popChangePct": -1.35
    },
    {
      "year": 1984,
      "gdp": 0.109,
      "growth": 4.2,
      "perCapita": 1495.3,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdp": 0.119,
      "growth": 1.4,
      "perCapita": 1642.8,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdp": 0.135,
      "growth": 7.1,
      "perCapita": 1864.9,
      "popChangePct": -1.37
    },
    {
      "year": 1987,
      "gdp": 0.152,
      "growth": 6.3,
      "perCapita": 2103.0,
      "popChangePct": 0.0
    },
    {
      "year": 1988,
      "gdp": 0.171,
      "growth": 7.8,
      "perCapita": 2377.9,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdp": 0.185,
      "growth": -0.2,
      "perCapita": 2582.2,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdp": 0.201,
      "growth": 5.4,
      "perCapita": 2819.6,
      "popChangePct": -1.39
    },
    {
      "year": 1991,
      "gdp": 0.22,
      "growth": 1.3,
      "perCapita": 3087.3,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdp": 0.234,
      "growth": 2,
      "perCapita": 3287.8,
      "popChangePct": 0.0
    },
    {
      "year": 1993,
      "gdp": 0.246,
      "growth": 2.2,
      "perCapita": 3448.7,
      "popChangePct": 0.0
    },
    {
      "year": 1994,
      "gdp": 0.264,
      "growth": 0,
      "perCapita": 3713.1,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdp": 0.275,
      "growth": 3,
      "perCapita": 3855.3,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 0.292,
      "growth": 3.1,
      "perCapita": 4104.4,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdp": 0.303,
      "growth": 2.2,
      "perCapita": 4254.4,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdp": 0.322,
      "growth": 3.8,
      "perCapita": 4526.7,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdp": 0.332,
      "growth": 0.4,
      "perCapita": 4657.6,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdp": 0.333,
      "growth": 2.3,
      "perCapita": 4681.2,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdp": 0.34,
      "growth": -0.1,
      "perCapita": 4775.3,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.333,
      "growth": -2.8,
      "perCapita": 4680.3,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 0.343,
      "growth": 6.4,
      "perCapita": 4825.8,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 0.367,
      "growth": 3.1,
      "perCapita": 5165.2,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.364,
      "growth": 0.7,
      "perCapita": 5127.4,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 0.39,
      "growth": 4.7,
      "perCapita": 5497.3,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 0.421,
      "growth": 6.4,
      "perCapita": 5939.9,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 0.458,
      "growth": 7.1,
      "perCapita": 6463.4,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.489,
      "growth": -1.2,
      "perCapita": 6904.0,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.494,
      "growth": 0.7,
      "perCapita": 6981.0,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.501,
      "growth": -0.2,
      "perCapita": 7160.3,
      "popChangePct": -1.41
    },
    {
      "year": 2012,
      "gdp": 0.486,
      "growth": -1.1,
      "perCapita": 6994.9,
      "popChangePct": -1.43
    },
    {
      "year": 2013,
      "gdp": 0.498,
      "growth": -1,
      "perCapita": 7153.5,
      "popChangePct": 1.45
    },
    {
      "year": 2014,
      "gdp": 0.52,
      "growth": 4.8,
      "perCapita": 7388.6,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.541,
      "growth": -2.7,
      "perCapita": 7596.2,
      "popChangePct": 1.43
    },
    {
      "year": 2016,
      "gdp": 0.576,
      "growth": 2.8,
      "perCapita": 8089.2,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 0.522,
      "growth": -6.6,
      "perCapita": 7507.4,
      "popChangePct": -2.82
    },
    {
      "year": 2018,
      "gdp": 0.555,
      "growth": 3.5,
      "perCapita": 7981.0,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdp": 0.612,
      "growth": 5.5,
      "perCapita": 8466.4,
      "popChangePct": 2.86
    },
    {
      "year": 2020,
      "gdp": 0.504,
      "growth": -16.6,
      "perCapita": 6872.2,
      "popChangePct": 1.39
    },
    {
      "year": 2021,
      "gdp": 0.555,
      "growth": 6.9,
      "perCapita": 7530.4,
      "popChangePct": 1.37
    },
    {
      "year": 2022,
      "gdp": 0.607,
      "growth": 5.6,
      "perCapita": 8193.1,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 0.659,
      "growth": 4.7,
      "perCapita": 8852.5,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 0.689,
      "growth": 3.5,
      "perCapita": 9203.6,
      "popChangePct": 1.35
    },
    {
      "year": 2025,
      "gdp": 0.744,
      "growth": 4.5,
      "perCapita": 9894.5,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 0.791,
      "growth": 3.1,
      "perCapita": 10458.8,
      "popChangePct": 1.33
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 0.832,
      "growth": 2.8,
      "perCapita": 10948.4,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 0.873,
      "growth": 2.7,
      "perCapita": 11437.8,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 0.914,
      "growth": 2.4,
      "perCapita": 11913.3,
      "popChangePct": 1.32
    },
    {
      "year": 2030,
      "gdp": 0.953,
      "growth": 2.1,
      "perCapita": 12361.0,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 0.994,
      "growth": 2,
      "perCapita": 12821.5,
      "popChangePct": 1.3
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.132,
      "perCapitaPPP": null,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.16,
      "perCapitaPPP": 2173.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1982,
      "gdpPPP": 0.177,
      "perCapitaPPP": 2411.3,
      "perCapitaPPPChangePct": 10.96,
      "popChangePct": 0.0
    },
    {
      "year": 1983,
      "gdpPPP": 0.189,
      "perCapitaPPP": 2579.0,
      "perCapitaPPPChangePct": 6.96,
      "popChangePct": -1.35
    },
    {
      "year": 1984,
      "gdpPPP": 0.204,
      "perCapitaPPP": 2794.3,
      "perCapitaPPPChangePct": 8.35,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdpPPP": 0.213,
      "perCapitaPPP": 2934.2,
      "perCapitaPPPChangePct": 5.01,
      "popChangePct": 0.0
    },
    {
      "year": 1986,
      "gdpPPP": 0.233,
      "perCapitaPPP": 3216.6,
      "perCapitaPPPChangePct": 9.62,
      "popChangePct": -1.37
    },
    {
      "year": 1987,
      "gdpPPP": 0.254,
      "perCapitaPPP": 3516.8,
      "perCapitaPPPChangePct": 9.34,
      "popChangePct": 0.0
    },
    {
      "year": 1988,
      "gdpPPP": 0.283,
      "perCapitaPPP": 3939.6,
      "perCapitaPPPChangePct": 12.02,
      "popChangePct": 0.0
    },
    {
      "year": 1989,
      "gdpPPP": 0.294,
      "perCapitaPPP": 4101.0,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 0.0
    },
    {
      "year": 1990,
      "gdpPPP": 0.322,
      "perCapitaPPP": 4501.2,
      "perCapitaPPPChangePct": 9.76,
      "popChangePct": -1.39
    },
    {
      "year": 1991,
      "gdpPPP": 0.337,
      "perCapitaPPP": 4733.2,
      "perCapitaPPPChangePct": 5.15,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdpPPP": 0.352,
      "perCapitaPPP": 4938.9,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 0.0
    },
    {
      "year": 1993,
      "gdpPPP": 0.368,
      "perCapitaPPP": 5164.8,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.0
    },
    {
      "year": 1994,
      "gdpPPP": 0.376,
      "perCapitaPPP": 5276.5,
      "perCapitaPPPChangePct": 2.16,
      "popChangePct": 0.0
    },
    {
      "year": 1995,
      "gdpPPP": 0.395,
      "perCapitaPPP": 5549.9,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 0.415,
      "perCapitaPPP": 5826.5,
      "perCapitaPPPChangePct": 4.98,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdpPPP": 0.431,
      "perCapitaPPP": 6056.0,
      "perCapitaPPPChangePct": 3.94,
      "popChangePct": 0.0
    },
    {
      "year": 1998,
      "gdpPPP": 0.453,
      "perCapitaPPP": 6354.6,
      "perCapitaPPPChangePct": 4.93,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdpPPP": 0.461,
      "perCapitaPPP": 6466.9,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdpPPP": 0.482,
      "perCapitaPPP": 6767.5,
      "perCapitaPPPChangePct": 4.65,
      "popChangePct": 0.0
    },
    {
      "year": 2001,
      "gdpPPP": 0.493,
      "perCapitaPPP": 6915.0,
      "perCapitaPPPChangePct": 2.18,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 0.486,
      "perCapitaPPP": 6828.6,
      "perCapitaPPPChangePct": -1.25,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 0.527,
      "perCapitaPPP": 7411.1,
      "perCapitaPPPChangePct": 8.53,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 0.558,
      "perCapitaPPP": 7848.1,
      "perCapitaPPPChangePct": 5.9,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 0.579,
      "perCapitaPPP": 8153.1,
      "perCapitaPPPChangePct": 3.89,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 0.625,
      "perCapitaPPP": 8802.3,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 0.683,
      "perCapitaPPP": 9622.0,
      "perCapitaPPPChangePct": 9.31,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 0.745,
      "perCapitaPPP": 10513.2,
      "perCapitaPPPChangePct": 9.26,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 0.741,
      "perCapitaPPP": 10461.7,
      "perCapitaPPPChangePct": -0.49,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 0.755,
      "perCapitaPPP": 10675.2,
      "perCapitaPPPChangePct": 2.04,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 0.769,
      "perCapitaPPP": 10990.1,
      "perCapitaPPPChangePct": 2.95,
      "popChangePct": -1.41
    },
    {
      "year": 2012,
      "gdpPPP": 0.775,
      "perCapitaPPP": 11155.0,
      "perCapitaPPPChangePct": 1.5,
      "popChangePct": -1.43
    },
    {
      "year": 2013,
      "gdpPPP": 0.78,
      "perCapitaPPP": 11202.5,
      "perCapitaPPPChangePct": 0.43,
      "popChangePct": 1.45
    },
    {
      "year": 2014,
      "gdpPPP": 0.832,
      "perCapitaPPP": 11807.4,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 0.816,
      "perCapitaPPP": 11469.7,
      "perCapitaPPPChangePct": -2.86,
      "popChangePct": 1.43
    },
    {
      "year": 2016,
      "gdpPPP": 0.847,
      "perCapitaPPP": 11890.5,
      "perCapitaPPPChangePct": 3.67,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 0.805,
      "perCapitaPPP": 11588.9,
      "perCapitaPPPChangePct": -2.54,
      "popChangePct": -2.82
    },
    {
      "year": 2018,
      "gdpPPP": 0.907,
      "perCapitaPPP": 13051.5,
      "perCapitaPPPChangePct": 12.62,
      "popChangePct": 1.45
    },
    {
      "year": 2019,
      "gdpPPP": 1.032,
      "perCapitaPPP": 14290.9,
      "perCapitaPPPChangePct": 9.5,
      "popChangePct": 2.86
    },
    {
      "year": 2020,
      "gdpPPP": 0.917,
      "perCapitaPPP": 12505.0,
      "perCapitaPPPChangePct": -12.5,
      "popChangePct": 1.39
    },
    {
      "year": 2021,
      "gdpPPP": 1.048,
      "perCapitaPPP": 14212.2,
      "perCapitaPPPChangePct": 13.65,
      "popChangePct": 1.37
    },
    {
      "year": 2022,
      "gdpPPP": 1.185,
      "perCapitaPPP": 15993.0,
      "perCapitaPPPChangePct": 12.53,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 1.287,
      "perCapitaPPP": 17279.8,
      "perCapitaPPPChangePct": 8.05,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 1.366,
      "perCapitaPPP": 18244.3,
      "perCapitaPPPChangePct": 5.58,
      "popChangePct": 1.35
    },
    {
      "year": 2025,
      "gdpPPP": 1.468,
      "perCapitaPPP": 19516.5,
      "perCapitaPPPChangePct": 6.97,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 1.558,
      "perCapitaPPP": 20602.4,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 1.33
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 1.637,
      "perCapitaPPP": 21544.9,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 1.709,
      "perCapitaPPP": 22385.0,
      "perCapitaPPPChangePct": 3.9,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 1.782,
      "perCapitaPPP": 23219.5,
      "perCapitaPPPChangePct": 3.73,
      "popChangePct": 1.32
    },
    {
      "year": 2030,
      "gdpPPP": 1.853,
      "perCapitaPPP": 24030.1,
      "perCapitaPPPChangePct": 3.49,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 1.924,
      "perCapitaPPP": 24828.9,
      "perCapitaPPPChangePct": 3.32,
      "popChangePct": 1.3
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function DominicaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
