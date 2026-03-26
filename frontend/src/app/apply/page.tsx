"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

// import BackButton from "./components/BackButton";
// import NextButton from "./components/NextButton";
// import CDCRAlert from "./components/CDCRAlert";

import "./styles.css";

export default function ApplyPage() {
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

      <div className="page-title-banner">
        <p>Insert Form</p>
      </div>

      <div className="form-space">{/* add form components here */}</div>
    </ThemeProvider>
  );
}
