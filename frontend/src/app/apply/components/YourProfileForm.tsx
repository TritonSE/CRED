import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

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

type YourProfileFormProps = {
  onNext: () => void;
};

export const YourProfileForm = function YourProfileForm({ onNext }: YourProfileFormProps) {
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
    const dobOk = dateOfBirth.trim().length > 0;
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

  type SelectOption = { value: string; label: string };

  const genderOptions: SelectOption[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer", label: "Prefer not to say" },
  ];

  const ethnicityOptions: SelectOption[] = [
    { value: "mena", label: "Middle Eastern or North African" },
    { value: "naan", label: "Native American or Alaska Native" },
    { value: "nhpi", label: "Native Hawaiian or Pacific Islander" },
    { value: "other", label: "Other" },
  ];

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isEthnicityOpen, setIsEthnicityOpen] = useState(false);
  const genderWrapRef = useRef<HTMLDivElement | null>(null);
  const ethnicityWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        isGenderOpen &&
        genderWrapRef.current &&
        target &&
        !genderWrapRef.current.contains(target)
      ) {
        setIsGenderOpen(false);
      }
      if (
        isEthnicityOpen &&
        ethnicityWrapRef.current &&
        target &&
        !ethnicityWrapRef.current.contains(target)
      ) {
        setIsEthnicityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isGenderOpen, isEthnicityOpen]);

  const dobRef = useRef<HTMLInputElement | null>(null);

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
                <div
                  className={`${styles.dateInputWrap} ${dateOfBirth === "" ? styles.dateInputEmpty : ""}`}
                >
                  {dateOfBirth === "" ? (
                    <span className={styles.datePlaceholder} aria-hidden="true">
                      MM/DD/YYYY
                    </span>
                  ) : null}
                  <input
                    ref={dobRef}
                    type="date"
                    name="dateOfBirth"
                    autoComplete="bday"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className={styles.calendarButton}
                    aria-label="Open calendar"
                    onClick={() => {
                      const el = dobRef.current;
                      if (!el) return;
                      const anyEl = el as unknown as { showPicker?: () => void };
                      if (typeof anyEl.showPicker === "function") anyEl.showPicker();
                      else el.focus();
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 2V4M17 2V4M4 8H20M5 5H19C20.1046 5 21 5.89543 21 7V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V7C3 5.89543 3.89543 5 5 5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.fieldMiddle}>
              <div className={`${styles.genderBlock} ${styles.shortField}`}>
                <h4>
                  Gender<span className={styles.required}>*</span>
                </h4>
                <div className={styles.customSelect} ref={genderWrapRef}>
                  <button
                    type="button"
                    className={`${styles.selectTrigger} ${gender === "" ? styles.selectPlaceholder : ""}`}
                    aria-haspopup="listbox"
                    aria-expanded={isGenderOpen}
                    onClick={() => {
                      setIsGenderOpen((v) => !v);
                    }}
                  >
                    <span className={styles.selectValue}>
                      {gender === ""
                        ? "Select an option"
                        : (genderOptions.find((o) => o.value === gender)?.label ??
                          "Select an option")}
                    </span>
                    <span className={styles.chevron} aria-hidden="true" />
                  </button>
                  {isGenderOpen ? (
                    <div className={styles.selectMenu} role="listbox">
                      {genderOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className={styles.selectOption}
                          role="option"
                          aria-selected={gender === opt.value}
                          onClick={() => {
                            setGender(opt.value);
                            setIsGenderOpen(false);
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={`${styles.ethnicityBlock} ${styles.shortField}`}>
                <h4>
                  Race/Ethnicity<span className={styles.required}>*</span>
                </h4>
                <div className={styles.customSelect} ref={ethnicityWrapRef}>
                  <button
                    type="button"
                    className={`${styles.selectTrigger} ${ethnicity === "" ? styles.selectPlaceholder : ""}`}
                    aria-haspopup="listbox"
                    aria-expanded={isEthnicityOpen}
                    onClick={() => {
                      setIsEthnicityOpen((v) => !v);
                    }}
                  >
                    <span className={styles.selectValue}>
                      {ethnicity === ""
                        ? "Select an option"
                        : (ethnicityOptions.find((o) => o.value === ethnicity)?.label ??
                          "Select an option")}
                    </span>
                    <span className={styles.chevron} aria-hidden="true" />
                  </button>
                  {isEthnicityOpen ? (
                    <div className={styles.selectMenu} role="listbox">
                      {ethnicityOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className={styles.selectOption}
                          role="option"
                          aria-selected={ethnicity === opt.value}
                          onClick={() => {
                            setEthnicity(opt.value);
                            setIsEthnicityOpen(false);
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
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
                  className={`${styles.inlineText} ${
                    employmentOther.trim().length > 0
                      ? styles.inlineTextActive
                      : styles.inlineTextInactive
                  }`}
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
                  className={`${styles.inlineText} ${
                    educationOther.trim().length > 0
                      ? styles.inlineTextActive
                      : styles.inlineTextInactive
                  }`}
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
                  className={`${styles.inlineText} ${
                    housingOther.trim().length > 0
                      ? styles.inlineTextActive
                      : styles.inlineTextInactive
                  }`}
                  name="housingOther"
                  value={housingOther}
                  onChange={(e) => {
                    setHousingOther(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className={styles.formFooter}>
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
    </div>
  );
};
