/**
 * Real vector outlines for the black-panel "Fermor" wordmark, one <path> per letter, extracted
 * directly from Space Grotesk Bold (weight 700) -- not an SVG <text> element with textLength
 * stretching. This is what lets each letter get its own independent transform for the scroll
 * drop-in animation (Footer.tsx's blackWordRef/blackWordSeen), matching how Jeton's own
 * wordmark is built: their DOM has one <div class="glyph"> per letter, each wrapping its own
 * <svg><path>, each with its own translate3d -- confirmed by inspecting jeton.com's rendered
 * HTML directly rather than guessing at the technique from the visual result alone.
 *
 * Regenerating this file: the extraction script (opentype.js + wawoff2 to decompress the woff2
 * Google Fonts serves) is not checked into the repo -- it was a one-off scratch script. To
 * redo it: fetch the real static Bold instance from
 * https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700 (NOT the variable
 * SpaceGrotesk[wght].ttf on Google's fonts GitHub repo -- opentype.js can't interpolate a
 * variable font's weight axis, so parsing that file directly silently returns the default
 * instance, which is Light/300, not Bold/700), decompress the woff2 with wawoff2 (opentype.js
 * can't read woff2 directly either), then opentype.js `charToGlyph(ch).getPath(0, 0,
 * unitsPerEm).toPathData(2)` per character with a running x cursor advanced by each glyph's own
 * advanceWidth.
 *
 * unitsPerEm is 1000, so all coordinates below are in that same 1000-units-per-em space; the
 * consuming <svg viewBox> is sized directly in these units rather than an arbitrary pixel
 * fontSize, so "how big it renders" is purely the outer <svg>'s own width, same separation of
 * concerns textLength gave the old <text> version.
 */
export type FermorGlyph = { ch: string; d: string; x: number; advanceWidth: number };

export const FERMOR_GLYPH_UNITS_PER_EM = 1000;
export const FERMOR_GLYPH_TOTAL_ADVANCE = 3369;

export const FERMOR_GLYPHS: FermorGlyph[] = [
  {
    ch: 'F',
    x: 0,
    advanceWidth: 534,
    d: 'M198 0L66 0L66-700L506-700L506-580L198-580L198-411L482-411L482-291L198-291',
  },
  {
    ch: 'e',
    x: 534,
    advanceWidth: 577,
    d: 'M296 14Q222 14 165.50-17.50Q109-49 77.50-106.50Q46-164 46-242L46-254Q46-332 77-389.50Q108-447 164-478.50Q220-510 294-510Q367-510 421-477.50Q475-445 505-387.50Q535-330 535-254L535-211L174-211Q176-160 212-128Q248-96 300-96Q353-96 378-119Q403-142 416-170L519-116Q505-90 478.50-59.50Q452-29 408-7.50Q364 14 296 14M175-305L407-305Q403-348 372.50-374Q342-400 293-400Q242-400 212-374Q182-348 175-305',
  },
  {
    ch: 'r',
    x: 1111,
    advanceWidth: 396,
    d: 'M196 0L70 0L70-496L194-496L194-440L212-440Q223-470 248.50-484Q274-498 308-498L368-498L368-386L306-386Q258-386 227-360.50Q196-335 196-282',
  },
  {
    ch: 'm',
    x: 1507,
    advanceWidth: 854,
    d: 'M196 0L70 0L70-496L194-496L194-442L212-442Q225-467 255-485.50Q285-504 334-504Q387-504 419-483.50Q451-463 468-430L486-430Q503-462 534-483Q565-504 622-504Q668-504 705.50-484.50Q743-465 765.50-425.50Q788-386 788-326L788 0L662 0L662-317Q662-358 641-378.50Q620-399 582-399Q539-399 515.50-371.50Q492-344 492-293L492 0L366 0L366-317Q366-358 345-378.50Q324-399 286-399Q243-399 219.50-371.50Q196-344 196-293',
  },
  {
    ch: 'o',
    x: 2361,
    advanceWidth: 612,
    d: 'M306 14Q232 14 173-16Q114-46 80-103Q46-160 46-240L46-256Q46-336 80-393Q114-450 173-480Q232-510 306-510Q380-510 439-480Q498-450 532-393Q566-336 566-256L566-240Q566-160 532-103Q498-46 439-16Q380 14 306 14M306-98Q364-98 402-135.50Q440-173 440-243L440-253Q440-323 402.50-360.50Q365-398 306-398Q248-398 210-360.50Q172-323 172-253L172-243Q172-173 210-135.50Q248-98 306-98',
  },
  {
    ch: 'r',
    x: 2973,
    advanceWidth: 396,
    d: 'M196 0L70 0L70-496L194-496L194-440L212-440Q223-470 248.50-484Q274-498 308-498L368-498L368-386L306-386Q258-386 227-360.50Q196-335 196-282',
  },
];
