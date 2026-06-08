import Image from "next/image";

import styles from "./Donate.module.css";

import HeroSection from "@/components/HeroSection";

export default function DonatePage() {
  return (
    <div className={styles.donatePage}>
      <HeroSection
        variant="banner"
        imageSrc="/donate-banner.jpg"
        imageAlt="Hero background"
        title="Your Contribution Counts"
        subtitle="Reducing recidivism, mass incarceration, homelessness, and poverty by investing in people."
        overlayGradient="linear-gradient(to right, rgba(0, 67, 119, 0.8), rgba(30, 115, 190, 0.8))"
        imageOpacity={0.8}
        imageClassName={styles.heroImage}
        priority
      />

      <section className={styles.mainContent}>
        <h2 className={styles.mainHeading}>
          We Believe in Uplifting the Most Vulnerable Members of Our Community.
        </h2>

        <div className={styles.contentRow}>
          <div className={styles.imageWrapper}>
            <Image
              src="/donate-image.png"
              alt="Community support"
              fill
              className="object-cover"
              sizes="(min-width: 1200px) 538px, (min-width: 1024px) 480px, 100vw"
            />
          </div>

          <div className={styles.contentText}>
            <p className={styles.lessBoldText}>
              Our programs offers life skills education and a path to self-sufficiency that will
              empower our clients to break the cycles they are trapped in.
            </p>
            <p className={styles.lessBoldText}>
              <span className={styles.extraBoldText}>But we can&apos;t do it alone.</span> By
              contributing to CRED, you&apos;re investing in a future where these individuals have
              the support, skills, and opportunities they need to thrive.
            </p>

            <a
              href="https://www.paypal.com/donate/?hosted_button_id=2EJN3L8MH3LVA"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateLink}
            >
              <div className={styles.donateButton}>
                <p className={styles.donateButtonText}>Donate Now</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
