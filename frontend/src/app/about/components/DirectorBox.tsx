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
  try {
    // Decode URL to catch encoded path traversal attempts
    const decoded = decodeURIComponent(url);
    // Check for relative paths starting with / and no path traversal
    return (
      decoded.startsWith("/") &&
      !decoded.includes("../") &&
      !decoded.includes("..\\") &&
      !decoded.includes("%2e%2e") &&
      !decoded.includes("%2E%2E")
    );
  } catch {
    // Invalid URL encoding
    return false;
  }
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

  if (!safeBackgroundUrl && process.env.NODE_ENV === "development") {
    console.warn(`DirectorBox: Invalid backgroundUrl provided: "${backgroundUrl}"`);
  }

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
