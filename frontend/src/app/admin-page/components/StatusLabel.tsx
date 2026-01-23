/**
 * admin file
 */
import styles from "./StatusLabel.module.css";

export type StatusLabelProps = {
  status: "Need to Review" | "Under Review" | "Reviewed";
};

export function StatusLabel({ status }: StatusLabelProps) {
  let statusLabelClass = styles.statusLabel;
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
