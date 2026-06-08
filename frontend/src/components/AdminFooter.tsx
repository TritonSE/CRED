"use client";

import Image from "next/image";

import styles from "./AdminFooter.module.css";

export default function AdminFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.tseFooter}>
        <div className={styles.tseInner}>
          <div className={styles.tseContent}>
            <div className={styles.tseLogoWrapper}>
              <Image
                src="/tse-logo.png"
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
