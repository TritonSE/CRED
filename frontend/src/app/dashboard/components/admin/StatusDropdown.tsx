"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./StatusDropdown.module.css";
import { StatusLabel } from "./StatusLabel";

import type { StatusLabelProps } from "./StatusLabel";

type Status = StatusLabelProps["status"];

const STATUS_OPTIONS: readonly Status[] = ["Need to Review", "Under Review", "Reviewed"];

export type StatusDropdownProps = {
  status: Status;
  onChange: (next: Status) => void;
};

export function StatusDropdown({ status, onChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + 6, left: rect.left });
  }, []);

  // Close on outside click and Escape; reposition / close on scroll & resize
  // so the fixed-position menu stays anchored to the pill.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    // The menu is anchored once on open; closing on scroll avoids it drifting
    // away from the pill as the user scrolls the page/table.
    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  const toggleOpen = (e: React.MouseEvent) => {
    // Stop the row's expand/collapse click handler from firing.
    e.stopPropagation();
    if (!isOpen) updatePosition();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Change status"
        onClick={toggleOpen}
      >
        <StatusLabel status={status} />
      </button>

      {isOpen &&
        menuPosition &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.menu}
            role="listbox"
            style={{ top: menuPosition.top, left: menuPosition.left }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className={styles.menuHeading}>Status</span>
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === status}
                className={styles.menuItem}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  if (option !== status) onChange(option);
                }}
              >
                <StatusLabel status={option} />
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
