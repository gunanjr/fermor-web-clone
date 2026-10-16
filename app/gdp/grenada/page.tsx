import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Grenada",
  "slug": "grenada",
  "iso3": "GRD",
  "region": "Americas",
  "rank2026": 199,
  "flagEmoji": "🇬🇩",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Comoros",
      "slug": "comoros",
      "rank": 195
    },
    {
      "name": "Vanuatu",
      "slug": "vanuatu",
      "rank": 200
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 0.111,
      "growth": 15.1,
      "perCapita": 1245.6,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 0.116,
      "growth": 1.4,
      "perCapita": 1276.4,
      "popChangePct": 2.25
    },
    {
      "year": 1982,
      "gdp": 0.125,
      "growth": 4.1,
      "perCapita": 1346.9,
      "popChangePct": 2.2
    },
    {
      "year": 1983,
      "gdp": 0.132,
      "growth": 3.3,
      "perCapita": 1372.7,
      "popChangePct": 3.23
    },
    {
      "year": 1984,
      "gdp": 0.146,
      "growth": 4,
      "perCapita": 1477.9,
      "popChangePct": 2.08
    },
    {
      "year": 1985,
      "gdp": 0.168,
      "growth": 6,
      "perCapita": 1678.1,
      "popChangePct": 2.04
    },
    {
      "year": 1986,
      "gdp": 0.188,
      "growth": 7.4,
      "perCapita": 1872.5,
      "popChangePct": 0.0
    },
    {
      "year": 1987,
      "gdp": 0.215,
      "growth": 9.1,
      "perCapita": 2162.5,
      "popChangePct": -1.0
    },
    {
      "year": 1988,
      "gdp": 0.236,
      "growth": 2.9,
      "perCapita": 2408.7,
      "popChangePct": -1.01
    },
    {
      "year": 1989,
      "gdp": 0.267,
      "growth": 3.8,
      "perCapita": 2757.9,
      "popChangePct": -1.02
    },
    {
      "year": 1990,
      "gdp": 0.278,
      "growth": 4.2,
      "perCapita": 2887.0,
      "popChangePct": -1.03
    },
    {
      "year": 1991,
      "gdp": 0.301,
      "growth": 1.4,
      "perCapita": 3117.9,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdp": 0.31,
      "growth": -0.8,
      "perCapita": 3192.2,
      "popChangePct": 1.04
    },
    {
      "year": 1993,
      "gdp": 0.31,
      "growth": -2,
      "perCapita": 3153.8,
      "popChangePct": 1.03
    },
    {
      "year": 1994,
      "gdp": 0.325,
      "growth": 1.8,
      "perCapita": 3272.5,
      "popChangePct": 1.02
    },
    {
      "year": 1995,
      "gdp": 0.342,
      "growth": 2.2,
      "perCapita": 3412.0,
      "popChangePct": 1.01
    },
    {
      "year": 1996,
      "gdp": 0.367,
      "growth": 4.4,
      "perCapita": 3632.7,
      "popChangePct": 1.0
    },
    {
      "year": 1997,
      "gdp": 0.392,
      "growth": 4.9,
      "perCapita": 3861.4,
      "popChangePct": 0.99
    },
    {
      "year": 1998,
      "gdp": 0.446,
      "growth": 11.8,
      "perCapita": 4370.6,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdp": 0.482,
      "growth": 7,
      "perCapita": 4705.8,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdp": 0.52,
      "growth": 5.1,
      "perCapita": 5057.0,
      "popChangePct": 0.98
    },
    {
      "year": 2001,
      "gdp": 0.52,
      "growth": -2,
      "perCapita": 5045.9,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdp": 0.54,
      "growth": 3.4,
      "perCapita": 5192.2,
      "popChangePct": 0.97
    },
    {
      "year": 2003,
      "gdp": 0.591,
      "growth": 9.5,
      "perCapita": 5641.2,
      "popChangePct": 0.96
    },
    {
      "year": 2004,
      "gdp": 0.599,
      "growth": -0.6,
      "perCapita": 5721.6,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdp": 0.695,
      "growth": 13.3,
      "perCapita": 6658.0,
      "popChangePct": -0.95
    },
    {
      "year": 2006,
      "gdp": 0.699,
      "growth": -4,
      "perCapita": 6672.8,
      "popChangePct": 0.96
    },
    {
      "year": 2007,
      "gdp": 0.759,
      "growth": 6.1,
      "perCapita": 7226.9,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 0.826,
      "growth": 0.9,
      "perCapita": 7844.2,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdp": 0.771,
      "growth": -6.6,
      "perCapita": 7333.2,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 0.771,
      "growth": -0.5,
      "perCapita": 7340.3,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 0.779,
      "growth": 0.8,
      "perCapita": 7299.9,
      "popChangePct": 1.9
    },
    {
      "year": 2012,
      "gdp": 0.8,
      "growth": -1.2,
      "perCapita": 7433.9,
      "popChangePct": 0.93
    },
    {
      "year": 2013,
      "gdp": 0.843,
      "growth": 2.4,
      "perCapita": 7760.3,
      "popChangePct": 0.93
    },
    {
      "year": 2014,
      "gdp": 0.911,
      "growth": 7.3,
      "perCapita": 8333.8,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 0.997,
      "growth": 6.4,
      "perCapita": 9055.8,
      "popChangePct": 0.92
    },
    {
      "year": 2016,
      "gdp": 1.062,
      "growth": 3.7,
      "perCapita": 9572.1,
      "popChangePct": 0.91
    },
    {
      "year": 2017,
      "gdp": 1.126,
      "growth": 4.4,
      "perCapita": 10098.8,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 1.167,
      "growth": 4.4,
      "perCapita": 10419.1,
      "popChangePct": 0.9
    },
    {
      "year": 2019,
      "gdp": 1.213,
      "growth": 0.7,
      "perCapita": 10779.1,
      "popChangePct": 0.89
    },
    {
      "year": 2020,
      "gdp": 1.043,
      "growth": -13.8,
      "perCapita": 9222.7,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 1.122,
      "growth": 4.7,
      "perCapita": 9863.6,
      "popChangePct": 0.88
    },
    {
      "year": 2022,
      "gdp": 1.224,
      "growth": 7.3,
      "perCapita": 10697.8,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdp": 1.336,
      "growth": 4.5,
      "perCapita": 11619.4,
      "popChangePct": 0.88
    },
    {
      "year": 2024,
      "gdp": 1.351,
      "growth": 2.4,
      "perCapita": 11685.4,
      "popChangePct": 0.87
    },
    {
      "year": 2025,
      "gdp": 1.42,
      "growth": 4.4,
      "perCapita": 12210.3,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 1.483,
      "growth": 3.1,
      "perCapita": 12688.5,
      "popChangePct": 0.86
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 1.554,
      "growth": 3.1,
      "perCapita": 13225.4,
      "popChangePct": 0.85
    },
    {
      "year": 2028,
      "gdp": 1.632,
      "growth": 3,
      "perCapita": 13815.6,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 1.711,
      "growth": 2.7,
      "perCapita": 14399.5,
      "popChangePct": 0.85
    },
    {
      "year": 2030,
      "gdp": 1.793,
      "growth": 2.7,
      "perCapita": 15008.0,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 1.878,
      "growth": 2.7,
      "perCapita": 15642.2,
      "popChangePct": 0.84
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 0.205,
      "perCapitaPPP": 2305.6,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 0.228,
      "perCapitaPPP": 2513.9,
      "perCapitaPPPChangePct": 9.03,
      "popChangePct": 2.25
    },
    {
      "year": 1982,
      "gdpPPP": 0.252,
      "perCapitaPPP": 2703.6,
      "perCapitaPPPChangePct": 7.55,
      "popChangePct": 2.2
    },
    {
      "year": 1983,
      "gdpPPP": 0.27,
      "perCapitaPPP": 2814.7,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 3.23
    },
    {
      "year": 1984,
      "gdpPPP": 0.291,
      "perCapitaPPP": 2956.4,
      "perCapitaPPPChangePct": 5.03,
      "popChangePct": 2.08
    },
    {
      "year": 1985,
      "gdpPPP": 0.318,
      "perCapitaPPP": 3184.6,
      "perCapitaPPPChangePct": 7.72,
      "popChangePct": 2.04
    },
    {
      "year": 1986,
      "gdpPPP": 0.349,
      "perCapitaPPP": 3479.8,
      "perCapitaPPPChangePct": 9.27,
      "popChangePct": 0.0
    },
    {
      "year": 1987,
      "gdpPPP": 0.39,
      "perCapitaPPP": 3919.2,
      "perCapitaPPPChangePct": 12.63,
      "popChangePct": -1.0
    },
    {
      "year": 1988,
      "gdpPPP": 0.415,
      "perCapitaPPP": 4231.0,
      "perCapitaPPPChangePct": 7.96,
      "popChangePct": -1.01
    },
    {
      "year": 1989,
      "gdpPPP": 0.448,
      "perCapitaPPP": 4618.4,
      "perCapitaPPPChangePct": 9.16,
      "popChangePct": -1.02
    },
    {
      "year": 1990,
      "gdpPPP": 0.484,
      "perCapitaPPP": 5025.7,
      "perCapitaPPPChangePct": 8.82,
      "popChangePct": -1.03
    },
    {
      "year": 1991,
      "gdpPPP": 0.508,
      "perCapitaPPP": 5262.3,
      "perCapitaPPPChangePct": 4.71,
      "popChangePct": 0.0
    },
    {
      "year": 1992,
      "gdpPPP": 0.515,
      "perCapitaPPP": 5300.1,
      "perCapitaPPPChangePct": 0.72,
      "popChangePct": 1.04
    },
    {
      "year": 1993,
      "gdpPPP": 0.517,
      "perCapitaPPP": 5261.5,
      "perCapitaPPPChangePct": -0.73,
      "popChangePct": 1.03
    },
    {
      "year": 1994,
      "gdpPPP": 0.538,
      "perCapitaPPP": 5411.4,
      "perCapitaPPPChangePct": 2.85,
      "popChangePct": 1.02
    },
    {
      "year": 1995,
      "gdpPPP": 0.561,
      "perCapitaPPP": 5593.2,
      "perCapitaPPPChangePct": 3.36,
      "popChangePct": 1.01
    },
    {
      "year": 1996,
      "gdpPPP": 0.596,
      "perCapitaPPP": 5903.2,
      "perCapitaPPPChangePct": 5.54,
      "popChangePct": 1.0
    },
    {
      "year": 1997,
      "gdpPPP": 0.636,
      "perCapitaPPP": 6265.2,
      "perCapitaPPPChangePct": 6.13,
      "popChangePct": 0.99
    },
    {
      "year": 1998,
      "gdpPPP": 0.719,
      "perCapitaPPP": 7052.1,
      "perCapitaPPPChangePct": 12.56,
      "popChangePct": 0.0
    },
    {
      "year": 1999,
      "gdpPPP": 0.781,
      "perCapitaPPP": 7620.8,
      "perCapitaPPPChangePct": 8.06,
      "popChangePct": 0.0
    },
    {
      "year": 2000,
      "gdpPPP": 0.839,
      "perCapitaPPP": 8155.5,
      "perCapitaPPPChangePct": 7.02,
      "popChangePct": 0.98
    },
    {
      "year": 2001,
      "gdpPPP": 0.84,
      "perCapitaPPP": 8146.1,
      "perCapitaPPPChangePct": -0.12,
      "popChangePct": 0.0
    },
    {
      "year": 2002,
      "gdpPPP": 0.883,
      "perCapitaPPP": 8481.1,
      "perCapitaPPPChangePct": 4.11,
      "popChangePct": 0.97
    },
    {
      "year": 2003,
      "gdpPPP": 0.985,
      "perCapitaPPP": 9403.6,
      "perCapitaPPPChangePct": 10.88,
      "popChangePct": 0.96
    },
    {
      "year": 2004,
      "gdpPPP": 1.005,
      "perCapitaPPP": 9599.2,
      "perCapitaPPPChangePct": 2.08,
      "popChangePct": 0.0
    },
    {
      "year": 2005,
      "gdpPPP": 1.174,
      "perCapitaPPP": 11243.4,
      "perCapitaPPPChangePct": 17.13,
      "popChangePct": -0.95
    },
    {
      "year": 2006,
      "gdpPPP": 1.162,
      "perCapitaPPP": 11098.9,
      "perCapitaPPPChangePct": -1.28,
      "popChangePct": 0.96
    },
    {
      "year": 2007,
      "gdpPPP": 1.267,
      "perCapitaPPP": 12066.2,
      "perCapitaPPPChangePct": 8.72,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 1.303,
      "perCapitaPPP": 12377.9,
      "perCapitaPPPChangePct": 2.58,
      "popChangePct": 0.0
    },
    {
      "year": 2009,
      "gdpPPP": 1.225,
      "perCapitaPPP": 11644.2,
      "perCapitaPPPChangePct": -5.93,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 1.233,
      "perCapitaPPP": 11740.7,
      "perCapitaPPPChangePct": 0.83,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 1.268,
      "perCapitaPPP": 11890.2,
      "perCapitaPPPChangePct": 1.27,
      "popChangePct": 1.9
    },
    {
      "year": 2012,
      "gdpPPP": 1.277,
      "perCapitaPPP": 11868.0,
      "perCapitaPPPChangePct": -0.19,
      "popChangePct": 0.93
    },
    {
      "year": 2013,
      "gdpPPP": 1.329,
      "perCapitaPPP": 12242.2,
      "perCapitaPPPChangePct": 3.15,
      "popChangePct": 0.93
    },
    {
      "year": 2014,
      "gdpPPP": 1.452,
      "perCapitaPPP": 13272.9,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 1.56,
      "perCapitaPPP": 14165.9,
      "perCapitaPPPChangePct": 6.73,
      "popChangePct": 0.92
    },
    {
      "year": 2016,
      "gdpPPP": 1.633,
      "perCapitaPPP": 14726.4,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": 0.91
    },
    {
      "year": 2017,
      "gdpPPP": 1.736,
      "perCapitaPPP": 15577.3,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 1.848,
      "perCapitaPPP": 16507.4,
      "perCapitaPPPChangePct": 5.97,
      "popChangePct": 0.9
    },
    {
      "year": 2019,
      "gdpPPP": 1.907,
      "perCapitaPPP": 16943.2,
      "perCapitaPPPChangePct": 2.64,
      "popChangePct": 0.89
    },
    {
      "year": 2020,
      "gdpPPP": 1.671,
      "perCapitaPPP": 14768.1,
      "perCapitaPPPChangePct": -12.84,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 1.784,
      "perCapitaPPP": 15681.9,
      "perCapitaPPPChangePct": 6.19,
      "popChangePct": 0.88
    },
    {
      "year": 2022,
      "gdpPPP": 2.051,
      "perCapitaPPP": 17925.6,
      "perCapitaPPPChangePct": 14.31,
      "popChangePct": 0.0
    },
    {
      "year": 2023,
      "gdpPPP": 2.223,
      "perCapitaPPP": 19329.0,
      "perCapitaPPPChangePct": 7.83,
      "popChangePct": 0.88
    },
    {
      "year": 2024,
      "gdpPPP": 2.333,
      "perCapitaPPP": 20175.2,
      "perCapitaPPPChangePct": 4.38,
      "popChangePct": 0.87
    },
    {
      "year": 2025,
      "gdpPPP": 2.505,
      "perCapitaPPP": 21546.7,
      "perCapitaPPPChangePct": 6.8,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 2.657,
      "perCapitaPPP": 22729.4,
      "perCapitaPPPChangePct": 5.49,
      "popChangePct": 0.86
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 2.799,
      "perCapitaPPP": 23813.7,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 0.85
    },
    {
      "year": 2028,
      "gdpPPP": 2.929,
      "perCapitaPPP": 24788.9,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 3.063,
      "perCapitaPPP": 25780.4,
      "perCapitaPPPChangePct": 4.0,
      "popChangePct": 0.85
    },
    {
      "year": 2030,
      "gdpPPP": 3.204,
      "perCapitaPPP": 26827.0,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 3.351,
      "perCapitaPPP": 27907.2,
      "perCapitaPPPChangePct": 4.03,
      "popChangePct": 0.84
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function GrenadaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
