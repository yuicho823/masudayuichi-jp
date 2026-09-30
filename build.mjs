import generatedArticles from "./articles-101-200.mjs";
import fs from "node:fs";import path from "node:path";
const out="dist";fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of ["index.html","style.css","robots.txt","404.html"]){if(fs.existsSync(f))fs.copyFileSync(f,path.join(out,f));}
for(const d of ["blog","profile","images"]){if(fs.existsSync(d))fs.cpSync(d,path.join(out,d),{recursive:true});}
const cats=n=>n>=101&&n<=110?"ai":n>=111&&n<=120?"publishing":n>=121&&n<=130?"welfare":n>=131&&n<=140?"region":n>=141&&n<=150?"business":n>=151&&n<=170?"region":n>=171&&n<=180?"publishing":"life";
const meta=[];
for(let n=1;n<=200;n++){const id=String(n).padStart(2,"0");const f=path.join(out,"blog",id,"index.html");if(!fs.existsSync(f))continue;let h=fs.readFileSync(f,"utf8");const title=((h.match(/<h1>([\s\S]*?)<\/h1>/)||[])[1]||("ARTICLE "+n)).replace(/<[^>]+>/g,"");meta.push({n,id,title});const image="/images/blog/"+cats(n)+".svg";if(!h.includes('class="article-cover"'))h=h.replace('<article class="article">',`<figure class="article-cover"><img src="${image}" alt="増田裕一｜${title}" loading="eager"></figure><article class="article">`);if(!h.includes('property="og:image"'))h=h.replace("</head>",`<meta property="og:image" content="https://masudayuichi.jp${image}"><meta name="twitter:card" content="summary_large_image"></head>`);if(!h.includes('href="https://hikaristar.com/"'))h=h.replace("</nav>",'<a href="https://hikaristar.com/">COMPANY</a></nav>');if(!h.includes('class="article-nav"')){const p=n>1?String(n-1).padStart(2,"0"):null,q=n<200?String(n+1).padStart(2,"0"):null;h=h.replace("</article>",`<nav class="article-nav">${p?`<a href="/blog/${p}/">← 前の記事</a>`:"<span></span>"}<a class="all-articles" href="/blog/">記事一覧</a>${q?`<a href="/blog/${q}/">次の記事 →</a>`:"<span></span>"}</nav></article>`);}fs.writeFileSync(f,h);}
meta.sort((a,b)=>b.n-a.n);
const cards=meta.map(x=>`<article class="card blog-card"><div class="meta">ARTICLE ${x.n} ${x.n>190?'<span class="new-badge">NEW</span>':""}</div><h3><a href="/blog/${x.id}/">${x.title}</a></h3><p class="copy">増田裕一が実体験や現場で得た学びをもとに、価値提供を目的としてまとめています。</p><a class="readmore" href="/blog/${x.id}/">記事を読む →</a></article>`).join("");
const index=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>増田裕一ブログ｜AI・福祉・地域・事業づくり</title><meta name="description" content="増田裕一の公式ブログ。出版、AI、介護・福祉、地域、経営、働き方など200記事を掲載。"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://masudayuichi.jp/blog/"><link rel="stylesheet" href="/style.css"></head><body><header><div class="wrap nav"><a class="brand" href="/">増田裕一 公式サイト</a><nav><a href="/profile/">PROFILE</a><a href="/blog/">BLOG</a><a href="https://hikaristar.com/">COMPANY</a></nav></div></header><main><section class="hero blog-hero"><div class="wrap"><div class="eyebrow">OFFICIAL BLOG</div><h1>増田裕一ブログ</h1><p class="copy">出版、AI、介護・福祉、地域、事業づくり。現場で得た経験を、価値提供を軸に発信しています。</p><p class="blog-count">現在 ${meta.length}記事</p></div></section><section class="blog-list"><div class="wrap"><div class="grid">${cards}</div></div></section></main><footer><div class="wrap">© Yuichi Masuda</div></footer></body></html>`;fs.writeFileSync(path.join(out,"blog","index.html"),index);
const urls=["/","/profile/","/blog/",...meta.slice().sort((a,b)=>a.n-b.n).map(x=>"/blog/"+x.id+"/")];const sm='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>'<url><loc>https://masudayuichi.jp'+u+'</loc></url>').join("")+"</urlset>";fs.writeFileSync(path.join(out,"sitemap.xml"),sm);

