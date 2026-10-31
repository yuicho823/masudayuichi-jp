import fs from 'node:fs';
import path from 'node:path';
const out='dist';
const read=p=>fs.readFileSync(p,'utf8');
const header=`<a class="skip-link" href="#main-content">本文へ</a><header class="site-header"><a class="site-brand" href="/">YUICHI MASUDA<small>増田裕一 オフィシャルサイト</small></a><nav class="site-nav" aria-label="メインナビゲーション"><a href="/profile/">プロフィール</a><a href="/blog/">記事・発信</a><a href="/publishing/">出版</a><a href="/media/">運営メディア</a><a class="site-contact" href="/contact/">お問い合わせ ↗</a></nav></header>`;
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(d,x.name)):path.join(d,x.name));}
fs.mkdirSync(path.join(out,'redesign'),{recursive:true});
for(const f of ['home.css','fresh-colors.css','site.css','search.js'])fs.copyFileSync('redesign/'+f,path.join(out,'redesign',f));
for(const file of walk(out).filter(x=>x.endsWith('.html'))){
 let s=read(file);
 const rel=path.relative(out,file);
 if(rel==='blog/index.html')s=s.replace('</body>','<script src="/redesign/search.js" defer></script></body>');
 const special=rel==='index.html'||rel==='profile/index.html';
 if(special){
  let body=read('redesign/'+(rel==='index.html'?'home':'profile')+'.html');
  // Keep the original profile's detailed information and official profile links.
  if(rel==='profile/index.html'){
   let original=(s.match(/<main[^>]*>([\s\S]*?)<\/main>/)||[])[1]||'';
   original=original.replace(/<section class="hero"[\s\S]*?<\/section>/,'');
   body+=`<section class="section profile-resources"><details><summary>詳しい活動・公式プロフィール一覧</summary><div class="legacy-content">${original}</div></details></section>`;
  }
  // Preserve the current note updates and publishing links on the home page.
  if(rel==='index.html'){
   const note=s.match(/<section[^>]*>[\s\S]*?id="note-title"[\s\S]*?<\/section>/);
   if(note){const start=note[0].lastIndexOf('<section');const section=note[0].slice(start);body=body.replace('<section class="section" id="journal">',`<div class="legacy-content note-updates">${section}</div><section class="section" id="journal">`);}
  }
  s=s.replace(/<main[^>]*>[\s\S]*?<\/main>/,`<main id="main-content">${body}</main>`);
  s=s.replace('</head>','<link rel="stylesheet" href="/redesign/home.css"><link rel="stylesheet" href="/redesign/fresh-colors.css"></head>');
  s=s.replace('<body>','<body class="presentation-page">');
 }
 s=s.replace(/<header\b[^>]*>[\s\S]*?<\/header>/,header);
 if(!s.includes('id="main-content"'))s=s.replace(/<main\b([^>]*)>/,'<main id="main-content"$1>');
 s=s.replace('</head>','<link rel="stylesheet" href="/redesign/site.css"></head>');
 const url='/'+path.relative(out,path.dirname(file)).split(path.sep).filter(x=>x!=='.').join('/')+'/';
 s=s.replace(/<a href="(\/profile\/|\/blog\/|\/publishing\/|\/media\/|\/contact\/)">/g,(m,u)=>u===url?m.replace('>',' aria-current="page">'):m);
 fs.writeFileSync(file,s);
}
