"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#175892] w-full flex flex-col lg:min-h-[497px] font-medium">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-14 flex-1">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
          {/* Left Section - Logo & Mission */}
          <div className="flex flex-col gap-4 items-start md:col-span-5 md:col-start-1 md:justify-self-start xl:-ml-10 2xl:-ml-14">
            <div className="relative h-[115px] w-[250px] max-w-full">
              <Image
                src="/cred-logo.png"
                alt="CRED Logo"
                fill
                className="object-contain object-left"
                sizes="250px"
                priority
              />
            </div>
            <p className="-mt-2 font-['Lato',sans-serif] font-medium leading-[1.5] text-[16px] text-white max-w-full lg:max-w-[40ch]">
              Our mission is to disrupt the cycles of recidivism, mass incarceration, homelessness,
              and poverty by helping people find their way to self-sufficiency.
            </p>
            <button
              onClick={scrollToTop}
              className="-mt-1 w-fit font-['Lato',sans-serif] font-medium leading-[1.5] text-[#ffb341] text-[16px] underline hover:opacity-80 transition-opacity"
            >
              Back to Top
            </button>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="flex flex-col gap-6 items-start md:col-span-3 md:col-start-7 md:justify-self-end xl:-translate-x-[25px]">
            <p className="font-['Lato',sans-serif] font-bold leading-[1.5] text-[#ffb341] text-[24px]">
              Quick Links
            </p>
            <div className="flex flex-col gap-4 w-full">
              <Link
                href="/about"
                className="font-['Lato',sans-serif] font-medium leading-[1.5] text-[20px] text-white hover:text-[#ffb341] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/donate"
                className="font-['Lato',sans-serif] font-medium leading-[1.5] text-[20px] text-white hover:text-[#ffb341] transition-colors"
              >
                Donate
              </Link>
              <Link href="/apply" className="w-fit">
                <div className="bg-[#ffb341] flex items-center justify-center h-[48px] px-[24px] py-[12px] rounded-[5px] hover:opacity-90 transition-opacity">
                  <p className="font-['Lato',sans-serif] font-medium leading-[1.5] text-[20px] text-black">
                    Apply to CRED
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="flex flex-col gap-6 items-start md:col-span-3 md:col-start-10 md:justify-self-end xl:translate-x-[90px]">
            <p className="font-['Lato',sans-serif] font-bold leading-[1.5] text-[#ffb341] text-[24px]">
              Contact Us
            </p>
            <div className="flex flex-col gap-6 w-full">
              {/* Email */}
              <div className="flex gap-4 items-center">
                <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4 6L12 11L20 6H4ZM4 8V18H20V8L12 13L4 8Z"
                    fill="#FFB341"
                  />
                </svg>
                <a
                  href="mailto:credsd@credsd.org"
                  className="flex-1 font-['Lato',sans-serif] font-medium leading-[1.5] text-[20px] text-white break-words"
                >
                  credsd@credsd.org
                </a>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-center">
                <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                    fill="#FFB341"
                  />
                </svg>
                <a
                  href="tel:1-888-453-4943"
                  className="flex-1 font-['Lato',sans-serif] font-medium leading-[1.5] text-[20px] text-white"
                >
                  1-888-453-4943
                </a>
              </div>

              {/* Address */}
              <div className="flex gap-4 items-start">
                <svg className="size-[24px] shrink-0" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="#FFB341"
                  />
                </svg>
                <div className="flex-1 font-['Lato',sans-serif] font-medium leading-[1.5] text-[20px] text-white">
                  <p className="mb-0">PO Box 5097</p>
                  <p>San Diego CA 92165</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TSE Footer */}
      <div className="bg-[#004881] border-t border-white w-full">
        <div className="mx-auto max-w-[1200px] px-6 py-3">
          <div className="flex gap-2 items-center justify-center flex-wrap text-center">
            <div className="relative h-[32px] w-[32px] shrink-0">
              <Image
                src="/tse-logo.png"
                alt="Triton Software Engineering Logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <p className="font-['Lato',sans-serif] font-medium text-[16px] text-white leading-[1.5]">
              Built for free by{" "}
              <a
                href="https://tritonse.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffb341] transition-colors"
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
