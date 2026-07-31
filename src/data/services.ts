export type WebsitePlan = {
  id: "one-page" | "five-page";
  name: string;
  shortName: string;
  contactCategory: string;
  price: string;
  pageCount: string;
  structure: string;
  duration: string;
  design: string;
  revision: string;
  audience: string;
  included: string[];
  exclusions: string[];
};

export const sharedWebsiteInclusions = [
  "セミオリジナルデザイン1案",
  "スマートフォン・タブレット対応",
  "問い合わせフォーム",
  "基本SEO設定",
  "OGP設定",
  "Google Analytics 4等の基本的なアクセス解析設定",
  "本番環境への公開作業",
  "初稿に対する一括修正1回",
];

export const sharedWebsiteExclusions = [
  "原稿の新規作成、取材、インタビュー",
  "写真撮影、ロゴ・イラスト制作",
  "WordPressなどのCMS、ブログ・お知らせ更新機能",
  "採用管理、会員、予約、決済、EC、多言語機能",
  "外部システムとの複雑な連携",
  "複雑なサーバー・メールサーバー移行",
  "大量の既存コンテンツ移行",
  "公開後の継続保守",
  "検索順位を目的とした継続的なSEO施策",
];

export const websiteContactCategories = [
  "1ページ会社サイト制作（15万円）",
  "最大5ページのコーポレートサイト制作（30万円）",
  "どちらのプランが適切か相談したい",
] as const;

export const websiteConsultCategory = websiteContactCategories[2];

export const systemContactCategories = [
  "既存システムの調査・引き継ぎ",
  "スポット保守・改修",
  "継続保守・改修",
  "周辺機能・新規システム開発",
  "どの対応が適切か相談したい",
] as const;

export const systemSupportAudiences = [
  "仕様書や設計資料が不足しているシステム",
  "担当者や開発会社から引き継げていないシステム",
  "障害や不具合が発生している業務システム",
  "改修や機能追加が必要なWebアプリケーション",
  "継続的な保守担当が必要なシステム",
  "既存環境と連携する新規機能や周辺システム",
] as const;

export const systemSupportMethods = [
  {
    title: "調査・引き継ぎ",
    description:
      "コード、データベース、実行環境、運用状況を確認し、システム構成、技術上のリスク、優先すべき改善項目を整理します。",
    price: "50万円〜（税別）",
    href: "/services/system-support/#assessment",
  },
  {
    title: "スポット保守・改修",
    description:
      "不具合調査、障害原因調査、小規模な機能追加、既存機能の修正、更新作業などに対応します。",
    price: "個別見積もり",
    href: "/services/system-support/#spot-maintenance",
  },
  {
    title: "継続保守・改修",
    description: "月次の保守、継続的な改修、AWS等の実行環境の運用支援に対応します。",
    price: "月額30万円〜（税別）",
    href: "/services/system-support/#ongoing-maintenance",
  },
  {
    title: "周辺機能・新規システム開発",
    description:
      "既存システムと連携する管理画面、業務支援ツール、Webアプリケーション、API、バッチ処理などの新規開発にも対応します。",
    price: "個別見積もり",
    href: "/services/system-support/#development",
  },
] as const;

export const websitePlans: WebsitePlan[] = [
  {
    id: "one-page",
    name: "1ページ会社サイト制作",
    shortName: "1ページプラン",
    contactCategory: websiteContactCategories[0],
    price: "15万円（税別）",
    pageCount: "1ページ",
    structure: "8セクションまで",
    duration: "3〜4週間",
    design: "セミオリジナルデザイン1案",
    revision: "初稿に対する一括修正1回",
    audience: "会社や事業の概要を簡潔にまとめたい場合",
    included: [
      "1ページ完結",
      "8セクションまで",
      "ページ内ナビゲーション",
      ...sharedWebsiteInclusions,
    ],
    exclusions: [
      "2ページ以上への分割",
      "8セクションを超える構成",
      "複雑なアニメーション",
      ...sharedWebsiteExclusions,
    ],
  },
  {
    id: "five-page",
    name: "最大5ページのコーポレートサイト制作",
    shortName: "最大5ページプラン",
    contactCategory: websiteContactCategories[1],
    price: "30万円（税別）",
    pageCount: "最大5ページ",
    structure: "最大5ページの範囲で構成を調整",
    duration: "4〜6週間",
    design: "セミオリジナルデザイン1案",
    revision: "初稿に対する一括修正1回",
    audience: "サービスや会社情報を複数ページに分けて整理したい場合",
    included: ["最大5ページ", ...sharedWebsiteInclusions],
    exclusions: ["6ページ目以降の追加ページ", ...sharedWebsiteExclusions],
  },
];

