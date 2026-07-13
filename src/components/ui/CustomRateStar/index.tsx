import { cn } from "@/utils/cn";
import { useState } from "react";
import { Star } from "lucide-react";

export interface CustomRateStarProps {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  isReadOnly?: boolean;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const CustomRateStar = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  isReadOnly = false,
  size = 24,
  activeColor = "var(--color-stateActiveStar)",
  inactiveColor = "var(--state-inactiveColor)",
}: CustomRateStarProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (index: number) => {
    if (isReadOnly) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (isReadOnly) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (isReadOnly) return;
    setHoverRating(0);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = index < (hoverRating || rating);

        return (
          <Star
            key={index}
            size={size}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "transition-colors duration-200",
              isReadOnly ? "cursor-default" : "cursor-pointer",
            )}
            fill={isFilled ? activeColor : inactiveColor}
            color={isFilled ? activeColor : inactiveColor}
          />
        );
      })}
    </div>
  );
};

export { CustomRateStar };
