"use client";
import { HeroSectionContent } from "../HeroSectionContent";
import { HeroSectionImage } from "../HeroSectionImage/HeroSectionImage";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <HeroSectionContent />
      <HeroSectionImage />
    </div>
  );
};

export { HeroSection };
