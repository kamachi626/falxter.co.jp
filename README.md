# falxter.co.jp

Astro + Tailwind CSS + Flowbite で構築した FALXTER株式会社のコーポレートサイトです。

## 開発環境
- Node.js 20 以上推奨
- npm (または pnpm/yarn)

## セットアップ
```bash
npm install
```

## ローカル開発
```bash
npm run dev
```

## ビルド
```bash
npm run build
```
生成物は `dist/` に出力されます。

## プレビュー
```bash
npm run preview
```

## デプロイ（静的配信想定）
1. `npm run build`
2. `dist/` ディレクトリを静的ホスティングに配置（例: Vercel/Cloudflare Pages/S3+CloudFront など）
3. `https://falxter.co.jp` ドメインで配信するようDNSを設定

## 差し替え箇所
- `src/site.config.ts`: 会社情報、ナビ、ブランドカラー、ロゴ/OGPのURL（現在はダミー画像URLを指定）
- `src/content/works/*.json`: 実績データ（追加・編集しやすい形式）
- `src/pages/contact.astro`: `access_key` を Web3Forms のキーに置き換え

## TODO
- Web3Forms の `access_key` 設定
- ロゴ画像/OGP画像を実画像に差し替え（`src/site.config.ts` の URL を変更）
- プレミアムプランの軽微調整範囲の詳細化
- 請負時の契約条件の明記（/about）
- 法務観点でのプライバシーポリシー最終確認
