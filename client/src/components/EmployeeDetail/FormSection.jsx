import React from "react";
import styles from "./FormSection.module.scss";
import { Select } from "./Select";
import { Input } from "./Input";

export const FormSection = ({ inputs, onChange, errorMessage }) => {
  return (
    <form className={`align-self-center mb-5 ${styles.formInputs}`}>
      {inputs.map((input) => (
        <div key={input.name} className="mb-3 pb-3">
          <div className="d-flex flex-row flex-nowrap align-items-start">
            <label htmlFor={input.name} className="form-label m-0">
              {input.label}
            </label>
            {input.required && (
              <span
                className={`badge rounded-pill text-danger ms-1 ${styles.pill}`}
              >
                必須
              </span>
            )}
          </div>

          {input.type === "select" ? (
            <Select
              name={input.name}
              onChange={onChange}
              values={input.values}
              value={input.value}
            />
          ) : (
            <Input
              name={input.name}
              type={input.type}
              id={input.name}
              required={input.required}
              onChange={onChange}
              defaultValue={input.value}
              disabled={input.disabled}
            />
          )}
          <strong className="text-danger text-center">
            {errorMessage[input.name]}
          </strong>
        </div>
      ))}
    </form>
  );
};
