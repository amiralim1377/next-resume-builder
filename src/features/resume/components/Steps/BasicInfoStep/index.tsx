"use client";
import { UserProfileSection } from "./components/UserProfileSection";
import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContactInformation } from "./components/ContactInformationSection";
import { ResumeSummary } from "./components/ResumeSummary";

function BasicInfoStep() {
  return (
    <div className="flex w-full flex-col space-y-8">
      <UserProfileSection />
      <BasicInfoSection />
      <ContactInformation />
      <ResumeSummary />
    </div>
  );
}

export { BasicInfoStep };
