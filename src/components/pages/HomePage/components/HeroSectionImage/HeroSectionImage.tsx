import Image from "next/image";
import heroSectionImage from "@public/images/hero-illustration.webp";

function HeroSectionImage() {
  return (
    <div className="relative z-10 w-2/5 overflow-hidden rounded-xl ">
      <Image
        src={heroSectionImage}
        alt="Hero Illustration"
        priority
        className="
          w-full h-auto 
          drop-shadow2xl 
          animate-float
          p-4
          rounded-lg
        "
      />
    </div>
  );
}

export { HeroSectionImage };
