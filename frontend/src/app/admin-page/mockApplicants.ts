/**
 * Mock applicant data for local development.
 *
 * Used as a fallback when the backend isn't reachable so the dashboard can be
 * developed and reviewed without a running Express + MongoDB stack. Wired into
 * `adminPage.tsx` — only injected in development mode after a failed fetch.
 *
 * The dataset intentionally covers every status pill and a rich expanded card
 * (todos, notes, both required and optional fields) so the V2 dashboard's
 * tabs, search, status auto-transition, and Mark Complete flow can all be
 * exercised end-to-end without persistence.
 */

import type { Applicant } from "../../api/applicant";

const day = (year: number, month: number, date: number): Date => new Date(year, month - 1, date);

export const MOCK_APPLICANTS: Applicant[] = [
  {
    _id: "mock-1",
    applicantNumber: "00000001",
    applicantName: "Alice Lux",
    dateSubmitted: day(2026, 1, 17),
    status: "Need to Review",
    dateOfBirth: day(1995, 10, 31),
    race: "Asian/Pacific Islander",
    gender: "Female",
    email: "alice.lux@gmail.com",
    address: "1234 Ocean Drive, La Jolla, CA 92093",
    phoneNumber: "000-000-0000",
    housingStatus: "Transitional housing",
    educationStatus: "Some college",
    employmentStatus: "Employed full-time",
    convictionDetails:
      "Lorem ipsum dolor sit amet consectetur. Venenatis sagittis nec vitae. Quisque commodo aliquam ornare elit. Ut elementum libero urna quam a hac.",
    aidRequested: ["Housing", "Education"],
    additionalComments:
      "Hoping to enroll in school or training. Is there a physical location I can visit, can you guys?",
    todos: [
      { id: "todo-1", label: "Email response", completed: false },
      { id: "todo-2", label: "Contact collaborators", completed: false },
      { id: "todo-3", label: "Assign programs", completed: false },
    ],
    notes: [
      {
        date: "10/17/2026",
        content: "Adding To-Do or Notes should turn the Status to 'Under Review'.",
      },
    ],
    isCompleted: false,
  },
  {
    _id: "mock-2",
    applicantNumber: "00000002",
    applicantName: "Andres Lehtinen",
    dateSubmitted: day(2026, 1, 15),
    status: "Need to Review",
    dateOfBirth: day(1988, 6, 4),
    race: "White",
    gender: "Male",
    email: "andres.lehtinen@example.com",
    address: "567 Mission Ave, San Diego, CA 92101",
    phoneNumber: "619-555-0142",
    housingStatus: "At-risk of homelessness",
    educationStatus: "High school diploma or GED",
    employmentStatus: "Unemployed and seeking work",
    convictionDetails: "Released six months ago, looking for stable employment.",
    aidRequested: ["Housing", "Development"],
    additionalComments: "Available weekdays after 2pm for intake calls.",
    todos: [
      { id: "todo-1", label: "Email response", completed: false },
      { id: "todo-2", label: "Schedule intake", completed: false },
    ],
    notes: [],
    isCompleted: false,
  },
  {
    _id: "mock-3",
    applicantNumber: "00000003",
    applicantName: "Irene Joo",
    dateSubmitted: day(2026, 1, 13),
    status: "Under Review",
    dateOfBirth: day(1992, 3, 18),
    race: "Asian",
    gender: "Female",
    email: "irene.joo@example.com",
    address: "890 Park Blvd, San Diego, CA 92103",
    phoneNumber: "858-555-0199",
    housingStatus: "Stable housing",
    educationStatus: "Bachelor's degree",
    employmentStatus: "Employed part-time",
    convictionDetails: "Seeking workforce development support.",
    aidRequested: ["Education", "Development"],
    additionalComments: "Interested in graduate school prep resources.",
    todos: [
      { id: "todo-1", label: "Email response", completed: true },
      { id: "todo-2", label: "Contact collaborators", completed: false },
    ],
    notes: [{ date: "10/15/2026", content: "Initial outreach completed via email." }],
    isCompleted: false,
  },
  {
    _id: "mock-4",
    applicantNumber: "00000004",
    applicantName: "User 1",
    dateSubmitted: day(2026, 1, 10),
    status: "Reviewed",
    dateOfBirth: day(1990, 5, 22),
    race: "Black or African American",
    gender: "Male",
    email: "user1@example.com",
    address: "100 Main St, San Diego, CA 92101",
    phoneNumber: "619-555-0001",
    housingStatus: "Stable housing",
    educationStatus: "Associate degree",
    employmentStatus: "Employed full-time",
    aidRequested: ["Development"],
    additionalComments: "All intake complete.",
    todos: [{ id: "todo-1", label: "Final follow-up", completed: true }],
    notes: [{ date: "10/12/2026", content: "Marked complete after intake." }],
    isCompleted: true,
  },
  {
    _id: "mock-5",
    applicantNumber: "00000005",
    applicantName: "User 2",
    dateSubmitted: day(2026, 1, 9),
    status: "Reviewed",
    dateOfBirth: day(1985, 8, 12),
    race: "Hispanic or Latino",
    gender: "Female",
    email: "user2@example.com",
    address: "202 Oak St, San Diego, CA 92102",
    phoneNumber: "619-555-0002",
    housingStatus: "Stable housing",
    educationStatus: "High school diploma or GED",
    employmentStatus: "Self-employed",
    aidRequested: ["Housing"],
    todos: [],
    notes: [],
    isCompleted: true,
  },
  {
    _id: "mock-6",
    applicantNumber: "00000006",
    applicantName: "User 3",
    dateSubmitted: day(2026, 1, 8),
    status: "Reviewed",
    dateOfBirth: day(1979, 11, 30),
    race: "Two or More Races",
    gender: "Non-binary",
    email: "user3@example.com",
    address: "303 Pine St, San Diego, CA 92103",
    phoneNumber: "619-555-0003",
    housingStatus: "Transitional housing",
    educationStatus: "Some college",
    employmentStatus: "Student",
    aidRequested: ["Education"],
    todos: [],
    notes: [],
    isCompleted: true,
  },
];
