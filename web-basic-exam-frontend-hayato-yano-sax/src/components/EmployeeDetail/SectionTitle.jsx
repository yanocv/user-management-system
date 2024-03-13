import React from "react";
import styles from "./SectionTitle.module.scss";

export const SectionTitle = ({ title }) => {
  return (
    <div className={`${styles.sectionTitle} text-center d-flex flex-column`}>
      <h2 className="fs-3 m-0 text-start">{title}</h2>
      <hr className={`border m-0 ${styles.greyHorizontalRule}`} />
    </div>
  );
};
