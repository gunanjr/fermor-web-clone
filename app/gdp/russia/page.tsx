import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Russia",
  "slug": "russia",
  "iso3": "RUS",
  "region": "Europe",
  "rank2026": 9,
  "flagEmoji": "🇷🇺",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Italy",
      "slug": "italy",
      "rank": 8
    },
    {
      "name": "Brazil",
      "slug": "brazil",
      "rank": 10
    }
  ],
  "history": [
    {
      "year": 1992,
      "gdp": 71.603,
      "growth": null,
      "perCapita": 480.8,
      "popChangePct": -0.36
    },
    {
      "year": 1993,
      "gdp": 196.227,
      "growth": -8.7,
      "perCapita": 1324.6,
      "popChangePct": -0.52
    },
    {
      "year": 1994,
      "gdp": 293.768,
      "growth": -12.7,
      "perCapita": 1982.2,
      "popChangePct": 0.04
    },
    {
      "year": 1995,
      "gdp": 335.777,
      "growth": -4.1,
      "perCapita": 2264.3,
      "popChangePct": 0.06
    },
    {
      "year": 1996,
      "gdp": 412.685,
      "growth": -3.6,
      "perCapita": 2786.8,
      "popChangePct": -0.14
    },
    {
      "year": 1997,
      "gdp": 433.704,
      "growth": 1.4,
      "perCapita": 2933.3,
      "popChangePct": -0.16
    },
    {
      "year": 1998,
      "gdp": 287.672,
      "growth": -5.3,
      "perCapita": 1948.5,
      "popChangePct": -0.15
    },
    {
      "year": 1999,
      "gdp": 209.657,
      "growth": 6.3,
      "perCapita": 1423.9,
      "popChangePct": -0.27
    },
    {
      "year": 2000,
      "gdp": 278.264,
      "growth": 10.1,
      "perCapita": 1896.6,
      "popChangePct": -0.36
    },
    {
      "year": 2001,
      "gdp": 328.475,
      "growth": 5.1,
      "perCapita": 2248.0,
      "popChangePct": -0.41
    },
    {
      "year": 2002,
      "gdp": 370.062,
      "growth": 4.7,
      "perCapita": 2535.7,
      "popChangePct": -0.12
    },
    {
      "year": 2003,
      "gdp": 461.518,
      "growth": 7.4,
      "perCapita": 3165.5,
      "popChangePct": -0.1
    },
    {
      "year": 2004,
      "gdp": 633.294,
      "growth": 7.1,
      "perCapita": 4362.1,
      "popChangePct": -0.42
    },
    {
      "year": 2005,
      "gdp": 817.717,
      "growth": 6.4,
      "perCapita": 5655.1,
      "popChangePct": -0.4
    },
    {
      "year": 2006,
      "gdp": 1060.901,
      "growth": 8.2,
      "perCapita": 7362.1,
      "popChangePct": -0.34
    },
    {
      "year": 2007,
      "gdp": 1393.416,
      "growth": 8.6,
      "perCapita": 9685.9,
      "popChangePct": -0.17
    },
    {
      "year": 2008,
      "gdp": 1779.109,
      "growth": 5.2,
      "perCapita": 12371.1,
      "popChangePct": -0.03
    },
    {
      "year": 2009,
      "gdp": 1307.927,
      "growth": -7.8,
      "perCapita": 9091.1,
      "popChangePct": 0.04
    },
    {
      "year": 2010,
      "gdp": 1633.111,
      "growth": 4.5,
      "perCapita": 11346.2,
      "popChangePct": 0.05
    },
    {
      "year": 2011,
      "gdp": 2046.621,
      "growth": 4,
      "perCapita": 14208.3,
      "popChangePct": 0.08
    },
    {
      "year": 2012,
      "gdp": 2191.486,
      "growth": 4,
      "perCapita": 15188.0,
      "popChangePct": 0.17
    },
    {
      "year": 2013,
      "gdp": 2288.428,
      "growth": 1.8,
      "perCapita": 15825.5,
      "popChangePct": 0.22
    },
    {
      "year": 2014,
      "gdp": 2048.837,
      "growth": 0.7,
      "perCapita": 14137.2,
      "popChangePct": 0.22
    },
    {
      "year": 2015,
      "gdp": 1356.703,
      "growth": -2,
      "perCapita": 9336.8,
      "popChangePct": 0.26
    },
    {
      "year": 2016,
      "gdp": 1280.648,
      "growth": 0.2,
      "perCapita": 8784.9,
      "popChangePct": 0.32
    },
    {
      "year": 2017,
      "gdp": 1575.14,
      "growth": 1.8,
      "perCapita": 10774.8,
      "popChangePct": 0.28
    },
    {
      "year": 2018,
      "gdp": 1653.005,
      "growth": 2.8,
      "perCapita": 11288.7,
      "popChangePct": 0.17
    },
    {
      "year": 2019,
      "gdp": 1695.724,
      "growth": 2.2,
      "perCapita": 11572.3,
      "popChangePct": 0.07
    },
    {
      "year": 2020,
      "gdp": 1488.118,
      "growth": -2.7,
      "perCapita": 10166.7,
      "popChangePct": -0.11
    },
    {
      "year": 2021,
      "gdp": 1828.927,
      "growth": 5.9,
      "perCapita": 12541.0,
      "popChangePct": -0.37
    },
    {
      "year": 2022,
      "gdp": 2296.41,
      "growth": -1.4,
      "perCapita": 15774.2,
      "popChangePct": -0.18
    },
    {
      "year": 2023,
      "gdp": 2034.681,
      "growth": 4.1,
      "perCapita": 13989.8,
      "popChangePct": -0.1
    },
    {
      "year": 2024,
      "gdp": 2185.848,
      "growth": 4.9,
      "perCapita": 15093.5,
      "popChangePct": -0.43
    },
    {
      "year": 2025,
      "gdp": 2587.938,
      "growth": 1,
      "perCapita": 17972.1,
      "popChangePct": -0.57
    },
    {
      "year": 2026,
      "gdp": 2656.452,
      "growth": 1.1,
      "perCapita": 18525.5,
      "popChangePct": -0.42
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 2533.434,
      "growth": 1.1,
      "perCapita": 17710.9,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdp": 2551.584,
      "growth": 1,
      "perCapita": 17884.5,
      "popChangePct": -0.26
    },
    {
      "year": 2029,
      "gdp": 2568.741,
      "growth": 1,
      "perCapita": 18053.5,
      "popChangePct": -0.27
    },
    {
      "year": 2030,
      "gdp": 2591.506,
      "growth": 1,
      "perCapita": 18264.3,
      "popChangePct": -0.28
    },
    {
      "year": 2031,
      "gdp": 2615.027,
      "growth": 1,
      "perCapita": 18484.0,
      "popChangePct": -0.29
    }
  ],
  "pppHistory": [
    {
      "year": 1992,
      "gdpPPP": 1621.277,
      "perCapitaPPP": 10887.2,
      "perCapitaPPPChangePct": null,
      "popChangePct": -0.36
    },
    {
      "year": 1993,
      "gdpPPP": 1515.308,
      "perCapitaPPP": 10229.2,
      "perCapitaPPPChangePct": -6.04,
      "popChangePct": -0.52
    },
    {
      "year": 1994,
      "gdpPPP": 1351.113,
      "perCapitaPPP": 9116.8,
      "perCapitaPPPChangePct": -10.88,
      "popChangePct": 0.04
    },
    {
      "year": 1995,
      "gdpPPP": 1322.881,
      "perCapitaPPP": 8920.8,
      "perCapitaPPPChangePct": -2.15,
      "popChangePct": 0.06
    },
    {
      "year": 1996,
      "gdpPPP": 1298.858,
      "perCapitaPPP": 8771.1,
      "perCapitaPPPChangePct": -1.68,
      "popChangePct": -0.14
    },
    {
      "year": 1997,
      "gdpPPP": 1339.434,
      "perCapitaPPP": 9059.2,
      "perCapitaPPPChangePct": 3.28,
      "popChangePct": -0.16
    },
    {
      "year": 1998,
      "gdpPPP": 1282.445,
      "perCapitaPPP": 8686.6,
      "perCapitaPPPChangePct": -4.11,
      "popChangePct": -0.15
    },
    {
      "year": 1999,
      "gdpPPP": 1383.147,
      "perCapitaPPP": 9393.7,
      "perCapitaPPPChangePct": 8.14,
      "popChangePct": -0.27
    },
    {
      "year": 2000,
      "gdpPPP": 1556.696,
      "perCapitaPPP": 10610.1,
      "perCapitaPPPChangePct": 12.95,
      "popChangePct": -0.36
    },
    {
      "year": 2001,
      "gdpPPP": 1672.634,
      "perCapitaPPP": 11447.2,
      "perCapitaPPPChangePct": 7.89,
      "popChangePct": -0.41
    },
    {
      "year": 2002,
      "gdpPPP": 1779.247,
      "perCapitaPPP": 12191.7,
      "perCapitaPPPChangePct": 6.5,
      "popChangePct": -0.12
    },
    {
      "year": 2003,
      "gdpPPP": 1947.833,
      "perCapitaPPP": 13360.2,
      "perCapitaPPPChangePct": 9.58,
      "popChangePct": -0.1
    },
    {
      "year": 2004,
      "gdpPPP": 2143.132,
      "perCapitaPPP": 14761.9,
      "perCapitaPPPChangePct": 10.49,
      "popChangePct": -0.42
    },
    {
      "year": 2005,
      "gdpPPP": 2351.723,
      "perCapitaPPP": 16263.9,
      "perCapitaPPPChangePct": 10.17,
      "popChangePct": -0.4
    },
    {
      "year": 2006,
      "gdpPPP": 2622.193,
      "perCapitaPPP": 18196.7,
      "perCapitaPPPChangePct": 11.88,
      "popChangePct": -0.34
    },
    {
      "year": 2007,
      "gdpPPP": 2923.515,
      "perCapitaPPP": 20322.0,
      "perCapitaPPPChangePct": 11.68,
      "popChangePct": -0.17
    },
    {
      "year": 2008,
      "gdpPPP": 3136.188,
      "perCapitaPPP": 21807.6,
      "perCapitaPPPChangePct": 7.31,
      "popChangePct": -0.03
    },
    {
      "year": 2009,
      "gdpPPP": 2908.738,
      "perCapitaPPP": 20217.9,
      "perCapitaPPPChangePct": -7.29,
      "popChangePct": 0.04
    },
    {
      "year": 2010,
      "gdpPPP": 3076.938,
      "perCapitaPPP": 21377.4,
      "perCapitaPPPChangePct": 5.73,
      "popChangePct": 0.05
    },
    {
      "year": 2011,
      "gdpPPP": 3265.874,
      "perCapitaPPP": 22672.8,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": 0.08
    },
    {
      "year": 2012,
      "gdpPPP": 3460.55,
      "perCapitaPPP": 23983.1,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 0.17
    },
    {
      "year": 2013,
      "gdpPPP": 3581.23,
      "perCapitaPPP": 24765.8,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": 0.22
    },
    {
      "year": 2014,
      "gdpPPP": 3670.432,
      "perCapitaPPP": 25326.3,
      "perCapitaPPPChangePct": 2.26,
      "popChangePct": 0.22
    },
    {
      "year": 2015,
      "gdpPPP": 3631.416,
      "perCapitaPPP": 24991.2,
      "perCapitaPPPChangePct": -1.32,
      "popChangePct": 0.26
    },
    {
      "year": 2016,
      "gdpPPP": 3673.023,
      "perCapitaPPP": 25195.9,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": 0.32
    },
    {
      "year": 2017,
      "gdpPPP": 3807.099,
      "perCapitaPPP": 26042.7,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 0.28
    },
    {
      "year": 2018,
      "gdpPPP": 4205.23,
      "perCapitaPPP": 28718.3,
      "perCapitaPPPChangePct": 10.27,
      "popChangePct": 0.17
    },
    {
      "year": 2019,
      "gdpPPP": 4579.554,
      "perCapitaPPP": 31252.7,
      "perCapitaPPPChangePct": 8.82,
      "popChangePct": 0.07
    },
    {
      "year": 2020,
      "gdpPPP": 4651.43,
      "perCapitaPPP": 31778.3,
      "perCapitaPPPChangePct": 1.68,
      "popChangePct": -0.11
    },
    {
      "year": 2021,
      "gdpPPP": 5688.268,
      "perCapitaPPP": 39004.5,
      "perCapitaPPPChangePct": 22.74,
      "popChangePct": -0.37
    },
    {
      "year": 2022,
      "gdpPPP": 6005.387,
      "perCapitaPPP": 41251.5,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": -0.18
    },
    {
      "year": 2023,
      "gdpPPP": 6480.84,
      "perCapitaPPP": 44560.1,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": -0.1
    },
    {
      "year": 2024,
      "gdpPPP": 6968.614,
      "perCapitaPPP": 48119.0,
      "perCapitaPPPChangePct": 7.99,
      "popChangePct": -0.43
    },
    {
      "year": 2025,
      "gdpPPP": 7236.601,
      "perCapitaPPP": 50255.1,
      "perCapitaPPPChangePct": 4.44,
      "popChangePct": -0.57
    },
    {
      "year": 2026,
      "gdpPPP": 7525.159,
      "perCapitaPPP": 52478.7,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": -0.42
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 7774.066,
      "perCapitaPPP": 54347.3,
      "perCapitaPPPChangePct": 3.56,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdpPPP": 7980.686,
      "perCapitaPPP": 55938.2,
      "perCapitaPPPChangePct": 2.93,
      "popChangePct": -0.26
    },
    {
      "year": 2029,
      "gdpPPP": 8203.817,
      "perCapitaPPP": 57657.6,
      "perCapitaPPPChangePct": 3.07,
      "popChangePct": -0.27
    },
    {
      "year": 2030,
      "gdpPPP": 8438.11,
      "perCapitaPPP": 59469.6,
      "perCapitaPPPChangePct": 3.14,
      "popChangePct": -0.28
    },
    {
      "year": 2031,
      "gdpPPP": 8676.348,
      "perCapitaPPP": 61327.6,
      "perCapitaPPPChangePct": 3.12,
      "popChangePct": -0.29
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function RussiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
