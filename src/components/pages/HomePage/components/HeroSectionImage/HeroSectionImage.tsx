import Image from "next/image";
import heroSectionImage from "@public/images/hero-illustration.webp";

function HeroSectionImage() {
  return (
    <div className="relative z-10 hidden w-2/5 overflow-hidden rounded-xl lg:block">
      <Image
        src={heroSectionImage}
        alt="Hero Illustration"
        priority
        className="drop-shadow2xl animate-float h-auto w-full rounded-lg p-4"
      />
    </div>
  );
}

export { HeroSectionImage };
