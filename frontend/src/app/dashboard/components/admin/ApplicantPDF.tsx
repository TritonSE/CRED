/**
 * ApplicantPDF Component
 *
 * Renders an applicant's full record as a printable PDF using
 * `@react-pdf/renderer`. Layout mirrors the dashboard's expanded card so admins
 * can take an offline copy of any application that matches what they'd see in
 * the UI.
 *
 * The Document is consumed by `@react-pdf/renderer`'s `pdf()` helper from
 * `ApplicationTable`'s download handler, which produces a Blob and triggers a
 * browser download.
 *
 * @module ApplicantPDF
 */
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { Applicant } from "@/api/applicant";

const COLORS = {
  brandPrimary: "#175892",
  brandDark: "#004377",
  body: "#0c2b35",
  label: "#757880",
  divider: "#b4b4b4",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: COLORS.body,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.brandPrimary,
    paddingBottom: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.brandDark,
  },
  meta: {
    fontSize: 10,
    color: COLORS.label,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: COLORS.brandDark,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginVertical: 10,
  },
  fieldRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  field: {
    width: "50%",
    paddingRight: 8,
    marginBottom: 6,
  },
  fieldFull: {
    width: "100%",
    paddingRight: 8,
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 9,
    color: COLORS.label,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 11,
    color: COLORS.body,
  },
  paragraph: {
    fontSize: 11,
    color: COLORS.body,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 11,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
  },
  todoLine: {
    flexDirection: "row",
    marginBottom: 3,
    fontSize: 11,
  },
  statusPill: {
    fontSize: 10,
    color: COLORS.brandDark,
    fontWeight: 700,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 48,
    right: 48,
    fontSize: 9,
    color: COLORS.label,
    textAlign: "center",
  },
});

const fmtDate = (d: Date | string | undefined): string => {
  if (!d) return "-";
  const parsed = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const orDash = (v: string | undefined): string => (v && v.length > 0 ? v : "-");

type ApplicantPDFProps = {
  applicant: Applicant;
  /** Optional override for the to-do list (parent's optimistic state may differ from `applicant.todos`). */
  todos?: { id: string; label: string; completed: boolean }[];
};

export function ApplicantPDF({ applicant, todos }: ApplicantPDFProps) {
  const todoItems = todos ?? applicant.todos ?? [];
  const aidLine = [...applicant.aidRequested, applicant.otherAidRequested]
    .filter((s): s is string => Boolean(s))
    .join(", ");
  const educationParts: string[] = applicant.educationStatus ?? [];
  const educationLine = [...educationParts, applicant.otherEducationStatus]
    .filter((s): s is string => Boolean(s))
    .join(", ");
  const employmentParts: string[] = applicant.employmentStatus ?? [];
  const employmentLine = [...employmentParts, applicant.otherEmploymentStatus]
    .filter((s): s is string => Boolean(s))
    .join(", ");

  return (
    <Document
      title={`Applicant ${applicant.applicantNumber} - ${applicant.applicantName}`}
      author="CRED"
    >
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Applicant Record</Text>
            <Text style={styles.meta}>
              {applicant.applicantName} (#{applicant.applicantNumber})
            </Text>
          </View>
          <View>
            <Text style={styles.statusPill}>Status: {applicant.status}</Text>
            <Text style={styles.meta}>Submitted {fmtDate(applicant.dateSubmitted)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Client Profile</Text>
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <Text style={styles.fieldValue}>{fmtDate(applicant.dateOfBirth)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Gender</Text>
            <Text style={styles.fieldValue}>{orDash(applicant.gender)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Race</Text>
            <Text style={styles.fieldValue}>{orDash(applicant.race)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Housing Status</Text>
            <Text style={styles.fieldValue}>{orDash(applicant.housingStatus)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Education</Text>
            <Text style={styles.fieldValue}>{educationLine.length > 0 ? educationLine : "-"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Employment</Text>
            <Text style={styles.fieldValue}>
              {employmentLine.length > 0 ? employmentLine : "-"}
            </Text>
          </View>
          <View style={styles.fieldFull}>
            <Text style={styles.fieldLabel}>Address</Text>
            <Text style={styles.fieldValue}>{orDash(applicant.address)}</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{orDash(applicant.email)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <Text style={styles.fieldValue}>{orDash(applicant.phoneNumber)}</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Program Needs &amp; Interests</Text>
        <Text style={styles.fieldLabel}>Conviction Details / Situation</Text>
        <Text style={styles.paragraph}>{orDash(applicant.convictionDetails)}</Text>

        <Text style={styles.fieldLabel}>Type of Aid Requested</Text>
        <Text style={styles.paragraph}>{aidLine.length > 0 ? aidLine : "-"}</Text>

        <Text style={styles.fieldLabel}>Additional Comments / Questions</Text>
        <Text style={styles.paragraph}>{orDash(applicant.additionalComments)}</Text>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>To-Dos</Text>
        {todoItems.length === 0 ? (
          <Text style={styles.paragraph}>None recorded.</Text>
        ) : (
          todoItems.map((todo) => (
            <View key={todo.id} style={styles.todoLine}>
              <Text style={styles.bulletDot}>{todo.completed ? "[x]" : "[ ]"}</Text>
              <Text style={styles.bulletText}>{todo.label}</Text>
            </View>
          ))
        )}

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Notes / History Log</Text>
        {(applicant.notes ?? []).length === 0 ? (
          <Text style={styles.paragraph}>No notes recorded.</Text>
        ) : (
          (applicant.notes ?? []).map((note, idx) => (
            <View key={idx} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                {note.content} ({note.date})
              </Text>
            </View>
          ))
        )}

        <Text style={styles.footer} fixed>
          Generated by CRED Admin Dashboard — {new Date().toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
}
