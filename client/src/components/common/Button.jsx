import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, onClick, label }) => {
  return (
    <button
      type={type}
      className={`btn btn-primary w-100 fw-bold ${styles.btn} `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
