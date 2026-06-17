import { TFunction } from "i18next";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { useWatch } from "react-hook-form";
import { CustomControlledPhotoUploader } from "@/components/ui/CustomControlledPhotoUploader";

type UserProfileSectionProps = {
  t: TFunction<string, undefined>;
};

const UserProfileSection = ({ t }: UserProfileSectionProps) => {
  const image = useWatch({
    name: "profileImage",
  });

  return (
    <CustomResumeCardComponents calssName="w-full">
      <CustomControlledPhotoUploader t={t} label="hi" name="profileImage" />
    </CustomResumeCardComponents>
  );
};

export { UserProfileSection };
