"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ApplicantPDF } from "./ApplicantPDF";
import styles from "./ApplicationTable.module.css";
import { ExpandedRowContent } from "./ExpandedRowContent";
import { StatusDropdown } from "./StatusDropdown";

import type { ApplicantEditPatch } from "./ExpandedRowContent";
import type { Applicant } from "@/api/applicant";

import { deleteApplicant, updateApplicant } from "@/api/applicant";

export type ApplicationRowData = {
  clientNumber: string;
  clientName: string;
  dateSubmitted: string;
  status: "Reviewed" | "Need to Review" | "Under Review";
  // Extended data for expanded view
  dateOfBirth?: string;
  race?: string;
  gender?: string;
  housingStatus?: string;
  education?: string;
  employment?: string;
  address?: string;
  idDocument?: string;
  cdcrNumber?: string;
  email?: string;
  phoneNumber?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
};

export type TodoItem = NonNullable<ApplicationRowData["todos"]>[number];

const STATUS_VALUES: readonly ApplicationRowData["status"][] = [
  "Reviewed",
  "Need to Review",
  "Under Review",
];

/**
 * Narrow a raw status string to a known value. Falls back to "Need to Review"
 * (the backend default) if the API returns something unexpected, so the UI
 * can't crash on bad data.
 */
function parseStatus(raw: string): ApplicationRowData["status"] {
  return (STATUS_VALUES as readonly string[]).includes(raw)
    ? (raw as ApplicationRowData["status"])
    : "Need to Review";
}

/**
 * Derive the pill status the dashboard should display.
 *
 * Some legacy applicants in the database have `isCompleted: true` but never
 * had their `status` field upgraded past the default `"Need to Review"`. The
 * pill is the user-facing summary of where the row sits in the review
 * lifecycle, so we treat `isCompleted` as the source of truth for the
 * "Reviewed" terminal state and only fall back to the stored `status` field
 * when the row isn't completed yet. This guarantees rows shown in the
 * Completed Applications table render the green "Reviewed" pill.
 */
function deriveDisplayStatus(
  rawStatus: string,
  applicantIsCompleted: boolean,
): ApplicationRowData["status"] {
  if (applicantIsCompleted) return "Reviewed";
  const parsed = parseStatus(rawStatus);
  // Edge case: if the row is no longer completed but the stored status is
  // still "Reviewed" (e.g. a fresh Mark-Incomplete that hasn't round-tripped
  // through a status fix), fall back to "Need to Review".
  return parsed === "Reviewed" ? "Need to Review" : parsed;
}

export type ApplicationTableProps = {
  title: string;
  pageSize?: number;
  /** If true, all rows render with their checkbox checked */
  isCompleted?: boolean;
  globalFilter?: string;
  /** Pre-filtered applicant data passed from the parent. */
  applicantData: Applicant[];
  /** True while the parent is fetching data. */
  isLoading?: boolean;
  /** Error message from the parent fetch, if any. */
  error?: string | null;
  /** Called after a successful complete/incomplete toggle so the parent can refresh. */
  onCompleteToggle?: () => void;
  /** Optional callback to show a new status update notification. */
  setSuccessAlert?: (message: string) => void;
};

function SortIndicator({ isSorted }: { isSorted: false | "asc" | "desc" }) {
  return (
    <span className={styles.sortIndicator}>
      <span className={isSorted === "asc" ? styles.sortActive : styles.sortInactive}>▲</span>
      <span className={isSorted === "desc" ? styles.sortActive : styles.sortInactive}>▼</span>
    </span>
  );
}

