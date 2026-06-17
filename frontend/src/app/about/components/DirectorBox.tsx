import Image from "next/image";
import React from "react";

import { Button } from "./Button";
import styles from "./DirectorBox.module.css";

/**
 * We're going to need to add another prop for the button ref later
 */
export type DirectorBoxProps = {
  title: string;
  textBody: string;
  buttonlabel: string;
  imageUrl: string;
  backgroundUrl: string;
  onButtonClick?: () => void;
};

export const DirectorBox: React.FC<DirectorBoxProps> = ({
  title,
  textBody,
  buttonlabel,
  imageUrl,
  backgroundUrl,
  onButtonClick,
}) => {
  return (
    <div className={styles.mainBox} style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <Image
        src={imageUrl}
        alt="Director Box Image"
        width={72}
        height={72}
        className={styles.imageSpace}
      />

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{textBody}</p>
      <Button className={styles.buttonstyle} label={buttonlabel} onClick={onButtonClick} />
    </div>
  );
};
