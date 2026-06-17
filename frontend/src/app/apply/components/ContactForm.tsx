import Image from "next/image";
import React from "react";

import { BackButton } from "./BackButton";
import styles from "./ContactForm.module.css";
import { NextButton } from "./NextButton";

export type ContactData = {
  email: string;
  phone: string;
  commentsQuestions: string;
};

type Props = {
  initialData: ContactData;
  onBack: (data: ContactData) => void;
  onNext: (data: ContactData) => void;
  isSubmitting?: boolean;
};

export const ContactForm = function ContactForm({
  initialData,
  onBack,
  onNext,
  isSubmitting = false,
}: Props) {
  const [email, setEmail] = React.useState<string>(initialData.email);
  const [phone, setPhone] = React.useState<string>(initialData.phone);
  const [commentsQuestions, setCommentsQuestions] = React.useState<string>(
    initialData.commentsQuestions,
  );

  const isFormValid = email.length > 0 && phone.length > 0;

  return (
    <div className={styles.formOuter}>
      <div className={styles.formContent}>
        <div className={styles.progressCenter}>
          <Image
            className={styles.progressBarThree}
            src="/apply/progress-bar-3.png"
            alt="Step 3 of 3"
            width={245}
            height={30}
            priority
          />
        </div>
        <div className={styles.formInner}>
          <h2 className={styles.contactTitle}>Contact Information</h2>
          <h2 className={styles.contactTitleMobile}>Contact Information</h2>
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
              placeholder="Phone Number"
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
            <BackButton
              onClick={() => {
                onBack({ email, phone, commentsQuestions });
              }}
            />
            <NextButton
              disabled={!isFormValid}
              isComplete={isFormValid}
              submitting={isSubmitting}
              onClick={() => {
                if (!isFormValid) return;
                onNext({ email, phone, commentsQuestions });
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.footerMobile}>
        <div className={styles.buttonGroup}>
          <BackButton
            onClick={() => {
              onBack({ email, phone, commentsQuestions });
            }}
          />
          <NextButton
            disabled={!isFormValid}
            isComplete={isFormValid}
            submitting={isSubmitting}
            onClick={() => {
              if (!isFormValid) return;
              onNext({ email, phone, commentsQuestions });
            }}
          />
        </div>
      </div>
    </div>
  );
};
