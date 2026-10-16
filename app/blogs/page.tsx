import type { Metadata } from 'next';
import ResourcesPageClient from './ResourcesPageClient';
import { getAllResourceItems } from './blogCategories';
import { assertBlogListingComplete } from './listingCheck';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Tax guides, EPF and GST explainers, government scheme walkthroughs, and market analysis for Indian investors, all free to read.',
  alternates: { canonical: 'https://fermor.in/blogs' },
  openGraph: {
    title: 'Blogs - Fermor',
    description: 'Tax guides, EPF and GST explainers, and market analysis for Indian investors.',
    type: 'website',
  },
};

export default function BlogsIndexPage() {
  // Fails the build if an article folder is missing from articles.ts, or an article is not
  // findable by the search box (see listingCheck.ts).
  assertBlogListingComplete();

  // All 31 migrated articles, tagged with their real category - this is the one dataset the
  // "All types" filter and its three category options run over (see blogCategories.ts).
  const resources = getAllResourceItems();

  return <ResourcesPageClient resources={resources} />;
}
