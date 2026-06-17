import { CustomButton } from "@/components/ui/CustomButton";
import { CustomText } from "@/components/ui/CustomText";
import { TFunction } from "i18next";

type ResumeRemoveLinkModalProps = {
  t: TFunction<string, undefined>;
  text: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const ResumeRemoveLinkModal = ({
  t,
  onCancel,
  onConfirm,
  text,
}: ResumeRemoveLinkModalProps) => {
  return (
    <div>
      <div className="flex flex-col items-start gap-3.5">
        <div>
          <CustomText className="text-text-secondary">
            {t("removeSelectedTextLink")}
          </CustomText>
          <CustomText className="bg-background-secondary text-text-primary rounded-md px-3 py-2">
            «{text}»
          </CustomText>
        </div>
        <div className="flex items-center gap-3">
          <CustomButton
            className="text-shadow-text-secondary"
            variant="outlined-negative"
            onClick={onCancel}
          >
            {t("cancel")}
          </CustomButton>
          <CustomButton
            variant="simple"
            className="bg-state-success hover:bg-state-success/80 text-shadow-text-secondary"
            onClick={onConfirm}
          >
            {t("confirm")}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export { ResumeRemoveLinkModal };
