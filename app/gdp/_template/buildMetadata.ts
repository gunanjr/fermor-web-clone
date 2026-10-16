import type { Metadata } from 'next';
import type { CountryGDPData } from './country-types';

function formatGDP(billions: number): string {
  if (billions >= 1000) return `$${(billions / 1000).toFixed(2)} trillion`;
  return `$${billions.toFixed(2)} billion`;
}

export function buildGDPMetadata(data: CountryGDPData): Metadata {
  const latest = data.history[data.history.length - 1];
  const gdpStr = formatGDP(latest.gdp);
  const growthStr = latest.growth !== null ? `${latest.growth}%` : null;
  const perCapStr = latest.perCapita !== null ? `$${Math.round(latest.perCapita).toLocaleString('en-US')}` : null;

  const title = `${data.name} GDP (${latest.year}): History, Growth Rate & Projections`;
  const description = `${data.name} GDP is ${gdpStr} in ${latest.year} (IMF)${growthStr ? `, growing at ${growthStr}` : ''}.${perCapStr ? ` GDP per capita ${perCapStr}.` : ''} Full history from ${data.history[0]?.year}, IMF projections to ${data.projections[data.projections.length - 1]?.year ?? latest.year}, and growth rate chart.`;

  const keywords = [
    `${data.name.toLowerCase()} gdp`,
    `${data.name.toLowerCase()} gdp ${latest.year}`,
    `${data.name.toLowerCase()} gdp growth rate`,
    `${data.name.toLowerCase()} gdp per capita`,
    `${data.name.toLowerCase()} economy`,
    `gdp of ${data.name.toLowerCase()}`,
    `${data.name.toLowerCase()} gdp history`,
    `${data.name.toLowerCase()} gdp rank`,
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `https://fermor.in/gdp/${data.slug}` },
    openGraph: {
      title: `${title} - Fermor`,
      description,
      type: 'article',
      url: `https://fermor.in/gdp/${data.slug}`,
      publishedTime: data.datePublished,
      modifiedTime: data.dateModified,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Fermor`,
      description,
    },
  };
}
