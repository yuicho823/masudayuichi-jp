# masudayuichi.jp

増田裕一 公式サイト / 個人メディア

- 公式プロフィール
- 増田メルマガSEOをベースにした40記事
- 株式会社ヒカリスター出版: https://hikaristar.com/

The deployable static site is packaged in `site.zip` and extracted to `dist/` during the Vercel build.


Deployment trigger: 2026-09-29

## 記事の読みやすさ

現在のビルドは `npm run build`（`build.mjs`）です。記事本文の意味と句読点を維持し、説明から具体例、対比から結論など、意味が切り替わる位置を記事ごとに決めています。`article-layout.json` が各記事の段落位置を保持し、生成後のHTMLへ反映します。文字数や文数による自動分割は行いません。

新しい記事でも、一段落に一つの話を置き、重要な一文は独立した段落にします。短い列挙や一つの説明はまとまりを保ち、スマホの2〜3行を目安にしても途中の句や引用で無理に切らないでください。重要な段落には `article-keypoint` を使用できます。行間・段落間・見出しの余白は共通の `style.css` が適用されます。

既存本文を更新した場合は、その記事の段落判断を読み直して `article-layout.json` の境界と本文ハッシュも更新します。本文と判断記録が一致しない場合、ビルドは停止し、古い改行を新しい文章へ誤適用しません。

## 2026-10 デザイン更新

`redesign/` は白・青・ピンク・オレンジを使った共通デザインです。
`build.mjs` の最後に `redesign/apply.mjs` が実行され、全ページのヘッダーとスタイルを統一します。
トップとプロフィールの構成は `redesign/home.html` と `redesign/profile.html`、配色は `redesign/fresh-colors.css`、下層ページの見た目は `redesign/site.css` で調整します。
記事本文・canonical・構造化データ・サイトマップは既存生成処理を引き継ぎます。
トップの写真は仮のワークスペース写真です。本人や実際の活動の写真に差し替えてから公開することを推奨します。
生成物は `dist/`。プレビューは `python3 -m http.server 8766 --directory dist` で確認できます。
