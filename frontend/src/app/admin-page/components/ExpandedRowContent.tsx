/**
 * ExpandedRowContent Component
 *
 * Displays detailed client information in an expandable table row.
 * Shows:
 * - Client Profile (number, name, DOB, race, gender, housing status, education, employment, address, ID)
 * - Contact Information (email, phone)
 * - Program Needs & Interests (conviction details, aid requested, comments)
 * - To-Dos (interactive checklist)
 * - Notes/History Log
 *
 * @module ExpandedRowContent
 */
"use client";

import { useState } from "react";

import styles from "./ApplicationTable.module.css";

import type { ApplicationRowData } from "./ApplicationTable";

/**
 * Props for the ExpandedRowContent component
 */
export type ExpandedRowContentProps = {
  row: ApplicationRowData;
};

/**
 * ExpandedRowContent - Renders detailed view of an application row
 *
 * @param {ExpandedRowContentProps} props - Component props
 * @param {ApplicationRowData} props.row - The application data to display
 * @returns {JSX.Element} Expanded content with client details
 */
export function ExpandedRowContent({ row }: ExpandedRowContentProps) {
  const [todos, setTodos] = useState(row.todos ?? []);

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  return (
    <div className={styles.expandedContent}>
      {/* Left Column: Client Profile + Program Needs */}
      <div className={styles.expandedLeftCol}>
        {/* Client Profile Section */}
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Client Profile</h4>
          <div className={styles.profileGrid}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Client Number</span>
              <span className={styles.profileValue}>{row.clientNumber}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Name</span>
              <span className={styles.profileValue}>{row.clientName}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Date of Birth</span>
              <span className={styles.profileValue}>{row.dateOfBirth ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Race</span>
              <span className={styles.profileValue}>{row.race ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Gender</span>
              <span className={styles.profileValue}>{row.gender ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Housing Status</span>
              <span className={styles.profileValue}>{row.housingStatus ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Education</span>
              <span className={styles.profileValue}>{row.education ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Employment</span>
              <span className={styles.profileValue}>{row.employment ?? "-"}</span>
            </div>
            <div className={`${styles.profileItem} ${styles.profileItemWide}`}>
              <span className={styles.profileLabel}>Address</span>
              <span className={styles.profileValue}>{row.address ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>ID</span>
              {row.idDocument ? (
                <a href="#" className={styles.idLink}>
                  {row.idDocument}
                </a>
              ) : (
                <span className={styles.profileValue}>-</span>
              )}
            </div>
          </div>
        </div>

        <hr className={styles.profileGridDivider} />
        {/* Program Needs & Interests Section */}
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Program Needs &amp; Interests</h4>
          <div className={styles.programDetails}>
            <span className={styles.programSubtitle}>
              Conviction Details / Describe your situation
            </span>
            <p className={styles.programText}>{row.convictionDetails ?? "-"}</p>

            <span className={styles.programSubtitle}>Type of Aid Requested</span>
            <span className={styles.aidSubLabel}>Housing, Education, Not Sure/Other:</span>
            <div className={styles.aidList}>
              <label key="housing" className={styles.aidItem}>
                {row.aidRequested?.includes("Housing") ? (
                  <input type="checkbox" checked readOnly className={styles.aidCheckbox} />
                ) : (
                  <input type="checkbox" readOnly className={styles.aidCheckbox} />
                )}
                <span className={styles.aidText}>Housing</span>
              </label>
              <label key="education" className={styles.aidItem}>
                {row.aidRequested?.includes("Education") ? (
                  <input type="checkbox" checked readOnly className={styles.aidCheckbox} />
                ) : (
                  <input type="checkbox" readOnly className={styles.aidCheckbox} />
                )}
                <span className={styles.aidText}>Education</span>
              </label>
              <label key="workforce-development" className={styles.aidItem}>
                {row.aidRequested?.includes("Workforce Development/Employment") ? (
                  <input type="checkbox" checked readOnly className={styles.aidCheckbox} />
                ) : (
                  <input type="checkbox" readOnly className={styles.aidCheckbox} />
                )}
                <span className={styles.aidText}>Workforce Development/Employment</span>
              </label>
              <label key="not-sure-other" className={styles.aidItem}>
                {row.otherAidRequested ? (
                  <input type="checkbox" checked readOnly className={styles.aidCheckbox} />
                ) : (
                  <input type="checkbox" readOnly className={styles.aidCheckbox} />
                )}
                <span className={styles.aidText}>Not Sure/Other:</span>
              </label>
              {row.otherAidRequested && (
                <div className={styles.otherAidRequestedBox}>
                  <p className={styles.otherAidRequestedText}>{row.otherAidRequested}</p>
                </div>
              )}
            </div>

            <span className={styles.programSubtitle}>Additional Comments/Questions</span>
            <div className={styles.commentsBox}>
              <p className={styles.commentsText}>{row.additionalComments ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Info + To-Dos + Notes */}
      <div className={styles.expandedRightCol}>
        {/* Contact Information */}
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Contact Information</h4>
          <div className={styles.contactGrid}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Email</span>
              <span className={styles.profileValue}>{row.email ?? "-"}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Phone Number</span>
              <span className={styles.profileValue}>{row.phoneNumber ?? "-"}</span>
            </div>
          </div>
        </div>

        <hr className={styles.profileGridDivider} />
        {/* To-Dos Section */}
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
                      toggleTodo(todo.id);
                    }}
                    className={styles.checkbox}
                  />
                  <span>{todo.label}</span>
                </label>
              ))}
            </div>
            <button className={styles.addTodoButton} aria-label="Add a new to-do item">
              <span className={styles.addTodoPlus}>+</span>
              <span>Add To-do</span>
            </button>
          </div>
        </div>

        <hr className={styles.profileGridDivider} />
        {/* Notes/History Log */}
        <div className={styles.expandedSection}>
          <h4 className={styles.sectionTitle}>Notes/History Log</h4>
          <div className={styles.notesList}>
            {row.notes?.map((note, index) => (
              <div key={index} className={styles.noteItem}>
                • {note.content} ({note.date})
              </div>
            ))}
            <button className={styles.addTodoButton} aria-label="Add a new note">
              <span className={styles.addTodoPlus}>+</span>
              <span>Add note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
