import Image from "next/image";
import React from "react";

import styles from "./OperationsCard.module.css";

export type OperationsCardProps = {
  iconURL: string;
  title: string;
  textBody: string;
};

export const OperationsCard: React.FC<OperationsCardProps> = ({ iconURL, title, textBody }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.cardNumberCircle}>
          <div className={styles.iconWrapper}>
            <Image src={iconURL} alt="Card Icon" fill />
          </div>
        </div>
        <h2 className={styles.cardTitle}>{title}</h2>
      </div>

      <p className={styles.cardText}>{textBody}</p>
    </div>
  );
};
