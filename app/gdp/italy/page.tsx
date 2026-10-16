import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Italy",
  "slug": "italy",
  "iso3": "ITA",
  "region": "Europe",
  "rank2026": 8,
  "flagEmoji": "🇮🇹",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "France",
      "slug": "france",
      "rank": 7
    },
    {
      "name": "Russia",
      "slug": "russia",
      "rank": 9
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 479.967,
      "growth": 3.1,
      "perCapita": 8511.8,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 435.267,
      "growth": 4.7,
      "perCapita": 7706.7,
      "popChangePct": 0.16
    },
    {
      "year": 1982,
      "gdp": 430.169,
      "growth": 0.4,
      "perCapita": 7610.4,
      "popChangePct": 0.08
    },
    {
      "year": 1983,
      "gdp": 446.399,
      "growth": 1.2,
      "perCapita": 7892.1,
      "popChangePct": 0.07
    },
    {
      "year": 1984,
      "gdp": 441.048,
      "growth": 3.2,
      "perCapita": 7797.2,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdp": 455.457,
      "growth": 2.8,
      "perCapita": 8048.6,
      "popChangePct": 0.04
    },
    {
      "year": 1986,
      "gdp": 645.071,
      "growth": 2.9,
      "perCapita": 11397.4,
      "popChangePct": 0.02
    },
    {
      "year": 1987,
      "gdp": 809.632,
      "growth": 3.2,
      "perCapita": 14305.9,
      "popChangePct": -0.01
    },
    {
      "year": 1988,
      "gdp": 897.006,
      "growth": 4.2,
      "perCapita": 15845.5,
      "popChangePct": 0.03
    },
    {
      "year": 1989,
      "gdp": 932.931,
      "growth": 3.4,
      "perCapita": 16468.6,
      "popChangePct": 0.07
    },
    {
      "year": 1990,
      "gdp": 1164.328,
      "growth": 2.1,
      "perCapita": 20536.9,
      "popChangePct": 0.08
    },
    {
      "year": 1991,
      "gdp": 1229.898,
      "growth": 1.4,
      "perCapita": 21674.5,
      "popChangePct": 0.09
    },
    {
      "year": 1992,
      "gdp": 1305.099,
      "growth": 0.8,
      "perCapita": 22988.1,
      "popChangePct": 0.05
    },
    {
      "year": 1993,
      "gdp": 1049.47,
      "growth": -0.9,
      "perCapita": 18469.7,
      "popChangePct": 0.08
    },
    {
      "year": 1994,
      "gdp": 1082.455,
      "growth": 2.2,
      "perCapita": 19043.1,
      "popChangePct": 0.04
    },
    {
      "year": 1995,
      "gdp": 1177.987,
      "growth": 2.9,
      "perCapita": 20723,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdp": 1315.135,
      "growth": 1.5,
      "perCapita": 23135.8,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdp": 1246.342,
      "growth": 1.9,
      "perCapita": 21913.2,
      "popChangePct": 0.06
    },
    {
      "year": 1998,
      "gdp": 1274.382,
      "growth": 1.8,
      "perCapita": 22395.1,
      "popChangePct": 0.05
    },
    {
      "year": 1999,
      "gdp": 1256.25,
      "growth": 1.7,
      "perCapita": 22074.7,
      "popChangePct": 0.01
    },
    {
      "year": 2000,
      "gdp": 1150.169,
      "growth": 3.9,
      "perCapita": 20205.5,
      "popChangePct": 0.03
    },
    {
      "year": 2001,
      "gdp": 1172.05,
      "growth": 2,
      "perCapita": 20576.5,
      "popChangePct": 0.06
    },
    {
      "year": 2002,
      "gdp": 1280.84,
      "growth": 0.3,
      "perCapita": 22473.5,
      "popChangePct": 0.06
    },
    {
      "year": 2003,
      "gdp": 1582.534,
      "growth": 0.1,
      "perCapita": 27673.3,
      "popChangePct": 0.34
    },
    {
      "year": 2004,
      "gdp": 1811.987,
      "growth": 1.5,
      "perCapita": 31451.6,
      "popChangePct": 0.74
    },
    {
      "year": 2005,
      "gdp": 1866.013,
      "growth": 0.8,
      "perCapita": 32148.0,
      "popChangePct": 0.75
    },
    {
      "year": 2006,
      "gdp": 1958.667,
      "growth": 1.8,
      "perCapita": 33602.7,
      "popChangePct": 0.42
    },
    {
      "year": 2007,
      "gdp": 2222.788,
      "growth": 1.5,
      "perCapita": 37989.4,
      "popChangePct": 0.38
    },
    {
      "year": 2008,
      "gdp": 2417.245,
      "growth": -1,
      "perCapita": 40969.0,
      "popChangePct": 0.84
    },
    {
      "year": 2009,
      "gdp": 2207.085,
      "growth": -5.3,
      "perCapita": 37143.4,
      "popChangePct": 0.71
    },
    {
      "year": 2010,
      "gdp": 2146.687,
      "growth": 1.5,
      "perCapita": 35963.7,
      "popChangePct": 0.45
    },
    {
      "year": 2011,
      "gdp": 2306.569,
      "growth": 0.7,
      "perCapita": 38475.8,
      "popChangePct": 0.43
    },
    {
      "year": 2012,
      "gdp": 2099.259,
      "growth": -3.1,
      "perCapita": 34926.4,
      "popChangePct": 0.26
    },
    {
      "year": 2013,
      "gdp": 2153.257,
      "growth": -1.8,
      "perCapita": 35722.5,
      "popChangePct": 0.29
    },
    {
      "year": 2014,
      "gdp": 2173.816,
      "growth": 0,
      "perCapita": 36022.6,
      "popChangePct": 0.11
    },
    {
      "year": 2015,
      "gdp": 1845.615,
      "growth": 0.9,
      "perCapita": 30609.5,
      "popChangePct": -0.08
    },
    {
      "year": 2016,
      "gdp": 1886.59,
      "growth": 1.2,
      "perCapita": 31357.6,
      "popChangePct": -0.22
    },
    {
      "year": 2017,
      "gdp": 1970.025,
      "growth": 1.6,
      "perCapita": 32797.3,
      "popChangePct": -0.16
    },
    {
      "year": 2018,
      "gdp": 2100.387,
      "growth": 0.8,
      "perCapita": 35042.8,
      "popChangePct": -0.21
    },
    {
      "year": 2019,
      "gdp": 2019.829,
      "growth": 0.4,
      "perCapita": 33767.0,
      "popChangePct": -0.2
    },
    {
      "year": 2020,
      "gdp": 1905.956,
      "growth": -8.9,
      "perCapita": 31956.9,
      "popChangePct": -0.29
    },
    {
      "year": 2021,
      "gdp": 2180.657,
      "growth": 8.9,
      "perCapita": 36812.9,
      "popChangePct": -0.68
    },
    {
      "year": 2022,
      "gdp": 2105.723,
      "growth": 4.8,
      "perCapita": 35672.0,
      "popChangePct": -0.35
    },
    {
      "year": 2023,
      "gdp": 2317.55,
      "growth": 0.9,
      "perCapita": 39282.4,
      "popChangePct": -0.06
    },
    {
      "year": 2024,
      "gdp": 2382.718,
      "growth": 0.8,
      "perCapita": 40404.7,
      "popChangePct": -0.04
    },
    {
      "year": 2025,
      "gdp": 2550.111,
      "growth": 0.5,
      "perCapita": 43270.4,
      "popChangePct": -0.06
    },
    {
      "year": 2026,
      "gdp": 2738.164,
      "growth": 0.5,
      "perCapita": 46505.1,
      "popChangePct": -0.09
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2805.918,
      "growth": 0.5,
      "perCapita": 47715.2,
      "popChangePct": -0.12
    },
    {
      "year": 2028,
      "gdp": 2887.378,
      "growth": 0.8,
      "perCapita": 49175.4,
      "popChangePct": -0.15
    },
    {
      "year": 2029,
      "gdp": 2965.313,
      "growth": 0.7,
      "perCapita": 50593.1,
      "popChangePct": -0.18
    },
    {
      "year": 2030,
      "gdp": 3045.633,
      "growth": 0.7,
      "perCapita": 52068.4,
      "popChangePct": -0.2
    },
    {
      "year": 2031,
      "gdp": 3127.67,
      "growth": 0.7,
      "perCapita": 53588.9,
      "popChangePct": -0.22
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 623.346,
      "perCapitaPPP": 11054.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 714.58,
      "perCapitaPPP": 12652.1,
      "perCapitaPPPChangePct": 14.45,
      "popChangePct": 0.16
    },
    {
      "year": 1982,
      "gdpPPP": 761.875,
      "perCapitaPPP": 13478.8,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 0.08
    },
    {
      "year": 1983,
      "gdpPPP": 800.965,
      "perCapitaPPP": 14160.6,
      "perCapitaPPPChangePct": 5.06,
      "popChangePct": 0.07
    },
    {
      "year": 1984,
      "gdpPPP": 856.644,
      "perCapitaPPP": 15144.4,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": 0.0
    },
    {
      "year": 1985,
      "gdpPPP": 908.46,
      "perCapitaPPP": 16053.8,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 0.04
    },
    {
      "year": 1986,
      "gdpPPP": 953.256,
      "perCapitaPPP": 16842.6,
      "perCapitaPPPChangePct": 4.91,
      "popChangePct": 0.02
    },
    {
      "year": 1987,
      "gdpPPP": 1008.06,
      "perCapitaPPP": 17812.0,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": -0.01
    },
    {
      "year": 1988,
      "gdpPPP": 1087.383,
      "perCapitaPPP": 19208.5,
      "perCapitaPPPChangePct": 7.84,
      "popChangePct": 0.03
    },
    {
      "year": 1989,
      "gdpPPP": 1168.316,
      "perCapitaPPP": 20623.7,
      "perCapitaPPPChangePct": 7.37,
      "popChangePct": 0.07
    },
    {
      "year": 1990,
      "gdpPPP": 1236.916,
      "perCapitaPPP": 21817.3,
      "perCapitaPPPChangePct": 5.79,
      "popChangePct": 0.08
    },
    {
      "year": 1991,
      "gdpPPP": 1297.103,
      "perCapitaPPP": 22858.8,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 0.09
    },
    {
      "year": 1992,
      "gdpPPP": 1337.731,
      "perCapitaPPP": 23562.8,
      "perCapitaPPPChangePct": 3.08,
      "popChangePct": 0.05
    },
    {
      "year": 1993,
      "gdpPPP": 1357.757,
      "perCapitaPPP": 23895.2,
      "perCapitaPPPChangePct": 1.41,
      "popChangePct": 0.08
    },
    {
      "year": 1994,
      "gdpPPP": 1416.582,
      "perCapitaPPP": 24921.2,
      "perCapitaPPPChangePct": 4.29,
      "popChangePct": 0.04
    },
    {
      "year": 1995,
      "gdpPPP": 1488.032,
      "perCapitaPPP": 26177.3,
      "perCapitaPPPChangePct": 5.04,
      "popChangePct": 0.0
    },
    {
      "year": 1996,
      "gdpPPP": 1538.379,
      "perCapitaPPP": 27063.1,
      "perCapitaPPPChangePct": 3.38,
      "popChangePct": 0.0
    },
    {
      "year": 1997,
      "gdpPPP": 1595.042,
      "perCapitaPPP": 28044.0,
      "perCapitaPPPChangePct": 3.62,
      "popChangePct": 0.06
    },
    {
      "year": 1998,
      "gdpPPP": 1642.075,
      "perCapitaPPP": 28856.7,
      "perCapitaPPPChangePct": 2.9,
      "popChangePct": 0.05
    },
    {
      "year": 1999,
      "gdpPPP": 1693.252,
      "perCapitaPPP": 29753.6,
      "perCapitaPPPChangePct": 3.11,
      "popChangePct": 0.01
    },
    {
      "year": 2000,
      "gdpPPP": 1798.832,
      "perCapitaPPP": 31600.8,
      "perCapitaPPPChangePct": 6.21,
      "popChangePct": 0.03
    },
    {
      "year": 2001,
      "gdpPPP": 1876.238,
      "perCapitaPPP": 32939.2,
      "perCapitaPPPChangePct": 4.24,
      "popChangePct": 0.06
    },
    {
      "year": 2002,
      "gdpPPP": 1910.54,
      "perCapitaPPP": 33522.2,
      "perCapitaPPPChangePct": 1.77,
      "popChangePct": 0.06
    },
    {
      "year": 2003,
      "gdpPPP": 1949.556,
      "perCapitaPPP": 34091.3,
      "perCapitaPPPChangePct": 1.7,
      "popChangePct": 0.34
    },
    {
      "year": 2004,
      "gdpPPP": 2031.486,
      "perCapitaPPP": 35261.5,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": 0.74
    },
    {
      "year": 2005,
      "gdpPPP": 2111.165,
      "perCapitaPPP": 36371.6,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 0.75
    },
    {
      "year": 2006,
      "gdpPPP": 2215.431,
      "perCapitaPPP": 38007.7,
      "perCapitaPPPChangePct": 4.5,
      "popChangePct": 0.42
    },
    {
      "year": 2007,
      "gdpPPP": 2308.73,
      "perCapitaPPP": 39458.2,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 0.38
    },
    {
      "year": 2008,
      "gdpPPP": 2329.129,
      "perCapitaPPP": 39475.6,
      "perCapitaPPPChangePct": 0.04,
      "popChangePct": 0.84
    },
    {
      "year": 2009,
      "gdpPPP": 2219.165,
      "perCapitaPPP": 37346.7,
      "perCapitaPPPChangePct": -5.39,
      "popChangePct": 0.71
    },
    {
      "year": 2010,
      "gdpPPP": 2280.484,
      "perCapitaPPP": 38205.3,
      "perCapitaPPPChangePct": 2.3,
      "popChangePct": 0.45
    },
    {
      "year": 2011,
      "gdpPPP": 2343.725,
      "perCapitaPPP": 39095.6,
      "perCapitaPPPChangePct": 2.33,
      "popChangePct": 0.43
    },
    {
      "year": 2012,
      "gdpPPP": 2312.752,
      "perCapitaPPP": 38478.4,
      "perCapitaPPPChangePct": -1.58,
      "popChangePct": 0.26
    },
    {
      "year": 2013,
      "gdpPPP": 2309.352,
      "perCapitaPPP": 38312.1,
      "perCapitaPPPChangePct": -0.43,
      "popChangePct": 0.29
    },
    {
      "year": 2014,
      "gdpPPP": 2349.541,
      "perCapitaPPP": 38934.5,
      "perCapitaPPPChangePct": 1.62,
      "popChangePct": 0.11
    },
    {
      "year": 2015,
      "gdpPPP": 2392.348,
      "perCapitaPPP": 39677.1,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": -0.08
    },
    {
      "year": 2016,
      "gdpPPP": 2444.937,
      "perCapitaPPP": 40638.1,
      "perCapitaPPPChangePct": 2.42,
      "popChangePct": -0.22
    },
    {
      "year": 2017,
      "gdpPPP": 2528.636,
      "perCapitaPPP": 42097.1,
      "perCapitaPPPChangePct": 3.59,
      "popChangePct": -0.16
    },
    {
      "year": 2018,
      "gdpPPP": 2609.653,
      "perCapitaPPP": 43539.4,
      "perCapitaPPPChangePct": 3.43,
      "popChangePct": -0.21
    },
    {
      "year": 2019,
      "gdpPPP": 2787.072,
      "perCapitaPPP": 46593.6,
      "perCapitaPPPChangePct": 7.01,
      "popChangePct": -0.2
    },
    {
      "year": 2020,
      "gdpPPP": 2641.205,
      "perCapitaPPP": 44284.7,
      "perCapitaPPPChangePct": -4.96,
      "popChangePct": -0.29
    },
    {
      "year": 2021,
      "gdpPPP": 2984.161,
      "perCapitaPPP": 50377.3,
      "perCapitaPPPChangePct": 13.76,
      "popChangePct": -0.68
    },
    {
      "year": 2022,
      "gdpPPP": 3350.508,
      "perCapitaPPP": 56759.3,
      "perCapitaPPPChangePct": 12.67,
      "popChangePct": -0.35
    },
    {
      "year": 2023,
      "gdpPPP": 3506.541,
      "perCapitaPPP": 59435.7,
      "perCapitaPPPChangePct": 4.72,
      "popChangePct": -0.06
    },
    {
      "year": 2024,
      "gdpPPP": 3621.731,
      "perCapitaPPP": 61415.2,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": -0.04
    },
    {
      "year": 2025,
      "gdpPPP": 3744.569,
      "perCapitaPPP": 63538.0,
      "perCapitaPPPChangePct": 3.46,
      "popChangePct": -0.06
    },
    {
      "year": 2026,
      "gdpPPP": 3871.906,
      "perCapitaPPP": 65760.6,
      "perCapitaPPPChangePct": 3.5,
      "popChangePct": -0.09
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 3976.709,
      "perCapitaPPP": 67624.7,
      "perCapitaPPPChangePct": 2.83,
      "popChangePct": -0.12
    },
    {
      "year": 2028,
      "gdpPPP": 4075.738,
      "perCapitaPPP": 69414.6,
      "perCapitaPPPChangePct": 2.65,
      "popChangePct": -0.15
    },
    {
      "year": 2029,
      "gdpPPP": 4178.858,
      "perCapitaPPP": 71298.1,
      "perCapitaPPPChangePct": 2.71,
      "popChangePct": -0.18
    },
    {
      "year": 2030,
      "gdpPPP": 4286.13,
      "perCapitaPPP": 73276.1,
      "perCapitaPPPChangePct": 2.77,
      "popChangePct": -0.2
    },
    {
      "year": 2031,
      "gdpPPP": 4394.041,
      "perCapitaPPP": 75286.7,
      "perCapitaPPPChangePct": 2.74,
      "popChangePct": -0.22
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function ItalyGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
