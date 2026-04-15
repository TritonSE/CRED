import React from "react";

import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked, onChange }) => {
  return (
    <label className={styles.optionRow}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => {
          onChange(value);
        }}
      />
      <span>{label}</span>
    </label>
  );
};
