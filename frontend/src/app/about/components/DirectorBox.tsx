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
};

/**
 * Validates that the URL is safe to use as a background image
 * Prevents path traversal and ensures relative URLs
 */
function isValidBackgroundUrl(url: string): boolean {
  return url.startsWith("/") && !url.includes("../") && !url.includes("..\\");
}

export const DirectorBox: React.FC<DirectorBoxProps> = ({
  title,
  textBody,
  buttonlabel,
  imageUrl,
  backgroundUrl,
}) => {
  // Validate background URL for security
  const safeBackgroundUrl = isValidBackgroundUrl(backgroundUrl) ? backgroundUrl : "";

  return (
    <div
      className={styles.mainBox}
      style={{ backgroundImage: safeBackgroundUrl ? `url(${safeBackgroundUrl})` : undefined }}
    >
      <Image
        src={imageUrl}
        alt="Director Box Image"
        width={60}
        height={60}
        className={styles.imageSpace}
      />

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{textBody}</p>
      <Button className={styles.buttonstyle} label={buttonlabel} />
    </div>
  );
};
