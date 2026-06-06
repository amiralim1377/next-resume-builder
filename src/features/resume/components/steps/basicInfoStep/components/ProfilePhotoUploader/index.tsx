import { TFunction } from "i18next";

type ProfilePhotoUploaderProps = {
  t: TFunction<string, undefined>;
};

const ProfilePhotoUploader = ({ t }: ProfilePhotoUploaderProps) => {
  return <div className="w-1/4">ProfilePhotoUploader</div>;
};

export { ProfilePhotoUploader };
