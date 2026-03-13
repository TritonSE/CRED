import Image from "next/image";
import React from "react";
// import { useState } from "react";

import { CDCRAlert } from "./CDCRAlert";
import { NextButton } from "./NextButton";
import styles from "./YourProfileForm.module.css";

export const YourProfileForm = function YourProfileForm() {
  //   const [name, setName] = useState("");
  //   const [birthdate, setBirthdate] = useState("");
  // these are supposed to be drop downs
  // const [ethnicity, setEthnicity] = useState("");
  // const [gender, setGender] = useState("");
  //   const [CDCR, setCDCR] = useState("");

  return (
    <div className={styles.formBlock}>
      <div className={styles.content}>
        <Image
          src="Progress-Bar-One.svg"
          alt="Progress part 1"
          width={60}
          height={60}
          className={styles.progressBar}
        />
        {/* image of progress point */}
        <div className={styles.heading}>
          <h2>Your Profile</h2>
          <p>
            Please provide basic information to help us understand your background and eligibility.
          </p>
        </div>
        <div className={styles.fieldSection}>
          {/* top input fields: name and birthdate */}
          <div className={styles.fieldTop}>
            <div className={styles.nameBlock}>
              <h4>Full Name*</h4>
              <input
                type="text"
                placeholder="Enter Input"
                // value={name}
                // onChange={}
              />
            </div>

            <div className={styles.birthdateBlock}>
              <h4>Date of Birth*</h4>
              <input
                type="text"
                placeholder="Enter Input"
                // value={birthdate}
              />
            </div>
          </div>

          {/* middle input fields: ethnicity and gender */}
          <div className={styles.fieldMiddle}>
            <div className={styles.ethnicityBlock}>
              <h4>Race/Ethnicity*</h4>
              {/* drop down: ?? */}
            </div>

            <div className={styles.genderBlock}>
              <h4>Gender*</h4>
              {/* drop down: male, female, other, prefer not to say */}
            </div>
          </div>

          <div className={styles.fieldBottom}>
            <div className={styles.CDCRHeader}>
              <h4>CDCR Number</h4>
              {/* ? icon button, if pressed display alert */}
            </div>
            <input
              type="text"
              placeholder="CDCR #"
              //   value={CDCR}
              // onChange={}
            />
          </div>

          <div className={styles.alertAndButton}>
            {/* add show/hide functionality */}
            <CDCRAlert></CDCRAlert>
            <NextButton></NextButton>
          </div>
        </div>
      </div>
    </div>
  );
};
