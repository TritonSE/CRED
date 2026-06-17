import React from "react";

import styles from "./NextButton.module.css";

export type NextButtonProps = {
  disabled?: boolean;
  isComplete?: boolean;
  submitting?: boolean;
  onClick?: () => void;
};

export const NextButton = function NextButton({
  disabled = false,
  isComplete = false,
  submitting = false,
  onClick,
}: NextButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.nextbutton} ${isComplete ? styles.nextbuttonComplete : ""} ${submitting ? styles.submitting : ""}`}
      disabled={disabled || submitting}
      onClick={onClick}
    >
      {submitting ? "Submit" : "Next"}
    </button>
  );
};
