import Image from "next/image";
import React, { useState } from "react";

import styles from "./SuccessAlert.module.css";

type SuccessAlertProps = {
  message: string;
  onClose?: () => void;
};

export function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div className={styles.container}>
      {/*<div className={styles.left}>*/}
      <Image src="/green_check.svg" alt="success" width={20} height={20} />
      <span className={styles.message}>{message}</span>
      {/*</div>*/}

      <button onClick={handleClose} className={styles.closeButton}>
        <Image src="/cross.svg" alt="close" width={13} height={13} />
      </button>
    </div>
  );
}
