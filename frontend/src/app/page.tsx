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

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContainer}>
          {/* Left Side: Text Content */}
          <div className={styles.missionContent}>
            <h2 className={styles.missionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              Our mission is to disrupt the cycles of recidivism, mass incarceration, homelessness,
              and poverty by helping individuals find their way to self-sufficiency. We promote
              community, entrepreneurship, job training, and economic development for underserved
              and vulnerable populations.
            </p>
            <Link href="/about" className={styles.missionBtn}>
              Learn more about CRED
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className={styles.missionImageWrapper}>
            <Image
              src="/mission-image.png"
              alt="Two people embracing in support"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
