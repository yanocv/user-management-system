import { LEVEL_INFO, SHOW_TOAST } from "./constants";

/**
 * @type {{ message: string, level: 'INFO' | 'WARN' | 'ERROR', statusCode: string | number, open: boolean}}
 *
 * トーストストアの初期値
 */
const initialState = {
  message: "",
  level: LEVEL_INFO,
  statusCode: "",
  open: false,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default toastReducer;
