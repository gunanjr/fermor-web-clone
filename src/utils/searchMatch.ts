/**
 * Forgiving, ranked text search, shared by the Blogs and Calculators search boxes. Case,
 * accents, punctuation and extra spaces are ignored, and "Section54" and "section 54" behave the same. Small typos are tolerated
 * in plain words (one edit for 5 or 6 letters, two for longer ones), but never in words that
 * contain a digit, since "54" and "80" or "194j" and "194i" are different sections, not typos.
 *
 * Articles are scored, not just filtered: a match in the title outranks a match in the body, and
 * the whole query appearing in the title outranks everything. The search runs over whatever
 * articles it is given, so new articles need no change here.
 */

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Levenshtein distance, bailing out as soon as it must exceed `max`. */
function withinEdits(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      row.push(value);
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > max) return false;
    prev = row;
  }
  return prev[b.length] <= max;
}

function fuzzyMatchesToken(word: string, tokens: string[]): boolean {
  if (word.length < 5 || /\d/.test(word)) return false;
  const max = word.length >= 7 ? 2 : 1;
  return tokens.some(
    (token) =>
      !/\d/.test(token) &&
      (withinEdits(word, token, max) ||
        // A typo inside the part typed so far, e.g. "premim" against "premium".
        (token.length > word.length && withinEdits(word, token.slice(0, word.length), max))),
  );
}

type Field = { text: string; tokens: string[]; compact: string };

function prepare(text: string): Field {
  const normalized = normalize(text);
  return {
    text: normalized,
    tokens: [...new Set(normalized.split(" ").filter(Boolean))],
    compact: normalized.replace(/ /g, ""),
  };
}

/** How well one word matches a field: 0 when it does not match at all. */
function wordScore(word: string, field: Field): number {
  if (field.tokens.includes(word)) return 4;
  if (field.tokens.some((token) => token.startsWith(word))) return 3;
  if (field.text.includes(word) || field.compact.includes(word)) return 2;
  if (fuzzyMatchesToken(word, field.tokens)) return 1;
  return 0;
}

/**
 * Relevance of an article for `query`, or 0 when it does not match. An empty query scores 1 for
 * everything, so the caller's original order (newest first) is kept.
 */
export function searchScore(query: string, title: string, body: string): number {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 1;

  const words = normalizedQuery.split(" ");
  const compactQuery = normalizedQuery.replace(/ /g, "");
  const titleField = prepare(title);
  const bodyField = prepare(body);

  // The whole query in the title, ignoring spaces ("section54" inside "Section 54F of ...").
  let score = 0;
  if (titleField.compact.startsWith(compactQuery)) score += 200;
  else if (titleField.compact.includes(compactQuery)) score += 150;
  else if (bodyField.compact.includes(compactQuery)) score += 40;
  const phraseMatched = score > 0;

  // Otherwise every word must match somewhere, title or body.
  let allWordsMatch = true;
  for (const word of words) {
    const inTitle = wordScore(word, titleField);
    const inBody = wordScore(word, bodyField);
    if (inTitle === 0 && inBody === 0) allWordsMatch = false;
    score += inTitle * 10 + inBody;
  }

  return phraseMatched || allWordsMatch ? score : 0;
}
