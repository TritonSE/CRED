"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  AID_REQUESTED_OPTIONS,
  EDUCATION_OPTIONS,
  EMPLOYMENT_OPTIONS,
  GENDER_OPTIONS,
  HOUSING_STATUS_OPTIONS,
  RACE_OPTIONS,
} from "../applicantOptions";

import styles from "./ExpandedRowContent.module.css";

import type { ApplicationRowData, TodoItem } from "./ApplicationTable";

/**
 * Subset of applicant fields the edit form mutates and forwards to the parent
 * on save. Excludes immutable identifiers (`_id`, `applicantNumber`,
 * `dateSubmitted`, `isCompleted`) and collections managed elsewhere
 * (`todos`, `notes`).
 */
export type ApplicantEditPatch = {
  applicantName: string;
  dateOfBirth: string;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
};

export type ExpandedRowContentProps = {
  row: ApplicationRowData;
  todos?: TodoItem[];
  onToggleTodo?: (id: string) => void;
  /**
   * Append a new to-do to the applicant. Per Maya's V2 annotation, this also
   * auto-transitions the applicant's status to "Under Review" if it was still
   * "Need to Review".
   */
  onAddTodo?: (label: string) => void;
  /**
   * Append a new note (dated today) to the applicant. Same auto-transition
   * behavior as `onAddTodo`.
   */
  onAddNote?: (content: string) => void;
  /** Whether the parent table holds completed applicants — controls the action label. */
  isCompleted?: boolean;
  /** Toggle the applicant between completed and not-completed. */
  onToggleComplete?: () => void;
  /** Whether the card is currently in edit mode (fields → inputs). */
  isEditing?: boolean;
  /** Persist the edited fields and exit edit mode. */
  onSaveEdit?: (patch: ApplicantEditPatch) => void | Promise<void>;
  /** Discard edits and exit edit mode. */
  onCancelEdit?: () => void;
};

/** Empty-string fallback for optional fields when seeding the edit draft. */
const orEmpty = (v: string | undefined): string => v ?? "";

/**
 * Seed the edit-mode draft from a table row. The expanded card carries a
 * pre-formatted `dateOfBirth` string (e.g. `2026-01-17`); we hand that straight
 * through so the `<input type="date">` can use it without re-parsing.
 */
function buildDraft(row: ApplicationRowData): ApplicantEditPatch {
  return {
    applicantName: row.clientName,
    dateOfBirth: orEmpty(row.dateOfBirth),
    race: orEmpty(row.race),
    gender: orEmpty(row.gender),
    email: orEmpty(row.email),
    address: orEmpty(row.address),
    phoneNumber: orEmpty(row.phoneNumber),
    housingStatus: row.housingStatus,
    educationStatus: row.education,
    employmentStatus: row.employment,
    convictionDetails: row.convictionDetails,
    aidRequested: row.aidRequested ?? [],
    otherAidRequested: row.otherAidRequested,
    additionalComments: row.additionalComments,
  };
}

