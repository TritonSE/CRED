import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

import HeroSection from "@/components/HeroSection";

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <HeroSection
        variant="banner"
        imageSrc="/contact-banner.jpg"
        imageAlt=""
        title="Contact Us"
        subtitle="CRED is committed to supporting system-impacted individuals. We welcome inquiries, collaboration, and contributions from all individuals."
        overlayGradient="linear-gradient(to right, rgba(0, 67, 119, 0.9), rgba(30, 115, 190, 0.72))"
        imageOpacity={0.9}
        priority
      />

      <section className={styles.mainContent}>
        <ContactForm />
      </section>
    </div>
  );
}
