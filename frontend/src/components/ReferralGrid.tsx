"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./ReferralGrid.module.css";

const categories = [
  {
    id: "education",
    title: "Education",
    selectedIcon: "/home/educationSelected.png",
    unselectedIcon: "/home/educationIcon.png",
    shortDesc: "College and Academic Programs",
    services: [
      {
        title: "Admissions & Enrollment Support",
        desc: "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
      },
      {
        title: "In-custody Courses",
        desc: "Credit-bearing college classes taught inside jails and prisons, so students can begin earning credentials before release.",
      },
      {
        title: "Academic Advising & Tutoring",
        desc: "On-campus support, dedicated study spaces, and peer mentorship from others with shared experiences.",
      },
      {
        title: "Transfer & Graduate Pathways",
        desc: "Advising for students moving from community college to four-year universities or graduate programs.",
      },
      {
        title: "Basic Needs Support",
        desc: "Emergency funds, food assistance, transportation, and laptop access to remove barriers for success.",
      },
    ],
  },
  {
    id: "housing",
    title: "Housing",
    selectedIcon: "/home/houseIcon.png",
    unselectedIcon: "/home/housingIconUnselected.png",
    shortDesc: "Shelter and Stable Housing",
    services: [
      {
        title: "Emergency Shelter & Bridge Housing",
        desc: "Safe, low-barrier shelter with meals, basic needs, and case management while a longer-term housing plan is developed.",
      },
      {
        title: "Transitional Housing",
        desc: "Short to medium-term housing in supportive environments with counseling, life skills, and addiction treatment services.",
      },
      {
        title: "Rapid Rehousing",
        desc: "Rental assistance, security deposits, and landlord advocacy to move people quickly from homelessness into permanent housing.",
      },
      {
        title: "Permanent Supportive Housing",
        desc: "Long-term affordable housing combined with on-site mental health, substance use, and benefits support for those with complex needs.",
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    selectedIcon: "/home/workSelected.png",
    unselectedIcon: "/home/workIcon.png",
    shortDesc: "Jobs, Training, and Entrepreneurship",
    services: [
      {
        title: "Job Readiness Training",
        desc: "Resume writing, interview coaching, soft skills development, and professional attire, typically delivered in structured multi-week programs.",
      },
      {
        title: "Entrepreneurship Resources",
        desc: "Support for aspiring business owners including business planning, access to microloans, mentorship, and connections to small business development resources.",
      },
      {
        title: "Vocational & Career Technical Training",
        desc: "Certified programs in high-demand fields including culinary arts, construction, retail, logistics, healthcare, and more.",
      },
      {
        title: "Employer Connections",
        desc: "Direct partnerships with fair-chance employers committed to hiring people with records, plus in-facility job centers up to six months before release.",
      },
    ],
  },
];

export default function ReferralGrid() {
  const [activeId, setActiveId] = useState("housing");
  const activeCategory = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className={styles.referralGrid}>
      <div className={styles.referralTabs}>
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              className={`${styles.referralTab} ${isActive ? styles.referralTabActive : ""}`}
              onClick={() => {
                setActiveId(category.id);
              }}
            >
              <div className={styles.referralTabHeader}>
                <Image
                  src={isActive ? category.selectedIcon : category.unselectedIcon}
                  alt={`${category.title} icon`}
                  width={32}
                  height={32}
                  className={styles.referralTabIcon}
                />
                {!isActive && (
                  <Image
                    src="/home/ArrowRight.png"
                    alt="arrow right"
                    width={16}
                    height={16}
                    className={styles.referralTabArrow}
                  />
                )}
              </div>

              <p
                className={`${styles.referralTabTitle} ${isActive ? styles.referralTabTitleActive : ""}`}
              >
                {category.title}
              </p>

              {isActive ? (
                <div className={styles.referralTabMeta}>
                  <div className={styles.referralTabMetaDash} />
                  <span>{category.services.length} Resources Available</span>
                </div>
              ) : (
                <p className={styles.referralTabDesc}>{category.shortDesc}</p>
              )}
            </button>
          );
        })}
      </div>

      <div className={styles.referralPanelWrapper}>
        <div className={styles.referralPanel}>
          {activeCategory.services.map((service, index) => (
            <div key={index} className={styles.referralService}>
              <h3 className={styles.referralServiceTitle}>{service.title}</h3>
              <p className={styles.referralServiceDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
