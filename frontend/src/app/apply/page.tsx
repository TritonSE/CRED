"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

// import BackButton from "./components/BackButton";
// import NextButton from "./components/NextButton";
// import CDCRAlert from "./components/CDCRAlert";

export default function ApplyPage() {
  return (
    <ThemeProvider>
      {/* page title section */}
      <div className="page-title-banner">
        <h1>Join Cred Today</h1>
        <p>
          Your journey to self-sufficiency starts here. We empower you with the tools to thrive, not
          just survive.
        </p>
      </div>

      <div className="form-space">{/* add form components here */}</div>
    </ThemeProvider>
  );
}
