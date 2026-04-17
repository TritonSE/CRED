import Image from "next/image";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBg}>
        <Image
          src="/home/home-page-banner.jpg"
          alt="Hands coming together in community support"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className={styles.heroOverlay} />

      {/* Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Supporting Community, Stability, and Brighter Futures</h1>
        <p className={styles.heroSubtitle}>
          CRED is a reintegration and economic development organization focused on bridging the gap
          between incarceration and independence through practical support, workforce development,
          and mentorship.
        </p>
      </div>
    </section>
  );
}
