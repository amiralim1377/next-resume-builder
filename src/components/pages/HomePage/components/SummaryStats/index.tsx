"use client";
import { CustomStats, StatItem } from "@/components/ui/CustomStat";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

function SummaryStats() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  const summaryStatsArray: StatItem[] = [
    { content: "10K", label: t("happyUsers"), id: 1 },
    { content: "98%", label: t("successRate"), id: 2 },
    { content: "1200k+", label: t("resumesCreated"), id: 3 },
  ];
  return (
    <div className="">
      <div className="bg-ui-surface grid w-full grid-cols-1 justify-items-center rounded-lg shadow-lg md:grid-cols-3">
        {summaryStatsArray.map((item, i) => {
          return (
            <CustomStats
              data={item}
              key={i}
              labelLocation="bottom"
              size="lg"
              labelClassName="text-sm text-text-primary"
              contentClassName="text-5xl text-textTertiary font-bold"
              className="mx-auto flex w-full items-center justify-center"
            />
          );
        })}
      </div>
    </div>
  );
}

export { SummaryStats };
