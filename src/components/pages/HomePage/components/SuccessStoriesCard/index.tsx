import { CustomAvatar } from "@/components/ui/customAvatar";
import { CustomRateStar } from "@/components/ui/customRateStar";
import { CustomText } from "@/components/ui/customText";
import { CustomUserInfo } from "@/components/ui/customUserInfo";

type SuccessStoriesCardProps = {
  name: string;
  stories: string;
  initialRating: number;
};

function SuccessStoriesCard({
  name = "amirali",
  stories,
  initialRating,
}: SuccessStoriesCardProps) {
  return (
    <div>
      <div className="flex">
        <CustomAvatar />
        <CustomUserInfo name={name} />
      </div>
      <div>
        <CustomRateStar initialRating={initialRating} />
      </div>
      <CustomText>{stories}</CustomText>
    </div>
  );
}

export { SuccessStoriesCard };
