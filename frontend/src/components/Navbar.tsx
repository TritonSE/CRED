"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

// Full navigation shown in the mobile dropdown (matches the "V2 Mobile Navbar" design).
const MOBILE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
  { href: "/apply", label: "Apply" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close the mobile menu once the viewport grows past the mobile breakpoint,
  // so it never reappears already-open when returning to a narrow width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  // While the menu is open, close it on Escape or a click/tap outside the navbar.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const handlePointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [menuOpen]);

  return (
    <nav ref={navRef} className={styles.navbar}>
      {/* Logo */}
      <Link
        href="/"
        className={styles.logoLink}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
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

      {/* Desktop Navigation Items */}
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

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        className={styles.menuToggle}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => {
          setMenuOpen((open) => !open);
        }}
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="#004377" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#004377"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {MOBILE_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.mobileNavItem}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <p className={styles.navLabel}>{label}</p>
              <div className={`${styles.underline} ${pathname === href ? styles.active : ""}`} />
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
