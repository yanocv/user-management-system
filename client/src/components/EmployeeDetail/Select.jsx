import React from "react";

export const Select = ({ name, onChange, values, value }) => {
  return (
    <select
      name={name}
      className="form-select"
      onChange={onChange}
      value={value}
    >
      {values &&
        values.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name || item.label}
          </option>
        ))}
    </select>
  );
};