// GENERATED_ARTICLES_101_200
const generatedCategoryContext={
  ai:"生成AIは便利ですが、現場では『何に使うか』『誰が確認するか』まで決めて初めて仕事の一部になります。新しい機能を追いかけるより、今の業務に置き換えて考えることが大切です。",
  business:"経営では、正解を一度で当てることより、小さく試して数字と現場の反応を見ながら修正することが重要です。特に小さな会社では、限られた時間と人をどこに使うかが結果を大きく左右します。",
  web:"Webや情報発信は、見た目を整えるだけでは十分ではありません。誰に何を伝え、読んだ人が次にどう動けるかまで設計すると、情報が資産として積み上がっていきます。",
  welfare:"介護・福祉では、制度や手順だけでなく、利用する人の生活と働く人の負担の両方を見る必要があります。良い支援を長く続けるためには、現場が無理をしない仕組みも欠かせません。",
  region:"地域づくりは、大きなイベントや新しい施設だけで進むものではありません。すでに地域にある人、店、学校、企業、福祉、活動をどうつなぐかという視点が実践につながります。",
  publishing:"出版や文章発信では、きれいな言葉より、実際に経験したことを具体的に残す方が読者の学びになります。自分の経験を整理すること自体が、次の仕事や判断にもつながります。",
  education:"学びは知識を増やすだけではなく、実際に試し、自分で考え、また修正することで深まります。答えを早く知ることより、問いを持つことがこれからさらに重要になります。",
  nordic:"海外や北欧の事例を見る時は、制度だけを切り取らず、その背景にある暮らしや価値観まで見ることが大切です。日本との違いを知ることで、自分たちの当たり前を見直せます。",
  life:"仕事や生活の中では、全部を一度に変えようとすると続きません。小さく試し、振り返り、自分に合う形に直していく。その積み重ねが長く続く変化になります。"
};
const generatedImageFor=cat=>{
  if(cat==="ai") return "ai";
  if(cat==="welfare") return "welfare";
  if(cat==="region") return "region";
  if(cat==="publishing"||cat==="education") return "publishing";
  if(cat==="business"||cat==="web") return "business";
  return "life";
};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
for(const [n,title,cat,lesson,practice] of generatedArticles){
  const dir=path.join(out,"blog",String(n));
  fs.mkdirSync(dir,{recursive:true});
  const image="/images/blog/"+generatedImageFor(cat)+".svg";
  const context=generatedCategoryContext[cat]||generatedCategoryContext.life;
  const desc="増田裕一が「"+title+"」について、実体験や現場での学びをもとに、売り込みではなく価値提供を前提として具体的にまとめた記事です。";
  const prev=n>1?n-1:null, next=n<200?n+1:null;
  const html=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜増田裕一</title><meta name="description" content="${esc(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://masudayuichi.jp/blog/${n}/"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}｜増田裕一"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="https://masudayuichi.jp/blog/${n}/"><meta property="og:image" content="https://masudayuichi.jp${image}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/style.css"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting","headline":title,"author":{"@type":"Person","name":"増田裕一","url":"https://masudayuichi.jp/profile/"},"publisher":{"@type":"Organization","name":"株式会社ヒカリスター出版","url":"https://hikaristar.com/"},"mainEntityOfPage":"https://masudayuichi.jp/blog/"+n+"/"})}</script></head><body><header><div class="wrap nav"><a class="brand" href="/">増田裕一 公式サイト</a><nav><a href="/profile/">PROFILE</a><a href="/blog/">BLOG</a><a href="https://hikaristar.com/">COMPANY</a></nav></div></header><main><div class="article-wrap"><section class="article-hero"><div class="meta">増田裕一 / ARTICLE ${n}</div><h1>${esc(title)}</h1><div class="tags"><span class="tag">#増田裕一</span><span class="tag">#${esc(cat)}</span></div></section><figure class="article-cover"><img src="${image}" alt="増田裕一｜${esc(title)}" loading="eager"></figure><article class="article"><p>増田裕一です。今回は「${esc(title)}」について、僕自身が仕事や現場で感じてきたことをもとに整理してみます。</p><h2>なぜ、このテーマを考えるのか</h2><p>${esc(context)}</p><p>${esc(lesson)}</p><h2>現場では、きれいに答えが出ない</h2><p>実際の仕事では、教科書通りに進まないことの方が多くあります。人、時間、予算、地域性、これまでの経緯によって、同じ方法でも結果は変わります。だから僕は、正解を探すよりも、今の状況で何が一番無理なく試せるかを考えるようにしています。</p><p>一度で完成させようとすると、準備だけで時間が過ぎてしまいます。まず小さく動き、反応を見て、必要なら直す。その方が、結果として現場に合った形に近づきます。</p><h2>実践するなら、ここから始める</h2><p>${esc(practice)}</p><p>大きな改革にしなくても、一週間だけ試してみる、対象を一人や一業務に絞る、前後で何が変わったかを見る。こうした小さな確認を重ねるだけでも、次に何をすべきかが見えてきます。</p><h2>数字と、人の感覚を両方見る</h2><p>効率や数字は判断に必要ですが、それだけで決めると現場の納得感を失うことがあります。逆に、気持ちだけで進めると続けられないこともあります。僕は、数字で事実を見ながら、利用する人や働く人がどう感じるかも一緒に見ることが大切だと思っています。</p><h2>経験を言葉にして残す</h2><p>うまくいったことだけでなく、迷ったことや失敗したことも、なぜそう判断したのかまで言葉にすると次の判断材料になります。同じ状況にいる誰かにとって、その経験がヒントになることもあります。</p><h2>まとめ</h2><p>僕自身も、いつも正解が分かった状態で動いているわけではありません。それでも、試した結果を振り返り、次に活かすことはできます。増田裕一として、これからも実践の中で得た学びを、売り込みではなく、誰かが自分の仕事や生活に置き換えられる形で残していきたいと思っています。</p><div class="author"><h3>著者：増田裕一</h3><p>株式会社ヒカリスター出版 代表取締役。出版、Web・SNS、生成AI活用、介護・福祉、地域・事業づくりなど、実践から得た学びを発信しています。</p><a href="/profile/">増田裕一プロフィール →</a></div><nav class="article-nav">${prev?`<a href="/blog/${prev}/">← 前の記事</a>`:"<span></span>"}<a class="all-articles" href="/blog/">記事一覧</a>${next?`<a href="/blog/${next}/">次の記事 →</a>`:"<span></span>"}</nav></article></div></main></body></html>`;
  fs.writeFileSync(path.join(dir,"index.html"),html);
}

