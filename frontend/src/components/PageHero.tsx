import Image from "next/image";

import styles from "./PageHero.module.css";

export type PageHeroProps = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
};

export default function PageHero({ imageSrc, imageAlt = "", title, subtitle }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper} aria-hidden="true">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
