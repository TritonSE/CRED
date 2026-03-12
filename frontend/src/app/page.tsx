import Image from "next/image";
import Link from "next/link";

import RefferalGrid from "../components/RefferalGrid";

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
            <Link href="/apply" className={styles.heroBtn}>
              Become a CRED Client
            </Link>
            <Link href="/contact" className={styles.heroBtn}>
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

      {/* Who We Support Section */}
      <section className={styles.support}>
        <div className={styles.supportHeader}>
          <h2 className={styles.supportTitle}>Who We Support</h2>
          <p className={styles.supportSubtitle}>
            CRED serves a diverse population and recognizes the common challenges and experiences
            shared by different groups. We are committed to addressing the unique needs and
            challenges of anyone looking for support, with an end goal of giving our clients the
            resources they need to find their path to self-sufficiency.
          </p>
        </div>

        {/* Card grid */}
        <div className={styles.supportGrid}>
          {/* Top row */}
          <div className={styles.supportRow}>
            <div className={styles.supportCard}>
              <Image
                src="/undeserved-communities-pic.jpg"
                alt="Underserved communities"
                fill
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
                src="/formerly-incarcerated-indiv-pic.jpg"
                alt="Formerly incarcerated individuals"
                fill
                className={styles.supportCardImage}
              />
              <div className={styles.supportCardOverlay} />
              <div className={styles.supportCardContent}>
                <h3 className={styles.supportCardTitle}>Formerly Incarcerated Individuals</h3>
                <p className={styles.supportCardText}>
                  CRED provides access to comprehensive reentry programs, helping formerly
                  incarcerated individuals successfully transition back into society with dignity
                  and opportunity.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className={styles.supportRow}>
            <div className={styles.supportCard}>
              <Image
                src="/youth-pic.jpg"
                alt="Transitional age youth"
                fill
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
                src="/family-pic.jpg"
                alt="Low-income families"
                fill
                className={styles.supportCardImage}
              />
              <div className={styles.supportCardOverlay} />
              <div className={styles.supportCardContent}>
                <h3 className={styles.supportCardTitle}>Low-Income Families</h3>
                <p className={styles.supportCardText}>
                  We support members of low-income communities through family-centered case
                  management services, access to food, housing, and healthcare resources, employment
                  assistance, and income advancement programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Resource Refferal*/}
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
    </>
  );
}