export function ApplicationTable({
  title,
  pageSize = 6,
  isCompleted,
  globalFilter = "",
  applicantData,
  isLoading: isLoadingProp = false,
  error: errorProp = null,
  onCompleteToggle,
  setSuccessAlert,
}: ApplicationTableProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [expandedHeights, setExpandedHeights] = useState<Record<string, number>>({});

  const [applications, setApplications] = useState<ApplicationRowData[]>([]);
  // Persisted by client number so collapse/expand keeps checkbox state.
  const [todosByClient, setTodosByClient] = useState<Record<string, TodoItem[]>>({});
  const [rawApplicants, setRawApplicants] = useState<Applicant[]>([]);

  const expandedRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const processApplicants = (rows: Applicant[]) => {
    setRawApplicants(rows);

    const tableRows: ApplicationRowData[] = rows.map((a) => ({
      clientNumber: a.applicantNumber,
      clientName: a.applicantName,
      dateSubmitted: a.dateSubmitted.toLocaleDateString("en-CA"),
      status: deriveDisplayStatus(a.status, a.isCompleted),
      dateOfBirth: a.dateOfBirth.toLocaleDateString("en-CA"),
      education: a.educationStatus,
      employment: a.employmentStatus,
      race: a.race,
      gender: a.gender,
      address: a.address,
      additionalComments: a.additionalComments,
      aidRequested: a.aidRequested,
      convictionDetails: a.convictionDetails,
      email: a.email,
      housingStatus: a.housingStatus,
      notes: a.notes,
      otherAidRequested: a.otherAidRequested,
      phoneNumber: a.phoneNumber,
      todos: a.todos,
    }));
    setApplications(tableRows);
  };

  useEffect(() => {
    processApplicants(applicantData);
  }, [applicantData]);

  // Seed persisted to-do state for each client from backend data exactly once per client.
  useEffect(() => {
    setTodosByClient((prev) => {
      const next = { ...prev };
      applications.forEach((app) => {
        next[app.clientNumber] ??= app.todos ?? [];
      });
      return next;
    });
  }, [applications]);

  /**
   * Apply Maya's V2 auto-status rule: any time an admin enriches an applicant
   * by adding/toggling a to-do or adding a note, advance their status to
   * "Under Review" if it was still the default "Need to Review". Statuses
   * already promoted past that ("Under Review", "Reviewed") are left alone.
   *
   * Completed applicants are skipped entirely — once `isCompleted` is true,
   * the row's terminal state is "Reviewed" and admin enrichment must not
   * silently downgrade it back to "Under Review" (which would make the pill
   * flicker between green and grey on legacy rows whose stored status field
   * is still the default "Need to Review").
   */
  const advanceStatusOnEnrichment = (current: string, applicantIsCompleted: boolean): string => {
    if (applicantIsCompleted) return current;
    return current === "Need to Review" ? "Under Review" : current;
  };

  const generateTodoId = (): string =>
    "todo-" + Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8);

  // Matches existing seed data: M/D/YYYY.
  const formatNoteDate = (d: Date): string =>
    `${(d.getMonth() + 1).toString()}/${d.getDate().toString()}/${d.getFullYear().toString()}`;

  /**
   * Toggle a to-do item for a specific client and persist the change to backend.
   * Uses optimistic UI update, then rolls back if the API call fails.
   *
   * Per V2 dashboard design (Maya, "Adding To-do or Notes should turn the Status
   * to 'Under Review'"), interacting with an applicant's to-dos auto-advances
   * their status from "Need to Review" → "Under Review". The transition is
   * one-way and only fires from "Need to Review"; statuses already promoted to
   * "Under Review" or finalized as "Reviewed" stay put.
   */
  const handleToggleTodo = async (clientNumber: string, todoId: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const previousTodos = todosByClient[clientNumber] ?? applicant.todos ?? [];
    const updatedTodos = previousTodos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );

    const previousStatus = applicant.status;
    const nextStatus = advanceStatusOnEnrichment(previousStatus, applicant.isCompleted);
    const statusChanged = nextStatus !== previousStatus;

    // Optimistic update so the checkbox (and status pill, if it changed) respond immediately.
    setTodosByClient((prev) => ({
      ...prev,
      [clientNumber]: updatedTodos,
    }));
    if (statusChanged) {
      setApplications((prev) =>
        prev.map((a) =>
          a.clientNumber === clientNumber ? { ...a, status: parseStatus(nextStatus) } : a,
        ),
      );
    }

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: nextStatus,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: updatedTodos,
      notes: applicant.notes,
      isCompleted: applicant.isCompleted,
    });

    if (!result.success) {
      // Revert optimistic UI updates if persistence fails.
      setTodosByClient((prev) => ({
        ...prev,
        [clientNumber]: previousTodos,
      }));
      if (statusChanged) {
        setApplications((prev) =>
          prev.map((a) =>
            a.clientNumber === clientNumber ? { ...a, status: parseStatus(previousStatus) } : a,
          ),
        );
      }
      alert(
        "Failed to update to-do status. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
      return;
    }

    // Keep local applicant snapshots consistent with the persisted todos + status.
    setRawApplicants((prev) =>
      prev.map((a) =>
        a.applicantNumber === clientNumber
          ? {
              ...a,
              todos: updatedTodos,
              status: nextStatus,
            }
          : a,
      ),
    );
    setApplications((prev) =>
      prev.map((a) =>
        a.clientNumber === clientNumber
          ? {
              ...a,
              todos: updatedTodos,
              status: parseStatus(nextStatus),
            }
          : a,
      ),
    );
  };

  /**
   * Toggle `isCompleted` for the applicant identified by clientNumber.
   * Calls `updateApplicant` to persist the change, then triggers a parent re-fetch.
   *
   * Looked up by clientNumber rather than row index so the expanded card can
   * call this without knowing its position in the (possibly sorted/paginated) table.
   */
  const handleToggleComplete = async (clientNumber: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const newIsCompleted = !applicant.isCompleted;
    const newStatus = newIsCompleted ? "Reviewed" : "Need to Review";

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: newStatus,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: applicant.todos,
      notes: applicant.notes,
      isCompleted: newIsCompleted,
    });

    if (result.success) {
      // Notify parent to re-fetch all applicant data.
      onCompleteToggle?.();
      setSuccessAlert?.("Application status updated successfully!");
    } else {
      alert(
        "Failed to update application status. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
    }
  };

  /**
   * Change an applicant's review status from the status-pill dropdown.
   *
   * Status drives which dashboard table the row lives in:
   * - "Reviewed" is the terminal state → `isCompleted: true` → row moves to
   *   the Completed Applications table.
   * - "Need to Review" / "Under Review" → `isCompleted: false` → row moves
   *   back up to the New Applications table.
   *
   * On success we trigger a parent re-fetch so the row migrates between tables.
   */
  const handleChangeStatus = async (
    clientNumber: string,
    nextStatus: ApplicationRowData["status"],
  ) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const nextIsCompleted = nextStatus === "Reviewed";

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: nextStatus,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: applicant.todos,
      notes: applicant.notes,
      isCompleted: nextIsCompleted,
    });

    if (result.success) {
      onCompleteToggle?.();
      setSuccessAlert?.("Application status updated successfully!");
    } else {
      alert(
        "Failed to update application status. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
    }
  };

  /**
   * Permanently delete an applicant after a confirmation prompt. Persists via
   * `deleteApplicant`, then surfaces a success toast.
   */
  const handleDeleteApplicant = async (clientNumber: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const confirmed = window.confirm(
      `Delete application ${applicant.applicantNumber} (${applicant.applicantName})? This action cannot be undone.`,
    );
    if (!confirmed) return;

    const result = await deleteApplicant(applicant._id);

    if (result.success) {
      onCompleteToggle?.();
      setSuccessAlert?.("Application deleted successfully!");
    } else {
      alert(
        "Failed to delete application. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
    }
  };

  // After the DOM updates, measure the natural height of each expanded panel
  // so we can animate max-height transitions smoothly. Re-measures whenever
  // anything that changes the panel's content height changes — edit mode
  // toggles (form fields are taller than text), the underlying applications
  // (e.g. a new todo / note was added), or the persisted-todos map.
  useLayoutEffect(() => {
    const heights: Record<string, number> = {};
    Object.entries(expandedRefs.current).forEach(([rowId, wrapper]) => {
      if (wrapper) {
        const child = wrapper.firstElementChild as HTMLElement;
        if (child) {
          heights[rowId] = child.scrollHeight;
        }
      }
    });
    setExpandedHeights(heights);
  }, [expandedRows, editingRows, applications, todosByClient]);

  // Track child-content height via ResizeObserver so the panel still grows
  // when state owned by `ExpandedRowContent` itself changes — e.g. the user
  // clicking "Add To-do" or "Add note", which reveals an inline input row
  // that the parent's deps-based useLayoutEffect above doesn't see. Without
  // this the new input row gets clipped by the previously-measured
  // max-height and the user "doesn't see anything pop up".
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observers: ResizeObserver[] = [];
    Object.entries(expandedRefs.current).forEach(([rowId, wrapper]) => {
      if (!wrapper) return;
      const child = wrapper.firstElementChild as HTMLElement | null;
      if (!child) return;
      const observer = new ResizeObserver(() => {
        const next = child.scrollHeight;
        setExpandedHeights((prev) => (prev[rowId] === next ? prev : { ...prev, [rowId]: next }));
      });
      observer.observe(child);
      observers.push(observer);
    });
    return () => {
      observers.forEach((o) => {
        o.disconnect();
      });
    };
  }, [expandedRows, editingRows, applications]);

  /**
   * Append a new to-do item to an applicant. Persists via `updateApplicant`
   * and applies the `advanceStatusOnEnrichment` rule.
   *
   * Re-open rule (V2): if the applicant was previously marked complete,
   * adding a new to-do is treated as the admin re-opening the case. We flip
   * `isCompleted` back to false and force status to "Under Review" so the
   * row moves out of the Completed Applications table and into New
   * Applications. (Adding a *note* on a completed applicant does NOT do this
   * — see handleAddNote — because a note is a record-keeping action, not a
   * re-open signal.)
   */
  const handleAddTodo = async (clientNumber: string, label: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const previousTodos = todosByClient[clientNumber] ?? applicant.todos ?? [];
    const newTodo: TodoItem = { id: generateTodoId(), label, completed: false };
    const updatedTodos = [...previousTodos, newTodo];

    const previousStatus = applicant.status;
    const previousIsCompleted = applicant.isCompleted;

    // Re-open path: completed -> Under Review + isCompleted=false. Otherwise
    // fall back to the standard "advance from Need to Review" rule.
    const nextIsCompleted = previousIsCompleted ? false : previousIsCompleted;
    const nextStatus = previousIsCompleted
      ? "Under Review"
      : advanceStatusOnEnrichment(previousStatus, false);
    const statusChanged = nextStatus !== previousStatus;
    const completionChanged = nextIsCompleted !== previousIsCompleted;

    // Optimistic update — also flip isCompleted on the local snapshots so the
    // row visibly leaves the Completed table immediately on the re-open path.
    setTodosByClient((prev) => ({ ...prev, [clientNumber]: updatedTodos }));
    if (statusChanged || completionChanged) {
      setApplications((prev) =>
        prev.map((a) =>
          a.clientNumber === clientNumber
            ? {
                ...a,
                todos: updatedTodos,
                status: statusChanged ? parseStatus(nextStatus) : a.status,
              }
            : a,
        ),
      );
    }

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: nextStatus,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: updatedTodos,
      notes: applicant.notes,
      isCompleted: nextIsCompleted,
    });

    if (!result.success) {
      // Rollback optimistic state.
      setTodosByClient((prev) => ({ ...prev, [clientNumber]: previousTodos }));
      if (statusChanged) {
        setApplications((prev) =>
          prev.map((a) =>
            a.clientNumber === clientNumber ? { ...a, status: parseStatus(previousStatus) } : a,
          ),
        );
      }
      alert(
        "Failed to add to-do. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
      return;
    }

    setRawApplicants((prev) =>
      prev.map((a) =>
        a.applicantNumber === clientNumber
          ? { ...a, todos: updatedTodos, status: nextStatus, isCompleted: nextIsCompleted }
          : a,
      ),
    );
    setApplications((prev) =>
      prev.map((a) =>
        a.clientNumber === clientNumber
          ? { ...a, todos: updatedTodos, status: parseStatus(nextStatus) }
          : a,
      ),
    );
    if (completionChanged) {
      // Trigger a parent re-fetch so the row migrates from the Completed
      // table into the New Applications table.
      onCompleteToggle?.();
      setSuccessAlert?.("Application moved to New Applications.");
    }
  };

  /**
   * Append a new dated note to an applicant's history log. Same persistence
   * + auto-status-transition flow as `handleAddTodo`.
   */
  const handleAddNote = async (clientNumber: string, content: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const previousNotes = applicant.notes ?? [];
    const updatedNotes = [...previousNotes, { date: formatNoteDate(new Date()), content }];

    const previousStatus = applicant.status;
    const nextStatus = advanceStatusOnEnrichment(previousStatus, applicant.isCompleted);
    const statusChanged = nextStatus !== previousStatus;

    // Optimistic update — push the new note into `applications` so the
    // Notes/History list in the expanded card renders it immediately. Without
    // this, even though `rawApplicants` and the backend both pick up the
    // note, the render layer reads `row.original.notes` from `applications`
    // and the new entry never appears until a full refetch.
    setApplications((prev) =>
      prev.map((a) =>
        a.clientNumber === clientNumber
          ? {
              ...a,
              notes: updatedNotes,
              status: statusChanged ? parseStatus(nextStatus) : a.status,
            }
          : a,
      ),
    );

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: nextStatus,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: applicant.todos,
      notes: updatedNotes,
      isCompleted: applicant.isCompleted,
    });

    if (!result.success) {
      if (statusChanged) {
        setApplications((prev) =>
          prev.map((a) =>
            a.clientNumber === clientNumber ? { ...a, status: parseStatus(previousStatus) } : a,
          ),
        );
      }
      alert(
        "Failed to add note. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
      return;
    }

    setRawApplicants((prev) =>
      prev.map((a) =>
        a.applicantNumber === clientNumber ? { ...a, notes: updatedNotes, status: nextStatus } : a,
      ),
    );
    setApplications((prev) =>
      prev.map((a) =>
        a.clientNumber === clientNumber
          ? { ...a, notes: updatedNotes, status: parseStatus(nextStatus) }
          : a,
      ),
    );
  };

  /**
   * Persist edits made in the expanded card's edit form via `updateApplicant`,
   * then exits edit mode on success and surfaces a success toast.
   */
  const handleSaveEdit = async (clientNumber: string, patch: ApplicantEditPatch, rowId: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    // The edit form returns dateOfBirth as a yyyy-mm-dd string from
    // `<input type="date">`; convert to a Date for the Applicant type. Fall
    // back to the previous value if the user blanked it out.
    //
    // IMPORTANT: `new Date("2026-04-14")` parses the string as UTC midnight,
    // which in any timezone west of UTC lands on the *previous* day in local
    // time. The table renders dateOfBirth via `toLocaleDateString("en-CA")`
    // (local), so the user-picked date would appear shifted back by one day.
    // We construct the Date from numeric (year, month-1, day) so it anchors
    // to local midnight on the picked calendar date.
    const parseLocalIsoDate = (iso: string): Date | null => {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
      if (!match) return null;
      const [, yearStr, monthStr, dayStr] = match;
      return new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
    };
    const parsedDob =
      patch.dateOfBirth.length > 0
        ? (parseLocalIsoDate(patch.dateOfBirth) ?? applicant.dateOfBirth)
        : applicant.dateOfBirth;
    const nextApplicant: Applicant = {
      ...applicant,
      applicantName: patch.applicantName,
      dateOfBirth: parsedDob,
      race: patch.race,
      gender: patch.gender,
      email: patch.email,
      address: patch.address,
      phoneNumber: patch.phoneNumber,
      housingStatus: patch.housingStatus,
      educationStatus: patch.educationStatus,
      employmentStatus: patch.employmentStatus,
      convictionDetails: patch.convictionDetails,
      aidRequested: patch.aidRequested,
      otherAidRequested: patch.otherAidRequested,
      additionalComments: patch.additionalComments,
    };

    const result = await updateApplicant({
      _id: nextApplicant._id,
      applicantNumber: nextApplicant.applicantNumber,
      applicantName: nextApplicant.applicantName,
      dateSubmitted: nextApplicant.dateSubmitted,
      status: nextApplicant.status,
      dateOfBirth: nextApplicant.dateOfBirth,
      race: nextApplicant.race,
      gender: nextApplicant.gender,
      email: nextApplicant.email,
      address: nextApplicant.address,
      phoneNumber: nextApplicant.phoneNumber,
      housingStatus: nextApplicant.housingStatus,
      educationStatus: nextApplicant.educationStatus,
      employmentStatus: nextApplicant.employmentStatus,
      convictionDetails: nextApplicant.convictionDetails,
      aidRequested: nextApplicant.aidRequested,
      otherAidRequested: nextApplicant.otherAidRequested,
      additionalComments: nextApplicant.additionalComments,
      todos: nextApplicant.todos,
      notes: nextApplicant.notes,
      isCompleted: nextApplicant.isCompleted,
    });

    if (result.success) {
      setEditingRows((prev) => ({ ...prev, [rowId]: false }));
      onCompleteToggle?.();
      setSuccessAlert?.("Application updated successfully!");
    } else {
      alert(
        "Failed to save edits. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
    }
  };

  /**
   * Generate a PDF of the applicant record and trigger a browser download.
   * Uses dynamic import for `@react-pdf/renderer` so the (~500KB) library is
   * pulled in lazily only when an admin actually downloads — keeps the main
   * dashboard bundle small.
   */
  const handleDownloadPDF = async (clientNumber: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    try {
      const { pdf } = await import("@react-pdf/renderer");
      const persistedTodos = todosByClient[clientNumber] ?? applicant.todos;
      const blob = await pdf(
        <ApplicantPDF applicant={applicant} todos={persistedTodos} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const safeName = applicant.applicantName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      link.download = `applicant-${applicant.applicantNumber}-${safeName}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const columns: ColumnDef<ApplicationRowData>[] = [
    {
      accessorKey: "clientNumber",
      header: "Client Number",
      cell: ({ getValue }) => <span className={styles.clientNumber}>{getValue<string>()}</span>,
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
    },
    {
      accessorKey: "dateSubmitted",
      header: "Date Submitted",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusDropdown
          status={row.original.status}
          onChange={(next) => {
            void handleChangeStatus(row.original.clientNumber, next);
          }}
        />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const isExpanded = expandedRows[row.id] ?? false;
        const isEditing = editingRows[row.id] ?? false;
        return (
          <div className={styles.actionsCell}>
            <button
              className={styles.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                toggleRowExpanded(row.id);
              }}
              aria-label={isExpanded ? "Hide application details" : "View application details"}
              aria-pressed={isExpanded}
              title={isExpanded ? "Hide details" : "View details"}
            >
              <Image
                src={isExpanded ? "/upCaret.svg" : "/downCaret.svg"}
                width={24}
                height={24}
                alt=""
                className={styles.iconImage}
              />
            </button>
            <button
              className={styles.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                // Clicking Edit expands the row (so the form is visible) and flips the
                // expanded card into edit mode. Toggling again exits edit mode in place.
                setExpandedRows((prev) => ({ ...prev, [row.id]: true }));
                setEditingRows((prev) => ({ ...prev, [row.id]: !prev[row.id] }));
              }}
              aria-label="Edit application"
              aria-pressed={isEditing}
              title="Edit application"
            >
              <Image src="/edit.svg" width={24} height={24} alt="" className={styles.iconImage} />
            </button>
            <button
              className={styles.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                void handleDownloadPDF(row.original.clientNumber);
              }}
              aria-label="Download application as PDF"
              title="Download application as PDF"
            >
              <Image
                src="/ic_download.svg"
                width={24}
                height={24}
                alt=""
                className={styles.iconImage}
              />
            </button>
            <button
              className={styles.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                void handleDeleteApplicant(row.original.clientNumber);
              }}
              aria-label="Delete application"
              title="Delete application"
            >
              <Image src="/trash.svg" width={24} height={24} alt="" className={styles.iconImage} />
            </button>
          </div>
        );
      },
    },
  ];

  const tableData = isLoadingProp || errorProp ? [] : applications;

  const table = useReactTable<ApplicationRowData>({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const clientNameValue = row.getValue("clientName");
      if (typeof clientNameValue !== "string") return false;
      const lowerSearch = String(filterValue).toLowerCase();
      return clientNameValue.toLowerCase().includes(lowerSearch);
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const totalFilteredRows = table.getFilteredRowModel().rows.length;
  const totalCount = totalFilteredRows;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const startRow = totalCount === 0 ? 0 : table.getState().pagination.pageIndex * pageSize + 1;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableTitleContainer}>
        <h3 className={styles.tableTitle}>{title}</h3>
        <button
          className={styles.tableVisibilityButton}
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? "Expand table" : "Collapse table"}
        >
          <Image
            src={isCollapsed ? "/upCaret.svg" : "/downCaret.svg"}
            width={24}
            height={24}
            alt={isCollapsed ? "Expand" : "Collapse"}
          />
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={styles.tableHeader}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                      >
                        <div className={styles.headerContent}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && header.id !== "actions" && (
                            <SortIndicator isSorted={header.column.getIsSorted()} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {(() => {
                  return table.getRowModel().rows.map((row) => {
                    const isExpanded = expandedRows[row.id];
                    const clientNumber = row.original.clientNumber;
                    const persistedTodos = todosByClient[clientNumber] ?? row.original.todos ?? [];
                    const rowWithPersistedTodos: ApplicationRowData = {
                      ...row.original,
                      todos: persistedTodos,
                    };
                    return (
                      <React.Fragment key={row.id}>
                        <tr
                          className={styles.tableRow}
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          onClick={() => {
                            // Don't collapse the row while the user is mid-edit
                            // — collapsing discards unsaved draft state in the
                            // ExpandedRowContent form. They must use Save or
                            // Cancel to leave edit mode first.
                            if (editingRows[row.id]) return;
                            toggleRowExpanded(row.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              if (editingRows[row.id]) return;
                              toggleRowExpanded(row.id);
                            }
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className={styles.tableCell}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                        <tr className={styles.expandedDetailRow}>
                          <td colSpan={columns.length} className={styles.expandedDetailCell}>
                            <div
                              ref={(el) => {
                                if (el) expandedRefs.current[row.id] = el;
                              }}
                              className={`${styles.expandedContentWrapper} ${
                                isExpanded ? styles.open : ""
                              }`}
                              style={{
                                maxHeight: isExpanded
                                  ? `${String(expandedHeights[row.id] || 0)}px`
                                  : "0px",
                              }}
                            >
                              {(isExpanded || expandedHeights[row.id] !== undefined) && (
                                <ExpandedRowContent
                                  row={rowWithPersistedTodos}
                                  todos={persistedTodos}
                                  onToggleTodo={(todoId) => {
                                    void handleToggleTodo(clientNumber, todoId);
                                  }}
                                  onAddTodo={(label) => {
                                    void handleAddTodo(clientNumber, label);
                                  }}
                                  onAddNote={(content) => {
                                    void handleAddNote(clientNumber, content);
                                  }}
                                  isCompleted={Boolean(isCompleted)}
                                  onToggleComplete={() => {
                                    void handleToggleComplete(clientNumber);
                                  }}
                                  isEditing={editingRows[row.id] ?? false}
                                  onSaveEdit={(patch) => {
                                    void handleSaveEdit(clientNumber, patch, row.id);
                                  }}
                                  onCancelEdit={() => {
                                    setEditingRows((prev) => ({ ...prev, [row.id]: false }));
                                  }}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              {totalCount === 0 ? (
                <>No applications to display</>
              ) : (
                <>
                  Showing {startRow}–
                  {Math.min(startRow + table.getRowModel().rows.length - 1, totalCount)} of{" "}
                  {totalFilteredRows} applications
                </>
              )}
            </div>
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => {
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <span className={styles.pageIndicator}>
                page{" "}
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    const clamped = Math.max(0, Math.min(page, totalPages - 1));
                    table.setPageIndex(clamped);
                  }}
                  className={styles.pageInput}
                  min={1}
                  max={totalPages}
                />{" "}
                of {totalPages}
              </span>
              <button
                className={styles.paginationButton}
                onClick={() => {
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
