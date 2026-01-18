/**
 * admin file
 */
import styles from "./StatusLabel.modules.css";

export type StatusLabelProps = {
  status: "Need to Review" | "Pending" | "Reviewed";
};

export function StatusLabel({ status }: StatusLabelProps) {
  return <div className={styles.pending}>{status}</div>;
}
