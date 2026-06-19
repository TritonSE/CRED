"use client";

import { useEffect } from "react";

/**
 * Scrolls to the element matching the current URL hash on mount and on hash changes.
 *
 * Next.js App Router soft navigations (e.g. router.push("/#partner-programs") from the
 * About page) don't reliably auto-scroll to hash anchors, so we handle it explicitly.
 * This also makes sections deep-linkable via a shared URL like /#partner-programs.
 *
 * Anchored sections should set `scroll-margin-top` to clear the fixed navbar.
 */
export default function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    // Defer to the next frame so the target section is laid out before we scroll.
    const raf = requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