// Update built blog index to 200 articles.
const builtIndex=path.join(out,"blog","index.html");
if(fs.existsSync(builtIndex)){
  let html=fs.readFileSync(builtIndex,"utf8");
  html=html.replace(/100記事/g,"200記事").replace(/現在 100記事/g,"現在 200記事").replace(/<span class="new-badge">NEW<\/span>/g,"");
  const cards=generatedArticles.slice().reverse().map(([n,title])=>`<article class="card blog-card"><div class="meta">ARTICLE ${n}${n>=191?' <span class="new-badge">NEW</span>':''}</div><h3><a href="/blog/${n}/">${esc(title)}</a></h3><p class="copy">増田裕一が実体験や現場で感じたことをもとに、学びとしてまとめています。</p><a class="readmore" href="/blog/${n}/">記事を読む →</a></article>`).join("");
  html=html.replace('<div class="grid">','<div class="grid">'+cards);
  fs.writeFileSync(builtIndex,html);
}

// Update built sitemap to 200 articles.
const builtSitemap=path.join(out,"sitemap.xml");
if(fs.existsSync(builtSitemap)){
  let xml=fs.readFileSync(builtSitemap,"utf8").replace("</urlset>","");
  for(let n=101;n<=200;n++) if(!xml.includes("/blog/"+n+"/")) xml+=`<url><loc>https://masudayuichi.jp/blog/${n}/</loc><lastmod>2026-09-30</lastmod></url>`;
  xml+="</urlset>";
  fs.writeFileSync(builtSitemap,xml);
}


