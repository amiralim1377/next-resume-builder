"use client";

import {
  AccordionItemProps,
  CustomAccordion,
} from "@/components/ui/customAccordion";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import classes from "./index.module.css";

function FrequentlyAskedQuestions() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");

  const FAQDataArray: AccordionItemProps[] = [
    {
      id: 1,
      label: t("firstFaqLabel"),
      content: t("firstFaqContent"),
    },
    {
      id: 2,
      label: t("secondFaqLabel"),
      content: t("secondFaqContent"),
    },
    {
      id: 3,
      label: t("thirdFaqLabel"),
      content: t("thirdFaqContent"),
    },
  ];

  return (
    <div className="p-5">
      <CustomAccordion
        data={FAQDataArray}
        showDivider={true}
        headerTitle={t("faq")}
        classNames={{
          root: classes.rootFaqWrapper,
          labelWrapper: classes.faqLabelWrapper,
          label: classes.faqlabel,
          content: classes.faqContent,
          chevron: classes.faqChevron,
        }}
      />
    </div>
  );
}

export { FrequentlyAskedQuestions };
