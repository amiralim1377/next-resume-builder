import { CustomBadge } from "@/components/ui/CustomBadge";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { TFunction } from "i18next";
import { memo, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { RowStatus } from "@/features/resume/types/resume.types";
import { useItemStatus } from "@/features/resume/hooks/useItemStatus";

type StatusEngine<T> = {
  getRowStatus: (data: T, hasError: boolean) => RowStatus;
};

// --------------------------------------------------
// 1. Status Badge
// --------------------------------------------------
type BadgeProps<T> = {
  name: string;
  index: number;
  engine: StatusEngine<T>;
  t: TFunction<string, undefined>;
};

const StatusBadgeComponent = function StatusBadge<T>({
  name,
  index,
  engine,
  t,
}: BadgeProps<T>) {
  const {
    formState: { errors },
  } = useFormContext();

  const rowValues = useWatch({
    name: `${name}.${index}`,
  }) as T;

  const formErrors = errors as Record<string, unknown>;
  const sectionErrors = formErrors[name] as unknown[];
  const rowError = Boolean(
    Array.isArray(sectionErrors) && sectionErrors[index],
  );

  const status = useItemStatus(rowValues, rowError, engine);

  const { badgeType, badgeLabel } = useMemo(() => {
    const badgeMap: Record<
      RowStatus,
      {
        badgeType: "default" | "warning" | "error" | "success";
        badgeLabel: string;
      }
    > = {
      empty: { badgeType: "default", badgeLabel: "empty" },
      draft: { badgeType: "warning", badgeLabel: "draft" },
      invalid: { badgeType: "error", badgeLabel: "invalid" },
      completed: { badgeType: "success", badgeLabel: "completed" },
    };
    return badgeMap[status];
  }, [status]);

  return (
    <CustomBadge type={badgeType}>{t(`status.${badgeLabel}`)}</CustomBadge>
  );
};

const StatusBadge = memo(
  StatusBadgeComponent,
  (prev, next) => prev.index === next.index && prev.name === next.name,
) as typeof StatusBadgeComponent;

// --------------------------------------------------
// 2. Header Title
// --------------------------------------------------
type TitleProps = {
  name: string;
  index: number;
  titleDependencies: string[];
  formatTitle: (
    values: unknown[],
    t: TFunction<string, undefined>,
  ) => React.ReactNode;
  t: TFunction<string, undefined>;
};

const HeaderTitle = memo(
  function HeaderTitle({
    name,
    index,
    titleDependencies,
    formatTitle,
    t,
  }: TitleProps) {
    const watchNames = useMemo(() => {
      return titleDependencies.map((dep) => `${name}.${index}.${dep}`);
    }, [name, index, titleDependencies]);

    const watchedValues = useWatch({ name: watchNames });

    const currentTargetLabel = useMemo(
      () => formatTitle(watchedValues, t),
      [watchedValues, formatTitle, t],
    );

    return (
      <div className="flex items-center gap-2">
        <CustomLabel size="lg">{currentTargetLabel}</CustomLabel>
      </div>
    );
  },
  (prev, next) => prev.index === next.index && prev.name === next.name,
);

// --------------------------------------------------
// 3. Generic Accordion Header
// --------------------------------------------------
export type GenericAccordionHeaderProps<T> = {
  name: string;
  index: number;
  engine: StatusEngine<T>;
  titleDependencies: Array<keyof T & string>;
  formatTitle: (
    values: unknown[],
    t: TFunction<string, undefined>,
  ) => React.ReactNode;
  actionsSlot?: React.ReactNode;
  t: TFunction<string, undefined>;
};

function GenericAccordionHeader<T>({
  name,
  index,
  engine,
  titleDependencies,
  formatTitle,
  actionsSlot,
  t,
}: GenericAccordionHeaderProps<T>) {
  return (
    <div className="flex w-full items-center justify-between pr-4">
      <div className="flex min-w-0 flex-1 items-center">
        <HeaderTitle
          name={name}
          index={index}
          titleDependencies={titleDependencies}
          formatTitle={formatTitle}
          t={t}
        />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {actionsSlot && (
          <div className="flex items-center gap-1">{actionsSlot}</div>
        )}
        <div className="shrink-0">
          <StatusBadge<T> name={name} index={index} engine={engine} t={t} />
        </div>
      </div>
    </div>
  );
}

export const MemoizedGenericAccordionHeader = memo(
  GenericAccordionHeader,
  (prev, next) => prev.index === next.index && prev.name === next.name,
) as typeof GenericAccordionHeader;
