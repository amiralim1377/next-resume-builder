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
    location: {
      country: "",
      province: "",
      city: "",
    },
    address: "",
    webSite: "",
    summary: "",
  },
  education: [],
  job: [],
  languages: [],
  skills: [],
  coursesAndCertifications: [],
  projects: [],
  research: [],
});
