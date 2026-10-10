import fs from "node:fs";
import path from "node:path";

const profiles = [
  ["公式YouTube", "https://www.youtube.com/@yuichimasuda"],
  ["note", "https://note.com/yuicho823"],
  ["LinkedIn", "https://www.linkedin.com/in/%E8%A3%95%E4%B8%80-%E5%A2%97%E7%94%B0-580babb0"],
  ["Wantedly", "https://www.wantedly.com/id/yuichi_masuda_c"],
];
const external = (label, href) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}（新しいタブで開きます）">${label}</a>`;
export const footerHtml = `<footer class="site-footer"><div class="wrap"><div class="site-footer-grid"><div><p class="site-footer-brand">増田裕一<span>YUICHI MASUDA</span></p><div class="site-footer-operator"><p>運営：${external("株式会社ヒカリスター出版", "https://hikaristar.com/")}</p><p>関連法人：${external("一般社団法人福祉社会推進協会", "https://fukushishakai.org/about.html")}</p></div></div><nav aria-label="フッター：サイト案内"><h2>サイト案内</h2><ul><li><a href="/profile/">プロフィール</a></li><li><a href="/contact/">お問い合わせ</a></li></ul></nav><nav aria-label="フッター：公式プロフィール"><h2>発信・プロフィール</h2><ul class="site-footer-profiles">${profiles.map(([label, href]) => `<li>${external(label, href)}</li>`).join("")}</ul></nav></div><p class="site-footer-copyright">© ${new Date().getFullYear()} Yuichi Masuda. All rights reserved.</p></div></footer>`;
const css = `
.site-footer{background:var(--paper);border-top:1px solid var(--line);padding:56px 0;color:var(--ink)}
.site-footer-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr) minmax(0,1fr);gap:40px}
.site-footer-brand{font-size:22px;font-weight:700;margin:0 0 16px}.site-footer-brand span{display:block;font-size:11px;letter-spacing:.18em;color:var(--muted)}
.site-footer-operator{font-size:13px;overflow-wrap:anywhere}.site-footer-operator p{margin:0 0 8px;line-height:1.7}.site-footer-operator p:last-child{margin-bottom:0}.site-footer h2{font-family:inherit;font-size:14px;line-height:1.6;margin:0 0 16px;letter-spacing:normal}
.site-footer ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}.site-footer a{color:var(--muted);font-size:14px;display:inline-block;padding:4px 0;text-underline-offset:4px}.site-footer a:hover{color:var(--ink);text-decoration:underline}.site-footer a:focus-visible{outline:2px solid var(--ink);outline-offset:4px;border-radius:2px}
.site-footer-copyright{border-top:1px solid var(--line);margin:32px 0 0;padding-top:20px;font-size:12px;color:var(--muted)}
@media(max-width:760px){.site-footer-grid{grid-template-columns:1fr;gap:28px}.site-footer-profiles{grid-template-columns:repeat(2,minmax(0,1fr))}.site-footer{padding:40px 0}}
`;
export function applyFooter(directory) {
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.html')) {
        let html = fs.readFileSync(file, 'utf8');
        if (!/<footer\b/.test(html)) html = html.replace('</body>', footerHtml + '</body>');
        html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/g, footerHtml);
        fs.writeFileSync(file, html);
      }
    }
  }
  walk(directory);
  fs.appendFileSync(path.join(directory, 'style.css'), css);
  const sitemap = path.join(directory, 'sitemap.xml');
  const xml = fs.readFileSync(sitemap, 'utf8');
  if (!xml.includes('https://masudayuichi.jp/contact/')) fs.writeFileSync(sitemap, xml.replace('</urlset>', '<url><loc>https://masudayuichi.jp/contact/</loc></url></urlset>'));
}
