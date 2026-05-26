"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./Collaborator.module.css";
import { CollaboratorPopup } from "./CollaboratorPopup";

type CollabPopupData = {
  titles: string[];
  program: string;
  description: string[];
  link: string;
};

type CollabData = {
  id: number;
  name: string;
  category: "Education" | "Housing" | "Development";
  logo: string;
  data: CollabPopupData;
};

const collaboratorsData: CollabData[] = [
  // --- EDUCATION ---
  {
    id: 1,
    name: "City Scholars",
    category: "Education",
    logo: "/home/san_diego_city_scholars.png",
    data: {
      titles: [
        "Admissions and Enrollment Support",
        "In-custody Courses",
        "Academic Advising and Tutoring",
        "Basic Needs Support",
      ],
      program: "San Diego City College",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "College classes taught inside jails and prisons, so students can begin earning credits before release.",
        "On-campus support, dedicated study spaces, and peer mentorship from others with shared experiences.",
        "Emergency funds, food assistance, transportation, and laptop access to remove barriers for success.",
      ],
      link: "https://www.sdcity.edu/students/services/city-scholars.aspx",
    },
  },
  {
    id: 2,
    name: "Underground Scholars",
    category: "Education",
    logo: "/home/underground_scholars.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 3,
    name: "Project Rebound - SDSU",
    category: "Education",
    logo: "/home/rebound_sdsu.png",
    data: {
      titles: [
        "Admissions and Enrollment Support",
        "Academic Advising and Tutoring",
        "Transfer and Graduate Pathways",
      ],
      program: "San Diego State University",
      description: [
        "Assistance with university applications, financial aid, and navigating the enrollment process.",
        "Dedicated academic counselors and peer tutors for formerly incarcerated students.",
        "Advising for students moving from community college to four-year universities or graduate programs.",
      ],
      link: "https://rebound.sdsu.edu",
    },
  },
  {
    id: 4,
    name: "Project Rebound - CSUSM",
    category: "Education",
    logo: "/home/rebound_san_marcos.png",
    data: {
      titles: ["Enrollment Guidance", "Campus Integration"],
      program: "California State University - San Marcos",
      description: [
        "Help with admissions, financial aid, and course selection for system-impacted students.",
        "Support services to help formerly incarcerated students thrive in the university environment.",
      ],
      link: "https://www.csusm.edu/projectrebound/index.html",
    },
  },
  {
    id: 5,
    name: "Project Rebound",
    category: "Education",
    logo: "/home/rebound_cal_state.png",
    data: {
      titles: ["Statewide Network", "Scholarships and Financial Aid", "Basic Needs Support"],
      program: "California State University Campuses",
      description: [
        "Access to Project Rebound programs across all Cal State campuses.",
        "Dedicated funding opportunities for formerly incarcerated students.",
        "Emergency funds, food assistance, and housing referrals.",
      ],
      link: "https://www.calstate.edu/impact-of-the-csu/student-success/project-rebound",
    },
  },
  {
    id: 6,
    name: "Rising Scholars",
    category: "Education",
    logo: "/home/rising_scholars.png",
    data: {
      titles: ["In-Custody Education", "Transition Support", "Academic Advising"],
      program: "Palomar College",
      description: [
        "College courses offered inside correctional facilities through Palomar College.",
        "Assistance transitioning from incarceration to campus-based education.",
        "Dedicated counseling and advising for justice-impacted students.",
      ],
      link: "https://www.palomar.edu/risingscholars/",
    },
  },

  // --- HOUSING ---
  {
    id: 7,
    name: "Father Joe's Villages",
    category: "Housing",
    logo: "/home/fjv.png",
    data: {
      titles: [
        "Emergency Shelter & Bridge Housing",
        "Transitional Housing",
        "Permanent Supportive Housing",
      ],
      program: "1501 Imperial Ave. San Diego, CA 92101",
      description: [
        "Safe, low-barrier shelter with meals, basic needs, and case management while a longer-term housing plan is developed.",
        "Short to medium-term housing in supportive environments with counseling, life skills, addiction treatment, and more.",
        "Long-term affordable housing combined with on-site mental health and substance use support.",
      ],
      link: "https://my.neighbor.org/",
    },
  },
  {
    id: 8,
    name: "Alpha Project",
    category: "Housing",
    logo: "/home/alpha.png",
    data: {
      titles: ["Emergency Shelter", "Rapid Re-Housing", "Permanent Supportive Housing"],
      program: "3737 Fifth Ave, Suite 203, San Diego, CA 92103",
      description: [
        "Operates multiple emergency shelters (including 16th & Newton) providing beds, food, and services for over 500 individuals.",
        "Provides rental assistance, security deposits, and housing navigation for families and individuals.",
        "Manages housing units for individuals with chronic illnesses or disabilities, including Alpha Square and Alpha Lofts for veterans.",
      ],
      link: "https://alphaproject.org",
    },
  },
  {
    id: 9,
    name: "Catholic Charities",
    category: "Housing",
    logo: "/home/catholic_charities.png",
    data: {
      titles: ["Housing Assistance", "Case Management", "Basic Needs"],
      program: "Locations Across San Diego and Imperial Counties",
      description: [
        "Emergency and transitional housing programs for individuals and families in need.",
        "Comprehensive case management to address barriers to stability and self-sufficiency.",
        "Food, clothing, and essential supplies for individuals experiencing hardship.",
      ],
      link: "https://ccdsd.org",
    },
  },
  {
    id: 10,
    name: "Five Keys",
    category: "Development",
    logo: "/home/five_keys.png",
    data: {
      titles: ["Vocational Training", "High School Diploma & GED", "Career Readiness"],
      program: "Online and locations across California",
      description: [
        "Certified programs in high-demand fields including culinary arts, construction, and healthcare.",
        "Accredited charter school programs available inside correctional facilities.",
        "Job skills training, resume building, and interview preparation.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 11,
    name: "SD Workforce Partnership",
    category: "Development",
    logo: "/home/san_diego_workforce_partnership.png",
    data: {
      titles: ["Job Placement Services", "Skills Training", "Career Counseling"],
      program: "Multiple career center locations across San Diego",
      description: [
        "Direct connections to employers committed to hiring justice-impacted individuals.",
        "Industry-specific training programs in technology, healthcare, and skilled trades.",
        "One-on-one guidance to identify career paths and develop professional skills.",
      ],
      link: "https://workforce.org",
    },
  },

  // TODO: Finish before tuesday: Done with SD Workforce Partnership going top down then left right.
  {
    id: 12,
    name: "Second Chance",
    category: "Development",
    logo: "/home/second_chance.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 13,
    name: "Defy Ventures",
    category: "Development",
    logo: "/home/defy_ventures.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 14,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 15,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 16,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 17,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 18,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 19,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
  {
    id: 20,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/arc.png",
    data: {
      titles: ["Peer Mentorship", "Academic Support", "Community Building"],
      program: "UC San Diego",
      description: [
        "Guidance navigating college applications, financial aid, and enrollment processes, including specialized pathways for justice-impacted students.",
        "Tutoring, study groups, and academic advising tailored to system-impacted students.",
        "Regular events, workshops, and social gatherings to build a supportive network.",
      ],
      link: "https://oasis.ucsd.edu/programs/USI-folder/index.html",
    },
  },
];

function getCollab(id: number) {
  return collaboratorsData.find((c) => c.id === id);
}

export default function Collaborator() {
  const [activeTab, setActiveTab] = useState("Education");
  const [selectedCollab, setSelectedCollab] = useState<{ id: number; category: string } | null>(
    null,
  );

  const filteredCollaborators = collaboratorsData.filter((collab) => collab.category === activeTab);
  const selectedCollabData = selectedCollab ? getCollab(selectedCollab.id) : null;

  const getIcon = (tabName: string, isActive: boolean) => {
    const color = isActive ? "#ffffff" : "#175892";

    if (tabName === "Education") {
      return (
        <svg
          width="52"
          height="52"
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
          width="52"
          height="52"
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
          width="52"
          height="52"
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

  const tabs = {
    Education: "Select a partner to view services",
    Housing: "Transitional and Permanent",
    Development: "Jobs, Training, Entrepreneurship",
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Types of Aid and Partner Programs</h2>
        <p className={styles.subtitle}>
          We connect you with education, housing, development, entrepreneurship, and re-entry
          resources for your specific needs. Discover our full list of San Diego-based partners and
          explore the types of resources we offer. Select each partner to learn more.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Separated Tabs */}
        <div className={styles.tabsContainer}>
          {Object.entries(tabs).map(([tab, description]) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {getIcon(tab, activeTab === tab)}
              <div className={styles.tabTextContainer}>
                <span className={styles.tabName}>{tab}</span>
                <span className={styles.tabDescription}>{description}</span>
              </div>
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
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedCollab({ id: collab.id, category: collab.category });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCollab({ id: collab.id, category: collab.category });
                  }
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={collab.logo}
                    alt={`${collab.name} logo`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                    unoptimized={true}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className={styles.logoName}>{collab.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* The selected collab name is the name of the program, e.g. not San Diego City College, but City Scholar's */}
      {selectedCollabData && (
        <CollaboratorPopup
          image={selectedCollabData.logo}
          name={selectedCollabData.name}
          program={selectedCollabData.data.program}
          link={selectedCollabData.data.link}
          titles={selectedCollabData.data.titles}
          description={selectedCollabData.data.description}
          onClose={() => {
            setSelectedCollab(null);
          }}
        />
      )}
    </div>
  );
}
