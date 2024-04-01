export const DEPARTMENT = {
  DEV: 0,
  NW: 1,
  VERIFY: 2,
  OFFICE: 3,
  MANAGE: 4,
} as const;

export const HOUSE_STATUS = {
  JOIN: 0,
  RETIRE: 1,
  WAIT: 2,
  CANCEL: 3,
  REST: 4,
} as const;

export const COMMISSIONING_STATUS = {
  NOT_COMMIT: 0,
  COMMIT: 1,
} as const;

export const PERMISSION = {
  ROOT: 0,
  ADMINISTRATOR: 1,
  USER: 2,
} as const;

export const SEX = {
  MALE: 0,
  FEMALE: 1,
};

export type CompanyType = keyof typeof COMPANY;

export const COMPANY = {
  SIN: 'セキュアイノベーション',
  SWI: 'セキュアウェアラブルアイル',
  SIF: 'セキュアインフラストラクチャー',
  SST: 'セキュアサスティーン',
  SOP: 'セキュアオプティマイズ',
  SAX: 'セキュアアクシス',
  STR: 'セキュアトリニティ',
  SIR: 'セキュアアイリス',
  SGK: 'セキュアギークス',
  SSQ: 'セキュアスクワッド',
  PDA: 'プラウドデータ',
  VPR: 'Vプラウド',
  PLD: 'プラウドリード',
  PLK: 'プラウドリンク',
  PFL: 'プラウドフロー',
  PUS: 'プラウドUSER',
  PGO: 'プラウドグロリア',
  LBQ: 'エルバーククオリティ',
  LBA: 'エルバークエイム',
  VLB: 'Vエルバーク',
  LBG: 'エルバークギア',
  LBC: 'エルバーククラウド',
  LBJ: 'エルバークJohn',
  LBS: 'エルバークスクリプト',
  RIS: 'ライズ',
  RKE: 'ライズカーネル',
  VRI: 'Vライズ',
  RLO: 'ライズロア',
  REX: 'ライズエクシード',
  ZHD: 'ゼディアホールディングス',
  ZRK: 'ゼディアルーク',
  ZRG: 'ゼディアレーゲン',
  ZMR: 'ゼディアミラ',
} as const;
