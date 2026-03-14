"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./Collaborator.module.css";

const COLLABORATOR_INFO: Record<string, { description: string; link: string }> = {
  "Father Joe's Villages": {
    description:
      "Father Joe's Villages provides emergency shelter, transitional housing, and permanent supportive housing for individuals and families experiencing homelessness in San Diego. These programs offer safe housing alongside supportive services such as case management, healthcare, employment support, and housing navigation to help residents regain stability and move toward long-term independence. The best way to access these resources, is to visit Father Joe's Villages in person.",
    link: "https://my.neighbor.org/get-help/",
  },
  "San Diego State University": { description: "", link: "" },
  "Underground Scholars": { description: "", link: "" },
  "Alpha Project": { description: "", link: "" },
};

const collaboratorsData = [
  // --- EDUCATION ---
  { id: 1, name: "San Diego State University", category: "Education", logo: "/sdsuLogo.png" },
  { id: 2, name: "Father Joe's Villages", category: "Education", logo: "/fatherJoeLogo.png" },
  {
    id: 3,
    name: "Underground Scholars",
    category: "Education",
    logo: "/undergroundScholarLogo.png",
  },
  { id: 4, name: "Alpha Project", category: "Education", logo: "/alphaLogo.png" },
  { id: 5, name: "Father Joe's Villages", category: "Education", logo: "/fatherJoeLogo.png" },
  { id: 6, name: "Alpha Project", category: "Education", logo: "/alphaLogo.png" },
  { id: 7, name: "San Diego State University", category: "Education", logo: "/sdsuLogo.png" },
  {
    id: 8,
    name: "Underground Scholars",
    category: "Education",
    logo: "/undergroundScholarLogo.png",
  },

  // --- DEVELOPMENT ---
  { id: 9, name: "Father Joe's Villages", category: "Development", logo: "/fatherJoeLogo.png" },
  {
    id: 10,
    name: "Underground Scholars",
    category: "Development",
    logo: "/undergroundScholarLogo.png",
  },
  { id: 11, name: "Alpha Project", category: "Development", logo: "/alphaLogo.png" },

  { id: 12, name: "San Diego State University", category: "Development", logo: "/sdsuLogo.png" },
  { id: 13, name: "San Diego State University", category: "Development", logo: "/sdsuLogo.png" },
  { id: 14, name: "Alpha Project", category: "Development", logo: "/alphaLogo.png" },
  { id: 15, name: "Father Joe's Villages", category: "Development", logo: "/fatherJoeLogo.png" },
  {
    id: 16,
    name: "Underground Scholars",
    category: "Development",
    logo: "/undergroundScholarLogo.png",
  },

  // --- HOUSING ---
  { id: 17, name: "Alpha Project", category: "Housing", logo: "/alphaLogo.png" },
  {
    id: 18,
    name: "Underground Scholars",
    category: "Housing",
    logo: "/undergroundScholarLogo.png",
  },
  { id: 19, name: "Father Joe's Villages", category: "Housing", logo: "/fatherJoeLogo.png" },
  { id: 20, name: "San Diego State University", category: "Housing", logo: "/sdsuLogo.png" },
  {
    id: 21,
    name: "Underground Scholars",
    category: "Housing",
    logo: "/undergroundScholarLogo.png",
  },
  { id: 22, name: "San Diego State University", category: "Housing", logo: "/sdsuLogo.png" },
  { id: 23, name: "Alpha Project", category: "Housing", logo: "/alphaLogo.png" },
  { id: 24, name: "Father Joe's Villages", category: "Housing", logo: "/fatherJoeLogo.png" },
];

export default function Collaborator() {
  const [activeTab, setActiveTab] = useState("Education");
  const [selectedCollab, setSelectedCollab] = useState<{ name: string; category: string } | null>(
    null,
  );

  const filteredCollaborators = collaboratorsData.filter((collab) => collab.category === activeTab);

  const getIcon = (tabName: string, isActive: boolean) => {
    const color = isActive ? "#ffffff" : "#175892";

    if (tabName === "Education") {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    }
    if (tabName === "Development") {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    }
    if (tabName === "Housing") {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    }
  };

  const tabs = ["Education", "Development", "Housing"];

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Discover Our Collaborators</h2>
        <p className={styles.subtitle}>
          We are grateful to partner with these organizations to fit our clients to the resources
          and programs they need.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Separated Tabs */}
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {getIcon(tab, activeTab === tab)}
              {tab}
            </button>
          ))}
        </div>

        {/* Large White Panel with Logos */}
        <div className={styles.logoPanel}>
          <div className={styles.grid}>
            {filteredCollaborators.map((collab) => (
              <div
                key={collab.id}
                className={styles.logoCard}
                onClick={() => {
                  setSelectedCollab({ name: collab.name, category: collab.category });
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={collab.logo}
                    alt={`${collab.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className={styles.logoName}>{collab.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCollab && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setSelectedCollab(null);
          }}
        >
          <div
            className={styles.modal}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className={styles.modalClose}
              onClick={() => {
                setSelectedCollab(null);
              }}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>
              {selectedCollab.name} {selectedCollab.category} Programs
            </h2>
            {COLLABORATOR_INFO[selectedCollab.name]?.description && (
              <p className={styles.modalDescription}>
                {(() => {
                  const desc = COLLABORATOR_INFO[selectedCollab.name].description;
                  const name = selectedCollab.name;
                  if (desc.startsWith(name)) {
                    return (
                      <>
                        <strong>{name}</strong>
                        {desc.slice(name.length)}
                      </>
                    );
                  }
                  return desc;
                })()}
              </p>
            )}
            <div className={styles.modalButtonWrapper}>
              {COLLABORATOR_INFO[selectedCollab.name]?.link ? (
                <a
                  href={COLLABORATOR_INFO[selectedCollab.name].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.learnMoreButton}
                >
                  Learn More
                </a>
              ) : (
                <button className={styles.learnMoreButton}>Learn More</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
