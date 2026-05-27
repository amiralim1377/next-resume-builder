import { HeroSectionContent } from "../HeroSectionContent";
import { HeroSectionImage } from "../HeroSectionImage/HeroSectionImage";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-between">
      <HeroSectionContent />
      <HeroSectionImage />
    </div>
  );
};

export { HeroSection };
