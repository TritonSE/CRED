import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import styles from "./SuccessAlert.module.css";

type SuccessAlertProps = {
  message: string;
  onClose?: () => void;
};

const AUTO_DISMISS_DELAY = 5000;
const FADE_DURATION = 300;

export function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const mountedRef = useRef(true);

  const triggerClose = () => {
    if (closing) return;

    setClosing(true);
    window.setTimeout(() => {
      if (mountedRef.current) {
        setVisible(false);
      }
      if (onClose) onClose();
    }, FADE_DURATION);
  };

  useEffect(() => {
    mountedRef.current = true;
    const timer = window.setTimeout(() => {
      triggerClose();
    }, AUTO_DISMISS_DELAY);

    return () => {
      mountedRef.current = false;
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.container} ${closing ? styles.closing : ""}`}>
      <Image src="/green_check.svg" alt="success" width={20} height={20} />
      <span className={styles.message}>{message}</span>

      <button onClick={triggerClose} className={styles.closeButton}>
        <Image src="/cross.svg" alt="close" width={13} height={13} />
      </button>
    </div>
  );
}
