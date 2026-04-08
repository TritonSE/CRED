import Image from "next/image";
import React, { useMemo, useState } from "react";

import { NextButton } from "./NextButton";
import styles from "./YourProfileForm.module.css";

function toggleSetMember(set: Set<string>, value: string, checked: boolean): Set<string> {
  const next = new Set(set);
  if (checked) {
    next.add(value);
  } else {
    next.delete(value);
  }
  return next;
}

// we should also add a popup where it says invalid date if the user has entered
// something that doesn't match the format
function isValidMmDdYyyy(s: string): boolean {
  const t = s.trim();
  if (!t) {
    return false;
  }
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(t);
  if (!match) {
    return false;
  }
  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) {
    return false;
  }
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

export const YourProfileForm = function YourProfileForm() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [address, setAddress] = useState("");
  const [employment, setEmployment] = useState<Set<string>>(new Set());
  const [employmentOther, setEmploymentOther] = useState("");
  const [education, setEducation] = useState<Set<string>>(new Set());
  const [educationOther, setEducationOther] = useState("");
  const [housing, setHousing] = useState("");
  const [housingOther, setHousingOther] = useState("");

  const isFormValid = useMemo(() => {
    const nameOk = fullName.trim().length > 0;
    const dobOk = isValidMmDdYyyy(dateOfBirth);
    const genderOk = gender.length > 0;
    const ethnicityOk = ethnicity.length > 0;
    const addressOk = address.trim().length > 0;

    const employmentOk =
      employment.size > 0 && (!employment.has("other") || employmentOther.trim().length > 0);
    const educationOk =
      education.size > 0 && (!education.has("other") || educationOther.trim().length > 0);
    const housingOk = housing.length > 0 && (housing !== "other" || housingOther.trim().length > 0);

    return (
      nameOk &&
      dobOk &&
      genderOk &&
      ethnicityOk &&
      addressOk &&
      employmentOk &&
      educationOk &&
      housingOk
    );
  }, [
    fullName,
    dateOfBirth,
    gender,
    ethnicity,
    address,
    employment,
    employmentOther,
    education,
    educationOther,
    housing,
    housingOther,
  ]);

  return (
    <div className={styles.formBlock}>
      <div className={styles.content}>
        <div className={styles.progressCenter}>
          <Image
            src="/Progress-Bar-One.svg"
            alt="Application progress: step 1 of 3"
            width={245}
            height={30}
            className={styles.progressBar}
            priority
          />
        </div>

        <div className={styles.formInner}>
          <div className={styles.heading}>
            <h2>Your Profile</h2>
            <p className={styles.headingSubtitle}>
              Please provide basic information to help us understand your background and
              eligibility.
            </p>
          </div>

          <div className={styles.fieldSection}>
            <div className={styles.fieldTop}>
              <div className={`${styles.nameBlock} ${styles.shortField}`}>
                <h4>
                  Full Name<span className={styles.required}>*</span>
                </h4>
                <input
                  type="text"
                  placeholder="Enter Input"
                  name="fullName"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>

              <div className={`${styles.birthdateBlock} ${styles.shortField}`}>
                <h4>
                  Date of Birth<span className={styles.required}>*</span>
                </h4>
                <div className={styles.dateInputWrap}>
                  <input
                    type="text"
                    name="dateOfBirth"
                    inputMode="numeric"
                    autoComplete="bday"
                    placeholder="MM/DD/YYYY"
                    value={dateOfBirth}
                    onChange={(e) => {
                      // here we should add error indicators
                      setDateOfBirth(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.fieldMiddle}>
              <div className={`${styles.genderBlock} ${styles.shortField}`}>
                <h4>
                  Gender<span className={styles.required}>*</span>
                </h4>
                <select
                  name="gender"
                  value={gender}
                  className={gender === "" ? styles.selectPlaceholder : undefined}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer">Prefer not to say</option>
                </select>
              </div>
              <div className={`${styles.ethnicityBlock} ${styles.shortField}`}>
                <h4>
                  Race/Ethnicity<span className={styles.required}>*</span>
                </h4>
                <select
                  name="ethnicity"
                  value={ethnicity}
                  className={ethnicity === "" ? styles.selectPlaceholder : undefined}
                  onChange={(e) => {
                    setEthnicity(e.target.value);
                  }}
                >
                  <option value="">Select an option</option>
                  <option value="mena">Middle Eastern or North African</option>
                  <option value="naan">Native American or Alaska Native</option>
                  <option value="nhpi">Native Hawaiian or Pacific Islander</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className={`${styles.addressBlock} ${styles.fullWidthField}`}>
              <h4>
                Address<span className={styles.required}>*</span>
              </h4>
              <input
                type="text"
                placeholder="Address"
                name="address"
                autoComplete="street-address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className={`${styles.questionBlock} ${styles.employmentBlock}`}>
              <h4>
                What is your current employment status?
                <span className={styles.required}>*</span>
              </h4>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="employment"
                  value="full-time"
                  checked={employment.has("full-time")}
                  onChange={(e) => {
                    setEmployment((prev) => toggleSetMember(prev, "full-time", e.target.checked));
                  }}
                />
                <span>Employed full-time</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="employment"
                  value="part-time"
                  checked={employment.has("part-time")}
                  onChange={(e) => {
                    setEmployment((prev) => toggleSetMember(prev, "part-time", e.target.checked));
                  }}
                />
                <span>Employed part-time</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="employment"
                  value="self-employed"
                  checked={employment.has("self-employed")}
                  onChange={(e) => {
                    setEmployment((prev) =>
                      toggleSetMember(prev, "self-employed", e.target.checked),
                    );
                  }}
                />
                <span>Self-employed</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="employment"
                  value="unemployed"
                  checked={employment.has("unemployed")}
                  onChange={(e) => {
                    setEmployment((prev) => toggleSetMember(prev, "unemployed", e.target.checked));
                  }}
                />
                <span>Unemployed/Currently looking for work</span>
              </label>
              <label className={styles.otherRow}>
                <input
                  type="checkbox"
                  name="employment"
                  value="other"
                  checked={employment.has("other")}
                  onChange={(e) => {
                    setEmployment((prev) => toggleSetMember(prev, "other", e.target.checked));
                  }}
                />
                <span className={styles.labelText}>Other/Not Sure:</span>
                <input
                  type="text"
                  className={styles.inlineText}
                  name="employmentOther"
                  value={employmentOther}
                  onChange={(e) => {
                    setEmploymentOther(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className={`${styles.questionBlock} ${styles.educationBlock}`}>
              <h4>
                What best describes your current education status?
                <span className={styles.required}>*</span>
              </h4>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="education"
                  value="enrolled"
                  checked={education.has("enrolled")}
                  onChange={(e) => {
                    setEducation((prev) => toggleSetMember(prev, "enrolled", e.target.checked));
                  }}
                />
                <span>Currently enrolled in school or training</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="education"
                  value="planning"
                  checked={education.has("planning")}
                  onChange={(e) => {
                    setEducation((prev) => toggleSetMember(prev, "planning", e.target.checked));
                  }}
                />
                <span>Planning to enroll in school or training</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="education"
                  value="not-enrolled"
                  checked={education.has("not-enrolled")}
                  onChange={(e) => {
                    setEducation((prev) => toggleSetMember(prev, "not-enrolled", e.target.checked));
                  }}
                />
                <span>Not currently enrolled</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="checkbox"
                  name="education"
                  value="completed"
                  checked={education.has("completed")}
                  onChange={(e) => {
                    setEducation((prev) => toggleSetMember(prev, "completed", e.target.checked));
                  }}
                />
                <span>Completed my education</span>
              </label>
              <label className={styles.otherRow}>
                <input
                  type="checkbox"
                  name="education"
                  value="other"
                  checked={education.has("other")}
                  onChange={(e) => {
                    setEducation((prev) => toggleSetMember(prev, "other", e.target.checked));
                  }}
                />
                <span className={styles.labelText}>Other/Not Sure:</span>
                <input
                  type="text"
                  className={styles.inlineText}
                  name="educationOther"
                  value={educationOther}
                  onChange={(e) => {
                    setEducationOther(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className={`${styles.questionBlock} ${styles.housingBlock}`}>
              <h4>
                Which option best describes your current housing situation?
                <span className={styles.required}>*</span>
              </h4>
              <label className={styles.optionRow}>
                <input
                  type="radio"
                  name="housing"
                  value="stable"
                  checked={housing === "stable"}
                  onChange={(e) => {
                    setHousing(e.target.value);
                  }}
                />
                <span>I have stable housing</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="radio"
                  name="housing"
                  value="temporary"
                  checked={housing === "temporary"}
                  onChange={(e) => {
                    setHousing(e.target.value);
                  }}
                />
                <span>I am temporarily staying with friends or family</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="radio"
                  name="housing"
                  value="transitional"
                  checked={housing === "transitional"}
                  onChange={(e) => {
                    setHousing(e.target.value);
                  }}
                />
                <span>I am in transitional housing or a shelter</span>
              </label>
              <label className={styles.optionRow}>
                <input
                  type="radio"
                  name="housing"
                  value="homeless"
                  checked={housing === "homeless"}
                  onChange={(e) => {
                    setHousing(e.target.value);
                  }}
                />
                <span>I am currently experiencing homelessness</span>
              </label>
              <label className={styles.otherRow}>
                <input
                  type="radio"
                  name="housing"
                  value="other"
                  checked={housing === "other"}
                  onChange={(e) => {
                    setHousing(e.target.value);
                  }}
                />
                <span className={styles.labelText}>Other/Not Sure:</span>
                <input
                  type="text"
                  className={styles.inlineText}
                  name="housingOther"
                  value={housingOther}
                  onChange={(e) => {
                    setHousingOther(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className={styles.formFooter}>
              <NextButton disabled={!isFormValid} isComplete={isFormValid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
