import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Liechtenstein",
  "slug": "liechtenstein",
  "iso3": "LIE",
  "region": "Europe",
  "rank2026": 158,
  "flagEmoji": "🇱🇮",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Montenegro",
      "slug": "montenegro",
      "rank": 155
    },
    {
      "name": "Barbados",
      "slug": "barbados",
      "rank": 160
    }
  ],
  "history": [
    {
      "year": 2000,
      "gdp": 2.719,
      "growth": null,
      "perCapita": 82744.0,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdp": 2.725,
      "growth": -1,
      "perCapita": 81267.9,
      "popChangePct": 3.03
    },
    {
      "year": 2002,
      "gdp": 2.927,
      "growth": -0.3,
      "perCapita": 86422.3,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdp": 3.335,
      "growth": -2.7,
      "perCapita": 97243.5,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdp": 3.759,
      "growth": 3.6,
      "perCapita": 108640.1,
      "popChangePct": 2.94
    },
    {
      "year": 2005,
      "gdp": 3.989,
      "growth": 5.3,
      "perCapita": 114293.0,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdp": 4.366,
      "growth": 7.9,
      "perCapita": 124150.1,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdp": 5.038,
      "growth": 7.8,
      "perCapita": 142492.5,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdp": 5.551,
      "growth": -1.9,
      "perCapita": 155978.3,
      "popChangePct": 2.86
    },
    {
      "year": 2009,
      "gdp": 4.891,
      "growth": -11.9,
      "perCapita": 136253.2,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdp": 5.536,
      "growth": 8,
      "perCapita": 153152.2,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdp": 6.238,
      "growth": -4.2,
      "perCapita": 171011.8,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdp": 5.909,
      "growth": -0.2,
      "perCapita": 160395.5,
      "popChangePct": 2.78
    },
    {
      "year": 2013,
      "gdp": 6.273,
      "growth": 5,
      "perCapita": 168956.7,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdp": 6.533,
      "growth": 3.6,
      "perCapita": 174842.1,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdp": 6.154,
      "growth": 0.3,
      "perCapita": 163585.1,
      "popChangePct": 2.7
    },
    {
      "year": 2016,
      "gdp": 6.118,
      "growth": 2.4,
      "perCapita": 161806.8,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdp": 6.375,
      "growth": 4.5,
      "perCapita": 167258.5,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdp": 6.693,
      "growth": 3.5,
      "perCapita": 174385.4,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdp": 6.437,
      "growth": -2.2,
      "perCapita": 166126.2,
      "popChangePct": 2.63
    },
    {
      "year": 2020,
      "gdp": 6.405,
      "growth": -5.3,
      "perCapita": 163997.6,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdp": 7.913,
      "growth": 18,
      "perCapita": 201297.5,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdp": 7.427,
      "growth": -4.8,
      "perCapita": 187182.5,
      "popChangePct": 2.56
    },
    {
      "year": 2023,
      "gdp": 8.239,
      "growth": 3.4,
      "perCapita": 205907.3,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdp": 8.465,
      "growth": -0.3,
      "perCapita": 207034.0,
      "popChangePct": 2.5
    },
    {
      "year": 2025,
      "gdp": 8.991,
      "growth": 0,
      "perCapita": 217927.9,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdp": 9.442,
      "growth": -0.4,
      "perCapita": 226809.1,
      "popChangePct": 2.44
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 9.691,
      "growth": 0.4,
      "perCapita": 230699.8,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdp": 10.041,
      "growth": 1.2,
      "perCapita": 236883.9,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdp": 10.45,
      "growth": 1.5,
      "perCapita": 244327.2,
      "popChangePct": 2.38
    },
    {
      "year": 2030,
      "gdp": 10.876,
      "growth": 1.5,
      "perCapita": 252007.2,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdp": 11.319,
      "growth": 1.5,
      "perCapita": 259928.9,
      "popChangePct": 2.33
    }
  ],
  "pppHistory": [
    {
      "year": 2000,
      "gdpPPP": 3.027,
      "perCapitaPPP": 92095.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 2001,
      "gdpPPP": 3.065,
      "perCapitaPPP": 91423.6,
      "perCapitaPPPChangePct": -0.73,
      "popChangePct": 3.03
    },
    {
      "year": 2002,
      "gdpPPP": 3.102,
      "perCapitaPPP": 91603.6,
      "perCapitaPPPChangePct": 0.2,
      "popChangePct": 0.0
    },
    {
      "year": 2003,
      "gdpPPP": 3.078,
      "perCapitaPPP": 89757.0,
      "perCapitaPPPChangePct": -2.02,
      "popChangePct": 0.0
    },
    {
      "year": 2004,
      "gdpPPP": 3.276,
      "perCapitaPPP": 94676.0,
      "perCapitaPPPChangePct": 5.48,
      "popChangePct": 2.94
    },
    {
      "year": 2005,
      "gdpPPP": 3.557,
      "perCapitaPPP": 101895.8,
      "perCapitaPPPChangePct": 7.63,
      "popChangePct": 0.0
    },
    {
      "year": 2006,
      "gdpPPP": 3.956,
      "perCapitaPPP": 112498.9,
      "perCapitaPPPChangePct": 10.41,
      "popChangePct": 0.0
    },
    {
      "year": 2007,
      "gdpPPP": 4.381,
      "perCapitaPPP": 123901.2,
      "perCapitaPPPChangePct": 10.14,
      "popChangePct": 0.0
    },
    {
      "year": 2008,
      "gdpPPP": 4.38,
      "perCapitaPPP": 123069.8,
      "perCapitaPPPChangePct": -0.67,
      "popChangePct": 2.86
    },
    {
      "year": 2009,
      "gdpPPP": 3.882,
      "perCapitaPPP": 108160.1,
      "perCapitaPPPChangePct": -12.11,
      "popChangePct": 0.0
    },
    {
      "year": 2010,
      "gdpPPP": 4.244,
      "perCapitaPPP": 117407.3,
      "perCapitaPPPChangePct": 8.55,
      "popChangePct": 0.0
    },
    {
      "year": 2011,
      "gdpPPP": 4.151,
      "perCapitaPPP": 113813.8,
      "perCapitaPPPChangePct": -3.06,
      "popChangePct": 0.0
    },
    {
      "year": 2012,
      "gdpPPP": 4.221,
      "perCapitaPPP": 114582.3,
      "perCapitaPPPChangePct": 0.68,
      "popChangePct": 2.78
    },
    {
      "year": 2013,
      "gdpPPP": 4.507,
      "perCapitaPPP": 121377.6,
      "perCapitaPPPChangePct": 5.93,
      "popChangePct": 0.0
    },
    {
      "year": 2014,
      "gdpPPP": 4.748,
      "perCapitaPPP": 127080.2,
      "perCapitaPPPChangePct": 4.7,
      "popChangePct": 0.0
    },
    {
      "year": 2015,
      "gdpPPP": 4.807,
      "perCapitaPPP": 127775.2,
      "perCapitaPPPChangePct": 0.55,
      "popChangePct": 2.7
    },
    {
      "year": 2016,
      "gdpPPP": 4.97,
      "perCapitaPPP": 131439.2,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": 0.0
    },
    {
      "year": 2017,
      "gdpPPP": 5.285,
      "perCapitaPPP": 138666.7,
      "perCapitaPPPChangePct": 5.5,
      "popChangePct": 0.0
    },
    {
      "year": 2018,
      "gdpPPP": 5.552,
      "perCapitaPPP": 144656.0,
      "perCapitaPPPChangePct": 4.32,
      "popChangePct": 0.0
    },
    {
      "year": 2019,
      "gdpPPP": 5.642,
      "perCapitaPPP": 145598.7,
      "perCapitaPPPChangePct": 0.65,
      "popChangePct": 2.63
    },
    {
      "year": 2020,
      "gdpPPP": 5.444,
      "perCapitaPPP": 139387.0,
      "perCapitaPPPChangePct": -4.27,
      "popChangePct": 0.0
    },
    {
      "year": 2021,
      "gdpPPP": 6.91,
      "perCapitaPPP": 175785.4,
      "perCapitaPPPChangePct": 26.11,
      "popChangePct": 0.0
    },
    {
      "year": 2022,
      "gdpPPP": 7.044,
      "perCapitaPPP": 177521.4,
      "perCapitaPPPChangePct": 0.99,
      "popChangePct": 2.56
    },
    {
      "year": 2023,
      "gdpPPP": 7.555,
      "perCapitaPPP": 188791.7,
      "perCapitaPPPChangePct": 6.35,
      "popChangePct": 0.0
    },
    {
      "year": 2024,
      "gdpPPP": 7.72,
      "perCapitaPPP": 188805.9,
      "perCapitaPPPChangePct": 0.01,
      "popChangePct": 2.5
    },
    {
      "year": 2025,
      "gdpPPP": 7.939,
      "perCapitaPPP": 192419.9,
      "perCapitaPPPChangePct": 1.91,
      "popChangePct": 0.0
    },
    {
      "year": 2026,
      "gdpPPP": 8.133,
      "perCapitaPPP": 195372.1,
      "perCapitaPPPChangePct": 1.53,
      "popChangePct": 2.44
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 8.345,
      "perCapitaPPP": 198662.4,
      "perCapitaPPPChangePct": 1.68,
      "popChangePct": 0.0
    },
    {
      "year": 2028,
      "gdpPPP": 8.584,
      "perCapitaPPP": 202512.9,
      "perCapitaPPPChangePct": 1.94,
      "popChangePct": 0.0
    },
    {
      "year": 2029,
      "gdpPPP": 8.868,
      "perCapitaPPP": 207328.6,
      "perCapitaPPPChangePct": 2.38,
      "popChangePct": 2.38
    },
    {
      "year": 2030,
      "gdpPPP": 9.166,
      "perCapitaPPP": 212382.7,
      "perCapitaPPPChangePct": 2.44,
      "popChangePct": 0.0
    },
    {
      "year": 2031,
      "gdpPPP": 9.471,
      "perCapitaPPP": 217491.2,
      "perCapitaPPPChangePct": 2.41,
      "popChangePct": 2.33
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function LiechtensteinGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
