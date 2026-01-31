/**
 * admin file
 */
"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import styles from "./adminPage.module.css";
import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

import type { ApplicationRowData } from "./components/ApplicationTable";

const ipData: ApplicationRowData[] = [
  {
    clientNumber: "#00000000",
    clientName: "Alice Lan",
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
    additionalComments:
      "I need help with managing my monthly income because I am struggling with paying my bills.\n\nIs there a physical location I can meet with you guys?",
    todos: [
      { id: "1", label: "Emailed response?", completed: false },
      { id: "2", label: "Contacted collaborators?", completed: false },
      { id: "3", label: "Assigned programs?", completed: false },
    ],
    notes: [
      { date: "M/D/YYYY", content: "New Note" },
      { date: "M/D/YYYY", content: "New Note" },
    ],
  },
  {
    clientNumber: "#00000000",
    clientName: "Andrea Labaikka",
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
    clientName: "Irene Joo",
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

export default function Admin() {
  return (
    <ThemeProvider>
      <main className={styles.mainContent}>
        <AdminHeader name="Dequan" />
        <ApplicationTable title="New Applications" data={ipData} totalApplications={3} />
        <ApplicationTable title="Completed Applications" data={comData} totalApplications={50} />
      </main>
    </ThemeProvider>
  );
}
