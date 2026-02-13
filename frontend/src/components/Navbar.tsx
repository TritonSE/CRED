"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarItemProps = {
  href: string;
  label: string;
  isActive: boolean;
};

function NavbarItem({ href, label, isActive }: NavbarItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center relative group">
      <p className="font-['Lato',sans-serif] leading-[1.5] text-[20px] text-black text-center">
        {label}
      </p>
      <div className={`h-[3px] w-full ${isActive ? "bg-[#004881]" : "group-hover:bg-[#ffb341]"}`} />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#faf8f6] flex items-center justify-between px-[56px] py-[8px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.15)] w-full">
      {/* Logo */}
      <Link href="/" className="h-[70px] relative w-[170px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/cred-logo.png" alt="CRED Logo" fill className="object-contain" priority />
        </div>
      </Link>

      {/* Navigation Items */}
      <div className="flex gap-[54px] items-center">
        <NavbarItem href="/about" label="About Us" isActive={pathname === "/about"} />
        <NavbarItem href="/contact" label="Contact" isActive={pathname === "/contact"} />
        <NavbarItem href="/donate" label="Donate" isActive={pathname === "/donate"} />

        {/* Apply Button */}
        <Link href="/apply">
          <div className="bg-[#ffb341] flex items-center justify-center h-[42px] px-[18px] py-[9px] rounded-[5px] hover:opacity-90 transition-opacity">
            <p className="font-['Lato',sans-serif] leading-[1.5] text-[17px] text-black">Apply</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
