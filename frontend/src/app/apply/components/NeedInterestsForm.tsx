import Image from "next/image";
import React from "react";

import styles from "./NeedInterestsForm.module.css";

export type NeedInterestsFormProps = {};

export const NeedInterestsForm = function NeedInterestsForm(props: NeedInterestsFormProps) {
  const [context, setContext] = React.useState<string>("");
  const [aid, setAid] = React.useState<string[]>([]);

  const toggleAid = (value: string) => {
    setAid((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <div>
      <Image
        src="/Progress-Bar-Two.svg"
        alt="Application progress: step 2 of 3"
        width={245}
        height={30}
        className={styles.progressBar}
      />

      <h2>Your Needs & Program Interests</h2>
      <p>This helps CRED connect you with the programs and services best suited to your needs.</p>

      <div>
        <p>Please describe your current/prior conviction (if applicable).</p>
        <input
          type="text"
          placeholder="Enter Text"
          name="context"
          autoComplete="context"
          value={context}
          onChange={(e) => {
            setContext(e.target.value);
          }}
        />
      </div>

      <div>
        <p>What type of aid do you need? (Select as many as you would like)*</p>
      </div>
    </div>
  );
};
