import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Georgia",
  "slug": "georgia",
  "iso3": "GEO",
  "region": "Asia",
  "rank2026": 108,
  "flagEmoji": "🇬🇪",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Iceland",
      "slug": "iceland",
      "rank": 107
    },
    {
      "name": "Honduras",
      "slug": "honduras",
      "rank": 109
    }
  ],
  "history": [
    {
      "year": 1994,
      "gdp": 0.85,
      "growth": null,
      "perCapita": 172.5,
      "popChangePct": -7.78
    },
    {
      "year": 1995,
      "gdp": 1.961,
      "growth": 2.6,
      "perCapita": 413.5,
      "popChangePct": -3.81
    },
    {
      "year": 1996,
      "gdp": 3.148,
      "growth": 10.5,
      "perCapita": 688.4,
      "popChangePct": -3.56
    },
    {
      "year": 1997,
      "gdp": 3.608,
      "growth": 10.3,
      "perCapita": 818.1,
      "popChangePct": -3.56
    },
    {
      "year": 1998,
      "gdp": 3.73,
      "growth": 3,
      "perCapita": 869.5,
      "popChangePct": -2.72
    },
    {
      "year": 1999,
      "gdp": 2.898,
      "growth": 2.9,
      "perCapita": 690.4,
      "popChangePct": -2.14
    },
    {
      "year": 2000,
      "gdp": 3.144,
      "growth": 1.9,
      "perCapita": 763.7,
      "popChangePct": -1.93
    },
    {
      "year": 2001,
      "gdp": 3.311,
      "growth": 4.8,
      "perCapita": 820.0,
      "popChangePct": -1.92
    },
    {
      "year": 2002,
      "gdp": 3.493,
      "growth": 5.5,
      "perCapita": 875.2,
      "popChangePct": -1.16
    },
    {
      "year": 2003,
      "gdp": 4.103,
      "growth": 11.2,
      "perCapita": 1034.5,
      "popChangePct": -0.63
    },
    {
      "year": 2004,
      "gdp": 5.269,
      "growth": 5.8,
      "perCapita": 1338.1,
      "popChangePct": -0.71
    },
    {
      "year": 2005,
      "gdp": 6.59,
      "growth": 9.6,
      "perCapita": 1682.5,
      "popChangePct": -0.53
    },
    {
      "year": 2006,
      "gdp": 7.979,
      "growth": 9.4,
      "perCapita": 2052.3,
      "popChangePct": -0.74
    },
    {
      "year": 2007,
      "gdp": 10.458,
      "growth": 12.6,
      "perCapita": 2700.4,
      "popChangePct": -0.39
    },
    {
      "year": 2008,
      "gdp": 13.158,
      "growth": 2.4,
      "perCapita": 3419.9,
      "popChangePct": -0.65
    },
    {
      "year": 2009,
      "gdp": 11.069,
      "growth": -3.7,
      "perCapita": 2890.7,
      "popChangePct": -0.49
    },
    {
      "year": 2010,
      "gdp": 12.425,
      "growth": 6.9,
      "perCapita": 3269.9,
      "popChangePct": -0.76
    },
    {
      "year": 2011,
      "gdp": 15.475,
      "growth": 7.9,
      "perCapita": 4101.0,
      "popChangePct": -0.68
    },
    {
      "year": 2012,
      "gdp": 16.894,
      "growth": 6.6,
      "perCapita": 4518.1,
      "popChangePct": -0.93
    },
    {
      "year": 2013,
      "gdp": 17.516,
      "growth": 5.1,
      "perCapita": 4710.6,
      "popChangePct": -0.56
    },
    {
      "year": 2014,
      "gdp": 17.966,
      "growth": 4.1,
      "perCapita": 4833.7,
      "popChangePct": -0.03
    },
    {
      "year": 2015,
      "gdp": 15.223,
      "growth": 3.4,
      "perCapita": 4090.2,
      "popChangePct": 0.13
    },
    {
      "year": 2016,
      "gdp": 15.445,
      "growth": 3.4,
      "perCapita": 4142.2,
      "popChangePct": 0.19
    },
    {
      "year": 2017,
      "gdp": 16.472,
      "growth": 5.2,
      "perCapita": 4420.4,
      "popChangePct": -0.08
    },
    {
      "year": 2018,
      "gdp": 17.905,
      "growth": 6.1,
      "perCapita": 4800.8,
      "popChangePct": 0.11
    },
    {
      "year": 2019,
      "gdp": 17.645,
      "growth": 5.4,
      "perCapita": 4738.8,
      "popChangePct": -0.16
    },
    {
      "year": 2020,
      "gdp": 16.013,
      "growth": -6.3,
      "perCapita": 4308.3,
      "popChangePct": -0.19
    },
    {
      "year": 2021,
      "gdp": 18.849,
      "growth": 10.6,
      "perCapita": 5055.2,
      "popChangePct": 0.32
    },
    {
      "year": 2022,
      "gdp": 24.985,
      "growth": 11,
      "perCapita": 6773.5,
      "popChangePct": -1.07
    },
    {
      "year": 2023,
      "gdp": 30.778,
      "growth": 7.8,
      "perCapita": 8237.4,
      "popChangePct": 1.27
    },
    {
      "year": 2024,
      "gdp": 34.191,
      "growth": 9.7,
      "perCapita": 9254.3,
      "popChangePct": -1.1
    },
    {
      "year": 2025,
      "gdp": 38.216,
      "growth": 7.5,
      "perCapita": 10346.1,
      "popChangePct": -0.03
    },
    {
      "year": 2026,
      "gdp": 42.716,
      "growth": 5.3,
      "perCapita": 11574.0,
      "popChangePct": -0.08
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 46.7,
      "growth": 5,
      "perCapita": 12664.2,
      "popChangePct": -0.08
    },
    {
      "year": 2028,
      "gdp": 51.138,
      "growth": 5,
      "perCapita": 13879.6,
      "popChangePct": -0.11
    },
    {
      "year": 2029,
      "gdp": 56.063,
      "growth": 5,
      "perCapita": 15229.2,
      "popChangePct": -0.08
    },
    {
      "year": 2030,
      "gdp": 61.501,
      "growth": 5,
      "perCapita": 16720.7,
      "popChangePct": -0.08
    },
    {
      "year": 2031,
      "gdp": 67.449,
      "growth": 5,
      "perCapita": 18353.3,
      "popChangePct": -0.08
    }
  ],
  "pppHistory": [
    {
      "year": 1994,
      "gdpPPP": 9.466,
      "perCapitaPPP": 1920.1,
      "perCapitaPPPChangePct": null,
      "popChangePct": -7.78
    },
    {
      "year": 1995,
      "gdpPPP": 9.916,
      "perCapitaPPP": 2090.9,
      "perCapitaPPPChangePct": 8.89,
      "popChangePct": -3.81
    },
    {
      "year": 1996,
      "gdpPPP": 11.157,
      "perCapitaPPP": 2439.7,
      "perCapitaPPPChangePct": 16.68,
      "popChangePct": -3.56
    },
    {
      "year": 1997,
      "gdpPPP": 12.522,
      "perCapitaPPP": 2839.3,
      "perCapitaPPPChangePct": 16.38,
      "popChangePct": -3.56
    },
    {
      "year": 1998,
      "gdpPPP": 13.045,
      "perCapitaPPP": 3041.1,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": -2.72
    },
    {
      "year": 1999,
      "gdpPPP": 13.613,
      "perCapitaPPP": 3243.1,
      "perCapitaPPPChangePct": 6.64,
      "popChangePct": -2.14
    },
    {
      "year": 2000,
      "gdpPPP": 14.181,
      "perCapitaPPP": 3444.7,
      "perCapitaPPPChangePct": 6.22,
      "popChangePct": -1.93
    },
    {
      "year": 2001,
      "gdpPPP": 15.192,
      "perCapitaPPP": 3762.7,
      "perCapitaPPPChangePct": 9.23,
      "popChangePct": -1.92
    },
    {
      "year": 2002,
      "gdpPPP": 16.274,
      "perCapitaPPP": 4077.5,
      "perCapitaPPPChangePct": 8.37,
      "popChangePct": -1.16
    },
    {
      "year": 2003,
      "gdpPPP": 18.459,
      "perCapitaPPP": 4654.6,
      "perCapitaPPPChangePct": 14.15,
      "popChangePct": -0.63
    },
    {
      "year": 2004,
      "gdpPPP": 20.054,
      "perCapitaPPP": 5092.8,
      "perCapitaPPPChangePct": 9.42,
      "popChangePct": -0.71
    },
    {
      "year": 2005,
      "gdpPPP": 22.666,
      "perCapitaPPP": 5786.6,
      "perCapitaPPPChangePct": 13.62,
      "popChangePct": -0.53
    },
    {
      "year": 2006,
      "gdpPPP": 25.566,
      "perCapitaPPP": 6575.7,
      "perCapitaPPPChangePct": 13.64,
      "popChangePct": -0.74
    },
    {
      "year": 2007,
      "gdpPPP": 29.562,
      "perCapitaPPP": 7633.4,
      "perCapitaPPPChangePct": 16.09,
      "popChangePct": -0.39
    },
    {
      "year": 2008,
      "gdpPPP": 30.86,
      "perCapitaPPP": 8020.6,
      "perCapitaPPPChangePct": 5.07,
      "popChangePct": -0.65
    },
    {
      "year": 2009,
      "gdpPPP": 29.917,
      "perCapitaPPP": 7813.3,
      "perCapitaPPPChangePct": -2.59,
      "popChangePct": -0.49
    },
    {
      "year": 2010,
      "gdpPPP": 32.383,
      "perCapitaPPP": 8522.2,
      "perCapitaPPPChangePct": 9.07,
      "popChangePct": -0.76
    },
    {
      "year": 2011,
      "gdpPPP": 35.678,
      "perCapitaPPP": 9454.7,
      "perCapitaPPPChangePct": 10.94,
      "popChangePct": -0.68
    },
    {
      "year": 2012,
      "gdpPPP": 38.733,
      "perCapitaPPP": 10358.5,
      "perCapitaPPPChangePct": 9.56,
      "popChangePct": -0.93
    },
    {
      "year": 2013,
      "gdpPPP": 41.415,
      "perCapitaPPP": 11137.8,
      "perCapitaPPPChangePct": 7.52,
      "popChangePct": -0.56
    },
    {
      "year": 2014,
      "gdpPPP": 43.86,
      "perCapitaPPP": 11800.1,
      "perCapitaPPPChangePct": 5.95,
      "popChangePct": -0.03
    },
    {
      "year": 2015,
      "gdpPPP": 45.75,
      "perCapitaPPP": 12292.2,
      "perCapitaPPPChangePct": 4.17,
      "popChangePct": 0.13
    },
    {
      "year": 2016,
      "gdpPPP": 47.778,
      "perCapitaPPP": 12814.0,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 0.19
    },
    {
      "year": 2017,
      "gdpPPP": 51.144,
      "perCapitaPPP": 13724.8,
      "perCapitaPPPChangePct": 7.11,
      "popChangePct": -0.08
    },
    {
      "year": 2018,
      "gdpPPP": 55.98,
      "perCapitaPPP": 15009.7,
      "perCapitaPPPChangePct": 9.36,
      "popChangePct": 0.11
    },
    {
      "year": 2019,
      "gdpPPP": 62.388,
      "perCapitaPPP": 16755.2,
      "perCapitaPPPChangePct": 11.63,
      "popChangePct": -0.16
    },
    {
      "year": 2020,
      "gdpPPP": 62.509,
      "perCapitaPPP": 16817.4,
      "perCapitaPPPChangePct": 0.37,
      "popChangePct": -0.19
    },
    {
      "year": 2021,
      "gdpPPP": 70.151,
      "perCapitaPPP": 18814.3,
      "perCapitaPPPChangePct": 11.87,
      "popChangePct": 0.32
    },
    {
      "year": 2022,
      "gdpPPP": 83.375,
      "perCapitaPPP": 22603.5,
      "perCapitaPPPChangePct": 20.14,
      "popChangePct": -1.07
    },
    {
      "year": 2023,
      "gdpPPP": 93.232,
      "perCapitaPPP": 24952.3,
      "perCapitaPPPChangePct": 10.39,
      "popChangePct": 1.27
    },
    {
      "year": 2024,
      "gdpPPP": 104.795,
      "perCapitaPPP": 28364.3,
      "perCapitaPPPChangePct": 13.67,
      "popChangePct": -1.1
    },
    {
      "year": 2025,
      "gdpPPP": 115.809,
      "perCapitaPPP": 31352.2,
      "perCapitaPPPChangePct": 10.53,
      "popChangePct": -0.03
    },
    {
      "year": 2026,
      "gdpPPP": 125.448,
      "perCapitaPPP": 33990.5,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": -0.08
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 134.637,
      "perCapitaPPP": 36511.4,
      "perCapitaPPPChangePct": 7.42,
      "popChangePct": -0.08
    },
    {
      "year": 2028,
      "gdpPPP": 143.68,
      "perCapitaPPP": 38996.6,
      "perCapitaPPPChangePct": 6.81,
      "popChangePct": -0.11
    },
    {
      "year": 2029,
      "gdpPPP": 153.534,
      "perCapitaPPP": 41706.6,
      "perCapitaPPPChangePct": 6.95,
      "popChangePct": -0.08
    },
    {
      "year": 2030,
      "gdpPPP": 164.173,
      "perCapitaPPP": 44634.7,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": -0.08
    },
    {
      "year": 2031,
      "gdpPPP": 175.484,
      "perCapitaPPP": 47750.2,
      "perCapitaPPPChangePct": 6.98,
      "popChangePct": -0.08
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GeorgiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
