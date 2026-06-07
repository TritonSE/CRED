import PageHero from "../../components/PageHero";

import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <PageHero
        imageSrc="/contact-banner.jpg"
        title="Contact Us"
        subtitle="CRED is committed to supporting system-impacted individuals. We welcome inquiries, collaboration, and contributions from all individuals."
      />

      <section className={styles.mainContent}>
        <ContactForm />
      </section>
    </div>
  );
}
