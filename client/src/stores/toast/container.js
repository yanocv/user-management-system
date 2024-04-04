import { connect } from "react-redux";
import { Toast } from "../../components/common/Toast";
import { showToast } from "./action";

const mapStoreToProps = (store) => ({
  toastStore: store.toastStore,
});

const mapDispatchToProps = (dispatch) => ({
  showToast: (v) => dispatch(showToast(v)),
});

const connetedToast = connect(mapStoreToProps, mapDispatchToProps)(Toast);
export { connetedToast as Toast };
