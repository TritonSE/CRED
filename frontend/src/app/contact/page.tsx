import Image from "next/image";

import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroImageWrapper} aria-hidden="true">
          <Image
            src="/contact-banner.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            CRED is committed to supporting system-impacted individuals. We welcome inquiries,
            collaboration, and contributions from all individuals.
          </p>
        </div>
      </section>

      <section className={styles.mainContent}>
        <ContactForm />
      </section>
    </div>
  );
}
