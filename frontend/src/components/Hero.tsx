import Image from "next/image";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBg}>
        <Image
          src="/home/HomepageHero.jpg"
          alt="Image of buildings with CRED hero branding on top"
          fill
          sizes="100vw 713px"
          unoptimized={true}
          className={styles.objectCover}
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
          between economic independence, incarceration and stability through practical support,
          workforce development, and mentorship.
        </p>
      </div>
    </section>
  );
}
