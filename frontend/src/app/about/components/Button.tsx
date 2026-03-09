import React from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  label: string;
} & React.ComponentProps<"button">;

export const Button = function Button({
  ref,
  label,
  className,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <button {...props} className={`${styles.button} ${className ?? ""}`} ref={ref} type="button">
      <span className={styles.label}>{label}</span>
    </button>
  );
};
