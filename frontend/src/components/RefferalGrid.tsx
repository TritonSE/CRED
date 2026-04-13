"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./RefferalGrid.module.css";

const categories = [
  {
    id: "housing",
    title: "Housing Resources",
    selectedIcon: "/home/houseIcon.png",
    unselectedIcon: "/home/housingIconUnselected.png",
    shortDesc: "Emergency shelter, transitional, and permanent housing support",
    services: [
      {
        title: "Emergency Shelter Services",
        desc: "Immediate access to safe, temporary shelter for individuals and families experiencing homelessness or housing crises.",
      },
      {
        title: "Transitional Housing Programs",
        desc: "Short to medium-term housing solutions with supportive services to help clients transition to permanent housing.",
      },
      {
        title: "Permanent Supportive Housing",
        desc: "Long-term housing assistance combined with ongoing case management and support services for sustainable stability.",
      },
      {
        title: "Housing Application Assistance",
        desc: "Various housing options and guidance through the application process for affordable housing programs, subsidies, and rental assistance.",
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    selectedIcon: "/home/educationSelected.png",
    unselectedIcon: "/home/educationIcon.png",
    shortDesc: "Economic resources, financial training, and higher education",
    services: [
      {
        title: "Economic Resources",
        desc: "Guidance on budgeting, saving strategies, and accessing community economic development programs to build financial independence.",
      },
      {
        title: "Financial Training",
        desc: "Comprehensive workshops covering credit management, debt reduction, insurance planning, mortgages, and smart financial decision-making.",
      },
      {
        title: "Higher Education Degrees",
        desc: "Assistance with college applications, financial aid navigation, scholarship opportunities, and connecting to higher education support services.",
      },
    ],
  },
  {
    id: "workforce",
    title: "Workforce Development",
    selectedIcon: "/home/workSelected.png",
    unselectedIcon: "/home/workIcon.png",
    shortDesc: "Vocational training, entrepreneurship & job readiness",
    services: [
      {
        title: "Vocational Training",
        desc: "Access to certified training programs in high-demand fields including healthcare, technology, construction, and skilled trades.",
      },
      {
        title: "Entrepreneurship Resources",
        desc: "Support for aspiring business owners including business planning, access to microloans, mentorship, and connections to small business development resources.",
      },
      {
        title: "Job Readiness",
        desc: "Comprehensive preparation including resume writing, interview skills, professional development, and job placement assistance with partner employers.",
      },
    ],
  },
];

export default function RefferalGrid() {
  const [activeId, setActiveId] = useState("housing");
  const activeCategory = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className={styles.refferalGrid}>
      {/* Left: Category tab buttons */}
      <div className={styles.refferalTabs}>
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              className={`${styles.refferalTab} ${isActive ? styles.refferalTabActive : ""}`}
              onClick={() => {
                setActiveId(category.id);
              }}
            >
              <div className={styles.refferalTabHeader}>
                <Image
                  src={isActive ? category.selectedIcon : category.unselectedIcon}
                  alt={`${category.title} icon`}
                  width={32}
                  height={32}
                  className={styles.refferalTabIcon}
                />
                {!isActive && (
                  <Image
                    src="/home/ArrowRight.png"
                    alt="arrow right"
                    width={16}
                    height={16}
                    className={styles.refferalTabArrow}
                  />
                )}
              </div>

              <p
                className={`${styles.refferalTabTitle} ${isActive ? styles.refferalTabTitleActive : ""}`}
              >
                {category.title}
              </p>

              {isActive ? (
                <div className={styles.refferalTabMeta}>
                  <div className={styles.refferalTabMetaDash} />
                  <span>{category.services.length} services available</span>
                </div>
              ) : (
                <p className={styles.refferalTabDesc}>{category.shortDesc}</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Services panel */}
      <div className={styles.refferalPanel}>
        {activeCategory.services.map((service, index) => (
          <div key={index} className={styles.refferalService}>
            <h3 className={styles.refferalServiceTitle}>{service.title}</h3>
            <p className={styles.refferalServiceDesc}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
