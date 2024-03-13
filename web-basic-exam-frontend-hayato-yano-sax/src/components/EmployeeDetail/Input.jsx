import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export const Input = ({
  name,
  type,
  required,
  onChange,
  defaultValue,
  disabled,
}) => {
  return (
    <input
      name={name}
      type={type}
      id={name}
      required={required}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
      className={clsx(
        "form-control",
        name === "retireDate" && disabled && styles.inputField
      )}
    />
  );
};
