import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { TFunction } from "i18next";

type ProfilePhotoUploaderProps = {
  t: TFunction<string, undefined>;
};

const ProfilePhotoUploader = ({ t }: ProfilePhotoUploaderProps) => {
  return (
    <CustomResumeCardComponents calssName="w-full">
      ProfilePhotoUploader
    </CustomResumeCardComponents>
  );
};

export { ProfilePhotoUploader };
