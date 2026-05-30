"use client";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HeroSectionContent } from "../HeroSectionContent";
import { HeroSectionImage } from "../HeroSectionImage/HeroSectionImage";

const HeroSection = () => {
  const { width } = useWindowSize();

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <HeroSectionContent />
      {width >= 1024 && <HeroSectionImage />}
    </div>
  );
};

export { HeroSection };
