"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./FoundationCard.module.css";

export type FoundationCardProps = {
  iconURL: string;
  title: string;
  textBody: string;
};

export const FoundationCard: React.FC<FoundationCardProps> = ({ iconURL, title, textBody }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleResize = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile("matches" in event ? event.matches : mediaQuery.matches);
    };
    handleResize(mediaQuery);

    mediaQuery.onchange = handleResize as
      | ((this: MediaQueryList, ev: MediaQueryListEvent) => void)
      | null;
    return () => {
      mediaQuery.onchange = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const measuredHeight = contentRef.current.scrollHeight + 20; // include vertical padding
    if (measuredHeight !== contentHeight) {
      setContentHeight(measuredHeight);
    }
  }, [textBody, isOpen, contentHeight]);

  // Match "Step X: " prefix to handle mobile hiding per Figma
  const stepMatch = /^(Step \d+:\s*)(.*)$/.exec(title);
  const stepText = stepMatch ? stepMatch[1] : "";
  const mainTitle = stepMatch ? stepMatch[2] : title;

  return (
    <div
      className={`${styles.cardContainer} ${isOpen ? styles.expanded : ""}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardContent}>
          <div className={styles.cardNumberCircle}>
            <div className={styles.iconWrapper}>
              <Image src={iconURL} alt={`${title} icon`} width={40} height={40} />
            </div>
          </div>
          <h2 className={styles.cardTitle}>
            {stepText && <span className={styles.desktopOnlyStep}>{stepText}</span>}
            {mainTitle}
          </h2>
        </div>
        <div className={styles.accordionIcon}>
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L8 8L14 2"
              stroke="#004377"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        className={styles.cardTextWrapper}
        style={isMobile ? { height: isOpen ? contentHeight : 0 } : undefined}
      >
        <div className={styles.cardTextInner} ref={contentRef}>
          <p className={styles.cardText}>{textBody}</p>
        </div>
      </div>
    </div>
  );
};
