# Static SEO integration

This project is static HTML, not Next.js. `WebSiteJsonLd.mjs` and `TravelArticleMeta.mjs` implement the requested component behavior as server-independent HTML. `TravelArticleMeta.css` is scoped to the new blocks. The generated HTML is committed so search engines and visitors receive it without JavaScript.

- Run `node build-seo.mjs` after editing article metadata to regenerate the HTML.
- Run `node build-seo.mjs --check` before committing. Vercel runs the same check.
- Keep canonical URLs at `https://www.masudayuichi.com/` and author links at `https://masudayuichi.jp/`.
- `article-meta.json` has independent `publishedDate`, `modifiedDate`, and `verifiedDate` fields. Missing publication dates stay missing. Video upload dates are not article publication dates.
- No date changes are inferred from a build, deployment, or design update. Existing 2026-10-01 body modification dates for guides 048–051 remain unchanged.
- Verified status requires dated official-source evidence, review notes, and a matching body SHA-256. The four ANA guides were checked against their listed official pages on 2026-10-10. Only verification metadata changed; article body text did not.
- Existing video articles remain archives. The site introduction (010) and unreviewed current card guide (011) have neither an archive nor a verified label. Do not claim verification without reviewing their principal factual claims against official sources.
- Existing author descriptions and internal links are retained. A shared official-author link, profile link and disclaimer are added.
- Preserve existing JSON-LD types. The homepage has one WebSite; existing BlogPosting objects are updated in place, never duplicated.

The provided request specifies behavior but does not include the audited TSX/CSS source text. This is an adaptation to the actual static site, not a byte-for-byte copy of that audit submission.
