import React from "react";

import { Button } from "./Button";
import styles from "./DirectorBox.module.css";

export type DirectorBoxProps = {
  title: string;
  textBody: string;
  buttonlabel: string;
};

export const DirectorBox: React.FC<DirectorBoxProps> = ({ title, textBody, buttonlabel }) => {
  return (
    <div className={styles.mainBox}>
      <div className={styles.imageSpace}>{/* insert image */}</div>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{textBody}</p>
      <Button className={styles.buttonStyle} label={buttonlabel} />
    </div>
  );
};
