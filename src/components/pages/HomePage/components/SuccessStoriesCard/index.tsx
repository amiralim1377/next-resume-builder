import {
  AvatarShape,
  AvatarSize,
  AvatarStatus,
  CustomAvatar,
} from "@/components/ui/customAvatar";
import { CustomRateStar } from "@/components/ui/customRateStar";
import { CustomText } from "@/components/ui/customText";
import { CustomUserInfo } from "@/components/ui/customUserInfo";
import { StaticImageData } from "next/image";

export interface SuccessStoriesCardProps {
  userName: string;
  stories: string;
  label: string;
  initialRating: number;
  avatarSrc?: string | StaticImageData;
  avatarAlt?: string;
  avatarShape?: AvatarShape;
  avatarSize?: AvatarSize;
  avatarStatus?: AvatarStatus;
}

function SuccessStoriesCard({
  userName = "amirali",
  label,
  stories,
  initialRating,
  avatarSrc,
  avatarAlt = `${userName}-image`,
  avatarShape,
  avatarSize,
  avatarStatus,
  ...avatarProps
}: SuccessStoriesCardProps) {
  return (
    <div className="bg-ui-surface min-h-65 w-full rounded-lg p-5 shadow-xl hover:shadow-2xl">
      <div className="flex items-center gap-3 pb-2">
        <CustomAvatar
          src={avatarSrc}
          alt={avatarAlt}
          shape={avatarShape}
          size={avatarSize}
          status={avatarStatus}
          {...avatarProps}
          className="border"
        />
        <CustomUserInfo
          nameClassName="capitalize text-base text-text-primary font-semibold"
          labelClassName="text-xs text-textTertiary"
          userName={userName}
          label={label}
        />
      </div>

      <div>
        <CustomRateStar isReadOnly initialRating={initialRating} />
      </div>

      <CustomText className="text-text-secondary w-full pt-5 pb-6 text-sm leading-6 md:max-w-72.5">
        {`"${stories}"`}
      </CustomText>
    </div>
  );
}

export { SuccessStoriesCard };
