"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { DirectorBox } from "./components/DirectorBox";
import { OperationsCard } from "./components/OperationsCard";
import styles from "./styles.module.css";

import HeroSection from "@/components/HeroSection";

export default function AboutUsPage() {
  const router = useRouter();
  return (
    <ThemeProvider>
      <div className={styles.aboutPage}>
        <HeroSection
          className={styles.aboutHero}
          variant="banner"
          imageSrc="/BannerPic.jpg"
          imageAlt=""
          imageClassName={styles.aboutHeroImage}
          title="We Are CRED"
          subtitle="CRED provides individualized services for system-impacted individuals, low-income families, and transitional age youth seeking stability and self-sufficiency."
          overlayGradient="linear-gradient(to right, #004377, rgba(30, 115, 190, 0.8))"
          priority
        />

        <div className={styles.aboutVisionSection}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutVisionWrapper}>
              <h2 className={styles.aboutHeading}>Our Vision</h2>
              <div className={styles.aboutVisionContent}>
                <p>
                  Our vision is to restore and realign communities by addressing the root causes of
                  incarceration. Through education, life skills development, and mentorship grounded
                  in lived experience, CRED creates pathways for sustainable success and
                  generational impact.
                </p>
              </div>
            </div>

            <div className={styles.aboutImagePlaceholder}>
              <Image
                src="/OurVision.png"
                alt="Illustration accompanying the Our Vision section"
                width={500}
                height={335}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.directorBoxContainer}>
        <div className={styles.directorBoxes}>
          <DirectorBox
            title="What We Do"
            textBody="We empower individuals to thrive by offering clients financial literacy training, comprehensive re-entry services, job opportunities, and a path to entrepreneurship."
            buttonlabel="Types of Aid"
            imageUrl="/Map_Marker.svg"
            backgroundUrl="/What_We_Do_Background.jpg"
            onButtonClick={() => {
              router.push("/");
            }}
          />
          {/* need to add ref to Donate page */}
          <DirectorBox
            title="Our Goal"
            textBody="CRED's main goal is to provide case management support along with interpersonal skill training support so our clients can thrive as self-sufficient individuals."
            buttonlabel="Support Us"
            imageUrl="/folder_people.svg"
            backgroundUrl="/Our_Goal_Background.jpg"
            onButtonClick={() => {
              router.push("/donate");
            }}
          />
        </div>
      </div>

      <div className={styles.howWeOperateSection}>
        <div className={styles.operateWrapper}>
          <h2 className={styles.operateHeading}>How We Operate</h2>
          <p className={styles.aboutOperateContent}>
            CRED is unique in being a lived experience expert-based organization serving minorities
            as our main clientele to bridge the barrier gap in services. We support survivors of
            systemic injustice and misplacement due to recidivism, homelessness, domestic violence,
            gang violence, and human trafficking.
          </p>

          <div className={styles.operateCards}>
            <OperationsCard
              iconURL="/apply_icon.svg"
              title="Step 1: You Apply to CRED"
              textBody="Review CRED's programs and see which type of support best fits your current situation. Then, fill out the application form."
            />
            <Image
              src="/Vector.png"
              alt="arrow"
              className={styles.vectors}
              width={30}
              height={30}
            />
            <OperationsCard
              iconURL="/assess_needs_icon.svg"
              title="Step 2: We Assess Your Needs"
              textBody="After you submit, CRED's team will review your application and follow up with next steps. We'll contact you if we need more information."
            />
            <Image
              src="/Vector.png"
              alt="arrow"
              className={styles.vectors}
              width={30}
              height={30}
            />
            <OperationsCard
              iconURL="/client_icon.svg"
              title="Step 3: You Become a Client!"
              textBody="Our clients have moved on to find stability and build better lives through entrepreneurship and life skill development."
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
