export type SkillCategory = {
	name: string;
	items: string[];
};

export const skillCategories: SkillCategory[] = [
	{
		name: '言語',
		items: ['Java', 'PHP', 'Ruby', 'C#', 'JavaScript', 'TypeScript']
	},
	{
		name: 'フレームワーク',
		items: ['Spring Boot', 'Laravel', 'Ruby on Rails', 'Next.js', 'NestJS', 'Astro']
	},
	{
		name: 'データベース',
		items: ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite']
	},
	{
		name: 'インフラ・クラウド',
		items: ['Linux', 'Windows Server', 'AWS', 'Docker', 'nginx']
	},
	{
		name: 'ツール・その他',
		items: ['GitHub', 'GitLab CI/CD', 'Terraform', 'Figma', 'Notion']
	}
];
