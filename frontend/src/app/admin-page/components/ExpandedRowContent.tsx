/**
 * ExpandedRowContent Component
 *
 * Displays detailed client information in an expandable table row.
 * Shows:
 * - Client Profile (number, name, DOB, race, gender, CDCR#)
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
            <span className={styles.profileLabel}>CDCR #</span>
            <span className={styles.profileValue}>{row.cdcrNumber ?? "-"}</span>
          </div>
        </div>

        <div className={styles.sectionDivider} />

        {/* Contact Information */}
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

      {/* Program Needs & Interests Section */}
      <div className={styles.expandedSection}>
        <h4 className={styles.sectionTitle}>Program Needs & Interests</h4>
        <div className={styles.programDetails}>
          <span className={styles.programSubtitle}>
            Conviction Details / Describe your situation
          </span>
          <p className={styles.programText}>{row.convictionDetails ?? "-"}</p>

          <span className={styles.programSubtitle}>Type of Aid Requested</span>
          <div className={styles.aidList}>
            {row.aidRequested?.map((aid, index) => (
              <label key={index} className={styles.aidItem}>
                <input type="checkbox" checked readOnly className={styles.checkbox} />
                <span>{aid}</span>
              </label>
            )) ?? <span>-</span>}
          </div>

          <span className={styles.programSubtitle}>Additional Comments/Questions</span>
          <div className={styles.commentsBox}>
            <p className={styles.commentsText}>{row.additionalComments ?? "-"}</p>
          </div>
        </div>
      </div>

      {/* To-Dos Section */}
      <div className={styles.expandedSection}>
        <h4 className={styles.sectionTitle}>To-Dos</h4>
        <div className={styles.todoList}>
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
          <button className={styles.addTodoButton}>+ Add To-do</button>
        </div>

        {/* Notes/History Log */}
        <h4 className={styles.sectionTitle}>Notes/History Log</h4>
        <div className={styles.notesList}>
          {row.notes?.map((note, index) => (
            <div key={index} className={styles.noteItem}>
              • New Note ({note.date})
            </div>
          )) ?? <span>-</span>}
          <button className={styles.viewMoreButton}>view more</button>
        </div>

        <button className={styles.markCompleteButton}>Mark as Complete</button>
      </div>
    </div>
  );
}
