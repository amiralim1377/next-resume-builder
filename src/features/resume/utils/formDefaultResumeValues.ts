import { Language } from "@/lib/i18n/settings";
import { ResumeFormValues } from "../schemas/resume.schema";

type GetDefaultResumeValuesProps = {
  lng: Language;
};

export const getDefaultResumeValues = ({
  lng,
}: GetDefaultResumeValuesProps): ResumeFormValues => ({
  profileImage: undefined,
  basicInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    sex: "",
    militaryServiceStatus: "",
    maritalStatus: "",
    email: "",
    birthday: {
      day: "",
      month: "",
      year: "",
    },
    mobileNumber: "",
    phone: "",

    country: "",
    province: "",
    city: "",
    address: "",

    webSite: "",
    summary: "",
  },
  education: [
    {
      degreeLevel: "",
      academicMajor: "",
      concentration: "",
      institutionName: "",
      gradeAverage: "",
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
      proficiencyData: {},
    },
  ],

  skills: [{ skillName: "", skillLevel: "", summary: "" }],

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
      summary: "",
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
      summary: "",
    },
  ],
});
