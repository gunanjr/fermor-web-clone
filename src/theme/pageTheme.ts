/**
 * Palette for individual pages: calculators, blogs and articles, mutual funds, tax and GDP.
 * The homepage, /blogs and /calculators are NOT on this palette and keep their own colours.
 *
 * Direction: black and white with neutral greys, and restrained greens taken from the portfolio
 * donut in the design reference. The greens below were sampled from that image:
 *   mint #5EDDA2, teal #3EA582, light #A6DBC4, mid #2D9970, deep #0B4A34.
 * The old bright greens (lime #C8F135, lime2 #95CC42, paleLime #EDFBBC, mint #75FB90 as a UI
 * colour) and every pale green-tinted surface are replaced with neutrals. Mint stays available for
 * chart series only.
 *
 * Calculator, blog, mutual fund and tax pages each carried their own local `C` colour object, so
 * this module is the source of truth and LEGACY_TO_PAGE is the mapping that moved those objects
 * (and inline hex values) over. scripts/branding/palette.test.ts fails if a legacy value comes
 * back into a scoped file.
 */
export const PAGE_THEME = {
  // text
  ink: '#101214',        // headings, body emphasis, primary buttons
  ink2: '#50565C',       // body copy
  ink3: '#7A8087',       // labels, tertiary text
  // surfaces
  white: '#FFFFFF',
  page: '#F6F7F8',       // page background (neutral, no green tint)
  surface: '#FFFFFF',
  surfaceAlt: '#F4F5F6', // informational boxes, table stripes
  surfaceSoft: '#FAFAFA',// tab strips, quiet bands
  border: '#E3E6E8',
  // greens
  deep: '#0B4A34',       // deepest accent
  green: '#2D9970',      // primary accent: chart interest series, progress, borders on emphasis
  greenText: '#1F7A58',  // green text on white (5.4:1)
  light: '#A6DBC4',      // accent text/value on a dark panel
  mint: '#5EDDA2',       // chart series only
  markGreen: '#75FB90',  // the logo mark and favicon: the homepage mint, on every surface
  focus: '#1F7A58',
} as const;

/** Old value (lower case) -> value on the individual-page palette. Semantic colours are not in this
    list on purpose: #166534 and #15803d (positive amounts), #B45309 (interest), the amber, the
    blues and the reds stay, and so does #2FAE64 where it is a returns/NAV data colour. */
export const LEGACY_TO_PAGE: Record<string, string> = {
  // dark green -> ink
  '#1a3530': '#101214',
  '#16201a': '#101214',
  // lime family -> palette greens
  '#c8f135': '#a6dbc4',
  '#c3e88d': '#a6dbc4',
  '#95cc42': '#2d9970',
  '#75fb90': '#a6dbc4',
  '#2e6b1e': '#1f7a58',
  '#2d6a1f': '#1f7a58',
  '#1e8a4e': '#1f7a58',
  // green tinted surfaces -> neutral surfaces
  '#edfbbc': '#f4f5f6',
  '#f0f7e8': '#f4f5f6',
  '#f5f9f2': '#f4f5f6',
  '#f0f4ee': '#f4f5f6',
  '#f0f4f0': '#f4f5f6',
  '#f1f4ee': '#f4f5f6',
  '#f6f8f3': '#f4f5f6',
  '#ebf3f1': '#f1f3f4',
  '#eaf9ef': '#f1f3f4',
  '#f0faf5': '#f1f3f4',
  '#fafdf8': '#fafafa',
  '#fafcfa': '#fafafa',
  '#f9fbf8': '#fafafa',
  '#f8faf8': '#f8f9f9',
  '#edf1ea': '#e3e6e8',
  '#f0f9f0': '#f4f5f6',
  '#d0d5ce': '#d3d7da',
  '#2fae64': '#2d9970',
  '#f1f8ec': '#f4f5f6',
  '#f4f8f5': '#f6f7f8',
  '#5e7264': '#80868c',
  '#8fa095': '#9aa0a6',
  '#cfe0d3': '#d3d7da',
  '#2b4033': '#3a3f44',
  '#1b2e20': '#1b1f23',
  // green tinted borders and greys -> neutral
  '#e2ebe0': '#e3e6e8',
  '#e1e7dc': '#e3e6e8',
  '#b8d9cf': '#c9ced2',
  '#b7c4ba': '#c4c9cd',
  '#5b6960': '#565c62',
  '#8b968e': '#80868c',
  '#5a5a52': '#50565c',
  '#8a8f86': '#7a8087',
};

/** Same idea for rgba(): the dark-green and lime channels used for shadows and overlays. */
export const LEGACY_RGBA_TO_PAGE: [RegExp, string][] = [
  [/rgba\(\s*26\s*,\s*53\s*,\s*48\s*,/g, 'rgba(16,18,20,'],
  [/rgba\(\s*200\s*,\s*241\s*,\s*53\s*,/g, 'rgba(166,219,196,'],
  [/rgba\(\s*149\s*,\s*204\s*,\s*66\s*,/g, 'rgba(45,153,112,'],
  [/rgba\(\s*117\s*,\s*251\s*,\s*144\s*,/g, 'rgba(166,219,196,'],
];

/** Values that must not appear in a scoped file any more (used by the audit test). */
export const LEGACY_FORBIDDEN = Object.keys(LEGACY_TO_PAGE);
