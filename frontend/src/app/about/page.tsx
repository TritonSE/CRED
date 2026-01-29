"use client";

// import { ThemeProvider } from "@tritonse/tse-constellation";

import { DirectorBox } from "./components/DirectorBox";
import { OperationsCard } from "./components/OperationsCard";
import "./styles.css";

export default function AboutUsPage() {
  return (
    // <ThemeProvider>
    <div>
      <div className="about-page">
        <div className="about-top-section">
          <div className="about-container">
            <h1 className="about-title">About CRED</h1>
            <p className="about-intro">
              <strong>Community Realignment Education Development (CRED)</strong> was founded in
              2018 by DeQuan Patterson, a Formerly Incarcerated Individual.
            </p>
          </div>
        </div>

        <div className="about-vision-section">
          <div className="about-container">
            <div className="about-grid">
              <div className="about-vision-wrapper">
                <h2 className="about-heading">Our Vision</h2>
                <div className="about-vision-content">
                  <p>
                    We seek to address systemic issues that impact our communities, including racial
                    inequality, economic disparities, and barriers to higher education and
                    employment opportunities.
                  </p>
                  <p>
                    Through education, interpersonal development of life skills and lived experience
                    mentorship, CRED&apos;s empowerment and healing centered engagement ensures
                    clients success.
                  </p>
                </div>
              </div>

              <div className="about-image-placeholder">{/* Insert Image */}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="directorBoxContainer">
        <DirectorBox
          title="What We Do"
          textBody="We empower individuals to thrive by offering clients financial literacy training, comprehensive re-entry services, job opportunities, and a path to entrepreneurship."
          buttonlabel="Our Services"
          imageUrl="/Map_Marker.svg"
          backgroundUrl="/What_We_Do_Background.jpg"
        />
        <DirectorBox
          title="Our Goal"
          textBody="CRED's main goal is to provide case management support along with interpersonal skill training support so our clients can thrive as self-sufficient individuals."
          buttonlabel="Support Us"
          imageUrl="/folder_people.svg"
          backgroundUrl="/Our_Goal_Background.jpg"
        />
      </div>

      <div className="howWeOperateSection">
        <h2 className="about-heading">How We Operate</h2>
        <p className="howWeOperateBody">
          CRED is unique in being a lived experience expert-based organization serving minorities as
          our main clientele to bridge the barrier gap in services. We support survivors of systemic
          injustice and misplacement due to recidivism, homelessness, domestic violence, gang
          violence, and human trafficking.
        </p>
        <div className="operationsBoxContainer">
          <OperationsCard
            num={1}
            title="You Apply to CRED"
            textBody="Review CRED's programs and see which type of support best fits your current situation. Then, fill out the application form."
          />
          <OperationsCard
            num={2}
            title="We Assess Your Needs"
            textBody="After you submit, CRED's team will review your application and follow up with next steps. We’ll contact you if we need more information."
          />
          <OperationsCard
            num={3}
            title="You Become a Client!"
            textBody="Our clients have moved on to find stability and build better lives through entrepreneurship and life skill development."
          />
        </div>
      </div>
    </div>
    // </ThemeProvider>
  );
}
