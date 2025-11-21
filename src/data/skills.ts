export type SkillCategory = {
name: string;
items: string[];
};

export const skillCategories: SkillCategory[] = [
{
name: '言語',
items: ['Java', 'PHP', 'Ruby', 'C#', 'JavaScript', 'TypeScript', 'SQL'],
},
{
name: 'フレームワーク',
items: ['Spring Boot', 'Laravel', 'Ruby on Rails', 'Next.js', 'NestJS', 'Express'],
},
{
name: 'データベース',
items: ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite', 'Redis'],
},
{
name: 'インフラ・クラウド',
items: ['Linux', 'Windows Server', 'AWS', 'Docker', 'Nginx'],
},
{
name: 'その他',
items: ['REST/GraphQL API 設計', 'CI/CD 構築', 'アジャイル開発', 'リモートワーク運用'],
},
];
