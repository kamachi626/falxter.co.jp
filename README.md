# FALXTER株式会社 コーポレートサイト

中小企業向けコーポレートサイト制作と、既存システムの診断・引き継ぎ・保守・改修の相談獲得を目的としたAstro製コーポレートサイトです。会社・代表者・実績の未確認情報は表示しません。

## 技術構成

Astro 7 / TypeScript 5.9 / Node adapter standalone / Tailwind CSS 4 / Zod 4 / Resend / Cloudflare Turnstile / Biome 2 / Playwright 1.61 / pnpm 10 / Node.js 24 / Docker。

## 必要環境

Node.js 24、Corepack、pnpm 11.17.0。Docker起動ではDocker EngineとComposeのみ必要です。

## 非Dockerでの開発

```bash
cp .env.example .env
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

`http://localhost:4321` を開きます。検証は `pnpm check`、`pnpm test`、`pnpm build` です。初回E2E前に `pnpm exec playwright install chromium` を実行してください。

## Docker開発起動

```bash
cp .env.example .env
docker compose -f compose.dev.yaml up --build
```

ソースをbind mountし、`node_modules`とpnpm storeは名前付きvolumeへ分離します。Windows、WSL2、Linuxで変更監視を安定させるためpollingを有効にしています。

## Docker本番起動

`.env`の本番値を設定し、`MAIL_TRANSPORT=resend` に変更してください。mockのままでは本番送信時に明示的に失敗します。

```bash
cp .env.example .env
docker compose up --build -d
docker compose ps
docker compose logs -f app
```

停止:

```bash
docker compose down
```

更新:

```bash
git pull
docker compose build --pull
docker compose up -d
docker image prune -f
```

## 環境変数

- `NODE_ENV`, `HOST`, `PORT`: 実行環境。コンテナは `0.0.0.0:4321`。
- `PUBLIC_SITE_URL`: canonicalとsitemapの公開URL。
- `PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile site key（公開値）。
- `TURNSTILE_SECRET_KEY`: Siteverify用secret。
- `TURNSTILE_EXPECTED_HOSTNAME`: 任意のhostname照合値。
- `MAIL_TRANSPORT`: ローカルは`mock`、本番は`resend`。
- `RESEND_API_KEY`: Resend API key。
- `CONTACT_FROM_EMAIL`: Resendで検証済みドメインのFrom。
- `CONTACT_TO_EMAIL`: 通知先。
- `CONTACT_REPLY_TO_EMAIL`: 自動返信のReply-To。
- `SITE_DOMAIN`, `ACME_EMAIL`: Caddy利用時のみ必須。

secretに既定値はありません。`.env`はGit管理されません。Turnstileでは本番ドメインを登録し、開発・E2EにはCloudflareの公式テストキーまたはテストmockを使います。問い合わせ者のメールアドレスは通知メールのReply-Toにのみ設定されます。

## Resend / Turnstile

Resendで送信ドメインを検証し、API keyと3つのメールアドレスを設定します。Turnstileウィジェットを作成しsite keyとsecretを設定します。キー未設定のローカル開発はmockメールを使えますが、本番は両サービスの実値が必要です。

## GitHub Actions / GHCR

`ci.yml`はPRとmain pushでinstall、check、build、Chromium E2E、Docker buildを実行します。`docker.yml`はmainとsemverタグでBuildxを使い、`ghcr.io/<OWNER>/falxter-corporate-site`へSHA、semver、latestタグ、SBOM、provenance付きでpushします。`<OWNER>`は`github.repository_owner`から自動取得します。

## 一般的なDockerサーバーへのデプロイ

```bash
docker pull ghcr.io/<OWNER>/falxter-corporate-site:latest
docker compose up -d
```

アプリはHTTP 4321番で動作します。HTTPSはCloudflare、ALB、Cloud Run、Caddy、nginx、Traefikなどで終端してください。Caddy併用例は`Caddyfile`と`compose.proxy.yaml`です。`SITE_DOMAIN`と実際に受信できる`ACME_EMAIL`を設定し、次で起動します。

```bash
docker compose -f compose.yaml -f compose.proxy.yaml up -d
```

## 運用・セキュリティ

問い合わせはDBや平文ファイルへ保存せずメール送信します。バックアップ対象はリポジトリ、環境変数の安全な原本、Caddyの証明書volumeです。アプリ内IPレート制限は単一プロセスだけに有効で、複数コンテナでは共有されません。本番はCDN、WAF、ロードバランサーまたはリバースプロキシでレート制限してください。`X-Forwarded-For`はアプリで直接信用せず、Astro adapterが提供する接続元情報を使用します。

プライバシーポリシーは実運用に合わせて更新し、必要に応じて専門家へ確認してください。本READMEおよびサイトの記載は法的助言ではありません。

## トラブルシューティング

- healthcheck: `curl http://localhost:4321/api/health/` が`{"status":"ok"}`を返すか確認。
- メール失敗: Resendのドメイン検証、From、API keyを確認。個人情報はアプリログへ出ません。
- Turnstile失敗: site key/secret、許可hostname、HTTPS終端後の公開hostnameを確認。
- hot reload: Docker DesktopでWSLディレクトリが共有対象か確認し、volumeを作り直す場合は内容を確認してから操作。

## 未設定情報

`src/data/company.ts`の代表者名、役職、所在地、電話、メール、設立日、資本金、登録番号、営業時間、対応地域、経歴、外部プロフィールは未設定です。補足表示（全国オンライン、法人・開発会社対応、NDA）と料金表示も確認できるまでfalseです。公開事例はdraftサンプルのみです。
