import Image from "next/image";
import Link from "next/link";

import styles from "./JourneyBanner.module.css";

export default function JourneyBanner() {
  return (
    <section className={styles.section}>
      {/* Background Image and Overlay */}
      <div className={styles.bgWrapper}>
        <Image
          src="/home/JourneyImage.jpg"
          alt="CRED background with lightbulbs"
          fill
          className={styles.bgImage}
          quality={90}
        />
        {/* The yellow/orange tint overlay */}
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Start Your Journey With CRED</h2>
          <p className={styles.subtitle}>
            Complete an application to be considered for our needs-based referral services, ranging
            from education, development, and more.
          </p>
        </div>

        <div className={styles.buttonContainer}>
          {/* Assuming you have an /apply or /application route */}
          <Link href="/apply" className={styles.button}>
            Start Application
          </Link>
        </div>
      </div>
    </section>
  );
}
