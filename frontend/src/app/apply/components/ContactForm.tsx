import Image from "next/image";
import React from "react";

import styles from "./ContactForm.module.css";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export const ContactForm = function ContactForm({ onBack, onNext }: Props) {
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [commentsQuestions, setCommentsQuestions] = React.useState<string>("");

  const isFormValid = email.length > 0 || phone.length > 0;

  return (
    <div className={styles.formOuter}>
      <div className={styles.formInner}>
        <div className={styles.formContent}>
          <Image
            className={styles.progressBarThree}
            src="/Progress-Bar-Three.png"
            alt="Step 3 of 3"
            width={245}
            height={30}
            priority
          />

          <h2 className={styles.contactTitle}>Your Contact Information</h2>
          <p className={styles.contactIntro}>
            Please provide your preferred contact details so we can follow up with you.
          </p>
        </div>
      </div>
    </div>
  );
};
