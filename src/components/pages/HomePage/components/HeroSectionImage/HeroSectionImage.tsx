import Image from "next/image";
import heroSectionImage from "@public/images/hero-illustration.webp";

function HeroSectionImage() {
  return (
    <div className="relative hidden w-2/5 overflow-hidden rounded-xl lg:block">
      <Image
        src={heroSectionImage}
        alt="Hero Illustration"
        priority
        className="animate-float h-auto w-full rounded-lg p-4 pt-0 pb-0"
      />
    </div>
  );
}

export { HeroSectionImage };
