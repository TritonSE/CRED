"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Navbar.module.css";

type NavbarItemProps = {
  href: string;
  label: string;
  isActive: boolean;
};

function NavbarItem({ href, label, isActive }: NavbarItemProps) {
  return (
    <Link href={href} className={styles.navItem}>
      <p className={styles.navLabel}>{label}</p>
      <div className={`${styles.underline} ${isActive ? styles.active : ""}`} />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logoImageWrapper}>
          <Image
            src="/logos/cred-logo.svg"
            alt="CRED Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Navigation Items */}
      <div className={styles.navItems}>
        <NavbarItem href="/about" label="About Us" isActive={pathname === "/about"} />
        <NavbarItem href="/contact" label="Contact" isActive={pathname === "/contact"} />
        <NavbarItem href="/donate" label="Donate" isActive={pathname === "/donate"} />

        {/* Apply Button */}
        <Link href="/apply" className={styles.applyLink}>
          <div className={styles.applyButton}>
            <p className={styles.applyButtonText}>Apply</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
