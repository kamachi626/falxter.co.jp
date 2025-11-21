export type Service = {
title: string;
description: string;
clients: string;
features: string[];
stack: string[];
};

export const services: Service[] = [
{
title: '業務システム開発',
description: '販売・在庫・会計などの基幹システムを、既存業務に合わせて丁寧に設計・開発します。',
clients: '中小企業 / スタートアップ / 部門単位のDXを進めたい企業',
features: ['要件定義〜保守まで一気通貫で対応', '業務ヒアリングからの画面・API設計', '既存システムの改修・移行にも対応'],
stack: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'AWS'],
},
{
title: 'Webアプリケーション開発',
description: 'BtoB/BtoC を問わず、使いやすさとセキュリティを重視したWebアプリを構築します。',
clients: '新規プロダクト開発 / 内部ツールの内製化',
features: ['フロント〜バックエンドのフルスタック対応', 'アクセシビリティを意識したUI', 'CI/CDの導入支援'],
stack: ['TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'Docker'],
},
{
title: 'ECサイト構築',
description: 'EC-CUBE や Shopify などのプラットフォームを用いたスピーディな構築とカスタマイズを提供します。',
clients: 'ネット通販事業者 / D2C ブランド / 既存ECのリニューアル検討企業',
features: ['テンプレートのカスタマイズ', '決済・物流周りの連携', '運用しやすい管理画面設計'],
stack: ['EC-CUBE', 'Shopify', 'PHP', 'MySQL'],
},
{
title: 'Webサイト制作',
description: 'コーポレートサイトや採用サイトを、CMSやヘッドレスCMSを組み合わせてスムーズに運用できる形で構築します。',
clients: 'コーポレート / プロダクトサイト / LP',
features: ['多言語展開に対応', '表示速度とSEOを意識した設計', 'アクセシブルなフロントエンド'],
stack: ['Astro', 'Headless CMS', 'Tailwind CSS', 'Vercel'],
},
];
