import Image from "next/image";

import styles from "./HeroSection.module.css";

type HeroSectionVariant = "tall" | "banner";

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  subtitleEmphasis?: "normal" | "bold";
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageClassName?: string;
  unoptimized?: boolean;
  className?: string;
  variant?: HeroSectionVariant;
  overlayGradient?: string;
  imageOpacity?: number;
  priority?: boolean;
};

const DEFAULT_OVERLAY_BY_VARIANT: Record<HeroSectionVariant, string> = {
  tall: "linear-gradient(180deg, #175892 -7.8%, rgba(23, 88, 146, 0) 105.01%)",
  banner: "linear-gradient(to right, rgba(0, 67, 119, 0.85), rgba(30, 115, 190, 0.78))",
};

export default function HeroSection({
  title,
  subtitle,
  subtitleEmphasis = "normal",
  imageSrc,
  imageAlt,
  imageSizes = "100vw",
  imageClassName,
  unoptimized = false,
  className,
  variant = "banner",
  overlayGradient,
  imageOpacity = 1,
  priority = false,
}: HeroSectionProps) {
  const overlay = overlayGradient ?? DEFAULT_OVERLAY_BY_VARIANT[variant];

  return (
    <section className={[styles.root, styles[variant], className].filter(Boolean).join(" ")}>
      <div
        className={styles.bg}
        aria-hidden={imageAlt.length === 0}
        style={{ opacity: imageOpacity }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={imageSizes}
          className={["object-cover", imageClassName].filter(Boolean).join(" ")}
          priority={priority}
          unoptimized={unoptimized}
        />
      </div>

      <div className={styles.overlay} style={{ background: overlay }} />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? (
          <p
            className={[styles.subtitle, subtitleEmphasis === "bold" ? styles.subtitleBold : null]
              .filter(Boolean)
              .join(" ")}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
