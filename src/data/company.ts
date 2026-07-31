export type Company = {
  companyName: string;
  companyNameEn: string;
  representativeName: string | null;
  representativeTitle: string | null;
  profileHeading: string;
  postalCode: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  establishedAt: string | null;
  capital: string | null;
  profile: string[];
  homepageProfile: string[];
  specialties: string[];
  deliveryPhases: string[];
  primarySkills: string[];
  relatedSkills: string[];
  socialLinks: { label: string; url: string }[];
  flags: {
    nationwideOnline: boolean;
    servesCompaniesAndVendors: boolean;
    ndaAvailable: boolean;
    showPricing: boolean;
    noindex: boolean;
  };
};

export const company: Company = {
  companyName: "FALXTER株式会社",
  companyNameEn: "FALXTER K.K.",
  representativeName: "蒲地 章悟",
  representativeTitle: "代表取締役／ソフトウェアエンジニア",
  profileHeading: "サーバーサイド開発と既存システム保守を中心に対応",
  postalCode: "〒285-0859",
  address: "千葉県佐倉市南ユーカリが丘23-10",
  phone: "050-3697-8926",
  email: "customer@falxter.co.jp",
  establishedAt: "2014年9月12日",
  capital: "1,000,000円",
  profile: [
    "ソフトウェア開発者として、Javaを中心とした業務システム開発に長く従事してきました。現在はサーバーサイド開発を主軸に、既存システムの機能追加、不具合調査、保守運用、リリースまで一貫して対応しています。",
    "PHP（Laravel）、Ruby on Rails、JavaScript、MySQL、PostgreSQL、AWSなどを利用したWebシステムの開発・保守に加え、WordPress、EC-CUBE、Shopifyを利用したコーポレートサイトおよびECサイトの構築・改修経験があります。",
    "既存コードや十分な資料が残っていない環境でも、現状を確認しながら段階的に改善することを重視しています。",
  ],
  homepageProfile: [
    "Javaを中心とした業務システム開発に長く従事し、現在はサーバーサイド開発と既存システムの保守・改修を主軸としています。",
    "不具合調査、機能追加、テスト、リリース、運用保守まで、実装を中心に一貫して対応します。",
  ],
  specialties: [
    "既存システムの調査と段階的な改善",
    "不具合調査、機能追加、リリース",
    "Webサイトからサーバー環境までの一貫対応",
  ],
  deliveryPhases: ["要件・仕様の確認", "設計", "実装", "テスト", "リリース", "運用保守"],
  primarySkills: [
    "Java",
    "PHP（Laravel）",
    "Ruby on Rails",
    "JavaScript",
    "TypeScript",
    "MySQL",
    "PostgreSQL",
    "Linux",
    "AWS",
  ],
  relatedSkills: [
    "TypeScript",
    "C#",
    "Kotlin",
    "React",
    "Next.js",
    "NestJS",
    "Vue.js",
    "Google Cloud",
    "Firebase",
    "WordPress",
    "EC-CUBE",
    "Shopify",
    "Docker",
    "Git",
  ],
  socialLinks: [],
  flags: {
    nationwideOnline: false,
    servesCompaniesAndVendors: false,
    ndaAvailable: false,
    showPricing: true,
    noindex: false,
  },
};
