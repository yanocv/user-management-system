import React from "react";
import styles from "./Select.module.scss";

export function Select({ selectedCompany, handleChange, companies }) {
  return (
    <div className="d-flex flex-row-reverse">
      <select
        className={`form-select border rounded text-start ${styles.selectGroup}`}
        value={selectedCompany}
        onChange={handleChange}
      >
        <option value="0">グループ全体</option>
        {companies.map((company, index) => (
          <option key={index} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
}
