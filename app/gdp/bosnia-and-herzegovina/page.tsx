import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Bosnia and Herzegovina",
  "slug": "bosnia-and-herzegovina",
  "iso3": "BIH",
  "region": "Europe",
  "rank2026": 114,
  "flagEmoji": "🇧🇦",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Haiti",
      "slug": "haiti",
      "rank": 113
    },
    {
      "name": "Lebanon",
      "slug": "lebanon",
      "rank": 115
    }
  ],
  "history": [
    {
      "year": 1996,
      "gdp": 3.584,
      "growth": 62.2,
      "perCapita": 952.3,
      "popChangePct": null
    },
    {
      "year": 1997,
      "gdp": 4.578,
      "growth": 22.9,
      "perCapita": 1225.5,
      "popChangePct": -0.72
    },
    {
      "year": 1998,
      "gdp": 5.281,
      "growth": 13.8,
      "perCapita": 1415.1,
      "popChangePct": -0.11
    },
    {
      "year": 1999,
      "gdp": 5.766,
      "growth": 10.7,
      "perCapita": 1540.5,
      "popChangePct": 0.29
    },
    {
      "year": 2000,
      "gdp": 5.568,
      "growth": 4.4,
      "perCapita": 1484.3,
      "popChangePct": 0.21
    },
    {
      "year": 2001,
      "gdp": 5.801,
      "growth": 7.5,
      "perCapita": 1544.8,
      "popChangePct": 0.11
    },
    {
      "year": 2002,
      "gdp": 6.728,
      "growth": 5,
      "perCapita": 1789.9,
      "popChangePct": 0.11
    },
    {
      "year": 2003,
      "gdp": 8.499,
      "growth": 3.9,
      "perCapita": 2260.3,
      "popChangePct": 0.03
    },
    {
      "year": 2004,
      "gdp": 10.17,
      "growth": 6.3,
      "perCapita": 2702.7,
      "popChangePct": 0.08
    },
    {
      "year": 2005,
      "gdp": 11.233,
      "growth": 3.9,
      "perCapita": 2982.9,
      "popChangePct": 0.08
    },
    {
      "year": 2006,
      "gdp": 12.877,
      "growth": 5.4,
      "perCapita": 3417.4,
      "popChangePct": 0.05
    },
    {
      "year": 2007,
      "gdp": 15.801,
      "growth": 5.9,
      "perCapita": 4200.3,
      "popChangePct": -0.16
    },
    {
      "year": 2008,
      "gdp": 19.188,
      "growth": 5.4,
      "perCapita": 5111.3,
      "popChangePct": -0.21
    },
    {
      "year": 2009,
      "gdp": 17.666,
      "growth": -3,
      "perCapita": 4728.5,
      "popChangePct": -0.48
    },
    {
      "year": 2010,
      "gdp": 17.207,
      "growth": 0.9,
      "perCapita": 4645.5,
      "popChangePct": -0.86
    },
    {
      "year": 2011,
      "gdp": 18.665,
      "growth": 1,
      "perCapita": 5099.8,
      "popChangePct": -1.19
    },
    {
      "year": 2012,
      "gdp": 17.237,
      "growth": -0.8,
      "perCapita": 4781.3,
      "popChangePct": -1.5
    },
    {
      "year": 2013,
      "gdp": 18.184,
      "growth": 2.3,
      "perCapita": 5149.9,
      "popChangePct": -2.05
    },
    {
      "year": 2014,
      "gdp": 18.588,
      "growth": 1.2,
      "perCapita": 5271.7,
      "popChangePct": -0.14
    },
    {
      "year": 2015,
      "gdp": 16.413,
      "growth": 4.3,
      "perCapita": 4665.3,
      "popChangePct": -0.23
    },
    {
      "year": 2016,
      "gdp": 17.124,
      "growth": 3.2,
      "perCapita": 4877.2,
      "popChangePct": -0.2
    },
    {
      "year": 2017,
      "gdp": 18.363,
      "growth": 3.2,
      "perCapita": 5240.5,
      "popChangePct": -0.2
    },
    {
      "year": 2018,
      "gdp": 20.504,
      "growth": 3.8,
      "perCapita": 5864.9,
      "popChangePct": -0.23
    },
    {
      "year": 2019,
      "gdp": 20.485,
      "growth": 2.9,
      "perCapita": 5867.9,
      "popChangePct": -0.14
    },
    {
      "year": 2020,
      "gdp": 20.264,
      "growth": -3,
      "perCapita": 5811.4,
      "popChangePct": -0.11
    },
    {
      "year": 2021,
      "gdp": 23.688,
      "growth": 7.4,
      "perCapita": 6804.8,
      "popChangePct": -0.17
    },
    {
      "year": 2022,
      "gdp": 24.581,
      "growth": 4.2,
      "perCapita": 7077.5,
      "popChangePct": -0.23
    },
    {
      "year": 2023,
      "gdp": 27.606,
      "growth": 2,
      "perCapita": 7969.2,
      "popChangePct": -0.26
    },
    {
      "year": 2024,
      "gdp": 29.738,
      "growth": 3.2,
      "perCapita": 8607.0,
      "popChangePct": -0.26
    },
    {
      "year": 2025,
      "gdp": 32.962,
      "growth": 2,
      "perCapita": 9567.7,
      "popChangePct": -0.29
    },
    {
      "year": 2026,
      "gdp": 36.771,
      "growth": 2.2,
      "perCapita": 10701.1,
      "popChangePct": -0.26
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 38.914,
      "growth": 2.7,
      "perCapita": 11357.7,
      "popChangePct": -0.29
    },
    {
      "year": 2028,
      "gdp": 40.862,
      "growth": 3,
      "perCapita": 11961.3,
      "popChangePct": -0.29
    },
    {
      "year": 2029,
      "gdp": 43.04,
      "growth": 3,
      "perCapita": 12639.2,
      "popChangePct": -0.32
    },
    {
      "year": 2030,
      "gdp": 45.291,
      "growth": 3,
      "perCapita": 13343.2,
      "popChangePct": -0.32
    },
    {
      "year": 2031,
      "gdp": 47.66,
      "growth": 3,
      "perCapita": 14083.8,
      "popChangePct": -0.29
    }
  ],
  "pppHistory": [
    {
      "year": 1996,
      "gdpPPP": 11.455,
      "perCapitaPPP": 3044.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1997,
      "gdpPPP": 14.316,
      "perCapitaPPP": 3831.8,
      "perCapitaPPPChangePct": 25.87,
      "popChangePct": -0.72
    },
    {
      "year": 1998,
      "gdpPPP": 16.476,
      "perCapitaPPP": 4414.8,
      "perCapitaPPPChangePct": 15.22,
      "popChangePct": -0.11
    },
    {
      "year": 1999,
      "gdpPPP": 18.505,
      "perCapitaPPP": 4944.0,
      "perCapitaPPPChangePct": 11.99,
      "popChangePct": 0.29
    },
    {
      "year": 2000,
      "gdpPPP": 19.765,
      "perCapitaPPP": 5269.3,
      "perCapitaPPPChangePct": 6.58,
      "popChangePct": 0.21
    },
    {
      "year": 2001,
      "gdpPPP": 21.734,
      "perCapitaPPP": 5788.0,
      "perCapitaPPPChangePct": 9.84,
      "popChangePct": 0.11
    },
    {
      "year": 2002,
      "gdpPPP": 23.181,
      "perCapitaPPP": 6166.9,
      "perCapitaPPPChangePct": 6.55,
      "popChangePct": 0.11
    },
    {
      "year": 2003,
      "gdpPPP": 24.553,
      "perCapitaPPP": 6530.1,
      "perCapitaPPPChangePct": 5.89,
      "popChangePct": 0.03
    },
    {
      "year": 2004,
      "gdpPPP": 26.808,
      "perCapitaPPP": 7124.2,
      "perCapitaPPPChangePct": 9.1,
      "popChangePct": 0.08
    },
    {
      "year": 2005,
      "gdpPPP": 28.726,
      "perCapitaPPP": 7627.8,
      "perCapitaPPPChangePct": 7.07,
      "popChangePct": 0.08
    },
    {
      "year": 2006,
      "gdpPPP": 31.215,
      "perCapitaPPP": 8284.4,
      "perCapitaPPPChangePct": 8.61,
      "popChangePct": 0.05
    },
    {
      "year": 2007,
      "gdpPPP": 33.94,
      "perCapitaPPP": 9021.7,
      "perCapitaPPPChangePct": 8.9,
      "popChangePct": -0.16
    },
    {
      "year": 2008,
      "gdpPPP": 36.476,
      "perCapitaPPP": 9716.6,
      "perCapitaPPPChangePct": 7.7,
      "popChangePct": -0.21
    },
    {
      "year": 2009,
      "gdpPPP": 35.598,
      "perCapitaPPP": 9528.5,
      "perCapitaPPPChangePct": -1.94,
      "popChangePct": -0.48
    },
    {
      "year": 2010,
      "gdpPPP": 36.343,
      "perCapitaPPP": 9811.8,
      "perCapitaPPPChangePct": 2.97,
      "popChangePct": -0.86
    },
    {
      "year": 2011,
      "gdpPPP": 37.449,
      "perCapitaPPP": 10231.9,
      "perCapitaPPPChangePct": 4.28,
      "popChangePct": -1.19
    },
    {
      "year": 2012,
      "gdpPPP": 37.832,
      "perCapitaPPP": 10494.4,
      "perCapitaPPPChangePct": 2.57,
      "popChangePct": -1.5
    },
    {
      "year": 2013,
      "gdpPPP": 39.38,
      "perCapitaPPP": 11152.8,
      "perCapitaPPPChangePct": 6.27,
      "popChangePct": -2.05
    },
    {
      "year": 2014,
      "gdpPPP": 40.529,
      "perCapitaPPP": 11494.2,
      "perCapitaPPPChangePct": 3.06,
      "popChangePct": -0.14
    },
    {
      "year": 2015,
      "gdpPPP": 42.657,
      "perCapitaPPP": 12125.4,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": -0.23
    },
    {
      "year": 2016,
      "gdpPPP": 44.459,
      "perCapitaPPP": 12662.7,
      "perCapitaPPPChangePct": 4.43,
      "popChangePct": -0.2
    },
    {
      "year": 2017,
      "gdpPPP": 46.723,
      "perCapitaPPP": 13334.2,
      "perCapitaPPPChangePct": 5.3,
      "popChangePct": -0.2
    },
    {
      "year": 2018,
      "gdpPPP": 50.326,
      "perCapitaPPP": 14395.3,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": -0.23
    },
    {
      "year": 2019,
      "gdpPPP": 54.963,
      "perCapitaPPP": 15744.2,
      "perCapitaPPPChangePct": 9.37,
      "popChangePct": -0.14
    },
    {
      "year": 2020,
      "gdpPPP": 54.01,
      "perCapitaPPP": 15489.0,
      "perCapitaPPPChangePct": -1.62,
      "popChangePct": -0.11
    },
    {
      "year": 2021,
      "gdpPPP": 60.177,
      "perCapitaPPP": 17287.1,
      "perCapitaPPPChangePct": 11.61,
      "popChangePct": -0.17
    },
    {
      "year": 2022,
      "gdpPPP": 67.181,
      "perCapitaPPP": 19343.6,
      "perCapitaPPPChangePct": 11.9,
      "popChangePct": -0.23
    },
    {
      "year": 2023,
      "gdpPPP": 71.057,
      "perCapitaPPP": 20512.4,
      "perCapitaPPPChangePct": 6.04,
      "popChangePct": -0.26
    },
    {
      "year": 2024,
      "gdpPPP": 75.17,
      "perCapitaPPP": 21756.3,
      "perCapitaPPPChangePct": 6.06,
      "popChangePct": -0.26
    },
    {
      "year": 2025,
      "gdpPPP": 78.849,
      "perCapitaPPP": 22886.9,
      "perCapitaPPPChangePct": 5.2,
      "popChangePct": -0.29
    },
    {
      "year": 2026,
      "gdpPPP": 82.892,
      "perCapitaPPP": 24123.4,
      "perCapitaPPPChangePct": 5.4,
      "popChangePct": -0.26
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 87,
      "perCapitaPPP": 25392.4,
      "perCapitaPPPChangePct": 5.26,
      "popChangePct": -0.29
    },
    {
      "year": 2028,
      "gdpPPP": 91.08,
      "perCapitaPPP": 26661.0,
      "perCapitaPPPChangePct": 5.0,
      "popChangePct": -0.29
    },
    {
      "year": 2029,
      "gdpPPP": 95.481,
      "perCapitaPPP": 28039.2,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": -0.32
    },
    {
      "year": 2030,
      "gdpPPP": 100.152,
      "perCapitaPPP": 29506.0,
      "perCapitaPPPChangePct": 5.23,
      "popChangePct": -0.32
    },
    {
      "year": 2031,
      "gdpPPP": 105.019,
      "perCapitaPPP": 31034.1,
      "perCapitaPPPChangePct": 5.18,
      "popChangePct": -0.29
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function BosniaAndHerzegovinaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
