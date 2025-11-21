export type SkillCategory = {
	category: string;
	items: string[];
};

export const skillCategories: SkillCategory[] = [
	{
		category: '言語',
		items: ['Java', 'PHP', 'Ruby', 'C#', 'JavaScript', 'TypeScript']
	},
	{
		category: 'フレームワーク',
		items: ['Spring Boot', 'Laravel', 'Ruby on Rails', 'Next.js', 'Astro']
	},
	{
		category: 'データベース',
		items: ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite']
	},
	{
		category: 'インフラ・クラウド',
		items: ['Linux', 'Windows Server', 'AWS', 'Docker', 'GitHub Actions']
	}
];
