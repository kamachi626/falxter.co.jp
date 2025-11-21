export type Service = {
	title: string;
	description: string;
	clients: string;
	features: string[];
	technologies: string[];
};

export const services: Service[] = [
	{
		title: '業務システム開発',
		description: '基幹業務や社内運用に合わせた堅牢なシステムを小回りの利く体制で開発します。',
		clients: '中小企業・スタートアップ・自治体',
		features: ['要件定義から保守までワンストップ対応', 'レガシー移行や段階導入にも柔軟に対応', 'セキュリティと運用性を重視した設計'],
		technologies: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'Ruby on Rails']
	},
	{
		title: 'Webアプリケーション開発',
		description: '顧客体験を重視したWebアプリケーションを迅速に構築し、継続的に改善します。',
		clients: 'Webサービス事業者・新規事業チーム',
		features: ['フロントからバックエンドまでフルスタックで対応', '小規模チームで意思決定が早い開発体制', 'クラウドネイティブな設計でスケールに対応'],
		technologies: ['TypeScript', 'Next.js', 'Node.js', 'Astro', 'REST/GraphQL']
	},
	{
		title: 'ECサイト構築',
		description: 'EC-CUBEやShopifyを活用し、事業戦略に合わせたECサイトを構築します。',
		clients: 'D2Cブランド・小売業・卸売業',
		features: ['テーマカスタマイズと機能拡張に対応', '決済・在庫・物流との連携を設計', '運用フェーズを意識した伴走サポート'],
		technologies: ['EC-CUBE', 'Shopify', 'PHP', 'Liquid', 'MySQL']
	},
	{
		title: 'Webサイト制作',
		description: 'ブランドメッセージを端的に伝えるコーポレートサイトや採用サイトを制作します。',
		clients: '企業広報・採用チーム・個人事業主',
		features: ['静的サイトからヘッドレスCMSまで柔軟に提案', 'パフォーマンスとアクセシビリティを重視', '運用しやすい更新フローの設計'],
		technologies: ['Astro', 'Tailwind CSS', 'Headless CMS', 'Vite']
	}
];
