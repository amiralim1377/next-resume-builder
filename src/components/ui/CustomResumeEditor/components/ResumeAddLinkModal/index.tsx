import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import { TFunction } from "i18next";

type ResumeAddLinkModalProps = {
  t: TFunction<string, undefined>;
  url: string;
  text: string;
  onUrlChange: (v: string) => void;
  onTextChange: (v: string) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const ResumeAddLinkModal = ({
  t,
  onCancel,
  onConfirm,
  onTextChange,
  onUrlChange,
  text,
  url,
}: ResumeAddLinkModalProps) => {
  return (
    <div>
      <CustomInput
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={t("textInputPlaceholder")}
        label={t("text")}
      />
      <CustomInput
        placeholder={t("linkInputPlaceholder")}
        label={t("targetUrl")}
        type="url"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
      />
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
  );
};

export { ResumeAddLinkModal };
