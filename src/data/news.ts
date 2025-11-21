export type News = {
slug: string;
title: string;
date: string;
category: string;
excerpt: string;
};

export const newsList: News[] = [
{
slug: '2024-12-15-release',
title: '年末年始の営業スケジュールについて',
date: '2024-12-15',
category: 'お知らせ',
excerpt: '年末年始期間中のサポート対応とお問い合わせ受付についてご案内します。',
},
{
slug: '2024-10-05-tech-blog',
title: '小規模チームでのCI/CD導入のポイント',
date: '2024-10-05',
category: '技術ブログ',
excerpt: '効率的にデプロイを回すためのワークフロー設計とツール選定についての知見共有。',
},
{
slug: '2024-07-22-maintenance',
title: 'クラウド移行に伴うメンテナンス実施のお知らせ',
date: '2024-07-22',
category: 'メンテナンス',
excerpt: 'システム安定性向上のため、夜間メンテナンスを実施します。',
},
];
