import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background Image */}
        <div className={styles.heroBg}>
          <Image
            src="/home-page-banner.jpg"
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
          <h1 className={styles.heroTitle}>
            Supporting Community,
            <br />
            Stability, and Brighter Futures
          </h1>
          <p className={styles.heroSubtitle}>
            We are dedicated to guiding underserved individuals towards economic stability and
            self-sufficiency through education, employment, and case support in San Diego.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/" className={styles.heroBtn}>
              Become a CRED Client
            </Link>
            <Link href="/" className={styles.heroBtn}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
