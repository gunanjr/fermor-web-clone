/**
 * Chart colours for calculators, taken from the Fermor app so a donut on the web reads like the
 * donut on the app's Home and Portfolio screens.
 *
 * Source: fermor-app-main/src/theme/tokens.ts, `chartPalette` ("restrained greens from bright mint
 * to deep forest ... use in order for categorical series; never introduce a non-green series
 * colour"). The values below are copied verbatim, not sampled from an image. The net-worth card's
 * own surface in the app is `palette.light.primary` (#14B26B), with `accent` #0E8F58 for text on
 * white. Those are surfaces and text, not series colours, so they are listed for reference and are
 * not used by the charts.
 */
export const CHART_PALETTE = [
  '#58E0A5', // mint
  '#3FA882',
  '#A6DDC4',
  '#2B9A6E',
  '#0C4A33', // deep forest
  '#7FCFAA',
  '#1F7A55',
  '#C4EBD8',
  '#38C78C',
  '#0A3A28',
] as const;

/** The app's net-worth card surface and its text-safe companion (reference only). */
export const APP_GREEN = { primary: '#14B26B', accent: '#0E8F58' } as const;

/**
 * The two-series pair used by every principal/interest, invested/returns, in-hand/deductions donut
 * and stacked bar. Both come from CHART_PALETTE (deep forest, then the second step of the ladder).
 * Contrast between the two is 3.5:1 and the lighter one is 2.9:1 against white, so adjacent
 * segments stay distinguishable (WCAG 1.4.11) without the pale mint that nearly vanishes on white.
 */
export const CHART_PAIR = {
  primary: CHART_PALETTE[4],   // #0C4A33
  secondary: CHART_PALETTE[1], // #3FA882
} as const;

/**
 * Colour for the i-th category of a multi-segment donut: the pair first (deep forest, mid green),
 * then the rest of the app's ladder alternating dark and light so neighbours differ in lightness
 * as well as hue.
 */
const SERIES_ORDER = [4, 1, 2, 6, 5, 9, 3, 7, 0, 8] as const;
export function seriesColor(index: number): string {
  return CHART_PALETTE[SERIES_ORDER[index % SERIES_ORDER.length]];
}
