"use client";
import React from "react";
import { FieldArrayPath, FieldValues, FieldArray } from "react-hook-form";

import { CustomButton } from "@/components/ui/CustomButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { GripVertical, Trash2 } from "lucide-react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableItem } from "../SortableItem";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { CustomConfirmModal } from "@/components/ui/CustomConfirmModal";
import { useArrayFieldStep } from "./hooks/useArrayFieldStep";

interface ArrayFieldStepProps<TFieldValues extends FieldValues> {
  fieldName: FieldArrayPath<TFieldValues>;
  emptyRowValues: FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>;
  addButtonLabel: string;
  emptyStateLabel?: string;
  renderEmptyState?: (append: () => void) => React.ReactNode;
  renderHeader: (
    index: number,
    openDeleteModal: (index: number) => void,
    copy: (index: number) => void,
    move: (from: number, to: number) => void,
    isFirst: boolean,
    isLast: boolean,
  ) => React.ReactNode;
  renderItem: (
    index: number,
    remove: (index: number) => void,
  ) => React.ReactNode;
}

function ArrayFieldStep<TFieldValues extends FieldValues>({
  fieldName,
  emptyRowValues,
  addButtonLabel,
  emptyStateLabel = "No entries added yet.",
  renderEmptyState,
  renderHeader,
  renderItem,
}: ArrayFieldStepProps<TFieldValues>) {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

  const {
    fields,
    activeAccordionId,
    setActiveAccordionId,
    sensors,
    handleDragEnd,
    handleAddRow,
    duplicateRow,
    deleteTargetIndex,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    remove,
    move,
  } = useArrayFieldStep({ fieldName, emptyRowValues });

  return (
    <div className="space-y-4">
      {fields.length === 0 ? (
        renderEmptyState ? (
          renderEmptyState(handleAddRow)
        ) : (
          <div className="bg-muted/20 rounded-xl border-2 border-dashed py-10 text-center">
            <p className="text-muted-foreground text-sm">{emptyStateLabel}</p>
          </div>
        )
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <Accordion
              type="single"
              collapsible
              value={activeAccordionId}
              onValueChange={setActiveAccordionId}
              className="w-full space-y-3"
            >
              {fields.map((field, index) => (
                <SortableItem key={field.id} id={field.id}>
                  {({ dragListeners }) => (
                    <div className="group relative flex w-full items-center gap-2">
                      <div
                        {...dragListeners}
                        className="text-muted-foreground hover:text-foreground cursor-grab p-1.5 transition-colors active:cursor-grabbing md:p-2"
                      >
                        <GripVertical className="text-text-secondary hover:text-brandHover hover:ring-brandHover h-7 w-7 rounded-md p-1 transition-all hover:ring-2 hover:ring-offset-2" />
                      </div>
                      <AccordionItem
                        value={field.id}
                        className="bg-card flex-1 overflow-hidden rounded-lg border shadow-sm transition-all"
                      >
                        <AccordionTrigger className="data-[state=open]:border-b-borde border-b-0 px-4 py-3 hover:no-underline">
                          {renderHeader(
                            index,
                            handleOpenDeleteModal,
                            duplicateRow,
                            move,
                            index === 0,
                            index === fields.length - 1,
                          )}
                        </AccordionTrigger>
                        <AccordionContent className="bg-muted/10 px-5 pt-4 pb-5">
                          {renderItem(index, remove)}
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  )}
                </SortableItem>
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>
      )}

      {fields.length !== 0 && (
        <CustomButton
          type="button"
          variant="outlined"
          className="hover:bg-muted/50 w-full border-2 border-dashed py-6"
          onClick={handleAddRow}
        >
          + {addButtonLabel}
        </CustomButton>
      )}

      <CustomConfirmModal
        isOpen={deleteTargetIndex !== null}
        onClose={handleCloseDeleteModal}
        cancelButtonProps={{
          children: t("cancel"),
          variant: "primary",
          onClick: handleCloseDeleteModal,
        }}
        title={t("deleteRowTitle")}
        confirmButtonProps={{
          children: t("delete"),
          className: "bg-state-error hover:bg-state-error/90 text-white",
          onClick: handleConfirmDelete,
        }}
        icon={
          <div className="bg-state-error/10 text-state-error mt-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Trash2 className="h-5 w-5" />
          </div>
        }
      >
        {t("deleteRowDescription")}
      </CustomConfirmModal>
    </div>
  );
}

export { ArrayFieldStep };
