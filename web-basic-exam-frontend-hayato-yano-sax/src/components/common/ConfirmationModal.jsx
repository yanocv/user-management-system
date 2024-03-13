import React from "react";
export const ConfirmationModal = ({
  title,
  message,
  firstButtonName,
  secondButtonName,
  buttonFunction,
}) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {firstButtonName}
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
              onClick={buttonFunction}
            >
              {secondButtonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
