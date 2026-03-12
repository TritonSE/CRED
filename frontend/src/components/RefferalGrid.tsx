"use client";

import Image from "next/image";

import styles from "./RefferalGrid.module.css";

const categories = [
  {
    id: "housing",
    title: "Housing Resources",
    icon: "/houseIcon.png",
    shortDesc: null,
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
    icon: "/educationIcon.png",
    shortDesc: "Economic resources, financial training, and higher education",
    services: [
      // TODO: Add education services
    ],
  },
  {
    id: "workforce",
    title: "Workforce Development",
    icon: "/workIcon.png",
    shortDesc: "Vocational training, entrepreneurship & job readiness",
    services: [
      // TODO: Add workforce development services
    ],
  },
];

// TODO: Replace activeId with useState once Education and Workforce tabs are ready
const activeId = "housing";

export default function RefferalGrid() {
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
              disabled
            >
              <div className={styles.refferalTabHeader}>
                <Image
                  src={category.icon}
                  alt={`${category.title} icon`}
                  width={32}
                  height={32}
                  className={`${styles.refferalTabIcon} ${isActive ? styles.refferalTabIconActive : ""}`}
                />
                {!isActive && (
                  <Image
                    src="/ArrowRight.png"
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
