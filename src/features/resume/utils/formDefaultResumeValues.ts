import { ResumeFormValues } from "../schemas/resume.schema";

export const getDefaultResumeValues = (): ResumeFormValues => ({
  profileImage: undefined,
  basicInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    sex: "",
    militaryServiceStatus: "",
    maritalStatus: "",
    email: "",
    birthDate: "",
    mobileNumber: "",
    phone: "",
    location: {
      country: "",
      province: "",
      city: "",
    },
    address: "",
    webSite: "",
    summary: {
      type: "doc",
      content: [],
    },
  },
  education: [],
  job: [],
  skills: [],
  coursesAndCertifications: [],
  projects: [],
  research: [],
});