// CATEGORY_BLOG_INDEX_V2
// Rebuild the blog index after every article has been generated so that
// all 200 articles appear once, grouped into reader-friendly categories.
{
  const broadCategories=[
    {key:"ai",label:"AI・生成AI",desc:"生成AIの実務活用、業務改善、研修、AI時代の仕事について。"},
    {key:"publishing",label:"出版・情報発信",desc:"出版、文章、ブログ、SNS、Web発信、SEOについて。"},
    {key:"welfare",label:"介護・福祉",desc:"介護・障害福祉、現場運営、採用、人材育成について。"},
    {key:"region",label:"地域・地方創生",desc:"地域づくり、コミュニティ、観光、地域企業について。"},
    {key:"business",label:"経営・事業づくり",desc:"中小企業、事業開発、採用、顧客、経営判断について。"},
    {key:"global",label:"北欧・海外・教育",desc:"北欧、海外視察、教育、学び、文化の違いについて。"},
    {key:"food",label:"農業・食",desc:"農業、食、地域経済、食育について。"},
    {key:"life",label:"働き方・学び",desc:"働き方、生き方、学び、経験の振り返りについて。"}
  ];
  const normalizeCategory=(title,html)=>{
    const text=(title+" "+html.replace(/<[^>]+>/g," ")).toLowerCase();
    if(/農業|農産|食育|地域の食|直売所|畑|作物/.test(text)) return "food";
    if(/北欧|海外|視察|教育|子ども|学びの場|学校/.test(text)) return "global";
    if(/介護|福祉|重度訪問|デイサービス|利用者|支援|ヘルパー/.test(text)) return "welfare";
    if(/ai|生成ai|人工知能/.test(text)) return "ai";
    if(/出版|本を|書籍|文章|ブログ|sns|seo|web|ホームページ|情報発信|発信/.test(text)) return "publishing";
    if(/地域|地方創生|観光|コミュニティ|まち|移住/.test(text)) return "region";
    if(/経営|事業|中小企業|採用|顧客|売上|会社|ビジネス|商談/.test(text)) return "business";
    return "life";
  };
  const all=[];
  for(let n=1;n<=200;n++){
    const id=String(n).padStart(2,"0");
    const file=path.join(out,"blog",id,"index.html");
    if(!fs.existsSync(file)) continue;
    const html=fs.readFileSync(file,"utf8");
    const title=((html.match(/<h1>([\s\S]*?)<\/h1>/)||[])[1]||("ARTICLE "+n)).replace(/<[^>]+>/g,"");
    all.push({n,id,title,category:normalizeCategory(title,html)});
  }
  all.sort((a,b)=>b.n-a.n);
  const card=x=>`<article class="card blog-card category-card"><div class="meta">ARTICLE ${x.n}${x.n>190?' <span class="new-badge">NEW</span>':''}</div><h3><a href="/blog/${x.id}/">${esc(x.title)}</a></h3><p class="copy">増田裕一が実体験や現場で得た学びをもとにまとめています。</p><a class="readmore" href="/blog/${x.id}/">記事を読む →</a></article>`;
  const latest=all.slice(0,8).map(card).join("");
  const chips=broadCategories.map(c=>{
    const count=all.filter(x=>x.category===c.key).length;
    return `<a class="category-chip" href="#category-${c.key}"><span>${c.label}</span><b>${count}</b></a>`;
  }).join("");
  const sections=broadCategories.map(c=>{
    const items=all.filter(x=>x.category===c.key);
    if(!items.length) return "";
    return `<section class="category-section" id="category-${c.key}"><div class="wrap"><div class="category-heading"><div><div class="eyebrow">CATEGORY</div><h2>${c.label}</h2><p>${c.desc}</p></div><span class="category-count">${items.length}記事</span></div><div class="grid category-grid">${items.map(card).join("")}</div><a class="back-categories" href="#categories">↑ カテゴリ一覧へ戻る</a></div></section>`;
  }).join("");
  const categoryJson=JSON.stringify(broadCategories.map(c=>({"@type":"CollectionPage","name":c.label,"url":"https://masudayuichi.jp/blog/#category-"+c.key})));
  const index=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>増田裕一ブログ｜AI・福祉・地域・出版・事業づくり</title><meta name="description" content="増田裕一の公式ブログ。AI、出版・情報発信、介護・福祉、地域・地方創生、経営、北欧・教育、農業・食、働き方のカテゴリ別に200記事を掲載。"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://masudayuichi.jp/blog/"><link rel="stylesheet" href="/style.css"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Blog","name":"増田裕一ブログ","url":"https://masudayuichi.jp/blog/","author":{"@type":"Person","name":"増田裕一","url":"https://masudayuichi.jp/profile/"}})}</script></head><body><header><div class="wrap nav"><a class="brand" href="/">増田裕一 公式サイト</a><nav><a href="/profile/">PROFILE</a><a href="/blog/">BLOG</a><a href="https://hikaristar.com/">COMPANY</a></nav></div></header><main><section class="hero blog-hero"><div class="wrap"><div class="eyebrow">OFFICIAL BLOG</div><h1>増田裕一ブログ</h1><p class="copy">出版、AI、介護・福祉、地域、事業づくり。現場で得た経験を、読む人の学びにつながる形で発信しています。</p><p class="blog-count">現在 ${all.length}記事</p></div></section><section class="category-nav-section" id="categories"><div class="wrap"><div class="category-nav-head"><div><div class="eyebrow">EXPLORE</div><h2>カテゴリから読む</h2></div><p>気になるテーマから記事を探せます。</p></div><div class="category-chips">${chips}</div></div></section><section class="latest-section"><div class="wrap"><div class="category-heading"><div><div class="eyebrow">LATEST</div><h2>新着記事</h2><p>最近追加した記事から8本を表示しています。</p></div></div><div class="grid latest-grid">${latest}</div></div></section>${sections}</main><footer><div class="wrap">© Yuichi Masuda</div></footer></body></html>`;
  fs.writeFileSync(path.join(out,"blog","index.html"),index);
}
