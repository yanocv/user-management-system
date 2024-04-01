import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Toast as ToastComponent } from "bootstrap";
import PropTypes from "prop-types";
import {
  LEVEL_INFO,
  LEVEL_WARN,
  LEVEL_ERROR,
} from "../../stores/toast/constants";

const Toast = (props) => {
  const {
    toastStore: { level, message, statusCode, open },
    showToast,
  } = props;
  const toastRef = useRef(null);
  const [toastInstance, setToastInstance] = useState(null);

  useEffect(() => {
    if (!toastRef) {
      return;
    }
    const toastElement = toastRef.current;
    const callback = () => {
      showToast({ open: false });
    };
    toastElement.addEventListener("show.bs.toast", callback);
    setToastInstance(new ToastComponent(toastElement));
  }, [showToast, toastRef]);

  useEffect(() => {
    if (open && toastInstance !== null) {
      toastInstance.show();
    }
  }, [toastInstance, open]);

  return (
    <div
      className="position-fixed bottom-0 start-0 p-3"
      style={{ zIndex: "5" }}
      role="alert"
    >
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRef}
      >
        <div
          className={clsx("toast-header text-white", {
            ["bg-info"]: level === LEVEL_INFO,
            ["bg-warning"]: level === LEVEL_WARN,
            ["bg-danger"]: level === LEVEL_ERROR,
          })}
        >
          <strong className="me-auto">{level}</strong>
          <small>{statusCode}</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  toastStore: PropTypes.exact({
    level: PropTypes.oneOf([LEVEL_INFO, LEVEL_WARN, LEVEL_ERROR]),
    message: PropTypes.string,
    statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    open: PropTypes.bool,
  }),
  showToast: PropTypes.func,
};

export { Toast };
