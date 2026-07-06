import React, { useState, useEffect, useRef } from "react";
import {
  useFieldArray,
  useFormContext,
  FieldArrayPath,
  FieldValues,
  FieldArray,
} from "react-hook-form";

import { CustomButton } from "@/components/ui/CustomButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";

interface ArrayFieldStepProps<TFieldValues extends FieldValues> {
  fieldName: FieldArrayPath<TFieldValues>;
  emptyRowValues: FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>;
  addButtonLabel: string;
  emptyStateLabel?: string;
  renderEmptyState?: (append: () => void) => React.ReactNode;
  renderHeader: (index: number) => React.ReactNode;
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
  const { control } = useFormContext<TFieldValues>();
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const prevLengthRef = useRef(fields.length);

  const handleAddRow = () => {
    append(emptyRowValues);
  };

  useEffect(() => {
    if (fields.length > prevLengthRef.current && fields.length > 0) {
      const lastFieldId = fields[fields.length - 1].id;
      setActiveAccordionId(lastFieldId);
    }
    prevLengthRef.current = fields.length;
  }, [fields]);

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
        <Accordion
          type="single"
          collapsible
          value={activeAccordionId}
          onValueChange={setActiveAccordionId}
          className="w-full space-y-3"
        >
          {fields.map((field, index) => (
            <AccordionItem
              key={field.id}
              value={field.id}
              className="bg-card overflow-hidden rounded-lg border shadow-sm transition-all"
            >
              <AccordionTrigger className="data-[state=open]:border-b-borde border-b-0 px-4 py-3 hover:no-underline">
                {renderHeader(index)}
              </AccordionTrigger>
              <AccordionContent className="bg-muted/10 px-5 pt-4 pb-5">
                {renderItem(index, remove)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
    </div>
  );
}

export { ArrayFieldStep };
