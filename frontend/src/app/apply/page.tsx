"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import React from "react";

import { NeedInterestsForm } from "./components/NeedInterestsForm";
import { YourProfileForm } from "./components/YourProfileForm";

// import BackButton from "./components/BackButton";
// import NextButton from "./components/NextButton";
// import CDCRAlert from "./components/CDCRAlert";

import "./styles.css";

export default function ApplyPage() {
  const [step, setStep] = React.useState(1);

  return (
    <ThemeProvider>
      {/* page title section */}
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
        {step === 1 && (
          <YourProfileForm
            onNext={() => {
              setStep(2);
            }}
          />
        )}
        {step === 2 && <NeedInterestsForm />}
      </div>
    </ThemeProvider>
  );
}
