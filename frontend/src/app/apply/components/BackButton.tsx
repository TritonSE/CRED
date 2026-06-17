import React from "react";

import styles from "./BackButton.module.css";

export type BackButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const BackButton = function BackButton({ onClick, disabled = false }: BackButtonProps) {
  return (
    <button type="button" className={styles.backbutton} onClick={onClick} disabled={disabled}>
      Back
    </button>
  );
};
