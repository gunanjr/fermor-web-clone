import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import { buildGDPMetadata } from '../_template/buildMetadata';
import type { CountryGDPData } from '../_template/country-types';

const DATA: CountryGDPData = {
  "name": "Sierra Leone",
  "slug": "sierra-leone",
  "iso3": "SLE",
  "region": "Africa",
  "rank2026": 161,
  "flagEmoji": "🇸🇱",
  "datePublished": "2026-07-06T23:25:40+05:30",
  "dateModified": "2026-07-06T23:25:40+05:30",
  "neighbors": [
    {
      "name": "Barbados",
      "slug": "barbados",
      "rank": 160
    },
    {
      "name": "Burundi",
      "slug": "burundi",
      "rank": 162
    }
  ],
  "history": [
    {
      "year": 1980,
      "gdp": 2.708,
      "growth": -0.6,
      "perCapita": 763.5,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdp": 2.903,
      "growth": 1.9,
      "perCapita": 798.8,
      "popChangePct": 2.45
    },
    {
      "year": 1982,
      "gdp": 3.264,
      "growth": 1.8,
      "perCapita": 879.7,
      "popChangePct": 2.09
    },
    {
      "year": 1983,
      "gdp": 2.838,
      "growth": -1.6,
      "perCapita": 747.2,
      "popChangePct": 2.35
    },
    {
      "year": 1984,
      "gdp": 3.283,
      "growth": 1.7,
      "perCapita": 859.6,
      "popChangePct": 0.58
    },
    {
      "year": 1985,
      "gdp": 2.794,
      "growth": -6.7,
      "perCapita": 717.2,
      "popChangePct": 1.99
    },
    {
      "year": 1986,
      "gdp": 2.092,
      "growth": 0.1,
      "perCapita": 525.4,
      "popChangePct": 2.23
    },
    {
      "year": 1987,
      "gdp": 1.823,
      "growth": 2.4,
      "perCapita": 447.9,
      "popChangePct": 2.18
    },
    {
      "year": 1988,
      "gdp": 2.988,
      "growth": 2.1,
      "perCapita": 718.9,
      "popChangePct": 2.16
    },
    {
      "year": 1989,
      "gdp": 2.745,
      "growth": 5,
      "perCapita": 645.1,
      "popChangePct": 2.33
    },
    {
      "year": 1990,
      "gdp": 1.509,
      "growth": 1.6,
      "perCapita": 349.4,
      "popChangePct": 1.55
    },
    {
      "year": 1991,
      "gdp": 1.812,
      "growth": -8,
      "perCapita": 416.7,
      "popChangePct": 0.67
    },
    {
      "year": 1992,
      "gdp": 1.58,
      "growth": -9.6,
      "perCapita": 363.3,
      "popChangePct": -0.02
    },
    {
      "year": 1993,
      "gdp": 1.786,
      "growth": 0.1,
      "perCapita": 412.6,
      "popChangePct": -0.44
    },
    {
      "year": 1994,
      "gdp": 2.118,
      "growth": 3.5,
      "perCapita": 491.5,
      "popChangePct": -0.44
    },
    {
      "year": 1995,
      "gdp": 2.026,
      "growth": -10,
      "perCapita": 470.8,
      "popChangePct": -0.14
    },
    {
      "year": 1996,
      "gdp": 2.188,
      "growth": -24.8,
      "perCapita": 507.3,
      "popChangePct": 0.21
    },
    {
      "year": 1997,
      "gdp": 1.974,
      "growth": -17.6,
      "perCapita": 455.4,
      "popChangePct": 0.51
    },
    {
      "year": 1998,
      "gdp": 1.562,
      "growth": -0.8,
      "perCapita": 356.5,
      "popChangePct": 1.06
    },
    {
      "year": 1999,
      "gdp": 1.555,
      "growth": -8.1,
      "perCapita": 348.5,
      "popChangePct": 1.85
    },
    {
      "year": 2000,
      "gdp": 1.498,
      "growth": 3.8,
      "perCapita": 326.8,
      "popChangePct": 2.76
    },
    {
      "year": 2001,
      "gdp": 1.726,
      "growth": 18.2,
      "perCapita": 363.0,
      "popChangePct": 3.69
    },
    {
      "year": 2002,
      "gdp": 1.99,
      "growth": 26.4,
      "perCapita": 400.2,
      "popChangePct": 4.56
    },
    {
      "year": 2003,
      "gdp": 2.218,
      "growth": 10.3,
      "perCapita": 428.4,
      "popChangePct": 4.16
    },
    {
      "year": 2004,
      "gdp": 2.339,
      "growth": 7.8,
      "perCapita": 436.7,
      "popChangePct": 3.44
    },
    {
      "year": 2005,
      "gdp": 2.738,
      "growth": 6.7,
      "perCapita": 497.6,
      "popChangePct": 2.73
    },
    {
      "year": 2006,
      "gdp": 3.144,
      "growth": 4.6,
      "perCapita": 558.9,
      "popChangePct": 2.22
    },
    {
      "year": 2007,
      "gdp": 3.451,
      "growth": 3.7,
      "perCapita": 600.2,
      "popChangePct": 2.22
    },
    {
      "year": 2008,
      "gdp": 3.926,
      "growth": 3.8,
      "perCapita": 666.0,
      "popChangePct": 2.54
    },
    {
      "year": 2009,
      "gdp": 3.795,
      "growth": 1.3,
      "perCapita": 626.7,
      "popChangePct": 2.73
    },
    {
      "year": 2010,
      "gdp": 4.174,
      "growth": 10.1,
      "perCapita": 670.8,
      "popChangePct": 2.76
    },
    {
      "year": 2011,
      "gdp": 4.799,
      "growth": 7.1,
      "perCapita": 751.3,
      "popChangePct": 2.64
    },
    {
      "year": 2012,
      "gdp": 5.746,
      "growth": 6.7,
      "perCapita": 877.1,
      "popChangePct": 2.57
    },
    {
      "year": 2013,
      "gdp": 6.736,
      "growth": 9.4,
      "perCapita": 1003.2,
      "popChangePct": 2.49
    },
    {
      "year": 2014,
      "gdp": 6.521,
      "growth": -0.6,
      "perCapita": 948.3,
      "popChangePct": 2.41
    },
    {
      "year": 2015,
      "gdp": 6.75,
      "growth": -3.1,
      "perCapita": 959.2,
      "popChangePct": 2.36
    },
    {
      "year": 2016,
      "gdp": 6.038,
      "growth": 4.7,
      "perCapita": 838.0,
      "popChangePct": 2.37
    },
    {
      "year": 2017,
      "gdp": 5.823,
      "growth": 3.9,
      "perCapita": 789.1,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdp": 6.39,
      "growth": 3.4,
      "perCapita": 845.9,
      "popChangePct": 2.39
    },
    {
      "year": 2019,
      "gdp": 6.519,
      "growth": 5.5,
      "perCapita": 843.1,
      "popChangePct": 2.34
    },
    {
      "year": 2020,
      "gdp": 6.682,
      "growth": -1.3,
      "perCapita": 844.5,
      "popChangePct": 2.34
    },
    {
      "year": 2021,
      "gdp": 7.166,
      "growth": 5.9,
      "perCapita": 885.3,
      "popChangePct": 2.3
    },
    {
      "year": 2022,
      "gdp": 7.121,
      "growth": 5.3,
      "perCapita": 860.4,
      "popChangePct": 2.25
    },
    {
      "year": 2023,
      "gdp": 6.401,
      "growth": 5.7,
      "perCapita": 756.5,
      "popChangePct": 2.22
    },
    {
      "year": 2024,
      "gdp": 6.97,
      "growth": 4.3,
      "perCapita": 806.5,
      "popChangePct": 2.14
    },
    {
      "year": 2025,
      "gdp": 7.71,
      "growth": 4.4,
      "perCapita": 874.1,
      "popChangePct": 2.06
    },
    {
      "year": 2026,
      "gdp": 8.27,
      "growth": 4.5,
      "perCapita": 918.7,
      "popChangePct": 2.06
    }
  ],
  "projections": [
    {
      "year": 2027,
      "gdp": 8.651,
      "growth": 4.7,
      "perCapita": 941.6,
      "popChangePct": 2.06
    },
    {
      "year": 2028,
      "gdp": 9.04,
      "growth": 4.6,
      "perCapita": 964.1,
      "popChangePct": 2.07
    },
    {
      "year": 2029,
      "gdp": 9.486,
      "growth": 4.6,
      "perCapita": 991.2,
      "popChangePct": 2.06
    },
    {
      "year": 2030,
      "gdp": 9.955,
      "growth": 4.6,
      "perCapita": 1019.2,
      "popChangePct": 2.06
    },
    {
      "year": 2031,
      "gdp": 10.423,
      "growth": 4.5,
      "perCapita": 1045.6,
      "popChangePct": 2.06
    }
  ],
  "pppHistory": [
    {
      "year": 1980,
      "gdpPPP": 4.804,
      "perCapitaPPP": 1354.4,
      "perCapitaPPPChangePct": null,
      "popChangePct": null
    },
    {
      "year": 1981,
      "gdpPPP": 5.357,
      "perCapitaPPP": 1474.2,
      "perCapitaPPPChangePct": 8.85,
      "popChangePct": 2.45
    },
    {
      "year": 1982,
      "gdpPPP": 5.79,
      "perCapitaPPP": 1560.4,
      "perCapitaPPPChangePct": 5.85,
      "popChangePct": 2.09
    },
    {
      "year": 1983,
      "gdpPPP": 5.922,
      "perCapitaPPP": 1559.4,
      "perCapitaPPPChangePct": -0.07,
      "popChangePct": 2.35
    },
    {
      "year": 1984,
      "gdpPPP": 6.24,
      "perCapitaPPP": 1633.8,
      "perCapitaPPPChangePct": 4.77,
      "popChangePct": 0.58
    },
    {
      "year": 1985,
      "gdpPPP": 6.003,
      "perCapitaPPP": 1541.1,
      "perCapitaPPPChangePct": -5.67,
      "popChangePct": 1.99
    },
    {
      "year": 1986,
      "gdpPPP": 6.132,
      "perCapitaPPP": 1539.8,
      "perCapitaPPPChangePct": -0.08,
      "popChangePct": 2.23
    },
    {
      "year": 1987,
      "gdpPPP": 6.434,
      "perCapitaPPP": 1581.0,
      "perCapitaPPPChangePct": 2.68,
      "popChangePct": 2.18
    },
    {
      "year": 1988,
      "gdpPPP": 6.798,
      "perCapitaPPP": 1635.4,
      "perCapitaPPPChangePct": 3.44,
      "popChangePct": 2.16
    },
    {
      "year": 1989,
      "gdpPPP": 7.414,
      "perCapitaPPP": 1742.7,
      "perCapitaPPPChangePct": 6.56,
      "popChangePct": 2.33
    },
    {
      "year": 1990,
      "gdpPPP": 7.815,
      "perCapitaPPP": 1809.2,
      "perCapitaPPPChangePct": 3.82,
      "popChangePct": 1.55
    },
    {
      "year": 1991,
      "gdpPPP": 7.434,
      "perCapitaPPP": 1709.5,
      "perCapitaPPPChangePct": -5.51,
      "popChangePct": 0.67
    },
    {
      "year": 1992,
      "gdpPPP": 6.87,
      "perCapitaPPP": 1580.1,
      "perCapitaPPPChangePct": -7.57,
      "popChangePct": -0.02
    },
    {
      "year": 1993,
      "gdpPPP": 7.037,
      "perCapitaPPP": 1625.5,
      "perCapitaPPPChangePct": 2.87,
      "popChangePct": -0.44
    },
    {
      "year": 1994,
      "gdpPPP": 7.438,
      "perCapitaPPP": 1725.9,
      "perCapitaPPPChangePct": 6.18,
      "popChangePct": -0.44
    },
    {
      "year": 1995,
      "gdpPPP": 6.833,
      "perCapitaPPP": 1587.6,
      "perCapitaPPPChangePct": -8.01,
      "popChangePct": -0.14
    },
    {
      "year": 1996,
      "gdpPPP": 5.233,
      "perCapitaPPP": 1213.5,
      "perCapitaPPPChangePct": -23.56,
      "popChangePct": 0.21
    },
    {
      "year": 1997,
      "gdpPPP": 4.387,
      "perCapitaPPP": 1011.9,
      "perCapitaPPPChangePct": -16.61,
      "popChangePct": 0.51
    },
    {
      "year": 1998,
      "gdpPPP": 4.399,
      "perCapitaPPP": 1004.0,
      "perCapitaPPPChangePct": -0.78,
      "popChangePct": 1.06
    },
    {
      "year": 1999,
      "gdpPPP": 4.099,
      "perCapitaPPP": 918.6,
      "perCapitaPPPChangePct": -8.51,
      "popChangePct": 1.85
    },
    {
      "year": 2000,
      "gdpPPP": 4.351,
      "perCapitaPPP": 949.2,
      "perCapitaPPPChangePct": 3.33,
      "popChangePct": 2.76
    },
    {
      "year": 2001,
      "gdpPPP": 5.258,
      "perCapitaPPP": 1106.0,
      "perCapitaPPPChangePct": 16.52,
      "popChangePct": 3.69
    },
    {
      "year": 2002,
      "gdpPPP": 6.751,
      "perCapitaPPP": 1357.9,
      "perCapitaPPPChangePct": 22.78,
      "popChangePct": 4.56
    },
    {
      "year": 2003,
      "gdpPPP": 7.593,
      "perCapitaPPP": 1466.5,
      "perCapitaPPPChangePct": 8.0,
      "popChangePct": 4.16
    },
    {
      "year": 2004,
      "gdpPPP": 8.406,
      "perCapitaPPP": 1569.6,
      "perCapitaPPPChangePct": 7.03,
      "popChangePct": 3.44
    },
    {
      "year": 2005,
      "gdpPPP": 9.253,
      "perCapitaPPP": 1681.8,
      "perCapitaPPPChangePct": 7.15,
      "popChangePct": 2.73
    },
    {
      "year": 2006,
      "gdpPPP": 9.976,
      "perCapitaPPP": 1773.7,
      "perCapitaPPPChangePct": 5.47,
      "popChangePct": 2.22
    },
    {
      "year": 2007,
      "gdpPPP": 10.629,
      "perCapitaPPP": 1848.7,
      "perCapitaPPPChangePct": 4.23,
      "popChangePct": 2.22
    },
    {
      "year": 2008,
      "gdpPPP": 11.25,
      "perCapitaPPP": 1908.5,
      "perCapitaPPPChangePct": 3.24,
      "popChangePct": 2.54
    },
    {
      "year": 2009,
      "gdpPPP": 11.468,
      "perCapitaPPP": 1893.8,
      "perCapitaPPPChangePct": -0.77,
      "popChangePct": 2.73
    },
    {
      "year": 2010,
      "gdpPPP": 12.777,
      "perCapitaPPP": 2053.3,
      "perCapitaPPPChangePct": 8.42,
      "popChangePct": 2.76
    },
    {
      "year": 2011,
      "gdpPPP": 13.968,
      "perCapitaPPP": 2186.8,
      "perCapitaPPPChangePct": 6.5,
      "popChangePct": 2.64
    },
    {
      "year": 2012,
      "gdpPPP": 15.188,
      "perCapitaPPP": 2318.3,
      "perCapitaPPPChangePct": 6.01,
      "popChangePct": 2.57
    },
    {
      "year": 2013,
      "gdpPPP": 16.903,
      "perCapitaPPP": 2517.5,
      "perCapitaPPPChangePct": 8.59,
      "popChangePct": 2.49
    },
    {
      "year": 2014,
      "gdpPPP": 17.09,
      "perCapitaPPP": 2485.3,
      "perCapitaPPPChangePct": -1.28,
      "popChangePct": 2.41
    },
    {
      "year": 2015,
      "gdpPPP": 16.717,
      "perCapitaPPP": 2375.3,
      "perCapitaPPPChangePct": -4.42,
      "popChangePct": 2.36
    },
    {
      "year": 2016,
      "gdpPPP": 17.665,
      "perCapitaPPP": 2451.6,
      "perCapitaPPPChangePct": 3.21,
      "popChangePct": 2.37
    },
    {
      "year": 2017,
      "gdpPPP": 18.69,
      "perCapitaPPP": 2532.7,
      "perCapitaPPPChangePct": 3.31,
      "popChangePct": 2.41
    },
    {
      "year": 2018,
      "gdpPPP": 19.948,
      "perCapitaPPP": 2640.5,
      "perCapitaPPPChangePct": 4.25,
      "popChangePct": 2.39
    },
    {
      "year": 2019,
      "gdpPPP": 20.908,
      "perCapitaPPP": 2704.1,
      "perCapitaPPPChangePct": 2.41,
      "popChangePct": 2.34
    },
    {
      "year": 2020,
      "gdpPPP": 21.516,
      "perCapitaPPP": 2719.2,
      "perCapitaPPPChangePct": 0.56,
      "popChangePct": 2.34
    },
    {
      "year": 2021,
      "gdpPPP": 23.065,
      "perCapitaPPP": 2849.4,
      "perCapitaPPPChangePct": 4.79,
      "popChangePct": 2.3
    },
    {
      "year": 2022,
      "gdpPPP": 26.018,
      "perCapitaPPP": 3143.5,
      "perCapitaPPPChangePct": 10.32,
      "popChangePct": 2.25
    },
    {
      "year": 2023,
      "gdpPPP": 28.521,
      "perCapitaPPP": 3371.1,
      "perCapitaPPPChangePct": 7.24,
      "popChangePct": 2.22
    },
    {
      "year": 2024,
      "gdpPPP": 30.484,
      "perCapitaPPP": 3527.4,
      "perCapitaPPPChangePct": 4.64,
      "popChangePct": 2.14
    },
    {
      "year": 2025,
      "gdpPPP": 32.721,
      "perCapitaPPP": 3709.8,
      "perCapitaPPPChangePct": 5.17,
      "popChangePct": 2.06
    },
    {
      "year": 2026,
      "gdpPPP": 35.19,
      "perCapitaPPP": 3909.2,
      "perCapitaPPPChangePct": 5.37,
      "popChangePct": 2.06
    }
  ],
  "pppProjections": [
    {
      "year": 2027,
      "gdpPPP": 37.646,
      "perCapitaPPP": 4097.6,
      "perCapitaPPPChangePct": 4.82,
      "popChangePct": 2.06
    },
    {
      "year": 2028,
      "gdpPPP": 40.04,
      "perCapitaPPP": 4270.2,
      "perCapitaPPPChangePct": 4.21,
      "popChangePct": 2.07
    },
    {
      "year": 2029,
      "gdpPPP": 42.608,
      "perCapitaPPP": 4452.3,
      "perCapitaPPPChangePct": 4.26,
      "popChangePct": 2.06
    },
    {
      "year": 2030,
      "gdpPPP": 45.379,
      "perCapitaPPP": 4646.2,
      "perCapitaPPPChangePct": 4.35,
      "popChangePct": 2.06
    },
    {
      "year": 2031,
      "gdpPPP": 48.261,
      "perCapitaPPP": 4841.5,
      "perCapitaPPPChangePct": 4.2,
      "popChangePct": 2.06
    }
  ]
};

export const metadata = buildGDPMetadata(DATA);

export default function SierraLeoneGDPPage() {
  return <CountryGDPPageTemplate data={DATA} />;
}
