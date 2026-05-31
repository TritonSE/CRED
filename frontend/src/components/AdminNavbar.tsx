"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logout } from "../lib/auth";

import styles from "./Navbar.module.css";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logoImageWrapper}>
          <Image src="/cred-logo.png" alt="CRED Logo" fill className="object-contain" priority />
        </div>
      </Link>

      {/* Navigation Items */}
      <div className={styles.navItems}>
        <button
          onClick={() => void handleLogout()}
          className={styles.applyLink}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <div className={styles.applyButton}>
            <p className={styles.applyButtonText}>Logout</p>
          </div>
        </button>
      </div>
    </nav>
  );
}
