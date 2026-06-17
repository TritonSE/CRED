"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

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
  category: "Education" | "Housing" | "Development" | "Other Resources";
  logo: string;
  data: CollabPopupData;
};

const collaboratorsData: CollabData[] = [
  // --- EDUCATION ---
  {
    id: 1,
    name: "City Scholars",
    category: "Education",
    logo: "/home/collaborators/san_diego_city_scholars.png",
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
    logo: "/home/collaborators/underground_scholars.png",
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
    logo: "/home/collaborators/rebound_sdsu.png",
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
      link: "https://rebound.sdsu.edu/",
    },
  },
  {
    id: 4,
    name: "Project Rebound - CSUSM",
    category: "Education",
    logo: "/home/collaborators/rebound_san_marcos.png",
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
    logo: "/home/collaborators/rebound_cal_state.png",
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
    logo: "/home/collaborators/rising_scholars.png",
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
    logo: "/home/collaborators/fjv.png",
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
    logo: "/home/collaborators/alpha.png",
    data: {
      titles: ["Emergency Shelter", "Rapid Re-Housing", "Permanent Supportive Housing"],
      program: "3737 Fifth Ave, Suite 203, San Diego, CA 92103",
      description: [
        "Operates multiple emergency shelters (including 16th & Newton) providing beds, food, and services for over 500 individuals.",
        "Provides rental assistance, security deposits, and housing navigation for families and individuals.",
        "Manages housing units for individuals with chronic illnesses or disabilities, including Alpha Square and Alpha Lofts for veterans.",
      ],
      link: "https://alphaproject.org/",
    },
  },
  {
    id: 9,
    name: "Catholic Charities",
    category: "Housing",
    logo: "/home/collaborators/catholic_charities.png",
    data: {
      titles: ["Housing Assistance", "Case Management", "Basic Needs"],
      program: "Locations Across San Diego and Imperial Counties",
      description: [
        "Emergency and transitional housing programs for individuals and families in need.",
        "Comprehensive case management to address barriers to stability and self-sufficiency.",
        "Food, clothing, and essential supplies for individuals experiencing hardship.",
      ],
      link: "https://catholiccharitiesca.org/agency/catholic-charities-diocese-of-san-diego/",
    },
  },
  {
    id: 10,
    name: "Five Keys",
    category: "Development",
    logo: "/home/collaborators/five_keys.png",
    data: {
      titles: ["Vocational Training", "High School Diploma & GED", "Career Readiness"],
      program: "Online and locations across California",
      description: [
        "Certified programs in high-demand fields including culinary arts, construction, and healthcare.",
        "Accredited charter school programs available inside correctional facilities.",
        "Job skills training, resume building, and interview preparation.",
      ],
      link: "https://www.fivekeyscharter.org/",
    },
  },
  {
    id: 11,
    name: "SD Workforce Partnership",
    category: "Development",
    logo: "/home/collaborators/san_diego_workforce_partnership.png",
    data: {
      titles: ["Job Placement Services", "Skills Training", "Career Counseling"],
      program: "Multiple career center locations across San Diego",
      description: [
        "Direct connections to employers committed to hiring justice-impacted individuals.",
        "Industry-specific training programs in technology, healthcare, and skilled trades.",
        "One-on-one guidance to identify career paths and develop professional skills.",
      ],
      link: "https://workforce.org/",
    },
  },
  {
    id: 12,
    name: "Father Joe's Villages",
    category: "Development",
    logo: "/home/collaborators/fjv.png",
    data: {
      titles: ["Employment Classes", "Job Placement & Development", "Job Searching Tools"],
      program: "1501 Imperial Ave. San Diego, CA 92101",
      description: [
        "Resume writing, interview skills, financial literacy, and computer basics classes help clients prepare for the demands of today's job market and money management.",
        "Our Job Development team works closely with local businesses to identify and match clients with employment opportunities.",
        "Our Employment Center provides access to computers, telephones, fax machine, professional clothing, and expert staff.",
      ],
      link: "https://my.neighbor.org/",
    },
  },
  {
    id: 13,
    name: "Second Chance",
    category: "Development",
    logo: "/home/collaborators/second_chance.png",
    data: {
      titles: ["Job Readiness Training"],
      program: "6145 Imperial Ave, San Diego, CA 92114",
      description: [
        "Job Readiness Training helps justice involved San Diegans find work and build pathways to self-sufficiency and financial independence.\n\nParticipants engage in 160 hours of comprehensive instruction in which they break down personal barriers to employment, develop new skills, create résumés and master interviewing techniques.\n\nClassroom exercises are group based, supplemented by one-on-one sessions with staff who help connect each person with additional resources outside of Second Chance, identify potential employment opportunities and provide encouragement.",
      ],
      link: "https://www.secondchanceprogram.org/",
    },
  },
  {
    id: 14,
    name: "Defy Ventures",
    category: "Development",
    logo: "/home/collaborators/defy_ventures.png",
    data: {
      titles: ["Entrepreneurship Training", "CEO of Your New Life", "Employer Partnerships"],
      program: "In-prison, community-based, and virtual programs",
      description: [
        "Business planning, pitch competitions, and mentorship from successful entrepreneurs.",
        "Comprehensive personal and professional development program for formerly incarcerated individuals.",
        "Connections to employers and investors who believe in second chances.",
      ],
      link: "https://www.defyventures.org/",
    },
  },
  {
    id: 15,
    name: "Anti-Recidivism Coalition",
    category: "Development",
    logo: "/home/collaborators/arc.png",
    data: {
      titles: ["Workforce Development", "Entrepreneurship Resources", "Community Support"],
      program: "Serving formerly incarcerated individuals throughout California",
      description: [
        "Job training, placement assistance, and career advancement support.",
        "Support for aspiring business owners including planning, microloans, and mentorship.",
        "Life coaching, mentorship, and community building for formerly incarcerated individuals.",
      ],
      link: "https://antirecidivism.org/",
    },
  },
  {
    id: 16,
    name: "Alpha Project",
    category: "Other Resources",
    logo: "/home/collaborators/alpha.png",
    data: {
      titles: ["Wheels of Change", "Living with Dignity", "Family Shelter Program"],
      program: "3737 Fifth Ave, Suite 203, San Diego, CA 92103",
      description: [
        "A transitional work program where shelter residents perform community cleaning and enhancement projects for wages.",
        "Assists seniors and people with disabilities in finding housing and securing basic necessities.",
        "Provides interim housing for families with children.",
      ],
      link: "https://alphaproject.org/",
    },
  },
  {
    id: 17,
    name: "Father Joe's Villages",
    category: "Other Resources",
    logo: "/home/collaborators/fjv.png",
    data: {
      titles: ["Village Health Center", "Food Services", "Family Services"],
      program: "1501 Imperial Ave. San Diego, CA 92101",
      description: [
        "Provides medical, dental, and behavioral health care and Substance Use Disorder treatment.",
        "Offers meals and lunch programs as well as a drive-through food pantry.",
        "Includes therapeutic childcare, allowing parents to pursue housing and employment.",
      ],
      link: "https://my.neighbor.org/",
    },
  },
  {
    id: 18,
    name: "Catholic Charities",
    category: "Other Resources",
    logo: "/home/collaborators/catholic_charities.png",
    data: {
      titles: [
        "Food and Nutritional Security",
        "Immigration & Refugee Services",
        "Family & Senior Support",
        "Emergency Assistance",
      ],
      program: "Locations Across San Diego and Imperial Counties",
      description: [
        "Food banks, pantries, school lunch programs, and community dining services for those at risk of hunger.",
        "Legal assistance for immigration/citizenship, refugee resettlement, and family reunification",
        "Counseling services, foster grandparent mentoring, and support for individuals with disabilities",
        "Immediate relief for clothing, household items, and hygiene kits.",
      ],
      link: "https://catholiccharitiesca.org/agency/catholic-charities-diocese-of-san-diego/",
    },
  },
  {
    id: 19,
    name: "Anti-Recidivism Coalition",
    category: "Other Resources",
    logo: "/home/collaborators/arc.png",
    data: {
      titles: ["Policy Advocacy", "Supportive Services", "Mentorship and Workshops"],
      program: "Serving formerly incarcerated individuals throughout California",
      description: [
        "Advocacy for criminal justice reform and reentry policy improvements.",
        "Comprehensive care including case management, mental health treatment, trauma-informed therapy, and grief counseling.",
        "Formerly incarcerated staff go inside prisons to provide workshops on parole preparation, reentry planning, and mentorship.",
      ],
      link: "https://antirecidivism.org/",
    },
  },
  {
    id: 20,
    name: "Second Chance",
    category: "Other Resources",
    logo: "/home/collaborators/second_chance.png",
    data: {
      titles: ["Reentry Support", "Collaborative Court Programs", "Youth Garden"],
      program: "6145 Imperial Ave, San Diego, CA 92114",
      description: [
        "Services include assistance with housing, counseling, and building life skills, aimed at individuals with criminal records and high-risk youth.",
        "Designed to assist incarcerated individuals with a successful transition to their community.",
        "The Youth Garden provides eight-weeks of hands-on urban farming, nutrition classes and workforce training. Youth earn a weekly stipend and gain job readiness skills.",
      ],
      link: "https://www.secondchanceprogram.org/",
    },
  },
];

