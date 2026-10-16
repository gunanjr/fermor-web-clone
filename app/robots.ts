import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly allow Google's own crawlers, including the two AdSense-specific ones.
      // Nothing here disallows anything (the wildcard rule above already permits everyone),
      // but Google's own AdSense docs specifically check for an explicit Mediapartners-Google
      // allow rather than relying on the absence of a disallow, since AdSense cannot serve ads
      // on a site it cannot crawl to determine page content/relevance for ad matching.
      {
        userAgent: [
          'Googlebot',           // Google Search
          'Googlebot-Image',     // Google Images
          'Mediapartners-Google', // AdSense content crawler - reads pages to match relevant ads
          'AdsBot-Google',        // Google Ads landing page quality crawler
          'AdsBot-Google-Mobile', // Same, for mobile landing pages
        ],
        allow: '/',
      },
      // Explicitly allow major AI crawler bots for GEO (Generative Engine Optimization).
      // These bots index content for ChatGPT, Gemini, Perplexity, Claude, etc.
      // Welcoming them improves citation chances in AI-generated answers.
      {
        userAgent: [
          'GPTBot',          // OpenAI / ChatGPT
          'Google-Extended', // Google Gemini + Search Generative Experience
          'ClaudeBot',       // Anthropic Claude
          'anthropic-ai',    // Anthropic crawler
          'PerplexityBot',   // Perplexity AI
          'Applebot',        // Apple Siri / Spotlight
          'Bytespider',      // ByteDance / TikTok AI
          'CCBot',           // Common Crawl (used for LLM training datasets)
          'OAI-SearchBot',   // OpenAI search
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://fermor.in/sitemap.xml',
  };
}
