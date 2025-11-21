export type News = {
	slug: string;
	date: string;
	category: string;
	title: string;
	description: string;
};

export const newsList: News[] = [
	{
		slug: 'release-2025-spring',
		date: '2025-03-18',
		category: 'お知らせ',
		title: '春の開発パートナー募集に関するご案内',
		description: '伴走型の開発パートナーをお探しの企業さま向けに、新しいサポートプランを開始しました。'
	},
	{
		slug: 'maintenance-2024-q4',
		date: '2024-12-02',
		category: 'メンテナンス',
		title: '年末年始のシステム保守体制について',
		description: '年末年始期間中のシステム保守とお問い合わせ対応スケジュールをお知らせします。'
	},
	{
		slug: 'blog-remote-dev',
		date: '2024-09-10',
		category: '技術ブログ',
		title: 'リモート開発を円滑に進めるための小さな工夫',
		description: '小規模チームでのフルリモート開発を支える、コミュニケーションとツール選定のポイントをまとめました。'
	}
];
