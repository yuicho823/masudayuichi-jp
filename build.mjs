import fs from "node:fs";
import path from "node:path";

const out="dist";
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

for (const file of ["index.html","style.css","robots.txt","sitemap.xml","404.html"]) {
  if (fs.existsSync(file)) fs.copyFileSync(file,path.join(out,file));
}
for (const dir of ["blog","profile","images"]) {
  if (fs.existsSync(dir)) fs.cpSync(dir,path.join(out,dir),{recursive:true});
}
const cat=n=>{
  if([3,13,21,32,41,42,45].includes(n)) return "ai";
  if([4,5,11,12,17,18,19,23,24,29,33,35,37,49].includes(n)) return "welfare";
  if([6,28,42,43,47,48,49,50].includes(n)) return "region";
  if([16,20,25,26,30,34,36,38,40,44,46].includes(n)) return "publishing";
  if([2,10,14,22,27,39,45].includes(n)) return "business";
  return "life";
};
for(let n=1;n<=70;n++){
  const id=String(n).padStart(2,"0");
  const file=path.join(out,"blog",id,"index.html");
  if(!fs.existsSync(file)) continue;
  let html=fs.readFileSync(file,"utf8");
  const c=cat(n);
  const image="/images/blog/"+c+".svg";
  const title=((html.match(/<h1>([\s\S]*?)<\/h1>/)||[])[1]||"増田裕一ブログ").replace(/<[^>]+>/g,"");
  if(!html.includes('class="article-cover"')){
    html=html.replace('<article class="article">',`<figure class="article-cover"><img src="${image}" alt="増田裕一｜${title}" loading="eager"></figure><article class="article">`);
  }
  if(!html.includes('property="og:image"')){
    html=html.replace('</head>',`<meta property="og:image" content="https://masudayuichi.jp${image}"><meta name="twitter:card" content="summary_large_image"></head>`);
  }
  if(!html.includes('href="https://hikaristar.com/"')){
    html=html.replace('</nav>','<a href="https://hikaristar.com/">COMPANY</a></nav>');
  }
  const prev=n>1?String(n-1).padStart(2,"0"):null;
  const next=n<70?String(n+1).padStart(2,"0"):null;
  const nav=`<nav class="article-nav">${prev?`<a href="/blog/${prev}/">← 前の記事</a>`:"<span></span>"}<a class="all-articles" href="/blog/">記事一覧</a>${next?`<a href="/blog/${next}/">次の記事 →</a>`:"<span></span>"}</nav>`;
  if(!html.includes('class="article-nav"')){
    html=html.replace('</article>',nav+'</article>');
  }
  fs.writeFileSync(file,html);
}
