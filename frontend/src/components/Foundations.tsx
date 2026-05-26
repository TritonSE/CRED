import { FoundationCard } from "./FoundationCard";
import styles from "./Foundations.module.css";

const foundationsData = [
  {
    title: "Community",
    description:
      "We are a community that empowers individuals to uplift each other and build for the better.",
    icon: "/home/community_icon.svg",
  },
  {
    title: "Reintegration",
    description:
      "Creating structured pathways for successful re-entry into society with stability and purpose.",
    icon: "/home/reintegration_icon.svg",
  },
  {
    title: "Economic Development",
    description:
      "Providing access to workforce opportunities, financial growth, and entrepreneurship.",
    icon: "/home/economic_icon.svg",
  },
  {
    title: "Development",
    description:
      "Supporting underserved individuals into self-sufficient, empowered contributors to society.",
    icon: "/home/development_icon.svg",
  },
];

export default function Foundations() {
  return (
    <section className={styles.foundations}>
      <h2 className={styles.title}>The Foundation of Our Work</h2>

      <div className={styles.cardGrid}>
        {foundationsData.map((item, index) => (
          <div key={index} className={styles.cardWrapper}>
            <FoundationCard iconURL={item.icon} title={item.title} textBody={item.description} />
          </div>
        ))}
      </div>
    </section>
  );
}
