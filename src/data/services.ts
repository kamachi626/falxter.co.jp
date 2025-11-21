export type Service = {
	title: string
	description: string
	clients: string
	tech: string[]
}\n
export const services: Service[] = [
	{
		title: '業務システム開発',
		description: '受託開発を中心に、要件定義から運用保守まで小回りの利く体制で支援します。',
		clients: '製造業・物流・不動産などの業務部門',
		tech: ['Java', 'Spring Boot', 'PostgreSQL']
	},
	{
		title: 'Webアプリケーション開発',
		description: '認証基盤や業務ポータルなど、使いやすさと運用性を重視したWebアプリを構築します。',
		clients: 'SaaS事業者・スタートアップ',
		tech: ['TypeScript', 'Next.js', 'AWS']
	},
	{
		title: 'ECサイト構築',
		description: 'EC-CUBEやShopifyをベースに、商品管理や決済連携を含む実用的なECサイトを届けます。',
		clients: '小売・D2C・卸売',
		tech: ['EC-CUBE', 'Shopify', 'PHP']
	},
	{
		title: 'Webサイト制作',
		description: 'コーポレートサイトや採用サイトを、軽量かつ保守しやすい構成で制作します。',
		clients: 'コーポレート・店舗・学校',
		tech: ['Astro', 'Tailwind CSS', 'TypeScript']
	}
]
