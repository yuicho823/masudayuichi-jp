// Static-site equivalent of TravelArticleMeta.tsx. No client-side rendering needed.
export const SITE_URL = 'https://www.masudayuichi.com/';
export const AUTHOR_URL = 'https://masudayuichi.jp/';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const serializeJsonLd = value => JSON.stringify(value).replace(/</g, '\\u003c');

export function validateDate(value, field) {
  if (value == null) return;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) !== value) {
    throw new Error(`Invalid ${field}: ${value}`);
  }
  const today = new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Tokyo'}).format(new Date());
  if (value > today) throw new Error(`Future ${field}: ${value}`);
}

export function TravelArticleMeta(meta) {
  for (const key of ['publishedDate', 'modifiedDate', 'verifiedDate']) validateDate(meta[key], key);
  if (meta.publishedDate && meta.modifiedDate && meta.modifiedDate < meta.publishedDate) throw new Error('Update predates publication');
  if (meta.status === 'verified' && (!meta.verifiedDate || !meta.sources?.length || !meta.verificationNotes || !meta.bodySha256)) throw new Error('Verification evidence required');
  if (meta.status !== 'verified' && meta.verifiedDate) throw new Error('Unverified article cannot have verifiedDate');
  let status = '';
  if (meta.status === 'verified') {
    const [year, month] = meta.verifiedDate.split('-');
    status = `<p class="travel-article-status travel-article-status--verified">【${year}年${month}月 公式情報確認済み】本記事の主要なカードスペックや航空会社規約は、上記年月時点の各社公式サイトに基づき確認・更新しています。</p>`;
  } else if (meta.status === 'archive') {
    status = '<p class="travel-article-status">【アーカイブ記事】本記事はYouTube公開当時の内容をもとに構成しています。最新の搭乗規約や年会費等は各社公式サイトをご確認ください。</p>';
  } else if (meta.status !== 'unverified') throw new Error(`Unknown article status: ${meta.status}`);
  const dates = [['publishedDate','初回公開日'],['modifiedDate','本文更新日']].filter(([key])=>meta[key]).map(([key,label])=>`<span>${label}：<time datetime="${meta[key]}">${meta[key].replaceAll('-', '/')}</time></span>`).join('');
  return `<!-- travel-meta:start --><div class="travel-article-meta"><p class="travel-article-pr">※当サイトはアフィリエイト広告およびプロモーションを含みます</p>${status}${dates ? `<p class="travel-article-dates">${dates}</p>` : ''}</div><!-- travel-meta:end -->`;
}

export function TravelArticleAuthorFooter(existingHtml) {
  const authorLink = `<a href="${AUTHOR_URL}" target="_blank" rel="noopener noreferrer" aria-label="増田裕一 公式サイト（新しいタブで開きます）">増田裕一</a>`;
  const original = existingHtml.replace(/<strong>(著者：)?増田裕一<\/strong>/, (_,prefix)=>`<strong>${prefix || ''}${authorLink}</strong>`);
  if (original === existingHtml) throw new Error('Existing author description not found');
  // Retain the complete existing author description and internal profile/article links.
  return `<!-- travel-author:start --><section class="travel-article-author" aria-label="著者と免責事項">${original}<p><a href="${AUTHOR_URL}" target="_blank" rel="noopener noreferrer" aria-label="著者の公式プロフィールを見る（新しいタブで開きます）">著者の公式プロフィールを見る →</a></p><p class="travel-article-disclaimer">免責事項：本記事は情報提供を目的としています。航空会社・カード会社等の制度や条件は変更される場合があります。お申し込み・ご予約の前に、各社公式サイトで最新の条件をご確認ください。</p></section><!-- travel-author:end -->`;
}
