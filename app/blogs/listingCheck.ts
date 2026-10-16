import fs from "fs";
import path from "path";
import { ARTICLES } from "./articles";
import { getAllResourceItems } from "./blogCategories";
import { searchScore } from "@/utils/searchMatch";

/**
 * Build-time guard for the /blogs listing and its search box, called from app/blogs/page.tsx.
 * The listing is the hand-written ARTICLES array, while articles themselves are folders, so the
 * two can drift. Any drift fails `next build` (locally, in CI and on Vercel) instead of shipping
 * an article that is invisible on /blogs and in its search.
 *
 * Problems reported:
 *  1. app/blogs/<slug>/page.tsx exists but has no card in articles.ts. Translated siblings
 *     (`<slug>-hi`, `<slug>-bn`, ...) of a listed article are skipped on purpose.
 *  2. A card in articles.ts has no folder, so it links to a 404.
 *  3. An article is not found, or not the top result, when searching its own title.
 *  4. An article is not found when searching its slug words.
 */
export function findBlogListingProblems(folders: string[]): string[] {
  const problems: string[] = [];
  const slugs = new Set(ARTICLES.map((article) => article.slug));
  const isTranslation = (folder: string) => {
    const match = folder.match(/^(.+)-([a-z]{2})$/);
    return Boolean(match && slugs.has(match[1]));
  };

  for (const folder of folders) {
    if (!slugs.has(folder) && !isTranslation(folder)) {
      problems.push(`app/blogs/${folder}/ has no card in app/blogs/articles.ts, so it is missing from /blogs and its search.`);
    }
  }
  for (const slug of slugs) {
    if (!folders.includes(slug)) {
      problems.push(`articles.ts card "${slug}" has no app/blogs/${slug}/page.tsx, so it links to a 404.`);
    }
  }

  const items = getAllResourceItems();
  const results = (query: string) =>
    items
      .map((item) => ({
        id: item.id,
        score: searchScore(query, item.title, [item.description, item.type, item.searchText ?? ""].join(" ")),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

  for (const item of items) {
    const byTitle = results(item.title);
    const own = byTitle.find(({ id }) => id === item.id);
    if (!own) {
      problems.push(`"${item.id}" is not found when searching its own title.`);
    } else if (byTitle[0].score > own.score) {
      problems.push(`"${item.id}" is not the top result for its own title (beaten by "${byTitle[0].id}").`);
    }
    if (!results(item.id.replace(/-/g, " ")).some(({ id }) => id === item.id)) {
      problems.push(`"${item.id}" is not found when searching its slug words.`);
    }
  }
  return problems;
}

/** Article folders on disk: every app/blogs/<name>/ that has a page.tsx. Null if unreadable. */
export function readBlogFolders(): string[] | null {
  const blogsDir = path.join(process.cwd(), "app", "blogs");
  try {
    return fs
      .readdirSync(blogsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(blogsDir, entry.name, "page.tsx")))
      .map((entry) => entry.name);
  } catch {
    return null;
  }
}

/** Throws with every problem listed, so the build log says exactly what to fix. */
export function assertBlogListingComplete(): void {
  const folders = readBlogFolders();
  // Source folders are only guaranteed at build time. If they cannot be read (a serverless
  // runtime without the source tree), skip rather than take the live page down.
  if (!folders) return;
  const problems = findBlogListingProblems(folders);
  if (problems.length > 0) {
    throw new Error(`Blogs listing check failed (${problems.length}):\n- ${problems.join("\n- ")}`);
  }
}
