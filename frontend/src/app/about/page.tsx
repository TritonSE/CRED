"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { DirectorBox } from "./components/DirectorBox";
import { OperationsCard } from "./components/OperationsCard";

import "./styles.module.css";

export default function AboutUsPage() {
  const router = useRouter();
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
              <h2 className="about-heading">Our Vision</h2>
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
              <Image
                src="/OurVisionImage.png"
                alt="Illustration accompanying the Our Vision section"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="directorBoxContainer">
        <div className="directorBoxes">
          {/* need to add ref to our services page */}
          <DirectorBox
            title="What We Do"
            textBody="We empower individuals to thrive by offering clients financial literacy training, comprehensive re-entry services, job opportunities, and a path to entrepreneurship."
            buttonlabel="Our Services"
            imageUrl="/Map_Marker.svg"
            backgroundUrl="/What_We_Do_Background.jpg"
            onButtonClick={() => {
              router.push("/dashboard");
            }}
          />
          {/* need to add ref to support us page */}
          <DirectorBox
            title="Our Goal"
            textBody="CRED's main goal is to provide case management support along with interpersonal skill training support so our clients can thrive as self-sufficient individuals."
            buttonlabel="Support Us"
            imageUrl="/folder_people.svg"
            backgroundUrl="/Our_Goal_Background.jpg"
            onButtonClick={() => {
              router.push("/dashboard");
            }}
          />
        </div>
      </div>

      <div className="how-we-operate-section">
        <div className="operate-wrapper">
          <h2 className="operate-heading">How We Operate</h2>
          <p className="about-operate-content">
            CRED is unique in being a lived experience expert-based organization serving minorities
            as our main clientele to bridge the barrier gap in services. We support survivors of
            systemic injustice and misplacement due to recidivism, homelessness, domestic violence,
            gang violence, and human trafficking.
          </p>

          <div className="operateCards">
            <OperationsCard
              iconURL="/apply_icon.svg"
              title="You Apply to CRED"
              textBody="Review CRED's programs and see which type of support best fits your current situation. Then, fill out the application form."
            />
            <Image src="/Vector.png" alt="arrow" className="vectors" width={30} height={30} />
            <OperationsCard
              iconURL="/assess_needs_icon.svg"
              title="We Assess Your Needs"
              textBody="After you submit, CRED's team will review your application and follow up with next steps. We'll contact you if we need more information."
            />
            <Image src="/Vector.png" alt="arrow" className="vectors" width={30} height={30} />
            <OperationsCard
              iconURL="/client_icon.svg"
              title="You Become a Client!"
              textBody="Our clients have moved on to find stability and build better lives through entrepreneurship and life skill development."
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
