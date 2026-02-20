/**
 * admin file
 */
"use client";

import { useState } from "react";

import styles from "./adminPage.module.css";
import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

import type { ApplicationRowData } from "./components/ApplicationTable";

const ipData: ApplicationRowData[] = [
  {
    clientNumber: "#00000000",
    clientName: "To Move 3",
    dateSubmitted: "January 17, 2026",
    status: "Need to Review",
    dateOfBirth: "01/23/2025",
    race: "Asian",
    gender: "Female",
    cdcrNumber: "-",
    email: "credclient@gmail.com",
    phoneNumber: "000 - 000- 0000",
    convictionDetails:
      "Lorem ipsum dolor sit amet consectetur. Venenatis eget odio nunc vitae. Quisque commodo aliquam ornare nisl. Sit sit elementum libero varius turpis a felis.",
    aidRequested: ["Elective Life Training", "Not Sure/Other:"],
    otherAidRequested:
      "I need help with managing my monthly income because I am struggling with paying my bills.",
    additionalComments: "Is there a physical location I can meet with you guys?",
    todos: [
      { id: "1", label: "Emailed response?", completed: true },
      { id: "2", label: "Contacted collaborators?", completed: false },
      { id: "3", label: "Assigned programs?", completed: false },
      { id: "4", label: "Assigned programs?", completed: false },
      { id: "5", label: "Assigned programs?", completed: false },
    ],
    notes: [
      { date: "M/D/YYYY", content: "New Note" },
      { date: "M/D/YYYY", content: "New Note" },
    ],
  },
  {
    clientNumber: "#00000000",
    clientName: "To Move 1",
    dateSubmitted: "January 15, 2026",
    status: "Need to Review",
    dateOfBirth: "03/15/1990",
    race: "Hispanic",
    gender: "Female",
    email: "andrea.l@email.com",
    phoneNumber: "555 - 123- 4567",
    todos: [
      { id: "1", label: "Emailed response?", completed: false },
      { id: "2", label: "Contacted collaborators?", completed: false },
    ],
  },
  {
    clientNumber: "#00000000",
    clientName: "To Move 2",
    dateSubmitted: "January 10, 2026",
    status: "Under Review",
    dateOfBirth: "07/22/1985",
    race: "Asian",
    gender: "Female",
    email: "irene.joo@email.com",
    phoneNumber: "555 - 987- 6543",
    todos: [
      { id: "1", label: "Emailed response?", completed: true },
      { id: "2", label: "Contacted collaborators?", completed: false },
    ],
  },
];

const comData: ApplicationRowData[] = [
  {
    clientNumber: "#00000000",
    clientName: "Alice Lan",
    dateSubmitted: "January 17, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Andrea Labaikka",
    dateSubmitted: "January 15, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Irene Joo",
    dateSubmitted: "January 10, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Alice Lan",
    dateSubmitted: "January 17, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Andrea Labaikka",
    dateSubmitted: "January 15, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Irene Joo",
    dateSubmitted: "January 10, 2026",
    status: "Reviewed",
  },
];

export default function AdminPage() {
  const [newApps, setNewApps] = useState<ApplicationRowData[]>(ipData);
  const [completedApps, setCompletedApps] = useState<ApplicationRowData[]>(comData);

  /** Move a row from the "new" table to "completed" */
  const moveToCompleted = (index: number) => {
    const row = newApps[index];
    setNewApps((prev) => prev.filter((_, i) => i !== index));
    setCompletedApps((prev) => [{ ...row, status: "Reviewed" }, ...prev]);
  };

  /** Move a row from the "completed" table back to "new" */
  const moveToNew = (index: number) => {
    const row = completedApps[index];
    setCompletedApps((prev) => prev.filter((_, i) => i !== index));
    setNewApps((prev) => [{ ...row, status: "Need to Review" }, ...prev]);
  };

  return (
    <main className={styles.mainContent}>
      <AdminHeader name="DeQuan" />
      <ApplicationTable
        title="New Applications"
        data={newApps}
        totalApplications={newApps.length}
        onRowMove={moveToCompleted}
      />
      <ApplicationTable
        title="Completed Applications"
        data={completedApps}
        totalApplications={completedApps.length}
        onRowMove={moveToNew}
        isCompleted
      />
    </main>
  );
}
