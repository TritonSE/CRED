"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.grid}>
          <div className={styles.leftSection}>
            <div className={styles.logoWrapper}>
              <Image
                src="/logos/cred-logo.svg"
                alt="CRED Logo"
                fill
                className="object-contain object-left"
                sizes="250px"
                priority
              />
            </div>
            <p className={styles.missionText}>
              Our mission is to disrupt the cycles of recidivism, mass incarceration, homelessness,
              and poverty by helping people find their way to self-sufficiency.
            </p>
            <button onClick={scrollToTop} className={styles.backToTop}>
              Back to Top
            </button>
          </div>

          <div className={styles.middleSection}>
            <p className={styles.sectionTitle}>Quick Links</p>
            <div className={styles.linkList}>
              <Link href="/about" className={styles.navLink}>
                About Us
              </Link>
              <Link href="/donate" className={styles.navLink}>
                Donate
              </Link>
              <Link href="/apply" className={styles.applyLink}>
                <div className={styles.applyButton}>
                  <p className={styles.applyButtonText}>Apply to CRED</p>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.rightSection}>
            <p className={styles.sectionTitle}>Contact Us</p>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4 6L12 11L20 6H4ZM4 8V18H20V8L12 13L4 8Z"
                    fill="#175892"
                  />
                </svg>
                <a href="mailto:credsd@credsd.org" className={styles.contactText}>
                  credsd@credsd.org
                </a>
              </div>

              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                    fill="#175892"
                  />
                </svg>
                <a href="tel:18884534943" className={styles.contactText}>
                  1-888-453-4943
                </a>
              </div>

              <div className={styles.contactItemTop}>
                <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="#175892"
                  />
                </svg>
                <div className={styles.addressWrapper}>
                  <p>PO Box 5097</p>
                  <p>San Diego CA 92165</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tseFooter}>
        <div className={styles.tseInner}>
          <div className={styles.tseContent}>
            <div className={styles.tseLogoWrapper}>
              <Image
                src="/logos/tse-logo.png"
                alt="Triton Software Engineering Logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <p className={styles.tseText}>
              Built for free by{" "}
              <a
                href="https://tritonse.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tseLink}
              >
                Triton Software Engineering
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
