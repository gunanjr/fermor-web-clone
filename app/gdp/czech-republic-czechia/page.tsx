import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Czech Republic (Czechia)",
  "slug": "czech-republic-czechia",
  "iso3": "CZE",
  "region": "Europe",
  "rank2026": 42,
  "flagEmoji": "🇨🇿",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Hong Kong",
      "slug": "hong-kong",
      "rank": 41
    },
    {
      "name": "Egypt",
      "slug": "egypt",
      "rank": 43
    }
  ],
  "history": [
    {
      "year": 1995,
      "gdp": 60.565,
      "growth": null,
      "perCapita": 5861.2,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdp": 67.805,
      "growth": 4.5,
      "perCapita": 6569.4,
      "popChangePct": -0.12
    },
    {
      "year": 1997,
      "gdp": 62.53,
      "growth": -0.6,
      "perCapita": 6065.5,
      "popChangePct": -0.12
    },
    {
      "year": 1998,
      "gdp": 67.161,
      "growth": -0.4,
      "perCapita": 6521.1,
      "popChangePct": -0.1
    },
    {
      "year": 1999,
      "gdp": 65.586,
      "growth": 1.4,
      "perCapita": 6374.0,
      "popChangePct": -0.09
    },
    {
      "year": 2000,
      "gdp": 62.171,
      "growth": 4,
      "perCapita": 6048.9,
      "popChangePct": -0.12
    },
    {
      "year": 2001,
      "gdp": 68.136,
      "growth": 2.9,
      "perCapita": 6659.1,
      "popChangePct": -0.45
    },
    {
      "year": 2002,
      "gdp": 82.596,
      "growth": 1.5,
      "perCapita": 8096.7,
      "popChangePct": -0.3
    },
    {
      "year": 2003,
      "gdp": 100.471,
      "growth": 3.3,
      "perCapita": 9857.2,
      "popChangePct": -0.08
    },
    {
      "year": 2004,
      "gdp": 120.148,
      "growth": 4.7,
      "perCapita": 11784.6,
      "popChangePct": 0.02
    },
    {
      "year": 2005,
      "gdp": 137.264,
      "growth": 6.4,
      "perCapita": 13458.8,
      "popChangePct": 0.04
    },
    {
      "year": 2006,
      "gdp": 156.236,
      "growth": 6.6,
      "perCapita": 15282.0,
      "popChangePct": 0.25
    },
    {
      "year": 2007,
      "gdp": 189.845,
      "growth": 5.5,
      "perCapita": 18513.8,
      "popChangePct": 0.29
    },
    {
      "year": 2008,
      "gdp": 236.82,
      "growth": 2.6,
      "perCapita": 22895.7,
      "popChangePct": 0.87
    },
    {
      "year": 2009,
      "gdp": 207.095,
      "growth": -4.8,
      "perCapita": 19863.8,
      "popChangePct": 0.8
    },
    {
      "year": 2010,
      "gdp": 211.169,
      "growth": 2.7,
      "perCapita": 20184.2,
      "popChangePct": 0.35
    },
    {
      "year": 2011,
      "gdp": 231.429,
      "growth": 1.8,
      "perCapita": 22068.8,
      "popChangePct": 0.24
    },
    {
      "year": 2012,
      "gdp": 210.363,
      "growth": -0.8,
      "perCapita": 20024.2,
      "popChangePct": 0.17
    },
    {
      "year": 2013,
      "gdp": 213.024,
      "growth": 0,
      "perCapita": 20256.9,
      "popChangePct": 0.1
    },
    {
      "year": 2014,
      "gdp": 210.911,
      "growth": 2.2,
      "perCapita": 20063.1,
      "popChangePct": -0.04
    },
    {
      "year": 2015,
      "gdp": 189.108,
      "growth": 5,
      "perCapita": 17944.8,
      "popChangePct": 0.25
    },
    {
      "year": 2016,
      "gdp": 198.161,
      "growth": 2.6,
      "perCapita": 18731.8,
      "popChangePct": 0.39
    },
    {
      "year": 2017,
      "gdp": 221.564,
      "growth": 5.2,
      "perCapita": 20882.4,
      "popChangePct": 0.29
    },
    {
      "year": 2018,
      "gdp": 251.992,
      "growth": 2.8,
      "perCapita": 23661.7,
      "popChangePct": 0.38
    },
    {
      "year": 2019,
      "gdp": 256.794,
      "growth": 3.6,
      "perCapita": 24013.1,
      "popChangePct": 0.41
    },
    {
      "year": 2020,
      "gdp": 251.11,
      "growth": -5.3,
      "perCapita": 23464.3,
      "popChangePct": 0.07
    },
    {
      "year": 2021,
      "gdp": 290.973,
      "growth": 4,
      "perCapita": 27667.7,
      "popChangePct": -1.73
    },
    {
      "year": 2022,
      "gdp": 301.831,
      "growth": 2.8,
      "perCapita": 27876.3,
      "popChangePct": 2.96
    },
    {
      "year": 2023,
      "gdp": 345.059,
      "growth": 0,
      "perCapita": 31800.9,
      "popChangePct": 0.21
    },
    {
      "year": 2024,
      "gdp": 347.083,
      "growth": 1.3,
      "perCapita": 31739.6,
      "popChangePct": 0.77
    },
    {
      "year": 2025,
      "gdp": 389.02,
      "growth": 2.5,
      "perCapita": 35678.4,
      "popChangePct": -0.28
    },
    {
      "year": 2026,
      "gdp": 432.597,
      "growth": 2.2,
      "perCapita": 39795.2,
      "popChangePct": -0.3
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 451.1,
      "growth": 2.2,
      "perCapita": 41625.7,
      "popChangePct": -0.31
    },
    {
      "year": 2028,
      "gdp": 469.574,
      "growth": 2.1,
      "perCapita": 43470.1,
      "popChangePct": -0.32
    },
    {
      "year": 2029,
      "gdp": 487.941,
      "growth": 1.9,
      "perCapita": 45305.5,
      "popChangePct": -0.3
    },
    {
      "year": 2030,
      "gdp": 506.784,
      "growth": 1.8,
      "perCapita": 47195.7,
      "popChangePct": -0.3
    },
    {
      "year": 2031,
      "gdp": 526.286,
      "growth": 1.8,
      "perCapita": 49158.3,
      "popChangePct": -0.3
    }
  ],
  "pppHistory": [
    {
      "year": 1995,
      "gdpPPP": 161.217,
      "perCapitaPPP": 15601.9,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1996,
      "gdpPPP": 171.597,
      "perCapitaPPP": 16625.5,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": -0.12
    },
    {
      "year": 1997,
      "gdpPPP": 173.516,
      "perCapitaPPP": 16831.3,
      "perCapitaPPPChangePct": 1.24,
      "popChangePct": -0.12
    },
    {
      "year": 1998,
      "gdpPPP": 174.776,
      "perCapitaPPP": 16970.0,
      "perCapitaPPPChangePct": 0.82,
      "popChangePct": -0.1
    },
    {
      "year": 1999,
      "gdpPPP": 179.693,
      "perCapitaPPP": 17463.5,
      "perCapitaPPPChangePct": 2.91,
      "popChangePct": -0.09
    },
    {
      "year": 2000,
      "gdpPPP": 191.133,
      "perCapitaPPP": 18596.2,
      "perCapitaPPPChangePct": 6.49,
      "popChangePct": -0.12
    },
    {
      "year": 2001,
      "gdpPPP": 201.138,
      "perCapitaPPP": 19657.7,
      "perCapitaPPPChangePct": 5.71,
      "popChangePct": -0.45
    },
    {
      "year": 2002,
      "gdpPPP": 207.355,
      "perCapitaPPP": 20326.6,
      "perCapitaPPPChangePct": 3.4,
      "popChangePct": -0.3
    },
    {
      "year": 2003,
      "gdpPPP": 218.429,
      "perCapitaPPP": 21430.0,
      "perCapitaPPPChangePct": 5.43,
      "popChangePct": -0.08
    },
    {
      "year": 2004,
      "gdpPPP": 234.926,
      "perCapitaPPP": 23042.4,
      "perCapitaPPPChangePct": 7.52,
      "popChangePct": 0.02
    },
    {
      "year": 2005,
      "gdpPPP": 257.739,
      "perCapitaPPP": 25271.3,
      "perCapitaPPPChangePct": 9.67,
      "popChangePct": 0.04
    },
    {
      "year": 2006,
      "gdpPPP": 283.284,
      "perCapitaPPP": 27708.9,
      "perCapitaPPPChangePct": 9.65,
      "popChangePct": 0.25
    },
    {
      "year": 2007,
      "gdpPPP": 306.929,
      "perCapitaPPP": 29931.9,
      "perCapitaPPPChangePct": 8.02,
      "popChangePct": 0.29
    },
    {
      "year": 2008,
      "gdpPPP": 321.014,
      "perCapitaPPP": 31035.6,
      "perCapitaPPPChangePct": 3.69,
      "popChangePct": 0.87
    },
    {
      "year": 2009,
      "gdpPPP": 307.496,
      "perCapitaPPP": 29493.8,
      "perCapitaPPPChangePct": -4.97,
      "popChangePct": 0.8
    },
    {
      "year": 2010,
      "gdpPPP": 319.682,
      "perCapitaPPP": 30556.2,
      "perCapitaPPPChangePct": 3.6,
      "popChangePct": 0.35
    },
    {
      "year": 2011,
      "gdpPPP": 332.06,
      "perCapitaPPP": 31664.8,
      "perCapitaPPPChangePct": 3.63,
      "popChangePct": 0.24
    },
    {
      "year": 2012,
      "gdpPPP": 335.636,
      "perCapitaPPP": 31948.8,
      "perCapitaPPPChangePct": 0.9,
      "popChangePct": 0.17
    },
    {
      "year": 2013,
      "gdpPPP": 341.206,
      "perCapitaPPP": 32446.0,
      "perCapitaPPPChangePct": 1.56,
      "popChangePct": 0.1
    },
    {
      "year": 2014,
      "gdpPPP": 354.943,
      "perCapitaPPP": 33764.2,
      "perCapitaPPPChangePct": 4.06,
      "popChangePct": -0.04
    },
    {
      "year": 2015,
      "gdpPPP": 376.002,
      "perCapitaPPP": 35679.6,
      "perCapitaPPPChangePct": 5.67,
      "popChangePct": 0.25
    },
    {
      "year": 2016,
      "gdpPPP": 389.371,
      "perCapitaPPP": 36806.6,
      "perCapitaPPPChangePct": 3.16,
      "popChangePct": 0.39
    },
    {
      "year": 2017,
      "gdpPPP": 416.849,
      "perCapitaPPP": 39288.1,
      "perCapitaPPPChangePct": 6.74,
      "popChangePct": 0.29
    },
    {
      "year": 2018,
      "gdpPPP": 442.611,
      "perCapitaPPP": 41560.5,
      "perCapitaPPPChangePct": 5.78,
      "popChangePct": 0.38
    },
    {
      "year": 2019,
      "gdpPPP": 486.787,
      "perCapitaPPP": 45519.9,
      "perCapitaPPPChangePct": 9.53,
      "popChangePct": 0.41
    },
    {
      "year": 2020,
      "gdpPPP": 479.686,
      "perCapitaPPP": 44823.1,
      "perCapitaPPPChangePct": -1.53,
      "popChangePct": 0.07
    },
    {
      "year": 2021,
      "gdpPPP": 525.243,
      "perCapitaPPP": 49943.7,
      "perCapitaPPPChangePct": 11.42,
      "popChangePct": -1.73
    },
    {
      "year": 2022,
      "gdpPPP": 578.619,
      "perCapitaPPP": 53439.6,
      "perCapitaPPPChangePct": 7.0,
      "popChangePct": 2.96
    },
    {
      "year": 2023,
      "gdpPPP": 600.314,
      "perCapitaPPP": 55325.3,
      "perCapitaPPPChangePct": 3.53,
      "popChangePct": 0.21
    },
    {
      "year": 2024,
      "gdpPPP": 622.915,
      "perCapitaPPP": 56963.6,
      "perCapitaPPPChangePct": 2.96,
      "popChangePct": 0.77
    },
    {
      "year": 2025,
      "gdpPPP": 656.909,
      "perCapitaPPP": 60247.4,
      "perCapitaPPPChangePct": 5.76,
      "popChangePct": -0.28
    },
    {
      "year": 2026,
      "gdpPPP": 690.823,
      "perCapitaPPP": 63549.7,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": -0.3
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 721.63,
      "perCapitaPPP": 66589.1,
      "perCapitaPPPChangePct": 4.78,
      "popChangePct": -0.31
    },
    {
      "year": 2028,
      "gdpPPP": 748.808,
      "perCapitaPPP": 69319.8,
      "perCapitaPPPChangePct": 4.1,
      "popChangePct": -0.32
    },
    {
      "year": 2029,
      "gdpPPP": 776.524,
      "perCapitaPPP": 72100.5,
      "perCapitaPPPChangePct": 4.01,
      "popChangePct": -0.3
    },
    {
      "year": 2030,
      "gdpPPP": 805.086,
      "perCapitaPPP": 74975.9,
      "perCapitaPPPChangePct": 3.99,
      "popChangePct": -0.3
    },
    {
      "year": 2031,
      "gdpPPP": 834.44,
      "perCapitaPPP": 77941.9,
      "perCapitaPPPChangePct": 3.96,
      "popChangePct": -0.3
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function CzechRepublicCzechiaGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
