import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Mauritius",
  "slug": "mauritius",
  "iso3": "MUS",
  "region": "Africa",
  "rank2026": 145,
  "flagEmoji": "🇲🇺",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Namibia",
      "slug": "namibia",
      "rank": 144
    },
    {
      "name": "Bahamas",
      "slug": "bahamas",
      "rank": 146
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 1.242,
      "growth": -10.1,
      "perCapita": 1285.2,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 1.179,
      "growth": 5.9,
      "perCapita": 1202.6,
      "popChangePct": 1.45
    },
    {
      "year": 1982,
      "gdp": 1.131,
      "growth": 5.5,
      "perCapita": 1139.5,
      "popChangePct": 1.33
    },
    {
      "year": 1983,
      "gdp": 1.198,
      "growth": 0.4,
      "perCapita": 1195.6,
      "popChangePct": 0.91
    },
    {
      "year": 1984,
      "gdp": 1.108,
      "growth": 4.8,
      "perCapita": 1095.0,
      "popChangePct": 1.0
    },
    {
      "year": 1985,
      "gdp": 1.122,
      "growth": 6.9,
      "perCapita": 1099.8,
      "popChangePct": 0.89
    },
    {
      "year": 1986,
      "gdp": 1.515,
      "growth": 9.7,
      "perCapita": 1473.7,
      "popChangePct": 0.69
    },
    {
      "year": 1987,
      "gdp": 1.919,
      "growth": 10.2,
      "perCapita": 1852.0,
      "popChangePct": 0.78
    },
    {
      "year": 1988,
      "gdp": 2.225,
      "growth": 6.8,
      "perCapita": 2132.9,
      "popChangePct": 0.68
    },
    {
      "year": 1989,
      "gdp": 2.286,
      "growth": 4.5,
      "perCapita": 2174.9,
      "popChangePct": 0.77
    },
    {
      "year": 1990,
      "gdp": 2.743,
      "growth": 7.2,
      "perCapita": 2590.3,
      "popChangePct": 0.76
    },
    {
      "year": 1991,
      "gdp": 3.017,
      "growth": 4.4,
      "perCapita": 2819.1,
      "popChangePct": 1.04
    },
    {
      "year": 1992,
      "gdp": 3.398,
      "growth": 6.5,
      "perCapita": 3133.0,
      "popChangePct": 1.31
    },
    {
      "year": 1993,
      "gdp": 3.502,
      "growth": 5.1,
      "perCapita": 3191.2,
      "popChangePct": 1.2
    },
    {
      "year": 1994,
      "gdp": 3.887,
      "growth": 4.1,
      "perCapita": 3492.7,
      "popChangePct": 1.46
    },
    {
      "year": 1995,
      "gdp": 4.439,
      "growth": 4.3,
      "perCapita": 3954.8,
      "popChangePct": 0.81
    },
    {
      "year": 1996,
      "gdp": 4.59,
      "growth": 5.6,
      "perCapita": 4047.2,
      "popChangePct": 1.07
    },
    {
      "year": 1997,
      "gdp": 4.31,
      "growth": 5.7,
      "perCapita": 3753.5,
      "popChangePct": 1.23
    },
    {
      "year": 1998,
      "gdp": 4.354,
      "growth": 6.1,
      "perCapita": 3751.7,
      "popChangePct": 1.05
    },
    {
      "year": 1999,
      "gdp": 4.597,
      "growth": 2.6,
      "perCapita": 3911.1,
      "popChangePct": 1.29
    },
    {
      "year": 2000,
      "gdp": 4.935,
      "growth": 8.2,
      "perCapita": 4157.8,
      "popChangePct": 1.02
    },
    {
      "year": 2001,
      "gdp": 4.882,
      "growth": 3.2,
      "perCapita": 4081.2,
      "popChangePct": 0.76
    },
    {
      "year": 2002,
      "gdp": 5.123,
      "growth": 1.6,
      "perCapita": 4252.9,
      "popChangePct": 0.75
    },
    {
      "year": 2003,
      "gdp": 6.155,
      "growth": 6,
      "perCapita": 5072.8,
      "popChangePct": 0.66
    },
    {
      "year": 2004,
      "gdp": 6.962,
      "growth": 4.3,
      "perCapita": 5701.8,
      "popChangePct": 0.66
    },
    {
      "year": 2005,
      "gdp": 6.867,
      "growth": 1.5,
      "perCapita": 5590.5,
      "popChangePct": 0.57
    },
    {
      "year": 2006,
      "gdp": 7.123,
      "growth": 4.5,
      "perCapita": 5772.7,
      "popChangePct": 0.49
    },
    {
      "year": 2007,
      "gdp": 8.26,
      "growth": 5.7,
      "perCapita": 6663.2,
      "popChangePct": 0.49
    },
    {
      "year": 2008,
      "gdp": 10.125,
      "growth": 5.4,
      "perCapita": 8138.2,
      "popChangePct": 0.32
    },
    {
      "year": 2009,
      "gdp": 9.252,
      "growth": 3.3,
      "perCapita": 7416.7,
      "popChangePct": 0.24
    },
    {
      "year": 2010,
      "gdp": 10.138,
      "growth": 4.4,
      "perCapita": 8108.1,
      "popChangePct": 0.24
    },
    {
      "year": 2011,
      "gdp": 11.673,
      "growth": 4.1,
      "perCapita": 9320.9,
      "popChangePct": 0.16
    },
    {
      "year": 2012,
      "gdp": 11.826,
      "growth": 3.5,
      "perCapita": 9448.5,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdp": 12.293,
      "growth": 3.4,
      "perCapita": 9805.3,
      "popChangePct": 0.16
    },
    {
      "year": 2014,
      "gdp": 13.074,
      "growth": 3.8,
      "perCapita": 10416.6,
      "popChangePct": 0.08
    },
    {
      "year": 2015,
      "gdp": 12.007,
      "growth": 3.7,
      "perCapita": 9558.9,
      "popChangePct": 0.08
    },
    {
      "year": 2016,
      "gdp": 12.594,
      "growth": 3.9,
      "perCapita": 10024.5,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 13.714,
      "growth": 3.9,
      "perCapita": 10911.3,
      "popChangePct": 0.08
    },
    {
      "year": 2018,
      "gdp": 14.736,
      "growth": 4,
      "perCapita": 11724.4,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 14.436,
      "growth": 2.9,
      "perCapita": 11488.5,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdp": 11.408,
      "growth": -14.5,
      "perCapita": 9083.2,
      "popChangePct": -0.08
    },
    {
      "year": 2021,
      "gdp": 11.484,
      "growth": 3.4,
      "perCapita": 9146.4,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 12.908,
      "growth": 8.7,
      "perCapita": 10316.8,
      "popChangePct": -0.4
    },
    {
      "year": 2023,
      "gdp": 14.101,
      "growth": 5,
      "perCapita": 11296.0,
      "popChangePct": -0.24
    },
    {
      "year": 2024,
      "gdp": 14.986,
      "growth": 4.9,
      "perCapita": 12032.3,
      "popChangePct": -0.24
    },
    {
      "year": 2025,
      "gdp": 16.126,
      "growth": 3.1,
      "perCapita": 12977.2,
      "popChangePct": -0.16
    },
    {
      "year": 2026,
      "gdp": 17.119,
      "growth": 3.4,
      "perCapita": 13811.9,
      "popChangePct": -0.32
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 18.241,
      "growth": 3.4,
      "perCapita": 14756.9,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdp": 19.418,
      "growth": 3.4,
      "perCapita": 15753.9,
      "popChangePct": -0.24
    },
    {
      "year": 2029,
      "gdp": 20.641,
      "growth": 3.4,
      "perCapita": 16796.0,
      "popChangePct": -0.32
    },
    {
      "year": 2030,
      "gdp": 21.916,
      "growth": 3.4,
      "perCapita": 17889.1,
      "popChangePct": -0.33
    },
    {
      "year": 2031,
      "gdp": 23.271,
      "growth": 3.4,
      "perCapita": 19056.3,
      "popChangePct": -0.33
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 1.944,
      "perCapitaPPP": 2012.5,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 2.253,
      "perCapitaPPP": 2298.2,
      "perCapitaPPPChangePct": 14.2,
      "popChangePct": 1.45
    },
    {
      "year": 1982,
      "gdpPPP": 2.524,
      "perCapitaPPP": 2543.0,
      "perCapitaPPPChangePct": 10.66,
      "popChangePct": 1.33
    },
    {
      "year": 1983,
      "gdpPPP": 2.633,
      "perCapitaPPP": 2628.5,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 0.91
    },
    {
      "year": 1984,
      "gdpPPP": 2.858,
      "perCapitaPPP": 2823.7,
      "perCapitaPPPChangePct": 7.43,
      "popChangePct": 1.0
    },
    {
      "year": 1985,
      "gdpPPP": 3.151,
      "perCapitaPPP": 3088.0,
      "perCapitaPPPChangePct": 9.36,
      "popChangePct": 0.89
    },
    {
      "year": 1986,
      "gdpPPP": 3.528,
      "perCapitaPPP": 3430.7,
      "perCapitaPPPChangePct": 11.1,
      "popChangePct": 0.69
    },
    {
      "year": 1987,
      "gdpPPP": 3.983,
      "perCapitaPPP": 3844.2,
      "perCapitaPPPChangePct": 12.05,
      "popChangePct": 0.78
    },
    {
      "year": 1988,
      "gdpPPP": 4.403,
      "perCapitaPPP": 4220.8,
      "perCapitaPPPChangePct": 9.8,
      "popChangePct": 0.68
    },
    {
      "year": 1989,
      "gdpPPP": 4.78,
      "perCapitaPPP": 4547.3,
      "perCapitaPPPChangePct": 7.73,
      "popChangePct": 0.77
    },
    {
      "year": 1990,
      "gdpPPP": 5.316,
      "perCapitaPPP": 5020.6,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": 0.76
    },
    {
      "year": 1991,
      "gdpPPP": 5.739,
      "perCapitaPPP": 5362.4,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": 1.04
    },
    {
      "year": 1992,
      "gdpPPP": 6.252,
      "perCapitaPPP": 5765.4,
      "perCapitaPPPChangePct": 7.52,
      "popChangePct": 1.31
    },
    {
      "year": 1993,
      "gdpPPP": 6.726,
      "perCapitaPPP": 6128.9,
      "perCapitaPPPChangePct": 6.3,
      "popChangePct": 1.2
    },
    {
      "year": 1994,
      "gdpPPP": 7.153,
      "perCapitaPPP": 6428.1,
      "perCapitaPPPChangePct": 4.88,
      "popChangePct": 1.46
    },
    {
      "year": 1995,
      "gdpPPP": 7.617,
      "perCapitaPPP": 6785.7,
      "perCapitaPPPChangePct": 5.56,
      "popChangePct": 0.81
    },
    {
      "year": 1996,
      "gdpPPP": 8.189,
      "perCapitaPPP": 7221.8,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 1.07
    },
    {
      "year": 1997,
      "gdpPPP": 8.804,
      "perCapitaPPP": 7667.5,
      "perCapitaPPPChangePct": 6.17,
      "popChangePct": 1.23
    },
    {
      "year": 1998,
      "gdpPPP": 9.444,
      "perCapitaPPP": 8138.5,
      "perCapitaPPPChangePct": 6.14,
      "popChangePct": 1.05
    },
    {
      "year": 1999,
      "gdpPPP": 9.828,
      "perCapitaPPP": 8362.2,
      "perCapitaPPPChangePct": 2.75,
      "popChangePct": 1.29
    },
    {
      "year": 2000,
      "gdpPPP": 10.874,
      "perCapitaPPP": 9161.7,
      "perCapitaPPPChangePct": 9.56,
      "popChangePct": 1.02
    },
    {
      "year": 2001,
      "gdpPPP": 11.476,
      "perCapitaPPP": 9593.0,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 0.76
    },
    {
      "year": 2002,
      "gdpPPP": 11.844,
      "perCapitaPPP": 9832.0,
      "perCapitaPPPChangePct": 2.49,
      "popChangePct": 0.75
    },
    {
      "year": 2003,
      "gdpPPP": 12.8,
      "perCapitaPPP": 10549.5,
      "perCapitaPPPChangePct": 7.3,
      "popChangePct": 0.66
    },
    {
      "year": 2004,
      "gdpPPP": 13.71,
      "perCapitaPPP": 11228.3,
      "perCapitaPPPChangePct": 6.43,
      "popChangePct": 0.66
    },
    {
      "year": 2005,
      "gdpPPP": 14.345,
      "perCapitaPPP": 11679.3,
      "perCapitaPPPChangePct": 4.02,
      "popChangePct": 0.57
    },
    {
      "year": 2006,
      "gdpPPP": 15.455,
      "perCapitaPPP": 12524.3,
      "perCapitaPPPChangePct": 7.24,
      "popChangePct": 0.49
    },
    {
      "year": 2007,
      "gdpPPP": 16.783,
      "perCapitaPPP": 13538.5,
      "perCapitaPPPChangePct": 8.1,
      "popChangePct": 0.49
    },
    {
      "year": 2008,
      "gdpPPP": 18.028,
      "perCapitaPPP": 14490.2,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": 0.32
    },
    {
      "year": 2009,
      "gdpPPP": 18.74,
      "perCapitaPPP": 15022.9,
      "perCapitaPPPChangePct": 3.68,
      "popChangePct": 0.24
    },
    {
      "year": 2010,
      "gdpPPP": 19.798,
      "perCapitaPPP": 15833.4,
      "perCapitaPPPChangePct": 5.39,
      "popChangePct": 0.24
    },
    {
      "year": 2011,
      "gdpPPP": 21.03,
      "perCapitaPPP": 16792.1,
      "perCapitaPPPChangePct": 6.05,
      "popChangePct": 0.16
    },
    {
      "year": 2012,
      "gdpPPP": 22.171,
      "perCapitaPPP": 17714.1,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 0.0
    },
    {
      "year": 2013,
      "gdpPPP": 23.306,
      "perCapitaPPP": 18589.7,
      "perCapitaPPPChangePct": 4.94,
      "popChangePct": 0.16
    },
    {
      "year": 2014,
      "gdpPPP": 24.619,
      "perCapitaPPP": 19615.1,
      "perCapitaPPPChangePct": 5.52,
      "popChangePct": 0.08
    },
    {
      "year": 2015,
      "gdpPPP": 25.765,
      "perCapitaPPP": 20511.3,
      "perCapitaPPPChangePct": 4.57,
      "popChangePct": 0.08
    },
    {
      "year": 2016,
      "gdpPPP": 27.014,
      "perCapitaPPP": 21502.4,
      "perCapitaPPPChangePct": 4.83,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 28.581,
      "perCapitaPPP": 22740.8,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": 0.08
    },
    {
      "year": 2018,
      "gdpPPP": 29.195,
      "perCapitaPPP": 23228.5,
      "perCapitaPPPChangePct": 2.14,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 30.418,
      "perCapitaPPP": 24206.8,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 0.0
    },
    {
      "year": 2020,
      "gdpPPP": 26.999,
      "perCapitaPPP": 21497.0,
      "perCapitaPPPChangePct": -11.19,
      "popChangePct": -0.08
    },
    {
      "year": 2021,
      "gdpPPP": 28.793,
      "perCapitaPPP": 22931.8,
      "perCapitaPPPChangePct": 6.67,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 33.522,
      "perCapitaPPP": 26793.5,
      "perCapitaPPPChangePct": 16.84,
      "popChangePct": -0.4
    },
    {
      "year": 2023,
      "gdpPPP": 36.504,
      "perCapitaPPP": 29242.2,
      "perCapitaPPPChangePct": 9.14,
      "popChangePct": -0.24
    },
    {
      "year": 2024,
      "gdpPPP": 39.252,
      "perCapitaPPP": 31516.5,
      "perCapitaPPPChangePct": 7.78,
      "popChangePct": -0.24
    },
    {
      "year": 2025,
      "gdpPPP": 41.617,
      "perCapitaPPP": 33491.4,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": -0.16
    },
    {
      "year": 2026,
      "gdpPPP": 44.265,
      "perCapitaPPP": 35712.9,
      "perCapitaPPPChangePct": 6.63,
      "popChangePct": -0.32
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 46.775,
      "perCapitaPPP": 37840.6,
      "perCapitaPPPChangePct": 5.96,
      "popChangePct": -0.24
    },
    {
      "year": 2028,
      "gdpPPP": 49.159,
      "perCapitaPPP": 39882.8,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": -0.24
    },
    {
      "year": 2029,
      "gdpPPP": 51.734,
      "perCapitaPPP": 42097.9,
      "perCapitaPPPChangePct": 5.55,
      "popChangePct": -0.32
    },
    {
      "year": 2030,
      "gdpPPP": 54.476,
      "perCapitaPPP": 44465.6,
      "perCapitaPPPChangePct": 5.62,
      "popChangePct": -0.33
    },
    {
      "year": 2031,
      "gdpPPP": 57.345,
      "perCapitaPPP": 46959.2,
      "perCapitaPPPChangePct": 5.61,
      "popChangePct": -0.33
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MauritiusGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
