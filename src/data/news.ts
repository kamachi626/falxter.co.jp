export type NewsItem = {
	date: string
	category: string
	title: string
	slug?: string
	summary?: string
}\n
export const newsList: NewsItem[] = [
	{
		date: '2025-04-12',
		category: 'お知らせ',
		title: 'ゴールデンウィーク期間のサポート体制について',
		slug: 'gw-support-2025',
		summary: '連休期間の問い合わせ対応スケジュールをお知らせします。'
	},
	{
		date: '2025-03-28',
		category: '技術ブログ',
		title: '小規模チームでのAPI開発体制づくり',
		summary: '設計レビューや自動テストの進め方など、実務での工夫を紹介します。'
	},
	{
		date: '2025-02-16',
		category: 'メンテナンス',
		title: '一部サービスの計画メンテナンス実施',
		summary: '深夜帯におけるデータベースメンテナンスを実施します。'
	}
]
