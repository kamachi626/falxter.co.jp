export type SystemSupportSection = {
  id: "assessment" | "spot-maintenance" | "ongoing-maintenance" | "development";
  number: string;
  title: string;
  audience: string;
  description: string;
  groups: { label: string; items: string[] }[];
  price: string;
  termsLabel: "期間" | "契約形態";
  terms: string;
  note?: string;
  contactService: string;
};

export const systemSupportPageNavigation = [
  { label: "調査・引き継ぎ", href: "#assessment" },
  { label: "スポット保守・改修", href: "#spot-maintenance" },
  { label: "継続保守・改修", href: "#ongoing-maintenance" },
  { label: "周辺機能・新規システム開発", href: "#development" },
] as const;

export const systemSupportConsultations = [
  "担当者が退職し、構成や仕様が分からない",
  "資料や設計書が不足している",
  "不具合を直せる技術者がいない",
  "保守会社や開発会社を変更したい",
  "既存システムへ機能を追加したい",
  "管理画面、API、バッチなどの周辺機能が必要",
  "継続的な保守・改修を依頼したい",
  "全面刷新と段階改修のどちらがよいか判断できない",
] as const;

export const systemSupportSections: SystemSupportSection[] = [
  {
    id: "assessment",
    number: "01",
    title: "既存システムの調査・引き継ぎ",
    audience: "担当者不在、資料不足、構成や仕様が分からない既存システム",
    description:
      "コード、データベース、実行環境、外部連携、運用方法などを確認し、現在の構成、課題、リスク、今後の対応方針を整理します。",
    groups: [
      {
        label: "主な調査対象",
        items: [
          "アプリケーション構成",
          "使用技術と依存ライブラリ",
          "データベース構成",
          "バッチや外部連携",
          "サーバー、クラウド、実行環境",
          "デプロイ、バックアップ、監視",
          "運用方法と保守体制",
          "保守上の問題と優先順位",
        ],
      },
      {
        label: "成果物",
        items: [
          "調査報告書",
          "システム構成の整理",
          "リスク一覧",
          "改善ロードマップ",
          "今後の改修に必要な概算工数と前提条件",
          "引き継ぎ資料",
        ],
      },
    ],
    price: "50万円〜（税別）",
    termsLabel: "期間",
    terms: "2〜4週間程度",
    note: "対象範囲、必要なアクセス環境、資料の有無などを確認した上で、正式にお見積もりします。",
    contactService: "system-assessment",
  },
  {
    id: "spot-maintenance",
    number: "02",
    title: "スポット保守・改修",
    audience: "修正内容や対象箇所がある程度明確な不具合修正、機能追加、調査依頼",
    description:
      "既存の業務システムやWebアプリケーションを対象に、不具合調査、プログラム修正、機能追加、テスト、リリースまで対応します。",
    groups: [
      {
        label: "主な対応内容",
        items: [
          "不具合の原因調査",
          "プログラム修正",
          "小規模な機能追加",
          "データ修正",
          "バッチや帳票の修正",
          "外部サービス連携の修正",
          "テストとリリース",
          "一時的な技術支援",
        ],
      },
    ],
    price: "個別見積もり",
    termsLabel: "期間",
    terms: "内容と対象範囲により決定",
    note: "修正内容が明確な場合は、調査・引き継ぎサービスを経ずに対応を開始できます。",
    contactService: "spot-maintenance",
  },
  {
    id: "ongoing-maintenance",
    number: "03",
    title: "継続保守・改修",
    audience: "継続的な不具合対応、機能改善、運用支援を必要とするシステム",
    description:
      "既存システムの状況を継続的に把握し、不具合対応、機能追加、運用上の改善、リリース支援などを行います。",
    groups: [
      {
        label: "主な対応内容",
        items: [
          "継続的な不具合調査と修正",
          "機能追加と改善",
          "定期的なリリース",
          "技術的負債の段階的な解消",
          "運用手順の整理",
          "保守資料の更新",
          "技術相談",
          "必要に応じた調査と改善提案",
        ],
      },
    ],
    price: "月額30万円〜（税別）",
    termsLabel: "契約形態",
    terms: "対応範囲と稼働量に応じて個別に決定",
    contactService: "continuous-maintenance",
  },
  {
    id: "development",
    number: "04",
    title: "周辺機能・新規システム開発",
    audience: "既存環境と連携する機能や、中小規模の新規業務システムが必要な場合",
    description:
      "既存システムと連携する管理画面、API、バッチ、データ連携機能などを開発します。業務内容に応じて、中小規模の新規システム開発にも対応します。",
    groups: [
      {
        label: "主な対応例",
        items: [
          "管理画面",
          "API",
          "バッチ処理",
          "データ連携",
          "帳票出力",
          "外部サービス連携",
          "業務支援ツール",
          "中小規模のWebシステム",
        ],
      },
    ],
    price: "個別見積もり",
    termsLabel: "期間",
    terms: "要件と対象範囲により決定",
    contactService: "new-system-development",
  },
];

export const systemSupportProcess = [
  {
    number: "01",
    title: "ご相談・事前確認",
    description: "現在の状況、希望する対応、資料の有無、利用環境などを確認します。",
  },
  {
    number: "02",
    title: "必要な工程と対象範囲を整理",
    description: "調査が必要か、直接改修できるか、継続対応が適切かを整理します。",
  },
  {
    number: "03",
    title: "調査・改修・開発を実施",
    description: "合意した対象範囲に基づき、必要な作業を実施します。",
  },
  {
    number: "04",
    title: "報告・リリース・今後の対応",
    description: "実施内容を報告し、必要に応じてリリース、引き継ぎ、継続保守へ進みます。",
  },
] as const;

export const systemSupportTechnologies = [
  {
    label: "アプリケーション開発",
    value: "Java / Ruby on Rails / PHP（Laravel） / TypeScript / JavaScript",
  },
  { label: "データベース", value: "MySQL / PostgreSQL" },
  { label: "インフラ・運用", value: "AWS / Linux / Docker" },
] as const;

export const systemSupportExclusions = [
  "法令や契約上アクセスできない環境の調査",
  "必要な権限や情報が提供されない状態での作業",
  "合意した範囲外の作業",
  "調査前の成果や復旧の保証",
  "第三者サービスの仕様や提供状況に依存する問題",
  "24時間365日の監視や即時対応を前提とする運用",
] as const;

export const systemSupportFaqs = [
  {
    question: "資料や仕様書がなくても依頼できますか",
    answer:
      "はい。コード、データベース、実行環境、運用状況など、確認可能な情報から対象範囲と進め方を整理します。",
  },
  {
    question: "調査を行わず、保守・改修だけ依頼できますか",
    answer:
      "はい。修正内容と対象箇所が明確な場合は、調査・引き継ぎを経ずにスポット保守・改修から開始できます。",
  },
  {
    question: "調査後に保守・改修も依頼できますか",
    answer: "はい。調査結果をもとに、スポット改修または継続保守・改修の対応範囲をご案内します。",
  },
  {
    question: "調査だけで終了しても問題ありませんか",
    answer:
      "問題ありません。調査報告書と整理した情報をご確認いただき、その後の対応は別途ご判断いただけます。",
  },
  {
    question: "記載のない技術や古いシステムにも対応できますか",
    answer:
      "システム構成、バージョン、依存ライブラリ、実行環境を確認した上で、対応可否をご案内します。",
  },
  {
    question: "どのサービスを選べばよいか分かりません",
    answer: "事前確認で現在の状況と希望する対応を伺い、必要な工程と適した進め方を整理します。",
  },
] as const;
