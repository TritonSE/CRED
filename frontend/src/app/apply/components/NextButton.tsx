import React from "react";

import styles from "./NextButton.module.css";

export type NextButtonProps = {
  disabled?: boolean;
  isComplete?: boolean;
  onClick?: () => void;
};

export const NextButton = function NextButton({
  disabled = false,
  isComplete = false,
  onClick,
}: NextButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.nextbutton} ${isComplete ? styles.nextbuttonComplete : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      Next
    </button>
  );
};
