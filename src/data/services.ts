export type Service = {
	name: string;
	category: string;
	description: string;
	clients: string[];
	examples: string[];
	tech: string[];
};

export const services: Service[] = [
	{
		name: '業務システム開発',
		category: 'Enterprise',
		description: '会計・在庫・物流・人事など、業務要件に合わせた基幹系システムを小回りよく設計・開発します。',
		clients: ['中小製造業', '物流・倉庫事業者', '専門商社'],
		examples: ['受発注管理の刷新', '既存システムのクラウド移行', 'バッチ処理の性能改善'],
		tech: ['Java', 'Spring Boot', 'MySQL', 'PostgreSQL']
	},
	{
		name: 'Webアプリケーション開発',
		category: 'Web Application',
		description: 'BtoB/BtoC の業務効率化ツールや顧客向けポータルをスピーディーに立ち上げます。',
		clients: ['スタートアップ', '業務委託チーム', 'DX推進部門'],
		examples: ['予約・決済フローの構築', '業務ポータルのフロント/バックエンド開発', '社内SaaSの新機能追加'],
		tech: ['TypeScript', 'Next.js', 'NestJS', 'AWS']
	},
	{
		name: 'ECサイト構築',
		category: 'E-Commerce',
		description: 'EC-CUBEやShopifyをベースに、要件に合わせたストア構築・カスタマイズ・運用改善を行います。',
		clients: ['D2Cブランド', '小売事業者', 'BtoB卸業'],
		examples: ['決済・配送の拡張', 'デザインテーマのリニューアル', '商品データ移行と業務連携'],
		tech: ['EC-CUBE', 'Shopify', 'PHP', 'Liquid']
	},
	{
		name: 'Webサイト制作',
		category: 'Website',
		description: 'コーポレートサイトや採用サイトをシンプルに。CMS連携や高速化、アクセシビリティを意識した構築を行います。',
		clients: ['IT企業', '士業事務所', '教育機関'],
		examples: ['LP制作', 'CMSリプレイス', 'パフォーマンス改善'],
		tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'WordPress']
	}
];