export type Service = {
  slug: string;
  contactService: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  cardSummary: string;
  cardAudience: string;
  cardDeliverables: string;
  cardDuration: string;
  homeDetails: { label: string; value: string }[];
  audience: string[];
  challenges: string[];
  work: string[];
  scope: string[];
  deliverables: string[];
  process: string[];
  duration: string;
  price: string;
  exclusions: string[];
  notice?: string;
  priceNote?: string;
  detailSections?: { title: string; intro?: string; items: string[] }[];
  plans?: WebsitePlan[];
  faqs: { question: string; answer: string }[];
};
export const services: Service[] = [
  {
    slug: "corporate-website",
    contactService: "website-consultation",
    title: "中小企業向けコーポレートサイト制作",
    seoTitle: "中小企業向けWebサイト制作・15万円／30万円固定｜FALXTER株式会社",
    seoDescription:
      "中小企業向けに、1ページ15万円と最大5ページ30万円の固定料金でコーポレートサイトを制作します。スマートフォン対応、問い合わせフォーム、基本SEO、公開作業まで対応します。",
    summary:
      "会社や事業の情報量に合わせて、1ページ完結の会社サイトと、最大5ページのコーポレートサイトをご用意しています。どちらもスマートフォン対応、問い合わせフォーム、基本SEO、公開作業までを固定料金で提供します。",
    cardSummary:
      "会社や事業の情報量に合わせて、1ページ完結の会社サイトと、最大5ページのコーポレートサイトを固定料金で制作します。",
    cardAudience: "会社案内サイトの新規制作・小規模リニューアル",
    cardDeliverables: "公開サイト、ソースコード、運用手順",
    cardDuration: "1ページ：3〜4週間／最大5ページ：4〜6週間",
    homeDetails: [
      {
        label: "1ページプラン",
        value: "15万円（税別）／1ページ・8セクションまで／3〜4週間",
      },
      {
        label: "最大5ページプラン",
        value: "30万円（税別）／最大5ページ／4〜6週間",
      },
      { label: "デザイン", value: "いずれもセミオリジナルデザイン1案" },
      {
        label: "標準対応",
        value:
          "スマートフォン・タブレット対応、問い合わせフォーム、基本SEO設定、OGP設定、アクセス解析の基本設定、公開作業、修正1回",
      },
      {
        label: "デザインの調整",
        value:
          "基本となる設計をもとに、企業のロゴ、配色、写真、事業内容に合わせてデザインを調整します",
      },
      { label: "修正", value: "いずれも初稿確認後の修正1回" },
      {
        label: "素材",
        value: "原稿、写真、ロゴ、会社情報は、原則としてお客様にご用意いただきます。",
      },
      {
        label: "標準外",
        value: "CMS、原稿作成、写真撮影、追加ページ、複雑な移行などは個別見積もり",
      },
    ],
    audience: [
      "会社や事業の概要を1ページにまとめたい中小企業・個人事業者・小規模法人",
      "会社案内として必要な基本情報を分かりやすく整理したい中小企業",
      "小規模な既存サイトをリニューアルしたい企業",
    ],
    challenges: [
      "会社サイトが古く、スマートフォンに対応していない",
      "事業内容や強みが伝わらない",
      "問い合わせにつながる導線がない",
    ],
    work: [
      "掲載情報に応じた1ページまたは最大5ページの構成整理",
      "セミオリジナルデザイン1案",
      "スマートフォン・タブレット対応",
      "問い合わせフォーム",
      "基本SEO・SNS共有設定",
      "アクセス解析の基本設定",
      "本番環境への公開作業",
      "初稿に対する一括修正1回",
    ],
    scope: [
      "1ページ・8セクションまで、または最大5ページ",
      "セミオリジナルデザイン1案",
      "スマートフォン・タブレット対応",
      "問い合わせフォーム",
      "基本SEO、OGP、sitemap、robots.txt",
      "Google Analytics 4等の基本的なアクセス解析設定",
      "公開作業",
      "修正1回",
    ],
    deliverables: ["公開済みWebサイト", "ソースコード", "基本的な更新・運用手順"],
    process: [
      "お問い合わせ",
      "ヒアリング",
      "ページ構成と素材の確認",
      "ご契約",
      "原稿・写真等の受領",
      "デザイン・実装",
      "初稿確認と修正1回",
      "公開",
    ],
    duration:
      "1ページプランは3〜4週間、最大5ページプランは4〜6週間。必要な素材が揃い、構成が確定してからの目安です。",
    price: "1ページプラン：15万円（税別）／最大5ページプラン：30万円（税別）",
    priceNote:
      "文章原稿、写真、ロゴ、会社情報をご用意いただく規格型の制作プランです。標準範囲を超える機能や作業は、内容を確認した上で個別にお見積もりします。",
    plans: websitePlans,
    exclusions: sharedWebsiteExclusions,
    detailSections: [
      {
        title: "両プランに共通して含まれる内容",
        intro: "既存の設計パターンを基に、企業のロゴ、配色、写真、事業内容に合わせて調整します。",
        items: sharedWebsiteInclusions,
      },
      {
        title: "1ページプランの構成例",
        intro:
          "8セクションまでの範囲で、事業内容に合わせて掲載順序と構成を調整します。以下は構成例であり、必須項目ではありません。",
        items: [
          "メインビジュアル",
          "会社または事業の紹介",
          "サービス紹介",
          "特徴・選ばれる理由",
          "実績または代表者紹介",
          "会社概要",
          "よくある質問",
          "お問い合わせ",
        ],
      },
      {
        title: "最大5ページプランの構成例",
        intro:
          "事業内容に応じて、最大5ページの範囲で構成を調整します。以下は構成例であり、ページ名を固定するものではありません。",
        items: [
          "トップページ",
          "事業・サービス紹介",
          "会社情報",
          "実績、採用、よくある質問などから1ページ",
          "お問い合わせ",
        ],
      },
      {
        title: "お客様にご用意いただくもの",
        intro:
          "文章原稿、写真、ロゴ、会社情報は原則としてお客様にご用意いただきます。必要な素材や形式は制作開始前にご案内します。",
        items: [
          "掲載する文章原稿",
          "写真",
          "ロゴデータ",
          "会社情報",
          "問い合わせ先",
          "必要なサーバー、ドメイン、アクセス解析等のアカウント情報",
        ],
      },
      {
        title: "標準料金に含まれない内容",
        intro: "プランごとの標準範囲を超える場合は、内容を確認した上で個別にお見積もりします。",
        items: [
          "各プランのページ数・セクション数を超える構成",
          "原稿の新規作成、取材、インタビュー",
          "写真撮影、ロゴ・イラスト制作",
          "WordPressなどのCMS、ブログ・お知らせ更新機能",
          "採用管理、会員、予約、決済、EC、多言語機能",
          "複雑なアニメーションや外部システム連携",
          "複雑なサーバー・メールサーバー移行",
          "大量の既存コンテンツ移行",
          "公開後の継続保守",
          "検索順位を目的とした継続的なSEO施策",
        ],
      },
      {
        title: "制作の流れ",
        items: [
          "お問い合わせ",
          "ヒアリング",
          "ページ構成と素材の確認",
          "ご契約",
          "原稿・写真等の受領",
          "デザイン・実装",
          "初稿確認と修正1回",
          "公開",
        ],
      },
    ],
    faqs: [
      {
        question: "1ページプランと最大5ページプランの違いは何ですか？",
        answer:
          "1ページプランは、会社や事業の概要を1ページにまとめるプランです。最大5ページプランは、サービス、会社情報、実績、よくある質問などを複数ページに分けて整理できます。掲載したい情報量や、検索結果から個別に案内したいページの有無に応じてご案内します。",
      },
      {
        question: "1ページに収まるか分からない場合も相談できますか？",
        answer:
          "はい。掲載したい内容を確認し、1ページプランと最大5ページプランのどちらが適しているかをご案内します。",
      },
      {
        question: "1ページプランを後から複数ページにできますか？",
        answer:
          "可能です。ただし、公開後のページ追加やサイト構成の変更は標準料金に含まれないため、内容を確認して個別にお見積もりします。",
      },
      {
        question: "1ページプランにも問い合わせフォームは含まれますか？",
        answer:
          "はい。標準的な問い合わせフォームを含みます。複雑な入力項目、予約、決済、会員機能などは個別見積もりです。",
      },
      {
        question: "1ページプランでもスマートフォンに対応しますか？",
        answer:
          "はい。スマートフォン、タブレット、パソコンで閲覧できるレスポンシブデザインで制作します。",
      },
      {
        question: "15万円・30万円の料金には何が含まれますか？",
        answer:
          "どちらのプランにも、セミオリジナルデザイン、スマートフォン対応、問い合わせフォーム、基本SEO、アクセス解析の基本設定、公開作業、初稿に対する一括修正1回が含まれます。原稿、写真、ロゴ、会社情報は、原則としてお客様にご用意いただきます。",
      },
      {
        question: "修正1回とは、どのような意味ですか？",
        answer:
          "初稿をご確認いただいた後、修正内容をまとめてご連絡いただき、その内容を一括して反映する1回を指します。制作範囲や構成を大きく変更する場合は、個別にお見積もりします。",
      },
      {
        question: "原稿や写真も作成してもらえますか？",
        answer:
          "文章原稿、写真、ロゴ、会社情報は原則としてお客様にご用意いただきます。原稿作成、取材、写真撮影などが必要な場合は、内容を確認して個別にご案内します。",
      },
      {
        question: "WordPressなどのCMSは含まれますか？",
        answer:
          "標準プランにはCMSを含みません。ブログやお知らせをお客様自身で更新する必要がある場合は、要件を確認した上で個別にお見積もりします。",
      },
      {
        question: "5ページを超えるサイトも依頼できますか？",
        answer:
          "可能です。6ページ目以降の追加ページや特殊な機能は、内容を確認した上で個別にお見積もりします。",
      },
      {
        question: "制作後の保守も依頼できますか？",
        answer:
          "公開後の保守は標準料金に含みません。更新内容や頻度を確認した上で、対応範囲と料金をご案内します。",
      },
    ],
  },
];
