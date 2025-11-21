export type Work = {
	title: string;
	category: string;
	overview: string;
	tech: string[];
	roles: string[];
};

export const works: Work[] = [
	{
		title: '受発注管理システム再構築',
		category: '業務システム',
		overview: '老朽化したオンプレ基幹をクラウドに刷新。バッチ処理の高速化とUIの改善を実施。',
		tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
		roles: ['要件定義', '基本設計', '実装', '運用保守']
	},
	{
		title: 'BtoBポータル開発',
		category: 'Webアプリ',
		overview: '加盟店向けダッシュボードの新規構築。アクセス制御とレポート機能を提供。',
		tech: ['TypeScript', 'Next.js', 'NestJS', 'MySQL'],
		roles: ['フロントエンド', 'バックエンド', 'CI/CD']
	},
	{
		title: 'Shopify ストア拡張',
		category: 'EC',
		overview: '定期購入とポイント連携をカスタムアプリで実装。運用チーム向けの管理画面も追加。',
		tech: ['Shopify', 'Liquid', 'TypeScript'],
		roles: ['要件整理', 'アプリ開発', 'テーマ改修']
	},
	{
		title: 'EC-CUBE 4 カスタマイズ',
		category: 'EC',
		overview: '卸売業向けのBtoB EC。価格テーブルやステータス管理を拡張し、外部基幹とデータ連携。',
		tech: ['EC-CUBE', 'PHP', 'PostgreSQL'],
		roles: ['設計', '実装', 'データ移行']
	},
	{
		title: 'コーポレートサイトリニューアル',
		category: 'Webサイト',
		overview: 'シンプルで高速なコーポレートサイトを構築。CMSなしの静的サイトで管理負荷を低減。',
		tech: ['Astro', 'Tailwind CSS', 'TypeScript'],
		roles: ['デザイン', '実装', 'パフォーマンス調整']
	},
	{
		title: 'クラウド移行支援',
		category: 'インフラ',
		overview: 'オンプレ運用の業務システムを段階的にAWSへ移行。監視とバックアップ設計を含めて伴走。',
		tech: ['Linux', 'AWS', 'MySQL'],
		roles: ['計画策定', '移行作業', '運用ドキュメント']
	}
];
