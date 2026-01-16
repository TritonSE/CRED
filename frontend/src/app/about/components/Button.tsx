import React from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  label: string;
} & React.ComponentProps<"button">;

export const Button = function Button({
  ref,
  label,
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <button className={styles.button} ref={ref} type="button">
      <span className={styles.label}>{label}</span>
      <img src="Arrow 1.svg" alt="Forward Arrow" />
    </button>
  );
};
