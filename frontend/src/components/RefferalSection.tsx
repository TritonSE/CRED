import RefferalGrid from "./RefferalGrid";
import styles from "./RefferalSection.module.css";

export default function RefferalSection() {
  return (
    <section className={styles.refferal}>
      <div className={styles.refferalHeader}>
        <h2 className={styles.refferalTitle}>Types of Aid</h2>
        <p className={styles.refferalSubtitle}>
          CRED provides clients with referral services to partner organizations and guides them to
          choose the programs and resources that best fit their needs.
        </p>
      </div>

      <RefferalGrid />
    </section>
  );
}
