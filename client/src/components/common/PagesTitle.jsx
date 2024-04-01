import React from "react";
import styles from "./PagesTitle.module.scss";

export const PageTitle = ({ title, mbClassName }) => {
  return (
    <div
      className={`page-header pt-3 text-center d-flex flex-column ${mbClassName} `}
    >
      <h1 className="m-0">{title}</h1>
      <hr
        className={`m-0 opacity-100 border border-primary ${styles.horizontalRule}`}
      />
    </div>
  );
};
