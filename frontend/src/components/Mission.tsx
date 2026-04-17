import Image from "next/image";
import Link from "next/link";

import styles from "./Mission.module.css";

export default function Mission() {
  return (
    <section className={styles.mission}>
      <div className={styles.missionContainer}>
        {/* Left Side: Text Content */}
        <div className={styles.missionContent}>
          <h2 className={styles.missionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            Our mission is to disrupt the cycles of recidivism, mass incarceration, homelessness,
            and poverty by helping individuals find their way to self-sufficiency. We promote
            community, entrepreneurship, job training, and economic development for underserved and
            vulnerable populations.
          </p>
          <Link href="/about" className={styles.missionBtn}>
            Learn more about CRED
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className={styles.missionImageWrapper}>
          <Image
            src="/home/mission-image.png"
            alt="Two people embracing in support"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
