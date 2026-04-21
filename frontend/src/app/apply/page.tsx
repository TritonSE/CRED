"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import React, { useEffect } from "react";

import { NeedInterestsForm } from "./components/NeedInterestsForm";
import { YourProfileForm } from "./components/YourProfileForm";

// import BackButton from "./components/BackButton";
// import NextButton from "./components/NextButton";
// import CDCRAlert from "./components/CDCRAlert";

import "./styles.css";

export default function ApplyPage() {
  const [step, setStep] = React.useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Use "instant" if you don't want the sliding animation
    });
  }, [step]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <ThemeProvider>
      <div className="apply-top-section">
        <div className="apply-container">
          <h1 className="apply-title">Join Cred Today</h1>
          <p className="apply-intro">
            Your journey to self-sufficiency starts here. We empower you with the tools to thrive,
            not just survive.
          </p>
        </div>
      </div>

      <div className="apply-form-section">
        {step === 1 && <YourProfileForm onNext={handleNext} />}

        {step === 2 && <NeedInterestsForm onNext={handleNext} onBack={handleBack} />}

        {/* step === 3 && <NextForm onBack={handleBack} /> */}
      </div>
    </ThemeProvider>
  );
}
