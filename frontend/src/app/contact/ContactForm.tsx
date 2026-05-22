"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import styles from "./Contact.module.css";

import { sendContactMessage } from "@/api/contact";

type ContactFormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const DEFAULT_VALUES: ContactFormValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!fullName) errors.fullName = "Full name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!subject) errors.subject = "Subject is required.";
  if (!message) errors.message = "Message is required.";

  return errors;
}

function SuccessCard() {
  return (
    <div className={styles.card}>
      <div className={styles.successIconWrapper} aria-hidden="true">
        <svg viewBox="0 0 50 50" className={styles.successIcon}>
          <path
            d="M41.6667 12.5L18.75 35.4167L8.33333 25"
            stroke="#14AE5C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            fill="none"
          />
        </svg>
      </div>

      <div className={styles.successContent}>
        <h2 className={styles.successTitle}>Your Form Has Been Submitted!</h2>
        <p className={styles.successText}>
          Thank you for contacting us. Your message has been
          <br />
          successfully received, and we&apos;ll be in touch shortly.
        </p>
        <Link href="/" className={styles.primaryButton}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function NeedImmediateAssistance() {
  return (
    <section className={styles.assistanceCard} aria-label="Need immediate assistance">
      <h3 className={styles.assistanceTitle}>Need Immediate Assistance?</h3>
      <p className={styles.assistanceText}>
        If your inquiry is urgent, please feel free to contact us directly:
      </p>

      <div className={styles.assistanceList}>
        <div className={`${styles.assistanceItem} ${styles.assistanceItemPhone}`}>
          <svg className={styles.assistanceIcon} fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
              fill="#004377"
            />
          </svg>
          <span className={styles.assistanceLabel}>Phone:</span>
          <a className={styles.assistanceLink} href="tel:18884534943">
            1-888-453-4943
          </a>
        </div>

        <div className={styles.assistanceItem}>
          <svg className={styles.assistanceIcon} fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4 6L12 11L20 6H4ZM4 8V18H20V8L12 13L4 8Z"
              fill="#175892"
            />
          </svg>
          <span className={styles.assistanceLabel}>Email:</span>
          <a className={styles.assistanceLink} href="mailto:credsd@credsd.org">
            credsd@credsd.org
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);
  const isReadyToSubmit = useMemo(() => {
    return (
      values.fullName.trim().length > 0 &&
      values.email.trim().length > 0 &&
      isValidEmail(values.email.trim()) &&
      values.subject.trim().length > 0 &&
      values.message.trim().length > 0
    );
  }, [values.email, values.fullName, values.message, values.subject]);

  const onChange = (field: keyof ContactFormValues) => {
    return (e: import("react").ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === "message" && e.target instanceof HTMLTextAreaElement) {
        e.target.style.height = "0px";
        e.target.style.height = `${e.target.scrollHeight.toString()}px`;
      }

      const nextValues = { ...values, [field]: e.target.value };
      setValues(nextValues);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  };

  const onSubmit = async (e: import("react").SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const normalizedValues: ContactFormValues = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    const nextErrors = validate(normalizedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendContactMessage(normalizedValues);
      if (!result.success) {
        setSubmitError(result.error);
        return;
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formLayout}>
      {isSubmitted ? (
        <SuccessCard />
      ) : (
        <div className={styles.card}>
          <header className={styles.formHeader}>
            <h2 className={styles.formTitle}>Have Questions?</h2>
            <p className={styles.formSubtitle}>
              For more information, please use the contact form below to connect with our team.
            </p>
          </header>

          <form className={styles.form} onSubmit={(e) => void onSubmit(e)} noValidate>
            <div className={styles.gridTwoCol}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fullName">
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder=""
                  value={values.fullName}
                  onChange={onChange("fullName")}
                  className={styles.input}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  required
                />
                {errors.fullName ? (
                  <p id="fullName-error" className={styles.errorText} role="alert">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={onChange("email")}
                  className={styles.input}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email ? (
                  <p id="email-error" className={styles.errorText} role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject">
                Subject <span className={styles.required}>*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Describe your reason for contact (Program Inquiry, Application Support, Partnership Opportunities, Donations)."
                value={values.subject}
                onChange={onChange("subject")}
                className={styles.input}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                required
              />
              {errors.subject ? (
                <p id="subject-error" className={styles.errorText} role="alert">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder=""
                value={values.message}
                onChange={onChange("message")}
                className={styles.textarea}
                rows={1}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                required
              />
              {errors.message ? (
                <p id="message-error" className={styles.errorText} role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={!isReadyToSubmit || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>

            {hasErrors ? (
              <p className={styles.formHint} role="status">
                Please fix the highlighted fields and try again.
              </p>
            ) : null}

            {submitError ? (
              <p className={styles.errorText} role="alert">
                {submitError}
              </p>
            ) : null}
          </form>
        </div>
      )}

      {isSubmitted ? <NeedImmediateAssistance /> : null}
    </div>
  );
}
