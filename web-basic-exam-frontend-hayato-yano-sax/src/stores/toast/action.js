import { SHOW_TOAST } from "./constants";

/**
 * トースト表示用のアクション
 *
 * @param {Object} payload トースト表示内容を包有したオブジェクト
 * @param {string} payload.message トーストに表示するメッセージ
 * @param {'INFO' | 'WARN' | 'ERROR'} payload.level トーストの情報レベル
 * @param {string | number} payload.statusCode トーストメッセージの右に表示するステータスコード
 * @param {boolean} payload.open トーストを表示するかどうかの真偽値 true: 開く false: 閉じる
 * @returns
 */
export const showToast = (payload) => ({
  type: SHOW_TOAST,
  payload,
});
