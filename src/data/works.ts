export type Work = {
	category: string;
	title: string;
	description: string;
	technologies: string[];
	scope: string;
};

export const works: Work[] = [
	{
		category: '業務システム',
		title: '販売管理システム刷新',
		description: '老朽化した販売管理システムをクラウド環境へ移行し、ワークフローを最適化。',
		technologies: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
		scope: '要件定義 / 設計 / 開発 / テスト / 運用'
	},
	{
		category: 'Webアプリケーション',
		title: 'SaaS型プロジェクト管理ツール',
		description: 'リモートチーム向けに、タスクと進捗を見える化するSaaSを短期間で提供。',
		technologies: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL'],
		scope: '仕様策定 / フロントエンド / バックエンド / CI/CD'
	},
	{
		category: 'ECサイト',
		title: 'D2CアパレルECリニューアル',
		description: 'ブランド体験を高めるため、UI刷新と決済・在庫まわりの最適化を実施。',
		technologies: ['Shopify', 'Liquid', 'TypeScript', 'Cloud Functions'],
		scope: '要件定義 / 実装 / アプリ連携 / 運用支援'
	},
	{
		category: 'Webサイト',
		title: 'コーポレートサイト制作',
		description: 'ミッションと実績を伝えるコーポレートサイトを軽量な静的生成で構築。',
		technologies: ['Astro', 'Tailwind CSS', 'Netlify'],
		scope: '情報設計 / デザイン / 実装'
	}
];
