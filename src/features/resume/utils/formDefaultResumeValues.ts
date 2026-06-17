import { Language } from "@/lib/i18n/settings";
import { ResumeFormValues } from "../schemas/resume.schema";

type GetDefaultResumeValuesProps = {
  lng: Language;
};

export const getDefaultResumeValues = ({
  lng,
}: GetDefaultResumeValuesProps): ResumeFormValues => ({
  basicInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    mobileNumber: "",
    birthday: {
      day: "",
      month: "",
      year: "",
    },
    militaryServiceStatus: "",
    sex: "",
    maritalStatus: "",
    address: "",
    city: "",
    country: "",
    province: "",
    webSite: "",
    summary: "",
  },
  education: [
    {
      degreeLevel: "",
      academicMajor: "",
      institutionName: "",
      gradeAverage: "",
      concentration: "",
      country: "",
      province: "",
      city: "",
      entryMonth: "",
      entryYear: "",
      graduationMonth: "",
      graduationYear: "",
      isStudyingNow: false,
      summary: "",
    },
  ],
  job: [
    {
      summary: "",
      jobTitle: "",
      companyName: "",
      country: "",
      province: "",
      city: "",
      entryMonth: "",
      entryYear: "",
      employmentEndMonth: "",
      employmentEndYear: "",
      isCurrentlyWorkingHere: false,
    },
  ],
  languages: [
    {
      language: "",
      displayMode: "",
      proficiencyData: { level: "" },
      description: "",
    },
  ],
  skills: [
    { skillName: "", skillLevel: "", summary: "" },
    {
      skillName: "",
      skillLevel: "",
      summary: "",
    },
  ],
  coursesAndCertifications: [
    {
      coursesAndCertificationsName: "",
      instituteName: "",
      certificateIssueMonth: "",
      certificateIssueYear: "",
      certificateUrl: "",
    },
  ],
  projects: [
    {
      clientName: "",
      description: "",
      projectMonth: "",
      projectTitle: "",
      projectUrl: "",
      projectYear: "",
    },
  ],
  research: [
    {
      publicationMonth: "",
      publicationYear: "",
      publisher: "",
      researchTitle: "",
      researchUrl: "",
    },
  ],
  profileImage: undefined,
});
