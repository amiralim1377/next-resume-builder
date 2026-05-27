import { HeroSection } from "./components/HeroSection";

async function HomePage() {
  return (
    <div className=" w-full   mx-auto  max-w-300">
      <HeroSection />
    </div>
  );
}

export { HomePage };
