export type News = {
	date: string;
	category: 'お知らせ' | '技術ブログ' | 'メンテナンス';
	title: string;
	slug: string;
	content: string;
};

export const newsList: News[] = [
	{
		date: '2025-05-22',
		category: 'お知らせ',
		title: '初回相談のオンライン対応を強化しました',
		slug: 'online-consulting',
		content: 'オンラインミーティングでの要件ヒアリングや技術相談を常時受け付ける体制にアップデートしました。小さなテーマからお気軽にご連絡ください。'
	},
	{
		date: '2025-04-15',
		category: '技術ブログ',
		title: 'レガシー移行プロジェクトで意識した3つのポイント',
		slug: 'legacy-migration-tips',
		content: '段階的なリプレイス計画、テスト自動化の適用範囲、モニタリング整備の観点から、最近のプロジェクトで得た知見をまとめました。'
	},
	{
		date: '2025-03-02',
		category: 'メンテナンス',
		title: 'システム保守窓口の営業時間について',
		slug: 'maintenance-hours',
		content: '保守対応の受付時間を平日10:00-18:00にて運用しています。時間外のご相談についても事前調整で柔軟に対応します。'
	}
];
