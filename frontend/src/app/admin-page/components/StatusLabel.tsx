/**
 * admin file
 */
import styles from "./StatusLabel.module.css";

export type StatusLabelProps = {
  status: "Need to Review" | "Pending" | "Reviewed";
};

export function StatusLabel({ status }: StatusLabelProps) {
  let statusLabelClass = styles.statusLabel;
  switch (status) {
    case "Need to Review":
      statusLabelClass += ` ${styles.needToReview}`;
      break;
    case "Pending":
      statusLabelClass += ` ${styles.pending}`;
      break;
    case "Reviewed":
      statusLabelClass += ` ${styles.reviewed}`;
      break;
  }
  return <div className={statusLabelClass}>{status}</div>;
}
