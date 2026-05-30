"use client";
import Image from "next/image";
import heroSectionImage from "@public/images/hero-illustration.webp";
import { useLang } from "@/provider/lngProvider";
import { cn } from "@/utils/cn";

function HeroSectionImage() {
  const { lng } = useLang();
  return (
    <div className="relative hidden w-2/5 overflow-hidden rounded-xl lg:block">
      <Image
        src={heroSectionImage}
        alt="Hero Illustration"
        priority
        className={cn(
          "animate-float h-auto w-full rounded-lg p-4 pt-0 pb-0",
          lng === "en" ? "pr-0" : "pl-0",
        )}
      />
    </div>
  );
}

export { HeroSectionImage };
