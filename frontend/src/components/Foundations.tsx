import Image from "next/image";

import styles from "./Foundations.module.css";

const foundationsData = [
  {
    title: "Community",
    description:
      "We are a community that empowers individuals to uplift each other and build for the better.",
    icon: "/home/communityIcon.png",
  },
  {
    title: "Reintegration",
    description:
      "Creating structured pathways for successful re-entry into society with stability and purpose.",
    icon: "/home/reintegrationIcon.png",
  },
  {
    title: "Economic Development",
    description:
      "Providing access to workforce opportunities, financial growth, and entrepreneurship.",
    icon: "/home/economicIcon.png",
  },
  {
    title: "Development",
    description:
      "Developing individuals from underserved communities into self-sufficient, empowered contributors to society.",
    icon: "/home/developmentIcon.png",
  },
];

export default function Foundations() {
  return (
    <section className={styles.foundations}>
      <h2 className={styles.title}>The Foundation of Our Work</h2>

      <div className={styles.cardGrid}>
        {foundationsData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardIcon}>
              <Image
                src={item.icon}
                alt={typeof item.title === "string" ? item.title : "icon"}
                width={40}
                height={40}
              />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