export function ExpandedRowContent({
  row,
  todos = row.todos ?? [],
  onToggleTodo,
  onAddTodo,
  onAddNote,
  isCompleted = false,
  onToggleComplete,
  isEditing = false,
  onSaveEdit,
  onCancelEdit,
}: ExpandedRowContentProps) {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoLabel, setNewTodoLabel] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");

  const submitNewTodo = () => {
    const trimmed = newTodoLabel.trim();
    if (trimmed.length === 0) {
      setIsAddingTodo(false);
      setNewTodoLabel("");
      return;
    }
    onAddTodo?.(trimmed);
    setNewTodoLabel("");
    setIsAddingTodo(false);
  };

  const cancelNewTodo = () => {
    setNewTodoLabel("");
    setIsAddingTodo(false);
  };

  const submitNewNote = () => {
    const trimmed = newNoteContent.trim();
    if (trimmed.length === 0) {
      setIsAddingNote(false);
      setNewNoteContent("");
      return;
    }
    onAddNote?.(trimmed);
    setNewNoteContent("");
    setIsAddingNote(false);
  };

  const cancelNewNote = () => {
    setNewNoteContent("");
    setIsAddingNote(false);
  };
  const aidRequestedString = [...(row.aidRequested ?? []), row.otherAidRequested]
    .filter((item): item is string => Boolean(item))
    .join(", ");

  // Draft state for the edit form. Reseeded whenever we (re-)enter edit mode
  // or the underlying row identity changes, so toggling Cancel + Edit again
  // starts from the latest persisted values rather than a stale draft.
  const [draft, setDraft] = useState<ApplicantEditPatch>(() => buildDraft(row));

  useEffect(() => {
    if (isEditing) {
      setDraft(buildDraft(row));
    }
  }, [isEditing, row]);

  const updateDraft = <K extends keyof ApplicantEditPatch>(
    key: K,
    value: ApplicantEditPatch[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAid = (option: string) => {
    setDraft((prev) => ({
      ...prev,
      aidRequested: prev.aidRequested.includes(option)
        ? prev.aidRequested.filter((a) => a !== option)
        : [...prev.aidRequested, option],
    }));
  };

  const handleSave = () => {
    void onSaveEdit?.(draft);
  };

  return (
    <div className={styles.expandedContent}>
      <div className={styles.expandedLeftCol}>
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Client Profile</h4>
          <div className={styles.profileGrid}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Client Number</span>
              <span className={styles.profileValue}>{row.clientNumber}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Name</span>
              {isEditing ? (
                <input
                  className={styles.editInput}
                  type="text"
                  value={draft.applicantName}
                  onChange={(e) => {
                    updateDraft("applicantName", e.target.value);
                  }}
                />
              ) : (
                <span className={styles.profileValue}>{row.clientName}</span>
              )}
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Date of Birth</span>
              {isEditing ? (
                <input
                  className={styles.editInput}
                  type="date"
                  value={draft.dateOfBirth}
                  onChange={(e) => {
                    updateDraft("dateOfBirth", e.target.value);
                  }}
                />
              ) : (
                <span className={styles.profileValue}>{row.dateOfBirth ?? "-"}</span>
              )}
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Gender</span>
              {isEditing ? (
                <select
                  className={styles.editSelect}
                  value={draft.gender}
                  onChange={(e) => {
                    updateDraft("gender", e.target.value);
                  }}
                >
                  {GENDER_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={styles.profileValue}>{row.gender ?? "-"}</span>
              )}
            </div>
            <div className={`${styles.profileItem} ${styles.profileItemWide}`}>
              <span className={styles.profileLabel}>Race</span>
              {isEditing ? (
                <select
                  className={styles.editSelect}
                  value={draft.race}
                  onChange={(e) => {
                    updateDraft("race", e.target.value);
                  }}
                >
                  {RACE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={styles.profileValue}>{row.race ?? "-"}</span>
              )}
            </div>
            <div className={`${styles.profileItem} ${styles.profileItemWide}`}>
              <span className={styles.profileLabel}>Address</span>
              {isEditing ? (
                <input
                  className={styles.editInput}
                  type="text"
                  value={draft.address}
                  onChange={(e) => {
                    updateDraft("address", e.target.value);
                  }}
                />
              ) : (
                <span className={styles.profileValue}>{row.address ?? "-"}</span>
              )}
            </div>
            <div className={`${styles.profileItem} ${styles.profileItemWide}`}>
              <span className={styles.profileLabel}>Employment</span>
              {isEditing ? (
                <select
                  className={styles.editSelect}
                  value={draft.employmentStatus ?? ""}
                  onChange={(e) => {
                    updateDraft("employmentStatus", e.target.value || undefined);
                  }}
                >
                  <option value="">-</option>
                  {EMPLOYMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={styles.profileValue}>{row.employment ?? "-"}</span>
              )}
            </div>
            <div className={`${styles.profileItem} ${styles.profileItemWide}`}>
              <span className={styles.profileLabel}>Housing Status</span>
              {isEditing ? (
                <select
                  className={styles.editSelect}
                  value={draft.housingStatus ?? ""}
                  onChange={(e) => {
                    updateDraft("housingStatus", e.target.value || undefined);
                  }}
                >
                  <option value="">-</option>
                  {HOUSING_STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={styles.profileValue}>{row.housingStatus ?? "-"}</span>
              )}
            </div>
            <div className={`${styles.profileItem} ${styles.profileItemWide}`}>
              <span className={styles.profileLabel}>Education</span>
              {isEditing ? (
                <select
                  className={styles.editSelect}
                  value={draft.educationStatus ?? ""}
                  onChange={(e) => {
                    updateDraft("educationStatus", e.target.value || undefined);
                  }}
                >
                  <option value="">-</option>
                  {EDUCATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={styles.profileValue}>{row.education ?? "-"}</span>
              )}
            </div>
          </div>
        </div>

        <hr className={styles.profileGridDivider} />
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Program Needs &amp; Interests</h4>
          <div className={styles.programDetails}>
            <span className={styles.programSubtitle}>
              Conviction Details / Describe your situation
            </span>
            {isEditing ? (
              <textarea
                className={styles.editTextarea}
                value={draft.convictionDetails ?? ""}
                onChange={(e) => {
                  updateDraft("convictionDetails", e.target.value || undefined);
                }}
                rows={3}
              />
            ) : (
              <p className={styles.programText}>{row.convictionDetails ?? "-"}</p>
            )}

            <span className={styles.programSubtitle}>Type of Aid Requested</span>
            {isEditing ? (
              <div className={styles.editAidList}>
                {AID_REQUESTED_OPTIONS.map((opt) => (
                  <label key={opt} className={styles.editAidItem}>
                    <input
                      type="checkbox"
                      checked={draft.aidRequested.includes(opt)}
                      onChange={() => {
                        toggleAid(opt);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
                <input
                  className={styles.editInput}
                  type="text"
                  placeholder="Other (describe)"
                  value={draft.otherAidRequested ?? ""}
                  onChange={(e) => {
                    updateDraft("otherAidRequested", e.target.value || undefined);
                  }}
                />
              </div>
            ) : (
              <span className={styles.aidDetails}>{aidRequestedString}</span>
            )}

            <span className={styles.programSubtitle}>Additional Comments/Questions</span>
            {isEditing ? (
              <textarea
                className={styles.editTextarea}
                value={draft.additionalComments ?? ""}
                onChange={(e) => {
                  updateDraft("additionalComments", e.target.value || undefined);
                }}
                rows={3}
              />
            ) : (
              <div className={styles.commentsBox}>
                <p className={styles.commentsText}>{row.additionalComments ?? "-"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.expandedRightCol}>
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Contact Information</h4>
          <div className={styles.contactGrid}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Email</span>
              {isEditing ? (
                <input
                  className={styles.editInput}
                  type="email"
                  value={draft.email}
                  onChange={(e) => {
                    updateDraft("email", e.target.value);
                  }}
                />
              ) : (
                <span className={styles.profileValue}>{row.email ?? "-"}</span>
              )}
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Phone Number</span>
              {isEditing ? (
                <input
                  className={styles.editInput}
                  type="tel"
                  value={draft.phoneNumber}
                  onChange={(e) => {
                    updateDraft("phoneNumber", e.target.value);
                  }}
                />
              ) : (
                <span className={styles.profileValue}>{row.phoneNumber ?? "-"}</span>
              )}
            </div>
          </div>
        </div>

        <hr className={styles.profileGridDivider} />
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>To-Dos</h4>
          <div className={styles.todoList}>
            <div className={styles.todoListWrapper}>
              {todos.map((todo) => (
                <label key={todo.id} className={styles.todoItem}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      onToggleTodo?.(todo.id);
                    }}
                    className={styles.checkbox}
                  />
                  <span>{todo.label}</span>
                </label>
              ))}
            </div>
            {isAddingTodo ? (
              <div className={styles.inlineAddRow}>
                <input
                  className={styles.editInput}
                  type="text"
                  autoFocus
                  placeholder="What needs doing?"
                  value={newTodoLabel}
                  onChange={(e) => {
                    setNewTodoLabel(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitNewTodo();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      cancelNewTodo();
                    }
                  }}
                />
                <button type="button" className={styles.saveButton} onClick={submitNewTodo}>
                  Add
                </button>
                <button type="button" className={styles.cancelButton} onClick={cancelNewTodo}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={styles.addTodoButton}
                aria-label="Add a new to-do item"
                onClick={() => {
                  setIsAddingTodo(true);
                }}
              >
                <span className={styles.addTodoPlus}>
                  <Image src="/plus.svg" alt="add" width={14} height={14} />
                </span>
                <span>Add To-do</span>
              </button>
            )}
          </div>
        </div>

        <hr className={styles.profileGridDivider} />
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Notes/History Log</h4>
          <ul className={styles.notesList}>
            {row.notes?.map((note, index) => (
              <li key={index} className={styles.noteItem}>
                {note.content} ({note.date})
              </li>
            ))}
          </ul>
          {isAddingNote ? (
            <div className={styles.inlineAddColumn}>
              <textarea
                className={styles.editTextarea}
                autoFocus
                placeholder="Add a note about this applicant"
                rows={3}
                value={newNoteContent}
                onChange={(e) => {
                  setNewNoteContent(e.target.value);
                }}
                onKeyDown={(e) => {
                  // Cmd/Ctrl+Enter saves; Esc cancels.
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    submitNewNote();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    cancelNewNote();
                  }
                }}
              />
              <div className={styles.inlineAddActions}>
                <button type="button" className={styles.cancelButton} onClick={cancelNewNote}>
                  Cancel
                </button>
                <button type="button" className={styles.saveButton} onClick={submitNewNote}>
                  Add note
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className={styles.addTodoButton}
              aria-label="Add a new note"
              onClick={() => {
                setIsAddingNote(true);
              }}
            >
              <span className={styles.addTodoPlus}>
                <Image src="/plus.svg" alt="add" width={14} height={14} />
              </span>
              <span>Add note</span>
            </button>
          )}
        </div>

        {/*
         * Bottom action row. In edit mode shows Save/Cancel; otherwise the
         * Mark Complete control (relocated here from the table actions column
         * per Maya's V2 annotation).
         */}
        <div className={styles.completeActionRow}>
          {isEditing ? (
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  onCancelEdit?.();
                }}
              >
                Cancel
              </button>
              <button type="button" className={styles.saveButton} onClick={handleSave}>
                Save changes
              </button>
            </div>
          ) : (
            onToggleComplete && (
              <button
                type="button"
                className={isCompleted ? styles.completedButton : styles.markCompleteButton}
                onClick={onToggleComplete}
              >
                <Image
                  src={isCompleted ? "/admin_checkmark_dark.svg" : "/admin_checkmark_light.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                <span>{isCompleted ? "Mark as incomplete" : "Mark as complete"}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
