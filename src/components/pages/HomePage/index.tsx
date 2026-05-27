import { HeroSectionContent } from "./components/HeroSectionContent";
import { HeroSectionImage } from "./components/HeroSectionImage/HeroSectionImage";

async function HomePage() {
  return (
    <div className="flex w-full items-center  mx-auto justify-between max-w-300">
      <HeroSectionContent />
      <HeroSectionImage />
    </div>
  );
}

export { HomePage };
