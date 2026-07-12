import { useState, useRef, useCallback, useEffect } from "react";
import {
  useFieldArray,
  useFormContext,
  FieldArrayPath,
  FieldValues,
  FieldArray,
  Path,
} from "react-hook-form";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

interface UseArrayFieldStepProps<TFieldValues extends FieldValues> {
  fieldName: FieldArrayPath<TFieldValues>;
  emptyRowValues: FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>;
}

export const useArrayFieldStep = <TFieldValues extends FieldValues>({
  fieldName,
  emptyRowValues,
}: UseArrayFieldStepProps<TFieldValues>) => {
  const { control, getValues, trigger } = useFormContext<TFieldValues>();
  const [activeAccordionIds, setActiveAccordionIds] = useState<string[]>([]);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(
    null,
  );

  const { fields, append, remove, move, insert } = useFieldArray({
    control,
    name: fieldName,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = fields.findIndex((field) => field.id === active.id);
        const newIndex = fields.findIndex((field) => field.id === over.id);
        move(oldIndex, newIndex);
      }
    },
    [fields, move],
  );

  const prevLengthRef = useRef(fields.length);

  const handleAddRow = useCallback(() => {
    append(emptyRowValues);
  }, [append, emptyRowValues]);

  const duplicateRow = useCallback(
    async (index: number) => {
      const allValues = getValues(
        fieldName as unknown as Path<TFieldValues>,
      ) as unknown as Record<string, unknown>[];
      const currentValues = allValues[index];
      if (currentValues) {
        const itemToCopy = structuredClone(currentValues);
        delete itemToCopy.id;
        insert(
          index + 1,
          itemToCopy as FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>,
        );
        await trigger(fieldName as unknown as Path<TFieldValues>);
      }
    },
    [getValues, fieldName, insert, trigger],
  );

  const handleOpenDeleteModal = useCallback((index: number) => {
    setDeleteTargetIndex(index);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteTargetIndex(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTargetIndex !== null) {
      remove(deleteTargetIndex);
      handleCloseDeleteModal();
    }
  }, [deleteTargetIndex, remove, handleCloseDeleteModal]);

  useEffect(() => {
    if (fields.length > prevLengthRef.current && fields.length > 0) {
      const lastFieldId = fields[fields.length - 1].id;
      setActiveAccordionIds((prev) =>
        prev.includes(lastFieldId) ? prev : [...prev, lastFieldId],
      );
    }
    prevLengthRef.current = fields.length;
  }, [fields]);

  return {
    fields,
    activeAccordionIds,
    setActiveAccordionIds,
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
  };
};
