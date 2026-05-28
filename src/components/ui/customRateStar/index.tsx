import { useState } from "react";

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
  inactiveColor = "var(--color-stateInactiveColor)",
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
          <svg
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-200 ${
              isReadOnly ? "cursor-default" : "cursor-pointer"
            }`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isFilled ? activeColor : inactiveColor}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        );
      })}
    </div>
  );
};

export { CustomRateStar };
