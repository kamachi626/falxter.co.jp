# FALXTER株式会社 コーポレートサイト

既存システムの調査・引き継ぎ・保守・改修を主軸に、周辺機能・新規システム開発とコーポレートサイト制作を案内するAstro製コーポレートサイトです。

## 技術構成

Astro 7 / TypeScript 5.9 / `@astrojs/cloudflare` / Cloudflare Workers / Tailwind CSS 4 / Zod 4 / Resend / Cloudflare Turnstile / Biome 2 / Playwright 1.61 / pnpm 11.17.0 / Node.js 24 / Docker。

## 必要環境

Node.js 24、Corepack、pnpm 11.17.0。Docker開発ではDocker DesktopまたはDocker EngineとComposeを使用します。

## ローカル開発

```bash
cp .env.example .env
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

`http://localhost:4321`を開きます。Astro 7とCloudflare adapterの組み合わせでは、`astro dev`もCloudflare Workersと同じworkerdランタイムを使います。APIルートや`astro:env`もWorkersに近い条件で確認できます。

## Docker開発

```bash
cp .env.example .env
docker compose -f compose.dev.yaml up --build
```

ソースをbind mountし、`node_modules`とpnpm storeは名前付きvolumeへ分離しています。ファイル監視はpollingを使うため、Docker Desktopから起動した場合も変更が自動反映されます。

Alpine版の旧開発コンテナから移行する初回だけは、Linuxバイナリの不整合を避けるため依存volumeを作り直してください。次の2コマンドは、ソースや`.env`ではなくComposeの依存キャッシュvolumeを削除して再作成します。

```bash
docker compose -f compose.dev.yaml down -v
docker compose -f compose.dev.yaml up --build
```

## 本番相当のローカル確認

```bash
pnpm build
pnpm preview
```

`astro preview`はビルド済み成果物をworkerdで実行します。Dockerでも同じ確認ができます。

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f app
```

このDocker構成はローカルまたは検証環境向けのWorkersプレビューです。本番ホスティング先はCloudflare Workersです。

## Cloudflare Workersへのデプロイ

ローカルからデプロイする場合:

```bash
pnpm deploy
```

Cloudflare Workers Buildsを使用する場合は、Gitリポジトリを接続し、次を設定します。

- Build command: `pnpm build`
- Deploy command: `pnpm exec wrangler deploy`
- Node.js: `24`
- pnpm: `11.17.0`

`wrangler.jsonc`はAstro Cloudflare adapterのWorkersエントリーポイントと`dist`の静的アセットを使用します。`keep_vars: true`のため、Wranglerからのデプロイ時もCloudflare Dashboardで設定した通常変数は維持されます。Astroのセッション用`SESSION` KVは、初回デプロイ時にWranglerの自動プロビジョニングで作成されます。

## 環境変数

ローカルでは`.env.example`を`.env`へコピーします。`.env`はGit管理しません。

### ビルド時に必要な公開値

- `PUBLIC_SITE_URL`: canonical、OG URL、sitemapの公開URL。本番は`https://falxter.co.jp`。
- `PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstileのsite key。

### Workersランタイムの通常変数

- `TURNSTILE_EXPECTED_HOSTNAME`: Turnstile応答で照合する本番hostname。
- `MAIL_TRANSPORT`: 本番は`resend`。
- `CONTACT_FROM_EMAIL`: Resendで検証済みドメインのFrom。
- `CONTACT_TO_EMAIL`: 問い合わせ通知先。
- `CONTACT_REPLY_TO_EMAIL`: 自動返信のReply-To。

### Workersランタイムのシークレット

- `TURNSTILE_SECRET_KEY`: Turnstile Siteverify用secret。
- `RESEND_API_KEY`: Resend API key。

DashboardのWorkers設定から登録するか、ローカルから次のコマンドで登録します。値をコマンドラインへ直接書かず、表示される入力欄へ入力してください。

```bash
pnpm exec wrangler secret put TURNSTILE_SECRET_KEY
pnpm exec wrangler secret put RESEND_API_KEY
```

`PLAYWRIGHT_TEST`はE2E専用の内部フラグです。本番環境には設定しないでください。`CLOUDFLARE_INCLUDE_PROCESS_ENV=true`はローカルおよびDockerで`.env`の値をworkerdへ渡すために使用します。

## 検証

```bash
pnpm check
pnpm build
pnpm test
```

初回E2E前にChromiumを導入します。

```bash
pnpm exec playwright install chromium
```

Playwrightはビルド済みサイトを`astro preview`で起動し、workerd上で問い合わせAPIを含むE2Eを実行します。

## GitHub Actions / GHCR

`ci.yml`はinstall、check、build、Chromium E2E、Docker buildを実行します。`docker.yml`はworkerdプレビュー用のコンテナイメージをGHCRへ公開します。Cloudflare Workersへの本番デプロイとは別の検証・移植用成果物です。

## 運用・セキュリティ

問い合わせ内容はDBや平文ファイルへ保存せず、Resend経由でメール送信します。本番ではTurnstile、Workers側のrate limitingまたはWAFも併用してください。Worker isolate内のメモリだけを使うレート制限は、全リージョン・全インスタンスで共有されないため、主防御にはしません。

プライバシーポリシーは実運用に合わせて更新し、必要に応じて専門家へ確認してください。本READMEおよびサイトの記載は法的助言ではありません。

## トラブルシューティング

- ヘルスチェック: `http://localhost:4321/api/health/`が`{"status":"ok"}`を返すか確認。
- workerdが起動しない: Node.js 24と対応OSを確認。Dockerでは`node:24-bookworm-slim`を使用します。
- メール送信失敗: Resendのドメイン検証、From、API key、`MAIL_TRANSPORT=resend`を確認。
- Turnstile失敗: site key、secret、許可hostname、公開hostnameを確認。
- hot reload: Docker DesktopでWSLディレクトリが共有されているか確認。旧Alpine依存volumeが残る場合は、上記の初回移行手順で再作成。
