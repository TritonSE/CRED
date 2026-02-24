import React from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  label: string;
} & React.ComponentProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, className, ...props },
  ref,
) {
  return (
    <button className={`${styles.button} ${className ?? ""}`} ref={ref} type="button" {...props}>
      <span className={styles.label}>{label}</span>
    </button>
  );
});
