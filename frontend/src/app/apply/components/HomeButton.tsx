import React from "react";

import styles from "./HomeButton.module.css";

export type HomeButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const HomeButton = function HomeButton({ onClick, disabled = false }: HomeButtonProps) {
  return (
    <button type="button" className={styles.homebutton} onClick={onClick} disabled={disabled}>
      Back to Home
    </button>
  );
};
