"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { CreateApplicantRequest, createApplicant } from "../../api/applicant";

import { Confirmation } from "./components/ Confirmation";
import { ContactData, ContactForm } from "./components/ContactForm";
import { NeedInterestsForm, NeedsData } from "./components/NeedInterestsForm";
import { ProfileData, YourProfileForm } from "./components/YourProfileForm";

import "./styles.css";

export default function ApplyPage() {
  const [step, setStep] = React.useState(1);
  const router = useRouter();

  const [profileData, setProfileData] = React.useState<ProfileData>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    ethnicity: "",
    address: "",
    employment: new Set<string>(),
    employmentOther: "",
    education: new Set<string>(),
    educationOther: "",
    housing: "",
    housingOther: "",
  });

  const [needsData, setNeedsData] = React.useState<NeedsData>({
    context: "",
    aid: [],
    otherNeed: "",
  });

  const [contactData, setContactData] = React.useState<ContactData>({
    email: "",
    phone: "",
    commentsQuestions: "",
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [submissionResult, setSubmissionResult] = React.useState<{
    clientId: string;
    dateSubmitted: string;
  } | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Use "instant" if you don't want the sliding animation
    });
  }, [step]);

  const handleProfileNext = (data: ProfileData) => {
    setProfileData(data);
    setStep((prev) => prev + 1);
  };

  const handleNeedsNext = (data: NeedsData) => {
    setNeedsData(data);
    setStep((prev) => prev + 1);
  };

  const handleNeedsBack = (data: NeedsData) => {
    setNeedsData(data);
    setStep((prev) => prev - 1);
  };

  const handleContactBack = (data: ContactData) => {
    setContactData(data);
    setStep((prev) => prev - 1);
  };

  const handleContactNext = async (data: ContactData) => {
    setContactData(data);
    setSubmitting(true);

    const mapGender = (g: string) => {
      if (g === "male") return "Male";
      if (g === "female") return "Female";
      if (g === "other") return "Other";
      if (g === "prefer") return "Prefer not to say";
      return "Other";
    };

    const mapEthnicity = (e: string) => {
      if (e === "mena") return "Other";
      if (e === "naan") return "American Indian or Alaska Native";
      if (e === "nhpi") return "Native Hawaiian or Other Pacific Islander";
      return "Other";
    };

    const mapHousing = (h: string) => {
      if (h === "stable") return "Stable housing";
      if (h === "transitional") return "Transitional housing";
      if (h === "homeless") return "Homeless";
      return "Other";
    };

    const mapEmployment = (e: Set<string>) => {
      const mapped: string[] = [];
      if (e.has("full-time")) mapped.push("Employed full-time");
      if (e.has("part-time")) mapped.push("Employed part-time");
      if (e.has("self-employed")) mapped.push("Self-employed");
      if (e.has("unemployed")) mapped.push("Unemployed and seeking work");
      if (e.has("other")) mapped.push("Other");
      return mapped;
    };

    const mapEducation = (e: Set<string>) => {
      const mapped: string[] = [];
      if (e.has("completed")) mapped.push("Bachelor's degree");
      if (e.has("enrolled")) mapped.push("Some college");
      if (e.has("planning")) mapped.push("High school diploma or GED");
      if (e.has("not-enrolled")) mapped.push("Less than high school");
      if (e.has("other")) mapped.push("Other");
      return mapped;
    };

    const mapAid = (a: string[]) => {
      const mapped = [];
      if (a.includes("housing")) mapped.push("Housing");
      if (a.includes("education")) mapped.push("Education");
      if (a.includes("development")) mapped.push("Development");
      return mapped;
    };

    let otherHousingText: string | undefined = undefined;
    if (profileData.housing === "temporary") {
      otherHousingText = "Temporarily staying with friends or family";
    } else if (profileData.housing === "other" && profileData.housingOther) {
      otherHousingText = profileData.housingOther;
    }

    const req: CreateApplicantRequest = {
      applicantName: profileData.fullName,
      dateOfBirth: new Date(profileData.dateOfBirth),
      race: mapEthnicity(profileData.ethnicity),
      gender: mapGender(profileData.gender),
      email: data.email,
      address: profileData.address,
      phoneNumber: data.phone,
      housingStatus: mapHousing(profileData.housing),
      otherHousingStatus: otherHousingText,
      educationStatus: mapEducation(profileData.education),
      otherEducationStatus:
        profileData.education.has("other") && profileData.educationOther
          ? profileData.educationOther
          : undefined,
      employmentStatus: mapEmployment(profileData.employment),
      otherEmploymentStatus:
        profileData.employment.has("other") && profileData.employmentOther
          ? profileData.employmentOther
          : undefined,
      convictionDetails: needsData.context,
      aidRequested: mapAid(needsData.aid),
      otherAidRequested: needsData.otherNeed,
      additionalComments: data.commentsQuestions || undefined,
      isCompleted: true,
    };

    try {
      const res = await createApplicant(req);
      setSubmitting(false);

      if (res.success) {
        const dateObj = new Date(res.data?.dateSubmitted || new Date());
        const dateSubmittedStr =
          new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(dateObj) +
          " at " +
          new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }).format(dateObj);

        setSubmissionResult({
          clientId: res.data?.applicantNumber || "Pending",
          dateSubmitted: dateSubmittedStr,
        });
        setStep(4);
      } else {
        alert("Failed to submit application: " + res.error);
      }
    } catch (e) {
      setSubmitting(false);
      console.error(e);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  const handleHome = () => {
    router.push("/about"); // placeholder until home page is ready
  };

  return (
    <ThemeProvider>
      <div className="apply-top-section">
        <div className="apply-container">
          <h1 className="apply-title">Join CRED Today</h1>
          <p className="apply-intro">
            Your journey to self-sufficiency starts here. We empower you with the tools to thrive,
            not just survive.
          </p>
        </div>
      </div>

      <div className="apply-form-section">
        {step === 1 && <YourProfileForm initialData={profileData} onNext={handleProfileNext} />}
        {step === 2 && (
          <NeedInterestsForm
            initialData={needsData}
            onNext={handleNeedsNext}
            onBack={handleNeedsBack}
          />
        )}
        {step === 3 && (
          <ContactForm
            initialData={contactData}
            onBack={(data) => {
              handleContactBack(data);
            }}
            onNext={(data) => {
              void handleContactNext(data);
            }}
            isSubmitting={submitting}
          />
        )}
        {step === 4 && submissionResult && (
          <Confirmation
            onNext={handleHome}
            clientId={submissionResult.clientId}
            dateSubmitted={submissionResult.dateSubmitted}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
