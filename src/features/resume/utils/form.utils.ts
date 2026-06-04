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
    summary: "",
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
  },
});
