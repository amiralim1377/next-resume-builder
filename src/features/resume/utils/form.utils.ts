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
    jobTitle: lng === "fa" ? "توسعه‌دهنده فول‌استک" : "Full Stack Developer",
    email: "",
    phone: "",
    summary: "",
    birthday: "",
    maritalStatus: "single",
    militaryServiceStatus: "not_applicable",
    sex: "prefer_not_to_say",
  },
});
