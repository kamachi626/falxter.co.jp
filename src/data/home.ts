export type SupportExample = {
  title: string;
  category: string;
  hook: string;
  challenge: string;
  response: string;
  technologies: string[];
  duration?: string;
  deliverables?: string[];
  expectedState: string;
};

export const supportExamples: SupportExample[] = [
  {
    title: "業務システムの保守引き継ぎ",
    category: "既存システム診断・引き継ぎ",
    hook: "仕様書なしの引き継ぎ",
    challenge: "前任会社からの資料が不足し、構成や日常運用を把握しにくい状態。",
    response:
      "ソースコード、データベース、定期バッチを確認し、構成と障害原因の確認箇所を整理します。",
    technologies: ["Java", "PostgreSQL"],
    duration: "2〜4週間程度",
    deliverables: ["調査報告書", "構成整理", "リスク一覧", "改善ロードマップ"],
    expectedState: "システム構成と運用上の確認箇所が分かり、保守・改修の優先順位を決められる状態。",
  },
  {
    title: "既存Webシステムの段階的な機能改修",
    category: "既存システムの保守・改修",
    hook: "稼働中のWebシステムを段階改修",
    challenge: "既存仕様を確認しながら、現在の稼働環境を維持して改修する必要がある状態。",
    response: "コードと動作を調査し、影響範囲を記録してから機能追加と不具合修正を行います。",
    technologies: ["MySQL", "AWS"],
    expectedState: "稼働中の環境を維持しながら、優先度の高い箇所から改修できる状態。",
  },
  {
    title: "会員向けWebシステムの改修",
    category: "既存システムの保守・改修",
    hook: "影響範囲を調査して機能修正",
    challenge: "既存コードの仕様と変更による影響範囲を確認した上で、機能を修正する必要がある状態。",
    response: "既存コードを調査し、影響範囲の確認、機能修正、テスト、リリースを行います。",
    technologies: ["JavaScript", "TypeScript", "AWS"],
    expectedState: "変更箇所と試験結果が記録され、次回以降の改修判断に使える状態。",
  },
];

export type HomeFaq = {
  question: string;
  answer: string;
};

export const homeFaqs: HomeFaq[] = [
  {
    question: "他社が開発したシステムでも対応できますか？",
    answer:
      "はい。契約関係とアクセス権限を確認した上で、既存コードや実行環境を調査し、対応可否と必要な範囲をご案内します。",
  },
  {
    question: "仕様書がなくても相談できますか？",
    answer:
      "はい。閲覧可能なコード、データベース、ログ、画面、関係者へのヒアリングをもとに調査範囲を組み立てます。",
  },
  {
    question: "どのような技術のシステムに対応できますか？",
    answer:
      "主な経験技術は、Java、PHP、Ruby on Rails、JavaScript、TypeScriptなどです。記載のない技術についても、バージョン、依存ライブラリ、実行環境を確認した上で対応可否をご案内します。",
  },
  {
    question: "小規模な修正だけでも依頼できますか？",
    answer:
      "はい。スポット調査や不具合修正、小規模な機能追加も、影響範囲を確認した上で個別にお見積もりします。",
  },
  {
    question: "相談時に何を用意すればよいですか？",
    answer:
      "現在困っていること、対象システムの用途、分かる範囲の使用技術や管理状況をお知らせください。資料が揃っていなくてもご相談いただけます。",
  },
  {
    question: "1ページプランと最大5ページプランの違いは何ですか？",
    answer:
      "1ページプランは会社や事業の概要を1ページにまとめ、最大5ページプランはサービスや会社情報などを複数ページに分けて整理します。掲載する情報量に応じてご案内します。",
  },
  {
    question: "1ページに収まるか分からない場合も相談できますか？",
    answer:
      "はい。掲載したい内容を確認し、15万円の1ページプランと30万円の最大5ページプランのどちらが適しているかをご案内します。",
  },
  {
    question: "Webサイト制作後の保守も依頼できますか？",
    answer:
      "公開後の保守は標準料金に含みません。更新内容や頻度を確認した上で、対応範囲と料金をご案内します。",
  },
];

export const contactAssurances = [
  "仕様書がなくても相談可能",
  "他社が開発したシステムも相談可能",
  "Web制作のプランが未定でも相談可能",
];

export const contactCondition =
  "実際の調査・改修にあたっては、契約関係とアクセス権限を確認します。";
