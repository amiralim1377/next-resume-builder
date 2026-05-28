import { CareerBoostHub } from "./components/CareerBoostHub";
import { HeroSection } from "./components/HeroSection";
import { HomePageFAQ } from "./components/HomePageFAQ";
import { SuccessStories } from "./components/SuccessStories";
import { SummaryStats } from "./components/SummaryStats";

function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col space-y-10">
      <HeroSection />
      <SummaryStats />
      <SuccessStories />
      <HomePageFAQ />
      <CareerBoostHub />
    </div>
  );
}

export { HomePage };
