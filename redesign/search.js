(()=>{
 const input=document.querySelector('#article-search');
 if(!input)return;
 const status=document.querySelector('#search-status');
 const cards=[...document.querySelectorAll('.category-card')];
 const sections=[...document.querySelectorAll('.category-section,.latest-section')];
 const categories=document.querySelector('.category-nav-section');
 const original=status?.textContent;
 const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/\s+/g,' ');
 input.addEventListener('input',()=>{
  const query=normalize(input.value.trim());const found=new Set();
  for(const card of cards){const hit=!query||normalize(card.textContent).includes(query);card.hidden=!hit;if(hit){const a=card.querySelector('h3 a');if(a)found.add(a.getAttribute('href'));}}
  for(const section of sections)section.hidden=!!query&&!section.querySelector('.category-card:not([hidden])');
  if(categories)categories.hidden=!!query;
  if(status)status.textContent=query?`${found.size}件の記事が見つかりました。`:original;
 });
})();
