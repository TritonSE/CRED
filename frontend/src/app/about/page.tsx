"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import Image from "next/image";

import { DirectorBox } from "./components/DirectorBox";
import "./styles.css";

export default function AboutUsPage() {
  return (
    <ThemeProvider>
      <div className="about-page">
        <div className="about-top-section">
          <div className="about-container">
            <h1 className="about-title">We Are CRED</h1>
            <p className="about-intro">
              CRED provides individualized services for system-impacted individuals, low-income
              families, and transitional age youth seeking stability and self-sufficiency.
            </p>
          </div>
        </div>

        <div className="about-vision-section">
          <div className="about-grid">
            <div className="about-vision-wrapper">
              <h2 className="about-vision-heading">Our Vision</h2>
              <div className="about-vision-content">
                <p>
                  We seek to address systemic issues that impact our communities, including racial
                  inequality, economic disparities, and barriers to higher education and employment
                  opportunities.
                </p>
                <p>
                  Through education, interpersonal development of life skills and lived experience
                  mentorship, CRED&apos;s empowerment and healing centered engagement ensures
                  clients success.
                </p>
              </div>
            </div>

            <div className="about-image-placeholder">
              <Image src="/AboutPic1.png" alt="About Us Image" width={400} height={300} />
            </div>
          </div>
        </div>
      </div>

      <div className="directorBoxContainer">
        <div className="directorBoxes">
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
      </div>
    </ThemeProvider>
  );
}
