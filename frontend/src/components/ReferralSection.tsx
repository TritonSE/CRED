import ReferralGrid from "./ReferralGrid";
import styles from "./ReferralSection.module.css";

export default function ReferralSection() {
  return (
    <section className={styles.referral}>
      <div className={styles.referralHeader}>
        <h2 className={styles.referralTitle}>Types of Aid</h2>
        <p className={styles.referralSubtitle}>
          CRED provides clients with referral services to partner organizations and guides them to
          choose the programs and resources that best fit their needs.
        </p>
      </div>

      <ReferralGrid />
    </section>
  );
}
