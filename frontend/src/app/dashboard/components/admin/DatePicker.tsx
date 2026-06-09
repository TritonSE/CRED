"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./DatePicker.module.css";

export type DatePickerProps = {
  /** ISO date string `yyyy-mm-dd`; empty string means unset. */
  value: string;
  onChange: (value: string) => void;
  id?: string;
  /** Oldest year selectable in the year dropdown. Defaults to 1900. */
  minYear?: number;
  /** Newest year selectable. Defaults to the current year. */
  maxYear?: number;
};

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type ParsedDate = { year: number; month: number; day: number };

function parseIso(value: string): ParsedDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null;
  return { year, month, day };
}

function toIsoDate(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year.toString()}-${mm}-${dd}`;
}

function formatDisplay(value: string): string {
  const parsed = parseIso(value);
  if (!parsed) return "";
  const mm = String(parsed.month + 1).padStart(2, "0");
  const dd = String(parsed.day).padStart(2, "0");
  return `${mm}/${dd}/${parsed.year.toString()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Day of week 0..6 with Monday = 0 (Figma's calendar starts on Monday). */
function getFirstWeekdayMondayBased(year: number, month: number): number {
  const sundayBased = new Date(year, month, 1).getDay();
  return (sundayBased + 6) % 7;
}

export function DatePicker({
  value,
  onChange,
  id,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);
  const parsedValue = parseIso(value);

  const [view, setView] = useState(() => {
    if (parsedValue) return { year: parsedValue.year, month: parsedValue.month };
    return { year: today.getFullYear(), month: today.getMonth() };
  });

  // Re-sync view when the selected value changes externally.
  useEffect(() => {
    const next = parseIso(value);
    if (next) setView({ year: next.year, month: next.month });
  }, [value]);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 6, left: rect.left });
  }, []);

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
    // The popover is anchored once on open; close on scroll/resize so it
    // doesn't drift away from the trigger.
    const handleClose = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleClose, true);
    window.addEventListener("resize", handleClose);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", handleClose);
    };
  }, [isOpen]);

  const toggleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isOpen) updatePosition();
    setIsOpen((prev) => !prev);
  };

  const goPrevMonth = (event: React.MouseEvent) => {
    event.stopPropagation();
    setView((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 },
    );
  };

  const goNextMonth = (event: React.MouseEvent) => {
    event.stopPropagation();
    setView((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 },
    );
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    onChange(toIsoDate(year, month, day));
    setIsOpen(false);
  };

  // Build the 6×7 grid: leading days from previous month, current month,
  // trailing days from next month so the layout never shifts.
  type Cell = { day: number; year: number; month: number; outside: boolean };
  const daysInMonth = getDaysInMonth(view.year, view.month);
  const firstWeekday = getFirstWeekdayMondayBased(view.year, view.month);
  const prevMonth = view.month === 0 ? 11 : view.month - 1;
  const prevYear = view.month === 0 ? view.year - 1 : view.year;
  const nextMonth = view.month === 11 ? 0 : view.month + 1;
  const nextYear = view.month === 11 ? view.year + 1 : view.year;
  const daysInPrev = getDaysInMonth(prevYear, prevMonth);

  const cells: Cell[] = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, year: prevYear, month: prevMonth, outside: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, year: view.year, month: view.month, outside: false });
  }
  let trailingDay = 1;
  while (cells.length < 42) {
    cells.push({ day: trailingDay, year: nextYear, month: nextMonth, outside: true });
    trailingDay++;
  }

  const weeks: Cell[][] = [];
  for (let w = 0; w < 6; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));

  const todayKey = `${today.getFullYear().toString()}-${today.getMonth().toString()}-${today.getDate().toString()}`;
  const selectedKey = parsedValue
    ? `${parsedValue.year.toString()}-${parsedValue.month.toString()}-${parsedValue.day.toString()}`
    : null;

  const yearOptions: number[] = [];
  for (let y = maxYear; y >= minYear; y--) yearOptions.push(y);

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={styles.trigger}
        onClick={toggleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value ? formatDisplay(value) : "MM/DD/YYYY"}
        </span>
        <svg
          className={styles.calendarIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {isOpen &&
        menuPos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.popover}
            style={{ top: menuPos.top, left: menuPos.left }}
            role="dialog"
            aria-label="Choose date"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className={styles.header}>
              <button
                type="button"
                className={styles.navButton}
                onClick={goPrevMonth}
                aria-label="Previous month"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={styles.monthYearPills}>
                <label className={styles.pill}>
                  <select
                    className={styles.pillSelect}
                    value={view.month}
                    onChange={(event) => {
                      setView((prev) => ({ ...prev, month: Number(event.target.value) }));
                    }}
                    aria-label="Month"
                  >
                    {MONTHS_SHORT.map((m, i) => (
                      <option key={m} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <svg
                    className={styles.pillCaret}
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </label>
                <label className={styles.pill}>
                  <select
                    className={styles.pillSelect}
                    value={view.year}
                    onChange={(event) => {
                      setView((prev) => ({ ...prev, year: Number(event.target.value) }));
                    }}
                    aria-label="Year"
                  >
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <svg
                    className={styles.pillCaret}
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </label>
              </div>
              <button
                type="button"
                className={styles.navButton}
                onClick={goNextMonth}
                aria-label="Next month"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.daysOfWeek}>
              {DAYS_OF_WEEK.map((dow) => (
                <span key={dow} className={styles.dayOfWeek}>
                  {dow}
                </span>
              ))}
            </div>

            <div className={styles.weeks}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className={styles.week}>
                  {week.map((cell) => {
                    const cellKey = `${cell.year.toString()}-${cell.month.toString()}-${cell.day.toString()}`;
                    const isToday = cellKey === todayKey;
                    const isSelected = cellKey === selectedKey;
                    const cellClass = [
                      styles.dayCell,
                      cell.outside ? styles.outside : styles.inside,
                      isToday ? styles.today : "",
                      isSelected ? styles.selected : "",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <button
                        key={cellKey}
                        type="button"
                        className={cellClass}
                        onClick={() => {
                          handleDayClick(cell.year, cell.month, cell.day);
                        }}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
