import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Macao",
  "slug": "macao",
  "iso3": "MAC",
  "region": "Asia",
  "rank2026": 98,
  "flagEmoji": "🇲🇴",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Zimbabwe",
      "slug": "zimbabwe",
      "rank": 97
    },
    {
      "name": "Latvia",
      "slug": "latvia",
      "rank": 99
    }
  ],
  "history": [
    {
      "year": 2001,
      "gdp": 6.86,
      "growth": null,
      "perCapita": 15723.8,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdp": 7.372,
      "growth": 8.9,
      "perCapita": 16734.0,
      "popChangePct": 1.15
    },
    {
      "year": 2003,
      "gdp": 8.247,
      "growth": 11.6,
      "perCapita": 18461.8,
      "popChangePct": 1.36
    },
    {
      "year": 2004,
      "gdp": 10.643,
      "growth": 26.6,
      "perCapita": 23005.6,
      "popChangePct": 3.58
    },
    {
      "year": 2005,
      "gdp": 12.16,
      "growth": 8.1,
      "perCapita": 25110.0,
      "popChangePct": 4.54
    },
    {
      "year": 2006,
      "gdp": 14.874,
      "growth": 13.4,
      "perCapita": 28970.4,
      "popChangePct": 5.99
    },
    {
      "year": 2007,
      "gdp": 18.44,
      "growth": 14.5,
      "perCapita": 34268.7,
      "popChangePct": 4.87
    },
    {
      "year": 2008,
      "gdp": 21.027,
      "growth": 3.4,
      "perCapita": 38286.2,
      "popChangePct": 2.04
    },
    {
      "year": 2009,
      "gdp": 21.589,
      "growth": 1.3,
      "perCapita": 39825.6,
      "popChangePct": -1.28
    },
    {
      "year": 2010,
      "gdp": 28.244,
      "growth": 25.1,
      "perCapita": 51139.2,
      "popChangePct": 1.85
    },
    {
      "year": 2011,
      "gdp": 36.847,
      "growth": 21.6,
      "perCapita": 66116.9,
      "popChangePct": 0.91
    },
    {
      "year": 2012,
      "gdp": 43.193,
      "growth": 9.2,
      "perCapita": 74215.6,
      "popChangePct": 4.49
    },
    {
      "year": 2013,
      "gdp": 51.559,
      "growth": 10.8,
      "perCapita": 84871.0,
      "popChangePct": 4.47
    },
    {
      "year": 2014,
      "gdp": 54.931,
      "growth": -2,
      "perCapita": 86341.6,
      "popChangePct": 4.61
    },
    {
      "year": 2015,
      "gdp": 44.941,
      "growth": -21.8,
      "perCapita": 69481.5,
      "popChangePct": 1.73
    },
    {
      "year": 2016,
      "gdp": 44.965,
      "growth": -0.7,
      "perCapita": 69723.7,
      "popChangePct": -0.31
    },
    {
      "year": 2017,
      "gdp": 50.297,
      "growth": 9.9,
      "perCapita": 77012.8,
      "popChangePct": 1.24
    },
    {
      "year": 2018,
      "gdp": 55.076,
      "growth": 6.4,
      "perCapita": 82523.9,
      "popChangePct": 2.14
    },
    {
      "year": 2019,
      "gdp": 55.025,
      "growth": -2.5,
      "perCapita": 80967.0,
      "popChangePct": 1.95
    },
    {
      "year": 2020,
      "gdp": 25.28,
      "growth": -54.4,
      "perCapita": 37007.8,
      "popChangePct": 0.44
    },
    {
      "year": 2021,
      "gdp": 30.634,
      "growth": 22.5,
      "perCapita": 44838.9,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 24.93,
      "growth": -19,
      "perCapita": 37053.5,
      "popChangePct": -1.46
    },
    {
      "year": 2023,
      "gdp": 45.627,
      "growth": 75.3,
      "perCapita": 66734.8,
      "popChangePct": 1.63
    },
    {
      "year": 2024,
      "gdp": 49.467,
      "growth": 7.8,
      "perCapita": 71868.8,
      "popChangePct": 0.58
    },
    {
      "year": 2025,
      "gdp": 52.061,
      "growth": 4.7,
      "perCapita": 74465.5,
      "popChangePct": 1.6
    },
    {
      "year": 2026,
      "gdp": 54.228,
      "growth": 3,
      "perCapita": 76445.8,
      "popChangePct": 1.43
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 56.81,
      "growth": 3.1,
      "perCapita": 79276.6,
      "popChangePct": 1.13
    },
    {
      "year": 2028,
      "gdp": 59.648,
      "growth": 3.1,
      "perCapita": 82458.6,
      "popChangePct": 0.84
    },
    {
      "year": 2029,
      "gdp": 62.54,
      "growth": 3,
      "perCapita": 85903.6,
      "popChangePct": 0.69
    },
    {
      "year": 2030,
      "gdp": 65.547,
      "growth": 3,
      "perCapita": 89457.1,
      "popChangePct": 0.69
    },
    {
      "year": 2031,
      "gdp": 68.639,
      "growth": 3,
      "perCapita": 92161.2,
      "popChangePct": 1.64
    }
  ],
  "pppHistory": [
    {
      "year": 2001,
      "gdpPPP": 16.711,
      "perCapitaPPP": 38301.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2002,
      "gdpPPP": 18.482,
      "perCapitaPPP": 41954.7,
      "perCapitaPPPChangePct": 9.54,
      "popChangePct": 1.15
    },
    {
      "year": 2003,
      "gdpPPP": 21.041,
      "perCapitaPPP": 47105.0,
      "perCapitaPPPChangePct": 12.28,
      "popChangePct": 1.36
    },
    {
      "year": 2004,
      "gdpPPP": 27.362,
      "perCapitaPPP": 59143.6,
      "perCapitaPPPChangePct": 25.56,
      "popChangePct": 3.58
    },
    {
      "year": 2005,
      "gdpPPP": 30.5,
      "perCapitaPPP": 62979.7,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": 4.54
    },
    {
      "year": 2006,
      "gdpPPP": 35.651,
      "perCapitaPPP": 69437.1,
      "perCapitaPPPChangePct": 10.25,
      "popChangePct": 5.99
    },
    {
      "year": 2007,
      "gdpPPP": 41.919,
      "perCapitaPPP": 77902.5,
      "perCapitaPPPChangePct": 12.19,
      "popChangePct": 4.87
    },
    {
      "year": 2008,
      "gdpPPP": 44.176,
      "perCapitaPPP": 80437.7,
      "perCapitaPPPChangePct": 3.25,
      "popChangePct": 2.04
    },
    {
      "year": 2009,
      "gdpPPP": 45.026,
      "perCapitaPPP": 83058.4,
      "perCapitaPPPChangePct": 3.26,
      "popChangePct": -1.28
    },
    {
      "year": 2010,
      "gdpPPP": 57.013,
      "perCapitaPPP": 103228.9,
      "perCapitaPPPChangePct": 24.28,
      "popChangePct": 1.85
    },
    {
      "year": 2011,
      "gdpPPP": 70.772,
      "perCapitaPPP": 126990.2,
      "perCapitaPPPChangePct": 23.02,
      "popChangePct": 0.91
    },
    {
      "year": 2012,
      "gdpPPP": 78.734,
      "perCapitaPPP": 135282.4,
      "perCapitaPPPChangePct": 6.53,
      "popChangePct": 4.49
    },
    {
      "year": 2013,
      "gdpPPP": 88.708,
      "perCapitaPPP": 146021.0,
      "perCapitaPPPChangePct": 7.94,
      "popChangePct": 4.47
    },
    {
      "year": 2014,
      "gdpPPP": 88.413,
      "perCapitaPPP": 138970.1,
      "perCapitaPPPChangePct": -4.83,
      "popChangePct": 4.61
    },
    {
      "year": 2015,
      "gdpPPP": 69.821,
      "perCapitaPPP": 107949.1,
      "perCapitaPPPChangePct": -22.32,
      "popChangePct": 1.73
    },
    {
      "year": 2016,
      "gdpPPP": 69.99,
      "perCapitaPPP": 108529.2,
      "perCapitaPPPChangePct": 0.54,
      "popChangePct": -0.31
    },
    {
      "year": 2017,
      "gdpPPP": 78.31,
      "perCapitaPPP": 119905.8,
      "perCapitaPPPChangePct": 10.48,
      "popChangePct": 1.24
    },
    {
      "year": 2018,
      "gdpPPP": 85.3,
      "perCapitaPPP": 127808.9,
      "perCapitaPPPChangePct": 6.59,
      "popChangePct": 2.14
    },
    {
      "year": 2019,
      "gdpPPP": 84.692,
      "perCapitaPPP": 124620.2,
      "perCapitaPPPChangePct": -2.49,
      "popChangePct": 1.95
    },
    {
      "year": 2020,
      "gdpPPP": 39.121,
      "perCapitaPPP": 57269.7,
      "perCapitaPPPChangePct": -54.04,
      "popChangePct": 0.44
    },
    {
      "year": 2021,
      "gdpPPP": 50.078,
      "perCapitaPPP": 73299.6,
      "perCapitaPPPChangePct": 27.99,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 43.472,
      "perCapitaPPP": 64612.9,
      "perCapitaPPPChangePct": -11.85,
      "popChangePct": -1.46
    },
    {
      "year": 2023,
      "gdpPPP": 79.029,
      "perCapitaPPP": 115589.9,
      "perCapitaPPPChangePct": 78.9,
      "popChangePct": 1.63
    },
    {
      "year": 2024,
      "gdpPPP": 87.348,
      "perCapitaPPP": 126904.2,
      "perCapitaPPPChangePct": 9.79,
      "popChangePct": 0.58
    },
    {
      "year": 2025,
      "gdpPPP": 94.022,
      "perCapitaPPP": 134484.9,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 1.6
    },
    {
      "year": 2026,
      "gdpPPP": 99.611,
      "perCapitaPPP": 140423.2,
      "perCapitaPPPChangePct": 4.42,
      "popChangePct": 1.43
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 104.927,
      "perCapitaPPP": 146420.5,
      "perCapitaPPPChangePct": 4.27,
      "popChangePct": 1.13
    },
    {
      "year": 2028,
      "gdpPPP": 109.936,
      "perCapitaPPP": 151979.0,
      "perCapitaPPPChangePct": 3.8,
      "popChangePct": 0.84
    },
    {
      "year": 2029,
      "gdpPPP": 115.254,
      "perCapitaPPP": 158309.4,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 0.69
    },
    {
      "year": 2030,
      "gdpPPP": 120.905,
      "perCapitaPPP": 165008.0,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 0.69
    },
    {
      "year": 2031,
      "gdpPPP": 126.799,
      "perCapitaPPP": 170252.5,
      "perCapitaPPPChangePct": 3.18,
      "popChangePct": 1.64
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function MacaoGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
