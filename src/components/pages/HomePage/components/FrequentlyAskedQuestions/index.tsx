"use client";

import {
  AccordionItemProps,
  CustomAccordion,
} from "@/components/ui/customAccordion";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { cn } from "@/utils/cn";

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
    <div className="py-5">
      <CustomAccordion
        data={FAQDataArray}
        showDivider={true}
        headerTitle={t("faq")}
        classNames={{
          root: cn("w-full md:max-w-237.5 mx-auto "),
          labelWrapper: cn("py-5"),
          label: cn("text-base font-black capitalize text-textTertiary"),
          content: cn("pt-2.5 pb-5 px-1.25 mr-2.5 text-sm text-text-secondary"),
          chevron: cn("text-textTertiary"),
        }}
        chevronSize={20}
      />
    </div>
  );
}

export { FrequentlyAskedQuestions };
