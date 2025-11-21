export type Work = {
title: string;
category: string;
description: string;
tech: string[];
scope: string;
};

export const works: Work[] = [
{
title: '業務受発注管理システム再構築',
category: '業務システム',
description: '老朽化したオンプレシステムをクラウド対応へ刷新し、承認フローと在庫連携を改善。',
tech: ['Java', 'Spring Boot', 'Vue.js', 'PostgreSQL', 'AWS'],
scope: '要件定義 / 設計 / 開発 / 運用設計',
},
{
title: 'サブスクリプション型ECプラットフォーム',
category: 'ECサイト',
description: '定期購入・在庫連動・顧客分析を備えたECサイトを短期間で立ち上げ。',
tech: ['Shopify', 'Node.js', 'TypeScript', 'Cloud Functions'],
scope: '設計 / フロント開発 / 決済連携 / 運用支援',
},
{
title: 'BtoB SaaS プロジェクト管理ツール',
category: 'Webアプリ',
description: 'リモートワーク向けにリアルタイムコラボレーション機能を提供するSaaSを構築。',
tech: ['Next.js', 'GraphQL', 'Hasura', 'Docker'],
scope: 'UI設計 / フロントエンド / API設計 / CI整備',
},
{
title: 'グローバル向けコーポレートサイト',
category: 'Webサイト',
description: '多言語対応とSEOを強化したコーポレートサイトをJamstack構成で構築。',
tech: ['Astro', 'Headless CMS', 'Tailwind CSS', 'Vercel'],
scope: '情報設計 / 実装 / 解析導入',
},
{
title: '販売分析ダッシュボード',
category: '業務システム',
description: '売上・在庫データを統合し、ダッシュボードで可視化する内製向けツールを開発。',
tech: ['Ruby on Rails', 'React', 'MySQL', 'AWS'],
scope: 'データモデリング / バックエンド / BI連携',
},
{
title: '会員制メディアプラットフォーム',
category: 'Webアプリ',
description: '認証・決済・配信を統合したコンテンツ配信基盤を小規模チームで構築。',
tech: ['Laravel', 'Inertia.js', 'Stripe', 'Redis'],
scope: 'フルスタック開発 / パフォーマンス改善 / 運用伴走',
},
];
