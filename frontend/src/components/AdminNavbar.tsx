"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./Navbar.module.css";

export default function AdminNavbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logoImageWrapper}>
          <Image src="/cred-logo.svg" alt="CRED Logo" fill className="object-contain" priority />
        </div>
      </Link>

      {/* Navigation Items */}
      <div className={styles.navItems}>
        {/* Apply Button */}
        <Link href="/" className={styles.applyLink}>
          <div className={styles.applyButton}>
            <p className={styles.applyButtonText}>Logout</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
