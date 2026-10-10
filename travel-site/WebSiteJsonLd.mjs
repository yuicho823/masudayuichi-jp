import { SITE_URL, AUTHOR_URL, serializeJsonLd } from './TravelArticleMeta.mjs';
export function WebSiteJsonLd(existing = {}) {
  return `<script type="application/ld+json">${serializeJsonLd({
    ...existing,
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'マイルの教科書',
    alternateName: ['マイルの教科書 - 増田裕一 TRAVEL', 'masudayuichi.com'],
    url: SITE_URL, inLanguage: 'ja',
    author: {...existing.author, '@type':'Person', name:'増田裕一', url:AUTHOR_URL},
  })}</script>`;
}
