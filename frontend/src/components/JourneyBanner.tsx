import Image from "next/image";
import Link from "next/link";

import styles from "./JourneyBanner.module.css";

export default function JourneyBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <Image
          src="/home/journey_banner_image.jpg"
          alt="CRED background with lightbulbs"
          fill
          sizes="100vw"
          unoptimized={true}
          className={styles.bgImage}
          quality={90}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Start Your Journey With CRED</h2>
          <p className={styles.subtitle}>
            Complete an application to be considered for our needs-based referral services, ranging
            from education, development, and more.
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/apply" className={styles.button}>
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}
