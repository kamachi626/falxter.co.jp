export type Work = {
	name: string
	summary: string
	tech: string[]
	scope: string
}\n
export const works: Work[] = [
	{
		name: '物流会社向け業務基幹システム刷新',
		summary: '在庫・配送管理を一元化し、運用業務の自動化とレポート基盤を整備。',
		tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
		scope: '要件定義 / 設計 / 実装 / 保守'
	},
	{
		name: 'BtoB向けSaaSダッシュボード',
		summary: '顧客別の権限管理とモニタリング機能を備えた管理ポータルを開発。',
		tech: ['TypeScript', 'Next.js', 'Lambda'],
		scope: '設計 / 実装 / CI/CD整備'
	},
	{
		name: 'メーカー公式ECサイト構築',
		summary: 'EC-CUBEをベースに決済・配送連携を組み込み、顧客に合わせたUIを提供。',
		tech: ['EC-CUBE', 'PHP', 'MySQL'],
		scope: '要件定義 / カスタマイズ / 保守'
	},
	{
		name: '採用コーポレートサイト',
		summary: '少人数チームで高速に立ち上げ、CMS連携とパフォーマンスを重視した構成を採用。',
		tech: ['Astro', 'Tailwind CSS', 'TypeScript'],
		scope: '設計 / 実装 / コンテンツ投入支援'
	}
]
