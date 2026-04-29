import Image from "next/image";
import React from "react";

import { BackButton } from "./BackButton";
import styles from "./ContactForm.module.css";
import { NextButton } from "./NextButton";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export const ContactForm = function ContactForm({ onBack, onNext }: Props) {
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [commentsQuestions, setCommentsQuestions] = React.useState<string>("");

  const isFormValid = email.length > 0 && phone.length > 0;

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

          <div>
            <p className={styles.contactText}>
              Email
              <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              className={styles.textField}
              value={email}
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <p className={styles.contactText}>
              Phone Number
              <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              className={styles.textField}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div>
            <p className={styles.contactText}>Any additional comments or questions?</p>
            <input
              type="text"
              className={styles.textField}
              value={commentsQuestions}
              placeholder="Enter any additional comments or questions here"
              onChange={(e) => {
                setCommentsQuestions(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.buttonGroup}>
            <BackButton onClick={onBack} />
            <NextButton
              disabled={!isFormValid}
              isComplete={isFormValid}
              onClick={() => {
                if (!isFormValid) return;
                onNext();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
