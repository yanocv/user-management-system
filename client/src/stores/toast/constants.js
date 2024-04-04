import { showToast } from "./action";

/**
 * @type {'SHOW_TOAST'}
 * トーストストアで使用するアクションのタイプ
 * トーストを表示させるアクションをディスパッチする際に使用する
 */
export const SHOW_TOAST = "SHOW_TOAST";

/**
 * @type {'INFO'}
 * トーストで表示する情報の種別
 *
 *     正常処理報告に使用する
 */
export const LEVEL_INFO = "INFO";
/**
 * @type {'WARN'}
 * トーストで表示する情報の種別
 *
 *     警告時に使用する
 */
export const LEVEL_WARN = "WARN";
/**
 * @type {'ERROR'}
 * トーストで表示する情報の種別
 *
 *     エラー時に使用する
 */
export const LEVEL_ERROR = "ERROR";

export const clearToast = (dispatch) => {
  dispatch(
    showToast({
      open: false,
    })
  );
};
