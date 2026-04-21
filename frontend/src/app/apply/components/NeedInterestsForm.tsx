import Image from "next/image";
import React from "react";

import { BackButton } from "./BackButton";
import { Checkbox } from "./Checkbox";
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

  const toggleAid = (value: string) => {
    setAid((prev) => {
      const next = prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
      if (value === "Other/Not Sure" && prev.includes(value)) setOtherNeed("");
      return next;
    });
  };

  const isFormValid = aid.length > 0;

  return (
    <div className={styles.formOuter}>
      <div className={styles.formInner}>
        <div className={styles.formContent}>
          <Image src="/Progress-Bar-Two.png" alt="Step 2 of 3" width={245} height={30} priority />

          <h2>Your Needs & Program Interests</h2>
          <p>
            This helps CRED connect you with the programs and services best suited to your needs.
          </p>

          <div>
            <p>Please describe your current/prior conviction (if applicable).</p>
            <input
              type="text"
              className={styles.textField}
              placeholder="Enter Text"
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
              }}
            />
          </div>

          <div>
            <p>What type of aid do you need? (Select as many as you would like)*</p>
            <div className={styles.checkboxGroup}>
              {["Housing", "Education", "Development", "Other/Not Sure"].map((item) => (
                <Checkbox
                  key={item}
                  label={item}
                  value={item}
                  checked={aid.includes(item)}
                  onChange={toggleAid}
                />
              ))}
            </div>

            {aid.includes("Other/Not Sure") && (
              <input
                type="text"
                placeholder="Enter your custom need"
                value={otherNeed}
                className={styles.textField}
                onChange={(e) => {
                  setOtherNeed(e.target.value);
                }}
              />
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.buttonGroup}>
            <BackButton onClick={onBack} />
            <NextButton isComplete={isFormValid} disabled={!isFormValid} onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};
