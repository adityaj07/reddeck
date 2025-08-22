"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import HeroSection from "../_components/hero-section";

export default function Home() {
  const isMobile = useIsMobile();
  return (
    <div>
      <HeroSection />
    </div>
  );
}
