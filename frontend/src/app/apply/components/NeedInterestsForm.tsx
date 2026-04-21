import Image from "next/image";
import React from "react";

import { BackButton } from "./BackButton";
import styles from "./NeedsInterestsForm.module.css";
import { NextButton } from "./NextButton";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export const NeedInterestsForm = function NeedInterestsForm({ onBack, onNext }: Props) {
  const [context, setContext] = React.useState<string>("");
  const [aid, setAid] = React.useState<string[]>([]);
  const [otherNeed, setOtherNeed] = React.useState<string>("");

  const isFormValid = aid.length > 0;

  return (
    <div className={styles.formOuter}>
      <div className={styles.formInner}>
        <div className={styles.formContent}>
          <Image
            className={styles.progressBarTwo}
            src="/Progress-Bar-Two.png"
            alt="Step 2 of 3"
            width={245}
            height={30}
            priority
          />

          <h2 className={styles.needsTitle}>Your Needs & Program Interests</h2>
          <p className={styles.needsIntro}>
            This helps CRED connect you with the programs and services best suited to your needs.
          </p>

          <div className={styles.contextSection}>
            <p className={styles.needsText}>
              Please describe your current/prior conviction (if applicable).
            </p>
            <input
              type="text"
              className={styles.textField}
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
              }}
            />
          </div>

          <div className={styles.questionBlock}>
            <p className={styles.needsText}>
              What type of aid do you need?
              <span className={styles.required}>*</span>
            </p>

            <label className={styles.optionRow}>
              <input
                type="checkbox"
                name="aid"
                value="housing"
                checked={aid.includes("housing")}
                onChange={(e) => {
                  setAid((prev) =>
                    e.target.checked
                      ? [...prev, "housing"]
                      : prev.filter((item) => item !== "housing"),
                  );
                }}
              />
              <span>Housing</span>
            </label>

            <label className={styles.optionRow}>
              <input
                type="checkbox"
                name="aid"
                value="education"
                checked={aid.includes("education")}
                onChange={(e) => {
                  setAid((prev) =>
                    e.target.checked
                      ? [...prev, "education"]
                      : prev.filter((item) => item !== "education"),
                  );
                }}
              />
              <span>Education</span>
            </label>

            <label className={styles.optionRow}>
              <input
                type="checkbox"
                name="aid"
                value="development"
                checked={aid.includes("development")}
                onChange={(e) => {
                  setAid((prev) =>
                    e.target.checked
                      ? [...prev, "development"]
                      : prev.filter((item) => item !== "development"),
                  );
                }}
              />
              <span>Development</span>
            </label>

            <label className={styles.otherRow}>
              <input
                type="checkbox"
                name="aid"
                value="other"
                checked={aid.includes("other")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAid((prev) => [...prev, "other"]);
                  } else {
                    setAid((prev) => prev.filter((item) => item !== "other"));
                    setOtherNeed("");
                  }
                }}
              />
              <span className={styles.labelText}>Other/Not Sure:</span>
              <input
                type="text"
                className={`${styles.inlineText} ${
                  otherNeed.trim().length > 0 ? styles.inlineTextActive : styles.inlineTextInactive
                }`}
                name="otherNeed"
                value={otherNeed}
                onChange={(e) => {
                  setOtherNeed(e.target.value);
                }}
                disabled={!aid.includes("other")}
              />
            </label>
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
