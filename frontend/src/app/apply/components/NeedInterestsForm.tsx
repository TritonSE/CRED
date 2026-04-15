import Image from "next/image";
import React from "react";

import { BackButton } from "./BackButton";
import { Checkbox } from "./Checkbox";
import styles from "./NeedsInterestsForm.module.css";
import { NextButton } from "./NextButton";

export const NeedInterestsForm = function NeedInterestsForm() {
  const [context, setContext] = React.useState<string>("");
  const [aid, setAid] = React.useState<string[]>([]);
  const [otherNeed, setOtherNeed] = React.useState<string>("");

  const toggleAid = (value: string) => {
    setAid((prev) => {
      const next = prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
      if (value === "Other/Not Sure" && prev.includes(value)) {
        setOtherNeed("");
      }
      return next;
    });
  };

  return (
    <div>
      <Image
        src="/Progress-Bar-Two.png"
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
        <Checkbox
          label="Housing"
          value="Housing"
          checked={aid.includes("Housing")}
          onChange={toggleAid}
        />
        <Checkbox
          label="Education"
          value="Education"
          checked={aid.includes("Education")}
          onChange={toggleAid}
        />
        <Checkbox
          label="Development"
          value="Development"
          checked={aid.includes("Development")}
          onChange={toggleAid}
        />
        <Checkbox
          label="Other/Not Sure"
          value="Other/Not Sure"
          checked={aid.includes("Other/Not Sure")}
          onChange={toggleAid}
        />
        {aid.includes("Other/Not Sure") && (
          <input
            type="text"
            placeholder="Enter your custom need"
            name="otherNeed"
            value={otherNeed}
            onChange={(e) => {
              setOtherNeed(e.target.value);
            }}
          />
        )}
      </div>
      <BackButton></BackButton>
      <NextButton></NextButton>
    </div>
  );
};
