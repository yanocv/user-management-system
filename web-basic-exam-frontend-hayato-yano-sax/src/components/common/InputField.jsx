import React from "react";
import styles from "./InputField.module.scss";

export const InputField = ({ anchor }) => {
  return (
    <div className={`form-floating mb-3 ${styles.container}`}>
      <input
        type={anchor.type}
        className={`form-control ${styles.input}`}
        id={anchor.id}
        placeholder={anchor.placeholder}
        required={anchor.required}
        onChange={anchor.onEvent}
        value={anchor.value}
      />
      <label htmlFor={anchor.id} className={`form-label ${styles.label}`}>
        {anchor.placeholder}
      </label>
    </div>
  );
};
