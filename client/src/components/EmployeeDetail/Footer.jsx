import React from "react";
import styles from "./Footer.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "../icons/ChevronLeft";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { DELETE_INFO_CONFIRMATION_EDIT_PAGE } from "../../constants/messageConst";
import { useDelete } from "./hooks/useDelete";
import { useSelector } from "react-redux";
import { EMPLOYEE_LIST_PAGE } from "../../constants/pagesUrlConst";

export const Footer = ({
  backButtonLink,
  backButtonLabel,
  registerButtonLabel,
  isEdit,
  deleteButtonLabel,
  handleForm,
}) => {
  const message = useSelector((state) => state.formModalMessage);
  const employeeId = useSelector((state) => state.employeeId);
  const modalMessage = `${message}${DELETE_INFO_CONFIRMATION_EDIT_PAGE}`;
  const navigate = useNavigate();
  const { deleteEmployee } = useDelete();
  const handleDelete = async () => {
    deleteEmployee(() => {
      navigate(EMPLOYEE_LIST_PAGE);
    });
  };

  return (
    <>
      <footer
        className={`footer bg-white d-flex align-items-center w-100 ${styles.footer}`}
      >
        <div className={`row ${styles.footerRow}`}>
          <div className="col-6 d-flex align-items-center justify-content-start">
            <Link to={backButtonLink}>
              <button className={`btn btn-outline-dark ${styles.backButton}`}>
                <ChevronLeft />
                <span className="fw-bold fs-20">{backButtonLabel}</span>
              </button>
            </Link>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-end">
            {isEdit && (
              <button
                className={`btn btn-danger fw-bold fs-20 ${styles.deleteButton} me-4`}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {deleteButtonLabel}
              </button>
            )}
            <button
              className={`btn btn-primary fw-bold fs-20 ${styles.registerButton}`}
              type="submit"
              onClick={handleForm}
            >
              {registerButtonLabel}
            </button>
          </div>
        </div>
      </footer>
      {/* The modal is not part of the footer, but it is added here just for the edit employee component. In the edit component, when the user clicks the delete button, this modal will display. But will not display if other button are clicked. It is added here because the alternative would be much more code, and here it is just some lines of bootstrap attributes added in the button; and it will not affect other components. */}
      <ConfirmationModal
        title="削除の確認"
        message={modalMessage}
        firstButtonName="キャンセル"
        secondButtonName="削除"
        buttonFunction={() => handleDelete(employeeId)}
      />
    </>
  );
};
