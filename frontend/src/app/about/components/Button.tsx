import React from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  label: string;
} & Omit<React.ComponentProps<"button">, "ref">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, className, ...props },
  ref,
) {
  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      ref={ref}
      type="button"
      aria-label={label}
      {...props}
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
});
