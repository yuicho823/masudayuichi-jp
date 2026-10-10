import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { TravelArticleMeta, TravelArticleAuthorFooter, serializeJsonLd } from './TravelArticleMeta.mjs';
import { WebSiteJsonLd } from './WebSiteJsonLd.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const check = process.argv.includes('--check');
const metadata = JSON.parse(fs.readFileSync(path.join(root,'article-meta.json'),'utf8'));
const scriptPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
function write(file, before, after) {
  if (check && before !== after) throw new Error(`Stale generated SEO: ${path.relative(root,file)} (run node build-seo.mjs)`);
  if (!check && before !== after) fs.writeFileSync(file,after);
}
const home = path.join(root,'index.html');
const oldHome = fs.readFileSync(home,'utf8');
let websites = 0;
const newHome = oldHome.replace(scriptPattern, (script,raw)=>{
  const data = JSON.parse(raw);
  if (data['@type'] !== 'WebSite') return script;
  websites++;
  return WebSiteJsonLd(data);
});
if (websites !== 1) throw new Error('Expected exactly one existing WebSite');
write(home,oldHome,newHome);
let count = 0;
for (const category of ['blog','lesson']) {
  for (const entry of fs.readdirSync(path.join(root,category), {withFileTypes:true})) {
    if (!entry.isDirectory()) continue;
    const relative = `${category}/${entry.name}/index.html`;
    const file = path.join(root,relative);
    if (!fs.existsSync(file)) continue;
    const before = fs.readFileSync(file,'utf8');
    if (!before.includes('<article class="article">')) throw new Error(`Article missing: ${relative}`);
    const meta = metadata[relative];
    if (!meta) throw new Error(`Metadata missing: ${relative}`);
    let html = before;
    if (meta.status === 'verified') {
      const body = html.match(/(<h2>[\s\S]*?)(?:<hr>|<!-- travel-author:start -->)/)?.[1];
      if (!body || createHash('sha256').update(body).digest('hex') !== meta.bodySha256) throw new Error(`Verified body changed: ${relative}; recheck official sources`);
    }
    const block = TravelArticleMeta(meta);
    if (html.includes('<!-- travel-meta:start -->')) html = html.replace(/<!-- travel-meta:start -->[\s\S]*?<!-- travel-meta:end -->/,block);
    else html = html.replace('</h1>','</h1>' + block);
    if (!html.includes('href="/TravelArticleMeta.css"')) html = html.replace('</head>','<link rel="stylesheet" href="/TravelArticleMeta.css"></head>');
    if (!html.includes('<!-- travel-author:start -->')) {
      const hr = html.lastIndexOf('<hr>');
      const split = hr >= 0 ? hr : html.lastIndexOf('<h2>著者</h2>');
      const end = html.indexOf('</article>',split);
      if (split < 0 || end < 0) throw new Error(`Author boundary missing: ${relative}`);
      html = html.slice(0,split) + TravelArticleAuthorFooter(html.slice(split+(hr >= 0 ? 4 : 0),end)) + html.slice(end);
    }
    let postings = 0;
    html = html.replace(scriptPattern,(script,raw)=>{
      const data = JSON.parse(raw);
      if (data['@type'] !== 'BlogPosting') return script;
      postings++;
      // verifiedDate is deliberately never used as datePublished or dateModified.
      for (const [field,key] of [['datePublished','publishedDate'],['dateModified','modifiedDate']]) {
        if (meta[key]) data[field] = meta[key];
        else delete data[field];
      }
      return `<script type="application/ld+json">${serializeJsonLd(data)}</script>`;
    });
    if (postings > 1) throw new Error(`Duplicate BlogPosting: ${relative}`);
    const footer = html.match(/<!-- travel-author:start -->([\s\S]*?)<!-- travel-author:end -->/)?.[1];
    for (const label of ['増田裕一 公式サイト（新しいタブで開きます）','著者の公式プロフィールを見る（新しいタブで開きます）']) {
      if (!footer?.includes(`href="https://masudayuichi.jp/" target="_blank" rel="noopener noreferrer" aria-label="${label}"`)) throw new Error(`Author link missing: ${relative}`);
    }
    if (!footer.includes('class="travel-article-disclaimer"')) throw new Error(`Disclaimer missing: ${relative}`);
    write(file,before,html);
    count++;
  }
}
if (count !== Object.keys(metadata).length) throw new Error('Orphan article metadata');
console.log(`SEO ${check ? 'check' : 'build'} passed: ${count} articles; existing canonical, body and assets retained.`);
