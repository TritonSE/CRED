"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { CreateApplicantRequest, createApplicant } from "../../api/applicant";

import { Confirmation } from "./components/Confirmation";
import { ContactData, ContactForm } from "./components/ContactForm";
import { NeedInterestsForm, NeedsData } from "./components/NeedInterestsForm";
import { ProfileData, YourProfileForm } from "./components/YourProfileForm";

import HeroSection from "@/components/HeroSection";

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
      if (e.has("enrolled")) mapped.push("Currently enrolled in school or training");
      if (e.has("planning")) mapped.push("Planning to enroll in school or training");
      if (e.has("not-enrolled")) mapped.push("Not currently enrolled");
      if (e.has("completed")) mapped.push("Completed my education");
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
      race: profileData.ethnicity,
      gender: profileData.gender,
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
    } catch {
      setSubmitting(false);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <ThemeProvider>
      <HeroSection
        variant="banner"
        imageSrc="/apply/banner.jpg"
        imageAlt=""
        title="Join CRED Today"
        subtitle="Your journey to self-sufficiency starts here. We empower you with the tools to thrive, not just survive."
        overlayGradient="linear-gradient(to right, #004377, rgba(30, 115, 190, 0.8))"
        priority
      />

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
