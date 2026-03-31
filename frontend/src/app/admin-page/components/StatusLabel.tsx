"use client";

/**
 * StatusLabel Component
 *
 * Displays a color-coded status indicator for application review states.
 * Uses different background and text colors to visually distinguish between:
 * - "Need to Review" (red theme)
 * - "Under Review" (gray theme)
 * - "Reviewed" (green theme)
 *
 * @module StatusLabel
 */
import styles from "./StatusLabel.module.css";

/**
 * Props for the StatusLabel component
 * @property {string} status - The current review status of an application
 */
export type StatusLabelProps = {
  status: "Need to Review" | "Under Review" | "Reviewed";
};

/**
 * StatusLabel - Renders a pill-shaped label with status-specific styling
 *
 * @param {StatusLabelProps} props - Component props
 * @param {string} props.status - One of the three valid status states
 * @returns {JSX.Element} A styled div displaying the status text
 */
export function StatusLabel({ status }: StatusLabelProps) {
  // Start with base styles, then add status-specific styling
  let statusLabelClass = styles.statusLabel;

  // Apply conditional styling based on status type
  switch (status) {
    case "Need to Review":
      statusLabelClass += ` ${styles.needToReview}`;
      break;
    case "Under Review":
      statusLabelClass += ` ${styles.underReview}`;
      break;
    case "Reviewed":
      statusLabelClass += ` ${styles.reviewed}`;
      break;
  }

  return <div className={statusLabelClass}>{status}</div>;
}