function getCollab(id: number) {
  return collaboratorsData.find((c) => c.id === id);
}

export default function Collaborator() {
  const [activeTab, setActiveTab] = useState<string>("Education");
  // Tracks whether the mobile accordion is currently expanded for the active tab.
  // Desktop always treats the active tab as expanded.
  const [isMobileExpanded, setIsMobileExpanded] = useState(true);
  const [selectedCollab, setSelectedCollab] = useState<{ id: number; category: string } | null>(
    null,
  );

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
    if (tabName === "Other Resources") {
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
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    }
  };

  const renderGrid = (category: string) => (
    <div className={styles.grid}>
      {collaboratorsData
        .filter((collab) => collab.category === category)
        .map((collab) => (
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
  );

  const tabs = {
    Education: "Select a partner to learn more.",
    Housing: "Select a partner to learn more.",
    Development: "Jobs, Training, Entrepreneurship",
    "Other Resources": "Additional Support and Services",
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Types of Aid and Partner Programs</h2>
        <p className={styles.subtitle}>
          We connect you with education, housing, development, entrepreneurship, and re-entry
          resources for your specific needs. Discover our full list of San Diego-based partners and
          explore the types of resources we offer.
        </p>
        <p className={styles.subtitlePrompt}>Select each partner to learn more.</p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Separated Tabs (act as an accordion on mobile) */}
        <div className={styles.tabsContainer}>
          {Object.entries(tabs).map(([tab, description]) => (
            <Fragment key={tab}>
              <button
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                aria-expanded={activeTab === tab && isMobileExpanded}
                onClick={() => {
                  const isMobile =
                    typeof window !== "undefined" &&
                    window.matchMedia("(max-width: 900px)").matches;
                  if (isMobile && activeTab === tab) {
                    setIsMobileExpanded((prev) => !prev);
                  } else {
                    setActiveTab(tab);
                    setIsMobileExpanded(true);
                  }
                }}
              >
                {getIcon(tab, activeTab === tab)}
                <div className={styles.tabTextContainer}>
                  <span className={styles.tabName}>{tab}</span>
                  <span className={styles.tabDescription}>{description}</span>
                </div>
                <svg
                  className={styles.chevron}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#175892"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Inline panel shown when expanded on mobile */}
              <div className={styles.mobilePanel}>
                {activeTab === tab && isMobileExpanded ? renderGrid(tab) : null}
              </div>
            </Fragment>
          ))}
        </div>

        {/* Large White Panel with Logos (desktop) */}
        <div className={styles.logoPanel}>{renderGrid(activeTab)}</div>
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
