import React from "react";

import { Button } from "./Button";
import styles from "./DirectorBox.module.css";

export type DirectorBoxProps = {
  title: string;
  textBody: string;
  buttonlabel: string;
  // imageUrl: string;
  backgroundUrl: string;
};

export const DirectorBox: React.FC<DirectorBoxProps> = ({
  title,
  textBody,
  buttonlabel,
  // imageUrl,
  backgroundUrl,
}) => {
  return (
    <div className={styles.mainBox} style={{ backgroundImage: `url(${backgroundUrl})` }}>
      {/* <img src={imageUrl} className={styles.imageSpace} alt="Director Box Image"/> */}

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{textBody}</p>
      <Button className={styles.buttonStyle} label={buttonlabel} />
    </div>
  );
};
