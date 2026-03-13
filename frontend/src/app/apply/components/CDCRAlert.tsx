import React from "react";

import styles from "./CDCRAlert.module.css";

export const CDCRAlert = function CDCRAlert() {
  return (
    <div className={styles.alertBlock}>
      {/* icon */}
      <p>
        A CDCR number is the unique inmate identification number assigned by the California
        Department of Corrections and Rehabilitation (CDCR) to track individuals in the state prison
        system, used for identification and accessing records.
      </p>
    </div>
  );
};
