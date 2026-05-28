import { CustomAvatar, type AvatarProps } from "@/components/ui/customAvatar";
import { CustomRateStar } from "@/components/ui/customRateStar";
import { CustomText } from "@/components/ui/customText";
import {
  CustomUserInfo,
  type UserInfoProps,
} from "@/components/ui/customUserInfo";

interface SuccessStoriesCardProps extends UserInfoProps, AvatarProps {
  stories: string;
  initialRating: number;
}

function SuccessStoriesCard({
  name = "amirali",
  label,
  stories,
  initialRating,
  ...avatarProps
}: SuccessStoriesCardProps) {
  return (
    <div>
      <div className="flex">
        <CustomAvatar {...avatarProps} />
        <CustomUserInfo userName={name} label={label} />
      </div>

      <div>
        <CustomRateStar initialRating={initialRating} />
      </div>

      <CustomText>{stories}</CustomText>
    </div>
  );
}

export { SuccessStoriesCard };
