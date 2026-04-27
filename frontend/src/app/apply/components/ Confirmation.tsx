import React from "react";

import styles from "./Confirmation.module.css";
import { HomeButton } from "./HomeButton";

type Props = {
  onNext: () => void;
  clientId?: string;
  dateSubmitted?: string;
};

export const Confirmation = function Confirmation({
  onNext,
  clientId = "CF-02302837",
  dateSubmitted = "Sunday, January 18, 2026 at 9:58 PM",
}: Props) {
  const steps = [
    "A CRED team member will review your application.",
    "We'll contact you via email regarding your application.",
    "We will discuss your needs and match you with appropriate programs and services.",
  ];

  return (
    <div className={styles.formOuter}>
      <div className={styles.formInner}>
        {/* Section 1 */}
        <section className={styles.sectionOne}>
          <div className={styles.successCircle}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#14AE5C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className={styles.successTitle}>
            We Have Successfully <br /> Received Your Application!
          </h2>
        </section>

        {/* Section 2 */}
        <section className={styles.sectionTwo}>
          <div className={styles.sectionTwoInner}>
            <h3 className={styles.subHeading}>What happens next?</h3>
            <div className={styles.stepList}>
              {steps.map((text, index) => (
                <div key={index} className={styles.stepItem}>
                  <div className={styles.stepNumberContainer}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                  </div>
                  <p className={styles.stepText}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className={styles.sectionThree}>
          <div className={styles.detailsContent}>
            <h3 className={styles.subHeading}>Confirmation Details</h3>
            <div className={styles.detailRow}>
              <span className={styles.labelLight}>Client ID/Reference Number:</span>
              <span className={styles.dynamicValue}>{clientId}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.labelBold}>Date Submitted:</span>
              <span className={styles.dynamicValue}>{dateSubmitted}</span>
            </div>
            <p className={styles.emailUpdateText}>
              Please check your email for updates about your application.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <div className={styles.footer}>
          <HomeButton onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
