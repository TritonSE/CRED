import Image from "next/image";

import styles from "./Support.module.css";

export default function Support() {
  return (
    <section className={styles.support}>
      <div className={styles.supportHeader}>
        <h2 className={styles.supportTitle}>Who We Support</h2>
        <p className={styles.supportSubtitle}>
          CRED serves a diverse population and recognizes the common challenges and experiences
          shared by different groups. We are committed to addressing the unique needs and challenges
          of anyone looking for support, with an end goal of giving our clients the resources they
          need to find their path to self-sufficiency.
        </p>
      </div>

      {/* Card grid */}
      <div className={styles.supportGrid}>
        {/* Top row */}
        <div className={styles.supportRow}>
          <div className={styles.supportCard}>
            <Image
              src="/home/underserved-communities-pic.jpg"
              alt="Underserved communities"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              unoptimized={true}
              className={styles.supportCardImage}
            />
            <div className={styles.supportCardOverlay} />
            <div className={styles.supportCardContent}>
              <h3 className={styles.supportCardTitle}>Underserved Communities</h3>
              <p className={styles.supportCardText}>
                We partner with communities of color, LGBTQ+ individuals, and more to provide
                culturally responsive programs that address systemic barriers and promote economic
                empowerment.
              </p>
            </div>
          </div>

          <div className={styles.supportCard}>
            <Image
              src="/home/formerly-incarcerated-indiv-pic.jpg"
              alt="Formerly incarcerated individuals"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              unoptimized={true}
              className={styles.supportCardImage}
            />
            <div className={styles.supportCardOverlay} />
            <div className={styles.supportCardContent}>
              <h3 className={styles.supportCardTitle}>Formerly Incarcerated Individuals</h3>
              <p className={styles.supportCardText}>
                CRED provides access to comprehensive reentry programs, helping formerly
                incarcerated individuals successfully transition back into society with dignity and
                opportunity.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className={styles.supportRow}>
          <div className={styles.supportCard}>
            <Image
              src="/home/youth-pic.jpg"
              alt="Transitional age youth"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              unoptimized={true}
              className={styles.supportCardImage}
            />
            <div className={styles.supportCardOverlay} />
            <div className={styles.supportCardContent}>
              <h3 className={styles.supportCardTitle}>Transitional Age Youth</h3>
              <p className={styles.supportCardText}>
                CRED provides elective life skills training, using the CRED approach to empower
                community members and build self-esteem. This is essential in fostering
                self-sufficiency among youth during their journey to independence.
              </p>
            </div>
          </div>

          <div className={styles.supportCard}>
            <Image
              src="/home/family-pic.jpg"
              alt="Low-income families"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              unoptimized={true}
              className={styles.supportCardImage}
            />
            <div className={styles.supportCardOverlay} />
            <div className={styles.supportCardContent}>
              <h3 className={styles.supportCardTitle}>Low-Income Families</h3>
              <p className={styles.supportCardText}>
                We support members of low-income communities through family-centered case management
                services, access to food, housing, and healthcare resources, employment assistance,
                and income advancement programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
